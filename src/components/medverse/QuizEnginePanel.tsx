'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import { MBBSMCQ } from '@/types/medverse';
import { recordMedVerseAttempt } from '@/lib/medverse/progress';

interface QuizEnginePanelProps {
  questions: MBBSMCQ[];
  title?: string;
  onAttemptRecorded?: () => void;
}

export const QuizEnginePanel: React.FC<QuizEnginePanelProps> = ({
  questions,
  title = 'Practice MCQs & Structure Identification',
  onAttemptRecorded,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 text-center text-xs text-slate-500 dark:text-slate-400">
        No verified practice MCQs have been published for this filter yet.
      </div>
    );
  }

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.filter((q) => selectedAnswers[q.id] === q.correctIndex).length;

  const handleSelect = (q: MBBSMCQ, idx: number) => {
    if (selectedAnswers[q.id] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [q.id]: idx }));
    recordMedVerseAttempt({
      questionId: q.id,
      topicId: q.topicId,
      subjectId: q.subjectId,
      selectedIndex: idx,
      isCorrect: idx === q.correctIndex,
    });
    onAttemptRecorded?.();
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 p-4 sm:p-6 space-y-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>{title}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            MedVerse Synthetic Practice Questions · Answers are persisted to your study log.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
            Score: {correctCount}/{answeredCount} ({answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0}%)
          </span>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={() => setSelectedAnswers({})}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, qIdx) => {
          const picked = selectedAnswers[q.id];
          const isAnswered = picked !== undefined;
          const isCorrect = picked === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-2xl bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-slate-800 p-4 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-bold uppercase">
                  Q{qIdx + 1} · {q.questionType.replace('_', ' ')}
                </span>
                <span className="text-slate-500 font-mono">
                  {q.difficulty} · {q.sourceLabel}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                {q.stem}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  let btnStyle =
                    'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-teal-500/60';
                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200';
                    } else if (optIdx === picked) {
                      btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60 text-slate-400 dark:text-slate-500';
                    }
                  }
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelect(q, optIdx)}
                      className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-colors flex items-start gap-2 ${btnStyle}`}
                    >
                      <span className="font-mono font-bold text-slate-500 dark:text-slate-400">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div
                  className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-100'
                      : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-100'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block mb-0.5">
                      {isCorrect ? 'Correct' : `Incorrect — Correct Option: ${String.fromCharCode(65 + q.correctIndex)}`}
                    </strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
