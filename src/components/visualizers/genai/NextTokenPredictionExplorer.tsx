'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Play, RotateCcw, BarChart3, HelpCircle, ArrowRight } from 'lucide-react';

interface CandidateToken {
  token: string;
  baseLogit: number;
}

const CONTEXT_PRESETS: { label: string; prefix: string; candidates: CandidateToken[] }[] = [
  {
    label: 'Sentence Completion',
    prefix: 'The quick brown fox jumps over the',
    candidates: [
      { token: ' lazy', baseLogit: 6.8 },
      { token: ' sleeping', baseLogit: 4.9 },
      { token: ' fence', baseLogit: 4.2 },
      { token: ' moon', baseLogit: 2.1 },
      { token: ' river', baseLogit: 1.8 },
      { token: ' red', baseLogit: 0.9 },
    ],
  },
  {
    label: 'AI & Machine Learning',
    prefix: 'Large language models generate text by predicting the next',
    candidates: [
      { token: ' token', baseLogit: 7.2 },
      { token: ' word', baseLogit: 5.5 },
      { token: ' character', baseLogit: 3.8 },
      { token: ' sentence', baseLogit: 2.4 },
      { token: ' sequence', baseLogit: 2.1 },
      { token: ' embedding', baseLogit: 1.1 },
    ],
  },
  {
    label: 'Python Programming',
    prefix: 'import torch\nmodel = AutoModelForCausalLM.from_pretrained("',
    candidates: [
      { token: 'meta-llama/Llama-3-8B', baseLogit: 6.4 },
      { token: 'google/gemma-7b', baseLogit: 5.8 },
      { token: 'mistralai/Mistral-7B', baseLogit: 5.6 },
      { token: 'gpt2', baseLogit: 4.1 },
      { token: 'bert-base-uncased', baseLogit: 1.7 },
      { token: 'resnet50', baseLogit: 0.4 },
    ],
  },
];

export const NextTokenPredictionExplorer: React.FC = () => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>(CONTEXT_PRESETS[0].prefix);
  const [temperature, setTemperature] = useState<number>(1.0);
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
  const [lastSampled, setLastSampled] = useState<string | null>(null);

  const activeCandidates = CONTEXT_PRESETS[selectedPresetIdx].candidates;

  // Compute Softmax probabilities with Temperature
  const distribution = useMemo(() => {
    const scaledLogits = activeCandidates.map((c) => c.baseLogit / Math.max(0.01, temperature));
    const maxScaled = Math.max(...scaledLogits);
    const exps = scaledLogits.map((val) => Math.exp(val - maxScaled)); // numerical stability
    const sumExps = exps.reduce((acc, val) => acc + val, 0);

    const probs = activeCandidates.map((c, i) => {
      const p = exps[i] / sumExps;
      return {
        ...c,
        scaledLogit: scaledLogits[i],
        prob: p,
        percentage: (p * 100).toFixed(1),
      };
    });

    // Sort descending by probability
    return probs.sort((a, b) => b.prob - a.prob);
  }, [activeCandidates, temperature]);

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIdx(idx);
    setCurrentText(CONTEXT_PRESETS[idx].prefix);
    setGeneratedTokens([]);
    setLastSampled(null);
  };

  const handleSampleToken = (token: string) => {
    setLastSampled(token);
    setGeneratedTokens((prev) => [...prev, token]);
    setCurrentText((prev) => prev + token);
  };

  const handleRandomSample = () => {
    const rand = Math.random();
    let cumulative = 0;
    for (const item of distribution) {
      cumulative += item.prob;
      if (rand <= cumulative) {
        handleSampleToken(item.token);
        return;
      }
    }
    // Fallback to top token
    handleSampleToken(distribution[0].token);
  };

  const handleReset = () => {
    setCurrentText(CONTEXT_PRESETS[selectedPresetIdx].prefix);
    setGeneratedTokens([]);
    setLastSampled(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Visualizer
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Next-Token Prediction & Probability Distribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Inspect raw unnormalized logits, temperature scaling, and the Softmax probability distribution over candidate tokens.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Context Scenario Presets:
        </label>
        <div className="flex flex-wrap gap-2">
          {CONTEXT_PRESETS.map((preset, idx) => (
            <button
              key={preset.label}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPresetIdx === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Context Window Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Autoregressive Context Window:
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Generated: {generatedTokens.length} tokens
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          <span>{CONTEXT_PRESETS[selectedPresetIdx].prefix}</span>
          {generatedTokens.map((tok, i) => (
            <span
              key={i}
              className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-1 py-0.5 rounded font-semibold animate-pulse"
            >
              {tok}
            </span>
          ))}
          <span className="inline-block w-2 h-4 ml-1 bg-indigo-500 animate-pulse align-middle" />
        </div>
      </div>

      {/* Controls: Temperature Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Temperature ($T$): <span className="text-indigo-600 dark:text-indigo-400 font-mono">{temperature.toFixed(2)}</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {temperature < 0.3 ? 'Nearly Greedy / Deterministic' : temperature > 1.2 ? 'High Entropy / Creative' : 'Balanced'}
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0.1 (Greedy)</span>
            <span>1.0 (Standard)</span>
            <span>2.0 (High Chaos)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRandomSample}
            className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5" />
            Sample Next Token (Stochastic)
          </button>
          <button
            onClick={() => handleSampleToken(distribution[0].token)}
            className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-1.5"
            title="Greedy Pick (argmax)"
          >
            <span>Greedy (Argmax)</span>
          </button>
        </div>
      </div>

      {/* Distribution Bars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-indigo-500" />
            Next-Token Probability Distribution P(w_i | context)
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {'P(w_i) = exp(z_i / T) / \\sum_j exp(z_j / T)'}
          </span>
        </div>

        <div className="space-y-2">
          {distribution.map((item, idx) => {
            const isTop = idx === 0;
            return (
              <div
                key={item.token}
                onClick={() => handleSampleToken(item.token)}
                className="group relative cursor-pointer p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-800/80 transition-all"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-center font-mono font-bold text-slate-400 text-[11px]">
                      #{idx + 1}
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded">
                      &quot;{item.token}&quot;
                    </span>
                    {isTop && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 px-1.5 py-0.2 rounded font-semibold">
                        Argmax
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-right font-mono">
                    <span className="text-[11px] text-slate-400">
                      logit: {item.baseLogit.toFixed(1)}
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 w-14">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isTop ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-indigo-400/80 dark:bg-indigo-600/60'
                    }`}
                    style={{ width: `${Math.max(1, parseFloat(item.percentage))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanatory Footer */}
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
        <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="font-semibold">Pedagogical Real-Value Note:</p>
          <p className="leading-relaxed">
            This visualizer simulates the exact mathematical output layer of a Causal LM. Unnormalized logits $z$ from the final linear projection are scaled by $T$ before being converted to a valid categorical probability distribution by Softmax. Notice how lowering temperature to $0.1$ exponentially amplifies the top token probability toward $100\%$ (greedy behavior).
          </p>
        </div>
      </div>
    </div>
  );
};
