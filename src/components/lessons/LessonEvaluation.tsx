'use client';

import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BarChart3,
  ShieldAlert,
  Sliders,
  Scale,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';

interface LessonEvaluationProps {
  lesson: LessonContent;
}

export const LessonEvaluation: React.FC<LessonEvaluationProps> = ({ lesson }) => {
  const { assumptions, commonMistakes, hyperparameters, title, moduleId } = lesson;

  // Comparison Matrix of Advantages vs Limitations
  const advantages = [
    `High interpretability: the learned parameters directly quantify feature importance and direction`,
    `Extremely fast inference time with minimal memory footprint in production environments`,
    `Analytically well-understood mathematical guarantees with closed-form solutions or convex loss landscapes`,
    `Serves as a robust, reproducible benchmark before deploying complex non-linear architectures`,
  ];

  const limitations = [
    `Sensitive to unhandled feature collinearity, severe outliers, and scale differences`,
    `Incapable of capturing high-order non-linear interactions without manual feature engineering or kernels`,
    `Requires rigorous verification of underlying distributional and residual assumptions to prevent false conclusions`,
  ];

  return (
    <div className="space-y-8">
      {/* ========================================================================= */}
      {/* SECTION J: Assumptions, Advantages, Limitations & Pitfalls */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Scale className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                Section J · Practical Considerations
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Assumptions, Advantages, Limitations & Common Traps
              </h2>
            </div>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
            Engineering Tradeoffs
          </span>
        </div>

        {/* Assumptions Checklist */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Core Theoretical Assumptions & How to Verify Them
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            If these assumptions are violated, model estimates and confidence intervals can be severely distorted:
          </p>

          <div className="space-y-3">
            {assumptions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs space-y-2.5"
              >
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>Assumption {idx + 1}: {item.assumption}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300 border border-rose-100 dark:border-rose-900/40">
                    <span className="font-bold block mb-1">Why It Matters:</span>
                    <span className="leading-relaxed">{item.whyItMatters}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-100/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold block mb-1">How to Test & Verify in Code:</span>
                    <span className="leading-relaxed">{item.howToVerify}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages vs Limitations Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Advantages</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {advantages.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Key Limitations</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {limitations.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common Pitfalls & Traps with Bad vs Good Examples */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Common Implementation Mistakes & Interview Traps
            </h3>
          </div>

          <div className="space-y-3">
            {commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10 text-xs space-y-2.5"
              >
                <div className="font-bold text-amber-900 dark:text-amber-300 text-sm flex items-center gap-2">
                  <span>⚠️ Pitfall {idx + 1}: {mistake.mistake}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Correct Engineering Fix: </span>
                  {mistake.solution}
                </p>
                {mistake.codeExample && (
                  <pre className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                    {mistake.codeExample}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hyperparameters Tuning Matrix */}
        {hyperparameters && hyperparameters.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Sliders className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Hyperparameters Tuning Guide
              </h3>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3 font-semibold">Parameter</th>
                    <th className="p-3 font-semibold">Default</th>
                    <th className="p-3 font-semibold">Tuning Range</th>
                    <th className="p-3 font-semibold">Effect on Model Complexity</th>
                    <th className="p-3 font-semibold">Author Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  {hyperparameters.map((hp, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {hp.name}
                      </td>
                      <td className="p-3 font-mono text-slate-500">{hp.defaultVal}</td>
                      <td className="p-3 font-mono text-slate-500">{hp.range}</td>
                      <td className="p-3 leading-relaxed">{hp.effect}</td>
                      <td className="p-3 font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                        {hp.recommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION K: Model Evaluation and Interpretation */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                Section K · Validation & Metrics
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Model Evaluation & Interpretation
              </h2>
            </div>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
            Preventing Leakage
          </span>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Appropriate Evaluation Metrics & Anti-Leakage Protocol
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                1. Split Strategy
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Always fit preprocessing scalers, imputers, and encoders strictly on the training partition only. Transforming test data with train parameters avoids data snooping bias.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                2. Metric Selection
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Never evaluate imbalanced datasets using Accuracy alone. Prefer PR-AUC or F1 with macro-averaging, and pair MSE with MAE to detect outlier impact.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                3. Cross-Validation
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Use 5-Fold or 10-Fold Stratified Cross-Validation inside a Scikit-Learn Pipeline so every fold executes isolated preprocessing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
