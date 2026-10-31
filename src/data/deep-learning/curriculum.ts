import { ModuleData, LessonContent } from '@/lib/types';
import { dlModule1Data, dlModule1Lessons } from './dl-module-1';
import { dlModule2Data, dlModule2Lessons } from './dl-module-2';
import { dlModule3Data, dlModule3Lessons } from './dl-module-3';
import { dlModule4Data, dlModule4Lessons } from './dl-module-4';
import { dlModule5Data, dlModule5Lessons } from './dl-module-5';
import { dlModule6Data, dlModule6Lessons } from './dl-module-6';

export const MODULES_CATALOG_DEEP_LEARNING: ModuleData[] = [
  dlModule1Data,
  dlModule2Data,
  dlModule3Data,
  dlModule4Data,
  dlModule5Data,
  dlModule6Data,
];

export const DEEP_LEARNING_FULL_LESSONS: Record<string, LessonContent> = {
  ...dlModule1Lessons,
  ...dlModule2Lessons,
  ...dlModule3Lessons,
  ...dlModule4Lessons,
  ...dlModule5Lessons,
  ...dlModule6Lessons,
};

export function getDeepLearningModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_DEEP_LEARNING.find((m) => m.id === moduleId);
}

export function getDeepLearningLesson(lessonId: string): LessonContent | undefined {
  return DEEP_LEARNING_FULL_LESSONS[lessonId];
}

