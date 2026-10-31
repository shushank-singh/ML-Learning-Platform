'use client';

import React, { useState, useMemo } from 'react';
import { Layers, AlertTriangle, ShieldCheck, DollarSign, Cpu, Settings2, Trash2 } from 'lucide-react';

interface ModelPreset {
  name: string;
  maxContext: number;
  inputCostPerMillion: number;
  outputCostPerMillion: number;
}

const MODEL_PRESETS: ModelPreset[] = [
  { name: 'Standard Open Source (8K)', maxContext: 8192, inputCostPerMillion: 0.15, outputCostPerMillion: 0.60 },
  { name: 'Mid-Tier Context (32K)', maxContext: 32768, inputCostPerMillion: 0.20, outputCostPerMillion: 0.80 },
  { name: 'Ultra-Long Context (128K)', maxContext: 131072, inputCostPerMillion: 2.50, outputCostPerMillion: 10.00 },
];

export const ContextBudgetExplorer: React.FC = () => {
  const [selectedModelIdx, setSelectedModelIdx] = useState<number>(0);
  const [systemPromptTokens, setSystemPromptTokens] = useState<number>(650);
  const [fewShotTokens, setFewShotTokens] = useState<number>(1200);
  const [ragContextTokens, setRagContextTokens] = useState<number>(3400);
  const [historyTokens, setHistoryTokens] = useState<number>(2200);
  const [reservedOutputTokens, setReservedOutputTokens] = useState<number>(1500);

  const model = MODEL_PRESETS[selectedModelIdx];

  const totalInputTokens = systemPromptTokens + fewShotTokens + ragContextTokens + historyTokens;
  const totalWindowDemand = totalInputTokens + reservedOutputTokens;
  const isOverflow = totalWindowDemand > model.maxContext;
  const overflowTokens = Math.max(0, totalWindowDemand - model.maxContext);

  // Percentages for stacked bar
  const pctSystem = ((systemPromptTokens / model.maxContext) * 100);
  const pctFewShot = ((fewShotTokens / model.maxContext) * 100);
  const pctRag = ((ragContextTokens / model.maxContext) * 100);
  const pctHistory = ((historyTokens / model.maxContext) * 100);
  const pctOutput = ((reservedOutputTokens / model.maxContext) * 100);

  // KV Cache memory estimate: 2 * 2 * n_layers * d_model * seq_len
  // Assuming typical 32 layers, hidden_dim 4096 (FP16 = 2 bytes per param)
  const kvCacheMegabytes = useMemo(() => {
    const bytes = 2 * 2 * 32 * 4096 * totalWindowDemand;
    return (bytes / (1024 * 1024)).toFixed(1);
  }, [totalWindowDemand]);

  // Estimated query cost
  const estimatedCostUsd = useMemo(() => {
    const inputCost = (totalInputTokens / 1_000_000) * model.inputCostPerMillion;
    const outputCost = (reservedOutputTokens / 1_000_000) * model.outputCostPerMillion;
    return (inputCost + outputCost).toFixed(5);
  }, [totalInputTokens, reservedOutputTokens, model]);

  const handleApplyFIFO = () => {
    if (overflowTokens > 0) {
      setHistoryTokens((prev) => Math.max(0, prev - overflowTokens));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Token Budget & Memory Architect
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Context Window Allocation & Memory Budgeting
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deconstruct how system instructions, RAG chunks, multi-turn history, and output headroom fill the LLM context window.
          </p>
        </div>

        {/* Model Presets */}
        <div className="flex items-center gap-1.5">
          {MODEL_PRESETS.map((m, idx) => (
            <button
              key={m.name}
              onClick={() => setSelectedModelIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedModelIdx === idx
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Overflow Alert Banner */}
      {isOverflow ? (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-rose-800 dark:text-rose-300">
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>
              <strong>Context Overflow:</strong> Requested budget is <strong>{totalWindowDemand.toLocaleString()}</strong> tokens, exceeding the {model.maxContext.toLocaleString()} limit by <strong>{overflowTokens.toLocaleString()} tokens</strong>!
            </span>
          </div>
          <button
            onClick={handleApplyFIFO}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Auto-Prune Old History (FIFO)
          </button>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            Context Fits Safely: <strong>{totalWindowDemand.toLocaleString()} / {model.maxContext.toLocaleString()} tokens</strong> utilized ({((totalWindowDemand / model.maxContext) * 100).toFixed(1)}%).
          </span>
        </div>
      )}

      {/* Stacked Visual Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-500">
          <span>0 tokens</span>
          <span>Max: {model.maxContext.toLocaleString()} tokens</span>
        </div>
        <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex border border-slate-200 dark:border-slate-700/80 p-0.5">
          <div
            style={{ width: `${Math.min(100, pctSystem)}%` }}
            title={`System Prompt: ${systemPromptTokens} tokens`}
            className="h-full bg-indigo-500 transition-all duration-200"
          />
          <div
            style={{ width: `${Math.min(100 - pctSystem, pctFewShot)}%` }}
            title={`Few-Shot Exemplars: ${fewShotTokens} tokens`}
            className="h-full bg-violet-500 transition-all duration-200"
          />
          <div
            style={{ width: `${Math.min(100 - pctSystem - pctFewShot, pctRag)}%` }}
            title={`RAG Context: ${ragContextTokens} tokens`}
            className="h-full bg-cyan-500 transition-all duration-200"
          />
          <div
            style={{ width: `${Math.min(100 - pctSystem - pctFewShot - pctRag, pctHistory)}%` }}
            title={`Conversation History: ${historyTokens} tokens`}
            className="h-full bg-amber-500 transition-all duration-200"
          />
          <div
            style={{ width: `${Math.min(100 - pctSystem - pctFewShot - pctRag - pctHistory, pctOutput)}%` }}
            title={`Reserved Output: ${reservedOutputTokens} tokens`}
            className="h-full bg-emerald-500 transition-all duration-200"
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-slate-600 dark:text-slate-400">System ({systemPromptTokens})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-violet-500" />
            <span className="text-slate-600 dark:text-slate-400">Few-Shot ({fewShotTokens})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-slate-600 dark:text-slate-400">RAG Chunks ({ragContextTokens})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-600 dark:text-slate-400">Chat History ({historyTokens})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">Output Buffer ({reservedOutputTokens})</span>
          </div>
        </div>
      </div>

      {/* Interactive Allocation Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">System Instructions:</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400">{systemPromptTokens} tokens</span>
          </div>
          <input
            type="range"
            min="100"
            max="3000"
            step="50"
            value={systemPromptTokens}
            onChange={(e) => setSystemPromptTokens(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Few-Shot Exemplars:</span>
            <span className="font-mono text-violet-600 dark:text-violet-400">{fewShotTokens} tokens</span>
          </div>
          <input
            type="range"
            min="0"
            max="4000"
            step="50"
            value={fewShotTokens}
            onChange={(e) => setFewShotTokens(parseInt(e.target.value, 10))}
            className="w-full accent-violet-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Retrieved Documents (RAG):</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400">{ragContextTokens} tokens</span>
          </div>
          <input
            type="range"
            min="0"
            max="16000"
            step="100"
            value={ragContextTokens}
            onChange={(e) => setRagContextTokens(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Conversation History:</span>
            <span className="font-mono text-amber-600 dark:text-amber-400">{historyTokens} tokens</span>
          </div>
          <input
            type="range"
            min="0"
            max="12000"
            step="100"
            value={historyTokens}
            onChange={(e) => setHistoryTokens(parseInt(e.target.value, 10))}
            className="w-full accent-amber-600"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Max Reserved Completion / Generation:</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">{reservedOutputTokens} tokens</span>
          </div>
          <input
            type="range"
            min="256"
            max="4096"
            step="64"
            value={reservedOutputTokens}
            onChange={(e) => setReservedOutputTokens(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-600"
          />
        </div>
      </div>

      {/* Real-World Production Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Estimated KV Cache VRAM</div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
              {kvCacheMegabytes} MB <span className="text-xs font-normal text-slate-500">/ sequence</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Single Query API Cost</div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
              ${estimatedCostUsd} <span className="text-xs font-normal text-slate-500">USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

