'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { PLATFORM_FEATURES } from '@/data/learningPlatformConfig';

export const PlatformFeaturesSection: React.FC = () => {
  return (
    <section id="features" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            How ML Mastery Lab Accelerates Your Learning
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Every lesson is engineered with multiple learning modalities — eliminating guesswork and transforming complex computer science into intuitive, lasting knowledge.
          </p>
        </div>
      </div>

      {/* 8 Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORM_FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${feature.accent} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {feature.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span>Phase {idx + 1} of 8</span>
                <span className="text-slate-500 dark:text-slate-400 font-sans">Active in all tracks</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
