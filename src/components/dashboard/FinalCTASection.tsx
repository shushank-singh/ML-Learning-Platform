'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Brain,
  Sparkles,
  BookOpen,
  Terminal,
} from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 p-8 sm:p-12 text-white shadow-xl shadow-indigo-600/20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
          <span>Begin Your AI Engineering Journey Today</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          Master Modern AI &amp; Machine Learning from First Principles
        </h2>

        <p className="text-sm sm:text-base text-indigo-100 max-w-2xl mx-auto leading-relaxed font-light">
          From linear regression calculus to multi-agent state graphs and GPU serving, build the skills required for modern artificial intelligence engineering.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-indigo-700 font-bold text-sm transition-all shadow-lg shadow-black/10 hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Full Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/code-lab"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-900/40 hover:bg-indigo-900/60 border border-white/20 text-white font-semibold text-sm transition-all backdrop-blur-sm"
          >
            <Terminal className="w-4 h-4 text-cyan-300" />
            <span>Launch Python Code Lab</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

