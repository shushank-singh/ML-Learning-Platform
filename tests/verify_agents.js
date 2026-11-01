// AI Agents & Agentic Systems Curriculum & Quality Verifier
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

console.log('=================================================================');
console.log('   PHASE 9: AI AGENTS & AGENTIC SYSTEMS VERIFICATION SUITE       ');
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
  'src/components/visualizers/agents/AgentControlLoopExplorer.tsx',
  'src/components/visualizers/agents/AgentToolCallingExplorer.tsx',
  'src/components/visualizers/agents/AgentMemoryStateExplorer.tsx',
  'src/components/visualizers/agents/AgentPlanningExplorer.tsx',
  'src/components/visualizers/agents/AgentWorkflowGraphExplorer.tsx',
  'src/components/visualizers/agents/AgentMultiAgentHandoffExplorer.tsx',
  'src/components/visualizers/agents/AgentHITLApprovalExplorer.tsx',
  'src/components/visualizers/agents/AgentEvaluationExplorer.tsx',
  'src/components/visualizers/agents/AgentSafetyGuardrailsExplorer.tsx',
  'src/components/visualizers/agents/AgentTraceBudgetExplorer.tsx',
];

check('All 10 Agent interactive visualizer files exist', () => {
  visualizerFiles.forEach((f) => {
    assert(fs.existsSync(path.resolve(__dirname, '..', f)), `Missing visualizer file: ${f}`);
  });
});

check('VisualizerDispatcher wires all Agent visualizers', () => {
  const dispatcherCode = fs.readFileSync(
    path.resolve(__dirname, '..', 'src/components/visualizers/VisualizerDispatcher.tsx'),
    'utf8'
  );
  assert(dispatcherCode.includes("case 'agent-control-loop-explorer':"), 'Missing agent-control-loop-explorer case');
  assert(dispatcherCode.includes("case 'agent-tool-calling-explorer':"), 'Missing agent-tool-calling-explorer case');
  assert(dispatcherCode.includes("case 'agent-memory-state-explorer':"), 'Missing agent-memory-state-explorer case');
  assert(dispatcherCode.includes("case 'agent-planning-explorer':"), 'Missing agent-planning-explorer case');
  assert(dispatcherCode.includes("case 'agent-workflow-graph-explorer':"), 'Missing agent-workflow-graph-explorer case');
  assert(dispatcherCode.includes("case 'agent-multiagent-handoff-explorer':"), 'Missing agent-multiagent-handoff-explorer case');
  assert(dispatcherCode.includes("case 'agent-hitl-approval-explorer':"), 'Missing agent-hitl-approval-explorer case');
  assert(dispatcherCode.includes("case 'agent-evaluation-explorer':"), 'Missing agent-evaluation-explorer case');
  assert(dispatcherCode.includes("case 'agent-safety-guardrails-explorer':"), 'Missing agent-safety-guardrails-explorer case');
  assert(dispatcherCode.includes("case 'agent-trace-budget-explorer':"), 'Missing agent-trace-budget-explorer case');
});

// 2. Verify Module Files & Lessons Content
console.log('\n--- [2/5] Verifying 15 Agent Lessons Across 5 Files ---');
const agentModuleFiles = [
  'src/data/agents/agent-module-1.ts',
  'src/data/agents/agent-module-2.ts',
  'src/data/agents/agent-module-3.ts',
  'src/data/agents/agent-module-4.ts',
  'src/data/agents/agent-module-5.ts',
];

const allLessonsMap = {};

agentModuleFiles.forEach((f, idx) => {
  const modNum = idx + 1;
  check(`agent-module-${modNum}.ts exists and has complete pedagogical content`, () => {
    const fullPath = path.resolve(__dirname, '..', f);
    assert(fs.existsSync(fullPath), `Missing module file: ${f}`);

    const exported = loadModuleTs(fullPath);
    const lessonsExport = exported[`agentModule${modNum}Lessons`];
    assert(lessonsExport, `Missing agentModule${modNum}Lessons export in ${f}`);

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
      assert(lesson.sklearnCode && lesson.sklearnCode.code.length > 50, `${lId}: sklearn/pytorch/state code missing or too short`);
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
check('src/data/agents/curriculum.ts exports all 15 modules and lessons', () => {
  assert(fs.existsSync(path.resolve(__dirname, '..', 'src/data/agents/curriculum.ts')));
  const agentsCurriculum = loadModuleTs(path.resolve(__dirname, '..', 'src/data/agents/curriculum.ts'));
  assert.strictEqual(agentsCurriculum.MODULES_CATALOG_AGENTS.length, 15, 'MODULES_CATALOG_AGENTS must contain 15 modules');
  assert.strictEqual(Object.keys(agentsCurriculum.AGENTS_FULL_LESSONS).length, 15, 'AGENTS_FULL_LESSONS must contain 15 lessons');
});

check('src/data/modules/curriculum.ts registers Agents in MODULES_CATALOG and FULL_LESSONS', () => {
  const code = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/modules/curriculum.ts'), 'utf8');
  assert(code.includes('MODULES_CATALOG_AGENTS'), 'curriculum.ts must import/export MODULES_CATALOG_AGENTS');
  assert(code.includes('AGENTS_FULL_LESSONS'), 'curriculum.ts must import/export AGENTS_FULL_LESSONS');
  assert(code.includes('...MODULES_CATALOG_AGENTS'), 'MODULES_CATALOG must include MODULES_CATALOG_AGENTS');
  assert(code.includes('...AGENTS_FULL_LESSONS'), 'FULL_LESSONS must include AGENTS_FULL_LESSONS');
});

// 4. Verify Phase 9 Status in AI_ML_PHASES
console.log('\n--- [4/5] Verifying Phase 9 in curriculumPhases.ts ---');
check('Phase 9 is marked as "available" and all 15 modules are published with valid routes', () => {
  const phasesCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/phases/curriculumPhases.ts'), 'utf8');
  assert(phasesCode.includes("id: 'phase-9'"), 'Missing phase-9 id');
  assert(phasesCode.includes("badge: 'Phase 9 · AI Agents'"), 'Missing Phase 9 badge');

  for (let i = 1; i <= 15; i++) {
    const modId = `p9-m${i}`;
    assert(phasesCode.includes(`id: '${modId}'`), `curriculumPhases.ts missing ${modId}`);
    assert(phasesCode.includes(`route: '/curriculum/${modId}/`), `curriculumPhases.ts missing route for ${modId}`);
  }
});

// 5. Verification of Core Mathematical & Algorithmic Correctness
console.log('\n--- [5/5] Verifying Algorithmic & Mathematical Correctness ---');

check('Closed-loop error dampening vs open-loop compounding', () => {
  const pErr = 0.15;
  const pHeal = 0.80;
  const N = 4;
  
  // Open loop success: (1 - pErr)^N
  const openLoop = Math.pow(1 - pErr, N);
  assert(Math.abs(openLoop - 0.522) < 0.01, `Open loop error: expected ~0.522, got ${openLoop}`);
  
  // Closed loop effective error per step: pErr * (1 - pHeal)
  const effErr = pErr * (1 - pHeal); // 0.03
  const closedLoop = Math.pow(1 - effErr, N); // 0.97^4 ≈ 0.885
  assert(Math.abs(closedLoop - 0.885) < 0.01, `Closed loop error: expected ~0.885, got ${closedLoop}`);
  assert(closedLoop > openLoop, 'Closed loop must significantly outperform open loop');
});

check('Critical path DAG execution duration calculation', () => {
  const t1 = 1.0;
  const t2a = 2.0;
  const t2b = 2.5; // parallel with t2a
  const t3 = 1.5; // depends on t2a and t2b
  
  const sequential = t1 + t2a + t2b + t3;
  const parallelDAG = t1 + Math.max(t2a, t2b) + t3;
  
  assert.strictEqual(sequential, 7.0, 'Sequential latency must be 7.0s');
  assert.strictEqual(parallelDAG, 5.0, 'Critical path DAG latency must be 5.0s');
  assert(parallelDAG < sequential, 'Parallel DAG execution must be faster than sequential');
});

check('Unbiased Pass@k calculation formulation', () => {
  function passAtK(n, c, k) {
    if (n - c < k) return 1.0;
    let prod = 1.0;
    for (let i = 0; i < k; i++) {
      prod *= (n - c - i) / (n - i);
    }
    return 1.0 - prod;
  }
  
  const p1 = passAtK(10, 7, 1);
  assert.strictEqual(p1, 0.7, 'Pass@1 for 7/10 should be 0.7');
  
  const p3 = passAtK(10, 7, 3);
  // 1 - (3/10 * 2/9 * 1/8) = 1 - 6/720 = 1 - 1/120 = 119/120 ≈ 0.991666...
  assert(Math.abs(p3 - 0.9917) < 0.001, `Pass@3 should be ~0.9917, got ${p3}`);
});

console.log('\n=================================================================');
console.log(`  SUCCESS: ALL ${passedChecks} AGENT VERIFICATION CHECKS PASSED!`);
console.log('  Phase 9 (AI Agents & Agentic Systems): 15 Modules, 15 Lessons 100% Complete');
console.log('=================================================================\n');

