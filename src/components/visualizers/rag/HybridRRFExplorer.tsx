'use client';

import React, { useState, useMemo } from 'react';
import { Layers, Shuffle, Sliders, ArrowUpRight, ArrowDownRight, Minus, CheckCircle2 } from 'lucide-react';

interface HybridCandidate {
  id: string;
  title: string;
  category: string;
  bm25Rank: number;
  denseRank: number;
}

const CANDIDATES: HybridCandidate[] = [
  { id: 'c1', title: 'pgvector Indexing in PostgreSQL', category: 'Database', bm25Rank: 1, denseRank: 7 },
  { id: 'c2', title: 'HNSW Graph Approximation Algorithms', category: 'Vector Search', bm25Rank: 6, denseRank: 1 },
  { id: 'c3', title: 'Reciprocal Rank Fusion in Production', category: 'Hybrid Search', bm25Rank: 2, denseRank: 3 },
  { id: 'c4', title: 'Cross-Encoder Re-Ranking Techniques', category: 'Reranking', bm25Rank: 8, denseRank: 2 },
  { id: 'c5', title: 'BM25 Token Normalization Rules', category: 'Lexical', bm25Rank: 3, denseRank: 9 },
  { id: 'c6', title: 'Parent-Child Chunk Hierarchies', category: 'Chunking', bm25Rank: 5, denseRank: 4 },
  { id: 'c7', title: 'Lost-in-the-Middle Context Degradation', category: 'Generation', bm25Rank: 4, denseRank: 6 },
  { id: 'c8', title: 'Quantized LoRA Adapter Serving', category: 'Inference', bm25Rank: 9, denseRank: 5 },
];

export const HybridRRFExplorer: React.FC = () => {
  const [rrfConstantK, setRrfConstantK] = useState<number>(60);
  const [bm25Weight, setBm25Weight] = useState<number>(0.5); // alpha weighting

  // Exact RRF formula calculation
  const fusedResults = useMemo(() => {
    return CANDIDATES.map((item) => {
      // Standard RRF: 1 / (k + rank)
      const bm25Score = 1 / (rrfConstantK + item.bm25Rank);
      const denseScore = 1 / (rrfConstantK + item.denseRank);
      // Weighted RRF fusion
      const rrfScore = bm25Weight * bm25Score + (1 - bm25Weight) * denseScore;
      return {
        ...item,
        bm25Score,
        denseScore,
        rrfScore,
      };
    })
      .sort((a, b) => b.rrfScore - a.rrfScore)
      .map((item, index) => {
        const finalRank = index + 1;
        const avgInitialRank = (item.bm25Rank + item.denseRank) / 2;
        const rankShift = avgInitialRank - finalRank;
        return {
          ...item,
          finalRank,
          rankShift,
        };
      });
  }, [rrfConstantK, bm25Weight]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Shuffle className="w-3.5 h-3.5" />
            Hybrid Fusion Engine
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Reciprocal Rank Fusion (RRF) Interactive Simulator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Fuse disjoint sparse BM25 and dense vector rank lists into an optimal consensus ranking without requiring calibrated score normalization.
          </p>
        </div>

        <div className="text-xs font-mono bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800">
          RRF(d) = Σ w_i / (k + r_i(d))
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>RRF Smoothing Constant (k)</span>
            <span className="font-mono text-purple-600 dark:text-purple-400">k = {rrfConstantK}</span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={rrfConstantK}
            onChange={(e) => setRrfConstantK(Number(e.target.value))}
            className="w-full accent-purple-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">Standard industry default is k = 60</div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Sparse (BM25) vs Dense Weight</span>
            <span className="font-mono text-purple-600 dark:text-purple-400">
              {(bm25Weight * 100).toFixed(0)}% / {((1 - bm25Weight) * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min={0.0}
            max={1.0}
            step={0.05}
            value={bm25Weight}
            onChange={(e) => setBm25Weight(Number(e.target.value))}
            className="w-full accent-purple-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">0.0 = Pure Dense | 1.0 = Pure BM25</div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-xs text-slate-500">Top Fused Candidate</div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
            {fusedResults[0].title}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-mono">
            RRF Score: {fusedResults[0].rrfScore.toFixed(5)}
          </div>
        </div>
      </div>

      {/* Visual Rank Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Input List 1: BM25 */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> BM25 Ranks
            </span>
            <span className="text-[10px] text-slate-400 font-mono">r_bm25</span>
          </div>
          <div className="space-y-1.5">
            {[...CANDIDATES]
              .sort((a, b) => a.bm25Rank - b.bm25Rank)
              .map((item) => (
                <div key={item.id} className="p-2 rounded-lg bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs flex justify-between items-center">
                  <span className="truncate pr-2">{item.title}</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded text-[10px]">
                    #{item.bm25Rank}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Input List 2: Dense */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span> Dense Ranks
            </span>
            <span className="text-[10px] text-slate-400 font-mono">r_dense</span>
          </div>
          <div className="space-y-1.5">
            {[...CANDIDATES]
              .sort((a, b) => a.denseRank - b.denseRank)
              .map((item) => (
                <div key={item.id} className="p-2 rounded-lg bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs flex justify-between items-center">
                  <span className="truncate pr-2">{item.title}</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-1.5 py-0.5 rounded text-[10px]">
                    #{item.denseRank}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Output List: Fused RRF */}
        <div className="p-3.5 rounded-xl border-2 border-purple-500/40 bg-purple-50/20 dark:bg-purple-950/20">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-200 dark:border-purple-800">
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
              <Shuffle className="w-3.5 h-3.5 text-purple-600" /> Fused Consensus (RRF)
            </span>
            <span className="text-[10px] text-purple-500 font-mono">Consensus Rank</span>
          </div>
          <div className="space-y-1.5">
            {fusedResults.map((item) => (
              <div
                key={item.id}
                className="p-2 rounded-lg bg-white dark:bg-slate-850 border border-purple-200 dark:border-purple-900 text-xs flex justify-between items-center shadow-xs"
              >
                <div className="flex items-center gap-1.5 truncate pr-2">
                  <span className="font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-1.5 py-0.5 rounded text-[10px]">
                    #{item.finalRank}
                  </span>
                  <span className="truncate font-medium text-slate-800 dark:text-slate-200">{item.title}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] shrink-0">
                  <span className="text-slate-500">{item.rrfScore.toFixed(4)}</span>
                  {item.rankShift > 0 ? (
                    <span className="text-emerald-500 flex items-center"><ArrowUpRight className="w-3 h-3" />+{item.rankShift.toFixed(1)}</span>
                  ) : item.rankShift < 0 ? (
                    <span className="text-rose-500 flex items-center"><ArrowDownRight className="w-3 h-3" />{item.rankShift.toFixed(1)}</span>
                  ) : (
                    <span className="text-slate-400"><Minus className="w-3 h-3" /></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engineering Note */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
        <strong>Why RRF is Superior to Raw Score Normalization:</strong> BM25 scores are unbounded positive floats (e.g. 0 to 45.8), whereas Cosine embeddings strictly range from -1.0 to 1.0. Directly adding normalized scores requires tuning min-max calibration bounds per query. RRF bypasses score calibration completely by operating purely on ordinals (ranks).
      </div>
    </div>
  );
};

