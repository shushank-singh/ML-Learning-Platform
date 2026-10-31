'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, Cpu, HardDrive, Zap, Info, Layers } from 'lucide-react';

export const LoRARankExplorer: React.FC = () => {
  const [hiddenDim, setHiddenDim] = useState<number>(4096);
  const [rank, setRank] = useState<number>(8);
  const [alpha, setAlpha] = useState<number>(16);
  const [numLayers, setNumLayers] = useState<number>(32);
  const [targetModules, setTargetModules] = useState<'qv' | 'all-linear'>('qv');

  // Math calculations
  const stats = useMemo(() => {
    const d = hiddenDim;
    const k = hiddenDim;
    // Base parameters per layer
    // qv: W_q and W_v (2 matrices)
    // all-linear: W_q, W_k, W_v, W_o, gate, up, down (7 matrices)
    const matricesPerLayer = targetModules === 'qv' ? 2 : 7;
    const totalMatrices = matricesPerLayer * numLayers;

    const baseParamsPerMatrix = d * k;
    const totalBaseParams = totalMatrices * baseParamsPerMatrix;

    const loraParamsPerMatrix = rank * (d + k);
    const totalLoraParams = totalMatrices * loraParamsPerMatrix;

    const trainablePct = ((totalLoraParams / totalBaseParams) * 100).toFixed(3);
    const savingsPct = (100 - parseFloat(trainablePct)).toFixed(3);

    // VRAM estimates for 16-bit base model
    // Base weights: totalBaseParams * 2 bytes
    const baseWeightsGB = (totalBaseParams * 2) / (1024 ** 3);

    // Full FT: Base + Gradients (2B) + AdamW states (8B: 4B m + 4B v) = 16 bytes/param for trainable
    const fullFTOptimizerGB = (totalBaseParams * 16) / (1024 ** 3);
    const loraOptimizerGB = (totalLoraParams * 16) / (1024 ** 3);

    const fullTotalVRAM = baseWeightsGB + fullFTOptimizerGB;
    const loraTotalVRAM = baseWeightsGB + loraOptimizerGB;

    const scalingFactor = (alpha / rank).toFixed(2);

    return {
      totalMatrices,
      totalBaseParams,
      totalLoraParams,
      trainablePct,
      savingsPct,
      baseWeightsGB: baseWeightsGB.toFixed(2),
      fullFTOptimizerGB: fullFTOptimizerGB.toFixed(2),
      loraOptimizerGB: (loraOptimizerGB * 1024).toFixed(1), // MB
      fullTotalVRAM: fullTotalVRAM.toFixed(1),
      loraTotalVRAM: loraTotalVRAM.toFixed(1),
      scalingFactor,
    };
  }, [hiddenDim, rank, alpha, numLayers, targetModules]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            PEFT Architecture Explorer
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            LoRA (Low-Rank Adaptation) Rank & Memory Dynamics
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deconstruct W = W_0 + (alpha / r) * (B &times; A) and calculate parameter reduction and VRAM savings during fine-tuning.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTargetModules('qv')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              targetModules === 'qv'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Target Q & V Only
          </button>
          <button
            onClick={() => setTargetModules('all-linear')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              targetModules === 'all-linear'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            All Linear (Q, K, V, O, MLP)
          </button>
        </div>
      </div>

      {/* Visual Matrix Decomposition Diagram */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {'Matrix Decomposition Geometry: h = W_0 x + (alpha / r) * B * A x'}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center font-mono text-xs">
          {/* Base Matrix W0 */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-lg bg-slate-200 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-500 flex flex-col items-center justify-center text-slate-700 dark:text-slate-300 font-bold p-1">
              <span>$W_0$ (Frozen)</span>
              <span className="text-[10px] text-slate-500 mt-1">{hiddenDim} &times; {hiddenDim}</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">{(hiddenDim * hiddenDim / 1e6).toFixed(1)}M params</span>
          </div>

          <span className="text-lg font-bold text-slate-400">+</span>

          {/* Scaling factor */}
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            (alpha / r) = {stats.scalingFactor} &times;
          </span>

          {/* Matrix B */}
          <div className="flex flex-col items-center">
            <div
              style={{ width: `${Math.max(16, rank * 1.5)}px` }}
              className="h-24 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 border-2 border-emerald-500 flex flex-col items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold transition-all"
            >
              <span className="rotate-90 sm:rotate-0 text-[10px]">$B$</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1">{hiddenDim}&times;{rank}</span>
          </div>

          <span className="text-xs font-bold text-slate-400">&times;</span>

          {/* Matrix A */}
          <div className="flex flex-col items-center">
            <div
              style={{ height: `${Math.max(16, rank * 1.5)}px` }}
              className="w-24 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 border-2 border-emerald-500 flex flex-col items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold transition-all"
            >
              <span className="text-[10px]">$A$</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1">{rank}&times;{hiddenDim}</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Adapter Rank ($r$):</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">{rank}</span>
          </div>
          <input
            type="range"
            min="1"
            max="64"
            step="1"
            value={rank}
            onChange={(e) => setRank(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>r=1</span>
            <span>r=8 (Standard)</span>
            <span>r=64</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">LoRA Alpha ($\alpha$):</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">{alpha}</span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            step="4"
            value={alpha}
            onChange={(e) => setAlpha(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>&alpha;=4</span>
            <span>&alpha;=16</span>
            <span>&alpha;=64</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Model Layers:</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">{numLayers}</span>
          </div>
          <input
            type="range"
            min="12"
            max="80"
            step="4"
            value={numLayers}
            onChange={(e) => setNumLayers(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>12 (Small)</span>
            <span>32 (7B-8B)</span>
            <span>80 (70B)</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Trainable Parameters</div>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {(stats.totalLoraParams / 1e6).toFixed(2)}M{' '}
            <span className="text-xs font-normal text-slate-500">({stats.trainablePct}%)</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            <strong>{stats.savingsPct}%</strong> parameters frozen
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Adapter Optimizer Memory</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            {stats.loraOptimizerGB} MB
          </div>
          <div className="text-[11px] text-rose-500 line-through mt-1">
            Full FT: {stats.fullFTOptimizerGB} GB
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Training VRAM</div>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            ~{stats.loraTotalVRAM} GB
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Fits on consumer 16GB / 24GB GPU!
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
        <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <p>
          <strong>Zero Inference Latency Overhead:</strong> After training completes, the adapter weights can be permanently folded into the base model via matrix addition: {'W_deploy = W_0 + (alpha / r) * (B * A)'}. At inference time, there are zero extra operations!
        </p>
      </div>
    </div>
  );
};
