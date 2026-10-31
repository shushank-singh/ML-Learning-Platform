'use client';

import React, { useState, useMemo } from 'react';
import { Filter, Check, X, Layers, Info, SlidersHorizontal } from 'lucide-react';

interface CandidateToken {
  token: string;
  logit: number;
}

const CANDIDATE_POOL: CandidateToken[] = [
  { token: ' delicious', logit: 5.6 },
  { token: ' tasty', logit: 4.8 },
  { token: ' sweet', logit: 4.1 },
  { token: ' fresh', logit: 3.5 },
  { token: ' hot', logit: 2.8 },
  { token: ' expensive', logit: 2.1 },
  { token: ' blue', logit: 1.0 },
  { token: ' plastic', logit: 0.3 },
  { token: ' recursive', logit: -1.2 },
  { token: ' galaxy', logit: -2.0 },
];

export const TopKTopPExplorer: React.FC = () => {
  const [topK, setTopK] = useState<number>(5);
  const [topP, setTopP] = useState<number>(0.85);
  const [filterMode, setFilterMode] = useState<'both' | 'topk' | 'topp'>('both');

  // Base Softmax Probabilities
  const processedTokens = useMemo(() => {
    const maxVal = Math.max(...CANDIDATE_POOL.map((c) => c.logit));
    const exps = CANDIDATE_POOL.map((c) => Math.exp(c.logit - maxVal));
    const sumExps = exps.reduce((a, b) => a + b, 0);

    const baseList = CANDIDATE_POOL.map((c, i) => ({
      token: c.token,
      rawLogit: c.logit,
      baseProb: exps[i] / sumExps,
    })).sort((a, b) => b.baseProb - a.baseProb);

    // Compute cumulative probabilities
    let cum = 0;
    const withCum = baseList.map((item, idx) => {
      cum += item.baseProb;
      const rank = idx + 1;

      // Top-K check
      const passesK = filterMode === 'topp' || rank <= topK;

      // Top-P check: smallest set whose cumulative probability exceeds topP
      // item passes if the previous cumulative was < topP
      const prevCum = cum - item.baseProb;
      const passesP = filterMode === 'topk' || prevCum < topP;

      const retained = passesK && passesP;

      return {
        ...item,
        rank,
        cumProb: cum,
        passesK,
        passesP,
        retained,
      };
    });

    // Renormalize retained tokens
    const retainedSum = withCum
      .filter((t) => t.retained)
      .reduce((acc, t) => acc + t.baseProb, 0);

    return withCum.map((item) => ({
      ...item,
      renormalizedProb: item.retained && retainedSum > 0 ? item.baseProb / retainedSum : 0,
    }));
  }, [topK, topP, filterMode]);

  const retainedCount = processedTokens.filter((t) => t.retained).length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            Decoding Truncation Explorer
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Top-K vs Top-P (Nucleus) Sampling Truncation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cut off low-probability tails to prevent nonsensical hallucinations while dynamically adapting to uncertainty.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterMode('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterMode === 'both'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Combined (Top-K & Top-P)
          </button>
          <button
            onClick={() => setFilterMode('topk')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterMode === 'topk'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Top-K Only
          </button>
          <button
            onClick={() => setFilterMode('topp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterMode === 'topp'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Top-P (Nucleus) Only
          </button>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        {(filterMode === 'both' || filterMode === 'topk') && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Top-K Cutoff: <strong className="text-purple-600 dark:text-purple-400 font-mono">{topK}</strong>
              </span>
              <span className="text-[11px] text-slate-400">Fixed rank threshold</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={topK}
              onChange={(e) => setTopK(parseInt(e.target.value, 10))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>K=1 (Greedy)</span>
              <span>K=5 (Standard)</span>
              <span>K=10 (Full pool)</span>
            </div>
          </div>
        )}

        {(filterMode === 'both' || filterMode === 'topp') && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Top-P (Nucleus) Mass: <strong className="text-purple-600 dark:text-purple-400 font-mono">{topP.toFixed(2)}</strong>
              </span>
              <span className="text-[11px] text-slate-400">Cumulative probability mass</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={topP}
              onChange={(e) => setTopP(parseFloat(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>P=0.5 (Conservative)</span>
              <span>P=0.9 (Standard)</span>
              <span>P=1.0 (No cutoff)</span>
            </div>
          </div>
        )}
      </div>

      {/* Summary status */}
      <div className="flex items-center justify-between text-xs font-mono bg-purple-50 dark:bg-purple-950/40 p-3 rounded-xl border border-purple-200 dark:border-purple-800/60">
        <span className="text-purple-900 dark:text-purple-300">
          Retained Candidate Pool: <strong>{retainedCount} of {processedTokens.length} tokens</strong>
        </span>
        <span className="text-purple-700 dark:text-purple-400">
          Sum of Retained Raw Mass: <strong>{(processedTokens.filter(t => t.retained).reduce((a,b)=>a+b.baseProb,0)*100).toFixed(1)}%</strong>
        </span>
      </div>

      {/* Candidate List Table */}
      <div className="space-y-2 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-mono">
              <th className="py-2 px-2">Rank</th>
              <th className="py-2 px-3">Token</th>
              <th className="py-2 px-3">Base P(w)</th>
              <th className="py-2 px-3">Cumulative</th>
              <th className="py-2 px-2 text-center">Status</th>
              <th className="py-2 px-3 text-right">Renormalized P(w)</th>
            </tr>
          </thead>
          <tbody>
            {processedTokens.map((item) => (
              <tr
                key={item.token}
                className={`border-b border-slate-100 dark:border-slate-800 transition-colors ${
                  item.retained
                    ? 'bg-white dark:bg-slate-800/60 text-slate-900 dark:text-slate-100'
                    : 'bg-slate-50/70 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 opacity-60 line-through'
                }`}
              >
                <td className="py-2 px-2 font-mono font-bold">#{item.rank}</td>
                <td className="py-2 px-3 font-mono font-semibold">
                  &quot;{item.token}&quot;
                </td>
                <td className="py-2 px-3 font-mono">
                  {(item.baseProb * 100).toFixed(1)}%
                </td>
                <td className="py-2 px-3 font-mono text-slate-500">
                  {(item.cumProb * 100).toFixed(1)}%
                </td>
                <td className="py-2 px-2 text-center">
                  {item.retained ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full not-line-through">
                      <Check className="w-3 h-3" /> Retained
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full not-line-through">
                      <X className="w-3 h-3" /> Pruned
                    </span>
                  )}
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold text-purple-600 dark:text-purple-400 not-line-through">
                  {item.retained ? `${(item.renormalizedProb * 100).toFixed(1)}%` : '0.0%'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insight */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
        <Info className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
        <p>
          <strong>Why Top-P (Nucleus) Outperforms Fixed Top-K:</strong> When a language model is confident (e.g. predicting &quot;Prime Minister of the United [Kingdom]&quot;), the top token might have a $95\%$ probability; Top-P truncates the rest immediately, preventing low-probability tails. In contrast, fixed Top-K ($K=10$) would unnecessarily keep 9 low-probability candidates in the sampling lottery.
        </p>
      </div>
    </div>
  );
};
