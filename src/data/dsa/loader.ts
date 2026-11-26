import type { DSALessonContent } from '@/lib/types';

async function loadDSAModuleLessons(moduleId: string): Promise<Record<string, DSALessonContent> | null> {
  switch (moduleId) {
    case 'dsa-module-1': return (await import('./dsa-module-1')).dsaModule1Lessons;
    case 'dsa-module-2': return (await import('./dsa-module-2')).dsaModule2Lessons;
    case 'dsa-module-3': return (await import('./dsa-module-3')).dsaModule3Lessons;
    case 'dsa-module-4': return (await import('./dsa-module-4')).dsaModule4Lessons;
    case 'dsa-module-5': return (await import('./dsa-module-5')).dsaModule5Lessons;
    case 'dsa-module-6': return (await import('./dsa-module-6')).dsaModule6Lessons;
    case 'dsa-module-7': return (await import('./dsa-module-7')).dsaModule7Lessons;
    case 'dsa-module-8': return (await import('./dsa-module-8')).dsaModule8Lessons;
    case 'dsa-module-9': return (await import('./dsa-module-9')).dsaModule9Lessons;
    case 'dsa-module-10': return (await import('./dsa-module-10')).dsaModule10Lessons;
    case 'dsa-module-11': return (await import('./dsa-module-11')).dsaModule11Lessons;
    case 'dsa-module-12': return (await import('./dsa-module-12')).dsaModule12Lessons;
    default: return null;
  }
}

export async function loadDSALessonFast(
  moduleId: string,
  lessonId: string
): Promise<DSALessonContent | undefined> {
  if (!lessonId) return undefined;
  const map = await loadDSAModuleLessons(moduleId);
  if (map && map[lessonId]) return map[lessonId];

  const { getDSALesson } = await import('./curriculum');
  return getDSALesson(lessonId);
}
