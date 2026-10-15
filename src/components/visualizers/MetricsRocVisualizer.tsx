'use client';

import React, { useState, useMemo } from 'react';
import { BarChart3, Sliders, CheckCircle2, XCircle } from 'lucide-react';

export const MetricsRocVisualizer: React.FC = () => {
  const [threshold, setThreshold] = useState<number>(0.5);

  // Ground truth samples with predicted continuous scores [0, 1]
  const dataset = useMemo(() => {
    return [
      { score: 0.95, label: 1 },
      { score: 0.90, label: 1 },
      { score: 0.85, label: 1 },
      { score: 0.82, label: 1 },
      { score: 0.78, label: 0 },
      { score: 0.75, label: 1 },
      { score: 0.70, label: 1 },
      { score: 0.65, label: 0 },
      { score: 0.60, label: 1 },
      { score: 0.55, label: 0 },
      { score: 0.52, label: 1 },
      { score: 0.48, label: 0 },
      { score: 0.45, label: 1 },
      { score: 0.40, label: 0 },
      { score: 0.35, label: 0 },
      { score: 0.30, label: 0 },
      { score: 0.25, label: 1 },
      { score: 0.20, label: 0 },
      { score: 0.15, label: 0 },
      { score: 0.10, label: 0 },
    ];
  }, []);

  // Compute Confusion Matrix and metrics at current threshold
  const metrics = useMemo(() => {
    let tp = 0;
    let fp = 0;
    let tn = 0;
    let fn = 0;

    dataset.forEach((item) => {
      const pred = item.score >= threshold ? 1 : 0;
      if (pred === 1 && item.label === 1) tp++;
      else if (pred === 1 && item.label === 0) fp++;
      else if (pred === 0 && item.label === 0) tn++;
      else if (pred === 0 && item.label === 1) fn++;
    });

    const accuracy = (tp + tn) / dataset.length;
    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const specificity = tn + fp > 0 ? tn / (tn + fp) : 0;
    const fpr = 1 - specificity;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    return {
      tp,
      fp,
      tn,
      fn,
      accuracy: (accuracy * 100).toFixed(1),
      precision: precision.toFixed(3),
      recall: recall.toFixed(3),
      specificity: specificity.toFixed(3),
      fpr: fpr.toFixed(3),
      f1: f1.toFixed(3),
    };
  }, [threshold, dataset]);

  // Compute full ROC curve coordinates
  const rocPoints = useMemo(() => {
    const thresholds = Array.from({ length: 21 }, (_, i) => i * 0.05);
    const totalP = dataset.filter((d) => d.label === 1).length;
    const totalN = dataset.filter((d) => d.label === 0).length;

    const points = thresholds.map((t) => {
      let tp = 0;
      let fp = 0;
      dataset.forEach((d) => {
        if (d.score >= t) {
          if (d.label === 1) tp++;
          else fp++;
        }
      });
      const tpr = totalP > 0 ? tp / totalP : 0;
      const fpr = totalN > 0 ? fp / totalN : 0;
      return { fpr, tpr, t };
    });

    // Sort by FPR ascending
    points.sort((a, b) => a.fpr - b.fpr || a.tpr - b.tpr);
    return points;
  }, [dataset]);

  const width = 360;
  const height = 260;
  const padding = 35;
  const scaleX = (fpr: number) => padding + fpr * (width - 2 * padding);
  const scaleY = (tpr: number) => height - padding - tpr * (height - 2 * padding);

  const rocPath = `M ${rocPoints.map((p) => `${scaleX(p.fpr)},${scaleY(p.tpr)}`).join(' L ')}`;
  const currentFPR = Number(metrics.fpr);
  const currentTPR = Number(metrics.recall);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
              Interactive Confusion Matrix & ROC Curve Analyzer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Slide decision threshold τ to observe the tradeoff between False Positive Rate and True Positive Rate.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Threshold Slider & Confusion Matrix */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                Classification Cutoff Threshold (τ)
              </span>
              <span className="font-mono text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                {threshold.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>0.05 (Aggressive Recall)</span>
              <span>0.50 (Standard)</span>
              <span>0.95 (High Precision)</span>
            </div>
          </div>

          {/* 2x2 Confusion Matrix Table */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Confusion Matrix (N = 20)
            </span>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-mono block">
                  True Positive (TP)
                </span>
                <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-300">{metrics.tp}</span>
                <span className="text-[10px] text-slate-500 block">Correct Positives</span>
              </div>
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50">
                <span className="text-[10px] text-rose-700 dark:text-rose-400 uppercase font-mono block">
                  False Positive (FP - Type I)
                </span>
                <span className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-300">{metrics.fp}</span>
                <span className="text-[10px] text-slate-500 block">False Alarms</span>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                <span className="text-[10px] text-amber-700 dark:text-amber-400 uppercase font-mono block">
                  False Negative (FN - Type II)
                </span>
                <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-300">{metrics.fn}</span>
                <span className="text-[10px] text-slate-500 block">Missed Targets</span>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
                <span className="text-[10px] text-blue-700 dark:text-blue-400 uppercase font-mono block">
                  True Negative (TN)
                </span>
                <span className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-300">{metrics.tn}</span>
                <span className="text-[10px] text-slate-500 block">Correct Rejections</span>
              </div>
            </div>
          </div>

          {/* Derived Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-500 block">Accuracy</span>
              <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">{metrics.accuracy}%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-500 block">Precision</span>
              <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">{metrics.precision}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-500 block">Recall</span>
              <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">{metrics.recall}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-500 block">F1-Score</span>
              <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">{metrics.f1}</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive ROC Curve Chart */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-200">Receiver Operating Characteristic (ROC)</span>
            <span className="text-emerald-400 font-mono">AUC ≈ 0.88</span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Grid */}
            {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
              <g key={`roc-grid-${v}`}>
                <line x1={scaleX(v)} y1={padding} x2={scaleX(v)} y2={height - padding} stroke="#1e293b" strokeWidth="1" />
                <line x1={padding} y1={scaleY(v)} x2={width - padding} y2={scaleY(v)} stroke="#1e293b" strokeWidth="1" />
                <text x={scaleX(v)} y={height - padding + 14} fill="#64748b" fontSize="9" textAnchor="middle">{v}</text>
                <text x={padding - 6} y={scaleY(v) + 3} fill="#64748b" fontSize="9" textAnchor="end">{v}</text>
              </g>
            ))}

            {/* Random guess diagonal (AUC = 0.5) */}
            <line
              x1={scaleX(0)}
              y1={scaleY(0)}
              x2={scaleX(1)}
              y2={scaleY(1)}
              stroke="#475569"
              strokeDasharray="3,3"
              strokeWidth="1.5"
            />

            {/* ROC Curve */}
            <path d={rocPath} fill="none" stroke="#6366f1" strokeWidth="2.5" />

            {/* Current operating point */}
            <circle
              cx={scaleX(currentFPR)}
              cy={scaleY(currentTPR)}
              r="7"
              fill="#ec4899"
              stroke="#ffffff"
              strokeWidth="2"
              className="animate-pulse"
            />
            <text
              x={scaleX(currentFPR) + 10}
              y={scaleY(currentTPR) - 6}
              fill="#ec4899"
              fontSize="10"
              fontWeight="bold"
            >
              τ = {threshold.toFixed(2)}
            </text>

            {/* Axis labels */}
            <text x={width / 2} y={height - 5} fill="#94a3b8" fontSize="10" textAnchor="middle">
              False Positive Rate (1 - Specificity)
            </text>
            <text
              x={-height / 2}
              y={12}
              fill="#94a3b8"
              fontSize="10"
              textAnchor="middle"
              transform="rotate(-90)"
            >
              True Positive Rate (Recall)
            </text>
          </svg>

          <div className="text-[11px] text-slate-400 mt-2 bg-slate-900 p-2.5 rounded border border-slate-800">
            Current Operating Point: <span className="font-mono text-cyan-400">FPR = {metrics.fpr}</span>,{' '}
            <span className="font-mono text-emerald-400">TPR = {metrics.recall}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
