'use client';

import React, { useState, useMemo } from 'react';
import { Target, BarChart2, CheckCircle2, XCircle, Sliders, Info, Award } from 'lucide-react';

interface BenchmarkQuery {
  id: string;
  query: string;
  totalRelevantInCorpus: number;
  retrievedDocs: { id: string; title: string; isRelevant: boolean }[];
}

const BENCHMARK_QUERIES: BenchmarkQuery[] = [
  {
    id: 'q1',
    query: 'What is the mathematical formulation of Self-Attention?',
    totalRelevantInCorpus: 3,
    retrievedDocs: [
      { id: 'd1', title: 'Attention Is All You Need (Eq 1)', isRelevant: true },
      { id: 'd2', title: 'BERT Architecture Overview', isRelevant: false },
      { id: 'd3', title: 'Scaled Dot-Product Formula', isRelevant: true },
      { id: 'd4', title: 'Multi-Head Attention Projections', isRelevant: true },
      { id: 'd5', title: 'Transformer Decoder Layer Normalization', isRelevant: false },
    ],
  },
  {
    id: 'q2',
    query: 'How does HNSW graph navigation prevent local minima?',
    totalRelevantInCorpus: 2,
    retrievedDocs: [
      { id: 'd6', title: 'K-Means Voronoi Partitioning', isRelevant: false },
      { id: 'd7', title: 'Hierarchical Multi-Layer Skip Links in HNSW', isRelevant: true },
      { id: 'd8', title: 'IVFFlat Inverted File Scanning', isRelevant: false },
      { id: 'd9', title: 'Heuristic Pruning of Small World Graphs', isRelevant: true },
      { id: 'd10', title: 'Cosine Distance Metric Acceleration', isRelevant: false },
    ],
  },
  {
    id: 'q3',
    query: 'What is the prompt injection boundary format in LangChain?',
    totalRelevantInCorpus: 2,
    retrievedDocs: [
      { id: 'd11', title: 'Untrusted Context Delimiters and Enclosure', isRelevant: true },
      { id: 'd12', title: 'Few-Shot Prompt Engineering Guide', isRelevant: false },
      { id: 'd13', title: 'System Prompt Role Precedence in ChatML', isRelevant: false },
      { id: 'd14', title: 'Prompt Guard Jailbreak Classifier', isRelevant: false },
      { id: 'd15', title: 'Document Isolation XML Enclosure', isRelevant: true },
    ],
  },
];

export const RetrievalMetricsExplorer: React.FC = () => {
  const [k, setK] = useState<number>(3);
  const [selectedQueryId, setSelectedQueryId] = useState<string>('q1');

  // Compute metrics across all benchmark queries at current K
  const metrics = useMemo(() => {
    let totalPrecisionAtK = 0;
    let totalRecallAtK = 0;
    let totalReciprocalRank = 0;
    let totalHitAtK = 0;

    const queryMetrics = BENCHMARK_QUERIES.map((q) => {
      const topKDocs = q.retrievedDocs.slice(0, k);
      const relevantRetrieved = topKDocs.filter((d) => d.isRelevant).length;

      const precisionAtK = relevantRetrieved / k;
      const recallAtK = relevantRetrieved / q.totalRelevantInCorpus;

      // First relevant item rank (1-indexed)
      const firstRelevantIndex = q.retrievedDocs.findIndex((d) => d.isRelevant);
      const reciprocalRank = firstRelevantIndex !== -1 && firstRelevantIndex < k
        ? 1 / (firstRelevantIndex + 1)
        : 0;

      const hitAtK = relevantRetrieved > 0 ? 1 : 0;

      totalPrecisionAtK += precisionAtK;
      totalRecallAtK += recallAtK;
      totalReciprocalRank += reciprocalRank;
      totalHitAtK += hitAtK;

      return {
        id: q.id,
        query: q.query,
        topKDocs,
        relevantRetrieved,
        precisionAtK,
        recallAtK,
        reciprocalRank,
        hitAtK,
      };
    });

    const N = BENCHMARK_QUERIES.length;
    return {
      queryMetrics,
      meanPrecisionAtK: totalPrecisionAtK / N,
      meanRecallAtK: totalRecallAtK / N,
      meanReciprocalRank: totalReciprocalRank / N,
      meanHitRateAtK: totalHitAtK / N,
    };
  }, [k]);

  const activeQueryMetric = metrics.queryMetrics.find((m) => m.id === selectedQueryId) || metrics.queryMetrics[0];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <BarChart2 className="w-3.5 h-3.5" />
            Evaluation Laboratory
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Retrieval Quality Evaluation: Precision@k, Recall@k & MRR
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Audit retriever ranking efficacy against ground-truth golden datasets using industry-standard Information Retrieval (IR) metrics.
          </p>
        </div>

        {/* K Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Cutoff:</span>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
            {[1, 2, 3, 5].map((val) => (
              <button
                key={val}
                onClick={() => setK(val)}
                className={`px-3 py-1 rounded-lg font-mono font-bold transition-all ${
                  k === val
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                k={val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Precision@k */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-xs text-slate-500 mb-1">Precision@{k}</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {(metrics.meanPrecisionAtK * 100).toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Relevant in Top-{k} / {k}</div>
        </div>

        {/* Recall@k */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-xs text-slate-500 mb-1">Recall@{k}</div>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
            {(metrics.meanRecallAtK * 100).toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Retrieved / Total Relevant</div>
        </div>

        {/* MRR */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-xs text-slate-500 mb-1">MRR (Mean Reciprocal Rank)</div>
          <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
            {metrics.meanReciprocalRank.toFixed(3)}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">1 / Rank of 1st hit</div>
        </div>

        {/* Hit Rate@k */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-xs text-slate-500 mb-1">Hit Rate@{k}</div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
            {(metrics.meanHitRateAtK * 100).toFixed(0)}%
          </div>
          <div className="text-[10px] text-slate-400 mt-1">% queries with &ge;1 hit</div>
        </div>
      </div>

      {/* Query Inspection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Benchmark Golden Dataset Inspection</span>
          <span className="text-slate-500">Select query to inspect ranked candidate hits</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {BENCHMARK_QUERIES.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setSelectedQueryId(q.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs text-left transition-all ${
                selectedQueryId === q.id
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              Query #{idx + 1}: &ldquo;{q.query.slice(0, 36)}...&rdquo;
            </button>
          ))}
        </div>

        {/* Ranked Results for Selected Query */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/40 dark:bg-slate-850 space-y-2">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              Ranked Retrieval Results for: &ldquo;{activeQueryMetric.query}&rdquo;
            </span>
            <div className="flex gap-3 font-mono text-[11px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                P@{k}: {(activeQueryMetric.precisionAtK * 100).toFixed(0)}%
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                R@{k}: {(activeQueryMetric.recallAtK * 100).toFixed(0)}%
              </span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">
                RR: {activeQueryMetric.reciprocalRank.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            {BENCHMARK_QUERIES.find((q) => q.id === selectedQueryId)?.retrievedDocs.map((doc, idx) => {
              const isIncludedInK = idx < k;
              return (
                <div
                  key={doc.id}
                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                    isIncludedInK
                      ? doc.isRelevant
                        ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-rose-400/50 bg-rose-50/30 dark:bg-rose-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                      isIncludedInK ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-slate-200 text-slate-500'
                    }`}>
                      #{idx + 1}
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{doc.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.isRelevant ? (
                      <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 text-[10px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> RELEVANT
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 text-[10px]">
                        <XCircle className="w-3.5 h-3.5" /> NOT RELEVANT
                      </span>
                    )}
                    {!isIncludedInK && (
                      <span className="text-[10px] text-slate-400 font-mono">(Beyond Cutoff k)</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

