'use client';

import React, { useState, useMemo } from 'react';
import { ShieldCheck, Eye, EyeOff, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

export const CausalMaskExplorer: React.FC = () => {
  const [isCausal, setIsCausal] = useState<boolean>(true);
  const [scaleFactor, setScaleFactor] = useState<number>(1.414);
  const [selectedRow, setSelectedRow] = useState<number>(1);

  const tokens = ['The', 'neural', 'network', 'learns'];
  const N = tokens.length;

  // Synthetic pre-computed raw dot product affinity matrix QK^T (4x4)
  const baseRawScores = [
    [2.4, 0.8, 0.3, 0.1], // 'The'
    [1.2, 3.1, 1.8, 0.6], // 'neural'
    [0.5, 2.2, 3.8, 1.4], // 'network'
    [0.9, 1.5, 2.9, 4.2], // 'learns'
  ];

  // Calculate Masked Scores and Softmax Attention Weights
  const { maskedScores, softmaxWeights } = useMemo(() => {
    const masked: number[][] = [];
    const weights: number[][] = [];

    for (let i = 0; i < N; i++) {
      const rowScores: number[] = [];
      for (let j = 0; j < N; j++) {
        const scaledVal = baseRawScores[i][j] / scaleFactor;
        // In causal mode, if j > i (future token), mask with -Infinity
        if (isCausal && j > i) {
          rowScores.push(-1e9); // numerical approximation of -inf
        } else {
          rowScores.push(scaledVal);
        }
      }
      masked.push(rowScores);

      // Compute Softmax over row
      const maxVal = Math.max(...rowScores);
      const exps = rowScores.map((v) => (v < -1e8 ? 0 : Math.exp(v - maxVal)));
      const sumExp = exps.reduce((a, b) => a + b, 0);
      weights.push(exps.map((v) => (sumExp > 0 ? v / sumExp : 0)));
    }

    return { maskedScores: masked, softmaxWeights: weights };
  }, [isCausal, scaleFactor, N]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Causal Autoregressive Mask Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            See how lower-triangular causal masks enforce the arrow of time in decoder models like GPT.
          </p>
        </div>

        {/* Toggle Causal vs Bidirectional */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setIsCausal(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              isCausal
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Causal Mask (GPT)</span>
          </button>
          <button
            onClick={() => setIsCausal(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              !isCausal
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Bidirectional (BERT)</span>
          </button>
        </div>
      </div>

      {/* Row Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">Inspect Generating Token:</span>
        {tokens.map((t, idx) => (
          <button
            key={t}
            onClick={() => setSelectedRow(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedRow === idx
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Step {idx + 1}: &ldquo;{t}&rdquo;
          </button>
        ))}
      </div>

      {/* Matrix Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Masked Logits Matrix (S + M) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Logits Matrix: (QKᵀ / √dₖ) + Mask
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Future tokens → -∞</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100">
            <div className="grid grid-cols-5 gap-1.5 mb-2 text-center text-[10px] font-mono text-slate-400 font-bold">
              <div />
              {tokens.map((t) => (
                <div key={t} className="truncate">&ldquo;{t}&rdquo;</div>
              ))}
            </div>

            {tokens.map((qTok, r) => (
              <div key={qTok} className="grid grid-cols-5 gap-1.5 mb-1.5 items-center">
                <div className="text-[10px] font-mono font-bold text-slate-400 truncate text-right pr-1">
                  &ldquo;{qTok}&rdquo;
                </div>
                {tokens.map((kTok, c) => {
                  const isFuture = isCausal && c > r;
                  const isRowActive = selectedRow === r;

                  return (
                    <div
                      key={kTok}
                      className={`h-9 rounded-lg flex items-center justify-center font-mono text-xs border ${
                        isFuture
                          ? 'bg-rose-950/40 border-rose-900/60 text-rose-400 font-bold'
                          : isRowActive
                          ? 'bg-indigo-950/60 border-indigo-500/60 text-indigo-200 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      {isFuture ? '-∞' : maskedScores[r][c].toFixed(2)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Softmax Attention Probability Heatmap */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Softmax Probability Weights A
            </span>
            <span className="text-[11px] text-emerald-500 font-mono">Rows sum to 100%</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100">
            <div className="grid grid-cols-5 gap-1.5 mb-2 text-center text-[10px] font-mono text-slate-400 font-bold">
              <div />
              {tokens.map((t) => (
                <div key={t} className="truncate">&ldquo;{t}&rdquo;</div>
              ))}
            </div>

            {tokens.map((qTok, r) => (
              <div key={qTok} className="grid grid-cols-5 gap-1.5 mb-1.5 items-center">
                <div className="text-[10px] font-mono font-bold text-slate-400 truncate text-right pr-1">
                  &ldquo;{qTok}&rdquo;
                </div>
                {tokens.map((kTok, c) => {
                  const prob = softmaxWeights[r][c];
                  const isFuture = isCausal && c > r;
                  const isRowActive = selectedRow === r;

                  return (
                    <div
                      key={kTok}
                      style={{
                        backgroundColor: isFuture
                          ? 'transparent'
                          : `rgba(99, 102, 241, ${Math.max(0.1, prob * 0.95)})`,
                      }}
                      className={`h-9 rounded-lg flex items-center justify-center font-mono text-xs border ${
                        isFuture
                          ? 'border-dashed border-slate-800 text-slate-600'
                          : isRowActive
                          ? 'border-indigo-400 ring-1 ring-indigo-400/50 text-white font-extrabold'
                          : 'border-slate-800 text-slate-200'
                      }`}
                    >
                      {isFuture ? '0.0%' : `${(prob * 100).toFixed(0)}%`}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanatory Callout for Selected Token */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <span>Current Generating Token (pos {selectedRow}): &ldquo;{tokens[selectedRow]}&rdquo;</span>
        </div>
        <div className="text-slate-600 dark:text-slate-300 space-y-1">
          {tokens.map((t, idx) => {
            const prob = softmaxWeights[selectedRow][idx];
            const isFuture = isCausal && idx > selectedRow;
            return (
              <div key={t} className="flex items-center justify-between font-mono">
                <span>Can attend to Token {idx + 1} (&ldquo;{t}&rdquo;):</span>
                {isFuture ? (
                  <span className="text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                    BLOCKED (Future Token) → 0.00%
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                    ALLOWED → {(prob * 100).toFixed(1)}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

