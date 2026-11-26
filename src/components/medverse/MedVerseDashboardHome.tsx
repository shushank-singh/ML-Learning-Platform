'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Stethoscope,
  Box,
  PlayCircle,
  BookOpen,
  CheckSquare,
  ClipboardCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Layers,
  Activity,
  Loader2,
  HeartPulse,
  Bone,
} from 'lucide-react';
import {
  MBBS_CURRICULUM_STATS,
  MBBS_PHASES,
  MBBS_SUBJECTS_CATALOG,
  MBBS_TOPICS_CATALOG,
  SCIENTIFIC_ANIMATIONS,
  SYNTHETIC_CLINICAL_CASES,
  MEDVERSE_FLASHCARDS,
  ANATOMY_ASSET_LIST,
} from '@/data/medverse';
import {
  computeMedVerseAccuracyStats,
  getMedVerseProgress,
  syncMedVerseProgressFromCloud,
} from '@/lib/medverse/progress';
import { useAuth } from '@/context/AuthContext';
import { MedVerseUserProgress } from '@/types/medverse';

const AnatomyGLBViewer = dynamic(
  () => import('@/components/medverse/three/AnatomyGLBViewer').then((m) => m.AnatomyGLBViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[440px] rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-2 text-xs text-slate-400">
        <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
        <span>Loading Interactive 3D Heart GLB (BodyParts3D)...</span>
      </div>
    ),
  }
);

export const MedVerseDashboardHome: React.FC = () => {
  const { user, profile } = useAuth();
  const [progress, setProgress] = useState<MedVerseUserProgress | null>(null);
  const [mount3DPreview, setMount3DPreview] = useState<boolean>(false);
  const [activePhaseTab, setActivePhaseTab] = useState<string>('all');

  useEffect(() => {
    const sync = () => setProgress(getMedVerseProgress());
    sync();
    window.addEventListener('medverse_progress_updated', sync);
    if (user) {
      void syncMedVerseProgressFromCloud();
    }
    return () => window.removeEventListener('medverse_progress_updated', sync);
  }, [user]);

  const publishedTopics = useMemo(
    () => MBBS_TOPICS_CATALOG.filter((t) => t.status === 'published'),
    []
  );

  const accuracyStats = useMemo(
    () => (progress ? computeMedVerseAccuracyStats(progress) : null),
    [progress]
  );

  const completedPublishedCount = useMemo(() => {
    if (!progress) return 0;
    return publishedTopics.filter((t) => progress.completedTopics[t.id]).length;
  }, [progress, publishedTopics]);

  const dueFlashcardsCount = useMemo(() => {
    if (!progress) return MEDVERSE_FLASHCARDS.length;
    const now = Date.now();
    return MEDVERSE_FLASHCARDS.filter((c) => {
      const rev = progress.flashcardReviews[c.id];
      return !rev || new Date(rev.nextReviewAt).getTime() <= now;
    }).length;
  }, [progress]);

  const totalStudyMinutes = useMemo(() => {
    if (!progress) return 0;
    const sec = progress.studySessions.reduce((acc, s) => acc + s.durationSeconds, 0);
    return Math.round(sec / 60);
  }, [progress]);

  const visibleSubjects = useMemo(() => {
    if (activePhaseTab === 'all') return MBBS_SUBJECTS_CATALOG;
    return MBBS_SUBJECTS_CATALOG.filter((s) => s.phaseId === activePhaseTab);
  }, [activePhaseTab]);

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    null;

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. CINEMATIC MEDVERSE 3D HERO & REAL PROGRESS OVERVIEW */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-[#0a1628] to-[#081b26] border border-teal-900/60 p-5 sm:p-8 lg:p-10 text-slate-100 shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/70 text-teal-300 text-xs font-semibold">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>MedVerse 3D · Interactive MBBS Platform</span>
              {displayName && (
                <span className="text-slate-400">· Dr. {displayName}</span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.14]">
              Explore Human Anatomy in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-violet-300">
                Real-Time 3D
              </span>{' '}
              &amp; Physiological Timelines
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Built on segmented BodyParts3D GLB assets (11 heart structures &amp; 242 skeletal bones), deterministic scientific animation timelines, referenced MBBS revision notes, SM-2 flashcards, and synthetic clinical cases.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/doctor/anatomy"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-600/25 transition-colors"
              >
                <Box className="w-4 h-4" />
                <span>Launch 3D Anatomy Atlas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/doctor/animations"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs sm:text-sm font-bold transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Animation Studio ({SCIENTIFIC_ANIMATIONS.length})</span>
              </Link>

              <Link
                href="/doctor/curriculum"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>Full NMC Syllabus</span>
              </Link>
            </div>
          </div>

          {/* Right: Real User Progress & Curriculum Truth Metrics */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Published Topics Done
              </span>
              <div className="text-2xl font-mono font-extrabold text-teal-300">
                {completedPublishedCount}/{MBBS_CURRICULUM_STATS.publishedTopicsCount}
              </div>
              <p className="text-[11px] text-slate-500">
                Of {MBBS_CURRICULUM_STATS.totalTopicsCount} total mapped topics
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Recorded MCQ Accuracy
              </span>
              <div className="text-2xl font-mono font-extrabold text-cyan-300">
                {accuracyStats?.accuracyPercentage !== null &&
                accuracyStats?.accuracyPercentage !== undefined
                  ? `${accuracyStats.accuracyPercentage}%`
                  : '—'}
              </div>
              <p className="text-[11px] text-slate-500">
                {accuracyStats?.totalAttempts || 0} recorded attempts
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                SM-2 Flashcards Due
              </span>
              <div className="text-2xl font-mono font-extrabold text-violet-300">
                {dueFlashcardsCount}
              </div>
              <p className="text-[11px] text-slate-500">
                {MEDVERSE_FLASHCARDS.length} active cards
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Logged Study Time
              </span>
              <div className="text-2xl font-mono font-extrabold text-white">
                {totalStudyMinutes}m
              </div>
              <p className="text-[11px] text-slate-500">
                {ANATOMY_ASSET_LIST.filter((a) => a.kind === 'glb_anatomical').length} GLBs ·{' '}
                {SCIENTIFIC_ANIMATIONS.length} Animations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EMBEDDED REAL 3D HEART & SKELETON VIEWPORT LAUNCHPAD */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Live WebGL Anatomy Stage
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive 3D Heart &amp; Skeleton Models
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Inspect real BodyParts3D `.glb` meshes with click-to-select, isolation, opacity, clipping plane, and FMA metadata.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/doctor/anatomy?asset=heart-bp3d"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Heart 3D (11 Parts)</span>
            </Link>
            <Link
              href="/doctor/anatomy?asset=skeleton-bp3d"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold"
            >
              <Bone className="w-3.5 h-3.5 text-amber-300" />
              <span>Skeleton 3D (242 Bones)</span>
            </Link>
          </div>
        </div>

        {mount3DPreview ? (
          <AnatomyGLBViewer assetId="heart-bp3d" compact />
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-100">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-950 border border-teal-800 text-teal-300">
                Lazy-Loaded WebGL Scene (2.52 MB GLB)
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Human Heart — BodyParts3D Segmented 3D Model
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Load the real Three.js + React Three Fiber viewport inline, or open the full-screen Anatomy Atlas for both the Heart (11 structures) and Skeleton (242 bones).
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMount3DPreview(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg"
              >
                <Box className="w-4 h-4" />
                <span>Load 3D Heart Inline</span>
              </button>
              <Link
                href="/doctor/anatomy"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold"
              >
                <span>Open Full Atlas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 3. PUBLISHED INTERACTIVE TOPICS (3D + ANIMATION + NOTES + QUIZ) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Synchronized Learning Modules ({publishedTopics.length} Published)
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive Topics Ready for Study
            </h2>
          </div>
          <Link
            href="/doctor/curriculum"
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
          >
            <span>View All {MBBS_CURRICULUM_STATS.totalTopicsCount} Curriculum Topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {publishedTopics.map((topic) => {
            const done = Boolean(progress?.completedTopics?.[topic.id]);
            return (
              <Link
                key={topic.id}
                href={`/doctor/topics/${topic.id}`}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between space-y-4 hover:border-teal-500/70 transition-all shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                      Published
                    </span>
                    {done && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {topic.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>
                    {topic.mcqCount} MCQs · {topic.flashcardCount} Cards
                  </span>
                  <span className="text-teal-600 dark:text-teal-400 font-sans font-semibold inline-flex items-center gap-1">
                    Study <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. COMPLETE NMC MBBS SUBJECTS DIRECTORY WITH HONEST STATUS */}
      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Complete NMC CBME Curriculum Architecture
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              All {MBBS_SUBJECTS_CATALOG.length} MBBS Subjects Across 4 Phases
            </h2>
          </div>

          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActivePhaseTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold ${
                activePhaseTab === 'all'
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-300 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              All ({MBBS_SUBJECTS_CATALOG.length})
            </button>
            {MBBS_PHASES.map((ph) => (
              <button
                key={ph.id}
                type="button"
                onClick={() => setActivePhaseTab(ph.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  activePhaseTab === ph.id
                    ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-300 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                {ph.shortTitle}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleSubjects.map((sub) => {
            const subTopics = MBBS_TOPICS_CATALOG.filter((t) => t.subjectId === sub.id);
            const subPub = subTopics.filter((t) => t.status === 'published').length;
            return (
              <Link
                key={sub.id}
                href="/doctor/curriculum"
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2.5 hover:border-teal-500/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                    {sub.shortCode} · {sub.nmcCodeRange}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {subPub}/{subTopics.length} published
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{sub.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {sub.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. QUICK ACCESS TOOLS: ANIMATIONS, CASES, QUIZZES, ADMIN STUDIO */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/doctor/animations"
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-cyan-500/60 space-y-2 transition-colors"
        >
          <Activity className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Scientific Animations ({SCIENTIFIC_ANIMATIONS.length})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Timeline scrubber, 0.5x–2x speed, step-by-step captions &amp; camera control.
          </p>
        </Link>

        <Link
          href="/doctor/cases"
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/60 space-y-2 transition-colors"
        >
          <ClipboardCheck className="w-5 h-5 text-emerald-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Synthetic Clinical Cases ({SYNTHETIC_CLINICAL_CASES.length})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Differential diagnosis workups linked directly to 3D anatomy &amp; MCQs.
          </p>
        </Link>

        <Link
          href="/doctor/quizzes"
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-500/60 space-y-2 transition-colors"
        >
          <CheckSquare className="w-5 h-5 text-violet-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Quizzes &amp; SM-2 Flashcards
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Topic tests, structure ID, timed practice &amp; spaced repetition.
          </p>
        </Link>

        <Link
          href="/doctor/studio"
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500/60 space-y-2 transition-colors"
        >
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Admin Content Studio
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Role-protected authoring, missing-asset audit &amp; review publishing.
          </p>
        </Link>
      </section>
    </div>
  );
};
