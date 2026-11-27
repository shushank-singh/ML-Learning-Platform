'use client';

import {
  MedVerseAttemptRecord,
  MedVerseFlashcardReview,
  MedVersePinAnnotation,
  MedVerseStudyCollection,
  MedVerseStudySession,
  MedVerseUserProgress,
} from '@/types/medverse';

const STORAGE_KEY = 'medverse_3d_progress_v1';

const defaultProgress = (): MedVerseUserProgress => ({
  completedTopics: {},
  bookmarkedTopicIds: [],
  bookmarkedStructureIds: [],
  attempts: [],
  flashcardReviews: {},
  studySessions: [],
  pinAnnotations: [],
  collections: [],
  updatedAt: new Date().toISOString(),
});

export function normalizeMedVerseProgress(raw: unknown): MedVerseUserProgress {
  const base = defaultProgress();
  if (!raw || typeof raw !== 'object') return base;
  const obj = raw as Record<string, any>;
  return {
    completedTopics:
      obj.completedTopics && typeof obj.completedTopics === 'object' && !Array.isArray(obj.completedTopics)
        ? obj.completedTopics
        : {},
    bookmarkedTopicIds: Array.isArray(obj.bookmarkedTopicIds)
      ? obj.bookmarkedTopicIds.filter((x): x is string => typeof x === 'string')
      : [],
    bookmarkedStructureIds: Array.isArray(obj.bookmarkedStructureIds)
      ? obj.bookmarkedStructureIds.filter((x): x is string => typeof x === 'string')
      : [],
    attempts: Array.isArray(obj.attempts) ? obj.attempts : [],
    flashcardReviews:
      obj.flashcardReviews && typeof obj.flashcardReviews === 'object' && !Array.isArray(obj.flashcardReviews)
        ? obj.flashcardReviews
        : {},
    studySessions: Array.isArray(obj.studySessions) ? obj.studySessions : [],
    pinAnnotations: Array.isArray(obj.pinAnnotations) ? obj.pinAnnotations : [],
    collections: Array.isArray(obj.collections) ? obj.collections : [],
    lastVisitedTopicId: typeof obj.lastVisitedTopicId === 'string' ? obj.lastVisitedTopicId : undefined,
    updatedAt: typeof obj.updatedAt === 'string' ? obj.updatedAt : base.updatedAt,
  };
}

export function getMedVerseProgress(): MedVerseUserProgress {
  if (typeof window === 'undefined') return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return normalizeMedVerseProgress(JSON.parse(raw));
  } catch {
    return defaultProgress();
  }
}

let cloudSyncTimer: ReturnType<typeof setTimeout> | null = null;

export function saveMedVerseProgress(
  next: MedVerseUserProgress,
  options?: { skipCloudSync?: boolean }
): MedVerseUserProgress {
  const normalized = normalizeMedVerseProgress({
    ...next,
    updatedAt: new Date().toISOString(),
  });
  if (typeof window === 'undefined') return normalized;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new Event('medverse_progress_updated'));
    if (!options?.skipCloudSync) {
      if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
      cloudSyncTimer = setTimeout(() => {
        void pushMedVerseProgressToCloud(normalized);
      }, 900);
    }
  } catch (err) {
    console.warn('[MedVerseProgress] Failed saving progress:', err);
  }
  return normalized;
}

export async function pushMedVerseProgressToCloud(
  progress?: MedVerseUserProgress
): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const payload = progress || getMedVerseProgress();
  try {
    const res = await fetch('/api/medverse/progress', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function syncMedVerseProgressFromCloud(): Promise<MedVerseUserProgress> {
  const local = getMedVerseProgress();
  if (typeof window === 'undefined') return local;
  try {
    const res = await fetch('/api/medverse/progress', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!res.ok) return local;
    const data = await res.json();
    if (!data?.success || !data?.progress) return local;
    const cloud = normalizeMedVerseProgress(data.progress);
    const merged: MedVerseUserProgress = {
      completedTopics: { ...cloud.completedTopics, ...local.completedTopics },
      bookmarkedTopicIds: Array.from(
        new Set([...cloud.bookmarkedTopicIds, ...local.bookmarkedTopicIds])
      ),
      bookmarkedStructureIds: Array.from(
        new Set([...cloud.bookmarkedStructureIds, ...local.bookmarkedStructureIds])
      ),
      attempts: mergeAttempts(local.attempts, cloud.attempts),
      flashcardReviews: { ...cloud.flashcardReviews, ...local.flashcardReviews },
      studySessions: mergeSessions(local.studySessions, cloud.studySessions),
      pinAnnotations: mergeById(cloud.pinAnnotations || [], local.pinAnnotations || []),
      collections: mergeById(cloud.collections || [], local.collections || []),
      lastVisitedTopicId: local.lastVisitedTopicId || cloud.lastVisitedTopicId,
      updatedAt: new Date().toISOString(),
    };
    return saveMedVerseProgress(merged, { skipCloudSync: true });
  } catch {
    return local;
  }
}

function mergeAttempts(
  local: MedVerseAttemptRecord[],
  cloud: MedVerseAttemptRecord[]
): MedVerseAttemptRecord[] {
  const seen = new Set<string>();
  const combined: MedVerseAttemptRecord[] = [];
  for (const item of [...cloud, ...local]) {
    const key = `${item.questionId}::${item.answeredAt}`;
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(item);
    }
  }
  return combined.slice(-2000);
}

function mergeSessions(
  local: MedVerseStudySession[],
  cloud: MedVerseStudySession[]
): MedVerseStudySession[] {
  const seen = new Set<string>();
  const combined: MedVerseStudySession[] = [];
  for (const s of [...cloud, ...local]) {
    if (!seen.has(s.id)) {
      seen.add(s.id);
      combined.push(s);
    }
  }
  return combined.slice(-1000);
}

function mergeById<T extends { id: string }>(cloud: T[], local: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of cloud) map.set(item.id, item);
  for (const item of local) map.set(item.id, item);
  return Array.from(map.values()).slice(-500);
}

export function addMedVersePinAnnotation(
  pin: Omit<MedVersePinAnnotation, 'id' | 'createdAt'>
): MedVerseUserProgress {
  const current = getMedVerseProgress();
  const nextPin: MedVersePinAnnotation = {
    ...pin,
    id: `pin-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  return saveMedVerseProgress({
    ...current,
    pinAnnotations: [...(current.pinAnnotations || []), nextPin],
  });
}

export function deleteMedVersePinAnnotation(pinId: string): MedVerseUserProgress {
  const current = getMedVerseProgress();
  return saveMedVerseProgress({
    ...current,
    pinAnnotations: (current.pinAnnotations || []).filter((p) => p.id !== pinId),
  });
}

export function saveMedVerseCollection(
  collection: Omit<MedVerseStudyCollection, 'id' | 'createdAt'>
): MedVerseUserProgress {
  const current = getMedVerseProgress();
  const entry: MedVerseStudyCollection = {
    ...collection,
    id: `col-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  return saveMedVerseProgress({
    ...current,
    collections: [...(current.collections || []), entry],
  });
}

export function deleteMedVerseCollection(collectionId: string): MedVerseUserProgress {
  const current = getMedVerseProgress();
  return saveMedVerseProgress({
    ...current,
    collections: (current.collections || []).filter((c) => c.id !== collectionId),
  });
}

export function toggleMedVerseTopicCompletion(topicId: string): MedVerseUserProgress {
  const current = getMedVerseProgress();
  const nextVal = !current.completedTopics[topicId];
  return saveMedVerseProgress({
    ...current,
    completedTopics: {
      ...current.completedTopics,
      [topicId]: nextVal,
    },
    lastVisitedTopicId: topicId,
  });
}

export function toggleMedVerseTopicBookmark(topicId: string): MedVerseUserProgress {
  const current = getMedVerseProgress();
  const exists = current.bookmarkedTopicIds.includes(topicId);
  return saveMedVerseProgress({
    ...current,
    bookmarkedTopicIds: exists
      ? current.bookmarkedTopicIds.filter((id) => id !== topicId)
      : [...current.bookmarkedTopicIds, topicId],
  });
}

export function toggleMedVerseStructureBookmark(structureId: string): MedVerseUserProgress {
  const current = getMedVerseProgress();
  const exists = current.bookmarkedStructureIds.includes(structureId);
  return saveMedVerseProgress({
    ...current,
    bookmarkedStructureIds: exists
      ? current.bookmarkedStructureIds.filter((id) => id !== structureId)
      : [...current.bookmarkedStructureIds, structureId],
  });
}

export function recordMedVerseAttempt(attempt: Omit<MedVerseAttemptRecord, 'answeredAt'>): MedVerseUserProgress {
  const current = getMedVerseProgress();
  const entry: MedVerseAttemptRecord = {
    ...attempt,
    answeredAt: new Date().toISOString(),
  };
  return saveMedVerseProgress({
    ...current,
    attempts: [...current.attempts, entry],
    lastVisitedTopicId: attempt.topicId,
  });
}

export function recordMedVerseStudySession(
  topicId: string,
  mode: MedVerseStudySession['mode'],
  durationSeconds: number
): MedVerseUserProgress {
  const current = getMedVerseProgress();
  const session: MedVerseStudySession = {
    id: `${topicId}-${mode}-${Date.now()}`,
    topicId,
    mode,
    durationSeconds: Math.max(1, Math.round(durationSeconds)),
    recordedAt: new Date().toISOString(),
  };
  return saveMedVerseProgress({
    ...current,
    studySessions: [...current.studySessions, session],
    lastVisitedTopicId: topicId,
  });
}

/**
 * SM-2 Spaced-Repetition Scheduler (quality 0..5)
 * Used for genuine MBBS flashcard retention scheduling.
 */
export function computeSM2Review(
  existing: MedVerseFlashcardReview | undefined,
  cardId: string,
  quality: 0 | 1 | 2 | 3 | 4 | 5,
  now = new Date()
): MedVerseFlashcardReview {
  let easeFactor = existing?.easeFactor ?? 2.5;
  let repetitions = existing?.repetitions ?? 0;
  let intervalDays = existing?.intervalDays ?? 1;

  if (quality < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
    repetitions += 1;
  }

  easeFactor = Math.max(
    1.3,
    Number((easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))).toFixed(2))
  );

  const nextDate = new Date(now.getTime() + intervalDays * 86_400_000);
  return {
    cardId,
    easeFactor,
    intervalDays,
    repetitions,
    lastReviewedAt: now.toISOString(),
    nextReviewAt: nextDate.toISOString(),
  };
}

export function recordMedVerseFlashcardReview(
  cardId: string,
  quality: 0 | 1 | 2 | 3 | 4 | 5
): MedVerseUserProgress {
  const current = getMedVerseProgress();
  const updatedReview = computeSM2Review(current.flashcardReviews[cardId], cardId, quality);
  return saveMedVerseProgress({
    ...current,
    flashcardReviews: {
      ...current.flashcardReviews,
      [cardId]: updatedReview,
    },
  });
}

export function computeMedVerseAccuracyStats(progress: MedVerseUserProgress) {
  const attempts = progress.attempts || [];
  if (attempts.length === 0) {
    return {
      totalAttempts: 0,
      correctAttempts: 0,
      accuracyPercentage: null as number | null,
      byTopic: {} as Record<string, { total: number; correct: number; accuracy: number }>,
    };
  }
  let correctAttempts = 0;
  const byTopic: Record<string, { total: number; correct: number; accuracy: number }> = {};
  for (const att of attempts) {
    if (att.isCorrect) correctAttempts += 1;
    if (!byTopic[att.topicId]) {
      byTopic[att.topicId] = { total: 0, correct: 0, accuracy: 0 };
    }
    byTopic[att.topicId].total += 1;
    if (att.isCorrect) byTopic[att.topicId].correct += 1;
  }
  for (const tid of Object.keys(byTopic)) {
    const entry = byTopic[tid];
    entry.accuracy = Math.round((entry.correct / entry.total) * 100);
  }
  return {
    totalAttempts: attempts.length,
    correctAttempts,
    accuracyPercentage: Math.round((correctAttempts / attempts.length) * 100),
    byTopic,
  };
}
