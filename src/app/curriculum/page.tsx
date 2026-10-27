'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  Brain,
  Hash,
  Table,
  Check,
} from 'lucide-react';
import {
  MODULES_CATALOG,
  MODULES_CATALOG_ML_CORE,
  MODULES_CATALOG_NUMPY,
  MODULES_CATALOG_PANDAS,
} from '@/data/modules/curriculum';
import { getProgress, toggleLessonCompletion } from '@/lib/storage';
import { UserProgressState, ModuleData } from '@/lib/types';

type TrackFilter = 'all' | 'ml-core' | 'numpy' | 'pandas';

export default function CurriculumPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackFilter>('all');
  const [selectedBadge, setSelectedBadge] = useState<string>('All');

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const handleToggle = (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLessonCompletion(lessonId);
  };

  // Track counts
  const mlCoreLessons = MODULES_CATALOG_ML_CORE.flatMap((m) => m.lessons);
  const numpyLessons = MODULES_CATALOG_NUMPY.flatMap((m) => m.lessons);
  const pandasLessons = MODULES_CATALOG_PANDAS.flatMap((m) => m.lessons);
  const allLessons = MODULES_CATALOG.flatMap((m) => m.lessons);

  const mlDone = mlCoreLessons.filter((l) => progress?.completedLessons[l.id]).length;
  const numpyDone = numpyLessons.filter((l) => progress?.completedLessons[l.id]).length;
  const pandasDone = pandasLessons.filter((l) => progress?.completedLessons[l.id]).length;
  const allDone = allLessons.filter((l) => progress?.completedLessons[l.id]).length;

  const getFilteredModules = (): { trackLabel: string; trackDesc: string; icon: any; modules: ModuleData[] }[] => {
    if (selectedTrack === 'ml-core') {
      return [{
        trackLabel: 'Core Machine Learning Foundations & Algorithms',
        trackDesc: '12 rigorous modules covering calculus derivations, regression, classification, ensembles, SVMs, clustering, neural networks, and MLOps deployment.',
        icon: Brain,
        modules: MODULES_CATALOG_ML_CORE,
      }];
    }
    if (selectedTrack === 'numpy') {
      return [{
        trackLabel: 'NumPy Mastery',
        trackDesc: '7 modules covering array foundations, indexing, slicing, broadcasting, vectorization, statistical algebra, and student analytics capstone.',
        icon: Hash,
        modules: MODULES_CATALOG_NUMPY,
      }];
    }
    if (selectedTrack === 'pandas') {
      return [{
        trackLabel: 'Pandas Mastery',
        trackDesc: '10 modules covering Series, DataFrames, selection, cleaning, transformation, GroupBy aggregations, joins, tidy data, performance, and retail sales capstone.',
        icon: Table,
        modules: MODULES_CATALOG_PANDAS,
      }];
    }

    // All tracks
    return [
      {
        trackLabel: '1. Core Machine Learning Algorithms',
        trackDesc: 'From first-principles math and loss derivations to deep networks and production microservices.',
        icon: Brain,
        modules: MODULES_CATALOG_ML_CORE,
      },
      {
        trackLabel: '2. NumPy Mastery',
        trackDesc: 'Numerical computing, contiguous memory structures, universal functions, broadcasting, and student analytics capstone.',
        icon: Hash,
        modules: MODULES_CATALOG_NUMPY,
      },
      {
        trackLabel: '3. Pandas Mastery',
        trackDesc: 'Tabular data wrangling, data cleaning, GroupBy split-apply-combine, reshaping, and sales analytics capstone.',
        icon: Table,
        modules: MODULES_CATALOG_PANDAS,
      },
    ];
  };

  const trackSections = getFilteredModules();

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>Category 1 · Predictive Models &amp; AI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Complete Machine Learning
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          The definitive curriculum integrating Core Machine Learning, NumPy Mastery, and Pandas Mastery into one structured pathway. Every lesson pairs intuitive real-life analogies, runnable code, expected outputs, common mistakes, practice exercises, and interactive visualizers.
        </p>

        {/* Track Overview KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Core ML Card */}
          <div
            onClick={() => setSelectedTrack(selectedTrack === 'ml-core' ? 'all' : 'ml-core')}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              selectedTrack === 'ml-core'
                ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Brain className="w-4 h-4" />
                Core ML Algorithms
              </span>
              <span className="text-xs font-mono text-slate-500">12 Modules</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {mlDone} <span className="text-xs font-normal text-slate-400">/ {mlCoreLessons.length}</span>
              </span>
              <span className="text-xs font-semibold text-emerald-500">
                {Math.round((mlDone / mlCoreLessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${Math.round((mlDone / mlCoreLessons.length) * 100)}%` }}
              />
            </div>
          </div>

          {/* NumPy Card */}
          <div
            onClick={() => setSelectedTrack(selectedTrack === 'numpy' ? 'all' : 'numpy')}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              selectedTrack === 'numpy'
                ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <Hash className="w-4 h-4" />
                NumPy Mastery
              </span>
              <span className="text-xs font-mono text-slate-500">7 Modules</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {numpyDone} <span className="text-xs font-normal text-slate-400">/ {numpyLessons.length}</span>
              </span>
              <span className="text-xs font-semibold text-cyan-500">
                {Math.round((numpyDone / numpyLessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full"
                style={{ width: `${Math.round((numpyDone / numpyLessons.length) * 100)}%` }}
              />
            </div>
          </div>

          {/* Pandas Card */}
          <div
            onClick={() => setSelectedTrack(selectedTrack === 'pandas' ? 'all' : 'pandas')}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              selectedTrack === 'pandas'
                ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/10'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Table className="w-4 h-4" />
                Pandas Mastery
              </span>
              <span className="text-xs font-mono text-slate-500">10 Modules</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {pandasDone} <span className="text-xs font-normal text-slate-400">/ {pandasLessons.length}</span>
              </span>
              <span className="text-xs font-semibold text-emerald-500">
                {Math.round((pandasDone / pandasLessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${Math.round((pandasDone / pandasLessons.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Track Switcher Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button
            onClick={() => setSelectedTrack('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTrack === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Modules ({MODULES_CATALOG.length})</span>
          </button>
          <button
            onClick={() => setSelectedTrack('ml-core')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTrack === 'ml-core'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span>Core ML ({MODULES_CATALOG_ML_CORE.length} Modules)</span>
          </button>
          <button
            onClick={() => setSelectedTrack('numpy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTrack === 'numpy'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Hash className="w-3.5 h-3.5 text-cyan-400" />
            <span>NumPy Mastery ({MODULES_CATALOG_NUMPY.length} Modules)</span>
          </button>
          <button
            onClick={() => setSelectedTrack('pandas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTrack === 'pandas'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pandas Mastery ({MODULES_CATALOG_PANDAS.length} Modules)</span>
          </button>
        </div>
      </div>

      {/* Modules Sections */}
      <div className="space-y-10">
        {trackSections.map((section, sIdx) => {
          const SectionIcon = section.icon;

          return (
            <div key={section.trackLabel} className="space-y-4">
              {/* Section Header */}
              <div className="flex items-center gap-3 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <SectionIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {section.trackLabel}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {section.trackDesc}
                  </p>
                </div>
              </div>

              {/* Module Cards */}
              <div className="space-y-5">
                {section.modules.map((mod) => {
                  const completedInModule = mod.lessons.filter(
                    (l) => progress?.completedLessons[l.id]
                  ).length;
                  const pct = Math.round((completedInModule / (mod.lessons.length || 1)) * 100);

                  const isNumPy = mod.id.startsWith('numpy');
                  const isPandas = mod.id.startsWith('pandas');
                  const badgeColor = isNumPy
                    ? 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300'
                    : isPandas
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                    : 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300';

                  const modNumberPrefix = isNumPy ? 'NP' : isPandas ? 'PD' : 'M';

                  return (
                    <div
                      key={mod.id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
                    >
                      {/* Module Header Bar */}
                      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-sm text-white ${
                            isNumPy ? 'bg-cyan-600' : isPandas ? 'bg-emerald-600' : 'bg-indigo-600'
                          }`}>
                            {modNumberPrefix}{mod.number}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
                                {mod.badge}
                              </span>
                              <span className="text-xs text-slate-400">
                                Estimated: {mod.estimatedHours} hrs · {mod.lessons.length} lessons
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                              {mod.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                              {mod.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end md:self-auto">
                          <div className="text-right">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                              {completedInModule} / {mod.lessons.length} Completed
                            </span>
                            <div className="w-28 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  pct === 100 ? 'bg-emerald-500' : isNumPy ? 'bg-cyan-500' : isPandas ? 'bg-emerald-500' : 'bg-indigo-500'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>

                          <Link
                            href={`/curriculum/${mod.id}`}
                            className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            View Module
                          </Link>
                        </div>
                      </div>

                      {/* Module Description */}
                      <div className="px-6 py-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-50/20 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
                        {mod.description}
                      </div>

                      {/* Lesson Items */}
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {mod.lessons.map((lesson) => {
                          const isDone = !!progress?.completedLessons[lesson.id];

                          return (
                            <Link
                              key={lesson.id}
                              href={`/curriculum/${mod.id}/${lesson.id}`}
                              className="p-4 sm:px-6 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors flex items-center justify-between gap-4 group"
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                <button
                                  onClick={(e) => handleToggle(lesson.id, e)}
                                  className="shrink-0 text-slate-400 hover:text-emerald-500 transition-colors p-1"
                                  title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                                  ) : (
                                    <Circle className="w-5 h-5" />
                                  )}
                                </button>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                      {lesson.title}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                                      {lesson.difficulty}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                    {lesson.description}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {lesson.readTimeMinutes}m
                                </span>
                                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
