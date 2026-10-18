import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule1Data: DSAModuleData = {
  "id": "dsa-module-1",
  "number": 1,
  "title": "DSA Foundations",
  "subtitle": "Complexity Analysis, Recursion & Algorithmic Thinking",
  "description": "Build the mental framework for algorithmic problem solving. Master time and space complexity using Big O notation, understand how recursion works under the hood with the call stack, and develop intuition for analyzing algorithm performance across all cases.",
  "icon": "Compass",
  "badge": "Foundations",
  "estimatedHours": 6,
  "topicsCount": 6,
  "lessons": [
    {
      "id": "dsa-foundations-what-is-dsa",
      "moduleId": "dsa-module-1",
      "title": "What Are Data Structures and Algorithms?",
      "description": "The vocabulary and mental model behind data organization and computational procedures.",
      "order": 1,
      "readTimeMinutes": 15,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-foundations-time-complexity",
      "moduleId": "dsa-module-1",
      "title": "Time Complexity Analysis",
      "description": "Counting operations, identifying dominant terms, and measuring algorithm efficiency.",
      "order": 2,
      "readTimeMinutes": 20,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-foundations-big-o",
      "moduleId": "dsa-module-1",
      "title": "Big O, Big Omega, and Big Theta Notation",
      "description": "Formal asymptotic notation for upper, lower, and tight bounds on algorithm performance.",
      "order": 3,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-foundations-cases",
      "moduleId": "dsa-module-1",
      "title": "Best, Average, and Worst Case Analysis",
      "description": "Understanding how input distribution affects algorithm performance and why worst-case dominates.",
      "order": 4,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-foundations-recursion",
      "moduleId": "dsa-module-1",
      "title": "Recursion Fundamentals",
      "description": "Base cases, recursive calls, the call stack, and mapping recursion to iterative solutions.",
      "order": 5,
      "readTimeMinutes": 25,
      "visualizerType": "recursion-tree",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-foundations-recurrence",
      "moduleId": "dsa-module-1",
      "title": "Recurrence Relations and Master Theorem",
      "description": "Mathematical tools for analyzing recursive complexity: substitution, recursion tree, Master Theorem.",
      "order": 6,
      "readTimeMinutes": 28,
      "visualizerType": "recursion-tree",
      "difficulty": "Intermediate"
    }
  ]
};

export const dsaModule1Lessons: Record<string, DSALessonContent> = {
  "dsa-foundations-recursion": {
    "id": "dsa-foundations-recursion",
    "moduleId": "dsa-module-1",
    "title": "Recursion Fundamentals",
    "subtitle": "Base Cases, Recursive Calls, the Call Stack & Recursion Trees",
    "order": 5,
    "readTimeMinutes": 25,
    "difficulty": "Beginner",
    "visualizerType": "recursion-tree",
    "objectives": [
      "Understand the mechanism of self-referential functions and induction.",
      "Master the role of the Base Case in preventing infinite recursion.",
      "Visualize the runtime Call Stack: stack frame allocation, pushing, and unwinding.",
      "Draw recursion trees to analyze the branching factor and total work performed.",
      "Identify the trade-offs between recursion and iteration (space overhead, call overhead)."
    ],
    "prerequisites": [
      "Basic function definitions and parameter passing in Python",
      "Understanding of conditional statements (if/else)",
      "Basic concept of call stacks and memory frames"
    ],
    "analogy": {
      "title": "The Russian Matryoshka Dolls",
      "text": "Opening a nested Russian doll is the purest real-world demonstration of recursion. To find what is inside the giant doll, you pop it open, only to find a slightly smaller version of the exact same doll inside. You cannot know the final prize until you keep opening dolls of progressively smaller size until you hit the solid, indivisible core piece — the base case. Once that final tiny doll is reached, you reassemble the outer dolls in reverse order, passing the prize all the way back up to the outside.",
      "metaphor": "Recursion solves a problem by delegating smaller subproblems to identical clones of the function until reaching a trivial base case, then unwinding back up."
    },
    "problemSolved": {
      "title": "Tackling Self-Similar Hierarchical Problems Elegantly",
      "description": "Many foundational computer science problems (tree traversals, graph searches, divide-and-conquer algorithms like Merge Sort, and combinatorial backtracking) have naturally recursive structures. Attempting to write these iteratively often requires manually managing an explicit stack data structure, whereas recursion leverages the hardware call stack natively.",
      "keyPoints": [
        "Simplifies complex problem decomposition into base case + recurrence step",
        "Directly maps to inductive mathematical reasoning",
        "Essential prerequisite for Divide & Conquer, Tree algorithms, Backtracking, and Dynamic Programming"
      ]
    },
    "intuition": {
      "overview": "Every recursive function has two non-negotiable components: the Base Case (when to stop) and the Recursive Case (how to shrink the input).",
      "steps": [
        {
          "step": 1,
          "title": "Establish the Base Case",
          "description": "Identify the smallest, simplest instance of the problem that can be answered instantly without further calls (e.g., n == 0 or len(arr) == 0)."
        },
        {
          "step": 2,
          "title": "Ensure Monotonic Convergence",
          "description": "Ensure each recursive call strictly reduces the problem size (n - 1, n // 2) moving closer to the base case to prevent stack overflow."
        },
        {
          "step": 3,
          "title": "Leap of Faith (Inductive Step)",
          "description": "Assume the recursive call fact(n - 1) works correctly for smaller inputs, then combine its result to solve the current problem (n * fact(n - 1))."
        },
        {
          "step": 4,
          "title": "Stack Frame Unwinding",
          "description": "Once the base case returns a concrete value, pending stack frames resume execution and pass computed values back up the chain."
        }
      ]
    },
    "formalDefinition": {
      "text": "A recursive algorithm is a method that solves a computational problem by invoking itself with smaller instances of the same problem until a base condition is satisfied.",
      "latex": "T(n) = a \\cdot T\\left(\\frac{n}{b}\\right) + f(n)"
    },
    "complexity": {
      "overview": "The time complexity of recursion depends on the number of recursive calls (nodes in the recursion tree) and work per call. Space complexity is determined by the maximum depth of the call stack.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "When the initial input immediately satisfies the base case condition."
        },
        {
          "case": "Average",
          "time": "O(n) for linear, O(2^n) for branching",
          "space": "O(n) stack depth",
          "explanation": "Linear recursion pushes n frames onto the call stack before unwinding."
        },
        {
          "case": "Worst",
          "time": "O(n) to O(2^n)",
          "space": "O(n) maximum call stack depth",
          "explanation": "Deepest recursive depth determines maximum auxiliary stack memory allocated."
        }
      ],
      "spaceNote": "Every recursive call consumes memory for a stack frame containing local variables and return addresses. Exceeding recursion limit raises RecursionError: maximum recursion depth exceeded."
    },
    "workedExample": {
      "title": "Tracing Factorial Calculation: fact(3)",
      "input": "n = 3",
      "steps": [
        {
          "step": 1,
          "action": "Call fact(3)",
          "state": "Stack: [fact(3)]",
          "explanation": "3 > 1, so it pauses and calls fact(2) to compute 3 * fact(2)."
        },
        {
          "step": 2,
          "action": "Call fact(2)",
          "state": "Stack: [fact(3), fact(2)]",
          "explanation": "2 > 1, so it pauses and calls fact(1) to compute 2 * fact(1)."
        },
        {
          "step": 3,
          "action": "Call fact(1) [Base Case]",
          "state": "Stack: [fact(3), fact(2), fact(1)]",
          "explanation": "1 <= 1 is True! Hits base case and immediately returns 1."
        },
        {
          "step": 4,
          "action": "Unwind fact(2)",
          "state": "Stack: [fact(3)]",
          "explanation": "fact(2) receives 1 from fact(1), computes 2 * 1 = 2, and returns 2."
        },
        {
          "step": 5,
          "action": "Unwind fact(3)",
          "state": "Stack: [] (empty)",
          "explanation": "fact(3) receives 2 from fact(2), computes 3 * 2 = 6, and returns final answer 6."
        }
      ],
      "finalOutput": "6"
    },
    "visualExplanation": {
      "title": "Visualizing Recursion Trees & Call Stacks",
      "description": "The recursion tree plots each function invocation as a node. The edges represent parent calls waiting for child returns.",
      "features": [
        "Depth of tree equals peak memory allocation on the call stack.",
        "Total nodes in tree equals the total number of function calls performed.",
        "Post-order traversal corresponds directly to return value unwinding order."
      ]
    },
    "pseudocode": {
      "title": "Canonical Linear Recursion Pattern",
      "code": "function solve(input):\n    // 1. Base Case: stop condition\n    if is_base_case(input):\n        return base_value\n    \n    // 2. Recursive Step: shrink problem and recurse\n    smaller_input = reduce(input)\n    sub_result = solve(smaller_input)\n    \n    // 3. Combine: return combined result\n    return combine(input, sub_result)"
    },
    "pythonCode": {
      "title": "Factorial and Fibonacci Implementations in Python",
      "code": "def factorial(n: int) -> int:\n    \"\"\"Computes n! recursively in O(n) time and O(n) stack space.\"\"\"\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\ndef fibonacci(n: int) -> int:\n    \"\"\"Computes nth Fibonacci number using a binary recursion tree (O(2^n)).\"\"\"\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)",
      "explanation": "factorial(n) generates a single chain of O(n) calls, while naive fibonacci(n) branches into two calls at each level, creating a full binary recursion tree of size O(2^n)."
    },
    "runnableCode": {
      "code": "def count_down_and_up(n):\n    if n == 0:\n        print(\"Base Case Reached!\")\n        return\n    print(f\"Pushing frame: {n}\")\n    count_down_and_up(n - 1)\n    print(f\"Unwinding frame: {n}\")\n\ncount_down_and_up(3)",
      "expectedOutput": "Pushing frame: 3\nPushing frame: 2\nPushing frame: 1\nBase Case Reached!\nUnwinding frame: 1\nUnwinding frame: 2\nUnwinding frame: 3"
    },
    "lineByLineExplanation": [
      {
        "line": "2-3",
        "lines": "2-3",
        "code": "if n <= 1: return 1",
        "codeSnippet": "if n <= 1: return 1",
        "explanation": "The base case check. Without this line, the function would call itself with negative numbers infinitely until stack exhaustion."
      },
      {
        "line": "4",
        "lines": "4",
        "code": "return n * factorial(n - 1)",
        "codeSnippet": "return n * factorial(n - 1)",
        "explanation": "The recursive step. Python evaluates the operand factorial(n - 1) first by placing the current frame on hold and creating a new stack frame."
      }
    ],
    "edgeCases": [
      {
        "case": "Negative inputs",
        "handling": "Validate n >= 0 at the start or raise ValueError(\"Input must be non-negative\").",
        "example": "factorial(-1) without guard causes infinite recursion."
      },
      {
        "case": "Exceeding recursion depth",
        "handling": "Python defaults to sys.getrecursionlimit() == 1000. For deep recursion, convert to iterative loop.",
        "example": "factorial(2000) raises RecursionError."
      },
      {
        "case": "Redundant overlapping calls",
        "handling": "Use memoization (lru_cache) or dynamic programming to avoid exponential explosion.",
        "example": "fibonacci(40) takes over a billion operations without memoization."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting the Base Case or writing an unreachable Base Case",
        "solution": "Always write and verify the base case before writing any recursive logic.",
        "codeExample": "def countdown(n):\n    # Bug: missing if n == 0 return\n    countdown(n - 1)"
      },
      {
        "mistake": "Not shrinking the problem towards the Base Case",
        "solution": "Ensure every recursive call strictly progresses toward termination.",
        "codeExample": "def loop(n):\n    return loop(n) # Infinite loop: n does not shrink"
      },
      {
        "mistake": "Assuming recursion is always O(1) space because no arrays were created",
        "solution": "Always count call stack depth: depth d requires O(d) auxiliary stack memory."
      }
    ],
    "applications": [
      {
        "industry": "File Systems",
        "application": "Directory Tree Traversal",
        "benefit": "Walking nested file directories recursively (e.g. os.walk, find)."
      },
      {
        "industry": "Compilers",
        "application": "Abstract Syntax Tree (AST) Parsing",
        "benefit": "Evaluating nested mathematical expressions and language grammar constructs."
      },
      {
        "industry": "Computer Graphics",
        "application": "Ray Tracing & Fractals",
        "benefit": "Simulating light bouncing off reflective surfaces and generating Mandelbrot / Sierpinski sets."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-rec-q1",
        "question": "What is the maximum recursion depth in Python by default, and how can you check it?",
        "hint": "Check the sys module.",
        "answer": "Python's default maximum recursion depth is typically 1,000 frames. You can check it with \"import sys; print(sys.getrecursionlimit())\" and change it with \"sys.setrecursionlimit(n)\"."
      },
      {
        "id": "dsa-rec-q2",
        "question": "Why does naive fibonacci(n) have O(2^n) time complexity while factorial(n) is O(n)?",
        "hint": "Look at the branching factor in the recursion tree.",
        "answer": "factorial(n) only makes 1 recursive call per frame, forming a linear chain of n nodes. fibonacci(n) makes 2 recursive calls per frame, forming a binary tree of depth n with approximately 2^n total nodes."
      },
      {
        "id": "dsa-rec-q3",
        "question": "What is tail-call optimization (TCO), and does CPython support it?",
        "hint": "Think about reusing the current stack frame if the recursive call is the very last operation.",
        "answer": "Tail-call optimization allows a compiler to reuse the current stack frame when the recursive call is the final action, reducing space from O(n) to O(1). CPython does NOT support TCO, intentionally preserving full stack traces for debugging."
      }
    ],
    "quiz": [
      {
        "id": "dsa-rec-quiz-1",
        "question": "What runtime error is raised in Python when a recursive function exceeds its call limit?",
        "options": [
          "StackOverflowError",
          "RecursionError",
          "MemoryAllocationError",
          "IndexError"
        ],
        "correctIndex": 1,
        "explanation": "Python raises \"RecursionError: maximum recursion depth exceeded\" when the call stack exceeds sys.getrecursionlimit()."
      },
      {
        "id": "dsa-rec-quiz-2",
        "question": "What determines the space complexity of a recursive algorithm without heap allocations?",
        "options": [
          "The total number of recursive calls made throughout execution",
          "The maximum depth of the call stack at any single point in time",
          "The number of arguments passed to the function",
          "Always O(1) because no lists were allocated"
        ],
        "correctIndex": 1,
        "explanation": "Space complexity is dictated by peak memory usage, which corresponds to the maximum depth of the call stack at any given point."
      },
      {
        "id": "dsa-rec-quiz-3",
        "question": "Which of the following problems naturally demands recursive or stack-based traversal?",
        "options": [
          "Binary Tree Inorder Traversal",
          "Looking up a key in a Python dict",
          "Finding the length of a string with len()",
          "Calculating 2 + 2"
        ],
        "correctIndex": 0,
        "explanation": "Tree structures are hierarchically nested and self-similar, making recursive traversals (preorder, inorder, postorder) the most natural solution."
      }
    ],
    "codingChallenge": {
      "title": "Flatten Nested Lists Recursively",
      "problem": "Write a recursive function \"flatten_list(nested)\" that takes an arbitrarily deep nested list (e.g. [1, [2, [3, 4], 5], 6]) and returns a single flat list [1, 2, 3, 4, 5, 6].",
      "hints": [
        "Iterate through each item in the input list.",
        "Use isinstance(item, list) to check if the current element is a nested sublist.",
        "If it is a list, recursively call flatten_list(item) and use .extend() to merge its flattened elements into result."
      ],
      "starterCode": "def flatten_list(nested):\n    result = []\n    # Your recursive code here\n    return result\n\n# Test case:\nnested = [1, [2, [3, 4], 5], 6, [7, [8]]]\nprint(flatten_list(nested))  # Expected: [1, 2, 3, 4, 5, 6, 7, 8]",
      "solution": "def flatten_list(nested):\n    result = []\n    for item in nested:\n        if isinstance(item, list):\n            result.extend(flatten_list(item))  # Recursive step\n        else:\n            result.append(item)               # Base element\n    return result\n\n# Test case:\nnested = [1, [2, [3, 4], 5], 6, [7, [8]]]\nprint(flatten_list(nested))  # Output: [1, 2, 3, 4, 5, 6, 7, 8]"
    },
    "summary": {
      "keyTakeaways": [
        "Recursion relies on two core parts: a Base Case and a Recursive Step.",
        "Every recursive call pushes a new frame onto the system Call Stack.",
        "The depth of recursion determines auxiliary space complexity.",
        "Recursion trees allow straightforward visual counting of calls and work.",
        "Always verify convergence to prevent RecursionError."
      ],
      "nextLessonId": "dsa-foundations-recurrence",
      "nextLessonTitle": "Recurrence Relations and Master Theorem",
      "nextLessonModuleId": "dsa-module-1"
    },
    "lineByLine": [
      {
        "line": "2-3",
        "lines": "2-3",
        "code": "if n <= 1: return 1",
        "codeSnippet": "if n <= 1: return 1",
        "explanation": "The base case check. Without this line, the function would call itself with negative numbers infinitely until stack exhaustion."
      },
      {
        "line": "4",
        "lines": "4",
        "code": "return n * factorial(n - 1)",
        "codeSnippet": "return n * factorial(n - 1)",
        "explanation": "The recursive step. Python evaluates the operand factorial(n - 1) first by placing the current frame on hold and creating a new stack frame."
      }
    ]
  },
  "dsa-foundations-what-is-dsa": {
    "id": "dsa-foundations-what-is-dsa",
    "moduleId": "dsa-module-1",
    "title": "What Are Data Structures and Algorithms?",
    "subtitle": "The Architectural Foundations of Computational Efficiency",
    "order": 1,
    "readTimeMinutes": 15,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Distinguish between Abstract Data Types (ADTs) and physical data structures.",
      "Understand how CPU memory hierarchy and hardware cache lines affect algorithmic performance.",
      "Identify fundamental trade-offs between space complexity and time complexity.",
      "Frame real-world engineering problems into formal algorithmic abstractions."
    ],
    "prerequisites": [
      "Basic programming fluency in Python",
      "Understanding of variables, loops, and conditional branching"
    ],
    "analogy": {
      "title": "The Modern Amazon Fulfillment Center",
      "text": "Imagine a global logistics warehouse holding millions of items. If workers dumped inventory into one giant unstructured pile, finding an order would require a tedious linear scan of every box—taking days. Instead, the warehouse employs structured bin locations, barcode indexing, conveyor routing, and dispatch queues. Data structures are the shelving, bins, and catalog systems that organize bytes; algorithms are the automated routing protocols and pick-and-pack instructions that fulfill requests with minimal motion and zero wasted time.",
      "metaphor": "Data structures organize digital inventory; algorithms are the optimized dispatch procedures that query and transform it."
    },
    "problemSolved": {
      "title": "Preventing Computational Collapse at Scale",
      "description": "Computers do not have infinite speed or memory. An unoptimized O(n^2) algorithm processing 1,000,000 records takes 10^12 operations (approx. 15 minutes of CPU execution), whereas an optimal O(n log n) algorithm finishes in under 0.05 seconds. Choosing the right data structure prevents software from grinding to a halt under real-world loads.",
      "keyPoints": [
        "Separates interface specifications (ADTs) from implementation details",
        "Minimizes memory footprint and CPU instruction cycles",
        "Enables sub-linear and logarithmic search across billions of records"
      ]
    },
    "intuition": {
      "overview": "Computation is the manipulation of state across memory addresses. Efficiency depends on minimizing read/write operations and spatial jumps in RAM.",
      "steps": [
        {
          "step": 1,
          "title": "Input Formalization",
          "description": "Transform raw business data into structured inputs with known bounds."
        },
        {
          "step": 2,
          "title": "Invariable Selection",
          "description": "Select a data structure whose invariants naturally uphold required access patterns."
        },
        {
          "step": 3,
          "title": "Algorithmic Prescription",
          "description": "Design deterministic steps guaranteeing convergence and correctness."
        },
        {
          "step": 4,
          "title": "Complexity Validation",
          "description": "Audit asymptotic growth against physical latency and memory constraints."
        }
      ]
    },
    "formalDefinition": {
      "text": "A Data Structure is a specialized format for organizing, processing, retrieving, and storing data. An Algorithm is an unambiguous, finite sequence of computer-implementable instructions to solve a class of problems.",
      "latex": "\\text{Program} = \\text{Data Structures} + \\text{Algorithms}"
    },
    "complexity": {
      "overview": "Algorithm efficiency is measured asymptotically as input size n tends to infinity.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Instantaneous response when answer resides at initial access point."
        },
        {
          "case": "Average",
          "time": "O(log n) to O(n)",
          "space": "O(1) to O(n)",
          "explanation": "Typical operational cost across uniform random distribution."
        },
        {
          "case": "Worst",
          "time": "O(n) to O(n^2)",
          "space": "O(n)",
          "explanation": "Degraded path when input structure induces maximum comparisons."
        }
      ],
      "spaceNote": "Space complexity encompasses both working auxiliary memory and call-stack frame allocations."
    },
    "workedExample": {
      "title": "Comparing Linear Search vs. Direct Hash Indexing",
      "input": "Dataset: 1,000,000 user IDs. Query: Find user 849,201.",
      "steps": [
        {
          "step": 1,
          "action": "Unstructured Linear Scan",
          "state": "Iterating index 0 to 849,201",
          "explanation": "Checks 849,201 elements one by one taking 849,201 comparison operations."
        },
        {
          "step": 2,
          "action": "Direct Key Hashing",
          "state": "Hash(849201) -> memory bucket",
          "explanation": "Computes memory address mathematically in O(1) time and retrieves user in 1 memory dereference."
        }
      ],
      "finalOutput": "Hash table completes in 0.0001ms vs. Linear search taking 12ms."
    },
    "visualExplanation": {
      "title": "Random Access Memory and Pointer Indirection",
      "description": "Arrays provide O(1) direct address arithmetic: Address(arr[i]) = Base + i * Size. Linked nodes require O(n) sequential pointer hopping across fragmented heap memory.",
      "features": [
        "Contiguous RAM blocks",
        "CPU L1/L2 cache prefetching",
        "Heap reference indirection"
      ]
    },
    "pseudocode": {
      "title": "Abstract Linear vs Index Lookup",
      "code": "function linear_search(collection, target):\n    for each item in collection:\n        if item == target: return True\n    return False\n\nfunction indexed_lookup(hash_map, key):\n    bucket = hash(key) mod capacity\n    return hash_map[bucket]"
    },
    "pythonCode": {
      "title": "Benchmarking Linear Search vs Hash Lookup in Python",
      "code": "import time\n\ndef benchmark():\n    data_list = list(range(100000))\n    data_set = set(data_list)\n    target = 99999\n\n    t0 = time.perf_counter()\n    found_list = target in data_list\n    t_list = time.perf_counter() - t0\n\n    t1 = time.perf_counter()\n    found_set = target in data_set\n    t_set = time.perf_counter() - t1\n\n    return found_list, found_set, t_list > t_set\n\nfound_l, found_s, is_faster = benchmark()\nprint(f\"List search: {found_l}, Set lookup: {found_s}, Set was faster: {is_faster}\")",
      "explanation": "Demonstrates the exponential difference between O(n) list inspection and O(1) hash set lookup in Python."
    },
    "runnableCode": {
      "code": "data = [10, 20, 30, 40, 50]\ntarget = 40\nfound_index = -1\nfor i, val in enumerate(data):\n    if val == target:\n        found_index = i\n        break\nprint(f\"Target {target} located at index {found_index}\")",
      "expectedOutput": "Target 40 located at index 3"
    },
    "lineByLineExplanation": [
      {
        "line": "1",
        "lines": "1",
        "code": "data = [10, 20, 30, 40, 50]",
        "codeSnippet": "data = [10, 20, 30, 40, 50]",
        "explanation": "Initializes contiguous array of integers in memory."
      },
      {
        "line": "4-7",
        "lines": "4-7",
        "code": "for i, val in enumerate(data):\n    if val == target:\n        found_index = i",
        "codeSnippet": "for i, val in enumerate(data):\n    if val == target:\n        found_index = i",
        "explanation": "Sequential scan checking each memory cell until target is located."
      },
      {
        "line": "8",
        "lines": "8",
        "code": "print(...)",
        "codeSnippet": "print(...)",
        "explanation": "Outputs the zero-indexed location of target element."
      }
    ],
    "edgeCases": [
      {
        "case": "Empty Collection",
        "handling": "Immediately return not-found before entering loops.",
        "example": "data = [], target = 5 -> -1"
      },
      {
        "case": "Target at First Position",
        "handling": "O(1) best case return on first iteration.",
        "example": "data = [5, 10, 15], target = 5 -> index 0"
      },
      {
        "case": "Target Not Present",
        "handling": "Exhaust full scan and return sentinel -1.",
        "example": "data = [1, 2, 3], target = 9 -> -1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using a linear list for frequent membership tests.",
        "solution": "Convert collection to a set or dict for O(1) lookups.",
        "codeExample": "# Slow: x in list_data\n# Fast: x in set_data"
      },
      {
        "mistake": "Premature optimization without analyzing scale.",
        "solution": "Measure profiling bottlenecks before replacing simple arrays with complex trees."
      }
    ],
    "applications": [
      {
        "industry": "Search Engines",
        "application": "Inverted Indexing",
        "benefit": "Allows Google to locate keywords across billions of web pages in milliseconds."
      },
      {
        "industry": "Database Systems",
        "application": "B-Tree Indexing",
        "benefit": "Minimizes disk I/O reads by grouping sorted records into memory-page sized blocks."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-1-1-q1",
        "question": "What is the key difference between an ADT and a Data Structure?",
        "hint": "Think interface versus concrete implementation.",
        "answer": "An ADT defines what operations are supported and their mathematical contracts (e.g., Queue: FIFO), while a Data Structure is the concrete physical representation in memory (e.g., Circular Array, Singly Linked List)."
      },
      {
        "id": "dsa-1-1-q2",
        "question": "Why does CPU cache locality favor contiguous arrays over linked lists?",
        "hint": "Consider spatial locality and cache lines.",
        "answer": "CPUs fetch memory in 64-byte cache lines. Contiguous array elements are loaded into L1/L2 cache in a single read, whereas linked list nodes are scattered across RAM causing frequent cache misses."
      },
      {
        "id": "dsa-1-1-q3",
        "question": "When is a simple array preferred over a hash table?",
        "hint": "Consider memory overhead and small N.",
        "answer": "When dataset size is very small, when ordering matters, or when memory overhead of hash buckets and collision pointers outweighs search savings."
      }
    ],
    "quiz": [
      {
        "id": "dsa-1-1-quiz-1",
        "question": "Which of the following describes an Abstract Data Type (ADT)?",
        "options": [
          "A high-level specification of data operations without implementation details",
          "A hardware register inside the CPU",
          "A compiled binary executable",
          "A specific memory address pointer"
        ],
        "correctIndex": 0,
        "explanation": "An ADT defines the logical interface and behaviors (e.g., Stack, Queue, Map) independent of language and hardware storage."
      },
      {
        "id": "dsa-1-1-quiz-2",
        "question": "Why is accessing arr[i] in an array O(1) time?",
        "options": [
          "The CPU checks every prior index in parallel",
          "Direct pointer arithmetic computes memory address: Base + (i * element_size)",
          "The compiler guesses the element location using a neural network",
          "Python caches all possible integer values in RAM"
        ],
        "correctIndex": 1,
        "explanation": "Contiguous memory layout allows constant-time direct address arithmetic without traversing intermediate elements."
      },
      {
        "id": "dsa-1-1-quiz-3",
        "question": "Which operation is generally faster due to CPU cache spatial locality?",
        "options": [
          "Traversing a 1,000,000-element contiguous primitive array",
          "Traversing a 1,000,000-element scattered linked list",
          "Both have identical hardware execution times",
          "Traversing a doubly linked list backwards"
        ],
        "correctIndex": 0,
        "explanation": "Contiguous arrays leverage hardware spatial locality and cache line prefetching, making sequential iteration significantly faster than pointer chasing."
      }
    ],
    "codingChallenge": {
      "title": "Find First Duplicate Element",
      "problem": "Given an integer list nums, find and return the first duplicate element. If no element appears more than once, return -1. Optimize your solution using an appropriate data structure.",
      "hints": [
        "A brute force O(n^2) approach compares every pair of indices.",
        "Using a hash set allows O(1) membership testing on each element.",
        "Return immediately as soon as you find an element already in seen."
      ],
      "starterCode": "def find_first_duplicate(nums):\n    # Use a set to track visited elements in O(1) average time\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return x\n        seen.add(x)\n    return -1\n\n# Test\nprint(find_first_duplicate([2, 5, 1, 2, 3, 5])) # Expected: 2",
      "solution": "def find_first_duplicate(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return x\n        seen.add(x)\n    return -1\n\nprint(find_first_duplicate([2, 5, 1, 2, 3, 5]))"
    },
    "summary": {
      "keyTakeaways": [
        "Data structures govern physical and logical memory layout.",
        "Algorithms prescribe step-by-step state transformations.",
        "Abstract Data Types separate contract from memory implementation.",
        "Hardware cache hierarchy heavily rewards contiguous memory patterns."
      ],
      "nextLessonId": "dsa-foundations-time-complexity",
      "nextLessonTitle": "Time Complexity Analysis",
      "nextLessonModuleId": "dsa-module-1"
    },
    "lineByLine": [
      {
        "line": "1",
        "lines": "1",
        "code": "data = [10, 20, 30, 40, 50]",
        "codeSnippet": "data = [10, 20, 30, 40, 50]",
        "explanation": "Initializes contiguous array of integers in memory."
      },
      {
        "line": "4-7",
        "lines": "4-7",
        "code": "for i, val in enumerate(data):\n    if val == target:\n        found_index = i",
        "codeSnippet": "for i, val in enumerate(data):\n    if val == target:\n        found_index = i",
        "explanation": "Sequential scan checking each memory cell until target is located."
      },
      {
        "line": "8",
        "lines": "8",
        "code": "print(...)",
        "codeSnippet": "print(...)",
        "explanation": "Outputs the zero-indexed location of target element."
      }
    ]
  },
  "dsa-foundations-time-complexity": {
    "id": "dsa-foundations-time-complexity",
    "moduleId": "dsa-module-1",
    "title": "Time Complexity Analysis",
    "subtitle": "Counting Primitive Operations, RAM Model & Asymptotic Scaling",
    "order": 2,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Model CPU execution using the Random Access Machine (RAM) model.",
      "Count primitive operations (assignments, comparisons, arithmetic) precisely.",
      "Isolate dominant polynomial terms and discard scale-invariant constants.",
      "Analyze nested loop execution frequencies and arithmetic progressions."
    ],
    "prerequisites": [
      "What Are Data Structures and Algorithms?",
      "Basic algebra: polynomials and summation of series"
    ],
    "analogy": {
      "title": "Evaluating Fuel Consumption Curves",
      "text": "A car company doesn’t test mileage by measuring individual drops of gas in a 10-foot driveway. They plot the fuel consumption curve against highway cruising speeds. At 100 mph, aerodynamic drag proportional to velocity squared (v^2) completely dwarfs tire rolling resistance. In algorithm analysis, as input size n explodes to billions, the dominant mathematical term dictates survival; tiny constant factors like variable assignment overhead fade into irrelevance.",
      "metaphor": "Time complexity is the mathematical curve of CPU consumption as input approaches infinity."
    },
    "problemSolved": {
      "title": "Hardware-Independent Performance Measurement",
      "description": "Benchmarking code by wall-clock time in seconds is flawed because it varies wildly depending on CPU clock speed, background processes, OS scheduling, and RAM bandwidth. Time complexity provides a rigorous, hardware-agnostic mathematical language to analyze algorithms.",
      "keyPoints": [
        "Abstracts away hardware differences and compiler variations",
        "Accurately predicts how algorithms behave when scaling from 1,000 to 1,000,000,000 items",
        "Enables formal mathematical proofs of optimality"
      ]
    },
    "intuition": {
      "overview": "Count the total number of basic machine steps executed by an algorithm as a mathematical function f(n) of input size n.",
      "steps": [
        {
          "step": 1,
          "title": "Identify Primitive Steps",
          "description": "Assignments, array indexing, arithmetic operations, and comparisons take O(1) time."
        },
        {
          "step": 2,
          "title": "Formulate Summation",
          "description": "Write loop iterations as mathematical sigma summations."
        },
        {
          "step": 3,
          "title": "Simplify the Polynomial",
          "description": "For f(n) = 3n^2 + 100n + 5000, isolate n^2 as the dominant asymptotic driver."
        }
      ]
    },
    "formalDefinition": {
      "text": "Under the RAM model, each instruction takes unit time c. The total running time T(n) is the sum of operations executed across all statements as a function of input size n.",
      "latex": "T(n) = \\sum_{i=1}^{k} c_i \\cdot \\text{count}(statement_i) = \\Theta(g(n))"
    },
    "complexity": {
      "overview": "Classified into standard asymptotic categories from O(1) to O(n!).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Loop terminates on first comparison."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Examines approximately n/2 elements."
        },
        {
          "case": "Worst",
          "time": "O(n^2)",
          "space": "O(1)",
          "explanation": "Fully nested double loop iterating over all pairs."
        }
      ],
      "spaceNote": "Iterative counting algorithms use O(1) extra space."
    },
    "workedExample": {
      "title": "Analyzing Nested Loop Arithmetic Progression",
      "input": "Nested loops where outer loop runs n times and inner loop runs i times.",
      "steps": [
        {
          "step": 1,
          "action": "Outer Loop",
          "state": "i ranges from 0 to n-1",
          "explanation": "Outer loop runs n times total."
        },
        {
          "step": 2,
          "action": "Inner Loop Count",
          "state": "Iterations: 0 + 1 + 2 + ... + (n-1)",
          "explanation": "Sum of arithmetic progression = (n * (n - 1)) / 2 = 0.5 n^2 - 0.5 n."
        },
        {
          "step": 3,
          "action": "Asymptotic Reduction",
          "state": "Drop coefficient 0.5 and lower term -0.5n",
          "explanation": "The dominant term is n^2, giving O(n^2)."
        }
      ],
      "finalOutput": "Total operations = O(n^2)"
    },
    "visualExplanation": {
      "title": "The Triangle Matrix of Nested Loops",
      "description": "Visualizing nested loops as a grid: an unconstrained n-by-n loop fills a square of area n^2. A dependent loop (j from i to n) fills the lower triangle of area n^2 / 2, which still scales quadratically as O(n^2).",
      "features": [
        "Square matrix representation (n^2)",
        "Triangular half-matrix ((n^2)/2)",
        "Logarithmic step reduction"
      ]
    },
    "pseudocode": {
      "title": "Nested Loop Complexity Counter",
      "code": "total = 0\nfor i from 0 to n - 1:\n    for j from 0 to i:\n        total += 1 # Executed n(n+1)/2 times -> O(n^2)"
    },
    "pythonCode": {
      "title": "Empirical Verification of Quadratic Growth",
      "code": "def count_operations(n):\n    ops = 0\n    for i in range(n):\n        for j in range(i + 1):\n            ops += 1\n    return ops\n\nfor size in [10, 100, 1000]:\n    actual = count_operations(size)\n    formula = (size * (size + 1)) // 2\n    print(f\"N={size}: Ops={actual}, Formula={formula}\")",
      "explanation": "Verifies mathematically that nested dependent loops yield exactly n(n+1)/2 operations."
    },
    "runnableCode": {
      "code": "def count_ops(n):\n    c = 0\n    for i in range(n):\n        for j in range(n):\n            c += 1\n    return c\n\nprint(f\"Ops for N=10: {count_ops(10)}\")\nprint(f\"Ops for N=20: {count_ops(20)}\")",
      "expectedOutput": "Ops for N=10: 100\nOps for N=20: 400"
    },
    "lineByLineExplanation": [
      {
        "line": "3",
        "lines": "3",
        "code": "for i in range(n):",
        "codeSnippet": "for i in range(n):",
        "explanation": "Outer loop executes exactly n times."
      },
      {
        "line": "4",
        "lines": "4",
        "code": "for j in range(n):",
        "codeSnippet": "for j in range(n):",
        "explanation": "Inner loop executes n times for every outer iteration."
      },
      {
        "line": "5",
        "lines": "5",
        "code": "c += 1",
        "codeSnippet": "c += 1",
        "explanation": "Total primitive body increments = n * n = n^2."
      }
    ],
    "edgeCases": [
      {
        "case": "n = 0",
        "handling": "Loops do not execute; returns 0 operations.",
        "example": "count_ops(0) -> 0"
      },
      {
        "case": "Inner loop dependent on while condition with step doubling",
        "handling": "Becomes O(n log n) rather than O(n^2).",
        "example": "j doubles each step (j *= 2)"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming two sequential loops multiply.",
        "solution": "Sequential loops add: O(n) + O(m) = O(n + m), whereas nested loops multiply: O(n * m)."
      },
      {
        "mistake": "Ignoring hidden operations in built-in methods.",
        "solution": "Remember that \"x in list\" is O(n), so calling it inside an O(n) loop makes the code O(n^2)."
      }
    ],
    "applications": [
      {
        "industry": "High-Frequency Trading",
        "application": "Order Book Matching",
        "benefit": "Ensures engine executes limit orders in strict O(1) or O(log M) time to avoid financial slippage."
      },
      {
        "industry": "Cloud Infrastructure",
        "application": "Autoscaling Metrics",
        "benefit": "Predicts CPU cluster requirements before traffic spikes occur."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-1-2-q1",
        "question": "What is the time complexity of a loop where i starts at 1 and doubles each step (i *= 2) until n?",
        "hint": "How many times can you double 1 before reaching n?",
        "answer": "O(log2 n), because 2^k = n implies k = log2(n) iterations."
      },
      {
        "id": "dsa-1-2-q2",
        "question": "If Algorithm A takes 1000n steps and Algorithm B takes n^2 steps, which is faster for n = 2,000?",
        "hint": "Calculate 1000 * 2000 vs 2000^2.",
        "answer": "Algorithm A: 1000 * 2000 = 2,000,000 steps. Algorithm B: 2000 * 2000 = 4,000,000 steps. Algorithm A is twice as fast."
      },
      {
        "id": "dsa-1-2-q3",
        "question": "Why do we ignore constant multipliers like the 3 in 3n^2?",
        "hint": "Think about asymptotic growth as n -> infinity.",
        "answer": "As n grows to millions, the exponent dominates behavior. Multiplying by 3 does not change how the function scales with respect to growth orders."
      }
    ],
    "quiz": [
      {
        "id": "dsa-1-2-quiz-1",
        "question": "What is the time complexity of: for i in range(n): for j in range(100): do_work()?",
        "options": [
          "O(n)",
          "O(100n^2)",
          "O(n^2)",
          "O(1)"
        ],
        "correctIndex": 0,
        "explanation": "Since 100 is a fixed constant independent of n, the inner loop executes a constant 100 times per iteration, yielding 100n = O(n)."
      },
      {
        "id": "dsa-1-2-quiz-2",
        "question": "What is the closed-form sum of 1 + 2 + 3 + ... + n?",
        "options": [
          "n(n + 1) / 2",
          "n^2",
          "2^n",
          "n log n"
        ],
        "correctIndex": 0,
        "explanation": "The classic Gauss arithmetic series sum is n(n + 1)/2 = 0.5n^2 + 0.5n."
      },
      {
        "id": "dsa-1-2-quiz-3",
        "question": "Calling \"element in my_list\" inside a loop of size n has what overall time complexity?",
        "options": [
          "O(n)",
          "O(n^2)",
          "O(log n)",
          "O(1)"
        ],
        "correctIndex": 1,
        "explanation": "Membership test \"in\" on a Python list requires a linear scan O(n). Invoking it inside an O(n) loop yields O(n * n) = O(n^2)."
      }
    ],
    "codingChallenge": {
      "title": "Analyze and Optimize Pair Sum",
      "problem": "Given an array of integers nums and an integer target, return True if there exist two distinct indices whose elements sum to target, otherwise False. Implement in O(n) time.",
      "hints": [
        "A brute force approach compares every pair (i, j) in O(n^2).",
        "For each element x, the required partner is target - x.",
        "Check if target - x has already been seen in a set in O(1) time."
      ],
      "starterCode": "def has_pair_with_sum(nums, target):\n    # Optimize from O(n^2) brute force to O(n) using a set\n    seen = set()\n    for x in nums:\n        complement = target - x\n        if complement in seen:\n            return True\n        seen.add(x)\n    return False\n\nprint(has_pair_with_sum([10, 15, 3, 7], 17)) # Expected: True (10 + 7)",
      "solution": "def has_pair_with_sum(nums, target):\n    seen = set()\n    for x in nums:\n        complement = target - x\n        if complement in seen:\n            return True\n        seen.add(x)\n    return False\n\nprint(has_pair_with_sum([10, 15, 3, 7], 17))"
    },
    "summary": {
      "keyTakeaways": [
        "Time complexity quantifies operational growth independent of physical hardware.",
        "Always focus on the highest-order dominant mathematical term.",
        "Nested loops with independent bounds multiply; sequential blocks add.",
        "Watch out for hidden O(n) calls inside built-in data structure methods."
      ],
      "nextLessonId": "dsa-foundations-big-o",
      "nextLessonTitle": "Big O, Big Omega, and Big Theta Notation",
      "nextLessonModuleId": "dsa-module-1"
    },
    "lineByLine": [
      {
        "line": "3",
        "lines": "3",
        "code": "for i in range(n):",
        "codeSnippet": "for i in range(n):",
        "explanation": "Outer loop executes exactly n times."
      },
      {
        "line": "4",
        "lines": "4",
        "code": "for j in range(n):",
        "codeSnippet": "for j in range(n):",
        "explanation": "Inner loop executes n times for every outer iteration."
      },
      {
        "line": "5",
        "lines": "5",
        "code": "c += 1",
        "codeSnippet": "c += 1",
        "explanation": "Total primitive body increments = n * n = n^2."
      }
    ]
  },
  "dsa-foundations-big-o": {
    "id": "dsa-foundations-big-o",
    "moduleId": "dsa-module-1",
    "title": "Big O, Big Omega, and Big Theta Notation",
    "subtitle": "Mathematical Rigor for Asymptotic Upper, Lower, and Tight Bounds",
    "order": 3,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Define Big O (O), Big Omega (Ω), and Big Theta (Θ) mathematically.",
      "Prove asymptotic bounds using the formal (c, n0) witness definitions.",
      "Understand why Big O represents an upper bound and Big Omega a lower bound.",
      "Identify tight bounds (Big Theta) where upper and lower bounds coincide."
    ],
    "prerequisites": [
      "Time Complexity Analysis",
      "Understanding inequalities and mathematical limits"
    ],
    "analogy": {
      "title": "The Budget Contract Agreement",
      "text": "When signing a commercial construction contract: Big O is the maximum guaranteed ceiling price (\"This project will cost at most $500,000, no matter what happens\"). Big Omega is the minimum base price (\"The contractor will charge at least $100,000 even if materials are free\"). Big Theta is the tight estimate (\"When conditions are normal, the final price is bounded within 5% of $350,000\"). Big O protects the client against worst-case disaster.",
      "metaphor": "Big O is the mathematical ceiling; Big Omega is the floor; Big Theta is the tight squeeze when floor and ceiling match."
    },
    "problemSolved": {
      "title": "Eliminating Ambiguity in Performance Guarantees",
      "description": "In engineering contracts and technical specifications, claiming an algorithm runs \"fast\" is meaningless. Big O, Big Omega, and Big Theta provide rigorous mathematical bounds that can be formally proven and verified.",
      "keyPoints": [
        "Provides unambiguous mathematical definitions using quantifiers ∃ c, n0 > 0",
        "Distinguishes between worst-case guarantees and best-case anomalies",
        "Establishes asymptotic equivalence classes across algorithms"
      ]
    },
    "intuition": {
      "overview": "Asymptotic notation compares the growth rate of two functions f(n) and g(n) for sufficiently large n.",
      "steps": [
        {
          "step": 1,
          "title": "Upper Bound (O)",
          "description": "f(n) <= c * g(n) for all n >= n0. f grows no faster than g."
        },
        {
          "step": 2,
          "title": "Lower Bound (Ω)",
          "description": "f(n) >= c * g(n) for all n >= n0. f grows at least as fast as g."
        },
        {
          "step": 3,
          "title": "Tight Bound (Θ)",
          "description": "c1 * g(n) <= f(n) <= c2 * g(n). f and g grow at the exact same rate."
        }
      ]
    },
    "formalDefinition": {
      "text": "Formal Asymptotic Definitions: f(n) = O(g(n)) iff ∃ c > 0, n0 > 0 such that ∀ n >= n0, 0 <= f(n) <= c * g(n). f(n) = Ω(g(n)) iff ∃ c > 0, n0 > 0 such that ∀ n >= n0, 0 <= c * g(n) <= f(n). f(n) = Θ(g(n)) iff f(n) = O(g(n)) and f(n) = Ω(g(n)).",
      "latex": "f(n) \\in \\mathcal{O}(g(n)) \\iff \\exists c > 0, n_0 > 0 : \\forall n \\ge n_0, 0 \\le f(n) \\le c \\cdot g(n)"
    },
    "complexity": {
      "overview": "Asymptotic classes ranked from fastest to slowest growth: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Constant growth regardless of input magnitude."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Optimal comparison-based sorting bound."
        },
        {
          "case": "Worst",
          "time": "O(2^n)",
          "space": "O(n)",
          "explanation": "Exponential combinatorial explosion."
        }
      ],
      "spaceNote": "Asymptotic notation applies identically to auxiliary space complexity."
    },
    "workedExample": {
      "title": "Formal Proof that 3n^2 + 5n + 7 = O(n^2)",
      "input": "Function f(n) = 3n^2 + 5n + 7. Claim: f(n) ∈ O(n^2).",
      "steps": [
        {
          "step": 1,
          "action": "Bound Linear and Constant Terms",
          "state": "For n >= 1, 5n <= 5n^2 and 7 <= 7n^2",
          "explanation": "Since n >= 1, n^2 is greater than or equal to n and 1."
        },
        {
          "step": 2,
          "action": "Sum Inequalities",
          "state": "3n^2 + 5n + 7 <= 3n^2 + 5n^2 + 7n^2 = 15n^2",
          "explanation": "Group terms under the common n^2 factor."
        },
        {
          "step": 3,
          "action": "Identify Witnesses",
          "state": "Choose c = 15, n0 = 1",
          "explanation": "For all n >= 1, f(n) <= 15n^2 holds true. Q.E.D."
        }
      ],
      "finalOutput": "Proof complete: c = 15, n0 = 1 validates 3n^2 + 5n + 7 ∈ O(n^2)."
    },
    "visualExplanation": {
      "title": "Geometric Envelope of Asymptotic Bounds",
      "description": "Graphing c * g(n) above f(n) demonstrates the upper ceiling. Once n crosses the threshold n0, the curve f(n) is trapped strictly underneath the upper bound line.",
      "features": [
        "Crossing point n0",
        "Upper envelope c * g(n)",
        "Asymptotic divergence"
      ]
    },
    "pseudocode": {
      "title": "Mathematical Growth Comparison",
      "code": "def compare_growth(n):\n    return {\n        \"constant\": 1,\n        \"logarithmic\": log2(n),\n        \"linear\": n,\n        \"linearithmic\": n * log2(n),\n        \"quadratic\": n ** 2,\n        \"exponential\": 2 ** n\n    }"
    },
    "pythonCode": {
      "title": "Demonstrating Growth Explosion in Python",
      "code": "import math\n\ndef print_growth_table():\n    sizes = [1, 10, 20]\n    print(f\"{'N':<5} | {'log2(N)':<8} | {'N':<5} | {'N*log2(N)':<10} | {'N^2':<6} | {'2^N':<10}\")\n    print(\"-\" * 55)\n    for n in sizes:\n        log_n = math.log2(n) if n > 0 else 0\n        n_log_n = n * log_n\n        n_sq = n ** 2\n        exp_n = 2 ** n\n        print(f\"{n:<5} | {log_n:<8.2f} | {n:<5} | {n_log_n:<10.1f} | {n_sq:<6} | {exp_n:<10}\")\n\nprint_growth_table()",
      "explanation": "Demonstrates why exponential complexity O(2^n) becomes completely intractable for even moderate inputs like n=50."
    },
    "runnableCode": {
      "code": "import math\nn = 16\nprint(f\"O(1): {1}\")\nprint(f\"O(log n): {math.log2(n):.0f}\")\nprint(f\"O(n): {n}\")\nprint(f\"O(n log n): {n * math.log2(n):.0f}\")\nprint(f\"O(n^2): {n**2}\")",
      "expectedOutput": "O(1): 1\nO(log n): 4\nO(n): 16\nO(n log n): 64\nO(n^2): 256"
    },
    "lineByLineExplanation": [
      {
        "line": "2",
        "lines": "2",
        "code": "n = 16",
        "codeSnippet": "n = 16",
        "explanation": "Set input size to 16 for clean powers-of-two comparisons."
      },
      {
        "line": "4",
        "lines": "4",
        "code": "print(f\"O(log n): {math.log2(n):.0f}\")",
        "codeSnippet": "print(f\"O(log n): {math.log2(n):.0f}\")",
        "explanation": "Log2 of 16 is 4 steps."
      },
      {
        "line": "7",
        "lines": "7",
        "code": "print(f\"O(n^2): {n**2}\")",
        "codeSnippet": "print(f\"O(n^2): {n**2}\")",
        "explanation": "16 squared is 256 steps."
      }
    ],
    "edgeCases": [
      {
        "case": "f(n) = 1000 and g(n) = 1",
        "handling": "Both are O(1) despite constant magnitude difference.",
        "example": "c = 1000, n0 = 1"
      },
      {
        "case": "Tight vs Loose Bounds",
        "handling": "n is O(n^2) technically, but Θ(n) is the strictly tight bound.",
        "example": "Prefer Θ(n) for accuracy"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Saying an algorithm is \"Big O of n\" when you mean tight bound.",
        "solution": "Use Big Theta (Θ) when upper and lower bounds match."
      },
      {
        "mistake": "Assuming Big O applies only to worst case.",
        "solution": "Big O can be applied to describe the upper bound of best, average, or worst case."
      }
    ],
    "applications": [
      {
        "industry": "Database Query Optimizers",
        "application": "Cost-Based Query Planning",
        "benefit": "PostgreSQL planner chooses between Nested Loop, Hash Join, or Merge Join based on asymptotic cost formulas."
      },
      {
        "industry": "Cryptography",
        "application": "Hardness Assumptions",
        "benefit": "RSA security relies on integer factorization having super-polynomial complexity."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-1-3-q1",
        "question": "Is 2^(n+1) = O(2^n)? Prove or disprove.",
        "hint": "Use exponent rules: 2^(n+1) = 2 * 2^n.",
        "answer": "Yes, 2^(n+1) = 2 * 2^n. Setting c = 2 and n0 = 1 proves 2^(n+1) <= 2 * 2^n for all n >= 1. Hence, 2^(n+1) ∈ O(2^n)."
      },
      {
        "id": "dsa-1-3-q2",
        "question": "Is 2^(2n) = O(2^n)?",
        "hint": "2^(2n) = (2^2)^n = 4^n.",
        "answer": "No. 2^(2n) = 4^n. The ratio 4^n / 2^n = 2^n approaches infinity as n -> inf, so no constant c exists."
      },
      {
        "id": "dsa-1-3-q3",
        "question": "What does f(n) = Θ(g(n)) tell us that f(n) = O(g(n)) does not?",
        "hint": "Think about lower bounds.",
        "answer": "Big O is only an upper bound (f could grow much slower). Big Theta proves f grows at the exact same rate as g from both above and below."
      }
    ],
    "quiz": [
      {
        "id": "dsa-1-3-quiz-1",
        "question": "Which notation represents a tight asymptotic bound (matching upper and lower bounds)?",
        "options": [
          "Big Theta (Θ)",
          "Big O (O)",
          "Big Omega (Ω)",
          "Little o (o)"
        ],
        "correctIndex": 0,
        "explanation": "Big Theta (Θ) denotes asymptotically tight bounds where both upper bound O(g(n)) and lower bound Ω(g(n)) hold simultaneously."
      },
      {
        "id": "dsa-1-3-quiz-2",
        "question": "Which of the following functions grows the fastest asymptotically as n -> infinity?",
        "options": [
          "n^2",
          "2^n",
          "n log n",
          "n^100"
        ],
        "correctIndex": 1,
        "explanation": "Any exponential function c^n (c > 1) eventually outgrows any polynomial n^k, no matter how large the constant exponent k is."
      },
      {
        "id": "dsa-1-3-quiz-3",
        "question": "If f(n) = 5n + 12, what are valid witness values (c, n0) to prove f(n) = O(n)?",
        "options": [
          "c = 17, n0 = 1",
          "c = 1, n0 = 100",
          "c = 0, n0 = 0",
          "c = -5, n0 = 1"
        ],
        "correctIndex": 0,
        "explanation": "For n >= 1, 5n + 12 <= 5n + 12n = 17n. Thus c = 17 and n0 = 1 satisfy the formal definition."
      }
    ],
    "codingChallenge": {
      "title": "Classify Complexity Experimentally",
      "problem": "Write a function test_growth(func, n) that runs a given function with input size n and returns the ratio of execution steps when size doubles (step_count(2n) / step_count(n)). For O(n^2), the ratio approaches 4.",
      "hints": [
        "If an algorithm is O(n), doubling the input doubles the steps (ratio ≈ 2).",
        "If an algorithm is O(n^2), (2n)^2 / n^2 = 4n^2 / n^2 = 4 (ratio ≈ 4).",
        "If an algorithm is O(n^3), the doubling ratio is 8."
      ],
      "starterCode": "def step_counter_quadratic(n):\n    steps = 0\n    for i in range(n):\n        for j in range(n):\n            steps += 1\n    return steps\n\ndef measure_doubling_ratio(n=100):\n    steps_n = step_counter_quadratic(n)\n    steps_2n = step_counter_quadratic(2 * n)\n    ratio = steps_2n / steps_n\n    return round(ratio, 2)\n\nprint(f\"Doubling ratio: {measure_doubling_ratio(100)}\") # Expected: ~4.0",
      "solution": "def step_counter_quadratic(n):\n    steps = 0\n    for i in range(n):\n        for j in range(n):\n            steps += 1\n    return steps\n\ndef measure_doubling_ratio(n=100):\n    steps_n = step_counter_quadratic(n)\n    steps_2n = step_counter_quadratic(2 * n)\n    return round(steps_2n / steps_n, 2)\n\nprint(f\"Doubling ratio: {measure_doubling_ratio(100)}\")"
    },
    "summary": {
      "keyTakeaways": [
        "Big O is the mathematical asymptotic ceiling.",
        "Big Omega is the asymptotic floor.",
        "Big Theta represents an asymptotically tight bound.",
        "Constants and lower-order terms drop out in asymptotic analysis."
      ],
      "nextLessonId": "dsa-foundations-cases",
      "nextLessonTitle": "Best, Average, and Worst Case Analysis",
      "nextLessonModuleId": "dsa-module-1"
    },
    "lineByLine": [
      {
        "line": "2",
        "lines": "2",
        "code": "n = 16",
        "codeSnippet": "n = 16",
        "explanation": "Set input size to 16 for clean powers-of-two comparisons."
      },
      {
        "line": "4",
        "lines": "4",
        "code": "print(f\"O(log n): {math.log2(n):.0f}\")",
        "codeSnippet": "print(f\"O(log n): {math.log2(n):.0f}\")",
        "explanation": "Log2 of 16 is 4 steps."
      },
      {
        "line": "7",
        "lines": "7",
        "code": "print(f\"O(n^2): {n**2}\")",
        "codeSnippet": "print(f\"O(n^2): {n**2}\")",
        "explanation": "16 squared is 256 steps."
      }
    ]
  },
  "dsa-foundations-cases": {
    "id": "dsa-foundations-cases",
    "moduleId": "dsa-module-1",
    "title": "Best, Average, and Worst Case Analysis",
    "subtitle": "Understanding Input Distributions, Adversarial Inputs & Amortized Analysis",
    "order": 4,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Distinguish between Best, Average, and Worst case runtime behaviors.",
      "Understand why engineering systems design for the worst-case scenario.",
      "Compute expected average-case complexity across probabilistic input models.",
      "Differentiate between average-case complexity and amortized complexity."
    ],
    "prerequisites": [
      "Time Complexity Analysis",
      "Big O, Big Omega, and Big Theta Notation"
    ],
    "analogy": {
      "title": "The Commute Time Spectrum",
      "text": "Consider your daily drive to work: Best case: 2:00 AM on Sunday with green lights all the way (12 minutes). Worst case: Monday 8:30 AM in a torrential rainstorm with a 3-car pileup (75 minutes). Average case: Normal Tuesday traffic with standard light cycles (28 minutes). If you have a flight to catch, you leave based on the worst-case 75 minutes. Mission-critical software is designed to survive worst-case inputs without crashing or timing out.",
      "metaphor": "Best case is green lights; worst case is gridlock; engineering builds margins for the gridlock."
    },
    "problemSolved": {
      "title": "Preventing Denial-of-Service (DoS) and System Freezes",
      "description": "An algorithm with a fast average case might have a disastrous worst case. For example, QuickSort runs in O(n log n) on average, but degrades to O(n^2) on sorted arrays if the pivot is chosen naively. Attackers can intentionally craft worst-case payloads (Algorithmic Complexity Attacks) to exhaust server CPU.",
      "keyPoints": [
        "Identifies performance vulnerabilities before deployment to production",
        "Enables defensive algorithmic techniques (randomized pivots, dual-pivot, introsort)",
        "Provides accurate SLA and latency guarantees for APIs"
      ]
    },
    "intuition": {
      "overview": "Different input permutations of the same size n cause an algorithm to traverse different branch paths and loop counts.",
      "steps": [
        {
          "step": 1,
          "title": "Best Case Identification",
          "description": "Find the specific input arrangement that triggers the earliest termination."
        },
        {
          "step": 2,
          "title": "Worst Case Identification",
          "description": "Construct the adversarial input forcing the maximum possible comparisons."
        },
        {
          "step": 3,
          "title": "Average Case Modeling",
          "description": "Sum the cost of all n! permutations weighted by their probability of occurrence."
        }
      ]
    },
    "formalDefinition": {
      "text": "Worst-case running time T_worst(n) = max_{x ∈ D_n} T(x). Best-case T_best(n) = min_{x ∈ D_n} T(x). Average-case T_avg(n) = \\sum_{x ∈ D_n} P(x) * T(x).",
      "latex": "T_{avg}(n) = \\sum_{x \\in D_n} P(x) \\cdot T(x)"
    },
    "complexity": {
      "overview": "Linear Search: Best O(1), Average O(n), Worst O(n). QuickSort: Best O(n log n), Average O(n log n), Worst O(n^2).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Target is at the very first index examined."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Target is uniformly distributed, requiring (n + 1)/2 checks."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Target is at the last index or completely absent."
        }
      ],
      "spaceNote": "Auxiliary memory can also vary by case (e.g. recursion stack depth in QuickSort: O(log n) avg vs O(n) worst)."
    },
    "workedExample": {
      "title": "Average Number of Comparisons in Linear Search",
      "input": "Array of size n. Assume target is guaranteed to be present with uniform probability 1/n at each index.",
      "steps": [
        {
          "step": 1,
          "action": "Sum of Costs",
          "state": "Cost at index i is i steps (for i = 1 to n)",
          "explanation": "1 check for index 0, 2 checks for index 1, ..., n checks for index n-1."
        },
        {
          "step": 2,
          "action": "Multiply by Probability",
          "state": "E[T] = (1/n) * (1 + 2 + 3 + ... + n)",
          "explanation": "Weighted expectation formula."
        },
        {
          "step": 3,
          "action": "Simplify Sum",
          "state": "E[T] = (1/n) * (n(n + 1) / 2) = (n + 1) / 2",
          "explanation": "Average checks is approximately half the array length."
        }
      ],
      "finalOutput": "Average case requires (n + 1) / 2 comparisons, which is Θ(n)."
    },
    "visualExplanation": {
      "title": "Input Space vs Execution Latency",
      "description": "A probability density function of execution times. Best-case sits as an isolated spike at the left; average-case forms the central bell curve; worst-case forms the long right tail that system architects must cap.",
      "features": [
        "Best-case minimal spike",
        "Average-case Gaussian cluster",
        "Worst-case long tail latency"
      ]
    },
    "pseudocode": {
      "title": "Linear Search with Early Exit",
      "code": "def linear_search(arr, target):\n    for i from 0 to len(arr) - 1:\n        if arr[i] == target:\n            return i # Best case if i==0: O(1)\n    return -1 # Worst case: checked all n -> O(n)"
    },
    "pythonCode": {
      "title": "Measuring Best vs Worst Case Execution in Python",
      "code": "def search_with_counter(arr, target):\n    comparisons = 0\n    for x in arr:\n        comparisons += 1\n        if x == target:\n            return True, comparisons\n    return False, comparisons\n\ndata = list(range(1000))\n_, best = search_with_counter(data, 0)       # First element\n_, worst = search_with_counter(data, -1)     # Not present\n_, middle = search_with_counter(data, 500)   # Middle element\n\nprint(f\"Best case comparisons:   {best}\")\nprint(f\"Middle case comparisons: {middle}\")\nprint(f\"Worst case comparisons:  {worst}\")",
      "explanation": "Directly illustrates the variance from 1 operation (best) to 1,000 operations (worst)."
    },
    "runnableCode": {
      "code": "arr = [5, 8, 12, 19, 23, 45, 67, 89]\ndef find(target):\n    steps = 0\n    for x in arr:\n        steps += 1\n        if x == target:\n            return steps\n    return steps\n\nprint(f\"Search 5: {find(5)} steps (Best)\")\nprint(f\"Search 89: {find(89)} steps (Worst)\")\nprint(f\"Search 100: {find(100)} steps (Worst - Not found)\")",
      "expectedOutput": "Search 5: 1 steps (Best)\nSearch 89: 8 steps (Worst)\nSearch 100: 8 steps (Worst - Not found)"
    },
    "lineByLineExplanation": [
      {
        "line": "4-7",
        "lines": "4-7",
        "code": "for x in arr:\n    steps += 1\n    if x == target:\n        return steps",
        "codeSnippet": "for x in arr:\n    steps += 1\n    if x == target:\n        return steps",
        "explanation": "Counts iterations until target is found and immediately returns."
      },
      {
        "line": "10",
        "lines": "10",
        "code": "find(5)",
        "codeSnippet": "find(5)",
        "explanation": "Finds element at index 0 on iteration 1 (Best Case)."
      },
      {
        "line": "12",
        "lines": "12",
        "code": "find(100)",
        "codeSnippet": "find(100)",
        "explanation": "Scans all 8 elements without finding target (Worst Case)."
      }
    ],
    "edgeCases": [
      {
        "case": "All Elements Identical",
        "handling": "Quicksort degrades to O(n^2) with naive Lomuto partition unless using 3-way partition.",
        "example": "[7, 7, 7, 7, 7]"
      },
      {
        "case": "Reverse Sorted Input",
        "handling": "Insertion sort hits worst case O(n^2); Merge sort remains O(n log n).",
        "example": "[5, 4, 3, 2, 1]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming average case is simply the arithmetic mean of best and worst.",
        "solution": "Average case depends on the probability distribution of inputs, not (best + worst) / 2."
      },
      {
        "mistake": "Relying on best case in marketing or benchmarks.",
        "solution": "Production guarantees must be based on worst-case or high-percentile (p99) behavior."
      }
    ],
    "applications": [
      {
        "industry": "Aerospace & Automotive",
        "application": "Hard Real-Time Systems",
        "benefit": "Fly-by-wire flight control and airbag actuators must guarantee execution finishes within strict microsecond worst-case deadlines."
      },
      {
        "industry": "Web APIs",
        "application": "P99 Latency SLA",
        "benefit": "Prevents tail-latency degradation where 1% of slow requests tie up server connection pools."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-1-4-q1",
        "question": "What is the best, average, and worst case time complexity of Insertion Sort?",
        "hint": "Consider sorted, random, and reverse-sorted inputs.",
        "answer": "Best case: O(n) on already sorted input. Average case: O(n^2) on random input. Worst case: O(n^2) on reverse-sorted input."
      },
      {
        "id": "dsa-1-4-q2",
        "question": "What is the difference between average-case complexity and amortized complexity?",
        "hint": "Probabilistic assumption vs guaranteed sequence of operations.",
        "answer": "Average case assumes a probability distribution over random inputs. Amortized complexity guarantees the average cost per operation over any worst-case sequence of operations (e.g. dynamic array append)."
      },
      {
        "id": "dsa-1-4-q3",
        "question": "Why does randomized QuickSort avoid O(n^2) worst case in practice?",
        "hint": "How does choosing a random pivot defeat adversarial inputs?",
        "answer": "An adversary cannot pre-construct a worst-case input because pivot selection is determined by runtime random seeds, making the probability of hitting O(n^2) vanishingly small (1 / n!)."
      }
    ],
    "quiz": [
      {
        "id": "dsa-1-4-quiz-1",
        "question": "Under what input condition does Insertion Sort achieve its O(n) best-case time complexity?",
        "options": [
          "When the array is already sorted in non-decreasing order",
          "When the array is sorted in reverse order",
          "When all elements are negative",
          "When the array contains only floating-point numbers"
        ],
        "correctIndex": 0,
        "explanation": "When the array is already sorted, the inner while loop terminates immediately on its first comparison for every element, completing in O(n) total comparisons."
      },
      {
        "id": "dsa-1-4-quiz-2",
        "question": "What is an \"Algorithmic Complexity Attack\"?",
        "options": [
          "An adversary feeding crafted inputs that trigger worst-case O(n^2) or exponential behavior to cause Denial of Service",
          "Stealing private cryptographic keys by reading CPU fan noise",
          "Overclocking the GPU until hardware fails",
          "Injecting SQL queries into a form field"
        ],
        "correctIndex": 0,
        "explanation": "Adversaries craft specific inputs (such as hash collision floods or worst-case quicksort inputs) that force an application into its worst-case computational ceiling."
      },
      {
        "id": "dsa-1-4-quiz-3",
        "question": "Why is worst-case analysis the primary benchmark in computer science?",
        "options": [
          "It provides an absolute mathematical guarantee that the algorithm will never run slower than this bound",
          "It is easier to calculate than best-case",
          "CPUs run slower in the morning",
          "Best-case is always O(1) for every algorithm"
        ],
        "correctIndex": 0,
        "explanation": "Worst-case analysis guarantees an upper ceiling: regardless of what input is supplied, the algorithm will finish within that time bound."
      }
    ],
    "codingChallenge": {
      "title": "Adaptive Early-Exit Bubble Sort",
      "problem": "Implement an optimized Bubble Sort that detects if the array is already sorted during any pass and terminates early. Return a tuple of (sorted_array, passes_made). For an already sorted array of length n, it should make exactly 1 pass.",
      "hints": [
        "Maintain a boolean flag `swapped = False` before starting the inner pass.",
        "If any two adjacent elements are swapped, set `swapped = True`.",
        "If the inner pass completes with `swapped == False`, the array is sorted: break immediately."
      ],
      "starterCode": "def adaptive_bubble_sort(arr):\n    a = list(arr)\n    n = len(a)\n    passes = 0\n    # Add early-exit swapped flag\n    for i in range(n):\n        passes += 1\n        swapped = False\n        for j in range(n - i - 1):\n            if a[j] > a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n                swapped = True\n        if not swapped:\n            break\n    return a, passes\n\nprint(adaptive_bubble_sort([1, 2, 3, 4, 5])) # Expected: ([1, 2, 3, 4, 5], 1)",
      "solution": "def adaptive_bubble_sort(arr):\n    a = list(arr)\n    n = len(a)\n    passes = 0\n    for i in range(n):\n        passes += 1\n        swapped = False\n        for j in range(n - i - 1):\n            if a[j] > a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n                swapped = True\n        if not swapped:\n            break\n    return a, passes\n\nprint(adaptive_bubble_sort([1, 2, 3, 4, 5]))"
    },
    "summary": {
      "keyTakeaways": [
        "Best, average, and worst case reflect different operational realities.",
        "Worst-case analysis guarantees the system will never exceed a computational threshold.",
        "Average case requires a probabilistic model over all valid inputs.",
        "Adversarial inputs can be mitigated using randomization and defensive algorithms."
      ],
      "nextLessonId": "dsa-foundations-recursion",
      "nextLessonTitle": "Recursion Fundamentals",
      "nextLessonModuleId": "dsa-module-1"
    },
    "lineByLine": [
      {
        "line": "4-7",
        "lines": "4-7",
        "code": "for x in arr:\n    steps += 1\n    if x == target:\n        return steps",
        "codeSnippet": "for x in arr:\n    steps += 1\n    if x == target:\n        return steps",
        "explanation": "Counts iterations until target is found and immediately returns."
      },
      {
        "line": "10",
        "lines": "10",
        "code": "find(5)",
        "codeSnippet": "find(5)",
        "explanation": "Finds element at index 0 on iteration 1 (Best Case)."
      },
      {
        "line": "12",
        "lines": "12",
        "code": "find(100)",
        "codeSnippet": "find(100)",
        "explanation": "Scans all 8 elements without finding target (Worst Case)."
      }
    ]
  },
  "dsa-foundations-recurrence": {
    "id": "dsa-foundations-recurrence",
    "moduleId": "dsa-module-1",
    "title": "Recurrence Relations and Master Theorem",
    "subtitle": "Mathematical Frameworks for Analyzing Divide-and-Conquer Complexity",
    "order": 6,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "recursion-tree",
    "objectives": [
      "Formulate recurrence relations for divide-and-conquer algorithms.",
      "Solve recurrences using the Substitution Method and Induction.",
      "Draw and evaluate Recursion Trees to calculate per-level and total work.",
      "Apply the Master Theorem (all 3 cases) to instantly classify recurrences."
    ],
    "prerequisites": [
      "Recursion Fundamentals",
      "Logarithmic laws and geometric progressions"
    ],
    "analogy": {
      "title": "The Corporate Delegation Pyramid",
      "text": "A CEO receives a huge quarterly auditing project. Instead of reading all 1,000 files alone, she divides the pile into b equal sub-batches and delegates them to a vice presidents (recursive calls), while spending a fixed amount of time f(n) summarizing their results. If the summary work f(n) dominates, total time is governed by the CEO’s root work. If the VPs and their sub-delegates create an explosion of leaf workers, total time is governed by the leaf count. The Master Theorem calculates exactly who does more work: the boss at the top, or the army of workers at the bottom.",
      "metaphor": "The Master Theorem resolves whether the root work or leaf branching dominates in recursive algorithms."
    },
    "problemSolved": {
      "title": "Eliminating Trial-and-Error in Recursive Analysis",
      "description": "Without formal recurrence tools, predicting the time complexity of recursive algorithms like Merge Sort, Binary Search, Karatsuba Multiplication, or Strassen Matrix Multiplication is guesswork. The Master Theorem provides a closed-form formula to find asymptotic runtime in seconds.",
      "keyPoints": [
        "Provides a deterministic recipe for T(n) = a*T(n/b) + f(n)",
        "Identifies the critical exponent c_crit = log_b(a)",
        "Directly handles Divide-and-Conquer paradigms across computer science"
      ]
    },
    "intuition": {
      "overview": "Divide-and-conquer algorithms split problems of size n into a subproblems of size n/b, doing f(n) work to divide and combine.",
      "steps": [
        {
          "step": 1,
          "title": "Formulate the Equation",
          "description": "T(n) = a * T(n / b) + f(n)."
        },
        {
          "step": 2,
          "title": "Calculate Critical Exponent",
          "description": "Compute c_crit = log_b(a), which represents the rate of leaf generation."
        },
        {
          "step": 3,
          "title": "Compare with f(n)",
          "description": "Determine whether f(n) is smaller than, equal to, or larger than n^(c_crit)."
        }
      ]
    },
    "formalDefinition": {
      "text": "For recurrences of the form T(n) = a*T(n/b) + f(n) with a >= 1, b > 1: Case 1: If f(n) = O(n^(log_b(a) - ε)), then T(n) = Θ(n^log_b(a)). Case 2: If f(n) = Θ(n^log_b(a) * log^k(n)), then T(n) = Θ(n^log_b(a) * log^(k+1)(n)). Case 3: If f(n) = Ω(n^(log_b(a) + ε)) and regularity holds, then T(n) = Θ(f(n)).",
      "latex": "T(n) = a \\cdot T\\left(\\frac{n}{b}\\right) + f(n), \\quad c_{crit} = \\log_b a"
    },
    "complexity": {
      "overview": "Master Theorem categorizes recurrences into three decisive regimes.",
      "cases": [
        {
          "case": "Best",
          "time": "Θ(n^log_b(a))",
          "space": "O(log n)",
          "explanation": "Case 1: Tree leaves dominate total computation."
        },
        {
          "case": "Average",
          "time": "Θ(n^log_b(a) * log n)",
          "space": "O(log n)",
          "explanation": "Case 2: Work is balanced uniformly across all tree levels."
        },
        {
          "case": "Worst",
          "time": "Θ(f(n))",
          "space": "O(log n)",
          "explanation": "Case 3: Root combination work dominates leaves."
        }
      ],
      "spaceNote": "Call stack depth is proportional to tree height: log_b(n)."
    },
    "workedExample": {
      "title": "Solving Merge Sort Recurrence: T(n) = 2T(n/2) + O(n)",
      "input": "T(n) = 2 * T(n / 2) + c * n",
      "steps": [
        {
          "step": 1,
          "action": "Identify Parameters",
          "state": "a = 2, b = 2, f(n) = O(n)",
          "explanation": "2 recursive calls of half size, plus linear merge work."
        },
        {
          "step": 2,
          "action": "Compute Critical Exponent",
          "state": "log_b(a) = log_2(2) = 1",
          "explanation": "Leaf growth rate is n^1 = n."
        },
        {
          "step": 3,
          "action": "Compare with f(n)",
          "state": "f(n) = Θ(n^1 * log^0(n)) -> k = 0",
          "explanation": "f(n) matches n^(log_b(a)) exactly! Falls into Case 2."
        },
        {
          "step": 4,
          "action": "Apply Case 2 Formula",
          "state": "T(n) = Θ(n^1 * log^(0 + 1)(n)) = Θ(n log n)",
          "explanation": "Total work across log2(n) levels of n work each is n log n."
        }
      ],
      "finalOutput": "T(n) = Θ(n log n)"
    },
    "visualExplanation": {
      "title": "The Recursion Tree Decomposition",
      "description": "Level 0 has 1 node of work n. Level 1 has 2 nodes of work n/2 (sum = n). Level 2 has 4 nodes of work n/4 (sum = n). There are log2(n) levels, each doing n work, resulting in total work = n * log2(n).",
      "features": [
        "Log2(n) tree depth",
        "n work per level",
        "Total leaf count = n"
      ]
    },
    "pseudocode": {
      "title": "Merge Sort Structure",
      "code": "def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])    # T(n/2)\n    right = merge_sort(arr[mid:])   # T(n/2)\n    return merge(left, right)       # O(n)"
    },
    "pythonCode": {
      "title": "Demonstrating Recursion Tree Depth in Merge Sort",
      "code": "def simulated_merge_sort_tree(n, level=0):\n    indent = \"  \" * level\n    if n <= 1:\n        print(f\"{indent}Leaf node: size {n} (Base Case)\")\n        return\n    print(f\"{indent}Level {level}: Subproblem size {n} -> splitting into 2x {n // 2}\")\n    simulated_merge_sort_tree(n // 2, level + 1)\n    simulated_merge_sort_tree(n // 2, level + 1)\n\nprint(\"Recursion tree for n=8:\")\nsimulated_merge_sort_tree(8)",
      "explanation": "Visually displays the recursive bifurcation tree and its log2(8) = 3 level depth."
    },
    "runnableCode": {
      "code": "import math\n\ndef master_theorem_case(a, b, d):\n    # Solves T(n) = a*T(n/b) + O(n^d)\n    c_crit = math.log(a, b)\n    if d < c_crit:\n        return f\"Case 1: Leaves dominate -> O(n^{c_crit:.2f})\"\n    elif math.isclose(d, c_crit):\n        return f\"Case 2: Balanced work -> O(n^{d} log n)\"\n    else:\n        return f\"Case 3: Root dominates -> O(n^{d})\"\n\nprint(\"Merge Sort (a=2, b=2, d=1):\", master_theorem_case(2, 2, 1))\nprint(\"Binary Search (a=1, b=2, d=0):\", master_theorem_case(1, 2, 0))\nprint(\"Karatsuba (a=3, b=2, d=1):\", master_theorem_case(3, 2, 1))",
      "expectedOutput": "Merge Sort (a=2, b=2, d=1): Case 2: Balanced work -> O(n^1 log n)\nBinary Search (a=1, b=2, d=0): Case 2: Balanced work -> O(n^0 log n)\nKaratsuba (a=3, b=2, d=1): Case 1: Leaves dominate -> O(n^1.58)"
    },
    "lineByLineExplanation": [
      {
        "line": "5",
        "lines": "5",
        "code": "c_crit = math.log(a, b)",
        "codeSnippet": "c_crit = math.log(a, b)",
        "explanation": "Calculates critical exponent log_b(a)."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "if d < c_crit:",
        "codeSnippet": "if d < c_crit:",
        "explanation": "When work exponent d is strictly less than c_crit, Case 1 applies."
      },
      {
        "line": "8-9",
        "lines": "8-9",
        "code": "elif math.isclose(d, c_crit):",
        "codeSnippet": "elif math.isclose(d, c_crit):",
        "explanation": "When work exponent equals critical exponent, Case 2 applies."
      }
    ],
    "edgeCases": [
      {
        "case": "a is not a constant (e.g. T(n) = n * T(n/2))",
        "handling": "Master theorem does not apply; use recursion tree expansion.",
        "example": "T(n) = n * T(n/2)"
      },
      {
        "case": "b is not a constant division (e.g. T(n) = T(n - 1) + 1)",
        "handling": "Not divide-and-conquer; this is linear recursion yielding O(n).",
        "example": "Factorial"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Applying Master Theorem when subproblems have unequal sizes.",
        "solution": "For T(n) = T(n/3) + T(2n/3) + O(n), use the Akra-Bazzi method or recursion tree, not standard Master Theorem."
      },
      {
        "mistake": "Forgetting the regularity condition in Case 3.",
        "solution": "Verify that a * f(n/b) <= c * f(n) for some c < 1."
      }
    ],
    "applications": [
      {
        "industry": "Computational Genomics",
        "application": "Sequence Alignment (BLAST)",
        "benefit": "Uses divide-and-conquer to search genetic sequences across terabyte databases."
      },
      {
        "industry": "Computer Graphics",
        "application": "Ray Tracing Bounding Volume Hierarchies (BVH)",
        "benefit": "Splits 3D geometry into hierarchical bounding boxes solved in O(log n) ray intersection time."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-1-6-q1",
        "question": "What is the time complexity of T(n) = 4T(n/2) + O(n)?",
        "hint": "Find a, b, log_b(a), and compare with f(n) = n^1.",
        "answer": "a = 4, b = 2. log_2(4) = 2. Since f(n) = n^1 < n^2, Case 1 applies: T(n) = Θ(n^2)."
      },
      {
        "id": "dsa-1-6-q2",
        "question": "What is the time complexity of T(n) = 8T(n/2) + O(n^3)?",
        "hint": "Compare log_2(8) with exponent 3.",
        "answer": "a = 8, b = 2, log_2(8) = 3. Since f(n) = O(n^3) matches n^3, Case 2 applies: T(n) = Θ(n^3 log n)."
      },
      {
        "id": "dsa-1-6-q3",
        "question": "Can Master Theorem solve T(n) = 2T(n/2) + n / log(n)?",
        "hint": "Does f(n) differ polynomially by n^ε?",
        "answer": "No. The difference between n and n / log(n) is logarithmic, not polynomial by n^ε. The standard Master Theorem fails; advanced Akra-Bazzi or summation is required."
      }
    ],
    "quiz": [
      {
        "id": "dsa-1-6-quiz-1",
        "question": "In the Master Theorem recurrence T(n) = a*T(n/b) + f(n), what does \"a\" represent?",
        "options": [
          "The number of recursive subproblems generated at each step",
          "The factor by which the input size is divided",
          "The total memory allocated on the heap",
          "The number of CPU cores available"
        ],
        "correctIndex": 0,
        "explanation": "\"a\" represents the branching factor: how many recursive subproblems are spawned by each call."
      },
      {
        "id": "dsa-1-6-quiz-2",
        "question": "What is the recurrence relation for Binary Search on an array of size n?",
        "options": [
          "T(n) = T(n / 2) + O(1)",
          "T(n) = 2T(n / 2) + O(n)",
          "T(n) = T(n - 1) + O(1)",
          "T(n) = 2T(n / 2) + O(1)"
        ],
        "correctIndex": 0,
        "explanation": "Binary Search discards one half, making exactly 1 recursive call on size n/2 with O(1) comparison work, yielding T(n) = T(n/2) + O(1) -> O(log n)."
      },
      {
        "id": "dsa-1-6-quiz-3",
        "question": "Karatsuba fast integer multiplication has recurrence T(n) = 3T(n/2) + O(n). What is its time complexity?",
        "options": [
          "O(n^log2(3)) ≈ O(n^1.585)",
          "O(n^2)",
          "O(n log n)",
          "O(n^3)"
        ],
        "correctIndex": 0,
        "explanation": "With a = 3, b = 2, critical exponent is log2(3) ≈ 1.585. Since f(n) = O(n^1) < n^1.585, Case 1 gives O(n^log2(3)) ≈ O(n^1.585)."
      }
    ],
    "codingChallenge": {
      "title": "Simulate Divide and Conquer Work",
      "problem": "Write a recursive function count_total_work(n, a, b, work_per_call) that computes the total work executed by a divide and conquer algorithm down to base case n=1. For Merge Sort on n=4 with a=2, b=2, work_per_call=lambda sz: sz, work is 4 + 2*2 + 4*0 = 8.",
      "hints": [
        "Base case: when n <= 1, no further division occurs, return 0.",
        "At current level, work is work_fn(n).",
        "Spawn a subproblems, each doing work on input size n // b."
      ],
      "starterCode": "def count_total_work(n, a, b, work_fn):\n    if n <= 1:\n        return 0\n    current_work = work_fn(n)\n    subproblem_work = a * count_total_work(n // b, a, b, work_fn)\n    return current_work + subproblem_work\n\n# Test with Merge Sort on n=8:\nprint(count_total_work(8, 2, 2, lambda sz: sz)) # Expected: 8 + 2*4 + 4*2 = 24",
      "solution": "def count_total_work(n, a, b, work_fn):\n    if n <= 1:\n        return 0\n    current_work = work_fn(n)\n    subproblem_work = a * count_total_work(n // b, a, b, work_fn)\n    return current_work + subproblem_work\n\nprint(count_total_work(8, 2, 2, lambda sz: sz))"
    },
    "summary": {
      "keyTakeaways": [
        "Master Theorem classifies recurrences by comparing f(n) to n^log_b(a).",
        "Case 1: Leaf work dominates.",
        "Case 2: Work is evenly distributed across levels -> extra log n factor.",
        "Case 3: Root work dominates."
      ],
      "nextLessonId": "dsa-arrays-operations",
      "nextLessonTitle": "Array Operations and Memory Layout",
      "nextLessonModuleId": "dsa-module-2"
    },
    "lineByLine": [
      {
        "line": "5",
        "lines": "5",
        "code": "c_crit = math.log(a, b)",
        "codeSnippet": "c_crit = math.log(a, b)",
        "explanation": "Calculates critical exponent log_b(a)."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "if d < c_crit:",
        "codeSnippet": "if d < c_crit:",
        "explanation": "When work exponent d is strictly less than c_crit, Case 1 applies."
      },
      {
        "line": "8-9",
        "lines": "8-9",
        "code": "elif math.isclose(d, c_crit):",
        "codeSnippet": "elif math.isclose(d, c_crit):",
        "explanation": "When work exponent equals critical exponent, Case 2 applies."
      }
    ]
  }
};
