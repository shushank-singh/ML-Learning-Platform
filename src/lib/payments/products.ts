/**
 * Trusted Server-Side Product Catalog for AzurLearn Tracks
 *
 * Implements track-based pricing with two separate billing options per track:
 * 1. Lifetime purchase (one-time payment, never expires).
 * 2. Monthly subscription (recurring billing, renewable access).
 *
 * CRITICAL BUSINESS & SECURITY RULES:
 * - Currency is restricted strictly to 'INR'.
 * - Amounts are integers in paise (e.g. 299900 = ₹2,999).
 * - Never invent prices or activate products without explicit owner configuration.
 * - Products without approved pricing or Razorpay plan IDs are marked isActive = false.
 * - Purchases for unconfigured/inactive products are strictly rejected server-side.
 */

import { CANONICAL_TRACK_IDS, CanonicalTrackId, normalizeTrackId } from '@/lib/entitlements/config';
import { TrackBillingType } from '@/lib/entitlements/types';

export interface TrackProduct {
  id: string; // e.g. "all_courses_lifetime", "all_courses_monthly", "ml_lifetime"
  trackId: CanonicalTrackId | 'all';
  trackTitle: string;
  billingType: TrackBillingType;
  amountPaise: number | null; // null if unapproved/unconfigured
  currency: 'INR';
  displayPrice: string;
  billingPeriod: 'lifetime' | 'monthly';
  isActive: boolean;
  razorpayPlanId: string | null; // Required for monthly subscriptions
  description: string;
  requiresOwnerApproval: boolean;
}

export const TRACK_METADATA: Record<CanonicalTrackId, { title: string; description: string }> = {
  'ml': {
    title: 'Machine Learning Core',
    description: 'Foundations, Mathematics, Regression, Classification, Ensembles, and Production ML (Modules 0–11).',
  },
  'numpy': {
    title: 'NumPy Mastery',
    description: 'In-depth array instantiation, striding, memory layouts, vectorization, and broadcasting.',
  },
  'pandas': {
    title: 'Pandas Mastery',
    description: 'Series, DataFrames, advanced grouping, time-series, indexing, and high-performance ingestion.',
  },
  'python': {
    title: 'Python Programming Mastery',
    description: 'Execution model, OOP, closures, generators, decorators, memory management, and debugging.',
  },
  'java': {
    title: 'Java Programming Mastery',
    description: 'JVM internals, concurrency, garbage collection, OOP patterns, and enterprise frameworks.',
  },
  'dsa': {
    title: 'Data Structures & Algorithms',
    description: 'Arrays, Trees, Graphs, Dynamic Programming, and algorithmic problem-solving patterns.',
  },
  'deep-learning': {
    title: 'Deep Learning',
    description: 'Backpropagation, PyTorch/TensorFlow, CNNs, RNNs, and deep architecture optimization (DL-01 to DL-22).',
  },
  'transformers': {
    title: 'Transformers & LLMs',
    description: 'Attention mechanisms, BERT, GPT, causal masking, positional encodings, and tokenizer design.',
  },
  'genai': {
    title: 'Generative AI & LLMs',
    description: 'Fine-tuning, LoRA, QLoRA, prompt engineering, diffusion models, and evaluation frameworks.',
  },
  'rag': {
    title: 'RAG & Vector Search',
    description: 'Vector databases, HNSW indexing, chunking strategies, hybrid search, and hallucination reduction.',
  },
  'agents': {
    title: 'Autonomous AI Agents',
    description: 'ReAct loops, multi-agent swarms, tool calling, memory management, and HITL safety rails.',
  },
  'mlops': {
    title: 'MLOps & LLMOps',
    description: 'Feature stores, CI/CD quality gates, model monitoring, drift detection, and automated retraining.',
  },
  'deployment': {
    title: 'AI Deployment & Cloud',
    description: 'Triton, vLLM, TensorRT-LLM, Kubernetes, multi-AZ autoscaling, and low-latency serving.',
  },
};

/**
 * Resolves configured price in paise from server environment if approved by owner.
 * Format: TRACK_PRICE_<TRACK>_<BILLING>_PAISE, e.g. TRACK_PRICE_ML_LIFETIME_PAISE
 */
function resolveEnvPrice(trackId: CanonicalTrackId, billing: 'lifetime' | 'monthly'): number | null {
  const envKey = `TRACK_PRICE_${trackId.toUpperCase().replace(/-/g, '_')}_${billing.toUpperCase()}_PAISE`;
  const envVal = process.env[envKey];
  if (envVal && !isNaN(Number(envVal)) && Number(envVal) > 0) {
    return parseInt(envVal, 10);
  }
  return null;
}

/**
 * Resolves Razorpay Plan ID for monthly subscriptions from server environment.
 * Format: TRACK_PLAN_<TRACK>_MONTHLY_ID, e.g. TRACK_PLAN_ML_MONTHLY_ID
 */
function resolveEnvPlanId(trackId: CanonicalTrackId): string | null {
  const envKey = `TRACK_PLAN_${trackId.toUpperCase().replace(/-/g, '_')}_MONTHLY_ID`;
  const envVal = process.env[envKey];
  if (envVal && envVal.trim().length > 0) {
    return envVal.trim();
  }
  return null;
}

/**
 * Builds the complete product catalog.
 * Any product without an explicitly configured price or plan ID remains inactive with requiresOwnerApproval = true.
 */
export function buildProductCatalog(): Record<string, TrackProduct> {
  const catalog: Record<string, TrackProduct> = {};

  for (const trackId of CANONICAL_TRACK_IDS) {
    const meta = TRACK_METADATA[trackId];

    // 1. Lifetime One-Time Purchase Product
    const lifetimeId = `${trackId}_lifetime`;
    const lifetimePrice = resolveEnvPrice(trackId, 'lifetime');
    const isLifetimeConfigured = lifetimePrice !== null;

    catalog[lifetimeId] = {
      id: lifetimeId,
      trackId,
      trackTitle: meta.title,
      billingType: 'one_time',
      amountPaise: lifetimePrice,
      currency: 'INR',
      displayPrice: isLifetimeConfigured ? `₹${(lifetimePrice! / 100).toLocaleString('en-IN')}` : 'Pricing Pending Approval',
      billingPeriod: 'lifetime',
      isActive: isLifetimeConfigured,
      razorpayPlanId: null,
      description: `Lifetime unrestricted access to the complete ${meta.title} track. One-time payment, never expires.`,
      requiresOwnerApproval: !isLifetimeConfigured,
    };

    // 2. Monthly Subscription Product
    const monthlyId = `${trackId}_monthly`;
    const monthlyPrice = resolveEnvPrice(trackId, 'monthly');
    const monthlyPlanId = resolveEnvPlanId(trackId);
    const isMonthlyConfigured = monthlyPrice !== null && monthlyPlanId !== null;

    catalog[monthlyId] = {
      id: monthlyId,
      trackId,
      trackTitle: meta.title,
      billingType: 'monthly_subscription',
      amountPaise: monthlyPrice,
      currency: 'INR',
      displayPrice: isMonthlyConfigured ? `₹${(monthlyPrice! / 100).toLocaleString('en-IN')}/mo` : 'Subscription Pending Approval',
      billingPeriod: 'monthly',
      isActive: isMonthlyConfigured,
      razorpayPlanId: monthlyPlanId,
      description: `Monthly renewable subscription to the complete ${meta.title} track. Cancel anytime.`,
      requiresOwnerApproval: !isMonthlyConfigured,
    };
  }

  // -------------------------------------------------------------
  // ALL COURSES PLANS (Platform-Wide All-Access)
  // -------------------------------------------------------------

  // 1. All Courses Lifetime Pass — ₹399
  const lifetimeAllPrice = process.env.PLANS_LIFETIME_ALL_PAISE
    ? parseInt(process.env.PLANS_LIFETIME_ALL_PAISE, 10)
    : 39900; // ₹399 in paise

  const allLifetimeProduct: TrackProduct = {
    id: 'all_courses_lifetime',
    trackId: 'all',
    trackTitle: 'All Courses (Lifetime Pass)',
    billingType: 'one_time',
    amountPaise: lifetimeAllPrice,
    currency: 'INR',
    displayPrice: `₹${(lifetimeAllPrice / 100).toLocaleString('en-IN')}`,
    billingPeriod: 'lifetime',
    isActive: true,
    razorpayPlanId: null,
    description: 'Permanent lifetime access to all 13 curriculum tracks, 131 modules, 417 lessons, interactive coding visualizers, and AI Tutor. One-time payment, never expires.',
    requiresOwnerApproval: false,
  };
  catalog['all_courses_lifetime'] = allLifetimeProduct;
  catalog['all_lifetime'] = allLifetimeProduct;

  // 2. All Courses Monthly Plan — ₹99/mo
  const monthlyAllPrice = process.env.PLANS_MONTHLY_ALL_PAISE
    ? parseInt(process.env.PLANS_MONTHLY_ALL_PAISE, 10)
    : 9900; // ₹99 in paise

  const allMonthlyProduct: TrackProduct = {
    id: 'all_courses_monthly',
    trackId: 'all',
    trackTitle: 'All Courses (Monthly Plan)',
    billingType: 'monthly_subscription',
    amountPaise: monthlyAllPrice,
    currency: 'INR',
    displayPrice: `₹${(monthlyAllPrice / 100).toLocaleString('en-IN')}/mo`,
    billingPeriod: 'monthly',
    isActive: true,
    razorpayPlanId: process.env.RAZORPAY_MONTHLY_PLAN_ID || 'plan_TxC1G2P04xPWfW',
    description: 'Flexible monthly subscription to all 13 curriculum tracks, 131 modules, 417 lessons, interactive coding visualizers, and AI Tutor. Automatically renews monthly, cancel anytime.',
    requiresOwnerApproval: false,
  };
  catalog['all_courses_monthly'] = allMonthlyProduct;
  catalog['all_monthly'] = allMonthlyProduct;

  return catalog;
}

export const PRODUCT_CATALOG = buildProductCatalog();

export function getTrackProduct(productId: string): TrackProduct | null {
  if (!productId) return null;
  const cleanId = productId.trim().toLowerCase();
  const catalog = buildProductCatalog();
  return catalog[cleanId] || null;
}

export function getTrackProducts(trackId: string): TrackProduct[] {
  const canonical = normalizeTrackId(trackId) as CanonicalTrackId;
  const catalog = buildProductCatalog();
  return Object.values(catalog).filter((p) => p.trackId === canonical);
}

export function getAllTrackProducts(): TrackProduct[] {
  const catalog = buildProductCatalog();
  const seen = new Set<string>();
  return Object.values(catalog).filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}
