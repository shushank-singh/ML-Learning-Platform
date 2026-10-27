// Auth Module Unit & Security Verification Suite
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=================================================================');
console.log('     ML MASTERY LAB — SUPABASE AUTH & SECURITY VERIFIER          ');
console.log('=================================================================\n');

let passedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}:`, err.message);
    process.exitCode = 1;
  }
}

// 1. Files exist
runTest('All required authentication files exist', () => {
  const files = [
    '.env.example',
    'supabase/schema.sql',
    'src/lib/supabase/client.ts',
    'src/lib/supabase/server.ts',
    'src/context/AuthContext.tsx',
    'src/components/auth/AuthGuard.tsx',
    'src/components/auth/UserMenu.tsx',
    'src/components/auth/GoogleButton.tsx',
    'src/app/login/page.tsx',
    'src/app/signup/page.tsx',
    'src/app/forgot-password/page.tsx',
    'src/app/reset-password/page.tsx',
    'src/app/auth/callback/route.ts',
    'src/app/auth/verify-email/page.tsx',
  ];
  for (const f of files) {
    assert(fs.existsSync(path.resolve(__dirname, '..', f)), `Missing expected file: ${f}`);
  }
});

// 2. Schema verification
runTest('SQL Schema has RLS, triggers, and anti-tamper functions', () => {
  const sql = fs.readFileSync(path.resolve(__dirname, '..', 'supabase/schema.sql'), 'utf8');
  assert(sql.includes('create table if not exists public.profiles'), 'Missing profiles table definition');
  assert(sql.includes('alter table public.profiles enable row level security'), 'RLS not enabled on profiles');
  assert(sql.includes('prevent_role_tampering'), 'Missing role tampering protection trigger function');
  assert(sql.includes('handle_new_user'), 'Missing new user profile auto-creation trigger function');
  assert(sql.includes('is_owner'), 'Missing is_owner helper function');
  assert(sql.includes('is_admin'), 'Missing is_admin helper function');
  assert(sql.includes("role text not null default 'student' check (role in ('student', 'owner', 'admin'))"), 'Missing role enum check constraint');
});

// 3. Env and Git safety
runTest('.env.example contains safe placeholders and .gitignore protects secrets', () => {
  const envExample = fs.readFileSync(path.resolve(__dirname, '..', '.env.example'), 'utf8');
  assert(envExample.includes('NEXT_PUBLIC_SUPABASE_URL'), 'Missing NEXT_PUBLIC_SUPABASE_URL in .env.example');
  assert(envExample.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY'), 'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.example');
  assert(!envExample.includes('SERVICE_ROLE_KEY='), 'SERVICE_ROLE_KEY must not have a value in .env.example');

  const gitignore = fs.readFileSync(path.resolve(__dirname, '..', '.gitignore'), 'utf8');
  assert(gitignore.includes('.env.local'), '.gitignore must exclude .env.local');
  assert(gitignore.includes('.env'), '.gitignore must exclude .env');
});

// 4. Open Redirect Protection in Auth Callback
runTest('Auth Callback validates relative redirects to prevent open-redirect vulnerabilities', () => {
  const callbackCode = fs.readFileSync(path.resolve(__dirname, '..', 'src/app/auth/callback/route.ts'), 'utf8');
  assert(callbackCode.includes("next.startsWith('/') && !next.startsWith('//')"), 'Missing open redirect check in callback');
});

// 5. App Router integration
runTest('Layouts wire AuthGuard and UserMenu cleanly', () => {
  const mlLayout = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/layout/MLLayout.tsx'), 'utf8');
  assert(mlLayout.includes('<AuthGuard>'), 'MLLayout must wrap content with AuthGuard');
  assert(mlLayout.includes('<UserMenu />'), 'MLLayout must include UserMenu');

  const dsaLayout = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/layout/DSALayout.tsx'), 'utf8');
  assert(dsaLayout.includes('<AuthGuard>'), 'DSALayout must wrap content with AuthGuard');
  assert(dsaLayout.includes('<UserMenu />'), 'DSALayout must include UserMenu');

  const pythonLayout = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/layout/PythonLayout.tsx'), 'utf8');
  assert(pythonLayout.includes('<AuthGuard>'), 'PythonLayout must wrap content with AuthGuard');
  assert(pythonLayout.includes('<UserMenu />'), 'PythonLayout must include UserMenu');

  const javaLayout = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/layout/JavaLayout.tsx'), 'utf8');
  assert(javaLayout.includes('<AuthGuard>'), 'JavaLayout must wrap content with AuthGuard');
  assert(javaLayout.includes('<UserMenu />'), 'JavaLayout must include UserMenu');

  const landingLayout = fs.readFileSync(path.resolve(__dirname, '..', 'src/components/layout/LandingLayout.tsx'), 'utf8');
  assert(landingLayout.includes('UserMenu'), 'LandingLayout must include UserMenu');
});

console.log(`\n=================================================================`);
console.log(`  AUTH VERIFICATION COMPLETE: ${passedTests}/5 TESTS PASSED`);
console.log(`=================================================================\n`);

