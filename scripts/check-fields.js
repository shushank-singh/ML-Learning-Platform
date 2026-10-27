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

const stats = {
  totalLessons: 0,
  visualizerTypes: {},
  difficulties: {},
  averagePracticeQuestions: 0,
  averageQuizQuestions: 0,
  hasDerivations: 0,
  hasNumericalExamples: 0,
  hasScratchCode: 0,
  hasSklearnCode: 0,
};

let totalPractice = 0;
let totalQuiz = 0;

for (let i = 0; i <= 11; i++) {
  const modFile = path.join(__dirname, '..', `src/data/modules/module${i}.ts`);
  const modExports = loadModuleTs(modFile);
  const lessonsObj = modExports[`module${i}Lessons`];
  const list = Object.values(lessonsObj);
  stats.totalLessons += list.length;

  list.forEach(l => {
    stats.visualizerTypes[l.visualizerType] = (stats.visualizerTypes[l.visualizerType] || 0) + 1;
    stats.difficulties[l.difficulty] = (stats.difficulties[l.difficulty] || 0) + 1;
    if (l.derivation && l.derivation.steps) stats.hasDerivations++;
    if (l.numericalExample && l.numericalExample.calculations) stats.hasNumericalExamples++;
    if (l.scratchCode && l.scratchCode.code) stats.hasScratchCode++;
    if (l.sklearnCode && l.sklearnCode.code) stats.hasSklearnCode++;
    if (l.practiceQuestions) totalPractice += l.practiceQuestions.length;
    if (l.quiz) totalQuiz += l.quiz.length;
  });
}

stats.averagePracticeQuestions = (totalPractice / stats.totalLessons).toFixed(1);
stats.averageQuizQuestions = (totalQuiz / stats.totalLessons).toFixed(1);

console.log('ML Lessons Stats:');
console.log(JSON.stringify(stats, null, 2));
