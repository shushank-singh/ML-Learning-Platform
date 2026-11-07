/**
 * AzurLearn Worktree 2: Secure Pricing & Curriculum Entitlements Test Suite
 *
 * Comprehensive verification of:
 * - Owner verification and privileges (Tests 1-4)
 * - Free user access to the five Module 0 entries (Tests 5-9)
 * - Restricted modules and track lockouts (Tests 10-14)
 * - Security bypass prevention (direct URL, API, spoofing, tampering) (Tests 15-20)
 * - Regression guarantees (auth, progress, quiz, RLS) (Tests 21-25)
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

console.log('=================================================================');
console.log(' AZURLEARN — SECURE PRICING & CURRICULUM ENTITLEMENTS VERIFIER   ');
console.log('=================================================================\n');

function loadTs(relPath) {
  const filePath = path.resolve(__dirname, '..', relPath);
  let code = fs.readFileSync(filePath, 'utf8');

  // Strip '@/...' imports for standalone execution
  const lines = code.split('\n');
  const filtered = [];
  for (const line of lines) {
    if (line.trim().startsWith('import ') && line.includes('@/')) {
      // Handled by custom loader
    } else {
      filtered.push(line);
    }
  }
  code = filtered.join('\n');

  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });

  const moduleExports = {};
  const customRequire = (id) => {
    if (id.startsWith('./') || id.startsWith('../')) {
      let target = path.resolve(path.dirname(filePath), id);
      if (fs.existsSync(target + '.ts')) return loadTs(path.relative(path.resolve(__dirname, '..'), target + '.ts'));
      if (fs.existsSync(target + '/index.ts')) return loadTs(path.relative(path.resolve(__dirname, '..'), target + '/index.ts'));
      if (fs.existsSync(target + '.js')) return require(target);
    }
    return {};
  };

  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(moduleExports, { exports: moduleExports }, customRequire);
  return moduleExports;
}

const config = loadTs('src/lib/entitlements/config.ts');
const policy = loadTs('src/lib/entitlements/policy.ts');

let passedTests = 0;
let failedTests = 0;

function test(id, name, fn) {
  try {
    fn();
    console.log(`  [PASS ${String(id).padStart(2, '0')}] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL ${String(id).padStart(2, '0')}] ${name}:`, err.message);
    failedTests++;
    process.exitCode = 1;
  }
}

console.log('--- [1/5] OWNER AUTHORIZATION TESTS ---');

// 1. Owner full access
test(1, 'Verified owner can access all implemented tracks and modules', () => {
  const ownerTier = 'owner';

  // Check all major tracks
  const tracks = ['ml', 'dsa', 'python', 'java', 'deep-learning', 'transformers', 'genai', 'rag', 'agents', 'mlops', 'deployment'];
  for (const t of tracks) {
    const res = policy.canAccessTrack(t, ownerTier);
    assert.strictEqual(res.allowed, true, `Owner should have access to track ${t}`);
  }

  // Check restricted modules
  const modules = ['module-0', 'module-3', 'module-11', 'dl-module-1', 'tf-module-1', 'p6-m1', 'dsa-module-10', 'python-module-6', 'java-module-11'];
  for (const m of modules) {
    const res = policy.canAccessModule(m, ownerTier);
    assert.strictEqual(res.allowed, true, `Owner should have access to module ${m}`);
  }
});

// 2. Owner requires no paid subscription
test(2, 'The owner does not need a paid subscription', () => {
  const res = policy.resolveEntitlementTier({
    isAuthenticated: true,
    userId: 'owner-uuid-1234',
    email: 'admin@azurlearn.com',
    role: 'owner',
    subscriptionTier: null,
    ownerConfig: { ownerId: 'owner-uuid-1234' },
  });
  assert.strictEqual(res, 'owner');

  const check = policy.canAccessModule('dl-module-6', res);
  assert.strictEqual(check.allowed, true);
  assert.strictEqual(check.reason, 'owner_grant');
});

// 3. Missing owner config never grants owner access
test(3, 'Missing or empty owner configuration never grants owner access', () => {
  const isOwnerNoConfig = policy.isOwnerIdentity({
    userId: 'regular-user-id',
    email: 'user@example.com',
    role: 'student',
    ownerConfig: {},
  });
  assert.strictEqual(isOwnerNoConfig, false);

  const isOwnerEmptyStrings = policy.isOwnerIdentity({
    userId: 'regular-user-id',
    email: 'user@example.com',
    role: 'student',
    ownerConfig: { ownerId: '', ownerEmail: '' },
  });
  assert.strictEqual(isOwnerEmptyStrings, false);

  const tier = policy.resolveEntitlementTier({
    isAuthenticated: true,
    userId: 'first-user-1',
    email: 'first@user.com',
    role: 'student',
    ownerConfig: {},
  });
  assert.strictEqual(tier, 'free');
});

// 4. Spoofed client-side owner flag grants no access
test(4, 'A spoofed client-side owner flag grants no additional access', () => {
  const spoofedParams = {
    isAuthenticated: true,
    userId: 'malicious-user-id',
    email: 'attacker@evil.com',
    role: 'student',
    user_metadata: { isOwner: true, role: 'owner', plan: 'all_access' },
    raw_user_meta_data: { isOwner: true, role: 'owner' },
    ownerConfig: { ownerId: 'legit-owner-uuid' },
  };

  const isOwner = policy.isOwnerIdentity(spoofedParams);
  assert.strictEqual(isOwner, false, 'Spoofed client metadata must be ignored');

  const tier = policy.resolveEntitlementTier(spoofedParams);
  assert.strictEqual(tier, 'free');

  const access = policy.canAccessModule('dl-module-1', tier);
  assert.strictEqual(access.allowed, false);
});

console.log('\n--- [2/5] FREE-USER ENTITLEMENT TESTS ---');

// 5. ML Module 0 accessible
test(5, 'ML Module 0 is accessible to free authenticated users', () => {
  const res = policy.canAccessModule('module-0', 'free');
  assert.strictEqual(res.allowed, true);
  assert.strictEqual(res.reason, 'free_allowlist');
});

// 6. NumPy Module 0 accessible
test(6, 'NumPy Module 0 is accessible to free authenticated users', () => {
  const resCanonical = policy.canAccessModule('numpy-module-1', 'free');
  assert.strictEqual(resCanonical.allowed, true);
  assert.strictEqual(resCanonical.reason, 'free_allowlist');

  const resAlias = policy.canAccessModule('numpy-module-0', 'free');
  assert.strictEqual(resAlias.allowed, true);
});

// 7. Pandas Module 0 accessible
test(7, 'Pandas Module 0 is accessible to free authenticated users', () => {
  const resCanonical = policy.canAccessModule('pandas-module-1', 'free');
  assert.strictEqual(resCanonical.allowed, true);
  assert.strictEqual(resCanonical.reason, 'free_allowlist');

  const resAlias = policy.canAccessModule('pandas-module-0', 'free');
  assert.strictEqual(resAlias.allowed, true);
});

// 8. Python Module 0 accessible
test(8, 'Python Module 0 is accessible to free authenticated users', () => {
  const resCanonical = policy.canAccessModule('python-module-1', 'free');
  assert.strictEqual(resCanonical.allowed, true);
  assert.strictEqual(resCanonical.reason, 'free_allowlist');

  const resAlias = policy.canAccessModule('python-module-0', 'free');
  assert.strictEqual(resAlias.allowed, true);
});

// 9. Java Module 0 accessible
test(9, 'Java Module 0 is accessible to free authenticated users', () => {
  const resCanonical = policy.canAccessModule('java-module-1', 'free');
  assert.strictEqual(resCanonical.allowed, true);
  assert.strictEqual(resCanonical.reason, 'free_allowlist');

  const resAlias = policy.canAccessModule('java-module-0', 'free');
  assert.strictEqual(resAlias.allowed, true);
});

// 10. Later modules in the 5 tracks denied
test(10, 'Later modules in the five permitted tracks are denied to free users', () => {
  const laterModules = [
    // ML later modules
    'module-1', 'module-2', 'module-3', 'module-4', 'module-5', 'module-6', 'module-7', 'module-8', 'module-9', 'module-10', 'module-11',
    // NumPy later modules
    'numpy-module-2', 'numpy-module-3', 'numpy-module-4', 'numpy-module-5', 'numpy-module-6',
    // Pandas later modules
    'pandas-module-2', 'pandas-module-3', 'pandas-module-4', 'pandas-module-9',
    // Python later modules
    'python-module-2', 'python-module-6', 'python-module-9', 'python-module-12',
    // Java later modules
    'java-module-2', 'java-module-6', 'java-module-10', 'java-module-12',
  ];

  for (const m of laterModules) {
    const res = policy.canAccessModule(m, 'free');
    assert.strictEqual(res.allowed, false, `Module ${m} should be locked for free tier`);
    assert.strictEqual(res.reason, 'module_locked');
  }
});

// 11. DSA is denied
test(11, 'All DSA modules are denied to free users', () => {
  for (let i = 1; i <= 12; i++) {
    const res = policy.canAccessModule(`dsa-module-${i}`, 'free');
    assert.strictEqual(res.allowed, false, `DSA module ${i} must be denied`);
  }
});

// 12. Deep Learning is denied
test(12, 'Every Deep Learning module is denied to free users', () => {
  for (let i = 1; i <= 6; i++) {
    const res = policy.canAccessModule(`dl-module-${i}`, 'free');
    assert.strictEqual(res.allowed, false, `Deep learning module ${i} must be denied`);
  }
});

// 13. Transformers and GenAI/LLM modules are denied
test(13, 'Transformers and GenAI/LLM modules are denied to free users', () => {
  for (let i = 1; i <= 15; i++) {
    const tf = policy.canAccessModule(`tf-module-${i}`, 'free');
    assert.strictEqual(tf.allowed, false, `TF module ${i} must be denied`);

    const genai = policy.canAccessModule(`genai-module-${i}`, 'free');
    assert.strictEqual(genai.allowed, false, `GenAI module ${i} must be denied`);
  }
});

// 14. RAG, Agents, MLOps, Deployment and others denied
test(14, 'RAG, AI Agents, MLOps, deployment and other restricted tracks are denied', () => {
  for (let i = 1; i <= 15; i++) {
    const rag = policy.canAccessModule(`rag-module-${i}`, 'free');
    assert.strictEqual(rag.allowed, false);

    const agent = policy.canAccessModule(`agent-module-${i}`, 'free');
    assert.strictEqual(agent.allowed, false);

    const mlops = policy.canAccessModule(`mlops-module-${i}`, 'free');
    assert.strictEqual(mlops.allowed, false);

    const dep = policy.canAccessModule(`deployment-module-${i}`, 'free');
    assert.strictEqual(dep.allowed, false);
  }

  // Deny-by-default on unknown modules
  const unknown = policy.canAccessModule('quantum-computing-101', 'free');
  assert.strictEqual(unknown.allowed, false);
});

console.log('\n--- [3/5] SECURITY & BYPASS PREVENTION TESTS ---');

// 15. Direct restricted lesson URLs denied
test(15, 'Direct restricted lesson URLs are denied on the server', () => {
  const restrictedLessons = [
    { mod: 'module-3', lesson: 'multiple-linear-regression' },
    { mod: 'dl-module-1', lesson: 'dl-01-deep-learning-intro' },
    { mod: 'dsa-module-1', lesson: 'dsa-m1-l1' },
    { mod: 'python-module-2', lesson: 'py-control-flow-conditionals' },
    { mod: 'java-module-2', lesson: 'java-vars-datatypes' },
  ];

  for (const item of restrictedLessons) {
    const res = policy.canAccessLesson(item.mod, item.lesson, 'free');
    assert.strictEqual(res.allowed, false, `Direct lesson access to ${item.mod}/${item.lesson} must be denied`);
    assert.strictEqual(res.reason, 'lesson_locked');
  }
});

// 16. Restricted content APIs do not return lesson bodies
test(16, 'Restricted content API route file enforces server-side 403 denial with no body', () => {
  const apiCode = fs.readFileSync(path.resolve(__dirname, '../src/app/api/curriculum/[moduleId]/[lessonId]/route.ts'), 'utf8');
  assert(apiCode.includes('checkLessonAccessServer'), 'API must check lesson access server-side');
  assert(apiCode.includes('status: 403'), 'API must return 403 for unauthorized requests');
  assert(apiCode.includes('status: 401'), 'API must return 401 for unauthenticated requests');
  assert(apiCode.includes('no-store'), 'API must forbid caching private or restricted content');
});

// 17. Modified client state does not bypass authorization
test(17, 'Modified client state does not bypass server-side authorization', () => {
  const clientPage = fs.readFileSync(path.resolve(__dirname, '../src/app/curriculum/[moduleId]/[lessonId]/page.tsx'), 'utf8');
  assert(!clientPage.includes("'use client'"), 'Lesson page must be a Server Component to prevent client bypass');
  assert(clientPage.includes('checkLessonAccessServer'), 'Lesson page must evaluate access server-side');
  assert(clientPage.includes('<LockedLessonView'), 'Lesson page must render LockedLessonView when unauthorized');
});

// 18. Modified route parameters do not bypass authorization
test(18, 'Modified route parameters resolve canonical module and deny access', () => {
  // Tampered or alias route params
  const tamperedParams = ['MODULE-3', 'module-3-reg', 'dsa-1', 'deep-learning-mod-1', 'numpy-module-2'];
  for (const p of tamperedParams) {
    const res = policy.canAccessModule(p, 'free');
    assert.strictEqual(res.allowed, false, `Route parameter ${p} must not grant bypass`);
  }
});

// 19. User-editable metadata cannot grant owner or paid access
test(19, 'User-editable metadata cannot grant owner or paid access in database trigger', () => {
  const schema = fs.readFileSync(path.resolve(__dirname, '../supabase/schema.sql'), 'utf8');
  assert(schema.includes('prevent_role_tampering'), 'Role tampering function must be present');
  assert(schema.includes('on_profile_role_protection'), 'Role tampering trigger must be registered');
  assert(schema.includes("auth.jwt() ->> 'role' is distinct from 'service_role'"), 'Only service_role can elevate permissions');
});

// 20. Isolation of private user progress
test(20, 'RLS policies ensure user progress and tutor conversations are strictly user-scoped', () => {
  const schema = fs.readFileSync(path.resolve(__dirname, '../supabase/schema.sql'), 'utf8');
  assert(schema.includes('auth.uid() = user_id'), 'Tutor messages and conversations must be scoped to auth.uid()');
  assert(schema.includes('auth.uid() = id'), 'Profiles must be scoped to auth.uid()');
});

console.log('\n--- [4/5] REGRESSION TESTS ---');

// 21. Existing authentication remains functional
test(21, 'Existing authentication handling and session security remains intact', () => {
  const mw = fs.readFileSync(path.resolve(__dirname, '../src/middleware.ts'), 'utf8');
  assert(mw.includes('getUser()'), 'Middleware must authenticate via getUser()');
  assert(mw.includes('isProtectedRoute'), 'Middleware must guard private learning routes');
  assert(mw.includes('redirectTo'), 'Middleware must preserve redirectTo param');
});

// 22. Accessible lessons still render
test(22, 'Accessible free Module 0 lessons are permitted to render', () => {
  const allowedLessons = [
    { mod: 'module-0', lesson: 'ai-ml-dl-foundations' },
    { mod: 'module-0', lesson: 'train-val-test-splits' },
    { mod: 'numpy-module-1', lesson: 'numpy-m1-l1' },
    { mod: 'pandas-module-1', lesson: 'pandas-m1-l1' },
    { mod: 'python-module-1', lesson: 'py-fundamentals-execution-model' },
    { mod: 'java-module-1', lesson: 'java-intro-history' },
  ];

  for (const item of allowedLessons) {
    const res = policy.canAccessLesson(item.mod, item.lesson, 'free');
    assert.strictEqual(res.allowed, true, `Lesson ${item.mod}/${item.lesson} must be allowed on free tier`);
  }
});

// 23. Quiz functionality operational
test(23, 'Quiz functionality and checkpoint scoring operational', () => {
  const quizzesPage = fs.readFileSync(path.resolve(__dirname, '../src/app/quizzes/page.tsx'), 'utf8');
  assert(quizzesPage.includes('recordQuizScore'), 'Quiz page must record scores');
  assert(quizzesPage.includes('QUESTION_BANK'), 'Quiz question bank must exist');
});

// 24. Progress tracking continues to work
test(24, 'Progress tracking storage APIs operate normally', () => {
  const storage = fs.readFileSync(path.resolve(__dirname, '../src/lib/storage.ts'), 'utf8');
  assert(storage.includes('getProgress'), 'Storage must export getProgress');
  assert(storage.includes('saveProgress'), 'Storage must export saveProgress');
  assert(storage.includes('toggleLessonCompletion'), 'Storage must export toggleLessonCompletion');
});

// 25. RLS protections intact and future migration valid
test(25, 'PostgreSQL RLS protections and user_entitlements migration are present', () => {
  const migration = fs.readFileSync(path.resolve(__dirname, '../supabase/migrations/20261103_user_entitlements.sql'), 'utf8');
  assert(migration.includes('alter table public.user_entitlements enable row level security'), 'RLS must be enabled on user_entitlements');
  assert(migration.includes('prevent_entitlement_tampering'), 'Tamper prevention trigger must be attached to user_entitlements');
});

console.log('\n=================================================================');
console.log(` RESULTS: ${passedTests}/25 TESTS PASSED (${failedTests} FAILED)`);
console.log('=================================================================\n');

if (failedTests > 0) {
  process.exit(1);
}

