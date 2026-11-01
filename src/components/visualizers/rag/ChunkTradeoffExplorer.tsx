'use client';

import React, { useState } from 'react';
import { Sliders, HelpCircle, BarChart3, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ChunkTradeoffExplorer: React.FC = () => {
  const [chunkSizeTokens, setChunkSizeTokens] = useState<number>(256);

  // Tradeoff physics calculations
  // Small chunk (64 tok): high precision, low recall, high fragmentation
  // Large chunk (2048 tok): low precision, high recall, high context dilution
  const t = (chunkSizeTokens - 64) / (2048 - 64); // 0.0 to 1.0

  // Retrieval Precision: decays as chunk size grows (diluted embeddings)
  const precisionScore = Math.max(25, Math.round(92 - t * 50));
  // Retrieval Recall: increases as chunk captures more surrounding tokens
  const recallScore = Math.min(95, Math.round(40 + Math.sqrt(t) * 52));
  // Context Dilution / Distraction Index
  const dilutionRisk = Math.round(t * 85 + 10);
  // Cost & Latency Factor (proportional to total ingested chunk tokens sent to LLM)
  const contextConsumptionTokens = Math.round(5 * chunkSizeTokens);
  // Boundary severance risk (high for tiny chunks, low for large chunks)
  const boundarySeveranceRisk = Math.max(5, Math.round(85 * (1 - t)));

  // Optimal zone indicator
  const isOptimal = chunkSizeTokens >= 256 && chunkSizeTokens <= 512;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            Empirical Tuning Engine
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Chunk Size vs Retrieval Trade-Off Simulator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Explore how chunk granularity modulates the fundamental tension between Retrieval Precision and Retrieval Recall in enterprise RAG pipelines.
          </p>
        </div>

        {isOptimal && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Recommended RAG Sweet Spot (256–512 tok)
          </div>
        )}
      </div>

      {/* Main Slider Control */}
      <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Chunk Window Dimension:
            </span>{' '}
            <span className="text-base font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {chunkSizeTokens} Tokens
            </span>{' '}
            <span className="text-xs text-slate-500">(~{Math.round(chunkSizeTokens * 0.75)} words / ~{chunkSizeTokens * 4} chars)</span>
          </div>

          <div className="flex gap-2">
            {[64, 128, 256, 512, 1024, 2048].map((size) => (
              <button
                key={size}
                onClick={() => setChunkSizeTokens(size)}
                className={`px-2.5 py-1 text-xs rounded-lg font-mono border transition-all ${
                  chunkSizeTokens === size
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <input
          type="range"
          min={64}
          max={2048}
          step={64}
          value={chunkSizeTokens}
          onChange={(e) => setChunkSizeTokens(Number(e.target.value))}
          className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>64 tok (High Granularity)</span>
          <span>256–512 tok (Enterprise Default)</span>
          <span>2048 tok (Coarse Context)</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Precision */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Retrieval Precision</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{precisionScore}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${precisionScore}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-500">
            {precisionScore > 75
              ? 'Dense semantic match with minimal extraneous irrelevant tokens.'
              : 'Vector embedding diluted by competing topics within the chunk.'}
          </p>
        </div>

        {/* Recall */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Retrieval Recall</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{recallScore}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${recallScore}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-500">
            {recallScore > 75
              ? 'High likelihood of capturing all multi-hop reasoning evidence.'
              : 'Fragile: evidence fractured across multiple disjoint chunks.'}
          </p>
        </div>

        {/* Dilution Risk */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Context Dilution & Distraction</span>
            <span className="font-mono font-bold text-rose-500">{dilutionRisk}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${dilutionRisk}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-500">
            {dilutionRisk > 60
              ? 'High risk of "Lost in the Middle" attention degradation in LLM.'
              : 'Tight focus ensures high generator faithfulness.'}
          </p>
        </div>

        {/* Prompt Overhead */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Top-5 Context Load</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {contextConsumptionTokens} tok
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">
            ${((contextConsumptionTokens * 0.15) / 1000000).toFixed(6)}{' '}
            <span className="text-[10px] text-slate-400 font-normal">/ query (est)</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Cost & TTFT (Time To First Token) scales linearly with injected context tokens.
          </p>
        </div>
      </div>

      {/* Comparative Analysis Table */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
        <div className="bg-slate-100 dark:bg-slate-800 p-3 font-semibold text-slate-700 dark:text-slate-300">
          Architectural Impact Matrix for {chunkSizeTokens} Tokens
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-slate-900">
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Embedding Space Behavior</div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              {chunkSizeTokens < 128
                ? 'Hyper-specific points in vector space. Matches query keywords closely but easily triggers false positives due to lack of disambiguating topic context.'
                : chunkSizeTokens <= 512
                ? 'Balanced semantic representations. Preserves distinct sentence relationships while maintaining a single clear topical center of mass.'
                : 'Blended generalist vectors. The embedding averages out multiple distinct paragraphs, pulling the vector toward the corpus centroid and dropping similarity for specific queries.'}
            </p>
          </div>

          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Downstream LLM Impact</div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              {chunkSizeTokens < 128
                ? 'LLM receives fragmented snippets with missing pronouns and disconnected context, leading to inaccurate pronoun resolution.'
                : chunkSizeTokens <= 512
                ? 'LLM receives coherent paragraphs with complete reasoning chains and clear antecedent clauses.'
                : 'LLM context window is flooded with irrelevant conversational filler, increasing hallucination and prompt cache invalidation overhead.'}
            </p>
          </div>

          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Boundary Severance Risk</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                boundarySeveranceRisk > 50 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {boundarySeveranceRisk}% Risk
              </span>
              <span className="text-[11px] text-slate-500">
                {boundarySeveranceRisk > 50 ? 'Requires 25% overlap' : 'Standard 10% overlap sufficient'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

