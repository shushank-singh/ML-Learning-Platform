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
  GitBranch,
  AlertTriangle,
  Boxes,
} from 'lucide-react';
import { MODULES_CATALOG_JAVA } from '@/data/java/curriculum';
import { getProgress } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';
import { JavaVisualizerDispatcher } from '@/components/java/visualizers/JavaVisualizerDispatcher';

const MODULE_ICONS: Record<number, React.ElementType> = {
  1: Terminal,
  2: Layers,
  3: Workflow,
  4: BarChart2,
  5: Layers,
  6: Boxes,
  7: GitBranch,
  8: Shield,
  9: AlertTriangle,
  10: Database,
  11: Cpu,
  12: Rocket,
};

export default function JavaDashboardPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [showVisualizerPreview, setShowVisualizerPreview] = useState<boolean>(false);

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const totalLessons = MODULES_CATALOG_JAVA.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalModules = MODULES_CATALOG_JAVA.length;
  const totalHours = MODULES_CATALOG_JAVA.reduce((acc, m) => acc + m.estimatedHours, 0);

  const completedCount = progress
    ? MODULES_CATALOG_JAVA.flatMap((m) => m.lessons).filter(
        (l) => progress.completedLessons[l.id]
      ).length
    : 0;

  const percentCompleted = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 border border-amber-600/40 p-6 sm:p-10 text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Complete Java Mastery Lab — Zero to Enterprise Software Architect</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Java Mastery Lab
          </h1>

          <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-light">
            Master the world&apos;s leading enterprise language through simple explanations, real-life analogies,
            interactive memory diagrams, call stack animations, and an isolated real OpenJDK execution sandbox.
            From JVM architecture and OOP to the Collections Framework, DSA, and modern concurrent Streams.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/java/${MODULES_CATALOG_JAVA[0].id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
            >
              <Terminal className="w-4 h-4 text-slate-950" />
              <span>Start Module 1: Java Fundamentals</span>
            </Link>
            <button
              onClick={() => setShowVisualizerPreview(!showVisualizerPreview)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-amber-400/30 text-white font-semibold text-xs transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{showVisualizerPreview ? 'Hide Visualizers' : 'Explore Interactive Visualizers'}</span>
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <div className="w-full h-full bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Modules', value: totalModules, sub: 'structured curriculum', color: 'amber' },
          { label: 'Lessons', value: totalLessons, sub: 'complete interactive topics', color: 'indigo' },
          { label: 'Study Hours', value: `${totalHours}+`, sub: 'hands-on material', color: 'emerald' },
          {
            label: 'Completion',
            value: `${percentCompleted}%`,
            sub: `${completedCount} of ${totalLessons} finished`,
            color: 'violet',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {stat.label}
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 my-1 font-mono">
              {stat.value}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Interactive Visualizer Showcase Drawer */}
      {showVisualizerPreview && (
        <div className="p-6 rounded-2xl border border-amber-300 dark:border-amber-900/60 bg-amber-50/20 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Live Interactive Visualizer Showcase: JVM Architecture
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Module 1 Live Visualizer</span>
          </div>
          <JavaVisualizerDispatcher type="jvm-architecture" />
        </div>
      )}

      {/* 12 Java Modules Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Java Curriculum Modules
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Complete, beginner-friendly lessons with real-life analogies, interactive animations, and runnable code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES_CATALOG_JAVA.map((mod) => {
            const Icon = MODULE_ICONS[mod.number] || Terminal;
            const completedInModule = progress
              ? mod.lessons.filter((l) => progress.completedLessons[l.id]).length
              : 0;
            const isFinished = completedInModule === mod.lessons.length && mod.lessons.length > 0;
            const modPercent = Math.round((completedInModule / mod.lessons.length) * 100);

            return (
              <Link
                key={mod.id}
                href={`/java/${mod.id}`}
                className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-amber-500/60 hover:shadow-lg transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Module {mod.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5">
                      {mod.subtitle}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 mt-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {mod.estimatedHours} hrs
                    </span>
                    <span className="font-mono font-semibold">
                      {completedInModule}/{mod.lessons.length} lessons ({modPercent}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isFinished ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${modPercent}%` }}
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
