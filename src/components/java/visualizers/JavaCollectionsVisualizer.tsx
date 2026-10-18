'use client';

import React, { useState } from 'react';
import {
  Database,
  Plus,
  Minus,
  RotateCcw,
  ArrowRight,
  Hash,
  Layers,
  Sparkles,
} from 'lucide-react';

type CollectionTab = 'arraylist' | 'linkedlist' | 'stack-queue' | 'hashmap';

export const JavaCollectionsVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CollectionTab>('arraylist');

  // ArrayList state
  const [arrayListItems, setArrayListItems] = useState<string[]>(['"Java"', '"Python"', '"Kotlin"']);
  const [arrayCapacity, setArrayCapacity] = useState<number>(4);

  // LinkedList state
  const [linkedListNodes, setLinkedListNodes] = useState<string[]>(['10', '20', '30']);

  // Stack & Queue state
  const [stackItems, setStackItems] = useState<string[]>(['A', 'B', 'C']);
  const [queueItems, setQueueItems] = useState<string[]>(['Task 1', 'Task 2', 'Task 3']);

  // HashMap state
  const [mapEntries, setMapEntries] = useState<{ key: string; value: string; hashBucket: number }[]>([
    { key: '"ID_101"', value: '"Alice"', hashBucket: 2 },
    { key: '"ID_102"', value: '"Bob"', hashBucket: 5 },
    { key: '"ID_103"', value: '"Charlie"', hashBucket: 2 }, // Demonstrates collision chaining!
  ]);

  // ArrayList Handlers
  const handleAddArrayList = () => {
    const nextItem = `"Item_${arrayListItems.length + 1}"`;
    if (arrayListItems.length + 1 > arrayCapacity) {
      // Dynamic resize! Java doubles or grows by 50%
      setArrayCapacity(arrayCapacity * 2);
    }
    setArrayListItems([...arrayListItems, nextItem]);
  };

  const handleRemoveArrayList = () => {
    if (arrayListItems.length > 0) {
      setArrayListItems(arrayListItems.slice(0, -1));
    }
  };

  // LinkedList Handlers
  const handleAddLinkedList = () => {
    const nextVal = `${(linkedListNodes.length + 1) * 10}`;
    setLinkedListNodes([...linkedListNodes, nextVal]);
  };

  const handleRemoveLinkedList = () => {
    if (linkedListNodes.length > 0) {
      setLinkedListNodes(linkedListNodes.slice(1)); // Removes from head
    }
  };

  // Stack Handlers
  const handlePushStack = () => {
    const nextChar = String.fromCharCode(65 + stackItems.length);
    setStackItems([...stackItems, nextChar]);
  };

  const handlePopStack = () => {
    if (stackItems.length > 0) {
      setStackItems(stackItems.slice(0, -1));
    }
  };

  // Queue Handlers
  const handleEnqueue = () => {
    const nextTask = `Task ${queueItems.length + 1}`;
    setQueueItems([...queueItems, nextTask]);
  };

  const handleDequeue = () => {
    if (queueItems.length > 0) {
      setQueueItems(queueItems.slice(1));
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden my-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Interactive Java Collections Framework Visualizer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Examine ArrayList resizing, LinkedList node chains, Stack/Queue LIFO/FIFO, and HashMap buckets
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('arraylist')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'arraylist'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            ArrayList
          </button>
          <button
            onClick={() => setActiveTab('linkedlist')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'linkedlist'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            LinkedList
          </button>
          <button
            onClick={() => setActiveTab('stack-queue')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'stack-queue'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Stack & Queue
          </button>
          <button
            onClick={() => setActiveTab('hashmap')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'hashmap'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            HashMap
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* ARRAYLIST VIEW */}
        {activeTab === 'arraylist' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono">
                  size: <strong className="text-cyan-600">{arrayListItems.length}</strong>
                </span>
                <span className="text-xs font-mono">
                  capacity: <strong className="text-amber-600">{arrayCapacity}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddArrayList}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>add(element)</span>
                </button>
                <button
                  onClick={handleRemoveArrayList}
                  disabled={arrayListItems.length === 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold flex items-center gap-1 disabled:opacity-40"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>remove(last)</span>
                </button>
              </div>
            </div>

            {/* Backing Array Visual */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-3">
                Underlying Continuous Heap Array: <code className="font-mono text-cyan-600">Object[] elementData</code>
              </span>

              <div className="flex flex-wrap gap-2">
                {Array.from({ length: arrayCapacity }).map((_, idx) => {
                  const item = arrayListItems[idx];
                  const isFilled = item !== undefined;
                  return (
                    <div
                      key={idx}
                      className={`w-24 p-3 rounded-xl border text-center transition-all ${
                        isFilled
                          ? 'border-cyan-300 dark:border-cyan-800 bg-white dark:bg-slate-900 shadow-xs'
                          : 'border-dashed border-slate-300 dark:border-slate-700 bg-transparent opacity-40'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 font-mono">Index [{idx}]</div>
                      <div className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-300 mt-1 truncate">
                        {isFilled ? item : 'null'}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-slate-500 mt-3">
                {arrayListItems.length >= arrayCapacity
                  ? '⚠️ Array is FULL! Adding next item will trigger Arrays.copyOf() to allocate a larger array on the Heap.'
                  : 'Elements indexed in O(1) time directly by memory offset.'}
              </p>
            </div>
          </div>
        )}

        {/* LINKEDLIST VIEW */}
        {activeTab === 'linkedlist' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <span className="text-xs font-mono">
                Nodes count: <strong className="text-indigo-600">{linkedListNodes.length}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddLinkedList}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>addLast(val)</span>
                </button>
                <button
                  onClick={handleRemoveLinkedList}
                  disabled={linkedListNodes.length === 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold flex items-center gap-1 disabled:opacity-40"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>removeFirst()</span>
                </button>
              </div>
            </div>

            {/* Doubly Linked Nodes */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 overflow-x-auto">
              <div className="flex items-center gap-2 py-4">
                <span className="text-xs font-mono text-slate-400 font-bold shrink-0">head ➔</span>
                {linkedListNodes.map((val, idx) => (
                  <div key={idx} className="flex items-center shrink-0">
                    <div className="border border-indigo-200 dark:border-indigo-800 rounded-xl bg-white dark:bg-slate-900 p-2.5 text-center shadow-xs">
                      <div className="text-[9px] font-mono text-slate-400">Node</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-slate-400 font-mono">prev</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 font-bold font-mono text-indigo-600 dark:text-indigo-400 text-xs">
                          {val}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">next</span>
                      </div>
                    </div>

                    {idx < linkedListNodes.length - 1 && (
                      <div className="px-1.5 text-indigo-400 text-xs font-bold">⇄</div>
                    )}
                  </div>
                ))}
                <span className="text-xs font-mono text-slate-400 font-bold shrink-0">➔ null</span>
              </div>
            </div>
          </div>
        )}

        {/* STACK & QUEUE VIEW */}
        {activeTab === 'stack-queue' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Stack */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Stack (LIFO - Last In, First Out)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePushStack}
                    className="px-2 py-1 rounded bg-violet-600 text-white text-[11px] font-semibold"
                  >
                    push()
                  </button>
                  <button
                    onClick={handlePopStack}
                    disabled={stackItems.length === 0}
                    className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold disabled:opacity-40"
                  >
                    pop()
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 flex flex-col-reverse">
                {stackItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-violet-200 dark:border-violet-900 bg-white dark:bg-slate-900 font-mono font-bold text-center text-xs text-violet-600 dark:text-violet-400"
                  >
                    {item} {idx === stackItems.length - 1 && '(TOP)'}
                  </div>
                ))}
              </div>
            </div>

            {/* Queue */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Queue (FIFO - First In, First Out)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleEnqueue}
                    className="px-2 py-1 rounded bg-emerald-600 text-white text-[11px] font-semibold"
                  >
                    offer()
                  </button>
                  <button
                    onClick={handleDequeue}
                    disabled={queueItems.length === 0}
                    className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold disabled:opacity-40"
                  >
                    poll()
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                {queueItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900 font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-between"
                  >
                    <span>{item}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {idx === 0 ? 'FRONT (Next to exit)' : `Position ${idx + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HASHMAP VIEW */}
        {activeTab === 'hashmap' && (
          <div className="space-y-6">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Java HashMap calculates <code className="font-mono text-cyan-600">hashCode() & (capacity - 1)</code> to select the bucket index. When multiple keys hash to the same bucket index, Java stores them as a linked list (or Red-Black tree after 8 collisions).
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((bucketIdx) => {
                const entries = mapEntries.filter((e) => e.hashBucket === bucketIdx);
                const hasCollision = entries.length > 1;

                return (
                  <div
                    key={bucketIdx}
                    className={`p-3 rounded-xl border ${
                      entries.length > 0
                        ? 'border-cyan-300 dark:border-cyan-900 bg-cyan-50/40 dark:bg-cyan-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        Bucket [{bucketIdx}]
                      </span>
                      {hasCollision && (
                        <span className="text-[9px] font-bold text-amber-500 bg-amber-100 dark:bg-amber-950 px-1 rounded">
                          Collision Chain!
                        </span>
                      )}
                    </div>

                    {entries.length === 0 ? (
                      <div className="text-[11px] text-slate-400 font-mono text-center py-2">
                        null
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {entries.map((entry, eIdx) => (
                          <div
                            key={eIdx}
                            className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono"
                          >
                            <span className="font-bold text-cyan-600">{entry.key}</span> ➔{' '}
                            <span className="text-slate-700 dark:text-slate-300">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
