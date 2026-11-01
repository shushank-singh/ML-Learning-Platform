import { ModuleData, LessonContent } from '@/lib/types';
import { p8m1Data, p8m2Data, p8m3Data, ragModule1Lessons } from './rag-module-1';
import { p8m4Data, p8m5Data, p8m6Data, ragModule2Lessons } from './rag-module-2';
import { p8m7Data, p8m8Data, p8m9Data, ragModule3Lessons } from './rag-module-3';
import { p8m10Data, p8m11Data, p8m12Data, ragModule4Lessons } from './rag-module-4';
import { p8m13Data, p8m14Data, p8m15Data, ragModule5Lessons } from './rag-module-5';

export const MODULES_CATALOG_RAG: ModuleData[] = [
  p8m1Data,
  p8m2Data,
  p8m3Data,
  p8m4Data,
  p8m5Data,
  p8m6Data,
  p8m7Data,
  p8m8Data,
  p8m9Data,
  p8m10Data,
  p8m11Data,
  p8m12Data,
  p8m13Data,
  p8m14Data,
  p8m15Data,
];

export const RAG_FULL_LESSONS: Record<string, LessonContent> = {
  ...ragModule1Lessons,
  ...ragModule2Lessons,
  ...ragModule3Lessons,
  ...ragModule4Lessons,
  ...ragModule5Lessons,
};

export function getRagModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_RAG.find((m) => m.id === moduleId);
}

export function getRagLesson(lessonId: string): LessonContent | undefined {
  return RAG_FULL_LESSONS[lessonId];
}

