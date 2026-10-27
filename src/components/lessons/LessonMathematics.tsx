'use client';

import React, { useState } from 'react';
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  Layers,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Table,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';
import { MathBlock, MathInline } from '../math/Math';

interface LessonMathematicsProps {
  lesson: LessonContent;
}

export const LessonMathematics: React.FC<LessonMathematicsProps> = ({ lesson }) => {
  const { mathematics, derivation, variables, numericalExample } = lesson;
  const [showDerivation, setShowDerivation] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Calculator className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Section F · Rigorous Intuition
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Mathematical Intuition & Hand Calculation
            </h2>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
          From Simple Intuition to Formal Equation
        </span>
      </div>

      {/* Overview Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {mathematics.overview}
        </p>

        {/* Essential Formulas */}
        <div className="space-y-4 pt-2">
          {mathematics.foundations.map((found, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Formula {idx + 1}: {found.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Mathematical Definition
                </span>
              </div>
              <div className="py-2 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-x-auto text-center">
                <MathBlock math={found.latex} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-semibold text-slate-800 dark:text-slate-200">What this calculates: </span>
                {found.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Formula Variable Reference Table */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
            <Table className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Symbol-by-Symbol Variable Reference
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Every mathematical symbol unpacked in plain English so nothing feels mysterious:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3 font-semibold">Symbol</th>
                <th className="p-3 font-semibold">Variable Name</th>
                <th className="p-3 font-semibold">Vector Space / Dimensions</th>
                <th className="p-3 font-semibold">Plain-English Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              {variables.map((v, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    <MathInline math={v.symbol} />
                  </td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-200">
                    {v.name}
                  </td>
                  <td className="p-3 font-mono text-slate-500">
                    {v.dimensions || 'Scalar (Dimensionless)'}
                  </td>
                  <td className="p-3 leading-relaxed">
                    {v.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Small Numerical Hand Calculation Example */}
      {numericalExample && numericalExample.calculations && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Calculator className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Hand Numerical Example Solved Step-by-Step
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
              Verifiable Math
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-slate-100">Scenario: </span>
            {numericalExample.scenario}
          </p>

          {/* Mini Dataset Table if available */}
          {numericalExample.dataset && numericalExample.dataset.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-center text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {Object.keys(numericalExample.dataset[0] || {}).map((col) => (
                      <th key={col} className="p-2 font-mono font-semibold uppercase">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                  {numericalExample.dataset.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} className="p-2">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Hand Calculation Steps */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider block">
              Step-by-Step Substitution:
            </span>
            {numericalExample.calculations.map((calc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">
                    Step {idx + 1}: {calc.step}
                  </span>
                  <div className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    <MathInline math={calc.math} />
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 self-start sm:self-auto shrink-0 shadow-sm">
                  {calc.result}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
            <span className="font-bold">Interpretation of Final Result: </span>
            {numericalExample.finalConclusion}
          </div>
        </div>
      )}

      {/* Collapsible Mathematical Derivation Drawer */}
      {derivation && derivation.steps && derivation.steps.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowDerivation(!showDerivation)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Layers className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>Step-by-Step Mathematical Derivation</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 font-semibold">
                    Optional Deep Dive ({derivation.steps.length} Steps)
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Objective: {derivation.objective}
                </p>
              </div>
            </div>
            <div className="text-slate-400 p-1">
              {showDerivation ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {showDerivation && (
            <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-4">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {derivation.title}
              </div>

              <div className="space-y-3">
                {derivation.steps.map((st) => (
                  <div
                    key={st.step}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center font-mono text-[10px] border border-indigo-200 dark:border-indigo-800">
                        {st.step}
                      </span>
                      <span>{st.label}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 overflow-x-auto text-center">
                      <MathBlock math={st.latex} />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {st.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
