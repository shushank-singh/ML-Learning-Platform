import React from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

interface LockedLessonViewProps {
  moduleId: string;
  lessonId: string;
  moduleTitle?: string;
  lessonTitle?: string;
  trackTitle?: string;
}

export const LockedLessonView: React.FC<LockedLessonViewProps> = ({
  moduleId,
  lessonId,
  moduleTitle,
  lessonTitle,
  trackTitle,
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 text-center space-y-6">
        {/* Lock Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        {/* Header Info */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Restricted Curriculum · Plan Required</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {lessonTitle || 'Lesson Restricted'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            This lesson is part of <span className="font-semibold text-slate-800 dark:text-slate-200">{moduleTitle || moduleId}</span> and requires an upgraded plan.
          </p>
        </div>

        {/* Free Tier Callout */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Available on Free Tier:</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Free accounts include full access to <span className="font-medium text-slate-900 dark:text-slate-100">Module 0</span> across Machine Learning, NumPy, Pandas, Python, and Java.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>View Plans &amp; Upgrade</span>
          </Link>

          <Link
            href={`/curriculum/${moduleId}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Module Overview</span>
          </Link>
        </div>

        {/* Links to Free Modules */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <Link href="/curriculum/module-0" className="hover:text-indigo-600 transition-colors">ML Module 0</Link>
          <span>·</span>
          <Link href="/curriculum/numpy-module-1" className="hover:text-indigo-600 transition-colors">NumPy Module 0</Link>
          <span>·</span>
          <Link href="/curriculum/pandas-module-1" className="hover:text-indigo-600 transition-colors">Pandas Module 0</Link>
          <span>·</span>
          <Link href="/python/python-module-1" className="hover:text-indigo-600 transition-colors">Python Module 0</Link>
          <span>·</span>
          <Link href="/java/java-module-1" className="hover:text-indigo-600 transition-colors">Java Module 0</Link>
        </div>
      </div>
    </div>
  );
};

