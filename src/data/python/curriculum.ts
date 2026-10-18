import { PythonModuleData, PythonLessonContent } from '@/lib/types';
import { pythonModule1Data, pythonModule1Lessons } from './python-module-1';
import { pythonModule2Data, pythonModule2Lessons } from './python-module-2';
import { pythonModule3Data, pythonModule3Lessons } from './python-module-3';
import { pythonModule4Data, pythonModule4Lessons } from './python-module-4';
import { pythonModule5Data, pythonModule5Lessons } from './python-module-5';
import { pythonModule6Data, pythonModule6Lessons } from './python-module-6';
import { pythonModule7Data, pythonModule7Lessons } from './python-module-7';
import { pythonModule8Data, pythonModule8Lessons } from './python-module-8';
import { pythonModule9Data, pythonModule9Lessons } from './python-module-9';
import { pythonModule10Data, pythonModule10Lessons } from './python-module-10';
import { pythonModule11Data, pythonModule11Lessons } from './python-module-11';
import { pythonModule12Data, pythonModule12Lessons } from './python-module-12';

export const MODULES_CATALOG_PYTHON: PythonModuleData[] = [
  pythonModule1Data,
  pythonModule2Data,
  pythonModule3Data,
  pythonModule4Data,
  pythonModule5Data,
  pythonModule6Data,
  pythonModule7Data,
  pythonModule8Data,
  pythonModule9Data,
  pythonModule10Data,
  pythonModule11Data,
  pythonModule12Data,
];

export const PYTHON_FULL_LESSONS: Record<string, PythonLessonContent> = {
  ...pythonModule1Lessons,
  ...pythonModule2Lessons,
  ...pythonModule3Lessons,
  ...pythonModule4Lessons,
  ...pythonModule5Lessons,
  ...pythonModule6Lessons,
  ...pythonModule7Lessons,
  ...pythonModule8Lessons,
  ...pythonModule9Lessons,
  ...pythonModule10Lessons,
  ...pythonModule11Lessons,
  ...pythonModule12Lessons,
};

export function getPythonModule(moduleId: string): PythonModuleData | undefined {
  return MODULES_CATALOG_PYTHON.find((m) => m.id === moduleId);
}

export function getPythonLesson(lessonId: string): PythonLessonContent | undefined {
  return PYTHON_FULL_LESSONS[lessonId];
}

export function getPythonLessonsByModule(
  moduleId: string
): Record<string, PythonLessonContent> {
  const result: Record<string, PythonLessonContent> = {};
  for (const [id, lesson] of Object.entries(PYTHON_FULL_LESSONS)) {
    if (lesson.moduleId === moduleId) result[id] = lesson;
  }
  return result;
}
