'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';
import {
  LEARNING_CATEGORIES,
  LearningCategoryConfig,
  LearningSectionConfig,
} from '@/data/learningPlatformConfig';
import { UserProgressState } from '@/lib/types';

interface LearningPathsSectionProps {
  progress: UserProgressState | null;
}

export const LearningPathsSection: React.FC<LearningPathsSectionProps> = ({ progress }) => {
  return (
    <section id="learning-paths" className="space-y-12 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Core Curriculum Directory</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Structured Learning Paths
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Explore all engineering disciplines organized into three primary categories. Each track features comprehensive modules, interactive visualizers, and direct links to live curriculum content.
        </p>
      </div>

      {/* The 3 Top-Level Categories */}
      <div className="space-y-10">
        {LEARNING_CATEGORIES.map((category) => (
          <CategoryContainer
            key={category.id}
            category={category}
            progress={progress}
          />
        ))}
      </div>
    </section>
  );
};

interface CategoryContainerProps {
  category: LearningCategoryConfig;
  progress: UserProgressState | null;
}

const CategoryContainer: React.FC<CategoryContainerProps> = ({ category, progress }) => {
  const CategoryIcon = category.icon;

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-lg">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-xs">
            <CategoryIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 truncate">
                {category.badge}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {category.title}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md font-medium leading-relaxed sm:text-right">
          {category.tagline}
        </p>
      </div>

      {/* Section Cards for this Category */}
      <div
        className={`grid gap-6 ${
          category.sections.length > 1
            ? 'grid-cols-1 lg:grid-cols-2'
            : 'grid-cols-1'
        }`}
      >
        {category.sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
};

interface SectionCardProps {
  section: LearningSectionConfig;
  progress: UserProgressState | null;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, progress }) => {
  const Icon = section.icon;
  const stats = section.stats;
  const progressInfo = section.getProgress(progress);
  const hasUserActivity = progressInfo.completedLessons > 0;

  return (
    <div
      className={`group relative rounded-2xl border border-slate-200 dark:${section.theme.border} hover:border-indigo-400 dark:${section.theme.borderHover} bg-white dark:bg-slate-900/90 hover:bg-slate-50/80 dark:${section.theme.bgHover} p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md dark:shadow-md dark:hover:shadow-xl`}
    >
      <div className="space-y-5">
        {/* Card Header & Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${section.theme.iconBg} group-hover:scale-105 transition-transform shrink-0 shadow-xs`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${section.theme.badgeBg} ${section.theme.badgeText}`}
                >
                  {section.badge}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors mt-0.5">
                {section.title}
              </h4>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
          {section.shortDescription}
        </p>

        {/* Real Progress Bar */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Section Progress</span>
            </span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
              {progressInfo.percentage}% ({progressInfo.completedLessons}/{progressInfo.totalLessons} lessons)
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${section.theme.progressBar}`}
              style={{ width: `${progressInfo.percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <span>
              {hasUserActivity
                ? `${progressInfo.completedLessons} completed`
                : 'Not started yet'}
            </span>
            <span>{stats.estimatedHours} study hours</span>
          </div>
        </div>

        {/* Key Highlights / Curriculum Pillars */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            What You Will Master
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {section.highlights.slice(0, 4).map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-100/70 dark:bg-slate-800/40 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800/60"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                <span className="truncate">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch Shortcuts */}
        {section.quickLinks && section.quickLinks.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            {section.quickLinks.slice(0, 4).map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700/60"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Metadata and Primary CTA */}
      <div className="pt-5 mt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>{stats.totalModules} Modules</span>
          <span>·</span>
          <span>{stats.totalLessons} Lessons</span>
        </div>

        <Link
          href={section.route}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-950 font-bold text-xs transition-all shadow-sm hover:shadow-md group/btn"
        >
          <span>{hasUserActivity ? 'Continue Section' : section.primaryActionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
