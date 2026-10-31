'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, Activity, ArrowRight, TrendingDown, Info } from 'lucide-react';

export const LossExplorer: React.FC = () => {
  const [lossType, setLossType] = useState<'bce' | 'mse' | 'mae' | 'huber'>('bce');
  const [targetY, setTargetY] = useState<number>(1); // 1 or 0 for BCE, value for regression
  const [predY, setPredY] = useState<number>(0.75); // prediction

  const { lossVal, gradientVal, pathPoints } = useMemo(() => {
    let loss = 0;
    let grad = 0;

    const eps = 1e-7;
    const clampedPred = Math.min(1 - eps, Math.max(eps, predY));

    if (lossType === 'bce') {
      // BCE = - [ y log(y_hat) + (1-y) log(1-y_hat) ]
      if (targetY === 1) {
        loss = -Math.log(clampedPred);
        grad = -1 / clampedPred;
      } else {
        loss = -Math.log(1 - clampedPred);
        grad = 1 / (1 - clampedPred);
      }
    } else if (lossType === 'mse') {
      const diff = clampedPred - targetY;
      loss = 0.5 * Math.pow(diff, 2);
      grad = diff;
    } else if (lossType === 'mae') {
      const diff = clampedPred - targetY;
      loss = Math.abs(diff);
      grad = diff > 0 ? 1 : -1;
    } else if (lossType === 'huber') {
      const delta = 0.5;
      const diff = Math.abs(clampedPred - targetY);
      if (diff <= delta) {
        loss = 0.5 * Math.pow(diff, 2);
        grad = clampedPred - targetY;
      } else {
        loss = delta * (diff - 0.5 * delta);
        grad = delta * Math.sign(clampedPred - targetY);
      }
    }

    // Generate curve points for y_hat in [0.02, 0.98]
    const points: string[] = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const py = 0.02 + (i / steps) * 0.96;
      let l = 0;
      if (lossType === 'bce') {
        l = targetY === 1 ? -Math.log(py) : -Math.log(1 - py);
      } else if (lossType === 'mse') {
        l = 0.5 * Math.pow(py - targetY, 2);
      } else if (lossType === 'mae') {
        l = Math.abs(py - targetY);
      } else {
        const d = Math.abs(py - targetY);
        l = d <= 0.5 ? 0.5 * d * d : 0.5 * (d - 0.25);
      }

      // Map to SVG coordinates: 500x220. x: 50 to 450, y: 190 (l=0) to 20 (l=4.0)
      const sx = 50 + ((py - 0.02) / 0.96) * 400;
      const sy = 190 - Math.min(3.8, l) * 42;
      points.push(`${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }

    return {
      lossVal: loss,
      gradientVal: grad,
      pathPoints: points.join(' '),
    };
  }, [lossType, targetY, predY]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 font-bold">
              <TrendingDown className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Loss Function &amp; Penalty Dynamics Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Observe how prediction errors generate loss signals and driving gradients <code className="text-rose-500 font-mono">∂L/∂ŷ</code> for backpropagation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['bce', 'mse', 'mae', 'huber'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setLossType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                lossType === t
                  ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t === 'bce' ? 'Binary Cross-Entropy' : t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Target Toggle */}
      <div className="flex items-center gap-4 text-xs font-semibold">
        <span className="text-slate-500">True Target Label (y):</span>
        <button
          onClick={() => setTargetY(1)}
          className={`px-3 py-1 rounded-lg transition-colors ${
            targetY === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          y = 1 (Positive Class)
        </button>
        <button
          onClick={() => setTargetY(0)}
          className={`px-3 py-1 rounded-lg transition-colors ${
            targetY === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          y = 0 (Negative Class)
        </button>
      </div>

      {/* Interactive SVG Curve */}
      <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-x-auto text-slate-100">
        <svg viewBox="0 0 520 220" className="w-full min-w-[460px] h-52 select-none">
          {/* Axis */}
          <line x1="50" y1="190" x2="470" y2="190" stroke="#334155" strokeWidth="1.5" />
          <line x1="50" y1="20" x2="50" y2="190" stroke="#334155" strokeWidth="1.5" />

          {/* Ticks on X */}
          {[0.0, 0.25, 0.5, 0.75, 1.0].map((t) => (
            <g key={t}>
              <line x1={50 + t * 400} y1="186" x2={50 + t * 400} y2="194" stroke="#64748b" strokeWidth="1.5" />
              <text x={50 + t * 400} y="208" fill="#64748b" fontSize="10" textAnchor="middle">{t.toFixed(2)}</text>
            </g>
          ))}
          <text x="475" y="208" fill="#94a3b8" fontSize="10">ŷ (Pred)</text>

          {/* Loss Curve */}
          <path d={pathPoints} fill="none" stroke="#f43f5e" strokeWidth="3" />

          {/* Current Prediction Point */}
          {(() => {
            const sx = 50 + Math.min(1, Math.max(0, predY)) * 400;
            const sy = 190 - Math.min(3.8, lossVal) * 42;
            return (
              <g>
                <circle cx={sx} cy={sy} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2.5" />
                <line x1={sx} y1={sy} x2={sx} y2="190" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              </g>
            );
          })()}

          {/* Target indicator */}
          <g transform={`translate(${50 + targetY * 400}, 190)`}>
            <circle r="4" fill="#10b981" />
            <text y="-8" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="700">Target y={targetY}</text>
          </g>
        </svg>
      </div>

      {/* Controls & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-700 dark:text-slate-300">Model Prediction (ŷ):</span>
            <span className="font-mono text-sm font-bold text-rose-600 dark:text-rose-400">{predY.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.99"
            step="0.01"
            value={predY}
            onChange={(e) => setPredY(parseFloat(e.target.value))}
            className="w-full accent-rose-600"
          />
          <p className="text-[11px] text-slate-500">
            Slide towards 0 or 1 to see how wrong confident predictions are punished.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold text-rose-600 dark:text-rose-400">Calculated Loss</span>
          <p className="text-xl font-mono font-extrabold text-rose-700 dark:text-rose-300">
            L = {lossVal.toFixed(4)}
          </p>
          <p className="text-[11px] text-slate-500">Objective is to minimize L towards 0</p>
        </div>

        <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">Gradient (∂L/∂ŷ)</span>
          <p className="text-xl font-mono font-extrabold text-indigo-700 dark:text-indigo-300">
            {gradientVal.toFixed(3)}
          </p>
          <p className="text-[11px] text-slate-500">
            Gradient points direction to shift weights during backpropagation.
          </p>
        </div>
      </div>
    </div>
  );
};

