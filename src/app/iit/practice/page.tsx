'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { CheckSquare, Search, Bookmark } from 'lucide-react';
import { ALL_IIT_QUESTIONS, IIT_CHAPTERS_BY_ID } from '@/data/iit';
import { IITQuestionCard } from '@/components/iit/IITQuestionCard';
import { IITTopicTutorWidget } from '@/components/iit/IITTopicTutorWidget';
import { getIITProgress } from '@/lib/iit/progress';
import { IITDifficulty, IITExamType, IITQuestionType, IITSubjectId, IITUserProgress } from '@/types/iit';

export default function IITPracticePage() {
  const [subject, setSubject] = useState<'all' | IITSubjectId>('all');
  const [exam, setExam] = useState<'all' | IITExamType>('all');
  const [qType, setQType] = useState<'all' | IITQuestionType>('all');
  const [difficulty, setDifficulty] = useState<'all' | IITDifficulty>('all');
  const [pyqOnly, setPyqOnly] = useState(false);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState<IITUserProgress | null>(null);

  useEffect(() => {
    const sync = () => setProgress(getIITProgress());
    sync();
    window.addEventListener('iit_progress_updated', sync);
    return () => window.removeEventListener('iit_progress_updated', sync);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_IIT_QUESTIONS.filter((item) => {
      if (subject !== 'all' && item.subject !== subject) return false;
      if (exam !== 'all' && item.exam !== exam) return false;
      if (qType !== 'all' && item.type !== qType) return false;
      if (difficulty !== 'all' && item.difficulty !== difficulty) return false;
      if (pyqOnly && !item.isPyq) return false;
      if (bookmarkedOnly && !progress?.bookmarkedQuestionIds?.includes(item.id)) return false;
      if (!q) return true;
      const ch = IIT_CHAPTERS_BY_ID[item.chapterId];
      return (
        item.stem.toLowerCase().includes(q) ||
        (ch && ch.title.toLowerCase().includes(q)) ||
        (item.pyqYear && item.pyqYear.toLowerCase().includes(q))
      );
    });
  }, [subject, exam, qType, difficulty, pyqOnly, bookmarkedOnly, query, progress]);

  const totalAttempts = progress?.attempts?.length || 0;
  const totalCorrect = progress?.attempts?.filter((a) => a.isCorrect).length || 0;
  const accPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>JEE Main &amp; JEE Advanced Question Bank + PYQs</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono">
            Recorded Accuracy:{' '}
            <strong className="text-amber-600 dark:text-amber-400">
              {accPct !== null ? `${accPct}% (${totalCorrect}/${totalAttempts})` : '—'}
            </strong>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Practice Problems &amp; Previous-Year Questions ({filtered.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problem text, chapter, or year..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
            />
          </div>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as 'all' | IITSubjectId)}
            aria-label="Filter questions by subject"
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
          >
            <option value="all">All Subjects</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="mathematics">Mathematics</option>
          </select>

          <select
            value={exam}
            onChange={(e) => setExam(e.target.value as 'all' | IITExamType)}
            aria-label="Filter questions by exam"
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
          >
            <option value="all">Main &amp; Advanced</option>
            <option value="JEE Main">JEE Main</option>
            <option value="JEE Advanced">JEE Advanced</option>
          </select>

          <select
            value={qType}
            onChange={(e) => setQType(e.target.value as 'all' | IITQuestionType)}
            aria-label="Filter questions by type"
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
          >
            <option value="all">All Question Types</option>
            <option value="scq">Single Choice (SCQ)</option>
            <option value="mcq_multi">Multiple Correct</option>
            <option value="numerical">Numerical / Integer</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {(['all', 'Easy', 'Moderate', 'Advanced'] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                difficulty === d
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {d === 'all' ? 'All Difficulties' : d}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPyqOnly((p) => !p)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
              pyqOnly
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            PYQs Only
          </button>

          <button
            type="button"
            onClick={() => setBookmarkedOnly((p) => !p)}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold border ${
              bookmarkedOnly
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>Bookmarked ({progress?.bookmarkedQuestionIds?.length || 0})</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center text-xs text-slate-500">
          No questions match the selected filters.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q, idx) => (
            <IITQuestionCard
              key={q.id}
              question={q}
              index={idx}
              isBookmarked={progress?.bookmarkedQuestionIds?.includes(q.id)}
            />
          ))}
        </div>
      )}

      <IITTopicTutorWidget
        chapterId="iit-practice-bank"
        subject={subject === 'all' ? 'physics' : subject}
        chapterTitle="IIT JEE PYQ & Practice Bank"
      />
    </div>
  );
}

