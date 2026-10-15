'use client';

import React, { useState, useMemo } from 'react';
import { Cpu, Sliders, RotateCcw, Activity } from 'lucide-react';

export const NeuralNetVisualizer: React.FC = () => {
  const [x1, setX1] = useState<number>(0.8);
  const [x2, setX2] = useState<number>(-0.5);
  const [actType, setActType] = useState<'relu' | 'sigmoid' | 'tanh'>('relu');
  const [weightScale, setWeightScale] = useState<number>(1.2);

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

  // Static weight matrices scaled by weightScale
  const forwardPass = useMemo(() => {
    // Hidden layer weights (2 inputs x 3 hidden neurons)
    const W1 = [
      [0.9 * weightScale, -1.2 * weightScale, 0.5 * weightScale],
      [-0.7 * weightScale, 0.8 * weightScale, -1.1 * weightScale],
    ];
    const b1 = [0.1, -0.2, 0.3];

    // Hidden pre-activations and activations
    const z1 = [
      x1 * W1[0][0] + x2 * W1[1][0] + b1[0],
      x1 * W1[0][1] + x2 * W1[1][1] + b1[1],
      x1 * W1[0][2] + x2 * W1[1][2] + b1[2],
    ];
    const h1 = z1.map((z) => activate(z, actType));

    // Output layer weights (3 hidden neurons x 1 output)
    const W2 = [1.1 * weightScale, -1.4 * weightScale, 0.9 * weightScale];
    const b2 = -0.1;

    const z2 = h1[0] * W2[0] + h1[1] * W2[1] + h1[2] * W2[2] + b2;
    const yHat = activate(z2, 'sigmoid'); // Final probability output

    return {
      W1,
      W2,
      z1,
      h1,
      z2,
      yHat: Number(yHat.toFixed(4)),
    };
  }, [x1, x2, actType, weightScale]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              Interactive Neural Network Forward Pass Visualizer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Observe signal propagation, weights, biases, and activation function effects across layers in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['relu', 'sigmoid', 'tanh'] as const).map((fn) => (
            <button
              key={fn}
              onClick={() => setActType(fn)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                actType === fn
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {fn.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium pb-2 border-b border-slate-200 dark:border-slate-700">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-500" /> Layer Controls
            </span>
            <button
              onClick={() => {
                setX1(0.8);
                setX2(-0.5);
                setWeightScale(1.2);
                setActType('relu');
              }}
              className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-500">Input x₁:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{x1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.05"
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-500">Input x₂:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{x2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.05"
                value={x2}
                onChange={(e) => setX2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-500">Weight Gain Scale:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{weightScale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={weightScale}
                onChange={(e) => setWeightScale(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Output ŷ = σ(z₂):</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {(forwardPass.yHat * 100).toFixed(1)}% ({forwardPass.yHat > 0.5 ? 'Class 1' : 'Class 0'})
              </span>
            </div>
          </div>
        </div>

        {/* SVG Network Graph */}
        <div className="lg:col-span-2 flex justify-center">
          <svg viewBox="0 0 420 220" className="w-full max-w-[420px] h-auto overflow-visible select-none">
            <defs>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {/* Input to Hidden Connections */}
            {[
              { from: [60, 65], to: [200, 45], w: forwardPass.W1[0][0] },
              { from: [60, 65], to: [200, 110], w: forwardPass.W1[0][1] },
              { from: [60, 65], to: [200, 175], w: forwardPass.W1[0][2] },
              { from: [60, 155], to: [200, 45], w: forwardPass.W1[1][0] },
              { from: [60, 155], to: [200, 110], w: forwardPass.W1[1][1] },
              { from: [60, 155], to: [200, 175], w: forwardPass.W1[1][2] },
            ].map((conn, idx) => (
              <line
                key={`in-h-${idx}`}
                x1={conn.from[0]}
                y1={conn.from[1]}
                x2={conn.to[0]}
                y2={conn.to[1]}
                stroke={conn.w >= 0 ? '#6366f1' : '#f43f5e'}
                strokeWidth={Math.min(4, Math.max(1, Math.abs(conn.w)))}
                strokeOpacity={0.65}
              />
            ))}

            {/* Hidden to Output Connections */}
            {[
              { from: [200, 45], to: [340, 110], w: forwardPass.W2[0] },
              { from: [200, 110], to: [340, 110], w: forwardPass.W2[1] },
              { from: [200, 175], to: [340, 110], w: forwardPass.W2[2] },
            ].map((conn, idx) => (
              <line
                key={`h-out-${idx}`}
                x1={conn.from[0]}
                y1={conn.from[1]}
                x2={conn.to[0]}
                y2={conn.to[1]}
                stroke={conn.w >= 0 ? '#6366f1' : '#f43f5e'}
                strokeWidth={Math.min(4, Math.max(1, Math.abs(conn.w)))}
                strokeOpacity={0.65}
              />
            ))}

            {/* Input Layer Nodes */}
            <g transform="translate(60, 65)">
              <circle r="18" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
              <text y="4" textAnchor="middle" fill="#f8fafc" fontSize="10" fontFamily="monospace">
                x₁
              </text>
              <text y="30" textAnchor="middle" fill="#64748b" fontSize="9">
                {x1.toFixed(1)}
              </text>
            </g>

            <g transform="translate(60, 155)">
              <circle r="18" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
              <text y="4" textAnchor="middle" fill="#f8fafc" fontSize="10" fontFamily="monospace">
                x₂
              </text>
              <text y="30" textAnchor="middle" fill="#64748b" fontSize="9">
                {x2.toFixed(1)}
              </text>
            </g>

            {/* Hidden Layer Nodes */}
            {forwardPass.h1.map((act, i) => {
              const yPos = 45 + i * 65;
              const intensity = Math.min(1, Math.max(0.15, actType === 'relu' ? act / 2 : act));
              return (
                <g key={`h-${i}`} transform={`translate(200, ${yPos})`}>
                  <circle
                    r="18"
                    fill="#0f172a"
                    stroke="#a855f7"
                    strokeWidth="2"
                    fillOpacity={0.9}
                  />
                  <circle
                    r="14"
                    fill="#a855f7"
                    fillOpacity={intensity}
                  />
                  <text y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    {act.toFixed(2)}
                  </text>
                  <text y="30" textAnchor="middle" fill="#94a3b8" fontSize="8">
                    h{i + 1}
                  </text>
                </g>
              );
            })}

            {/* Output Node */}
            <g transform="translate(340, 110)">
              <circle
                r="22"
                fill="#0f172a"
                stroke={forwardPass.yHat >= 0.5 ? '#10b981' : '#f59e0b'}
                strokeWidth="3"
              />
              <circle
                r="18"
                fill={forwardPass.yHat >= 0.5 ? '#10b981' : '#f59e0b'}
                fillOpacity={forwardPass.yHat}
              />
              <text y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                {forwardPass.yHat.toFixed(2)}
              </text>
              <text y="36" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">
                ŷ (Output)
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
