import React from 'react';
import Link from 'next/link';
import { Lock, Sparkles, ShieldCheck } from 'lucide-react';

interface LockedModuleBannerProps {
  moduleTitle: string;
  moduleId: string;
}

export const LockedModuleBanner: React.FC<LockedModuleBannerProps> = ({
  moduleTitle,
  moduleId,
}) => {
  return (
    <div className="rounded-2xl border border-amber-300 dark:border-amber-700/60 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Module Locked · Premium Access Required
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              Plan Required
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
            This module contains restricted educational material. Free tier accounts can access Module 0 across Machine Learning, NumPy, Pandas, Python, and Java.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
        <Link
          href="/pricing"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>View Plans</span>
        </Link>
      </div>
    </div>
  );
};

