import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getDSAModule, getDSALesson } from '@/data/dsa/curriculum';
import { DSALessonView } from '@/components/dsa/DSALessonView';
import { checkLessonAccessServer } from '@/lib/entitlements/server';
import { LockedLessonView } from '@/components/entitlements/LockedLessonView';

interface DSALessonPageProps {
  params: { moduleId: string; lessonId: string };
}

export default async function DSALessonPage({ params }: DSALessonPageProps) {
  const { moduleId, lessonId } = params;

  // 1. Authoritative Server-Side Entitlement & Access Check
  const access = await checkLessonAccessServer(moduleId, lessonId);

  if (!access.allowed && access.reason === 'unauthenticated') {
    redirect(`/login?redirectTo=/dsa/${encodeURIComponent(moduleId)}/${encodeURIComponent(lessonId)}`);
  }

  const mod = getDSAModule(moduleId);

  if (!mod) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Module Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400">
          The module &ldquo;{moduleId}&rdquo; does not exist in the DSA curriculum.
        </p>
        <Link href="/dsa" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to DSA Mastery Lab
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
        trackTitle="DSA Mastery Lab"
      />
    );
  }

  const lesson = getDSALesson(lessonId);
  const lessonSummary = mod.lessons.find((l) => l.id === lessonId);

  if (!lesson || !lessonSummary) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Lesson Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400">
          The lesson &ldquo;{lessonId}&rdquo; does not exist in Module {mod.number}.
        </p>
        <Link href={`/dsa/${moduleId}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to {mod.title}
        </Link>
      </div>
    );
  }

  return <DSALessonView lesson={lesson} />;
}
