import { NextRequest, NextResponse } from 'next/server';
import { getServerUserContext } from '@/lib/entitlements/server';
import { normalizeTrackId } from '@/lib/entitlements/config';
import { getTrackProduct } from '@/lib/payments/products';
import {
  fetchRazorpayPayment,
  isRazorpayConfigured,
  verifyPaymentSignature,
} from '@/lib/payments/razorpay';
import { settleOneTimeOrder } from '@/lib/payments/lifecycle';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Authentication
    const userCtx = await getServerUserContext();
    if (!userCtx.isAuthenticated || !userCtx.userId) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in.' },
        { status: 401 }
      );
    }

    // 2. Parse Payload
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      trackId: clientTrackId,
      productId: clientProductId,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: 'Missing required order ID or payment ID.' },
        { status: 400 }
      );
    }

    // 3. Signature Verification (Timing-safe HMAC-SHA256)
    if (isRazorpayConfigured()) {
      if (!razorpay_signature) {
        return NextResponse.json(
          { error: 'Missing payment signature for verification.' },
          { status: 400 }
        );
      }

      const isValidSignature = verifyPaymentSignature({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      });

      if (!isValidSignature) {
        console.warn('[Payments Verify] Security Alert: Invalid signature received for order:', razorpay_order_id);
        return NextResponse.json(
          { error: 'Payment signature verification failed. Potential request tampering detected.' },
          { status: 400 }
        );
      }
    }

    // 4. Resolve Trusted Order, Track & Gateway Details
    let targetTrackId = clientTrackId ? normalizeTrackId(clientTrackId) : (clientProductId?.includes('all') ? 'all' : 'ml');
    let targetProductId = clientProductId || (targetTrackId === 'all' ? 'all_courses_lifetime' : `${targetTrackId}_lifetime`);
    let targetAmount = targetProductId === 'all_courses_lifetime' ? 39900 : 499900;
    let targetCurrency = 'INR';
    let rawPayment: Record<string, any> = {};

    const admin = getSupabaseAdminClient();
    if (admin) {
      const { data: orderRow } = await admin
        .from('payment_orders')
        .select('track_id, product_id, amount_paise, currency')
        .eq('id', razorpay_order_id)
        .maybeSingle();

      if (orderRow) {
        targetTrackId = orderRow.track_id;
        targetProductId = orderRow.product_id;
        targetAmount = orderRow.amount_paise;
        targetCurrency = orderRow.currency;
      }
    }

    if (isRazorpayConfigured()) {
      const { payment, error: fetchErr } = await fetchRazorpayPayment(razorpay_payment_id);
      if (fetchErr || !payment) {
        return NextResponse.json(
          { error: `Failed to verify payment status with gateway: ${fetchErr}` },
          { status: 502 }
        );
      }

      if (payment.status !== 'captured') {
        return NextResponse.json(
          { error: `Payment is in "${payment.status}" state, not captured.` },
          { status: 400 }
        );
      }

      const notesTrack = payment.notes?.trackId;
      if (notesTrack) {
        targetTrackId = normalizeTrackId(notesTrack);
      }

      targetAmount = payment.amount;
      targetCurrency = payment.currency;
      rawPayment = payment as any;
    } else {
      const product = getTrackProduct(targetProductId);
      if (product && product.amountPaise) {
        targetAmount = product.amountPaise;
      }
    }

    // 5. Settle Order and Grant Lifetime Entitlement
    const settlement = await settleOneTimeOrder({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      userId: userCtx.userId,
      trackId: targetTrackId,
      productId: targetProductId,
      amountPaise: targetAmount,
      currency: targetCurrency,
      method: rawPayment.method || 'standard',
      rawResponse: rawPayment,
    });

    if (!settlement.success) {
      return NextResponse.json(
        { error: settlement.error || 'Failed to settle order and grant lifetime entitlement.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified and lifetime track entitlement successfully activated!',
        trackId: targetTrackId,
        accessType: 'lifetime',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        },
      }
    );
  } catch (err: any) {
    console.error('[/api/payments/verify] Internal error:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred during verification.' },
      { status: 500 }
    );
  }
}
