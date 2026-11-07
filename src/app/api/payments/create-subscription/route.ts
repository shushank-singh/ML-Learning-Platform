import { NextRequest, NextResponse } from 'next/server';
import { getServerUserContext } from '@/lib/entitlements/server';
import { normalizeTrackId } from '@/lib/entitlements/config';
import { getTrackProduct } from '@/lib/payments/products';
import {
  createRazorpaySubscription,
  getRazorpayCredentials,
  isRazorpayConfigured,
} from '@/lib/payments/razorpay';
import { recordSubscriptionCreation } from '@/lib/payments/lifecycle';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Authentication
    const userCtx = await getServerUserContext();
    if (!userCtx.isAuthenticated || !userCtx.userId) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to initiate subscription.' },
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
    const productId = body.productId || (canonicalTrack === 'all' || body.planId === 'all_access' ? 'all_courses_monthly' : `${canonicalTrack}_monthly`);

    // 4. Resolve Trusted Product Catalog Record
    const product = getTrackProduct(productId);
    if (!product || product.billingType !== 'monthly_subscription') {
      return NextResponse.json(
        { error: `Invalid or unsupported subscription product identifier: "${productId}".` },
        { status: 400 }
      );
    }

    // Critical Invariant: Reject unconfigured products lacking owner approval or plan ID
    if (!product.isActive || !product.razorpayPlanId || product.amountPaise === null) {
      return NextResponse.json(
        {
          error: `Monthly subscription for ${product.trackTitle} requires explicit owner approval and Razorpay plan configuration.`,
          requiresApproval: true,
          productId: product.id,
        },
        { status: 400 }
      );
    }

    // Check if user already holds active lifetime or monthly entitlement
    if (productId.includes('all') || canonicalTrack === 'all') {
      if (userCtx.subscriptionTier === 'all_access') {
        if (!userCtx.validUntil) {
          return NextResponse.json(
            {
              error: 'You already own permanent lifetime access to All Courses. A subscription is not required.',
              alreadyOwned: true,
              trackId: 'all',
            },
            { status: 400 }
          );
        }
        if (new Date(userCtx.validUntil) > new Date()) {
          return NextResponse.json(
            {
              error: 'You already have an active monthly subscription to All Courses.',
              alreadySubscribed: true,
              trackId: 'all',
            },
            { status: 400 }
          );
        }
      }
    } else {
      const existingGrant = userCtx.trackGrants[canonicalTrack];
      if (existingGrant && existingGrant.status === 'active') {
        if (existingGrant.sourceType === 'lifetime_purchase') {
          return NextResponse.json(
            {
              error: `You already own permanent lifetime access to the ${product.trackTitle} track. A subscription is not required.`,
              alreadyOwned: true,
              trackId: canonicalTrack,
            },
            { status: 400 }
          );
        }
        if (existingGrant.sourceType === 'monthly_subscription') {
          const isNotExpired = !existingGrant.validUntil || new Date(existingGrant.validUntil) > new Date();
          if (isNotExpired) {
            return NextResponse.json(
              {
                error: `You already have an active monthly subscription to the ${product.trackTitle} track.`,
                alreadySubscribed: true,
                trackId: canonicalTrack,
              },
              { status: 400 }
            );
          }
        }
      }
    }

    const notes = {
      userId: userCtx.userId,
      userEmail: userCtx.email || '',
      trackId: canonicalTrack,
      productId: product.id,
      billingType: 'monthly_subscription',
    };

    const { keyId } = getRazorpayCredentials();

    // 5. Create Subscription via Razorpay REST API
    let subscriptionId: string;

    if (isRazorpayConfigured()) {
      const { subscription, error: rzpError } = await createRazorpaySubscription({
        planId: product.razorpayPlanId,
        totalCount: 12,
        customerNotify: true,
        notes,
      });

      if (rzpError || !subscription) {
        return NextResponse.json(
          { error: `Payment gateway error: ${rzpError}` },
          { status: 502 }
        );
      }

      subscriptionId = subscription.id;
    } else {
      // In sandbox/local dev without gateway credentials, provide a test subscription ID
      subscriptionId = `sub_test_${Date.now()}`;
    }

    // 6. Record Durable Subscription in Database
    await recordSubscriptionCreation({
      subscriptionId,
      userId: userCtx.userId,
      trackId: canonicalTrack,
      productId: product.id,
      razorpayPlanId: product.razorpayPlanId,
      notes,
    });

    return NextResponse.json(
      {
        success: true,
        subscriptionId,
        amount: product.amountPaise,
        currency: product.currency,
        trackId: canonicalTrack,
        productId: product.id,
        trackTitle: product.trackTitle,
        planId: product.razorpayPlanId,
        keyId: keyId || 'rzp_test_placeholder',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        },
      }
    );
  } catch (err: any) {
    console.error('[/api/payments/create-subscription] Internal error:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred while creating subscription.' },
      { status: 500 }
    );
  }
}
