'use client';

import React, { useState, useMemo } from 'react';
import { Type, Sparkles, Hash, Layers, ArrowRight, RotateCcw } from 'lucide-react';

interface PresetSentence {
  label: string;
  text: string;
}

const PRESETS: PresetSentence[] = [
  { label: 'Transformer Intro', text: 'Transformers understand context deeply' },
  { label: 'Subwords & Affixes', text: 'Unbelievable tokenization performance' },
  { label: 'Math & Code', text: 'def scaled_dot_product(q, k, v):' },
];

// Vocabulary dictionary mapping frequent subword tokens to deterministic integer IDs
const VOCAB_MAP: Record<string, number> = {
  '<pad>': 0,
  '<bos>': 1,
  '<eos>': 2,
  '<unk>': 3,
  'trans': 101,
  'form': 102,
  'ers': 103,
  'under': 104,
  'stand': 105,
  'con': 106,
  'text': 107,
  'deep': 108,
  'ly': 109,
  'un': 110,
  'believ': 111,
  'able': 112,
  'token': 113,
  'ization': 114,
  'per': 115,
  'ance': 116,
  'def': 117,
  'scaled': 118,
  '_': 119,
  'dot': 120,
  'product': 121,
  '(': 122,
  'q': 123,
  ',': 124,
  'k': 125,
  'v': 126,
  ')': 127,
  ':': 128,
};

export const TokenizationExplorer: React.FC = () => {
  const [inputText, setInputText] = useState<string>(PRESETS[0].text);
  const [includeSpecialTokens, setIncludeSpecialTokens] = useState<boolean>(true);
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number | null>(null);

  // Subword tokenizer simulation (greedy longest-match prefix)
  const tokenized = useMemo(() => {
    const rawTokens: { text: string; id: number; isSpecial?: boolean; color: string }[] = [];

    if (includeSpecialTokens) {
      rawTokens.push({ text: '<bos>', id: 1, isSpecial: true, color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' });
    }

    const words = inputText.trim().split(/(\s+|[(),:_])/);
    const colorPalette = [
      'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
      'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
      'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    ];

    let colorIdx = 0;
    words.forEach((word) => {
      if (!word) return;
      if (/^\s+$/.test(word)) {
        // Space representation
        rawTokens.push({
          text: '␣',
          id: 200,
          color: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:border-slate-700',
        });
        return;
      }

      const lower = word.toLowerCase();
      // Look up subwords
      let remaining = lower;
      let matchedAny = false;

      while (remaining.length > 0) {
        let matched = false;
        // Check prefixes from longest to shortest
        for (let len = remaining.length; len >= 1; len--) {
          const sub = remaining.slice(0, len);
          if (VOCAB_MAP[sub] !== undefined) {
            rawTokens.push({
              text: sub,
              id: VOCAB_MAP[sub],
              color: colorPalette[colorIdx % colorPalette.length],
            });
            colorIdx++;
            remaining = remaining.slice(len);
            matched = true;
            matchedAny = true;
            break;
          }
        }
        if (!matched) {
          // Fallback single character
          const char = remaining[0];
          const hashId = 500 + char.charCodeAt(0);
          rawTokens.push({
            text: char,
            id: hashId,
            color: colorPalette[colorIdx % colorPalette.length],
          });
          colorIdx++;
          remaining = remaining.slice(1);
        }
      }
    });

    if (includeSpecialTokens) {
      rawTokens.push({ text: '<eos>', id: 2, isSpecial: true, color: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-800' });
    }

    return rawTokens;
  }, [inputText, includeSpecialTokens]);

  const totalCharacters = inputText.length;
  const totalTokens = tokenized.length;
  const compressionRatio = totalTokens > 0 ? (totalCharacters / totalTokens).toFixed(2) : '0';

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <Type className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Interactive BPE &amp; Subword Tokenization Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            See how continuous text is split into subword tokens and mapped into discrete numerical Token IDs.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300 font-semibold select-none">
            <input
              type="checkbox"
              checked={includeSpecialTokens}
              onChange={(e) => setIncludeSpecialTokens(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Special Tokens (&lt;bos&gt;, &lt;eos&gt;)</span>
          </label>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">Quick Presets:</span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              setInputText(p.text);
              setSelectedTokenIdx(null);
            }}
            className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Text Box */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Editable Sentence or Code Snippet:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setSelectedTokenIdx(null);
          }}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type any sentence or word to tokenize..."
        />
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-center">
          <span className="text-[10px] font-bold text-slate-500 block uppercase">Characters</span>
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">{totalCharacters}</span>
        </div>
        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-center">
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block uppercase">Tokens Produced</span>
          <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300 font-mono">{totalTokens}</span>
        </div>
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-center">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase">Chars / Token</span>
          <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-mono">{compressionRatio}</span>
        </div>
      </div>

      {/* Visual Subword Token Stream */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Subword Segmented Tokens (Click to inspect Token ID):</span>
          <span className="text-[11px] text-slate-500 font-normal">Vocabulary Size: 32,000+ words</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap gap-2 items-center min-h-[72px]">
          {tokenized.map((tok, idx) => {
            const isSelected = selectedTokenIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedTokenIdx(idx)}
                className={`px-3 py-1.5 rounded-xl border font-mono text-xs transition-all flex items-center gap-1.5 ${tok.color} ${
                  isSelected ? 'ring-2 ring-indigo-400 scale-105 shadow-md shadow-indigo-500/20' : 'hover:scale-102'
                }`}
              >
                <span className="font-bold">{tok.text}</span>
                <span className="text-[10px] opacity-75 font-mono">#{tok.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Token ID Sequence & Embedding Vector Lookup */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Integer Token ID Tensor (Fed directly into nn.Embedding):
          </span>
        </div>
        <div className="p-3 rounded-lg bg-slate-900 text-indigo-300 font-mono text-xs overflow-x-auto">
          <code>[{tokenized.map((t) => t.id).join(', ')}]</code>
        </div>
        {selectedTokenIdx !== null && tokenized[selectedTokenIdx] && (
          <div className="text-xs text-slate-600 dark:text-slate-300 pt-1 flex items-center gap-2">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">Inspecting Token {selectedTokenIdx}:</span>
            <span>Subword &ldquo;{tokenized[selectedTokenIdx].text}&rdquo;</span>
            <span className="text-slate-400">→</span>
            <span>Vocabulary Row Index <strong className="font-mono text-slate-800 dark:text-slate-100">{tokenized[selectedTokenIdx].id}</strong></span>
            <span className="text-slate-400">→</span>
            <span>Embedding Vector <code className="font-mono text-emerald-600 dark:text-emerald-400">W_embed[{tokenized[selectedTokenIdx].id}, :] ∈ ℝ^{'{d_model}'}</code></span>
          </div>
        )}
      </div>
    </div>
  );
};

