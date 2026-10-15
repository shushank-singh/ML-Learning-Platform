'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { getModule } from '@/data/modules/curriculum';
import { getProgress } from '@/lib/storage';

export default function ModuleOverviewPage() {
  const params = useParams();
  const moduleId = params?.moduleId as string;
  const mod = getModule(moduleId);

  if (!mod) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold">Module not found</h1>
        <Link href="/curriculum" className="text-indigo-600 underline text-sm mt-2 block">
          Return to Curriculum
        </Link>
      </div>
    );
  }

  const progress = getProgress();

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/curriculum" className="hover:text-indigo-600 transition-colors">
          Curriculum
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 font-medium">
          Module {mod.number}: {mod.title}
        </span>
      </div>

      {/* Module Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/40 p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            {mod.badge}
          </span>
          <span className="text-xs text-indigo-200/70 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {mod.estimatedHours} Hours of In-Depth Instruction
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Module {mod.number}: {mod.title}
        </h1>
        <p className="text-base text-indigo-100/80 font-light max-w-2xl leading-relaxed">
          {mod.description}
        </p>

        <div className="pt-2">
          {mod.lessons.length > 0 && (
            <Link
              href={`/curriculum/${mod.id}/${mod.lessons[0].id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-md"
            >
              <span>Start First Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Lessons in this Module ({mod.lessons.length})
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          {mod.lessons.map((lesson, idx) => {
            const isCompleted = !!progress.completedLessons[lesson.id];

            return (
              <Link
                key={lesson.id}
                href={`/curriculum/${mod.id}/${lesson.id}`}
                className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {lesson.title}
                      </h3>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                  <span className="hidden sm:inline px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono">
                    {lesson.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.readTimeMinutes}m
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
