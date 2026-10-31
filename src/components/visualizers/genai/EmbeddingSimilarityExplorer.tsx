'use client';

import React, { useState, useMemo } from 'react';
import { Compass, RotateCcw, HelpCircle, Check, Sparkles } from 'lucide-react';

interface ConceptVector {
  name: string;
  x: number;
  y: number;
  category: string;
}

const DEFAULT_CONCEPTS: ConceptVector[] = [
  { name: 'king', x: 0.82, y: 0.55, category: 'Royalty' },
  { name: 'queen', x: 0.78, y: 0.62, category: 'Royalty' },
  { name: 'man', x: 0.85, y: 0.20, category: 'Human' },
  { name: 'woman', x: 0.80, y: 0.30, category: 'Human' },
  { name: 'apple', x: -0.65, y: 0.70, category: 'Fruit' },
  { name: 'orange', x: -0.60, y: 0.75, category: 'Fruit' },
  { name: 'code', x: -0.30, y: -0.80, category: 'Tech' },
  { name: 'algorithm', x: -0.25, y: -0.85, category: 'Tech' },
];

export const EmbeddingSimilarityExplorer: React.FC = () => {
  const [conceptAIdx, setConceptAIdx] = useState<number>(0); // king
  const [conceptBIdx, setConceptBIdx] = useState<number>(1); // queen
  const [vectorA, setVectorA] = useState<{ x: number; y: number }>({ x: 0.82, y: 0.55 });
  const [vectorB, setVectorB] = useState<{ x: number; y: number }>({ x: 0.78, y: 0.62 });

  // Calculations
  const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
  const normA = Math.sqrt(vectorA.x * vectorA.x + vectorA.y * vectorA.y);
  const normB = Math.sqrt(vectorB.x * vectorB.x + vectorB.y * vectorB.y);
  const cosineSim = normA > 0 && normB > 0 ? Math.min(1.0, Math.max(-1.0, dotProduct / (normA * normB))) : 0;
  const angleRad = Math.acos(cosineSim);
  const angleDeg = (angleRad * (180 / Math.PI)).toFixed(1);
  const euclideanDist = Math.sqrt((vectorA.x - vectorB.x) ** 2 + (vectorA.y - vectorB.y) ** 2).toFixed(3);

  const handleSelectA = (idx: number) => {
    setConceptAIdx(idx);
    setVectorA({ x: DEFAULT_CONCEPTS[idx].x, y: DEFAULT_CONCEPTS[idx].y });
  };

  const handleSelectB = (idx: number) => {
    setConceptBIdx(idx);
    setVectorB({ x: DEFAULT_CONCEPTS[idx].x, y: DEFAULT_CONCEPTS[idx].y });
  };

  // SVG coordinate transformation: [-1, 1] to [20, 280]
  const toSvgX = (x: number) => 150 + x * 120;
  const toSvgY = (y: number) => 150 - y * 120; // invert Y for SVG

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Latent Geometry Explorer
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Embedding Vector Space & Cosine Similarity
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Investigate how high-dimensional semantic representations map conceptual meaning to spatial orientation and angular proximity.
          </p>
        </div>
      </div>

      {/* Preset Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            Vector A (Anchor Concept):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {DEFAULT_CONCEPTS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => handleSelectA(i)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  conceptAIdx === i
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-teal-600 dark:text-teal-400">
            Vector B (Target Concept):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {DEFAULT_CONCEPTS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => handleSelectB(i)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  conceptBIdx === i
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visualization Canvas + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Vector Plot */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative bg-slate-50 dark:bg-slate-850 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
            <svg width="300" height="300" className="overflow-visible">
              {/* Axes */}
              <line x1="30" y1="150" x2="270" y2="150" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1" />
              <line x1="150" y1="30" x2="150" y2="270" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1" />

              {/* Unit Circle */}
              <circle cx="150" cy="150" r="120" fill="none" stroke="#cbd5e1" strokeDasharray="4,4" strokeWidth="1" className="dark:stroke-slate-700" />

              {/* All Background Concepts */}
              {DEFAULT_CONCEPTS.map((c) => (
                <circle
                  key={c.name}
                  cx={toSvgX(c.x)}
                  cy={toSvgY(c.y)}
                  r="3.5"
                  fill="#94a3b8"
                  opacity="0.6"
                />
              ))}

              {/* Vector A (Indigo) */}
              <line
                x1="150"
                y1="150"
                x2={toSvgX(vectorA.x)}
                y2={toSvgY(vectorA.y)}
                stroke="#6366f1"
                strokeWidth="3"
                markerEnd="url(#arrow-indigo)"
              />
              <circle cx={toSvgX(vectorA.x)} cy={toSvgY(vectorA.y)} r="5" fill="#6366f1" />
              <text
                x={toSvgX(vectorA.x) + 8}
                y={toSvgY(vectorA.y) - 4}
                className="text-[11px] font-bold fill-indigo-600 dark:fill-indigo-400 font-mono"
              >
                A: {DEFAULT_CONCEPTS[conceptAIdx].name}
              </text>

              {/* Vector B (Teal) */}
              <line
                x1="150"
                y1="150"
                x2={toSvgX(vectorB.x)}
                y2={toSvgY(vectorB.y)}
                stroke="#14b8a6"
                strokeWidth="3"
                markerEnd="url(#arrow-teal)"
              />
              <circle cx={toSvgX(vectorB.x)} cy={toSvgY(vectorB.y)} r="5" fill="#14b8a6" />
              <text
                x={toSvgX(vectorB.x) + 8}
                y={toSvgY(vectorB.y) + 12}
                className="text-[11px] font-bold fill-teal-600 dark:fill-teal-400 font-mono"
              >
                B: {DEFAULT_CONCEPTS[conceptBIdx].name}
              </text>

              {/* Marker Definitions */}
              <defs>
                <marker id="arrow-indigo" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                </marker>
                <marker id="arrow-teal" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#14b8a6" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* Real Math Calculations */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
              <span className="text-slate-500">Cosine Similarity $\cos(\theta)$:</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {cosineSim.toFixed(4)}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Subtended Angle $\theta$:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{angleDeg}&deg;</span>
            </div>

            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Dot Product u &bull; v:</span>
              <span className="font-semibold">{dotProduct.toFixed(4)}</span>
            </div>

            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Euclidean Distance ||u - v||:</span>
              <span className="font-semibold">{euclideanDist}</span>
            </div>

            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
              <span>Vector Norms ||u||, ||v||:</span>
              <span className="font-semibold">{normA.toFixed(2)}, {normB.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 text-xs text-teal-800 dark:text-teal-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Vector Arithmetic:
            </div>
            <p className="font-mono text-[11px]">
              {'v(king) - v(man) + v(woman) \u2248 v(queen)'}
            </p>
          </div>
        </div>
      </div>

      {/* Limitations callout */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <strong>Cosine Limitations:</strong> Cosine similarity normalizes vector lengths to $1$, throwing away magnitude. In modern contextual LLMs, token vector norm often encodes word frequency and model confidence. Additionally, high-dimensional spaces suffer from <em>hubness</em>, where certain popular vectors appear as nearest neighbors to many unrelated queries.
      </div>
    </div>
  );
};
