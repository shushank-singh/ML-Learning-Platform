import { JavaModuleData, JavaLessonContent } from '@/lib/types';
import { javaModule1Data, javaModule1Lessons } from './java-module-1';
import { javaModule2Data, javaModule2Lessons } from './java-module-2';
import { javaModule3Data, javaModule3Lessons } from './java-module-3';
import { javaModule4Data, javaModule4Lessons } from './java-module-4';
import { javaModule5Data, javaModule5Lessons } from './java-module-5';
import { javaModule6Data, javaModule6Lessons } from './java-module-6';
import { javaModule7Data, javaModule7Lessons } from './java-module-7';
import { javaModule8Data, javaModule8Lessons } from './java-module-8';
import { javaModule9Data, javaModule9Lessons } from './java-module-9';
import { javaModule10Data, javaModule10Lessons } from './java-module-10';
import { javaModule11Data, javaModule11Lessons } from './java-module-11';
import { javaModule12Data, javaModule12Lessons } from './java-module-12';

export const MODULES_CATALOG_JAVA: JavaModuleData[] = [
  javaModule1Data,
  javaModule2Data,
  javaModule3Data,
  javaModule4Data,
  javaModule5Data,
  javaModule6Data,
  javaModule7Data,
  javaModule8Data,
  javaModule9Data,
  javaModule10Data,
  javaModule11Data,
  javaModule12Data,
];

export const JAVA_FULL_LESSONS: Record<string, JavaLessonContent> = {
  ...javaModule1Lessons,
  ...javaModule2Lessons,
  ...javaModule3Lessons,
  ...javaModule4Lessons,
  ...javaModule5Lessons,
  ...javaModule6Lessons,
  ...javaModule7Lessons,
  ...javaModule8Lessons,
  ...javaModule9Lessons,
  ...javaModule10Lessons,
  ...javaModule11Lessons,
  ...javaModule12Lessons,
};

export function getJavaModule(moduleId: string): JavaModuleData | undefined {
  return MODULES_CATALOG_JAVA.find((m) => m.id === moduleId);
}

export function getJavaLesson(lessonId: string): JavaLessonContent | undefined {
  return JAVA_FULL_LESSONS[lessonId];
}

export function getJavaLessonsByModule(moduleId: string): Record<string, JavaLessonContent> {
  const result: Record<string, JavaLessonContent> = {};
  for (const [id, lesson] of Object.entries(JAVA_FULL_LESSONS)) {
    if (lesson.moduleId === moduleId) result[id] = lesson;
  }
  return result;
}
