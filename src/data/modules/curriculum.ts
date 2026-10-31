import { ModuleData, LessonContent } from '@/lib/types';
import { module0Data, module0Lessons } from './module0';
import { module1Data, module1Lessons } from './module1';
import { module2Data, module2Lessons } from './module2';
import { module3Data, module3Lessons } from './module3';
import { module4Data, module4Lessons } from './module4';
import { module5Data, module5Lessons } from './module5';
import { module6Data, module6Lessons } from './module6';
import { module7Data, module7Lessons } from './module7';
import { module8Data, module8Lessons } from './module8';
import { module9Data, module9Lessons } from './module9';
import { module10Data, module10Lessons } from './module10';
import { module11Data, module11Lessons } from './module11';
import { MODULES_CATALOG_NUMPY, NUMPY_FULL_LESSONS } from '@/data/numpy/curriculum';
import { MODULES_CATALOG_PANDAS, PANDAS_FULL_LESSONS } from '@/data/pandas/curriculum';
import { MODULES_CATALOG_DEEP_LEARNING, DEEP_LEARNING_FULL_LESSONS } from '@/data/deep-learning/curriculum';
import { MODULES_CATALOG_TRANSFORMERS, TRANSFORMERS_FULL_LESSONS } from '@/data/transformers/curriculum';
import { MODULES_CATALOG_GENAI, GENAI_FULL_LESSONS } from '@/data/genai/curriculum';

export { MODULES_CATALOG_NUMPY, NUMPY_FULL_LESSONS } from '@/data/numpy/curriculum';
export { MODULES_CATALOG_PANDAS, PANDAS_FULL_LESSONS } from '@/data/pandas/curriculum';
export { MODULES_CATALOG_DEEP_LEARNING, DEEP_LEARNING_FULL_LESSONS } from '@/data/deep-learning/curriculum';
export { MODULES_CATALOG_TRANSFORMERS, TRANSFORMERS_FULL_LESSONS } from '@/data/transformers/curriculum';
export { MODULES_CATALOG_GENAI, GENAI_FULL_LESSONS } from '@/data/genai/curriculum';

export const MODULES_CATALOG_ML_CORE: ModuleData[] = [
  module0Data,
  module1Data,
  module2Data,
  module3Data,
  module4Data,
  module5Data,
  module6Data,
  module7Data,
  module8Data,
  module9Data,
  module10Data,
  module11Data,
];

export const MODULES_CATALOG: ModuleData[] = [
  ...MODULES_CATALOG_ML_CORE,
  ...MODULES_CATALOG_DEEP_LEARNING,
  ...MODULES_CATALOG_TRANSFORMERS,
  ...MODULES_CATALOG_GENAI,
  ...MODULES_CATALOG_NUMPY,
  ...MODULES_CATALOG_PANDAS,
];

export const FULL_LESSONS: Record<string, LessonContent> = {
  ...module0Lessons,
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
  ...module6Lessons,
  ...module7Lessons,
  ...module8Lessons,
  ...module9Lessons,
  ...module10Lessons,
  ...module11Lessons,
  ...DEEP_LEARNING_FULL_LESSONS,
  ...TRANSFORMERS_FULL_LESSONS,
  ...GENAI_FULL_LESSONS,
  ...NUMPY_FULL_LESSONS,
  ...PANDAS_FULL_LESSONS,
};

export function getModule(moduleId: string): ModuleData | undefined {
  return MODULES_CATALOG.find((m) => m.id === moduleId);
}

export function getLesson(moduleId: string, lessonId: string): LessonContent | undefined {
  return FULL_LESSONS[lessonId];
}
