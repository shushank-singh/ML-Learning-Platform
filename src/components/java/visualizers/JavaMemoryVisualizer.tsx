'use client';

import React, { useState } from 'react';
import {
  Layers,
  HardDrive,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trash2,
  CheckCircle,
  HelpCircle,
  Code,
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  steps: {
    codeLine: string;
    explanation: string;
    stack: { name: string; type: string; value: string; isRef?: boolean; pointsTo?: string }[];
    heap: { id: string; address: string; className: string; fields: Record<string, string>; markedForGC?: boolean }[];
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'primitives-vs-reference',
    title: 'Primitives vs References',
    description: 'See how primitive values live directly inside the stack frame, while object variables only hold memory addresses pointing to the heap.',
    steps: [
      {
        codeLine: 'int x = 42;',
        explanation: 'The integer literal 42 is placed directly into the stack frame for variable x. Primitives store values directly in place.',
        stack: [{ name: 'x', type: 'int', value: '42' }],
        heap: [],
      },
      {
        codeLine: 'int y = x; y = 99;',
        explanation: 'The value 42 is copied into y. When y is reassigned to 99, x remains completely unaffected (42). Primitives are pass-by-value.',
        stack: [
          { name: 'x', type: 'int', value: '42' },
          { name: 'y', type: 'int', value: '99' },
        ],
        heap: [],
      },
      {
        codeLine: 'Car c1 = new Car("Red");',
        explanation: 'new allocates a Car object on the Heap at address 0x7A4F. The reference variable c1 on the Stack only stores this memory address!',
        stack: [
          { name: 'x', type: 'int', value: '42' },
          { name: 'y', type: 'int', value: '99' },
          { name: 'c1', type: 'Car', value: '0x7A4F', isRef: true, pointsTo: '0x7A4F' },
        ],
        heap: [{ id: 'heap-1', address: '0x7A4F', className: 'Car', fields: { color: '"Red"', speed: '0' } }],
      },
    ],
  },
  {
    id: 'reference-sharing-mutation',
    title: 'Reference Assignment & Mutation',
    description: 'Learn why c2 = c1 copies the memory address, NOT the object. Modifying the object through c2 changes what c1 sees!',
    steps: [
      {
        codeLine: 'Car c1 = new Car("Tesla", 100);',
        explanation: 'A new Car object is allocated on the Heap at 0x9B12. Variable c1 points to address 0x9B12.',
        stack: [{ name: 'c1', type: 'Car', value: '0x9B12', isRef: true, pointsTo: '0x9B12' }],
        heap: [{ id: 'heap-tesla', address: '0x9B12', className: 'Car', fields: { model: '"Tesla"', speed: '100' } }],
      },
      {
        codeLine: 'Car c2 = c1; // Copies reference',
        explanation: 'Java copies the address 0x9B12 from c1 into c2. Both c1 and c2 now point to the exact same Car object on the Heap!',
        stack: [
          { name: 'c1', type: 'Car', value: '0x9B12', isRef: true, pointsTo: '0x9B12' },
          { name: 'c2', type: 'Car', value: '0x9B12', isRef: true, pointsTo: '0x9B12' },
        ],
        heap: [{ id: 'heap-tesla', address: '0x9B12', className: 'Car', fields: { model: '"Tesla"', speed: '100' } }],
      },
      {
        codeLine: 'c2.setSpeed(140);',
        explanation: 'We modify speed using c2. Because there is only ONE object at 0x9B12, inspecting c1.getSpeed() also outputs 140!',
        stack: [
          { name: 'c1', type: 'Car', value: '0x9B12', isRef: true, pointsTo: '0x9B12' },
          { name: 'c2', type: 'Car', value: '0x9B12', isRef: true, pointsTo: '0x9B12' },
        ],
        heap: [{ id: 'heap-tesla', address: '0x9B12', className: 'Car', fields: { model: '"Tesla"', speed: '140' } }],
      },
      {
        codeLine: 'c1 = null; c2 = null; // GC Trigger',
        explanation: 'Both references are cleared to null. The object at 0x9B12 is now an orphan with 0 references, eligible for Garbage Collection!',
        stack: [
          { name: 'c1', type: 'Car', value: 'null', isRef: true },
          { name: 'c2', type: 'Car', value: 'null', isRef: true },
        ],
        heap: [{ id: 'heap-tesla', address: '0x9B12', className: 'Car', fields: { model: '"Tesla"', speed: '140' }, markedForGC: true }],
      },
    ],
  },
];

export const JavaMemoryVisualizer: React.FC = () => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const [stepIdx, setStepIdx] = useState<number>(0);

  const scenario = SCENARIOS[selectedScenarioIdx];
  const step = scenario.steps[stepIdx];

  const handleNext = () => {
    if (stepIdx < scenario.steps.length - 1) {
      setStepIdx(stepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
    }
  };

  const handleReset = () => {
    setStepIdx(0);
  };

  const switchScenario = (idx: number) => {
    setSelectedScenarioIdx(idx);
    setStepIdx(0);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Top Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Interactive Java Memory Model (Stack vs Heap)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Visualize how variables, references, objects, and mutations live in physical memory
            </p>
          </div>
        </div>

        {/* Scenario Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => switchScenario(idx)}
              className={`px-3 py-1 rounded-md transition-all ${
                idx === selectedScenarioIdx
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Scenario description & code tracker */}
        <div className="rounded-xl border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/40 dark:bg-indigo-950/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300">
              Executing Statement ({stepIdx + 1}/{scenario.steps.length}):
            </span>
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
                disabled={stepIdx === scenario.steps.length - 1}
                className="px-3 py-1 text-xs font-semibold rounded bg-indigo-600 text-white disabled:opacity-40"
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
            <span className="text-[11px] text-slate-500 font-sans">Active Java Line</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {step.explanation}
          </p>
        </div>

        {/* Visual Memory Representation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Stack Memory */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  JVM Stack (Thread Frame)
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Fast / LIFO / Scoped</span>
            </div>

            <div className="space-y-2">
              {step.stack.map((v, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500">
                      {v.type}
                    </span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{v.name}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400">=</span>
                    {v.isRef ? (
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-900">
                        {v.value}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-900">
                        {v.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heap Memory */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  JVM Heap (Dynamic Objects)
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Dynamic / Garbage Collected</span>
            </div>

            {step.heap.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 font-mono">
                No objects allocated on Heap yet
              </div>
            ) : (
              <div className="space-y-3">
                {step.heap.map((obj) => (
                  <div
                    key={obj.id}
                    className={`p-3 rounded-xl border transition-all ${
                      obj.markedForGC
                        ? 'border-red-300 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/30'
                        : 'border-amber-200 dark:border-amber-900/60 bg-white dark:bg-slate-900 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                          {obj.className} Object
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          Addr: {obj.address}
                        </span>
                      </div>
                      {obj.markedForGC && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400 font-mono">
                          <Trash2 className="w-3 h-3" />
                          Eligible for GC
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      {Object.entries(obj.fields).map(([fieldName, fieldVal]) => (
                        <div key={fieldName} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                          <span className="text-slate-500">{fieldName}:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-100">{fieldVal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
