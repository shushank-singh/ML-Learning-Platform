'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { StepPlayer } from '@/components/shared/StepPlayer';
import { PseudocodePanel } from '@/components/shared/PseudocodePanel';
import { Search, RotateCcw, Sparkles } from 'lucide-react';

interface BinarySearchStep {
  low: number;
  high: number;
  mid: number;
  found: boolean;
  explanation: string;
  pseudocodeLine: number;
  eliminatedRange?: [number, number];
}

const PSEUDOCODE = `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid # Target found!
        elif arr[mid] < target:
            low = mid + 1 # Eliminate left half
        else:
            high = mid - 1 # Eliminate right half
    return -1 # Target not present`;

export const BinarySearchVisualizer: React.FC = () => {
  const [arrayStr, setArrayStr] = useState<string>('2, 5, 8, 12, 16, 23, 38, 56, 72, 91');
  const [targetInput, setTargetInput] = useState<number>(23);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);

  // Parse sorted array
  const array = useMemo(() => {
    return arrayStr
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);
  }, [arrayStr]);

  // Generate deterministic steps
  const steps: BinarySearchStep[] = useMemo(() => {
    if (array.length === 0) return [];
    const generated: BinarySearchStep[] = [];

    let low = 0;
    let high = array.length - 1;

    // Step 0: Initialization
    generated.push({
      low,
      high,
      mid: Math.floor((low + high) / 2),
      found: false,
      explanation: `Initialize search bounds: low = 0, high = ${high}. Search space has ${array.length} elements.`,
      pseudocodeLine: 2,
    });

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midVal = array[mid];

      // Comparison step
      generated.push({
        low,
        high,
        mid,
        found: false,
        explanation: `Calculate mid = floor((${low} + ${high}) / 2) = ${mid}. Compare arr[${mid}] (${midVal}) with target ${targetInput}.`,
        pseudocodeLine: 5,
      });

      if (midVal === targetInput) {
        generated.push({
          low,
          high,
          mid,
          found: true,
          explanation: `Match! arr[${mid}] = ${targetInput}. Target found at index ${mid} after ${generated.length} operations.`,
          pseudocodeLine: 7,
        });
        return generated;
      } else if (midVal < targetInput) {
        generated.push({
          low,
          high,
          mid,
          found: false,
          explanation: `arr[${mid}] (${midVal}) < ${targetInput}. Since array is sorted, target cannot be in indices [${low}..${mid}]. Discard left half and update low = ${mid + 1}.`,
          pseudocodeLine: 9,
          eliminatedRange: [low, mid],
        });
        low = mid + 1;
      } else {
        generated.push({
          low,
          high,
          mid,
          found: false,
          explanation: `arr[${mid}] (${midVal}) > ${targetInput}. Since array is sorted, target cannot be in indices [${mid}..${high}]. Discard right half and update high = ${mid - 1}.`,
          pseudocodeLine: 11,
          eliminatedRange: [mid, high],
        });
        high = mid - 1;
      }
    }

    generated.push({
      low,
      high,
      mid: -1,
      found: false,
      explanation: `Search exhausted: low (${low}) > high (${high}). Target ${targetInput} does not exist in array. Return -1.`,
      pseudocodeLine: 12,
    });

    return generated;
  }, [array, targetInput]);

  // Autoplay loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentStepIdx < steps.length - 1) {
        timer = setTimeout(() => {
          setCurrentStepIdx((prev) => prev + 1);
        }, speedMs);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, steps.length, speedMs]);

  const step = steps[currentStepIdx] || steps[0];

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) setCurrentStepIdx((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) setCurrentStepIdx((p) => p - 1);
  };

  return (
    <div className="space-y-6">
      {/* Input customization bar */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <span className="text-xs font-semibold text-slate-500">Sorted Array:</span>
          <input
            type="text"
            value={arrayStr}
            onChange={(e) => {
              setArrayStr(e.target.value);
              handleReset();
            }}
            placeholder="Comma-separated numbers"
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex-1 font-mono"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Target:</span>
          <input
            type="number"
            value={targetInput}
            onChange={(e) => {
              setTargetInput(Number(e.target.value));
              handleReset();
            }}
            className="w-20 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
          />
          <button
            onClick={() => {
              setTargetInput(array[Math.floor(Math.random() * array.length)] || 23);
              handleReset();
            }}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-semibold hover:bg-violet-200 transition-colors"
            title="Pick random array element"
          >
            Random
          </button>
        </div>
      </div>

      {/* Main Visualizer Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-6">
        {/* Array cell grid */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-end justify-center gap-2 min-w-max mx-auto pt-8">
            {array.map((val, idx) => {
              const isLow = step && step.low === idx;
              const isHigh = step && step.high === idx;
              const isMid = step && step.mid === idx;
              const isFound = isMid && step?.found;
              const isOutsideSearch = step && (idx < step.low || idx > step.high);

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  {/* Pointer labels */}
                  <div className="h-6 flex items-center justify-center font-mono text-[10px] font-bold">
                    {isFound && <span className="text-emerald-500 animate-bounce">TARGET!</span>}
                    {!isFound && isMid && <span className="text-violet-600 dark:text-violet-400">MID</span>}
                    {!isFound && !isMid && isLow && isHigh && (
                      <span className="text-indigo-500">L/H</span>
                    )}
                    {!isFound && !isMid && isLow && !isHigh && (
                      <span className="text-blue-500">LOW</span>
                    )}
                    {!isFound && !isMid && !isLow && isHigh && (
                      <span className="text-purple-500">HIGH</span>
                    )}
                  </div>

                  {/* Cell Box */}
                  <div
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-mono font-bold text-sm sm:text-base border-2 transition-all duration-300 ${
                      isFound
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30 scale-105'
                        : isMid
                        ? 'bg-violet-600 border-violet-400 text-white shadow-md shadow-violet-500/30 scale-105'
                        : isLow || isHigh
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                        : isOutsideSearch
                        ? 'bg-slate-100 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400 opacity-40'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {val}
                  </div>

                  {/* Index number */}
                  <span className="text-[10px] font-mono text-slate-400">[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-500" />
            <span>Low Pointer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-500" />
            <span>High Pointer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-violet-600" />
            <span>Mid Element</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500" />
            <span>Match Found</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-700 opacity-50" />
            <span>Eliminated Half</span>
          </div>
        </div>
      </div>

      {/* Playback Controls & Pseudocode Side-by-Side */}
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
            onNext={handleNext}
            onPrev={handlePrev}
            onReset={handleReset}
            onSpeedChange={setSpeedMs}
            onStepSelect={(idx) => setCurrentStepIdx(idx)}
          />
        </div>

        <div className="lg:col-span-5">
          <PseudocodePanel
            code={PSEUDOCODE}
            activeLine={step?.pseudocodeLine}
            title="Binary Search Algorithm"
          />
        </div>
      </div>
    </div>
  );
};
