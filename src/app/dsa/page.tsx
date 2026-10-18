'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Code2,
  Network,
  TreePine,
  Layers,
  Clock,
  Sparkles,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { MODULES_CATALOG_DSA } from '@/data/dsa/curriculum';
import { getProgress } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';

const SECTION_COLORS = [
  'from-violet-600 to-purple-700',
  'from-violet-500 to-indigo-600',
  'from-purple-600 to-violet-700',
];

const MODULE_ICONS: Record<number, React.ElementType> = {
  1: Cpu, 2: Code2, 3: Network, 4: Layers,
  5: Layers, 6: TreePine, 7: ArrowRight, 8: TreePine,
  9: TrendingUp, 10: Network, 11: TrendingUp, 12: Cpu,
};

export default function DSALandingPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const totalLessons = MODULES_CATALOG_DSA.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalModules = MODULES_CATALOG_DSA.length;
  const totalHours = MODULES_CATALOG_DSA.reduce((acc, m) => acc + m.estimatedHours, 0);

  const completedCount = progress
    ? MODULES_CATALOG_DSA.flatMap((m) => m.lessons).filter(
        (l) => progress.completedLessons[l.id]
      ).length
    : 0;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-900 via-purple-800 to-slate-900 border border-violet-700/50 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Data Structures &amp; Algorithms — From Foundations to Advanced</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            DSA Mastery Lab
          </h1>

          <p className="text-sm sm:text-base text-violet-100/80 leading-relaxed font-light">
            A structured path through every algorithm and data structure you need
            for software engineering and competitive programming. Interactive
            visualizers, step-by-step execution, Python implementations, quizzes,
            and coding challenges — for every single topic.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/dsa/${MODULES_CATALOG_DSA[0].id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-violet-950 font-bold text-xs hover:bg-violet-50 transition-colors shadow-md"
            >
              <BookOpen className="w-4 h-4 text-violet-600" />
              <span>Start with Foundations</span>
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <div className="w-full h-full bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Modules', value: totalModules, sub: 'structured tracks', color: 'violet' },
          { label: 'Lessons', value: totalLessons, sub: 'in-depth topics', color: 'purple' },
          { label: 'Study Hours', value: `${totalHours}+`, sub: 'estimated time', color: 'indigo' },
          { label: 'Completed', value: completedCount, sub: `of ${totalLessons} lessons`, color: 'emerald' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          >
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              {stat.label}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Module Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Complete DSA Curriculum
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              12 modules covering foundations through advanced algorithms
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES_CATALOG_DSA.map((mod) => {
            const Icon = MODULE_ICONS[mod.number] || Cpu;
            const completedInModule = progress
              ? mod.lessons.filter((l) => progress.completedLessons[l.id]).length
              : 0;
            const pct = mod.lessons.length > 0
              ? Math.round((completedInModule / mod.lessons.length) * 100)
              : 0;

            return (
              <Link
                key={mod.id}
                href={`/dsa/${mod.id}`}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-violet-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    Module {mod.number}: {mod.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {mod.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>{mod.lessons.length} lessons · {mod.estimatedHours}h</span>
                    <span className="flex items-center gap-1 group-hover:text-violet-600 font-medium transition-colors">
                      {completedInModule}/{mod.lessons.length}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
