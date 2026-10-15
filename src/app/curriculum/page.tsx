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
  ChevronDown,
  Sparkles,
  Filter,
} from 'lucide-react';
import { MODULES_CATALOG } from '@/data/modules/curriculum';
import { getProgress, toggleLessonCompletion } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';

export default function CurriculumPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);
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

  const badges = ['All', 'Foundations', 'Mathematics', 'Core ML', 'Evaluation', 'Ensembles', 'Unsupervised', 'Deep Learning', 'Engineering', 'Capstones'];

  const filteredModules = selectedBadge === 'All'
    ? MODULES_CATALOG
    : MODULES_CATALOG.filter((m) => m.badge.toLowerCase().includes(selectedBadge.toLowerCase()));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>Full Academic & Industry Roadmap</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Complete Machine Learning Curriculum
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Structured into 12 rigorous modules. Every single concept is paired with physical analogies, mathematical derivations, step-by-step hand examples, vectorized NumPy implementations, and interactive visual laboratories.
        </p>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {badges.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBadge(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedBadge === b
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {filteredModules.map((mod) => {
          const completedInModule = mod.lessons.filter(
            (l) => progress?.completedLessons[l.id]
          ).length;
          const pct = Math.round((completedInModule / (mod.lessons.length || 1)) * 100);

          return (
            <div
              key={mod.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
            >
              {/* Module Header Bar */}
              <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    M{mod.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {mod.badge}
                      </span>
                      <span className="text-xs text-slate-400">
                        Estimated: {mod.estimatedHours} hrs
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                      {mod.title}
                    </h2>
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
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      ></div>
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
}
