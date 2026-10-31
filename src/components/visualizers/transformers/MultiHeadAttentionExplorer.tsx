'use client';

import React, { useState, useMemo } from 'react';
import { Layers, Sparkles, Sliders, ArrowRight, Activity, GitFork } from 'lucide-react';

interface HeadSpecialization {
  id: number;
  name: string;
  focus: string;
  color: string;
  activeColor: string;
  attentionDistribution: Record<string, number>; // Weights from "it" to words
}

const HEADS_INFO: HeadSpecialization[] = [
  {
    id: 1,
    name: 'Head 1 · Coreference Resolution',
    focus: 'Tracks semantic pronoun references (pronoun "it" resolves to "animal")',
    color: 'border-indigo-500/30 text-indigo-400',
    activeColor: 'bg-indigo-600 text-white',
    attentionDistribution: {
      'The': 0.05,
      'animal': 0.62,
      'did not': 0.03,
      'cross': 0.04,
      'the': 0.02,
      'street': 0.12,
      'because': 0.04,
      'it': 0.08,
    },
  },
  {
    id: 2,
    name: 'Head 2 · Syntactic Subject-Verb',
    focus: 'Connects actions with their actors ("cross" with "animal")',
    color: 'border-violet-500/30 text-violet-400',
    activeColor: 'bg-violet-600 text-white',
    attentionDistribution: {
      'The': 0.02,
      'animal': 0.15,
      'did not': 0.28,
      'cross': 0.45,
      'the': 0.01,
      'street': 0.03,
      'because': 0.04,
      'it': 0.02,
    },
  },
  {
    id: 3,
    name: 'Head 3 · Positional Locality',
    focus: 'Captures local n-gram transitions and immediately preceding tokens',
    color: 'border-cyan-500/30 text-cyan-400',
    activeColor: 'bg-cyan-600 text-white',
    attentionDistribution: {
      'The': 0.01,
      'animal': 0.02,
      'did not': 0.03,
      'cross': 0.05,
      'the': 0.04,
      'street': 0.15,
      'because': 0.65,
      'it': 0.05,
    },
  },
  {
    id: 4,
    name: 'Head 4 · Cause-and-Effect Logic',
    focus: 'Links causal prepositions ("because") to main clauses',
    color: 'border-amber-500/30 text-amber-400',
    activeColor: 'bg-amber-600 text-white',
    attentionDistribution: {
      'The': 0.02,
      'animal': 0.10,
      'did not': 0.35,
      'cross': 0.38,
      'the': 0.02,
      'street': 0.04,
      'because': 0.07,
      'it': 0.02,
    },
  },
];

export const MultiHeadAttentionExplorer: React.FC = () => {
  const [selectedHeadId, setSelectedHeadId] = useState<number>(1);
  const [inspectToken, setInspectToken] = useState<string>('it');

  const sentenceTokens = ['The', 'animal', 'did not', 'cross', 'the', 'street', 'because', 'it'];

  const currentHead = HEADS_INFO.find((h) => h.id === selectedHeadId) || HEADS_INFO[0];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <GitFork className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Multi-Head Attention (MHA) Subspace Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Observe how multiple attention heads specialize simultaneously in syntax, coreference, and logic.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800">
          h = 4 Heads · d_k = d_v = 16
        </div>
      </div>

      {/* Head Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {HEADS_INFO.map((h) => {
          const isSelected = selectedHeadId === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setSelectedHeadId(h.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? `${h.activeColor} shadow-md ring-2 ring-indigo-500/30`
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold truncate">{h.name}</div>
              <div className={`text-[10px] mt-1 line-clamp-1 opacity-80`}>
                {h.focus}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Attention Arcs from "it" */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-500" />
            Attention Affinity from Target Word &ldquo;{inspectToken}&rdquo; across Context Tokens:
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">{currentHead.name}</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {sentenceTokens.map((word) => {
              const weight = currentHead.attentionDistribution[word] || 0.01;
              const isTarget = word === inspectToken;

              return (
                <div
                  key={word}
                  className={`p-3 rounded-xl flex flex-col items-center justify-between text-center border transition-all ${
                    isTarget
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="text-xs font-mono font-bold mb-2">&ldquo;{word}&rdquo;</span>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${weight * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-indigo-300 font-bold">
                    {(weight * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Multi-Head Concat and Output Projection Diagram */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
        <span className="font-bold text-slate-800 dark:text-slate-200 block uppercase tracking-wider text-[11px]">
          Multi-Head Attention Linear Concatenation Architecture:
        </span>
        <div className="p-3 rounded-lg bg-slate-900 font-mono text-slate-300 text-[11px] space-y-1.5">
          <p className="text-indigo-400 font-bold">
            MultiHead(Q, K, V) = Concat(head₁, head₂, head₃, head₄) · W_O
          </p>
          <p className="text-slate-400">
            • Each head produces: head_i = Attention(Q · W_Q^(i), K · W_K^(i), V · W_V^(i)) ∈ ℝ^(T × 16)
          </p>
          <p className="text-slate-400">
            • Concatenation joins 4 heads: Concat(head₁...head₄) ∈ ℝ^(T × 64)
          </p>
          <p className="text-emerald-400">
            • Linear Output Matrix W_O ∈ ℝ^(64 × 64) blends all 4 subspaces back into single model dimension d_model.
          </p>
        </div>
      </div>
    </div>
  );
};

