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
import { LoggedInDashboardBanner } from '@/components/dashboard/LoggedInDashboardBanner';
import { LearningTracksShowcase } from '@/components/dashboard/LearningTracksShowcase';
import { WhyLearnHereSection } from '@/components/dashboard/WhyLearnHereSection';
import { LearningJourneyRoadmap } from '@/components/dashboard/LearningJourneyRoadmap';
import { ProjectShowcaseSection } from '@/components/dashboard/ProjectShowcaseSection';
import { FinalCTASection } from '@/components/dashboard/FinalCTASection';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16 sm:space-y-24">
        {/* Section 0: Logged-in Personal Banner (Shown when authenticated) */}
        <LoggedInDashboardBanner
          progress={progress}
          resumeLesson={resumeLesson}
          overallStats={{
            totalLessons: overallStats.totalLessons,
            completedLessons: overallStats.completedLessons,
            percentage: overallStats.percentage,
          }}
        />

        {/* Section A: Hero Section */}
        <HeroSection
          totalLessons={overallStats.totalLessons}
          totalModules={overallStats.totalModules}
          tracksCount={overallStats.tracksCount}
          resumeLesson={resumeLesson}
        />

        {/* Section B: Learning Tracks Showcase (8 AI & ML Tracks + Complementary Labs) */}
        <LearningTracksShowcase progress={progress} />

        {/* Section C: Why Learn Here? (6 Interactive Core Features) */}
        <WhyLearnHereSection />

        {/* Section D: Learning Journey Roadmap (Sequential Stepper) */}
        <LearningJourneyRoadmap />

        {/* Section E: Real-World Project Showcase */}
        <ProjectShowcaseSection />

        {/* Section F: Final Call to Action */}
        <FinalCTASection />
      </div>

      {/* Section G: Academy Platform Footer */}
      <PlatformFooter />
    </div>
  );
}
