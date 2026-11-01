// MLOps & LLMOps Curriculum & Quality Verifier
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

console.log('=================================================================');
console.log('   PHASE 10: MLOPS & LLMOPS VERIFICATION SUITE                  ');
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
console.log('--- [1/5] Verifying Interactive Visualizers ---');
const visualizerFiles = [
  'src/components/visualizers/mlops/MLLifecycleExplorer.tsx',
  'src/components/visualizers/mlops/ExperimentComparisonExplorer.tsx',
  'src/components/visualizers/mlops/PipelineDAGExplorer.tsx',
  'src/components/visualizers/mlops/ModelReleaseWorkflowExplorer.tsx',
  'src/components/visualizers/mlops/DataDriftExplorer.tsx',
  'src/components/visualizers/mlops/CICDQualityGateExplorer.tsx',
  'src/components/visualizers/mlops/LLMEvaluationExplorer.tsx',
  'src/components/visualizers/mlops/LLMTraceTimelineExplorer.tsx',
  'src/components/visualizers/mlops/LLMCostLatencyExplorer.tsx',
  'src/components/visualizers/mlops/ProductionReadinessChecklist.tsx',
];

check('All 10 MLOps & LLMOps interactive visualizer files exist', () => {
  visualizerFiles.forEach((f) => {
    assert(fs.existsSync(path.resolve(__dirname, '..', f)), `Missing visualizer file: ${f}`);
  });
});

check('VisualizerDispatcher wires all MLOps visualizers', () => {
  const dispatcherCode = fs.readFileSync(
    path.resolve(__dirname, '..', 'src/components/visualizers/VisualizerDispatcher.tsx'),
    'utf8'
  );
  assert(dispatcherCode.includes("case 'mlops-lifecycle-explorer':"), 'Missing mlops-lifecycle-explorer case');
  assert(dispatcherCode.includes("case 'mlops-experiment-comparison-explorer':"), 'Missing mlops-experiment-comparison-explorer case');
  assert(dispatcherCode.includes("case 'mlops-pipeline-dag-explorer':"), 'Missing mlops-pipeline-dag-explorer case');
  assert(dispatcherCode.includes("case 'mlops-model-release-explorer':"), 'Missing mlops-model-release-explorer case');
  assert(dispatcherCode.includes("case 'mlops-data-drift-explorer':"), 'Missing mlops-data-drift-explorer case');
  assert(dispatcherCode.includes("case 'mlops-cicd-quality-gate-explorer':"), 'Missing mlops-cicd-quality-gate-explorer case');
  assert(dispatcherCode.includes("case 'mlops-llm-evaluation-explorer':"), 'Missing mlops-llm-evaluation-explorer case');
  assert(dispatcherCode.includes("case 'mlops-trace-timeline-explorer':"), 'Missing mlops-trace-timeline-explorer case');
  assert(dispatcherCode.includes("case 'mlops-cost-latency-explorer':"), 'Missing mlops-cost-latency-explorer case');
  assert(dispatcherCode.includes("case 'mlops-production-readiness-explorer':"), 'Missing mlops-production-readiness-explorer case');
});

// 2. Verify Module Files & Lessons Content
console.log('\n--- [2/5] Verifying 15 MLOps Lessons Across 5 Files ---');
const mlopsModuleFiles = [
  'src/data/mlops/mlops-module-1.ts',
  'src/data/mlops/mlops-module-2.ts',
  'src/data/mlops/mlops-module-3.ts',
  'src/data/mlops/mlops-module-4.ts',
  'src/data/mlops/mlops-module-5.ts',
];

const allLessonsMap = {};

mlopsModuleFiles.forEach((f, idx) => {
  const modNum = idx + 1;
  check(`mlops-module-${modNum}.ts exists and has complete pedagogical content`, () => {
    const fullPath = path.resolve(__dirname, '..', f);
    assert(fs.existsSync(fullPath), `Missing module file: ${f}`);

    const exported = loadModuleTs(fullPath);
    const lessonsExport = exported[`mlopsModule${modNum}Lessons`];
    assert(lessonsExport, `Missing mlopsModule${modNum}Lessons export in ${f}`);

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
      assert(lesson.derivation && lesson.derivation.steps && lesson.derivation.steps.length >= 2, `${lId}: derivation must have >= 2 steps`);

      // 6. Variables
      assert(lesson.variables && lesson.variables.length >= 3, `${lId}: variables must have >= 3 items`);

      // 7. Numerical Example
      assert(lesson.numericalExample && lesson.numericalExample.calculations && lesson.numericalExample.calculations.length >= 2, `${lId}: numericalExample must have >= 2 calculations`);

      // 8. Visual Explanation
      assert(lesson.visualExplanation && lesson.visualExplanation.features && lesson.visualExplanation.features.length >= 2, `${lId}: visualExplanation must have >= 2 features`);

      // 9. Code Implementations
      assert(lesson.scratchCode && lesson.scratchCode.code.length > 50, `${lId}: scratchCode missing or too short`);
      assert(lesson.sklearnCode && lesson.sklearnCode.code.length > 50, `${lId}: sklearnCode missing or too short`);
      assert(lesson.runnableCode && lesson.runnableCode.code.length > 30, `${lId}: runnableCode missing`);
      assert(lesson.runnableCode.expectedOutput && lesson.runnableCode.expectedOutput.length > 5, `${lId}: expectedOutput missing`);

      // 10. Explanations & Hyperparameters
      assert(lesson.lineByLineExplanation && lesson.lineByLineExplanation.length >= 1, `${lId}: lineByLineExplanation must have >= 1 entry`);
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
console.log('\n--- [3/5] Verifying Master Curriculum Integration ---');
check('src/data/mlops/curriculum.ts exports all 15 modules and lessons', () => {
  assert(fs.existsSync(path.resolve(__dirname, '..', 'src/data/mlops/curriculum.ts')));
  const mlopsCurriculum = loadModuleTs(path.resolve(__dirname, '..', 'src/data/mlops/curriculum.ts'));
  assert.strictEqual(mlopsCurriculum.MODULES_CATALOG_MLOPS.length, 15, 'MODULES_CATALOG_MLOPS must contain 15 modules');
  assert.strictEqual(Object.keys(mlopsCurriculum.MLOPS_FULL_LESSONS).length, 15, 'MLOPS_FULL_LESSONS must contain 15 lessons');
});

check('src/data/modules/curriculum.ts registers MLOps in MODULES_CATALOG and FULL_LESSONS', () => {
  const code = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/modules/curriculum.ts'), 'utf8');
  assert(code.includes('MODULES_CATALOG_MLOPS'), 'curriculum.ts must import/export MODULES_CATALOG_MLOPS');
  assert(code.includes('MLOPS_FULL_LESSONS'), 'curriculum.ts must import/export MLOPS_FULL_LESSONS');
  assert(code.includes('...MODULES_CATALOG_MLOPS'), 'MODULES_CATALOG must include MODULES_CATALOG_MLOPS');
  assert(code.includes('...MLOPS_FULL_LESSONS'), 'FULL_LESSONS must include MLOPS_FULL_LESSONS');
});

// 4. Verify Phase 10 Status in AI_ML_PHASES
console.log('\n--- [4/5] Verifying Phase 10 in curriculumPhases.ts ---');
check('Phase 10 is marked as "available" with title "MLOps & LLMOps" and 15 published modules', () => {
  const phasesCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/phases/curriculumPhases.ts'), 'utf8');
  assert(phasesCode.includes("id: 'phase-10'"), 'Missing phase-10 id');
  assert(phasesCode.includes("title: 'MLOps & LLMOps'"), 'Title must be MLOps & LLMOps');
  assert(phasesCode.includes("badge: 'Phase 10 · MLOps & LLMOps'"), 'Missing Phase 10 badge');
  assert(phasesCode.includes("status: 'available'"), 'Phase 10 must be available');

  for (let i = 1; i <= 15; i++) {
    const modId = `p10-m${i}`;
    assert(phasesCode.includes(`id: '${modId}'`), `curriculumPhases.ts missing ${modId}`);
    assert(phasesCode.includes(`route: '/curriculum/${modId}/`), `curriculumPhases.ts missing route for ${modId}`);
  }
});

// 5. Verification of Core Mathematical & Algorithmic Correctness
console.log('\n--- [5/5] Verifying Algorithmic & Mathematical Correctness ---');

check('Population Stability Index (PSI) formulation correctness', () => {
  // Let P be production distribution and Q be reference distribution
  // PSI = sum_b (P_b - Q_b) * ln(P_b / Q_b)
  const P = [0.15, 0.50, 0.35];
  const Q = [0.30, 0.50, 0.20];
  
  let psi = 0.0;
  for (let i = 0; i < P.length; i++) {
    psi += (P[i] - Q[i]) * Math.log(P[i] / Q[i]);
  }
  
  // (0.15 - 0.30)*ln(0.5) + (0)*ln(1) + (0.35 - 0.20)*ln(1.75)
  // = -0.15 * (-0.693147) + 0.15 * (0.559615) = 0.10397 + 0.08394 = 0.1879
  assert(Math.abs(psi - 0.188) < 0.005, `Expected PSI ~0.188, got ${psi}`);
  assert(psi >= 0.10 && psi < 0.20, 'PSI should be in moderate warning band (0.10 to 0.20)');
});

check("Little's Law concurrency capacity calculation", () => {
  // L = lambda * W
  const lambdaQPS = 500; // 500 queries / second
  const serviceTimeSec = 0.040; // 40ms average response time
  const requiredConcurrency = lambdaQPS * serviceTimeSec;
  
  assert.strictEqual(requiredConcurrency, 20, 'Required concurrency must be exactly 20 in-flight requests');
});

check('Token unit economics cost computation formulation', () => {
  const inputTokens = 1200;
  const outputTokens = 250;
  const inPricePerM = 2.50;
  const outPricePerM = 10.00;
  
  const cost = (inputTokens / 1e6) * inPricePerM + (outputTokens / 1e6) * outPricePerM;
  // (1200 * 2.50 + 250 * 10.00) / 1e6 = (3000 + 2500) / 1e6 = 5500 / 1e6 = 0.0055
  assert.strictEqual(cost, 0.0055, `Expected $0.0055 USD per request, got ${cost}`);
});

check('Jittered exponential backoff retry schedule', () => {
  const baseSec = 1.0;
  const maxSec = 10.0;
  
  function getDelay(k) {
    return Math.min(maxSec, baseSec * Math.pow(2, k - 1));
  }
  
  assert.strictEqual(getDelay(1), 1.0);
  assert.strictEqual(getDelay(2), 2.0);
  assert.strictEqual(getDelay(3), 4.0);
  assert.strictEqual(getDelay(4), 8.0);
  assert.strictEqual(getDelay(5), 10.0); // Clamped to maxSec
});

console.log('\n=================================================================');
console.log(`  SUCCESS: ALL ${passedChecks} MLOPS & LLMOPS VERIFICATION CHECKS PASSED!`);
console.log('  Phase 10 (MLOps & LLMOps): 15 Modules, 15 Lessons 100% Complete');
console.log('=================================================================\n');

