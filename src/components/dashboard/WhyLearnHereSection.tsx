'use client';

import React from 'react';
import Link from 'next/link';
import {
  Eye,
  PlayCircle,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Sliders,
  Terminal,
  Calculator,
} from 'lucide-react';

export const WhyLearnHereSection: React.FC = () => {
  const FEATURES = [
    {
      id: 'interactive-visual-learning',
      title: 'Interactive Visual Learning',
      description:
        'Demystify complex mathematics with real-time visualizers. Adjust hyperparameters, explore attention matrices, and watch gradient descent optimize loss live in your browser.',
      icon: Eye,
      badge: 'Visual Intuition',
      route: '/playground',
      actionLabel: 'Open Visual Playground',
      color: 'indigo',
    },
    {
      id: 'hands-on-coding',
      title: 'Hands-on Browser Coding',
      description:
        'Zero setup required. Write, execute, and inspect Python and NumPy code directly in your browser powered by WebAssembly Pyodide with instant output and error traces.',
      icon: PlayCircle,
      badge: 'Zero Install Lab',
      route: '/code-lab',
      actionLabel: 'Launch Code Lab',
      color: 'cyan',
    },
    {
      id: 'practical-projects',
      title: 'Real-World Practical Projects',
      description:
        'Build end-to-end industrial applications: House Valuation pipelines, Churn Retention engines, Credit Risk models, NLP sentiment classifiers, and FastAPI Docker microservices.',
      icon: Briefcase,
      badge: 'Production Blueprints',
      route: '/projects',
      actionLabel: 'View Project Blueprints',
      color: 'violet',
    },
    {
      id: 'knowledge-checkpoints',
      title: 'Knowledge Checkpoints & Quizzes',
      description:
        'Validate your understanding at every milestone. Tackle conceptual multiple-choice questions, formula derivations, and code output predictions with comprehensive explanations.',
      icon: CheckCircle2,
      badge: 'Active Recall',
      route: '/quizzes',
      actionLabel: 'Test Your Knowledge',
      color: 'emerald',
    },
    {
      id: 'progress-tracking',
      title: 'Learning Progress Tracking',
      description:
        'Stay accountable with comprehensive progress analytics, daily study streaks, study time metrics, lesson completion meters, and personal bookmarked notes.',
      icon: TrendingUp,
      badge: 'Measurable Growth',
      route: '/analytics',
      actionLabel: 'View Progress Analytics',
      color: 'amber',
    },
    {
      id: 'ai-concept-assistance',
      title: 'AI Concept Assistance',
      description:
        'Never stay stuck on an algorithm or mathematical proof. Our built-in AI Tutor Studio breaks down difficult formulas and suggests debugging tips tailored to your current lesson.',
      icon: Sparkles,
      badge: 'AI Tutor Studio',
      route: '/ai-tutor',
      actionLabel: 'Ask AI Tutor',
      color: 'pink',
    },
  ];

  return (
    <section className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Why Learn Here</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Designed for Absolute Comprehension
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          We combine mathematical rigor, visual intuition, and live code execution into an integrated learning environment built specifically for AI and Machine Learning engineers.
        </p>
      </div>

      {/* Feature Cards Grid (3 columns desktop, 2 tablet, 1 mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feat) => {
          const Icon = feat.icon;

          return (
            <div
              key={feat.id}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <Link
                href={feat.route}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 pt-2 border-t border-slate-100 dark:border-slate-800 group/link"
              >
                <span>{feat.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

