import { DSAModuleData, DSALessonContent } from '@/lib/types';
import { dsaModule1Data, dsaModule1Lessons } from './dsa-module-1';
import { dsaModule2Data, dsaModule2Lessons } from './dsa-module-2';
import { dsaModule3Data, dsaModule3Lessons } from './dsa-module-3';
import { dsaModule4Data, dsaModule4Lessons } from './dsa-module-4';
import { dsaModule5Data, dsaModule5Lessons } from './dsa-module-5';
import { dsaModule6Data, dsaModule6Lessons } from './dsa-module-6';
import { dsaModule7Data, dsaModule7Lessons } from './dsa-module-7';
import { dsaModule8Data, dsaModule8Lessons } from './dsa-module-8';
import { dsaModule9Data, dsaModule9Lessons } from './dsa-module-9';
import { dsaModule10Data, dsaModule10Lessons } from './dsa-module-10';
import { dsaModule11Data, dsaModule11Lessons } from './dsa-module-11';
import { dsaModule12Data, dsaModule12Lessons } from './dsa-module-12';

export const MODULES_CATALOG_DSA: DSAModuleData[] = [
  dsaModule1Data,
  dsaModule2Data,
  dsaModule3Data,
  dsaModule4Data,
  dsaModule5Data,
  dsaModule6Data,
  dsaModule7Data,
  dsaModule8Data,
  dsaModule9Data,
  dsaModule10Data,
  dsaModule11Data,
  dsaModule12Data,
];

export const DSA_FULL_LESSONS: Record<string, DSALessonContent> = {
  ...dsaModule1Lessons,
  ...dsaModule2Lessons,
  ...dsaModule3Lessons,
  ...dsaModule4Lessons,
  ...dsaModule5Lessons,
  ...dsaModule6Lessons,
  ...dsaModule7Lessons,
  ...dsaModule8Lessons,
  ...dsaModule9Lessons,
  ...dsaModule10Lessons,
  ...dsaModule11Lessons,
  ...dsaModule12Lessons,
};

export function getDSAModule(moduleId: string): DSAModuleData | undefined {
  return MODULES_CATALOG_DSA.find((m) => m.id === moduleId);
}

export function getDSALesson(lessonId: string): DSALessonContent | undefined {
  return DSA_FULL_LESSONS[lessonId];
}

export function getDSALessonsByModule(
  moduleId: string
): Record<string, DSALessonContent> {
  const result: Record<string, DSALessonContent> = {};
  for (const [id, lesson] of Object.entries(DSA_FULL_LESSONS)) {
    if (lesson.moduleId === moduleId) result[id] = lesson;
  }
  return result;
}
