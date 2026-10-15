'use client';

import React, { useState, useMemo } from 'react';
import { Target, Sliders, RotateCcw } from 'lucide-react';

export const KNNVisualizer: React.FC = () => {
  const [k, setK] = useState<number>(3);
  const [queryX, setQueryX] = useState<number>(4.2);
  const [queryY, setQueryY] = useState<number>(4.5);

  const points = useMemo(() => [
    // Class 0 (Blue)
    { x: 2.0, y: 2.5, label: 0 },
    { x: 2.5, y: 3.5, label: 0 },
    { x: 3.0, y: 2.0, label: 0 },
    { x: 3.5, y: 4.0, label: 0 },
    { x: 2.2, y: 5.0, label: 0 },
    { x: 4.0, y: 3.0, label: 0 },
    { x: 3.8, y: 5.2, label: 0 },
    { x: 1.8, y: 4.2, label: 0 },

    // Class 1 (Orange)
    { x: 5.5, y: 6.0, label: 1 },
    { x: 6.0, y: 4.5, label: 1 },
    { x: 6.5, y: 7.0, label: 1 },
    { x: 5.0, y: 5.5, label: 1 },
    { x: 7.0, y: 5.0, label: 1 },
    { x: 5.8, y: 3.8, label: 1 },
    { x: 6.2, y: 6.5, label: 1 },
    { x: 7.5, y: 6.2, label: 1 },
  ], []);

  // Compute nearest neighbors and prediction
  const knnResult = useMemo(() => {
    const withDist = points.map((p, idx) => ({
      ...p,
      idx,
      dist: Math.hypot(p.x - queryX, p.y - queryY),
    }));

    withDist.sort((a, b) => a.dist - b.dist);
    const neighbors = withDist.slice(0, k);
    const maxRadius = neighbors.length > 0 ? neighbors[neighbors.length - 1].dist : 0;

    const class0Count = neighbors.filter(n => n.label === 0).length;
    const class1Count = neighbors.filter(n => n.label === 1).length;
    const predictedClass = class1Count > class0Count ? 1 : 0;

    return {
      neighbors,
      maxRadius,
      class0Count,
      class1Count,
      predictedClass,
    };
  }, [points, queryX, queryY, k]);

  const width = 500;
  const height = 300;
  const padding = 35;
  const minX = 0;
  const maxX = 9;
  const minY = 0;
  const maxY = 9;

  const scaleX = (x: number) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
  const scaleRadius = (r: number) => (r / (maxX - minX)) * (width - 2 * padding);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
              K-Nearest Neighbors (KNN) Neighborhood & Majority Vote
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag test query point (green star) and observe Euclidean radius containing the K neighbors.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setQueryX(4.2);
            setQueryY(4.5);
            setK(3);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Coordinates
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span> Class 0
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block ml-2"></span> Class 1
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block ml-2"></span> Query Point
            </span>
            <span className="font-mono text-emerald-400">
              Query: ({queryX.toFixed(1)}, {queryY.toFixed(1)})
            </span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Grid */}
            {[2, 4, 6, 8].map((v) => (
              <g key={`knn-g-${v}`}>
                <line x1={scaleX(v)} y1={padding} x2={scaleX(v)} y2={height - padding} stroke="#1e293b" strokeWidth="1" />
                <line x1={padding} y1={scaleY(v)} x2={width - padding} y2={scaleY(v)} stroke="#1e293b" strokeWidth="1" />
              </g>
            ))}

            {/* Axes */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#475569" strokeWidth="2" />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#475569" strokeWidth="2" />

            {/* KNN Neighborhood Circle */}
            <circle
              cx={scaleX(queryX)}
              cy={scaleY(queryY)}
              r={scaleRadius(knnResult.maxRadius)}
              fill="rgba(16, 185, 129, 0.08)"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4,4"
            />

            {/* Connectors from query point to K neighbors */}
            {knnResult.neighbors.map((n) => (
              <line
                key={`line-${n.idx}`}
                x1={scaleX(queryX)}
                y1={scaleY(queryY)}
                x2={scaleX(n.x)}
                y2={scaleY(n.y)}
                stroke="#10b981"
                strokeWidth="1.5"
                opacity={0.6}
              />
            ))}

            {/* Training Points */}
            {points.map((p, idx) => {
              const isNeighbor = knnResult.neighbors.some(n => n.idx === idx);
              return (
                <circle
                  key={`pt-${idx}`}
                  cx={scaleX(p.x)}
                  cy={scaleY(p.y)}
                  r={isNeighbor ? '7' : '5'}
                  fill={p.label === 0 ? '#06b6d4' : '#f59e0b'}
                  stroke={isNeighbor ? '#ffffff' : '#0f172a'}
                  strokeWidth={isNeighbor ? '2' : '1.5'}
                />
              );
            })}

            {/* Query Point (Green Star) */}
            <circle
              cx={scaleX(queryX)}
              cy={scaleY(queryY)}
              r="8"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">CLASS 0 NEIGHBORS</span>
              <span className="font-mono text-cyan-400 font-semibold">{knnResult.class0Count} of {k}</span>
            </div>
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">CLASS 1 NEIGHBORS</span>
              <span className="font-mono text-amber-400 font-semibold">{knnResult.class1Count} of {k}</span>
            </div>
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">MAJORITY VOTE PREDICTION</span>
              <span className={`font-mono font-bold ${knnResult.predictedClass === 1 ? 'text-amber-400' : 'text-cyan-400'}`}>
                Class {knnResult.predictedClass}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider block">
              KNN Hyperparameters
            </span>

            {/* K-Value Buttons */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Number of Neighbors (K)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{k}</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 3, 5, 7].map((val) => (
                  <button
                    key={val}
                    onClick={() => setK(val)}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border ${
                      k === val
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    K={val}
                  </button>
                ))}
              </div>
            </div>

            {/* Query X and Y Sliders */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Query Feature x₁</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{queryX.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.2"
                value={queryX}
                onChange={(e) => setQueryX(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Query Feature x₂</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{queryY.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.2"
                value={queryY}
                onChange={(e) => setQueryY(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300 space-y-1">
              <span className="font-semibold block">Non-Parametric Mechanics:</span>
              <p>Euclidean distance: <span className="font-mono">d(x, q) = √(Σ (xᵢ - qᵢ)²)</span></p>
              <p>K=1 gives flexible, high-variance decision boundaries. Larger K smooths the decision boundary, reducing variance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
