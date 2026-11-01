'use client';

import React, { useState } from 'react';
import {
  Cpu,
  HardDrive,
  Layers,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Activity,
  DollarSign,
} from 'lucide-react';

type ModelPreset = 'llama-8b' | 'llama-70b' | 'vit-large' | 'whisper-large';
type Precision = 'fp16' | 'int8' | 'int4';

export const GpuInferenceResourceExplorer: React.FC = () => {
  const [preset, setPreset] = useState<ModelPreset>('llama-8b');
  const [precision, setPrecision] = useState<Precision>('fp16');
  const [batchSize, setBatchSize] = useState<number>(8);
  const [seqLength, setSeqLength] = useState<number>(4096);

  // Model parameters (in billions)
  const paramsB = preset === 'llama-8b' ? 8.0 : preset === 'llama-70b' ? 70.0 : preset === 'vit-large' ? 0.35 : 1.55;
  const isLLM = preset === 'llama-8b' || preset === 'llama-70b';

  // Bytes per parameter
  const bytesPerParam = precision === 'fp16' ? 2.0 : precision === 'int8' ? 1.0 : 0.55;

  // Weights VRAM (GB)
  const weightsGb = paramsB * bytesPerParam;

  // KV Cache calculation for LLMs: 2 * num_layers * hidden_size * seq_len * batch_size * bytes
  // For 8B: 32 layers, hidden 4096. For 70B: 80 layers, hidden 8192
  const numLayers = preset === 'llama-70b' ? 80 : 32;
  const hiddenSize = preset === 'llama-70b' ? 8192 : 4096;
  const kvBytesPerToken = isLLM ? 2 * numLayers * hiddenSize * 2 : 0; // FP16 KV cache
  const totalKvCacheGb = isLLM ? (kvBytesPerToken * seqLength * batchSize) / (1024 * 1024 * 1024) : 0.8 * batchSize;

  // Activation & CUDA context overhead
  const cudaOverheadGb = 1.4;

  const totalVramRequiredGb = Number((weightsGb + totalKvCacheGb + cudaOverheadGb).toFixed(1));

  // GPU Specs comparison
  const gpus = [
    { name: 'NVIDIA T4', vram: 16, pricePerHr: 0.55 },
    { name: 'NVIDIA A10G', vram: 24, pricePerHr: 1.15 },
    { name: 'NVIDIA L4', vram: 24, pricePerHr: 0.85 },
    { name: 'NVIDIA A100 SXM', vram: 80, pricePerHr: 3.80 },
    { name: 'NVIDIA H100 SXM', vram: 80, pricePerHr: 4.95 },
  ];

  // Tokens per second estimation based on batch size and precision
  const estTokensPerSec = isLLM
    ? Math.round((1400 / Math.sqrt(paramsB)) * (precision === 'int4' ? 1.6 : 1.0) * Math.min(2.8, 1 + batchSize * 0.15))
    : Math.round(180 * batchSize);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              MODULE 11 VISUALIZER
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-rose-400" />
              GPU Memory (VRAM), Quantization &amp; Serving Throughput Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculate exact model weight footprints, KV cache allocation, CUDA runtime overhead, and GPU fit.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-rose-400 font-semibold">
            VRAM Need: {totalVramRequiredGb} GB
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 font-semibold">
            {estTokensPerSec} {isLLM ? 'tokens/sec' : 'imgs/sec'}
          </span>
        </div>
      </div>

      {/* Inputs Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Target Model Architecture
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              { id: 'llama-8b', label: 'Llama 3 (8 Billion)' },
              { id: 'llama-70b', label: 'Llama 3 (70 Billion)' },
              { id: 'vit-large', label: 'Vision ViT-Large (350M)' },
              { id: 'whisper-large', label: 'Whisper-Large (1.5B)' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setPreset(m.id as ModelPreset)}
                className={`px-2.5 py-1.5 rounded-lg text-left text-xs transition-all border ${
                  preset === m.id
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
            Weight Quantization Precision
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              { id: 'fp16', label: 'FP16 / BF16 (16-bit)', desc: '2.0 bytes/param (Standard)' },
              { id: 'int8', label: 'INT8 Quantized', desc: '1.0 byte/param (50% savings)' },
              { id: 'int4', label: 'INT4 AWQ / GPTQ', desc: '0.55 byte/param (72% savings)' },
            ].map((q) => (
              <button
                key={q.id}
                onClick={() => setPrecision(q.id as Precision)}
                className={`p-2 rounded-lg text-left text-xs transition-all border ${
                  precision === q.id
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">{q.label}</div>
                <div className="text-[10px] text-slate-500">{q.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">Concurrent Batch Size</label>
            <span className="text-xs font-mono text-rose-400 font-bold">{batchSize}</span>
          </div>
          <input
            type="range"
            min="1"
            max="32"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>1 (Single)</span>
            <span>8 (Standard)</span>
            <span>32 (High)</span>
          </div>

          {isLLM && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Context Window</label>
                <span className="text-xs font-mono text-rose-400 font-bold">{seqLength} tokens</span>
              </div>
              <input
                type="range"
                min="512"
                max="16384"
                step="512"
                value={seqLength}
                onChange={(e) => setSeqLength(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* VRAM Breakdown Meter */}
        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
          <div className="font-semibold text-white">VRAM Composition</div>
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Weights Footprint:</span>
              <span className="text-white font-semibold">{weightsGb.toFixed(1)} GB</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>KV Cache Memory:</span>
              <span className="text-rose-300 font-semibold">{totalKvCacheGb.toFixed(1)} GB</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>CUDA &amp; PyTorch Kernels:</span>
              <span className="text-slate-400">{cudaOverheadGb} GB</span>
            </div>
            <div className="pt-1.5 border-t border-slate-800 flex justify-between font-bold text-slate-200">
              <span>Total Required:</span>
              <span className="text-rose-400">{totalVramRequiredGb} GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* GPU Hardware Compatibility Matrix */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
          <span>HARDWARE ACCELERATOR COMPATIBILITY &amp; OOM CHECKS</span>
          <span className="text-[10px] font-mono text-slate-500">CLOUD GPU POOL</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {gpus.map((gpu) => {
            const fits = gpu.vram >= totalVramRequiredGb;
            const utilPct = Math.min(100, Math.round((totalVramRequiredGb / gpu.vram) * 100));

            return (
              <div
                key={gpu.name}
                className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                  fits
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-rose-950/20 border-rose-800/60 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{gpu.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{gpu.vram} GB</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    ${gpu.pricePerHr.toFixed(2)}/hr
                  </div>

                  <div className="w-full h-1.5 bg-slate-800 rounded-full my-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${fits ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${utilPct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  {fits ? (
                    <div className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Fits ({utilPct}% VRAM)</span>
                    </div>
                  ) : (
                    <div className="text-[10px] font-mono text-rose-400 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>CUDA OOM (+{(totalVramRequiredGb - gpu.vram).toFixed(1)}GB)</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

