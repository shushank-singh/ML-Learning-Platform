'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Terminal,
  ArrowRight,
  Code2,
  Database,
  Layers,
  Clock,
  Sparkles,
  Shield,
  Zap,
  Box,
  Cpu,
  BarChart2,
  Rocket,
  Workflow,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { MODULES_CATALOG_PYTHON } from '@/data/python/curriculum';
import { getProgress } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';

const MODULE_ICONS: Record<number, React.ElementType> = {
  1: Terminal, 2: Workflow, 3: Database, 4: Code2,
  5: Zap, 6: Box, 7: Shield, 8: Code2,
  9: Cpu, 10: Terminal, 11: BarChart2, 12: Rocket,
};

export default function PythonLandingPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const totalLessons = MODULES_CATALOG_PYTHON.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalModules = MODULES_CATALOG_PYTHON.length;
  const totalHours = MODULES_CATALOG_PYTHON.reduce((acc, m) => acc + m.estimatedHours, 0);

  const completedCount = progress
    ? MODULES_CATALOG_PYTHON.flatMap((m) => m.lessons).filter(
        (l) => progress.completedLessons[l.id]
      ).length
    : 0;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-800 to-slate-900 border border-emerald-700/50 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Complete Python Programming Track — Zero to Production</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Python Mastery Lab
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-light">
            Master the world&apos;s most popular language from execution mechanics and data structures
            to object-oriented design, CPython internals, data engineering with NumPy/Pandas,
            and complete real-world projects. With browser-side Python execution and live memory diagrams.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/python/${MODULES_CATALOG_PYTHON[0].id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-md"
            >
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Start with Python Fundamentals</span>
            </Link>
            <Link
              href="/code-lab"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-600/60 border border-emerald-400/30 text-white font-semibold text-xs transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>Launch Python REPL</span>
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <div className="w-full h-full bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Modules', value: totalModules, sub: 'structured tracks', color: 'emerald' },
          { label: 'Lessons', value: totalLessons, sub: 'comprehensive topics', color: 'teal' },
          { label: 'Study Hours', value: `${totalHours}+`, sub: 'estimated time', color: 'cyan' },
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
              Complete Python Curriculum
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              12 modules taking you from first syntax line to production applications
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES_CATALOG_PYTHON.map((mod) => {
            const Icon = MODULE_ICONS[mod.number] || Terminal;
            const completedInModule = progress
              ? mod.lessons.filter((l) => progress.completedLessons[l.id]).length
              : 0;
            const pct = mod.lessons.length > 0
              ? Math.round((completedInModule / mod.lessons.length) * 100)
              : 0;

            return (
              <Link
                key={mod.id}
                href={`/python/${mod.id}`}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
                    <span className="flex items-center gap-1 group-hover:text-emerald-600 font-medium transition-colors">
                      {completedInModule}/{mod.lessons.length}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
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
