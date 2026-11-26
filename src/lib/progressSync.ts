'use client';

import { UserProgressState } from './types';
import { RevisionStorageState } from './revisionStorage';

const STORAGE_KEY = 'ml_mastery_lab_progress_v1';
const REVISION_STORAGE_KEY = 'ml_mastery_revision_progress_v1';

let syncTimer: ReturnType<typeof setTimeout> | null = null;
let lastSyncTimestamp: string | null = null;
let isCloudAuthenticated = false;

export function setCloudSyncAuthenticated(authenticated: boolean): void {
  isCloudAuthenticated = authenticated;
}

export function getLastCloudSyncTimestamp(): string | null {
  return lastSyncTimestamp;
}

function readLocalJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function mergeProgressStates(
  local: UserProgressState,
  cloud: Partial<UserProgressState>
): UserProgressState {
  const completedLessons: Record<string, boolean> = { ...(cloud.completedLessons || {}) };
  for (const [k, v] of Object.entries(local.completedLessons || {})) {
    if (v) completedLessons[k] = true;
  }

  const bookmarks = Array.from(
    new Set([...(cloud.bookmarks || []), ...(local.bookmarks || [])])
  );

  const notes: Record<string, string> = {
    ...(cloud.notes || {}),
    ...(local.notes || {}),
  };

  const quizScores = { ...(cloud.quizScores || {}) };
  for (const [k, localEntry] of Object.entries(local.quizScores || {})) {
    const cloudEntry = quizScores[k];
    if (
      !cloudEntry ||
      new Date(localEntry.timestamp).getTime() >= new Date(cloudEntry.timestamp).getTime()
    ) {
      quizScores[k] = localEntry;
    }
  }

  const weakTopics = Object.entries(quizScores)
    .filter(([, entry]) => entry.total > 0 && (entry.score / entry.total) * 100 < 70)
    .map(([id]) => id);

  const localLast = local.streak?.lastActiveDate || '';
  const cloudLast = cloud.streak?.lastActiveDate || '';
  const useLocalStreak = localLast >= cloudLast;

  return {
    completedLessons,
    bookmarks,
    notes,
    quizScores,
    streak: {
      currentStreak: useLocalStreak
        ? local.streak?.currentStreak || 1
        : cloud.streak?.currentStreak || 1,
      longestStreak: Math.max(
        local.streak?.longestStreak || 1,
        cloud.streak?.longestStreak || 1
      ),
      lastActiveDate: useLocalStreak ? localLast : cloudLast,
    },
    totalMinutesLearned: Math.max(
      local.totalMinutesLearned || 0,
      cloud.totalMinutesLearned || 0
    ),
    weakTopics,
  };
}

export function mergeRevisionStates(
  local: RevisionStorageState,
  cloud: Partial<RevisionStorageState>
): RevisionStorageState {
  const revisionStatus = {
    ...(cloud.revisionStatus || {}),
    ...(local.revisionStatus || {}),
  };
  const bookmarks = Array.from(
    new Set([...(cloud.bookmarks || []), ...(local.bookmarks || [])])
  );
  const lastReviewed = {
    ...(cloud.lastReviewed || {}),
    ...(local.lastReviewed || {}),
  };
  const recentTopicIds = Array.from(
    new Set([...(local.recentTopicIds || []), ...(cloud.recentTopicIds || [])])
  ).slice(0, 15);
  const quizScores = {
    ...(cloud.quizScores || {}),
    ...(local.quizScores || {}),
  };

  return {
    revisionStatus,
    bookmarks,
    lastReviewed,
    recentTopicIds,
    quizScores,
    examModeEnabled: local.examModeEnabled ?? cloud.examModeEnabled ?? false,
    quickReviewModeEnabled:
      local.quickReviewModeEnabled ?? cloud.quickReviewModeEnabled ?? false,
  };
}

/**
 * Schedules a debounced background PUT to /api/progress when authenticated.
 */
export function scheduleCloudProgressSync(): void {
  if (typeof window === 'undefined' || !isCloudAuthenticated) return;
  if (syncTimer) clearTimeout(syncTimer);

  syncTimer = setTimeout(() => {
    pushProgressToCloud().catch(() => {});
  }, 1200);
}

export async function pushProgressToCloud(): Promise<{
  synced: boolean;
  updatedAt?: string;
}> {
  if (typeof window === 'undefined') return { synced: false };

  const progress = readLocalJson<UserProgressState>(STORAGE_KEY);
  const revisionState = readLocalJson<RevisionStorageState>(REVISION_STORAGE_KEY);
  if (!progress && !revisionState) return { synced: false };

  try {
    const res = await fetch('/api/progress', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress, revisionState }),
    });
    if (!res.ok) return { synced: false };
    const data = await res.json();
    if (data.success && data.updatedAt) {
      lastSyncTimestamp = data.updatedAt;
      window.dispatchEvent(new Event('ml_cloud_synced'));
      return { synced: true, updatedAt: data.updatedAt };
    }
    return { synced: false };
  } catch {
    return { synced: false };
  }
}

export async function syncProgressFromCloud(): Promise<{
  synced: boolean;
  updatedAt?: string | null;
}> {
  if (typeof window === 'undefined') return { synced: false };

  try {
    const res = await fetch('/api/progress', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!res.ok) return { synced: false };

    const data = await res.json();
    if (!data.success || data.tableMissing) return { synced: false };

    const localProgress = readLocalJson<UserProgressState>(STORAGE_KEY);
    if (data.progress && localProgress) {
      const merged = mergeProgressStates(localProgress, data.progress);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new Event('ml_progress_updated'));
    } else if (data.progress && !localProgress) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.progress));
      window.dispatchEvent(new Event('ml_progress_updated'));
    }

    const localRevision = readLocalJson<RevisionStorageState>(REVISION_STORAGE_KEY);
    if (data.revisionState && localRevision) {
      const mergedRev = mergeRevisionStates(localRevision, data.revisionState);
      localStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(mergedRev));
      window.dispatchEvent(new Event('ml_revision_updated'));
    } else if (data.revisionState && !localRevision) {
      localStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(data.revisionState));
      window.dispatchEvent(new Event('ml_revision_updated'));
    }

    lastSyncTimestamp = data.updatedAt || new Date().toISOString();
    window.dispatchEvent(new Event('ml_cloud_synced'));

    // Push merged state back so cloud has any local-only progress
    await pushProgressToCloud();
    return { synced: true, updatedAt: lastSyncTimestamp };
  } catch {
    return { synced: false };
  }
}
