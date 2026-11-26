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
  BookOpen,
  CheckSquare,
  ClipboardCheck,
  ShieldAlert,
  Code2,
  Terminal,
  Sliders,
  Brain,
  Sparkles,
  Flame,
  Timer,
  Calculator,
  Zap,
  Briefcase,
  Award,
  CheckCircle2,
  BarChart2,
  HeartPulse,
  TreePine,
} from 'lucide-react';
import { getOverallPlatformStats } from '@/data/learningPlatformConfig';
import {
  MBBS_CURRICULUM_STATS,
  SCIENTIFIC_ANIMATIONS,
  MEDVERSE_MCQS,
  MEDVERSE_FLASHCARDS,
  SYNTHETIC_CLINICAL_CASES,
  HEART_STRUCTURES,
  SKELETON_STRUCTURES,
} from '@/data/medverse';

const PlatformFooter = dynamic(
  () => import('@/components/dashboard/PlatformFooter').then((m) => m.PlatformFooter),
  { ssr: true }
);

export const PlatformHomeOverview: React.FC = () => {
  const engineeringStats = useMemo(() => getOverallPlatformStats(null), []);
  const totalGlbStructures = HEART_STRUCTURES.length + SKELETON_STRUCTURES.length;

  const engineeringTools = [
    {
      title: 'Python Code Lab',
      href: '/code-lab',
      icon: Terminal,
      badge: 'WebAssembly Pyodide',
      description: 'Execute NumPy, ML algorithms, and data science scripts live inside the browser without local setup.',
    },
    {
      title: 'AI & ML Simulation Playground',
      href: '/playground',
      icon: Sliders,
      badge: 'Visualizers',
      description: 'Experiment with Linear Regression, Gradient Descent, Logistic Boundaries, Decision Trees, K-Means, PCA, and Neural Nets.',
    },
    {
      title: 'DSA, Python & Java Mastery Labs',
      href: '/dsa',
      icon: TreePine,
      badge: '3 Dedicated Labs',
      description: 'Trace recursion trees, graph traversals, CPython memory frames, and JVM execution paths step by step.',
    },
    {
      title: 'Mock Interview Simulator',
      href: '/mock-interview',
      icon: Timer,
      badge: 'Auto-Graded',
      description: 'Timed conceptual + live Python coding interview rounds with automated scoring and solution feedback.',
    },
    {
      title: 'SM-2 Daily Flashcard Queue',
      href: '/daily-review',
      icon: Flame,
      badge: 'Spaced Repetition',
      description: 'Adaptive SM-2 recall scheduling across high-yield formulas, ML theory, and algorithm patterns.',
    },
    {
      title: 'Quizzes, Formulas & Revision Notes',
      href: '/quizzes',
      icon: Calculator,
      badge: 'Practice & Proofs',
      description: 'Conceptual quizzes (/quizzes), KaTeX mathematical formula explorer (/formulas), and condensed cheat sheets (/revision-notes).',
    },
    {
      title: 'Capstone Projects & Certificates',
      href: '/projects',
      icon: Briefcase,
      badge: 'Verifiable Credentials',
      description: 'End-to-end applied ML engineering builds (/projects) with verifiable completion certificates (/certificates).',
    },
    {
      title: 'Curriculum-Aware AI Tutor',
      href: '/ai-tutor',
      icon: Sparkles,
      badge: 'Interactive Study',
      description: 'Contextual walkthroughs and multi-turn concept clarification tied to curriculum topics.',
    },
  ];

  const medicalTools = [
    {
      title: 'Real 3D Anatomy Atlas (GLB)',
      href: '/doctor/anatomy',
      icon: Box,
      badge: `${totalGlbStructures} Real Structures`,
      description: 'Three.js + WebGL explorer with BodyParts3D heart.glb (11 meshes) and skeleton.glb (242 bones): isolate, hide, opacity, layer filter, clipping plane & FMA metadata.',
    },
    {
      title: 'Scientific Animation Studio',
      href: '/doctor/animations',
      icon: PlayCircle,
      badge: `${SCIENTIFIC_ANIMATIONS.length} Timelines`,
      description: 'Deterministic single-clock timeline player with Play/Pause, scrubbing, 0.5x/1x/2x speeds, Step-by-Step mode, auto-camera & reduced-motion support.',
    },
    {
      title: 'Complete NMC CBME Syllabus',
      href: '/doctor/curriculum',
      icon: BookOpen,
      badge: `${MBBS_CURRICULUM_STATS.subjectsCount} Subjects`,
      description: `Covers all 4 MBBS Prof phases (${MBBS_CURRICULUM_STATS.totalTopicsCount} topics) with honest content statuses (${MBBS_CURRICULUM_STATS.publishedTopicsCount} published, plus in_development & planned).`,
    },
    {
      title: 'Synchronized 3D Topic Workspace',
      href: '/doctor/topics/cv-heart-blood-flow',
      icon: HeartPulse,
      badge: 'Notes + 3D + Test',
      description: 'Integrated study screen combining 3D model interaction, 60-second / 2-minute / 7-part structured MBBS notes, MCQs, and flashcards.',
    },
    {
      title: 'Clinical Cases & MBBS Quiz / SM-2 Bank',
      href: '/doctor/cases',
      icon: ClipboardCheck,
      badge: `${MEDVERSE_MCQS.length} MCQs · ${MEDVERSE_FLASHCARDS.length} Cards`,
      description: `Examine ${SYNTHETIC_CLINICAL_CASES.length} synthetic clinical case studies linked directly to 3D structures, plus real SM-2 flashcard retention and attempt accuracy tracking (/doctor/quizzes).`,
    },
    {
      title: 'Admin Medical Content Studio',
      href: '/doctor/studio',
      icon: ShieldAlert,
      badge: 'Role-Gated RBAC',
      description: 'Server-authenticated owner/admin workflow enforcing Zod validation, missing-asset auditing, and Supabase PostgreSQL persistence.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
        {/* 1. HERO: COMPLETE PLATFORM OVERVIEW */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50 to-indigo-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 lg:p-14">
          <div className="hidden sm:block absolute -top-28 -left-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden sm:block absolute -bottom-28 -right-24 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>AzurLearn Dual-Academy Learning Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Two Specialized Academies.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-300">
                Real Interactive Tools.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              AzurLearn brings software engineering and medical education into two dedicated routes —{' '}
              <code className="px-1.5 py-0.5 rounded bg-indigo-100/80 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-xs sm:text-sm">
                /engineering
              </code>{' '}
              and{' '}
              <code className="px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-xs sm:text-sm">
                /doctor
              </code>{' '}
              — built around real code execution, real Three.js 3D anatomical models, timeline simulations, spaced-repetition flashcards, and verified progress tracking.
            </p>

            {/* Primary Wing Entry Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/engineering"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/25"
              >
                <Cpu className="w-4 h-4" />
                <span>Enter Engineering (/engineering)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/doctor"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-all shadow-md shadow-teal-600/25"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Enter Doctor · MBBS (/doctor)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#platform-tools"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm transition-all"
              >
                <span>Browse All Platform Tools</span>
              </a>
            </div>
          </div>

          {/* Verified Scope Metrics Strip */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800">
            <div className="rounded-2xl bg-white/80 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Engineering Wing
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {engineeringStats.totalModules} Modules
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {engineeringStats.totalLessons}+ lessons across AI/ML, DSA, Python &amp; Java
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Doctor Wing (MedVerse 3D)
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {MBBS_CURRICULUM_STATS.subjectsCount} NMC Subjects
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {MBBS_CURRICULUM_STATS.totalTopicsCount} topics ({MBBS_CURRICULUM_STATS.publishedTopicsCount} interactive published)
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Real 3D &amp; Code Engines
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {totalGlbStructures} GLB Structures
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                BodyParts3D WebGL + {SCIENTIFIC_ANIMATIONS.length} timelines + Pyodide &amp; Java
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Practice &amp; Retention
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                SM-2 + MCQs
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quizzes, clinical cases, mock interviews &amp; synced study logs
              </p>
            </div>
          </div>
        </section>

        {/* 2. DEDICATED ACADEMY WINGS: /engineering & /doctor */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Choose Your Route
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Two Dedicated Learning Wings
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Each academy wing opens its own tailored workspace, navigation, curriculum structure, and specialized labs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* /engineering Card */}
            <div className="rounded-3xl border border-indigo-200/80 dark:border-indigo-900/60 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        ROUTE: /engineering
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                        Engineering &amp; AI Academy
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {engineeringStats.tracksCount} Core Tracks
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Structured progression from mathematical foundations and Python/Java programming to Machine Learning, Deep Learning, Transformers, RAG, Autonomous Agents, and Production MLOps.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Complete AI &amp; ML (Phases 0–11)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>DSA Mastery (13 Topics)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Python Mastery (Pyodide Lab)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Java &amp; JVM Concurrency Lab</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/engineering"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                >
                  <span>Open Engineering Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/curriculum"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                >
                  <Brain className="w-3.5 h-3.5 text-indigo-500" />
                  <span>AI &amp; ML Curriculum</span>
                </Link>
              </div>
            </div>

            {/* /doctor Card */}
            <div className="rounded-3xl border border-teal-200/80 dark:border-teal-900/60 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400">
                        ROUTE: /doctor
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                        Doctor (MBBS) · MedVerse 3D
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    4 Prof Phases · {MBBS_CURRICULUM_STATS.subjectsCount} Subjects
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Real interactive Three.js 3D anatomical models, synchronized physiological timeline animations, concise 60s/2m/full MBBS notes, synthetic clinical vignettes, and SM-2 flashcard retention across the NMC CBME hierarchy.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>Heart &amp; 242-Bone Skeleton GLBs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>Timeline Scientific Animations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>60s / 2m / Full Referenced Notes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>MCQs, Cases &amp; Admin Studio</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/doctor"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors"
                >
                  <span>Open Doctor / MedVerse 3D</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/doctor/anatomy"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                >
                  <Box className="w-3.5 h-3.5 text-teal-500" />
                  <span>Launch 3D Atlas</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COMPLETE PLATFORM TOOLS & ENGINES DIRECTORY */}
        <section id="platform-tools" className="space-y-8 scroll-mt-20">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Every Interactive Tool Included in AzurLearn
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Explore all coding sandboxes, mathematical visualizers, 3D anatomical atlases, animation timelines, spaced-repetition engines, and assessment suites directly from here.
            </p>
          </div>

          {/* Engineering Tools Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Code2 className="w-4 h-4" />
                <span>Engineering &amp; AI Tools</span>
              </h3>
              <Link
                href="/engineering"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                Go to /engineering <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {engineeringTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-indigo-400 dark:hover:border-indigo-700 transition-all shadow-xs flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {tool.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tool.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                      Open Tool <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Doctor / MedVerse 3D Tools Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                <Stethoscope className="w-4 h-4" />
                <span>Doctor (MBBS) &amp; MedVerse 3D Tools</span>
              </h3>
              <Link
                href="/doctor"
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
              >
                Go to /doctor <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicalTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-teal-400 dark:hover:border-teal-700 transition-all shadow-xs flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800">
                          {tool.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {tool.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                      Launch Tool <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. SHARED INFRASTRUCTURE & LEARNING METHODOLOGY */}
        <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              How the Platform Works
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Built Around Active Understanding, Never Static Slides
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-4 space-y-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Real Simulation &amp; Execution
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Real Python WebAssembly (Pyodide), Three.js GLB WebGL scenes, and synchronized animation clocks replace mock previews.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-4 space-y-2">
              <CheckSquare className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Honest Curriculum Telemetry
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every subject and topic tracks real recorded accuracy and explicit editorial statuses without fabricated completion metrics.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-4 space-y-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                SM-2 Spaced Repetition
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Interval scheduling across both Engineering and MBBS flashcard decks prioritizes cards you need to reinforce next.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-4 space-y-2">
              <BarChart2 className="w-5 h-5 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Unified Progress &amp; Bookmarks
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                View cross-topic completion in{' '}
                <Link href="/analytics" className="text-indigo-600 dark:text-indigo-400 underline">
                  Analytics
                </Link>{' '}
                and keep personal{' '}
                <Link href="/notes" className="text-indigo-600 dark:text-indigo-400 underline">
                  Study Notes
                </Link>{' '}
                synced with PostgreSQL when signed in.
              </p>
            </div>
          </div>
        </section>

        {/* 5. FINAL DUAL-ROUTE CALL TO ACTION */}
        <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-600 text-white p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full">
              <Award className="w-3.5 h-3.5" /> Start Learning Today
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pick Your Academy Wing and Start Building or Exploring
            </h2>
            <p className="text-xs sm:text-sm text-white/90">
              Jump straight into the interactive Coding &amp; AI Engineering Academy or launch MedVerse 3D for MBBS Anatomy &amp; Physiology.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/engineering"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs sm:text-sm transition-colors shadow-sm"
            >
              <Cpu className="w-4 h-4" />
              <span>Go to /engineering</span>
            </Link>
            <Link
              href="/doctor"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950/90 hover:bg-slate-950 text-white font-bold text-xs sm:text-sm transition-colors border border-white/20"
            >
              <Stethoscope className="w-4 h-4 text-teal-300" />
              <span>Go to /doctor</span>
            </Link>
          </div>
        </section>
      </div>

      <PlatformFooter />
    </div>
  );
};
