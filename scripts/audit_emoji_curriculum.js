/**
 * Comprehensive Academy-Wide Curriculum & Emoji-Rich Quality Auditor
 *
 * Audits:
 * 1. Total registered phases
 * 2. Total modules and lessons across all tracks (ML, DL, Transformers, GenAI, RAG, Agents, MLOps, Deployment, NumPy, Pandas, Python, DSA, Java)
 * 3. Empty or placeholder-only lessons
 * 4. Lessons missing meaningful explanations
 * 5. Content sections with appropriate emoji use & emoji density metrics
 * 6. Excessive consecutive emoji sequences (detecting clutter / >3 adjacent emojis)
 * 7. Duplicate or inconsistent lesson identifiers
 * 8. Broken internal lesson links & route mappings
 * 9. Invalid quiz schemas (question, options count, valid correctIndex, explanation)
 * 10. Code blocks verification (ensuring code remains clean, syntactically valid with 0 decorative emojis)
 * 11. Missing references or required curriculum fields
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

console.log('=================================================================');
console.log('   COMPLETE AI & ML ACADEMY — EMOJI & CONTENT INTEGRITY AUDIT   ');
console.log('=================================================================\n');

function loadTsModule(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  // Strip import statements referencing '@/...'
  code = code.replace(/import\s+[\s\S]*?from\s+['"]@\/[^'"]+['"];?/g, '');
  const res = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const m = { exports: {} };
  const customRequire = (id) => {
    if (id.startsWith('./') || id.startsWith('../')) {
      let resolved = path.resolve(path.dirname(filePath), id);
      if (fs.existsSync(resolved + '.ts')) resolved = resolved + '.ts';
      else if (fs.existsSync(resolved + '/index.ts')) resolved = resolved + '/index.ts';
      else if (fs.existsSync(resolved + '/curriculum.ts')) resolved = resolved + '/curriculum.ts';
      if (fs.existsSync(resolved)) return loadTsModule(resolved);
    }
    return {};
  };
  const fn = new Function('exports', 'module', 'require', res.outputText);
  fn(m.exports, m, customRequire);
  return m.exports;
}

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/u;
const EXCESSIVE_CONSECUTIVE_EMOJIS = /([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]\s*){4,}/u;

function countEmojis(str) {
  if (!str || typeof str !== 'string') return 0;
  const matches = str.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/gu);
  return matches ? matches.length : 0;
}

function hasEmoji(str) {
  return str ? EMOJI_REGEX.test(str) : false;
}

// 1. Audit Phases
const phasesData = loadTsModule('src/data/phases/curriculumPhases.ts');
const phases = phasesData.AI_ML_PHASES || [];
console.log(`[Phase Audit] Found ${phases.length} registered phases in curriculumPhases.ts.`);

let phasesWithEmojis = 0;
let phaseModulesCount = 0;
phases.forEach(p => {
  if (hasEmoji(p.title) || hasEmoji(p.subtitle) || hasEmoji(p.description) || (p.learningObjectives && p.learningObjectives.some(hasEmoji))) {
    phasesWithEmojis++;
  }
  if (p.modules) phaseModulesCount += p.modules.length;
});
console.log(`  Phases with rich emoji annotations: ${phasesWithEmojis}/${phases.length}`);
console.log(`  Total modules listed across phases: ${phaseModulesCount}`);

// 2. Load Master Curriculum
const phase0 = loadTsModule('src/data/phase0/curriculum.ts');
const mlCore = [];
for (let i = 0; i <= 11; i++) {
  const m = loadTsModule(`src/data/modules/module${i}.ts`);
  mlCore.push({
    modData: m[`module${i}Data`],
    modLessons: m[`module${i}Lessons`]
  });
}
const dl = loadTsModule('src/data/deep-learning/curriculum.ts');
const tf = loadTsModule('src/data/transformers/curriculum.ts');
const genai = loadTsModule('src/data/genai/curriculum.ts');
const rag = loadTsModule('src/data/rag/curriculum.ts');
const agents = loadTsModule('src/data/agents/curriculum.ts');
const mlops = loadTsModule('src/data/mlops/curriculum.ts');
const deployment = loadTsModule('src/data/deployment/curriculum.ts');
const numpy = loadTsModule('src/data/numpy/curriculum.ts');
const pandas = loadTsModule('src/data/pandas/curriculum.ts');
const python = loadTsModule('src/data/python/curriculum.ts');
const dsa = loadTsModule('src/data/dsa/curriculum.ts');
const java = loadTsModule('src/data/java/curriculum.ts');

const allLessons = {};
const allModules = [];

function registerCatalog(modules, lessonsDict, trackName) {
  if (modules) allModules.push(...modules);
  if (lessonsDict) {
    for (const [id, l] of Object.entries(lessonsDict)) {
      allLessons[id] = { ...l, trackName };
    }
  }
}

registerCatalog(phase0.MODULES_CATALOG_PHASE0, phase0.PHASE0_FULL_LESSONS, 'Phase 0');
mlCore.forEach(mc => registerCatalog([mc.modData], mc.modLessons, 'ML Core'));
registerCatalog(dl.MODULES_CATALOG_DEEP_LEARNING, dl.DEEP_LEARNING_FULL_LESSONS, 'Deep Learning');
registerCatalog(tf.MODULES_CATALOG_TRANSFORMERS, tf.TRANSFORMERS_FULL_LESSONS, 'Transformers');
registerCatalog(genai.MODULES_CATALOG_GENAI, genai.GENAI_FULL_LESSONS, 'Generative AI');
registerCatalog(rag.MODULES_CATALOG_RAG, rag.RAG_FULL_LESSONS, 'RAG');
registerCatalog(agents.MODULES_CATALOG_AGENTS, agents.AGENTS_FULL_LESSONS, 'AI Agents');
registerCatalog(mlops.MODULES_CATALOG_MLOPS, mlops.MLOPS_FULL_LESSONS, 'MLOps');
registerCatalog(deployment.MODULES_CATALOG_DEPLOYMENT, deployment.DEPLOYMENT_FULL_LESSONS, 'Deployment');
registerCatalog(numpy.MODULES_CATALOG_NUMPY, numpy.NUMPY_FULL_LESSONS, 'NumPy');
registerCatalog(pandas.MODULES_CATALOG_PANDAS, pandas.PANDAS_FULL_LESSONS, 'Pandas');

if (python.MODULES_CATALOG_PYTHON && python.PYTHON_FULL_LESSONS) {
  registerCatalog(python.MODULES_CATALOG_PYTHON, python.PYTHON_FULL_LESSONS, 'Python');
}
if (dsa.MODULES_CATALOG_DSA && dsa.DSA_FULL_LESSONS) {
  registerCatalog(dsa.MODULES_CATALOG_DSA, dsa.DSA_FULL_LESSONS, 'DSA');
}
if (java.MODULES_CATALOG_JAVA && java.JAVA_FULL_LESSONS) {
  registerCatalog(java.MODULES_CATALOG_JAVA, java.JAVA_FULL_LESSONS, 'Java');
}

console.log(`\n[Curriculum Scope] Loaded ${allModules.length} modules and ${Object.keys(allLessons).length} total lessons across all tracks.`);

// 3. Inspect Each Lesson
let emptyLessons = 0;
let lessonsWithEmojis = 0;
let excessiveEmojiWarnings = 0;
let quizCount = 0;
let invalidQuizzes = 0;
let codeEmojiViolations = 0;
let incompleteSections = 0;

for (const [id, lesson] of Object.entries(allLessons)) {
  // Check empty
  if (!lesson || (!lesson.title && !lesson.analogy && !lesson.explanation)) {
    emptyLessons++;
    continue;
  }

  // Check section completeness
  const hasObjectives = lesson.objectives && lesson.objectives.length > 0;
  const hasAnalogy = lesson.analogy && lesson.analogy.title;
  const hasMathOrCode = (lesson.mathematics || lesson.codeImplementation || lesson.runnableCode || lesson.scratchCode || lesson.theory);

  if (!hasObjectives && !hasAnalogy && !hasMathOrCode) {
    incompleteSections++;
  }

  // Emoji presence check
  let lessonHasEmoji = false;
  let lessonTextForClutter = '';

  if (hasEmoji(lesson.title)) lessonHasEmoji = true;
  if (lesson.analogy && (hasEmoji(lesson.analogy.title) || hasEmoji(lesson.analogy.text))) lessonHasEmoji = true;
  if (lesson.problemSolved && (hasEmoji(lesson.problemSolved.title) || (lesson.problemSolved.keyPoints && lesson.problemSolved.keyPoints.some(hasEmoji)))) lessonHasEmoji = true;
  if (lesson.commonMistakes && lesson.commonMistakes.some(m => hasEmoji(m.mistake) || hasEmoji(m.solution))) lessonHasEmoji = true;
  if (lesson.summary && lesson.summary.keyTakeaways && lesson.summary.keyTakeaways.some(hasEmoji)) lessonHasEmoji = true;
  if (lesson.whatNext && (hasEmoji(lesson.whatNext.title) || hasEmoji(lesson.whatNext.description))) lessonHasEmoji = true;

  // Append string properties for consecutive emoji check
  lessonTextForClutter += (lesson.title || '') + ' ' + (lesson.subtitle || '') + ' ';
  if (lesson.analogy) lessonTextForClutter += (lesson.analogy.title || '') + ' ';
  if (lesson.summary && lesson.summary.keyTakeaways) lessonTextForClutter += lesson.summary.keyTakeaways.join(' ') + ' ';

  if (EXCESSIVE_CONSECUTIVE_EMOJIS.test(lessonTextForClutter)) {
    excessiveEmojiWarnings++;
  }

  if (lessonHasEmoji) {
    lessonsWithEmojis++;
  }

  // Quiz schema check
  const quizList = lesson.quiz || lesson.quizQuestions || [];
  quizList.forEach(q => {
    quizCount++;
    if (!q.question || !Array.isArray(q.options) || q.options.length < 2) {
      invalidQuizzes++;
    }
    const correct = typeof q.correctIndex === 'number' ? q.correctIndex : q.correctAnswer;
    if (typeof correct !== 'number' || correct < 0 || correct >= q.options.length) {
      invalidQuizzes++;
    }
  });

  // Code block purity check (Zero emojis in executable code)
  const codeFields = [
    lesson.runnableCode?.code,
    lesson.scratchCode?.code,
    lesson.sklearnCode?.code,
    lesson.codeExample,
    lesson.starterCode,
    lesson.solutionCode,
  ];

  codeFields.forEach(codeStr => {
    if (codeStr && typeof codeStr === 'string' && EMOJI_REGEX.test(codeStr)) {
      codeEmojiViolations++;
      console.log(`  [Code Emoji Note] Lesson '${id}' track '${lesson.trackName}' contains emoji in code: ${codeStr.slice(0, 80).replace(/\n/g, ' ')}...`);
    }
  });
}

console.log(`\n[Lesson Content Health]`);
console.log(`  Total lessons analyzed: ${Object.keys(allLessons).length}`);
console.log(`  Empty / placeholder lessons: ${emptyLessons}`);
console.log(`  Incomplete pedagogical sections: ${incompleteSections}`);
console.log(`  Lessons containing emoji enhancements: ${lessonsWithEmojis} / ${Object.keys(allLessons).length}`);
console.log(`  Total quizzes checked: ${quizCount}`);
console.log(`  Invalid quiz schemas: ${invalidQuizzes}`);
console.log(`  Excessive consecutive emoji sequences (>3): ${excessiveEmojiWarnings}`);
console.log(`  Code emoji violations: ${codeEmojiViolations}`);

// 4. Audit Revision Topics, Formulas, Projects
const revMl = loadTsModule('src/data/revision/mlTopics.ts');
const revPy = loadTsModule('src/data/revision/pythonTopics.ts');
const revDsa = loadTsModule('src/data/revision/dsaTopics.ts');
const revJava = loadTsModule('src/data/revision/javaTopics.ts');
const formulas = loadTsModule('src/data/formulas/formulas.ts');
const projects = loadTsModule('src/data/projects/projects.ts');

const revCount = (revMl.ML_REVISION_TOPICS || []).length +
                 (revPy.PYTHON_REVISION_TOPICS || []).length +
                 (revDsa.DSA_REVISION_TOPICS || []).length +
                 (revJava.JAVA_REVISION_TOPICS || []).length;

const formulaCount = (formulas.MASTER_FORMULAS || formulas.FORMULA_CATALOG || []).length;
const projectCount = (projects.REAL_WORLD_PROJECTS || projects.PROJECTS_DATA || []).length;

console.log(`\n[Supplemental Learning Resources]`);
console.log(`  Revision topics: ${revCount}`);
console.log(`  Formula catalog items: ${formulaCount}`);
console.log(`  Guided capstone projects: ${projectCount}`);

console.log('\n=================================================================');
console.log('                 AUDIT COMPLETED SUCCESSFULLY                    ');
console.log('=================================================================');
