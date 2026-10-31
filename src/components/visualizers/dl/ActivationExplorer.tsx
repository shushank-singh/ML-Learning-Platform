'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, Activity, LineChart, Info, Check } from 'lucide-react';

export const ActivationExplorer: React.FC = () => {
  const [selectedFunc, setSelectedFunc] = useState<'sigmoid' | 'tanh' | 'relu' | 'leaky_relu' | 'gelu'>('sigmoid');
  const [currentX, setCurrentX] = useState<number>(1.5);
  const [showDerivative, setShowDerivative] = useState<boolean>(true);

  // Math functions and their analytical derivatives
  const evaluateFunc = (x: number, fn: typeof selectedFunc): { val: number; deriv: number } => {
    switch (fn) {
      case 'sigmoid': {
        const s = 1 / (1 + Math.exp(-Math.min(15, Math.max(-15, x))));
        return { val: s, deriv: s * (1 - s) };
      }
      case 'tanh': {
        const t = Math.tanh(x);
        return { val: t, deriv: 1 - t * t };
      }
      case 'relu': {
        return { val: Math.max(0, x), deriv: x > 0 ? 1 : 0 };
      }
      case 'leaky_relu': {
        return { val: x >= 0 ? x : 0.1 * x, deriv: x >= 0 ? 1 : 0.1 };
      }
      case 'gelu': {
        // Approximation: 0.5 * x * (1 + tanh(sqrt(2/pi) * (x + 0.044715 * x^3)))
        const k = Math.sqrt(2 / Math.PI);
        const inner = k * (x + 0.044715 * Math.pow(x, 3));
        const tanhInner = Math.tanh(inner);
        const val = 0.5 * x * (1 + tanhInner);
        // derivative approx
        const sech2 = 1 - tanhInner * tanhInner;
        const dInner = k * (1 + 3 * 0.044715 * x * x);
        const deriv = 0.5 * (1 + tanhInner) + 0.5 * x * sech2 * dInner;
        return { val, deriv };
      }
    }
  };

  const currentEvaluation = useMemo(() => evaluateFunc(currentX, selectedFunc), [currentX, selectedFunc]);

  // Generate SVG path points from x = -5 to +5
  const { pathF, pathDeriv } = useMemo(() => {
    const pointsF: string[] = [];
    const pointsD: string[] = [];
    const steps = 100;
    const xMin = -5;
    const xMax = 5;

    // SVG coordinates: Width 600, Height 260.
    // Center is (300, 130). Scale: 1 unit in x = 50px, 1 unit in y = 50px.
    const toSvgX = (x: number) => 300 + x * 50;
    const toSvgY = (y: number) => 130 - y * 50;

    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const res = evaluateFunc(x, selectedFunc);
      const clampedVal = Math.min(2.5, Math.max(-2.5, res.val));
      const clampedDeriv = Math.min(2.5, Math.max(-2.5, res.deriv));

      const sx = toSvgX(x);
      const syF = toSvgY(clampedVal);
      const syD = toSvgY(clampedDeriv);

      pointsF.push(`${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${syF.toFixed(1)}`);
      pointsD.push(`${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${syD.toFixed(1)}`);
    }

    return { pathF: pointsF.join(' '), pathDeriv: pointsD.join(' ') };
  }, [selectedFunc]);

  const funcInfo = {
    sigmoid: {
      formula: 'σ(x) = 1 / (1 + e⁻ˣ)',
      range: '(0, 1)',
      derivFormula: "σ'(x) = σ(x)(1 - σ(x)) [Max 0.25]",
      pros: 'Maps outputs to probability distributions for binary classification.',
      cons: 'Suffers from vanishing gradients when |x| > 3 because σ\'(x) → 0. Not zero-centered.',
    },
    tanh: {
      formula: 'tanh(x) = (eˣ - e⁻ˣ) / (eˣ + e⁻ˣ)',
      range: '(-1, 1)',
      derivFormula: "tanh'(x) = 1 - tanh²(x) [Max 1.0]",
      pros: 'Zero-centered outputs accelerate convergence compared to sigmoid.',
      cons: 'Still saturates and causes vanishing gradients for large positive or negative inputs.',
    },
    relu: {
      formula: 'ReLU(x) = max(0, x)',
      range: '[0, ∞)',
      derivFormula: "ReLU'(x) = 1 if x > 0 else 0",
      pros: 'No saturation for x > 0; computationally cheap; very fast training.',
      cons: 'Dying ReLU problem: neurons with negative inputs can permanently output 0 and never update.',
    },
    leaky_relu: {
      formula: 'LeakyReLU(x) = max(0.1x, x)',
      range: '(-∞, ∞)',
      derivFormula: "LeakyReLU'(x) = 1 if x > 0 else 0.1",
      pros: 'Prevents dying neurons by ensuring a small gradient flows even for negative inputs.',
      cons: 'Requires tuning or fixing the leak coefficient hyperparameter α.',
    },
    gelu: {
      formula: 'GELU(x) = x · Φ(x)',
      range: '[-0.17, ∞)',
      derivFormula: "Smooth probabilistic derivative with non-monotonic curvature",
      pros: 'Default in modern Transformers (GPT, BERT, LLaMA); smooth non-linearity avoids abrupt zero-cutoffs.',
      cons: 'Slightly higher compute cost than simple ReLU.',
    },
  }[selectedFunc];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <LineChart className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Activation Function &amp; Gradient Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare non-linear activation shapes, output bounds, and analytical derivative dynamics across layers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <input
              type="checkbox"
              checked={showDerivative}
              onChange={(e) => setShowDerivative(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Show Derivative f&apos;(x)</span>
          </label>
        </div>
      </div>

      {/* Function Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {(['sigmoid', 'tanh', 'relu', 'leaky_relu', 'gelu'] as const).map((fn) => (
          <button
            key={fn}
            onClick={() => setSelectedFunc(fn)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedFunc === fn
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {fn === 'leaky_relu' ? 'Leaky ReLU' : fn.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Interactive SVG Chart */}
      <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-x-auto text-slate-100">
        <svg viewBox="0 0 600 260" className="w-full min-w-[500px] h-60 select-none">
          {/* Grid lines */}
          <line x1="50" y1="130" x2="550" y2="130" stroke="#334155" strokeWidth="1.5" />
          <line x1="300" y1="20" x2="300" y2="240" stroke="#334155" strokeWidth="1.5" />

          {/* Grid tick marks */}
          {[-4, -2, 2, 4].map((t) => (
            <g key={t}>
              <line x1={300 + t * 50} y1="126" x2={300 + t * 50} y2="134" stroke="#64748b" strokeWidth="1.5" />
              <text x={300 + t * 50} y="148" fill="#64748b" fontSize="10" textAnchor="middle">{t}</text>
            </g>
          ))}
          {[-2, -1, 1, 2].map((t) => (
            <g key={t}>
              <line x1="296" y1={130 - t * 50} x2="304" y2={130 - t * 50} stroke="#64748b" strokeWidth="1.5" />
              <text x="288" y={133 - t * 50} fill="#64748b" fontSize="10" textAnchor="end">{t}</text>
            </g>
          ))}

          {/* Function Curve f(x) */}
          <path d={pathF} fill="none" stroke="#6366f1" strokeWidth="3.5" />

          {/* Derivative Curve f'(x) */}
          {showDerivative && (
            <path d={pathDeriv} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 4" opacity="0.9" />
          )}

          {/* Current inspection point on f(x) */}
          {(() => {
            const sx = 300 + currentX * 50;
            const sy = 130 - Math.min(2.5, Math.max(-2.5, currentEvaluation.val)) * 50;
            return (
              <g>
                <circle cx={sx} cy={sy} r="6" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
                <line x1={sx} y1="20" x2={sx} y2="240" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              </g>
            );
          })()}

          {/* Current inspection point on f'(x) */}
          {showDerivative && (() => {
            const sx = 300 + currentX * 50;
            const sy = 130 - Math.min(2.5, Math.max(-2.5, currentEvaluation.deriv)) * 50;
            return (
              <g>
                <circle cx={sx} cy={sy} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              </g>
            );
          })()}

          {/* Legend */}
          <g transform="translate(420, 30)">
            <rect width="160" height="52" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <line x1="12" y1="18" x2="36" y2="18" stroke="#6366f1" strokeWidth="3" />
            <text x="44" y="22" fill="#cbd5e1" fontSize="11" fontWeight="600">f(x) Activation</text>
            {showDerivative && (
              <>
                <line x1="12" y1="36" x2="36" y2="36" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" />
                <text x="44" y="40" fill="#fcd34d" fontSize="11" fontWeight="600">f&apos;(x) Gradient</text>
              </>
            )}
          </g>
        </svg>
      </div>

      {/* Input Slider & Live Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-800 dark:text-slate-200">Input Value (x):</span>
            <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">{currentX.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.05"
            value={currentX}
            onChange={(e) => setCurrentX(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500">
            Slide to inspect how activation and gradient behave across positive and negative inputs.
          </p>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60">
          <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400">Activation Output</span>
          <p className="text-lg font-mono font-extrabold text-indigo-700 dark:text-indigo-300">
            f({currentX.toFixed(2)}) = {currentEvaluation.val.toFixed(4)}
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">Range: {funcInfo.range}</p>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
          <span className="text-[10px] uppercase font-mono font-bold text-amber-600 dark:text-amber-400">Gradient Value</span>
          <p className="text-lg font-mono font-extrabold text-amber-700 dark:text-amber-300">
            f&apos;({currentX.toFixed(2)}) = {currentEvaluation.deriv.toFixed(4)}
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            {Math.abs(currentEvaluation.deriv) < 0.01 ? '⚠️ Vanishing gradient region!' : 'Active backprop learning signal'}
          </p>
        </div>
      </div>

      {/* Deep Learning Architectural Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Advantages</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{funcInfo.pros}</p>
        </div>
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <span className="font-bold text-rose-600 dark:text-rose-400 block">Limitations &amp; Pitfalls</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{funcInfo.cons}</p>
        </div>
      </div>
    </div>
  );
};

