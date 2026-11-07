/**
 * Types for AzurLearn Entitlements, Track Products, and Access Control System
 */

export type EntitlementTier = 'anonymous' | 'free' | 'premium' | 'all_access' | 'owner';

export type PlanType = 'free' | 'premium' | 'all_access';

export type TrackBillingType = 'one_time' | 'monthly_subscription';

export type TrackAccessType = 'none' | 'free_only' | 'lifetime' | 'monthly_subscription' | 'owner';

export type AccessDenialReason =
  | 'unauthenticated'
  | 'unauthorized'
  | 'module_locked'
  | 'lesson_locked'
  | 'track_locked'
  | 'not_found';

export type AccessGrantReason =
  | 'owner_grant'
  | 'free_allowlist'
  | 'lifetime_purchase'
  | 'monthly_subscription'
  | 'plan_grant';

export interface AccessCheckResult {
  allowed: boolean;
  tier: EntitlementTier;
  reason: AccessDenialReason | AccessGrantReason;
  message: string;
  moduleId?: string;
  lessonId?: string;
  trackId?: string;
  accessType?: TrackAccessType;
  requiredPlan?: PlanType;
}

export interface TrackEntitlementGrant {
  trackId: string;
  sourceType: 'free_tier' | 'lifetime_purchase' | 'monthly_subscription' | 'owner_grant';
  status: 'active' | 'expired' | 'cancelled';
  validUntil?: string | null;
  orderId?: string | null;
  subscriptionId?: string | null;
}

export interface UserEntitlements {
  userId: string | null;
  tier: EntitlementTier;
  isOwner: boolean;
  allowedModuleIds: string[];
  trackGrants: Record<string, TrackEntitlementGrant>;
  subscriptionStatus?: 'active' | 'canceled' | 'expired' | 'none';
  validUntil?: string | null;
}

export interface OwnerConfig {
  ownerId?: string;
  ownerEmail?: string;
}
