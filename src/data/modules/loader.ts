import type { LessonContent } from '@/lib/types';
import { getCanonicalModuleId, resolveCanonicalLessonTarget } from '@/lib/routes';

type LessonMap = Record<string, LessonContent>;

function pickLessonsFromModuleExport(mod: Record<string, any>): LessonMap {
  const merged: LessonMap = {};
  for (const val of Object.values(mod)) {
    if (
      val &&
      typeof val === 'object' &&
      !Array.isArray(val) &&
      !('lessons' in val && 'topicsCount' in val)
    ) {
      for (const [k, v] of Object.entries(val)) {
        if (v && typeof v === 'object' && 'id' in (v as any) && 'moduleId' in (v as any)) {
          merged[k] = v as LessonContent;
        }
      }
    }
  }
  return merged;
}

async function importSingleModuleLessons(canonicalModuleId: string): Promise<LessonMap | null> {
  // Phase 0
  if (['phase-0-mod-1', 'phase-0-mod-2', 'phase-0-mod-3'].includes(canonicalModuleId)) {
    return pickLessonsFromModuleExport(await import('@/data/phase0/phase0-modules-1-to-3'));
  }
  if (['phase-0-mod-4', 'phase-0-mod-5', 'phase-0-mod-6'].includes(canonicalModuleId)) {
    return pickLessonsFromModuleExport(await import('@/data/phase0/phase0-modules-4-to-6'));
  }

  // Core ML (module-0 .. module-11)
  switch (canonicalModuleId) {
    case 'module-0': return (await import('./module0')).module0Lessons;
    case 'module-1': return (await import('./module1')).module1Lessons;
    case 'module-2': return (await import('./module2')).module2Lessons;
    case 'module-3': return (await import('./module3')).module3Lessons;
    case 'module-4': return (await import('./module4')).module4Lessons;
    case 'module-5': return (await import('./module5')).module5Lessons;
    case 'module-6': return (await import('./module6')).module6Lessons;
    case 'module-7': return (await import('./module7')).module7Lessons;
    case 'module-8': return (await import('./module8')).module8Lessons;
    case 'module-9': return (await import('./module9')).module9Lessons;
    case 'module-10': return (await import('./module10')).module10Lessons;
    case 'module-11': return (await import('./module11')).module11Lessons;
  }

  // Deep Learning (dl-module-1 .. dl-module-6)
  switch (canonicalModuleId) {
    case 'dl-module-1': return (await import('@/data/deep-learning/dl-module-1')).dlModule1Lessons;
    case 'dl-module-2': return (await import('@/data/deep-learning/dl-module-2')).dlModule2Lessons;
    case 'dl-module-3': return (await import('@/data/deep-learning/dl-module-3')).dlModule3Lessons;
    case 'dl-module-4': return (await import('@/data/deep-learning/dl-module-4')).dlModule4Lessons;
    case 'dl-module-5': return (await import('@/data/deep-learning/dl-module-5')).dlModule5Lessons;
    case 'dl-module-6': return (await import('@/data/deep-learning/dl-module-6')).dlModule6Lessons;
  }

  // NumPy
  switch (canonicalModuleId) {
    case 'numpy-module-1': return (await import('@/data/numpy/numpy-module-1')).numpyModule1Lessons;
    case 'numpy-module-2': return (await import('@/data/numpy/numpy-module-2')).numpyModule2Lessons;
    case 'numpy-module-3': return (await import('@/data/numpy/numpy-module-3')).numpyModule3Lessons;
    case 'numpy-module-4': return (await import('@/data/numpy/numpy-module-4')).numpyModule4Lessons;
    case 'numpy-module-5': return (await import('@/data/numpy/numpy-module-5')).numpyModule5Lessons;
    case 'numpy-module-6': return (await import('@/data/numpy/numpy-module-6')).numpyModule6Lessons;
    case 'numpy-project': return (await import('@/data/numpy/numpy-project')).numpyProjectLessons;
  }

  // Pandas
  switch (canonicalModuleId) {
    case 'pandas-module-1': return (await import('@/data/pandas/pandas-module-1')).pandasModule1Lessons;
    case 'pandas-module-2': return (await import('@/data/pandas/pandas-module-2')).pandasModule2Lessons;
    case 'pandas-module-3': return (await import('@/data/pandas/pandas-module-3')).pandasModule3Lessons;
    case 'pandas-module-4': return (await import('@/data/pandas/pandas-module-4')).pandasModule4Lessons;
    case 'pandas-module-5': return (await import('@/data/pandas/pandas-module-5')).pandasModule5Lessons;
    case 'pandas-module-6': return (await import('@/data/pandas/pandas-module-6')).pandasModule6Lessons;
    case 'pandas-module-7': return (await import('@/data/pandas/pandas-module-7')).pandasModule7Lessons;
    case 'pandas-module-8': return (await import('@/data/pandas/pandas-module-8')).pandasModule8Lessons;
    case 'pandas-module-9': return (await import('@/data/pandas/pandas-module-9')).pandasModule9Lessons;
    case 'pandas-project': return (await import('@/data/pandas/pandas-project')).pandasProjectModuleLessons;
  }

  // Phase 6-11 grouped modules (p6-m1..15 .. p11-m1..15)
  const groupedMatch = canonicalModuleId.match(/^(p6|p7|p8|p9|p10|p11)-m(\d+)$/);
  if (groupedMatch) {
    const phase = groupedMatch[1];
    const modNum = parseInt(groupedMatch[2], 10);
    const groupIdx = Math.ceil(modNum / 3); // 1..5
    if (groupIdx >= 1 && groupIdx <= 5) {
      if (phase === 'p6') {
        if (groupIdx === 1) return (await import('@/data/transformers/tf-module-1')).tfModule1Lessons;
        if (groupIdx === 2) return (await import('@/data/transformers/tf-module-2')).tfModule2Lessons;
        if (groupIdx === 3) return (await import('@/data/transformers/tf-module-3')).tfModule3Lessons;
        if (groupIdx === 4) return (await import('@/data/transformers/tf-module-4')).tfModule4Lessons;
        return (await import('@/data/transformers/tf-module-5')).tfModule5Lessons;
      }
      if (phase === 'p7') {
        if (groupIdx === 1) return (await import('@/data/genai/genai-module-1')).genaiModule1Lessons;
        if (groupIdx === 2) return (await import('@/data/genai/genai-module-2')).genaiModule2Lessons;
        if (groupIdx === 3) return (await import('@/data/genai/genai-module-3')).genaiModule3Lessons;
        if (groupIdx === 4) return (await import('@/data/genai/genai-module-4')).genaiModule4Lessons;
        return (await import('@/data/genai/genai-module-5')).genaiModule5Lessons;
      }
      if (phase === 'p8') {
        if (groupIdx === 1) return (await import('@/data/rag/rag-module-1')).ragModule1Lessons;
        if (groupIdx === 2) return (await import('@/data/rag/rag-module-2')).ragModule2Lessons;
        if (groupIdx === 3) return (await import('@/data/rag/rag-module-3')).ragModule3Lessons;
        if (groupIdx === 4) return (await import('@/data/rag/rag-module-4')).ragModule4Lessons;
        return (await import('@/data/rag/rag-module-5')).ragModule5Lessons;
      }
      if (phase === 'p9') {
        if (groupIdx === 1) return (await import('@/data/agents/agent-module-1')).agentModule1Lessons;
        if (groupIdx === 2) return (await import('@/data/agents/agent-module-2')).agentModule2Lessons;
        if (groupIdx === 3) return (await import('@/data/agents/agent-module-3')).agentModule3Lessons;
        if (groupIdx === 4) return (await import('@/data/agents/agent-module-4')).agentModule4Lessons;
        return (await import('@/data/agents/agent-module-5')).agentModule5Lessons;
      }
      if (phase === 'p10') {
        if (groupIdx === 1) return (await import('@/data/mlops/mlops-module-1')).mlopsModule1Lessons;
        if (groupIdx === 2) return (await import('@/data/mlops/mlops-module-2')).mlopsModule2Lessons;
        if (groupIdx === 3) return (await import('@/data/mlops/mlops-module-3')).mlopsModule3Lessons;
        if (groupIdx === 4) return (await import('@/data/mlops/mlops-module-4')).mlopsModule4Lessons;
        return (await import('@/data/mlops/mlops-module-5')).mlopsModule5Lessons;
      }
      if (phase === 'p11') {
        if (groupIdx === 1) return (await import('@/data/deployment/deployment-module-1')).deploymentModule1Lessons;
        if (groupIdx === 2) return (await import('@/data/deployment/deployment-module-2')).deploymentModule2Lessons;
        if (groupIdx === 3) return (await import('@/data/deployment/deployment-module-3')).deploymentModule3Lessons;
        if (groupIdx === 4) return (await import('@/data/deployment/deployment-module-4')).deploymentModule4Lessons;
        return (await import('@/data/deployment/deployment-module-5')).deploymentModule5Lessons;
      }
    }
  }

  return null;
}

/**
 * Loads only the single module containing the requested lesson, avoiding
 * importing all 417 lessons on every serverless cold start.
 */
export async function loadLessonFast(
  moduleId: string,
  lessonId: string
): Promise<LessonContent | undefined> {
  if (!lessonId) return undefined;

  const target = resolveCanonicalLessonTarget(moduleId, lessonId);
  const candidateModules = Array.from(
    new Set([target.moduleId, getCanonicalModuleId(moduleId), moduleId].filter(Boolean))
  );

  for (const modId of candidateModules) {
    const map = await importSingleModuleLessons(modId);
    if (map) {
      if (map[target.lessonId]) return map[target.lessonId];
      if (map[lessonId]) return map[lessonId];
    }
  }

  // Fallback to full registry only for unrecognized legacy aliases
  const { getLesson } = await import('./curriculum');
  return getLesson(moduleId, lessonId);
}
