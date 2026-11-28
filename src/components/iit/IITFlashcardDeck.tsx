'use client';

import React, { useState } from 'react';
import { RotateCw, CheckCircle2, Layers } from 'lucide-react';
import { IITFlashcard, IITFlashcardReview } from '@/types/iit';
import { IITMarkdownMath } from './IITMarkdownMath';
import { MathBlock } from '@/components/math/Math';
import { recordIITFlashcardReview } from '@/lib/iit/progress';

interface IITFlashcardDeckProps {
  cards: IITFlashcard[];
  reviews: Record<string, IITFlashcardReview>;
  title?: string;
}

const QUALITY_BUTTONS: { q: 0 | 2 | 3 | 4 | 5; label: string; cls: string }[] = [
  { q: 0, label: 'Forgot (1d)', cls: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
  { q: 2, label: 'Hard (1d)', cls: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
  { q: 3, label: 'Good', cls: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800' },
  { q: 5, label: 'Easy', cls: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
];

export const IITFlashcardDeck: React.FC<IITFlashcardDeckProps> = ({
  cards,
  reviews,
  title = 'SM-2 Spaced-Repetition Flashcards',
}) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-xs text-slate-500">
        No flashcards mapped for this chapter yet. Visit the Revision &amp; SM-2 Planner for the full PCM deck!
      </div>
    );
  }

  const card = cards[index % cards.length];
  const rev = reviews[card.id];

  const handleRate = (q: 0 | 2 | 3 | 4 | 5) => {
    recordIITFlashcardReview(card.id, q);
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Layers className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Card {(index % cards.length) + 1} / {cards.length}
          {rev ? ` · Next in ${rev.intervalDays}d` : ' · New'}
        </span>
      </div>

      <div
        onClick={() => setFlipped((f) => !f)}
        className="min-h-[200px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-400 transition-colors space-y-3"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
          {flipped ? 'Answer & Formula' : 'Recall Prompt (Click to Flip)'}
        </span>

        <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white max-w-xl">
          <IITMarkdownMath content={flipped ? card.back : card.front} />
        </div>

        {flipped && card.formulaLatex && (
          <div className="w-full max-w-lg">
            <MathBlock math={card.formulaLatex} />
          </div>
        )}

        {!flipped && card.hint && (
          <p className="text-xs text-slate-500">Hint: {card.hint}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{flipped ? 'Show Question' : 'Flip Card'}</span>
        </button>

        {flipped && (
          <div className="flex flex-wrap items-center gap-2">
            {QUALITY_BUTTONS.map((b) => (
              <button
                key={b.q}
                type="button"
                onClick={() => handleRate(b.q)}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl border text-xs font-bold transition-transform hover:scale-105 ${b.cls}`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>{b.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
