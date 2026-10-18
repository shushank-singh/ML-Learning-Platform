import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule2Data: DSAModuleData = {
  "id": "dsa-module-2",
  "number": 2,
  "title": "Arrays and Matrices",
  "subtitle": "Memory Layout, Traversal, Searching & Classic Patterns",
  "description": "Master the most fundamental data structure in programming. Learn how arrays map to memory, implement classic patterns like two pointers and sliding window, master binary search and its variants, and navigate two-dimensional matrix problems.",
  "icon": "Grid3x3",
  "badge": "Arrays",
  "estimatedHours": 8,
  "topicsCount": 9,
  "lessons": [
    {
      "id": "dsa-arrays-operations",
      "moduleId": "dsa-module-2",
      "title": "Array Operations and Memory Layout",
      "description": "How arrays are stored in contiguous memory, indexing, traversal, insertion, and deletion.",
      "order": 1,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-arrays-prefix-sums",
      "moduleId": "dsa-module-2",
      "title": "Prefix Sums and Difference Arrays",
      "description": "Preprocessing arrays for O(1) range-sum queries and efficient range-update operations.",
      "order": 2,
      "readTimeMinutes": 20,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-arrays-two-pointers",
      "moduleId": "dsa-module-2",
      "title": "Two Pointer Technique",
      "description": "Using two indices converging from both ends or moving together to solve O(n) problems.",
      "order": 3,
      "readTimeMinutes": 22,
      "visualizerType": "binary-search",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-arrays-sliding-window",
      "moduleId": "dsa-module-2",
      "title": "Sliding Window",
      "description": "Maintaining a dynamic subarray window to solve substring and subarray problems efficiently.",
      "order": 4,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-arrays-kadane",
      "moduleId": "dsa-module-2",
      "title": "Kadane's Algorithm — Maximum Subarray",
      "description": "Dynamic programming approach to find the contiguous subarray with the maximum sum in O(n).",
      "order": 5,
      "readTimeMinutes": 22,
      "visualizerType": "dp-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-arrays-binary-search",
      "moduleId": "dsa-module-2",
      "title": "Binary Search",
      "description": "Dividing the search space in half each step to find elements in O(log n) on sorted arrays.",
      "order": 6,
      "readTimeMinutes": 25,
      "visualizerType": "binary-search",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-arrays-binary-search-variations",
      "moduleId": "dsa-module-2",
      "title": "Binary Search Variations",
      "description": "Finding first/last occurrence, leftmost/rightmost bounds, and lower/upper bound patterns.",
      "order": 7,
      "readTimeMinutes": 28,
      "visualizerType": "binary-search",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-arrays-rotated",
      "moduleId": "dsa-module-2",
      "title": "Search in Rotated Sorted Arrays",
      "description": "Adapting binary search to handle arrays that have been rotated at an unknown pivot point.",
      "order": 8,
      "readTimeMinutes": 25,
      "visualizerType": "binary-search",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-arrays-matrix",
      "moduleId": "dsa-module-2",
      "title": "Matrix Traversal and Algorithms",
      "description": "Row/column traversal, spiral order, diagonal traversal, and matrix rotation algorithms.",
      "order": 9,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    }
  ]
};

export const dsaModule2Lessons: Record<string, DSALessonContent> = {
  "dsa-arrays-binary-search": {
    "id": "dsa-arrays-binary-search",
    "moduleId": "dsa-module-2",
    "title": "Binary Search",
    "subtitle": "Divide-and-Conquer Search on Sorted Sequences in O(log n)",
    "order": 6,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "binary-search",
    "objectives": [
      "Understand how binary search eliminates half of the search space with a single comparison",
      "Implement the canonical iterative two-pointer binary search bug-free",
      "Derive the O(log n) time complexity mathematically using the recurrence relation T(n) = T(n/2) + O(1)",
      "Handle critical boundary conditions: integer overflow in mid, low <= high termination, and off-by-one errors",
      "Recognize interview problem patterns that reduce to binary search on monotonic answer spaces"
    ],
    "prerequisites": [
      "Array indexing and contiguous memory layout",
      "Time complexity basics and Big O notation",
      "While loops and conditional branching"
    ],
    "analogy": {
      "title": "The Physical Dictionary and the Phone Book",
      "text": "Imagine searching for the word \"Quantum\" in an encyclopedic 2,000-page dictionary. You would never start on page 1 and read every entry sequentially — that would take 2,000 checks. Instead, you instinctively open the book near the exact middle, inspect the word on that page (say, \"Manticore\"), recognize that \"Quantum\" comes alphabetically after \"M\", and instantly tear away the entire first half of the book from your attention. In one single comparison, 1,000 pages are eliminated. You repeat this halving process: 1,000 becomes 500, then 250, 125, 62, 31, 15, 7, 3, 1. In at most 11 checks, you locate your exact word among 2,000 pages.",
      "metaphor": "Binary search is monotonic domain halving: each comparison provides one bit of directional information that cuts the candidate search space precisely in two."
    },
    "problemSolved": {
      "title": "From Linear O(n) Scans to Logarithmic O(log n) Retrieval",
      "description": "Linear search on an unsorted array takes O(n) comparisons. For an array of 1,000,000,000 items, linear search requires up to 1 billion operations, taking seconds of CPU time. Binary search leverages the sorting invariant to find any target in at most 30 comparisons.",
      "keyPoints": [
        "Linear search requires O(n) worst-case time because each check eliminates only 1 element",
        "Binary search requires sorted data, eliminating n/2 elements in a single comparison",
        "Logarithmic scaling: 1,000 items take ~10 checks; 1,000,000,000 items take ~30 checks",
        "Crucial algorithmic foundation for B-Trees, database indices, and monotonic optimization"
      ]
    },
    "intuition": {
      "overview": "Binary search maintains two boundary pointers (low and high) that define the currently active search window. By probing the exact midpoint, we determine which half contains the target.",
      "steps": [
        {
          "step": 1,
          "title": "Establish Search Invariant",
          "description": "Set low = 0 and high = len(arr) - 1. The invariant is: if target exists in arr, it MUST reside within indices [low..high]."
        },
        {
          "step": 2,
          "title": "Probe Midpoint Safely",
          "description": "Calculate mid = low + (high - low) // 2. Probing the center balances worst-case elimination equally between both sides."
        },
        {
          "step": 3,
          "title": "Evaluate Invariant & Shrink Window",
          "description": "If arr[mid] == target, return mid immediately. If arr[mid] < target, target must be to the right: set low = mid + 1. Otherwise set high = mid - 1."
        },
        {
          "step": 4,
          "title": "Termination Condition",
          "description": "When low > high, the search window has collapsed to empty set without finding a match. We conclude target is not present and return -1."
        }
      ]
    },
    "formalDefinition": {
      "text": "Given a sorted array A of n elements such that A[0] <= A[1] <= ... <= A[n-1], and a target value T, binary search computes the index i such that A[i] = T, or returns -1 if no such index exists, using at most floor(log2(n)) + 1 comparisons.",
      "latex": "T(n) = T(n/2) + O(1) \\implies T(n) = O(\\log n)"
    },
    "complexity": {
      "overview": "Binary search achieves optimal comparison complexity for comparison-based search in sorted arrays.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "The target element happens to be situated at the exact initial midpoint of the array."
        },
        {
          "case": "Average",
          "time": "O(log n)",
          "space": "O(1)",
          "explanation": "Target is located after halving the search space approximately (log2(n) - 1) times."
        },
        {
          "case": "Worst",
          "time": "O(log n)",
          "space": "O(1)",
          "explanation": "Target is at the leaf of the implicit search tree or is not present in the array (requires floor(log2(n)) + 1 probes)."
        }
      ],
      "spaceNote": "O(1) auxiliary space for the iterative two-pointer implementation. Recursive implementation requires O(log n) call-stack space."
    },
    "workedExample": {
      "title": "Searching for target = 23 in array [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]",
      "input": "arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target = 23 (n = 10)",
      "steps": [
        {
          "step": 1,
          "action": "Probe mid of [0..9]",
          "state": "low=0, high=9, mid=4 (arr[4]=16)",
          "explanation": "Compare arr[4]=16 with target 23. Since 16 < 23, target must be to the right. Discard [0..4], update low = 5."
        },
        {
          "step": 2,
          "action": "Probe mid of [5..9]",
          "state": "low=5, high=9, mid=7 (arr[7]=56)",
          "explanation": "Compare arr[7]=56 with target 23. Since 56 > 23, target must be to the left. Discard [7..9], update high = 6."
        },
        {
          "step": 3,
          "action": "Probe mid of [5..6]",
          "state": "low=5, high=6, mid=5 (arr[5]=23)",
          "explanation": "Compare arr[5]=23 with target 23. Exact match! Return index 5."
        }
      ],
      "finalOutput": "Target 23 located at index 5 in exactly 3 comparisons (instead of 6 linear checks)."
    },
    "visualExplanation": {
      "title": "Interactive Binary Search Simulator",
      "description": "The interactive visualizer above demonstrates array cell indexing, active low/mid/high pointers, and real-time graying-out of eliminated candidate halves.",
      "features": [
        "Color-coded low (blue), high (purple), and mid (violet) pointers",
        "Automatic dimming of the discarded half at each decision point",
        "Synchronized pseudocode highlighting the executing comparison line",
        "Custom array and target input support"
      ]
    },
    "pseudocode": {
      "title": "Standard Iterative Binary Search",
      "code": "function binarySearch(arr, target):\n    low = 0\n    high = length(arr) - 1\n\n    while low <= high:\n        mid = low + (high - low) // 2\n        \n        if arr[mid] == target:\n            return mid\n        else if arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n            \n    return -1"
    },
    "pythonCode": {
      "title": "Python from Scratch",
      "code": "def binary_search(arr: list[int], target: int) -> int:\n    \"\"\"Performs iterative binary search on a sorted list.\n    \n    Returns the index of target if found, otherwise -1.\n    Time Complexity: O(log n)\n    Space Complexity: O(1)\n    \"\"\"\n    low = 0\n    high = len(arr) - 1\n    \n    while low <= high:\n        # Use low + (high - low) // 2 to prevent integer overflow in fixed-width languages\n        mid = low + (high - low) // 2\n        \n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n            \n    return -1",
      "explanation": "Clean, type-annotated iterative implementation using integer division. Returns -1 when target does not exist."
    },
    "runnableCode": {
      "code": "def binary_search(arr, target):\n    low = 0\n    high = len(arr) - 1\n    \n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\n# Test suite\nnumbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nprint(\"Array:\", numbers)\nprint(\"Index of 23:\", binary_search(numbers, 23))  # Expected: 5\nprint(\"Index of 2 (first element):\", binary_search(numbers, 2))  # Expected: 0\nprint(\"Index of 91 (last element):\", binary_search(numbers, 91)) # Expected: 9\nprint(\"Index of 44 (not present):\", binary_search(numbers, 44))  # Expected: -1",
      "expectedOutput": "Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nIndex of 23: 5\nIndex of 2 (first element): 0\nIndex of 91 (last element): 9\nIndex of 44 (not present): -1"
    },
    "lineByLineExplanation": [
      {
        "line": "Lines 2-3",
        "lines": "Lines 2-3",
        "code": "low = 0; high = len(arr) - 1",
        "codeSnippet": "low = 0; high = len(arr) - 1",
        "explanation": "Initializes the search boundary to encompass the entire array."
      },
      {
        "line": "Line 5",
        "lines": "Line 5",
        "code": "while low <= high:",
        "codeSnippet": "while low <= high:",
        "explanation": "Loop condition must use <= because when low == high, exactly 1 candidate element remains that must still be checked."
      },
      {
        "line": "Line 6",
        "lines": "Line 6",
        "code": "mid = low + (high - low) // 2",
        "codeSnippet": "mid = low + (high - low) // 2",
        "explanation": "Computes midpoint avoiding 32-bit integer overflow (which occurs in C++/Java when low + high > 2^31 - 1)."
      },
      {
        "line": "Lines 7-8",
        "lines": "Lines 7-8",
        "code": "if arr[mid] == target: return mid",
        "codeSnippet": "if arr[mid] == target: return mid",
        "explanation": "Target found! Immediately exit and return the matching 0-indexed position."
      },
      {
        "line": "Lines 9-10",
        "lines": "Lines 9-10",
        "code": "elif arr[mid] < target: low = mid + 1",
        "codeSnippet": "elif arr[mid] < target: low = mid + 1",
        "explanation": "Since arr is sorted in ascending order and arr[mid] < target, all elements at indices <= mid are strictly less than target. Eliminate them by moving low past mid."
      },
      {
        "line": "Lines 11-12",
        "lines": "Lines 11-12",
        "code": "else: high = mid - 1",
        "codeSnippet": "else: high = mid - 1",
        "explanation": "arr[mid] > target, so all elements at indices >= mid are strictly greater than target. Eliminate them by moving high below mid."
      },
      {
        "line": "Line 13",
        "lines": "Line 13",
        "code": "return -1",
        "codeSnippet": "return -1",
        "explanation": "Search window has collapsed (low > high) without finding target. Return sentinel -1 indicating element is absent."
      }
    ],
    "edgeCases": [
      {
        "case": "Empty Array []",
        "handling": "high becomes -1, while loop low <= high (0 <= -1) evaluates false immediately, safely returns -1.",
        "example": "binary_search([], 5) -> -1"
      },
      {
        "case": "Single Element [X]",
        "handling": "low = 0, high = 0. mid = 0. One comparison determines match or miss.",
        "example": "binary_search([10], 10) -> 0; binary_search([10], 5) -> -1"
      },
      {
        "case": "Target Smaller Than All Elements",
        "handling": "high continuously decrements until high = -1, low stays 0, exits cleanly.",
        "example": "binary_search([10, 20, 30], 2) -> -1"
      },
      {
        "case": "Target Larger Than All Elements",
        "handling": "low continuously increments until low = len(arr), high stays len-1, exits cleanly.",
        "example": "binary_search([10, 20, 30], 99) -> -1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using while low < high instead of while low <= high",
        "solution": "When low == high, there is still 1 element left to inspect. With <, single-element arrays or targets at the final boundary are missed."
      },
      {
        "mistake": "Updating low = mid instead of low = mid + 1",
        "solution": "Causes an infinite loop when low and high differ by 1 and target is in the right half, because (low + high) // 2 rounds down to low."
      },
      {
        "mistake": "Applying binary search to an unsorted array",
        "solution": "Binary search fundamentally relies on the monotonic sorting property. On unsorted data, eliminating half of the elements causes false negatives."
      }
    ],
    "applications": [
      {
        "industry": "Database Systems",
        "application": "B-Tree & Index Page Lookup",
        "benefit": "Locating row record pointers in O(log n) disk-page blocks instead of full sequential table scans."
      },
      {
        "industry": "Operating Systems",
        "application": "Memory Page Table Search & Symbol Resolution",
        "benefit": "Quickly resolving virtual address ranges and library symbols in debug tables."
      },
      {
        "industry": "Algorithms & Competitive Programming",
        "application": "Binary Search on the Answer Space",
        "benefit": "Solving optimization problems by checking whether an answer X is feasible in monotonic validation space."
      }
    ],
    "practiceQuestions": [
      {
        "id": "bs-pq-1",
        "question": "What is the maximum number of comparisons binary search needs to find an element in a sorted array of 1,048,576 elements?",
        "hint": "1,048,576 is 2^20.",
        "answer": "21 comparisons (floor(log2(1,048,576)) + 1 = 20 + 1 = 21 comparisons in the worst case)."
      },
      {
        "id": "bs-pq-2",
        "question": "Why does the expression mid = (low + high) // 2 risk overflow in languages like C, C++, and Java?",
        "hint": "Think about what happens when low and high are both close to 2^31 - 1.",
        "answer": "If low and high are large (e.g. 1.5 billion each), low + high is 3 billion, which overflows signed 32-bit integer capacity (max 2,147,483,647) resulting in a negative number. Using low + (high - low) // 2 prevents this."
      },
      {
        "id": "bs-pq-3",
        "question": "How do you modify binary search to find the FIRST occurrence of a target in an array containing duplicates?",
        "hint": "When arr[mid] == target, do not return immediately.",
        "answer": "When arr[mid] == target, save mid as a candidate answer and continue searching left by setting high = mid - 1."
      }
    ],
    "quiz": [
      {
        "id": "bs-q-1",
        "question": "What is the required precondition for binary search to work correctly on an array?",
        "options": [
          "All elements must be distinct and positive",
          "The array must be sorted according to a consistent ordering relation",
          "The array size must be a power of 2",
          "The array must be stored in a linked list structure"
        ],
        "correctIndex": 1,
        "explanation": "Binary search requires the elements to be sorted so that comparing against mid reliably eliminates an entire half of the search space."
      },
      {
        "id": "bs-q-2",
        "question": "What is the worst-case time complexity of binary search on an array of size n?",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(n log n)"
        ],
        "correctIndex": 2,
        "explanation": "At each step, the search space is halved (n, n/2, n/4, ..., 1). The number of steps required to reduce n to 1 is log2(n), yielding O(log n) time."
      },
      {
        "id": "bs-q-3",
        "question": "If low = 6 and high = 7, what is mid = low + (high - low) // 2?",
        "options": [
          "5",
          "6",
          "7",
          "6.5"
        ],
        "correctIndex": 1,
        "explanation": "mid = 6 + (7 - 6) // 2 = 6 + 1 // 2 = 6 + 0 = 6."
      },
      {
        "id": "bs-q-4",
        "question": "What happens if we mistakenly update low = mid instead of low = mid + 1 when arr[mid] < target?",
        "options": [
          "The algorithm runs twice as fast",
          "The algorithm may enter an infinite loop when low and high differ by 1",
          "The algorithm will return the wrong index on duplicates",
          "No change, the behavior is identical"
        ],
        "correctIndex": 1,
        "explanation": "When high = low + 1, mid evaluates to low. If we set low = mid, low never advances, causing an infinite loop."
      }
    ],
    "codingChallenge": {
      "title": "Search Insert Position",
      "problem": "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.",
      "hints": [
        "Notice what low points to after the while loop terminates when the target is not found.",
        "When low > high, low is always at the smallest index where arr[index] > target."
      ],
      "starterCode": "def search_insert(nums: list[int], target: int) -> int:\n    # Write your O(log n) solution here\n    pass\n\n# Tests\nprint(search_insert([1, 3, 5, 6], 5)) # Expected: 2\nprint(search_insert([1, 3, 5, 6], 2)) # Expected: 1\nprint(search_insert([1, 3, 5, 6], 7)) # Expected: 4",
      "solution": "def search_insert(nums: list[int], target: int) -> int:\n    low = 0\n    high = len(nums) - 1\n    \n    while low <= high:\n        mid = low + (high - low) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n            \n    # When target is not found, low points to the exact insert position\n    return low"
    },
    "summary": {
      "keyTakeaways": [
        "Binary search solves search in O(log n) by dividing the problem space in half each comparison.",
        "Always use mid = low + (high - low) // 2 and while low <= high.",
        "When the target is not found, low points to the insertion point.",
        "Binary search extends beyond arrays to any monotonic boolean predicate function f(x)."
      ],
      "nextLessonId": "dsa-arrays-binary-search-variations",
      "nextLessonTitle": "Binary Search Variations",
      "nextLessonModuleId": "dsa-module-2"
    },
    "lineByLine": [
      {
        "line": "Lines 2-3",
        "lines": "Lines 2-3",
        "code": "low = 0; high = len(arr) - 1",
        "codeSnippet": "low = 0; high = len(arr) - 1",
        "explanation": "Initializes the search boundary to encompass the entire array."
      },
      {
        "line": "Line 5",
        "lines": "Line 5",
        "code": "while low <= high:",
        "codeSnippet": "while low <= high:",
        "explanation": "Loop condition must use <= because when low == high, exactly 1 candidate element remains that must still be checked."
      },
      {
        "line": "Line 6",
        "lines": "Line 6",
        "code": "mid = low + (high - low) // 2",
        "codeSnippet": "mid = low + (high - low) // 2",
        "explanation": "Computes midpoint avoiding 32-bit integer overflow (which occurs in C++/Java when low + high > 2^31 - 1)."
      },
      {
        "line": "Lines 7-8",
        "lines": "Lines 7-8",
        "code": "if arr[mid] == target: return mid",
        "codeSnippet": "if arr[mid] == target: return mid",
        "explanation": "Target found! Immediately exit and return the matching 0-indexed position."
      },
      {
        "line": "Lines 9-10",
        "lines": "Lines 9-10",
        "code": "elif arr[mid] < target: low = mid + 1",
        "codeSnippet": "elif arr[mid] < target: low = mid + 1",
        "explanation": "Since arr is sorted in ascending order and arr[mid] < target, all elements at indices <= mid are strictly less than target. Eliminate them by moving low past mid."
      },
      {
        "line": "Lines 11-12",
        "lines": "Lines 11-12",
        "code": "else: high = mid - 1",
        "codeSnippet": "else: high = mid - 1",
        "explanation": "arr[mid] > target, so all elements at indices >= mid are strictly greater than target. Eliminate them by moving high below mid."
      },
      {
        "line": "Line 13",
        "lines": "Line 13",
        "code": "return -1",
        "codeSnippet": "return -1",
        "explanation": "Search window has collapsed (low > high) without finding target. Return sentinel -1 indicating element is absent."
      }
    ]
  },
  "dsa-arrays-operations": {
    "id": "dsa-arrays-operations",
    "moduleId": "dsa-module-2",
    "title": "Array Operations and Memory Layout",
    "subtitle": "Contiguous Memory, Indexing Mathematics, Dynamic Resizing & Complexity",
    "order": 1,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Explain how arrays are physically laid out in contiguous memory addresses.",
      "Derive the O(1) random access formula: Address(arr[i]) = Base + i * Size.",
      "Analyze time complexity for insertion, deletion, and append in static vs dynamic arrays.",
      "Understand geometric doubling (growth factor 1.5x - 2x) and amortized O(1) insertion."
    ],
    "prerequisites": [
      "DSA Foundations",
      "Understanding computer memory bytes and pointers"
    ],
    "analogy": {
      "title": "Numbered Train Passenger Cabins",
      "text": "A bullet train has passenger cabins numbered consecutively 0 through 99 attached back-to-back. To reach cabin 42, the conductor doesn’t have to enter cabins 0 through 41 first; knowing that every cabin is exactly 10 meters long, they walk directly to 42 * 10 = 420 meters down the platform. However, squeezing a new cabin in between 20 and 21 requires uncoupling and physically rolling every subsequent cabin back by 10 meters.",
      "metaphor": "Direct indexing is walking straight to a cabin; insertion in the middle forces shifting every subsequent element."
    },
    "problemSolved": {
      "title": "Predictable and Ultrafast Constant-Time Access",
      "description": "Without arrays, accessing the N-th element of a collection would require following pointers sequentially (like in linked lists), taking O(n) time. Arrays leverage direct memory address calculation to retrieve or update any element in exactly O(1) time.",
      "keyPoints": [
        "Constant-time O(1) random read and write access",
        "Optimal hardware cache spatial locality due to contiguous memory storage",
        "Serves as the underlying physical memory buffer for Strings, Hash Tables, Heaps, and Dynamic Arrays"
      ]
    },
    "intuition": {
      "overview": "Because every element in a primitive array has identical byte size and sits sequentially in RAM, finding an element is purely arithmetic.",
      "steps": [
        {
          "step": 1,
          "title": "Base Address Allocation",
          "description": "OS reserves a contiguous chunk of memory starting at base pointer B."
        },
        {
          "step": 2,
          "title": "Offset Multiplication",
          "description": "To access index i, calculate offset = i * sizeof(datatype)."
        },
        {
          "step": 3,
          "title": "Direct Bus Dereference",
          "description": "CPU memory controller fetches the byte at address B + offset in a single bus cycle."
        }
      ]
    },
    "formalDefinition": {
      "text": "A one-dimensional array A is a contiguous collection of homogeneous data elements where the memory address of element A[i] is computed directly from base address B, element byte width w, and lower bound index c (typically 0).",
      "latex": "\\text{Loc}(A[i]) = B + (i - c) \\cdot w"
    },
    "complexity": {
      "overview": "Access/Update: O(1). Append (amortized): O(1). Insert/Delete at arbitrary index: O(n).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Random access by index or append when capacity remains."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Insertion or deletion at an arbitrary middle index requires shifting n/2 elements."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Inserting at index 0 shifts all n elements; resizing copies entire array to new memory block."
        }
      ],
      "spaceNote": "Dynamic arrays allocate extra capacity (typically 2x) resulting in O(n) space with overhead."
    },
    "workedExample": {
      "title": "Inserting an Element at Index 2 in an Array of Size 5",
      "input": "Array: [10, 20, 30, 40, 50], Insert 99 at index 2.",
      "steps": [
        {
          "step": 1,
          "action": "Shift from End",
          "state": "[10, 20, 30, 40, 50, _]",
          "explanation": "Move arr[4] (50) to index 5."
        },
        {
          "step": 2,
          "action": "Shift Downward",
          "state": "[10, 20, 30, 40, 40, 50]",
          "explanation": "Move arr[3] (40) to index 4."
        },
        {
          "step": 3,
          "action": "Shift Target Slot",
          "state": "[10, 20, 30, 30, 40, 50]",
          "explanation": "Move arr[2] (30) to index 3. Slot 2 is now vacant."
        },
        {
          "step": 4,
          "action": "Write New Element",
          "state": "[10, 20, 99, 30, 40, 50]",
          "explanation": "Insert 99 into index 2."
        }
      ],
      "finalOutput": "Array transformed to [10, 20, 99, 30, 40, 50] after 3 shifts."
    },
    "visualExplanation": {
      "title": "Contiguous RAM Block vs Element Shifting",
      "description": "Visualizing cells 0x1000, 0x1004, 0x1008... Insertion requires a cascading rightward copy before the new value can be deposited into the vacated cell.",
      "features": [
        "Contiguous memory addresses",
        "Vacating a slot via backward shifting",
        "Array reallocation on capacity limit"
      ]
    },
    "pseudocode": {
      "title": "Array Insert at Position",
      "code": "def insert_at(arr, size, capacity, index, value):\n    if size >= capacity:\n        resize_array(arr)\n    for i from size down to index + 1:\n        arr[i] = arr[i - 1] # Shift right\n    arr[index] = value\n    return size + 1"
    },
    "pythonCode": {
      "title": "Simulating Array Insertion and Shifting Manually in Python",
      "code": "def manual_insert(arr, index, value):\n    arr.append(None) # Expand container\n    for i in range(len(arr) - 1, index, -1):\n        arr[i] = arr[i - 1] # Shift right\n    arr[index] = value\n    return arr\n\nsample = [10, 20, 30, 40, 50]\nprint(\"Before:\", sample)\nmanual_insert(sample, 2, 99)\nprint(\"After inserting 99 at index 2:\", sample)",
      "explanation": "Explicitly illustrates the O(n - index) shift operations that happen under the hood in CPython list.insert()."
    },
    "runnableCode": {
      "code": "arr = [1, 2, 3, 4, 5]\n# Direct O(1) access\nprint(\"Access index 3:\", arr[3])\n# Update O(1)\narr[3] = 99\nprint(\"Updated array:\", arr)\n# Deletion requires shifting remaining elements left\narr.pop(1)\nprint(\"After removing index 1:\", arr)",
      "expectedOutput": "Access index 3: 4\nUpdated array: [1, 2, 3, 99, 5]\nAfter removing index 1: [1, 3, 99, 5]"
    },
    "lineByLineExplanation": [
      {
        "line": "3",
        "lines": "3",
        "code": "print(\"Access index 3:\", arr[3])",
        "codeSnippet": "print(\"Access index 3:\", arr[3])",
        "explanation": "Direct pointer calculation retrieves item in O(1)."
      },
      {
        "line": "5",
        "lines": "5",
        "code": "arr[3] = 99",
        "codeSnippet": "arr[3] = 99",
        "explanation": "Overwrites 4-byte slot directly in O(1)."
      },
      {
        "line": "8",
        "lines": "8",
        "code": "arr.pop(1)",
        "codeSnippet": "arr.pop(1)",
        "explanation": "Removes index 1 and shifts elements 2, 3, 4 left by one position."
      }
    ],
    "edgeCases": [
      {
        "case": "Index Out of Range",
        "handling": "Raise IndexError when index >= size or index < -size.",
        "example": "arr[10] on array of size 5"
      },
      {
        "case": "Inserting at End (Append)",
        "handling": "No shifting needed; O(1) amortized.",
        "example": "insert at index == size"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming list.insert(0, val) is as fast as list.append(val).",
        "solution": "insert(0) is O(n) because it shifts all elements. Use collections.deque for O(1) prepends."
      },
      {
        "mistake": "Modifying an array while iterating over it.",
        "solution": "Iterate over a copy or iterate backwards to avoid skipped indices."
      }
    ],
    "applications": [
      {
        "industry": "Graphics & Gaming",
        "application": "Frame Buffers & Vertex Arrays",
        "benefit": "Direct pixel arrays rendered directly by GPU shaders via high-bandwidth memory access."
      },
      {
        "industry": "Machine Learning",
        "application": "Tensor Tensors & Matrices",
        "benefit": "NumPy arrays store raw C-contiguous memory blocks enabling SIMD vectorized instructions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-2-1-q1",
        "question": "If an integer array starts at memory address 1000 and each integer occupies 4 bytes, what is the address of arr[7]?",
        "hint": "Use Loc(A[i]) = Base + i * width.",
        "answer": "Address = 1000 + (7 * 4) = 1000 + 28 = 1028."
      },
      {
        "id": "dsa-2-1-q2",
        "question": "Why is dynamic array append considered amortized O(1) even though resizing takes O(n)?",
        "hint": "How often does resizing happen with geometric doubling?",
        "answer": "With 2x geometric growth, resizing to size N requires N copies, but happens only after N/2 cheap O(1) appends. The N copy cost spread over N/2 operations adds a constant 2 steps per append."
      },
      {
        "id": "dsa-2-1-q3",
        "question": "What is the time complexity to delete an element at index 0 from a Python list of length n?",
        "hint": "What happens to the remaining elements?",
        "answer": "O(n), because all n - 1 remaining elements must be shifted one position to the left in memory."
      }
    ],
    "quiz": [
      {
        "id": "dsa-2-1-quiz-1",
        "question": "What allows arrays to achieve O(1) random element access?",
        "options": [
          "Contiguous memory allocation and direct arithmetic address computation",
          "Hashing the index key with SHA-256",
          "Binary search trees connecting every element",
          "Asynchronous CPU threading"
        ],
        "correctIndex": 0,
        "explanation": "Because memory is contiguous and elements have identical byte widths, the CPU computes the target address in a single multiplication and addition."
      },
      {
        "id": "dsa-2-1-quiz-2",
        "question": "What is the time complexity of inserting an item at the beginning (index 0) of an array of length n?",
        "options": [
          "O(n)",
          "O(1)",
          "O(log n)",
          "O(n^2)"
        ],
        "correctIndex": 0,
        "explanation": "Inserting at the beginning requires moving all n existing elements one position to the right, which takes O(n) operations."
      },
      {
        "id": "dsa-2-1-quiz-3",
        "question": "When a dynamic array runs out of capacity, by what factor does it typically expand?",
        "options": [
          "A multiplicative factor (e.g. 1.5x or 2x)",
          "It adds a fixed constant 10 slots each time",
          "It grows by 1000x",
          "It never expands and raises an error"
        ],
        "correctIndex": 0,
        "explanation": "Geometric growth (e.g., 2x or 1.5x in CPython) ensures that resizing costs amortize to O(1) per append across sequence operations."
      }
    ],
    "codingChallenge": {
      "title": "Rotate Array in Place",
      "problem": "Given an array nums and an integer k, rotate the array to the right by k steps in-place with O(1) auxiliary space. For example, [1, 2, 3, 4, 5, 6, 7] with k=3 becomes [5, 6, 7, 1, 2, 3, 4].",
      "hints": [
        "Normalizing k = k % len(nums) avoids redundant full cycles.",
        "Reverse the entire array first.",
        "Reverse the first k elements, then reverse the remaining n - k elements."
      ],
      "starterCode": "def rotate_array(nums, k):\n    n = len(nums)\n    k = k % n\n    # Helper to reverse a subrange [start, end]\n    def reverse(start, end):\n        while start < end:\n            nums[start], nums[end] = nums[end], nums[start]\n            start += 1\n            end -= 1\n\n    # Three-step reversal algorithm\n    reverse(0, n - 1)\n    reverse(0, k - 1)\n    reverse(k, n - 1)\n    return nums\n\nprint(rotate_array([1, 2, 3, 4, 5, 6, 7], 3))",
      "solution": "def rotate_array(nums, k):\n    n = len(nums)\n    k = k % n\n    def reverse(start, end):\n        while start < end:\n            nums[start], nums[end] = nums[end], nums[start]\n            start += 1\n            end -= 1\n\n    reverse(0, n - 1)\n    reverse(0, k - 1)\n    reverse(k, n - 1)\n    return nums\n\nprint(rotate_array([1, 2, 3, 4, 5, 6, 7], 3))"
    },
    "summary": {
      "keyTakeaways": [
        "Arrays allocate contiguous memory blocks in RAM.",
        "Access by index is strictly O(1) via arithmetic calculation.",
        "Insertion and deletion in the middle require O(n) element shifts.",
        "Dynamic arrays achieve amortized O(1) appends through geometric capacity expansion."
      ],
      "nextLessonId": "dsa-arrays-prefix-sums",
      "nextLessonTitle": "Prefix Sums and Difference Arrays",
      "nextLessonModuleId": "dsa-module-2"
    },
    "lineByLine": [
      {
        "line": "3",
        "lines": "3",
        "code": "print(\"Access index 3:\", arr[3])",
        "codeSnippet": "print(\"Access index 3:\", arr[3])",
        "explanation": "Direct pointer calculation retrieves item in O(1)."
      },
      {
        "line": "5",
        "lines": "5",
        "code": "arr[3] = 99",
        "codeSnippet": "arr[3] = 99",
        "explanation": "Overwrites 4-byte slot directly in O(1)."
      },
      {
        "line": "8",
        "lines": "8",
        "code": "arr.pop(1)",
        "codeSnippet": "arr.pop(1)",
        "explanation": "Removes index 1 and shifts elements 2, 3, 4 left by one position."
      }
    ]
  },
  "dsa-arrays-prefix-sums": {
    "id": "dsa-arrays-prefix-sums",
    "moduleId": "dsa-module-2",
    "title": "Prefix Sums and Difference Arrays",
    "subtitle": "Preprocessing Arrays for O(1) Range Queries and O(1) Range Updates",
    "order": 2,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Construct 1D prefix sum arrays in O(n) preprocessing time.",
      "Execute range sum queries sum(L, R) in strictly O(1) time.",
      "Extend prefix sums to 2D matrices for submatrix area sum queries.",
      "Master difference arrays to perform multiple range update increments in O(1) time."
    ],
    "prerequisites": [
      "Array Operations and Memory Layout",
      "Basic cumulative summations"
    ],
    "analogy": {
      "title": "The Highway Mile Marker Mileage Log",
      "text": "A driver wants to know the distance between Mile Marker 45 and Mile Marker 120. Instead of measuring every mile one by one between the two exits, they subtract: 120 - 45 = 75 miles. The odometer maintains a continuous prefix sum of total miles traveled from the origin. Any trip segment between exit A and exit B is simply Odometer(B) - Odometer(A).",
      "metaphor": "Prefix sums turn cumulative queries into instant single subtraction operations."
    },
    "problemSolved": {
      "title": "Eliminating Redundant Range Sum Scans",
      "description": "If a database receives Q range sum queries on an array of size n, answering each query naively takes O(n) time, resulting in O(Q * n) total time. With prefix sums, we preprocess the array once in O(n) time, and then answer every subsequent query in O(1) time, bringing total complexity down to O(n + Q).",
      "keyPoints": [
        "Transforms O(n) query time into O(1) subtraction",
        "Extends naturally to 2D submatrix queries via Inclusion-Exclusion Principle",
        "Difference arrays enable bulk range increments in O(1) without looping"
      ]
    },
    "intuition": {
      "overview": "Prefix array P[i] stores the sum of all elements from index 0 to i-1. The sum from L to R is P[R+1] - P[L].",
      "steps": [
        {
          "step": 1,
          "title": "Build Prefix Array",
          "description": "P[0] = 0; P[i] = P[i-1] + arr[i-1] for i in 1..n."
        },
        {
          "step": 2,
          "title": "Query Execution",
          "description": "Range sum from L to R is computed as P[R+1] - P[L]."
        },
        {
          "step": 3,
          "title": "Difference Array Inversion",
          "description": "To increment [L, R] by V: diff[L] += V, diff[R+1] -= V, then prefix-sum diff."
        }
      ]
    },
    "formalDefinition": {
      "text": "Given an array A = [a0, a1, ..., an-1], its prefix sum array P of size n+1 is defined such that P[0] = 0 and P[i] = \\sum_{j=0}^{i-1} a_j. Any range sum \\sum_{k=L}^{R} a_k = P[R+1] - P[L].",
      "latex": "\\sum_{k=L}^{R} A[k] = P[R + 1] - P[L]"
    },
    "complexity": {
      "overview": "Preprocessing: O(n) time, O(n) auxiliary space. Query: O(1) time.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(n)",
          "explanation": "Range sum query answered via single subtraction."
        },
        {
          "case": "Average",
          "time": "O(1)",
          "space": "O(n)",
          "explanation": "Instant lookup regardless of range breadth."
        },
        {
          "case": "Worst",
          "time": "O(1)",
          "space": "O(n)",
          "explanation": "Boundary queries [0, n-1] complete in O(1)."
        }
      ],
      "spaceNote": "Can be done in-place inside the input array if modifying the original elements is allowed."
    },
    "workedExample": {
      "title": "Querying Range Sum on Array [3, 1, 4, 1, 5, 9, 2]",
      "input": "arr = [3, 1, 4, 1, 5, 9, 2], Query: sum of indices [2..5] (elements 4, 1, 5, 9)",
      "steps": [
        {
          "step": 1,
          "action": "Construct P",
          "state": "P = [0, 3, 4, 8, 9, 14, 23, 25]",
          "explanation": "P[i] = P[i-1] + arr[i-1]."
        },
        {
          "step": 2,
          "action": "Apply Formula",
          "state": "L = 2, R = 5 -> P[5 + 1] - P[2] = P[6] - P[2]",
          "explanation": "P[6] = 23 (sum of first 6 elements), P[2] = 4 (sum of first 2 elements)."
        },
        {
          "step": 3,
          "action": "Subtract",
          "state": "23 - 4 = 19",
          "explanation": "Direct verification: 4 + 1 + 5 + 9 = 19."
        }
      ],
      "finalOutput": "Sum of range [2..5] = 19 in O(1) time."
    },
    "visualExplanation": {
      "title": "Inclusion-Exclusion in 1D and 2D Prefix Sums",
      "description": "In 1D, subtracting the green prefix from the blue prefix leaves exactly the red target window. In 2D, Submatrix(r1, c1, r2, c2) = P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1].",
      "features": [
        "1D segment subtraction",
        "2D Inclusion-Exclusion area formula",
        "Difference array boundary impulse pairs"
      ]
    },
    "pseudocode": {
      "title": "Prefix Sum Class",
      "code": "class NumArray:\n    def __init__(self, nums):\n        self.P = [0] * (len(nums) + 1)\n        for i in range(len(nums)):\n            self.P[i + 1] = self.P[i] + nums[i]\n\n    def sumRange(self, L, R):\n        return self.P[R + 1] - self.P[L]"
    },
    "pythonCode": {
      "title": "Implementing Prefix Sum and Difference Array in Python",
      "code": "class RangeManager:\n    def __init__(self, nums):\n        self.n = len(nums)\n        self.P = [0] * (self.n + 1)\n        for i in range(self.n):\n            self.P[i + 1] = self.P[i] + nums[i]\n\n    def range_sum(self, L, R):\n        return self.P[R + 1] - self.P[L]\n\n# Demonstrate Difference Array\ndef apply_range_updates(n, updates):\n    # updates format: (L, R, val)\n    diff = [0] * (n + 1)\n    for L, R, val in updates:\n        diff[L] += val\n        if R + 1 < n:\n            diff[R + 1] -= val\n    # Reconstruct via prefix sum\n    res = [0] * n\n    res[0] = diff[0]\n    for i in range(1, n):\n        res[i] = res[i - 1] + diff[i]\n    return res\n\nrm = RangeManager([2, 4, 6, 8, 10])\nprint(\"Range sum [1..3] (4+6+8):\", rm.range_sum(1, 3))\nprint(\"Bulk updates on 5 zeroes:\", apply_range_updates(5, [(1, 3, 10), (2, 4, 5)]))",
      "explanation": "Demonstrates both O(1) prefix sum queries and O(1) difference array batch increments."
    },
    "runnableCode": {
      "code": "nums = [3, 1, 4, 1, 5, 9, 2]\nprefix = [0] * (len(nums) + 1)\nfor i, x in enumerate(nums):\n    prefix[i + 1] = prefix[i] + x\n\ndef query(L, R):\n    return prefix[R + 1] - prefix[L]\n\nprint(\"Sum [0..2]:\", query(0, 2))  # 3+1+4 = 8\nprint(\"Sum [2..5]:\", query(2, 5))  # 4+1+5+9 = 19",
      "expectedOutput": "Sum [0..2]: 8\nSum [2..5]: 19"
    },
    "lineByLineExplanation": [
      {
        "line": "2-4",
        "lines": "2-4",
        "code": "prefix = [0] * (len(nums) + 1)\nfor i, x in enumerate(nums):\n    prefix[i + 1] = prefix[i] + x",
        "codeSnippet": "prefix = [0] * (len(nums) + 1)\nfor i, x in enumerate(nums):\n    prefix[i + 1] = prefix[i] + x",
        "explanation": "Builds 1-indexed cumulative prefix sum array with base 0."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "def query(L, R):\n    return prefix[R + 1] - prefix[L]",
        "codeSnippet": "def query(L, R):\n    return prefix[R + 1] - prefix[L]",
        "explanation": "Subtracts prefix before L from prefix including R in O(1)."
      }
    ],
    "edgeCases": [
      {
        "case": "Single Element Range (L == R)",
        "handling": "P[L+1] - P[L] correctly returns nums[L].",
        "example": "L=2, R=2 -> P[3] - P[2]"
      },
      {
        "case": "Full Array Range (L == 0, R == n-1)",
        "handling": "P[n] - P[0] = Total sum.",
        "example": "L=0, R=n-1"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting the 1-based indexing offset and hitting off-by-one errors.",
        "solution": "Always size prefix array n+1 and set P[0] = 0."
      },
      {
        "mistake": "Using prefix sums when array elements undergo frequent live mutations.",
        "solution": "If elements are updated frequently, prefix sums require O(n) rebuilds. Use a Segment Tree or Fenwick Tree (Binary Indexed Tree) for O(log n) update and query."
      }
    ],
    "applications": [
      {
        "industry": "Computer Vision",
        "application": "Integral Images (Viola-Jones Face Detection)",
        "benefit": "Computes Haar-like rectangular feature sums in constant time O(1) regardless of box size."
      },
      {
        "industry": "Analytics Platforms",
        "application": "Financial Rolling Cumulative Revenue",
        "benefit": "Allows dashboards to calculate any custom date range revenue instantly."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-2-2-q1",
        "question": "Why does the prefix sum array use size n + 1 with index 0 initialized to 0?",
        "hint": "What happens when L = 0?",
        "answer": "It eliminates special-case branching when querying from index L = 0: P[R + 1] - P[0] cleanly evaluates to P[R + 1] - 0."
      },
      {
        "id": "dsa-2-2-q2",
        "question": "How many additions and subtractions are required to compute a 2D submatrix sum?",
        "hint": "Inclusion-Exclusion Principle.",
        "answer": "Exactly 4 operations: P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]."
      },
      {
        "id": "dsa-2-2-q3",
        "question": "When should a Difference Array be preferred over repeated element increments?",
        "hint": "Consider many updates followed by a single read at the end.",
        "answer": "When there are many range update operations (e.g. add 5 to range [L, R]) before the final array is queried. Each update takes O(1) in a difference array versus O(n) per update in a standard array."
      }
    ],
    "quiz": [
      {
        "id": "dsa-2-2-quiz-1",
        "question": "What is the time complexity of answering a range sum query on a precomputed prefix sum array?",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(R - L)"
        ],
        "correctIndex": 0,
        "explanation": "A range sum query requires exactly one array subtraction P[R + 1] - P[L], executing in strict O(1) time."
      },
      {
        "id": "dsa-2-2-quiz-2",
        "question": "In a difference array `diff`, what operations are performed to add value V to range [L, R]?",
        "options": [
          "diff[L] += V and diff[R + 1] -= V",
          "diff[L] += V for all elements from L to R",
          "diff[L] -= V and diff[R] += V",
          "diff[0] += V"
        ],
        "correctIndex": 0,
        "explanation": "Incrementing diff[L] increases all elements from L onward in the prefix reconstruction, while decrementing diff[R + 1] stops the increment from leaking past R."
      },
      {
        "id": "dsa-2-2-quiz-3",
        "question": "If array elements are continuously modified between queries, which data structure is preferred over static prefix sums?",
        "options": [
          "Fenwick Tree (Binary Indexed Tree)",
          "Linked List",
          "Hash Table",
          "Stack"
        ],
        "correctIndex": 0,
        "explanation": "A Fenwick Tree or Segment Tree supports both point updates and prefix sum queries in O(log n) time, resolving the O(n) update bottleneck of static prefix sums."
      }
    ],
    "codingChallenge": {
      "title": "Subarray Sum Equals K",
      "problem": "Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals k. Solve in O(n) time using prefix sums and a hash map.",
      "hints": [
        "The sum of a subarray nums[i..j] is prefix[j] - prefix[i-1].",
        "We want prefix[j] - prefix[i-1] == k, which rearranges to prefix[i-1] == prefix[j] - k.",
        "Store frequency of prefix sums encountered in a hash map as you iterate in O(n) time."
      ],
      "starterCode": "def subarray_sum(nums, k):\n    count = 0\n    current_sum = 0\n    # Map prefix_sum -> frequency\n    prefix_counts = {0: 1}\n\n    for x in nums:\n        current_sum += x\n        # If (current_sum - k) was seen before, those prefix points form valid subarrays\n        if current_sum - k in prefix_counts:\n            count += prefix_counts[current_sum - k]\n        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1\n\n    return count\n\nprint(subarray_sum([1, 1, 1], 2)) # Expected: 2 ([1,1] at index 0-1 and 1-2)",
      "solution": "def subarray_sum(nums, k):\n    count = 0\n    current_sum = 0\n    prefix_counts = {0: 1}\n\n    for x in nums:\n        current_sum += x\n        if current_sum - k in prefix_counts:\n            count += prefix_counts[current_sum - k]\n        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1\n\n    return count\n\nprint(subarray_sum([1, 1, 1], 2))"
    },
    "summary": {
      "keyTakeaways": [
        "Prefix sums turn O(n) range queries into O(1) single-step subtractions.",
        "Always use an n + 1 size buffer with P[0] = 0 to avoid index boundary checks.",
        "Difference arrays allow bulk range increments in O(1) time.",
        "Combining prefix sums with hash maps solves subarray sum problems in linear time."
      ],
      "nextLessonId": "dsa-arrays-two-pointers",
      "nextLessonTitle": "Two Pointer Technique",
      "nextLessonModuleId": "dsa-module-2"
    },
    "lineByLine": [
      {
        "line": "2-4",
        "lines": "2-4",
        "code": "prefix = [0] * (len(nums) + 1)\nfor i, x in enumerate(nums):\n    prefix[i + 1] = prefix[i] + x",
        "codeSnippet": "prefix = [0] * (len(nums) + 1)\nfor i, x in enumerate(nums):\n    prefix[i + 1] = prefix[i] + x",
        "explanation": "Builds 1-indexed cumulative prefix sum array with base 0."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "def query(L, R):\n    return prefix[R + 1] - prefix[L]",
        "codeSnippet": "def query(L, R):\n    return prefix[R + 1] - prefix[L]",
        "explanation": "Subtracts prefix before L from prefix including R in O(1)."
      }
    ]
  },
  "dsa-arrays-two-pointers": {
    "id": "dsa-arrays-two-pointers",
    "moduleId": "dsa-module-2",
    "title": "Two Pointer Technique",
    "subtitle": "Converging and Parallel Pointers for O(n) Search and Optimization",
    "order": 3,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "binary-search",
    "objectives": [
      "Master converging two-pointer patterns from opposite ends of a sorted array.",
      "Implement parallel (fast/slow) runner pointers for in-place deduplication.",
      "Solve Container With Most Water and Two Sum II in O(n) time and O(1) space.",
      "Prove correctness using monotonic invariant arguments."
    ],
    "prerequisites": [
      "Array Operations and Memory Layout",
      "Understanding sorted array monotonicity"
    ],
    "analogy": {
      "title": "Two Measuring Tapes Converging on a Field",
      "text": "Imagine two surveyors walking toward each other from opposite borders of a farm to find the center line. Instead of one person measuring every plot from left to right (an exhaustive scan), both walk inwards simultaneously. At each step, if the left measurement is too short, the left surveyor steps forward; if too long, the right surveyor steps back. They meet in the middle in linear time without taking a single redundant step.",
      "metaphor": "Two pointers prune an entire row or column of pairwise comparisons at each step using sorted monotonicity."
    },
    "problemSolved": {
      "title": "Reducing O(n^2) Pair Exhaustion to O(n) Single-Pass",
      "description": "Finding pairs that satisfy a condition (like summing to a target) naively requires testing all n(n-1)/2 pairs in O(n^2). When an array is sorted, the sum changes monotonically when moving left or right pointers, enabling an optimal O(n) single pass.",
      "keyPoints": [
        "Eliminates nested loops by utilizing order invariants",
        "Requires zero extra memory: strictly O(1) auxiliary space",
        "Underpins 3Sum, 4Sum, Trapping Rain Water, and partitioning"
      ]
    },
    "intuition": {
      "overview": "Start left pointer at 0 and right pointer at n - 1. Sum = arr[left] + arr[right]. If sum < target, left++ to increase sum. If sum > target, right-- to decrease sum.",
      "steps": [
        {
          "step": 1,
          "title": "Initialize Boundaries",
          "description": "left = 0, right = len(arr) - 1."
        },
        {
          "step": 2,
          "title": "Evaluate Invariant",
          "description": "Compare current pair evaluation against target threshold."
        },
        {
          "step": 3,
          "title": "Monotonic Adjustment",
          "description": "Increment left to strictly increase, decrement right to strictly decrease."
        },
        {
          "step": 4,
          "title": "Convergence Termination",
          "description": "Stop when left >= right."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let A be a monotonically non-decreasing array. The two-pointer search invariant ensures that at state (left, right), all pairs (i, j) with i < left or j > right cannot contain the optimal target solution, eliminating the search space in at most n steps.",
      "latex": "\\text{If } A[l] + A[r] < K \\implies \\forall j \\le r, A[l] + A[j] < K \\implies l \\leftarrow l + 1"
    },
    "complexity": {
      "overview": "Time: O(n) because each iteration increments left or decrements right. Space: O(1).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Boundary elements at 0 and n-1 immediately satisfy condition."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Pointers meet near middle after examining n/2 elements."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Pointers traverse entire array before meeting or exhausting search."
        }
      ],
      "spaceNote": "Does not allocate any auxiliary heap memory."
    },
    "workedExample": {
      "title": "Finding Target 9 in Sorted Array [2, 3, 5, 7, 11, 15]",
      "input": "arr = [2, 3, 5, 7, 11, 15], target = 9",
      "steps": [
        {
          "step": 1,
          "action": "Check Bounds",
          "state": "left=0 (2), right=5 (15) -> Sum = 17",
          "explanation": "17 > 9 -> Sum too large, decrement right."
        },
        {
          "step": 2,
          "action": "Step Leftward",
          "state": "left=0 (2), right=4 (11) -> Sum = 13",
          "explanation": "13 > 9 -> Sum too large, decrement right."
        },
        {
          "step": 3,
          "action": "Step Leftward",
          "state": "left=0 (2), right=3 (7) -> Sum = 9",
          "explanation": "9 == 9 -> Match! Return indices (0, 3) corresponding to elements 2 and 7."
        }
      ],
      "finalOutput": "Pair (2, 7) found in 3 iterations."
    },
    "visualExplanation": {
      "title": "Pointer Inward Motion",
      "description": "Visualizing pointer pins at the left and right extremities. Green arrow pushes left pointer rightward; red arrow pushes right pointer leftward. When they cross, all possible valid pairs have been evaluated.",
      "features": [
        "Opposite-end convergence",
        "Monotonic sum bounding",
        "In-place element swapping"
      ]
    },
    "pseudocode": {
      "title": "Two Sum II (Sorted)",
      "code": "def two_sum_sorted(arr, target):\n    left = 0\n    right = len(arr) - 1\n    while left < right:\n        s = arr[left] + arr[right]\n        if s == target:\n            return [left, right]\n        elif s < target:\n            left += 1\n        else:\n            right -= 1\n    return []"
    },
    "pythonCode": {
      "title": "Two Pointer Implementation for Two Sum II in Python",
      "code": "def two_sum_sorted(numbers, target):\n    l, r = 0, len(numbers) - 1\n    while l < r:\n        curr = numbers[l] + numbers[r]\n        if curr == target:\n            return [l + 1, r + 1] # 1-based index\n        elif curr < target:\n            l += 1\n        else:\n            r -= 1\n    return []\n\n# Test\nnums = [2, 7, 11, 15]\nprint(\"Indices for target 9:\", two_sum_sorted(nums, 9)) # Output: [1, 2]",
      "explanation": "Solves sorted Two Sum in O(n) time and O(1) space."
    },
    "runnableCode": {
      "code": "def is_palindrome(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not s[l].isalnum(): l += 1\n        while l < r and not s[r].isalnum(): r -= 1\n        if s[l].lower() != s[r].lower():\n            return False\n        l += 1\n        r -= 1\n    return True\n\nprint(\"Race a car:\", is_palindrome(\"Race a car\"))\nprint(\"A man, a plan, a canal: Panama:\", is_palindrome(\"A man, a plan, a canal: Panama\"))",
      "expectedOutput": "Race a car: False\nA man, a plan, a canal: Panama: True"
    },
    "lineByLineExplanation": [
      {
        "line": "2",
        "lines": "2",
        "code": "l, r = 0, len(s) - 1",
        "codeSnippet": "l, r = 0, len(s) - 1",
        "explanation": "Initialize two pointers at opposite ends of string."
      },
      {
        "line": "4-5",
        "lines": "4-5",
        "code": "while l < r and not s[l].isalnum(): l += 1",
        "codeSnippet": "while l < r and not s[l].isalnum(): l += 1",
        "explanation": "Skip non-alphanumeric punctuation on both ends."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "if s[l].lower() != s[r].lower(): return False",
        "codeSnippet": "if s[l].lower() != s[r].lower(): return False",
        "explanation": "If characters mismatch, string cannot be a palindrome."
      }
    ],
    "edgeCases": [
      {
        "case": "Array with duplicate values",
        "handling": "Pointers handle duplicates naturally or can skip them to avoid duplicate triplets (3Sum).",
        "example": "[2, 2, 3, 4, 4]"
      },
      {
        "case": "No solution exists",
        "handling": "Loop terminates when left == right, returning empty list.",
        "example": "target = 100 on [1, 2, 3]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Applying two-pointer sum technique on unsorted array.",
        "solution": "The technique relies on monotonicity. If unsorted, sort first O(n log n) or use a hash map O(n)."
      },
      {
        "mistake": "Using <= instead of < in while loop when distinct indices are required.",
        "solution": "left < right ensures the same element is not summed with itself."
      }
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "application": "Deduplication in Log Streams",
        "benefit": "Fast and slow pointer deduplicates sorted data in-place without memory allocation."
      },
      {
        "industry": "Media & Streaming",
        "application": "Container With Most Water",
        "benefit": "Optimizes dynamic bitrate buffering by maximizing bandwidth windows."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-2-3-q1",
        "question": "Why does Two Sum on an unsorted array favor Hash Map, while on a sorted array it favors Two Pointers?",
        "hint": "Consider sorting cost vs extra space.",
        "answer": "On unsorted data, a Hash Map achieves O(n) time and O(n) space. Sorting first takes O(n log n). If already sorted, Two Pointers achieves O(n) time with O(1) space, saving memory."
      },
      {
        "id": "dsa-2-3-q2",
        "question": "How does Container With Most Water decide which pointer to move?",
        "hint": "Area = (right - left) * min(height[left], height[right]).",
        "answer": "Always move the pointer with the smaller height. Moving the taller pointer cannot increase the area because width decreases and height is capped by the smaller wall."
      },
      {
        "id": "dsa-2-3-q3",
        "question": "What is the time complexity of 3Sum using the Two Pointer approach?",
        "hint": "Outer loop plus two-pointer inner scan.",
        "answer": "Sorting takes O(n log n). Outer loop runs n times; inner two-pointer scan takes O(n). Overall complexity is O(n^2)."
      }
    ],
    "quiz": [
      {
        "id": "dsa-2-3-quiz-1",
        "question": "What prerequisite MUST be satisfied to use converging two pointers for target sum search?",
        "options": [
          "The array must be sorted monotonically",
          "The array must have an even number of elements",
          "All elements must be positive",
          "The array must be stored in a linked list"
        ],
        "correctIndex": 0,
        "explanation": "The invariant relies on sorted order: incrementing left strictly increases the sum, and decrementing right strictly decreases the sum."
      },
      {
        "id": "dsa-2-3-quiz-2",
        "question": "In the Container With Most Water problem, which pointer should be moved at each step?",
        "options": [
          "The pointer pointing to the shorter vertical line",
          "The pointer pointing to the taller vertical line",
          "Both pointers simultaneously",
          "Always the left pointer"
        ],
        "correctIndex": 0,
        "explanation": "Moving the taller line guarantees an equal or smaller area because the width shrinks and the bottleneck remains the shorter line. Only moving the shorter line has a chance to increase area."
      },
      {
        "id": "dsa-2-3-quiz-3",
        "question": "What is the auxiliary space complexity of the Two Pointer approach for in-place array partitioning?",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(n^2)"
        ],
        "correctIndex": 0,
        "explanation": "Two pointers operate solely by swapping elements in-place with integer index registers, using strictly O(1) auxiliary memory."
      }
    ],
    "codingChallenge": {
      "title": "Container With Most Water",
      "problem": "Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container containing the most water. Return the maximum area.",
      "hints": [
        "Initialize pointers at extreme ends: l = 0, r = len(height) - 1.",
        "Area is width (r - l) multiplied by min(height[l], height[r]).",
        "Advance the pointer that points to the shorter vertical bar."
      ],
      "starterCode": "def max_area(height):\n    l, r = 0, len(height) - 1\n    max_w = 0\n    while l < r:\n        h = min(height[l], height[r])\n        area = h * (r - l)\n        max_w = max(max_w, area)\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return max_w\n\nprint(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])) # Expected: 49",
      "solution": "def max_area(height):\n    l, r = 0, len(height) - 1\n    max_w = 0\n    while l < r:\n        h = min(height[l], height[r])\n        area = h * (r - l)\n        max_w = max(max_w, area)\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return max_w\n\nprint(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))"
    },
    "summary": {
      "keyTakeaways": [
        "Two pointers convert O(n^2) pair searches into linear O(n) scans.",
        "Converging pointers require monotonic sorted structure.",
        "Fast and slow runners perform in-place array compaction in O(1) space.",
        "Container With Most Water advances the bottleneck (shorter) side."
      ],
      "nextLessonId": "dsa-arrays-sliding-window",
      "nextLessonTitle": "Sliding Window",
      "nextLessonModuleId": "dsa-module-2"
    },
    "lineByLine": [
      {
        "line": "2",
        "lines": "2",
        "code": "l, r = 0, len(s) - 1",
        "codeSnippet": "l, r = 0, len(s) - 1",
        "explanation": "Initialize two pointers at opposite ends of string."
      },
      {
        "line": "4-5",
        "lines": "4-5",
        "code": "while l < r and not s[l].isalnum(): l += 1",
        "codeSnippet": "while l < r and not s[l].isalnum(): l += 1",
        "explanation": "Skip non-alphanumeric punctuation on both ends."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "if s[l].lower() != s[r].lower(): return False",
        "codeSnippet": "if s[l].lower() != s[r].lower(): return False",
        "explanation": "If characters mismatch, string cannot be a palindrome."
      }
    ]
  },
  "dsa-arrays-sliding-window": {
    "id": "dsa-arrays-sliding-window",
    "moduleId": "dsa-module-2",
    "title": "Sliding Window Technique",
    "subtitle": "Dynamic and Fixed-Size Subarray Optimization in O(n) Time",
    "order": 4,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Distinguish between fixed-size and dynamic (variable-size) sliding windows.",
      "Maintain running window state (sum, character frequencies) in O(1) per step.",
      "Implement the expansion and contraction loop structure cleanly.",
      "Solve Longest Substring Without Repeating Characters and Minimum Window Substring."
    ],
    "prerequisites": [
      "Two Pointer Technique",
      "Hash Tables and Frequency Counting"
    ],
    "analogy": {
      "title": "The Magnifying Glass over a Newspaper",
      "text": "Imagine reading an article looking through a rectangular magnifying glass that shows 5 words at a time. To read the next sentence, you don’t pick up the glass, walk back to the start, and scan 6 words; you simply slide the glass one word to the right. You drop the word that rolled off the left edge, and add the new word that entered the right edge. All internal words remain in view without re-reading.",
      "metaphor": "Sliding window updates state incrementally at the boundaries rather than recomputing the whole window."
    },
    "problemSolved": {
      "title": "Avoiding Re-computation of Overlapping Subarrays",
      "description": "Examining all subarrays of size k naively takes O(k) per subarray, totaling O(n * k) or O(n^2). By reusing the intermediate sum and adjusting only the elements entering and exiting the window, sliding window solves problems in strict O(n) linear time.",
      "keyPoints": [
        "Drops redundant inner loops over overlapping elements",
        "Supports fixed-size windows (e.g. maximum sum of k elements)",
        "Supports variable-size windows (e.g. shortest subarray with sum >= S)"
      ]
    },
    "intuition": {
      "overview": "Expand window by moving right pointer and adding arr[right] to state. If state violates constraint, shrink window by incrementing left and removing arr[left] until valid.",
      "steps": [
        {
          "step": 1,
          "title": "Expand",
          "description": "Increment right pointer, incorporate element into state."
        },
        {
          "step": 2,
          "title": "Contract Condition",
          "description": "Check while condition is violated (or condition is satisfied for minimization)."
        },
        {
          "step": 3,
          "title": "Shrink",
          "description": "Remove arr[left] from state, increment left pointer."
        },
        {
          "step": 4,
          "title": "Record Metric",
          "description": "Update best window length or extremum value."
        }
      ]
    },
    "formalDefinition": {
      "text": "A sliding window defines a contiguous subsegment [L, R] of an array. At each step, either R increments (expanding the window) or L increments (contracting it). Because L and R both traverse from 0 to n monotonically, the total number of pointer movements is at most 2n, guaranteeing O(n) amortized running time.",
      "latex": "\\text{Cost} = \\sum_{R=0}^{n-1} \\mathcal{O}(1) + \\sum_{L=0}^{n-1} \\mathcal{O}(1) = \\mathcal{O}(n)"
    },
    "complexity": {
      "overview": "Time: O(n) amortized since each pointer moves at most n times. Space: O(k) where k is alphabet size or window hash map.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Single pass across array with fixed window."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(k)",
          "explanation": "Variable window expanding and contracting smoothly."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(min(n, m))",
          "explanation": "Window contracts at every step while updating frequency map."
        }
      ],
      "spaceNote": "Auxiliary memory depends on whether a frequency hash map is maintained."
    },
    "workedExample": {
      "title": "Finding Maximum Sum Subarray of Fixed Size K = 3 in [2, 1, 5, 1, 3, 2]",
      "input": "arr = [2, 1, 5, 1, 3, 2], k = 3",
      "steps": [
        {
          "step": 1,
          "action": "Initial Window",
          "state": "Sum of [2, 1, 5] = 8",
          "explanation": "Max sum = 8."
        },
        {
          "step": 2,
          "action": "Slide to [1, 5, 1]",
          "state": "Subtract 2, Add 1 -> 8 - 2 + 1 = 7",
          "explanation": "Max sum remains 8."
        },
        {
          "step": 3,
          "action": "Slide to [5, 1, 3]",
          "state": "Subtract 1, Add 3 -> 7 - 1 + 3 = 9",
          "explanation": "Max sum updated to 9."
        },
        {
          "step": 4,
          "action": "Slide to [1, 3, 2]",
          "state": "Subtract 5, Add 2 -> 9 - 5 + 2 = 6",
          "explanation": "Max sum remains 9."
        }
      ],
      "finalOutput": "Maximum sum of length 3 subarray is 9."
    },
    "visualExplanation": {
      "title": "The Sliding Caterpillar Mechanism",
      "description": "The right pointer inches forward like a caterpillar head, consuming elements. The left pointer contracts like the caterpillar tail, releasing elements. The window glides smoothly across the array in O(n) total operations.",
      "features": [
        "Fixed-width translation",
        "Dynamic expansion/shrinkage",
        "Incremental state deltas"
      ]
    },
    "pseudocode": {
      "title": "Dynamic Sliding Window Template",
      "code": "left = 0\nwindow_state = {}\nbest_result = 0\n\nfor right from 0 to len(arr) - 1:\n    add arr[right] to window_state\n    while window_is_invalid():\n        remove arr[left] from window_state\n        left += 1\n    best_result = update(best_result, right - left + 1)\nreturn best_result"
    },
    "pythonCode": {
      "title": "Longest Substring Without Repeating Characters in Python",
      "code": "def length_of_longest_substring(s):\n    char_index_map = {}\n    left = 0\n    max_len = 0\n\n    for right, ch in enumerate(s):\n        if ch in char_index_map and char_index_map[ch] >= left:\n            left = char_index_map[ch] + 1\n        char_index_map[ch] = right\n        max_len = max(max_len, right - left + 1)\n\n    return max_len\n\n# Test\nprint(\"pwwkew:\", length_of_longest_substring(\"pwwkew\")) # Expected: 3 (\"wke\")",
      "explanation": "Uses sliding window with a character position map to jump the left pointer forward in O(1)."
    },
    "runnableCode": {
      "code": "def min_subarray_len(target, nums):\n    left = 0\n    curr_sum = 0\n    min_len = float('inf')\n\n    for right in range(len(nums)):\n        curr_sum += nums[right]\n        while curr_sum >= target:\n            min_len = min(min_len, right - left + 1)\n            curr_sum -= nums[left]\n            left += 1\n\n    return min_len if min_len != float('inf') else 0\n\nprint(\"Min len for sum >= 7 in [2,3,1,2,4,3]:\", min_subarray_len(7, [2,3,1,2,4,3]))",
      "expectedOutput": "Min len for sum >= 7 in [2,3,1,2,4,3]: 2"
    },
    "lineByLineExplanation": [
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "for right in range(len(nums)):\n    curr_sum += nums[right]",
        "codeSnippet": "for right in range(len(nums)):\n    curr_sum += nums[right]",
        "explanation": "Expands window rightward by adding incoming element."
      },
      {
        "line": "8-11",
        "lines": "8-11",
        "code": "while curr_sum >= target:\n    min_len = min(min_len, right - left + 1)\n    curr_sum -= nums[left]\n    left += 1",
        "codeSnippet": "while curr_sum >= target:\n    min_len = min(min_len, right - left + 1)\n    curr_sum -= nums[left]\n    left += 1",
        "explanation": "Shrinks window from left as long as target sum condition is met, minimizing length."
      }
    ],
    "edgeCases": [
      {
        "case": "Array length smaller than window size k",
        "handling": "Return 0 or None immediately.",
        "example": "len(nums) < k"
      },
      {
        "case": "All elements identical",
        "handling": "Window expands and contracts correctly without crashing.",
        "example": "\"aaaaa\""
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Recomputing window sum from scratch inside loop: sum(arr[i:i+k]).",
        "solution": "This causes O(n * k) performance. Always add incoming and subtract outgoing element in O(1)."
      },
      {
        "mistake": "Forgetting to update left pointer index check in hash map jump.",
        "solution": "Ensure char_index_map[ch] >= left so old occurrences outside window are ignored."
      }
    ],
    "applications": [
      {
        "industry": "Networking",
        "application": "TCP Sliding Window Protocol",
        "benefit": "Controls packet flow and congestion by sliding sequence windows across network sockets."
      },
      {
        "industry": "Audio Processing",
        "application": "Fast Fourier Transform (STFT)",
        "benefit": "Slides overlapping Hamming windows over audio frames to analyze frequency spectrums over time."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-2-4-q1",
        "question": "Why is a while loop inside the for loop of a dynamic sliding window still O(n) overall?",
        "hint": "How many times can the left pointer increment?",
        "answer": "Even though there is a nested while loop, the left pointer only increments forward and never resets. It can increment at most n times across the entire execution, guaranteeing O(2n) = O(n) total steps."
      },
      {
        "id": "dsa-2-4-q2",
        "question": "How do you choose between Two Pointers and Sliding Window?",
        "hint": "Are we evaluating pairs or contiguous subarrays?",
        "answer": "Two Pointers typically evaluates pairs of elements (often from opposite ends of a sorted array). Sliding Window specifically maintains and tracks a contiguous subsegment or window of elements."
      },
      {
        "id": "dsa-2-4-q3",
        "question": "What is the auxiliary space complexity for \"Longest Substring with At Most K Distinct Characters\"?",
        "hint": "What does the hash map hold?",
        "answer": "O(k) where k is the maximum number of distinct characters allowed in the map."
      }
    ],
    "quiz": [
      {
        "id": "dsa-2-4-quiz-1",
        "question": "What is the overall time complexity of a dynamic sliding window where both left and right pointers traverse an array of length n?",
        "options": [
          "O(n)",
          "O(n^2)",
          "O(n log n)",
          "O(2^n)"
        ],
        "correctIndex": 0,
        "explanation": "Since both left and right pointers advance monotonically from 0 to n without backtracking, total operations cannot exceed 2n = O(n)."
      },
      {
        "id": "dsa-2-4-quiz-2",
        "question": "How is a fixed-size sliding window of size k updated when moving to the next index?",
        "options": [
          "Add the new element at right, subtract the old element at left",
          "Sum all k elements from scratch using a loop",
          "Sort the window",
          "Reallocate the array"
        ],
        "correctIndex": 0,
        "explanation": "Updating the window state by adding the incoming element and subtracting the departing element executes in constant O(1) time."
      },
      {
        "id": "dsa-2-4-quiz-3",
        "question": "Which of the following problems is best solved using a variable-size sliding window?",
        "options": [
          "Shortest Subarray with Sum at least K",
          "Binary Search in a sorted array",
          "Matrix multiplication",
          "Inverting a binary tree"
        ],
        "correctIndex": 0,
        "explanation": "Finding the shortest contiguous subarray meeting a condition is the classic use case for a variable-size contracting sliding window."
      }
    ],
    "codingChallenge": {
      "title": "Maximum Sum of Distinct Subarrays With Length K",
      "problem": "Given an integer array nums and an integer k, find the maximum subarray sum of all subarrays of nums that meet the following conditions: the length of the subarray is k, and all elements of the subarray are distinct. Return 0 if no such subarray exists.",
      "hints": [
        "Maintain both a running sum and a hash set of elements currently inside the window.",
        "If nums[right] is already in the set, contract from the left until the duplicate is evicted.",
        "When the window length reaches exactly k, record max_sum and advance left by one."
      ],
      "starterCode": "def maximum_subarray_sum(nums, k):\n    left = 0\n    curr_sum = 0\n    max_sum = 0\n    seen = set()\n\n    for right in range(len(nums)):\n        # While duplicate exists, shrink window from left\n        while nums[right] in seen:\n            seen.remove(nums[left])\n            curr_sum -= nums[left]\n            left += 1\n\n        seen.add(nums[right])\n        curr_sum += nums[right]\n\n        if right - left + 1 == k:\n            max_sum = max(max_sum, curr_sum)\n            # Slide left forward for next step\n            seen.remove(nums[left])\n            curr_sum -= nums[left]\n            left += 1\n\n    return max_sum\n\nprint(maximum_subarray_sum([1, 5, 4, 2, 9, 9, 9], 3)) # Expected: 15 ([5, 4, 2] -> 11, [4, 2, 9] -> 15)",
      "solution": "def maximum_subarray_sum(nums, k):\n    left = 0\n    curr_sum = 0\n    max_sum = 0\n    seen = set()\n\n    for right in range(len(nums)):\n        while nums[right] in seen:\n            seen.remove(nums[left])\n            curr_sum -= nums[left]\n            left += 1\n\n        seen.add(nums[right])\n        curr_sum += nums[right]\n\n        if right - left + 1 == k:\n            max_sum = max(max_sum, curr_sum)\n            seen.remove(nums[left])\n            curr_sum -= nums[left]\n            left += 1\n\n    return max_sum\n\nprint(maximum_subarray_sum([1, 5, 4, 2, 9, 9, 9], 3))"
    },
    "summary": {
      "keyTakeaways": [
        "Sliding window achieves O(n) time by maintaining delta state across contiguous windows.",
        "Fixed windows update in O(1) via +new -old arithmetic.",
        "Dynamic windows expand with right pointer and contract with left pointer.",
        "Always verify that both pointers move forward monotonically."
      ],
      "nextLessonId": "dsa-arrays-kadane",
      "nextLessonTitle": "Kadane's Algorithm — Maximum Subarray",
      "nextLessonModuleId": "dsa-module-2"
    },
    "lineByLine": [
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "for right in range(len(nums)):\n    curr_sum += nums[right]",
        "codeSnippet": "for right in range(len(nums)):\n    curr_sum += nums[right]",
        "explanation": "Expands window rightward by adding incoming element."
      },
      {
        "line": "8-11",
        "lines": "8-11",
        "code": "while curr_sum >= target:\n    min_len = min(min_len, right - left + 1)\n    curr_sum -= nums[left]\n    left += 1",
        "codeSnippet": "while curr_sum >= target:\n    min_len = min(min_len, right - left + 1)\n    curr_sum -= nums[left]\n    left += 1",
        "explanation": "Shrinks window from left as long as target sum condition is met, minimizing length."
      }
    ]
  },
  "dsa-arrays-kadane": {
    "id": "dsa-arrays-kadane",
    "moduleId": "dsa-module-2",
    "title": "Kadane's Algorithm — Maximum Subarray",
    "subtitle": "Greedy Dynamic Programming for Maximum Contiguous Sum in O(n) Time",
    "order": 5,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "dp-table",
    "objectives": [
      "Formulate the maximum subarray problem using dynamic programming recurrence.",
      "Understand the local decision: extend previous subarray or start fresh at current element.",
      "Implement Kadane’s algorithm in O(n) time and O(1) auxiliary space.",
      "Correctly handle arrays containing only negative numbers."
    ],
    "prerequisites": [
      "Array Operations and Memory Layout",
      "Basic Dynamic Programming intuition"
    ],
    "analogy": {
      "title": "The Casino Winning Streak Reset",
      "text": "A gambler records net profit or loss per round: [+5, -8, +10, +2, -1, +6]. If you start a streak and your net accumulated money falls below zero, carrying that negative debt into the next game will only drag down future profits. You are strictly better off cutting your losses, declaring bankruptcy on the past streak, and starting a fresh streak from the next positive win.",
      "metaphor": "If current cumulative sum becomes negative, it cannot help any future subarray; reset and start anew."
    },
    "problemSolved": {
      "title": "Optimal Subarray Selection in Linear Time",
      "description": "Finding the maximum contiguous subarray sum naively takes O(n^3) by testing all (i, j) pairs and summing them, or O(n^2) with prefix sums. Kadane’s algorithm solves this fundamental problem in a single pass of O(n) time and O(1) space.",
      "keyPoints": [
        "Reduces complexity from quadratic O(n^2) to linear O(n)",
        "Uses dynamic programming state compression to achieve O(1) space",
        "Provides foundation for Maximum Product Subarray and 2D Maximum Submatrix sum"
      ]
    },
    "intuition": {
      "overview": "At each index i, max_ending_here is either the current element alone, or the current element added to the previous max_ending_here.",
      "steps": [
        {
          "step": 1,
          "title": "Local Decision",
          "description": "current_sum = max(nums[i], current_sum + nums[i])."
        },
        {
          "step": 2,
          "title": "Global Maximum Tracking",
          "description": "max_so_far = max(max_so_far, current_sum)."
        },
        {
          "step": 3,
          "title": "Continuation",
          "description": "Repeat for all elements in array from left to right."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let dp[i] be the maximum subarray sum ending at index i. The Bellman optimality equation states: dp[i] = max(A[i], dp[i-1] + A[i]). The global maximum is max_{0 <= i < n} dp[i].",
      "latex": "dp[i] = \\max\\big(A[i], \\, dp[i - 1] + A[i]\\big), \\quad \\text{Result} = \\max_{0 \\le i < n} dp[i]"
    },
    "complexity": {
      "overview": "Time: strictly O(n) single scan. Space: O(1) using two scalar variables.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Single pass across all elements."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Single pass regardless of distribution."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Single pass even with all negative numbers."
        }
      ],
      "spaceNote": "Does not allocate any arrays or tables."
    },
    "workedExample": {
      "title": "Running Kadane on [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      "input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      "steps": [
        {
          "step": 1,
          "action": "Index 0 (-2)",
          "state": "curr = -2, max = -2",
          "explanation": "Initialize with first element."
        },
        {
          "step": 2,
          "action": "Index 1 (1)",
          "state": "curr = max(1, -2+1) = 1, max = 1",
          "explanation": "Starting fresh with 1 is better than -1."
        },
        {
          "step": 3,
          "action": "Index 2 (-3)",
          "state": "curr = max(-3, 1-3) = -2, max = 1",
          "explanation": "Extend streak."
        },
        {
          "step": 4,
          "action": "Index 3 (4)",
          "state": "curr = max(4, -2+4) = 4, max = 4",
          "explanation": "Start fresh with 4."
        },
        {
          "step": 5,
          "action": "Index 4 to 6 (-1, 2, 1)",
          "state": "curr = 3 -> 5 -> 6, max = 6",
          "explanation": "Subarray [4, -1, 2, 1] accumulates to 6."
        },
        {
          "step": 6,
          "action": "Index 7 & 8 (-5, 4)",
          "state": "curr = 1 -> 5, max = 6",
          "explanation": "Max sum remains 6."
        }
      ],
      "finalOutput": "Maximum contiguous subarray sum is 6 (subarray [4, -1, 2, 1])."
    },
    "visualExplanation": {
      "title": "The Running Sum Trajectory",
      "description": "Graphing the running sum: when the line dips below the zero baseline, Kadane’s algorithm clips it back up to start afresh from the next positive element.",
      "features": [
        "Zero baseline reset",
        "Peak tracking indicator",
        "Subarray boundary tracking"
      ]
    },
    "pseudocode": {
      "title": "Kadane's Algorithm",
      "code": "def kadane(nums):\n    current_sum = nums[0]\n    max_sum = nums[0]\n    for i from 1 to len(nums) - 1:\n        current_sum = max(nums[i], current_sum + nums[i])\n        max_sum = max(max_sum, current_sum)\n    return max_sum"
    },
    "pythonCode": {
      "title": "Kadane's Algorithm with Subarray Reconstruction in Python",
      "code": "def max_sub_array_with_indices(nums):\n    max_sum = nums[0]\n    curr_sum = nums[0]\n    start = end = 0\n    temp_start = 0\n\n    for i in range(1, len(nums)):\n        if nums[i] > curr_sum + nums[i]:\n            curr_sum = nums[i]\n            temp_start = i\n        else:\n            curr_sum += nums[i]\n\n        if curr_sum > max_sum:\n            max_sum = curr_sum\n            start = temp_start\n            end = i\n\n    return max_sum, nums[start:end + 1]\n\narr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nval, subarray = max_sub_array_with_indices(arr)\nprint(f\"Max Sum: {val}, Subarray: {subarray}\")",
      "explanation": "Returns both the maximum sum and the actual slice of elements that produced it."
    },
    "runnableCode": {
      "code": "def max_subarray(nums):\n    max_so_far = nums[0]\n    curr_max = nums[0]\n    for x in nums[1:]:\n        curr_max = max(x, curr_max + x)\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far\n\nprint(\"Max subarray [-2, 1, -3, 4, -1, 2, 1, -5, 4]:\", max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))\nprint(\"All negative [-5, -2, -8, -1, -4]:\", max_subarray([-5, -2, -8, -1, -4]))",
      "expectedOutput": "Max subarray [-2, 1, -3, 4, -1, 2, 1, -5, 4]: 6\nAll negative [-5, -2, -8, -1, -4]: -1"
    },
    "lineByLineExplanation": [
      {
        "line": "2-3",
        "lines": "2-3",
        "code": "max_so_far = nums[0]\ncurr_max = nums[0]",
        "codeSnippet": "max_so_far = nums[0]\ncurr_max = nums[0]",
        "explanation": "Initializes tracking variables with first element to handle all-negative arrays."
      },
      {
        "line": "4-6",
        "lines": "4-6",
        "code": "for x in nums[1:]:\n    curr_max = max(x, curr_max + x)\n    max_so_far = max(max_so_far, curr_max)",
        "codeSnippet": "for x in nums[1:]:\n    curr_max = max(x, curr_max + x)\n    max_so_far = max(max_so_far, curr_max)",
        "explanation": "Decides whether to extend streak or restart at x, updating the global record."
      }
    ],
    "edgeCases": [
      {
        "case": "All Negative Numbers",
        "handling": "Initializing with nums[0] rather than 0 correctly returns the least negative number.",
        "example": "[-5, -1, -3] -> returns -1"
      },
      {
        "case": "Single Element Array",
        "handling": "Loop does not run, returns nums[0] directly in O(1).",
        "example": "[42] -> returns 42"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Initializing max_so_far = 0.",
        "solution": "If all numbers in the array are negative, returning 0 is incorrect. Initialize max_so_far = nums[0] or -inf."
      },
      {
        "mistake": "Confusing maximum subarray with longest common subsequence.",
        "solution": "Subarray requires strict contiguous elements; subsequence allows skipping."
      }
    ],
    "applications": [
      {
        "industry": "Genomic Sequence Analysis",
        "application": "Identifying CpG Islands",
        "benefit": "Locates contiguous DNA regions with elevated GC-content scores in linear time."
      },
      {
        "industry": "Finance",
        "application": "Best Single-Stock Buy/Sell Window",
        "benefit": "Computes maximum profit by converting prices to daily return differentials and running Kadane."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-2-5-q1",
        "question": "Why does Kadane algorithm fail if max_so_far is initialized to 0 on an array of all negative numbers?",
        "hint": "What is the sum of any non-empty subarray in [-3, -5, -2]?",
        "answer": "The maximum subarray of [-3, -5, -2] is [-2] with sum -2. If initialized to 0, it would return 0, which corresponds to an empty array."
      },
      {
        "id": "dsa-2-5-q2",
        "question": "How can Kadane algorithm be adapted to solve Maximum Product Subarray?",
        "hint": "Multiplying by a negative number flips signs.",
        "answer": "Maintain two dynamic states: current_max and current_min. When multiplying by a negative number, min becomes max and max becomes min."
      },
      {
        "id": "dsa-2-5-q3",
        "question": "How can Kadane algorithm solve the Maximum Circular Subarray problem?",
        "hint": "Consider total_sum - min_subarray.",
        "answer": "The maximum circular subarray is either the standard maximum subarray (Kadane) or total_sum - min_subarray (wrapping around borders)."
      }
    ],
    "quiz": [
      {
        "id": "dsa-2-5-quiz-1",
        "question": "What is the key recurrence relation in Kadane's algorithm at element A[i]?",
        "options": [
          "curr_sum = max(A[i], curr_sum + A[i])",
          "curr_sum = curr_sum + A[i]",
          "curr_sum = min(A[i], curr_sum)",
          "curr_sum = A[i] * A[i - 1]"
        ],
        "correctIndex": 0,
        "explanation": "At each position, the algorithm greedily decides whether to start a new subarray at A[i] or add A[i] to the accumulated streak."
      },
      {
        "id": "dsa-2-5-quiz-2",
        "question": "What is the time and auxiliary space complexity of Kadane's algorithm?",
        "options": [
          "O(n) time and O(1) space",
          "O(n^2) time and O(1) space",
          "O(n log n) time and O(n) space",
          "O(n) time and O(n) space"
        ],
        "correctIndex": 0,
        "explanation": "Kadane scans the array in a single pass of n steps while maintaining only two scalar variables, requiring O(n) time and O(1) space."
      },
      {
        "id": "dsa-2-5-quiz-3",
        "question": "What is the output of max_subarray on input [-8, -3, -6, -2, -5]?",
        "options": [
          "-2",
          "0",
          "-8",
          "-24"
        ],
        "correctIndex": 0,
        "explanation": "In an all-negative array, the maximum contiguous sum is simply the largest single negative element, which is -2."
      }
    ],
    "codingChallenge": {
      "title": "Maximum Sum Circular Subarray",
      "problem": "Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums. A circular array allows the subarray to wrap around from the end back to the start.",
      "hints": [
        "Case 1: The maximum subarray does not wrap around (standard Kadane).",
        "Case 2: The maximum subarray wraps around -> total_sum - minimum_subarray.",
        "Special case: if all elements are negative, total - min_so_far = 0 (empty array), so return max_so_far."
      ],
      "starterCode": "def max_subarray_sum_circular(nums):\n    total = sum(nums)\n    # Standard Kadane for max subarray\n    curr_max = max_so_far = nums[0]\n    # Standard Kadane for min subarray\n    curr_min = min_so_far = nums[0]\n\n    for x in nums[1:]:\n        curr_max = max(x, curr_max + x)\n        max_so_far = max(max_so_far, curr_max)\n        curr_min = min(x, curr_min + x)\n        min_so_far = min(min_so_far, curr_min)\n\n    # If all numbers are negative, total == min_so_far, return max_so_far\n    if max_so_far < 0:\n        return max_so_far\n    return max(max_so_far, total - min_so_far)\n\nprint(max_subarray_sum_circular([1, -2, 3, -2])) # Expected: 3\nprint(max_subarray_sum_circular([5, -3, 5]))      # Expected: 10 (wraps: 5 + 5)",
      "solution": "def max_subarray_sum_circular(nums):\n    total = sum(nums)\n    curr_max = max_so_far = nums[0]\n    curr_min = min_so_far = nums[0]\n\n    for x in nums[1:]:\n        curr_max = max(x, curr_max + x)\n        max_so_far = max(max_so_far, curr_max)\n        curr_min = min(x, curr_min + x)\n        min_so_far = min(min_so_far, curr_min)\n\n    if max_so_far < 0:\n        return max_so_far\n    return max(max_so_far, total - min_so_far)\n\nprint(max_subarray_sum_circular([5, -3, 5]))"
    },
    "summary": {
      "keyTakeaways": [
        "Kadane's algorithm finds maximum contiguous subarray sum in O(n) time and O(1) space.",
        "State transition: curr = max(x, curr + x).",
        "Always initialize with nums[0] to handle negative arrays correctly.",
        "Circular arrays are solved by combining max Kadane with min Kadane."
      ],
      "nextLessonId": "dsa-arrays-binary-search",
      "nextLessonTitle": "Binary Search",
      "nextLessonModuleId": "dsa-module-2"
    },
    "lineByLine": [
      {
        "line": "2-3",
        "lines": "2-3",
        "code": "max_so_far = nums[0]\ncurr_max = nums[0]",
        "codeSnippet": "max_so_far = nums[0]\ncurr_max = nums[0]",
        "explanation": "Initializes tracking variables with first element to handle all-negative arrays."
      },
      {
        "line": "4-6",
        "lines": "4-6",
        "code": "for x in nums[1:]:\n    curr_max = max(x, curr_max + x)\n    max_so_far = max(max_so_far, curr_max)",
        "codeSnippet": "for x in nums[1:]:\n    curr_max = max(x, curr_max + x)\n    max_so_far = max(max_so_far, curr_max)",
        "explanation": "Decides whether to extend streak or restart at x, updating the global record."
      }
    ]
  },
  "dsa-arrays-binary-search-variations": {
    "id": "dsa-arrays-binary-search-variations",
    "moduleId": "dsa-module-2",
    "title": "Binary Search Variations",
    "subtitle": "Lower Bound, Upper Bound, First & Last Occurrences, and Range Boundaries",
    "order": 7,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "binary-search",
    "objectives": [
      "Distinguish between exact match binary search and boundary-finding variations.",
      "Implement Lower Bound (bisect_left): first index where arr[i] >= target.",
      "Implement Upper Bound (bisect_right): first index where arr[i] > target.",
      "Find First and Last Occurrence of a target in sorted array with duplicates in O(log n)."
    ],
    "prerequisites": [
      "Binary Search",
      "Understanding loop invariants and strict vs non-strict inequalities"
    ],
    "analogy": {
      "title": "Finding the First and Last Edition in a Dated Archive",
      "text": "A library holds multiple copies of newspapers from the 1920s stacked in chronological order: [1920, 1922, 1925, 1925, 1925, 1925, 1928]. If a researcher asks for \"The 1925 Edition\", a basic binary search lands somewhere in the middle of the 1925 stack. But if you need to know where 1925 begins (first occurrence / lower bound) or where it ends (last occurrence), you cannot stop at the first match; you record the candidate index and deliberately keep searching to the left or right.",
      "metaphor": "Boundary search continues searching in the biased half even after finding a match."
    },
    "problemSolved": {
      "title": "Precision Range Queries on Arrays with Duplicates",
      "description": "Exact match binary search stops as soon as arr[mid] == target, which can return any arbitrary duplicate index. Boundary binary search guarantees finding the leftmost or rightmost index, enabling count of occurrences in O(log n) time via (upper_bound - lower_bound).",
      "keyPoints": [
        "Finds first and last occurrences of duplicate elements",
        "Calculates frequency of an element in sorted array in O(log n)",
        "Finds floor, ceiling, and insertion points in sorted collections"
      ]
    },
    "intuition": {
      "overview": "When arr[mid] == target, instead of returning mid immediately: for first occurrence, record ans = mid and push high = mid - 1. For last occurrence, record ans = mid and push low = mid + 1.",
      "steps": [
        {
          "step": 1,
          "title": "Left Boundary Search",
          "description": "If arr[mid] >= target, move left (high = mid - 1) to find earlier matches."
        },
        {
          "step": 2,
          "title": "Right Boundary Search",
          "description": "If arr[mid] <= target, move right (low = mid + 1) to find later matches."
        },
        {
          "step": 3,
          "title": "Range Derivation",
          "description": "Total duplicates = right_bound - left_bound + 1."
        }
      ]
    },
    "formalDefinition": {
      "text": "Lower bound: \\min \\{ i \\in [0, n] \\mid A[i] \\ge x \\}. Upper bound: \\min \\{ i \\in [0, n] \\mid A[i] > x \\}. Both operations partition the boolean predicate P(i) and locate the boundary in \\lceil \\log_2(n + 1) \\rceil steps.",
      "latex": "\\text{LowerBound}(A, x) = \\arg\\min_{0 \\le i \\le n} (A[i] \\ge x)"
    },
    "complexity": {
      "overview": "Time: O(log n) for both lower and upper bound searches. Space: O(1).",
      "cases": [
        {
          "case": "Best",
          "time": "O(log n)",
          "space": "O(1)",
          "explanation": "Always performs full log2(n) boundary convergence."
        },
        {
          "case": "Average",
          "time": "O(log n)",
          "space": "O(1)",
          "explanation": "Divides search space in half at each iteration."
        },
        {
          "case": "Worst",
          "time": "O(log n)",
          "space": "O(1)",
          "explanation": "Logarithmic bound guaranteed even with all elements identical."
        }
      ],
      "spaceNote": "Iterative implementation uses strictly O(1) auxiliary space."
    },
    "workedExample": {
      "title": "Finding First and Last Occurrence of 8 in [5, 7, 7, 8, 8, 8, 10]",
      "input": "arr = [5, 7, 7, 8, 8, 8, 10], target = 8",
      "steps": [
        {
          "step": 1,
          "action": "First Occurrence Search",
          "state": "mid=3 (arr[3]=8)",
          "explanation": "Match found at index 3. Save ans=3. Search left half: high = 2."
        },
        {
          "step": 2,
          "action": "Left Halving",
          "state": "mid=1 (arr[1]=7)",
          "explanation": "7 < 8 -> low = 2. mid=2 (arr[2]=7) -> low = 3. Search terminates. First = 3."
        },
        {
          "step": 3,
          "action": "Last Occurrence Search",
          "state": "mid=3 (arr[3]=8)",
          "explanation": "Match found at index 3. Save ans=3. Search right half: low = 4."
        },
        {
          "step": 4,
          "action": "Right Halving",
          "state": "mid=5 (arr[5]=8)",
          "explanation": "Match found at index 5. Save ans=5. Search right: low = 6. mid=6 (arr[6]=10) -> high=5. Last = 5."
        }
      ],
      "finalOutput": "Target 8 occupies index range [3, 5] (count = 3 elements)."
    },
    "visualExplanation": {
      "title": "Boolean Predicate Transition Boundary",
      "description": "Transforming array into boolean evaluations [F, F, F, T, T, T]. Binary search finds the exact transition point where False switches to True in O(log n) steps.",
      "features": [
        "Monotonic boolean predicate",
        "Leftward bias for lower bound",
        "Rightward bias for upper bound"
      ]
    },
    "pseudocode": {
      "title": "Lower Bound (First Occurrence)",
      "code": "def find_first(arr, target):\n    low = 0\n    high = len(arr) - 1\n    ans = -1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            ans = mid\n            high = mid - 1 # Keep looking left!\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return ans"
    },
    "pythonCode": {
      "title": "Search Range (First and Last Position) in Python",
      "code": "def search_range(nums, target):\n    def find_bound(is_first):\n        l, r = 0, len(nums) - 1\n        ans = -1\n        while l <= r:\n            mid = (l + r) // 2\n            if nums[mid] == target:\n                ans = mid\n                if is_first:\n                    r = mid - 1 # Look left\n                else:\n                    l = mid + 1 # Look right\n            elif nums[mid] < target:\n                l = mid + 1\n            else:\n                r = mid - 1\n        return ans\n\n    return [find_bound(True), find_bound(False)]\n\n# Test\narr = [5, 7, 7, 8, 8, 8, 10]\nprint(\"Range for 8:\", search_range(arr, 8)) # Output: [3, 5]\nprint(\"Range for 6:\", search_range(arr, 6)) # Output: [-1, -1]",
      "explanation": "Uses a parameterized helper function to find both boundaries in 2 * log2(n) = O(log n) time."
    },
    "runnableCode": {
      "code": "def lower_bound(nums, target):\n    # Returns first index where nums[i] >= target\n    low, high = 0, len(nums)\n    while low < high:\n        mid = (low + high) // 2\n        if nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid\n    return low\n\ndata = [10, 20, 30, 30, 30, 40, 50]\nprint(\"Lower bound of 30 (first >= 30):\", lower_bound(data, 30))\nprint(\"Lower bound of 35 (insertion point):\", lower_bound(data, 35))",
      "expectedOutput": "Lower bound of 30 (first >= 30): 2\nLower bound of 35 (insertion point): 5"
    },
    "lineByLineExplanation": [
      {
        "line": "3",
        "lines": "3",
        "code": "low, high = 0, len(nums)",
        "codeSnippet": "low, high = 0, len(nums)",
        "explanation": "Uses half-open interval [low, high) allowing insertion point at index n."
      },
      {
        "line": "6-9",
        "lines": "6-9",
        "code": "if nums[mid] < target:\n    low = mid + 1\nelse:\n    high = mid",
        "codeSnippet": "if nums[mid] < target:\n    low = mid + 1\nelse:\n    high = mid",
        "explanation": "Maintains invariant that answer is always within [low, high)."
      },
      {
        "line": "10",
        "lines": "10",
        "code": "return low",
        "codeSnippet": "return low",
        "explanation": "When low == high, points exactly to the first element >= target."
      }
    ],
    "edgeCases": [
      {
        "case": "Target smaller than all elements",
        "handling": "Lower bound returns index 0.",
        "example": "arr = [10, 20], target = 5 -> 0"
      },
      {
        "case": "Target larger than all elements",
        "handling": "Lower bound returns index n (length of array).",
        "example": "arr = [10, 20], target = 50 -> 2"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using mid = (low + high) // 2 without considering integer overflow in other languages.",
        "solution": "In C/C++ or Java, use low + (high - low) // 2."
      },
      {
        "mistake": "Stopping on first match in an array with duplicate elements.",
        "solution": "Must continue loop until bounds cross to locate the exact extremity."
      }
    ],
    "applications": [
      {
        "industry": "Database Query Engines",
        "application": "B+ Tree Range Scans",
        "benefit": "Locates start of range with lower bound and scans forward until upper bound."
      },
      {
        "industry": "Financial Trading",
        "application": "Order Book Price Level Matching",
        "benefit": "Finds nearest bid/ask price bucket in sub-microsecond logarithmic time."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-2-7-q1",
        "question": "How can you calculate the count of occurrences of target in a sorted array in O(log n)?",
        "hint": "Combine upper bound and lower bound.",
        "answer": "Count = upper_bound(target) - lower_bound(target). If target does not exist, both bounds equal the same insertion index, yielding count = 0."
      },
      {
        "id": "dsa-2-7-q2",
        "question": "What does bisect_left([1, 2, 4, 4, 5], 4) return in Python?",
        "hint": "First occurrence of 4.",
        "answer": "Index 2, which is the first position containing 4."
      },
      {
        "id": "dsa-2-7-q3",
        "question": "What does bisect_right([1, 2, 4, 4, 5], 4) return in Python?",
        "hint": "Index after the last 4.",
        "answer": "Index 4 (the position of element 5), representing the insertion point after all existing 4s."
      }
    ],
    "quiz": [
      {
        "id": "dsa-2-7-quiz-1",
        "question": "What is the definition of the Lower Bound of a target value in a sorted array?",
        "options": [
          "The first index i where arr[i] >= target",
          "The last index where arr[i] == target",
          "The smallest element in the entire array",
          "The index where target is strictly less than arr[i]"
        ],
        "correctIndex": 0,
        "explanation": "Lower bound (bisect_left) returns the first position where an element is greater than or equal to the target."
      },
      {
        "id": "dsa-2-7-quiz-2",
        "question": "When searching for the FIRST occurrence of a target and arr[mid] == target, what adjustment is made?",
        "options": [
          "high = mid - 1 (continue searching left half)",
          "low = mid + 1 (continue searching right half)",
          "return mid immediately",
          "break the loop"
        ],
        "correctIndex": 0,
        "explanation": "To find the first occurrence, record candidate mid and shift the upper bound high = mid - 1 to explore if earlier matches exist."
      },
      {
        "id": "dsa-2-7-quiz-3",
        "question": "What is the runtime of finding the number of occurrences of an element in a sorted array of size 1,000,000 using boundary binary search?",
        "options": [
          "~40 comparisons (2 * log2(10^6))",
          "1,000,000 comparisons",
          "500,000 comparisons",
          "O(1)"
        ],
        "correctIndex": 0,
        "explanation": "Two binary searches (first and last occurrence) take 2 * 20 ≈ 40 comparisons total, operating in O(log n) time."
      }
    ],
    "codingChallenge": {
      "title": "Search Insert Position",
      "problem": "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. Solve in O(log n) time.",
      "hints": [
        "Standard binary search: when target is found, return mid.",
        "If loop terminates without finding target, low points to the exact insertion index."
      ],
      "starterCode": "def search_insert(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return low\n\nprint(search_insert([1, 3, 5, 6], 5)) # Expected: 2\nprint(search_insert([1, 3, 5, 6], 2)) # Expected: 1\nprint(search_insert([1, 3, 5, 6], 7)) # Expected: 4",
      "solution": "def search_insert(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return low\n\nprint(search_insert([1, 3, 5, 6], 5))"
    },
    "summary": {
      "keyTakeaways": [
        "Binary search variations locate boundaries rather than stopping at arbitrary matches.",
        "Lower bound finds first index >= target; Upper bound finds first index > target.",
        "Occurrence count in sorted array is upper_bound - lower_bound in O(log n).",
        "The terminating index `low` in a standard failed search is the exact sorted insertion point."
      ],
      "nextLessonId": "dsa-arrays-rotated",
      "nextLessonTitle": "Search in Rotated Sorted Arrays",
      "nextLessonModuleId": "dsa-module-2"
    },
    "lineByLine": [
      {
        "line": "3",
        "lines": "3",
        "code": "low, high = 0, len(nums)",
        "codeSnippet": "low, high = 0, len(nums)",
        "explanation": "Uses half-open interval [low, high) allowing insertion point at index n."
      },
      {
        "line": "6-9",
        "lines": "6-9",
        "code": "if nums[mid] < target:\n    low = mid + 1\nelse:\n    high = mid",
        "codeSnippet": "if nums[mid] < target:\n    low = mid + 1\nelse:\n    high = mid",
        "explanation": "Maintains invariant that answer is always within [low, high)."
      },
      {
        "line": "10",
        "lines": "10",
        "code": "return low",
        "codeSnippet": "return low",
        "explanation": "When low == high, points exactly to the first element >= target."
      }
    ]
  },
  "dsa-arrays-rotated": {
    "id": "dsa-arrays-rotated",
    "moduleId": "dsa-module-2",
    "title": "Search in Rotated Sorted Arrays",
    "subtitle": "Partition Invariants and Modified Binary Search in O(log n)",
    "order": 8,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "binary-search",
    "objectives": [
      "Analyze the geometric structure of a rotated sorted array.",
      "Prove that dividing a rotated sorted array in half always produces at least one normally sorted half.",
      "Determine target containment within the sorted half to prune half the search space.",
      "Handle duplicate elements where arr[low] == arr[mid] == arr[high] in O(n) degraded case."
    ],
    "prerequisites": [
      "Binary Search",
      "Binary Search Variations"
    ],
    "analogy": {
      "title": "The Sliced Ring Binder",
      "text": "Imagine a dictionary sliced at the letter \"M\" and stacked back-to-back: [M through Z] followed by [A through L]. The book is no longer sorted globally, but if you crack it open at any page, at least one of the two halves in your hands is guaranteed to be in perfect alphabetical order. If your target word fits between the first and last word of the sorted half, you search there; otherwise, you discard it and search the other disordered half.",
      "metaphor": "At any midpoint, at least one half is strictly sorted. Check if target lies within that half."
    },
    "problemSolved": {
      "title": "Logarithmic Search Across Discontinuous Monotonic Segments",
      "description": "When a sorted array is rotated at an unknown pivot, a naive search takes O(n) linear scan. Modified binary search restores O(log n) efficiency by identifying the sorted half at every step.",
      "keyPoints": [
        "Achieves O(log n) without finding the pivot index first",
        "Uses sorted boundary check: arr[low] <= arr[mid]",
        "Underpins circular buffers and distributed consistent hash ring lookups"
      ]
    },
    "intuition": {
      "overview": "Divide at mid. Check whether left half [low..mid] is sorted (arr[low] <= arr[mid]). If it is sorted, check if target falls in [arr[low]..arr[mid]]. If yes, search left; if no, search right.",
      "steps": [
        {
          "step": 1,
          "title": "Find Midpoint",
          "description": "mid = (low + high) // 2."
        },
        {
          "step": 2,
          "title": "Identify Sorted Half",
          "description": "If arr[low] <= arr[mid], the left half is sorted. Otherwise, the right half is sorted."
        },
        {
          "step": 3,
          "title": "Containment Test",
          "description": "Check if target lies inside the boundaries of the sorted half."
        },
        {
          "step": 4,
          "title": "Prune Search Space",
          "description": "Discard the non-containing half and repeat."
        }
      ]
    },
    "formalDefinition": {
      "text": "A rotated sorted array is formed by shifting an initially sorted array A by k positions: A'[i] = A[(i + k) mod n]. For any index mid, either A[low..mid] or A[mid..high] is monotonically non-decreasing.",
      "latex": "A[low] \\le A[mid] \\implies A[low..mid] \\text{ is sorted}"
    },
    "complexity": {
      "overview": "Distinct elements: O(log n) time, O(1) space. With duplicates: worst-case O(n) when all elements match.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Target is located at initial midpoint."
        },
        {
          "case": "Average",
          "time": "O(log n)",
          "space": "O(1)",
          "explanation": "Search space halved at each step."
        },
        {
          "case": "Worst",
          "time": "O(log n) [distinct] / O(n) [duplicates]",
          "space": "O(1)",
          "explanation": "If arr[low] == arr[mid] == arr[high], can only shrink bounds by 1."
        }
      ],
      "spaceNote": "Operates in-place with O(1) space."
    },
    "workedExample": {
      "title": "Searching for 0 in Rotated Array [4, 5, 6, 7, 0, 1, 2]",
      "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
      "steps": [
        {
          "step": 1,
          "action": "Step 1",
          "state": "low=0 (4), high=6 (2), mid=3 (7)",
          "explanation": "arr[low]=4 <= arr[mid]=7 -> Left half [4..7] is sorted. Is 0 in [4..7]? No! Search right: low = 4."
        },
        {
          "step": 2,
          "action": "Step 2",
          "state": "low=4 (0), high=6 (2), mid=5 (1)",
          "explanation": "arr[low]=0 <= arr[mid]=1 -> Left half [0..1] is sorted. Is 0 in [0..1]? Yes (0 <= 0 <= 1)! Search left: high = 5."
        },
        {
          "step": 3,
          "action": "Step 3",
          "state": "low=4 (0), high=5 (1), mid=4 (0)",
          "explanation": "arr[4] == 0 -> Match found! Return index 4."
        }
      ],
      "finalOutput": "Target 0 found at index 4 in 3 iterations."
    },
    "visualExplanation": {
      "title": "Two Parallel Slanted Line Segments",
      "description": "A plot of indices vs values shows two parallel rising slopes separated by a cliff drop. Midpoint either lands on the high slope or low slope. The half that doesn’t contain the cliff is strictly sorted.",
      "features": [
        "High slope segment",
        "Discontinuity cliff drop",
        "Low slope segment"
      ]
    },
    "pseudocode": {
      "title": "Search Rotated Sorted Array",
      "code": "def search_rotated(nums, target):\n    low = 0, high = len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target: return mid\n        # Left half sorted\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]:\n                high = mid - 1\n            else:\n                low = mid + 1\n        # Right half sorted\n        else:\n            if nums[mid] < target <= nums[high]:\n                low = mid + 1\n            else:\n                high = mid - 1\n    return -1"
    },
    "pythonCode": {
      "title": "Search in Rotated Sorted Array in Python",
      "code": "def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target:\n            return mid\n\n        # Check if left half is sorted\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]:\n                r = mid - 1\n            else:\n                l = mid + 1\n        # Right half must be sorted\n        else:\n            if nums[mid] < target <= nums[r]:\n                l = mid + 1\n            else:\n                r = mid - 1\n    return -1\n\n# Test\narr = [4, 5, 6, 7, 0, 1, 2]\nprint(\"Index of 0:\", search(arr, 0)) # Expected: 4\nprint(\"Index of 3:\", search(arr, 3)) # Expected: -1",
      "explanation": "Demonstrates partition checks without requiring a separate pass to locate the pivot."
    },
    "runnableCode": {
      "code": "def find_pivot(nums):\n    # Returns index of minimum element\n    low, high = 0, len(nums) - 1\n    while low < high:\n        mid = (low + high) // 2\n        if nums[mid] > nums[high]:\n            low = mid + 1\n        else:\n            high = mid\n    return low\n\narr = [4, 5, 6, 7, 0, 1, 2]\np_idx = find_pivot(arr)\nprint(f\"Pivot (minimum element {arr[p_idx]}) is at index: {p_idx}\")",
      "expectedOutput": "Pivot (minimum element 0) is at index: 4"
    },
    "lineByLineExplanation": [
      {
        "line": "5",
        "lines": "5",
        "code": "if nums[mid] > nums[high]: low = mid + 1",
        "codeSnippet": "if nums[mid] > nums[high]: low = mid + 1",
        "explanation": "If mid element is greater than high element, the cliff (pivot) must be in right half."
      },
      {
        "line": "7-8",
        "lines": "7-8",
        "code": "else: high = mid",
        "codeSnippet": "else: high = mid",
        "explanation": "Otherwise, minimum is at or to the left of mid."
      }
    ],
    "edgeCases": [
      {
        "case": "Array not rotated (k = 0)",
        "handling": "nums[l] <= nums[mid] holds globally; acts as standard binary search.",
        "example": "[1, 2, 3, 4, 5]"
      },
      {
        "case": "Duplicates allowed (e.g. [1, 0, 1, 1, 1])",
        "handling": "When nums[l] == nums[mid] == nums[r], increment l and decrement r.",
        "example": "Degrades to O(n)"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using strict inequality nums[l] < nums[mid] for sorted check.",
        "solution": "Must use <= because when l == mid (2-element array), the single element is sorted."
      },
      {
        "mistake": "Forgetting to check both boundaries in containment test.",
        "solution": "Must check nums[l] <= target and target < nums[mid]."
      }
    ],
    "applications": [
      {
        "industry": "Distributed Systems",
        "application": "Consistent Hashing Ring (Chord DHT)",
        "benefit": "Searches node responsibilities across circular hash rings in O(log N) time."
      },
      {
        "industry": "Operating Systems",
        "application": "Circular Log Buffers",
        "benefit": "Searches timestamped events in ring buffers without requiring array reorganization."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-2-8-q1",
        "question": "How can you find the minimum element in a rotated sorted array in O(log n)?",
        "hint": "Compare arr[mid] with arr[high].",
        "answer": "If arr[mid] > arr[high], the inflection point lies in the right half (low = mid + 1). Else, high = mid. Terminate when low == high."
      },
      {
        "id": "dsa-2-8-q2",
        "question": "Why does allowing duplicates cause worst-case time to degrade to O(n)?",
        "hint": "Consider [1, 1, 1, 0, 1].",
        "answer": "When arr[low] == arr[mid] == arr[high], it is impossible to determine whether the pivot is in the left or right half without linearly pruning bounds (low++, high--)."
      },
      {
        "id": "dsa-2-8-q3",
        "question": "How many rotations k occurred if the minimum element is at index 4 in an array of size 7?",
        "hint": "Where was the minimum originally?",
        "answer": "Originally the minimum was at index 0. Moving to index 4 means the array was rotated right by 4 positions."
      }
    ],
    "quiz": [
      {
        "id": "dsa-2-8-quiz-1",
        "question": "What mathematical property ensures that modified binary search works on a rotated sorted array?",
        "options": [
          "At least one half [low..mid] or [mid..high] is always strictly sorted",
          "The array is always symmetric",
          "The median is always at index n // 2",
          "All elements sum to zero"
        ],
        "correctIndex": 0,
        "explanation": "Because the original array had only a single ascending slope, cutting it in half leaves at most one discontinuity; the other half is guaranteed to be sorted."
      },
      {
        "id": "dsa-2-8-quiz-2",
        "question": "In a rotated sorted array with distinct elements, how do you verify if the left half [low..mid] is sorted?",
        "options": [
          "nums[low] <= nums[mid]",
          "nums[mid] <= nums[high]",
          "nums[low] == nums[high]",
          "nums[mid] == target"
        ],
        "correctIndex": 0,
        "explanation": "If the value at low is less than or equal to the value at mid, no cliff drop occurred in that range, proving the left half is sorted."
      },
      {
        "id": "dsa-2-8-quiz-3",
        "question": "What is the worst-case time complexity of searching a rotated sorted array containing duplicate values?",
        "options": [
          "O(n)",
          "O(log n)",
          "O(n^2)",
          "O(1)"
        ],
        "correctIndex": 0,
        "explanation": "When nums[low] == nums[mid] == nums[high], we cannot eliminate half the array and can only advance pointers by 1, degrading to O(n) worst case."
      }
    ],
    "codingChallenge": {
      "title": "Find Minimum in Rotated Sorted Array",
      "problem": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the array nums of unique elements, return the minimum element of this array in O(log n) time.",
      "hints": [
        "Compare nums[mid] against nums[high].",
        "If nums[mid] > nums[high], the minimum must be strictly to the right of mid: low = mid + 1.",
        "Otherwise, nums[mid] <= nums[high], meaning mid could be the minimum or minimum is left: high = mid."
      ],
      "starterCode": "def find_min(nums):\n    low = 0\n    high = len(nums) - 1\n    while low < high:\n        mid = (low + high) // 2\n        # If mid > high, inflection point is on the right\n        if nums[mid] > nums[high]:\n            low = mid + 1\n        else:\n            high = mid\n    return nums[low]\n\nprint(find_min([3, 4, 5, 1, 2]))       # Expected: 1\nprint(find_min([4, 5, 6, 7, 0, 1, 2])) # Expected: 0\nprint(find_min([11, 13, 15, 17]))       # Expected: 11",
      "solution": "def find_min(nums):\n    low = 0\n    high = len(nums) - 1\n    while low < high:\n        mid = (low + high) // 2\n        if nums[mid] > nums[high]:\n            low = mid + 1\n        else:\n            high = mid\n    return nums[low]\n\nprint(find_min([3, 4, 5, 1, 2]))"
    },
    "summary": {
      "keyTakeaways": [
        "Dividing a rotated sorted array always yields at least one cleanly sorted half.",
        "Check if target falls within the bounds of the sorted half to eliminate half the array.",
        "Runs in O(log n) time and O(1) space on distinct inputs.",
        "Duplicate elements degrade performance to O(n) in the worst case."
      ],
      "nextLessonId": "dsa-arrays-matrix",
      "nextLessonTitle": "Matrix Traversal and Algorithms",
      "nextLessonModuleId": "dsa-module-2"
    },
    "lineByLine": [
      {
        "line": "5",
        "lines": "5",
        "code": "if nums[mid] > nums[high]: low = mid + 1",
        "codeSnippet": "if nums[mid] > nums[high]: low = mid + 1",
        "explanation": "If mid element is greater than high element, the cliff (pivot) must be in right half."
      },
      {
        "line": "7-8",
        "lines": "7-8",
        "code": "else: high = mid",
        "codeSnippet": "else: high = mid",
        "explanation": "Otherwise, minimum is at or to the left of mid."
      }
    ]
  },
  "dsa-arrays-matrix": {
    "id": "dsa-arrays-matrix",
    "moduleId": "dsa-module-2",
    "title": "Matrix Traversal and Algorithms",
    "subtitle": "2D Arrays, Row/Column-Major Order, Spiral Traversal & In-Place Rotation",
    "order": 9,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Understand Row-Major vs Column-Major 2D memory layouts in hardware RAM.",
      "Implement Spiral Matrix traversal using 4 bounding pointer limits.",
      "Rotate an N x N matrix 90 degrees clockwise in-place with O(1) extra space.",
      "Search a row-wise and column-wise sorted 2D matrix in O(m + n) time."
    ],
    "prerequisites": [
      "Array Operations and Memory Layout",
      "Nested loop traversals"
    ],
    "analogy": {
      "title": "The Peeling Onion / Spiraling Labyrinth",
      "text": "Navigating a walled palace maze from the outer perimeter to the center throne room requires walking the outer boundary wall clockwise: top wall left-to-right, right wall top-to-bottom, bottom wall right-to-left, and left wall bottom-to-top. Once that outer circuit is completed, you step inward by 1 meter on all 4 sides, effectively shrinking the boundary box, and repeat the clockwise circuit until the entire interior is visited.",
      "metaphor": "Spiral matrix traversal maintains 4 boundary walls (top, bottom, left, right) that shrink inwards after each edge is traversed."
    },
    "problemSolved": {
      "title": "2D Spatial Manipulation with Cache Efficiency",
      "description": "Hardware memory is strictly linear (1D). Understanding how 2D matrices map into 1D addresses prevents cache-thrashing disasters (row-major vs column-major iteration speed differences of over 10x) and enables in-place image rotations.",
      "keyPoints": [
        "Row-major address formula: Loc(A[i][j]) = Base + (i * cols + j) * size",
        "In-place 90-degree matrix rotation: Transpose + Reverse Rows",
        "Staircase search across sorted matrices in O(m + n) time"
      ]
    },
    "intuition": {
      "overview": "To rotate a matrix 90 degrees clockwise in-place: first transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row horizontally.",
      "steps": [
        {
          "step": 1,
          "title": "Transpose Matrix",
          "description": "Reflect elements across the main diagonal (swap (i, j) with (j, i) for j > i)."
        },
        {
          "step": 2,
          "title": "Horizontal Reflection",
          "description": "Reverse each row in-place using two pointers."
        },
        {
          "step": 3,
          "title": "Result Verification",
          "description": "Matrix is rotated 90 degrees clockwise in strictly O(1) auxiliary space."
        }
      ]
    },
    "formalDefinition": {
      "text": "A 2D matrix M of dimensions m x n in row-major order maps element M[i][j] to 1D index i * n + j. A 90-degree clockwise rotation R transforms coordinates according to: R(i, j) = (j, n - 1 - i). This transformation decomposes into Transpose followed by horizontal Row Reversal: (i, j) -> (j, i) -> (j, n - 1 - i).",
      "latex": "\\text{Loc}(M[i][j]) = \\text{Base} + (i \\cdot n + j) \\cdot w, \\quad R_{90}(M) = \\text{ReverseRows}(\\text{Transpose}(M))"
    },
    "complexity": {
      "overview": "Traversal: O(m * n) time. Search in sorted matrix: O(m + n) time. Rotate in-place: O(n^2) time, O(1) space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1) [Search] / O(m*n) [Traversal]",
          "space": "O(1)",
          "explanation": "Target found at top-right corner immediately."
        },
        {
          "case": "Average",
          "time": "O(m + n) [Search]",
          "space": "O(1)",
          "explanation": "Steps left or down from top-right corner."
        },
        {
          "case": "Worst",
          "time": "O(m + n) [Search]",
          "space": "O(1)",
          "explanation": "Traverses maximum perimeter path m + n."
        }
      ],
      "spaceNote": "In-place matrix rotations use strictly O(1) auxiliary space."
    },
    "workedExample": {
      "title": "Rotating 3x3 Matrix 90 Degrees Clockwise In-Place",
      "input": "Matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
      "steps": [
        {
          "step": 1,
          "action": "Transpose across diagonal",
          "state": "[[1, 4, 7], [2, 5, 8], [3, 6, 9]]",
          "explanation": "Swap (0,1) with (1,0), (0,2) with (2,0), and (1,2) with (2,1)."
        },
        {
          "step": 2,
          "action": "Reverse each row",
          "state": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
          "explanation": "Reverse row 0: [1,4,7] -> [7,4,1]. Reverse row 1: [2,5,8] -> [8,5,2]. Reverse row 2: [3,6,9] -> [9,6,3]."
        }
      ],
      "finalOutput": "Final rotated matrix: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]"
    },
    "visualExplanation": {
      "title": "The Staircase Search in a 2D Sorted Matrix",
      "description": "Starting at the top-right corner (row 0, col n-1): if current element > target, move LEFT (column is eliminated). If current element < target, move DOWN (row is eliminated). Each step prunes a full row or column.",
      "features": [
        "Top-right starting vantage",
        "Pruning full columns leftward",
        "Pruning full rows downward"
      ]
    },
    "pseudocode": {
      "title": "Spiral Order Traversal",
      "code": "def spiral_order(matrix):\n    top = 0, bottom = len(matrix) - 1\n    left = 0, right = len(matrix[0]) - 1\n    result = []\n    while top <= bottom and left <= right:\n        for c in range(left, right + 1): result.append(matrix[top][c])\n        top += 1\n        for r in range(top, bottom + 1): result.append(matrix[r][right])\n        right -= 1\n        if top <= bottom:\n            for c in range(right, left - 1, -1): result.append(matrix[bottom][c])\n            bottom -= 1\n        if left <= right:\n            for r in range(bottom, top - 1, -1): result.append(matrix[r][left])\n            left += 1\n    return result"
    },
    "pythonCode": {
      "title": "Rotate Image 90 Degrees Clockwise In-Place in Python",
      "code": "def rotate_matrix(matrix):\n    n = len(matrix)\n    # Step 1: Transpose in-place\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    # Step 2: Reverse each row in-place\n    for i in range(n):\n        matrix[i].reverse()\n    return matrix\n\nmat = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\nrotate_matrix(mat)\nprint(\"Rotated 90 degrees:\")\nfor row in mat:\n    print(row)",
      "explanation": "Combines diagonal transposition with row reversal to rotate in-place with O(1) extra space."
    },
    "runnableCode": {
      "code": "def search_matrix(matrix, target):\n    # Staircase search: start top-right\n    r, c = 0, len(matrix[0]) - 1\n    while r < len(matrix) and c >= 0:\n        val = matrix[r][c]\n        if val == target:\n            return True, (r, c)\n        elif val > target:\n            c -= 1 # Move left\n        else:\n            r += 1 # Move down\n    return False, (-1, -1)\n\ngrid = [\n    [1,  4,  7, 11],\n    [2,  5,  8, 12],\n    [3,  6,  9, 16],\n    [10, 13, 14, 17]\n]\nfound, pos = search_matrix(grid, 9)\nprint(f\"Found 9: {found} at coordinates {pos}\")",
      "expectedOutput": "Found 9: True at coordinates (2, 2)"
    },
    "lineByLineExplanation": [
      {
        "line": "3",
        "lines": "3",
        "code": "r, c = 0, len(matrix[0]) - 1",
        "codeSnippet": "r, c = 0, len(matrix[0]) - 1",
        "explanation": "Starts at top-right corner to maintain dual pruning directions."
      },
      {
        "line": "7-10",
        "lines": "7-10",
        "code": "elif val > target: c -= 1\nelse: r += 1",
        "codeSnippet": "elif val > target: c -= 1\nelse: r += 1",
        "explanation": "Eliminates entire column if too large, eliminates entire row if too small in O(1)."
      }
    ],
    "edgeCases": [
      {
        "case": "1x1 Matrix",
        "handling": "Single element returned without boundary issues.",
        "example": "[[5]]"
      },
      {
        "case": "Rectangular matrix (m != n)",
        "handling": "Spiral traversal correctly terminates; 90-degree in-place rotation is only possible on square N x N matrices.",
        "example": "3 x 5 matrix"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Iterating column-first in row-major memory languages (C/C++/Python).",
        "solution": "Always iterate rows outer and columns inner to maintain CPU cache line spatial locality."
      },
      {
        "mistake": "In spiral matrix, missing the if top <= bottom boundary check before bottom row scan.",
        "solution": "Prevents double-printing the same row on odd-height rectangular matrices."
      }
    ],
    "applications": [
      {
        "industry": "Image Processing & Computer Vision",
        "application": "Image Rotation & Convolution Filtering",
        "benefit": "Applies 90/180/270 degree rotations and 2D spatial Sobel/Gaussian convolution kernels."
      },
      {
        "industry": "Geospatial Mapping (GIS)",
        "application": "Digital Elevation Models (DEM)",
        "benefit": "Queries terrain slope elevation grids and contour paths in memory."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-2-9-q1",
        "question": "Why does iterating matrix[col][row] run up to 10x slower than matrix[row][col] in C or Python?",
        "hint": "Think about CPU cache lines and row-major layout.",
        "answer": "In row-major order, consecutive row elements are adjacent in RAM. Accessing column-wise jumps across entire rows in memory (strided access), causing a cache miss on almost every read."
      },
      {
        "id": "dsa-2-9-q2",
        "question": "How can you rotate a matrix 90 degrees counter-clockwise in-place?",
        "hint": "Transpose plus vertical flip or row reverse.",
        "answer": "Either Transpose then reverse columns vertically, or reverse rows horizontally then Transpose."
      },
      {
        "id": "dsa-2-9-q3",
        "question": "What is the time complexity of searching an m x n row-and-column sorted matrix using the top-right staircase search?",
        "hint": "How many steps can you take down and left?",
        "answer": "O(m + n). At each step we either increment row (at most m times) or decrement col (at most n times)."
      }
    ],
    "quiz": [
      {
        "id": "dsa-2-9-quiz-1",
        "question": "Which two geometric operations combined achieve a 90-degree clockwise in-place matrix rotation?",
        "options": [
          "Transpose the matrix across the diagonal, then reverse each row horizontally",
          "Invert all values, then swap row 0 with row n-1",
          "Shift elements cyclically by 1 position",
          "Sort every row, then sort every column"
        ],
        "correctIndex": 0,
        "explanation": "Transposing swaps (i, j) with (j, i); reversing each row maps (j, i) to (j, n - 1 - i), which exactly equals a 90-degree clockwise rotation."
      },
      {
        "id": "dsa-2-9-quiz-2",
        "question": "What is the time complexity of the staircase search in an m x n matrix where rows and columns are sorted in ascending order?",
        "options": [
          "O(m + n)",
          "O(m * n)",
          "O(log(m * n))",
          "O(1)"
        ],
        "correctIndex": 0,
        "explanation": "Starting at the top-right corner, each comparison moves either one step left or one step down, traversing at most m + n elements."
      },
      {
        "id": "dsa-2-9-quiz-3",
        "question": "In a row-major 2D array with 10 columns, what is the 1D index offset of element matrix[3][4]?",
        "options": [
          "34 (3 * 10 + 4)",
          "7 (3 + 4)",
          "43 (4 * 10 + 3)",
          "12 (3 * 4)"
        ],
        "correctIndex": 0,
        "explanation": "Under row-major order, offset = row * total_columns + col = 3 * 10 + 4 = 34."
      }
    ],
    "codingChallenge": {
      "title": "Spiral Matrix Generation",
      "problem": "Given a positive integer n, generate an n x n matrix filled with elements from 1 to n^2 in spiral order.",
      "hints": [
        "Initialize boundary walls top=0, bottom=n-1, left=0, right=n-1.",
        "Fill top row left-to-right, then right column top-to-bottom, then bottom row right-to-left, then left column bottom-to-top.",
        "Increment num from 1 to n^2."
      ],
      "starterCode": "def generate_matrix(n):\n    matrix = [[0] * n for _ in range(n)]\n    top, bottom = 0, n - 1\n    left, right = 0, n - 1\n    num = 1\n\n    while top <= bottom and left <= right:\n        for c in range(left, right + 1):\n            matrix[top][c] = num\n            num += 1\n        top += 1\n        for r in range(top, bottom + 1):\n            matrix[r][right] = num\n            num += 1\n        right -= 1\n        for c in range(right, left - 1, -1):\n            matrix[bottom][c] = num\n            num += 1\n        bottom -= 1\n        for r in range(bottom, top - 1, -1):\n            matrix[r][left] = num\n            num += 1\n        left += 1\n\n    return matrix\n\nres = generate_matrix(3)\nfor row in res:\n    print(row)\n# Expected:\n# [1, 2, 3]\n# [8, 9, 4]\n# [7, 6, 5]",
      "solution": "def generate_matrix(n):\n    matrix = [[0] * n for _ in range(n)]\n    top, bottom = 0, n - 1\n    left, right = 0, n - 1\n    num = 1\n\n    while top <= bottom and left <= right:\n        for c in range(left, right + 1):\n            matrix[top][c] = num\n            num += 1\n        top += 1\n        for r in range(top, bottom + 1):\n            matrix[r][right] = num\n            num += 1\n        right -= 1\n        for c in range(right, left - 1, -1):\n            matrix[bottom][c] = num\n            num += 1\n        bottom -= 1\n        for r in range(bottom, top - 1, -1):\n            matrix[r][left] = num\n            num += 1\n        left += 1\n\n    return matrix\n\nres = generate_matrix(3)"
    },
    "summary": {
      "keyTakeaways": [
        "2D matrices are flattened into 1D memory; row-major iteration maximizes cache hits.",
        "90-degree clockwise rotation = Transpose + Reverse Rows in-place.",
        "Sorted 2D matrix search executes in O(m + n) from top-right corner.",
        "Spiral traversal maintains 4 contracting boundary limits."
      ],
      "nextLessonId": "dsa-strings-operations",
      "nextLessonTitle": "String Representation and Operations",
      "nextLessonModuleId": "dsa-module-3"
    },
    "lineByLine": [
      {
        "line": "3",
        "lines": "3",
        "code": "r, c = 0, len(matrix[0]) - 1",
        "codeSnippet": "r, c = 0, len(matrix[0]) - 1",
        "explanation": "Starts at top-right corner to maintain dual pruning directions."
      },
      {
        "line": "7-10",
        "lines": "7-10",
        "code": "elif val > target: c -= 1\nelse: r += 1",
        "codeSnippet": "elif val > target: c -= 1\nelse: r += 1",
        "explanation": "Eliminates entire column if too large, eliminates entire row if too small in O(1)."
      }
    ]
  }
};
