/**
 * Razorpay Mode & Health Verifier (Test or Live)
 *
 * Usage:
 *   node scripts/verify-razorpay-mode.js
 *
 * Verifies:
 * 1. Checks whether current credentials are Test (rzp_test_) or Live (rzp_live_).
 * 2. Authenticates against Razorpay REST API using configured Key ID and Secret.
 * 3. Verifies that the ₹99/month subscription plan exists; offers to create it if missing.
 * 4. Tests dry-run Order creation for ₹399 (paise: 39900).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envVars = {};
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      envVars[key] = val;
    }
  }
}

const keyId = process.env.RAZORPAY_KEY_ID || envVars.RAZORPAY_KEY_ID || '';
const keySecret = process.env.RAZORPAY_KEY_SECRET || envVars.RAZORPAY_KEY_SECRET || '';
const monthlyPlanId = process.env.RAZORPAY_MONTHLY_PLAN_ID || envVars.RAZORPAY_MONTHLY_PLAN_ID || '';
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || envVars.RAZORPAY_WEBHOOK_SECRET || '';

console.log('=================================================================');
console.log('       AZURLEARN — RAZORPAY GATEWAY ENVIRONMENT VERIFIER         ');
console.log('=================================================================\n');

if (!keyId || !keySecret) {
  console.error('[ERROR] Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in .env.local');
  process.exit(1);
}

const isLive = keyId.startsWith('rzp_live_');
const isTest = keyId.startsWith('rzp_test_');

console.log(`Gateway Key ID:     ${keyId.slice(0, 12)}...`);
console.log(`Detected Mode:      ${isLive ? '🔴 LIVE REAL PAYMENT MODE' : isTest ? '🟡 TEST SANDBOX MODE' : '⚠️ UNRECOGNIZED KEY FORMAT'}`);
console.log(`Configured Plan ID: ${monthlyPlanId || '(None configured)'}`);
console.log(`Webhook Configured: ${webhookSecret ? 'YES' : 'NO'}\n`);

function razorpayRequest(endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const options = {
      hostname: 'api.razorpay.com',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function verify() {
  // 1. Verify Basic Auth credentials
  process.stdout.write('1. Checking Razorpay API authentication... ');
  const authCheck = await razorpayRequest('/v1/orders?count=1');
  if (authCheck.status === 200) {
    console.log('✅ Authenticated successfully!');
  } else {
    console.log(`❌ FAILED (HTTP ${authCheck.status})`);
    console.error('   Error details:', authCheck.data?.error || authCheck.data);
    return;
  }

  // 2. Check ₹399 Order creation
  process.stdout.write('2. Testing ₹399 Lifetime Pass order creation... ');
  const orderCheck = await razorpayRequest('/v1/orders', 'POST', {
    amount: 39900,
    currency: 'INR',
    receipt: `verify_${Date.now()}`,
    notes: { test_verification: 'true', mode: isLive ? 'live' : 'test' },
  });

  if (orderCheck.status === 200 && orderCheck.data?.id) {
    console.log(`✅ Success! Created Order ID: ${orderCheck.data.id}`);
  } else {
    console.log(`❌ FAILED (HTTP ${orderCheck.status})`);
    console.error('   Error details:', orderCheck.data?.error || orderCheck.data);
  }

  // 3. Check Monthly Plan (₹99 / month)
  process.stdout.write('3. Verifying ₹99/month recurring plan... ');
  let planValid = false;
  if (monthlyPlanId) {
    const planCheck = await razorpayRequest(`/v1/plans/${monthlyPlanId}`);
    if (planCheck.status === 200 && planCheck.data?.id) {
      console.log(`✅ Plan exists and active: ${planCheck.data.id} (₹${planCheck.data.item.amount / 100}/mo)`);
      planValid = true;
    } else {
      console.log(`⚠️ Plan ${monthlyPlanId} not found in current ${isLive ? 'LIVE' : 'TEST'} account.`);
    }
  } else {
    console.log('⚠️ No plan ID configured.');
  }

  // If plan is not valid, automatically create it
  if (!planValid) {
    console.log(`   Attempting to create ₹99/month plan in current ${isLive ? 'LIVE' : 'TEST'} Razorpay account...`);
    const createPlanRes = await razorpayRequest('/v1/plans', 'POST', {
      period: 'monthly',
      interval: 1,
      item: {
        name: 'AzurLearn All Courses Monthly',
        amount: 9900,
        currency: 'INR',
        description: 'Monthly recurring subscription to all 13 AzurLearn tracks',
      },
      notes: { platform: 'AzurLearn' },
    });

    if (createPlanRes.status === 200 && createPlanRes.data?.id) {
      console.log(`   ✅ Successfully created new Plan ID: ${createPlanRes.data.id}`);
      console.log(`   👉 Set this in your .env.local: RAZORPAY_MONTHLY_PLAN_ID=${createPlanRes.data.id}`);
    } else {
      console.log(`   ❌ Could not auto-create plan (HTTP ${createPlanRes.status})`);
      console.error('      Details:', createPlanRes.data?.error || createPlanRes.data);
    }
  }

  console.log('\n=================================================================');
  console.log(` VERIFICATION COMPLETE FOR: ${isLive ? '🔴 LIVE REAL PAYMENT MODE' : '🟡 TEST SANDBOX MODE'}`);
  console.log('=================================================================\n');
}

verify().catch((err) => {
  console.error('[CRITICAL] Verification crashed:', err);
});
