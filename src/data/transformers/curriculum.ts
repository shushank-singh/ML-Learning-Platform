import { ModuleData, LessonContent } from '@/lib/types';
import { p6m1Data, p6m2Data, p6m3Data, tfModule1Lessons } from './tf-module-1';
import { p6m4Data, p6m5Data, p6m6Data, tfModule2Lessons } from './tf-module-2';
import { p6m7Data, p6m8Data, p6m9Data, tfModule3Lessons } from './tf-module-3';
import { p6m10Data, p6m11Data, p6m12Data, tfModule4Lessons } from './tf-module-4';
import { p6m13Data, p6m14Data, p6m15Data, tfModule5Lessons } from './tf-module-5';

export const MODULES_CATALOG_TRANSFORMERS: ModuleData[] = [
  p6m1Data,
  p6m2Data,
  p6m3Data,
  p6m4Data,
  p6m5Data,
  p6m6Data,
  p6m7Data,
  p6m8Data,
  p6m9Data,
  p6m10Data,
  p6m11Data,
  p6m12Data,
  p6m13Data,
  p6m14Data,
  p6m15Data,
];

export const TRANSFORMERS_FULL_LESSONS: Record<string, LessonContent> = {
  ...tfModule1Lessons,
  ...tfModule2Lessons,
  ...tfModule3Lessons,
  ...tfModule4Lessons,
  ...tfModule5Lessons,
};

export function getTransformerModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_TRANSFORMERS.find((m) => m.id === moduleId);
}

export function getTransformerLesson(lessonId: string): LessonContent | undefined {
  return TRANSFORMERS_FULL_LESSONS[lessonId];
}

