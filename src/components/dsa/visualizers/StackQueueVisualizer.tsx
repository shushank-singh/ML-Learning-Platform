'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { StepPlayer } from '@/components/shared/StepPlayer';
import { PseudocodePanel } from '@/components/shared/PseudocodePanel';
import { Layers, ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';

export type DSStructure = 'stack' | 'queue' | 'monotonic' | 'parentheses';

interface SQStep {
  elements: { id: number; val: string | number }[];
  auxiliary?: { id: number; val: string | number }[]; // for min stack or result array
  action: 'push' | 'pop' | 'enqueue' | 'dequeue' | 'peek' | 'idle';
  activeElement?: string | number;
  explanation: string;
  pseudocodeLine: number;
}

const META: Record<DSStructure, { name: string; pseudocode: string }> = {
  stack: {
    name: 'Stack (LIFO)',
    pseudocode: `class Stack:
    def __init__(self):
        self.items = []
    def push(self, val):
        self.items.append(val)
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
    def peek(self):
        return self.items[-1]`,
  },
  queue: {
    name: 'Queue (FIFO)',
    pseudocode: `class Queue:
    def __init__(self):
        self.items = deque()
    def enqueue(self, val):
        self.items.append(val)
    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()`,
  },
  monotonic: {
    name: 'Monotonic Stack (Next Greater Element)',
    pseudocode: `def next_greater(arr):
    stack = []
    res = [-1] * len(arr)
    for i in range(len(arr)):
        while stack and arr[i] > arr[stack[-1]]:
            idx = stack.pop()
            res[idx] = arr[i]
        stack.append(i)
    return res`,
  },
  parentheses: {
    name: 'Balanced Parentheses Validation',
    pseudocode: `def is_valid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
    return len(stack) == 0`,
  },
};

export const StackQueueVisualizer: React.FC = () => {
  const [structure, setStructure] = useState<DSStructure>('stack');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);

  const steps: SQStep[] = useMemo(() => {
    const generated: SQStep[] = [];

    if (structure === 'stack') {
      const sequence = [
        { op: 'push', val: 10, line: 5, exp: 'Push 10 onto top of stack.' },
        { op: 'push', val: 20, line: 5, exp: 'Push 20 onto top of stack.' },
        { op: 'push', val: 30, line: 5, exp: 'Push 30 onto top of stack.' },
        { op: 'peek', val: 30, line: 9, exp: 'Peek: top element is 30 (O(1)).' },
        { op: 'pop', val: 30, line: 8, exp: 'Pop: removed 30 from top (LIFO order).' },
        { op: 'push', val: 40, line: 5, exp: 'Push 40 onto top of stack.' },
        { op: 'pop', val: 40, line: 8, exp: 'Pop: removed 40 from top.' },
        { op: 'pop', val: 20, line: 8, exp: 'Pop: removed 20 from top.' },
      ];

      const currentStack: { id: number; val: number }[] = [];
      let idCounter = 1;

      generated.push({
        elements: [],
        action: 'idle',
        explanation: 'Empty stack initialized. Ready for LIFO operations.',
        pseudocodeLine: 3,
      });

      sequence.forEach((s) => {
        if (s.op === 'push') {
          currentStack.push({ id: idCounter++, val: s.val });
          generated.push({
            elements: [...currentStack],
            action: 'push',
            activeElement: s.val,
            explanation: s.exp,
            pseudocodeLine: s.line,
          });
        } else if (s.op === 'pop') {
          const removed = currentStack.pop();
          generated.push({
            elements: [...currentStack],
            action: 'pop',
            activeElement: removed?.val,
            explanation: s.exp,
            pseudocodeLine: s.line,
          });
        } else if (s.op === 'peek') {
          generated.push({
            elements: [...currentStack],
            action: 'peek',
            activeElement: s.val,
            explanation: s.exp,
            pseudocodeLine: s.line,
          });
        }
      });
    } else if (structure === 'queue') {
      const sequence = [
        { op: 'enqueue', val: 'Alice', line: 5, exp: 'Enqueue "Alice" at rear of queue.' },
        { op: 'enqueue', val: 'Bob', line: 5, exp: 'Enqueue "Bob" at rear of queue.' },
        { op: 'enqueue', val: 'Charlie', line: 5, exp: 'Enqueue "Charlie" at rear of queue.' },
        { op: 'dequeue', val: 'Alice', line: 8, exp: 'Dequeue: "Alice" exits from front (FIFO order).' },
        { op: 'enqueue', val: 'Diana', line: 5, exp: 'Enqueue "Diana" at rear of queue.' },
        { op: 'dequeue', val: 'Bob', line: 8, exp: 'Dequeue: "Bob" exits from front.' },
      ];

      const currentQueue: { id: number; val: string }[] = [];
      let idCounter = 1;

      generated.push({
        elements: [],
        action: 'idle',
        explanation: 'Empty queue initialized. Ready for FIFO operations.',
        pseudocodeLine: 3,
      });

      sequence.forEach((s) => {
        if (s.op === 'enqueue') {
          currentQueue.push({ id: idCounter++, val: s.val });
          generated.push({
            elements: [...currentQueue],
            action: 'enqueue',
            activeElement: s.val,
            explanation: s.exp,
            pseudocodeLine: s.line,
          });
        } else if (s.op === 'dequeue') {
          const removed = currentQueue.shift();
          generated.push({
            elements: [...currentQueue],
            action: 'dequeue',
            activeElement: removed?.val,
            explanation: s.exp,
            pseudocodeLine: s.line,
          });
        }
      });
    } else if (structure === 'parentheses') {
      const inputStr = '{ [ ( ) ] }';
      const tokens = ['{', '[', '(', ')', ']', '}'];
      const stack: { id: number; val: string }[] = [];
      let idCounter = 1;

      generated.push({
        elements: [],
        action: 'idle',
        explanation: `Validating bracket string: "${inputStr}". Empty validation stack.`,
        pseudocodeLine: 2,
      });

      tokens.forEach((ch, idx) => {
        if (ch === '{' || ch === '[' || ch === '(') {
          stack.push({ id: idCounter++, val: ch });
          generated.push({
            elements: [...stack],
            action: 'push',
            activeElement: ch,
            explanation: `Encountered open bracket "${ch}" at index ${idx}. Push to stack.`,
            pseudocodeLine: 6,
          });
        } else {
          const popped = stack.pop();
          generated.push({
            elements: [...stack],
            action: 'pop',
            activeElement: ch,
            explanation: `Encountered closing bracket "${ch}". Matches top open bracket "${popped?.val}"! Pop from stack.`,
            pseudocodeLine: 9,
          });
        }
      });

      generated.push({
        elements: [],
        action: 'idle',
        explanation: 'Validation succeeded! All brackets matched, stack is empty. String is balanced.',
        pseudocodeLine: 10,
      });
    } else if (structure === 'monotonic') {
      const arr = [4, 5, 2, 25];
      const stack: { id: number; val: number }[] = [];
      const res: (number | string)[] = [-1, -1, -1, -1];

      generated.push({
        elements: [],
        auxiliary: res.map((r, i) => ({ id: i, val: r })),
        action: 'idle',
        explanation: `Array is [4, 5, 2, 25]. Monotonic decreasing stack will track indices of unresolved elements.`,
        pseudocodeLine: 3,
      });

      arr.forEach((num, i) => {
        generated.push({
          elements: [...stack],
          auxiliary: res.map((r, idx) => ({ id: idx, val: r })),
          action: 'idle',
          activeElement: num,
          explanation: `Inspect arr[${i}] = ${num}.`,
          pseudocodeLine: 4,
        });

        while (stack.length > 0 && num > arr[stack[stack.length - 1].val as number]) {
          const popped = stack.pop()!;
          const resolvedIdx = popped.val as number;
          res[resolvedIdx] = num;

          generated.push({
            elements: [...stack],
            auxiliary: res.map((r, idx) => ({ id: idx, val: r })),
            action: 'pop',
            activeElement: num,
            explanation: `arr[${i}] (${num}) > arr[${resolvedIdx}] (${arr[resolvedIdx]}). Pop index ${resolvedIdx}: Next Greater Element is ${num}!`,
            pseudocodeLine: 7,
          });
        }

        stack.push({ id: i, val: i });
        generated.push({
          elements: [...stack],
          auxiliary: res.map((r, idx) => ({ id: idx, val: r })),
          action: 'push',
          activeElement: i,
          explanation: `Push index ${i} (value ${num}) to monotonic stack.`,
          pseudocodeLine: 8,
        });
      });

      generated.push({
        elements: [...stack],
        auxiliary: res.map((r, idx) => ({ id: idx, val: r })),
        action: 'idle',
        explanation: `Completed in O(n) time! Result array of Next Greater Elements: [${res.join(', ')}].`,
        pseudocodeLine: 9,
      });
    }

    return generated;
  }, [structure]);

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
  const meta = META[structure];

  return (
    <div className="space-y-6">
      {/* Structure Selector */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center gap-2">
        {(Object.keys(META) as DSStructure[]).map((st) => (
          <button
            key={st}
            onClick={() => {
              setStructure(st);
              setCurrentStepIdx(0);
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              structure === st
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {META[st].name}
          </button>
        ))}
      </div>

      {/* Main Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 min-h-[280px] flex flex-col items-center justify-center">
        {/* Stack View (Vertical Chamber) */}
        {(structure === 'stack' || structure === 'parentheses' || structure === 'monotonic') && (
          <div className="w-full max-w-sm flex flex-col items-center gap-4">
            <div className="text-xs font-bold text-slate-400 font-mono flex items-center gap-1">
              <ArrowDown className="w-4 h-4 text-violet-500" />
              <span>TOP OF STACK (Push / Pop)</span>
            </div>

            <div className="w-48 min-h-[160px] border-b-4 border-x-4 border-slate-300 dark:border-slate-700 rounded-b-2xl p-2 flex flex-col-reverse gap-2 bg-white/50 dark:bg-slate-900/50">
              {step.elements.length === 0 ? (
                <div className="h-28 flex items-center justify-center text-xs text-slate-400 font-mono">
                  (Empty Stack)
                </div>
              ) : (
                step.elements.map((el, i) => (
                  <div
                    key={el.id}
                    className={`h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm text-white shadow-sm transition-all duration-300 ${
                      i === step.elements.length - 1
                        ? 'bg-violet-600 scale-102 border-2 border-violet-400'
                        : 'bg-indigo-500'
                    }`}
                  >
                    {el.val}
                  </div>
                ))
              )}
            </div>

            {/* Auxiliary Array (for Monotonic Stack) */}
            {structure === 'monotonic' && step.auxiliary && (
              <div className="w-full pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-500 block text-center">
                  Result Array (Next Greater Element):
                </span>
                <div className="flex justify-center gap-2">
                  {step.auxiliary.map((item) => (
                    <div
                      key={item.id}
                      className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-mono font-bold text-sm text-slate-900 dark:text-slate-100"
                    >
                      {item.val}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Queue View (Horizontal Pipe) */}
        {structure === 'queue' && (
          <div className="w-full max-w-xl flex flex-col items-center gap-4">
            <div className="flex items-center justify-between w-full text-xs font-bold text-slate-400 font-mono px-4">
              <span className="flex items-center gap-1 text-emerald-500">
                <span>FRONT (Dequeue)</span>
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="flex items-center gap-1 text-blue-500">
                <ArrowRight className="w-4 h-4" />
                <span>REAR (Enqueue)</span>
              </span>
            </div>

            <div className="w-full h-20 border-y-4 border-slate-300 dark:border-slate-700 p-2 flex items-center justify-start gap-3 overflow-x-auto bg-white/50 dark:bg-slate-900/50">
              {step.elements.length === 0 ? (
                <div className="w-full text-center text-xs text-slate-400 font-mono">
                  (Empty Queue)
                </div>
              ) : (
                step.elements.map((el, i) => (
                  <div
                    key={el.id}
                    className={`min-w-[80px] h-12 px-3 rounded-xl flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm transition-all duration-300 ${
                      i === 0
                        ? 'bg-emerald-600 border-2 border-emerald-400'
                        : i === step.elements.length - 1
                        ? 'bg-blue-600 border-2 border-blue-400'
                        : 'bg-violet-500'
                    }`}
                  >
                    {el.val}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
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
            title={`${meta.name} Pseudocode`}
          />
        </div>
      </div>
    </div>
  );
};
