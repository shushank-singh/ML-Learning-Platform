import { ModuleData, LessonContent } from '@/lib/types';
import { p7m1Data, p7m2Data, p7m3Data, genaiModule1Lessons } from './genai-module-1';
import { p7m4Data, p7m5Data, p7m6Data, genaiModule2Lessons } from './genai-module-2';
import { p7m7Data, p7m8Data, p7m9Data, genaiModule3Lessons } from './genai-module-3';
import { p7m10Data, p7m11Data, p7m12Data, genaiModule4Lessons } from './genai-module-4';
import { p7m13Data, p7m14Data, p7m15Data, genaiModule5Lessons } from './genai-module-5';

export const MODULES_CATALOG_GENAI: ModuleData[] = [
  p7m1Data,
  p7m2Data,
  p7m3Data,
  p7m4Data,
  p7m5Data,
  p7m6Data,
  p7m7Data,
  p7m8Data,
  p7m9Data,
  p7m10Data,
  p7m11Data,
  p7m12Data,
  p7m13Data,
  p7m14Data,
  p7m15Data,
];

export const GENAI_FULL_LESSONS: Record<string, LessonContent> = {
  ...genaiModule1Lessons,
  ...genaiModule2Lessons,
  ...genaiModule3Lessons,
  ...genaiModule4Lessons,
  ...genaiModule5Lessons,
};

export function getGenAIModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_GENAI.find((m) => m.id === moduleId);
}

export function getGenAILesson(lessonId: string): LessonContent | undefined {
  return GENAI_FULL_LESSONS[lessonId];
}

