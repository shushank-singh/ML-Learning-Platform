'use client';

import {
  IITFlashcardReview,
  IITMockTestResult,
  IITQuestionAttempt,
  IITRevisionTask,
  IITStudentProfile,
  IITStudySession,
  IITSubjectId,
  IITTargetExam,
  IITUserProgress,
} from '@/types/iit';

const STORAGE_KEY = 'azurlearn_iit_jee_progress_v1';

export function getTodayDateStr(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const defaultIITProgress = (): IITUserProgress => ({
  targetExam: 'Both',
  studentProfile: 'Class 12',
  completedLessons: {},
  completedChapters: {},
  bookmarkedChapterIds: [],
  bookmarkedQuestionIds: [],
  personalNotes: {},
  attempts: [],
  mockTestResults: [],
  flashcardReviews: {},
  studySessions: [],
  activityDates: [],
  revisionTasks: [],
  updatedAt: new Date().toISOString(),
});

export function normalizeIITProgress(raw: unknown): IITUserProgress {
  const base = defaultIITProgress();
  if (!raw || typeof raw !== 'object') return base;
  const obj = raw as Record<string, any>;

  return {
    targetExam:
      obj.targetExam === 'JEE Main' || obj.targetExam === 'JEE Advanced' || obj.targetExam === 'Both'
        ? obj.targetExam
        : 'Both',
    studentProfile:
      obj.studentProfile === 'Class 11' ||
      obj.studentProfile === 'Class 12' ||
      obj.studentProfile === 'Dropper' ||
      obj.studentProfile === 'Crash Revision'
        ? obj.studentProfile
        : 'Class 12',
    completedLessons:
      obj.completedLessons && typeof obj.completedLessons === 'object' && !Array.isArray(obj.completedLessons)
        ? obj.completedLessons
        : {},
    completedChapters:
      obj.completedChapters && typeof obj.completedChapters === 'object' && !Array.isArray(obj.completedChapters)
        ? obj.completedChapters
        : {},
    bookmarkedChapterIds: Array.isArray(obj.bookmarkedChapterIds)
      ? Array.from(new Set(obj.bookmarkedChapterIds.filter((x): x is string => typeof x === 'string')))
      : [],
    bookmarkedQuestionIds: Array.isArray(obj.bookmarkedQuestionIds)
      ? Array.from(new Set(obj.bookmarkedQuestionIds.filter((x): x is string => typeof x === 'string')))
      : [],
    personalNotes:
      obj.personalNotes && typeof obj.personalNotes === 'object' && !Array.isArray(obj.personalNotes)
        ? obj.personalNotes
        : {},
    attempts: Array.isArray(obj.attempts) ? obj.attempts : [],
    mockTestResults: Array.isArray(obj.mockTestResults) ? obj.mockTestResults : [],
    flashcardReviews:
      obj.flashcardReviews && typeof obj.flashcardReviews === 'object' && !Array.isArray(obj.flashcardReviews)
        ? obj.flashcardReviews
        : {},
    studySessions: Array.isArray(obj.studySessions) ? obj.studySessions : [],
    activityDates: Array.isArray(obj.activityDates)
      ? Array.from(
          new Set(
            obj.activityDates.filter(
              (d): d is string => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)
            )
          )
        ).sort()
      : [],
    revisionTasks: Array.isArray(obj.revisionTasks) ? obj.revisionTasks : [],
    lastVisited:
      obj.lastVisited && typeof obj.lastVisited === 'object' && typeof obj.lastVisited.chapterId === 'string'
        ? obj.lastVisited
        : undefined,
    updatedAt: typeof obj.updatedAt === 'string' ? obj.updatedAt : base.updatedAt,
  };
}

export function getIITProgress(): IITUserProgress {
  if (typeof window === 'undefined') return defaultIITProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultIITProgress();
    return normalizeIITProgress(JSON.parse(raw));
  } catch {
    return defaultIITProgress();
  }
}

let cloudSyncTimer: ReturnType<typeof setTimeout> | null = null;

function withTodayActivity(dates: string[]): string[] {
  const today = getTodayDateStr();
  if (dates.includes(today)) return dates;
  return [...dates, today].sort();
}

export function saveIITProgress(
  next: IITUserProgress,
  options?: { skipCloudSync?: boolean; recordActivity?: boolean }
): IITUserProgress {
  const activityDates = options?.recordActivity
    ? withTodayActivity(next.activityDates || [])
    : next.activityDates || [];

  const normalized = normalizeIITProgress({
    ...next,
    activityDates,
    updatedAt: new Date().toISOString(),
  });

  if (typeof window === 'undefined') return normalized;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new Event('iit_progress_updated'));
    if (!options?.skipCloudSync) {
      if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
      cloudSyncTimer = setTimeout(() => {
        void pushIITProgressToCloud(normalized);
      }, 900);
    }
  } catch (err) {
    console.warn('[IITProgress] Failed saving progress:', err);
  }
  return normalized;
}

export async function pushIITProgressToCloud(progress?: IITUserProgress): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const payload = progress || getIITProgress();
  try {
    const res = await fetch('/api/iit/progress', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function syncIITProgressFromCloud(): Promise<IITUserProgress> {
  const local = getIITProgress();
  if (typeof window === 'undefined') return local;
  try {
    const res = await fetch('/api/iit/progress', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!res.ok) return local;
    const data = await res.json();
    if (!data?.success || !data?.progress) return local;
    const cloud = normalizeIITProgress(data.progress);

    const merged = normalizeIITProgress({
      targetExam: local.targetExam || cloud.targetExam,
      studentProfile: local.studentProfile || cloud.studentProfile,
      completedLessons: { ...cloud.completedLessons, ...local.completedLessons },
      completedChapters: { ...cloud.completedChapters, ...local.completedChapters },
      bookmarkedChapterIds: Array.from(
        new Set([...cloud.bookmarkedChapterIds, ...local.bookmarkedChapterIds])
      ),
      bookmarkedQuestionIds: Array.from(
        new Set([...cloud.bookmarkedQuestionIds, ...local.bookmarkedQuestionIds])
      ),
      personalNotes: { ...cloud.personalNotes, ...local.personalNotes },
      attempts: mergeAttempts(cloud.attempts, local.attempts),
      mockTestResults: mergeById(cloud.mockTestResults, local.mockTestResults),
      flashcardReviews: { ...cloud.flashcardReviews, ...local.flashcardReviews },
      studySessions: mergeById(cloud.studySessions, local.studySessions),
      activityDates: Array.from(new Set([...cloud.activityDates, ...local.activityDates])).sort(),
      revisionTasks: mergeById(cloud.revisionTasks, local.revisionTasks),
      lastVisited: local.lastVisited || cloud.lastVisited,
    });

    return saveIITProgress(merged, { skipCloudSync: true });
  } catch {
    return local;
  }
}

function mergeAttempts(cloud: IITQuestionAttempt[], local: IITQuestionAttempt[]): IITQuestionAttempt[] {
  const seen = new Set<string>();
  const out: IITQuestionAttempt[] = [];
  for (const item of [...cloud, ...local]) {
    const key = `${item.questionId}::${item.answeredAt}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out.slice(-2500);
}

function mergeById<T extends { id: string }>(cloud: T[], local: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of cloud) map.set(item.id, item);
  for (const item of local) map.set(item.id, item);
  return Array.from(map.values()).slice(-1000);
}

export function setIITPreferences(prefs: {
  targetExam?: IITTargetExam;
  studentProfile?: IITStudentProfile;
}): IITUserProgress {
  const current = getIITProgress();
  return saveIITProgress({
    ...current,
    ...(prefs.targetExam ? { targetExam: prefs.targetExam } : {}),
    ...(prefs.studentProfile ? { studentProfile: prefs.studentProfile } : {}),
  });
}

export function toggleIITLessonCompletion(lessonId: string, chapterId?: string): IITUserProgress {
  const current = getIITProgress();
  const nextVal = !current.completedLessons[lessonId];
  return saveIITProgress(
    {
      ...current,
      completedLessons: { ...current.completedLessons, [lessonId]: nextVal },
      ...(chapterId
        ? { lastVisited: { chapterId, lessonId, visitedAt: new Date().toISOString() } }
        : {}),
    },
    { recordActivity: true }
  );
}

export function toggleIITChapterCompletion(chapterId: string): IITUserProgress {
  const current = getIITProgress();
  const nextVal = !current.completedChapters[chapterId];
  return saveIITProgress(
    {
      ...current,
      completedChapters: { ...current.completedChapters, [chapterId]: nextVal },
      lastVisited: { chapterId, visitedAt: new Date().toISOString() },
    },
    { recordActivity: true }
  );
}

export function toggleIITChapterBookmark(chapterId: string): IITUserProgress {
  const current = getIITProgress();
  const exists = current.bookmarkedChapterIds.includes(chapterId);
  return saveIITProgress({
    ...current,
    bookmarkedChapterIds: exists
      ? current.bookmarkedChapterIds.filter((id) => id !== chapterId)
      : [...current.bookmarkedChapterIds, chapterId],
  });
}

export function toggleIITQuestionBookmark(questionId: string): IITUserProgress {
  const current = getIITProgress();
  const exists = current.bookmarkedQuestionIds.includes(questionId);
  return saveIITProgress({
    ...current,
    bookmarkedQuestionIds: exists
      ? current.bookmarkedQuestionIds.filter((id) => id !== questionId)
      : [...current.bookmarkedQuestionIds, questionId],
  });
}

export function saveIITChapterNote(chapterId: string, note: string): IITUserProgress {
  const current = getIITProgress();
  return saveIITProgress(
    {
      ...current,
      personalNotes: { ...current.personalNotes, [chapterId]: note },
    },
    { recordActivity: true }
  );
}

export function recordIITLastVisited(chapterId: string, lessonId?: string): IITUserProgress {
  const current = getIITProgress();
  return saveIITProgress({
    ...current,
    lastVisited: { chapterId, lessonId, visitedAt: new Date().toISOString() },
  });
}

export const setIITLastVisited = recordIITLastVisited;

export function recordIITQuestionAttempt(
  attempt: Omit<IITQuestionAttempt, 'answeredAt'>
): IITUserProgress {
  const current = getIITProgress();
  const entry: IITQuestionAttempt = {
    ...attempt,
    answeredAt: new Date().toISOString(),
  };
  return saveIITProgress(
    {
      ...current,
      attempts: [...current.attempts, entry].slice(-2500),
      lastVisited: { chapterId: attempt.chapterId, visitedAt: new Date().toISOString() },
    },
    { recordActivity: true }
  );
}

export function recordIITMockTestResult(result: IITMockTestResult): IITUserProgress {
  const current = getIITProgress();
  return saveIITProgress(
    {
      ...current,
      mockTestResults: [...current.mockTestResults, result].slice(-200),
    },
    { recordActivity: true }
  );
}

export function recordIITStudySession(
  chapterId: string,
  subject: IITSubjectId,
  mode: IITStudySession['mode'],
  durationSeconds: number
): IITUserProgress {
  const current = getIITProgress();
  const session: IITStudySession = {
    id: `${chapterId}-${mode}-${Date.now()}`,
    chapterId,
    subject,
    mode,
    durationSeconds: Math.max(1, Math.round(durationSeconds)),
    recordedAt: new Date().toISOString(),
  };
  return saveIITProgress(
    {
      ...current,
      studySessions: [...current.studySessions, session].slice(-1000),
    },
    { recordActivity: true }
  );
}

export function computeIITSM2Review(
  existing: IITFlashcardReview | undefined,
  cardId: string,
  quality: 0 | 1 | 2 | 3 | 4 | 5,
  now = new Date()
): IITFlashcardReview {
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

export function recordIITFlashcardReview(
  cardId: string,
  quality: 0 | 1 | 2 | 3 | 4 | 5
): IITUserProgress {
  const current = getIITProgress();
  const updated = computeIITSM2Review(current.flashcardReviews[cardId], cardId, quality);
  return saveIITProgress(
    {
      ...current,
      flashcardReviews: { ...current.flashcardReviews, [cardId]: updated },
    },
    { recordActivity: true }
  );
}

export function addIITRevisionTask(
  task: Omit<IITRevisionTask, 'id' | 'completed' | 'createdAt'>
): IITUserProgress {
  const current = getIITProgress();
  const nextTask: IITRevisionTask = {
    ...task,
    id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  return saveIITProgress({
    ...current,
    revisionTasks: [nextTask, ...current.revisionTasks],
  });
}

export function toggleIITRevisionTask(taskId: string): IITUserProgress {
  const current = getIITProgress();
  return saveIITProgress(
    {
      ...current,
      revisionTasks: current.revisionTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    },
    { recordActivity: true }
  );
}

export function deleteIITRevisionTask(taskId: string): IITUserProgress {
  const current = getIITProgress();
  return saveIITProgress({
    ...current,
    revisionTasks: current.revisionTasks.filter((t) => t.id !== taskId),
  });
}
