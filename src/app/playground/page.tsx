'use client';

import React, { useState } from 'react';
import {
  Sliders,
  TrendingUp,
  Activity,
  Target,
  Network,
  BarChart3,
  Sparkles,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { LinearRegressionVisualizer } from '@/components/visualizers/LinearRegressionVisualizer';
import { GradientDescentVisualizer } from '@/components/visualizers/GradientDescentVisualizer';
import { LogisticBoundaryVisualizer } from '@/components/visualizers/LogisticBoundaryVisualizer';
import { KMeansVisualizer } from '@/components/visualizers/KMeansVisualizer';
import { MetricsRocVisualizer } from '@/components/visualizers/MetricsRocVisualizer';

type PlaygroundTab = 'regression' | 'gradient' | 'classification' | 'kmeans' | 'metrics';

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('regression');

  const tabs = [
    {
      id: 'regression' as PlaygroundTab,
      label: 'OLS Regression & Residuals',
      icon: TrendingUp,
      color: 'text-indigo-500',
      description: 'Manipulate sample noise, slope w, intercept b, and observe minimal squared residual length.',
    },
    {
      id: 'gradient' as PlaygroundTab,
      label: 'Gradient Descent Convergence',
      icon: Activity,
      color: 'text-emerald-500',
      description: 'Test learning rate step sizes α, witness convergence trajectories, and avoid explosive overshoot.',
    },
    {
      id: 'classification' as PlaygroundTab,
      label: 'Logistic Decision Boundary',
      icon: Target,
      color: 'text-cyan-500',
      description: 'Calibrate linear separation hyperplane w₁x₁ + w₂x₂ + b = logit(τ) and observe cross-entropy.',
    },
    {
      id: 'kmeans' as PlaygroundTab,
      label: 'K-Means Lloyd Clustering',
      icon: Network,
      color: 'text-violet-500',
      description: 'Step through Assignment and Update phases and track Within-Cluster Sum of Squares (Inertia).',
    },
    {
      id: 'metrics' as PlaygroundTab,
      label: 'Confusion Matrix & ROC-AUC',
      icon: BarChart3,
      color: 'text-rose-500',
      description: 'Slide decision threshold τ and observe real-time trade-off between False Positives and Recall.',
    },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sliders className="w-4 h-4" />
          <span>Interactive Machine Learning Laboratory</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Visual Algorithm Playground
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Directly manipulate parameters, learning rates, thresholds, and cluster numbers with immediate 60 FPS visual feedback.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {tabs.map((tab) => {
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
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                )}
              </div>
              <span className={`text-xs font-semibold block leading-tight ${isActive ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Description Banner for Active Tab */}
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
        <span>{tabs.find((t) => t.id === activeTab)?.description}</span>
      </div>

      {/* Active Visualizer Card */}
      <div className="mt-4">
        {activeTab === 'regression' && <LinearRegressionVisualizer />}
        {activeTab === 'gradient' && <GradientDescentVisualizer />}
        {activeTab === 'classification' && <LogisticBoundaryVisualizer />}
        {activeTab === 'kmeans' && <KMeansVisualizer />}
        {activeTab === 'metrics' && <MetricsRocVisualizer />}
      </div>
    </div>
  );
}
