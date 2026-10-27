// Pandas Mastery Curriculum Catalog & Lesson Registry
import { ModuleData, LessonContent } from '@/lib/types';
import { pandasModule1Data, pandasModule1Lessons } from './pandas-module-1';
import { pandasModule2Data, pandasModule2Lessons } from './pandas-module-2';
import { pandasModule3Data, pandasModule3Lessons } from './pandas-module-3';
import { pandasModule4Data, pandasModule4Lessons } from './pandas-module-4';
import { pandasModule5Data, pandasModule5Lessons } from './pandas-module-5';
import { pandasModule6Data, pandasModule6Lessons } from './pandas-module-6';
import { pandasModule7Data, pandasModule7Lessons } from './pandas-module-7';
import { pandasModule8Data, pandasModule8Lessons } from './pandas-module-8';
import { pandasModule9Data, pandasModule9Lessons } from './pandas-module-9';
import { pandasProjectModuleData, pandasProjectModuleLessons } from './pandas-project';

export const MODULES_CATALOG_PANDAS: ModuleData[] = [
  pandasModule1Data,
  pandasModule2Data,
  pandasModule3Data,
  pandasModule4Data,
  pandasModule5Data,
  pandasModule6Data,
  pandasModule7Data,
  pandasModule8Data,
  pandasModule9Data,
  pandasProjectModuleData,
];

export const PANDAS_FULL_LESSONS: Record<string, LessonContent> = {
  ...pandasModule1Lessons,
  ...pandasModule2Lessons,
  ...pandasModule3Lessons,
  ...pandasModule4Lessons,
  ...pandasModule5Lessons,
  ...pandasModule6Lessons,
  ...pandasModule7Lessons,
  ...pandasModule8Lessons,
  ...pandasModule9Lessons,
  ...pandasProjectModuleLessons,
};

export function getPandasModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_PANDAS.find((m) => m.id === moduleId);
}

export function getPandasLesson(lessonId: string): LessonContent | undefined {
  return PANDAS_FULL_LESSONS[lessonId];
}
