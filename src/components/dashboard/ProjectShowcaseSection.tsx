'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Clock,
  ArrowRight,
  Database,
  Layers,
  CheckCircle2,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { REAL_WORLD_PROJECTS } from '@/data/projects/projects';

export const ProjectShowcaseSection: React.FC = () => {
  return (
    <section id="projects" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Portfolio Capstones</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Real-World Project Showcase
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-normal">
            Step beyond toy datasets. Build industrial machine learning systems complete with business metrics, exploratory analysis, preprocessing pipelines, error diagnostics, and FastAPI deployment.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all shadow-xs shrink-0 w-full sm:w-auto min-h-[44px]"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {REAL_WORLD_PROJECTS.slice(0, 3).map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between p-4 sm:p-6 space-y-4 group"
          >
            <div className="space-y-3">
              {/* Category & Duration */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {proj.category}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {proj.duration}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                {proj.title}
              </h3>

              {/* Business Objective */}
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {proj.businessObjective}
              </p>

              {/* Dataset Spec Box */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <Database className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{proj.datasetInfo.name}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {proj.datasetInfo.rowsCount} · {proj.datasetInfo.featuresCount} Features
                </p>
              </div>

              {/* Deliverables Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.deliverables.slice(0, 3).map((deliv, dIdx) => (
                  <span
                    key={dIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300"
                  >
                    {deliv.split(' ')[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-slate-500">
                {proj.difficulty}
              </span>
              <Link
                href={`/projects/${proj.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <span>Open Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

