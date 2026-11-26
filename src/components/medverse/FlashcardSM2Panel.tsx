'use client';

import React, { useEffect, useState } from 'react';
import { Layers, RotateCw, CheckCircle2 } from 'lucide-react';
import { MBBSFlashcard, MedVerseFlashcardReview } from '@/types/medverse';
import {
  getMedVerseProgress,
  recordMedVerseFlashcardReview,
} from '@/lib/medverse/progress';

interface FlashcardSM2PanelProps {
  cards: MBBSFlashcard[];
}

export const FlashcardSM2Panel: React.FC<FlashcardSM2PanelProps> = ({ cards }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviews, setReviews] = useState<Record<string, MedVerseFlashcardReview>>({});

  useEffect(() => {
    setReviews(getMedVerseProgress().flashcardReviews);
  }, []);

  if (cards.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center text-xs text-slate-400">
        No flashcards published for this selection yet.
      </div>
    );
  }

  const card = cards[index % cards.length];
  const cardReview = reviews[card.id];

  const handleRate = (quality: 1 | 2 | 4 | 5) => {
    const updated = recordMedVerseFlashcardReview(card.id, quality);
    setReviews(updated.flashcardReviews);
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 text-slate-100 p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>SM-2 Spaced Repetition Flashcards</span>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Card {(index % cards.length) + 1} of {cards.length}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[180px] rounded-2xl bg-slate-950 border border-slate-800 hover:border-teal-500/60 p-6 flex flex-col items-center justify-center text-center space-y-3 transition-colors"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
          {flipped ? 'High-Yield Answer' : 'Prompt — Click to Reveal Answer'}
        </span>
        <p className="text-sm sm:text-base font-bold text-white max-w-xl leading-relaxed">
          {flipped ? card.back : card.front}
        </p>
        {flipped && card.clinicalHint && (
          <p className="text-xs text-cyan-300 max-w-lg">{card.clinicalHint}</p>
        )}
        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 pt-2">
          <RotateCw className="w-3 h-3" /> Click card to flip
        </span>
      </button>

      {cardReview && (
        <div className="text-[11px] text-slate-400 flex items-center justify-between px-1">
          <span className="inline-flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Scheduled interval: {cardReview.intervalDays}d (Ease {cardReview.easeFactor})
          </span>
          <span className="font-mono">
            Next due: {new Date(cardReview.nextReviewAt).toLocaleDateString()}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: 'Again (1d)', q: 1 as const, style: 'bg-rose-950/50 border-rose-800 text-rose-200 hover:bg-rose-900/60' },
          { label: 'Hard', q: 2 as const, style: 'bg-amber-950/50 border-amber-800 text-amber-200 hover:bg-amber-900/60' },
          { label: 'Good', q: 4 as const, style: 'bg-teal-950/50 border-teal-800 text-teal-200 hover:bg-teal-900/60' },
          { label: 'Easy', q: 5 as const, style: 'bg-emerald-950/50 border-emerald-800 text-emerald-200 hover:bg-emerald-900/60' },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={() => handleRate(btn.q)}
            className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors ${btn.style}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
