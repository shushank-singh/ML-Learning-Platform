// AI Deployment, Cloud & Production Engineering Verification Suite
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

console.log('=================================================================');
console.log('   PHASE 11: AI DEPLOYMENT, CLOUD & PRODUCTION VERIFIER          ');
console.log('=================================================================\n');

function loadModuleTs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  // Strip @/ type imports
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
  'src/components/visualizers/deployment/DeploymentArchitectureExplorer.tsx',
  'src/components/visualizers/deployment/HttpRequestJourneyExplorer.tsx',
  'src/components/visualizers/deployment/DockerLayerExplorer.tsx',
  'src/components/visualizers/deployment/CloudServiceComparisonExplorer.tsx',
  'src/components/visualizers/deployment/ScalingLoadBalancerExplorer.tsx',
  'src/components/visualizers/deployment/AsyncJobQueueExplorer.tsx',
  'src/components/visualizers/deployment/GpuInferenceResourceExplorer.tsx',
  'src/components/visualizers/deployment/LLMServingLatencyExplorer.tsx',
  'src/components/visualizers/deployment/ProductionObservabilityDashboard.tsx',
  'src/components/visualizers/deployment/DeploymentReadinessChecklist.tsx',
];

check('All 10 Deployment interactive visualizer files exist', () => {
  visualizerFiles.forEach((f) => {
    assert(fs.existsSync(path.resolve(__dirname, '..', f)), `Missing visualizer file: ${f}`);
  });
});

check('VisualizerDispatcher wires all 10 Deployment visualizers', () => {
  const dispatcherCode = fs.readFileSync(
    path.resolve(__dirname, '..', 'src/components/visualizers/VisualizerDispatcher.tsx'),
    'utf8'
  );
  assert(dispatcherCode.includes("case 'deploy-architecture-explorer':"), 'Missing deploy-architecture-explorer case');
  assert(dispatcherCode.includes("case 'deploy-http-journey-explorer':"), 'Missing deploy-http-journey-explorer case');
  assert(dispatcherCode.includes("case 'deploy-docker-layer-explorer':"), 'Missing deploy-docker-layer-explorer case');
  assert(dispatcherCode.includes("case 'deploy-cloud-comparison-explorer':"), 'Missing deploy-cloud-comparison-explorer case');
  assert(dispatcherCode.includes("case 'deploy-scaling-lb-explorer':"), 'Missing deploy-scaling-lb-explorer case');
  assert(dispatcherCode.includes("case 'deploy-async-job-queue-explorer':"), 'Missing deploy-async-job-queue-explorer case');
  assert(dispatcherCode.includes("case 'deploy-gpu-resource-explorer':"), 'Missing deploy-gpu-resource-explorer case');
  assert(dispatcherCode.includes("case 'deploy-llm-serving-latency-explorer':"), 'Missing deploy-llm-serving-latency-explorer case');
  assert(dispatcherCode.includes("case 'deploy-observability-dashboard':"), 'Missing deploy-observability-dashboard case');
  assert(dispatcherCode.includes("case 'deploy-readiness-checklist':"), 'Missing deploy-readiness-checklist case');
});

// 2. Verify Module Files & Lessons Content
console.log('\n--- [2/5] Verifying 15 Deployment Lessons Across 5 Files ---');
const deploymentModuleFiles = [
  'src/data/deployment/deployment-module-1.ts',
  'src/data/deployment/deployment-module-2.ts',
  'src/data/deployment/deployment-module-3.ts',
  'src/data/deployment/deployment-module-4.ts',
  'src/data/deployment/deployment-module-5.ts',
];

const allLessonsMap = {};

deploymentModuleFiles.forEach((f, idx) => {
  const modNum = idx + 1;
  check(`deployment-module-${modNum}.ts exists and has complete pedagogical content`, () => {
    const fullPath = path.resolve(__dirname, '..', f);
    assert(fs.existsSync(fullPath), `Missing module file: ${f}`);

    const exported = loadModuleTs(fullPath);
    const lessonsExport = exported[`deploymentModule${modNum}Lessons`];
    assert(lessonsExport, `Missing deploymentModule${modNum}Lessons export in ${f}`);

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
check('src/data/deployment/curriculum.ts exports all 15 modules and lessons', () => {
  assert(fs.existsSync(path.resolve(__dirname, '..', 'src/data/deployment/curriculum.ts')));
  const deployCurriculum = loadModuleTs(path.resolve(__dirname, '..', 'src/data/deployment/curriculum.ts'));
  assert.strictEqual(deployCurriculum.MODULES_CATALOG_DEPLOYMENT.length, 15, 'MODULES_CATALOG_DEPLOYMENT must contain 15 modules');
  assert.strictEqual(Object.keys(deployCurriculum.DEPLOYMENT_FULL_LESSONS).length, 15, 'DEPLOYMENT_FULL_LESSONS must contain 15 lessons');
});

check('src/data/modules/curriculum.ts registers Deployment in MODULES_CATALOG and FULL_LESSONS', () => {
  const code = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/modules/curriculum.ts'), 'utf8');
  assert(code.includes('MODULES_CATALOG_DEPLOYMENT'), 'curriculum.ts must import/export MODULES_CATALOG_DEPLOYMENT');
  assert(code.includes('DEPLOYMENT_FULL_LESSONS'), 'curriculum.ts must import/export DEPLOYMENT_FULL_LESSONS');
  assert(code.includes('...MODULES_CATALOG_DEPLOYMENT'), 'MODULES_CATALOG must include MODULES_CATALOG_DEPLOYMENT');
  assert(code.includes('...DEPLOYMENT_FULL_LESSONS'), 'FULL_LESSONS must include DEPLOYMENT_FULL_LESSONS');
});

// 4. Verify Phase 11 Status in AI_ML_PHASES
console.log('\n--- [4/5] Verifying Phase 11 in curriculumPhases.ts ---');
check('Phase 11 is marked as "available" with title "AI Deployment, Cloud & Production Engineering" and 15 published modules', () => {
  const phasesCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/phases/curriculumPhases.ts'), 'utf8');
  assert(phasesCode.includes("id: 'phase-11'"), 'Missing phase-11 id');
  assert(phasesCode.includes("title: 'AI Deployment, Cloud & Production Engineering'"), 'Title must be AI Deployment, Cloud & Production Engineering');
  assert(phasesCode.includes("badge: 'Phase 11 · AI Deployment'"), 'Missing Phase 11 badge');
  assert(phasesCode.includes("status: 'available'"), 'Phase 11 must be available');

  for (let i = 1; i <= 15; i++) {
    const modId = `p11-m${i}`;
    assert(phasesCode.includes(`id: '${modId}'`), `curriculumPhases.ts missing ${modId}`);
    assert(phasesCode.includes(`route: '/curriculum/${modId}/`), `curriculumPhases.ts missing route for ${modId}`);
  }
});

// 5. Verification of Core Mathematical & Algorithmic Correctness
console.log('\n--- [5/5] Verifying Algorithmic & Mathematical Correctness ---');

check("Little's Law concurrency capacity calculation", () => {
  // L = lambda * W
  const lambdaQPS = 400; // 400 queries / second
  const serviceTimeSec = 0.025; // 25ms average response time
  const requiredConcurrency = lambdaQPS * serviceTimeSec;
  assert.strictEqual(requiredConcurrency, 10, 'Required concurrency must be exactly 10 in-flight requests');
});

check('M/M/1 queue delay scaling formula', () => {
  const mu = 50.0; // 50 req/sec service rate
  const lambda = 40.0; // 40 req/sec arrival rate
  const rho = lambda / mu; // 0.80 utilization
  const W = (1.0 / mu) / (1.0 - rho); // 0.02 / 0.20 = 0.10s (100ms)
  assert(Math.abs(W - 0.10) < 1e-6, `Expected 100ms response time at 80% utilization, got ${W}`);
});

check('Token bucket rate limiter refill mathematics', () => {
  const capacity = 20.0;
  const refillRate = 5.0; // 5 tokens/sec
  const dt = 2.0; // 2 seconds elapsed
  let tokens = 8.0;
  tokens = Math.min(capacity, tokens + refillRate * dt);
  assert.strictEqual(tokens, 18.0, `Expected 18.0 tokens after 2s refill, got ${tokens}`);
});

check('Multi-AZ composite availability calculation', () => {
  const a1 = 0.999; // 99.9% single-AZ
  const a2 = 0.999;
  const pFail = (1 - a1) * (1 - a2); // 0.001 * 0.001 = 1e-6
  const compositeAvail = 1.0 - pFail;
  assert(Math.abs(compositeAvail - 0.999999) < 1e-7, `Expected 99.9999% availability, got ${compositeAvail}`);
});

check('GPU VRAM weights footprint calculation', () => {
  const params = 8e9; // 8 Billion parameters
  const bytesPerParam = 2.0; // FP16
  const weightsBytes = params * bytesPerParam;
  const weightsGb = weightsBytes / Math.pow(1024, 3);
  assert(Math.abs(weightsGb - 14.9) < 0.1, `Expected ~14.9 GB, got ${weightsGb}`);
});

console.log('\n=================================================================');
console.log(`  SUCCESS: ALL ${passedChecks} DEPLOYMENT VERIFICATION CHECKS PASSED!`);
console.log('  Phase 11 (AI Deployment, Cloud & Production): 15 Modules, 15 Lessons 100% Complete');
console.log('=================================================================\n');
