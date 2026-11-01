import { ModuleData, LessonContent } from '@/lib/types';
import { p10m1Data, p10m2Data, p10m3Data, mlopsModule1Lessons } from './mlops-module-1';
import { p10m4Data, p10m5Data, p10m6Data, mlopsModule2Lessons } from './mlops-module-2';
import { p10m7Data, p10m8Data, p10m9Data, mlopsModule3Lessons } from './mlops-module-3';
import { p10m10Data, p10m11Data, p10m12Data, mlopsModule4Lessons } from './mlops-module-4';
import { p10m13Data, p10m14Data, p10m15Data, mlopsModule5Lessons } from './mlops-module-5';

export const MODULES_CATALOG_MLOPS: ModuleData[] = [
  p10m1Data,
  p10m2Data,
  p10m3Data,
  p10m4Data,
  p10m5Data,
  p10m6Data,
  p10m7Data,
  p10m8Data,
  p10m9Data,
  p10m10Data,
  p10m11Data,
  p10m12Data,
  p10m13Data,
  p10m14Data,
  p10m15Data,
];

export const MLOPS_FULL_LESSONS: Record<string, LessonContent> = {
  ...mlopsModule1Lessons,
  ...mlopsModule2Lessons,
  ...mlopsModule3Lessons,
  ...mlopsModule4Lessons,
  ...mlopsModule5Lessons,
};

export function getMLOpsModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_MLOPS.find((m) => m.id === moduleId);
}

export function getMLOpsLesson(lessonId: string): LessonContent | undefined {
  return MLOPS_FULL_LESSONS[lessonId];
}

