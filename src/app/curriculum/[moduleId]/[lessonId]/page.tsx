'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, ArrowLeft, AlertCircle } from 'lucide-react';
import { getLesson, getModule } from '@/data/modules/curriculum';
import { LessonView } from '@/components/lessons/LessonView';

export default function LessonDetailPage() {
  const params = useParams();
  const moduleId = params?.moduleId as string;
  const lessonId = params?.lessonId as string;

  if (!moduleId || !lessonId) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Invalid Lesson Parameters
        </h1>
        <p className="text-xs text-slate-500">
          Please check the URL parameters and return to the curriculum.
        </p>
        <Link
          href="/curriculum"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Curriculum</span>
        </Link>
      </div>
    );
  }

  const lesson = getLesson(moduleId, lessonId);
  const mod = getModule(moduleId);

  if (!lesson) {
    return (
      <div className="p-12 max-w-xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Topic Not Found
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The requested lesson <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-800 dark:text-slate-200">{lessonId}</code> was not found in{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200">{mod ? mod.title : moduleId}</span>.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href={`/curriculum/${moduleId}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <span>View {mod?.title || 'Module'}</span>
          </Link>
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Full Syllabus</span>
          </Link>
        </div>
      </div>
    );
  }

  return <LessonView lesson={lesson} />;
}
