'use client';

import React, { useState, useEffect } from 'react';
import { getProgress } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';
import {
  getOverallPlatformStats,
  resolveUserResumeLesson,
  ResumeLessonInfo,
} from '@/data/learningPlatformConfig';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { PlatformFeaturesSection } from '@/components/dashboard/PlatformFeaturesSection';
import { LearningPathsSection } from '@/components/dashboard/LearningPathsSection';
import { PlatformOverviewSection } from '@/components/dashboard/PlatformOverviewSection';
import { ContinueLearningSection } from '@/components/dashboard/ContinueLearningSection';
import { PlatformFooter } from '@/components/dashboard/PlatformFooter';

export default function PlatformDashboardPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [resumeLesson, setResumeLesson] = useState<ResumeLessonInfo | null>(null);

  useEffect(() => {
    const syncState = () => {
      const current = getProgress();
      setProgress(current);
      setResumeLesson(resolveUserResumeLesson(current));
    };

    syncState();
    window.addEventListener('ml_progress_updated', syncState);
    return () => window.removeEventListener('ml_progress_updated', syncState);
  }, []);

  const overallStats = getOverallPlatformStats(progress);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16 sm:space-y-20">
        {/* Section A: Hero Section */}
        <HeroSection
          totalLessons={overallStats.totalLessons}
          totalModules={overallStats.totalModules}
          tracksCount={overallStats.tracksCount}
          resumeLesson={resumeLesson}
        />

        {/* Section B: Platform Features (8 Capabilities) */}
        <PlatformFeaturesSection />

        {/* Section C: Learning Paths (Machine Learning, Algorithms, Programming) */}
        <LearningPathsSection progress={progress} />

        {/* Section D: Learning Platform Overview (Visual 6-Step Workflow) */}
        <PlatformOverviewSection />

        {/* Section E: Continue Learning (Resume Card or Friendly Empty State) */}
        <ContinueLearningSection
          progress={progress}
          resumeLesson={resumeLesson}
        />
      </div>

      {/* Section F: Clean Platform Footer */}
      <PlatformFooter />
    </div>
  );
}
