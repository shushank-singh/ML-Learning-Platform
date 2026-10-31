'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, Activity, ShieldCheck, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export const OverfittingExplorer: React.FC = () => {
  const [complexity, setComplexity] = useState<'low' | 'medium' | 'high'>('high');
  const [l2Reg, setL2Reg] = useState<number>(0.0); // 0 to 0.1
  const [dropout, setDropout] = useState<number>(0.0); // 0 to 0.6
  const [dataSize, setDataSize] = useState<number>(500); // 100 to 2000

  const { trainCurve, valCurve, bestEpoch, diagnosis } = useMemo(() => {
    const epochs = 40;
    const trainPoints: { epoch: number; loss: number }[] = [];
    const valPoints: { epoch: number; loss: number }[] = [];

    // Base difficulty parameters
    const complexityFactor = complexity === 'low' ? 0.4 : complexity === 'medium' ? 1.0 : 2.2;
    const regBenefit = l2Reg * 15 + dropout * 2.5 + (dataSize / 2000) * 0.8;

    let bestValLoss = Infinity;
    let bestEp = 1;

    for (let ep = 1; ep <= epochs; ep++) {
      // Training loss decays monotonically with complexity
      const tLoss =
        0.8 * Math.exp(-ep / (8 / complexityFactor)) +
        0.05 +
        (complexity === 'low' ? 0.35 : 0.01) +
        l2Reg * 0.5;

      // Validation loss: initially decreases, but diverges if high complexity and low regularization
      const overfitDivergence =
        complexity === 'high'
          ? Math.max(0, ep - 12) * (0.025 / (1 + regBenefit))
          : 0;

      const vLoss =
        0.85 * Math.exp(-ep / 10) +
        0.15 +
        (complexity === 'low' ? 0.4 : 0.03) +
        overfitDivergence +
        (1 - dataSize / 2000) * 0.15;

      if (vLoss < bestValLoss) {
        bestValLoss = vLoss;
        bestEp = ep;
      }

      trainPoints.push({ epoch: ep, loss: tLoss });
      valPoints.push({ epoch: ep, loss: vLoss });
    }

    // Determine diagnosis
    const finalTrain = trainPoints[epochs - 1].loss;
    const finalVal = valPoints[epochs - 1].loss;
    const gap = finalVal - finalTrain;

    let diag = 'Good Generalization';
    if (finalTrain > 0.4) {
      diag = 'High Bias (Underfitting): Model lacks capacity to learn patterns.';
    } else if (gap > 0.3) {
      diag = 'High Variance (Overfitting): Large generalization gap. Increase dropout or L2.';
    } else {
      diag = 'Optimal Fit: Training and validation losses converge stably.';
    }

    return {
      trainCurve: trainPoints,
      valCurve: valPoints,
      bestEpoch: bestEp,
      diagnosis: diag,
    };
  }, [complexity, l2Reg, dropout, dataSize]);

  // Coordinate mapping for SVG: Width 540, Height 240
  // Epochs: 1 to 40 -> X: 45 to 500
  // Loss: 0 to 1.2 -> Y: 200 to 25
  const toSvgX = (ep: number) => 45 + ((ep - 1) / 39) * 455;
  const toSvgY = (l: number) => 200 - Math.min(1.2, Math.max(0, l)) * 145;

  const trainSvgPath = trainCurve
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.epoch).toFixed(1)} ${toSvgY(p.loss).toFixed(1)}`)
    .join(' ');

  const valSvgPath = valCurve
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.epoch).toFixed(1)} ${toSvgY(p.loss).toFixed(1)}`)
    .join(' ');

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Overfitting, Regularization &amp; Generalization Gap Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Observe the divergence between Training Loss and Validation Loss as capacity, Dropout, and L2 weight decay vary.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['low', 'medium', 'high'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setComplexity(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                complexity === c
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Capacity: {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-x-auto text-slate-100">
        <svg viewBox="0 0 540 240" className="w-full min-w-[480px] h-56 select-none">
          {/* Axis */}
          <line x1="45" y1="200" x2="505" y2="200" stroke="#334155" strokeWidth="1.5" />
          <line x1="45" y1="25" x2="45" y2="200" stroke="#334155" strokeWidth="1.5" />

          {/* Epoch ticks */}
          {[1, 10, 20, 30, 40].map((ep) => (
            <g key={ep}>
              <line x1={toSvgX(ep)} y1="196" x2={toSvgX(ep)} y2="204" stroke="#64748b" strokeWidth="1.5" />
              <text x={toSvgX(ep)} y="218" fill="#64748b" fontSize="10" textAnchor="middle">Ep {ep}</text>
            </g>
          ))}
          <text x="25" y="25" fill="#64748b" fontSize="10">Loss</text>

          {/* Training Curve */}
          <path d={trainSvgPath} fill="none" stroke="#3b82f6" strokeWidth="3" />

          {/* Validation Curve */}
          <path d={valSvgPath} fill="none" stroke="#f59e0b" strokeWidth="3" />

          {/* Early Stopping Marker */}
          <g transform={`translate(${toSvgX(bestEpoch)}, 30)`}>
            <line x1="0" y1="0" x2="0" y2="170" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="0" cy={toSvgY(valCurve[bestEpoch - 1]?.loss || 0.3) - 30} r="5" fill="#10b981" />
            <rect x="-45" y="-12" width="90" height="20" rx="4" fill="#064e3b" />
            <text x="0" y="2" fill="#6ee7b7" fontSize="9" fontWeight="700" textAnchor="middle">
              Early Stop (Ep {bestEpoch})
            </text>
          </g>

          {/* Legend */}
          <g transform="translate(360, 35)">
            <rect width="135" height="48" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <line x1="12" y1="16" x2="32" y2="16" stroke="#3b82f6" strokeWidth="3" />
            <text x="40" y="20" fill="#93c5fd" fontSize="10" fontWeight="600">Train Loss</text>
            <line x1="12" y1="34" x2="32" y2="34" stroke="#f59e0b" strokeWidth="3" />
            <text x="40" y="38" fill="#fcd34d" fontSize="10" fontWeight="600">Validation Loss</text>
          </g>
        </svg>

        {/* Diagnosis Pill */}
        <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="text-slate-300">
            <strong>Diagnosis:</strong> {diagnosis}
          </span>
        </div>
      </div>

      {/* Regularization Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">L2 Weight Decay (λ):</span>
            <span className="font-mono font-bold text-indigo-600">{l2Reg.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.08"
            step="0.005"
            value={l2Reg}
            onChange={(e) => setL2Reg(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 mt-1">Penalizes large weight magnitudes to prevent sharp decision boundaries.</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">Dropout Rate (p):</span>
            <span className="font-mono font-bold text-indigo-600">{(dropout * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.6"
            step="0.05"
            value={dropout}
            onChange={(e) => setDropout(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 mt-1">Randomly zeroes activations to force redundant feature representations.</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">Dataset Size (N):</span>
            <span className="font-mono font-bold text-indigo-600">{dataSize} samples</span>
          </div>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={dataSize}
            onChange={(e) => setDataSize(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 mt-1">More diverse training samples naturally closes the generalization gap.</p>
        </div>
      </div>
    </div>
  );
};

