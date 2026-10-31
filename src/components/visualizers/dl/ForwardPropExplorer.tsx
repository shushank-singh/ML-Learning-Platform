'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, Activity, ArrowRight, Network, Eye } from 'lucide-react';

export const ForwardPropExplorer: React.FC = () => {
  const [x1, setX1] = useState<number>(0.8);
  const [x2, setX2] = useState<number>(-0.4);
  const [actType, setActType] = useState<'relu' | 'sigmoid' | 'tanh'>('relu');
  const [selectedNeuron, setSelectedNeuron] = useState<string>('h1');

  const activate = (val: number, type: 'relu' | 'sigmoid' | 'tanh'): number => {
    switch (type) {
      case 'relu':
        return Math.max(0, val);
      case 'sigmoid':
        return 1 / (1 + Math.exp(-Math.min(15, Math.max(-15, val))));
      case 'tanh':
        return Math.tanh(val);
    }
  };

  // Fixed structured weights for clarity
  const W1 = [
    [0.7, -0.9, 0.4],
    [-0.5, 0.6, -0.8],
  ];
  const b1 = [0.1, -0.2, 0.3];

  const W2 = [0.8, -1.2, 0.6];
  const b2 = -0.15;

  const calculations = useMemo(() => {
    // Hidden Layer 1
    const z_h1 = x1 * W1[0][0] + x2 * W1[1][0] + b1[0];
    const z_h2 = x1 * W1[0][1] + x2 * W1[1][1] + b1[1];
    const z_h3 = x1 * W1[0][2] + x2 * W1[1][2] + b1[2];

    const a_h1 = activate(z_h1, actType);
    const a_h2 = activate(z_h2, actType);
    const a_h3 = activate(z_h3, actType);

    // Output Layer
    const z_out = a_h1 * W2[0] + a_h2 * W2[1] + a_h3 * W2[2] + b2;
    const y_hat = 1 / (1 + Math.exp(-Math.min(15, Math.max(-15, z_out)))); // Sigmoid for output classification probability

    return {
      h1: { z: z_h1, a: a_h1, inputs: [x1, x2], weights: [W1[0][0], W1[1][0]], bias: b1[0] },
      h2: { z: z_h2, a: a_h2, inputs: [x1, x2], weights: [W1[0][1], W1[1][1]], bias: b1[1] },
      h3: { z: z_h3, a: a_h3, inputs: [x1, x2], weights: [W1[0][2], W1[1][2]], bias: b1[2] },
      out: { z: z_out, a: y_hat, inputs: [a_h1, a_h2, a_h3], weights: W2, bias: b2 },
    };
  }, [x1, x2, actType]);

  const activeDetails = calculations[selectedNeuron as keyof typeof calculations] || calculations.h1;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <Network className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Multi-Layer Forward Propagation Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Trace input vectors through hidden layers to output predictions. Click any neuron to inspect its exact arithmetic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['relu', 'sigmoid', 'tanh'] as const).map((fn) => (
            <button
              key={fn}
              onClick={() => setActType(fn)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                actType === fn
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Hidden: {fn.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Network Diagram */}
      <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-x-auto text-slate-100">
        <svg viewBox="0 0 740 280" className="w-full min-w-[620px] h-64 select-none">
          {/* Connection Lines from Inputs to Hidden */}
          {[
            { fromY: 90, toY: 60, w: W1[0][0] },
            { fromY: 90, toY: 140, w: W1[0][1] },
            { fromY: 90, toY: 220, w: W1[0][2] },
            { fromY: 190, toY: 60, w: W1[1][0] },
            { fromY: 190, toY: 140, w: W1[1][1] },
            { fromY: 190, toY: 220, w: W1[1][2] },
          ].map((l, i) => (
            <line
              key={i}
              x1="120"
              y1={l.fromY}
              x2="370"
              y2={l.toY}
              stroke={l.w >= 0 ? '#3b82f6' : '#ef4444'}
              strokeWidth={Math.min(5, Math.max(1.5, Math.abs(l.w) * 3))}
              opacity="0.75"
            />
          ))}

          {/* Connection Lines from Hidden to Output */}
          {[
            { fromY: 60, toY: 140, w: W2[0] },
            { fromY: 140, toY: 140, w: W2[1] },
            { fromY: 220, toY: 140, w: W2[2] },
          ].map((l, i) => (
            <line
              key={i}
              x1="370"
              y1={l.fromY}
              x2="620"
              y2={l.toY}
              stroke={l.w >= 0 ? '#10b981' : '#f59e0b'}
              strokeWidth={Math.min(5, Math.max(1.5, Math.abs(l.w) * 3))}
              opacity="0.85"
            />
          ))}

          {/* Layer Headers */}
          <text x="120" y="30" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">Input Layer x</text>
          <text x="370" y="30" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">Hidden Layer a⁽¹⁾ ({actType})</text>
          <text x="620" y="30" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">Output Layer ŷ (sigmoid)</text>

          {/* Input Nodes */}
          <g transform="translate(120, 90)">
            <circle r="26" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" />
            <text textAnchor="middle" dy="-3" fill="#93c5fd" fontSize="10" fontWeight="600">x₁</text>
            <text textAnchor="middle" dy="12" fill="#ffffff" fontSize="12" fontWeight="700">{x1.toFixed(1)}</text>
          </g>

          <g transform="translate(120, 190)">
            <circle r="26" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" />
            <text textAnchor="middle" dy="-3" fill="#93c5fd" fontSize="10" fontWeight="600">x₂</text>
            <text textAnchor="middle" dy="12" fill="#ffffff" fontSize="12" fontWeight="700">{x2.toFixed(1)}</text>
          </g>

          {/* Hidden Nodes */}
          {[
            { id: 'h1', y: 60, name: 'h₁', data: calculations.h1 },
            { id: 'h2', y: 140, name: 'h₂', data: calculations.h2 },
            { id: 'h3', y: 220, name: 'h₃', data: calculations.h3 },
          ].map((node) => (
            <g
              key={node.id}
              transform={`translate(370, ${node.y})`}
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedNeuron(node.id)}
            >
              <circle
                r="30"
                fill={selectedNeuron === node.id ? '#312e81' : '#1e1b4b'}
                stroke={selectedNeuron === node.id ? '#a5b4fc' : '#6366f1'}
                strokeWidth={selectedNeuron === node.id ? 3.5 : 2}
              />
              <text textAnchor="middle" dy="-6" fill="#c7d2fe" fontSize="10" fontWeight="600">{node.name}</text>
              <text textAnchor="middle" dy="12" fill="#ffffff" fontSize="13" fontWeight="700">{node.data.a.toFixed(2)}</text>
            </g>
          ))}

          {/* Output Node */}
          <g
            transform="translate(620, 140)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedNeuron('out')}
          >
            <circle
              r="34"
              fill={selectedNeuron === 'out' ? '#064e3b' : '#022c22'}
              stroke={selectedNeuron === 'out' ? '#6ee7b7' : '#10b981'}
              strokeWidth={selectedNeuron === 'out' ? 3.5 : 2}
            />
            <text textAnchor="middle" dy="-7" fill="#6ee7b7" fontSize="11" fontWeight="700">ŷ prob</text>
            <text textAnchor="middle" dy="14" fill="#ffffff" fontSize="15" fontWeight="800">
              {calculations.out.a.toFixed(3)}
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Neuron Inspector */}
      <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-500" />
            Selected Neuron: <span className="font-mono uppercase">{selectedNeuron === 'out' ? 'Output (ŷ)' : selectedNeuron}</span>
          </span>
          <span className="text-[11px] text-slate-500">
            Activation: <strong className="text-slate-800 dark:text-slate-200">{selectedNeuron === 'out' ? 'Sigmoid' : actType.toUpperCase()}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-mono">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Linear Sum (z):</span>
            <p className="text-slate-800 dark:text-slate-200 font-bold mt-0.5">
              z = ∑(wᵢ · inᵢ) + b = {activeDetails.z.toFixed(4)}
            </p>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Activated Output (a):</span>
            <p className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm mt-0.5">
              a = f(z) = {activeDetails.a.toFixed(4)}
            </p>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
        <div>
          <div className="flex justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300">Feature x₁:</span>
            <span className="font-mono font-bold text-indigo-600">{x1.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.05"
            value={x1}
            onChange={(e) => setX1(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300">Feature x₂:</span>
            <span className="font-mono font-bold text-indigo-600">{x2.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.05"
            value={x2}
            onChange={(e) => setX2(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

