import { ModuleData, LessonContent } from '@/lib/types';
import { numpyModule1Data, numpyModule1Lessons } from './numpy-module-1';
import { numpyModule2Data, numpyModule2Lessons } from './numpy-module-2';
import { numpyModule3Data, numpyModule3Lessons } from './numpy-module-3';
import { numpyModule4Data, numpyModule4Lessons } from './numpy-module-4';
import { numpyModule5Data, numpyModule5Lessons } from './numpy-module-5';
import { numpyModule6Data, numpyModule6Lessons } from './numpy-module-6';
import { numpyProjectData, numpyProjectLessons } from './numpy-project';

export const MODULES_CATALOG_NUMPY: ModuleData[] = [
  numpyModule1Data,
  numpyModule2Data,
  numpyModule3Data,
  numpyModule4Data,
  numpyModule5Data,
  numpyModule6Data,
  numpyProjectData,
];

export const NUMPY_FULL_LESSONS: Record<string, LessonContent> = {
  ...numpyModule1Lessons,
  ...numpyModule2Lessons,
  ...numpyModule3Lessons,
  ...numpyModule4Lessons,
  ...numpyModule5Lessons,
  ...numpyModule6Lessons,
  ...numpyProjectLessons,
};

export function getNumPyModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG_NUMPY.find((m) => m.id === moduleId);
}

export function getNumPyLesson(lessonId: string): LessonContent | undefined {
  return NUMPY_FULL_LESSONS[lessonId];
}
