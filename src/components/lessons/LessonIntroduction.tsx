'use client';

import React from 'react';
import {
  Clock,
  Sparkles,
  Target,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { LessonContent } from '@/lib/types';

interface LessonIntroductionProps {
  lesson: LessonContent;
  moduleTitle?: string;
}

export const LessonIntroduction: React.FC<LessonIntroductionProps> = ({
  lesson,
  moduleTitle,
}) => {
  // Infer category from moduleId or lesson title
  const getCategory = () => {
    const id = lesson.id.toLowerCase();
    const mod = lesson.moduleId.toLowerCase();
    if (mod === 'module-3' || id.includes('regression')) return 'Supervised Learning: Regression';
    if (mod === 'module-4' || id.includes('classification')) return 'Supervised Learning: Classification';
    if (mod === 'module-6' || id.includes('forest') || id.includes('boost')) return 'Ensemble Learning & Boosting';
    if (mod === 'module-7' || id.includes('kmeans') || id.includes('cluster') || id.includes('pca')) return 'Unsupervised Learning & Clustering';
    if (mod === 'module-9' || id.includes('neural') || id.includes('deep')) return 'Neural Networks & Deep Learning';
    if (mod === 'module-1' || id.includes('math') || id.includes('vector') || id.includes('gradient')) return 'Mathematical Foundations';
    if (mod === 'module-2' || id.includes('preprocess') || id.includes('imput') || id.includes('scale')) return 'Data Engineering & Preprocessing';
    if (mod === 'module-5' || id.includes('metric') || id.includes('validation')) return 'Model Evaluation & Selection';
    if (mod === 'module-10' || id.includes('deploy') || id.includes('mlops')) return 'Production ML Engineering & MLOps';
    if (mod === 'module-11') return 'Real-World Capstone Project';
    return 'Machine Learning Core';
  };

  // Generate 3-5 structured learning objectives
  const objectives = lesson.objectives || [
    `Understand the intuition and core mathematical hypothesis of ${lesson.title.split(':')[0]}`,
    `Identify when to apply this technique in real-world scenarios and when another model is preferable`,
    `Implement the complete algorithm from scratch in NumPy and in Scikit-Learn pipelines`,
    `Diagnose assumptions, avoid subtle data leakage pitfalls, and interpret evaluation metrics`,
  ];

  // Prerequisites
  const prerequisites = lesson.prerequisites || [
    'Basic Python and NumPy array slicing',
    'High school algebra and coordinate geometry',
    'Understanding of train/test data splits',
  ];

  const category = getCategory();

  return (
    <div className="space-y-6">
      {/* Top Meta Badges Bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>{category}</span>
        </span>

        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
          lesson.difficulty === 'Beginner'
            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            : lesson.difficulty === 'Intermediate'
            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
        }`}>
          {lesson.difficulty} Level
        </span>

        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{lesson.readTimeMinutes} min interactive study</span>
        </span>

        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
          Lesson {lesson.order}
        </span>
      </div>

      {/* Main Lesson Heading */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          {lesson.title}
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          {lesson.subtitle}
        </p>
      </div>

      {/* Curiosity Hook / Why This Matters Callout */}
      <div className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-slate-50 to-white dark:from-indigo-950/40 dark:via-slate-900/60 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-800/60 shadow-sm">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>The Real-World Question: Why Does This Matter?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
            {lesson.problemSolved.description}
          </p>
          <div className="pt-1 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Key challenge addressed:</span>
            <span>{lesson.problemSolved.title}</span>
          </div>
        </div>
      </div>

      {/* Learning Objectives Grid */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Target className="w-4 h-4" />
          </span>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Learning Objectives — What You Will Master
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {objectives.map((obj, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{obj}</span>
            </div>
          ))}
        </div>

        {/* Prerequisites Bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 dark:text-slate-400">Recommended Prerequisites:</span>
          {prerequisites.map((req, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]"
            >
              {req}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
