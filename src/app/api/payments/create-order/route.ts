import { NextRequest, NextResponse } from 'next/server';
import { getServerUserContext } from '@/lib/entitlements/server';
import { normalizeTrackId } from '@/lib/entitlements/config';
import { getTrackProduct } from '@/lib/payments/products';
import {
  createRazorpayOrder,
  getRazorpayCredentials,
  isRazorpayConfigured,
} from '@/lib/payments/razorpay';
import { recordOrderCreation } from '@/lib/payments/lifecycle';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Authentication
    const userCtx = await getServerUserContext();
    if (!userCtx.isAuthenticated || !userCtx.userId) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to initiate checkout.' },
        { status: 401 }
      );
    }

    // 2. Owner bypass verification: Owner never pays
    if (userCtx.role === 'owner' || userCtx.email === process.env.AZURLEARN_OWNER_EMAIL || userCtx.userId === process.env.AZURLEARN_OWNER_ID) {
      return NextResponse.json(
        {
          error: 'Your account is identified as the Platform Owner with full, unrestricted access to all curriculum tracks.',
          isOwner: true,
        },
        { status: 400 }
      );
    }

    // 3. Parse and Validate Request Payload
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request body.' },
        { status: 400 }
      );
    }

    const rawTrackId = body.trackId || (body.productId ? body.productId.replace(/_(lifetime|monthly)$/, '') : '');
    const canonicalTrack = normalizeTrackId(rawTrackId);
    const productId = body.productId || (canonicalTrack === 'all' || body.planId === 'all_access' ? 'all_courses_lifetime' : `${canonicalTrack}_lifetime`);

    // 4. Resolve Trusted Product Catalog Record
    const product = getTrackProduct(productId);
    if (!product || product.billingType !== 'one_time') {
      return NextResponse.json(
        { error: `Invalid or unsupported product identifier: "${productId}".` },
        { status: 400 }
      );
    }

    // Critical Invariant: Reject unconfigured products lacking owner approval
    if (!product.isActive || product.amountPaise === null) {
      return NextResponse.json(
        {
          error: `Product pricing for ${product.trackTitle} requires explicit owner approval and is not yet configured for live checkout.`,
          requiresApproval: true,
          productId: product.id,
        },
        { status: 400 }
      );
    }

    // Check if user already holds active lifetime entitlement
    if (productId.includes('all') || canonicalTrack === 'all') {
      if (userCtx.subscriptionTier === 'all_access' && !userCtx.validUntil) {
        return NextResponse.json(
          {
            error: 'You already own permanent lifetime access to All Courses.',
            alreadyOwned: true,
            trackId: 'all',
          },
          { status: 400 }
        );
      }
    } else {
      const existingGrant = userCtx.trackGrants[canonicalTrack];
      if (existingGrant && existingGrant.status === 'active' && existingGrant.sourceType === 'lifetime_purchase') {
        return NextResponse.json(
          {
            error: `You already own permanent lifetime access to the ${product.trackTitle} track.`,
            alreadyOwned: true,
            trackId: canonicalTrack,
          },
          { status: 400 }
        );
      }
    }

    const receipt = `rcpt_${userCtx.userId.slice(0, 8)}_${Date.now()}`;
    const notes = {
      userId: userCtx.userId,
      userEmail: userCtx.email || '',
      trackId: canonicalTrack,
      productId: product.id,
      billingType: 'one_time',
    };

    const { keyId } = getRazorpayCredentials();

    if (!isRazorpayConfigured() || !keyId) {
      return NextResponse.json(
        {
          error:
            'Razorpay payment gateway is not configured on this server. Please configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment variables.',
          missingGatewayConfig: true,
        },
        { status: 503 }
      );
    }

    // 5. Create Order via Razorpay REST API
    const { order, error: rzpError } = await createRazorpayOrder({
      amount: product.amountPaise,
      currency: 'INR',
      receipt,
      notes,
    });

    if (rzpError || !order) {
      return NextResponse.json(
        { error: `Payment gateway error: ${rzpError}` },
        { status: 502 }
      );
    }

    const orderId = order.id;
    const orderAmount = order.amount;
    const orderCurrency: 'INR' = 'INR';

    // 6. Record Durable Order in Database
    await recordOrderCreation({
      orderId,
      userId: userCtx.userId,
      trackId: canonicalTrack,
      productId: product.id,
      amountPaise: orderAmount,
      currency: orderCurrency,
      notes,
    });

    return NextResponse.json(
      {
        success: true,
        orderId,
        amount: orderAmount,
        currency: orderCurrency,
        trackId: canonicalTrack,
        productId: product.id,
        trackTitle: product.trackTitle,
        keyId,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        },
      }
    );
  } catch (err: any) {
    console.error('[/api/payments/create-order] Internal error:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred while creating order.' },
      { status: 500 }
    );
  }
}
