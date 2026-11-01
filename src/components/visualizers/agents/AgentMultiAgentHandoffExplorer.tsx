'use client';

import React, { useState } from 'react';
import { Users, Bot, ArrowRight, CornerDownRight, CheckCircle2, MessageSquare, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface AgentRole {
  id: string;
  name: string;
  role: string;
  color: string;
  allowedTools: string[];
  systemPrompt: string;
}

const AGENTS: AgentRole[] = [
  {
    id: 'supervisor',
    name: 'Lead Orchestrator',
    role: 'Decomposes user goal, assigns work, validates subagent outputs, and synthesizes final answer.',
    color: 'indigo',
    allowedTools: ['assign_task', 'synthesize_brief'],
    systemPrompt: 'You are the orchestrator. You do not run raw code or search databases directly. You delegate to specialists.',
  },
  {
    id: 'researcher',
    name: 'Research Specialist',
    role: 'Gathers raw data and verifies documentation from vector databases and external APIs.',
    color: 'sky',
    allowedTools: ['vector_search', 'api_caller'],
    systemPrompt: 'Extract factual evidence with exact citation IDs. Do not formulate code or write business conclusions.',
  },
  {
    id: 'analyst',
    name: 'Code & Math Analyst',
    role: 'Performs statistical modeling, data transformation, and code evaluation in a sandbox.',
    color: 'emerald',
    allowedTools: ['python_exec', 'stats_calc'],
    systemPrompt: 'Receive research data arrays, compute variance, distributions, and return clean structured JSON metrics.',
  },
  {
    id: 'critic',
    name: 'Compliance Critic',
    role: 'Audits answers against company safety policies, confidentiality rules, and hallucination bounds.',
    color: 'rose',
    allowedTools: ['policy_linter', 'pii_scrubber'],
    systemPrompt: 'Critique drafted reports for unsupported claims or privacy leaks. Reject or approve for final delivery.',
  },
];

interface HandoffMessage {
  id: string;
  from: string;
  to: string;
  stepName: string;
  payload: string;
  tokens: number;
}

export const AgentMultiAgentHandoffExplorer: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState('supervisor');
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const selectedAgent = AGENTS.find((a) => a.id === selectedAgentId) || AGENTS[0];

  const HANDOFFS: HandoffMessage[] = [
    {
      id: 'h1',
      from: 'Lead Orchestrator',
      to: 'Research Specialist',
      stepName: 'Delegation 1: Data Gathering',
      payload: '{"task": "fetch_pricing_trends", "target": "Q3 SaaS churn benchmark", "depth": "high"}',
      tokens: 65,
    },
    {
      id: 'h2',
      from: 'Research Specialist',
      to: 'Code & Math Analyst',
      stepName: 'Data Handoff: Raw Evidence',
      payload: '{"raw_series": [4.2, 5.1, 4.8, 6.3], "unit": "percent", "source_id": "SEC-EDGAR-2026"}',
      tokens: 88,
    },
    {
      id: 'h3',
      from: 'Code & Math Analyst',
      to: 'Compliance Critic',
      stepName: 'Draft Synthesis & Code Verification',
      payload: '{"mean_churn": 5.1, "std_dev": 0.76, "draft_conclusion": "Company outperforms median by 1.1%"}',
      tokens: 112,
    },
    {
      id: 'h4',
      from: 'Compliance Critic',
      to: 'Lead Orchestrator',
      stepName: 'Audit Sign-off & Final Approval',
      payload: '{"policy_check": "PASS", "pii_detected": false, "hallucination_risk": 0.02, "verdict": "APPROVED"}',
      tokens: 74,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Multi-Agent Systems &amp; Protocol Handoffs
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Supervisor-Specialist Architecture &amp; Context Isolation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare specialized subagent roles, bounded tool privileges, and structured message-passing handoffs.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {HANDOFFS.map((h, idx) => (
            <button
              key={h.id}
              onClick={() => setActiveStepIdx(idx)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                activeStepIdx === idx
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Team Topology Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AGENTS.map((agent) => {
          const isSelected = selectedAgentId === agent.id;
          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-violet-500 bg-violet-50/40 dark:bg-violet-950/30 ring-2 ring-violet-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-violet-500" />
                  {agent.name}
                </span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" />}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                {agent.role}
              </p>
              <div className="flex flex-wrap gap-1">
                {agent.allowedTools.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[9px]"
                  >
                    {t}()
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Handoff Message Inspector */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/30 dark:bg-slate-900/50 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">Active Handoff Protocol:</span>
            <span className="font-semibold text-violet-600 dark:text-violet-400">
              {HANDOFFS[activeStepIdx].stepName}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Handoff Payload: {HANDOFFS[activeStepIdx].tokens} tokens
          </span>
        </div>

        {/* Transmission Route */}
        <div className="flex items-center justify-center gap-3 py-2 text-xs font-semibold">
          <span className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
            {HANDOFFS[activeStepIdx].from}
          </span>
          <ArrowRight className="w-4 h-4 text-violet-500 animate-pulse" />
          <span className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            {HANDOFFS[activeStepIdx].to}
          </span>
        </div>

        {/* JSON Payload */}
        <div className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
          <pre>{HANDOFFS[activeStepIdx].payload}</pre>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
          Context Isolation Benefit: The receiving specialist gets only the verified payload schema, avoiding 8,000+ tokens of raw prompt scratchpad noise from previous agents.
        </p>
      </div>
    </div>
  );
};

