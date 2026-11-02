'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Play,
  Brain,
  Cpu,
  Sparkles,
  Zap,
  Terminal,
  Layers,
  Database,
  CheckCircle2,
  Activity,
  Code2,
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
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50/80 to-slate-100/90 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-lg sm:shadow-xl transition-all duration-300 p-4 sm:p-8 lg:p-12">
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/10 dark:bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.07] pointer-events-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-12 lg:items-center space-y-8 lg:space-y-0">
        {/* Left Side: Headline, Copy & Actions (col-span-7) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
          {/* Platform Tag Badge: Compact & single-line on small phones */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-indigo-50/90 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-[11px] sm:text-xs font-semibold shadow-xs max-w-full">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-bold">AzurLearn</span>
            <span className="text-indigo-300 dark:text-indigo-600">·</span>
            <span className="font-medium text-slate-600 dark:text-slate-300 truncate">
              Foundations to Production
            </span>
          </div>

          {/* Main Heading: Fluid, bold, naturally wrapping without overflowing */}
          <h1 className="text-[1.85rem] leading-[1.18] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:leading-[1.12]">
            Master AI &amp; Machine Learning,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-300">
              From Foundations
            </span>{' '}
            to Production
          </h1>

          {/* Supporting Text: Balanced, concise, highly readable on mobile */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
            Learn through visual explanations, interactive labs, practical coding, and real-world projects. Master neural networks, transformers, generative AI, RAG, AI agents, and production deployment from first principles.
          </p>

          {/* Primary & Secondary CTAs: Full-width stacked on mobile, row on tablet/desktop */}
          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
            <a
              href="#learning-tracks"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 min-h-[44px]"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Explore Learning Tracks</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>

            {resumeLesson ? (
              <Link
                href={resumeLesson.route}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all shadow-xs min-h-[44px]"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0 mr-1" />
                <Play className="w-3.5 h-3.5 fill-current text-emerald-500 shrink-0" />
                <span className="truncate max-w-[180px] sm:max-w-[200px]">
                  Resume: {resumeLesson.title}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono shrink-0">
                  {resumeLesson.completionPercentage}%
                </span>
              </Link>
            ) : (
              <Link
                href="/curriculum"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all shadow-xs min-h-[44px]"
              >
                <Brain className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Start Learning Journey</span>
              </Link>
            )}
          </div>

          {/* Compact Trust / Value Indicators using real platform features */}
          <div className="pt-4 sm:pt-6 border-t border-slate-200/90 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="space-y-0.5 sm:space-y-1 p-2 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent dark:bg-slate-800/40 sm:dark:bg-transparent">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>100+ Lessons</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Foundations to GenAI
              </p>
            </div>

            <div className="space-y-0.5 sm:space-y-1 p-2 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent dark:bg-slate-800/40 sm:dark:bg-transparent">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                <Terminal className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Browser Labs</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Zero setup WebAssembly
              </p>
            </div>

            <div className="space-y-0.5 sm:space-y-1 p-2 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent dark:bg-slate-800/40 sm:dark:bg-transparent">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                <Layers className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Real Capstones</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Production blueprints
              </p>
            </div>

            <div className="space-y-0.5 sm:space-y-1 p-2 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent dark:bg-slate-800/40 sm:dark:bg-transparent">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                <Sparkles className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                <span>AI Tutor Studio</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Instant concept support
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Responsive AI Interactive Card (col-span-5) */}
        <div className="lg:col-span-5 relative w-full overflow-hidden sm:overflow-visible">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Main Interactive AI Showcase Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-md sm:shadow-xl space-y-3 sm:space-y-4">
              {/* Card Header: Neural Net & Code Lab Status */}
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400" />
                  <span className="text-[11px] sm:text-xs font-mono font-medium text-slate-500 dark:text-slate-400 ml-1.5 sm:ml-2">
                    neural_network_lab.py
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  PyTorch Ready
                </span>
              </div>

              {/* Code Snippet Preview */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-[10px] sm:text-[11px] leading-relaxed overflow-x-auto shadow-inner">
                <p className="text-indigo-300">
                  <span className="text-pink-400">import</span> torch
                  <br />
                  <span className="text-pink-400">import</span> torch.nn <span className="text-pink-400">as</span> nn
                </p>
                <p className="mt-1.5 text-slate-400"># Multi-Head Attention Architecture</p>
                <p className="text-cyan-300">
                  model = Transformer(d_model=<span className="text-amber-300">512</span>, nhead=<span className="text-amber-300">8</span>)
                </p>
                <p className="text-slate-300">
                  loss = criterion(logits, targets)
                </p>
                <p className="text-emerald-400 font-semibold mt-1">
                  loss.backward() &nbsp;<span className="text-slate-400"># Grad computed</span>
                </p>
              </div>

              {/* Neural Network Layer Visualizer SVG */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Neural Weights &amp; Loss</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] sm:text-[11px]">
                    Loss: 0.041
                  </span>
                </div>

                {/* SVG Visual graph: Responsive ViewBox */}
                <svg className="w-full h-16 sm:h-20" viewBox="0 0 360 80" fill="none">
                  {/* Grid Lines */}
                  <line x1="10" y1="20" x2="350" y2="20" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
                  <line x1="10" y1="50" x2="350" y2="50" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />

                  {/* Neural nodes connections */}
                  <line x1="40" y1="25" x2="120" y2="20" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="1.5" />
                  <line x1="40" y1="25" x2="120" y2="45" stroke="#6366f1" strokeOpacity="0.3" strokeWidth="1.5" />
                  <line x1="40" y1="55" x2="120" y2="20" stroke="#6366f1" strokeOpacity="0.3" strokeWidth="1.5" />
                  <line x1="40" y1="55" x2="120" y2="45" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="1.5" />

                  <line x1="120" y1="20" x2="200" y2="35" stroke="#0ea5e9" strokeOpacity="0.4" strokeWidth="1.5" />
                  <line x1="120" y1="45" x2="200" y2="35" stroke="#0ea5e9" strokeOpacity="0.4" strokeWidth="1.5" />

                  {/* Loss descent curve */}
                  <path
                    d="M 210 65 Q 260 55 290 30 T 350 18"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Nodes */}
                  <circle cx="40" cy="25" r="6" fill="#4f46e5" />
                  <circle cx="40" cy="55" r="6" fill="#4f46e5" />
                  <circle cx="120" cy="20" r="6" fill="#6366f1" />
                  <circle cx="120" cy="45" r="6" fill="#6366f1" />
                  <circle cx="200" cy="35" r="7" fill="#0ea5e9" />
                  <circle cx="350" cy="18" r="5" fill="#10b981" />
                </svg>
              </div>

              {/* Floating micro-badges: Cleanly positioned on desktop, safely inline on mobile */}
              <div className="flex sm:hidden items-center justify-between gap-2 pt-1 text-[10px]">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <Database className="w-3 h-3 text-indigo-500" />
                  <span className="font-semibold">HNSW 1536d</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Cpu className="w-3 h-3" />
                  <span>&lt; 18ms Latency</span>
                </div>
              </div>
            </div>

            {/* Desktop floating micro-badges (hidden on mobile to prevent overflow) */}
            <div className="hidden sm:flex absolute -bottom-3 -left-4 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg items-center gap-2.5 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                <Database className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Vector Search
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  HNSW Index · 1536d
                </span>
              </div>
            </div>

            <div className="hidden sm:flex absolute -top-3 -right-3 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg items-center gap-2.5 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Inference
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  &lt; 18ms Latency
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
