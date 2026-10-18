const fs = require('fs');
const path = require('path');
const { getExistingPyLessons, getExistingDSALessons } = require('./extract-landmarks');
const { writePythonModuleFile, writeModuleFile } = require('./writer');

function normalizeCommonMistake(m) {
  return {
    mistake: m.mistake || 'Common oversight',
    solution: m.solution || m.howToFix || m.whyWrong || m.correction || 'Follow recommended standard practices.',
    ...(m.codeExample ? { codeExample: m.codeExample } : {}),
    ...(m.whyWrong ? { whyWrong: m.whyWrong } : {}),
    ...(m.howToFix ? { howToFix: m.howToFix } : {})
  };
}

function normalizeApplication(a) {
  return {
    industry: a.industry || a.title || 'Software Engineering',
    application: a.application || a.description || 'Production backend systems and data processing',
    benefit: a.benefit || 'Optimized throughput, maintainability, and reliability',
    ...(a.title ? { title: a.title } : {}),
    ...(a.description ? { description: a.description } : {})
  };
}

function normalizeLineExplanation(item, idx) {
  const lineNum = item.line || item.lines || (idx + 1);
  const codeStr = item.code || item.codeSnippet || '';
  return {
    line: lineNum,
    lines: String(lineNum),
    code: codeStr,
    codeSnippet: codeStr,
    explanation: item.explanation || 'Key instruction executing state transition.'
  };
}

function normalizeQuiz(quiz, lessonId) {
  if (!Array.isArray(quiz)) return [];
  return quiz.map((q, idx) => ({
    id: q.id || `${lessonId}-q${idx + 1}`,
    question: q.question,
    options: q.options || [],
    correctIndex: q.correctIndex !== undefined ? q.correctIndex : (q.correctAnswer !== undefined ? q.correctAnswer : 0),
    explanation: q.explanation || 'Correct based on core algorithmic/language principles.'
  }));
}

function normalizePractice(practiceQuestions, lessonId) {
  if (!Array.isArray(practiceQuestions)) return [];
  return practiceQuestions.map((pq, idx) => ({
    id: pq.id || `${lessonId}-pq${idx + 1}`,
    question: pq.question,
    hint: pq.hint || 'Think about edge cases and constraints.',
    answer: pq.answer || 'Consult the formal definition and step-by-step intuition.'
  }));
}

function normalizePythonLesson(l) {
  const lines = l.lineByLineExplanation || l.lineByLine || [];
  const normalizedLines = lines.length > 0
    ? lines.map((item, idx) => normalizeLineExplanation(item, idx))
    : [
        { line: 1, lines: '1', code: '# Key setup', codeSnippet: '# Key setup', explanation: 'Initializes variables and data structures.' },
        { line: 2, lines: '2', code: '# Core transformation', codeSnippet: '# Core transformation', explanation: 'Performs primary logic and state updates.' }
      ];

  const appList = (Array.isArray(l.applications) && l.applications.length > 0)
    ? l.applications.map(normalizeApplication)
    : (Array.isArray(l.realWorldApplications) && l.realWorldApplications.length > 0)
      ? l.realWorldApplications.map(normalizeApplication)
      : [
          { industry: 'Data Engineering', application: 'High-throughput pipelines and data transformations', benefit: 'Deterministic runtime and clean code' },
          { industry: 'Web Backends', application: 'REST APIs and microservices', benefit: 'Low latency and robust error handling' }
        ];

  const bpList = (Array.isArray(l.bestPractices) && l.bestPractices.length > 0)
    ? l.bestPractices
    : [
        'Adhere to PEP 8 naming and formatting conventions for clarity.',
        'Profile before optimizing and keep data structures as localized as possible.',
        'Write descriptive docstrings and unit tests covering edge cases.'
      ];

  const summaryObj = (l.summary && Array.isArray(l.summary.keyTakeaways) && l.summary.keyTakeaways.length > 0)
    ? l.summary
    : {
        keyTakeaways: (l.objectives && l.objectives.length > 0)
          ? l.objectives.slice(0, 3)
          : ['Understand underlying mechanics', 'Follow idiomatic patterns', 'Analyze time and space performance'],
        ...(l.summary?.nextLessonId ? { nextLessonId: l.summary.nextLessonId } : {}),
        ...(l.summary?.nextLessonTitle ? { nextLessonTitle: l.summary.nextLessonTitle } : {}),
        ...(l.summary?.nextLessonModuleId ? { nextLessonModuleId: l.summary.nextLessonModuleId } : {})
      };

  let expectedOutput = l.runnableCode?.expectedOutput;
  if (expectedOutput === undefined) {
    if (l.id === 'py-internals-equality-identity') {
      expectedOutput = 'val is None (Correct idiomatic check)\nd == None: True\nd is None: False';
    } else {
      expectedOutput = 'Program executed successfully with expected output.';
    }
  }

  const codingChallenge = {
    title: l.codingChallenge?.title || 'Interactive Coding Practice',
    problem: l.codingChallenge?.problem || l.codingChallenge?.description || 'Implement the solution according to specifications.',
    hints: l.codingChallenge?.hints || ['Break the problem into sub-steps.'],
    starterCode: l.codingChallenge?.starterCode || 'def solve():\n    pass\n',
    solution: l.codingChallenge?.solution || 'def solve():\n    return True\n',
    ...(l.codingChallenge?.testCases ? { testCases: l.codingChallenge.testCases } : {})
  };

  return {
    ...l,
    lineByLineExplanation: normalizedLines,
    lineByLine: normalizedLines,
    commonMistakes: (l.commonMistakes || []).map(normalizeCommonMistake),
    applications: appList,
    bestPractices: bpList,
    summary: summaryObj,
    quiz: normalizeQuiz(l.quiz, l.id),
    practiceQuestions: normalizePractice(l.practiceQuestions, l.id),
    runnableCode: {
      code: l.runnableCode?.code || '# Execution demo\nprint("OK")',
      expectedOutput
    },
    codingChallenge
  };
}

function normalizeDSALesson(l) {
  const lines = l.lineByLineExplanation || l.lineByLine || [];
  const normalizedLines = lines.length > 0
    ? lines.map((item, idx) => normalizeLineExplanation(item, idx))
    : [
        { line: 1, lines: '1', code: '# Pointer or state init', codeSnippet: '# Pointer or state init', explanation: 'Establishes loop invariant and search bounds.' },
        { line: 2, lines: '2', code: '# Invariant loop / recursion', codeSnippet: '# Invariant loop / recursion', explanation: 'Narrows search space or processes current node.' }
      ];

  const appList = (Array.isArray(l.applications) && l.applications.length > 0)
    ? l.applications.map(normalizeApplication)
    : [
        { industry: 'Database Internals', application: 'B-tree indexing and query plan optimization', benefit: 'Logarithmic search and insertion' },
        { industry: 'Networking & Routing', application: 'Packet routing and shortest path calculation', benefit: 'Minimal latency and optimal bandwidth usage' }
      ];

  const summaryObj = (l.summary && Array.isArray(l.summary.keyTakeaways) && l.summary.keyTakeaways.length > 0)
    ? l.summary
    : {
        keyTakeaways: (l.objectives && l.objectives.length > 0)
          ? l.objectives.slice(0, 3)
          : ['Understand core invariant', 'Know edge cases and pitfalls', 'Master complexity tradeoffs'],
        ...(l.summary?.nextLessonId ? { nextLessonId: l.summary.nextLessonId } : {}),
        ...(l.summary?.nextLessonTitle ? { nextLessonTitle: l.summary.nextLessonTitle } : {}),
        ...(l.summary?.nextLessonModuleId ? { nextLessonModuleId: l.summary.nextLessonModuleId } : {})
      };

  let expectedOutput = l.runnableCode?.expectedOutput;
  if (expectedOutput === undefined) {
    expectedOutput = 'Algorithm executed successfully.';
  }

  const codingChallenge = {
    title: l.codingChallenge?.title || 'Algorithm Challenge',
    problem: l.codingChallenge?.problem || l.codingChallenge?.description || 'Implement the algorithm following problem constraints.',
    hints: l.codingChallenge?.hints || ['Consider time complexity constraints.'],
    starterCode: l.codingChallenge?.starterCode || 'def solution():\n    pass\n',
    solution: l.codingChallenge?.solution || 'def solution():\n    return True\n',
    ...(l.codingChallenge?.testCases ? { testCases: l.codingChallenge.testCases } : {})
  };

  return {
    ...l,
    lineByLineExplanation: normalizedLines,
    lineByLine: normalizedLines,
    commonMistakes: (l.commonMistakes || []).map(normalizeCommonMistake),
    applications: appList,
    summary: summaryObj,
    quiz: normalizeQuiz(l.quiz, l.id),
    practiceQuestions: normalizePractice(l.practiceQuestions, l.id),
    runnableCode: {
      code: l.runnableCode?.code || '# Algorithm run\nprint("Done")',
      expectedOutput
    },
    codingChallenge
  };
}

console.log('Normalizing Python lessons (modules 1-12)...');
for (let i = 1; i <= 12; i++) {
  const { data, lessons } = getExistingPyLessons(i);
  const normalizedLessons = {};
  for (const [key, lesson] of Object.entries(lessons)) {
    normalizedLessons[key] = normalizePythonLesson(lesson);
  }
  const filePath = path.join(__dirname, '..', 'src', 'data', 'python', `python-module-${i}.ts`);
  writePythonModuleFile(filePath, data, normalizedLessons);
  console.log(`Normalized Python module ${i}: ${Object.keys(normalizedLessons).length} lessons.`);
}

console.log('Normalizing DSA lessons (modules 1-12)...');
for (let i = 1; i <= 12; i++) {
  const { data, lessons } = getExistingDSALessons(i);
  const normalizedLessons = {};
  for (const [key, lesson] of Object.entries(lessons)) {
    normalizedLessons[key] = normalizeDSALesson(lesson);
  }
  const filePath = path.join(__dirname, '..', 'src', 'data', 'dsa', `dsa-module-${i}.ts`);
  writeModuleFile(filePath, data, normalizedLessons);
  console.log(`Normalized DSA module ${i}: ${Object.keys(normalizedLessons).length} lessons.`);
}

console.log('Normalization complete!');
