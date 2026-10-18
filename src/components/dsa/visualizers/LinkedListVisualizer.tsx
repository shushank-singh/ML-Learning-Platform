'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { StepPlayer } from '@/components/shared/StepPlayer';
import { PseudocodePanel } from '@/components/shared/PseudocodePanel';
import { ArrowRight, Plus, Trash2, RotateCcw, RefreshCw } from 'lucide-react';

export type LLOperation = 'traversal' | 'insert-head' | 'insert-tail' | 'delete' | 'reverse' | 'cycle-detect';

interface LLNodeVisual {
  id: number;
  val: number;
}

interface LLStep {
  nodes: LLNodeVisual[];
  pointers: {
    curr?: number;
    prev?: number;
    next?: number;
    slow?: number;
    fast?: number;
  };
  hasCycle?: boolean;
  cycleTargetId?: number;
  highlightedNodeId?: number;
  explanation: string;
  pseudocodeLine: number;
}

const OPERATION_META: Record<LLOperation, { name: string; pseudocode: string }> = {
  traversal: {
    name: 'List Traversal',
    pseudocode: `def traverse(head):
    curr = head
    while curr is not None:
        visit(curr.val)
        curr = curr.next`,
  },
  'insert-head': {
    name: 'Insert at Head',
    pseudocode: `def insert_head(head, val):
    new_node = Node(val)
    new_node.next = head
    head = new_node
    return head`,
  },
  'insert-tail': {
    name: 'Insert at Tail',
    pseudocode: `def insert_tail(head, val):
    new_node = Node(val)
    if not head: return new_node
    curr = head
    while curr.next:
        curr = curr.next
    curr.next = new_node
    return head`,
  },
  delete: {
    name: 'Delete Node',
    pseudocode: `def delete_node(head, val):
    if head and head.val == val:
        return head.next
    curr = head
    while curr.next and curr.next.val != val:
        curr = curr.next
    if curr.next:
        curr.next = curr.next.next
    return head`,
  },
  reverse: {
    name: 'Reverse List',
    pseudocode: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
  },
  'cycle-detect': {
    name: "Floyd's Cycle Detection",
    pseudocode: `def has_cycle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True # Cycle detected!
    return False`,
  },
};

export const LinkedListVisualizer: React.FC = () => {
  const [operation, setOperation] = useState<LLOperation>('reverse');
  const [initialList, setInitialList] = useState<number[]>([12, 99, 37, 45, 8]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(900);

  // Generate deterministic steps for selected operation
  const steps: LLStep[] = useMemo(() => {
    const listNodes: LLNodeVisual[] = initialList.map((val, idx) => ({ id: idx + 1, val }));
    const generated: LLStep[] = [];

    if (operation === 'traversal') {
      generated.push({
        nodes: [...listNodes],
        pointers: {},
        explanation: 'Initialize list for traversal. Head points to first node.',
        pseudocodeLine: 1,
      });

      for (let i = 0; i < listNodes.length; i++) {
        generated.push({
          nodes: [...listNodes],
          pointers: { curr: listNodes[i].id },
          highlightedNodeId: listNodes[i].id,
          explanation: `Visiting node with value ${listNodes[i].val} at position ${i + 1}.`,
          pseudocodeLine: 3,
        });
      }

      generated.push({
        nodes: [...listNodes],
        pointers: {},
        explanation: 'Reached end of linked list (curr is None). Traversal complete.',
        pseudocodeLine: 4,
      });
    } else if (operation === 'insert-head') {
      const newNode: LLNodeVisual = { id: 999, val: 55 };
      generated.push({
        nodes: [...listNodes],
        pointers: {},
        explanation: `Create new node with value ${newNode.val}.`,
        pseudocodeLine: 2,
      });
      generated.push({
        nodes: [newNode, ...listNodes],
        pointers: { next: listNodes[0]?.id },
        highlightedNodeId: newNode.id,
        explanation: `Point new_node.next to current head (${listNodes[0]?.val}).`,
        pseudocodeLine: 3,
      });
      generated.push({
        nodes: [newNode, ...listNodes],
        pointers: { curr: newNode.id },
        highlightedNodeId: newNode.id,
        explanation: `Update head = new_node. Insertion at head complete in O(1) time.`,
        pseudocodeLine: 4,
      });
    } else if (operation === 'insert-tail') {
      const newNode: LLNodeVisual = { id: 999, val: 88 };
      generated.push({
        nodes: [...listNodes],
        pointers: {},
        explanation: `Create new node with value ${newNode.val}.`,
        pseudocodeLine: 2,
      });
      for (let i = 0; i < listNodes.length; i++) {
        generated.push({
          nodes: [...listNodes],
          pointers: { curr: listNodes[i].id },
          explanation: `Traverse towards tail: curr is at node ${listNodes[i].val}.`,
          pseudocodeLine: 5,
        });
      }
      generated.push({
        nodes: [...listNodes, newNode],
        pointers: { curr: listNodes[listNodes.length - 1].id, next: newNode.id },
        highlightedNodeId: newNode.id,
        explanation: `Found tail node. Point tail.next to new node (${newNode.val}). Insertion complete.`,
        pseudocodeLine: 7,
      });
    } else if (operation === 'delete') {
      const targetVal = 37;
      generated.push({
        nodes: [...listNodes],
        pointers: { curr: listNodes[0].id },
        explanation: `Start deletion: searching for node with value ${targetVal}.`,
        pseudocodeLine: 4,
      });

      const targetIdx = listNodes.findIndex((n) => n.val === targetVal);
      if (targetIdx !== -1) {
        generated.push({
          nodes: [...listNodes],
          pointers: { prev: listNodes[targetIdx - 1]?.id, curr: listNodes[targetIdx].id },
          highlightedNodeId: listNodes[targetIdx].id,
          explanation: `Found node to delete: ${targetVal}. Predecessor node is ${listNodes[targetIdx - 1]?.val}.`,
          pseudocodeLine: 6,
        });
        const remaining = listNodes.filter((_, idx) => idx !== targetIdx);
        generated.push({
          nodes: remaining,
          pointers: { prev: listNodes[targetIdx - 1]?.id },
          explanation: `Bypass target node: prev.next = curr.next. Node ${targetVal} removed from chain.`,
          pseudocodeLine: 8,
        });
      }
    } else if (operation === 'reverse') {
      generated.push({
        nodes: [...listNodes],
        pointers: { prev: undefined, curr: listNodes[0].id },
        explanation: 'Initialize reversal: prev = None, curr = head.',
        pseudocodeLine: 2,
      });

      for (let i = 0; i < listNodes.length; i++) {
        const currId = listNodes[i].id;
        const prevId = i > 0 ? listNodes[i - 1].id : undefined;
        const nextId = i < listNodes.length - 1 ? listNodes[i + 1].id : undefined;

        generated.push({
          nodes: [...listNodes],
          pointers: { prev: prevId, curr: currId, next: nextId },
          highlightedNodeId: currId,
          explanation: `Save next pointer (next = node ${nextId || 'None'}). Reverse pointer: curr.next = prev (${prevId || 'None'}).`,
          pseudocodeLine: 5,
        });

        generated.push({
          nodes: [...listNodes],
          pointers: { prev: currId, curr: nextId },
          explanation: `Advance pointers: prev moves to node ${currId}, curr moves to next (${nextId || 'None'}).`,
          pseudocodeLine: 7,
        });
      }

      generated.push({
        nodes: [...listNodes].reverse(),
        pointers: { curr: listNodes[listNodes.length - 1].id },
        explanation: 'All pointers reversed! New head is the former tail. O(n) time, O(1) extra space.',
        pseudocodeLine: 9,
      });
    } else if (operation === 'cycle-detect') {
      // Create a cycle from last node back to node 2
      const cycleTarget = listNodes[1];
      generated.push({
        nodes: [...listNodes],
        pointers: { slow: listNodes[0].id, fast: listNodes[0].id },
        hasCycle: true,
        cycleTargetId: cycleTarget.id,
        explanation: `Initialize slow and fast pointers at head. Tail node has a cycle pointing back to node ${cycleTarget.val}.`,
        pseudocodeLine: 2,
      });

      const sequence = [
        { s: 0, f: 0, exp: 'Slow at 12, Fast at 12' },
        { s: 1, f: 2, exp: 'Slow moves 1 step to 99; Fast moves 2 steps to 37' },
        { s: 2, f: 4, exp: 'Slow moves 1 step to 37; Fast moves 2 steps to 8 (tail)' },
        { s: 3, f: 2, exp: 'Slow moves 1 step to 45; Fast wraps cycle to 99 then 37' },
        { s: 4, f: 4, exp: 'Slow moves to 8; Fast moves to 8 — COLLISION DETECTED!' },
      ];

      for (let k = 1; k < sequence.length; k++) {
        const item = sequence[k];
        const sNode = listNodes[item.s];
        const fNode = listNodes[item.f];
        const isCollision = item.s === item.f;

        generated.push({
          nodes: [...listNodes],
          pointers: { slow: sNode.id, fast: fNode.id },
          hasCycle: true,
          cycleTargetId: cycleTarget.id,
          highlightedNodeId: isCollision ? sNode.id : undefined,
          explanation: `${item.exp}. ${
            isCollision
              ? "Slow and Fast pointers meet! Floyd's theorem guarantees a cycle exists."
              : 'Slow != Fast, loop continues.'
          }`,
          pseudocodeLine: isCollision ? 7 : 5,
        });
      }
    }

    return generated;
  }, [operation, initialList]);

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
  const meta = OPERATION_META[operation];

  return (
    <div className="space-y-6">
      {/* Operation selector pills */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(OPERATION_META) as LLOperation[]).map((op) => (
            <button
              key={op}
              onClick={() => {
                setOperation(op);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                operation === op
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {OPERATION_META[op].name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Linked List Node Chain Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-8">
        <div className="overflow-x-auto py-8">
          <div className="flex items-center justify-center gap-3 min-w-max mx-auto px-4">
            {step.nodes.map((node, idx) => {
              const isCurr = step.pointers.curr === node.id;
              const isPrev = step.pointers.prev === node.id;
              const isNext = step.pointers.next === node.id;
              const isSlow = step.pointers.slow === node.id;
              const isFast = step.pointers.fast === node.id;
              const isHighlighted = step.highlightedNodeId === node.id;

              return (
                <React.Fragment key={node.id}>
                  {/* Node container */}
                  <div className="flex flex-col items-center gap-2">
                    {/* Top Pointer Tags */}
                    <div className="h-6 flex items-center gap-1 font-mono text-[10px] font-bold">
                      {isSlow && isFast && (
                        <span className="px-1.5 py-0.5 rounded bg-red-500 text-white animate-bounce">
                          SLOW &amp; FAST
                        </span>
                      )}
                      {isSlow && !isFast && (
                        <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white">SLOW</span>
                      )}
                      {isFast && !isSlow && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">FAST</span>
                      )}
                      {isPrev && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">PREV</span>
                      )}
                      {isCurr && !isPrev && (
                        <span className="px-1.5 py-0.5 rounded bg-violet-600 text-white">CURR</span>
                      )}
                      {isNext && (
                        <span className="px-1.5 py-0.5 rounded bg-cyan-600 text-white">NEXT</span>
                      )}
                    </div>

                    {/* Node Visual Box */}
                    <div
                      className={`flex rounded-xl overflow-hidden border-2 shadow-sm transition-all duration-300 ${
                        isHighlighted
                          ? 'border-violet-500 ring-4 ring-violet-500/20 scale-105'
                          : 'border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {/* Val box */}
                      <div className="w-12 h-14 bg-white dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-base text-slate-800 dark:text-slate-100 border-r border-slate-200 dark:border-slate-700">
                        {node.val}
                      </div>
                      {/* Next pointer dot */}
                      <div className="w-8 h-14 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                      </div>
                    </div>

                    {/* Index label */}
                    <span className="text-[10px] font-mono text-slate-400">node #{node.id}</span>
                  </div>

                  {/* Arrow between nodes */}
                  {idx < step.nodes.length - 1 && (
                    <div className="flex items-center text-slate-400 dark:text-slate-600">
                      <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  )}

                  {/* Tail cycle arrow indicator or null */}
                  {idx === step.nodes.length - 1 && (
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      {step.hasCycle ? (
                        <span className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-300">
                          ↺ cycle to node #{step.cycleTargetId}
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold">
                          NULL
                        </span>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-violet-600" />
            <span>Current (curr)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500" />
            <span>Previous (prev)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-500" />
            <span>Slow Pointer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-500" />
            <span>Fast Pointer</span>
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
            code={meta.pseudocode}
            activeLine={step?.pseudocodeLine}
            title={`${meta.name} Pseudocode`}
          />
        </div>
      </div>
    </div>
  );
};
