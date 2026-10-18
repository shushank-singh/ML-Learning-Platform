'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Construction, Terminal } from 'lucide-react';
import { getPythonModule, getPythonLesson, MODULES_CATALOG_PYTHON } from '@/data/python/curriculum';
import { PythonLessonView } from '@/components/python/PythonLessonView';
import { logStudyTime } from '@/lib/storage';

interface PythonLessonPageProps {
  params: { moduleId: string; lessonId: string };
}

export default function PythonLessonPage({ params }: PythonLessonPageProps) {
  const { moduleId, lessonId } = params;
  const mod = getPythonModule(moduleId);
  const lesson = getPythonLesson(lessonId);

  // Log study time when a lesson is visited
  useEffect(() => {
    const timer = setTimeout(() => logStudyTime(5), 60000);
    return () => clearTimeout(timer);
  }, [lessonId]);

  if (!mod) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Module Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400">
          The module &ldquo;{moduleId}&rdquo; does not exist in the Python curriculum.
        </p>
        <Link href="/python" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to Python Mastery Lab
        </Link>
      </div>
    );
  }

  const lessons = mod.lessons;
  const currentIdx = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

  const allIds = MODULES_CATALOG_PYTHON.map((m) => m.id);
  const modIdx = allIds.indexOf(moduleId);
  const nextMod = modIdx < allIds.length - 1 ? MODULES_CATALOG_PYTHON[modIdx + 1] : null;

  const lessonSummary = lessons.find((l) => l.id === lessonId);

  if (!lessonSummary) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Lesson Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400">
          The lesson &ldquo;{lessonId}&rdquo; does not exist in Module {mod.number}.
        </p>
        <Link href={`/python/${moduleId}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to {mod.title}
        </Link>
      </div>
    );
  }

  const diffColor =
    lessonSummary.difficulty === 'Beginner'
      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
      : lessonSummary.difficulty === 'Intermediate'
      ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400'
      : 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400';

  if (!lesson) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
          <Link href="/python" className="hover:text-emerald-600 transition-colors">Python Mastery Lab</Link>
          <span>/</span>
          <Link href={`/python/${moduleId}`} className="hover:text-emerald-600 transition-colors">{mod.title}</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">{lessonSummary.title}</span>
        </div>

        {/* Lesson Header */}
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-900 p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${diffColor}`}>
              {lessonSummary.difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {lessonSummary.readTimeMinutes} min
            </span>
            <span className="text-xs text-slate-400">Module {mod.number} · Lesson {lessonSummary.order}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {lessonSummary.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {lessonSummary.description}
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="rounded-2xl border-2 border-dashed border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/10 p-8 sm:p-12 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center">
            <Construction className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Full Lesson Content Scheduled for Phase 4 &amp; 5
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            This Python lesson is registered and indexed. The complete interactive environment —
            featuring the live execution visualizer, memory &amp; namespace tracer, editable browser-side
            code runner, interactive quiz, and coding challenge — will be populated in Phase 4 (Python
            Visualization &amp; Execution Engine) and Phase 5 (Authoring).
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2 text-xs">
            {['Execution Visualizer', 'Call Stack & Scopes', 'Object Memory Model', 'Runnable Code', 'Interactive Quiz', 'Coding Challenge'].map((f) => (
              <span key={f} className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Lesson Navigation */}
        <div className="flex items-center justify-between gap-4">
          {prevLesson ? (
            <Link href={`/python/${moduleId}/${prevLesson.id}`} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors max-w-[45%]">
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{prevLesson.title}</span>
            </Link>
          ) : (
            <Link href={`/python/${moduleId}`} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />Module Overview
            </Link>
          )}

          {nextLesson ? (
            <Link href={`/python/${moduleId}/${nextLesson.id}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm max-w-[45%]">
              <span className="truncate">{nextLesson.title}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          ) : nextMod ? (
            <Link href={`/python/${nextMod.id}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm">
              Next Module
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  return <PythonLessonView lesson={lesson} />;
}
