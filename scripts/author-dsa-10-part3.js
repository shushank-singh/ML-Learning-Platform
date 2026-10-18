const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m10 = getExistingDSALessons(10);
const m10Lessons = { ...m10.lessons };

m10Lessons['dsa-graph-floyd-warshall'] = {
  id: 'dsa-graph-floyd-warshall',
  moduleId: 'dsa-module-10',
  title: 'Floyd-Warshall: All-Pairs Shortest Path',
  subtitle: 'Dynamic Programming over Intermediate Vertices in O(V³) Time',
  order: 10,
  readTimeMinutes: 22,
  difficulty: 'Advanced',
  visualizerType: 'graph',
  objectives: [
    'Compute shortest paths between every pair of vertices in a weighted graph.',
    'Formulate the 3D DP recurrence over intermediate vertex sets {1..k}.',
    'Optimize DP table space from O(V³) to in-place O(V²).',
    'Detect negative cycles when diagonal matrix entries dist[i][i] become negative.'
  ],
  prerequisites: ['Bellman-Ford Algorithm', 'Graph Representation: Adjacency List and Matrix'],
  analogy: {
    title: 'Flight Layovers Through Major Hub Airports',
    text: 'To find the cheapest flight between any two small cities in the world, an airline booking engine first considers direct flights. Next, it tests if stopping over in Chicago (Hub 1) makes the ticket cheaper. Then it tests adding Atlanta (Hub 2) as an option, then Dallas (Hub 3), until all possible layover airports have been evaluated.',
    metaphor: 'Floyd-Warshall tests whether routing path i -> j through intermediate vertex k reduces total cost.'
  },
  problemSolved: {
    title: 'Computing All-Pairs Distances Simultaneously',
    description: 'Running Dijkstra from every vertex takes O(V * (V + E) log V), which can be complex to implement with negative weights. Floyd-Warshall computes all V² pairwise shortest distances in clean, compact triple-nested loops in O(V³) time.',
    keyPoints: [
      'Computes all-pairs shortest paths in O(V³) time.',
      'Handles positive and negative edge weights.',
      'Extremely compact implementation (5 lines of core code).'
    ]
  },
  intuition: {
    overview: 'Let dist[i][j] be the shortest distance from i to j using only intermediate vertices from {0..k-1}. When considering vertex k as a new potential layover: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).',
    steps: [
      { step: 1, title: 'Base Matrix', description: 'dist[i][i] = 0; dist[i][j] = weight(i, j) if edge exists, else inf.' },
      { step: 2, title: 'Triple Loop (k outer)', description: 'For k from 0 to V-1: for i in 0..V-1: for j in 0..V-1: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).' },
      { step: 3, title: 'Negative Cycle Check', description: 'If dist[i][i] < 0 for any i, a negative cycle exists.' }
    ]
  },
  formalDefinition: {
    text: 'Let d^{(k)}[i][j] be the shortest path from i to j with all intermediate vertices in \\{0, 1, ..., k\\}. Recurrence: d^{(k)}[i][j] = \\min\\big(d^{(k-1)}[i][j], \\; d^{(k-1)}[i][k] + d^{(k-1)}[k][j]\\big).',
    latex: 'd^{(k)}[i][j] = \\min\\left( d^{(k-1)}[i][j], \\; d^{(k-1)}[i][k] + d^{(k-1)}[k][j] \\right)'
  },
  complexity: {
    overview: 'Time: O(V³) strictly due to triple nested loops. Space: O(V²) for 2D matrix.',
    cases: [
      { case: 'Best', time: 'O(V³)', space: 'O(V²)', explanation: 'Always runs all triple loop iterations.' },
      { case: 'Average', time: 'O(V³)', space: 'O(V²)', explanation: 'Deterministic O(V³).' },
      { case: 'Worst', time: 'O(V³)', space: 'O(V²)', explanation: 'Dense graphs with V vertices.' }
    ],
    spaceNote: 'O(V²) space for distance matrix.'
  },
  workedExample: {
    title: 'Shortest paths for 3 nodes: (0, 1, 3), (1, 2, 1), (0, 2, 8)',
    input: 'n=3. Direct 0->2 is 8. But 0->1 is 3 and 1->2 is 1.',
    steps: [
      { step: 1, action: 'Initial Matrix', state: 'dist[0][2] = 8', explanation: 'Direct edge.' },
      { step: 2, action: 'When k=1 (test layover at 1)', state: 'dist[0][1] + dist[1][2] = 3 + 1 = 4 < 8', explanation: 'Layover at 1 improves path!' },
      { step: 3, action: 'Update cell', state: 'dist[0][2] becomes 4', explanation: 'Shortest path found.' }
    ],
    finalOutput: 'dist[0][2] = 4'
  },
  visualExplanation: {
    title: 'Intermediate Layover Hub Routing',
    description: 'Visualizing vertex k acting as a pivot connecting node i to node j.',
    features: ['Hub k highlighted in yellow', 'Path i -> k -> j compared against direct path i -> j']
  },
  pseudocode: {
    title: 'Floyd-Warshall Algorithm',
    code: `function floydWarshall(n, edges):
    dist = matrix of size n x n filled with infinity
    for i in 0..n-1: dist[i][i] = 0
    for u, v, w in edges: dist[u][v] = w

    for k from 0 to n - 1: # MUST BE OUTER LOOP!
        for i from 0 to n - 1:
            for j from 0 to n - 1:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`
  },
  pythonCode: {
    title: 'Python Floyd-Warshall Implementation',
    code: `def floyd_warshall(n: int, edges: list[list[int]]) -> list[list[float]]:
    dist = [[float('inf')] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = w

    # k must be the outermost loop
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    # Negative cycle check
    for i in range(n):
        if dist[i][i] < 0:
            raise ValueError("Negative weight cycle detected")

    return dist`,
    explanation: 'Computes all-pairs shortest paths in O(V³) time with in-place O(V²) space.'
  },
  runnableCode: {
    code: `edges = [[0, 1, 3], [1, 2, 1], [0, 2, 8]]
matrix = floyd_warshall(3, edges)
print(matrix[0])`,
    expectedOutput: `[0, 3, 4]`
  },
  lineByLineExplanation: [
    { line: 9, code: 'for k in range(n):', explanation: 'k MUST be the outer loop: builds DP subproblems by adding intermediate vertex candidates one by one.' },
    { line: 12, code: 'if dist[i][k] + dist[k][j] < dist[i][j]:', explanation: 'Checks if detouring through vertex k reduces the total cost from i to j.' }
  ],
  edgeCases: [
    { case: 'Negative cycle reachable', handling: 'Diagonal element dist[i][i] becomes negative (< 0); raises error or flags cycle.', example: 'dist[1][1] = -2' }
  ],
  commonMistakes: [
    { mistake: 'Placing k as the innermost loop instead of outermost', solution: 'If k is innermost, paths cannot chain through multiple intermediate nodes; k MUST be the outermost loop.', codeExample: 'for k in range(n): # OUTERMOST' }
  ],
  applications: [
    { industry: 'Telecommunications', application: 'Global network routing tables (computing transitive closures)', benefit: 'Builds all-to-all optimal latency routing matrix.' }
  ],
  practiceQuestions: [
    { id: 'pq-fw-1', question: 'How can Floyd-Warshall be adapted to compute Transitive Closure (reachability matrix)?', hint: 'Use boolean OR and AND.', answer: 'Warshall\'s algorithm sets reach[i][j] = reach[i][j] or (reach[i][k] and reach[k][j]) using boolean operations.' }
  ],
  quiz: [
    { id: 'q-fw-1', question: 'Why must the intermediate vertex loop k be the outermost loop in Floyd-Warshall?', options: ['To ensure all shorter paths using vertices {0..k-1} are fully finalized before introducing vertex k', 'Because Python executes outer loops faster', 'To avoid index errors', 'Because matrices are row-major'], correctIndex: 0, explanation: 'The DP state relies on having fully computed all paths using intermediate vertices up to k-1 before allowing vertex k to be used.' }
  ],
  codingChallenge: {
    title: 'Find the City with the Smallest Number of Neighbors at a Threshold Distance',
    problem: 'Given n cities and edges with weights, find the city that can reach the fewest number of cities within distanceThreshold. If there are ties, return the city with the greatest index.',
    hints: ['Run Floyd-Warshall to get all-pairs distances, then count reachable cities for each i.'],
    starterCode: `def find_the_city(n: int, edges: list[list[int]], distanceThreshold: int) -> int:
    # TODO: Find optimal city
    pass`,
    solution: `def find_the_city(n: int, edges: list[list[int]], distanceThreshold: int) -> int:
    dist = [[float('inf')] * n for _ in range(n)]
    for i in range(n): dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = w
        dist[v][u] = w
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    min_count = float('inf')
    best_city = -1
    for i in range(n):
        count = sum(1 for j in range(n) if i != j and dist[i][j] <= distanceThreshold)
        if count <= min_count:
            min_count = count
            best_city = i
    return best_city`
  },
  summary: {
    keyTakeaways: ['Floyd-Warshall solves all-pairs shortest paths in O(V³) time.', 'The intermediate vertex k loop must strictly be the outermost loop.'],
    nextLessonId: 'dsa-graph-mst',
    nextLessonTitle: 'Minimum Spanning Trees: Prim and Kruskal',
    nextLessonModuleId: 'dsa-module-10'
  }
};

m10Lessons['dsa-graph-mst'] = {
  id: 'dsa-graph-mst',
  moduleId: 'dsa-module-10',
  title: 'Minimum Spanning Trees: Prim and Kruskal',
  subtitle: 'Greedy Cut Property, Cycle Avoidance, and Spanning Forest Algorithms',
  order: 11,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'graph',
  objectives: [
    'Define Minimum Spanning Tree (MST): connecting all V vertices with V - 1 edges of minimal total weight.',
    'Implement Kruskal\'s Algorithm using edge sorting and Disjoint Set Union (Union-Find) in O(E log E).',
    'Implement Prim\'s Algorithm using priority queues in O((V + E) log V).',
    'Prove correctness using the Cut Property and Cycle Property.'
  ],
  prerequisites: ['Graph Representation: Adjacency List and Matrix', 'Dijkstra\'s Shortest Path Algorithm'],
  analogy: {
    title: 'Laying Fiber-Optic Cable Between Towns',
    text: 'A telecommunications company must lay fiber optic cables connecting 10 towns. Digging trenches between towns has different costs. The company wants to ensure every town can communicate with every other town, but wants to minimize the total trench-digging cost. The optimal network is a Minimum Spanning Tree.',
    metaphor: 'An MST connects all vertices with the minimum possible total edge cost and zero cycles.'
  },
  problemSolved: {
    title: 'Connecting Infrastructure Networks with Minimum Material Cost',
    description: 'Constructing electrical grids, pipeline networks, or computer subnetworks requires connecting all nodes without redundant loops at minimal expense.',
    keyPoints: [
      'Connects all V vertices using exactly V - 1 edges.',
      'Total edge weight is globally minimized.',
      'Kruskal\'s: edge-centric (sort edges + Union-Find). Prim\'s: vertex-centric (grow tree via min-heap).'
    ]
  },
  intuition: {
    overview: 'Kruskal: Sort all edges by weight. Iterate through sorted edges: if adding edge does not form a cycle (checked via Union-Find), include it. Stop when V - 1 edges chosen.',
    steps: [
      { step: 1, title: 'Sort Edges', description: 'Sort all edges ascending by weight in O(E log E).' },
      { step: 2, title: 'Union-Find Check', description: 'For (u, v, w) in sorted edges: if find(u) != find(v): union(u, v); add w to MST total.' },
      { step: 3, title: 'Termination', description: 'Stops when V - 1 edges are selected.' }
    ]
  },
  formalDefinition: {
    text: 'For connected, undirected, weighted graph G = (V, E, w), an MST is an acyclic subgraph T = (V, E_T) with E_T \\subseteq E, |E_T| = |V| - 1, minimizing w(T) = \\sum_{e \\in E_T} w(e). Cut Property: for any cut (S, V \\setminus S), the minimum-weight crossing edge belongs to an MST.',
    latex: 'w(T) = \\min_{T\' \\subseteq E} \\sum_{e \\in T\'} w(e) \\quad \\text{subject to } T\' \\text{ spans } V \\land |T\'| = |V| - 1'
  },
  complexity: {
    overview: 'Kruskal: O(E log E). Prim: O((V + E) log V). Space: O(V + E).',
    cases: [
      { case: 'Best', time: 'O(E log E)', space: 'O(V)', explanation: 'Kruskal dominates for sparse graphs (E << V²).' },
      { case: 'Average', time: 'O(E log E)', space: 'O(V)', explanation: 'Optimal edge selection.' },
      { case: 'Worst', time: 'O(E log E)', space: 'O(V)', explanation: 'Dense graph with V² edges.' }
    ],
    spaceNote: 'O(V) memory for Union-Find parent array.'
  },
  workedExample: {
    title: 'Kruskal on Triangle: (0,1,1), (1,2,2), (0,2,3)',
    input: 'Edges: (0, 1, 1), (1, 2, 2), (0, 2, 3), V=3',
    steps: [
      { step: 1, action: 'Sort edges', state: '[(0,1,1), (1,2,2), (0,2,3)]', explanation: 'Sorted ascending.' },
      { step: 2, action: 'Pick (0, 1, 1)', state: 'find(0) != find(1) -> Union(0, 1), MST cost = 1', explanation: 'First edge included.' },
      { step: 3, action: 'Pick (1, 2, 2)', state: 'find(1) != find(2) -> Union(1, 2), MST cost = 1 + 2 = 3', explanation: 'Second edge included (V - 1 = 2 edges chosen).' },
      { step: 4, action: 'Check (0, 2, 3)', state: 'find(0) == find(2) -> Skip! Forms cycle.', explanation: 'Discarded by Union-Find.' }
    ],
    finalOutput: 'MST Weight = 3'
  },
  visualExplanation: {
    title: 'Kruskal Edge Selection vs Prim Growing Tree',
    description: 'Visualizing edges locking in green one by one, avoiding red cyclic connections.',
    features: ['Sorted edge list processed sequentially', 'Union-Find clusters merge seamlessly']
  },
  pseudocode: {
    title: 'Kruskal\'s Algorithm',
    code: `function kruskal(n, edges):
    sort(edges by weight)
    uf = new DisjointSet(n)
    mst_cost = 0
    edges_count = 0
    for u, v, w in edges:
        if uf.union(u, v):
            mst_cost += w
            edges_count += 1
            if edges_count == n - 1: break
    return mst_cost`
  },
  pythonCode: {
    title: 'Python Kruskal\'s Algorithm Implementation',
    code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i):
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i]) # Path compression
        return self.parent[i]

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i == root_j:
            return False # Cycle detected
        if self.rank[root_i] < self.rank[root_j]:
            self.parent[root_i] = root_j
        elif self.rank[root_i] > self.rank[root_j]:
            self.parent[root_j] = root_i
        else:
            self.parent[root_j] = root_i
            self.rank[root_i] += 1
        return True

def kruskal_mst(n: int, edges: list[list[int]]) -> int:
    # edges: [u, v, weight]
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(n)
    total_cost = 0
    edges_chosen = 0

    for u, v, w in edges:
        if uf.union(u, v):
            total_cost += w
            edges_chosen += 1
            if edges_chosen == n - 1:
                break

    return total_cost if edges_chosen == n - 1 else -1`,
    explanation: 'Uses Union-Find with path compression and rank union for near-linear Kruskal MST.'
  },
  runnableCode: {
    code: `edges = [[0, 1, 1], [1, 2, 2], [0, 2, 3]]
print(kruskal_mst(3, edges))`,
    expectedOutput: `3`
  },
  lineByLineExplanation: [
    { line: 26, code: 'edges.sort(key=lambda x: x[2])', explanation: 'Greedy strategy: processes edges in non-decreasing order of weight in O(E log E) time.' },
    { line: 32, code: 'if uf.union(u, v):', explanation: 'Union returns False if u and v are already connected, preventing cycle creation.' }
  ],
  edgeCases: [
    { case: 'Disconnected graph', handling: 'edges_chosen < n - 1; returns -1 (spanning tree impossible).', example: 'Graph with 2 disconnected islands' }
  ],
  commonMistakes: [
    { mistake: 'Attempting to run Kruskal without sorting edges first', solution: 'The greedy proof strictly requires edges to be considered in ascending order of cost.', codeExample: 'edges.sort(key=lambda x: x[2])' }
  ],
  applications: [
    { industry: 'Telecommunications', application: 'Cable network routing and water pipe distribution', benefit: 'Minimizes total infrastructure layout cost.' }
  ],
  practiceQuestions: [
    { id: 'pq-mst-1', question: 'When is Prim\'s algorithm faster than Kruskal\'s algorithm?', hint: 'Consider dense graphs where E is close to V².', answer: 'Prim\'s algorithm with an adjacency matrix runs in O(V²) time, which is faster than Kruskal\'s O(V² log V) on very dense graphs.' }
  ],
  quiz: [
    { id: 'q-mst-1', question: 'How many edges are in a Minimum Spanning Tree of a connected graph with V vertices?', options: ['V - 1', 'V', 'V + 1', 'E / 2'], correctIndex: 0, explanation: 'Any spanning tree connecting V vertices contains exactly V - 1 edges.' }
  ],
  codingChallenge: {
    title: 'Min Cost to Connect All Points',
    problem: 'Given an array points representing integer coordinates on a 2D-plane, return the minimum cost to make all points connected using Manhattan distance |xi - xj| + |yi - yj|.',
    hints: ['Model as a complete graph and run Prim\'s or Kruskal\'s algorithm.'],
    starterCode: `def min_cost_connect_points(points: list[list[int]]) -> int:
    # TODO: Find MST Manhattan distance
    pass`,
    solution: `import heapq

def min_cost_connect_points(points: list[list[int]]) -> int:
    n = len(points)
    visited = set()
    pq = [(0, 0)] # (cost, point_idx)
    total_cost = 0
    while len(visited) < n:
        cost, u = heapq.heappop(pq)
        if u in visited: continue
        visited.add(u)
        total_cost += cost
        x1, y1 = points[u]
        for v in range(n):
            if v not in visited:
                x2, y2 = points[v]
                dist = abs(x1 - x2) + abs(y1 - y2)
                heapq.heappush(pq, (dist, v))
    return total_cost`
  },
  summary: {
    keyTakeaways: ['MST connects all V vertices with V - 1 edges minimizing total weight.', 'Kruskal sorts edges and uses Union-Find in O(E log E).'],
    nextLessonId: 'dsa-graph-dsu',
    nextLessonTitle: 'Disjoint Set Union (Union-Find)',
    nextLessonModuleId: 'dsa-module-10'
  }
};

m10Lessons['dsa-graph-dsu'] = {
  id: 'dsa-graph-dsu',
  moduleId: 'dsa-module-10',
  title: 'Disjoint Set Union (Union-Find)',
  subtitle: 'Path Compression, Union by Rank, and the Inverse Ackermann Function α(n)',
  order: 12,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'graph',
  objectives: [
    'Implement the Disjoint Set Union (DSU) data structure.',
    'Master Path Compression to flatten parent trees during find().',
    'Master Union by Rank/Size to attach shallower trees under deeper trees.',
    'Understand why combined heuristics achieve amortized O(\\alpha(n)) near-constant time.'
  ],
  prerequisites: ['Tree Terminology and Representation', 'Connected Components'],
  analogy: {
    title: 'Feudal Kingdoms Merging Alliances',
    text: 'In medieval times, every village belonged to a regional lord, and lords pledged allegiance to a King (the set representative). When two kingdoms allied, the King with fewer soldiers pledged loyalty to the King with the larger army (Union by Rank). When a peasant needed to pay taxes, they bypassed local lords and sent tributes directly to the King (Path Compression).',
    metaphor: 'DSU groups items into dynamic partitions with ultra-fast representative lookups.'
  },
  problemSolved: {
    title: 'Near-Instant Dynamic Connectivity and Cycle Detection',
    description: 'Checking whether two nodes are in the same connected component naively requires running BFS/DFS in O(V + E). DSU answers connectivity queries and merges sets in amortized O(\\alpha(n)) \\approx O(1) time.',
    keyPoints: [
      'Amortized O(\\alpha(n)) time per operation (practically <= 4 for all universe sizes).',
      'Path compression flattens tree height to 1.',
      'Core primitive for Kruskal\'s MST, percolation, and dynamic equivalence relations.'
    ]
  },
  intuition: {
    overview: 'Each element points to a parent. Root of a tree points to itself (parent[x] == x). `find(x)` follows parents to find root, compressing paths along the way. `union(x, y)` links one root under the other.',
    steps: [
      { step: 1, title: 'Find with Path Compression', description: 'parent[x] = find(parent[x]) rewires all traversed nodes directly to root.' },
      { step: 2, title: 'Union by Rank', description: 'Attach smaller rank root under larger rank root to prevent tree height growth.' },
      { step: 3, title: 'Check Connected', description: 'find(x) == find(y) checks if x and y share the same set in O(1).' }
    ]
  },
  formalDefinition: {
    text: 'A disjoint-set data structure maintains collection \\mathcal{S} = \\{S_1, S_2, ..., S_k\\} of disjoint dynamic sets. Robert Tarjan proved that path compression combined with union by rank achieves amortized time O(m \\alpha(n)) for m operations on n elements.',
    latex: '\\alpha(n) \\le 4 \\quad \\forall n \\le 10^{80} \\implies T_{\\text{amortized}} = \\mathcal{O}(1)'
  },
  complexity: {
    overview: 'Find and Union run in amortized O(\\alpha(n)) time. Space: O(n).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(n)', explanation: 'Immediate parent is root.' },
      { case: 'Average', time: 'O(\\alpha(n)) \\approx O(1)', space: 'O(n)', explanation: 'Inverse Ackermann growth.' },
      { case: 'Worst', time: 'O(\\log n)', space: 'O(n)', explanation: 'Without path compression (rank only).' }
    ],
    spaceNote: 'O(n) storage for parent and rank arrays.'
  },
  workedExample: {
    title: 'Path Compression during find(3)',
    input: 'Tree: 3 -> 2 -> 1 -> 0 (root)',
    steps: [
      { step: 1, action: 'Traverse upward', state: 'Follow 3 -> 2 -> 1 -> 0', explanation: 'Root 0 identified.' },
      { step: 2, action: 'Unwind and compress', state: 'parent[3]=0, parent[2]=0, parent[1]=0', explanation: 'All nodes rewired directly to 0!' },
      { step: 3, action: 'Next find(3)', state: 'Takes exactly 1 step (parent[3] == 0)', explanation: 'Subsequent operations run in O(1).' }
    ],
    finalOutput: 'Flattened star graph around root 0'
  },
  visualExplanation: {
    title: 'Tree Flattening via Path Compression',
    description: 'Visualizing long vertical chain collapsing into a flat horizontal fan centered on root.',
    features: ['Long linear branch collapses into 1-depth star', 'Future lookups take 1 pointer hop']
  },
  pseudocode: {
    title: 'Optimized DSU Implementation',
    code: `class DSU:
    def __init__(n):
        parent = array 0..n-1
        rank = array of size n with 0

    def find(i):
        if parent[i] != i:
            parent[i] = find(parent[i]) # Path compression
        return parent[i]

    def union(i, j):
        root_i = find(i)
        root_j = find(j)
        if root_i == root_j: return False
        if rank[root_i] < rank[root_j]:
            parent[root_i] = root_j
        elif rank[root_i] > rank[root_j]:
            parent[root_j] = root_i
        else:
            parent[root_j] = root_i
            rank[root_i] += 1
        return True`
  },
  pythonCode: {
    title: 'Production-Grade DSU Class',
    code: `class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.num_components = n

    def find(self, i: int) -> int:
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i]) # Path compression
        return self.parent[i]

    def union(self, i: int, j: int) -> bool:
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i == root_j:
            return False
            
        # Union by rank
        if self.rank[root_i] < self.rank[root_j]:
            self.parent[root_i] = root_j
        elif self.rank[root_i] > self.rank[root_j]:
            self.parent[root_j] = root_i
        else:
            self.parent[root_j] = root_i
            self.rank[root_i] += 1
            
        self.num_components -= 1
        return True

    def connected(self, i: int, j: int) -> bool:
        return self.find(i) == self.find(j)`,
    explanation: 'Combines path compression with union-by-rank and tracks number of distinct components.'
  },
  runnableCode: {
    code: `dsu = DSU(5)
dsu.union(0, 1)
dsu.union(1, 2)
print(dsu.connected(0, 2)) # True
print(dsu.connected(0, 3)) # False
print(dsu.num_components)  # 3`,
    expectedOutput: `True\nFalse\n3`
  },
  lineByLineExplanation: [
    { line: 9, code: 'self.parent[i] = self.find(self.parent[i])', explanation: 'Path compression: recursively finds root and updates parent pointer directly to that root.' },
    { line: 24, code: 'self.num_components -= 1', explanation: 'Every successful union merges two components, decrementing total count.' }
  ],
  edgeCases: [
    { case: 'Self-union (union(u, u))', handling: 'root_i == root_j check safely returns False.', example: 'dsu.union(2, 2)' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting to assign self.parent[i] = self.find(self.parent[i]) during find', solution: 'Simply calling find without reassigning misses path compression, allowing trees to degrade to O(n) depth.', codeExample: 'self.parent[i] = self.find(self.parent[i])' }
  ],
  applications: [
    { industry: 'Image Processing', application: 'Connected component labeling in binary raster masks', benefit: 'Merges adjacent pixels into labeled objects in near-instant time.' }
  ],
  practiceQuestions: [
    { id: 'pq-dsu-1', question: 'What is the value of the Inverse Ackermann function \\alpha(n) for the number of atoms in the observable universe (~10^80)?', hint: 'It grows extraordinarily slowly.', answer: 'Even for 10^80, \\alpha(n) <= 4, which is why it is practically considered constant O(1).' }
  ],
  quiz: [
    { id: 'q-dsu-1', question: 'What does Path Compression do in Union-Find?', options: ['Makes every node on the find path point directly to the root', 'Balances trees by height', 'Deletes unused nodes', 'Compresses arrays using gzip'], correctIndex: 0, explanation: 'Path compression re-points all visited nodes along the search path directly to the root, drastically flattening the tree.' }
  ],
  codingChallenge: {
    title: 'Redundant Connection',
    problem: 'Given a tree with n nodes (labeled 1 to n) that has one additional edge added forming a cycle, return an edge that can be removed so that the resulting graph is a tree.',
    hints: ['Iterate through edges and call union(). The first edge where union() returns False is redundant!'],
    starterCode: `def find_redundant_connection(edges: list[list[int]]) -> list[int]:
    # TODO: Find edge causing cycle
    pass`,
    solution: `def find_redundant_connection(edges: list[list[int]]) -> list[int]:
    parent = list(range(len(edges) + 1))
    def find(i):
        if parent[i] != i:
            parent[i] = find(parent[i])
        return parent[i]
    for u, v in edges:
        root_u, root_v = find(u), find(v)
        if root_u == root_v:
            return [u, v]
        parent[root_u] = root_v
    return []`
  },
  summary: {
    keyTakeaways: ['DSU provides near-instant O(\\alpha(n)) connectivity queries and set unions.', 'Path compression flattens trees; union-by-rank minimizes depth growth.'],
    nextLessonId: 'dsa-graph-bridges',
    nextLessonTitle: 'Bridges and Articulation Points',
    nextLessonModuleId: 'dsa-module-10'
  }
};

m10Lessons['dsa-graph-bridges'] = {
  id: 'dsa-graph-bridges',
  moduleId: 'dsa-module-10',
  title: 'Bridges and Articulation Points',
  subtitle: 'Tarjan\'s Bridge-Finding Algorithm, Discovery Times, and Low-Link Values in O(V + E)',
  order: 13,
  readTimeMinutes: 24,
  difficulty: 'Advanced',
  visualizerType: 'graph',
  objectives: [
    'Define Bridges (critical edges whose removal disconnects the graph) and Articulation Points (cut vertices).',
    'Calculate discovery times tin[u] and low-link values low[u] in a single DFS pass.',
    'Formulate the bridge condition: low[v] > tin[u].',
    'Formulate the articulation point condition: low[v] >= tin[u] for non-root, and children > 1 for root.'
  ],
  prerequisites: ['Depth-First Search (DFS)', 'Connected Components'],
  analogy: {
    title: 'The Sole Suspension Bridge to an Island City',
    text: 'A coastal city is connected to the mainland by five suspension bridges, but one residential island is connected by only a single bridge. If that single bridge collapses, the island is completely cut off from the mainland. That critical link is a bridge.',
    metaphor: 'A bridge is an edge whose removal increases the number of connected components.'
  },
  problemSolved: {
    title: 'Vulnerability Analysis in Mission-Critical Infrastructure',
    description: 'Testing whether removing each edge breaks connectivity naively takes O(E * (V + E)) = O(E²). Tarjan\'s algorithm identifies ALL bridges and articulation points in a single linear DFS pass in O(V + E) time.',
    keyPoints: [
      'Finds all single-point failure edges and vertices in O(V + E).',
      'low[u] tracks earliest ancestor reachable via back-edges.',
      'Core technique for network reliability and power grid stability analysis.'
    ]
  },
  intuition: {
    overview: '`tin[u]` is the timestamp when vertex u is first discovered. `low[u]` is the lowest `tin` reachable from u via its subtree and at most one back-edge. If neighbor v cannot reach u or any ancestor of u (`low[v] > tin[u]`), then edge (u, v) is a bridge!',
    steps: [
      { step: 1, title: 'Timestamp Tracking', description: 'tin[u] = low[u] = timer; timer++.' },
      { step: 2, title: 'Tree Edge Recursion', description: 'For neighbor v != parent: if unvisited: dfs(v); low[u] = min(low[u], low[v]).' },
      { step: 3, title: 'Bridge Check', description: 'If low[v] > tin[u]: (u, v) is a bridge!' },
      { step: 4, title: 'Back-Edge Update', description: 'If v already visited and v != parent: low[u] = min(low[u], tin[v]).' }
    ]
  },
  formalDefinition: {
    text: 'Let T be a DFS tree of undirected graph G. An edge (u, v) in T is a bridge if and only if no vertex in the subtree rooted at v has a back-edge to u or an ancestor of u, formalizing to low[v] > tin[u].',
    latex: '\\text{Edge }(u, v) \\text{ is a Bridge } \\iff \\text{low}[v] > \\text{tin}[u]'
  },
  complexity: {
    overview: 'Time: O(V + E) single DFS traversal. Space: O(V) for tin and low arrays.',
    cases: [
      { case: 'Best', time: 'O(V + E)', space: 'O(V)', explanation: 'Single linear DFS traversal.' },
      { case: 'Average', time: 'O(V + E)', space: 'O(V)', explanation: 'Visits each vertex and edge once.' },
      { case: 'Worst', time: 'O(V + E)', space: 'O(V)', explanation: 'Dense graph.' }
    ],
    spaceNote: 'O(V) memory for timestamps, low-link values, and recursion stack.'
  },
  workedExample: {
    title: 'Finding Bridge in 0-1-2 Triangle with pendant 3 attached to 1: (1, 3)',
    input: 'Edges: (0, 1), (1, 2), (2, 0), (1, 3)',
    steps: [
      { step: 1, action: 'DFS visits 0 -> 1 -> 2', state: 'tin: {0:0, 1:1, 2:2}', explanation: 'Back-edge (2, 0) gives low[2]=0, low[1]=0, low[0]=0.' },
      { step: 2, action: 'From 1, DFS visits 3', state: 'tin[3]=3, low[3]=3', explanation: 'Node 3 is a leaf.' },
      { step: 3, action: 'Evaluate edge (1, 3)', state: 'low[3] = 3 > tin[1] = 1', explanation: 'Condition low[3] > tin[1] holds! Edge (1, 3) is a BRIDGE.' }
    ],
    finalOutput: 'Bridges found: [[1, 3]]'
  },
  visualExplanation: {
    title: 'Low-Link Back-Edge Bypasses',
    description: 'Visualizing back-edges looping back over ancestors, lowering low-link values and disproving bridge status.',
    features: ['Bridges highlighted in bright red', 'Low-link values visualized alongside timestamps']
  },
  pseudocode: {
    title: 'Tarjan\'s Bridge Algorithm',
    code: `function findBridges(n, edges):
    timer = 0
    tin = array of size n with -1
    low = array of size n with -1
    bridges = []
    function dfs(u, p):
        tin[u] = low[u] = timer++
        for v in graph[u]:
            if v == p: continue
            if tin[v] != -1:
                low[u] = min(low[u], tin[v])
            else:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > tin[u]:
                    bridges.append([u, v])
    for i in 0..n-1:
        if tin[i] == -1: dfs(i, -1)
    return bridges`
  },
  pythonCode: {
    title: 'Python Critical Connections (Bridges) Implementation',
    code: `def critical_connections(n: int, connections: list[list[int]]) -> list[list[int]]:
    graph = [[] for _ in range(n)]
    for u, v in connections:
        graph[u].append(v)
        graph[v].append(u)

    tin = [-1] * n
    low = [-1] * n
    timer = 0
    bridges = []

    def dfs(u: int, parent: int):
        nonlocal timer
        tin[u] = low[u] = timer
        timer += 1

        for v in graph[u]:
            if v == parent:
                continue
            if tin[v] != -1:
                # Back-edge
                low[u] = min(low[u], tin[v])
            else:
                # Forward tree edge
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > tin[u]:
                    bridges.append([u, v])

    for i in range(n):
        if tin[i] == -1:
            dfs(i, -1)

    return bridges`,
    explanation: 'Tarjan\'s algorithm identifying all bridges in a single O(V + E) pass.'
  },
  runnableCode: {
    code: `connections = [[0, 1], [1, 2], [2, 0], [1, 3]]
print(critical_connections(4, connections))`,
    expectedOutput: `[[1, 3]]`
  },
  lineByLineExplanation: [
    { line: 24, code: 'low[u] = min(low[u], tin[v])', explanation: 'If neighbor is already visited, it is a back-edge; updates low[u] to the discovery time of the ancestor.' },
    { line: 29, code: 'if low[v] > tin[u]: bridges.append([u, v])', explanation: 'The bridge condition: child v cannot reach u or any node discovered before u, meaning edge (u, v) is the sole bridge.' }
  ],
  edgeCases: [
    { case: 'Complete graph / cycle with no bridges', handling: 'All low[v] <= tin[u]; returns empty list [].', example: 'Triangle graph' }
  ],
  commonMistakes: [
    { mistake: 'Updating low[u] with low[v] instead of tin[v] on back-edges', solution: 'On back-edges, you must use low[u] = min(low[u], tin[v]); using low[v] can inadvertently pull in back-edges from other subtrees.', codeExample: 'low[u] = min(low[u], tin[v])' }
  ],
  applications: [
    { industry: 'Electrical Engineering', application: 'Power transmission grid single-point-of-failure analysis', benefit: 'Flags power transmission lines whose outage causes regional blackouts.' }
  ],
  practiceQuestions: [
    { id: 'pq-br-1', question: 'How is the condition for an Articulation Point different from a Bridge?', hint: 'Look at the inequality and the root node special case.', answer: 'For non-root node u, child v satisfies low[v] >= tin[u]. For root node, it is an articulation point if it has > 1 child in the DFS tree.' }
  ],
  quiz: [
    { id: 'q-br-1', question: 'What condition identifies edge (u, v) as a bridge in Tarjan\'s algorithm?', options: ['low[v] > tin[u]', 'low[v] < tin[u]', 'tin[v] == tin[u]', 'low[v] == 0'], correctIndex: 0, explanation: 'If low[v] > tin[u], child v cannot reach u or any earlier ancestor through any other path, making (u, v) a critical bridge.' }
  ],
  codingChallenge: {
    title: 'Critical Connections in a Network',
    problem: 'Given n servers and a list of connection cables, return all critical connections (bridges) whose removal would sever communication between servers.',
    hints: ['Direct implementation of Tarjan\'s Bridge Finding algorithm.'],
    starterCode: `def critical_connections(n: int, connections: list[list[int]]) -> list[list[int]]:
    # TODO: Find critical connections
    pass`,
    solution: `def critical_connections(n: int, connections: list[list[int]]) -> list[list[int]]:
    graph = [[] for _ in range(n)]
    for u, v in connections:
        graph[u].append(v)
        graph[v].append(u)
    tin = [-1] * n
    low = [-1] * n
    timer = 0
    bridges = []
    def dfs(u, p):
        nonlocal timer
        tin[u] = low[u] = timer
        timer += 1
        for v in graph[u]:
            if v == p: continue
            if tin[v] != -1:
                low[u] = min(low[u], tin[v])
            else:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > tin[u]:
                    bridges.append([u, v])
    for i in range(n):
        if tin[i] == -1: dfs(i, -1)
    return bridges`
  },
  summary: {
    keyTakeaways: ['Bridges and articulation points are identified in a single O(V + E) DFS pass.', 'Edge (u, v) is a bridge if low[v] > tin[u].'],
    nextLessonId: 'dsa-greedy-strategy',
    nextLessonTitle: 'Greedy Strategy and Correctness Intuition',
    nextLessonModuleId: 'dsa-module-11'
  }
};

const dsa10Part3Path = path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-10.ts');
writeModuleFile(dsa10Part3Path, m10.data, m10Lessons);
console.log('Module 10 complete! Authored: ' + Object.keys(m10Lessons).length);
