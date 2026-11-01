'use client';

import React, { useState } from 'react';
import { Layers, AlertTriangle, ShieldCheck, FileText, CheckCircle2, Sliders } from 'lucide-react';

interface ChunkSlot {
  id: string;
  source: string;
  tokens: number;
  score: number;
  included: boolean;
}

const INITIAL_CHUNKS: ChunkSlot[] = [
  { id: 'chk-1', source: 'Sec-10K-RiskFactors.pdf (p.42)', tokens: 420, score: 0.94, included: true },
  { id: 'chk-2', source: 'Q3-FinancialReport.pdf (p.8)', tokens: 360, score: 0.91, included: true },
  { id: 'chk-3', source: 'AuditorNotes.md', tokens: 510, score: 0.87, included: true },
  { id: 'chk-4', source: 'BoardMinutes-Oct.pdf (p.3)', tokens: 480, score: 0.81, included: false },
  { id: 'chk-5', source: 'PressRelease-Sept.txt', tokens: 290, score: 0.74, included: false },
];

export const RAGContextBudgetExplorer: React.FC = () => {
  const [modelContextLimit, setModelContextLimit] = useState<number>(4096);
  const [systemPromptTokens, setSystemPromptTokens] = useState<number>(350);
  const [historyTokens, setHistoryTokens] = useState<number>(650);
  const [userQueryTokens, setUserQueryTokens] = useState<number>(90);
  const [reserveOutputTokens, setReserveOutputTokens] = useState<number>(1024);
  const [chunks, setChunks] = useState<ChunkSlot[]>(INITIAL_CHUNKS);

  // Toggle chunk inclusion
  const toggleChunk = (id: string) => {
    setChunks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, included: !c.included } : c))
    );
  };

  const activeChunkTokens = chunks.filter((c) => c.included).reduce((sum, c) => sum + c.tokens, 0);
  const totalPromptTokens = systemPromptTokens + historyTokens + userQueryTokens + activeChunkTokens;
  const totalAllocated = totalPromptTokens + reserveOutputTokens;
  const remainingBudget = modelContextLimit - totalAllocated;
  const isOverflow = remainingBudget < 0;

  // Percentage calculations
  const pctSystem = (systemPromptTokens / modelContextLimit) * 100;
  const pctHistory = (historyTokens / modelContextLimit) * 100;
  const pctQuery = (userQueryTokens / modelContextLimit) * 100;
  const pctChunks = (activeChunkTokens / modelContextLimit) * 100;
  const pctReserve = (reserveOutputTokens / modelContextLimit) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            Prompt Architecture
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            RAG Context-Window Budgeting & Token Allocator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Allocate and guard prompt token budgets across System Instructions, Few-Shot Prompts, Multi-Turn History, Retrieved Context Chunks, and Reserved Generation Output.
          </p>
        </div>

        {/* Model Limit Preset */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
          {[2048, 4096, 8192, 16384].map((lim) => (
            <button
              key={lim}
              onClick={() => setModelContextLimit(lim)}
              className={`px-2.5 py-1 rounded-lg font-mono font-medium transition-all ${
                modelContextLimit === lim
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              {lim >= 1024 ? `${lim / 1024}k` : lim}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Token Stack Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Context Allocation Stack ({totalAllocated} / {modelContextLimit} tokens)
          </span>
          <span className={`font-mono font-bold ${isOverflow ? 'text-rose-500' : 'text-emerald-500'}`}>
            {isOverflow ? `OVERFLOW by ${Math.abs(remainingBudget)} tok!` : `${remainingBudget} tok free`}
          </span>
        </div>

        <div className="w-full h-7 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex p-0.5 border border-slate-200 dark:border-slate-700">
          <div style={{ width: `${Math.min(pctSystem, 100)}%` }} className="bg-blue-500 h-full rounded-l-lg transition-all" title="System Prompt"></div>
          <div style={{ width: `${Math.min(pctHistory, 100)}%` }} className="bg-amber-500 h-full transition-all" title="Conversation History"></div>
          <div style={{ width: `${Math.min(pctQuery, 100)}%` }} className="bg-teal-500 h-full transition-all" title="User Query"></div>
          <div style={{ width: `${Math.min(pctChunks, 100)}%` }} className="bg-indigo-600 h-full transition-all" title="Retrieved Chunks"></div>
          <div style={{ width: `${Math.min(pctReserve, 100)}%` }} className="bg-rose-500 h-full rounded-r-lg transition-all" title="Reserved Output"></div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-500"></span> System ({systemPromptTokens})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500"></span> History ({historyTokens})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-teal-500"></span> Query ({userQueryTokens})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-indigo-600"></span> Chunks ({activeChunkTokens})</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-500"></span> Reserved Output ({reserveOutputTokens})</span>
        </div>
      </div>

      {/* Interactive Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>System Prompt</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">{systemPromptTokens} tok</span>
          </div>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={systemPromptTokens}
            onChange={(e) => setSystemPromptTokens(Number(e.target.value))}
            className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Chat History</span>
            <span className="font-mono text-amber-600 dark:text-amber-400">{historyTokens} tok</span>
          </div>
          <input
            type="range"
            min={0}
            max={2000}
            step={50}
            value={historyTokens}
            onChange={(e) => setHistoryTokens(Number(e.target.value))}
            className="w-full accent-amber-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>User Query</span>
            <span className="font-mono text-teal-600 dark:text-teal-400">{userQueryTokens} tok</span>
          </div>
          <input
            type="range"
            min={20}
            max={500}
            step={10}
            value={userQueryTokens}
            onChange={(e) => setUserQueryTokens(Number(e.target.value))}
            className="w-full accent-teal-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Reserved Output</span>
            <span className="font-mono text-rose-600 dark:text-rose-400">{reserveOutputTokens} tok</span>
          </div>
          <input
            type="range"
            min={256}
            max={2048}
            step={64}
            value={reserveOutputTokens}
            onChange={(e) => setReserveOutputTokens(Number(e.target.value))}
            className="w-full accent-rose-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Retrieved Chunks Selection List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Retrieved Evidence Chunks (Toggle to Fit Budget)</span>
          <span className="text-slate-500 font-mono">Total Chunks Tokens: {activeChunkTokens} tok</span>
        </div>

        <div className="space-y-2">
          {chunks.map((chunk) => (
            <div
              key={chunk.id}
              onClick={() => toggleChunk(chunk.id)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                chunk.included
                  ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={chunk.included}
                  onChange={() => {}}
                  className="accent-indigo-600 rounded"
                />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{chunk.source}</span>
                  <div className="text-[10px] text-slate-500">Relevance Score: {chunk.score.toFixed(2)}</div>
                </div>
              </div>

              <div className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                {chunk.tokens} tok
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning if overflow */}
      {isOverflow && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong>Context Window Truncation Hazard:</strong> The prompt exceeds the hardware context limit by {Math.abs(remainingBudget)} tokens. The LLM provider will either throw a 400 ContextWindowExceeded error or silently truncate the end of the prompt, cutting off the user query or top retrieved evidence!
          </div>
        </div>
      )}
    </div>
  );
};

