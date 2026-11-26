'use client';

import React, { useState } from 'react';
import {
  Compass,
  Brain,
  Microscope,
  Eye,
  Stethoscope,
  Award,
  ClipboardCheck,
  HeartPulse,
  Pill,
  Scan,
  Sparkles,
} from 'lucide-react';

type MedicalRoadmapTab = 'prof-years' | 'exams' | 'osce';

export const DoctorJourneyRoadmap: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MedicalRoadmapTab>('prof-years');

  const PROF_YEAR_STEPS = [
    {
      step: 1,
      phaseId: '1st Prof',
      title: 'Pre-Clinical Foundations',
      subtitle: 'Year 1 · 3 Core Subjects',
      prerequisites: 'Basic Biology & Chemistry',
      description:
        'Anatomy, Physiology, and Biochemistry — building normal structural, physiological, and metabolic mastery.',
      icon: Brain,
    },
    {
      step: 2,
      phaseId: '2nd Prof',
      title: 'Para-Clinical Bridge',
      subtitle: 'Year 2 · 4 Core Subjects',
      prerequisites: '1st Prof Normal Physiology',
      description:
        'Pathology, Pharmacology, Microbiology, and Forensic Medicine — understanding disease mechanisms and therapeutics.',
      icon: Microscope,
    },
    {
      step: 3,
      phaseId: '3rd Prof I',
      title: 'Community & Specialty OPD',
      subtitle: 'Year 3 · 3 Core Subjects',
      prerequisites: '2nd Prof Disease Mechanisms',
      description:
        'Community Medicine (PSM), Ophthalmology, and ENT — preventive epidemiology, sensory clinics, and outpatient skills.',
      icon: Eye,
    },
    {
      step: 4,
      phaseId: 'Final Prof',
      title: 'Clinical Wards & CRMI',
      subtitle: 'Final Year · 9 Clinical Subjects',
      prerequisites: 'Integrated Pre + Para-Clinical',
      description:
        'General Medicine, Surgery, OB-GYN, Pediatrics, Orthopedics, Derm, Psych, Radiology, and Anesthesia bedside mastery.',
      icon: Stethoscope,
    },
  ];

  const EXAM_PREP_STEPS = [
    {
      step: 1,
      phaseId: 'University Profs',
      title: 'CBME University Mastery',
      subtitle: 'Long Essays, Short Notes & Viva',
      prerequisites: 'Subject-wise Syllabus Blueprints',
      description:
        'Structured diagrams, flowcharts, and high-yield viva tables tailored for 1st through Final Professional MBBS exams.',
      icon: Sparkles,
    },
    {
      step: 2,
      phaseId: 'NEET-PG / NEXT',
      title: 'Integrated Clinical MCQs',
      subtitle: '19-Subject Grand Tests & Recall',
      prerequisites: 'Cross-subject clinical integration',
      description:
        'Image-based questions, multi-step clinical vignettes, and SM-2 spaced-repetition decks for high-yield retention.',
      icon: Award,
    },
    {
      step: 3,
      phaseId: 'USMLE / PLAB',
      title: 'International Licensing Track',
      subtitle: 'Step 1 Mechanisms & Step 2 CK',
      prerequisites: 'Pathophysiology & Management',
      description:
        'Next-best-step diagnostic algorithms, biostatistics, and patient-safety ethics modeled on Step 1 & 2 CK.',
      icon: HeartPulse,
    },
  ];

  const OSCE_STEPS = [
    {
      step: 1,
      phaseId: 'OSCE Station 1',
      title: 'History & Physical Exam',
      subtitle: 'Systematic Bedside Checklists',
      prerequisites: 'Communication & Clinical Semiology',
      description:
        'Structured CVS, Respiratory, Abdomen, and CNS examination checklists with red-flag symptom elicitation.',
      icon: ClipboardCheck,
    },
    {
      step: 2,
      phaseId: 'OSCE Station 2',
      title: 'Emergency & ACLS Triage',
      subtitle: 'ABCDE, Shock & Resuscitation',
      prerequisites: 'Physiology & Critical Care',
      description:
        'Stepwise management of anaphylaxis, cardiac arrest rhythms, status epilepticus, and trauma primary survey.',
      icon: HeartPulse,
    },
    {
      step: 3,
      phaseId: 'OSCE Station 3',
      title: 'ECG, ABG & Radiology',
      subtitle: 'Rapid Diagnostic Interpretation',
      prerequisites: 'Cardio, Pulmo & Radiology',
      description:
        'Spot-diagnosis drills for Chest X-rays, CT Head bleeds, 12-lead ECGs, and anion-gap ABG workups.',
      icon: Scan,
    },
    {
      step: 4,
      phaseId: 'OSCE Station 4',
      title: 'Rational Prescription Lab',
      subtitle: 'Dosing, Interactions & Safety',
      prerequisites: 'Pharmacology & Medicine',
      description:
        'Pediatric weight-based dosing, renal dose adjustments, and high-alert drug interaction verification.',
      icon: Pill,
    },
  ];

  const currentSteps =
    activeCategory === 'prof-years'
      ? PROF_YEAR_STEPS
      : activeCategory === 'exams'
      ? EXAM_PREP_STEPS
      : OSCE_STEPS;

  return (
    <section id="mbbs-roadmap" className="space-y-8 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>🧭 Medical Curriculum Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            The Complete MBBS Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
            A structured progression from 1st-year basic sciences to independent clinical reasoning, OSCE competencies, and postgraduate licensing exams.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveCategory('prof-years')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeCategory === 'prof-years'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            🩺 MBBS Prof Years (4 Phases)
          </button>
          <button
            onClick={() => setActiveCategory('exams')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeCategory === 'exams'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            🎯 PG &amp; Licensing (3 Tracks)
          </button>
          <button
            onClick={() => setActiveCategory('osce')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeCategory === 'osce'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            🏥 Clinical OSCE (4 Stations)
          </button>
        </div>
      </div>

      {/* Roadmap Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {currentSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-lg hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
                    {step.subtitle}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {step.description}
                </p>

                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Focus: </span>
                  {step.prerequisites}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>{step.phaseId}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Design Blueprint</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
