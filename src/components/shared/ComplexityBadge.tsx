'use client';

import React from 'react';
import { DSAComplexityItem } from '@/lib/types';

export interface ComplexityBadgeProps {
  cases: DSAComplexityItem[];
  spaceComplexity?: string;
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({
  cases,
  spaceComplexity,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cases.map((c) => {
        const tagColor =
          c.case === 'Best'
            ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300'
            : c.case === 'Average'
            ? 'border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20 text-violet-700 dark:text-violet-300'
            : 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300';

        return (
          <div
            key={c.case}
            className={`p-3 rounded-xl border ${tagColor} transition-all space-y-1`}
          >
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
              <span>{c.case} Case</span>
              <span className="font-mono text-xs">{c.time}</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
              {c.explanation}
            </p>
            <div className="pt-1 text-[10px] font-mono text-slate-500">
              Space: <span className="font-semibold">{c.space}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
