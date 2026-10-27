'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Code2,
  Sparkles,
  Award,
  RotateCcw,
  Lightbulb,
  Briefcase,
  Layers,
} from 'lucide-react';
import { LessonContent, QuizQuestion, PracticeQuestion } from '@/lib/types';
import { CodeRunner } from '../code/CodeRunner';
import { recordQuizScore } from '@/lib/storage';
import confetti from 'canvas-confetti';

interface LessonPracticeProps {
  lesson: LessonContent;
}

export const LessonPractice: React.FC<LessonPracticeProps> = ({ lesson }) => {
  const { quiz, practiceQuestions, independentExercise, realWorldUseCases } = lesson;

  // Combine and ensure at least 3 conceptual MCQs
  const conceptualMCQs: QuizQuestion[] = [...quiz];
  if (conceptualMCQs.length < 3 && practiceQuestions.length > 0) {
    // Transform extra practice questions into structured MCQs if needed
    practiceQuestions.slice(0, 3 - conceptualMCQs.length).forEach((pq, i) => {
      conceptualMCQs.push({
        id: `synth-mcq-${i}`,
        question: pq.question,
        options: [
          pq.answer.slice(0, 70),
          'It is only applicable when the data distribution is strictly Gaussian without noise.',
          'It guarantees zero training error regardless of feature scale or outliers.',
          'It replaces the need for cross-validation and hyperparameter tuning.',
        ],
        correctIndex: 0,
        explanation: pq.answer,
      });
    });
  }

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Numerical question reveal
  const [revealedPractice, setRevealedPractice] = useState<Record<string, boolean>>({});

  // Independent exercise state
  const [hintIndex, setHintIndex] = useState<number>(-1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Real world application reveal
  const [showCaseStudy, setShowCaseStudy] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleGradeQuiz = () => {
    let score = 0;
    conceptualMCQs.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    recordQuizScore(lesson.id, score, conceptualMCQs.length);

    if (score === conceptualMCQs.length) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRetryQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Section L · Active Recall
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Practice & Concept Mastery
            </h2>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
          4-Tier Practice Suite
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 1. CONCEPTUAL MULTIPLE CHOICE QUESTIONS */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider block">
              Part 1 of 4 · Conceptual Recall
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Diagnostic Multiple-Choice Questions ({conceptualMCQs.length} Questions)
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Select an answer for each question
          </span>
        </div>

        <div className="space-y-6">
          {conceptualMCQs.map((q, idx) => {
            const selected = selectedAnswers[q.id];
            const isAnswered = selected !== undefined;
            const isCorrect = selected === q.correctIndex;

            return (
              <div
                key={q.id}
                className="space-y-3 pb-5 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-xs flex items-center justify-center font-bold border border-indigo-200 dark:border-indigo-800">
                    {idx + 1}
                  </span>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    {q.question}
                  </h4>
                </div>

                {/* Option Buttons */}
                <div className="space-y-2 pl-7">
                  {q.options.map((opt, oIdx) => {
                    let btnStyle =
                      'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50';

                    if (selected === oIdx) {
                      btnStyle =
                        'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold';
                    }

                    if (quizSubmitted) {
                      if (oIdx === q.correctIndex) {
                        btnStyle =
                          'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold';
                      } else if (selected === oIdx) {
                        btnStyle =
                          'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${btnStyle}`}
                      >
                        <span className="leading-relaxed">{opt}</span>
                        {quizSubmitted && oIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                        )}
                        {quizSubmitted && selected === oIdx && oIdx !== q.correctIndex && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback with explanation of why correct and why wrong options fail */}
                {quizSubmitted && (
                  <div className="ml-7 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 space-y-1.5 leading-relaxed">
                    <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Conceptual Explanation:</span>
                    </div>
                    <p>{q.explanation}</p>
                    {selected !== q.correctIndex && (
                      <p className="text-rose-600 dark:text-rose-400 font-medium pt-1">
                        Misconception alert: The selected answer overlooks that the algorithm relies on specific objective functions and assumptions.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit & Score Control */}
        <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
          {!quizSubmitted ? (
            <button
              onClick={handleGradeQuiz}
              disabled={Object.keys(selectedAnswers).length < conceptualMCQs.length}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Grade Answers & Reveal Explanations
            </button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Quiz Score:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 text-base">
                  {quizScore} / {conceptualMCQs.length}
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  ({Math.round((quizScore / conceptualMCQs.length) * 100)}%)
                </span>
              </span>
              <button
                onClick={handleRetryQuiz}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. NUMERICAL & CODE-OUTPUT QUESTION */}
      {/* ========================================================================= */}
      {practiceQuestions.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider block">
                Part 2 of 4 · Numerical & Code Output
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Analytical Calculation Question
              </h3>
            </div>
          </div>

          {practiceQuestions.slice(0, 2).map((pq, idx) => {
            const isRevealed = !!revealedPractice[pq.id];
            return (
              <div
                key={pq.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs space-y-3"
              >
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  Problem {idx + 1}: {pq.question}
                </div>

                {pq.hint && (
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
                    <span className="font-bold flex items-center gap-1.5 mb-0.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      Guided Hint:
                    </span>
                    {pq.hint}
                  </div>
                )}

                <button
                  onClick={() =>
                    setRevealedPractice((prev) => ({ ...prev, [pq.id]: !prev[pq.id] }))
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isRevealed ? 'Hide Solution Walkthrough' : 'Show Verified Solution Walkthrough'}</span>
                </button>

                {isRevealed && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 leading-relaxed space-y-1">
                    <span className="font-bold block">Worked Solution & Interpretation:</span>
                    <p>{pq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. REAL-WORLD APPLICATION SCENARIO */}
      {/* ========================================================================= */}
      {realWorldUseCases && realWorldUseCases.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
              Part 3 of 4 · Industry Scenario
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Real-World System Application Challenge
            </h3>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Briefcase className="w-4 h-4" />
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Case Scenario: {realWorldUseCases[0].industry} — {realWorldUseCases[0].application}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Suppose you are deployed as the lead ML engineer to build this system. How would you choose between this model and a heavier deep neural network given latency, training budget, and explainability constraints?
            </p>

            <button
              onClick={() => setShowCaseStudy(!showCaseStudy)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {showCaseStudy ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showCaseStudy ? 'Hide Engineering Analysis' : 'Reveal Engineering Solution'}</span>
            </button>

            {showCaseStudy && (
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">
                  Authoritative Production Recommendation:
                </span>
                <p>
                  Deploy this model as the primary production baseline. It delivers {(realWorldUseCases[0]?.benefit || realWorldUseCases[0]?.description || 'measurable predictive performance').toLowerCase()} with millisecond latency and clear parameter interpretability. Only transition to more complex ensembles if validation metrics prove a statistically significant uplift on real traffic.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. INDEPENDENT CODING CHALLENGE */}
      {/* ========================================================================= */}
      {independentExercise && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider block">
              Part 4 of 4 · Hands-On Code
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {independentExercise.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Solve this problem independently in the Python sandbox below:
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            {independentExercise.problem}
          </p>

          {/* Progressive Hints */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Progressive Hints:
              </span>
              <button
                onClick={() =>
                  setHintIndex((i) =>
                    Math.min(independentExercise.hints.length - 1, i + 1)
                  )
                }
                disabled={hintIndex >= independentExercise.hints.length - 1}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-40"
              >
                + Reveal Next Hint ({hintIndex + 1}/{independentExercise.hints.length})
              </button>
            </div>

            {hintIndex >= 0 && (
              <div className="space-y-2">
                {independentExercise.hints.slice(0, hintIndex + 1).map((h, i) => (
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

          {/* Interactive Sandbox */}
          <div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Solve Directly in this Interactive Sandbox:
            </span>
            <CodeRunner
              initialCode={independentExercise.starterCode}
              title="Challenge Workspace"
            />
          </div>

          {/* Reference Solution Toggle */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            >
              {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showSolution ? 'Hide Author Reference Solution' : 'Reveal Complete Verified Reference Solution'}</span>
            </button>

            {showSolution && (
              <div className="mt-3">
                <CodeRunner
                  initialCode={independentExercise.solution}
                  title="Authoritative Reference Solution"
                  readOnly={false}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
