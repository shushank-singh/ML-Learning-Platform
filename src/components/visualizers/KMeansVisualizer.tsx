'use client';

import React, { useState, useMemo } from 'react';
import { Network, RotateCcw, FastForward, Play } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  cluster: number;
}

interface Centroid {
  x: number;
  y: number;
  color: string;
}

const CLUSTER_COLORS = ['#38bdf8', '#f59e0b', '#10b981', '#ec4899', '#a855f7'];

export const KMeansVisualizer: React.FC = () => {
  const [k, setK] = useState<number>(3);
  const [stepPhase, setStepPhase] = useState<'assign' | 'update'>('assign');
  const [iteration, setIteration] = useState<number>(0);

  // Generate synthetic 2D points clustered naturally around 3 spots
  const initialPoints = useMemo(() => {
    const pts: Point[] = [];
    const centers = [
      { cx: 20, cy: 30 },
      { cx: 70, cy: 35 },
      { cx: 45, cy: 75 },
    ];
    let seed = 12345;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    centers.forEach((center) => {
      for (let i = 0; i < 15; i++) {
        const angle = rnd() * Math.PI * 2;
        const rad = rnd() * 14;
        pts.push({
          x: center.cx + Math.cos(angle) * rad,
          y: center.cy + Math.sin(angle) * rad,
          cluster: -1,
        });
      }
    });
    return pts;
  }, []);

  const [points, setPoints] = useState<Point[]>(initialPoints);

  // Centroids state
  const [centroids, setCentroids] = useState<Centroid[]>([
    { x: 15, y: 15, color: CLUSTER_COLORS[0] },
    { x: 80, y: 80, color: CLUSTER_COLORS[1] },
    { x: 25, y: 70, color: CLUSTER_COLORS[2] },
  ]);

  const reset = (newK: number = k) => {
    setIteration(0);
    setStepPhase('assign');
    setPoints(initialPoints.map((p) => ({ ...p, cluster: -1 })));

    // Pick dispersed initial centroids
    const newCentroids: Centroid[] = [];
    for (let i = 0; i < newK; i++) {
      const p = initialPoints[Math.floor((i * initialPoints.length) / newK)];
      newCentroids.push({
        x: p.x + (Math.random() - 0.5) * 5,
        y: p.y + (Math.random() - 0.5) * 5,
        color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
      });
    }
    setCentroids(newCentroids);
  };

  // Perform single step
  const executeNextStep = () => {
    if (stepPhase === 'assign') {
      // Assign points to nearest centroid
      const updated = points.map((p) => {
        let minDist = Infinity;
        let bestCluster = 0;
        centroids.forEach((c, idx) => {
          const dist = Math.hypot(p.x - c.x, p.y - c.y);
          if (dist < minDist) {
            minDist = dist;
            bestCluster = idx;
          }
        });
        return { ...p, cluster: bestCluster };
      });
      setPoints(updated);
      setStepPhase('update');
    } else {
      // Update centroid positions
      const updatedCentroids = centroids.map((c, idx) => {
        const assigned = points.filter((p) => p.cluster === idx);
        if (assigned.length === 0) return c;
        const avgX = assigned.reduce((sum, p) => sum + p.x, 0) / assigned.length;
        const avgY = assigned.reduce((sum, p) => sum + p.y, 0) / assigned.length;
        return { ...c, x: avgX, y: avgY };
      });
      setCentroids(updatedCentroids);
      setIteration((i) => i + 1);
      setStepPhase('assign');
    }
  };

  // Inertia (WCSS)
  const inertia = useMemo(() => {
    let wcss = 0;
    points.forEach((p) => {
      if (p.cluster >= 0 && p.cluster < centroids.length) {
        const c = centroids[p.cluster];
        wcss += Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2);
      }
    });
    return Math.round(wcss);
  }, [points, centroids]);

  const width = 500;
  const height = 340;
  const padding = 30;

  const scaleX = (x: number) => padding + (x / 100) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - (y / 100) * (height - 2 * padding);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
              K-Means Lloyd's Algorithm Step Visualizer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Alternating between Assignment step (argmin dist) & Centroid Update step (mean)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={executeNextStep}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
          >
            <FastForward className="w-3.5 h-3.5" />
            {stepPhase === 'assign' ? '1. Assign Points' : '2. Update Centroids'}
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
        <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col justify-between">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Iteration: {iteration}</span>
            <span className="font-mono text-cyan-400">
              Phase: {stepPhase === 'assign' ? 'Points waiting for nearest centroid' : 'Centroids moving to cluster mean'}
            </span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            {/* Background grid */}
            {[20, 40, 60, 80].map((v) => (
              <g key={`k-grid-${v}`}>
                <line x1={scaleX(v)} y1={padding} x2={scaleX(v)} y2={height - padding} stroke="#1e293b" strokeWidth="1" />
                <line x1={padding} y1={scaleY(v)} x2={width - padding} y2={scaleY(v)} stroke="#1e293b" strokeWidth="1" />
              </g>
            ))}

            {/* Connecting lines from points to assigned centroids */}
            {points.map((p, idx) => {
              if (p.cluster < 0 || p.cluster >= centroids.length) return null;
              const c = centroids[p.cluster];
              return (
                <line
                  key={`line-${idx}`}
                  x1={scaleX(p.x)}
                  y1={scaleY(p.y)}
                  x2={scaleX(c.x)}
                  y2={scaleY(c.y)}
                  stroke={c.color}
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity={0.35}
                />
              );
            })}

            {/* Points */}
            {points.map((p, idx) => (
              <circle
                key={`p-${idx}`}
                cx={scaleX(p.x)}
                cy={scaleY(p.y)}
                r="4.5"
                fill={p.cluster >= 0 ? centroids[p.cluster]?.color || '#94a3b8' : '#94a3b8'}
                stroke="#0f172a"
                strokeWidth="1"
              />
            ))}

            {/* Centroids (Stars / Large Crosses) */}
            {centroids.map((c, idx) => (
              <g key={`centroid-${idx}`}>
                <circle
                  cx={scaleX(c.x)}
                  cy={scaleY(c.y)}
                  r="10"
                  fill={c.color}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="animate-pulse"
                />
                <text
                  x={scaleX(c.x)}
                  y={scaleY(c.y) + 4}
                  fill="#000000"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  μ{idx + 1}
                </text>
              </g>
            ))}
          </svg>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">WCSS INERTIA (LOSS)</span>
              <span className="font-mono text-emerald-400 font-semibold text-sm">{inertia}</span>
            </div>
            <div className="bg-slate-900 rounded p-2 border border-slate-800">
              <span className="text-slate-400 block font-mono text-[10px]">CLUSTERS (K)</span>
              <span className="font-mono text-cyan-400 font-semibold text-sm">{k}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-5 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider block">
              Cluster Settings
            </span>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Number of Clusters (K)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{k}</span>
              </div>
              <div className="flex gap-2">
                {[2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setK(val);
                      reset(val);
                    }}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border ${
                      k === val
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    K = {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300 space-y-1">
              <span className="font-semibold block">Lloyd's Heuristic:</span>
              <p>Step 1: Each point assigns to the nearest centroid: <span className="font-mono">c(i) = argmin ||x - μ||²</span></p>
              <p>Step 2: Each centroid updates to the cluster mean: <span className="font-mono">μ_k = (1/|S_k|) Σ x_i</span></p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            Click &quot;Next Step&quot; repeatedly to watch the algorithm converge to a local minimum of WCSS.
          </div>
        </div>
      </div>
    </div>
  );
};
