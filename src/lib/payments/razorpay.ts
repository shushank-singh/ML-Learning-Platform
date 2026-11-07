/**
 * Razorpay Payment Gateway Integration Service
 *
 * Implements server-side:
 * 1. One-time Order creation (POST /v1/orders)
 * 2. Monthly Subscription creation (POST /v1/subscriptions)
 * 3. Payment signature verification (HMAC-SHA256 orderId|paymentId)
 * 4. Subscription signature verification (HMAC-SHA256 paymentId|subscriptionId)
 * 5. Webhook signature verification against exact raw body (HMAC-SHA256 rawBody)
 * 6. Payment, Subscription, and Order verification queries.
 *
 * Adheres strictly to Razorpay Standard Checkout contracts and timing-safe comparisons.
 */

import crypto from 'crypto';

export interface RazorpayOrderResponse {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, any>;
  created_at: number;
}

export interface RazorpaySubscriptionResponse {
  id: string;
  entity: 'subscription';
  plan_id: string;
  status: 'created' | 'authenticated' | 'active' | 'pending' | 'halted' | 'cancelled' | 'completed' | 'expired';
  current_start: number | null;
  current_end: number | null;
  ended_at: number | null;
  quantity: number;
  charge_at: number | null;
  start_at: number | null;
  end_at: number | null;
  auth_attempts: number;
  total_count: number;
  paid_count: number;
  customer_notify: boolean;
  notes: Record<string, any>;
  short_url?: string;
  created_at: number;
}

export interface RazorpayPaymentEntity {
  id: string;
  entity: 'payment';
  amount: number;
  currency: string;
  status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
  order_id: string | null;
  invoice_id: string | null;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description: string;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string;
  contact: string;
  notes: Record<string, any>;
  fee: number;
  tax: number;
  error_code: string | null;
  error_description: string | null;
  created_at: number;
}

export function getRazorpayCredentials() {
  const keyId =
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    '';

  const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

  return {
    keyId: keyId.trim(),
    keySecret: keySecret.trim(),
    webhookSecret: webhookSecret.trim(),
  };
}

export function isRazorpayConfigured(): boolean {
  const { keyId, keySecret } = getRazorpayCredentials();
  return Boolean(keyId && keySecret);
}

/**
 * Creates an order directly via the Razorpay Orders REST API.
 */
export async function createRazorpayOrder(params: {
  amount: number; // in paise
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<{ order?: RazorpayOrderResponse; error?: string }> {
  const { keyId, keySecret } = getRazorpayCredentials();

  if (!keyId || !keySecret) {
    return {
      error: 'Razorpay gateway credentials are not configured on the server.',
    };
  }

  const authString = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  try {
    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency,
        receipt: params.receipt,
        notes: params.notes || {},
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data.error?.description || data.error?.message || 'Failed to create Razorpay order.';
      return { error: msg };
    }

    return { order: data as RazorpayOrderResponse };
  } catch (err: any) {
    return { error: err.message || 'Network error communicating with Razorpay.' };
  }
}

/**
 * Creates a recurring subscription directly via the Razorpay Subscriptions REST API.
 */
export async function createRazorpaySubscription(params: {
  planId: string;
  totalCount?: number;
  customerNotify?: boolean;
  notes?: Record<string, string>;
}): Promise<{ subscription?: RazorpaySubscriptionResponse; error?: string }> {
  const { keyId, keySecret } = getRazorpayCredentials();

  if (!keyId || !keySecret) {
    return {
      error: 'Razorpay gateway credentials are not configured on the server.',
    };
  }

  const authString = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  try {
    const res = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify({
        plan_id: params.planId,
        total_count: params.totalCount || 12,
        customer_notify: params.customerNotify !== false ? 1 : 0,
        notes: params.notes || {},
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data.error?.description || data.error?.message || 'Failed to create Razorpay subscription.';
      return { error: msg };
    }

    return { subscription: data as RazorpaySubscriptionResponse };
  } catch (err: any) {
    return { error: err.message || 'Network error communicating with Razorpay.' };
  }
}

/**
 * Verifies standard checkout payment signature using HMAC-SHA256 with timing-safe comparison.
 * Pattern: HMAC_SHA256(order_id + '|' + payment_id, secret)
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
  customSecret?: string;
}): boolean {
  const { keySecret } = getRazorpayCredentials();
  const secret = params.customSecret || keySecret;

  if (!secret || !params.orderId || !params.paymentId || !params.signature) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${params.orderId}|${params.paymentId}`)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const actualBuffer = Buffer.from(params.signature, 'utf8');

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
}

/**
 * Verifies subscription checkout payment signature using HMAC-SHA256 with timing-safe comparison.
 * Pattern: HMAC_SHA256(payment_id + '|' + subscription_id, secret)
 */
export function verifySubscriptionSignature(params: {
  subscriptionId: string;
  paymentId: string;
  signature: string;
  customSecret?: string;
}): boolean {
  const { keySecret } = getRazorpayCredentials();
  const secret = params.customSecret || keySecret;

  if (!secret || !params.subscriptionId || !params.paymentId || !params.signature) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${params.paymentId}|${params.subscriptionId}`)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const actualBuffer = Buffer.from(params.signature, 'utf8');

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
}

/**
 * Verifies webhook payload signature using HMAC-SHA256 with timing-safe comparison.
 * Must be run against the exact unparsed raw request body buffer or string.
 */
export function verifyWebhookSignature(params: {
  rawBody: string | Buffer;
  signature: string;
  customSecret?: string;
}): boolean {
  const { webhookSecret } = getRazorpayCredentials();
  const secret = params.customSecret || webhookSecret;

  if (!secret || !params.rawBody || !params.signature) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(params.rawBody)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const actualBuffer = Buffer.from(params.signature, 'utf8');

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
}

/**
 * Fetches payment details from the Razorpay Payments API to verify status and amount.
 */
export async function fetchRazorpayPayment(
  paymentId: string
): Promise<{ payment?: RazorpayPaymentEntity; error?: string }> {
  const { keyId, keySecret } = getRazorpayCredentials();

  if (!keyId || !keySecret) {
    return { error: 'Razorpay credentials not configured.' };
  }

  const authString = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  try {
    const res = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.error?.description || 'Failed to fetch payment details.' };
    }

    return { payment: data as RazorpayPaymentEntity };
  } catch (err: any) {
    return { error: err.message || 'Network error fetching payment.' };
  }
}

/**
 * Fetches subscription details from the Razorpay Subscriptions API.
 */
export async function fetchRazorpaySubscription(
  subscriptionId: string
): Promise<{ subscription?: RazorpaySubscriptionResponse; error?: string }> {
  const { keyId, keySecret } = getRazorpayCredentials();

  if (!keyId || !keySecret) {
    return { error: 'Razorpay credentials not configured.' };
  }

  const authString = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  try {
    const res = await fetch(`https://api.razorpay.com/v1/subscriptions/${subscriptionId}`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.error?.description || 'Failed to fetch subscription details.' };
    }

    return { subscription: data as RazorpaySubscriptionResponse };
  } catch (err: any) {
    return { error: err.message || 'Network error fetching subscription.' };
  }
}

/**
 * Fetches all payments associated with an order ID (for reconciliation).
 */
export async function fetchRazorpayOrderPayments(
  orderId: string
): Promise<{ payments?: RazorpayPaymentEntity[]; error?: string }> {
  const { keyId, keySecret } = getRazorpayCredentials();

  if (!keyId || !keySecret) {
    return { error: 'Razorpay credentials not configured.' };
  }

  const authString = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  try {
    const res = await fetch(`https://api.razorpay.com/v1/orders/${orderId}/payments`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.error?.description || 'Failed to fetch order payments.' };
    }

    return { payments: (data.items || []) as RazorpayPaymentEntity[] };
  } catch (err: any) {
    return { error: err.message || 'Network error fetching order payments.' };
  }
}
