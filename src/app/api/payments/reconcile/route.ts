import { NextRequest, NextResponse } from 'next/server';
import { getServerUserContext } from '@/lib/entitlements/server';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import {
  fetchRazorpayOrderPayments,
  fetchRazorpaySubscription,
  isRazorpayConfigured,
} from '@/lib/payments/razorpay';
import {
  settleOneTimeOrder,
  settleSubscriptionActivation,
} from '@/lib/payments/lifecycle';
import { normalizeTrackId } from '@/lib/entitlements/config';

export const dynamic = 'force-dynamic';

/**
 * Payment Reconciliation Endpoint
 *
 * Provides a fallback recovery path when a user completes payment at the bank/gateway
 * but closes the browser before frontend verification or experiencing delayed webhook delivery.
 * Reconciles both one-time orders and monthly subscriptions.
 */
export async function POST(req: NextRequest) {
  try {
    const userCtx = await getServerUserContext();
    if (!userCtx.isAuthenticated || !userCtx.userId) {
      return NextResponse.json(
        { error: 'Authentication required.' },
        { status: 401 }
      );
    }

    const admin = getSupabaseAdminClient();
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin database service unavailable.' },
        { status: 503 }
      );
    }

    if (!isRazorpayConfigured()) {
      return NextResponse.json({
        reconciled: false,
        message: 'Payment gateway is running in sandbox mode without live credentials.',
      });
    }

    // 1. Check pending one-time orders
    const { data: pendingOrders } = await admin
      .from('payment_orders')
      .select('*')
      .eq('user_id', userCtx.userId)
      .in('status', ['created', 'attempted'])
      .order('created_at', { ascending: false })
      .limit(5);

    if (pendingOrders && pendingOrders.length > 0) {
      for (const order of pendingOrders) {
        const { payments, error } = await fetchRazorpayOrderPayments(order.id);
        if (error || !payments || payments.length === 0) continue;

        const captured = payments.find((p) => p.status === 'captured');
        if (captured) {
          const trackId = normalizeTrackId(order.track_id);
          await settleOneTimeOrder({
            orderId: order.id,
            paymentId: captured.id,
            userId: userCtx.userId,
            trackId,
            productId: order.product_id,
            amountPaise: captured.amount,
            currency: captured.currency,
            method: captured.method,
            rawResponse: captured as any,
          });

          return NextResponse.json({
            reconciled: true,
            message: `One-time order ${order.id} for track "${trackId}" was successfully reconciled!`,
            trackId,
            accessType: 'lifetime',
            orderId: order.id,
            paymentId: captured.id,
          });
        }
      }
    }

    // 2. Check pending subscriptions
    const { data: pendingSubs } = await admin
      .from('payment_subscriptions')
      .select('*')
      .eq('user_id', userCtx.userId)
      .in('status', ['created', 'authenticated'])
      .order('created_at', { ascending: false })
      .limit(5);

    if (pendingSubs && pendingSubs.length > 0) {
      for (const sub of pendingSubs) {
        const { subscription, error } = await fetchRazorpaySubscription(sub.id);
        if (error || !subscription) continue;

        if (subscription.status === 'active') {
          const trackId = normalizeTrackId(sub.track_id);
          const periodEnd = subscription.current_end
            ? new Date(subscription.current_end * 1000).toISOString()
            : null;

          await settleSubscriptionActivation({
            subscriptionId: sub.id,
            userId: userCtx.userId,
            trackId,
            productId: sub.product_id,
            amountPaise: 0,
            periodEnd,
            method: 'reconciliation',
            rawResponse: subscription as any,
          });

          return NextResponse.json({
            reconciled: true,
            message: `Subscription ${sub.id} for track "${trackId}" was successfully reconciled!`,
            trackId,
            accessType: 'monthly_subscription',
            subscriptionId: sub.id,
          });
        }
      }
    }

    return NextResponse.json({
      reconciled: false,
      message: 'No pending orders or subscriptions with confirmed captured payments were found.',
    });
  } catch (err: any) {
    console.error('[/api/payments/reconcile] Error:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred during reconciliation.' },
      { status: 500 }
    );
  }
}
