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
import { DSALessonContent } from '@/lib/types';
import { MathBlock, MathInline } from '../math/Math';
import { DSAVisualizerDispatcher } from './visualizers/DSAVisualizerDispatcher';
import { ComplexityBadge } from '../shared/ComplexityBadge';
import { PseudocodePanel } from '../shared/PseudocodePanel';
import { CodeRunner } from '../code/CodeRunner';
import { AITutorPanel } from '@/components/tutor/AITutorPanel';
import {
  getProgress,
  toggleLessonCompletion,
  toggleBookmark,
  saveNote,
  recordQuizScore,
} from '@/lib/storage';
import confetti from 'canvas-confetti';

interface DSALessonViewProps {
  lesson: DSALessonContent;
}

export const DSALessonView: React.FC<DSALessonViewProps> = ({ lesson }) => {
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

  // Challenge hint/solution reveal
  const [hintIndex, setHintIndex] = useState<number>(-1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

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

  const toggleRevealAnswer = (qId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSelectQuizOption = (qId: string, optIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIndex }));
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
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const difficultyColor =
    lesson.difficulty === 'Beginner'
      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
      : lesson.difficulty === 'Intermediate'
      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* 0. Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link href="/dsa" className="hover:text-violet-600 transition-colors">
              DSA Mastery Lab
            </Link>
            <span>/</span>
            <Link href={`/dsa/${lesson.moduleId}`} className="hover:text-violet-600 transition-colors">
              {lesson.moduleId.replace('dsa-module-', 'Module ')}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">{lesson.title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {lesson.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            onClick={handleToggleBookmark}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Add bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            <span className="hidden md:inline">{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleToggleComplete}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
              isCompleted
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-violet-600 hover:bg-violet-700 text-white border-violet-600 shadow-sm'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Meta Bar */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className={`px-2.5 py-1 rounded-full font-semibold border ${difficultyColor}`}>
          {lesson.difficulty}
        </span>
        <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {lesson.readTimeMinutes} min study
        </span>
        {lesson.objectives && lesson.objectives.length > 0 && (
          <span className="text-slate-400">· {lesson.objectives.length} objectives</span>
        )}
      </div>

      {/* 1. Real-World Analogy */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Lightbulb className="w-4 h-4" />
          <span>1. Intuitive Real-World Analogy</span>
        </div>
        <div className="p-6 rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-gradient-to-br from-violet-50/50 to-white dark:from-violet-950/20 dark:to-slate-900 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {lesson.analogy.title}
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {lesson.analogy.text}
          </p>
          <div className="p-3 rounded-xl bg-violet-100/60 dark:bg-violet-900/30 text-xs font-medium text-violet-900 dark:text-violet-200">
            <span className="font-bold">Mental Model: </span>
            {lesson.analogy.metaphor}
          </div>
        </div>
      </section>

      {/* 2. Problem Being Solved */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>2. What Problem Does This Solve?</span>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {lesson.problemSolved.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {lesson.problemSolved.description}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {lesson.problemSolved.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Intuition & Mechanics */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>3. Intuition &amp; Core Mechanics</span>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {lesson.intuition.overview}
          </p>
          <div className="space-y-3">
            {lesson.intuition.steps.map((st) => (
              <div key={st.step} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="w-6 h-6 rounded-lg bg-violet-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {st.step}
                </span>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Complexity Analysis */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Calculator className="w-4 h-4" />
          <span>4. Time &amp; Space Complexity Analysis</span>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {lesson.complexity.overview}
          </p>
          <ComplexityBadge cases={lesson.complexity.cases} />
          {lesson.complexity.spaceNote && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
              Note on Space: {lesson.complexity.spaceNote}
            </p>
          )}
        </div>
      </section>

      {/* 5. Interactive Visualization */}
      {lesson.visualizerType !== 'none' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>5. Interactive Algorithm Laboratory</span>
            </div>
          </div>
          <DSAVisualizerDispatcher type={lesson.visualizerType} />
        </section>
      )}

      {/* 6. Worked Example */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>6. Step-by-Step Worked Example</span>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {lesson.workedExample.title}
          </h2>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-600 dark:text-slate-300">
            Input: <span className="font-bold text-violet-600 dark:text-violet-400">{lesson.workedExample.input}</span>
          </div>
          <div className="space-y-2">
            {lesson.workedExample.steps.map((st) => (
              <div key={st.step} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 text-xs font-mono">
                <div className="space-y-0.5">
                  <span className="font-bold text-violet-600">Step {st.step}: {st.action}</span>
                  <p className="text-slate-500 font-sans">{st.explanation}</p>
                </div>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold shrink-0">
                  {st.state}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300">
            Conclusion: {lesson.workedExample.finalOutput}
          </div>
        </div>
      </section>

      {/* 7. Pseudocode & Python Scratch Implementation */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>7. Implementation from Scratch</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PseudocodePanel
            code={lesson.pseudocode.code}
            title={lesson.pseudocode.title}
          />
          <PseudocodePanel
            code={lesson.pythonCode.code}
            title={lesson.pythonCode.title}
            language="python"
          />
        </div>
      </section>

      {/* 8. Runnable Code Studio */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>8. Live Runnable Python Execution</span>
        </div>
        <CodeRunner
          initialCode={lesson.runnableCode.code}
          expectedOutput={lesson.runnableCode.expectedOutput}
        />
      </section>

      {/* 9. Line-by-Line Explanation */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>9. Line-by-Line Code Breakdown</span>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {lesson.lineByLineExplanation.map((exp, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="w-20 shrink-0 font-mono text-xs font-bold text-violet-600 dark:text-violet-400">
                {exp.lines}
              </span>
              <div className="flex-1 space-y-1">
                <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
                  {exp.codeSnippet}
                </code>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  {exp.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Edge Cases & Common Mistakes */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>10. Edge Cases &amp; Common Pitfalls</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Critical Edge Cases
            </h3>
            <div className="space-y-2">
              {lesson.edgeCases.map((ec, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">{ec.case}</span>
                  <p className="text-slate-600 dark:text-slate-400 font-sans">{ec.handling}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Common Mistakes &amp; Fixes
            </h3>
            <div className="space-y-2">
              {lesson.commonMistakes.map((cm, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1 text-xs">
                  <span className="font-bold text-rose-600 block">{cm.mistake}</span>
                  <p className="text-slate-600 dark:text-slate-400 font-sans">{cm.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Practice Questions */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>11. Practice Questions</span>
        </div>
        <div className="space-y-3">
          {lesson.practiceQuestions.map((pq) => {
            const isRevealed = !!revealedAnswers[pq.id];
            return (
              <div key={pq.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{pq.question}</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleRevealAnswer(pq.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? 'Hide Answer' : 'Reveal Answer'}</span>
                  </button>
                  <span className="text-xs text-slate-400 italic">Hint: {pq.hint}</span>
                </div>
                {isRevealed && (
                  <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                    {pq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. Interactive Quiz */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>12. Concept Check Quiz</span>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
          {lesson.quiz.map((q, qIdx) => {
            const selectedOpt = quizAnswers[q.id];

            return (
              <div key={q.id} className="space-y-3">
                <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  {qIdx + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isCorrect = q.correctIndex === optIdx;

                    let btnStyle = 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(q.id, optIdx)}
                        disabled={quizSubmitted}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                      >
                        <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <p className="text-xs text-slate-500 italic p-2 rounded bg-slate-50 dark:bg-slate-800">
                    Explanation: {q.explanation}
                  </p>
                )}
              </div>
            );
          })}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {!quizSubmitted ? (
              <button
                onClick={handleGradeQuiz}
                disabled={Object.keys(quizAnswers).length === 0}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs transition-colors shadow-sm disabled:opacity-40"
              >
                Submit Answers
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Score: {quizScore} / {lesson.quiz.length}
                </span>
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Retry Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 13. Independent Coding Challenge */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>13. Independent Coding Challenge</span>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {lesson.codingChallenge.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {lesson.codingChallenge.problem}
          </p>

          {/* Starter Code Editor */}
          <CodeRunner
            initialCode={lesson.codingChallenge.starterCode}
            expectedOutput="Run your test solution"
          />

          {/* Hints & Solution Toggle */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setHintIndex((p) => Math.min(p + 1, lesson.codingChallenge.hints.length - 1))}
              disabled={hintIndex >= lesson.codingChallenge.hints.length - 1}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40"
            >
              Show Hint ({hintIndex + 1}/{lesson.codingChallenge.hints.length})
            </button>
            <button
              onClick={() => setShowSolution((p) => !p)}
              className="px-3.5 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-300 font-semibold text-xs hover:bg-violet-100"
            >
              {showSolution ? 'Hide Solution' : 'View Reference Solution'}
            </button>
          </div>

          {hintIndex >= 0 && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-xs text-amber-800 dark:text-amber-300">
              Hint: {lesson.codingChallenge.hints[hintIndex]}
            </div>
          )}

          {showSolution && (
            <PseudocodePanel
              code={lesson.codingChallenge.solution}
              title="Verified Reference Solution"
              language="python"
            />
          )}
        </div>
      </section>

      {/* 14. Personal Notes */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Personal Study Notes
          </span>
          {noteSaved && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Note Saved!
            </span>
          )}
        </div>
        <div className="space-y-2">
          <textarea
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="Write personal takeaways, edge cases, or interview tricks for this algorithm..."
            rows={3}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={handleSaveNote}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Note</span>
          </button>
        </div>
      </section>

      {/* 15. Summary & Next Lesson */}
      <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
          Key Takeaways
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          {lesson.summary.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-1.5 shrink-0" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>

        {lesson.summary.nextLessonId && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <Link
              href={`/dsa/${lesson.summary.nextLessonModuleId || lesson.moduleId}/${lesson.summary.nextLessonId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <span>Next Lesson: {lesson.summary.nextLessonTitle || 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Floating Reusable AI Coding & Concept Tutor */}
      <AITutorPanel
        track="dsa"
        moduleId={lesson.moduleId}
        lessonId={lesson.id}
        lessonTitle={lesson.title}
        language="python"
        codeSnippet={lesson.pythonCode?.code}
      />
    </div>
  );
};
