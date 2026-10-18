import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule10Data: DSAModuleData = {
  "id": "dsa-module-10",
  "number": 10,
  "title": "Graph Algorithms",
  "subtitle": "BFS/DFS, Shortest Paths, MST & Advanced Graph Theory",
  "description": "Graphs model social networks, maps, compilers, and the internet. Master BFS/DFS traversal, detect cycles, sort topologically, find shortest paths with Dijkstra and Bellman-Ford, build minimum spanning trees, and understand strongly connected components.",
  "icon": "Network",
  "badge": "Graphs",
  "estimatedHours": 12,
  "topicsCount": 13,
  "lessons": [
    {
      "id": "dsa-graph-representation",
      "moduleId": "dsa-module-10",
      "title": "Graph Representation: Adjacency List and Matrix",
      "description": "Directed/undirected graphs, weighted edges, adjacency list vs matrix trade-offs.",
      "order": 1,
      "readTimeMinutes": 20,
      "visualizerType": "graph",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-graph-bfs",
      "moduleId": "dsa-module-10",
      "title": "Breadth-First Search (BFS)",
      "description": "Level-by-level exploration using a queue: shortest path in unweighted graphs, bipartite check.",
      "order": 2,
      "readTimeMinutes": 25,
      "visualizerType": "graph",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-graph-dfs",
      "moduleId": "dsa-module-10",
      "title": "Depth-First Search (DFS)",
      "description": "Stack-based full exploration: flood fill, connected components, and DFS tree properties.",
      "order": 3,
      "readTimeMinutes": 25,
      "visualizerType": "graph",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-graph-connected-components",
      "moduleId": "dsa-module-10",
      "title": "Connected Components",
      "description": "Finding all connected components in undirected graphs and SCCs in directed graphs.",
      "order": 4,
      "readTimeMinutes": 22,
      "visualizerType": "graph",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-graph-cycle-detection",
      "moduleId": "dsa-module-10",
      "title": "Cycle Detection in Graphs",
      "description": "DFS color-marking for directed graphs and parent-tracking for undirected cycle detection.",
      "order": 5,
      "readTimeMinutes": 25,
      "visualizerType": "graph",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-graph-bipartite",
      "moduleId": "dsa-module-10",
      "title": "Bipartite Graphs",
      "description": "2-colorability check using BFS, bipartite matching motivation, and odd-cycle theorem.",
      "order": 6,
      "readTimeMinutes": 22,
      "visualizerType": "graph",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-graph-topological-sort",
      "moduleId": "dsa-module-10",
      "title": "Topological Sorting",
      "description": "Kahn's BFS algorithm and DFS post-order for dependency ordering in DAGs.",
      "order": 7,
      "readTimeMinutes": 28,
      "visualizerType": "graph",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-graph-dijkstra",
      "moduleId": "dsa-module-10",
      "title": "Dijkstra's Shortest Path Algorithm",
      "description": "Greedy single-source shortest path for non-negative weights using a priority queue.",
      "order": 8,
      "readTimeMinutes": 32,
      "visualizerType": "graph",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-graph-bellman-ford",
      "moduleId": "dsa-module-10",
      "title": "Bellman-Ford Algorithm",
      "description": "Dynamic programming shortest path with negative edges and negative cycle detection.",
      "order": 9,
      "readTimeMinutes": 28,
      "visualizerType": "graph",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-graph-floyd-warshall",
      "moduleId": "dsa-module-10",
      "title": "Floyd-Warshall: All-Pairs Shortest Path",
      "description": "O(V³) DP for all-pairs shortest paths and transitive closure computation.",
      "order": 10,
      "readTimeMinutes": 28,
      "visualizerType": "graph",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-graph-mst",
      "moduleId": "dsa-module-10",
      "title": "Minimum Spanning Trees: Prim and Kruskal",
      "description": "Prim's greedy MST growth and Kruskal's sorted-edge union-find approach.",
      "order": 11,
      "readTimeMinutes": 32,
      "visualizerType": "graph",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-graph-dsu",
      "moduleId": "dsa-module-10",
      "title": "Disjoint Set Union (Union-Find)",
      "description": "Path compression and union-by-rank for near-O(1) amortized component membership queries.",
      "order": 12,
      "readTimeMinutes": 28,
      "visualizerType": "graph",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-graph-bridges",
      "moduleId": "dsa-module-10",
      "title": "Bridges and Articulation Points",
      "description": "Tarjan's algorithm to find critical edges and vertices whose removal disconnects the graph.",
      "order": 13,
      "readTimeMinutes": 30,
      "visualizerType": "graph",
      "difficulty": "Advanced"
    }
  ]
};

export const dsaModule10Lessons: Record<string, DSALessonContent> = {
  "dsa-graph-bfs": {
    "id": "dsa-graph-bfs",
    "moduleId": "dsa-module-10",
    "title": "Breadth-First Search (BFS)",
    "subtitle": "Queue-Based Layer-by-Layer Graph Exploration and Shortest Paths in Unweighted Graphs",
    "order": 2,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "graph",
    "objectives": [
      "Master the queue-based layer-by-layer traversal discipline of Breadth-First Search.",
      "Explain why BFS guarantees the shortest path (minimum number of hops) in unweighted graphs.",
      "Maintain an active visited set to prevent infinite cycles in cyclic graphs.",
      "Analyze the time complexity O(V + E) and space complexity O(V) mathematically.",
      "Apply BFS to solve multi-source shortest paths, word ladders, and bipartite testing."
    ],
    "prerequisites": [
      "Graph representation: Adjacency Lists and Adjacency Matrices",
      "Queue FIFO operations: enqueue and dequeue",
      "Set data structure for O(1) membership checks"
    ],
    "analogy": {
      "title": "Ripples on a Calm Lake",
      "text": "Imagine dropping a smooth pebble into the center of a glass-still mountain lake. The moment it strikes the surface, a circular wave ripple expands outward. It touches every leaf and pebble exactly 1 foot away simultaneously. A moment later, that wave expands to touch everything 2 feet away, then 3 feet away. The ripple never jumps ahead to a lily pad 10 feet away before thoroughly touching every closer lily pad first. Breadth-First Search radiates through a graph in the exact same concentric shockwaves.",
      "metaphor": "BFS radiates outward in concentric wavefronts: all vertices at distance k are visited and exhausted before any vertex at distance k + 1 is inspected."
    },
    "problemSolved": {
      "title": "Finding Minimum-Hop Routes and Proximity Layers",
      "description": "DFS dives as deep as possible down a single path, often finding a target via a convoluted 20-hop route before discovering a direct 1-hop path existed right at the start. BFS guarantees finding the target along the path with the fewest edges in unweighted graphs.",
      "keyPoints": [
        "Guaranteed shortest path in unweighted networks (minimum number of edge hops)",
        "Level-order exploration suitable for finding nearest neighbors and degrees of separation",
        "Detects bipartite graphs (2-colorability) by checking layer parity"
      ]
    },
    "intuition": {
      "overview": "BFS uses a FIFO (First-In, First-Out) queue to enqueue neighbors and a visited set to ensure each vertex is processed at most once.",
      "steps": [
        {
          "step": 1,
          "title": "Initialization",
          "description": "Enqueue the source vertex s into the queue and add s to visited: queue = deque([s]), visited = {s}."
        },
        {
          "step": 2,
          "title": "Dequeue Frontier Node",
          "description": "Pop vertex u from the front of the queue: u = queue.popleft()."
        },
        {
          "step": 3,
          "title": "Explore Neighbors",
          "description": "Iterate through all adjacent vertices v in adj[u]. If v is not yet in visited, mark visited.add(v) and queue.append(v)."
        },
        {
          "step": 4,
          "title": "Repeat Until Queue Empty",
          "description": "Continue until all reachable vertices have been processed."
        }
      ]
    },
    "formalDefinition": {
      "text": "Given a graph G = (V, E) and source vertex s, BFS systematically explores the edges of G to discover every vertex reachable from s, computing distance d(s, v) equal to the minimum number of edges on any path from s to v.",
      "latex": "d(s, v) = \\min \\{ |p| : p \\text{ is a path from } s \\text{ to } v \\}, \\quad T(V, E) = O(|V| + |E|)"
    },
    "complexity": {
      "overview": "Every vertex enters the queue at most once (O(V)), and every edge is traversed at most once per direction (O(E)).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Target vertex is the starting node s."
        },
        {
          "case": "Average",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Visits all reachable nodes and inspects each incident edge in the adjacency list."
        },
        {
          "case": "Worst",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Traverses the entire connected component. Dense graphs with E = V² take O(V²)."
        }
      ],
      "spaceNote": "Queue stores at most the maximum breadth of any layer, which is O(V). Visited set stores up to V vertices."
    },
    "workedExample": {
      "title": "BFS Traversal on Graph: 0 connected to 1 and 2; 1 connected to 3; 2 connected to 3",
      "input": "adj = {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}, start = 0",
      "steps": [
        {
          "step": 1,
          "action": "Start at Node 0",
          "state": "Queue: [0], Visited: {0}, Dist: {0: 0}",
          "explanation": "Enqueue start node with distance 0."
        },
        {
          "step": 2,
          "action": "Expand Node 0",
          "state": "Pop 0 -> check neighbors 1, 2. Queue: [1, 2], Visited: {0, 1, 2}",
          "explanation": "Enqueues Layer 1 neighbors (distance 1)."
        },
        {
          "step": 3,
          "action": "Expand Node 1",
          "state": "Pop 1 -> check neighbor 3 (0 already visited). Queue: [2, 3], Visited: {0, 1, 2, 3}",
          "explanation": "Enqueues Node 3 with distance 2."
        },
        {
          "step": 4,
          "action": "Expand Node 2",
          "state": "Pop 2 -> neighbors 0 and 3 already visited! Queue: [3]",
          "explanation": "No new unvisited nodes."
        },
        {
          "step": 5,
          "action": "Expand Node 3",
          "state": "Pop 3 -> all neighbors visited. Queue: []",
          "explanation": "Queue empty; traversal complete."
        }
      ],
      "finalOutput": "Traversal Order: [0, 1, 2, 3], Distances: {0: 0, 1: 1, 2: 1, 3: 2}"
    },
    "visualExplanation": {
      "title": "Interactive Graph Wavefront Visualization",
      "description": "The visualizer renders vertices and edges, animating the expanding frontier as nodes transition from Unvisited (slate) -> In Queue (yellow) -> Visited (green).",
      "features": [
        "Concentric layer visualization indicating distance from source.",
        "Shortest path tree edges highlighted in bold emerald.",
        "Active queue contents displayed alongside graph canvas."
      ]
    },
    "pseudocode": {
      "title": "Standard Breadth-First Search",
      "code": "function bfs(graph, start):\n    visited = set([start])\n    queue = FIFO_Queue()\n    queue.enqueue(start)\n    \n    while queue is not empty:\n        node = queue.dequeue()\n        process(node)\n        \n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.enqueue(neighbor)"
    },
    "pythonCode": {
      "title": "Production BFS with Distance Tracking in Python",
      "code": "from collections import deque\n\ndef bfs_shortest_path(graph: dict, start: str, target: str) -> list[str]:\n    \"\"\"Finds the shortest path between start and target in an unweighted graph.\"\"\"\n    if start == target:\n        return [start]\n\n    visited = {start}\n    queue = deque([(start, [start])])\n\n    while queue:\n        current, path = queue.popleft()\n\n        for neighbor in graph.get(current, []):\n            if neighbor == target:\n                return path + [neighbor]\n\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append((neighbor, path + [neighbor]))\n\n    return []  # No path exists",
      "explanation": "Using collections.deque gives O(1) popleft() operations. Storing path tuples or parent pointers allows reconstructing the exact route."
    },
    "runnableCode": {
      "code": "from collections import deque\n\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['A', 'D', 'E'],\n    'C': ['A', 'F'],\n    'D': ['B'],\n    'E': ['B', 'F'],\n    'F': ['C', 'E']\n}\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = deque([start])\n    order = []\n    \n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order\n\nprint(\"BFS Order starting at A:\", bfs(graph, 'A'))",
      "expectedOutput": "BFS Order starting at A: ['A', 'B', 'C', 'D', 'E', 'F']"
    },
    "lineByLineExplanation": [
      {
        "line": "1",
        "lines": "1",
        "code": "from collections import deque",
        "codeSnippet": "from collections import deque",
        "explanation": "Imports double-ended queue. Using deque.popleft() runs in O(1) time compared to list.pop(0) which is O(n)."
      },
      {
        "line": "5-6",
        "lines": "5-6",
        "code": "visited = {start}; queue = deque([start])",
        "codeSnippet": "visited = {start}; queue = deque([start])",
        "explanation": "Initializes the visited set and frontier queue with the start node."
      },
      {
        "line": "9-14",
        "lines": "9-14",
        "code": "if neighbor not in visited: visited.add(neighbor); queue.append(neighbor)",
        "codeSnippet": "if neighbor not in visited: visited.add(neighbor); queue.append(neighbor)",
        "explanation": "Marks neighbor as visited IMMEDIATELY upon enqueuing to prevent duplicate entries."
      }
    ],
    "edgeCases": [
      {
        "case": "Disconnected graph",
        "handling": "BFS starting at node s will only visit vertices in s's connected component. To visit all nodes, loop through all V and start BFS on unvisited nodes.",
        "example": "Two isolated subgraphs."
      },
      {
        "case": "Cycles in graph",
        "handling": "The visited set prevents nodes from being re-enqueued, preventing infinite loops.",
        "example": "Triangle A-B-C-A terminates safely after 3 nodes."
      },
      {
        "case": "Start node has no edges",
        "handling": "Queue pops start, loop over neighbors is empty, terminates in O(1) returning [start].",
        "example": "Isolated node."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Adding node to visited set on dequeue instead of on enqueue",
        "solution": "If a node is added to visited only when popped from the queue, duplicate copies can be added by multiple neighbors before it is popped, causing exponential queue explosion!"
      },
      {
        "mistake": "Using a Python list as a queue with pop(0)",
        "solution": "list.pop(0) is O(n), turning an O(V + E) BFS into an O(V² + E) algorithm. Always use collections.deque."
      }
    ],
    "applications": [
      {
        "industry": "Social Networks",
        "application": "Degrees of Separation & Friend Recommendations",
        "benefit": "Finding connections within 2 or 3 hops (LinkedIn 1st, 2nd, 3rd connections) using layer-limited BFS."
      },
      {
        "industry": "GPS & Navigation",
        "application": "Turn-by-Turn Routing on Grid Maps",
        "benefit": "Computing fastest path through grid city streets with uniform block lengths."
      },
      {
        "industry": "Web Crawlers",
        "application": "Search Engine Indexing",
        "benefit": "Crawling web pages layer by layer up to a bounded link depth from seed URLs."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-bfs-q1",
        "question": "Why does BFS guarantee the shortest path in unweighted graphs while DFS does not?",
        "hint": "Think about the order in which distances are explored.",
        "answer": "BFS explores nodes in increasing order of distance from the source: distance 1, then distance 2, etc. The first time a node is popped, it is guaranteed to have been reached via the fewest possible edges. DFS dives down arbitrary branches and may find the target along a long path first."
      },
      {
        "id": "dsa-bfs-q2",
        "question": "What is the consequence of adding a vertex to the visited set during DEQUEUE instead of ENQUEUE?",
        "hint": "What happens if two adjacent nodes both see the same unvisited neighbor?",
        "answer": "If marked only when dequeued, multiple parent nodes in the same layer can all see the same neighbor as unvisited and push multiple copies into the queue, causing massive redundant work and potential memory exhaustion."
      },
      {
        "id": "dsa-bfs-q3",
        "question": "What is the time complexity of BFS on a graph represented with an Adjacency Matrix versus an Adjacency List?",
        "hint": "How long does it take to find the neighbors of a node in a matrix?",
        "answer": "With an Adjacency List, BFS takes O(V + E) time. With an Adjacency Matrix of size V x V, finding neighbors for each vertex requires scanning an entire row of length V, taking O(V²) time regardless of edge count."
      }
    ],
    "quiz": [
      {
        "id": "dsa-bfs-quiz-1",
        "question": "What data structure is fundamentally required to implement Breadth-First Search?",
        "options": [
          "Stack (LIFO)",
          "Queue (FIFO)",
          "Binary Search Tree",
          "Min Heap"
        ],
        "correctIndex": 1,
        "explanation": "BFS requires a First-In, First-Out (FIFO) queue to ensure nodes at the current distance layer are processed before nodes at the next layer."
      },
      {
        "id": "dsa-bfs-quiz-2",
        "question": "What is the time complexity of BFS on an unweighted graph with V vertices and E edges using adjacency lists?",
        "options": [
          "O(V log V)",
          "O(V * E)",
          "O(V + E)",
          "O(E log V)"
        ],
        "correctIndex": 2,
        "explanation": "BFS touches each vertex at most once (O(V)) and inspects each edge at most twice in undirected graphs (O(E)), giving O(V + E) total time."
      },
      {
        "id": "dsa-bfs-quiz-3",
        "question": "Which of the following problems can be directly solved using standard BFS?",
        "options": [
          "Topological Sort on a DAG",
          "Minimum number of hops to reach a target vertex in an unweighted graph",
          "Finding strongly connected components",
          "All-pairs shortest paths with negative edge weights"
        ],
        "correctIndex": 1,
        "explanation": "BFS is the standard optimal algorithm for finding minimum-hop paths in unweighted graphs."
      }
    ],
    "codingChallenge": {
      "title": "Shortest Path in Binary Matrix (LeetCode 1091)",
      "problem": "Given an n x n binary matrix grid, return the length of the shortest clear path from top-left (0, 0) to bottom-right (n-1, n-1) such that all visited cells are 0. You may move in 8 directions (horizontal, vertical, diagonal). If no clear path exists, return -1. Length is the number of cells visited.",
      "hints": [
        "Check starting and ending cells first: if either is 1, return -1 immediately.",
        "Use BFS with collections.deque to guarantee the shortest distance is found first.",
        "Explore all 8 adjacent directions for each cell.",
        "Mark cells as visited immediately (e.g. by setting grid[nr][nc] = 1) when enqueuing to prevent redundant checks."
      ],
      "starterCode": "from collections import deque\n\ndef shortest_path_binary_matrix(grid: list[list[int]]) -> int:\n    # Your BFS code here\n    return -1\n\n# Test case:\ngrid = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]\nprint(shortest_path_binary_matrix(grid))  # Expected: 4",
      "solution": "from collections import deque\n\ndef shortest_path_binary_matrix(grid: list[list[int]]) -> int:\n    n = len(grid)\n    if grid[0][0] != 0 or grid[n-1][n-1] != 0:\n        return -1\n    if n == 1:\n        return 1\n\n    # 8 directional movements\n    directions = [\n        (-1, -1), (-1, 0), (-1, 1),\n        (0, -1),           (0, 1),\n        (1, -1),  (1, 0),  (1, 1)\n    ]\n\n    queue = deque([(0, 0, 1)])  # (r, c, distance)\n    grid[0][0] = 1  # Mark visited in-place\n\n    while queue:\n        r, c, dist = queue.popleft()\n        if r == n - 1 and c == n - 1:\n            return dist\n\n        for dr, dc in directions:\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:\n                grid[nr][nc] = 1  # Mark visited\n                queue.append((nr, nc, dist + 1))\n\n    return -1\n\n# Test case:\ngrid = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]\nprint(shortest_path_binary_matrix(grid))  # Output: 4"
    },
    "summary": {
      "keyTakeaways": [
        "BFS explores graphs level-by-level using a FIFO queue.",
        "Guarantees shortest paths in unweighted graphs in O(V + E) time.",
        "Always mark nodes as visited upon ENQUEUE, not dequeue, to avoid duplicate queue entries.",
        "Standard queue operations must use collections.deque for O(1) performance."
      ],
      "nextLessonId": "dsa-graph-dfs",
      "nextLessonTitle": "Depth-First Search (DFS)",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": "1",
        "lines": "1",
        "code": "from collections import deque",
        "codeSnippet": "from collections import deque",
        "explanation": "Imports double-ended queue. Using deque.popleft() runs in O(1) time compared to list.pop(0) which is O(n)."
      },
      {
        "line": "5-6",
        "lines": "5-6",
        "code": "visited = {start}; queue = deque([start])",
        "codeSnippet": "visited = {start}; queue = deque([start])",
        "explanation": "Initializes the visited set and frontier queue with the start node."
      },
      {
        "line": "9-14",
        "lines": "9-14",
        "code": "if neighbor not in visited: visited.add(neighbor); queue.append(neighbor)",
        "codeSnippet": "if neighbor not in visited: visited.add(neighbor); queue.append(neighbor)",
        "explanation": "Marks neighbor as visited IMMEDIATELY upon enqueuing to prevent duplicate entries."
      }
    ]
  },
  "dsa-graph-representation": {
    "id": "dsa-graph-representation",
    "moduleId": "dsa-module-10",
    "title": "Graph Representation: Adjacency List and Matrix",
    "subtitle": "Vertices, Edges, Directed/Undirected Topologies, and Memory Trade-offs",
    "order": 1,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "graph",
    "objectives": [
      "Define formal graph structures: V vertices, E edges, directed vs undirected, weighted vs unweighted.",
      "Implement Adjacency Lists using hash maps or arrays of lists in O(V + E) space.",
      "Implement Adjacency Matrices using 2D arrays in O(V²) space.",
      "Analyze trade-offs for edge existence queries, neighbor iteration, and sparse vs dense graphs."
    ],
    "prerequisites": [
      "Arrays and Dynamic Arrays",
      "Hashing and Hash Tables"
    ],
    "analogy": {
      "title": "The Airline Flight Map vs The Distance Table",
      "text": "An airline can list its flight network in two ways: (1) For each airport, write down only the cities it has direct flights to (Adjacency List - compact, fast to see where you can fly from Chicago); or (2) Print a gigantic grid of every airport in the world against every other airport (Adjacency Matrix - easy to check if flight exists, but 99% of entries are blank).",
      "metaphor": "Adjacency list stores only existing connections; adjacency matrix allocates a cell for every hypothetical pair."
    },
    "problemSolved": {
      "title": "Modeling Non-Linear Networks Efficiently in Memory",
      "description": "Real-world networks (social connections, road maps, web hyperlinks) are overwhelmingly sparse (E << V²). Using an adjacency matrix wastes gigabytes on zeros; adjacency lists store only actual connections.",
      "keyPoints": [
        "Adjacency List: O(V + E) memory, optimal for sparse graphs.",
        "Adjacency Matrix: O(V²) memory, O(1) edge lookup, optimal for dense graphs.",
        "Supports directed, undirected, and weighted edges."
      ]
    },
    "intuition": {
      "overview": "In an Adjacency List, graph[u] stores a list of neighbor vertices v (or pairs (v, weight)). In an Adjacency Matrix, matrix[u][v] is 1 (or weight) if an edge exists, 0 otherwise.",
      "steps": [
        {
          "step": 1,
          "title": "Edge Addition (Undirected)",
          "description": "graph[u].append(v); graph[v].append(u)."
        },
        {
          "step": 2,
          "title": "Neighbor Iteration",
          "description": "Iterate over graph[u] in O(degree(u)) time."
        },
        {
          "step": 3,
          "title": "Edge Query",
          "description": "Check if v in graph[u] in list or matrix[u][v] != 0 in matrix."
        }
      ]
    },
    "formalDefinition": {
      "text": "A graph G = (V, E) consists of vertex set V and edge set E \\subseteq V \\times V. The degree sum formula states \\sum_{v \\in V} \\text{deg}(v) = 2|E| for undirected graphs.",
      "latex": "\\text{Space}(\\text{AdjList}) = \\mathcal{O}(|V| + |E|), \\quad \\text{Space}(\\text{AdjMatrix}) = \\mathcal{O}(|V|^2)"
    },
    "complexity": {
      "overview": "Adj List: O(V + E) space. Adj Matrix: O(V²) space, O(1) edge lookup.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(V + E)",
          "explanation": "O(1) edge lookup in matrix or hash-set adj list."
        },
        {
          "case": "Average",
          "time": "O(deg(u))",
          "space": "O(V + E)",
          "explanation": "Iterating neighbors in adjacency list."
        },
        {
          "case": "Worst",
          "time": "O(V)",
          "space": "O(V²)",
          "explanation": "Scanning row for neighbors in adjacency matrix."
        }
      ],
      "spaceNote": "Adjacency list uses O(V + E) space."
    },
    "workedExample": {
      "title": "Representing Triangle Graph with vertices 0, 1, 2",
      "input": "Edges: (0, 1), (1, 2), (2, 0)",
      "steps": [
        {
          "step": 1,
          "action": "Adjacency List",
          "state": "0: [1, 2], 1: [0, 2], 2: [0, 1]",
          "explanation": "Each vertex points to its 2 neighbors."
        },
        {
          "step": 2,
          "action": "Adjacency Matrix",
          "state": "[[0, 1, 1], [1, 0, 1], [1, 1, 0]]",
          "explanation": "Symmetric matrix across diagonal."
        }
      ],
      "finalOutput": "Representations complete."
    },
    "visualExplanation": {
      "title": "Graph Node Network vs Matrix Grid",
      "description": "Visualizing circle nodes connected by lines alongside the equivalent binary matrix table.",
      "features": [
        "Highlighted edges correspond to 1s in matrix table",
        "Neighbor lists match outbound arrows"
      ]
    },
    "pseudocode": {
      "title": "Adjacency List Construction",
      "code": "function buildGraph(numVertices, edges, isDirected=false):\n    adj = array of size numVertices of empty lists\n    for u, v in edges:\n        adj[u].append(v)\n        if not isDirected:\n            adj[v].append(u)\n    return adj"
    },
    "pythonCode": {
      "title": "Python Graph Representations",
      "code": "from collections import defaultdict\n\ndef build_adj_list(edges: list[tuple[int, int]], directed: bool = False) -> dict[int, list[int]]:\n    graph = defaultdict(list)\n    for u, v in edges:\n        graph[u].append(v)\n        if not directed:\n            graph[v].append(u)\n    return dict(graph)\n\ndef build_adj_matrix(n: int, edges: list[tuple[int, int]], directed: bool = False) -> list[list[int]]:\n    matrix = [[0] * n for _ in range(n)]\n    for u, v in edges:\n        matrix[u][v] = 1\n        if not directed:\n            matrix[v][u] = 1\n    return matrix",
      "explanation": "Constructs adjacency list via defaultdict and adjacency matrix via 2D list."
    },
    "runnableCode": {
      "code": "edges = [(0, 1), (1, 2), (2, 0)]\nprint(build_adj_list(edges))\nprint(build_adj_matrix(3, edges))",
      "expectedOutput": "{0: [1, 2], 1: [0, 2], 2: [1, 0]}\n[[0, 1, 1], [1, 0, 1], [1, 1, 0]]"
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "graph[u].append(v)",
        "codeSnippet": "graph[u].append(v)",
        "explanation": "Adds directed edge from u to v in O(1) time."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "graph[v].append(u)",
        "codeSnippet": "graph[v].append(u)",
        "explanation": "If undirected, adds symmetric return edge from v to u."
      }
    ],
    "edgeCases": [
      {
        "case": "Self-loops (u == v)",
        "handling": "Adds single entry or 1 on matrix diagonal matrix[u][u].",
        "example": "(0, 0)"
      },
      {
        "case": "Isolated vertices with no edges",
        "handling": "Maintains empty neighbor list or row of all zeros.",
        "example": "Vertex 3 with 0 edges"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using an Adjacency Matrix for a sparse graph with 100,000 vertices",
        "solution": "A 100,000 x 100,000 matrix requires ~40 GB of RAM and crashes with MemoryError; always use Adjacency Lists for sparse graphs.",
        "codeExample": "# Use defaultdict(list) for large graphs"
      }
    ],
    "applications": [
      {
        "industry": "Social Networks",
        "application": "Friend recommendation and follower graphs",
        "benefit": "Compact O(V + E) storage of millions of connections."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-gr-1",
        "question": "How can you achieve both O(1) edge existence queries AND O(deg(u)) neighbor iteration in an Adjacency List?",
        "hint": "Use sets instead of lists.",
        "answer": "Store neighbors in a hash set (defaultdict(set)). Iterating takes O(deg(u)) and checking \"v in graph[u]\" takes O(1)."
      }
    ],
    "quiz": [
      {
        "id": "q-gr-1",
        "question": "What is the space complexity of an Adjacency Matrix for a graph with V vertices?",
        "options": [
          "O(V²)",
          "O(V + E)",
          "O(E²)",
          "O(V log V)"
        ],
        "correctIndex": 0,
        "explanation": "An adjacency matrix allocates a V x V grid, consuming O(V²) space regardless of edge count."
      }
    ],
    "codingChallenge": {
      "title": "Find Center of Star Graph",
      "problem": "Given an undirected star graph with n nodes labeled from 1 to n, find the center node that is connected to every other node.",
      "hints": [
        "The center node must appear in both of the first two edges."
      ],
      "starterCode": "def find_center(edges: list[list[int]]) -> int:\n    # TODO: Find star center\n    pass",
      "solution": "def find_center(edges: list[list[int]]) -> int:\n    # Star center must appear in edge 0 and edge 1\n    return edges[0][0] if edges[0][0] in (edges[1][0], edges[1][1]) else edges[0][1]"
    },
    "summary": {
      "keyTakeaways": [
        "Adjacency Lists use O(V + E) space, ideal for sparse networks.",
        "Adjacency Matrices use O(V²) space, providing O(1) edge queries."
      ],
      "nextLessonId": "dsa-graph-bfs",
      "nextLessonTitle": "Breadth-First Search (BFS)",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "graph[u].append(v)",
        "codeSnippet": "graph[u].append(v)",
        "explanation": "Adds directed edge from u to v in O(1) time."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "graph[v].append(u)",
        "codeSnippet": "graph[v].append(u)",
        "explanation": "If undirected, adds symmetric return edge from v to u."
      }
    ]
  },
  "dsa-graph-dfs": {
    "id": "dsa-graph-dfs",
    "moduleId": "dsa-module-10",
    "title": "Depth-First Search (DFS)",
    "subtitle": "Backtracking Traversals, Edge Classification, and Discovery/Finish Timestamps",
    "order": 3,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "graph",
    "objectives": [
      "Implement recursive and iterative (explicit stack) DFS on graphs.",
      "Prevent infinite cycles using a visited set or boolean tracking array.",
      "Classify edges into Tree, Back, Forward, and Cross edges.",
      "Utilize discovery and finish timestamps for topological ordering and cycle detection."
    ],
    "prerequisites": [
      "Graph Representation: Adjacency List and Matrix",
      "Recursion Trees and Call Stacks"
    ],
    "analogy": {
      "title": "The Speleologist Exploring Deep Caves",
      "text": "A cave explorer follows a single cavern corridor as deep as possible until hitting a solid rock wall (dead end). Only then do they retrace their steps backward to the most recent fork and explore the alternate passage.",
      "metaphor": "DFS plunges along a single branch to maximum depth before backtracking."
    },
    "problemSolved": {
      "title": "Exhaustive Reachability and Structural Graph Analysis",
      "description": "DFS is the engine for topological sorting, cycle detection, strongly connected components (Kosaraju/Tarjan), and maze solving. Its linear O(V + E) scan reveals deep structural properties.",
      "keyPoints": [
        "Visits all reachable vertices in O(V + E) time.",
        "Explicit or call stack maintains active search path.",
        "Back-edges immediately indicate cycles."
      ]
    },
    "intuition": {
      "overview": "Mark current node as visited. For each unvisited neighbor, recursively call DFS. When all neighbors are visited, the function backtracks to the parent node.",
      "steps": [
        {
          "step": 1,
          "title": "Mark Visited",
          "description": "visited.add(u)"
        },
        {
          "step": 2,
          "title": "Explore Neighbors",
          "description": "For v in graph[u]: if v not in visited: dfs(v)"
        },
        {
          "step": 3,
          "title": "Backtrack",
          "description": "Return to caller when all branches from u are exhausted."
        }
      ]
    },
    "formalDefinition": {
      "text": "DFS associates each vertex v with discovery time d[v] and finish time f[v]. Parenthesis Theorem: for any two vertices u and v, the intervals [d[u], f[u]] and [d[v], f[v]] are either completely disjoint or one is nested within the other.",
      "latex": "T_{\\text{DFS}} = \\mathcal{O}(|V| + |E|), \\quad \\text{Space} = \\mathcal{O}(|V|)"
    },
    "complexity": {
      "overview": "Time: O(V + E). Space: O(V) for visited set and call stack.",
      "cases": [
        {
          "case": "Best",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Visits every reachable node and edge once."
        },
        {
          "case": "Average",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Linear graph traversal."
        },
        {
          "case": "Worst",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Dense graph with V² edges."
        }
      ],
      "spaceNote": "O(V) recursion call stack depth."
    },
    "workedExample": {
      "title": "DFS on 4-Node Graph 0 -> 1 -> 2, 0 -> 3",
      "input": "graph = {0: [1, 3], 1: [2], 2: [], 3: []}, start=0",
      "steps": [
        {
          "step": 1,
          "action": "Visit 0",
          "state": "visited={0}, call stack=[0]",
          "explanation": "Start at root."
        },
        {
          "step": 2,
          "action": "Visit 1",
          "state": "visited={0, 1}, call stack=[0, 1]",
          "explanation": "Plunge deep into 1."
        },
        {
          "step": 3,
          "action": "Visit 2",
          "state": "visited={0, 1, 2}, call stack=[0, 1, 2]",
          "explanation": "Plunge deep into 2."
        },
        {
          "step": 4,
          "action": "Dead end at 2",
          "state": "Backtrack 2 -> 1 -> 0",
          "explanation": "Node 2 has no unvisited neighbors."
        },
        {
          "step": 5,
          "action": "Visit 3",
          "state": "visited={0, 1, 2, 3}",
          "explanation": "Explore remaining neighbor 3 from 0."
        }
      ],
      "finalOutput": "DFS Order: 0 -> 1 -> 2 -> 3"
    },
    "visualExplanation": {
      "title": "DFS Deep Plunge and Backtrack",
      "description": "Visualizing single tentacle exploring deep into network, retreating upon dead end.",
      "features": [
        "Active path nodes highlighted in yellow",
        "Completed nodes marked in blue"
      ]
    },
    "pseudocode": {
      "title": "Recursive Graph DFS",
      "code": "function dfs(u, graph, visited):\n    visited.add(u)\n    process(u)\n    for v in graph[u]:\n        if v not in visited:\n            dfs(v, graph, visited)"
    },
    "pythonCode": {
      "title": "Python Recursive & Iterative DFS",
      "code": "def dfs_recursive(graph: dict[int, list[int]], start: int) -> list[int]:\n    visited = set()\n    traversal = []\n\n    def dfs(u: int):\n        visited.add(u)\n        traversal.append(u)\n        for v in graph.get(u, []):\n            if v not in visited:\n                dfs(v)\n\n    dfs(start)\n    return traversal\n\ndef dfs_iterative(graph: dict[int, list[int]], start: int) -> list[int]:\n    visited = set([start])\n    stack = [start]\n    traversal = []\n\n    while stack:\n        u = stack.pop()\n        traversal.append(u)\n        for v in reversed(graph.get(u, [])):\n            if v not in visited:\n                visited.add(v)\n                stack.append(v)\n\n    return traversal",
      "explanation": "Recursive DFS and explicit stack iterative DFS implementation."
    },
    "runnableCode": {
      "code": "graph = {0: [1, 3], 1: [2], 2: [], 3: []}\nprint(dfs_recursive(graph, 0))\nprint(dfs_iterative(graph, 0))",
      "expectedOutput": "[0, 1, 2, 3]\n[0, 1, 2, 3]"
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "visited.add(u)",
        "codeSnippet": "visited.add(u)",
        "explanation": "Marks current vertex as visited to prevent circular infinite loops."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "for v in graph.get(u, []):",
        "codeSnippet": "for v in graph.get(u, []):",
        "explanation": "Iterates through outbound adjacency list of u."
      }
    ],
    "edgeCases": [
      {
        "case": "Disconnected graph",
        "handling": "Outer loop over all vertices range(V) ensures unvisited components are discovered.",
        "example": "Two isolated subgraphs"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Omitting the visited check",
        "solution": "Without a visited set, cycles (e.g. 0 -> 1 -> 0) cause a fatal RecursionError / infinite loop.",
        "codeExample": "if v not in visited: dfs(v)"
      }
    ],
    "applications": [
      {
        "industry": "Robotics",
        "application": "Maze generation and exploration",
        "benefit": "Generates organic labyrinth pathways with backtrack branching."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-dfs-1",
        "question": "What is a \"back-edge\" in a directed graph DFS traversal?",
        "hint": "Connects a node to an ancestor.",
        "answer": "A back-edge connects a vertex to an ancestor in the DFS tree (a node currently on the active call stack), proving the existence of a directed cycle."
      }
    ],
    "quiz": [
      {
        "id": "q-dfs-1",
        "question": "What is the time complexity of DFS on a graph with V vertices and E edges using an Adjacency List?",
        "options": [
          "O(V + E)",
          "O(V²)",
          "O(E log V)",
          "O(V * E)"
        ],
        "correctIndex": 0,
        "explanation": "DFS visits each vertex once and traverses each edge once (or twice in undirected graphs), taking O(V + E) time."
      }
    ],
    "codingChallenge": {
      "title": "Number of Islands",
      "problem": "Given an m x n 2D binary grid grid where \"1\" represents land and \"0\" represents water, return the number of islands.",
      "hints": [
        "Run DFS from every unvisited \"1\", sinking connected land cells to \"0\"."
      ],
      "starterCode": "def num_islands(grid: list[list[str]]) -> int:\n    # TODO: Count islands using DFS\n    pass",
      "solution": "def num_islands(grid: list[list[str]]) -> int:\n    if not grid: return 0\n    rows, cols = len(grid), len(grid[0])\n    count = 0\n    def sink(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':\n            return\n        grid[r][c] = '0'\n        sink(r + 1, c)\n        sink(r - 1, c)\n        sink(r, c + 1)\n        sink(r, c - 1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count += 1\n                sink(r, c)\n    return count"
    },
    "summary": {
      "keyTakeaways": [
        "DFS explores paths deeply before backtracking.",
        "Always maintain a visited set to avoid infinite cycles."
      ],
      "nextLessonId": "dsa-graph-connected-components",
      "nextLessonTitle": "Connected Components",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "visited.add(u)",
        "codeSnippet": "visited.add(u)",
        "explanation": "Marks current vertex as visited to prevent circular infinite loops."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "for v in graph.get(u, []):",
        "codeSnippet": "for v in graph.get(u, []):",
        "explanation": "Iterates through outbound adjacency list of u."
      }
    ]
  },
  "dsa-graph-connected-components": {
    "id": "dsa-graph-connected-components",
    "moduleId": "dsa-module-10",
    "title": "Connected Components",
    "subtitle": "Partitioning Disconnected Subgraphs in Undirected Networks in O(V + E)",
    "order": 4,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "graph",
    "objectives": [
      "Define connected components in undirected graphs.",
      "Traverse all components using an outer vertex loop with BFS or DFS.",
      "Assign unique component IDs to each cluster of connected vertices.",
      "Compare BFS/DFS component discovery against Disjoint Set Union (Union-Find)."
    ],
    "prerequisites": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)"
    ],
    "analogy": {
      "title": "Islands in an Archipelago",
      "text": "In the Hawaiian islands, you can drive your car anywhere within Oahu via roads, and anywhere within Maui via roads. But there is no road connecting Oahu to Maui. Each isolated island landmass forms its own connected component.",
      "metaphor": "A connected component is a maximal set of vertices with paths between every pair."
    },
    "problemSolved": {
      "title": "Clustering and Island Identification in Disconnected Networks",
      "description": "A single BFS or DFS only visits vertices reachable from the starting node. An outer loop over all vertices ensures every disconnected cluster is discovered and labeled in O(V + E) time.",
      "keyPoints": [
        "Identifies all isolated sub-networks.",
        "Executes in O(V + E) linear time.",
        "Core technique for image segmentation and cluster analysis."
      ]
    },
    "intuition": {
      "overview": "Maintain a global visited set. Loop through every vertex i from 0 to V - 1. If i is not visited, increment component count and launch BFS/DFS from i to mark its entire component.",
      "steps": [
        {
          "step": 1,
          "title": "Outer Loop",
          "description": "For node in 0..V-1: if node not in visited: count++"
        },
        {
          "step": 2,
          "title": "Component Flood",
          "description": "Run BFS/DFS(node) to mark all reachable nodes visited."
        },
        {
          "step": 3,
          "title": "Repeat",
          "description": "Next unvisited node in outer loop starts a new independent component."
        }
      ]
    },
    "formalDefinition": {
      "text": "A connected component of undirected graph G = (V, E) is an equivalence class under the reachability relation u \\sim v (there exists a path between u and v). The set of components partitions V into disjoint subsets.",
      "latex": "V = \\bigsqcup_{k=1}^C V_k \\quad \\text{such that } \\forall u, v \\in V_k, \\, u \\leftrightarrow v"
    },
    "complexity": {
      "overview": "Time: O(V + E) single pass. Space: O(V) visited set.",
      "cases": [
        {
          "case": "Best",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Visits each node and edge exactly once."
        },
        {
          "case": "Average",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Linear component discovery."
        },
        {
          "case": "Worst",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Completely disconnected graph with 0 edges."
        }
      ],
      "spaceNote": "O(V) memory for visited tracking and component IDs."
    },
    "workedExample": {
      "title": "Finding Components in 5-Node Graph: (0, 1), (1, 2), (3, 4)",
      "input": "n=5, edges=[(0, 1), (1, 2), (3, 4)]",
      "steps": [
        {
          "step": 1,
          "action": "i=0 not visited",
          "state": "Component 1 started -> BFS visits {0, 1, 2}",
          "explanation": "First cluster found."
        },
        {
          "step": 2,
          "action": "i=1, 2 already visited",
          "state": "Skipped by outer loop",
          "explanation": "Part of component 1."
        },
        {
          "step": 3,
          "action": "i=3 not visited",
          "state": "Component 2 started -> BFS visits {3, 4}",
          "explanation": "Second cluster found."
        }
      ],
      "finalOutput": "Total Connected Components = 2"
    },
    "visualExplanation": {
      "title": "Component Clustering",
      "description": "Visualizing nodes colored by component ID (e.g. Cluster 1 in blue, Cluster 2 in orange).",
      "features": [
        "Disconnected islands clearly segregated",
        "Each cluster shares a unique color"
      ]
    },
    "pseudocode": {
      "title": "Connected Components Algorithm",
      "code": "function countComponents(n, edges):\n    graph = buildGraph(n, edges)\n    visited = set()\n    components = 0\n    for i from 0 to n - 1:\n        if i not in visited:\n            components += 1\n            bfs(i, graph, visited)\n    return components"
    },
    "pythonCode": {
      "title": "Python Connected Components",
      "code": "from collections import defaultdict, deque\n\ndef count_components(n: int, edges: list[list[int]]) -> int:\n    graph = defaultdict(list)\n    for u, v in edges:\n        graph[u].append(v)\n        graph[v].append(u)\n        \n    visited = set()\n    components = 0\n    \n    for i in range(n):\n        if i not in visited:\n            components += 1\n            # BFS flood\n            q = deque([i])\n            visited.add(i)\n            while q:\n                curr = q.popleft()\n                for neighbor in graph[curr]:\n                    if neighbor not in visited:\n                        visited.add(neighbor)\n                        q.append(neighbor)\n                        \n    return components",
      "explanation": "Outer loop across all n vertices identifies distinct component roots."
    },
    "runnableCode": {
      "code": "print(count_components(5, [[0, 1], [1, 2], [3, 4]]))",
      "expectedOutput": "2"
    },
    "lineByLineExplanation": [
      {
        "line": 12,
        "lines": "12",
        "code": "if i not in visited:",
        "codeSnippet": "if i not in visited:",
        "explanation": "Detects a new unvisited connected component root."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "components += 1",
        "codeSnippet": "components += 1",
        "explanation": "Increments component counter before flooding the new island."
      }
    ],
    "edgeCases": [
      {
        "case": "Completely disconnected graph with 0 edges",
        "handling": "Returns n components (each node is its own island).",
        "example": "n=4, edges=[] -> 4"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming node 0 is always connected to everything",
        "solution": "Graph may be disconnected; always iterate over all vertex IDs in range(n).",
        "codeExample": "for i in range(n): if i not in visited:"
      }
    ],
    "applications": [
      {
        "industry": "Social Networks",
        "application": "Discovering isolated community clusters",
        "benefit": "Partitions large social graphs into independent communities."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-cc-1",
        "question": "How is connected component analysis different in DIRECTED graphs?",
        "hint": "Consider direction of edges.",
        "answer": "Directed graphs have Strongly Connected Components (SCCs), where paths must exist in both directions between all node pairs (solved by Tarjan's or Kosaraju's algorithms)."
      }
    ],
    "quiz": [
      {
        "id": "q-cc-1",
        "question": "What is the time complexity to find all connected components in an undirected graph?",
        "options": [
          "O(V + E)",
          "O(V * E)",
          "O(V²)",
          "O(E log V)"
        ],
        "correctIndex": 0,
        "explanation": "Every vertex and edge is visited at most once across the entire outer loop, taking O(V + E) time."
      }
    ],
    "codingChallenge": {
      "title": "Max Area of Island",
      "problem": "Given a 2D binary matrix where 1 is land and 0 is water, return the maximum area of an island (number of connected 1s).",
      "hints": [
        "Sum the return value of DFS for each component."
      ],
      "starterCode": "def max_area_of_island(grid: list[list[int]]) -> int:\n    # TODO: Find max island area\n    pass",
      "solution": "def max_area_of_island(grid: list[list[int]]) -> int:\n    rows, cols = len(grid), len(grid[0])\n    max_area = 0\n    def dfs(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 1:\n            return 0\n        grid[r][c] = 0\n        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 1:\n                max_area = max(max_area, dfs(r, c))\n    return max_area"
    },
    "summary": {
      "keyTakeaways": [
        "Connected components partition undirected graphs into maximal connected subgraphs.",
        "An outer loop over all vertices guarantees O(V + E) discovery of all islands."
      ],
      "nextLessonId": "dsa-graph-cycle-detection",
      "nextLessonTitle": "Cycle Detection in Graphs",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 12,
        "lines": "12",
        "code": "if i not in visited:",
        "codeSnippet": "if i not in visited:",
        "explanation": "Detects a new unvisited connected component root."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "components += 1",
        "codeSnippet": "components += 1",
        "explanation": "Increments component counter before flooding the new island."
      }
    ]
  },
  "dsa-graph-cycle-detection": {
    "id": "dsa-graph-cycle-detection",
    "moduleId": "dsa-module-10",
    "title": "Cycle Detection in Graphs",
    "subtitle": "Back-Edges, Recursion Call Stacks, and Three-Color State Modeling",
    "order": 5,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "graph",
    "objectives": [
      "Detect cycles in undirected graphs using parent tracking during DFS/BFS.",
      "Detect cycles in directed graphs using 3-color states (White, Gray, Black).",
      "Understand why undirected parent checks do not work for directed graphs.",
      "Apply Union-Find for instant cycle detection in undirected edge streams."
    ],
    "prerequisites": [
      "Depth-First Search (DFS)",
      "Connected Components"
    ],
    "analogy": {
      "title": "The Circular Escape Route",
      "text": "A courier following directions from street to street looks down at their GPS and notices they have just been instructed to turn onto a street they were on 3 turns ago. Seeing an ancestor street currently in their route history confirms they are trapped driving in a loop.",
      "metaphor": "Encountering a node currently active on the recursion stack proves a cycle exists."
    },
    "problemSolved": {
      "title": "Deadlock Detection and Dependency Validation",
      "description": "Circular dependencies cause infinite build loops in software build tools (make/gradle) and deadlocks in database transaction systems. Cycle detection identifies circularity in O(V + E) time before deadlocks freeze the system.",
      "keyPoints": [
        "Undirected: Back-edge to any visited node other than immediate parent = cycle.",
        "Directed: 3-color DFS (Gray = currently on call stack = cycle).",
        "Underpins build pipeline validation and operating system deadlock avoidance."
      ]
    },
    "intuition": {
      "overview": "In directed graphs, label nodes: 0 (White/unvisited), 1 (Gray/visiting on stack), 2 (Black/completely visited). If we encounter a Gray neighbor during DFS, a back-edge exists, confirming a cycle!",
      "steps": [
        {
          "step": 1,
          "title": "State 1 (Visiting)",
          "description": "color[u] = 1 (on current recursion stack)."
        },
        {
          "step": 2,
          "title": "Gray Neighbor Check",
          "description": "For v in graph[u]: if color[v] == 1, cycle found! If color[v] == 0, recurse dfs(v)."
        },
        {
          "step": 3,
          "title": "State 2 (Visited)",
          "description": "color[u] = 2 (fully explored, popped off stack)."
        }
      ]
    },
    "formalDefinition": {
      "text": "A directed graph G has a cycle if and only if a depth-first search of G yields at least one back-edge (u, v) where v is an ancestor of u in the DFS tree.",
      "latex": "(u, v) \\in E \\land \\text{color}(v) = \\text{GRAY} \\iff \\text{G contains a directed cycle}"
    },
    "complexity": {
      "overview": "Time: O(V + E) single pass. Space: O(V) for color tracking array.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(V)",
          "explanation": "Self-loop at root detected immediately."
        },
        {
          "case": "Average",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Visits nodes until cycle is found or graph exhausted."
        },
        {
          "case": "Worst",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Acyclic graph requires complete scan."
        }
      ],
      "spaceNote": "O(V) recursion stack and color array."
    },
    "workedExample": {
      "title": "3-Color Cycle Check on 0 -> 1 -> 2 -> 0",
      "input": "Edges: (0, 1), (1, 2), (2, 0)",
      "steps": [
        {
          "step": 1,
          "action": "Visit 0",
          "state": "color[0]=GRAY",
          "explanation": "Node 0 added to call stack."
        },
        {
          "step": 2,
          "action": "Visit 1",
          "state": "color[1]=GRAY",
          "explanation": "Node 1 added to call stack."
        },
        {
          "step": 3,
          "action": "Visit 2",
          "state": "color[2]=GRAY",
          "explanation": "Node 2 added to call stack."
        },
        {
          "step": 4,
          "action": "From 2, examine edge to 0",
          "state": "color[0] is GRAY!",
          "explanation": "Edge connects to ancestor on active stack -> CYCLE DETECTED!"
        }
      ],
      "finalOutput": "True (Graph contains a directed cycle)"
    },
    "visualExplanation": {
      "title": "3-Color State Transition",
      "description": "Visualizing White nodes turning Yellow/Gray during exploration, and Red upon cycle collision.",
      "features": [
        "Gray node represents active branch",
        "Back-edge pointing to Gray node flags cycle"
      ]
    },
    "pseudocode": {
      "title": "Directed Graph Cycle Detection (3-Color)",
      "code": "function hasCycle(n, edges):\n    graph = buildGraph(n, edges)\n    # 0 = White, 1 = Gray, 2 = Black\n    color = array of size n with 0\n    function dfs(u):\n        color[u] = 1 # visiting\n        for v in graph[u]:\n            if color[v] == 1: return True\n            if color[v] == 0 and dfs(v): return True\n        color[u] = 2 # visited\n        return False\n    for i in 0..n-1:\n        if color[i] == 0 and dfs(i): return True\n    return False"
    },
    "pythonCode": {
      "title": "Python Cycle Detection Implementations",
      "code": "def has_cycle_directed(n: int, edges: list[list[int]]) -> bool:\n    graph = [[] for _ in range(n)]\n    for u, v in edges:\n        graph[u].append(v)\n        \n    # 0: White (unvisited), 1: Gray (visiting), 2: Black (visited)\n    color = [0] * n\n\n    def dfs(u: int) -> bool:\n        color[u] = 1 # Mark on call stack\n        for v in graph[u]:\n            if color[v] == 1:\n                return True # Back-edge to ancestor!\n            if color[v] == 0:\n                if dfs(v):\n                    return True\n        color[u] = 2 # Completed\n        return False\n\n    for i in range(n):\n        if color[i] == 0:\n            if dfs(i):\n                return True\n    return False\n\ndef has_cycle_undirected(n: int, edges: list[list[int]]) -> bool:\n    graph = [[] for _ in range(n)]\n    for u, v in edges:\n        graph[u].append(v)\n        graph[v].append(u)\n        \n    visited = [False] * n\n\n    def dfs(u: int, parent: int) -> bool:\n        visited[u] = True\n        for v in graph[u]:\n            if not visited[v]:\n                if dfs(v, u): return True\n            elif v != parent:\n                return True # Visited neighbor that is NOT parent is a cycle\n        return False\n\n    for i in range(n):\n        if not visited[i]:\n            if dfs(i, -1): return True\n    return False",
      "explanation": "3-color DFS for directed graphs and parent-tracking DFS for undirected graphs."
    },
    "runnableCode": {
      "code": "print(has_cycle_directed(3, [[0, 1], [1, 2], [2, 0]])) # True\nprint(has_cycle_directed(3, [[0, 1], [1, 2]]))         # False\nprint(has_cycle_undirected(3, [[0, 1], [1, 2], [2, 0]])) # True",
      "expectedOutput": "True\nFalse\nTrue"
    },
    "lineByLineExplanation": [
      {
        "line": 12,
        "lines": "12",
        "code": "if color[v] == 1: return True",
        "codeSnippet": "if color[v] == 1: return True",
        "explanation": "If neighbor is Gray (currently active on the call stack), we have circled back to an ancestor: cycle detected!"
      },
      {
        "line": 16,
        "lines": "16",
        "code": "color[u] = 2",
        "codeSnippet": "color[u] = 2",
        "explanation": "Marks vertex as Black once all outgoing paths have been fully verified with no cycle."
      }
    ],
    "edgeCases": [
      {
        "case": "Cross edges in directed graphs",
        "handling": "Black nodes (color 2) are safe; seeing a Black neighbor is NOT a cycle.",
        "example": "Diamond graph: 0->1->3, 0->2->3"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using a simple visited set for directed graphs without unmarking",
        "solution": "A simple visited set treats cross-edges as cycles; you MUST distinguish between currently visiting (stack) and finished nodes (3 colors).",
        "codeExample": "# White/Gray/Black handles cross-edges correctly"
      }
    ],
    "applications": [
      {
        "industry": "Build Automation",
        "application": "Detecting circular import dependencies in JavaScript / Python",
        "benefit": "Prevents infinite build compiler loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-cd-1",
        "question": "Why does Kahn's algorithm (topological sort via indegrees) detect cycles automatically?",
        "hint": "Consider indegrees of nodes in a cycle.",
        "answer": "Nodes in a cycle never have their in-degree drop to 0, so they never enter the BFS queue. If total processed nodes < n, a cycle exists."
      }
    ],
    "quiz": [
      {
        "id": "q-cd-1",
        "question": "In 3-color DFS, what does encountering a Gray neighbor signify?",
        "options": [
          "A back-edge to an active call stack ancestor, proving a cycle exists",
          "A cross-edge",
          "A dead end",
          "A leaf node"
        ],
        "correctIndex": 0,
        "explanation": "Gray indicates the node is currently in the active recursion call stack. Reaching it means the path loops back onto itself."
      }
    ],
    "codingChallenge": {
      "title": "Course Schedule (Can Finish All Courses)",
      "problem": "There are numCourses courses labeled 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates you must take course b before course a. Return True if you can finish all courses.",
      "hints": [
        "Check if the directed dependency graph contains a cycle."
      ],
      "starterCode": "def can_finish(numCourses: int, prerequisites: list[list[int]]) -> bool:\n    # TODO: Detect if course prerequisites have cycles\n    pass",
      "solution": "def can_finish(numCourses: int, prerequisites: list[list[int]]) -> bool:\n    graph = [[] for _ in range(numCourses)]\n    for dest, src in prerequisites:\n        graph[src].append(dest)\n    color = [0] * numCourses\n    def dfs(u):\n        color[u] = 1\n        for v in graph[u]:\n            if color[v] == 1: return True\n            if color[v] == 0 and dfs(v): return True\n        color[u] = 2\n        return False\n    for i in range(numCourses):\n        if color[i] == 0 and dfs(i):\n            return False # Cycle means cannot finish!\n    return True"
    },
    "summary": {
      "keyTakeaways": [
        "Directed cycle detection requires 3-color states (White, Gray, Black).",
        "Undirected cycle detection tracks immediate parent pointer."
      ],
      "nextLessonId": "dsa-graph-bipartite",
      "nextLessonTitle": "Bipartite Graphs",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 12,
        "lines": "12",
        "code": "if color[v] == 1: return True",
        "codeSnippet": "if color[v] == 1: return True",
        "explanation": "If neighbor is Gray (currently active on the call stack), we have circled back to an ancestor: cycle detected!"
      },
      {
        "line": 16,
        "lines": "16",
        "code": "color[u] = 2",
        "codeSnippet": "color[u] = 2",
        "explanation": "Marks vertex as Black once all outgoing paths have been fully verified with no cycle."
      }
    ]
  },
  "dsa-graph-bipartite": {
    "id": "dsa-graph-bipartite",
    "moduleId": "dsa-module-10",
    "title": "Bipartite Graphs",
    "subtitle": "2-Colorability, Odd-Length Cycle Invariants, and BFS/DFS Coloring",
    "order": 6,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "graph",
    "objectives": [
      "Define bipartite graphs: vertex sets U and V with all edges crossing between sets.",
      "Prove the fundamental theorem: A graph is bipartite if and only if it contains no odd-length cycles.",
      "Implement 2-coloring algorithms using BFS and DFS in O(V + E) time.",
      "Apply bipartite matching to job assignment and matching problems."
    ],
    "prerequisites": [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS)"
    ],
    "analogy": {
      "title": "Dividing Teams into Red and Blue Jerseys",
      "text": "A referee assigns team jerseys to a group of athletes. Two friends who have a rivalry must never wear the same color jersey. If the rivalry network allows coloring every player either Red or Blue such that every rivalry is Red vs Blue, the graph is bipartite.",
      "metaphor": "A graph is bipartite if you can color vertices with 2 colors without any monochromatic edge."
    },
    "problemSolved": {
      "title": "2-Colorability and Stable Two-Set Partitioning",
      "description": "Determining if a network can be divided into two conflicting groups (e.g. buyers vs sellers, students vs internships, hostile factions) is solved in linear O(V + E) time via 2-coloring.",
      "keyPoints": [
        "2-colorable: adjacent nodes must have alternating colors (0 and 1).",
        "Odd cycle = monochromatic edge = impossible to 2-color.",
        "Foundation for maximum bipartite matching (Hopcroft-Karp)."
      ]
    },
    "intuition": {
      "overview": "Color start node 0. Color all its neighbors 1. Color their neighbors 0. If at any point a neighbor already has the SAME color as the current node, the graph is NOT bipartite.",
      "steps": [
        {
          "step": 1,
          "title": "Color Seed",
          "description": "color[start] = 0; enqueue(start)"
        },
        {
          "step": 2,
          "title": "Alternate Color",
          "description": "For neighbor in graph[curr]: if uncolored, color[neighbor] = 1 - color[curr] and enqueue."
        },
        {
          "step": 3,
          "title": "Conflict Check",
          "description": "If color[neighbor] == color[curr], return False immediately."
        }
      ]
    },
    "formalDefinition": {
      "text": "A graph G = (V, E) is bipartite if V = V_1 \\cup V_2 with V_1 \\cap V_2 = \\emptyset such that every edge e \\in E has one endpoint in V_1 and one endpoint in V_2. Konig's Theorem: G is bipartite \\iff G has no odd cycles.",
      "latex": "\\forall (u, v) \\in E, \\quad c(u) \\neq c(v) \\quad \\text{where } c: V \\to \\{0, 1\\}"
    },
    "complexity": {
      "overview": "Time: O(V + E) single traversal. Space: O(V) color array.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(V)",
          "explanation": "Triangle detected at root."
        },
        {
          "case": "Average",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Linear 2-coloring scan."
        },
        {
          "case": "Worst",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Full bipartite graph verified."
        }
      ],
      "spaceNote": "O(V) color storage array."
    },
    "workedExample": {
      "title": "Testing Triangle (Odd Cycle) vs Square (Even Cycle)",
      "input": "Triangle: (0,1), (1,2), (2,0) vs Square: (0,1), (1,2), (2,3), (3,0)",
      "steps": [
        {
          "step": 1,
          "action": "Triangle node 0",
          "state": "color[0]=Red",
          "explanation": "Neighbors 1 and 2 must be Blue."
        },
        {
          "step": 2,
          "action": "Triangle edge (1, 2)",
          "state": "1 is Blue and 2 is Blue!",
          "explanation": "Edge connects two Blue nodes! Conflict -> NOT bipartite."
        },
        {
          "step": 3,
          "action": "Square nodes",
          "state": "0=Red, 1=Blue, 2=Red, 3=Blue",
          "explanation": "All edges connect Red to Blue -> IS bipartite."
        }
      ],
      "finalOutput": "Triangle = False, Square = True"
    },
    "visualExplanation": {
      "title": "Two-Color Layer Alternation",
      "description": "Visualizing even levels in Red, odd levels in Blue, checking for horizontal cross-edges within the same level.",
      "features": [
        "Red nodes only connect to Blue nodes",
        "Monochromatic edge flashes red warning conflict"
      ]
    },
    "pseudocode": {
      "title": "Is Graph Bipartite (BFS)",
      "code": "function isBipartite(graph):\n    color = array of size n filled with -1\n    for i in 0..n-1:\n        if color[i] == -1:\n            color[i] = 0\n            q = [i]\n            while q:\n                curr = q.pop()\n                for v in graph[curr]:\n                    if color[v] == -1:\n                        color[v] = 1 - color[curr]\n                        q.push(v)\n                    elif color[v] == color[curr]:\n                        return False\n    return True"
    },
    "pythonCode": {
      "title": "Python Is Graph Bipartite",
      "code": "from collections import deque\n\ndef is_bipartite(graph: list[list[int]]) -> bool:\n    n = len(graph)\n    color = [-1] * n # -1: uncolored, 0: color A, 1: color B\n\n    for i in range(n):\n        if color[i] == -1:\n            color[i] = 0\n            q = deque([i])\n            while q:\n                curr = q.popleft()\n                for neighbor in graph[curr]:\n                    if color[neighbor] == -1:\n                        color[neighbor] = 1 - color[curr]\n                        q.append(neighbor)\n                    elif color[neighbor] == color[curr]:\n                        return False # Odd-length cycle conflict!\n    return True",
      "explanation": "Uses BFS with 0/1 alternating color assignment across all components."
    },
    "runnableCode": {
      "code": "print(is_bipartite([[1, 3], [0, 2], [1, 3], [0, 2]])) # Square: True\nprint(is_bipartite([[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]])) # Odd cycle: False",
      "expectedOutput": "True\nFalse"
    },
    "lineByLineExplanation": [
      {
        "line": 15,
        "lines": "15",
        "code": "color[neighbor] = 1 - color[curr]",
        "codeSnippet": "color[neighbor] = 1 - color[curr]",
        "explanation": "Flips color between 0 and 1 using simple subtraction (1 - 0 = 1, 1 - 1 = 0)."
      },
      {
        "line": 17,
        "lines": "17",
        "code": "elif color[neighbor] == color[curr]: return False",
        "codeSnippet": "elif color[neighbor] == color[curr]: return False",
        "explanation": "If an adjacent neighbor already has the identical color, an odd-length cycle exists, proving graph is not bipartite."
      }
    ],
    "edgeCases": [
      {
        "case": "Disconnected graph with isolated vertices",
        "handling": "Outer loop iterates all vertices; isolated nodes color trivially.",
        "example": "n=3, graph=[[], [], []]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Stopping after exploring from node 0",
        "solution": "The graph may consist of multiple disconnected components; must loop over all vertices in range(n).",
        "codeExample": "for i in range(n): if color[i] == -1:"
      }
    ],
    "applications": [
      {
        "industry": "E-Commerce",
        "application": "Recommendation systems (Users and Products)",
        "benefit": "Natural bipartite graph: users only connect to products they purchased."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-bp-1",
        "question": "Does a tree have any odd-length cycles? Is every tree bipartite?",
        "hint": "Recall tree cycle properties.",
        "answer": "Trees are connected and acyclic (0 cycles). Because they have 0 odd-length cycles, EVERY tree is bipartite."
      }
    ],
    "quiz": [
      {
        "id": "q-bp-1",
        "question": "What structural property is necessary and sufficient for a graph to be bipartite?",
        "options": [
          "The graph contains no odd-length cycles",
          "The graph contains no cycles of any kind",
          "The graph is planar",
          "The number of vertices is even"
        ],
        "correctIndex": 0,
        "explanation": "By Konig's theorem, a graph is bipartite if and only if it contains no odd-length cycles."
      }
    ],
    "codingChallenge": {
      "title": "Possible Bipartition",
      "problem": "Given n people labeled 1 to n and a list of dislikes pairs, return True if we can split everyone into two groups such that no two people in the same group dislike each other.",
      "hints": [
        "Model dislikes as edges and check if the resulting graph is bipartite."
      ],
      "starterCode": "def possible_bipartition(n: int, dislikes: list[list[int]]) -> bool:\n    # TODO: Check if dislikes graph is bipartite\n    pass",
      "solution": "from collections import defaultdict, deque\n\ndef possible_bipartition(n: int, dislikes: list[list[int]]) -> bool:\n    graph = defaultdict(list)\n    for u, v in dislikes:\n        graph[u].append(v)\n        graph[v].append(u)\n    color = {}\n    for i in range(1, n + 1):\n        if i not in color:\n            color[i] = 0\n            q = deque([i])\n            while q:\n                curr = q.popleft()\n                for neighbor in graph[curr]:\n                    if neighbor not in color:\n                        color[neighbor] = 1 - color[curr]\n                        q.append(neighbor)\n                    elif color[neighbor] == color[curr]:\n                        return False\n    return True"
    },
    "summary": {
      "keyTakeaways": [
        "A graph is bipartite if and only if it contains no odd-length cycles.",
        "Can be verified in O(V + E) time via 2-color BFS/DFS."
      ],
      "nextLessonId": "dsa-graph-topological-sort",
      "nextLessonTitle": "Topological Sorting",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 15,
        "lines": "15",
        "code": "color[neighbor] = 1 - color[curr]",
        "codeSnippet": "color[neighbor] = 1 - color[curr]",
        "explanation": "Flips color between 0 and 1 using simple subtraction (1 - 0 = 1, 1 - 1 = 0)."
      },
      {
        "line": 17,
        "lines": "17",
        "code": "elif color[neighbor] == color[curr]: return False",
        "codeSnippet": "elif color[neighbor] == color[curr]: return False",
        "explanation": "If an adjacent neighbor already has the identical color, an odd-length cycle exists, proving graph is not bipartite."
      }
    ]
  },
  "dsa-graph-topological-sort": {
    "id": "dsa-graph-topological-sort",
    "moduleId": "dsa-module-10",
    "title": "Topological Sorting",
    "subtitle": "Kahn's In-Degree Algorithm and Post-Order DFS Ordering for DAGs",
    "order": 7,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "graph",
    "objectives": [
      "Define topological ordering for Directed Acyclic Graphs (DAGs).",
      "Implement Kahn's Algorithm using in-degrees and BFS queue in O(V + E).",
      "Implement DFS Post-Order Reversal topological sort in O(V + E).",
      "Detect cycles automatically when Kahn's queue empties with unprocessed vertices."
    ],
    "prerequisites": [
      "Cycle Detection in Graphs",
      "Breadth-First Search (BFS)"
    ],
    "analogy": {
      "title": "College Course Prerequisites Roadmap",
      "text": "To take Advanced Machine Learning (CS 401), you must first take Linear Algebra (MATH 201) and Intro to Programming (CS 101). A topological sort orders all 40 college courses into a linear semester-by-semester schedule where every prerequisite course is completed before any class that depends on it.",
      "metaphor": "A linear ordering of vertices where every directed edge u -> v means u appears before v."
    },
    "problemSolved": {
      "title": "Dependency Resolution and Execution Scheduling",
      "description": "Build systems (Webpack, Make, Docker build stages) must execute tasks in valid dependency order. Topological sorting produces a valid serial execution sequence in O(V + E) time or proves a dependency cycle exists.",
      "keyPoints": [
        "Only possible on Directed Acyclic Graphs (DAGs).",
        "Kahn's algorithm processes in-degree 0 nodes first.",
        "Detects circular dependencies if processed_count < V."
      ]
    },
    "intuition": {
      "overview": "Calculate in-degree for every vertex. Enqueue all vertices with in-degree 0 (no prerequisites). When popping node u, append to order and decrement in-degree of its neighbors. If neighbor reaches in-degree 0, enqueue it.",
      "steps": [
        {
          "step": 1,
          "title": "In-Degree Calculation",
          "description": "Compute in_degree[v] for all vertices."
        },
        {
          "step": 2,
          "title": "Queue In-Degree 0",
          "description": "Enqueue all vertices with in_degree == 0."
        },
        {
          "step": 3,
          "title": "Process and Decrement",
          "description": "Pop u, append to result. For v in graph[u]: in_degree[v]--; if in_degree[v] == 0: enqueue(v)."
        }
      ]
    },
    "formalDefinition": {
      "text": "A topological sort of a DAG G = (V, E) is a linear ordering of V such that for every directed edge (u, v) \\in E, u comes before v in the ordering.",
      "latex": "\\forall (u, v) \\in E, \\quad \\text{pos}(u) < \\text{pos}(v)"
    },
    "complexity": {
      "overview": "Time: O(V + E). Space: O(V) for in-degree array and queue.",
      "cases": [
        {
          "case": "Best",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Optimal linear traversal."
        },
        {
          "case": "Average",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Touches each vertex and edge once."
        },
        {
          "case": "Worst",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Dense DAG."
        }
      ],
      "spaceNote": "O(V) memory for in-degree array and queue."
    },
    "workedExample": {
      "title": "Topological Sort on 4-Node DAG: 0->1, 0->2, 1->3, 2->3",
      "input": "Edges: 0->1, 0->2, 1->3, 2->3",
      "steps": [
        {
          "step": 1,
          "action": "In-degrees",
          "state": "in_deg: {0:0, 1:1, 2:1, 3:2}",
          "explanation": "Node 0 has 0 dependencies."
        },
        {
          "step": 2,
          "action": "Enqueue 0, pop 0",
          "state": "Result=[0], decrement 1 and 2 -> in_deg={1:0, 2:0}",
          "explanation": "Nodes 1 and 2 now ready."
        },
        {
          "step": 3,
          "action": "Pop 1, then pop 2",
          "state": "Result=[0, 1, 2], decrement 3 twice -> in_deg={3:0}",
          "explanation": "Node 3 now ready."
        },
        {
          "step": 4,
          "action": "Pop 3",
          "state": "Result=[0, 1, 2, 3]",
          "explanation": "All 4 nodes processed."
        }
      ],
      "finalOutput": "Valid Order: [0, 1, 2, 3]"
    },
    "visualExplanation": {
      "title": "In-Degree Peeling Process",
      "description": "Visualizing nodes peeling off the graph as their incoming arrows vanish, settling into a linear pipeline.",
      "features": [
        "In-degree 0 nodes highlighted in green",
        "Removed edges free up downstream nodes"
      ]
    },
    "pseudocode": {
      "title": "Kahn's Algorithm",
      "code": "function topologicalSort(n, edges):\n    in_degree = array of size n with 0\n    graph = buildGraph(n, edges)\n    for u, v in edges: in_degree[v] += 1\n    q = Queue([i for i in 0..n-1 if in_degree[i] == 0])\n    order = []\n    while not q.isEmpty():\n        u = q.pop()\n        order.append(u)\n        for v in graph[u]:\n            in_degree[v] -= 1\n            if in_degree[v] == 0: q.push(v)\n    return order if len(order) == n else [] # cycle check"
    },
    "pythonCode": {
      "title": "Python Topological Sort (Kahn's Algorithm)",
      "code": "from collections import deque\n\ndef topological_sort(n: int, edges: list[list[int]]) -> list[int]:\n    graph = [[] for _ in range(n)]\n    in_degree = [0] * n\n    \n    for u, v in edges:\n        graph[u].append(v)\n        in_degree[v] += 1\n        \n    q = deque([i for i in range(n) if in_degree[i] == 0])\n    order = []\n    \n    while q:\n        u = q.popleft()\n        order.append(u)\n        for v in graph[u]:\n            in_degree[v] -= 1\n            if in_degree[v] == 0:\n                q.append(v)\n                \n    return order if len(order) == n else [] # Empty if cycle detected",
      "explanation": "Uses in-degree peeling with BFS queue; returns empty list if cycle detected."
    },
    "runnableCode": {
      "code": "print(topological_sort(4, [[0, 1], [0, 2], [1, 3], [2, 3]]))\nprint(topological_sort(2, [[0, 1], [1, 0]])) # Cycle!",
      "expectedOutput": "[0, 1, 2, 3]\n[]"
    },
    "lineByLineExplanation": [
      {
        "line": 9,
        "lines": "9",
        "code": "in_degree[v] += 1",
        "codeSnippet": "in_degree[v] += 1",
        "explanation": "Counts number of incoming dependencies for each node."
      },
      {
        "line": 20,
        "lines": "20",
        "code": "return order if len(order) == n else []",
        "codeSnippet": "return order if len(order) == n else []",
        "explanation": "If cycle exists, nodes in cycle never reach in-degree 0, so len(order) < n."
      }
    ],
    "edgeCases": [
      {
        "case": "Graph contains cycles",
        "handling": "Returns [] because queue empties prematurely.",
        "example": "0 -> 1 -> 0"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting topological sort on an undirected or cyclic graph",
        "solution": "Topological sort is strictly defined ONLY on DAGs; always verify len(order) == n.",
        "codeExample": "if len(order) != n: return []"
      }
    ],
    "applications": [
      {
        "industry": "DevOps & CI/CD",
        "application": "Task graph execution ordering in Airflow, Luigi, and Make",
        "benefit": "Ensures data extraction finishes before transformation starts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-ts-1",
        "question": "How can you find the lexicographically smallest topological order?",
        "hint": "Replace the queue with a min-heap.",
        "answer": "Use a Min-Heap (priority queue) instead of a standard FIFO queue in Kahn's algorithm. At every step, the lowest-numbered ready node is popped."
      }
    ],
    "quiz": [
      {
        "id": "q-ts-1",
        "question": "What does it mean if Kahn's algorithm terminates with len(order) < n?",
        "options": [
          "The graph contains at least one directed cycle",
          "The graph is disconnected",
          "The graph is a tree",
          "The graph is bipartite"
        ],
        "correctIndex": 0,
        "explanation": "Vertices in a cycle depend on each other, so their in-degrees never reach 0 and they never enter the queue."
      }
    ],
    "codingChallenge": {
      "title": "Course Schedule II",
      "problem": "Return the ordering of courses you should take to finish all courses. If impossible, return an empty array.",
      "hints": [
        "Apply Kahn's algorithm. If len(order) == numCourses return order, else return []."
      ],
      "starterCode": "def find_order(numCourses: int, prerequisites: list[list[int]]) -> list[int]:\n    # TODO: Find valid course schedule\n    pass",
      "solution": "from collections import deque\n\ndef find_order(numCourses: int, prerequisites: list[list[int]]) -> list[int]:\n    graph = [[] for _ in range(numCourses)]\n    in_degree = [0] * numCourses\n    for dest, src in prerequisites:\n        graph[src].append(dest)\n        in_degree[dest] += 1\n    q = deque([i for i in range(numCourses) if in_degree[i] == 0])\n    order = []\n    while q:\n        u = q.popleft()\n        order.append(u)\n        for v in graph[u]:\n            in_degree[v] -= 1\n            if in_degree[v] == 0:\n                q.append(v)\n    return order if len(order) == numCourses else []"
    },
    "summary": {
      "keyTakeaways": [
        "Topological sort orders DAG tasks such that prerequisites precede dependents.",
        "Kahn's algorithm uses in-degrees to discover valid execution order in O(V + E)."
      ],
      "nextLessonId": "dsa-graph-dijkstra",
      "nextLessonTitle": "Dijkstra's Shortest Path Algorithm",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 9,
        "lines": "9",
        "code": "in_degree[v] += 1",
        "codeSnippet": "in_degree[v] += 1",
        "explanation": "Counts number of incoming dependencies for each node."
      },
      {
        "line": 20,
        "lines": "20",
        "code": "return order if len(order) == n else []",
        "codeSnippet": "return order if len(order) == n else []",
        "explanation": "If cycle exists, nodes in cycle never reach in-degree 0, so len(order) < n."
      }
    ]
  },
  "dsa-graph-dijkstra": {
    "id": "dsa-graph-dijkstra",
    "moduleId": "dsa-module-10",
    "title": "Dijkstra's Shortest Path Algorithm",
    "subtitle": "Single-Source Shortest Paths, Priority Queues, and the Non-Negative Edge Invariant",
    "order": 8,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "graph",
    "objectives": [
      "Compute shortest paths from a source to all vertices in non-negative weighted graphs.",
      "Implement the relaxation condition: dist[v] = min(dist[v], dist[u] + weight).",
      "Utilize a Min-Heap priority queue to achieve O((V + E) log V) time.",
      "Explain why Dijkstra fails on graphs containing negative edge weights."
    ],
    "prerequisites": [
      "Priority Queue Applications",
      "Graph Representation: Adjacency List and Matrix"
    ],
    "analogy": {
      "title": "Water Flooding an Uneven Pipe Network",
      "text": "Imagine a network of dry pipes connecting water basins. Water is poured into the source basin and flows through pipes at rates proportional to their lengths (weights). The first time water reaches any basin, that wavefront traveled along the shortest possible time path.",
      "metaphor": "Dijkstra greedily locks in shortest distances in order of increasing path length."
    },
    "problemSolved": {
      "title": "Finding Optimal Routing in Weighted Networks",
      "description": "Unweighted graphs find shortest paths via BFS in O(V + E). When edges have varied traversal times/costs (weights), BFS fails. Dijkstra's algorithm generalizes BFS using a min-heap to guarantee optimal routes in O((V + E) log V).",
      "keyPoints": [
        "Finds shortest paths from single source to all vertices.",
        "Greedy choice property guarantees locked nodes are optimal.",
        "Core routing engine of Google Maps, OSPF, and GPS navigators."
      ]
    },
    "intuition": {
      "overview": "Initialize dist[start] = 0, all others inf. Push (0, start) to Min-Heap. Pop vertex u with minimum distance. For each neighbor v: if dist[u] + weight < dist[v], update dist[v] and push (dist[v], v) to heap.",
      "steps": [
        {
          "step": 1,
          "title": "Extract Min",
          "description": "Pop (d, u) from heap. If d > dist[u], continue (stale entry)."
        },
        {
          "step": 2,
          "title": "Relax Neighbors",
          "description": "For (v, w) in graph[u]: if dist[u] + w < dist[v]: dist[v] = dist[u] + w; push (dist[v], v)."
        },
        {
          "step": 3,
          "title": "Termination",
          "description": "Terminates when heap is empty; dist array holds all shortest distances."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let G = (V, E, w) have non-negative weights w(u, v) \\ge 0. Triangle inequality: \\delta(s, v) \\le \\delta(s, u) + w(u, v). Edge relaxation sets dist[v] = \\min(dist[v], dist[u] + w(u, v)).",
      "latex": "T_{\\text{Dijkstra}} = \\mathcal{O}\\big((|V| + |E|) \\log |V|\\big), \\quad \\text{Space} = \\mathcal{O}(|V| + |E|)"
    },
    "complexity": {
      "overview": "Time: O((V + E) log V) using binary heap. Space: O(V + E).",
      "cases": [
        {
          "case": "Best",
          "time": "O(E log V)",
          "space": "O(V + E)",
          "explanation": "Single-source query."
        },
        {
          "case": "Average",
          "time": "O((V + E) log V)",
          "space": "O(V + E)",
          "explanation": "Each edge relaxed at most once."
        },
        {
          "case": "Worst",
          "time": "O((V + E) log V)",
          "space": "O(V + E)",
          "explanation": "Dense graph with heap pushes."
        }
      ],
      "spaceNote": "O(V) distance table and O(E) heap entries."
    },
    "workedExample": {
      "title": "Shortest Path from A in: A-(1)->B, A-(4)->C, B-(2)->C",
      "input": "Start=A. Edges: (A,B,1), (A,C,4), (B,C,2)",
      "steps": [
        {
          "step": 1,
          "action": "Pop A (dist=0)",
          "state": "Relax B: dist[B]=1; Relax C: dist[C]=4",
          "explanation": "Heap holds [(1, B), (4, C)]."
        },
        {
          "step": 2,
          "action": "Pop B (dist=1)",
          "state": "Relax C via B: 1 + 2 = 3 < 4 -> dist[C]=3",
          "explanation": "Better path to C found via B!"
        },
        {
          "step": 3,
          "action": "Pop C (dist=3)",
          "state": "No more outgoing edges",
          "explanation": "Shortest path to C locked at 3."
        }
      ],
      "finalOutput": "dist = {A: 0, B: 1, C: 3}"
    },
    "visualExplanation": {
      "title": "Dijkstra Metric Radial Flood",
      "description": "Visualizing expanding concentric distance contours locking nodes in green as optimal.",
      "features": [
        "Min-heap priority queue table on right",
        "Relaxation arrows flash yellow when distance improves"
      ]
    },
    "pseudocode": {
      "title": "Dijkstra's Algorithm",
      "code": "function dijkstra(n, graph, start):\n    dist = array of size n with infinity\n    dist[start] = 0\n    pq = PriorityQueue([(0, start)])\n    while not pq.isEmpty():\n        d, u = pq.pop()\n        if d > dist[u]: continue # stale\n        for v, weight in graph[u]:\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                pq.push((dist[v], v))\n    return dist"
    },
    "pythonCode": {
      "title": "Python Dijkstra Implementation",
      "code": "import heapq\n\ndef dijkstra(n: int, edges: list[list[int]], start: int) -> list[float]:\n    graph = [[] for _ in range(n)]\n    for u, v, w in edges:\n        graph[u].append((v, w))\n        \n    dist = [float('inf')] * n\n    dist[start] = 0\n    pq = [(0, start)] # (distance, vertex)\n    \n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:\n            continue # Stale duplicate entry\n            \n        for v, weight in graph[u]:\n            new_dist = dist[u] + weight\n            if new_dist < dist[v]:\n                dist[v] = new_dist\n                heapq.heappush(pq, (new_dist, v))\n                \n    return dist",
      "explanation": "Uses heapq with lazy deletion (skipping stale entries where d > dist[u])."
    },
    "runnableCode": {
      "code": "edges = [[0, 1, 1], [0, 2, 4], [1, 2, 2]]\nprint(dijkstra(3, edges, 0))",
      "expectedOutput": "[0, 1, 3]"
    },
    "lineByLineExplanation": [
      {
        "line": 15,
        "lines": "15",
        "code": "if d > dist[u]: continue",
        "codeSnippet": "if d > dist[u]: continue",
        "explanation": "Critical performance optimization: skips outdated entries without needing expensive decrease-key operations."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "if new_dist < dist[v]:",
        "codeSnippet": "if new_dist < dist[v]:",
        "explanation": "Edge relaxation: updates distance if a shorter path to v is discovered through u."
      }
    ],
    "edgeCases": [
      {
        "case": "Unreachable nodes",
        "handling": "Distance remains float(\"inf\").",
        "example": "Disconnected component"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using Dijkstra on graphs with negative edge weights",
        "solution": "Dijkstra assumes locked nodes can never improve; negative weights violate this greedy invariant. Use Bellman-Ford for negative weights.",
        "codeExample": "# Negative weights require Bellman-Ford!"
      }
    ],
    "applications": [
      {
        "industry": "Transportation & Logistics",
        "application": "GPS route planning in navigation apps (Google Maps)",
        "benefit": "Finds fastest drive time taking speed limits and traffic into account."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-djk-1",
        "question": "How can you reconstruct the actual shortest PATH of vertices, not just the distance?",
        "hint": "Track a parent array.",
        "answer": "Maintain a parent array parent = [-1] * n. Whenever dist[v] is relaxed via u, set parent[v] = u. Backtrack from target to start."
      }
    ],
    "quiz": [
      {
        "id": "q-djk-1",
        "question": "Why does Dijkstra's algorithm fail on graphs with negative edge weights?",
        "options": [
          "Its greedy choice assumes that once a node is popped from the heap, its distance is finalized and can never decrease",
          "Negative numbers cause heap overflow",
          "Python heapq cannot store negative numbers",
          "It only works on trees"
        ],
        "correctIndex": 0,
        "explanation": "A future negative edge could reduce the path distance to an already \"locked\" node, breaking Dijkstra's greedy correctness proof."
      }
    ],
    "codingChallenge": {
      "title": "Network Delay Time",
      "problem": "You are given a network of n nodes and times list of directed edges with travel times. Return the minimum time for all nodes to receive a signal from node k, or -1 if impossible.",
      "hints": [
        "Run Dijkstra from node k; the answer is max(dist). If any node is unreachable (inf), return -1."
      ],
      "starterCode": "import heapq\n\ndef network_delay_time(times: list[list[int]], n: int, k: int) -> int:\n    # TODO: Calculate network delay time\n    pass",
      "solution": "import heapq\n\ndef network_delay_time(times: list[list[int]], n: int, k: int) -> int:\n    graph = [[] for _ in range(n + 1)]\n    for u, v, w in times:\n        graph[u].append((v, w))\n    dist = [float('inf')] * (n + 1)\n    dist[k] = 0\n    pq = [(0, k)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    max_time = max(dist[1:])\n    return max_time if max_time != float('inf') else -1"
    },
    "summary": {
      "keyTakeaways": [
        "Dijkstra finds single-source shortest paths in O((V + E) log V).",
        "Strictly requires non-negative edge weights."
      ],
      "nextLessonId": "dsa-graph-bellman-ford",
      "nextLessonTitle": "Bellman-Ford Algorithm",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 15,
        "lines": "15",
        "code": "if d > dist[u]: continue",
        "codeSnippet": "if d > dist[u]: continue",
        "explanation": "Critical performance optimization: skips outdated entries without needing expensive decrease-key operations."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "if new_dist < dist[v]:",
        "codeSnippet": "if new_dist < dist[v]:",
        "explanation": "Edge relaxation: updates distance if a shorter path to v is discovered through u."
      }
    ]
  },
  "dsa-graph-bellman-ford": {
    "id": "dsa-graph-bellman-ford",
    "moduleId": "dsa-module-10",
    "title": "Bellman-Ford Algorithm",
    "subtitle": "Negative Edge Weights, Negative Cycle Detection, and Dynamic Programming Relaxation",
    "order": 9,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "graph",
    "objectives": [
      "Handle graphs with negative edge weights where Dijkstra fails.",
      "Relax all E edges V - 1 times in dynamic programming passes.",
      "Detect negative-weight cycles during an optional V-th relaxation pass.",
      "Understand why V - 1 iterations are sufficient for any simple path."
    ],
    "prerequisites": [
      "Dijkstra's Shortest Path Algorithm"
    ],
    "analogy": {
      "title": "Currency Arbitrage in Foreign Exchange",
      "text": "A financial trader converts USD to EUR, then EUR to JPY, then JPY back to USD. If exchange rates create a loop where 1 dollar becomes 1.05 dollars, running this loop infinitely generates infinite money. In graph theory, this is a negative weight cycle (multiplying exchange rates converts to log-sum distances).",
      "metaphor": "Bellman-Ford detects loops where total edge cost is negative, causing infinite descent."
    },
    "problemSolved": {
      "title": "Shortest Paths with Negative Weights & Arbitrage Detection",
      "description": "Dijkstra breaks on negative edges. Bellman-Ford correctly handles negative edge weights in O(V * E) time and flags negative cycles where shortest path is undefined (-infinity).",
      "keyPoints": [
        "Operates correctly with negative edge weights.",
        "Detects reachable negative weight cycles on V-th pass.",
        "Underlies RIP (Routing Information Protocol) distance-vector routing."
      ]
    },
    "intuition": {
      "overview": "A shortest path in a graph with V vertices contains at most V - 1 edges. Therefore, relaxing every edge V - 1 times guarantees all shortest paths propagate. If any edge can still relax on pass V, a negative cycle exists.",
      "steps": [
        {
          "step": 1,
          "title": "Initialize",
          "description": "dist[start] = 0, all others inf."
        },
        {
          "step": 2,
          "title": "Relax V - 1 Times",
          "description": "For i from 1 to V - 1: for each (u, v, w) in edges: dist[v] = min(dist[v], dist[u] + w)."
        },
        {
          "step": 3,
          "title": "Check Negative Cycle",
          "description": "Run 1 more relaxation pass. If any dist[u] + w < dist[v], a negative cycle exists!"
        }
      ]
    },
    "formalDefinition": {
      "text": "Let G = (V, E) be a weighted directed graph. Bellman-Ford solves the DP recurrence d_k(v) = \\min(d_{k-1}(v), \\min_{(u, v) \\in E} \\{d_{k-1}(u) + w(u, v)\\}). If d_V(v) < d_{V-1}(v), a negative cycle is reachable.",
      "latex": "T_{\\text{Bellman-Ford}} = \\mathcal{O}(|V| \\cdot |E|), \\quad \\text{Space} = \\mathcal{O}(|V|)"
    },
    "complexity": {
      "overview": "Time: O(V * E). Space: O(V) for distance table.",
      "cases": [
        {
          "case": "Best",
          "time": "O(E)",
          "space": "O(V)",
          "explanation": "Stops early if no distances change during a pass."
        },
        {
          "case": "Average",
          "time": "O(V * E)",
          "space": "O(V)",
          "explanation": "Standard relaxation passes."
        },
        {
          "case": "Worst",
          "time": "O(V * E)",
          "space": "O(V)",
          "explanation": "Path of length V - 1 relaxed in reverse order."
        }
      ],
      "spaceNote": "O(V) memory for distance array."
    },
    "workedExample": {
      "title": "Detecting Negative Cycle 1 -> 2 -> 1 with weight -1",
      "input": "Edges: (0, 1, 1), (1, 2, 2), (2, 1, -3), start=0",
      "steps": [
        {
          "step": 1,
          "action": "Pass 1",
          "state": "dist: [0, 1, 3]",
          "explanation": "Reaches nodes."
        },
        {
          "step": 2,
          "action": "Pass 2",
          "state": "dist[1] improves: 3 + (-3) = 0 < 1 -> dist=[0, 0, 2]",
          "explanation": "Cycle reduces cost."
        },
        {
          "step": 3,
          "action": "Pass V (check)",
          "state": "dist still decreases indefinitely",
          "explanation": "Negative Cycle Detected!"
        }
      ],
      "finalOutput": "Negative Cycle Exists"
    },
    "visualExplanation": {
      "title": "Iterative Distance Waves",
      "description": "Visualizing waves of relaxation spreading across edges, with negative cycle flashing red.",
      "features": [
        "V-1 passes guarantee propagation",
        "V-th pass detects persistent decrease"
      ]
    },
    "pseudocode": {
      "title": "Bellman-Ford Algorithm",
      "code": "function bellmanFord(V, edges, start):\n    dist = array of size V with infinity\n    dist[start] = 0\n    for i from 1 to V - 1:\n        for u, v, w in edges:\n            if dist[u] != infinity and dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n    # Check negative cycle\n    for u, v, w in edges:\n        if dist[u] != infinity and dist[u] + w < dist[v]:\n            return \"Negative Cycle Detected\"\n    return dist"
    },
    "pythonCode": {
      "title": "Python Bellman-Ford Implementation",
      "code": "def bellman_ford(v: int, edges: list[list[int]], start: int) -> tuple[list[float], bool]:\n    dist = [float('inf')] * v\n    dist[start] = 0\n\n    # Relax V - 1 times\n    for _ in range(v - 1):\n        updated = False\n        for u, dest, w in edges:\n            if dist[u] != float('inf') and dist[u] + w < dist[dest]:\n                dist[dest] = dist[u] + w\n                updated = True\n        if not updated:\n            break # Early termination optimization!\n\n    # Check for negative cycle\n    has_negative_cycle = False\n    for u, dest, w in edges:\n        if dist[u] != float('inf') and dist[u] + w < dist[dest]:\n            has_negative_cycle = True\n            break\n\n    return dist, has_negative_cycle",
      "explanation": "Iteratively relaxes all edges V-1 times with early break and negative cycle check."
    },
    "runnableCode": {
      "code": "edges = [[0, 1, 4], [0, 2, 5], [1, 2, -3]]\ndist, neg_cycle = bellman_ford(3, edges, 0)\nprint(f\"Distances: {dist}, Negative Cycle: {neg_cycle}\")",
      "expectedOutput": "Distances: [0, 4, 1], Negative Cycle: False"
    },
    "lineByLineExplanation": [
      {
        "line": 7,
        "lines": "7",
        "code": "for _ in range(v - 1):",
        "codeSnippet": "for _ in range(v - 1):",
        "explanation": "Runs V - 1 passes because any simple path in a graph of V vertices has at most V - 1 edges."
      },
      {
        "line": 17,
        "lines": "17",
        "code": "if dist[u] != float(\"inf\") and dist[u] + w < dist[dest]:",
        "codeSnippet": "if dist[u] != float(\"inf\") and dist[u] + w < dist[dest]:",
        "explanation": "If any distance can still be decreased on the V-th pass, a negative cycle exists."
      }
    ],
    "edgeCases": [
      {
        "case": "Disconnected negative cycle",
        "handling": "If cycle is not reachable from start (dist is inf), it is ignored; only reachable cycles are flagged.",
        "example": "Cycle in unreachable component"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to check dist[u] != float(\"inf\")",
        "solution": "In Python, inf + (-5) = inf, but in languages with overflow it wraps around; always guard dist[u] != inf.",
        "codeExample": "if dist[u] != float(\"inf\"):"
      }
    ],
    "applications": [
      {
        "industry": "Networking",
        "application": "Distance-Vector Routing (RIP protocol)",
        "benefit": "Routers periodically exchange vector distance tables with neighbors."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-bf-1",
        "question": "How can Bellman-Ford detect currency arbitrage in Forex markets?",
        "hint": "Take negative logarithm of exchange rates.",
        "answer": "Transform exchange rates r by taking -log(r). Multiplying rates becomes adding logs; an arbitrage cycle where product > 1 becomes a negative-sum cycle where sum < 0."
      }
    ],
    "quiz": [
      {
        "id": "q-bf-1",
        "question": "Why are V - 1 relaxation iterations sufficient in Bellman-Ford?",
        "options": [
          "The longest simple path in a graph with V vertices contains at most V - 1 edges",
          "V - 1 is the number of edges in a tree",
          "Heaps require V - 1 operations",
          "It matches CPU cache lines"
        ],
        "correctIndex": 0,
        "explanation": "A path with no cycles visits each vertex at most once, which requires at most V - 1 edges."
      }
    ],
    "codingChallenge": {
      "title": "Cheapest Flights Within K Stops",
      "problem": "Find the cheapest price from src to dst with at most k stops. If no such route exists, return -1.",
      "hints": [
        "Run Bellman-Ford for exactly k + 1 iterations, using a clone of previous distances to avoid multi-edge hops in one turn."
      ],
      "starterCode": "def find_cheapest_price(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:\n    # TODO: Implement bounded Bellman-Ford\n    pass",
      "solution": "def find_cheapest_price(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:\n    dist = [float('inf')] * n\n    dist[src] = 0\n    for _ in range(k + 1):\n        tmp = list(dist)\n        for u, v, w in flights:\n            if dist[u] != float('inf') and dist[u] + w < tmp[v]:\n                tmp[v] = dist[u] + w\n        dist = tmp\n    return dist[dst] if dist[dst] != float('inf') else -1"
    },
    "summary": {
      "keyTakeaways": [
        "Bellman-Ford handles negative weights and detects negative cycles in O(V * E).",
        "Relax edges V - 1 times; pass V checks for negative cycles."
      ],
      "nextLessonId": "dsa-graph-floyd-warshall",
      "nextLessonTitle": "Floyd-Warshall: All-Pairs Shortest Path",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 7,
        "lines": "7",
        "code": "for _ in range(v - 1):",
        "codeSnippet": "for _ in range(v - 1):",
        "explanation": "Runs V - 1 passes because any simple path in a graph of V vertices has at most V - 1 edges."
      },
      {
        "line": 17,
        "lines": "17",
        "code": "if dist[u] != float(\"inf\") and dist[u] + w < dist[dest]:",
        "codeSnippet": "if dist[u] != float(\"inf\") and dist[u] + w < dist[dest]:",
        "explanation": "If any distance can still be decreased on the V-th pass, a negative cycle exists."
      }
    ]
  },
  "dsa-graph-floyd-warshall": {
    "id": "dsa-graph-floyd-warshall",
    "moduleId": "dsa-module-10",
    "title": "Floyd-Warshall: All-Pairs Shortest Path",
    "subtitle": "Dynamic Programming over Intermediate Vertices in O(V³) Time",
    "order": 10,
    "readTimeMinutes": 22,
    "difficulty": "Advanced",
    "visualizerType": "graph",
    "objectives": [
      "Compute shortest paths between every pair of vertices in a weighted graph.",
      "Formulate the 3D DP recurrence over intermediate vertex sets {1..k}.",
      "Optimize DP table space from O(V³) to in-place O(V²).",
      "Detect negative cycles when diagonal matrix entries dist[i][i] become negative."
    ],
    "prerequisites": [
      "Bellman-Ford Algorithm",
      "Graph Representation: Adjacency List and Matrix"
    ],
    "analogy": {
      "title": "Flight Layovers Through Major Hub Airports",
      "text": "To find the cheapest flight between any two small cities in the world, an airline booking engine first considers direct flights. Next, it tests if stopping over in Chicago (Hub 1) makes the ticket cheaper. Then it tests adding Atlanta (Hub 2) as an option, then Dallas (Hub 3), until all possible layover airports have been evaluated.",
      "metaphor": "Floyd-Warshall tests whether routing path i -> j through intermediate vertex k reduces total cost."
    },
    "problemSolved": {
      "title": "Computing All-Pairs Distances Simultaneously",
      "description": "Running Dijkstra from every vertex takes O(V * (V + E) log V), which can be complex to implement with negative weights. Floyd-Warshall computes all V² pairwise shortest distances in clean, compact triple-nested loops in O(V³) time.",
      "keyPoints": [
        "Computes all-pairs shortest paths in O(V³) time.",
        "Handles positive and negative edge weights.",
        "Extremely compact implementation (5 lines of core code)."
      ]
    },
    "intuition": {
      "overview": "Let dist[i][j] be the shortest distance from i to j using only intermediate vertices from {0..k-1}. When considering vertex k as a new potential layover: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).",
      "steps": [
        {
          "step": 1,
          "title": "Base Matrix",
          "description": "dist[i][i] = 0; dist[i][j] = weight(i, j) if edge exists, else inf."
        },
        {
          "step": 2,
          "title": "Triple Loop (k outer)",
          "description": "For k from 0 to V-1: for i in 0..V-1: for j in 0..V-1: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])."
        },
        {
          "step": 3,
          "title": "Negative Cycle Check",
          "description": "If dist[i][i] < 0 for any i, a negative cycle exists."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let d^{(k)}[i][j] be the shortest path from i to j with all intermediate vertices in \\{0, 1, ..., k\\}. Recurrence: d^{(k)}[i][j] = \\min\\big(d^{(k-1)}[i][j], \\; d^{(k-1)}[i][k] + d^{(k-1)}[k][j]\\big).",
      "latex": "d^{(k)}[i][j] = \\min\\left( d^{(k-1)}[i][j], \\; d^{(k-1)}[i][k] + d^{(k-1)}[k][j] \\right)"
    },
    "complexity": {
      "overview": "Time: O(V³) strictly due to triple nested loops. Space: O(V²) for 2D matrix.",
      "cases": [
        {
          "case": "Best",
          "time": "O(V³)",
          "space": "O(V²)",
          "explanation": "Always runs all triple loop iterations."
        },
        {
          "case": "Average",
          "time": "O(V³)",
          "space": "O(V²)",
          "explanation": "Deterministic O(V³)."
        },
        {
          "case": "Worst",
          "time": "O(V³)",
          "space": "O(V²)",
          "explanation": "Dense graphs with V vertices."
        }
      ],
      "spaceNote": "O(V²) space for distance matrix."
    },
    "workedExample": {
      "title": "Shortest paths for 3 nodes: (0, 1, 3), (1, 2, 1), (0, 2, 8)",
      "input": "n=3. Direct 0->2 is 8. But 0->1 is 3 and 1->2 is 1.",
      "steps": [
        {
          "step": 1,
          "action": "Initial Matrix",
          "state": "dist[0][2] = 8",
          "explanation": "Direct edge."
        },
        {
          "step": 2,
          "action": "When k=1 (test layover at 1)",
          "state": "dist[0][1] + dist[1][2] = 3 + 1 = 4 < 8",
          "explanation": "Layover at 1 improves path!"
        },
        {
          "step": 3,
          "action": "Update cell",
          "state": "dist[0][2] becomes 4",
          "explanation": "Shortest path found."
        }
      ],
      "finalOutput": "dist[0][2] = 4"
    },
    "visualExplanation": {
      "title": "Intermediate Layover Hub Routing",
      "description": "Visualizing vertex k acting as a pivot connecting node i to node j.",
      "features": [
        "Hub k highlighted in yellow",
        "Path i -> k -> j compared against direct path i -> j"
      ]
    },
    "pseudocode": {
      "title": "Floyd-Warshall Algorithm",
      "code": "function floydWarshall(n, edges):\n    dist = matrix of size n x n filled with infinity\n    for i in 0..n-1: dist[i][i] = 0\n    for u, v, w in edges: dist[u][v] = w\n\n    for k from 0 to n - 1: # MUST BE OUTER LOOP!\n        for i from 0 to n - 1:\n            for j from 0 to n - 1:\n                if dist[i][k] + dist[k][j] < dist[i][j]:\n                    dist[i][j] = dist[i][k] + dist[k][j]\n    return dist"
    },
    "pythonCode": {
      "title": "Python Floyd-Warshall Implementation",
      "code": "def floyd_warshall(n: int, edges: list[list[int]]) -> list[list[float]]:\n    dist = [[float('inf')] * n for _ in range(n)]\n    for i in range(n):\n        dist[i][i] = 0\n    for u, v, w in edges:\n        dist[u][v] = w\n\n    # k must be the outermost loop\n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                if dist[i][k] + dist[k][j] < dist[i][j]:\n                    dist[i][j] = dist[i][k] + dist[k][j]\n\n    # Negative cycle check\n    for i in range(n):\n        if dist[i][i] < 0:\n            raise ValueError(\"Negative weight cycle detected\")\n\n    return dist",
      "explanation": "Computes all-pairs shortest paths in O(V³) time with in-place O(V²) space."
    },
    "runnableCode": {
      "code": "edges = [[0, 1, 3], [1, 2, 1], [0, 2, 8]]\nmatrix = floyd_warshall(3, edges)\nprint(matrix[0])",
      "expectedOutput": "[0, 3, 4]"
    },
    "lineByLineExplanation": [
      {
        "line": 9,
        "lines": "9",
        "code": "for k in range(n):",
        "codeSnippet": "for k in range(n):",
        "explanation": "k MUST be the outer loop: builds DP subproblems by adding intermediate vertex candidates one by one."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "if dist[i][k] + dist[k][j] < dist[i][j]:",
        "codeSnippet": "if dist[i][k] + dist[k][j] < dist[i][j]:",
        "explanation": "Checks if detouring through vertex k reduces the total cost from i to j."
      }
    ],
    "edgeCases": [
      {
        "case": "Negative cycle reachable",
        "handling": "Diagonal element dist[i][i] becomes negative (< 0); raises error or flags cycle.",
        "example": "dist[1][1] = -2"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Placing k as the innermost loop instead of outermost",
        "solution": "If k is innermost, paths cannot chain through multiple intermediate nodes; k MUST be the outermost loop.",
        "codeExample": "for k in range(n): # OUTERMOST"
      }
    ],
    "applications": [
      {
        "industry": "Telecommunications",
        "application": "Global network routing tables (computing transitive closures)",
        "benefit": "Builds all-to-all optimal latency routing matrix."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-fw-1",
        "question": "How can Floyd-Warshall be adapted to compute Transitive Closure (reachability matrix)?",
        "hint": "Use boolean OR and AND.",
        "answer": "Warshall's algorithm sets reach[i][j] = reach[i][j] or (reach[i][k] and reach[k][j]) using boolean operations."
      }
    ],
    "quiz": [
      {
        "id": "q-fw-1",
        "question": "Why must the intermediate vertex loop k be the outermost loop in Floyd-Warshall?",
        "options": [
          "To ensure all shorter paths using vertices {0..k-1} are fully finalized before introducing vertex k",
          "Because Python executes outer loops faster",
          "To avoid index errors",
          "Because matrices are row-major"
        ],
        "correctIndex": 0,
        "explanation": "The DP state relies on having fully computed all paths using intermediate vertices up to k-1 before allowing vertex k to be used."
      }
    ],
    "codingChallenge": {
      "title": "Find the City with the Smallest Number of Neighbors at a Threshold Distance",
      "problem": "Given n cities and edges with weights, find the city that can reach the fewest number of cities within distanceThreshold. If there are ties, return the city with the greatest index.",
      "hints": [
        "Run Floyd-Warshall to get all-pairs distances, then count reachable cities for each i."
      ],
      "starterCode": "def find_the_city(n: int, edges: list[list[int]], distanceThreshold: int) -> int:\n    # TODO: Find optimal city\n    pass",
      "solution": "def find_the_city(n: int, edges: list[list[int]], distanceThreshold: int) -> int:\n    dist = [[float('inf')] * n for _ in range(n)]\n    for i in range(n): dist[i][i] = 0\n    for u, v, w in edges:\n        dist[u][v] = w\n        dist[v][u] = w\n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                if dist[i][k] + dist[k][j] < dist[i][j]:\n                    dist[i][j] = dist[i][k] + dist[k][j]\n    min_count = float('inf')\n    best_city = -1\n    for i in range(n):\n        count = sum(1 for j in range(n) if i != j and dist[i][j] <= distanceThreshold)\n        if count <= min_count:\n            min_count = count\n            best_city = i\n    return best_city"
    },
    "summary": {
      "keyTakeaways": [
        "Floyd-Warshall solves all-pairs shortest paths in O(V³) time.",
        "The intermediate vertex k loop must strictly be the outermost loop."
      ],
      "nextLessonId": "dsa-graph-mst",
      "nextLessonTitle": "Minimum Spanning Trees: Prim and Kruskal",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 9,
        "lines": "9",
        "code": "for k in range(n):",
        "codeSnippet": "for k in range(n):",
        "explanation": "k MUST be the outer loop: builds DP subproblems by adding intermediate vertex candidates one by one."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "if dist[i][k] + dist[k][j] < dist[i][j]:",
        "codeSnippet": "if dist[i][k] + dist[k][j] < dist[i][j]:",
        "explanation": "Checks if detouring through vertex k reduces the total cost from i to j."
      }
    ]
  },
  "dsa-graph-mst": {
    "id": "dsa-graph-mst",
    "moduleId": "dsa-module-10",
    "title": "Minimum Spanning Trees: Prim and Kruskal",
    "subtitle": "Greedy Cut Property, Cycle Avoidance, and Spanning Forest Algorithms",
    "order": 11,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "graph",
    "objectives": [
      "Define Minimum Spanning Tree (MST): connecting all V vertices with V - 1 edges of minimal total weight.",
      "Implement Kruskal's Algorithm using edge sorting and Disjoint Set Union (Union-Find) in O(E log E).",
      "Implement Prim's Algorithm using priority queues in O((V + E) log V).",
      "Prove correctness using the Cut Property and Cycle Property."
    ],
    "prerequisites": [
      "Graph Representation: Adjacency List and Matrix",
      "Dijkstra's Shortest Path Algorithm"
    ],
    "analogy": {
      "title": "Laying Fiber-Optic Cable Between Towns",
      "text": "A telecommunications company must lay fiber optic cables connecting 10 towns. Digging trenches between towns has different costs. The company wants to ensure every town can communicate with every other town, but wants to minimize the total trench-digging cost. The optimal network is a Minimum Spanning Tree.",
      "metaphor": "An MST connects all vertices with the minimum possible total edge cost and zero cycles."
    },
    "problemSolved": {
      "title": "Connecting Infrastructure Networks with Minimum Material Cost",
      "description": "Constructing electrical grids, pipeline networks, or computer subnetworks requires connecting all nodes without redundant loops at minimal expense.",
      "keyPoints": [
        "Connects all V vertices using exactly V - 1 edges.",
        "Total edge weight is globally minimized.",
        "Kruskal's: edge-centric (sort edges + Union-Find). Prim's: vertex-centric (grow tree via min-heap)."
      ]
    },
    "intuition": {
      "overview": "Kruskal: Sort all edges by weight. Iterate through sorted edges: if adding edge does not form a cycle (checked via Union-Find), include it. Stop when V - 1 edges chosen.",
      "steps": [
        {
          "step": 1,
          "title": "Sort Edges",
          "description": "Sort all edges ascending by weight in O(E log E)."
        },
        {
          "step": 2,
          "title": "Union-Find Check",
          "description": "For (u, v, w) in sorted edges: if find(u) != find(v): union(u, v); add w to MST total."
        },
        {
          "step": 3,
          "title": "Termination",
          "description": "Stops when V - 1 edges are selected."
        }
      ]
    },
    "formalDefinition": {
      "text": "For connected, undirected, weighted graph G = (V, E, w), an MST is an acyclic subgraph T = (V, E_T) with E_T \\subseteq E, |E_T| = |V| - 1, minimizing w(T) = \\sum_{e \\in E_T} w(e). Cut Property: for any cut (S, V \\setminus S), the minimum-weight crossing edge belongs to an MST.",
      "latex": "w(T) = \\min_{T' \\subseteq E} \\sum_{e \\in T'} w(e) \\quad \\text{subject to } T' \\text{ spans } V \\land |T'| = |V| - 1"
    },
    "complexity": {
      "overview": "Kruskal: O(E log E). Prim: O((V + E) log V). Space: O(V + E).",
      "cases": [
        {
          "case": "Best",
          "time": "O(E log E)",
          "space": "O(V)",
          "explanation": "Kruskal dominates for sparse graphs (E << V²)."
        },
        {
          "case": "Average",
          "time": "O(E log E)",
          "space": "O(V)",
          "explanation": "Optimal edge selection."
        },
        {
          "case": "Worst",
          "time": "O(E log E)",
          "space": "O(V)",
          "explanation": "Dense graph with V² edges."
        }
      ],
      "spaceNote": "O(V) memory for Union-Find parent array."
    },
    "workedExample": {
      "title": "Kruskal on Triangle: (0,1,1), (1,2,2), (0,2,3)",
      "input": "Edges: (0, 1, 1), (1, 2, 2), (0, 2, 3), V=3",
      "steps": [
        {
          "step": 1,
          "action": "Sort edges",
          "state": "[(0,1,1), (1,2,2), (0,2,3)]",
          "explanation": "Sorted ascending."
        },
        {
          "step": 2,
          "action": "Pick (0, 1, 1)",
          "state": "find(0) != find(1) -> Union(0, 1), MST cost = 1",
          "explanation": "First edge included."
        },
        {
          "step": 3,
          "action": "Pick (1, 2, 2)",
          "state": "find(1) != find(2) -> Union(1, 2), MST cost = 1 + 2 = 3",
          "explanation": "Second edge included (V - 1 = 2 edges chosen)."
        },
        {
          "step": 4,
          "action": "Check (0, 2, 3)",
          "state": "find(0) == find(2) -> Skip! Forms cycle.",
          "explanation": "Discarded by Union-Find."
        }
      ],
      "finalOutput": "MST Weight = 3"
    },
    "visualExplanation": {
      "title": "Kruskal Edge Selection vs Prim Growing Tree",
      "description": "Visualizing edges locking in green one by one, avoiding red cyclic connections.",
      "features": [
        "Sorted edge list processed sequentially",
        "Union-Find clusters merge seamlessly"
      ]
    },
    "pseudocode": {
      "title": "Kruskal's Algorithm",
      "code": "function kruskal(n, edges):\n    sort(edges by weight)\n    uf = new DisjointSet(n)\n    mst_cost = 0\n    edges_count = 0\n    for u, v, w in edges:\n        if uf.union(u, v):\n            mst_cost += w\n            edges_count += 1\n            if edges_count == n - 1: break\n    return mst_cost"
    },
    "pythonCode": {
      "title": "Python Kruskal's Algorithm Implementation",
      "code": "class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.rank = [0] * n\n\n    def find(self, i):\n        if self.parent[i] != i:\n            self.parent[i] = self.find(self.parent[i]) # Path compression\n        return self.parent[i]\n\n    def union(self, i, j):\n        root_i = self.find(i)\n        root_j = self.find(j)\n        if root_i == root_j:\n            return False # Cycle detected\n        if self.rank[root_i] < self.rank[root_j]:\n            self.parent[root_i] = root_j\n        elif self.rank[root_i] > self.rank[root_j]:\n            self.parent[root_j] = root_i\n        else:\n            self.parent[root_j] = root_i\n            self.rank[root_i] += 1\n        return True\n\ndef kruskal_mst(n: int, edges: list[list[int]]) -> int:\n    # edges: [u, v, weight]\n    edges.sort(key=lambda x: x[2])\n    uf = UnionFind(n)\n    total_cost = 0\n    edges_chosen = 0\n\n    for u, v, w in edges:\n        if uf.union(u, v):\n            total_cost += w\n            edges_chosen += 1\n            if edges_chosen == n - 1:\n                break\n\n    return total_cost if edges_chosen == n - 1 else -1",
      "explanation": "Uses Union-Find with path compression and rank union for near-linear Kruskal MST."
    },
    "runnableCode": {
      "code": "edges = [[0, 1, 1], [1, 2, 2], [0, 2, 3]]\nprint(kruskal_mst(3, edges))",
      "expectedOutput": "3"
    },
    "lineByLineExplanation": [
      {
        "line": 26,
        "lines": "26",
        "code": "edges.sort(key=lambda x: x[2])",
        "codeSnippet": "edges.sort(key=lambda x: x[2])",
        "explanation": "Greedy strategy: processes edges in non-decreasing order of weight in O(E log E) time."
      },
      {
        "line": 32,
        "lines": "32",
        "code": "if uf.union(u, v):",
        "codeSnippet": "if uf.union(u, v):",
        "explanation": "Union returns False if u and v are already connected, preventing cycle creation."
      }
    ],
    "edgeCases": [
      {
        "case": "Disconnected graph",
        "handling": "edges_chosen < n - 1; returns -1 (spanning tree impossible).",
        "example": "Graph with 2 disconnected islands"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to run Kruskal without sorting edges first",
        "solution": "The greedy proof strictly requires edges to be considered in ascending order of cost.",
        "codeExample": "edges.sort(key=lambda x: x[2])"
      }
    ],
    "applications": [
      {
        "industry": "Telecommunications",
        "application": "Cable network routing and water pipe distribution",
        "benefit": "Minimizes total infrastructure layout cost."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-mst-1",
        "question": "When is Prim's algorithm faster than Kruskal's algorithm?",
        "hint": "Consider dense graphs where E is close to V².",
        "answer": "Prim's algorithm with an adjacency matrix runs in O(V²) time, which is faster than Kruskal's O(V² log V) on very dense graphs."
      }
    ],
    "quiz": [
      {
        "id": "q-mst-1",
        "question": "How many edges are in a Minimum Spanning Tree of a connected graph with V vertices?",
        "options": [
          "V - 1",
          "V",
          "V + 1",
          "E / 2"
        ],
        "correctIndex": 0,
        "explanation": "Any spanning tree connecting V vertices contains exactly V - 1 edges."
      }
    ],
    "codingChallenge": {
      "title": "Min Cost to Connect All Points",
      "problem": "Given an array points representing integer coordinates on a 2D-plane, return the minimum cost to make all points connected using Manhattan distance |xi - xj| + |yi - yj|.",
      "hints": [
        "Model as a complete graph and run Prim's or Kruskal's algorithm."
      ],
      "starterCode": "def min_cost_connect_points(points: list[list[int]]) -> int:\n    # TODO: Find MST Manhattan distance\n    pass",
      "solution": "import heapq\n\ndef min_cost_connect_points(points: list[list[int]]) -> int:\n    n = len(points)\n    visited = set()\n    pq = [(0, 0)] # (cost, point_idx)\n    total_cost = 0\n    while len(visited) < n:\n        cost, u = heapq.heappop(pq)\n        if u in visited: continue\n        visited.add(u)\n        total_cost += cost\n        x1, y1 = points[u]\n        for v in range(n):\n            if v not in visited:\n                x2, y2 = points[v]\n                dist = abs(x1 - x2) + abs(y1 - y2)\n                heapq.heappush(pq, (dist, v))\n    return total_cost"
    },
    "summary": {
      "keyTakeaways": [
        "MST connects all V vertices with V - 1 edges minimizing total weight.",
        "Kruskal sorts edges and uses Union-Find in O(E log E)."
      ],
      "nextLessonId": "dsa-graph-dsu",
      "nextLessonTitle": "Disjoint Set Union (Union-Find)",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 26,
        "lines": "26",
        "code": "edges.sort(key=lambda x: x[2])",
        "codeSnippet": "edges.sort(key=lambda x: x[2])",
        "explanation": "Greedy strategy: processes edges in non-decreasing order of weight in O(E log E) time."
      },
      {
        "line": 32,
        "lines": "32",
        "code": "if uf.union(u, v):",
        "codeSnippet": "if uf.union(u, v):",
        "explanation": "Union returns False if u and v are already connected, preventing cycle creation."
      }
    ]
  },
  "dsa-graph-dsu": {
    "id": "dsa-graph-dsu",
    "moduleId": "dsa-module-10",
    "title": "Disjoint Set Union (Union-Find)",
    "subtitle": "Path Compression, Union by Rank, and the Inverse Ackermann Function α(n)",
    "order": 12,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "graph",
    "objectives": [
      "Implement the Disjoint Set Union (DSU) data structure.",
      "Master Path Compression to flatten parent trees during find().",
      "Master Union by Rank/Size to attach shallower trees under deeper trees.",
      "Understand why combined heuristics achieve amortized O(\\alpha(n)) near-constant time."
    ],
    "prerequisites": [
      "Tree Terminology and Representation",
      "Connected Components"
    ],
    "analogy": {
      "title": "Feudal Kingdoms Merging Alliances",
      "text": "In medieval times, every village belonged to a regional lord, and lords pledged allegiance to a King (the set representative). When two kingdoms allied, the King with fewer soldiers pledged loyalty to the King with the larger army (Union by Rank). When a peasant needed to pay taxes, they bypassed local lords and sent tributes directly to the King (Path Compression).",
      "metaphor": "DSU groups items into dynamic partitions with ultra-fast representative lookups."
    },
    "problemSolved": {
      "title": "Near-Instant Dynamic Connectivity and Cycle Detection",
      "description": "Checking whether two nodes are in the same connected component naively requires running BFS/DFS in O(V + E). DSU answers connectivity queries and merges sets in amortized O(\\alpha(n)) \\approx O(1) time.",
      "keyPoints": [
        "Amortized O(\\alpha(n)) time per operation (practically <= 4 for all universe sizes).",
        "Path compression flattens tree height to 1.",
        "Core primitive for Kruskal's MST, percolation, and dynamic equivalence relations."
      ]
    },
    "intuition": {
      "overview": "Each element points to a parent. Root of a tree points to itself (parent[x] == x). `find(x)` follows parents to find root, compressing paths along the way. `union(x, y)` links one root under the other.",
      "steps": [
        {
          "step": 1,
          "title": "Find with Path Compression",
          "description": "parent[x] = find(parent[x]) rewires all traversed nodes directly to root."
        },
        {
          "step": 2,
          "title": "Union by Rank",
          "description": "Attach smaller rank root under larger rank root to prevent tree height growth."
        },
        {
          "step": 3,
          "title": "Check Connected",
          "description": "find(x) == find(y) checks if x and y share the same set in O(1)."
        }
      ]
    },
    "formalDefinition": {
      "text": "A disjoint-set data structure maintains collection \\mathcal{S} = \\{S_1, S_2, ..., S_k\\} of disjoint dynamic sets. Robert Tarjan proved that path compression combined with union by rank achieves amortized time O(m \\alpha(n)) for m operations on n elements.",
      "latex": "\\alpha(n) \\le 4 \\quad \\forall n \\le 10^{80} \\implies T_{\\text{amortized}} = \\mathcal{O}(1)"
    },
    "complexity": {
      "overview": "Find and Union run in amortized O(\\alpha(n)) time. Space: O(n).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(n)",
          "explanation": "Immediate parent is root."
        },
        {
          "case": "Average",
          "time": "O(\\alpha(n)) \\approx O(1)",
          "space": "O(n)",
          "explanation": "Inverse Ackermann growth."
        },
        {
          "case": "Worst",
          "time": "O(\\log n)",
          "space": "O(n)",
          "explanation": "Without path compression (rank only)."
        }
      ],
      "spaceNote": "O(n) storage for parent and rank arrays."
    },
    "workedExample": {
      "title": "Path Compression during find(3)",
      "input": "Tree: 3 -> 2 -> 1 -> 0 (root)",
      "steps": [
        {
          "step": 1,
          "action": "Traverse upward",
          "state": "Follow 3 -> 2 -> 1 -> 0",
          "explanation": "Root 0 identified."
        },
        {
          "step": 2,
          "action": "Unwind and compress",
          "state": "parent[3]=0, parent[2]=0, parent[1]=0",
          "explanation": "All nodes rewired directly to 0!"
        },
        {
          "step": 3,
          "action": "Next find(3)",
          "state": "Takes exactly 1 step (parent[3] == 0)",
          "explanation": "Subsequent operations run in O(1)."
        }
      ],
      "finalOutput": "Flattened star graph around root 0"
    },
    "visualExplanation": {
      "title": "Tree Flattening via Path Compression",
      "description": "Visualizing long vertical chain collapsing into a flat horizontal fan centered on root.",
      "features": [
        "Long linear branch collapses into 1-depth star",
        "Future lookups take 1 pointer hop"
      ]
    },
    "pseudocode": {
      "title": "Optimized DSU Implementation",
      "code": "class DSU:\n    def __init__(n):\n        parent = array 0..n-1\n        rank = array of size n with 0\n\n    def find(i):\n        if parent[i] != i:\n            parent[i] = find(parent[i]) # Path compression\n        return parent[i]\n\n    def union(i, j):\n        root_i = find(i)\n        root_j = find(j)\n        if root_i == root_j: return False\n        if rank[root_i] < rank[root_j]:\n            parent[root_i] = root_j\n        elif rank[root_i] > rank[root_j]:\n            parent[root_j] = root_i\n        else:\n            parent[root_j] = root_i\n            rank[root_i] += 1\n        return True"
    },
    "pythonCode": {
      "title": "Production-Grade DSU Class",
      "code": "class DSU:\n    def __init__(self, n: int):\n        self.parent = list(range(n))\n        self.rank = [0] * n\n        self.num_components = n\n\n    def find(self, i: int) -> int:\n        if self.parent[i] != i:\n            self.parent[i] = self.find(self.parent[i]) # Path compression\n        return self.parent[i]\n\n    def union(self, i: int, j: int) -> bool:\n        root_i = self.find(i)\n        root_j = self.find(j)\n        if root_i == root_j:\n            return False\n            \n        # Union by rank\n        if self.rank[root_i] < self.rank[root_j]:\n            self.parent[root_i] = root_j\n        elif self.rank[root_i] > self.rank[root_j]:\n            self.parent[root_j] = root_i\n        else:\n            self.parent[root_j] = root_i\n            self.rank[root_i] += 1\n            \n        self.num_components -= 1\n        return True\n\n    def connected(self, i: int, j: int) -> bool:\n        return self.find(i) == self.find(j)",
      "explanation": "Combines path compression with union-by-rank and tracks number of distinct components."
    },
    "runnableCode": {
      "code": "dsu = DSU(5)\ndsu.union(0, 1)\ndsu.union(1, 2)\nprint(dsu.connected(0, 2)) # True\nprint(dsu.connected(0, 3)) # False\nprint(dsu.num_components)  # 3",
      "expectedOutput": "True\nFalse\n3"
    },
    "lineByLineExplanation": [
      {
        "line": 9,
        "lines": "9",
        "code": "self.parent[i] = self.find(self.parent[i])",
        "codeSnippet": "self.parent[i] = self.find(self.parent[i])",
        "explanation": "Path compression: recursively finds root and updates parent pointer directly to that root."
      },
      {
        "line": 24,
        "lines": "24",
        "code": "self.num_components -= 1",
        "codeSnippet": "self.num_components -= 1",
        "explanation": "Every successful union merges two components, decrementing total count."
      }
    ],
    "edgeCases": [
      {
        "case": "Self-union (union(u, u))",
        "handling": "root_i == root_j check safely returns False.",
        "example": "dsu.union(2, 2)"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to assign self.parent[i] = self.find(self.parent[i]) during find",
        "solution": "Simply calling find without reassigning misses path compression, allowing trees to degrade to O(n) depth.",
        "codeExample": "self.parent[i] = self.find(self.parent[i])"
      }
    ],
    "applications": [
      {
        "industry": "Image Processing",
        "application": "Connected component labeling in binary raster masks",
        "benefit": "Merges adjacent pixels into labeled objects in near-instant time."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-dsu-1",
        "question": "What is the value of the Inverse Ackermann function \\alpha(n) for the number of atoms in the observable universe (~10^80)?",
        "hint": "It grows extraordinarily slowly.",
        "answer": "Even for 10^80, \\alpha(n) <= 4, which is why it is practically considered constant O(1)."
      }
    ],
    "quiz": [
      {
        "id": "q-dsu-1",
        "question": "What does Path Compression do in Union-Find?",
        "options": [
          "Makes every node on the find path point directly to the root",
          "Balances trees by height",
          "Deletes unused nodes",
          "Compresses arrays using gzip"
        ],
        "correctIndex": 0,
        "explanation": "Path compression re-points all visited nodes along the search path directly to the root, drastically flattening the tree."
      }
    ],
    "codingChallenge": {
      "title": "Redundant Connection",
      "problem": "Given a tree with n nodes (labeled 1 to n) that has one additional edge added forming a cycle, return an edge that can be removed so that the resulting graph is a tree.",
      "hints": [
        "Iterate through edges and call union(). The first edge where union() returns False is redundant!"
      ],
      "starterCode": "def find_redundant_connection(edges: list[list[int]]) -> list[int]:\n    # TODO: Find edge causing cycle\n    pass",
      "solution": "def find_redundant_connection(edges: list[list[int]]) -> list[int]:\n    parent = list(range(len(edges) + 1))\n    def find(i):\n        if parent[i] != i:\n            parent[i] = find(parent[i])\n        return parent[i]\n    for u, v in edges:\n        root_u, root_v = find(u), find(v)\n        if root_u == root_v:\n            return [u, v]\n        parent[root_u] = root_v\n    return []"
    },
    "summary": {
      "keyTakeaways": [
        "DSU provides near-instant O(\\alpha(n)) connectivity queries and set unions.",
        "Path compression flattens trees; union-by-rank minimizes depth growth."
      ],
      "nextLessonId": "dsa-graph-bridges",
      "nextLessonTitle": "Bridges and Articulation Points",
      "nextLessonModuleId": "dsa-module-10"
    },
    "lineByLine": [
      {
        "line": 9,
        "lines": "9",
        "code": "self.parent[i] = self.find(self.parent[i])",
        "codeSnippet": "self.parent[i] = self.find(self.parent[i])",
        "explanation": "Path compression: recursively finds root and updates parent pointer directly to that root."
      },
      {
        "line": 24,
        "lines": "24",
        "code": "self.num_components -= 1",
        "codeSnippet": "self.num_components -= 1",
        "explanation": "Every successful union merges two components, decrementing total count."
      }
    ]
  },
  "dsa-graph-bridges": {
    "id": "dsa-graph-bridges",
    "moduleId": "dsa-module-10",
    "title": "Bridges and Articulation Points",
    "subtitle": "Tarjan's Bridge-Finding Algorithm, Discovery Times, and Low-Link Values in O(V + E)",
    "order": 13,
    "readTimeMinutes": 24,
    "difficulty": "Advanced",
    "visualizerType": "graph",
    "objectives": [
      "Define Bridges (critical edges whose removal disconnects the graph) and Articulation Points (cut vertices).",
      "Calculate discovery times tin[u] and low-link values low[u] in a single DFS pass.",
      "Formulate the bridge condition: low[v] > tin[u].",
      "Formulate the articulation point condition: low[v] >= tin[u] for non-root, and children > 1 for root."
    ],
    "prerequisites": [
      "Depth-First Search (DFS)",
      "Connected Components"
    ],
    "analogy": {
      "title": "The Sole Suspension Bridge to an Island City",
      "text": "A coastal city is connected to the mainland by five suspension bridges, but one residential island is connected by only a single bridge. If that single bridge collapses, the island is completely cut off from the mainland. That critical link is a bridge.",
      "metaphor": "A bridge is an edge whose removal increases the number of connected components."
    },
    "problemSolved": {
      "title": "Vulnerability Analysis in Mission-Critical Infrastructure",
      "description": "Testing whether removing each edge breaks connectivity naively takes O(E * (V + E)) = O(E²). Tarjan's algorithm identifies ALL bridges and articulation points in a single linear DFS pass in O(V + E) time.",
      "keyPoints": [
        "Finds all single-point failure edges and vertices in O(V + E).",
        "low[u] tracks earliest ancestor reachable via back-edges.",
        "Core technique for network reliability and power grid stability analysis."
      ]
    },
    "intuition": {
      "overview": "`tin[u]` is the timestamp when vertex u is first discovered. `low[u]` is the lowest `tin` reachable from u via its subtree and at most one back-edge. If neighbor v cannot reach u or any ancestor of u (`low[v] > tin[u]`), then edge (u, v) is a bridge!",
      "steps": [
        {
          "step": 1,
          "title": "Timestamp Tracking",
          "description": "tin[u] = low[u] = timer; timer++."
        },
        {
          "step": 2,
          "title": "Tree Edge Recursion",
          "description": "For neighbor v != parent: if unvisited: dfs(v); low[u] = min(low[u], low[v])."
        },
        {
          "step": 3,
          "title": "Bridge Check",
          "description": "If low[v] > tin[u]: (u, v) is a bridge!"
        },
        {
          "step": 4,
          "title": "Back-Edge Update",
          "description": "If v already visited and v != parent: low[u] = min(low[u], tin[v])."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let T be a DFS tree of undirected graph G. An edge (u, v) in T is a bridge if and only if no vertex in the subtree rooted at v has a back-edge to u or an ancestor of u, formalizing to low[v] > tin[u].",
      "latex": "\\text{Edge }(u, v) \\text{ is a Bridge } \\iff \\text{low}[v] > \\text{tin}[u]"
    },
    "complexity": {
      "overview": "Time: O(V + E) single DFS traversal. Space: O(V) for tin and low arrays.",
      "cases": [
        {
          "case": "Best",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Single linear DFS traversal."
        },
        {
          "case": "Average",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Visits each vertex and edge once."
        },
        {
          "case": "Worst",
          "time": "O(V + E)",
          "space": "O(V)",
          "explanation": "Dense graph."
        }
      ],
      "spaceNote": "O(V) memory for timestamps, low-link values, and recursion stack."
    },
    "workedExample": {
      "title": "Finding Bridge in 0-1-2 Triangle with pendant 3 attached to 1: (1, 3)",
      "input": "Edges: (0, 1), (1, 2), (2, 0), (1, 3)",
      "steps": [
        {
          "step": 1,
          "action": "DFS visits 0 -> 1 -> 2",
          "state": "tin: {0:0, 1:1, 2:2}",
          "explanation": "Back-edge (2, 0) gives low[2]=0, low[1]=0, low[0]=0."
        },
        {
          "step": 2,
          "action": "From 1, DFS visits 3",
          "state": "tin[3]=3, low[3]=3",
          "explanation": "Node 3 is a leaf."
        },
        {
          "step": 3,
          "action": "Evaluate edge (1, 3)",
          "state": "low[3] = 3 > tin[1] = 1",
          "explanation": "Condition low[3] > tin[1] holds! Edge (1, 3) is a BRIDGE."
        }
      ],
      "finalOutput": "Bridges found: [[1, 3]]"
    },
    "visualExplanation": {
      "title": "Low-Link Back-Edge Bypasses",
      "description": "Visualizing back-edges looping back over ancestors, lowering low-link values and disproving bridge status.",
      "features": [
        "Bridges highlighted in bright red",
        "Low-link values visualized alongside timestamps"
      ]
    },
    "pseudocode": {
      "title": "Tarjan's Bridge Algorithm",
      "code": "function findBridges(n, edges):\n    timer = 0\n    tin = array of size n with -1\n    low = array of size n with -1\n    bridges = []\n    function dfs(u, p):\n        tin[u] = low[u] = timer++\n        for v in graph[u]:\n            if v == p: continue\n            if tin[v] != -1:\n                low[u] = min(low[u], tin[v])\n            else:\n                dfs(v, u)\n                low[u] = min(low[u], low[v])\n                if low[v] > tin[u]:\n                    bridges.append([u, v])\n    for i in 0..n-1:\n        if tin[i] == -1: dfs(i, -1)\n    return bridges"
    },
    "pythonCode": {
      "title": "Python Critical Connections (Bridges) Implementation",
      "code": "def critical_connections(n: int, connections: list[list[int]]) -> list[list[int]]:\n    graph = [[] for _ in range(n)]\n    for u, v in connections:\n        graph[u].append(v)\n        graph[v].append(u)\n\n    tin = [-1] * n\n    low = [-1] * n\n    timer = 0\n    bridges = []\n\n    def dfs(u: int, parent: int):\n        nonlocal timer\n        tin[u] = low[u] = timer\n        timer += 1\n\n        for v in graph[u]:\n            if v == parent:\n                continue\n            if tin[v] != -1:\n                # Back-edge\n                low[u] = min(low[u], tin[v])\n            else:\n                # Forward tree edge\n                dfs(v, u)\n                low[u] = min(low[u], low[v])\n                if low[v] > tin[u]:\n                    bridges.append([u, v])\n\n    for i in range(n):\n        if tin[i] == -1:\n            dfs(i, -1)\n\n    return bridges",
      "explanation": "Tarjan's algorithm identifying all bridges in a single O(V + E) pass."
    },
    "runnableCode": {
      "code": "connections = [[0, 1], [1, 2], [2, 0], [1, 3]]\nprint(critical_connections(4, connections))",
      "expectedOutput": "[[1, 3]]"
    },
    "lineByLineExplanation": [
      {
        "line": 24,
        "lines": "24",
        "code": "low[u] = min(low[u], tin[v])",
        "codeSnippet": "low[u] = min(low[u], tin[v])",
        "explanation": "If neighbor is already visited, it is a back-edge; updates low[u] to the discovery time of the ancestor."
      },
      {
        "line": 29,
        "lines": "29",
        "code": "if low[v] > tin[u]: bridges.append([u, v])",
        "codeSnippet": "if low[v] > tin[u]: bridges.append([u, v])",
        "explanation": "The bridge condition: child v cannot reach u or any node discovered before u, meaning edge (u, v) is the sole bridge."
      }
    ],
    "edgeCases": [
      {
        "case": "Complete graph / cycle with no bridges",
        "handling": "All low[v] <= tin[u]; returns empty list [].",
        "example": "Triangle graph"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Updating low[u] with low[v] instead of tin[v] on back-edges",
        "solution": "On back-edges, you must use low[u] = min(low[u], tin[v]); using low[v] can inadvertently pull in back-edges from other subtrees.",
        "codeExample": "low[u] = min(low[u], tin[v])"
      }
    ],
    "applications": [
      {
        "industry": "Electrical Engineering",
        "application": "Power transmission grid single-point-of-failure analysis",
        "benefit": "Flags power transmission lines whose outage causes regional blackouts."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-br-1",
        "question": "How is the condition for an Articulation Point different from a Bridge?",
        "hint": "Look at the inequality and the root node special case.",
        "answer": "For non-root node u, child v satisfies low[v] >= tin[u]. For root node, it is an articulation point if it has > 1 child in the DFS tree."
      }
    ],
    "quiz": [
      {
        "id": "q-br-1",
        "question": "What condition identifies edge (u, v) as a bridge in Tarjan's algorithm?",
        "options": [
          "low[v] > tin[u]",
          "low[v] < tin[u]",
          "tin[v] == tin[u]",
          "low[v] == 0"
        ],
        "correctIndex": 0,
        "explanation": "If low[v] > tin[u], child v cannot reach u or any earlier ancestor through any other path, making (u, v) a critical bridge."
      }
    ],
    "codingChallenge": {
      "title": "Critical Connections in a Network",
      "problem": "Given n servers and a list of connection cables, return all critical connections (bridges) whose removal would sever communication between servers.",
      "hints": [
        "Direct implementation of Tarjan's Bridge Finding algorithm."
      ],
      "starterCode": "def critical_connections(n: int, connections: list[list[int]]) -> list[list[int]]:\n    # TODO: Find critical connections\n    pass",
      "solution": "def critical_connections(n: int, connections: list[list[int]]) -> list[list[int]]:\n    graph = [[] for _ in range(n)]\n    for u, v in connections:\n        graph[u].append(v)\n        graph[v].append(u)\n    tin = [-1] * n\n    low = [-1] * n\n    timer = 0\n    bridges = []\n    def dfs(u, p):\n        nonlocal timer\n        tin[u] = low[u] = timer\n        timer += 1\n        for v in graph[u]:\n            if v == p: continue\n            if tin[v] != -1:\n                low[u] = min(low[u], tin[v])\n            else:\n                dfs(v, u)\n                low[u] = min(low[u], low[v])\n                if low[v] > tin[u]:\n                    bridges.append([u, v])\n    for i in range(n):\n        if tin[i] == -1: dfs(i, -1)\n    return bridges"
    },
    "summary": {
      "keyTakeaways": [
        "Bridges and articulation points are identified in a single O(V + E) DFS pass.",
        "Edge (u, v) is a bridge if low[v] > tin[u]."
      ],
      "nextLessonId": "dsa-greedy-strategy",
      "nextLessonTitle": "Greedy Strategy and Correctness Intuition",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 24,
        "lines": "24",
        "code": "low[u] = min(low[u], tin[v])",
        "codeSnippet": "low[u] = min(low[u], tin[v])",
        "explanation": "If neighbor is already visited, it is a back-edge; updates low[u] to the discovery time of the ancestor."
      },
      {
        "line": 29,
        "lines": "29",
        "code": "if low[v] > tin[u]: bridges.append([u, v])",
        "codeSnippet": "if low[v] > tin[u]: bridges.append([u, v])",
        "explanation": "The bridge condition: child v cannot reach u or any node discovered before u, meaning edge (u, v) is the sole bridge."
      }
    ]
  }
};
