'use client';

import React from 'react';
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
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserProgressState } from '@/lib/types';
import { ResumeLessonInfo } from '@/data/learningPlatformConfig';

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
  const { user, profile } = useAuth();

  if (!user) {
    return null;
  }

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Learner';

  return (
    <div className="rounded-3xl border border-indigo-200/90 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Personal Greeting & Stats */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  Welcome back, {displayName}!
                </h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase">
                  {profile?.role || 'Learner'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Continue your journey across the AzurLearn curriculum.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-current" />
              <span>{progress?.streak.currentStreak || 1} Day Streak</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{progress?.totalMinutesLearned || 45} Minutes Studied</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{overallStats.completedLessons} / {overallStats.totalLessons} Lessons ({overallStats.percentage}%)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Active Resume Card */}
        {resumeLesson ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-md max-w-md w-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Current Lesson in Progress
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {resumeLesson.completionPercentage}% Complete
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                {resumeLesson.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track: {resumeLesson.trackTitle}
              </p>
            </div>

            {/* Track Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${resumeLesson.completionPercentage}%` }}
              />
            </div>

            <Link
              href={resumeLesson.route}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-md max-w-md w-full space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Start Learning</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore our structured learning tracks from ML foundations to Deep Learning, Transformers, and Production Deployment.
            </p>
            <Link
              href="/curriculum"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Curriculum Syllabus</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

