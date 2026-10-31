'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, Activity, ArrowRight, Zap, Info } from 'lucide-react';

export const NeuronCalculator: React.FC = () => {
  const [x1, setX1] = useState<number>(1.2);
  const [x2, setX2] = useState<number>(-0.8);
  const [x3, setX3] = useState<number>(0.5);

  const [w1, setW1] = useState<number>(0.9);
  const [w2, setW2] = useState<number>(-1.5);
  const [w3, setW3] = useState<number>(0.7);

  const [bias, setBias] = useState<number>(0.2);
  const [activation, setActivation] = useState<'sigmoid' | 'relu' | 'tanh' | 'leaky_relu' | 'step'>('sigmoid');

  const { p1, p2, p3, z, a } = useMemo(() => {
    const p1Val = x1 * w1;
    const p2Val = x2 * w2;
    const p3Val = x3 * w3;
    const zVal = p1Val + p2Val + p3Val + bias;

    let aVal = 0;
    switch (activation) {
      case 'sigmoid':
        aVal = 1 / (1 + Math.exp(-Math.min(15, Math.max(-15, zVal))));
        break;
      case 'relu':
        aVal = Math.max(0, zVal);
        break;
      case 'tanh':
        aVal = Math.tanh(zVal);
        break;
      case 'leaky_relu':
        aVal = zVal >= 0 ? zVal : 0.1 * zVal;
        break;
      case 'step':
        aVal = zVal >= 0 ? 1 : 0;
        break;
    }

    return {
      p1: p1Val,
      p2: p2Val,
      p3: p3Val,
      z: zVal,
      a: aVal,
    };
  }, [x1, x2, x3, w1, w2, w3, bias, activation]);

  const handleReset = () => {
    setX1(1.2);
    setX2(-0.8);
    setX3(0.5);
    setW1(0.9);
    setW2(-1.5);
    setW3(0.7);
    setBias(0.2);
    setActivation('sigmoid');
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 font-bold">
              <Zap className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              Neuron Calculator: Inputs, Weights, Bias &amp; Activation
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compute the linear pre-activation sum <code className="text-indigo-500 font-mono">z = ∑(wᵢxᵢ) + b</code> and non-linear output <code className="text-indigo-500 font-mono">a = σ(z)</code> in real time.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Activation Function Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2">Activation Function:</span>
        {(['sigmoid', 'relu', 'tanh', 'leaky_relu', 'step'] as const).map((fn) => (
          <button
            key={fn}
            onClick={() => setActivation(fn)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activation === fn
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {fn === 'leaky_relu' ? 'Leaky ReLU' : fn.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Visual Diagram Canvas */}
      <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-x-auto text-slate-100">
        <svg viewBox="0 0 760 260" className="w-full min-w-[650px] h-56 select-none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Connection Lines */}
          <line x1="140" y1="50" x2="340" y2="130" stroke={w1 >= 0 ? '#3b82f6' : '#ef4444'} strokeWidth={Math.min(6, Math.max(1.5, Math.abs(w1) * 2.5))} opacity="0.8" />
          <line x1="140" y1="130" x2="340" y2="130" stroke={w2 >= 0 ? '#3b82f6' : '#ef4444'} strokeWidth={Math.min(6, Math.max(1.5, Math.abs(w2) * 2.5))} opacity="0.8" />
          <line x1="140" y1="210" x2="340" y2="130" stroke={w3 >= 0 ? '#3b82f6' : '#ef4444'} strokeWidth={Math.min(6, Math.max(1.5, Math.abs(w3) * 2.5))} opacity="0.8" />
          <line x1="240" y1="230" x2="340" y2="160" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="4 3" />

          {/* Connection into Activation Box */}
          <line x1="420" y1="130" x2="490" y2="130" stroke="#818cf8" strokeWidth="3" markerEnd="url(#arrow)" />

          {/* Output Arrow */}
          <line x1="590" y1="130" x2="680" y2="130" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />

          {/* Input Nodes */}
          <g transform="translate(100, 50)">
            <circle r="26" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" />
            <text textAnchor="middle" dy="-4" fill="#94a3b8" fontSize="10" fontWeight="600">x₁</text>
            <text textAnchor="middle" dy="12" fill="#f8fafc" fontSize="12" fontWeight="700">{x1.toFixed(1)}</text>
          </g>

          <g transform="translate(100, 130)">
            <circle r="26" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" />
            <text textAnchor="middle" dy="-4" fill="#94a3b8" fontSize="10" fontWeight="600">x₂</text>
            <text textAnchor="middle" dy="12" fill="#f8fafc" fontSize="12" fontWeight="700">{x2.toFixed(1)}</text>
          </g>

          <g transform="translate(100, 210)">
            <circle r="26" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" />
            <text textAnchor="middle" dy="-4" fill="#94a3b8" fontSize="10" fontWeight="600">x₃</text>
            <text textAnchor="middle" dy="12" fill="#f8fafc" fontSize="12" fontWeight="700">{x3.toFixed(1)}</text>
          </g>

          {/* Weight Labels */}
          <text x="210" y="75" fill="#93c5fd" fontSize="11" fontWeight="600">w₁ = {w1.toFixed(2)}</text>
          <text x="210" y="122" fill="#93c5fd" fontSize="11" fontWeight="600">w₂ = {w2.toFixed(2)}</text>
          <text x="210" y="195" fill="#93c5fd" fontSize="11" fontWeight="600">w₃ = {w3.toFixed(2)}</text>

          {/* Bias Node */}
          <g transform="translate(230, 230)">
            <circle r="18" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
            <text textAnchor="middle" dy="4" fill="#f3e8ff" fontSize="10" fontWeight="700">b={bias.toFixed(1)}</text>
          </g>

          {/* Summation Node */}
          <g transform="translate(380, 130)">
            <circle r="38" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
            <text textAnchor="middle" dy="-8" fill="#a5b4fc" fontSize="11" fontWeight="600">Sum (z)</text>
            <text textAnchor="middle" dy="12" fill="#ffffff" fontSize="16" fontWeight="800">
              {z.toFixed(2)}
            </text>
          </g>

          {/* Activation Box */}
          <g transform="translate(490, 95)">
            <rect width="100" height="70" rx="14" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
            <text x="50" y="26" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="700">
              f(z) = {activation.toUpperCase()}
            </text>
            <text x="50" y="52" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800">
              a = {a.toFixed(3)}
            </text>
          </g>

          {/* Final Output Node */}
          <g transform="translate(710, 130)">
            <circle r="30" fill="#047857" stroke="#34d399" strokeWidth="3" />
            <text textAnchor="middle" dy="-6" fill="#a7f3d0" fontSize="10" fontWeight="700">OUTPUT</text>
            <text textAnchor="middle" dy="12" fill="#ffffff" fontSize="15" fontWeight="800">{a.toFixed(3)}</text>
          </g>
        </svg>
      </div>

      {/* Numerical Step Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-mono uppercase text-indigo-500 font-bold tracking-wider">Step 1 · Dot Product</span>
          <div className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-1 space-y-0.5">
            <div>x₁w₁ = ({x1.toFixed(1)})({w1.toFixed(2)}) = <span className="font-bold text-slate-900 dark:text-slate-100">{p1.toFixed(2)}</span></div>
            <div>x₂w₂ = ({x2.toFixed(1)})({w2.toFixed(2)}) = <span className="font-bold text-slate-900 dark:text-slate-100">{p2.toFixed(2)}</span></div>
            <div>x₃w₃ = ({x3.toFixed(1)})({w3.toFixed(2)}) = <span className="font-bold text-slate-900 dark:text-slate-100">{p3.toFixed(2)}</span></div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-mono uppercase text-violet-500 font-bold tracking-wider">Step 2 · Add Bias</span>
          <div className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-1">
            <p>z = p₁ + p₂ + p₃ + b</p>
            <p className="mt-1 text-slate-500">
              = {p1.toFixed(2)} + {p2.toFixed(2)} + {p3.toFixed(2)} + {bias.toFixed(2)}
            </p>
            <p className="text-sm font-bold text-violet-600 dark:text-violet-400 mt-1">
              z = {z.toFixed(3)}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-mono uppercase text-emerald-500 font-bold tracking-wider">Step 3 · Non-Linear Output</span>
          <div className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-1">
            <p>a = {activation}({z.toFixed(2)})</p>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-2">
              Output a = {a.toFixed(4)}
            </p>
          </div>
        </div>
      </div>

      {/* Sliders Control Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
        {/* Inputs */}
        <div className="space-y-3">
          <span className="font-bold text-slate-800 dark:text-slate-200 block border-b pb-1 dark:border-slate-700">Inputs (x)</span>
          <div>
            <div className="flex justify-between"><span>x₁:</span><span className="font-mono">{x1.toFixed(1)}</span></div>
            <input type="range" min="-3" max="3" step="0.1" value={x1} onChange={(e) => setX1(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <div className="flex justify-between"><span>x₂:</span><span className="font-mono">{x2.toFixed(1)}</span></div>
            <input type="range" min="-3" max="3" step="0.1" value={x2} onChange={(e) => setX2(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <div className="flex justify-between"><span>x₃:</span><span className="font-mono">{x3.toFixed(1)}</span></div>
            <input type="range" min="-3" max="3" step="0.1" value={x3} onChange={(e) => setX3(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
          </div>
        </div>

        {/* Weights */}
        <div className="space-y-3">
          <span className="font-bold text-slate-800 dark:text-slate-200 block border-b pb-1 dark:border-slate-700">Weights (w)</span>
          <div>
            <div className="flex justify-between"><span>w₁:</span><span className="font-mono">{w1.toFixed(2)}</span></div>
            <input type="range" min="-3" max="3" step="0.1" value={w1} onChange={(e) => setW1(parseFloat(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <div className="flex justify-between"><span>w₂:</span><span className="font-mono">{w2.toFixed(2)}</span></div>
            <input type="range" min="-3" max="3" step="0.1" value={w2} onChange={(e) => setW2(parseFloat(e.target.value))} className="w-full accent-blue-600" />
          </div>
          <div>
            <div className="flex justify-between"><span>w₃:</span><span className="font-mono">{w3.toFixed(2)}</span></div>
            <input type="range" min="-3" max="3" step="0.1" value={w3} onChange={(e) => setW3(parseFloat(e.target.value))} className="w-full accent-blue-600" />
          </div>
        </div>

        {/* Bias */}
        <div className="space-y-3">
          <span className="font-bold text-slate-800 dark:text-slate-200 block border-b pb-1 dark:border-slate-700">Bias (b)</span>
          <div>
            <div className="flex justify-between"><span>Bias:</span><span className="font-mono">{bias.toFixed(2)}</span></div>
            <input type="range" min="-3" max="3" step="0.1" value={bias} onChange={(e) => setBias(parseFloat(e.target.value))} className="w-full accent-purple-600" />
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Bias shifts the decision threshold away from the origin without depending on input magnitude.
          </p>
        </div>

        {/* Intuition note */}
        <div className="space-y-2 p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200/60 dark:border-indigo-900/50">
          <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" /> Key Takeaway
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            A neuron calculates how strongly its learned weights <code className="font-mono">w</code> match the incoming feature pattern <code className="font-mono">x</code>. If the match exceeds the threshold, it fires with high activation!
          </p>
        </div>
      </div>
    </div>
  );
};

