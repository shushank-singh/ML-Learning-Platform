// Automated Verification Script for ML Mastery Lab
const assert = require('assert');

console.log('--- Starting ML Mastery Lab Automated Validation Suite ---');

// 1. Verify Project Directory Structure
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/app/page.tsx',
  'src/app/curriculum/page.tsx',
  'src/app/curriculum/[moduleId]/page.tsx',
  'src/app/curriculum/[moduleId]/[lessonId]/page.tsx',
  'src/app/playground/page.tsx',
  'src/app/code-lab/page.tsx',
  'src/app/formulas/page.tsx',
  'src/app/quizzes/page.tsx',
  'src/app/projects/page.tsx',
  'src/app/projects/[projectId]/page.tsx',
  'src/app/notes/page.tsx',
  'src/app/analytics/page.tsx',
  'src/app/settings/page.tsx',
  'src/components/lessons/LessonView.tsx',
  'src/components/visualizers/LinearRegressionVisualizer.tsx',
  'src/components/visualizers/GradientDescentVisualizer.tsx',
  'src/components/visualizers/LogisticBoundaryVisualizer.tsx',
  'src/components/visualizers/KMeansVisualizer.tsx',
  'src/components/visualizers/MetricsRocVisualizer.tsx',
  'src/components/code/CodeRunner.tsx',
  'src/components/math/Math.tsx',
  'src/lib/types.ts',
  'src/lib/storage.ts',
  'src/lib/pyodide.ts',
  'src/data/modules/linearRegressionLesson.ts',
  'src/data/modules/logisticRegressionLesson.ts',
  'src/data/modules/curriculum.ts',
  'src/data/formulas/formulas.ts',
  'src/data/projects/projects.ts',
];

let missing = 0;
requiredFiles.forEach((file) => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] Missing expected file: ${file}`);
    missing++;
  } else {
    console.log(`[PASS] Verified: ${file}`);
  }
});

assert.strictEqual(missing, 0, `Validation failed: ${missing} files missing.`);

console.log('\n--- Checking 20-Section Lesson Template Completeness ---');
const lessonFile = fs.readFileSync(
  path.join(__dirname, '..', 'src/data/modules/linearRegressionLesson.ts'),
  'utf8'
);

const expectedSections = [
  'analogy',
  'problemSolved',
  'intuition',
  'mathematics',
  'derivation',
  'variables',
  'numericalExample',
  'visualExplanation',
  'scratchCode',
  'sklearnCode',
  'runnableCode',
  'lineByLineExplanation',
  'hyperparameters',
  'assumptions',
  'commonMistakes',
  'realWorldUseCases',
  'practiceQuestions',
  'quiz',
  'independentExercise',
  'summary',
];

expectedSections.forEach((sec, idx) => {
  assert(
    lessonFile.includes(sec),
    `Missing section ${idx + 1}: ${sec} in linearRegressionLesson.ts`
  );
  console.log(`[PASS] Verified Section ${idx + 1}: ${sec}`);
});

console.log('\nAll 20 pedagogical sections verified successfully in Reference Lesson!');
console.log('--- All System Checks Passed ---');
