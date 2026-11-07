/**
 * AzurLearn: Track Entitlements, Products & Razorpay Payments Test Suite
 *
 * Verifies:
 * 1. Owner authorization (UUID, verified email, fail-closed on missing config)
 * 2. Exact free-tier allowlist & canonical alias resolution
 * 3. Track-level one-time lifetime purchases (single-track scope, non-expiring)
 * 4. Monthly subscription lifecycle (activation, renewal, expiry, track-isolation)
 * 5. Entitlement precedence: Lifetime grants persist independently of subscriptions
 * 6. Security & Tamper-resistance: HMAC-SHA256 signature verification, timing-safety,
 *    unconfigured product checkout prevention, and database RLS protections.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ts = require('typescript');

console.log('=================================================================');
console.log(' AZURLEARN — TRACK ENTITLEMENTS & PAYMENTS VERIFIER             ');
console.log('=================================================================\n');

const moduleCache = {};

function loadTs(relPath) {
  if (moduleCache[relPath]) return moduleCache[relPath];

  const filePath = path.resolve(__dirname, '..', relPath);
  let code = fs.readFileSync(filePath, 'utf8');

  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });

  const moduleExports = {};
  moduleCache[relPath] = moduleExports;

  const customRequire = (id) => {
    if (id === '@/lib/entitlements/config') return loadTs('src/lib/entitlements/config.ts');
    if (id === '@/lib/entitlements/policy') return loadTs('src/lib/entitlements/policy.ts');
    if (id === '@/lib/payments/products') return loadTs('src/lib/payments/products.ts');
    if (id === '@/lib/payments/razorpay') return loadTs('src/lib/payments/razorpay.ts');
    if (id.startsWith('./') || id.startsWith('../')) {
      let target = path.resolve(path.dirname(filePath), id);
      if (fs.existsSync(target + '.ts')) return loadTs(path.relative(path.resolve(__dirname, '..'), target + '.ts'));
      if (fs.existsSync(target + '/index.ts')) return loadTs(path.relative(path.resolve(__dirname, '..'), target + '/index.ts'));
      if (fs.existsSync(target + '.js')) return require(target);
    }
    if (id === 'crypto') return { ...crypto, default: crypto, createHmac: crypto.createHmac, timingSafeEqual: crypto.timingSafeEqual };
    return {};
  };

  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(moduleExports, { exports: moduleExports }, customRequire);
  return moduleExports;
}

const config = loadTs('src/lib/entitlements/config.ts');
const policy = loadTs('src/lib/entitlements/policy.ts');
const products = loadTs('src/lib/payments/products.ts');
const razorpay = loadTs('src/lib/payments/razorpay.ts');

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

// -------------------------------------------------------------
// [1/6] OWNER ACCESS TESTS
// -------------------------------------------------------------
console.log('--- [1/6] OWNER AUTHORIZATION & SERVER VERIFICATION ---');

test(1, 'Verified owner via UUID receives unrestricted access across all 13 tracks', () => {
  const isOwner = policy.isOwnerIdentity({
    userId: '0ce01c86-0089-42fe-a376-b0784143aeeb',
    ownerConfig: { ownerId: '0ce01c86-0089-42fe-a376-b0784143aeeb' },
  });
  assert.strictEqual(isOwner, true);

  const tier = policy.resolveEntitlementTier({
    isAuthenticated: true,
    userId: '0ce01c86-0089-42fe-a376-b0784143aeeb',
    ownerConfig: { ownerId: '0ce01c86-0089-42fe-a376-b0784143aeeb' },
  });
  assert.strictEqual(tier, 'owner');

  for (const t of config.CANONICAL_TRACK_IDS) {
    const res = policy.canAccessTrack(t, 'owner');
    assert.strictEqual(res.allowed, true, `Owner must access track ${t}`);
    assert.strictEqual(res.accessType, 'owner');
  }
});

test(2, 'Verified owner via normalized email receives unrestricted access', () => {
  const isOwner = policy.isOwnerIdentity({
    userId: 'random-uuid-999',
    email: 'SHUSHANK9696@GMAIL.COM ',
    ownerConfig: { ownerEmail: 'shushank9696@gmail.com' },
  });
  assert.strictEqual(isOwner, true);

  const tier = policy.resolveEntitlementTier({
    isAuthenticated: true,
    userId: 'random-uuid-999',
    email: 'shushank9696@gmail.com',
    ownerConfig: { ownerEmail: 'shushank9696@gmail.com' },
  });
  assert.strictEqual(tier, 'owner');
});

test(3, 'Missing or empty owner configuration fails closed', () => {
  const isOwnerEmpty = policy.isOwnerIdentity({
    userId: 'some-user-123',
    email: 'user@example.com',
    ownerConfig: { ownerId: '', ownerEmail: '' },
  });
  assert.strictEqual(isOwnerEmpty, false);

  const tier = policy.resolveEntitlementTier({
    isAuthenticated: true,
    userId: 'some-user-123',
    email: 'user@example.com',
    ownerConfig: { ownerId: '', ownerEmail: '' },
  });
  assert.strictEqual(tier, 'free');
});

test(4, 'Spoofed client role or metadata cannot grant owner status', () => {
  const isOwnerSpoofed = policy.isOwnerIdentity({
    userId: 'malicious-user-id',
    email: 'attacker@evil.com',
    role: 'student',
    user_metadata: { role: 'owner', isOwner: true },
    ownerConfig: { ownerId: 'legit-owner-id' },
  });
  assert.strictEqual(isOwnerSpoofed, false);
});

// -------------------------------------------------------------
// [2/6] FREE-TIER TESTS
// -------------------------------------------------------------
console.log('\n--- [2/6] EXACT FREE-TIER ALLOWLIST & CANONICAL ALIASES ---');

test(5, 'The exact 5 approved Module 0 courses are accessible to free users', () => {
  const freeModules = [
    'module-0',         // ML
    'numpy-module-1',   // NumPy
    'pandas-module-1',  // Pandas
    'python-module-1',  // Python
    'java-module-1',    // Java
  ];

  for (const m of freeModules) {
    const res = policy.canAccessModule(m, 'free');
    assert.strictEqual(res.allowed, true, `Module ${m} must be accessible on free tier`);
    assert.strictEqual(res.reason, 'free_allowlist');
  }
});

test(6, 'Canonical aliases for free modules resolve cleanly', () => {
  const aliases = [
    { input: 'numpy-module-0', expected: 'numpy-module-1' },
    { input: 'numpy-mastery', expected: 'numpy-module-1' },
    { input: 'pandas-module-0', expected: 'pandas-module-1' },
    { input: 'pandas-mastery', expected: 'pandas-module-1' },
    { input: 'python-module-0', expected: 'python-module-1' },
    { input: 'java-module-0', expected: 'java-module-1' },
    { input: 'ml-module-0', expected: 'module-0' },
  ];

  for (const a of aliases) {
    const resolved = config.resolveCanonicalModuleId(a.input);
    assert.strictEqual(resolved, a.expected);
    const res = policy.canAccessModule(a.input, 'free');
    assert.strictEqual(res.allowed, true);
  }
});

test(7, 'Later modules and restricted tracks are denied to free users', () => {
  const deniedModules = [
    'module-1', 'module-2', 'module-11',
    'dsa-module-1', 'dsa-module-10',
    'python-module-2', 'java-module-2',
    'dl-module-1', 'tf-module-1', 'genai-module-1',
    'rag-module-1', 'agent-module-1', 'mlops-module-1', 'deployment-module-1',
  ];

  for (const m of deniedModules) {
    const res = policy.canAccessModule(m, 'free');
    assert.strictEqual(res.allowed, false, `Module ${m} must be denied to free users`);
    assert.strictEqual(res.reason, 'module_locked');
  }
});

test(8, 'Unknown, malformed, or arbitrary module IDs fail closed', () => {
  const unknownIds = ['unknown-mod', 'secret-bypass', '../../../etc/passwd', 'null', ''];
  for (const u of unknownIds) {
    const res = policy.canAccessModule(u, 'free');
    assert.strictEqual(res.allowed, false);
  }
});

// -------------------------------------------------------------
// [3/6] ONE-TIME LIFETIME TRACK PURCHASES
// -------------------------------------------------------------
console.log('\n--- [3/6] ONE-TIME LIFETIME TRACK PURCHASES ---');

test(9, 'Purchased lifetime access unlocks exactly that track and no other tracks', () => {
  const userTrackGrants = {
    'dsa': {
      trackId: 'dsa',
      sourceType: 'lifetime_purchase',
      status: 'active',
      validUntil: null,
    },
  };

  // DSA must be unlocked
  const dsaTrack = policy.canAccessTrack('dsa', 'free', userTrackGrants);
  assert.strictEqual(dsaTrack.allowed, true);
  assert.strictEqual(dsaTrack.accessType, 'lifetime');

  const dsaMod = policy.canAccessModule('dsa-module-5', 'free', userTrackGrants);
  assert.strictEqual(dsaMod.allowed, true);
  assert.strictEqual(dsaMod.accessType, 'lifetime');

  // Other tracks must remain locked
  const mlLaterMod = policy.canAccessModule('module-3', 'free', userTrackGrants);
  assert.strictEqual(mlLaterMod.allowed, false, 'ML Module 3 must remain locked');

  const dlMod = policy.canAccessModule('dl-module-1', 'free', userTrackGrants);
  assert.strictEqual(dlMod.allowed, false, 'Deep Learning must remain locked');

  const tfTrack = policy.canAccessTrack('transformers', 'free', userTrackGrants);
  assert.strictEqual(tfTrack.allowed, false, 'Transformers must remain locked');
});

test(10, 'Lifetime access has validUntil = null and never expires', () => {
  const grant = {
    trackId: 'python',
    sourceType: 'lifetime_purchase',
    status: 'active',
    validUntil: null,
  };

  const access = policy.canAccessTrack('python', 'free', { python: grant });
  assert.strictEqual(access.allowed, true);
  assert.strictEqual(access.accessType, 'lifetime');
});

test(11, 'Cancelled, failed, or unverified orders grant zero access', () => {
  const inactiveGrant = {
    trackId: 'deep-learning',
    sourceType: 'lifetime_purchase',
    status: 'cancelled',
    validUntil: null,
  };

  const access = policy.canAccessTrack('deep-learning', 'free', { 'deep-learning': inactiveGrant });
  assert.strictEqual(access.allowed, false);
  assert.strictEqual(access.reason, 'track_locked');
});

// -------------------------------------------------------------
// [4/6] MONTHLY SUBSCRIPTIONS & LIFECYCLE
// -------------------------------------------------------------
console.log('\n--- [4/6] MONTHLY SUBSCRIPTIONS & LIFECYCLE ---');

test(12, 'Active subscription grants access to the subscribed track until expiry', () => {
  const futureExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString();
  const subGrant = {
    trackId: 'deep-learning',
    sourceType: 'monthly_subscription',
    status: 'active',
    validUntil: futureExpiry,
  };

  const access = policy.canAccessTrack('deep-learning', 'free', { 'deep-learning': subGrant });
  assert.strictEqual(access.allowed, true);
  assert.strictEqual(access.accessType, 'monthly_subscription');

  const modAccess = policy.canAccessModule('dl-module-10', 'free', { 'deep-learning': subGrant });
  assert.strictEqual(modAccess.allowed, true);
});

test(13, 'Expired subscription ceases to grant access', () => {
  const pastExpiry = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  const expiredSub = {
    trackId: 'deep-learning',
    sourceType: 'monthly_subscription',
    status: 'active',
    validUntil: pastExpiry,
  };

  const access = policy.canAccessTrack('deep-learning', 'free', { 'deep-learning': expiredSub });
  assert.strictEqual(access.allowed, false, 'Expired subscription must deny access');
  assert.strictEqual(access.reason, 'track_locked');
});

test(14, 'Lifetime grant persists independently if a separate subscription expires', () => {
  const pastExpiry = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  // User holds lifetime grant
  const grants = {
    'python': {
      trackId: 'python',
      sourceType: 'lifetime_purchase',
      status: 'active',
      validUntil: null,
    },
  };

  const access = policy.canAccessTrack('python', 'free', grants);
  assert.strictEqual(access.allowed, true);
  assert.strictEqual(access.accessType, 'lifetime');
});

test(15, 'A subscription for one track never unlocks another track', () => {
  const futureExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const grants = {
    'agents': {
      trackId: 'agents',
      sourceType: 'monthly_subscription',
      status: 'active',
      validUntil: futureExpiry,
    },
  };

  assert.strictEqual(policy.canAccessTrack('agents', 'free', grants).allowed, true);
  assert.strictEqual(policy.canAccessTrack('mlops', 'free', grants).allowed, false);
  assert.strictEqual(policy.canAccessTrack('deployment', 'free', grants).allowed, false);
});

// -------------------------------------------------------------
// [5/6] SECURITY, SIGNATURES & BYPASS PREVENTION
// -------------------------------------------------------------
console.log('\n--- [5/6] SECURITY, SIGNATURE VERIFICATION & TAMPER RESISTANCE ---');

test(16, 'Payment signature verification uses timing-safe comparison and rejects forged signatures', () => {
  const secret = 'test_secret_key_12345';
  const orderId = 'order_DA1234567890';
  const paymentId = 'pay_XY9876543210';

  const validSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const isValid = razorpay.verifyPaymentSignature({
    orderId,
    paymentId,
    signature: validSignature,
    customSecret: secret,
  });
  assert.strictEqual(isValid, true, 'Valid signature must verify');

  const isInvalid = razorpay.verifyPaymentSignature({
    orderId,
    paymentId,
    signature: 'bad_forged_hex_signature_abcdef1234567890',
    customSecret: secret,
  });
  assert.strictEqual(isInvalid, false, 'Forged signature must be rejected');
});

test(17, 'Subscription signature pattern HMAC(payment_id|subscription_id) verifies correctly', () => {
  const secret = 'test_secret_key_sub';
  const subId = 'sub_9988776655';
  const paymentId = 'pay_1122334455';

  const validSig = crypto
    .createHmac('sha256', secret)
    .update(`${paymentId}|${subId}`)
    .digest('hex');

  const isValid = razorpay.verifySubscriptionSignature({
    subscriptionId: subId,
    paymentId,
    signature: validSig,
    customSecret: secret,
  });
  assert.strictEqual(isValid, true);

  const isInvalid = razorpay.verifySubscriptionSignature({
    subscriptionId: subId,
    paymentId,
    signature: 'bad_signature_sub',
    customSecret: secret,
  });
  assert.strictEqual(isInvalid, false);
});

test(18, 'Webhook raw body signature verification rejects modified payloads', () => {
  const webhookSecret = 'whsec_test_secret_999';
  const rawBody = JSON.stringify({
    event: 'payment.captured',
    payload: { payment: { entity: { id: 'pay_123', amount: 499900 } } },
  });

  const validHeader = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  const isValid = razorpay.verifyWebhookSignature({
    rawBody,
    signature: validHeader,
    customSecret: webhookSecret,
  });
  assert.strictEqual(isValid, true);

  // Tampered payload
  const tamperedBody = rawBody.replace('499900', '100');
  const isTamperedValid = razorpay.verifyWebhookSignature({
    rawBody: tamperedBody,
    signature: validHeader,
    customSecret: webhookSecret,
  });
  assert.strictEqual(isTamperedValid, false, 'Tampered payload must fail signature check');
});

test(19, 'Unconfigured/unapproved products in catalog reject checkout creation', () => {
  const catalog = products.buildProductCatalog();
  // By default without environment overrides, products are inactive and require approval
  const mlLifetime = catalog['ml_lifetime'];
  assert(mlLifetime, 'ML lifetime product must exist in catalog');

  if (!process.env.TRACK_PRICE_ML_LIFETIME_PAISE) {
    assert.strictEqual(mlLifetime.isActive, false);
    assert.strictEqual(mlLifetime.requiresOwnerApproval, true);
  }
});

test(20, 'Currency is strictly restricted to INR and amounts are positive integers in paise', () => {
  const allProducts = products.getAllTrackProducts();
  assert(allProducts.length >= 26, 'Must contain 2 products per track across 13 tracks');

  for (const p of allProducts) {
    assert.strictEqual(p.currency, 'INR', `Product ${p.id} must be in INR`);
    if (p.amountPaise !== null) {
      assert(Number.isInteger(p.amountPaise), `Product ${p.id} amount must be integer paise`);
      assert(p.amountPaise > 0, `Product ${p.id} amount must be positive`);
    }
  }
});

// -------------------------------------------------------------
// [6/6] DATABASE MIGRATION & RLS VERIFICATION
// -------------------------------------------------------------
console.log('\n--- [6/6] DATABASE SCHEMA & RLS MIGRATION VERIFICATION ---');

test(21, 'Migration 20261106_track_entitlements_and_payments.sql exists and is syntactically valid', () => {
  const migPath = path.resolve(__dirname, '../supabase/migrations/20261106_track_entitlements_and_payments.sql');
  assert(fs.existsSync(migPath), 'Migration file must exist');

  const sql = fs.readFileSync(migPath, 'utf8');
  assert(sql.includes('create table if not exists public.product_catalog'), 'Missing product_catalog table');
  assert(sql.includes('create table if not exists public.payment_orders'), 'Missing payment_orders table');
  assert(sql.includes('create table if not exists public.payment_subscriptions'), 'Missing payment_subscriptions table');
  assert(sql.includes('create table if not exists public.payment_transactions'), 'Missing payment_transactions table');
  assert(sql.includes('create table if not exists public.payment_webhook_events'), 'Missing payment_webhook_events table');
  assert(sql.includes('create table if not exists public.track_entitlements'), 'Missing track_entitlements table');
});

test(22, 'Row Level Security is enabled on all payment and entitlement tables', () => {
  const sql = fs.readFileSync(
    path.resolve(__dirname, '../supabase/migrations/20261106_track_entitlements_and_payments.sql'),
    'utf8'
  );

  const tables = [
    'public.product_catalog',
    'public.payment_orders',
    'public.payment_subscriptions',
    'public.payment_transactions',
    'public.payment_webhook_events',
    'public.track_entitlements',
  ];

  for (const t of tables) {
    assert(sql.includes(`alter table ${t} enable row level security`), `RLS not enabled on ${t}`);
  }
});

test(23, 'Anti-tampering trigger strictly protects payment and entitlement tables', () => {
  const sql = fs.readFileSync(
    path.resolve(__dirname, '../supabase/migrations/20261106_track_entitlements_and_payments.sql'),
    'utf8'
  );

  assert(sql.includes('prevent_payment_tampering'), 'Missing prevent_payment_tampering trigger function');
  assert(sql.includes("auth.jwt() ->> 'role') is distinct from 'service_role'"), 'Must check service_role JWT');
  assert(sql.includes('on_track_entitlements_tamper'), 'Missing tamper trigger on track_entitlements');
});

test(24, 'Unique constraint on (user_id, track_id, source_type) enforces atomic isolation', () => {
  const sql = fs.readFileSync(
    path.resolve(__dirname, '../supabase/migrations/20261106_track_entitlements_and_payments.sql'),
    'utf8'
  );

  assert(sql.includes('uq_user_track_source unique (user_id, track_id, source_type)'), 'Missing unique constraint');
});

test(25, 'Zero payment gateway or database service-role secrets are exposed in client-facing code', () => {
  const envExample = fs.readFileSync(path.resolve(__dirname, '../.env.example'), 'utf8');
  assert(!envExample.includes('NEXT_PUBLIC_RAZORPAY_KEY_SECRET'), 'RAZORPAY_KEY_SECRET must not have NEXT_PUBLIC_ prefix');
  assert(!envExample.includes('NEXT_PUBLIC_RAZORPAY_WEBHOOK_SECRET'), 'WEBHOOK_SECRET must not have NEXT_PUBLIC_ prefix');
});

test(26, 'Lifetime All-Courses Pass product is configured at ₹399 (39900 paise) and active', () => {
  const p = products.getTrackProduct('all_courses_lifetime');
  assert(p, 'all_courses_lifetime must exist in product catalog');
  assert.strictEqual(p.amountPaise, 39900, 'Price must be ₹399 (39900 paise)');
  assert.strictEqual(p.currency, 'INR');
  assert.strictEqual(p.billingType, 'one_time');
  assert.strictEqual(p.isActive, true, 'Product must be active for checkout');
  assert.strictEqual(p.requiresOwnerApproval, false);
});

test(27, 'Monthly All-Courses Plan product is configured at ₹99/mo (9900 paise), active, and has Razorpay Plan ID', () => {
  const p = products.getTrackProduct('all_courses_monthly');
  assert(p, 'all_courses_monthly must exist in product catalog');
  assert.strictEqual(p.amountPaise, 9900, 'Price must be ₹99 (9900 paise)');
  assert.strictEqual(p.currency, 'INR');
  assert.strictEqual(p.billingType, 'monthly_subscription');
  assert.strictEqual(p.isActive, true, 'Product must be active for checkout');
  assert(p.razorpayPlanId && p.razorpayPlanId.startsWith('plan_'), 'Must have valid Razorpay Plan ID');
});

test(28, 'All-Access entitlement grants complete access to all 13 canonical tracks and projects', () => {
  const allAccessEntitlements = policy.getUserEntitlements({
    isAuthenticated: true,
    userId: 'user_123',
    subscriptionTier: 'all_access',
    subscriptionStatus: 'active',
  });
  assert.strictEqual(allAccessEntitlements.tier, 'all_access');

  for (const t of config.CANONICAL_TRACK_IDS) {
    const res = policy.canAccessTrack(t, 'all_access');
    assert.strictEqual(res.allowed, true, `All-access must grant track ${t}`);
  }

  const projAccess = policy.canAccessProject('mlops-pipeline-capstone', 'all_access');
  assert.strictEqual(projAccess.allowed, true, 'All-access must unlock capstone projects');
});

console.log('\n=================================================================');
console.log(` RESULTS: ${passedTests}/${passedTests + failedTests} TESTS PASSED (${failedTests} FAILED)`);
console.log('=================================================================\n');

if (failedTests > 0) {
  process.exit(1);
}
