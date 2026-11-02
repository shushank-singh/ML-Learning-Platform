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
import {
  MLIllustration,
  DLIllustration,
  TransformersIllustration,
  GenAIIllustration,
  RAGIllustration,
  AgentsIllustration,
  MLOpsIllustration,
  DeploymentIllustration,
  Phase0Illustration,
} from '@/components/shared/TrackIllustrations';

export default function ModuleOverviewPage() {
  const params = useParams();
  const moduleId = params?.moduleId as string;
  const mod = getModule(moduleId);

  if (!mod) {
    return (
      <div className="p-8 sm:p-12 max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto shadow-sm">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Module Not Found
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            The requested module identifier <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-800 dark:text-slate-200">{moduleId}</code> does not match any active curriculum module in the registry.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Full Curriculum</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <span>Platform Home</span>
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

  const progress = getProgress();

  const getModuleIllustration = () => {
    const id = moduleId.toLowerCase();
    if (id.startsWith('phase-0')) return <Phase0Illustration className="w-full h-full object-cover" />;
    if (id.startsWith('tf-')) return <TransformersIllustration className="w-full h-full object-cover" />;
    if (id.startsWith('genai-')) return <GenAIIllustration className="w-full h-full object-cover" />;
    if (id.startsWith('rag-')) return <RAGIllustration className="w-full h-full object-cover" />;
    if (id.startsWith('agent-')) return <AgentsIllustration className="w-full h-full object-cover" />;
    if (id.startsWith('mlops-')) return <MLOpsIllustration className="w-full h-full object-cover" />;
    if (id.startsWith('deployment-')) return <DeploymentIllustration className="w-full h-full object-cover" />;
    if (id.startsWith('dl-') || id === 'module-9') return <DLIllustration className="w-full h-full object-cover" />;
    return <MLIllustration className="w-full h-full object-cover" />;
  };

  const completedCount = mod.lessons.filter((l) => Boolean(progress.completedLessons[l.id])).length;
  const completionPct = Math.round((completedCount / (mod.lessons.length || 1)) * 100);

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
      <div className="rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white to-slate-100/90 dark:from-indigo-950/80 dark:via-slate-900 dark:to-slate-950 border border-indigo-200/90 dark:border-indigo-900/40 p-6 sm:p-8 text-slate-900 dark:text-white shadow-sm dark:shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-400/30">
                {mod.badge}
              </span>
              <span className="text-xs text-slate-500 dark:text-indigo-200/70 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {mod.estimatedHours} Hours of In-Depth Instruction
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {completedCount} / {mod.lessons.length} Completed ({completionPct}%)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Module {mod.number}: {mod.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-indigo-100/80 font-normal leading-relaxed">
              {mod.description}
            </p>

            <div className="pt-2 flex items-center gap-3">
              {mod.lessons.length > 0 && (
                <Link
                  href={`/curriculum/${mod.id}/${mod.lessons[0].id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-600/25"
                >
                  <span>Start Module Lessons</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Module Vector Illustration */}
          <div className="w-full md:w-64 lg:w-72 h-40 shrink-0 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md">
            {getModuleIllustration()}
          </div>
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
