'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Calculator, Search, Copy, Check, ArrowRight } from 'lucide-react';
import { ALL_IIT_FORMULAS, IIT_CHAPTERS_BY_ID } from '@/data/iit';
import { MathBlock } from '@/components/math/Math';
import { IITMarkdownMath } from '@/components/iit/IITMarkdownMath';
import { IITClassLevel, IITExamType, IITSubjectId } from '@/types/iit';

export default function IITFormulasPage() {
  const [subject, setSubject] = useState<'all' | IITSubjectId>('all');
  const [classLevel, setClassLevel] = useState<'all' | IITClassLevel>('all');
  const [examFilter, setExamFilter] = useState<'all' | IITExamType>('all');
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_IIT_FORMULAS.filter((f) => {
      if (subject !== 'all' && f.subject !== subject) return false;
      if (classLevel !== 'all' && f.classLevel !== classLevel) return false;
      if (examFilter !== 'all' && !f.examTags.includes(examFilter)) return false;
      if (!q) return true;
      const ch = IIT_CHAPTERS_BY_ID[f.chapterId];
      return (
        f.title.toLowerCase().includes(q) ||
        f.variables.toLowerCase().includes(q) ||
        (ch && ch.title.toLowerCase().includes(q))
      );
    });
  }, [subject, classLevel, examFilter, query]);

  const handleCopy = (id: string, latex: string) => {
    navigator.clipboard?.writeText(latex).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold">
          <Calculator className="w-3.5 h-3.5" />
          <span>KaTeX Formula Sheets · Physics, Chemistry &amp; Mathematics</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          IIT JEE Formula Vault ({filtered.length} Equations)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search formula, chapter, symbol..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as 'all' | IITSubjectId)}
            aria-label="Filter formulas by subject"
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
          >
            <option value="all">All Subjects</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="mathematics">Mathematics</option>
          </select>

          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value as 'all' | IITClassLevel)}
            aria-label="Filter formulas by class"
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
          >
            <option value="all">Class 11 &amp; 12</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>

          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value as 'all' | IITExamType)}
            aria-label="Filter formulas by exam"
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
          >
            <option value="all">JEE Main &amp; Advanced</option>
            <option value="JEE Main">JEE Main</option>
            <option value="JEE Advanced">JEE Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((f) => {
          const ch = IIT_CHAPTERS_BY_ID[f.chapterId];
          return (
            <div
              key={f.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {f.subject} · Class {f.classLevel}
                  </span>
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">{f.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(f.id, f.latex)}
                  title="Copy LaTeX"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                >
                  {copiedId === f.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === f.id ? 'Copied' : 'LaTeX'}</span>
                </button>
              </div>

              <MathBlock math={f.latex} />

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>
                  <IITMarkdownMath content={f.variables} />
                </span>
                {ch && (
                  <Link
                    href={`/iit/chapters/${ch.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline shrink-0"
                  >
                    <span>{ch.title}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
