const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadModuleTs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  const res = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const m = { exports: {} };
  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(m.exports, m, require);
  return m.exports;
}

function getExistingDSALessons(modNum) {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'dsa', `dsa-module-${modNum}.ts`);
  const mod = loadModuleTs(filePath);
  return {
    data: mod[`dsaModule${modNum}Data`],
    lessons: mod[`dsaModule${modNum}Lessons`]
  };
}

function getExistingPyLessons(modNum) {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'python', `python-module-${modNum}.ts`);
  const mod = loadModuleTs(filePath);
  return {
    data: mod[`pythonModule${modNum}Data`],
    lessons: mod[`pythonModule${modNum}Lessons`]
  };
}

module.exports = { loadModuleTs, getExistingDSALessons, getExistingPyLessons };
