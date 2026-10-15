'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, Activity } from 'lucide-react';

export const GradientDescentVisualizer: React.FC = () => {
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [trajectory, setTrajectory] = useState<{ w: number; loss: number }[]>([{ w: -3.8, loss: 0 }]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Convex quadratic objective: J(w) = 0.5 * (w - 1.5)^2 + 1
  // Derivative dJ/dw = w - 1.5
  // Global minimum at w = 1.5, min loss = 1.0
  const optimalW = 1.5;
  const lossFn = (w: number) => 0.5 * Math.pow(w - optimalW, 2) + 1.0;
  const gradFn = (w: number) => w - optimalW;

  const reset = (startW: number = -3.8) => {
    setIsPlaying(false);
    setCurrentStep(0);
    setTrajectory([{ w: startW, loss: lossFn(startW) }]);
  };

  const stepForward = () => {
    setTrajectory((prev) => {
      const last = prev[prev.length - 1];
      const grad = gradFn(last.w);
      const newW = last.w - learningRate * grad;
      // Cap at reasonable boundary
      const clampedW = Math.max(-5, Math.min(6, newW));
      return [...prev, { w: clampedW, loss: lossFn(clampedW) }];
    });
    setCurrentStep((s) => s + 1);
  };

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setTrajectory((prev) => {
          if (prev.length > 40) {
            setIsPlaying(false);
            return prev;
          }
          const last = prev[prev.length - 1];
          const grad = gradFn(last.w);
          if (Math.abs(grad) < 0.005) {
            setIsPlaying(false);
            return prev;
          }
          const newW = last.w - learningRate * grad;
          const clampedW = Math.max(-5, Math.min(6, newW));
          return [...prev, { w: clampedW, loss: lossFn(clampedW) }];
        });
        setCurrentStep((s) => s + 1);
      }, 350);
    }
    return () => clearInterval(timer);
  }, [isPlaying, learningRate]);

  // SVG dimensions
  const width = 600;
  const height = 320;
  const padding = 45;
  const minW = -5;
  const maxW = 5;
  const minL = 0;
  const maxL = 25;

  const scaleX = (w: number) => padding + ((w - minW) / (maxW - minW)) * (width - 2 * padding);
  const scaleY = (l: number) => height - padding - ((l - minL) / (maxL - minL)) * (height - 2 * padding);

  // Generate curve path
  const curvePoints: string[] = [];
  for (let w = minW; w <= maxW; w += 0.2) {
    const px = scaleX(w);
    const py = scaleY(lossFn(w));
    curvePoints.push(`${px},${py}`);
  }
  const curvePath = `M ${curvePoints.join(' L ')}`;

  const currentPoint = trajectory[trajectory.length - 1];
  const currentGrad = gradFn(currentPoint.w);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
              Gradient Descent Convergence Visualizer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Observe how the learning rate α controls step size and stability along the loss landscape.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pause' : 'Auto Run'}
          </button>
          <button
            onClick={stepForward}
            disabled={isPlaying}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50"
          >
            <FastForward className="w-3.5 h-3.5" />
            Step
          </button>
          <button
            onClick={() => reset()}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between relative">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Convex Loss Objective: J(w) = ½(w - 1.5)² + 1</span>
            <span className="font-mono text-cyan-400">Step: {currentStep}</span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Grid */}
            {[-4, -2, 0, 1.5, 4].map((wVal) => (
              <line
                key={`gw-${wVal}`}
                x1={scaleX(wVal)}
                y1={padding}
                x2={scaleX(wVal)}
                y2={height - padding}
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}
            {[2, 8, 14, 20].map((lVal) => (
              <line
                key={`gl-${lVal}`}
                x1={padding}
                y1={scaleY(lVal)}
                x2={width - padding}
                y2={scaleY(lVal)}
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#475569" strokeWidth="2" />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#475569" strokeWidth="2" />

            {/* Loss function curve */}
            <path d={curvePath} fill="none" stroke="#6366f1" strokeWidth="3" />

            {/* Minimum target line */}
            <line
              x1={scaleX(optimalW)}
              y1={padding}
              x2={scaleX(optimalW)}
              y2={height - padding}
              stroke="#10b981"
              strokeDasharray="4,4"
              strokeWidth="1.5"
            />
            <text x={scaleX(optimalW)} y={padding - 8} fill="#10b981" fontSize="10" textAnchor="middle">
              w* = 1.5 (Global Minimum)
            </text>

            {/* Trajectory path */}
            {trajectory.map((pt, i) => {
              if (i === 0) return null;
              const prev = trajectory[i - 1];
              return (
                <line
                  key={`step-${i}`}
                  x1={scaleX(prev.w)}
                  y1={scaleY(prev.loss)}
                  x2={scaleX(pt.w)}
                  y2={scaleY(pt.loss)}
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                />
              );
            })}

            {/* Trajectory nodes */}
            {trajectory.map((pt, i) => (
              <circle
                key={`node-${i}`}
                cx={scaleX(pt.w)}
                cy={scaleY(pt.loss)}
                r={i === trajectory.length - 1 ? '6' : '3.5'}
                fill={i === trajectory.length - 1 ? '#38bdf8' : '#fbbf24'}
                stroke="#0f172a"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900/90 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">CURRENT WEIGHT w</span>
              <span className="font-mono text-cyan-400 font-semibold">{currentPoint.w.toFixed(4)}</span>
            </div>
            <div className="bg-slate-900/90 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">CURRENT LOSS J(w)</span>
              <span className="font-mono text-amber-400 font-semibold">{currentPoint.loss.toFixed(4)}</span>
            </div>
            <div className="bg-slate-900/90 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">GRADIENT ∂J/∂w</span>
              <span className="font-mono text-rose-400 font-semibold">{currentGrad.toFixed(4)}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-4 p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider block">
              Hyperparameter Settings
            </span>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Learning Rate (α)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{learningRate.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.02"
                max="1.9"
                step="0.02"
                value={learningRate}
                onChange={(e) => {
                  setLearningRate(Number(e.target.value));
                  reset();
                }}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.02 (Slow)</span>
                <span>0.10 (Optimal)</span>
                <span>1.90 (Divergent)</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300 block">Presets:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setLearningRate(0.04);
                    reset(-4.0);
                  }}
                  className="px-2 py-1.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-center"
                >
                  Underdamped (0.04)
                </button>
                <button
                  onClick={() => {
                    setLearningRate(0.2);
                    reset(-4.0);
                  }}
                  className="px-2 py-1.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-center"
                >
                  Fast (0.20)
                </button>
                <button
                  onClick={() => {
                    setLearningRate(1.85);
                    reset(-1.5);
                  }}
                  className="px-2 py-1.5 rounded bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-center"
                >
                  Overshoot (1.85)
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
            <span className="font-semibold block mb-0.5">Mathematical Rule:</span>
            Update equation: <span className="font-mono">w := w - α · (∂J/∂w)</span>. If α is too small, convergence takes hundreds of iterations. If α &gt; 1.8, the updates explode and overshoot the minimum.
          </div>
        </div>
      </div>
    </div>
  );
};
