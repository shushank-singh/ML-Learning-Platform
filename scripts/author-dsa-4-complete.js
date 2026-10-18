const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m4 = getExistingDSALessons(4);
const m4Lessons = { ...m4.lessons };

// 6. Fast and Slow Pointer Technique
m4Lessons['dsa-ll-fast-slow'] = {
  id: 'dsa-ll-fast-slow',
  moduleId: 'dsa-module-4',
  title: 'Fast and Slow Pointer Technique',
  subtitle: 'The Tortoise and Hare Paradigm for Midpoints, Cycles & Kth Elements',
  order: 6,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'linked-list',
  objectives: [
    'Master the 2x velocity differential (fast moves 2 steps, slow moves 1 step).',
    'Find the exact midpoint of a linked list in a single pass without counting length.',
    'Retrieve the k-th node from the end using a fixed-gap pointer pair.',
    'Differentiate between even and odd length midpoint termination conditions.'
  ],
  prerequisites: [
    'Singly Linked Lists',
    'Two Pointer Technique'
  ],
  analogy: {
    title: 'The Circular Track Race',
    text: 'A tortoise runs at 1 meter per second, and a hare runs at 2 meters per second around an athletic track. When the hare reaches the finish line (100% of the race), the tortoise is guaranteed to be standing at exactly the 50% midpoint mark. If the track is an endless closed loop, the faster hare will eventually lap the slower tortoise from behind, proving the presence of a circle.',
    metaphor: 'Moving fast at 2x and slow at 1x guarantees slow lands at midpoint when fast hits the finish line.'
  },
  problemSolved: {
    title: 'Finding Midpoint and Relative Offsets in a Single Pass',
    description: 'Finding the middle of a linked list naively requires two passes: first pass to count total length n, second pass to walk n/2 steps. Fast and slow pointers find the exact middle node in a single traversal pass of O(n) time and O(1) space.',
    keyPoints: [
      'Eliminates two-pass counting traversals',
      'Requires strictly O(1) auxiliary memory',
      'Crucial sub-routine in Merge Sort on Linked Lists and Palindrome List validation'
    ]
  },
  intuition: {
    overview: 'Initialize slow = head, fast = head. While fast and fast.next exist, slow = slow.next, fast = fast.next.next. When fast reaches end, slow is at the middle.',
    steps: [
      { step: 1, title: 'Initialize at Head', description: 'slow = head, fast = head.' },
      { step: 2, title: 'Step Differential', description: 'In each loop iteration: slow advances 1 step; fast advances 2 steps.' },
      { step: 3, title: 'Termination Check', description: 'For odd length, fast.next is None. For even length, fast is None. Slow is at middle.' }
    ]
  },
  formalDefinition: {
    text: 'Let list L have length n. In step t, slow is at index t and fast is at index 2t. When fast reaches n-1 (odd n) or n (even n), t = \\lfloor n/2 \\rfloor, placing slow precisely at the midpoint.',
    latex: '\\text{Pos}(\\text{fast}) = 2 \\cdot \\text{Pos}(\\text{slow}) \\implies \\text{When } \\text{fast} \\ge n-1, \\, \\text{slow} = \\lfloor n / 2 \\rfloor'
  },
  complexity: {
    overview: 'Time: O(n) single pass (n/2 loop iterations). Space: O(1) using two pointer variables.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'List of length 1 or 2.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Traverses n/2 steps.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Full single pass.' }
    ],
    spaceNote: 'Operates in-place with zero memory allocation.'
  },
  workedExample: {
    title: 'Finding Middle of [1 -> 2 -> 3 -> 4 -> 5]',
    input: 'Head -> 1 -> 2 -> 3 -> 4 -> 5 -> None',
    steps: [
      { step: 1, action: 'Initial State', state: 'slow = 1, fast = 1', explanation: 'Both start at head.' },
      { step: 2, action: 'Iteration 1', state: 'slow = 2, fast = 3', explanation: 'slow moves 1 step; fast moves 2 steps.' },
      { step: 3, action: 'Iteration 2', state: 'slow = 3, fast = 5', explanation: 'slow moves to 3; fast moves to 5.' },
      { step: 4, action: 'Loop Termination', state: 'fast.next is None!', explanation: 'Loop exits because fast cannot take 2 more steps. Slow is at node 3.' }
    ],
    finalOutput: 'Midpoint is node 3 in exactly 2 iterations.'
  },
  visualExplanation: {
    title: 'The Dual-Speed Cursor Animation',
    description: 'Tortoise cursor moves one node forward while Hare cursor hops two nodes forward. When Hare touches the right wall, Tortoise sits at the exact geometric center.',
    features: ['1x velocity tortoise cursor', '2x velocity hare cursor', 'Even vs odd midpoint landing']
  },
  pseudocode: {
    title: 'Middle of Linked List',
    code: `def find_middle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`
  },
  pythonCode: {
    title: 'Middle of Linked List and Palindrome Validation in Python',
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def is_palindrome_list(head):
    if not head or not head.next:
        return True

    # Step 1: Find midpoint using fast/slow
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Step 2: Reverse second half
    prev = None
    curr = slow
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt

    # Step 3: Compare first and second half
    first, second = head, prev
    while second:
        if first.val != second.val:
            return False
        first = first.next
        second = second.next
    return True

# Test: 1 -> 2 -> 2 -> 1
p_head = ListNode(1, ListNode(2, ListNode(2, ListNode(1))))
print("Is 1->2->2->1 palindrome:", is_palindrome_list(p_head)) # Expected: True`,
    explanation: 'Combines fast/slow midpoint finding with in-place list reversal to validate palindrome in O(n) time and O(1) space.'
  },
  runnableCode: {
    code: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def get_kth_from_end(head, k):
    fast = slow = head
    for _ in range(k):
        if not fast: return None
        fast = fast.next
    while fast:
        slow = slow.next
        fast = fast.next
    return slow.val

# 1 -> 2 -> 3 -> 4 -> 5
lst = Node(1, Node(2, Node(3, Node(4, Node(5)))))
print("2nd from end (expected 4):", get_kth_from_end(lst, 2))`,
    expectedOutput: '2nd from end (expected 4): 4'
  },
  lineByLineExplanation: [
    { lines: '7-9', codeSnippet: 'for _ in range(k): fast = fast.next', explanation: 'Creates a fixed lead of k nodes between fast and slow.' },
    { lines: '10-12', codeSnippet: 'while fast: slow = slow.next; fast = fast.next', explanation: 'Maintains the k-node gap until fast falls off the end; slow is at kth-from-end.' }
  ],
  edgeCases: [
    { case: 'List with even number of nodes (e.g. 4 nodes)', handling: 'Returns second middle node (index 2) with `while fast and fast.next:`.', example: '[1, 2, 3, 4] -> returns 3' },
    { case: 'Single node list', handling: 'Loop does not run, returns head directly.', example: '[1] -> returns 1' }
  ],
  commonMistakes: [
    { mistake: 'Writing `while fast.next and fast:`', solution: 'Must check `fast` first! If `fast` is None, accessing `fast.next` raises AttributeError.' },
    { mistake: 'Forgetting that k can be greater than list length in kth-from-end.', solution: 'Check `if not fast: return None` inside the initial lead loop.' }
  ],
  applications: [
    { industry: 'Data Pipelines', application: 'Streaming Window Median', benefit: 'Maintains running median pointer across linked stream elements without re-indexing.' },
    { industry: 'Algorithm Engineering', application: 'Merge Sort on Linked Lists', benefit: 'Splits linked lists into two equal halves at midpoint in O(n) time before merging.' }
  ],
  practiceQuestions: [
    { id: 'dsa-4-6-q1', question: 'How can you adjust fast/slow pointers so that on an even-length list, it returns the FIRST middle node instead of the second?', hint: 'Where should fast start?', answer: 'Initialize `fast = head.next` instead of `fast = head`. For [1, 2, 3, 4], slow will stop at node 2 instead of node 3.' },
    { id: 'dsa-4-6-q2', question: 'Why does finding the middle of a linked list with fast and slow pointers use less operations than counting length first?', hint: 'How many total node accesses occur?', answer: 'Both take O(n) time, but counting length requires n reads in pass 1 plus n/2 reads in pass 2 (total 1.5n operations). Fast/slow takes n reads total in a single pass.' },
    { id: 'dsa-4-6-q3', question: 'Can fast and slow pointers be used to detect a cycle?', hint: 'What happens when fast laps slow?', answer: 'Yes, this is Floyd’s Cycle Detection algorithm. If a cycle exists, fast will eventually equal slow inside the loop.' }
  ],
  quiz: [
    {
      id: 'dsa-4-6-quiz-1',
      question: 'What is the correct loop condition for finding the second middle node of a linked list?',
      options: ['while fast and fast.next:', 'while slow != fast:', 'while fast.next is not None:', 'while slow is not None:'],
      correctIndex: 0,
      explanation: 'Checking `while fast and fast.next:` ensures `fast` can safely take 2 steps forward without triggering a null dereference.'
    },
    {
      id: 'dsa-4-6-quiz-2',
      question: 'In an even-length list [10, 20, 30, 40], what does `while fast and fast.next:` return?',
      options: ['30 (second middle)', '20 (first middle)', '40 (tail)', '10 (head)'],
      correctIndex: 0,
      explanation: 'When fast starts at head, on [10, 20, 30, 40] it steps: iter 1 (slow=20, fast=30), iter 2 (slow=30, fast=None), exiting with slow at 30.'
    },
    {
      id: 'dsa-4-6-quiz-3',
      question: 'To find the k-th node from the end of a linked list, how many steps ahead should the fast pointer be initialized?',
      options: ['k steps', '2k steps', 'k / 2 steps', '1 step'],
      correctIndex: 0,
      explanation: 'Advancing fast by k steps creates a distance gap of k nodes; when fast reaches the end, slow will be k nodes behind.'
    }
  ],
  codingChallenge: {
    title: 'Middle of the Linked List',
    problem: 'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.',
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# Test on 1 -> 2 -> 3 -> 4 -> 5 -> 6
head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5, ListNode(6))))))
mid = middle_node(head)
print("Middle node val (expected 4):", mid.val)`,
    solution: `def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
    hints: [
      'Initialize slow and fast at head.',
      'Advance slow by 1 step, fast by 2 steps.',
      'Return slow when loop terminates.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Fast (2x) and slow (1x) pointers locate the midpoint in a single O(n) pass.',
      'Condition `while fast and fast.next:` avoids null pointer exceptions.',
      'Fixed-lead pointers find the k-th node from the end in one pass.',
      'Foundation for linked list Merge Sort and Palindrome List testing.'
    ],
    nextLessonId: 'dsa-ll-cycle-detection',
    nextLessonTitle: "Floyd's Cycle Detection Algorithm",
    nextLessonModuleId: 'dsa-module-4'
  }
};

// 7. Floyd's Cycle Detection Algorithm
m4Lessons['dsa-ll-cycle-detection'] = {
  id: 'dsa-ll-cycle-detection',
  moduleId: 'dsa-module-4',
  title: "Floyd's Cycle Detection Algorithm",
  subtitle: 'The Tortoise and Hare Cycle Proof, Entry Node Derivation & In-Place Resolution',
  order: 7,
  readTimeMinutes: 28,
  difficulty: 'Intermediate',
  visualizerType: 'linked-list',
  objectives: [
    'Understand why naive cycle detection with a hash set uses O(n) memory.',
    'Prove why fast and slow pointers must collide if a cycle exists (Floyd’s algorithm).',
    'Derive the mathematical proof that distance from head to cycle entry equals distance from collision to cycle entry.',
    'Find the cycle start node and break the cycle in O(n) time and O(1) space.'
  ],
  prerequisites: [
    'Fast and Slow Pointer Technique',
    'Modular arithmetic and algebraic proofs'
  ],
  analogy: {
    title: 'The Closed Running Track Lapping',
    text: 'If two runners run on an open straight highway, the faster runner will pull ahead and the distance between them will grow forever; they will never meet again. But if the road merges into a closed 400-meter circular track, the distance between them decreases by 1 meter every second modulo 400. Inevitably, the faster runner will lap the slower runner from behind, and they will bump into each other. Bumping into each other is physical proof that the track contains a loop.',
    metaphor: 'If fast and slow pointers ever point to the exact same memory address, a cycle exists.'
  },
  problemSolved: {
    title: 'Detecting Memory Corruption and Infinite Loops in O(1) Space',
    description: 'Accidental circular references in linked lists or graphs cause infinite loops and memory leaks. Detecting cycles with a visited hash set requires O(n) auxiliary memory. Floyd’s Tortoise and Hare algorithm detects cycles and locates their exact entry node in O(n) time and strictly O(1) auxiliary space.',
    keyPoints: [
      'Detects cycle presence in O(n) time and O(1) space',
      'Locates the exact entry node of the cycle',
      'Mathematical proof: 2(L + x) = L + kC + x implies L = kC - x'
    ]
  },
  intuition: {
    overview: 'Phase 1: Detect collision. Move slow by 1, fast by 2. If they meet at node C, a cycle exists. Phase 2: Find entry. Reset slow to head, leave fast at C. Advance both by 1 step. They will collide at the exact cycle entry node!',
    steps: [
      { step: 1, title: 'Collision Phase', description: 'slow advances 1, fast advances 2 until slow == fast (cycle) or fast is None (no cycle).' },
      { step: 2, title: 'Reset Pointer', description: 'Reset slow = head; leave fast at meeting point.' },
      { step: 3, title: 'Synchronous March', description: 'Move both slow and fast 1 step at a time. The node where they meet is the cycle start.' }
    ]
  },
  formalDefinition: {
    text: 'Let L be the distance from head to cycle entry. Let C be cycle length. Let x be distance from entry to collision point. Slow traveled L + x. Fast traveled 2(L + x). Since fast traveled k extra cycles: 2(L + x) = L + x + kC => L = kC - x = (k - 1)C + (C - x). Hence, advancing one pointer from head (distance L) and one pointer from collision point (distance C - x) causes them to meet at the cycle entry.',
    latex: '2(L + x) = L + kC + x \\implies L = kC - x \\implies L \\equiv C - x \\pmod C'
  },
  complexity: {
    overview: 'Time: O(n) where n is total nodes. Space: O(1) auxiliary space.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'No cycle, fast hits None after 1-2 steps.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Detects collision within 2 cycles.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Traverses full length and cycle.' }
    ],
    spaceNote: 'Operates entirely with pointer references without allocating any collections.'
  },
  workedExample: {
    title: 'Finding Cycle Entry in [3 -> 2 -> 0 -> -4 -> points back to 2]',
    input: 'Head at 3. Cycle entry is node 2. Cycle: 2 -> 0 -> -4 -> 2.',
    steps: [
      { step: 1, action: 'Detect Cycle', state: 'slow moves 1, fast moves 2', explanation: 'They collide at node -4.' },
      { step: 2, action: 'Reset Slow', state: 'slow = head (node 3), fast = node -4', explanation: 'slow is placed at head; fast remains at collision point.' },
      { step: 3, action: 'Step Together', state: 'slow steps to node 2; fast steps to node 2', explanation: 'Both advance 1 step: slow is at node 2, fast is at node 2. Match!' }
    ],
    finalOutput: 'Cycle entry correctly located at node with value 2 in O(n) time.'
  },
  visualExplanation: {
    title: 'The Lasso Geometry Proof',
    description: 'Visualizing the list as a lasso: a straight stem of length L leading into a loop of circumference C. The distance L from the head to the loop entry equals the remaining distance from the collision point around to the loop entry.',
    features: ['Straight stem length L', 'Circular loop circumference C', 'Collision meeting point', 'Equidistant convergence']
  },
  pseudocode: {
    title: "Floyd's Cycle Algorithm",
    code: `def detect_cycle_entry(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None # No cycle

    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    return slow # Cycle entry node`
  },
  pythonCode: {
    title: 'Floyd Cycle Detection and Cycle Start in Python',
    code: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def detect_cycle(head):
    if not head or not head.next:
        return None

    slow = fast = head
    # Phase 1: Detect if a cycle exists
    has_cycle = False
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            has_cycle = True
            break

    if not has_cycle:
        return None

    # Phase 2: Find cycle entry node
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return slow

# Build: 3 -> 2 -> 0 -> -4 -> loop to 2
node0 = ListNode(3)
node1 = ListNode(2)
node2 = ListNode(0)
node3 = ListNode(-4)
node0.next = node1
node1.next = node2
node2.next = node3
node3.next = node1 # Cycle back to 2!

entry = detect_cycle(node0)
print("Cycle entry node value:", entry.val if entry else "No cycle") # Expected: 2`,
    explanation: 'Implements both Phase 1 (collision) and Phase 2 (entry node resolution) in O(n) time and O(1) space.'
  },
  runnableCode: {
    code: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# Create cycle: 1 -> 2 -> 3 -> 4 -> 2
n4 = Node(4)
n3 = Node(3, n4)
n2 = Node(2, n3)
n1 = Node(1, n2)
n4.next = n2 # Cycle to 2

def has_cycle(head):
    s = f = head
    while f and f.next:
        s = s.next
        f = f.next.next
        if s == f: return True
    return False

print("Has cycle:", has_cycle(n1))`,
    expectedOutput: 'Has cycle: True'
  },
  lineByLineExplanation: [
    { lines: '14-18', codeSnippet: 'while f and f.next:\n    s = s.next\n    f = f.next.next\n    if s == f: return True', explanation: 'Tortoise and hare race: fast moves twice as fast; collision proves cycle.' }
  ],
  edgeCases: [
    { case: 'No cycle present', handling: 'fast reaches None; loop exits and returns None or False.', example: '1 -> 2 -> 3 -> None' },
    { case: 'Cycle is self-loop (node.next == node)', handling: 'Collision happens on first step; entry is the node itself.', example: '1 -> 1' }
  ],
  commonMistakes: [
    { mistake: 'Resetting fast to head instead of slow in Phase 2.', solution: 'Either pointer can be reset to head as long as the other stays at the collision point, but moving slow to head is standard.' },
    { mistake: 'Moving fast at 2 steps in Phase 2.', solution: 'In Phase 2, BOTH pointers must move at exactly 1 step per iteration!' }
  ],
  applications: [
    { industry: 'Cryptography', application: "Pollard's Rho Integer Factorization", benefit: 'Finds prime factors by detecting cycles in pseudo-random polynomial sequences x_{i+1} = (x_i^2 + 1) mod N.' },
    { industry: 'Programming Language Runtimes', application: 'Circular Reference Garbage Collection', benefit: 'Detects uncollectable cyclic reference graphs in Python/V8 heap engines.' }
  ],
  practiceQuestions: [
    { id: 'dsa-4-7-q1', question: 'Why does fast moving at 2x guarantee a collision with slow inside the cycle instead of skipping over it?', hint: 'What is the relative speed?', answer: 'The relative speed between fast and slow is 2 - 1 = 1 node per step. The distance between them decreases by exactly 1 in each iteration modulo C, making it mathematically impossible to skip over slow.' },
    { id: 'dsa-4-7-q2', question: 'How can you calculate the length of the cycle once a collision is detected?', hint: 'Freeze one pointer and advance the other.', answer: 'Keep slow fixed at the collision point and advance fast one step at a time, counting steps until fast == slow again. The step count is the exact cycle length C.' },
    { id: 'dsa-4-7-q3', question: 'How can you break (remove) the cycle in O(1) space?', hint: 'Find the predecessor of the cycle entry.', answer: 'Find the cycle entry node. Traverse the cycle to find the node whose `next` points to the entry node, and set its `next = None`.' }
  ],
  quiz: [
    {
      id: 'dsa-4-7-quiz-1',
      question: "What is the auxiliary space complexity of Floyd's Cycle Detection algorithm?",
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(C)'],
      correctIndex: 0,
      explanation: "Floyd's algorithm uses only two pointer variables (slow and fast), requiring strictly O(1) auxiliary memory."
    },
    {
      id: 'dsa-4-7-quiz-2',
      question: 'In Phase 2 of Floyd algorithm (finding the cycle entry node), how many steps do slow and fast take per iteration?',
      options: [
        'Both move 1 step at a time',
        'Slow moves 1 step, fast moves 2 steps',
        'Slow moves 2 steps, fast moves 1 step',
        'Fast jumps directly to the entry'
      ],
      correctIndex: 0,
      explanation: 'In Phase 2, both pointers move at the same speed of 1 step per iteration until they meet at the cycle entry node.'
    },
    {
      id: 'dsa-4-7-quiz-3',
      question: 'What is the relative speed between the fast (2 steps) and slow (1 step) pointer inside the cycle?',
      options: ['1 step per iteration', '2 steps per iteration', '0.5 steps per iteration', '3 steps per iteration'],
      correctIndex: 0,
      explanation: 'Because fast gains exactly 1 step on slow per iteration (2 - 1 = 1), the distance between them shrinks by 1 each step, guaranteeing they meet without hopping over each other.'
    }
  ],
  codingChallenge: {
    title: 'Linked List Cycle II (Find Entry Node)',
    problem: 'Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return None. Do not modify the linked list. Solve with O(1) memory.',
    starterCode: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def detect_cycle_entry(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None

    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    return slow`,
    solution: `def detect_cycle_entry(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None

    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    return slow`,
    hints: [
      'Phase 1: Run while fast and fast.next until slow == fast. If no collision, return None.',
      'Phase 2: Reset slow = head. Move both slow and fast 1 step at a time.',
      'Return the node where they meet.'
    ]
  },
  summary: {
    keyTakeaways: [
      "Floyd's algorithm detects cycles in O(n) time and O(1) space.",
      'Relative velocity of 1 step prevents fast from jumping over slow.',
      'Distance from head to entry equals distance from collision to entry (L = kC - x).',
      'Phase 2 moves both pointers at 1 step to converge at the cycle entrance.'
    ],
    nextLessonId: 'dsa-ll-merge-sorted',
    nextLessonTitle: 'Merging Sorted Linked Lists',
    nextLessonModuleId: 'dsa-module-4'
  }
};

// 8. Merging Sorted Linked Lists
m4Lessons['dsa-ll-merge-sorted'] = {
  id: 'dsa-ll-merge-sorted',
  moduleId: 'dsa-module-4',
  title: 'Merging Sorted Linked Lists',
  subtitle: 'Pointer Splicing, Dummy Head Idioms & Divide-and-Conquer Merge of K Lists',
  order: 8,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'linked-list',
  objectives: [
    'Merge two sorted linked lists in-place in O(n + m) time and O(1) space.',
    'Use a dummy head node to eliminate special cases when choosing the first node.',
    'Extend merging to K sorted linked lists using a Min-Heap / Priority Queue in O(N log k).',
    'Implement Divide and Conquer pair-merging for K lists with zero heap overhead.'
  ],
  prerequisites: [
    'Singly Linked Lists',
    'Insertion and Deletion in Linked Lists'
  ],
  analogy: {
    title: 'The Zipper Teeth Interlocking',
    text: 'A jacket zipper has two rows of teeth: the left track and the right track. As you pull the zipper slider upward, it compares the height of the next tooth on the left versus the right. It snaps the lower tooth into the central seam first, then the next lowest, alternating smoothly until both tracks are seamlessly intertwined into one unified sorted chain.',
    metaphor: 'Merging sorted lists splices existing node pointers into a single chain like interlocking zipper teeth.'
  },
  problemSolved: {
    title: 'Combining Pre-Sorted Sequences with Zero Copying',
    description: 'Merging two arrays of size n and m requires allocating a new array of size n + m and copying elements. In linked lists, merging requires zero element allocations; we simply splice the existing pointers, producing a merged list in O(n + m) time and O(1) auxiliary space.',
    keyPoints: [
      'In-place pointer splicing: zero new node allocations',
      'Dummy head `dummy = ListNode()` provides a clean anchor for the output list',
      'Merges K sorted lists in O(N log k) time using a min-heap or divide-and-conquer'
    ]
  },
  intuition: {
    overview: 'Maintain a pointer `tail` at the end of the merged list. Compare `l1.val` and `l2.val`. Connect `tail.next` to the smaller node and advance that list. Append any remaining nodes at the end.',
    steps: [
      { step: 1, title: 'Create Dummy Anchor', description: 'dummy = ListNode(0); tail = dummy.' },
      { step: 2, title: 'Compare and Splice', description: 'while l1 and l2: if l1.val <= l2.val: tail.next = l1; l1 = l1.next else: tail.next = l2; l2 = l2.next; tail = tail.next.' },
      { step: 3, title: 'Attach Remainder', description: 'tail.next = l1 or l2.' },
      { step: 4, title: 'Return Result', description: 'return dummy.next.' }
    ]
  },
  formalDefinition: {
    text: 'Given two sorted linked lists L1 and L2 of lengths n and m, the merge function produces a single sorted linked list L containing all n + m nodes such that L[i] <= L[i+1]. Total comparisons <= n + m - 1.',
    latex: '\\text{Time} = \\mathcal{O}(n + m), \\quad \\text{Auxiliary Space} = \\mathcal{O}(1)'
  },
  complexity: {
    overview: 'Two lists: O(n + m) time, O(1) space. K lists: O(N log k) time where N is total nodes across all k lists.',
    cases: [
      { case: 'Best', time: 'O(min(n, m))', space: 'O(1)', explanation: 'All elements in one list are smaller than the first element of the other list.' },
      { case: 'Average', time: 'O(n + m)', space: 'O(1)', explanation: 'Alternating interweaves across both lists.' },
      { case: 'Worst', time: 'O(n + m)', space: 'O(1)', explanation: 'Exhausts n + m - 1 comparisons.' }
    ],
    spaceNote: 'In-place pointer splicing uses strictly O(1) extra memory.'
  },
  workedExample: {
    title: 'Merging L1 = [1 -> 2 -> 4] and L2 = [1 -> 3 -> 4]',
    input: 'L1: 1 -> 2 -> 4, L2: 1 -> 3 -> 4',
    steps: [
      { step: 1, action: 'Compare 1 and 1', state: 'tail.next = L1 (1)', explanation: 'L1 advances to 2, tail advances to 1.' },
      { step: 2, action: 'Compare 2 and 1', state: 'tail.next = L2 (1)', explanation: 'L2 advances to 3, tail advances to 1.' },
      { step: 3, action: 'Compare 2 and 3', state: 'tail.next = L1 (2)', explanation: 'L1 advances to 4, tail advances to 2.' },
      { step: 4, action: 'Compare 4 and 3', state: 'tail.next = L2 (3)', explanation: 'L2 advances to 4, tail advances to 3.' },
      { step: 5, action: 'Compare 4 and 4', state: 'tail.next = L1 (4)', explanation: 'L1 is exhausted. Attach remainder L2 (4).' }
    ],
    finalOutput: 'Merged list: [1 -> 1 -> 2 -> 3 -> 4 -> 4]'
  },
  visualExplanation: {
    title: 'Zipper Splicing Animation',
    description: 'Two parallel chains with a tail pointer swinging back and forth, repointing its `next` pointer to whichever chain head has the smaller number, until one chain is empty.',
    features: ['Dummy head anchor', 'Alternating pointer splicing', 'O(1) final remainder link']
  },
  pseudocode: {
    title: 'Merge Two Sorted Lists',
    code: `def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 if l1 else l2
    return dummy.next`
  },
  pythonCode: {
    title: 'Merge Two Sorted Lists and Merge K Sorted Lists in Python',
    code: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next

# Merge K Sorted Lists using Min-Heap
def merge_k_lists(lists):
    dummy = ListNode(0)
    tail = dummy
    heap = [] # (val, id, node)

    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    while heap:
        val, i, node = heapq.heappop(heap)
        tail.next = node
        tail = tail.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next

# Test
l1 = ListNode(1, ListNode(2, ListNode(4)))
l2 = ListNode(1, ListNode(3, ListNode(4)))
merged = merge_two_lists(l1, l2)
res = []
while merged:
    res.append(merged.val)
    merged = merged.next
print("Merged 2 lists:", res) # [1, 1, 2, 3, 4, 4]`,
    explanation: 'Demonstrates both two-list merging and K-way merge using a min-heap priority queue.'
  },
  runnableCode: {
    code: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def merge(l1, l2):
    dummy = Node(0)
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next

a = Node(5, Node(10, Node(15)))
b = Node(2, Node(3, Node(20)))
res = merge(a, b)
out = []
while res:
    out.append(res.val)
    res = res.next
print("Merged:", out)`,
    expectedOutput: 'Merged: [2, 3, 5, 10, 15, 20]'
  },
  lineByLineExplanation: [
    { lines: '6-7', codeSnippet: 'dummy = Node(0)\ntail = dummy', explanation: 'Creates dummy head sentinel to anchor the head of the merged chain.' },
    { lines: '8-15', codeSnippet: 'while l1 and l2:\n    if l1.val <= l2.val:\n        tail.next = l1; l1 = l1.next\n    else:\n        tail.next = l2; l2 = l2.next\n    tail = tail.next', explanation: 'Picks smaller node, splices it onto tail, and advances the chosen list pointer.' },
    { lines: '16', codeSnippet: 'tail.next = l1 or l2', explanation: 'Attaches whichever remaining list still has nodes in a single O(1) pointer link.' }
  ],
  edgeCases: [
    { case: 'One list is empty', handling: 'Loop does not execute; `tail.next = l1 or l2` returns the non-empty list directly.', example: 'l1 = None, l2 = Node(1)' },
    { case: 'Both lists empty', handling: 'Returns None.', example: 'l1 = None, l2 = None' }
  ],
  commonMistakes: [
    { mistake: 'Creating brand-new `ListNode` objects inside the loop.', solution: 'Do not allocate new nodes! Splice the existing nodes by reassigning `tail.next` to preserve O(1) space.' },
    { mistake: 'Looping through the remainder of the non-empty list.', solution: 'In linked lists, you don’t need a loop to copy the rest; simply set `tail.next = remaining` in a single assignment.' }
  ],
  applications: [
    { industry: 'Database Storage Engines', application: 'LSM-Tree Compaction (RocksDB / Cassandra)', benefit: 'Merges sorted SSTables on disk into a unified sorted file via multi-way merge.' },
    { industry: 'Data Analytics', application: 'External Merge Sort', benefit: 'Sorts terabytes of data larger than RAM by merging sorted chunk files.' }
  ],
  practiceQuestions: [
    { id: 'dsa-4-8-q1', question: 'What is the advantage of linked list merge over array merge?', hint: 'Consider memory allocation.', answer: 'Array merge requires allocating a new array of size n + m and copying elements. Linked list merge rewires existing pointers in-place with O(1) extra space.' },
    { id: 'dsa-4-8-q2', question: 'What is the time complexity of merging K sorted lists of total N elements using divide and conquer?', hint: 'How many levels of pairwise merging occur?', answer: 'log2(k) levels of merging. Each level processes all N elements in O(N) time. Total complexity is O(N log k).' },
    { id: 'dsa-4-8-q3', question: 'Why does heapq in Python require `(node.val, i, node)` instead of `(node.val, node)`?', hint: 'What happens when node.val is equal for two nodes?', answer: 'If two nodes have the same value, Python attempts to compare the second tuple element. Since `ListNode` does not define `<` comparison, it raises TypeError. Adding unique integer `i` breaks ties.' }
  ],
  quiz: [
    {
      id: 'dsa-4-8-quiz-1',
      question: 'What is the time complexity of merging two sorted linked lists of lengths n and m?',
      options: ['O(n + m)', 'O(n * m)', 'O(n log m)', 'O(1)'],
      correctIndex: 0,
      explanation: 'In the worst case, every element from both lists is examined once, requiring at most n + m - 1 comparisons.'
    },
    {
      id: 'dsa-4-8-quiz-2',
      question: 'How do you attach the remaining nodes when one list is exhausted in linked list merge?',
      options: [
        'tail.next = l1 or l2 (single O(1) pointer assignment)',
        'Iterate through the remaining list with a while loop',
        'Sort the tail',
        'Delete the remaining nodes'
      ],
      correctIndex: 0,
      explanation: 'Because linked list nodes are already connected in sorted order, assigning `tail.next` to the remaining list links all remaining elements in a single O(1) operation.'
    },
    {
      id: 'dsa-4-8-quiz-3',
      question: 'What is the optimal time complexity to merge K sorted linked lists containing N total nodes?',
      options: ['O(N log k)', 'O(N * k)', 'O(N^2)', 'O(k log N)'],
      correctIndex: 0,
      explanation: 'Using either a min-heap of size k or divide-and-conquer pairwise merging, K sorted lists are merged in optimal O(N log k) time.'
    }
  ],
  codingChallenge: {
    title: 'Sort List (Merge Sort on Linked List)',
    problem: 'Given the head of a linked list, return the list after sorting it in ascending order. Solve in O(n log n) time and O(log n) stack space using Merge Sort.',
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def sort_list(head):
    if not head or not head.next:
        return head

    # 1. Split list in half using fast/slow
    prev = None
    slow = fast = head
    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next

    prev.next = None # Disconnect left half from right half!

    # 2. Recursively sort both halves
    left = sort_list(head)
    right = sort_list(slow)

    # 3. Merge two sorted halves
    dummy = ListNode(0)
    tail = dummy
    while left and right:
        if left.val <= right.val:
            tail.next = left
            left = left.next
        else:
            tail.next = right
            right = right.next
        tail = tail.next
    tail.next = left or right
    return dummy.next

# Test: 4 -> 2 -> 1 -> 3
head = ListNode(4, ListNode(2, ListNode(1, ListNode(3))))
sorted_head = sort_list(head)
res = []
while sorted_head:
    res.append(sorted_head.val)
    sorted_head = sorted_head.next
print("Sorted list:", res) # Expected: [1, 2, 3, 4]`,
    solution: `def sort_list(head):
    if not head or not head.next:
        return head
    prev = None
    slow = fast = head
    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next
    prev.next = None
    left = sort_list(head)
    right = sort_list(slow)
    dummy = ListNode(0)
    tail = dummy
    while left and right:
        if left.val <= right.val:
            tail.next = left
            left = left.next
        else:
            tail.next = right
            right = right.next
        tail = tail.next
    tail.next = left or right
    return dummy.next`,
    hints: [
      'Base case: if head is None or head.next is None, list is already sorted.',
      'Use slow and fast pointers to split into two halves, disconnecting with prev.next = None.',
      'Recursively sort each half and merge using the standard merge subroutine.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Linked list merge splices existing pointers in-place with O(1) auxiliary space.',
      'Dummy head eliminates special cases when choosing the first merged node.',
      'Remaining elements attach in a single O(1) link `tail.next = l1 or l2`.',
      'Powers O(n log n) Merge Sort on linked lists.'
    ],
    nextLessonId: 'dsa-ll-middle-intersection',
    nextLessonTitle: 'Finding Middle and List Intersection',
    nextLessonModuleId: 'dsa-module-4'
  }
};

// 9. Finding Middle and List Intersection
m4Lessons['dsa-ll-middle-intersection'] = {
  id: 'dsa-ll-middle-intersection',
  moduleId: 'dsa-module-4',
  title: 'Finding Middle and List Intersection',
  subtitle: 'Pointer Equalization, Y-Shaped Convergence & O(1) Space Intersection Search',
  order: 9,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'linked-list',
  objectives: [
    'Understand why linked list intersection is a structural node identity test, not a value match.',
    'Implement the Length Equalization approach (advance longer list by |lenA - lenB|).',
    'Implement the Two-Pointer Traversal Switch technique (pA = pA.next if pA else headB).',
    'Prove why switching lists guarantees collision at the intersection node in at most lenA + lenB steps.'
  ],
  prerequisites: [
    'Singly Linked Lists',
    'Fast and Slow Pointer Technique'
  ],
  analogy: {
    title: 'The Y-Shaped River Confluence',
    text: 'Two independent mountain streams (Stream A, 15 miles long; Stream B, 10 miles long) flow down separate ravines until they merge at Confluence Point into a single wide river. If two kayakers start at the same time, the kayaker on Stream B will pass the confluence 5 miles before the kayaker on Stream A. But if Kayaker A gives Kayaker B a 5-mile head start, they will paddle into the confluence at the exact same second.',
    metaphor: 'Equalizing the path lengths allows two pointers to step in lockstep and meet at the intersection node.'
  },
  problemSolved: {
    title: 'Detecting Memory Merges without Hash Sets',
    description: 'Finding the intersection of two linked lists naively using a hash set of visited node addresses takes O(m) extra memory. The pointer redirection technique finds the exact intersection node in O(n + m) time and strictly O(1) auxiliary space.',
    keyPoints: [
      'Tests node reference equality (pA == pB), not value equality',
      'Requires zero extra memory: strictly O(1) auxiliary space',
      'Elegant path switching guarantees both pointers travel exactly lenA + lenB steps'
    ]
  },
  intuition: {
    overview: 'Pointer A starts at headA; Pointer B starts at headB. When pointer A reaches the end of list A, redirect it to headB. When pointer B reaches the end of list B, redirect it to headA. Both pointers will travel length A + length B, aligning perfectly at the intersection node.',
    steps: [
      { step: 1, title: 'Initialize Pointers', description: 'pA = headA, pB = headB.' },
      { step: 2, title: 'Traverse and Switch', description: 'pA = pA.next if pA else headB; pB = pB.next if pB else headA.' },
      { step: 3, title: 'Collision or Null', description: 'If lists intersect, pA == pB at intersection node. If no intersection, pA == pB == None.' }
    ]
  },
  formalDefinition: {
    text: 'Let list A have non-shared length a and shared length c. Let list B have non-shared length b and shared length c. Pointer A travels a + c + b steps. Pointer B travels b + c + a steps. Since a + c + b = b + c + a, both pointers arrive at the intersection node after exactly the same number of steps.',
    latex: 'a + c + b = b + c + a \\implies \\text{Pointers align at intersection in } \\le a + b + c \\text{ steps}'
  },
  complexity: {
    overview: 'Time: O(n + m) where n and m are list lengths. Space: O(1) auxiliary space.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Lists intersect at the very first head node.' },
      { case: 'Average', time: 'O(n + m)', space: 'O(1)', explanation: 'Switches lists once and collides at intersection.' },
      { case: 'Worst', time: 'O(n + m)', space: 'O(1)', explanation: 'No intersection; both reach None after traveling lenA + lenB.' }
    ],
    spaceNote: 'Operates in-place with two pointer variables.'
  },
  workedExample: {
    title: 'Finding Intersection of List A: [4 -> 1 -> 8 -> 4 -> 5] and List B: [5 -> 6 -> 1 -> 8 -> 4 -> 5]',
    input: 'Shared tail starting at node with value 8.',
    steps: [
      { step: 1, action: 'Step 1-5', state: 'pA finishes List A (len 5)', explanation: 'pA is redirected to headB (node 5).' },
      { step: 2, action: 'Step 6', state: 'pB finishes List B (len 6)', explanation: 'pB is redirected to headA (node 4).' },
      { step: 3, action: 'Step 8', state: 'Both arrive at node 8 simultaneously!', explanation: 'pA traveled 5 + 3 = 8 steps. pB traveled 6 + 2 = 8 steps. pA == pB == node 8.' }
    ],
    finalOutput: 'Intersection identified at node 8 in O(1) space.'
  },
  visualExplanation: {
    title: 'The Two-Track Equalization Diagram',
    description: 'Path A + Path B equals Path B + Path A. Splicing the tracks conceptually into two parallel lanes of identical total length ensures the two runner pins hit the merge joint at the same time.',
    features: ['Y-shaped merge junction', 'Path concatenation visualization', 'Equalized travel distance']
  },
  pseudocode: {
    title: 'Intersection of Two Linked Lists',
    code: `def get_intersection_node(headA, headB):
    if not headA or not headB: return None
    pA = headA
    pB = headB
    while pA != pB:
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA
    return pA # Either intersection node or None`
  },
  pythonCode: {
    title: 'Intersection of Two Linked Lists in Python',
    code: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def get_intersection_node(headA, headB):
    if not headA or not headB:
        return None

    pA, pB = headA, headB
    while pA != pB:
        # Move to next node or switch to opposite head
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA

    return pA

# Build shared tail: 8 -> 4 -> 5
common = ListNode(8)
common.next = ListNode(4)
common.next.next = ListNode(5)

# List A: 4 -> 1 -> common
headA = ListNode(4)
headA.next = ListNode(1)
headA.next.next = common

# List B: 5 -> 6 -> 1 -> common
headB = ListNode(5)
headB.next = ListNode(6)
headB.next.next = ListNode(1)
headB.next.next.next = common

intersect = get_intersection_node(headA, headB)
print("Intersection node value:", intersect.val if intersect else "None") # Expected: 8`,
    explanation: 'Uses the two-pointer path switching technique to find intersection in O(1) space.'
  },
  runnableCode: {
    code: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

shared = Node(99)
list1 = Node(1, Node(2, shared))
list2 = Node(10, shared)

# Length difference approach
def get_len(n):
    c = 0
    while n: c += 1; n = n.next
    return c

len1, len2 = get_len(list1), get_len(list2)
p1, p2 = list1, list2
if len1 > len2:
    for _ in range(len1 - len2): p1 = p1.next
else:
    for _ in range(len2 - len1): p2 = p2.next

while p1 != p2:
    p1 = p1.next
    p2 = p2.next

print("Intersection node value:", p1.val if p1 else "None")`,
    expectedOutput: 'Intersection node value: 99'
  },
  lineByLineExplanation: [
    { lines: '17-20', codeSnippet: 'if len1 > len2:\n    for _ in range(len1 - len2): p1 = p1.next', explanation: 'Advances the pointer of the longer list by the difference in lengths.' },
    { lines: '22-24', codeSnippet: 'while p1 != p2:\n    p1 = p1.next\n    p2 = p2.next', explanation: 'Marches both pointers in lockstep until they collide at the shared node.' }
  ],
  edgeCases: [
    { case: 'Lists do not intersect', handling: 'Both pointers reach None simultaneously and exit returning None.', example: 'Two parallel separate lists' },
    { case: 'Lists of equal length', handling: 'Pointers meet on first pass without switching heads.', example: 'lenA == lenB' }
  ],
  commonMistakes: [
    { mistake: 'Comparing `node.val` instead of `node`.', solution: 'Two separate nodes can have the same value (e.g. both contain 1). Intersection requires testing memory reference identity `pA == pB`.' },
    { mistake: 'Switching when `pA.next` is None instead of `pA` is None.', solution: 'Switching on `pA is None` ensures both pointers can reach None simultaneously when no intersection exists, preventing infinite loops.' }
  ],
  applications: [
    { industry: 'Git Version Control', application: 'Merge Base Detection', benefit: 'Finds the common ancestor commit where two Git branches diverged in linear time.' },
    { industry: 'Memory Profilers', application: 'Shared Heap Object Detection', benefit: 'Identifies shared data references between independent execution threads.' }
  ],
  practiceQuestions: [
    { id: 'dsa-4-9-q1', question: 'Why does comparing values `pA.val == pB.val` fail for finding linked list intersection?', hint: 'Can different nodes have the same value?', answer: 'Two completely distinct lists can contain identical numbers (e.g. [1, 2] and [1, 2]). Intersection means two lists share the exact same physical node in memory (same memory address).' },
    { id: 'dsa-4-9-q2', question: 'What happens in the two-pointer switch method if the two lists do not intersect at all?', hint: 'How many total steps do both take?', answer: 'Both pointers will traverse lenA + lenB steps and become None at the exact same time. The loop exits because pA == pB (both are None), correctly returning None.' },
    { id: 'dsa-4-9-q3', question: 'What is the maximum number of steps taken by the pointer switch method?', hint: 'Sum of lengths.', answer: 'At most lenA + lenB steps.' }
  ],
  quiz: [
    {
      id: 'dsa-4-9-quiz-1',
      question: 'What is the auxiliary space complexity of finding the intersection node of two linked lists using pointer switching?',
      options: ['O(1)', 'O(n + m)', 'O(n)', 'O(log(n + m))'],
      correctIndex: 0,
      explanation: 'The pointer switching technique only tracks two pointer variables (pA and pB), using strictly O(1) auxiliary space.'
    },
    {
      id: 'dsa-4-9-quiz-2',
      question: 'If two linked lists have lengths a + c and b + c (where c is shared length), how many steps does each pointer travel before colliding in the pointer-switch algorithm?',
      options: ['a + b + c', 'a + b + 2c', 'c', '(a + b) / 2'],
      correctIndex: 0,
      explanation: 'Pointer A travels (a + c) + b steps; Pointer B travels (b + c) + a steps. Both equal a + b + c steps.'
    },
    {
      id: 'dsa-4-9-quiz-3',
      question: 'Why MUST you test pointer equality `pA == pB` rather than value equality `pA.val == pB.val`?',
      options: [
        'Because two different nodes in separate lists can coincidentally hold the same data value',
        'Because Python does not allow reading values',
        'Because values change during traversal',
        'Because values are hashed'
      ],
      correctIndex: 0,
      explanation: 'Intersection is defined by identity in memory (same node address). Two independent nodes can easily store identical numerical values without intersecting.'
    }
  ],
  codingChallenge: {
    title: 'Intersection of Two Linked Lists',
    problem: 'Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return None.',
    starterCode: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def get_intersection_node(headA, headB):
    pA, pB = headA, headB
    while pA != pB:
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA
    return pA`,
    solution: `def get_intersection_node(headA, headB):
    pA, pB = headA, headB
    while pA != pB:
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA
    return pA`,
    hints: [
      'Initialize pA = headA and pB = headB.',
      'When pA reaches None, redirect to headB. When pB reaches None, redirect to headA.',
      'Return pA when pA == pB.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Linked list intersection is determined by pointer memory identity, not node values.',
      'Path switching equalizes distance to lenA + lenB in O(1) space.',
      'Length difference advance is an alternate O(1) space method.',
      'If lists do not intersect, both pointers terminate at None simultaneously.'
    ],
    nextLessonId: 'dsa-stack-operations',
    nextLessonTitle: 'Stack Operations',
    nextLessonModuleId: 'dsa-module-5'
  }
};

// Write out Module 4 fully complete
writeModuleFile(path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-4.ts'), m4.data, m4Lessons);
console.log('Successfully completed DSA Module 4! Total authored:', Object.keys(m4Lessons).length);
