'use client';

import React, { useState } from 'react';
import { Layers, ArrowRight, Zap, Clock, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

interface CandidatePassage {
  id: string;
  title: string;
  snippet: string;
  biEncoderScore: number;
  biEncoderRank: number;
  crossEncoderScore: number;
  crossEncoderRank: number;
  attentionReason: string;
}

const CANDIDATE_PASSAGES: CandidatePassage[] = [
  {
    id: 'p1',
    title: 'Python Memory Management',
    snippet: 'Python utilizes reference counting and an automatic generational garbage collector to reclaim unused memory blocks.',
    biEncoderScore: 0.82,
    biEncoderRank: 1,
    crossEncoderScore: 0.74,
    crossEncoderRank: 3,
    attentionReason: 'Bi-encoder matched generic "memory management" terms, but passage lacks specific circular reference resolution mechanics asked in the query.',
  },
  {
    id: 'p2',
    title: 'Resolving Cyclic References in CPython',
    snippet: 'To break cyclic references where objects reference each other, CPython generational GC detects unreachable isolated reference clusters via track_object pointer graphs.',
    biEncoderScore: 0.76,
    biEncoderRank: 3,
    crossEncoderScore: 0.96,
    crossEncoderRank: 1,
    attentionReason: 'Cross-encoder full query-passage cross-attention directly maps "cyclic references" and "breaking circular dependencies" with deep syntactic alignment.',
  },
  {
    id: 'p3',
    title: 'Garbage Collection Tuning Flags in Python',
    snippet: 'Developers can disable or manually invoke gc.collect(generation=2) and set collection thresholds using the gc module.',
    biEncoderScore: 0.79,
    biEncoderRank: 2,
    crossEncoderScore: 0.88,
    crossEncoderRank: 2,
    attentionReason: 'Strong supporting passage detailing actionable API intervention for circular reference reclamation.',
  },
  {
    id: 'p4',
    title: 'JVM Generational Garbage Collection',
    snippet: 'The Java Virtual Machine partitions heap into Eden, Survivor, and Tenured spaces, executing stop-the-world pauses during major collections.',
    biEncoderScore: 0.73,
    biEncoderRank: 4,
    crossEncoderScore: 0.12,
    crossEncoderRank: 4,
    attentionReason: 'High lexical embedding similarity with "generational garbage collection", but cross-attention immediately identifies language mismatch (JVM vs Python).',
  },
];

export const RerankingExplorer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'stage1' | 'stage2'>('stage2');
  const [selectedPassageId, setSelectedPassageId] = useState<string>('p2');

  const selectedPassage = CANDIDATE_PASSAGES.find((p) => p.id === selectedPassageId) || CANDIDATE_PASSAGES[0];

  const sortedList = [...CANDIDATE_PASSAGES].sort((a, b) =>
    activeStage === 'stage1' ? a.biEncoderRank - b.biEncoderRank : a.crossEncoderRank - b.crossEncoderRank
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Two-Stage Retrieval Architecture
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Bi-Encoder Candidate Generation vs Cross-Encoder Reranking
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare fast vector dot-product candidate retrieval against computationally intensive all-to-all token cross-attention reranking.
          </p>
        </div>

        {/* Stage Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveStage('stage1')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeStage === 'stage1'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Stage 1: Bi-Encoder (Top-K)
          </button>
          <button
            onClick={() => setActiveStage('stage2')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeStage === 'stage2'
                ? 'bg-rose-600 text-white shadow-sm font-semibold'
                : 'text-slate-500'
            }`}
          >
            Stage 2: Cross-Encoder Rerank
          </button>
        </div>
      </div>

      {/* Query Banner */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
        <div>
          <span className="font-semibold text-slate-500">Target User Query: </span>
          <span className="font-bold text-slate-900 dark:text-slate-100">
            &ldquo;How does Python garbage collection resolve circular object references?&rdquo;
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Bi-Encoder: ~5ms</span>
          <span className="text-rose-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Cross-Encoder: ~45ms</span>
        </div>
      </div>

      {/* Architecture Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className={`p-4 rounded-xl border transition-all ${
          activeStage === 'stage1'
            ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 ring-1 ring-indigo-500/20'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 opacity-70'
        }`}>
          <div className="font-bold text-indigo-700 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Bi-Encoder (Two-Tower Architecture)
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed mb-2">
            Encodes query <code className="font-mono">E(q)</code> and passage <code className="font-mono">E(p)</code> independently into fixed 1D vectors. Similarity is a simple dot product. Zero token-level cross-interaction.
          </p>
          <div className="font-mono text-[10px] text-slate-500">Complexity: O(N) ANN graph search · Pre-computed document embeddings</div>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${
          activeStage === 'stage2'
            ? 'border-rose-500 bg-rose-50/30 dark:bg-rose-950/20 ring-1 ring-rose-500/20'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 opacity-70'
        }`}>
          <div className="font-bold text-rose-700 dark:text-rose-300 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Cross-Encoder (Full Joint Attention)
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed mb-2">
            Feeds <code className="font-mono">[CLS] query [SEP] passage [SEP]</code> into all Transformer layers. Every query token attends directly to every passage token. Superior precision.
          </p>
          <div className="font-mono text-[10px] text-rose-500">Complexity: O(K × L²) quadratic attention · Evaluated only on Top-K candidates</div>
        </div>
      </div>

      {/* Main Interactive Stage Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Passages List */}
        <div className="lg:col-span-7 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Ranked Passages ({activeStage === 'stage1' ? 'Bi-Encoder Order' : 'Cross-Encoder Reranked Order'})</span>
            <span className="text-[10px] text-slate-400">Click to view attention reasoning</span>
          </div>

          <div className="space-y-2">
            {sortedList.map((p, idx) => {
              const currentRank = idx + 1;
              const isSelected = selectedPassageId === p.id;
              const rankFlipped = p.biEncoderRank !== p.crossEncoderRank;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPassageId(p.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/40 dark:bg-rose-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        activeStage === 'stage2' ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'
                      }`}>
                        Rank #{currentRank}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{p.title}</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      {activeStage === 'stage2' ? (
                        <span className="font-bold text-rose-600 dark:text-rose-400">Score: {p.crossEncoderScore}</span>
                      ) : (
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">Score: {p.biEncoderScore}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-2 leading-relaxed">
                    {p.snippet}
                  </p>

                  {rankFlipped && activeStage === 'stage2' && (
                    <div className="mt-2 flex items-center justify-between text-[10px] text-rose-600 dark:text-rose-400 border-t border-dashed border-rose-200 dark:border-rose-900/50 pt-1.5">
                      <span>Rank shifted: #{p.biEncoderRank} (Bi-Encoder) → #{p.crossEncoderRank} (Cross-Encoder)</span>
                      <span className="font-semibold">Re-ordered by token attention</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspection Panel */}
        <div className="lg:col-span-5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
            Cross-Attention Diagnostic for &ldquo;{selectedPassage.title}&rdquo;
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">Bi-Encoder Similarity:</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{selectedPassage.biEncoderScore} (Rank #{selectedPassage.biEncoderRank})</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">Cross-Encoder Relevance:</span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{selectedPassage.crossEncoderScore} (Rank #{selectedPassage.crossEncoderRank})</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Attention Analysis</span>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              {selectedPassage.attentionReason}
            </p>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed">
            <strong>Key Takeaway:</strong> Notice passage #4 (JVM Garbage Collection). The Bi-Encoder scored it high (0.73) due to generic keyword matches, but the Cross-Encoder correctly demoted it to 0.12 by cross-referencing Python against JVM tokens.
          </div>
        </div>
      </div>
    </div>
  );
};

