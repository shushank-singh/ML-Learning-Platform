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
  Compass,
  Check,
  Terminal,
  ShieldAlert,
} from 'lucide-react';
import { PythonLessonContent } from '@/lib/types';
import { PythonVisualizerDispatcher } from './visualizers/PythonVisualizerDispatcher';
import { CodeRunner } from '../code/CodeRunner';
import {
  getProgress,
  toggleLessonCompletion,
  toggleBookmark,
  saveNote,
  recordQuizScore,
} from '@/lib/storage';
import confetti from 'canvas-confetti';

interface PythonLessonViewProps {
  lesson: PythonLessonContent;
}

export const PythonLessonView: React.FC<PythonLessonViewProps> = ({ lesson }) => {
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
  };

  const diffColor =
    lesson.difficulty === 'Beginner'
      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
      : lesson.difficulty === 'Intermediate'
      ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400'
      : 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400';

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
      {/* 1. Header & Quick Actions */}
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
          <Link href="/python" className="hover:text-emerald-600 transition-colors">
            Python Mastery Lab
          </Link>
          <span>/</span>
          <Link href={`/python/${lesson.moduleId}`} className="hover:text-emerald-600 transition-colors">
            Module {lesson.moduleId.replace('python-module-', '')}
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate">
            {lesson.title}
          </span>
        </div>

        {/* Title Card */}
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${diffColor}`}>
                {lesson.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {lesson.readTimeMinutes} min read
              </span>
              <span className="text-xs text-slate-400">Lesson {lesson.order}</span>
            </div>

            {/* Complete & Bookmark buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleBookmark}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isBookmarked
                    ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                }`}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark lesson'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleToggleComplete}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'fill-current' : ''}`} />
                <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 font-medium">
              {lesson.subtitle}
            </p>
          </div>

          {/* Objectives */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Learning Objectives
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Real-World Metaphor / Analogy */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {lesson.analogy.title}
          </h2>
        </div>
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/10 p-5 space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>{lesson.analogy.text}</p>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/60 text-xs font-mono text-emerald-700 dark:text-emerald-300">
            <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 block mb-0.5">
              Core Metaphor
            </span>
            {lesson.analogy.metaphor}
          </div>
        </div>
      </section>

      {/* 3. The Problem Solved */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {lesson.problemSolved.title}
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>{lesson.problemSolved.description}</p>
          <div className="space-y-1.5 pt-2">
            {lesson.problemSolved.keyPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Deep Intuition & Mental Model */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Deep Intuition &amp; Mental Model
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {lesson.intuition.overview}
          </p>
          <div className="space-y-3">
            {lesson.intuition.steps.map((st) => (
              <div
                key={st.step}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {st.step}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
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

      {/* 5. Interactive Python Visualizer */}
      {lesson.visualizerType !== 'none' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Interactive Visualizer
              </h2>
            </div>
            <span className="text-xs text-slate-400">Deterministic runtime engine</span>
          </div>

          <PythonVisualizerDispatcher type={lesson.visualizerType} />
        </section>
      )}

      {/* 6. Annotated Python Code Example */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <Code2 className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {lesson.codeExample.title}
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-5 space-y-3 font-mono text-xs overflow-x-auto shadow-sm">
          <pre className="text-emerald-300 whitespace-pre">{lesson.codeExample.code}</pre>
          <div className="pt-3 border-t border-slate-800 font-sans text-xs text-slate-400">
            {lesson.codeExample.explanation}
          </div>
        </div>
      </section>

      {/* 7. Runnable Code Environment */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Terminal className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Runnable Python Sandbox
            </h2>
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
            Client-side Pyodide Runtime
          </span>
        </div>

        <CodeRunner
          initialCode={lesson.runnableCode.code}
          expectedOutput={lesson.runnableCode.expectedOutput}
        />
      </section>

      {/* 8. Line-by-Line Breakdown */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Line-by-Line Code Breakdown
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
          {lesson.lineByLineExplanation.map((item, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs">
              <div className="sm:w-1/3 shrink-0 font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg break-all">
                <span className="text-[10px] text-slate-400 font-sans block mb-0.5">Lines: {item.lines}</span>
                {item.codeSnippet || item.lines}
              </div>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed sm:pt-2">
                {item.explanation}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Common Mistakes */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Common Mistakes &amp; Gotchas
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.commonMistakes.map((m, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/30 dark:bg-red-950/10 space-y-2 text-xs"
            >
              <h4 className="font-bold text-red-700 dark:text-red-400">{m.mistake}</h4>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-mono text-[11px]">
                <span className="font-bold text-slate-400 block text-[10px]">Solution:</span>
                {m.solution}
              </div>
              {m.codeExample && (
                <div className="p-2 rounded bg-slate-900 text-slate-200 font-mono text-[10px] overflow-x-auto">
                  <pre>{m.codeExample}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Best Practices */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Pythonic Best Practices
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
          {lesson.bestPractices.map((bp, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                {i + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{bp}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Practical Applications */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lesson.applications.map((app, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {app.industry}
                </h4>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                  {app.application}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {app.benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Practice Questions */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Practice Questions
          </h2>
        </div>
        <div className="space-y-3">
          {lesson.practiceQuestions.map((q) => {
            const isRevealed = !!revealedAnswers[q.id];
            return (
              <div
                key={q.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-semibold text-amber-600 dark:text-amber-400 text-[11px]">
                      Question
                    </span>
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      {q.question}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleRevealAnswer(q.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold shrink-0 transition-colors"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Hide Answer
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Reveal Answer
                      </>
                    )}
                  </button>
                </div>

                {isRevealed && (
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                      Solution:
                    </span>
                    {q.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. Interactive Quiz */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Interactive Concept Quiz
            </h2>
          </div>
          {quizSubmitted && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              Score: {quizScore} / {lesson.quiz.length}
            </span>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
          {lesson.quiz.map((q, qIdx) => {
            const selectedOpt = quizAnswers[q.id];
            return (
              <div key={q.id} className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  {qIdx + 1}. {q.question}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isChosen = selectedOpt === optIdx;
                    let style =
                      'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300';
                    if (isChosen) {
                      style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-medium';
                    }
                    if (quizSubmitted) {
                      if (optIdx === q.correctIndex) {
                        style = 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isChosen && optIdx !== q.correctIndex) {
                        style = 'border-red-400 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300';
                      }
                    }
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(q.id, optIdx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && optIdx === q.correctIndex && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-800 dark:text-slate-200 mr-1">
                      Explanation:
                    </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center justify-end gap-3 pt-2">
            {quizSubmitted ? (
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                Retake Quiz
              </button>
            ) : (
              <button
                onClick={handleGradeQuiz}
                disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 14. Coding Challenge */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Code2 className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Hands-on Coding Challenge
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm text-xs">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {lesson.codingChallenge.title}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {lesson.codingChallenge.problem}
            </p>
          </div>

          {/* Starter code */}
          <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
            <pre className="text-emerald-300">{lesson.codingChallenge.starterCode}</pre>
          </div>

          {/* Progressive Hints */}
          {lesson.codingChallenge.hints.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setHintIndex((prev) =>
                      Math.min(lesson.codingChallenge.hints.length - 1, prev + 1)
                    )
                  }
                  disabled={hintIndex >= lesson.codingChallenge.hints.length - 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
                >
                  Need a hint? ({hintIndex + 1}/{lesson.codingChallenge.hints.length})
                </button>
              </div>

              {hintIndex >= 0 && (
                <div className="space-y-1.5 pt-1">
                  {lesson.codingChallenge.hints.slice(0, hintIndex + 1).map((h, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"
                    >
                      <span className="font-bold mr-1.5">Hint {i + 1}:</span>
                      {h}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Solution reveal */}
          <div className="pt-2">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
            >
              {showSolution ? 'Hide Solution' : 'Reveal Reference Solution'}
            </button>
            {showSolution && (
              <div className="mt-2 p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto">
                <pre>{lesson.codingChallenge.solution}</pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 15. Personal Study Notes */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Personal Study Notes
            </h2>
          </div>
          {noteSaved && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Notes saved!
            </span>
          )}
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-sm">
          <textarea
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="Jot down personal insights, key Python rules, or questions to revisit..."
            rows={4}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono resize-y"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSaveNote}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" /> Save Note
            </button>
          </div>
        </div>
      </section>

      {/* 16. Summary & Next Lesson Bridge */}
      <section className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/40 to-white dark:from-emerald-950/20 dark:to-slate-900 p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Key Takeaways
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {lesson.summary.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>

        {lesson.summary.nextLessonId && (
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Up Next:
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                {lesson.summary.nextLessonTitle}
              </span>
            </div>
            <Link
              href={`/python/${lesson.summary.nextLessonModuleId || lesson.moduleId}/${lesson.summary.nextLessonId}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};
