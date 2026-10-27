'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  CheckSquare,
  Square,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calculator,
  AlertTriangle,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';
import { MathBlock, MathInline } from '../math/Math';

interface LessonCheatSheetProps {
  lesson: LessonContent;
}

export const LessonCheatSheet: React.FC<LessonCheatSheetProps> = ({ lesson }) => {
  const { summary, analogy, mathematics, variables, commonMistakes, title, moduleId } = lesson;

  // Self-assessment checklist items
  const checklistItems = [
    `I can explain the core intuition of ${title.split(':')[0]} using the ${analogy.title} analogy.`,
    'I understand the difference between the model parameters and hyperparameters.',
    'I can write the mathematical hypothesis and objective loss function from memory.',
    'I know which assumptions must be verified on training data before trusting predictions.',
    'I can implement this pipeline in Python using both NumPy and Scikit-Learn.',
  ];

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <FileText className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
              Section M · Quick Review
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              60-Second Revision Notes & Cheat Sheet
            </h2>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
          Exam & Interview Ready
        </span>
      </div>

      {/* Main Revision Sheet Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-900/60 shadow-sm space-y-6">
        {/* Core Idea in 2 Sentences */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
            1. Core Idea Snapshot
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
            {lesson.intuition.overview}
          </p>
        </div>

        {/* Memorable Analogy & Takeaway */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-300">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Memorable Analogy Takeaway:</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {analogy.metaphor}
          </p>
        </div>

        {/* Important Formulas Quick Reference */}
        {mathematics.foundations.length > 0 && (
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
              2. Key Mathematical Formulas
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mathematics.foundations.slice(0, 2).map((found, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1"
                >
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block">
                    {found.name}
                  </span>
                  <div className="text-center py-1">
                    <MathBlock math={found.latex} />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {found.explanation.slice(0, 80)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Takeaways Bullet List */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
            3. Executive Concept Takeaways
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {summary.keyTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-start gap-2 text-slate-700 dark:text-slate-300"
              >
                <Zap className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Self-Assessment Checklist */}
        <div className="pt-3 border-t border-indigo-100 dark:border-indigo-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-500" />
              <span>Self-Assessment Checklist ({checkedCount}/{checklistItems.length} Mastered)</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              {Math.round((checkedCount / checklistItems.length) * 100)}% Complete
            </span>
          </div>

          <div className="space-y-2">
            {checklistItems.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <button
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs flex items-center gap-3 transition-colors ${
                    isChecked
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-medium'
                      : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="leading-relaxed">{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prerequisite-Aware Next Topic Bridge */}
        {summary.nextLessonId && (
          <div className="pt-4 border-t border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Next Logical Topic in Curriculum:
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {summary.nextLessonTitle}
              </span>
            </div>

            <Link
              href={`/curriculum/${summary.nextLessonModuleId || moduleId}/${summary.nextLessonId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-colors self-start sm:self-auto"
            >
              <span>Continue to Next Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
