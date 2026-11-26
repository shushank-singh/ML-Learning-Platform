import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getPythonModule } from '@/data/catalogs/python';
import { loadPythonLessonFast } from '@/data/python/loader';
import { PythonLessonView } from '@/components/python/PythonLessonView';
import { checkLessonAccessServer } from '@/lib/entitlements/server';
import { LockedLessonView } from '@/components/entitlements/LockedLessonView';

interface PythonLessonPageProps {
  params: { moduleId: string; lessonId: string };
}

export default async function PythonLessonPage({ params }: PythonLessonPageProps) {
  const { moduleId, lessonId } = params;

  // 1. Authoritative Server-Side Entitlement & Access Check
  const access = await checkLessonAccessServer(moduleId, lessonId);

  if (!access.allowed && access.reason === 'unauthenticated') {
    redirect(`/login?redirectTo=/python/${encodeURIComponent(moduleId)}/${encodeURIComponent(lessonId)}`);
  }

  const mod = getPythonModule(moduleId);

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

  // If unauthorized: NEVER return or serialize the restricted lesson content!
  if (!access.allowed) {
    const lessonSummary = mod.lessons.find((l) => l.id === lessonId);
    return (
      <LockedLessonView
        moduleId={moduleId}
        lessonId={lessonId}
        moduleTitle={mod.title}
        lessonTitle={lessonSummary?.title}
        trackTitle="Python Mastery Lab"
      />
    );
  }

  const lesson = await loadPythonLessonFast(moduleId, lessonId);
  const lessonSummary = mod.lessons.find((l) => l.id === lessonId);

  if (!lesson || !lessonSummary) {
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

  return <PythonLessonView lesson={lesson} />;
}
