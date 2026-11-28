// Automated Verification Suite for IIT JEE Preparation Platform (/iit)
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const moduleCache = new Map();

function resolveModulePath(request, fromFile) {
  let target = request;
  if (target.startsWith('@/')) {
    target = path.join(ROOT, 'src', target.slice(2));
  } else if (target.startsWith('./') || target.startsWith('../')) {
    target = path.resolve(path.dirname(fromFile), target);
  } else {
    return null;
  }

  const candidates = [
    target,
    `${target}.ts`,
    `${target}.tsx`,
    `${target}.js`,
    `${target}.json`,
    path.join(target, 'index.ts'),
    path.join(target, 'index.tsx'),
  ];
  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      return cand;
    }
  }
  throw new Error(`Cannot resolve "${request}" from "${fromFile}"`);
}

function loadTsModule(filePath) {
  const absPath = path.resolve(filePath);
  if (moduleCache.has(absPath)) {
    return moduleCache.get(absPath).exports;
  }
  const source = fs.readFileSync(absPath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    fileName: absPath,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
  });

  const mod = { exports: {} };
  moduleCache.set(absPath, mod);

  const localRequire = (req) => {
    const resolved = resolveModulePath(req, absPath);
    if (!resolved) return require(req);
    return loadTsModule(resolved);
  };

  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', transpiled.outputText);
  fn(mod.exports, localRequire, mod, absPath, path.dirname(absPath));
  return mod.exports;
}

console.log('=================================================================');
console.log('        IIT JEE (/iit) — CURRICULUM, ANALYTICS & RLS VERIFIER     ');
console.log('=================================================================\n');

// 1. Required files
console.log('--- [1/5] Checking Required /iit Routes, Components & Migrations ---');
const requiredFiles = [
  'supabase/migrations/20261128_iit_jee_platform.sql',
  'src/types/iit.ts',
  'src/lib/iit/validation.ts',
  'src/lib/iit/progress.ts',
  'src/lib/iit/analytics.ts',
  'src/app/api/iit/progress/route.ts',
  'src/data/iit/curriculum.ts',
  'src/data/iit/physicsContent.ts',
  'src/data/iit/chemistryContent.ts',
  'src/data/iit/mathsContent.ts',
  'src/data/iit/mockTests.ts',
  'src/data/iit/index.ts',
  'src/components/layout/IITLayout.tsx',
  'src/components/iit/IITMarkdownMath.tsx',
  'src/components/iit/IITQuestionCard.tsx',
  'src/components/iit/IITTopicTutorWidget.tsx',
  'src/components/iit/IITAITutorView.tsx',
  'src/components/iit/IITDashboardHome.tsx',
  'src/app/iit/page.tsx',
  'src/app/iit/syllabus/page.tsx',
  'src/app/iit/chapters/[chapterId]/page.tsx',
  'src/app/iit/formulas/page.tsx',
  'src/app/iit/practice/page.tsx',
  'src/app/iit/mock-tests/page.tsx',
  'src/app/iit/planner/page.tsx',
  'src/app/iit/analytics/page.tsx',
  'src/app/iit/ai-tutor/page.tsx',
];
for (const rel of requiredFiles) {
  assert(fs.existsSync(path.join(ROOT, rel)), `Missing /iit file: ${rel}`);
}
console.log(`  [PASS] All ${requiredFiles.length} /iit platform files exist.`);

// 2. Curriculum & Content Integrity
console.log('\n--- [2/5] Checking Official JEE Main vs JEE Advanced Curriculum ---');
const iitData = loadTsModule(path.join(ROOT, 'src/data/iit/index.ts'));
const {
  IIT_UNITS,
  IIT_CHAPTERS,
  IIT_CHAPTERS_BY_ID,
  ALL_IIT_FORMULAS,
  ALL_IIT_QUESTIONS,
  IIT_QUESTIONS_BY_ID,
  ALL_IIT_FLASHCARDS,
  IIT_MOCK_TESTS,
  getLessonsForChapter,
  getRevisionNotesForChapter,
} = iitData;

const unitIds = new Set(IIT_UNITS.map((u) => u.id));
assert(IIT_CHAPTERS.length >= 75, `Expected full Class 11 & 12 PCM chapters (>=75), got ${IIT_CHAPTERS.length}`);

const hasPhysics = IIT_CHAPTERS.some((c) => c.subject === 'physics');
const hasChemistry = IIT_CHAPTERS.some((c) => c.subject === 'chemistry');
const hasMaths = IIT_CHAPTERS.some((c) => c.subject === 'mathematics');
assert(hasPhysics && hasChemistry && hasMaths, 'Must cover Physics, Chemistry, and Mathematics');

const hasMainOnly = IIT_CHAPTERS.some((c) => c.examApplicability === 'jee_main_only');
const hasAdvOnly = IIT_CHAPTERS.some((c) => c.examApplicability === 'jee_advanced_only');
assert(hasMainOnly && hasAdvOnly, 'Must map JEE Main-only and JEE Advanced-only chapter differences');

for (const ch of IIT_CHAPTERS) {
  assert(unitIds.has(ch.unitId), `Chapter ${ch.id} has unknown unitId ${ch.unitId}`);
  assert(ch.topics.length > 0, `Chapter ${ch.id} must have >= 1 topic`);
  assert(ch.jeeMainNotes && ch.jeeAdvancedNotes, `Chapter ${ch.id} missing Main/Adv syllabus notes`);
  const lessons = getLessonsForChapter(ch.id);
  assert(lessons.length > 0, `Chapter ${ch.id} returned 0 lessons`);
  const rev = getRevisionNotesForChapter(ch.id);
  assert(rev.sixtySecondSummary.length > 0, `Chapter ${ch.id} missing 60s revision notes`);
}

for (const f of ALL_IIT_FORMULAS) {
  assert(IIT_CHAPTERS_BY_ID[f.chapterId], `Formula ${f.id} references unknown chapter ${f.chapterId}`);
}
for (const fc of ALL_IIT_FLASHCARDS) {
  assert(IIT_CHAPTERS_BY_ID[fc.chapterId], `Flashcard ${fc.id} references unknown chapter ${fc.chapterId}`);
}
for (const q of ALL_IIT_QUESTIONS) {
  assert(IIT_CHAPTERS_BY_ID[q.chapterId], `Question ${q.id} references unknown chapter ${q.chapterId}`);
  assert(q.solutionSteps.length > 0, `Question ${q.id} missing solutionSteps`);
  if (q.type === 'numerical') {
    assert(typeof q.numericalAnswer === 'number', `Numerical question ${q.id} missing numericalAnswer`);
  } else {
    assert(Array.isArray(q.options) && q.options.length >= 4, `MCQ ${q.id} must have 4 options`);
    assert(Array.isArray(q.correctIndices) && q.correctIndices.length >= 1, `MCQ ${q.id} missing correctIndices`);
  }
}
for (const mt of IIT_MOCK_TESTS) {
  assert(mt.questionIds.length > 0, `Mock test ${mt.id} has no questions`);
  for (const qid of mt.questionIds) {
    assert(IIT_QUESTIONS_BY_ID[qid], `Mock test ${mt.id} references missing question ${qid}`);
  }
}
console.log(
  `  [PASS] ${IIT_CHAPTERS.length} chapters, ${ALL_IIT_FORMULAS.length} formulas, ${ALL_IIT_QUESTIONS.length} questions, ${IIT_MOCK_TESTS.length} mock tests verified.`
);

// 3. Real Analytics & SM-2 Verification (No Hardcoded Demo Metrics)
console.log('\n--- [3/5] Verifying Real Derived Analytics, Streak & SM-2 Scheduler ---');
const progressLib = loadTsModule(path.join(ROOT, 'src/lib/iit/progress.ts'));
const analyticsLib = loadTsModule(path.join(ROOT, 'src/lib/iit/analytics.ts'));

const emptyProg = progressLib.defaultIITProgress();
const emptyMetrics = analyticsLib.computeIITDashboardMetrics(emptyProg, new Date('2026-11-28T10:00:00Z'));
assert.strictEqual(emptyMetrics.completedChaptersCount, 0);
assert.strictEqual(emptyMetrics.overallCompletionPct, 0);
assert.strictEqual(emptyMetrics.overallAccuracyPct, null, 'Empty progress must return null accuracy');
assert.strictEqual(emptyMetrics.currentStreakDays, 0);
assert.strictEqual(emptyMetrics.weakChapters.length, 0);

const activeProg = {
  ...emptyProg,
  completedChapters: { 'phy-units-measurements': true, 'chem-basic-concepts': true },
  activityDates: ['2026-11-26', '2026-11-27', '2026-11-28'],
  attempts: [
    { questionId: 'pq-1', chapterId: 'phy-units-measurements', subject: 'physics', isCorrect: true, marksObtained: 4, answeredAt: '2026-11-28T09:00:00Z' },
    { questionId: 'pq-8', chapterId: 'phy-rotational-motion', subject: 'physics', isCorrect: false, marksObtained: -1, answeredAt: '2026-11-28T09:05:00Z' },
    { questionId: 'pq-9', chapterId: 'phy-rotational-motion', subject: 'physics', isCorrect: false, marksObtained: -2, answeredAt: '2026-11-28T09:10:00Z' },
  ],
};
const activeMetrics = analyticsLib.computeIITDashboardMetrics(activeProg, new Date('2026-11-28T10:00:00Z'));
assert.strictEqual(activeMetrics.completedChaptersCount, 2);
assert.strictEqual(activeMetrics.currentStreakDays, 3);
assert.strictEqual(activeMetrics.overallAccuracyPct, 33);
assert.strictEqual(activeMetrics.weakChapters.length, 1);
assert.strictEqual(activeMetrics.weakChapters[0].chapter.id, 'phy-rotational-motion');

const r1 = progressLib.computeIITSM2Review(undefined, 'pfc-1', 5, new Date('2026-11-26T00:00:00Z'));
assert.strictEqual(r1.intervalDays, 1);
const r2 = progressLib.computeIITSM2Review(r1, 'pfc-1', 5, new Date('2026-11-27T00:00:00Z'));
assert.strictEqual(r2.intervalDays, 6);
const rReset = progressLib.computeIITSM2Review(r2, 'pfc-1', 1, new Date('2026-11-28T00:00:00Z'));
assert.strictEqual(rReset.intervalDays, 1);
console.log('  [PASS] Zero-state null accuracy, weak-chapter detection, streak calculation, and SM-2 verified.');

// 4. Zod Validation
console.log('\n--- [4/5] Verifying Zod Validation Schemas ---');
const validationLib = loadTsModule(path.join(ROOT, 'src/lib/iit/validation.ts'));
assert.strictEqual(
  validationLib.IITRevisionTaskFormSchema.safeParse({
    chapterId: 'phy-rotational-motion',
    title: 'Revise rolling friction derivations',
    dueDate: '2026-11-30',
    priority: 'High',
  }).success,
  true
);
assert.strictEqual(
  validationLib.IITRevisionTaskFormSchema.safeParse({
    chapterId: '',
    title: 'ab',
    dueDate: 'bad-date',
    priority: 'High',
  }).success,
  false
);
console.log('  [PASS] Zod validation constraints verified.');

// 5. RLS & AI Tutor Track Integration
console.log('\n--- [5/5] Verifying Supabase RLS & IIT AI Tutor Track Integration ---');
const sql = fs.readFileSync(path.join(ROOT, 'supabase/migrations/20261128_iit_jee_platform.sql'), 'utf8');
assert(sql.includes('alter table public.iit_user_progress enable row level security'));
assert(sql.includes('alter table public.iit_mock_test_attempts enable row level security'));
assert(sql.includes('auth.uid() = user_id'));

const aiTutorRoute = fs.readFileSync(path.join(ROOT, 'src/app/api/ai-tutor/route.ts'), 'utf8');
assert(aiTutorRoute.includes("'iit'") && aiTutorRoute.includes("'iit-physics'"));

const promptBuilder = fs.readFileSync(path.join(ROOT, 'src/lib/tutor/promptBuilder.ts'), 'utf8');
assert(promptBuilder.includes('isIITTutorTrack'));
assert(promptBuilder.includes('iit-chemistry') && promptBuilder.includes('iit-maths'));
console.log('  [PASS] RLS policies and IIT AI Tutor track integration verified.');

console.log('\n=================================================================');
console.log('             ALL IIT JEE (/iit) VERIFICATIONS PASSED             ');
console.log('=================================================================');

