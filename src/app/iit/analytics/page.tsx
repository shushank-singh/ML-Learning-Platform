'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import { getIITProgress, syncIITProgressFromCloud } from '@/lib/iit/progress';
import { computeIITDashboardMetrics } from '@/lib/iit/analytics';
import { useAuth } from '@/context/AuthContext';
import { IITUserProgress } from '@/types/iit';

export default function IITAnalyticsPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<IITUserProgress | null>(null);

  useEffect(() => {
    const sync = () => setProgress(getIITProgress());
    sync();
    window.addEventListener('iit_progress_updated', sync);
    if (user) void syncIITProgressFromCloud();
    return () => window.removeEventListener('iit_progress_updated', sync);
  }, [user]);

  const metrics = useMemo(
    () => (progress ? computeIITDashboardMetrics(progress) : null),
    [progress]
  );

  const subjectChartData = useMemo(() => {
    if (!metrics) return [];
    return metrics.subjectProgress.map((sp) => ({
      name: sp.label,
      Completed: sp.completionPct,
      Accuracy: sp.accuracyPct ?? 0,
    }));
  }, [metrics]);

  const mockTrendData = useMemo(() => {
    if (!progress) return [];
    return progress.mockTestResults.map((m, idx) => ({
      attempt: `#${idx + 1}`,
      ScorePct: m.maxScore > 0 ? Math.round((m.score / m.maxScore) * 100) : 0,
      Accuracy: m.accuracyPct,
    }));
  }, [progress]);

  const studyMinutesBySubject = useMemo(() => {
    if (!progress) return [];
    const totals = { physics: 0, chemistry: 0, mathematics: 0 };
    for (const s of progress.studySessions) {
      totals[s.subject] += s.durationSeconds;
    }
    return [
      { subject: 'Physics', Minutes: Math.round(totals.physics / 60) },
      { subject: 'Chemistry', Minutes: Math.round(totals.chemistry / 60) },
      { subject: 'Mathematics', Minutes: Math.round(totals.mathematics / 60) },
    ];
  }, [progress]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-2 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Real Activity Performance Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          IIT JEE Performance &amp; Readiness Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Every chart and statistic below is derived directly from your recorded lesson completions, PYQ attempts, study sessions, and CBT mock tests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Completion vs Accuracy */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Subject Syllabus Completion vs Practice Accuracy (%)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectChartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="Completed" fill="#d97706" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Accuracy" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mock Test Score Trend */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>Mock Test Score &amp; Accuracy Trend (%)</span>
          </h2>
          {mockTrendData.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-xs text-slate-500 space-y-2">
              <p>Submit at least one CBT mock test to view your score trajectory.</p>
              <Link href="/iit/mock-tests" className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold">
                Take a Mock Test
              </Link>
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="attempt" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="ScorePct" stroke="#d97706" strokeWidth={2.5} />
                  <Line type="monotone" dataKey="Accuracy" stroke="#10b981" strokeWidth={2.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Study Time Distribution */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>Logged Study Time by Subject (Minutes)</span>
          </h2>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyMinutesBySubject}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="Minutes" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weak Chapters Breakdown */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Weak Chapters Diagnostic</span>
          </h2>
          {!metrics || metrics.weakChapters.length === 0 ? (
            <p className="text-xs text-slate-500 py-8">
              No weak chapters flagged right now. Attempt more practice problems to build chapter-level accuracy diagnostics.
            </p>
          ) : (
            <div className="space-y-2">
              {metrics.weakChapters.map((wk) => (
                <Link
                  key={wk.chapter.id}
                  href={`/iit/chapters/${wk.chapter.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {wk.chapter.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {wk.chapter.subject.toUpperCase()} · {wk.correct}/{wk.attempts} correct
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-600">{wk.accuracyPct}%</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

