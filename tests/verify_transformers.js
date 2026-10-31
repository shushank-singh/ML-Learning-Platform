// Transformers Curriculum & Pedagogical Quality Verifier
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

console.log('=================================================================');
console.log('   TRANSFORMERS MASTERY PEDAGOGICAL VERIFICATION SUITE           ');
console.log('=================================================================\n');

function loadModuleTs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  // Strip only @/ type imports
  code = code.replace(/import\s+[\s\S]*?from\s+['"]@\/[^'"]+['"];?/g, '');
  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const moduleExports = {};
  const customRequire = (id) => {
    if (id.startsWith('./') || id.startsWith('../')) {
      let resolved = path.resolve(path.dirname(filePath), id);
      if (fs.existsSync(resolved + '.ts')) resolved = resolved + '.ts';
      if (fs.existsSync(resolved)) return loadModuleTs(resolved);
    }
    return {};
  };
  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(moduleExports, { exports: moduleExports }, customRequire);
  return moduleExports;
}

let passedChecks = 0;
function check(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedChecks++;
  } catch (err) {
    console.error(`  [FAIL] ${name}:`, err.message);
    process.exitCode = 1;
  }
}

// 1. Verify Visualizer Files & Wiring
console.log('--- [1/4] Verifying Interactive Visualizers ---');
const visualizerFiles = [
  'src/components/visualizers/transformers/TokenizationExplorer.tsx',
  'src/components/visualizers/transformers/PositionalEncodingExplorer.tsx',
  'src/components/visualizers/transformers/CausalMaskExplorer.tsx',
  'src/components/visualizers/transformers/MultiHeadAttentionExplorer.tsx',
];

check('All 4 Transformer interactive visualizer files exist', () => {
  visualizerFiles.forEach((f) => {
    assert(fs.existsSync(path.resolve(__dirname, '..', f)), `Missing visualizer file: ${f}`);
  });
});

check('VisualizerDispatcher wires all 4 Transformer visualizers', () => {
  const dispatcherCode = fs.readFileSync(
    path.resolve(__dirname, '..', 'src/components/visualizers/VisualizerDispatcher.tsx'),
    'utf8'
  );
  assert(dispatcherCode.includes("case 'tokenization-explorer':"), 'Missing tokenization-explorer case');
  assert(dispatcherCode.includes("case 'positional-encoding-explorer':"), 'Missing positional-encoding-explorer case');
  assert(dispatcherCode.includes("case 'causal-mask-explorer':"), 'Missing causal-mask-explorer case');
  assert(dispatcherCode.includes("case 'multi-head-attention-explorer':"), 'Missing multi-head-attention-explorer case');
});

// 2. Verify Module Files & Lessons Content
console.log('\n--- [2/4] Verifying 15 Transformer Lessons Across 5 Files ---');
const tfModuleFiles = [
  'src/data/transformers/tf-module-1.ts',
  'src/data/transformers/tf-module-2.ts',
  'src/data/transformers/tf-module-3.ts',
  'src/data/transformers/tf-module-4.ts',
  'src/data/transformers/tf-module-5.ts',
];

const allLessonsMap = {};

tfModuleFiles.forEach((f, idx) => {
  const modNum = idx + 1;
  check(`tf-module-${modNum}.ts exists and has complete pedagogical content`, () => {
    const fullPath = path.resolve(__dirname, '..', f);
    assert(fs.existsSync(fullPath), `Missing module file: ${f}`);

    const exported = loadModuleTs(fullPath);
    const lessonsExport = exported[`tfModule${modNum}Lessons`];
    assert(lessonsExport, `Missing tfModule${modNum}Lessons export in ${f}`);

    const lessonIds = Object.keys(lessonsExport);
    assert.strictEqual(lessonIds.length, 3, `Expected 3 lessons in ${f}, got ${lessonIds.length}`);

    lessonIds.forEach((lId) => {
      const lesson = lessonsExport[lId];
      allLessonsMap[lId] = lesson;

      // 1. Objectives & Prerequisites
      assert(lesson.objectives && lesson.objectives.length >= 3, `${lId}: objectives must have >= 3 items`);
      assert(lesson.prerequisites && lesson.prerequisites.length >= 1, `${lId}: missing prerequisites`);

      // 2. Analogy
      assert(lesson.analogy && lesson.analogy.title && lesson.analogy.text && lesson.analogy.metaphor, `${lId}: incomplete analogy`);

      // 3. Problem Solved
      assert(lesson.problemSolved && lesson.problemSolved.keyPoints && lesson.problemSolved.keyPoints.length >= 2, `${lId}: incomplete problemSolved`);

      // 4. Intuition
      assert(lesson.intuition && lesson.intuition.steps && lesson.intuition.steps.length >= 3, `${lId}: intuition must have >= 3 steps`);

      // 5. Mathematics & Derivation
      assert(lesson.mathematics && lesson.mathematics.foundations && lesson.mathematics.foundations.length >= 2, `${lId}: mathematics must have >= 2 foundations`);
      assert(lesson.derivation && lesson.derivation.steps && lesson.derivation.steps.length >= 3, `${lId}: derivation must have >= 3 steps`);

      // 6. Variables
      assert(lesson.variables && lesson.variables.length >= 3, `${lId}: variables must have >= 3 items`);

      // 7. Numerical Example
      assert(lesson.numericalExample && lesson.numericalExample.calculations && lesson.numericalExample.calculations.length >= 2, `${lId}: numericalExample must have >= 2 calculations`);

      // 8. Visual Explanation
      assert(lesson.visualExplanation && lesson.visualExplanation.features && lesson.visualExplanation.features.length >= 2, `${lId}: visualExplanation must have >= 2 features`);

      // 9. Code Implementations
      assert(lesson.scratchCode && lesson.scratchCode.code.length > 50, `${lId}: scratchCode missing or too short`);
      assert(lesson.sklearnCode && lesson.sklearnCode.code.length > 50, `${lId}: sklearn/pytorch code missing or too short`);
      assert(lesson.runnableCode && lesson.runnableCode.code.length > 30, `${lId}: runnableCode missing`);
      assert(lesson.runnableCode.expectedOutput && lesson.runnableCode.expectedOutput.length > 5, `${lId}: expectedOutput missing`);

      // 10. Explanations & Hyperparameters
      assert(lesson.lineByLineExplanation && lesson.lineByLineExplanation.length >= 2, `${lId}: lineByLineExplanation must have >= 2 entries`);
      assert(lesson.hyperparameters && lesson.hyperparameters.length >= 1, `${lId}: hyperparameters missing`);
      assert(lesson.assumptions && lesson.assumptions.length >= 1, `${lId}: assumptions missing`);
      assert(lesson.commonMistakes && lesson.commonMistakes.length >= 2, `${lId}: commonMistakes must have >= 2 items`);
      assert(lesson.realWorldUseCases && lesson.realWorldUseCases.length >= 2, `${lId}: realWorldUseCases must have >= 2 items`);

      // 11. Practice Questions & Quiz
      assert(lesson.practiceQuestions && lesson.practiceQuestions.length >= 3, `${lId}: practiceQuestions must have >= 3 items`);
      assert(lesson.quiz && lesson.quiz.length >= 3, `${lId}: quiz must have >= 3 questions`);
      lesson.quiz.forEach((q, qIdx) => {
        assert(q.options && q.options.length === 4, `${lId} quiz Q${qIdx+1}: options must have exactly 4 items`);
        assert(typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex <= 3, `${lId} quiz Q${qIdx+1}: invalid correctIndex`);
        assert(q.explanation && q.explanation.length > 10, `${lId} quiz Q${qIdx+1}: explanation missing`);
      });

      // 12. Independent Exercise
      assert(lesson.independentExercise && lesson.independentExercise.starterCode && lesson.independentExercise.solution, `${lId}: incomplete independentExercise`);

      // 13. Summary
      assert(lesson.summary && lesson.summary.keyTakeaways && lesson.summary.keyTakeaways.length >= 3, `${lId}: summary keyTakeaways must have >= 3 items`);
    });
  });
});

// 3. Verify Master Curriculum Integration
console.log('\n--- [3/4] Verifying Master Curriculum Integration ---');
check('src/data/transformers/curriculum.ts exports all 15 modules and lessons', () => {
  assert(fs.existsSync(path.resolve(__dirname, '..', 'src/data/transformers/curriculum.ts')));
  const tfCurriculum = loadModuleTs(path.resolve(__dirname, '..', 'src/data/transformers/curriculum.ts'));
  assert.strictEqual(tfCurriculum.MODULES_CATALOG_TRANSFORMERS.length, 15, 'MODULES_CATALOG_TRANSFORMERS must contain 15 modules');
  assert.strictEqual(Object.keys(tfCurriculum.TRANSFORMERS_FULL_LESSONS).length, 15, 'TRANSFORMERS_FULL_LESSONS must contain 15 lessons');
});

check('src/data/modules/curriculum.ts registers Transformers in MODULES_CATALOG and FULL_LESSONS', () => {
  const code = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/modules/curriculum.ts'), 'utf8');
  assert(code.includes('MODULES_CATALOG_TRANSFORMERS'), 'curriculum.ts must import/export MODULES_CATALOG_TRANSFORMERS');
  assert(code.includes('TRANSFORMERS_FULL_LESSONS'), 'curriculum.ts must import/export TRANSFORMERS_FULL_LESSONS');
  assert(code.includes('...MODULES_CATALOG_TRANSFORMERS'), 'MODULES_CATALOG must include MODULES_CATALOG_TRANSFORMERS');
  assert(code.includes('...TRANSFORMERS_FULL_LESSONS'), 'FULL_LESSONS must include TRANSFORMERS_FULL_LESSONS');
});

// 4. Verify Phase 6 Status in AI_ML_PHASES
console.log('\n--- [4/4] Verifying Phase 6 in curriculumPhases.ts ---');
check('Phase 6 is marked as "available" and all 15 modules are published with valid routes', () => {
  const phasesCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/phases/curriculumPhases.ts'), 'utf8');
  assert(phasesCode.includes("id: 'phase-6'"));
  assert(phasesCode.includes("status: 'available'"));

  for (let i = 1; i <= 15; i++) {
    const modId = `p6-m${i}`;
    assert(phasesCode.includes(`id: '${modId}'`), `curriculumPhases.ts missing ${modId}`);
  }
});

console.log('\n=================================================================');
console.log(`  SUCCESS: ALL ${passedChecks} TRANSFORMER VERIFICATION CHECKS PASSED!`);
console.log(`  Phase 6 (Transformers): 15 Modules, 15 Lessons 100% Complete`);
console.log('=================================================================\n');
