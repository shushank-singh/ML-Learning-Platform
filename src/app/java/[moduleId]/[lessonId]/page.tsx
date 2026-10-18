'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Construction, Terminal } from 'lucide-react';
import { getJavaModule, getJavaLesson, MODULES_CATALOG_JAVA } from '@/data/java/curriculum';
import { JavaLessonView } from '@/components/java/JavaLessonView';
import { logStudyTime } from '@/lib/storage';

interface JavaLessonPageProps {
  params: { moduleId: string; lessonId: string };
}

export default function JavaLessonPage({ params }: JavaLessonPageProps) {
  const { moduleId, lessonId } = params;
  const mod = getJavaModule(moduleId);
  const lesson = getJavaLesson(lessonId);

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
          The module &ldquo;{moduleId}&rdquo; does not exist in the Java curriculum.
        </p>
        <Link
          href="/java"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Java Mastery Lab
        </Link>
      </div>
    );
  }

  const lessons = mod.lessons;
  const currentIdx = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

  const allIds = MODULES_CATALOG_JAVA.map((m) => m.id);
  const modIdx = allIds.indexOf(moduleId);
  const nextMod = modIdx < allIds.length - 1 ? MODULES_CATALOG_JAVA[modIdx + 1] : null;

  const lessonSummary = lessons.find((l) => l.id === lessonId);

  if (!lessonSummary) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Lesson Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400">
          The lesson &ldquo;{lessonId}&rdquo; does not exist in Module {mod.number}.
        </p>
        <Link
          href={`/java/${moduleId}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {mod.title}
        </Link>
      </div>
    );
  }

  if (lesson) {
    return <JavaLessonView lesson={lesson} />;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Lesson Initializing</h1>
      <p className="text-slate-500 dark:text-slate-400">
        Loading lesson data for &ldquo;{lessonSummary.title}&rdquo;...
      </p>
    </div>
  );
}
