'use client';

import React, { useState } from 'react';
import { Database, HardDrive, Brain, Layers, Archive, Trash2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface MemoryItem {
  id: string;
  type: 'working' | 'short_term' | 'episodic';
  content: string;
  tokens: number;
  importance: number; // 0 to 1
  ttl: string;
}

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'm1',
    type: 'working',
    content: 'Current task: Synthesize quarterly financial report for Acme Corp and calculate EBITDA variance.',
    tokens: 45,
    importance: 0.95,
    ttl: 'Active task duration',
  },
  {
    id: 'm2',
    type: 'working',
    content: 'Scratchpad: EBITDA for Q3 = $42M; Q2 = $38M; delta = +$4M (+10.5%). Pending CFO sign-off.',
    tokens: 58,
    importance: 0.9,
    ttl: 'Active task duration',
  },
  {
    id: 'm3',
    type: 'short_term',
    content: 'User message: "Please format monetary figures in millions with one decimal place."',
    tokens: 28,
    importance: 0.8,
    ttl: 'Current session (15 mins)',
  },
  {
    id: 'm4',
    type: 'short_term',
    content: 'User message: "Do not mention the pending European patent until next Tuesday."',
    tokens: 34,
    importance: 0.85,
    ttl: 'Current session (15 mins)',
  },
  {
    id: 'm5',
    type: 'episodic',
    content: 'Customer preferences: User is Senior Director of Finance; prefers bulleted executive summaries over dense prose.',
    tokens: 40,
    importance: 0.75,
    ttl: 'Persistent cross-session (30 days)',
  },
  {
    id: 'm6',
    type: 'episodic',
    content: 'Domain knowledge: Acme Corp fiscal year ends December 31; operating currency is USD.',
    tokens: 32,
    importance: 0.7,
    ttl: 'Persistent cross-session (90 days)',
  },
];

export const AgentMemoryStateExplorer: React.FC = () => {
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [contextBudget, setContextBudget] = useState(250);
  const [compressionMode, setCompressionMode] = useState<'none' | 'summarize' | 'evict_lru'>('none');
  const [summarizedText, setSummarizedText] = useState<string | null>(null);

  const totalTokens = memories.reduce((acc, m) => acc + m.tokens, 0);
  const budgetUtilization = Math.min(100, Math.round((totalTokens / contextBudget) * 100));

  const applySummarization = () => {
    // Compress short-term memory into single condensed memory
    const shortTerms = memories.filter((m) => m.type === 'short_term');
    if (shortTerms.length === 0) return;

    const condensedTokens = 22;
    const summaryItem: MemoryItem = {
      id: 'm_sum_' + Date.now(),
      type: 'short_term',
      content: '[Recursive Summary]: User requested $M (1 decimal) formatting and confidential silence on EU patent until Tuesday.',
      tokens: condensedTokens,
      importance: 0.9,
      ttl: 'Current session',
    };

    setMemories((prev) => [...prev.filter((m) => m.type !== 'short_term'), summaryItem]);
    setCompressionMode('summarize');
    setSummarizedText(summaryItem.content);
  };

  const applyLRUEviction = () => {
    // Evict lowest importance item
    if (memories.length <= 2) return;
    const sorted = [...memories].sort((a, b) => a.importance - b.importance);
    const toRemoveId = sorted[0].id;
    setMemories((prev) => prev.filter((m) => m.id !== toRemoveId));
    setCompressionMode('evict_lru');
  };

  const handleReset = () => {
    setMemories(INITIAL_MEMORIES);
    setCompressionMode('none');
    setSummarizedText(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5" />
            Agent Memory &amp; State Architecture
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Working Scratchpad, Short-Term History &amp; Persistent Episodic Memory
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Analyze memory tiering, token context utilization, eviction policies, and automated memory compression.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={applySummarization}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all flex items-center gap-1"
          >
            <Archive className="w-3.5 h-3.5" />
            Summarize Buffer
          </button>
          <button
            onClick={applyLRUEviction}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-all flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Evict Lowest Pri
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Context Window Budget Meter */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-850/50 space-y-3">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Active Memory Token Load:</span>
            <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">
              {totalTokens} / {contextBudget} tokens
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                totalTokens > contextBudget
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              }`}
            >
              {totalTokens > contextBudget ? 'Context Overflow!' : `${budgetUtilization}% Allocated`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">Context Limit:</span>
            <input
              type="range"
              min="150"
              max="400"
              step="25"
              value={contextBudget}
              onChange={(e) => setContextBudget(Number(e.target.value))}
              className="w-28 accent-purple-600"
            />
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">{contextBudget}t</span>
          </div>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden flex">
          <div
            className={`transition-all duration-300 ${
              totalTokens > contextBudget ? 'bg-rose-500' : 'bg-purple-600'
            }`}
            style={{ width: `${Math.min(100, (totalTokens / contextBudget) * 100)}%` }}
          />
        </div>
      </div>

      {/* 3 Memory Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier 1: Working State */}
        <div className="border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/40 pb-2">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              1. Working State (Scratchpad)
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300">
              Ephemeral
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Holds active step-by-step intermediate variables, active loop objectives, and tool return buffers.
          </p>
          <div className="space-y-2">
            {memories
              .filter((m) => m.type === 'working')
              .map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/30 text-xs space-y-1 shadow-2xs"
                >
                  <p className="text-slate-800 dark:text-slate-200">{m.content}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                    <span>{m.tokens} tokens</span>
                    <span>TTL: {m.ttl}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Tier 2: Short-Term Dialogue History */}
        <div className="border border-sky-200 dark:border-sky-900/60 bg-sky-50/30 dark:bg-sky-950/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-sky-100 dark:border-sky-900/40 pb-2">
            <span className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              2. Short-Term Buffer
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-300">
              Session
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Recent user prompts, assistant turns, and constraints. Compressible via recursive summarization.
          </p>
          <div className="space-y-2">
            {memories
              .filter((m) => m.type === 'short_term')
              .map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/30 text-xs space-y-1 shadow-2xs"
                >
                  <p className="text-slate-800 dark:text-slate-200">{m.content}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                    <span>{m.tokens} tokens</span>
                    <span>Pri: {m.importance}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Tier 3: Long-Term Episodic Recall */}
        <div className="border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/40 pb-2">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4" />
              3. Long-Term Episodic Recall
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
              Vector / RAG
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Cross-session user preferences, org policies, and learned habits fetched via cosine similarity.
          </p>
          <div className="space-y-2">
            {memories
              .filter((m) => m.type === 'episodic')
              .map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/30 text-xs space-y-1 shadow-2xs"
                >
                  <p className="text-slate-800 dark:text-slate-200">{m.content}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                    <span>{m.tokens} tokens</span>
                    <span>TTL: {m.ttl}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

