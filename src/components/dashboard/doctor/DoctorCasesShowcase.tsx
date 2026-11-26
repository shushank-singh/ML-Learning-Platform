'use client';

import React, { useState } from 'react';
import {
  Stethoscope,
  Clock,
  ArrowRight,
  Activity,
  X,
  CheckCircle2,
  ClipboardList,
} from 'lucide-react';
import {
  CLINICAL_CASE_VIGNETTES,
  ClinicalCaseVignette,
} from '@/data/doctorDashboardConfig';

export const DoctorCasesShowcase: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<ClinicalCaseVignette | null>(null);

  return (
    <section id="clinical-cases" className="space-y-8 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Bedside Case Vignettes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Clinical Ward Case Showcase
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-normal">
            Move beyond rote memorization. Practice real emergency &amp; ward-round vignettes complete with vitals triage, targeted investigations, differential diagnosis, and next-best-step management.
          </p>
        </div>

        <a
          href="#clinical-hub"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all shadow-xs shrink-0 w-full sm:w-auto min-h-[44px]"
        >
          <span>Open Clinical Simulators</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Case Vignettes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {CLINICAL_CASE_VIGNETTES.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between p-4 sm:p-6 space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {item.specialty}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {item.duration}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                {item.presentation}
              </p>

              {/* Vitals & Workup Box */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <Activity className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate font-mono text-[11px]">{item.vitals}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {item.chiefComplaint}
                </p>
              </div>

              {/* Differential Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.differentialTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-slate-500">
                {item.profLevel}
              </span>
              <button
                type="button"
                onClick={() => setSelectedCase(item)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <span>Preview Case</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Vignette Preview Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {selectedCase.specialty} · Case Preview
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close case preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
              Vitals: {selectedCase.vitals}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedCase.presentation}
            </p>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ClipboardList className="w-3.5 h-3.5 text-emerald-500" />
                Key Investigations
              </span>
              <div className="space-y-1">
                {selectedCase.investigations.map((inv) => (
                  <div key={inv} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{inv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <span className="font-bold block mb-0.5">Clinical Pearl:</span>
              {selectedCase.keyLearningPoint}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
