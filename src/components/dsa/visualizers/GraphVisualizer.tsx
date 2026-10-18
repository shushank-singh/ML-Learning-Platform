'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { StepPlayer } from '@/components/shared/StepPlayer';
import { PseudocodePanel } from '@/components/shared/PseudocodePanel';
import { Network } from 'lucide-react';

export type GraphAlgo = 'bfs' | 'dfs' | 'dijkstra' | 'mst';

interface GraphNode {
  id: string;
  x: number;
  y: number;
}

interface GraphEdge {
  u: string;
  v: string;
  weight?: number;
}

interface GraphStep {
  activeNode?: string;
  visitedNodes: string[];
  frontierNodes: string[];
  highlightedEdges: string[]; // "u-v"
  distances?: Record<string, number | string>;
  explanation: string;
  pseudocodeLine: number;
}

const GRAPH_NODES: GraphNode[] = [
  { id: 'A', x: 70, y: 120 },
  { id: 'B', x: 190, y: 50 },
  { id: 'C', x: 190, y: 190 },
  { id: 'D', x: 330, y: 50 },
  { id: 'E', x: 330, y: 190 },
  { id: 'F', x: 440, y: 120 },
];

const GRAPH_EDGES: GraphEdge[] = [
  { u: 'A', v: 'B', weight: 4 },
  { u: 'A', v: 'C', weight: 2 },
  { u: 'B', v: 'C', weight: 1 },
  { u: 'B', v: 'D', weight: 5 },
  { u: 'C', v: 'E', weight: 8 },
  { u: 'C', v: 'D', weight: 10 },
  { u: 'D', v: 'E', weight: 2 },
  { u: 'D', v: 'F', weight: 6 },
  { u: 'E', v: 'F', weight: 3 },
];

const META: Record<GraphAlgo, { name: string; pseudocode: string }> = {
  bfs: {
    name: 'Breadth-First Search (BFS)',
    pseudocode: `def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
  },
  dfs: {
    name: 'Depth-First Search (DFS)',
    pseudocode: `def dfs(graph, start, visited=None):
    if visited is None: visited = set()
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)`,
  },
  dijkstra: {
    name: "Dijkstra's Shortest Path",
    pseudocode: `def dijkstra(graph, start):
    dist = {n: inf for n in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heappop(pq)
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heappush(pq, (dist[v], v))`,
  },
  mst: {
    name: "Kruskal's Minimum Spanning Tree",
    pseudocode: `def kruskal(edges, n):
    mst = []
    edges.sort(key=lambda e: e.weight)
    dsu = DSU(n)
    for u, v, weight in edges:
        if dsu.find(u) != dsu.find(v):
            dsu.union(u, v)
            mst.append((u, v))
    return mst`,
  },
};

export const GraphVisualizer: React.FC = () => {
  const [algo, setAlgo] = useState<GraphAlgo>('dijkstra');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(900);

  const steps: GraphStep[] = useMemo(() => {
    const generated: GraphStep[] = [];

    if (algo === 'bfs') {
      const sequence = [
        { active: 'A', visited: ['A'], frontier: ['B', 'C'], edges: [], line: 2, exp: 'Start BFS at node A. Add neighbors B and C to queue.' },
        { active: 'B', visited: ['A', 'B'], frontier: ['C', 'D'], edges: ['A-B'], line: 5, exp: 'Dequeue B. Enqueue unvisited neighbor D.' },
        { active: 'C', visited: ['A', 'B', 'C'], frontier: ['D', 'E'], edges: ['A-B', 'A-C'], line: 5, exp: 'Dequeue C. Enqueue unvisited neighbor E.' },
        { active: 'D', visited: ['A', 'B', 'C', 'D'], frontier: ['E', 'F'], edges: ['A-B', 'A-C', 'B-D'], line: 5, exp: 'Dequeue D. Enqueue unvisited neighbor F.' },
        { active: 'E', visited: ['A', 'B', 'C', 'D', 'E'], frontier: ['F'], edges: ['A-B', 'A-C', 'B-D', 'C-E'], line: 5, exp: 'Dequeue E. All neighbors already queued or visited.' },
        { active: 'F', visited: ['A', 'B', 'C', 'D', 'E', 'F'], frontier: [], edges: ['A-B', 'A-C', 'B-D', 'C-E', 'D-F'], line: 5, exp: 'Dequeue F. Queue empty — BFS traversal complete in O(V + E)!' },
      ];

      generated.push({
        visitedNodes: [],
        frontierNodes: ['A'],
        highlightedEdges: [],
        explanation: 'Initialize BFS with start node A.',
        pseudocodeLine: 1,
      });

      sequence.forEach((s) => {
        generated.push({
          activeNode: s.active,
          visitedNodes: s.visited,
          frontierNodes: s.frontier,
          highlightedEdges: s.edges,
          explanation: s.exp,
          pseudocodeLine: s.line,
        });
      });
    } else if (algo === 'dfs') {
      const sequence = [
        { active: 'A', visited: ['A'], edges: [], exp: 'Start DFS at A.' },
        { active: 'B', visited: ['A', 'B'], edges: ['A-B'], exp: 'DFS deeper to neighbor B.' },
        { active: 'C', visited: ['A', 'B', 'C'], edges: ['A-B', 'B-C'], exp: 'DFS deeper to neighbor C.' },
        { active: 'E', visited: ['A', 'B', 'C', 'E'], edges: ['A-B', 'B-C', 'C-E'], exp: 'DFS deeper to neighbor E.' },
        { active: 'D', visited: ['A', 'B', 'C', 'E', 'D'], edges: ['A-B', 'B-C', 'C-E', 'D-E'], exp: 'DFS explores D from E.' },
        { active: 'F', visited: ['A', 'B', 'C', 'E', 'D', 'F'], edges: ['A-B', 'B-C', 'C-E', 'D-E', 'D-F'], exp: 'DFS reaches F. All nodes explored.' },
      ];

      generated.push({
        visitedNodes: [],
        frontierNodes: [],
        highlightedEdges: [],
        explanation: 'Initialize DFS traversal with Call Stack.',
        pseudocodeLine: 1,
      });

      sequence.forEach((s) => {
        generated.push({
          activeNode: s.active,
          visitedNodes: s.visited,
          frontierNodes: [],
          highlightedEdges: s.edges,
          explanation: s.exp,
          pseudocodeLine: 3,
        });
      });
    } else if (algo === 'dijkstra') {
      const sequence = [
        {
          active: 'A',
          visited: ['A'],
          frontier: ['B', 'C'],
          edges: [],
          dist: { A: 0, B: 4, C: 2, D: '∞', E: '∞', F: '∞' },
          line: 3,
          exp: 'Start Dijkstra at A (dist=0). Relax neighbors: dist[C]=2, dist[B]=4.',
        },
        {
          active: 'C',
          visited: ['A', 'C'],
          frontier: ['B', 'E'],
          edges: ['A-C'],
          dist: { A: 0, B: 3, C: 2, D: 12, E: 10, F: '∞' },
          line: 7,
          exp: 'Extract min node C (dist=2). Relax neighbor B through C: 2 + 1 = 3 < 4! Update dist[B]=3.',
        },
        {
          active: 'B',
          visited: ['A', 'C', 'B'],
          frontier: ['D', 'E'],
          edges: ['A-C', 'B-C'],
          dist: { A: 0, B: 3, C: 2, D: 8, E: 10, F: '∞' },
          line: 7,
          exp: 'Extract min node B (dist=3). Relax neighbor D: 3 + 5 = 8 < 12. Update dist[D]=8.',
        },
        {
          active: 'D',
          visited: ['A', 'C', 'B', 'D'],
          frontier: ['E', 'F'],
          edges: ['A-C', 'B-C', 'B-D'],
          dist: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 14 },
          line: 7,
          exp: 'Extract min node D (dist=8). Relax neighbor F: 8 + 6 = 14.',
        },
        {
          active: 'E',
          visited: ['A', 'C', 'B', 'D', 'E'],
          frontier: ['F'],
          edges: ['A-C', 'B-C', 'B-D', 'D-E'],
          dist: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 13 },
          line: 7,
          exp: 'Extract min node E (dist=10). Relax F through E: 10 + 3 = 13 < 14! Update dist[F]=13.',
        },
        {
          active: 'F',
          visited: ['A', 'C', 'B', 'D', 'E', 'F'],
          frontier: [],
          edges: ['A-C', 'B-C', 'B-D', 'D-E', 'E-F'],
          dist: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 13 },
          line: 6,
          exp: 'Extract target F (dist=13). Shortest path from A to F is A -> C -> B -> D -> E -> F with cost 13.',
        },
      ];

      generated.push({
        visitedNodes: [],
        frontierNodes: ['A'],
        highlightedEdges: [],
        distances: { A: 0, B: '∞', C: '∞', D: '∞', E: '∞', F: '∞' },
        explanation: 'Initialize single-source shortest path table with start node A.',
        pseudocodeLine: 2,
      });

      sequence.forEach((s) => {
        generated.push({
          activeNode: s.active,
          visitedNodes: s.visited,
          frontierNodes: s.frontier,
          highlightedEdges: s.edges,
          distances: s.dist,
          explanation: s.exp,
          pseudocodeLine: s.line,
        });
      });
    } else if (algo === 'mst') {
      const sequence = [
        { edge: 'B-C', exp: 'Inspect sorted edges: B-C (weight 1) does not create cycle. Add to MST.' },
        { edge: 'A-C', exp: 'Edge A-C (weight 2) connects A to {B,C}. Add to MST.' },
        { edge: 'D-E', exp: 'Edge D-E (weight 2) connects D and E. Add to MST.' },
        { edge: 'E-F', exp: 'Edge E-F (weight 3) connects F to {D,E}. Add to MST.' },
        { edge: 'B-D', exp: 'Edge B-D (weight 5) bridges the two components {A,B,C} and {D,E,F}. Add to MST!' },
      ];

      const chosenEdges: string[] = [];

      generated.push({
        visitedNodes: [],
        frontierNodes: [],
        highlightedEdges: [],
        explanation: "Kruskal's algorithm sorts all edges by weight, then greedily unions components using DSU.",
        pseudocodeLine: 3,
      });

      sequence.forEach((s) => {
        chosenEdges.push(s.edge);
        generated.push({
          visitedNodes: ['A', 'B', 'C', 'D', 'E', 'F'],
          frontierNodes: [],
          highlightedEdges: [...chosenEdges],
          explanation: `${s.exp} Total MST weight: 1 + 2 + 2 + 3 + 5 = 13.`,
          pseudocodeLine: 6,
        });
      });
    }

    return generated;
  }, [algo]);

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
  const meta = META[algo];

  return (
    <div className="space-y-6">
      {/* Algorithm selector pills */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center gap-2">
        {(Object.keys(META) as GraphAlgo[]).map((a) => (
          <button
            key={a}
            onClick={() => {
              setAlgo(a);
              setCurrentStepIdx(0);
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              algo === a
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {META[a].name}
          </button>
        ))}
      </div>

      {/* Main SVG Graph Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
        <div className="w-full flex justify-center overflow-x-auto">
          <svg viewBox="0 0 520 240" className="w-full max-w-lg h-auto select-none">
            {/* Edges */}
            {GRAPH_EDGES.map((edge) => {
              const uNode = GRAPH_NODES.find((n) => n.id === edge.u)!;
              const vNode = GRAPH_NODES.find((n) => n.id === edge.v)!;
              const edgeKey1 = `${edge.u}-${edge.v}`;
              const edgeKey2 = `${edge.v}-${edge.u}`;
              const isHighlighted =
                step.highlightedEdges.includes(edgeKey1) ||
                step.highlightedEdges.includes(edgeKey2);

              const midX = (uNode.x + vNode.x) / 2;
              const midY = (uNode.y + vNode.y) / 2;

              return (
                <g key={`edge-${edge.u}-${edge.v}`}>
                  <line
                    x1={uNode.x}
                    y1={uNode.y}
                    x2={vNode.x}
                    y2={vNode.y}
                    className={`transition-all duration-300 ${
                      isHighlighted
                        ? 'stroke-violet-600 stroke-[3.5]'
                        : 'stroke-slate-300 dark:stroke-slate-700 stroke-2'
                    }`}
                  />
                  {/* Weight label badge */}
                  {edge.weight !== undefined && (
                    <g transform={`translate(${midX}, ${midY})`}>
                      <circle r={9} className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700" />
                      <text
                        textAnchor="middle"
                        dy={3.5}
                        className="font-mono text-[9px] font-bold fill-slate-500"
                      >
                        {edge.weight}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {GRAPH_NODES.map((node) => {
              const isActive = step.activeNode === node.id;
              const isVisited = step.visitedNodes.includes(node.id);
              const isFrontier = step.frontierNodes.includes(node.id);

              return (
                <g key={`node-${node.id}`} className="transition-all duration-300">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'fill-violet-600 stroke-violet-300 stroke-4 filter drop-shadow'
                        : isFrontier
                        ? 'fill-amber-500 stroke-amber-200 stroke-3 animate-pulse'
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
                      isActive || isVisited || isFrontier
                        ? 'fill-white'
                        : 'fill-slate-800 dark:fill-slate-200'
                    }`}
                  >
                    {node.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Distance Table (for Dijkstra) */}
        {algo === 'dijkstra' && step.distances && (
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 text-center">
              Dijkstra Distance Table (Start: A)
            </span>
            <div className="grid grid-cols-6 gap-2 text-center font-mono text-xs">
              {Object.entries(step.distances).map(([node, dist]) => (
                <div key={node} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px] font-bold">Node {node}</span>
                  <span className="font-bold text-violet-600 dark:text-violet-400">{dist}</span>
                </div>
              ))}
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
