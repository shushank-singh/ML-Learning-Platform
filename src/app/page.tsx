'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame,
  Clock,
  CheckCircle2,
  BookOpen,
  Sliders,
  Terminal,
  Calculator,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  Play,
  Award,
  Cpu,
  Coffee,
} from 'lucide-react';
import { MODULES_CATALOG } from '@/data/modules/curriculum';
import { getProgress } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';

export default function DashboardPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const totalLessons = MODULES_CATALOG.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress ? Object.values(progress.completedLessons).filter(Boolean).length : 0;
  const completionPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Active or continue lesson
  const continueModule = MODULES_CATALOG[3]; // Module 3
  const continueLesson = continueModule.lessons[0]; // Linear Regression

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 border border-indigo-700/50 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Machine Learning from Mathematics to Deployment</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-cyan-300">ML Mastery Lab</span>
          </h1>

          <p className="text-sm sm:text-base text-indigo-100/80 leading-relaxed font-light">
            You are mastering real machine learning: from rigorous linear algebra and gradient derivations to vectorized NumPy implementations, interactive visualizers, and production Docker APIs.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/curriculum/${continueLesson.moduleId}/${continueLesson.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition-colors shadow-md"
            >
              <Play className="w-4 h-4 fill-current text-indigo-600" />
              <span>Continue Linear Regression</span>
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-600/60 border border-indigo-400/30 text-white font-semibold text-xs transition-colors"
            >
              <Sliders className="w-4 h-4" />
              <span>Explore Visual Playground</span>
            </Link>
          </div>
        </div>

        {/* Decorative background grid and glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <div className="w-full h-full bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Streak */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              Daily Streak
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                {progress?.streak.currentStreak || 1}
              </span>
              <span className="text-xs text-slate-400">days active</span>
            </div>
          </div>
        </div>

        {/* Total Time Learned */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              Study Time
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                {progress?.totalMinutesLearned || 45}
              </span>
              <span className="text-xs text-slate-400">minutes</span>
            </div>
          </div>
        </div>

        {/* Syllabus Progress */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              Curriculum Progress
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                {completionPercentage}%
              </span>
              <span className="text-xs text-slate-400">({completedCount}/{totalLessons})</span>
            </div>
          </div>
        </div>

        {/* Capstone Projects */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              Guided Projects
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                10
              </span>
              <span className="text-xs text-slate-400">industry blueprints</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning & Quick Launch Regimes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Learning Featured Card */}
        <div className="lg:col-span-8 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Featured Topic
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Active Module 3
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {continueLesson.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {continueLesson.description}
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">MATHEMATICS</span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">Normal Equation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">VISUALIZER</span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">Live OLS Simulator</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">CODE LAB</span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">NumPy from Scratch</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500">20 Structured Pedagogical Sections</span>
            <Link
              href={`/curriculum/${continueLesson.moduleId}/${continueLesson.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>Launch Reference Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Laboratories & Tracks Launchpad */}
        <div className="lg:col-span-4 space-y-3">
          <Link
            href="/java"
            className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-slate-900 shadow-sm hover:border-amber-500/80 transition-all flex items-start gap-3 group block"
          >
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                  Java Mastery Lab
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded">
                  NEW
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                12 modules (120 lessons): JVM, Memory, OOP, Generics, Collections, DSA & Runner.
              </p>
            </div>
          </Link>

          <Link
            href="/dsa"
            className="p-4 rounded-xl border border-violet-200 dark:border-violet-900/60 bg-violet-50/40 dark:bg-slate-900 shadow-sm hover:border-violet-500/80 transition-all flex items-start gap-3 group block"
          >
            <div className="p-2.5 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-violet-600 transition-colors">
                  DSA Mastery Lab
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 rounded">
                  NEW
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                12 modules: Trees, Graphs, Sorting, DP, Linked Lists & interactive visualizers.
              </p>
            </div>
          </Link>

          <Link
            href="/python"
            className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-slate-900 shadow-sm hover:border-emerald-500/80 transition-all flex items-start gap-3 group block"
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
                  Python Mastery Lab
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded">
                  NEW
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                12 modules: Execution model, OOP, Internals, NumPy, Pandas & 8 capstone projects.
              </p>
            </div>
          </Link>

          <Link
            href="/playground"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-500/50 transition-all flex items-start gap-3 group block"
          >
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                Interactive ML Playground
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sliders for noise, learning rates, decision boundaries, K-Means & ROC curves.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Complete 12-Module Curriculum Overview Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Complete Machine Learning Curriculum
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              12 comprehensive modules spanning mathematics, algorithms, ensembles, and deployment.
            </p>
          </div>
          <Link
            href="/curriculum"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES_CATALOG.map((mod) => (
            <Link
              key={mod.id}
              href={`/curriculum/${mod.id}`}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                    {mod.number}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {mod.badge}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {mod.subtitle}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>{mod.estimatedHours} hrs</span>
                <span className="flex items-center gap-1 group-hover:text-indigo-600 font-medium transition-colors">
                  <span>{mod.lessons.length} lessons</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
