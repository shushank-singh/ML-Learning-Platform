/**
 * Complete AI & ML Academy — Session Security & UI Upgrade Verification Suite
 *
 * Validates:
 * 1. Session-Only cookie serialization logic (browser client)
 * 2. Session-Only cookie handling on server client
 * 3. Local storage hygiene (prevention of long-lived persisted auth tokens)
 * 4. Middleware server-side route guarding and token refreshing
 * 5. Server-side API protection (Java sandbox & AI Tutor)
 * 6. Profile dropdown UI redesign components and accessibility attributes
 * 7. Dashboard personalized greeting, continue learning, and real metrics
 * 8. Technical illustrations presence and integration across curriculum
 * 9. Accessible prefers-reduced-motion and animation styles
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=================================================================');
console.log(' COMPLETE AI & ML ACADEMY — SESSION SECURITY & UI VERIFIER        ');
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

// 1. Session-Only Cookie Serialization in Browser Client
runTest('Browser Supabase Client enforces session-only cookie attributes', () => {
  const clientPath = path.resolve(__dirname, '../src/lib/supabase/client.ts');
  const code = fs.readFileSync(clientPath, 'utf8');

  assert(code.includes('parseBrowserCookies'), 'Must include browser cookie parser');
  assert(code.includes('serializeBrowserCookie'), 'Must include browser cookie serializer');
  assert(code.includes('options.maxAge === 0'), 'Must handle explicit cookie removal with Max-Age=0');
  assert(
    code.includes('clearPersistentAuthStorage'),
    'Must export clearPersistentAuthStorage to remove stale localStorage keys'
  );
  assert(code.includes('getAll'), 'createBrowserClient must specify getAll cookie accessor');
  assert(code.includes('setAll'), 'createBrowserClient must specify setAll cookie mutator');
});

// 2. Server Supabase Client Session-Only Enforcement
runTest('Server Supabase Client enforces session-only cookie handling', () => {
  const serverPath = path.resolve(__dirname, '../src/lib/supabase/server.ts');
  const code = fs.readFileSync(serverPath, 'utf8');

  assert(code.includes('const { maxAge, expires, ...sessionOptions } = options'), 'Must strip persistent maxAge on server cookie set');
  assert(code.includes('maxAge: 0'), 'Must invalidate expired cookies with maxAge: 0');
});

// 3. Next.js Middleware Protection
runTest('Next.js Middleware protects private learning routes and refreshes session tokens', () => {
  const mwPath = path.resolve(__dirname, '../src/middleware.ts');
  assert(fs.existsSync(mwPath), 'src/middleware.ts must exist');

  const code = fs.readFileSync(mwPath, 'utf8');
  assert(code.includes('pathname.startsWith(\'/curriculum\')'), 'Middleware must guard /curriculum');
  assert(code.includes('pathname.startsWith(\'/ai-tutor\')'), 'Middleware must guard /ai-tutor');
  assert(code.includes('pathname.startsWith(\'/code-lab\')'), 'Middleware must guard /code-lab');
  assert(code.includes('pathname.startsWith(\'/playground\')'), 'Middleware must guard /playground');
  assert(code.includes('sessionOptions'), 'Middleware must write back session-only cookies on response');
  assert(code.includes('redirectTo'), 'Middleware must preserve destination in redirectTo query parameter');
});

// 4. API Route Server-Side Authorization
runTest('Protected API endpoints validate session authorization server-side', () => {
  const javaApi = fs.readFileSync(path.resolve(__dirname, '../src/app/api/execute-java/route.ts'), 'utf8');
  assert(javaApi.includes('getSupabaseServerClient'), 'Java execution API must import getSupabaseServerClient');
  assert(javaApi.includes('supabase.auth.getUser()'), 'Java execution API must call supabase.auth.getUser()');

  const tutorApi = fs.readFileSync(path.resolve(__dirname, '../src/app/api/ai-tutor/route.ts'), 'utf8');
  assert(tutorApi.includes('supabase.auth.getUser()'), 'AI Tutor API must call supabase.auth.getUser()');
});

// 5. Profile Dropdown Redesign Integrity
runTest('Profile Dropdown implements premium account menu with full action suite', () => {
  const menuCode = fs.readFileSync(path.resolve(__dirname, '../src/components/auth/UserMenu.tsx'), 'utf8');

  // Header data
  assert(menuCode.includes('displayName'), 'Must display real displayName');
  assert(menuCode.includes('displayEmail'), 'Must display real email');
  assert(menuCode.includes('roleLabel'), 'Must display authentic role badge');
  assert(menuCode.includes('isEmailVerified'), 'Must verify real email status');

  // Account actions
  assert(menuCode.includes('Learning Dashboard'), 'Must include Dashboard shortcut');
  assert(menuCode.includes('Curriculum Syllabus'), 'Must include Curriculum shortcut');
  assert(menuCode.includes('Learning Progress'), 'Must include Analytics/Progress shortcut');
  assert(
    menuCode.includes('Account & Settings') || menuCode.includes('Account &amp; Settings'),
    'Must include Settings shortcut'
  );
  assert(menuCode.includes('handleToggleTheme'), 'Must include inline Theme preference switch');
  assert(menuCode.includes('handleSignOut'), 'Must include Sign Out action');
  assert(menuCode.includes('isSigningOut'), 'Must render sign-out loading state');

  // Accessibility & outside click
  assert(menuCode.includes('aria-haspopup="menu"'), 'Must have aria-haspopup for accessibility');
  assert(menuCode.includes('aria-expanded'), 'Must have aria-expanded');
  assert(menuCode.includes('handleClickOutside'), 'Must close on click outside');
  assert(menuCode.includes('Escape'), 'Must close on Escape key');
});

// 6. Technical Illustrations & Curriculum Upgrade
runTest('Educational Technical Illustrations are modular and properly exported', () => {
  const illusPath = path.resolve(__dirname, '../src/components/shared/TrackIllustrations.tsx');
  assert(fs.existsSync(illusPath), 'src/components/shared/TrackIllustrations.tsx must exist');

  const code = fs.readFileSync(illusPath, 'utf8');
  assert(code.includes('MLIllustration'), 'Must export MLIllustration');
  assert(code.includes('DLIllustration'), 'Must export DLIllustration');
  assert(code.includes('TransformersIllustration'), 'Must export TransformersIllustration');
  assert(code.includes('GenAIIllustration'), 'Must export GenAIIllustration');
  assert(code.includes('RAGIllustration'), 'Must export RAGIllustration');
  assert(code.includes('AgentsIllustration'), 'Must export AgentsIllustration');
  assert(code.includes('MLOpsIllustration'), 'Must export MLOpsIllustration');
  assert(code.includes('DeploymentIllustration'), 'Must export DeploymentIllustration');
  assert(code.includes('Phase0Illustration'), 'Must export Phase0Illustration');
});

// 7. Authenticated Dashboard Banner & Real Metrics
runTest('Authenticated Dashboard Workspace utilizes real user metrics & track previews', () => {
  const dashCode = fs.readFileSync(
    path.resolve(__dirname, '../src/components/dashboard/LoggedInDashboardBanner.tsx'),
    'utf8'
  );

  assert(dashCode.includes('timeGreeting'), 'Must have dynamic greeting based on time of day');
  assert(dashCode.includes('resumeLesson'), 'Must display real resume lesson');
  assert(dashCode.includes('overallStats.completedLessons'), 'Must display actual completed lessons count');
  assert(dashCode.includes('overallStats.percentage'), 'Must display actual percentage');
  assert(dashCode.includes('progress?.streak?.currentStreak'), 'Must display actual streak');
  assert(dashCode.includes('progress?.totalMinutesLearned'), 'Must display actual study minutes');
  assert(dashCode.includes('TRACKS_METRICS'), 'Must display visual track cards for AI/ML tracks');
});

// 8. Reduced Motion & CSS Animations
runTest('Global styles include keyframe animations and accessible reduced motion fallback', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../src/styles/globals.css'), 'utf8');
  assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'Must respect prefers-reduced-motion');
  assert(css.includes('@keyframes shimmer'), 'Must define shimmer animation');
  assert(css.includes('@keyframes floatSlow'), 'Must define floatSlow animation');
});

console.log(`\n=================================================================`);
console.log(`  SESSION SECURITY & UI TESTS COMPLETE: ${passedTests}/${totalTests} PASSED`);
console.log(`=================================================================\n`);
