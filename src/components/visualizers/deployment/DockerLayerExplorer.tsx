'use client';

import React, { useState } from 'react';
import {
  Layers,
  Box,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Zap,
  HardDrive,
  RefreshCw,
  Code,
  ArrowDown,
} from 'lucide-react';

type BuildMode = 'naive' | 'multistage';

interface DockerLayer {
  id: string;
  command: string;
  sizeMb: number;
  cached: boolean;
  securityNote?: string;
  cacheRisk?: string;
}

export const DockerLayerExplorer: React.FC = () => {
  const [buildMode, setBuildMode] = useState<BuildMode>('multistage');
  const [codeChanged, setCodeChanged] = useState<'app' | 'deps' | 'none'>('app');
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  // Layers for naive build
  const naiveLayers: DockerLayer[] = [
    {
      id: 'naive-1',
      command: 'FROM python:3.11 (Full Ubuntu base + build tools)',
      sizeMb: 1020,
      cached: true,
      securityNote: 'Warning: Contains curl, compilers, package managers unnecessary in runtime.',
    },
    {
      id: 'naive-2',
      command: 'COPY . /workspace (Copies everything including app code & .git)',
      sizeMb: 350,
      cached: codeChanged === 'none',
      cacheRisk: codeChanged !== 'none' ? 'CACHE BUSTED: Invalidation cascades to all following layers!' : undefined,
    },
    {
      id: 'naive-3',
      command: 'RUN pip install -r requirements.txt (Runs every build!)',
      sizeMb: 740,
      cached: codeChanged === 'none',
      cacheRisk: codeChanged !== 'none' ? 'CACHE MISS: Recompiling wheels & redownloading PyTorch!' : undefined,
    },
    {
      id: 'naive-4',
      command: 'CMD ["python", "main.py"] (Runs as root UID 0)',
      sizeMb: 0.1,
      cached: codeChanged === 'none',
      securityNote: 'CRITICAL: Container runs as root. Vulnerable to host container escape attacks.',
    },
  ];

  // Layers for production multi-stage build
  const multistageLayers: DockerLayer[] = [
    {
      id: 'stage-1',
      command: 'FROM python:3.11-slim AS builder (Base builder stage)',
      sizeMb: 125,
      cached: true,
    },
    {
      id: 'stage-2',
      command: 'COPY requirements.txt . && pip wheel --wheel-dir=/wheels -r requirements.txt',
      sizeMb: 160,
      cached: codeChanged !== 'deps',
      cacheRisk: codeChanged === 'deps' ? 'Dependencies updated: Rebuilding wheels' : 'CACHE HIT (3.2s saved)',
    },
    {
      id: 'stage-3',
      command: 'FROM python:3.11-slim AS runner (Clean runtime without compiler tools)',
      sizeMb: 125,
      cached: true,
    },
    {
      id: 'stage-4',
      command: 'RUN useradd -m -u 1000 appuser && pip install --no-index /wheels/*',
      sizeMb: 45,
      cached: codeChanged !== 'deps',
      securityNote: 'Least Privilege: Enforces non-root user UID 1000.',
    },
    {
      id: 'stage-5',
      command: 'COPY --chown=appuser:appuser ./src /app/src (Only app source code)',
      sizeMb: 8,
      cached: codeChanged === 'none',
      cacheRisk: codeChanged === 'app' ? 'Fast delta build: Only 8MB transferred' : 'CACHE HIT',
    },
    {
      id: 'stage-6',
      command: 'USER appuser && CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0"]',
      sizeMb: 0.1,
      cached: true,
      securityNote: 'Verified: Non-root execution with drop-caps.',
    },
  ];

  const activeLayers = buildMode === 'naive' ? naiveLayers : multistageLayers;
  const totalSize = activeLayers.reduce((acc, l) => acc + l.sizeMb, 0);
  const cacheHitCount = activeLayers.filter((l) => l.cached).length;
  const buildTimeEstimate =
    buildMode === 'naive'
      ? codeChanged === 'none' ? '2.1s' : '185s'
      : codeChanged === 'none' ? '0.8s' : codeChanged === 'app' ? '4.5s' : '28s';

  const selectedLayer = activeLayers[selectedLayerIndex] || activeLayers[0];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              MODULE 4 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-cyan-400" />
              Docker Layer Cache &amp; Container Optimization Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analyze Dockerfile layer ordering, cache invalidation cascading, multi-stage builds, and non-root security.
          </p>
        </div>

        {/* Build Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setBuildMode('naive');
              setSelectedLayerIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              buildMode === 'naive'
                ? 'bg-rose-950/60 border-rose-500 text-rose-300 ring-1 ring-rose-500/30'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            Naive Build (Bloated)
          </button>
          <button
            onClick={() => {
              setBuildMode('multistage');
              setSelectedLayerIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              buildMode === 'multistage'
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            Multi-Stage (Optimized)
          </button>
        </div>
      </div>

      {/* Simulation Controls & KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 md:col-span-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Simulate Developer Code Change
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'none', label: 'No Changes', desc: 'Repeat build' },
              { id: 'app', label: 'Edit main.py', desc: 'Code edit' },
              { id: 'deps', label: 'Edit requirements.txt', desc: 'Dep bump' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCodeChanged(c.id as any)}
                className={`p-2 rounded-lg text-left text-xs transition-all border ${
                  codeChanged === c.id
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">{c.label}</div>
                <div className="text-[10px] text-slate-500">{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 font-medium">Final Image Size</div>
          <div className="text-2xl font-extrabold text-white font-mono flex items-baseline gap-1.5">
            {totalSize.toFixed(0)} <span className="text-xs font-normal text-slate-400">MB</span>
          </div>
          <div className="text-[10px] font-mono text-emerald-400">
            {buildMode === 'multistage' ? '✓ 84% reduction vs naive' : '⚠ 2.1 GB bloated image'}
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 font-medium">Rebuild Duration</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">
            {buildTimeEstimate}
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            Cache Hits: {cacheHitCount} / {activeLayers.length}
          </div>
        </div>
      </div>

      {/* Layer Stack Visualization */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
          <span>DOCKER IMAGE LAYER STACK (CLICK TO INSPECT)</span>
          <span className="text-[11px] text-slate-500 font-mono">TOP = FINAL CONTAINER RUNTIME</span>
        </div>

        <div className="space-y-1.5">
          {activeLayers.map((layer, idx) => {
            const isSelected = selectedLayerIndex === idx;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerIndex(idx)}
                className={`w-full p-3 rounded-xl border text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-950/40 shadow-md ring-1 ring-cyan-500/40'
                    : 'border-slate-800 bg-slate-950/70 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                    L{idx + 1}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-mono font-semibold text-slate-200 truncate">
                      {layer.command}
                    </div>
                    {layer.cacheRisk && (
                      <div className="text-[10px] font-mono text-amber-400 mt-0.5">
                        {layer.cacheRisk}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-mono text-slate-400">
                    {layer.sizeMb} MB
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                      layer.cached
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {layer.cached ? 'CACHED' : 'CACHE MISS'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Layer Inspection Box */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
        <div className="font-semibold text-white flex items-center justify-between">
          <span>Layer Inspection: Layer #{selectedLayerIndex + 1}</span>
          <span className="font-mono text-cyan-400">{selectedLayer.sizeMb} MB</span>
        </div>
        <p className="font-mono text-slate-300 text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
          {selectedLayer.command}
        </p>
        {selectedLayer.securityNote && (
          <div className="p-2 rounded bg-amber-950/40 border border-amber-800/80 text-amber-300 text-[11px] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{selectedLayer.securityNote}</span>
          </div>
        )}
      </div>
    </div>
  );
};

