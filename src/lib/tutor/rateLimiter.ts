import { TUTOR_LIMITS } from './constants';

interface UserUsage {
  minuteTimestamps: number[];
  dailyTimestamps: number[];
}

// In-memory rate limiting map keyed by User ID
const usageStore = new Map<string, UserUsage>();

// Prune memory every 10 minutes to prevent memory leaks
let lastPruneTime = Date.now();
const PRUNE_INTERVAL_MS = 10 * 60 * 1000;

function pruneStaleEntries(now: number) {
  if (now - lastPruneTime < PRUNE_INTERVAL_MS) return;
  lastPruneTime = now;

  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const toDelete: string[] = [];

  usageStore.forEach((usage, userId) => {
    usage.dailyTimestamps = usage.dailyTimestamps.filter((t: number) => t > oneDayAgo);
    if (usage.dailyTimestamps.length === 0) {
      toDelete.push(userId);
    }
  });

  for (let i = 0; i < toDelete.length; i++) {
    usageStore.delete(toDelete[i]);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: 'rpm_exceeded' | 'rpd_exceeded';
  retryAfterSeconds?: number;
  remainingMinute: number;
  remainingDaily: number;
}

/**
 * Checks and records rate limits for an authenticated user.
 */
export function checkUserRateLimit(userId: string): RateLimitResult {
  const now = Date.now();
  pruneStaleEntries(now);

  let usage = usageStore.get(userId);
  if (!usage) {
    usage = { minuteTimestamps: [], dailyTimestamps: [] };
    usageStore.set(userId, usage);
  }

  const oneMinuteAgo = now - 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  // Filter timestamps
  usage.minuteTimestamps = usage.minuteTimestamps.filter((t: number) => t > oneMinuteAgo);
  usage.dailyTimestamps = usage.dailyTimestamps.filter((t: number) => t > oneDayAgo);

  // Check RPM limit
  if (usage.minuteTimestamps.length >= TUTOR_LIMITS.USER_RPM_LIMIT) {
    const oldestInMinute = usage.minuteTimestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldestInMinute + 60 * 1000 - now) / 1000));
    return {
      allowed: false,
      reason: 'rpm_exceeded',
      retryAfterSeconds,
      remainingMinute: 0,
      remainingDaily: Math.max(0, TUTOR_LIMITS.USER_RPD_LIMIT - usage.dailyTimestamps.length),
    };
  }

  // Check RPD limit
  if (usage.dailyTimestamps.length >= TUTOR_LIMITS.USER_RPD_LIMIT) {
    const oldestInDay = usage.dailyTimestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldestInDay + 24 * 60 * 60 * 1000 - now) / 1000));
    return {
      allowed: false,
      reason: 'rpd_exceeded',
      retryAfterSeconds,
      remainingMinute: 0,
      remainingDaily: 0,
    };
  }

  // Record this request
  usage.minuteTimestamps.push(now);
  usage.dailyTimestamps.push(now);

  return {
    allowed: true,
    remainingMinute: TUTOR_LIMITS.USER_RPM_LIMIT - usage.minuteTimestamps.length,
    remainingDaily: TUTOR_LIMITS.USER_RPD_LIMIT - usage.dailyTimestamps.length,
  };
}

/**
 * Resets rate limit for a user (useful for automated testing).
 */
export function resetUserRateLimit(userId: string): void {
  usageStore.delete(userId);
}

/**
 * Clears the entire rate limit store (useful for automated testing).
 */
export function clearAllRateLimits(): void {
  usageStore.clear();
}
