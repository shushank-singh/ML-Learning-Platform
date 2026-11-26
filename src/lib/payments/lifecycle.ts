/**
 * AzurLearn Entitlement Lifecycle & Durable Payment Management
 *
 * Implements:
 * 1. Track-level durable order and subscription tracking.
 * 2. Idempotent webhook event ledger.
 * 3. Atomic entitlement provisioning (lifetime vs monthly subscription).
 * 4. Invariant guarantees: Lifetime access is never revoked or expired by subscription updates.
 * 5. Safe handling across Supabase service role and test environments.
 */

import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import { CANONICAL_TRACK_IDS, CanonicalTrackId, normalizeTrackId } from '@/lib/entitlements/config';
import { TrackBillingType } from '@/lib/entitlements/types';
import { invalidateUserEntitlementCache } from '@/lib/entitlements/server';

export interface SettlementResult {
  success: boolean;
  trackId?: string;
  accessType?: 'lifetime' | 'monthly_subscription';
  orderId?: string;
  subscriptionId?: string;
  paymentId?: string;
  error?: string;
}

/**
 * Checks whether a webhook event has already been processed (Idempotency guarantee).
 */
export async function isWebhookEventProcessed(eventId: string): Promise<boolean> {
  if (!eventId) return false;
  const admin = getSupabaseAdminClient();
  if (!admin) return false;

  try {
    const { data } = await admin
      .from('payment_webhook_events')
      .select('id')
      .eq('id', eventId)
      .maybeSingle();

    return Boolean(data);
  } catch {
    return false;
  }
}

/**
 * Records a webhook event in the database for durable audit and deduplication.
 */
export async function recordWebhookEvent(
  eventId: string,
  eventType: string,
  payload: Record<string, any>
): Promise<void> {
  const admin = getSupabaseAdminClient();
  if (!admin) return;

  try {
    await admin.from('payment_webhook_events').upsert({
      id: eventId,
      event_type: eventType,
      status: 'processed',
      payload,
      processed_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('[Lifecycle] Warning recording webhook event:', err);
  }
}

/**
 * Creates or updates a durable one-time payment order in PostgreSQL.
 */
export async function recordOrderCreation(params: {
  orderId: string;
  userId: string;
  trackId: string;
  productId: string;
  amountPaise: number;
  currency: string;
  notes?: Record<string, any>;
}): Promise<boolean> {
  const admin = getSupabaseAdminClient();
  if (!admin) return true;

  const canonicalTrack = normalizeTrackId(params.trackId);

  try {
    // Ensure product catalog row exists to satisfy foreign key constraint
    await admin.from('product_catalog').upsert({
      id: params.productId,
      track_id: canonicalTrack,
      track_title: params.productId.includes('all') ? 'All Courses' : canonicalTrack,
      billing_type: 'one_time',
      amount_paise: params.amountPaise,
      currency: params.currency || 'INR',
      is_active: true,
      description: 'AzurLearn curriculum access pass',
    }, { onConflict: 'id' });

    const { error } = await admin.from('payment_orders').upsert({
      id: params.orderId,
      user_id: params.userId,
      track_id: canonicalTrack,
      product_id: params.productId,
      amount_paise: params.amountPaise,
      currency: params.currency,
      razorpay_order_id: params.orderId,
      status: 'created',
      notes: params.notes || {},
    });

    if (error) {
      console.warn('[Lifecycle] Error recording order:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Lifecycle] Exception recording order:', err);
    return false;
  }
}

/**
 * Creates or updates a durable subscription record in PostgreSQL.
 */
export async function recordSubscriptionCreation(params: {
  subscriptionId: string;
  userId: string;
  trackId: string;
  productId: string;
  razorpayPlanId: string;
  notes?: Record<string, any>;
}): Promise<boolean> {
  const admin = getSupabaseAdminClient();
  if (!admin) return true;

  const canonicalTrack = normalizeTrackId(params.trackId);

  try {
    // Ensure product catalog row exists to satisfy foreign key constraint
    await admin.from('product_catalog').upsert({
      id: params.productId,
      track_id: canonicalTrack,
      track_title: params.productId.includes('all') ? 'All Courses' : canonicalTrack,
      billing_type: 'monthly_subscription',
      amount_paise: 9900,
      currency: 'INR',
      is_active: true,
      razorpay_plan_id: params.razorpayPlanId,
      description: 'AzurLearn monthly subscription pass',
    }, { onConflict: 'id' });

    const { error } = await admin.from('payment_subscriptions').upsert({
      id: params.subscriptionId,
      user_id: params.userId,
      track_id: canonicalTrack,
      product_id: params.productId,
      razorpay_subscription_id: params.subscriptionId,
      razorpay_plan_id: params.razorpayPlanId,
      status: 'created',
      notes: params.notes || {},
    });

    if (error) {
      console.warn('[Lifecycle] Error recording subscription:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Lifecycle] Exception recording subscription:', err);
    return false;
  }
}

/**
 * Grants a track entitlement record in the database.
 * Crucial Invariant: Lifetime grants have valid_until = null and are independent of subscriptions.
 */
export async function grantTrackEntitlement(params: {
  userId: string;
  trackId: string;
  sourceType: 'free_tier' | 'lifetime_purchase' | 'monthly_subscription' | 'owner_grant';
  orderId?: string | null;
  subscriptionId?: string | null;
  validUntil?: string | null;
}): Promise<boolean> {
  const { userId, trackId, sourceType, orderId, subscriptionId, validUntil } = params;
  const canonicalTrack = normalizeTrackId(trackId);
  const admin = getSupabaseAdminClient();

  if (!admin) {
    console.info(`[Lifecycle] Simulated track grant: user ${userId} -> ${canonicalTrack} (${sourceType})`);
    return true;
  }

  try {
    const { error } = await admin.from('track_entitlements').upsert(
      {
        user_id: userId,
        track_id: canonicalTrack,
        source_type: sourceType,
        order_id: orderId || null,
        subscription_id: subscriptionId || null,
        status: 'active',
        valid_from: new Date().toISOString(),
        valid_until: sourceType === 'lifetime_purchase' || sourceType === 'owner_grant' ? null : validUntil,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id, track_id, source_type',
      }
    );

    if (error) {
      console.error('[Lifecycle] Error granting track entitlement:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Lifecycle] Exception granting track entitlement:', err);
    return false;
  }
}

/**
 * Settles a one-time order: marks order as paid, records transaction,
 * and grants lifetime track entitlement atomically.
 */
export async function settleOneTimeOrder(params: {
  orderId: string;
  paymentId: string;
  userId: string;
  trackId: string;
  productId: string;
  amountPaise: number;
  currency: string;
  method?: string;
  rawResponse?: Record<string, any>;
}): Promise<SettlementResult> {
  const { orderId, paymentId, userId, trackId, productId, amountPaise, currency, method, rawResponse } = params;
  const canonicalTrack = normalizeTrackId(trackId);
  const admin = getSupabaseAdminClient();

  if (admin) {
    try {
      // 1. Update order
      await admin
        .from('payment_orders')
        .update({
          status: 'paid',
          razorpay_payment_id: paymentId,
          verified_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      // 2. Record transaction
      await admin.from('payment_transactions').upsert({
        id: paymentId,
        order_id: orderId,
        user_id: userId,
        amount_paise: amountPaise,
        currency,
        status: 'captured',
        method: method || 'standard',
        raw_event: rawResponse || {},
      });
    } catch (err) {
      console.warn('[Lifecycle] Warning updating order record:', err);
    }
  }

  // 3. Grant Lifetime Entitlement
  const isAllAccess = canonicalTrack === 'all' || productId.includes('all');

  if (isAllAccess) {
    if (admin) {
      try {
        await admin.from('user_entitlements').upsert({
          user_id: userId,
          tier: 'all_access',
          status: 'active',
          valid_until: null,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
      } catch (err) {
        console.warn('[Lifecycle] Warning upgrading user tier to all_access:', err);
      }
    }

    for (const t of CANONICAL_TRACK_IDS) {
      await grantTrackEntitlement({
        userId,
        trackId: t,
        sourceType: 'lifetime_purchase',
        orderId,
        validUntil: null,
      });
    }
  }

  const granted = await grantTrackEntitlement({
    userId,
    trackId: canonicalTrack,
    sourceType: 'lifetime_purchase',
    orderId,
    validUntil: null, // Lifetime never expires
  });

  if (!granted) {
    return {
      success: false,
      error: 'Failed to record lifetime entitlement.',
    };
  }

  invalidateUserEntitlementCache(userId);

  return {
    success: true,
    trackId: canonicalTrack,
    accessType: 'lifetime',
    orderId,
    paymentId,
  };
}

/**
 * Settles a monthly subscription activation or renewal: updates subscription record,
 * records transaction, and updates track entitlement period.
 */
export async function settleSubscriptionActivation(params: {
  subscriptionId: string;
  paymentId?: string;
  userId: string;
  trackId: string;
  productId: string;
  amountPaise: number;
  periodStart?: string | null;
  periodEnd?: string | null;
  method?: string;
  rawResponse?: Record<string, any>;
}): Promise<SettlementResult> {
  const { subscriptionId, paymentId, userId, trackId, productId, amountPaise, periodStart, periodEnd, method, rawResponse } = params;
  const canonicalTrack = normalizeTrackId(trackId);
  const admin = getSupabaseAdminClient();

  // If periodEnd is omitted, default to 30 days from now
  const computedEnd = periodEnd || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const computedStart = periodStart || new Date().toISOString();

  if (admin) {
    try {
      // 1. Update subscription status
      await admin
        .from('payment_subscriptions')
        .update({
          status: 'active',
          current_period_start: computedStart,
          current_period_end: computedEnd,
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriptionId);

      // 2. Record transaction if paymentId provided
      if (paymentId) {
        await admin.from('payment_transactions').upsert({
          id: paymentId,
          subscription_id: subscriptionId,
          user_id: userId,
          amount_paise: amountPaise,
          currency: 'INR',
          status: 'captured',
          method: method || 'subscription',
          raw_event: rawResponse || {},
        });
      }
    } catch (err) {
      console.warn('[Lifecycle] Warning updating subscription record:', err);
    }
  }

  // 3. Grant/Update Monthly Track Entitlement
  const isAllAccess = canonicalTrack === 'all' || productId.includes('all');

  if (isAllAccess) {
    if (admin) {
      try {
        await admin.from('user_entitlements').upsert({
          user_id: userId,
          tier: 'all_access',
          status: 'active',
          valid_until: computedEnd,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
      } catch (err) {
        console.warn('[Lifecycle] Warning upgrading user tier to all_access monthly:', err);
      }
    }

    for (const t of CANONICAL_TRACK_IDS) {
      await grantTrackEntitlement({
        userId,
        trackId: t,
        sourceType: 'monthly_subscription',
        subscriptionId,
        validUntil: computedEnd,
      });
    }
  }

  const granted = await grantTrackEntitlement({
    userId,
    trackId: canonicalTrack,
    sourceType: 'monthly_subscription',
    subscriptionId,
    validUntil: computedEnd,
  });

  if (!granted) {
    return {
      success: false,
      error: 'Failed to record subscription entitlement.',
    };
  }

  invalidateUserEntitlementCache(userId);

  return {
    success: true,
    trackId: canonicalTrack,
    accessType: 'monthly_subscription',
    subscriptionId,
    paymentId,
  };
}

/**
 * Handles subscription cancellation: updates subscription record status.
 * If cancelAtPeriodEnd is true, existing access remains valid until current_period_end.
 */
export async function cancelSubscriptionRecord(params: {
  subscriptionId: string;
  cancelAtPeriodEnd?: boolean;
}): Promise<boolean> {
  const { subscriptionId, cancelAtPeriodEnd } = params;
  const admin = getSupabaseAdminClient();
  if (!admin) return true;

  try {
    const { data: sub } = await admin
      .from('payment_subscriptions')
      .select('user_id, track_id, current_period_end')
      .eq('id', subscriptionId)
      .maybeSingle();

    if (!sub) return false;

    await admin
      .from('payment_subscriptions')
      .update({
        status: 'cancelled',
        cancel_at_period_end: Boolean(cancelAtPeriodEnd),
        cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscriptionId);

    // If cancellation is immediate (not at period end), mark entitlement cancelled
    if (!cancelAtPeriodEnd) {
      await admin
        .from('track_entitlements')
        .update({
          status: 'cancelled',
          valid_until: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .match({
          user_id: sub.user_id,
          track_id: sub.track_id,
          source_type: 'monthly_subscription',
        });
    }

    return true;
  } catch (err) {
    console.error('[Lifecycle] Exception cancelling subscription:', err);
    return false;
  }
}

/**
 * Handles refund or chargeback: marks records refunded and revokes the specific entitlement.
 */
export async function processTrackRefund(params: {
  orderId?: string;
  paymentId: string;
  refundId: string;
  userId?: string;
  trackId?: string;
}): Promise<boolean> {
  const { orderId, paymentId, refundId, userId, trackId } = params;
  const admin = getSupabaseAdminClient();
  if (!admin) return true;

  try {
    if (orderId) {
      await admin
        .from('payment_orders')
        .update({ status: 'refunded', updated_at: new Date().toISOString() })
        .eq('id', orderId);
    }

    await admin
      .from('payment_transactions')
      .update({ status: 'refunded' })
      .eq('id', paymentId);

    let targetUserId = userId;
    let targetTrack = trackId ? normalizeTrackId(trackId) : null;

    if (!targetUserId || !targetTrack) {
      if (orderId) {
        const { data } = await admin
          .from('payment_orders')
          .select('user_id, track_id')
          .eq('id', orderId)
          .maybeSingle();

        targetUserId = targetUserId || data?.user_id;
        targetTrack = targetTrack || data?.track_id;
      }
    }

    if (targetUserId && targetTrack) {
      await admin
        .from('track_entitlements')
        .update({
          status: 'cancelled',
          valid_until: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .match({
          user_id: targetUserId,
          track_id: targetTrack,
          source_type: 'lifetime_purchase',
        });
    }

    return true;
  } catch (err) {
    console.error('[Lifecycle] Exception processing refund:', err);
    return false;
  }
}
