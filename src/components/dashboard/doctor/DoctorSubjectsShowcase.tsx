'use client';

import React, { useState, useMemo } from 'react';
import {
  Stethoscope,
  HeartPulse,
  Microscope,
  Pill,
  Brain,
  Eye,
  Ear,
  Baby,
  Bone,
  Activity,
  ShieldAlert,
  Syringe,
  Scan,
  FlaskConical,
  Users,
  Scissors,
  Sparkles,
  BookOpen,
  ArrowRight,
  X,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  MBBS_SUBJECTS,
  MBBSSubjectItem,
  MBBSProfYear,
} from '@/data/doctorDashboardConfig';

type SubjectTab = 'all' | MBBSProfYear;

function getSubjectIcon(key: MBBSSubjectItem['iconKey']) {
  switch (key) {
    case 'anatomy':
      return Brain;
    case 'physiology':
      return HeartPulse;
    case 'biochem':
      return FlaskConical;
    case 'pathology':
      return Microscope;
    case 'pharma':
      return Pill;
    case 'micro':
      return ShieldAlert;
    case 'forensic':
      return Activity;
    case 'psm':
      return Users;
    case 'ophtha':
      return Eye;
    case 'ent':
      return Ear;
    case 'medicine':
      return Stethoscope;
    case 'surgery':
      return Scissors;
    case 'obgyn':
      return Sparkles;
    case 'peds':
      return Baby;
    case 'ortho':
      return Bone;
    case 'derm':
      return Activity;
    case 'psych':
      return Brain;
    case 'radio':
      return Scan;
    case 'anesth':
      return Syringe;
  }
}

function renderSubjectIllustration(subject: MBBSSubjectItem) {
  if (subject.profYear === '1st-prof') {
    return (
      <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
        <circle cx="70" cy="60" r="32" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1.8" />
        <path d="M25 60 L50 60 L58 38 L66 78 L74 48 L82 60 L110 60" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="128" y="30" width="84" height="60" rx="8" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
        <text x="140" y="54" fontSize="10" fontWeight="bold" fill="#065f46">Pre-Clinical</text>
        <text x="140" y="72" fontSize="9" fontFamily="monospace" fill="#047857">{subject.modulesCount} Modules</text>
      </svg>
    );
  }
  if (subject.profYear === '2nd-prof') {
    return (
      <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
        <circle cx="68" cy="60" r="28" fill="#f43f5e" fillOpacity="0.12" stroke="#f43f5e" strokeWidth="1.8" />
        <circle cx="62" cy="54" r="8" fill="#fb7185" fillOpacity="0.45" />
        <circle cx="76" cy="66" r="6" fill="#e11d48" fillOpacity="0.55" />
        <rect x="122" y="30" width="90" height="60" rx="8" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
        <text x="134" y="54" fontSize="10" fontWeight="bold" fill="#9f1239">Para-Clinical</text>
        <text x="134" y="72" fontSize="9" fontFamily="monospace" fill="#be123c">MOA · Path Dx</text>
      </svg>
    );
  }
  if (subject.profYear === '3rd-prof') {
    return (
      <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
        <ellipse cx="68" cy="60" rx="34" ry="22" fill="#06b6d4" fillOpacity="0.14" stroke="#0891b2" strokeWidth="1.8" />
        <circle cx="68" cy="60" r="10" fill="#0891b2" fillOpacity="0.7" />
        <circle cx="68" cy="60" r="4" fill="#0f172a" />
        <rect x="122" y="30" width="90" height="60" rx="8" fill="#ecfeff" stroke="#67e8f9" strokeWidth="1.5" />
        <text x="134" y="54" fontSize="10" fontWeight="bold" fill="#155e75">3rd Prof I</text>
        <text x="134" y="72" fontSize="9" fontFamily="monospace" fill="#0e7490">OPD &amp; Community</text>
      </svg>
    );
  }
  return (
    <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
      <rect x="26" y="26" width="188" height="68" rx="10" fill="#f0fdfa" stroke="#2dd4bf" strokeWidth="1.5" />
      <path d="M40 66 L62 66 L68 44 L75 76 L82 54 L88 66 L112 66" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="124" y="54" fontSize="10" fontWeight="bold" fill="#115e59">Clinical Ward</text>
      <text x="124" y="72" fontSize="9" fontFamily="monospace" fill="#0f766e">{subject.topicsCount} Topics</text>
    </svg>
  );
}

export const DoctorSubjectsShowcase: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<SubjectTab>('all');
  const [previewSubject, setPreviewSubject] = useState<MBBSSubjectItem | null>(null);

  const visibleSubjects = useMemo(() => {
    if (activeTab === 'all') return MBBS_SUBJECTS;
    return MBBS_SUBJECTS.filter((s) => s.profYear === activeTab);
  }, [activeTab]);

  return (
    <section id="mbbs-subjects" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>🩺 Complete MBBS CBME Subject Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Explore All 19 MBBS Subjects
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Organized across 1st Prof (Pre-Clinical), 2nd Prof (Para-Clinical), 3rd Prof Part-I, and Final Prof Clinical rotations. Click any subject to preview its planned syllabus blueprint.
          </p>
        </div>

        {/* Prof Year Filter Tabs */}
        <div className="w-full xl:w-auto flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {[
            { id: 'all' as const, label: 'All Subjects (19)' },
            { id: '1st-prof' as const, label: '1st Prof (3)' },
            { id: '2nd-prof' as const, label: '2nd Prof (4)' },
            { id: '3rd-prof' as const, label: '3rd Prof (3)' },
            { id: 'final-prof' as const, label: 'Final Prof (9)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {visibleSubjects.map((subject) => {
          const Icon = getSubjectIcon(subject.iconKey);

          return (
            <div
              key={subject.id}
              className="group relative rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Illustration Banner */}
              <div className="h-32 w-full bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                {renderSubjectIllustration(subject)}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 backdrop-blur-xs">
                  {subject.profLabel}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {subject.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {subject.description}
                  </p>
                </div>

                {/* Metadata + Blueprint Bar */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>
                      {subject.modulesCount} Units · {subject.topicsCount} Topics
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                      {subject.estimatedHours}h
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500/35 h-1.5 rounded-full w-full" />
                  </div>
                </div>

                {/* Preview Action Button */}
                <button
                  type="button"
                  onClick={() => setPreviewSubject(subject)}
                  className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white text-xs font-semibold transition-all group/btn"
                >
                  <span>Preview Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Syllabus Blueprint Preview Modal (UI Design Only) */}
      {previewSubject && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewSubject(null)}
        >
          <div
            className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase">
                    {previewSubject.profLabel}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Dashboard Design Preview
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  {previewSubject.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {previewSubject.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewSubject(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {previewSubject.description}
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Planned Curriculum Units ({previewSubject.modulesCount} Units · {previewSubject.topicsCount} Topics)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {previewSubject.plannedUnits.map((unit) => (
                  <div
                    key={unit}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="leading-snug">{unit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-200">
              <span className="font-bold block mb-0.5">Bedside &amp; Exam Correlation:</span>
              {previewSubject.clinicalFocus}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                Est. {previewSubject.estimatedHours} study hours
              </span>
              <button
                type="button"
                onClick={() => setPreviewSubject(null)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
              >
                Done Previewing
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

DoctorSubjectsShowcase.displayName = 'DoctorSubjectsShowcase';
