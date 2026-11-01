'use client';

import React, { useState } from 'react';
import { GitPullRequest, ArrowRight, ShieldAlert, CheckCircle, RefreshCcw, Server, Activity, Users } from 'lucide-react';

export const ModelReleaseWorkflowExplorer: React.FC = () => {
  const [trafficSplit, setTrafficSplit] = useState<number>(10); // 10% to Challenger
  const [challengerErrorRate, setChallengerErrorRate] = useState<number>(0.8); // 0.8%
  const [isRolledBack, setIsRolledBack] = useState<boolean>(false);
  const [isPromoted, setIsPromoted] = useState<boolean>(false);

  const championErrorRate = 0.2; // 0.2%
  const championLatency = 24.5; // ms
  const challengerLatency = 16.2; // ms (faster)

  const handleTrafficChange = (val: number) => {
    if (isRolledBack) return;
    setTrafficSplit(val);
  };

  const handleSimulateIncident = () => {
    setChallengerErrorRate(3.6); // Spikes error rate above 1.5% threshold
    setTimeout(() => {
      // Auto-rollback triggered by circuit breaker
      setIsRolledBack(true);
      setTrafficSplit(0);
    }, 1200);
  };

  const handleReset = () => {
    setIsRolledBack(false);
    setIsPromoted(false);
    setChallengerErrorRate(0.8);
    setTrafficSplit(10);
  };

  const handlePromoteTo100 = () => {
    setTrafficSplit(100);
    setIsPromoted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <GitPullRequest className="w-3.5 h-3.5" />
            Model Registry &amp; Progressive Delivery
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Canary Deployment &amp; Automated Circuit-Breaker Rollback
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Split live production traffic between Champion (v1.1.0) and Challenger (v1.2.0) with automated SLA circuit breakers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateIncident}
            disabled={isRolledBack || isPromoted}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-all disabled:opacity-50"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Inject 5xx Error Spike</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Rollback Alert Banner */}
      {isRolledBack && (
        <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/50 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-rose-800 dark:text-rose-300">
              Automated Circuit Breaker Tripped! Immediate Rollback to 100% Champion.
            </p>
            <p className="text-rose-600 dark:text-rose-400">
              Challenger error rate reached {challengerErrorRate}% (exceeding strict SLA threshold of 1.5%). Traffic to v1.2.0 severed to protect users.
            </p>
          </div>
        </div>
      )}

      {isPromoted && (
        <div className="p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/50 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-emerald-800 dark:text-emerald-300">
              Promotion Successful! v1.2.0 is now the Active Champion.
            </p>
            <p className="text-emerald-600 dark:text-emerald-400">
              100% of production traffic served by v1.2.0 with lower latency (16.2ms vs 24.5ms) and acceptable error budget.
            </p>
          </div>
        </div>
      )}

      {/* Traffic Control Slider */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            <span>Traffic Split Slider: {100 - trafficSplit}% Champion / {trafficSplit}% Challenger</span>
          </div>
          <span className="font-mono text-indigo-600 dark:text-indigo-400">{trafficSplit}% to Canary</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={trafficSplit}
          disabled={isRolledBack || isPromoted}
          onChange={(e) => handleTrafficChange(parseInt(e.target.value, 10))}
          className="w-full accent-indigo-600 cursor-pointer disabled:opacity-40"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>0% (Shadow / Staging)</span>
          <span>10% (Canary Verification)</span>
          <span>50% (A/B Test)</span>
          <span>100% (Full Promotion)</span>
        </div>
      </div>

      {/* Side-by-side Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Champion */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Production Baseline</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Champion: model-v1.1.0</h4>
            </div>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {100 - trafficSplit}% Traffic
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-850">
              <span className="text-slate-500">P95 Inference Latency</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{championLatency} ms</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-850">
              <span className="text-slate-500">HTTP 5xx Error Rate</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{championErrorRate}%</span>
            </div>
          </div>
        </div>

        {/* Challenger */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          isRolledBack
            ? 'border-rose-300 dark:border-rose-900 bg-rose-50/10'
            : 'border-indigo-200 dark:border-indigo-900 bg-indigo-50/10'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Candidate Release</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Challenger: model-v1.2.0</h4>
            </div>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {trafficSplit}% Traffic
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-850">
              <span className="text-slate-500">P95 Inference Latency</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{challengerLatency} ms (-34%)</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-850">
              <span className="text-slate-500">HTTP 5xx Error Rate</span>
              <span className={`font-mono font-bold ${
                challengerErrorRate > 1.5 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'
              }`}>
                {challengerErrorRate}% (Threshold: 1.5%)
              </span>
            </div>
          </div>

          {!isRolledBack && !isPromoted && trafficSplit >= 10 && (
            <button
              onClick={handlePromoteTo100}
              className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all"
            >
              Promote Challenger to 100% Production
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

