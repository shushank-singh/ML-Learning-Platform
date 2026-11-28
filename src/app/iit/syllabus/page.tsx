'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  AlertCircle,
  Layers,
  Clock,
  Sparkles,
} from 'lucide-react';
import { IIT_CHAPTERS, IIT_COURSE_META, IIT_UNITS } from '@/data/iit';
import { getIITProgress, toggleIITChapterBookmark } from '@/lib/iit/progress';
import {
  IITChemistryBranch,
  IITClassLevel,
  IITExamApplicability,
  IITSubjectId,
  IITUserProgress,
} from '@/types/iit';

const SUBJECT_BADGE: Record<IITSubjectId, string> = {
  physics: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  chemistry: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  mathematics: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
};

const EXAM_BADGE: Record<IITExamApplicability, { label: string; cls: string }> = {
  main_and_advanced: {
    label: 'JEE Main & Advanced',
    cls: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
  jee_main_only: {
    label: 'JEE Main Only',
    cls: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  },
  jee_advanced_only: {
    label: 'JEE Advanced Only',
    cls: 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
  },
};

function IITSyllabusExplorerInner() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams?.get('subject');

  const [subject, setSubject] = useState<'all' | IITSubjectId>(
    initialSubject === 'physics' || initialSubject === 'chemistry' || initialSubject === 'mathematics'
      ? initialSubject
      : 'all'
  );
  const [classLevel, setClassLevel] = useState<'all' | IITClassLevel>('all');
  const [branch, setBranch] = useState<'all' | IITChemistryBranch>('all');
  const [examFilter, setExamFilter] = useState<'all' | IITExamApplicability>('all');
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState<IITUserProgress | null>(null);

  useEffect(() => {
    const sync = () => setProgress(getIITProgress());
    sync();
    window.addEventListener('iit_progress_updated', sync);
    return () => window.removeEventListener('iit_progress_updated', sync);
  }, []);

  useEffect(() => {
    if (
      initialSubject === 'physics' ||
      initialSubject === 'chemistry' ||
      initialSubject === 'mathematics'
    ) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  const filteredChapters = useMemo(() => {
    const q = query.trim().toLowerCase();
    return IIT_CHAPTERS.filter((ch) => {
      if (subject !== 'all' && ch.subject !== subject) return false;
      if (classLevel !== 'all' && ch.classLevel !== classLevel) return false;
      if (subject === 'chemistry' && branch !== 'all' && ch.branch !== branch) return false;
      if (examFilter !== 'all' && ch.examApplicability !== examFilter) return false;
      if (!q) return true;
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.subtitle.toLowerCase().includes(q) ||
        ch.topics.some((t) => t.title.toLowerCase().includes(q))
      );
    });
  }, [subject, classLevel, branch, examFilter, query]);

  const groupedUnits = useMemo(() => {
    return IIT_UNITS.map((unit) => ({
      unit,
      chapters: filteredChapters.filter((ch) => ch.unitId === unit.id),
    })).filter((g) => g.chapters.length > 0);
  }, [filteredChapters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-amber-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{IIT_COURSE_META.syllabusSource}</span>
          </div>
          <Link
            href="/iit/ai-tutor"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask IIT AI Tutor</span>
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Course → Subject → Class → Unit → Chapter → Topic → Lesson
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Showing {filteredChapters.length} of {IIT_CHAPTERS.length} official chapters across Class 11 &amp; 12 Physics, Chemistry, and Mathematics, with explicit JEE Main vs JEE Advanced syllabus boundaries.
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-2">
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chapter or topic (e.g., Rotational, Aldol, King's rule)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value as 'all' | IITSubjectId);
              if (e.target.value !== 'chemistry') setBranch('all');
            }}
            aria-label="Filter by subject"
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Subjects ({IIT_CHAPTERS.length})</option>
            <option value="physics">Physics (31)</option>
            <option value="chemistry">Chemistry (29)</option>
            <option value="mathematics">Mathematics (22)</option>
          </select>

          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value as 'all' | IITClassLevel)}
            aria-label="Filter by class"
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">Class 11 &amp; 12</option>
            <option value="11">Class 11 Only</option>
            <option value="12">Class 12 Only</option>
          </select>

          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value as 'all' | IITExamApplicability)}
            aria-label="Filter by exam applicability"
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Exam Scopes</option>
            <option value="main_and_advanced">JEE Main &amp; Advanced</option>
            <option value="jee_main_only">JEE Main Only</option>
            <option value="jee_advanced_only">JEE Advanced Only</option>
          </select>
        </div>

        {subject === 'chemistry' && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(['all', 'physical', 'organic', 'inorganic'] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBranch(b)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  branch === b
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {b === 'all' ? 'All Chemistry Branches' : `${b} Chemistry`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grouped Units -> Chapters */}
      {groupedUnits.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center text-xs text-slate-500">
          No chapters matched your filters. Try resetting the search or exam filter.
        </div>
      ) : (
        <div className="space-y-8">
          {groupedUnits.map(({ unit, chapters }) => (
            <section key={unit.id} className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-500" />
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      {unit.title}
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Class {unit.classLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{unit.description}</p>
                </div>
                <span className="text-xs font-mono text-slate-500">{chapters.length} chapters</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chapters.map((ch) => {
                  const isDone = Boolean(progress?.completedChapters?.[ch.id]);
                  const isBookmarked = progress?.bookmarkedChapterIds?.includes(ch.id);
                  const examMeta = EXAM_BADGE[ch.examApplicability];

                  return (
                    <div
                      key={ch.id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between gap-4 hover:border-amber-500/70 transition-colors shadow-xs"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                            <span className={`px-2 py-0.5 rounded-full border font-bold capitalize ${SUBJECT_BADGE[ch.subject]}`}>
                              {ch.subject}
                              {ch.branch ? ` · ${ch.branch}` : ''}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full border font-semibold ${examMeta.cls}`}>
                              {examMeta.label}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleIITChapterBookmark(ch.id)}
                            aria-label="Bookmark chapter"
                            className={`p-1 rounded-lg ${
                              isBookmarked
                                ? 'text-amber-500'
                                : 'text-slate-400 hover:text-amber-500'
                            }`}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>

                        <Link href={`/iit/chapters/${ch.id}`} className="block group space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {ch.title}
                            </h3>
                            {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                            {ch.subtitle}
                          </p>
                        </Link>

                        {ch.excludedFromJeeMain && ch.excludedFromJeeMain.length > 0 && (
                          <div className="p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-[10px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{ch.excludedFromJeeMain[0]}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {ch.estimatedHours}h · {ch.weightage}
                        </span>
                        <Link
                          href={`/iit/chapters/${ch.id}`}
                          className="font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1 hover:underline"
                        >
                          <span>Study Chapter</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default function IITSyllabusPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-xs text-slate-500">
          Loading JEE Syllabus Explorer...
        </div>
      }
    >
      <IITSyllabusExplorerInner />
    </Suspense>
  );
}
