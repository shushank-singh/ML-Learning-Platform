'use client';

import React from 'react';
import {
  Stethoscope,
  BookOpen,
  HeartPulse,
  ClipboardCheck,
  Sparkles,
  Flame,
  Clock,
  Layers,
  Award,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { MBBS_SUBJECTS } from '@/data/doctorDashboardConfig';

export const DoctorDashboardBanner: React.FC = () => {
  const { user, profile, isEmailVerified } = useAuth();

  if (!user) {
    return null;
  }

  const displayName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Doctor';
  const initial = displayName.charAt(0).toUpperCase();

  const currentHour = new Date().getHours();
  const timeGreeting =
    currentHour < 12
      ? 'Good morning'
      : currentHour < 18
      ? 'Good afternoon'
      : 'Good evening';

  const totalPlannedTopics = MBBS_SUBJECTS.reduce((acc, s) => acc + s.topicsCount, 0);

  return (
    <section className="space-y-8 animate-in fade-in duration-300">
      {/* 1. PERSONALIZED DOCTOR / MBBS WORKSPACE HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/90 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950 p-4 sm:p-8 shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Medical Learner Identity & Greeting */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-emerald-600/30">
                  {initial}
                </div>
                {isEmailVerified && (
                  <span
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] text-white"
                    title="Verified Account"
                  >
                    ✓
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    {timeGreeting}, Dr. {displayName}!
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase tracking-wider">
                    MBBS Dashboard Preview
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Your clinical &amp; MBBS medical academy command center. Preview all 19 subjects from 1st Prof Anatomy to Final Prof Medicine, ECG/ABG simulators, and ward case vignettes.
                </p>
              </div>
            </div>

            {/* Quick Section Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="#mbbs-subjects"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>19 MBBS Subjects</span>
              </a>

              <a
                href="#clinical-hub"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-xs"
              >
                <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                <span>ECG &amp; ABG Lab</span>
              </a>

              <a
                href="#mbbs-roadmap"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-xs"
              >
                <Layers className="w-3.5 h-3.5 text-teal-500" />
                <span>Prof Years Roadmap</span>
              </a>

              <a
                href="#clinical-cases"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-xs"
              >
                <ClipboardCheck className="w-3.5 h-3.5 text-cyan-500" />
                <span>Ward Vignettes</span>
              </a>
            </div>
          </div>

          {/* Right: Medical Dashboard Design Status Card */}
          <div className="p-5 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-emerald-200/90 dark:border-emerald-900/50 shadow-md max-w-md w-full space-y-3.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <Eye className="w-3.5 h-3.5" />
                <span>MBBS Blueprint Status</span>
              </span>
              <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                UI Design Ready
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                4.5 Prof Years · {MBBS_SUBJECTS.length} Core Subjects
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {totalPlannedTopics}+ planned clinical &amp; foundational topics mapped across Pre-Clinical, Para-Clinical &amp; Clinical rotations.
              </p>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full"
                style={{ width: '100%' }}
              />
            </div>

            <a
              href="#mbbs-subjects"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/25"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Browse MBBS Subject Blueprints</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. OVERVIEW METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subjects</span>
            <BookOpen className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            19
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">MBBS Core Subjects</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Prof Years</span>
            <Layers className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            4.5y
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">CBME Curriculum</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Topics</span>
            <Sparkles className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            {totalPlannedTopics}+
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Planned Syllabus Units</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Clinical Labs</span>
            <HeartPulse className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            4
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">ECG · ABG · MOA · Atlas</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ward Cases</span>
            <ClipboardCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            OSCE
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Bedside Vignettes</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Exam Prep</span>
            <Award className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            PG
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">NEET-PG · NEXT · USMLE</p>
        </div>
      </div>
    </section>
  );
};
