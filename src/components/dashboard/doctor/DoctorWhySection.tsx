'use client';

import React from 'react';
import {
  Eye,
  HeartPulse,
  ClipboardCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const DoctorWhySection: React.FC = () => {
  const FEATURES = [
    {
      id: 'visual-anatomy',
      title: 'Visual Anatomy & Physiology',
      description:
        'Grasp complex anatomical relations, brachial plexus tracts, and cardiac cycle pressure-volume loops with layered diagrams before memorizing tables.',
      icon: Eye,
      badge: 'Visual Intuition',
      href: '#mbbs-subjects',
      actionLabel: 'Browse Subject Maps',
    },
    {
      id: 'clinical-simulators',
      title: 'Interactive ECG & ABG Labs',
      description:
        'Practice interpreting 12-lead ECG strips, arterial blood gases with Winter’s formula, and pharmacology receptor cascades in interactive visual panels.',
      icon: HeartPulse,
      badge: 'Diagnostic Lab',
      href: '#clinical-hub',
      actionLabel: 'Open Clinical Lab',
    },
    {
      id: 'ward-vignettes',
      title: 'Bedside Case Vignettes',
      description:
        'Bridge textbook pathology to ward rounds with emergency and OPD clinical vignettes covering ACS, DKA, sepsis, stroke, and pediatric triage.',
      icon: ClipboardCheck,
      badge: 'Ward Ready',
      href: '#clinical-cases',
      actionLabel: 'Preview Case Studies',
    },
    {
      id: 'osce-checkpoints',
      title: 'OSCE & Prof Exam Checkpoints',
      description:
        'Reinforce high-yield concepts across all 19 MBBS subjects with structured viva summaries, clinical signs, and rapid diagnostic recall.',
      icon: CheckCircle2,
      badge: 'Active Recall',
      href: '#mbbs-roadmap',
      actionLabel: 'View MBBS Roadmap',
    },
    {
      id: 'competency-tracking',
      title: 'CBME Competency Tracking',
      description:
        'Organized cleanly across 1st Prof, 2nd Prof, 3rd Prof Part-I, and Final Prof clinical rotations so nothing falls through the cracks.',
      icon: TrendingUp,
      badge: 'CBME Aligned',
      href: '#mbbs-subjects',
      actionLabel: 'Explore Prof Years',
    },
    {
      id: 'clinical-reasoning',
      title: 'Differential Diagnosis Coaching',
      description:
        'Designed around first-principles pathophysiology and next-best-step clinical decision trees for NEET-PG, NEXT, and USMLE preparation.',
      icon: Sparkles,
      badge: 'Clinical Mentor',
      href: '#clinical-hub',
      actionLabel: 'Preview Diagnostic Flow',
    },
  ];

  return (
    <section className="space-y-8 scroll-mt-24">
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Why Medical Students Learn Here</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Built for Clinical Mastery, Not Rote Cramming
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          Connect normal physiology, pathology mechanisms, pharmacology targets, and bedside diagnosis into one unified MBBS learning dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <a
                href={feat.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 pt-2 border-t border-slate-100 dark:border-slate-800 group/link"
              >
                <span>{feat.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};
