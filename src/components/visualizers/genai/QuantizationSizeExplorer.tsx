'use client';

import React, { useState, useMemo } from 'react';
import { Cpu, HardDrive, Gauge, AlertCircle, CheckCircle, Zap } from 'lucide-react';

interface ModelTier {
  label: string;
  paramsBillions: number;
  layers: number;
  hiddenDim: number;
}

const MODEL_TIERS: ModelTier[] = [
  { label: '3B (Small Edge)', paramsBillions: 3.2, layers: 24, hiddenDim: 3072 },
  { label: '7B / 8B (Llama 3 / Mistral)', paramsBillions: 8.0, layers: 32, hiddenDim: 4096 },
  { label: '14B (Qwen 2.5)', paramsBillions: 14.7, layers: 48, hiddenDim: 5120 },
  { label: '70B (Llama 3 70B)', paramsBillions: 70.0, layers: 80, hiddenDim: 8192 },
];

interface PrecisionOption {
  format: string;
  bytesPerParam: number;
  description: string;
  perplexityDelta: string;
}

const PRECISIONS: PrecisionOption[] = [
  { format: 'FP32 (Single Precision)', bytesPerParam: 4.0, description: 'Full standard float. Overkill for inference.', perplexityDelta: '+0.00 (Baseline)' },
  { format: 'FP16 / BF16 (Half Precision)', bytesPerParam: 2.0, description: 'Standard pretraining & serving precision.', perplexityDelta: '+0.01 (Near-zero loss)' },
  { format: 'INT8 (8-bit Quantization)', bytesPerParam: 1.0, description: 'LLM.int8() / SmoothQuant. 50% memory saving.', perplexityDelta: '+0.05 (Negligible)' },
  { format: 'INT4 / AWQ / GGUF Q4_K_M', bytesPerParam: 0.5, description: '4-bit integer weights. 75% memory saving!', perplexityDelta: '+0.15 (Excellent trade-off)' },
];

export const QuantizationSizeExplorer: React.FC = () => {
  const [modelIdx, setModelIdx] = useState<number>(1); // 8B
  const [precisionIdx, setPrecisionIdx] = useState<number>(3); // 4-bit
  const [batchSize, setBatchSize] = useState<number>(1);
  const [seqLength, setSeqLength] = useState<number>(4096);

  const model = MODEL_TIERS[modelIdx];
  const precision = PRECISIONS[precisionIdx];

  const stats = useMemo(() => {
    // 1. Model Weights Memory: Params * bytesPerParam
    const weightsBytes = model.paramsBillions * 1e9 * precision.bytesPerParam;
    const weightsGB = weightsBytes / (1024 ** 3);

    // 2. KV Cache Memory (stored in FP16 = 2 bytes): 2 * layers * hiddenDim * seqLength * batchSize * 2 bytes
    const kvCacheBytes = 2 * model.layers * model.hiddenDim * seqLength * batchSize * 2;
    const kvCacheGB = kvCacheBytes / (1024 ** 3);

    // 3. Activation & CUDA context overhead buffer: ~1.5 GB fixed + 10%
    const overheadGB = 1.2 + weightsGB * 0.08;

    const totalVRAM_GB = weightsGB + kvCacheGB + overheadGB;

    // Hardware recommendation
    let hardwareRec = '';
    let badgeColor = '';
    if (totalVRAM_GB <= 6.0) {
      hardwareRec = 'Fits on Budget GPU (RTX 3060 6GB / 8GB) or Apple M1/M2 Mac';
      badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
    } else if (totalVRAM_GB <= 12.0) {
      hardwareRec = 'Fits on 12GB GPU (RTX 3060 12GB / RTX 4070) or 16GB Unified Mac';
      badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
    } else if (totalVRAM_GB <= 24.0) {
      hardwareRec = 'Fits on Single Enthusiast GPU (RTX 3090 / 4090 24GB)';
      badgeColor = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300';
    } else if (totalVRAM_GB <= 80.0) {
      hardwareRec = 'Requires Datacenter GPU (Single A100/H100 80GB or 2x RTX 4090s)';
      badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300';
    } else {
      hardwareRec = 'Requires Multi-GPU Cluster (2x or 4x A100/H100 80GB)';
      badgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';
    }

    return {
      weightsGB: weightsGB.toFixed(1),
      kvCacheGB: kvCacheGB.toFixed(2),
      overheadGB: overheadGB.toFixed(1),
      totalVRAM_GB: totalVRAM_GB.toFixed(1),
      hardwareRec,
      badgeColor,
    };
  }, [model, precision, batchSize, seqLength]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5" />
            Inference Optimization & VRAM Calculator
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Quantization Bit-Width & GPU Memory Sizing
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Calculate exact memory requirements for model weights, KV caches, and runtime activations across FP16, INT8, and 4-bit AWQ.
          </p>
        </div>
      </div>

      {/* Model Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Model Architecture & Parameter Tier:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MODEL_TIERS.map((tier, idx) => (
            <button
              key={tier.label}
              onClick={() => setModelIdx(idx)}
              className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                modelIdx === idx
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div>{tier.label}</div>
              <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                {tier.layers} layers &bull; {tier.hiddenDim} dim
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Precision Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Quantization Precision:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRECISIONS.map((prec, idx) => (
            <button
              key={prec.format}
              onClick={() => setPrecisionIdx(idx)}
              className={`p-3 rounded-xl text-left border text-xs transition-all ${
                precisionIdx === idx
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{prec.format}</span>
                <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">{prec.bytesPerParam} B / param</span>
              </div>
              <p className="text-[11px] font-normal text-slate-500 mt-1">{prec.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders: Batch & Context */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Concurrent Batch Size:</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">{batchSize}</span>
          </div>
          <input
            type="range"
            min="1"
            max="32"
            step="1"
            value={batchSize}
            onChange={(e) => setBatchSize(parseInt(e.target.value, 10))}
            className="w-full accent-blue-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Sequence Context Length:</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">{seqLength.toLocaleString()} tokens</span>
          </div>
          <input
            type="range"
            min="1024"
            max="32768"
            step="1024"
            value={seqLength}
            onChange={(e) => setSeqLength(parseInt(e.target.value, 10))}
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      {/* Memory Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Model Weights</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            {stats.weightsGB} GB
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{precision.bytesPerParam} B/param</div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">KV Cache Buffer</div>
          <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
            {stats.kvCacheGB} GB
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">batch={batchSize}, seq={seqLength}</div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">CUDA Context Buffer</div>
          <div className="text-xl font-bold font-mono text-slate-600 dark:text-slate-400 mt-1">
            {stats.overheadGB} GB
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">Runtime overhead</div>
        </div>

        <div className="p-3.5 rounded-xl border-2 border-indigo-500/40 bg-indigo-50/50 dark:bg-indigo-950/30">
          <div className="text-[11px] text-indigo-700 dark:text-indigo-400 uppercase font-semibold">Total Required VRAM</div>
          <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            {stats.totalVRAM_GB} GB
          </div>
          <div className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5">Minimum GPU footprint</div>
        </div>
      </div>

      {/* Hardware Badge */}
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-semibold ${stats.badgeColor}`}>
        <Cpu className="w-5 h-5 shrink-0" />
        <span>Hardware Deployment Verdict: {stats.hardwareRec}</span>
      </div>
    </div>
  );
};

