'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Brain,
  Cpu,
  Sparkles,
  Zap,
  Target,
  Bot,
  Activity,
  Server,
  TreePine,
  Code2,
  Coffee,
  Briefcase,
  CheckCircle2,
  Layers,
} from 'lucide-react';

type RoadmapCategory = 'ai-ml' | 'programming' | 'projects';

export const LearningJourneyRoadmap: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<RoadmapCategory>('ai-ml');

  const AI_ML_STEPS = [
    {
      step: 0,
      phaseId: 'Phase 0',
      title: 'Orientation & Diagnostics',
      subtitle: 'Phase 0 · 6 Modules',
      prerequisites: 'High-school math, curiosity to learn',
      description: 'Mathematical foundations, Python syntax diagnostic, and personalized curriculum gap analysis.',
      route: '/curriculum/phase-0-mod-1/p0-ai-ml-hierarchy',
      icon: Compass,
      color: 'slate',
    },
    {
      step: 1,
      phaseId: 'Phase 1',
      title: 'Machine Learning Foundations',
      subtitle: 'Phase 1 · 15 Modules',
      prerequisites: 'Phase 0 Diagnostics',
      description: 'EDA, linear & regularized regression, classification, trees, random forests, boosting, and PCA clustering.',
      route: '/curriculum',
      icon: Brain,
      color: 'indigo',
    },
    {
      step: 2,
      phaseId: 'Phase 2',
      title: 'Mathematics for Deep Learning',
      subtitle: 'Phase 2 · 7 Modules',
      prerequisites: 'Phase 1 ML Foundations',
      description: 'Matrix calculus, gradient vectors, computational graphs, multivariate chain rule, and loss landscapes.',
      route: '/curriculum/module-1',
      icon: Cpu,
      color: 'violet',
    },
    {
      step: 3,
      phaseId: 'Phase 3',
      title: 'Deep Learning & Neural Nets',
      subtitle: 'Phase 3 · 6 Modules (22 Lessons)',
      prerequisites: 'Phase 1 & Phase 2 Math',
      description: 'Perceptrons, backprop calculus, PyTorch autograd, CNNs, sequence models, and custom training loops.',
      route: '/curriculum/dl-module-1',
      icon: Layers,
      color: 'blue',
    },
    {
      step: 4,
      phaseId: 'Phase 6',
      title: 'Transformers Architecture',
      subtitle: 'Phase 6 · 15 Lessons',
      prerequisites: 'Phase 3 Deep Learning',
      description: 'Query, key, value projections, scaled dot-product attention, multi-head blocks, and building nano-GPT.',
      route: '/curriculum/p6-m1/tf-01-why-transformers',
      icon: Sparkles,
      color: 'pink',
    },
    {
      step: 5,
      phaseId: 'Phase 7',
      title: 'LLMs & Generative AI',
      subtitle: 'Phase 7 · 15 Lessons',
      prerequisites: 'Phase 6 Transformers',
      description: 'Pretraining, token budgets, decoding strategies, prompt engineering, context windows, and LoRA fine-tuning.',
      route: '/curriculum/p7-m1/genai-01-foundations',
      icon: Zap,
      color: 'amber',
    },
    {
      step: 6,
      phaseId: 'Phase 8',
      title: 'RAG & Vector Databases',
      subtitle: 'Phase 8 · 15 Lessons',
      prerequisites: 'Phase 7 GenAI & Embeddings',
      description: 'Document ingestion, chunking trade-offs, vector embeddings, HNSW indexing, hybrid retrieval, and RAGAS.',
      route: '/curriculum/p8-m1/rag-01-fundamentals',
      icon: Target,
      color: 'cyan',
    },
    {
      step: 7,
      phaseId: 'Phase 9',
      title: 'AI Agents & Autonomous Systems',
      subtitle: 'Phase 9 · 15 Lessons',
      prerequisites: 'Phase 7 LLMs & Phase 8 RAG',
      description: 'ReAct loops, schema-validated tool calling, state memory compaction, DAG task planning, and HITL safeguards.',
      route: '/curriculum/p9-m1/agent-01-fundamentals',
      icon: Bot,
      color: 'emerald',
    },
    {
      step: 8,
      phaseId: 'Phase 10',
      title: 'MLOps & LLMOps',
      subtitle: 'Phase 10 · 15 Lessons',
      prerequisites: 'Phase 3 DL & Phase 7 LLMs',
      description: 'Experiment tracking, drift detection (PSI), Little’s Law capacity, model registries, CI/CD, and token economics.',
      route: '/curriculum/p10-m1/mlops-01-fundamentals',
      icon: Activity,
      color: 'blue',
    },
    {
      step: 9,
      phaseId: 'Phase 11',
      title: 'AI Deployment & Cloud',
      subtitle: 'Phase 11 · 15 Lessons',
      prerequisites: 'Python fluency & MLOps basics',
      description: 'Docker multi-stage builds, production FastAPI microservices, GPU serving with vLLM, scaling, and cloud deployment.',
      route: '/curriculum/p11-m1/deploy-01-fundamentals',
      icon: Server,
      color: 'slate',
    },
  ];

  const PROGRAMMING_STEPS = [
    {
      step: 1,
      phaseId: 'Core Track 1',
      title: 'Python Mastery Track',
      subtitle: '12 Modules · 107 Lessons',
      prerequisites: 'None — Zero to Production',
      description: 'Variables, loops, functions, OOP, CPython memory addresses, closures, Pyodide code lab, and NumPy/Pandas.',
      route: '/python',
      icon: Code2,
      color: 'emerald',
    },
    {
      step: 2,
      phaseId: 'Core Track 2',
      title: 'Data Structures & Algorithms',
      subtitle: '12 Modules · 106 Lessons',
      prerequisites: 'Basic Python or Java fluency',
      description: 'Two pointers, sliding window, binary search, linked lists, binary trees, graph traversals, and dynamic programming.',
      route: '/dsa',
      icon: TreePine,
      color: 'purple',
    },
    {
      step: 3,
      phaseId: 'Core Track 3',
      title: 'Java Mastery Track',
      subtitle: '12 Modules · 114 Lessons',
      prerequisites: 'None — Beginner to Enterprise',
      description: 'JVM internal architecture, heap vs stack memory, collections framework, multithreading, and OpenJDK runner.',
      route: '/java',
      icon: Coffee,
      color: 'amber',
    },
  ];

  const PROJECT_STEPS = [
    {
      step: 1,
      phaseId: 'Capstone Tier 1',
      title: 'Tabular & Regression Project',
      subtitle: 'House Price Valuation System',
      prerequisites: 'Phase 1 ML Foundations',
      description: 'Predict residential property prices with RMSE < 0.12, scikit-learn pipeline, and FastAPI serving.',
      route: '/projects/house-price-prediction',
      icon: Briefcase,
      color: 'indigo',
    },
    {
      step: 2,
      phaseId: 'Capstone Tier 2',
      title: 'Deep Learning Vision & Tabular',
      subtitle: 'Clinical Cancer Diagnostic Service',
      prerequisites: 'Phase 3 Deep Learning',
      description: 'PyTorch deep classification neural network, ROC-AUC calibration, and containerized Docker artifact.',
      route: '/projects',
      icon: Cpu,
      color: 'violet',
    },
    {
      step: 3,
      phaseId: 'Capstone Tier 3',
      title: 'Production RAG System',
      subtitle: 'Document QA with RAGAS Evaluation',
      prerequisites: 'Phase 8 RAG & Vector Databases',
      description: 'End-to-end vector search, HNSW indexing, Cross-Encoder reranking, and citation grounding.',
      route: '/curriculum/p8-m15/rag-15-production-rag-capstone',
      icon: Target,
      color: 'cyan',
    },
    {
      step: 4,
      phaseId: 'Capstone Tier 4',
      title: 'Production AI Platform',
      subtitle: 'Full Lifecycle Deployment Platform',
      prerequisites: 'Phase 10 & Phase 11 Cloud',
      description: 'Multi-container orchestration, prometheus metrics, load test SLAs, and automated rollback triggers.',
      route: '/curriculum/p11-m15/deploy-15-capstone-deployment',
      icon: Server,
      color: 'emerald',
    },
  ];

  const currentSteps =
    activeCategory === 'ai-ml'
      ? AI_ML_STEPS
      : activeCategory === 'programming'
      ? PROGRAMMING_STEPS
      : PROJECT_STEPS;

  return (
    <section id="learning-journey" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>🧭 Interactive Learning Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            The Complete Learning Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
            A structured, non-fragmented journey from foundational mathematical equations to production AI systems, algorithms, and capstone deployments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveCategory('ai-ml')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeCategory === 'ai-ml'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>🤖 AI &amp; Machine Learning (10 Phases)</span>
          </button>
          <button
            onClick={() => setActiveCategory('programming')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeCategory === 'programming'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>💻 Programming &amp; DSA (3 Tracks)</span>
          </button>
          <button
            onClick={() => setActiveCategory('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeCategory === 'projects'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>🏆 Capstone Portfolios (4 Tiers)</span>
          </button>
        </div>
      </div>

      {/* Visual Roadmap Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {currentSteps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-lg hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Step pill and number */}
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
                    {step.subtitle}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {step.description}
                </p>

                {step.prerequisites && (
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Prereq: </span>
                    {step.prerequisites}
                  </div>
                )}
              </div>

              <Link
                href={step.route}
                className="inline-flex items-center justify-between w-full pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group/link"
              >
                <span>Explore {step.phaseId}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};


