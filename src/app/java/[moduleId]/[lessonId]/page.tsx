import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getJavaModule, getJavaLesson } from '@/data/java/curriculum';
import { JavaLessonView } from '@/components/java/JavaLessonView';
import { checkLessonAccessServer } from '@/lib/entitlements/server';
import { LockedLessonView } from '@/components/entitlements/LockedLessonView';

interface JavaLessonPageProps {
  params: { moduleId: string; lessonId: string };
}

export default async function JavaLessonPage({ params }: JavaLessonPageProps) {
  const { moduleId, lessonId } = params;

  // 1. Authoritative Server-Side Entitlement & Access Check
  const access = await checkLessonAccessServer(moduleId, lessonId);

  if (!access.allowed && access.reason === 'unauthenticated') {
    redirect(`/login?redirectTo=/java/${encodeURIComponent(moduleId)}/${encodeURIComponent(lessonId)}`);
  }

  const mod = getJavaModule(moduleId);

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

  // If unauthorized: NEVER return or serialize the restricted lesson content!
  if (!access.allowed) {
    const lessonSummary = mod.lessons.find((l) => l.id === lessonId);
    return (
      <LockedLessonView
        moduleId={moduleId}
        lessonId={lessonId}
        moduleTitle={mod.title}
        lessonTitle={lessonSummary?.title}
        trackTitle="Java Mastery Lab"
      />
    );
  }

  const lesson = getJavaLesson(lessonId);
  const lessonSummary = mod.lessons.find((l) => l.id === lessonId);

  if (!lesson || !lessonSummary) {
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

  return <JavaLessonView lesson={lesson} />;
}
