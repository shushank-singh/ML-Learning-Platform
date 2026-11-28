'use client';

import React, { useState } from 'react';
import { Bookmark, CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';
import { IITQuestion } from '@/types/iit';
import { IITMarkdownMath } from './IITMarkdownMath';
import {
  recordIITQuestionAttempt,
  toggleIITQuestionBookmark,
} from '@/lib/iit/progress';

interface IITQuestionCardProps {
  question: IITQuestion;
  index: number;
  isBookmarked?: boolean;
}

export const IITQuestionCard: React.FC<IITQuestionCardProps> = ({
  question,
  index,
  isBookmarked = false,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [numericalInput, setNumericalInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleToggleOption = (optIdx: number) => {
    if (submitted) return;
    if (question.type === 'scq') {
      const correct = question.correctIndices?.includes(optIdx) || false;
      setSelectedIndices([optIdx]);
      setIsCorrect(correct);
      setSubmitted(true);
      recordIITQuestionAttempt({
        questionId: question.id,
        chapterId: question.chapterId,
        subject: question.subject,
        isCorrect: correct,
        marksObtained: correct ? 4 : -1,
        selectedIndices: [optIdx],
      });
    } else if (question.type === 'mcq_multi') {
      setSelectedIndices((prev) =>
        prev.includes(optIdx) ? prev.filter((i) => i !== optIdx) : [...prev, optIdx]
      );
    }
  };

  const handleSubmitMultiOrNumerical = () => {
    if (submitted) return;

    if (question.type === 'mcq_multi') {
      const expected = [...(question.correctIndices || [])].sort().join(',');
      const actual = [...selectedIndices].sort().join(',');
      const correct = expected === actual && selectedIndices.length > 0;
      setIsCorrect(correct);
      setSubmitted(true);
      recordIITQuestionAttempt({
        questionId: question.id,
        chapterId: question.chapterId,
        subject: question.subject,
        isCorrect: correct,
        marksObtained: correct ? 4 : -2,
        selectedIndices,
      });
    } else if (question.type === 'numerical') {
      const val = Number(numericalInput.trim());
      if (Number.isNaN(val)) return;
      const target = question.numericalAnswer ?? 0;
      const tol = question.numericalTolerance ?? 0.05;
      const correct = Math.abs(val - target) <= tol;
      setIsCorrect(correct);
      setSubmitted(true);
      recordIITQuestionAttempt({
        questionId: question.id,
        chapterId: question.chapterId,
        subject: question.subject,
        isCorrect: correct,
        marksObtained: correct ? 4 : 0,
        numericalValue: val,
      });
    }
  };

  const handleReset = () => {
    setSelectedIndices([]);
    setNumericalInput('');
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3.5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-bold">
            Q{index + 1} · {question.type === 'scq' ? 'Single Choice' : question.type === 'mcq_multi' ? 'Multi-Correct (Adv)' : 'Numerical'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
            {question.exam} · {question.difficulty}
          </span>
          {question.isPyq && (
            <span className="px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-bold">
              PYQ {question.pyqYear || ''}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {submitted && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            >
              <RotateCcw className="w-3 h-3" /> Retry
            </button>
          )}
          <button
            type="button"
            onClick={() => toggleIITQuestionBookmark(question.id)}
            aria-label="Bookmark question"
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950 border-amber-400 text-amber-600'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-amber-500'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
        <IITMarkdownMath content={question.stem} />
      </div>

      {question.type !== 'numerical' && question.options && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {question.options.map((opt, optIdx) => {
              const isPicked = selectedIndices.includes(optIdx);
              const isTrueOption = question.correctIndices?.includes(optIdx);

              let cls =
                'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-500';
              if (submitted) {
                if (isTrueOption) {
                  cls =
                    'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200';
                } else if (isPicked && !isTrueOption) {
                  cls =
                    'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200';
                } else {
                  cls =
                    'bg-slate-100/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/50 text-slate-400';
                }
              } else if (isPicked) {
                cls =
                  'bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-900 dark:text-amber-200';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={submitted}
                  onClick={() => handleToggleOption(optIdx)}
                  className={`text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors flex items-start gap-2 ${cls}`}
                >
                  <span className="font-mono font-bold text-slate-500 shrink-0">
                    {String.fromCharCode(65 + optIdx)}.
                  </span>
                  <span className="flex-1">
                    <IITMarkdownMath content={opt} />
                  </span>
                </button>
              );
            })}
          </div>

          {question.type === 'mcq_multi' && !submitted && (
            <button
              type="button"
              disabled={selectedIndices.length === 0}
              onClick={handleSubmitMultiOrNumerical}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white text-xs font-bold"
            >
              Check Multi-Correct Answer
            </button>
          )}
        </div>
      )}

      {question.type === 'numerical' && (
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="number"
            step="any"
            disabled={submitted}
            value={numericalInput}
            onChange={(e) => setNumericalInput(e.target.value)}
            placeholder="Enter numerical answer..."
            className="w-52 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono focus:outline-none focus:border-amber-500"
          />
          {!submitted && (
            <button
              type="button"
              disabled={numericalInput.trim() === ''}
              onClick={handleSubmitMultiOrNumerical}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white text-xs font-bold"
            >
              Verify Answer
            </button>
          )}
        </div>
      )}

      {submitted && (
        <div
          className={`p-4 rounded-xl border text-xs space-y-2 ${
            isCorrect
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
          }`}
        >
          <div className="flex items-center justify-between font-bold">
            <span className="inline-flex items-center gap-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-300">Correct! (+4 marks)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span className="text-rose-700 dark:text-rose-300">
                    Incorrect · Correct Answer: <IITMarkdownMath content={question.finalAnswerLabel} />
                  </span>
                </>
              )}
            </span>
          </div>

          <div className="space-y-1 text-slate-700 dark:text-slate-300">
            <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-500">
              <HelpCircle className="w-3 h-3" /> Step-by-Step Solution
            </span>
            <ol className="list-decimal list-inside space-y-1">
              {question.solutionSteps.map((step, sIdx) => (
                <li key={sIdx}>
                  <IITMarkdownMath content={step} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
