/**
 * Canonical Source of Truth for AzurLearn Subscription Plans & Pricing
 *
 * This server-side module defines all plan identifiers, amounts, currency,
 * included pedagogical tracks, duration, and feature manifests.
 *
 * CRITICAL SECURITY GUARANTEE:
 * Payable amounts and entitlement tiers are NEVER accepted from client requests.
 * The server references this canonical module exclusively.
 */

export type PaidPlanId = 'premium' | 'all_access';
export type PlanId = 'free' | PaidPlanId;

export interface PlanFeature {
  title: string;
  included: boolean;
  highlight?: boolean;
}

export interface PlanConfig {
  id: PlanId;
  name: string;
  badge?: string;
  description: string;
  amountPaise: number; // In currency subunits (paise for INR: 100 paise = ₹1.00)
  currency: 'INR';
  displayPrice: string;
  billingPeriod: string;
  durationDays: number;
  accessibleTracks: string[];
  features: PlanFeature[];
  requiresOwnerApproval: boolean;
}

/**
 * Default pricing in paise (INR).
 * Configurable via server-side environment variables without code modification:
 * - PLANS_PREMIUM_AMOUNT_PAISE
 * - PLANS_ALL_ACCESS_AMOUNT_PAISE
 */
const DEFAULT_PREMIUM_AMOUNT_PAISE = 499900; // ₹4,999 (subject to owner approval)
const DEFAULT_ALL_ACCESS_AMOUNT_PAISE = 39900; // ₹399 (All Courses Lifetime Pass)

function getPlanAmount(planId: PaidPlanId, defaultPaise: number): number {
  if (planId === 'premium') {
    const envVal = process.env.PLANS_PREMIUM_AMOUNT_PAISE;
    if (envVal && !isNaN(Number(envVal))) {
      return parseInt(envVal, 10);
    }
  } else if (planId === 'all_access') {
    const envVal = process.env.PLANS_ALL_ACCESS_AMOUNT_PAISE;
    if (envVal && !isNaN(Number(envVal))) {
      return parseInt(envVal, 10);
    }
  }
  return defaultPaise;
}

export const PLANS: Record<PlanId, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Free Tier',
    badge: 'Always Free',
    description: 'Foundational mastery for all authenticated learners.',
    amountPaise: 0,
    currency: 'INR',
    displayPrice: '₹0',
    billingPeriod: 'forever',
    durationDays: 36500, // 100 years
    accessibleTracks: ['ml', 'numpy', 'pandas', 'python', 'java'], // Module 0 only
    features: [
      { title: 'Machine Learning Module 0 (Foundations & Taxonomy)', included: true },
      { title: 'NumPy Module 0 (Array Instantiation & Memory)', included: true },
      { title: 'Pandas Module 0 (Series & DataFrames)', included: true },
      { title: 'Python Module 0 (Execution Model & Variables)', included: true },
      { title: 'Java Module 0 (JVM Architecture & Foundations)', included: true },
      { title: 'Interactive In-Browser Code Runners', included: true },
      { title: 'Core ML Modules 1–11', included: false },
      { title: 'Deep Learning Track (DL-01 to DL-22)', included: false },
      { title: 'Data Structures & Algorithms (DSA)', included: false },
      { title: 'Transformers & Large Language Models', included: false },
      { title: 'Generative AI, LoRA & RAG Vector Search', included: false },
      { title: 'Autonomous AI Agents & Swarms', included: false },
      { title: 'MLOps, LLMOps & Production Deployment', included: false },
    ],
    requiresOwnerApproval: false,
  },

  premium: {
    id: 'premium',
    name: 'Premium',
    badge: 'Popular',
    description: 'Comprehensive core curriculum covering classical ML, Deep Learning, and Algorithms.',
    amountPaise: getPlanAmount('premium', DEFAULT_PREMIUM_AMOUNT_PAISE),
    currency: 'INR',
    displayPrice: '₹4,999',
    billingPeriod: 'per year',
    durationDays: 365,
    accessibleTracks: [
      'ml',
      'machine-learning',
      'numpy',
      'pandas',
      'python',
      'java',
      'dsa',
      'deep-learning',
    ],
    features: [
      { title: 'Everything in Free Tier', included: true, highlight: true },
      { title: 'All 12 Machine Learning Core Modules (Modules 0–11)', included: true },
      { title: 'Full NumPy & Pandas In-Depth Mastery Modules', included: true },
      { title: 'Complete Deep Learning Track (DL-01 to DL-22)', included: true },
      { title: 'Full Python & Java Mastery Labs (Modules 1–12)', included: true },
      { title: 'Complete Data Structures & Algorithms (DSA Track)', included: true },
      { title: 'Interactive Algorithmic Visualizers & Checkpoints', included: true },
      { title: 'Transformers & Large Language Models', included: false },
      { title: 'Generative AI, LoRA & RAG Vector Search', included: false },
      { title: 'Autonomous AI Agents & Swarms', included: false },
      { title: 'MLOps, LLMOps & Cloud Deployment', included: false },
    ],
    requiresOwnerApproval: true, // Pricing point & duration require owner sign-off
  },

  all_access: {
    id: 'all_access',
    name: 'All Access',
    badge: 'Complete Suite',
    description: 'Full unrestricted platform access to all courses, cutting-edge GenAI, Agents, and Production MLOps.',
    amountPaise: getPlanAmount('all_access', DEFAULT_ALL_ACCESS_AMOUNT_PAISE),
    currency: 'INR',
    displayPrice: '₹399',
    billingPeriod: 'lifetime',
    durationDays: 36500,
    accessibleTracks: [
      'ml',
      'machine-learning',
      'numpy',
      'pandas',
      'python',
      'java',
      'dsa',
      'deep-learning',
      'transformers',
      'genai',
      'rag',
      'agents',
      'mlops',
      'deployment',
    ],
    features: [
      { title: 'Everything in Premium Plan', included: true, highlight: true },
      { title: 'Transformers & Large Language Models (Phase 6)', included: true },
      { title: 'Generative AI, Fine-Tuning & LoRA (Phase 7)', included: true },
      { title: 'RAG, Vector Databases & Semantic Search (Phase 8)', included: true },
      { title: 'Autonomous AI Agents & Multi-Agent Swarms (Phase 9)', included: true },
      { title: 'MLOps, LLMOps & Production Infrastructure (Phase 10)', included: true },
      { title: 'Multi-AZ Cloud Deployment & Autoscaling (Phase 11)', included: true },
      { title: 'Full Interactive Capstone Engineering Projects', included: true },
      { title: 'Priority AI Tutor Queries & Lab Environments', included: true },
    ],
    requiresOwnerApproval: false, // Approved by platform owner
  },
};

/**
 * Returns a plan configuration by ID or null if not found.
 */
export function getPlanConfig(planId: string): PlanConfig | null {
  if (!planId) return null;
  const cleanId = planId.trim().toLowerCase() as PlanId;
  return PLANS[cleanId] || null;
}

/**
 * Validates whether a requested plan ID is a payable plan.
 */
export function isPaidPlanId(planId: string): planId is PaidPlanId {
  return planId === 'premium' || planId === 'all_access';
}
