'use client';

import React, { useState, useMemo } from 'react';
import { Layers, Scissors, Sliders, Info, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const SAMPLE_TEXTS = [
  {
    title: 'Transformer Architecture Abstract',
    content:
      'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.',
  },
  {
    title: 'Enterprise Technical Documentation',
    content:
      'PostgreSQL with pgvector provides efficient vector similarity search using hierarchical navigable small world (HNSW) graphs and inverted file flat (IVFFlat) indexes. In IVFFlat, vector space is partitioned into Voronoi cells using k-means clustering. During querying, only centroids closest to the probe vector are visited, dramatically pruning the candidate search space. However, when inverted lists are too coarse, true nearest neighbors may be missed if they reside just across a partition boundary.',
  },
];

export const DocumentChunkingExplorer: React.FC = () => {
  const [selectedTextIdx, setSelectedTextIdx] = useState<number>(0);
  const [customText, setCustomText] = useState<string>('');
  const [chunkSizeChars, setChunkSizeChars] = useState<number>(140);
  const [overlapChars, setOverlapChars] = useState<number>(30);
  const [strategy, setStrategy] = useState<'fixed' | 'word' | 'sentence'>('word');
  const [selectedChunkIdx, setSelectedChunkIdx] = useState<number | null>(null);

  const textToProcess = customText || SAMPLE_TEXTS[selectedTextIdx].content;

  // Real chunk calculation based on strategy
  const chunks = useMemo(() => {
    const raw = textToProcess.trim();
    if (!raw) return [];

    if (strategy === 'fixed') {
      const result: { id: number; text: string; start: number; end: number; overlapStart: number }[] = [];
      let start = 0;
      let id = 0;
      while (start < raw.length) {
        const end = Math.min(start + chunkSizeChars, raw.length);
        const overlapStart = Math.max(0, start - overlapChars);
        result.push({ id: id++, text: raw.substring(start, end), start, end, overlapStart });
        if (end >= raw.length) break;
        start += Math.max(1, chunkSizeChars - overlapChars);
      }
      return result;
    }

    if (strategy === 'word') {
      const words = raw.split(/\s+/);
      const approxWordsPerChunk = Math.max(3, Math.round(chunkSizeChars / 6));
      const approxOverlapWords = Math.max(0, Math.min(approxWordsPerChunk - 1, Math.round(overlapChars / 6)));
      const step = Math.max(1, approxWordsPerChunk - approxOverlapWords);

      const result = [];
      let i = 0;
      let id = 0;
      while (i < words.length) {
        const chunkWords = words.slice(i, i + approxWordsPerChunk);
        result.push({
          id: id++,
          text: chunkWords.join(' '),
          start: i,
          end: i + chunkWords.length,
          overlapStart: Math.max(0, i - approxOverlapWords),
        });
        if (i + approxWordsPerChunk >= words.length) break;
        i += step;
      }
      return result;
    }

    // Sentence-boundary chunking
    const sentences = raw.match(/[^.!?]+[.!?]+(\s+|$)/g) || [raw];
    const result = [];
    let currentChunk: string[] = [];
    let currentLen = 0;
    let id = 0;

    for (let s of sentences) {
      if (currentLen + s.length > chunkSizeChars && currentChunk.length > 0) {
        result.push({
          id: id++,
          text: currentChunk.join(' ').trim(),
          start: 0,
          end: currentLen,
          overlapStart: 0,
        });
        currentChunk = [s];
        currentLen = s.length;
      } else {
        currentChunk.push(s);
        currentLen += s.length;
      }
    }
    if (currentChunk.length > 0) {
      result.push({
        id: id++,
        text: currentChunk.join(' ').trim(),
        start: 0,
        end: currentLen,
        overlapStart: 0,
      });
    }
    return result;
  }, [textToProcess, chunkSizeChars, overlapChars, strategy]);

  const totalTokensEst = Math.round(textToProcess.length / 4);
  const avgChunkTokens = chunks.length > 0 ? Math.round(textToProcess.length / chunks.length / 4) : 0;
  const overlapRatio = chunkSizeChars > 0 ? ((overlapChars / chunkSizeChars) * 100).toFixed(0) : '0';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Interactive Ingestion Laboratory
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Document Chunking & Sliding-Window Overlap Visualizer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Inspect how fixed, word-level, and sentence-boundary sliding windows partition source text and preserve boundary context.
          </p>
        </div>

        {/* Strategy Badges */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs">
          {(['word', 'sentence', 'fixed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStrategy(s)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all capitalize ${
                strategy === s
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {s}-based
            </button>
          ))}
        </div>
      </div>

      {/* Preset Documents */}
      <div className="flex flex-wrap gap-2 items-center text-xs">
        <span className="text-slate-500 font-medium">Sample Document:</span>
        {SAMPLE_TEXTS.map((doc, idx) => (
          <button
            key={doc.title}
            onClick={() => {
              setSelectedTextIdx(idx);
              setCustomText('');
            }}
            className={`px-3 py-1 rounded-lg border transition-all ${
              selectedTextIdx === idx && !customText
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            {doc.title}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Chunk Size (chars)</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400">{chunkSizeChars}</span>
          </div>
          <input
            type="range"
            min={60}
            max={350}
            step={10}
            value={chunkSizeChars}
            onChange={(e) => {
              const val = Number(e.target.value);
              setChunkSizeChars(val);
              if (overlapChars >= val) setOverlapChars(Math.floor(val * 0.3));
            }}
            className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">~{Math.round(chunkSizeChars / 4)} tokens/chunk</div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Overlap (chars)</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400">{overlapChars} ({overlapRatio}%)</span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.floor(chunkSizeChars * 0.5)}
            step={5}
            value={overlapChars}
            onChange={(e) => setOverlapChars(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">Prevents mid-sentence context severance</div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-xs text-slate-500">Total Chunks Created</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {chunks.length} <span className="text-xs font-normal text-slate-500">chunks</span>
          </div>
          <div className="text-[10px] text-slate-500">Doc est: {totalTokensEst} tokens</div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-xs text-slate-500">Avg Chunk Density</div>
          <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
            ~{avgChunkTokens} <span className="text-xs font-normal text-slate-500">tok/chunk</span>
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Storage overhead: +{overlapRatio}%
          </div>
        </div>
      </div>

      {/* Visual Chunk Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Generated Chunks & Inter-Chunk Overlap</span>
          <span className="text-slate-500">Click a chunk to inspect boundary containment</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {chunks.map((chk, idx) => {
            const isSelected = selectedChunkIdx === idx;
            return (
              <div
                key={chk.id}
                onClick={() => setSelectedChunkIdx(isSelected ? null : idx)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    Chunk #{idx + 1}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {chk.text.length} chars · ~{Math.round(chk.text.length / 4)} tok
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans line-clamp-4">
                  {chk.text}
                </p>
                {overlapChars > 0 && idx > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-amber-600 dark:text-amber-400">
                    <span className="flex items-center gap-1">
                      <Scissors className="w-2.5 h-2.5" /> Shared prefix overlap
                    </span>
                    <span className="font-mono">+{overlapChars} chars</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Insight banner */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Production Engineering Rule of Thumb:</strong> When chunks are too small (&lt;100 tokens), vectors lack surrounding topical context and suffer high retrieval noise. When chunks are too large (&gt;1024 tokens), embeddings dilute specific factual statements and waste LLM context window. A 10–20% sliding window overlap guarantees that search terms crossing chunk boundaries do not fail semantic matching.
        </div>
      </div>
    </div>
  );
};

