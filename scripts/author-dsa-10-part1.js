const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m10 = getExistingDSALessons(10);
const m10Lessons = { ...m10.lessons };

m10Lessons['dsa-graph-representation'] = {
  id: 'dsa-graph-representation',
  moduleId: 'dsa-module-10',
  title: 'Graph Representation: Adjacency List and Matrix',
  subtitle: 'Vertices, Edges, Directed/Undirected Topologies, and Memory Trade-offs',
  order: 1,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'graph',
  objectives: [
    'Define formal graph structures: V vertices, E edges, directed vs undirected, weighted vs unweighted.',
    'Implement Adjacency Lists using hash maps or arrays of lists in O(V + E) space.',
    'Implement Adjacency Matrices using 2D arrays in O(V²) space.',
    'Analyze trade-offs for edge existence queries, neighbor iteration, and sparse vs dense graphs.'
  ],
  prerequisites: ['Arrays and Dynamic Arrays', 'Hashing and Hash Tables'],
  analogy: {
    title: 'The Airline Flight Map vs The Distance Table',
    text: 'An airline can list its flight network in two ways: (1) For each airport, write down only the cities it has direct flights to (Adjacency List - compact, fast to see where you can fly from Chicago); or (2) Print a gigantic grid of every airport in the world against every other airport (Adjacency Matrix - easy to check if flight exists, but 99% of entries are blank).',
    metaphor: 'Adjacency list stores only existing connections; adjacency matrix allocates a cell for every hypothetical pair.'
  },
  problemSolved: {
    title: 'Modeling Non-Linear Networks Efficiently in Memory',
    description: 'Real-world networks (social connections, road maps, web hyperlinks) are overwhelmingly sparse (E << V²). Using an adjacency matrix wastes gigabytes on zeros; adjacency lists store only actual connections.',
    keyPoints: [
      'Adjacency List: O(V + E) memory, optimal for sparse graphs.',
      'Adjacency Matrix: O(V²) memory, O(1) edge lookup, optimal for dense graphs.',
      'Supports directed, undirected, and weighted edges.'
    ]
  },
  intuition: {
    overview: 'In an Adjacency List, graph[u] stores a list of neighbor vertices v (or pairs (v, weight)). In an Adjacency Matrix, matrix[u][v] is 1 (or weight) if an edge exists, 0 otherwise.',
    steps: [
      { step: 1, title: 'Edge Addition (Undirected)', description: 'graph[u].append(v); graph[v].append(u).' },
      { step: 2, title: 'Neighbor Iteration', description: 'Iterate over graph[u] in O(degree(u)) time.' },
      { step: 3, title: 'Edge Query', description: 'Check if v in graph[u] in list or matrix[u][v] != 0 in matrix.' }
    ]
  },
  formalDefinition: {
    text: 'A graph G = (V, E) consists of vertex set V and edge set E \\subseteq V \\times V. The degree sum formula states \\sum_{v \\in V} \\text{deg}(v) = 2|E| for undirected graphs.',
    latex: '\\text{Space}(\\text{AdjList}) = \\mathcal{O}(|V| + |E|), \\quad \\text{Space}(\\text{AdjMatrix}) = \\mathcal{O}(|V|^2)'
  },
  complexity: {
    overview: 'Adj List: O(V + E) space. Adj Matrix: O(V²) space, O(1) edge lookup.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(V + E)', explanation: 'O(1) edge lookup in matrix or hash-set adj list.' },
      { case: 'Average', time: 'O(deg(u))', space: 'O(V + E)', explanation: 'Iterating neighbors in adjacency list.' },
      { case: 'Worst', time: 'O(V)', space: 'O(V²)', explanation: 'Scanning row for neighbors in adjacency matrix.' }
    ],
    spaceNote: 'Adjacency list uses O(V + E) space.'
  },
  workedExample: {
    title: 'Representing Triangle Graph with vertices 0, 1, 2',
    input: 'Edges: (0, 1), (1, 2), (2, 0)',
    steps: [
      { step: 1, action: 'Adjacency List', state: '0: [1, 2], 1: [0, 2], 2: [0, 1]', explanation: 'Each vertex points to its 2 neighbors.' },
      { step: 2, action: 'Adjacency Matrix', state: '[[0, 1, 1], [1, 0, 1], [1, 1, 0]]', explanation: 'Symmetric matrix across diagonal.' }
    ],
    finalOutput: 'Representations complete.'
  },
  visualExplanation: {
    title: 'Graph Node Network vs Matrix Grid',
    description: 'Visualizing circle nodes connected by lines alongside the equivalent binary matrix table.',
    features: ['Highlighted edges correspond to 1s in matrix table', 'Neighbor lists match outbound arrows']
  },
  pseudocode: {
    title: 'Adjacency List Construction',
    code: `function buildGraph(numVertices, edges, isDirected=false):
    adj = array of size numVertices of empty lists
    for u, v in edges:
        adj[u].append(v)
        if not isDirected:
            adj[v].append(u)
    return adj`
  },
  pythonCode: {
    title: 'Python Graph Representations',
    code: `from collections import defaultdict

def build_adj_list(edges: list[tuple[int, int]], directed: bool = False) -> dict[int, list[int]]:
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        if not directed:
            graph[v].append(u)
    return dict(graph)

def build_adj_matrix(n: int, edges: list[tuple[int, int]], directed: bool = False) -> list[list[int]]:
    matrix = [[0] * n for _ in range(n)]
    for u, v in edges:
        matrix[u][v] = 1
        if not directed:
            matrix[v][u] = 1
    return matrix`,
    explanation: 'Constructs adjacency list via defaultdict and adjacency matrix via 2D list.'
  },
  runnableCode: {
    code: `edges = [(0, 1), (1, 2), (2, 0)]
print(build_adj_list(edges))
print(build_adj_matrix(3, edges))`,
    expectedOutput: `{0: [1, 2], 1: [0, 2], 2: [1, 0]}\n[[0, 1, 1], [1, 0, 1], [1, 1, 0]]`
  },
  lineByLineExplanation: [
    { line: 5, code: 'graph[u].append(v)', explanation: 'Adds directed edge from u to v in O(1) time.' },
    { line: 7, code: 'graph[v].append(u)', explanation: 'If undirected, adds symmetric return edge from v to u.' }
  ],
  edgeCases: [
    { case: 'Self-loops (u == v)', handling: 'Adds single entry or 1 on matrix diagonal matrix[u][u].', example: '(0, 0)' },
    { case: 'Isolated vertices with no edges', handling: 'Maintains empty neighbor list or row of all zeros.', example: 'Vertex 3 with 0 edges' }
  ],
  commonMistakes: [
    { mistake: 'Using an Adjacency Matrix for a sparse graph with 100,000 vertices', solution: 'A 100,000 x 100,000 matrix requires ~40 GB of RAM and crashes with MemoryError; always use Adjacency Lists for sparse graphs.', codeExample: '# Use defaultdict(list) for large graphs' }
  ],
  applications: [
    { industry: 'Social Networks', application: 'Friend recommendation and follower graphs', benefit: 'Compact O(V + E) storage of millions of connections.' }
  ],
  practiceQuestions: [
    { id: 'pq-gr-1', question: 'How can you achieve both O(1) edge existence queries AND O(deg(u)) neighbor iteration in an Adjacency List?', hint: 'Use sets instead of lists.', answer: 'Store neighbors in a hash set (defaultdict(set)). Iterating takes O(deg(u)) and checking "v in graph[u]" takes O(1).' }
  ],
  quiz: [
    { id: 'q-gr-1', question: 'What is the space complexity of an Adjacency Matrix for a graph with V vertices?', options: ['O(V²)', 'O(V + E)', 'O(E²)', 'O(V log V)'], correctIndex: 0, explanation: 'An adjacency matrix allocates a V x V grid, consuming O(V²) space regardless of edge count.' }
  ],
  codingChallenge: {
    title: 'Find Center of Star Graph',
    problem: 'Given an undirected star graph with n nodes labeled from 1 to n, find the center node that is connected to every other node.',
    hints: ['The center node must appear in both of the first two edges.'],
    starterCode: `def find_center(edges: list[list[int]]) -> int:
    # TODO: Find star center
    pass`,
    solution: `def find_center(edges: list[list[int]]) -> int:
    # Star center must appear in edge 0 and edge 1
    return edges[0][0] if edges[0][0] in (edges[1][0], edges[1][1]) else edges[0][1]`
  },
  summary: {
    keyTakeaways: ['Adjacency Lists use O(V + E) space, ideal for sparse networks.', 'Adjacency Matrices use O(V²) space, providing O(1) edge queries.'],
    nextLessonId: 'dsa-graph-bfs',
    nextLessonTitle: 'Breadth-First Search (BFS)',
    nextLessonModuleId: 'dsa-module-10'
  }
};

m10Lessons['dsa-graph-dfs'] = {
  id: 'dsa-graph-dfs',
  moduleId: 'dsa-module-10',
  title: 'Depth-First Search (DFS)',
  subtitle: 'Backtracking Traversals, Edge Classification, and Discovery/Finish Timestamps',
  order: 3,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'graph',
  objectives: [
    'Implement recursive and iterative (explicit stack) DFS on graphs.',
    'Prevent infinite cycles using a visited set or boolean tracking array.',
    'Classify edges into Tree, Back, Forward, and Cross edges.',
    'Utilize discovery and finish timestamps for topological ordering and cycle detection.'
  ],
  prerequisites: ['Graph Representation: Adjacency List and Matrix', 'Recursion Trees and Call Stacks'],
  analogy: {
    title: 'The Speleologist Exploring Deep Caves',
    text: 'A cave explorer follows a single cavern corridor as deep as possible until hitting a solid rock wall (dead end). Only then do they retrace their steps backward to the most recent fork and explore the alternate passage.',
    metaphor: 'DFS plunges along a single branch to maximum depth before backtracking.'
  },
  problemSolved: {
    title: 'Exhaustive Reachability and Structural Graph Analysis',
    description: 'DFS is the engine for topological sorting, cycle detection, strongly connected components (Kosaraju/Tarjan), and maze solving. Its linear O(V + E) scan reveals deep structural properties.',
    keyPoints: [
      'Visits all reachable vertices in O(V + E) time.',
      'Explicit or call stack maintains active search path.',
      'Back-edges immediately indicate cycles.'
    ]
  },
  intuition: {
    overview: 'Mark current node as visited. For each unvisited neighbor, recursively call DFS. When all neighbors are visited, the function backtracks to the parent node.',
    steps: [
      { step: 1, title: 'Mark Visited', description: 'visited.add(u)' },
      { step: 2, title: 'Explore Neighbors', description: 'For v in graph[u]: if v not in visited: dfs(v)' },
      { step: 3, title: 'Backtrack', description: 'Return to caller when all branches from u are exhausted.' }
    ]
  },
  formalDefinition: {
    text: 'DFS associates each vertex v with discovery time d[v] and finish time f[v]. Parenthesis Theorem: for any two vertices u and v, the intervals [d[u], f[u]] and [d[v], f[v]] are either completely disjoint or one is nested within the other.',
    latex: 'T_{\\text{DFS}} = \\mathcal{O}(|V| + |E|), \\quad \\text{Space} = \\mathcal{O}(|V|)'
  },
  complexity: {
    overview: 'Time: O(V + E). Space: O(V) for visited set and call stack.',
    cases: [
      { case: 'Best', time: 'O(V + E)', space: 'O(V)', explanation: 'Visits every reachable node and edge once.' },
      { case: 'Average', time: 'O(V + E)', space: 'O(V)', explanation: 'Linear graph traversal.' },
      { case: 'Worst', time: 'O(V + E)', space: 'O(V)', explanation: 'Dense graph with V² edges.' }
    ],
    spaceNote: 'O(V) recursion call stack depth.'
  },
  workedExample: {
    title: 'DFS on 4-Node Graph 0 -> 1 -> 2, 0 -> 3',
    input: 'graph = {0: [1, 3], 1: [2], 2: [], 3: []}, start=0',
    steps: [
      { step: 1, action: 'Visit 0', state: 'visited={0}, call stack=[0]', explanation: 'Start at root.' },
      { step: 2, action: 'Visit 1', state: 'visited={0, 1}, call stack=[0, 1]', explanation: 'Plunge deep into 1.' },
      { step: 3, action: 'Visit 2', state: 'visited={0, 1, 2}, call stack=[0, 1, 2]', explanation: 'Plunge deep into 2.' },
      { step: 4, action: 'Dead end at 2', state: 'Backtrack 2 -> 1 -> 0', explanation: 'Node 2 has no unvisited neighbors.' },
      { step: 5, action: 'Visit 3', state: 'visited={0, 1, 2, 3}', explanation: 'Explore remaining neighbor 3 from 0.' }
    ],
    finalOutput: 'DFS Order: 0 -> 1 -> 2 -> 3'
  },
  visualExplanation: {
    title: 'DFS Deep Plunge and Backtrack',
    description: 'Visualizing single tentacle exploring deep into network, retreating upon dead end.',
    features: ['Active path nodes highlighted in yellow', 'Completed nodes marked in blue']
  },
  pseudocode: {
    title: 'Recursive Graph DFS',
    code: `function dfs(u, graph, visited):
    visited.add(u)
    process(u)
    for v in graph[u]:
        if v not in visited:
            dfs(v, graph, visited)`
  },
  pythonCode: {
    title: 'Python Recursive & Iterative DFS',
    code: `def dfs_recursive(graph: dict[int, list[int]], start: int) -> list[int]:
    visited = set()
    traversal = []

    def dfs(u: int):
        visited.add(u)
        traversal.append(u)
        for v in graph.get(u, []):
            if v not in visited:
                dfs(v)

    dfs(start)
    return traversal

def dfs_iterative(graph: dict[int, list[int]], start: int) -> list[int]:
    visited = set([start])
    stack = [start]
    traversal = []

    while stack:
        u = stack.pop()
        traversal.append(u)
        for v in reversed(graph.get(u, [])):
            if v not in visited:
                visited.add(v)
                stack.append(v)

    return traversal`,
    explanation: 'Recursive DFS and explicit stack iterative DFS implementation.'
  },
  runnableCode: {
    code: `graph = {0: [1, 3], 1: [2], 2: [], 3: []}
print(dfs_recursive(graph, 0))
print(dfs_iterative(graph, 0))`,
    expectedOutput: `[0, 1, 2, 3]\n[0, 1, 2, 3]`
  },
  lineByLineExplanation: [
    { line: 6, code: 'visited.add(u)', explanation: 'Marks current vertex as visited to prevent circular infinite loops.' },
    { line: 8, code: 'for v in graph.get(u, []):', explanation: 'Iterates through outbound adjacency list of u.' }
  ],
  edgeCases: [
    { case: 'Disconnected graph', handling: 'Outer loop over all vertices range(V) ensures unvisited components are discovered.', example: 'Two isolated subgraphs' }
  ],
  commonMistakes: [
    { mistake: 'Omitting the visited check', solution: 'Without a visited set, cycles (e.g. 0 -> 1 -> 0) cause a fatal RecursionError / infinite loop.', codeExample: 'if v not in visited: dfs(v)' }
  ],
  applications: [
    { industry: 'Robotics', application: 'Maze generation and exploration', benefit: 'Generates organic labyrinth pathways with backtrack branching.' }
  ],
  practiceQuestions: [
    { id: 'pq-dfs-1', question: 'What is a "back-edge" in a directed graph DFS traversal?', hint: 'Connects a node to an ancestor.', answer: 'A back-edge connects a vertex to an ancestor in the DFS tree (a node currently on the active call stack), proving the existence of a directed cycle.' }
  ],
  quiz: [
    { id: 'q-dfs-1', question: 'What is the time complexity of DFS on a graph with V vertices and E edges using an Adjacency List?', options: ['O(V + E)', 'O(V²)', 'O(E log V)', 'O(V * E)'], correctIndex: 0, explanation: 'DFS visits each vertex once and traverses each edge once (or twice in undirected graphs), taking O(V + E) time.' }
  ],
  codingChallenge: {
    title: 'Number of Islands',
    problem: 'Given an m x n 2D binary grid grid where "1" represents land and "0" represents water, return the number of islands.',
    hints: ['Run DFS from every unvisited "1", sinking connected land cells to "0".'],
    starterCode: `def num_islands(grid: list[list[str]]) -> int:
    # TODO: Count islands using DFS
    pass`,
    solution: `def num_islands(grid: list[list[str]]) -> int:
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def sink(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        sink(r + 1, c)
        sink(r - 1, c)
        sink(r, c + 1)
        sink(r, c - 1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                sink(r, c)
    return count`
  },
  summary: {
    keyTakeaways: ['DFS explores paths deeply before backtracking.', 'Always maintain a visited set to avoid infinite cycles.'],
    nextLessonId: 'dsa-graph-connected-components',
    nextLessonTitle: 'Connected Components',
    nextLessonModuleId: 'dsa-module-10'
  }
};

m10Lessons['dsa-graph-connected-components'] = {
  id: 'dsa-graph-connected-components',
  moduleId: 'dsa-module-10',
  title: 'Connected Components',
  subtitle: 'Partitioning Disconnected Subgraphs in Undirected Networks in O(V + E)',
  order: 4,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'graph',
  objectives: [
    'Define connected components in undirected graphs.',
    'Traverse all components using an outer vertex loop with BFS or DFS.',
    'Assign unique component IDs to each cluster of connected vertices.',
    'Compare BFS/DFS component discovery against Disjoint Set Union (Union-Find).'
  ],
  prerequisites: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)'],
  analogy: {
    title: 'Islands in an Archipelago',
    text: 'In the Hawaiian islands, you can drive your car anywhere within Oahu via roads, and anywhere within Maui via roads. But there is no road connecting Oahu to Maui. Each isolated island landmass forms its own connected component.',
    metaphor: 'A connected component is a maximal set of vertices with paths between every pair.'
  },
  problemSolved: {
    title: 'Clustering and Island Identification in Disconnected Networks',
    description: 'A single BFS or DFS only visits vertices reachable from the starting node. An outer loop over all vertices ensures every disconnected cluster is discovered and labeled in O(V + E) time.',
    keyPoints: [
      'Identifies all isolated sub-networks.',
      'Executes in O(V + E) linear time.',
      'Core technique for image segmentation and cluster analysis.'
    ]
  },
  intuition: {
    overview: 'Maintain a global visited set. Loop through every vertex i from 0 to V - 1. If i is not visited, increment component count and launch BFS/DFS from i to mark its entire component.',
    steps: [
      { step: 1, title: 'Outer Loop', description: 'For node in 0..V-1: if node not in visited: count++' },
      { step: 2, title: 'Component Flood', description: 'Run BFS/DFS(node) to mark all reachable nodes visited.' },
      { step: 3, title: 'Repeat', description: 'Next unvisited node in outer loop starts a new independent component.' }
    ]
  },
  formalDefinition: {
    text: 'A connected component of undirected graph G = (V, E) is an equivalence class under the reachability relation u \\sim v (there exists a path between u and v). The set of components partitions V into disjoint subsets.',
    latex: 'V = \\bigsqcup_{k=1}^C V_k \\quad \\text{such that } \\forall u, v \\in V_k, \\, u \\leftrightarrow v'
  },
  complexity: {
    overview: 'Time: O(V + E) single pass. Space: O(V) visited set.',
    cases: [
      { case: 'Best', time: 'O(V + E)', space: 'O(V)', explanation: 'Visits each node and edge exactly once.' },
      { case: 'Average', time: 'O(V + E)', space: 'O(V)', explanation: 'Linear component discovery.' },
      { case: 'Worst', time: 'O(V + E)', space: 'O(V)', explanation: 'Completely disconnected graph with 0 edges.' }
    ],
    spaceNote: 'O(V) memory for visited tracking and component IDs.'
  },
  workedExample: {
    title: 'Finding Components in 5-Node Graph: (0, 1), (1, 2), (3, 4)',
    input: 'n=5, edges=[(0, 1), (1, 2), (3, 4)]',
    steps: [
      { step: 1, action: 'i=0 not visited', state: 'Component 1 started -> BFS visits {0, 1, 2}', explanation: 'First cluster found.' },
      { step: 2, action: 'i=1, 2 already visited', state: 'Skipped by outer loop', explanation: 'Part of component 1.' },
      { step: 3, action: 'i=3 not visited', state: 'Component 2 started -> BFS visits {3, 4}', explanation: 'Second cluster found.' }
    ],
    finalOutput: 'Total Connected Components = 2'
  },
  visualExplanation: {
    title: 'Component Clustering',
    description: 'Visualizing nodes colored by component ID (e.g. Cluster 1 in blue, Cluster 2 in orange).',
    features: ['Disconnected islands clearly segregated', 'Each cluster shares a unique color']
  },
  pseudocode: {
    title: 'Connected Components Algorithm',
    code: `function countComponents(n, edges):
    graph = buildGraph(n, edges)
    visited = set()
    components = 0
    for i from 0 to n - 1:
        if i not in visited:
            components += 1
            bfs(i, graph, visited)
    return components`
  },
  pythonCode: {
    title: 'Python Connected Components',
    code: `from collections import defaultdict, deque

def count_components(n: int, edges: list[list[int]]) -> int:
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
        
    visited = set()
    components = 0
    
    for i in range(n):
        if i not in visited:
            components += 1
            # BFS flood
            q = deque([i])
            visited.add(i)
            while q:
                curr = q.popleft()
                for neighbor in graph[curr]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        q.append(neighbor)
                        
    return components`,
    explanation: 'Outer loop across all n vertices identifies distinct component roots.'
  },
  runnableCode: {
    code: `print(count_components(5, [[0, 1], [1, 2], [3, 4]]))`,
    expectedOutput: `2`
  },
  lineByLineExplanation: [
    { line: 12, code: 'if i not in visited:', explanation: 'Detects a new unvisited connected component root.' },
    { line: 13, code: 'components += 1', explanation: 'Increments component counter before flooding the new island.' }
  ],
  edgeCases: [
    { case: 'Completely disconnected graph with 0 edges', handling: 'Returns n components (each node is its own island).', example: 'n=4, edges=[] -> 4' }
  ],
  commonMistakes: [
    { mistake: 'Assuming node 0 is always connected to everything', solution: 'Graph may be disconnected; always iterate over all vertex IDs in range(n).', codeExample: 'for i in range(n): if i not in visited:' }
  ],
  applications: [
    { industry: 'Social Networks', application: 'Discovering isolated community clusters', benefit: 'Partitions large social graphs into independent communities.' }
  ],
  practiceQuestions: [
    { id: 'pq-cc-1', question: 'How is connected component analysis different in DIRECTED graphs?', hint: 'Consider direction of edges.', answer: 'Directed graphs have Strongly Connected Components (SCCs), where paths must exist in both directions between all node pairs (solved by Tarjan\'s or Kosaraju\'s algorithms).' }
  ],
  quiz: [
    { id: 'q-cc-1', question: 'What is the time complexity to find all connected components in an undirected graph?', options: ['O(V + E)', 'O(V * E)', 'O(V²)', 'O(E log V)'], correctIndex: 0, explanation: 'Every vertex and edge is visited at most once across the entire outer loop, taking O(V + E) time.' }
  ],
  codingChallenge: {
    title: 'Max Area of Island',
    problem: 'Given a 2D binary matrix where 1 is land and 0 is water, return the maximum area of an island (number of connected 1s).',
    hints: ['Sum the return value of DFS for each component.'],
    starterCode: `def max_area_of_island(grid: list[list[int]]) -> int:
    # TODO: Find max island area
    pass`,
    solution: `def max_area_of_island(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    max_area = 0
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 1:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                max_area = max(max_area, dfs(r, c))
    return max_area`
  },
  summary: {
    keyTakeaways: ['Connected components partition undirected graphs into maximal connected subgraphs.', 'An outer loop over all vertices guarantees O(V + E) discovery of all islands.'],
    nextLessonId: 'dsa-graph-cycle-detection',
    nextLessonTitle: 'Cycle Detection in Graphs',
    nextLessonModuleId: 'dsa-module-10'
  }
};

const dsa10Part1Path = path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-10.ts');
writeModuleFile(dsa10Part1Path, m10.data, m10Lessons);
console.log('Module 10 Part 1 authored: ' + Object.keys(m10Lessons).length);
