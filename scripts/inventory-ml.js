const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadModuleTs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/import\s+[\s\S]*?from\s+['"]@\/[^'"]+['"];?/g, '');
  const res = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const m = { exports: {} };
  const customRequire = (id) => {
    if (id.startsWith('./') || id.startsWith('../')) {
      const resolved = path.resolve(path.dirname(filePath), id);
      const withTs = fs.existsSync(resolved + '.ts') ? resolved + '.ts' : resolved;
      return loadModuleTs(withTs);
    }
    return require(id);
  };
  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(m.exports, m, customRequire);
  return m.exports;
}

const modules = [];
let totalLessons = 0;

for (let i = 0; i <= 11; i++) {
  const modFile = path.join(__dirname, '..', `src/data/modules/module${i}.ts`);
  const modExports = loadModuleTs(modFile);
  const data = modExports[`module${i}Data`];
  const lessonsObj = modExports[`module${i}Lessons`];
  const lessonList = Object.values(lessonsObj);
  totalLessons += lessonList.length;
  modules.push({
    id: data.id,
    number: data.number,
    title: data.title,
    subtitle: data.subtitle,
    lessonCount: lessonList.length,
    lessons: lessonList.map(l => ({
      id: l.id,
      moduleId: l.moduleId,
      title: l.title,
      subtitle: l.subtitle,
      visualizerType: l.visualizerType,
      difficulty: l.difficulty,
      order: l.order,
      readTimeMinutes: l.readTimeMinutes,
    }))
  });
}

console.log('Total ML Modules:', modules.length);
console.log('Total ML Lessons:', totalLessons);
fs.writeFileSync(path.join(__dirname, 'ml-inventory.json'), JSON.stringify(modules, null, 2));
console.log('Wrote inventory to scripts/ml-inventory.json');
