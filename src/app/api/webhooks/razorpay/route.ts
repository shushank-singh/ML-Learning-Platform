import { NextRequest, NextResponse } from 'next/server';
import {
  getRazorpayCredentials,
  verifyWebhookSignature,
} from '@/lib/payments/razorpay';
import {
  cancelSubscriptionRecord,
  isWebhookEventProcessed,
  processTrackRefund,
  recordWebhookEvent,
  settleOneTimeOrder,
  settleSubscriptionActivation,
} from '@/lib/payments/lifecycle';
import { normalizeTrackId } from '@/lib/entitlements/config';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Read Raw Request Body (Mandatory for HMAC signature verification)
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    const { webhookSecret } = getRazorpayCredentials();

    // 2. Validate Webhook Signature
    if (webhookSecret) {
      if (!signature) {
        console.warn('[Razorpay Webhook] Missing x-razorpay-signature header.');
        return NextResponse.json(
          { error: 'Missing x-razorpay-signature header.' },
          { status: 400 }
        );
      }

      const isValid = verifyWebhookSignature({
        rawBody,
        signature,
      });

      if (!isValid) {
        console.warn('[Razorpay Webhook] Security Alert: Invalid webhook signature received.');
        return NextResponse.json(
          { error: 'Invalid webhook signature.' },
          { status: 400 }
        );
      }
    }

    // 3. Parse JSON Event Payload
    let event: any;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    const eventId = event.id || `evt_${Date.now()}`;
    const eventType = event.event;

    // 4. Idempotency Check: Prevent duplicate processing of retry deliveries
    const alreadyProcessed = await isWebhookEventProcessed(eventId);
    if (alreadyProcessed) {
      return NextResponse.json(
        { status: 'already_processed', message: 'Event was previously processed.' },
        { status: 200 }
      );
    }

    // 5. Audit & Deduplication Record
    await recordWebhookEvent(eventId, eventType, event);

    const admin = getSupabaseAdminClient();

    // 6. Handle Specific Event Types
    switch (eventType) {
      // -------------------------------------------------------------
      // ONE-TIME PAYMENTS: Captured / Paid
      // -------------------------------------------------------------
      case 'order.paid':
      case 'payment.captured': {
        const paymentEntity = event.payload?.payment?.entity;
        const orderEntity = event.payload?.order?.entity;

        const paymentId = paymentEntity?.id;
        const orderId = paymentEntity?.order_id || orderEntity?.id;
        const amountPaise = paymentEntity?.amount || orderEntity?.amount || 0;
        const currency = paymentEntity?.currency || orderEntity?.currency || 'INR';

        // Check if this payment belongs to a subscription instead of an order
        const subscriptionId = paymentEntity?.subscription_id;
        if (subscriptionId) {
          // Handled under subscription.charged / activated
          break;
        }

        if (!orderId || !paymentId) {
          console.warn('[Razorpay Webhook] Incomplete payment entity in payload.');
          break;
        }

        let userId = paymentEntity?.notes?.userId || orderEntity?.notes?.userId;
        let trackId = paymentEntity?.notes?.trackId || orderEntity?.notes?.trackId || 'ml';
        let productId = paymentEntity?.notes?.productId || orderEntity?.notes?.productId || `${trackId}_lifetime`;

        if (!userId && admin) {
          const { data } = await admin
            .from('payment_orders')
            .select('user_id, track_id, product_id, amount_paise')
            .eq('id', orderId)
            .maybeSingle();

          if (data) {
            userId = data.user_id;
            trackId = data.track_id;
            productId = data.product_id;
          }
        }

        if (userId) {
          await settleOneTimeOrder({
            orderId,
            paymentId,
            userId,
            trackId: normalizeTrackId(trackId),
            productId,
            amountPaise,
            currency,
            method: paymentEntity?.method || 'webhook',
            rawResponse: paymentEntity || {},
          });
          console.info(`[Razorpay Webhook] Settled lifetime order ${orderId} for user ${userId} -> track ${trackId}`);
        } else {
          console.error(`[Razorpay Webhook] Unable to identify user for order ${orderId}`);
        }
        break;
      }

      // -------------------------------------------------------------
      // SUBSCRIPTIONS: Activated / Charged / Renewed
      // -------------------------------------------------------------
      case 'subscription.authenticated':
      case 'subscription.activated':
      case 'subscription.charged': {
        const subscriptionEntity = event.payload?.subscription?.entity;
        const paymentEntity = event.payload?.payment?.entity;

        const subscriptionId = subscriptionEntity?.id;
        if (!subscriptionId) break;

        const paymentId = paymentEntity?.id;
        const amountPaise = paymentEntity?.amount || subscriptionEntity?.plan_amount || 0;

        let userId = subscriptionEntity?.notes?.userId;
        let trackId = subscriptionEntity?.notes?.trackId || 'ml';
        let productId = subscriptionEntity?.notes?.productId || `${trackId}_monthly`;

        if (!userId && admin) {
          const { data } = await admin
            .from('payment_subscriptions')
            .select('user_id, track_id, product_id')
            .eq('id', subscriptionId)
            .maybeSingle();

          if (data) {
            userId = data.user_id;
            trackId = data.track_id;
            productId = data.product_id;
          }
        }

        let periodStart: string | null = null;
        let periodEnd: string | null = null;

        if (subscriptionEntity?.current_start) {
          periodStart = new Date(subscriptionEntity.current_start * 1000).toISOString();
        }
        if (subscriptionEntity?.current_end) {
          periodEnd = new Date(subscriptionEntity.current_end * 1000).toISOString();
        }

        if (userId) {
          await settleSubscriptionActivation({
            subscriptionId,
            paymentId,
            userId,
            trackId: normalizeTrackId(trackId),
            productId,
            amountPaise,
            periodStart,
            periodEnd,
            method: paymentEntity?.method || 'subscription_webhook',
            rawResponse: subscriptionEntity || {},
          });
          console.info(`[Razorpay Webhook] Succeeded ${eventType} for subscription ${subscriptionId} -> track ${trackId}`);
        }
        break;
      }

      // -------------------------------------------------------------
      // SUBSCRIPTIONS: Cancelled / Halted / Pending
      // -------------------------------------------------------------
      case 'subscription.cancelled': {
        const subscriptionEntity = event.payload?.subscription?.entity;
        const subscriptionId = subscriptionEntity?.id;

        if (subscriptionId) {
          await cancelSubscriptionRecord({
            subscriptionId,
            cancelAtPeriodEnd: false, // Immediate cancellation on provider webhook
          });
          console.info(`[Razorpay Webhook] Processed subscription cancellation: ${subscriptionId}`);
        }
        break;
      }

      case 'subscription.halted':
      case 'subscription.pending': {
        const subscriptionEntity = event.payload?.subscription?.entity;
        const subscriptionId = subscriptionEntity?.id;

        if (subscriptionId && admin) {
          await admin
            .from('payment_subscriptions')
            .update({
              status: eventType === 'subscription.halted' ? 'halted' : 'pending',
              updated_at: new Date().toISOString(),
            })
            .eq('id', subscriptionId);
        }
        break;
      }

      // -------------------------------------------------------------
      // PAYMENTS: Failed
      // -------------------------------------------------------------
      case 'payment.failed': {
        const paymentEntity = event.payload?.payment?.entity;
        const orderId = paymentEntity?.order_id;
        const subscriptionId = paymentEntity?.subscription_id;
        const paymentId = paymentEntity?.id;

        console.warn(`[Razorpay Webhook] Payment failed: ${paymentId}. Reason: ${paymentEntity?.error_description}`);

        if (admin) {
          if (orderId) {
            await admin
              .from('payment_orders')
              .update({ status: 'failed', updated_at: new Date().toISOString() })
              .eq('id', orderId);
          }

          if (paymentId) {
            await admin.from('payment_transactions').upsert({
              id: paymentId,
              order_id: orderId || null,
              subscription_id: subscriptionId || null,
              user_id: paymentEntity?.notes?.userId || null,
              amount_paise: paymentEntity?.amount || 0,
              currency: paymentEntity?.currency || 'INR',
              status: 'failed',
              error_code: paymentEntity?.error_code,
              error_description: paymentEntity?.error_description,
              raw_event: paymentEntity || {},
            });
          }
        }
        break;
      }

      // -------------------------------------------------------------
      // REFUNDS: Created / Processed
      // -------------------------------------------------------------
      case 'refund.processed':
      case 'refund.created': {
        const refundEntity = event.payload?.refund?.entity;
        const paymentEntity = event.payload?.payment?.entity;

        const paymentId = refundEntity?.payment_id || paymentEntity?.id;
        const orderId = paymentEntity?.order_id;
        const refundId = refundEntity?.id || `ref_${Date.now()}`;

        if (paymentId) {
          await processTrackRefund({
            orderId,
            paymentId,
            refundId,
            userId: paymentEntity?.notes?.userId,
            trackId: paymentEntity?.notes?.trackId,
          });
          console.info(`[Razorpay Webhook] Processed refund ${refundId} for payment ${paymentId}`);
        }
        break;
      }

      default:
        // Acknowledge other event types safely
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error('[Razorpay Webhook] Internal exception:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred processing webhook.' },
      { status: 500 }
    );
  }
}
