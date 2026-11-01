import { ModuleData, LessonContent } from '@/lib/types';
import { p11m1Data, p11m2Data, p11m3Data, deploymentModule1Lessons } from './deployment-module-1';
import { p11m4Data, p11m5Data, p11m6Data, deploymentModule2Lessons } from './deployment-module-2';
import { p11m7Data, p11m8Data, p11m9Data, deploymentModule3Lessons } from './deployment-module-3';
import { p11m10Data, p11m11Data, p11m12Data, deploymentModule4Lessons } from './deployment-module-4';
import { p11m13Data, p11m14Data, p11m15Data, deploymentModule5Lessons } from './deployment-module-5';

export const MODULES_CATALOG_DEPLOYMENT: ModuleData[] = [
  p11m1Data,
  p11m2Data,
  p11m3Data,
  p11m4Data,
  p11m5Data,
  p11m6Data,
  p11m7Data,
  p11m8Data,
  p11m9Data,
  p11m10Data,
  p11m11Data,
  p11m12Data,
  p11m13Data,
  p11m14Data,
  p11m15Data,
];

export const DEPLOYMENT_FULL_LESSONS: Record<string, LessonContent> = {
  ...deploymentModule1Lessons,
  ...deploymentModule2Lessons,
  ...deploymentModule3Lessons,
  ...deploymentModule4Lessons,
  ...deploymentModule5Lessons,
};

export function getDeploymentModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_DEPLOYMENT.find((m) => m.id === moduleId);
}

export function getDeploymentLesson(lessonId: string): LessonContent | undefined {
  return DEPLOYMENT_FULL_LESSONS[lessonId];
}

