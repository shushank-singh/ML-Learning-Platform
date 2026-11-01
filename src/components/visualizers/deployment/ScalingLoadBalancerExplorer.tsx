'use client';

import React, { useState } from 'react';
import {
  Sliders,
  Server,
  Activity,
  Layers,
  Zap,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Cpu,
  RefreshCw,
} from 'lucide-react';

type LBAlgorithm = 'round-robin' | 'least-conn' | 'ip-hash';

export const ScalingLoadBalancerExplorer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<LBAlgorithm>('least-conn');
  const [trafficRps, setTrafficRps] = useState<number>(1200);
  const [replicaCount, setReplicaCount] = useState<number>(3);
  const [autoScaleEnabled, setAutoScaleEnabled] = useState<boolean>(true);

  // Target max capacity per replica is ~350 RPS (assuming 35ms service time)
  const capacityPerReplica = 350;
  
  // Autoscaler logic: determine desired replicas if autoscale is enabled
  const desiredReplicas = Math.max(1, Math.min(8, Math.ceil(trafficRps / (capacityPerReplica * 0.70))));
  const effectiveReplicas = autoScaleEnabled ? desiredReplicas : replicaCount;

  // Calculate load distribution per replica based on algorithm
  const replicas = Array.from({ length: effectiveReplicas }, (_, idx) => {
    let skew = 1.0;
    if (algorithm === 'round-robin') {
      skew = 1.0;
    } else if (algorithm === 'least-conn') {
      skew = 0.96 + (idx % 2 === 0 ? 0.04 : -0.04);
    } else if (algorithm === 'ip-hash') {
      // IP Hash might exhibit skew if hot IPs cluster on one instance
      skew = idx === 0 ? 1.35 : (trafficRps * 0.65) / ((effectiveReplicas - 1 || 1) * (trafficRps / effectiveReplicas));
    }

    const assignedRps = Math.round((trafficRps / effectiveReplicas) * skew);
    const cpuUtil = Math.min(100, Math.round((assignedRps / capacityPerReplica) * 100));
    const isOverloaded = cpuUtil >= 90;
    const isWarm = cpuUtil >= 60 && cpuUtil < 90;

    return {
      id: `worker-pod-${idx + 1}`,
      name: `Worker Pod #${idx + 1}`,
      assignedRps,
      cpuUtil,
      isOverloaded,
      isWarm,
      queueDepth: isOverloaded ? Math.round((assignedRps - capacityPerReplica) * 0.15) : 0,
    };
  });

  const avgCpu = Math.round(replicas.reduce((acc, r) => acc + r.cpuUtil, 0) / effectiveReplicas);
  const totalDroppedReq = replicas.reduce((acc, r) => acc + (r.isOverloaded ? Math.round(r.assignedRps * 0.08) : 0), 0);

  // Little's Law: Concurrency L = lambda * W (with W = 0.035s)
  const concurrency = Math.round(trafficRps * 0.035);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              MODULE 9 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              Scaling, Load Balancing &amp; Concurrency Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate Round Robin, Least Connections, and IP Hash algorithms under variable traffic with Horizontal Pod Autoscaling (HPA).
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-amber-400 font-semibold">
            Cluster Avg CPU: {avgCpu}%
          </span>
          <span className={`px-2.5 py-1 rounded-lg border font-semibold ${
            totalDroppedReq > 0 ? 'bg-rose-950/60 border-rose-500 text-rose-300' : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
          }`}>
            {totalDroppedReq > 0 ? `⚠ ${totalDroppedReq} req/s dropped` : '✓ 100% Request Success'}
          </span>
        </div>
      </div>

      {/* Control Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Load Balancer Algorithm
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              { id: 'least-conn', label: 'Least Connections (Recommended)', desc: 'Routes to replica with fewest active sockets' },
              { id: 'round-robin', label: 'Round Robin', desc: 'Strict sequential circular dispatch' },
              { id: 'ip-hash', label: 'IP Hash (Sticky)', desc: 'Hashes client IP (can cause hot shard skew)' },
            ].map((alg) => (
              <button
                key={alg.id}
                onClick={() => setAlgorithm(alg.id as LBAlgorithm)}
                className={`p-2 rounded-lg text-left text-xs transition-all border ${
                  algorithm === alg.id
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">{alg.label}</div>
                <div className="text-[10px] text-slate-500">{alg.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">Incoming Traffic Load</label>
            <span className="text-xs font-mono text-amber-400 font-bold">{trafficRps} RPS</span>
          </div>
          <input
            type="range"
            min="100"
            max="3000"
            step="50"
            value={trafficRps}
            onChange={(e) => setTrafficRps(Number(e.target.value))}
            className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>100 RPS</span>
            <span>1500 RPS</span>
            <span>3000 RPS</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-850">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Auto-Scaler (HPA 70% Target)</label>
              <button
                onClick={() => setAutoScaleEnabled(!autoScaleEnabled)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                  autoScaleEnabled ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {autoScaleEnabled ? 'HPA ACTIVE' : 'MANUAL'}
              </button>
            </div>
            {!autoScaleEnabled && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-slate-400">Replicas: {replicaCount}</span>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={replicaCount}
                  onChange={(e) => setReplicaCount(Number(e.target.value))}
                  className="flex-1 accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Little's Law & Math Diagnostics */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="font-semibold text-white flex items-center justify-between">
            <span>Concurrency &amp; Queue Math</span>
            <span className="text-[10px] font-mono text-slate-500">LITTLE'S LAW</span>
          </div>
          <p className="text-[11px] text-slate-300 font-mono">
            L = λ × W = {trafficRps} × 0.035s = <strong className="text-amber-300">{concurrency} in-flight requests</strong>
          </p>
          <div className="text-[11px] space-y-1 text-slate-400 pt-1 border-t border-slate-800">
            <div className="flex justify-between">
              <span>Active Worker Pods:</span>
              <strong className="text-white font-mono">{effectiveReplicas} replicas</strong>
            </div>
            <div className="flex justify-between">
              <span>Avg Load per Pod:</span>
              <span className="font-mono text-slate-200">~{Math.round(trafficRps / effectiveReplicas)} RPS</span>
            </div>
            <div className="flex justify-between">
              <span>Autoscaler Status:</span>
              <span className="text-emerald-400 font-mono font-semibold">
                {autoScaleEnabled ? `Target met (${effectiveReplicas} pods)` : 'Manual override'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Backend Replica Cluster Pods */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
          <span>BACKEND REPLICA FLEET UTILIZATION</span>
          <span className="text-[10px] font-mono text-slate-500">SAFE BAND: 30% - 80% CPU</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {replicas.map((pod) => (
            <div
              key={pod.id}
              className={`p-3.5 rounded-xl border transition-all ${
                pod.isOverloaded
                  ? 'border-rose-500 bg-rose-950/30 ring-1 ring-rose-500/50'
                  : pod.isWarm
                  ? 'border-amber-500/80 bg-amber-950/20'
                  : 'border-slate-800 bg-slate-950/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-slate-400" />
                  {pod.name}
                </span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    pod.isOverloaded
                      ? 'bg-rose-900 text-rose-200'
                      : pod.isWarm
                      ? 'bg-amber-900 text-amber-200'
                      : 'bg-emerald-950 text-emerald-300'
                  }`}
                >
                  {pod.cpuUtil}% CPU
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full my-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    pod.isOverloaded ? 'bg-rose-500' : pod.isWarm ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${pod.cpuUtil}%` }}
                />
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                <span>Throughput:</span>
                <span className="text-slate-200">{pod.assignedRps} RPS</span>
              </div>
              {pod.queueDepth > 0 && (
                <div className="text-[10px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Queue lag: +{pod.queueDepth} pending
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

