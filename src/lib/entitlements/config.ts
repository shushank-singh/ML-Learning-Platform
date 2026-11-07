/**
 * Canonical Entitlement Configuration & Free Allowlist Registry
 *
 * Defines the precise Module 0 allowlist for free tier users, track mappings,
 * and restricted curriculum boundaries.
 */

/**
 * The exact 5 Module 0 IDs permitted for free authenticated users.
 * Resolved directly from the production curriculum registries:
 * - Machine Learning: 'module-0' (Phase 1, Module 0: Machine Learning Foundations)
 * - NumPy: 'numpy-module-1' (NumPy Foundations)
 * - Pandas: 'pandas-module-1' (Pandas Foundations)
 * - Python: 'python-module-1' (Python Fundamentals)
 * - Java: 'java-module-1' (Java Fundamentals)
 */
export const FREE_ALLOWED_MODULE_IDS = [
  'module-0',
  'numpy-module-1',
  'pandas-module-1',
  'python-module-1',
  'java-module-1',
] as const;

export type FreeAllowedModuleId = (typeof FREE_ALLOWED_MODULE_IDS)[number];

/**
 * Module aliases mapping shorthand or display names to canonical IDs.
 */
export const FREE_MODULE_ALIASES: Record<string, FreeAllowedModuleId> = {
  // Machine Learning
  'module-0': 'module-0',
  'ml-module-0': 'module-0',
  'ml-0': 'module-0',

  // NumPy
  'numpy-module-1': 'numpy-module-1',
  'numpy-module-0': 'numpy-module-1',
  'numpy-0': 'numpy-module-1',
  'numpy-mastery': 'numpy-module-1',

  // Pandas
  'pandas-module-1': 'pandas-module-1',
  'pandas-module-0': 'pandas-module-1',
  'pandas-0': 'pandas-module-1',
  'pandas-mastery': 'pandas-module-1',

  // Python
  'python-module-1': 'python-module-1',
  'python-module-0': 'python-module-1',
  'python-0': 'python-module-1',

  // Java
  'java-module-1': 'java-module-1',
  'java-module-0': 'java-module-1',
  'java-0': 'java-module-1',
};

/**
 * Resolves a module identifier to canonical form, handling aliases.
 */
export function resolveCanonicalModuleId(rawModuleId: string): string {
  if (!rawModuleId) return '';
  const trimmed = rawModuleId.trim().toLowerCase();
  if (FREE_MODULE_ALIASES[trimmed]) {
    return FREE_MODULE_ALIASES[trimmed];
  }
  return rawModuleId;
}

/**
 * Checks if a resolved module ID is in the free allowlist.
 */
export function isFreeAllowedModule(moduleId: string): boolean {
  const canonical = resolveCanonicalModuleId(moduleId);
  return (FREE_ALLOWED_MODULE_IDS as readonly string[]).includes(canonical);
}

/**
 * Canonical Track Identifiers recognized across AzurLearn.
 */
export const CANONICAL_TRACK_IDS = [
  'ml',
  'numpy',
  'pandas',
  'python',
  'java',
  'dsa',
  'deep-learning',
  'transformers',
  'genai',
  'rag',
  'agents',
  'mlops',
  'deployment',
] as const;

export type CanonicalTrackId = (typeof CANONICAL_TRACK_IDS)[number];

export const TRACK_ALIASES: Record<string, CanonicalTrackId> = {
  'ml': 'ml',
  'ml-core': 'ml',
  'machine-learning': 'ml',
  'numpy': 'numpy',
  'numpy-mastery': 'numpy',
  'pandas': 'pandas',
  'pandas-mastery': 'pandas',
  'python': 'python',
  'python-programming': 'python',
  'java': 'java',
  'java-programming': 'java',
  'dsa': 'dsa',
  'data-structures-algorithms': 'dsa',
  'deep-learning': 'deep-learning',
  'dl': 'deep-learning',
  'transformers': 'transformers',
  'tf': 'transformers',
  'p6': 'transformers',
  'genai': 'genai',
  'p7': 'genai',
  'rag': 'rag',
  'p8': 'rag',
  'agents': 'agents',
  'agent': 'agents',
  'p9': 'agents',
  'mlops': 'mlops',
  'p10': 'mlops',
  'deployment': 'deployment',
  'p11': 'deployment',
};

/**
 * Normalizes any track alias or raw name to its canonical identifier.
 */
export function normalizeTrackId(rawTrackId: string): string {
  if (!rawTrackId) return 'unknown';
  const clean = rawTrackId.trim().toLowerCase();
  return TRACK_ALIASES[clean] || clean;
}

/**
 * Explicit list of restricted tracks where free users have ZERO module access.
 */
export const RESTRICTED_TRACKS = [
  'deep-learning',
  'transformers',
  'genai',
  'rag',
  'agents',
  'mlops',
  'deployment',
  'dsa',
] as const;

/**
 * Helper to determine canonical track ownership from moduleId.
 */
export function getTrackFromModuleId(moduleId: string): string {
  if (!moduleId) return 'unknown';
  const id = moduleId.toLowerCase().trim();
  if (id.startsWith('dsa-')) return 'dsa';
  if (id.startsWith('python-')) return 'python';
  if (id.startsWith('java-')) return 'java';
  if (id.startsWith('numpy-')) return 'numpy';
  if (id.startsWith('pandas-')) return 'pandas';
  if (id.startsWith('dl-') || id === 'module-9') return 'deep-learning';
  if (id.startsWith('tf-') || id.startsWith('p6-')) return 'transformers';
  if (id.startsWith('genai-') || id.startsWith('p7-')) return 'genai';
  if (id.startsWith('rag-') || id.startsWith('p8-')) return 'rag';
  if (id.startsWith('agent-') || id.startsWith('p9-')) return 'agents';
  if (id.startsWith('mlops-') || id.startsWith('p10-')) return 'mlops';
  if (id.startsWith('deployment-') || id.startsWith('p11-')) return 'deployment';
  if (id.startsWith('phase-0-')) return 'phase-0';
  if (id.startsWith('module-')) return 'ml';
  return 'unknown';
}

/**
 * The exact lesson IDs belonging to the five allowed Module 0 courses.
 */
export const FREE_ALLOWED_LESSON_IDS = new Set<string>([
  // Machine Learning Module 0
  'ai-ml-dl-foundations',
  'ml-types-paradigms',
  'regression-vs-classification',
  'features-parameters-hyperparameters',
  'train-val-test-splits',
  'loss-functions-erm',
  'ml-workflow-lifecycle',

  // NumPy Module 0 (numpy-module-1)
  'numpy-m1-l1',
  'numpy-m1-l2',
  'numpy-m1-l3',
  'numpy-m1-l4',
  'numpy-m1-l5',
  'numpy-m1-l6',
  'numpy-m1-l7',
  'numpy-m1-l8',
  'numpy-m1-l9',
  'numpy-m1-l10',
  'numpy-m1-l11',
  'numpy-m1-l12',

  // Pandas Module 0 (pandas-module-1)
  'pandas-m1-l1',
  'pandas-m1-l2',
  'pandas-m1-l3',
  'pandas-m1-l4',
  'pandas-m1-l5',
  'pandas-m1-l6',
  'pandas-m1-l7',
  'pandas-m1-l8',
  'pandas-m1-l9',
  'pandas-m1-l10',
  'pandas-m1-l11',
  'pandas-m1-l12',

  // Python Module 0 (python-module-1)
  'py-fundamentals-execution-model',
  'py-fundamentals-variables',
  'py-fundamentals-operators',
  'py-fundamentals-type-casting',
  'py-fundamentals-strings',
  'py-fundamentals-console-io',
  'py-fundamentals-comments-style',
  'py-fundamentals-debugger',

  // Java Module 0 (java-module-1)
  'java-intro-history',
  'java-jdk-jre-jvm',
  'java-first-program',
  'java-anatomy-class',
  'java-compilation-execution',
  'java-variables-primitives',
  'java-type-casting',
  'java-operators',
  'java-scanner-input',
  'java-formatting-output',
]);

/**
 * Checks if a lesson ID belongs to the five free allowlisted modules.
 */
export function isFreeAllowedLesson(lessonId: string): boolean {
  if (!lessonId) return false;
  return FREE_ALLOWED_LESSON_IDS.has(lessonId.trim());
}

