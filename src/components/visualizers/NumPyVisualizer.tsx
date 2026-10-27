'use client';

import React, { useState } from 'react';
import {
  Layers,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Maximize2,
  Table,
  Cpu,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export const NumPyVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reshaping' | 'slicing' | 'broadcasting' | 'axes'>('broadcasting');

  // Reshaping state
  const [reshapeOption, setReshapeOption] = useState<'3x4' | '4x3' | '2x6' | '6x2'>('3x4');

  // Slicing state
  const [rowStart, setRowStart] = useState<number>(0);
  const [rowEnd, setRowEnd] = useState<number>(2);
  const [colStart, setColStart] = useState<number>(1);
  const [colEnd, setColEnd] = useState<number>(3);

  // Broadcasting state
  const [broadcastStep, setBroadcastStep] = useState<number>(0);

  // Axis state
  const [selectedAxis, setSelectedAxis] = useState<0 | 1>(0);

  // Base 12-element 1D array
  const rawData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  // Reshaped grid getter
  const getReshapedGrid = () => {
    switch (reshapeOption) {
      case '3x4':
        return [
          [10, 20, 30, 40],
          [50, 60, 70, 80],
          [90, 100, 110, 120],
        ];
      case '4x3':
        return [
          [10, 20, 30],
          [40, 50, 60],
          [70, 80, 90],
          [100, 110, 120],
        ];
      case '2x6':
        return [
          [10, 20, 30, 40, 50, 60],
          [70, 80, 90, 100, 110, 120],
        ];
      case '6x2':
        return [
          [10, 20],
          [30, 40],
          [50, 60],
          [70, 80],
          [90, 100],
          [110, 120],
        ];
    }
  };

  // Base 3x3 matrix for broadcasting & axes
  const matrixA = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const vectorB = [10, 20, 30];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
      {/* Top Header */}
      <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-600/15 border border-cyan-500/30 text-cyan-500 flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>NumPy Interactive Array Laboratory</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                Live Memory Explorer
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manipulate multidimensional array shapes, test broadcasting mechanics, and visualize axis operations.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('broadcasting')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'broadcasting'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Broadcasting Rules
          </button>
          <button
            onClick={() => setActiveTab('axes')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'axes'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Axis 0 vs Axis 1
          </button>
          <button
            onClick={() => setActiveTab('slicing')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'slicing'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            2D Index &amp; Slice
          </button>
          <button
            onClick={() => setActiveTab('reshaping')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'reshaping'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Live Reshape
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* ========================================================================= */}
        {/* 1. BROADCASTING VIEW */}
        {/* ========================================================================= */}
        {activeTab === 'broadcasting' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-cyan-400 font-bold">Operation: A (3, 3) + B (1, 3)</span>
                <p className="text-slate-400">
                  NumPy stretches vector B vertically along axis 0 across all 3 rows without copying memory.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBroadcastStep((prev) => (prev + 1) % 4)}
                  className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Next Step ({broadcastStep + 1}/4)</span>
                </button>
                <button
                  onClick={() => setBroadcastStep(0)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Equation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 text-center">
              {/* Matrix A (3, 3) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 font-semibold">Matrix A (3, 3)</div>
                <div className="grid grid-cols-3 gap-1.5 max-w-[160px] mx-auto">
                  {matrixA.map((row, rIdx) =>
                    row.map((val, cIdx) => (
                      <div
                        key={`a-${rIdx}-${cIdx}`}
                        className={`h-9 rounded-lg font-mono text-xs font-bold flex items-center justify-center border transition-all ${
                          broadcastStep > 0 && broadcastStep - 1 === rIdx
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 scale-105'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Operator + */}
              <div className="font-extrabold text-2xl text-cyan-400 flex items-center justify-center">
                +
              </div>

              {/* Vector B (stretching) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 font-semibold">
                  Vector B {broadcastStep === 0 ? '(1, 3)' : '→ Broadcast (3, 3)'}
                </div>
                <div className="grid grid-cols-3 gap-1.5 max-w-[160px] mx-auto">
                  {[0, 1, 2].map((rIdx) =>
                    vectorB.map((val, cIdx) => {
                      const isStretched = broadcastStep > 0 && rIdx > 0;
                      const isActiveRow = broadcastStep > 0 && broadcastStep - 1 === rIdx;
                      return (
                        <div
                          key={`b-${rIdx}-${cIdx}`}
                          className={`h-9 rounded-lg font-mono text-xs font-bold flex items-center justify-center border transition-all ${
                            rIdx === 0
                              ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                              : isStretched
                              ? isActiveRow
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 scale-105'
                                : 'bg-indigo-950/30 border-dashed border-indigo-500/40 text-indigo-400/80'
                              : 'opacity-10 border-transparent'
                          }`}
                        >
                          {val}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Operator = */}
              <div className="font-extrabold text-2xl text-cyan-400 flex items-center justify-center">
                =
              </div>

              {/* Result Grid */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 font-semibold">Result (3, 3)</div>
                <div className="grid grid-cols-3 gap-1.5 max-w-[160px] mx-auto">
                  {matrixA.map((row, rIdx) =>
                    row.map((val, cIdx) => {
                      const sum = val + vectorB[cIdx];
                      const isComputed = broadcastStep > 0 && rIdx < broadcastStep;
                      return (
                        <div
                          key={`res-${rIdx}-${cIdx}`}
                          className={`h-9 rounded-lg font-mono text-xs font-bold flex items-center justify-center border transition-all ${
                            isComputed
                              ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-sm'
                              : 'bg-slate-900/40 border-slate-800 text-slate-600'
                          }`}
                        >
                          {isComputed ? sum : '?'}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Explanation footer */}
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/30 text-xs text-cyan-200/90 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-300">Broadcasting Principle: </span>
                When operating on two arrays, NumPy compares shapes element-wise starting from trailing dimensions. Two dimensions are compatible when: (1) they are equal, or (2) one of them is 1. Dimension 1 is dynamically stretched across memory strides without allocating extra RAM!
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. AXIS 0 VS AXIS 1 */}
        {/* ========================================================================= */}
        {activeTab === 'axes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-cyan-400 font-bold">
                  {selectedAxis === 0 ? 'np.sum(matrix, axis=0)' : 'np.sum(matrix, axis=1)'}
                </span>
                <p className="text-slate-400">
                  {selectedAxis === 0
                    ? 'Axis 0 collapses rows downward into column sums (vertical collapse).'
                    : 'Axis 1 collapses columns rightward into row sums (horizontal collapse).'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedAxis(0)}
                  className={`px-3.5 py-2 rounded-lg font-semibold transition-all ${
                    selectedAxis === 0 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Axis 0 (Collapse Rows ↓)
                </button>
                <button
                  onClick={() => setSelectedAxis(1)}
                  className={`px-3.5 py-2 rounded-lg font-semibold transition-all ${
                    selectedAxis === 1 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Axis 1 (Collapse Columns →)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Matrix Visual with highlighted collapse direction */}
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">3x3 Matrix Input</span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {selectedAxis === 0 ? 'Direction: Downwards ↓' : 'Direction: Rightwards →'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                  {matrixA.map((row, rIdx) =>
                    row.map((val, cIdx) => (
                      <div
                        key={`ax-${rIdx}-${cIdx}`}
                        className={`h-12 rounded-lg font-mono text-sm font-bold flex items-center justify-center border transition-all ${
                          selectedAxis === 0
                            ? cIdx === 0
                              ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300'
                              : cIdx === 1
                              ? 'bg-indigo-950/70 border-indigo-500 text-indigo-300'
                              : 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                            : rIdx === 0
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300'
                            : rIdx === 1
                            ? 'bg-indigo-950/70 border-indigo-500 text-indigo-300'
                            : 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                        }`}
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Output Vector */}
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">Calculated Output</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    Shape: {selectedAxis === 0 ? '(3,)' : '(3,)'}
                  </span>
                </div>

                {selectedAxis === 0 ? (
                  // Column sums (horizontal layout)
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                      <div className="h-12 rounded-lg bg-cyan-600 text-white font-mono text-sm font-bold flex items-center justify-center">
                        {1 + 4 + 7}
                      </div>
                      <div className="h-12 rounded-lg bg-indigo-600 text-white font-mono text-sm font-bold flex items-center justify-center">
                        {2 + 5 + 8}
                      </div>
                      <div className="h-12 rounded-lg bg-emerald-600 text-white font-mono text-sm font-bold flex items-center justify-center">
                        {3 + 6 + 9}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center text-slate-400 max-w-[200px] mx-auto">
                      <span>Col 0 Sum</span>
                      <span>Col 1 Sum</span>
                      <span>Col 2 Sum</span>
                    </div>
                  </div>
                ) : (
                  // Row sums (vertical layout)
                  <div className="space-y-2 max-w-[200px] mx-auto">
                    <div className="h-10 rounded-lg bg-cyan-600 text-white font-mono text-sm font-bold flex items-center justify-between px-4">
                      <span className="text-[10px] text-cyan-200">Row 0 (1+2+3)</span>
                      <span>{1 + 2 + 3}</span>
                    </div>
                    <div className="h-10 rounded-lg bg-indigo-600 text-white font-mono text-sm font-bold flex items-center justify-between px-4">
                      <span className="text-[10px] text-indigo-200">Row 1 (4+5+6)</span>
                      <span>{4 + 5 + 6}</span>
                    </div>
                    <div className="h-10 rounded-lg bg-emerald-600 text-white font-mono text-sm font-bold flex items-center justify-between px-4">
                      <span className="text-[10px] text-emerald-200">Row 2 (7+8+9)</span>
                      <span>{7 + 8 + 9}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. 2D INDEXING & SLICING */}
        {/* ========================================================================= */}
        {activeTab === 'slicing' && (
          <div className="space-y-6">
            {/* Slicing Controls */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-cyan-400 font-bold text-xs">
                  Syntax: arr[{rowStart}:{rowEnd}, {colStart}:{colEnd}]
                </span>
                <span className="text-xs text-slate-400">
                  Rows: [{rowStart} to {rowEnd - 1}], Cols: [{colStart} to {colEnd - 1}]
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Row Start: {rowStart}</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    value={rowStart}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setRowStart(v);
                      if (v >= rowEnd) setRowEnd(v + 1);
                    }}
                    className="w-full accent-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Row End: {rowEnd}</label>
                  <input
                    type="range"
                    min={rowStart + 1}
                    max="3"
                    value={rowEnd}
                    onChange={(e) => setRowEnd(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Col Start: {colStart}</label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={colStart}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setColStart(v);
                      if (v >= colEnd) setColEnd(v + 1);
                    }}
                    className="w-full accent-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Col End: {colEnd}</label>
                  <input
                    type="range"
                    min={colStart + 1}
                    max="4"
                    value={colEnd}
                    onChange={(e) => setColEnd(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Grid Visualization */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-slate-400">
                Full 3x4 Matrix (Highlighted cells match slice bounds):
              </div>
              <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
                {[
                  [10, 20, 30, 40],
                  [50, 60, 70, 80],
                  [90, 100, 110, 120],
                ].map((row, rIdx) =>
                  row.map((val, cIdx) => {
                    const isSelected =
                      rIdx >= rowStart && rIdx < rowEnd && cIdx >= colStart && cIdx < colEnd;
                    return (
                      <div
                        key={`sl-${rIdx}-${cIdx}`}
                        className={`h-11 rounded-lg font-mono text-xs font-bold flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-md scale-105 ring-1 ring-cyan-400'
                            : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                        }`}
                      >
                        {val}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. LIVE RESHAPING */}
        {/* ========================================================================= */}
        {activeTab === 'reshaping' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-cyan-400 font-bold">12 Total Elements</span>
                <p className="text-slate-400">
                  Reshaping alters shape metadata and memory strides without reallocating underlying C memory.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {(['3x4', '4x3', '2x6', '6x2'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setReshapeOption(opt)}
                    className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition-all ${
                      reshapeOption === opt
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Reshaped Grid */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[180px]">
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${getReshapedGrid()[0].length}, minmax(0, 1fr))`,
                }}
              >
                {getReshapedGrid().map((row, rIdx) =>
                  row.map((val, cIdx) => (
                    <div
                      key={`res-${rIdx}-${cIdx}`}
                      className="w-14 h-11 rounded-lg bg-cyan-950/60 border border-cyan-500/50 text-cyan-200 font-mono text-xs font-bold flex items-center justify-center shadow-sm"
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

