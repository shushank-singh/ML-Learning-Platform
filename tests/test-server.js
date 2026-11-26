const { spawn } = require('child_process');
const http = require('http');

function fetchUrl(url, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const payload = body ? JSON.stringify(body) : null;
    const headers = payload
      ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
      : {};

    const req = http.request(
      parsed,
      { method, headers },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () =>
          resolve({ status: res.statusCode, headers: res.headers, body: data })
        );
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('Starting Next.js production server for probe testing...');
  const server = spawn('npx.cmd', ['next', 'start', '-p', '3005'], {
    cwd: __dirname + '/..',
    stdio: 'pipe',
    shell: true,
  });

  server.stdout.on('data', (d) => console.log(`[Next.js stdout] ${d.toString().trim()}`));
  server.stderr.on('data', (d) => console.log(`[Next.js stderr] ${d.toString().trim()}`));

  await new Promise((r) => setTimeout(r, 4500));

  const checks = [
    // Public pages -> 200 OK
    { url: 'http://127.0.0.1:3005/', expect: [200] },
    { url: 'http://127.0.0.1:3005/login', expect: [200] },
    { url: 'http://127.0.0.1:3005/signup', expect: [200] },
    { url: 'http://127.0.0.1:3005/pricing', expect: [200] },
    { url: 'http://127.0.0.1:3005/plans', expect: [200] },
    { url: 'http://127.0.0.1:3005/verify/AZL-ML-TEST1234', expect: [200] },

    // Protected learning routes -> 307 redirect to /login when unauthenticated
    { url: 'http://127.0.0.1:3005/curriculum', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/curriculum/module-3/linear-regression', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/playground', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/code-lab', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/formulas', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/quizzes', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/projects', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/analytics', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/certificates', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/mock-interview', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/daily-review', expect: [307, 302], redirectTo: '/login' },
    { url: 'http://127.0.0.1:3005/settings', expect: [307, 302], redirectTo: '/login' },

    // API guards
    { url: 'http://127.0.0.1:3005/api/payments/catalog', expect: [200] },
    { url: 'http://127.0.0.1:3005/api/entitlements/me', expect: [200] },
    { url: 'http://127.0.0.1:3005/api/progress', expect: [401] },
    { url: 'http://127.0.0.1:3005/api/certificates', expect: [401] },
    { url: 'http://127.0.0.1:3005/api/certificates/AZL-ML-TEST1234', expect: [404] },
    { url: 'http://127.0.0.1:3005/api/ai-tutor', method: 'POST', body: { message: 'hi' }, expect: [401] },
    { url: 'http://127.0.0.1:3005/api/payments/create-order', method: 'POST', body: { trackId: 'all-access' }, expect: [401] },
  ];

  let allPassed = true;
  for (const check of checks) {
    try {
      const res = await fetchUrl(check.url, check.method || 'GET', check.body || null);
      const statusOk = check.expect.includes(res.status);
      const redirectOk =
        !check.redirectTo ||
        (res.headers.location && res.headers.location.includes(check.redirectTo));

      if (statusOk && redirectOk) {
        console.log(`[PASS] ${check.method || 'GET'} ${check.url} -> HTTP ${res.status} (${res.body.length} bytes)`);
      } else {
        console.error(`[FAIL] ${check.url} returned HTTP ${res.status}, location=${res.headers.location || 'none'}`);
        allPassed = false;
      }
    } catch (e) {
      console.error(`[ERROR] Failed to fetch ${check.url}:`, e.code, e.message);
      allPassed = false;
    }
  }

  server.kill('SIGTERM');
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(server.pid), '/f', '/t']);
  }

  if (allPassed) {
    console.log(`\nAll ${checks.length} Live Production Route & API Security Probes Passed!`);
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
