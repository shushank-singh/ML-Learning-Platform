/**
 * Server-Side Entitlement & Access Verification Services
 *
 * Runs exclusively in Node.js / Server Component / Route Handler environments.
 * Uses trusted Supabase server client and server-only environment variables.
 */

import { cache } from 'react';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import {
  AccessCheckResult,
  EntitlementTier,
  TrackEntitlementGrant,
  UserEntitlements,
} from './types';
import {
  canAccessLesson,
  canAccessModule,
  canAccessProject,
  canAccessTrack,
  getUserEntitlements,
  isOwnerIdentity,
  resolveEntitlementTier,
} from './policy';
import { isFreeAllowedModule, normalizeTrackId } from './config';

export interface ServerUserContext {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  role: string | null;
  subscriptionTier: string | null;
  subscriptionStatus: 'active' | 'canceled' | 'expired' | 'none';
  validUntil: string | null;
  trackGrants: Record<string, TrackEntitlementGrant>;
}

const ENTITLEMENT_CACHE_TTL_MS = 30_000;
const userEntitlementCache = new Map<
  string,
  { expiresAt: number; ctx: Omit<ServerUserContext, 'isAuthenticated' | 'userId' | 'email'> }
>();

export function invalidateUserEntitlementCache(userId?: string | null): void {
  if (!userId) return;
  userEntitlementCache.delete(userId);
}

const getVerifiedAuthUser = cache(async () => {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
});

async function loadEntitlementsFromDb(userId: string) {
  const cached = userEntitlementCache.get(userId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.ctx;
  }

  const supabase = getSupabaseServerClient();

  // Execute all 3 authorization lookups in parallel (1 round-trip instead of 3)
  const [profileRes, subRes, trackRes] = await Promise.all([
    supabase.from('profiles').select('role').eq('id', userId).maybeSingle(),
    supabase
      .from('user_entitlements')
      .select('tier, status, valid_until')
      .eq('user_id', userId)
      .maybeSingle(),
    supabase
      .from('track_entitlements')
      .select('track_id, source_type, status, valid_until, order_id, subscription_id')
      .eq('user_id', userId)
      .eq('status', 'active'),
  ]);

  const role: string | null = profileRes.data?.role || null;

  let subscriptionTier: string | null = null;
  let subscriptionStatus: 'active' | 'canceled' | 'expired' | 'none' = 'none';
  let validUntil: string | null = null;

  const sub = subRes.data;
  if (sub && sub.status === 'active') {
    const isNotExpired = !sub.valid_until || new Date(sub.valid_until) > new Date();
    if (isNotExpired) {
      subscriptionTier = sub.tier;
      subscriptionStatus = sub.status;
      validUntil = sub.valid_until;
    }
  }

  const trackGrants: Record<string, TrackEntitlementGrant> = {};
  const trackRows = trackRes.data;
  if (trackRows && Array.isArray(trackRows)) {
    for (const row of trackRows) {
      const isNotExpired = !row.valid_until || new Date(row.valid_until) > new Date();
      if (isNotExpired) {
        const canonical = normalizeTrackId(row.track_id);
        const existing = trackGrants[canonical];
        if (existing && existing.sourceType === 'lifetime_purchase') {
          continue;
        }
        trackGrants[canonical] = {
          trackId: canonical,
          sourceType: row.source_type,
          status: row.status,
          validUntil: row.valid_until,
          orderId: row.order_id,
          subscriptionId: row.subscription_id,
        };
      }
    }
  }

  const result = {
    role,
    subscriptionTier,
    subscriptionStatus,
    validUntil,
    trackGrants,
  };

  userEntitlementCache.set(userId, {
    expiresAt: Date.now() + ENTITLEMENT_CACHE_TTL_MS,
    ctx: result,
  });

  return result;
}

/**
 * Resolves the authenticated user, profile, subscription, and track grants on the server.
 */
export const getServerUserContext = cache(async (): Promise<ServerUserContext> => {
  try {
    const user = await getVerifiedAuthUser();

    if (!user) {
      return {
        isAuthenticated: false,
        userId: null,
        email: null,
        role: null,
        subscriptionTier: null,
        subscriptionStatus: 'none',
        validUntil: null,
        trackGrants: {},
      };
    }

    const dbCtx = await loadEntitlementsFromDb(user.id);

    return {
      isAuthenticated: true,
      userId: user.id,
      email: user.email || null,
      ...dbCtx,
    };
  } catch (err) {
    console.error('[getServerUserContext] Error resolving server user:', err);
    return {
      isAuthenticated: false,
      userId: null,
      email: null,
      role: null,
      subscriptionTier: null,
      subscriptionStatus: 'none',
      validUntil: null,
      trackGrants: {},
    };
  }
});

/**
 * Resolves the server-side entitlement tier for the current request.
 */
export async function getServerTier(): Promise<EntitlementTier> {
  const ctx = await getServerUserContext();
  return resolveEntitlementTier(ctx);
}

/**
 * Validates access to a specific module on the server.
 */
export async function checkModuleAccessServer(
  moduleId: string
): Promise<AccessCheckResult> {
  const user = await getVerifiedAuthUser();
  if (!user) {
    return canAccessModule(moduleId, 'anonymous', {});
  }
  if (isOwnerIdentity({ userId: user.id, email: user.email || null })) {
    return canAccessModule(moduleId, 'owner', {});
  }
  if (isFreeAllowedModule(moduleId)) {
    return canAccessModule(moduleId, 'free', {});
  }

  const dbCtx = await loadEntitlementsFromDb(user.id);
  const tier = resolveEntitlementTier({
    isAuthenticated: true,
    userId: user.id,
    email: user.email || null,
    role: dbCtx.role,
    subscriptionTier: dbCtx.subscriptionTier,
  });
  return canAccessModule(moduleId, tier, dbCtx.trackGrants);
}

/**
 * Validates access to a specific lesson on the server.
 * Fast-paths env-configured owners and free Module 0 lessons with 0 DB queries.
 */
export async function checkLessonAccessServer(
  moduleId: string,
  lessonId: string
): Promise<AccessCheckResult> {
  const user = await getVerifiedAuthUser();
  if (!user) {
    return canAccessLesson(moduleId, lessonId, 'anonymous', {});
  }
  if (isOwnerIdentity({ userId: user.id, email: user.email || null })) {
    return canAccessLesson(moduleId, lessonId, 'owner', {});
  }
  if (isFreeAllowedModule(moduleId)) {
    return canAccessLesson(moduleId, lessonId, 'free', {});
  }

  const dbCtx = await loadEntitlementsFromDb(user.id);
  const tier = resolveEntitlementTier({
    isAuthenticated: true,
    userId: user.id,
    email: user.email || null,
    role: dbCtx.role,
    subscriptionTier: dbCtx.subscriptionTier,
  });
  return canAccessLesson(moduleId, lessonId, tier, dbCtx.trackGrants);
}

/**
 * Validates access to a learning track on the server.
 */
export async function checkTrackAccessServer(
  trackId: string
): Promise<AccessCheckResult> {
  const ctx = await getServerUserContext();
  const tier = resolveEntitlementTier(ctx);
  return canAccessTrack(trackId, tier, ctx.trackGrants);
}

/**
 * Validates access to a project workspace on the server.
 */
export async function checkProjectAccessServer(
  projectId: string
): Promise<AccessCheckResult> {
  const ctx = await getServerUserContext();
  const tier = resolveEntitlementTier(ctx);
  return canAccessProject(projectId, tier, ctx.trackGrants);
}

/**
 * Returns complete user entitlements for the current session.
 */
export async function getUserEntitlementsServer(): Promise<UserEntitlements> {
  const ctx = await getServerUserContext();
  return getUserEntitlements(ctx);
}
