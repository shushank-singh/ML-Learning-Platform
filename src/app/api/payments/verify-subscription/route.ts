import { NextRequest, NextResponse } from 'next/server';
import { getServerUserContext } from '@/lib/entitlements/server';
import { normalizeTrackId } from '@/lib/entitlements/config';
import { getTrackProduct } from '@/lib/payments/products';
import {
  fetchRazorpaySubscription,
  isRazorpayConfigured,
  verifySubscriptionSignature,
} from '@/lib/payments/razorpay';
import { settleSubscriptionActivation } from '@/lib/payments/lifecycle';
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
      razorpay_subscription_id,
      razorpay_payment_id,
      razorpay_signature,
      trackId: clientTrackId,
      productId: clientProductId,
    } = body;

    if (!razorpay_subscription_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: 'Missing required subscription ID or payment ID.' },
        { status: 400 }
      );
    }

    // 3. Signature Verification (Timing-safe HMAC-SHA256)
    // Razorpay Subscription checkout signature pattern: HMAC(payment_id + '|' + subscription_id)
    if (isRazorpayConfigured()) {
      if (!razorpay_signature) {
        return NextResponse.json(
          { error: 'Missing subscription signature for verification.' },
          { status: 400 }
        );
      }

      const isValidSignature = verifySubscriptionSignature({
        subscriptionId: razorpay_subscription_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      });

      if (!isValidSignature) {
        console.warn('[Subscription Verify] Security Alert: Invalid subscription signature received:', razorpay_subscription_id);
        return NextResponse.json(
          { error: 'Subscription signature verification failed. Potential request tampering detected.' },
          { status: 400 }
        );
      }
    }

    // 4. Resolve Trusted Subscription, Track & Gateway Details
    let targetTrackId = clientTrackId ? normalizeTrackId(clientTrackId) : (clientProductId?.includes('all') ? 'all' : 'ml');
    let targetProductId = clientProductId || (targetTrackId === 'all' ? 'all_courses_monthly' : `${targetTrackId}_monthly`);
    let targetAmount = targetProductId === 'all_courses_monthly' ? 9900 : 99900;
    let periodStart: string | null = null;
    let periodEnd: string | null = null;
    let rawSubscription: Record<string, any> = {};

    const admin = getSupabaseAdminClient();
    if (admin) {
      const { data: subRow } = await admin
        .from('payment_subscriptions')
        .select('track_id, product_id')
        .eq('id', razorpay_subscription_id)
        .maybeSingle();

      if (subRow) {
        targetTrackId = subRow.track_id;
        targetProductId = subRow.product_id;
      }
    }

    if (isRazorpayConfigured()) {
      const { subscription, error: fetchErr } = await fetchRazorpaySubscription(razorpay_subscription_id);
      if (fetchErr || !subscription) {
        return NextResponse.json(
          { error: `Failed to verify subscription status with gateway: ${fetchErr}` },
          { status: 502 }
        );
      }

      if (subscription.status !== 'active' && subscription.status !== 'authenticated') {
        return NextResponse.json(
          { error: `Subscription is in "${subscription.status}" state, not active.` },
          { status: 400 }
        );
      }

      const notesTrack = subscription.notes?.trackId;
      if (notesTrack) {
        targetTrackId = normalizeTrackId(notesTrack);
      }

      if (subscription.current_start) {
        periodStart = new Date(subscription.current_start * 1000).toISOString();
      }
      if (subscription.current_end) {
        periodEnd = new Date(subscription.current_end * 1000).toISOString();
      }

      rawSubscription = subscription as any;
    } else {
      const product = getTrackProduct(targetProductId);
      if (product && product.amountPaise) {
        targetAmount = product.amountPaise;
      }
      periodStart = new Date().toISOString();
      periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }

    // 5. Settle Subscription Activation and Grant Track Entitlement
    const settlement = await settleSubscriptionActivation({
      subscriptionId: razorpay_subscription_id,
      paymentId: razorpay_payment_id,
      userId: userCtx.userId,
      trackId: targetTrackId,
      productId: targetProductId,
      amountPaise: targetAmount,
      periodStart,
      periodEnd,
      method: 'subscription',
      rawResponse: rawSubscription,
    });

    if (!settlement.success) {
      return NextResponse.json(
        { error: settlement.error || 'Failed to settle subscription and grant entitlement.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription verified and track entitlement successfully activated!',
        trackId: targetTrackId,
        accessType: 'monthly_subscription',
        subscriptionId: razorpay_subscription_id,
        paymentId: razorpay_payment_id,
        validUntil: periodEnd,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        },
      }
    );
  } catch (err: any) {
    console.error('[/api/payments/verify-subscription] Internal error:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred during subscription verification.' },
      { status: 500 }
    );
  }
}
