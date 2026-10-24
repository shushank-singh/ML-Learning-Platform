import { RevisionTopic } from './types';

export const DSA_REVISION_TOPICS: RevisionTopic[] = [
  {
    id: 'dsa-big-o',
    subject: 'dsa',
    category: 'Big-O Complexity',
    title: 'Big-O Complexity & Asymptotic Growth Rates',
    subtitle: 'Worst-Case Bounds, Asymptotic Dominance, and Space Allocations',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Big-O', 'Complexity', 'Asymptotics', 'Space Complexity', 'Cheat Sheet'],
    quickRecall: {
      oneLiner:
        'Big-O notation describes the upper bound of an algorithm\'s runtime or space requirements as input size N tends toward infinity: f(N) ≤ c * g(N).',
      whenToUse:
        'Evaluating algorithmic scalability before writing code to verify if a solution can execute within typical 1.0 second CPU limits (~10⁸ operations).',
      whyItMatters:
        'An O(N²) algorithm processing 1,000,000 items takes ~11 days; an O(N log N) algorithm finishes in 0.02 seconds.',
      keyPoints: [
        'Growth ranking: O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2^N) < O(N!).',
        'Drop lower-order terms: O(N² + 5N + 100) simplifies strictly to O(N²).',
        'Drop constant multipliers: O(3N) simplifies to O(N).',
        'Auxiliary Space: Extra memory allocated by the algorithm, excluding the original input memory.',
      ],
      formulaOrSyntax: {
        label: 'Mathematical Definition',
        codeOrLatex: 'f(N) = O(g(N)) \\iff \\exists c > 0, N_0 \\text{ such that } \\forall N \\ge N_0, |f(N)| \\le c \\cdot g(N)',
        isLatex: true,
      },
      complexity: {
        time: 'O(1) classification lookup',
        space: 'O(1)',
      },
      commonMistakeOrTrap: {
        mistake: 'Assuming recursive algorithms take O(1) space if they don\'t declare new arrays.',
        fix: 'Every recursive call consumes a call stack frame; a recursion depth of N consumes O(N) auxiliary space!',
        interviewTrap:
          'Question: "What is the complexity of traversing a 2D matrix of size M x N?" Answer: O(M * N), NOT O(N²)! Never assume dimensions are equal unless specified.',
      },
      examCheatsheet: [
        'N ≤ 10 → O(N!) or O(2^N)',
        'N ≤ 1,000 → O(N²)',
        'N ≤ 100,000 → O(N log N)',
        'N ≤ 10,000,000 → O(N) or O(log N)',
      ],
    },
    visual: {
      type: 'boundary-plot',
      title: 'The Asymptotic Curve Spectrum: O(1) to O(N!)',
      caption:
        'Comparison of operation counts as N grows. While O(log N) stays nearly flat, O(2^N) explodes vertically.',
      visualKey: 'dsa-big-o-curves-viz',
      details: {
        comparison: {
          headers: ['Big-O', 'Name', 'N = 10', 'N = 100', 'N = 1,000'],
          rows: [
            ['O(1)', 'Constant', '1', '1', '1'],
            ['O(log N)', 'Logarithmic', '3.3 ops', '6.6 ops', '10 ops'],
            ['O(N)', 'Linear', '10 ops', '100 ops', '1,000 ops (Instant)'],
            ['O(N log N)', 'Linearithmic', '33 ops', '660 ops', '10,000 ops'],
            ['O(N²)', 'Quadratic', '100 ops', '10,000 ops', '1,000,000 ops (Slow)'],
            ['O(2^N)', 'Exponential', '1,024 ops', '1.26 x 10³⁰ ops', 'Impossible'],
          ],
        },
      },
    },
    animation: {
      type: 'growth-rate-interactive',
      title: 'Operations Counter Growth Simulator',
      description:
        'Slide input size N from 5 to 50 to witness quadratic and exponential operations outpace linear curves.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Input Size N',
        min: 5,
        max: 50,
        step: 5,
        defaultVal: 15,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the tightest Big-O time complexity of `f(N) = 4N³ + 100N² + 5000`?',
        options: ['O(N²)', 'O(N³)', 'O(4N³)', 'O(1)'],
        correctIndex: 1,
        explanation: 'In asymptotic analysis, constant coefficients are dropped and only the highest-order term (N³) is retained.',
      },
      {
        id: 'q2',
        question: 'If an interview problem has input constraint N = 100,000 and 1.0s time limit, what maximum time complexity should you target?',
        options: ['O(N²)', 'O(N log N) or O(N)', 'O(2^N)', 'O(N³)'],
        correctIndex: 1,
        explanation: '100,000² = 10¹⁰ operations which would take ~100 seconds; O(N log N) requires ~1.7 x 10⁶ ops which runs in ~10 milliseconds.',
      },
      {
        id: 'q3',
        question: 'What is the space complexity of a recursive Fibonacci function without memoization that recurses to depth N?',
        options: ['O(1)', 'O(N) due to the call stack frames', 'O(2^N)', 'O(log N)'],
        correctIndex: 1,
        explanation: 'Although the time complexity is O(2^N), the maximum depth of the call stack at any one instant is N, so auxiliary space is O(N).',
      },
    ],
  },
  {
    id: 'dsa-two-pointers',
    subject: 'dsa',
    category: 'Two Pointers',
    title: 'Two Pointers: Inward & Fast-Slow Patterns',
    subtitle: 'Converging Bounds, Cycle Detection, and In-Place Array Mutation',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Two Pointers', 'Opposite Ends', 'Fast-Slow', 'Floyd Cycle', 'In-Place'],
    quickRecall: {
      oneLiner:
        'Uses two indices that traverse a sequence simultaneously either toward each other from opposite ends or at different speeds in the same direction.',
      whenToUse:
        'Sorted array target sums (Two Sum II, 3Sum), palindrome verification, reversing arrays, and linked list cycle detection (Floyd\'s Tortoise and Hare).',
      whyItMatters:
        'Reduces brute-force O(N²) nested loops down to a single O(N) linear pass with O(1) extra memory.',
      keyPoints: [
        'Opposite Ends: Left pointer at 0, Right pointer at N-1. If sum < target, left++; if sum > target, right--.',
        'Fast-Slow (Floyd\'s Cycle): Slow moves 1 step, Fast moves 2 steps. If they meet, a cycle exists.',
        'Read-Write Pointers: Slow writes unique elements in-place while Fast scans forward (e.g. Remove Duplicates).',
        'Prerequisite: Inward converging pointers almost always require the sequence to be sorted first.',
      ],
      formulaOrSyntax: {
        label: 'Inward Two Pointers Pattern',
        codeOrLatex: 'int left = 0, right = nums.length - 1;\nwhile (left < right) {\n    int sum = nums[left] + nums[right];\n    if (sum == target) return new int[]{left, right};\n    else if (sum < target) left++;\n    else right--;\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(N) linear scan (or O(N log N) if sorting is required)',
        space: 'O(1) auxiliary space (in-place pointers)',
      },
      commonMistakeOrTrap: {
        mistake: 'Applying inward two-pointers on an unsorted array without sorting it first.',
        fix: 'Moving `left` only guarantees the sum increases if the elements are monotonically non-decreasing!',
        interviewTrap:
          'Question: "Why is Floyd\'s cycle detection guaranteed to terminate if a cycle exists?" Answer: The gap between Fast and Slow decreases by exactly 1 on every step (`(2v - v) mod C = 1`), closing any distance in at most C steps.',
      },
      examCheatsheet: [
        'Sorted array + pair search = Inward Opposite Pointers',
        'Linked list cycle / midpoint = Fast & Slow (1x and 2x speed)',
        'Remove duplicates in-place = Fast reader, Slow writer',
      ],
    },
    visual: {
      type: 'step-trace',
      title: 'Sorted Array Inward Convergence vs. Target Sum',
      caption:
        'Pointers L and R step inward: if `arr[L] + arr[R] > target`, shift R leftward; if `< target`, shift L rightward.',
      visualKey: 'dsa-two-pointers-viz',
      details: {
        inputOutput: {
          input: 'nums = [2, 7, 11, 15], target = 9',
          output: 'L=0 (2), R=3 (15) -> 17 > 9 -> R-- -> L=0 (2), R=1 (7) -> 9 == 9 -> Found [0, 1]!',
        },
      },
    },
    animation: {
      type: 'two-pointers-converge-interactive',
      title: 'Two Pointers Stepper Animation',
      description:
        'Step through the search on a sorted array to see Left and Right indices converge on target sum 18.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Step',
        min: 1,
        max: 5,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Under what condition can the converging two-pointer technique find a pair summing to target in O(N) time?',
        options: [
          'The array must be sorted',
          'The array must contain negative numbers',
          'The array size must be an even number',
          'All numbers must be unique',
        ],
        correctIndex: 0,
        explanation: 'Sorting ensures monotonicity: advancing left strictly increases the sum and retreating right strictly decreases the sum.',
      },
      {
        id: 'q2',
        question: 'In Floyd’s cycle-finding algorithm, how many steps does the fast pointer move relative to the slow pointer per iteration?',
        options: ['Fast moves 1, Slow moves 2', 'Fast moves 2, Slow moves 1', 'Fast moves 3, Slow moves 2', 'Both move 1'],
        correctIndex: 1,
        explanation: 'Fast moves 2 steps while slow moves 1 step; this 1-step relative difference ensures Fast will eventually catch Slow within the cycle.',
      },
      {
        id: 'q3',
        question: 'What is the space complexity of solving Two Sum on an already sorted array using Two Pointers?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Two pointers only require two integer index variables (`left` and `right`), achieving O(1) constant auxiliary space.',
      },
    ],
  },
  {
    id: 'dsa-sliding-window',
    subject: 'dsa',
    category: 'Sliding Window',
    title: 'Sliding Window: Fixed & Dynamic Ranges',
    subtitle: 'Contiguous Subarray Aggregation and State Transitions',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Sliding Window', 'Subarrays', 'Substrings', 'Two Pointers', 'Optimization'],
    quickRecall: {
      oneLiner:
        'Maintains a contiguous window `[left, right]` across an array/string, expanding `right` to include elements and shrinking `left` to restore validity.',
      whenToUse:
        'Subarray or substring problems asking for maximum/minimum sum, longest substring without repeating characters, or minimum window substring.',
      whyItMatters:
        'Eliminates redundant inner loop recomputations: updates running state in O(1) when sliding, turning O(N²) into O(N).',
      keyPoints: [
        'Fixed Window (size K): Shift right by adding `arr[i]` and subtracting `arr[i-k]` in O(1) time.',
        'Dynamic Window: Expand `right` until condition is violated, then shrink `left` while invalid.',
        'State tracking: Use a running sum, hash map, or character frequency array `int[128]` to monitor valid window state.',
        'Each index is visited at most twice (once by `right`, once by `left`), guaranteeing O(2N) = O(N) total runtime.',
      ],
      formulaOrSyntax: {
        label: 'Dynamic Sliding Window Template',
        codeOrLatex: 'int left = 0, best = 0;\nfor (int right = 0; right < n; right++) {\n    add(nums[right]); // Expand window\n    while (invalid()) { remove(nums[left++]); } // Shrink window\n    best = Math.max(best, right - left + 1);\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(N) linear time (both left and right pointers increment at most N times)',
        space: 'O(K) where K is the alphabet or unique element frequency map size',
      },
      commonMistakeOrTrap: {
        mistake: 'Recomputing the entire window sum from scratch on every step.',
        fix: 'Subtract outgoing `nums[left]` and add incoming `nums[right]` to achieve O(1) slide updates.',
        interviewTrap:
          'Question: "Does dynamic sliding window work if array contains negative numbers for target sum K?" Answer: NO! Negative values break monotonicity (expanding window can decrease sum). Use Prefix Sum + Hash Map instead!',
      },
      examCheatsheet: [
        'Fixed window of size K: Add new element, subtract outgoing element',
        'Dynamic window: Expand right, shrink left when constraint violated',
        'Array must have non-negative numbers for sum monotonicity',
      ],
    },
    visual: {
      type: 'step-trace',
      title: 'Dynamic Window Expansion & Contraction on Character Stream',
      caption:
        'Window `[L, R]` expands to encompass unique characters. When duplicate \'B\' is encountered, L contracts until unique.',
      visualKey: 'dsa-sliding-window-viz',
      details: {
        inputOutput: {
          input: 'String s = "ABCAEC", Find Longest Unique Substring',
          output: 'Window [A, B, C] length=3. On second \'A\', left slides past first \'A\' -> [B, C, A, E] length=4!',
        },
      },
    },
    animation: {
      type: 'sliding-window-runner-interactive',
      title: 'Sliding Window Interactive Frame',
      description:
        'Slide the window forward step-by-step across an array to observe outgoing subtractions and incoming additions.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Window Right Boundary',
        min: 3,
        max: 8,
        step: 1,
        defaultVal: 4,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does the dynamic sliding window algorithm run in O(N) time despite having a nested `while` loop?',
        options: [
          'Because the compiler vectorizes it',
          'Because both `left` and `right` pointers move only forward and can each traverse at most N elements total',
          'Because N is always less than 100',
          'Because it runs on a single thread',
        ],
        correctIndex: 1,
        explanation: 'Each element is processed at most twice (entered by right pointer, exited by left pointer), resulting in amortized O(2N) = O(N) operations.',
      },
      {
        id: 'q2',
        question: 'Why can’t dynamic sliding window be used to find a subarray summing to K if the array contains negative numbers?',
        options: [
          'Because negative numbers cause integer overflow',
          'Because expanding the window no longer guarantees the sum will increase monotonically, breaking the shrink condition',
          'Because Java does not allow negative indices',
          'Because hash maps fail with negative keys',
        ],
        correctIndex: 1,
        explanation: 'Sliding window requires monotonic behavior; negative numbers mean expanding the window might decrease the sum, making it impossible to know when to shrink.',
      },
      {
        id: 'q3',
        question: 'In a fixed-size window of length K, what is the time complexity to update the running sum when moving one position right?',
        options: ['O(K)', 'O(1)', 'O(log K)', 'O(N)'],
        correctIndex: 1,
        explanation: '`sum = sum - arr[i - K] + arr[i]` performs two arithmetic operations, which runs in O(1) constant time.',
      },
    ],
  },
  {
    id: 'dsa-binary-search',
    subject: 'dsa',
    category: 'Binary Search',
    title: 'Binary Search: Boundaries & Invariants',
    subtitle: 'Divide-and-Conquer Search Intervals and Monotonic Predicates',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Binary Search', 'Logarithmic', 'Left Bound', 'Right Bound', 'Invariants'],
    quickRecall: {
      oneLiner:
        'Halves the search space on every comparison by evaluating the midpoint of a monotonic domain: low = mid + 1 or high = mid - 1.',
      whenToUse:
        'Finding an element in a sorted array, finding boundary transitions (First Bad Version), or "Binary Search on Answer" optimization problems.',
      whyItMatters:
        'Can search 4 billion elements in just 32 comparisons (log2(4,000,000,000) ≈ 32)!',
      keyPoints: [
        'Mid calculation: `int mid = low + (high - low) / 2;` prevents 32-bit integer overflow bug.',
        'Standard search: `while (low <= high)`; return `mid` if match found.',
        'Left-bound (Lower bound): If `nums[mid] >= target`, `high = mid - 1` to push left towards first occurrence.',
        'Binary Search on Answer: Applicable to any monotonic predicate `P(x)` that transitions from `[False, False, ..., True, True]`.',
      ],
      formulaOrSyntax: {
        label: 'Safe Midpoint & Lower Bound Template',
        codeOrLatex: 'int low = 0, high = nums.length - 1;\nwhile (low <= high) {\n    int mid = low + (high - low) / 2; // Avoids integer overflow\n    if (nums[mid] >= target) high = mid - 1; // Bisect left\n    else low = mid + 1;\n}\nreturn low; // First index where nums[i] >= target',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(\\log N) comparisons | Worst-case: \\lfloor \\log_2 N \\rfloor + 1',
        space: 'O(1) iterative | O(\\log N) recursive call stack',
      },
      commonMistakeOrTrap: {
        mistake: 'Calculating midpoint as `(low + high) / 2`.',
        fix: 'If `low + high > 2,147,483,647` (Integer.MAX_VALUE), it overflows to a negative integer and causes `ArrayIndexOutOfBoundsException`! Use `low + (high - low) / 2`.',
        interviewTrap:
          'Question: "What is `low` after `while (low <= high)` terminates without finding target?" Answer: `low` points precisely to the insertion index where `target` should be placed to maintain sorted order!',
      },
      examCheatsheet: [
        'Midpoint formula: `low + (high - low) / 2`',
        'Search space halves every step: N → N/2 → N/4 → ... → 1',
        'Works on any function with a monotonic True/False boolean transition',
      ],
    },
    visual: {
      type: 'step-trace',
      title: 'Interval Bisection: Low, Mid, and High Shifting',
      caption:
        'At each step, comparing target with `arr[mid]` eliminates 50% of remaining candidates.',
      visualKey: 'dsa-binary-search-viz',
      details: {
        steps: [
          { label: 'Step 1: Range [0, 8]', desc: 'low=0, high=8, mid=4 (val=14). Target 23 > 14 → low = 5' },
          { label: 'Step 2: Range [5, 8]', desc: 'low=5, high=8, mid=6 (val=23). Target 23 == 23 → Match found!' },
        ],
      },
    },
    animation: {
      type: 'binary-search-shrink-interactive',
      title: 'Search Interval Shrinking Simulator',
      description:
        'Select a target value and step through the binary search to watch the green interval window slice in half repeatedly.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Target Value to Search',
        options: ['Target = 7 (Index 1)', 'Target = 23 (Index 5)', 'Target = 38 (Index 7)', 'Target = 99 (Not Found)'],
        defaultVal: 'Target = 23 (Index 5)',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why should you write `mid = low + (high - low) / 2` instead of `mid = (low + high) / 2`?',
        options: [
          'Because it avoids signed 32-bit integer overflow when low + high exceeds 2³¹ - 1',
          'Because division is illegal in Java',
          'Because it runs on GPU instructions',
          'To handle negative array sizes',
        ],
        correctIndex: 0,
        explanation: 'In large arrays (N > 1 billion), `low + high` overflows the 32-bit signed integer boundary into negative numbers, causing crashes.',
      },
      {
        id: 'q2',
        question: 'How many comparisons does Binary Search take in the worst case to search through 1,048,576 sorted elements?',
        options: ['1,048,576', '524,288', '21 comparisons (log2(2²⁰) + 1)', '100'],
        correctIndex: 2,
        explanation: 'log2(1,048,576) = 20; binary search requires at most 21 comparisons to locate any item or confirm absence.',
      },
      {
        id: 'q3',
        question: 'Can Binary Search be applied to an unsorted function or array?',
        options: [
          'Never under any circumstances',
          'Yes, if the function exhibits a monotonic boolean property (e.g. false, false, ..., true, true) such as "can we ship packages in D days?"',
          'Only if the array contains prime numbers',
          'Only if the length is a multiple of 10',
        ],
        correctIndex: 1,
        explanation: 'Binary Search on Answer works on any monotonic predicate function where all values below a threshold return False and all values above return True.',
      },
    ],
  },
  {
    id: 'dsa-sorting-quick-merge',
    subject: 'dsa',
    category: 'Sorting Algorithms',
    title: 'Quick Sort vs. Merge Sort',
    subtitle: 'Partitioning vs. Merging: In-Place Cache vs. Stable Divide-and-Conquer',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Sorting', 'QuickSort', 'MergeSort', 'Stability', 'Divide and Conquer'],
    quickRecall: {
      oneLiner:
        'Merge Sort divides into halves and merges in sorted order (stable O(N log N) guaranteed, O(N) space); Quick Sort partitions around a pivot in-place (O(N log N) avg, O(N²) worst).',
      whenToUse:
        'Use Merge Sort when stability is required or sorting Linked Lists; use Quick Sort (or Dual-Pivot QuickSort) for arrays where in-place cache locality dominates.',
      whyItMatters:
        'Standard library sorting: Java uses Dual-Pivot Quicksort for primitives and Timsort (MergeSort derivative) for objects to guarantee stability.',
      keyPoints: [
        'Merge Sort: Divide array in half recursively; merge two sorted halves using temporary auxiliary buffer.',
        'Quick Sort (Lomuto / Hoare): Pick pivot; partition elements so all `< pivot` are on the left, all `> pivot` on the right; recurse.',
        'Stability: An algorithm is stable if elements with equal keys maintain their relative initial order.',
        'Quick Sort worst case: Occurs when pivot is consistently smallest/largest element (e.g. sorted array with first element as pivot), degrading to O(N²).',
      ],
      formulaOrSyntax: {
        label: 'Recurrence Relations',
        codeOrLatex: 'T_{\\text{Merge}}(N) = 2T(N/2) + O(N) \\implies O(N \\log N) \\quad [\\text{Master Theorem}]',
        isLatex: true,
      },
      complexity: {
        time: 'Merge Sort: O(N \\log N) all cases | Quick Sort: O(N \\log N) avg, O(N^2) worst',
        space: 'Merge Sort: O(N) auxiliary array | Quick Sort: O(\\log N) call stack',
      },
      commonMistakeOrTrap: {
        mistake: 'Picking `arr[0]` as the fixed pivot in Quick Sort.',
        fix: 'A sorted or reverse-sorted input will trigger the catastrophic O(N²) worst-case! Use random pivot or median-of-three.',
        interviewTrap:
          'Question: "Why is Quick Sort faster than Merge Sort in practice if both are O(N log N)?" Answer: Quick Sort sorts in-place with sequential cache access and smaller constant factors; Merge Sort must constantly copy elements in and out of an auxiliary array.',
      },
      examCheatsheet: [
        'Merge Sort: Stable, Guaranteed O(N log N), O(N) extra space',
        'Quick Sort: Unstable, In-place O(1) space, O(N²) worst case if unrandomized',
        'Java primitives sort with Quicksort; Objects sort with Timsort (stable)',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'Algorithmic Comparison: Merge Sort vs. Quick Sort',
      caption:
        'Detailed comparison of time complexities, space bounds, stability, and memory movement patterns.',
      visualKey: 'dsa-sorting-matrix',
      details: {
        comparison: {
          headers: ['Metric', 'Merge Sort', 'Quick Sort', 'Winner'],
          rows: [
            ['Best Time', 'O(N log N)', 'O(N log N)', 'Tie'],
            ['Worst Time', 'O(N log N) Guaranteed', 'O(N²) without randomization', 'Merge Sort'],
            ['Auxiliary Space', 'O(N) extra array allocation', 'O(log N) stack frames only', 'Quick Sort (In-Place)'],
            ['Stability', 'Stable (Preserves equal keys)', 'Unstable (Long-distance swaps)', 'Merge Sort'],
            ['Linked Lists', 'Ideal (O(1) pointer merge)', 'Poor (Slow random access)', 'Merge Sort'],
          ],
        },
      },
    },
    animation: {
      type: 'sorting-step-interactive',
      title: 'Divide & Conquer Partition Stepper',
      description:
        'Watch an unsorted array partition around a pivot in QuickSort versus recursive splitting in MergeSort.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Algorithm to Visualize',
        options: ['Quick Sort Partitioning', 'Merge Sort Two-Way Merge'],
        defaultVal: 'Quick Sort Partitioning',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the worst-case time complexity of unrandomized Quick Sort on an already sorted array?',
        options: ['O(N log N)', 'O(N)', 'O(N²)', 'O(log N)'],
        correctIndex: 2,
        explanation: 'If the first element is chosen as pivot on an already sorted array, the partition sizes are 0 and N-1, yielding N + (N-1) + ... + 1 = O(N²).',
      },
      {
        id: 'q2',
        question: 'Why does Java use a stable sort (Timsort/MergeSort) for `Arrays.sort(Object[])` instead of QuickSort?',
        options: [
          'Because QuickSort cannot run on objects',
          'Because users expect objects with equal comparison keys (e.g. students sorted by grade) to retain their prior sorting order (e.g. alphabetical)',
          'To avoid NullPointerExceptions',
          'Because MergeSort uses 0 memory',
        ],
        correctIndex: 1,
        explanation: 'Stability ensures that multi-level sorting (e.g. sorting by name, then by department) preserves secondary sort order.',
      },
      {
        id: 'q3',
        question: 'What is the auxiliary space complexity of standard Merge Sort on an array of length N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Merge sort allocates an auxiliary array of size N to merge two sorted sub-arrays together without overwriting values.',
      },
    ],
  },
  {
    id: 'dsa-linked-lists',
    subject: 'dsa',
    category: 'Linked Lists',
    title: 'Linked List: Reversal & Fast-Slow Pointers',
    subtitle: 'Node References, In-Place Reversal, and Dummy Head Pattern',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Linked List', 'Pointers', 'In-Place Reversal', 'Dummy Node', 'Midpoint'],
    quickRecall: {
      oneLiner:
        'A sequence of linear nodes where each node encapsulates data and a pointer reference to the next node; reversal is achieved by flipping pointers in O(N) time with O(1) space.',
      whenToUse:
        'Implementing Queues/Stacks, LRU Cache (Doubly Linked List + Hash Map), and in-place sequential rearrangements.',
      whyItMatters:
        'Testing linked list manipulation evaluates precision with pointer handling, edge case management, and avoidance of orphan memory leaks.',
      keyPoints: [
        'Dummy Head Pattern: `ListNode dummy = new ListNode(0); dummy.next = head;` eliminates special-case checks for inserting/deleting the head node.',
        'Three-Pointer In-Place Reversal: Maintain `prev`, `curr`, and `nextTemp` pointers: `curr.next = prev; prev = curr; curr = nextTemp;`.',
        'Finding Midpoint: Fast moves 2 steps, Slow moves 1 step; when Fast reaches end, Slow is exactly at the midpoint.',
        'Cycle Detection: If Fast catches Slow, cycle detected; to find cycle start, reset one pointer to head and advance both by 1.',
      ],
      formulaOrSyntax: {
        label: 'In-Place Reversal Idiom',
        codeOrLatex: 'ListNode prev = null, curr = head;\nwhile (curr != null) {\n    ListNode next = curr.next; // 1. Save next\n    curr.next = prev;          // 2. Reverse link\n    prev = curr;               // 3. Move prev forward\n    curr = next;               // 4. Move curr forward\n}\nreturn prev; // New head of reversed list',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Traversal / Reversal: O(N) | Insertion at Head: O(1)',
        space: 'O(1) auxiliary space (in-place pointer updates)',
      },
      commonMistakeOrTrap: {
        mistake: 'Reassigning `curr.next = prev` before caching `curr.next` in a temporary variable.',
        fix: 'Overwriting `curr.next` immediately severs access to the remainder of the linked list, causing permanent orphan node loss!',
        interviewTrap:
          'Question: "How do you find the Kth node from the end in a single pass?" Answer: Advance a pointer `fast` K steps ahead, then advance `slow` and `fast` together until `fast` hits the end; `slow` will be at the target node!',
      },
      examCheatsheet: [
        'Dummy node simplifies head insertions and deletions',
        'Reversal requires 3 pointers: `prev`, `curr`, and `next`',
        'Slow & Fast pointer finds middle node in exactly 1 pass',
      ],
    },
    visual: {
      type: 'step-trace',
      title: 'Three-Pointer Reversal Cycle: Step-by-Step Link Inversion',
      caption:
        'Save `next` → Point `curr.next` backwards to `prev` → Advance `prev` → Advance `curr`. Repeat until `curr == null`.',
      visualKey: 'dsa-linked-list-viz',
      details: {
        steps: [
          { label: 'Initial State', desc: 'prev = null, curr = Node(1), next = Node(2)' },
          { label: 'Step 1: Invert', desc: 'Node(1).next points to null (prev). prev moves to Node(1)' },
          { label: 'Step 2: Advance', desc: 'curr moves to Node(2). Repeat link flip to Node(1)' },
        ],
      },
    },
    animation: {
      type: 'linked-list-pointer-interactive',
      title: 'In-Place Node Reversal Stepper',
      description:
        'Click Step to watch arrows flip backwards one node at a time while `prev` and `curr` advance down the chain.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Reversal Step',
        min: 1,
        max: 5,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why is a Dummy Head node frequently introduced in linked list problems?',
        options: [
          'To increase the speed of the CPU',
          'To eliminate boilerplate edge cases when inserting or deleting the first node (head) of the list',
          'Because linked lists cannot start from index 0',
          'To sort the list automatically',
        ],
        correctIndex: 1,
        explanation: 'A dummy node provides a stable invariant parent, allowing operations on the true head to use the exact same logic as interior nodes.',
      },
      {
        id: 'q2',
        question: 'What is the auxiliary space complexity of reversing a singly linked list in-place iteratively?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Iterative reversal only updates existing pointer references using three local variables (`prev`, `curr`, `next`), using O(1) space.',
      },
      {
        id: 'q3',
        question: 'When using Fast-Slow pointers to find the middle node of a linked list with 6 nodes, where does Slow point when Fast reaches null?',
        options: ['Node 1', 'Node 3 or 4 (depending on while condition)', 'Node 6', 'Null'],
        correctIndex: 1,
        explanation: 'With Fast moving 2x faster, Slow travels exactly half the distance, landing on the middle node when Fast terminates.',
      },
    ],
  },
  {
    id: 'dsa-stack-monotonic',
    subject: 'dsa',
    category: 'Stacks and Queues',
    title: 'Stack & Monotonic Stack Pattern',
    subtitle: 'LIFO Buffers, Parenthesis Matching, and Next Greater Elements',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Stack', 'Monotonic Stack', 'Next Greater Element', 'LIFO', 'Histogram'],
    quickRecall: {
      oneLiner:
        'A Monotonic Stack maintains its elements in strictly increasing or decreasing order, solving "Next Greater / Smaller Element" queries in linear O(N) time.',
      whenToUse:
        'Valid Parentheses, Daily Temperatures, Largest Rectangle in Histogram, Trapping Rain Water, and Next Greater Element problems.',
      whyItMatters:
        'Replaces naive O(N²) nested forward scans with a single pass where every item is pushed and popped at most once.',
      keyPoints: [
        'Standard Stack: LIFO (Last-In, First-Out) with `push()`, `pop()`, and `peek()` in O(1) time.',
        'Monotonic Decreasing Stack: Used to find Next Greater Element. Before pushing `x`, pop all elements `< x` (they have found their next greater element!).',
        'Monotonic Increasing Stack: Used to find Next Smaller Element (e.g. Largest Rectangle in Histogram).',
        'Store Indices, Not Values: Pushing indices into the stack gives you both the value (`arr[i]`) and the distance (`i - prev_index`).',
      ],
      formulaOrSyntax: {
        label: 'Next Greater Element Template',
        codeOrLatex: 'int[] res = new int[n];\nDeque<Integer> stack = new ArrayDeque<>(); // Store indices\nfor (int i = 0; i < n; i++) {\n    while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n        res[stack.pop()] = nums[i]; // Found next greater!\n    }\n    stack.push(i);\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(N) amortized (each element is pushed once and popped at most once)',
        space: 'O(N) auxiliary space for stack storage',
      },
      commonMistakeOrTrap: {
        mistake: 'Using legacy `java.util.Stack` class instead of `ArrayDeque`.',
        fix: '`java.util.Stack` extends `Vector` and synchronizes every single method, introducing massive thread contention overhead. Use `Deque<Integer> stack = new ArrayDeque<>()`.',
        interviewTrap:
          'Question: "Why is monotonic stack traversal O(N) if there is a `while` loop inside a `for` loop?" Answer: Amortized analysis! An element can only be popped from the stack once after being pushed; total pop operations across all iterations cannot exceed N.',
      },
      examCheatsheet: [
        'Next Greater Element = Monotonic Decreasing Stack',
        'Next Smaller Element = Monotonic Increasing Stack',
        'Store array INDICES on the stack to calculate distances and spans',
      ],
    },
    visual: {
      type: 'step-trace',
      title: 'Monotonic Stack Trace on Temperature Array `[73, 74, 75, 71, 69, 72]`',
      caption:
        'Encountering 72 pops 69 and 71 from stack because 72 is greater. Indices calculate wait days.',
      visualKey: 'dsa-monotonic-stack-viz',
      details: {
        steps: [
          { label: 'Push 75', desc: 'Stack contains [75]. 71 < 75 → push 71. Stack: [75, 71]' },
          { label: 'Push 69', desc: '69 < 71 → push 69. Stack: [75, 71, 69]' },
          { label: 'Encounter 72', desc: '72 > 69 → pop 69 (found answer). 72 > 71 → pop 71. Push 72' },
        ],
      },
    },
    animation: {
      type: 'monotonic-stack-push-pop-interactive',
      title: 'Monotonic Stack Bar Push & Pop Visualizer',
      description:
        'Step through the array to watch bars get pushed onto the stack, popping smaller bars beneath them as greater elements arrive.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Array Step',
        min: 1,
        max: 6,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the total amortized time complexity of running a monotonic stack over an array of size N?',
        options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(2^N)'],
        correctIndex: 2,
        explanation: 'Each element enters the stack once and exits at most once, bounding total operations strictly to at most 2N = O(N).',
      },
      {
        id: 'q2',
        question: 'Why should you store array indices on the stack instead of raw values?',
        options: [
          'Because values cannot be compared',
          'Storing indices allows direct access to both the value `arr[idx]` and distance spans `i - idx`',
          'To save RAM',
          'Because Java requires integers',
        ],
        correctIndex: 1,
        explanation: 'Indices provide dual access: you can look up values in O(1) while also computing distances (like days until warmer temperature).',
      },
      {
        id: 'q3',
        question: 'Which stack order is required to find the Next Greater Element for each position in an array?',
        options: ['Monotonic Increasing', 'Monotonic Decreasing', 'Random order', 'Alternating odd-even'],
        correctIndex: 1,
        explanation: 'A monotonic decreasing stack keeps elements in falling order; any larger element arriving pops and resolves smaller elements beneath it.',
      },
    ],
  },
  {
    id: 'dsa-trees-bst',
    subject: 'dsa',
    category: 'Trees and BST',
    title: 'Binary Search Tree: Inorder & Balance',
    subtitle: 'Recursive Properties, BST Invariant, and Traversal Orders',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Trees', 'BST', 'Inorder', 'Depth-First', 'Balanced Tree'],
    quickRecall: {
      oneLiner:
        'A binary tree where every node satisfies the BST invariant: all keys in the left subtree are strictly smaller, and all keys in the right subtree are strictly greater.',
      whenToUse:
        'Dynamic sorted data sets requiring O(log N) search, insertion, and deletion (e.g. TreeMap, TreeSet, database index b-trees).',
      whyItMatters:
        'An Inorder Traversal (Left → Root → Right) of a BST visits all keys in strictly sorted ascending order in O(N) time.',
      keyPoints: [
        'BST Invariant: For every node X: `key(left_subtree) < key(X) < key(right_subtree)`.',
        'Traversal Orders: Preorder (Root, L, R) for cloning/serialization; Inorder (L, Root, R) for sorted order; Postorder (L, R, Root) for bottom-up deletion.',
        'Skewed Degeneracy: Inserting already-sorted data into an un-balanced BST degrades it into a linked list of height N (O(N) search!).',
        'Self-Balancing Trees: AVL Trees and Red-Black Trees perform tree rotations to guarantee O(log N) height.',
      ],
      formulaOrSyntax: {
        label: 'BST Inorder Validation Pattern',
        codeOrLatex: 'boolean validate(TreeNode root, long min, long max) {\n    if (root == null) return true;\n    if (root.val <= min || root.val >= max) return false;\n    return validate(root.left, min, root.val) && validate(root.right, root.val, max);\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Search / Insert: Average O(\\log N) | Worst Case O(N) [Skewed Tree]',
        space: 'O(H) call stack where H is tree height (\\log N for balanced, N for skewed)',
      },
      commonMistakeOrTrap: {
        mistake: 'Validating a BST by only checking if `root.val > root.left.val` and `root.val < root.right.val`.',
        fix: 'A node must be greater than ALL nodes in its entire left subtree, not just its immediate child! Must propagate (min, max) bounds.',
        interviewTrap:
          'Question: "How do you find the Inorder Successor of a node in a BST?" Answer: If the node has a right child, it is the leftmost node in its right subtree; otherwise, it is the lowest ancestor whose left child is also an ancestor of the node.',
      },
      examCheatsheet: [
        'Inorder Traversal of BST ALWAYS yields sorted ascending sequence',
        'Balanced BST height = O(log N); Skewed BST height = O(N)',
        'Validation requires propagating upper and lower bounds down recursion',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'BST Invariant & Inorder Traversal Walk (L → Root → R)',
      caption:
        'Tracing the perimeter of the BST in Inorder: [2, 5, 8] → 10 → [12, 15, 20] produces sorted sequence [2, 5, 8, 10, 12, 15, 20].',
      visualKey: 'dsa-bst-traversal-viz',
      details: {
        steps: [
          { label: 'Root 10', desc: 'Left child 5 (< 10), Right child 15 (> 10)' },
          { label: 'Subtree 5', desc: 'Left child 2, Right child 8 (all < 10)' },
          { label: 'Subtree 15', desc: 'Left child 12, Right child 20 (all > 10)' },
        ],
      },
    },
    animation: {
      type: 'bst-search-step-interactive',
      title: 'BST Search Path Stepper',
      description:
        'Pick a target number to watch the search pointer compare with root and branch left or right until found.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Target Value to Search',
        options: ['Search 8 (Go Left then Right)', 'Search 20 (Go Right then Right)', 'Search 12 (Go Right then Left)'],
        defaultVal: 'Search 8 (Go Left then Right)',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which tree traversal order visits elements of a Binary Search Tree in strictly sorted ascending order?',
        options: ['Preorder (Root, Left, Right)', 'Inorder (Left, Root, Right)', 'Postorder (Left, Right, Root)', 'Level-Order (BFS)'],
        correctIndex: 1,
        explanation: 'Inorder traversal processes the entire left subtree (all smaller keys), then the root, then the right subtree (all larger keys), producing sorted order.',
      },
      {
        id: 'q2',
        question: 'What is the worst-case search time in a naive Binary Search Tree without self-balancing?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Inserting sorted numbers (e.g. 1, 2, 3, 4, 5) creates a degenerate linear chain (linked list) where search takes O(N) time.',
      },
      {
        id: 'q3',
        question: 'What is the purpose of tree rotations in self-balancing trees like AVL or Red-Black trees?',
        options: [
          'To reverse the order of keys',
          'To restore O(log N) height balance while strictly preserving the BST key ordering invariant',
          'To delete duplicate nodes',
          'To convert binary trees into heaps',
        ],
        correctIndex: 1,
        explanation: 'Rotations restructure parent-child links in O(1) time to decrease subtree height without violating the BST ordering property.',
      },
    ],
  },
  {
    id: 'dsa-binary-heap',
    subject: 'dsa',
    category: 'Heaps and Priority Queues',
    title: 'Binary Heap: Min-Heap & Sift Operations',
    subtitle: 'Complete Binary Trees Mapped into Array Indices',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Heap', 'Priority Queue', 'Sift-Up', 'Sift-Down', 'Array Mapping'],
    quickRecall: {
      oneLiner:
        'A complete binary tree stored compactly in a contiguous array where every parent node satisfies the heap property: `parent ≤ children` (Min-Heap).',
      whenToUse:
        'Top-K Frequent Elements, Dijkstra\'s Shortest Path, Median from Data Stream (Two Heaps), and Task Scheduling.',
      whyItMatters:
        'Provides O(1) access to minimum/maximum element with O(log N) insertion and deletion, stored in an array with zero pointer overhead.',
      keyPoints: [
        'Array Index Math (0-indexed): Parent `(i - 1) / 2`; Left child `2*i + 1`; Right child `2*i + 2`.',
        'Insert (`offer`): Append at end of array, then `siftUp()` by swapping with parent until heap property holds (O(log N)).',
        'Extract Min (`poll`): Swap root with last element, remove last element, then `siftDown()` root with smaller child (O(log N)).',
        'Build Heap (Heapify): Sifting down all internal nodes bottom-up takes linear O(N) time, NOT O(N log N)!',
      ],
      formulaOrSyntax: {
        label: 'Array Index Relationships',
        codeOrLatex: '\\text{parent}(i) = \\lfloor (i - 1)/2 \\rfloor, \\quad \\text{left}(i) = 2i + 1, \\quad \\text{right}(i) = 2i + 2',
        isLatex: true,
      },
      complexity: {
        time: 'Peek: O(1) | Insert: O(\\log N) | Extract Min: O(\\log N) | Build Heap: O(N)',
        space: 'O(N) contiguous array storage (zero pointer overhead)',
      },
      commonMistakeOrTrap: {
        mistake: 'Assuming a Binary Heap allows O(log N) search for arbitrary values.',
        fix: 'A heap is NOT a BST; there is no relationship between left and right siblings! Searching for an arbitrary key requires O(N) linear scan.',
        interviewTrap:
          'Question: "Why is building a heap from an array of N items O(N) instead of O(N log N)?" Answer: Most nodes sit near the leaves with tiny heights! Summing `h * (N / 2^(h+1))` is a convergent series that equals O(N).',
      },
      examCheatsheet: [
        'Root is always minimum (Min-Heap) or maximum (Max-Heap) in O(1)',
        'Building heap from array takes O(N) time via bottom-up heapify',
        'Java `PriorityQueue` is a Min-Heap by default',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Complete Tree Topology Mapped into Array Indices',
      caption:
        'No node pointers needed: Level-by-level breadth directly corresponds to contiguous array indices 0 through N-1.',
      visualKey: 'dsa-heap-array-viz',
      details: {
        comparison: {
          headers: ['Index', 'Array Value', 'Parent Index', 'Children Indices'],
          rows: [
            ['0 (Root)', '3 (Minimum)', 'None', 'Left: 1 (val 5), Right: 2 (val 8)'],
            ['1', '5', '0 (val 3)', 'Left: 3 (val 9), Right: 4 (val 7)'],
            ['2', '8', '0 (val 3)', 'Left: 5 (val 12), Right: 6 (val 15)'],
          ],
        },
      },
    },
    animation: {
      type: 'heap-sift-interactive',
      title: 'Sift-Up and Sift-Down Animation',
      description:
        'Insert value 2 at the bottom of the Min-Heap to watch it bubble up past parent nodes to claim the root position.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Operation to Simulate',
        options: ['Insert 2 (Sift-Up to Root)', 'Extract Min (Swap & Sift-Down)'],
        defaultVal: 'Insert 2 (Sift-Up to Root)',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the time complexity of building a Binary Heap from an unsorted array of N elements?',
        options: ['O(N log N)', 'O(N)', 'O(N²)', 'O(log N)'],
        correctIndex: 1,
        explanation: 'Bottom-up heapify starts at the lowest non-leaf nodes and sifts down; the mathematical series sum converges strictly to O(N).',
      },
      {
        id: 'q2',
        question: 'In a 0-indexed array-based binary heap, what is the index of the left child of node at index i?',
        options: ['2*i', '2*i + 1', '2*i + 2', 'i / 2'],
        correctIndex: 1,
        explanation: 'In 0-indexed heaps, left child is `2*i + 1` and right child is `2*i + 2`.',
      },
      {
        id: 'q3',
        question: 'Can you search for an arbitrary element in a Min-Heap in O(log N) time?',
        options: [
          'Yes, because it is a binary tree',
          'No, because heaps only order parent vs. child, not left vs. right siblings, so arbitrary search takes O(N)',
          'Yes, using binary search',
          'Only if the heap is full',
        ],
        correctIndex: 1,
        explanation: 'Heaps only guarantee that parents are smaller than children; siblings have no relative ordering, necessitating an O(N) scan.',
      },
    ],
  },
  {
    id: 'dsa-graphs-bfs-dfs',
    subject: 'dsa',
    category: 'Graphs: BFS and DFS',
    title: 'Graphs: BFS (Shortest Path) vs. DFS (Backtracking)',
    subtitle: 'Queue Level-Order Expansion vs. Stack Deep Exploration',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Graphs', 'BFS', 'DFS', 'Shortest Path', 'Topological Sort', 'Cycle Detection'],
    quickRecall: {
      oneLiner:
        'BFS uses a Queue to explore neighbor nodes level-by-level (guaranteeing unweighted shortest path); DFS uses a Stack/Recursion to explore deep paths before backtracking.',
      whenToUse:
        'Use BFS for shortest path in unweighted graphs or minimum moves; use DFS for cycle detection, topological sorting, path existence, and connected components.',
      whyItMatters:
        'BFS finds the closest target first; DFS traverses to the end of a branch before unwinding, which is critical for maze explorations.',
      keyPoints: [
        'Visited Set: Essential in both algorithms to prevent infinite loops in cyclic graphs.',
        'BFS: FIFO Queue. Process all nodes at distance d before moving to distance d + 1.',
        'DFS: LIFO Call Stack. Recurse down one branch until base case/dead end, then backtrack.',
        'Connected Components: Loop through all vertices; if `!visited[v]`, launch BFS/DFS and increment component count.',
      ],
      formulaOrSyntax: {
        label: 'BFS Queue Template',
        codeOrLatex: 'Queue<Integer> q = new ArrayDeque<>();\nSet<Integer> visited = new HashSet<>();\nq.offer(start); visited.add(start);\nwhile (!q.isEmpty()) {\n    int curr = q.poll();\n    for (int neighbor : adj.get(curr)) {\n        if (visited.add(neighbor)) q.offer(neighbor);\n    }\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(V + E) where V = vertices, E = edges (each vertex and edge visited once)',
        space: 'BFS: O(V) queue width | DFS: O(V) recursion stack height',
      },
      commonMistakeOrTrap: {
        mistake: 'Marking a node as `visited` when it is popped from the queue in BFS rather than when it is pushed.',
        fix: 'Marking visited on pop allows identical neighbor nodes to be added to the queue multiple times, causing exponential memory explosion!',
        interviewTrap:
          'Question: "Can BFS find the shortest path in a graph with weighted edges?" Answer: NO! Standard BFS assumes uniform edge weights of 1. For non-negative weighted graphs, use Dijkstra’s Algorithm.',
      },
      examCheatsheet: [
        'Shortest path in unweighted graph = BFS (Queue)',
        'Cycle detection & Topological Sort = DFS (Visited / State array)',
        'Always mark `visited` immediately upon ENQUEUEING in BFS',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Traversal Frontier Comparison: Concentric Rings (BFS) vs. Deep Spoke (DFS)',
      caption:
        'BFS ripples outwards in concentric distance rings (d=0, d=1, d=2); DFS plunges deeply down a single path until hitting a leaf.',
      visualKey: 'dsa-graph-traversal-viz',
      details: {
        comparison: {
          headers: ['Metric', 'BFS (Breadth-First)', 'DFS (Depth-First)'],
          rows: [
            ['Data Structure', 'FIFO Queue (`ArrayDeque`)', 'LIFO Call Stack (Recursion)'],
            ['Shortest Path Guarantee', 'Yes (Unweighted graphs)', 'No (Finds any path, not shortest)'],
            ['Memory Footprint', 'O(Max Width) — high in bushy graphs', 'O(Max Depth) — low in bushy graphs'],
            ['Ideal Problems', 'Minimum hops, nearest exit, level order', 'Maze solving, cycle detection, topo sort'],
          ],
        },
      },
    },
    animation: {
      type: 'graph-bfs-dfs-interactive',
      title: 'Graph Traversal Frontier Simulator',
      description:
        'Toggle between BFS (level-by-level queue expansion) and DFS (depth-first branch plunge) across an 8-node graph.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Traversal Strategy',
        options: ['BFS (Queue Level-Order)', 'DFS (Call Stack Deep-Dive)'],
        defaultVal: 'BFS (Queue Level-Order)',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does BFS guarantee the shortest path between two nodes in an unweighted graph?',
        options: [
          'Because it checks nodes in increasing order of their distance from the starting vertex',
          'Because it uses a heap to sort distances',
          'Because it visits all edges simultaneously',
          'Because graphs have no cycles',
        ],
        correctIndex: 0,
        explanation: 'BFS explores all nodes at distance d before moving to distance d + 1; the first time it reaches the target node is guaranteed to be the shortest path.',
      },
      {
        id: 'q2',
        question: 'When should a node be marked as `visited` in Breadth-First Search to prevent redundant memory allocation?',
        options: [
          'Only when all its neighbors have finished',
          'Immediately when it is added to the queue (`q.offer()`)',
          'When it is removed from the queue (`q.poll()`)',
          'At the very end of the function',
        ],
        correctIndex: 1,
        explanation: 'Marking a node visited at enqueue time prevents multiple adjacent nodes from adding duplicate copies to the queue.',
      },
      {
        id: 'q3',
        question: 'What is the time complexity of traversing an entire graph represented as an adjacency list using DFS?',
        options: ['O(V * E)', 'O(V + E)', 'O(V²)', 'O(E log V)'],
        correctIndex: 1,
        explanation: 'DFS visits each vertex once (V) and scans through all outgoing edges once (E), resulting in O(V + E) time.',
      },
    ],
  },
  {
    id: 'dsa-dynamic-programming-knapsack',
    subject: 'dsa',
    category: 'Dynamic Programming',
    title: 'Dynamic Programming: 0/1 Knapsack Pattern',
    subtitle: 'Overlapping Subproblems, Optimal Substructure, and Space Compression',
    difficulty: 'Advanced',
    isInterviewFavorite: true,
    readTimeSeconds: 55,
    tags: ['DP', 'Knapsack', 'Memoization', 'Space Optimization', 'Tabulation'],
    quickRecall: {
      oneLiner:
        'Solves optimization problems by breaking them into overlapping subproblems, storing previously computed results in a table rather than recomputing them exponentially.',
      whenToUse:
        'Subset Sum, Partition Equal Subset, Coin Change, Target Sum, and resource allocation within a finite capacity budget.',
      whyItMatters:
        'Converts brute-force 2^N exponential combinatorial recursion down to polynomial O(N * W) pseudo-polynomial time.',
      keyPoints: [
        '0/1 Knapsack choice: For each item i, either INCLUDE it (gain value, reduce remaining capacity by weight) or EXCLUDE it.',
        'Transition: `dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])`.',
        'Base Cases: Capacity 0 yields value 0; 0 items yields value 0.',
        '1D Space Optimization: Iterate capacity `w` in REVERSE (from W down to wt[i]) to ensure each item is used at most once!',
      ],
      formulaOrSyntax: {
        label: '1D Space-Optimized Knapsack Transition',
        codeOrLatex: 'int[] dp = new int[W + 1];\nfor (int i = 0; i < n; i++) {\n    for (int w = W; w >= wt[i]; w--) { // Reverse order prevents re-use\n        dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);\n    }\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(N \\cdot W) where N = items, W = knapsack capacity budget',
        space: 'O(W) with 1D array compression (down from O(N \\cdot W))',
      },
      commonMistakeOrTrap: {
        mistake: 'Iterating capacity `w` forward (`for (w = wt[i]; w <= W; w++)`) in 0/1 Knapsack.',
        fix: 'Forward iteration reuses the same item multiple times (solving Unbounded Knapsack / Coin Change)! 0/1 Knapsack requires backward iteration.',
        interviewTrap:
          'Question: "Is 0/1 Knapsack a polynomial-time algorithm?" Answer: NO! It is pseudo-polynomial because its runtime depends on the numeric value of W, which is exponential in terms of input bit length (`2^bits`).',
      },
      examCheatsheet: [
        '0/1 Knapsack = Loop backwards `for (w = W; w >= wt[i]; w--)`',
        'Unbounded Knapsack / Coin Change = Loop forwards `for (w = wt[i]; w <= W; w++)`',
        'Memoization = Top-down recursion + Cache; Tabulation = Bottom-up iteration',
      ],
    },
    visual: {
      type: 'diagram',
      title: '2D DP Grid Transition: Exclude vs. Include Dependencies',
      caption:
        '`dp[i][w]` looks directly above (`dp[i-1][w]`, exclude) and to the left shifted by item weight (`dp[i-1][w - wt[i]]`, include).',
      visualKey: 'dsa-knapsack-grid-viz',
      details: {
        comparison: {
          headers: ['Item (wt, val)', 'w = 0', 'w = 1', 'w = 2', 'w = 3', 'w = 4'],
          rows: [
            ['Init (0 items)', '$0', '$0', '$0', '$0', '$0'],
            ['Item 1 (wt 1, $2)', '$0', '$2', '$2', '$2', '$2'],
            ['Item 2 (wt 2, $3)', '$0', '$2', '$3', '$5', '$5'],
            ['Item 3 (wt 3, $4)', '$0', '$2', '$3', '$5', '$7 (Optimal)'],
          ],
        },
      },
    },
    animation: {
      type: 'knapsack-table-fill-interactive',
      title: 'DP Table Cell-by-Cell Fill Simulator',
      description:
        'Watch the DP array fill cell-by-cell as the algorithm compares taking the current item against skipping it.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Knapsack Capacity (W)',
        min: 1,
        max: 6,
        step: 1,
        defaultVal: 4,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why must the capacity loop run in reverse (`w = W down to wt[i]`) when compressing 0/1 Knapsack into a 1D array?',
        options: [
          'To prevent the same item from being included multiple times in the same knapsack',
          'To sort the array in descending order',
          'Because arrays cannot be indexed from 0',
          'To make the code thread-safe',
        ],
        correctIndex: 0,
        explanation: 'Looping backwards ensures that when computing `dp[w]`, the value at `dp[w - wt[i]]` still represents the previous row without the current item.',
      },
      {
        id: 'q2',
        question: 'What is the time complexity of the standard DP solution for 0/1 Knapsack with N items and maximum weight capacity W?',
        options: ['O(2^N)', 'O(N * W)', 'O(N + W)', 'O(N!)'],
        correctIndex: 1,
        explanation: 'The nested loops run N times across W capacity values, computing each subproblem in O(1) for a total of O(N * W) time.',
      },
      {
        id: 'q3',
        question: 'What are the two core prerequisites for a problem to be solvable via Dynamic Programming?',
        options: [
          'Linear algebra and GPU hardware',
          'Overlapping Subproblems and Optimal Substructure',
          'Sorting and Two Pointers',
          'Continuous variables and differentiation',
        ],
        correctIndex: 1,
        explanation: 'Dynamic Programming requires that subproblems recur repeatedly (overlapping) and that an optimal solution can be constructed from optimal solutions to subproblems.',
      },
    ],
  },
];
