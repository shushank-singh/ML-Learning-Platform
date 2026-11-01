'use client';

import React, { useState } from 'react';
import { Activity, Clock, DollarSign, Layers, AlertCircle, CheckCircle2, RotateCcw, Play, ShieldAlert } from 'lucide-react';

interface TraceSpan {
  id: string;
  name: string;
  tool: string;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  costUSD: number;
  status: 'ok' | 'timeout' | 'loop_breaker';
}

const TRACE_SPANS: TraceSpan[] = [
  {
    id: 'span-01',
    name: 'agent_root_loop.step_1',
    tool: 'parse_query()',
    durationMs: 420,
    inputTokens: 310,
    outputTokens: 65,
    costUSD: 0.0012,
    status: 'ok',
  },
  {
    id: 'span-02',
    name: 'agent_root_loop.step_2',
    tool: 'retrieval_vector_search()',
    durationMs: 780,
    inputTokens: 520,
    outputTokens: 180,
    costUSD: 0.0028,
    status: 'ok',
  },
  {
    id: 'span-03',
    name: 'agent_root_loop.step_3',
    tool: 'python_sandbox_exec()',
    durationMs: 1450,
    inputTokens: 940,
    outputTokens: 310,
    costUSD: 0.0051,
    status: 'ok',
  },
  {
    id: 'span-04',
    name: 'agent_root_loop.step_4',
    tool: 'python_sandbox_exec() [RETRY]',
    durationMs: 820,
    inputTokens: 1250,
    outputTokens: 110,
    costUSD: 0.0042,
    status: 'ok',
  },
  {
    id: 'span-05',
    name: 'agent_root_loop.step_5',
    tool: 'synthesize_final_markdown()',
    durationMs: 910,
    inputTokens: 1540,
    outputTokens: 420,
    costUSD: 0.0075,
    status: 'ok',
  },
];

export const AgentTraceBudgetExplorer: React.FC = () => {
  const [maxStepsLimit, setMaxStepsLimit] = useState(5);
  const [costBudgetUSD, setCostBudgetUSD] = useState(0.025);
  const [simulatedSpans, setSimulatedSpans] = useState<TraceSpan[]>(TRACE_SPANS);

  const totalDuration = simulatedSpans.reduce((a, b) => a + b.durationMs, 0);
  const totalTokens = simulatedSpans.reduce((a, b) => a + b.inputTokens + b.outputTokens, 0);
  const totalCost = simulatedSpans.reduce((a, b) => a + b.costUSD, 0);

  const isCostExceeded = totalCost > costBudgetUSD;
  const isStepLimitBreached = simulatedSpans.length > maxStepsLimit;

  const triggerInfiniteLoop = () => {
    // Add 4 identical repeated tool calls
    const loopSpans: TraceSpan[] = Array.from({ length: 4 }).map((_, i) => ({
      id: `span-loop-${i}`,
      name: `agent_root_loop.step_${6 + i} [LOOP DETECTED]`,
      tool: 'fetch_retry_attempt()',
      durationMs: 650,
      inputTokens: 1600,
      outputTokens: 40,
      costUSD: 0.005,
      status: i === 3 ? 'loop_breaker' : 'ok',
    }));
    setSimulatedSpans([...TRACE_SPANS, ...loopSpans]);
  };

  const resetTrace = () => {
    setSimulatedSpans(TRACE_SPANS);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Execution Traces &amp; Cost Budgets
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Telemetry Spans, Token Consumption &amp; Loop Circuit Breakers
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Audit agent call trees, inspect per-step token dissipation, and test circuit breaker mechanisms against unbounded recursion.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerInfiniteLoop}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-all flex items-center gap-1 shadow-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Simulate Loop Failure
          </button>
          <button
            onClick={resetTrace}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Aggregate Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-1">
          <span className="text-[11px] text-slate-500">Total Steps</span>
          <p className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
            {simulatedSpans.length} / {maxStepsLimit}
          </p>
          <span className={`text-[10px] font-semibold ${isStepLimitBreached ? 'text-rose-500' : 'text-emerald-500'}`}>
            {isStepLimitBreached ? 'Step budget exceeded!' : 'Within step limit'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-1">
          <span className="text-[11px] text-slate-500">Latency Duration</span>
          <p className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
            {(totalDuration / 1000).toFixed(2)}s
          </p>
          <span className="text-[10px] text-slate-400">Sum of span latencies</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-1">
          <span className="text-[11px] text-slate-500">Accumulated Tokens</span>
          <p className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">
            {totalTokens.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-400">Prompt + completion</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 space-y-1">
          <span className="text-[11px] text-slate-500">Accrued Cost (USD)</span>
          <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            ${totalCost.toFixed(4)}
          </p>
          <span className={`text-[10px] font-semibold ${isCostExceeded ? 'text-rose-500' : 'text-emerald-500'}`}>
            Budget: ${costBudgetUSD.toFixed(3)}
          </span>
        </div>
      </div>

      {/* Trace Timeline Table */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
          <span>Execution Span Trace (OpenTelemetry Compatible)</span>
          <span>Status &amp; Budget State</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {simulatedSpans.map((span) => (
            <div
              key={span.id}
              className={`px-4 py-3 text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-2 ${
                span.status === 'loop_breaker'
                  ? 'bg-rose-50/60 dark:bg-rose-950/30'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {span.name}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px]">
                    {span.tool}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-3">
                  <span>Duration: {span.durationMs}ms</span>
                  <span>Tokens: {span.inputTokens + span.outputTokens}</span>
                  <span>Cost: ${span.costUSD.toFixed(4)}</span>
                </div>
              </div>

              <div>
                {span.status === 'loop_breaker' ? (
                  <span className="px-2 py-1 rounded text-[11px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    CIRCUIT BREAKER TRIGGERED
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    OK
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

