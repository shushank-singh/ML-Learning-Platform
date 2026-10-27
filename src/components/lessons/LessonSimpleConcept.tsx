'use client';

import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Hash,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';

interface LessonSimpleConceptProps {
  lesson: LessonContent;
}

export const LessonSimpleConcept: React.FC<LessonSimpleConceptProps> = ({ lesson }) => {
  const { problemSolved, intuition, numericalExample, variables } = lesson;

  // Key terms extracted from variables and intuition
  const glossary = variables.slice(0, 4).map((v) => ({
    term: v.name,
    symbol: v.symbol,
    meaning: v.description,
  }));

  // When to use vs When not to use
  const whenToUse = [
    `When you need an interpretable, mathematically sound baseline for ${lesson.title.split(':')[0].toLowerCase()}`,
    'When training time and computational resources need to remain predictable and low',
    'When explaining decision logic to business stakeholders or auditing regulators',
  ];

  const whenNotToUse = [
    'When the relationship between features and target violates the core structural assumptions of this model',
    'When massive uncurated raw datasets (like unstructured images or audio) benefit far more from deep convolutional or transformer representations',
    'When features exhibit extreme multicollinearity or unhandled missing values that distort weight stability',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5">
        <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <BookOpen className="w-5 h-5" />
        </span>
        <div>
          <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
            Section C · Plain English
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Concept Explained in Simple English
          </h2>
        </div>
      </div>

      {/* Clear Definition & Problem Solved */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            What is {lesson.title.split(':')[0]}?
          </h3>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {intuition.overview}
          </p>
        </div>

        {/* Why Do We Need It? */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>Why Do We Need It?</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {problemSolved.description}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {problemSolved.keyPoints.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Beginner Glossary Table */}
      {glossary.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Hash className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Essential Terminology in Simple Words
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Before jumping into formulas, here are the everyday terms you need to know:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {glossary.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-slate-100">
                  <span>{item.term}</span>
                  <code className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">
                    {item.symbol}
                  </code>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Small Concrete Numerical Walkthrough Preview */}
      {numericalExample && numericalExample.scenario && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/20 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Concrete Small Example Scenario</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Real Values
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {numericalExample.scenario}
          </p>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">Hand Calculation Result: </span>
            <span>{numericalExample.finalConclusion}</span>
          </div>
        </div>
      )}

      {/* Decision Guide: When to Use vs When Not to Use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* When to use */}
        <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>When To Use This Algorithm</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {whenToUse.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* When NOT to use */}
        <div className="p-5 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>When Another Model Is Better</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {whenNotToUse.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
