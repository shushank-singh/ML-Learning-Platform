const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const assert = require('assert');

console.log('=================================================================');
console.log('   NUMPY & PANDAS MASTERY PEDAGOGICAL VERIFICATION SUITE         ');
console.log('=================================================================');

function loadTsModule(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/import\s+[\s\S]*?from\s+['"]@\/[^'"]+['"];?/g, '');
  const res = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const moduleExports = {};
  const moduleContext = {
    exports: moduleExports,
    module: { exports: moduleExports },
    require: (id) => {
      if (id.startsWith('./') || id.startsWith('../')) {
        const full = path.resolve(path.dirname(filePath), id + '.ts');
        if (fs.existsSync(full)) return loadTsModule(full);
        const fullIndex = path.resolve(path.dirname(filePath), id, 'index.ts');
        if (fs.existsSync(fullIndex)) return loadTsModule(fullIndex);
      }
      return {};
    },
  };
  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(moduleExports, moduleContext.module, moduleContext.require);
  return moduleExports;
}

// 1. Verify NumPy Modules (1-6 + project)
const numpyModules = [
  'numpy-module-1', 'numpy-module-2', 'numpy-module-3',
  'numpy-module-4', 'numpy-module-5', 'numpy-module-6',
  'numpy-project'
];

let totalNumpyLessons = 0;
console.log('\n--- [1/3] Validating NumPy Curriculum Files & Pedagogical Fields ---');
numpyModules.forEach((m) => {
  const file = path.join(__dirname, '..', 'src', 'data', 'numpy', `${m}.ts`);
  assert(fs.existsSync(file), `NumPy file missing: ${file}`);
  const modExports = loadTsModule(file);
  const modDataKey = Object.keys(modExports).find(k => (k.includes('Module') || k.includes('Data')) && !k.includes('Lessons'));
  const lessonsKey = Object.keys(modExports).find(k => k.includes('Lessons'));
  
  assert(modDataKey, `Missing module data in ${m}`);
  assert(lessonsKey, `Missing lessons export in ${m}`);
  
  const modData = modExports[modDataKey];
  const lessons = modExports[lessonsKey];
  const count = Object.keys(lessons).length;
  totalNumpyLessons += count;
  
  console.log(`  Checking ${modData.id}: "${modData.title}" (${count} lessons)...`);
  assert(modData.lessons.length === count, `Module summary length mismatch in ${m}`);
  
  Object.values(lessons).forEach((l) => {
    assert(l.title && l.title.length > 3, `Invalid lesson title in ${l.id}`);
    assert(l.analogy && l.analogy.title && l.analogy.text, `Missing analogy in ${l.id}`);
    assert(l.problemSolved && l.problemSolved.title, `Missing problemSolved in ${l.id}`);
    assert(l.runnableCode && l.runnableCode.code, `Missing runnableCode in ${l.id}`);
    assert(l.runnableCode.expectedOutput, `Missing expectedOutput in ${l.id}`);
    assert(l.lineByLineExplanation && l.lineByLineExplanation.length > 0, `Missing lineByLine in ${l.id}`);
    assert(l.commonMistakes && l.commonMistakes.length > 0, `Missing commonMistakes in ${l.id}`);
    assert(l.realWorldUseCases && l.realWorldUseCases.length > 0, `Missing realWorldUseCases in ${l.id}`);
    assert(l.quiz && l.quiz.length >= 3, `Missing quiz in ${l.id}`);
    assert(l.independentExercise && l.independentExercise.problem, `Missing independentExercise in ${l.id}`);
  });
});
console.log(`  [PASS] All 7 NumPy modules verified. Total complete NumPy lessons: ${totalNumpyLessons}`);

// 2. Verify Pandas Modules (1-9 + project)
const pandasModules = [
  'pandas-module-1', 'pandas-module-2', 'pandas-module-3',
  'pandas-module-4', 'pandas-module-5', 'pandas-module-6',
  'pandas-module-7', 'pandas-module-8', 'pandas-module-9',
  'pandas-project'
];

let totalPandasLessons = 0;
console.log('\n--- [2/3] Validating Pandas Curriculum Files & Pedagogical Fields ---');
pandasModules.forEach((m) => {
  const file = path.join(__dirname, '..', 'src', 'data', 'pandas', `${m}.ts`);
  assert(fs.existsSync(file), `Pandas file missing: ${file}`);
  const modExports = loadTsModule(file);
  const modDataKey = Object.keys(modExports).find(k => (k.includes('Module') || k.includes('Data')) && !k.includes('Lessons'));
  const lessonsKey = Object.keys(modExports).find(k => k.includes('Lessons'));
  
  assert(modDataKey, `Missing module data in ${m}`);
  assert(lessonsKey, `Missing lessons export in ${m}`);
  
  const modData = modExports[modDataKey];
  const lessons = modExports[lessonsKey];
  const count = Object.keys(lessons).length;
  totalPandasLessons += count;
  
  console.log(`  Checking ${modData.id}: "${modData.title}" (${count} lessons)...`);
  assert(modData.lessons.length === count, `Module summary length mismatch in ${m}`);
  
  Object.values(lessons).forEach((l) => {
    assert(l.title && l.title.length > 3, `Invalid lesson title in ${l.id}`);
    assert(l.analogy && l.analogy.title && l.analogy.text, `Missing analogy in ${l.id}`);
    assert(l.problemSolved && l.problemSolved.title, `Missing problemSolved in ${l.id}`);
    assert(l.runnableCode && l.runnableCode.code, `Missing runnableCode in ${l.id}`);
    assert(l.runnableCode.expectedOutput, `Missing expectedOutput in ${l.id}`);
    assert(l.lineByLineExplanation && l.lineByLineExplanation.length > 0, `Missing lineByLine in ${l.id}`);
    assert(l.commonMistakes && l.commonMistakes.length > 0, `Missing commonMistakes in ${l.id}`);
    assert(l.realWorldUseCases && l.realWorldUseCases.length > 0, `Missing realWorldUseCases in ${l.id}`);
    assert(l.quiz && l.quiz.length >= 3, `Missing quiz in ${l.id}`);
    assert(l.independentExercise && l.independentExercise.problem, `Missing independentExercise in ${l.id}`);
  });
});
console.log(`  [PASS] All 10 Pandas modules verified. Total complete Pandas lessons: ${totalPandasLessons}`);

// 3. Verify Master Curriculum Integration
console.log('\n--- [3/3] Validating Master Curriculum Registration ---');
const masterFile = path.join(__dirname, '..', 'src', 'data', 'modules', 'curriculum.ts');
const masterCode = fs.readFileSync(masterFile, 'utf8');
assert(masterCode.includes('MODULES_CATALOG_NUMPY'), 'Missing MODULES_CATALOG_NUMPY in master curriculum');
assert(masterCode.includes('NUMPY_FULL_LESSONS'), 'Missing NUMPY_FULL_LESSONS in master curriculum');
assert(masterCode.includes('MODULES_CATALOG_PANDAS'), 'Missing MODULES_CATALOG_PANDAS in master curriculum');
assert(masterCode.includes('PANDAS_FULL_LESSONS'), 'Missing PANDAS_FULL_LESSONS in master curriculum');

console.log('=================================================================');
console.log(`  SUCCESS: NUMPY (${totalNumpyLessons} LESSONS) & PANDAS (${totalPandasLessons} LESSONS) FULLY VERIFIED!`);
console.log('=================================================================');
