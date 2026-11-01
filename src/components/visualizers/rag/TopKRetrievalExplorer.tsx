'use client';

import React, { useState, useMemo } from 'react';
import { Target, Sliders, Filter, Sparkles, Compass, CheckCircle2, AlertCircle } from 'lucide-react';

interface CandidateDoc {
  id: string;
  title: string;
  category: string;
  text: string;
  vector: [number, number]; // 2D normalized vector for visual clarity
}

const CANDIDATE_CORPUS: CandidateDoc[] = [
  { id: 'doc-1', title: 'Attention Is All You Need', category: 'Deep Learning', text: 'Multi-head self-attention mechanism replaces recurrent layers.', vector: [0.92, 0.39] },
  { id: 'doc-2', title: 'BERT Masked Language Models', category: 'Deep Learning', text: 'Bidirectional encoder representations pretrained with masked tokens.', vector: [0.88, 0.47] },
  { id: 'doc-3', title: 'HNSW Graph Indexing', category: 'Vector Search', text: 'Hierarchical Navigable Small World graphs provide logarithmic nearest neighbor search.', vector: [0.35, 0.94] },
  { id: 'doc-4', title: 'BM25 Inverted Indexes', category: 'Lexical Search', text: 'Term frequency and inverse document frequency scoring with document length normalization.', vector: [0.20, 0.98] },
  { id: 'doc-5', title: 'Quantization & LoRA Fine-Tuning', category: 'LLM Systems', text: 'Low-rank adaptation and 4-bit weight quantization reduce memory requirements.', vector: [0.75, 0.66] },
  { id: 'doc-6', title: 'PostgreSQL pgvector Extension', category: 'Vector Search', text: 'Storing embeddings directly in relational tables with IVFFlat and HNSW indexing.', vector: [0.42, 0.91] },
  { id: 'doc-7', title: 'Cross-Encoder Rerankers', category: 'RAG Pipeline', text: 'Jointly attending over query and passage tokens produces superior ranking precision.', vector: [0.65, 0.76] },
  { id: 'doc-8', title: 'ResNet Computer Vision', category: 'Computer Vision', text: 'Deep residual skip connections prevent vanishing gradients in image convolutions.', vector: [-0.60, 0.80] },
];

const PRESET_QUERIES = [
  { label: 'Transformer Attention Mechanisms', vector: [0.95, 0.31] as [number, number] },
  { label: 'Approximate Vector Index Search', vector: [0.38, 0.92] as [number, number] },
  { label: 'Memory Efficient Model Serving', vector: [0.72, 0.69] as [number, number] },
  { label: 'Convolutional Image Classification', vector: [-0.70, 0.71] as [number, number] },
];

export const TopKRetrievalExplorer: React.FC = () => {
  const [selectedQueryIdx, setSelectedQueryIdx] = useState<number>(0);
  const [queryVec, setQueryVec] = useState<[number, number]>(PRESET_QUERIES[0].vector);
  const [distanceMetric, setDistanceMetric] = useState<'cosine' | 'dot' | 'euclidean'>('cosine');
  const [topK, setTopK] = useState<number>(3);
  const [threshold, setThreshold] = useState<number>(0.5);

  // Compute scores for each candidate document
  const scoredDocs = useMemo(() => {
    return CANDIDATE_CORPUS.map((doc) => {
      const qx = queryVec[0];
      const qy = queryVec[1];
      const dx = doc.vector[0];
      const dy = doc.vector[1];

      // Exact mathematical calculations
      const dotProduct = qx * dx + qy * dy;
      const normQ = Math.sqrt(qx * qx + qy * qy);
      const normD = Math.sqrt(dx * dx + dy * dy);
      const cosineSim = normQ > 0 && normD > 0 ? dotProduct / (normQ * normD) : 0;
      const euclideanDist = Math.sqrt((qx - dx) ** 2 + (qy - dy) ** 2);

      let primaryScore = 0;
      let displayScore = '';

      if (distanceMetric === 'cosine') {
        primaryScore = cosineSim;
        displayScore = cosineSim.toFixed(3);
      } else if (distanceMetric === 'dot') {
        primaryScore = dotProduct;
        displayScore = dotProduct.toFixed(3);
      } else {
        // For euclidean, smaller is closer; convert to inverted score for uniform ranking
        primaryScore = -euclideanDist;
        displayScore = euclideanDist.toFixed(3);
      }

      return {
        ...doc,
        cosineSim,
        dotProduct,
        euclideanDist,
        primaryScore,
        displayScore,
      };
    })
      .sort((a, b) => b.primaryScore - a.primaryScore)
      .map((doc, rank) => ({
        ...doc,
        rank: rank + 1,
        isTopK: rank < topK,
        passesThreshold: distanceMetric === 'euclidean' ? doc.euclideanDist <= 1.0 - threshold + 0.5 : doc.primaryScore >= threshold,
      }));
  }, [queryVec, distanceMetric, topK, threshold]);

  const retrievedDocs = scoredDocs.filter((d) => d.isTopK && d.passesThreshold);

  // SVG coordinates: map [-1, 1] to [30, 270]
  const toSvgX = (x: number) => 150 + x * 115;
  const toSvgY = (y: number) => 150 - y * 115;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            Vector Search Simulator
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Top-K Vector Retrieval & Geometric Similarity Explorer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare Cosine Similarity, Dot Product, and Euclidean Distance rankings across candidate vectors under varying Top-k and score cutoff thresholds.
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
          {(['cosine', 'dot', 'euclidean'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setDistanceMetric(m)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all capitalize ${
                distanceMetric === m
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {m === 'dot' ? 'Dot Product' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Queries */}
      <div className="flex flex-wrap gap-2 items-center text-xs">
        <span className="text-slate-500 font-medium">Test Query:</span>
        {PRESET_QUERIES.map((q, idx) => (
          <button
            key={q.label}
            onClick={() => {
              setSelectedQueryIdx(idx);
              setQueryVec(q.vector);
            }}
            className={`px-3 py-1 rounded-lg border transition-all ${
              selectedQueryIdx === idx
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-medium'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Controls & Metric Readouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Top-k Candidates</span>
            <span className="font-mono text-teal-600 dark:text-teal-400">k = {topK}</span>
          </div>
          <input
            type="range"
            min={1}
            max={8}
            step={1}
            value={topK}
            onChange={(e) => setTopK(Number(e.target.value))}
            className="w-full accent-teal-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">Retrieval depth cap</div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Similarity Threshold</span>
            <span className="font-mono text-teal-600 dark:text-teal-400">&gt;= {threshold.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0.0}
            max={0.9}
            step={0.05}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full accent-teal-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">Filters out irrelevant noise</div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-xs text-slate-500">Grounded Candidates Retrieved</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {retrievedDocs.length} / {CANDIDATE_CORPUS.length}
          </div>
          <div className="text-[10px] text-teal-600 dark:text-teal-400">
            {retrievedDocs.length === 0 ? 'Abstention triggered (no confident matches)' : 'Qualified for context'}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-xs text-slate-500">Primary Ranking Metric</div>
          <div className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100 capitalize">
            {distanceMetric} {distanceMetric === 'euclidean' ? '(min dist)' : '(max sim)'}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Query: [{queryVec[0].toFixed(2)}, {queryVec[1].toFixed(2)}]
          </div>
        </div>
      </div>

      {/* Visual Vector Space & Ranking Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 2D Embedding Projection Visualizer */}
        <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-300 mb-2 w-full flex justify-between">
            <span>2D Semantic Latent Space</span>
            <span className="text-[10px] text-slate-400">Unit Circle (Normalized)</span>
          </div>
          <svg viewBox="0 0 300 300" className="w-full max-w-[270px] h-auto">
            {/* Grid & Axis */}
            <circle cx="150" cy="150" r="115" fill="none" stroke="#334155" strokeDasharray="3 3" />
            <line x1="20" y1="150" x2="280" y2="150" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="150" y1="20" x2="150" y2="280" stroke="#1e293b" strokeWidth="1.5" />

            {/* Query Vector Arrow */}
            <line
              x1="150"
              y1="150"
              x2={toSvgX(queryVec[0])}
              y2={toSvgY(queryVec[1])}
              stroke="#14b8a6"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx={toSvgX(queryVec[0])} cy={toSvgY(queryVec[1])} r="5" fill="#14b8a6" />
            <text x={toSvgX(queryVec[0]) + 8} y={toSvgY(queryVec[1])} fill="#2dd4bf" fontSize="10" fontWeight="bold">
              Query (q)
            </text>

            {/* Candidate Documents */}
            {scoredDocs.map((doc) => {
              const cx = toSvgX(doc.vector[0]);
              const cy = toSvgY(doc.vector[1]);
              const isRetrieved = doc.isTopK && doc.passesThreshold;
              return (
                <g key={doc.id}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isRetrieved ? '6' : '3.5'}
                    fill={isRetrieved ? '#6366f1' : '#64748b'}
                    stroke={isRetrieved ? '#ffffff' : '#1e293b'}
                    strokeWidth="1.5"
                  />
                  <text
                    x={cx + 7}
                    y={cy + 3}
                    fill={isRetrieved ? '#e0e7ff' : '#94a3b8'}
                    fontSize="8.5"
                    fontWeight={isRetrieved ? 'bold' : 'normal'}
                  >
                    #{doc.rank} {doc.title.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="flex items-center gap-4 text-[10px] text-slate-400 mt-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span> Query</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span> Retrieved Top-K</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block"></span> Unselected</span>
          </div>
        </div>

        {/* Ranked Results List */}
        <div className="lg:col-span-7 space-y-2">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Retrieval Ranking & Rejection Boundaries
          </div>
          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {scoredDocs.map((doc) => {
              const isRetrieved = doc.isTopK && doc.passesThreshold;
              return (
                <div
                  key={doc.id}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isRetrieved
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-1 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        isRetrieved
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        Rank #{doc.rank}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{doc.title}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      Score: {doc.displayScore}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-1">{doc.text}</p>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                    <span>Cosine: {doc.cosineSim.toFixed(3)}</span>
                    <span>Dot: {doc.dotProduct.toFixed(3)}</span>
                    <span>Euclidean: {doc.euclideanDist.toFixed(3)}</span>
                    <span className={isRetrieved ? 'text-emerald-600 dark:text-emerald-400 font-bold ml-auto' : 'text-slate-400 ml-auto'}>
                      {isRetrieved ? 'ACCEPTED' : !doc.isTopK ? 'EXCEEDS TOP-K' : 'BELOW THRESHOLD'}
                    </span>
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

