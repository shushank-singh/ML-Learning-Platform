'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import { useDivision, PlatformDivision } from '@/context/DivisionContext';
import { getProgress } from '@/lib/storage';
import { UserProgressState } from '@/lib/types';
import {
  getOverallPlatformStats,
  resolveUserResumeLesson,
  ResumeLessonInfo,
} from '@/data/learningPlatformConfig';
import { AcademyDivisionSwitcher } from '@/components/dashboard/AcademyDivisionSwitcher';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { MedVerseDashboardHome } from '@/components/medverse/MedVerseDashboardHome';

// Engineering Dashboard Sections (Everything built so far)
const LearningTracksShowcase = dynamic(
  () => import('@/components/dashboard/LearningTracksShowcase').then((m) => m.LearningTracksShowcase),
  { ssr: true }
);
const WhyLearnHereSection = dynamic(
  () => import('@/components/dashboard/WhyLearnHereSection').then((m) => m.WhyLearnHereSection),
  { ssr: true }
);
const PlatformFooter = dynamic(
  () => import('@/components/dashboard/PlatformFooter').then((m) => m.PlatformFooter),
  { ssr: true }
);
const LoggedInDashboardBanner = dynamic(
  () => import('@/components/dashboard/LoggedInDashboardBanner').then((m) => m.LoggedInDashboardBanner),
  { ssr: false }
);
const InteractiveCodingHub = dynamic(
  () => import('@/components/dashboard/InteractiveCodingHub').then((m) => m.InteractiveCodingHub),
  { ssr: false }
);
const LearningJourneyRoadmap = dynamic(
  () => import('@/components/dashboard/LearningJourneyRoadmap').then((m) => m.LearningJourneyRoadmap),
  { ssr: false }
);
const ProjectShowcaseSection = dynamic(
  () => import('@/components/dashboard/ProjectShowcaseSection').then((m) => m.ProjectShowcaseSection),
  { ssr: false }
);
const FinalCTASection = dynamic(
  () => import('@/components/dashboard/FinalCTASection').then((m) => m.FinalCTASection),
  { ssr: true }
);


interface PlatformDashboardViewProps {
  forcedDivision?: PlatformDivision;
}

export const PlatformDashboardView: React.FC<PlatformDashboardViewProps> = ({ forcedDivision }) => {
  const { user } = useAuth();
  const { division: contextDivision, setDivision } = useDivision();
  const activeDivision = forcedDivision || contextDivision;

  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [resumeLesson, setResumeLesson] = useState<ResumeLessonInfo | null>(null);

  useEffect(() => {
    const syncState = () => {
      const current = getProgress();
      const hasProgress = current && Object.keys(current.completedLessons || {}).length > 0;
      if (hasProgress) {
        setProgress(current);
        setResumeLesson(resolveUserResumeLesson(current));
      }
    };

    syncState();
    window.addEventListener('ml_progress_updated', syncState);
    return () => window.removeEventListener('ml_progress_updated', syncState);
  }, []);

  const overallStats = useMemo(() => getOverallPlatformStats(progress), [progress]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8 sm:space-y-14 lg:space-y-20">
        {/* Top Dual-Academy Division Switcher (Engineering vs Doctor MBBS) */}
        <AcademyDivisionSwitcher
          division={activeDivision}
          onSelect={(next) => setDivision(next)}
          engineeringStats={{
            totalLessons: overallStats.totalLessons,
            totalModules: overallStats.totalModules,
          }}
        />

        {activeDivision === 'engineering' ? (
          /* ========================================================================= */
          /* DIVISION 1: ENGINEERING (AI & ML, DSA, PYTHON, JAVA & LABS)               */
          /* ========================================================================= */
          user ? (
            <>
              <LoggedInDashboardBanner
                progress={progress}
                resumeLesson={resumeLesson}
                overallStats={{
                  totalLessons: overallStats.totalLessons,
                  completedLessons: overallStats.completedLessons,
                  percentage: overallStats.percentage,
                }}
              />
              <LearningTracksShowcase progress={progress} />
              <InteractiveCodingHub />
              <LearningJourneyRoadmap />
              <ProjectShowcaseSection />
            </>
          ) : (
            <>
              <HeroSection
                totalLessons={overallStats.totalLessons}
                totalModules={overallStats.totalModules}
                tracksCount={overallStats.tracksCount}
                resumeLesson={resumeLesson}
              />
              <LearningTracksShowcase progress={progress} />
              <WhyLearnHereSection />
              <InteractiveCodingHub />
              <LearningJourneyRoadmap />
              <ProjectShowcaseSection />
              <FinalCTASection />
            </>
          )
        ) : (
          /* ========================================================================= */
          /* DIVISION 2: MEDVERSE 3D — INTERACTIVE MBBS MEDICAL PLATFORM               */
          /* ========================================================================= */
          <MedVerseDashboardHome />
        )}
      </div>

      {/* Academy Platform Footer */}
      <PlatformFooter />
    </div>
  );
};
