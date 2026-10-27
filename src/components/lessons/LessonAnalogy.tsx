'use client';

import React from 'react';
import { Lightbulb, ArrowRight, AlertCircle, Compass, Sparkles } from 'lucide-react';
import { LessonContent } from '@/lib/types';

interface LessonAnalogyProps {
  lesson: LessonContent;
}

export const LessonAnalogy: React.FC<LessonAnalogyProps> = ({ lesson }) => {
  const { analogy, title } = lesson;

  // Breakdown mapping of analogy to algorithm elements
  const analogyMappings = [
    {
      realWorld: 'Real-World Observation',
      description: 'Physical events, measurements, or human experiences observed in the real world.',
      mlEquivalent: 'Training Feature Vector X',
    },
    {
      realWorld: 'The Target Outcome',
      description: 'The final destination, actual value, or ground-truth answer.',
      mlEquivalent: 'Ground-Truth Label y',
    },
    {
      realWorld: 'The Balancing / Decision Rule',
      description: 'The physical mechanism or principle minimizing tension, error, or entropy.',
      mlEquivalent: 'Loss Minimization J(θ) & Weights W',
    },
  ];

  return (
    <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Lightbulb className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest block">
              Section B · Mental Model
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              The Real-World Intuitive Analogy
            </h2>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 font-semibold shadow-sm">
          Think Intuition First
        </span>
      </div>

      {/* Story Card */}
      <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/40 shadow-sm space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-amber-950 dark:text-amber-300">
          {analogy.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {analogy.text}
        </p>

        {/* Central Takeaway Badge */}
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200 flex items-start gap-2.5 mt-3">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Core Mental Model: </span>
            <span>{analogy.metaphor}</span>
          </div>
        </div>
      </div>

      {/* How the Analogy Maps to Machine Learning */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>How This Metaphor Directly Maps to {title.split(':')[0]}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analogyMappings.map((map, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2 shadow-sm"
            >
              <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                <span>{map.realWorld}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-tight">
                {map.description}
              </p>
              <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 font-mono font-bold text-indigo-600 dark:text-indigo-400 text-[11px]">
                = {map.mlEquivalent}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Limitation Callout: Where the Metaphor Breaks Down */}
      <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-2.5 text-slate-600 dark:text-slate-400">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Where the metaphor has limits: </span>
          Real-world physical systems have friction, gravity, and 3-dimensional boundaries, whereas Machine Learning models optimize in abstract $d$-dimensional vector spaces where high-dimensional geometry (the curse of dimensionality) introduces unique behaviors that human physical intuition cannot directly perceive.
        </div>
      </div>
    </div>
  );
};
