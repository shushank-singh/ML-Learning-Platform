import { z } from 'zod';

export const IITQuestionAttemptSchema = z.object({
  questionId: z.string().min(1).max(120),
  chapterId: z.string().min(1).max(120),
  subject: z.enum(['physics', 'chemistry', 'mathematics']),
  isCorrect: z.boolean(),
  marksObtained: z.number().min(-10).max(20),
  selectedIndices: z.array(z.number().int().min(0).max(10)).max(10).optional(),
  numericalValue: z.number().optional(),
  timeSpentSec: z.number().min(0).max(86400).optional(),
  answeredAt: z.string().min(1).max(60),
});

export const IITFlashcardReviewSchema = z.object({
  cardId: z.string().min(1).max(120),
  easeFactor: z.number().min(1.1).max(5.0),
  intervalDays: z.number().int().min(1).max(3650),
  repetitions: z.number().int().min(0).max(1000),
  lastReviewedAt: z.string().min(1).max(60),
  nextReviewAt: z.string().min(1).max(60),
});

export const IITMockTestSubjectScoreSchema = z.object({
  subject: z.enum(['physics', 'chemistry', 'mathematics']),
  attempted: z.number().int().min(0),
  correct: z.number().int().min(0),
  incorrect: z.number().int().min(0),
  score: z.number(),
  maxScore: z.number().min(0),
});

export const IITMockTestResultSchema = z.object({
  id: z.string().min(1).max(120),
  testId: z.string().min(1).max(120),
  title: z.string().min(1).max(240),
  examPattern: z.enum(['JEE Main', 'JEE Advanced']),
  score: z.number(),
  maxScore: z.number().min(0),
  correctCount: z.number().int().min(0),
  incorrectCount: z.number().int().min(0),
  unattemptedCount: z.number().int().min(0),
  accuracyPct: z.number().min(0).max(100),
  timeTakenSec: z.number().int().min(0).max(86400),
  subjectBreakdown: z.array(IITMockTestSubjectScoreSchema).max(3),
  submittedAt: z.string().min(1).max(60),
});

export const IITStudySessionSchema = z.object({
  id: z.string().min(1).max(160),
  chapterId: z.string().min(1).max(120),
  subject: z.enum(['physics', 'chemistry', 'mathematics']),
  mode: z.enum(['lesson', 'notes', 'formulas', 'practice', 'mock', 'revision']),
  durationSeconds: z.number().int().min(1).max(86400),
  recordedAt: z.string().min(1).max(60),
});

export const IITRevisionTaskFormSchema = z.object({
  chapterId: z.string().min(1, 'Please select a chapter'),
  title: z.string().trim().min(3, 'Enter a task title (min 3 chars)').max(120, 'Max 120 characters'),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date (YYYY-MM-DD)'),
  priority: z.enum(['High', 'Medium', 'Normal']),
});

export type IITRevisionTaskFormValues = z.infer<typeof IITRevisionTaskFormSchema>;

export const IITRevisionTaskSchema = IITRevisionTaskFormSchema.extend({
  id: z.string().min(1).max(120),
  subject: z.enum(['physics', 'chemistry', 'mathematics']),
  completed: z.boolean(),
  createdAt: z.string().min(1).max(60),
});

export const IITUserProgressUpdateSchema = z.object({
  targetExam: z.enum(['JEE Main', 'JEE Advanced', 'Both']).optional(),
  studentProfile: z.enum(['Class 11', 'Class 12', 'Dropper', 'Crash Revision']).optional(),
  completedLessons: z.record(z.string(), z.boolean()).optional(),
  completedChapters: z.record(z.string(), z.boolean()).optional(),
  bookmarkedChapterIds: z.array(z.string().max(120)).max(500).optional(),
  bookmarkedQuestionIds: z.array(z.string().max(120)).max(2000).optional(),
  personalNotes: z.record(z.string(), z.string().max(15000)).optional(),
  attempts: z.array(IITQuestionAttemptSchema).max(3000).optional(),
  mockTestResults: z.array(IITMockTestResultSchema).max(500).optional(),
  flashcardReviews: z.record(z.string(), IITFlashcardReviewSchema).optional(),
  studySessions: z.array(IITStudySessionSchema).max(1500).optional(),
  activityDates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).max(1500).optional(),
  revisionTasks: z.array(IITRevisionTaskSchema).max(500).optional(),
  lastVisited: z
    .object({
      chapterId: z.string().min(1).max(120),
      lessonId: z.string().max(120).optional(),
      visitedAt: z.string().min(1).max(60),
    })
    .optional(),
  updatedAt: z.string().optional(),
});
