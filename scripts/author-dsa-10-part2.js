const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m10 = getExistingDSALessons(10);
const m10Lessons = { ...m10.lessons };

m10Lessons['dsa-graph-cycle-detection'] = {
  id: 'dsa-graph-cycle-detection',
  moduleId: 'dsa-module-10',
  title: 'Cycle Detection in Graphs',
  subtitle: 'Back-Edges, Recursion Call Stacks, and Three-Color State Modeling',
  order: 5,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'graph',
  objectives: [
    'Detect cycles in undirected graphs using parent tracking during DFS/BFS.',
    'Detect cycles in directed graphs using 3-color states (White, Gray, Black).',
    'Understand why undirected parent checks do not work for directed graphs.',
    'Apply Union-Find for instant cycle detection in undirected edge streams.'
  ],
  prerequisites: ['Depth-First Search (DFS)', 'Connected Components'],
  analogy: {
    title: 'The Circular Escape Route',
    text: 'A courier following directions from street to street looks down at their GPS and notices they have just been instructed to turn onto a street they were on 3 turns ago. Seeing an ancestor street currently in their route history confirms they are trapped driving in a loop.',
    metaphor: 'Encountering a node currently active on the recursion stack proves a cycle exists.'
  },
  problemSolved: {
    title: 'Deadlock Detection and Dependency Validation',
    description: 'Circular dependencies cause infinite build loops in software build tools (make/gradle) and deadlocks in database transaction systems. Cycle detection identifies circularity in O(V + E) time before deadlocks freeze the system.',
    keyPoints: [
      'Undirected: Back-edge to any visited node other than immediate parent = cycle.',
      'Directed: 3-color DFS (Gray = currently on call stack = cycle).',
      'Underpins build pipeline validation and operating system deadlock avoidance.'
    ]
  },
  intuition: {
    overview: 'In directed graphs, label nodes: 0 (White/unvisited), 1 (Gray/visiting on stack), 2 (Black/completely visited). If we encounter a Gray neighbor during DFS, a back-edge exists, confirming a cycle!',
    steps: [
      { step: 1, title: 'State 1 (Visiting)', description: 'color[u] = 1 (on current recursion stack).' },
      { step: 2, title: 'Gray Neighbor Check', description: 'For v in graph[u]: if color[v] == 1, cycle found! If color[v] == 0, recurse dfs(v).' },
      { step: 3, title: 'State 2 (Visited)', description: 'color[u] = 2 (fully explored, popped off stack).' }
    ]
  },
  formalDefinition: {
    text: 'A directed graph G has a cycle if and only if a depth-first search of G yields at least one back-edge (u, v) where v is an ancestor of u in the DFS tree.',
    latex: '(u, v) \\in E \\land \\text{color}(v) = \\text{GRAY} \\iff \\text{G contains a directed cycle}'
  },
  complexity: {
    overview: 'Time: O(V + E) single pass. Space: O(V) for color tracking array.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(V)', explanation: 'Self-loop at root detected immediately.' },
      { case: 'Average', time: 'O(V + E)', space: 'O(V)', explanation: 'Visits nodes until cycle is found or graph exhausted.' },
      { case: 'Worst', time: 'O(V + E)', space: 'O(V)', explanation: 'Acyclic graph requires complete scan.' }
    ],
    spaceNote: 'O(V) recursion stack and color array.'
  },
  workedExample: {
    title: '3-Color Cycle Check on 0 -> 1 -> 2 -> 0',
    input: 'Edges: (0, 1), (1, 2), (2, 0)',
    steps: [
      { step: 1, action: 'Visit 0', state: 'color[0]=GRAY', explanation: 'Node 0 added to call stack.' },
      { step: 2, action: 'Visit 1', state: 'color[1]=GRAY', explanation: 'Node 1 added to call stack.' },
      { step: 3, action: 'Visit 2', state: 'color[2]=GRAY', explanation: 'Node 2 added to call stack.' },
      { step: 4, action: 'From 2, examine edge to 0', state: 'color[0] is GRAY!', explanation: 'Edge connects to ancestor on active stack -> CYCLE DETECTED!' }
    ],
    finalOutput: 'True (Graph contains a directed cycle)'
  },
  visualExplanation: {
    title: '3-Color State Transition',
    description: 'Visualizing White nodes turning Yellow/Gray during exploration, and Red upon cycle collision.',
    features: ['Gray node represents active branch', 'Back-edge pointing to Gray node flags cycle']
  },
  pseudocode: {
    title: 'Directed Graph Cycle Detection (3-Color)',
    code: `function hasCycle(n, edges):
    graph = buildGraph(n, edges)
    # 0 = White, 1 = Gray, 2 = Black
    color = array of size n with 0
    function dfs(u):
        color[u] = 1 # visiting
        for v in graph[u]:
            if color[v] == 1: return True
            if color[v] == 0 and dfs(v): return True
        color[u] = 2 # visited
        return False
    for i in 0..n-1:
        if color[i] == 0 and dfs(i): return True
    return False`
  },
  pythonCode: {
    title: 'Python Cycle Detection Implementations',
    code: `def has_cycle_directed(n: int, edges: list[list[int]]) -> bool:
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        
    # 0: White (unvisited), 1: Gray (visiting), 2: Black (visited)
    color = [0] * n

    def dfs(u: int) -> bool:
        color[u] = 1 # Mark on call stack
        for v in graph[u]:
            if color[v] == 1:
                return True # Back-edge to ancestor!
            if color[v] == 0:
                if dfs(v):
                    return True
        color[u] = 2 # Completed
        return False

    for i in range(n):
        if color[i] == 0:
            if dfs(i):
                return True
    return False

def has_cycle_undirected(n: int, edges: list[list[int]]) -> bool:
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
        
    visited = [False] * n

    def dfs(u: int, parent: int) -> bool:
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                if dfs(v, u): return True
            elif v != parent:
                return True # Visited neighbor that is NOT parent is a cycle
        return False

    for i in range(n):
        if not visited[i]:
            if dfs(i, -1): return True
    return False`,
    explanation: '3-color DFS for directed graphs and parent-tracking DFS for undirected graphs.'
  },
  runnableCode: {
    code: `print(has_cycle_directed(3, [[0, 1], [1, 2], [2, 0]])) # True
print(has_cycle_directed(3, [[0, 1], [1, 2]]))         # False
print(has_cycle_undirected(3, [[0, 1], [1, 2], [2, 0]])) # True`,
    expectedOutput: `True\nFalse\nTrue`
  },
  lineByLineExplanation: [
    { line: 12, code: 'if color[v] == 1: return True', explanation: 'If neighbor is Gray (currently active on the call stack), we have circled back to an ancestor: cycle detected!' },
    { line: 16, code: 'color[u] = 2', explanation: 'Marks vertex as Black once all outgoing paths have been fully verified with no cycle.' }
  ],
  edgeCases: [
    { case: 'Cross edges in directed graphs', handling: 'Black nodes (color 2) are safe; seeing a Black neighbor is NOT a cycle.', example: 'Diamond graph: 0->1->3, 0->2->3' }
  ],
  commonMistakes: [
    { mistake: 'Using a simple visited set for directed graphs without unmarking', solution: 'A simple visited set treats cross-edges as cycles; you MUST distinguish between currently visiting (stack) and finished nodes (3 colors).', codeExample: '# White/Gray/Black handles cross-edges correctly' }
  ],
  applications: [
    { industry: 'Build Automation', application: 'Detecting circular import dependencies in JavaScript / Python', benefit: 'Prevents infinite build compiler loops.' }
  ],
  practiceQuestions: [
    { id: 'pq-cd-1', question: 'Why does Kahn\'s algorithm (topological sort via indegrees) detect cycles automatically?', hint: 'Consider indegrees of nodes in a cycle.', answer: 'Nodes in a cycle never have their in-degree drop to 0, so they never enter the BFS queue. If total processed nodes < n, a cycle exists.' }
  ],
  quiz: [
    { id: 'q-cd-1', question: 'In 3-color DFS, what does encountering a Gray neighbor signify?', options: ['A back-edge to an active call stack ancestor, proving a cycle exists', 'A cross-edge', 'A dead end', 'A leaf node'], correctIndex: 0, explanation: 'Gray indicates the node is currently in the active recursion call stack. Reaching it means the path loops back onto itself.' }
  ],
  codingChallenge: {
    title: 'Course Schedule (Can Finish All Courses)',
    problem: 'There are numCourses courses labeled 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates you must take course b before course a. Return True if you can finish all courses.',
    hints: ['Check if the directed dependency graph contains a cycle.'],
    starterCode: `def can_finish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    # TODO: Detect if course prerequisites have cycles
    pass`,
    solution: `def can_finish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    graph = [[] for _ in range(numCourses)]
    for dest, src in prerequisites:
        graph[src].append(dest)
    color = [0] * numCourses
    def dfs(u):
        color[u] = 1
        for v in graph[u]:
            if color[v] == 1: return True
            if color[v] == 0 and dfs(v): return True
        color[u] = 2
        return False
    for i in range(numCourses):
        if color[i] == 0 and dfs(i):
            return False # Cycle means cannot finish!
    return True`
  },
  summary: {
    keyTakeaways: ['Directed cycle detection requires 3-color states (White, Gray, Black).', 'Undirected cycle detection tracks immediate parent pointer.'],
    nextLessonId: 'dsa-graph-bipartite',
    nextLessonTitle: 'Bipartite Graphs',
    nextLessonModuleId: 'dsa-module-10'
  }
};

m10Lessons['dsa-graph-bipartite'] = {
  id: 'dsa-graph-bipartite',
  moduleId: 'dsa-module-10',
  title: 'Bipartite Graphs',
  subtitle: '2-Colorability, Odd-Length Cycle Invariants, and BFS/DFS Coloring',
  order: 6,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'graph',
  objectives: [
    'Define bipartite graphs: vertex sets U and V with all edges crossing between sets.',
    'Prove the fundamental theorem: A graph is bipartite if and only if it contains no odd-length cycles.',
    'Implement 2-coloring algorithms using BFS and DFS in O(V + E) time.',
    'Apply bipartite matching to job assignment and matching problems.'
  ],
  prerequisites: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)'],
  analogy: {
    title: 'Dividing Teams into Red and Blue Jerseys',
    text: 'A referee assigns team jerseys to a group of athletes. Two friends who have a rivalry must never wear the same color jersey. If the rivalry network allows coloring every player either Red or Blue such that every rivalry is Red vs Blue, the graph is bipartite.',
    metaphor: 'A graph is bipartite if you can color vertices with 2 colors without any monochromatic edge.'
  },
  problemSolved: {
    title: '2-Colorability and Stable Two-Set Partitioning',
    description: 'Determining if a network can be divided into two conflicting groups (e.g. buyers vs sellers, students vs internships, hostile factions) is solved in linear O(V + E) time via 2-coloring.',
    keyPoints: [
      '2-colorable: adjacent nodes must have alternating colors (0 and 1).',
      'Odd cycle = monochromatic edge = impossible to 2-color.',
      'Foundation for maximum bipartite matching (Hopcroft-Karp).'
    ]
  },
  intuition: {
    overview: 'Color start node 0. Color all its neighbors 1. Color their neighbors 0. If at any point a neighbor already has the SAME color as the current node, the graph is NOT bipartite.',
    steps: [
      { step: 1, title: 'Color Seed', description: 'color[start] = 0; enqueue(start)' },
      { step: 2, title: 'Alternate Color', description: 'For neighbor in graph[curr]: if uncolored, color[neighbor] = 1 - color[curr] and enqueue.' },
      { step: 3, title: 'Conflict Check', description: 'If color[neighbor] == color[curr], return False immediately.' }
    ]
  },
  formalDefinition: {
    text: 'A graph G = (V, E) is bipartite if V = V_1 \\cup V_2 with V_1 \\cap V_2 = \\emptyset such that every edge e \\in E has one endpoint in V_1 and one endpoint in V_2. Konig\'s Theorem: G is bipartite \\iff G has no odd cycles.',
    latex: '\\forall (u, v) \\in E, \\quad c(u) \\neq c(v) \\quad \\text{where } c: V \\to \\{0, 1\\}'
  },
  complexity: {
    overview: 'Time: O(V + E) single traversal. Space: O(V) color array.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(V)', explanation: 'Triangle detected at root.' },
      { case: 'Average', time: 'O(V + E)', space: 'O(V)', explanation: 'Linear 2-coloring scan.' },
      { case: 'Worst', time: 'O(V + E)', space: 'O(V)', explanation: 'Full bipartite graph verified.' }
    ],
    spaceNote: 'O(V) color storage array.'
  },
  workedExample: {
    title: 'Testing Triangle (Odd Cycle) vs Square (Even Cycle)',
    input: 'Triangle: (0,1), (1,2), (2,0) vs Square: (0,1), (1,2), (2,3), (3,0)',
    steps: [
      { step: 1, action: 'Triangle node 0', state: 'color[0]=Red', explanation: 'Neighbors 1 and 2 must be Blue.' },
      { step: 2, action: 'Triangle edge (1, 2)', state: '1 is Blue and 2 is Blue!', explanation: 'Edge connects two Blue nodes! Conflict -> NOT bipartite.' },
      { step: 3, action: 'Square nodes', state: '0=Red, 1=Blue, 2=Red, 3=Blue', explanation: 'All edges connect Red to Blue -> IS bipartite.' }
    ],
    finalOutput: 'Triangle = False, Square = True'
  },
  visualExplanation: {
    title: 'Two-Color Layer Alternation',
    description: 'Visualizing even levels in Red, odd levels in Blue, checking for horizontal cross-edges within the same level.',
    features: ['Red nodes only connect to Blue nodes', 'Monochromatic edge flashes red warning conflict']
  },
  pseudocode: {
    title: 'Is Graph Bipartite (BFS)',
    code: `function isBipartite(graph):
    color = array of size n filled with -1
    for i in 0..n-1:
        if color[i] == -1:
            color[i] = 0
            q = [i]
            while q:
                curr = q.pop()
                for v in graph[curr]:
                    if color[v] == -1:
                        color[v] = 1 - color[curr]
                        q.push(v)
                    elif color[v] == color[curr]:
                        return False
    return True`
  },
  pythonCode: {
    title: 'Python Is Graph Bipartite',
    code: `from collections import deque

def is_bipartite(graph: list[list[int]]) -> bool:
    n = len(graph)
    color = [-1] * n # -1: uncolored, 0: color A, 1: color B

    for i in range(n):
        if color[i] == -1:
            color[i] = 0
            q = deque([i])
            while q:
                curr = q.popleft()
                for neighbor in graph[curr]:
                    if color[neighbor] == -1:
                        color[neighbor] = 1 - color[curr]
                        q.append(neighbor)
                    elif color[neighbor] == color[curr]:
                        return False # Odd-length cycle conflict!
    return True`,
    explanation: 'Uses BFS with 0/1 alternating color assignment across all components.'
  },
  runnableCode: {
    code: `print(is_bipartite([[1, 3], [0, 2], [1, 3], [0, 2]])) # Square: True
print(is_bipartite([[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]])) # Odd cycle: False`,
    expectedOutput: `True\nFalse`
  },
  lineByLineExplanation: [
    { line: 15, code: 'color[neighbor] = 1 - color[curr]', explanation: 'Flips color between 0 and 1 using simple subtraction (1 - 0 = 1, 1 - 1 = 0).' },
    { line: 17, code: 'elif color[neighbor] == color[curr]: return False', explanation: 'If an adjacent neighbor already has the identical color, an odd-length cycle exists, proving graph is not bipartite.' }
  ],
  edgeCases: [
    { case: 'Disconnected graph with isolated vertices', handling: 'Outer loop iterates all vertices; isolated nodes color trivially.', example: 'n=3, graph=[[], [], []]' }
  ],
  commonMistakes: [
    { mistake: 'Stopping after exploring from node 0', solution: 'The graph may consist of multiple disconnected components; must loop over all vertices in range(n).', codeExample: 'for i in range(n): if color[i] == -1:' }
  ],
  applications: [
    { industry: 'E-Commerce', application: 'Recommendation systems (Users and Products)', benefit: 'Natural bipartite graph: users only connect to products they purchased.' }
  ],
  practiceQuestions: [
    { id: 'pq-bp-1', question: 'Does a tree have any odd-length cycles? Is every tree bipartite?', hint: 'Recall tree cycle properties.', answer: 'Trees are connected and acyclic (0 cycles). Because they have 0 odd-length cycles, EVERY tree is bipartite.' }
  ],
  quiz: [
    { id: 'q-bp-1', question: 'What structural property is necessary and sufficient for a graph to be bipartite?', options: ['The graph contains no odd-length cycles', 'The graph contains no cycles of any kind', 'The graph is planar', 'The number of vertices is even'], correctIndex: 0, explanation: 'By Konig\'s theorem, a graph is bipartite if and only if it contains no odd-length cycles.' }
  ],
  codingChallenge: {
    title: 'Possible Bipartition',
    problem: 'Given n people labeled 1 to n and a list of dislikes pairs, return True if we can split everyone into two groups such that no two people in the same group dislike each other.',
    hints: ['Model dislikes as edges and check if the resulting graph is bipartite.'],
    starterCode: `def possible_bipartition(n: int, dislikes: list[list[int]]) -> bool:
    # TODO: Check if dislikes graph is bipartite
    pass`,
    solution: `from collections import defaultdict, deque

def possible_bipartition(n: int, dislikes: list[list[int]]) -> bool:
    graph = defaultdict(list)
    for u, v in dislikes:
        graph[u].append(v)
        graph[v].append(u)
    color = {}
    for i in range(1, n + 1):
        if i not in color:
            color[i] = 0
            q = deque([i])
            while q:
                curr = q.popleft()
                for neighbor in graph[curr]:
                    if neighbor not in color:
                        color[neighbor] = 1 - color[curr]
                        q.append(neighbor)
                    elif color[neighbor] == color[curr]:
                        return False
    return True`
  },
  summary: {
    keyTakeaways: ['A graph is bipartite if and only if it contains no odd-length cycles.', 'Can be verified in O(V + E) time via 2-color BFS/DFS.'],
    nextLessonId: 'dsa-graph-topological-sort',
    nextLessonTitle: 'Topological Sorting',
    nextLessonModuleId: 'dsa-module-10'
  }
};

m10Lessons['dsa-graph-topological-sort'] = {
  id: 'dsa-graph-topological-sort',
  moduleId: 'dsa-module-10',
  title: 'Topological Sorting',
  subtitle: 'Kahn\'s In-Degree Algorithm and Post-Order DFS Ordering for DAGs',
  order: 7,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'graph',
  objectives: [
    'Define topological ordering for Directed Acyclic Graphs (DAGs).',
    'Implement Kahn\'s Algorithm using in-degrees and BFS queue in O(V + E).',
    'Implement DFS Post-Order Reversal topological sort in O(V + E).',
    'Detect cycles automatically when Kahn\'s queue empties with unprocessed vertices.'
  ],
  prerequisites: ['Cycle Detection in Graphs', 'Breadth-First Search (BFS)'],
  analogy: {
    title: 'College Course Prerequisites Roadmap',
    text: 'To take Advanced Machine Learning (CS 401), you must first take Linear Algebra (MATH 201) and Intro to Programming (CS 101). A topological sort orders all 40 college courses into a linear semester-by-semester schedule where every prerequisite course is completed before any class that depends on it.',
    metaphor: 'A linear ordering of vertices where every directed edge u -> v means u appears before v.'
  },
  problemSolved: {
    title: 'Dependency Resolution and Execution Scheduling',
    description: 'Build systems (Webpack, Make, Docker build stages) must execute tasks in valid dependency order. Topological sorting produces a valid serial execution sequence in O(V + E) time or proves a dependency cycle exists.',
    keyPoints: [
      'Only possible on Directed Acyclic Graphs (DAGs).',
      'Kahn\'s algorithm processes in-degree 0 nodes first.',
      'Detects circular dependencies if processed_count < V.'
    ]
  },
  intuition: {
    overview: 'Calculate in-degree for every vertex. Enqueue all vertices with in-degree 0 (no prerequisites). When popping node u, append to order and decrement in-degree of its neighbors. If neighbor reaches in-degree 0, enqueue it.',
    steps: [
      { step: 1, title: 'In-Degree Calculation', description: 'Compute in_degree[v] for all vertices.' },
      { step: 2, title: 'Queue In-Degree 0', description: 'Enqueue all vertices with in_degree == 0.' },
      { step: 3, title: 'Process and Decrement', description: 'Pop u, append to result. For v in graph[u]: in_degree[v]--; if in_degree[v] == 0: enqueue(v).' }
    ]
  },
  formalDefinition: {
    text: 'A topological sort of a DAG G = (V, E) is a linear ordering of V such that for every directed edge (u, v) \\in E, u comes before v in the ordering.',
    latex: '\\forall (u, v) \\in E, \\quad \\text{pos}(u) < \\text{pos}(v)'
  },
  complexity: {
    overview: 'Time: O(V + E). Space: O(V) for in-degree array and queue.',
    cases: [
      { case: 'Best', time: 'O(V + E)', space: 'O(V)', explanation: 'Optimal linear traversal.' },
      { case: 'Average', time: 'O(V + E)', space: 'O(V)', explanation: 'Touches each vertex and edge once.' },
      { case: 'Worst', time: 'O(V + E)', space: 'O(V)', explanation: 'Dense DAG.' }
    ],
    spaceNote: 'O(V) memory for in-degree array and queue.'
  },
  workedExample: {
    title: 'Topological Sort on 4-Node DAG: 0->1, 0->2, 1->3, 2->3',
    input: 'Edges: 0->1, 0->2, 1->3, 2->3',
    steps: [
      { step: 1, action: 'In-degrees', state: 'in_deg: {0:0, 1:1, 2:1, 3:2}', explanation: 'Node 0 has 0 dependencies.' },
      { step: 2, action: 'Enqueue 0, pop 0', state: 'Result=[0], decrement 1 and 2 -> in_deg={1:0, 2:0}', explanation: 'Nodes 1 and 2 now ready.' },
      { step: 3, action: 'Pop 1, then pop 2', state: 'Result=[0, 1, 2], decrement 3 twice -> in_deg={3:0}', explanation: 'Node 3 now ready.' },
      { step: 4, action: 'Pop 3', state: 'Result=[0, 1, 2, 3]', explanation: 'All 4 nodes processed.' }
    ],
    finalOutput: 'Valid Order: [0, 1, 2, 3]'
  },
  visualExplanation: {
    title: 'In-Degree Peeling Process',
    description: 'Visualizing nodes peeling off the graph as their incoming arrows vanish, settling into a linear pipeline.',
    features: ['In-degree 0 nodes highlighted in green', 'Removed edges free up downstream nodes']
  },
  pseudocode: {
    title: 'Kahn\'s Algorithm',
    code: `function topologicalSort(n, edges):
    in_degree = array of size n with 0
    graph = buildGraph(n, edges)
    for u, v in edges: in_degree[v] += 1
    q = Queue([i for i in 0..n-1 if in_degree[i] == 0])
    order = []
    while not q.isEmpty():
        u = q.pop()
        order.append(u)
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0: q.push(v)
    return order if len(order) == n else [] # cycle check`
  },
  pythonCode: {
    title: 'Python Topological Sort (Kahn\'s Algorithm)',
    code: `from collections import deque

def topological_sort(n: int, edges: list[list[int]]) -> list[int]:
    graph = [[] for _ in range(n)]
    in_degree = [0] * n
    
    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1
        
    q = deque([i for i in range(n) if in_degree[i] == 0])
    order = []
    
    while q:
        u = q.popleft()
        order.append(u)
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
                
    return order if len(order) == n else [] # Empty if cycle detected`,
    explanation: 'Uses in-degree peeling with BFS queue; returns empty list if cycle detected.'
  },
  runnableCode: {
    code: `print(topological_sort(4, [[0, 1], [0, 2], [1, 3], [2, 3]]))
print(topological_sort(2, [[0, 1], [1, 0]])) # Cycle!`,
    expectedOutput: `[0, 1, 2, 3]\n[]`
  },
  lineByLineExplanation: [
    { line: 9, code: 'in_degree[v] += 1', explanation: 'Counts number of incoming dependencies for each node.' },
    { line: 20, code: 'return order if len(order) == n else []', explanation: 'If cycle exists, nodes in cycle never reach in-degree 0, so len(order) < n.' }
  ],
  edgeCases: [
    { case: 'Graph contains cycles', handling: 'Returns [] because queue empties prematurely.', example: '0 -> 1 -> 0' }
  ],
  commonMistakes: [
    { mistake: 'Attempting topological sort on an undirected or cyclic graph', solution: 'Topological sort is strictly defined ONLY on DAGs; always verify len(order) == n.', codeExample: 'if len(order) != n: return []' }
  ],
  applications: [
    { industry: 'DevOps & CI/CD', application: 'Task graph execution ordering in Airflow, Luigi, and Make', benefit: 'Ensures data extraction finishes before transformation starts.' }
  ],
  practiceQuestions: [
    { id: 'pq-ts-1', question: 'How can you find the lexicographically smallest topological order?', hint: 'Replace the queue with a min-heap.', answer: 'Use a Min-Heap (priority queue) instead of a standard FIFO queue in Kahn\'s algorithm. At every step, the lowest-numbered ready node is popped.' }
  ],
  quiz: [
    { id: 'q-ts-1', question: 'What does it mean if Kahn\'s algorithm terminates with len(order) < n?', options: ['The graph contains at least one directed cycle', 'The graph is disconnected', 'The graph is a tree', 'The graph is bipartite'], correctIndex: 0, explanation: 'Vertices in a cycle depend on each other, so their in-degrees never reach 0 and they never enter the queue.' }
  ],
  codingChallenge: {
    title: 'Course Schedule II',
    problem: 'Return the ordering of courses you should take to finish all courses. If impossible, return an empty array.',
    hints: ['Apply Kahn\'s algorithm. If len(order) == numCourses return order, else return [].'],
    starterCode: `def find_order(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    # TODO: Find valid course schedule
    pass`,
    solution: `from collections import deque

def find_order(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    graph = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses
    for dest, src in prerequisites:
        graph[src].append(dest)
        in_degree[dest] += 1
    q = deque([i for i in range(numCourses) if in_degree[i] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
    return order if len(order) == numCourses else []`
  },
  summary: {
    keyTakeaways: ['Topological sort orders DAG tasks such that prerequisites precede dependents.', 'Kahn\'s algorithm uses in-degrees to discover valid execution order in O(V + E).'],
    nextLessonId: 'dsa-graph-dijkstra',
    nextLessonTitle: 'Dijkstra\'s Shortest Path Algorithm',
    nextLessonModuleId: 'dsa-module-10'
  }
};

m10Lessons['dsa-graph-dijkstra'] = {
  id: 'dsa-graph-dijkstra',
  moduleId: 'dsa-module-10',
  title: 'Dijkstra\'s Shortest Path Algorithm',
  subtitle: 'Single-Source Shortest Paths, Priority Queues, and the Non-Negative Edge Invariant',
  order: 8,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'graph',
  objectives: [
    'Compute shortest paths from a source to all vertices in non-negative weighted graphs.',
    'Implement the relaxation condition: dist[v] = min(dist[v], dist[u] + weight).',
    'Utilize a Min-Heap priority queue to achieve O((V + E) log V) time.',
    'Explain why Dijkstra fails on graphs containing negative edge weights.'
  ],
  prerequisites: ['Priority Queue Applications', 'Graph Representation: Adjacency List and Matrix'],
  analogy: {
    title: 'Water Flooding an Uneven Pipe Network',
    text: 'Imagine a network of dry pipes connecting water basins. Water is poured into the source basin and flows through pipes at rates proportional to their lengths (weights). The first time water reaches any basin, that wavefront traveled along the shortest possible time path.',
    metaphor: 'Dijkstra greedily locks in shortest distances in order of increasing path length.'
  },
  problemSolved: {
    title: 'Finding Optimal Routing in Weighted Networks',
    description: 'Unweighted graphs find shortest paths via BFS in O(V + E). When edges have varied traversal times/costs (weights), BFS fails. Dijkstra\'s algorithm generalizes BFS using a min-heap to guarantee optimal routes in O((V + E) log V).',
    keyPoints: [
      'Finds shortest paths from single source to all vertices.',
      'Greedy choice property guarantees locked nodes are optimal.',
      'Core routing engine of Google Maps, OSPF, and GPS navigators.'
    ]
  },
  intuition: {
    overview: 'Initialize dist[start] = 0, all others inf. Push (0, start) to Min-Heap. Pop vertex u with minimum distance. For each neighbor v: if dist[u] + weight < dist[v], update dist[v] and push (dist[v], v) to heap.',
    steps: [
      { step: 1, title: 'Extract Min', description: 'Pop (d, u) from heap. If d > dist[u], continue (stale entry).' },
      { step: 2, title: 'Relax Neighbors', description: 'For (v, w) in graph[u]: if dist[u] + w < dist[v]: dist[v] = dist[u] + w; push (dist[v], v).' },
      { step: 3, title: 'Termination', description: 'Terminates when heap is empty; dist array holds all shortest distances.' }
    ]
  },
  formalDefinition: {
    text: 'Let G = (V, E, w) have non-negative weights w(u, v) \\ge 0. Triangle inequality: \\delta(s, v) \\le \\delta(s, u) + w(u, v). Edge relaxation sets dist[v] = \\min(dist[v], dist[u] + w(u, v)).',
    latex: 'T_{\\text{Dijkstra}} = \\mathcal{O}\\big((|V| + |E|) \\log |V|\\big), \\quad \\text{Space} = \\mathcal{O}(|V| + |E|)'
  },
  complexity: {
    overview: 'Time: O((V + E) log V) using binary heap. Space: O(V + E).',
    cases: [
      { case: 'Best', time: 'O(E log V)', space: 'O(V + E)', explanation: 'Single-source query.' },
      { case: 'Average', time: 'O((V + E) log V)', space: 'O(V + E)', explanation: 'Each edge relaxed at most once.' },
      { case: 'Worst', time: 'O((V + E) log V)', space: 'O(V + E)', explanation: 'Dense graph with heap pushes.' }
    ],
    spaceNote: 'O(V) distance table and O(E) heap entries.'
  },
  workedExample: {
    title: 'Shortest Path from A in: A-(1)->B, A-(4)->C, B-(2)->C',
    input: 'Start=A. Edges: (A,B,1), (A,C,4), (B,C,2)',
    steps: [
      { step: 1, action: 'Pop A (dist=0)', state: 'Relax B: dist[B]=1; Relax C: dist[C]=4', explanation: 'Heap holds [(1, B), (4, C)].' },
      { step: 2, action: 'Pop B (dist=1)', state: 'Relax C via B: 1 + 2 = 3 < 4 -> dist[C]=3', explanation: 'Better path to C found via B!' },
      { step: 3, action: 'Pop C (dist=3)', state: 'No more outgoing edges', explanation: 'Shortest path to C locked at 3.' }
    ],
    finalOutput: 'dist = {A: 0, B: 1, C: 3}'
  },
  visualExplanation: {
    title: 'Dijkstra Metric Radial Flood',
    description: 'Visualizing expanding concentric distance contours locking nodes in green as optimal.',
    features: ['Min-heap priority queue table on right', 'Relaxation arrows flash yellow when distance improves']
  },
  pseudocode: {
    title: 'Dijkstra\'s Algorithm',
    code: `function dijkstra(n, graph, start):
    dist = array of size n with infinity
    dist[start] = 0
    pq = PriorityQueue([(0, start)])
    while not pq.isEmpty():
        d, u = pq.pop()
        if d > dist[u]: continue # stale
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                pq.push((dist[v], v))
    return dist`
  },
  pythonCode: {
    title: 'Python Dijkstra Implementation',
    code: `import heapq

def dijkstra(n: int, edges: list[list[int]], start: int) -> list[float]:
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        graph[u].append((v, w))
        
    dist = [float('inf')] * n
    dist[start] = 0
    pq = [(0, start)] # (distance, vertex)
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue # Stale duplicate entry
            
        for v, weight in graph[u]:
            new_dist = dist[u] + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))
                
    return dist`,
    explanation: 'Uses heapq with lazy deletion (skipping stale entries where d > dist[u]).'
  },
  runnableCode: {
    code: `edges = [[0, 1, 1], [0, 2, 4], [1, 2, 2]]
print(dijkstra(3, edges, 0))`,
    expectedOutput: `[0, 1, 3]`
  },
  lineByLineExplanation: [
    { line: 15, code: 'if d > dist[u]: continue', explanation: 'Critical performance optimization: skips outdated entries without needing expensive decrease-key operations.' },
    { line: 18, code: 'if new_dist < dist[v]:', explanation: 'Edge relaxation: updates distance if a shorter path to v is discovered through u.' }
  ],
  edgeCases: [
    { case: 'Unreachable nodes', handling: 'Distance remains float("inf").', example: 'Disconnected component' }
  ],
  commonMistakes: [
    { mistake: 'Using Dijkstra on graphs with negative edge weights', solution: 'Dijkstra assumes locked nodes can never improve; negative weights violate this greedy invariant. Use Bellman-Ford for negative weights.', codeExample: '# Negative weights require Bellman-Ford!' }
  ],
  applications: [
    { industry: 'Transportation & Logistics', application: 'GPS route planning in navigation apps (Google Maps)', benefit: 'Finds fastest drive time taking speed limits and traffic into account.' }
  ],
  practiceQuestions: [
    { id: 'pq-djk-1', question: 'How can you reconstruct the actual shortest PATH of vertices, not just the distance?', hint: 'Track a parent array.', answer: 'Maintain a parent array parent = [-1] * n. Whenever dist[v] is relaxed via u, set parent[v] = u. Backtrack from target to start.' }
  ],
  quiz: [
    { id: 'q-djk-1', question: 'Why does Dijkstra\'s algorithm fail on graphs with negative edge weights?', options: ['Its greedy choice assumes that once a node is popped from the heap, its distance is finalized and can never decrease', 'Negative numbers cause heap overflow', 'Python heapq cannot store negative numbers', 'It only works on trees'], correctIndex: 0, explanation: 'A future negative edge could reduce the path distance to an already "locked" node, breaking Dijkstra\'s greedy correctness proof.' }
  ],
  codingChallenge: {
    title: 'Network Delay Time',
    problem: 'You are given a network of n nodes and times list of directed edges with travel times. Return the minimum time for all nodes to receive a signal from node k, or -1 if impossible.',
    hints: ['Run Dijkstra from node k; the answer is max(dist). If any node is unreachable (inf), return -1.'],
    starterCode: `import heapq

def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    # TODO: Calculate network delay time
    pass`,
    solution: `import heapq

def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    graph = [[] for _ in range(n + 1)]
    for u, v, w in times:
        graph[u].append((v, w))
    dist = [float('inf')] * (n + 1)
    dist[k] = 0
    pq = [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    max_time = max(dist[1:])
    return max_time if max_time != float('inf') else -1`
  },
  summary: {
    keyTakeaways: ['Dijkstra finds single-source shortest paths in O((V + E) log V).', 'Strictly requires non-negative edge weights.'],
    nextLessonId: 'dsa-graph-bellman-ford',
    nextLessonTitle: 'Bellman-Ford Algorithm',
    nextLessonModuleId: 'dsa-module-10'
  }
};

m10Lessons['dsa-graph-bellman-ford'] = {
  id: 'dsa-graph-bellman-ford',
  moduleId: 'dsa-module-10',
  title: 'Bellman-Ford Algorithm',
  subtitle: 'Negative Edge Weights, Negative Cycle Detection, and Dynamic Programming Relaxation',
  order: 9,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'graph',
  objectives: [
    'Handle graphs with negative edge weights where Dijkstra fails.',
    'Relax all E edges V - 1 times in dynamic programming passes.',
    'Detect negative-weight cycles during an optional V-th relaxation pass.',
    'Understand why V - 1 iterations are sufficient for any simple path.'
  ],
  prerequisites: ['Dijkstra\'s Shortest Path Algorithm'],
  analogy: {
    title: 'Currency Arbitrage in Foreign Exchange',
    text: 'A financial trader converts USD to EUR, then EUR to JPY, then JPY back to USD. If exchange rates create a loop where 1 dollar becomes 1.05 dollars, running this loop infinitely generates infinite money. In graph theory, this is a negative weight cycle (multiplying exchange rates converts to log-sum distances).',
    metaphor: 'Bellman-Ford detects loops where total edge cost is negative, causing infinite descent.'
  },
  problemSolved: {
    title: 'Shortest Paths with Negative Weights & Arbitrage Detection',
    description: 'Dijkstra breaks on negative edges. Bellman-Ford correctly handles negative edge weights in O(V * E) time and flags negative cycles where shortest path is undefined (-infinity).',
    keyPoints: [
      'Operates correctly with negative edge weights.',
      'Detects reachable negative weight cycles on V-th pass.',
      'Underlies RIP (Routing Information Protocol) distance-vector routing.'
    ]
  },
  intuition: {
    overview: 'A shortest path in a graph with V vertices contains at most V - 1 edges. Therefore, relaxing every edge V - 1 times guarantees all shortest paths propagate. If any edge can still relax on pass V, a negative cycle exists.',
    steps: [
      { step: 1, title: 'Initialize', description: 'dist[start] = 0, all others inf.' },
      { step: 2, title: 'Relax V - 1 Times', description: 'For i from 1 to V - 1: for each (u, v, w) in edges: dist[v] = min(dist[v], dist[u] + w).' },
      { step: 3, title: 'Check Negative Cycle', description: 'Run 1 more relaxation pass. If any dist[u] + w < dist[v], a negative cycle exists!' }
    ]
  },
  formalDefinition: {
    text: 'Let G = (V, E) be a weighted directed graph. Bellman-Ford solves the DP recurrence d_k(v) = \\min(d_{k-1}(v), \\min_{(u, v) \\in E} \\{d_{k-1}(u) + w(u, v)\\}). If d_V(v) < d_{V-1}(v), a negative cycle is reachable.',
    latex: 'T_{\\text{Bellman-Ford}} = \\mathcal{O}(|V| \\cdot |E|), \\quad \\text{Space} = \\mathcal{O}(|V|)'
  },
  complexity: {
    overview: 'Time: O(V * E). Space: O(V) for distance table.',
    cases: [
      { case: 'Best', time: 'O(E)', space: 'O(V)', explanation: 'Stops early if no distances change during a pass.' },
      { case: 'Average', time: 'O(V * E)', space: 'O(V)', explanation: 'Standard relaxation passes.' },
      { case: 'Worst', time: 'O(V * E)', space: 'O(V)', explanation: 'Path of length V - 1 relaxed in reverse order.' }
    ],
    spaceNote: 'O(V) memory for distance array.'
  },
  workedExample: {
    title: 'Detecting Negative Cycle 1 -> 2 -> 1 with weight -1',
    input: 'Edges: (0, 1, 1), (1, 2, 2), (2, 1, -3), start=0',
    steps: [
      { step: 1, action: 'Pass 1', state: 'dist: [0, 1, 3]', explanation: 'Reaches nodes.' },
      { step: 2, action: 'Pass 2', state: 'dist[1] improves: 3 + (-3) = 0 < 1 -> dist=[0, 0, 2]', explanation: 'Cycle reduces cost.' },
      { step: 3, action: 'Pass V (check)', state: 'dist still decreases indefinitely', explanation: 'Negative Cycle Detected!' }
    ],
    finalOutput: 'Negative Cycle Exists'
  },
  visualExplanation: {
    title: 'Iterative Distance Waves',
    description: 'Visualizing waves of relaxation spreading across edges, with negative cycle flashing red.',
    features: ['V-1 passes guarantee propagation', 'V-th pass detects persistent decrease']
  },
  pseudocode: {
    title: 'Bellman-Ford Algorithm',
    code: `function bellmanFord(V, edges, start):
    dist = array of size V with infinity
    dist[start] = 0
    for i from 1 to V - 1:
        for u, v, w in edges:
            if dist[u] != infinity and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    # Check negative cycle
    for u, v, w in edges:
        if dist[u] != infinity and dist[u] + w < dist[v]:
            return "Negative Cycle Detected"
    return dist`
  },
  pythonCode: {
    title: 'Python Bellman-Ford Implementation',
    code: `def bellman_ford(v: int, edges: list[list[int]], start: int) -> tuple[list[float], bool]:
    dist = [float('inf')] * v
    dist[start] = 0

    # Relax V - 1 times
    for _ in range(v - 1):
        updated = False
        for u, dest, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[dest]:
                dist[dest] = dist[u] + w
                updated = True
        if not updated:
            break # Early termination optimization!

    # Check for negative cycle
    has_negative_cycle = False
    for u, dest, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[dest]:
            has_negative_cycle = True
            break

    return dist, has_negative_cycle`,
    explanation: 'Iteratively relaxes all edges V-1 times with early break and negative cycle check.'
  },
  runnableCode: {
    code: `edges = [[0, 1, 4], [0, 2, 5], [1, 2, -3]]
dist, neg_cycle = bellman_ford(3, edges, 0)
print(f"Distances: {dist}, Negative Cycle: {neg_cycle}")`,
    expectedOutput: `Distances: [0, 4, 1], Negative Cycle: False`
  },
  lineByLineExplanation: [
    { line: 7, code: 'for _ in range(v - 1):', explanation: 'Runs V - 1 passes because any simple path in a graph of V vertices has at most V - 1 edges.' },
    { line: 17, code: 'if dist[u] != float("inf") and dist[u] + w < dist[dest]:', explanation: 'If any distance can still be decreased on the V-th pass, a negative cycle exists.' }
  ],
  edgeCases: [
    { case: 'Disconnected negative cycle', handling: 'If cycle is not reachable from start (dist is inf), it is ignored; only reachable cycles are flagged.', example: 'Cycle in unreachable component' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting to check dist[u] != float("inf")', solution: 'In Python, inf + (-5) = inf, but in languages with overflow it wraps around; always guard dist[u] != inf.', codeExample: 'if dist[u] != float("inf"):' }
  ],
  applications: [
    { industry: 'Networking', application: 'Distance-Vector Routing (RIP protocol)', benefit: 'Routers periodically exchange vector distance tables with neighbors.' }
  ],
  practiceQuestions: [
    { id: 'pq-bf-1', question: 'How can Bellman-Ford detect currency arbitrage in Forex markets?', hint: 'Take negative logarithm of exchange rates.', answer: 'Transform exchange rates r by taking -log(r). Multiplying rates becomes adding logs; an arbitrage cycle where product > 1 becomes a negative-sum cycle where sum < 0.' }
  ],
  quiz: [
    { id: 'q-bf-1', question: 'Why are V - 1 relaxation iterations sufficient in Bellman-Ford?', options: ['The longest simple path in a graph with V vertices contains at most V - 1 edges', 'V - 1 is the number of edges in a tree', 'Heaps require V - 1 operations', 'It matches CPU cache lines'], correctIndex: 0, explanation: 'A path with no cycles visits each vertex at most once, which requires at most V - 1 edges.' }
  ],
  codingChallenge: {
    title: 'Cheapest Flights Within K Stops',
    problem: 'Find the cheapest price from src to dst with at most k stops. If no such route exists, return -1.',
    hints: ['Run Bellman-Ford for exactly k + 1 iterations, using a clone of previous distances to avoid multi-edge hops in one turn.'],
    starterCode: `def find_cheapest_price(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    # TODO: Implement bounded Bellman-Ford
    pass`,
    solution: `def find_cheapest_price(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    dist = [float('inf')] * n
    dist[src] = 0
    for _ in range(k + 1):
        tmp = list(dist)
        for u, v, w in flights:
            if dist[u] != float('inf') and dist[u] + w < tmp[v]:
                tmp[v] = dist[u] + w
        dist = tmp
    return dist[dst] if dist[dst] != float('inf') else -1`
  },
  summary: {
    keyTakeaways: ['Bellman-Ford handles negative weights and detects negative cycles in O(V * E).', 'Relax edges V - 1 times; pass V checks for negative cycles.'],
    nextLessonId: 'dsa-graph-floyd-warshall',
    nextLessonTitle: 'Floyd-Warshall: All-Pairs Shortest Path',
    nextLessonModuleId: 'dsa-module-10'
  }
};

const dsa10Part2Path = path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-10.ts');
writeModuleFile(dsa10Part2Path, m10.data, m10Lessons);
console.log('Module 10 Part 2 authored: ' + Object.keys(m10Lessons).length);
