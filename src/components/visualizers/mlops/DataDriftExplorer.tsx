'use client';

import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, Sliders, Info, BarChart } from 'lucide-react';

interface FeatureDef {
  id: string;
  name: string;
  unit: string;
  baselineMean: number;
  baselineStd: number;
}

const FEATURES: FeatureDef[] = [
  { id: 'income', name: 'Annual Income ($k)', unit: '$k', baselineMean: 65, baselineStd: 15 },
  { id: 'credit', name: 'Credit Score', unit: 'pts', baselineMean: 710, baselineStd: 40 },
  { id: 'tx_amount', name: 'Transaction Amount ($)', unit: '$', baselineMean: 120, baselineStd: 35 },
];

export const DataDriftExplorer: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('income');
  const [meanShift, setMeanShift] = useState<number>(0); // -30 to +30
  const [varianceMultiplier, setVarianceMultiplier] = useState<number>(1.0); // 0.5 to 2.0
  const [isConceptDrift, setIsConceptDrift] = useState<boolean>(false);

  const activeFeature = FEATURES.find((f) => f.id === selectedFeatureId) || FEATURES[0];

  // Calculate synthetic KS-statistic and PSI
  const shiftRatio = Math.abs(meanShift) / activeFeature.baselineStd;
  const varianceRatio = Math.abs(varianceMultiplier - 1.0);
  
  // Synthetic Kolmogorov-Smirnov distance approximation (0 to 1)
  const ksStatistic = Math.min(0.98, Math.max(0.02, Number((shiftRatio * 0.35 + varianceRatio * 0.25).toFixed(3))));
  
  // Synthetic Population Stability Index (PSI)
  // PSI < 0.1: No change; 0.1 <= PSI < 0.2: Moderate; PSI >= 0.2: Significant drift
  const psiScore = Number((shiftRatio * 0.18 + varianceRatio * 0.15 + (ksStatistic * 0.1)).toFixed(3));

  let alertTier: 'green' | 'yellow' | 'red' = 'green';
  let alertMessage = 'Feature distribution stable (within acceptable baseline bounds).';
  if (psiScore >= 0.25 || ksStatistic >= 0.35) {
    alertTier = 'red';
    alertMessage = 'Critical Covariate Shift Detected! Production feature significantly diverged from training baseline.';
  } else if (psiScore >= 0.12 || ksStatistic >= 0.2) {
    alertTier = 'yellow';
    alertMessage = 'Moderate Drift Warning: Distribution divergence detected. Monitor validation ground truth.';
  }

  // Generate 8 histogram bin heights for Baseline vs Production
  const baselineBins = [5, 15, 35, 75, 80, 45, 20, 8];
  const prodShiftIndex = Math.round(meanShift / 8);
  const productionBins = baselineBins.map((val, idx) => {
    const shiftedIdx = idx - prodShiftIndex;
    let base = shiftedIdx >= 0 && shiftedIdx < baselineBins.length ? baselineBins[shiftedIdx] : 4;
    return Math.max(2, Math.round(base * varianceMultiplier));
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Evidently AI / Drift Detector
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Data Drift (Covariate Shift) vs Concept Drift Simulator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Simulate real-time feature distribution changes and observe Kolmogorov-Smirnov (KS) &amp; Population Stability Index (PSI) thresholds.
          </p>
        </div>

        {/* Feature selector */}
        <div className="flex items-center gap-2">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setSelectedFeatureId(f.id);
                setMeanShift(0);
                setVarianceMultiplier(1.0);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedFeatureId === f.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {f.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Banner */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
        alertTier === 'red'
          ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-300'
          : alertTier === 'yellow'
          ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-900 text-amber-800 dark:text-amber-300'
          : 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
      }`}>
        {alertTier === 'red' ? (
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
        )}
        <div className="text-xs space-y-1">
          <p className="font-bold">
            {alertTier === 'red' ? 'DRIFT CRITICAL ALERT' : alertTier === 'yellow' ? 'DRIFT WARNING' : 'HEALTHY: NO SIGNIFICANT DRIFT'}
          </p>
          <p>{alertMessage}</p>
        </div>
      </div>

      {/* Sliders for Mean Shift & Variance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
            <span>Production Distribution Shift: {meanShift > 0 ? `+${meanShift}` : meanShift} {activeFeature.unit}</span>
            <span className="font-mono text-slate-500">{(meanShift / activeFeature.baselineStd).toFixed(2)} sigma</span>
          </div>
          <input
            type="range"
            min="-25"
            max="25"
            step="1"
            value={meanShift}
            onChange={(e) => setMeanShift(parseInt(e.target.value, 10))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>-25 (Lower shift)</span>
            <span>0 (Identical to Baseline)</span>
            <span>+25 (Higher shift)</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
            <span>Variance / Spread Multiplier: {varianceMultiplier.toFixed(2)}x</span>
            <span className="font-mono text-slate-500">{varianceMultiplier > 1 ? 'Wider tails' : 'Narrower'}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.8"
            step="0.05"
            value={varianceMultiplier}
            onChange={(e) => setVarianceMultiplier(parseFloat(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0.5x (Compressed)</span>
            <span>1.0x (Original Spread)</span>
            <span>1.8x (Volatile / Heavy Tails)</span>
          </div>
        </div>
      </div>

      {/* Visual Histogram Chart */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Feature Distribution: Training Baseline (Blue) vs Production Stream (Amber)</span>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-500" />
              <span>Baseline (Train)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500" />
              <span>Production (Live)</span>
            </span>
          </div>
        </div>

        <div className="h-36 flex items-end gap-2 p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          {baselineBins.map((bVal, i) => {
            const pVal = productionBins[i] || 4;
            const maxVal = 90;
            const bHeight = Math.min(100, Math.round((bVal / maxVal) * 100));
            const pHeight = Math.min(100, Math.round((pVal / maxVal) * 100));

            return (
              <div key={i} className="flex-1 flex items-end justify-center gap-1 h-full">
                <div
                  style={{ height: `${bHeight}%` }}
                  className="w-full max-w-[20px] bg-blue-500/80 rounded-t transition-all duration-300"
                  title={`Baseline Bin ${i+1}: ${bVal}`}
                />
                <div
                  style={{ height: `${pHeight}%` }}
                  className="w-full max-w-[20px] bg-amber-500/80 rounded-t transition-all duration-300"
                  title={`Production Bin ${i+1}: ${pVal}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 font-medium block">KS-Statistic (Distance)</span>
          <span className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">{ksStatistic}</span>
          <span className="text-[10px] text-slate-500 block">Critical if &gt; 0.20</span>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 font-medium block">Population Stability (PSI)</span>
          <span className={`text-xl font-bold font-mono ${psiScore >= 0.2 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {psiScore}
          </span>
          <span className="text-[10px] text-slate-500 block">Drift alert if &ge; 0.20</span>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 font-medium block">Shift Type</span>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Covariate Shift</span>
          <span className="text-[10px] text-slate-500 block">P(X) shifted, P(Y|X) assumed const.</span>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 font-medium block">Recommended Action</span>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {alertTier === 'red' ? 'Trigger Retraining Pipeline' : alertTier === 'yellow' ? 'Sample Ground Truth' : 'Keep Serving'}
          </span>
          <span className="text-[10px] text-slate-500 block">Automated CI/CD hook</span>
        </div>
      </div>

      {/* Critical Pedagogical Callout */}
      <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-900 dark:text-blue-300 leading-relaxed">
          <strong>Key MLOps Rule:</strong> Data drift alone does <em>not</em> automatically prove that model accuracy has degraded!
          If the model learned robust invariant decision boundaries, it may still classify shifted inputs accurately. True model degradation requires evaluating ground truth labels (concept drift) or monitoring business conversion proxies.
        </p>
      </div>
    </div>
  );
};

