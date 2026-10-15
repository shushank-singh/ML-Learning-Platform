'use client';

import React, { useState, useMemo } from 'react';
import { Network, Sliders, RotateCcw, TrendingUp } from 'lucide-react';

export const PCAVisualizer: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState<number>(35);

  // Synthetic 2D dataset with strong diagonal correlation (x₂ ≈ 0.7 * x₁)
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const seedPoints = [
      [-3.0, -2.1], [-2.5, -1.9], [-2.0, -1.2], [-1.8, -1.6], [-1.2, -0.6],
      [-0.8, -0.9], [-0.4, -0.1], [0.0, 0.2], [0.3, -0.2], [0.7, 0.6],
      [1.1, 0.9], [1.5, 0.8], [2.0, 1.6], [2.4, 1.4], [2.8, 2.1],
      [3.2, 2.3], [-1.5, -0.3], [1.8, 1.0], [-0.5, 0.4], [0.9, 0.2]
    ];
    return seedPoints.map(([x, y]) => ({ x, y }));
  }, []);

  const stats = useMemo(() => {
    const rad = (angleDeg * Math.PI) / 180;
    const ux = Math.cos(rad);
    const uy = Math.sin(rad);

    // Compute scalar projections: z_i = x_i * ux + y_i * uy
    const projections = points.map((p) => p.x * ux + p.y * uy);
    const meanZ = projections.reduce((a, b) => a + b, 0) / projections.length;
    const variance = projections.reduce((sum, z) => sum + Math.pow(z - meanZ, 2), 0) / projections.length;

    // Total original 2D variance
    const varX = points.reduce((s, p) => s + p.x * p.x, 0) / points.length;
    const varY = points.reduce((s, p) => s + p.y * p.y, 0) / points.length;
    const totalVar = varX + varY;

    const explainedRatio = Math.min(100, Math.round((variance / totalVar) * 100));

    return {
      ux,
      uy,
      variance: Number(variance.toFixed(3)),
      explainedRatio,
    };
  }, [points, angleDeg]);

  const width = 500;
  const height = 300;
  const padding = 35;
  const minCoord = -4.5;
  const maxCoord = 4.5;

  const scaleX = (x: number) => padding + ((x - minCoord) / (maxCoord - minCoord)) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - ((y - minCoord) / (maxCoord - minCoord)) * (height - 2 * padding);

  // Line endpoints for rotated projection axis
  const axisLength = 4.2;
  const axisX1 = -stats.ux * axisLength;
  const axisY1 = -stats.uy * axisLength;
  const axisX2 = stats.ux * axisLength;
  const axisY2 = stats.uy * axisLength;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
              Principal Component Analysis (PCA) Variance Maximization
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Rotate projection axis v₁ to maximize projected variance uᵀΣu.
            </p>
          </div>
        </div>

        <button
          onClick={() => setAngleDeg(35)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Optimal PC1 (35°)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span> 2D Data Points (x₁, x₂)
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block ml-2"></span> Projections on Axis
            </span>
            <span className="font-mono text-emerald-400">
              Explained Variance: {stats.explainedRatio}%
            </span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Grid */}
            {[-3, -1.5, 0, 1.5, 3].map((v) => (
              <g key={`pca-g-${v}`}>
                <line x1={scaleX(v)} y1={padding} x2={scaleX(v)} y2={height - padding} stroke="#1e293b" strokeWidth="1" />
                <line x1={padding} y1={scaleY(v)} x2={width - padding} y2={scaleY(v)} stroke="#1e293b" strokeWidth="1" />
              </g>
            ))}

            {/* Axes */}
            <line x1={padding} y1={scaleY(0)} x2={width - padding} y2={scaleY(0)} stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
            <line x1={scaleX(0)} y1={padding} x2={scaleX(0)} y2={height - padding} stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />

            {/* Rotated Candidate Projection Axis */}
            <line
              x1={scaleX(axisX1)}
              y1={scaleY(axisY1)}
              x2={scaleX(axisX2)}
              y2={scaleY(axisY2)}
              stroke="#6366f1"
              strokeWidth="2.5"
            />

            {/* Project each point onto axis */}
            {points.map((p, idx) => {
              const dot = p.x * stats.ux + p.y * stats.uy;
              const projX = dot * stats.ux;
              const projY = dot * stats.uy;

              return (
                <g key={`proj-${idx}`}>
                  {/* Perpendicular projection line */}
                  <line
                    x1={scaleX(p.x)}
                    y1={scaleY(p.y)}
                    x2={scaleX(projX)}
                    y2={scaleY(projY)}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    opacity={0.5}
                  />
                  {/* Projected point on axis */}
                  <circle
                    cx={scaleX(projX)}
                    cy={scaleY(projY)}
                    r="3.5"
                    fill="#818cf8"
                    opacity={0.8}
                  />
                  {/* Original data point */}
                  <circle
                    cx={scaleX(p.x)}
                    cy={scaleY(p.y)}
                    r="4.5"
                    fill="#38bdf8"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">PROJECTED VARIANCE Var(z)</span>
              <span className="font-mono text-cyan-400 font-semibold">{stats.variance}</span>
            </div>
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">EXPLAINED VARIANCE RATIO</span>
              <span className="font-mono text-emerald-400 font-semibold text-sm">{stats.explainedRatio}%</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider block">
              Projection Angle Controls
            </span>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Axis Angle (θ)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{angleDeg}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="2"
                value={angleDeg}
                onChange={(e) => setAngleDeg(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0° (Horizontal)</span>
                <span>35° (Max PC1)</span>
                <span>125° (Min PC2)</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300 space-y-1">
              <span className="font-semibold block">Mathematical Objective:</span>
              <p>PCA finds unit vector <span className="font-mono">u</span> maximizing quadratic form <span className="font-mono">uᵀ Σ u</span> subject to <span className="font-mono">||u|| = 1</span>.</p>
              <p>The solution is the principal eigenvector of covariance matrix Σ with eigenvalue λ₁.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
