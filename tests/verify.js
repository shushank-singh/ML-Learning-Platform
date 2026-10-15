// Automated Verification Suite for ML Mastery Lab
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

console.log('=================================================================');
console.log('     ML MASTERY LAB — FULL CURRICULUM & ARCHITECTURE VERIFIER    ');
console.log('=================================================================\n');

// 1. Verify Project Directory Structure
console.log('--- [1/5] Verifying Core Files & Visualizers ---');
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
  'src/components/visualizers/VisualizerDispatcher.tsx',
  'src/components/visualizers/LinearRegressionVisualizer.tsx',
  'src/components/visualizers/GradientDescentVisualizer.tsx',
  'src/components/visualizers/LogisticBoundaryVisualizer.tsx',
  'src/components/visualizers/DecisionTreeVisualizer.tsx',
  'src/components/visualizers/KNNVisualizer.tsx',
  'src/components/visualizers/KMeansVisualizer.tsx',
  'src/components/visualizers/MetricsRocVisualizer.tsx',
  'src/components/visualizers/PCAVisualizer.tsx',
  'src/components/visualizers/NeuralNetVisualizer.tsx',
  'src/components/code/CodeRunner.tsx',
  'src/components/math/Math.tsx',
  'src/lib/types.ts',
  'src/lib/storage.ts',
  'src/lib/pyodide.ts',
  'src/data/modules/curriculum.ts',
  'src/data/formulas/formulas.ts',
  'src/data/projects/projects.ts',
  'src/data/modules/module0.ts',
  'src/data/modules/module1.ts',
  'src/data/modules/module2.ts',
  'src/data/modules/module3.ts',
  'src/data/modules/module4.ts',
  'src/data/modules/module5.ts',
  'src/data/modules/module6.ts',
  'src/data/modules/module7.ts',
  'src/data/modules/module8.ts',
  'src/data/modules/module9.ts',
  'src/data/modules/module10.ts',
  'src/data/modules/module11.ts',
];

let missing = 0;
requiredFiles.forEach((file) => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`  [FAIL] Missing expected file: ${file}`);
    missing++;
  }
});
assert.strictEqual(missing, 0, `Validation failed: ${missing} files missing.`);
console.log(`  [PASS] All ${requiredFiles.length} required project and module files exist.`);

// 2. Verify VisualizerDispatcher
console.log('\n--- [2/5] Verifying VisualizerDispatcher ---');
const visualizerCode = fs.readFileSync(
  path.join(__dirname, '..', 'src/components/visualizers/VisualizerDispatcher.tsx'),
  'utf8'
);
assert(
  visualizerCode.includes("case 'neural-net':"),
  'VisualizerDispatcher is missing neural-net case'
);
assert(
  visualizerCode.includes('NeuralNetVisualizer'),
  'VisualizerDispatcher is missing NeuralNetVisualizer import or element'
);
assert(
  visualizerCode.includes("case 'none':\n    default:\n      return null;") ||
  visualizerCode.includes('default:\n      return null;') ||
  visualizerCode.includes('default: return null;'),
  'VisualizerDispatcher default should return null (no fallback to linear regression)'
);
console.log('  [PASS] VisualizerDispatcher correctly wires neural-net and defaults to null.');

// 3. Verify Master Curriculum Configuration
console.log('\n--- [3/5] Verifying Master Curriculum & Zero Generic Fallback ---');
const curriculumCode = fs.readFileSync(
  path.join(__dirname, '..', 'src/data/modules/curriculum.ts'),
  'utf8'
);

assert(
  !curriculumCode.includes('generateGenericLesson'),
  'FAIL: curriculum.ts still contains generateGenericLesson! All lessons must be unique and authored.'
);
assert(
  !curriculumCode.includes('generateGeneric'),
  'FAIL: curriculum.ts contains generateGeneric references.'
);

for (let i = 0; i <= 11; i++) {
  assert(
    curriculumCode.includes(`module${i}Data`),
    `curriculum.ts missing module${i}Data`
  );
  assert(
    curriculumCode.includes(`module${i}Lessons`),
    `curriculum.ts missing module${i}Lessons`
  );
}
console.log('  [PASS] curriculum.ts cleanly registers modules 0-11 with zero generic fallback generators.');

// 4. In-Depth Module and Lesson Inspection
console.log('\n--- [4/5] In-Depth Pedagogical 20-Section Validation ---');

function loadModuleTs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  // Strip only type imports from '@/...'
  code = code.replace(/import\s+[\s\S]*?from\s+['"]@\/[^'"]+['"];?/g, '');
  const res = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const m = { exports: {} };
  const customRequire = (id) => {
    if (id.startsWith('./') || id.startsWith('../')) {
      const resolved = path.resolve(path.dirname(filePath), id);
      const withTs = fs.existsSync(resolved + '.ts') ? resolved + '.ts' : resolved;
      return loadModuleTs(withTs);
    }
    return require(id);
  };
  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(m.exports, m, customRequire);
  return m.exports;
}

const REQUIRED_SECTIONS = [
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

let totalLessonsCount = 0;
const lessonIdSet = new Set();

for (let mIdx = 0; mIdx <= 11; mIdx++) {
  const modFile = path.join(__dirname, '..', `src/data/modules/module${mIdx}.ts`);
  const modExports = loadModuleTs(modFile);

  const modDataKey = `module${mIdx}Data`;
  const modLessonsKey = `module${mIdx}Lessons`;

  assert(modExports[modDataKey], `Missing ${modDataKey} export in module${mIdx}.ts`);
  assert(modExports[modLessonsKey], `Missing ${modLessonsKey} export in module${mIdx}.ts`);

  const modData = modExports[modDataKey];
  const modLessons = modExports[modLessonsKey];

  assert(modData.id, `Module ${mIdx} missing id`);
  assert(modData.title, `Module ${mIdx} missing title`);
  assert(Array.isArray(modData.lessons), `Module ${mIdx} lessons must be an array`);

  const lessonSummaries = modData.lessons;
  const lessonKeys = Object.keys(modLessons);

  assert.strictEqual(
    lessonSummaries.length,
    lessonKeys.length,
    `Module ${mIdx}: lesson summaries count (${lessonSummaries.length}) does not match moduleLessons keys (${lessonKeys.length})`
  );

  assert.strictEqual(
    modData.topicsCount,
    lessonSummaries.length,
    `Module ${mIdx}: topicsCount (${modData.topicsCount}) does not match summaries length (${lessonSummaries.length})`
  );

  console.log(`  Checking Module ${mIdx}: "${modData.title}" (${lessonKeys.length} lessons)...`);

  lessonKeys.forEach((lessonId) => {
    assert(!lessonIdSet.has(lessonId), `Duplicate lesson ID detected across curriculum: ${lessonId}`);
    lessonIdSet.add(lessonId);
    totalLessonsCount++;

    const lesson = modLessons[lessonId];
    assert.strictEqual(lesson.id, lessonId, `Lesson id mismatch: ${lesson.id} vs ${lessonId}`);
    assert(lesson.title && lesson.title.length > 0, `Lesson ${lessonId} missing title`);

    // Verify all 20 sections are present
    REQUIRED_SECTIONS.forEach((sec) => {
      assert(lesson[sec] !== undefined, `Lesson ${lessonId} missing required section: ${sec}`);
    });

    // 1. Analogy
    assert(
      lesson.analogy.title && lesson.analogy.text && lesson.analogy.metaphor,
      `Lesson ${lessonId} analogy must have title, text, and metaphor`
    );

    // 2. Problem Solved
    assert(
      lesson.problemSolved.title && lesson.problemSolved.description && Array.isArray(lesson.problemSolved.keyPoints),
      `Lesson ${lessonId} problemSolved must have title, description, and keyPoints`
    );

    // 3. Intuition
    assert(
      lesson.intuition.overview && Array.isArray(lesson.intuition.steps),
      `Lesson ${lessonId} intuition must have overview and steps array`
    );

    // 4. Mathematics
    assert(
      lesson.mathematics.overview && Array.isArray(lesson.mathematics.foundations),
      `Lesson ${lessonId} mathematics must have overview and foundations array`
    );

    // 5. Derivation
    assert(
      lesson.derivation.title && Array.isArray(lesson.derivation.steps),
      `Lesson ${lessonId} derivation must have title and steps array`
    );

    // 6. Variables
    assert(
      Array.isArray(lesson.variables) && lesson.variables.length >= 1,
      `Lesson ${lessonId} variables must be a non-empty array`
    );

    // 7. Numerical Example
    assert(
      lesson.numericalExample.scenario &&
      Array.isArray(lesson.numericalExample.calculations) &&
      lesson.numericalExample.finalConclusion,
      `Lesson ${lessonId} numericalExample missing scenario, calculations, or finalConclusion`
    );

    // 8. Visual Explanation
    assert(
      lesson.visualExplanation.title && lesson.visualExplanation.description,
      `Lesson ${lessonId} visualExplanation missing title or description`
    );

    // 9. Scratch Code
    assert(
      lesson.scratchCode.title && lesson.scratchCode.code && lesson.scratchCode.code.length > 20,
      `Lesson ${lessonId} scratchCode missing title or code`
    );

    // 10. Sklearn Code
    assert(
      lesson.sklearnCode.title && lesson.sklearnCode.code && lesson.sklearnCode.code.length > 20,
      `Lesson ${lessonId} sklearnCode missing title or code`
    );

    // 11. Runnable Code
    assert(
      lesson.runnableCode.code && lesson.runnableCode.expectedOutput,
      `Lesson ${lessonId} runnableCode missing code or expectedOutput`
    );

    // 12. Line By Line Explanation
    assert(
      Array.isArray(lesson.lineByLineExplanation) && lesson.lineByLineExplanation.length >= 1,
      `Lesson ${lessonId} lineByLineExplanation must have at least 1 item`
    );

    // 13. Hyperparameters
    assert(
      Array.isArray(lesson.hyperparameters) && lesson.hyperparameters.length >= 1,
      `Lesson ${lessonId} hyperparameters must have at least 1 item`
    );

    // 14. Assumptions
    assert(
      Array.isArray(lesson.assumptions) && lesson.assumptions.length >= 1,
      `Lesson ${lessonId} assumptions must have at least 1 item`
    );
    lesson.assumptions.forEach((a, i) => {
      assert(a.assumption && a.whyItMatters && a.howToVerify, `Lesson ${lessonId} assumption ${i} missing fields`);
    });

    // 15. Common Mistakes
    assert(
      Array.isArray(lesson.commonMistakes) && lesson.commonMistakes.length >= 1,
      `Lesson ${lessonId} commonMistakes must have at least 1 item`
    );

    // 16. Real World Use Cases
    assert(
      Array.isArray(lesson.realWorldUseCases) && lesson.realWorldUseCases.length >= 1,
      `Lesson ${lessonId} realWorldUseCases must have at least 1 item`
    );

    // 17. Practice Questions
    assert(
      Array.isArray(lesson.practiceQuestions) && lesson.practiceQuestions.length >= 1,
      `Lesson ${lessonId} practiceQuestions must have at least 1 item`
    );

    // 18. Quiz
    assert(
      Array.isArray(lesson.quiz) && lesson.quiz.length >= 1,
      `Lesson ${lessonId} quiz must have at least 1 item`
    );
    lesson.quiz.forEach((q, qIdx) => {
      assert.strictEqual(q.options.length, 4, `Lesson ${lessonId} quiz question ${qIdx + 1} must have 4 options`);
      assert(
        q.correctIndex >= 0 && q.correctIndex <= 3,
        `Lesson ${lessonId} quiz question ${qIdx + 1} correctIndex must be 0-3`
      );
      assert(q.explanation && q.explanation.length > 0, `Lesson ${lessonId} quiz question ${qIdx + 1} missing explanation`);
    });

    // 19. Independent Exercise
    assert(
      lesson.independentExercise.title &&
      lesson.independentExercise.starterCode &&
      lesson.independentExercise.solution,
      `Lesson ${lessonId} independentExercise missing required fields`
    );

    // 20. Summary
    assert(
      lesson.summary && Array.isArray(lesson.summary.keyTakeaways) && lesson.summary.keyTakeaways.length >= 1,
      `Lesson ${lessonId} summary must have keyTakeaways array`
    );
  });
}

// 5. Verify Total Curriculum Breadth
console.log('\n--- [5/5] Curriculum Totals & Sanity Checks ---');
console.log(`  Total verified unique lessons: ${totalLessonsCount}`);
assert.strictEqual(totalLessonsCount, 107, `Expected exactly 107 lessons across 12 modules, got ${totalLessonsCount}`);

console.log('\n=================================================================');
console.log('  SUCCESS: ALL 12 MODULES & 107 LESSONS VALIDATED (20/20 SECTIONS)');
console.log('  NO GENERIC FALLBACKS DETECTED. ALL ASSUMPTIONS & QUIZZES SOUND.');
console.log('=================================================================\n');
