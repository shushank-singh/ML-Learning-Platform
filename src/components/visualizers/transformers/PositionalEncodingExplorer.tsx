'use client';

import React, { useState, useMemo } from 'react';
import { Waves, Sliders, Activity, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const PositionalEncodingExplorer: React.FC = () => {
  const [selectedPos, setSelectedPos] = useState<number>(2);
  const [dModel, setDModel] = useState<number>(16);
  const [numPositions, setNumPositions] = useState<number>(8);

  // Compute Sinusoidal Positional Encoding Matrix: shape (numPositions, dModel)
  const peMatrix = useMemo(() => {
    const mat: number[][] = [];
    for (let pos = 0; pos < numPositions; pos++) {
      const row: number[] = [];
      for (let i = 0; i < dModel; i += 2) {
        const denom = Math.pow(10000, (2 * (i / 2)) / dModel);
        const sinVal = Math.sin(pos / denom);
        const cosVal = Math.cos(pos / denom);
        row.push(sinVal);
        if (i + 1 < dModel) {
          row.push(cosVal);
        }
      }
      mat.push(row);
    }
    return mat;
  }, [numPositions, dModel]);

  // Compute Dot Products of selected position against all other positions
  const dotProducts = useMemo(() => {
    const target = peMatrix[selectedPos] || [];
    return peMatrix.map((row, pos) => {
      let dot = 0;
      for (let i = 0; i < row.length; i++) {
        dot += target[i] * row[i];
      }
      return { pos, dot, normDot: dot / (dModel / 2) };
    });
  }, [peMatrix, selectedPos, dModel]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <Waves className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Sinusoidal Positional Encoding Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore how sine and cosine geometric waves encode sequential order without recurrent loops.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 font-medium">d_model:</span>
          <span className="font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
            {dModel} dims
          </span>
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Selected Token Position (pos):</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">pos = {selectedPos}</span>
          </div>
          <input
            type="range"
            min={0}
            max={numPositions - 1}
            value={selectedPos}
            onChange={(e) => setSelectedPos(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Model Dimension (d_model):</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{dModel}</span>
          </div>
          <div className="flex gap-2">
            {[8, 16, 32].map((dim) => (
              <button
                key={dim}
                onClick={() => setDModel(dim)}
                className={`flex-1 py-1 text-xs rounded-lg font-bold border transition-all ${
                  dModel === dim
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                d = {dim}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Positional Encoding Heatmap */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Positional Encoding Matrix PE[pos, 2i / 2i+1]
          </span>
          <span className="text-[11px] text-slate-500">
            Sine (even dims) &amp; Cosine (odd dims) wavelengths vary from 2π to 10000 · 2π
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto text-slate-100">
          <table className="w-full border-collapse font-mono text-[10px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-center">
                <th className="py-1 px-2 text-left font-sans">Token Pos</th>
                {Array.from({ length: Math.min(dModel, 16) }).map((_, i) => (
                  <th key={i} className="py-1 px-1">
                    {i % 2 === 0 ? `sin₂_${i}` : `cos₂_${i}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {peMatrix.map((row, pos) => {
                const isSelected = pos === selectedPos;
                return (
                  <tr
                    key={pos}
                    onClick={() => setSelectedPos(pos)}
                    className={`cursor-pointer transition-colors border-b border-slate-800/40 ${
                      isSelected ? 'bg-indigo-950/80 font-bold' : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <td className="py-1.5 px-2 text-left text-slate-300 font-semibold flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-indigo-400 animate-pulse' : 'bg-slate-600'}`} />
                      pos {pos}
                    </td>
                    {row.slice(0, 16).map((val, dIdx) => {
                      // Color code from -1.0 (blue/cool) to +1.0 (indigo/bright)
                      const isPositive = val >= 0;
                      const opacity = Math.min(1, Math.max(0.15, Math.abs(val)));
                      const bgColor = isPositive
                        ? `rgba(99, 102, 241, ${opacity * 0.85})`
                        : `rgba(244, 63, 94, ${opacity * 0.85})`;

                      return (
                        <td
                          key={dIdx}
                          style={{ backgroundColor: bgColor }}
                          className="py-1 px-1 text-center text-white"
                          title={`pos: ${pos}, dim: ${dIdx}, val: ${val.toFixed(3)}`}
                        >
                          {val.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Relative Distance Property / Dot Product Falloff */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-500" />
            Positional Affinity &amp; Dot Product Falloff with Relative Distance (pos = {selectedPos})
          </span>
          <span className="text-[11px] text-slate-500 font-mono">PE[pos] · PE[k]</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {dotProducts.map((item) => {
            const distance = Math.abs(item.pos - selectedPos);
            const isSelf = distance === 0;
            return (
              <div
                key={item.pos}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelf
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400/40'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                <div className="text-[10px] opacity-75 font-semibold">
                  Δ = {distance} {isSelf ? '(Self)' : `(pos ${item.pos})`}
                </div>
                <div className="text-xs font-mono font-bold mt-0.5">
                  {item.dot.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          <strong>Key Mathematical Intuition:</strong> Because PE(pos + k) · PE(pos) is a linear function of relative offset Δk, the Transformer can naturally learn to attend based on relative token distance without learning separate weights for every absolute position!
        </p>
      </div>
    </div>
  );
};
