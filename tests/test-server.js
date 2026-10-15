const { spawn } = require('child_process');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
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

  // Wait 4 seconds for server to bind
  await new Promise((r) => setTimeout(r, 4500));

  const routes = [
    'http://127.0.0.1:3005',
    'http://127.0.0.1:3005/curriculum',
    'http://127.0.0.1:3005/curriculum/module-3/linear-regression',
    'http://127.0.0.1:3005/playground',
    'http://127.0.0.1:3005/code-lab',
    'http://127.0.0.1:3005/formulas',
    'http://127.0.0.1:3005/quizzes',
    'http://127.0.0.1:3005/projects',
    'http://127.0.0.1:3005/analytics',
    'http://127.0.0.1:3005/settings',
  ];

  let allPassed = true;
  for (const route of routes) {
    try {
      const res = await fetchUrl(route);
      if (res.status === 200) {
        console.log(`[HTTP 200 OK] Probed ${route} - Content Length: ${res.body.length} bytes`);
      } else {
        console.error(`[FAIL] ${route} returned status ${res.status}`);
        allPassed = false;
      }
    } catch (e) {
      console.error(`[ERROR] Failed to fetch ${route}:`, e.code, e.message);
      allPassed = false;
    }
  }

  // Gracefully terminate server
  server.kill('SIGTERM');
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', server.pid, '/f', '/t']);
  }

  if (allPassed) {
    console.log('\nAll 10 Core Application Routes Responded with HTTP 200 OK!');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
