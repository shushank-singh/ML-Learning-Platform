'use client';

import React from 'react';
import {
  Stethoscope,
  ArrowRight,
  HeartPulse,
  Sparkles,
} from 'lucide-react';

export const DoctorFinalCTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-5 sm:p-8 lg:p-12 text-white shadow-xl shadow-emerald-600/20">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-cyan-300/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
          <span>MBBS Medical Academy · Dashboard Design</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          Master Clinical Medicine from First-Year Anatomy to Ward Rounds
        </h2>

        <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto leading-relaxed font-light">
          Explore all 19 MBBS subjects, interactive ECG &amp; ABG diagnostic simulators, and bedside clinical case vignettes designed for future physicians.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a
            href="#mbbs-subjects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-emerald-700 font-bold text-sm transition-all shadow-lg shadow-black/10 hover:-translate-y-0.5 w-full sm:w-auto min-h-[44px]"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Explore 19 MBBS Subjects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#clinical-hub"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/35 hover:bg-emerald-950/55 border border-white/20 text-white font-semibold text-sm transition-all backdrop-blur-sm w-full sm:w-auto min-h-[44px]"
          >
            <HeartPulse className="w-4 h-4 text-rose-300" />
            <span>Try Clinical Simulators</span>
          </a>
        </div>
      </div>
    </section>
  );
};
