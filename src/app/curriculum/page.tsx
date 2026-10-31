'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  Brain,
  Hash,
  Table,
  Cpu,
  Compass,
  ListTree,
  ChevronDown,
  ChevronUp,
  Check,
  Target,
  Zap,
} from 'lucide-react';
import {
  MODULES_CATALOG,
  MODULES_CATALOG_ML_CORE,
  MODULES_CATALOG_DEEP_LEARNING,
  MODULES_CATALOG_TRANSFORMERS,
  MODULES_CATALOG_NUMPY,
  MODULES_CATALOG_PANDAS,
} from '@/data/modules/curriculum';
import { AI_ML_PHASES } from '@/data/phases/curriculumPhases';
import { getProgress, toggleLessonCompletion } from '@/lib/storage';
import { UserProgressState, ModuleData } from '@/lib/types';

type TrackFilter = 'all' | 'transformers' | 'deep-learning' | 'ml-core' | 'numpy' | 'pandas';
type ViewMode = 'catalog' | 'roadmap';

export default function CurriculumPage() {
  const [progress, setProgress] = useState<UserProgressState | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('catalog');
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    'phase-0': true,
    'phase-1': true,
    'phase-2': true,
    'phase-3': true,
    'phase-6': true,
  });

  useEffect(() => {
    setProgress(getProgress());
    const handleUpdate = () => setProgress(getProgress());
    window.addEventListener('ml_progress_updated', handleUpdate);
    return () => window.removeEventListener('ml_progress_updated', handleUpdate);
  }, []);

  const handleToggle = (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLessonCompletion(lessonId);
  };

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  // Track counts
  const dlLessons = MODULES_CATALOG_DEEP_LEARNING.flatMap((m) => m.lessons);
  const tfLessons = MODULES_CATALOG_TRANSFORMERS.flatMap((m) => m.lessons);
  const mlCoreLessons = MODULES_CATALOG_ML_CORE.flatMap((m) => m.lessons);
  const numpyLessons = MODULES_CATALOG_NUMPY.flatMap((m) => m.lessons);
  const pandasLessons = MODULES_CATALOG_PANDAS.flatMap((m) => m.lessons);
  const allLessons = MODULES_CATALOG.flatMap((m) => m.lessons);

  const dlDone = dlLessons.filter((l) => progress?.completedLessons[l.id]).length;
  const tfDone = tfLessons.filter((l) => progress?.completedLessons[l.id]).length;
  const mlDone = mlCoreLessons.filter((l) => progress?.completedLessons[l.id]).length;
  const numpyDone = numpyLessons.filter((l) => progress?.completedLessons[l.id]).length;
  const pandasDone = pandasLessons.filter((l) => progress?.completedLessons[l.id]).length;
  const allDone = allLessons.filter((l) => progress?.completedLessons[l.id]).length;

  const getFilteredModules = (): { trackLabel: string; trackDesc: string; icon: any; modules: ModuleData[] }[] => {
    if (selectedTrack === 'transformers') {
      return [{
        trackLabel: 'Transformers: From Fundamentals to Implementation',
        trackDesc: '15 structured modules covering tokenization, embeddings, positional encoding, self-attention, multi-head blocks, and building a full nano-GPT model in PyTorch.',
        icon: Sparkles,
        modules: MODULES_CATALOG_TRANSFORMERS,
      }];
    }
    if (selectedTrack === 'deep-learning') {
      return [{
        trackLabel: 'Deep Learning',
        trackDesc: 'Learn neural networks, backpropagation, optimization, PyTorch, CNNs, sequence models, attention, and practical Deep Learning deployment through visual explanations, interactive labs, and hands-on projects.',
        icon: Cpu,
        modules: MODULES_CATALOG_DEEP_LEARNING,
      }];
    }
    if (selectedTrack === 'ml-core') {
      return [{
        trackLabel: 'Core Machine Learning Foundations & Algorithms',
        trackDesc: '12 rigorous modules covering calculus derivations, regression, classification, ensembles, SVMs, clustering, neural networks, and MLOps deployment.',
        icon: Brain,
        modules: MODULES_CATALOG_ML_CORE,
      }];
    }
    if (selectedTrack === 'numpy') {
      return [{
        trackLabel: 'NumPy Mastery',
        trackDesc: '7 modules covering array foundations, indexing, slicing, broadcasting, vectorization, statistical algebra, and student analytics capstone.',
        icon: Hash,
        modules: MODULES_CATALOG_NUMPY,
      }];
    }
    if (selectedTrack === 'pandas') {
      return [{
        trackLabel: 'Pandas Mastery',
        trackDesc: '10 modules covering Series, DataFrames, selection, cleaning, transformation, GroupBy aggregations, joins, tidy data, performance, and retail sales capstone.',
        icon: Table,
        modules: MODULES_CATALOG_PANDAS,
      }];
    }

    // All tracks
    return [
      {
        trackLabel: '1. Transformers Architecture',
        trackDesc: 'From tokenization and sinusoidal positional encoding to multi-head self-attention and building a nano-GPT block in PyTorch.',
        icon: Sparkles,
        modules: MODULES_CATALOG_TRANSFORMERS,
      },
      {
        trackLabel: '2. Deep Learning',
        trackDesc: 'From single artificial perceptrons and backpropagation calculus to convolutional networks, regularization, and PyTorch deep networks.',
        icon: Cpu,
        modules: MODULES_CATALOG_DEEP_LEARNING,
      },
      {
        trackLabel: '3. Core Machine Learning Algorithms',
        trackDesc: 'From first-principles math and loss derivations to deep networks and production microservices.',
        icon: Brain,
        modules: MODULES_CATALOG_ML_CORE,
      },
      {
        trackLabel: '4. NumPy Mastery',
        trackDesc: 'Numerical computing, contiguous memory structures, universal functions, broadcasting, and student analytics capstone.',
        icon: Hash,
        modules: MODULES_CATALOG_NUMPY,
      },
      {
        trackLabel: '5. Pandas Mastery',
        trackDesc: 'Tabular data wrangling, data cleaning, GroupBy split-apply-combine, reshaping, and sales analytics capstone.',
        icon: Table,
        modules: MODULES_CATALOG_PANDAS,
      },
    ];
  };

  const trackSections = getFilteredModules();

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>Category 1 · Artificial Intelligence &amp; Deep Learning</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Complete AI &amp; ML Academy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Learn Machine Learning, Deep Learning, Transformers, LLMs, RAG, AI Agents, and MLOps through visual explanations, interactive labs, practical coding, and real-world projects. Every lesson pairs intuitive real-life analogies, step-by-step mathematical derivations, runnable code, expected outputs, common mistakes, practice exercises, and interactive visualizers.
        </p>

        {/* View Mode Switcher (Roadmap vs Catalog) */}
        <div className="flex items-center gap-3 pt-2">
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
            <button
              onClick={() => setViewMode('catalog')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                viewMode === 'catalog'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Modular Catalog</span>
            </button>
            <button
              onClick={() => setViewMode('roadmap')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                viewMode === 'roadmap'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Phased Roadmap (Phases 0–11)</span>
            </button>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            {allDone} of {allLessons.length} lessons completed across all tracks
          </span>
        </div>

        {/* Track Overview KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Deep Learning Card */}
          <div
            onClick={() => {
              setViewMode('catalog');
              setSelectedTrack(selectedTrack === 'deep-learning' ? 'all' : 'deep-learning');
            }}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              selectedTrack === 'deep-learning' && viewMode === 'catalog'
                ? 'bg-violet-950/40 border-violet-500 shadow-md shadow-violet-500/10 ring-1 ring-violet-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-violet-400/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                Deep Learning
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 font-bold">
                NEW
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {dlDone} <span className="text-xs font-normal text-slate-400">/ {dlLessons.length}</span>
              </span>
              <span className="text-xs font-semibold text-violet-500">
                {Math.round((dlDone / (dlLessons.length || 1)) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all"
                style={{ width: `${Math.round((dlDone / (dlLessons.length || 1)) * 100)}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              6 Modules · 8 Interactive Labs
            </div>
          </div>

          {/* Core ML Card */}
          <div
            onClick={() => {
              setViewMode('catalog');
              setSelectedTrack(selectedTrack === 'ml-core' ? 'all' : 'ml-core');
            }}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              selectedTrack === 'ml-core' && viewMode === 'catalog'
                ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Brain className="w-4 h-4" />
                Core ML Algorithms
              </span>
              <span className="text-xs font-mono text-slate-500">12 Modules</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {mlDone} <span className="text-xs font-normal text-slate-400">/ {mlCoreLessons.length}</span>
              </span>
              <span className="text-xs font-semibold text-indigo-500">
                {Math.round((mlDone / mlCoreLessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${Math.round((mlDone / mlCoreLessons.length) * 100)}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              107 Lessons · Math &amp; Code
            </div>
          </div>

          {/* NumPy Card */}
          <div
            onClick={() => {
              setViewMode('catalog');
              setSelectedTrack(selectedTrack === 'numpy' ? 'all' : 'numpy');
            }}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              selectedTrack === 'numpy' && viewMode === 'catalog'
                ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <Hash className="w-4 h-4" />
                NumPy Mastery
              </span>
              <span className="text-xs font-mono text-slate-500">7 Modules</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {numpyDone} <span className="text-xs font-normal text-slate-400">/ {numpyLessons.length}</span>
              </span>
              <span className="text-xs font-semibold text-cyan-500">
                {Math.round((numpyDone / numpyLessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all"
                style={{ width: `${Math.round((numpyDone / numpyLessons.length) * 100)}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              31 Lessons · Vectorization
            </div>
          </div>

          {/* Pandas Card */}
          <div
            onClick={() => {
              setViewMode('catalog');
              setSelectedTrack(selectedTrack === 'pandas' ? 'all' : 'pandas');
            }}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              selectedTrack === 'pandas' && viewMode === 'catalog'
                ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Table className="w-4 h-4" />
                Pandas Mastery
              </span>
              <span className="text-xs font-mono text-slate-500">10 Modules</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {pandasDone} <span className="text-xs font-normal text-slate-400">/ {pandasLessons.length}</span>
              </span>
              <span className="text-xs font-semibold text-emerald-500">
                {Math.round((pandasDone / pandasLessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${Math.round((pandasDone / pandasLessons.length) * 100)}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              44 Lessons · Data Wrangling
            </div>
          </div>
        </div>

        {/* Track Switcher Navigation Tabs (Catalog Mode) */}
        {viewMode === 'catalog' && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <button
              onClick={() => setSelectedTrack('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTrack === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Tracks ({MODULES_CATALOG.length} Modules)</span>
            </button>
            <button
              onClick={() => setSelectedTrack('transformers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTrack === 'transformers'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Transformers ({MODULES_CATALOG_TRANSFORMERS.length} Modules)</span>
            </button>
            <button
              onClick={() => setSelectedTrack('deep-learning')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTrack === 'deep-learning'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
              <span>Deep Learning ({MODULES_CATALOG_DEEP_LEARNING.length} Modules)</span>
            </button>
            <button
              onClick={() => setSelectedTrack('ml-core')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTrack === 'ml-core'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-indigo-400" />
              <span>Core ML ({MODULES_CATALOG_ML_CORE.length} Modules)</span>
            </button>
            <button
              onClick={() => setSelectedTrack('numpy')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTrack === 'numpy'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Hash className="w-3.5 h-3.5 text-cyan-400" />
              <span>NumPy Mastery ({MODULES_CATALOG_NUMPY.length} Modules)</span>
            </button>
            <button
              onClick={() => setSelectedTrack('pandas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTrack === 'pandas'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pandas Mastery ({MODULES_CATALOG_PANDAS.length} Modules)</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ROADMAP VIEW: PHASES 0 THROUGH 11 */}
      {/* ========================================================================= */}
      {viewMode === 'roadmap' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
            <Compass className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Correct Pedagogical Sequencing (Phases 0 through 11)</p>
              <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
                The Complete AI &amp; ML Academy curriculum is organized in strict dependency order: from self-assessments (Phase 0) to Machine Learning foundations (Phase 1), Mathematics for Deep Learning (Phase 2), Deep Learning (Phase 3), Computer Vision (Phase 4), Sequence Models (Phase 5), Transformers (Phase 6), Generative AI &amp; LLMs (Phase 7), RAG (Phase 8), AI Agents (Phase 9), MLOps (Phase 10), and Real-World Capstones (Phase 11).
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {AI_ML_PHASES.map((phase) => {
              const isExpanded = !!expandedPhases[phase.id];
              const isAvailable = phase.status === 'available';

              return (
                <div
                  key={phase.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
                >
                  {/* Phase Header */}
                  <div
                    onClick={() => togglePhase(phase.id)}
                    className="p-5 sm:p-6 cursor-pointer bg-slate-50/60 dark:bg-slate-800/30 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-mono font-extrabold text-base flex items-center justify-center shrink-0 shadow-sm">
                        P{phase.number}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                            {phase.badge}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                            {phase.difficulty}
                          </span>
                          <span className="text-xs text-slate-400">
                            ~{phase.estimatedHours} hrs · {phase.totalModules} modules
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              isAvailable
                                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                            }`}
                          >
                            {isAvailable ? '✓ Fully Available' : 'Roadmap'}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-1.5">
                          {phase.title}: <span className="font-normal text-slate-600 dark:text-slate-300">{phase.subtitle}</span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                      <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Phase Details */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
                      {/* Learning Objectives & Prerequisites */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
                            <Target className="w-3.5 h-3.5 text-indigo-500" />
                            Target Learning Objectives
                          </h4>
                          <ul className="space-y-1.5">
                            {phase.learningObjectives.map((obj, oIdx) => (
                              <li key={oIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            Prerequisites
                          </h4>
                          <ul className="space-y-1.5">
                            {phase.prerequisites.map((pre, pIdx) => (
                              <li key={pIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                <span>{pre}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Modules Breakdown */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Phase Modules ({phase.modules.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {phase.modules.map((m) => (
                            <div
                              key={m.id}
                              className={`p-3.5 rounded-xl border transition-colors flex items-start justify-between gap-3 ${
                                m.isPublished
                                  ? 'bg-white dark:bg-slate-900 border-indigo-200/70 dark:border-indigo-900/40 hover:border-indigo-400'
                                  : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80'
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                    Module {m.number}
                                  </span>
                                  <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                                    {m.difficulty}
                                  </span>
                                  {m.isPublished && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                                      Active
                                    </span>
                                  )}
                                </div>
                                <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5 truncate">
                                  {m.title}
                                </h5>
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                  {m.description}
                                </p>
                              </div>

                              {m.route && (
                                <Link
                                  href={m.route}
                                  className="shrink-0 p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors"
                                  title="Jump to module"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CATALOG VIEW: MODULES AND INDIVIDUAL LESSONS */}
      {/* ========================================================================= */}
      {viewMode === 'catalog' && (
        <div className="space-y-10">
          {trackSections.map((section) => {
            const SectionIcon = section.icon;

            return (
              <div key={section.trackLabel} className="space-y-4">
                {/* Section Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <SectionIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {section.trackLabel}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {section.trackDesc}
                    </p>
                  </div>
                </div>

                {/* Module Cards */}
                <div className="space-y-5">
                  {section.modules.map((mod) => {
                    const completedInModule = mod.lessons.filter(
                      (l) => progress?.completedLessons[l.id]
                    ).length;
                    const pct = Math.round((completedInModule / (mod.lessons.length || 1)) * 100);

                    const isDL = mod.id.startsWith('dl-module');
                    const isNumPy = mod.id.startsWith('numpy');
                    const isPandas = mod.id.startsWith('pandas');
                    const badgeColor = isDL
                      ? 'bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300'
                      : isNumPy
                      ? 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300'
                      : isPandas
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                      : 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300';

                    const modNumberPrefix = isDL ? 'DL' : isNumPy ? 'NP' : isPandas ? 'PD' : 'M';

                    return (
                      <div
                        key={mod.id}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
                      >
                        {/* Module Header Bar */}
                        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-sm text-white ${
                              isDL ? 'bg-violet-600' : isNumPy ? 'bg-cyan-600' : isPandas ? 'bg-emerald-600' : 'bg-indigo-600'
                            }`}>
                              {modNumberPrefix}{mod.number}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
                                  {mod.badge}
                                </span>
                                <span className="text-xs text-slate-400">
                                  Estimated: {mod.estimatedHours} hrs · {mod.lessons.length} lessons
                                </span>
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                                {mod.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {mod.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 self-end md:self-auto">
                            <div className="text-right">
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                                {completedInModule} / {mod.lessons.length} Completed
                              </span>
                              <div className="w-28 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    pct === 100
                                      ? 'bg-emerald-500'
                                      : isDL
                                      ? 'bg-violet-500'
                                      : isNumPy
                                      ? 'bg-cyan-500'
                                      : isPandas
                                      ? 'bg-emerald-500'
                                      : 'bg-indigo-500'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>

                            <Link
                              href={`/curriculum/${mod.id}`}
                              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              View Module
                            </Link>
                          </div>
                        </div>

                        {/* Module Description */}
                        <div className="px-6 py-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-50/20 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
                          {mod.description}
                        </div>

                        {/* Lesson Items */}
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                          {mod.lessons.map((lesson) => {
                            const isDone = !!progress?.completedLessons[lesson.id];
                            const hasVisualizer = lesson.visualizerType && lesson.visualizerType !== 'none';

                            return (
                              <Link
                                key={lesson.id}
                                href={`/curriculum/${mod.id}/${lesson.id}`}
                                className="p-4 sm:px-6 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors flex items-center justify-between gap-4 group"
                              >
                                <div className="flex items-center gap-3.5 min-w-0">
                                  <button
                                    onClick={(e) => handleToggle(lesson.id, e)}
                                    className="shrink-0 text-slate-400 hover:text-emerald-500 transition-colors p-1"
                                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                                    ) : (
                                      <Circle className="w-5 h-5" />
                                    )}
                                  </button>

                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                        {lesson.title}
                                      </span>
                                      <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                                        {lesson.difficulty}
                                      </span>
                                      {hasVisualizer && (
                                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200/50 dark:border-indigo-800/50 hidden sm:inline">
                                          Interactive Lab
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                      {lesson.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {lesson.readTimeMinutes}m
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
