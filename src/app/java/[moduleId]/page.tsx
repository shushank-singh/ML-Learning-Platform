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
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { MODULES_CATALOG_JAVA, getJavaModule } from '@/data/java/curriculum';
import { getProgress, toggleLessonCompletion } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';

interface JavaModulePageProps {
  params: { moduleId: string };
}

export default function JavaModulePage({ params }: JavaModulePageProps) {
  const { moduleId } = params;
  const mod = getJavaModule(moduleId);
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
          The Java module &quot;{moduleId}&quot; does not exist.
        </p>
        <Link
          href="/java"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Java Curriculum
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

  const allIds = MODULES_CATALOG_JAVA.map((m) => m.id);
  const currentIdx = allIds.indexOf(moduleId);
  const prevMod = currentIdx > 0 ? MODULES_CATALOG_JAVA[currentIdx - 1] : null;
  const nextMod = currentIdx < allIds.length - 1 ? MODULES_CATALOG_JAVA[currentIdx + 1] : null;

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/java" className="hover:text-amber-600 transition-colors">
          Java Mastery Lab
        </Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-300 font-medium">{mod.title}</span>
      </div>

      {/* Module Header Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60">
              Module {mod.number}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {mod.badge}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {mod.estimatedHours} hours total
            </span>
            <span>•</span>
            <span className="font-mono">{mod.lessons.length} lessons</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {mod.title}
          </h1>
          <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
            {mod.subtitle}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {mod.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="pt-2 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Module Completion</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {completedInModule} / {mod.lessons.length} ({pct}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 px-1">
          Module Lessons ({mod.lessons.length})
        </h2>

        <div className="space-y-2.5">
          {mod.lessons.map((lesson) => {
            const isDone = !!progress?.completedLessons[lesson.id];
            return (
              <Link
                key={lesson.id}
                href={`/java/${mod.id}/${lesson.id}`}
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500/60 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0 pr-4">
                  {/* Completion toggle icon button */}
                  <button
                    onClick={(e) => handleToggle(lesson.id, e)}
                    className="mt-0.5 shrink-0 text-slate-300 hover:text-emerald-500 dark:text-slate-700 dark:hover:text-emerald-400 transition-colors"
                    title={isDone ? 'Mark as Incomplete' : 'Mark as Complete'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/40" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {String(lesson.order).padStart(2, '0')}.
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                        {lesson.title}
                      </h3>
                      {lesson.visualizerType !== 'none' && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 flex items-center gap-0.5">
                          <Sparkles className="w-2.5 h-2.5" />
                          Visualizer
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium">
                      {lesson.difficulty}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      {lesson.readTimeMinutes}m
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Prev / Next Module Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        {prevMod ? (
          <Link
            href={`/java/${prevMod.id}`}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous: Module {prevMod.number} ({prevMod.title})</span>
          </Link>
        ) : (
          <div />
        )}

        {nextMod ? (
          <Link
            href={`/java/${nextMod.id}`}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Next: Module {nextMod.number} ({nextMod.title})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/java"
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <span>Return to Java Dashboard</span>
          </Link>
        )}
      </div>
    </div>
  );
}
