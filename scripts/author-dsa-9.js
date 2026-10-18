const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m9 = getExistingDSALessons(9);
const m9Lessons = { ...m9.lessons };

m9Lessons['dsa-heap-heapify'] = {
  id: 'dsa-heap-heapify',
  moduleId: 'dsa-module-9',
  title: 'Heapify: Building a Heap in O(n)',
  subtitle: 'Mathematical Proof of Linear Bottom-Up Construction vs Naive Insertion',
  order: 2,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'heap',
  objectives: [
    'Contrast top-down insertion O(n log n) with bottom-up sift-down heapify O(n).',
    'Understand why half the nodes in any binary heap are leaves requiring 0 operations.',
    'Derive the mathematical summation proof for O(n) heap construction.',
    'Implement sift-down (max_heapify / min_heapify) from scratch.'
  ],
  prerequisites: ['Min Heap and Max Heap'],
  analogy: {
    title: 'Organizing a Company from the Ground Up',
    text: 'If you hire 100 new workers one by one and promote them upward through the ranks, each worker has to interview with all upper managers (O(n log n)). But if you first seat all workers at desks, and only ask managers to correct the reports below them, most people never move and upper managers only check a few levels, finishing in O(n) time.',
    metaphor: 'Leaves do not sift down; only internal nodes need adjustment.'
  },
  problemSolved: {
    title: 'Accelerating Heap Construction from O(n log n) to O(n)',
    description: 'Repeatedly calling heappush() takes O(n log n) time. Bottom-up heapify processes nodes from lowest internal node up to the root, taking mathematically proven O(n) linear time.',
    keyPoints: [
      'Takes strictly O(n) operations.',
      'Leaves (n/2 nodes) are already valid trivial heaps.',
      'Core mechanism behind Python\'s heapq.heapify().'
    ]
  },
  intuition: {
    overview: 'Start at index n//2 - 1 (the parent of the last element). Call sift_down on each node moving backwards down to index 0. By the time index 0 is sifted down, the entire array is a valid heap.',
    steps: [
      { step: 1, title: 'Identify Last Parent', description: 'Last non-leaf node is at index n // 2 - 1.' },
      { step: 2, title: 'Backward Loop', description: 'Loop i from n // 2 - 1 down to 0.' },
      { step: 3, title: 'Sift Down', description: 'Sink out-of-order parent down by swapping with larger child until invariant holds.' }
    ]
  },
  formalDefinition: {
    text: 'At height h above leaves, there are at most \\lceil n / 2^{h+1} \\rceil nodes. Sift-down from height h takes at most O(h) swaps. Total operations: \\sum_{h=0}^{\\lfloor \\log n \\rfloor} \\frac{n}{2^{h+1}} h = n \\sum_{h=1}^\\infty \\frac{h}{2^{h+1}} = n \\cdot 1 = O(n).',
    latex: '\\sum_{h=0}^{\\lfloor \\log_2 n \\rfloor} \\left\\lceil \\frac{n}{2^{h+1}} \\right\\rceil \\mathcal{O}(h) = \\mathcal{O}\\left(n \\sum_{h=1}^{\\infty} \\frac{h}{2^h}\\right) = \\mathcal{O}(n)'
  },
  complexity: {
    overview: 'Time: O(n) linear time. Space: O(1) in-place.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(1)', explanation: 'Already valid heap requires 1 check per node.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Mathematical sum evaluates to <= 2n comparisons.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Strict linear upper bound.' }
    ],
    spaceNote: 'In-place array rearrangement with O(1) auxiliary memory.'
  },
  workedExample: {
    title: 'Bottom-Up Heapify on [3, 9, 2, 1, 4, 5]',
    input: 'arr = [3, 9, 2, 1, 4, 5], n=6',
    steps: [
      { step: 1, action: 'Start at index 6//2 - 1 = 2 (val=2)', state: 'Children of 2 is [5] (idx 5) -> swap 2 and 5 -> [3, 9, 5, 1, 4, 2]', explanation: 'Subtree at index 2 heapified.' },
      { step: 2, action: 'Move to index 1 (val=9)', state: 'Children are 1 (idx 3) and 4 (idx 4) -> 9 >= both, no swap', explanation: 'Subtree at index 1 already valid.' },
      { step: 3, action: 'Move to index 0 (val=3)', state: 'Children are 9 (idx 1) and 5 (idx 2) -> swap 3 with 9 -> [9, 3, 5, 1, 4, 2]', explanation: '3 swapped with larger child 9.' },
      { step: 4, action: 'Continue sift-down for 3 at index 1', state: 'Children are 1 (idx 3) and 4 (idx 4) -> swap 3 with 4 -> [9, 4, 5, 1, 3, 2]', explanation: 'Valid Max Heap formed!' }
    ],
    finalOutput: 'Max Heap: [9, 4, 5, 1, 3, 2]'
  },
  visualExplanation: {
    title: 'Bottom-Up Heapify Cascade',
    description: 'Visualizing bottom-up wave: leaves need no work, parents sink down into position level by level.',
    features: ['Leaves (bottom level) highlighted in green', 'Internal nodes sink down to correct rank']
  },
  pseudocode: {
    title: 'Heapify Algorithm',
    code: `function buildMaxHeap(arr):
    n = length(arr)
    for i from n // 2 - 1 down to 0:
        siftDown(arr, n, i)

function siftDown(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        swap(arr[i], arr[largest])
        siftDown(arr, n, largest)`
  },
  pythonCode: {
    title: 'Python In-Place Heapify',
    code: `def build_max_heap(arr: list[int]) -> None:
    n = len(arr)
    
    def sift_down(i: int):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
            
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            sift_down(largest)
            
    for i in range(n // 2 - 1, -1, -1):
        sift_down(i)`,
    explanation: 'Iteratively sifts down non-leaf nodes in O(n) total operations.'
  },
  runnableCode: {
    code: `arr = [3, 9, 2, 1, 4, 5]
build_max_heap(arr)
print(arr)`,
    expectedOutput: `[9, 4, 5, 1, 3, 2]`
  },
  lineByLineExplanation: [
    { line: 17, code: 'for i in range(n // 2 - 1, -1, -1):', explanation: 'Starts at deepest parent node and works backwards to root.' },
    { line: 14, code: 'arr[i], arr[largest] = arr[largest], arr[i]', explanation: 'Swaps out-of-order parent with larger child and recurses downward.' }
  ],
  edgeCases: [
    { case: 'Array of size 0 or 1', handling: 'Loop range is empty; array is already a valid heap.', example: '[42]' }
  ],
  commonMistakes: [
    { mistake: 'Starting heapify loop from index n - 1', solution: 'Nodes from n//2 to n-1 are leaves and have no children to sift down; starting at n//2 - 1 saves 50% of function calls.', codeExample: 'for i in range(n // 2 - 1, -1, -1):' }
  ],
  applications: [
    { industry: 'Data Processing', application: 'Python heapq.heapify() linear initialization', benefit: 'Instantly prepares arrays for priority queue queries.' }
  ],
  practiceQuestions: [
    { id: 'pq-hh-1', question: 'Why is building a heap by repeated heappush() O(n log n) while heapify() is O(n)?', hint: 'Compare top-down vs bottom-up node distribution.', answer: 'With repeated heappush(), the majority of nodes (leaves at bottom) must sift UP through log(n) levels. With heapify, the majority of nodes are leaves that sift DOWN 0 levels.' }
  ],
  quiz: [
    { id: 'q-hh-1', question: 'What is the index of the last non-leaf node in a 0-indexed array of size n?', options: ['n // 2 - 1', 'n // 2', 'n - 1', '2 * n + 1'], correctIndex: 0, explanation: 'In a 0-indexed binary tree, nodes from index n//2 to n-1 are leaves, so the last parent is n//2 - 1.' }
  ],
  codingChallenge: {
    title: 'Transform Array into Min Heap',
    problem: 'Write a function that transforms an unsorted array into a Min Heap in O(n) time.',
    hints: ['Mirror max_heapify: swap with smallest child if child < parent.'],
    starterCode: `def build_min_heap(arr: list[int]) -> None:
    # TODO: Build Min Heap in O(n)
    pass`,
    solution: `def build_min_heap(arr: list[int]) -> None:
    n = len(arr)
    def sift_down(i):
        smallest = i
        l = 2 * i + 1
        r = 2 * i + 2
        if l < n and arr[l] < arr[smallest]: smallest = l
        if r < n and arr[r] < arr[smallest]: smallest = r
        if smallest != i:
            arr[i], arr[smallest] = arr[smallest], arr[i]
            sift_down(smallest)
    for i in range(n // 2 - 1, -1, -1):
        sift_down(i)`
  },
  summary: {
    keyTakeaways: ['Bottom-up heapify runs in strictly O(n) time.', 'Only internal nodes (indices 0 to n//2 - 1) need to sift down.'],
    nextLessonId: 'dsa-heap-operations',
    nextLessonTitle: 'Heap Insertion and Extraction',
    nextLessonModuleId: 'dsa-module-9'
  }
};

m9Lessons['dsa-heap-operations'] = {
  id: 'dsa-heap-operations',
  moduleId: 'dsa-module-9',
  title: 'Heap Insertion and Extraction',
  subtitle: 'Sift-Up Bubbling, Root Extraction, and Heap Invariant Preservation in O(log n)',
  order: 3,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'heap',
  objectives: [
    'Insert elements into binary heaps using sift-up (bubble-up) in O(log n).',
    'Extract the extremum root (min or max) using sift-down in O(log n).',
    'Inspect the top element in O(1) time without mutation.',
    'Implement a dynamic MinHeap class from scratch.'
  ],
  prerequisites: ['Min Heap and Max Heap'],
  analogy: {
    title: 'The Military Promotion Board',
    text: 'When a new soldier joins, they enlist as a private at the bottom of the rank list. If they prove exceptionally capable, they are promoted upward past their immediate supervisor (sift-up) until they reach their proper rank. When the commanding general retires, the most junior soldier is temporarily placed in the seat and sifted down to their rightful spot.',
    metaphor: 'Insert at the end and bubble up; delete root by moving the last element to the root and sifting down.'
  },
  problemSolved: {
    title: 'Maintaining Extreme Values Dynamically in Streaming Workloads',
    description: 'Dynamic data streams continuously receive new elements while requiring instant retrieval of the minimum or maximum element. A binary heap supports push and pop in O(log n) time while providing O(1) peek.',
    keyPoints: [
      'peek() is strictly O(1).',
      'push() and pop() are O(log n).',
      'Maintains complete binary tree shape via array append/pop.'
    ]
  },
  intuition: {
    overview: 'Push appends element to end of array and bubbles up while parent > element. Pop copies last element to root, removes last element, and sinks root down while children < root.',
    steps: [
      { step: 1, title: 'Push (Sift-Up)', description: 'arr.append(val); while arr[i] < arr[parent(i)]: swap(i, parent(i)); i = parent(i).' },
      { step: 2, title: 'Pop (Sift-Down)', description: 'swap(arr[0], arr[-1]); min_val = arr.pop(); sift_down(0).' }
    ]
  },
  formalDefinition: {
    text: 'In a 0-indexed complete binary heap, parent(i) = \\lfloor (i - 1)/2 \\rfloor, left(i) = 2i + 1, right(i) = 2i + 2. Insertion and extraction require path traversal bounded by tree height \\lceil \\log_2(n+1) \\rceil.',
    latex: '\\text{Height}(T) = \\lfloor \\log_2 n \\rfloor \\implies T_{\\text{push}} = \\mathcal{O}(\\log n), \\; T_{\\text{pop}} = \\mathcal{O}(\\log n)'
  },
  complexity: {
    overview: 'Peek: O(1). Push: O(log n). Pop: O(log n). Space: O(n).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Pushing element larger than its parent terminates on first check.' },
      { case: 'Average', time: 'O(log n)', space: 'O(1)', explanation: 'Path traversal.' },
      { case: 'Worst', time: 'O(log n)', space: 'O(1)', explanation: 'Bubbles from leaf all the way to root.' }
    ],
    spaceNote: 'O(n) array storage.'
  },
  workedExample: {
    title: 'Inserting 1 into Min Heap [2, 5, 3, 9, 8]',
    input: 'Heap: [2, 5, 3, 9, 8], Push 1',
    steps: [
      { step: 1, action: 'Append 1 to end', state: '[2, 5, 3, 9, 8, 1], idx=5', explanation: 'Maintains complete binary tree property.' },
      { step: 2, action: 'Compare with parent(5) = idx 2 (val=3)', state: '1 < 3 -> swap 1 and 3 -> [2, 5, 1, 9, 8, 3], idx=2', explanation: 'Bubble up 1 level.' },
      { step: 3, action: 'Compare with parent(2) = idx 0 (val=2)', state: '1 < 2 -> swap 1 and 2 -> [1, 5, 2, 9, 8, 3], idx=0', explanation: '1 reaches root.' }
    ],
    finalOutput: 'Heap: [1, 5, 2, 9, 8, 3]'
  },
  visualExplanation: {
    title: 'Sift-Up and Sift-Down Paths',
    description: 'Visualizing single vertical paths traversed during bubbling up or sinking down.',
    features: ['Yellow node ascends tree during push', 'Orange node descends tree during pop']
  },
  pseudocode: {
    title: 'MinHeap Push and Pop',
    code: `class MinHeap:
    def push(val):
        heap.append(val)
        siftUp(len(heap) - 1)

    def pop():
        if len(heap) == 1: return heap.pop()
        min_val = heap[0]
        heap[0] = heap.pop()
        siftDown(0)
        return min_val`
  },
  pythonCode: {
    title: 'Complete MinHeap Class',
    code: `class MinHeap:
    def __init__(self):
        self.heap = []

    def push(self, val: int) -> None:
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def pop(self) -> int:
        if not self.heap:
            raise IndexError("pop from empty heap")
        if len(self.heap) == 1:
            return self.heap.pop()
        root = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._sift_down(0)
        return root

    def peek(self) -> int:
        return self.heap[0]

    def _sift_up(self, i: int) -> None:
        parent = (i - 1) // 2
        while i > 0 and self.heap[i] < self.heap[parent]:
            self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
            i = parent
            parent = (i - 1) // 2

    def _sift_down(self, i: int) -> None:
        n = len(self.heap)
        smallest = i
        l = 2 * i + 1
        r = 2 * i + 2
        if l < n and self.heap[l] < self.heap[smallest]: smallest = l
        if r < n and self.heap[r] < self.heap[smallest]: smallest = r
        if smallest != i:
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            self._sift_down(smallest)`,
    explanation: 'Complete from-scratch implementation of an array-backed binary min-heap.'
  },
  runnableCode: {
    code: `h = MinHeap()
for x in [5, 3, 8, 1, 2]:
    h.push(x)
print(h.peek()) # 1
print([h.pop() for _ in range(5)])`,
    expectedOutput: `1\n[1, 2, 3, 5, 8]`
  },
  lineByLineExplanation: [
    { line: 26, code: 'parent = (i - 1) // 2', explanation: 'Calculates the 0-indexed parent slot.' },
    { line: 15, code: 'self.heap[0] = self.heap.pop()', explanation: 'Pops the final leaf element from the array in O(1) and places it at the root to be sifted down.' }
  ],
  edgeCases: [
    { case: 'Popping from 1-element heap', handling: 'Directly returns heap.pop() without calling sift_down.', example: 'len(heap) == 1' }
  ],
  commonMistakes: [
    { mistake: 'Removing index 0 directly via heap.pop(0)', solution: 'heap.pop(0) causes an O(n) array shift; replace root with last element and sift down in O(log n).', codeExample: 'self.heap[0] = self.heap.pop()' }
  ],
  applications: [
    { industry: 'Operating Systems', application: 'Event timer management and thread priority queues', benefit: 'Instantly fires earliest-expiring timer in O(1).' }
  ],
  practiceQuestions: [
    { id: 'pq-ho-1', question: 'How can you implement a Max Heap in Python using the standard heapq module (which only provides a min heap)?', hint: 'Multiply keys by -1.', answer: 'Negate values on insertion (-val) and negate them again upon extraction.' }
  ],
  quiz: [
    { id: 'q-ho-1', question: 'What is the time complexity to retrieve the minimum element from a Min Heap without removing it?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctIndex: 0, explanation: 'The minimum element is stored permanently at index 0, accessible in O(1) time.' }
  ],
  codingChallenge: {
    title: 'Last Stone Weight',
    problem: 'Simulate smashing the two heaviest stones together until at most one stone remains. Return the weight of the last stone (or 0 if none remain).',
    hints: ['Use a max heap by inserting negative values into heapq.'],
    starterCode: `import heapq

def last_stone_weight(stones: list[int]) -> int:
    # TODO: Implement stone smashing with max heap
    pass`,
    solution: `import heapq

def last_stone_weight(stones: list[int]) -> int:
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        s1 = -heapq.heappop(heap)
        s2 = -heapq.heappop(heap)
        if s1 != s2:
            heapq.heappush(heap, -(s1 - s2))
    return -heap[0] if heap else 0`
  },
  summary: {
    keyTakeaways: ['Heap push appends and sifts up; pop moves last element to root and sifts down.', 'Both primary mutations are guaranteed O(log n).'],
    nextLessonId: 'dsa-heap-sort',
    nextLessonTitle: 'Heap Sort Algorithm',
    nextLessonModuleId: 'dsa-module-9'
  }
};

m9Lessons['dsa-heap-sort'] = {
  id: 'dsa-heap-sort',
  moduleId: 'dsa-module-9',
  title: 'Heap Sort Algorithm',
  subtitle: 'Connecting Bottom-Up Heap Construction to In-Place Selection',
  order: 4,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'sorting',
  objectives: [
    'Trace Heap Sort from the perspective of priority queue abstraction.',
    'Understand why Heap Sort can be viewed as an accelerated Selection Sort using a heap.',
    'Identify why Heap Sort is unstable.',
    'Compare in-place Heap Sort against standard library implementations.'
  ],
  prerequisites: ['Heapify: Building a Heap in O(n)', 'Heap Insertion and Extraction'],
  analogy: {
    title: 'The Automated Grain Elevator',
    text: 'A grain silo sorts different sizes of grain by pushing the largest kernels to the top of an aerated funnel. An automated arm picks the top kernel, drops it into a shipping sack at the back of the bay, and the remaining kernels re-settle so the next largest rises to the top.',
    metaphor: 'Heap Sort repeatedly extracts the maximum to build the sorted array backwards.'
  },
  problemSolved: {
    title: 'Eliminating Auxiliary Space in Logarithmic Sorting',
    description: 'Merge sort requires allocating an entire secondary array of size n. Heap Sort performs all sorting inside the original array buffer without allocating a single additional element.',
    keyPoints: [
      'Strictly O(1) auxiliary space.',
      'Guaranteed O(n log n) runtime on all inputs.',
      'Accelerates Selection Sort from O(n²) to O(n log n).'
    ]
  },
  intuition: {
    overview: 'Build Max Heap in O(n). Repeatedly swap arr[0] with arr[end], decrement end, and sift down arr[0]. The array becomes sorted from right to left.',
    steps: [
      { step: 1, title: 'Build Heap', description: 'Transform input array into Max Heap bottom-up.' },
      { step: 2, title: 'Extract Maxima', description: 'Swap root (maximum) to the end of the unsorted segment.' },
      { step: 3, title: 'Restore Invariant', description: 'Sift down root in O(log n) over the remaining unsorted prefix.' }
    ]
  },
  formalDefinition: {
    text: 'Heap Sort partitions array into Max Heap prefix A[0..i] and sorted suffix A[i+1..n-1]. In step i, \\max(A[0..i]) is swapped with A[i], and heap invariant restored on A[0..i-1].',
    latex: 'T(n) = O(n) + \\sum_{i=1}^n O(\\log i) = O(n \\log n)'
  },
  complexity: {
    overview: 'O(n log n) across best, average, and worst cases with O(1) space.',
    cases: [
      { case: 'Best', time: 'O(n log n)', space: 'O(1)', explanation: 'Deterministic down-heap adjustments.' },
      { case: 'Average', time: 'O(n log n)', space: 'O(1)', explanation: 'Consistent tree traversals.' },
      { case: 'Worst', time: 'O(n log n)', space: 'O(1)', explanation: 'Guaranteed upper bound.' }
    ],
    spaceNote: 'Completely in-place with O(1) auxiliary space.'
  },
  workedExample: {
    title: 'Heap Sort on [12, 11, 13, 5, 6, 7]',
    input: 'arr = [12, 11, 13, 5, 6, 7]',
    steps: [
      { step: 1, action: 'Build Max Heap', state: '[13, 11, 12, 5, 6, 7]', explanation: 'Max value 13 at root.' },
      { step: 2, action: 'Swap 13 with 7', state: '[7, 11, 12, 5, 6, | 13]', explanation: '13 locked in place.' },
      { step: 3, action: 'Sift down 7', state: '[12, 11, 7, 5, 6, | 13]', explanation: 'Next max 12 at root.' },
      { step: 4, action: 'Swap 12 with 6', state: '[6, 11, 7, 5, | 12, 13]', explanation: '12 locked in place.' }
    ],
    finalOutput: '[5, 6, 7, 11, 12, 13]'
  },
  visualExplanation: {
    title: 'In-Place Heap-to-Sorted Transition',
    description: 'Visualizing boundary sliding leftward as max heap shrinks and sorted region expands.',
    features: ['Active heap region in blue', 'Permanent sorted suffix in green']
  },
  pseudocode: {
    title: 'Heap Sort Algorithm',
    code: `function heapSort(arr):
    buildMaxHeap(arr)
    for i from length(arr) - 1 down to 1:
        swap(arr[0], arr[i])
        siftDown(arr, i, 0)`
  },
  pythonCode: {
    title: 'Python Heap Sort',
    code: `def heap_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    
    def sift_down(size: int, i: int):
        largest = i
        l = 2 * i + 1
        r = 2 * i + 2
        if l < size and arr[l] > arr[largest]: largest = l
        if r < size and arr[r] > arr[largest]: largest = r
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            sift_down(size, largest)

    # 1. Build Max Heap
    for i in range(n // 2 - 1, -1, -1):
        sift_down(n, i)

    # 2. Extract max one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        sift_down(i, 0)
        
    return arr`,
    explanation: 'Iteratively extracts max to the sorted suffix.'
  },
  runnableCode: {
    code: `arr = [12, 11, 13, 5, 6, 7]
print(heap_sort(arr))`,
    expectedOutput: `[5, 6, 7, 11, 12, 13]`
  },
  lineByLineExplanation: [
    { line: 20, code: 'arr[0], arr[i] = arr[i], arr[0]', explanation: 'Swaps current maximum element to its permanent final index i.' },
    { line: 21, code: 'sift_down(i, 0)', explanation: 'Sifts down new root over the reduced unsorted size i.' }
  ],
  edgeCases: [
    { case: 'Array with duplicate elements', handling: 'Sorts correctly; duplicates may change relative initial order (unstable).', example: '[3, 3, 1]' }
  ],
  commonMistakes: [
    { mistake: 'Building a Min Heap to sort ascending in place', solution: 'Building a Min Heap places smallest at index 0; extracting to end would sort descending. Use Max Heap for ascending in-place sort.', codeExample: '# Max Heap -> Ascending sort' }
  ],
  applications: [
    { industry: 'Aerospace Engineering', application: 'Flight control computers', benefit: 'Strict O(n log n) and O(1) RAM guarantees avoid unexpected heap exhaustion or CPU stalls.' }
  ],
  practiceQuestions: [
    { id: 'pq-hsa-1', question: 'Why does Heap Sort require a Max Heap rather than a Min Heap to sort an array in ascending order in-place?', hint: 'Where do extracted elements go?', answer: 'Extracted elements are placed at the END of the array. Storing the largest elements at the end builds an ascending array.' }
  ],
  quiz: [
    { id: 'q-hsa-1', question: 'Is Heap Sort an in-place sorting algorithm?', options: ['Yes, it uses O(1) auxiliary space', 'No, it requires O(n) extra space', 'Only if the array is already sorted', 'No, it requires O(log n) extra space'], correctIndex: 0, explanation: 'Heap Sort rearranges elements directly within the input array using O(1) extra memory.' }
  ],
  codingChallenge: {
    title: 'Sort an Array using Heap Sort',
    problem: 'Sort an array of integers in non-decreasing order using Heap Sort.',
    hints: ['Implement build_max_heap and repeatedly swap root with the last element.'],
    starterCode: `def sort_array(nums: list[int]) -> list[int]:
    # TODO: Implement Heap Sort
    pass`,
    solution: `def sort_array(nums: list[int]) -> list[int]:
    n = len(nums)
    def sift(size, i):
        largest = i
        l, r = 2 * i + 1, 2 * i + 2
        if l < size and nums[l] > nums[largest]: largest = l
        if r < size and nums[r] > nums[largest]: largest = r
        if largest != i:
            nums[i], nums[largest] = nums[largest], nums[i]
            sift(size, largest)
    for i in range(n // 2 - 1, -1, -1):
        sift(n, i)
    for i in range(n - 1, 0, -1):
        nums[0], nums[i] = nums[i], nums[0]
        sift(i, 0)
    return nums`
  },
  summary: {
    keyTakeaways: ['Heap Sort is an accelerated Selection Sort using a heap.', 'Build Max Heap to sort ascending in O(1) space.'],
    nextLessonId: 'dsa-heap-top-k',
    nextLessonTitle: 'Top-K Problems',
    nextLessonModuleId: 'dsa-module-9'
  }
};

m9Lessons['dsa-heap-top-k'] = {
  id: 'dsa-heap-top-k',
  moduleId: 'dsa-module-9',
  title: 'Top-K Problems',
  subtitle: 'Min-Heap of Size K Pattern for Streaming Extremes in O(n log k)',
  order: 5,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'heap',
  objectives: [
    'Solve Top-K Frequent and Kth Largest problems in O(n log k) time.',
    'Understand why a Min-Heap of size k finds the largest elements.',
    'Process infinite dynamic data streams without storing the full dataset.',
    'Compare Min-Heap of size k against Quickselect O(n) average.'
  ],
  prerequisites: ['Heap Insertion and Extraction'],
  analogy: {
    title: 'The Top 10 Bestseller Billboard',
    text: 'A billboard displays the Top 10 bestselling songs. When a new song comes out, it only needs to compete against the #10 song on the billboard (the minimum of the top 10). If it sells more than #10, the #10 song is dropped and the new song joins the list.',
    metaphor: 'A Min-Heap of size k keeps the current threshold at the top for instant comparison.'
  },
  problemSolved: {
    title: 'Finding Extremes in Streaming or Huge Data without Full Sorting',
    description: 'Sorting the whole array takes O(n log n) time and O(n) memory. A Min-Heap of capacity k processes incoming items one by one, keeping only the top k elements in O(n log k) time and O(k) memory.',
    keyPoints: [
      'Executes in O(n log k) time.',
      'Only requires O(k) auxiliary memory.',
      'Ideal for unbounded online streaming data.'
    ]
  },
  intuition: {
    overview: 'Maintain a Min-Heap of size k. For each element: if heap size < k, push it. Else if element > heap[0] (root), pop root and push element. At the end, heap contains the top k largest elements.',
    steps: [
      { step: 1, title: 'Fill Initial K', description: 'Push first k elements into Min-Heap.' },
      { step: 2, title: 'Compare with Threshold', description: 'For each remaining element x: if x > heap[0], heappushpop(heap, x).' },
      { step: 3, title: 'Result Extraction', description: 'Heap root is the kth largest element; full heap contains top k.' }
    ]
  },
  formalDefinition: {
    text: 'Let S be a stream of n elements. A bounded priority queue of capacity k maintains the invariant \\forall x \\in Q, \\; x \\ge \\min(Q), and |Q| = k. Each insertion takes O(\\log k) comparisons.',
    latex: 'T(n, k) = \\mathcal{O}(n \\log k), \\quad \\text{Space} = \\mathcal{O}(k)'
  },
  complexity: {
    overview: 'Time: O(n log k). Space: O(k) strictly.',
    cases: [
      { case: 'Best', time: 'O(n log k)', space: 'O(k)', explanation: 'Linear in stream size n, logarithmic in k.' },
      { case: 'Average', time: 'O(n log k)', space: 'O(k)', explanation: 'When k << n, vastly outperforms O(n log n) sort.' },
      { case: 'Worst', time: 'O(n log k)', space: 'O(k)', explanation: 'All elements enter heap.' }
    ],
    spaceNote: 'O(k) memory for bounded heap.'
  },
  workedExample: {
    title: 'Find 3rd Largest in [3, 2, 1, 5, 6, 4]',
    input: 'nums = [3, 2, 1, 5, 6, 4], k=3',
    steps: [
      { step: 1, action: 'First 3 elements', state: 'Heap: [1, 2, 3]', explanation: 'Min-Heap of size 3.' },
      { step: 2, action: 'See 5', state: '5 > 1 -> pop 1, push 5 -> Heap: [2, 5, 3]', explanation: 'Threshold updated.' },
      { step: 3, action: 'See 6', state: '6 > 2 -> pop 2, push 6 -> Heap: [3, 5, 6]', explanation: 'Threshold updated.' },
      { step: 4, action: 'See 4', state: '4 > 3 -> pop 3, push 4 -> Heap: [4, 5, 6]', explanation: 'Threshold updated.' }
    ],
    finalOutput: '3rd largest is root of heap = 4'
  },
  visualExplanation: {
    title: 'Top-K Bounded Funnel',
    description: 'Visualizing stream of items passing through threshold gate of size k.',
    features: ['Root is the current gatekeeper threshold', 'Smaller items are rejected in O(1)']
  },
  pseudocode: {
    title: 'Top-K Algorithm',
    code: `function findKthLargest(nums, k):
    min_heap = []
    for num in nums:
        heappush(min_heap, num)
        if len(min_heap) > k:
            heappop(min_heap)
    return min_heap[0]`
  },
  pythonCode: {
    title: 'Python Top-K Frequent Elements',
    code: `import heapq
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    # Min-heap of size k storing (frequency, val)
    heap = []
    for val, freq in count.items():
        heapq.heappush(heap, (freq, val))
        if len(heap) > k:
            heapq.heappop(heap)
            
    return [val for freq, val in heap]`,
    explanation: 'Maintains Min-Heap of size k comparing frequencies.'
  },
  runnableCode: {
    code: `print(top_k_frequent([1, 1, 1, 2, 2, 3], 2))`,
    expectedOutput: `[2, 1]`
  },
  lineByLineExplanation: [
    { line: 8, code: 'heapq.heappush(heap, (freq, val))', explanation: 'Tuples are compared by first element (freq).' },
    { line: 9, code: 'if len(heap) > k: heapq.heappop(heap)', explanation: 'Evicts the least frequent element among the candidates, maintaining size k.' }
  ],
  edgeCases: [
    { case: 'k equals array length', handling: 'Heap retains all elements, returns entire set.', example: 'k = len(nums)' }
  ],
  commonMistakes: [
    { mistake: 'Using a Max-Heap instead of a Min-Heap for finding K largest', solution: 'A Max-Heap root is the largest element, so popping drops the largest! A Min-Heap keeps the kth largest at the root.', codeExample: '# Use Min-Heap of size k for K largest' }
  ],
  applications: [
    { industry: 'Search Engines', application: 'Top trending search terms and social hashtags', benefit: 'Tracks top 100 queries in streaming real-time without unbounded RAM.' }
  ],
  practiceQuestions: [
    { id: 'pq-tk-1', question: 'When is Quickselect preferred over a Min-Heap of size k?', hint: 'Consider in-memory vs streaming data.', answer: 'Quickselect achieves O(n) average time for static in-memory arrays. Min-Heap is preferred for streaming or distributed data where k << n.' }
  ],
  quiz: [
    { id: 'q-tk-1', question: 'Why does finding the K largest elements require a MIN-heap of size k?', options: ['The root of the min-heap is the smallest of the top k, acting as the entry threshold', 'Max-heaps cannot be bounded', 'Python only has min-heaps', 'Min-heaps take less memory'], correctIndex: 0, explanation: 'The root of a min-heap holds the minimum of the k largest elements; any new element must beat this root to enter.' }
  ],
  codingChallenge: {
    title: 'K Closest Points to Origin',
    problem: 'Given an array of points where points[i] = [xi, yi] and an integer k, return the k closest points to the origin (0, 0).',
    hints: ['Use a Max-Heap of size k storing (-dist, point).'],
    starterCode: `import heapq

def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    # TODO: Find k closest points
    pass`,
    solution: `import heapq

def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    heap = []
    for x, y in points:
        dist = -(x * x + y * y)
        heapq.heappush(heap, (dist, [x, y]))
        if len(heap) > k:
            heapq.heappop(heap)
    return [pt for dist, pt in heap]`
  },
  summary: {
    keyTakeaways: ['Use Min-Heap of size k for K Largest.', 'Use Max-Heap of size k for K Smallest.'],
    nextLessonId: 'dsa-heap-k-way-merge',
    nextLessonTitle: 'K-Way Merge Using Heaps',
    nextLessonModuleId: 'dsa-module-9'
  }
};

m9Lessons['dsa-heap-k-way-merge'] = {
  id: 'dsa-heap-k-way-merge',
  moduleId: 'dsa-module-9',
  title: 'K-Way Merge Using Heaps',
  subtitle: 'External Sorting, Merging K Sorted Streams in O(N log k)',
  order: 6,
  readTimeMinutes: 22,
  difficulty: 'Advanced',
  visualizerType: 'heap',
  objectives: [
    'Merge k sorted lists/streams into a single sorted list in O(N log k) time.',
    'Store tuple state (val, list_idx, element_idx) in Min-Heap.',
    'Understand External Merge Sort for sorting datasets larger than RAM.',
    'Compare tournament trees with binary min-heaps for k-way merging.'
  ],
  prerequisites: ['Heap Insertion and Extraction', 'Top-K Problems'],
  analogy: {
    title: 'Merging Highway Traffic Lanes into One Exit',
    text: 'At a toll booth, cars from 8 incoming highway lanes merge into a single exit ramp. A traffic officer looks at the car at the front of each of the 8 lanes, picks the one that arrived earliest, lets it pass, and the next car in that lane rolls forward.',
    metaphor: 'The min-heap holds the current head of each of the k sorted streams.'
  },
  problemSolved: {
    title: 'Consolidating Distributed Sorted Datasets',
    description: 'Merging k sorted lists pairwise takes O(k N) time. A Min-Heap of size k finds the smallest element among all active list heads in O(log k) time, reducing total time to O(N log k).',
    keyPoints: [
      'Total time: O(N log k) where N is total elements.',
      'Heap size never exceeds k.',
      'Foundational algorithm for distributed MapReduce and database external sort.'
    ]
  },
  intuition: {
    overview: 'Initialize Min-Heap with the first element of each of the k lists. Repeatedly pop the minimum element, append it to the result, and push the next element from that same list into the heap.',
    steps: [
      { step: 1, title: 'Seed Heap', description: 'Push (list[i][0], i, 0) for each non-empty list i.' },
      { step: 2, title: 'Extract Min', description: 'Pop (val, list_idx, elem_idx) and append val to output.' },
      { step: 3, title: 'Advance Stream', description: 'If elem_idx + 1 < len(list[list_idx]), push next element into heap.' }
    ]
  },
  formalDefinition: {
    text: 'Let L_1, L_2, ..., L_k be sorted lists with total size N = \\sum_{i=1}^k |L_i|. A priority queue of size k extracts each of the N elements in O(\\log k) time.',
    latex: 'T(N, k) = \\sum_{i=1}^N \\mathcal{O}(\\log k) = \\mathcal{O}(N \\log k)'
  },
  complexity: {
    overview: 'Time: O(N log k). Space: O(k) auxiliary memory.',
    cases: [
      { case: 'Best', time: 'O(N log k)', space: 'O(k)', explanation: 'Consistent heap operations.' },
      { case: 'Average', time: 'O(N log k)', space: 'O(k)', explanation: 'Optimal multi-way merge.' },
      { case: 'Worst', time: 'O(N log k)', space: 'O(k)', explanation: 'Uniformly bounded.' }
    ],
    spaceNote: 'Heap size bounded by k.'
  },
  workedExample: {
    title: 'Merging 3 lists: [1, 4, 5], [1, 3, 4], [2, 6]',
    input: 'k=3 lists, total N=8 elements',
    steps: [
      { step: 1, action: 'Initial Heap', state: 'Heap holds [(1, L0), (1, L1), (2, L2)]', explanation: 'Heads of all 3 lists.' },
      { step: 2, action: 'Pop 1 from L0', state: 'Result=[1], push 4 from L0', explanation: 'L0 advances.' },
      { step: 3, action: 'Pop 1 from L1', state: 'Result=[1, 1], push 3 from L1', explanation: 'L1 advances.' },
      { step: 4, action: 'Pop 2 from L2', state: 'Result=[1, 1, 2], push 6 from L2', explanation: 'L2 advances.' }
    ],
    finalOutput: 'Merged: [1, 1, 2, 3, 4, 4, 5, 6]'
  },
  visualExplanation: {
    title: 'K-Way Sieve',
    description: 'Visualizing k queues feeding into a min-heap funnel that emits a single sorted stream.',
    features: ['k lanes feed into central min-heap', 'Min-heap outputs sorted elements in O(log k)']
  },
  pseudocode: {
    title: 'K-Way Merge Algorithm',
    code: `function mergeKLists(lists):
    heap = new MinHeap()
    for i, lst in enumerate(lists):
        if lst: heap.push((lst[0], i, 0))
    result = []
    while not heap.isEmpty():
        val, list_idx, idx = heap.pop()
        result.append(val)
        if idx + 1 < len(lists[list_idx]):
            heap.push((lists[list_idx][idx + 1], list_idx, idx + 1))
    return result`
  },
  pythonCode: {
    title: 'Python Merge K Sorted Lists',
    code: `import heapq

def merge_k_sorted_lists(lists: list[list[int]]) -> list[int]:
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
            
    res = []
    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        res.append(val)
        if elem_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))
            
    return res`,
    explanation: 'Maintains Min-Heap of size k tracking (val, list_idx, elem_idx).'
  },
  runnableCode: {
    code: `lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
print(merge_k_sorted_lists(lists))`,
    expectedOutput: `[1, 1, 2, 3, 4, 4, 5, 6]`
  },
  lineByLineExplanation: [
    { line: 7, code: 'heapq.heappush(heap, (lst[0], i, 0))', explanation: 'Seeds heap with the head of each non-empty list.' },
    { line: 15, code: 'heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))', explanation: 'Pushes the next candidate from the same list that produced the extracted minimum.' }
  ],
  edgeCases: [
    { case: 'Empty lists inside input', handling: 'Guarded by if lst check; does not crash.', example: '[[], [1], []]' }
  ],
  commonMistakes: [
    { mistake: 'Comparing objects without unique tie-breakers in tuple', solution: 'Include list_idx and elem_idx in tuple (val, list_idx, elem_idx) so Python never compares list objects when values match.', codeExample: '(val, list_idx, elem_idx) # avoids object comparison error' }
  ],
  applications: [
    { industry: 'Database Systems', application: 'External Merge Sort on Multi-Terabyte Tables', benefit: 'Merges disk-backed sorted runs with minimal memory footprint.' }
  ],
  practiceQuestions: [
    { id: 'pq-kw-1', question: 'What is the time complexity of merging k sorted lists pairwise vs using a min-heap?', hint: 'Pairwise takes O(k * N).', answer: 'Pairwise merging takes O(k * N) because each merge pass touches O(N) elements k times. A min-heap does it in O(N log k).' }
  ],
  quiz: [
    { id: 'q-kw-1', question: 'What is the maximum number of elements in the heap during K-Way Merge?', options: ['k', 'N', 'N / k', 'log k'], correctIndex: 0, explanation: 'The heap contains at most one element from each of the k lists at any time, keeping its size bounded by k.' }
  ],
  codingChallenge: {
    title: 'Find K Pairs with Smallest Sums',
    problem: 'Given two integer arrays nums1 and nums2 sorted in ascending order and an integer k, return the k pairs (u, v) with the smallest sums.',
    hints: ['Treat nums1[i] + nums2[j] as k sorted lists; use a min-heap of size min(k, len(nums1)).'],
    starterCode: `import heapq

def k_smallest_pairs(nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
    # TODO: Find k smallest sum pairs
    pass`,
    solution: `import heapq

def k_smallest_pairs(nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
    if not nums1 or not nums2: return []
    heap = []
    for i in range(min(k, len(nums1))):
        heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))
    res = []
    while heap and len(res) < k:
        total, i, j = heapq.heappop(heap)
        res.append([nums1[i], nums2[j]])
        if j + 1 < len(nums2):
            heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
    return res`
  },
  summary: {
    keyTakeaways: ['K-way merge consolidates k sorted sequences in O(N log k) time.', 'Heap size is strictly bounded by k.'],
    nextLessonId: 'dsa-heap-applications',
    nextLessonTitle: 'Priority Queue Applications',
    nextLessonModuleId: 'dsa-module-9'
  }
};

m9Lessons['dsa-heap-applications'] = {
  id: 'dsa-heap-applications',
  moduleId: 'dsa-module-9',
  title: 'Priority Queue Applications',
  subtitle: 'Dijkstra\'s Algorithm, Huffman Coding, Median Finding & Task Schedulers',
  order: 7,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Synthesize priority queue patterns across diverse computer science domains.',
    'Implement Find Median from Data Stream using a Dual-Heap architecture.',
    'Understand greedy prefix code construction via Huffman Coding trees.',
    'Model CPU process schedulers and task cooling intervals using heaps.'
  ],
  prerequisites: ['Min Heap and Max Heap', 'Top-K Problems'],
  analogy: {
    title: 'The Hospital Emergency Room Triage',
    text: 'Patients in an emergency room are not treated FIFO. A heart attack patient is treated immediately ahead of a broken arm patient, regardless of who arrived first. A priority queue schedules treatments dynamically by urgency rank.',
    metaphor: 'Priority queues schedule execution based on importance rather than arrival time.'
  },
  problemSolved: {
    title: 'Continuous Real-Time Median and Priority Scheduling',
    description: 'Finding the median of a dynamic stream naively requires sorting in O(n log n). A dual-heap system (Max-Heap for lower half, Min-Heap for upper half) delivers the median in strictly O(1) time with O(log n) insertions.',
    keyPoints: [
      'Dual heap maintains continuous median in O(1).',
      'Powers Huffman data compression trees.',
      'Drives Dijkstra\'s single-source shortest path algorithm.'
    ]
  },
  intuition: {
    overview: 'Split data into two halves: Max-Heap `small` stores lower half, Min-Heap `large` stores upper half. Maintain size balance (|small| - |large| <= 1). Median is either root of small or average of both roots.',
    steps: [
      { step: 1, title: 'Push Number', description: 'Push to small (as negative for max-heap). Balance top to large.' },
      { step: 2, title: 'Size Invariant', description: 'If len(large) > len(small): transfer large root back to small.' },
      { step: 3, title: 'Find Median', description: 'If sizes unequal: return small root. Else return (small root + large root) / 2.' }
    ]
  },
  formalDefinition: {
    text: 'A dual-heap maintains partitions L and R such that \\max(L) \\le \\min(R) and |L| - |R| \\in \\{0, 1\\}. The median M satisfies M = \\max(L) if |L| > |R|, else (\\max(L) + \\min(R))/2.',
    latex: '\\forall x \\in L, \\, y \\in R : x \\le y \\quad \\land \\quad |L| \\ge |R| \\ge |L| - 1'
  },
  complexity: {
    overview: 'addNum: O(log n). findMedian: O(1). Space: O(n).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(n)', explanation: 'Instant median retrieval.' },
      { case: 'Average', time: 'O(log n)', space: 'O(n)', explanation: 'Heap rebalance.' },
      { case: 'Worst', time: 'O(log n)', space: 'O(n)', explanation: 'Single log n heap sift per insertion.' }
    ],
    spaceNote: 'O(n) storage divided across two heaps.'
  },
  workedExample: {
    title: 'Streaming Median Trace on [5, 2, 8, 1]',
    input: 'Stream: 5, 2, 8, 1',
    steps: [
      { step: 1, action: 'Add 5', state: 'small=[5], large=[] -> Median = 5', explanation: 'One element.' },
      { step: 2, action: 'Add 2', state: 'small=[2], large=[5] -> Median = (2+5)/2 = 3.5', explanation: 'Equal sizes.' },
      { step: 3, action: 'Add 8', state: 'small=[5, 2], large=[8] -> Median = 5', explanation: 'small has 2, large has 1.' },
      { step: 4, action: 'Add 1', state: 'small=[2, 1], large=[5, 8] -> Median = (2+5)/2 = 3.5', explanation: 'Equal sizes.' }
    ],
    finalOutput: 'Median correctly maintained at every step in O(1).'
  },
  visualExplanation: {
    title: 'Dual-Heap Balance Beam',
    description: 'Visualizing data split evenly across lower Max-Heap and upper Min-Heap balance scales.',
    features: ['Max-Heap holds lower 50%', 'Min-Heap holds upper 50%', 'Medians meet in the center']
  },
  pseudocode: {
    title: 'MedianFinder Dual-Heap',
    code: `class MedianFinder:
    def addNum(num):
        heappush(small, -num) # max heap
        heappush(large, -heappop(small))
        if len(large) > len(small):
            heappush(small, -heappop(large))

    def findMedian():
        if len(small) > len(large):
            return -small[0]
        return (-small[0] + large[0]) / 2.0`
  },
  pythonCode: {
    title: 'Python MedianFinder Class',
    code: `import heapq

class MedianFinder:
    def __init__(self):
        # small is a max-heap (negated values)
        self.small = []
        # large is a min-heap
        self.large = []

    def add_num(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        # Invariant: every element in small <= every element in large
        heapq.heappush(self.large, -heapq.heappop(self.small))
        
        # Balance sizes so len(small) >= len(large)
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def find_median(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
    explanation: 'Uses dual-heap architecture to maintain continuous median in O(1) query time.'
  },
  runnableCode: {
    code: `mf = MedianFinder()
for x in [5, 2, 8, 1]:
    mf.add_num(x)
    print(f"Added {x}, median = {mf.find_median()}")`,
    expectedOutput: `Added 5, median = 5.0\nAdded 2, median = 3.5\nAdded 8, median = 5.0\nAdded 1, median = 3.5`
  },
  lineByLineExplanation: [
    { line: 11, code: 'heapq.heappush(self.small, -num)', explanation: 'Negates value to simulate a max-heap using Python\'s built-in min-heap.' },
    { line: 13, code: 'heapq.heappush(self.large, -heapq.heappop(self.small))', explanation: 'Filters new candidate through small to guarantee it is strictly <= large.' }
  ],
  edgeCases: [
    { case: 'Single element stream', handling: 'Directly returns that single element from small.', example: 'add_num(10) -> 10.0' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting to negate values when extracting from the simulated max-heap', solution: 'Always use -self.small[0] to restore the original sign.', codeExample: 'median = -self.small[0]' }
  ],
  applications: [
    { industry: 'Data Compression', application: 'Huffman Coding Tree generation', benefit: 'Repeatedly merges two lowest-frequency symbols to generate prefix codes.' }
  ],
  practiceQuestions: [
    { id: 'pq-pa-1', question: 'How does Dijkstra\'s algorithm utilize a priority queue?', hint: 'Look at min distance extraction.', answer: 'Dijkstra stores (distance, vertex) pairs in a Min-Heap, extracting the unvisited vertex with minimum tentative distance in O(log V) time.' }
  ],
  quiz: [
    { id: 'q-pa-1', question: 'What is the time complexity to retrieve the running median in the Dual-Heap pattern?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctIndex: 0, explanation: 'The median is derived solely from the roots of the two heaps, which are peeked in O(1) time.' }
  ],
  codingChallenge: {
    title: 'Task Scheduler',
    problem: 'Given a characters array tasks representing CPU tasks and cooling interval n, return the least number of units of times that the CPU will take to finish all tasks.',
    hints: ['Count frequencies with Counter; max frequency determines idle frame layout.'],
    starterCode: `from collections import Counter

def least_interval(tasks: list[str], n: int) -> int:
    # TODO: Implement task scheduler
    pass`,
    solution: `from collections import Counter

def least_interval(tasks: list[str], n: int) -> int:
    counts = Counter(tasks)
    max_freq = max(counts.values())
    max_freq_count = sum(1 for v in counts.values() if v == max_freq)
    return max(len(tasks), (max_freq - 1) * (n + 1) + max_freq_count)`
  },
  summary: {
    keyTakeaways: ['Dual heaps provide continuous O(1) median tracking.', 'Priority queues are central to Dijkstra, Huffman coding, and OS scheduling.'],
    nextLessonId: 'dsa-graph-representation',
    nextLessonTitle: 'Graph Representation: Adjacency List and Matrix',
    nextLessonModuleId: 'dsa-module-10'
  }
};

const dsa9Path = path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-9.ts');
writeModuleFile(dsa9Path, m9.data, m9Lessons);
console.log('Module 9 completed! Authored: ' + Object.keys(m9Lessons).length);
