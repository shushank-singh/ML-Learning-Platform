const fs = require('fs');
const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

// --- MODULE 1 ---
const m1 = getExistingDSALessons(1);
const m1Lessons = { ...m1.lessons };

m1Lessons['dsa-foundations-what-is-dsa'] = {
  id: 'dsa-foundations-what-is-dsa',
  moduleId: 'dsa-module-1',
  title: 'What Are Data Structures and Algorithms?',
  subtitle: 'The Architectural Foundations of Computational Efficiency',
  order: 1,
  readTimeMinutes: 15,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Distinguish between Abstract Data Types (ADTs) and physical data structures.',
    'Understand how CPU memory hierarchy and hardware cache lines affect algorithmic performance.',
    'Identify fundamental trade-offs between space complexity and time complexity.',
    'Frame real-world engineering problems into formal algorithmic abstractions.'
  ],
  prerequisites: [
    'Basic programming fluency in Python',
    'Understanding of variables, loops, and conditional branching'
  ],
  analogy: {
    title: 'The Modern Amazon Fulfillment Center',
    text: 'Imagine a global logistics warehouse holding millions of items. If workers dumped inventory into one giant unstructured pile, finding an order would require a tedious linear scan of every box—taking days. Instead, the warehouse employs structured bin locations, barcode indexing, conveyor routing, and dispatch queues. Data structures are the shelving, bins, and catalog systems that organize bytes; algorithms are the automated routing protocols and pick-and-pack instructions that fulfill requests with minimal motion and zero wasted time.',
    metaphor: 'Data structures organize digital inventory; algorithms are the optimized dispatch procedures that query and transform it.'
  },
  problemSolved: {
    title: 'Preventing Computational Collapse at Scale',
    description: 'Computers do not have infinite speed or memory. An unoptimized O(n^2) algorithm processing 1,000,000 records takes 10^12 operations (approx. 15 minutes of CPU execution), whereas an optimal O(n log n) algorithm finishes in under 0.05 seconds. Choosing the right data structure prevents software from grinding to a halt under real-world loads.',
    keyPoints: [
      'Separates interface specifications (ADTs) from implementation details',
      'Minimizes memory footprint and CPU instruction cycles',
      'Enables sub-linear and logarithmic search across billions of records'
    ]
  },
  intuition: {
    overview: 'Computation is the manipulation of state across memory addresses. Efficiency depends on minimizing read/write operations and spatial jumps in RAM.',
    steps: [
      { step: 1, title: 'Input Formalization', description: 'Transform raw business data into structured inputs with known bounds.' },
      { step: 2, title: 'Invariable Selection', description: 'Select a data structure whose invariants naturally uphold required access patterns.' },
      { step: 3, title: 'Algorithmic Prescription', description: 'Design deterministic steps guaranteeing convergence and correctness.' },
      { step: 4, title: 'Complexity Validation', description: 'Audit asymptotic growth against physical latency and memory constraints.' }
    ]
  },
  formalDefinition: {
    text: 'A Data Structure is a specialized format for organizing, processing, retrieving, and storing data. An Algorithm is an unambiguous, finite sequence of computer-implementable instructions to solve a class of problems.',
    latex: '\\text{Program} = \\text{Data Structures} + \\text{Algorithms}'
  },
  complexity: {
    overview: 'Algorithm efficiency is measured asymptotically as input size n tends to infinity.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Instantaneous response when answer resides at initial access point.' },
      { case: 'Average', time: 'O(log n) to O(n)', space: 'O(1) to O(n)', explanation: 'Typical operational cost across uniform random distribution.' },
      { case: 'Worst', time: 'O(n) to O(n^2)', space: 'O(n)', explanation: 'Degraded path when input structure induces maximum comparisons.' }
    ],
    spaceNote: 'Space complexity encompasses both working auxiliary memory and call-stack frame allocations.'
  },
  workedExample: {
    title: 'Comparing Linear Search vs. Direct Hash Indexing',
    input: 'Dataset: 1,000,000 user IDs. Query: Find user 849,201.',
    steps: [
      { step: 1, action: 'Unstructured Linear Scan', state: 'Iterating index 0 to 849,201', explanation: 'Checks 849,201 elements one by one taking 849,201 comparison operations.' },
      { step: 2, action: 'Direct Key Hashing', state: 'Hash(849201) -> memory bucket', explanation: 'Computes memory address mathematically in O(1) time and retrieves user in 1 memory dereference.' }
    ],
    finalOutput: 'Hash table completes in 0.0001ms vs. Linear search taking 12ms.'
  },
  visualExplanation: {
    title: 'Random Access Memory and Pointer Indirection',
    description: 'Arrays provide O(1) direct address arithmetic: Address(arr[i]) = Base + i * Size. Linked nodes require O(n) sequential pointer hopping across fragmented heap memory.',
    features: ['Contiguous RAM blocks', 'CPU L1/L2 cache prefetching', 'Heap reference indirection']
  },
  pseudocode: {
    title: 'Abstract Linear vs Index Lookup',
    code: `function linear_search(collection, target):
    for each item in collection:
        if item == target: return True
    return False

function indexed_lookup(hash_map, key):
    bucket = hash(key) mod capacity
    return hash_map[bucket]`
  },
  pythonCode: {
    title: 'Benchmarking Linear Search vs Hash Lookup in Python',
    code: `import time

def benchmark():
    data_list = list(range(100000))
    data_set = set(data_list)
    target = 99999

    t0 = time.perf_counter()
    found_list = target in data_list
    t_list = time.perf_counter() - t0

    t1 = time.perf_counter()
    found_set = target in data_set
    t_set = time.perf_counter() - t1

    return found_list, found_set, t_list > t_set

found_l, found_s, is_faster = benchmark()
print(f"List search: {found_l}, Set lookup: {found_s}, Set was faster: {is_faster}")`,
    explanation: 'Demonstrates the exponential difference between O(n) list inspection and O(1) hash set lookup in Python.'
  },
  runnableCode: {
    code: `data = [10, 20, 30, 40, 50]
target = 40
found_index = -1
for i, val in enumerate(data):
    if val == target:
        found_index = i
        break
print(f"Target {target} located at index {found_index}")`,
    expectedOutput: 'Target 40 located at index 3'
  },
  lineByLineExplanation: [
    { lines: '1', codeSnippet: 'data = [10, 20, 30, 40, 50]', explanation: 'Initializes contiguous array of integers in memory.' },
    { lines: '4-7', codeSnippet: 'for i, val in enumerate(data):\n    if val == target:\n        found_index = i', explanation: 'Sequential scan checking each memory cell until target is located.' },
    { lines: '8', codeSnippet: 'print(...)', explanation: 'Outputs the zero-indexed location of target element.' }
  ],
  edgeCases: [
    { case: 'Empty Collection', handling: 'Immediately return not-found before entering loops.', example: 'data = [], target = 5 -> -1' },
    { case: 'Target at First Position', handling: 'O(1) best case return on first iteration.', example: 'data = [5, 10, 15], target = 5 -> index 0' },
    { case: 'Target Not Present', handling: 'Exhaust full scan and return sentinel -1.', example: 'data = [1, 2, 3], target = 9 -> -1' }
  ],
  commonMistakes: [
    { mistake: 'Using a linear list for frequent membership tests.', solution: 'Convert collection to a set or dict for O(1) lookups.', codeExample: '# Slow: x in list_data\n# Fast: x in set_data' },
    { mistake: 'Premature optimization without analyzing scale.', solution: 'Measure profiling bottlenecks before replacing simple arrays with complex trees.' }
  ],
  applications: [
    { industry: 'Search Engines', application: 'Inverted Indexing', benefit: 'Allows Google to locate keywords across billions of web pages in milliseconds.' },
    { industry: 'Database Systems', application: 'B-Tree Indexing', benefit: 'Minimizes disk I/O reads by grouping sorted records into memory-page sized blocks.' }
  ],
  practiceQuestions: [
    { id: 'dsa-1-1-q1', question: 'What is the key difference between an ADT and a Data Structure?', hint: 'Think interface versus concrete implementation.', answer: 'An ADT defines what operations are supported and their mathematical contracts (e.g., Queue: FIFO), while a Data Structure is the concrete physical representation in memory (e.g., Circular Array, Singly Linked List).' },
    { id: 'dsa-1-1-q2', question: 'Why does CPU cache locality favor contiguous arrays over linked lists?', hint: 'Consider spatial locality and cache lines.', answer: 'CPUs fetch memory in 64-byte cache lines. Contiguous array elements are loaded into L1/L2 cache in a single read, whereas linked list nodes are scattered across RAM causing frequent cache misses.' },
    { id: 'dsa-1-1-q3', question: 'When is a simple array preferred over a hash table?', hint: 'Consider memory overhead and small N.', answer: 'When dataset size is very small, when ordering matters, or when memory overhead of hash buckets and collision pointers outweighs search savings.' }
  ],
  quiz: [
    {
      id: 'dsa-1-1-quiz-1',
      question: 'Which of the following describes an Abstract Data Type (ADT)?',
      options: [
        'A high-level specification of data operations without implementation details',
        'A hardware register inside the CPU',
        'A compiled binary executable',
        'A specific memory address pointer'
      ],
      correctIndex: 0,
      explanation: 'An ADT defines the logical interface and behaviors (e.g., Stack, Queue, Map) independent of language and hardware storage.'
    },
    {
      id: 'dsa-1-1-quiz-2',
      question: 'Why is accessing arr[i] in an array O(1) time?',
      options: [
        'The CPU checks every prior index in parallel',
        'Direct pointer arithmetic computes memory address: Base + (i * element_size)',
        'The compiler guesses the element location using a neural network',
        'Python caches all possible integer values in RAM'
      ],
      correctIndex: 1,
      explanation: 'Contiguous memory layout allows constant-time direct address arithmetic without traversing intermediate elements.'
    },
    {
      id: 'dsa-1-1-quiz-3',
      question: 'Which operation is generally faster due to CPU cache spatial locality?',
      options: [
        'Traversing a 1,000,000-element contiguous primitive array',
        'Traversing a 1,000,000-element scattered linked list',
        'Both have identical hardware execution times',
        'Traversing a doubly linked list backwards'
      ],
      correctIndex: 0,
      explanation: 'Contiguous arrays leverage hardware spatial locality and cache line prefetching, making sequential iteration significantly faster than pointer chasing.'
    }
  ],
  codingChallenge: {
    title: 'Find First Duplicate Element',
    problem: 'Given an integer list nums, find and return the first duplicate element. If no element appears more than once, return -1. Optimize your solution using an appropriate data structure.',
    starterCode: `def find_first_duplicate(nums):
    # Use a set to track visited elements in O(1) average time
    seen = set()
    for x in nums:
        if x in seen:
            return x
        seen.add(x)
    return -1

# Test
print(find_first_duplicate([2, 5, 1, 2, 3, 5])) # Expected: 2`,
    solution: `def find_first_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return x
        seen.add(x)
    return -1

print(find_first_duplicate([2, 5, 1, 2, 3, 5]))`,
    hints: [
      'A brute force O(n^2) approach compares every pair of indices.',
      'Using a hash set allows O(1) membership testing on each element.',
      'Return immediately as soon as you find an element already in seen.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Data structures govern physical and logical memory layout.',
      'Algorithms prescribe step-by-step state transformations.',
      'Abstract Data Types separate contract from memory implementation.',
      'Hardware cache hierarchy heavily rewards contiguous memory patterns.'
    ],
    nextLessonId: 'dsa-foundations-time-complexity',
    nextLessonTitle: 'Time Complexity Analysis',
    nextLessonModuleId: 'dsa-module-1'
  }
};

m1Lessons['dsa-foundations-time-complexity'] = {
  id: 'dsa-foundations-time-complexity',
  moduleId: 'dsa-module-1',
  title: 'Time Complexity Analysis',
  subtitle: 'Counting Primitive Operations, RAM Model & Asymptotic Scaling',
  order: 2,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Model CPU execution using the Random Access Machine (RAM) model.',
    'Count primitive operations (assignments, comparisons, arithmetic) precisely.',
    'Isolate dominant polynomial terms and discard scale-invariant constants.',
    'Analyze nested loop execution frequencies and arithmetic progressions.'
  ],
  prerequisites: [
    'What Are Data Structures and Algorithms?',
    'Basic algebra: polynomials and summation of series'
  ],
  analogy: {
    title: 'Evaluating Fuel Consumption Curves',
    text: 'A car company doesn’t test mileage by measuring individual drops of gas in a 10-foot driveway. They plot the fuel consumption curve against highway cruising speeds. At 100 mph, aerodynamic drag proportional to velocity squared (v^2) completely dwarfs tire rolling resistance. In algorithm analysis, as input size n explodes to billions, the dominant mathematical term dictates survival; tiny constant factors like variable assignment overhead fade into irrelevance.',
    metaphor: 'Time complexity is the mathematical curve of CPU consumption as input approaches infinity.'
  },
  problemSolved: {
    title: 'Hardware-Independent Performance Measurement',
    description: 'Benchmarking code by wall-clock time in seconds is flawed because it varies wildly depending on CPU clock speed, background processes, OS scheduling, and RAM bandwidth. Time complexity provides a rigorous, hardware-agnostic mathematical language to analyze algorithms.',
    keyPoints: [
      'Abstracts away hardware differences and compiler variations',
      'Accurately predicts how algorithms behave when scaling from 1,000 to 1,000,000,000 items',
      'Enables formal mathematical proofs of optimality'
    ]
  },
  intuition: {
    overview: 'Count the total number of basic machine steps executed by an algorithm as a mathematical function f(n) of input size n.',
    steps: [
      { step: 1, title: 'Identify Primitive Steps', description: 'Assignments, array indexing, arithmetic operations, and comparisons take O(1) time.' },
      { step: 2, title: 'Formulate Summation', description: 'Write loop iterations as mathematical sigma summations.' },
      { step: 3, title: 'Simplify the Polynomial', description: 'For f(n) = 3n^2 + 100n + 5000, isolate n^2 as the dominant asymptotic driver.' }
    ]
  },
  formalDefinition: {
    text: 'Under the RAM model, each instruction takes unit time c. The total running time T(n) is the sum of operations executed across all statements as a function of input size n.',
    latex: 'T(n) = \\sum_{i=1}^{k} c_i \\cdot \\text{count}(statement_i) = \\Theta(g(n))'
  },
  complexity: {
    overview: 'Classified into standard asymptotic categories from O(1) to O(n!).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Loop terminates on first comparison.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Examines approximately n/2 elements.' },
      { case: 'Worst', time: 'O(n^2)', space: 'O(1)', explanation: 'Fully nested double loop iterating over all pairs.' }
    ],
    spaceNote: 'Iterative counting algorithms use O(1) extra space.'
  },
  workedExample: {
    title: 'Analyzing Nested Loop Arithmetic Progression',
    input: 'Nested loops where outer loop runs n times and inner loop runs i times.',
    steps: [
      { step: 1, action: 'Outer Loop', state: 'i ranges from 0 to n-1', explanation: 'Outer loop runs n times total.' },
      { step: 2, action: 'Inner Loop Count', state: 'Iterations: 0 + 1 + 2 + ... + (n-1)', explanation: 'Sum of arithmetic progression = (n * (n - 1)) / 2 = 0.5 n^2 - 0.5 n.' },
      { step: 3, action: 'Asymptotic Reduction', state: 'Drop coefficient 0.5 and lower term -0.5n', explanation: 'The dominant term is n^2, giving O(n^2).' }
    ],
    finalOutput: 'Total operations = O(n^2)'
  },
  visualExplanation: {
    title: 'The Triangle Matrix of Nested Loops',
    description: 'Visualizing nested loops as a grid: an unconstrained n-by-n loop fills a square of area n^2. A dependent loop (j from i to n) fills the lower triangle of area n^2 / 2, which still scales quadratically as O(n^2).',
    features: ['Square matrix representation (n^2)', 'Triangular half-matrix ((n^2)/2)', 'Logarithmic step reduction']
  },
  pseudocode: {
    title: 'Nested Loop Complexity Counter',
    code: `total = 0
for i from 0 to n - 1:
    for j from 0 to i:
        total += 1 # Executed n(n+1)/2 times -> O(n^2)`
  },
  pythonCode: {
    title: 'Empirical Verification of Quadratic Growth',
    code: `def count_operations(n):
    ops = 0
    for i in range(n):
        for j in range(i + 1):
            ops += 1
    return ops

for size in [10, 100, 1000]:
    actual = count_operations(size)
    formula = (size * (size + 1)) // 2
    print(f"N={size}: Ops={actual}, Formula={formula}")`,
    explanation: 'Verifies mathematically that nested dependent loops yield exactly n(n+1)/2 operations.'
  },
  runnableCode: {
    code: `def count_ops(n):
    c = 0
    for i in range(n):
        for j in range(n):
            c += 1
    return c

print(f"Ops for N=10: {count_ops(10)}")
print(f"Ops for N=20: {count_ops(20)}")`,
    expectedOutput: 'Ops for N=10: 100\nOps for N=20: 400'
  },
  lineByLineExplanation: [
    { lines: '3', codeSnippet: 'for i in range(n):', explanation: 'Outer loop executes exactly n times.' },
    { lines: '4', codeSnippet: 'for j in range(n):', explanation: 'Inner loop executes n times for every outer iteration.' },
    { lines: '5', codeSnippet: 'c += 1', explanation: 'Total primitive body increments = n * n = n^2.' }
  ],
  edgeCases: [
    { case: 'n = 0', handling: 'Loops do not execute; returns 0 operations.', example: 'count_ops(0) -> 0' },
    { case: 'Inner loop dependent on while condition with step doubling', handling: 'Becomes O(n log n) rather than O(n^2).', example: 'j doubles each step (j *= 2)' }
  ],
  commonMistakes: [
    { mistake: 'Assuming two sequential loops multiply.', solution: 'Sequential loops add: O(n) + O(m) = O(n + m), whereas nested loops multiply: O(n * m).' },
    { mistake: 'Ignoring hidden operations in built-in methods.', solution: 'Remember that "x in list" is O(n), so calling it inside an O(n) loop makes the code O(n^2).' }
  ],
  applications: [
    { industry: 'High-Frequency Trading', application: 'Order Book Matching', benefit: 'Ensures engine executes limit orders in strict O(1) or O(log M) time to avoid financial slippage.' },
    { industry: 'Cloud Infrastructure', application: 'Autoscaling Metrics', benefit: 'Predicts CPU cluster requirements before traffic spikes occur.' }
  ],
  practiceQuestions: [
    { id: 'dsa-1-2-q1', question: 'What is the time complexity of a loop where i starts at 1 and doubles each step (i *= 2) until n?', hint: 'How many times can you double 1 before reaching n?', answer: 'O(log2 n), because 2^k = n implies k = log2(n) iterations.' },
    { id: 'dsa-1-2-q2', question: 'If Algorithm A takes 1000n steps and Algorithm B takes n^2 steps, which is faster for n = 2,000?', hint: 'Calculate 1000 * 2000 vs 2000^2.', answer: 'Algorithm A: 1000 * 2000 = 2,000,000 steps. Algorithm B: 2000 * 2000 = 4,000,000 steps. Algorithm A is twice as fast.' },
    { id: 'dsa-1-2-q3', question: 'Why do we ignore constant multipliers like the 3 in 3n^2?', hint: 'Think about asymptotic growth as n -> infinity.', answer: 'As n grows to millions, the exponent dominates behavior. Multiplying by 3 does not change how the function scales with respect to growth orders.' }
  ],
  quiz: [
    {
      id: 'dsa-1-2-quiz-1',
      question: 'What is the time complexity of: for i in range(n): for j in range(100): do_work()?',
      options: ['O(n)', 'O(100n^2)', 'O(n^2)', 'O(1)'],
      correctIndex: 0,
      explanation: 'Since 100 is a fixed constant independent of n, the inner loop executes a constant 100 times per iteration, yielding 100n = O(n).'
    },
    {
      id: 'dsa-1-2-quiz-2',
      question: 'What is the closed-form sum of 1 + 2 + 3 + ... + n?',
      options: ['n(n + 1) / 2', 'n^2', '2^n', 'n log n'],
      correctIndex: 0,
      explanation: 'The classic Gauss arithmetic series sum is n(n + 1)/2 = 0.5n^2 + 0.5n.'
    },
    {
      id: 'dsa-1-2-quiz-3',
      question: 'Calling "element in my_list" inside a loop of size n has what overall time complexity?',
      options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(1)'],
      correctIndex: 1,
      explanation: 'Membership test "in" on a Python list requires a linear scan O(n). Invoking it inside an O(n) loop yields O(n * n) = O(n^2).'
    }
  ],
  codingChallenge: {
    title: 'Analyze and Optimize Pair Sum',
    problem: 'Given an array of integers nums and an integer target, return True if there exist two distinct indices whose elements sum to target, otherwise False. Implement in O(n) time.',
    starterCode: `def has_pair_with_sum(nums, target):
    # Optimize from O(n^2) brute force to O(n) using a set
    seen = set()
    for x in nums:
        complement = target - x
        if complement in seen:
            return True
        seen.add(x)
    return False

print(has_pair_with_sum([10, 15, 3, 7], 17)) # Expected: True (10 + 7)`,
    solution: `def has_pair_with_sum(nums, target):
    seen = set()
    for x in nums:
        complement = target - x
        if complement in seen:
            return True
        seen.add(x)
    return False

print(has_pair_with_sum([10, 15, 3, 7], 17))`,
    hints: [
      'A brute force approach compares every pair (i, j) in O(n^2).',
      'For each element x, the required partner is target - x.',
      'Check if target - x has already been seen in a set in O(1) time.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Time complexity quantifies operational growth independent of physical hardware.',
      'Always focus on the highest-order dominant mathematical term.',
      'Nested loops with independent bounds multiply; sequential blocks add.',
      'Watch out for hidden O(n) calls inside built-in data structure methods.'
    ],
    nextLessonId: 'dsa-foundations-big-o',
    nextLessonTitle: 'Big O, Big Omega, and Big Theta Notation',
    nextLessonModuleId: 'dsa-module-1'
  }
};

m1Lessons['dsa-foundations-big-o'] = {
  id: 'dsa-foundations-big-o',
  moduleId: 'dsa-module-1',
  title: 'Big O, Big Omega, and Big Theta Notation',
  subtitle: 'Mathematical Rigor for Asymptotic Upper, Lower, and Tight Bounds',
  order: 3,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Define Big O (O), Big Omega (Ω), and Big Theta (Θ) mathematically.',
    'Prove asymptotic bounds using the formal (c, n0) witness definitions.',
    'Understand why Big O represents an upper bound and Big Omega a lower bound.',
    'Identify tight bounds (Big Theta) where upper and lower bounds coincide.'
  ],
  prerequisites: [
    'Time Complexity Analysis',
    'Understanding inequalities and mathematical limits'
  ],
  analogy: {
    title: 'The Budget Contract Agreement',
    text: 'When signing a commercial construction contract: Big O is the maximum guaranteed ceiling price ("This project will cost at most $500,000, no matter what happens"). Big Omega is the minimum base price ("The contractor will charge at least $100,000 even if materials are free"). Big Theta is the tight estimate ("When conditions are normal, the final price is bounded within 5% of $350,000"). Big O protects the client against worst-case disaster.',
    metaphor: 'Big O is the mathematical ceiling; Big Omega is the floor; Big Theta is the tight squeeze when floor and ceiling match.'
  },
  problemSolved: {
    title: 'Eliminating Ambiguity in Performance Guarantees',
    description: 'In engineering contracts and technical specifications, claiming an algorithm runs "fast" is meaningless. Big O, Big Omega, and Big Theta provide rigorous mathematical bounds that can be formally proven and verified.',
    keyPoints: [
      'Provides unambiguous mathematical definitions using quantifiers ∃ c, n0 > 0',
      'Distinguishes between worst-case guarantees and best-case anomalies',
      'Establishes asymptotic equivalence classes across algorithms'
    ]
  },
  intuition: {
    overview: 'Asymptotic notation compares the growth rate of two functions f(n) and g(n) for sufficiently large n.',
    steps: [
      { step: 1, title: 'Upper Bound (O)', description: 'f(n) <= c * g(n) for all n >= n0. f grows no faster than g.' },
      { step: 2, title: 'Lower Bound (Ω)', description: 'f(n) >= c * g(n) for all n >= n0. f grows at least as fast as g.' },
      { step: 3, title: 'Tight Bound (Θ)', description: 'c1 * g(n) <= f(n) <= c2 * g(n). f and g grow at the exact same rate.' }
    ]
  },
  formalDefinition: {
    text: 'Formal Asymptotic Definitions: f(n) = O(g(n)) iff ∃ c > 0, n0 > 0 such that ∀ n >= n0, 0 <= f(n) <= c * g(n). f(n) = Ω(g(n)) iff ∃ c > 0, n0 > 0 such that ∀ n >= n0, 0 <= c * g(n) <= f(n). f(n) = Θ(g(n)) iff f(n) = O(g(n)) and f(n) = Ω(g(n)).',
    latex: 'f(n) \\in \\mathcal{O}(g(n)) \\iff \\exists c > 0, n_0 > 0 : \\forall n \\ge n_0, 0 \\le f(n) \\le c \\cdot g(n)'
  },
  complexity: {
    overview: 'Asymptotic classes ranked from fastest to slowest growth: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Constant growth regardless of input magnitude.' },
      { case: 'Average', time: 'O(n log n)', space: 'O(n)', explanation: 'Optimal comparison-based sorting bound.' },
      { case: 'Worst', time: 'O(2^n)', space: 'O(n)', explanation: 'Exponential combinatorial explosion.' }
    ],
    spaceNote: 'Asymptotic notation applies identically to auxiliary space complexity.'
  },
  workedExample: {
    title: 'Formal Proof that 3n^2 + 5n + 7 = O(n^2)',
    input: 'Function f(n) = 3n^2 + 5n + 7. Claim: f(n) ∈ O(n^2).',
    steps: [
      { step: 1, action: 'Bound Linear and Constant Terms', state: 'For n >= 1, 5n <= 5n^2 and 7 <= 7n^2', explanation: 'Since n >= 1, n^2 is greater than or equal to n and 1.' },
      { step: 2, action: 'Sum Inequalities', state: '3n^2 + 5n + 7 <= 3n^2 + 5n^2 + 7n^2 = 15n^2', explanation: 'Group terms under the common n^2 factor.' },
      { step: 3, action: 'Identify Witnesses', state: 'Choose c = 15, n0 = 1', explanation: 'For all n >= 1, f(n) <= 15n^2 holds true. Q.E.D.' }
    ],
    finalOutput: 'Proof complete: c = 15, n0 = 1 validates 3n^2 + 5n + 7 ∈ O(n^2).'
  },
  visualExplanation: {
    title: 'Geometric Envelope of Asymptotic Bounds',
    description: 'Graphing c * g(n) above f(n) demonstrates the upper ceiling. Once n crosses the threshold n0, the curve f(n) is trapped strictly underneath the upper bound line.',
    features: ['Crossing point n0', 'Upper envelope c * g(n)', 'Asymptotic divergence']
  },
  pseudocode: {
    title: 'Mathematical Growth Comparison',
    code: `def compare_growth(n):
    return {
        "constant": 1,
        "logarithmic": log2(n),
        "linear": n,
        "linearithmic": n * log2(n),
        "quadratic": n ** 2,
        "exponential": 2 ** n
    }`
  },
  pythonCode: {
    title: 'Demonstrating Growth Explosion in Python',
    code: `import math

def print_growth_table():
    sizes = [1, 10, 20]
    print(f"{'N':<5} | {'log2(N)':<8} | {'N':<5} | {'N*log2(N)':<10} | {'N^2':<6} | {'2^N':<10}")
    print("-" * 55)
    for n in sizes:
        log_n = math.log2(n) if n > 0 else 0
        n_log_n = n * log_n
        n_sq = n ** 2
        exp_n = 2 ** n
        print(f"{n:<5} | {log_n:<8.2f} | {n:<5} | {n_log_n:<10.1f} | {n_sq:<6} | {exp_n:<10}")

print_growth_table()`,
    explanation: 'Demonstrates why exponential complexity O(2^n) becomes completely intractable for even moderate inputs like n=50.'
  },
  runnableCode: {
    code: `import math
n = 16
print(f"O(1): {1}")
print(f"O(log n): {math.log2(n):.0f}")
print(f"O(n): {n}")
print(f"O(n log n): {n * math.log2(n):.0f}")
print(f"O(n^2): {n**2}")`,
    expectedOutput: 'O(1): 1\nO(log n): 4\nO(n): 16\nO(n log n): 64\nO(n^2): 256'
  },
  lineByLineExplanation: [
    { lines: '2', codeSnippet: 'n = 16', explanation: 'Set input size to 16 for clean powers-of-two comparisons.' },
    { lines: '4', codeSnippet: 'print(f"O(log n): {math.log2(n):.0f}")', explanation: 'Log2 of 16 is 4 steps.' },
    { lines: '7', codeSnippet: 'print(f"O(n^2): {n**2}")', explanation: '16 squared is 256 steps.' }
  ],
  edgeCases: [
    { case: 'f(n) = 1000 and g(n) = 1', handling: 'Both are O(1) despite constant magnitude difference.', example: 'c = 1000, n0 = 1' },
    { case: 'Tight vs Loose Bounds', handling: 'n is O(n^2) technically, but Θ(n) is the strictly tight bound.', example: 'Prefer Θ(n) for accuracy' }
  ],
  commonMistakes: [
    { mistake: 'Saying an algorithm is "Big O of n" when you mean tight bound.', solution: 'Use Big Theta (Θ) when upper and lower bounds match.' },
    { mistake: 'Assuming Big O applies only to worst case.', solution: 'Big O can be applied to describe the upper bound of best, average, or worst case.' }
  ],
  applications: [
    { industry: 'Database Query Optimizers', application: 'Cost-Based Query Planning', benefit: 'PostgreSQL planner chooses between Nested Loop, Hash Join, or Merge Join based on asymptotic cost formulas.' },
    { industry: 'Cryptography', application: 'Hardness Assumptions', benefit: 'RSA security relies on integer factorization having super-polynomial complexity.' }
  ],
  practiceQuestions: [
    { id: 'dsa-1-3-q1', question: 'Is 2^(n+1) = O(2^n)? Prove or disprove.', hint: 'Use exponent rules: 2^(n+1) = 2 * 2^n.', answer: 'Yes, 2^(n+1) = 2 * 2^n. Setting c = 2 and n0 = 1 proves 2^(n+1) <= 2 * 2^n for all n >= 1. Hence, 2^(n+1) ∈ O(2^n).' },
    { id: 'dsa-1-3-q2', question: 'Is 2^(2n) = O(2^n)?', hint: '2^(2n) = (2^2)^n = 4^n.', answer: 'No. 2^(2n) = 4^n. The ratio 4^n / 2^n = 2^n approaches infinity as n -> inf, so no constant c exists.' },
    { id: 'dsa-1-3-q3', question: 'What does f(n) = Θ(g(n)) tell us that f(n) = O(g(n)) does not?', hint: 'Think about lower bounds.', answer: 'Big O is only an upper bound (f could grow much slower). Big Theta proves f grows at the exact same rate as g from both above and below.' }
  ],
  quiz: [
    {
      id: 'dsa-1-3-quiz-1',
      question: 'Which notation represents a tight asymptotic bound (matching upper and lower bounds)?',
      options: ['Big Theta (Θ)', 'Big O (O)', 'Big Omega (Ω)', 'Little o (o)'],
      correctIndex: 0,
      explanation: 'Big Theta (Θ) denotes asymptotically tight bounds where both upper bound O(g(n)) and lower bound Ω(g(n)) hold simultaneously.'
    },
    {
      id: 'dsa-1-3-quiz-2',
      question: 'Which of the following functions grows the fastest asymptotically as n -> infinity?',
      options: ['n^2', '2^n', 'n log n', 'n^100'],
      correctIndex: 1,
      explanation: 'Any exponential function c^n (c > 1) eventually outgrows any polynomial n^k, no matter how large the constant exponent k is.'
    },
    {
      id: 'dsa-1-3-quiz-3',
      question: 'If f(n) = 5n + 12, what are valid witness values (c, n0) to prove f(n) = O(n)?',
      options: ['c = 17, n0 = 1', 'c = 1, n0 = 100', 'c = 0, n0 = 0', 'c = -5, n0 = 1'],
      correctIndex: 0,
      explanation: 'For n >= 1, 5n + 12 <= 5n + 12n = 17n. Thus c = 17 and n0 = 1 satisfy the formal definition.'
    }
  ],
  codingChallenge: {
    title: 'Classify Complexity Experimentally',
    problem: 'Write a function test_growth(func, n) that runs a given function with input size n and returns the ratio of execution steps when size doubles (step_count(2n) / step_count(n)). For O(n^2), the ratio approaches 4.',
    starterCode: `def step_counter_quadratic(n):
    steps = 0
    for i in range(n):
        for j in range(n):
            steps += 1
    return steps

def measure_doubling_ratio(n=100):
    steps_n = step_counter_quadratic(n)
    steps_2n = step_counter_quadratic(2 * n)
    ratio = steps_2n / steps_n
    return round(ratio, 2)

print(f"Doubling ratio: {measure_doubling_ratio(100)}") # Expected: ~4.0`,
    solution: `def step_counter_quadratic(n):
    steps = 0
    for i in range(n):
        for j in range(n):
            steps += 1
    return steps

def measure_doubling_ratio(n=100):
    steps_n = step_counter_quadratic(n)
    steps_2n = step_counter_quadratic(2 * n)
    return round(steps_2n / steps_n, 2)

print(f"Doubling ratio: {measure_doubling_ratio(100)}")`,
    hints: [
      'If an algorithm is O(n), doubling the input doubles the steps (ratio ≈ 2).',
      'If an algorithm is O(n^2), (2n)^2 / n^2 = 4n^2 / n^2 = 4 (ratio ≈ 4).',
      'If an algorithm is O(n^3), the doubling ratio is 8.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Big O is the mathematical asymptotic ceiling.',
      'Big Omega is the asymptotic floor.',
      'Big Theta represents an asymptotically tight bound.',
      'Constants and lower-order terms drop out in asymptotic analysis.'
    ],
    nextLessonId: 'dsa-foundations-cases',
    nextLessonTitle: 'Best, Average, and Worst Case Analysis',
    nextLessonModuleId: 'dsa-module-1'
  }
};

m1Lessons['dsa-foundations-cases'] = {
  id: 'dsa-foundations-cases',
  moduleId: 'dsa-module-1',
  title: 'Best, Average, and Worst Case Analysis',
  subtitle: 'Understanding Input Distributions, Adversarial Inputs & Amortized Analysis',
  order: 4,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Distinguish between Best, Average, and Worst case runtime behaviors.',
    'Understand why engineering systems design for the worst-case scenario.',
    'Compute expected average-case complexity across probabilistic input models.',
    'Differentiate between average-case complexity and amortized complexity.'
  ],
  prerequisites: [
    'Time Complexity Analysis',
    'Big O, Big Omega, and Big Theta Notation'
  ],
  analogy: {
    title: 'The Commute Time Spectrum',
    text: 'Consider your daily drive to work: Best case: 2:00 AM on Sunday with green lights all the way (12 minutes). Worst case: Monday 8:30 AM in a torrential rainstorm with a 3-car pileup (75 minutes). Average case: Normal Tuesday traffic with standard light cycles (28 minutes). If you have a flight to catch, you leave based on the worst-case 75 minutes. Mission-critical software is designed to survive worst-case inputs without crashing or timing out.',
    metaphor: 'Best case is green lights; worst case is gridlock; engineering builds margins for the gridlock.'
  },
  problemSolved: {
    title: 'Preventing Denial-of-Service (DoS) and System Freezes',
    description: 'An algorithm with a fast average case might have a disastrous worst case. For example, QuickSort runs in O(n log n) on average, but degrades to O(n^2) on sorted arrays if the pivot is chosen naively. Attackers can intentionally craft worst-case payloads (Algorithmic Complexity Attacks) to exhaust server CPU.',
    keyPoints: [
      'Identifies performance vulnerabilities before deployment to production',
      'Enables defensive algorithmic techniques (randomized pivots, dual-pivot, introsort)',
      'Provides accurate SLA and latency guarantees for APIs'
    ]
  },
  intuition: {
    overview: 'Different input permutations of the same size n cause an algorithm to traverse different branch paths and loop counts.',
    steps: [
      { step: 1, title: 'Best Case Identification', description: 'Find the specific input arrangement that triggers the earliest termination.' },
      { step: 2, title: 'Worst Case Identification', description: 'Construct the adversarial input forcing the maximum possible comparisons.' },
      { step: 3, title: 'Average Case Modeling', description: 'Sum the cost of all n! permutations weighted by their probability of occurrence.' }
    ]
  },
  formalDefinition: {
    text: 'Worst-case running time T_worst(n) = max_{x ∈ D_n} T(x). Best-case T_best(n) = min_{x ∈ D_n} T(x). Average-case T_avg(n) = \\sum_{x ∈ D_n} P(x) * T(x).',
    latex: 'T_{avg}(n) = \\sum_{x \\in D_n} P(x) \\cdot T(x)'
  },
  complexity: {
    overview: 'Linear Search: Best O(1), Average O(n), Worst O(n). QuickSort: Best O(n log n), Average O(n log n), Worst O(n^2).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Target is at the very first index examined.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Target is uniformly distributed, requiring (n + 1)/2 checks.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Target is at the last index or completely absent.' }
    ],
    spaceNote: 'Auxiliary memory can also vary by case (e.g. recursion stack depth in QuickSort: O(log n) avg vs O(n) worst).'
  },
  workedExample: {
    title: 'Average Number of Comparisons in Linear Search',
    input: 'Array of size n. Assume target is guaranteed to be present with uniform probability 1/n at each index.',
    steps: [
      { step: 1, action: 'Sum of Costs', state: 'Cost at index i is i steps (for i = 1 to n)', explanation: '1 check for index 0, 2 checks for index 1, ..., n checks for index n-1.' },
      { step: 2, action: 'Multiply by Probability', state: 'E[T] = (1/n) * (1 + 2 + 3 + ... + n)', explanation: 'Weighted expectation formula.' },
      { step: 3, action: 'Simplify Sum', state: 'E[T] = (1/n) * (n(n + 1) / 2) = (n + 1) / 2', explanation: 'Average checks is approximately half the array length.' }
    ],
    finalOutput: 'Average case requires (n + 1) / 2 comparisons, which is Θ(n).'
  },
  visualExplanation: {
    title: 'Input Space vs Execution Latency',
    description: 'A probability density function of execution times. Best-case sits as an isolated spike at the left; average-case forms the central bell curve; worst-case forms the long right tail that system architects must cap.',
    features: ['Best-case minimal spike', 'Average-case Gaussian cluster', 'Worst-case long tail latency']
  },
  pseudocode: {
    title: 'Linear Search with Early Exit',
    code: `def linear_search(arr, target):
    for i from 0 to len(arr) - 1:
        if arr[i] == target:
            return i # Best case if i==0: O(1)
    return -1 # Worst case: checked all n -> O(n)`
  },
  pythonCode: {
    title: 'Measuring Best vs Worst Case Execution in Python',
    code: `def search_with_counter(arr, target):
    comparisons = 0
    for x in arr:
        comparisons += 1
        if x == target:
            return True, comparisons
    return False, comparisons

data = list(range(1000))
_, best = search_with_counter(data, 0)       # First element
_, worst = search_with_counter(data, -1)     # Not present
_, middle = search_with_counter(data, 500)   # Middle element

print(f"Best case comparisons:   {best}")
print(f"Middle case comparisons: {middle}")
print(f"Worst case comparisons:  {worst}")`,
    explanation: 'Directly illustrates the variance from 1 operation (best) to 1,000 operations (worst).'
  },
  runnableCode: {
    code: `arr = [5, 8, 12, 19, 23, 45, 67, 89]
def find(target):
    steps = 0
    for x in arr:
        steps += 1
        if x == target:
            return steps
    return steps

print(f"Search 5: {find(5)} steps (Best)")
print(f"Search 89: {find(89)} steps (Worst)")
print(f"Search 100: {find(100)} steps (Worst - Not found)")`,
    expectedOutput: 'Search 5: 1 steps (Best)\nSearch 89: 8 steps (Worst)\nSearch 100: 8 steps (Worst - Not found)'
  },
  lineByLineExplanation: [
    { lines: '4-7', codeSnippet: 'for x in arr:\n    steps += 1\n    if x == target:\n        return steps', explanation: 'Counts iterations until target is found and immediately returns.' },
    { lines: '10', codeSnippet: 'find(5)', explanation: 'Finds element at index 0 on iteration 1 (Best Case).' },
    { lines: '12', codeSnippet: 'find(100)', explanation: 'Scans all 8 elements without finding target (Worst Case).' }
  ],
  edgeCases: [
    { case: 'All Elements Identical', handling: 'Quicksort degrades to O(n^2) with naive Lomuto partition unless using 3-way partition.', example: '[7, 7, 7, 7, 7]' },
    { case: 'Reverse Sorted Input', handling: 'Insertion sort hits worst case O(n^2); Merge sort remains O(n log n).', example: '[5, 4, 3, 2, 1]' }
  ],
  commonMistakes: [
    { mistake: 'Assuming average case is simply the arithmetic mean of best and worst.', solution: 'Average case depends on the probability distribution of inputs, not (best + worst) / 2.' },
    { mistake: 'Relying on best case in marketing or benchmarks.', solution: 'Production guarantees must be based on worst-case or high-percentile (p99) behavior.' }
  ],
  applications: [
    { industry: 'Aerospace & Automotive', application: 'Hard Real-Time Systems', benefit: 'Fly-by-wire flight control and airbag actuators must guarantee execution finishes within strict microsecond worst-case deadlines.' },
    { industry: 'Web APIs', application: 'P99 Latency SLA', benefit: 'Prevents tail-latency degradation where 1% of slow requests tie up server connection pools.' }
  ],
  practiceQuestions: [
    { id: 'dsa-1-4-q1', question: 'What is the best, average, and worst case time complexity of Insertion Sort?', hint: 'Consider sorted, random, and reverse-sorted inputs.', answer: 'Best case: O(n) on already sorted input. Average case: O(n^2) on random input. Worst case: O(n^2) on reverse-sorted input.' },
    { id: 'dsa-1-4-q2', question: 'What is the difference between average-case complexity and amortized complexity?', hint: 'Probabilistic assumption vs guaranteed sequence of operations.', answer: 'Average case assumes a probability distribution over random inputs. Amortized complexity guarantees the average cost per operation over any worst-case sequence of operations (e.g. dynamic array append).' },
    { id: 'dsa-1-4-q3', question: 'Why does randomized QuickSort avoid O(n^2) worst case in practice?', hint: 'How does choosing a random pivot defeat adversarial inputs?', answer: 'An adversary cannot pre-construct a worst-case input because pivot selection is determined by runtime random seeds, making the probability of hitting O(n^2) vanishingly small (1 / n!).' }
  ],
  quiz: [
    {
      id: 'dsa-1-4-quiz-1',
      question: 'Under what input condition does Insertion Sort achieve its O(n) best-case time complexity?',
      options: [
        'When the array is already sorted in non-decreasing order',
        'When the array is sorted in reverse order',
        'When all elements are negative',
        'When the array contains only floating-point numbers'
      ],
      correctIndex: 0,
      explanation: 'When the array is already sorted, the inner while loop terminates immediately on its first comparison for every element, completing in O(n) total comparisons.'
    },
    {
      id: 'dsa-1-4-quiz-2',
      question: 'What is an "Algorithmic Complexity Attack"?',
      options: [
        'An adversary feeding crafted inputs that trigger worst-case O(n^2) or exponential behavior to cause Denial of Service',
        'Stealing private cryptographic keys by reading CPU fan noise',
        'Overclocking the GPU until hardware fails',
        'Injecting SQL queries into a form field'
      ],
      correctIndex: 0,
      explanation: 'Adversaries craft specific inputs (such as hash collision floods or worst-case quicksort inputs) that force an application into its worst-case computational ceiling.'
    },
    {
      id: 'dsa-1-4-quiz-3',
      question: 'Why is worst-case analysis the primary benchmark in computer science?',
      options: [
        'It provides an absolute mathematical guarantee that the algorithm will never run slower than this bound',
        'It is easier to calculate than best-case',
        'CPUs run slower in the morning',
        'Best-case is always O(1) for every algorithm'
      ],
      correctIndex: 0,
      explanation: 'Worst-case analysis guarantees an upper ceiling: regardless of what input is supplied, the algorithm will finish within that time bound.'
    }
  ],
  codingChallenge: {
    title: 'Adaptive Early-Exit Bubble Sort',
    problem: 'Implement an optimized Bubble Sort that detects if the array is already sorted during any pass and terminates early. Return a tuple of (sorted_array, passes_made). For an already sorted array of length n, it should make exactly 1 pass.',
    starterCode: `def adaptive_bubble_sort(arr):
    a = list(arr)
    n = len(a)
    passes = 0
    # Add early-exit swapped flag
    for i in range(n):
        passes += 1
        swapped = False
        for j in range(n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a, passes

print(adaptive_bubble_sort([1, 2, 3, 4, 5])) # Expected: ([1, 2, 3, 4, 5], 1)`,
    solution: `def adaptive_bubble_sort(arr):
    a = list(arr)
    n = len(a)
    passes = 0
    for i in range(n):
        passes += 1
        swapped = False
        for j in range(n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a, passes

print(adaptive_bubble_sort([1, 2, 3, 4, 5]))`,
    hints: [
      'Maintain a boolean flag `swapped = False` before starting the inner pass.',
      'If any two adjacent elements are swapped, set `swapped = True`.',
      'If the inner pass completes with `swapped == False`, the array is sorted: break immediately.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Best, average, and worst case reflect different operational realities.',
      'Worst-case analysis guarantees the system will never exceed a computational threshold.',
      'Average case requires a probabilistic model over all valid inputs.',
      'Adversarial inputs can be mitigated using randomization and defensive algorithms.'
    ],
    nextLessonId: 'dsa-foundations-recursion',
    nextLessonTitle: 'Recursion Fundamentals',
    nextLessonModuleId: 'dsa-module-1'
  }
};

m1Lessons['dsa-foundations-recurrence'] = {
  id: 'dsa-foundations-recurrence',
  moduleId: 'dsa-module-1',
  title: 'Recurrence Relations and Master Theorem',
  subtitle: 'Mathematical Frameworks for Analyzing Divide-and-Conquer Complexity',
  order: 6,
  readTimeMinutes: 28,
  difficulty: 'Intermediate',
  visualizerType: 'recursion-tree',
  objectives: [
    'Formulate recurrence relations for divide-and-conquer algorithms.',
    'Solve recurrences using the Substitution Method and Induction.',
    'Draw and evaluate Recursion Trees to calculate per-level and total work.',
    'Apply the Master Theorem (all 3 cases) to instantly classify recurrences.'
  ],
  prerequisites: [
    'Recursion Fundamentals',
    'Logarithmic laws and geometric progressions'
  ],
  analogy: {
    title: 'The Corporate Delegation Pyramid',
    text: 'A CEO receives a huge quarterly auditing project. Instead of reading all 1,000 files alone, she divides the pile into b equal sub-batches and delegates them to a vice presidents (recursive calls), while spending a fixed amount of time f(n) summarizing their results. If the summary work f(n) dominates, total time is governed by the CEO’s root work. If the VPs and their sub-delegates create an explosion of leaf workers, total time is governed by the leaf count. The Master Theorem calculates exactly who does more work: the boss at the top, or the army of workers at the bottom.',
    metaphor: 'The Master Theorem resolves whether the root work or leaf branching dominates in recursive algorithms.'
  },
  problemSolved: {
    title: 'Eliminating Trial-and-Error in Recursive Analysis',
    description: 'Without formal recurrence tools, predicting the time complexity of recursive algorithms like Merge Sort, Binary Search, Karatsuba Multiplication, or Strassen Matrix Multiplication is guesswork. The Master Theorem provides a closed-form formula to find asymptotic runtime in seconds.',
    keyPoints: [
      'Provides a deterministic recipe for T(n) = a*T(n/b) + f(n)',
      'Identifies the critical exponent c_crit = log_b(a)',
      'Directly handles Divide-and-Conquer paradigms across computer science'
    ]
  },
  intuition: {
    overview: 'Divide-and-conquer algorithms split problems of size n into a subproblems of size n/b, doing f(n) work to divide and combine.',
    steps: [
      { step: 1, title: 'Formulate the Equation', description: 'T(n) = a * T(n / b) + f(n).' },
      { step: 2, title: 'Calculate Critical Exponent', description: 'Compute c_crit = log_b(a), which represents the rate of leaf generation.' },
      { step: 3, title: 'Compare with f(n)', description: 'Determine whether f(n) is smaller than, equal to, or larger than n^(c_crit).' }
    ]
  },
  formalDefinition: {
    text: 'For recurrences of the form T(n) = a*T(n/b) + f(n) with a >= 1, b > 1: Case 1: If f(n) = O(n^(log_b(a) - ε)), then T(n) = Θ(n^log_b(a)). Case 2: If f(n) = Θ(n^log_b(a) * log^k(n)), then T(n) = Θ(n^log_b(a) * log^(k+1)(n)). Case 3: If f(n) = Ω(n^(log_b(a) + ε)) and regularity holds, then T(n) = Θ(f(n)).',
    latex: 'T(n) = a \\cdot T\\left(\\frac{n}{b}\\right) + f(n), \\quad c_{crit} = \\log_b a'
  },
  complexity: {
    overview: 'Master Theorem categorizes recurrences into three decisive regimes.',
    cases: [
      { case: 'Best', time: 'Θ(n^log_b(a))', space: 'O(log n)', explanation: 'Case 1: Tree leaves dominate total computation.' },
      { case: 'Average', time: 'Θ(n^log_b(a) * log n)', space: 'O(log n)', explanation: 'Case 2: Work is balanced uniformly across all tree levels.' },
      { case: 'Worst', time: 'Θ(f(n))', space: 'O(log n)', explanation: 'Case 3: Root combination work dominates leaves.' }
    ],
    spaceNote: 'Call stack depth is proportional to tree height: log_b(n).'
  },
  workedExample: {
    title: 'Solving Merge Sort Recurrence: T(n) = 2T(n/2) + O(n)',
    input: 'T(n) = 2 * T(n / 2) + c * n',
    steps: [
      { step: 1, action: 'Identify Parameters', state: 'a = 2, b = 2, f(n) = O(n)', explanation: '2 recursive calls of half size, plus linear merge work.' },
      { step: 2, action: 'Compute Critical Exponent', state: 'log_b(a) = log_2(2) = 1', explanation: 'Leaf growth rate is n^1 = n.' },
      { step: 3, action: 'Compare with f(n)', state: 'f(n) = Θ(n^1 * log^0(n)) -> k = 0', explanation: 'f(n) matches n^(log_b(a)) exactly! Falls into Case 2.' },
      { step: 4, action: 'Apply Case 2 Formula', state: 'T(n) = Θ(n^1 * log^(0 + 1)(n)) = Θ(n log n)', explanation: 'Total work across log2(n) levels of n work each is n log n.' }
    ],
    finalOutput: 'T(n) = Θ(n log n)'
  },
  visualExplanation: {
    title: 'The Recursion Tree Decomposition',
    description: 'Level 0 has 1 node of work n. Level 1 has 2 nodes of work n/2 (sum = n). Level 2 has 4 nodes of work n/4 (sum = n). There are log2(n) levels, each doing n work, resulting in total work = n * log2(n).',
    features: ['Log2(n) tree depth', 'n work per level', 'Total leaf count = n']
  },
  pseudocode: {
    title: 'Merge Sort Structure',
    code: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # T(n/2)
    right = merge_sort(arr[mid:])   # T(n/2)
    return merge(left, right)       # O(n)`
  },
  pythonCode: {
    title: 'Demonstrating Recursion Tree Depth in Merge Sort',
    code: `def simulated_merge_sort_tree(n, level=0):
    indent = "  " * level
    if n <= 1:
        print(f"{indent}Leaf node: size {n} (Base Case)")
        return
    print(f"{indent}Level {level}: Subproblem size {n} -> splitting into 2x {n // 2}")
    simulated_merge_sort_tree(n // 2, level + 1)
    simulated_merge_sort_tree(n // 2, level + 1)

print("Recursion tree for n=8:")
simulated_merge_sort_tree(8)`,
    explanation: 'Visually displays the recursive bifurcation tree and its log2(8) = 3 level depth.'
  },
  runnableCode: {
    code: `import math

def master_theorem_case(a, b, d):
    # Solves T(n) = a*T(n/b) + O(n^d)
    c_crit = math.log(a, b)
    if d < c_crit:
        return f"Case 1: Leaves dominate -> O(n^{c_crit:.2f})"
    elif math.isclose(d, c_crit):
        return f"Case 2: Balanced work -> O(n^{d} log n)"
    else:
        return f"Case 3: Root dominates -> O(n^{d})"

print("Merge Sort (a=2, b=2, d=1):", master_theorem_case(2, 2, 1))
print("Binary Search (a=1, b=2, d=0):", master_theorem_case(1, 2, 0))
print("Karatsuba (a=3, b=2, d=1):", master_theorem_case(3, 2, 1))`,
    expectedOutput: 'Merge Sort (a=2, b=2, d=1): Case 2: Balanced work -> O(n^1 log n)\nBinary Search (a=1, b=2, d=0): Case 2: Balanced work -> O(n^0 log n)\nKaratsuba (a=3, b=2, d=1): Case 1: Leaves dominate -> O(n^1.58)'
  },
  lineByLineExplanation: [
    { lines: '5', codeSnippet: 'c_crit = math.log(a, b)', explanation: 'Calculates critical exponent log_b(a).' },
    { lines: '6-7', codeSnippet: 'if d < c_crit:', explanation: 'When work exponent d is strictly less than c_crit, Case 1 applies.' },
    { lines: '8-9', codeSnippet: 'elif math.isclose(d, c_crit):', explanation: 'When work exponent equals critical exponent, Case 2 applies.' }
  ],
  edgeCases: [
    { case: 'a is not a constant (e.g. T(n) = n * T(n/2))', handling: 'Master theorem does not apply; use recursion tree expansion.', example: 'T(n) = n * T(n/2)' },
    { case: 'b is not a constant division (e.g. T(n) = T(n - 1) + 1)', handling: 'Not divide-and-conquer; this is linear recursion yielding O(n).', example: 'Factorial' }
  ],
  commonMistakes: [
    { mistake: 'Applying Master Theorem when subproblems have unequal sizes.', solution: 'For T(n) = T(n/3) + T(2n/3) + O(n), use the Akra-Bazzi method or recursion tree, not standard Master Theorem.' },
    { mistake: 'Forgetting the regularity condition in Case 3.', solution: 'Verify that a * f(n/b) <= c * f(n) for some c < 1.' }
  ],
  applications: [
    { industry: 'Computational Genomics', application: 'Sequence Alignment (BLAST)', benefit: 'Uses divide-and-conquer to search genetic sequences across terabyte databases.' },
    { industry: 'Computer Graphics', application: 'Ray Tracing Bounding Volume Hierarchies (BVH)', benefit: 'Splits 3D geometry into hierarchical bounding boxes solved in O(log n) ray intersection time.' }
  ],
  practiceQuestions: [
    { id: 'dsa-1-6-q1', question: 'What is the time complexity of T(n) = 4T(n/2) + O(n)?', hint: 'Find a, b, log_b(a), and compare with f(n) = n^1.', answer: 'a = 4, b = 2. log_2(4) = 2. Since f(n) = n^1 < n^2, Case 1 applies: T(n) = Θ(n^2).' },
    { id: 'dsa-1-6-q2', question: 'What is the time complexity of T(n) = 8T(n/2) + O(n^3)?', hint: 'Compare log_2(8) with exponent 3.', answer: 'a = 8, b = 2, log_2(8) = 3. Since f(n) = O(n^3) matches n^3, Case 2 applies: T(n) = Θ(n^3 log n).' },
    { id: 'dsa-1-6-q3', question: 'Can Master Theorem solve T(n) = 2T(n/2) + n / log(n)?', hint: 'Does f(n) differ polynomially by n^ε?', answer: 'No. The difference between n and n / log(n) is logarithmic, not polynomial by n^ε. The standard Master Theorem fails; advanced Akra-Bazzi or summation is required.' }
  ],
  quiz: [
    {
      id: 'dsa-1-6-quiz-1',
      question: 'In the Master Theorem recurrence T(n) = a*T(n/b) + f(n), what does "a" represent?',
      options: [
        'The number of recursive subproblems generated at each step',
        'The factor by which the input size is divided',
        'The total memory allocated on the heap',
        'The number of CPU cores available'
      ],
      correctIndex: 0,
      explanation: '"a" represents the branching factor: how many recursive subproblems are spawned by each call.'
    },
    {
      id: 'dsa-1-6-quiz-2',
      question: 'What is the recurrence relation for Binary Search on an array of size n?',
      options: [
        'T(n) = T(n / 2) + O(1)',
        'T(n) = 2T(n / 2) + O(n)',
        'T(n) = T(n - 1) + O(1)',
        'T(n) = 2T(n / 2) + O(1)'
      ],
      correctIndex: 0,
      explanation: 'Binary Search discards one half, making exactly 1 recursive call on size n/2 with O(1) comparison work, yielding T(n) = T(n/2) + O(1) -> O(log n).'
    },
    {
      id: 'dsa-1-6-quiz-3',
      question: 'Karatsuba fast integer multiplication has recurrence T(n) = 3T(n/2) + O(n). What is its time complexity?',
      options: ['O(n^log2(3)) ≈ O(n^1.585)', 'O(n^2)', 'O(n log n)', 'O(n^3)'],
      correctIndex: 0,
      explanation: 'With a = 3, b = 2, critical exponent is log2(3) ≈ 1.585. Since f(n) = O(n^1) < n^1.585, Case 1 gives O(n^log2(3)) ≈ O(n^1.585).'
    }
  ],
  codingChallenge: {
    title: 'Simulate Divide and Conquer Work',
    problem: 'Write a recursive function count_total_work(n, a, b, work_per_call) that computes the total work executed by a divide and conquer algorithm down to base case n=1. For Merge Sort on n=4 with a=2, b=2, work_per_call=lambda sz: sz, work is 4 + 2*2 + 4*0 = 8.',
    starterCode: `def count_total_work(n, a, b, work_fn):
    if n <= 1:
        return 0
    current_work = work_fn(n)
    subproblem_work = a * count_total_work(n // b, a, b, work_fn)
    return current_work + subproblem_work

# Test with Merge Sort on n=8:
print(count_total_work(8, 2, 2, lambda sz: sz)) # Expected: 8 + 2*4 + 4*2 = 24`,
    solution: `def count_total_work(n, a, b, work_fn):
    if n <= 1:
        return 0
    current_work = work_fn(n)
    subproblem_work = a * count_total_work(n // b, a, b, work_fn)
    return current_work + subproblem_work

print(count_total_work(8, 2, 2, lambda sz: sz))`,
    hints: [
      'Base case: when n <= 1, no further division occurs, return 0.',
      'At current level, work is work_fn(n).',
      'Spawn a subproblems, each doing work on input size n // b.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Master Theorem classifies recurrences by comparing f(n) to n^log_b(a).',
      'Case 1: Leaf work dominates.',
      'Case 2: Work is evenly distributed across levels -> extra log n factor.',
      'Case 3: Root work dominates.'
    ],
    nextLessonId: 'dsa-arrays-operations',
    nextLessonTitle: 'Array Operations and Memory Layout',
    nextLessonModuleId: 'dsa-module-2'
  }
};

// Write out Module 1
writeModuleFile(path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-1.ts'), m1.data, m1Lessons);
console.log('Successfully authored DSA Module 1! Authored count:', Object.keys(m1Lessons).length);
