'use client';

import React, { useState } from 'react';
import { QuickRecallQuestion } from '@/data/revision/types';
import { saveQuizScore } from '@/lib/revisionStorage';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

interface LightweightQuizProps {
  topicId: string;
  questions: QuickRecallQuestion[];
}

export const LightweightQuiz: React.FC<LightweightQuizProps> = ({ topicId, questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!questions || questions.length === 0) return null;

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (selectedAnswers[qIdx] !== undefined) return; // Locked once chosen

    const next = { ...selectedAnswers, [qIdx]: optionIdx };
    setSelectedAnswers(next);

    // If all questions answered, save score
    if (Object.keys(next).length === questions.length) {
      setIsCompleted(true);
      const correctCount = questions.reduce((acc, q, i) => {
        return acc + (next[i] === q.correctIndex ? 1 : 0);
      }, 0);
      saveQuizScore(topicId, correctCount, questions.length);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.reduce((acc, q, i) => {
    return acc + (selectedAnswers[i] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
              Quick Recall Check • 3 Questions
            </span>
            <h4 className="text-sm font-bold text-slate-100">Test Your Immediate Retention</h4>
          </div>
        </div>

        {answeredCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-300">
              Score: {correctCount}/{questions.length}
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Reset Quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const hasAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id || qIdx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <p className="text-xs font-semibold text-slate-200 leading-snug">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  let optStyle = 'border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300';

                  if (hasAnswered) {
                    if (optIdx === q.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-medium';
                    } else if (userChoice === optIdx) {
                      optStyle = 'border-rose-500 bg-rose-950/40 text-rose-200 line-through';
                    } else {
                      optStyle = 'border-slate-800/50 bg-slate-950/30 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && optIdx === q.correctIndex && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {hasAnswered && userChoice === optIdx && optIdx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown after answering) */}
              {hasAnswered && (
                <div
                  className={`p-2.5 rounded-lg text-[11px] leading-relaxed border ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <span className="font-bold">{isCorrect ? 'Correct! ' : 'Incorrect. '}</span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-indigo-950/40 border border-amber-500/30">
          <Award className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-amber-300">
              Quiz Completed! You scored {correctCount} / {questions.length}.
            </span>
            <p className="text-slate-400 mt-0.5">
              {correctCount === questions.length
                ? 'Mastery achieved! You can mark this topic as revised.'
                : 'Review the quick recall notes above to reinforce weak spots.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
