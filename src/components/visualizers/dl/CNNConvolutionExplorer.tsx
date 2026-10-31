'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, Activity, Grid, ArrowRight, Eye, Info } from 'lucide-react';

export const CNNConvolutionExplorer: React.FC = () => {
  const [kernelType, setKernelType] = useState<'vertical_edge' | 'horizontal_edge' | 'sharpen' | 'ridge'>('vertical_edge');
  const [selectedOutputCell, setSelectedOutputCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });

  // 5x5 Input Feature Map (simulating an image patch with a vertical edge)
  const inputGrid = [
    [0, 0, 10, 10, 10],
    [0, 0, 10, 10, 10],
    [0, 0, 10, 10, 10],
    [0, 0, 10, 10, 10],
    [0, 0, 10, 10, 10],
  ];

  // 3x3 Kernels
  const kernels = {
    vertical_edge: [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
    horizontal_edge: [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ],
    sharpen: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
    ridge: [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ],
  };

  const activeKernel = kernels[kernelType];

  // Convolve: 5x5 with 3x3 kernel (valid padding, stride=1) -> 3x3 output feature map
  const outputGrid = useMemo(() => {
    const out: number[][] = [];
    for (let r = 0; r < 3; r++) {
      const row: number[] = [];
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let kr = 0; kr < 3; kr++) {
          for (let kc = 0; kc < 3; kc++) {
            sum += inputGrid[r + kr][c + kc] * activeKernel[kr][kc];
          }
        }
        row.push(sum);
      }
      out.push(row);
    }
    return out;
  }, [activeKernel]);

  // Calculate detailed element-wise math for the selected cell
  const calculationDetails = useMemo(() => {
    const r = selectedOutputCell.r;
    const c = selectedOutputCell.c;
    const products: { inVal: number; kVal: number; prod: number }[] = [];
    let total = 0;

    for (let kr = 0; kr < 3; kr++) {
      for (let kc = 0; kc < 3; kc++) {
        const inVal = inputGrid[r + kr][c + kc];
        const kVal = activeKernel[kr][kc];
        const prod = inVal * kVal;
        products.push({ inVal, kVal, prod });
        total += prod;
      }
    }

    return { products, total };
  }, [selectedOutputCell, activeKernel]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <Grid className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              CNN Convolution &amp; Receptive Field Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Click any cell in the Output Feature Map to highlight the 3×3 Receptive Field in the Input Tensor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['vertical_edge', 'horizontal_edge', 'sharpen', 'ridge'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKernelType(k)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                kernelType === k
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {k.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grids Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 5x5 Input Image */}
        <div className="md:col-span-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">Input Image (5×5)</span>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">Active Receptive Field (3×3)</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800 max-w-[280px] mx-auto">
            {inputGrid.map((row, r) =>
              row.map((val, c) => {
                const inField =
                  r >= selectedOutputCell.r &&
                  r < selectedOutputCell.r + 3 &&
                  c >= selectedOutputCell.c &&
                  c < selectedOutputCell.c + 3;

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`h-11 rounded-lg flex flex-col items-center justify-center font-mono text-xs transition-all ${
                      inField
                        ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400 shadow-md scale-105 z-10'
                        : val > 0
                        ? 'bg-slate-800 text-slate-200'
                        : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    <span>{val}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 3x3 Kernel */}
        <div className="md:col-span-3 space-y-2 text-center">
          <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">Kernel Filter (3×3)</span>
          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800 max-w-[170px] mx-auto">
            {activeKernel.map((row, r) =>
              row.map((val, c) => (
                <div
                  key={`${r}-${c}`}
                  className="h-10 rounded-lg bg-indigo-950/80 border border-indigo-800/80 text-indigo-200 font-mono text-xs flex items-center justify-center font-bold"
                >
                  {val > 0 ? `+${val}` : val}
                </div>
              ))
            )}
          </div>
          <span className="text-[10px] text-slate-500 block">Slides across receptive fields</span>
        </div>

        {/* 3x3 Output Feature Map */}
        <div className="md:col-span-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">Feature Map (3×3)</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Click to inspect</span>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 max-w-[210px] mx-auto">
            {outputGrid.map((row, r) =>
              row.map((val, c) => {
                const isSelected = selectedOutputCell.r === r && selectedOutputCell.c === c;
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => setSelectedOutputCell({ r, c })}
                    className={`h-14 rounded-xl flex flex-col items-center justify-center font-mono text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-extrabold ring-2 ring-emerald-300 scale-105 shadow-lg'
                        : val > 15
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                        : val < -15
                        ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-sm font-bold">{val}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Arithmetic Breakdown */}
      <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-500" />
            Selected Feature Cell: <code className="font-mono">Output[{selectedOutputCell.r}, {selectedOutputCell.c}]</code>
          </span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
            Total Activation = {calculationDetails.total}
          </span>
        </div>

        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
          ∑(Xᵢ · Kᵢ) = {calculationDetails.products.slice(0, 5).map((p) => `(${p.inVal}×${p.kVal})`).join(' + ')} + ... = <strong className="text-slate-900 dark:text-white">{calculationDetails.total}</strong>
        </p>
      </div>
    </div>
  );
};

