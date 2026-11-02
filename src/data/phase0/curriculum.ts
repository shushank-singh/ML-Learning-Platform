import { ModuleData, LessonContent } from '@/lib/types';
import {
  phase0Mod1Data,
  p0Mod1Lessons,
  phase0Mod2Data,
  p0Mod2Lessons,
  phase0Mod3Data,
  p0Mod3Lessons,
} from './phase0-modules-1-to-3';
import {
  phase0Mod4Data,
  p0Mod4Lessons,
  phase0Mod5Data,
  p0Mod5Lessons,
  phase0Mod6Data,
  p0Mod6Lessons,
} from './phase0-modules-4-to-6';

export const MODULES_CATALOG_PHASE0: ModuleData[] = [
  phase0Mod1Data,
  phase0Mod2Data,
  phase0Mod3Data,
  phase0Mod4Data,
  phase0Mod5Data,
  phase0Mod6Data,
];

export const PHASE0_FULL_LESSONS: Record<string, LessonContent> = {
  ...p0Mod1Lessons,
  ...p0Mod2Lessons,
  ...p0Mod3Lessons,
  ...p0Mod4Lessons,
  ...p0Mod5Lessons,
  ...p0Mod6Lessons,
};

export function getPhase0Module(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_PHASE0.find((m) => m.id === moduleId);
}

export function getPhase0Lesson(lessonId: string): LessonContent | undefined {
  return PHASE0_FULL_LESSONS[lessonId];
}

