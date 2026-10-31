const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadTsModule(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const js = ts.transpileModule(content, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const m = { exports: {} };
  const fn = new Function('require', 'exports', 'module', '__filename', '__dirname', js);
  fn(require, m.exports, m, filePath, path.dirname(filePath));
  return m.exports;
}

const moduleFiles = [
  'dl-module-1.ts',
  'dl-module-2.ts',
  'dl-module-3.ts',
  'dl-module-4.ts',
  'dl-module-5.ts',
  'dl-module-6.ts',
];

const lessons = {};
const modules = [];

for (const f of moduleFiles) {
  const fullPath = path.join(__dirname, '../src/data/deep-learning', f);
  const modExports = loadTsModule(fullPath);
  for (const k of Object.keys(modExports)) {
    if (k.endsWith('Data')) modules.push(modExports[k]);
    if (k.endsWith('Lessons')) Object.assign(lessons, modExports[k]);
  }
}

console.log(`Loaded ${modules.length} modules and ${Object.keys(lessons).length} lessons.`);

const lessonKeys = Object.keys(lessons);
const auditResults = [];

for (const id of lessonKeys) {
  const l = lessons[id];
  const checks = {
    id: l.id,
    title: l.title,
    objectives: l.objectives && l.objectives.length >= 3 && l.prerequisites && l.prerequisites.length >= 1 ? 'PASS' : 'FAIL',
    analogy: l.analogy && l.analogy.title && l.analogy.text ? 'PASS' : 'FAIL',
    concept: l.problemSolved && l.problemSolved.title && l.problemSolved.description ? 'PASS' : 'FAIL',
    technical: l.intuition && l.intuition.overview && l.intuition.steps && l.intuition.steps.length >= 2 ? 'PASS' : 'FAIL',
    diagram: l.visualExplanation && l.visualExplanation.title && l.visualizerType ? 'PASS' : 'FAIL',
    mathFormulas: l.mathematics && l.mathematics.foundations && l.mathematics.foundations.length >= 1 && l.variables && l.variables.length >= 2 ? 'PASS' : 'FAIL',
    numericalExample: l.numericalExample && l.numericalExample.calculations && l.numericalExample.calculations.length >= 2 ? 'PASS' : 'FAIL',
    codeImplementation: (l.scratchCode || l.runnableCode) && (l.scratchCode?.code || l.runnableCode?.code) ? 'PASS' : 'FAIL',
    expectedOutput: (l.scratchCode?.expectedOutput || l.runnableCode?.expectedOutput) ? 'PASS' : 'FAIL',
    codeExplanation: l.lineByLineExplanation && l.lineByLineExplanation.length >= 2 ? 'PASS' : 'FAIL',
    mistakesAndLimits: l.commonMistakes && l.commonMistakes.length >= 2 ? 'PASS' : 'FAIL',
    checkpointQuiz: l.quiz && l.quiz.length >= 3 ? 'PASS' : (l.quiz ? `PARTIAL (${l.quiz.length} q)` : 'FAIL'),
    practiceExercise: l.independentExercise && l.independentExercise.title && l.independentExercise.problem && l.independentExercise.solution ? 'PASS' : 'FAIL',
    revisionNotes: l.summary && l.summary.keyTakeaways && l.summary.keyTakeaways.length >= 2 ? 'PASS' : 'FAIL',
    navigation: l.moduleId && l.order ? 'PASS' : 'FAIL',
  };
  auditResults.push(checks);
}

console.table(auditResults);

// Output any failures or partials
const issues = [];
for (const r of auditResults) {
  for (const [k, v] of Object.entries(r)) {
    if (v !== 'PASS' && k !== 'id' && k !== 'title') {
      issues.push(`${r.id} (${r.title}) -> ${k}: ${v}`);
    }
  }
}

if (issues.length === 0) {
  console.log('ALL 22 DEEP LEARNING LESSONS PASSED 100% OF THE 15 CRITERIA!');
} else {
  console.log('Found issues:');
  console.log(issues.join('\n'));
}
