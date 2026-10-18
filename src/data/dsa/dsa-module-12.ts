import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule12Data: DSAModuleData = {
  "id": "dsa-module-12",
  "number": 12,
  "title": "Advanced Algorithms and Problem Solving",
  "subtitle": "Bit Tricks, Search Strategies, Sweep Line & Interview Patterns",
  "description": "The final module covers advanced techniques used in competitive programming and technical interviews. Master bit manipulation, binary search on the answer space, meet-in-the-middle, sweep line algorithms, and develop a systematic framework for approaching novel problems.",
  "icon": "Cpu",
  "badge": "Advanced",
  "estimatedHours": 10,
  "topicsCount": 8,
  "lessons": [
    {
      "id": "dsa-advanced-bit-manipulation",
      "moduleId": "dsa-module-12",
      "title": "Bit Manipulation",
      "description": "AND, OR, XOR, shifts, popcount, bit tricks for powers of two, swapping, and subset enumeration.",
      "order": 1,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-advanced-binary-search-answer",
      "moduleId": "dsa-module-12",
      "title": "Binary Search on Answer",
      "description": "Applying binary search to the answer domain for optimization problems: min-max and feasibility checking.",
      "order": 2,
      "readTimeMinutes": 28,
      "visualizerType": "binary-search",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-advanced-meet-in-middle",
      "moduleId": "dsa-module-12",
      "title": "Meet in the Middle",
      "description": "Splitting exponential search into two halves for O(2^(n/2)) solutions to subset problems.",
      "order": 3,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-advanced-sweep-line",
      "moduleId": "dsa-module-12",
      "title": "Sweep-Line Algorithms",
      "description": "Event-based coordinate scanning for interval problems, area computation, and closest pair.",
      "order": 4,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-advanced-coordinate-compression",
      "moduleId": "dsa-module-12",
      "title": "Coordinate Compression",
      "description": "Remapping large sparse coordinate spaces to small dense indices for efficient data structure use.",
      "order": 5,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-advanced-trie-applications",
      "moduleId": "dsa-module-12",
      "title": "Advanced Trie Applications",
      "description": "XOR maximum subarray with binary trie, compressed tries, and suffix arrays overview.",
      "order": 6,
      "readTimeMinutes": 30,
      "visualizerType": "trie",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-advanced-complexity-overview",
      "moduleId": "dsa-module-12",
      "title": "Computational Complexity Overview",
      "description": "P vs NP, NP-completeness, reduction, and understanding when to seek approximation algorithms.",
      "order": 7,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-advanced-interview-patterns",
      "moduleId": "dsa-module-12",
      "title": "Interview Patterns and Problem-Solving Strategy",
      "description": "Systematic 4-step framework for approaching unfamiliar problems: understand, design, implement, verify.",
      "order": 8,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    }
  ]
};

export const dsaModule12Lessons: Record<string, DSALessonContent> = {
  "dsa-advanced-bit-manipulation": {
    "id": "dsa-advanced-bit-manipulation",
    "moduleId": "dsa-module-12",
    "title": "Bit Manipulation & Bitwise Algorithms",
    "subtitle": "Bitwise Operators, Low-Level Bit Tricks, Subsets & XOR Properties",
    "order": 1,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master the fundamental bitwise operators: AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), and Right Shift (>>)",
      "Understand two's complement representation of signed integers and how sign bits behave",
      "Learn constant-time bitwise idioms: checking/setting/clearing/toggling bits, isolation of lowest set bit",
      "Apply Brian Kernighan's algorithm for counting set bits in O(set bits) time",
      "Leverage XOR properties (identity, self-inverse, commutativity) for linear-time missing/single number problems",
      "Generate all 2^n subsets of a set using bitmask enumeration"
    ],
    "prerequisites": [
      "Binary number system (radix-2 positional notation)",
      "Basic array and integer operations in Python"
    ],
    "analogy": {
      "title": "The Row of Light Switches",
      "text": "Think of an integer as a row of 32 physical light switches on a control panel. Instead of inspecting each switch one-by-one with a microscope, bitwise operators let you throw whole patterns of switches in parallel at the speed of electricity: masking allows you to test whether switches 2 and 5 are ON simultaneously in a single nanosecond, and flipping a switch is a single XOR operation.",
      "metaphor": "An n-bit integer is a compact hardware register where each bit is a boolean flag, manipulated in parallel by CPU ALUs in single-cycle instructions."
    },
    "problemSolved": {
      "title": "Why Bit Manipulation?",
      "description": "Bit manipulation solves problems of memory efficiency and raw execution speed. A single 64-bit integer can store the presence or absence of 64 elements, replacing arrays of booleans or hash sets, while bitwise operations execute in 1 CPU clock cycle.",
      "keyPoints": [
        "Single-cycle ALU instructions: AND, OR, XOR, shifts execute faster than arithmetic operations",
        "Minimal memory footprint: represents 64 boolean states in an 8-byte word",
        "Zero-allocation state tracking for recursion, backtracking, and dynamic programming (Bitmask DP)",
        "Fundamental in cryptography, graphics, network protocols, compression algorithms, and competitive programming"
      ]
    },
    "intuition": {
      "overview": "Each bit position k represents the value 2^k. Shifting left multiplies by 2, shifting right divides by 2. The bitwise mask (1 << k) isolates exactly the k-th bit.",
      "steps": [
        {
          "step": 1,
          "title": "Isolating the k-th Bit",
          "description": "Construct a mask with 1 at index k: mask = 1 << k. Performing (num & mask) yields non-zero if bit k is set (1), and 0 if it is clear (0)."
        },
        {
          "step": 2,
          "title": "Setting and Clearing Bits",
          "description": "To set bit k: num |= (1 << k). To clear bit k: num &= ~(1 << k), where ~ inverts all bits to create a mask with 0 only at position k."
        },
        {
          "step": 3,
          "title": "Isolating the Lowest Set Bit (LSB)",
          "description": "In two's complement, -x = (~x + 1). Therefore, x & (-x) isolates the lowest set bit. For example, 12 (0b1100) & -12 yields 4 (0b0100)."
        },
        {
          "step": 4,
          "title": "Clearing the Lowest Set Bit",
          "description": "Subtracting 1 from x flips the lowest set bit and all trailing zeros to ones. Therefore, x & (x - 1) clears the lowest set bit. Repeating this counts set bits (Brian Kernighan)."
        },
        {
          "step": 5,
          "title": "XOR Cancellation Property",
          "description": "x ^ x = 0, and x ^ 0 = x. Because XOR is associative and commutative, any duplicate numbers cancel out to 0, leaving only unmatched elements."
        }
      ]
    },
    "formalDefinition": {
      "text": "Bitwise operations operate on the individual bits of binary numbers. Let a, b in {0, 1}^w be w-bit words. Then (a & b)_i = a_i * b_i, (a | b)_i = a_i + b_i - a_i * b_i, and (a ^ b)_i = (a_i + b_i) mod 2.",
      "latex": "x \\land (-x) = 2^{\\text{ctz}(x)}, \\quad x \\land (x - 1) = x - 2^{\\text{ctz}(x)}"
    },
    "complexity": {
      "overview": "All bitwise primitives (AND, OR, XOR, NOT, shifts) execute in O(1) time and O(1) space on fixed-width machine registers.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Hardware ALU executes bitwise instructions directly in 1 clock cycle."
        },
        {
          "case": "Average",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Operations like isolating LSB or checking power-of-two take constant operations."
        },
        {
          "case": "Worst",
          "time": "O(k)",
          "space": "O(1)",
          "explanation": "Counting set bits takes O(k) where k is the number of set bits (Brian Kernighan), at most 32 or 64."
        }
      ],
      "spaceNote": "O(1) auxiliary memory. Bitmasks replace O(N) space boolean arrays."
    },
    "workedExample": {
      "title": "Counting Set Bits with Brian Kernighan's Algorithm",
      "input": "n = 13 (binary: 1101_2)",
      "steps": [
        {
          "step": 1,
          "action": "Initial check",
          "state": "n = 13 (0b1101), count = 0",
          "explanation": "n > 0, so at least one set bit exists."
        },
        {
          "step": 2,
          "action": "Clear lowest set bit: n = n & (n - 1)",
          "state": "n - 1 = 12 (0b1100); n & (n - 1) = 0b1100 (12), count = 1",
          "explanation": "Bit 0 cleared. Count increments to 1."
        },
        {
          "step": 3,
          "action": "Clear next lowest set bit: n = n & (n - 1)",
          "state": "n - 1 = 11 (0b1011); 12 & 11 = 0b1000 (8), count = 2",
          "explanation": "Bit 2 cleared. Count increments to 2."
        },
        {
          "step": 4,
          "action": "Clear next lowest set bit: n = n & (n - 1)",
          "state": "n - 1 = 7 (0b0111); 8 & 7 = 0b0000 (0), count = 3",
          "explanation": "Bit 3 cleared. n is now 0. Loop terminates."
        }
      ],
      "finalOutput": "Total set bits = 3 (executed in 3 iterations instead of 32)"
    },
    "visualExplanation": {
      "title": "Bitwise Masks and Low-Level Patterns",
      "description": "A visual reference for key bitwise idioms and patterns.",
      "features": [
        "Check k-th bit: (n >> k) & 1",
        "Set k-th bit: n | (1 << k)",
        "Clear k-th bit: n & ~(1 << k)",
        "Toggle k-th bit: n ^ (1 << k)",
        "Check power of 2: n > 0 and (n & (n - 1)) == 0",
        "Extract lowest set bit: n & (-n)",
        "Iterate over all subsets of mask: sub = (sub - 1) & mask"
      ]
    },
    "pseudocode": {
      "title": "Single Number via XOR & Subset Generation via Bitmask",
      "code": "function findSingleNumber(nums):\n    result = 0\n    for num in nums:\n        result = result XOR num\n    return result\n\nfunction generateSubsets(elements):\n    n = length(elements)\n    totalSubsets = 1 << n      // 2^n\n    allSubsets = []\n    \n    for mask from 0 to totalSubsets - 1:\n        current = []\n        for i from 0 to n - 1:\n            if (mask & (1 << i)) != 0:\n                current.append(elements[i])\n        allSubsets.append(current)\n        \n    return allSubsets"
    },
    "pythonCode": {
      "title": "Comprehensive Bit Manipulation Toolkit in Python",
      "code": "class BitManipulator:\n    @staticmethod\n    def is_power_of_two(n: int) -> bool:\n        \"\"\"Check if n is a power of 2 in O(1) time.\"\"\"\n        return n > 0 and (n & (n - 1)) == 0\n\n    @staticmethod\n    def count_set_bits(n: int) -> int:\n        \"\"\"Brian Kernighan's algorithm: O(number of set bits).\"\"\"\n        count = 0\n        while n > 0:\n            n &= (n - 1)  # Clears lowest set bit\n            count += 1\n        return count\n\n    @staticmethod\n    def single_number(nums: list[int]) -> int:\n        \"\"\"Find the element appearing once when all others appear twice.\"\"\"\n        xor_sum = 0\n        for num in nums:\n            xor_sum ^= num\n        return xor_sum\n\n    @staticmethod\n    def get_subsets(elements: list[str]) -> list[list[str]]:\n        \"\"\"Generate all 2^n subsets using integer bitmasks.\"\"\"\n        n = len(elements)\n        subsets = []\n        for mask in range(1 << n):\n            subset = [elements[i] for i in range(n) if (mask & (1 << i))]\n            subsets.append(subset)\n        return subsets\n\n    @staticmethod\n    def lowest_set_bit(n: int) -> int:\n        \"\"\"Extract the lowest set bit as a power of 2.\"\"\"\n        return n & (-n)",
      "explanation": "Provides five fundamental bitwise operations: power-of-two verification, set bit counting, single unique element finding via XOR cancellation, powerset generation, and LSB extraction."
    },
    "runnableCode": {
      "code": "def demonstrate_bit_tricks():\n    # 1. Brian Kernighan count\n    val = 29  # 0b11101 -> 4 set bits\n    count = 0\n    temp = val\n    while temp:\n        temp &= (temp - 1)\n        count += 1\n    print(f\"Set bits in {val} (bin: {bin(val)}): {count}\")\n\n    # 2. Power of 2 test\n    nums = [16, 18, 64, 100]\n    for x in nums:\n        is_p2 = x > 0 and (x & (x - 1)) == 0\n        print(f\"Is {x} power of 2? {is_p2}\")\n\n    # 3. Single number via XOR\n    arr = [4, 1, 2, 1, 2]\n    single = 0\n    for x in arr:\n        single ^= x\n    print(f\"Single number in {arr}: {single}\")\n\ndemonstrate_bit_tricks()",
      "expectedOutput": "Set bits in 29 (bin: 0b11101): 4\nIs 16 power of 2? True\nIs 18 power of 2? False\nIs 64 power of 2? True\nIs 100 power of 2? False\nSingle number in [4, 1, 2, 1, 2]: 4"
    },
    "lineByLineExplanation": [
      {
        "line": "1-8",
        "lines": "1-8",
        "code": "while temp: temp &= (temp - 1); count += 1",
        "codeSnippet": "while temp: temp &= (temp - 1); count += 1",
        "explanation": "Brian Kernighan's loop runs once per 1-bit by stripping the lowest set bit on each iteration."
      },
      {
        "line": "11-14",
        "lines": "11-14",
        "code": "is_p2 = x > 0 and (x & (x - 1)) == 0",
        "codeSnippet": "is_p2 = x > 0 and (x & (x - 1)) == 0",
        "explanation": "Powers of two have exactly one set bit; clearing it leaves zero."
      },
      {
        "line": "17-21",
        "lines": "17-21",
        "code": "single ^= x",
        "codeSnippet": "single ^= x",
        "explanation": "Every duplicate number cancels itself out via x ^ x = 0, leaving only the unique element."
      }
    ],
    "edgeCases": [
      {
        "case": "n = 0",
        "handling": "Check n > 0 explicitly for power-of-two tests because (0 & -1) == 0 would otherwise return True.",
        "example": "0 & (0 - 1) is 0, but 0 is not a power of 2."
      },
      {
        "case": "Negative integers in Python",
        "handling": "Python handles arbitrary precision integers where negative numbers have infinite sign bits. Use mask 0xFFFFFFFF for 32-bit operations.",
        "example": "n & 0xFFFFFFFF truncates negative representations to 32 bits."
      },
      {
        "case": "Bit shift by >= word size",
        "handling": "In languages like C++, shifting by >= 32 bits is undefined behavior. In Python, integers grow dynamically.",
        "example": "Ensure shift amounts k satisfy 0 <= k < 64 in cross-language algorithms."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Operator precedence: == has higher precedence than & or |",
        "solution": "Always wrap bitwise expressions in parentheses: if (n & 1) == 0: instead of if n & 1 == 0:",
        "codeExample": "if (n & 1) == 0:  # Correct\nif n & 1 == 0:    # Parses as n & (1 == 0) -> n & 0 -> always False!"
      },
      {
        "mistake": "Using logical AND (and) instead of bitwise AND (&)",
        "solution": "Use & for bitwise operations and 'and' for boolean logic evaluations.",
        "codeExample": "x & y   # Bitwise AND\nx and y # Short-circuit boolean AND"
      }
    ],
    "applications": [
      {
        "industry": "Cryptography & Hashing",
        "application": "SHA-256 and AES encryption primitives",
        "benefit": "Bitwise rotations, XOR ciphers, and S-box substitutions execute at wire speeds in hardware."
      },
      {
        "industry": "Game Development & Graphics",
        "application": "Collision layers and entity component masks",
        "benefit": "Tests layer-mask visibility and physics collisions in a single CPU instruction."
      },
      {
        "industry": "Database Systems",
        "application": "Bitmap indexing and bloom filters",
        "benefit": "Compressed query filtering over millions of records with minimal memory overhead."
      }
    ],
    "practiceQuestions": [
      {
        "id": "q1",
        "question": "How do you check if an integer is odd using bitwise operators?",
        "hint": "Inspect the least significant bit (bit 0).",
        "answer": "Check (n & 1) == 1. An odd number always has 1 as its least significant bit."
      },
      {
        "id": "q2",
        "question": "Why does x ^ x equal 0 for any integer x?",
        "hint": "Examine each bit position individually using the definition of XOR.",
        "answer": "At every bit position, if the bit is 0, 0 ^ 0 = 0. If the bit is 1, 1 ^ 1 = 0. Therefore, all bits become 0."
      },
      {
        "id": "q3",
        "question": "What does the expression n & (-n) compute?",
        "hint": "Think about two's complement representation: -n = ~n + 1.",
        "answer": "It extracts the lowest set bit of n as a power of 2, clearing all higher bits."
      }
    ],
    "quiz": [
      {
        "id": "quiz-1",
        "question": "What is the value of 5 ^ 5 ^ 7?",
        "options": [
          "0",
          "5",
          "7",
          "12"
        ],
        "correctIndex": 2,
        "explanation": "XOR is commutative and self-inverse: (5 ^ 5) ^ 7 = 0 ^ 7 = 7."
      },
      {
        "id": "quiz-2",
        "question": "Which expression correctly checks if n is a power of 2 for positive n?",
        "options": [
          "(n & (n + 1)) == 0",
          "(n & (n - 1)) == 0",
          "(n | (n - 1)) == 0",
          "(n ^ (n - 1)) == 0"
        ],
        "correctIndex": 1,
        "explanation": "Powers of two have a single 1-bit. n - 1 inverts that bit and sets all lower bits. Their AND yields 0."
      },
      {
        "id": "quiz-3",
        "question": "What does n << 3 achieve mathematically for non-negative integers?",
        "options": [
          "Multiplication by 3",
          "Multiplication by 6",
          "Multiplication by 8",
          "Division by 8"
        ],
        "correctIndex": 2,
        "explanation": "Shifting left by k positions multiplies the integer by 2^k. Here, 2^3 = 8."
      }
    ],
    "codingChallenge": {
      "title": "Missing Number",
      "problem": "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array. Must run in O(n) time and O(1) space.",
      "hints": [
        "Recall that x ^ x = 0 and x ^ 0 = x.",
        "XOR all numbers from 0 to n together.",
        "XOR that result with every number in the input array. All present numbers will cancel out."
      ],
      "starterCode": "def missing_number(nums: list[int]) -> int:\n    # Write your solution here\n    pass",
      "solution": "def missing_number(nums: list[int]) -> int:\n    xor_sum = 0\n    n = len(nums)\n    # XOR all expected numbers 0..n\n    for i in range(n + 1):\n        xor_sum ^= i\n    # XOR all numbers actually present in array\n    for num in nums:\n        xor_sum ^= num\n    # The remaining value is the missing number\n    return xor_sum"
    },
    "summary": {
      "keyTakeaways": [
        "Bitwise operators work directly on binary representations in 1 clock cycle",
        "x & (x - 1) strips the lowest set bit, enabling Brian Kernighan's O(set bits) popcount",
        "x & (-x) isolates the lowest set bit via two's complement arithmetic",
        "XOR is self-cancelling (x ^ x = 0) and associative, ideal for finding unique or missing values",
        "An integer bitmask represents a subset of up to 64 items with zero heap allocation"
      ],
      "nextLessonId": "dsa-advanced-binary-search-answer",
      "nextLessonTitle": "Binary Search on Answer",
      "nextLessonModuleId": "dsa-module-12"
    },
    "lineByLine": [
      {
        "line": "1-8",
        "lines": "1-8",
        "code": "while temp: temp &= (temp - 1); count += 1",
        "codeSnippet": "while temp: temp &= (temp - 1); count += 1",
        "explanation": "Brian Kernighan's loop runs once per 1-bit by stripping the lowest set bit on each iteration."
      },
      {
        "line": "11-14",
        "lines": "11-14",
        "code": "is_p2 = x > 0 and (x & (x - 1)) == 0",
        "codeSnippet": "is_p2 = x > 0 and (x & (x - 1)) == 0",
        "explanation": "Powers of two have exactly one set bit; clearing it leaves zero."
      },
      {
        "line": "17-21",
        "lines": "17-21",
        "code": "single ^= x",
        "codeSnippet": "single ^= x",
        "explanation": "Every duplicate number cancels itself out via x ^ x = 0, leaving only the unique element."
      }
    ]
  },
  "dsa-advanced-binary-search-answer": {
    "id": "dsa-advanced-binary-search-answer",
    "moduleId": "dsa-module-12",
    "title": "Binary Search on Answer",
    "subtitle": "Monotonic Feasibility Predicates, Koko Eating Bananas, and Capacity Minimization",
    "order": 2,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "binary-search",
    "objectives": [
      "Identify optimization problems that can be converted into decision problems.",
      "Formulate monotonic feasibility predicates f(x) -> {True, False}.",
      "Binary search the answer space [low, high] in O(log(range) * cost(check)).",
      "Solve Koko Eating Bananas, Split Array Largest Sum, and Capacity to Ship Packages."
    ],
    "prerequisites": [
      "Arrays and Matrices: Binary Search Variations"
    ],
    "analogy": {
      "title": "Finding the Minimum Treadmill Speed",
      "text": "A marathon runner wants to find the slowest possible treadmill speed needed to finish a race in under 4 hours. If they run at 5 mph, they fail (too slow). If they run at 10 mph, they succeed (fast enough). Because any speed higher than 10 mph will ALSO succeed, the ability to finish is monotonic. We binary search between 5 mph and 10 mph to find the exact threshold.",
      "metaphor": "When a feasibility function transitions monotonically from False to True, binary search finds the boundary."
    },
    "problemSolved": {
      "title": "Solving Complex Minimax Optimization in Logarithmic Iterations",
      "description": "Minimizing the maximum or finding the minimum viable speed naively requires testing all possible values sequentially in O(range * n). Binary Search on Answer searches the solution domain in O(log(range) * n) time.",
      "keyPoints": [
        "Transforms \"find optimal value\" into \"test if value x is feasible\".",
        "Requires monotonic property: if x is feasible, all x' > x are also feasible.",
        "Operates over continuous integers or floating-point intervals."
      ]
    },
    "intuition": {
      "overview": "Define low (minimum possible answer) and high (maximum possible answer). In while loop: mid = (low + high) // 2. If feasible(mid) is True, search lower half (high = mid); else search upper half (low = mid + 1).",
      "steps": [
        {
          "step": 1,
          "title": "Bound the Range",
          "description": "low = min_feasible_value; high = max_feasible_value."
        },
        {
          "step": 2,
          "title": "Feasibility Predicate",
          "description": "Write boolean function can_finish(speed) in O(n) time."
        },
        {
          "step": 3,
          "title": "Binary Search Boundary",
          "description": "Adjust low and high until converging on the minimal valid answer."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let P: [A, B] \\to \\{0, 1\\} be a monotonic predicate such that P(x) = 1 \\implies \\forall y > x, P(y) = 1. Binary search finds x^* = \\min \\{x \\in [A, B] : P(x) = 1\\} in O(\\log(B - A) \\cdot T(P)).",
      "latex": "x^* = \\min \\{ x \\in [\\text{low}, \\text{high}] : f(x) = \\text{True} \\} \\implies \\mathcal{O}(\\log(\\text{range}) \\cdot T_f)"
    },
    "complexity": {
      "overview": "Time: O(n * log(max_val)). Space: O(1) in-place.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log R)",
          "space": "O(1)",
          "explanation": "Optimal boundary convergence."
        },
        {
          "case": "Average",
          "time": "O(n log R)",
          "space": "O(1)",
          "explanation": "Logarithmic iterations over value range."
        },
        {
          "case": "Worst",
          "time": "O(n log R)",
          "space": "O(1)",
          "explanation": "Full binary search."
        }
      ],
      "spaceNote": "O(1) auxiliary memory."
    },
    "workedExample": {
      "title": "Koko Eating Bananas: piles = [3, 6, 7, 11], h = 8 hours",
      "input": "piles = [3, 6, 7, 11], h = 8",
      "steps": [
        {
          "step": 1,
          "action": "Range Bounds",
          "state": "low = 1, high = max(piles) = 11",
          "explanation": "Speed is between 1 and 11."
        },
        {
          "step": 2,
          "action": "Test mid = 6",
          "state": "Hours = ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 <= 8 (Valid!)",
          "explanation": "6 works; try lower speed (high = 6)."
        },
        {
          "step": 3,
          "action": "Test mid = 3",
          "state": "Hours = 1+2+3+4 = 10 > 8 (Too slow!)",
          "explanation": "3 fails; try higher speed (low = 4)."
        },
        {
          "step": 4,
          "action": "Test mid = 4",
          "state": "Hours = 1+2+2+3 = 8 <= 8 (Valid!)",
          "explanation": "4 works; high = 4."
        }
      ],
      "finalOutput": "Minimum speed k = 4"
    },
    "visualExplanation": {
      "title": "Feasibility Step Function",
      "description": "Visualizing boolean function transitioning from False to True across the horizontal axis.",
      "features": [
        "Red zone: Infeasible (too slow / too small)",
        "Green zone: Feasible (valid speeds)",
        "Boundary marker pins minimum valid answer"
      ]
    },
    "pseudocode": {
      "title": "Binary Search on Answer Algorithm",
      "code": "function minEatingSpeed(piles, h):\n    low = 1\n    high = max(piles)\n    ans = high\n    while low <= high:\n        mid = (low + high) // 2\n        if canFinish(piles, mid, h):\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans"
    },
    "pythonCode": {
      "title": "Python Koko Eating Bananas Implementation",
      "code": "import math\n\ndef min_eating_speed(piles: list[int], h: int) -> int:\n    low = 1\n    high = max(piles)\n    \n    def can_finish(speed: int) -> bool:\n        total_hours = sum(math.ceil(p / speed) for p in piles)\n        return total_hours <= h\n\n    ans = high\n    while low <= high:\n        mid = (low + high) // 2\n        if can_finish(mid):\n            ans = mid\n            high = mid - 1 # Try slower speed\n        else:\n            low = mid + 1  # Must eat faster\n            \n    return ans",
      "explanation": "Binary searches over speed range [1..max(piles)] with O(n) feasibility check per step."
    },
    "runnableCode": {
      "code": "print(min_eating_speed([3, 6, 7, 11], 8))  # 4\nprint(min_eating_speed([30, 11, 23, 4, 20], 5)) # 30",
      "expectedOutput": "4\n30"
    },
    "lineByLineExplanation": [
      {
        "line": 8,
        "lines": "8",
        "code": "total_hours = sum(math.ceil(p / speed) for p in piles)",
        "codeSnippet": "total_hours = sum(math.ceil(p / speed) for p in piles)",
        "explanation": "Computes total hours needed to consume all banana piles at current candidate speed in O(n) time."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "high = mid - 1",
        "codeSnippet": "high = mid - 1",
        "explanation": "If current speed is sufficient, records it and tests smaller speeds to find the absolute minimum."
      }
    ],
    "edgeCases": [
      {
        "case": "h == len(piles)",
        "handling": "Koko has only 1 hour per pile, so she must eat at speed = max(piles).",
        "example": "h = len(piles)"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Setting low = 0",
        "solution": "Speed 0 causes ZeroDivisionError; speed must start at 1.",
        "codeExample": "low = 1 # not 0"
      }
    ],
    "applications": [
      {
        "industry": "Cloud Engineering",
        "application": "Autoscaling cluster capacity to satisfy latency SLAs",
        "benefit": "Finds minimum worker node count satisfying request timeout constraints."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-bsa-1",
        "question": "How do you choose initial `low` and `high` bounds when applying Binary Search on Answer?",
        "hint": "Look at theoretical physical limits.",
        "answer": "`low` is the smallest imaginable answer (e.g. 1 or max(piles) depending on problem), and `high` is the safe guaranteed upper bound (e.g. sum(weights) or max(piles))."
      }
    ],
    "quiz": [
      {
        "id": "q-bsa-1",
        "question": "What property must a problem possess to be solvable by Binary Search on Answer?",
        "options": [
          "Monotonicity of the feasibility function (if x works, all y > x also work)",
          "Input array must be pre-sorted",
          "Negative numbers are forbidden",
          "The answer must be even"
        ],
        "correctIndex": 0,
        "explanation": "Binary search requires a monotonic transition (e.g. False ... False True ... True) to know which half of the search range to eliminate."
      }
    ],
    "codingChallenge": {
      "title": "Capacity To Ship Packages Within D Days",
      "problem": "A conveyor belt has packages that must be shipped within days days. Return the least weight capacity of the ship that will result in all packages being shipped within days days.",
      "hints": [
        "low = max(weights), high = sum(weights). Check if capacity can ship in <= days."
      ],
      "starterCode": "def ship_within_days(weights: list[int], days: int) -> int:\n    # TODO: Find minimum ship capacity\n    pass",
      "solution": "def ship_within_days(weights: list[int], days: int) -> int:\n    low = max(weights)\n    high = sum(weights)\n    def can_ship(cap):\n        d = 1\n        curr = 0\n        for w in weights:\n            if curr + w > cap:\n                d += 1\n                curr = 0\n            curr += w\n        return d <= days\n    while low < high:\n        mid = (low + high) // 2\n        if can_ship(mid):\n            high = mid\n        else:\n            low = mid + 1\n    return low"
    },
    "summary": {
      "keyTakeaways": [
        "Binary search on answer solves minimax optimization in O(n log(range)).",
        "Requires monotonic feasibility function."
      ],
      "nextLessonId": "dsa-advanced-meet-in-middle",
      "nextLessonTitle": "Meet in the Middle",
      "nextLessonModuleId": "dsa-module-12"
    },
    "lineByLine": [
      {
        "line": 8,
        "lines": "8",
        "code": "total_hours = sum(math.ceil(p / speed) for p in piles)",
        "codeSnippet": "total_hours = sum(math.ceil(p / speed) for p in piles)",
        "explanation": "Computes total hours needed to consume all banana piles at current candidate speed in O(n) time."
      },
      {
        "line": 15,
        "lines": "15",
        "code": "high = mid - 1",
        "codeSnippet": "high = mid - 1",
        "explanation": "If current speed is sufficient, records it and tests smaller speeds to find the absolute minimum."
      }
    ]
  },
  "dsa-advanced-meet-in-middle": {
    "id": "dsa-advanced-meet-in-middle",
    "moduleId": "dsa-module-12",
    "title": "Meet in the Middle",
    "subtitle": "Splitting Exponential Search Spaces from O(2ⁿ) to O(2^{n/2})",
    "order": 3,
    "readTimeMinutes": 22,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Define the Meet-in-the-Middle algorithmic paradigm.",
      "Halve the exponential search exponent: reducing 2^40 (1 trillion) to 2 * 2^20 (2 million).",
      "Combine subset sums from left and right halves using sorting and binary search.",
      "Solve 4Sum and Closest Subset Sum problems."
    ],
    "prerequisites": [
      "Recursion and Backtracking: Subsets and Subsequences",
      "Arrays and Matrices: Two Pointers Technique"
    ],
    "analogy": {
      "title": "Digging a Tunnel from Both Sides of a Mountain",
      "text": "To dig a 40-mile railway tunnel through a mountain, two construction crews start digging simultaneously from opposite sides of the mountain. By meeting in the middle after digging 20 miles each, the project finishes in half the time compared to one crew digging 40 miles alone.",
      "metaphor": "Splitting search in half reduces exponential complexity from 2^n to 2^{n/2}."
    },
    "problemSolved": {
      "title": "Breaking the Exponential 2^40 Barrier for Moderate n",
      "description": "When n = 40, exhaustive search 2^40 is computationally impossible. Splitting the array into two halves of size 20 generates two lists of 2^20 \\approx 1,000,000 values, which are easily sorted and queried in fractions of a second.",
      "keyPoints": [
        "Reduces O(2^n) to O(2^{n/2} * n).",
        "Applicable when n is around 30 to 45.",
        "Generates sub-solutions for each half, then uses two-pointers or binary search to combine."
      ]
    },
    "intuition": {
      "overview": "Divide array into left half (size n/2) and right half (size n - n/2). Generate all subset sums for both halves. Sort right subset sums. For each sum in left, binary search in right for target - sum.",
      "steps": [
        {
          "step": 1,
          "title": "Split Array",
          "description": "left = nums[:n//2], right = nums[n//2:]"
        },
        {
          "step": 2,
          "title": "Generate All Sums",
          "description": "Compute 2^(n/2) subset sums for left and right."
        },
        {
          "step": 3,
          "title": "Combine via Binary Search",
          "description": "For sum_L in left_sums: find closest sum_R in right_sums using bisect."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let S be a set of size n. Meet-in-the-middle partitions S = S_1 \\cup S_2 with |S_1| = \\lfloor n/2 \\rfloor and |S_2| = \\lceil n/2 \\rceil. Finding a subset summing to T tests \\forall x \\in \\mathcal{P}(S_1), \\; (T - x) \\in \\mathcal{P}(S_2).",
      "latex": "T(n) = \\mathcal{O}\\left(2^{n/2} \\cdot \\frac{n}{2}\\right) \\ll \\mathcal{O}(2^n)"
    },
    "complexity": {
      "overview": "Time: O(2^{n/2} * n). Space: O(2^{n/2}).",
      "cases": [
        {
          "case": "Best",
          "time": "O(2^{n/2})",
          "space": "O(2^{n/2})",
          "explanation": "Halved exponential search."
        },
        {
          "case": "Average",
          "time": "O(2^{n/2} n)",
          "space": "O(2^{n/2})",
          "explanation": "Sorting right subset sums."
        },
        {
          "case": "Worst",
          "time": "O(2^{n/2} n)",
          "space": "O(2^{n/2})",
          "explanation": "Full combination sweep."
        }
      ],
      "spaceNote": "O(2^{n/2}) memory to store subset sums of the halves."
    },
    "workedExample": {
      "title": "Subset Sum closest to 10 for [1, 3, 5, 8]",
      "input": "nums = [1, 3, 5, 8], target = 10",
      "steps": [
        {
          "step": 1,
          "action": "Split array",
          "state": "left = [1, 3], right = [5, 8]",
          "explanation": "Halves of size 2."
        },
        {
          "step": 2,
          "action": "Left sums",
          "state": "[0, 1, 3, 4]",
          "explanation": "2^2 = 4 sums."
        },
        {
          "step": 3,
          "action": "Right sums",
          "state": "[0, 5, 8, 13]",
          "explanation": "2^2 = 4 sums."
        },
        {
          "step": 4,
          "action": "Pairwise search",
          "state": "left sum 1 + right sum 8 = 9; left sum 3 + right sum 8 = 11; left sum 5 + right sum 5 = 10 (exact match!)",
          "explanation": "Best match 10 found."
        }
      ],
      "finalOutput": "Exact match found: 10"
    },
    "visualExplanation": {
      "title": "Bipartite Search Collision",
      "description": "Visualizing two trees of depth n/2 meeting at a central sorted collision boundary.",
      "features": [
        "Left tree generates left list in blue",
        "Right tree generates right list in green",
        "Two-pointer sweep reconciles in linear time"
      ]
    },
    "pseudocode": {
      "title": "Meet in the Middle Algorithm",
      "code": "function meetInTheMiddle(nums, target):\n    mid = len(nums) // 2\n    left_sums = getSubsetSums(nums[:mid])\n    right_sums = sorted(getSubsetSums(nums[mid:]))\n    min_diff = infinity\n    for x in left_sums:\n        # Binary search for target - x in right_sums\n        y = findClosest(right_sums, target - x)\n        min_diff = min(min_diff, abs(target - (x + y)))\n    return min_diff"
    },
    "pythonCode": {
      "title": "Python Closest Subsequence Sum",
      "code": "import bisect\n\ndef min_abs_difference(nums: list[int], goal: int) -> int:\n    def get_subset_sums(arr):\n        sums = {0}\n        for x in arr:\n            sums |= {s + x for s in sums}\n        return sorted(sums)\n\n    mid = len(nums) // 2\n    left_sums = get_subset_sums(nums[:mid])\n    right_sums = get_subset_sums(nums[mid:])\n\n    min_diff = float('inf')\n\n    for x in left_sums:\n        needed = goal - x\n        idx = bisect.bisect_left(right_sums, needed)\n        \n        # Check closest element at idx and idx - 1\n        if idx < len(right_sums):\n            min_diff = min(min_diff, abs(goal - (x + right_sums[idx])))\n        if idx > 0:\n            min_diff = min(min_diff, abs(goal - (x + right_sums[idx - 1])))\n            \n    return min_diff",
      "explanation": "Splits array in half, generates all subset sums for each half, and binary searches for the closest match."
    },
    "runnableCode": {
      "code": "print(min_abs_difference([5, -7, 3, 5], 6)) # 0 (5 + 3 - 7 + 5 = 6)",
      "expectedOutput": "0"
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "sums |= {s + x for s in sums}",
        "codeSnippet": "sums |= {s + x for s in sums}",
        "explanation": "Generates all subset sums iteratively for half the array in O(2^{n/2}) time."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "idx = bisect.bisect_left(right_sums, needed)",
        "codeSnippet": "idx = bisect.bisect_left(right_sums, needed)",
        "explanation": "Binary searches for target complement in sorted right sums in O(log(2^{n/2})) = O(n/2) time."
      }
    ],
    "edgeCases": [
      {
        "case": "Single element array",
        "handling": "mid = 0, left is empty [0], right has element.",
        "example": "[10], goal=10"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Applying Meet in the Middle when n > 50",
        "solution": "2^25 is 33 million items (feasible), but 2^30 is 1 billion items (memory limit exceeded); best for n in [30, 45].",
        "codeExample": "# Only use when n <= 45"
      }
    ],
    "applications": [
      {
        "industry": "Cryptography",
        "application": "Attacking Double DES encryption (Meet-in-the-Middle attack)",
        "benefit": "Reduces Double DES security from 2^112 to 2^57 operations, breaking the cipher."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-mim-1",
        "question": "Why does Double DES (applying DES encryption twice with two 56-bit keys) fail to provide 112 bits of security?",
        "hint": "Meet-in-the-middle attack.",
        "answer": "Encrypting plaintext forward with all 2^56 keys and decrypting ciphertext backward with all 2^56 keys allows finding the shared intermediate value in O(2^56) time and space."
      }
    ],
    "quiz": [
      {
        "id": "q-mim-1",
        "question": "How much does Meet-in-the-Middle reduce the search complexity for an array of size n=40?",
        "options": [
          "From 2^40 (~1 trillion) to 2 * 2^20 (~2 million)",
          "From n² to n log n",
          "From 40! to 20!",
          "From 2^40 to 40"
        ],
        "correctIndex": 0,
        "explanation": "Halving the exponent drops complexity from 2^40 to 2^{20}, which is a ~500,000x reduction in operations."
      }
    ],
    "codingChallenge": {
      "title": "4Sum II",
      "problem": "Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0.",
      "hints": [
        "Hash map of pairwise sums: store counts of nums1[i] + nums2[j], then query -(nums3[k] + nums4[l])."
      ],
      "starterCode": "def four_sum_count(nums1: list[int], nums2: list[int], nums3: list[int], nums4: list[int]) -> int:\n    # TODO: Count 4Sum tuples in O(n^2)\n    pass",
      "solution": "from collections import defaultdict\n\ndef four_sum_count(nums1: list[int], nums2: list[int], nums3: list[int], nums4: list[int]) -> int:\n    sum_map = defaultdict(int)\n    for a in nums1:\n        for b in nums2:\n            sum_map[a + b] += 1\n    count = 0\n    for c in nums3:\n        for d in nums4:\n            count += sum_map[-(c + d)]\n    return count"
    },
    "summary": {
      "keyTakeaways": [
        "Meet in the middle reduces 2^n to 2^{n/2} by splitting the problem into two halves.",
        "Combines halves via sorting, binary search, or hash maps."
      ],
      "nextLessonId": "dsa-advanced-sweep-line",
      "nextLessonTitle": "Sweep-Line Algorithms",
      "nextLessonModuleId": "dsa-module-12"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "sums |= {s + x for s in sums}",
        "codeSnippet": "sums |= {s + x for s in sums}",
        "explanation": "Generates all subset sums iteratively for half the array in O(2^{n/2}) time."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "idx = bisect.bisect_left(right_sums, needed)",
        "codeSnippet": "idx = bisect.bisect_left(right_sums, needed)",
        "explanation": "Binary searches for target complement in sorted right sums in O(log(2^{n/2})) = O(n/2) time."
      }
    ]
  },
  "dsa-advanced-sweep-line": {
    "id": "dsa-advanced-sweep-line",
    "moduleId": "dsa-module-12",
    "title": "Sweep-Line Algorithms",
    "subtitle": "Geometric Event Queues, Active Sets, and Skyline Projections",
    "order": 4,
    "readTimeMinutes": 24,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Conceptualize the Sweep-Line paradigm: sweeping an imaginary 1D line across 2D space.",
      "Deconstruct 2D intervals into discrete Start and End events.",
      "Maintain the Active State using heaps or balanced search trees.",
      "Solve Meeting Rooms II and The Skyline Problem in O(n log n) time."
    ],
    "prerequisites": [
      "Activity Selection and Interval Problems",
      "Heaps and Priority Queues: Priority Queue Applications"
    ],
    "analogy": {
      "title": "A Scanner Sweeping Across a Page",
      "text": "A flatbed scanner moves a bright optical light bar across a document from left to right. At any exact millisecond, the sensor only needs to know which drawings or lines are currently directly underneath the light bar, ignoring everything to the left and right.",
      "metaphor": "A sweep-line converts a 2D spatial problem into a sequence of 1D events over time."
    },
    "problemSolved": {
      "title": "Reducing 2D Spatial Overlap from O(n²) to O(n log n)",
      "description": "Comparing all pairs of 2D shapes for collision or overlap takes O(n²). A vertical sweep line only compares shapes that are currently active under the line, maintaining the active set in O(log n) time.",
      "keyPoints": [
        "Event queue sorts critical x-coordinates (starts and ends).",
        "Active set maintains shapes currently intersecting the sweep line.",
        "Core technique in computational geometry and computer graphics."
      ]
    },
    "intuition": {
      "overview": "Convert each interval [start, end] into two events: (start, +1) and (end, -1). Sort all events by x-coordinate. As the sweep-line advances through events, increment or decrement the active overlap counter.",
      "steps": [
        {
          "step": 1,
          "title": "Create Events",
          "description": "For each interval [s, e]: add (s, +1) and (e, -1)."
        },
        {
          "step": 2,
          "title": "Sort Events",
          "description": "Sort by time coordinate x; break ties by processing endings before starts (or vice-versa)."
        },
        {
          "step": 3,
          "title": "Sweep & Record",
          "description": "current_active += event_delta; max_rooms = max(max_rooms, current_active)."
        }
      ]
    },
    "formalDefinition": {
      "text": "A sweep-line algorithm processes events E = \\{e_1, e_2, ..., e_{2n}\\} sorted along coordinate x. At any x, active state S(x) = \\{I_j : \\text{start}(I_j) \\le x < \\text{end}(I_j)\\} is maintained in a dynamic balanced tree in O(\\log |S|) per event.",
      "latex": "T(n) = \\mathcal{O}(n \\log n) \\; (\\text{Event Sorting}) + \\sum_{e \\in E} \\mathcal{O}(\\log n) = \\mathcal{O}(n \\log n)"
    },
    "complexity": {
      "overview": "Time: O(n log n) dominated by event sorting. Space: O(n) for active heap.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Optimal event line progression."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Heap updates per event."
        },
        {
          "case": "Worst",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "All intervals overlapping concurrently."
        }
      ],
      "spaceNote": "O(n) storage for event list and active heap."
    },
    "workedExample": {
      "title": "Meeting Rooms II for [[0, 30], [5, 10], [15, 20]]",
      "input": "3 meetings",
      "steps": [
        {
          "step": 1,
          "action": "Event List",
          "state": "[(0, +1), (5, +1), (10, -1), (15, +1), (20, -1), (30, -1)]",
          "explanation": "Starts and ends separated."
        },
        {
          "step": 2,
          "action": "Sweep t=0",
          "state": "active = 1",
          "explanation": "Meeting 1 starts."
        },
        {
          "step": 3,
          "action": "Sweep t=5",
          "state": "active = 2 (Peak!)",
          "explanation": "Meeting 2 starts."
        },
        {
          "step": 4,
          "action": "Sweep t=10",
          "state": "active = 1",
          "explanation": "Meeting 2 ends."
        },
        {
          "step": 5,
          "action": "Sweep t=15",
          "state": "active = 2 (Peak!)",
          "explanation": "Meeting 3 starts."
        }
      ],
      "finalOutput": "Minimum rooms needed = max_active = 2"
    },
    "visualExplanation": {
      "title": "Vertical Line Sweeping Across Timeline",
      "description": "Visualizing vertical scanning line advancing across horizontal interval bars.",
      "features": [
        "Vertical line sweeps left-to-right",
        "Counter tracks how many horizontal bars the line cuts through simultaneously"
      ]
    },
    "pseudocode": {
      "title": "Sweep-Line Meeting Rooms II",
      "code": "function minMeetingRooms(intervals):\n    events = []\n    for s, e in intervals:\n        events.append((s, 1))\n        events.append((e, -1))\n    sort(events by time, ties: endings (-1) before starts (1))\n    max_rooms = 0\n    curr = 0\n    for time, delta in events:\n        curr += delta\n        max_rooms = max(max_rooms, curr)\n    return max_rooms"
    },
    "pythonCode": {
      "title": "Python Meeting Rooms II & Skyline Sweep Line",
      "code": "import heapq\n\ndef min_meeting_rooms(intervals: list[list[int]]) -> int:\n    events = []\n    for s, e in intervals:\n        events.append((s, 1))   # Meeting starts: +1 room\n        events.append((e, -1))  # Meeting ends: -1 room\n\n    # Sort by time; tie-breaker puts -1 (end) before +1 (start)\n    events.sort(key=lambda x: (x[0], x[1]))\n\n    max_rooms = 0\n    curr_rooms = 0\n    for time, delta in events:\n        curr_rooms += delta\n        max_rooms = max(max_rooms, curr_rooms)\n\n    return max_rooms",
      "explanation": "Decomposes intervals into discrete start (+1) and end (-1) point events."
    },
    "runnableCode": {
      "code": "print(min_meeting_rooms([[0, 30], [5, 10], [15, 20]])) # 2\nprint(min_meeting_rooms([[7, 10], [2, 4]]))              # 1",
      "expectedOutput": "2\n1"
    },
    "lineByLineExplanation": [
      {
        "line": 9,
        "lines": "9",
        "code": "events.sort(key=lambda x: (x[0], x[1]))",
        "codeSnippet": "events.sort(key=lambda x: (x[0], x[1]))",
        "explanation": "Ties: if meeting A ends at 10 and meeting B starts at 10, -1 comes before +1, correctly freeing the room before reusing it."
      },
      {
        "line": 14,
        "lines": "14",
        "code": "curr_rooms += delta",
        "codeSnippet": "curr_rooms += delta",
        "explanation": "Maintains running tally of overlapping active intervals."
      }
    ],
    "edgeCases": [
      {
        "case": "Zero intervals",
        "handling": "Returns 0.",
        "example": "intervals = []"
      },
      {
        "case": "Meeting ends at the exact same minute another starts",
        "handling": "Tie-breaker sorts -1 before +1, sharing the same room.",
        "example": "[1, 2], [2, 3]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Incorrect tie-breaking: placing start (+1) before end (-1) when times match",
        "solution": "If +1 comes before -1, an extra room is unnecessarily counted for a transition moment; always process endings first.",
        "codeExample": "events.sort(key=lambda x: (x[0], x[1])) # -1 < 1"
      }
    ],
    "applications": [
      {
        "industry": "Geographic Information Systems (GIS)",
        "application": "Map polygon union and intersection calculation",
        "benefit": "Merges overlapping geopolitical borders in O(n log n)."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-swl-1",
        "question": "How does The Skyline Problem utilize a sweep-line with a Max-Heap?",
        "hint": "Active heights.",
        "answer": "Store building heights in a Max-Heap as the sweep line moves left-to-right. Whenever the maximum height in the heap changes, a key corner point in the skyline is recorded."
      }
    ],
    "quiz": [
      {
        "id": "q-swl-1",
        "question": "In interval sweep-line algorithms, why should ending events (-1) be sorted before starting events (+1) at identical timestamps?",
        "options": [
          "To allow an ending meeting to vacate a room before a new meeting claims it",
          "Because Python sorts descending by default",
          "To save memory",
          "To prevent division by zero"
        ],
        "correctIndex": 0,
        "explanation": "Processing endings first frees up the room or resource at that exact timestamp so a starting interval can immediately reuse it."
      }
    ],
    "codingChallenge": {
      "title": "The Skyline Problem",
      "problem": "A city's skyline is the outer contour of silhouette formed by all buildings when viewed from a distance. Given buildings [left, right, height], return the key points that outline the skyline.",
      "hints": [
        "Create events: (L, -H) for start and (R, H) for end. Use a max-heap to track active heights."
      ],
      "starterCode": "import heapq\n\ndef get_skyline(buildings: list[list[int]]) -> list[list[int]]:\n    # TODO: Implement skyline sweep-line\n    pass",
      "solution": "import heapq\n\ndef get_skyline(buildings: list[list[int]]) -> list[list[int]]:\n    events = []\n    for l, r, h in buildings:\n        events.append((l, -h, r)) # Start event (negated height for max-heap tie-break)\n        events.append((r, 0, 0))   # End event\n    events.sort()\n    res = [[0, 0]]\n    live_heap = [(0, float('inf'))] # (neg_height, right_boundary)\n    for pos, neg_h, r in events:\n        while live_heap[0][1] <= pos:\n            heapq.heappop(live_heap)\n        if neg_h != 0:\n            heapq.heappush(live_heap, (neg_h, r))\n        curr_h = -live_heap[0][0]\n        if res[-1][1] != curr_h:\n            res.append([pos, curr_h])\n    return res[1:]"
    },
    "summary": {
      "keyTakeaways": [
        "Sweep-line reduces 2D geometric problems to sorted 1D events.",
        "Tie-break endings before starts to reuse capacity."
      ],
      "nextLessonId": "dsa-advanced-coordinate-compression",
      "nextLessonTitle": "Coordinate Compression",
      "nextLessonModuleId": "dsa-module-12"
    },
    "lineByLine": [
      {
        "line": 9,
        "lines": "9",
        "code": "events.sort(key=lambda x: (x[0], x[1]))",
        "codeSnippet": "events.sort(key=lambda x: (x[0], x[1]))",
        "explanation": "Ties: if meeting A ends at 10 and meeting B starts at 10, -1 comes before +1, correctly freeing the room before reusing it."
      },
      {
        "line": 14,
        "lines": "14",
        "code": "curr_rooms += delta",
        "codeSnippet": "curr_rooms += delta",
        "explanation": "Maintains running tally of overlapping active intervals."
      }
    ]
  },
  "dsa-advanced-coordinate-compression": {
    "id": "dsa-advanced-coordinate-compression",
    "moduleId": "dsa-module-12",
    "title": "Coordinate Compression",
    "subtitle": "Mapping Massive Sparse Ranges to Compact Dense Ranks [0..k-1]",
    "order": 5,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Define Coordinate Compression: preserving relative ordering while shrinking domain size.",
      "Map huge numerical intervals (e.g. coordinates up to 10^9) to small ranks [0..k-1] with k <= n.",
      "Enable Segment Trees, Fenwick Trees, and DP grids on sparse massive coordinates.",
      "Implement compression via `sorted(set(nums))` and binary search mapping."
    ],
    "prerequisites": [
      "Arrays and Matrices: Prefix Sums",
      "Fenwick Tree (Binary Indexed Tree)"
    ],
    "analogy": {
      "title": "Assigning Podium Finishes in a Marathon",
      "text": "In a marathon, runner #12,893,421 finishes in 2 hours, runner #89,321,094 finishes in 2.5 hours, and runner #99,999,999 finishes in 3 hours. On the medal podium, we don't build a stage with 100 million steps; we simply assign them 1st Place, 2nd Place, and 3rd Place.",
      "metaphor": "Coordinate compression maps sparse astronomical values to compact consecutive ranks."
    },
    "problemSolved": {
      "title": "Running Array-Indexed Algorithms on Gigantic Coordinates",
      "description": "Fenwick and Segment Trees index memory by coordinate value. If coordinates range from 1 to 1,000,000,000, allocating an array crashes with MemoryError. If there are only 1,000 points, coordinate compression maps them to indices [0..999], making it take under 4 KB.",
      "keyPoints": [
        "Shrinks domain from 10^9 to 10^5.",
        "Preserves relative < and > order relationships.",
        "Enables 2D range trees and count inversion algorithms."
      ]
    },
    "intuition": {
      "overview": "Extract all coordinates that matter. Remove duplicates with `set()`. Sort them. A dictionary or binary search `bisect_left` maps any original coordinate to its dense rank index in O(log k).",
      "steps": [
        {
          "step": 1,
          "title": "Extract & Deduplicate",
          "description": "unique_vals = sorted(set(coords))"
        },
        {
          "step": 2,
          "title": "Build Rank Map",
          "description": "rank = {val: i for i, val in enumerate(unique_vals)}"
        },
        {
          "step": 3,
          "title": "Replace Coordinates",
          "description": "compressed_x = rank[x]"
        }
      ]
    },
    "formalDefinition": {
      "text": "Let X = \\{x_1, x_2, ..., x_n\\} \\subset \\mathbb{R}. Coordinate compression is a strictly monotonic order-preserving bijection f: X \\to \\{0, 1, ..., |X| - 1\\} where f(a) < f(b) \\iff a < b.",
      "latex": "f(x) = |\\{y \\in X : y < x\\}| \\implies \\text{Domain}(f) \\subseteq [0, n - 1]"
    },
    "complexity": {
      "overview": "Time: O(n log n) sorting. Space: O(n) rank map.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Sorting distinct values."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Hash map lookup in O(1)."
        },
        {
          "case": "Worst",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "All coordinates unique."
        }
      ],
      "spaceNote": "O(n) storage for mapped ranks."
    },
    "workedExample": {
      "title": "Compressing Coordinates [1000000, 5, 1000000, 200, 5]",
      "input": "coords = [1000000, 5, 1000000, 200, 5]",
      "steps": [
        {
          "step": 1,
          "action": "Deduplicate & Sort",
          "state": "unique = [5, 200, 1000000]",
          "explanation": "3 unique values."
        },
        {
          "step": 2,
          "action": "Map ranks",
          "state": "5 -> 0, 200 -> 1, 1000000 -> 2",
          "explanation": "Ranks assigned."
        },
        {
          "step": 3,
          "action": "Transform array",
          "state": "[2, 0, 2, 1, 0]",
          "explanation": "Array now fits in size 3 buffer."
        }
      ],
      "finalOutput": "Compressed: [2, 0, 2, 1, 0]"
    },
    "visualExplanation": {
      "title": "Sparse Axis Shrinkage",
      "description": "Visualizing a vast empty number line compressing like an accordion into dense contiguous ranks.",
      "features": [
        "Empty gaps between distant points collapsed",
        "Relative order 5 < 200 < 1,000,000 preserved"
      ]
    },
    "pseudocode": {
      "title": "Coordinate Compression Pattern",
      "code": "function compress(coords):\n    unique = sorted(list(set(coords)))\n    rank = hash_map()\n    for i from 0 to len(unique) - 1:\n        rank[unique[i]] = i\n    return [rank[x] for x in coords]"
    },
    "pythonCode": {
      "title": "Python Coordinate Compression Utility",
      "code": "import bisect\n\ndef compress_coordinates(nums: list[int]) -> tuple[list[int], list[int]]:\n    unique = sorted(set(nums))\n    rank_map = {val: i for i, val in enumerate(unique)}\n    compressed = [rank_map[x] for x in nums]\n    return compressed, unique\n\ndef get_rank_bisect(val: int, unique_sorted: list[int]) -> int:\n    # O(log k) binary search rank retrieval without hash map\n    return bisect.bisect_left(unique_sorted, val)",
      "explanation": "Compresses coordinates into consecutive ranks [0..k-1] using set sorting."
    },
    "runnableCode": {
      "code": "compressed, mapping = compress_coordinates([1000000, 5, 1000000, 200, 5])\nprint(compressed) # [2, 0, 2, 1, 0]\nprint(mapping)    # [5, 200, 1000000]",
      "expectedOutput": "[2, 0, 2, 1, 0]\n[5, 200, 1000000]"
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "unique = sorted(set(nums))",
        "codeSnippet": "unique = sorted(set(nums))",
        "explanation": "Extracts distinct values and sorts them ascending in O(n log n) time."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "rank_map = {val: i for i, val in enumerate(unique)}",
        "codeSnippet": "rank_map = {val: i for i, val in enumerate(unique)}",
        "explanation": "Maps each distinct original number to its dense 0-indexed rank."
      }
    ],
    "edgeCases": [
      {
        "case": "All identical elements",
        "handling": "unique has length 1; all compress to 0.",
        "example": "[100, 100, 100] -> [0, 0, 0]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to retain original coordinates when real lengths are needed (e.g. rectangle areas)",
        "solution": "Store the mapping array unique so you can calculate original distances unique[r] - unique[l].",
        "codeExample": "real_length = mapping[r] - mapping[l]"
      }
    ],
    "applications": [
      {
        "industry": "Data Visualization",
        "application": "2D rectangle area calculation (Rectangle Area II)",
        "benefit": "Compresses 10^9 coordinate boxes onto a 1000x1000 grid."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-comp-1",
        "question": "How is coordinate compression combined with a Fenwick Tree to count inversions?",
        "hint": "Rank elements first.",
        "answer": "Replace array elements with their rank [1..k]. Then query and update a Fenwick Tree of size k in O(n log k) time."
      }
    ],
    "quiz": [
      {
        "id": "q-comp-1",
        "question": "What is the primary purpose of Coordinate Compression?",
        "options": [
          "To map massive sparse values (e.g. up to 10^9) to dense consecutive ranks [0..k-1] while preserving relative order",
          "To round floating point numbers to integers",
          "To sort arrays in descending order",
          "To encrypt data"
        ],
        "correctIndex": 0,
        "explanation": "It reduces the domain size to the number of distinct elements, allowing array-indexed structures like Fenwick trees to fit in RAM."
      }
    ],
    "codingChallenge": {
      "title": "Rank Transform of an Array",
      "problem": "Given an array of integers arr, replace each element with its rank. Rank starts from 1. If two elements are equal, their rank must be the same.",
      "hints": [
        "Direct application of coordinate compression with 1-based indexing."
      ],
      "starterCode": "def array_rank_transform(arr: list[int]) -> list[int]:\n    # TODO: Transform array into ranks\n    pass",
      "solution": "def array_rank_transform(arr: list[int]) -> list[int]:\n    rank_map = {v: i + 1 for i, v in enumerate(sorted(set(arr)))}\n    return [rank_map[x] for x in arr]"
    },
    "summary": {
      "keyTakeaways": [
        "Coordinate compression maps sparse values to compact dense ranks.",
        "Essential prerequisite for Segment Trees and Fenwick Trees on large numerical domains."
      ],
      "nextLessonId": "dsa-advanced-trie-applications",
      "nextLessonTitle": "Advanced Trie Applications",
      "nextLessonModuleId": "dsa-module-12"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "unique = sorted(set(nums))",
        "codeSnippet": "unique = sorted(set(nums))",
        "explanation": "Extracts distinct values and sorts them ascending in O(n log n) time."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "rank_map = {val: i for i, val in enumerate(unique)}",
        "codeSnippet": "rank_map = {val: i for i, val in enumerate(unique)}",
        "explanation": "Maps each distinct original number to its dense 0-indexed rank."
      }
    ]
  },
  "dsa-advanced-trie-applications": {
    "id": "dsa-advanced-trie-applications",
    "moduleId": "dsa-module-12",
    "title": "Advanced Trie Applications",
    "subtitle": "Binary Bitwise Tries, Maximum XOR of Two Numbers, and Autocomplete Systems",
    "order": 6,
    "readTimeMinutes": 24,
    "difficulty": "Advanced",
    "visualizerType": "trie",
    "objectives": [
      "Construct Binary Bitwise Tries where each node branches on bit 0 or bit 1.",
      "Solve Maximum XOR of Two Numbers in an Array in O(n * 32) = O(n) time.",
      "Build production Autocomplete and Typeahead prefix search engines.",
      "Implement Wildcard Pattern Matching on tries with \".\" regex dots."
    ],
    "prerequisites": [
      "Strings and Hashing: Tries",
      "Advanced Algorithms: Bit Manipulation"
    ],
    "analogy": {
      "title": "The Greedy Binary GPS Navigator",
      "text": "To maximize XOR, you want opposing bits (1 XOR 0 = 1). When driving down a fork in a Binary Trie representing 32-bit numbers, you look at your current bit. If your bit is 1, you greedily steer down the \"0\" branch if it exists; if your bit is 0, you greedily steer down the \"1\" branch to maximize the resulting number.",
      "metaphor": "A bitwise trie allows making greedy bit-level routing decisions in O(32) time."
    },
    "problemSolved": {
      "title": "Solving Bitwise XOR Extremes in Strictly Linear Time",
      "description": "Finding the maximum XOR pair naively requires comparing all pairs in O(n²). A 32-bit Binary Trie finds the optimal complementary bit path for each number in O(32) = O(1) steps, bringing total runtime down to O(n).",
      "keyPoints": [
        "Binary trie branches on 0 and 1.",
        "Max XOR greedy choice: pick opposite bit at every level if available.",
        "Executes in O(32n) = O(n) linear time."
      ]
    },
    "intuition": {
      "overview": "Insert all numbers into a 32-bit binary trie from most significant bit (bit 31) down to bit 0. For each number x, traverse trie: at bit b, look for opposite bit 1 - b. If opposite exists, take it and set bit b in result to 1.",
      "steps": [
        {
          "step": 1,
          "title": "Insert into Binary Trie",
          "description": "Insert binary representation of each number into trie."
        },
        {
          "step": 2,
          "title": "Greedy Bit Traversal",
          "description": "At bit i, desired = 1 - current_bit. If desired in curr.children, branch to desired; else branch to current_bit."
        },
        {
          "step": 3,
          "title": "Accumulate XOR",
          "description": "If desired branch was taken, add (1 << i) to maximum XOR value."
        }
      ]
    },
    "formalDefinition": {
      "text": "For number x \\in [0, 2^{31}-1], its binary representation is \\sum_{i=0}^{30} b_i 2^i. Maximizing x \\oplus y greedily maximizes the highest possible bit positions first, which is guaranteed by \\sum_{j=0}^{i-1} 2^j < 2^i.",
      "latex": "\\max_{y} (x \\oplus y) \\implies \\text{Greedily choose } y_i = 1 - x_i \\text{ at each level } i"
    },
    "complexity": {
      "overview": "Time: O(32 * n) = O(n) linear. Space: O(32 * n) trie nodes.",
      "cases": [
        {
          "case": "Best",
          "time": "O(32n)",
          "space": "O(32n)",
          "explanation": "31 bits checked per number."
        },
        {
          "case": "Average",
          "time": "O(32n)",
          "space": "O(32n)",
          "explanation": "Strictly bounded."
        },
        {
          "case": "Worst",
          "time": "O(32n)",
          "space": "O(32n)",
          "explanation": "Linear in input size n."
        }
      ],
      "spaceNote": "Trie stores up to 32 nodes per integer."
    },
    "workedExample": {
      "title": "Maximum XOR with 3 (Binary 011) against Trie {3, 10, 5}",
      "input": "x = 3 (0011_2)",
      "steps": [
        {
          "step": 1,
          "action": "At bit 3 (x has 0)",
          "state": "Desired is 1 -> Branch exists (node 10 has 1010_2)",
          "explanation": "Take 1 branch! Result bit 3 is 1."
        },
        {
          "step": 2,
          "action": "At bit 2 (x has 0)",
          "state": "Desired is 1 -> No branch (10 has 0 at bit 2)",
          "explanation": "Must take 0 branch. Result bit 2 is 0."
        },
        {
          "step": 3,
          "action": "At bit 1 (x has 1)",
          "state": "Desired is 0 -> Branch exists (10 has 1 at bit 1, wait 10 is 1010: bit 1 is 1)",
          "explanation": "Follows opposite bit when possible."
        }
      ],
      "finalOutput": "Max XOR found in O(32) comparisons."
    },
    "visualExplanation": {
      "title": "Binary Trie Decision Tree",
      "description": "Visualizing binary tree where left branch is 0 and right branch is 1.",
      "features": [
        "Opposite bit navigation highlighted in green",
        "Guarantees highest possible magnitude XOR"
      ]
    },
    "pseudocode": {
      "title": "Maximum XOR using Binary Trie",
      "code": "class TrieNode:\n    children = [null, null] # 0 and 1\n\nfunction findMaximumXOR(nums):\n    root = new TrieNode()\n    for num in nums: insert(root, num)\n    max_xor = 0\n    for num in nums:\n        max_xor = max(max_xor, queryMaxXOR(root, num))\n    return max_xor"
    },
    "pythonCode": {
      "title": "Python Maximum XOR of Two Numbers",
      "code": "class BinaryTrieNode:\n    def __init__(self):\n        self.children = {} # 0 or 1\n\ndef find_maximum_xor(nums: list[int]) -> int:\n    root = BinaryTrieNode()\n    \n    # 1. Insert all numbers into 31-bit Binary Trie\n    for num in nums:\n        curr = root\n        for i in range(30, -1, -1):\n            bit = (num >> i) & 1\n            if bit not in curr.children:\n                curr.children[bit] = BinaryTrieNode()\n            curr = curr.children[bit]\n\n    # 2. Query maximum XOR for each number\n    max_xor = 0\n    for num in nums:\n        curr = root\n        curr_xor = 0\n        for i in range(30, -1, -1):\n            bit = (num >> i) & 1\n            desired_bit = 1 - bit\n            if desired_bit in curr.children:\n                curr_xor |= (1 << i)\n                curr = curr.children[desired_bit]\n            else:\n                curr = curr.children[bit]\n        max_xor = max(max_xor, curr_xor)\n\n    return max_xor",
      "explanation": "Constructs 31-bit Binary Trie and greedily matches opposite bits to maximize XOR."
    },
    "runnableCode": {
      "code": "print(find_maximum_xor([3, 10, 5, 25, 2, 8])) # 5 ^ 25 = 28",
      "expectedOutput": "28"
    },
    "lineByLineExplanation": [
      {
        "line": 22,
        "lines": "22",
        "code": "desired_bit = 1 - bit",
        "codeSnippet": "desired_bit = 1 - bit",
        "explanation": "Greedy choice: opposite bit (1 XOR 0 = 1) yields maximum value."
      },
      {
        "line": 24,
        "lines": "24",
        "code": "curr_xor |= (1 << i)",
        "codeSnippet": "curr_xor |= (1 << i)",
        "explanation": "If opposite bit branch exists, sets the i-th bit of the resulting XOR to 1."
      }
    ],
    "edgeCases": [
      {
        "case": "Single element array",
        "handling": "XOR of number with itself is 0.",
        "example": "[42] -> 0"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Iterating bits from 0 up to 30 instead of 30 down to 0",
        "solution": "Greedy choice MUST prioritize most significant bits (MSB) first because 2^k > sum_{i=0}^{k-1} 2^i.",
        "codeExample": "for i in range(30, -1, -1): # MSB FIRST"
      }
    ],
    "applications": [
      {
        "industry": "Search Engines",
        "application": "Typeahead query suggestions and prefix auto-completion",
        "benefit": "Searches billions of prefixes in milliseconds."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-trie-1",
        "question": "How can you find Maximum XOR With an Element From Array where values are bounded by a query constraint queries[i] = [xi, mi] (elements <= mi)?",
        "hint": "Sort queries and numbers; insert into trie offline.",
        "answer": "Sort numbers and queries by threshold m. Add elements to trie incrementally as long as element <= mi, then query trie offline in O(1)."
      }
    ],
    "quiz": [
      {
        "id": "q-trie-1",
        "question": "Why does a Binary Bitwise Trie prioritize checking bits from 31 down to 0 (MSB first)?",
        "options": [
          "A single 1 at bit k outweighs all possible 1s from bit 0 to k-1 combined",
          "Tries can only read backwards",
          "CPUs read numbers right-to-left",
          "To prevent memory leaks"
        ],
        "correctIndex": 0,
        "explanation": "Because 2^k > 2^0 + 2^1 + ... + 2^{k-1}, securing a 1 at a higher bit is always mathematically superior to any combination of lower bits."
      }
    ],
    "codingChallenge": {
      "title": "Word Search II (Boggle with Trie)",
      "problem": "Given an m x n board of characters and a list of strings words, return all words on the board.",
      "hints": [
        "Store words in a Trie, then run DFS on board with trie node reference."
      ],
      "starterCode": "def find_words(board: list[list[str]], words: list[str]) -> list[str]:\n    # TODO: Implement Word Search II\n    pass",
      "solution": "def find_words(board: list[list[str]], words: list[str]) -> list[str]:\n    trie = {}\n    for word in words:\n        curr = trie\n        for ch in word:\n            curr = curr.setdefault(ch, {})\n        curr['$'] = word\n    rows, cols = len(board), len(board[0])\n    res = []\n    def dfs(r, c, parent):\n        ch = board[r][c]\n        curr = parent[ch]\n        if '$' in curr:\n            res.append(curr.pop('$'))\n        board[r][c] = '#'\n        for dr, dc in ((0,1), (0,-1), (1,0), (-1,0)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] in curr:\n                dfs(nr, nc, curr)\n        board[r][c] = ch\n        if not curr: parent.pop(ch)\n    for r in range(rows):\n        for c in range(cols):\n            if board[r][c] in trie:\n                dfs(r, c, trie)\n    return res"
    },
    "summary": {
      "keyTakeaways": [
        "Binary Tries solve bitwise XOR extremes in O(32n) = O(n) time.",
        "Always prioritize most significant bits first for greedy choices."
      ],
      "nextLessonId": "dsa-advanced-complexity-overview",
      "nextLessonTitle": "Computational Complexity Overview",
      "nextLessonModuleId": "dsa-module-12"
    },
    "lineByLine": [
      {
        "line": 22,
        "lines": "22",
        "code": "desired_bit = 1 - bit",
        "codeSnippet": "desired_bit = 1 - bit",
        "explanation": "Greedy choice: opposite bit (1 XOR 0 = 1) yields maximum value."
      },
      {
        "line": 24,
        "lines": "24",
        "code": "curr_xor |= (1 << i)",
        "codeSnippet": "curr_xor |= (1 << i)",
        "explanation": "If opposite bit branch exists, sets the i-th bit of the resulting XOR to 1."
      }
    ]
  },
  "dsa-advanced-complexity-overview": {
    "id": "dsa-advanced-complexity-overview",
    "moduleId": "dsa-module-12",
    "title": "Computational Complexity Overview",
    "subtitle": "P, NP, NP-Complete, Reductions, and Information-Theoretic Lower Bounds",
    "order": 7,
    "readTimeMinutes": 24,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Define complexity classes: P (polynomial time), NP (nondeterministic polynomial time), NP-Complete, and NP-Hard.",
      "Understand Cook-Levin Theorem and polynomial-time reductions (A \\le_p B).",
      "Recognize canonical NP-complete problems: 3-SAT, Vertex Cover, Clique, Subset Sum, and TSP.",
      "Identify approximation algorithms and heuristic techniques when exact polynomial solutions are impossible."
    ],
    "prerequisites": [
      "Time Complexity and Big-O",
      "Bitmask DP Introduction"
    ],
    "analogy": {
      "title": "Solving a Sudoku vs Verifying a Solution",
      "text": "Solving a 100x100 Sudoku puzzle from scratch could take months of difficult trial and error (finding the solution is hard). But if someone hands you a completed puzzle, you can check every row, column, and box in under 10 seconds to confirm if it is correct (verifying the solution is easy). This difference between finding and verifying is the core of P vs NP.",
      "metaphor": "P is the class of problems that are easy to SOLVE; NP is the class of problems that are easy to VERIFY."
    },
    "problemSolved": {
      "title": "Knowing When to Stop Searching for an Efficient Exact Algorithm",
      "description": "Proving that a problem is NP-complete proves that no polynomial-time algorithm is known to exist. This prevents software engineers from wasting months trying to design an impossible O(n) exact algorithm, redirecting effort to heuristics, approximations, or DP.",
      "keyPoints": [
        "P: Solvable in polynomial time O(n^k).",
        "NP: Verifiable in polynomial time given a certificate.",
        "NP-Complete: The hardest problems in NP; if any one is in P, then P = NP."
      ]
    },
    "intuition": {
      "overview": "To prove problem B is NP-hard: take a known NP-complete problem A (like 3-SAT), and show that any instance of A can be converted into an instance of B in polynomial time (reduction A <=_p B).",
      "steps": [
        {
          "step": 1,
          "title": "Verify in NP",
          "description": "Show candidate solution can be checked in O(n^k) time."
        },
        {
          "step": 2,
          "title": "Polynomial Reduction",
          "description": "Transform known NP-complete problem X into target problem Y."
        },
        {
          "step": 3,
          "title": "Equivalence Proof",
          "description": "Show X is solvable if and only if Y is solvable."
        }
      ]
    },
    "formalDefinition": {
      "text": "A language L \\in \\text{NP-Complete} if (1) L \\in \\text{NP}, and (2) \\forall L' \\in \\text{NP}, L' \\le_p L. The Millennium Prize problem asks whether \\text{P} = \\text{NP}.",
      "latex": "\\text{P} \\subseteq \\text{NP} \\subseteq \\text{PSPACE} \\subseteq \\text{EXPTIME}"
    },
    "complexity": {
      "overview": "Theoretical complexity classifications.",
      "cases": [
        {
          "case": "Best",
          "time": "P: O(n^k)",
          "space": "Polynomial",
          "explanation": "Solvable in polynomial time."
        },
        {
          "case": "Average",
          "time": "NP-Complete: O(2^n)",
          "space": "Polynomial",
          "explanation": "Exact solutions require exponential time unless P=NP."
        },
        {
          "case": "Worst",
          "time": "EXPTIME: O(2^{n^k})",
          "space": "Exponential",
          "explanation": "Intractable problems."
        }
      ],
      "spaceNote": "PSPACE represents problems solvable in polynomial space."
    },
    "workedExample": {
      "title": "Classifying Classic Algorithms",
      "input": "Algorithms inventory",
      "steps": [
        {
          "step": 1,
          "action": "Dijkstra Shortest Path",
          "state": "Class P",
          "explanation": "Solvable in O(E log V)."
        },
        {
          "step": 2,
          "action": "Minimum Spanning Tree",
          "state": "Class P",
          "explanation": "Solvable in O(E log V)."
        },
        {
          "step": 3,
          "action": "Traveling Salesperson (TSP)",
          "state": "NP-Complete",
          "explanation": "No known polynomial algorithm."
        },
        {
          "step": 4,
          "action": "0/1 Knapsack",
          "state": "NP-Complete",
          "explanation": "Pseudopolynomial in weight W."
        }
      ],
      "finalOutput": "Rigorous theoretical classification established."
    },
    "visualExplanation": {
      "title": "Euler Diagram of Complexity Classes",
      "description": "Visualizing concentric Venn diagrams: P nested in NP, intersecting NP-Complete, bounded by NP-Hard.",
      "features": [
        "Inner circle: P (efficiently solvable)",
        "Outer boundary: NP-Hard (outside NP verification)",
        "Intersection: NP-Complete"
      ]
    },
    "pseudocode": {
      "title": "2-Approximation for Vertex Cover (NP-Complete)",
      "code": "function approxVertexCover(edges):\n    cover = set()\n    while edges is not empty:\n        u, v = edges.pop()\n        cover.add(u)\n        cover.add(v)\n        # Remove all other edges incident to u or v\n        edges = [e for e in edges if e[0] not in (u,v) and e[1] not in (u,v)]\n    return cover # Guaranteed <= 2 * OPT"
    },
    "pythonCode": {
      "title": "Python Polynomial Verifier for 3-SAT",
      "code": "def verify_sat_certificate(formula: list[list[int]], assignment: dict[int, bool]) -> bool:\n    # Verifies in polynomial O(clauses) time whether assignment satisfies CNF formula\n    for clause in formula:\n        clause_satisfied = False\n        for lit in clause:\n            var = abs(lit)\n            val = assignment.get(var, False)\n            if lit < 0: val = not val\n            if val:\n                clause_satisfied = True\n                break\n        if not clause_satisfied:\n            return False\n    return True",
      "explanation": "Demonstrates polynomial-time verification of an NP certificate."
    },
    "runnableCode": {
      "code": "formula = [[1, -2, 3], [-1, 2, 3]] # (x1 or not x2 or x3) and (not x1 or x2 or x3)\ncert = {1: True, 2: True, 3: False}\nprint(verify_sat_certificate(formula, cert))",
      "expectedOutput": "True"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "for clause in formula:",
        "codeSnippet": "for clause in formula:",
        "explanation": "Checks each clause in O(1) operations."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "if not clause_satisfied: return False",
        "codeSnippet": "if not clause_satisfied: return False",
        "explanation": "If any clause evaluates to False, the certificate is invalid."
      }
    ],
    "edgeCases": [
      {
        "case": "Empty formula",
        "handling": "Vacuously satisfied (returns True).",
        "example": "formula = []"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Confusing NP-Complete with NP-Hard",
        "solution": "NP-Complete problems must be inside NP (verifiable in polynomial time); NP-Hard problems need not be in NP (e.g. Halting Problem is NP-Hard but undecidable).",
        "codeExample": "# NP-Complete = NP and NP-Hard"
      }
    ],
    "applications": [
      {
        "industry": "Theoretical Computer Science",
        "application": "Cryptographic security assumptions (RSA, ECC)",
        "benefit": "Relies on the computational hardness of mathematical problem classes."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-cco-1",
        "question": "What is a pseudopolynomial time algorithm?",
        "hint": "Recall 0/1 Knapsack.",
        "answer": "An algorithm whose runtime is polynomial in the numerical values of the input (e.g. O(n * W)), but exponential in the number of bits needed to represent those numbers."
      }
    ],
    "quiz": [
      {
        "id": "q-cco-1",
        "question": "What would happen if any NP-Complete problem is proven to be solvable in polynomial time?",
        "options": [
          "P = NP, meaning all problems in NP are solvable in polynomial time",
          "Only that one problem is solved",
          "Computers would stop working",
          "NP becomes empty"
        ],
        "correctIndex": 0,
        "explanation": "Because all problems in NP reduce to any NP-complete problem in polynomial time, solving one in polynomial time solves all of them."
      }
    ],
    "codingChallenge": {
      "title": "Partition to K Equal Sum Subsets (Backtracking with Pruning)",
      "problem": "Given an integer array nums and an integer k, return True if it is possible to divide this array into k non-empty subsets whose sums are all equal (NP-Complete).",
      "hints": [
        "Sort descending to fail fast; backtrack filling k buckets."
      ],
      "starterCode": "def can_partition_k_subsets(nums: list[int], k: int) -> bool:\n    # TODO: Partition into k subsets\n    pass",
      "solution": "def can_partition_k_subsets(nums: list[int], k: int) -> bool:\n    total = sum(nums)\n    if total % k != 0: return False\n    target = total // k\n    nums.sort(reverse=True)\n    if nums[0] > target: return False\n    subsets = [0] * k\n    def backtrack(idx):\n        if idx == len(nums): return True\n        for i in range(k):\n            if subsets[i] + nums[idx] <= target:\n                subsets[i] += nums[idx]\n                if backtrack(idx + 1): return True\n                subsets[i] -= nums[idx]\n            if subsets[i] == 0: break\n        return False\n    return backtrack(0)"
    },
    "summary": {
      "keyTakeaways": [
        "P is polynomial time solving; NP is polynomial time verifying.",
        "NP-Complete problems are the hardest problems in NP; exact algorithms take exponential time."
      ],
      "nextLessonId": "dsa-advanced-interview-patterns",
      "nextLessonTitle": "Interview Patterns and Problem-Solving Strategy",
      "nextLessonModuleId": "dsa-module-12"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "for clause in formula:",
        "codeSnippet": "for clause in formula:",
        "explanation": "Checks each clause in O(1) operations."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "if not clause_satisfied: return False",
        "codeSnippet": "if not clause_satisfied: return False",
        "explanation": "If any clause evaluates to False, the certificate is invalid."
      }
    ]
  },
  "dsa-advanced-interview-patterns": {
    "id": "dsa-advanced-interview-patterns",
    "moduleId": "dsa-module-12",
    "title": "Interview Patterns and Problem-Solving Strategy",
    "subtitle": "The 14 Fundamental Patterns, Mental Triggers, and Technical Interview Frameworks",
    "order": 8,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Synthesize the 14 essential LeetCode algorithmic patterns.",
      "Map problem problem statement keywords to candidate data structures in seconds.",
      "Execute the 5-step technical interview communication framework.",
      "Master proactive edge case identification and complexity derivation."
    ],
    "prerequisites": [
      "DSA Foundations",
      "Computational Complexity Overview"
    ],
    "analogy": {
      "title": "The Master Chess Player Recognizing Opening Patterns",
      "text": "A grandmaster chess player does not compute millions of random pawn moves from scratch. They instantly recognize \"The Sicilian Defense\" or \"The Queen's Gambit\" and execute a known strategic response. Similarly, a skilled software engineer recognizes \"contiguous subarray with condition\" and immediately reaches for Sliding Window.",
      "metaphor": "Mastering patterns transforms thousands of unique problems into 14 familiar blueprints."
    },
    "problemSolved": {
      "title": "Cracking Unfamiliar Technical Coding Challenges Under Pressure",
      "description": "Memorizing individual problems fails when interviewers vary constraints. Recognizing abstract algorithmic archetypes allows solving novel problems systematically on a whiteboard or online assessment.",
      "keyPoints": [
        "14 patterns cover >90% of technical coding interviews.",
        "Mental triggers map keywords to algorithms instantly.",
        "Structured 5-step communication guarantees clarity."
      ]
    },
    "intuition": {
      "overview": "Follow the 5-step framework: 1. Clarify constraints & inputs; 2. Propose brute force & establish baseline; 3. Identify pattern & optimize; 4. Write clean code; 5. Dry-run test cases and analyze Big-O.",
      "steps": [
        {
          "step": 1,
          "title": "Clarify Constraints",
          "description": "Ask: Can numbers be negative? Empty input? What is max n?"
        },
        {
          "step": 2,
          "title": "Pattern Recognition",
          "description": "Match keywords (sorted -> binary search/two pointers; top k -> heap; shortest path -> BFS)."
        },
        {
          "step": 3,
          "title": "Execution & Verification",
          "description": "Code modularly; test with normal, edge, and corner cases."
        }
      ]
    },
    "formalDefinition": {
      "text": "Algorithmic problem-solving is a mapping from problem specification P = (X, Y, C) to an optimal algorithm A such that T_A(n) \\le T_{\\text{limit}} and S_A(n) \\le S_{\\text{limit}}.",
      "latex": "n \\le 10^5 \\implies \\mathcal{O}(n \\log n) \\lor \\mathcal{O}(n), \\quad n \\le 10^3 \\implies \\mathcal{O}(n^2), \\quad n \\le 20 \\implies \\mathcal{O}(2^n)"
    },
    "complexity": {
      "overview": "Strategic cheat-sheet for mapping constraint n to allowable Big-O.",
      "cases": [
        {
          "case": "Best",
          "time": "n <= 10^9: O(log n) or O(1)",
          "space": "O(1)",
          "explanation": "Binary search, math, bit manipulation."
        },
        {
          "case": "Average",
          "time": "n <= 10^5: O(n) or O(n log n)",
          "space": "O(n)",
          "explanation": "Sorting, heaps, two pointers, sliding window, hash maps, trees, graphs."
        },
        {
          "case": "Worst",
          "time": "n <= 20: O(2^n) or O(n!)",
          "space": "O(n)",
          "explanation": "Backtracking, bitmask DP."
        }
      ],
      "spaceNote": "Always state time and auxiliary space complexities explicitly."
    },
    "workedExample": {
      "title": "Keyword-to-Pattern Decision Matrix",
      "input": "Problem keywords",
      "steps": [
        {
          "step": 1,
          "action": "\"Contiguous subarray, max/min sum/length\"",
          "state": "Sliding Window or Kadane's Algorithm",
          "explanation": "Window expansion."
        },
        {
          "step": 2,
          "action": "\"Sorted array, find pair\"",
          "state": "Two Pointers (converging from ends)",
          "explanation": "Eliminates quadratic scan."
        },
        {
          "step": 3,
          "action": "\"Top K / Most frequent K\"",
          "state": "Min-Heap of size K or Quickselect",
          "explanation": "Bounded priority queue."
        },
        {
          "step": 4,
          "action": "\"Shortest path, unweighted graph\"",
          "state": "Breadth-First Search (BFS)",
          "explanation": "Concentric wavefront."
        },
        {
          "step": 5,
          "action": "\"Number of ways / Maximize value with choices\"",
          "state": "Dynamic Programming",
          "explanation": "Subproblem caching."
        }
      ],
      "finalOutput": "Instant pattern classification"
    },
    "visualExplanation": {
      "title": "14 Patterns Roadmap Tree",
      "description": "Visualizing branching decision tree mapping problem constraints to data structures.",
      "features": [
        "Constraint boundaries (10^5 vs 10^3 vs 20)",
        "Direct arrows pointing to the 14 classic patterns"
      ]
    },
    "pseudocode": {
      "title": "The 5-Step Interview Protocol",
      "code": "// 1. Clarify: Ask about types, bounds, edge cases\n// 2. Brute Force: State simple O(n^2) approach first\n// 3. Optimize: Identify pattern (Heap, DP, Two Pointers)\n// 4. Implement: Write modular, readable code\n// 5. Dry-Run: Step through test case line-by-line"
    },
    "pythonCode": {
      "title": "Interview Template: Modular Solution with Test Suite",
      "code": "def solve_interview_problem(nums: list[int]) -> int:\n    \"\"\"\n    Finds the maximum subarray sum in O(n) time and O(1) space.\n    Algorithm: Kadane's Algorithm.\n    \"\"\"\n    if not nums:\n        return 0\n    max_so_far = nums[0]\n    curr_max = nums[0]\n    for x in nums[1:]:\n        curr_max = max(x, curr_max + x)\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far\n\n# Self-contained dry-run assertions\nassert solve_interview_problem([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6\nassert solve_interview_problem([1]) == 1\nassert solve_interview_problem([-5, -2, -1]) == -1\nprint(\"All interview test cases passed successfully!\")",
      "explanation": "Demonstrates clean coding style with inline docstrings and assertive unit tests."
    },
    "runnableCode": {
      "code": "solve_interview_problem([-2, 1, -3, 4, -1, 2, 1, -5, 4])",
      "expectedOutput": "6"
    },
    "lineByLineExplanation": [
      {
        "line": 6,
        "lines": "6",
        "code": "if not nums: return 0",
        "codeSnippet": "if not nums: return 0",
        "explanation": "Defensive programming: handles empty input gracefully."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "curr_max = max(x, curr_max + x)",
        "codeSnippet": "curr_max = max(x, curr_max + x)",
        "explanation": "Optimal Kadane decision: either start new subarray at x or extend existing subarray."
      }
    ],
    "edgeCases": [
      {
        "case": "All negative numbers",
        "handling": "curr_max handles negatives by picking the single largest negative number.",
        "example": "[-3, -2, -5] -> -2"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Jumping straight into coding without speaking",
        "solution": "Communicate your thought process out loud before writing a single line of code.",
        "codeExample": "# Always explain your plan first"
      }
    ],
    "applications": [
      {
        "industry": "Software Engineering Interviews",
        "application": "Technical interviews at FAANG / Tier-1 tech companies",
        "benefit": "Structures clear communication and flawless problem resolution."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-ip-1",
        "question": "If problem input size is n = 100,000, what is the maximum acceptable time complexity for an online assessment with a 2.0-second time limit?",
        "hint": "Computers do ~10^8 operations per second.",
        "answer": "O(n) or O(n log n). An O(n²) algorithm would perform 10^10 operations, which takes ~100 seconds and triggers Time Limit Exceeded (TLE)."
      }
    ],
    "quiz": [
      {
        "id": "q-ip-1",
        "question": "What algorithmic pattern is indicated by: \"Find the longest contiguous substring containing at most k distinct characters\"?",
        "options": [
          "Sliding Window with Hash Map",
          "Binary Search on Answer",
          "Topological Sort",
          "Monotonic Stack"
        ],
        "correctIndex": 0,
        "explanation": "\"Contiguous substring with condition\" is the signature hallmark of the Sliding Window pattern."
      }
    ],
    "codingChallenge": {
      "title": "Top K Frequent Elements (Full Pattern Showcase)",
      "problem": "Given an integer array nums and an integer k, return the k most frequent elements in O(n log k) or O(n) time.",
      "hints": [
        "Count frequencies with Counter, then use a min-heap of size k or bucket sort."
      ],
      "starterCode": "def top_k_frequent(nums: list[int], k: int) -> list[int]:\n    # TODO: Solve in O(n log k) or O(n)\n    pass",
      "solution": "import heapq\nfrom collections import Counter\n\ndef top_k_frequent(nums: list[int], k: int) -> list[int]:\n    counts = Counter(nums)\n    heap = []\n    for num, freq in counts.items():\n        heapq.heappush(heap, (freq, num))\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return [num for freq, num in heap]"
    },
    "summary": {
      "keyTakeaways": [
        "Map constraints (n) to allowable Big-O complexity before selecting an approach.",
        "Mastering the 14 core patterns enables solving novel problems systematically."
      ],
      "nextLessonId": "py-fundamentals-execution-model",
      "nextLessonTitle": "Python Execution Model",
      "nextLessonModuleId": "python-module-1"
    },
    "lineByLine": [
      {
        "line": 6,
        "lines": "6",
        "code": "if not nums: return 0",
        "codeSnippet": "if not nums: return 0",
        "explanation": "Defensive programming: handles empty input gracefully."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "curr_max = max(x, curr_max + x)",
        "codeSnippet": "curr_max = max(x, curr_max + x)",
        "explanation": "Optimal Kadane decision: either start new subarray at x or extend existing subarray."
      }
    ]
  }
};
