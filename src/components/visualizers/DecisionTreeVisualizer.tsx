'use client';

import React, { useState, useMemo } from 'react';
import { GitFork, Sliders, CheckCircle2, RotateCcw } from 'lucide-react';

interface SamplePoint {
  x: number;
  y: number;
  label: 0 | 1;
}

export const DecisionTreeVisualizer: React.FC = () => {
  const [splitThreshold, setSplitThreshold] = useState<number>(4.2);

  // 2D dataset with clear separation along x-axis around 4.0
  const points: SamplePoint[] = useMemo(() => [
    // Class 0 (Left dominant cluster, blue)
    { x: 1.2, y: 3.5, label: 0 },
    { x: 1.8, y: 6.2, label: 0 },
    { x: 2.2, y: 2.1, label: 0 },
    { x: 2.6, y: 5.0, label: 0 },
    { x: 3.0, y: 7.2, label: 0 },
    { x: 3.4, y: 3.8, label: 0 },
    { x: 3.8, y: 5.5, label: 0 },
    { x: 4.1, y: 2.5, label: 0 },
    { x: 2.9, y: 4.2, label: 0 },
    { x: 1.5, y: 1.8, label: 0 },

    // Class 1 (Right dominant cluster, orange)
    { x: 4.5, y: 6.0, label: 1 },
    { x: 4.9, y: 3.2, label: 1 },
    { x: 5.3, y: 7.5, label: 1 },
    { x: 5.7, y: 4.8, label: 1 },
    { x: 6.2, y: 2.0, label: 1 },
    { x: 6.6, y: 5.8, label: 1 },
    { x: 7.1, y: 3.6, label: 1 },
    { x: 7.5, y: 6.9, label: 1 },
    { x: 5.1, y: 5.2, label: 1 },
    { x: 6.8, y: 4.1, label: 1 },
  ], []);

  // Compute Gini Impurity for Parent, Left, and Right splits
  const stats = useMemo(() => {
    const total = points.length;
    const parentClass0 = points.filter(p => p.label === 0).length;
    const parentClass1 = points.filter(p => p.label === 1).length;
    const p0 = parentClass0 / total;
    const p1 = parentClass1 / total;
    const parentGini = 1 - (p0 * p0 + p1 * p1);

    // Left child (x <= splitThreshold)
    const leftPoints = points.filter(p => p.x <= splitThreshold);
    const leftTotal = leftPoints.length;
    let leftGini = 0;
    if (leftTotal > 0) {
      const leftC0 = leftPoints.filter(p => p.label === 0).length / leftTotal;
      const leftC1 = leftPoints.filter(p => p.label === 1).length / leftTotal;
      leftGini = 1 - (leftC0 * leftC0 + leftC1 * leftC1);
    }

    // Right child (x > splitThreshold)
    const rightPoints = points.filter(p => p.x > splitThreshold);
    const rightTotal = rightPoints.length;
    let rightGini = 0;
    if (rightTotal > 0) {
      const rightC0 = rightPoints.filter(p => p.label === 0).length / rightTotal;
      const rightC1 = rightPoints.filter(p => p.label === 1).length / rightTotal;
      rightGini = 1 - (rightC0 * rightC0 + rightC1 * rightC1);
    }

    const splitGini = (leftTotal / total) * leftGini + (rightTotal / total) * rightGini;
    const giniGain = parentGini - splitGini;

    return {
      total,
      parentGini: Number(parentGini.toFixed(3)),
      leftTotal,
      leftGini: Number(leftGini.toFixed(3)),
      rightTotal,
      rightGini: Number(rightGini.toFixed(3)),
      splitGini: Number(splitGini.toFixed(3)),
      giniGain: Number(giniGain.toFixed(3)),
    };
  }, [points, splitThreshold]);

  const width = 500;
  const height = 300;
  const padding = 35;
  const minX = 0;
  const maxX = 9;
  const minY = 0;
  const maxY = 9;

  const scaleX = (x: number) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
              Decision Tree CART Split & Gini Impurity Visualizer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Slide split boundary θ to find the cut that minimizes weighted Gini impurity.
            </p>
          </div>
        </div>

        <button
          onClick={() => setSplitThreshold(4.2)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to Optimal Cut
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span> Class 0 (Left)
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block ml-2"></span> Class 1 (Right)
            </span>
            <span className="font-mono text-emerald-400">
              Split Cut: x₁ = {splitThreshold.toFixed(2)}
            </span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Left Region Background Shading */}
            <rect
              x={scaleX(minX)}
              y={padding}
              width={scaleX(splitThreshold) - scaleX(minX)}
              height={height - 2 * padding}
              fill="rgba(6, 182, 212, 0.08)"
            />
            {/* Right Region Background Shading */}
            <rect
              x={scaleX(splitThreshold)}
              y={padding}
              width={scaleX(maxX) - scaleX(splitThreshold)}
              height={height - 2 * padding}
              fill="rgba(245, 158, 11, 0.08)"
            />

            {/* Grid */}
            {[2, 4, 6, 8].map((v) => (
              <g key={`dt-g-${v}`}>
                <line x1={scaleX(v)} y1={padding} x2={scaleX(v)} y2={height - padding} stroke="#1e293b" strokeWidth="1" />
                <line x1={padding} y1={scaleY(v)} x2={width - padding} y2={scaleY(v)} stroke="#1e293b" strokeWidth="1" />
              </g>
            ))}

            {/* Axes */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#475569" strokeWidth="2" />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#475569" strokeWidth="2" />

            {/* Decision Threshold Line */}
            <line
              x1={scaleX(splitThreshold)}
              y1={padding}
              x2={scaleX(splitThreshold)}
              y2={height - padding}
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="4,4"
            />
            <text
              x={scaleX(splitThreshold)}
              y={padding - 6}
              fill="#10b981"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
            >
              x₁ = {splitThreshold.toFixed(2)}
            </text>

            {/* Data Points */}
            {points.map((p, idx) => (
              <circle
                key={`p-${idx}`}
                cx={scaleX(p.x)}
                cy={scaleY(p.y)}
                r="5.5"
                fill={p.label === 0 ? '#06b6d4' : '#f59e0b'}
                stroke="#0f172a"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">LEFT GINI (N={stats.leftTotal})</span>
              <span className="font-mono text-cyan-400 font-semibold">{stats.leftGini}</span>
            </div>
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">RIGHT GINI (N={stats.rightTotal})</span>
              <span className="font-mono text-amber-400 font-semibold">{stats.rightGini}</span>
            </div>
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">GINI GAIN (ΔG)</span>
              <span className="font-mono text-emerald-400 font-semibold">+{stats.giniGain}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider block">
              Split Cut Control
            </span>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Threshold θ on Feature x₁</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{splitThreshold.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.1"
                value={splitThreshold}
                onChange={(e) => setSplitThreshold(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1.0</span>
                <span>4.2 (Optimal)</span>
                <span>8.0</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300 space-y-1">
              <span className="font-semibold block">CART Algorithm Metric:</span>
              <p>Gini Impurity formula: <span className="font-mono">G = 1 - Σ pᵢ²</span></p>
              <p>The optimal split maximizes Gini Gain: <span className="font-mono">ΔG = G_parent - G_split</span>.</p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            Notice how at θ = 4.2, both left and right partitions become pure (Gini ≈ 0), maximizing information gain.
          </div>
        </div>
      </div>
    </div>
  );
};
