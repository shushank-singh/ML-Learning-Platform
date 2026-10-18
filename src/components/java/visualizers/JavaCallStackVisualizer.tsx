'use client';

import React, { useState } from 'react';
import {
  Layers,
  ArrowDown,
  ArrowUp,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Play,
  CheckCircle,
} from 'lucide-react';

interface StackFrame {
  id: string;
  methodName: string;
  parameters: Record<string, any>;
  localVars: Record<string, any>;
  status: 'active' | 'waiting' | 'returning';
  returnValue?: any;
}

interface RecursionStep {
  stepNum: number;
  phase: 'push' | 'base-case' | 'pop';
  codeLine: string;
  frames: StackFrame[];
  explanation: string;
}

const FACTORIAL_STEPS: RecursionStep[] = [
  {
    stepNum: 1,
    phase: 'push',
    codeLine: 'factorial(3); // Called from main()',
    frames: [
      { id: 'f-main', methodName: 'main(String[] args)', parameters: {}, localVars: { result: 'pending' }, status: 'waiting' },
      { id: 'f-3', methodName: 'factorial(int n)', parameters: { n: 3 }, localVars: {}, status: 'active' },
    ],
    explanation: 'main() calls factorial(3). A new stack frame for factorial(n=3) is pushed onto the JVM call stack.',
  },
  {
    stepNum: 2,
    phase: 'push',
    codeLine: 'return 3 * factorial(2);',
    frames: [
      { id: 'f-main', methodName: 'main(String[] args)', parameters: {}, localVars: { result: 'pending' }, status: 'waiting' },
      { id: 'f-3', methodName: 'factorial(int n)', parameters: { n: 3 }, localVars: { waitingFor: 'factorial(2)' }, status: 'waiting' },
      { id: 'f-2', methodName: 'factorial(int n)', parameters: { n: 2 }, localVars: {}, status: 'active' },
    ],
    explanation: 'factorial(3) cannot compute without factorial(2). Stack pushes factorial(n=2). Stack depth: 3 frames.',
  },
  {
    stepNum: 3,
    phase: 'push',
    codeLine: 'return 2 * factorial(1);',
    frames: [
      { id: 'f-main', methodName: 'main(String[] args)', parameters: {}, localVars: { result: 'pending' }, status: 'waiting' },
      { id: 'f-3', methodName: 'factorial(int n)', parameters: { n: 3 }, localVars: { waitingFor: 'factorial(2)' }, status: 'waiting' },
      { id: 'f-2', methodName: 'factorial(int n)', parameters: { n: 2 }, localVars: { waitingFor: 'factorial(1)' }, status: 'waiting' },
      { id: 'f-1', methodName: 'factorial(int n)', parameters: { n: 1 }, localVars: {}, status: 'active' },
    ],
    explanation: 'factorial(2) calls factorial(1). Stack frame factorial(n=1) is pushed. Maximum call stack depth reached (4 frames).',
  },
  {
    stepNum: 4,
    phase: 'base-case',
    codeLine: 'if (n <= 1) return 1; // Base case reached!',
    frames: [
      { id: 'f-main', methodName: 'main(String[] args)', parameters: {}, localVars: { result: 'pending' }, status: 'waiting' },
      { id: 'f-3', methodName: 'factorial(int n)', parameters: { n: 3 }, localVars: { waitingFor: 'factorial(2)' }, status: 'waiting' },
      { id: 'f-2', methodName: 'factorial(int n)', parameters: { n: 2 }, localVars: { waitingFor: 'factorial(1)' }, status: 'waiting' },
      { id: 'f-1', methodName: 'factorial(int n)', parameters: { n: 1 }, localVars: {}, status: 'returning', returnValue: 1 },
    ],
    explanation: 'Base case n <= 1 is met! factorial(1) evaluates directly to 1 without any further recursion.',
  },
  {
    stepNum: 5,
    phase: 'pop',
    codeLine: 'return 2 * 1 = 2; // Popping factorial(1)',
    frames: [
      { id: 'f-main', methodName: 'main(String[] args)', parameters: {}, localVars: { result: 'pending' }, status: 'waiting' },
      { id: 'f-3', methodName: 'factorial(int n)', parameters: { n: 3 }, localVars: { waitingFor: 'factorial(2)' }, status: 'waiting' },
      { id: 'f-2', methodName: 'factorial(int n)', parameters: { n: 2 }, localVars: {}, status: 'returning', returnValue: 2 },
    ],
    explanation: 'factorial(1) popped off stack, delivering 1 to factorial(2). factorial(2) calculates 2 * 1 = 2 and returns 2.',
  },
  {
    stepNum: 6,
    phase: 'pop',
    codeLine: 'return 3 * 2 = 6; // Popping factorial(2)',
    frames: [
      { id: 'f-main', methodName: 'main(String[] args)', parameters: {}, localVars: { result: 'pending' }, status: 'waiting' },
      { id: 'f-3', methodName: 'factorial(int n)', parameters: { n: 3 }, localVars: {}, status: 'returning', returnValue: 6 },
    ],
    explanation: 'factorial(2) frame popped off stack. factorial(3) computes 3 * 2 = 6 and returns 6 back to main().',
  },
  {
    stepNum: 7,
    phase: 'pop',
    codeLine: 'result = 6; // Popping factorial(3)',
    frames: [
      { id: 'f-main', methodName: 'main(String[] args)', parameters: {}, localVars: { result: 6 }, status: 'active' },
    ],
    explanation: 'factorial(3) popped off. main() receives 6! Stack unwinding complete.',
  },
];

export const JavaCallStackVisualizer: React.FC = () => {
  const [stepIdx, setStepIdx] = useState<number>(0);

  const step = FACTORIAL_STEPS[stepIdx];

  const handleNext = () => {
    if (stepIdx < FACTORIAL_STEPS.length - 1) setStepIdx(stepIdx + 1);
  };

  const handlePrev = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  const handleReset = () => {
    setStepIdx(0);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Interactive Java Call Stack & Recursion Unwinding
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trace stack frame allocations, parameter passing, and base case return flow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Stack Depth: <strong className="text-violet-600 dark:text-violet-400">{step.frames.length} frames</strong>
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Step tracker card */}
        <div className="p-4 rounded-xl border border-violet-100 dark:border-violet-950/60 bg-violet-50/40 dark:bg-violet-950/20">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-violet-600 text-white">
                Step {step.stepNum} of {FACTORIAL_STEPS.length}
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-violet-900 dark:text-violet-200">
                {step.phase === 'push' && '⬆ Stack Frame Allocation (Push)'}
                {step.phase === 'base-case' && '🎯 Base Case Reached'}
                {step.phase === 'pop' && '⬇ Return Value Flow (Unwinding/Pop)'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={stepIdx === 0}
                className="px-2.5 py-1 text-xs font-semibold rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={stepIdx === FACTORIAL_STEPS.length - 1}
                className="px-3 py-1 text-xs font-semibold rounded bg-violet-600 text-white disabled:opacity-40"
              >
                Next Step →
              </button>
              <button
                onClick={handleReset}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-slate-950 text-emerald-400 font-mono text-sm px-3.5 py-2 rounded-lg border border-slate-800 flex items-center justify-between">
            <code>{step.codeLine}</code>
            <span className="text-[11px] text-slate-500 font-sans">Active Call</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {step.explanation}
          </p>
        </div>

        {/* Visual Call Stack Diagram (LIFO - Top of Stack is rendered at top) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>▲ Top of Call Stack (Active Frame)</span>
            <span>Bottom of Stack (main) ▼</span>
          </div>

          {/* Reverse render so top frame appears visually on top */}
          <div className="space-y-2.5">
            {[...step.frames].reverse().map((frame, rIdx) => {
              const isTop = rIdx === 0;
              return (
                <div
                  key={frame.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isTop
                      ? 'border-violet-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-violet-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-slate-100">
                        {frame.methodName}
                      </span>
                      {isTop && (
                        <span className="px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300 text-[10px] font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] font-mono">
                      {frame.status === 'returning' ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Returns: {frame.returnValue}
                        </span>
                      ) : frame.status === 'waiting' ? (
                        <span className="text-amber-500 font-medium">Suspended (Waiting for return)</span>
                      ) : (
                        <span className="text-violet-600 font-bold">Executing</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">
                        Parameters:
                      </span>
                      {Object.keys(frame.parameters).length === 0 ? (
                        <span className="text-slate-400 italic">None</span>
                      ) : (
                        Object.entries(frame.parameters).map(([pName, pVal]) => (
                          <div key={pName} className="text-slate-700 dark:text-slate-300">
                            <span className="text-slate-400">{pName} = </span>
                            <span className="font-bold text-violet-600 dark:text-violet-400">{pVal}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">
                        Local Variables:
                      </span>
                      {Object.keys(frame.localVars).length === 0 ? (
                        <span className="text-slate-400 italic">None</span>
                      ) : (
                        Object.entries(frame.localVars).map(([lName, lVal]) => (
                          <div key={lName} className="text-slate-700 dark:text-slate-300">
                            <span className="text-slate-400">{lName} = </span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{lVal}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
