'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Play,
  Pause,
  RotateCcw,
  Search,
  ArrowUpDown,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

type AlgorithmMode = 'binary-search' | 'bubble-sort' | 'selection-sort';

interface Step {
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
  pointers?: Record<string, number>;
  explanation: string;
}

export const JavaArrayAlgorithmVisualizer: React.FC = () => {
  const [mode, setMode] = useState<AlgorithmMode>('binary-search');
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Precomputed steps for smooth, glitch-free visualization
  const binarySearchSteps: Step[] = [
    {
      array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      pointers: { low: 0, high: 9 },
      explanation: 'Target value to find: 23. Initialize low = 0, high = 9.',
    },
    {
      array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      comparingIndices: [4],
      swappingIndices: [],
      sortedIndices: [],
      pointers: { low: 0, mid: 4, high: 9 },
      explanation: 'Compute mid = (0 + 9) / 2 = 4. arr[4] is 16. 23 > 16, so search right half: low = mid + 1 (5).',
    },
    {
      array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      comparingIndices: [7],
      swappingIndices: [],
      sortedIndices: [],
      pointers: { low: 5, mid: 7, high: 9 },
      explanation: 'Compute mid = (5 + 9) / 2 = 7. arr[7] is 56. 23 < 56, so search left half: high = mid - 1 (6).',
    },
    {
      array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      comparingIndices: [5],
      swappingIndices: [],
      sortedIndices: [5],
      pointers: { low: 5, mid: 5, high: 6 },
      explanation: 'Compute mid = (5 + 6) / 2 = 5. arr[5] is 23! Target MATCH found at index 5 in O(log n) time!',
    },
  ];

  const bubbleSortSteps: Step[] = [
    {
      array: [45, 12, 85, 32, 10],
      comparingIndices: [0, 1],
      swappingIndices: [0, 1],
      sortedIndices: [],
      explanation: 'Compare arr[0] (45) with arr[1] (12). 45 > 12 -> Swap!',
    },
    {
      array: [12, 45, 85, 32, 10],
      comparingIndices: [1, 2],
      swappingIndices: [],
      sortedIndices: [],
      explanation: 'Compare arr[1] (45) with arr[2] (85). 45 <= 85 -> No swap.',
    },
    {
      array: [12, 45, 85, 32, 10],
      comparingIndices: [2, 3],
      swappingIndices: [2, 3],
      sortedIndices: [],
      explanation: 'Compare arr[2] (85) with arr[3] (32). 85 > 32 -> Swap!',
    },
    {
      array: [12, 45, 32, 85, 10],
      comparingIndices: [3, 4],
      swappingIndices: [3, 4],
      sortedIndices: [],
      explanation: 'Compare arr[3] (85) with arr[4] (10). 85 > 10 -> Swap!',
    },
    {
      array: [12, 45, 32, 10, 85],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [4],
      explanation: 'Pass 1 complete: largest element (85) has bubbled to the final index.',
    },
    {
      array: [12, 32, 10, 45, 85],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [3, 4],
      explanation: 'Pass 2 complete: second largest element (45) locked in place.',
    },
    {
      array: [10, 12, 32, 45, 85],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [0, 1, 2, 3, 4],
      explanation: 'Sorting complete! Array is completely sorted in ascending order.',
    },
  ];

  const selectionSortSteps: Step[] = [
    {
      array: [64, 25, 12, 22, 11],
      comparingIndices: [0, 4],
      swappingIndices: [0, 4],
      sortedIndices: [],
      pointers: { minIdx: 4 },
      explanation: 'Find minimum in entire array: 11 at index 4. Swap arr[0] (64) with arr[4] (11).',
    },
    {
      array: [11, 25, 12, 22, 64],
      comparingIndices: [1, 2],
      swappingIndices: [1, 2],
      sortedIndices: [0],
      pointers: { minIdx: 2 },
      explanation: 'Find minimum in subarray [1..4]: 12 at index 2. Swap arr[1] (25) with arr[2] (12).',
    },
    {
      array: [11, 12, 25, 22, 64],
      comparingIndices: [2, 3],
      swappingIndices: [2, 3],
      sortedIndices: [0, 1],
      pointers: { minIdx: 3 },
      explanation: 'Find minimum in subarray [2..4]: 22 at index 3. Swap arr[2] (25) with arr[3] (22).',
    },
    {
      array: [11, 12, 22, 25, 64],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [0, 1, 2, 3, 4],
      explanation: 'Subarray sorted! All elements in strictly ascending order.',
    },
  ];

  const steps =
    mode === 'binary-search'
      ? binarySearchSteps
      : mode === 'bubble-sort'
      ? bubbleSortSteps
      : selectionSortSteps;

  const current = steps[Math.min(stepIdx, steps.length - 1)];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (stepIdx < steps.length - 1) {
          setStepIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1400);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, stepIdx, steps.length]);

  const handleNext = () => {
    if (stepIdx < steps.length - 1) setStepIdx(stepIdx + 1);
  };

  const handlePrev = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIdx(0);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <BarChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Interactive Java Array & Algorithm Animator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Visualize block elements, index bounds, comparisons, swaps, and pointer movements
            </p>
          </div>
        </div>

        {/* Algorithm mode switcher */}
        <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
          <button
            onClick={() => {
              setMode('binary-search');
              setStepIdx(0);
              setIsPlaying(false);
            }}
            className={`px-3 py-1 rounded-md transition-all ${
              mode === 'binary-search'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Binary Search
          </button>
          <button
            onClick={() => {
              setMode('bubble-sort');
              setStepIdx(0);
              setIsPlaying(false);
            }}
            className={`px-3 py-1 rounded-md transition-all ${
              mode === 'bubble-sort'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => {
              setMode('selection-sort');
              setStepIdx(0);
              setIsPlaying(false);
            }}
            className={`px-3 py-1 rounded-md transition-all ${
              mode === 'selection-sort'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Selection Sort
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              onClick={handlePrev}
              disabled={stepIdx === 0}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold disabled:opacity-40"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={stepIdx === steps.length - 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold disabled:opacity-40"
            >
              Next
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Step {stepIdx + 1} of {steps.length}
          </div>
        </div>

        {/* Visual Array Blocks */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
          <div className="flex flex-wrap items-end justify-center gap-2.5 sm:gap-3 py-4">
            {current.array.map((val, idx) => {
              const isComparing = current.comparingIndices.includes(idx);
              const isSwapping = current.swappingIndices.includes(idx);
              const isSorted = current.sortedIndices.includes(idx);

              // Height based on value for bar visual
              const heightPx = Math.max(48, Math.min(130, val * 1.3));

              return (
                <div key={idx} className="flex flex-col items-center">
                  {/* Pointer labels above block */}
                  <div className="h-6 flex items-center justify-center font-mono text-[10px] font-bold">
                    {current.pointers?.mid === idx && (
                      <span className="text-amber-500 bg-amber-100 dark:bg-amber-950 px-1 rounded">
                        mid
                      </span>
                    )}
                    {current.pointers?.low === idx && (
                      <span className="text-sky-500 bg-sky-100 dark:bg-sky-950 px-1 rounded">
                        low
                      </span>
                    )}
                    {current.pointers?.high === idx && (
                      <span className="text-indigo-500 bg-indigo-100 dark:bg-indigo-950 px-1 rounded">
                        high
                      </span>
                    )}
                  </div>

                  {/* Block */}
                  <div
                    style={{ height: `${heightPx}px` }}
                    className={`w-11 sm:w-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-sm transition-all duration-300 shadow-sm ${
                      isSwapping
                        ? 'border-red-500 bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 ring-2 ring-red-500 scale-105'
                        : isComparing
                        ? 'border-amber-500 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 ring-2 ring-amber-500'
                        : isSorted
                        ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>{val}</span>
                  </div>

                  {/* Array Index underneath */}
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    [{idx}]
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanation Banner */}
          <div className="mt-4 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 text-center font-medium">
            {current.explanation}
          </div>
        </div>
      </div>
    </div>
  );
};
