const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadModuleTs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  const res = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const m = { exports: {} };
  const customRequire = (id) => loadModuleTs(path.resolve(path.dirname(filePath), id) + '.ts');
  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(m.exports, m, customRequire);
  return m.exports;
}

for (let i = 1; i <= 12; i++) {
  const mod = loadModuleTs(path.join(__dirname, '..', 'src', 'data', 'dsa', `dsa-module-${i}.ts`));
  const lessons = mod[`dsaModule${i}Lessons`];
  console.log(`DSA Mod ${i} authored keys:`, Object.keys(lessons));
}

for (let i = 1; i <= 12; i++) {
  const mod = loadModuleTs(path.join(__dirname, '..', 'src', 'data', 'python', `python-module-${i}.ts`));
  const lessons = mod[`pythonModule${i}Lessons`];
  console.log(`Python Mod ${i} authored keys:`, Object.keys(lessons));
}
