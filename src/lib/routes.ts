/**
 * Canonical Curriculum Route Helper & Registry Aliasing
 *
 * Provides a single source of truth for resolving module and lesson routes,
 * backward-compatibility aliases, and ensuring zero broken navigation links.
 */

// Module ID Aliases: Maps legacy or shorthand module IDs to their canonical IDs
export const MODULE_ALIASES: Record<string, string> = {
  // Shorthand Phase 6-11 IDs
  'tf-module-1': 'p6-m1',
  'genai-module-1': 'p7-m1',
  'rag-module-1': 'p8-m1',
  'agent-module-1': 'p9-m1',
  'mlops-module-1': 'p10-m1',
  'deployment-module-1': 'p11-m1',

  // Phase 1 aliases
  'module-3-reg': 'module-3',
  'module-4-knn': 'module-4',
  'module-8-tune': 'module-8',
  'module-8-leak': 'module-8',
  'module-8-fair': 'module-8',
  'numpy-mastery': 'numpy-module-1',
  'pandas-mastery': 'pandas-module-1',
};

// Shorthand generation for tf, genai, rag, agent, mlops, deployment
for (let i = 1; i <= 15; i++) {
  MODULE_ALIASES[`tf-module-${i}`] = `p6-m${i}`;
  MODULE_ALIASES[`genai-module-${i}`] = `p7-m${i}`;
  MODULE_ALIASES[`rag-module-${i}`] = `p8-m${i}`;
  MODULE_ALIASES[`agent-module-${i}`] = `p9-m${i}`;
  MODULE_ALIASES[`mlops-module-${i}`] = `p10-m${i}`;
  MODULE_ALIASES[`deployment-module-${i}`] = `p11-m${i}`;
}

// Lesson ID Aliases: Maps legacy or shorthand lesson IDs to their canonical IDs
export const LESSON_ALIASES: Record<string, { moduleId: string; lessonId: string }> = {
  // Phase 0 legacy shorthand routes
  'm0-l1': { moduleId: 'phase-0-mod-1', lessonId: 'p0-ai-ml-hierarchy' },
  'm0-l2': { moduleId: 'phase-0-mod-2', lessonId: 'p0-platform-mastery' },

  // Search / Legacy lesson routes
  'multiple-regression': { moduleId: 'module-3', lessonId: 'multiple-linear-regression' },
  'regularization': { moduleId: 'module-3', lessonId: 'ridge-regression' },
  'svm': { moduleId: 'module-4', lessonId: 'support-vector-machines' },
  'random-forest': { moduleId: 'module-6', lessonId: 'random-forests' },
  'kmeans': { moduleId: 'module-7', lessonId: 'k-means-clustering' },
  'pca': { moduleId: 'module-7', lessonId: 'pca-principal-component-analysis' },
  'evaluation-metrics': { moduleId: 'module-5', lessonId: 'confusion-matrix-metrics' },
  'neural-networks': { moduleId: 'module-9', lessonId: 'multilayer-perceptron-ann' },
};

/**
 * Returns canonical moduleId given an id or alias.
 */
export function getCanonicalModuleId(id: string): string {
  if (!id) return '';
  return MODULE_ALIASES[id] || id;
}

/**
 * Resolves a lesson ID and moduleId through canonical alias mapping.
 */
export function resolveCanonicalLessonTarget(
  moduleId: string,
  lessonId: string
): { moduleId: string; lessonId: string } {
  const cleanMod = getCanonicalModuleId(moduleId);
  if (LESSON_ALIASES[lessonId]) {
    return LESSON_ALIASES[lessonId];
  }
  return { moduleId: cleanMod, lessonId };
}

/**
 * Constructs a canonical URL for a module overview.
 */
export function getModuleUrl(moduleId: string): string {
  const canonical = getCanonicalModuleId(moduleId);

  if (canonical.startsWith('dsa-')) return `/dsa/${canonical}`;
  if (canonical.startsWith('python-')) return `/python/${canonical}`;
  if (canonical.startsWith('java-')) return `/java/${canonical}`;
  return `/curriculum/${canonical}`;
}

/**
 * Constructs a canonical URL for an individual lesson.
 */
export function getLessonUrl(moduleId: string, lessonId: string): string {
  const target = resolveCanonicalLessonTarget(moduleId, lessonId);

  if (target.moduleId.startsWith('dsa-')) {
    return `/dsa/${target.moduleId}/${target.lessonId}`;
  }
  if (target.moduleId.startsWith('python-')) {
    return `/python/${target.moduleId}/${target.lessonId}`;
  }
  if (target.moduleId.startsWith('java-')) {
    return `/java/${target.moduleId}/${target.lessonId}`;
  }
  return `/curriculum/${target.moduleId}/${target.lessonId}`;
}

