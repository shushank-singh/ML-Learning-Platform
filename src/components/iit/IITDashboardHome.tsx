'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  GraduationCap,
  Flame,
  BookOpen,
  Calculator,
  CheckSquare,
  ClipboardCheck,
  CalendarClock,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Play,
  Target,
  TrendingUp,
} from 'lucide-react';
import { IIT_CURRICULUM_STATS } from '@/data/iit';
import {
  getIITProgress,
  setIITPreferences,
  syncIITProgressFromCloud,
} from '@/lib/iit/progress';
import { computeIITDashboardMetrics } from '@/lib/iit/analytics';
import { useAuth } from '@/context/AuthContext';
import { IITStudentProfile, IITTargetExam, IITUserProgress } from '@/types/iit';

const EXAM_MODES: IITTargetExam[] = ['Both', 'JEE Main', 'JEE Advanced'];
const STUDENT_PROFILES: IITStudentProfile[] = ['Class 11', 'Class 12', 'Dropper', 'Crash Revision'];

export const IITDashboardHome: React.FC = () => {
  const { user, profile } = useAuth();
  const [progress, setProgress] = useState<IITUserProgress | null>(null);

  useEffect(() => {
    const sync = () => setProgress(getIITProgress());
    sync();
    window.addEventListener('iit_progress_updated', sync);
    if (user) {
      void syncIITProgressFromCloud();
    }
    return () => window.removeEventListener('iit_progress_updated', sync);
  }, [user]);

  const metrics = useMemo(
    () => (progress ? computeIITDashboardMetrics(progress) : null),
    [progress]
  );

  const chartData = useMemo(() => {
    if (!metrics) return [];
    return metrics.subjectProgress.map((sp) => ({
      subject: sp.label,
      Completion: sp.completionPct,
      Accuracy: sp.accuracyPct ?? 0,
    }));
  }, [metrics]);

  const displayName =
    profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* 1. HERO + EXAM / PROFILE SELECTOR */}
      <section className="rounded-3xl border border-amber-200/80 dark:border-amber-900/50 bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>IIT JEE Preparation Platform{displayName ? ` · ${displayName}` : ''}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Learn Concepts. Master Problems.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-300">
                Crack JEE.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Complete Class 11 &amp; 12 Physics, Chemistry, and Mathematics mapped separately to the official JEE Main and JEE Advanced syllabi with KaTeX derivations, PYQs, CBT mock tests, SM-2 revision, and an IIT AI Tutor.
            </p>
          </div>

          {/* Exam & Track Switchers */}
          {progress && (
            <div className="space-y-2.5 shrink-0 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Target Examination
                </span>
                <div className="flex flex-wrap gap-1">
                  {EXAM_MODES.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setIITPreferences({ targetExam: mode })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                        progress.targetExam === mode
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                  Study Profile
                </span>
                <div className="flex flex-wrap gap-1">
                  {STUDENT_PROFILES.map((sp) => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => setIITPreferences({ studentProfile: sp })}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                        progress.studentProfile === sp
                          ? 'bg-slate-900 dark:bg-amber-500/20 text-white dark:text-amber-300 border border-slate-900 dark:border-amber-500/40'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2.5">
          {metrics?.continueChapter ? (
            <Link
              href={`/iit/chapters/${metrics.continueChapter.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Continue: {metrics.continueChapter.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/iit/syllabus"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Full JEE Syllabus ({IIT_CURRICULUM_STATS.totalChapters} Chapters)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}

          <Link
            href="/iit/mock-tests"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Take Mock Test ({IIT_CURRICULUM_STATS.totalMockTests})</span>
          </Link>

          <Link
            href="/iit/formulas"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-500" />
            <span>Formula Vault ({IIT_CURRICULUM_STATS.totalFormulas})</span>
          </Link>

          <Link
            href="/iit/ai-tutor"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500/15 hover:bg-slate-800 text-white dark:text-amber-300 border border-slate-800 dark:border-amber-500/30 text-xs font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>IIT AI Tutor</span>
          </Link>
        </div>
      </section>

      {/* 2. REAL DERIVED METRICS GRID */}
      <section aria-label="Student Progress Metrics" className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Syllabus Completion
          </span>
          <div className="text-2xl font-mono font-extrabold text-amber-600 dark:text-amber-400">
            {metrics?.overallCompletionPct ?? 0}%
          </div>
          <p className="text-[11px] text-slate-500">
            {metrics?.completedChaptersCount ?? 0} done · {metrics?.remainingChaptersCount ?? 0} remaining
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Daily Study Streak
          </span>
          <div className="text-2xl font-mono font-extrabold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
            <Flame className="w-5 h-5" />
            <span>{metrics?.currentStreakDays ?? 0}d</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Best: {metrics?.longestStreakDays ?? 0}d · {metrics?.totalStudyMinutes ?? 0}m logged
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Questions &amp; Accuracy
          </span>
          <div className="text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
            {metrics?.overallAccuracyPct !== null && metrics?.overallAccuracyPct !== undefined
              ? `${metrics.overallAccuracyPct}%`
              : '—'}
          </div>
          <p className="text-[11px] text-slate-500">
            {metrics?.questionsCorrect ?? 0}/{metrics?.questionsAttempted ?? 0} attempts correct
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Revision Queue
          </span>
          <div className="text-2xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
            {metrics?.dueFlashcardsCount ?? 0}
          </div>
          <p className="text-[11px] text-slate-500">
            SM-2 cards due · {metrics?.upcomingRevisionTasksCount ?? 0} tasks
          </p>
        </div>

        <div className="col-span-2 lg:col-span-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Mock Tests Taken
          </span>
          <div className="text-2xl font-mono font-extrabold text-violet-600 dark:text-violet-400">
            {metrics?.recentMockTests.length ?? 0}
          </div>
          <p className="text-[11px] text-slate-500">
            {metrics?.recentMockTests[0]
              ? `Latest: ${metrics.recentMockTests[0].score}/${metrics.recentMockTests[0].maxScore}`
              : 'No CBT mocks submitted yet'}
          </p>
        </div>
      </section>

      {/* 3. SUBJECT-WISE PROGRESS + RECHARTS VISUALIZATION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject Progress Cards */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Subject-Wise Progress
            </h2>
            <Link href="/iit/syllabus" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
              View All Chapters
            </Link>
          </div>

          <div className="space-y-4">
            {(metrics?.subjectProgress || []).map((sp) => {
              const barColor =
                sp.subject === 'physics'
                  ? 'bg-indigo-600'
                  : sp.subject === 'chemistry'
                  ? 'bg-emerald-600'
                  : 'bg-rose-600';
              return (
                <div key={sp.subject} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <Link
                      href={`/iit/syllabus?subject=${sp.subject}`}
                      className="font-bold text-slate-800 dark:text-slate-100 hover:text-amber-600"
                    >
                      {sp.label}
                    </Link>
                    <span className="font-mono text-slate-600 dark:text-slate-400">
                      {sp.completedChapters}/{sp.totalChapters} ch ({sp.completionPct}%) · Accuracy:{' '}
                      {sp.accuracyPct !== null ? `${sp.accuracyPct}%` : '—'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor} transition-all duration-300`}
                      style={{ width: `${sp.completionPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommended Next Topic */}
          {metrics?.recommendedNextChapter && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    <Target className="w-3 h-3" /> Recommended Next Topic
                  </span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {metrics.recommendedNextChapter.title}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                    Class {metrics.recommendedNextChapter.classLevel} · {metrics.recommendedNextChapter.weightage} Weightage
                  </p>
                </div>
                <Link
                  href={`/iit/chapters/${metrics.recommendedNextChapter.id}`}
                  className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shrink-0"
                >
                  Start
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Recharts Subject Accuracy & Completion */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Subject Completion vs Accuracy (%)</span>
            </h2>
            <Link href="/iit/analytics" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
              Full Analytics
            </Link>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="Completion" fill="#d97706" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Accuracy" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 4. WEAK CHAPTERS, RECENT MOCK TESTS & UPCOMING REVISION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Weak Chapters */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Weak Chapters (&lt;65% Accuracy)</span>
            </h3>
          </div>

          {!metrics || metrics.weakChapters.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed py-4">
              {metrics?.questionsAttempted
                ? 'No weak chapters detected yet — all attempted chapters are at 65%+ accuracy.'
                : 'Attempt chapter practice questions or PYQs to automatically identify weak chapters.'}
            </p>
          ) : (
            <div className="space-y-2">
              {metrics.weakChapters.map((wk) => (
                <Link
                  key={wk.chapter.id}
                  href={`/iit/chapters/${wk.chapter.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 hover:border-rose-400 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {wk.chapter.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {wk.correct}/{wk.attempts} correct
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                    {wk.accuracyPct}%
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Mock Test Scores */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ClipboardCheck className="w-4 h-4 text-indigo-500" />
              <span>Recent Mock Test Scores</span>
            </h3>
            <Link href="/iit/mock-tests" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
              All Tests
            </Link>
          </div>

          {!metrics || metrics.recentMockTests.length === 0 ? (
            <div className="py-4 space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No mock tests attempted yet. Launch an NTA CBT-style mock test to track real score trends.
              </p>
              <Link
                href="/iit/mock-tests"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold"
              >
                Launch Mock Test <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {metrics.recentMockTests.map((mt) => (
                <div
                  key={mt.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {mt.title}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {mt.examPattern} · {mt.accuracyPct}% accuracy
                    </p>
                  </div>
                  <span className="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400 shrink-0">
                    {mt.score}/{mt.maxScore}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Revision Sessions */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CalendarClock className="w-4 h-4 text-emerald-500" />
              <span>Upcoming Revision Sessions</span>
            </h3>
            <Link href="/iit/planner" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
              Open Planner
            </Link>
          </div>

          <div className="space-y-2">
            <Link
              href="/iit/planner"
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  SM-2 Spaced Repetition Queue
                </p>
                <p className="text-[11px] text-slate-500">
                  {metrics?.dueFlashcardsCount ?? 0} formula &amp; concept cards due today
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            </Link>

            {(progress?.revisionTasks || [])
              .filter((t) => !t.completed)
              .slice(0, 3)
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate pr-2">
                    {task.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {task.dueDate}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 5. QUICK MODULE LAUNCHPAD */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/iit/syllabus"
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500 space-y-1.5 transition-colors"
        >
          <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Syllabus Explorer ({IIT_CURRICULUM_STATS.totalChapters} Ch)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Course → Subject → Class → Unit → Chapter → Topic → Lesson.
          </p>
        </Link>

        <Link
          href="/iit/practice"
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500 space-y-1.5 transition-colors"
        >
          <CheckSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            PYQ &amp; Practice Bank ({IIT_CURRICULUM_STATS.totalQuestions})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Verified Main &amp; Advanced SCQ, multi-correct &amp; integer questions.
          </p>
        </Link>

        <Link
          href="/iit/formulas"
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 space-y-1.5 transition-colors"
        >
          <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            KaTeX Formula Vault ({IIT_CURRICULUM_STATS.totalFormulas})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Searchable formula sheets for rapid pre-exam revision.
          </p>
        </Link>

        <Link
          href="/iit/ai-tutor"
          className="p-4 rounded-2xl border border-amber-200 dark:border-amber-800/70 bg-gradient-to-br from-amber-50/70 to-white dark:from-amber-950/30 dark:to-slate-900 hover:border-amber-500 space-y-1.5 transition-colors"
        >
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            IIT JEE AI Tutor
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Step-by-step Physics, Chemistry &amp; Maths doubt resolution.
          </p>
        </Link>
      </section>
    </div>
  );
};
