'use client';

import React, { useState } from 'react';
import { Cpu, ArrowRight, RefreshCw, Check, X, ShieldAlert, Layers } from 'lucide-react';

type MemoryMode = 'aliasing' | 'immutable' | 'copying';

export const MemoryVisualizer: React.FC = () => {
  const [mode, setMode] = useState<MemoryMode>('aliasing');

  // Aliasing demo state
  const [aliasedList, setAliasedList] = useState<number[]>([1, 2, 3]);

  // Immutable rebind demo state
  const [valA, setValA] = useState<number>(100);
  const [valB, setValB] = useState<number>(100);

  // Copying demo state
  const [shallowCopyInner, setShallowCopyInner] = useState<number[]>([10, 20]);

  const handleAppendAliased = () => {
    setAliasedList([...aliasedList, aliasedList.length + 1]);
  };

  const handleResetAliased = () => {
    setAliasedList([1, 2, 3]);
  };

  const handleIncrementB = () => {
    setValB((prev) => prev + 1);
  };

  const handleResetImmutables = () => {
    setValA(100);
    setValB(100);
  };

  const handleMutateInner = () => {
    setShallowCopyInner([...shallowCopyInner, 99]);
  };

  const handleResetCopies = () => {
    setShallowCopyInner([10, 20]);
  };

  return (
    <div className="space-y-4">
      {/* Mode navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Memory Model:</span>
        {[
          { id: 'aliasing', label: 'Object Aliasing & Mutation' },
          { id: 'immutable', label: 'Immutability & Rebinding' },
          { id: 'copying', label: 'Shallow vs Deep Copy' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as MemoryMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === m.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* MODE 1: ALIASING */}
      {mode === 'aliasing' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600" />
                Variables are Pointers to Heap Objects
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                In Python, doing <code>b = a</code> does not duplicate data in memory. Both variables point to the same underlying heap object.
              </p>
            </div>

            {/* Stack vs Heap Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Stack (Variables) */}
              <div className="md:col-span-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                  Stack (Namespace)
                </span>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">a</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    ref &rarr; <code className="text-slate-700 dark:text-slate-300 font-bold">0x7FA3</code>
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">b</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    ref &rarr; <code className="text-slate-700 dark:text-slate-300 font-bold">0x7FA3</code>
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex justify-center text-emerald-500">
                <ArrowRight className="w-6 h-6 hidden md:block" />
              </div>

              {/* Heap (Shared Object) */}
              <div className="md:col-span-7 p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                    Heap Object @ 0x7FA3
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-semibold font-mono">
                    ref_count = 2 (a, b)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 font-mono text-xs">
                  <div className="text-slate-400 text-[10px] mb-1">Type: list | id: 1403429384976</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    [{aliasedList.join(', ')}]
                  </div>
                </div>
              </div>
            </div>

            {/* Test Mutation */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs font-mono">
                  <span>Both observe the change: </span>
                  <span className="text-emerald-600 font-bold">a is b: True</span>
                  <span className="text-slate-400 mx-2">|</span>
                  <span className="text-emerald-600 font-bold">a == b: True</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAppendAliased}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                  >
                    Execute: b.append({aliasedList.length + 1})
                  </button>
                  <button
                    onClick={handleResetAliased}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Reset"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: IMMUTABLE */}
      {mode === 'immutable' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600" />
                Immutable Types: Integers, Floats, Strings, Tuples
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                You cannot mutate an int in-place. Operations like <code>b += 1</code> create a new object in memory and re-bind <code>b</code> to it, leaving <code>a</code> unaffected!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Var A */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">
                    Variable a
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    id: 0x{valA.toString(16).toUpperCase()}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                  value = {valA}
                </div>
              </div>

              {/* Var B */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">
                    Variable b
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    id: 0x{valB.toString(16).toUpperCase()}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  value = {valB}
                </div>
              </div>
            </div>

            {/* Identity comparison status */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Identity (a is b): </span>
                  {valA === valB ? (
                    <span className="text-emerald-600 font-bold">True (same object)</span>
                  ) : (
                    <span className="text-red-500 font-bold">False (re-bound to new object!)</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleIncrementB}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                  >
                    Execute: b += 1
                  </button>
                  <button
                    onClick={handleResetImmutables}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Reset"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: COPYING */}
      {mode === 'copying' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                Shallow Copy vs Deep Copy with Nested Data
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                <code>copy.copy()</code> creates a new outer container, but child items inside are still shared references! <code>copy.deepcopy()</code> recursively duplicates every nested object.
              </p>
            </div>

            {/* Visual breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shallow Copy card */}
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/20 space-y-3">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block font-mono">
                  shallow = copy.copy(original)
                </span>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 text-xs font-mono space-y-1">
                  <div className="text-[10px] text-slate-400">Outer container: NEW list</div>
                  <div className="text-slate-900 dark:text-slate-100">
                    inner list shared: [{shallowCopyInner.join(', ')}]
                  </div>
                </div>
                <p className="text-[11px] text-amber-700 dark:text-amber-400">
                  Modifying the inner list through shallow will unexpectedly modify original!
                </p>
              </div>

              {/* Deep Copy card */}
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block font-mono">
                  deep = copy.deepcopy(original)
                </span>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 text-xs font-mono space-y-1">
                  <div className="text-[10px] text-slate-400">Outer container: NEW list</div>
                  <div className="text-slate-900 dark:text-slate-100">
                    inner list: INDEPENDENT clone [10, 20]
                  </div>
                </div>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Deeply isolated in memory. Mutations to either cannot leak to the other.
                </p>
              </div>
            </div>

            {/* Trigger Mutation */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Observe how mutating shared inner reference affects shallow copies:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMutateInner}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors"
                >
                  Mutate inner: .append(99)
                </button>
                <button
                  onClick={handleResetCopies}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Reset"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
