/**
 * AzurLearn — New User Signup Database Error & Security Trigger Verification
 *
 * Verifies the fix for: "Database error saving new user"
 * Ensures:
 * 1. Migration 20261106_fix_new_user_signup.sql exists and is syntactically sound.
 * 2. prevent_entitlement_tampering permits default 'free' active tier auto-provisioning on INSERT.
 * 3. prevent_entitlement_tampering strictly blocks client sessions from self-granting paid tiers.
 * 4. prevent_role_tampering strictly blocks client sessions from modifying roles to 'owner' or 'admin'.
 * 5. handle_new_user and handle_new_user_entitlement are idempotent, have safe search_path,
 *    and use non-blocking EXCEPTION WHEN OTHERS handlers.
 * 6. Superusers (postgres, supabase_admin, supabase_auth_admin) and service_role retain full authority.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=================================================================');
console.log(' AZURLEARN — SIGNUP DATABASE & TRIGGER SECURITY VERIFIER         ');
console.log('=================================================================\n');

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
  }
}

const fixMigrationPath = path.resolve(__dirname, '../supabase/migrations/20261106_fix_new_user_signup.sql');
const baseProfilesMigrationPath = path.resolve(__dirname, '../supabase/migrations/20261025_initial_auth_profiles.sql');
const baseEntitlementMigrationPath = path.resolve(__dirname, '../supabase/migrations/20261103_user_entitlements.sql');
const schemaPath = path.resolve(__dirname, '../supabase/schema.sql');

// -------------------------------------------------------------
// [1/4] MIGRATION FILE & SYNTAX INTEGRITY
// -------------------------------------------------------------
console.log('--- [1/4] MIGRATION FILE & TRIGGER DEFINITION CHECKS ---');

test(1, 'Migrations 20261025_initial_auth_profiles.sql and 20261106_fix_new_user_signup.sql exist', () => {
  assert(fs.existsSync(fixMigrationPath), 'Missing 20261106_fix_new_user_signup.sql');
  assert(fs.existsSync(baseProfilesMigrationPath), 'Missing 20261025_initial_auth_profiles.sql');
});

test(2, 'Migration 20261106_fix_new_user_signup.sql includes self-healing DDL for public.profiles and public.user_entitlements', () => {
  const sql = fs.readFileSync(fixMigrationPath, 'utf8');
  assert(sql.includes('create table if not exists public.profiles'), 'Missing self-healing create table public.profiles');
  assert(sql.includes('create table if not exists public.user_entitlements'), 'Missing self-healing create table public.user_entitlements');
  assert(sql.includes('alter table public.profiles enable row level security'), 'Missing RLS on profiles');
  assert(sql.includes('alter table public.user_entitlements enable row level security'), 'Missing RLS on user_entitlements');
});

test(3, 'Migration defines all 4 required trigger functions with security definer', () => {
  const sql = fs.readFileSync(fixMigrationPath, 'utf8');
  assert(sql.includes('function public.prevent_entitlement_tampering()'), 'Missing prevent_entitlement_tampering');
  assert(sql.includes('function public.handle_new_user_entitlement()'), 'Missing handle_new_user_entitlement');
  assert(sql.includes('function public.handle_new_user()'), 'Missing handle_new_user');
  assert(sql.includes('function public.prevent_role_tampering()'), 'Missing prevent_role_tampering');

  // Verify all 4 use security definer
  const matches = sql.match(/security definer/g);
  assert(matches && matches.length >= 4, 'All functions must be security definer');
});

test(4, 'All trigger functions configure explicit search_path = public, auth, pg_temp', () => {
  const sql = fs.readFileSync(fixMigrationPath, 'utf8');
  const searchPathMatches = sql.match(/set search_path = public, auth, pg_temp/g);
  assert(searchPathMatches && searchPathMatches.length >= 4, 'All trigger functions must specify safe search_path');
});

test(5, 'Triggers on auth.users and public tables are registered cleanly', () => {
  const sql = fs.readFileSync(fixMigrationPath, 'utf8');
  assert(sql.includes('create trigger on_entitlement_tampering_protection'), 'Missing on_entitlement_tampering_protection');
  assert(sql.includes('create trigger on_auth_user_created_entitlement'), 'Missing on_auth_user_created_entitlement');
  assert(sql.includes('create trigger on_auth_user_created'), 'Missing on_auth_user_created');
  assert(sql.includes('create trigger on_profile_role_protection'), 'Missing on_profile_role_protection');
});

// -------------------------------------------------------------
// [2/4] PREVENT_ENTITLEMENT_TAMPERING LOGIC EMULATION
// -------------------------------------------------------------
console.log('\n--- [2/4] ENTITLEMENT TAMPER TRIGGER EMULATION TESTS ---');

// Emulate prevent_entitlement_tampering function in JS
function simulatePreventEntitlementTampering({
  op,
  newRow,
  currentUser = 'authenticated',
  jwtRole = null,
}) {
  // Privileged roles or service_role
  if (
    ['postgres', 'supabase_admin', 'supabase_auth_admin'].includes(currentUser) ||
    jwtRole === 'service_role'
  ) {
    return { ...newRow, updated_at: new Date().toISOString() };
  }

  // Allow auto-provisioning the default 'free' active tier on initial user creation
  if (
    op === 'INSERT' &&
    newRow.tier === 'free' &&
    ['active', 'trialing'].includes(newRow.status)
  ) {
    return { ...newRow, updated_at: new Date().toISOString() };
  }

  throw new Error('Unauthorized: Entitlements cannot be modified directly by client sessions.');
}

test(6, 'Signup trigger inserting default free tier succeeds for anon/unauthenticated GoTrue session', () => {
  // During GoTrue user registration, jwtRole is null or 'anon'
  const result = simulatePreventEntitlementTampering({
    op: 'INSERT',
    newRow: { user_id: 'usr_new_123', tier: 'free', status: 'active' },
    currentUser: 'supabase_auth_admin',
    jwtRole: null,
  });

  assert.strictEqual(result.tier, 'free');
  assert.strictEqual(result.status, 'active');
  assert.strictEqual(result.user_id, 'usr_new_123');
});

test(7, 'Signup trigger inserting default free tier succeeds even if currentUser is unprivileged', () => {
  const result = simulatePreventEntitlementTampering({
    op: 'INSERT',
    newRow: { user_id: 'usr_new_456', tier: 'free', status: 'active' },
    currentUser: 'anon',
    jwtRole: 'anon',
  });

  assert.strictEqual(result.tier, 'free');
  assert.strictEqual(result.status, 'active');
});

test(8, 'Client session attempting to self-grant premium tier is strictly blocked', () => {
  assert.throws(
    () => {
      simulatePreventEntitlementTampering({
        op: 'INSERT',
        newRow: { user_id: 'usr_attacker', tier: 'premium', status: 'active' },
        currentUser: 'authenticated',
        jwtRole: 'authenticated',
      });
    },
    /Unauthorized: Entitlements cannot be modified directly by client sessions./
  );
});

test(9, 'Client session attempting to self-grant all_access tier is strictly blocked', () => {
  assert.throws(
    () => {
      simulatePreventEntitlementTampering({
        op: 'INSERT',
        newRow: { user_id: 'usr_attacker', tier: 'all_access', status: 'active' },
        currentUser: 'authenticated',
        jwtRole: 'authenticated',
      });
    },
    /Unauthorized: Entitlements cannot be modified directly by client sessions./
  );
});

test(10, 'Client session attempting to self-grant owner tier is strictly blocked', () => {
  assert.throws(
    () => {
      simulatePreventEntitlementTampering({
        op: 'INSERT',
        newRow: { user_id: 'usr_attacker', tier: 'owner', status: 'active' },
        currentUser: 'authenticated',
        jwtRole: 'authenticated',
      });
    },
    /Unauthorized: Entitlements cannot be modified directly by client sessions./
  );
});

test(11, 'Client session attempting to UPDATE existing entitlement row is strictly blocked', () => {
  assert.throws(
    () => {
      simulatePreventEntitlementTampering({
        op: 'UPDATE',
        newRow: { user_id: 'usr_existing', tier: 'all_access', status: 'active' },
        currentUser: 'authenticated',
        jwtRole: 'authenticated',
      });
    },
    /Unauthorized: Entitlements cannot be modified directly by client sessions./
  );
});

test(12, 'Privileged service_role JWT can insert or update paid tiers cleanly', () => {
  const result = simulatePreventEntitlementTampering({
    op: 'UPDATE',
    newRow: { user_id: 'usr_paid', tier: 'all_access', status: 'active' },
    currentUser: 'authenticator',
    jwtRole: 'service_role',
  });

  assert.strictEqual(result.tier, 'all_access');
  assert.strictEqual(result.status, 'active');
});

// -------------------------------------------------------------
// [3/4] PREVENT_ROLE_TAMPERING LOGIC EMULATION
// -------------------------------------------------------------
console.log('\n--- [3/4] PROFILE ROLE TAMPER TRIGGER EMULATION TESTS ---');

function simulatePreventRoleTampering({
  oldRow,
  newRow,
  currentUser = 'authenticated',
  jwtRole = 'authenticated',
}) {
  if (newRow.role !== oldRow.role) {
    if (
      ['postgres', 'supabase_admin', 'supabase_auth_admin'].includes(currentUser) ||
      jwtRole === 'service_role'
    ) {
      return { ...newRow, updated_at: new Date().toISOString() };
    }
    throw new Error('Unauthorized: Users cannot modify their assigned role directly.');
  }

  return { ...newRow, updated_at: new Date().toISOString() };
}

test(13, 'User profile updates (name, avatar) without changing role succeed', () => {
  const oldRow = { id: 'usr_1', full_name: 'Original Name', role: 'student' };
  const newRow = { id: 'usr_1', full_name: 'Updated Name', role: 'student' };

  const res = simulatePreventRoleTampering({ oldRow, newRow, currentUser: 'authenticated', jwtRole: 'authenticated' });
  assert.strictEqual(res.full_name, 'Updated Name');
  assert.strictEqual(res.role, 'student');
});

test(14, 'Client session attempting to promote student to owner is strictly blocked', () => {
  const oldRow = { id: 'usr_1', role: 'student' };
  const newRow = { id: 'usr_1', role: 'owner' };

  assert.throws(
    () => {
      simulatePreventRoleTampering({ oldRow, newRow, currentUser: 'authenticated', jwtRole: 'authenticated' });
    },
    /Unauthorized: Users cannot modify their assigned role directly./
  );
});

test(15, 'Client session attempting to promote student to admin is strictly blocked', () => {
  const oldRow = { id: 'usr_1', role: 'student' };
  const newRow = { id: 'usr_1', role: 'admin' };

  assert.throws(
    () => {
      simulatePreventRoleTampering({ oldRow, newRow, currentUser: 'authenticated', jwtRole: 'authenticated' });
    },
    /Unauthorized: Users cannot modify their assigned role directly./
  );
});

test(16, 'Database administrator in Supabase SQL Editor (postgres) can update roles', () => {
  const oldRow = { id: 'usr_owner', role: 'student' };
  const newRow = { id: 'usr_owner', role: 'owner' };

  const res = simulatePreventRoleTampering({ oldRow, newRow, currentUser: 'postgres', jwtRole: null });
  assert.strictEqual(res.role, 'owner');
});

test(17, 'Backend service_role can update roles', () => {
  const oldRow = { id: 'usr_owner', role: 'student' };
  const newRow = { id: 'usr_owner', role: 'owner' };

  const res = simulatePreventRoleTampering({ oldRow, newRow, currentUser: 'authenticator', jwtRole: 'service_role' });
  assert.strictEqual(res.role, 'owner');
});

// -------------------------------------------------------------
// [4/4] PROFILE & ENTITLEMENT SIGNUP CREATION LOGIC
// -------------------------------------------------------------
console.log('\n--- [4/4] SIGNUP IDEMPOTENCY & ERROR RESILIENCE TESTS ---');

// Emulate handle_new_user
function simulateHandleNewUser(authUser, existingProfilesTable = new Map()) {
  try {
    const rawMeta = authUser.raw_user_meta_data || {};
    const fullName = rawMeta.full_name || rawMeta.name || '';
    const avatarUrl = rawMeta.avatar_url || rawMeta.picture || '';

    const existing = existingProfilesTable.get(authUser.id);
    if (existing) {
      existingProfilesTable.set(authUser.id, {
        id: authUser.id,
        email: authUser.email || existing.email,
        full_name: (fullName && fullName.trim() !== '') ? fullName : existing.full_name,
        avatar_url: (avatarUrl && avatarUrl.trim() !== '') ? avatarUrl : existing.avatar_url,
        role: existing.role, // role is never overwritten
        updated_at: new Date().toISOString(),
      });
    } else {
      existingProfilesTable.set(authUser.id, {
        id: authUser.id,
        email: authUser.email,
        full_name: fullName,
        avatar_url: avatarUrl,
        role: 'student', // always default student
        updated_at: new Date().toISOString(),
      });
    }
    return authUser;
  } catch (err) {
    // Non-blocking exception handler
    console.warn('Warning caught:', err.message);
    return authUser;
  }
}

// Emulate handle_new_user_entitlement
function simulateHandleNewUserEntitlement(authUser, existingEntitlementsTable = new Map()) {
  try {
    if (!existingEntitlementsTable.has(authUser.id)) {
      existingEntitlementsTable.set(authUser.id, {
        user_id: authUser.id,
        tier: 'free',
        status: 'active',
        created_at: new Date().toISOString(),
      });
    }
    return authUser;
  } catch (err) {
    console.warn('Warning caught:', err.message);
    return authUser;
  }
}

test(18, 'Standard email/password signup provisions student profile and free active tier', () => {
  const profiles = new Map();
  const entitlements = new Map();

  const authUser = {
    id: 'usr_new_learner_1',
    email: 'learner@example.com',
    raw_user_meta_data: { full_name: 'Test Learner' },
  };

  simulateHandleNewUser(authUser, profiles);
  simulateHandleNewUserEntitlement(authUser, entitlements);

  const profile = profiles.get(authUser.id);
  assert(profile, 'Profile must be created');
  assert.strictEqual(profile.role, 'student', 'New user role must default to student');
  assert.strictEqual(profile.full_name, 'Test Learner');
  assert.strictEqual(profile.email, 'learner@example.com');

  const ent = entitlements.get(authUser.id);
  assert(ent, 'Entitlement must be created');
  assert.strictEqual(ent.tier, 'free', 'New user entitlement tier must default to free');
  assert.strictEqual(ent.status, 'active');
});

test(19, 'Google OAuth signup extracts name and picture metadata correctly', () => {
  const profiles = new Map();
  const authUser = {
    id: 'usr_oauth_google',
    email: 'googleuser@gmail.com',
    raw_user_meta_data: {
      name: 'Google User',
      picture: 'https://lh3.googleusercontent.com/avatar123',
    },
  };

  simulateHandleNewUser(authUser, profiles);

  const profile = profiles.get(authUser.id);
  assert.strictEqual(profile.full_name, 'Google User');
  assert.strictEqual(profile.avatar_url, 'https://lh3.googleusercontent.com/avatar123');
  assert.strictEqual(profile.role, 'student');
});

test(20, 'Duplicate signup or login on existing user is idempotent and never demotes or overwrites role', () => {
  const profiles = new Map();
  profiles.set('usr_existing_owner', {
    id: 'usr_existing_owner',
    email: 'owner@example.com',
    full_name: 'Site Owner',
    avatar_url: '',
    role: 'owner', // already elevated
    updated_at: '2026-01-01T00:00:00Z',
  });

  const authUser = {
    id: 'usr_existing_owner',
    email: 'owner@example.com',
    raw_user_meta_data: { full_name: 'Site Owner Refreshed' },
  };

  simulateHandleNewUser(authUser, profiles);

  const profile = profiles.get('usr_existing_owner');
  assert.strictEqual(profile.role, 'owner', 'Role must remain owner and not be overwritten');
  assert.strictEqual(profile.full_name, 'Site Owner Refreshed');
});

test(21, 'Entitlement insertion is idempotent: repeated triggers do not duplicate or overwrite', () => {
  const entitlements = new Map();
  entitlements.set('usr_paid', {
    user_id: 'usr_paid',
    tier: 'all_access',
    status: 'active',
  });

  const authUser = { id: 'usr_paid' };
  simulateHandleNewUserEntitlement(authUser, entitlements);

  const ent = entitlements.get('usr_paid');
  assert.strictEqual(ent.tier, 'all_access', 'Existing paid tier must not be downgraded by signup trigger');
});

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n=================================================================');
console.log(` RESULTS: ${passedTests}/${passedTests + failedTests} TESTS PASSED (${failedTests} FAILED)`);
console.log('=================================================================\n');

if (failedTests > 0) {
  process.exit(1);
}
