'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart2,
  AlertTriangle,
  ArrowRight,
  Brain,
  Sparkles,
  Cloud,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { getProgress } from '@/lib/storage';
import {
  syncProgressFromCloud,
  getLastCloudSyncTimestamp,
} from '@/lib/progressSync';
import { useAuth } from '@/context/AuthContext';
import { UserProgressState } from '@/lib/types';
import { MODULES_CATALOG } from '@/data/catalogs/ml';

interface TrackBucket {
  id: string;
  name: string;
  color: string;
  match: (moduleId: string) => boolean;
}

const TRACK_BUCKETS: TrackBucket[] = [
  {
    id: 'foundations',
    name: 'Foundations, Math & Data Prep',
    color: 'bg-indigo-600',
    match: (id) => ['module-0', 'module-1', 'module-2'].includes(id),
  },
  {
    id: 'classical-ml',
    name: 'Regression, Classification & Ensembles',
    color: 'bg-emerald-600',
    match: (id) => ['module-3', 'module-4', 'module-5', 'module-6'].includes(id),
  },
  {
    id: 'unsupervised-dl',
    name: 'Unsupervised ML & Deep Learning',
    color: 'bg-cyan-600',
    match: (id) => ['module-7', 'module-8', 'module-9', 'module-10', 'module-11'].includes(id) || id.startsWith('dl-'),
  },
  {
    id: 'numpy-pandas',
    name: 'NumPy & Pandas Mastery',
    color: 'bg-sky-600',
    match: (id) => id.startsWith('numpy-') || id.startsWith('pandas-'),
  },
  {
    id: 'transformers-genai',
    name: 'Transformers & Generative AI / LLMs',
    color: 'bg-violet-600',
    match: (id) => id.startsWith('tf-') || id.startsWith('genai-'),
  },
  {
    id: 'rag-agents-prod',
    name: 'RAG, AI Agents, MLOps & Deployment',
    color: 'bg-amber-600',
    match: (id) =>
      id.startsWith('rag-') ||
      id.startsWith('agent-') ||
      id.startsWith('mlops-') ||
      id.startsWith('deploy-'),
  },
];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    setLastSynced(getLastCloudSyncTimestamp());
    const handleUpdate = () => setProgress(getProgress());
    const handleSynced = () => setLastSynced(getLastCloudSyncTimestamp());
    window.addEventListener('ml_progress_updated', handleUpdate);
    window.addEventListener('ml_cloud_synced', handleSynced);
    return () => {
      window.removeEventListener('ml_progress_updated', handleUpdate);
      window.removeEventListener('ml_cloud_synced', handleSynced);
    };
  }, []);

  const handleManualSync = async () => {
    if (!user || syncing) return;
    setSyncing(true);
    await syncProgressFromCloud();
    setLastSynced(getLastCloudSyncTimestamp());
    setSyncing(false);
  };

  const allLessons = useMemo(
    () => MODULES_CATALOG.flatMap((m) => m.lessons),
    []
  );
  const totalLessons = allLessons.length;
  const completedMap = progress?.completedLessons || {};
  const completedLessons = allLessons.filter((l) => Boolean(completedMap[l.id])).length;
  const overallPct =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const quizEntries = Object.entries(progress?.quizScores || {});
  const avgQuizPct = useMemo(() => {
    if (quizEntries.length === 0) return null;
    const sum = quizEntries.reduce((acc, [, q]) => {
      return acc + (q.total > 0 ? (q.score / q.total) * 100 : 0);
    }, 0);
    return Math.round(sum / quizEntries.length);
  }, [quizEntries]);

  // Real Discipline Mastery Breakdown computed from actual lesson completions & quiz scores
  const categoryMastery = useMemo(() => {
    return TRACK_BUCKETS.map((bucket) => {
      const bucketLessons = MODULES_CATALOG.filter((m) => bucket.match(m.id)).flatMap(
        (m) => m.lessons
      );
      const total = bucketLessons.length;
      const done = bucketLessons.filter((l) => Boolean(completedMap[l.id])).length;
      const completionPct = total > 0 ? Math.round((done / total) * 100) : 0;

      const bucketQuizzes = bucketLessons
        .map((l) => progress?.quizScores?.[l.id])
        .filter((q): q is { score: number; total: number; timestamp: string } => Boolean(q && q.total > 0));
      const quizAvg =
        bucketQuizzes.length > 0
          ? Math.round(
              bucketQuizzes.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) /
                bucketQuizzes.length
            )
          : null;

      return {
        id: bucket.id,
        name: bucket.name,
        color: bucket.color,
        done,
        total,
        mastery: completionPct,
        quizAvg,
      };
    });
  }, [completedMap, progress?.quizScores]);

  // Real Weak Topics derived from quiz scores < 70%
  const weakTopicItems = useMemo(() => {
    const ids = progress?.weakTopics || [];
    return ids.map((id) => {
      const lesson = allLessons.find((l) => l.id === id);
      const quiz = progress?.quizScores?.[id];
      const pct = quiz && quiz.total > 0 ? Math.round((quiz.score / quiz.total) * 100) : null;
      return {
        id,
        title: lesson ? lesson.title : id,
        href: lesson ? `/curriculum/${lesson.moduleId}/${lesson.id}` : '/quizzes',
        scorePct: pct,
      };
    });
  }, [progress?.weakTopics, progress?.quizScores, allLessons]);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <BarChart2 className="w-4 h-4" />
            <span>Diagnostic Insights &amp; Mastery Tracking</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Learning Analytics &amp; Mastery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Real-time tracking of your completed lessons, quiz accuracy, study streak, and spaced-revision priorities.
          </p>
        </div>

        {/* Cloud Sync Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300">
            <Cloud className={`w-3.5 h-3.5 ${user && lastSynced ? 'text-emerald-500' : 'text-slate-400'}`} />
            <span>
              {user
                ? lastSynced
                  ? 'Synced to Cloud'
                  : 'Cloud Sync Ready'
                : 'Local Storage Mode'}
            </span>
          </div>
          {user && (
            <button
              onClick={handleManualSync}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs font-semibold transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-medium">Daily Streak</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-amber-500">
              {progress?.streak.currentStreak || 1}
            </span>
            <span className="text-xs text-slate-400">days active</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Longest streak: {progress?.streak.longestStreak || 1} days
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-medium">Study Time</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
              {progress?.totalMinutesLearned || 0}
            </span>
            <span className="text-xs text-slate-400">minutes</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Across interactive labs &amp; code runners
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-medium">Completed Lessons</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              {completedLessons}
            </span>
            <span className="text-xs text-slate-400">/ {totalLessons} topics</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            {overallPct}% total syllabus coverage
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-medium">Assessments Taken</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-violet-600 dark:text-violet-400">
              {quizEntries.length}
            </span>
            <span className="text-xs text-slate-400">quizzes graded</span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            {avgQuizPct !== null ? `Average score: ${avgQuizPct}%` : 'Complete a lesson quiz to track accuracy'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Real Mastery Bars */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-500" />
              <span>Discipline Mastery Breakdown</span>
            </h2>
            <span className="text-xs text-slate-400">Live Syllabus Progress</span>
          </div>

          <div className="space-y-4">
            {categoryMastery.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 gap-2">
                  <span className="truncate">{item.name}</span>
                  <span className="font-mono shrink-0 text-[11px]">
                    {item.done}/{item.total} ({item.mastery}%)
                    {item.quizAvg !== null ? ` · Quiz ${item.quizAvg}%` : ''}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            Progress updates automatically as you mark lessons complete and submit interactive quizzes.
          </div>
        </div>

        {/* Right: Weak-Topic Identification & Spaced Revision */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Targeted Spaced Revision</span>
            </div>

            {weakTopicItems.length > 0 ? (
              <>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Topics where your quiz score was below 70%. Revisit these to solidify long-term retention:
                </p>
                <div className="space-y-2.5">
                  {weakTopicItems.map((topic) => (
                    <div
                      key={topic.id}
                      className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-xs flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="font-medium truncate">{topic.title}</span>
                        {topic.scorePct !== null && (
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 shrink-0">
                            {topic.scorePct}%
                          </span>
                        )}
                      </div>
                      <Link
                        href={topic.href}
                        className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 flex items-center gap-1"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">No weak topics flagged right now</p>
                  <p className="opacity-85 leading-relaxed">
                    Any lesson quiz scored below 70% automatically appears here with a direct review link.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Retention Tip Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-950 dark:text-indigo-200 space-y-2">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Cognitive Science Principle:
            </span>
            <p className="text-[11px] leading-relaxed opacity-90">
              Deriving formulas by hand once every 3 days yields 4x higher retention than passive reading. Use our hand numerical walkthroughs and scratch Python challenges for maximum memory consolidation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
