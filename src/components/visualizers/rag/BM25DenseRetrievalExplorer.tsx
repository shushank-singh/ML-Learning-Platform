'use client';

import React, { useState, useMemo } from 'react';
import { Search, Database, Layers, ArrowRight, CheckCircle2, XCircle, Sliders } from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  text: string;
  exactKeywords: string[];
  semanticKeywords: string[];
  docLength: number;
}

const DOCUMENT_CORPUS: DocItem[] = [
  {
    id: 'doc-1',
    title: 'Python Error Handling',
    text: 'Catching ZeroDivisionError and KeyError using try-except blocks in Python 3.12.',
    exactKeywords: ['zerodivisionerror', 'try-except', 'python'],
    semanticKeywords: ['runtime bug', 'crash mitigation', 'exception catching', 'stability'],
    docLength: 12,
  },
  {
    id: 'doc-2',
    title: 'Defensive Programming Guide',
    text: 'Guidelines for preventing runtime failures, handling unexpected edge conditions, and safeguarding software uptime.',
    exactKeywords: ['safeguarding', 'failures'],
    semanticKeywords: ['runtime bug', 'crash mitigation', 'exception catching', 'stability'],
    docLength: 15,
  },
  {
    id: 'doc-3',
    title: 'PostgreSQL Indexing Internals',
    text: 'B-tree and GiST inverted index optimization techniques for high-throughput relational databases.',
    exactKeywords: ['b-tree', 'gist', 'postgresql', 'index'],
    semanticKeywords: ['fast search', 'table lookup', 'query optimization'],
    docLength: 13,
  },
  {
    id: 'doc-4',
    title: 'Approximate Nearest Neighbor HNSW',
    text: 'Multi-layer proximity graphs enable sub-linear vector similarity search across high-dimensional latent vectors.',
    exactKeywords: ['hnsw', 'sub-linear', 'vector'],
    semanticKeywords: ['fast search', 'semantic matching', 'embedding retrieval'],
    docLength: 14,
  },
];

const PRESET_QUERIES = [
  {
    query: 'How to fix ZeroDivisionError in code?',
    type: 'Exact Error Code / Lexical Needle',
    bm25Favored: true,
    terms: ['zerodivisionerror', 'code'],
    semanticMatch: ['crash mitigation', 'runtime bug'],
  },
  {
    query: 'Techniques for preventing software crashes and unexpected failures',
    type: 'Conceptual / High-level Semantic Query',
    bm25Favored: false,
    terms: ['crashes', 'failures'],
    semanticMatch: ['crash mitigation', 'stability', 'exception catching'],
  },
  {
    query: 'Accelerating similarity lookup over high-dimensional vector spaces',
    type: 'Semantic Vector Query',
    bm25Favored: false,
    terms: ['similarity', 'lookup'],
    semanticMatch: ['fast search', 'embedding retrieval', 'semantic matching'],
  },
];

export const BM25DenseRetrievalExplorer: React.FC = () => {
  const [selectedQueryIdx, setSelectedQueryIdx] = useState<number>(0);
  const [k1, setK1] = useState<number>(1.2);
  const [b, setB] = useState<number>(0.75);

  const activeQuery = PRESET_QUERIES[selectedQueryIdx];
  const avgDocLength = 13.5;

  // Real BM25 calculation
  const rankedBM25 = useMemo(() => {
    return DOCUMENT_CORPUS.map((doc) => {
      let score = 0;
      activeQuery.terms.forEach((term) => {
        const hasKeyword = doc.exactKeywords.includes(term.toLowerCase());
        const tf = hasKeyword ? 2 : 0;
        if (tf > 0) {
          const idf = 1.8; // synthetic IDF for rare domain terms
          const numerator = tf * (k1 + 1);
          const denominator = tf + k1 * (1 - b + b * (doc.docLength / avgDocLength));
          score += idf * (numerator / denominator);
        }
      });
      return { ...doc, bm25Score: Number(score.toFixed(3)) };
    }).sort((a, b) => b.bm25Score - a.bm25Score);
  }, [activeQuery, k1, b]);

  // Real Dense Vector Similarity simulation
  const rankedDense = useMemo(() => {
    return DOCUMENT_CORPUS.map((doc) => {
      // Semantic intersection matching simulation
      let matchCount = 0;
      activeQuery.semanticMatch.forEach((term) => {
        if (doc.semanticKeywords.includes(term)) matchCount++;
      });
      const semanticScore = Number((0.35 + matchCount * 0.28).toFixed(3));
      return { ...doc, denseScore: semanticScore };
    }).sort((a, b) => b.denseScore - a.denseScore);
  }, [activeQuery]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            Sparse vs Dense Dual Pipeline
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            BM25 Lexical vs Dense Vector Retrieval Explorer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Observe the complementary strengths of Exact Lexical Search (BM25) and Semantic Embedding Search across distinct query archetypes.
          </p>
        </div>
      </div>

      {/* Query Selector */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Select Test Query:</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESET_QUERIES.map((q, idx) => (
            <button
              key={q.query}
              onClick={() => setSelectedQueryIdx(idx)}
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                selectedQueryIdx === idx
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 ring-1 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1.5 ${
                q.bm25Favored
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
              }`}>
                {q.type}
              </span>
              <p className="font-medium text-slate-900 dark:text-slate-100 line-clamp-2">{q.query}</p>
            </button>
          ))}
        </div>
      </div>

      {/* BM25 Hyperparameter Tuning */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>BM25 Term Frequency Saturation (k1)</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">{k1.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={2.5}
            step={0.1}
            value={k1}
            onChange={(e) => setK1(Number(e.target.value))}
            className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">Controls how quickly repeated term frequency saturates</div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Document Length Normalization (b)</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">{b.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0.0}
            max={1.0}
            step={0.05}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">0 = no length penalty, 1 = full document length penalty</div>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BM25 Column */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                BM25 Sparse Lexical Ranking
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Exact Inverted Index</span>
          </div>

          <div className="space-y-2">
            {rankedBM25.map((doc, idx) => (
              <div
                key={doc.id}
                className={`p-3 rounded-lg border text-xs bg-white dark:bg-slate-850 ${
                  doc.bm25Score > 0 ? 'border-amber-400/60' : 'border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  <span>#{idx + 1} {doc.title}</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">
                    BM25: {doc.bm25Score}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">{doc.text}</p>
                <div className="mt-1 text-[10px] text-slate-400">
                  Matches: {doc.exactKeywords.filter((k) => activeQuery.terms.includes(k)).join(', ') || 'None'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dense Vector Column */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                Dense Vector Embedding Ranking
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Cosine Dot Product</span>
          </div>

          <div className="space-y-2">
            {rankedDense.map((doc, idx) => (
              <div
                key={doc.id}
                className={`p-3 rounded-lg border text-xs bg-white dark:bg-slate-850 ${
                  doc.denseScore > 0.5 ? 'border-teal-400/60' : 'border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  <span>#{idx + 1} {doc.title}</span>
                  <span className="font-mono text-teal-600 dark:text-teal-400">
                    Cosine: {doc.denseScore}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">{doc.text}</p>
                <div className="mt-1 text-[10px] text-slate-400">
                  Concept Alignment: {doc.semanticKeywords.slice(0, 2).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Synthesis summary */}
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <strong>The Vocabulary Mismatch Problem:</strong> Notice how BM25 excels when the user searches for an exact product name, variable name, or error code (<code className="font-mono">ZeroDivisionError</code>), but completely fails on conceptual paraphrasing where the exact tokens do not occur. Conversely, Dense Embeddings excel at semantic paraphrasing but can hallucinate matches for exact keyword serial numbers. <strong>Hybrid Search</strong> combines both.
      </div>
    </div>
  );
};

