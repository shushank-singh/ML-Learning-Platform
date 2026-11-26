// Automated Verification Suite for MedVerse 3D (MBBS Division)
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
    return null; // node_module (e.g., zod)
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
  if (absPath.endsWith('.json')) {
    const jsonVal = JSON.parse(fs.readFileSync(absPath, 'utf8'));
    moduleCache.set(absPath, { exports: jsonVal });
    return jsonVal;
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
    if (!resolved) {
      return require(req);
    }
    return loadTsModule(resolved);
  };

  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', transpiled.outputText);
  fn(mod.exports, localRequire, mod, absPath, path.dirname(absPath));
  return mod.exports;
}

function parseGlbMeshNodes(glbPath) {
  const buf = fs.readFileSync(glbPath);
  const magic = buf.toString('ascii', 0, 4);
  assert.strictEqual(magic, 'glTF', `${glbPath} must have valid glTF binary magic`);
  const chunkLength = buf.readUInt32LE(12);
  const chunkType = buf.toString('ascii', 16, 20);
  assert.strictEqual(chunkType, 'JSON', `${glbPath} first chunk must be JSON`);
  const gltfJson = JSON.parse(buf.toString('utf8', 20, 20 + chunkLength));
  const meshNodes = (gltfJson.nodes || []).filter((node) => node.mesh !== undefined);
  return {
    gltfJson,
    meshNodes,
    meshNames: meshNodes.map((n) => (n.extras && n.extras.structureId) || n.name).filter(Boolean),
  };
}

console.log('=================================================================');
console.log('        MEDVERSE 3D — REAL ENGINE, ASSET & SCHEMA VERIFIER       ');
console.log('=================================================================\n');

// 1. Verify required MedVerse files and binary GLB assets
console.log('--- [1/6] Checking Required Files, Assets & Provenance Docs ---');
const requiredFiles = [
  'PROJECT_STATUS.md',
  'public/models/medverse/heart.glb',
  'public/models/medverse/heart-manifest.json',
  'public/models/medverse/heart-ATTRIBUTION.md',
  'public/models/medverse/skeleton.glb',
  'public/models/medverse/skeleton-manifest.json',
  'public/models/medverse/skeleton-ATTRIBUTION.md',
  'supabase/migrations/20261126_medverse_3d_schema.sql',
  'supabase/seed_medverse_3d.sql',
  'src/types/medverse.ts',
  'src/lib/medverse/validation.ts',
  'src/lib/medverse/progress.ts',
  'src/data/medverse/index.ts',
  'src/data/medverse/assets.ts',
  'src/data/medverse/heartStructures.ts',
  'src/data/medverse/skeletonStructures.ts',
  'src/data/medverse/animations.ts',
  'src/data/medverse/curriculum.ts',
  'src/data/medverse/topicsContent.ts',
  'src/app/api/medverse/progress/route.ts',
  'src/app/api/medverse/studio/route.ts',
  'src/components/medverse/three/threeUtils.ts',
  'src/components/medverse/three/MedVerseSceneCanvas.tsx',
  'src/components/medverse/three/AnatomyGLBViewer.tsx',
  'src/components/medverse/three/ScientificAnimationScene.tsx',
  'src/components/medverse/three/AnimationTimelinePlayer.tsx',
  'src/components/medverse/NotesRenderer.tsx',
  'src/components/medverse/QuizEnginePanel.tsx',
  'src/components/medverse/FlashcardSM2Panel.tsx',
  'src/components/medverse/MedVerseDashboardHome.tsx',
  'src/components/layout/MedVerseLayout.tsx',
  'src/app/doctor/curriculum/page.tsx',
  'src/app/doctor/anatomy/page.tsx',
  'src/app/doctor/animations/page.tsx',
  'src/app/doctor/topics/[topicId]/page.tsx',
  'src/app/doctor/cases/page.tsx',
  'src/app/doctor/quizzes/page.tsx',
  'src/app/doctor/studio/page.tsx',
];

for (const rel of requiredFiles) {
  const full = path.join(ROOT, rel);
  assert(fs.existsSync(full), `Missing MedVerse file: ${rel}`);
}
console.log(`  [PASS] All ${requiredFiles.length} MedVerse files and binary assets present.`);

// 2. Verify GLB meshes match TypeScript anatomical registries 1:1
console.log('\n--- [2/6] Verifying 3D GLB Node-to-Metadata 1:1 Mapping ---');
const medverse = loadTsModule(path.join(ROOT, 'src/data/medverse/index.ts'));
const heartGlb = parseGlbMeshNodes(path.join(ROOT, 'public/models/medverse/heart.glb'));
const skeletonGlb = parseGlbMeshNodes(path.join(ROOT, 'public/models/medverse/skeleton.glb'));

assert.strictEqual(heartGlb.meshNames.length, 11, `Expected 11 meshes in heart.glb, got ${heartGlb.meshNames.length}`);
assert.strictEqual(
  medverse.HEART_STRUCTURES.length,
  11,
  `Expected 11 HEART_STRUCTURES, got ${medverse.HEART_STRUCTURES.length}`
);
for (const meshId of heartGlb.meshNames) {
  assert(
    medverse.HEART_STRUCTURES_BY_ID[meshId],
    `heart.glb mesh "${meshId}" missing from HEART_STRUCTURES_BY_ID`
  );
}
for (const struct of medverse.HEART_STRUCTURES) {
  assert(
    heartGlb.meshNames.includes(struct.meshId),
    `HEART_STRUCTURES "${struct.id}" references missing GLB mesh "${struct.meshId}"`
  );
}

assert.strictEqual(
  skeletonGlb.meshNames.length,
  242,
  `Expected 242 meshes in skeleton.glb, got ${skeletonGlb.meshNames.length}`
);
assert.strictEqual(
  medverse.SKELETON_STRUCTURES.length,
  242,
  `Expected 242 SKELETON_STRUCTURES, got ${medverse.SKELETON_STRUCTURES.length}`
);
for (const meshId of skeletonGlb.meshNames) {
  assert(
    medverse.SKELETON_STRUCTURES_BY_ID[meshId],
    `skeleton.glb mesh "${meshId}" missing from SKELETON_STRUCTURES_BY_ID`
  );
}
console.log('  [PASS] heart.glb (11/11) and skeleton.glb (242/242) meshes map 1:1 to anatomical registries.');

// 3. Verify Curriculum Hierarchy, Honest Statuses & Content Coverage
console.log('\n--- [3/6] Verifying NMC CBME Curriculum & Authored Content ---');
const {
  MBBS_PHASES,
  MBBS_SUBJECTS_CATALOG,
  MBBS_MODULES_CATALOG,
  MBBS_TOPICS_CATALOG,
  MBBS_CURRICULUM_STATS,
  ANATOMY_ASSETS,
  ANATOMY_ASSET_LIST,
  SCIENTIFIC_ANIMATIONS,
  SCIENTIFIC_ANIMATIONS_BY_ID,
  MEDVERSE_NOTES,
  MEDVERSE_MCQS,
  MEDVERSE_FLASHCARDS,
  SYNTHETIC_CLINICAL_CASES,
} = medverse;

const {
  AnimationStepSpecSchema,
  MBBSMCQSchema,
  TopicCreateOrUpdateSchema,
  MedVerseProgressUpdateSchema,
} = loadTsModule(path.join(ROOT, 'src/lib/medverse/validation.ts'));

assert.strictEqual(MBBS_PHASES.length, 4, 'Expected 4 NMC MBBS phases');
assert(MBBS_SUBJECTS_CATALOG.length >= 19, `Expected >= 19 NMC MBBS subjects, got ${MBBS_SUBJECTS_CATALOG.length}`);
assert(
  MBBS_CURRICULUM_STATS.publishedTopicsCount > 0 &&
    MBBS_CURRICULUM_STATS.publishedTopicsCount < MBBS_CURRICULUM_STATS.totalTopicsCount,
  'Curriculum must honestly reflect both published and unauthored planned/in_development topics'
);

const phaseIds = new Set(MBBS_PHASES.map((p) => p.id));
const subjectIds = new Set(MBBS_SUBJECTS_CATALOG.map((s) => s.id));
const moduleIds = new Set(MBBS_MODULES_CATALOG.map((m) => m.id));

let publishedChecked = 0;
for (const topic of MBBS_TOPICS_CATALOG) {
  assert(phaseIds.has(topic.phaseId), `Topic ${topic.id} invalid phaseId ${topic.phaseId}`);
  assert(subjectIds.has(topic.subjectId), `Topic ${topic.id} invalid subjectId ${topic.subjectId}`);
  assert(moduleIds.has(topic.moduleId), `Topic ${topic.id} invalid moduleId ${topic.moduleId}`);

  if (topic.assetId) {
    assert(ANATOMY_ASSETS[topic.assetId], `Topic ${topic.id} references unknown assetId ${topic.assetId}`);
  }
  if (topic.animationId) {
    assert(
      SCIENTIFIC_ANIMATIONS_BY_ID[topic.animationId],
      `Topic ${topic.id} references unknown animationId ${topic.animationId}`
    );
  }
  if (topic.focusStructureIds && topic.assetId) {
    for (const sid of topic.focusStructureIds) {
      assert(
        medverse.getStructureMetadata(topic.assetId, sid),
        `Topic ${topic.id} focusStructureId "${sid}" missing in asset "${topic.assetId}"`
      );
    }
  }

  const mcqs = MEDVERSE_MCQS.filter((q) => q.topicId === topic.id);
  const cards = MEDVERSE_FLASHCARDS.filter((c) => c.topicId === topic.id);

  if (topic.status === 'published') {
    publishedChecked += 1;
    assert(MEDVERSE_NOTES[topic.id], `Published topic ${topic.id} must have authored notes`);
    assert(mcqs.length > 0, `Published topic ${topic.id} must have >= 1 authored MCQ`);
    assert(cards.length > 0, `Published topic ${topic.id} must have >= 1 authored flashcard`);
    assert.strictEqual(topic.mcqCount, mcqs.length, `Published topic ${topic.id} mcqCount mismatch`);
    assert.strictEqual(topic.flashcardCount, cards.length, `Published topic ${topic.id} flashcardCount mismatch`);
  }
}

for (const mcq of MEDVERSE_MCQS) {
  const parsed = MBBSMCQSchema.safeParse(mcq);
  assert(parsed.success, `MCQ ${mcq.id} failed Zod validation: ${JSON.stringify(parsed.error)}`);
}

const mcqIdSet = new Set(MEDVERSE_MCQS.map((q) => q.id));
for (const c of SYNTHETIC_CLINICAL_CASES) {
  assert(
    typeof c.disclaimer === 'string' && c.disclaimer.toLowerCase().includes('synthetic'),
    `Clinical case ${c.id} disclaimer must explicitly disclose synthetic educational nature`
  );
  assert(
    Array.isArray(c.differentialDiagnosis) && c.differentialDiagnosis.length > 0,
    `Clinical case ${c.id} must include structured differential diagnosis`
  );
  assert(Array.isArray(c.questionIds) && c.questionIds.length > 0, `Clinical case ${c.id} must link valid MCQ questionIds`);
  for (const qid of c.questionIds) {
    assert(mcqIdSet.has(qid), `Clinical case ${c.id} references missing questionId "${qid}"`);
  }
}

for (const asset of ANATOMY_ASSET_LIST) {
  if (!asset.modelUrl) {
    assert.strictEqual(
      asset.kind,
      'educational_schematic',
      `Procedural asset ${asset.id} without GLB URL must declare kind='educational_schematic'`
    );
  }
}

console.log(
  `  [PASS] ${MBBS_SUBJECTS_CATALOG.length} subjects, ${MBBS_TOPICS_CATALOG.length} topics (${publishedChecked} published verified), ${MEDVERSE_MCQS.length} MCQs, ${MEDVERSE_FLASHCARDS.length} flashcards.`
);

// 4. Verify Scientific Animation Timelines
console.log('\n--- [4/6] Verifying Scientific Animation Timelines ---');
assert(SCIENTIFIC_ANIMATIONS.length >= 6, 'Expected at least 6 scientific animations');
for (const anim of SCIENTIFIC_ANIMATIONS) {
  assert(anim.steps.length >= 3, `Animation ${anim.id} should have >= 3 timeline steps`);
  assert(anim.durationSeconds > 0, `Animation ${anim.id} must have positive durationSeconds`);
  assert(anim.simplificationNotice && anim.simplificationNotice.length > 10, `Animation ${anim.id} must disclose scope/simplification`);

  let prevEnd = 0;
  anim.steps.forEach((step, idx) => {
    const res = AnimationStepSpecSchema.safeParse(step);
    assert(res.success, `Animation ${anim.id} step ${step.id} invalid: ${JSON.stringify(res.error)}`);
    assert.strictEqual(step.order, idx + 1, `Animation ${anim.id} step order mismatch at index ${idx}`);
    assert(step.startProgress >= prevEnd - 1e-6, `Animation ${anim.id} step ${step.id} overlaps previous step`);
    prevEnd = step.endProgress;
  });
  assert(Math.abs(prevEnd - 1) < 0.01, `Animation ${anim.id} final step must reach endProgress=1 (got ${prevEnd})`);
}
console.log(`  [PASS] All ${SCIENTIFIC_ANIMATIONS.length} timeline animations have valid normalized [0..1] synchronized steps.`);

// 5. Verify Validation Schemas & Real SM-2 / Accuracy Calculations
console.log('\n--- [5/6] Verifying Zod Validation, SM-2 Scheduler & Accuracy Math ---');
const progressLib = loadTsModule(path.join(ROOT, 'src/lib/medverse/progress.ts'));

const emptyStats = progressLib.computeMedVerseAccuracyStats({
  completedTopics: {},
  bookmarkedTopicIds: [],
  bookmarkedStructureIds: [],
  attempts: [],
  flashcardReviews: {},
  studySessions: [],
  updatedAt: new Date().toISOString(),
});
assert.strictEqual(emptyStats.totalAttempts, 0);
assert.strictEqual(emptyStats.accuracyPercentage, null, 'Zero attempts must return null accuracy, never fabricated metrics');

const sampleStats = progressLib.computeMedVerseAccuracyStats({
  completedTopics: { 'cv-heart-blood-flow': true },
  bookmarkedTopicIds: [],
  bookmarkedStructureIds: [],
  attempts: [
    { questionId: 'q1', topicId: 'cv-heart-blood-flow', subjectId: 'anatomy', selectedIndex: 0, isCorrect: true, answeredAt: '2026-01-01T00:00:00Z' },
    { questionId: 'q2', topicId: 'cv-heart-blood-flow', subjectId: 'anatomy', selectedIndex: 1, isCorrect: true, answeredAt: '2026-01-01T00:01:00Z' },
    { questionId: 'q3', topicId: 'cv-heart-blood-flow', subjectId: 'anatomy', selectedIndex: 2, isCorrect: false, answeredAt: '2026-01-01T00:02:00Z' },
  ],
  flashcardReviews: {},
  studySessions: [],
  updatedAt: '2026-01-01T00:02:00Z',
});
assert.strictEqual(sampleStats.totalAttempts, 3);
assert.strictEqual(sampleStats.correctAttempts, 2);
assert.strictEqual(sampleStats.accuracyPercentage, 67);

const r1 = progressLib.computeSM2Review(undefined, 'fc-1', 5, new Date('2026-11-26T00:00:00Z'));
assert.strictEqual(r1.repetitions, 1);
assert.strictEqual(r1.intervalDays, 1);
const r2 = progressLib.computeSM2Review(r1, 'fc-1', 5, new Date('2026-11-27T00:00:00Z'));
assert.strictEqual(r2.repetitions, 2);
assert.strictEqual(r2.intervalDays, 6);
const rReset = progressLib.computeSM2Review(r2, 'fc-1', 1, new Date('2026-11-28T00:00:00Z'));
assert.strictEqual(rReset.repetitions, 0);
assert.strictEqual(rReset.intervalDays, 1);

assert.strictEqual(
  TopicCreateOrUpdateSchema.safeParse({
    id: 'bad_uppercase_ID',
    moduleId: 'mod-1',
    subjectId: 'anatomy',
    phaseId: 'phase-1-preclinical',
    title: 'Invalid ID Test',
    subtitle: 'Should fail regex',
    status: 'planned',
    difficulty: 'Foundational',
    estimatedMinutes: 15,
  }).success,
  false
);
assert.strictEqual(
  MedVerseProgressUpdateSchema.safeParse({
    attempts: [
      {
        questionId: 'q1',
        topicId: 'cv-heart-blood-flow',
        subjectId: 'anatomy',
        selectedIndex: 9,
        isCorrect: false,
        answeredAt: '2026-11-26T00:00:00Z',
      },
    ],
  }).success,
  false
);
console.log('  [PASS] SM-2 interval scheduling, zero-attempt null accuracy, and Zod schema constraints verified.');

// 6. Verify Supabase RLS Coverage & Server Authorization Guards
console.log('\n--- [6/6] Verifying SQL RLS Policies & Studio Server Authorization ---');
const schemaSql = fs.readFileSync(
  path.join(ROOT, 'supabase/migrations/20261126_medverse_3d_schema.sql'),
  'utf8'
);
const rlsTables = [
  'curriculum_versions',
  'subjects',
  'modules',
  'anatomy_assets',
  'anatomical_structures',
  'topics',
  'learning_objectives',
  'animations',
  'animation_steps',
  'notes',
  'references',
  'questions',
  'question_options',
  'question_attempts',
  'flashcards',
  'flashcard_reviews',
  'bookmarks',
  'learning_progress',
  'study_sessions',
  'clinical_cases',
  'content_reviews',
];

for (const tbl of rlsTables) {
  assert(
    schemaSql.includes(`alter table public.${tbl} enable row level security;`),
    `Missing RLS enablement statement for table public.${tbl}`
  );
}

const studioRouteCode = fs.readFileSync(
  path.join(ROOT, 'src/app/api/medverse/studio/route.ts'),
  'utf8'
);
assert(studioRouteCode.includes('getServerUserContext'), 'Studio API must authenticate on server via getServerUserContext');
assert(studioRouteCode.includes('isAuthorizedEditor'), 'Studio API must enforce role-based editor authorization');
assert(studioRouteCode.includes('401') && studioRouteCode.includes('403'), 'Studio API must return HTTP 401 and 403 for unauthorized requests');

console.log(`  [PASS] All ${rlsTables.length} MedVerse tables have PostgreSQL RLS enabled and Studio API enforces server auth/RBAC.`);
console.log('\n=================================================================');
console.log('              ALL MEDVERSE 3D VERIFICATIONS PASSED               ');
console.log('=================================================================');
