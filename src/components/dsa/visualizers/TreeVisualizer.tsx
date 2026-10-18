'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { StepPlayer } from '@/components/shared/StepPlayer';
import { PseudocodePanel } from '@/components/shared/PseudocodePanel';
import { TreePine } from 'lucide-react';

export type TreeOperation = 'inorder' | 'preorder' | 'postorder' | 'level-order' | 'bst-search';

interface TreeNodeVisual {
  id: number;
  val: number;
  x: number;
  y: number;
  leftId?: number;
  rightId?: number;
}

interface TreeStep {
  activeNodeId?: number;
  visitedIds: number[];
  traversalOutput: number[];
  explanation: string;
  pseudocodeLine: number;
}

// Canonical Binary Tree layout
const TREE_NODES: TreeNodeVisual[] = [
  { id: 1, val: 50, x: 250, y: 40, leftId: 2, rightId: 3 },
  { id: 2, val: 30, x: 140, y: 110, leftId: 4, rightId: 5 },
  { id: 3, val: 70, x: 360, y: 110, leftId: 6, rightId: 7 },
  { id: 4, val: 20, x: 80, y: 180 },
  { id: 5, val: 40, x: 200, y: 180 },
  { id: 6, val: 60, x: 300, y: 180 },
  { id: 7, val: 80, x: 420, y: 180 },
];

const META: Record<TreeOperation, { name: string; pseudocode: string }> = {
  inorder: {
    name: 'Inorder Traversal (L-Root-R)',
    pseudocode: `def inorder(root):
    if not root: return
    inorder(root.left)
    visit(root.val) # Process Root
    inorder(root.right)`,
  },
  preorder: {
    name: 'Preorder Traversal (Root-L-R)',
    pseudocode: `def preorder(root):
    if not root: return
    visit(root.val) # Process Root first
    preorder(root.left)
    preorder(root.right)`,
  },
  postorder: {
    name: 'Postorder Traversal (L-R-Root)',
    pseudocode: `def postorder(root):
    if not root: return
    postorder(root.left)
    postorder(root.right)
    visit(root.val) # Process Root last`,
  },
  'level-order': {
    name: 'Level-Order Traversal (BFS)',
    pseudocode: `def level_order(root):
    if not root: return []
    q = deque([root])
    while q:
        node = q.popleft()
        visit(node.val)
        if node.left: q.append(node.left)
        if node.right: q.append(node.right)`,
  },
  'bst-search': {
    name: 'BST Search (target: 60)',
    pseudocode: `def search_bst(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return search_bst(root.left, target)
    return search_bst(root.right, target)`,
  },
};

interface TreeVisualizerProps {
  initialOp?: TreeOperation;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ initialOp = 'inorder' }) => {
  const [operation, setOperation] = useState<TreeOperation>(initialOp);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);

  const steps: TreeStep[] = useMemo(() => {
    const generated: TreeStep[] = [];

    if (operation === 'inorder') {
      const sequence = [
        { id: 1, line: 3, exp: 'Traverse left subtree of root 50' },
        { id: 2, line: 3, exp: 'Traverse left subtree of node 30' },
        { id: 4, line: 4, out: 20, exp: 'Node 20 has no left child. Visit node 20.' },
        { id: 2, line: 4, out: 30, exp: 'Backtrack to node 30. Visit node 30.' },
        { id: 5, line: 4, out: 40, exp: 'Traverse right of 30: visit node 40.' },
        { id: 1, line: 4, out: 50, exp: 'Left subtree complete. Visit root node 50.' },
        { id: 3, line: 3, exp: 'Traverse right subtree of root 50' },
        { id: 6, line: 4, out: 60, exp: 'Traverse left of 70: visit node 60.' },
        { id: 3, line: 4, out: 70, exp: 'Visit node 70.' },
        { id: 7, line: 4, out: 80, exp: 'Traverse right of 70: visit node 80.' },
      ];

      const visited: number[] = [];
      const output: number[] = [];

      generated.push({
        visitedIds: [],
        traversalOutput: [],
        explanation: 'Start Inorder Traversal at root node 50. Inorder visits sorted keys for BST!',
        pseudocodeLine: 1,
      });

      sequence.forEach((s) => {
        visited.push(s.id);
        if (s.out) output.push(s.out);
        generated.push({
          activeNodeId: s.id,
          visitedIds: [...visited],
          traversalOutput: [...output],
          explanation: s.exp,
          pseudocodeLine: s.line,
        });
      });
    } else if (operation === 'preorder') {
      const order = [1, 2, 4, 5, 3, 6, 7];
      const visited: number[] = [];
      const output: number[] = [];

      generated.push({
        visitedIds: [],
        traversalOutput: [],
        explanation: 'Start Preorder Traversal. Root is processed before its subtrees.',
        pseudocodeLine: 1,
      });

      order.forEach((id) => {
        const node = TREE_NODES.find((n) => n.id === id)!;
        visited.push(id);
        output.push(node.val);
        generated.push({
          activeNodeId: id,
          visitedIds: [...visited],
          traversalOutput: [...output],
          explanation: `Preorder visit node ${node.val} immediately upon entering.`,
          pseudocodeLine: 3,
        });
      });
    } else if (operation === 'postorder') {
      const order = [4, 5, 2, 6, 7, 3, 1];
      const visited: number[] = [];
      const output: number[] = [];

      generated.push({
        visitedIds: [],
        traversalOutput: [],
        explanation: 'Start Postorder Traversal. Subtrees processed before root.',
        pseudocodeLine: 1,
      });

      order.forEach((id) => {
        const node = TREE_NODES.find((n) => n.id === id)!;
        visited.push(id);
        output.push(node.val);
        generated.push({
          activeNodeId: id,
          visitedIds: [...visited],
          traversalOutput: [...output],
          explanation: `Both subtrees processed: visit root node ${node.val}.`,
          pseudocodeLine: 5,
        });
      });
    } else if (operation === 'level-order') {
      const order = [1, 2, 3, 4, 5, 6, 7];
      const visited: number[] = [];
      const output: number[] = [];

      generated.push({
        visitedIds: [],
        traversalOutput: [],
        explanation: 'Start Level-Order Traversal (BFS) using a queue.',
        pseudocodeLine: 3,
      });

      order.forEach((id) => {
        const node = TREE_NODES.find((n) => n.id === id)!;
        visited.push(id);
        output.push(node.val);
        generated.push({
          activeNodeId: id,
          visitedIds: [...visited],
          traversalOutput: [...output],
          explanation: `Dequeue and visit node ${node.val}. Enqueue children.`,
          pseudocodeLine: 6,
        });
      });
    } else if (operation === 'bst-search') {
      const target = 60;
      const path = [
        { id: 1, val: 50, exp: `${target} > 50: go to right child.` },
        { id: 3, val: 70, exp: `${target} < 70: go to left child.` },
        { id: 6, val: 60, exp: `60 == 60: TARGET FOUND in O(log n) time!` },
      ];

      const visited: number[] = [];

      generated.push({
        visitedIds: [],
        traversalOutput: [],
        explanation: `Start BST Search for target ${target} at root 50.`,
        pseudocodeLine: 1,
      });

      path.forEach((p, idx) => {
        visited.push(p.id);
        const isMatch = p.val === target;
        generated.push({
          activeNodeId: p.id,
          visitedIds: [...visited],
          traversalOutput: isMatch ? [60] : [],
          explanation: p.exp,
          pseudocodeLine: isMatch ? 3 : p.val < target ? 6 : 5,
        });
      });
    }

    return generated;
  }, [operation]);

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
  const meta = META[operation];

  return (
    <div className="space-y-6">
      {/* Operation selector pills */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center gap-2">
        {(Object.keys(META) as TreeOperation[]).map((op) => (
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
            {META[op].name}
          </button>
        ))}
      </div>

      {/* Main SVG Tree Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
        <div className="w-full flex justify-center overflow-x-auto">
          <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto select-none">
            {/* Edges */}
            {TREE_NODES.map((node) => {
              const leftNode = TREE_NODES.find((n) => n.id === node.leftId);
              const rightNode = TREE_NODES.find((n) => n.id === node.rightId);

              return (
                <g key={`edges-${node.id}`}>
                  {leftNode && (
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={leftNode.x}
                      y2={leftNode.y}
                      stroke="currentColor"
                      className="text-slate-300 dark:text-slate-700 stroke-2"
                    />
                  )}
                  {rightNode && (
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={rightNode.x}
                      y2={rightNode.y}
                      stroke="currentColor"
                      className="text-slate-300 dark:text-slate-700 stroke-2"
                    />
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {TREE_NODES.map((node) => {
              const isActive = step.activeNodeId === node.id;
              const isVisited = step.visitedIds.includes(node.id);

              return (
                <g key={`node-${node.id}`} className="transition-all duration-300">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'fill-violet-600 stroke-violet-300 stroke-4 filter drop-shadow'
                        : isVisited
                        ? 'fill-emerald-600 stroke-emerald-300 stroke-2'
                        : 'fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600 stroke-2'
                    }`}
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    className={`font-mono font-bold text-xs select-none pointer-events-none ${
                      isActive || isVisited
                        ? 'fill-white'
                        : 'fill-slate-800 dark:fill-slate-200'
                    }`}
                  >
                    {node.val}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Live Traversal Output String */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 font-sans font-semibold">Traversal Output:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {step.traversalOutput.length === 0 ? (
              <span className="text-slate-400 italic font-sans">[ waiting for first visited node ]</span>
            ) : (
              step.traversalOutput.map((val, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-bold"
                >
                  {val}
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
            code={meta.pseudocode}
            activeLine={step?.pseudocodeLine}
            title={`${meta.name} Pseudocode`}
          />
        </div>
      </div>
    </div>
  );
};
