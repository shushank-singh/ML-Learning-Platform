'use client';

import React from 'react';
import {
  Stethoscope,
  ArrowRight,
  Activity,
  HeartPulse,
  ClipboardCheck,
  Sparkles,
  BookOpen,
  Microscope,
  ShieldCheck,
  Pill,
} from 'lucide-react';

export const DoctorHeroSection: React.FC = React.memo(() => {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/70 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border border-emerald-200/80 dark:border-emerald-900/50 shadow-lg sm:shadow-xl transition-all duration-300 p-4 sm:p-8 lg:p-12">
      {/* Ambient medical glows */}
      <div className="hidden sm:block absolute -top-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-500/10 dark:bg-emerald-600/15 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute -bottom-32 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-teal-500/10 dark:bg-cyan-600/15 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-12 lg:items-center space-y-8 lg:space-y-0">
        {/* Left Side: Headline, Copy & Actions */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
          {/* Platform Tag Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-[11px] sm:text-xs font-semibold shadow-xs max-w-full">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0" />
            <span className="font-bold">AzurLearn Medical</span>
            <span className="text-emerald-300 dark:text-emerald-700">·</span>
            <span className="font-medium text-slate-600 dark:text-slate-300 truncate">
              MBBS Dashboard Design Preview
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[1.85rem] leading-[1.18] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:leading-[1.12]">
            Master MBBS &amp; Clinical Medicine,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300">
              From Anatomy
            </span>{' '}
            to Bedside Rounds
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
            Structured across all 4.5 MBBS Professional Years and 19 core subjects. Build deep physiological intuition with interactive ECG &amp; ABG simulators, pharmacology receptor maps, bedside case vignettes, and OSCE checklists.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
            <a
              href="#mbbs-subjects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/25 hover:shadow-emerald-600/40 min-h-[44px]"
            >
              <Stethoscope className="w-4 h-4 shrink-0" />
              <span>Explore 19 MBBS Subjects</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>

            <a
              href="#clinical-hub"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all shadow-xs min-h-[44px]"
            >
              <HeartPulse className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Preview Clinical Lab</span>
            </a>
          </div>

          {/* Trust / Value Indicators */}
          <div className="pt-4 sm:pt-6 border-t border-slate-200/90 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="space-y-0.5 sm:space-y-1 p-2 sm:p-0 rounded-xl bg-white/70 sm:bg-transparent dark:bg-slate-800/40 sm:dark:bg-transparent">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>19 Subjects</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pre to Final Prof
              </p>
            </div>

            <div className="space-y-0.5 sm:space-y-1 p-2 sm:p-0 rounded-xl bg-white/70 sm:bg-transparent dark:bg-slate-800/40 sm:dark:bg-transparent">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                <Activity className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>ECG &amp; ABG Labs</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Visual diagnostics
              </p>
            </div>

            <div className="space-y-0.5 sm:space-y-1 p-2 sm:p-0 rounded-xl bg-white/70 sm:bg-transparent dark:bg-slate-800/40 sm:dark:bg-transparent">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                <ClipboardCheck className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>OSCE Cases</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ward bedside prep
              </p>
            </div>

            <div className="space-y-0.5 sm:space-y-1 p-2 sm:p-0 rounded-xl bg-white/70 sm:bg-transparent dark:bg-slate-800/40 sm:dark:bg-transparent">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>NEET-PG / NEXT</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                High-yield recall
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Clinical Monitor & Case Card */}
        <div className="lg:col-span-5 relative w-full overflow-hidden sm:overflow-visible">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="rounded-2xl border border-emerald-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-md sm:shadow-xl space-y-3 sm:space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400" />
                  <span className="text-[11px] sm:text-xs font-mono font-medium text-slate-500 dark:text-slate-400 ml-1.5 sm:ml-2">
                    clinical_case_042.ecg
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Ward Rounds Ready
                </span>
              </div>

              {/* Simulated Patient Vitals Monitor */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-[10px] sm:text-[11px] leading-relaxed shadow-inner space-y-1.5">
                <div className="flex items-center justify-between text-emerald-400 font-semibold">
                  <span>CC: Acute Retrosternal Chest Pain (90m)</span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px]">
                    PRIORITY 1
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 text-[10px]">
                  <div className="p-1.5 rounded bg-slate-800/90 border border-slate-700/80">
                    <span className="text-slate-400 block text-[9px]">BP</span>
                    <span className="text-amber-300 font-bold">96/62 mmHg</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-800/90 border border-slate-700/80">
                    <span className="text-slate-400 block text-[9px]">HR</span>
                    <span className="text-emerald-300 font-bold">52 bpm</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-800/90 border border-slate-700/80">
                    <span className="text-slate-400 block text-[9px]">SpO2</span>
                    <span className="text-cyan-300 font-bold">94% RA</span>
                  </div>
                </div>
                <p className="text-slate-300 pt-1">
                  ECG Lead II, III, aVF: <span className="text-rose-400 font-semibold">ST-Elevation ↑</span> · Check V4R
                </p>
              </div>

              {/* Live ECG Telemetry SVG */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                    <span>Lead II Telemetry Trace</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] sm:text-[11px]">
                    25 mm/s · 10 mm/mV
                  </span>
                </div>

                <svg className="w-full h-16 sm:h-20" viewBox="0 0 360 80" fill="none">
                  {/* ECG Grid */}
                  <line x1="0" y1="20" x2="360" y2="20" stroke="#10b981" strokeOpacity="0.14" strokeDasharray="3 3" />
                  <line x1="0" y1="40" x2="360" y2="40" stroke="#10b981" strokeOpacity="0.14" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="360" y2="60" stroke="#10b981" strokeOpacity="0.14" strokeDasharray="3 3" />

                  {/* ECG Waveform */}
                  <path
                    d="M 0 52 L 26 52 Q 33 43 39 52 L 48 52 L 52 57 L 58 14 L 63 45 L 72 26 Q 86 22 98 52 L 138 52 Q 145 43 151 52 L 160 52 L 164 57 L 170 14 L 175 45 L 184 26 Q 198 22 210 52 L 250 52 Q 257 43 263 52 L 272 52 L 276 57 L 282 14 L 287 45 L 296 26 Q 310 22 322 52 L 360 52"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="322" cy="52" r="4" fill="#10b981" />
                </svg>
              </div>

              {/* Mobile inline micro-badges */}
              <div className="flex sm:hidden items-center justify-between gap-2 pt-1 text-[10px]">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <Microscope className="w-3 h-3 text-emerald-500" />
                  <span className="font-semibold">Dx: Inferior STEMI</span>
                </div>
                <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-semibold">
                  <Pill className="w-3 h-3" />
                  <span>DAPT + PCI Ready</span>
                </div>
              </div>
            </div>

            {/* Desktop floating micro-badges */}
            <div className="hidden sm:flex absolute -bottom-3 -left-4 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg items-center gap-2.5 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Differential Dx
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  ACS · RCA Occlusion
                </span>
              </div>
            </div>

            <div className="hidden sm:flex absolute -top-3 -right-3 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg items-center gap-2.5 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Stethoscope className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Clinical Focus
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  OSCE · Cardiology
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

DoctorHeroSection.displayName = 'DoctorHeroSection';
