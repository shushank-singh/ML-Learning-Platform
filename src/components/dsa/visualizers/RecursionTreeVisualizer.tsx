'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { StepPlayer } from '@/components/shared/StepPlayer';
import { PseudocodePanel } from '@/components/shared/PseudocodePanel';
import { GitBranch } from 'lucide-react';

export type RecursionExample = 'fibonacci' | 'subsets';

interface RecNode {
  id: number;
  label: string;
  x: number;
  y: number;
  parentId?: number;
  returnVal?: number | string;
}

interface RecStep {
  activeNodeId?: number;
  expandedNodeIds: number[];
  callStack: string[];
  explanation: string;
  pseudocodeLine: number;
}

const FIB_NODES: RecNode[] = [
  { id: 1, label: 'fib(4)', x: 260, y: 35, returnVal: 3 },
  { id: 2, label: 'fib(3)', x: 140, y: 95, parentId: 1, returnVal: 2 },
  { id: 3, label: 'fib(2)', x: 380, y: 95, parentId: 1, returnVal: 1 },
  { id: 4, label: 'fib(2)', x: 80, y: 165, parentId: 2, returnVal: 1 },
  { id: 5, label: 'fib(1)', x: 195, y: 165, parentId: 2, returnVal: 1 },
  { id: 6, label: 'fib(1)', x: 325, y: 165, parentId: 3, returnVal: 1 },
  { id: 7, label: 'fib(0)', x: 435, y: 165, parentId: 3, returnVal: 0 },
  { id: 8, label: 'fib(1)', x: 45, y: 230, parentId: 4, returnVal: 1 },
  { id: 9, label: 'fib(0)', x: 115, y: 230, parentId: 4, returnVal: 0 },
];

const PSEUDOCODE_FIB = `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`;

export const RecursionTreeVisualizer: React.FC = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);

  const steps: RecStep[] = useMemo(() => {
    const sequence = [
      { id: 1, stack: ['fib(4)'], line: 1, exp: 'Call fib(4) — push to Call Stack.' },
      { id: 2, stack: ['fib(4)', 'fib(3)'], line: 4, exp: 'fib(4) calls fib(3) — push to Call Stack.' },
      { id: 4, stack: ['fib(4)', 'fib(3)', 'fib(2)'], line: 4, exp: 'fib(3) calls fib(2) — push to Call Stack.' },
      { id: 8, stack: ['fib(4)', 'fib(3)', 'fib(2)', 'fib(1)'], line: 2, exp: 'Base case fib(1)=1. Return 1, pop from Call Stack.' },
      { id: 9, stack: ['fib(4)', 'fib(3)', 'fib(2)', 'fib(0)'], line: 2, exp: 'Base case fib(0)=0. Return 0, pop from Call Stack.' },
      { id: 4, stack: ['fib(4)', 'fib(3)', 'fib(2)'], line: 4, exp: 'fib(2) = 1 + 0 = 1. Return 1, pop from Call Stack.' },
      { id: 5, stack: ['fib(4)', 'fib(3)', 'fib(1)'], line: 2, exp: 'Base case fib(1)=1. Return 1, pop from Call Stack.' },
      { id: 2, stack: ['fib(4)', 'fib(3)'], line: 4, exp: 'fib(3) = 1 + 1 = 2. Return 2, pop from Call Stack.' },
      { id: 3, stack: ['fib(4)', 'fib(2)'], line: 4, exp: 'fib(4) calls right branch fib(2) (redundant subproblem!).' },
      { id: 6, stack: ['fib(4)', 'fib(2)', 'fib(1)'], line: 2, exp: 'Base case fib(1)=1. Return 1.' },
      { id: 7, stack: ['fib(4)', 'fib(2)', 'fib(0)'], line: 2, exp: 'Base case fib(0)=0. Return 0.' },
      { id: 3, stack: ['fib(4)', 'fib(2)'], line: 4, exp: 'fib(2) = 1 + 0 = 1. Return 1.' },
      { id: 1, stack: ['fib(4)'], line: 4, exp: 'fib(4) = fib(3)[2] + fib(2)[1] = 3. Final answer returned!' },
    ];

    const generated: RecStep[] = [];
    const expanded: number[] = [];

    generated.push({
      expandedNodeIds: [],
      callStack: [],
      explanation: 'Initialize recursion call stack. Naive recursion exhibits O(2^n) exponential tree growth.',
      pseudocodeLine: 1,
    });

    sequence.forEach((s) => {
      if (!expanded.includes(s.id)) expanded.push(s.id);
      generated.push({
        activeNodeId: s.id,
        expandedNodeIds: [...expanded],
        callStack: s.stack,
        explanation: s.exp,
        pseudocodeLine: s.line,
      });
    });

    return generated;
  }, []);

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

  return (
    <div className="space-y-6">
      {/* Visual Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
        <div className="w-full flex justify-center overflow-x-auto">
          <svg viewBox="0 0 520 280" className="w-full max-w-lg h-auto select-none">
            {/* Edges */}
            {FIB_NODES.map((node) => {
              if (!node.parentId) return null;
              const parent = FIB_NODES.find((n) => n.id === node.parentId)!;
              const isRendered = step.expandedNodeIds.includes(node.id);

              return (
                <line
                  key={`edge-${node.id}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={node.x}
                  y2={node.y}
                  className={`transition-all duration-300 ${
                    isRendered
                      ? 'stroke-slate-300 dark:stroke-slate-600 stroke-2'
                      : 'opacity-10 stroke-slate-200 dark:stroke-slate-800'
                  }`}
                />
              );
            })}

            {/* Nodes */}
            {FIB_NODES.map((node) => {
              const isActive = step.activeNodeId === node.id;
              const isRendered = step.expandedNodeIds.includes(node.id);

              return (
                <g key={`node-${node.id}`} className="transition-all duration-300">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'fill-violet-600 stroke-violet-300 stroke-3 filter drop-shadow'
                        : isRendered
                        ? 'fill-white dark:fill-slate-800 stroke-violet-500 stroke-2'
                        : 'fill-slate-100 dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800 opacity-20'
                    }`}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className={`font-mono font-bold text-[10px] select-none pointer-events-none ${
                      isActive
                        ? 'fill-white'
                        : isRendered
                        ? 'fill-slate-800 dark:fill-slate-200'
                        : 'fill-slate-400'
                    }`}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Live Call Stack Inspector */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 font-sans font-semibold">Active Call Stack:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {step.callStack.length === 0 ? (
              <span className="text-slate-400 italic font-sans">[ empty stack ]</span>
            ) : (
              step.callStack.map((frame, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    i === step.callStack.length - 1
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {frame}
                </span>
              ))
            )}
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
            code={PSEUDOCODE_FIB}
            activeLine={step?.pseudocodeLine}
            title="Recursive Fibonacci Pseudocode"
          />
        </div>
      </div>
    </div>
  );
};
