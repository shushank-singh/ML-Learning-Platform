'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Cpu,
  Stethoscope,
  ArrowRight,
  Layers,
  Box,
  PlayCircle,
  CheckSquare,
  Terminal,
  Sliders,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { getOverallPlatformStats } from '@/data/learningPlatformConfig';
import {
  MBBS_CURRICULUM_STATS,
  SCIENTIFIC_ANIMATIONS,
  HEART_STRUCTURES,
  SKELETON_STRUCTURES,
  BRAIN_STRUCTURES,
  LUNGS_STRUCTURES,
  KIDNEYS_STRUCTURES,
  LIVER_STRUCTURES,
  EYE_STRUCTURES,
} from '@/data/medverse';

const PlatformFooter = dynamic(
  () => import('@/components/dashboard/PlatformFooter').then((m) => m.PlatformFooter),
  { ssr: true }
);

export const PlatformHomeOverview: React.FC = () => {
  const engineeringStats = useMemo(() => getOverallPlatformStats(null), []);
  const totalGlbStructures =
    HEART_STRUCTURES.length +
    SKELETON_STRUCTURES.length +
    BRAIN_STRUCTURES.length +
    LUNGS_STRUCTURES.length +
    KIDNEYS_STRUCTURES.length +
    LIVER_STRUCTURES.length +
    EYE_STRUCTURES.length;

  const featuredImplementedTools = [
    {
      wing: 'Engineering',
      title: 'Python Code Lab & ML Playground',
      href: '/code-lab',
      icon: Terminal,
      accent: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70',
      description: 'Run Python in-browser via Pyodide WebAssembly and tune ML visualizers interactively.',
    },
    {
      wing: 'Engineering',
      title: 'DSA, Python & Java Visual Labs',
      href: '/playground',
      icon: Sliders,
      accent: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/70',
      description: 'Step through trees, graphs, gradient descent, CPython memory frames, and JVM internals.',
    },
    {
      wing: 'Engineering',
      title: 'AI Tutor & Mock Interviews',
      href: '/ai-tutor',
      icon: Sparkles,
      accent: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/70',
      description: 'Contextual concept guidance alongside timed engineering interview and coding rounds.',
    },
    {
      wing: 'Doctor',
      title: '3D Anatomical Atlas (7 GLB Organs)',
      href: '/doctor/anatomy',
      icon: Box,
      accent: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/70',
      description: `${totalGlbStructures} selectable structures across Heart, Skeleton, Brain, Lungs, Kidneys, Liver, and Eye with X-Ray, 3D Pins, and Draw/PNG.`,
    },
    {
      wing: 'Doctor',
      title: 'Scientific Animation Studio',
      href: '/doctor/animations',
      icon: PlayCircle,
      accent: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70',
      description: `${SCIENTIFIC_ANIMATIONS.length} timeline-driven mechanisms with scrubbing, 0.5x/1x/2x speeds, Step-by-Step mode, and skeleton elbow kinematics.`,
    },
    {
      wing: 'Doctor',
      title: 'MBBS Notes, Cases & SM-2 Quizzes',
      href: '/doctor/quizzes',
      icon: CheckSquare,
      accent: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70',
      description: 'High-yield 60s/2m structured MBBS notes, synthetic clinical cases, and spaced-repetition retention tracking.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-14">
        {/* 1. HERO: CONCISE IMPLEMENTED PLATFORM OVERVIEW */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50 to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 lg:p-12">
          <div className="hidden sm:block absolute -top-28 -left-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden sm:block absolute -bottom-28 -right-24 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>AzurLearn Dual-Platform Learning Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Interactive Learning Built for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-300">
                Engineering &amp; Medicine.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Explore live code execution, ML simulations, and CS mastery in our{' '}
              <strong className="text-indigo-600 dark:text-indigo-400">Engineering Platform</strong>, or launch real WebGL 3D anatomical models, physiological timeline animations, and MBBS revision workflows in our{' '}
              <strong className="text-teal-600 dark:text-teal-400">Doctor Platform</strong>.
            </p>

            {/* Primary Platform Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/engineering"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/25"
              >
                <Cpu className="w-4 h-4" />
                <span>Engineering Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/doctor"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-all shadow-md shadow-teal-600/25"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Doctor Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Concise Verified Snapshot */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-7 border-t border-slate-200/80 dark:border-slate-800">
            <div className="rounded-2xl bg-white/85 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Engineering Platform
              </p>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {engineeringStats.totalModules} Modules
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {engineeringStats.totalLessons}+ lessons (AI/ML, DSA, Python, Java)
              </p>
            </div>

            <div className="rounded-2xl bg-white/85 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Doctor Platform
              </p>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                7 Real 3D Organs
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {totalGlbStructures} selectable GLB structures
              </p>
            </div>

            <div className="rounded-2xl bg-white/85 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Interactive Mechanisms
              </p>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {SCIENTIFIC_ANIMATIONS.length} Timelines
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Play/scrub/step sync + X-Ray &amp; Pins
              </p>
            </div>

            <div className="rounded-2xl bg-white/85 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                MBBS Coverage Status
              </p>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {MBBS_CURRICULUM_STATS.subjectsCount} NMC Subjects
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {MBBS_CURRICULUM_STATS.publishedTopicsCount} published interactive topics active
              </p>
            </div>
          </div>
        </section>

        {/* 2. ENGINEERING PLATFORM VS DOCTOR PLATFORM OVERVIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-indigo-200/80 dark:border-indigo-900/60 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    /engineering
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Engineering Platform
                  </h2>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Full curriculum and interactive engineering workbench covering Machine Learning, Deep Learning, Transformers, RAG, AI Agents, DSA, Python, and Java.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>In-browser Python Pyodide execution &amp; Java code runner</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>ML Playground, Algorithm Visualizers &amp; Mock Interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>SM-2 Daily Flashcards, Formulas, Projects &amp; Certificates</span>
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/engineering"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
              >
                <span>Engineering Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-teal-200/80 dark:border-teal-900/60 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400">
                    /doctor
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Doctor Platform
                  </h2>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Dedicated MBBS workstation powered by MedVerse 3D with real Three.js anatomical GLB models, timeline physiology animations, and clinical revision tools.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>7 BodyParts3D GLBs (Heart, Skeleton, Brain, Lungs, Kidneys, Liver, Eye)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>X-Ray Mode, 3D Pins, Drawing/PNG, Pathology Overlays &amp; Latin/FMA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>60s/2m MBBS Notes, Clinical Vignettes, MCQs &amp; SM-2 Flashcards</span>
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/doctor"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors"
              >
                <span>Doctor Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. IMPLEMENTED HIGHLIGHTS FROM BOTH PLATFORMS */}
        <section id="platform-tools" className="space-y-5 scroll-mt-20">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Implemented Capabilities
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Key Implemented Features Across Both Platforms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredImplementedTools.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-indigo-400 dark:hover:border-teal-600 transition-all shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.wing}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-teal-400">
                    Open Feature <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <PlatformFooter />
    </div>
  );
};
