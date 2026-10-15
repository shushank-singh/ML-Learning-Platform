'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Search,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { MASTER_FORMULAS } from '@/data/formulas/formulas';
import { MathBlock, MathInline } from '@/components/math/Math';

export default function FormulasPage() {
  const [query, setQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Linear Algebra',
    'Calculus',
    'Probability & Stats',
    'Loss Functions',
    'Optimization',
    'Metrics',
  ];

  const filtered = useMemo(() => {
    return MASTER_FORMULAS.filter((f) => {
      const matchCat =
        selectedCategory === 'All' || f.category === selectedCategory;
      const matchQuery =
        !query.trim() ||
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.description.toLowerCase().includes(query.toLowerCase()) ||
        f.latex.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, query]);

  const copyLatex = (id: string, latex: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-xs font-semibold">
          <Calculator className="w-4 h-4" />
          <span>Interactive Mathematical Reference</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Mathematical Formula Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Searchable catalog of core machine learning equations rendered in KaTeX. Every formula includes variable definitions, geometric intuitions, and derivation proofs.
        </p>

        {/* Search Bar & Categories */}
        <div className="pt-2 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search equations (e.g. Normal Equation, Cross-Entropy, Eigendecomposition)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((formula) => (
          <div
            key={formula.id}
            id={formula.id}
            className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {formula.category}
                </span>
                <button
                  onClick={() => copyLatex(formula.id, formula.latex)}
                  className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title="Copy LaTeX String"
                >
                  {copiedId === formula.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                {formula.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {formula.description}
              </p>

              {/* KaTeX Equation Display */}
              <div className="my-4">
                <MathBlock math={formula.latex} />
              </div>

              {/* Variable Dictionary */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                  Symbol Definitions:
                </span>
                <div className="space-y-1 text-xs">
                  {formula.variables.map((v, i) => (
                    <div key={i} className="flex items-baseline gap-2">
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 shrink-0 font-bold">
                        <MathInline math={v.symbol} />:
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight">
                        {v.explanation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Derivation Notes */}
              <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Mathematical Insight: </span>
                {formula.derivationNotes}
              </div>
            </div>

            {/* Bottom link to curriculum */}
            {formula.relatedLessonId && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Link
                  href={`/curriculum/${formula.relatedModuleId || 'module-3'}/${formula.relatedLessonId}`}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore in Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
