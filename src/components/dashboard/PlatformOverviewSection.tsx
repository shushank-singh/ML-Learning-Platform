'use client';

import React from 'react';
import {
  Workflow,
  ArrowRight,
  GitFork,
  BookOpen,
  Eye,
  Terminal,
  Code2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { LEARNING_WORKFLOW_STEPS } from '@/data/learningPlatformConfig';

export const PlatformOverviewSection: React.FC = () => {
  return (
    <section id="how-it-works" className="space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Workflow className="w-3.5 h-3.5" />
          <span>The Pedagogical Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          How You Learn on ML Mastery Lab
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Our six-stage pedagogical framework bridges the gap between pure mathematics and shipping code. Every topic follows this reproducible mastery loop.
        </p>
      </div>

      {/* Visual Step-Based Process Cards */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEARNING_WORKFLOW_STEPS.map((stepItem, idx) => {
            const Icon = stepItem.icon;
            return (
              <div
                key={stepItem.step}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm hover:shadow-md group"
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs flex items-center justify-center">
                    0{stepItem.step}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
                    {stepItem.highlight}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                      {stepItem.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    {stepItem.description}
                  </p>
                </div>

                {/* Bottom connector indicator */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Step {stepItem.step} of 6</span>
                  {idx < LEARNING_WORKFLOW_STEPS.length - 1 ? (
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <span>Next phase</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Mastery Achieved</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
