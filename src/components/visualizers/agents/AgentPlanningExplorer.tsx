'use client';

import React, { useState } from 'react';
import { GitBranch, CheckCircle2, Clock, AlertTriangle, ArrowRight, RefreshCw, Play, ShieldAlert, Sparkles } from 'lucide-react';

interface SubTask {
  id: string;
  title: string;
  dependencies: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  assignedTool: string;
  outputSummary?: string;
  canRunInParallel: boolean;
}

const INITIAL_PLAN: SubTask[] = [
  {
    id: 'task-1',
    title: 'Extract user prompt requirements and entity names',
    dependencies: [],
    status: 'completed',
    assignedTool: 'nlp_entity_extractor()',
    outputSummary: 'Entities: Company="AeroTech", Metric="Churn", Window="Q3"',
    canRunInParallel: false,
  },
  {
    id: 'task-2a',
    title: 'Fetch customer churn telemetries from PostgreSQL database',
    dependencies: ['task-1'],
    status: 'completed',
    assignedTool: 'sql_analytics_query()',
    outputSummary: 'Churn rate: 4.8% (n=12,400 active subscribers)',
    canRunInParallel: true,
  },
  {
    id: 'task-2b',
    title: 'Retrieve competitor churn benchmarks from public SEC filings',
    dependencies: ['task-1'],
    status: 'failed',
    assignedTool: 'web_search_rag()',
    outputSummary: 'RateLimitExceeded: 429 Too Many Requests to SEC EDGAR gateway',
    canRunInParallel: true,
  },
  {
    id: 'task-3',
    title: 'Compute statistical relative deviation against industry baseline',
    dependencies: ['task-2a', 'task-2b'],
    status: 'pending',
    assignedTool: 'stats_calculator()',
    canRunInParallel: false,
  },
  {
    id: 'task-4',
    title: 'Format comprehensive executive presentation slides',
    dependencies: ['task-3'],
    status: 'pending',
    assignedTool: 'slide_markdown_generator()',
    canRunInParallel: false,
  },
];

export const AgentPlanningExplorer: React.FC = () => {
  const [tasks, setTasks] = useState<SubTask[]>(INITIAL_PLAN);
  const [isReplanned, setIsReplanned] = useState(false);

  const triggerDynamicReplan = () => {
    // Replan: replace failed task-2b with alternative fallback tool and unblock downstream
    setTasks([
      {
        id: 'task-1',
        title: 'Extract user prompt requirements and entity names',
        dependencies: [],
        status: 'completed',
        assignedTool: 'nlp_entity_extractor()',
        outputSummary: 'Entities: Company="AeroTech", Metric="Churn", Window="Q3"',
        canRunInParallel: false,
      },
      {
        id: 'task-2a',
        title: 'Fetch customer churn telemetries from PostgreSQL database',
        dependencies: ['task-1'],
        status: 'completed',
        assignedTool: 'sql_analytics_query()',
        outputSummary: 'Churn rate: 4.8% (n=12,400 active subscribers)',
        canRunInParallel: true,
      },
      {
        id: 'task-2b-fallback',
        title: '[Replanned Fallback]: Query cached enterprise financial data warehouse',
        dependencies: ['task-1'],
        status: 'completed',
        assignedTool: 'internal_warehouse_cache()',
        outputSummary: 'Retrieved cached peer median: 6.2% churn benchmark',
        canRunInParallel: true,
      },
      {
        id: 'task-3',
        title: 'Compute statistical relative deviation against industry baseline',
        dependencies: ['task-2a', 'task-2b-fallback'],
        status: 'completed',
        assignedTool: 'stats_calculator()',
        outputSummary: 'AeroTech churn 4.8% is -1.4pp lower (better) than 6.2% benchmark',
        canRunInParallel: false,
      },
      {
        id: 'task-4',
        title: 'Format comprehensive executive presentation slides',
        dependencies: ['task-3'],
        status: 'completed',
        assignedTool: 'slide_markdown_generator()',
        outputSummary: 'Generated 4-slide executive deck with citations',
        canRunInParallel: false,
      },
    ]);
    setIsReplanned(true);
  };

  const handleReset = () => {
    setTasks(INITIAL_PLAN);
    setIsReplanned(false);
  };

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const hasFailed = tasks.some((t) => t.status === 'failed');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <GitBranch className="w-3.5 h-3.5" />
            Planning &amp; Task Decomposition DAG
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Dependency Ordering, Parallel Dispatch &amp; Dynamic Replanning
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deconstruct complex goals into Directed Acyclic Graphs (DAGs). Observe how runtime failures trigger autonomous replanning loops.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {hasFailed && !isReplanned && (
            <button
              onClick={triggerDynamicReplan}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Trigger Autonomous Replanning Loop
            </button>
          )}
          {isReplanned && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Reset Graph
            </button>
          )}
        </div>
      </div>

      {/* Status Alert Banner */}
      {hasFailed && !isReplanned ? (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start gap-3 text-xs">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-rose-800 dark:text-rose-300">
              Downstream Blocked: Task-2b encounter HTTP 429 RateLimit
            </span>
            <p className="text-rose-700 dark:text-rose-400">
              Because Task-3 explicitly depends on both Task-2a and Task-2b, standard linear execution halts. An agentic planner inspects the error and dynamically modifies the task DAG with an alternative tool.
            </p>
          </div>
        </div>
      ) : isReplanned ? (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-start gap-3 text-xs">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">
              Replanned Graph Resolved Successfully
            </span>
            <p className="text-emerald-700 dark:text-emerald-400">
              The agent rerouted retrieval to internal warehouse cache, satisfying Task-3’s dependency contract and reaching 100% completion.
            </p>
          </div>
        </div>
      ) : null}

      {/* DAG Task List & Visual Flow */}
      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <div
            key={task.id}
            className={`p-3.5 rounded-xl border transition-all ${
              task.status === 'completed'
                ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                : task.status === 'failed'
                ? 'border-rose-300 dark:border-rose-800 bg-rose-50/40 dark:bg-rose-950/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 opacity-70'
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div className="flex items-center gap-2.5">
                {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {task.status === 'failed' && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
                {task.status === 'pending' && <Clock className="w-4 h-4 text-slate-400 shrink-0" />}
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                  [{task.id}]
                </span>
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {task.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {task.canRunInParallel && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Parallelizable Branch
                  </span>
                )}
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {task.assignedTool}
                </span>
              </div>
            </div>

            {/* Dependencies & Output */}
            <div className="mt-2 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="font-medium text-slate-600 dark:text-slate-400">Depends on:</span>
                {task.dependencies.length === 0 ? (
                  <span className="italic text-slate-400">None (Root)</span>
                ) : (
                  task.dependencies.map((dep) => (
                    <span key={dep} className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {dep}
                    </span>
                  ))
                )}
              </div>

              {task.outputSummary && (
                <div
                  className={`text-[11px] font-mono ${
                    task.status === 'failed'
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  Output: {task.outputSummary}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

