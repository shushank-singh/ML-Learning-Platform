'use client';

import React, { useState, useMemo } from 'react';
import { Target, RotateCcw, Sliders } from 'lucide-react';

export const LogisticBoundaryVisualizer: React.FC = () => {
  const [w1, setW1] = useState<number>(1.2);
  const [w2, setW2] = useState<number>(0.9);
  const [bias, setBias] = useState<number>(-4.5);
  const [threshold, setThreshold] = useState<number>(0.5);

  // Generate 2D sample points (Class 0 and Class 1)
  const samplePoints = useMemo(() => {
    return [
      // Class 0 (Blue) cluster around (2, 2)
      { x1: 1.2, x2: 1.5, label: 0 },
      { x1: 1.8, x2: 2.2, label: 0 },
      { x1: 2.4, x2: 1.8, label: 0 },
      { x1: 2.1, x2: 3.0, label: 0 },
      { x1: 1.5, x2: 2.7, label: 0 },
      { x1: 2.8, x2: 2.4, label: 0 },
      { x1: 3.2, x2: 1.9, label: 0 },
      { x1: 1.9, x2: 1.1, label: 0 },

      // Class 1 (Orange) cluster around (4.5, 4.5)
      { x1: 4.2, x2: 4.8, label: 1 },
      { x1: 3.8, x2: 4.2, label: 1 },
      { x1: 5.0, x2: 4.5, label: 1 },
      { x1: 4.6, x2: 3.9, label: 1 },
      { x1: 5.2, x2: 5.1, label: 1 },
      { x1: 3.5, x2: 5.0, label: 1 },
      { x1: 4.1, x2: 3.4, label: 1 },
      { x1: 4.9, x2: 4.1, label: 1 },
    ];
  }, []);

  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

  // Compute stats: Accuracy and Cross-Entropy Loss
  const stats = useMemo(() => {
    let correct = 0;
    let logLoss = 0;
    const eps = 1e-15;

    samplePoints.forEach((p) => {
      const z = w1 * p.x1 + w2 * p.x2 + bias;
      const prob = sigmoid(z);
      const pred = prob >= threshold ? 1 : 0;
      if (pred === p.label) correct++;

      const pClamped = Math.max(eps, Math.min(1 - eps, prob));
      logLoss += -(p.label * Math.log(pClamped) + (1 - p.label) * Math.log(1 - pClamped));
    });

    return {
      accuracy: ((correct / samplePoints.length) * 100).toFixed(1),
      logLoss: (logLoss / samplePoints.length).toFixed(3),
    };
  }, [w1, w2, bias, threshold, samplePoints]);

  const width = 500;
  const height = 340;
  const padding = 40;
  const minX = 0;
  const maxX = 7;
  const minY = 0;
  const maxY = 7;

  const scaleX = (x: number) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);

  // Decision boundary: w1*x1 + w2*x2 + bias = logit(threshold)
  // logit(p) = ln(p / (1 - p))
  const logitThreshold = Math.log(threshold / (1 - threshold));
  // x2 = (logitThreshold - bias - w1 * x1) / w2
  const lineYAtMinX = (logitThreshold - bias - w1 * minX) / (w2 || 0.001);
  const lineYAtMaxX = (logitThreshold - bias - w1 * maxX) / (w2 || 0.001);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
              Logistic Regression Decision Boundary & Probability Surface
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Boundary satisfies σ(w₁x₁ + w₂x₂ + b) = τ
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setW1(1.2);
            setW2(0.9);
            setBias(-4.5);
            setThreshold(0.5);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Weights
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span> Class 0
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block ml-3"></span> Class 1
            </span>
            <span className="font-mono text-emerald-400">
              Boundary: {w1}x₁ + {w2}x₂ + ({bias}) = {logitThreshold.toFixed(2)}
            </span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Grid */}
            {[1, 2, 3, 4, 5, 6].map((v) => (
              <g key={`g-${v}`}>
                <line x1={scaleX(v)} y1={padding} x2={scaleX(v)} y2={height - padding} stroke="#1e293b" strokeWidth="1" />
                <line x1={padding} y1={scaleY(v)} x2={width - padding} y2={scaleY(v)} stroke="#1e293b" strokeWidth="1" />
              </g>
            ))}

            {/* Axes */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#475569" strokeWidth="2" />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#475569" strokeWidth="2" />

            {/* Decision Line */}
            <line
              x1={scaleX(minX)}
              y1={scaleY(lineYAtMinX)}
              x2={scaleX(maxX)}
              y2={scaleY(lineYAtMaxX)}
              stroke="#10b981"
              strokeWidth="3"
            />

            {/* Data Points */}
            {samplePoints.map((p, idx) => {
              const z = w1 * p.x1 + w2 * p.x2 + bias;
              const prob = sigmoid(z);
              const pred = prob >= threshold ? 1 : 0;
              const isCorrect = pred === p.label;

              return (
                <circle
                  key={`pt-${idx}`}
                  cx={scaleX(p.x1)}
                  cy={scaleY(p.x2)}
                  r="6"
                  fill={p.label === 1 ? '#f59e0b' : '#06b6d4'}
                  stroke={isCorrect ? '#0f172a' : '#f43f5e'}
                  strokeWidth={isCorrect ? '1.5' : '3'}
                />
              );
            })}
          </svg>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">CLASSIFICATION ACCURACY</span>
              <span className="font-mono text-emerald-400 font-semibold text-sm">{stats.accuracy}%</span>
            </div>
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">LOG LOSS / CROSS-ENTROPY</span>
              <span className="font-mono text-amber-400 font-semibold text-sm">{stats.logLoss}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 space-y-3">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider block">
              Model Parameters
            </span>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Weight 1 (w₁)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{w1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="4"
                step="0.1"
                value={w1}
                onChange={(e) => setW1(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Weight 2 (w₂)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{w2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="4"
                step="0.1"
                value={w2}
                onChange={(e) => setW2(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Bias (b)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{bias.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-10"
                max="2"
                step="0.2"
                value={bias}
                onChange={(e) => setBias(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Classification Threshold (τ)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{threshold.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="p-3 rounded bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300">
            Points circled in red indicate misclassifications where P(Y=1) failed the threshold τ.
          </div>
        </div>
      </div>
    </div>
  );
};
