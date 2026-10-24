'use client';

import React from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  HelpCircle,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  Keyboard,
  Clock,
} from 'lucide-react';
import { formatLastReviewed } from '@/lib/revisionStorage';

interface RevisionControlsProps {
  isExamMode: boolean;
  onToggleExamMode: () => void;
  isQuickReview: boolean;
  onToggleQuickReview: () => void;
  onRandomTopic: () => void;
  onPreviousTopic: () => void;
  onNextTopic: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isRevised: boolean;
  onToggleRevised: () => void;
  lastReviewedIso?: string;
  onOpenShortcuts: () => void;
}

export const RevisionControls: React.FC<RevisionControlsProps> = ({
  isExamMode,
  onToggleExamMode,
  isQuickReview,
  onToggleQuickReview,
  onRandomTopic,
  onPreviousTopic,
  onNextTopic,
  hasPrevious,
  hasNext,
  isBookmarked,
  onToggleBookmark,
  isRevised,
  onToggleRevised,
  lastReviewedIso,
  onOpenShortcuts,
}) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366F1', '#10B981', '#F59E0B', '#EC4899', '#06B6D4'],
    });
  };

  const handleRevisedClick = () => {
    if (!isRevised) {
      triggerConfetti();
    }
    onToggleRevised();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
      {/* Left: Revision Toggles */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Quick Review Mode */}
        <button
          onClick={onToggleQuickReview}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isQuickReview
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
              : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
          }`}
          title="Toggle Quick Review Mode (Q)"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Quick Review</span>
        </button>

        {/* Exam Mode Toggle */}
        <button
          onClick={onToggleExamMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isExamMode
              ? 'bg-purple-600 border-purple-500 text-white shadow-sm'
              : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
          }`}
          title="Toggle Exam Active Recall Mode (E)"
        >
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span>Exam Mode</span>
        </button>

        {/* Random Revision */}
        <button
          onClick={onRandomTopic}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs transition-colors"
          title="Random Topic (R)"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Surprise Me</span>
        </button>
      </div>

      {/* Right: Actions, Pagination & Mark as Revised */}
      <div className="flex items-center gap-2 flex-wrap ml-auto">
        {/* Last Reviewed Timestamp indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 text-[11px] text-slate-400 font-mono">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>{formatLastReviewed(lastReviewedIso)}</span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={onToggleBookmark}
          className={`p-2 rounded-xl border transition-all ${
            isBookmarked
              ? 'bg-amber-950/60 border-amber-500/60 text-amber-400'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
          title={isBookmarked ? 'Bookmarked (B)' : 'Save Bookmark (B)'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Mark as Revised Checkbox Button */}
        <button
          onClick={handleRevisedClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
            isRevised
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300'
          }`}
          title="Mark as Revised (R)"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isRevised ? 'Revised ✓' : 'Mark Revised'}</span>
        </button>

        {/* Prev / Next Pagination */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={onPreviousTopic}
            disabled={!hasPrevious}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            title="Previous Note (J or [)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNextTopic}
            disabled={!hasNext}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            title="Next Note (K or ])"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hotkeys helper icon */}
        <button
          onClick={onOpenShortcuts}
          className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
          title="Keyboard Shortcuts (?)"
        >
          <Keyboard className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
