'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { StepPlayer } from '@/components/shared/StepPlayer';
import { PseudocodePanel } from '@/components/shared/PseudocodePanel';
import { Table } from 'lucide-react';

export type DPProblem = 'knapsack' | 'coin-change' | 'fibonacci' | 'lcs';

interface DPStep {
  grid: (number | string)[][];
  activeRow: number;
  activeCol: number;
  referencedCells?: { row: number; col: number }[];
  explanation: string;
  pseudocodeLine: number;
}

const META: Record<
  DPProblem,
  { name: string; pseudocode: string; rowLabels: string[]; colLabels: string[] }
> = {
  knapsack: {
    name: '0/1 Knapsack (Cap: 5, Items: [w=2,v=3], [w=3,v=4], [w=4,v=5])',
    pseudocode: `def knapsack(weights, values, W):
    dp = [[0]*(W+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(W+1):
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i-1][w],
                               values[i-1] + dp[i-1][w-weights[i-1]])
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][W]`,
    rowLabels: ['0: Empty', '1: (w:2, v:3)', '2: (w:3, v:4)', '3: (w:4, v:5)'],
    colLabels: ['W=0', 'W=1', 'W=2', 'W=3', 'W=4', 'W=5'],
  },
  fibonacci: {
    name: 'Fibonacci Tabulation: F(0)..F(6)',
    pseudocode: `def fib(n):
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
    rowLabels: ['F(n) Table'],
    colLabels: ['F(0)', 'F(1)', 'F(2)', 'F(3)', 'F(4)', 'F(5)', 'F(6)'],
  },
  'coin-change': {
    name: 'Coin Change: Min coins for target 6 with coins [1, 2, 5]',
    pseudocode: `def coin_change(coins, amount):
    dp = [inf] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount]`,
    rowLabels: ['Min Coins'],
    colLabels: ['0', '1', '2', '3', '4', '5', '6'],
  },
  lcs: {
    name: 'Longest Common Subsequence ("ACE", "ABCDE")',
    pseudocode: `def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
    rowLabels: ['Ø', 'A', 'C', 'E'],
    colLabels: ['Ø', 'A', 'B', 'C', 'D', 'E'],
  },
};

interface DPTableVisualizerProps {
  initialProblem?: DPProblem;
}

export const DPTableVisualizer: React.FC<DPTableVisualizerProps> = ({ initialProblem = 'knapsack' }) => {
  const [problem, setProblem] = useState<DPProblem>(initialProblem);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(700);

  const steps: DPStep[] = useMemo(() => {
    const meta = META[problem];
    const numRows = meta.rowLabels.length;
    const numCols = meta.colLabels.length;

    const generated: DPStep[] = [];

    if (problem === 'knapsack') {
      const weights = [2, 3, 4];
      const values = [3, 4, 5];
      const W = 5;

      const grid: (number | string)[][] = Array.from({ length: 4 }, () =>
        Array.from({ length: 6 }, () => '-')
      );

      // Base cases: row 0 is 0
      for (let w = 0; w <= W; w++) grid[0][w] = 0;

      generated.push({
        grid: grid.map((r) => [...r]),
        activeRow: 0,
        activeCol: 0,
        explanation: 'Base case initialized: with 0 items, max value for any capacity is 0.',
        pseudocodeLine: 2,
      });

      for (let i = 1; i <= 3; i++) {
        const wt = weights[i - 1];
        const val = values[i - 1];

        for (let w = 0; w <= W; w++) {
          if (wt <= w) {
            const exclude = grid[i - 1][w] as number;
            const include = val + (grid[i - 1][w - wt] as number);
            const best = Math.max(exclude, include);
            grid[i][w] = best;

            generated.push({
              grid: grid.map((r) => [...r]),
              activeRow: i,
              activeCol: w,
              referencedCells: [
                { row: i - 1, col: w },
                { row: i - 1, col: w - wt },
              ],
              explanation: `Item ${i} (w=${wt}, v=${val}), Cap=${w}: max(exclude=${exclude}, include=${val}+dp[${i - 1}][${w - wt}]=${include}) = ${best}.`,
              pseudocodeLine: 6,
            });
          } else {
            const exclude = grid[i - 1][w] as number;
            grid[i][w] = exclude;
            generated.push({
              grid: grid.map((r) => [...r]),
              activeRow: i,
              activeCol: w,
              referencedCells: [{ row: i - 1, col: w }],
              explanation: `Item ${i} weight ${wt} > capacity ${w}. Must exclude item: dp[${i}][${w}] = dp[${i - 1}][${w}] = ${exclude}.`,
              pseudocodeLine: 9,
            });
          }
        }
      }

      generated.push({
        grid: grid.map((r) => [...r]),
        activeRow: 3,
        activeCol: 5,
        explanation: `Optimal solution reached! Max value with capacity 5 is ${grid[3][5]}.`,
        pseudocodeLine: 10,
      });
    } else if (problem === 'fibonacci') {
      const grid: (number | string)[][] = [Array.from({ length: 7 }, () => '-')];
      grid[0][0] = 0;
      grid[0][1] = 1;

      generated.push({
        grid: grid.map((r) => [...r]),
        activeRow: 0,
        activeCol: 1,
        explanation: 'Initialize base cases: F(0)=0, F(1)=1.',
        pseudocodeLine: 4,
      });

      for (let i = 2; i <= 6; i++) {
        const v = (grid[0][i - 1] as number) + (grid[0][i - 2] as number);
        grid[0][i] = v;
        generated.push({
          grid: grid.map((r) => [...r]),
          activeRow: 0,
          activeCol: i,
          referencedCells: [
            { row: 0, col: i - 1 },
            { row: 0, col: i - 2 },
          ],
          explanation: `F(${i}) = F(${i - 1}) [${grid[0][i - 1]}] + F(${i - 2}) [${grid[0][i - 2]}] = ${v}. Calculated in O(1) time.`,
          pseudocodeLine: 6,
        });
      }
    } else if (problem === 'coin-change') {
      const grid: (number | string)[][] = [Array.from({ length: 7 }, () => '∞')];
      grid[0][0] = 0;

      generated.push({
        grid: grid.map((r) => [...r]),
        activeRow: 0,
        activeCol: 0,
        explanation: 'Base case: 0 coins needed to make amount 0.',
        pseudocodeLine: 3,
      });

      const coins = [1, 2, 5];
      coins.forEach((c) => {
        for (let x = c; x <= 6; x++) {
          const prev = grid[0][x] === '∞' ? Infinity : (grid[0][x] as number);
          const withCoin =
            grid[0][x - c] === '∞' ? Infinity : (grid[0][x - c] as number) + 1;
          const best = Math.min(prev, withCoin);
          grid[0][x] = best;

          generated.push({
            grid: grid.map((r) => [...r]),
            activeRow: 0,
            activeCol: x,
            referencedCells: [{ row: 0, col: x - c }],
            explanation: `Using coin ${c} for amount ${x}: min(prev=${prev}, 1 + dp[${x - c}] [${grid[0][x - c]}]) = ${best}.`,
            pseudocodeLine: 6,
          });
        }
      });
    } else if (problem === 'lcs') {
      const t1 = 'ACE';
      const t2 = 'ABCDE';
      const grid: (number | string)[][] = Array.from({ length: 4 }, () =>
        Array.from({ length: 6 }, () => 0)
      );

      generated.push({
        grid: grid.map((r) => [...r]),
        activeRow: 0,
        activeCol: 0,
        explanation: 'Initialize 2D LCS table with 0 for empty string prefixes.',
        pseudocodeLine: 3,
      });

      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 5; j++) {
          if (t1[i - 1] === t2[j - 1]) {
            const v = (grid[i - 1][j - 1] as number) + 1;
            grid[i][j] = v;
            generated.push({
              grid: grid.map((r) => [...r]),
              activeRow: i,
              activeCol: j,
              referencedCells: [{ row: i - 1, col: j - 1 }],
              explanation: `Match: "${t1[i - 1]}" == "${t2[j - 1]}". dp[${i}][${j}] = 1 + dp[${i - 1}][${j - 1}] = ${v}.`,
              pseudocodeLine: 7,
            });
          } else {
            const up = grid[i - 1][j] as number;
            const left = grid[i][j - 1] as number;
            const best = Math.max(up, left);
            grid[i][j] = best;
            generated.push({
              grid: grid.map((r) => [...r]),
              activeRow: i,
              activeCol: j,
              referencedCells: [
                { row: i - 1, col: j },
                { row: i, col: j - 1 },
              ],
              explanation: `Mismatch: "${t1[i - 1]}" != "${t2[j - 1]}". Take max(up=${up}, left=${left}) = ${best}.`,
              pseudocodeLine: 9,
            });
          }
        }
      }
    }

    return generated;
  }, [problem]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentStepIdx < steps.length - 1) {
        timer = setTimeout(() => setCurrentStepIdx((p) => p + 1), speedMs);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length, speedMs]);

  const step = steps[currentStepIdx] || steps[0];
  const meta = META[problem];

  return (
    <div className="space-y-6">
      {/* Problem Selector */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center gap-2">
        {(Object.keys(META) as DPProblem[]).map((p) => (
          <button
            key={p}
            onClick={() => {
              setProblem(p);
              setCurrentStepIdx(0);
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              problem === p
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {META[p].name.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Main DP Table Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
        <div className="overflow-x-auto pb-2">
          <table className="min-w-max mx-auto border-collapse font-mono text-xs">
            <thead>
              <tr>
                <th className="p-2 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-[10px]">
                  State
                </th>
                {meta.colLabels.map((c, colIdx) => (
                  <th
                    key={colIdx}
                    className="p-2.5 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meta.rowLabels.map((r, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="p-2 border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold text-[11px] whitespace-nowrap">
                    {r}
                  </td>
                  {meta.colLabels.map((_, colIdx) => {
                    const val = step.grid[rowIdx]?.[colIdx];
                    const isActive =
                      step.activeRow === rowIdx && step.activeCol === colIdx;
                    const isReferenced = step.referencedCells?.some(
                      (rc) => rc.row === rowIdx && rc.col === colIdx
                    );

                    const cellBg = isActive
                      ? 'bg-violet-600 text-white font-bold ring-2 ring-violet-400 scale-105 shadow-md'
                      : isReferenced
                      ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-700 dark:text-amber-300 font-bold'
                      : val === '-'
                      ? 'bg-slate-50 dark:bg-slate-900/40 text-slate-300 dark:text-slate-700'
                      : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100';

                    return (
                      <td
                        key={colIdx}
                        className={`w-14 h-12 text-center border border-slate-200 dark:border-slate-800 transition-all duration-300 ${cellBg}`}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-violet-600" />
            <span>Currently Calculating</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400" />
            <span>Referenced Subproblems</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700" />
            <span>Memoized State</span>
          </div>
        </div>
      </div>

      {/* Playback Controls & Pseudocode */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7">
          <StepPlayer
            currentStep={currentStepIdx}
            totalSteps={steps.length}
            isPlaying={isPlaying}
            speedMs={speedMs}
            explanation={step?.explanation}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onNext={() => currentStepIdx < steps.length - 1 && setCurrentStepIdx((p) => p + 1)}
            onPrev={() => currentStepIdx > 0 && setCurrentStepIdx((p) => p - 1)}
            onReset={() => {
              setCurrentStepIdx(0);
              setIsPlaying(false);
            }}
            onSpeedChange={setSpeedMs}
            onStepSelect={(idx) => setCurrentStepIdx(idx)}
          />
        </div>

        <div className="lg:col-span-5">
          <PseudocodePanel
            code={meta.pseudocode}
            activeLine={step?.pseudocodeLine}
            title={`${meta.name.split(' (')[0]} Pseudocode`}
          />
        </div>
      </div>
    </div>
  );
};
