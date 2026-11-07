/**
 * Central Access Control Policy for AzurLearn
 *
 * Implements deterministic, typed authorization rules for:
 * 1. Verified Owner bypass (full unrestricted access).
 * 2. Free authenticated users (access to exactly the 5 designated Module 0 entries).
 * 3. Deny-by-default for all restricted tracks and modules.
 * 4. Future paid tiers ('premium', 'all_access').
 */

import {
  AccessCheckResult,
  EntitlementTier,
  OwnerConfig,
  TrackEntitlementGrant,
  UserEntitlements,
} from './types';
import {
  FREE_ALLOWED_MODULE_IDS,
  isFreeAllowedModule,
  isFreeAllowedLesson,
  resolveCanonicalModuleId,
  getTrackFromModuleId,
  normalizeTrackId,
} from './config';

/**
 * Validates whether an identity belongs to the configured, verified platform owner.
 *
 * Checks:
 * 1. Explicit server environment variable AZURLEARN_OWNER_ID matching user.id.
 * 2. Explicit server environment variable AZURLEARN_OWNER_EMAIL matching user.email.
 * 3. Server-verified database role === 'owner' (protected by PostgreSQL trigger).
 *
 * Security:
 * - Never trusts client-supplied metadata or flags.
 * - Empty or missing owner config never grants owner access.
 */
export function isOwnerIdentity(params: {
  userId?: string | null;
  email?: string | null;
  role?: string | null;
  ownerConfig?: OwnerConfig;
}): boolean {
  const { userId, email, role, ownerConfig } = params;

  // 1. Check server-configured owner ID (primary immutable UUID)
  const configuredOwnerId = (
    ownerConfig?.ownerId ||
    process.env.AZURLEARN_OWNER_ID ||
    process.env.OWNER_USER_ID ||
    ''
  ).trim();

  if (configuredOwnerId && userId && configuredOwnerId === userId) {
    return true;
  }

  // 2. Check server-configured owner Email (case-insensitive normalized)
  const configuredOwnerEmail = (
    ownerConfig?.ownerEmail ||
    process.env.AZURLEARN_OWNER_EMAIL ||
    process.env.OWNER_EMAIL ||
    ''
  ).trim().toLowerCase();

  if (
    configuredOwnerEmail &&
    email &&
    configuredOwnerEmail === email.trim().toLowerCase()
  ) {
    return true;
  }

  // 3. Check verified database role from public.profiles
  if (role && role.trim().toLowerCase() === 'owner') {
    return true;
  }

  return false;
}

/**
 * Resolves the user's entitlement tier.
 */
export function resolveEntitlementTier(params: {
  isAuthenticated: boolean;
  userId?: string | null;
  email?: string | null;
  role?: string | null;
  subscriptionTier?: string | null;
  ownerConfig?: OwnerConfig;
}): EntitlementTier {
  if (!params.isAuthenticated || !params.userId) {
    return 'anonymous';
  }

  if (isOwnerIdentity(params)) {
    return 'owner';
  }

  if (params.subscriptionTier === 'all_access') {
    return 'all_access';
  }

  if (params.subscriptionTier === 'premium') {
    return 'premium';
  }

  return 'free';
}

/**
 * Evaluates whether a given tier or track grant can access a learning track.
 */
export function canAccessTrack(
  trackId: string,
  tier: EntitlementTier,
  trackGrants?: Record<string, TrackEntitlementGrant>
): AccessCheckResult {
  const cleanTrack = normalizeTrackId(trackId);

  if (tier === 'anonymous') {
    return {
      allowed: false,
      tier,
      reason: 'unauthenticated',
      message: 'Authentication required. Please sign in to access curriculum tracks.',
      trackId: cleanTrack,
      accessType: 'none',
    };
  }

  // Owner has unrestricted access to all tracks
  if (tier === 'owner') {
    return {
      allowed: true,
      tier,
      reason: 'owner_grant',
      message: 'Full owner access granted without purchase.',
      trackId: cleanTrack,
      accessType: 'owner',
    };
  }

  // All Access plan grants all tracks
  if (tier === 'all_access') {
    return {
      allowed: true,
      tier,
      reason: 'plan_grant',
      message: 'All Access subscription grants full track access.',
      trackId: cleanTrack,
      accessType: 'monthly_subscription',
    };
  }

  // Check specific track grant (Lifetime or Monthly Subscription)
  if (trackGrants && trackGrants[cleanTrack]) {
    const grant = trackGrants[cleanTrack];
    const isNotExpired = !grant.validUntil || new Date(grant.validUntil) > new Date();

    if (grant.status === 'active' && isNotExpired) {
      if (grant.sourceType === 'lifetime_purchase') {
        return {
          allowed: true,
          tier,
          reason: 'lifetime_purchase',
          message: 'Purchased lifetime access to this track.',
          trackId: cleanTrack,
          accessType: 'lifetime',
        };
      }
      if (grant.sourceType === 'monthly_subscription') {
        return {
          allowed: true,
          tier,
          reason: 'monthly_subscription',
          message: 'Active monthly subscription to this track.',
          trackId: cleanTrack,
          accessType: 'monthly_subscription',
        };
      }
    }
  }

  const premiumPermittedTracks = [
    'ml',
    'numpy',
    'pandas',
    'python',
    'java',
    'dsa',
    'deep-learning',
  ];

  const requiresAllAccessTracks = [
    'transformers',
    'genai',
    'rag',
    'agents',
    'mlops',
    'deployment',
  ];

  // Legacy/Tier Premium tracks
  if (tier === 'premium') {
    if (premiumPermittedTracks.includes(cleanTrack)) {
      return {
        allowed: true,
        tier,
        reason: 'plan_grant',
        message: 'Premium subscription grants access to this track.',
        trackId: cleanTrack,
        accessType: 'monthly_subscription',
      };
    }
    if (requiresAllAccessTracks.includes(cleanTrack)) {
      return {
        allowed: false,
        tier,
        reason: 'track_locked',
        message: `The ${trackId} track is restricted and requires track purchase or an All Access plan.`,
        trackId: cleanTrack,
        accessType: 'none',
        requiredPlan: 'all_access',
      };
    }
  }

  // Tracks with approved free access (Module 0 only)
  const partiallyFreeTracks = ['ml', 'numpy', 'pandas', 'python', 'java'];

  if (partiallyFreeTracks.includes(cleanTrack)) {
    return {
      allowed: true,
      tier,
      reason: 'free_allowlist',
      message: 'Free tier has access to Module 0 of this track.',
      trackId: cleanTrack,
      accessType: 'free_only',
    };
  }

  // All other tracks are restricted for free tier
  const isAllAccessExclusive = requiresAllAccessTracks.includes(cleanTrack);
  return {
    allowed: false,
    tier,
    reason: 'track_locked',
    message: `The ${trackId} track is restricted and requires track purchase or an upgraded plan.`,
    trackId: cleanTrack,
    accessType: 'none',
    requiredPlan: isAllAccessExclusive ? 'all_access' : 'premium',
  };
}

/**
 * Evaluates whether a given tier or track grant can access a specific curriculum module.
 */
export function canAccessModule(
  moduleId: string,
  tier: EntitlementTier,
  trackGrants?: Record<string, TrackEntitlementGrant>
): AccessCheckResult {
  const canonicalId = resolveCanonicalModuleId(moduleId);
  const track = normalizeTrackId(getTrackFromModuleId(canonicalId));

  if (tier === 'anonymous') {
    return {
      allowed: false,
      tier,
      reason: 'unauthenticated',
      message: 'Authentication required. Please sign in to view this module.',
      moduleId: canonicalId,
      trackId: track,
      accessType: 'none',
    };
  }

  // Owner has unrestricted access
  if (tier === 'owner') {
    return {
      allowed: true,
      tier,
      reason: 'owner_grant',
      message: 'Unrestricted owner access.',
      moduleId: canonicalId,
      trackId: track,
      accessType: 'owner',
    };
  }

  // All Access plan
  if (tier === 'all_access') {
    return {
      allowed: true,
      tier,
      reason: 'plan_grant',
      message: 'All Access subscription grant.',
      moduleId: canonicalId,
      trackId: track,
      accessType: 'monthly_subscription',
    };
  }

  // Check specific track grant (Lifetime or Monthly Subscription)
  if (trackGrants && trackGrants[track]) {
    const grant = trackGrants[track];
    const isNotExpired = !grant.validUntil || new Date(grant.validUntil) > new Date();

    if (grant.status === 'active' && isNotExpired) {
      return {
        allowed: true,
        tier,
        reason: grant.sourceType === 'lifetime_purchase' ? 'lifetime_purchase' : 'monthly_subscription',
        message: `Access granted via ${grant.sourceType === 'lifetime_purchase' ? 'lifetime purchase' : 'monthly subscription'} of the ${track} track.`,
        moduleId: canonicalId,
        trackId: track,
        accessType: grant.sourceType === 'lifetime_purchase' ? 'lifetime' : 'monthly_subscription',
      };
    }
  }

  const requiresAllAccessTracks = [
    'transformers',
    'genai',
    'rag',
    'agents',
    'mlops',
    'deployment',
  ];

  // Premium tier grants standard tracks (ML, NumPy, Pandas, Python, Java, DSA, Deep Learning)
  if (tier === 'premium') {
    if (requiresAllAccessTracks.includes(track)) {
      return {
        allowed: false,
        tier,
        reason: 'module_locked',
        message: `Module "${moduleId}" belongs to track "${track}" and requires track purchase or an All Access plan.`,
        moduleId: canonicalId,
        trackId: track,
        accessType: 'none',
        requiredPlan: 'all_access',
      };
    }
    return {
      allowed: true,
      tier,
      reason: 'plan_grant',
      message: 'Premium subscription access.',
      moduleId: canonicalId,
      trackId: track,
      accessType: 'monthly_subscription',
    };
  }

  // Free Tier: Allow ONLY the five designated Module 0 modules
  if (isFreeAllowedModule(canonicalId)) {
    return {
      allowed: true,
      tier,
      reason: 'free_allowlist',
      message: 'Access granted under the free tier Module 0 allowlist.',
      moduleId: canonicalId,
      trackId: track,
      accessType: 'free_only',
    };
  }

  // Deny-by-default for all other modules
  const isAllAccessRequired = requiresAllAccessTracks.includes(track);
  return {
    allowed: false,
    tier,
    reason: 'module_locked',
    message: `Module "${moduleId}" is restricted. Free tier is limited to Module 0 of Machine Learning, NumPy, Pandas, Python, and Java.`,
    moduleId: canonicalId,
    trackId: track,
    accessType: 'none',
    requiredPlan: isAllAccessRequired ? 'all_access' : 'premium',
  };
}

/**
 * Evaluates whether a given tier or track grant can access a specific lesson.
 */
export function canAccessLesson(
  moduleId: string,
  lessonId: string,
  tier: EntitlementTier,
  trackGrants?: Record<string, TrackEntitlementGrant>
): AccessCheckResult {
  const canonicalModuleId = resolveCanonicalModuleId(moduleId);
  const track = normalizeTrackId(getTrackFromModuleId(canonicalModuleId));

  if (tier === 'anonymous') {
    return {
      allowed: false,
      tier,
      reason: 'unauthenticated',
      message: 'Authentication required. Please sign in to access this lesson.',
      moduleId: canonicalModuleId,
      lessonId,
      trackId: track,
      accessType: 'none',
    };
  }

  // Owner has unrestricted access
  if (tier === 'owner') {
    return {
      allowed: true,
      tier,
      reason: 'owner_grant',
      message: 'Unrestricted owner access.',
      moduleId: canonicalModuleId,
      lessonId,
      trackId: track,
      accessType: 'owner',
    };
  }

  // Check specific track grant (Lifetime or Monthly Subscription)
  if (trackGrants && trackGrants[track]) {
    const grant = trackGrants[track];
    const isNotExpired = !grant.validUntil || new Date(grant.validUntil) > new Date();

    if (grant.status === 'active' && isNotExpired) {
      return {
        allowed: true,
        tier,
        reason: grant.sourceType === 'lifetime_purchase' ? 'lifetime_purchase' : 'monthly_subscription',
        message: `Lesson access granted via ${grant.sourceType === 'lifetime_purchase' ? 'lifetime purchase' : 'monthly subscription'} of track ${track}.`,
        moduleId: canonicalModuleId,
        lessonId,
        trackId: track,
        accessType: grant.sourceType === 'lifetime_purchase' ? 'lifetime' : 'monthly_subscription',
      };
    }
  }

  // Check via canAccessModule
  const moduleCheck = canAccessModule(canonicalModuleId, tier, trackGrants);
  if (moduleCheck.allowed && (tier === 'all_access' || tier === 'premium')) {
    return {
      allowed: true,
      tier,
      reason: 'plan_grant',
      message: 'Plan subscription access.',
      moduleId: canonicalModuleId,
      lessonId,
      trackId: track,
      accessType: 'monthly_subscription',
    };
  }

  // Free tier check: parent module AND lesson MUST both be in the free allowlist
  if (isFreeAllowedModule(canonicalModuleId) && isFreeAllowedLesson(lessonId)) {
    return {
      allowed: true,
      tier,
      reason: 'free_allowlist',
      message: 'Access granted under free tier Module 0 allowlist.',
      moduleId: canonicalModuleId,
      lessonId,
      trackId: track,
      accessType: 'free_only',
    };
  }

  // Deny-by-default
  const requiresAllAccessTracks = [
    'transformers',
    'genai',
    'rag',
    'agents',
    'mlops',
    'deployment',
  ];
  const isAllAccessRequired = requiresAllAccessTracks.includes(track);

  return {
    allowed: false,
    tier,
    reason: 'lesson_locked',
    message: `Lesson "${lessonId}" belongs to restricted module "${canonicalModuleId}" and requires track purchase or an upgraded plan.`,
    moduleId: canonicalModuleId,
    lessonId,
    trackId: track,
    accessType: 'none',
    requiredPlan: isAllAccessRequired ? 'all_access' : 'premium',
  };
}

/**
 * Evaluates whether a user can access a project. Projects are paid/owner-only learning features.
 */
export function canAccessProject(
  projectId: string,
  tier: EntitlementTier,
  trackGrants?: Record<string, TrackEntitlementGrant>
): AccessCheckResult {
  if (tier === 'anonymous') {
    return {
      allowed: false,
      tier,
      reason: 'unauthenticated',
      message: 'Authentication required to access project workspaces.',
      accessType: 'none',
    };
  }

  if (tier === 'owner') {
    return {
      allowed: true,
      tier,
      reason: 'owner_grant',
      message: 'Owner access granted to project workspace.',
      accessType: 'owner',
    };
  }

  if (tier === 'all_access') {
    return {
      allowed: true,
      tier,
      reason: 'plan_grant',
      message: 'All Access plan includes project workspaces.',
      accessType: 'monthly_subscription',
    };
  }

  // Check if user has lifetime access to relevant track or premium
  const cleanProj = (projectId || '').toLowerCase();
  let requiredTrack = 'ml';
  if (cleanProj.includes('dl') || cleanProj.includes('deep-learning')) requiredTrack = 'deep-learning';
  if (cleanProj.includes('tf') || cleanProj.includes('transformers')) requiredTrack = 'transformers';
  if (cleanProj.includes('genai') || cleanProj.includes('lora')) requiredTrack = 'genai';
  if (cleanProj.includes('rag') || cleanProj.includes('vector')) requiredTrack = 'rag';
  if (cleanProj.includes('agent')) requiredTrack = 'agents';
  if (cleanProj.includes('mlops')) requiredTrack = 'mlops';
  if (cleanProj.includes('deployment')) requiredTrack = 'deployment';

  if (trackGrants && trackGrants[requiredTrack]?.status === 'active') {
    return {
      allowed: true,
      tier,
      reason: trackGrants[requiredTrack].sourceType === 'lifetime_purchase' ? 'lifetime_purchase' : 'monthly_subscription',
      message: `Project access granted via ${requiredTrack} track entitlement.`,
      accessType: trackGrants[requiredTrack].sourceType === 'lifetime_purchase' ? 'lifetime' : 'monthly_subscription',
    };
  }

  return {
    allowed: false,
    tier,
    reason: 'track_locked',
    message: 'Project workspaces require an active track purchase or All Access plan.',
    accessType: 'none',
    requiredPlan: 'all_access',
  };
}

/**
 * Assembles the full user entitlements summary.
 */
export function getUserEntitlements(params: {
  isAuthenticated: boolean;
  userId?: string | null;
  email?: string | null;
  role?: string | null;
  subscriptionTier?: string | null;
  subscriptionStatus?: 'active' | 'canceled' | 'expired' | 'none';
  validUntil?: string | null;
  trackGrants?: Record<string, TrackEntitlementGrant>;
  ownerConfig?: OwnerConfig;
}): UserEntitlements {
  const tier = resolveEntitlementTier(params);
  const isOwner = tier === 'owner';
  const trackGrants = params.trackGrants || {};

  return {
    userId: params.userId || null,
    tier,
    isOwner,
    allowedModuleIds: isOwner || tier === 'all_access'
      ? ['*']
      : [...FREE_ALLOWED_MODULE_IDS],
    trackGrants,
    subscriptionStatus: params.subscriptionStatus || (isOwner ? 'active' : 'none'),
    validUntil: params.validUntil || null,
  };
}

