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
  Check,
  Terminal,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { JavaLessonContent } from '@/lib/types';
import { JavaVisualizerDispatcher } from './visualizers/JavaVisualizerDispatcher';
import { JavaCodeRunner } from './JavaCodeRunner';
import {
  getProgress,
  toggleLessonCompletion,
  toggleBookmark,
  saveNote,
  recordQuizScore,
} from '@/lib/storage';
import confetti from 'canvas-confetti';

interface JavaLessonViewProps {
  lesson: JavaLessonContent;
}

export const JavaLessonView: React.FC<JavaLessonViewProps> = ({ lesson }) => {
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

  return (
    <article className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        <Link href="/java" className="hover:text-amber-600 transition-colors">
          Java Mastery Lab
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          href={`/java/${lesson.moduleId}`}
          className="hover:text-amber-600 transition-colors uppercase font-mono"
        >
          {lesson.moduleId.replace('java-', '')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 dark:text-slate-200 truncate font-semibold">
          {lesson.title}
        </span>
      </nav>

      {/* 2. Lesson Header Banner */}
      <header className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60">
            Lesson {lesson.order}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {lesson.difficulty}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {lesson.readTimeMinutes} min read
          </span>
          {lesson.visualizerType !== 'none' && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/60 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Interactive Visualizer
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {lesson.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            {lesson.subtitle}
          </p>
        </div>

        {/* Action buttons: Mark Complete & Bookmark */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleComplete}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
            </button>

            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                isBookmarked
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Objectives & Prerequisites */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Learning Objectives</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            {lesson.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Prerequisites</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            {lesson.prerequisites.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Interactive Visualizer Component */}
      {lesson.visualizerType !== 'none' && (
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Mental Model Visualization</span>
          </div>
          <JavaVisualizerDispatcher type={lesson.visualizerType} />
        </section>
      )}

      {/* 5. Real-Life Analogy Section */}
      <section className="p-6 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/60 via-white to-amber-50/30 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>Real-World Analogy: {lesson.analogy.title}</span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {lesson.analogy.text}
        </p>
        <div className="pt-2 border-t border-amber-100 dark:border-amber-900/40 text-xs font-mono text-amber-900 dark:text-amber-300">
          <strong>Mental Metaphor:</strong> {lesson.analogy.metaphor}
        </div>
      </section>

      {/* 6. Why This Matters & Intuition */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          The Problem This Solves & Why It Matters
        </h2>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            {lesson.problemSolved.title}
          </h3>
          {lesson.problemSolved.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {lesson.problemSolved.description}
            </p>
          )}
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
            {lesson.problemSolved.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step-by-Step Intuition */}
        <div className="space-y-3 pt-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Architectural Intuition
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {lesson.intuition.overview}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {lesson.intuition.steps.map((st) => (
              <div
                key={st.step}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                    {st.step}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {st.title}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Executable Java Code Studio */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Hands-on Executable Java Studio
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {lesson.codeExample.explanation}
          </p>
        </div>

        <JavaCodeRunner
          initialCode={lesson.runnableCode.code}
          expectedOutput={lesson.runnableCode.expectedOutput}
          title={lesson.codeExample.title}
        />
      </section>

      {/* 8. Line-by-Line Code Breakdown */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Line-by-Line Code Explanation
        </h2>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {lesson.lineByLineExplanation.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white dark:bg-slate-900 flex flex-col sm:flex-row gap-3 items-start"
            >
              <div className="sm:w-1/3 shrink-0">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold mb-1">
                  Line {item.lines || item.line || idx + 1}:
                </span>
                <code className="text-amber-600 dark:text-amber-400 font-mono font-bold block bg-slate-50 dark:bg-slate-800 p-1.5 rounded">
                  {item.codeSnippet || item.code}
                </code>
              </div>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed sm:pt-4">
                {item.explanation}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Common Mistakes and How to Fix Them */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Common Beginner Mistakes & Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/30 dark:bg-rose-950/20 space-y-2.5"
              >
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>The Pitfall:</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {mistake.mistake}
                </p>

                {mistake.whyWrong && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 italic">
                    Why it fails: {mistake.whyWrong}
                  </p>
                )}

                <div className="pt-2 border-t border-rose-100 dark:border-rose-900/40 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                    How to fix it:
                  </span>
                  {mistake.solution || mistake.howToFix}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Best Practices & Real World Applications */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lesson.bestPractices && lesson.bestPractices.length > 0 && (
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Award className="w-4 h-4 text-indigo-500" />
              <span>Production Best Practices</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {lesson.bestPractices.map((bp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {lesson.applications && lesson.applications.length > 0 && (
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span>Real-World Systems</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {lesson.applications.map((app, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>
                    <strong>{app.industry}:</strong> {app.useCase}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 11. Practice Checkpoints (Revealable Answers) */}
      {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Conceptual Practice Checkpoints
            </h2>
          </div>

          <div className="space-y-3">
            {lesson.practiceQuestions.map((q) => {
              const isRevealed = !!revealedAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {q.question}
                    </h3>
                    <button
                      onClick={() => toggleRevealAnswer(q.id)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 flex items-center gap-1.5"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'Hide' : 'Reveal Answer'}</span>
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-1.5 bg-slate-50 dark:bg-slate-850 p-3 rounded-lg">
                      <div className="font-bold text-indigo-600 dark:text-indigo-400">
                        {q.answer}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 12. Interactive Quiz Section */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Lesson Quiz
            </h2>
            {quizSubmitted && (
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                Score: {quizScore} / {lesson.quiz.length}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {lesson.quiz.map((q, qIdx) => (
              <div
                key={q.id}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
              >
                <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {qIdx + 1}. {q.question}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = quizAnswers[q.id] === oIdx;
                    const isCorrect = q.correctIndex === oIdx;

                    let btnStyle =
                      'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle =
                          'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle =
                          'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle =
                        'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 font-bold';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuizOption(q.id, oIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {!quizSubmitted ? (
              <button
                onClick={handleGradeQuiz}
                disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-colors disabled:opacity-40"
              >
                Submit Answers for Grading
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Retake Quiz
              </button>
            )}
          </div>
        </section>
      )}

      {/* 13. Hands-On Coding Practice Challenge */}
      {lesson.codingChallenge && (
        <section className="space-y-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                End-of-Lesson Coding Challenge
              </h2>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-300 font-semibold">
              {lesson.codingChallenge.difficulty}
            </span>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300">
            {lesson.codingChallenge.description}
          </p>

          {(() => {
            const challengeSolution = lesson.codingChallenge.solutionCode || lesson.codingChallenge.solution;
            return (
              <>
                <JavaCodeRunner
                  initialCode={lesson.codingChallenge.starterCode}
                  expectedOutput={challengeSolution ? 'See Solution' : undefined}
                  title={`Challenge: ${lesson.title}`}
                />

                {/* Hints & Solution Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    {lesson.codingChallenge.hints && lesson.codingChallenge.hints.length > 0 && (
                      <button
                        onClick={() =>
                          setHintIndex((prev) =>
                            prev < lesson.codingChallenge.hints!.length - 1 ? prev + 1 : -1
                          )
                        }
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750"
                      >
                        {hintIndex >= 0
                          ? `Hint ${hintIndex + 1} of ${lesson.codingChallenge.hints.length}`
                          : 'Need a Hint?'}
                      </button>
                    )}

                    {challengeSolution && (
                      <button
                        onClick={() => setShowSolution(!showSolution)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition-colors"
                      >
                        {showSolution ? 'Hide Solution' : 'View Complete Solution'}
                      </button>
                    )}
                  </div>

                  {hintIndex >= 0 && lesson.codingChallenge.hints && (
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 font-mono">
                      💡 Hint: {lesson.codingChallenge.hints[hintIndex]}
                    </div>
                  )}

                  {showSolution && challengeSolution && (
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono overflow-x-auto text-emerald-400">
                      <div className="text-slate-400 mb-2 font-bold uppercase tracking-wider text-[10px]">
                        Reference Implementation Solution:
                      </div>
                      <pre>{challengeSolution}</pre>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </section>
      )}

      {/* 14. Personal Notes Drawer */}
      <section className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <FileText className="w-4 h-4 text-amber-500" />
            <span>My Personal Lesson Notes</span>
          </div>
          {noteSaved && (
            <span className="text-xs font-mono text-emerald-500 flex items-center gap-1 font-semibold">
              <Check className="w-3.5 h-3.5" />
              Saved to LocalStorage!
            </span>
          )}
        </div>
        <textarea
          value={userNote}
          onChange={(e) => setUserNote(e.target.value)}
          placeholder="Record key takeaways, syntax reminders, or personal observations about this Java concept..."
          rows={3}
          className="w-full text-xs font-mono p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <button
          onClick={handleSaveNote}
          className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Note</span>
        </button>
      </section>

      {/* 15. Key Takeaways Summary & Next Lesson Navigation */}
      <footer className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Core Lesson Takeaways:
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            {lesson.summary.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Previous and Next Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {lesson.previousLesson ? (
            <Link
              href={`/java/${lesson.previousLesson.moduleId}/${lesson.previousLesson.id}`}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: {lesson.previousLesson.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {lesson.summary.nextLessonId ? (
            <Link
              href={`/java/${lesson.summary.nextLessonModuleId || lesson.moduleId}/${lesson.summary.nextLessonId}`}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
            >
              <span>Next Lesson: {lesson.summary.nextLessonTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/java"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
            >
              <span>Back to Java Mastery Lab</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
};
