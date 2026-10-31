'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Clock,
  ArrowRight,
  Database,
  CheckCircle2,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { REAL_WORLD_PROJECTS } from '@/data/projects/projects';

export default function ProjectsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-xs font-semibold">
          <Briefcase className="w-4 h-4" />
          <span>Industry Capstone Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Real-World AI &amp; ML Project Lab
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Step beyond synthetic toy examples. Build 10 production-quality end-to-end applications complete with business objective definitions, exploratory checklists, preprocessing pipelines, error diagnostics, and deployment blueprints.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REAL_WORLD_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {proj.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {proj.duration}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {proj.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {proj.businessObjective}
              </p>

              {/* Dataset & Specs */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <Database className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Dataset: {proj.datasetInfo.name}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {proj.datasetInfo.rowsCount} · {proj.datasetInfo.featuresCount} Features · Source: {proj.datasetInfo.source}
                </div>
              </div>

              {/* Deliverables summary */}
              <div className="mt-3 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                  GitHub-Ready Deliverables:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.deliverables.slice(0, 3).map((deliv, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300"
                    >
                      {deliv.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">{proj.difficulty}</span>
              <Link
                href={`/projects/${proj.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <span>Open Project Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
