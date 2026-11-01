'use client';

import React, { useState } from 'react';
import {
  Server,
  Cpu,
  Database,
  Globe,
  Layers,
  Zap,
  Activity,
  ArrowRight,
  ShieldCheck,
  HardDrive,
  RefreshCw,
  Sliders,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

type ArchProfile = 'monolith-cpu' | 'microservice-gpu' | 'enterprise-hybrid';

export const DeploymentArchitectureExplorer: React.FC = () => {
  const [profile, setProfile] = useState<ArchProfile>('microservice-gpu');
  const [trafficRps, setTrafficRps] = useState<number>(350);
  const [enableCache, setEnableCache] = useState<boolean>(true);
  const [enableAsyncQueue, setEnableAsyncQueue] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<string>('api-gateway');

  // Derived metrics based on architecture configuration
  const cacheHitRate = enableCache ? 0.38 : 0.0;
  const effectiveInferenceRps = Math.round(trafficRps * (1 - cacheHitRate));
  
  const baseInferenceLatency =
    profile === 'monolith-cpu' ? 95 : profile === 'microservice-gpu' ? 14 : 22;
  const networkLatency = 24;
  const gatewayOverhead = 4;
  const cacheLatency = 2;

  const avgLatency = enableCache
    ? Math.round(cacheHitRate * (networkLatency + gatewayOverhead + cacheLatency) + (1 - cacheHitRate) * (networkLatency + gatewayOverhead + baseInferenceLatency))
    : networkLatency + gatewayOverhead + baseInferenceLatency;

  const baseCost =
    profile === 'monolith-cpu'
      ? Math.max(48, Math.round(trafficRps * 0.22))
      : profile === 'microservice-gpu'
      ? Math.max(280, Math.round(trafficRps * 0.95))
      : Math.max(520, Math.round(trafficRps * 1.4));

  const cacheCost = enableCache ? 35 : 0;
  const queueCost = enableAsyncQueue ? 45 : 0;
  const totalCost = baseCost + cacheCost + queueCost;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              MODULE 1 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-400" />
              AI Application Deployment Architecture Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate end-to-end request lifecycles, network hops, caching trade-offs, and compute tier costs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 font-semibold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            P95: {avgLatency} ms
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 font-semibold flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            ${totalCost}/mo
          </span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Architecture Profile
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              { id: 'monolith-cpu', label: '1. Monolithic CPU API', desc: 'FastAPI + ONNX on CPU' },
              { id: 'microservice-gpu', label: '2. Split GPU Worker', desc: 'FastAPI Gateway + Triton GPU' },
              { id: 'enterprise-hybrid', label: '3. Enterprise Hybrid', desc: 'Gateway + vLLM + Vector DB' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setProfile(p.id as ArchProfile)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  profile === p.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <div className="font-semibold">{p.label}</div>
                <div className="text-[10px] text-slate-400 opacity-80">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Incoming Request Volume
            </label>
            <span className="text-xs font-mono text-indigo-400 font-bold">{trafficRps} RPS</span>
          </div>
          <input
            type="range"
            min="20"
            max="2500"
            step="10"
            value={trafficRps}
            onChange={(e) => setTrafficRps(Number(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>20 RPS (Dev)</span>
            <span>500 RPS (Med)</span>
            <span>2.5K RPS (High)</span>
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Architectural Enhancements
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setEnableCache(!enableCache)}
                className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  enableCache
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {enableCache ? '✓ Redis Cache ON' : '+ Add Redis Cache'}
              </button>
              <button
                onClick={() => setEnableAsyncQueue(!enableAsyncQueue)}
                className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  enableAsyncQueue
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {enableAsyncQueue ? '✓ Celery Queue ON' : '+ Add Celery Queue'}
              </button>
            </div>
          </div>
        </div>

        {/* Live System Diagnostics */}
        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-2.5 text-xs">
          <div className="font-semibold text-slate-200 flex items-center justify-between">
            <span>System Telemetry</span>
            <span className="text-[10px] text-slate-500 font-mono">SIMULATED DATA</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Cache Hit Ratio:</span>
              <span className={enableCache ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                {enableCache ? `${(cacheHitRate * 100).toFixed(0)}%` : '0% (Bypass)'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Effective Model Load:</span>
              <span className="text-indigo-300 font-semibold">{effectiveInferenceRps} req/s</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Compute Tier:</span>
              <span className="text-amber-300">
                {profile === 'monolith-cpu' ? '8x CPU Replicas' : profile === 'microservice-gpu' ? '2x A10G GPUs' : '4x A100 GPUs + Qdrant'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Network Egress:</span>
              <span className="text-slate-200">{((trafficRps * 4.2 * 3600 * 24 * 30) / (1024 * 1024)).toFixed(1)} GB/mo</span>
            </div>
          </div>
          {trafficRps > 1200 && profile === 'monolith-cpu' && (
            <div className="p-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300 text-[11px] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>CPU saturation warning: Latency tail spikes above 450ms.</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Topology Diagram */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
        <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center justify-between">
          <span>INTERACTIVE TOPOLOGY DIAGRAM (CLICK NODES TO INSPECT RESPONSIBILITIES)</span>
          <span className="text-[11px] text-indigo-400">Selected: {selectedNode.toUpperCase()}</span>
        </div>

        <div className="min-w-[680px] flex items-center justify-between gap-3 relative py-4">
          {/* Node 1: Client */}
          <button
            onClick={() => setSelectedNode('client')}
            className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              selectedNode === 'client' ? 'border-indigo-400 bg-indigo-950/40 shadow-lg' : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
            }`}
          >
            <Globe className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-bold text-white">Client App</span>
            <span className="text-[10px] text-slate-400">Browser / Mobile</span>
            <span className="text-[9px] font-mono text-emerald-400 mt-1">POST /predict</span>
          </button>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          {/* Node 2: Reverse Proxy & Ingress */}
          <button
            onClick={() => setSelectedNode('ingress')}
            className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              selectedNode === 'ingress' ? 'border-indigo-400 bg-indigo-950/40 shadow-lg' : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold text-white">Nginx / ALB</span>
            <span className="text-[10px] text-slate-400">TLS + Rate Limit</span>
            <span className="text-[9px] font-mono text-slate-400 mt-1">2ms overhead</span>
          </button>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          {/* Node 3: API Gateway */}
          <button
            onClick={() => setSelectedNode('api-gateway')}
            className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              selectedNode === 'api-gateway' ? 'border-indigo-400 bg-indigo-950/40 shadow-lg' : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
            }`}
          >
            <Layers className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-white">FastAPI Gateway</span>
            <span className="text-[10px] text-slate-400">Pydantic Validate</span>
            <span className="text-[9px] font-mono text-slate-400 mt-1">4ms overhead</span>
          </button>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          {/* Node 4: Cache or Queue (Conditional) */}
          {enableCache && (
            <>
              <button
                onClick={() => setSelectedNode('cache')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedNode === 'cache' ? 'border-emerald-400 bg-emerald-950/40 shadow-lg' : 'border-emerald-800/60 bg-emerald-950/20'
                }`}
              >
                <Zap className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white">Redis Cache</span>
                <span className="text-[10px] text-emerald-300">38% Hit Rate</span>
                <span className="text-[9px] font-mono text-emerald-400 mt-1">2ms Hit</span>
              </button>
              <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
            </>
          )}

          {/* Node 5: Model Inference Tier */}
          <button
            onClick={() => setSelectedNode('inference')}
            className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              selectedNode === 'inference' ? 'border-indigo-400 bg-indigo-950/40 shadow-lg' : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
            }`}
          >
            <Cpu className="w-5 h-5 text-rose-400" />
            <span className="text-xs font-bold text-white">
              {profile === 'monolith-cpu' ? 'CPU Workers' : 'Triton GPU'}
            </span>
            <span className="text-[10px] text-slate-400">Forward Pass</span>
            <span className="text-[9px] font-mono text-rose-400 mt-1">{baseInferenceLatency}ms infer</span>
          </button>

          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

          {/* Node 6: Storage / Model Registry */}
          <button
            onClick={() => setSelectedNode('storage')}
            className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
              selectedNode === 'storage' ? 'border-indigo-400 bg-indigo-950/40 shadow-lg' : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
            }`}
          >
            <Database className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold text-white">Object Store</span>
            <span className="text-[10px] text-slate-400">S3 / MinIO</span>
            <span className="text-[9px] font-mono text-cyan-400 mt-1">Immutable</span>
          </button>
        </div>

        {/* Selected Node Details Box */}
        <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
          {selectedNode === 'client' && (
            <p>
              <strong className="text-white">Client Tier:</strong> Single-page applications, mobile clients, or microservices issue JSON inference requests via HTTPS. Includes client-side timeout handling (5.0s default) and exponential backoff retries.
            </p>
          )}
          {selectedNode === 'ingress' && (
            <p>
              <strong className="text-white">Reverse Proxy (Nginx / Cloud ALB):</strong> Terminates TLS certificates, enforces rate limits (e.g. token bucket 100 req/min/IP), strips harmful headers, and load balances across backend FastAPI worker instances using Round Robin or Least Connections.
            </p>
          )}
          {selectedNode === 'api-gateway' && (
            <p>
              <strong className="text-white">FastAPI Application Gateway:</strong> Asynchronous ASGI service handling request payload validation via Pydantic schemas, JWT authentication, correlation ID injection (<code className="text-indigo-300 font-mono">X-Request-ID</code>), and health probes (<code className="text-indigo-300 font-mono">/health/liveness</code>).
            </p>
          )}
          {selectedNode === 'cache' && (
            <p>
              <strong className="text-white">Redis Semantic / Exact Cache:</strong> In-memory key-value store hashing request features to cached inference outputs. Absorbs ~38% of duplicate queries with sub-2ms latency, drastically cutting GPU compute costs.
            </p>
          )}
          {selectedNode === 'inference' && (
            <p>
              <strong className="text-white">Inference Engine Tier:</strong> Executes tensor forward passes. In CPU mode, multi-threaded ONNX Runtime handles moderate batches. In GPU mode, Triton or vLLM leverages dynamic continuous batching and FP16/INT8 kernels for maximum throughput.
            </p>
          )}
          {selectedNode === 'storage' && (
            <p>
              <strong className="text-white">Model Artifact Store:</strong> S3-compatible object storage storing immutable, cryptographically pinned model artifacts (<code className="text-indigo-300 font-mono">model.safetensors</code>, <code className="text-indigo-300 font-mono">onnx</code>). Downloaded once during container cold start.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

