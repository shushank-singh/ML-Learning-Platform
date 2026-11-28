export type IITSubjectId = 'physics' | 'chemistry' | 'mathematics';
export type IITChemistryBranch = 'physical' | 'organic' | 'inorganic';
export type IITClassLevel = '11' | '12';
export type IITExamType = 'JEE Main' | 'JEE Advanced';
export type IITTargetExam = 'JEE Main' | 'JEE Advanced' | 'Both';
export type IITStudentProfile = 'Class 11' | 'Class 12' | 'Dropper' | 'Crash Revision';

export type IITExamApplicability =
  | 'main_and_advanced'
  | 'jee_main_only'
  | 'jee_advanced_only';

export type IITSyllabusStatus =
  | 'full_mastery' // Complete theory, derivations, examples, formulas, practice, PYQs, flashcards
  | 'notes_and_pyqs' // Concise notes, formulas, solved examples, practice & PYQs
  | 'syllabus_mapped'; // Official syllabus topics, key formulas & core concepts mapped

export type IITDifficulty = 'Easy' | 'Moderate' | 'Advanced';
export type IITQuestionType = 'scq' | 'mcq_multi' | 'numerical';

export interface IITUnit {
  id: string;
  subject: IITSubjectId;
  classLevel: IITClassLevel;
  branch?: IITChemistryBranch;
  title: string;
  order: number;
  description: string;
}

export interface IITTopicItem {
  id: string;
  title: string;
  examScope: IITExamApplicability;
  lessonIds: string[];
}

export interface IITChapter {
  id: string;
  slug: string;
  subject: IITSubjectId;
  branch?: IITChemistryBranch;
  classLevel: IITClassLevel;
  unitId: string;
  order: number;
  title: string;
  subtitle: string;
  examApplicability: IITExamApplicability;
  syllabusStatus: IITSyllabusStatus;
  weightage: 'High' | 'Medium' | 'Core';
  estimatedHours: number;
  jeeMainNotes: string;
  jeeAdvancedNotes: string;
  excludedFromJeeMain?: string[];
  topics: IITTopicItem[];
}

export interface IITDerivationStep {
  title: string;
  explanation: string;
  latex?: string;
}

export interface IITSolvedExample {
  id: string;
  title: string;
  level: IITExamType;
  problem: string;
  given?: string[];
  steps: string[];
  finalAnswer: string;
  keyTakeaway: string;
}

export interface IITLesson {
  id: string;
  chapterId: string;
  topicId: string;
  order: number;
  title: string;
  estimatedMinutes: number;
  examTags: IITExamType[];
  coreConcept: string;
  detailedTheory: string[];
  derivations: IITDerivationStep[];
  solvedExamples: IITSolvedExample[];
  commonMistakes: string[];
  checkpointQuestion: {
    prompt: string;
    answer: string;
  };
}

export interface IITChapterRevisionNotes {
  chapterId: string;
  sixtySecondSummary: string[];
  twoMinuteHighYield: {
    coreIdea: string;
    keyLawsAndConditions: string[];
    examTraps: string[];
    memoryAid?: string;
  };
}

export interface IITFormula {
  id: string;
  chapterId: string;
  subject: IITSubjectId;
  classLevel: IITClassLevel;
  title: string;
  latex: string;
  variables: string;
  conditions?: string;
  examTags: IITExamType[];
}

export interface IITQuestion {
  id: string;
  chapterId: string;
  subject: IITSubjectId;
  classLevel: IITClassLevel;
  type: IITQuestionType;
  exam: IITExamType;
  isPyq: boolean;
  pyqYear?: string;
  difficulty: IITDifficulty;
  stem: string;
  options?: string[];
  correctIndices?: number[]; // For scq (length 1) and mcq_multi
  numericalAnswer?: number; // For numerical
  numericalTolerance?: number;
  hint?: string;
  solutionSteps: string[];
  finalAnswerLabel: string;
}

export interface IITFlashcard {
  id: string;
  chapterId: string;
  subject: IITSubjectId;
  front: string;
  back: string;
  formulaLatex?: string;
  hint?: string;
}

export interface IITMockTest {
  id: string;
  title: string;
  subtitle: string;
  examPattern: IITExamType;
  scope: 'full_syllabus' | 'subject' | 'chapter';
  subjectFilter?: IITSubjectId;
  chapterId?: string;
  durationMinutes: number;
  questionIds: string[];
  markingScheme: {
    correct: number;
    incorrect: number;
    numericalIncorrect: number;
  };
}

export interface IITQuestionAttempt {
  questionId: string;
  chapterId: string;
  subject: IITSubjectId;
  isCorrect: boolean;
  marksObtained: number;
  selectedIndices?: number[];
  numericalValue?: number;
  timeSpentSec?: number;
  answeredAt: string;
}

export interface IITFlashcardReview {
  cardId: string;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  lastReviewedAt: string;
  nextReviewAt: string;
}

export interface IITMockTestSubjectScore {
  subject: IITSubjectId;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  maxScore: number;
}

export interface IITMockTestResult {
  id: string;
  testId: string;
  title: string;
  examPattern: IITExamType;
  score: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracyPct: number;
  timeTakenSec: number;
  subjectBreakdown: IITMockTestSubjectScore[];
  submittedAt: string;
}

export interface IITStudySession {
  id: string;
  chapterId: string;
  subject: IITSubjectId;
  mode: 'lesson' | 'notes' | 'formulas' | 'practice' | 'mock' | 'revision';
  durationSeconds: number;
  recordedAt: string;
}

export interface IITRevisionTask {
  id: string;
  chapterId: string;
  subject: IITSubjectId;
  title: string;
  dueDate: string; // YYYY-MM-DD
  priority: 'High' | 'Medium' | 'Normal';
  completed: boolean;
  createdAt: string;
}

export interface IITUserProgress {
  targetExam: IITTargetExam;
  studentProfile: IITStudentProfile;
  completedLessons: Record<string, boolean>;
  completedChapters: Record<string, boolean>;
  bookmarkedChapterIds: string[];
  bookmarkedQuestionIds: string[];
  personalNotes: Record<string, string>;
  attempts: IITQuestionAttempt[];
  mockTestResults: IITMockTestResult[];
  flashcardReviews: Record<string, IITFlashcardReview>;
  studySessions: IITStudySession[];
  activityDates: string[]; // YYYY-MM-DD
  revisionTasks: IITRevisionTask[];
  lastVisited?: {
    chapterId: string;
    lessonId?: string;
    visitedAt: string;
  };
  updatedAt: string;
}
