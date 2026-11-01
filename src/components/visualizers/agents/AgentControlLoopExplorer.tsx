'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, StepForward, CheckCircle2, AlertCircle, ArrowRight, Bot, Cpu, Terminal, Eye, Sparkles, ShieldAlert } from 'lucide-react';

interface LoopStep {
  stepNumber: number;
  phase: 'Observe' | 'Reason' | 'Act' | 'Evaluate';
  thought: string;
  action: {
    tool: string;
    params: Record<string, any>;
  } | null;
  observation: string;
  isComplete: boolean;
  tokensUsed: number;
}

interface Scenario {
  id: string;
  title: string;
  taskGoal: string;
  allowedTools: string[];
  maxSteps: number;
  steps: LoopStep[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'refund-inquiry',
    title: 'Customer Refund Processing',
    taskGoal: 'Process a refund request for Order #88419 after checking customer eligibility and ledger status.',
    allowedTools: ['lookup_order', 'check_refund_policy', 'issue_refund', 'send_notification'],
    maxSteps: 4,
    steps: [
      {
        stepNumber: 1,
        phase: 'Observe',
        thought: 'Received task to evaluate refund request for order #88419. I must first retrieve the purchase date and current fulfillment status.',
        action: { tool: 'lookup_order', params: { order_id: '88419' } },
        observation: 'Order #88419 found: Purchased 8 days ago, item returned intact, amount $149.00, status "Delivered".',
        isComplete: false,
        tokensUsed: 215,
      },
      {
        stepNumber: 2,
        phase: 'Reason',
        thought: 'The order is 8 days old. Company policy allows refunds within 30 days of delivery. Now checking policy constraints on item condition.',
        action: { tool: 'check_refund_policy', params: { category: 'Electronics', days_since_delivery: 8 } },
        observation: 'Policy match: Full refund allowed within 30-day window for unopened/intact electronic goods. Requires customer confirmation.',
        isComplete: false,
        tokensUsed: 380,
      },
      {
        stepNumber: 3,
        phase: 'Act',
        thought: 'Policy validates refund eligibility. Ready to trigger payment gateway refund transaction.',
        action: { tool: 'issue_refund', params: { order_id: '88419', amount: 149.0, currency: 'USD' } },
        observation: 'Gateway response: 200 OK. Refund txn_id #rf_99321 settled successfully.',
        isComplete: false,
        tokensUsed: 520,
      },
      {
        stepNumber: 4,
        phase: 'Evaluate',
        thought: 'Payment has succeeded. Now dispatching receipt email and concluding agent trajectory with final answer.',
        action: { tool: 'send_notification', params: { recipient: 'cust_88419@example.com', template: 'refund_confirmation' } },
        observation: 'Notification dispatched. Task criteria fully satisfied.',
        isComplete: true,
        tokensUsed: 645,
      },
    ],
  },
  {
    id: 'market-intel',
    title: 'Financial Competitor Briefing',
    taskGoal: 'Extract recent revenue growth for CloudScale Inc and compare against industry benchmark of 15%.',
    allowedTools: ['query_sec_filings', 'calculate_delta', 'generate_table'],
    maxSteps: 3,
    steps: [
      {
        stepNumber: 1,
        phase: 'Observe',
        thought: 'Need CloudScale Inc Q3 FY2026 financial metrics. Searching verified corporate filing database.',
        action: { tool: 'query_sec_filings', params: { ticker: 'CLDS', metric: 'YoY Revenue Growth', period: 'Q3-2026' } },
        observation: '10-Q filing extracted: Q3-2026 revenue was $310M vs $260M in Q3-2025 (19.2% YoY growth).',
        isComplete: false,
        tokensUsed: 290,
      },
      {
        stepNumber: 2,
        phase: 'Reason',
        thought: 'Company grew 19.2%. The target benchmark is 15.0%. Computing difference and relative outperformance.',
        action: { tool: 'calculate_delta', params: { reported: 19.2, benchmark: 15.0 } },
        observation: 'Delta computed: +4.2 percentage points (28.0% outperformance vs benchmark).',
        isComplete: false,
        tokensUsed: 440,
      },
      {
        stepNumber: 3,
        phase: 'Evaluate',
        thought: 'All factual queries and mathematical computations verified. Synthesizing executive summary.',
        action: null,
        observation: 'CloudScale Inc exceeded industry growth expectations with 19.2% YoY growth (+4.2pp above benchmark).',
        isComplete: true,
        tokensUsed: 580,
      },
    ],
  },
];

export const AgentControlLoopExplorer: React.FC = () => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const scenario = SCENARIOS[selectedScenarioIdx];
  const currentStep = scenario.steps[currentStepIdx];
  const progressPercent = Math.round(((currentStepIdx + 1) / scenario.steps.length) * 100);

  const handleNext = () => {
    if (currentStepIdx < scenario.steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            Agent Control Loop (ReAct / OODA)
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Observe → Reason → Act → Evaluate Interactive Cycle
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Step through autonomous agent trajectories and examine scratchpad thoughts, tool invocations, and environment feedback.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex items-center gap-2">
          {SCENARIOS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedScenarioIdx(idx);
                setCurrentStepIdx(0);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedScenarioIdx === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Banner */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-semibold text-slate-900 dark:text-slate-100">User Goal:</span>
          <p className="text-slate-600 dark:text-slate-300">{scenario.taskGoal}</p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400">Allowlisted Tools:</span>
            {scenario.allowedTools.map((t) => (
              <span key={t} className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px]">
                {t}()
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Phase Cycle Visualizer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(['Observe', 'Reason', 'Act', 'Evaluate'] as const).map((phaseName) => {
          const isActive = currentStep.phase === phaseName;
          const isPassed =
            (['Observe', 'Reason', 'Act', 'Evaluate'].indexOf(currentStep.phase) >
              ['Observe', 'Reason', 'Act', 'Evaluate'].indexOf(phaseName)) ||
            currentStep.isComplete;

          return (
            <div
              key={phaseName}
              className={`p-3.5 rounded-xl border transition-all ${
                isActive
                  ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                  : isPassed
                  ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {phaseName === 'Observe' && '1. Environment'}
                  {phaseName === 'Reason' && '2. Deliberation'}
                  {phaseName === 'Act' && '3. Execution'}
                  {phaseName === 'Evaluate' && '4. Verification'}
                </span>
                {isActive && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                )}
                {isPassed && !isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{phaseName}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {phaseName === 'Observe' && 'Receive environment & user inputs'}
                {phaseName === 'Reason' && 'Generate scratchpad chain-of-thought'}
                {phaseName === 'Act' && 'Invoke structured schema-validated tool'}
                {phaseName === 'Evaluate' && 'Verify results or produce final answer'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Step Detail Box */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4 bg-slate-50/30 dark:bg-slate-900/50">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-600 text-white">
              Iteration #{currentStep.stepNumber} of {scenario.steps.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Tokens: ~{currentStep.tokensUsed}
            </span>
          </div>
          {currentStep.isComplete && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Trajectory Terminated Successfully
            </span>
          )}
        </div>

        {/* Thought Scratchpad */}
        <div className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <Cpu className="w-3 h-3" /> Agent Internal Thought (Scratchpad)
          </span>
          <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/40 text-xs text-slate-700 dark:text-slate-300 font-serif italic">
            "{currentStep.thought}"
          </div>
        </div>

        {/* Action Taken */}
        <div className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1">
            <Terminal className="w-3 h-3" /> Tool Action Dispatched
          </span>
          <div className="p-3 rounded-lg bg-slate-900 text-sky-300 font-mono text-xs overflow-x-auto">
            {currentStep.action ? (
              <div>
                <span className="text-emerald-400">action</span> ={' '}
                <span className="text-amber-300">{currentStep.action.tool}</span>(
                <span className="text-slate-300">
                  {JSON.stringify(currentStep.action.params, null, 2)}
                </span>
                )
              </div>
            ) : (
              <span className="text-slate-400">// No external tool needed — Final response formulation</span>
            )}
          </div>
        </div>

        {/* Environment Observation */}
        <div className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Eye className="w-3 h-3" /> Environment Observation (Feedback)
          </span>
          <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-300 font-mono">
            {currentStep.observation}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Previous Step
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIdx === scenario.steps.length - 1}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 transition-all"
          >
            <span>Next Step</span>
            <StepForward className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            title="Reset Loop"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress meter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-36 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {progressPercent}% Complete
          </span>
        </div>
      </div>
    </div>
  );
};

