'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, Activity, Sparkles, ArrowRight, Eye, Info } from 'lucide-react';

export const AttentionExplorer: React.FC = () => {
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number>(0);
  const [temperatureScale, setTemperatureScale] = useState<number>(1.414); // sqrt(d_k) where d_k = 2

  const tokens = ['AI', 'learns', 'fast'];

  // 2D Embeddings for Query (Q), Key (K), and Value (V)
  const Q = [
    [1.2, 0.4],  // AI
    [0.3, 1.1],  // learns
    [0.9, -0.7], // fast
  ];

  const K = [
    [1.0, 0.5],  // AI
    [0.4, 1.2],  // learns
    [0.8, -0.6], // fast
  ];

  const V = [
    [2.0, 0.5],
    [0.2, 3.0],
    [1.5, -1.0],
  ];

  // Compute Scaled Dot Product Attention
  const { rawScores, scaledScores, attentionWeights, contextVectors } = useMemo(() => {
    // 1. Raw Scores: S = Q * K^T (3x3)
    const raw: number[][] = [];
    const scaled: number[][] = [];
    const weights: number[][] = [];

    for (let i = 0; i < 3; i++) {
      const rawRow: number[] = [];
      const scaledRow: number[] = [];
      for (let j = 0; j < 3; j++) {
        // Dot product Q[i] · K[j]
        const dot = Q[i][0] * K[j][0] + Q[i][1] * K[j][1];
        rawRow.push(dot);
        scaledRow.push(dot / temperatureScale);
      }
      raw.push(rawRow);
      scaled.push(scaledRow);

      // Softmax over row
      const maxVal = Math.max(...scaledRow);
      const expRow = scaledRow.map((v) => Math.exp(v - maxVal));
      const expSum = expRow.reduce((a, b) => a + b, 0);
      weights.push(expRow.map((v) => v / expSum));
    }

    // Context vectors: Output = AttentionWeights * V (3x2)
    const contexts: number[][] = [];
    for (let i = 0; i < 3; i++) {
      let dim0 = 0;
      let dim1 = 0;
      for (let j = 0; j < 3; j++) {
        dim0 += weights[i][j] * V[j][0];
        dim1 += weights[i][j] * V[j][1];
      }
      contexts.push([dim0, dim1]);
    }

    return {
      rawScores: raw,
      scaledScores: scaled,
      attentionWeights: weights,
      contextVectors: contexts,
    };
  }, [temperatureScale]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Scaled Dot-Product Self-Attention Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compute Query-Key affinities <code className="text-indigo-500 font-mono">QKᵀ / √dₖ</code> and Softmax attention weights over the sequence <code className="text-indigo-400 font-mono">[&quot;AI&quot;, &quot;learns&quot;, &quot;fast&quot;]</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Scaling Factor (√dₖ):</span>
          <span className="font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            {temperatureScale.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Token Selector Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Inspecting Query Token:</span>
        {tokens.map((t, idx) => (
          <button
            key={t}
            onClick={() => setSelectedTokenIdx(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTokenIdx === idx
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Token {idx + 1}: &ldquo;{t}&rdquo;
          </button>
        ))}
      </div>

      {/* Heatmap & Attention Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Softmax Attention Heatmap (3x3) */}
        <div className="lg:col-span-6 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">Attention Weight Heatmap (Softmax)</span>
            <span className="text-[11px] text-slate-500">Rows = Queries (Q), Cols = Keys (K)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100">
            {/* Header Column Labels */}
            <div className="grid grid-cols-4 gap-2 mb-2 text-center text-[11px] font-mono font-bold text-slate-400">
              <div />
              {tokens.map((t) => (
                <div key={t} className="truncate">K: &ldquo;{t}&rdquo;</div>
              ))}
            </div>

            {/* Rows */}
            {tokens.map((qTok, r) => (
              <div key={qTok} className="grid grid-cols-4 gap-2 mb-2 items-center">
                <div className="text-[11px] font-mono font-bold text-slate-400 truncate text-right pr-2">
                  Q: &ldquo;{qTok}&rdquo;
                </div>
                {tokens.map((kTok, c) => {
                  const weight = attentionWeights[r][c];
                  const isCurrentRow = selectedTokenIdx === r;
                  return (
                    <div
                      key={kTok}
                      style={{
                        backgroundColor: `rgba(99, 102, 241, ${Math.max(0.12, weight * 0.95)})`,
                      }}
                      className={`h-12 rounded-xl flex flex-col items-center justify-center font-mono text-xs transition-all border ${
                        isCurrentRow
                          ? 'border-indigo-400 ring-2 ring-indigo-400/40 shadow-sm'
                          : 'border-slate-800'
                      }`}
                    >
                      <span className="font-extrabold text-white">{(weight * 100).toFixed(1)}%</span>
                      <span className="text-[9px] text-indigo-200/80">score: {scaledScores[r][c].toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Context Composition */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs space-y-3">
            <span className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
              Token &ldquo;{tokens[selectedTokenIdx]}&rdquo; Attention Distribution
            </span>

            <div className="space-y-2">
              {tokens.map((kTok, kIdx) => {
                const w = attentionWeights[selectedTokenIdx][kIdx];
                return (
                  <div key={kTok} className="space-y-1">
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                      <span>Attends to &ldquo;{kTok}&rdquo;:</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {(w * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                        style={{ width: `${w * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Context Vector Output */}
            <div className="pt-2 border-t border-indigo-200/60 dark:border-indigo-900/60 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <span className="font-bold block text-slate-800 dark:text-slate-200">Enriched Output Representation:</span>
              <p className="mt-1">
                Context Vector = ∑(A[i, j] · V[j]) = <span className="text-emerald-600 dark:text-emerald-400 font-bold">[{contextVectors[selectedTokenIdx][0].toFixed(2)}, {contextVectors[selectedTokenIdx][1].toFixed(2)}]</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

