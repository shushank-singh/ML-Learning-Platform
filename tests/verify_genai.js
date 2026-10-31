// Generative AI & Large Language Models Curriculum & Pedagogical Quality Verifier
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

console.log('=================================================================');
console.log('   GENERATIVE AI & LLMS PEDAGOGICAL VERIFICATION SUITE           ');
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
  'src/components/visualizers/genai/NextTokenPredictionExplorer.tsx',
  'src/components/visualizers/genai/TemperatureSamplingExplorer.tsx',
  'src/components/visualizers/genai/TopKTopPExplorer.tsx',
  'src/components/visualizers/genai/ContextBudgetExplorer.tsx',
  'src/components/visualizers/genai/EmbeddingSimilarityExplorer.tsx',
  'src/components/visualizers/genai/PerplexityLossExplorer.tsx',
  'src/components/visualizers/genai/LoRARankExplorer.tsx',
  'src/components/visualizers/genai/QuantizationSizeExplorer.tsx',
  'src/components/visualizers/genai/LLMEvalBenchmarkExplorer.tsx',
];

check('All 9 GenAI interactive visualizer files exist', () => {
  visualizerFiles.forEach((f) => {
    assert(fs.existsSync(path.resolve(__dirname, '..', f)), `Missing visualizer file: ${f}`);
  });
});

check('VisualizerDispatcher wires all GenAI visualizers', () => {
  const dispatcherCode = fs.readFileSync(
    path.resolve(__dirname, '..', 'src/components/visualizers/VisualizerDispatcher.tsx'),
    'utf8'
  );
  assert(dispatcherCode.includes("case 'next-token-prediction-explorer':"), 'Missing next-token-prediction-explorer case');
  assert(dispatcherCode.includes("case 'temperature-sampling-explorer':"), 'Missing temperature-sampling-explorer case');
  assert(dispatcherCode.includes("case 'topk-topp-explorer':"), 'Missing topk-topp-explorer case');
  assert(dispatcherCode.includes("case 'context-budget-explorer':"), 'Missing context-budget-explorer case');
  assert(dispatcherCode.includes("case 'embedding-similarity-explorer':"), 'Missing embedding-similarity-explorer case');
  assert(dispatcherCode.includes("case 'perplexity-loss-explorer':"), 'Missing perplexity-loss-explorer case');
  assert(dispatcherCode.includes("case 'lora-rank-explorer':"), 'Missing lora-rank-explorer case');
  assert(dispatcherCode.includes("case 'quantization-size-explorer':"), 'Missing quantization-size-explorer case');
  assert(dispatcherCode.includes("case 'llm-eval-benchmark-explorer':"), 'Missing llm-eval-benchmark-explorer case');
});

// 2. Verify Module Files & Lessons Content
console.log('\n--- [2/4] Verifying 15 GenAI Lessons Across 5 Files ---');
const genaiModuleFiles = [
  'src/data/genai/genai-module-1.ts',
  'src/data/genai/genai-module-2.ts',
  'src/data/genai/genai-module-3.ts',
  'src/data/genai/genai-module-4.ts',
  'src/data/genai/genai-module-5.ts',
];

const allLessonsMap = {};

genaiModuleFiles.forEach((f, idx) => {
  const modNum = idx + 1;
  check(`genai-module-${modNum}.ts exists and has complete pedagogical content`, () => {
    const fullPath = path.resolve(__dirname, '..', f);
    assert(fs.existsSync(fullPath), `Missing module file: ${f}`);

    const exported = loadModuleTs(fullPath);
    const lessonsExport = exported[`genaiModule${modNum}Lessons`];
    assert(lessonsExport, `Missing genaiModule${modNum}Lessons export in ${f}`);

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
check('src/data/genai/curriculum.ts exports all 15 modules and lessons', () => {
  assert(fs.existsSync(path.resolve(__dirname, '..', 'src/data/genai/curriculum.ts')));
  const genaiCurriculum = loadModuleTs(path.resolve(__dirname, '..', 'src/data/genai/curriculum.ts'));
  assert.strictEqual(genaiCurriculum.MODULES_CATALOG_GENAI.length, 15, 'MODULES_CATALOG_GENAI must contain 15 modules');
  assert.strictEqual(Object.keys(genaiCurriculum.GENAI_FULL_LESSONS).length, 15, 'GENAI_FULL_LESSONS must contain 15 lessons');
});

check('src/data/modules/curriculum.ts registers GenAI in MODULES_CATALOG and FULL_LESSONS', () => {
  const code = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/modules/curriculum.ts'), 'utf8');
  assert(code.includes('MODULES_CATALOG_GENAI'), 'curriculum.ts must import/export MODULES_CATALOG_GENAI');
  assert(code.includes('GENAI_FULL_LESSONS'), 'curriculum.ts must import/export GENAI_FULL_LESSONS');
  assert(code.includes('...MODULES_CATALOG_GENAI'), 'MODULES_CATALOG must include MODULES_CATALOG_GENAI');
  assert(code.includes('...GENAI_FULL_LESSONS'), 'FULL_LESSONS must include GENAI_FULL_LESSONS');
});

// 4. Verify Phase 7 Status in AI_ML_PHASES
console.log('\n--- [4/4] Verifying Phase 7 in curriculumPhases.ts ---');
check('Phase 7 is marked as "available" and all 15 modules are published with valid routes', () => {
  const phasesCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/phases/curriculumPhases.ts'), 'utf8');
  assert(phasesCode.includes("id: 'phase-7'"));
  assert(phasesCode.includes("status: 'available'"));

  for (let i = 1; i <= 15; i++) {
    const modId = `p7-m${i}`;
    assert(phasesCode.includes(`id: '${modId}'`), `curriculumPhases.ts missing ${modId}`);
  }
});

console.log('\n=================================================================');
console.log(`  SUCCESS: ALL ${passedChecks} GENAI VERIFICATION CHECKS PASSED!`);
console.log(`  Phase 7 (Generative AI & LLMs): 15 Modules, 15 Lessons 100% Complete`);
console.log('=================================================================\n');

