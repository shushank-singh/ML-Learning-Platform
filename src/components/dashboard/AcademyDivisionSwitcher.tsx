'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Stethoscope, ArrowRight, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { PlatformDivision } from '@/context/DivisionContext';

interface AcademyDivisionSwitcherProps {
  division: PlatformDivision;
  onSelect?: (division: PlatformDivision) => void;
  engineeringStats: {
    totalLessons: number;
    totalModules: number;
  };
}

export const AcademyDivisionSwitcher: React.FC<AcademyDivisionSwitcherProps> = React.memo(
  ({ division, onSelect, engineeringStats }) => {
    const isEngineering = division === 'engineering';
    const isDoctor = division === 'doctor';

    return (
      <section aria-label="Academy Division Switcher" className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Switch Dedicated Academy Route</span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Platform Overview (/)
            </Link>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            Active Wing:{' '}
            <strong
              className={
                isEngineering
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }
            >
              {isEngineering ? '/engineering (AI/ML · DSA · Python · Java)' : '/doctor (MedVerse 3D MBBS)'}
            </strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* 1. ENGINEERING DIVISION CARD */}
          <Link
            href="/engineering"
            onClick={() => onSelect?.('engineering')}
            aria-current={isEngineering ? 'page' : undefined}
            className={`group text-left relative overflow-hidden rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex items-start justify-between gap-4 ${
              isEngineering
                ? 'border-indigo-500 dark:border-indigo-500 bg-gradient-to-br from-indigo-50/95 via-white to-cyan-50/60 dark:from-indigo-950/60 dark:via-slate-900 dark:to-slate-900 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                : 'border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 hover:border-indigo-300 dark:hover:border-indigo-800 hover:bg-slate-50/80 dark:hover:bg-slate-900'
            }`}
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                  isEngineering
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/70 dark:border-indigo-900'
                }`}
              >
                <Cpu className="w-5 h-5" />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    Engineering (/engineering)
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800">
                    {engineeringStats.totalModules} Modules · {engineeringStats.totalLessons}+ Lessons
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  Complete AI &amp; ML, Deep Learning, Transformers, RAG, AI Agents, DSA, Python &amp; Java Labs.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-end justify-between self-stretch">
              {isEngineering ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  Open <ArrowRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          </Link>

          {/* 2. DOCTOR (MBBS) DIVISION CARD */}
          <Link
            href="/doctor"
            onClick={() => onSelect?.('doctor')}
            aria-current={isDoctor ? 'page' : undefined}
            className={`group text-left relative overflow-hidden rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex items-start justify-between gap-4 ${
              isDoctor
                ? 'border-emerald-500 dark:border-emerald-500 bg-gradient-to-br from-emerald-50/95 via-white to-teal-50/60 dark:from-emerald-950/60 dark:via-slate-900 dark:to-slate-900 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                : 'border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 hover:border-emerald-300 dark:hover:border-emerald-800 hover:bg-slate-50/80 dark:hover:bg-slate-900'
            }`}
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                  isDoctor
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                    : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-900'
                }`}
              >
                <Stethoscope className="w-5 h-5" />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    Doctor / MBBS (/doctor)
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
                    4 Phases · 21 NMC Subjects
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800">
                    <Sparkles className="w-2.5 h-2.5" /> MedVerse 3D
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  Interactive 3D Heart &amp; Skeleton GLBs, Timeline Scientific Animations, MBBS Notes, MCQs, SM-2 Flashcards &amp; Clinical Cases.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-end justify-between self-stretch">
              {isDoctor ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  Open <ArrowRight className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          </Link>
        </div>
      </section>
    );
  }
);

AcademyDivisionSwitcher.displayName = 'AcademyDivisionSwitcher';
