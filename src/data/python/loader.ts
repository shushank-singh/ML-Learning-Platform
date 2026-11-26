import type { PythonLessonContent } from '@/lib/types';

async function loadPythonModuleLessons(moduleId: string): Promise<Record<string, PythonLessonContent> | null> {
  switch (moduleId) {
    case 'python-module-1': return (await import('./python-module-1')).pythonModule1Lessons;
    case 'python-module-2': return (await import('./python-module-2')).pythonModule2Lessons;
    case 'python-module-3': return (await import('./python-module-3')).pythonModule3Lessons;
    case 'python-module-4': return (await import('./python-module-4')).pythonModule4Lessons;
    case 'python-module-5': return (await import('./python-module-5')).pythonModule5Lessons;
    case 'python-module-6': return (await import('./python-module-6')).pythonModule6Lessons;
    case 'python-module-7': return (await import('./python-module-7')).pythonModule7Lessons;
    case 'python-module-8': return (await import('./python-module-8')).pythonModule8Lessons;
    case 'python-module-9': return (await import('./python-module-9')).pythonModule9Lessons;
    case 'python-module-10': return (await import('./python-module-10')).pythonModule10Lessons;
    case 'python-module-11': return (await import('./python-module-11')).pythonModule11Lessons;
    case 'python-module-12': return (await import('./python-module-12')).pythonModule12Lessons;
    default: return null;
  }
}

export async function loadPythonLessonFast(
  moduleId: string,
  lessonId: string
): Promise<PythonLessonContent | undefined> {
  if (!lessonId) return undefined;
  const map = await loadPythonModuleLessons(moduleId);
  if (map && map[lessonId]) return map[lessonId];

  const { getPythonLesson } = await import('./curriculum');
  return getPythonLesson(lessonId);
}
