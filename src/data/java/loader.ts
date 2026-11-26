import type { JavaLessonContent } from '@/lib/types';

async function loadJavaModuleLessons(moduleId: string): Promise<Record<string, JavaLessonContent> | null> {
  switch (moduleId) {
    case 'java-module-1': return (await import('./java-module-1')).javaModule1Lessons;
    case 'java-module-2': return (await import('./java-module-2')).javaModule2Lessons;
    case 'java-module-3': return (await import('./java-module-3')).javaModule3Lessons;
    case 'java-module-4': return (await import('./java-module-4')).javaModule4Lessons;
    case 'java-module-5': return (await import('./java-module-5')).javaModule5Lessons;
    case 'java-module-6': return (await import('./java-module-6')).javaModule6Lessons;
    case 'java-module-7': return (await import('./java-module-7')).javaModule7Lessons;
    case 'java-module-8': return (await import('./java-module-8')).javaModule8Lessons;
    case 'java-module-9': return (await import('./java-module-9')).javaModule9Lessons;
    case 'java-module-10': return (await import('./java-module-10')).javaModule10Lessons;
    case 'java-module-11': return (await import('./java-module-11')).javaModule11Lessons;
    case 'java-module-12': return (await import('./java-module-12')).javaModule12Lessons;
    default: return null;
  }
}

export async function loadJavaLessonFast(
  moduleId: string,
  lessonId: string
): Promise<JavaLessonContent | undefined> {
  if (!lessonId) return undefined;
  const map = await loadJavaModuleLessons(moduleId);
  if (map && map[lessonId]) return map[lessonId];

  const { getJavaLesson } = await import('./curriculum');
  return getJavaLesson(lessonId);
}
