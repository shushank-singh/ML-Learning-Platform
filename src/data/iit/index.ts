import {
  IITChapter,
  IITChapterRevisionNotes,
  IITFlashcard,
  IITFormula,
  IITLesson,
  IITQuestion,
  IITSubjectId,
} from '@/types/iit';
import { IIT_COURSE_META, IIT_UNITS, IIT_CHAPTERS } from './curriculum';
import {
  ALL_PHYSICS_LESSONS,
  PHYSICS_FLASHCARDS,
  PHYSICS_FORMULAS,
  PHYSICS_QUESTIONS,
  PHYSICS_REVISION_NOTES,
} from './physicsContent';
import {
  ALL_CHEMISTRY_LESSONS,
  CHEMISTRY_FLASHCARDS,
  CHEMISTRY_FORMULAS,
  CHEMISTRY_QUESTIONS,
  CHEMISTRY_REVISION_NOTES,
} from './chemistryContent';
import {
  ALL_MATHS_LESSONS,
  MATHS_FLASHCARDS,
  MATHS_FORMULAS,
  MATHS_QUESTIONS,
  MATHS_REVISION_NOTES,
} from './mathsContent';
import { IIT_MOCK_TESTS } from './mockTests';

export { IIT_COURSE_META, IIT_UNITS, IIT_CHAPTERS, IIT_MOCK_TESTS };

export const ALL_IIT_LESSONS: IITLesson[] = [
  ...ALL_PHYSICS_LESSONS,
  ...ALL_CHEMISTRY_LESSONS,
  ...ALL_MATHS_LESSONS,
];

export const ALL_IIT_FORMULAS: IITFormula[] = [
  ...PHYSICS_FORMULAS,
  ...CHEMISTRY_FORMULAS,
  ...MATHS_FORMULAS,
];

export const ALL_IIT_QUESTIONS: IITQuestion[] = [
  ...PHYSICS_QUESTIONS,
  ...CHEMISTRY_QUESTIONS,
  ...MATHS_QUESTIONS,
];

export const ALL_IIT_FLASHCARDS: IITFlashcard[] = [
  ...PHYSICS_FLASHCARDS,
  ...CHEMISTRY_FLASHCARDS,
  ...MATHS_FLASHCARDS,
];

export const ALL_IIT_REVISION_NOTES: IITChapterRevisionNotes[] = [
  ...PHYSICS_REVISION_NOTES,
  ...CHEMISTRY_REVISION_NOTES,
  ...MATHS_REVISION_NOTES,
];

export const IIT_CHAPTERS_BY_ID: Record<string, IITChapter> = Object.fromEntries(
  IIT_CHAPTERS.map((c) => [c.id, c])
);

export const IIT_FORMULAS = ALL_IIT_FORMULAS;
export const IIT_QUESTIONS = ALL_IIT_QUESTIONS;
export const IIT_FLASHCARDS = ALL_IIT_FLASHCARDS;

export const IIT_QUESTIONS_BY_ID: Record<string, IITQuestion> = Object.fromEntries(
  ALL_IIT_QUESTIONS.map((q) => [q.id, q])
);

export function getUnitById(unitId: string) {
  return IIT_UNITS.find((u) => u.id === unitId);
}

export function isChapterApplicableForTarget(
  chapter: IITChapter,
  targetExam: 'JEE Main' | 'JEE Advanced' | 'Both'
): boolean {
  if (targetExam === 'JEE Main') return chapter.examApplicability !== 'jee_advanced_only';
  if (targetExam === 'JEE Advanced') return chapter.examApplicability !== 'jee_main_only';
  return true;
}

export function getChapterById(chapterId: string): IITChapter | undefined {
  return IIT_CHAPTERS_BY_ID[chapterId];
}

export function getChaptersBySubject(subject: IITSubjectId): IITChapter[] {
  return IIT_CHAPTERS.filter((c) => c.subject === subject).sort((a, b) => a.order - b.order);
}

export function getFormulasForChapter(chapterId: string): IITFormula[] {
  return ALL_IIT_FORMULAS.filter((f) => f.chapterId === chapterId);
}

export function getQuestionsForChapter(chapterId: string): IITQuestion[] {
  return ALL_IIT_QUESTIONS.filter((q) => q.chapterId === chapterId);
}

export function getFlashcardsForChapter(chapterId: string): IITFlashcard[] {
  return ALL_IIT_FLASHCARDS.filter((f) => f.chapterId === chapterId);
}

export function getLessonsForChapter(chapterId: string): IITLesson[] {
  const direct = ALL_IIT_LESSONS.filter((l) => l.chapterId === chapterId).sort(
    (a, b) => a.order - b.order
  );
  if (direct.length > 0) return direct;

  const chapter = getChapterById(chapterId);
  if (!chapter) return [];

  // Fallback syllabus-grounded conceptual guide if a chapter is mapped
  return chapter.topics.map((topic, idx) => ({
    id: topic.lessonIds[0] || `${chapterId}-guide-${idx + 1}`,
    chapterId: chapter.id,
    topicId: topic.id,
    order: idx + 1,
    title: topic.title,
    estimatedMinutes: 20,
    examTags:
      chapter.examApplicability === 'jee_main_only'
        ? ['JEE Main']
        : chapter.examApplicability === 'jee_advanced_only'
        ? ['JEE Advanced']
        : ['JEE Main', 'JEE Advanced'],
    coreConcept: `${chapter.title} — ${chapter.subtitle}`,
    detailedTheory: [
      `JEE Main Scope: ${chapter.jeeMainNotes}`,
      `JEE Advanced Scope: ${chapter.jeeAdvancedNotes}`,
      ...(chapter.excludedFromJeeMain?.length
        ? [`Syllabus Difference: ${chapter.excludedFromJeeMain.join('; ')}`]
        : []),
    ],
    derivations: [],
    solvedExamples: [],
    commonMistakes: [
      'Use the IIT AI Tutor panel on the right to generate step-by-step solved examples and derivations for this topic.',
    ],
    checkpointQuestion: {
      prompt: `What is the key syllabus distinction for ${chapter.title} between JEE Main and JEE Advanced?`,
      answer: `${chapter.jeeMainNotes} | Advanced: ${chapter.jeeAdvancedNotes}`,
    },
  }));
}

export function getRevisionNotesForChapter(chapterId: string): IITChapterRevisionNotes {
  const authored = ALL_IIT_REVISION_NOTES.find((r) => r.chapterId === chapterId);
  if (authored) return authored;

  const chapter = getChapterById(chapterId);
  const formulas = getFormulasForChapter(chapterId);
  return {
    chapterId,
    sixtySecondSummary: [
      chapter ? `${chapter.title}: ${chapter.subtitle}` : 'Chapter rapid summary',
      ...(chapter ? [`JEE Main Focus: ${chapter.jeeMainNotes}`, `JEE Advanced Focus: ${chapter.jeeAdvancedNotes}`] : []),
      ...formulas.slice(0, 3).map((f) => `${f.title}: $${f.latex}$`),
    ],
    twoMinuteHighYield: {
      coreIdea: chapter?.subtitle || 'High-yield revision summary',
      keyLawsAndConditions: [
        chapter?.jeeMainNotes || 'Verify core NCERT principles and boundary conditions.',
        chapter?.jeeAdvancedNotes || 'Practice multi-concept applications.',
      ],
      examTraps: chapter?.excludedFromJeeMain?.length
        ? chapter.excludedFromJeeMain
        : ['Verify units, sign conventions, and limiting cases before marking final answer.'],
    },
  };
}

export const IIT_CURRICULUM_STATS = {
  totalUnits: IIT_UNITS.length,
  totalChapters: IIT_CHAPTERS.length,
  physicsChapters: IIT_CHAPTERS.filter((c) => c.subject === 'physics').length,
  chemistryChapters: IIT_CHAPTERS.filter((c) => c.subject === 'chemistry').length,
  mathsChapters: IIT_CHAPTERS.filter((c) => c.subject === 'mathematics').length,
  totalLessons: ALL_IIT_LESSONS.length,
  totalFormulas: ALL_IIT_FORMULAS.length,
  formulasCount: ALL_IIT_FORMULAS.length,
  totalQuestions: ALL_IIT_QUESTIONS.length,
  questionsCount: ALL_IIT_QUESTIONS.length,
  totalPyqs: ALL_IIT_QUESTIONS.filter((q) => q.isPyq).length,
  totalFlashcards: ALL_IIT_FLASHCARDS.length,
  totalMockTests: IIT_MOCK_TESTS.length,
};
