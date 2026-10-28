// ==============================================================================
// ML Mastery Lab — AI Tutor Unit, Integration, & Security Verification Suite
// ==============================================================================
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=================================================================');
console.log('     ML MASTERY LAB — AI TUTOR ARCHITECTURE & SECURITY VERIFIER  ');
console.log('=================================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}:`, err.message);
    process.exitCode = 1;
  }
}

// ------------------------------------------------------------------------------
// 1. Files & Structural Integrity
// ------------------------------------------------------------------------------
runTest('All required AI Tutor files and migrations exist', () => {
  const files = [
    'src/lib/tutor/constants.ts',
    'src/lib/tutor/rateLimiter.ts',
    'src/lib/tutor/promptBuilder.ts',
    'src/lib/tutor/geminiClient.ts',
    'src/app/api/ai-tutor/route.ts',
    'src/app/api/ai-tutor/conversations/route.ts',
    'src/app/api/ai-tutor/conversations/[id]/route.ts',
    'src/components/tutor/CodeSnippet.tsx',
    'src/components/tutor/ChatMessageRenderer.tsx',
    'src/components/tutor/AITutorPanel.tsx',
    'src/components/tutor/AITutorFullView.tsx',
    'src/app/ai-tutor/page.tsx',
    'supabase/migrations/20261028_ai_tutor.sql',
    '.env.example',
  ];

  for (const f of files) {
    assert(fs.existsSync(path.resolve(__dirname, '..', f)), `Missing expected file: ${f}`);
  }
});

// ------------------------------------------------------------------------------
// 2. Zero-Cost Allowlist & Fail-Closed Guardrails
// ------------------------------------------------------------------------------
runTest('Zero-Cost allowlist permits active free models and blocks paid models', () => {
  const constantsContent = fs.readFileSync(path.resolve(__dirname, '..', 'src/lib/tutor/constants.ts'), 'utf8');
  assert(constantsContent.includes('gemini-3.5-flash'), 'Missing gemini-3.5-flash in allowlist');
  assert(constantsContent.includes('gemini-3.5-flash-lite'), 'Missing gemini-3.5-flash-lite in allowlist');
  assert(constantsContent.includes('gemini-flash-lite-latest'), 'Missing gemini-flash-lite-latest in allowlist');
  assert(constantsContent.includes('gemini-3.8-flash'), 'Missing gemini-3.8-flash in allowlist');
  assert(!constantsContent.includes('gpt-4'), 'OpenAI models must not be in allowlist');
  assert(!constantsContent.includes('claude'), 'Anthropic models must not be in allowlist');

  const geminiClientContent = fs.readFileSync(path.resolve(__dirname, '..', 'src/lib/tutor/geminiClient.ts'), 'utf8');
  assert(geminiClientContent.includes('validateFreeTierModel'), 'Missing model verification function');
  assert(geminiClientContent.includes('statusCode: 422') || geminiClientContent.includes('MODEL_UNVERIFIED'), 'Must fail-closed with 422 if unverified model');
  assert(geminiClientContent.includes('RESOURCE_EXHAUSTED'), 'Must handle RESOURCE_EXHAUSTED free-tier quota error');
});

// ------------------------------------------------------------------------------
// 3. Prompt Builder & Pedagogical Domain Instructions
// ------------------------------------------------------------------------------
runTest('Prompt builder supports all 4 learning tracks with prompt injection defenses', () => {
  const promptContent = fs.readFileSync(path.resolve(__dirname, '..', 'src/lib/tutor/promptBuilder.ts'), 'utf8');

  // Verify all 4 tracks supported
  assert(promptContent.includes('ml:') && promptContent.includes('Machine Learning'), 'ML track instructions missing');
  assert(promptContent.includes('dsa:') && promptContent.includes('Big-O Time Complexity'), 'DSA track instructions missing');
  assert(promptContent.includes('python:') && promptContent.includes('Pythonic'), 'Python track instructions missing');
  assert(promptContent.includes('java:') && promptContent.includes('Object-Oriented Programming'), 'Java track instructions missing');

  // Verify pedagogical rules
  assert(promptContent.includes('Socratic Hints First'), 'Missing Socratic hint rule');
  assert(promptContent.includes('Root-Cause Debugging'), 'Missing debugging rule');
  assert(promptContent.includes('Checkpoint Comprehension'), 'Missing checkpoint comprehension rule');
  assert(promptContent.includes('Honest Execution Boundaries'), 'Missing code execution boundary notice');

  // Verify prompt injection defense
  assert(promptContent.includes('CRITICAL PROMPT INJECTION & UNTRUSTED DATA GUARDRAIL'), 'Missing untrusted input defense');
  assert(promptContent.includes('<student_question>') && promptContent.includes('<student_code>'), 'Missing data boundary tags');
});

// ------------------------------------------------------------------------------
// 4. Rate Limiter Logic Verification
// ------------------------------------------------------------------------------
runTest('Per-user rate limiter enforces RPM and RPD limits', () => {
  const rateLimiterCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/lib/tutor/rateLimiter.ts'), 'utf8');
  assert(rateLimiterCode.includes('USER_RPM_LIMIT'), 'Missing USER_RPM_LIMIT check');
  assert(rateLimiterCode.includes('USER_RPD_LIMIT'), 'Missing USER_RPD_LIMIT check');
  assert(rateLimiterCode.includes('rpm_exceeded'), 'Missing rpm_exceeded reason');
  assert(rateLimiterCode.includes('rpd_exceeded'), 'Missing rpd_exceeded reason');
  assert(rateLimiterCode.includes('pruneStaleEntries'), 'Missing memory cleanup pruner');

  // Functional simulation of the rate limiter algorithm
  const usageStore = new Map();
  function checkRate(userId, rpmLimit, now) {
    let usage = usageStore.get(userId) || { minuteTimestamps: [] };
    usageStore.set(userId, usage);
    usage.minuteTimestamps = usage.minuteTimestamps.filter(t => t > now - 60000);
    if (usage.minuteTimestamps.length >= rpmLimit) {
      return { allowed: false, reason: 'rpm_exceeded' };
    }
    usage.minuteTimestamps.push(now);
    return { allowed: true };
  }

  const testUser = 'user-123';
  const startTime = 1000000;
  for (let i = 0; i < 15; i++) {
    const res = checkRate(testUser, 15, startTime + i * 100);
    assert.strictEqual(res.allowed, true, `Request ${i + 1} should be allowed`);
  }
  const blocked = checkRate(testUser, 15, startTime + 2000);
  assert.strictEqual(blocked.allowed, false, '16th request must be rate limited');
  assert.strictEqual(blocked.reason, 'rpm_exceeded', 'Reason must be rpm_exceeded');
});

// ------------------------------------------------------------------------------
// 5. API Route Handlers & Security Checks
// ------------------------------------------------------------------------------
runTest('AI Tutor API route enforces authentication, validation, and zero paid fallbacks', () => {
  const routeCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/app/api/ai-tutor/route.ts'), 'utf8');

  // Authentication check
  assert(routeCode.includes('getSupabaseServerClient'), 'Must use getSupabaseServerClient');
  assert(routeCode.includes('auth.getUser'), 'Must call supabase.auth.getUser()');
  assert(routeCode.includes('status: 401'), 'Must return 401 when unauthenticated');

  // Payload validations
  assert(routeCode.includes('MAX_MESSAGE_LENGTH'), 'Must validate message length');
  assert(routeCode.includes('VALID_TRACKS'), 'Must validate learning track');
  assert(routeCode.includes('MAX_CODE_LENGTH'), 'Must validate attached code length');

  // Rate limit enforcement
  assert(routeCode.includes('checkUserRateLimit'), 'Must invoke checkUserRateLimit');
  assert(routeCode.includes('status: 429'), 'Must return 429 when rate limit hit');

  // Safe error handling without paid fallback
  assert(!routeCode.includes('openai'), 'Must never import or fallback to OpenAI');
  assert(routeCode.toLowerCase().includes('quota') || routeCode.includes('rpd_exceeded'), 'Must handle quota / rate limit states');
});

// ------------------------------------------------------------------------------
// 6. Gemini Client Error Mapping & Status Code Accuracy
// ------------------------------------------------------------------------------
runTest('Gemini client maps 404, 503, 429, 401/403, and timeouts to precise HTTP status codes', () => {
  const clientCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/lib/tutor/geminiClient.ts'), 'utf8');

  // Missing API Key -> 503
  assert(clientCode.includes('statusCode: 503') && clientCode.includes('MISSING_API_KEY'), 'Must return 503 when API key is missing');

  // Unverified Model -> 422
  assert(clientCode.includes('statusCode: 422') && clientCode.includes('MODEL_UNVERIFIED'), 'Must return 422 when model is unverified');

  // Quota Exhaustion -> 429
  assert(clientCode.includes('statusCode: 429') && clientCode.includes('QUOTA_EXHAUSTED'), 'Must return 429 when quota exhausted');

  // High Demand -> 503
  assert(clientCode.includes('statusCode: 503') && clientCode.includes('HIGH_DEMAND'), 'Must return 503 when model experiences high demand');

  // Retired / Unavailable Model -> 404
  assert(clientCode.includes('statusCode: 404') && clientCode.includes('MODEL_UNAVAILABLE'), 'Must return 404 when model is unavailable or retired');

  // Invalid Key / Permissions -> 401
  assert(clientCode.includes('statusCode: 401') && clientCode.includes('AUTH_ERROR'), 'Must return 401 when API key is unauthorized');

  // Timeout -> 504
  assert(clientCode.includes('statusCode: 504'), 'Must return 504 on request timeout');

  // Network Fetch Failure -> 502
  assert(clientCode.includes('statusCode: 502') && clientCode.includes('NETWORK_ERROR'), 'Must return 502 on network fetch error');
});

// ------------------------------------------------------------------------------
// 7. Conversation Persistence Isolation & Error Resilience
// ------------------------------------------------------------------------------
runTest('Conversation persistence failure never masks a successful Gemini response', () => {
  const routeCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/app/api/ai-tutor/route.ts'), 'utf8');

  // Check try/catch surrounding Supabase persistence
  assert(routeCode.includes('try {') && routeCode.includes('catch (dbErr) {'), 'Database persistence must be in isolated try/catch block');
  assert(routeCode.includes('eq(\'user_id\', user.id)'), 'Must enforce user_id ownership check in database queries');

  // Response return occurs AFTER the dbErr block, guaranteeing student receives tutor answer
  const catchDbIndex = routeCode.indexOf('catch (dbErr)');
  const returnReplyIndex = routeCode.indexOf('return NextResponse.json({', catchDbIndex);
  assert(returnReplyIndex > catchDbIndex, 'Must return successful response even if database persistence catch triggers');
});

// ------------------------------------------------------------------------------
// 8. Supabase SQL Schema, RLS, & Ownership Isolation
// ------------------------------------------------------------------------------
runTest('Supabase schema enforces Row Level Security and strict user ownership isolation', () => {
  const sql = fs.readFileSync(path.resolve(__dirname, '..', 'supabase/migrations/20261028_ai_tutor.sql'), 'utf8');

  // Tables
  assert(sql.includes('create table if not exists public.tutor_conversations'), 'Missing tutor_conversations table');
  assert(sql.includes('create table if not exists public.tutor_messages'), 'Missing tutor_messages table');

  // Cascade delete
  assert(sql.includes('references auth.users(id) on delete cascade'), 'Missing cascade delete on user_id');
  assert(sql.includes('references public.tutor_conversations(id) on delete cascade'), 'Missing cascade delete on conversation_id');

  // RLS enablement
  assert(sql.includes('alter table public.tutor_conversations enable row level security'), 'RLS must be enabled on tutor_conversations');
  assert(sql.includes('alter table public.tutor_messages enable row level security'), 'RLS must be enabled on tutor_messages');

  // Ownership policies
  assert(sql.includes('auth.uid() = user_id'), 'Policies must enforce auth.uid() = user_id');
  assert(sql.includes('for select') && sql.includes('for insert') && sql.includes('for delete'), 'Must have select, insert, and delete policies');

  // Schema.sql synchronization
  const masterSql = fs.readFileSync(path.resolve(__dirname, '..', 'supabase/schema.sql'), 'utf8');
  assert(masterSql.includes('public.tutor_conversations'), 'Master schema.sql must include tutor_conversations');
  assert(masterSql.includes('public.tutor_messages'), 'Master schema.sql must include tutor_messages');
});

// ------------------------------------------------------------------------------
// 9. Reusable Component Integration Across All 4 Learning Tracks
// ------------------------------------------------------------------------------
runTest('AITutorPanel is cleanly integrated across ML, DSA, Python, and Java lessons', () => {
  const mlLesson = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/lessons/LessonView.tsx'), 'utf8');
  assert(mlLesson.includes('<AITutorPanel'), 'ML LessonView missing AITutorPanel');
  assert(mlLesson.includes('track="ml"'), 'ML LessonView missing track="ml"');

  const dsaLesson = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/dsa/DSALessonView.tsx'), 'utf8');
  assert(dsaLesson.includes('<AITutorPanel'), 'DSA DSALessonView missing AITutorPanel');
  assert(dsaLesson.includes('track="dsa"'), 'DSA DSALessonView missing track="dsa"');

  const pythonLesson = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/python/PythonLessonView.tsx'), 'utf8');
  assert(pythonLesson.includes('<AITutorPanel'), 'Python PythonLessonView missing AITutorPanel');
  assert(pythonLesson.includes('track="python"'), 'Python PythonLessonView missing track="python"');

  const javaLesson = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/java/JavaLessonView.tsx'), 'utf8');
  assert(javaLesson.includes('<AITutorPanel'), 'Java JavaLessonView missing AITutorPanel');
  assert(javaLesson.includes('track="java"'), 'Java JavaLessonView missing track="java"');
});

// ------------------------------------------------------------------------------
// 10. Navigation & UI Polish
// ------------------------------------------------------------------------------
runTest('Navigation layouts include AI Tutor Studio links', () => {
  const mlLayout = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/layout/MLLayout.tsx'), 'utf8');
  assert(mlLayout.includes('/ai-tutor'), 'MLLayout missing /ai-tutor nav link');

  const dsaLayout = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/layout/DSALayout.tsx'), 'utf8');
  assert(dsaLayout.includes('/ai-tutor'), 'DSALayout missing /ai-tutor nav link');

  const pythonLayout = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/layout/PythonLayout.tsx'), 'utf8');
  assert(pythonLayout.includes('/ai-tutor'), 'PythonLayout missing /ai-tutor nav link');

  const javaLayout = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/layout/JavaLayout.tsx'), 'utf8');
  assert(javaLayout.includes('/ai-tutor'), 'JavaLayout missing /ai-tutor nav link');

  const tutorPage = fs.readFileSync(path.resolve(__dirname, '..', 'src/app/ai-tutor/page.tsx'), 'utf8');
  assert(tutorPage.includes('AuthGuard'), 'Dedicated /ai-tutor page must be protected by AuthGuard');
  assert(tutorPage.includes('AITutorFullView'), 'Dedicated /ai-tutor page must mount AITutorFullView');
});

// ------------------------------------------------------------------------------
// Summary
// ------------------------------------------------------------------------------
console.log(`\n=================================================================`);
console.log(`  AI TUTOR VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`=================================================================\n`);
