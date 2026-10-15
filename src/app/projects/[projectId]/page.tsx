'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Briefcase,
  ChevronRight,
  Database,
  CheckCircle2,
  AlertCircle,
  Clock,
  Server,
  FileText,
  Code2,
  Terminal,
} from 'lucide-react';
import { REAL_WORLD_PROJECTS } from '@/data/projects/projects';
import { CodeRunner } from '@/components/code/CodeRunner';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.projectId as string;
  const project = REAL_WORLD_PROJECTS.find((p) => p.id === projectId) || REAL_WORLD_PROJECTS[0];

  const [activeMilestone, setActiveMilestone] = useState<number>(1);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/projects" className="hover:text-indigo-600 transition-colors">
          Project Lab
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 font-medium truncate">
          {project.title}
        </span>
      </div>

      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border border-slate-800 p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            {project.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {project.duration}
          </span>
          <span className="text-xs text-slate-400">· Difficulty: {project.difficulty}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {project.title}
        </h1>
        <p className="text-sm text-indigo-100/80 leading-relaxed font-light max-w-3xl">
          {project.businessObjective}
        </p>
      </div>

      {/* Grid: Specifications & Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: EDA, Data Dictionary, Evaluation */}
        <div className="lg:col-span-5 space-y-6">
          {/* Dataset & Dictionary */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              <Database className="w-4 h-4 text-indigo-500" />
              Dataset Specifications
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {project.datasetInfo.description} (Source: {project.datasetInfo.source})
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="p-2 font-mono">Column</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                  {project.datasetInfo.dataDictionary.map((col, idx) => (
                    <tr key={idx}>
                      <td className="p-2 font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                        {col.column}
                      </td>
                      <td className="p-2 text-slate-500">{col.type}</td>
                      <td className="p-2">{col.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EDA Checklist */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Exploratory Data Analysis Checklist
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {project.edaChecklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preprocessing & Baseline */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              <FileText className="w-4 h-4 text-amber-500" />
              Preprocessing & Baseline Model
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50">
                <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-1">
                  Baseline Architecture:
                </span>
                {project.baselineModel}
              </div>
              <ul className="space-y-1.5 pl-2">
                {project.preprocessingPlan.map((plan, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px]">
                    <span className="text-slate-400">•</span>
                    <span>{plan}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Deployment Plan */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              <Server className="w-4 h-4 text-cyan-500" />
              Production Deployment Blueprint
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {project.deploymentPlan.map((d, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Guided Milestones & Interactive Code Lab */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Guided Project Milestones
            </span>
            <span className="text-xs text-slate-500">
              Step {activeMilestone} of {project.milestones.length}
            </span>
          </div>

          {/* Milestone Stepper Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {project.milestones.map((m) => (
              <button
                key={m.step}
                onClick={() => setActiveMilestone(m.step)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeMilestone === m.step
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-1">
                  {m.step}
                </span>
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block truncate">
                  {m.title}
                </span>
              </button>
            ))}
          </div>

          {/* Current Milestone Workspace */}
          {(() => {
            const current = project.milestones.find((m) => m.step === activeMilestone) || project.milestones[0];
            return (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Milestone {current.step}: {current.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Milestone Checklist */}
                <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                    Execution Tasks:
                  </span>
                  <div className="space-y-1 text-xs">
                    {current.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Code Editor for this milestone */}
                <div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-2">
                    Milestone Python Script:
                  </span>
                  <CodeRunner
                    key={`${project.id}-m-${current.step}`}
                    initialCode={current.starterCodeSnippet}
                    title={`Milestone ${current.step} Runner`}
                  />
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
