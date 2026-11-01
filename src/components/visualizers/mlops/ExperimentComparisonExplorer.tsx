'use client';

import React, { useState } from 'react';
import { Sliders, Award, ArrowUpDown, Check, Filter, TrendingDown, Layers, BarChart2 } from 'lucide-react';

interface RunEntry {
  runId: string;
  name: string;
  learningRate: number;
  batchSize: number;
  optimizer: 'adamw' | 'sgd' | 'rmsprop';
  epochs: number;
  valLoss: number;
  f1Score: number;
  latencyMs: number;
  modelSizeMb: number;
  status: 'completed' | 'failed' | 'running';
  isChampion?: boolean;
}

const DEFAULT_RUNS: RunEntry[] = [
  {
    runId: 'exp-901',
    name: 'baseline_lr_1e-3',
    learningRate: 0.001,
    batchSize: 32,
    optimizer: 'adamw',
    epochs: 10,
    valLoss: 0.342,
    f1Score: 0.884,
    latencyMs: 14.2,
    modelSizeMb: 42.1,
    status: 'completed',
  },
  {
    runId: 'exp-902',
    name: 'high_lr_5e-3',
    learningRate: 0.005,
    batchSize: 64,
    optimizer: 'adamw',
    epochs: 10,
    valLoss: 0.481,
    f1Score: 0.812,
    latencyMs: 13.8,
    modelSizeMb: 42.1,
    status: 'completed',
  },
  {
    runId: 'exp-903',
    name: 'tuned_cosine_lr_3e-4',
    learningRate: 0.0003,
    batchSize: 32,
    optimizer: 'adamw',
    epochs: 15,
    valLoss: 0.218,
    f1Score: 0.938,
    latencyMs: 14.5,
    modelSizeMb: 42.1,
    status: 'completed',
    isChampion: true,
  },
  {
    runId: 'exp-904',
    name: 'sgd_momentum_0.9',
    learningRate: 0.01,
    batchSize: 16,
    optimizer: 'sgd',
    epochs: 20,
    valLoss: 0.295,
    f1Score: 0.901,
    latencyMs: 12.1,
    modelSizeMb: 42.1,
    status: 'completed',
  },
  {
    runId: 'exp-905',
    name: 'pruned_quantized_candidate',
    learningRate: 0.0003,
    batchSize: 64,
    optimizer: 'adamw',
    epochs: 15,
    valLoss: 0.229,
    f1Score: 0.932,
    latencyMs: 6.8,
    modelSizeMb: 14.2,
    status: 'completed',
  },
];

export const ExperimentComparisonExplorer: React.FC = () => {
  const [runs, setRuns] = useState<RunEntry[]>(DEFAULT_RUNS);
  const [selectedRunId, setSelectedRunId] = useState<string>('exp-903');
  const [sortBy, setSortBy] = useState<'f1Score' | 'valLoss' | 'latencyMs'>('f1Score');
  const [promotedRunId, setPromotedRunId] = useState<string | null>(null);

  const selectedRun = runs.find((r) => r.runId === selectedRunId) || runs[0];

  const sortedRuns = [...runs].sort((a, b) => {
    if (sortBy === 'f1Score') return b.f1Score - a.f1Score;
    if (sortBy === 'valLoss') return a.valLoss - b.valLoss;
    return a.latencyMs - b.latencyMs;
  });

  const handlePromote = (runId: string) => {
    setPromotedRunId(runId);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            MLflow / Experiment Tracking Matrix
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Experiment Comparison &amp; Hyperparameter Attribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare trial runs across hyperparameters, validation loss, F1-score, and inference latency.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Sort by:</span>
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
            <button
              onClick={() => setSortBy('f1Score')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                sortBy === 'f1Score' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              F1-Score
            </button>
            <button
              onClick={() => setSortBy('valLoss')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                sortBy === 'valLoss' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Val Loss
            </button>
            <button
              onClick={() => setSortBy('latencyMs')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                sortBy === 'latencyMs' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Latency
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-semibold">
            <tr>
              <th className="p-3">Run Name &amp; ID</th>
              <th className="p-3">Learning Rate</th>
              <th className="p-3">Batch Size</th>
              <th className="p-3">Optimizer</th>
              <th className="p-3">Val Loss</th>
              <th className="p-3">F1-Score</th>
              <th className="p-3">Latency (ms)</th>
              <th className="p-3">Model Size</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sortedRuns.map((r) => {
              const isSelected = r.runId === selectedRunId;
              const isPromoted = r.runId === promotedRunId;
              return (
                <tr
                  key={r.runId}
                  onClick={() => setSelectedRunId(r.runId)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'hover:bg-slate-50/60 dark:hover:bg-slate-850/60'
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {r.isChampion && (
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{r.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{r.runId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono">{r.learningRate}</td>
                  <td className="p-3 font-mono">{r.batchSize}</td>
                  <td className="p-3 uppercase font-medium text-slate-600 dark:text-slate-400">{r.optimizer}</td>
                  <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">{r.valLoss.toFixed(3)}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{(r.f1Score * 100).toFixed(1)}%</td>
                  <td className="p-3 font-mono">{r.latencyMs} ms</td>
                  <td className="p-3 font-mono">{r.modelSizeMb} MB</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePromote(r.runId);
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                        isPromoted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {isPromoted ? 'Staged' : 'Promote'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Run Inspection Card */}
      <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              Inspecting Run: {selectedRun.name}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-mono">
              {selectedRun.runId}
            </span>
          </div>
          {promotedRunId === selectedRun.runId && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              Promoted to Model Registry (Staging)
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">Generalization Gap</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Val Loss: {selectedRun.valLoss}
            </span>
          </div>
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">Classification F1</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {(selectedRun.f1Score * 100).toFixed(1)}%
            </span>
          </div>
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">P95 Inference Latency</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {selectedRun.latencyMs} ms
            </span>
          </div>
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block text-[10px]">Memory Footprint</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {selectedRun.modelSizeMb} MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

