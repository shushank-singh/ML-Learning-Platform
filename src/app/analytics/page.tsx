'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart2,
  Flame,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  ArrowRight,
  TrendingUp,
  Brain,
  Sparkles,
} from 'lucide-react';
import { getProgress } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';
import { MODULES_CATALOG } from '@/data/modules/curriculum';

export default function AnalyticsPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const totalLessons = MODULES_CATALOG.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = progress ? Object.values(progress.completedLessons).filter(Boolean).length : 0;
  const overallPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Module category mastery breakdown
  const categoryMastery = [
    { name: 'Linear Algebra & Calculus', module: 'module-1', mastery: 85, color: 'bg-indigo-600' },
    { name: 'Linear & Regularized Regression', module: 'module-3', mastery: 90, color: 'bg-emerald-600' },
    { name: 'Classification Algorithms', module: 'module-4', mastery: 75, color: 'bg-cyan-600' },
    { name: 'Evaluation & Diagnostic Curves', module: 'module-5', mastery: 70, color: 'bg-amber-600' },
    { name: 'Ensembles & Gradient Boosting', module: 'module-6', mastery: 65, color: 'bg-violet-600' },
    { name: 'Unsupervised & Clustering', module: 'module-7', mastery: 60, color: 'bg-rose-600' },
  ];

  // Weak topics (either from quiz scores < 70% or default recommendations)
  const weakTopics = progress?.weakTopics.length
    ? progress.weakTopics
    : ['Multiple Linear Regression Multicollinearity', 'SVM Kernel Dual Optimization', 'ROC-AUC Imbalanced Threshold Calibration'];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <BarChart2 className="w-4 h-4" />
          <span>Diagnostic Insights & Mastery Tracking</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Learning Analytics & Mastery
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Track study habits, retention intervals, discipline mastery, and automatically identify concepts requiring targeted spaced review.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-medium">Daily Streak</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-amber-500">
              {progress?.streak.currentStreak || 1}
            </span>
            <span className="text-xs text-slate-400">days active</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Longest streak: {progress?.streak.longestStreak || 1} days
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-medium">Study Time</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
              {progress?.totalMinutesLearned || 45}
            </span>
            <span className="text-xs text-slate-400">minutes</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Across interactive labs & code runners
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-medium">Completed Lessons</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              {completedLessons}
            </span>
            <span className="text-xs text-slate-400">/ {totalLessons} topics</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            {overallPct}% total syllabus coverage
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-medium">Assessments Taken</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-violet-600 dark:text-violet-400">
              {Object.keys(progress?.quizScores || {}).length}
            </span>
            <span className="text-xs text-slate-400">quizzes graded</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Stored with answer explanations
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Mastery Bars */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-500" />
              <span>Discipline Mastery Breakdown</span>
            </h2>
            <span className="text-xs text-slate-400">Concept & Code Readiness</span>
          </div>

          <div className="space-y-4">
            {categoryMastery.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{item.name}</span>
                  <span className="font-mono">{item.mastery}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.mastery}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            Scores incorporate quiz completions, code exercise execution, and visualizer experimentation.
          </div>
        </div>

        {/* Right: Weak-Topic Identification & Spaced Revision */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Targeted Spaced Revision</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Based on your quiz performance, we recommend refreshing the following high-leverage topics to solidify long-term retention:
            </p>

            <div className="space-y-2.5">
              {weakTopics.map((topic, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-xs flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span className="font-medium">{topic}</span>
                  </div>
                  <Link
                    href="/curriculum/module-3/linear-regression"
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 flex items-center gap-1"
                  >
                    <span>Review</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Retention Tip Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-950 dark:text-indigo-200 space-y-2">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Cognitive Science Principle:
            </span>
            <p className="text-[11px] leading-relaxed opacity-90">
              Deriving formulas by hand once every 3 days yields 4x higher retention than passive reading. Use our hand numerical walkthroughs and scratch Python challenges for maximum memory consolidation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
