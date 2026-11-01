'use client';

import React, { useState } from 'react';
import { Workflow, ArrowRight, GitFork, CheckCircle, RefreshCw, Layers, ShieldCheck, Database } from 'lucide-react';

interface WorkflowNode {
  id: string;
  name: string;
  type: 'router' | 'worker' | 'evaluator' | 'output';
  description: string;
}

export const AgentWorkflowGraphExplorer: React.FC = () => {
  const [userQuery, setUserQuery] = useState<'refund' | 'code_debug' | 'ambiguous'>('code_debug');
  const [confidenceScore, setConfidenceScore] = useState(0.88);
  const [retryBudget, setRetryBudget] = useState(3);
  const [activeStep, setActiveStep] = useState<number>(0);

  const getRouterDecision = () => {
    if (userQuery === 'refund') return { route: 'Billing Specialist', targetNode: 'node_billing' };
    if (userQuery === 'code_debug') return { route: 'Python Code Specialist', targetNode: 'node_coding' };
    return { route: 'Human Escalation Gate', targetNode: 'node_escalate' };
  };

  const decision = getRouterDecision();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5" />
            Workflow Graph &amp; State Transitions
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Deterministic Orchestration vs Open-Ended Autonomy
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Examine state graphs, conditional routing thresholds, node transitions, and failure retry loops.
          </p>
        </div>

        {/* Input Switchers */}
        <div className="flex items-center gap-2">
          {(['code_debug', 'refund', 'ambiguous'] as const).map((q) => (
            <button
              key={q}
              onClick={() => setUserQuery(q)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                userQuery === q
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {q === 'code_debug' ? 'Python Bug Report' : q === 'refund' ? 'Charge Dispute' : 'Ambiguous Request'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-850/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300">
            <span>Router Classification Confidence:</span>
            <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{(confidenceScore * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="1.0"
            step="0.02"
            value={confidenceScore}
            onChange={(e) => setConfidenceScore(parseFloat(e.target.value))}
            className="w-full accent-teal-600"
          />
          <span className="text-[10px] text-slate-500">
            Threshold: Below 70% automatically routes to Human Clarification checkpoint.
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300">
            <span>Idempotency Retry Budget:</span>
            <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{retryBudget} attempts</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={retryBudget}
            onChange={(e) => setRetryBudget(parseInt(e.target.value))}
            className="w-full accent-teal-600"
          />
          <span className="text-[10px] text-slate-500">
            Caps tool re-executions to avoid infinite recursion or payment duplicate charges.
          </span>
        </div>
      </div>

      {/* Workflow Graph Visualizer */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Node 1: Ingest & Guard */}
          <div className="flex-1 w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400">Step 1: Entry Node</span>
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1">Prompt Sanitize &amp; State Init</h4>
            <p className="text-[11px] text-slate-500 mt-1">Validate user token auth, initialize session state accumulator.</p>
          </div>

          <ArrowRight className="hidden md:block w-4 h-4 text-slate-400" />

          {/* Node 2: Router */}
          <div className="flex-1 w-full p-4 rounded-xl border border-teal-500 bg-teal-50/50 dark:bg-teal-950/30 ring-2 ring-teal-500/20 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400">Step 2: Router Node</span>
            <h4 className="font-bold text-xs text-teal-900 dark:text-teal-200 mt-1">Intent Classifier</h4>
            <div className="mt-2 text-[11px] space-y-0.5">
              <span className="text-slate-600 dark:text-slate-400">Routed to: </span>
              <span className="font-bold text-teal-700 dark:text-teal-300">
                {confidenceScore < 0.7 ? 'Human Escalation Gate' : decision.route}
              </span>
            </div>
          </div>

          <ArrowRight className="hidden md:block w-4 h-4 text-slate-400" />

          {/* Node 3: Specialist Worker */}
          <div className="flex-1 w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400">Step 3: Specialist Agent</span>
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1">Domain Worker Node</h4>
            <p className="text-[11px] text-slate-500 mt-1">Executes bounded tools with strict max-step constraint.</p>
          </div>

          <ArrowRight className="hidden md:block w-4 h-4 text-slate-400" />

          {/* Node 4: Synthesis & Output */}
          <div className="flex-1 w-full p-4 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-emerald-950/20 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Step 4: Exit Node</span>
            <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-200 mt-1">Audit Log &amp; Delivery</h4>
            <p className="text-[11px] text-slate-500 mt-1">Saves state delta, records token trace, delivers answer.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

