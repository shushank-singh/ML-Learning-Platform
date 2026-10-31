'use client';

import React, { useState, useMemo } from 'react';
import { Award, BarChart3, Sliders, CheckSquare, ShieldAlert, Sparkles } from 'lucide-react';

interface BenchmarkScore {
  mmlu: number;      // 0-100%
  gsm8k: number;     // 0-100%
  humanEval: number; // 0-100%
  arc: number;       // 0-100%
  truthfulQa: number;// 0-100%
}

interface EvaluatedModel {
  name: string;
  family: string;
  openWeights: boolean;
  scores: BenchmarkScore;
  arenaElo: number;
}

const EVAL_MODELS: EvaluatedModel[] = [
  {
    name: 'Llama 3 8B Instruct',
    family: 'Meta',
    openWeights: true,
    scores: { mmlu: 68.4, gsm8k: 79.6, humanEval: 62.2, arc: 78.6, truthfulQa: 54.2 },
    arenaElo: 1205,
  },
  {
    name: 'Mistral 7B Instruct v0.3',
    family: 'Mistral',
    openWeights: true,
    scores: { mmlu: 62.5, gsm8k: 65.4, humanEval: 50.6, arc: 74.2, truthfulQa: 49.8 },
    arenaElo: 1160,
  },
  {
    name: 'Qwen 2.5 7B Instruct',
    family: 'Alibaba',
    openWeights: true,
    scores: { mmlu: 74.5, gsm8k: 84.2, humanEval: 78.0, arc: 82.4, truthfulQa: 56.8 },
    arenaElo: 1245,
  },
  {
    name: 'Claude 3.5 Sonnet',
    family: 'Anthropic',
    openWeights: false,
    scores: { mmlu: 88.7, gsm8k: 96.4, humanEval: 93.7, arc: 96.7, truthfulQa: 71.4 },
    arenaElo: 1285,
  },
  {
    name: 'GPT-4o (Frontier)',
    family: 'OpenAI',
    openWeights: false,
    scores: { mmlu: 87.2, gsm8k: 95.8, humanEval: 90.2, arc: 95.3, truthfulQa: 69.5 },
    arenaElo: 1286,
  },
];

export const LLMEvalBenchmarkExplorer: React.FC = () => {
  const [weightMath, setWeightMath] = useState<number>(25);
  const [weightCode, setWeightCode] = useState<number>(25);
  const [weightKnowledge, setWeightKnowledge] = useState<number>(25);
  const [weightFactuality, setWeightFactuality] = useState<number>(25);
  const [filterOpenOnly, setFilterOpenOnly] = useState<boolean>(false);

  // Compute composite score based on user-weighted importance
  const rankedModels = useMemo(() => {
    const totalWeight = Math.max(1, weightMath + weightCode + weightKnowledge + weightFactuality);
    const wM = weightMath / totalWeight;
    const wC = weightCode / totalWeight;
    const wK = weightKnowledge / totalWeight;
    const wF = weightFactuality / totalWeight;

    const list = EVAL_MODELS.filter((m) => !filterOpenOnly || m.openWeights).map((m) => {
      const composite =
        m.scores.gsm8k * wM +
        m.scores.humanEval * wC +
        ((m.scores.mmlu + m.scores.arc) / 2) * wK +
        m.scores.truthfulQa * wF;

      return {
        ...m,
        compositeScore: composite,
      };
    });

    return list.sort((a, b) => b.compositeScore - a.compositeScore);
  }, [weightMath, weightCode, weightKnowledge, weightFactuality, filterOpenOnly]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Empirical Evaluation Suite
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            LLM Benchmark Evaluation & Custom Domain Weighting
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare model performance across MMLU, GSM8K, and HumanEval, and synthesize custom task-oriented composite scores.
          </p>
        </div>

        <button
          onClick={() => setFilterOpenOnly(!filterOpenOnly)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            filterOpenOnly
              ? 'bg-amber-600 text-white border-amber-600'
              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          {filterOpenOnly ? 'Showing Open-Weights Only' : 'Show All Models'}
        </button>
      </div>

      {/* Task Custom Weighting Sliders */}
      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Configure Your Production Use-Case Benchmark Weights (%):
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Math (GSM8K):</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{weightMath}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={weightMath}
              onChange={(e) => setWeightMath(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Code (HumanEval):</span>
              <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{weightCode}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={weightCode}
              onChange={(e) => setWeightCode(parseInt(e.target.value, 10))}
              className="w-full accent-teal-600"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Knowledge (MMLU):</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{weightKnowledge}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={weightKnowledge}
              onChange={(e) => setWeightKnowledge(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-600"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Factuality:</span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{weightFactuality}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={weightFactuality}
              onChange={(e) => setWeightFactuality(parseInt(e.target.value, 10))}
              className="w-full accent-rose-600"
            />
          </div>
        </div>
      </div>

      {/* Model Leaderboard */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Composite Capability Ranking:
        </div>

        <div className="space-y-2">
          {rankedModels.map((m, idx) => (
            <div
              key={m.name}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center font-bold text-slate-400 text-sm">#{idx + 1}</span>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {m.name}
                    {m.openWeights && (
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                        Open Weights
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    MMLU: {m.scores.mmlu}% &bull; GSM8K: {m.scores.gsm8k}% &bull; HumanEval: {m.scores.humanEval}% &bull; Arena Elo: {m.arenaElo}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Custom Fit Score</div>
                  <div className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">
                    {m.compositeScore.toFixed(1)} / 100
                  </div>
                </div>
                <div className="w-24 bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${m.compositeScore}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benchmark contamination warning */}
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Goodhart&apos;s Law & Test Set Contamination:</strong> When academic benchmarks become marketing targets, models are frequently fine-tuned directly on synthetic variants of test problems (data contamination). Always validate on proprietary in-domain test suites before deploying an LLM into production.
        </div>
      </div>
    </div>
  );
};

