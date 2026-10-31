'use client';

import React, { useState, useMemo } from 'react';
import { Activity, HelpCircle, BarChart3, TrendingDown, BookOpen } from 'lucide-react';

interface TokenItem {
  token: string;
  defaultProb: number;
}

const SENTENCE_PRESETS: { label: string; tokens: TokenItem[] }[] = [
  {
    label: 'High Confidence (Fluent LLM)',
    tokens: [
      { token: 'The', defaultProb: 0.85 },
      { token: ' capital', defaultProb: 0.65 },
      { token: ' of', defaultProb: 0.95 },
      { token: ' France', defaultProb: 0.80 },
      { token: ' is', defaultProb: 0.92 },
      { token: ' Paris', defaultProb: 0.88 },
      { token: '.', defaultProb: 0.90 },
    ],
  },
  {
    label: 'Moderate Surprisal (Technical Text)',
    tokens: [
      { token: 'Causal', defaultProb: 0.40 },
      { token: ' language', defaultProb: 0.70 },
      { token: ' models', defaultProb: 0.60 },
      { token: ' minimize', defaultProb: 0.35 },
      { token: ' cross', defaultProb: 0.50 },
      { token: ' entropy', defaultProb: 0.75 },
      { token: ' loss', defaultProb: 0.82 },
    ],
  },
  {
    label: 'High Surprisal (Anomalous / Degraded)',
    tokens: [
      { token: 'The', defaultProb: 0.85 },
      { token: ' submarine', defaultProb: 0.08 },
      { token: ' flew', defaultProb: 0.02 },
      { token: ' across', defaultProb: 0.25 },
      { token: ' quantum', defaultProb: 0.05 },
      { token: ' cheese', defaultProb: 0.01 },
      { token: '.', defaultProb: 0.70 },
    ],
  },
];

export const PerplexityLossExplorer: React.FC = () => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(0);
  const [tokensData, setTokensData] = useState<TokenItem[]>(SENTENCE_PRESETS[0].tokens);

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIdx(idx);
    setTokensData(SENTENCE_PRESETS[idx].tokens);
  };

  const handleUpdateProb = (idx: number, newProb: number) => {
    setTokensData((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], defaultProb: newProb };
      return copy;
    });
  };

  // Calculations
  const stats = useMemo(() => {
    const n = tokensData.length;
    if (n === 0) return { meanCE: 0, perplexity: 1, items: [] };

    const items = tokensData.map((item) => {
      const p = Math.max(0.0001, Math.min(0.9999, item.defaultProb));
      const nll = -Math.log(p); // Surprisal in nats
      return {
        ...item,
        p,
        nll,
      };
    });

    const sumNLL = items.reduce((acc, it) => acc + it.nll, 0);
    const meanCE = sumNLL / n;
    const perplexity = Math.exp(meanCE);

    return { meanCE, perplexity, items };
  }, [tokensData]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Pretraining Objective Explorer
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Cross-Entropy Loss & Perplexity ($PPL$)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Understand how next-token probability translates to token surprisal, mean cross-entropy, and vocabulary branching factor.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5">
          {SENTENCE_PRESETS.map((preset, idx) => (
            <button
              key={preset.label}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedPresetIdx === idx
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {preset.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80">
          <div className="text-xs text-slate-500 uppercase font-semibold">Mean Cross-Entropy Loss</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            {stats.meanCE.toFixed(3)}{' '}
            <span className="text-xs font-normal text-slate-500">nats / token</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">
            {'Loss_CE = -(1/N) * \\sum ln P(w_t | w_<t)'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50">
          <div className="text-xs text-rose-700 dark:text-rose-400 uppercase font-semibold">Perplexity (PPL)</div>
          <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">
            {stats.perplexity.toFixed(2)}{' '}
            <span className="text-xs font-normal text-slate-500">effective choices</span>
          </div>
          <div className="text-[11px] text-rose-700/80 dark:text-rose-400/80 font-mono mt-1">
            {'PPL = exp(Loss_CE) (lower is better)'}
          </div>
        </div>
      </div>

      {/* Token Heatmap & Sliders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Token-Level Surprisal Heatmap & Assigned Probabilities:
          </span>
          <span className="text-[11px] text-slate-400">
            Darker red = higher surprisal ($-\ln P$)
          </span>
        </div>

        {/* Heatmap phrase */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex flex-wrap gap-2 items-center">
          {stats.items.map((it, idx) => {
            // Normalized intensity [0, 1] based on nll (0 is green, 4 is dark red)
            const intensity = Math.min(1, it.nll / 4.0);
            return (
              <div
                key={idx}
                className="px-2.5 py-1.5 rounded-lg border font-mono text-xs flex flex-col items-center gap-0.5 shadow-sm"
                style={{
                  backgroundColor: `rgba(244, 63, 94, ${0.1 + intensity * 0.7})`,
                  borderColor: `rgba(244, 63, 94, ${0.3 + intensity * 0.7})`,
                  color: intensity > 0.5 ? '#fff' : 'inherit',
                }}
              >
                <span className="font-bold">{it.token}</span>
                <span className="text-[10px] opacity-80">{(it.p * 100).toFixed(0)}%</span>
              </div>
            );
          })}
        </div>

        {/* Sliders table */}
        <div className="space-y-2">
          {stats.items.map((it, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-center justify-between gap-4 text-xs"
            >
              <div className="w-24 font-mono font-bold text-slate-800 dark:text-slate-200">
                &quot;{it.token}&quot;
              </div>

              <div className="flex-1 flex items-center gap-3">
                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={it.p}
                  onChange={(e) => handleUpdateProb(idx, parseFloat(e.target.value))}
                  className="flex-1 accent-rose-500"
                />
                <span className="w-12 text-right font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {(it.p * 100).toFixed(0)}%
                </span>
              </div>

              <div className="w-28 text-right font-mono text-slate-500 text-[11px]">
                NLL: <strong className="text-rose-600 dark:text-rose-400">{it.nll.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intuition Box */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
        <p>
          <strong>What Perplexity Really Measures:</strong> A perplexity of $15$ means the model is as confused as if it were choosing uniformly at random among $15$ equally likely words at each token position. In modern LLM pretraining, state-of-the-art models reach perplexities between $5$ and $12$ on standard web evaluation splits.
        </p>
      </div>
    </div>
  );
};
