'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Play, RotateCcw, Sliders, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { MathInline } from '../math/Math';

export const LinearRegressionVisualizer: React.FC = () => {
  const [numPoints, setNumPoints] = useState<number>(30);
  const [noise, setNoise] = useState<number>(15);
  const [trueSlope, setTrueSlope] = useState<number>(1.8);
  const [trueIntercept, setTrueIntercept] = useState<number>(12);
  const [userSlope, setUserSlope] = useState<number>(1.2);
  const [userIntercept, setUserIntercept] = useState<number>(20);
  const [showOLS, setShowOLS] = useState<boolean>(true);
  const [showResiduals, setShowResiduals] = useState<boolean>(true);
  const [seed, setSeed] = useState<number>(42);

  // Pseudo-random data generator with seed
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    let s = seed;
    const pseudoRandom = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    for (let i = 0; i < numPoints; i++) {
      const x = 5 + (i / (numPoints - 1 || 1)) * 40;
      const gaussianNoise = (pseudoRandom() + pseudoRandom() + pseudoRandom() - 1.5) * noise;
      const y = trueSlope * x + trueIntercept + gaussianNoise;
      pts.push({ x, y: Math.max(0, y) });
    }
    return pts;
  }, [numPoints, noise, trueSlope, trueIntercept, seed]);

  // Analytical Ordinary Least Squares (OLS) calculation
  const ols = useMemo(() => {
    const n = points.length;
    if (n === 0) return { slope: 0, intercept: 0, r2: 0, mse: 0 };

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;

    points.forEach((p) => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumX2 += p.x * p.x;
    });

    const meanX = sumX / n;
    const meanY = sumY / n;

    const denominator = sumX2 - n * meanX * meanX;
    const slope = denominator === 0 ? 0 : (sumXY - n * meanX * meanY) / denominator;
    const intercept = meanY - slope * meanX;

    // Compute MSE and R²
    let ssTot = 0;
    let ssRes = 0;
    let mse = 0;

    points.forEach((p) => {
      const pred = slope * p.x + intercept;
      ssRes += Math.pow(p.y - pred, 2);
      ssTot += Math.pow(p.y - meanY, 2);
    });

    mse = ssRes / n;
    const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

    return {
      slope: Number(slope.toFixed(3)),
      intercept: Number(intercept.toFixed(2)),
      r2: Number(r2.toFixed(3)),
      mse: Number(mse.toFixed(2)),
    };
  }, [points]);

  // User model statistics
  const userStats = useMemo(() => {
    const n = points.length;
    if (n === 0) return { mse: 0 };
    let ssRes = 0;
    points.forEach((p) => {
      const pred = userSlope * p.x + userIntercept;
      ssRes += Math.pow(p.y - pred, 2);
    });
    return {
      mse: Number((ssRes / n).toFixed(2)),
    };
  }, [points, userSlope, userIntercept]);

  // Coordinate mapping for SVG
  const width = 600;
  const height = 360;
  const padding = 45;

  const minX = 0;
  const maxX = 50;
  const minY = 0;
  const maxY = 120;

  const scaleX = (x: number) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);

  const olsY1 = ols.slope * minX + ols.intercept;
  const olsY2 = ols.slope * maxX + ols.intercept;

  const userY1 = userSlope * minX + userIntercept;
  const userY2 = userSlope * maxX + userIntercept;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
              Interactive Ordinary Least Squares (OLS) Simulator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manipulate sample parameters and examine how the normal equation minimizes squared residuals.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Resample Noise
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* SVG Canvas Area */}
        <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
              Data Points (x, y)
            </span>
            {showOLS && (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span>
                Optimal OLS Line: ŷ = {ols.slope}x + {ols.intercept}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-indigo-400 border-dashed inline-block"></span>
              Manual Hypothesis: ŷ = {userSlope}x + {userIntercept}
            </span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Grid Lines */}
            {[0, 10, 20, 30, 40, 50].map((xVal) => (
              <g key={`grid-x-${xVal}`}>
                <line
                  x1={scaleX(xVal)}
                  y1={padding}
                  x2={scaleX(xVal)}
                  y2={height - padding}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
                <text
                  x={scaleX(xVal)}
                  y={height - padding + 18}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {xVal}
                </text>
              </g>
            ))}

            {[0, 30, 60, 90, 120].map((yVal) => (
              <g key={`grid-y-${yVal}`}>
                <line
                  x1={padding}
                  y1={scaleY(yVal)}
                  x2={width - padding}
                  y2={scaleY(yVal)}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
                <text
                  x={padding - 10}
                  y={scaleY(yVal) + 3}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="end"
                >
                  {yVal}
                </text>
              </g>
            ))}

            {/* Axes */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - padding}
              y2={height - padding}
              stroke="#475569"
              strokeWidth="2"
            />
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={height - padding}
              stroke="#475569"
              strokeWidth="2"
            />

            {/* Residuals (Error bars) */}
            {showResiduals &&
              points.map((p, idx) => {
                const targetY = showOLS ? ols.slope * p.x + ols.intercept : userSlope * p.x + userIntercept;
                return (
                  <line
                    key={`res-${idx}`}
                    x1={scaleX(p.x)}
                    y1={scaleY(p.y)}
                    x2={scaleX(p.x)}
                    y2={scaleY(targetY)}
                    stroke={showOLS ? '#10b981' : '#f43f5e'}
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                    opacity={0.6}
                  />
                );
              })}

            {/* User Hypothesis Line */}
            <line
              x1={scaleX(minX)}
              y1={scaleY(userY1)}
              x2={scaleX(maxX)}
              y2={scaleY(userY2)}
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeDasharray="4,4"
            />

            {/* Optimal OLS Line */}
            {showOLS && (
              <line
                x1={scaleX(minX)}
                y1={scaleY(olsY1)}
                x2={scaleX(maxX)}
                y2={scaleY(olsY2)}
                stroke="#10b981"
                strokeWidth="3"
              />
            )}

            {/* Data Points */}
            {points.map((p, idx) => (
              <circle
                key={`pt-${idx}`}
                cx={scaleX(p.x)}
                cy={scaleY(p.y)}
                r="4.5"
                fill="#38bdf8"
                stroke="#0f172a"
                strokeWidth="1.5"
                className="transition-all hover:r-6 cursor-pointer"
              />
            ))}
          </svg>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800">
            <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">OLS MSE</span>
              <span className="text-sm font-semibold text-emerald-400 font-mono">{ols.mse}</span>
            </div>
            <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">OLS R² SCORE</span>
              <span className="text-sm font-semibold text-emerald-400 font-mono">{ols.r2}</span>
            </div>
            <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">MANUAL MSE</span>
              <span className="text-sm font-semibold text-indigo-400 font-mono">{userStats.mse}</span>
            </div>
            <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">LOSS GAP (Δ)</span>
              <span className={`text-sm font-semibold font-mono ${userStats.mse - ols.mse > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                +{(userStats.mse - ols.mse).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="lg:col-span-4 p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              Experiment Parameters
            </div>

            {/* Slider: Number of Samples */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Sample Size (N)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{numPoints}</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={numPoints}
                onChange={(e) => setNumPoints(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Slider: Noise Level */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Gaussian Noise (σ)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{noise}</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={noise}
                onChange={(e) => setNoise(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-2 uppercase tracking-wide">
                Adjust Manual Hypothesis Line
              </span>

              {/* Slider: Manual Slope */}
              <div className="mb-3">
                <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  <span>Manual Slope (w)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{userSlope.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="4"
                  step="0.05"
                  value={userSlope}
                  onChange={(e) => setUserSlope(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Slider: Manual Intercept */}
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  <span>Manual Intercept (b)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{userIntercept.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="50"
                  step="1"
                  value={userIntercept}
                  onChange={(e) => setUserIntercept(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            {/* Toggle checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={showOLS}
                  onChange={(e) => setShowOLS(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Show Analytical OLS Line (Green)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={showResiduals}
                  onChange={(e) => setShowResiduals(e.target.checked)}
                  className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span>Show Residual Error Segments (Dashed)</span>
              </label>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300">
            <span className="font-semibold block mb-0.5">Key Intuition:</span>
            Notice how adjusting slope and intercept increases the sum of squared red bars. OLS analytically guarantees the absolute minimum sum of squared lengths!
          </div>
        </div>
      </div>
    </div>
  );
};
