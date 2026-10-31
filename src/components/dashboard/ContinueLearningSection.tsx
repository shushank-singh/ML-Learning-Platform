'use client';

import React from 'react';
import Link from 'next/link';
import {
  Play,
  Clock,
  Flame,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Compass,
  Sparkles,
  Bookmark,
  Award,
} from 'lucide-react';
import {
  ResumeLessonInfo,
  getMLProgress,
  getDSAProgress,
  getPythonProgress,
  getJavaProgress,
} from '@/data/learningPlatformConfig';
import { UserProgressState } from '@/lib/types';

interface ContinueLearningSectionProps {
  progress: UserProgressState | null;
  resumeLesson: ResumeLessonInfo | null;
}

export const ContinueLearningSection: React.FC<ContinueLearningSectionProps> = ({
  progress,
  resumeLesson,
}) => {
  // Count real completed lessons
  const completedCount = progress
    ? Object.values(progress.completedLessons).filter(Boolean).length
    : 0;

  const hasActivity = completedCount > 0 || resumeLesson !== null;

  const mlStats = getMLProgress(progress);
  const dsaStats = getDSAProgress(progress);
  const pythonStats = getPythonProgress(progress);
  const javaStats = getJavaProgress(progress);

  return (
    <section id="continue-learning" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Learning Session</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Continue Your Journey
          </h2>
        </div>
      </div>

      {hasActivity ? (
        /* State 1: Active Progress State */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Active Lesson Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm dark:shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Where You Left Off</span>
                </span>
                {resumeLesson && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
                    {resumeLesson.trackTitle}
                  </span>
                )}
              </div>

              {resumeLesson ? (
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    {resumeLesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    Pick up right where you were. Your bookmarks, interactive visualizer states, and quiz checkpoints are saved locally.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    Active Study Session
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    You have active study records. Select any curriculum topic to dive straight back into deep work.
                  </p>
                </div>
              )}

              {/* Progress Bar for Active Track */}
              {resumeLesson && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      Current Track Completion: {resumeLesson.trackTitle}
                    </span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {resumeLesson.completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${resumeLesson.completionPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>{completedCount} total completed</span>
                </span>
                {progress?.bookmarks && progress.bookmarks.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Bookmark className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span>{progress.bookmarks.length} saved</span>
                  </span>
                )}
              </div>

              {resumeLesson ? (
                <Link
                  href={resumeLesson.route}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-md group"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume Lesson</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <a
                  href="#learning-paths"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
                >
                  <span>Select Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Per-Track Real Statistics */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm dark:shadow-md space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Track-by-Track Status
              </h4>

              <div className="space-y-3.5">
                {/* ML Track */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Complete AI & ML</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {mlStats.completedLessons}/{mlStats.totalLessons} ({mlStats.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${mlStats.percentage}%` }}
                    />
                  </div>
                </div>

                {/* DSA Track */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">DSA Mastery</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {dsaStats.completedLessons}/{dsaStats.totalLessons} ({dsaStats.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-violet-500"
                      style={{ width: `${dsaStats.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Python Track */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Python Mastery</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {pythonStats.completedLessons}/{pythonStats.totalLessons} ({pythonStats.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${pythonStats.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Java Track */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Java Mastery</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {javaStats.completedLessons}/{javaStats.totalLessons} ({javaStats.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${javaStats.percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Learning Streak & Study Minutes */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block">Daily Streak</span>
                  <span className="font-mono font-bold text-amber-500 dark:text-amber-400 text-sm">
                    {progress?.streak?.currentStreak || 1} days
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase block">Time Studied</span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm">
                    {progress?.totalMinutesLearned || 45} mins
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* State 2: Friendly Empty State when Progress is Unavailable */
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8 sm:p-12 text-center space-y-6 shadow-sm dark:shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
            <Compass className="w-8 h-8" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              Ready to Begin Your Learning Journey?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              You haven&apos;t started any lessons yet. No signup or account is required — your progress, streaks, code exercises, and bookmarks will automatically persist in your local browser as you learn.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#learning-paths"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Learning Paths</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/curriculum/module-0/m0-l1"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Start Complete AI & ML</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 max-w-lg mx-auto flex items-center justify-center gap-6 text-xs text-slate-500">
            <span>✓ Complete AI &amp; ML Academy</span>
            <span>✓ 626 In-Depth Lessons</span>
            <span>✓ Zero Setup Required</span>
          </div>
        </div>
      )}
    </section>
  );
};
