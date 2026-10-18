'use client';

import React, { useState, useEffect, useRef } from 'react';
import { StepPlayer } from '@/components/shared/StepPlayer';
import { Terminal, Layers, Variable, Play, RotateCcw, Check } from 'lucide-react';

interface VariableState {
  name: string;
  type: string;
  value: string;
  scope: 'global' | 'local';
}

interface StackFrame {
  name: string;
  line: number;
  locals: Record<string, string>;
}

interface ExecutionStep {
  line: number;
  explanation: string;
  variables: VariableState[];
  callStack: StackFrame[];
  stdout?: string;
  highlightVar?: string;
}

interface ExecutionScenario {
  id: string;
  name: string;
  description: string;
  code: string[];
  steps: ExecutionStep[];
}

const SCENARIOS: ExecutionScenario[] = [
  {
    id: 'variables-rebinding',
    name: 'Variable Rebinding & Types',
    description: 'Watch how Python variables are labels pointing to objects, not fixed memory slots.',
    code: [
      'x = 10',
      'y = x',
      'x = "python"',
      'y = y + 5',
      'print(x, y)',
    ],
    steps: [
      {
        line: 0,
        explanation: 'Line 1: Python creates an integer object 10 in memory and binds label "x" to it.',
        variables: [{ name: 'x', type: 'int', value: '10', scope: 'global' }],
        callStack: [{ name: '<module>', line: 1, locals: {} }],
        highlightVar: 'x',
      },
      {
        line: 1,
        explanation: 'Line 2: "y" is assigned the value of "x". "y" now points to the exact same int 10.',
        variables: [
          { name: 'x', type: 'int', value: '10', scope: 'global' },
          { name: 'y', type: 'int', value: '10', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 2, locals: {} }],
        highlightVar: 'y',
      },
      {
        line: 2,
        explanation: 'Line 3: Dynamic typing! "x" is rebound to a string object "python". "y" still points to 10.',
        variables: [
          { name: 'x', type: 'str', value: '"python"', scope: 'global' },
          { name: 'y', type: 'int', value: '10', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 3, locals: {} }],
        highlightVar: 'x',
      },
      {
        line: 3,
        explanation: 'Line 4: "y + 5" evaluates to 15. A new integer 15 is created and "y" points to it.',
        variables: [
          { name: 'x', type: 'str', value: '"python"', scope: 'global' },
          { name: 'y', type: 'int', value: '15', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 4, locals: {} }],
        highlightVar: 'y',
      },
      {
        line: 4,
        explanation: 'Line 5: print(x, y) reads current values and outputs to stdout console.',
        variables: [
          { name: 'x', type: 'str', value: '"python"', scope: 'global' },
          { name: 'y', type: 'int', value: '15', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 5, locals: {} }],
        stdout: 'python 15\n',
      },
    ],
  },
  {
    id: 'function-call-stack',
    name: 'Function Calls & Stack Frames',
    description: 'Track frame creation, parameter passing, local scope, and return values.',
    code: [
      'def square(n):',
      '    result = n * n',
      '    return result',
      '',
      'def sum_sq(a, b):',
      '    return square(a) + square(b)',
      '',
      'ans = sum_sq(3, 4)',
    ],
    steps: [
      {
        line: 0,
        explanation: 'Lines 1-6: Function definitions "square" and "sum_sq" are compiled into function objects in global scope.',
        variables: [
          { name: 'square', type: 'function', value: '<function square>', scope: 'global' },
          { name: 'sum_sq', type: 'function', value: '<function sum_sq>', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 1, locals: {} }],
      },
      {
        line: 7,
        explanation: 'Line 8: Invoking sum_sq(3, 4). A new stack frame "sum_sq" is pushed with params a=3, b=4.',
        variables: [
          { name: 'square', type: 'function', value: '<function square>', scope: 'global' },
          { name: 'sum_sq', type: 'function', value: '<function sum_sq>', scope: 'global' },
          { name: 'a', type: 'int', value: '3', scope: 'local' },
          { name: 'b', type: 'int', value: '4', scope: 'local' },
        ],
        callStack: [
          { name: '<module>', line: 8, locals: {} },
          { name: 'sum_sq(a=3, b=4)', line: 5, locals: { a: '3', b: '4' } },
        ],
      },
      {
        line: 5,
        explanation: 'Inside sum_sq: evaluating first term "square(a)" where a=3. Pushing frame "square".',
        variables: [
          { name: 'n', type: 'int', value: '3', scope: 'local' },
        ],
        callStack: [
          { name: '<module>', line: 8, locals: {} },
          { name: 'sum_sq(a=3, b=4)', line: 6, locals: { a: '3', b: '4' } },
          { name: 'square(n=3)', line: 1, locals: { n: '3' } },
        ],
      },
      {
        line: 1,
        explanation: 'Inside square(3): computes result = 3 * 3 = 9.',
        variables: [
          { name: 'n', type: 'int', value: '3', scope: 'local' },
          { name: 'result', type: 'int', value: '9', scope: 'local' },
        ],
        callStack: [
          { name: '<module>', line: 8, locals: {} },
          { name: 'sum_sq(a=3, b=4)', line: 6, locals: { a: '3', b: '4' } },
          { name: 'square(n=3)', line: 2, locals: { n: '3', result: '9' } },
        ],
        highlightVar: 'result',
      },
      {
        line: 2,
        explanation: 'square(3) returns 9. The frame square is popped from the stack.',
        variables: [
          { name: 'a', type: 'int', value: '3', scope: 'local' },
          { name: 'b', type: 'int', value: '4', scope: 'local' },
        ],
        callStack: [
          { name: '<module>', line: 8, locals: {} },
          { name: 'sum_sq(a=3, b=4)', line: 6, locals: { a: '3', b: '4' } },
        ],
      },
      {
        line: 5,
        explanation: 'Inside sum_sq: now evaluating second term "square(b)" where b=4. Pushing frame "square".',
        variables: [
          { name: 'n', type: 'int', value: '4', scope: 'local' },
        ],
        callStack: [
          { name: '<module>', line: 8, locals: {} },
          { name: 'sum_sq(a=3, b=4)', line: 6, locals: { a: '3', b: '4' } },
          { name: 'square(n=4)', line: 1, locals: { n: '4' } },
        ],
      },
      {
        line: 1,
        explanation: 'Inside square(4): computes result = 4 * 4 = 16 and returns 16.',
        variables: [
          { name: 'n', type: 'int', value: '4', scope: 'local' },
          { name: 'result', type: 'int', value: '16', scope: 'local' },
        ],
        callStack: [
          { name: '<module>', line: 8, locals: {} },
          { name: 'sum_sq(a=3, b=4)', line: 2, locals: { n: '4', result: '16' } },
        ],
        highlightVar: 'result',
      },
      {
        line: 5,
        explanation: 'sum_sq adds both results: 9 + 16 = 25 and returns 25. Frame sum_sq is popped.',
        variables: [
          { name: 'ans', type: 'int', value: '25', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 8, locals: { ans: '25' } }],
        highlightVar: 'ans',
      },
    ],
  },
  {
    id: 'loop-accumulator',
    name: 'Loop Iteration & Accumulator',
    description: 'Observe loop variables, state progression, and sequence consumption.',
    code: [
      'numbers = [2, 4, 6]',
      'total = 0',
      'for num in numbers:',
      '    total += num',
      'avg = total / len(numbers)',
    ],
    steps: [
      {
        line: 0,
        explanation: 'Line 1: Initialize list numbers = [2, 4, 6] in global memory.',
        variables: [{ name: 'numbers', type: 'list', value: '[2, 4, 6]', scope: 'global' }],
        callStack: [{ name: '<module>', line: 1, locals: {} }],
      },
      {
        line: 1,
        explanation: 'Line 2: Initialize accumulator total = 0.',
        variables: [
          { name: 'numbers', type: 'list', value: '[2, 4, 6]', scope: 'global' },
          { name: 'total', type: 'int', value: '0', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 2, locals: {} }],
        highlightVar: 'total',
      },
      {
        line: 2,
        explanation: 'Line 3 (Iter 1): num binds to first item 2.',
        variables: [
          { name: 'numbers', type: 'list', value: '[2, 4, 6]', scope: 'global' },
          { name: 'total', type: 'int', value: '0', scope: 'global' },
          { name: 'num', type: 'int', value: '2', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 3, locals: {} }],
        highlightVar: 'num',
      },
      {
        line: 3,
        explanation: 'Line 4 (Iter 1): total += num -> 0 + 2 = 2.',
        variables: [
          { name: 'numbers', type: 'list', value: '[2, 4, 6]', scope: 'global' },
          { name: 'total', type: 'int', value: '2', scope: 'global' },
          { name: 'num', type: 'int', value: '2', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 4, locals: {} }],
        highlightVar: 'total',
      },
      {
        line: 2,
        explanation: 'Line 3 (Iter 2): num binds to second item 4.',
        variables: [
          { name: 'numbers', type: 'list', value: '[2, 4, 6]', scope: 'global' },
          { name: 'total', type: 'int', value: '2', scope: 'global' },
          { name: 'num', type: 'int', value: '4', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 3, locals: {} }],
        highlightVar: 'num',
      },
      {
        line: 3,
        explanation: 'Line 4 (Iter 2): total += num -> 2 + 4 = 6.',
        variables: [
          { name: 'numbers', type: 'list', value: '[2, 4, 6]', scope: 'global' },
          { name: 'total', type: 'int', value: '6', scope: 'global' },
          { name: 'num', type: 'int', value: '4', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 4, locals: {} }],
        highlightVar: 'total',
      },
      {
        line: 2,
        explanation: 'Line 3 (Iter 3): num binds to third item 6.',
        variables: [
          { name: 'numbers', type: 'list', value: '[2, 4, 6]', scope: 'global' },
          { name: 'total', type: 'int', value: '6', scope: 'global' },
          { name: 'num', type: 'int', value: '6', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 3, locals: {} }],
        highlightVar: 'num',
      },
      {
        line: 3,
        explanation: 'Line 4 (Iter 3): total += num -> 6 + 6 = 12.',
        variables: [
          { name: 'numbers', type: 'list', value: '[2, 4, 6]', scope: 'global' },
          { name: 'total', type: 'int', value: '12', scope: 'global' },
          { name: 'num', type: 'int', value: '6', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 4, locals: {} }],
        highlightVar: 'total',
      },
      {
        line: 4,
        explanation: 'Line 5: Loop exhausted. Compute avg = 12 / 3 = 4.0.',
        variables: [
          { name: 'numbers', type: 'list', value: '[2, 4, 6]', scope: 'global' },
          { name: 'total', type: 'int', value: '12', scope: 'global' },
          { name: 'num', type: 'int', value: '6', scope: 'global' },
          { name: 'avg', type: 'float', value: '4.0', scope: 'global' },
        ],
        callStack: [{ name: '<module>', line: 5, locals: {} }],
        highlightVar: 'avg',
      },
    ],
  },
  {
    id: 'recursion-trace',
    name: 'Recursive Call Stack (Factorial)',
    description: 'Visualize base cases, deep call stacks, unwinding, and return propagation.',
    code: [
      'def fact(n):',
      '    if n <= 1:',
      '        return 1',
      '    return n * fact(n - 1)',
      '',
      'ans = fact(3)',
    ],
    steps: [
      {
        line: 5,
        explanation: 'Line 6: Invoking fact(3). Stack depth: 1.',
        variables: [{ name: 'n', type: 'int', value: '3', scope: 'local' }],
        callStack: [
          { name: '<module>', line: 6, locals: {} },
          { name: 'fact(n=3)', line: 1, locals: { n: '3' } },
        ],
      },
      {
        line: 1,
        explanation: 'fact(3): n <= 1 is False (3 > 1). Preparing recursive call fact(2).',
        variables: [{ name: 'n', type: 'int', value: '3', scope: 'local' }],
        callStack: [
          { name: '<module>', line: 6, locals: {} },
          { name: 'fact(n=3)', line: 2, locals: { n: '3' } },
        ],
      },
      {
        line: 3,
        explanation: 'fact(3) calls fact(2). New stack frame pushed. Stack depth: 2.',
        variables: [{ name: 'n', type: 'int', value: '2', scope: 'local' }],
        callStack: [
          { name: '<module>', line: 6, locals: {} },
          { name: 'fact(n=3)', line: 4, locals: { n: '3' } },
          { name: 'fact(n=2)', line: 1, locals: { n: '2' } },
        ],
      },
      {
        line: 3,
        explanation: 'fact(2) calls fact(1). Base case frame pushed. Stack depth: 3.',
        variables: [{ name: 'n', type: 'int', value: '1', scope: 'local' }],
        callStack: [
          { name: '<module>', line: 6, locals: {} },
          { name: 'fact(n=3)', line: 4, locals: { n: '3' } },
          { name: 'fact(n=2)', line: 4, locals: { n: '2' } },
          { name: 'fact(n=1)', line: 1, locals: { n: '1' } },
        ],
      },
      {
        line: 2,
        explanation: 'BASE CASE HIT! fact(1): n <= 1 is True. Returns 1. Frame fact(1) pops.',
        variables: [{ name: 'return_val', type: 'int', value: '1', scope: 'local' }],
        callStack: [
          { name: '<module>', line: 6, locals: {} },
          { name: 'fact(n=3)', line: 4, locals: { n: '3' } },
          { name: 'fact(n=2)', line: 4, locals: { n: '2' } },
        ],
      },
      {
        line: 3,
        explanation: 'UNWINDING: fact(2) receives 1, evaluates 2 * 1 = 2, and returns 2. Frame pops.',
        variables: [{ name: 'return_val', type: 'int', value: '2', scope: 'local' }],
        callStack: [
          { name: '<module>', line: 6, locals: {} },
          { name: 'fact(n=3)', line: 4, locals: { n: '3' } },
        ],
      },
      {
        line: 3,
        explanation: 'UNWINDING: fact(3) receives 2, evaluates 3 * 2 = 6, and returns 6. Frame pops.',
        variables: [{ name: 'ans', type: 'int', value: '6', scope: 'global' }],
        callStack: [{ name: '<module>', line: 6, locals: { ans: '6' } }],
        highlightVar: 'ans',
      },
    ],
  },
];

export const ExecutionVisualizer: React.FC = () => {
  const [scenarioId, setScenarioId] = useState<string>('variables-rebinding');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
  const step = scenario.steps[currentStep] || scenario.steps[0];

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [scenarioId]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= scenario.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMs, scenario.steps.length]);

  return (
    <div className="space-y-4">
      {/* Scenario Selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scenarios:</span>
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScenarioId(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              scenarioId === s.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Main 2-column or 3-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Code Execution Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-hidden flex flex-col shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-slate-400 font-sans">
            <span className="text-xs font-semibold flex items-center gap-1.5 text-emerald-400">
              <Terminal className="w-3.5 h-3.5" /> Python Source Code
            </span>
            <span className="text-[11px] font-mono">Line {step.line + 1}</span>
          </div>

          <div className="space-y-1 flex-1 py-1">
            {scenario.code.map((codeLine, idx) => {
              const isCurrent = step.line === idx;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-2.5 py-1 rounded transition-colors ${
                    isCurrent
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border-l-2 border-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="text-slate-500 text-[11px] w-5 text-right select-none">
                    {idx + 1}
                  </span>
                  <span className="flex-1 whitespace-pre">{codeLine || ' '}</span>
                  {isCurrent && (
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-sans font-semibold shrink-0">
                      ▶ executing
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Simulated stdout */}
          <div className="mt-4 pt-3 border-t border-slate-800 font-sans">
            <div className="text-[11px] text-slate-400 font-semibold mb-1 flex items-center gap-1">
              <span>Terminal Output (stdout):</span>
            </div>
            <div className="p-2 rounded bg-slate-950 font-mono text-emerald-400 text-xs min-h-[32px] flex items-center">
              {step.stdout ? step.stdout : <span className="text-slate-600 italic">No output yet</span>}
            </div>
          </div>
        </div>

        {/* State Panels (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Variables Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <Variable className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Variables &amp; Scopes
                </h4>
              </div>
              <span className="text-xs text-slate-400">
                {step.variables.length} active binding{step.variables.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-medium">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Value</th>
                    <th className="pb-2">Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {step.variables.map((v, i) => {
                    const isHighlighted = step.highlightVar === v.name;
                    return (
                      <tr
                        key={i}
                        className={`transition-colors ${
                          isHighlighted
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 font-semibold text-emerald-700 dark:text-emerald-300'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <td className="py-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {v.name}
                        </td>
                        <td className="py-2">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                            {v.type}
                          </span>
                        </td>
                        <td className="py-2 font-mono text-slate-900 dark:text-slate-100">
                          {v.value}
                        </td>
                        <td className="py-2">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              v.scope === 'global'
                                ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400'
                                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {v.scope}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Call Stack Frames */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Call Stack (Frames)
                </h4>
              </div>
              <span className="text-xs text-slate-400">
                Depth: {step.callStack.length}
              </span>
            </div>

            <div className="space-y-2">
              {[...step.callStack].reverse().map((frame, idx) => {
                const isTop = idx === 0;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-xs transition-all ${
                      isTop
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        {frame.name}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        line {frame.line}
                      </span>
                    </div>
                    {Object.keys(frame.locals).length > 0 && (
                      <div className="mt-1.5 flex items-center gap-2 flex-wrap text-[11px] font-mono">
                        <span className="text-slate-400 text-[10px]">locals:</span>
                        {Object.entries(frame.locals).map(([k, val]) => (
                          <span
                            key={k}
                            className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {k}={val}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Step Player */}
      <StepPlayer
        currentStep={currentStep}
        totalSteps={scenario.steps.length}
        isPlaying={isPlaying}
        speedMs={speedMs}
        explanation={step.explanation}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onNext={() => setCurrentStep((s) => Math.min(scenario.steps.length - 1, s + 1))}
        onPrev={() => setCurrentStep((s) => Math.max(0, s - 1))}
        onReset={() => {
          setIsPlaying(false);
          setCurrentStep(0);
        }}
        onSpeedChange={setSpeedMs}
        onStepSelect={setCurrentStep}
      />
    </div>
  );
};
