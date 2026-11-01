'use client';

import React, { useState } from 'react';
import { Target, BarChart2, CheckCircle2, XCircle, TrendingUp, DollarSign, Clock, Layers } from 'lucide-react';

interface BenchmarkRun {
  modelName: string;
  passAt1: number; // percentage
  toolCallAccuracy: number; // percentage
  avgSteps: number;
  costPerTask: number; // USD
  p95LatencySec: number;
}

const BENCHMARKS: BenchmarkRun[] = [
  {
    modelName: 'Agent-Reasoner-Ultra',
    passAt1: 89.4,
    toolCallAccuracy: 96.2,
    avgSteps: 3.8,
    costPerTask: 0.042,
    p95LatencySec: 4.8,
  },
  {
    modelName: 'Agent-Direct-Fast',
    passAt1: 74.1,
    toolCallAccuracy: 88.5,
    avgSteps: 4.6,
    costPerTask: 0.008,
    p95LatencySec: 1.4,
  },
  {
    modelName: 'Agent-OpenWeights-32B',
    passAt1: 81.0,
    toolCallAccuracy: 92.0,
    avgSteps: 4.1,
    costPerTask: 0.004,
    p95LatencySec: 2.2,
  },
];

export const AgentEvaluationExplorer: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeBenchmark = BENCHMARKS[selectedIdx];

  const failureBreakdown = [
    { type: 'Incorrect Parameter Schema', pct: 42, color: 'bg-rose-500' },
    { type: 'Premature Final Conclusion', pct: 28, color: 'bg-amber-500' },
    { type: 'Circular Infinite Loop / Timeout', pct: 18, color: 'bg-purple-500' },
    { type: 'Hallucinated Tool Identifier', pct: 12, color: 'bg-indigo-500' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            Agent Evaluation &amp; Trajectory Benchmarking
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Task Success (Pass@k), Tool Precision, Latency &amp; Cost Trade-offs
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare model trajectory metrics across deterministic synthetic tool benchmarks and failure taxonomies.
          </p>
        </div>

        {/* Model Switcher */}
        <div className="flex items-center gap-2">
          {BENCHMARKS.map((b, idx) => (
            <button
              key={b.modelName}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedIdx === idx
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {b.modelName}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Pass@1 Success</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {activeBenchmark.passAt1}%
          </p>
          <span className="text-[10px] text-slate-400">End-to-end task completion</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Tool Selection Acc</span>
            <Target className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <p className="text-2xl font-bold text-sky-600 dark:text-sky-400 font-mono">
            {activeBenchmark.toolCallAccuracy}%
          </p>
          <span className="text-[10px] text-slate-400">Valid schema &amp; argument fit</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>P95 Latency</span>
            <Clock className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono">
            {activeBenchmark.p95LatencySec}s
          </p>
          <span className="text-[10px] text-slate-400">Per multi-step trajectory</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Avg Cost / Task</span>
            <DollarSign className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 font-mono">
            ${activeBenchmark.costPerTask.toFixed(3)}
          </p>
          <span className="text-[10px] text-slate-400">~{activeBenchmark.avgSteps} steps per task</span>
        </div>
      </div>

      {/* Trajectory Failure Classification Breakdown */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
          Agent Trajectory Failure Distribution (Error Classification)
        </h4>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden flex">
          {failureBreakdown.map((item, i) => (
            <div
              key={i}
              className={`${item.color} h-full transition-all`}
              style={{ width: `${item.pct}%` }}
              title={`${item.type}: ${item.pct}%`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {failureBreakdown.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
              <div className="text-[11px] leading-tight">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{item.pct}%</span>{' '}
                <span className="text-slate-500">{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

