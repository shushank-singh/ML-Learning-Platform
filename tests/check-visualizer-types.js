const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadModuleTs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  });
  const m = { exports: {} };
  const customRequire = (id) => {
    const resolved = path.resolve(path.dirname(filePath), id);
    const withTs = fs.existsSync(resolved + '.ts') ? resolved + '.ts' : resolved;
    return loadModuleTs(withTs);
  };
  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(m.exports, m, customRequire);
  return m.exports;
}

const dsaTypes = {};
for (let i = 1; i <= 12; i++) {
  const mod = loadModuleTs(path.join(__dirname, '..', 'src', 'data', 'dsa', `dsa-module-${i}.ts`));
  const data = mod[`dsaModule${i}Data`];
  data.lessons.forEach(l => {
    dsaTypes[l.visualizerType] = (dsaTypes[l.visualizerType] || 0) + 1;
  });
}
console.log('DSA Visualizer Types:', dsaTypes);

const pyTypes = {};
for (let i = 1; i <= 12; i++) {
  const mod = loadModuleTs(path.join(__dirname, '..', 'src', 'data', 'python', `python-module-${i}.ts`));
  const data = mod[`pythonModule${i}Data`];
  data.lessons.forEach(l => {
    pyTypes[l.visualizerType] = (pyTypes[l.visualizerType] || 0) + 1;
  });
}
console.log('Python Visualizer Types:', pyTypes);
