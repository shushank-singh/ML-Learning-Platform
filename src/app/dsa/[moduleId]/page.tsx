'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  ArrowLeft,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { MODULES_CATALOG_DSA, getDSAModule } from '@/data/dsa/curriculum';
import { getProgress, toggleLessonCompletion } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';

interface DSAModulePageProps {
  params: { moduleId: string };
}

export default function DSAModulePage({ params }: DSAModulePageProps) {
  const { moduleId } = params;
  const mod = getDSAModule(moduleId);
  const [progress, setProgress] = useState<UserProgressState | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  if (!mod) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Module Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          The DSA module &quot;{moduleId}&quot; does not exist.
        </p>
        <Link
          href="/dsa"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to DSA Curriculum
        </Link>
      </div>
    );
  }

  const completedInModule = progress
    ? mod.lessons.filter((l) => progress.completedLessons[l.id]).length
    : 0;
  const pct = Math.round((completedInModule / (mod.lessons.length || 1)) * 100);

  const handleToggle = (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLessonCompletion(lessonId);
  };

  // Find prev/next modules
  const allIds = MODULES_CATALOG_DSA.map((m) => m.id);
  const currentIdx = allIds.indexOf(moduleId);
  const prevMod = currentIdx > 0 ? MODULES_CATALOG_DSA[currentIdx - 1] : null;
  const nextMod = currentIdx < allIds.length - 1 ? MODULES_CATALOG_DSA[currentIdx + 1] : null;

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/dsa" className="hover:text-violet-600 transition-colors">
          DSA Mastery Lab
        </Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-300 font-medium">{mod.title}</span>
      </div>

      {/* Module Header */}
      <div className="rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/20 dark:to-slate-900 p-6 sm:p-8 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-violet-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-sm">
                {mod.number}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                {mod.badge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {mod.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {mod.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              {completedInModule} / {mod.lessons.length} complete
            </span>
            <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
              {pct}%
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          {mod.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {mod.lessons.length} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            ~{mod.estimatedHours} hours
          </span>
        </div>
      </div>

      {/* Lessons List */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mod.lessons.map((lesson) => {
            const isDone = !!progress?.completedLessons[lesson.id];
            const diffColor =
              lesson.difficulty === 'Beginner'
                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
                : lesson.difficulty === 'Intermediate'
                ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400'
                : 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400';

            return (
              <Link
                key={lesson.id}
                href={`/dsa/${mod.id}/${lesson.id}`}
                className="p-4 sm:px-6 hover:bg-violet-50/50 dark:hover:bg-violet-950/10 transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    onClick={(e) => handleToggle(lesson.id, e)}
                    className="shrink-0 text-slate-400 hover:text-violet-500 transition-colors p-1"
                    title={isDone ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-violet-500 fill-violet-500/10" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {lesson.order}. {lesson.title}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${diffColor}`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lesson.readTimeMinutes}m
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Prev/Next Module Navigation */}
      <div className="flex items-center justify-between gap-4">
        {prevMod ? (
          <Link
            href={`/dsa/${prevMod.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Module {prevMod.number}: {prevMod.title}
          </Link>
        ) : (
          <div />
        )}
        {nextMod && (
          <Link
            href={`/dsa/${nextMod.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            Module {nextMod.number}: {nextMod.title}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
