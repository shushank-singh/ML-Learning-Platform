'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, Flame, RefreshCw, BarChart2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Candidate {
  token: string;
  logit: number;
}

const DEFAULT_LOGITS: Candidate[] = [
  { token: ' quantum', logit: 5.2 },
  { token: ' classical', logit: 3.8 },
  { token: ' neural', logit: 3.1 },
  { token: ' statistical', logit: 2.4 },
  { token: ' random', logit: 1.5 },
  { token: ' banana', logit: -0.8 },
];

export const TemperatureSamplingExplorer: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(0.7);
  const [sampleHistory, setSampleHistory] = useState<Record<string, number>>({});
  const [totalSamples, setTotalSamples] = useState<number>(0);

  // Softmax computation with numerical stabilization
  const { distribution, entropy } = useMemo(() => {
    const T = Math.max(0.01, temperature);
    const scaled = DEFAULT_LOGITS.map((c) => c.logit / T);
    const maxVal = Math.max(...scaled);
    const exps = scaled.map((v) => Math.exp(v - maxVal));
    const sumExps = exps.reduce((a, b) => a + b, 0);

    let H = 0;
    const items = DEFAULT_LOGITS.map((c, i) => {
      const p = exps[i] / sumExps;
      if (p > 1e-9) {
        H -= p * Math.log2(p);
      }
      return {
        token: c.token,
        rawLogit: c.logit,
        scaledLogit: scaled[i],
        prob: p,
        pct: (p * 100).toFixed(1),
      };
    });

    items.sort((a, b) => b.prob - a.prob);
    return { distribution: items, entropy: H };
  }, [temperature]);

  const runMonteCarlo = (count: number) => {
    const newCounts: Record<string, number> = { ...sampleHistory };
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      let acc = 0;
      let picked = distribution[0].token;
      for (const item of distribution) {
        acc += item.prob;
        if (r <= acc) {
          picked = item.token;
          break;
        }
      }
      newCounts[picked] = (newCounts[picked] || 0) + 1;
    }
    setSampleHistory(newCounts);
    setTotalSamples((prev) => prev + count);
  };

  const handleResetHistory = () => {
    setSampleHistory({});
    setTotalSamples(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            Decoding & Sampling Explorer
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Temperature & Softmax Distribution Flattening
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Simulate how dividing logits by temperature $T$ morphs the probability landscape and controls generation entropy.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300">
            Shannon Entropy: <strong className="text-indigo-600 dark:text-indigo-400">{entropy.toFixed(2)}</strong> bits
          </span>
        </div>
      </div>

      {/* Temperature Slider & Regimes */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-500" />
            Decoding Temperature ($T$): <span className="text-indigo-600 dark:text-indigo-400 font-mono text-base">{temperature.toFixed(2)}</span>
          </label>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTemperature(0.1)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                temperature <= 0.2
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              0.1 (Greedy / Math)
            </button>
            <button
              onClick={() => setTemperature(0.7)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                Math.abs(temperature - 0.7) < 0.05
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              0.7 (Standard Chat)
            </button>
            <button
              onClick={() => setTemperature(1.4)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                temperature >= 1.3
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              1.4 (Creative / Hallucination Risk)
            </button>
          </div>
        </div>

        <input
          type="range"
          min="0.05"
          max="2.0"
          step="0.05"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-full accent-indigo-600"
        />

        <div className="grid grid-cols-3 text-[11px] text-slate-500 font-mono pt-1">
          <div>$T \to 0$: Argmax step function</div>
          <div className="text-center">$T = 1.0$: True model distribution</div>
          <div className="text-right">$T \to \infty$: Uniform random noise</div>
        </div>
      </div>

      {/* Probabilities vs Empirical Monte Carlo Sampling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Theoretical Softmax Probabilities */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-indigo-500" />
              Theoretical Softmax Probability
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {'z_i / T \u2192 Softmax'}
            </span>
          </div>

          <div className="space-y-2">
            {distribution.map((item, idx) => (
              <div
                key={item.token}
                className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/60"
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-400">#{idx + 1}</span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                      &quot;{item.token}&quot;
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-right font-mono">
                    <span className="text-[11px] text-slate-400">
                      logit: {item.rawLogit.toFixed(1)} &rarr; {(item.rawLogit / temperature).toFixed(1)}
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 w-12">
                      {item.pct}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-200"
                    style={{ width: `${Math.max(1, parseFloat(item.pct))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Empirical Monte Carlo Sampling */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Empirical Draws (Monte Carlo: {totalSamples} pulls)
            </span>
            {totalSamples > 0 && (
              <button
                onClick={handleResetHistory}
                className="text-[11px] text-rose-500 hover:underline flex items-center gap-1"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => runMonteCarlo(1)}
              className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
            >
              Draw 1 Sample
            </button>
            <button
              onClick={() => runMonteCarlo(50)}
              className="flex-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors"
            >
              Draw 50 Samples
            </button>
            <button
              onClick={() => runMonteCarlo(200)}
              className="flex-1 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-medium transition-colors"
            >
              Draw 200 Samples
            </button>
          </div>

          <div className="space-y-2">
            {distribution.map((item) => {
              const count = sampleHistory[item.token] || 0;
              const empPct = totalSamples > 0 ? ((count / totalSamples) * 100).toFixed(1) : '0.0';
              return (
                <div
                  key={item.token}
                  className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/60"
                >
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                      &quot;{item.token}&quot;
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {count} ({empPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                      style={{ width: `${Math.max(0, parseFloat(empPct))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Math Notice */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <strong>Mathematical Principle:</strong> Temperature does not change the rank order of tokens because z_i &gt; z_j &hArr; z_i/T &gt; z_j/T for any T &gt; 0. However, it drastically modifies the relative margin: as T &rarr; 0, the probability difference is magnified exponentially, concentrating all mass onto argmax_i(z_i).
      </div>
    </div>
  );
};
