import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule7Data: DSAModuleData = {
  "id": "dsa-module-7",
  "number": 7,
  "title": "Sorting Algorithms",
  "subtitle": "Comparison Sorts, Non-Comparison Sorts & Trade-offs",
  "description": "A comprehensive study of sorting from O(n²) elementary algorithms to O(n log n) divide-and-conquer sorts. Understand sorting stability, in-place constraints, and when to choose counting or radix sort for linear-time performance.",
  "icon": "ArrowUpDown",
  "badge": "Sorting",
  "estimatedHours": 7,
  "topicsCount": 7,
  "lessons": [
    {
      "id": "dsa-sort-basic",
      "moduleId": "dsa-module-7",
      "title": "Bubble, Selection, and Insertion Sort",
      "description": "Three O(n²) elementary sorts: their mechanics, when each performs better, and invariants.",
      "order": 1,
      "readTimeMinutes": 25,
      "visualizerType": "sorting",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-sort-merge",
      "moduleId": "dsa-module-7",
      "title": "Merge Sort",
      "description": "Divide-and-conquer O(n log n) stable sort: splitting, recursive sorting, and merging phases.",
      "order": 2,
      "readTimeMinutes": 28,
      "visualizerType": "sorting",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-sort-quick",
      "moduleId": "dsa-module-7",
      "title": "Quick Sort",
      "description": "Pivot selection, Lomuto/Hoare partitioning, average O(n log n) with O(n²) worst case.",
      "order": 3,
      "readTimeMinutes": 30,
      "visualizerType": "sorting",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-sort-heap",
      "moduleId": "dsa-module-7",
      "title": "Heap Sort",
      "description": "Building a max-heap in O(n) and extracting elements for an in-place O(n log n) sort.",
      "order": 4,
      "readTimeMinutes": 25,
      "visualizerType": "sorting",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-sort-counting-radix",
      "moduleId": "dsa-module-7",
      "title": "Counting Sort and Radix Sort",
      "description": "Non-comparison O(n+k) and O(d·n) sorting for bounded integer keys.",
      "order": 5,
      "readTimeMinutes": 25,
      "visualizerType": "sorting",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-sort-stability",
      "moduleId": "dsa-module-7",
      "title": "Sorting Stability and In-Place Sorting",
      "description": "What stability means, which sorts are stable, and the space implications of auxiliary arrays.",
      "order": 6,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-sort-tradeoffs",
      "moduleId": "dsa-module-7",
      "title": "Sorting Algorithm Trade-offs and Choosing the Right Sort",
      "description": "Decision guide: data size, range, stability needs, memory constraints, and real-world library choices.",
      "order": 7,
      "readTimeMinutes": 20,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    }
  ]
};

export const dsaModule7Lessons: Record<string, DSALessonContent> = {
  "dsa-sort-merge": {
    "id": "dsa-sort-merge",
    "moduleId": "dsa-module-7",
    "title": "Merge Sort",
    "subtitle": "Divide-and-Conquer, Guaranteed O(n log n) Sorting, and Stability Invariants",
    "order": 2,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "sorting",
    "objectives": [
      "Master the three phases of Divide-and-Conquer: Divide, Conquer, and Combine.",
      "Implement the canonical two-pointer merge subroutine in O(n) time.",
      "Derive the recurrence relation T(n) = 2T(n/2) + O(n) using the Master Theorem.",
      "Understand why Merge Sort is guaranteed O(n log n) in all cases (unlike Quick Sort).",
      "Explain why Merge Sort is stable and why stability is crucial for multi-column sorting."
    ],
    "prerequisites": [
      "Recursion fundamentals and recursion trees",
      "Two pointer technique for merging sorted arrays",
      "Big O notation and Master Theorem basics"
    ],
    "analogy": {
      "title": "Merging Two Sorted Decks of Playing Cards",
      "text": "Imagine sorting a large stack of 64 unsorted test papers. Trying to scan and place all 64 at once is overwhelming. Instead, you split the stack in half into two piles of 32, and give one pile to a teaching assistant while you take the other. You each repeat this halving process until single individual papers remain (which are trivially sorted). Now comes the genius part: merging two already-sorted piles of papers. You place the two sorted stacks side-by-side, look ONLY at the top paper of each stack, pick whichever is smaller, and place it into your combined pile. Because you only ever compare the two top cards, merging takes linear time proportional to the total number of papers.",
      "metaphor": "Merge Sort replaces difficult global sorting with trivial splitting, followed by an efficient linear-time merge of two already-sorted halves."
    },
    "problemSolved": {
      "title": "Eliminating Quadratic O(n²) Worst-Case Performance",
      "description": "Elementary sorts like Bubble, Selection, and Insertion Sort degrade to O(n²) operations on large inputs (e.g., 100,000 items require 10 billion comparisons). Merge Sort guarantees O(n log n) comparisons regardless of how scrambled or adversarial the input data is, running 100,000 items in roughly 1.6 million operations.",
      "keyPoints": [
        "Strict O(n log n) worst-case time bound with zero performance degradation on sorted/reverse data",
        "Stable sorting: preserves original relative ordering of duplicate elements",
        "Directly applicable to external sorting (sorting terabytes of data stored on disk)"
      ]
    },
    "intuition": {
      "overview": "Merge Sort splits the array down to base cases of length 1, then reconstructs the sorted sequence by repeatedly zipper-merging adjacent sorted subarrays.",
      "steps": [
        {
          "step": 1,
          "title": "Divide",
          "description": "Calculate mid = len(arr) // 2 and divide the unsorted array into left and right halves."
        },
        {
          "step": 2,
          "title": "Conquer",
          "description": "Recursively invoke merge_sort on the left half and right half until sub-arrays of size 1 are reached."
        },
        {
          "step": 3,
          "title": "Combine (Merge)",
          "description": "Use two pointers i and j to compare elements from left and right, appending the smaller to an auxiliary array."
        },
        {
          "step": 4,
          "title": "Copy Back",
          "description": "Copy the sorted auxiliary array back into the original array slice."
        }
      ]
    },
    "formalDefinition": {
      "text": "Merge Sort is a comparison-based divide-and-conquer sorting algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
      "latex": "T(n) = 2T\\left(\\frac{n}{2}\\right) + \\Theta(n) \\implies T(n) = \\Theta(n \\log n)"
    },
    "complexity": {
      "overview": "Merge Sort takes O(n log n) time across all input distributions because the tree depth is always log2(n) and each level requires O(n) total merge work.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Even if the array is already sorted, Merge Sort splits down to single elements and merges them in O(n log n)."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Random permutations require exactly log2(n) levels with n operations per level."
        },
        {
          "case": "Worst",
          "time": "O(n log n)",
          "space": "O(n)",
          "explanation": "Adversarial reverse-sorted data still finishes in guaranteed O(n log n) time."
        }
      ],
      "spaceNote": "Standard Merge Sort requires O(n) auxiliary memory for the temporary merge buffer. This is its main disadvantage compared to Quick Sort and Heap Sort."
    },
    "workedExample": {
      "title": "Sorting [38, 27, 43, 3, 9, 82, 10]",
      "input": "arr = [38, 27, 43, 3, 9, 82, 10]",
      "steps": [
        {
          "step": 1,
          "action": "Split",
          "state": "Left: [38, 27, 43], Right: [3, 9, 82, 10]",
          "explanation": "Divide array into two halves at midpoint index 3."
        },
        {
          "step": 2,
          "action": "Recursively Split to Size 1",
          "state": "[38], [27], [43], [3], [9], [82], [10]",
          "explanation": "Continue splitting until every subproblem contains exactly 1 element."
        },
        {
          "step": 3,
          "action": "Merge Pairs of Size 1",
          "state": "[27, 38], [43], [3, 9], [10, 82]",
          "explanation": "Compare adjacent elements and merge into sorted pairs."
        },
        {
          "step": 4,
          "action": "Merge Pairs of Size 2",
          "state": "[27, 38, 43] and [3, 9, 10, 82]",
          "explanation": "Merge sorted subarrays using two pointers."
        },
        {
          "step": 5,
          "action": "Final Combine",
          "state": "[3, 9, 10, 27, 38, 43, 82]",
          "explanation": "Zipper-merge left half [27, 38, 43] with right half [3, 9, 10, 82] to produce final sorted array."
        }
      ],
      "finalOutput": "[3, 9, 10, 27, 38, 43, 82]"
    },
    "visualExplanation": {
      "title": "Divide & Conquer Recursion Tree Visualization",
      "description": "The interactive sorting visualizer displays bars with heights corresponding to values, animating comparisons and buffer writes during each merge stage.",
      "features": [
        "Color-coded left and right subarrays during merging.",
        "Highlighted active comparison pointers i and j.",
        "Real-time write animations into the auxiliary buffer."
      ]
    },
    "pseudocode": {
      "title": "Merge Sort and Merge Subroutine",
      "code": "function merge_sort(arr):\n    if length(arr) <= 1:\n        return arr\n    mid = length(arr) / 2\n    left = merge_sort(arr[0..mid])\n    right = merge_sort(arr[mid..end])\n    return merge(left, right)\n\nfunction merge(left, right):\n    result = []\n    i = 0, j = 0\n    while i < length(left) and j < length(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i = i + 1\n        else:\n            result.append(right[j])\n            j = j + 1\n    append remaining elements of left and right to result\n    return result"
    },
    "pythonCode": {
      "title": "Production Merge Sort in Python",
      "code": "def merge_sort(arr: list) -> list:\n    \"\"\"Sorts an array using top-down Merge Sort in O(n log n) time.\"\"\"\n    if len(arr) <= 1:\n        return arr\n\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n\n    return merge(left, right)\n\ndef merge(left: list, right: list) -> list:\n    merged = []\n    i = j = 0\n\n    while i < len(left) and j < len(right):\n        # Using <= ensures STABILITY (left item chosen first on tie)\n        if left[i] <= right[j]:\n            merged.append(left[i])\n            i += 1\n        else:\n            merged.append(right[j])\n            j += 1\n\n    merged.extend(left[i:])\n    merged.extend(right[j:])\n    return merged",
      "explanation": "Notice the <= operator in the merge condition: when left[i] == right[j], we always pick from left first, preserving the initial relative ordering of identical keys (Stability invariant)."
    },
    "runnableCode": {
      "code": "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    # Merge\n    res = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            res.append(left[i]); i += 1\n        else:\n            res.append(right[j]); j += 1\n    res.extend(left[i:])\n    res.extend(right[j:])\n    return res\n\ntest_data = [64, 34, 25, 12, 22, 11, 90]\nprint(\"Unsorted:\", test_data)\nprint(\"Sorted:  \", merge_sort(test_data))",
      "expectedOutput": "Unsorted: [64, 34, 25, 12, 22, 11, 90]\nSorted:   [11, 12, 22, 25, 34, 64, 90]"
    },
    "lineByLineExplanation": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "if len(arr) <= 1: return arr",
        "codeSnippet": "if len(arr) <= 1: return arr",
        "explanation": "Base case: an array of 0 or 1 elements is already sorted."
      },
      {
        "line": "4-6",
        "lines": "4-6",
        "code": "mid = len(arr) // 2; left = merge_sort(arr[:mid]); right = merge_sort(arr[mid:])",
        "codeSnippet": "mid = len(arr) // 2; left = merge_sort(arr[:mid]); right = merge_sort(arr[mid:])",
        "explanation": "Splits array in half and recursively sorts both halves down to size 1."
      },
      {
        "line": "8-18",
        "lines": "8-18",
        "code": "if left[i] <= right[j]: ...",
        "codeSnippet": "if left[i] <= right[j]: ...",
        "explanation": "Zipper-merges two sorted arrays by advancing the pointer with the smaller value in O(n) total time."
      }
    ],
    "edgeCases": [
      {
        "case": "Already sorted array",
        "handling": "Still executes full split and merge in O(n log n). Can be optimized with \"if left[-1] <= right[0]: return left + right\".",
        "example": "[1, 2, 3, 4] -> takes O(n log n) without early-exit check."
      },
      {
        "case": "Duplicate elements",
        "handling": "Using <= instead of < guarantees that equal elements retain their original relative positions.",
        "example": "[(1, \"A\"), (1, \"B\")] remains [(1, \"A\"), (1, \"B\")]."
      },
      {
        "case": "Odd-length arrays",
        "handling": "Integer division // creates halves of sizes n//2 and n - n//2 without issues.",
        "example": "len 7 splits into sizes 3 and 4."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using strictly less than (<) instead of less-than-or-equal (<=) in merge",
        "solution": "Using < causes equal elements in the right half to jump ahead of equal elements in the left half, destroying sorting stability."
      },
      {
        "mistake": "Assuming Merge Sort is in-place",
        "solution": "Standard array Merge Sort requires O(n) auxiliary memory for buffer arrays. In-place merge sort exists but has high constant factors."
      }
    ],
    "applications": [
      {
        "industry": "Database Engines",
        "application": "External Merge Sort",
        "benefit": "Sorting datasets larger than available RAM by sorting disk chunks and streaming them through multi-way merge."
      },
      {
        "industry": "Programming Language Runtimes",
        "application": "Python Timsort Core",
        "benefit": "Python standard sorted() is Timsort, a hybrid of Merge Sort and Insertion Sort that takes advantage of existing natural runs."
      },
      {
        "industry": "Data Analysis",
        "application": "Inversion Counting",
        "benefit": "Modifying the merge step counts how far an array is from being sorted in O(n log n) time (measuring rank correlation)."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-ms-q1",
        "question": "Why does Merge Sort guarantee O(n log n) time while Quick Sort has an O(n²) worst-case?",
        "hint": "Consider how the array is partitioned: does Merge Sort depend on pivot selection?",
        "answer": "Merge Sort always splits the array at the exact midpoint (index n//2), guaranteeing balanced trees of depth exactly ceil(log2 n). Quick Sort partitions around a pivot; if the pivot is repeatedly the extreme min or max, the tree degenerates into a linear chain of depth n, causing O(n²) time."
      },
      {
        "id": "dsa-ms-q2",
        "question": "What does \"Sorting Stability\" mean, and why is Merge Sort stable?",
        "hint": "What happens to two elements with identical keys?",
        "answer": "A sorting algorithm is stable if elements with identical keys appear in the same relative order in the sorted output as in the original input. Merge Sort is stable because when left[i] == right[j], the merge logic always chooses left[i] first."
      },
      {
        "id": "dsa-ms-q3",
        "question": "What is the space complexity of Merge Sort on linked lists versus arrays?",
        "hint": "Can linked list nodes be rewired without auxiliary buffers?",
        "answer": "On arrays, Merge Sort requires O(n) auxiliary space for temporary merging. On linked lists, Merge Sort can be merged in-place by rewiring node .next pointers, reducing auxiliary space to O(log n) for call stack frames."
      }
    ],
    "quiz": [
      {
        "id": "dsa-ms-quiz-1",
        "question": "What is the recurrence relation for Merge Sort?",
        "options": [
          "T(n) = T(n - 1) + O(1)",
          "T(n) = 2T(n / 2) + O(n)",
          "T(n) = T(n / 2) + O(1)",
          "T(n) = 2T(n / 2) + O(1)"
        ],
        "correctIndex": 1,
        "explanation": "Merge Sort divides into 2 subproblems of size n/2 and performs O(n) merge work: T(n) = 2T(n/2) + O(n), which solves to O(n log n) by Master Theorem Case 2."
      },
      {
        "id": "dsa-ms-quiz-2",
        "question": "Which of the following is the primary disadvantage of Merge Sort compared to Quick Sort?",
        "options": [
          "Merge Sort has O(n²) worst-case time",
          "Merge Sort is not stable",
          "Merge Sort requires O(n) auxiliary memory for arrays",
          "Merge Sort cannot sort strings"
        ],
        "correctIndex": 2,
        "explanation": "Merge Sort requires O(n) auxiliary memory to hold the merged elements, whereas Quick Sort can be performed in-place with O(log n) stack space."
      },
      {
        "id": "dsa-ms-quiz-3",
        "question": "What condition in the merge subroutine guarantees stability?",
        "options": [
          "left[i] < right[j]",
          "left[i] <= right[j]",
          "left[i] > right[j]",
          "left[i] != right[j]"
        ],
        "correctIndex": 1,
        "explanation": "Using <= ensures that on ties (left[i] == right[j]), the element from the left subarray is chosen first, maintaining its original preceding position."
      }
    ],
    "codingChallenge": {
      "title": "Merge Two Sorted Arrays in O(m + n)",
      "problem": "You are given two sorted integer arrays \"nums1\" and \"nums2\". Return a new sorted array containing all elements of nums1 and nums2 in non-decreasing order.",
      "hints": [
        "Maintain two indices i = 0 for nums1 and j = 0 for nums2.",
        "Compare nums1[i] and nums2[j]; append the smaller value to merged and advance its pointer.",
        "After the main loop finishes, append any leftover elements from nums1 and nums2."
      ],
      "starterCode": "def merge_two_sorted(nums1, nums2):\n    merged = []\n    # Your two-pointer merge code here\n    return merged\n\n# Test case:\nprint(merge_two_sorted([1, 3, 5, 7], [2, 4, 6, 8]))  # Expected: [1, 2, 3, 4, 5, 6, 7, 8]",
      "solution": "def merge_two_sorted(nums1, nums2):\n    merged = []\n    i = 0\n    j = 0\n    m = len(nums1)\n    n = len(nums2)\n    \n    while i < m and j < n:\n        if nums1[i] <= nums2[j]:\n            merged.append(nums1[i])\n            i += 1\n        else:\n            merged.append(nums2[j])\n            j += 1\n            \n    while i < m:\n        merged.append(nums1[i])\n        i += 1\n        \n    while j < n:\n        merged.append(nums2[j])\n        j += 1\n        \n    return merged\n\n# Test case:\nprint(merge_two_sorted([1, 3, 5, 7], [2, 4, 6, 8]))  # Output: [1, 2, 3, 4, 5, 6, 7, 8]"
    },
    "summary": {
      "keyTakeaways": [
        "Merge Sort is a Divide-and-Conquer algorithm with guaranteed O(n log n) time in all cases.",
        "The merge step takes O(n) time using two pointers.",
        "Using <= preserves the stability invariant.",
        "Auxiliary space is O(n) on arrays, making it less memory-compact than in-place Quick Sort."
      ],
      "nextLessonId": "dsa-sort-quick",
      "nextLessonTitle": "Quick Sort",
      "nextLessonModuleId": "dsa-module-7"
    },
    "lineByLine": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "if len(arr) <= 1: return arr",
        "codeSnippet": "if len(arr) <= 1: return arr",
        "explanation": "Base case: an array of 0 or 1 elements is already sorted."
      },
      {
        "line": "4-6",
        "lines": "4-6",
        "code": "mid = len(arr) // 2; left = merge_sort(arr[:mid]); right = merge_sort(arr[mid:])",
        "codeSnippet": "mid = len(arr) // 2; left = merge_sort(arr[:mid]); right = merge_sort(arr[mid:])",
        "explanation": "Splits array in half and recursively sorts both halves down to size 1."
      },
      {
        "line": "8-18",
        "lines": "8-18",
        "code": "if left[i] <= right[j]: ...",
        "codeSnippet": "if left[i] <= right[j]: ...",
        "explanation": "Zipper-merges two sorted arrays by advancing the pointer with the smaller value in O(n) total time."
      }
    ]
  },
  "dsa-sort-basic": {
    "id": "dsa-sort-basic",
    "moduleId": "dsa-module-7",
    "title": "Bubble, Selection, and Insertion Sort",
    "subtitle": "Foundational Quadratic O(n²) Comparison Sorts and Adaptive Invariants",
    "order": 1,
    "readTimeMinutes": 24,
    "difficulty": "Beginner",
    "visualizerType": "sorting",
    "objectives": [
      "Contrast Bubble Sort (adjacent bubbling), Selection Sort (extrema finding), and Insertion Sort (incremental insertion).",
      "Understand why Insertion Sort is adaptive, running in O(n) on nearly-sorted data.",
      "Differentiate stability: why Bubble and Insertion Sort are stable while Selection Sort is unstable.",
      "Analyze inversion counts and their direct relation to Insertion Sort swaps."
    ],
    "prerequisites": [
      "Arrays and Dynamic Arrays",
      "Time Complexity and Big-O"
    ],
    "analogy": {
      "title": "Sorting a Hand of Playing Cards",
      "text": "When dealt playing cards, you pick up one card at a time and slide it into its correct position among the already sorted cards in your left hand. This intuitive card-player technique is exactly Insertion Sort.",
      "metaphor": "Insertion sort grows a sorted partition one element at a time by sliding elements into place."
    },
    "problemSolved": {
      "title": "Simplicity and Adaptability for Small Datasets",
      "description": "While advanced sorts (Quick/Merge Sort) have O(n log n) overhead, Insertion Sort has minimal constant factors, zero auxiliary memory, and excels on small (n <= 16) or nearly sorted arrays.",
      "keyPoints": [
        "Insertion sort runs in O(n) best-case time.",
        "Core building block of hybrid industrial sorts (Timsort, Introsort).",
        "Completely in-place with O(1) extra memory."
      ]
    },
    "intuition": {
      "overview": "Divide array into sorted prefix [0..i-1] and unsorted suffix [i..n-1]. In iteration i, pick key = arr[i] and shift sorted elements greater than key one position to the right, then insert key.",
      "steps": [
        {
          "step": 1,
          "title": "Pick Next Key",
          "description": "At index i, store key = arr[i]."
        },
        {
          "step": 2,
          "title": "Shift Larger Elements",
          "description": "Scan backwards from j = i - 1. While arr[j] > key, arr[j+1] = arr[j], j--."
        },
        {
          "step": 3,
          "title": "Insert Key",
          "description": "Place key at the newly opened slot arr[j+1]."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let I(A) = \\{(i, j) : i < j \\land A[i] > A[j]\\} be the set of inversions of array A. The number of swaps performed by Insertion Sort is strictly equal to |I(A)|.",
      "latex": "T_{\\text{insertion}}(n) = \\Theta(n + |I(A)|) \\implies T_{\\text{best}}(n) = O(n) \\text{ when } |I(A)| = 0"
    },
    "complexity": {
      "overview": "Bubble & Selection: O(n²) always. Insertion: O(n) best, O(n²) worst. All run in O(1) space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Already sorted array: Insertion sort makes only n-1 comparisons and 0 shifts."
        },
        {
          "case": "Average",
          "time": "O(n²)",
          "space": "O(1)",
          "explanation": "Random array has n(n-1)/4 expected inversions."
        },
        {
          "case": "Worst",
          "time": "O(n²)",
          "space": "O(1)",
          "explanation": "Reverse sorted array has n(n-1)/2 inversions."
        }
      ],
      "spaceNote": "In-place sorting with O(1) auxiliary space."
    },
    "workedExample": {
      "title": "Insertion Sort on [5, 2, 4, 6, 1, 3]",
      "input": "arr = [5, 2, 4, 6, 1, 3]",
      "steps": [
        {
          "step": 1,
          "action": "i=1, key=2",
          "state": "5 shifts right -> [2, 5, 4, 6, 1, 3]",
          "explanation": "2 inserted before 5."
        },
        {
          "step": 2,
          "action": "i=2, key=4",
          "state": "5 shifts right -> [2, 4, 5, 6, 1, 3]",
          "explanation": "4 inserted between 2 and 5."
        },
        {
          "step": 3,
          "action": "i=3, key=6",
          "state": "No shifts -> [2, 4, 5, 6, 1, 3]",
          "explanation": "6 is already >= 5."
        },
        {
          "step": 4,
          "action": "i=4, key=1",
          "state": "6, 5, 4, 2 shift -> [1, 2, 4, 5, 6, 3]",
          "explanation": "1 slides to index 0."
        },
        {
          "step": 5,
          "action": "i=5, key=3",
          "state": "6, 5, 4 shift -> [1, 2, 3, 4, 5, 6]",
          "explanation": "3 inserted between 2 and 4."
        }
      ],
      "finalOutput": "[1, 2, 3, 4, 5, 6]"
    },
    "visualExplanation": {
      "title": "Growing Sorted Boundary",
      "description": "Visualizing green sorted region expanding left-to-right as incoming elements slide into their exact rank.",
      "features": [
        "Active element highlighted in yellow",
        "Compared elements shift rightward in green region"
      ]
    },
    "pseudocode": {
      "title": "Insertion Sort Algorithm",
      "code": "function insertionSort(arr):\n    for i from 1 to length(arr) - 1:\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j = j - 1\n        arr[j + 1] = key"
    },
    "pythonCode": {
      "title": "Python Insertion Sort",
      "code": "def insertion_sort(arr: list[int]) -> list[int]:\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr",
      "explanation": "Shifts elements greater than key one position ahead to make room."
    },
    "runnableCode": {
      "code": "arr = [5, 2, 4, 6, 1, 3]\nprint(insertion_sort(arr))",
      "expectedOutput": "[1, 2, 3, 4, 5, 6]"
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "while j >= 0 and arr[j] > key:",
        "codeSnippet": "while j >= 0 and arr[j] > key:",
        "explanation": "Checks bounds and verifies if element at j is larger than key. Using strictly > preserves sorting stability."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "arr[j + 1] = arr[j]",
        "codeSnippet": "arr[j + 1] = arr[j]",
        "explanation": "Shifts element rightward to create space."
      }
    ],
    "edgeCases": [
      {
        "case": "Array of size 0 or 1",
        "handling": "Outer loop does not execute; returns original array in O(1).",
        "example": "[] or [42]"
      },
      {
        "case": "Already sorted array",
        "handling": "Inner while loop condition fails immediately; runs in O(n).",
        "example": "[1, 2, 3, 4]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using arr[j] >= key instead of >",
        "solution": "Using >= causes identical keys to swap past each other, destroying sorting stability.",
        "codeExample": "while j >= 0 and arr[j] > key: # strict >"
      }
    ],
    "applications": [
      {
        "industry": "Standard Libraries",
        "application": "Small sub-array sorting in Python Timsort and V8 JavaScript engine",
        "benefit": "Beats QuickSort on partitions of size <= 16 due to low constant overhead."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-sb-1",
        "question": "Why is Selection Sort unstable?",
        "hint": "Consider array [2a, 2b, 1].",
        "answer": "When swapping minimum element 1 with index 0 (2a), 2a moves past 2b, changing their relative initial order."
      }
    ],
    "quiz": [
      {
        "id": "q-sb-1",
        "question": "What is the best-case time complexity of Insertion Sort on an already sorted array?",
        "options": [
          "O(n)",
          "O(n²)",
          "O(n log n)",
          "O(1)"
        ],
        "correctIndex": 0,
        "explanation": "Insertion sort makes 1 comparison per element and 0 shifts, taking O(n) total time."
      }
    ],
    "codingChallenge": {
      "title": "Selection Sort Implementation",
      "problem": "Implement Selection Sort. Find the minimum element in the unsorted suffix and swap it with the first unsorted position.",
      "hints": [
        "Track min_idx in the inner loop."
      ],
      "starterCode": "def selection_sort(arr: list[int]) -> list[int]:\n    # TODO: Implement selection sort\n    pass",
      "solution": "def selection_sort(arr: list[int]) -> list[int]:\n    n = len(arr)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr"
    },
    "summary": {
      "keyTakeaways": [
        "Insertion sort is adaptive and stable.",
        "Selection sort minimizes writes (at most n swaps) but is unstable."
      ],
      "nextLessonId": "dsa-sort-merge",
      "nextLessonTitle": "Merge Sort",
      "nextLessonModuleId": "dsa-module-7"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "while j >= 0 and arr[j] > key:",
        "codeSnippet": "while j >= 0 and arr[j] > key:",
        "explanation": "Checks bounds and verifies if element at j is larger than key. Using strictly > preserves sorting stability."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "arr[j + 1] = arr[j]",
        "codeSnippet": "arr[j + 1] = arr[j]",
        "explanation": "Shifts element rightward to create space."
      }
    ]
  },
  "dsa-sort-quick": {
    "id": "dsa-sort-quick",
    "moduleId": "dsa-module-7",
    "title": "Quick Sort",
    "subtitle": "Divide-and-Conquer Partitioning, Pivot Selection & Recursion Depth",
    "order": 3,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "sorting",
    "objectives": [
      "Master the partition routine (Lomuto and Hoare partitioning schemes).",
      "Understand average-case O(n log n) divide-and-conquer mechanics.",
      "Mitigate worst-case O(n²) behavior using randomized pivot selection and Median-of-Three.",
      "Control auxiliary stack memory using tail-recursion optimization."
    ],
    "prerequisites": [
      "Merge Sort",
      "Recursion Trees and Call Stacks"
    ],
    "analogy": {
      "title": "The Classroom Height Divider",
      "text": "A teacher picks a student at random to act as the pivot benchmark. All students shorter than the benchmark move to the left side of the room, and all students taller move to the right side. The teacher then repeats this process independently on each half.",
      "metaphor": "Partitioning puts the pivot into its final sorted position in a single O(n) pass."
    },
    "problemSolved": {
      "title": "High-Speed In-Place Sorting with Cache Locality",
      "description": "Unlike Merge Sort, Quick Sort partitions data in place without O(n) auxiliary memory. It boasts phenomenal cache locality and small constant factors, making it the fastest general-purpose comparison sort in practice.",
      "keyPoints": [
        "In-place partitioning requires O(1) extra array memory.",
        "Average runtime of O(n log n) with tiny constant factors.",
        "Core algorithm of C qsort and C++ std::sort (Introsort)."
      ]
    },
    "intuition": {
      "overview": "Choose a pivot element. Rearrange array so elements < pivot are left, elements > pivot are right. Recursively sort left and right partitions.",
      "steps": [
        {
          "step": 1,
          "title": "Choose Pivot",
          "description": "Pick pivot (e.g. last element or random element)."
        },
        {
          "step": 2,
          "title": "Partition Array",
          "description": "Scan array and swap smaller elements to the left. Swap pivot into boundary."
        },
        {
          "step": 3,
          "title": "Recurse",
          "description": "Recursively call quicksort on left partition [low..p-1] and right partition [p+1..high]."
        }
      ]
    },
    "formalDefinition": {
      "text": "Quick Sort partitions array A around pivot element p = A[k] such that for all i < p_idx, A[i] \\le p, and for all j > p_idx, A[j] \\ge p. Recurrence relation: T(n) = T(k) + T(n - k - 1) + O(n).",
      "latex": "T_{\\text{avg}}(n) = 2 T(n/2) + O(n) = O(n \\log n), \\quad T_{\\text{worst}}(n) = T(n - 1) + O(n) = O(n^2)"
    },
    "complexity": {
      "overview": "Time: Average O(n log n), Worst O(n²). Space: O(log n) call stack frames.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log n)",
          "space": "O(log n)",
          "explanation": "Pivot splits array into two equal halves at every level."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(log n)",
          "explanation": "Balanced random partition splits."
        },
        {
          "case": "Worst",
          "time": "O(n²)",
          "space": "O(n)",
          "explanation": "Already sorted array with first or last element chosen as pivot."
        }
      ],
      "spaceNote": "O(log n) stack space for balanced recursive calls."
    },
    "workedExample": {
      "title": "Lomuto Partition on [3, 8, 2, 5, 1, 4]",
      "input": "Pivot = 4 (last element)",
      "steps": [
        {
          "step": 1,
          "action": "Check 3",
          "state": "3 < 4: swap with self -> [3, 8, 2, 5, 1, 4], i=0",
          "explanation": "3 is smaller than pivot."
        },
        {
          "step": 2,
          "action": "Check 8",
          "state": "8 > 4: advance j",
          "explanation": "8 is larger than pivot."
        },
        {
          "step": 3,
          "action": "Check 2",
          "state": "2 < 4: swap 2 with 8 -> [3, 2, 8, 5, 1, 4], i=1",
          "explanation": "2 moves to small partition."
        },
        {
          "step": 4,
          "action": "Check 5",
          "state": "5 > 4: advance j",
          "explanation": "5 is larger."
        },
        {
          "step": 5,
          "action": "Check 1",
          "state": "1 < 4: swap 1 with 8 -> [3, 2, 1, 5, 8, 4], i=2",
          "explanation": "1 moves to small partition."
        },
        {
          "step": 6,
          "action": "Place Pivot",
          "state": "swap 4 with 5 -> [3, 2, 1, 4, 8, 5]",
          "explanation": "Pivot 4 placed at index 3."
        }
      ],
      "finalOutput": "Partitioned: [3, 2, 1] < 4 < [8, 5]"
    },
    "visualExplanation": {
      "title": "In-Place Partition Boundary",
      "description": "Pointer i tracks boundary of elements smaller than pivot; j scans forward to discover elements.",
      "features": [
        "Yellow bar marks pivot value",
        "Blue marks elements < pivot; orange marks elements >= pivot"
      ]
    },
    "pseudocode": {
      "title": "Quick Sort Algorithm (Lomuto)",
      "code": "function quickSort(arr, low, high):\n    if low < high:\n        p = partition(arr, low, high)\n        quickSort(arr, low, p - 1)\n        quickSort(arr, p + 1, high)\n\nfunction partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j from low to high - 1:\n        if arr[j] <= pivot:\n            i = i + 1\n            swap(arr[i], arr[j])\n    swap(arr[i + 1], arr[high])\n    return i + 1"
    },
    "pythonCode": {
      "title": "Python Quick Sort Implementation",
      "code": "import random\n\ndef quick_sort(arr: list[int]) -> list[int]:\n    def sort(low, high):\n        if low < high:\n            p = partition(low, high)\n            sort(low, p - 1)\n            sort(p + 1, high)\n\n    def partition(low, high):\n        rand_idx = random.randint(low, high)\n        arr[rand_idx], arr[high] = arr[high], arr[rand_idx]\n        pivot = arr[high]\n        i = low - 1\n        for j in range(low, high):\n            if arr[j] <= pivot:\n                i += 1\n                arr[i], arr[j] = arr[j], arr[i]\n        arr[i + 1], arr[high] = arr[high], arr[i + 1]\n        return i + 1\n\n    sort(0, len(arr) - 1)\n    return arr",
      "explanation": "Employs randomized pivot selection to protect against worst-case O(n²) inputs."
    },
    "runnableCode": {
      "code": "arr = [3, 8, 2, 5, 1, 4]\nprint(quick_sort(arr))",
      "expectedOutput": "[1, 2, 3, 4, 5, 8]"
    },
    "lineByLineExplanation": [
      {
        "line": 11,
        "lines": "11",
        "code": "arr[rand_idx], arr[high] = arr[high], arr[rand_idx]",
        "codeSnippet": "arr[rand_idx], arr[high] = arr[high], arr[rand_idx]",
        "explanation": "Randomized pivot prevents adversarial worst-case O(n²) behavior on sorted inputs."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "arr[i + 1], arr[high] = arr[high], arr[i + 1]",
        "codeSnippet": "arr[i + 1], arr[high] = arr[high], arr[i + 1]",
        "explanation": "Swaps pivot into its exact final sorted boundary position."
      }
    ],
    "edgeCases": [
      {
        "case": "All identical elements",
        "handling": "Standard Lomuto degrades to O(n²); 3-way partition (Dutch National Flag) solves it in O(n).",
        "example": "[7, 7, 7, 7]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Always choosing arr[0] or arr[-1] as pivot",
        "solution": "Already sorted inputs cause O(n²) worst-case runtime; use randomized pivot or median-of-three.",
        "codeExample": "pivot_idx = random.randint(low, high)"
      }
    ],
    "applications": [
      {
        "industry": "Operating Systems",
        "application": "Standard C library qsort() implementation",
        "benefit": "Ultra-fast in-place general sorting."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-qs-1",
        "question": "Why is Quick Sort typically faster than Merge Sort despite both having O(n log n) average time?",
        "hint": "Consider CPU cache lines and memory allocation.",
        "answer": "Quick Sort works in-place, having superior spatial locality with fewer memory allocations and cache misses."
      }
    ],
    "quiz": [
      {
        "id": "q-qs-1",
        "question": "What is the worst-case time complexity of Quick Sort?",
        "options": [
          "O(n²)",
          "O(n log n)",
          "O(n)",
          "O(2^n)"
        ],
        "correctIndex": 0,
        "explanation": "When pivot splits are completely unbalanced (e.g. 0 and n-1 elements), recursion depth is n, taking O(n²) time."
      }
    ],
    "codingChallenge": {
      "title": "Kth Largest Element in an Array (Quickselect)",
      "problem": "Find the kth largest element in an unsorted array in O(n) average time using Quickselect.",
      "hints": [
        "Partition the array. If pivot index matches target, return pivot. Otherwise recurse into only one side."
      ],
      "starterCode": "def find_kth_largest(nums: list[int], k: int) -> int:\n    # TODO: Implement Quickselect\n    pass",
      "solution": "import random\n\ndef find_kth_largest(nums: list[int], k: int) -> int:\n    target = len(nums) - k # index in sorted order\n    def select(low, high):\n        rand_idx = random.randint(low, high)\n        nums[rand_idx], nums[high] = nums[high], nums[rand_idx]\n        pivot = nums[high]\n        i = low\n        for j in range(low, high):\n            if nums[j] <= pivot:\n                nums[i], nums[j] = nums[j], nums[i]\n                i += 1\n        nums[i], nums[high] = nums[high], nums[i]\n        if i == target: return nums[i]\n        elif i < target: return select(i + 1, high)\n        else: return select(low, i - 1)\n    return select(0, len(nums) - 1)"
    },
    "summary": {
      "keyTakeaways": [
        "Quick Sort partitions data in place around a chosen pivot.",
        "Randomized pivot selection eliminates worst-case O(n²) vulnerabilities."
      ],
      "nextLessonId": "dsa-sort-heap",
      "nextLessonTitle": "Heap Sort",
      "nextLessonModuleId": "dsa-module-7"
    },
    "lineByLine": [
      {
        "line": 11,
        "lines": "11",
        "code": "arr[rand_idx], arr[high] = arr[high], arr[rand_idx]",
        "codeSnippet": "arr[rand_idx], arr[high] = arr[high], arr[rand_idx]",
        "explanation": "Randomized pivot prevents adversarial worst-case O(n²) behavior on sorted inputs."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "arr[i + 1], arr[high] = arr[high], arr[i + 1]",
        "codeSnippet": "arr[i + 1], arr[high] = arr[high], arr[i + 1]",
        "explanation": "Swaps pivot into its exact final sorted boundary position."
      }
    ]
  },
  "dsa-sort-heap": {
    "id": "dsa-sort-heap",
    "moduleId": "dsa-module-7",
    "title": "Heap Sort",
    "subtitle": "Binary Heap Invariant, Bottom-Up Heapify, and Guaranteed O(n log n) In-Place Sorting",
    "order": 4,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "sorting",
    "objectives": [
      "Construct a Max Heap in-place in linear O(n) time using sift-down heapify.",
      "Execute sorting phase by swapping max root with array end and sifting down in O(log n).",
      "Prove why Heap Sort guarantees O(n log n) worst-case time with O(1) space.",
      "Compare Heap Sort cache locality against Quick Sort."
    ],
    "prerequisites": [
      "Quick Sort",
      "Time Complexity and Big-O"
    ],
    "analogy": {
      "title": "The King of the Hill Tournament",
      "text": "A group of contenders build a pyramid where the strongest person stands at the top. The top winner is awarded 1st place and steps down to the back of the room. The pyramid is quickly reorganized so the next strongest rises to the top, repeating until everyone is ranked.",
      "metaphor": "Max element is repeatedly swapped to the end and excluded from heap."
    },
    "problemSolved": {
      "title": "Guaranteed O(n log n) Runtime with Zero Extra Memory",
      "description": "Merge Sort requires O(n) memory, and Quick Sort can degrade to O(n²). Heap Sort combines the best theoretical traits of both: guaranteed O(n log n) worst-case time AND strictly O(1) auxiliary space.",
      "keyPoints": [
        "Worst-case runtime is strictly O(n log n).",
        "Requires zero auxiliary array allocations (O(1) memory).",
        "Acts as safety fallback in Introsort when Quick Sort recursion exceeds 2*log(n)."
      ]
    },
    "intuition": {
      "overview": "Phase 1: Build Max Heap bottom-up in O(n). Phase 2: For i from n-1 down to 1, swap arr[0] (max) with arr[i], and sift down arr[0] over remaining size i.",
      "steps": [
        {
          "step": 1,
          "title": "Build Max Heap",
          "description": "Run sift-down from parent of last node (n//2 - 1) down to 0 in O(n) time."
        },
        {
          "step": 2,
          "title": "Extract Maxima",
          "description": "Swap root arr[0] with last unsorted element arr[i]."
        },
        {
          "step": 3,
          "title": "Restore Heap Invariant",
          "description": "Sift down new root within reduced heap boundary [0..i-1] in O(log n) time."
        }
      ]
    },
    "formalDefinition": {
      "text": "Heap Sort transforms array A into a Max Heap where A[i] \\ge A[2i+1] and A[i] \\ge A[2i+2]. Heap construction takes \\sum_{h=0}^{\\lfloor \\log n \\rfloor} \\lceil n / 2^{h+1} \\rceil O(h) = O(n) time.",
      "latex": "T(n) = O(n) \\; (\\text{Build Heap}) + \\sum_{i=1}^{n-1} O(\\log i) = O(n \\log n)"
    },
    "complexity": {
      "overview": "Guaranteed O(n log n) in all cases (best, average, worst) with O(1) space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Extracting n elements each requires log n down-heap adjustments."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Deterministic O(n log n)."
        },
        {
          "case": "Worst",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Zero input can force quadratic degradation."
        }
      ],
      "spaceNote": "Completely in-place with O(1) auxiliary space."
    },
    "workedExample": {
      "title": "Heap Sort on [4, 10, 3, 5, 1]",
      "input": "arr = [4, 10, 3, 5, 1]",
      "steps": [
        {
          "step": 1,
          "action": "Build Max Heap",
          "state": "[10, 5, 3, 4, 1]",
          "explanation": "Root 10 is the maximum."
        },
        {
          "step": 2,
          "action": "Swap arr[0] with arr[4]",
          "state": "[1, 5, 3, 4, | 10]",
          "explanation": "10 locked in sorted position."
        },
        {
          "step": 3,
          "action": "Heapify root",
          "state": "[5, 4, 3, 1, | 10]",
          "explanation": "Max heap restored for size 4."
        },
        {
          "step": 4,
          "action": "Swap arr[0] with arr[3]",
          "state": "[1, 4, 3, | 5, 10]",
          "explanation": "5 locked in sorted position."
        },
        {
          "step": 5,
          "action": "Heapify root",
          "state": "[4, 1, 3, | 5, 10]",
          "explanation": "Max heap restored for size 3."
        }
      ],
      "finalOutput": "[1, 3, 4, 5, 10]"
    },
    "visualExplanation": {
      "title": "Heap Shrinkage into Sorted Suffix",
      "description": "Array splits into active heap on the left and sorted array on the right.",
      "features": [
        "Root is extracted to right boundary",
        "Heap size decreases by 1 after each extraction"
      ]
    },
    "pseudocode": {
      "title": "Heap Sort Algorithm",
      "code": "function heapSort(arr):\n    n = length(arr)\n    # Phase 1: Build max heap\n    for i from n // 2 - 1 down to 0:\n        heapify(arr, n, i)\n    # Phase 2: Extract elements\n    for i from n - 1 down to 1:\n        swap(arr[0], arr[i])\n        heapify(arr, i, 0)"
    },
    "pythonCode": {
      "title": "Python Heap Sort Implementation",
      "code": "def heap_sort(arr: list[int]) -> list[int]:\n    n = len(arr)\n\n    def heapify(n: int, i: int):\n        largest = i\n        left = 2 * i + 1\n        right = 2 * i + 2\n\n        if left < n and arr[left] > arr[largest]:\n            largest = left\n        if right < n and arr[right] > arr[largest]:\n            largest = right\n\n        if largest != i:\n            arr[i], arr[largest] = arr[largest], arr[i]\n            heapify(n, largest)\n\n    # 1. Build Max Heap\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(n, i)\n\n    # 2. Extract max element one by one\n    for i in range(n - 1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]\n        heapify(i, 0)\n\n    return arr",
      "explanation": "Uses iterative sift-down to order elements in strictly in-place O(1) space."
    },
    "runnableCode": {
      "code": "arr = [4, 10, 3, 5, 1]\nprint(heap_sort(arr))",
      "expectedOutput": "[1, 3, 4, 5, 10]"
    },
    "lineByLineExplanation": [
      {
        "line": 17,
        "lines": "17",
        "code": "for i in range(n // 2 - 1, -1, -1):",
        "codeSnippet": "for i in range(n // 2 - 1, -1, -1):",
        "explanation": "Starts at deepest internal non-leaf node; builds max heap in O(n) total operations."
      },
      {
        "line": 22,
        "lines": "22",
        "code": "arr[0], arr[i] = arr[i], arr[0]",
        "codeSnippet": "arr[0], arr[i] = arr[i], arr[0]",
        "explanation": "Swaps current maximum element to its permanent final index i."
      }
    ],
    "edgeCases": [
      {
        "case": "All identical elements",
        "handling": "Runs in O(n log n) without infinite loops or errors.",
        "example": "[5, 5, 5, 5]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Passing total array length n instead of current heap size i into heapify during extraction",
        "solution": "Heapify must only operate on the unsorted prefix [0..i-1].",
        "codeExample": "heapify(i, 0) # pass reduced size i"
      }
    ],
    "applications": [
      {
        "industry": "Embedded Systems",
        "application": "Mission-critical aerospace guidance systems",
        "benefit": "Deterministic worst-case O(n log n) without risk of stack overflow or memory allocation failure."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-hs-1",
        "question": "Why does Heap Sort suffer from poorer real-world cache performance compared to Quick Sort?",
        "hint": "Look at parent-to-child memory strides: 2*i + 1.",
        "answer": "Parent and child nodes are separated by powers of 2 in memory, causing frequent CPU cache line misses during tree traversals."
      }
    ],
    "quiz": [
      {
        "id": "q-hs-1",
        "question": "What is the time complexity to build a binary heap of n elements?",
        "options": [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(log n)"
        ],
        "correctIndex": 0,
        "explanation": "Bottom-up heap construction runs in mathematically proven O(n) linear time."
      }
    ],
    "codingChallenge": {
      "title": "Check if Array is a Max Heap",
      "problem": "Given an array of integers, return True if it satisfies the Max Heap property, False otherwise.",
      "hints": [
        "Check that arr[i] >= arr[2*i+1] and arr[i] >= arr[2*i+2] for all valid child indices."
      ],
      "starterCode": "def is_max_heap(arr: list[int]) -> bool:\n    # TODO: Validate max heap property\n    pass",
      "solution": "def is_max_heap(arr: list[int]) -> bool:\n    n = len(arr)\n    for i in range(n // 2):\n        left = 2 * i + 1\n        right = 2 * i + 2\n        if left < n and arr[i] < arr[left]:\n            return False\n        if right < n and arr[i] < arr[right]:\n            return False\n    return True"
    },
    "summary": {
      "keyTakeaways": [
        "Heap Sort provides guaranteed O(n log n) time in O(1) memory.",
        "Build heap takes O(n); extraction takes O(n log n)."
      ],
      "nextLessonId": "dsa-sort-counting-radix",
      "nextLessonTitle": "Counting Sort and Radix Sort",
      "nextLessonModuleId": "dsa-module-7"
    },
    "lineByLine": [
      {
        "line": 17,
        "lines": "17",
        "code": "for i in range(n // 2 - 1, -1, -1):",
        "codeSnippet": "for i in range(n // 2 - 1, -1, -1):",
        "explanation": "Starts at deepest internal non-leaf node; builds max heap in O(n) total operations."
      },
      {
        "line": 22,
        "lines": "22",
        "code": "arr[0], arr[i] = arr[i], arr[0]",
        "codeSnippet": "arr[0], arr[i] = arr[i], arr[0]",
        "explanation": "Swaps current maximum element to its permanent final index i."
      }
    ]
  },
  "dsa-sort-counting-radix": {
    "id": "dsa-sort-counting-radix",
    "moduleId": "dsa-module-7",
    "title": "Counting Sort and Radix Sort",
    "subtitle": "Non-Comparison Sorting Breaking the O(n log n) Information-Theoretic Lower Bound",
    "order": 5,
    "readTimeMinutes": 24,
    "difficulty": "Intermediate",
    "visualizerType": "sorting",
    "objectives": [
      "Break through the O(n log n) comparison barrier using direct array indexing.",
      "Implement stable Counting Sort using prefix cumulative frequency tables.",
      "Implement Radix Sort using digit-by-digit Least Significant Digit (LSD) passes.",
      "Determine parameter ranges (k <= n) where non-comparison sorts outperform comparison sorts."
    ],
    "prerequisites": [
      "Time Complexity and Big-O",
      "Arrays and Dynamic Arrays"
    ],
    "analogy": {
      "title": "Sorting Mail by Postal Zip Code",
      "text": "A postal sorting facility has 10 bins numbered 0 through 9. Instead of comparing letters against each other, the mail clerk looks at the last digit of the zip code and drops each letter into its matching numbered bin. Repeating this process for each digit from right to left leaves the entire room of mail sorted.",
      "metaphor": "Bucket elements by digit keys rather than comparing pairwise."
    },
    "problemSolved": {
      "title": "Linear O(n + k) Sorting for Bounded Integer Keys",
      "description": "Any comparison-based sort has a proven mathematical lower bound of \\Omega(n \\log n). Counting Sort and Radix Sort bypass this lower bound by using integer keys as direct memory addresses.",
      "keyPoints": [
        "Executes in O(n + k) linear time.",
        "Stable sorting preserves initial order of duplicate keys.",
        "Optimal for integers, fixed-width strings, and byte payloads."
      ]
    },
    "intuition": {
      "overview": "Count frequencies of each key in range [0..k]. Compute prefix sums to determine the exact starting index for each value. Place elements into output array starting from back to ensure stability.",
      "steps": [
        {
          "step": 1,
          "title": "Count Frequencies",
          "description": "count[num]++ for each num in array."
        },
        {
          "step": 2,
          "title": "Prefix Sums",
          "description": "Transform count into running sum: count[i] += count[i-1]."
        },
        {
          "step": 3,
          "title": "Stable Placement",
          "description": "Iterate input array backwards: place arr[i] into out[count[arr[i]] - 1], decrement count."
        }
      ]
    },
    "formalDefinition": {
      "text": "Comparison sorting forms a decision tree with n! leaves requiring depth \\ge \\log_2(n!) = \\Omega(n \\log n). Non-comparison sorting accesses array indices in O(1), achieving O(d(n + b)) where d is the number of digits and b is the base.",
      "latex": "T_{\\text{radix}}(n) = O(d \\cdot (n + b)) \\implies O(n) \\text{ when } d = O(1) \\text{ and } b = O(n)"
    },
    "complexity": {
      "overview": "Counting sort: O(n + k) time, O(k) space. Radix sort: O(d(n + b)) time.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n + k)",
          "space": "O(n + k)",
          "explanation": "Linear single pass over data."
        },
        {
          "case": "Average",
          "time": "O(n + k)",
          "space": "O(n + k)",
          "explanation": "Linear execution."
        },
        {
          "case": "Worst",
          "time": "O(n + k)",
          "space": "O(n + k)",
          "explanation": "Inefficient if k >> n (e.g. k = n²)."
        }
      ],
      "spaceNote": "Requires O(n + k) auxiliary memory for count table and output array."
    },
    "workedExample": {
      "title": "Counting Sort on [4, 2, 2, 8, 3, 3, 1]",
      "input": "arr = [4, 2, 2, 8, 3, 3, 1], max=8",
      "steps": [
        {
          "step": 1,
          "action": "Count Frequencies",
          "state": "count[1]=1, count[2]=2, count[3]=2, count[4]=1, count[8]=1",
          "explanation": "Frequency histogram created."
        },
        {
          "step": 2,
          "action": "Cumulative Prefix Sum",
          "state": "count array running sum marks exact slot indices",
          "explanation": "e.g. count[2]=3 means elements <= 2 occupy indices 0..2."
        },
        {
          "step": 3,
          "action": "Fill Output from Right",
          "state": "Stable backward placement preserves original duplicates",
          "explanation": "Guarantees stability."
        }
      ],
      "finalOutput": "[1, 2, 2, 3, 3, 4, 8]"
    },
    "visualExplanation": {
      "title": "Bucket Distribution and Collection",
      "description": "Visualizing numbers dropping into buckets indexed 0-9 and flattening back out sequentially.",
      "features": [
        "Histogram count towers",
        "Prefix sum boundaries determine output array partitions"
      ]
    },
    "pseudocode": {
      "title": "Counting Sort Algorithm",
      "code": "function countingSort(arr, maxVal):\n    count = array of size maxVal + 1 with 0\n    output = array of size length(arr)\n    for x in arr: count[x] += 1\n    for i from 1 to maxVal: count[i] += count[i - 1]\n    for i from length(arr) - 1 down to 0:\n        val = arr[i]\n        output[count[val] - 1] = val\n        count[val] -= 1\n    return output"
    },
    "pythonCode": {
      "title": "Python Radix Sort Implementation",
      "code": "def radix_sort(arr: list[int]) -> list[int]:\n    if not arr: return arr\n    max_val = max(arr)\n    exp = 1\n\n    def counting_sort_by_digit(exp: int):\n        n = len(arr)\n        output = [0] * n\n        count = [0] * 10\n\n        for num in arr:\n            digit = (num // exp) % 10\n            count[digit] += 1\n\n        for i in range(1, 10):\n            count[i] += count[i - 1]\n\n        for i in range(n - 1, -1, -1):\n            digit = (arr[i] // exp) % 10\n            output[count[digit] - 1] = arr[i]\n            count[digit] -= 1\n\n        for i in range(n):\n            arr[i] = output[i]\n\n    while max_val // exp > 0:\n        counting_sort_by_digit(exp)\n        exp *= 10\n\n    return arr",
      "explanation": "Applies stable counting sort digit-by-digit from least significant to most significant."
    },
    "runnableCode": {
      "code": "arr = [170, 45, 75, 90, 802, 24, 2, 66]\nprint(radix_sort(arr))",
      "expectedOutput": "[2, 24, 45, 66, 75, 90, 170, 802]"
    },
    "lineByLineExplanation": [
      {
        "line": 12,
        "lines": "12",
        "code": "digit = (num // exp) % 10",
        "codeSnippet": "digit = (num // exp) % 10",
        "explanation": "Extracts the current base-10 digit corresponding to current multiplier exp."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "for i in range(n - 1, -1, -1):",
        "codeSnippet": "for i in range(n - 1, -1, -1):",
        "explanation": "Iterates backwards to maintain stability of duplicate digit values."
      }
    ],
    "edgeCases": [
      {
        "case": "Negative numbers",
        "handling": "Shift all numbers by adding abs(min_val) to make them non-negative, sort, then subtract back.",
        "example": "[-5, -1, 3]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Iterating forward (0 to n-1) during output placement",
        "solution": "Forward iteration inverts stability; must iterate backwards (n-1 down to 0).",
        "codeExample": "for i in range(n - 1, -1, -1): # backward iteration"
      }
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "application": "Sorting 32-bit floating point numbers or IPv4 addresses",
        "benefit": "Fixed 4-byte width allows sorting billions of records in strictly linear time."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-cs-1",
        "question": "Why is Counting Sort unsuitable for sorting an array of size 10 where max value is 1,000,000,000?",
        "hint": "Consider the size of the count array.",
        "answer": "Allocating a count array of size 10^9 requires gigabytes of memory and 10^9 initialization operations, vastly worse than O(n log n)."
      }
    ],
    "quiz": [
      {
        "id": "q-cs-1",
        "question": "What is the decision-tree lower bound for comparison-based sorting of n elements?",
        "options": [
          "Ω(n log n)",
          "Ω(n)",
          "Ω(n²)",
          "Ω(log n)"
        ],
        "correctIndex": 0,
        "explanation": "A decision tree with n! leaves must have height at least log2(n!) = Ω(n log n)."
      }
    ],
    "codingChallenge": {
      "title": "Sort Colors (Dutch National Flag)",
      "problem": "Given an array nums with n objects colored red (0), white (1), or blue (2), sort them in-place in a single pass without using library sort.",
      "hints": [
        "Use three pointers: low, mid, and high."
      ],
      "starterCode": "def sort_colors(nums: list[int]) -> None:\n    # TODO: Sort in-place in O(n)\n    pass",
      "solution": "def sort_colors(nums: list[int]) -> None:\n    low = 0\n    mid = 0\n    high = len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1"
    },
    "summary": {
      "keyTakeaways": [
        "Counting Sort achieves linear O(n + k) time for small integer ranges.",
        "Radix Sort chains stable counting sorts across successive digit positions."
      ],
      "nextLessonId": "dsa-sort-stability",
      "nextLessonTitle": "Sorting Stability and In-Place Sorting",
      "nextLessonModuleId": "dsa-module-7"
    },
    "lineByLine": [
      {
        "line": 12,
        "lines": "12",
        "code": "digit = (num // exp) % 10",
        "codeSnippet": "digit = (num // exp) % 10",
        "explanation": "Extracts the current base-10 digit corresponding to current multiplier exp."
      },
      {
        "line": 18,
        "lines": "18",
        "code": "for i in range(n - 1, -1, -1):",
        "codeSnippet": "for i in range(n - 1, -1, -1):",
        "explanation": "Iterates backwards to maintain stability of duplicate digit values."
      }
    ]
  },
  "dsa-sort-stability": {
    "id": "dsa-sort-stability",
    "moduleId": "dsa-module-7",
    "title": "Sorting Stability and In-Place Sorting",
    "subtitle": "Preserving Key Invariants, Multi-Key Sorting, and Memory Classifications",
    "order": 6,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Define sorting stability mathematically.",
      "Understand why stability is critical when sorting records by multiple criteria.",
      "Classify classic sorting algorithms by stability and in-place memory traits.",
      "Transform any unstable sorting algorithm into a stable one using composite keys."
    ],
    "prerequisites": [
      "Merge Sort",
      "Quick Sort",
      "Heap Sort"
    ],
    "analogy": {
      "title": "Spreadsheet Column Sorting",
      "text": "In Excel, you have a table of employees sorted by name. You then click \"Sort by Department\". If the sort is stable, employees within the same department remain in alphabetical order by name. If the sort is unstable, their name ordering is scrambled.",
      "metaphor": "Stable sorting preserves previously established secondary orderings."
    },
    "problemSolved": {
      "title": "Multi-Key Hierarchical Sorting Without Corrupting Prior Sort Passes",
      "description": "Databases and UI tables frequently require sorting by multiple keys (e.g. sort by Country, then by State, then by City). With a stable sort, you simply sort by the least significant key first and work upwards.",
      "keyPoints": [
        "Enables multi-pass radix-style record sorting.",
        "Stable algorithms: Merge Sort, Insertion Sort, Bubble Sort, Counting Sort.",
        "Unstable algorithms: Quick Sort, Heap Sort, Selection Sort."
      ]
    },
    "intuition": {
      "overview": "A sort is stable if elements with identical keys appear in the output array in the exact same relative order as they were in the input array.",
      "steps": [
        {
          "step": 1,
          "title": "Identity Check",
          "description": "If key(arr[i]) == key(arr[j]) and i < j, output must place arr[i] before arr[j]."
        },
        {
          "step": 2,
          "title": "In-Place Check",
          "description": "An in-place algorithm requires O(1) or O(log n) auxiliary space beyond input buffer."
        }
      ]
    },
    "formalDefinition": {
      "text": "A sorting algorithm is stable if for every pair of indices (i, j) such that 0 \\le i < j < n and key(A[i]) = key(A[j]), the final position \\pi(i) < \\pi(j).",
      "latex": "i < j \\land A[i] = A[j] \\implies \\pi(i) < \\pi(j)"
    },
    "complexity": {
      "overview": "Stability is a structural property, not a time complexity class.",
      "cases": [
        {
          "case": "Best",
          "time": "N/A",
          "space": "N/A",
          "explanation": "Classifies algorithmic invariants."
        },
        {
          "case": "Average",
          "time": "N/A",
          "space": "N/A",
          "explanation": "Classifies algorithmic invariants."
        },
        {
          "case": "Worst",
          "time": "N/A",
          "space": "N/A",
          "explanation": "Classifies algorithmic invariants."
        }
      ],
      "spaceNote": "In-place implies auxiliary space is O(1) or O(log n)."
    },
    "workedExample": {
      "title": "Multi-Key Student Sorting",
      "input": "Students: [(\"Alice\", Grade 8), (\"Bob\", Grade 9), (\"Charlie\", Grade 8)]",
      "steps": [
        {
          "step": 1,
          "action": "Initial state sorted by name",
          "state": "Alice, Bob, Charlie",
          "explanation": "Alphabetical."
        },
        {
          "step": 2,
          "action": "Stable Sort by Grade",
          "state": "(\"Alice\", 8), (\"Charlie\", 8), (\"Bob\", 9)",
          "explanation": "Alice remains ahead of Charlie because she was ahead initially!"
        },
        {
          "step": 3,
          "action": "Unstable Sort consequence",
          "state": "Might produce Charlie before Alice, losing alphabetical order.",
          "explanation": "Unstable sort corrupts prior pass."
        }
      ],
      "finalOutput": "Stable Sort preserves Alice before Charlie in Grade 8."
    },
    "visualExplanation": {
      "title": "Relative Order Preservation",
      "description": "Tracking paired elements with colored tags showing identical tags maintain order.",
      "features": [
        "Tag 2_red and 2_blue stay in 2_red -> 2_blue sequence"
      ]
    },
    "pseudocode": {
      "title": "Stabilizing Unstable Sort using Index Augmentation",
      "code": "function stableWrapper(arr, unstableSort):\n    augmented = [(arr[i], i) for i in 0..len(arr)-1]\n    # Sort comparing primarily by value, secondarily by original index\n    unstableSort(augmented, key=lambda x: (x[0], x[1]))\n    return [item[0] for item in augmented]"
    },
    "pythonCode": {
      "title": "Python Stable Multi-Key Sorting",
      "code": "def multi_key_sort(records: list[tuple[str, int]]) -> list[tuple[str, int]]:\n    # Python's list.sort() (Timsort) is strictly stable\n    # Sort first by name (secondary key)\n    records.sort(key=lambda x: x[0])\n    # Sort second by grade (primary key)\n    records.sort(key=lambda x: x[1])\n    return records",
      "explanation": "Leverages Timsort stability to perform clean two-pass multi-attribute sorting."
    },
    "runnableCode": {
      "code": "data = [(\"Charlie\", 8), (\"Alice\", 9), (\"Bob\", 8)]\nprint(multi_key_sort(data))",
      "expectedOutput": "[('Bob', 8), ('Charlie', 8), ('Alice', 9)]"
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "records.sort(key=lambda x: x[0])",
        "codeSnippet": "records.sort(key=lambda x: x[0])",
        "explanation": "Orders records by secondary attribute (name)."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "records.sort(key=lambda x: x[1])",
        "codeSnippet": "records.sort(key=lambda x: x[1])",
        "explanation": "Orders records by primary attribute (grade); stability guarantees name order is preserved within each grade."
      }
    ],
    "edgeCases": [
      {
        "case": "All keys identical",
        "handling": "Stable sort leaves order completely unchanged.",
        "example": "[(\"A\", 1), (\"B\", 1)]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming Quick Sort is stable",
        "solution": "Standard partition swaps elements across long distances, inverting relative order; do not use for multi-pass sorting without index augmentation.",
        "codeExample": "# Quick Sort is unstable!"
      }
    ],
    "applications": [
      {
        "industry": "Data Warehousing",
        "application": "SQL ORDER BY col1, col2 execution engines",
        "benefit": "Allows cascading sorts across columns."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-st-1",
        "question": "Can an unstable sort be made stable with zero extra memory?",
        "hint": "Think about encoding original indices.",
        "answer": "Generally no; making an unstable sort stable requires tracking original indices, which adds O(n) auxiliary space."
      }
    ],
    "quiz": [
      {
        "id": "q-st-1",
        "question": "Which of the following sorting algorithms is STABLE?",
        "options": [
          "Merge Sort",
          "Quick Sort",
          "Heap Sort",
          "Selection Sort"
        ],
        "correctIndex": 0,
        "explanation": "Merge Sort preserves original relative order when merging elements with <=."
      }
    ],
    "codingChallenge": {
      "title": "Group Anagrams with Stable Ordering",
      "problem": "Given an array of strings strs, group the anagrams together in the order they first appear.",
      "hints": [
        "Use collections.defaultdict(list) mapping tuple of character counts to word list."
      ],
      "starterCode": "from collections import defaultdict\n\ndef group_anagrams(strs: list[str]) -> list[list[str]]:\n    # TODO: Group anagrams\n    pass",
      "solution": "from collections import defaultdict\n\ndef group_anagrams(strs: list[str]) -> list[list[str]]:\n    groups = defaultdict(list)\n    for s in strs:\n        key = tuple(sorted(s))\n        groups[key].append(s)\n    return list(groups.values())"
    },
    "summary": {
      "keyTakeaways": [
        "Stable sorts preserve the initial relative ordering of equivalent keys.",
        "Timsort and Merge Sort are stable; Quick Sort and Heap Sort are not."
      ],
      "nextLessonId": "dsa-sort-tradeoffs",
      "nextLessonTitle": "Sorting Algorithm Trade-offs and Choosing the Right Sort",
      "nextLessonModuleId": "dsa-module-7"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "records.sort(key=lambda x: x[0])",
        "codeSnippet": "records.sort(key=lambda x: x[0])",
        "explanation": "Orders records by secondary attribute (name)."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "records.sort(key=lambda x: x[1])",
        "codeSnippet": "records.sort(key=lambda x: x[1])",
        "explanation": "Orders records by primary attribute (grade); stability guarantees name order is preserved within each grade."
      }
    ]
  },
  "dsa-sort-tradeoffs": {
    "id": "dsa-sort-tradeoffs",
    "moduleId": "dsa-module-7",
    "title": "Sorting Algorithm Trade-offs and Choosing the Right Sort",
    "subtitle": "Engineering Trade-offs, Timsort Architecture, and Practical Decision Matrix",
    "order": 7,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Synthesize trade-offs across all 7 major sorting algorithms.",
      "Understand Timsort: combining Insertion Sort runs with Merge Sort stack balancing.",
      "Select the optimal algorithm based on data size, memory limits, and key distribution.",
      "Understand Introsort (Quick Sort + Heap Sort + Insertion Sort hybrid)."
    ],
    "prerequisites": [
      "Merge Sort",
      "Quick Sort",
      "Heap Sort",
      "Sorting Stability and In-Place Sorting"
    ],
    "analogy": {
      "title": "Choosing the Right Vehicle",
      "text": "A bicycle (Insertion Sort) is best for a 50-meter trip down the driveway. A sports car (Quick Sort) is fastest on an open highway. A tank (Heap Sort) guarantees survival in hostile terrain. A bullet train (Timsort) is engineered for commercial high-speed real-world passenger travel.",
      "metaphor": "No single sort is universally best; production runtimes use adaptive hybrid algorithms."
    },
    "problemSolved": {
      "title": "Selecting Optimal Sorting Strategies in Production Systems",
      "description": "Real-world data is rarely purely random; it often contains pre-sorted runs, duplicates, or fits into memory caches. Engineering hybrid sorts guarantees optimal performance in every practical scenario.",
      "keyPoints": [
        "Timsort: Python & Java standard sorting engine.",
        "Introsort: C++ std::sort engine.",
        "Decision matrix based on stability, memory, and input characteristics."
      ]
    },
    "intuition": {
      "overview": "If n is small (n <= 32), use Insertion Sort. If stability and guaranteed O(n log n) are required, use Merge/Timsort. If memory is strictly O(1) and stability is not required, use Quick Sort or Introsort.",
      "steps": [
        {
          "step": 1,
          "title": "Analyze Constraints",
          "description": "Are elements integers in small range? (Use Counting/Radix Sort)."
        },
        {
          "step": 2,
          "title": "Check Memory & Stability",
          "description": "Is O(n) extra space allowed? Is stability required?"
        },
        {
          "step": 3,
          "title": "Select Hybrid Strategy",
          "description": "Use Timsort for general stability or Introsort for raw in-place speed."
        }
      ]
    },
    "formalDefinition": {
      "text": "Timsort decomposes array into natural monotone runs of length \\ge \\text{minrun} \\in [32, 64]. Short runs are extended using Insertion Sort, then merged using a stack-based balanced Merge Sort.",
      "latex": "\\text{Runtime}(Timsort) \\in [O(n), O(n \\log n)], \\quad \\text{Space} = O(n)"
    },
    "complexity": {
      "overview": "Comparison of all major algorithms in practical production contexts.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Insertion Sort / Timsort on already sorted data."
        },
        {
          "case": "Average",
          "time": "O(n log n)",
          "space": "O(log n) to O(n)",
          "explanation": "Quick Sort, Merge Sort, Heap Sort."
        },
        {
          "case": "Worst",
          "time": "O(n log n)",
          "space": "O(1)",
          "explanation": "Heap Sort guarantees O(n log n) in O(1) memory."
        }
      ],
      "spaceNote": "Timsort uses O(n) space; Introsort uses O(log n) space."
    },
    "workedExample": {
      "title": "Decision Flowchart for Choosing a Sort",
      "input": "Scenario: 10 million float coordinates, strictly bounded RAM, no stability needed",
      "steps": [
        {
          "step": 1,
          "action": "Check key type",
          "state": "Float coordinates -> cannot use counting sort directly",
          "explanation": "Comparison sort needed."
        },
        {
          "step": 2,
          "action": "Check memory constraint",
          "state": "Strict RAM -> Merge Sort eliminated (requires 10M floats extra RAM)",
          "explanation": "Must be in-place."
        },
        {
          "step": 3,
          "action": "Check worst-case guarantee",
          "state": "Mission-critical -> Quick Sort risk of O(n²)",
          "explanation": "Introsort / Heap Sort selected."
        }
      ],
      "finalOutput": "Recommended Algorithm: Introsort (Quick Sort with Heap Sort fallback)"
    },
    "visualExplanation": {
      "title": "Sorting Decision Matrix",
      "description": "Matrix comparing Quick Sort, Merge Sort, Heap Sort, Insertion Sort, and Radix Sort across Time, Space, and Stability.",
      "features": [
        "Highlighting Timsort for adaptive real-world datasets",
        "Highlighting Quick Sort for raw CPU cache throughput"
      ]
    },
    "pseudocode": {
      "title": "Introsort Architecture",
      "code": "function introsort(arr, maxDepth):\n    n = length(arr)\n    if n <= 16:\n        insertionSort(arr)\n    elif maxDepth == 0:\n        heapSort(arr) # fallback to avoid O(n^2)\n    else:\n        p = partition(arr)\n        introsort(arr[0..p-1], maxDepth - 1)\n        introsort(arr[p+1..n-1], maxDepth - 1)"
    },
    "pythonCode": {
      "title": "Custom Adaptive Sorter",
      "code": "def adaptive_sort(arr: list[int]) -> list[int]:\n    # Small partition threshold\n    if len(arr) <= 16:\n        for i in range(1, len(arr)):\n            key = arr[i]\n            j = i - 1\n            while j >= 0 and arr[j] > key:\n                arr[j + 1] = arr[j]\n                j -= 1\n            arr[j + 1] = key\n        return arr\n    # Otherwise use standard production engine (Timsort)\n    return sorted(arr)",
      "explanation": "Demonstrates hybrid switching: insertion sort on tiny slices, high-level sort on large arrays."
    },
    "runnableCode": {
      "code": "print(adaptive_sort([9, 3, 1, 4, 2]))",
      "expectedOutput": "[1, 2, 3, 4, 9]"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "if len(arr) <= 16:",
        "codeSnippet": "if len(arr) <= 16:",
        "explanation": "Switches to Insertion Sort for tiny inputs to eliminate recursion overhead."
      }
    ],
    "edgeCases": [
      {
        "case": "Reverse sorted arrays",
        "handling": "Timsort detects reverse runs and reverses them in O(n) time.",
        "example": "[10, 9, 8, 7, 6]"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Writing custom quicksort in Python instead of using sorted()",
        "solution": "Python sorted() is written in highly optimized C (Timsort) and runs 50x faster than pure Python quicksort.",
        "codeExample": "arr.sort() # Always prefer built-in"
      }
    ],
    "applications": [
      {
        "industry": "Programming Language Runtimes",
        "application": "Python sorted(), Java Arrays.sort(), Rust slice::sort",
        "benefit": "Engineered hybrid algorithms provide maximum performance across all data distributions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-to-1",
        "question": "What sorting algorithm does C++ std::sort use under the hood?",
        "hint": "Introsort.",
        "answer": "Introsort: starts with Quick Sort, switches to Heap Sort if recursion depth exceeds 2*log(n), and uses Insertion Sort for partitions <= 16."
      }
    ],
    "quiz": [
      {
        "id": "q-to-1",
        "question": "What sorting algorithm is used by Python's built-in sorted() and list.sort()?",
        "options": [
          "Timsort",
          "Quick Sort",
          "Heap Sort",
          "Bubble Sort"
        ],
        "correctIndex": 0,
        "explanation": "Python uses Timsort, an adaptive hybrid of Merge Sort and Insertion Sort developed by Tim Peters."
      }
    ],
    "codingChallenge": {
      "title": "Sort an Array (Production-Grade Strategy)",
      "problem": "Sort an array of n integers in O(n log n) time and smallest possible space.",
      "hints": [
        "Implement randomized quicksort or heap sort."
      ],
      "starterCode": "def sort_array(nums: list[int]) -> list[int]:\n    # TODO: Implement O(n log n) sort\n    pass",
      "solution": "def sort_array(nums: list[int]) -> list[int]:\n    nums.sort()\n    return nums"
    },
    "summary": {
      "keyTakeaways": [
        "Real-world systems use hybrid sorts (Timsort, Introsort).",
        "Match algorithm to stability, memory constraints, and data distribution."
      ],
      "nextLessonId": "dsa-tree-terminology",
      "nextLessonTitle": "Tree Terminology and Representation",
      "nextLessonModuleId": "dsa-module-8"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "if len(arr) <= 16:",
        "codeSnippet": "if len(arr) <= 16:",
        "explanation": "Switches to Insertion Sort for tiny inputs to eliminate recursion overhead."
      }
    ]
  }
};
