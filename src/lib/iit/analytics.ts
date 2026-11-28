import {
  ALL_IIT_FLASHCARDS,
  IIT_CHAPTERS,
  IIT_CHAPTERS_BY_ID,
} from '@/data/iit';
import { IITChapter, IITSubjectId, IITUserProgress } from '@/types/iit';
import { getTodayDateStr } from './progress';

export interface SubjectProgressSummary {
  subject: IITSubjectId;
  label: string;
  totalChapters: number;
  completedChapters: number;
  completionPct: number;
  attemptedQuestions: number;
  correctQuestions: number;
  accuracyPct: number | null;
}

export interface WeakChapterSummary {
  chapter: IITChapter;
  attempts: number;
  attempted: number;
  correct: number;
  accuracyPct: number;
}

export interface IITDashboardMetrics {
  totalApplicableChapters: number;
  applicableChaptersCount: number;
  completedChaptersCount: number;
  remainingChaptersCount: number;
  overallCompletionPct: number;
  subjectProgress: SubjectProgressSummary[];
  subjectStats: SubjectProgressSummary[];
  currentStreakDays: number;
  streakDays: number;
  longestStreakDays: number;
  questionsAttempted: number;
  questionsCorrect: number;
  correctAttempts: number;
  overallAccuracyPct: number | null;
  accuracyPct: number | null;
  totalStudyMinutes: number;
  weakChapters: WeakChapterSummary[];
  dueFlashcardsCount: number;
  upcomingRevisionTasksCount: number;
  upcomingRevisions: IITUserProgress['revisionTasks'];
  continueChapter: IITChapter | null;
  recentMockTests: IITUserProgress['mockTestResults'];
  recommendedNextChapter: IITChapter | null;
}

export function computeStudyStreak(activityDates: string[], now = new Date()): {
  currentStreak: number;
  longestStreak: number;
} {
  if (!activityDates || activityDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const uniqueSorted = Array.from(new Set(activityDates)).sort();
  const dateSet = new Set(uniqueSorted);

  // Longest streak
  let longest = 1;
  let run = 1;
  for (let i = 1; i < uniqueSorted.length; i++) {
    const prev = new Date(`${uniqueSorted[i - 1]}T00:00:00Z`).getTime();
    const curr = new Date(`${uniqueSorted[i]}T00:00:00Z`).getTime();
    if (Math.round((curr - prev) / 86_400_000) === 1) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 1;
    }
  }

  // Current streak (includes today or yesterday as active anchor)
  const todayStr = getTodayDateStr(now);
  const yesterdayDate = new Date(now.getTime() - 86_400_000);
  const yesterdayStr = getTodayDateStr(yesterdayDate);

  let anchorStr = '';
  if (dateSet.has(todayStr)) anchorStr = todayStr;
  else if (dateSet.has(yesterdayStr)) anchorStr = yesterdayStr;
  else return { currentStreak: 0, longestStreak: longest };

  let current = 0;
  let cursorMs = new Date(`${anchorStr}T00:00:00Z`).getTime();
  while (true) {
    const d = new Date(cursorMs);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(
      d.getUTCDate()
    ).padStart(2, '0')}`;
    if (!dateSet.has(key)) break;
    current += 1;
    cursorMs -= 86_400_000;
  }

  return { currentStreak: current, longestStreak: Math.max(longest, current) };
}

export function getApplicableChaptersForTarget(
  targetExam: IITUserProgress['targetExam']
): IITChapter[] {
  if (targetExam === 'JEE Main') {
    return IIT_CHAPTERS.filter((c) => c.examApplicability !== 'jee_advanced_only');
  }
  if (targetExam === 'JEE Advanced') {
    return IIT_CHAPTERS.filter((c) => c.examApplicability !== 'jee_main_only');
  }
  return IIT_CHAPTERS;
}

export function computeIITDashboardMetrics(
  progress: IITUserProgress,
  now = new Date()
): IITDashboardMetrics {
  const applicableChapters = getApplicableChaptersForTarget(progress.targetExam);
  const completedChaptersCount = applicableChapters.filter(
    (c) => Boolean(progress.completedChapters[c.id])
  ).length;
  const totalApplicableChapters = applicableChapters.length;
  const remainingChaptersCount = Math.max(0, totalApplicableChapters - completedChaptersCount);
  const overallCompletionPct =
    totalApplicableChapters > 0
      ? Math.round((completedChaptersCount / totalApplicableChapters) * 100)
      : 0;

  const attempts = progress.attempts || [];
  const questionsAttempted = attempts.length;
  const questionsCorrect = attempts.filter((a) => a.isCorrect).length;
  const overallAccuracyPct =
    questionsAttempted > 0 ? Math.round((questionsCorrect / questionsAttempted) * 100) : null;

  // Subject-wise breakdown
  const subjectLabels: Record<IITSubjectId, string> = {
    physics: 'Physics',
    chemistry: 'Chemistry',
    mathematics: 'Mathematics',
  };

  const subjectProgress: SubjectProgressSummary[] = (
    ['physics', 'chemistry', 'mathematics'] as IITSubjectId[]
  ).map((subj) => {
    const subjChapters = applicableChapters.filter((c) => c.subject === subj);
    const comp = subjChapters.filter((c) => Boolean(progress.completedChapters[c.id])).length;
    const subjAttempts = attempts.filter((a) => a.subject === subj);
    const subjCorrect = subjAttempts.filter((a) => a.isCorrect).length;
    return {
      subject: subj,
      label: subjectLabels[subj],
      totalChapters: subjChapters.length,
      completedChapters: comp,
      completionPct: subjChapters.length > 0 ? Math.round((comp / subjChapters.length) * 100) : 0,
      attemptedQuestions: subjAttempts.length,
      correctQuestions: subjCorrect,
      accuracyPct:
        subjAttempts.length > 0 ? Math.round((subjCorrect / subjAttempts.length) * 100) : null,
    };
  });

  // Weak chapters (derived strictly from actual attempts: < 65% accuracy)
  const chapterStats: Record<string, { total: number; correct: number }> = {};
  for (const att of attempts) {
    if (!chapterStats[att.chapterId]) chapterStats[att.chapterId] = { total: 0, correct: 0 };
    chapterStats[att.chapterId].total += 1;
    if (att.isCorrect) chapterStats[att.chapterId].correct += 1;
  }

  const weakChapters: WeakChapterSummary[] = Object.entries(chapterStats)
    .map(([chapterId, st]) => {
      const chapter = IIT_CHAPTERS_BY_ID[chapterId];
      if (!chapter) return null;
      const accuracyPct = Math.round((st.correct / st.total) * 100);
      return { chapter, attempts: st.total, attempted: st.total, correct: st.correct, accuracyPct };
    })
    .filter((item): item is WeakChapterSummary => Boolean(item && item.accuracyPct < 65))
    .sort((a, b) => a.accuracyPct - b.accuracyPct || b.attempts - a.attempts)
    .slice(0, 6);

  // Flashcards due now
  const nowMs = now.getTime();
  const dueFlashcardsCount = ALL_IIT_FLASHCARDS.filter((card) => {
    const rev = progress.flashcardReviews[card.id];
    return !rev || new Date(rev.nextReviewAt).getTime() <= nowMs;
  }).length;

  // Upcoming revision tasks (pending)
  const upcomingRevisions = (progress.revisionTasks || []).filter((t) => !t.completed);
  const upcomingRevisionTasksCount = upcomingRevisions.length;

  // Total study minutes
  const totalStudySec = (progress.studySessions || []).reduce(
    (acc, s) => acc + s.durationSeconds,
    0
  );
  const totalStudyMinutes = Math.round(totalStudySec / 60);

  // Streak
  const { currentStreak, longestStreak } = computeStudyStreak(progress.activityDates || [], now);

  // Continue learning shortcut
  const continueChapter =
    progress.lastVisited?.chapterId && IIT_CHAPTERS_BY_ID[progress.lastVisited.chapterId]
      ? IIT_CHAPTERS_BY_ID[progress.lastVisited.chapterId]
      : null;

  // Recent mock tests (latest first)
  const recentMockTests = [...(progress.mockTestResults || [])]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5);

  // Recommended next topic: prioritize weakest chapter if any, otherwise first uncompleted High-weightage chapter matching studentProfile
  let recommendedNextChapter: IITChapter | null = null;
  if (weakChapters.length > 0) {
    recommendedNextChapter = weakChapters[0].chapter;
  } else {
    const preferredClass = progress.studentProfile === 'Class 11' ? '11' : null;
    const uncompleted = applicableChapters.filter((c) => !progress.completedChapters[c.id]);
    recommendedNextChapter =
      uncompleted.find(
        (c) =>
          c.weightage === 'High' &&
          c.syllabusStatus === 'full_mastery' &&
          (!preferredClass || c.classLevel === preferredClass)
      ) ||
      uncompleted.find((c) => c.weightage === 'High') ||
      uncompleted[0] ||
      applicableChapters[0] ||
      null;
  }

  return {
    totalApplicableChapters,
    applicableChaptersCount: totalApplicableChapters,
    completedChaptersCount,
    remainingChaptersCount,
    overallCompletionPct,
    subjectProgress,
    subjectStats: subjectProgress,
    currentStreakDays: currentStreak,
    streakDays: currentStreak,
    longestStreakDays: longestStreak,
    questionsAttempted,
    questionsCorrect,
    correctAttempts: questionsCorrect,
    overallAccuracyPct,
    accuracyPct: overallAccuracyPct,
    totalStudyMinutes,
    weakChapters,
    dueFlashcardsCount,
    upcomingRevisionTasksCount,
    upcomingRevisions,
    continueChapter,
    recentMockTests,
    recommendedNextChapter,
  };
}

export const computeIITDashboardAnalytics = computeIITDashboardMetrics;
