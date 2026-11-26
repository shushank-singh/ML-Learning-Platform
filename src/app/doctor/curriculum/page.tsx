'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  Box,
  PlayCircle,
  ArrowRight,
  Layers,
} from 'lucide-react';
import {
  MBBS_PHASES,
  MBBS_SUBJECTS_CATALOG,
  MBBS_MODULES_CATALOG,
  MBBS_TOPICS_CATALOG,
  MBBS_CURRICULUM_STATS,
} from '@/data/medverse';
import { ContentStatus, MBBSPhaseId } from '@/types/medverse';

const STATUS_STYLE: Record<ContentStatus, { label: string; cls: string }> = {
  published: {
    label: 'Published · Interactive',
    cls: 'bg-emerald-950/70 text-emerald-300 border-emerald-700',
  },
  medically_reviewed: {
    label: 'Medically Reviewed',
    cls: 'bg-teal-950/70 text-teal-300 border-teal-700',
  },
  ready_for_review: {
    label: 'Ready for Review',
    cls: 'bg-cyan-950/70 text-cyan-300 border-cyan-700',
  },
  in_development: {
    label: 'In Development',
    cls: 'bg-amber-950/60 text-amber-300 border-amber-800',
  },
  planned: {
    label: 'Planned (NMC Syllabus)',
    cls: 'bg-slate-800 text-slate-300 border-slate-700',
  },
};

export default function MedVerseCurriculumPage() {
  const [phaseFilter, setPhaseFilter] = useState<'all' | MBBSPhaseId>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ContentStatus>('all');
  const [query, setQuery] = useState('');

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MBBS_TOPICS_CATALOG.filter((topic) => {
      if (phaseFilter !== 'all' && topic.phaseId !== phaseFilter) return false;
      if (statusFilter !== 'all' && topic.status !== statusFilter) return false;
      if (!q) return true;
      const subj = MBBS_SUBJECTS_CATALOG.find((s) => s.id === topic.subjectId);
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.subtitle.toLowerCase().includes(q) ||
        (subj && subj.title.toLowerCase().includes(q))
      );
    });
  }, [phaseFilter, statusFilter, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-800 text-teal-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>NMC CBME Complete MBBS Curriculum Browser</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300">
              {MBBS_CURRICULUM_STATS.publishedTopicsCount} Published
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300">
              {MBBS_CURRICULUM_STATS.inDevelopmentTopicsCount} In Dev
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              {MBBS_CURRICULUM_STATS.plannedTopicsCount} Planned
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Phase → Subject → Module → Topic Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Covers {MBBS_CURRICULUM_STATS.subjectsCount} applicable NMC CBME preclinical, paraclinical, and clinical subjects across 4 academic phases. Every topic reports its honest authoring and medical review status—only fully built topics with 3D/animations, notes, and assessments are marked Published.
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search subjects or topics..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value as 'all' | MBBSPhaseId)}
            aria-label="Filter by MBBS phase"
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
          >
            <option value="all">All MBBS Phases (4 Phases)</option>
            {MBBS_PHASES.map((ph) => (
              <option key={ph.id} value={ph.id}>
                {ph.title}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | ContentStatus)}
            aria-label="Filter by content status"
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Content Statuses</option>
            <option value="published">Published Only ({MBBS_CURRICULUM_STATS.publishedTopicsCount})</option>
            <option value="in_development">In Development ({MBBS_CURRICULUM_STATS.inDevelopmentTopicsCount})</option>
            <option value="planned">Planned ({MBBS_CURRICULUM_STATS.plannedTopicsCount})</option>
          </select>
        </div>
      </div>

      {/* Phase Overview & Subjects */}
      <div className="space-y-6">
        {MBBS_PHASES.filter((ph) => phaseFilter === 'all' || ph.id === phaseFilter).map((phase) => {
          const subjects = MBBS_SUBJECTS_CATALOG.filter((s) => s.phaseId === phase.id);
          const phaseTopics = filteredTopics.filter((t) => t.phaseId === phase.id);

          return (
            <section
              key={phase.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                    {phase.durationLabel}
                  </span>
                  <h2 className="text-xl font-extrabold text-white">{phase.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{phase.description}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
                  {subjects.length} Subjects · {phaseTopics.length} Matching Topics
                </span>
              </div>

              {/* Subject Badges */}
              <div className="flex flex-wrap gap-2">
                {subjects.map((sub) => (
                  <span
                    key={sub.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
                  >
                    <span className="font-mono font-bold text-teal-400">{sub.shortCode}</span>
                    <span>{sub.title}</span>
                    <span className="text-[10px] text-slate-500">({sub.nmcCodeRange})</span>
                  </span>
                ))}
              </div>

              {/* Topics Grid */}
              {phaseTopics.length === 0 ? (
                <p className="text-xs text-slate-500 py-3">
                  No topics match the current search/status filters in this phase.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {phaseTopics.map((topic) => {
                    const subj = MBBS_SUBJECTS_CATALOG.find((s) => s.id === topic.subjectId);
                    const mod = MBBS_MODULES_CATALOG.find((m) => m.id === topic.moduleId);
                    const badge = STATUS_STYLE[topic.status];

                    return (
                      <div
                        key={topic.id}
                        className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col justify-between space-y-4 hover:border-teal-500/60 transition-colors"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider truncate">
                              {subj?.title} · {mod?.organSystem}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badge.cls}`}>
                              {badge.label}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-white leading-snug">
                            {topic.title}
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                            {topic.subtitle}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                            {topic.assetId && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-950/60 border border-teal-800/70 text-teal-300">
                                <Box className="w-3 h-3" /> 3D Scene
                              </span>
                            )}
                            {topic.animationId && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/70 text-cyan-300">
                                <PlayCircle className="w-3 h-3" /> Animation
                              </span>
                            )}
                            {topic.hasShortNotes && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                                <Layers className="w-3 h-3" /> Notes
                              </span>
                            )}
                            {topic.mcqCount > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-950/60 border border-violet-800/70 text-violet-300">
                                <CheckCircle2 className="w-3 h-3" /> {topic.mcqCount} MCQs
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1 text-slate-500 font-mono">
                            <Clock className="w-3.5 h-3.5" /> {topic.estimatedMinutes}m
                          </span>

                          <Link
                            href={`/doctor/topics/${topic.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors"
                          >
                            <span>{topic.status === 'published' ? 'Open Lesson' : 'View Spec'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
