'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Bookmark,
  BookOpen,
  FileText,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  Code2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Save,
  Clock,
  Layers,
  Cpu,
  Calculator,
  Compass,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';
import { MathBlock, MathInline } from '../math/Math';
import { VisualizerDispatcher } from '../visualizers/VisualizerDispatcher';
import { CodeRunner } from '../code/CodeRunner';
import {
  getProgress,
  toggleLessonCompletion,
  toggleBookmark,
  saveNote,
  recordQuizScore,
} from '@/lib/storage';
import confetti from 'canvas-confetti';

interface LessonViewProps {
  lesson: LessonContent;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userNote, setUserNote] = useState<string>('');
  const [noteSaved, setNoteSaved] = useState<boolean>(false);

  // Practice questions reveal state
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Quiz interactive state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Independent exercise hint/solution reveal
  const [hintIndex, setHintIndex] = useState<number>(-1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Active section for table of contents
  const [activeSection, setActiveSection] = useState<string>('analogy');

  useEffect(() => {
    const progress = getProgress();
    setIsCompleted(!!progress.completedLessons[lesson.id]);
    setIsBookmarked(progress.bookmarks.includes(lesson.id));
    setUserNote(progress.notes[lesson.id] || '');
  }, [lesson.id]);

  const handleToggleComplete = () => {
    const newState = toggleLessonCompletion(lesson.id);
    setIsCompleted(newState);
    if (newState) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleToggleBookmark = () => {
    const newState = toggleBookmark(lesson.id);
    setIsBookmarked(newState);
  };

  const handleSaveNote = () => {
    saveNote(lesson.id, userNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleGradeQuiz = () => {
    let score = 0;
    lesson.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    recordQuizScore(lesson.id, score, lesson.quiz.length);
    if (score === lesson.quiz.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const sectionsList = [
    { id: 'analogy', label: '1. Intuitive Analogy' },
    { id: 'problem', label: '2. Problem Definition' },
    { id: 'intuition', label: '3. Mechanics & Intuition' },
    { id: 'mathematics', label: '4. Mathematical Foundations' },
    { id: 'derivation', label: '5. Step-by-Step Derivation' },
    { id: 'variables', label: '6. Formula Variable Reference' },
    { id: 'numerical', label: '7. Hand Numerical Walkthrough' },
    { id: 'visualizer', label: '8. Interactive Visualization' },
    { id: 'scratch', label: '9. NumPy From Scratch' },
    { id: 'sklearn', label: '10. Production Scikit-Learn' },
    { id: 'runnable', label: '11. Runnable Python Sandbox' },
    { id: 'line-by-line', label: '12. Line-by-Line Code Breakdown' },
    { id: 'hyperparameters', label: '13. Hyperparameters' },
    { id: 'assumptions', label: '14. Assumptions & Constraints' },
    { id: 'pitfalls', label: '15. Common Pitfalls & Debugging' },
    { id: 'usecases', label: '16. Real-World Systems' },
    { id: 'practice', label: '17. Practice Questions' },
    { id: 'quiz', label: '18. Concept Quiz' },
    { id: 'exercise', label: '19. Independent Challenge' },
    { id: 'summary', label: '20. Summary & Next Steps' },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Top Breadcrumb & Action Banner */}
      <div className="sticky top-14 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/curriculum" className="hover:text-indigo-600 transition-colors">
              Curriculum
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/curriculum/${lesson.moduleId}`}
              className="hover:text-indigo-600 transition-colors"
            >
              Module {lesson.moduleId.replace('module-', '')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-[200px] sm:max-w-xs">
              {lesson.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              onClick={handleToggleComplete}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm ${
                isCompleted
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Lesson Content (20 Sections) */}
        <div className="lg:col-span-9 space-y-12">
          {/* Header Title Card */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Lesson {lesson.order}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {lesson.difficulty}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {lesson.readTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-2 font-light">
              {lesson.subtitle}
            </p>
          </div>

          {/* Section 1: Real-World Analogy */}
          <section id="analogy" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-amber-500/10 text-amber-500">
                <Lightbulb className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                1. Real-World Analogy
              </h2>
            </div>
            <div className="p-5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-slate-800 dark:text-slate-200 leading-relaxed">
              <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
                {lesson.analogy.title}
              </h3>
              <p className="mb-3">{lesson.analogy.text}</p>
              <div className="text-xs font-medium text-amber-800 dark:text-amber-400 bg-white/70 dark:bg-slate-900/50 p-3 rounded-lg border border-amber-200 dark:border-amber-900/50">
                <span className="font-bold">Core Mental Model: </span>
                {lesson.analogy.metaphor}
              </div>
            </div>
          </section>

          {/* Section 2: Problem Definition */}
          <section id="problem" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-rose-500/10 text-rose-500">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                2. What Problem Does This Algorithm Solve?
              </h2>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {lesson.problemSolved.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {lesson.problemSolved.description}
              </p>
              <ul className="space-y-2 mt-3">
                {lesson.problemSolved.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3: Intuition and Mechanics */}
          <section id="intuition" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-500">
                <Compass className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                3. Mechanics & Geometric Intuition
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {lesson.intuition.overview}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lesson.intuition.steps.map((st) => (
                  <div
                    key={st.step}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center font-bold mb-2">
                        {st.step}
                      </span>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                        {st.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {st.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Mathematical Foundations */}
          <section id="mathematics" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
                <Calculator className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                4. Mathematical Foundations
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {lesson.mathematics.overview}
              </p>
              <div className="space-y-4">
                {lesson.mathematics.foundations.map((found, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                  >
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                      {found.name}
                    </h3>
                    <MathBlock math={found.latex} />
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      {found.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: Step-by-Step Derivation */}
          <section id="derivation" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-500">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                5. Step-by-Step Mathematical Derivation
              </h2>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {lesson.derivation.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Objective: {lesson.derivation.objective}
                </p>
              </div>

              <div className="space-y-4">
                {lesson.derivation.steps.map((st) => (
                  <div
                    key={st.step}
                    className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                      <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                        {st.step}
                      </span>
                      <span>{st.label}</span>
                    </div>
                    <MathBlock math={st.latex} />
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {st.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 6: Formula Variable Reference */}
          <section id="variables" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-violet-500/10 text-violet-500">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                6. Formula Variable Reference
              </h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3 font-semibold">Symbol</th>
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Dimensions</th>
                    <th className="p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  {lesson.variables.map((v, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        <MathInline math={v.symbol} />
                      </td>
                      <td className="p-3 font-medium text-slate-900 dark:text-slate-200">{v.name}</td>
                      <td className="p-3 font-mono text-slate-500">{v.dimensions || 'Scalar'}</td>
                      <td className="p-3">{v.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Small Numerical Walkthrough */}
          <section id="numerical" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-amber-500/10 text-amber-500">
                <Calculator className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                7. Hand Numerical Example Solved Step-by-Step
              </h2>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                Scenario: {lesson.numericalExample.scenario}
              </p>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full text-center text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      {Object.keys(lesson.numericalExample.dataset[0] || {}).map((col) => (
                        <th key={col} className="p-2 font-mono font-semibold uppercase">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                    {lesson.numericalExample.dataset.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {Object.values(row).map((val, cIdx) => (
                          <td key={cIdx} className="p-2">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Calculation Steps */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wide block">
                  Manual Step Calculations:
                </span>
                {lesson.numericalExample.calculations.map((calc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                        {calc.step}
                      </span>
                      <MathInline math={calc.math} />
                    </div>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
                      {calc.result}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-xs text-emerald-900 dark:text-emerald-300">
                <span className="font-semibold">Hand Conclusion: </span>
                {lesson.numericalExample.finalConclusion}
              </div>
            </div>
          </section>

          {/* Section 8: Interactive Visualization */}
          <section id="visualizer" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-500">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                8. Interactive Visualization Laboratory
              </h2>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {lesson.visualExplanation.description}
              </p>
              <VisualizerDispatcher type={lesson.visualizerType} />
            </div>
          </section>

          {/* Section 9: NumPy From Scratch */}
          <section id="scratch" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
                <Code2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                9. NumPy Vectorized Implementation From Scratch
              </h2>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {lesson.scratchCode.explanation}
              </p>
              <CodeRunner
                initialCode={lesson.scratchCode.code}
                title={lesson.scratchCode.title}
                readOnly={false}
              />
            </div>
          </section>

          {/* Section 10: Production Scikit-Learn */}
          <section id="sklearn" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-500">
                <Cpu className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                10. Production Scikit-Learn Pipeline
              </h2>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {lesson.sklearnCode.explanation}
              </p>
              <CodeRunner
                initialCode={lesson.sklearnCode.code}
                title={lesson.sklearnCode.title}
                readOnly={false}
              />
            </div>
          </section>

          {/* Section 11: Runnable Code Sandbox */}
          <section id="runnable" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-violet-500/10 text-violet-500">
                <Code2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                11. Complete Runnable Code Sandbox
              </h2>
            </div>
            <CodeRunner
              initialCode={lesson.runnableCode.code}
              expectedOutput={lesson.runnableCode.expectedOutput}
              title="Full End-to-End Script with Benchmark Evaluation"
            />
          </section>

          {/* Section 12: Line-by-Line Breakdown */}
          <section id="line-by-line" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-amber-500/10 text-amber-500">
                <FileText className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                12. Line-by-Line Code Breakdown
              </h2>
            </div>
            <div className="space-y-3">
              {lesson.lineByLineExplanation.map((line, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row gap-3 text-xs"
                >
                  <div className="md:w-1/3">
                    <span className="font-mono text-[10px] text-indigo-500 block font-semibold mb-1">
                      {line.lines}
                    </span>
                    <pre className="font-mono bg-slate-100 dark:bg-slate-800/80 p-2 rounded text-slate-800 dark:text-slate-200 overflow-x-auto">
                      {line.codeSnippet}
                    </pre>
                  </div>
                  <div className="md:w-2/3 flex items-center text-slate-600 dark:text-slate-300 leading-relaxed">
                    {line.explanation}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 13: Hyperparameters Guide */}
          <section id="hyperparameters" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-500">
                <Compass className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                13. Essential Hyperparameters & Practical Tuning
              </h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3 font-semibold">Parameter</th>
                    <th className="p-3 font-semibold">Default</th>
                    <th className="p-3 font-semibold">Common Range</th>
                    <th className="p-3 font-semibold">Effect on Model</th>
                    <th className="p-3 font-semibold">Tuning Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  {lesson.hyperparameters.map((hp, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {hp.name}
                      </td>
                      <td className="p-3 font-mono text-slate-500">{hp.defaultVal}</td>
                      <td className="p-3 font-mono text-slate-500">{hp.range}</td>
                      <td className="p-3">{hp.effect}</td>
                      <td className="p-3 text-slate-900 dark:text-slate-200 font-medium">{hp.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 14: Assumptions and Constraints */}
          <section id="assumptions" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-rose-500/10 text-rose-500">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                14. Assumptions & Theoretical Constraints
              </h2>
            </div>
            <div className="space-y-3">
              {lesson.assumptions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
                >
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    {item.assumption}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs">
                    <div className="p-2.5 rounded bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300 border border-rose-100 dark:border-rose-900/30">
                      <span className="font-semibold block mb-0.5">Why It Matters:</span>
                      {item.whyItMatters}
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      <span className="font-semibold block mb-0.5">How to Verify:</span>
                      {item.howToVerify}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 15: Common Pitfalls & Debugging */}
          <section id="pitfalls" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-amber-500/10 text-amber-500">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                15. Common Pitfalls & Debugging Tips
              </h2>
            </div>
            <div className="space-y-3">
              {lesson.commonMistakes.map((mistake, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10 text-xs space-y-2"
                >
                  <div className="font-semibold text-amber-900 dark:text-amber-300 text-sm">
                    ⚠️ {mistake.mistake}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">Solution: </span>
                    {mistake.solution}
                  </p>
                  {mistake.codeExample && (
                    <pre className="p-2 rounded bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                      {mistake.codeExample}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 16: Real-World Use Cases */}
          <section id="usecases" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                16. Industry Applications & Case Studies
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lesson.realWorldUseCases.map((uc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      {uc.industry}
                    </span>
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mt-1 mb-2">
                      {uc.application}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2 mt-2">
                    {uc.benefit}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 17: Practice Questions */}
          <section id="practice" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-500">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                17. Practice Questions & Conceptual Exercises
              </h2>
            </div>
            <div className="space-y-4">
              {lesson.practiceQuestions.map((q, idx) => {
                const isRevealed = !!revealedAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-xs space-y-3"
                  >
                    <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                      Question {idx + 1}: {q.question}
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Hint: </span>
                      {q.hint}
                    </div>
                    <button
                      onClick={() =>
                        setRevealedAnswers((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                      }
                      className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {isRevealed ? 'Hide Explanation & Answer' : 'Reveal Answer'}
                    </button>
                    {isRevealed && (
                      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 leading-relaxed">
                        <span className="font-bold block mb-1">Detailed Answer:</span>
                        {q.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 18: Interactive Quiz */}
          <section id="quiz" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-500">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                18. Concept Mastery Quiz
              </h2>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
              {lesson.quiz.map((q, idx) => {
                const selected = quizAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={q.id} className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold block">
                      Question {idx + 1} of {lesson.quiz.length}
                    </span>
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {q.question}
                    </h3>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        let btnStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700';

                        if (selected === oIdx) {
                          btnStyle = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold';
                        }

                        if (quizSubmitted) {
                          if (oIdx === q.correctIndex) {
                            btnStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold';
                          } else if (selected === oIdx) {
                            btnStyle = 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectQuizOption(q.id, oIdx)}
                            className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && oIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                          Explanation:
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="flex items-center justify-between pt-2">
                {!quizSubmitted ? (
                  <button
                    onClick={handleGradeQuiz}
                    disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                    className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    Submit Quiz & Check Answers
                  </button>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Your Score: <span className="font-mono text-indigo-600 dark:text-indigo-400">{quizScore} / {lesson.quiz.length}</span> ({Math.round((quizScore / lesson.quiz.length) * 100)}%)
                    </span>
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Retry Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 19: Independent Exercise */}
          <section id="exercise" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-amber-500/10 text-amber-500">
                <Code2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                19. Independent Coding Challenge
              </h2>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {lesson.independentExercise.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {lesson.independentExercise.problem}
                </p>
              </div>

              {/* Progressive Hints */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Progressive Hints
                  </span>
                  <button
                    onClick={() =>
                      setHintIndex((idx) =>
                        Math.min(lesson.independentExercise.hints.length - 1, idx + 1)
                      )
                    }
                    disabled={hintIndex >= lesson.independentExercise.hints.length - 1}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-40"
                  >
                    + Reveal Next Hint ({hintIndex + 1}/{lesson.independentExercise.hints.length})
                  </button>
                </div>

                {hintIndex >= 0 && (
                  <div className="space-y-2">
                    {lesson.independentExercise.hints.slice(0, hintIndex + 1).map((h, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-300"
                      >
                        <span className="font-bold">Hint {i + 1}: </span>
                        {h}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Starter Code Runner */}
              <div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Solve Directly in this Interactive Sandbox:
                </span>
                <CodeRunner
                  initialCode={lesson.independentExercise.starterCode}
                  title="Challenge Workspace"
                />
              </div>

              {/* Reveal Solution Toggle */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                >
                  {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showSolution ? 'Hide Author Solution' : 'Reveal Complete Reference Solution'}
                </button>

                {showSolution && (
                  <div className="mt-3">
                    <CodeRunner
                      initialCode={lesson.independentExercise.solution}
                      title="Reference Solution (Verified Output)"
                      readOnly={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 20: Summary & Next Lesson Bridge */}
          <section id="summary" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                20. Key Takeaways & Next Topic Bridge
              </h2>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/50 shadow-sm space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Executive Takeaways:
                </h3>
                <ul className="space-y-2">
                  {lesson.summary.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {lesson.summary.nextLessonId && (
                <div className="pt-4 border-t border-indigo-200/60 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide block">
                      Prerequisite-Aware Next Topic:
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {lesson.summary.nextLessonTitle}
                    </span>
                  </div>
                  <Link
                    href={`/curriculum/${lesson.summary.nextLessonModuleId || lesson.moduleId}/${lesson.summary.nextLessonId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm self-start sm:self-auto"
                  >
                    <span>Proceed to Next Lesson</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar: Table of Contents & Personal Notes */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="sticky top-28 space-y-6">
            {/* Table of Contents */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-3">
                Lesson Navigation (20 Parts)
              </span>
              <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1 text-xs">
                {sectionsList.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`block px-2.5 py-1.5 rounded text-[11px] truncate transition-colors ${
                      activeSection === sec.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {sec.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Personal Study Notes Drawer */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  Lesson Study Notes
                </span>
                {noteSaved && (
                  <span className="text-[10px] text-emerald-500 font-medium animate-pulse">
                    Saved!
                  </span>
                )}
              </div>
              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Jot down mathematical insights, formula notes, or key intuition..."
                className="w-full h-32 p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={handleSaveNote}
                className="w-full py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
