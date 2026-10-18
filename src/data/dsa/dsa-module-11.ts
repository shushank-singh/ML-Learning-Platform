import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule11Data: DSAModuleData = {
  "id": "dsa-module-11",
  "number": 11,
  "title": "Greedy Algorithms and Dynamic Programming",
  "subtitle": "Optimal Substructure, Memoization, Tabulation & Classic Problems",
  "description": "Two of the most powerful algorithm design paradigms. Master the greedy strategy with correctness proofs, then dive deep into DP: state definition, transitions, memoization vs tabulation, and 14 classic problems from Fibonacci to Bitmask DP.",
  "icon": "TrendingUp",
  "badge": "Greedy & DP",
  "estimatedHours": 14,
  "topicsCount": 14,
  "lessons": [
    {
      "id": "dsa-greedy-strategy",
      "moduleId": "dsa-module-11",
      "title": "Greedy Strategy and Correctness Intuition",
      "description": "Exchange argument proofs, matroid theory intuition, and when greedy fails.",
      "order": 1,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-greedy-activity-selection",
      "moduleId": "dsa-module-11",
      "title": "Activity Selection and Interval Problems",
      "description": "Scheduling non-overlapping intervals, interval merging, and minimum meeting rooms.",
      "order": 2,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-greedy-fractional-knapsack",
      "moduleId": "dsa-module-11",
      "title": "Fractional Knapsack",
      "description": "Greedy value-density ratio for continuous items: proof of optimality and Huffman coding connection.",
      "order": 3,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-dp-fundamentals",
      "moduleId": "dsa-module-11",
      "title": "Dynamic Programming Fundamentals",
      "description": "Overlapping subproblems, optimal substructure, and the DP recipe: define state, write recurrence, handle base cases.",
      "order": 4,
      "readTimeMinutes": 28,
      "visualizerType": "dp-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-dp-memoization-tabulation",
      "moduleId": "dsa-module-11",
      "title": "Memoization vs Tabulation",
      "description": "Top-down recursive memoization and bottom-up tabulation: space optimizations and trade-offs.",
      "order": 5,
      "readTimeMinutes": 25,
      "visualizerType": "dp-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-dp-fibonacci",
      "moduleId": "dsa-module-11",
      "title": "Fibonacci and Climbing Stairs",
      "description": "The canonical DP introduction: from exponential recursion to O(n) time and O(1) space.",
      "order": 6,
      "readTimeMinutes": 20,
      "visualizerType": "dp-table",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-dp-coin-change",
      "moduleId": "dsa-module-11",
      "title": "Coin Change Problem",
      "description": "Minimum coins for a target (unbounded knapsack variant) and counting ways to make change.",
      "order": 7,
      "readTimeMinutes": 25,
      "visualizerType": "dp-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-dp-knapsack-01",
      "moduleId": "dsa-module-11",
      "title": "0/1 Knapsack Problem",
      "description": "The foundational bounded DP: include/exclude decision with rolling-array space optimization.",
      "order": 8,
      "readTimeMinutes": 28,
      "visualizerType": "dp-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-dp-lcs",
      "moduleId": "dsa-module-11",
      "title": "Longest Common Subsequence",
      "description": "2D DP table for LCS, string alignment, and reconstructing the actual subsequence.",
      "order": 9,
      "readTimeMinutes": 28,
      "visualizerType": "dp-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-dp-lis",
      "moduleId": "dsa-module-11",
      "title": "Longest Increasing Subsequence",
      "description": "O(n²) DP and O(n log n) patience-sorting approach with binary search.",
      "order": 10,
      "readTimeMinutes": 28,
      "visualizerType": "dp-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-dp-edit-distance",
      "moduleId": "dsa-module-11",
      "title": "Edit Distance (Levenshtein Distance)",
      "description": "Minimum insert/delete/replace operations to transform one string to another via 2D DP.",
      "order": 11,
      "readTimeMinutes": 30,
      "visualizerType": "dp-table",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-dp-grid",
      "moduleId": "dsa-module-11",
      "title": "Grid DP Problems",
      "description": "Unique paths, minimum path sum, and obstacle grids using 2D DP with space optimization.",
      "order": 12,
      "readTimeMinutes": 25,
      "visualizerType": "dp-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-dp-partition",
      "moduleId": "dsa-module-11",
      "title": "Partition and Subset Sum Problems",
      "description": "Equal partition, target subset sum, and count of subsets using boolean DP arrays.",
      "order": 13,
      "readTimeMinutes": 28,
      "visualizerType": "dp-table",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-dp-bitmask",
      "moduleId": "dsa-module-11",
      "title": "Bitmask DP Introduction",
      "description": "Using integers as set representations for TSP, assignment problems, and state compression.",
      "order": 14,
      "readTimeMinutes": 35,
      "visualizerType": "dp-table",
      "difficulty": "Advanced"
    }
  ]
};

export const dsaModule11Lessons: Record<string, DSALessonContent> = {
  "dsa-dp-knapsack-01": {
    "id": "dsa-dp-knapsack-01",
    "moduleId": "dsa-module-11",
    "title": "0/1 Knapsack Problem",
    "subtitle": "The Canonical Bounded Dynamic Programming Pattern: Include/Exclude State Transitions",
    "order": 8,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "dp-table",
    "objectives": [
      "Define the 2D DP state dp[i][w] representing max value using a subset of the first i items with capacity w.",
      "Derive the binary choice recurrence: take item vs skip item.",
      "Build the tabulation table row-by-row and reconstruct the optimal item selection.",
      "Optimize the 2D matrix down to a single 1D array of size W by iterating backwards.",
      "Differentiate 0/1 Knapsack (bounded, 1 of each item) from Unbounded Knapsack (infinite supply)."
    ],
    "prerequisites": [
      "Dynamic programming fundamentals (overlapping subproblems, optimal substructure)",
      "Basic array manipulation and 2D grid iteration"
    ],
    "analogy": {
      "title": "The Burglar with the Strict Weight Limit",
      "text": "A burglar enters a jewelry store with a sturdy backpack that can carry at most 7 kilograms without tearing. Inside are 4 precious items: a gold bar (weight 5kg, value $100), a silver watch (weight 3kg, value $50), a diamond necklace (weight 4kg, value $70), and a platinum ring (weight 1kg, value $30). Unlike gold dust, the burglar cannot cut the watch in half — each item must either be taken entirely (1) or left behind (0). If the burglar greedily grabs the gold bar ($100), only 2kg remain, which can only hold the ring ($30), totaling $130. But taking the diamond ($70) and watch ($50) plus ring ($30) yields 8kg (too heavy!). Dynamic programming systematically evaluates the include/exclude choices for all weight subproblems to guarantee the true global maximum.",
      "metaphor": "0/1 Knapsack explores a binary decision tree: for each item, do we include it (spending weight for value) or exclude it?"
    },
    "problemSolved": {
      "title": "Eliminating Exponential O(2^n) Combinatorial Brute-Force",
      "description": "Given n items, there are 2^n possible subsets of items to pack. For 40 items, 2^40 is over 1 trillion combinations. Dynamic programming collapses identical remaining-capacity subproblems, running in pseudo-polynomial O(n * W) time.",
      "keyPoints": [
        "Transforms O(2^n) exponential brute-force into O(n * W) pseudo-polynomial time",
        "Models resource-allocation problems with discrete constraints",
        "Core template for Subset Sum, Partition Equal Subset, and Target Sum problems"
      ]
    },
    "intuition": {
      "overview": "For each item i at current capacity w: if the item is too heavy (weight > w), we must exclude it. If it fits, we choose the maximum between excluding it (dp[i-1][w]) and including it (value + dp[i-1][w - weight]).",
      "steps": [
        {
          "step": 1,
          "title": "Define the State",
          "description": "Let dp[i][w] be the maximum value obtainable using a subset of items from 1..i with total weight at most w."
        },
        {
          "step": 2,
          "title": "Base Cases",
          "description": "dp[0][w] = 0 (0 items yield $0 value) and dp[i][0] = 0 (0 capacity holds $0 value)."
        },
        {
          "step": 3,
          "title": "Exclude Choice",
          "description": "Do not take item i: value is identical to the best we could do with i-1 items at capacity w: dp[i-1][w]."
        },
        {
          "step": 4,
          "title": "Include Choice (if item fits)",
          "description": "Take item i: gain value[i-1] plus the best answer for the remaining capacity (w - weight[i-1]): value[i-1] + dp[i-1][w - weight[i-1]]. Take max of include and exclude."
        }
      ]
    },
    "formalDefinition": {
      "text": "Given weights wt = [w_1, ..., w_n], values val = [v_1, ..., v_n], and capacity W, maximize sum(v_i * x_i) subject to sum(w_i * x_i) <= W where x_i in {0, 1}.",
      "latex": "dp[i][w] = \\begin{cases} dp[i-1][w] & \\text{if } wt[i-1] > w \\\\ \\max\\big(dp[i-1][w], \\; val[i-1] + dp[i-1][w - wt[i-1]]\\big) & \\text{otherwise} \\end{cases}"
    },
    "complexity": {
      "overview": "The table has (n + 1) rows and (W + 1) columns. Filling each cell requires O(1) comparison.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n * W)",
          "space": "O(W) with 1D rolling array",
          "explanation": "All cells must be computed to find optimal choice."
        },
        {
          "case": "Average",
          "time": "O(n * W)",
          "space": "O(W)",
          "explanation": "Pseudo-polynomial runtime depending on item count n and integer capacity W."
        },
        {
          "case": "Worst",
          "time": "O(n * W)",
          "space": "O(n * W) for 2D table or O(W) for 1D",
          "explanation": "Linear in terms of total state space."
        }
      ],
      "spaceNote": "Because row i only reads from row i-1, iterating capacity backwards (from W down to wt[i]) compresses space to O(W)."
    },
    "workedExample": {
      "title": "Items: (wt: 2, val: 3), (wt: 3, val: 4), (wt: 4, val: 5); Capacity W = 5",
      "input": "weights = [2, 3, 4], values = [3, 4, 5], W = 5",
      "steps": [
        {
          "step": 1,
          "action": "Row 0 (No items)",
          "state": "dp[0] = [0, 0, 0, 0, 0, 0]",
          "explanation": "Zero items yield 0 value for all capacities."
        },
        {
          "step": 2,
          "action": "Row 1 (Item 1: wt 2, val 3)",
          "state": "dp[1] = [0, 0, 3, 3, 3, 3]",
          "explanation": "At capacity >= 2, we can include Item 1."
        },
        {
          "step": 3,
          "action": "Row 2 (Item 2: wt 3, val 4)",
          "state": "dp[2] = [0, 0, 3, 4, 4, 7]",
          "explanation": "At capacity 5: include Item 2 (val 4) + dp[1][5-3] (val 3) = 7 > exclude (val 3)."
        },
        {
          "step": 4,
          "action": "Row 3 (Item 3: wt 4, val 5)",
          "state": "dp[3] = [0, 0, 3, 4, 5, 7]",
          "explanation": "At capacity 5: include Item 3 (val 5) + dp[2][5-4] (val 0) = 5 < exclude (val 7). We exclude Item 3!"
        }
      ],
      "finalOutput": "Max Value = 7 (Items 1 and 2)"
    },
    "visualExplanation": {
      "title": "Interactive 2D DP Table & Cell Dependencies",
      "description": "The visualizer highlights the current cell dp[i][w], showing the two source cells: the cell directly above (exclude) and the cell above-left at w - wt (include).",
      "features": [
        "Color-coded source cell pointers.",
        "Real-time comparison breakdown: max(exclude, include).",
        "Backtracking path highlighted in gold to show selected items."
      ]
    },
    "pseudocode": {
      "title": "2D Tabulation and 1D Space-Optimized Tabulation",
      "code": "// 2D Tabulation: O(n * W) time, O(n * W) space\nfunction knapsack_2d(weights, values, W):\n    n = length(weights)\n    dp = array[n+1][W+1] initialized to 0\n    \n    for i from 1 to n:\n        for w from 0 to W:\n            if weights[i-1] <= w:\n                dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])\n            else:\n                dp[i][w] = dp[i-1][w]\n    return dp[n][W]\n\n// 1D Space-Optimized: O(n * W) time, O(W) space\nfunction knapsack_1d(weights, values, W):\n    dp = array[W+1] initialized to 0\n    for i from 0 to n-1:\n        // Reverse loop prevents using same item multiple times!\n        for w from W down to weights[i]:\n            dp[w] = max(dp[w], values[i] + dp[w - weights[i]])\n    return dp[W]"
    },
    "pythonCode": {
      "title": "Complete 0/1 Knapsack Solutions in Python",
      "code": "def knapsack_01(weights: list[int], values: list[int], capacity: int) -> int:\n    \"\"\"1D space-optimized 0/1 Knapsack in O(n * W) time and O(W) space.\"\"\"\n    n = len(weights)\n    dp = [0] * (capacity + 1)\n\n    for i in range(n):\n        wt = weights[i]\n        val = values[i]\n        # Iterate BACKWARDS so we read values from previous item iteration\n        for w in range(capacity, wt - 1, -1):\n            dp[w] = max(dp[w], val + dp[w - wt])\n\n    return dp[capacity]",
      "explanation": "Notice the reverse range(capacity, wt - 1, -1): if we looped forward, dp[w - wt] would already be updated with the current item, turning it into Unbounded Knapsack!"
    },
    "runnableCode": {
      "code": "def knapsack(weights, values, W):\n    dp = [0] * (W + 1)\n    for wt, val in zip(weights, values):\n        for w in range(W, wt - 1, -1):\n            dp[w] = max(dp[w], val + dp[w - wt])\n    return dp[W]\n\nweights = [2, 3, 4, 5]\nvalues = [3, 4, 5, 8]\ncapacity = 5\n\nprint(f\"Items: weights={weights}, values={values}\")\nprint(f\"Max Value for Capacity {capacity}:\", knapsack(weights, values, capacity))",
      "expectedOutput": "Items: weights=[2, 3, 4, 5], values=[3, 4, 5, 8]\nMax Value for Capacity 5: 8"
    },
    "lineByLineExplanation": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "dp = [0] * (capacity + 1)",
        "codeSnippet": "dp = [0] * (capacity + 1)",
        "explanation": "Initializes a 1D DP table where dp[w] stores the maximum value for weight limit w."
      },
      {
        "line": "4-6",
        "lines": "4-6",
        "code": "for wt, val in zip(weights, values):",
        "codeSnippet": "for wt, val in zip(weights, values):",
        "explanation": "Iterates through each item one by one."
      },
      {
        "line": "7-8",
        "lines": "7-8",
        "code": "for w in range(W, wt - 1, -1): dp[w] = max(dp[w], val + dp[w - wt])",
        "codeSnippet": "for w in range(W, wt - 1, -1): dp[w] = max(dp[w], val + dp[w - wt])",
        "explanation": "Iterates backwards from W down to wt, updating each capacity with the choice to include the current item."
      }
    ],
    "edgeCases": [
      {
        "case": "Capacity W = 0",
        "handling": "Table size is 1, returns 0 immediately without taking items.",
        "example": "knapsack([1], [10], 0) -> 0"
      },
      {
        "case": "No items fit",
        "handling": "All item weights exceed capacity; returns 0.",
        "example": "weights = [10, 20], W = 5 -> 0"
      },
      {
        "case": "Very large capacity W",
        "handling": "If W is 10^9, DP is infeasible. Must use Branch & Bound or Meet-in-the-Middle if n is small.",
        "example": "W = 1,000,000,000 causes MemoryError in standard DP table."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Iterating forward (0 to W) in 1D space optimization",
        "solution": "Forward iteration allows the same item to be reused multiple times (Unbounded Knapsack). You MUST iterate backwards from W down to wt."
      },
      {
        "mistake": "Off-by-one errors in table dimensions",
        "solution": "Table must have size (n + 1) by (W + 1) so indices 0..n and 0..W are valid."
      }
    ],
    "applications": [
      {
        "industry": "Cloud Computing",
        "application": "Server Virtual Machine Packing",
        "benefit": "Maximizing revenue by selecting VM instances that fit into physical server RAM and CPU limits."
      },
      {
        "industry": "Finance",
        "application": "Capital Budgeting",
        "benefit": "Selecting an optimal portfolio of independent projects under a fixed capital budget."
      },
      {
        "industry": "Cargo Shipping",
        "application": "Container Load Optimization",
        "benefit": "Packing high-value discrete freight into weight-constrained aircraft containers."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-knap-q1",
        "question": "Why does the 1D space-optimized Knapsack iterate backwards from W down to wt?",
        "hint": "What value does dp[w - wt] hold if you iterate forward versus backward?",
        "answer": "Iterating backwards ensures that when computing dp[w], the referenced subproblem dp[w - wt] has NOT yet been updated during the current item's pass. It still holds the result from the previous item (i-1), ensuring each item is used at most once."
      },
      {
        "id": "dsa-knap-q2",
        "question": "Why is 0/1 Knapsack termed \"pseudo-polynomial\" time instead of strictly polynomial?",
        "hint": "How is the input size of integer W measured in binary?",
        "answer": "The runtime is O(n * W). In computational complexity, the input size of an integer W is the number of bits needed to represent it: log2(W). An algorithm running in time proportional to W is exponential in the number of bits: O(n * 2^k), making it pseudo-polynomial."
      },
      {
        "id": "dsa-knap-q3",
        "question": "How can you reconstruct the actual items included in the optimal knapsack from a 2D DP table?",
        "hint": "Compare dp[i][w] with dp[i-1][w].",
        "answer": "Start at cell (n, W). If dp[i][w] != dp[i-1][w], item i was included! Add item i to the list, update w = w - weights[i-1], and decrement i = i - 1. If dp[i][w] == dp[i-1][w], item i was excluded, so simply decrement i = i - 1. Repeat until i == 0 or w == 0."
      }
    ],
    "quiz": [
      {
        "id": "dsa-knap-quiz-1",
        "question": "What is the recurrence relation for the 0/1 Knapsack problem when item i fits in capacity w?",
        "options": [
          "dp[i][w] = dp[i-1][w] + val[i]",
          "dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])",
          "dp[i][w] = max(dp[i][w-1], dp[i-1][w])",
          "dp[i][w] = val[i-1] + dp[i][w - wt[i-1]]"
        ],
        "correctIndex": 1,
        "explanation": "The optimal choice is the maximum between excluding item i (dp[i-1][w]) and including item i (val[i-1] + dp[i-1][w - wt[i-1]])."
      },
      {
        "id": "dsa-knap-quiz-2",
        "question": "What is the minimum auxiliary space required to solve 0/1 Knapsack for capacity W?",
        "options": [
          "O(n * W)",
          "O(W)",
          "O(n)",
          "O(1)"
        ],
        "correctIndex": 1,
        "explanation": "Using a single 1D array of size (W + 1) and iterating capacity backwards reduces space to O(W)."
      },
      {
        "id": "dsa-knap-quiz-3",
        "question": "How does 0/1 Knapsack differ from the Fractional Knapsack problem?",
        "options": [
          "0/1 Knapsack can be solved greedily in O(n log n)",
          "Fractional Knapsack allows breaking items into continuous fractions and is solved greedily; 0/1 Knapsack requires dynamic programming",
          "0/1 Knapsack has no weight limit",
          "There is no difference"
        ],
        "correctIndex": 1,
        "explanation": "Fractional Knapsack allows taking fractions of items and is solved greedily by sorting value/weight ratios in O(n log n). 0/1 Knapsack items are indivisible and requires DP."
      }
    ],
    "codingChallenge": {
      "title": "Partition Equal Subset Sum (LeetCode 416)",
      "problem": "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or false otherwise.",
      "hints": [
        "Notice that partitioning into two equal subsets means finding a subset whose sum equals sum(nums) // 2.",
        "If the total sum is odd, immediately return False.",
        "Reduce to 0/1 Knapsack: can we achieve weight target using a subset of items? Use boolean dp array."
      ],
      "starterCode": "def can_partition(nums: list[int]) -> bool:\n    # Your 0/1 Knapsack reduction here\n    return False\n\n# Test cases:\nprint(can_partition([1, 5, 11, 5]))  # Expected: True (subset [1, 5, 5] and [11])\nprint(can_partition([1, 2, 3, 5]))   # Expected: False",
      "solution": "def can_partition(nums: list[int]) -> bool:\n    total_sum = sum(nums)\n    # If sum is odd, cannot be partitioned into two equal integers\n    if total_sum % 2 != 0:\n        return False\n        \n    target = total_sum // 2\n    dp = [False] * (target + 1)\n    dp[0] = True  # Target 0 is always achievable with empty subset\n    \n    for num in nums:\n        for w in range(target, num - 1, -1):\n            dp[w] = dp[w] or dp[w - num]\n            \n    return dp[target]\n\n# Test cases:\nprint(can_partition([1, 5, 11, 5]))  # True\nprint(can_partition([1, 2, 3, 5]))   # False"
    },
    "summary": {
      "keyTakeaways": [
        "0/1 Knapsack is the archetype of bounded decision dynamic programming.",
        "Binary choice: include item i vs exclude item i.",
        "1D rolling array reduces space from O(n * W) to O(W) by looping capacity backwards.",
        "Subset Sum and Partition Equal Subset reduce directly to 0/1 Knapsack."
      ],
      "nextLessonId": "dsa-dp-lcs",
      "nextLessonTitle": "Longest Common Subsequence",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "dp = [0] * (capacity + 1)",
        "codeSnippet": "dp = [0] * (capacity + 1)",
        "explanation": "Initializes a 1D DP table where dp[w] stores the maximum value for weight limit w."
      },
      {
        "line": "4-6",
        "lines": "4-6",
        "code": "for wt, val in zip(weights, values):",
        "codeSnippet": "for wt, val in zip(weights, values):",
        "explanation": "Iterates through each item one by one."
      },
      {
        "line": "7-8",
        "lines": "7-8",
        "code": "for w in range(W, wt - 1, -1): dp[w] = max(dp[w], val + dp[w - wt])",
        "codeSnippet": "for w in range(W, wt - 1, -1): dp[w] = max(dp[w], val + dp[w - wt])",
        "explanation": "Iterates backwards from W down to wt, updating each capacity with the choice to include the current item."
      }
    ]
  },
  "dsa-greedy-strategy": {
    "id": "dsa-greedy-strategy",
    "moduleId": "dsa-module-11",
    "title": "Greedy Strategy and Correctness Intuition",
    "subtitle": "Locally Optimal Choices, Greedy Choice Property, and Exchange Arguments",
    "order": 1,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Define the Greedy Paradigm: making locally optimal choices at every step.",
      "Differentiate between problems where greedy succeeds vs where it fails.",
      "Prove greedy correctness using Exchange Arguments and Stays Ahead techniques.",
      "Analyze Optimal Substructure in greedy algorithms."
    ],
    "prerequisites": [
      "Time Complexity and Big-O",
      "Sorting Algorithms: Quick Sort"
    ],
    "analogy": {
      "title": "The Greedy Cashier Making Change",
      "text": "When a US cashier needs to give 41 cents in change, they instinctively pick the largest possible coin first: a 25-cent quarter (leaving 16c), then a 10-cent dime (leaving 6c), then a 5-cent nickel (leaving 1c), and finally a 1-cent penny. In US currency, this locally optimal coin choice always yields the globally minimal number of coins.",
      "metaphor": "Greedy algorithms make the best immediate decision without backtracking or second-guessing."
    },
    "problemSolved": {
      "title": "Achieving O(n) or O(n log n) Speed Without Dynamic Programming Overhead",
      "description": "Dynamic programming checks all subproblems, which can take O(n²) or O(n³). When a problem exhibits the Greedy Choice Property, making a single local decision eliminates subproblem branching, running orders of magnitude faster.",
      "keyPoints": [
        "Zero backtracking: never reconsiders previous choices.",
        "Requires mathematical proof (exchange argument or stays ahead).",
        "Fails when local choices trap the algorithm in dead-end local optima."
      ]
    },
    "intuition": {
      "overview": "Sort items by a greedy metric (ratio, end time, value). Select items one by one if they satisfy constraints, immediately committing to each choice.",
      "steps": [
        {
          "step": 1,
          "title": "Establish Metric",
          "description": "Define greedy sorting criterion (e.g. earliest deadline)."
        },
        {
          "step": 2,
          "title": "Iterate & Commit",
          "description": "Process items in order; accept if feasible, reject if conflicting."
        },
        {
          "step": 3,
          "title": "No Backtracking",
          "description": "Move forward permanently to next item."
        }
      ]
    },
    "formalDefinition": {
      "text": "A problem exhibits the Greedy Choice Property if a globally optimal solution can be reached by assembling locally optimal choices. In an Exchange Argument, we assume an optimal solution OPT differs from greedy solution GREEDY, and show that replacing an element of OPT with one from GREEDY yields a solution that is at least as good.",
      "latex": "\\text{cost}(\\text{OPT} \\setminus \\{x\\} \\cup \\{g\\}) \\le \\text{cost}(\\text{OPT}) \\implies \\text{Greedy is optimal}"
    },
    "complexity": {
      "overview": "Typically dominated by sorting: O(n log n) time and O(1) extra space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Sorting step dominates."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Standard greedy execution."
        },
        {
          "case": "Worst",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Single pass over sorted input."
        }
      ],
      "spaceNote": "O(1) auxiliary memory beyond sorting."
    },
    "workedExample": {
      "title": "Making 41 Cents Change in Standard US Coins [25, 10, 5, 1]",
      "input": "Amount = 41",
      "steps": [
        {
          "step": 1,
          "action": "Pick 25c",
          "state": "41 - 25 = 16c left",
          "explanation": "Largest coin <= 41 is 25."
        },
        {
          "step": 2,
          "action": "Pick 10c",
          "state": "16 - 10 = 6c left",
          "explanation": "Largest coin <= 16 is 10."
        },
        {
          "step": 3,
          "action": "Pick 5c",
          "state": "6 - 5 = 1c left",
          "explanation": "Largest coin <= 6 is 5."
        },
        {
          "step": 4,
          "action": "Pick 1c",
          "state": "1 - 1 = 0c left",
          "explanation": "Largest coin <= 1 is 1."
        }
      ],
      "finalOutput": "Coins used: [25, 10, 5, 1] (Total: 4 coins)"
    },
    "visualExplanation": {
      "title": "Greedy vs Global Optimum Landscape",
      "description": "Visualizing a hill-climber ascending the immediate steepest slope vs the true global mountain peak.",
      "features": [
        "Greedy path highlighted in bold green",
        "Warning callout where greedy falls into local traps on non-canonical currencies"
      ]
    },
    "pseudocode": {
      "title": "Greedy Coin Change (Canonical)",
      "code": "function greedyCoinChange(coins, amount):\n    sort(coins in descending order)\n    result = []\n    for c in coins:\n        while amount >= c:\n            amount -= c\n            result.append(c)\n    return result if amount == 0 else -1"
    },
    "pythonCode": {
      "title": "Python Greedy Coin Change",
      "code": "def greedy_coin_change(coins: list[int], amount: int) -> list[int]:\n    # Works for canonical coin systems (US, Euro)\n    coins.sort(reverse=True)\n    res = []\n    for c in coins:\n        while amount >= c:\n            amount -= c\n            res.append(c)\n    return res if amount == 0 else []",
      "explanation": "Greedily subtracts the largest coin denomination possible."
    },
    "runnableCode": {
      "code": "print(greedy_coin_change([1, 5, 10, 25], 41))",
      "expectedOutput": "[25, 10, 5, 1]"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "coins.sort(reverse=True)",
        "codeSnippet": "coins.sort(reverse=True)",
        "explanation": "Orders denominations from largest to smallest to ensure greedy selection."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "while amount >= c: amount -= c; res.append(c)",
        "codeSnippet": "while amount >= c: amount -= c; res.append(c)",
        "explanation": "Repeatedly chooses the locally maximal denomination."
      }
    ],
    "edgeCases": [
      {
        "case": "Non-canonical coin systems (e.g. coins [1, 3, 4], amount 6)",
        "handling": "Greedy chooses 4, 1, 1 (3 coins); true optimal is 3, 3 (2 coins)! Requires Dynamic Programming.",
        "example": "coins=[1, 3, 4], amount=6"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming greedy works for all optimization problems",
        "solution": "Always check if an exchange argument holds; if counterexamples exist, switch to Dynamic Programming.",
        "codeExample": "# Greedy fails on Coin Change [1, 3, 4] for 6"
      }
    ],
    "applications": [
      {
        "industry": "Data Compression",
        "application": "Huffman Coding Tree generation",
        "benefit": "Greedily pairs lowest frequencies to generate optimal prefix codes."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-gs-1",
        "question": "What are the two key ingredients required for a greedy algorithm to be provably optimal?",
        "hint": "Greedy choice and substructure.",
        "answer": "1. Greedy Choice Property (locally optimal choices yield global optimum), and 2. Optimal Substructure (optimal solution contains optimal solutions to subproblems)."
      }
    ],
    "quiz": [
      {
        "id": "q-gs-1",
        "question": "When does a greedy algorithm fail to find the globally optimal solution?",
        "options": [
          "When locally optimal choices lead to suboptimal future choices without backtracking",
          "When inputs are integers",
          "When sorting is impossible",
          "When memory is limited"
        ],
        "correctIndex": 0,
        "explanation": "Greedy algorithms do not explore alternate branches; if an early choice precludes the true global optimum, greedy gets stuck."
      }
    ],
    "codingChallenge": {
      "title": "Assign Cookies",
      "problem": "Each child i has a greed factor g[i], and each cookie j has a size s[j]. If s[j] >= g[i], child i is satisfied. Maximize the number of satisfied children.",
      "hints": [
        "Sort both greed factors and cookie sizes; satisfy children with the smallest possible sufficient cookie."
      ],
      "starterCode": "def find_content_children(g: list[int], s: list[int]) -> int:\n    # TODO: Greedily satisfy children\n    pass",
      "solution": "def find_content_children(g: list[int], s: list[int]) -> int:\n    g.sort()\n    s.sort()\n    child_i = 0\n    cookie_j = 0\n    while child_i < len(g) and cookie_j < len(s):\n        if s[cookie_j] >= g[child_i]:\n            child_i += 1\n        cookie_j += 1\n    return child_i"
    },
    "summary": {
      "keyTakeaways": [
        "Greedy algorithms make locally optimal decisions at every step.",
        "Always verify correctness using exchange arguments before deploying greedy."
      ],
      "nextLessonId": "dsa-greedy-activity-selection",
      "nextLessonTitle": "Activity Selection and Interval Problems",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "coins.sort(reverse=True)",
        "codeSnippet": "coins.sort(reverse=True)",
        "explanation": "Orders denominations from largest to smallest to ensure greedy selection."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "while amount >= c: amount -= c; res.append(c)",
        "codeSnippet": "while amount >= c: amount -= c; res.append(c)",
        "explanation": "Repeatedly chooses the locally maximal denomination."
      }
    ]
  },
  "dsa-greedy-activity-selection": {
    "id": "dsa-greedy-activity-selection",
    "moduleId": "dsa-module-11",
    "title": "Activity Selection and Interval Problems",
    "subtitle": "Interval Scheduling, Earliest Finish Time Heuristic, and Non-Overlapping Subsets",
    "order": 2,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Maximize the number of mutually compatible intervals.",
      "Prove why sorting by Earliest Finish Time (end time) is provably optimal.",
      "Disprove intuitive but flawed heuristics: shortest duration and earliest start time.",
      "Master interval variations: Merge Intervals, Insert Interval, and Non-overlapping Intervals."
    ],
    "prerequisites": [
      "Greedy Strategy and Correctness Intuition"
    ],
    "analogy": {
      "title": "Booking a Single Movie Theater Screen",
      "text": "A movie theater has only one screen and 10 film requests with different start and end times. To show the maximum number of movies in a day, which movie should you pick first? The movie that FINISHES EARLIEST! Ending as early as possible leaves the maximum possible free time remaining for the rest of the day.",
      "metaphor": "Picking the earliest end time leaves maximum room for future non-conflicting activities."
    },
    "problemSolved": {
      "title": "Optimal Resource Utilization Without Conflict",
      "description": "Scheduling meetings in conference rooms, aircraft on runways, or CPU burst jobs requires selecting the largest possible set of non-overlapping time windows.",
      "keyPoints": [
        "Earliest finish time is mathematically optimal.",
        "Executes in O(n log n) sorting time + O(n) scan.",
        "Core interview pattern for all interval-based challenges."
      ]
    },
    "intuition": {
      "overview": "Sort all intervals by end time. Pick the first interval. For each subsequent interval, if its start time >= end time of last selected interval, select it and update last end time.",
      "steps": [
        {
          "step": 1,
          "title": "Sort by End Time",
          "description": "intervals.sort(key=lambda x: x[1])"
        },
        {
          "step": 2,
          "title": "Initialize Benchmark",
          "description": "count = 1; last_end = intervals[0][1]"
        },
        {
          "step": 3,
          "title": "Filter Non-Overlapping",
          "description": "For [s, e] in intervals[1:]: if s >= last_end: count++; last_end = e."
        }
      ]
    },
    "formalDefinition": {
      "text": "Given n activities S = \\{[s_i, f_i)\\}. Activity Selection finds a subset A \\subseteq S of pairwise disjoint intervals of maximal cardinality |A|. Greedily selecting i = \\arg\\min_{j \\in S_{\\text{compatible}}} f_j is optimal.",
      "latex": "\\max |A| \\quad \\text{s.t.} \\quad \\forall i, j \\in A \\, (i \\neq j), \\; [s_i, f_i) \\cap [s_j, f_j) = \\emptyset"
    },
    "complexity": {
      "overview": "Time: O(n log n) sorting. Space: O(1) in-place.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Sorting dominates."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Single linear scan after sort."
        },
        {
          "case": "Worst",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "All intervals overlap."
        }
      ],
      "spaceNote": "O(1) memory beyond sorting."
    },
    "workedExample": {
      "title": "Scheduling Intervals: [1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11]",
      "input": "8 intervals",
      "steps": [
        {
          "step": 1,
          "action": "Sort by end time",
          "state": "[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11]",
          "explanation": "First is [1, 4]."
        },
        {
          "step": 2,
          "action": "Pick [1, 4]",
          "state": "last_end = 4, count = 1",
          "explanation": "First selected."
        },
        {
          "step": 3,
          "action": "Skip [3, 5], [0, 6]",
          "state": "Start 3 < 4, Start 0 < 4 (conflict)",
          "explanation": "Overlaps skipped."
        },
        {
          "step": 4,
          "action": "Pick [5, 7]",
          "state": "Start 5 >= 4 -> Selected! last_end = 7, count = 2",
          "explanation": "Second selected."
        },
        {
          "step": 5,
          "action": "Skip [3, 9], [5, 9], [6, 10]",
          "state": "Starts < 7 (conflict)",
          "explanation": "Overlaps skipped."
        },
        {
          "step": 6,
          "action": "Pick [8, 11]",
          "state": "Start 8 >= 7 -> Selected! last_end = 11, count = 3",
          "explanation": "Third selected."
        }
      ],
      "finalOutput": "Max compatible activities = 3: {[1, 4], [5, 7], [8, 11]}"
    },
    "visualExplanation": {
      "title": "Timeline Horizon Scanning",
      "description": "Visualizing timeline bars: green intervals selected, red overlapping bars discarded.",
      "features": [
        "Earliest ending green bar frees up timeline",
        "Red conflicting intervals pruned"
      ]
    },
    "pseudocode": {
      "title": "Activity Selection Algorithm",
      "code": "function activitySelection(intervals):\n    sort(intervals by end_time)\n    count = 1\n    last_end = intervals[0].end\n    for i from 1 to length(intervals) - 1:\n        if intervals[i].start >= last_end:\n            count += 1\n            last_end = intervals[i].end\n    return count"
    },
    "pythonCode": {
      "title": "Python Non-Overlapping Intervals",
      "code": "def erase_overlap_intervals(intervals: list[list[int]]) -> int:\n    if not intervals: return 0\n    # Sort by end time\n    intervals.sort(key=lambda x: x[1])\n    \n    count_kept = 1\n    last_end = intervals[0][1]\n    \n    for start, end in intervals[1:]:\n        if start >= last_end:\n            count_kept += 1\n            last_end = end\n            \n    # Number of intervals to remove = total - kept\n    return len(intervals) - count_kept",
      "explanation": "Finds maximal compatible intervals; subtracts from total to find minimal removals."
    },
    "runnableCode": {
      "code": "intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]\nprint(erase_overlap_intervals(intervals)) # Remove 1 interval [1, 3]",
      "expectedOutput": "1"
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "intervals.sort(key=lambda x: x[1])",
        "codeSnippet": "intervals.sort(key=lambda x: x[1])",
        "explanation": "Sorting by END time (index 1) is the critical greedy choice that guarantees optimality."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "if start >= last_end:",
        "codeSnippet": "if start >= last_end:",
        "explanation": "Checks compatibility: next activity starts at or after previous activity concludes."
      }
    ],
    "edgeCases": [
      {
        "case": "All intervals share identical start and end times",
        "handling": "Selects 1 interval, discards all others.",
        "example": "[[1, 2], [1, 2], [1, 2]] -> remove 2"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Sorting by START time instead of END time",
        "solution": "Sorting by start time fails (e.g. [0, 100] starts earliest but blocks all other activities); always sort by end time.",
        "codeExample": "intervals.sort(key=lambda x: x[1]) # sort by end time!"
      }
    ],
    "applications": [
      {
        "industry": "Cloud Computing",
        "application": "Virtual machine instance scheduling on physical server hosts",
        "benefit": "Maximizes VM throughput across calendar slots."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-as-1",
        "question": "How is the Meeting Rooms II problem (finding minimum conference rooms needed) different from Activity Selection?",
        "hint": "Track concurrent active meetings.",
        "answer": "Activity Selection selects non-overlapping intervals on 1 screen. Meeting Rooms II finds the maximum number of concurrent overlapping intervals at any point in time (using min-heap or two-pointer start/end arrays)."
      }
    ],
    "quiz": [
      {
        "id": "q-as-1",
        "question": "What greedy sorting criterion provably maximizes the number of non-overlapping intervals?",
        "options": [
          "Earliest finish time (end time)",
          "Earliest start time",
          "Shortest duration",
          "Smallest start + end sum"
        ],
        "correctIndex": 0,
        "explanation": "Ending as early as possible leaves the maximum remaining time available for subsequent non-conflicting activities."
      }
    ],
    "codingChallenge": {
      "title": "Merge Intervals",
      "problem": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      "hints": [
        "Sort by start time; merge with previous interval if current.start <= prev.end."
      ],
      "starterCode": "def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:\n    # TODO: Merge overlapping intervals\n    pass",
      "solution": "def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    for interval in intervals:\n        if not merged or merged[-1][1] < interval[0]:\n            merged.append(interval)\n        else:\n            merged[-1][1] = max(merged[-1][1], interval[1])\n    return merged"
    },
    "summary": {
      "keyTakeaways": [
        "Sort by earliest finish time to maximize compatible activities.",
        "Merge intervals sorts by start time to chain overlapping bounds."
      ],
      "nextLessonId": "dsa-greedy-fractional-knapsack",
      "nextLessonTitle": "Fractional Knapsack",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "intervals.sort(key=lambda x: x[1])",
        "codeSnippet": "intervals.sort(key=lambda x: x[1])",
        "explanation": "Sorting by END time (index 1) is the critical greedy choice that guarantees optimality."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "if start >= last_end:",
        "codeSnippet": "if start >= last_end:",
        "explanation": "Checks compatibility: next activity starts at or after previous activity concludes."
      }
    ]
  },
  "dsa-greedy-fractional-knapsack": {
    "id": "dsa-greedy-fractional-knapsack",
    "moduleId": "dsa-module-11",
    "title": "Fractional Knapsack",
    "subtitle": "Value-to-Weight Ratio Greedy Choice vs 0/1 Discrete Indivisibility",
    "order": 3,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Solve the Fractional Knapsack problem where items can be subdivided continuously.",
      "Formulate the value-to-weight density ratio: ratio = value / weight.",
      "Understand why greedy works for Fractional Knapsack but fails for 0/1 Knapsack.",
      "Implement the O(n log n) greedy density sorting algorithm."
    ],
    "prerequisites": [
      "Greedy Strategy and Correctness Intuition"
    ],
    "analogy": {
      "title": "Filling a Jar with Gold Dust vs Gold Bars",
      "text": "A thief in a vault has a backpack that can carry 10 kg. If the vault contains sacks of gold dust, silver dust, and copper dust, the thief fills their bag with 100% gold dust by taking scoops. But if the vault contains solid indivisible gold bars of 12 kg, they cannot take any part of it.",
      "metaphor": "Continuous items can be taken fractionally, guaranteeing optimal value density packing."
    },
    "problemSolved": {
      "title": "Optimal Resource Allocation with Continuous Divisibility",
      "description": "When goods can be fractionalized (liquids, grain, data bandwidth allocation), greedy sorting by value density (value per unit weight) delivers the mathematically maximum possible total value in O(n log n) time.",
      "keyPoints": [
        "Items can be fractionally divided.",
        "Greedy choice: highest value-to-weight ratio first.",
        "Fails on discrete 0/1 Knapsack (which requires DP)."
      ]
    },
    "intuition": {
      "overview": "Calculate density = value / weight for each item. Sort descending by density. Take whole items while capacity allows. When the next item exceeds remaining capacity, take fraction = remaining / weight and finish.",
      "steps": [
        {
          "step": 1,
          "title": "Compute Density",
          "description": "density = value / weight for each item."
        },
        {
          "step": 2,
          "title": "Sort Descending",
          "description": "items.sort(key=lambda x: x.val / x.wt, reverse=True)"
        },
        {
          "step": 3,
          "title": "Pack Greedy",
          "description": "Take min(capacity, item.weight), add fraction of value, subtract weight."
        }
      ]
    },
    "formalDefinition": {
      "text": "Maximize \\sum_{i=1}^n x_i v_i subject to \\sum_{i=1}^n x_i w_i \\le W and 0 \\le x_i \\le 1. Sorted order v_1/w_1 \\ge v_2/w_2 \\ge ... \\ge v_n/w_n guarantees optimality of greedy prefix filling.",
      "latex": "\\max \\sum_{i=1}^n x_i v_i \\quad \\text{s.t.} \\quad \\sum_{i=1}^n x_i w_i \\le W, \\quad x_i \\in [0, 1]"
    },
    "complexity": {
      "overview": "Time: O(n log n) sorting. Space: O(1) in-place.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Sorting by ratio."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Linear packing scan."
        },
        {
          "case": "Worst",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "All items evaluated."
        }
      ],
      "spaceNote": "O(1) auxiliary memory."
    },
    "workedExample": {
      "title": "Capacity W = 50, Items: (val=60, wt=10), (val=100, wt=20), (val=120, wt=30)",
      "input": "W = 50",
      "steps": [
        {
          "step": 1,
          "action": "Compute Densities",
          "state": "Item 1: 60/10=6.0; Item 2: 100/20=5.0; Item 3: 120/30=4.0",
          "explanation": "Order: 1, 2, 3."
        },
        {
          "step": 2,
          "action": "Take 100% Item 1",
          "state": "take 10 kg -> W_left = 40, val = 60",
          "explanation": "Full item packed."
        },
        {
          "step": 3,
          "action": "Take 100% Item 2",
          "state": "take 20 kg -> W_left = 20, val = 60 + 100 = 160",
          "explanation": "Full item packed."
        },
        {
          "step": 4,
          "action": "Take fraction of Item 3",
          "state": "Only 20 kg left of 30 kg -> take 20/30 (66.7%) -> val += (20/30)*120 = 80",
          "explanation": "Bag full at 50 kg."
        }
      ],
      "finalOutput": "Max Value = 160 + 80 = 240.0"
    },
    "visualExplanation": {
      "title": "Density Beaker Filling",
      "description": "Visualizing pouring densest liquid first, topping off the beaker with fraction of 3rd liquid.",
      "features": [
        "Bars colored by value-to-weight ratio",
        "Top partial slice fills remaining container capacity"
      ]
    },
    "pseudocode": {
      "title": "Fractional Knapsack Algorithm",
      "code": "function fractionalKnapsack(W, items):\n    sort(items descending by val / wt)\n    total_val = 0.0\n    for item in items:\n        if W >= item.wt:\n            W -= item.wt\n            total_val += item.val\n        else:\n            total_val += item.val * (W / item.wt)\n            break\n    return total_val"
    },
    "pythonCode": {
      "title": "Python Fractional Knapsack Implementation",
      "code": "def fractional_knapsack(capacity: float, values: list[float], weights: list[float]) -> float:\n    # Pair items and sort by value-to-weight ratio descending\n    items = sorted(zip(values, weights), key=lambda x: x[0] / x[1], reverse=True)\n    total_value = 0.0\n    rem_capacity = capacity\n\n    for val, wt in items:\n        if rem_capacity >= wt:\n            rem_capacity -= wt\n            total_value += val\n        else:\n            total_value += val * (rem_capacity / wt)\n            break # Knapsack is completely full\n\n    return total_value",
      "explanation": "Sorts items by value density and fills knapsack, taking a fractional slice of the last item."
    },
    "runnableCode": {
      "code": "values = [60, 100, 120]\nweights = [10, 20, 30]\nprint(fractional_knapsack(50, values, weights))",
      "expectedOutput": "240.0"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "key=lambda x: x[0] / x[1], reverse=True",
        "codeSnippet": "key=lambda x: x[0] / x[1], reverse=True",
        "explanation": "Sorts items descending by value density (val / wt)."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "total_value += val * (rem_capacity / wt)",
        "codeSnippet": "total_value += val * (rem_capacity / wt)",
        "explanation": "Takes the precise fractional proportion required to fill remaining capacity to 100%."
      }
    ],
    "edgeCases": [
      {
        "case": "Total weights <= capacity",
        "handling": "Takes all items in full, returns sum(values).",
        "example": "capacity=100, total_wt=50"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to use Fractional Knapsack greedy strategy for 0/1 Knapsack",
        "solution": "0/1 items cannot be split; taking the highest ratio item can leave empty space that wastes value. Use DP for 0/1 Knapsack.",
        "codeExample": "# 0/1 Knapsack requires DP, not Greedy!"
      }
    ],
    "applications": [
      {
        "industry": "Telecommunications",
        "application": "Bandwidth allocation across competing streaming video packets",
        "benefit": "Maximizes transmitted video fidelity under packet payload limits."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-fk-1",
        "question": "Can Fractional Knapsack be solved in O(n) average time without full sorting?",
        "hint": "Recall Quickselect.",
        "answer": "Yes! Using Quickselect on value-to-weight ratios, we can partition items into those that definitely fit, find the threshold item, and pack in O(n) expected time."
      }
    ],
    "quiz": [
      {
        "id": "q-fk-1",
        "question": "Why does greedy work for Fractional Knapsack but fail for 0/1 Knapsack?",
        "options": [
          "Because fractional divisibility allows filling 100% of the knapsack capacity without leaving wasted empty space",
          "Because 0/1 Knapsack has no numbers",
          "Because fractional knapsack uses floats",
          "Because sorting is impossible in 0/1 knapsack"
        ],
        "correctIndex": 0,
        "explanation": "In fractional knapsack, we can take an exact fraction to top off the capacity, guaranteeing every unit of weight has the highest possible value density."
      }
    ],
    "codingChallenge": {
      "title": "Maximum Units on a Truck",
      "problem": "You are given a 2D array boxTypes where boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi] and truckSize. Return the maximum total number of units that can be put on the truck.",
      "hints": [
        "Sort by units per box descending; fill truck greedily."
      ],
      "starterCode": "def maximum_units(boxTypes: list[list[int]], truckSize: int) -> int:\n    # TODO: Maximize units on truck\n    pass",
      "solution": "def maximum_units(boxTypes: list[list[int]], truckSize: int) -> int:\n    boxTypes.sort(key=lambda x: x[1], reverse=True)\n    total_units = 0\n    for boxes, units in boxTypes:\n        take = min(truckSize, boxes)\n        total_units += take * units\n        truckSize -= take\n        if truckSize == 0:\n            break\n    return total_units"
    },
    "summary": {
      "keyTakeaways": [
        "Fractional knapsack sorts by value density (val / wt) in O(n log n).",
        "Continuous divisibility guarantees greedy optimality."
      ],
      "nextLessonId": "dsa-dp-fundamentals",
      "nextLessonTitle": "Dynamic Programming Fundamentals",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "key=lambda x: x[0] / x[1], reverse=True",
        "codeSnippet": "key=lambda x: x[0] / x[1], reverse=True",
        "explanation": "Sorts items descending by value density (val / wt)."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "total_value += val * (rem_capacity / wt)",
        "codeSnippet": "total_value += val * (rem_capacity / wt)",
        "explanation": "Takes the precise fractional proportion required to fill remaining capacity to 100%."
      }
    ]
  },
  "dsa-dp-fundamentals": {
    "id": "dsa-dp-fundamentals",
    "moduleId": "dsa-module-11",
    "title": "Dynamic Programming Fundamentals",
    "subtitle": "Optimal Substructure, Overlapping Subproblems, and the Principle of Optimality",
    "order": 4,
    "readTimeMinutes": 24,
    "difficulty": "Beginner",
    "visualizerType": "dp-table",
    "objectives": [
      "Define the two core requirements of Dynamic Programming: Overlapping Subproblems and Optimal Substructure.",
      "Contrast Divide-and-Conquer (independent subproblems) with DP (shared overlapping subproblems).",
      "Formulate the Bellman Principle of Optimality.",
      "Follow the 4-step DP framework: State definition, Recurrence relation, Base cases, and Answer extraction."
    ],
    "prerequisites": [
      "DSA Foundations: Recursion",
      "Recursion Trees and Call Stacks"
    ],
    "analogy": {
      "title": "Writing Down the Answer on a Piece of Paper",
      "text": "A teacher writes \"1 + 1 + 1 + 1 + 1\" on the board and asks a student for the sum: \"5!\". The teacher then writes another \"1 +\" in front and asks: \"What is the answer now?\" The student immediately answers \"6!\" without recounting the first five ones because they REMEMBERED the previous answer.",
      "metaphor": "Dynamic Programming remembers previous subproblem solutions so they never need to be recomputed."
    },
    "problemSolved": {
      "title": "Taming Combinatorial Explosion from O(2^n) to Polynomial O(n²)",
      "description": "Naive recursive branching recalculates the same subproblems exponentially many times (e.g. fib(5) calculates fib(2) three times). DP caches subproblem answers, transforming exponential runtimes into linear or quadratic time.",
      "keyPoints": [
        "Caches overlapping subproblems to eliminate redundant computation.",
        "Reduces exponential O(2^n) algorithms to polynomial O(n) or O(n²).",
        "Underpins modern bioinformatics sequence alignment and reinforcement learning."
      ]
    },
    "intuition": {
      "overview": "Break problem into smaller subproblems. Define a state array/table dp[i]. Identify the recurrence transition linking dp[i] to earlier subproblems dp[i-1], dp[i-2]. Compute base cases and fill.",
      "steps": [
        {
          "step": 1,
          "title": "State Definition",
          "description": "What does dp[i] represent in plain English?"
        },
        {
          "step": 2,
          "title": "Transition Formula",
          "description": "How does dp[i] relate to previous states?"
        },
        {
          "step": 3,
          "title": "Base Cases & Order",
          "description": "What are the trivial starting values and safe filling direction?"
        }
      ]
    },
    "formalDefinition": {
      "text": "Richard Bellman's Principle of Optimality: An optimal policy has the property that whatever the initial state and initial decision are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision.",
      "latex": "V(s) = \\max_{a} \\big( R(s, a) + \\gamma \\sum_{s'} P(s' \\mid s, a) V(s') \\big)"
    },
    "complexity": {
      "overview": "Time: O(number of subproblems * transition time per state). Space: O(number of states).",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Linear 1D DP with O(1) transition (e.g. Fibonacci)."
        },
        {
          "case": "Average",
          "time": "O(n²)",
          "space": "O(n²)",
          "explanation": "2D DP (e.g. Longest Common Subsequence)."
        },
        {
          "case": "Worst",
          "time": "O(n³)",
          "space": "O(n²)",
          "explanation": "Interval DP (e.g. Matrix Chain Multiplication)."
        }
      ],
      "spaceNote": "Can often be optimized (e.g. space rolling from O(n) to O(1))."
    },
    "workedExample": {
      "title": "Fibonacci Overlapping Subproblems in Recursive Tree",
      "input": "fib(5) = fib(4) + fib(3)",
      "steps": [
        {
          "step": 1,
          "action": "Expand fib(5)",
          "state": "Needs fib(4) and fib(3)",
          "explanation": "Root splits."
        },
        {
          "step": 2,
          "action": "Expand fib(4)",
          "state": "Needs fib(3) and fib(2)",
          "explanation": "Notice: fib(3) is needed BOTH by fib(5) AND fib(4)!"
        },
        {
          "step": 3,
          "action": "Naive tree",
          "state": "Calculates fib(3) twice, fib(2) three times, fib(1) five times",
          "explanation": "Total 15 function calls for n=5 (exponential O(2^n))."
        },
        {
          "step": 4,
          "action": "DP memoization",
          "state": "Computes each state {0, 1, 2, 3, 4, 5} exactly ONCE",
          "explanation": "Total 6 operations (linear O(n))."
        }
      ],
      "finalOutput": "Exponential O(1.618^n) reduced to linear O(n)."
    },
    "visualExplanation": {
      "title": "DAG of Subproblem Dependencies",
      "description": "Visualizing recursion tree collapsing into a directed acyclic graph (DAG) where nodes share cached outputs.",
      "features": [
        "Duplicate tree branches merged into single DAG nodes",
        "Arrows indicate evaluation dependency flow"
      ]
    },
    "pseudocode": {
      "title": "DP 4-Step Framework",
      "code": "// 1. State: dp[i] = answer for subproblem of size i\n// 2. Base case: dp[0] = base0, dp[1] = base1\n// 3. Transition: dp[i] = f(dp[i-1], dp[i-2], ...)\n// 4. Return: dp[n]"
    },
    "pythonCode": {
      "title": "Python Naive vs Memoized vs Tabulated Fibonacci",
      "code": "def fib_memo(n: int, memo: dict = None) -> int:\n    if memo is None: memo = {}\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)\n    return memo[n]\n\ndef fib_tabulation(n: int) -> int:\n    if n <= 1: return n\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i - 1] + dp[i - 2]\n    return dp[n]",
      "explanation": "Contrasts top-down memoization with bottom-up iterative tabulation."
    },
    "runnableCode": {
      "code": "print(fib_memo(10))\nprint(fib_tabulation(10))",
      "expectedOutput": "55\n55"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "if n in memo: return memo[n]",
        "codeSnippet": "if n in memo: return memo[n]",
        "explanation": "Instant O(1) cache lookup: skips recomputing entire recursive subtrees."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "memo[n] = ...",
        "codeSnippet": "memo[n] = ...",
        "explanation": "Stores calculated result in memo before returning."
      }
    ],
    "edgeCases": [
      {
        "case": "Base cases n=0, n=1",
        "handling": "Handled explicitly before loop or recursion begins.",
        "example": "n = 0"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting DP when subproblems are not overlapping (e.g. Merge Sort)",
        "solution": "Merge Sort subproblems are completely independent partitions; DP is only needed when subproblems overlap and repeat.",
        "codeExample": "# Merge Sort is Divide-and-Conquer, not DP"
      }
    ],
    "applications": [
      {
        "industry": "Bioinformatics",
        "application": "DNA/RNA sequence alignment (Needleman-Wunsch)",
        "benefit": "Finds optimal genetic mutation alignments across millions of base pairs."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-dpf-1",
        "question": "What is the difference between Divide-and-Conquer and Dynamic Programming?",
        "hint": "Consider subproblem overlap.",
        "answer": "Divide-and-Conquer divides problems into INDEPENDENT subproblems (no overlap, e.g. Merge Sort). DP solves subproblems that OVERLAP and share identical subproblems."
      }
    ],
    "quiz": [
      {
        "id": "q-dpf-1",
        "question": "Which two properties are essential for a problem to be solved using Dynamic Programming?",
        "options": [
          "Optimal Substructure and Overlapping Subproblems",
          "Greedy Choice and Binary Search",
          "Sorting and Pointers",
          "Graph representation and Trees"
        ],
        "correctIndex": 0,
        "explanation": "DP requires that the optimal solution is built from optimal subproblems, and that those subproblems repeat multiple times."
      }
    ],
    "codingChallenge": {
      "title": "Climbing Stairs",
      "problem": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      "hints": [
        "ways(n) = ways(n-1) + ways(n-2); identical to Fibonacci."
      ],
      "starterCode": "def climb_stairs(n: int) -> int:\n    # TODO: Find number of ways to climb stairs\n    pass",
      "solution": "def climb_stairs(n: int) -> int:\n    if n <= 2: return n\n    prev2 = 1\n    prev1 = 2\n    for _ in range(3, n + 1):\n        curr = prev1 + prev2\n        prev2 = prev1\n        prev1 = curr\n    return prev1"
    },
    "summary": {
      "keyTakeaways": [
        "DP requires Optimal Substructure and Overlapping Subproblems.",
        "Formulate state, transition recurrence, base cases, and filling order."
      ],
      "nextLessonId": "dsa-dp-memoization-tabulation",
      "nextLessonTitle": "Memoization vs Tabulation",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "if n in memo: return memo[n]",
        "codeSnippet": "if n in memo: return memo[n]",
        "explanation": "Instant O(1) cache lookup: skips recomputing entire recursive subtrees."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "memo[n] = ...",
        "codeSnippet": "memo[n] = ...",
        "explanation": "Stores calculated result in memo before returning."
      }
    ]
  },
  "dsa-dp-memoization-tabulation": {
    "id": "dsa-dp-memoization-tabulation",
    "moduleId": "dsa-module-11",
    "title": "Memoization vs Tabulation",
    "subtitle": "Top-Down Recursive Caching vs Bottom-Up Iterative State Filling",
    "order": 5,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "dp-table",
    "objectives": [
      "Contrast Top-Down Memoization (recursive, demand-driven) with Bottom-Up Tabulation (iterative, dependency-driven).",
      "Evaluate stack overflow risks in deep recursion.",
      "Execute State Space Reduction: compressing O(n) or O(n²) memory to O(1) or O(n).",
      "Implement Python @functools.lru_cache for automated memoization."
    ],
    "prerequisites": [
      "Dynamic Programming Fundamentals"
    ],
    "analogy": {
      "title": "On-Demand Homework Answers vs Filling Out the Workbook in Order",
      "text": "A student can solve a math workbook in two ways: (1) Flip to problem #50. Realize it needs problem #48, so solve #48, which needs #46, only solving what is strictly demanded (Top-Down Memoization); or (2) Start on page 1, solve #1, #2, #3 sequentially in a tidy table until reaching #50 (Bottom-Up Tabulation).",
      "metaphor": "Memoization solves subproblems on-demand; Tabulation computes all states systematically from the ground up."
    },
    "problemSolved": {
      "title": "Architecting High-Performance, Memory-Efficient DP Solutions",
      "description": "Top-down memoization is natural to write but incurs recursion stack overhead. Bottom-up tabulation avoids recursion completely and enables rolling memory optimizations, often cutting space complexity by a full order of magnitude.",
      "keyPoints": [
        "Top-Down: Solves only needed subproblems; risk of stack overflow.",
        "Bottom-Up: No recursion overhead; easy to optimize memory.",
        "Space rolling reduces 2D tables O(m*n) to 1D vectors O(n)."
      ]
    },
    "intuition": {
      "overview": "In tabulation, order states by dependency (e.g. smaller indices first). If state dp[i] only depends on dp[i-1] and dp[i-2], you only need 2 variables, dropping memory from O(n) to O(1).",
      "steps": [
        {
          "step": 1,
          "title": "Dependency Analysis",
          "description": "Inspect transition: does dp[i][j] only need previous row dp[i-1]?"
        },
        {
          "step": 2,
          "title": "Allocate Minimal State",
          "description": "Allocate 1D array instead of full 2D table."
        },
        {
          "step": 3,
          "title": "In-Place Update",
          "description": "Iterate backwards or use two rows (prev and curr)."
        }
      ]
    },
    "formalDefinition": {
      "text": "Memoization evaluates the subproblem DAG top-down via DFS with memo lookup in O(1). Tabulation evaluates the subproblem DAG in topological sort order bottom-up, eliminating call stack frames.",
      "latex": "\\text{Space}(\\text{Tabulation Rolling}) = \\mathcal{O}(\\text{max dependency reach}) \\ll \\mathcal{O}(|V_{\\text{DAG}}|)"
    },
    "complexity": {
      "overview": "Both have identical asymptotic time complexity. Tabulation often enables superior space optimizations.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Tabulation with space rolling."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Standard 1D memoization or table."
        },
        {
          "case": "Worst",
          "time": "O(n²)",
          "space": "O(n²)",
          "explanation": "Full 2D grid DP."
        }
      ],
      "spaceNote": "Rolling array compresses space by eliminating historical rows."
    },
    "workedExample": {
      "title": "Space Rolling on Fibonacci",
      "input": "n = 5",
      "steps": [
        {
          "step": 1,
          "action": "Full Table",
          "state": "dp = [0, 1, 1, 2, 3, 5] -> O(n) memory",
          "explanation": "Stores all 6 elements."
        },
        {
          "step": 2,
          "action": "Rolling Variables",
          "state": "prev2=0, prev1=1",
          "explanation": "Only 2 integers needed."
        },
        {
          "step": 3,
          "action": "Slide forward",
          "state": "curr = 0+1=1 -> prev2=1, prev1=1",
          "explanation": "Constant O(1) space."
        }
      ],
      "finalOutput": "Memory reduced from O(n) to O(1)."
    },
    "visualExplanation": {
      "title": "Table Filling Order vs Recursive Stack",
      "description": "Visualizing grid cells filling left-to-right row-by-row vs recursion call stack push/pops.",
      "features": [
        "Tabulation fills clean green matrix",
        "Only current and previous row retained in memory"
      ]
    },
    "pseudocode": {
      "title": "Space-Optimized Tabulation Pattern",
      "code": "function solveTabulation(n):\n    prev2 = base0\n    prev1 = base1\n    for i from 2 to n:\n        curr = transition(prev1, prev2)\n        prev2 = prev1\n        prev1 = curr\n    return prev1"
    },
    "pythonCode": {
      "title": "Python Memoization vs Space-Optimized Tabulation",
      "code": "from functools import lru_cache\n\n# Top-Down with automated decorator\n@lru_cache(maxsize=None)\ndef fib_top_down(n: int) -> int:\n    if n <= 1:\n        return n\n    return fib_top_down(n - 1) + fib_top_down(n - 2)\n\n# Bottom-Up with O(1) space\ndef fib_bottom_up_o1(n: int) -> int:\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b",
      "explanation": "Demonstrates Python lru_cache for rapid prototyping vs O(1) space rolling."
    },
    "runnableCode": {
      "code": "print(fib_top_down(10))\nprint(fib_bottom_up_o1(10))",
      "expectedOutput": "55\n55"
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "@lru_cache(maxsize=None)",
        "codeSnippet": "@lru_cache(maxsize=None)",
        "explanation": "Python built-in memoizer: caches arguments and return values in an internal C-level hash map."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "a, b = b, a + b",
        "codeSnippet": "a, b = b, a + b",
        "explanation": "Simultaneous tuple assignment rolls memory forward in O(1) space without temporary variables."
      }
    ],
    "edgeCases": [
      {
        "case": "Large n (e.g. n=50,000)",
        "handling": "Top-down raises RecursionError: maximum recursion depth exceeded. Bottom-up executes in milliseconds.",
        "example": "n = 50000"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Retaining an entire N x M matrix when each row only depends on the previous row",
        "solution": "Keep only two rows (or one row iterating backwards) to drop space from O(N*M) to O(M).",
        "codeExample": "prev_row = [0] * M; curr_row = [0] * M"
      }
    ],
    "applications": [
      {
        "industry": "High-Frequency Trading",
        "application": "Order book execution algorithms",
        "benefit": "Zero recursion overhead and tight CPU cache footprint."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-mt-1",
        "question": "When is Top-Down Memoization strictly faster than Bottom-Up Tabulation?",
        "hint": "Consider sparse state spaces.",
        "answer": "When only a small fraction of the total possible states in the DP table are ever reachable, memoization computes only the visited states, while tabulation blindly computes all of them."
      }
    ],
    "quiz": [
      {
        "id": "q-mt-1",
        "question": "What is the primary risk of using Top-Down Memoization on deep inputs in Python?",
        "options": [
          "RecursionError: maximum recursion depth exceeded",
          "Memory leaks",
          "Syntax error",
          "Infinite CPU lockup"
        ],
        "correctIndex": 0,
        "explanation": "CPython has a default call stack limit (usually 1,000 frames); deep recursion exceeds this limit unless increased."
      }
    ],
    "codingChallenge": {
      "title": "House Robber (O(1) Space Tabulation)",
      "problem": "You are planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected; robbing two adjacent houses will alert the police. Determine the maximum amount of money you can rob tonight without alerting the police.",
      "hints": [
        "dp[i] = max(dp[i-1], dp[i-2] + nums[i]); optimize with two variables rob1 and rob2."
      ],
      "starterCode": "def rob(nums: list[int]) -> int:\n    # TODO: Optimize to O(1) space\n    pass",
      "solution": "def rob(nums: list[int]) -> int:\n    rob1 = 0\n    rob2 = 0\n    for num in nums:\n        new_rob = max(rob2, rob1 + num)\n        rob1 = rob2\n        rob2 = new_rob\n    return rob2"
    },
    "summary": {
      "keyTakeaways": [
        "Memoization is demand-driven and recursive; Tabulation is dependency-driven and iterative.",
        "Space rolling compresses table memory by retaining only immediately required prior states."
      ],
      "nextLessonId": "dsa-dp-fibonacci",
      "nextLessonTitle": "Fibonacci and Climbing Stairs",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "@lru_cache(maxsize=None)",
        "codeSnippet": "@lru_cache(maxsize=None)",
        "explanation": "Python built-in memoizer: caches arguments and return values in an internal C-level hash map."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "a, b = b, a + b",
        "codeSnippet": "a, b = b, a + b",
        "explanation": "Simultaneous tuple assignment rolls memory forward in O(1) space without temporary variables."
      }
    ]
  },
  "dsa-dp-fibonacci": {
    "id": "dsa-dp-fibonacci",
    "moduleId": "dsa-module-11",
    "title": "Fibonacci and Climbing Stairs",
    "subtitle": "Linear 1D Transitions, State Machines, and Matrix Exponentiation in O(log n)",
    "order": 6,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "dp-table",
    "objectives": [
      "Model sequential step transitions using 1D state recurrences.",
      "Solve Climbing Stairs, House Robber, and Decode Ways using the same underlying family.",
      "Execute space optimization reducing 1D arrays to 2 scalar variables in O(1) memory.",
      "Understand Matrix Exponentiation to compute the nth Fibonacci number in O(log n) time."
    ],
    "prerequisites": [
      "Dynamic Programming Fundamentals"
    ],
    "analogy": {
      "title": "Hopping Along Stepping Stones Across a River",
      "text": "To cross a stream, you stand on stepping stone i. You can reach stone i either by making a single 1-step hop from stone i-1, or a long 2-step jump from stone i-2. The total number of distinct routes to stone i is simply the sum of all routes to stone i-1 plus all routes to stone i-2.",
      "metaphor": "Every state is fed by the sum of its immediate predecessor states."
    },
    "problemSolved": {
      "title": "Solving Linear Recurrences in Constant Auxiliary Memory",
      "description": "Many fundamental algorithmic problems follow linear lookback recurrences. Recognizing this family allows solving a wide variety of LeetCode problems in strictly O(n) time and O(1) space.",
      "keyPoints": [
        "Recurrence: dp[i] = dp[i-1] + dp[i-2].",
        "Requires only 2 variables for O(1) memory.",
        "Matrix exponentiation achieves O(log n) time for giant n (n = 10^18)."
      ]
    },
    "intuition": {
      "overview": "To reach step n, your final jump was either from step n-1 (1 step) or step n-2 (2 steps). Thus, total ways to reach step n is ways(n-1) + ways(n-2).",
      "steps": [
        {
          "step": 1,
          "title": "Identify Base Cases",
          "description": "ways(1) = 1, ways(2) = 2."
        },
        {
          "step": 2,
          "title": "Transition",
          "description": "ways(i) = ways(i-1) + ways(i-2)."
        },
        {
          "step": 3,
          "title": "Space Optimization",
          "description": "Maintain prev1 and prev2; advance both in loop."
        }
      ]
    },
    "formalDefinition": {
      "text": "The Fibonacci sequence F_n satisfies F_0 = 0, F_1 = 1, and F_n = F_{n-1} + F_{n-2} for n \\ge 2. In matrix form, [[F_{n+1}, F_n], [F_n, F_{n-1}]] = [[1, 1], [1, 0]]^n.",
      "latex": "\\begin{pmatrix} F_{n+1} & F_n \\\\ F_n & F_{n-1} \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}^n \\implies \\mathcal{O}(\\log n) \\text{ via binary exponentiation}"
    },
    "complexity": {
      "overview": "Standard DP: O(n) time, O(1) space. Matrix Exponentiation: O(log n) time.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Base cases n <= 2."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Linear loop."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Single pass of n iterations."
        }
      ],
      "spaceNote": "Strictly O(1) scalar memory."
    },
    "workedExample": {
      "title": "Climbing Stairs for n = 4",
      "input": "n = 4 steps",
      "steps": [
        {
          "step": 1,
          "action": "Step 1",
          "state": "1 way: [1]",
          "explanation": "Base case."
        },
        {
          "step": 2,
          "action": "Step 2",
          "state": "2 ways: [1, 1], [2]",
          "explanation": "Base case."
        },
        {
          "step": 3,
          "action": "Step 3",
          "state": "ways(2) + ways(1) = 2 + 1 = 3 ways: [1,1,1], [1,2], [2,1]",
          "explanation": "Computed from 1 and 2."
        },
        {
          "step": 4,
          "action": "Step 4",
          "state": "ways(3) + ways(2) = 3 + 2 = 5 ways",
          "explanation": "Computed from 2 and 3."
        }
      ],
      "finalOutput": "5 distinct ways"
    },
    "visualExplanation": {
      "title": "Binary Tree Branching vs Sliding Window Addition",
      "description": "Visualizing exponential decision tree collapsing into a 2-element sliding addition bar.",
      "features": [
        "Sliding 2-element window advances across array",
        "Each new cell is sum of previous two cells"
      ]
    },
    "pseudocode": {
      "title": "Climbing Stairs O(1) Space",
      "code": "function climbStairs(n):\n    if n <= 2: return n\n    first = 1\n    second = 2\n    for i from 3 to n:\n        third = first + second\n        first = second\n        second = third\n    return second"
    },
    "pythonCode": {
      "title": "Python Fibonacci and Matrix Exponentiation",
      "code": "def climb_stairs(n: int) -> int:\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b\n\ndef fib_log_n(n: int) -> int:\n    # O(log n) via 2x2 matrix multiplication\n    def multiply(A, B):\n        return [\n            [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],\n            [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]\n        ]\n\n    def power(M, p):\n        res = [[1, 0], [0, 1]] # Identity matrix\n        base = M\n        while p > 0:\n            if p % 2 == 1:\n                res = multiply(res, base)\n            base = multiply(base, base)\n            p //= 2\n        return res\n\n    if n == 0: return 0\n    T = [[1, 1], [1, 0]]\n    result_matrix = power(T, n - 1)\n    return result_matrix[0][0]",
      "explanation": "Linear O(1) space climbing stairs and O(log n) matrix exponentiation for large Fibonacci numbers."
    },
    "runnableCode": {
      "code": "print(climb_stairs(4)) # 5\nprint(fib_log_n(10))   # 55\nprint(fib_log_n(20))   # 6765",
      "expectedOutput": "5\n55\n6765"
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "a, b = b, a + b",
        "codeSnippet": "a, b = b, a + b",
        "explanation": "Advances sliding window state in a single Python instruction."
      },
      {
        "line": 20,
        "lines": "20",
        "code": "base = multiply(base, base)",
        "codeSnippet": "base = multiply(base, base)",
        "explanation": "Binary exponentiation squares the matrix at each step, halving power p in O(log n) time."
      }
    ],
    "edgeCases": [
      {
        "case": "n = 1",
        "handling": "Guarded by if n <= 2, returns 1 immediately.",
        "example": "n = 1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Allocating an array of size n + 1 when only 2 numbers are ever referenced",
        "solution": "Use two variables a, b to save memory and avoid allocation overhead.",
        "codeExample": "a, b = 1, 2"
      }
    ],
    "applications": [
      {
        "industry": "Game Theory",
        "application": "Tiling problems and step sequence counting",
        "benefit": "Instantly computes path combinations for grid steps."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-fs-1",
        "question": "How does the problem change if you can take 1, 2, or 3 steps at a time (Tribonacci)?",
        "hint": "Look back 3 steps.",
        "answer": "The recurrence becomes dp[i] = dp[i-1] + dp[i-2] + dp[i-3], requiring 3 rolling variables."
      }
    ],
    "quiz": [
      {
        "id": "q-fs-1",
        "question": "What is the time complexity to compute the nth Fibonacci number using Matrix Exponentiation?",
        "options": [
          "O(log n)",
          "O(n)",
          "O(1)",
          "O(n²)"
        ],
        "correctIndex": 0,
        "explanation": "Binary exponentiation doubles the power of the matrix in each step, taking O(log n) 2x2 matrix multiplications."
      }
    ],
    "codingChallenge": {
      "title": "Min Cost Climbing Stairs",
      "problem": "You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can climb either 1 or 2 steps. You can start from index 0 or 1. Return the minimum cost to reach the top of the floor.",
      "hints": [
        "dp[i] = cost[i] + min(dp[i+1], dp[i+2]) iterating backwards."
      ],
      "starterCode": "def min_cost_climbing_stairs(cost: list[int]) -> int:\n    # TODO: Find minimum cost to climb stairs\n    pass",
      "solution": "def min_cost_climbing_stairs(cost: list[int]) -> int:\n    c1, c2 = 0, 0\n    for c in reversed(cost):\n        curr = c + min(c1, c2)\n        c2 = c1\n        c1 = curr\n    return min(c1, c2)"
    },
    "summary": {
      "keyTakeaways": [
        "Climbing stairs maps directly to Fibonacci linear recurrence.",
        "Can be solved in O(n) time with O(1) space or O(log n) time via matrix exponentiation."
      ],
      "nextLessonId": "dsa-dp-coin-change",
      "nextLessonTitle": "Coin Change Problem",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "a, b = b, a + b",
        "codeSnippet": "a, b = b, a + b",
        "explanation": "Advances sliding window state in a single Python instruction."
      },
      {
        "line": 20,
        "lines": "20",
        "code": "base = multiply(base, base)",
        "codeSnippet": "base = multiply(base, base)",
        "explanation": "Binary exponentiation squares the matrix at each step, halving power p in O(log n) time."
      }
    ]
  },
  "dsa-dp-coin-change": {
    "id": "dsa-dp-coin-change",
    "moduleId": "dsa-module-11",
    "title": "Coin Change Problem",
    "subtitle": "Unbounded Knapsack Pattern, Minimum Coins, and Number of Ways",
    "order": 7,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "dp-table",
    "objectives": [
      "Solve Coin Change I (fewest coins to make amount) in O(amount * n) time.",
      "Solve Coin Change II (number of combinations to make amount).",
      "Differentiate combinations vs permutations loop ordering (coins outer vs amount outer).",
      "Initialize DP tables with sentinel infinity vs 0."
    ],
    "prerequisites": [
      "Dynamic Programming Fundamentals",
      "Greedy Strategy and Correctness Intuition"
    ],
    "analogy": {
      "title": "The Unforgiving Vending Machine",
      "text": "A vending machine only accepts strange token denominations: 2-dollar and 5-dollar tokens. To pay an exact 7-dollar bill, you cannot use greedy 5-dollar choice twice. The machine computes the minimum tokens needed by checking every possible coin transition.",
      "metaphor": "dp[amount] explores transitions across all available coin denominations."
    },
    "problemSolved": {
      "title": "Optimal Change Making for Arbitrary Denominations",
      "description": "Greedy change-making fails on non-canonical currency systems. Dynamic programming guarantees the exact minimal coin count in O(amount * len(coins)) time.",
      "keyPoints": [
        "Unbounded knapsack: each coin denomination can be reused infinitely.",
        "Fewest coins: dp[i] = min(dp[i], 1 + dp[i - coin]).",
        "Number of combinations: outer loop over coins prevents duplicate permutations."
      ]
    },
    "intuition": {
      "overview": "Let dp[a] be the minimum coins to make amount a. dp[0] = 0, all others inf. For amount a from 1 to target: for coin in coins: if a >= coin: dp[a] = min(dp[a], 1 + dp[a - coin]).",
      "steps": [
        {
          "step": 1,
          "title": "Initialize Table",
          "description": "dp = [inf] * (amount + 1); dp[0] = 0."
        },
        {
          "step": 2,
          "title": "Iterate Amounts",
          "description": "For a in 1..amount: try each coin c."
        },
        {
          "step": 3,
          "title": "Transition",
          "description": "If a - c >= 0: dp[a] = min(dp[a], 1 + dp[a - c])."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let C = \\{c_1, c_2, ..., c_k\\}. Recurrence for minimum coins: dp[a] = 1 + \\min_{c \\in C, c \\le a} dp[a - c], with base case dp[0] = 0 and dp[a < 0] = \\infty.",
      "latex": "dp[a] = \\begin{cases} 0 & \\text{if } a = 0 \\\\ 1 + \\min_{c \\in C : c \\le a} dp[a - c] & \\text{if } a > 0 \\end{cases}"
    },
    "complexity": {
      "overview": "Time: O(amount * len(coins)). Space: O(amount).",
      "cases": [
        {
          "case": "Best",
          "time": "O(amount * n)",
          "space": "O(amount)",
          "explanation": "Pseudopolynomial in amount."
        },
        {
          "case": "Average",
          "time": "O(amount * n)",
          "space": "O(amount)",
          "explanation": "Fills 1D array of size amount + 1."
        },
        {
          "case": "Worst",
          "time": "O(amount * n)",
          "space": "O(amount)",
          "explanation": "Unbounded coin reuse."
        }
      ],
      "spaceNote": "O(amount) 1D table."
    },
    "workedExample": {
      "title": "Fewest Coins for Amount = 11 with Coins [1, 2, 5]",
      "input": "coins = [1, 2, 5], amount = 11",
      "steps": [
        {
          "step": 1,
          "action": "dp[0] = 0",
          "state": "Base case",
          "explanation": "0 coins for 0 amount."
        },
        {
          "step": 2,
          "action": "Compute dp[1..5]",
          "state": "dp[1]=1, dp[2]=1, dp[3]=2, dp[4]=2, dp[5]=1",
          "explanation": "Uses 5 directly."
        },
        {
          "step": 3,
          "action": "Compute dp[10]",
          "state": "1 + dp[5] = 1 + 1 = 2 (two 5s)",
          "explanation": "5 + 5."
        },
        {
          "step": 4,
          "action": "Compute dp[11]",
          "state": "1 + dp[10] = 1 + 2 = 3 (coins 5, 5, 1)",
          "explanation": "Minimum coins = 3."
        }
      ],
      "finalOutput": "3 coins (5 + 5 + 1)"
    },
    "visualExplanation": {
      "title": "DP Table Unbounded Transitions",
      "description": "Visualizing 1D array where each cell looks back by coin steps to find the smallest previous value.",
      "features": [
        "Lookback arrows to i - 1, i - 2, and i - 5",
        "Cell adopts min value + 1"
      ]
    },
    "pseudocode": {
      "title": "Coin Change Minimum Coins",
      "code": "function coinChange(coins, amount):\n    dp = array of size amount + 1 filled with infinity\n    dp[0] = 0\n    for a from 1 to amount:\n        for c in coins:\n            if a >= c and dp[a - c] != infinity:\n                dp[a] = min(dp[a], 1 + dp[a - c])\n    return dp[amount] if dp[amount] != infinity else -1"
    },
    "pythonCode": {
      "title": "Python Coin Change I and II",
      "code": "def coin_change(coins: list[int], amount: int) -> int:\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    \n    for a in range(1, amount + 1):\n        for c in coins:\n            if a >= c:\n                dp[a] = min(dp[a], 1 + dp[a - c])\n                \n    return dp[amount] if dp[amount] != float('inf') else -1\n\ndef change_combinations(amount: int, coins: list[int]) -> int:\n    # Coin Change II: Number of combinations\n    dp = [0] * (amount + 1)\n    dp[0] = 1\n    \n    # Outer loop over coins prevents duplicate permutations\n    for c in coins:\n        for a in range(c, amount + 1):\n            dp[a] += dp[a - c]\n            \n    return dp[amount]",
      "explanation": "Coin Change I finds min coins; Coin Change II counts distinct combinations."
    },
    "runnableCode": {
      "code": "print(coin_change([1, 2, 5], 11))       # 3\nprint(change_combinations(5, [1, 2, 5])) # 4 combinations: [5], [2,2,1], [2,1,1,1], [1,1,1,1,1]",
      "expectedOutput": "3\n4"
    },
    "lineByLineExplanation": [
      {
        "line": 8,
        "lines": "8",
        "code": "dp[a] = min(dp[a], 1 + dp[a - c])",
        "codeSnippet": "dp[a] = min(dp[a], 1 + dp[a - c])",
        "explanation": "Takes 1 coin of denomination c and looks up best answer for remaining amount a - c."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "for c in coins: for a in range(c, amount + 1):",
        "codeSnippet": "for c in coins: for a in range(c, amount + 1):",
        "explanation": "In Coin Change II, coins MUST be the outer loop to count combinations; amount outer loop would count permutations."
      }
    ],
    "edgeCases": [
      {
        "case": "amount = 0",
        "handling": "Returns 0 coins immediately.",
        "example": "amount = 0 -> 0"
      },
      {
        "case": "Impossible to make amount",
        "handling": "dp[amount] remains float(\"inf\"); returns -1.",
        "example": "coins=[2], amount=3 -> -1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Swapping loop order in Coin Change II (amount outer, coins inner)",
        "solution": "Amounts outer loop counts permutations (where [1, 2] and [2, 1] are counted twice); coins outer loop counts unique combinations.",
        "codeExample": "for c in coins: # for combinations"
      }
    ],
    "applications": [
      {
        "industry": "Finance & Banking",
        "application": "Cash register inventory optimization and ATM dispenser calibration",
        "benefit": "Dispenses minimum physical notes to customers."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-cc-1",
        "question": "Why is Coin Change classified as pseudopolynomial time rather than polynomial time?",
        "hint": "Consider the size of the input in binary.",
        "answer": "The runtime O(amount * n) depends on the numerical value of \"amount\", not its bit-length log2(amount). When measured in input bit size B, amount = 2^B, making it exponential in input length."
      }
    ],
    "quiz": [
      {
        "id": "q-cc-1",
        "question": "In Coin Change II (number of ways), why must the `coins` loop be the OUTER loop?",
        "options": [
          "To enforce non-decreasing order of coins and count combinations instead of permutations",
          "To avoid index errors",
          "Because Python lists iterate faster",
          "To save memory"
        ],
        "correctIndex": 0,
        "explanation": "Looping over coins externally considers each denomination once in order, preventing arrangements like (1, 2) and (2, 1) from being counted as distinct."
      }
    ],
    "codingChallenge": {
      "title": "Perfect Squares",
      "problem": "Given an integer n, return the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) that sum to n.",
      "hints": [
        "Model as Coin Change where available coins are all square numbers <= n."
      ],
      "starterCode": "def num_squares(n: int) -> int:\n    # TODO: Find least number of perfect squares\n    pass",
      "solution": "def num_squares(n: int) -> int:\n    dp = [float('inf')] * (n + 1)\n    dp[0] = 0\n    squares = [i * i for i in range(1, int(n**0.5) + 1)]\n    for i in range(1, n + 1):\n        for sq in squares:\n            if i < sq: break\n            dp[i] = min(dp[i], 1 + dp[i - sq])\n    return dp[n]"
    },
    "summary": {
      "keyTakeaways": [
        "Coin Change I finds minimum coins in O(amount * n).",
        "Coin Change II loops over coins externally to count combinations without permutations."
      ],
      "nextLessonId": "dsa-dp-knapsack-01",
      "nextLessonTitle": "0/1 Knapsack Problem",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 8,
        "lines": "8",
        "code": "dp[a] = min(dp[a], 1 + dp[a - c])",
        "codeSnippet": "dp[a] = min(dp[a], 1 + dp[a - c])",
        "explanation": "Takes 1 coin of denomination c and looks up best answer for remaining amount a - c."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "for c in coins: for a in range(c, amount + 1):",
        "codeSnippet": "for c in coins: for a in range(c, amount + 1):",
        "explanation": "In Coin Change II, coins MUST be the outer loop to count combinations; amount outer loop would count permutations."
      }
    ]
  },
  "dsa-dp-lcs": {
    "id": "dsa-dp-lcs",
    "moduleId": "dsa-module-11",
    "title": "Longest Common Subsequence",
    "subtitle": "2D Matrix Grid Alignment, String Matching, and Sequence Reconstruction",
    "order": 9,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "dp-table",
    "objectives": [
      "Define Longest Common Subsequence (LCS) for two strings of lengths m and n.",
      "Formulate the 2D DP recurrence: match adds 1, mismatch takes max(left, up).",
      "Reconstruct the actual LCS string by backtracking through the DP table.",
      "Optimize auxiliary space from O(m * n) to O(min(m, n)) using two rolling rows."
    ],
    "prerequisites": [
      "Dynamic Programming Fundamentals",
      "Strings and Hashing: String Operations"
    ],
    "analogy": {
      "title": "Comparing DNA Sequences for Genetic Homology",
      "text": "Geneticists compare two DNA strands: \"AGGTAB\" and \"GXTXAYB\". Mutations, insertions, and deletions have occurred over millions of years. To find their closest common evolutionary ancestor, scientists identify the longest sequence of nucleotides that appears in both strands in identical left-to-right order without changing their relative sequence.",
      "metaphor": "LCS matches common characters without requiring contiguity."
    },
    "problemSolved": {
      "title": "Measuring Structural Similarity Between Sequences",
      "description": "Direct string matching only finds exact contiguous matches. LCS finds shared ordering across noisy data, driving `git diff`, file comparison tools, and bioinformatic sequence homology.",
      "keyPoints": [
        "Characters need not be contiguous.",
        "Table size (m+1) x (n+1) filled in O(m * n) time.",
        "Powers the Myers diff algorithm behind Git."
      ]
    },
    "intuition": {
      "overview": "If s1[i-1] == s2[j-1], characters match: dp[i][j] = 1 + dp[i-1][j-1] (diagonal step). If they differ: dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (skip one char from either string).",
      "steps": [
        {
          "step": 1,
          "title": "Match Case",
          "description": "s1[i-1] == s2[j-1] -> dp[i][j] = 1 + dp[i-1][j-1]."
        },
        {
          "step": 2,
          "title": "Mismatch Case",
          "description": "s1[i-1] != s2[j-1] -> dp[i][j] = max(dp[i-1][j], dp[i][j-1])."
        },
        {
          "step": 3,
          "title": "Backtrack Path",
          "description": "Walk backwards from dp[m][n] along matching diagonal steps to extract string."
        }
      ]
    },
    "formalDefinition": {
      "text": "For sequences X = \\langle x_1..x_m \\rangle and Y = \\langle y_1..y_n \\rangle, the LCS length c[i, j] satisfies: c[i, j] = c[i-1, j-1] + 1 if x_i = y_j, else \\max(c[i-1, j], c[i, j-1]).",
      "latex": "dp[i][j] = \\begin{cases} 0 & \\text{if } i=0 \\lor j=0 \\\\ dp[i-1][j-1] + 1 & \\text{if } s_1[i-1] = s_2[j-1] \\\\ \\max(dp[i-1][j], dp[i][j-1]) & \\text{if } s_1[i-1] \\neq s_2[j-1] \\end{cases}"
    },
    "complexity": {
      "overview": "Time: O(m * n). Space: O(m * n) full table, O(min(m, n)) space-optimized.",
      "cases": [
        {
          "case": "Best",
          "time": "O(m * n)",
          "space": "O(min(m, n))",
          "explanation": "Complete matrix filled."
        },
        {
          "case": "Average",
          "time": "O(m * n)",
          "space": "O(min(m, n))",
          "explanation": "Standard grid traversal."
        },
        {
          "case": "Worst",
          "time": "O(m * n)",
          "space": "O(m * n)",
          "explanation": "Full table needed for string reconstruction."
        }
      ],
      "spaceNote": "O(min(m, n)) space when only length is needed."
    },
    "workedExample": {
      "title": "LCS of \"abcde\" and \"ace\"",
      "input": "s1 = \"abcde\", s2 = \"ace\"",
      "steps": [
        {
          "step": 1,
          "action": "Match \"a\"",
          "state": "dp[1][1] = 1 + dp[0][0] = 1",
          "explanation": "First match."
        },
        {
          "step": 2,
          "action": "Mismatch \"b\"",
          "state": "dp[2][1] = max(dp[1][1], dp[2][0]) = 1",
          "explanation": "Carries forward 1."
        },
        {
          "step": 3,
          "action": "Match \"c\"",
          "state": "dp[3][2] = 1 + dp[2][1] = 2",
          "explanation": "Second match."
        },
        {
          "step": 4,
          "action": "Match \"e\"",
          "state": "dp[5][3] = 1 + dp[4][2] = 3",
          "explanation": "Third match."
        }
      ],
      "finalOutput": "Length = 3 (Subsequence: \"ace\")"
    },
    "visualExplanation": {
      "title": "2D Alignment Matrix",
      "description": "Visualizing cells: diagonal green arrows on match, horizontal/vertical grey arrows on max inheritance.",
      "features": [
        "Highlighted path shows backtrack route",
        "Diagonal steps indicate matched letters"
      ]
    },
    "pseudocode": {
      "title": "LCS Algorithm",
      "code": "function longestCommonSubsequence(s1, s2):\n    m = len(s1), n = len(s2)\n    dp = 2D array of (m + 1) x (n + 1) filled with 0\n    for i from 1 to m:\n        for j from 1 to n:\n            if s1[i - 1] == s2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]"
    },
    "pythonCode": {
      "title": "Python LCS Length & Reconstruction",
      "code": "def longest_common_subsequence(s1: str, s2: str) -> int:\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if s1[i - 1] == s2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n\n    return dp[m][n]\n\ndef reconstruct_lcs(s1: str, s2: str) -> str:\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if s1[i - 1] == s2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n\n    # Backtrack to reconstruct string\n    i, j = m, n\n    chars = []\n    while i > 0 and j > 0:\n        if s1[i - 1] == s2[j - 1]:\n            chars.append(s1[i - 1])\n            i -= 1\n            j -= 1\n        elif dp[i - 1][j] >= dp[i][j - 1]:\n            i -= 1\n        else:\n            j -= 1\n    return \"\".join(reversed(chars))",
      "explanation": "Fills 2D table to calculate length, then walks diagonal matches backwards to reconstruct string."
    },
    "runnableCode": {
      "code": "print(longest_common_subsequence(\"abcde\", \"ace\"))\nprint(reconstruct_lcs(\"abcde\", \"ace\"))",
      "expectedOutput": "3\nace"
    },
    "lineByLineExplanation": [
      {
        "line": 8,
        "lines": "8",
        "code": "if s1[i - 1] == s2[j - 1]: dp[i][j] = 1 + dp[i - 1][j - 1]",
        "codeSnippet": "if s1[i - 1] == s2[j - 1]: dp[i][j] = 1 + dp[i - 1][j - 1]",
        "explanation": "Matching character: increases LCS length by 1 from the subproblem excluding both characters."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])",
        "codeSnippet": "else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])",
        "explanation": "Mismatch: inherits best answer from skipping a character from s1 or s2."
      }
    ],
    "edgeCases": [
      {
        "case": "Completely disjoint strings (no common letters)",
        "handling": "Returns 0.",
        "example": "\"abc\", \"xyz\" -> 0"
      },
      {
        "case": "Identical strings",
        "handling": "Returns length of string.",
        "example": "\"hello\", \"hello\" -> 5"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Adding 1 on mismatch: dp[i][j] = 1 + max(...)",
        "solution": "Only matching characters increment the count; mismatches simply inherit the maximum without adding 1.",
        "codeExample": "dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])"
      }
    ],
    "applications": [
      {
        "industry": "Software Tools",
        "application": "Git diff and Unix diff utilities",
        "benefit": "Highlights added and removed lines between code revisions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-lcs-1",
        "question": "How can you find the Shortest Common Supersequence (SCS) of two strings using LCS?",
        "hint": "Length formula.",
        "answer": "Length of SCS = len(s1) + len(s2) - LCS(s1, s2). The shortest supersequence contains all characters of both strings, sharing their common subsequence."
      }
    ],
    "quiz": [
      {
        "id": "q-lcs-1",
        "question": "In the LCS DP recurrence, what transition occurs when s1[i-1] == s2[j-1]?",
        "options": [
          "dp[i][j] = 1 + dp[i-1][j-1]",
          "dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
          "dp[i][j] = dp[i-1][j-1]",
          "dp[i][j] = 1 + dp[i][j-1]"
        ],
        "correctIndex": 0,
        "explanation": "A character match extends the LCS of the prefixes by 1, moving diagonally from (i-1, j-1)."
      }
    ],
    "codingChallenge": {
      "title": "Delete Operation for Two Strings",
      "problem": "Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same, where in each step you can delete one character in either string.",
      "hints": [
        "The characters remaining must form their LCS! Result = len(w1) + len(w2) - 2 * LCS(w1, w2)."
      ],
      "starterCode": "def min_distance(word1: str, word2: str) -> int:\n    # TODO: Calculate minimum deletions\n    pass",
      "solution": "def min_distance(word1: str, word2: str) -> int:\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if word1[i - 1] == word2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    lcs_len = dp[m][n]\n    return (m - lcs_len) + (n - lcs_len)"
    },
    "summary": {
      "keyTakeaways": [
        "LCS aligns sequences in O(m * n) time.",
        "Matches transition diagonally (+1); mismatches take max of adjacent cells."
      ],
      "nextLessonId": "dsa-dp-lis",
      "nextLessonTitle": "Longest Increasing Subsequence",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 8,
        "lines": "8",
        "code": "if s1[i - 1] == s2[j - 1]: dp[i][j] = 1 + dp[i - 1][j - 1]",
        "codeSnippet": "if s1[i - 1] == s2[j - 1]: dp[i][j] = 1 + dp[i - 1][j - 1]",
        "explanation": "Matching character: increases LCS length by 1 from the subproblem excluding both characters."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])",
        "codeSnippet": "else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])",
        "explanation": "Mismatch: inherits best answer from skipping a character from s1 or s2."
      }
    ]
  },
  "dsa-dp-lis": {
    "id": "dsa-dp-lis",
    "moduleId": "dsa-module-11",
    "title": "Longest Increasing Subsequence",
    "subtitle": "Patience Sorting, Binary Search Tails Array, and O(n log n) Optimization",
    "order": 10,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "dp-table",
    "objectives": [
      "Define the Longest Increasing Subsequence (LIS) problem.",
      "Implement the standard quadratic O(n²) dynamic programming solution.",
      "Optimize LIS to O(n log n) using Patience Sorting and binary search (tails array).",
      "Reconstruct the actual subsequence elements in O(n log n) time."
    ],
    "prerequisites": [
      "Dynamic Programming Fundamentals",
      "Arrays and Matrices: Binary Search"
    ],
    "analogy": {
      "title": "Playing the Solitaire Game \"Patience\"",
      "text": "A deck of cards is dealt one by one. You place each card onto the leftmost pile whose top card is >= current card (or start a new pile if it exceeds all top cards). The total number of piles created at the end is mathematically equal to the length of the Longest Increasing Subsequence.",
      "metaphor": "The tails array maintains the smallest tail of all increasing subsequences of length i."
    },
    "problemSolved": {
      "title": "Accelerating Quadratic DP to O(n log n) via Monotonic Tails",
      "description": "The standard DP approach checks all j < i, taking O(n²). The Patience Sorting algorithm maintains an array `tails` where `tails[len]` is the smallest ending value of an increasing subsequence of that length, enabling O(log n) binary search insertion.",
      "keyPoints": [
        "Standard DP: O(n²) time, O(n) space.",
        "Patience Sort + Binary Search: O(n log n) time, O(n) space.",
        "Tails array is strictly increasing, guaranteeing binary search validity."
      ]
    },
    "intuition": {
      "overview": "Iterate through array. For element x: binary search in `tails` to find the first element >= x. If found, replace it with x (greedy: smaller tail makes it easier to extend later). If not found, append x to tails.",
      "steps": [
        {
          "step": 1,
          "title": "Binary Search",
          "description": "idx = bisect_left(tails, num)."
        },
        {
          "step": 2,
          "title": "Greedy Replace",
          "description": "If idx < len(tails): tails[idx] = num (lower tail threshold)."
        },
        {
          "step": 3,
          "title": "Extend Length",
          "description": "If idx == len(tails): tails.append(num) (LIS length grows by 1)."
        }
      ]
    },
    "formalDefinition": {
      "text": "Given sequence A = (a_1, ..., a_n), find max k such that i_1 < i_2 < ... < i_k and a_{i_1} < a_{i_2} < ... < a_{i_k}. Tails invariant: tails[k] = \\min \\{a_j : \\exists \\text{ LIS of length } k+1 \\text{ ending at } a_j\\}.",
      "latex": "\\text{tails}[0] < \\text{tails}[1] < \\dots < \\text{tails}[L-1] \\implies \\text{bisect\\_left in } \\mathcal{O}(\\log n)"
    },
    "complexity": {
      "overview": "Quadratic DP: O(n²) time. Patience Sorting: O(n log n) time, O(n) space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Optimal binary search insertion for every element."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Patience sorting."
        },
        {
          "case": "Worst",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Reverse sorted array still executes binary search per step."
        }
      ],
      "spaceNote": "O(n) auxiliary memory for tails array."
    },
    "workedExample": {
      "title": "Patience Sorting on [10, 9, 2, 5, 3, 7, 101, 18]",
      "input": "nums = [10, 9, 2, 5, 3, 7, 101, 18]",
      "steps": [
        {
          "step": 1,
          "action": "Process 10, 9, 2",
          "state": "tails=[2]",
          "explanation": "9 replaces 10; 2 replaces 9."
        },
        {
          "step": 2,
          "action": "Process 5",
          "state": "tails=[2, 5]",
          "explanation": "5 > 2 -> appends."
        },
        {
          "step": 3,
          "action": "Process 3",
          "state": "tails=[2, 3]",
          "explanation": "3 replaces 5 (better tail)."
        },
        {
          "step": 4,
          "action": "Process 7",
          "state": "tails=[2, 3, 7]",
          "explanation": "7 > 3 -> appends."
        },
        {
          "step": 5,
          "action": "Process 101",
          "state": "tails=[2, 3, 7, 101]",
          "explanation": "101 > 7 -> appends."
        },
        {
          "step": 6,
          "action": "Process 18",
          "state": "tails=[2, 3, 7, 18]",
          "explanation": "18 replaces 101."
        }
      ],
      "finalOutput": "LIS Length = len(tails) = 4 (e.g. [2, 3, 7, 18])"
    },
    "visualExplanation": {
      "title": "Patience Card Piles",
      "description": "Visualizing cards stacking onto piles; number of piles equals LIS length.",
      "features": [
        "Cards replace tops of existing piles",
        "New pile started only when card exceeds all pile tops"
      ]
    },
    "pseudocode": {
      "title": "LIS O(n log n) Algorithm",
      "code": "function lengthOfLIS(nums):\n    tails = []\n    for x in nums:\n        idx = binarySearchFirstGreaterEqual(tails, x)\n        if idx == len(tails):\n            tails.append(x)\n        else:\n            tails[idx] = x\n    return len(tails)"
    },
    "pythonCode": {
      "title": "Python LIS (O(n²) and O(n log n))",
      "code": "import bisect\n\ndef length_of_lis_dp(nums: list[int]) -> int:\n    # O(n^2) DP approach\n    if not nums: return 0\n    dp = [1] * len(nums)\n    for i in range(1, len(nums)):\n        for j in range(i):\n            if nums[j] < nums[i]:\n                dp[i] = max(dp[i], 1 + dp[j])\n    return max(dp)\n\ndef length_of_lis(nums: list[int]) -> int:\n    # O(n log n) Patience sorting\n    tails = []\n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails):\n            tails.append(x)\n        else:\n            tails[idx] = x\n    return len(tails)",
      "explanation": "Demonstrates both traditional O(n²) quadratic DP and optimal O(n log n) binary search."
    },
    "runnableCode": {
      "code": "nums = [10, 9, 2, 5, 3, 7, 101, 18]\nprint(length_of_lis_dp(nums))\nprint(length_of_lis(nums))",
      "expectedOutput": "4\n4"
    },
    "lineByLineExplanation": [
      {
        "line": 17,
        "lines": "17",
        "code": "idx = bisect.bisect_left(tails, x)",
        "codeSnippet": "idx = bisect.bisect_left(tails, x)",
        "explanation": "Finds first element >= x in O(log n) time using binary search on the sorted tails array."
      },
      {
        "line": 21,
        "lines": "21",
        "code": "tails[idx] = x",
        "codeSnippet": "tails[idx] = x",
        "explanation": "Greedily replaces tail with smaller value x, increasing chances of extending sequence in future."
      }
    ],
    "edgeCases": [
      {
        "case": "Strictly decreasing array",
        "handling": "tails replaces index 0 repeatedly; returns length 1.",
        "example": "[5, 4, 3, 2, 1] -> 1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming `tails` array contains the actual LIS subsequence",
        "solution": "tails only tracks smallest endpoints of each length; it does not represent a valid sequential subsequence. To reconstruct the sequence, store parent predecessor pointers.",
        "codeExample": "# tails length is correct, but tails elements are not the subsequence!"
      }
    ],
    "applications": [
      {
        "industry": "Data Compression",
        "application": "Text and image sequence diffing",
        "benefit": "Finds maximum undisturbed subsequence."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-lis-1",
        "question": "How do you modify LIS to find the Longest NON-DECREASING Subsequence (allowing duplicates)?",
        "hint": "Change bisect_left to bisect_right.",
        "answer": "Use bisect_right instead of bisect_left. This replaces elements only when strictly greater, allowing equal elements to extend the array."
      }
    ],
    "quiz": [
      {
        "id": "q-lis-1",
        "question": "What is the time complexity of the optimal binary search algorithm for LIS of size n?",
        "options": [
          "O(n log n)",
          "O(n²)",
          "O(n)",
          "O(log n)"
        ],
        "correctIndex": 0,
        "explanation": "Processing n elements where each triggers an O(log n) binary search in the tails array takes O(n log n) total time."
      }
    ],
    "codingChallenge": {
      "title": "Russian Doll Envelopes",
      "problem": "You have a 2D array of envelopes where envelopes[i] = [wi, hi]. An envelope can fit into another if both width and height are strictly greater. Return the maximum number of envelopes you can Russian doll (nest).",
      "hints": [
        "Sort width ascending; for identical widths, sort height DESCENDING. Then run LIS on heights in O(n log n)."
      ],
      "starterCode": "def max_envelopes(envelopes: list[list[int]]) -> int:\n    # TODO: Find max nested envelopes\n    pass",
      "solution": "import bisect\n\ndef max_envelopes(envelopes: list[list[int]]) -> int:\n    # Sort width ascending; height descending for ties to avoid same-width nesting\n    envelopes.sort(key=lambda x: (x[0], -x[1]))\n    tails = []\n    for _, h in envelopes:\n        idx = bisect.bisect_left(tails, h)\n        if idx == len(tails):\n            tails.append(h)\n        else:\n            tails[idx] = h\n    return len(tails)"
    },
    "summary": {
      "keyTakeaways": [
        "LIS is solved in O(n²) using DP, and optimized to O(n log n) using Patience Sorting + Binary Search.",
        "The tails array maintains minimum endpoints for each length."
      ],
      "nextLessonId": "dsa-dp-edit-distance",
      "nextLessonTitle": "Edit Distance (Levenshtein Distance)",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 17,
        "lines": "17",
        "code": "idx = bisect.bisect_left(tails, x)",
        "codeSnippet": "idx = bisect.bisect_left(tails, x)",
        "explanation": "Finds first element >= x in O(log n) time using binary search on the sorted tails array."
      },
      {
        "line": 21,
        "lines": "21",
        "code": "tails[idx] = x",
        "codeSnippet": "tails[idx] = x",
        "explanation": "Greedily replaces tail with smaller value x, increasing chances of extending sequence in future."
      }
    ]
  },
  "dsa-dp-edit-distance": {
    "id": "dsa-dp-edit-distance",
    "moduleId": "dsa-module-11",
    "title": "Edit Distance (Levenshtein Distance)",
    "subtitle": "Insert, Delete, and Replace Operations in 2D String Alignment",
    "order": 11,
    "readTimeMinutes": 24,
    "difficulty": "Advanced",
    "visualizerType": "dp-table",
    "objectives": [
      "Define Levenshtein Edit Distance: minimum operations (insert, delete, replace) to transform word1 into word2.",
      "Formulate the 3-choice DP recurrence in an (m + 1) x (n + 1) matrix.",
      "Identify base cases: transforming from/to empty string requires i or j insertions/deletions.",
      "Trace edit scripts (sequence of mutations) by backtracking through the matrix."
    ],
    "prerequisites": [
      "Longest Common Subsequence"
    ],
    "analogy": {
      "title": "Spell-Check Auto-Correction",
      "text": "You type \"hourse\" into a search bar. The search engine thinks: you can change it to \"horse\" by deleting 'u' (1 edit), or change it to \"house\" by replacing 'r' with 'u' and deleting 'r' (2 edits). Because 1 edit is closer than 2 edits, it suggests \"Did you mean: horse?\".",
      "metaphor": "Edit distance quantifies how many atomic edits separate two words."
    },
    "problemSolved": {
      "title": "Fuzzy String Matching and Spell Correction",
      "description": "Exact string equality is binary (matches or fails). Edit distance provides a continuous metric of similarity, powering autocorrect, speech-to-text fuzzy matching, and plagiarism detection.",
      "keyPoints": [
        "3 operations: Insert, Delete, Replace.",
        "Computes distance matrix in O(m * n) time and O(m * n) space.",
        "Can be space-optimized to O(min(m, n)) using rolling arrays."
      ]
    },
    "intuition": {
      "overview": "If word1[i-1] == word2[j-1], characters match: cost is 0 -> dp[i][j] = dp[i-1][j-1]. Otherwise, choose min of: 1 + dp[i][j-1] (Insert), 1 + dp[i-1][j] (Delete), 1 + dp[i-1][j-1] (Replace).",
      "steps": [
        {
          "step": 1,
          "title": "Base Cases",
          "description": "dp[i][0] = i (i deletes), dp[0][j] = j (j inserts)."
        },
        {
          "step": 2,
          "title": "Evaluate 3 Choices",
          "description": "If mismatch: dp[i][j] = 1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])."
        },
        {
          "step": 3,
          "title": "Result",
          "description": "dp[m][n] holds minimal edit operations."
        }
      ]
    },
    "formalDefinition": {
      "text": "The Levenshtein distance \\text{lev}(a, b) between strings a and b of lengths |a| and |b| satisfies: \\text{lev}(i, j) = \\min\\big(\\text{lev}(i-1, j) + 1, \\, \\text{lev}(i, j-1) + 1, \\, \\text{lev}(i-1, j-1) + 1_{a_i \\neq b_j}\\big).",
      "latex": "dp[i][j] = \\begin{cases} \\max(i, j) & \\text{if } \\min(i, j) = 0 \\\\ dp[i-1][j-1] & \\text{if } w_1[i-1] = w_2[j-1] \\\\ 1 + \\min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) & \\text{otherwise} \\end{cases}"
    },
    "complexity": {
      "overview": "Time: O(m * n). Space: O(m * n) full table, O(n) space-optimized.",
      "cases": [
        {
          "case": "Best",
          "time": "O(m * n)",
          "space": "O(n)",
          "explanation": "Complete matrix evaluated."
        },
        {
          "case": "Average",
          "time": "O(m * n)",
          "space": "O(n)",
          "explanation": "Standard grid filling."
        },
        {
          "case": "Worst",
          "time": "O(m * n)",
          "space": "O(m * n)",
          "explanation": "When full edit script reconstruction is required."
        }
      ],
      "spaceNote": "Can be computed in 2 rows O(n) memory."
    },
    "workedExample": {
      "title": "Transform \"horse\" into \"ros\"",
      "input": "word1 = \"horse\", word2 = \"ros\"",
      "steps": [
        {
          "step": 1,
          "action": "Replace \"h\" with \"r\"",
          "state": "\"horse\" -> \"rorse\"",
          "explanation": "1 edit."
        },
        {
          "step": 2,
          "action": "Remove \"r\"",
          "state": "\"rorse\" -> \"rose\"",
          "explanation": "2 edits."
        },
        {
          "step": 3,
          "action": "Remove \"e\"",
          "state": "\"rose\" -> \"ros\"",
          "explanation": "3 edits."
        }
      ],
      "finalOutput": "Minimum Edit Distance = 3"
    },
    "visualExplanation": {
      "title": "3-Directional Cell Transition",
      "description": "Visualizing cell (i, j) pulling values from Top (Delete), Left (Insert), and Diagonal (Replace).",
      "features": [
        "Top arrow represents Deletion",
        "Left arrow represents Insertion",
        "Diagonal arrow represents Match or Substitution"
      ]
    },
    "pseudocode": {
      "title": "Edit Distance Algorithm",
      "code": "function minDistance(word1, word2):\n    m = len(word1), n = len(word2)\n    dp = matrix of (m + 1) x (n + 1)\n    for i in 0..m: dp[i][0] = i\n    for j in 0..n: dp[0][j] = j\n    for i from 1 to m:\n        for j from 1 to n:\n            if word1[i - 1] == word2[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1]\n            else:\n                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])\n    return dp[m][n]"
    },
    "pythonCode": {
      "title": "Python Edit Distance Implementation",
      "code": "def min_edit_distance(word1: str, word2: str) -> int:\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n\n    # Base cases: converting to/from empty string\n    for i in range(m + 1):\n        dp[i][0] = i\n    for j in range(n + 1):\n        dp[0][j] = j\n\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if word1[i - 1] == word2[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1] # Free match\n            else:\n                dp[i][j] = 1 + min(\n                    dp[i - 1][j],    # Deletion\n                    dp[i][j - 1],    # Insertion\n                    dp[i - 1][j - 1] # Replacement\n                )\n\n    return dp[m][n]",
      "explanation": "Fills (m+1) x (n+1) table checking Insert, Delete, and Replace choices."
    },
    "runnableCode": {
      "code": "print(min_edit_distance(\"horse\", \"ros\"))      # 3\nprint(min_edit_distance(\"intention\", \"execution\")) # 5",
      "expectedOutput": "3\n5"
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "dp[i][0] = i",
        "codeSnippet": "dp[i][0] = i",
        "explanation": "Deleting i characters from word1 to reach empty string word2."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "if word1[i - 1] == word2[j - 1]: dp[i][j] = dp[i - 1][j - 1]",
        "codeSnippet": "if word1[i - 1] == word2[j - 1]: dp[i][j] = dp[i - 1][j - 1]",
        "explanation": "Matching character requires 0 edits, inheriting exact diagonal value."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "dp[i][j] = 1 + min(...)",
        "codeSnippet": "dp[i][j] = 1 + min(...)",
        "explanation": "Takes 1 edit plus optimal choice among Delete (top), Insert (left), and Replace (diagonal)."
      }
    ],
    "edgeCases": [
      {
        "case": "One string is empty",
        "handling": "Base case returns length of non-empty string.",
        "example": "\"\" and \"hello\" -> 5"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Adding 1 even when characters match",
        "solution": "When word1[i-1] == word2[j-1], the edit cost is ZERO: dp[i][j] = dp[i-1][j-1].",
        "codeExample": "if match: dp[i][j] = dp[i-1][j-1] # NOT + 1"
      }
    ],
    "applications": [
      {
        "industry": "Natural Language Processing",
        "application": "Autocorrect suggestion and fuzzy entity matching",
        "benefit": "Ranks candidate dictionary corrections by minimal edit distance."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-ed-1",
        "question": "How can Edit Distance be optimized to O(n) memory?",
        "hint": "Look at previous row dependencies.",
        "answer": "Row i only depends on row i-1; we can maintain two rows `prev` and `curr`, swapping them after each row iteration to achieve O(min(m, n)) space."
      }
    ],
    "quiz": [
      {
        "id": "q-ed-1",
        "question": "Which operation in the Edit Distance recurrence corresponds to moving from cell (i-1, j)?",
        "options": [
          "Delete character from word1",
          "Insert character into word1",
          "Replace character",
          "No-op"
        ],
        "correctIndex": 0,
        "explanation": "Cell (i-1, j) represents having already matched all of word2[0..j-1] using one fewer character from word1, which corresponds to deleting word1[i-1]."
      }
    ],
    "codingChallenge": {
      "title": "One Edit Distance",
      "problem": "Given two strings s and t, return True if they are both one edit distance apart, False otherwise.",
      "hints": [
        "Compare lengths; if abs(len(s) - len(t)) > 1, return False immediately."
      ],
      "starterCode": "def is_one_edit_distance(s: str, t: str) -> bool:\n    # TODO: Check if exactly one edit apart\n    pass",
      "solution": "def is_one_edit_distance(s: str, t: str) -> bool:\n    m, n = len(s), len(t)\n    if abs(m - n) > 1: return False\n    if m > n: return is_one_edit_distance(t, s) # Ensure s is shorter\n    for i in range(m):\n        if s[i] != t[i]:\n            if m == n:\n                return s[i+1:] == t[i+1:] # Replace\n            else:\n                return s[i:] == t[i+1:]   # Insert\n    return m + 1 == n"
    },
    "summary": {
      "keyTakeaways": [
        "Edit Distance models Insert, Delete, and Replace in O(m * n) time.",
        "Matches cost 0 (diagonal); mismatches cost 1 + min(three neighbors)."
      ],
      "nextLessonId": "dsa-dp-grid",
      "nextLessonTitle": "Grid DP Problems",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "dp[i][0] = i",
        "codeSnippet": "dp[i][0] = i",
        "explanation": "Deleting i characters from word1 to reach empty string word2."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "if word1[i - 1] == word2[j - 1]: dp[i][j] = dp[i - 1][j - 1]",
        "codeSnippet": "if word1[i - 1] == word2[j - 1]: dp[i][j] = dp[i - 1][j - 1]",
        "explanation": "Matching character requires 0 edits, inheriting exact diagonal value."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "dp[i][j] = 1 + min(...)",
        "codeSnippet": "dp[i][j] = 1 + min(...)",
        "explanation": "Takes 1 edit plus optimal choice among Delete (top), Insert (left), and Replace (diagonal)."
      }
    ]
  },
  "dsa-dp-grid": {
    "id": "dsa-dp-grid",
    "moduleId": "dsa-module-11",
    "title": "Grid DP Problems",
    "subtitle": "Unique Paths, Minimum Path Sum, and Directional Invariants in 2D Lattices",
    "order": 12,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "dp-table",
    "objectives": [
      "Model directional movement in 2D grids (moving only right and down).",
      "Solve Unique Paths (combinatorial counting) and Minimum Path Sum (cost minimization).",
      "Incorporate obstacles into grid states (grid[r][c] == 1 blocks path).",
      "Compress 2D grid DP tables from O(m * n) to 1D vector O(n) space."
    ],
    "prerequisites": [
      "Dynamic Programming Fundamentals"
    ],
    "analogy": {
      "title": "The Downtown Manhattan Taxi Routing",
      "text": "A taxi starts at the corner of 1st Street and 1st Avenue and must drive to 10th Street and 10th Avenue. Because all streets are one-way heading East or South, the taxi can only drive Right or Down. To find the easiest route, the driver tallies traffic delays at each intersection from the previous North and West intersections.",
      "metaphor": "Any cell (r, c) can only be entered from cell (r-1, c) above or cell (r, c-1) to the left."
    },
    "problemSolved": {
      "title": "Optimal Routing and Path Counting on 2D Grids",
      "description": "Pathfinding on unrestricted grids requires BFS/Dijkstra. On directional DAG grids (e.g. only Right and Down), DP solves counting and cost minimization in simple O(m * n) time with zero priority queue overhead.",
      "keyPoints": [
        "Movement strictly bounded: only Right and Down.",
        "Counting: dp[r][c] = dp[r-1][c] + dp[r][c-1].",
        "Min cost: dp[r][c] = cost[r][c] + min(dp[r-1][c], dp[r][c-1])."
      ]
    },
    "intuition": {
      "overview": "Because movement is restricted to down and right, cell (r, c) depends strictly on its top neighbor (r-1, c) and left neighbor (r, c-1). Base cases fill the first row and first column with 1s.",
      "steps": [
        {
          "step": 1,
          "title": "First Row & Column",
          "description": "dp[0][c] = 1, dp[r][0] = 1 (only 1 straight path)."
        },
        {
          "step": 2,
          "title": "Fill Grid",
          "description": "For r in 1..m-1: for c in 1..n-1: dp[r][c] = dp[r-1][c] + dp[r][c-1]."
        },
        {
          "step": 3,
          "title": "Target Cell",
          "description": "dp[m-1][n-1] contains total unique paths."
        }
      ]
    },
    "formalDefinition": {
      "text": "On an m x n grid with allowed moves \\{(1, 0), (0, 1)\\}, total paths from (0, 0) to (m-1, n-1) equals the binomial coefficient \\binom{(m-1) + (n-1)}{m-1}. In DP: dp[r][c] = dp[r-1][c] + dp[r][c-1].",
      "latex": "\\text{Paths}(m, n) = \\binom{m + n - 2}{m - 1} = \\frac{(m + n - 2)!}{(m - 1)! (n - 1)!}"
    },
    "complexity": {
      "overview": "Time: O(m * n). Space: O(n) rolling 1D array.",
      "cases": [
        {
          "case": "Best",
          "time": "O(m * n)",
          "space": "O(n)",
          "explanation": "Optimal 1D space rolling."
        },
        {
          "case": "Average",
          "time": "O(m * n)",
          "space": "O(n)",
          "explanation": "Single pass over grid."
        },
        {
          "case": "Worst",
          "time": "O(m * n)",
          "space": "O(m * n)",
          "explanation": "Uncompressed full 2D table."
        }
      ],
      "spaceNote": "O(n) space using a single rolling row."
    },
    "workedExample": {
      "title": "Unique Paths on 3 x 3 Grid",
      "input": "m = 3, n = 3",
      "steps": [
        {
          "step": 1,
          "action": "Row 0",
          "state": "[1, 1, 1]",
          "explanation": "Only 1 way to travel straight East."
        },
        {
          "step": 2,
          "action": "Row 1",
          "state": "[1, 2, 3]",
          "explanation": "dp[1][1] = 1+1 = 2; dp[1][2] = 2+1 = 3."
        },
        {
          "step": 3,
          "action": "Row 2",
          "state": "[1, 3, 6]",
          "explanation": "dp[2][1] = 1+2 = 3; dp[2][2] = 3+3 = 6."
        }
      ],
      "finalOutput": "Total Unique Paths = 6"
    },
    "visualExplanation": {
      "title": "Pascal's Triangle in a Grid",
      "description": "Visualizing numbers accumulating rightward and downward identically to Pascal's triangle.",
      "features": [
        "Cell (r, c) equals sum of top and left neighbors",
        "Obstacle cells set value to 0"
      ]
    },
    "pseudocode": {
      "title": "Unique Paths Algorithm",
      "code": "function uniquePaths(m, n):\n    dp = array of size n with 1\n    for r from 1 to m - 1:\n        for c from 1 to n - 1:\n            dp[c] = dp[c] + dp[c - 1]\n    return dp[n - 1]"
    },
    "pythonCode": {
      "title": "Python Unique Paths and Min Path Sum",
      "code": "def unique_paths(m: int, n: int) -> int:\n    # Space-optimized O(n) tabulation\n    row = [1] * n\n    for _ in range(1, m):\n        for c in range(1, n):\n            row[c] += row[c - 1]\n    return row[-1]\n\ndef min_path_sum(grid: list[list[int]]) -> int:\n    m, n = len(grid), len(grid[0])\n    dp = [float('inf')] * (n + 1)\n    dp[1] = 0 # Base seed\n    \n    for r in range(m):\n        for c in range(n):\n            dp[c + 1] = grid[r][c] + min(dp[c + 1], dp[c])\n            \n    return dp[n]",
      "explanation": "Space-optimized 1D row rolling for path counting and minimum cost path."
    },
    "runnableCode": {
      "code": "print(unique_paths(3, 7)) # 28\ngrid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]\nprint(min_path_sum(grid)) # 1 -> 3 -> 1 -> 1 -> 1 = 7",
      "expectedOutput": "28\n7"
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "row[c] += row[c - 1]",
        "codeSnippet": "row[c] += row[c - 1]",
        "explanation": "row[c] holds the top neighbor value from the previous row; row[c-1] holds the left neighbor value from current row. Summing updates cell in O(1) space."
      }
    ],
    "edgeCases": [
      {
        "case": "1 x n or m x 1 grid",
        "handling": "Returns 1 (only 1 direct straight path exists).",
        "example": "m=1, n=5 -> 1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to set obstacle cell DP value to 0 in Unique Paths II",
        "solution": "If grid[r][c] == 1 (obstacle), dp[r][c] must be set strictly to 0 because no path can traverse through an obstacle.",
        "codeExample": "if grid[r][c] == 1: dp[r][c] = 0"
      }
    ],
    "applications": [
      {
        "industry": "Semiconductor Design",
        "application": "VLSI chip wire routing on silicon grids",
        "benefit": "Computes optimal signal trace layouts minimizing wire length."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-gp-1",
        "question": "How can Unique Paths on an m x n grid with NO obstacles be solved in O(m) time and O(1) space?",
        "hint": "Combinatorics.",
        "answer": "Using the combination formula C((m-1) + (n-1), m-1) = (m+n-2)! / ((m-1)! * (n-1)!) computed via simple multiplicative loop."
      }
    ],
    "quiz": [
      {
        "id": "q-gp-1",
        "question": "In a grid where you can only move Right and Down, what earlier states does cell (r, c) depend on?",
        "options": [
          "(r-1, c) and (r, c-1)",
          "(r+1, c) and (r, c+1)",
          "(r-1, c-1)",
          "(r-1, c+1)"
        ],
        "correctIndex": 0,
        "explanation": "Entering (r, c) by moving down comes from (r-1, c); entering by moving right comes from (r, c-1)."
      }
    ],
    "codingChallenge": {
      "title": "Unique Paths II (With Obstacles)",
      "problem": "You are given an m x n integer array obstacleGrid. Return the number of possible unique paths from top-left to bottom-right, where 1 marks an obstacle and 0 marks an empty space.",
      "hints": [
        "If obstacleGrid[r][c] == 1, dp[c] = 0. Else dp[c] += dp[c-1]."
      ],
      "starterCode": "def unique_paths_with_obstacles(obstacleGrid: list[list[int]]) -> int:\n    # TODO: Calculate paths with obstacles\n    pass",
      "solution": "def unique_paths_with_obstacles(obstacleGrid: list[list[int]]) -> int:\n    m, n = len(obstacleGrid), len(obstacleGrid[0])\n    dp = [0] * n\n    dp[0] = 1 if obstacleGrid[0][0] == 0 else 0\n    for r in range(m):\n        for c in range(n):\n            if obstacleGrid[r][c] == 1:\n                dp[c] = 0\n            elif c > 0:\n                dp[c] += dp[c - 1]\n    return dp[-1]"
    },
    "summary": {
      "keyTakeaways": [
        "Grid DP aggregates from top and left neighbors.",
        "Can be space-optimized to a single 1D vector of length n."
      ],
      "nextLessonId": "dsa-dp-partition",
      "nextLessonTitle": "Partition and Subset Sum Problems",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "row[c] += row[c - 1]",
        "codeSnippet": "row[c] += row[c - 1]",
        "explanation": "row[c] holds the top neighbor value from the previous row; row[c-1] holds the left neighbor value from current row. Summing updates cell in O(1) space."
      }
    ]
  },
  "dsa-dp-partition": {
    "id": "dsa-dp-partition",
    "moduleId": "dsa-module-11",
    "title": "Partition and Subset Sum Problems",
    "subtitle": "Equi-Partition, 0/1 Knapsack Boolean Reductions, and Bitset Acceleration",
    "order": 13,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "dp-table",
    "objectives": [
      "Model Partition Equal Subset Sum as a 0/1 Knapsack boolean subset sum problem.",
      "Formulate target sum = total_sum / 2 invariant.",
      "Implement space-optimized 1D boolean array iterating backwards from target down to num.",
      "Explore bitset manipulation (bit shift `dp |= dp << num`) for 64x hardware speedup."
    ],
    "prerequisites": [
      "0/1 Knapsack Problem",
      "Dynamic Programming Fundamentals"
    ],
    "analogy": {
      "title": "Balancing a Cargo Plane Left and Right Cargo Holds",
      "text": "A cargo plane has two side compartments. A team of movers has boxes weighing various amounts totaling 100 kg. Can they divide the boxes so exactly 50 kg is loaded on the left side and 50 kg on the right side? If so, the flight is balanced; if no combination sums to 50 kg, the plane cannot fly.",
      "metaphor": "Partitioning into two equal halves is equivalent to finding a subset that sums to total / 2."
    },
    "problemSolved": {
      "title": "Exact Subsum Partitioning in Pseudopolynomial Time",
      "description": "The Subset Sum problem is NP-complete. Using dynamic programming, we solve it in pseudopolynomial O(n * target) time, enabling practical exact partition validation.",
      "keyPoints": [
        "If total_sum is odd, equal partition is mathematically impossible (return False).",
        "Target = total_sum // 2.",
        "Reverse 1D loop prevents reusing the same element multiple times."
      ]
    },
    "intuition": {
      "overview": "Check if total sum is even. Target is total // 2. Maintain boolean array `dp` of size target + 1 with dp[0] = True. For each num in nums, loop j from target DOWN to num: dp[j] = dp[j] or dp[j - num].",
      "steps": [
        {
          "step": 1,
          "title": "Parity Check",
          "description": "If sum(nums) % 2 != 0: return False."
        },
        {
          "step": 2,
          "title": "Backward Loop",
          "description": "For num in nums: for j in target..num: dp[j] = dp[j] or dp[j - num]."
        },
        {
          "step": 3,
          "title": "Extract Answer",
          "description": "Return dp[target]."
        }
      ]
    },
    "formalDefinition": {
      "text": "Partition Equal Subset Sum asks if \\exists S' \\subseteq S such that \\sum_{x \\in S'} x = \\frac{1}{2} \\sum_{x \\in S} x. Recurrence: dp[i, j] = dp[i-1, j] \\lor dp[i-1, j - a_i].",
      "latex": "dp[j] \\leftarrow dp[j] \\lor dp[j - a_i] \\quad \\text{for } j = \\text{target} \\dots a_i"
    },
    "complexity": {
      "overview": "Time: O(n * target). Space: O(target) 1D boolean array.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Total sum is odd (returns False instantly)."
        },
        {
          "case": "Average",
          "time": "O(n * target)",
          "space": "O(target)",
          "explanation": "Standard pseudopolynomial fill."
        },
        {
          "case": "Worst",
          "time": "O(n * target)",
          "space": "O(target)",
          "explanation": "All elements evaluated."
        }
      ],
      "spaceNote": "O(target) memory."
    },
    "workedExample": {
      "title": "Partition [1, 5, 11, 5]",
      "input": "nums = [1, 5, 11, 5], total = 22 -> target = 11",
      "steps": [
        {
          "step": 1,
          "action": "Initial",
          "state": "dp = {0: True}",
          "explanation": "Sum 0 is always achievable."
        },
        {
          "step": 2,
          "action": "Process 1",
          "state": "dp achieves {0, 1}",
          "explanation": "Sum 1 achievable."
        },
        {
          "step": 3,
          "action": "Process 5",
          "state": "dp achieves {0, 1, 5, 6}",
          "explanation": "Sums 5, 6 achievable."
        },
        {
          "step": 4,
          "action": "Process 11",
          "state": "dp achieves {0, 1, 5, 6, 11, 12, ...}",
          "explanation": "Target 11 achieved! Return True."
        }
      ],
      "finalOutput": "True ([11] and [1, 5, 5])"
    },
    "visualExplanation": {
      "title": "1D Boolean Sieve Propagation",
      "description": "Visualizing boolean True flags propagating rightward along array slots like dominoes.",
      "features": [
        "Backward loop prevents duplicate usage",
        "Flag hitting target triggers True"
      ]
    },
    "pseudocode": {
      "title": "Partition Equal Subset Sum",
      "code": "function canPartition(nums):\n    total = sum(nums)\n    if total % 2 != 0: return False\n    target = total // 2\n    dp = boolean array of size target + 1 with False\n    dp[0] = True\n    for num in nums:\n        for j from target down to num:\n            dp[j] = dp[j] or dp[j - num]\n    return dp[target]"
    },
    "pythonCode": {
      "title": "Python Partition Equal Subset Sum (1D DP and Bitset)",
      "code": "def can_partition(nums: list[int]) -> bool:\n    total = sum(nums)\n    if total % 2 != 0:\n        return False\n    target = total // 2\n\n    dp = [False] * (target + 1)\n    dp[0] = True\n\n    for num in nums:\n        # Loop backwards to prevent using same number twice\n        for j in range(target, num - 1, -1):\n            dp[j] = dp[j] or dp[j - num]\n\n    return dp[target]\n\ndef can_partition_bitset(nums: list[int]) -> bool:\n    total = sum(nums)\n    if total % 2 != 0: return False\n    target = total // 2\n    # Bitset optimization: bit i is 1 if sum i is achievable\n    bits = 1 # 2^0 = 1 (sum 0 achievable)\n    for num in nums:\n        bits |= bits << num\n    return bool((bits >> target) & 1)",
      "explanation": "Demonstrates 1D backward loop DP and ultra-fast bitwise integer shifting."
    },
    "runnableCode": {
      "code": "print(can_partition([1, 5, 11, 5]))        # True (1+5+5 = 11)\nprint(can_partition([1, 2, 3, 5]))           # False (sum 11 is odd)\nprint(can_partition_bitset([1, 5, 11, 5]))   # True",
      "expectedOutput": "True\nFalse\nTrue"
    },
    "lineByLineExplanation": [
      {
        "line": 12,
        "lines": "12",
        "code": "for j in range(target, num - 1, -1):",
        "codeSnippet": "for j in range(target, num - 1, -1):",
        "explanation": "Crucial: looping BACKWARDS ensures dp[j - num] represents state from previous items, preventing reuse of current num."
      },
      {
        "line": 24,
        "lines": "24",
        "code": "bits |= bits << num",
        "codeSnippet": "bits |= bits << num",
        "explanation": "Bitset trick: bitwise left-shift shifts all achievable sums by num in a single hardware CPU instruction."
      }
    ],
    "edgeCases": [
      {
        "case": "Single element array",
        "handling": "sum is odd or target > 0, returns False.",
        "example": "[42] -> False"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Iterating forward: for j in range(num, target + 1)",
        "solution": "Forward iteration solves Unbounded Knapsack (reusing same element infinite times); 0/1 Knapsack requires backward iteration.",
        "codeExample": "for j in range(target, num - 1, -1): # BACKWARDS"
      }
    ],
    "applications": [
      {
        "industry": "Cryptography",
        "application": "Merkle-Hellman knapsack cryptosystems",
        "benefit": "Relies on the computational hardness of the subset sum problem."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-pss-1",
        "question": "How can you find the minimum difference between two partitioned subsets (Partition Array into Two Arrays to Minimize Sum Difference)?",
        "hint": "Find the largest sum <= total // 2.",
        "answer": "Find largest j <= total // 2 where dp[j] is True. The minimum difference is total - 2 * j."
      }
    ],
    "quiz": [
      {
        "id": "q-pss-1",
        "question": "Why must the inner target loop iterate BACKWARDS in 0/1 Subset Sum DP?",
        "options": [
          "To prevent using the same array element multiple times in the same sum",
          "Because Python reversed() runs faster",
          "To avoid index out of bounds",
          "To sort the array descending"
        ],
        "correctIndex": 0,
        "explanation": "Iterating backwards ensures that when computing dp[j] = dp[j - num], dp[j - num] has not yet been updated with the current element."
      }
    ],
    "codingChallenge": {
      "title": "Target Sum (+ and - assignments)",
      "problem": "You are given an integer array nums and an integer target. Build an expression by adding \"+\" or \"-\" before each integer and evaluate. Return the number of different expressions that evaluate to target.",
      "hints": [
        "P - N = target and P + N = sum => 2P = target + sum => Subset Sum for P = (target + sum) / 2."
      ],
      "starterCode": "def find_target_sum_ways(nums: list[int], target: int) -> int:\n    # TODO: Count expressions matching target\n    pass",
      "solution": "def find_target_sum_ways(nums: list[int], target: int) -> int:\n    total = sum(nums)\n    if (total + target) % 2 != 0 or abs(target) > total:\n        return 0\n    s1 = (total + target) // 2\n    dp = [0] * (s1 + 1)\n    dp[0] = 1\n    for num in nums:\n        for j in range(s1, num - 1, -1):\n            dp[j] += dp[j - num]\n    return dp[s1]"
    },
    "summary": {
      "keyTakeaways": [
        "Partitioning reduces to 0/1 subset sum with target = total // 2.",
        "Looping backwards maintains 0/1 single-use invariant in 1D array."
      ],
      "nextLessonId": "dsa-dp-bitmask",
      "nextLessonTitle": "Bitmask DP Introduction",
      "nextLessonModuleId": "dsa-module-11"
    },
    "lineByLine": [
      {
        "line": 12,
        "lines": "12",
        "code": "for j in range(target, num - 1, -1):",
        "codeSnippet": "for j in range(target, num - 1, -1):",
        "explanation": "Crucial: looping BACKWARDS ensures dp[j - num] represents state from previous items, preventing reuse of current num."
      },
      {
        "line": 24,
        "lines": "24",
        "code": "bits |= bits << num",
        "codeSnippet": "bits |= bits << num",
        "explanation": "Bitset trick: bitwise left-shift shifts all achievable sums by num in a single hardware CPU instruction."
      }
    ]
  },
  "dsa-dp-bitmask": {
    "id": "dsa-dp-bitmask",
    "moduleId": "dsa-module-11",
    "title": "Bitmask DP Introduction",
    "subtitle": "Subset State Compression, Traveling Salesperson (TSP), and Hamiltonian Paths in O(2ⁿ n²)",
    "order": 14,
    "readTimeMinutes": 24,
    "difficulty": "Advanced",
    "visualizerType": "dp-table",
    "objectives": [
      "Represent subsets of up to 20-30 items as integer bitmasks.",
      "Execute bitwise operations: test bit (mask & (1 << i)), set bit (mask | (1 << i)).",
      "Solve the Traveling Salesperson Problem (TSP) in O(2ⁿ n²) time instead of naive O(n!).",
      "Understand when bitmask DP is applicable (typically n <= 20)."
    ],
    "prerequisites": [
      "Permutations and Combinations",
      "Dynamic Programming Fundamentals"
    ],
    "analogy": {
      "title": "The Salesperson Checklist as Light Switches",
      "text": "A salesperson traveling across 10 cities carries a panel with 10 toggle light switches. When City 3 is visited, switch 3 is flipped ON (1). The exact collection of visited cities is represented by a single compact binary integer: 0000001000.",
      "metaphor": "An n-bit integer compactly represents which subset of n items has been processed."
    },
    "problemSolved": {
      "title": "Beating Factorial Complexity in Permutation Search Spaces",
      "description": "Permutation problems like Traveling Salesperson take O(n!) brute-force time (16! \\approx 2 \\times 10^{13} operations). Bitmask DP stores states as (visited_mask, last_node), solving it in O(2^n n²) time (for n=16, 2^{16} \\times 256 \\approx 1.6 \\times 10^7, solvable in 0.1s).",
      "keyPoints": [
        "Compresses subset of visited elements into an integer mask.",
        "Reduces O(n!) to O(2^n n²).",
        "Signaled by problem constraints where n <= 20."
      ]
    },
    "intuition": {
      "overview": "Let dp[mask][u] be the minimum cost to visit the subset of vertices indicated by bitmask `mask`, ending at vertex u. To transition to an unvisited vertex v: dp[mask | (1 << v)][v] = min(dp[mask | (1 << v)][v], dp[mask][u] + dist[u][v]).",
      "steps": [
        {
          "step": 1,
          "title": "Mask Interpretation",
          "description": "If (mask >> i) & 1 == 1, vertex i is visited."
        },
        {
          "step": 2,
          "title": "Base State",
          "description": "dp[1 << start][start] = 0 (only start visited)."
        },
        {
          "step": 3,
          "title": "Bit Transition",
          "description": "For unvisited v (mask & (1 << v) == 0): relax new_mask = mask | (1 << v)."
        }
      ]
    },
    "formalDefinition": {
      "text": "In the Held-Karp algorithm for TSP, C(S, u) is the minimum cost path visiting each vertex in S \\subseteq V exactly once, ending at u. Recurrence: C(S, u) = \\min_{v \\in S \\setminus \\{u\\}} \\big(C(S \\setminus \\{u\\}, v) + \\text{dist}(v, u)\\big).",
      "latex": "dp[\\text{mask}][u] = \\min_{v \\in \\text{mask} \\setminus \\{u\\}} \\big( dp[\\text{mask} \\setminus \\{u\\}][v] + d(v, u) \\big)"
    },
    "complexity": {
      "overview": "Time: O(2ⁿ n²). Space: O(2ⁿ n).",
      "cases": [
        {
          "case": "Best",
          "time": "O(2ⁿ n²)",
          "space": "O(2ⁿ n)",
          "explanation": "Visits all 2^n subset masks."
        },
        {
          "case": "Average",
          "time": "O(2ⁿ n²)",
          "space": "O(2ⁿ n)",
          "explanation": "Exponential in n, polynomial in transition."
        },
        {
          "case": "Worst",
          "time": "O(2ⁿ n²)",
          "space": "O(2ⁿ n)",
          "explanation": "Practical limit is n <= 20."
        }
      ],
      "spaceNote": "O(2^n * n) 2D table."
    },
    "workedExample": {
      "title": "Bitmask Encoding for 4 Cities {0, 1, 2, 3}",
      "input": "n = 4",
      "steps": [
        {
          "step": 1,
          "action": "Only City 0 visited",
          "state": "Binary 0001 = 1",
          "explanation": "1 << 0 = 1."
        },
        {
          "step": 2,
          "action": "Cities 0 and 2 visited",
          "state": "Binary 0101 = 5",
          "explanation": "(1 << 0) | (1 << 2) = 1 | 4 = 5."
        },
        {
          "step": 3,
          "action": "Check if City 2 visited in mask 5",
          "state": "(5 >> 2) & 1 == 1 -> True",
          "explanation": "Bit test."
        },
        {
          "step": 4,
          "action": "All 4 cities visited",
          "state": "Binary 1111 = 15 = (1 << 4) - 1",
          "explanation": "Full mask."
        }
      ],
      "finalOutput": "All subsets mapped to integers 0..15."
    },
    "visualExplanation": {
      "title": "Hypercube State Lattice",
      "description": "Visualizing bitmask states as vertices of an n-dimensional hypercube moving from 0000 to 1111.",
      "features": [
        "Level k contains masks with k set bits",
        "Edges represent adding one new visited city"
      ]
    },
    "pseudocode": {
      "title": "Traveling Salesperson (Held-Karp)",
      "code": "function tsp(dist, n):\n    dp = 2D array of size (1 << n) x n filled with infinity\n    dp[1][0] = 0 # start at 0\n    for mask from 1 to (1 << n) - 1:\n        for u in 0..n-1:\n            if dp[mask][u] == infinity: continue\n            for v in 0..n-1:\n                if (mask & (1 << v)) == 0: # v not visited\n                    new_mask = mask | (1 << v)\n                    dp[new_mask][v] = min(dp[new_mask][v], dp[mask][u] + dist[u][v])\n    # Return min cycle back to 0\n    full_mask = (1 << n) - 1\n    return min(dp[full_mask][i] + dist[i][0] for i in 1..n-1)"
    },
    "pythonCode": {
      "title": "Python Traveling Salesperson Bitmask DP",
      "code": "def tsp(dist: list[list[int]]) -> int:\n    n = len(dist)\n    # dp[mask][u]: min cost visiting cities in mask ending at u\n    dp = [[float('inf')] * n for _ in range(1 << n)]\n    dp[1][0] = 0 # Start at city 0\n\n    for mask in range(1, 1 << n):\n        for u in range(n):\n            if dp[mask][u] == float('inf'):\n                continue\n            for v in range(n):\n                if not (mask & (1 << v)): # If v is not yet visited\n                    new_mask = mask | (1 << v)\n                    cost = dp[mask][u] + dist[u][v]\n                    if cost < dp[new_mask][v]:\n                        dp[new_mask][v] = cost\n\n    full_mask = (1 << n) - 1\n    return min(dp[full_mask][i] + dist[i][0] for i in range(1, n))",
      "explanation": "Held-Karp algorithm solving TSP in O(2^n * n^2) using bitmask states."
    },
    "runnableCode": {
      "code": "dist = [\n    [0, 10, 15, 20],\n    [10, 0, 35, 25],\n    [15, 35, 0, 30],\n    [20, 25, 30, 0]\n]\nprint(tsp(dist))",
      "expectedOutput": "80"
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "dp = [[float(\"inf\")] * n for _ in range(1 << n)]",
        "codeSnippet": "dp = [[float(\"inf\")] * n for _ in range(1 << n)]",
        "explanation": "Allocates table of size 2^n rows where each row represents a unique subset combination of visited nodes."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "if not (mask & (1 << v)):",
        "codeSnippet": "if not (mask & (1 << v)):",
        "explanation": "Bitwise test: checks if the v-th bit is 0, confirming city v has not been visited yet."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "new_mask = mask | (1 << v)",
        "codeSnippet": "new_mask = mask | (1 << v)",
        "explanation": "Bitwise OR: sets the v-th bit to 1, marking city v as visited."
      }
    ],
    "edgeCases": [
      {
        "case": "n = 1",
        "handling": "Single city tour has cost 0.",
        "example": "n = 1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Applying Bitmask DP when n > 25",
        "solution": "2^30 integers exceed memory limits; Bitmask DP is strictly intended for small n (n <= 20).",
        "codeExample": "# Only use when n <= 20"
      }
    ],
    "applications": [
      {
        "industry": "Supply Chain Logistics",
        "application": "Last-mile delivery route optimization (routing delivery vans)",
        "benefit": "Solves exact optimal route for small daily clusters."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-bd-1",
        "question": "How can you count the number of set bits (visited cities) in a bitmask in Python?",
        "hint": "bin(mask).count(\"1\") or bit_count().",
        "answer": "Use mask.bit_count() in Python 3.10+, or bin(mask).count(\"1\")."
      }
    ],
    "quiz": [
      {
        "id": "q-bd-1",
        "question": "What is the time complexity of the Held-Karp Bitmask DP algorithm for TSP with n cities?",
        "options": [
          "O(2ⁿ n²)",
          "O(n!)",
          "O(n³)",
          "O(2ⁿ)"
        ],
        "correctIndex": 0,
        "explanation": "There are 2^n masks, n endpoints per mask, and n transitions to unvisited cities, yielding O(2ⁿ n²)."
      }
    ],
    "codingChallenge": {
      "title": "Smallest Sufficient Team",
      "problem": "In a project with req_skills, find the smallest team of people that possesses all required skills.",
      "hints": [
        "Represent skills as bitmasks; dp[mask] = smallest team list achieving mask."
      ],
      "starterCode": "def smallest_sufficient_team(req_skills: list[str], people: list[list[str]]) -> list[int]:\n    # TODO: Find smallest team\n    pass",
      "solution": "def smallest_sufficient_team(req_skills: list[str], people: list[list[str]]) -> list[int]:\n    skill_map = {s: i for i, s in enumerate(req_skills)}\n    n = len(req_skills)\n    dp = {0: []}\n    for person_idx, p_skills in enumerate(people):\n        p_mask = 0\n        for s in p_skills:\n            if s in skill_map:\n                p_mask |= (1 << skill_map[s])\n        for mask, team in list(dp.items()):\n            new_mask = mask | p_mask\n            if new_mask not in dp or len(team) + 1 < len(dp[new_mask]):\n                dp[new_mask] = team + [person_idx]\n    return dp[(1 << n) - 1]"
    },
    "summary": {
      "keyTakeaways": [
        "Bitmask DP encodes subsets as integers, reducing factorial O(n!) to O(2ⁿ n²).",
        "Best suited for problems where n <= 20."
      ],
      "nextLessonId": "dsa-advanced-bit-manipulation",
      "nextLessonTitle": "Bit Manipulation",
      "nextLessonModuleId": "dsa-module-12"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "dp = [[float(\"inf\")] * n for _ in range(1 << n)]",
        "codeSnippet": "dp = [[float(\"inf\")] * n for _ in range(1 << n)]",
        "explanation": "Allocates table of size 2^n rows where each row represents a unique subset combination of visited nodes."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "if not (mask & (1 << v)):",
        "codeSnippet": "if not (mask & (1 << v)):",
        "explanation": "Bitwise test: checks if the v-th bit is 0, confirming city v has not been visited yet."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "new_mask = mask | (1 << v)",
        "codeSnippet": "new_mask = mask | (1 << v)",
        "explanation": "Bitwise OR: sets the v-th bit to 1, marking city v as visited."
      }
    ]
  }
};
