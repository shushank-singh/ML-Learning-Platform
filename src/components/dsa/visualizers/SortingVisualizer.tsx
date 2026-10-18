'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { StepPlayer } from '@/components/shared/StepPlayer';
import { PseudocodePanel } from '@/components/shared/PseudocodePanel';
import { ArrowUpDown, Shuffle, Sliders } from 'lucide-react';

export type SortAlgorithm = 'bubble' | 'merge' | 'quick' | 'insertion' | 'selection' | 'heap';

interface SortingStep {
  array: number[];
  comparing: number[]; // indices being compared
  swapped: number[]; // indices being swapped or overwritten
  pivot?: number; // pivot index for quicksort
  sorted: number[]; // indices guaranteed sorted
  explanation: string;
  pseudocodeLine: number;
}

const ALGORITHMS: { id: SortAlgorithm; name: string; complexity: string; pseudocode: string }[] = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    pseudocode: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    complexity: 'O(n²)',
    pseudocode: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    complexity: 'O(n²)',
    pseudocode: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    complexity: 'O(n log n)',
    pseudocode: `def merge_sort(arr, l, r):
    if l < r:
        mid = (l + r) // 2
        merge_sort(arr, l, mid)
        merge_sort(arr, mid + 1, r)
        merge(arr, l, mid, r)`,
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    complexity: 'O(n log n)',
    pseudocode: `def quick_sort(arr, low, high):
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)`,
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    complexity: 'O(n log n)',
    pseudocode: `def heap_sort(arr):
    n = len(arr)
    # 1. Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # 2. Extract max element to end
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr`,
  },
];

interface SortingVisualizerProps {
  initialAlgo?: SortAlgorithm;
}

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ initialAlgo = 'bubble' }) => {
  const [selectedAlgo, setSelectedAlgo] = useState<SortAlgorithm>(initialAlgo);
  const [rawArray, setRawArray] = useState<number[]>([42, 17, 85, 33, 9, 61, 24, 76]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(600);

  // Generate deterministic steps based on algorithm
  const steps: SortingStep[] = useMemo(() => {
    const arr = [...rawArray];
    const generated: SortingStep[] = [];

    // Helper to push step
    const pushStep = (
      comparing: number[],
      swapped: number[],
      sorted: number[],
      explanation: string,
      pseudocodeLine: number,
      pivot?: number
    ) => {
      generated.push({
        array: [...arr],
        comparing,
        swapped,
        pivot,
        sorted: [...sorted],
        explanation,
        pseudocodeLine,
      });
    };

    // Initial state
    pushStep([], [], [], `Initial array state with ${arr.length} elements.`, 1);

    if (selectedAlgo === 'bubble') {
      const n = arr.length;
      const sortedIndices: number[] = [];
      for (let i = 0; i < n; i++) {
        let anySwapped = false;
        for (let j = 0; j < n - i - 1; j++) {
          pushStep(
            [j, j + 1],
            [],
            sortedIndices,
            `Compare arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
            5
          );

          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            anySwapped = true;
            pushStep(
              [j, j + 1],
              [j, j + 1],
              sortedIndices,
              `arr[${j}] > arr[${j + 1}] — swap ${arr[j + 1]} and ${arr[j]}.`,
              6
            );
          }
        }
        sortedIndices.push(n - i - 1);
        pushStep([], [], sortedIndices, `Element at index ${n - i - 1} is now in final sorted position.`, 4);
        if (!anySwapped) break;
      }
    } else if (selectedAlgo === 'selection') {
      const n = arr.length;
      const sortedIndices: number[] = [];
      for (let i = 0; i < n; i++) {
        let minIdx = i;
        pushStep([i], [], sortedIndices, `Set minimum candidate to index ${i} (${arr[i]}).`, 4);

        for (let j = i + 1; j < n; j++) {
          pushStep(
            [j, minIdx],
            [],
            sortedIndices,
            `Scan: compare arr[${j}] (${arr[j]}) with current min arr[${minIdx}] (${arr[minIdx]}).`,
            6
          );
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            pushStep([minIdx], [], sortedIndices, `Found new minimum: arr[${minIdx}] (${arr[minIdx]}).`, 7);
          }
        }

        if (minIdx !== i) {
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          pushStep(
            [i, minIdx],
            [i, minIdx],
            sortedIndices,
            `Swap min arr[${minIdx}] into sorted position at index ${i}.`,
            8
          );
        }
        sortedIndices.push(i);
      }
    } else if (selectedAlgo === 'insertion') {
      const sortedIndices = [0];
      for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        pushStep([i], [], sortedIndices, `Pick arr[${i}] (${key}) as key to insert into sorted prefix.`, 3);

        while (j >= 0 && arr[j] > key) {
          pushStep([j, j + 1], [], sortedIndices, `arr[${j}] (${arr[j]}) > key (${key}) — shift right.`, 5);
          arr[j + 1] = arr[j];
          pushStep([], [j + 1], sortedIndices, `Shifted arr[${j}] to index ${j + 1}.`, 6);
          j--;
        }
        arr[j + 1] = key;
        sortedIndices.push(i);
        pushStep([], [j + 1], sortedIndices, `Inserted key ${key} into position ${j + 1}.`, 8);
      }
    } else if (selectedAlgo === 'quick') {
      const sortedIndices: number[] = [];

      const quickSortHelper = (low: number, high: number): void => {
        if (low >= high) {
          if (low === high) sortedIndices.push(low);
          return;
        }

        // Pivot: high
        const pivotVal = arr[high];
        pushStep([], [], sortedIndices, `Choose pivot arr[${high}] (${pivotVal}) for subarray [${low}..${high}].`, 2, high);

        let i = low - 1;
        for (let j = low; j < high; j++) {
          pushStep([j, high], [], sortedIndices, `Compare arr[${j}] (${arr[j]}) with pivot ${pivotVal}.`, 3, high);
          if (arr[j] < pivotVal) {
            i++;
            const tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            pushStep([i, j], [i, j], sortedIndices, `arr[${j}] < pivot: swap arr[${i}] and arr[${j}].`, 3, high);
          }
        }

        // Place pivot in sorted place
        const tmp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = tmp;
        const pivotIdx = i + 1;
        sortedIndices.push(pivotIdx);
        pushStep([pivotIdx], [pivotIdx], sortedIndices, `Place pivot ${pivotVal} into final partitioned index ${pivotIdx}.`, 4, pivotIdx);

        quickSortHelper(low, pivotIdx - 1);
        quickSortHelper(pivotIdx + 1, high);
      };

      quickSortHelper(0, arr.length - 1);
    } else if (selectedAlgo === 'merge') {
      const sortedIndices: number[] = [];

      const mergeSortHelper = (l: number, r: number): void => {
        if (l >= r) return;
        const mid = Math.floor((l + r) / 2);

        pushStep([], [], sortedIndices, `Split subarray [${l}..${r}] at mid index ${mid}.`, 3);
        mergeSortHelper(l, mid);
        mergeSortHelper(mid + 1, r);

        // Merge
        const leftArr = arr.slice(l, mid + 1);
        const rightArr = arr.slice(mid + 1, r + 1);
        let i = 0, j = 0, k = l;

        pushStep([], [], sortedIndices, `Begin merging sorted halves [${l}..${mid}] and [${mid + 1}..${r}].`, 6);

        while (i < leftArr.length && j < rightArr.length) {
          pushStep([l + i, mid + 1 + j], [], sortedIndices, `Compare left (${leftArr[i]}) with right (${rightArr[j]}).`, 6);
          if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            pushStep([], [k], sortedIndices, `Write ${leftArr[i]} to index ${k}.`, 6);
            i++;
          } else {
            arr[k] = rightArr[j];
            pushStep([], [k], sortedIndices, `Write ${rightArr[j]} to index ${k}.`, 6);
            j++;
          }
          k++;
        }

        while (i < leftArr.length) {
          arr[k] = leftArr[i];
          pushStep([], [k], sortedIndices, `Copy remaining left element ${leftArr[i]} to index ${k}.`, 6);
          i++;
          k++;
        }
        while (j < rightArr.length) {
          arr[k] = rightArr[j];
          pushStep([], [k], sortedIndices, `Copy remaining right element ${rightArr[j]} to index ${k}.`, 6);
          j++;
          k++;
        }

        for (let idx = l; idx <= r; idx++) {
          if (!sortedIndices.includes(idx)) sortedIndices.push(idx);
        }
      };

      mergeSortHelper(0, arr.length - 1);
    } else if (selectedAlgo === 'heap') {
      const n = arr.length;
      const sortedIndices: number[] = [];

      const heapify = (size: number, i: number) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < size) {
          pushStep([largest, left], [], sortedIndices, `Compare parent arr[${largest}] (${arr[largest]}) with left child arr[${left}] (${arr[left]}).`, 5);
          if (arr[left] > arr[largest]) {
            largest = left;
          }
        }
        if (right < size) {
          pushStep([largest, right], [], sortedIndices, `Compare current largest (${arr[largest]}) with right child arr[${right}] (${arr[right]}).`, 5);
          if (arr[right] > arr[largest]) {
            largest = right;
          }
        }

        if (largest !== i) {
          const temp = arr[i];
          arr[i] = arr[largest];
          arr[largest] = temp;
          pushStep([i, largest], [i, largest], sortedIndices, `Violation of max-heap property: swap arr[${i}] and arr[${largest}].`, 5);
          heapify(size, largest);
        }
      };

      // 1. Build max heap
      pushStep([], [], sortedIndices, 'Phase 1: Build max heap starting from lowest non-leaf node.', 4);
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
      }
      pushStep([], [], sortedIndices, `Max heap successfully built! Root arr[0] (${arr[0]}) is the global maximum.`, 5);

      // 2. Extract elements
      for (let i = n - 1; i > 0; i--) {
        pushStep([0, i], [0, i], sortedIndices, `Phase 2: Swap max element arr[0] (${arr[0]}) with end element arr[${i}] (${arr[i]}).`, 8);
        const temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        sortedIndices.push(i);
        pushStep([], [], sortedIndices, `Element arr[${i}] (${arr[i]}) locked into final sorted position.`, 8);
        heapify(i, 0);
      }
      sortedIndices.push(0);
    }

    // Final sorted state
    pushStep(
      [],
      [],
      Array.from({ length: arr.length }, (_, idx) => idx),
      `Sorting complete! All ${arr.length} elements verified in non-decreasing order.`,
      ALGORITHMS.find((a) => a.id === selectedAlgo)?.pseudocode.split('\n').length || 1
    );

    return generated;
  }, [selectedAlgo, rawArray]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentStepIdx < steps.length - 1) {
        timer = setTimeout(() => {
          setCurrentStepIdx((p) => p + 1);
        }, speedMs);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length, speedMs]);

  const step = steps[currentStepIdx] || steps[0];
  const maxVal = Math.max(...rawArray, 100);

  const randomize = () => {
    const randomized = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
    setRawArray(randomized);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const currentAlgoMeta = ALGORITHMS.find((a) => a.id === selectedAlgo);

  return (
    <div className="space-y-6">
      {/* Algorithm selector pills & presets */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {ALGORITHMS.map((algo) => (
            <button
              key={algo.id}
              onClick={() => {
                setSelectedAlgo(algo.id);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedAlgo === algo.id
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {algo.name} <span className="opacity-70 font-mono text-[10px]">({algo.complexity})</span>
            </button>
          ))}
        </div>

        <button
          onClick={randomize}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Randomize</span>
        </button>
      </div>

      {/* Main Sorting Bar Chart Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-6">
        <div className="h-64 flex items-end justify-center gap-2 sm:gap-3 px-2 pt-6">
          {step.array.map((val, idx) => {
            const isComparing = step.comparing.includes(idx);
            const isSwapped = step.swapped.includes(idx);
            const isPivot = step.pivot === idx;
            const isSorted = step.sorted.includes(idx);
            const heightPercent = Math.max(12, Math.round((val / maxVal) * 100));

            const barColor = isPivot
              ? 'bg-purple-600 border-purple-400 text-white'
              : isSwapped
              ? 'bg-red-500 border-red-400 text-white'
              : isComparing
              ? 'bg-amber-500 border-amber-400 text-white animate-pulse'
              : isSorted
              ? 'bg-emerald-500 border-emerald-400 text-white'
              : 'bg-violet-500/70 border-violet-400/80 text-white';

            return (
              <div key={idx} className="flex-1 max-w-[56px] flex flex-col items-center gap-1.5 h-full justify-end">
                {/* Value on top of bar */}
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  {val}
                </span>

                {/* Animated bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-xl border-t-2 border-x-2 transition-all duration-300 flex items-center justify-center ${barColor}`}
                />

                {/* Index label */}
                <span className="font-mono text-[10px] text-slate-400">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500" />
            <span>Swapping / Writing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-600" />
            <span>Pivot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500" />
            <span>Sorted</span>
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
            code={currentAlgoMeta?.pseudocode || ''}
            activeLine={step?.pseudocodeLine}
            title={`${currentAlgoMeta?.name} Pseudocode`}
          />
        </div>
      </div>
    </div>
  );
};
