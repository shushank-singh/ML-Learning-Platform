const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadTs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/import\s+[\s\S]*?from\s+['"]@\/[^'"]+['"];?/g, '');
  code = code.replace(/import\s+[\s\S]*?from\s+['"]\.\/[^'"]+['"];?/g, '');
  const res = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const m = { exports: {} };
  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(m.exports, m, require);
  return m.exports;
}

try {
  const mlRev = loadTs(path.join(__dirname, '..', 'src/data/revision/mlTopics.ts'));
  console.log('mlTopics topics count:', mlRev.ML_REVISION_TOPICS ? mlRev.ML_REVISION_TOPICS.length : 'none');
  if (mlRev.ML_REVISION_TOPICS) {
    console.log('Categories:', [...new Set(mlRev.ML_REVISION_TOPICS.map(t => t.category))]);
    console.log('Topic sample:', mlRev.ML_REVISION_TOPICS.slice(0, 3).map(t => ({ id: t.id, title: t.title })));
  }
} catch (err) {
  console.error('Error loading mlTopics.ts:', err.message);
}
