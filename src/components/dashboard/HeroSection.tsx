'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Play,
  Layers,
  Cpu,
  Terminal,
  Brain,
  Coffee,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { ResumeLessonInfo } from '@/data/learningPlatformConfig';

interface HeroSectionProps {
  totalLessons: number;
  totalModules: number;
  tracksCount: number;
  resumeLesson: ResumeLessonInfo | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalLessons,
  totalModules,
  tracksCount,
  resumeLesson,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl p-6 sm:p-10 lg:p-12 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-600/10 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative technical dot grid */}
      <div className="absolute inset-0 opacity-15 dark:opacity-10 pointer-events-none bg-[radial-gradient(#6366f1_1px,transparent_1px)] dark:bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Top platform announcement badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-medium shadow-sm backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">ML Mastery Lab</span>
          <span className="text-slate-400 dark:text-slate-500">·</span>
          <span className="text-indigo-600 dark:text-indigo-300">Engineering &amp; Algorithms Platform</span>
        </div>

        {/* Hero headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-950 dark:text-slate-100">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-300 dark:via-cyan-200 dark:to-emerald-300">Complete Machine Learning</span>,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 dark:from-violet-300 dark:via-purple-200 dark:to-pink-300">Algorithms</span> &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 dark:from-amber-300 dark:via-amber-200 dark:to-orange-300">Modern Programming</span>
        </h1>

        {/* Compelling description */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          A first-principles engineering platform designed for absolute clarity. Understand complex mathematics through intuitive analogies, step-by-step proofs, interactive visual laboratories, runnable code examples, and production deployment blueprints.
        </p>

        {/* CTAs */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#learning-paths"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Learning Paths</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {resumeLesson ? (
            <Link
              href={resumeLesson.route}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700/90 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all shadow-md group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-0.5" />
              <Play className="w-4 h-4 fill-current text-emerald-500" />
              <span className="truncate max-w-[200px] sm:max-w-[260px]">
                Resume: {resumeLesson.title}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono">
                {resumeLesson.completionPercentage}%
              </span>
            </Link>
          ) : (
            <a
              href="#continue-learning"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              <span>Continue Learning</span>
            </a>
          )}
        </div>

        {/* Metric counters banner */}
        <div className="pt-6 sm:pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60 shadow-xs dark:shadow-none backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block">
              {tracksCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 block">
              Core Learning Tracks
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60 shadow-xs dark:shadow-none backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-violet-600 dark:text-violet-400 block">
              {totalModules}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 block">
              Structured Modules
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60 shadow-xs dark:shadow-none backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block">
              {totalLessons}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 block">
              Total Lessons &amp; Topics
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60 shadow-xs dark:shadow-none backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400 block">
              100%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 block">
              Interactive &amp; Free
            </span>
          </div>
        </div>

        {/* Track quick badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 font-medium">
            <Brain className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Complete Machine Learning
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/40 text-violet-700 dark:text-violet-300 font-medium">
            <Cpu className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            DSA Mastery
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 font-medium">
            <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Python Mastery
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 font-medium">
            <Coffee className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Java Mastery
          </span>
        </div>
      </div>
    </section>
  );
};
