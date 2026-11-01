'use client';

import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Layers,
  Server,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Sliders,
} from 'lucide-react';

type IncidentState = 'healthy' | 'latency-spike' | 'error-surge';

export const ProductionObservabilityDashboard: React.FC = () => {
  const [incident, setIncident] = useState<IncidentState>('healthy');

  // Metrics based on incident state
  const rps = incident === 'healthy' ? 420 : incident === 'latency-spike' ? 680 : 390;
  const p50 = incident === 'healthy' ? 18 : incident === 'latency-spike' ? 140 : 22;
  const p95 = incident === 'healthy' ? 44 : incident === 'latency-spike' ? 420 : 58;
  const p99 = incident === 'healthy' ? 78 : incident === 'latency-spike' ? 890 : 110;
  const errorRatePct = incident === 'healthy' ? 0.04 : incident === 'latency-spike' ? 1.8 : 8.4;
  const errorBudgetPct = incident === 'healthy' ? 84.5 : incident === 'latency-spike' ? 42.0 : 8.2;
  const monthlyCostEst = incident === 'latency-spike' ? 740 : 510;

  const spans = [
    { name: 'nginx.ingress', duration: incident === 'latency-spike' ? 45 : 3, color: 'bg-sky-500' },
    { name: 'fastapi.auth_middleware', duration: 1.5, color: 'bg-indigo-500' },
    { name: 'pydantic.schema_validate', duration: 1.2, color: 'bg-purple-500' },
    { name: 'redis.cache_lookup', duration: incident === 'latency-spike' ? 85 : 2.1, color: 'bg-emerald-500' },
    { name: 'onnx.forward_pass', duration: incident === 'latency-spike' ? 240 : 28, color: 'bg-rose-500' },
    { name: 'fastapi.response_serialize', duration: 1.8, color: 'bg-amber-500' },
  ];

  const totalTraceDuration = spans.reduce((acc, s) => acc + s.duration, 0);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              MODULE 14 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Production AI Observability, SLI/SLO &amp; Cost Dashboard
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry simulator tracking latency percentiles, error budgets, OpenTelemetry distributed traces, and cloud unit economics.
          </p>
        </div>

        {/* Incident Triage Simulation Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIncident('healthy')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              incident === 'healthy'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            Normal (Healthy)
          </button>
          <button
            onClick={() => setIncident('latency-spike')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              incident === 'latency-spike'
                ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            Simulate Latency Spike
          </button>
          <button
            onClick={() => setIncident('error-surge')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              incident === 'error-surge'
                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            Simulate 5xx Outage
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono">Throughput (RPS)</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{rps} <span className="text-xs text-slate-400">req/s</span></div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +4.2% vs yesterday
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono">P95 Latency (SLA &lt;60ms)</div>
          <div className={`text-2xl font-extrabold font-mono mt-1 ${p95 > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {p95} <span className="text-xs text-slate-400">ms</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1">
            P50: {p50}ms · P99: {p99}ms
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono">SLO Error Budget</div>
          <div className={`text-2xl font-extrabold font-mono mt-1 ${errorBudgetPct < 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {errorBudgetPct}%
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1">
            Error rate: {errorRatePct}% (99.9% SLO)
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono">Cloud Burn Rate</div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono mt-1">
            ${monthlyCostEst} <span className="text-xs text-slate-400">/mo</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1">
            Unit cost: $0.00041/req
          </div>
        </div>
      </div>

      {/* Distributed Trace Waterfall (OpenTelemetry) */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>DISTRIBUTED TRACE WATERFALL: trace_4f810e2d (Total: {totalTraceDuration.toFixed(1)}ms)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">SIMULATED OPENTELEMETRY SPANS</span>
        </div>

        <div className="space-y-2 pt-2">
          {spans.map((span) => {
            const widthPct = Math.max(8, (span.duration / totalTraceDuration) * 100);
            return (
              <div key={span.name} className="flex items-center gap-3 text-xs font-mono">
                <span className="w-48 text-slate-400 truncate shrink-0">{span.name}:</span>
                <div className="flex-1 bg-slate-900 h-6 rounded-lg overflow-hidden flex items-center px-1">
                  <div
                    className={`${span.color} h-4 rounded text-[10px] font-bold text-white flex items-center px-2 transition-all`}
                    style={{ width: `${widthPct}%` }}
                  >
                    {span.duration}ms
                  </div>
                </div>
                <span className="text-slate-300 w-16 text-right shrink-0">{span.duration}ms</span>
              </div>
            );
          })}
        </div>

        {incident === 'latency-spike' && (
          <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800 text-amber-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              Root Cause Diagnosed: <strong>onnx.forward_pass</strong> bottlenecked (240ms) due to thread pool saturation on single CPU core.
            </span>
          </div>
        )}

        {incident === 'error-surge' && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>
              Critical Alert: 5xx error rate at 8.4% burning SLO budget in 42 minutes. Automated rollback trigger armed.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

