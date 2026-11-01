'use client';

import React, { useState } from 'react';
import { DollarSign, Zap, TrendingDown, Clock, ShieldCheck, Database, Server, Info } from 'lucide-react';

export const LLMCostLatencyExplorer: React.FC = () => {
  const [dailyRequests, setDailyRequests] = useState<number>(50000);
  const [inputTokens, setInputTokens] = useState<number>(1200);
  const [outputTokens, setOutputTokens] = useState<number>(250);
  const [cacheHitRate, setCacheHitRate] = useState<number>(40); // 40% cached
  const [tieredRouting, setTieredRouting] = useState<boolean>(true); // Route 80% to light model

  // Illustrative baseline model rates (e.g. Frontier $2.50 / $10.00 per 1M tokens)
  // Light tier model rates (e.g. $0.15 / $0.60 per 1M tokens)
  const frontierInputPricePerM = 2.50;
  const frontierOutputPricePerM = 10.00;
  const lightInputPricePerM = 0.15;
  const lightOutputPricePerM = 0.60;

  // Unoptimized Baseline (100% requests to frontier, 0% caching)
  const baselineMonthlyInputTokens = (dailyRequests * 30 * inputTokens);
  const baselineMonthlyOutputTokens = (dailyRequests * 30 * outputTokens);
  const baselineMonthlyCost =
    (baselineMonthlyInputTokens / 1_000_000) * frontierInputPricePerM +
    (baselineMonthlyOutputTokens / 1_000_000) * frontierOutputPricePerM;
  const baselineP95LatencyMs = 850;

  // Optimized System (Semantic caching + Tiered routing)
  const uncachedRatio = (100 - cacheHitRate) / 100;
  const uncachedRequests = dailyRequests * uncachedRatio;

  // Tiered split: if enabled, 80% light, 20% frontier; else 100% frontier
  const lightRatio = tieredRouting ? 0.80 : 0.0;
  const frontierRatio = tieredRouting ? 0.20 : 1.0;

  const lightInputCost =
    (uncachedRequests * lightRatio * 30 * inputTokens / 1_000_000) * lightInputPricePerM;
  const lightOutputCost =
    (uncachedRequests * lightRatio * 30 * outputTokens / 1_000_000) * lightOutputPricePerM;

  const frontierInputCost =
    (uncachedRequests * frontierRatio * 30 * inputTokens / 1_000_000) * frontierInputPricePerM;
  const frontierOutputCost =
    (uncachedRequests * frontierRatio * 30 * outputTokens / 1_000_000) * frontierOutputPricePerM;

  // Cache lookup costs negligible (~$0.0001 per 10k lookups in Redis)
  const optimizedMonthlyCost = lightInputCost + lightOutputCost + frontierInputCost + frontierOutputCost;
  const totalMonthlySavings = Math.max(0, baselineMonthlyCost - optimizedMonthlyCost);
  const savingsPercent = Math.round((totalMonthlySavings / baselineMonthlyCost) * 100);

  // Optimized latency: cache hits take 15ms, light models take 220ms, frontier takes 850ms
  const cacheLatency = 15;
  const lightLatency = 220;
  const frontierLatency = 850;
  const effectiveP50LatencyMs = Math.round(
    (cacheHitRate / 100) * cacheLatency +
    uncachedRatio * (lightRatio * lightLatency + frontierRatio * frontierLatency)
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5" />
            LLM Unit Economics &amp; Latency Simulator
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Cost Optimization, Semantic Caching &amp; Tiered Routing
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Simulate token volume, cache hit rates, tiered model fallback, and overall monthly financial burn.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block font-mono">Monthly Cost Savings</span>
          <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {savingsPercent}% Lower Bill
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 font-medium block">Unoptimized Baseline</span>
          <span className="text-xl font-bold font-mono text-slate-500 line-through">
            ${baselineMonthlyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </span>
          <span className="text-[10px] text-slate-400 block">All calls to frontier</span>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-emerald-600 font-medium block">Optimized Monthly Cost</span>
          <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            ${optimizedMonthlyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block">
            Save ${totalMonthlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo
          </span>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 font-medium block">Effective P50 Latency</span>
          <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
            {effectiveP50LatencyMs} ms
          </span>
          <span className="text-[10px] text-indigo-500 block">Baseline: 850 ms</span>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 font-medium block">Cache Offload</span>
          <span className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {cacheHitRate}% Hits
          </span>
          <span className="text-[10px] text-slate-500 block">Redis semantic store</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold">
            <span>Daily Query Volume: {dailyRequests.toLocaleString()} queries/day</span>
            <span className="font-mono text-slate-500">{(dailyRequests * 30 / 1_000_000).toFixed(1)}M/month</span>
          </div>
          <input
            type="range"
            min="5000"
            max="200000"
            step="5000"
            value={dailyRequests}
            onChange={(e) => setDailyRequests(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold">
            <span>Semantic Cache Hit Rate: {cacheHitRate}%</span>
            <span className="font-mono text-emerald-600">{cacheHitRate > 0 ? '15ms response' : '0% cached'}</span>
          </div>
          <input
            type="range"
            min="0"
            max="70"
            step="5"
            value={cacheHitRate}
            onChange={(e) => setCacheHitRate(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold">
            <span>Prompt Length: {inputTokens} tokens</span>
            <span className="font-mono text-slate-500">Output: {outputTokens} tokens</span>
          </div>
          <input
            type="range"
            min="300"
            max="4000"
            step="100"
            value={inputTokens}
            onChange={(e) => setInputTokens(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer font-semibold">
            <input
              type="checkbox"
              checked={tieredRouting}
              onChange={(e) => setTieredRouting(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span>Enable Tiered Model Routing (80% Light / 20% Frontier)</span>
          </label>
        </div>
      </div>

      {/* Disclaimers & Pedagogical Notice */}
      <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-900 dark:text-amber-300 leading-relaxed">
          <strong>Configurable Example Prices:</strong> The rates shown above ($2.50/$10.00 and $0.15/$0.60 per 1M tokens) are illustrative configurable baseline examples used for learning unit economics. They are not guaranteed current provider prices. Always bind cost monitoring scripts to your actual provider invoice rate cards.
        </p>
      </div>
    </div>
  );
};

