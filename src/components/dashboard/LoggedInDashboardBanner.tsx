'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Play,
  Flame,
  Clock,
  CheckCircle2,
  BookOpen,
  Terminal,
  Zap,
  ArrowRight,
  TrendingUp,
  Brain,
  Cpu,
  Bot,
  Activity,
  Server,
  Compass,
  Briefcase,
  Bookmark,
  Award,
  CheckSquare,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserProgressState } from '@/lib/types';
import { ResumeLessonInfo } from '@/data/learningPlatformConfig';
import {
  MODULES_CATALOG_ML_CORE,
  MODULES_CATALOG_DEEP_LEARNING,
  MODULES_CATALOG_TRANSFORMERS,
  MODULES_CATALOG_GENAI,
  MODULES_CATALOG_RAG,
  MODULES_CATALOG_AGENTS,
  MODULES_CATALOG_MLOPS,
  MODULES_CATALOG_DEPLOYMENT,
} from '@/data/modules/curriculum';
import {
  MLIllustration,
  DLIllustration,
  TransformersIllustration,
  GenAIIllustration,
  RAGIllustration,
  AgentsIllustration,
  MLOpsIllustration,
  DeploymentIllustration,
} from '@/components/shared/TrackIllustrations';

interface LoggedInDashboardBannerProps {
  progress: UserProgressState | null;
  resumeLesson: ResumeLessonInfo | null;
  overallStats: {
    totalLessons: number;
    completedLessons: number;
    percentage: number;
  };
}

export const LoggedInDashboardBanner: React.FC<LoggedInDashboardBannerProps> = ({
  progress,
  resumeLesson,
  overallStats,
}) => {
  const { user, profile, isEmailVerified } = useAuth();
  const [selectedTrackTab, setSelectedTrackTab] = useState<'all' | 'in-progress'>('all');

  if (!user) {
    return null;
  }

  const displayName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Learner';
  const initial = displayName.charAt(0).toUpperCase();

  // Dynamic time-of-day greeting
  const currentHour = new Date().getHours();
  const timeGreeting =
    currentHour < 12
      ? 'Good morning'
      : currentHour < 18
      ? 'Good afternoon'
      : 'Good evening';

  // Helper to compute stats for each track
  const getTrackStats = (lessons: { id: string }[]) => {
    const total = lessons.length;
    if (!progress || total === 0) return { completed: 0, total, pct: 0 };
    const completed = lessons.filter((l) => Boolean(progress.completedLessons[l.id])).length;
    return {
      completed,
      total,
      pct: Math.round((completed / total) * 100),
    };
  };

  const TRACKS_METRICS = [
    {
      id: 'ml-core',
      title: 'Machine Learning',
      subtitle: 'Foundations to Ensembles',
      icon: Brain,
      color: 'indigo',
      route: '/curriculum',
      illustration: <MLIllustration className="w-full h-32 rounded-xl object-cover" />,
      stats: getTrackStats(MODULES_CATALOG_ML_CORE.flatMap((m) => m.lessons)),
      modulesCount: MODULES_CATALOG_ML_CORE.length,
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning',
      subtitle: 'Perceptrons to CNNs & PyTorch',
      icon: Cpu,
      color: 'violet',
      route: '/curriculum/dl-module-1',
      illustration: <DLIllustration className="w-full h-32 rounded-xl object-cover" />,
      stats: getTrackStats(MODULES_CATALOG_DEEP_LEARNING.flatMap((m) => m.lessons)),
      modulesCount: MODULES_CATALOG_DEEP_LEARNING.length,
    },
    {
      id: 'transformers',
      title: 'Transformers',
      subtitle: 'Attention & Foundation Models',
      icon: Layers,
      color: 'cyan',
      route: '/curriculum/tf-module-1',
      illustration: <TransformersIllustration className="w-full h-32 rounded-xl object-cover" />,
      stats: getTrackStats(MODULES_CATALOG_TRANSFORMERS.flatMap((m) => m.lessons)),
      modulesCount: MODULES_CATALOG_TRANSFORMERS.length,
    },
    {
      id: 'genai',
      title: 'Generative AI',
      subtitle: 'LLMs, Sampling & Fine-Tuning',
      icon: Sparkles,
      color: 'pink',
      route: '/curriculum/genai-module-1',
      illustration: <GenAIIllustration className="w-full h-32 rounded-xl object-cover" />,
      stats: getTrackStats(MODULES_CATALOG_GENAI.flatMap((m) => m.lessons)),
      modulesCount: MODULES_CATALOG_GENAI.length,
    },
    {
      id: 'rag',
      title: 'Retrieval Augmented Gen',
      subtitle: 'Vector DBs, Hybrid Search & Rerankers',
      icon: Zap,
      color: 'amber',
      route: '/curriculum/rag-module-1',
      illustration: <RAGIllustration className="w-full h-32 rounded-xl object-cover" />,
      stats: getTrackStats(MODULES_CATALOG_RAG.flatMap((m) => m.lessons)),
      modulesCount: MODULES_CATALOG_RAG.length,
    },
    {
      id: 'agents',
      title: 'AI Agents',
      subtitle: 'ReAct, Multi-Agent & Tool Calling',
      icon: Bot,
      color: 'blue',
      route: '/curriculum/agent-module-1',
      illustration: <AgentsIllustration className="w-full h-32 rounded-xl object-cover" />,
      stats: getTrackStats(MODULES_CATALOG_AGENTS.flatMap((m) => m.lessons)),
      modulesCount: MODULES_CATALOG_AGENTS.length,
    },
    {
      id: 'mlops',
      title: 'MLOps & LLMOps',
      subtitle: 'Pipelines, Drift, CI/CD & Tracking',
      icon: Activity,
      color: 'emerald',
      route: '/curriculum/mlops-module-1',
      illustration: <MLOpsIllustration className="w-full h-32 rounded-xl object-cover" />,
      stats: getTrackStats(MODULES_CATALOG_MLOPS.flatMap((m) => m.lessons)),
      modulesCount: MODULES_CATALOG_MLOPS.length,
    },
    {
      id: 'deployment',
      title: 'AI Deployment',
      subtitle: 'vLLM, Cloud Serving & Production',
      icon: Server,
      color: 'rose',
      route: '/curriculum/deployment-module-1',
      illustration: <DeploymentIllustration className="w-full h-32 rounded-xl object-cover" />,
      stats: getTrackStats(MODULES_CATALOG_DEPLOYMENT.flatMap((m) => m.lessons)),
      modulesCount: MODULES_CATALOG_DEPLOYMENT.length,
    },
  ];

  // Count active tracks (where completed > 0)
  const activeTracksCount = TRACKS_METRICS.filter((t) => t.stats.completed > 0).length;
  const bookmarkedCount = progress?.bookmarks?.length || 0;
  const quizScoresCount = progress?.quizScores ? Object.keys(progress.quizScores).length : 0;

  // Filtered tracks
  const displayedTracks =
    selectedTrackTab === 'in-progress'
      ? TRACKS_METRICS.filter((t) => t.stats.completed > 0)
      : TRACKS_METRICS;

  return (
    <section className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. PERSONALIZED WORKSPACE HEADER */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-200/90 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/90 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-950 p-4 sm:p-8 shadow-sm">
        {/* Subtle decorative glowing blob */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: User Identity & Greeting */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
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
                    {timeGreeting}, {displayName}!
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100/90 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase tracking-wider">
                    {profile?.role || 'Learner Workspace'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Your personalized artificial intelligence &amp; machine learning mastery hub. Track syllabus progress, execute runnable labs, and complete industry projects.
                </p>
              </div>
            </div>

            {/* Quick Action Navigation Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Link
                href="/curriculum"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>Explore Syllabus</span>
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-xs"
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                <span>Capstone Projects</span>
              </Link>

              <Link
                href="/ai-tutor"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>AI Tutor Studio</span>
              </Link>

              <Link
                href="/revision-notes"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Visual Notes</span>
              </Link>
            </div>
          </div>

          {/* Right: Primary Action / Continue Learning Callout Card */}
          <div className="p-5 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-indigo-200/90 dark:border-indigo-900/50 shadow-md max-w-md w-full space-y-3.5 shrink-0">
            {resumeLesson ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Current Active Topic</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    {resumeLesson.completionPercentage}% Complete
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                    {resumeLesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Track: <span className="font-semibold text-slate-700 dark:text-slate-300">{resumeLesson.trackTitle}</span>
                  </p>
                </div>

                {/* Animated Progress Track */}
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-violet-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${resumeLesson.completionPercentage}%` }}
                  />
                </div>

                <Link
                  href={resumeLesson.route}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Current Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Ready to Begin Learning</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Start with Phase 0 diagnostic evaluations or dive straight into Machine Learning foundations and hands-on algorithms.
                </p>
                <Link
                  href="/curriculum"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Start Phase 0 Diagnostics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. VISUAL LEARNING OVERVIEW CARDS (REAL DATABASE / STORAGE VALUES) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        {/* Metric 1: Completed Lessons */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            {overallStats.completedLessons}
            <span className="text-xs font-normal text-slate-400">/{overallStats.totalLessons}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Lessons Mastered</p>
        </div>

        {/* Metric 2: Curriculum Progress % */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Progress</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            {overallStats.percentage}%
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Total Completion</p>
        </div>

        {/* Metric 3: Active Learning Tracks */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tracks</span>
            <Brain className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            {activeTracksCount}
            <span className="text-xs font-normal text-slate-400">/8</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Active AI Tracks</p>
        </div>

        {/* Metric 4: Daily Learning Streak */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Streak</span>
            <Flame className="w-4 h-4 fill-current text-amber-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            {progress?.streak?.currentStreak || 1}d
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Consecutive Days</p>
        </div>

        {/* Metric 5: Time Invested */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Time</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            {progress?.totalMinutesLearned || 45}m
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Minutes Studied</p>
        </div>

        {/* Metric 6: Bookmarks / Quizzes */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center justify-between text-pink-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Saved</span>
            <Bookmark className="w-4 h-4 text-pink-500" />
          </div>
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            {bookmarkedCount}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Saved Formulas &amp; Topics</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. IMAGE-RICH CURRICULUM TRACK PREVIEWS WITH TECHNICAL DIAGRAMS */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Curriculum Tracks</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Mastery Tracks &amp; Active Progress
            </h2>
          </div>

          {/* Filter Tab */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setSelectedTrackTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedTrackTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All 8 Tracks
            </button>
            <button
              onClick={() => setSelectedTrackTab('in-progress')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedTrackTab === 'in-progress'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              In Progress ({activeTracksCount})
            </button>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayedTracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
                className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-800 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Technical Vector Illustration */}
                  <div className="relative overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    {track.illustration}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                      {track.modulesCount} Modules
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {track.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {track.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      {track.stats.completed} / {track.stats.total} Lessons
                    </span>
                    <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {track.stats.pct}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${track.stats.pct}%` }}
                    />
                  </div>

                  <Link
                    href={track.route}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors mt-2"
                  >
                    <span>{track.stats.completed > 0 ? 'Continue Track' : 'Explore Syllabus'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
