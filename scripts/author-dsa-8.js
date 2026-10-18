const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m8 = getExistingDSALessons(8);
const m8Lessons = { ...m8.lessons };

m8Lessons['dsa-tree-terminology'] = {
  id: 'dsa-tree-terminology',
  moduleId: 'dsa-module-8',
  title: 'Tree Terminology and Representation',
  subtitle: 'Hierarchical Graphs, Rooted Trees, and Pointer vs Array Storage',
  order: 1,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'tree',
  objectives: [
    'Define tree components: root, node, parent, child, sibling, leaf, and subtree.',
    'Differentiate between node depth, node height, and tree height.',
    'Implement node-based linked representations (TreeNode with val, left, right).',
    'Understand array-based implicit representations for complete binary trees.'
  ],
  prerequisites: ['Linked Lists', 'DSA Foundations: Recursion'],
  analogy: {
    title: 'An Organizational Hierarchy Chart',
    text: 'In a company org chart, the CEO sits at the very top (the root). Vice Presidents report to the CEO (children), directors report to VPs, and individual contributors with no direct reports sit at the bottom (leaves). Each VP leads their own department (subtree).',
    metaphor: 'A tree is a connected acyclic graph with a single root and directed hierarchy.'
  },
  problemSolved: {
    title: 'Organizing Hierarchical and Non-Linear Data',
    description: 'Arrays and linked lists are strictly linear. Real-world systems—such as file directory paths, DOM document structures, and database indexes—are naturally hierarchical. Trees model parent-child relationships with logarithmic depth.',
    keyPoints: [
      'Connected acyclic graph with n vertices and exactly n - 1 edges.',
      'Unique simple path between any pair of nodes.',
      'Foundation for search trees, heaps, tries, and parse trees.'
    ]
  },
  intuition: {
    overview: 'A binary tree node contains a value and two pointers: left child and right child. A leaf node has both child pointers set to null/None.',
    steps: [
      { step: 1, title: 'Node Definition', description: 'Class TreeNode with self.val, self.left, and self.right.' },
      { step: 2, title: 'Recursive Structure', description: 'Every non-empty node is itself the root of its own left and right subtrees.' },
      { step: 3, title: 'Base Termination', description: 'Recursive traversals terminate when node is None.' }
    ]
  },
  formalDefinition: {
    text: 'A rooted tree T = (V, E) is a directed acyclic graph where one vertex r \\in V has in-degree 0 (the root), and every other vertex v \\in V \\setminus \\{r\\} has in-degree 1. In a binary tree, out-degree(v) \\le 2 for all v.',
    latex: '|E| = |V| - 1, \\quad \\text{Height}(T) = \\max_{v \\in V} \\text{depth}(v)'
  },
  complexity: {
    overview: 'Traversing an entire tree of n nodes takes O(n) time and O(h) call stack space.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(log n)', explanation: 'Balanced tree with height h = log2(n).' },
      { case: 'Average', time: 'O(n)', space: 'O(log n)', explanation: 'Random tree balance.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Degenerate skewed tree resembling a linked list.' }
    ],
    spaceNote: 'O(h) call stack memory where h is the tree height.'
  },
  workedExample: {
    title: 'Inspecting a Binary Tree Structure',
    input: 'Tree: [1, 2, 3, None, None, 4, 5]',
    steps: [
      { step: 1, action: 'Root node', state: 'Node 1 (depth=0, height=2)', explanation: 'Children are 2 and 3.' },
      { step: 2, action: 'Left child', state: 'Node 2 (leaf, depth=1, height=0)', explanation: 'No children.' },
      { step: 3, action: 'Right child', state: 'Node 3 (depth=1, height=1)', explanation: 'Children are 4 and 5.' },
      { step: 4, action: 'Leaves', state: 'Nodes 2, 4, 5', explanation: 'All have left=None and right=None.' }
    ],
    finalOutput: 'Total nodes = 5, Tree Height = 2, Leaves = 3'
  },
  visualExplanation: {
    title: 'Hierarchical Node Tree Layout',
    description: 'Visualizing root at top level, branching downward to left and right child nodes.',
    features: ['Root node highlighted at apex', 'Branches connect parents to children']
  },
  pseudocode: {
    title: 'TreeNode Definition & Size Calculation',
    code: `class TreeNode:
    val
    left = null
    right = null

function countNodes(root):
    if root is null:
        return 0
    return 1 + countNodes(root.left) + countNodes(root.right)`
  },
  pythonCode: {
    title: 'Python TreeNode Class & Metrics',
    code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def count_nodes(root: TreeNode | None) -> int:
    if not root:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)

def tree_height(root: TreeNode | None) -> int:
    if not root:
        return -1 # -1 for edge height, or 0 for node height
    return 1 + max(tree_height(root.left), tree_height(root.right))`,
    explanation: 'Fundamental recursive metrics counting nodes and calculating maximum tree depth.'
  },
  runnableCode: {
    code: `root = TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4), TreeNode(5)))
print(count_nodes(root))
print(tree_height(root))`,
    expectedOutput: `5\n2`
  },
  lineByLineExplanation: [
    { line: 8, code: 'if not root: return 0', explanation: 'Base case: empty node contributes 0 to count.' },
    { line: 10, code: 'return 1 + count_nodes(root.left) + count_nodes(root.right)', explanation: 'Recursively sums left and right subtrees plus 1 for the current node.' }
  ],
  edgeCases: [
    { case: 'Empty tree (root is None)', handling: 'Returns count = 0, height = -1 safely.', example: 'root = None' },
    { case: 'Single node tree', handling: 'Returns count = 1, height = 0.', example: 'TreeNode(10)' }
  ],
  commonMistakes: [
    { mistake: 'Confusing Node Depth with Node Height', solution: 'Depth is distance from ROOT DOWN to node. Height is distance from node DOWN TO DEEPEST LEAF.', codeExample: '# Depth: root=0, down. Height: leaf=0, up.' }
  ],
  applications: [
    { industry: 'Operating Systems', application: 'Hierarchical file systems (ext4, NTFS, APFS)', benefit: 'Natural directory tree modeling.' },
    { industry: 'Web Browsers', application: 'DOM (Document Object Model) representation', benefit: 'Hierarchical HTML element tree.' }
  ],
  practiceQuestions: [
    { id: 'pq-tt-1', question: 'How many null pointers exist in a binary tree with n nodes?', hint: 'Each node has 2 pointers; how many total pointers vs used edges?', answer: 'Exactly n + 1 null pointers. Total child pointers = 2n, and used edges = n - 1. 2n - (n - 1) = n + 1.' }
  ],
  quiz: [
    { id: 'q-tt-1', question: 'What is the maximum number of nodes in a binary tree of height h (where root is height 0)?', options: ['2^(h+1) - 1', '2^h', '2^h - 1', 'h^2'], correctIndex: 0, explanation: 'Sum of geometric series 2^0 + 2^1 + ... + 2^h = 2^(h+1) - 1.' }
  ],
  codingChallenge: {
    title: 'Count Leaf Nodes',
    problem: 'Write a function that counts the number of leaf nodes in a binary tree.',
    hints: ['A leaf node is a node with both left and right equal to None.'],
    starterCode: `def count_leaves(root: TreeNode | None) -> int:
    # TODO: Count leaf nodes
    pass`,
    solution: `def count_leaves(root: TreeNode | None) -> int:
    if not root:
        return 0
    if not root.left and not root.right:
        return 1
    return count_leaves(root.left) + count_leaves(root.right)`
  },
  summary: {
    keyTakeaways: ['Trees are connected acyclic graphs with n nodes and n-1 edges.', 'Depth measures distance from root; height measures distance to deepest leaf.'],
    nextLessonId: 'dsa-tree-binary-traversal',
    nextLessonTitle: 'Binary Tree Traversals: Pre, In, Post',
    nextLessonModuleId: 'dsa-module-8'
  }
};

m8Lessons['dsa-tree-level-order'] = {
  id: 'dsa-tree-level-order',
  moduleId: 'dsa-module-8',
  title: 'Level-Order Traversal and BFS on Trees',
  subtitle: 'Breadth-First Exploration, Queue Invariants, and Zig-Zag Leveling',
  order: 3,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'tree',
  objectives: [
    'Implement BFS on binary trees using a FIFO queue.',
    'Group node values by horizontal level using queue length snapshots.',
    'Solve tree width, minimum depth, and right-side view problems.',
    'Understand why level-order traversal consumes O(w) memory where w is tree width.'
  ],
  prerequisites: ['Tree Terminology and Representation', 'Queue and Circular Queue'],
  analogy: {
    title: 'Scanning a Document Line by Line',
    text: 'When reading a book or newspaper, your eyes read all words on line 1 from left to right, then move down to read all words on line 2, then line 3. You never jump down to read the last paragraph before finishing the current sentence.',
    metaphor: 'BFS explores all nodes at depth d before moving down to depth d + 1.'
  },
  problemSolved: {
    title: 'Shortest Distance and Level-By-Level Inspection',
    description: 'DFS traverses deep into one branch, which can take O(n) memory on skewed trees. BFS discovers nodes in order of their exact distance from the root, making it ideal for shortest-path and level grouping queries.',
    keyPoints: [
      'Guarantees nodes are visited in ascending order of depth.',
      'Queue size snapshot isolates each level cleanly.',
      'Solves Tree Right Side View and Zig-Zag Traversals.'
    ]
  },
  intuition: {
    overview: 'Initialize queue with root. While queue is non-empty, snapshot `level_size = len(queue)`. Pop `level_size` nodes, append their values to current level list, and enqueue their non-null children.',
    steps: [
      { step: 1, title: 'Enqueue Root', description: 'queue = deque([root])' },
      { step: 2, title: 'Level Snapshot', description: 'Loop level_size = len(queue) to process all nodes at current depth.' },
      { step: 3, title: 'Enqueue Children', description: 'For each popped node, if left exists push left; if right exists push right.' }
    ]
  },
  formalDefinition: {
    text: 'Level-order traversal visits all vertices v \\in V in order of non-decreasing depth \\text{depth}(v). For nodes at equal depth, visitation is ordered from left to right.',
    latex: '\\forall u, v \\in V, \\quad \\text{depth}(u) < \\text{depth}(v) \\implies \\text{visit}(u) < \\text{visit}(v)'
  },
  complexity: {
    overview: 'Time: O(n) visiting each node once. Space: O(w) = O(n/2) = O(n) max queue width.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(1)', explanation: 'Skewed tree (queue never holds > 1 node).' },
      { case: 'Average', time: 'O(n)', space: 'O(n)', explanation: 'Queue holds deepest level containing up to n/2 nodes.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Full complete binary tree where leaves = (n+1)/2 nodes.' }
    ],
    spaceNote: 'Queue holds maximum width w of tree, which is O(n) in balanced trees.'
  },
  workedExample: {
    title: 'Level Order on [3, 9, 20, null, null, 15, 7]',
    input: 'Tree: root=3, left=9, right=20(left=15, right=7)',
    steps: [
      { step: 1, action: 'Level 0', state: 'queue=[3] -> pop 3, enqueue 9, 20', explanation: 'Level 0: [3]' },
      { step: 2, action: 'Level 1', state: 'queue=[9, 20] -> pop 9 (no children), pop 20 (enqueue 15, 7)', explanation: 'Level 1: [9, 20]' },
      { step: 3, action: 'Level 2', state: 'queue=[15, 7] -> pop 15, pop 7', explanation: 'Level 2: [15, 7]' }
    ],
    finalOutput: '[[3], [9, 20], [15, 7]]'
  },
  visualExplanation: {
    title: 'Horizontal Wavefront Expansion',
    description: 'Visualizing horizontal wavefront sweeping down level by level.',
    features: ['Queue contents highlighted in cyan', 'Nodes visited row-by-row']
  },
  pseudocode: {
    title: 'Level-Order Traversal Algorithm',
    code: `function levelOrder(root):
    if root is null: return []
    result = []
    queue = new Queue([root])
    while not queue.isEmpty():
        level_size = queue.size()
        current_level = []
        for i from 1 to level_size:
            node = queue.pop()
            current_level.append(node.val)
            if node.left: queue.push(node.left)
            if node.right: queue.push(node.right)
        result.append(current_level)
    return result`
  },
  pythonCode: {
    title: 'Python Binary Tree Level Order',
    code: `from collections import deque

def level_order(root: TreeNode | None) -> list[list[int]]:
    if not root:
        return []
    result = []
    q = deque([root])
    
    while q:
        level_size = len(q)
        current_level = []
        for _ in range(level_size):
            node = q.popleft()
            current_level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        result.append(current_level)
        
    return result`,
    explanation: 'Uses collections.deque with level_size snapshot for clean batching.'
  },
  runnableCode: {
    code: `root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(level_order(root))`,
    expectedOutput: `[[3], [9, 20], [15, 7]]`
  },
  lineByLineExplanation: [
    { line: 10, code: 'level_size = len(q)', explanation: 'Crucial snapshot: freezes current queue length so inner loop processes only this level\'s nodes.' },
    { line: 12, code: 'node = q.popleft()', explanation: 'Pops in O(1) time from front of queue.' }
  ],
  edgeCases: [
    { case: 'Empty root', handling: 'Returns [] immediately without throwing errors.', example: 'root = None' }
  ],
  commonMistakes: [
    { mistake: 'Recomputing len(q) dynamically in the while loop without snapshot', solution: 'New children are added during iteration; you must store level_size = len(q) before the inner loop.', codeExample: 'for _ in range(len(q)): # works in Python because range evaluates once!' }
  ],
  applications: [
    { industry: 'Graphics & Rendering', application: 'Hierarchical scene graph level-of-detail (LOD) selection', benefit: 'Renders objects at appropriate camera distance depth.' }
  ],
  practiceQuestions: [
    { id: 'pq-lo-1', question: 'How can you find the Right Side View of a binary tree using level order traversal?', hint: 'Look at the last element of each level.', answer: 'At each level, append current_level[-1] (the rightmost node) to the result list.' }
  ],
  quiz: [
    { id: 'q-lo-1', question: 'What data structure is fundamentally required to implement level-order traversal?', options: ['Queue', 'Stack', 'Heap', 'Hash Set'], correctIndex: 0, explanation: 'A FIFO queue ensures nodes are processed in the order they are discovered.' }
  ],
  codingChallenge: {
    title: 'Binary Tree Zigzag Level Order Traversal',
    problem: 'Given the root of a binary tree, return the zigzag level order traversal of its nodes\' values (alternating left-to-right and right-to-left).',
    hints: ['Use a boolean flag to reverse alternating level arrays.'],
    starterCode: `def zigzag_level_order(root: TreeNode | None) -> list[list[int]]:
    # TODO: Implement zigzag level order
    pass`,
    solution: `from collections import deque

def zigzag_level_order(root: TreeNode | None) -> list[list[int]]:
    if not root: return []
    res = []
    q = deque([root])
    left_to_right = True
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        if not left_to_right:
            level.reverse()
        res.append(level)
        left_to_right = not left_to_right
    return res`
  },
  summary: {
    keyTakeaways: ['BFS explores trees level by level using a FIFO queue.', 'Queue snapshots (level_size = len(q)) separate depths cleanly.'],
    nextLessonId: 'dsa-tree-bst-intro',
    nextLessonTitle: 'Binary Search Trees: Introduction',
    nextLessonModuleId: 'dsa-module-8'
  }
};

m8Lessons['dsa-tree-bst-intro'] = {
  id: 'dsa-tree-bst-intro',
  moduleId: 'dsa-module-8',
  title: 'Binary Search Trees: Introduction',
  subtitle: 'The BST Invariant, In-Order Sorted Property, and Range Searching',
  order: 4,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'tree',
  objectives: [
    'Define the BST invariant: Left < Node < Right across all descendant subtrees.',
    'Understand why an In-Order traversal of a BST yields strictly sorted keys.',
    'Search for keys in O(h) time by comparing target against current node.',
    'Validate whether an arbitrary binary tree satisfies the BST property.'
  ],
  prerequisites: ['Binary Tree Traversals: Pre, In, Post'],
  analogy: {
    title: 'The Digital Dictionary Shelf',
    text: 'A dictionary is organized so words starting with letters before "M" are in the left volume, and words after "M" are in the right volume. Within the left volume, "F" divides the words again. At every step, you eliminate half of the search space with a single comparison.',
    metaphor: 'The BST invariant guarantees decisions prune an entire branch at each step.'
  },
  problemSolved: {
    title: 'Combining Fast O(log n) Search with Dynamic Insertion',
    description: 'Sorted arrays allow O(log n) binary search but require slow O(n) insertions. Linked lists allow O(1) insertions but require slow O(n) search. A balanced BST gives the best of both worlds: O(log n) search, insertion, and deletion.',
    keyPoints: [
      'In-Order traversal produces sorted sequence in O(n).',
      'Average search, insert, and delete take O(log n) time.',
      'Underlying concept behind AVL trees, Red-Black trees, and B-trees.'
    ]
  },
  intuition: {
    overview: 'To search for key k: if k == node.val, found! If k < node.val, search left child. If k > node.val, search right child. If node is None, key does not exist.',
    steps: [
      { step: 1, title: 'Compare Target', description: 'Compare target value against current node.' },
      { step: 2, title: 'Branch Left or Right', description: 'If target < val, go left; else go right.' },
      { step: 3, title: 'Termination', description: 'Returns node if found, or None if leaf child reached.' }
    ]
  },
  formalDefinition: {
    text: 'A Binary Search Tree is a binary tree where for every node x: for all y in left_subtree(x), key(y) < key(x), and for all z in right_subtree(x), key(z) > key(x).',
    latex: '\\forall y \\in \\text{Left}(x), \\; y.\\text{val} < x.\\text{val} \\quad \\land \\quad \\forall z \\in \\text{Right}(x), \\; z.\\text{val} > x.\\text{val}'
  },
  complexity: {
    overview: 'Search, Insert, Delete take O(h) time where h is tree height.',
    cases: [
      { case: 'Best', time: 'O(log n)', space: 'O(log n)', explanation: 'Balanced BST with height log2(n).' },
      { case: 'Average', time: 'O(log n)', space: 'O(log n)', explanation: 'Random insertion order produces balanced tree.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Keys inserted in sorted order form a degenerate linked list.' }
    ],
    spaceNote: 'O(h) call stack memory.'
  },
  workedExample: {
    title: 'Search for 4 in BST [5, 3, 7, 2, 4, 6, 8]',
    input: 'Target = 4',
    steps: [
      { step: 1, action: 'At Root 5', state: '4 < 5 -> Go Left', explanation: 'Eliminates right subtree {7, 6, 8}.' },
      { step: 2, action: 'At Node 3', state: '4 > 3 -> Go Right', explanation: 'Eliminates left subtree {2}.' },
      { step: 3, action: 'At Node 4', state: '4 == 4 -> Target Found!', explanation: 'Search terminates successfully in 3 comparisons.' }
    ],
    finalOutput: 'Node 4 found.'
  },
  visualExplanation: {
    title: 'BST Range Partitioning',
    description: 'Visualizing key partitions: all left descendants < root < all right descendants.',
    features: ['Highlighted search path branches down left or right', 'In-order projection matches sorted horizontal axis']
  },
  pseudocode: {
    title: 'BST Search Algorithm',
    code: `function searchBST(root, val):
    if root is null or root.val == val:
        return root
    if val < root.val:
        return searchBST(root.left, val)
    return searchBST(root.right, val)`
  },
  pythonCode: {
    title: 'Python BST Search & Validation',
    code: `def search_bst(root: TreeNode | None, val: int) -> TreeNode | None:
    curr = root
    while curr and curr.val != val:
        if val < curr.val:
            curr = curr.left
        else:
            curr = curr.right
    return curr

def is_valid_bst(root: TreeNode | None) -> bool:
    def validate(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    return validate(root, float('-inf'), float('inf'))`,
    explanation: 'Iterative O(1) space search and recursive range-bounded BST validator.'
  },
  runnableCode: {
    code: `root = TreeNode(5, TreeNode(3, TreeNode(2), TreeNode(4)), TreeNode(7, TreeNode(6), TreeNode(8)))
node = search_bst(root, 4)
print(node.val if node else None)
print(is_valid_bst(root))`,
    expectedOutput: `4\nTrue`
  },
  lineByLineExplanation: [
    { line: 12, code: 'if not (low < node.val < high): return False', explanation: 'Validates that current node strictly adheres to allowable min and max range boundaries inherited from ancestors.' },
    { line: 14, code: 'validate(node.left, low, node.val) and validate(node.right, node.val, high)', explanation: 'Tightens upper bound for left subtree and lower bound for right subtree.' }
  ],
  edgeCases: [
    { case: 'Duplicate values', handling: 'Standard BSTs require strict inequality; duplicates violate strict BST unless explicitly handled.', example: 'TreeNode(5, TreeNode(5))' }
  ],
  commonMistakes: [
    { mistake: 'Only checking node.left.val < node.val and node.right.val > node.val locally', solution: 'A node must be greater than ALL nodes in its left subtree, not just its immediate child; use range passing (low, high).', codeExample: '# Local check misses invalid deep ancestors!' }
  ],
  applications: [
    { industry: 'Databases', application: 'In-memory index structures and range queries', benefit: 'Allows fast range scans: find all keys between 10 and 50.' }
  ],
  practiceQuestions: [
    { id: 'pq-bst-1', question: 'How can you find the minimum element in a BST?', hint: 'Keep going left.', answer: 'Walk pointer to the left child continuously until node.left is None; that leftmost node contains the minimum value.' }
  ],
  quiz: [
    { id: 'q-bst-1', question: 'What traversal of a BST produces keys in strictly ascending order?', options: ['In-Order Traversal', 'Pre-Order Traversal', 'Post-Order Traversal', 'Level-Order Traversal'], correctIndex: 0, explanation: 'In-Order (Left, Root, Right) processes smaller values first, then root, then larger values.' }
  ],
  codingChallenge: {
    title: 'Range Sum of BST',
    problem: 'Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].',
    hints: ['If node.val < low, prune left subtree. If node.val > high, prune right subtree.'],
    starterCode: `def range_sum_bst(root: TreeNode | None, low: int, high: int) -> int:
    # TODO: Implement pruned range sum
    pass`,
    solution: `def range_sum_bst(root: TreeNode | None, low: int, high: int) -> int:
    if not root:
        return 0
    if root.val < low:
        return range_sum_bst(root.right, low, high)
    if root.val > high:
        return range_sum_bst(root.left, low, high)
    return root.val + range_sum_bst(root.left, low, high) + range_sum_bst(root.right, low, high)`
  },
  summary: {
    keyTakeaways: ['BST invariant: Left descendants < Node < Right descendants.', 'Validate BST using range bounds (low, high), not just immediate children.'],
    nextLessonId: 'dsa-tree-bst-operations',
    nextLessonTitle: 'BST: Insertion, Search, and Deletion',
    nextLessonModuleId: 'dsa-module-8'
  }
};

m8Lessons['dsa-tree-bst-operations'] = {
  id: 'dsa-tree-bst-operations',
  moduleId: 'dsa-module-8',
  title: 'BST: Insertion, Search, and Deletion',
  subtitle: 'Pointer Rewiring, In-Order Successor Replacement, and 3 Deletion Cases',
  order: 5,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'tree',
  objectives: [
    'Insert new keys into BSTs while preserving the BST invariant.',
    'Master the 3 cases of BST deletion: leaf node, single child, and two children.',
    'Locate the In-Order Successor (smallest node in right subtree) for two-child deletion.',
    'Implement recursive and iterative BST mutation methods.'
  ],
  prerequisites: ['Binary Search Trees: Introduction'],
  analogy: {
    title: 'The Office Succession Plan',
    text: 'When an employee with no subordinates leaves, their desk is simply cleared (Case 1). If a manager with one team leaves, their deputy steps up into their chair (Case 2). If a senior director with two sprawling divisions leaves, the most junior eligible successor from the senior division takes over the title to keep corporate balance (Case 3: In-order successor).',
    metaphor: 'Deleting a node with two children requires replacing its value with its in-order successor.'
  },
  problemSolved: {
    title: 'Dynamic Set Maintenance with Full Mutation Support',
    description: 'Dynamic applications require continuous additions and removals of records. BST deletion is notoriously tricky because removing an internal node risks disconnecting its subtrees.',
    keyPoints: [
      'Insertion always attaches at a leaf position.',
      'Deletion handles 3 distinct structural cases.',
      'Maintains BST ordering invariant throughout all operations.'
    ]
  },
  intuition: {
    overview: 'Insertion: walk down tree comparing keys until hitting null, then attach new node. Deletion: if 0 children, return null. If 1 child, return that child. If 2 children, copy in-order successor value and delete successor from right subtree.',
    steps: [
      { step: 1, title: 'Locate Target', description: 'Recurse left or right to find node with target value.' },
      { step: 2, title: 'Handle 0 or 1 Child', description: 'Return child (or None) directly to parent link.' },
      { step: 3, title: 'Handle 2 Children', description: 'Find min in right subtree (successor), copy its val, and delete successor.' }
    ]
  },
  formalDefinition: {
    text: 'Let x be a node to delete. If children(x) = \\emptyset, parent(x).child = \\text{null}. If |children(x)| = 1, parent(x).child = children(x). If |children(x)| = 2, replace x.val with y.val where y = \\min(\\text{Right}(x)), then delete y.',
    latex: '\\text{Successor}(x) = \\min \\{ z \\in \\text{Right}(x) \\}'
  },
  complexity: {
    overview: 'All operations take O(h) time where h is the tree height.',
    cases: [
      { case: 'Best', time: 'O(log n)', space: 'O(log n)', explanation: 'Balanced tree.' },
      { case: 'Average', time: 'O(log n)', space: 'O(log n)', explanation: 'Random BST.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Degenerate linear tree.' }
    ],
    spaceNote: 'O(h) call stack memory.'
  },
  workedExample: {
    title: 'Deleting Node 5 from BST with Two Children',
    input: 'Tree: [5, 3, 6, 2, 4, null, 7], Delete 5',
    steps: [
      { step: 1, action: 'Node 5 has 2 children (3 and 6)', state: 'Identify in-order successor', explanation: 'Right subtree root is 6, its leftmost node is 6 itself.' },
      { step: 2, action: 'Copy successor value', state: 'Replace 5 with 6 -> [6, 3, 6, ...]', explanation: 'Node value becomes 6.' },
      { step: 3, action: 'Delete successor node 6 from right subtree', state: 'Node 6 had right child 7 -> link 7 up', explanation: 'Reduced to Case 1/2 deletion.' }
    ],
    finalOutput: 'Resulting valid BST: [6, 3, 7, 2, 4]'
  },
  visualExplanation: {
    title: 'In-Order Successor Substitution',
    description: 'Visualizing green successor node sliding into deceased parent spot, preserving all order relationships.',
    features: ['Yellow highlight on node to delete', 'Green highlight on smallest right-subtree successor']
  },
  pseudocode: {
    title: 'BST Delete Algorithm',
    code: `function deleteNode(root, key):
    if root is null: return null
    if key < root.val:
        root.left = deleteNode(root.left, key)
    elif key > root.val:
        root.right = deleteNode(root.right, key)
    else:
        # Case 1 & 2: 0 or 1 child
        if root.left is null: return root.right
        if root.right is null: return root.left
        # Case 3: 2 children
        succ = findMin(root.right)
        root.val = succ.val
        root.right = deleteNode(root.right, succ.val)
    return root`
  },
  pythonCode: {
    title: 'Python BST Insert and Delete',
    code: `def insert_into_bst(root: TreeNode | None, val: int) -> TreeNode:
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert_into_bst(root.left, val)
    else:
        root.right = insert_into_bst(root.right, val)
    return root

def delete_node(root: TreeNode | None, key: int) -> TreeNode | None:
    if not root:
        return None
    if key < root.val:
        root.left = delete_node(root.left, key)
    elif key > root.val:
        root.right = delete_node(root.right, key)
    else:
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        # Node with two children
        curr = root.right
        while curr.left:
            curr = curr.left
        root.val = curr.val
        root.right = delete_node(root.right, curr.val)
    return root`,
    explanation: 'Clean recursive implementation returning updated subtree roots to rewire pointers.'
  },
  runnableCode: {
    code: `root = None
for x in [5, 3, 6, 2, 4, 7]:
    root = insert_into_bst(root, x)
root = delete_node(root, 5)
print(root.val) # New root is successor 6`,
    expectedOutput: `6`
  },
  lineByLineExplanation: [
    { line: 20, code: 'if not root.left: return root.right', explanation: 'If left child is None, returning right child replaces current node with its right subtree.' },
    { line: 26, code: 'root.val = curr.val', explanation: 'Copies the in-order successor value to replace the deleted node value.' }
  ],
  edgeCases: [
    { case: 'Deleting the root node', handling: 'Returns updated successor node as the new root of the entire tree.', example: 'delete_node(root, root.val)' }
  ],
  commonMistakes: [
    { mistake: 'Deleting the predecessor or successor by pointer address rather than value recursion', solution: 'Calling delete_node(root.right, curr.val) cleanly handles removing the successor node.', codeExample: 'root.right = delete_node(root.right, curr.val)' }
  ],
  applications: [
    { industry: 'Compilers', application: 'Symbol table scope management', benefit: 'Allows dynamic insertion and removal of variable bindings.' }
  ],
  practiceQuestions: [
    { id: 'pq-bsto-1', question: 'Could we replace the deleted node with its In-Order Predecessor instead of Successor?', hint: 'Look at the maximum node in the left subtree.', answer: 'Yes! The in-order predecessor (maximum node in left subtree) also preserves the BST invariant perfectly.' }
  ],
  quiz: [
    { id: 'q-bsto-1', question: 'Where is the In-Order Successor of a node located?', options: ['The leftmost node of its right subtree', 'The rightmost node of its left subtree', 'Its immediate right child', 'The root node'], correctIndex: 0, explanation: 'The successor is the smallest value greater than node.val, located by moving right once, then left as far as possible.' }
  ],
  codingChallenge: {
    title: 'Kth Smallest Element in a BST',
    problem: 'Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) in the tree.',
    hints: ['Perform an in-order traversal and stop when count reaches k.'],
    starterCode: `def kth_smallest(root: TreeNode | None, k: int) -> int:
    # TODO: Find kth smallest element
    pass`,
    solution: `def kth_smallest(root: TreeNode | None, k: int) -> int:
    stack = []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val
        curr = curr.right
    return -1`
  },
  summary: {
    keyTakeaways: ['Insertion attaches at leaves in O(h) time.', 'Deletion handles 3 cases; 2-child deletion swaps with in-order successor.'],
    nextLessonId: 'dsa-tree-height-diameter',
    nextLessonTitle: 'Tree Height, Depth, and Diameter',
    nextLessonModuleId: 'dsa-module-8'
  }
};

m8Lessons['dsa-tree-height-diameter'] = {
  id: 'dsa-tree-height-diameter',
  moduleId: 'dsa-module-8',
  title: 'Tree Height, Depth, and Diameter',
  subtitle: 'Post-Order Bottom-Up Aggregation and Longest Path Between Nodes',
  order: 6,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'tree',
  objectives: [
    'Calculate tree height using bottom-up post-order recursion in O(n) time.',
    'Define the diameter of a binary tree (longest path between any two nodes).',
    'Understand why the diameter does not necessarily pass through the root.',
    'Update global diameter while returning local height in a single recursive pass.'
  ],
  prerequisites: ['Tree Terminology and Representation'],
  analogy: {
    title: 'The Longest Highway Connecting Two Cities',
    text: 'In a mountain valley highway network, the longest distance between any two dead-end towns might pass through the central capital city at the mountain peak (the root). However, if one mountain side-range is huge and deep, the longest highway might connect two distant mountain villages entirely within that side-range without ever passing through the capital.',
    metaphor: 'The longest path can be contained entirely within a single subtree.'
  },
  problemSolved: {
    title: 'Eliminating Redundant O(n²) Height Recalculations',
    description: 'A naive diameter calculation calls height(node.left) and height(node.right) at every node, taking O(n²). By combining height calculation and diameter tracking in a single post-order traversal, we compute diameter in O(n) time.',
    keyPoints: [
      'Single O(n) post-order pass.',
      'Computes diameter = left_height + right_height at each candidate node.',
      'Returns 1 + max(left, right) to parent.'
    ]
  },
  intuition: {
    overview: 'At each node, the longest path turning at that node has length left_height + right_height. We maintain a running max diameter, while returning 1 + max(left_height, right_height) to parent.',
    steps: [
      { step: 1, title: 'Base Case', description: 'If node is None, return height 0.' },
      { step: 2, title: 'Recurse Children', description: 'left_h = dfs(node.left); right_h = dfs(node.right).' },
      { step: 3, title: 'Update Diameter', description: 'max_diameter = max(max_diameter, left_h + right_h).' },
      { step: 4, title: 'Return Height', description: 'return 1 + max(left_h, right_h).' }
    ]
  },
  formalDefinition: {
    text: 'The diameter of tree T is \\max_{u, v \\in V} \\text{dist}(u, v). For any node x, the longest path with apex x has length \\text{height}(\\text{Left}(x)) + \\text{height}(\\text{Right}(x)).',
    latex: '\\text{Diameter}(T) = \\max_{x \\in V} \\big( \\text{height}(\\text{Left}(x)) + \\text{height}(\\text{Right}(x)) \\big)'
  },
  complexity: {
    overview: 'Time: O(n) visiting each node exactly once. Space: O(h) call stack.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(log n)', explanation: 'Balanced tree.' },
      { case: 'Average', time: 'O(n)', space: 'O(log n)', explanation: 'Standard tree.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Linear skewed tree.' }
    ],
    spaceNote: 'O(h) call stack memory.'
  },
  workedExample: {
    title: 'Diameter on [1, 2, 3, 4, 5]',
    input: 'Tree: root 1; left child 2 (children 4, 5); right child 3',
    steps: [
      { step: 1, action: 'Leaf 4 and 5', state: 'Heights = 1', explanation: 'Path between 4 and 5 turns at 2.' },
      { step: 2, action: 'At Node 2', state: 'left_h=1, right_h=1 -> local path = 2', explanation: 'Height returned to 1 is 1 + max(1, 1) = 2.' },
      { step: 3, action: 'At Node 3', state: 'left_h=0, right_h=0 -> height returned is 1', explanation: 'Leaf node.' },
      { step: 4, action: 'At Root 1', state: 'left_h=2, right_h=1 -> local path = 2 + 1 = 3', explanation: 'Max diameter is 3 (path 4 -> 2 -> 1 -> 3).' }
    ],
    finalOutput: 'Diameter = 3 edges'
  },
  visualExplanation: {
    title: 'Apex Path Turning Point',
    description: 'Visualizing diameter as a path that rises up from a left leaf to an apex node, then descends down to a right leaf.',
    features: ['Red line highlights longest end-to-end edge path', 'Apex node highlighted in purple']
  },
  pseudocode: {
    title: 'Tree Diameter Algorithm',
    code: `function diameterOfBinaryTree(root):
    max_diameter = 0
    function height(node):
        if node is null: return 0
        lh = height(node.left)
        rh = height(node.right)
        max_diameter = max(max_diameter, lh + rh)
        return 1 + max(lh, rh)
    height(root)
    return max_diameter`
  },
  pythonCode: {
    title: 'Python Binary Tree Diameter',
    code: `def diameter_of_binary_tree(root: TreeNode | None) -> int:
    max_diameter = 0

    def get_height(node: TreeNode | None) -> int:
        nonlocal max_diameter
        if not node:
            return 0
        left_h = get_height(node.left)
        right_h = get_height(node.right)
        max_diameter = max(max_diameter, left_h + right_h)
        return 1 + max(left_h, right_h)

    get_height(root)
    return max_diameter`,
    explanation: 'Uses post-order traversal to calculate height and record max path in single pass.'
  },
  runnableCode: {
    code: `root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
print(diameter_of_binary_tree(root))`,
    expectedOutput: `3`
  },
  lineByLineExplanation: [
    { line: 10, code: 'max_diameter = max(max_diameter, left_h + right_h)', explanation: 'Updates global diameter by calculating number of edges on path spanning through node.' },
    { line: 11, code: 'return 1 + max(left_h, right_h)', explanation: 'Returns max single-leg depth to parent node.' }
  ],
  edgeCases: [
    { case: 'Empty tree or single node', handling: 'Returns diameter = 0 edges.', example: 'root = TreeNode(1)' }
  ],
  commonMistakes: [
    { mistake: 'Assuming diameter must pass through root (return height(root.left) + height(root.right))', solution: 'The longest path can reside completely in a subtree; must track running max at all nodes.', codeExample: '# Diameter might NOT pass through root!' }
  ],
  applications: [
    { industry: 'Telecommunications', application: 'Network backbone delay minimization', benefit: 'Finds worst-case signal latency between any two network nodes.' }
  ],
  practiceQuestions: [
    { id: 'pq-thd-1', question: 'How is diameter defined in terms of nodes vs edges?', hint: 'Number of nodes on path is edges + 1.', answer: 'Standard LeetCode defines diameter as number of edges (length of path). If defined as nodes, it is edges + 1.' }
  ],
  quiz: [
    { id: 'q-thd-1', question: 'Does the diameter of a binary tree always pass through the root?', options: ['No, it can be entirely contained within a left or right subtree', 'Yes, always', 'Only if the tree is balanced', 'Only if the tree has an odd number of nodes'], correctIndex: 0, explanation: 'A subtree may be extremely deep while the other side of the root is shallow, placing the entire diameter inside that subtree.' }
  ],
  codingChallenge: {
    title: 'Balanced Binary Tree Validation',
    problem: 'Given a binary tree, determine if it is height-balanced (depth of the two subtrees of every node never differs by more than 1).',
    hints: ['Return -1 from height function as soon as any subtree is detected as unbalanced.'],
    starterCode: `def is_balanced(root: TreeNode | None) -> bool:
    # TODO: Validate balanced tree
    pass`,
    solution: `def is_balanced(root: TreeNode | None) -> bool:
    def check(node):
        if not node:
            return 0
        lh = check(node.left)
        if lh == -1: return -1
        rh = check(node.right)
        if rh == -1: return -1
        if abs(lh - rh) > 1:
            return -1
        return 1 + max(lh, rh)
    return check(root) != -1`
  },
  summary: {
    keyTakeaways: ['Diameter is max(left_height + right_height) across all nodes.', 'Compute height and update diameter in a single O(n) post-order pass.'],
    nextLessonId: 'dsa-tree-lca',
    nextLessonTitle: 'Lowest Common Ancestor',
    nextLessonModuleId: 'dsa-module-8'
  }
};

m8Lessons['dsa-tree-lca'] = {
  id: 'dsa-tree-lca',
  moduleId: 'dsa-module-8',
  title: 'Lowest Common Ancestor',
  subtitle: 'Path Convergence in Binary Trees vs Directed Numerical Search in BSTs',
  order: 7,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'tree',
  objectives: [
    'Define Lowest Common Ancestor (LCA) for general binary trees and BSTs.',
    'Solve LCA in a general binary tree in O(n) time using post-order recursion.',
    'Solve LCA in a BST in O(h) time using directional range checks.',
    'Identify the split condition where p and q diverge into opposite subtrees.'
  ],
  prerequisites: ['Binary Search Trees: Introduction'],
  analogy: {
    title: 'The Common Ancestor in a Family Tree',
    text: 'You and your first cousin trace your genealogy upward. Your cousin traces to their parent, you trace to yours; both parents trace to the same grandparents. Those grandparents are your Lowest Common Ancestor—the closest shared generational link.',
    metaphor: 'LCA is the deepest node that has both p and q as descendants.'
  },
  problemSolved: {
    title: 'Finding Convergence Points in Hierarchical Structures',
    description: 'Determining the nearest shared ancestor is essential in phylogenetic evolutionary trees, git merge base resolution, and network routing between two nodes.',
    keyPoints: [
      'Git merge-base algorithm finds LCA of two commit branches.',
      'O(h) for BSTs by finding where p and q split.',
      'O(n) for general trees via bottom-up matching.'
    ]
  },
  intuition: {
    overview: 'In general tree: if current node is p or q or null, return current node. Recurse left and right. If both subtrees return non-null, current node is the LCA! In BST: if both p, q < node, go left. If both > node, go right. Otherwise, current node is the LCA.',
    steps: [
      { step: 1, title: 'Base Match', description: 'If node in (None, p, q): return node.' },
      { step: 2, title: 'Check Left & Right', description: 'left = lca(node.left), right = lca(node.right).' },
      { step: 3, title: 'Evaluate Convergence', description: 'If both left and right are non-null, return node. Else return non-null one.' }
    ]
  },
  formalDefinition: {
    text: 'The LCA of two nodes p and q in tree T is the unique node v \\in V such that v is an ancestor of both p and q, and no proper descendant of v is an ancestor of both.',
    latex: '\\text{LCA}(p, q) = \\arg\\max_{v \\in \\text{Ancestors}(p) \\cap \\text{Ancestors}(q)} \\text{depth}(v)'
  },
  complexity: {
    overview: 'General tree: O(n) time, O(h) space. BST: O(h) time, O(1) space iterative.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Root is p or q.' },
      { case: 'Average', time: 'O(h) for BST / O(n) general', space: 'O(h)', explanation: 'Single branch traversal in BST.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Deep traversal in skewed tree.' }
    ],
    spaceNote: 'O(h) call stack memory.'
  },
  workedExample: {
    title: 'LCA of 2 and 8 in BST [6, 2, 8, 0, 4, 7, 9]',
    input: 'p = 2, q = 8, root = 6',
    steps: [
      { step: 1, action: 'At Root 6', state: '2 < 6 and 8 > 6', explanation: 'Values split! One is left, one is right.' },
      { step: 2, action: 'Convergence detected', state: 'Root 6 is the split point', explanation: 'Root 6 is the Lowest Common Ancestor.' }
    ],
    finalOutput: 'LCA is Node 6'
  },
  visualExplanation: {
    title: 'Split Point Divergence',
    description: 'Visualizing path from root until p and q diverge down separate subtrees.',
    features: ['Yellow path from root to LCA', 'Branches split down to p (blue) and q (green)']
  },
  pseudocode: {
    title: 'General Tree LCA Algorithm',
    code: `function lowestCommonAncestor(root, p, q):
    if root is null or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left is not null and right is not null:
        return root
    return left if left is not null else right`
  },
  pythonCode: {
    title: 'Python LCA Implementations',
    code: `def lca_binary_tree(root: TreeNode | None, p: TreeNode, q: TreeNode) -> TreeNode | None:
    if not root or root == p or root == q:
        return root
    left = lca_binary_tree(root.left, p, q)
    right = lca_binary_tree(root.right, p, q)
    if left and right:
        return root
    return left or right

def lca_bst(root: TreeNode | None, p: TreeNode, q: TreeNode) -> TreeNode | None:
    curr = root
    while curr:
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            return curr # Split point found!
    return None`,
    explanation: 'General tree uses post-order match; BST uses iterative O(1) space range split.'
  },
  runnableCode: {
    code: `p = TreeNode(2)
q = TreeNode(8)
root = TreeNode(6, p, q)
print(lca_bst(root, p, q).val)
print(lca_binary_tree(root, p, q).val)`,
    expectedOutput: `6\n6`
  },
  lineByLineExplanation: [
    { line: 6, code: 'if left and right: return root', explanation: 'If one target was found in left subtree and other in right subtree, current node is the LCA.' },
    { line: 18, code: 'else: return curr', explanation: 'In BST, once p and q are on opposite sides (or one equals curr), curr is the LCA.' }
  ],
  edgeCases: [
    { case: 'p is ancestor of q', handling: 'Returns p directly when root == p before recursing further.', example: 'p = root, q is child of p' }
  ],
  commonMistakes: [
    { mistake: 'Searching entire general tree when given a BST', solution: 'A BST can be searched directionally in O(h) time without scanning both subtrees.', codeExample: 'if p.val < curr.val and q.val < curr.val: curr = curr.left' }
  ],
  applications: [
    { industry: 'Version Control', application: 'Git merge-base calculation for 3-way merges', benefit: 'Finds most recent common commit ancestor.' }
  ],
  practiceQuestions: [
    { id: 'pq-lca-1', question: 'How can you find LCA in a tree where nodes have parent pointers?', hint: 'Treat as intersection of two linked lists.', answer: 'Trace path from p to root storing visited nodes in a set, then walk q up until hitting a visited node.' }
  ],
  quiz: [
    { id: 'q-lca-1', question: 'In a BST, if p.val < curr.val and q.val > curr.val, what is the LCA?', options: ['curr', 'curr.left', 'curr.right', 'p'], correctIndex: 0, explanation: 'Because p and q split into opposite subtrees, curr is their lowest common ancestor.' }
  ],
  codingChallenge: {
    title: 'Path Sum III',
    problem: 'Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of values along the path equals targetSum. The path does not need to start or end at the root.',
    hints: ['Use prefix sums with a hash map, similar to subarray sum equals k.'],
    starterCode: `def path_sum(root: TreeNode | None, targetSum: int) -> int:
    # TODO: Count paths matching sum
    pass`,
    solution: `from collections import defaultdict

def path_sum(root: TreeNode | None, targetSum: int) -> int:
    prefix_counts = defaultdict(int)
    prefix_counts[0] = 1
    total_paths = 0

    def dfs(node, curr_sum):
        nonlocal total_paths
        if not node:
            return
        curr_sum += node.val
        total_paths += prefix_counts[curr_sum - targetSum]
        prefix_counts[curr_sum] += 1
        dfs(node.left, curr_sum)
        dfs(node.right, curr_sum)
        prefix_counts[curr_sum] -= 1 # backtrack

    dfs(root, 0)
    return total_paths`
  },
  summary: {
    keyTakeaways: ['LCA is the deepest node with both targets as descendants.', 'In BSTs, the LCA is the split point where targets diverge.'],
    nextLessonId: 'dsa-tree-avl',
    nextLessonTitle: 'AVL Trees and Rotations',
    nextLessonModuleId: 'dsa-module-8'
  }
};

m8Lessons['dsa-tree-avl'] = {
  id: 'dsa-tree-avl',
  moduleId: 'dsa-module-8',
  title: 'AVL Trees and Rotations',
  subtitle: 'Self-Balancing BSTs, Balance Factors, and the 4 Rotation Cases',
  order: 8,
  readTimeMinutes: 24,
  difficulty: 'Advanced',
  visualizerType: 'tree',
  objectives: [
    'Define the AVL balance factor invariant: |height(left) - height(right)| <= 1.',
    'Implement Right Rotation (RR) and Left Rotation (LL) in O(1) time.',
    'Execute composite Double Rotations: Left-Right (LR) and Right-Left (RL).',
    'Prove why AVL trees guarantee strictly O(log n) worst-case search, insert, and delete.'
  ],
  prerequisites: ['BST: Insertion, Search, and Deletion', 'Tree Height, Depth, and Diameter'],
  analogy: {
    title: 'The Self-Centering Acrobat Pole',
    text: 'A tightrope walker holds a balance pole. If the left side dips too low (heavy), they immediately twist their wrists to shift weight rightward, restoring horizontal equilibrium before they topple.',
    metaphor: 'Tree rotations re-center unbalanced subtrees in O(1) pointer updates.'
  },
  problemSolved: {
    title: 'Eliminating the Worst-Case O(n) Degenerate Tree Bottleneck',
    description: 'Inserting sorted keys [1, 2, 3, 4, 5] into a standard BST degrades it into an O(n) linked list. AVL trees automatically self-balance on every insertion and deletion, guaranteeing height h < 1.44 log2(n).',
    keyPoints: [
      'Strictly balanced: balance factor \\in \\{-1, 0, 1\\}.',
      '4 rotation cases: LL, RR, LR, RL.',
      'Guaranteed O(log n) worst-case performance.'
    ]
  },
  intuition: {
    overview: 'After standard BST insertion, update heights bottom-up. If balance factor is > 1 or < -1, apply one of 4 rotations (LL, RR, LR, RL) to restore balance in O(1) time.',
    steps: [
      { step: 1, title: 'Balance Factor', description: 'BF = height(left) - height(right).' },
      { step: 2, title: 'Detect Violation', description: 'If BF > 1: Left-Heavy. If BF < -1: Right-Heavy.' },
      { step: 3, title: 'Apply Rotations', description: 'LL: Right Rotate. RR: Left Rotate. LR: Left Rotate child then Right Rotate root. RL: Right Rotate child then Left Rotate root.' }
    ]
  },
  formalDefinition: {
    text: 'An AVL tree is a BST where for every node v, \\text{BF}(v) = \\text{height}(\\text{Left}(v)) - \\text{height}(\\text{Right}(v)) \\in \\{-1, 0, 1\\}. Minimum nodes for height h satisfy Fibonacci-like recurrence N(h) = N(h-1) + N(h-2) + 1.',
    latex: 'h < 1.44 \\log_2(n + 2) - 0.328 = \\mathcal{O}(\\log n)'
  },
  complexity: {
    overview: 'Search, Insert, and Delete are strictly O(log n) worst-case.',
    cases: [
      { case: 'Best', time: 'O(log n)', space: 'O(log n)', explanation: 'Optimal height.' },
      { case: 'Average', time: 'O(log n)', space: 'O(log n)', explanation: 'Guaranteed bounded height.' },
      { case: 'Worst', time: 'O(log n)', space: 'O(log n)', explanation: 'Worst-case tree is still strictly logarithmic.' }
    ],
    spaceNote: 'O(n) storage with height byte stored per node.'
  },
  workedExample: {
    title: 'Right Rotation on Left-Heavy Node (Case LL)',
    input: 'Tree: 3 with left child 2 (left child 1)',
    steps: [
      { step: 1, action: 'Initial state', state: '3 has left child 2, BF(3) = 2', explanation: 'Left-Left heavy violation.' },
      { step: 2, action: 'Promote 2 to root', state: '2 becomes parent of 3; 3 takes 2\'s right child', explanation: 'Right rotation executed.' },
      { step: 3, action: 'Resulting balanced tree', state: 'Root 2 with left 1 and right 3', explanation: 'All balance factors become 0.' }
    ],
    finalOutput: 'Balanced tree: [2, 1, 3]'
  },
  visualExplanation: {
    title: 'Tree Rotation Mechanism',
    description: 'Visualizing pointer pivots: child rises to parent, parent drops to child, shared subtree transferred.',
    features: ['Yellow node rotates down', 'Green child node pivots up to become new subtree root']
  },
  pseudocode: {
    title: 'AVL Right Rotation',
    code: `function rightRotate(y):
    x = y.left
    T2 = x.right
    # Perform rotation
    x.right = y
    y.left = T2
    # Update heights
    y.height = 1 + max(height(y.left), height(y.right))
    x.height = 1 + max(height(x.left), height(x.right))
    return x # new root`
  },
  pythonCode: {
    title: 'Python AVL Node & Rotations',
    code: `class AVLNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1

def get_height(node):
    return node.height if node else 0

def get_balance(node):
    return get_height(node.left) - get_height(node.right) if node else 0

def right_rotate(y):
    x = y.left
    t2 = x.right
    x.right = y
    y.left = t2
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    return x

def left_rotate(x):
    y = x.right
    t2 = y.left
    y.left = x
    x.right = t2
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    return y`,
    explanation: 'Fundamental O(1) rotation primitives for self-balancing trees.'
  },
  runnableCode: {
    code: `y = AVLNode(3)
y.left = AVLNode(2)
y.left.left = AVLNode(1)
y.height = 3
y.left.height = 2
new_root = right_rotate(y)
print(new_root.val, new_root.left.val, new_root.right.val)`,
    expectedOutput: `2 1 3`
  },
  lineByLineExplanation: [
    { line: 17, code: 'x.right = y; y.left = t2', explanation: 'Performs pointer rotation: child x becomes parent, original parent y becomes right child, orphan subtree t2 transferred.' },
    { line: 19, code: 'y.height = 1 + max(...)', explanation: 'Recalculates height of y first (since it is now a child of x), then recalculates x.' }
  ],
  edgeCases: [
    { case: 'Rotations during deletion', handling: 'Deletion may require multiple rotations propagating all the way up to the root.', example: 'Cascading rebalances' }
  ],
  commonMistakes: [
    { mistake: 'Updating parent height before updating child height after rotation', solution: 'Always update the displaced lower node (y) before updating the promoted root node (x).', codeExample: 'y.height = ...; x.height = ...' }
  ],
  applications: [
    { industry: 'In-Memory Caches', application: 'Lookup-intensive key-value databases', benefit: 'Strictly bounded search latency faster than Red-Black trees for read-heavy workloads.' }
  ],
  practiceQuestions: [
    { id: 'pq-avl-1', question: 'Why are Red-Black trees often preferred over AVL trees in general-purpose libraries (like C++ std::map)?', hint: 'Consider the number of rotations on insertion/deletion.', answer: 'Red-Black trees have looser balance requirements (height <= 2 log n), requiring fewer rotations on inserts/deletes, making them faster for write-heavy workloads.' }
  ],
  quiz: [
    { id: 'q-avl-1', question: 'What rotation sequence resolves a Left-Right (LR) imbalance?', options: ['Left rotate the left child, then right rotate the root', 'Right rotate root twice', 'Left rotate root', 'Swap values without rotating'], correctIndex: 0, explanation: 'LR case is resolved by a left rotation on the left child (transforming to LL), followed by a right rotation on the root.' }
  ],
  codingChallenge: {
    title: 'AVL Insert Implementation',
    problem: 'Implement AVL insertion that rebalances the tree after inserting a new key.',
    hints: ['Check get_balance after standard BST insertion.', 'Apply matching rotation if balance is > 1 or < -1.'],
    starterCode: `def avl_insert(root: AVLNode | None, key: int) -> AVLNode:
    # TODO: Implement AVL insert with rebalancing
    pass`,
    solution: `def avl_insert(root: AVLNode | None, key: int) -> AVLNode:
    if not root:
        return AVLNode(key)
    if key < root.val:
        root.left = avl_insert(root.left, key)
    elif key > root.val:
        root.right = avl_insert(root.right, key)
    else:
        return root

    root.height = 1 + max(get_height(root.left), get_height(root.right))
    balance = get_balance(root)

    # LL
    if balance > 1 and key < root.left.val:
        return right_rotate(root)
    # RR
    if balance < -1 and key > root.right.val:
        return left_rotate(root)
    # LR
    if balance > 1 and key > root.left.val:
        root.left = left_rotate(root.left)
        return right_rotate(root)
    # RL
    if balance < -1 and key < root.right.val:
        root.right = right_rotate(root.right)
        return left_rotate(root)

    return root`
  },
  summary: {
    keyTakeaways: ['AVL trees maintain balance factor in {-1, 0, 1}.', '4 rotation types (LL, RR, LR, RL) guarantee O(log n) worst-case height.'],
    nextLessonId: 'dsa-tree-segment',
    nextLessonTitle: 'Segment Trees',
    nextLessonModuleId: 'dsa-module-8'
  }
};

m8Lessons['dsa-tree-segment'] = {
  id: 'dsa-tree-segment',
  moduleId: 'dsa-module-8',
  title: 'Segment Trees',
  subtitle: 'Range Queries, Point Updates, and Lazy Propagation in O(log n)',
  order: 9,
  readTimeMinutes: 24,
  difficulty: 'Advanced',
  visualizerType: 'tree',
  objectives: [
    'Construct a Segment Tree from an array in O(n) time.',
    'Execute Range Sum/Min/Max queries in O(log n) time.',
    'Perform single-element updates in O(log n) time.',
    'Understand Lazy Propagation for range updates in O(log n).'
  ],
  prerequisites: ['Tree Terminology and Representation', 'Arrays and Matrices: Prefix Sums'],
  analogy: {
    title: 'The Regional Sales Dashboard',
    text: 'A company tracks sales across 1,000 stores. Instead of summing stores individually every time a VP asks for regional totals, regional managers maintain subtotal tallies for North, South, East, West, and district sub-tallies. When one store reports a sale, only its immediate district and regional tallies are updated.',
    metaphor: 'A segment tree precomputes intervals so any arbitrary range is covered by at most 2*log(n) nodes.'
  },
  problemSolved: {
    title: 'Handling Dynamic Range Queries with Frequent Updates',
    description: 'Prefix sums allow O(1) range queries but require slow O(n) updates. A raw array allows O(1) updates but requires slow O(n) range queries. Segment Trees balance both operations at O(log n) each.',
    keyPoints: [
      'Both range query and point update take O(log n).',
      'Supports any associative operation (Sum, Min, Max, GCD).',
      'Array representation requires 4n storage.'
    ]
  },
  intuition: {
    overview: 'Each tree node represents an interval [L, R]. Leaf nodes represent single elements [i, i]. Parent node combines results of left child [L, mid] and right child [mid+1, R].',
    steps: [
      { step: 1, title: 'Build Tree', description: 'Recursively build left and right halves; node.val = left.val + right.val.' },
      { step: 2, title: 'Range Query', description: 'If query range completely overlaps node interval, return node.val. If no overlap, return 0. Else split and sum.' },
      { step: 3, title: 'Point Update', description: 'Recurse down to target leaf, update value, and rebuild ancestor sums on return path.' }
    ]
  },
  formalDefinition: {
    text: 'A Segment Tree for array A of size n is a binary tree where root represents [0, n-1]. For node representing [l, r], children represent [l, m] and [m+1, r] with m = \\lfloor (l+r)/2 \\rfloor. Stored in 1D array of size \\le 4n.',
    latex: 'T_{\\text{build}}(n) = O(n), \\quad T_{\\text{query}}(n) = O(\\log n), \\quad T_{\\text{update}}(n) = O(\\log n)'
  },
  complexity: {
    overview: 'Build: O(n). Query: O(log n). Update: O(log n). Space: O(n).',
    cases: [
      { case: 'Best', time: 'O(log n)', space: 'O(n)', explanation: 'Logarithmic path traversal.' },
      { case: 'Average', time: 'O(log n)', space: 'O(n)', explanation: 'Visits at most 4 nodes per level.' },
      { case: 'Worst', time: 'O(log n)', space: 'O(n)', explanation: 'Height is strictly ceil(log2(n)).' }
    ],
    spaceNote: 'Array size 4n memory overhead.'
  },
  workedExample: {
    title: 'Range Sum Query on [1, 3, 5, 7, 9, 11] for range [1, 4]',
    input: 'Query range [1, 4] (values 3 + 5 + 7 + 9 = 24)',
    steps: [
      { step: 1, action: 'Root [0, 5]', state: 'Partial overlap -> split into [0, 2] and [3, 5]', explanation: 'Subdivides query.' },
      { step: 2, action: 'Left child [0, 2]', state: 'Query [1, 2]: split into [0, 0] (skip) and [1, 2] (val = 3 + 5 = 8)', explanation: 'Extracts 8.' },
      { step: 3, action: 'Right child [3, 5]', state: 'Query [3, 4]: split into [3, 4] (val = 7 + 9 = 16) and [5, 5] (skip)', explanation: 'Extracts 16.' },
      { step: 4, action: 'Sum parts', state: '8 + 16 = 24', explanation: 'Total computed in 6 node visits.' }
    ],
    finalOutput: 'Range Sum = 24'
  },
  visualExplanation: {
    title: 'Binary Interval Decomposition',
    description: 'Visualizing intervals splitting recursively down to single leaf items.',
    features: ['Interval brackets [L, R] marked on each node', 'Canonical green nodes selected to satisfy query']
  },
  pseudocode: {
    title: 'Segment Tree Build & Query',
    code: `class NumArray:
    def __init__(nums):
        n = len(nums)
        tree = array of size 4*n
        build(0, 0, n - 1)

    def query(node, l, r, ql, qr):
        if ql <= l and r <= qr: return tree[node]
        if r < ql or l > qr: return 0
        mid = (l + r) // 2
        return query(2*node+1, l, mid, ql, qr) + query(2*node+2, mid+1, r, ql, qr)`
  },
  pythonCode: {
    title: 'Python Segment Tree Class',
    code: `class SegmentTree:
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)
        if self.n > 0:
            self._build(nums, 0, 0, self.n - 1)

    def _build(self, nums, node, l, r):
        if l == r:
            self.tree[node] = nums[l]
            return
        mid = (l + r) // 2
        self._build(nums, 2 * node + 1, l, mid)
        self._build(nums, 2 * node + 2, mid + 1, r)
        self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def update(self, idx: int, val: int):
        def _update(node, l, r):
            if l == r:
                self.tree[node] = val
                return
            mid = (l + r) // 2
            if idx <= mid:
                _update(2 * node + 1, l, mid)
            else:
                _update(2 * node + 2, mid + 1, r)
            self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]
        _update(0, 0, self.n - 1)

    def query(self, ql: int, qr: int) -> int:
        def _query(node, l, r):
            if ql <= l and r <= qr:
                return self.tree[node]
            if r < ql or l > qr:
                return 0
            mid = (l + r) // 2
            return _query(2 * node + 1, l, mid) + _query(2 * node + 2, mid + 1, r)
        return _query(0, 0, self.n - 1)`,
    explanation: 'Array-based Segment Tree implementation supporting O(log n) update and range sum query.'
  },
  runnableCode: {
    code: `st = SegmentTree([1, 3, 5, 7, 9, 11])
print(st.query(1, 4)) # 3 + 5 + 7 + 9 = 24
st.update(1, 10)     # change 3 to 10
print(st.query(1, 4)) # 10 + 5 + 7 + 9 = 31`,
    expectedOutput: `24\n31`
  },
  lineByLineExplanation: [
    { line: 31, code: 'if ql <= l and r <= qr: return self.tree[node]', explanation: 'Complete overlap: current node interval is entirely enclosed in query, returns precomputed subtotal in O(1).' },
    { line: 33, code: 'if r < ql or l > qr: return 0', explanation: 'Disjoint: current node is completely outside query range, returns neutral element (0 for sum).' }
  ],
  edgeCases: [
    { case: 'Single element array', handling: 'Tree initializes with 1 leaf, queries return element in O(1).', example: '[42]' }
  ],
  commonMistakes: [
    { mistake: 'Allocating 2n instead of 4n for the tree array', solution: 'A complete binary tree for arbitrary n can require up to 4n array elements; always size at 4n.', codeExample: 'self.tree = [0] * (4 * n)' }
  ],
  applications: [
    { industry: 'Quantitative Finance', application: 'Continuous stock price dynamic range min/max tracking', benefit: 'Instantly computes period highs/lows with streaming price updates.' }
  ],
  practiceQuestions: [
    { id: 'pq-seg-1', question: 'How does Lazy Propagation optimize range updates (e.g. add +5 to all elements in range [L, R])?', hint: 'Postpone updates to child nodes until queried.', answer: 'Store pending updates in a lazy array on canonical nodes, only pushing updates down to child nodes when child values are accessed.' }
  ],
  quiz: [
    { id: 'q-seg-1', question: 'What is the time complexity to build a Segment Tree of n elements?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correctIndex: 0, explanation: 'Building a segment tree visits each of the ~2n nodes once, running in O(n) linear time.' }
  ],
  codingChallenge: {
    title: 'Range Minimum Query (RMQ)',
    problem: 'Modify the Segment Tree concept to support Range Minimum Query: return the minimum element in range [L, R].',
    hints: ['Neutral element is float("inf") and combination function is min(left, right).'],
    starterCode: `class RangeMinSegmentTree:
    def __init__(self, nums: list[int]):
        # TODO: Implement RMQ segment tree
        pass

    def query_min(self, ql: int, qr: int) -> int:
        pass`,
    solution: `class RangeMinSegmentTree:
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.tree = [float('inf')] * (4 * self.n)
        if self.n > 0:
            self._build(nums, 0, 0, self.n - 1)

    def _build(self, nums, node, l, r):
        if l == r:
            self.tree[node] = nums[l]
            return
        mid = (l + r) // 2
        self._build(nums, 2 * node + 1, l, mid)
        self._build(nums, 2 * node + 2, mid + 1, r)
        self.tree[node] = min(self.tree[2 * node + 1], self.tree[2 * node + 2])

    def query_min(self, ql: int, qr: int) -> int:
        def _query(node, l, r):
            if ql <= l and r <= qr:
                return self.tree[node]
            if r < ql or l > qr:
                return float('inf')
            mid = (l + r) // 2
            return min(_query(2 * node + 1, l, mid), _query(2 * node + 2, mid + 1, r))
        return _query(0, 0, self.n - 1)`
  },
  summary: {
    keyTakeaways: ['Segment trees support O(log n) dynamic range queries and updates.', 'Array size 4n is required to prevent out-of-bounds indexing.'],
    nextLessonId: 'dsa-tree-fenwick',
    nextLessonTitle: 'Fenwick Tree (Binary Indexed Tree)',
    nextLessonModuleId: 'dsa-module-8'
  }
};

m8Lessons['dsa-tree-fenwick'] = {
  id: 'dsa-tree-fenwick',
  moduleId: 'dsa-module-8',
  title: 'Fenwick Tree (Binary Indexed Tree)',
  subtitle: 'Bitwise Twos-Complement Indexing and Compact Prefix Sum Manipulation in O(log n)',
  order: 10,
  readTimeMinutes: 22,
  difficulty: 'Advanced',
  visualizerType: 'tree',
  objectives: [
    'Demystify the lowest set bit trick: i & (-i) using two\'s complement arithmetic.',
    'Build a Binary Indexed Tree (BIT) with only O(n) space and tiny memory footprint.',
    'Execute prefix sum queries in O(log n) time by stripping lowest set bits.',
    'Execute point updates in O(log n) time by cascading lowest set bit additions.'
  ],
  prerequisites: ['Segment Trees', 'Arrays and Matrices: Prefix Sums'],
  analogy: {
    title: 'The Binary Ruler',
    text: 'A metric ruler has millimeter marks, centimeter marks, and decimeter marks. To measure a length like 13 cm, you measure 8 cm (largest power of 2), plus 4 cm, plus 1 cm. Each mark on the ruler pre-measures a power-of-two interval.',
    metaphor: 'Each index i in a Fenwick tree stores the sum of the last (i & -i) elements.'
  },
  problemSolved: {
    title: 'Minimal Memory Dynamic Prefix Sums',
    description: 'Segment Trees require 4n memory and complex pointer/recursion trees. A Fenwick Tree provides O(log n) dynamic prefix sums and point updates in strictly 1n memory using elegant bitwise manipulations with zero pointers.',
    keyPoints: [
      'Strictly O(n) memory (1x array size).',
      'No pointers, recursion, or dynamic allocation.',
      'Extremely fast constant factors due to bitwise operations.'
    ]
  },
  intuition: {
    overview: 'Every integer can be uniquely written as a sum of powers of 2. Fenwick tree index i covers a range of length `lowbit(i) = i & (-i)`. Query walks backwards (i -= i & -i); update walks forwards (i += i & -i).',
    steps: [
      { step: 1, title: 'Lowbit Extraction', description: 'lowbit = i & (-i) isolates the lowest set bit in binary.' },
      { step: 2, title: 'Query Prefix Sum', description: 'While i > 0: sum += tree[i]; i -= i & (-i).' },
      { step: 3, title: 'Point Update', description: 'While i <= n: tree[i] += delta; i += i & (-i).' }
    ]
  },
  formalDefinition: {
    text: 'In a 1-indexed Fenwick Tree, element tree[i] stores the sum of array values in range (i - \\text{lowbit}(i), i] where \\text{lowbit}(i) = i \\land (-i).',
    latex: '\\text{tree}[i] = \\sum_{k = i - (i \\land -i) + 1}^{i} A[k]'
  },
  complexity: {
    overview: 'Query: O(log n). Update: O(log n). Space: O(n) strictly.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(n)', explanation: 'Indices that are powers of 2 (single bit set).' },
      { case: 'Average', time: 'O(log n)', space: 'O(n)', explanation: 'Average number of set bits is (log2 n)/2.' },
      { case: 'Worst', time: 'O(log n)', space: 'O(n)', explanation: 'At most log2(n) bit shifts.' }
    ],
    spaceNote: 'Requires only n + 1 integers of storage.'
  },
  workedExample: {
    title: 'Query Prefix Sum at Index 7 (Binary 0111)',
    input: 'Index 7 in binary is 0111_2',
    steps: [
      { step: 1, action: 'Step 1: i=7 (0111_2)', state: 'lowbit(7) = 1 -> add tree[7]', explanation: 'Subtract 1: i becomes 6 (0110_2).' },
      { step: 2, action: 'Step 2: i=6 (0110_2)', state: 'lowbit(6) = 2 -> add tree[6]', explanation: 'Subtract 2: i becomes 4 (0100_2).' },
      { step: 3, action: 'Step 3: i=4 (0100_2)', state: 'lowbit(4) = 4 -> add tree[4]', explanation: 'Subtract 4: i becomes 0 (0000_2). Loop ends.' }
    ],
    finalOutput: 'prefix_sum(7) = tree[7] + tree[6] + tree[4] (accumulated in 3 steps)'
  },
  visualExplanation: {
    title: 'Fenwick Tree Range Decomposition',
    description: 'Visualizing tree[i] interval coverage as power-of-two blocks.',
    features: ['tree[4] covers 1..4', 'tree[6] covers 5..6', 'tree[7] covers 7..7']
  },
  pseudocode: {
    title: 'Fenwick Tree Implementation',
    code: `class FenwickTree:
    def __init__(n):
        tree = array of size n + 1 filled with 0

    def add(i, delta):
        while i <= n:
            tree[i] += delta
            i += i & (-i)

    def query(i):
        sum = 0
        while i > 0:
            sum += tree[i]
            i -= i & (-i)
        return sum`
  },
  pythonCode: {
    title: 'Python Fenwick Tree Class',
    code: `class FenwickTree:
    def __init__(self, size: int):
        self.n = size
        self.tree = [0] * (size + 1)

    def add(self, i: int, delta: int) -> None:
        # 1-indexed
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i: int) -> int:
        # Returns prefix sum of elements from 1 to i
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)
        return total

    def range_query(self, left: int, right: int) -> int:
        return self.query(right) - self.query(left - 1)`,
    explanation: 'Ultra-compact 1-indexed Binary Indexed Tree using bitwise lowbit.'
  },
  runnableCode: {
    code: `nums = [1, 3, 5, 7, 9, 11]
bit = FenwickTree(len(nums))
for idx, val in enumerate(nums, 1):
    bit.add(idx, val)
print(bit.range_query(2, 5)) # 3 + 5 + 7 + 9 = 24
bit.add(2, 7)                # increase index 2 by 7 (from 3 to 10)
print(bit.range_query(2, 5)) # 10 + 5 + 7 + 9 = 31`,
    expectedOutput: `24\n31`
  },
  lineByLineExplanation: [
    { line: 9, code: 'i += i & (-i)', explanation: 'Adds lowest set bit to propagate update to all covering power-of-two super-intervals.' },
    { line: 16, code: 'i -= i & (-i)', explanation: 'Subtracts lowest set bit to accumulate preceding non-overlapping prefix blocks.' }
  ],
  edgeCases: [
    { case: '0-index usage', handling: '0 & (-0) = 0 causes an infinite loop! Fenwick Trees must always be 1-indexed.', example: 'Must pass i >= 1.' }
  ],
  commonMistakes: [
    { mistake: 'Passing index 0 to add or query', solution: 'Fenwick trees require 1-based indexing; add 1 to convert from 0-based indices.', codeExample: 'bit.add(idx + 1, val)' }
  ],
  applications: [
    { industry: 'Data Science', application: 'Counting inversions in an array in O(n log n)', benefit: 'Coordinate compression + Fenwick tree inversion counting.' }
  ],
  practiceQuestions: [
    { id: 'pq-fen-1', question: 'Why does i & (-i) isolate the lowest set bit in binary representation?', hint: 'Recall two\'s complement: -i = ~i + 1.', answer: 'In two\'s complement, -i flips all bits and adds 1. This keeps the lowest set bit as 1 while inverting all higher bits, so ANDing i with -i clears all bits except the lowest set bit.' }
  ],
  quiz: [
    { id: 'q-fen-1', question: 'What happens if you run `i & (-i)` on index 0 in a Fenwick Tree?', options: ['It evaluates to 0, causing an infinite loop in while loops', 'It raises a ZeroDivisionError', 'It returns 1', 'It crashes Python'], correctIndex: 0, explanation: '0 & (-0) = 0, so i += 0 or i -= 0 loops infinitely. Fenwick trees must always be 1-indexed.' }
  ],
  codingChallenge: {
    title: 'Count of Smaller Numbers After Self',
    problem: 'Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].',
    hints: ['Use coordinate compression and traverse nums from right to left with a Fenwick Tree.'],
    starterCode: `def count_smaller(nums: list[int]) -> list[int]:
    # TODO: Implement using Fenwick Tree
    pass`,
    solution: `def count_smaller(nums: list[int]) -> list[int]:
    ranks = {v: i + 1 for i, v in enumerate(sorted(set(nums)))}
    bit = [0] * (len(ranks) + 1)
    
    def add(idx, val):
        while idx < len(bit):
            bit[idx] += val
            idx += idx & (-idx)
            
    def query(idx):
        s = 0
        while idx > 0:
            s += bit[idx]
            idx -= idx & (-idx)
        return s

    res = []
    for num in reversed(nums):
        rank = ranks[num]
        res.append(query(rank - 1))
        add(rank, 1)
    return list(reversed(res))`
  },
  summary: {
    keyTakeaways: ['Fenwick trees provide O(log n) prefix sums with minimal O(n) memory.', 'Always maintain 1-based indexing to avoid infinite zero loops.'],
    nextLessonId: 'dsa-heap-introduction',
    nextLessonTitle: 'Min Heap and Max Heap',
    nextLessonModuleId: 'dsa-module-9'
  }
};

const dsa8Path = path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-8.ts');
writeModuleFile(dsa8Path, m8.data, m8Lessons);
console.log('Module 8 completed! Authored: ' + Object.keys(m8Lessons).length);
