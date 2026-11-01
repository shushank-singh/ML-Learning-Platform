'use client';

import React, { useState } from 'react';
import {
  Cloud,
  Server,
  Cpu,
  Layers,
  DollarSign,
  Clock,
  Wrench,
  ShieldCheck,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

interface CloudTarget {
  id: string;
  name: string;
  category: string;
  examples: string[];
  baseCost: number;
  perReqCost: number;
  opsBurden: 'Low' | 'Medium' | 'High';
  coldStart: string;
  gpuSupport: 'Full' | 'Limited' | 'None';
  bestFor: string;
  tradeoffs: string;
}

export const CloudServiceComparisonExplorer: React.FC = () => {
  const [trafficScale, setTrafficScale] = useState<number>(50000); // req/day
  const [needGpu, setNeedGpu] = useState<boolean>(false);
  const [coldStartStrict, setColdStartStrict] = useState<boolean>(false);
  const [devOpsSkill, setDevOpsSkill] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  const targets: CloudTarget[] = [
    {
      id: 'paas',
      name: 'Managed PaaS',
      category: 'PaaS',
      examples: ['Render', 'Railway', 'Fly.io'],
      baseCost: 25,
      perReqCost: 0.000004,
      opsBurden: 'Low',
      coldStart: '2 - 4 sec (if scale-to-zero)',
      gpuSupport: 'Limited',
      bestFor: 'Fast prototypes, hackathons, and small microservices with minimal infra overhead.',
      tradeoffs: 'Limited GPU options; higher unit costs at massive multi-million request scale.',
    },
    {
      id: 'serverless-containers',
      name: 'Serverless Containers',
      category: 'CaaS',
      examples: ['GCP Cloud Run', 'AWS App Runner', 'Azure Container Apps'],
      baseCost: 15,
      perReqCost: 0.000006,
      opsBurden: 'Low',
      coldStart: '1 - 3 sec (cold) / 10ms (warm)',
      gpuSupport: 'Limited',
      bestFor: 'Spiky or unpredictable web APIs; scales to zero to save costs overnight.',
      tradeoffs: 'Inference cold starts can delay first user query; websocket and GPU quotas restricted.',
    },
    {
      id: 'iaas-vm',
      name: 'Virtual Machines (IaaS)',
      category: 'IaaS',
      examples: ['AWS EC2 (g4dn / c6i)', 'GCP Compute Engine', 'Hetzner'],
      baseCost: 65,
      perReqCost: 0.000001,
      opsBurden: 'Medium',
      coldStart: '0 ms (always warm)',
      gpuSupport: 'Full',
      bestFor: 'Predictable steady traffic, custom CUDA drivers, self-hosted LLM engines like vLLM.',
      tradeoffs: 'Manual OS patching, SSL renewal, firewall rules, and self-managed auto-scaling groups.',
    },
    {
      id: 'kubernetes',
      name: 'Managed Kubernetes (K8s)',
      category: 'Orchestration',
      examples: ['AWS EKS', 'GCP GKE', 'Azure AKS'],
      baseCost: 140,
      perReqCost: 0.0000008,
      opsBurden: 'High',
      coldStart: '0 ms (warm pods)',
      gpuSupport: 'Full',
      bestFor: 'Enterprise multi-service ecosystems, heterogeneous CPU/GPU clusters, multi-tenant isolation.',
      tradeoffs: 'Significant operational complexity (YAML manifests, ingress controllers, CNI, Helm).',
    },
    {
      id: 'managed-inference',
      name: 'Specialized Model Endpoints',
      category: 'MaaS / Managed AI',
      examples: ['AWS SageMaker Endpoints', 'Vertex AI', 'Baseten', 'Modal'],
      baseCost: 120,
      perReqCost: 0.000008,
      opsBurden: 'Low',
      coldStart: '1 - 5 sec or warm pools',
      gpuSupport: 'Full',
      bestFor: 'Enterprise compliance, zero-infra GPU LLM serving, automatic canary rollouts.',
      tradeoffs: 'Vendor lock-in; premium billing rates over bare cloud compute instances.',
    },
  ];

  // Scoring algorithm to determine best match
  const calculateScore = (target: CloudTarget): number => {
    let score = 70;
    if (needGpu) {
      if (target.gpuSupport === 'Full') score += 25;
      else if (target.gpuSupport === 'Limited') score -= 15;
      else score -= 40;
    }
    if (coldStartStrict) {
      if (target.coldStart.includes('0 ms')) score += 20;
      else score -= 25;
    }
    if (devOpsSkill === 'beginner') {
      if (target.opsBurden === 'Low') score += 20;
      if (target.opsBurden === 'High') score -= 35;
    } else if (devOpsSkill === 'advanced') {
      if (target.id === 'kubernetes' || target.id === 'iaas-vm') score += 15;
    }
    return Math.max(20, Math.min(98, score));
  };

  const scoredTargets = targets.map((t) => ({
    ...t,
    score: calculateScore(t),
    estimatedMonthlyCost: Math.round(t.baseCost + trafficScale * 30 * t.perReqCost + (needGpu ? 180 : 0)),
  })).sort((a, b) => b.score - a.score);

  const topMatch = scoredTargets[0];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
              MODULE 6 &amp; 7 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Cloud className="w-5 h-5 text-purple-400" />
              Cloud Service &amp; Deployment Architecture Trade-off Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compare IaaS, PaaS, Serverless Containers, and Kubernetes based on cost, GPU availability, and cold starts.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-purple-200">
            Top Recommendation: <strong className="text-white">{topMatch.name}</strong> ({topMatch.score}%)
          </span>
        </div>
      </div>

      {/* Decision Sliders & Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">Daily Traffic Volume</label>
            <span className="text-xs font-mono text-purple-400 font-bold">{trafficScale.toLocaleString()} req/day</span>
          </div>
          <input
            type="range"
            min="1000"
            max="500000"
            step="5000"
            value={trafficScale}
            onChange={(e) => setTrafficScale(Number(e.target.value))}
            className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>1K</span>
            <span>100K</span>
            <span>500K</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">GPU Acceleration</label>
          <button
            onClick={() => setNeedGpu(!needGpu)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
              needGpu
                ? 'bg-purple-950/80 border-purple-500 text-purple-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {needGpu ? '✓ GPU Required (e.g. LLM / CNN)' : '○ CPU Inference Sufficient'}
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Cold Start Tolerance</label>
          <button
            onClick={() => setColdStartStrict(!coldStartStrict)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
              coldStartStrict
                ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {coldStartStrict ? '⚡ Zero Cold Start Required' : '⏱ Tolerant (Can scale to zero)'}
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Team DevOps Experience</label>
          <div className="grid grid-cols-3 gap-1">
            {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDevOpsSkill(lvl)}
                className={`py-2 text-[11px] font-semibold rounded-lg capitalize border transition-all ${
                  devOpsSkill === lvl
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {scoredTargets.map((target, idx) => {
          const isWinner = idx === 0;
          return (
            <div
              key={target.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                isWinner
                  ? 'bg-purple-950/30 border-purple-500 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">{target.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {target.category}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isWinner ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {target.score}% Fit
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 font-mono mb-2">
                  Examples: {target.examples.join(', ')}
                </div>

                <div className="space-y-1.5 font-mono text-[11px] my-3 border-y border-slate-850 py-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Est. Monthly Cost:</span>
                    <strong className="text-emerald-400">${target.estimatedMonthlyCost}/mo</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Ops Maintenance:</span>
                    <span className={target.opsBurden === 'Low' ? 'text-emerald-400' : target.opsBurden === 'Medium' ? 'text-amber-400' : 'text-rose-400'}>
                      {target.opsBurden}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Cold Start:</span>
                    <span className="text-slate-200">{target.coldStart}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GPU Readiness:</span>
                    <span className={target.gpuSupport === 'Full' ? 'text-emerald-400' : 'text-slate-400'}>
                      {target.gpuSupport}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  <strong className="text-slate-200">Best for:</strong> {target.bestFor}
                </p>
              </div>

              <div className="mt-3 text-[10px] text-slate-400 border-t border-slate-850 pt-2">
                <span className="text-amber-400/90 font-semibold">Trade-off:</span> {target.tradeoffs}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

