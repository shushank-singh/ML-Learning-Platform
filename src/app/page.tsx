'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
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
import { InteractiveCodingHub } from '@/components/dashboard/InteractiveCodingHub';
import { LearningJourneyRoadmap } from '@/components/dashboard/LearningJourneyRoadmap';
import { ProjectShowcaseSection } from '@/components/dashboard/ProjectShowcaseSection';
import { FinalCTASection } from '@/components/dashboard/FinalCTASection';
import { PlatformFooter } from '@/components/dashboard/PlatformFooter';

export default function PlatformDashboardPage() {
  const { user } = useAuth();
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-10 sm:space-y-16 lg:space-y-24">
        {user ? (
          /* ========================================================================= */
          /* AUTHENTICATED LEARNER DASHBOARD (COMMAND CENTER)                           */
          /* ========================================================================= */
          <>
            {/* 1. Personalized Workspace Banner & Live Progress */}
            <LoggedInDashboardBanner
              progress={progress}
              resumeLesson={resumeLesson}
              overallStats={{
                totalLessons: overallStats.totalLessons,
                completedLessons: overallStats.completedLessons,
                percentage: overallStats.percentage,
              }}
            />

            {/* 2. Full Learning Track Explorer (AI & ML, DSA, Python, Java, Practice) */}
            <LearningTracksShowcase progress={progress} />

            {/* 3. In-Browser Interactive Coding Hub (Python Pyodide, Java OpenJDK, DSA) */}
            <InteractiveCodingHub />

            {/* 4. Interactive Learning Journey Roadmap */}
            <LearningJourneyRoadmap />

            {/* 5. Real-World Production Projects & Portfolios */}
            <ProjectShowcaseSection />
          </>
        ) : (
          /* ========================================================================= */
          /* PUBLIC HOMEPAGE (ACADEMY DISCOVERY & FEATURE SHOWCASE)                    */
          /* ========================================================================= */
          <>
            {/* 1. Public Hero Section */}
            <HeroSection
              totalLessons={overallStats.totalLessons}
              totalModules={overallStats.totalModules}
              tracksCount={overallStats.tracksCount}
              resumeLesson={resumeLesson}
            />

            {/* 2. Learning Tracks Showcase */}
            <LearningTracksShowcase progress={progress} />

            {/* 3. Why Learn Here (Interactive Feature Grid) */}
            <WhyLearnHereSection />

            {/* 4. In-Browser Interactive Coding Hub */}
            <InteractiveCodingHub />

            {/* 5. Learning Journey Roadmap */}
            <LearningJourneyRoadmap />

            {/* 6. Capstone Projects Showcase */}
            <ProjectShowcaseSection />

            {/* 7. Public Call-to-Action */}
            <FinalCTASection />
          </>
        )}
      </div>

      {/* Academy Platform Footer */}
      <PlatformFooter />
    </div>
  );
}
