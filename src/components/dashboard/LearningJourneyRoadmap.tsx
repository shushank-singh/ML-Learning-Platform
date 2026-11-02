'use client';

import React from 'react';
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
  CheckCircle2,
} from 'lucide-react';

export const LearningJourneyRoadmap: React.FC = () => {
  const ROADMAP_STEPS = [
    {
      step: 1,
      title: 'ML Foundations',
      subtitle: 'Phase 1 · 12 Modules',
      description: 'Calculus, linear algebra, preprocessing, regression, classification, random forests, and PCA clustering.',
      route: '/curriculum',
      icon: Brain,
      color: 'indigo',
    },
    {
      step: 2,
      title: 'Deep Learning',
      subtitle: 'Phase 3 · 22 Lessons',
      description: 'Perceptrons, backprop math, PyTorch tensors, autograd, CNNs, sequence models, and custom training loops.',
      route: '/curriculum/dl-module-1',
      icon: Cpu,
      color: 'violet',
    },
    {
      step: 3,
      title: 'Transformers',
      subtitle: 'Phase 6 · 15 Lessons',
      description: 'Query, key, value projections, scaled dot-product attention, multi-head blocks, and building nano-GPT in PyTorch.',
      route: '/curriculum/p6-m1',
      icon: Sparkles,
      color: 'pink',
    },
    {
      step: 4,
      title: 'LLMs & GenAI',
      subtitle: 'Phase 7 · 15 Lessons',
      description: 'Pretraining, token budgets, decoding strategies, prompt engineering, context windows, and LoRA fine-tuning.',
      route: '/curriculum/p7-m1',
      icon: Zap,
      color: 'amber',
    },
    {
      step: 5,
      title: 'RAG & Vector Search',
      subtitle: 'Phase 8 · 15 Lessons',
      description: 'Document ingestion, chunking trade-offs, vector embeddings, HNSW indexing, hybrid retrieval, and RAGAS.',
      route: '/curriculum/p8-m1',
      icon: Target,
      color: 'cyan',
    },
    {
      step: 6,
      title: 'AI Agents',
      subtitle: 'Phase 9 · 15 Lessons',
      description: 'ReAct loops, schema-validated tool calling, state memory compaction, DAG task planning, and HITL safeguards.',
      route: '/curriculum/p9-m1',
      icon: Bot,
      color: 'emerald',
    },
    {
      step: 7,
      title: 'MLOps & LLMOps',
      subtitle: 'Phase 10 · 15 Lessons',
      description: 'Experiment tracking, drift detection (PSI), Little’s Law capacity, model registries, CI/CD, and token economics.',
      route: '/curriculum/p10-m1',
      icon: Activity,
      color: 'blue',
    },
    {
      step: 8,
      title: 'Production AI',
      subtitle: 'Phase 11 · 15 Lessons',
      description: 'Docker multi-stage builds, production FastAPI microservices, GPU serving with vLLM, scaling, and cloud deployment.',
      route: '/curriculum/p11-m1',
      icon: Server,
      color: 'slate',
    },
  ];

  return (
    <section id="learning-journey" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Curriculum Progression</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          The End-to-End AI Engineering Journey
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          Follow a carefully sequenced learning progression from foundational mathematical equations to production-grade distributed AI systems.
        </p>
      </div>

      {/* Visual Roadmap Stepper */}
      <div className="relative">
        {/* Connecting Line (desktop only) */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {ROADMAP_STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.step}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all duration-200 flex flex-col justify-between space-y-4 group"
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
                </div>

                <Link
                  href={step.route}
                  className="inline-flex items-center justify-between w-full pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group/link"
                >
                  <span>Start Step {step.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

