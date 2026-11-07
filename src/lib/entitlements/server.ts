/**
 * Server-Side Entitlement & Access Verification Services
 *
 * Runs exclusively in Node.js / Server Component / Route Handler environments.
 * Uses trusted Supabase server client and server-only environment variables.
 */

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
  resolveEntitlementTier,
} from './policy';
import { normalizeTrackId } from './config';

/**
 * Resolves the authenticated user, profile, subscription, and track grants on the server.
 */
export async function getServerUserContext(): Promise<{
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  role: string | null;
  subscriptionTier: string | null;
  subscriptionStatus: 'active' | 'canceled' | 'expired' | 'none';
  validUntil: string | null;
  trackGrants: Record<string, TrackEntitlementGrant>;
}> {
  try {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
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

    // Look up profile role
    let role: string | null = null;
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profile && profile.role) {
      role = profile.role;
    }

    // Look up tier-level subscription row if table exists
    let subscriptionTier: string | null = null;
    let subscriptionStatus: 'active' | 'canceled' | 'expired' | 'none' = 'none';
    let validUntil: string | null = null;

    try {
      const { data: sub } = await supabase
        .from('user_entitlements')
        .select('tier, status, valid_until')
        .eq('user_id', user.id)
        .maybeSingle();

      if (sub && sub.status === 'active') {
        const isNotExpired = !sub.valid_until || new Date(sub.valid_until) > new Date();
        if (isNotExpired) {
          subscriptionTier = sub.tier;
          subscriptionStatus = sub.status;
          validUntil = sub.valid_until;
        }
      }
    } catch {
      // Table may not yet be provisioned; safe to ignore
    }

    // Look up track-level entitlement grants
    const trackGrants: Record<string, TrackEntitlementGrant> = {};

    try {
      const { data: trackRows } = await supabase
        .from('track_entitlements')
        .select('track_id, source_type, status, valid_until, order_id, subscription_id')
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (trackRows && Array.isArray(trackRows)) {
        for (const row of trackRows) {
          const isNotExpired = !row.valid_until || new Date(row.valid_until) > new Date();
          if (isNotExpired) {
            const canonical = normalizeTrackId(row.track_id);
            // Lifetime grants take precedence over monthly
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
    } catch {
      // Table may not yet be provisioned; safe to ignore
    }

    return {
      isAuthenticated: true,
      userId: user.id,
      email: user.email || null,
      role,
      subscriptionTier,
      subscriptionStatus,
      validUntil,
      trackGrants,
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
}

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
  const ctx = await getServerUserContext();
  const tier = resolveEntitlementTier(ctx);
  return canAccessModule(moduleId, tier, ctx.trackGrants);
}

/**
 * Validates access to a specific lesson on the server.
 */
export async function checkLessonAccessServer(
  moduleId: string,
  lessonId: string
): Promise<AccessCheckResult> {
  const ctx = await getServerUserContext();
  const tier = resolveEntitlementTier(ctx);
  return canAccessLesson(moduleId, lessonId, tier, ctx.trackGrants);
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
