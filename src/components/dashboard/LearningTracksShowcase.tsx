'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  Cpu,
  Sparkles,
  Zap,
  Target,
  Bot,
  Activity,
  Server,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Terminal,
  Coffee,
} from 'lucide-react';
import {
  MODULES_CATALOG_ML_CORE,
  MODULES_CATALOG_DEEP_LEARNING,
  MODULES_CATALOG_TRANSFORMERS,
  MODULES_CATALOG_GENAI,
  MODULES_CATALOG_RAG,
  MODULES_CATALOG_AGENTS,
  MODULES_CATALOG_MLOPS,
  MODULES_CATALOG_DEPLOYMENT,
} from '@/data/modules/curriculum';
import { MODULES_CATALOG_DSA } from '@/data/dsa/curriculum';
import { MODULES_CATALOG_PYTHON } from '@/data/python/curriculum';
import { MODULES_CATALOG_JAVA } from '@/data/java/curriculum';
import { UserProgressState } from '@/lib/types';

interface LearningTracksShowcaseProps {
  progress: UserProgressState | null;
}

export const LearningTracksShowcase: React.FC<LearningTracksShowcaseProps> = ({ progress }) => {
  const [activeTab, setActiveTab] = useState<'ai-ml' | 'engineering'>('ai-ml');

  // Compute lesson counts and real user progress
  const getProgressStats = (lessons: { id: string }[]) => {
    const total = lessons.length;
    if (!progress || total === 0) return { completed: 0, total, pct: 0 };
    const completed = lessons.filter((l) => Boolean(progress.completedLessons[l.id])).length;
    return {
      completed,
      total,
      pct: Math.round((completed / total) * 100),
    };
  };

  const mlLessons = MODULES_CATALOG_ML_CORE.flatMap((m) => m.lessons);
  const dlLessons = MODULES_CATALOG_DEEP_LEARNING.flatMap((m) => m.lessons);
  const tfLessons = MODULES_CATALOG_TRANSFORMERS.flatMap((m) => m.lessons);
  const genaiLessons = MODULES_CATALOG_GENAI.flatMap((m) => m.lessons);
  const ragLessons = MODULES_CATALOG_RAG.flatMap((m) => m.lessons);
  const agentLessons = MODULES_CATALOG_AGENTS.flatMap((m) => m.lessons);
  const mlopsLessons = MODULES_CATALOG_MLOPS.flatMap((m) => m.lessons);
  const deployLessons = MODULES_CATALOG_DEPLOYMENT.flatMap((m) => m.lessons);

  const dsaLessons = MODULES_CATALOG_DSA.flatMap((m) => m.lessons);
  const pyLessons = MODULES_CATALOG_PYTHON.flatMap((m) => m.lessons);
  const javaLessons = MODULES_CATALOG_JAVA.flatMap((m) => m.lessons);

  const AI_ML_TRACKS = [
    {
      id: 'ml-foundations',
      title: 'Machine Learning',
      subtitle: 'Foundations to Advanced Models',
      description: 'Preprocessing, linear/logistic regression, decision trees, ensembles, SVMs, and unsupervised clustering.',
      route: '/curriculum',
      icon: Brain,
      badge: 'Core Track',
      color: 'from-blue-600 to-indigo-600',
      accentColor: 'indigo',
      modulesCount: MODULES_CATALOG_ML_CORE.length,
      stats: getProgressStats(mlLessons),
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
          <circle cx="40" cy="60" r="14" fill="#4f46e5" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2" />
          <circle cx="120" cy="35" r="14" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="120" cy="85" r="14" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="200" cy="60" r="14" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" />
          <path d="M54 60 L106 35 M54 60 L106 85 M134 35 L186 60 M134 85 L186 60" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning',
      subtitle: 'Neural Architectures & PyTorch',
      description: 'Perceptrons, backprop calculus, PyTorch autograd, CNNs, sequence models, and custom training loops.',
      route: '/curriculum/dl-module-1',
      icon: Cpu,
      badge: 'Deep Learning',
      color: 'from-indigo-600 to-violet-600',
      accentColor: 'violet',
      modulesCount: MODULES_CATALOG_DEEP_LEARNING.length,
      stats: getProgressStats(dlLessons),
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
          <path d="M20 90 Q 60 85 100 45 T 220 20" stroke="#8b5cf6" strokeWidth="3" fill="none" />
          <circle cx="50" cy="85" r="6" fill="#8b5cf6" />
          <circle cx="100" cy="45" r="6" fill="#8b5cf6" />
          <circle cx="160" cy="28" r="6" fill="#a78bfa" />
          <circle cx="220" cy="20" r="7" fill="#c4b5fd" />
          <rect x="70" y="70" width="100" height="30" rx="6" fill="#f5f3ff" stroke="#ddd6fe" />
          <text x="80" y="90" fontSize="11" fill="#6d28d9" fontFamily="monospace">ReLU(Wx + b)</text>
        </svg>
      ),
    },
    {
      id: 'transformers',
      title: 'Transformers',
      subtitle: 'Self-Attention to Nano-GPT',
      description: 'Self-attention, query-key-value projections, multi-head attention blocks, and building nano-GPT in PyTorch.',
      route: '/curriculum/tf-module-1',
      icon: Sparkles,
      badge: 'Architecture',
      color: 'from-violet-600 to-pink-600',
      accentColor: 'pink',
      modulesCount: MODULES_CATALOG_TRANSFORMERS.length,
      stats: getProgressStats(tfLessons),
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
          <rect x="40" y="25" width="45" height="45" rx="6" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899" strokeWidth="2" />
          <rect x="95" y="25" width="45" height="45" rx="6" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
          <rect x="150" y="25" width="45" height="45" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <text x="56" y="52" fontSize="13" fontWeight="bold" fill="#db2777">Q</text>
          <text x="111" y="52" fontSize="13" fontWeight="bold" fill="#7c3aed">K</text>
          <text x="167" y="52" fontSize="13" fontWeight="bold" fill="#2563eb">V</text>
          <path d="M40 85 H200" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
          <text x="70" y="102" fontSize="10" fill="#64748b" fontFamily="sans-serif">softmax(QKᵀ / √d) V</text>
        </svg>
      ),
    },
    {
      id: 'generative-ai',
      title: 'Generative AI & LLMs',
      subtitle: 'Pretraining, LoRA & Fine-Tuning',
      description: 'Pretraining dynamics, token budgets, decoding parameters, prompt engineering, LoRA fine-tuning, and evaluation.',
      route: '/curriculum/genai-module-1',
      icon: Zap,
      badge: 'Generative AI',
      color: 'from-amber-500 to-rose-500',
      accentColor: 'amber',
      modulesCount: MODULES_CATALOG_GENAI.length,
      stats: getProgressStats(genaiLessons),
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
          <rect x="30" y="30" width="180" height="60" rx="10" fill="#fef3c7" stroke="#fcd34d" strokeWidth="2" />
          <circle cx="55" cy="60" r="12" fill="#f59e0b" />
          <path d="M51 60 L54 64 L60 56" stroke="white" strokeWidth="2" />
          <text x="80" y="55" fontSize="11" fontWeight="bold" fill="#92400e">Prompt: Generate</text>
          <text x="80" y="73" fontSize="10" fill="#b45309" fontFamily="monospace">Tokens: [8k context]</text>
        </svg>
      ),
    },
    {
      id: 'rag-vector-search',
      title: 'RAG & Vector Search',
      subtitle: 'HNSW Indexing & Hybrid Search',
      description: 'Document ingestion, chunking trade-offs, vector embeddings, HNSW indexes, hybrid search, and RAGAS evaluation.',
      route: '/curriculum/rag-module-1',
      icon: Target,
      badge: 'Retrieval Systems',
      color: 'from-cyan-500 to-blue-600',
      accentColor: 'cyan',
      modulesCount: MODULES_CATALOG_RAG.length,
      stats: getProgressStats(ragLessons),
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
          <circle cx="120" cy="60" r="45" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="120" cy="60" r="28" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="120" cy="60" r="7" fill="#0284c7" />
          <circle cx="95" cy="45" r="5" fill="#38bdf8" />
          <circle cx="145" cy="70" r="5" fill="#38bdf8" />
          <circle cx="130" cy="35" r="4" fill="#7dd3fc" />
          <text x="75" y="112" fontSize="10" fill="#0369a1" fontWeight="500">Dense Embedding Space</text>
        </svg>
      ),
    },
    {
      id: 'ai-agents',
      title: 'AI Agents',
      subtitle: 'ReAct Loops & Tool Orchestration',
      description: 'ReAct reasoning loops, schema-validated tool calling, state memory compaction, DAG planning, and multi-agent coordination.',
      route: '/curriculum/agent-module-1',
      icon: Bot,
      badge: 'Agentic Systems',
      color: 'from-emerald-500 to-teal-600',
      accentColor: 'emerald',
      modulesCount: MODULES_CATALOG_AGENTS.length,
      stats: getProgressStats(agentLessons),
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
          <rect x="25" y="40" width="55" height="40" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
          <text x="35" y="64" fontSize="11" fontWeight="bold" fill="#065f46">Reason</text>
          <path d="M82 60 L108 60" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
          <rect x="110" y="40" width="45" height="40" rx="8" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="2" />
          <text x="123" y="64" fontSize="11" fontWeight="bold" fill="#115e59">Act</text>
          <path d="M157 60 L180 60" stroke="#14b8a6" strokeWidth="2" />
          <circle cx="195" cy="60" r="14" fill="#10b981" />
          <text x="191" y="64" fontSize="12" fill="white">✓</text>
          <path d="M185 78 C 145 105 85 105 45 78" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      id: 'mlops-llmops',
      title: 'MLOps & LLMOps',
      subtitle: 'Tracking, Drift & Model Registries',
      description: 'Experiment tracking, data/model versioning, drift monitoring (PSI), Little’s Law capacity, CI/CD, and token economics.',
      route: '/curriculum/mlops-module-1',
      icon: Activity,
      badge: 'Production Systems',
      color: 'from-blue-600 to-cyan-600',
      accentColor: 'blue',
      modulesCount: MODULES_CATALOG_MLOPS.length,
      stats: getProgressStats(mlopsLessons),
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
          <rect x="25" y="30" width="50" height="35" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="33" y="52" fontSize="9" fontWeight="bold" fill="#3730a3">Registry</text>
          <path d="M78 48 L100 48" stroke="#94a3b8" strokeWidth="2" />
          <rect x="102" y="30" width="50" height="35" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <text x="112" y="52" fontSize="9" fontWeight="bold" fill="#075985">CI / CD</text>
          <path d="M154 48 L176 48" stroke="#94a3b8" strokeWidth="2" />
          <rect x="178" y="30" width="45" height="35" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x="187" y="52" fontSize="9" fontWeight="bold" fill="#166534">Serve</text>
          <path d="M30 85 H210" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
          <text x="80" y="102" fontSize="10" fill="#64748b">Drift PSI &lt; 0.1 · Auto-Retrain</text>
        </svg>
      ),
    },
    {
      id: 'ai-deployment',
      title: 'AI Deployment & Cloud',
      subtitle: 'Docker, FastAPI & GPU Serving',
      description: 'Linux servers, Docker multi-stage builds, FastAPI microservices, GPU serving with Triton/vLLM, scaling, and cost.',
      route: '/curriculum/deployment-module-1',
      icon: Server,
      badge: 'Cloud & Infrastructure',
      color: 'from-slate-700 to-indigo-900',
      accentColor: 'slate',
      modulesCount: MODULES_CATALOG_DEPLOYMENT.length,
      stats: getProgressStats(deployLessons),
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
          <rect x="40" y="25" width="160" height="70" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
          <rect x="52" y="38" width="40" height="20" rx="4" fill="#e2e8f0" />
          <rect x="100" y="38" width="40" height="20" rx="4" fill="#e2e8f0" />
          <rect x="148" y="38" width="40" height="20" rx="4" fill="#cbd5e1" />
          <text x="60" y="52" fontSize="8" fill="#475569" fontFamily="monospace">API:80</text>
          <text x="106" y="52" fontSize="8" fill="#475569" fontFamily="monospace">GPU:vLLM</text>
          <circle cx="60" cy="78" r="4" fill="#22c55e" />
          <text x="70" y="81" fontSize="9" fill="#15803d" fontWeight="500">Docker Health: Passing</text>
        </svg>
      ),
    },
  ];

  const ENGINEERING_TRACKS = [
    {
      id: 'dsa-track',
      title: 'DSA Mastery Lab',
      subtitle: 'Algorithms & Problem Solving',
      description: 'Arrays, Linked Lists, Trees, Graphs, Sorting visualizers, and Dynamic Programming with visual step tracers.',
      route: '/dsa',
      icon: Cpu,
      badge: 'Algorithms',
      modulesCount: MODULES_CATALOG_DSA.length,
      stats: getProgressStats(dsaLessons),
    },
    {
      id: 'python-track',
      title: 'Python Mastery Lab',
      subtitle: 'Python 3.12+ & CPython Internals',
      description: 'Language mechanics, memory addresses, OOP architecture, closures, Pyodide code lab, and data science tooling.',
      route: '/python',
      icon: Terminal,
      badge: 'Programming',
      modulesCount: MODULES_CATALOG_PYTHON.length,
      stats: getProgressStats(pyLessons),
    },
    {
      id: 'java-track',
      title: 'Java Mastery Lab',
      subtitle: 'Java 21 LTS & Enterprise',
      description: 'JVM internal architecture, heap vs stack memory, collections framework, multithreading, and live code compiler.',
      route: '/java',
      icon: Coffee,
      badge: 'Enterprise',
      modulesCount: MODULES_CATALOG_JAVA.length,
      stats: getProgressStats(javaLessons),
    },
  ];

  return (
    <section id="learning-tracks" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Explore Learning Tracks
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Choose your learning path. Every track includes interactive visualizers, rigorous theory, browser-based coding labs, and production capstone projects.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            onClick={() => setActiveTab('ai-ml')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ai-ml'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            AI &amp; Machine Learning (8 Tracks)
          </button>
          <button
            onClick={() => setActiveTab('engineering')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'engineering'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Complementary Labs (DSA, Python, Java)
          </button>
        </div>
      </div>

      {/* Grid of AI & ML Tracks */}
      {activeTab === 'ai-ml' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AI_ML_TRACKS.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.id}
                className="group relative rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Header / Illustration Banner */}
                <div className="h-32 w-full bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  {track.illustration}
                  {/* Category Badge on illustration */}
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300 backdrop-blur-xs">
                    {track.badge}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {track.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  {/* Modules & Lessons Count + User Progress */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      <span>{track.modulesCount} Modules · {track.stats.total} Lessons</span>
                      {track.stats.completed > 0 ? (
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                          {track.stats.pct}%
                        </span>
                      ) : (
                        <span className="text-slate-400">Available</span>
                      )}
                    </div>

                    {/* Progress Bar (always rendered cleanly) */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${track.stats.pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={track.route}
                    className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white text-xs font-semibold transition-all group/btn"
                  >
                    <span>Explore Track</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Grid of Complementary Engineering Tracks */}
      {activeTab === 'engineering' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ENGINEERING_TRACKS.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.id}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/60 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      {track.badge}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {track.modulesCount} Modules · {track.stats.total} Lessons
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {track.title}
                      </h3>
                      <p className="text-xs text-slate-500">{track.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Progress</span>
                    <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {track.stats.pct}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${track.stats.pct}%` }}
                    />
                  </div>

                  <Link
                    href={track.route}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <span>Open Laboratory</span>
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
};

