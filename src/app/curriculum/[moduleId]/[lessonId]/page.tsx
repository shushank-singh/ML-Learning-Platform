import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BookOpen, ArrowLeft, AlertCircle } from 'lucide-react';
import { getModule } from '@/data/catalogs/ml';
import { loadLessonFast } from '@/data/modules/loader';
import { LessonView } from '@/components/lessons/LessonView';
import { checkLessonAccessServer } from '@/lib/entitlements/server';
import { LockedLessonView } from '@/components/entitlements/LockedLessonView';

interface LessonDetailPageProps {
  params: { moduleId: string; lessonId: string };
}

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  const { moduleId, lessonId } = params;

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

  // 1. Authoritative Server-Side Entitlement & Access Check
  const access = await checkLessonAccessServer(moduleId, lessonId);

  // If unauthenticated, redirect to login with return destination
  if (!access.allowed && access.reason === 'unauthenticated') {
    redirect(`/login?redirectTo=/curriculum/${encodeURIComponent(moduleId)}/${encodeURIComponent(lessonId)}`);
  }

  const mod = getModule(moduleId);

  // If unauthorized: NEVER return or serialize the restricted lesson content!
  if (!access.allowed) {
    const lessonSummary = mod?.lessons.find((l) => l.id === lessonId);
    return (
      <LockedLessonView
        moduleId={moduleId}
        lessonId={lessonId}
        moduleTitle={mod?.title}
        lessonTitle={lessonSummary?.title}
      />
    );
  }

  // 2. Fetch ONLY the requested module's lesson content when access is verified
  const lesson = await loadLessonFast(moduleId, lessonId);

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

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-500">
          <Link href="/python" className="hover:text-indigo-600 transition-colors">Python Lab</Link>
          <span>·</span>
          <Link href="/dsa" className="hover:text-indigo-600 transition-colors">DSA Lab</Link>
          <span>·</span>
          <Link href="/java" className="hover:text-indigo-600 transition-colors">Java Lab</Link>
          <span>·</span>
          <Link href="/projects" className="hover:text-indigo-600 transition-colors">Projects</Link>
        </div>
      </div>
    );
  }

  return <LessonView lesson={lesson} />;
}
