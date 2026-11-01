'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Clock, Zap, ArrowRight, CornerDownRight } from 'lucide-react';

interface DAGNode {
  id: string;
  name: string;
  deps: string[];
  durationMs: number;
  status: 'idle' | 'running' | 'success' | 'failed' | 'cached';
  retries: number;
  errorMsg?: string;
  isCached?: boolean;
}

const INITIAL_NODES: DAGNode[] = [
  { id: 'ingest', name: 'ingest_raw_data', deps: [], durationMs: 400, status: 'idle', retries: 0, isCached: true },
  { id: 'validate', name: 'validate_schemas', deps: ['ingest'], durationMs: 600, status: 'idle', retries: 0 },
  { id: 'preprocess', name: 'preprocess_features', deps: ['validate'], durationMs: 800, status: 'idle', retries: 0 },
  { id: 'train', name: 'train_model', deps: ['preprocess'], durationMs: 1400, status: 'idle', retries: 0 },
  { id: 'eval', name: 'evaluate_metrics', deps: ['train'], durationMs: 700, status: 'idle', retries: 0 },
  { id: 'drift', name: 'check_drift_baseline', deps: ['preprocess'], durationMs: 500, status: 'idle', retries: 0 },
  { id: 'register', name: 'register_model', deps: ['eval', 'drift'], durationMs: 400, status: 'idle', retries: 0 },
];

export const PipelineDAGExplorer: React.FC = () => {
  const [nodes, setNodes] = useState<DAGNode[]>(INITIAL_NODES);
  const [injectFailureNodeId, setInjectFailureNodeId] = useState<string>('validate');
  const [enableFailureInjection, setEnableFailureInjection] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const resetPipeline = () => {
    setNodes(INITIAL_NODES.map((n): DAGNode => ({ ...n, status: 'idle', retries: 0, errorMsg: undefined })));
    setIsRunning(false);
    setActiveStep(null);
  };

  const runPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);

    const updated: DAGNode[] = INITIAL_NODES.map((n): DAGNode => ({ ...n, status: 'idle', retries: 0, errorMsg: undefined }));
    setNodes([...updated]);

    const completed = new Set<string>();

    const runNode = async (nodeId: string): Promise<boolean> => {
      const nodeIndex = updated.findIndex((n) => n.id === nodeId);
      if (nodeIndex === -1) return false;

      // Check if deps are satisfied
      const node = updated[nodeIndex];
      for (const d of node.deps) {
        if (!completed.has(d)) return false;
      }

      setActiveStep(node.name);
      updated[nodeIndex].status = 'running';
      setNodes([...updated]);

      await new Promise((res) => setTimeout(res, 450));

      // Handle caching
      if (node.isCached) {
        updated[nodeIndex].status = 'cached';
        completed.add(nodeId);
        setNodes([...updated]);
        return true;
      }

      // Handle injected failure
      if (enableFailureInjection && node.id === injectFailureNodeId) {
        if (updated[nodeIndex].retries < 2) {
          updated[nodeIndex].retries += 1;
          updated[nodeIndex].status = 'running';
          updated[nodeIndex].errorMsg = `Transient error: schema mismatch on col 'age' (Retry #${updated[nodeIndex].retries})`;
          setNodes([...updated]);
          await new Promise((res) => setTimeout(res, 500));
        }

        if (updated[nodeIndex].retries === 2) {
          updated[nodeIndex].status = 'failed';
          updated[nodeIndex].errorMsg = "Fatal: Schema validation failed after 2 retries (Column 'age' null rate 14% > 2% max threshold)";
          setNodes([...updated]);
          setIsRunning(false);
          setActiveStep(null);
          return false;
        }
      }

      updated[nodeIndex].status = 'success';
      completed.add(nodeId);
      setNodes([...updated]);
      return true;
    };

    // Topological execution levels
    const levels = [
      ['ingest'],
      ['validate'],
      ['preprocess'],
      ['train', 'drift'],
      ['eval'],
      ['register'],
    ];

    for (const lvl of levels) {
      const results = await Promise.all(lvl.map((id) => runNode(id)));
      if (results.some((r) => r === false)) {
        setIsRunning(false);
        setActiveStep(null);
        return;
      }
    }

    setIsRunning(false);
    setActiveStep(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            ML Pipeline DAG &amp; Orchestration Engine
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Directed Acyclic Graph (DAG) Execution &amp; Failure Resilience
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Simulate idempotent step execution, dependency resolution, artifact caching, and retry policies.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={runPipeline}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRunning ? 'Executing DAG...' : 'Run Pipeline'}</span>
          </button>
          <button
            onClick={resetPipeline}
            disabled={isRunning}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Failure Injection Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enableFailureInjection}
              onChange={(e) => setEnableFailureInjection(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Simulate Injected Failure &amp; Auto-Retry
            </span>
          </label>
          {enableFailureInjection && (
            <select
              value={injectFailureNodeId}
              onChange={(e) => setInjectFailureNodeId(e.target.value)}
              className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
            >
              <option value="validate">validate_schemas</option>
              <option value="train">train_model</option>
              <option value="eval">evaluate_metrics</option>
            </select>
          )}
        </div>
        <span className="text-[11px] text-slate-500">
          {activeStep ? `Active Node: ${activeStep}` : 'DAG Idle / Ready'}
        </span>
      </div>

      {/* DAG Node Graph View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((n) => {
          let badgeColor = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
          if (n.status === 'running') badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse';
          if (n.status === 'success') badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
          if (n.status === 'cached') badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
          if (n.status === 'failed') badgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';

          return (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all ${
                n.status === 'running'
                  ? 'border-amber-500 shadow-md bg-amber-50/20 dark:bg-amber-950/20'
                  : n.status === 'failed'
                  ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${badgeColor}`}>
                  {n.status}
                </span>
                {n.isCached && n.status === 'cached' && (
                  <span className="text-[10px] text-blue-500 font-semibold">Cached Skip</span>
                )}
              </div>

              <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100">
                {n.name}
              </p>

              <div className="mt-2 text-[10px] text-slate-500 space-y-0.5">
                <p>Dependencies: {n.deps.length > 0 ? n.deps.join(', ') : 'None (Root)'}</p>
                <p>Simulated duration: {n.durationMs}ms</p>
                {n.retries > 0 && <p className="text-amber-500">Retries attempted: {n.retries}/2</p>}
              </div>

              {n.errorMsg && (
                <div className="mt-2 p-1.5 rounded bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-[10px] text-rose-700 dark:text-rose-300">
                  {n.errorMsg}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
