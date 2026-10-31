'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Sliders, RotateCcw, Play, SkipForward, Activity, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const GradientDescentPlayground: React.FC = () => {
  const [landscape, setLandscape] = useState<'convex' | 'nonconvex'>('convex');
  const [optimizer, setOptimizer] = useState<'sgd' | 'momentum' | 'rmsprop' | 'adam'>('adam');
  const [learningRate, setLearningRate] = useState<number>(0.15);
  const [initialW, setInitialW] = useState<number>(-2.8);

  const [steps, setSteps] = useState<{ w: number; loss: number }[]>([]);
  const stateRef = useRef<{ v: number; m: number; s: number; t: number }>({ v: 0, m: 0, s: 0, t: 0 });

  // Landscape function and derivative
  const lossFunc = (w: number) => {
    if (landscape === 'convex') {
      return 0.5 * w * w;
    } else {
      // Nonconvex with local minimum & global minimum
      return 0.15 * Math.pow(w, 4) - 0.9 * Math.pow(w, 2) + 0.2 * w + 3.0;
    }
  };

  const gradFunc = (w: number) => {
    if (landscape === 'convex') {
      return w;
    } else {
      return 0.6 * Math.pow(w, 3) - 1.8 * w + 0.2;
    }
  };

  const reset = () => {
    stateRef.current = { v: 0, m: 0, s: 0, t: 0 };
    setSteps([{ w: initialW, loss: lossFunc(initialW) }]);
  };

  useEffect(() => {
    reset();
  }, [landscape, optimizer, initialW]);

  const computeNextW = (currentW: number) => {
    if (Math.abs(currentW) > 6 || isNaN(currentW)) return currentW;
    const g = gradFunc(currentW);
    let nextW = currentW;

    if (optimizer === 'sgd') {
      nextW = currentW - learningRate * g;
    } else if (optimizer === 'momentum') {
      const beta = 0.9;
      stateRef.current.v = beta * stateRef.current.v + (1 - beta) * g;
      nextW = currentW - learningRate * stateRef.current.v;
    } else if (optimizer === 'rmsprop') {
      const beta2 = 0.99;
      stateRef.current.s = beta2 * stateRef.current.s + (1 - beta2) * g * g;
      nextW = currentW - (learningRate / (Math.sqrt(stateRef.current.s) + 1e-8)) * g;
    } else if (optimizer === 'adam') {
      const beta1 = 0.9;
      const beta2 = 0.999;
      stateRef.current.t += 1;
      const t = stateRef.current.t;

      stateRef.current.m = beta1 * stateRef.current.m + (1 - beta1) * g;
      stateRef.current.v = beta2 * stateRef.current.v + (1 - beta2) * g * g;

      const mHat = stateRef.current.m / (1 - Math.pow(beta1, t));
      const vHat = stateRef.current.v / (1 - Math.pow(beta2, t));

      nextW = currentW - (learningRate / (Math.sqrt(vHat) + 1e-8)) * mHat;
    }
    return nextW;
  };

  const stepOptimizer = () => {
    setSteps((prev) => {
      if (prev.length === 0) return prev;
      const current = prev[prev.length - 1];
      const nextW = computeNextW(current.w);
      return [...prev, { w: nextW, loss: lossFunc(nextW) }];
    });
  };

  const runMultipleSteps = (n = 10) => {
    setSteps((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      for (let i = 0; i < n; i++) {
        const curr = updated[updated.length - 1];
        if (Math.abs(curr.w) > 6 || isNaN(curr.w)) break;
        const nextW = computeNextW(curr.w);
        updated.push({ w: nextW, loss: lossFunc(nextW) });
      }
      return updated;
    });
  };

  // SVG Coordinates
  // w in [-3.5, 3.5], mapped to X [40, 500]
  // loss in [0, 6], mapped to Y [210, 20]
  const toSvgX = (w: number) => 270 + w * 65;
  const toSvgY = (l: number) => 210 - Math.min(5.5, Math.max(0, l)) * 32;

  // Background loss curve path
  const curvePath = useMemo(() => {
    const pts: string[] = [];
    const count = 120;
    for (let i = 0; i <= count; i++) {
      const w = -3.5 + (i / count) * 7.0;
      const l = lossFunc(w);
      pts.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(w).toFixed(1)} ${toSvgY(l).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [landscape]);

  const currentStep = steps[steps.length - 1] || { w: initialW, loss: lossFunc(initialW) };
  const isDiverging = Math.abs(currentStep.w) > 4.5 || isNaN(currentStep.w);
  const isConverged = steps.length > 2 && Math.abs(gradFunc(currentStep.w)) < 0.05;

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
              Gradient Descent &amp; Optimizer Dynamics Playground
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare SGD, Momentum, RMSprop, and Adam navigating loss surfaces in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLandscape('convex')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              landscape === 'convex'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Convex Bowl
          </button>
          <button
            onClick={() => setLandscape('nonconvex')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              landscape === 'nonconvex'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Non-Convex Landscape
          </button>
        </div>
      </div>

      {/* Optimizer Selection */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Optimizer:</span>
          {(['sgd', 'momentum', 'rmsprop', 'adam'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setOptimizer(opt)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                optimizer === opt
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {opt.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={stepOptimizer}
            disabled={isDiverging}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Step +1</span>
          </button>

          <button
            onClick={() => runMultipleSteps(10)}
            disabled={isDiverging}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Run 10 Steps</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-x-auto text-slate-100">
        <svg viewBox="0 0 540 240" className="w-full min-w-[480px] h-56 select-none">
          {/* Axis */}
          <line x1="40" y1="210" x2="500" y2="210" stroke="#334155" strokeWidth="1.5" />

          {/* Loss Curve */}
          <path d={curvePath} fill="none" stroke="#6366f1" strokeWidth="3" />

          {/* Trajectory lines */}
          {steps.map((st, i) => {
            if (i === 0) return null;
            const prev = steps[i - 1];
            return (
              <line
                key={i}
                x1={toSvgX(prev.w)}
                y1={toSvgY(prev.loss)}
                x2={toSvgX(st.w)}
                y2={toSvgY(st.loss)}
                stroke="#f59e0b"
                strokeWidth="2"
                opacity="0.8"
              />
            );
          })}

          {/* Step circles */}
          {steps.map((st, i) => (
            <circle
              key={i}
              cx={toSvgX(st.w)}
              cy={toSvgY(st.loss)}
              r={i === steps.length - 1 ? 7 : 3.5}
              fill={i === steps.length - 1 ? '#10b981' : '#f59e0b'}
              stroke="#ffffff"
              strokeWidth={i === steps.length - 1 ? 2.5 : 1}
            />
          ))}

          {/* Step count badge */}
          <g transform="translate(420, 24)">
            <rect width="90" height="28" rx="8" fill="#1e293b" />
            <text x="45" y="18" fill="#93c5fd" fontSize="11" fontWeight="700" textAnchor="middle">
              Iteration {steps.length - 1}
            </text>
          </g>
        </svg>

        {/* Status notification */}
        <div className="mt-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {isDiverging ? (
              <span className="flex items-center gap-1 text-rose-400 font-bold">
                <AlertTriangle className="w-4 h-4" /> Diverging! Learning rate is too high.
              </span>
            ) : isConverged ? (
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Converged near minimum!
              </span>
            ) : (
              <span className="text-slate-400">
                Optimizing parameter <code className="text-indigo-400">w</code> towards local or global minimum...
              </span>
            )}
          </div>
          <div className="font-mono text-slate-300">
            w = <strong className="text-white">{currentStep.w.toFixed(3)}</strong>, Loss = <strong className="text-white">{currentStep.loss.toFixed(4)}</strong>
          </div>
        </div>
      </div>

      {/* Sliders for Learning Rate and Initial Weight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">Learning Rate (α):</span>
            <span className="font-mono font-bold text-indigo-600">{learningRate.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="1.2"
            step="0.01"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            High α causes oscillation or divergence; low α leads to sluggish progress.
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">Starting Position (w₀):</span>
            <span className="font-mono font-bold text-indigo-600">{initialW.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-3.2"
            max="3.2"
            step="0.1"
            value={initialW}
            onChange={(e) => setInitialW(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            In non-convex landscapes, the starting point determines which local valley the optimizer falls into.
          </p>
        </div>
      </div>
    </div>
  );
};

