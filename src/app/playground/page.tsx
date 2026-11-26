'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Sliders,
  TrendingUp,
  Activity,
  Target,
  Network,
  BarChart3,
  Cpu,
  Scissors,
  Search,
  Bot,
  Binary,
} from 'lucide-react';

const PlaygroundLoader = () => (
  <div className="h-72 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-xs font-mono text-slate-400">
    Loading Interactive Playground...
  </div>
);

const LinearRegressionVisualizer = dynamic(() => import('@/components/visualizers/LinearRegressionVisualizer').then((m) => m.LinearRegressionVisualizer), { ssr: false, loading: PlaygroundLoader });
const GradientDescentVisualizer = dynamic(() => import('@/components/visualizers/GradientDescentVisualizer').then((m) => m.GradientDescentVisualizer), { ssr: false, loading: PlaygroundLoader });
const LogisticBoundaryVisualizer = dynamic(() => import('@/components/visualizers/LogisticBoundaryVisualizer').then((m) => m.LogisticBoundaryVisualizer), { ssr: false, loading: PlaygroundLoader });
const KMeansVisualizer = dynamic(() => import('@/components/visualizers/KMeansVisualizer').then((m) => m.KMeansVisualizer), { ssr: false, loading: PlaygroundLoader });
const MetricsRocVisualizer = dynamic(() => import('@/components/visualizers/MetricsRocVisualizer').then((m) => m.MetricsRocVisualizer), { ssr: false, loading: PlaygroundLoader });
const MultiHeadAttentionExplorer = dynamic(() => import('@/components/visualizers/transformers/MultiHeadAttentionExplorer').then((m) => m.MultiHeadAttentionExplorer), { ssr: false, loading: PlaygroundLoader });
const TokenizationExplorer = dynamic(() => import('@/components/visualizers/transformers/TokenizationExplorer').then((m) => m.TokenizationExplorer), { ssr: false, loading: PlaygroundLoader });
const DocumentChunkingExplorer = dynamic(() => import('@/components/visualizers/rag/DocumentChunkingExplorer').then((m) => m.DocumentChunkingExplorer), { ssr: false, loading: PlaygroundLoader });
const HybridRRFExplorer = dynamic(() => import('@/components/visualizers/rag/HybridRRFExplorer').then((m) => m.HybridRRFExplorer), { ssr: false, loading: PlaygroundLoader });
const AgentControlLoopExplorer = dynamic(() => import('@/components/visualizers/agents/AgentControlLoopExplorer').then((m) => m.AgentControlLoopExplorer), { ssr: false, loading: PlaygroundLoader });

type PlaygroundTab =
  | 'regression'
  | 'gradient'
  | 'classification'
  | 'kmeans'
  | 'metrics'
  | 'attention'
  | 'tokenization'
  | 'rag-chunking'
  | 'rag-rrf'
  | 'agent-loop';

interface TabConfig {
  id: PlaygroundTab;
  label: string;
  category: 'Classical ML' | 'Modern AI & LLMs';
  icon: React.ElementType;
  color: string;
  description: string;
}

const TABS: TabConfig[] = [
  {
    id: 'regression',
    label: 'OLS Regression & Residuals',
    category: 'Classical ML',
    icon: TrendingUp,
    color: 'text-indigo-500',
    description: 'Manipulate sample noise, slope w, intercept b, and observe minimal squared residual length.',
  },
  {
    id: 'gradient',
    label: 'Gradient Descent Convergence',
    category: 'Classical ML',
    icon: Activity,
    color: 'text-emerald-500',
    description: 'Test learning rate step sizes α, witness convergence trajectories, and avoid explosive overshoot.',
  },
  {
    id: 'classification',
    label: 'Logistic Decision Boundary',
    category: 'Classical ML',
    icon: Target,
    color: 'text-cyan-500',
    description: 'Calibrate linear separation hyperplane w₁x₁ + w₂x₂ + b = logit(τ) and observe cross-entropy.',
  },
  {
    id: 'kmeans',
    label: 'K-Means Lloyd Clustering',
    category: 'Classical ML',
    icon: Network,
    color: 'text-violet-500',
    description: 'Step through Assignment and Update phases and track Within-Cluster Sum of Squares (Inertia).',
  },
  {
    id: 'metrics',
    label: 'Confusion Matrix & ROC-AUC',
    category: 'Classical ML',
    icon: BarChart3,
    color: 'text-rose-500',
    description: 'Slide decision threshold τ and observe real-time trade-off between False Positives and Recall.',
  },
  {
    id: 'attention',
    label: 'Multi-Head Self-Attention',
    category: 'Modern AI & LLMs',
    icon: Cpu,
    color: 'text-indigo-400',
    description: 'Inspect how Transformer attention heads route Q·Kᵀ weights across tokens in a sequence.',
  },
  {
    id: 'tokenization',
    label: 'BPE Tokenization & IDs',
    category: 'Modern AI & LLMs',
    icon: Binary,
    color: 'text-sky-500',
    description: 'Experiment with subword tokenization merges, token IDs, and context window token density.',
  },
  {
    id: 'rag-chunking',
    label: 'RAG Document Chunking',
    category: 'Modern AI & LLMs',
    icon: Scissors,
    color: 'text-amber-500',
    description: 'Adjust chunk size C and overlap O to visualize boundary splits and retrieval completeness.',
  },
  {
    id: 'rag-rrf',
    label: 'Hybrid BM25 + Vector RRF',
    category: 'Modern AI & LLMs',
    icon: Search,
    color: 'text-teal-500',
    description: 'Compare sparse BM25 vs dense vector rankings and tune Reciprocal Rank Fusion (RRF) scoring.',
  },
  {
    id: 'agent-loop',
    label: 'Agent ReAct Control Loop',
    category: 'Modern AI & LLMs',
    icon: Bot,
    color: 'text-purple-500',
    description: 'Simulate Thought → Action → Observation iterations, error dampening, and step budgets.',
  },
];

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('regression');

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sliders className="w-4 h-4" />
          <span>Interactive AI &amp; ML Laboratory</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Visual Algorithm &amp; LLM Playground
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Directly manipulate classical ML hyperparameters, Transformer attention heads, RAG chunking, and AI Agent control loops with instant visual feedback.
        </p>
      </div>

      {/* Category Groups */}
      {(['Classical ML', 'Modern AI & LLMs'] as const).map((category) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {category}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {TABS.filter((t) => t.category === category).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isActive
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${tab.color}`} />
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold block leading-tight ${
                      isActive
                        ? 'text-indigo-900 dark:text-indigo-300'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Description Banner for Active Tab */}
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
        <span>{TABS.find((t) => t.id === activeTab)?.description}</span>
      </div>

      {/* Active Visualizer Card */}
      <div className="mt-4">
        {activeTab === 'regression' && <LinearRegressionVisualizer />}
        {activeTab === 'gradient' && <GradientDescentVisualizer />}
        {activeTab === 'classification' && <LogisticBoundaryVisualizer />}
        {activeTab === 'kmeans' && <KMeansVisualizer />}
        {activeTab === 'metrics' && <MetricsRocVisualizer />}
        {activeTab === 'attention' && <MultiHeadAttentionExplorer />}
        {activeTab === 'tokenization' && <TokenizationExplorer />}
        {activeTab === 'rag-chunking' && <DocumentChunkingExplorer />}
        {activeTab === 'rag-rrf' && <HybridRRFExplorer />}
        {activeTab === 'agent-loop' && <AgentControlLoopExplorer />}
      </div>
    </div>
  );
}
