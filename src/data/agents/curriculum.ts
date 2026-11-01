import { ModuleData, LessonContent } from '@/lib/types';
import { p9m1Data, p9m2Data, p9m3Data, agentModule1Lessons } from './agent-module-1';
import { p9m4Data, p9m5Data, p9m6Data, agentModule2Lessons } from './agent-module-2';
import { p9m7Data, p9m8Data, p9m9Data, agentModule3Lessons } from './agent-module-3';
import { p9m10Data, p9m11Data, p9m12Data, agentModule4Lessons } from './agent-module-4';
import { p9m13Data, p9m14Data, p9m15Data, agentModule5Lessons } from './agent-module-5';

export const MODULES_CATALOG_AGENTS: ModuleData[] = [
  p9m1Data,
  p9m2Data,
  p9m3Data,
  p9m4Data,
  p9m5Data,
  p9m6Data,
  p9m7Data,
  p9m8Data,
  p9m9Data,
  p9m10Data,
  p9m11Data,
  p9m12Data,
  p9m13Data,
  p9m14Data,
  p9m15Data,
];

export const AGENTS_FULL_LESSONS: Record<string, LessonContent> = {
  ...agentModule1Lessons,
  ...agentModule2Lessons,
  ...agentModule3Lessons,
  ...agentModule4Lessons,
  ...agentModule5Lessons,
};

export function getAgentModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_AGENTS.find((m) => m.id === moduleId);
}

export function getAgentLesson(lessonId: string): LessonContent | undefined {
  return AGENTS_FULL_LESSONS[lessonId];
}

