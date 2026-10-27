import { RevisionTopic } from './types';

export const DSA_REVISION_TOPICS: RevisionTopic[] = [
  {
    id: 'dsa-big-o',
    subject: 'dsa',
    category: 'Big-O Complexity',
    title: 'Big-O Notation & Growth Rates',
    subtitle: 'Asymptotic Analysis, Dominant Terms & Space-Time Tradeoffs',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Big-O', 'Complexity', 'Asymptotic', 'Amortized', 'Logarithms'],
    quickRecall: {
      oneLiner:
        'Big-O notation describes the worst-case upper bound of an algorithm\'s runtime or memory as input size N approaches infinity.',
      simpleAnalogy:
        'Commute scaling analogy: Finding a book on your desk takes O(1) constant time whether your room has 1 book or 1,000 books. Searching a book by reading every shelf takes O(N) linear time (doubling the library doubles your search time). Comparing every book with every other book takes O(N²) quadratic time (disastrous at scale).',
      whenToUse:
        'Analyzing any algorithm before writing code to verify scalability and avoid timeout failures on large competitive inputs.',
      whyItMatters:
        'An O(N²) algorithm fails on N=100,000 (10 billion operations = ~10 seconds); an O(N log N) algorithm finishes in 0.02 seconds.',
      keyPoints: [
        'Growth hierarchy: O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2^N) < O(N!).',
        'Drop lower-order terms: O(N² + 500N + 9999) simplifies to O(N²).',
        'Drop constant coefficients: O(3N) simplifies to O(N).',
        'Space Complexity: Auxiliary memory allocated during execution (excluding input array space). Call stack frames in recursion consume space!',
      ],
      formulaOrSyntax: {
        label: 'Formal Mathematical Definition',
        codeOrLatex: 'f(N) = O(g(N)) \\iff \\exists c > 0, N_0 > 0 \\text{ s.t. } |f(N)| \\le c \\cdot g(N) \\quad \\forall N \\ge N_0',
        isLatex: true,
      },
      complexity: {
        time: 'O(1) to evaluate algebraic complexity formulas',
        space: 'O(1)',
      },
      commonMistakeOrTrap: {
        mistake: 'Assuming that O(1) means "instantaneous" or always faster than O(N).',
        fix: 'An O(1) algorithm with a massive constant factor (e.g. 10,000,000 operations) will be slower than an O(N) loop for small N (e.g. N=5). Big-O describes growth rate as N → ∞.',
        interviewTrap:
          'Question: "What is the time complexity of building an array of strings in a loop using string concatenation?" Answer: O(N²)! Strings are immutable, so copying characters on each step creates 1 + 2 + 3 + ... + N = O(N²) copies.',
      },
      examCheatsheet: [
        'O(1) = Hash map lookup, array indexing',
        'O(log N) = Binary Search, balanced BST search (halves problem size each step)',
        'O(N log N) = MergeSort, QuickSort (average), HeapSort',
        'Recursion stack frames count toward Auxiliary Space Complexity',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Growth Curves: Operations vs. Input Size N',
      caption:
        'Comparison of execution operations: O(1) flatline, O(log N) gentle curve, O(N) linear, O(N log N), and exploding O(N²).',
      visualKey: 'dsa-big-o-curves-viz',
      details: {
        comparison: {
          headers: ['Complexity', 'N = 100', 'N = 10,000', 'N = 1,000,000', 'Feasible in 1s limit?'],
          rows: [
            ['O(1)', '1 op', '1 op', '1 op', 'Yes (~0.0001 ms)'],
            ['O(log N)', '~7 ops', '~14 ops', '~20 ops', 'Yes (~0.001 ms)'],
            ['O(N)', '100 ops', '10,000 ops', '1,000,000 ops', 'Yes (~1 ms)'],
            ['O(N log N)', '~664 ops', '~133,000 ops', '~20,000,000 ops', 'Yes (~25 ms)'],
            ['O(N²)', '10,000 ops', '100,000,000 ops', '10¹² ops (TIMEOUT!)', 'Fails for N > 10,000'],
          ],
        },
      },
    },
    animation: {
      type: 'dsa-big-o-interactive',
      title: 'Input Scaling & Curve Growth Animator',
      description:
        'Step through increasing N to watch O(N²) explode exponentially while O(N log N) remains flat and efficient.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Demonstrating O(1), O(N), and O(N²) in Python',
      language: 'python',
      code: `# O(1) Constant Time
def get_first(arr):
    return arr[0] if arr else None

# O(N) Linear Time (Single pass)
def find_max(arr):
    max_val = arr[0]
    for x in arr:
        if x > max_val: max_val = x
    return max_val

# O(N²) Quadratic Time (Nested loops)
def has_duplicate_pairs(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]: return True
    return False

nums = [3, 1, 4, 1, 5]
print("O(1):", get_first(nums))
print("O(N):", find_max(nums))
print("O(N²):", has_duplicate_pairs(nums))`,
      input: 'nums = [3, 1, 4, 1, 5]',
      output: 'O(1): 3 | O(N): 5 | O(N²): True',
      explanation:
        'Constant time executes 1 operation; linear time executes 5 operations; quadratic checks all 10 pairwise combinations.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following algorithm complexities is the most optimal for large N?',
        options: ['O(N log N)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 1,
        explanation: 'O(log N) grows far slower than linear O(N) or polynomial complexities, taking only ~30 operations for 1 billion items.',
      },
      {
        id: 'q2',
        question: 'What is the time complexity of an algorithm that halves the remaining search space on each step (e.g. Binary Search)?',
        options: ['O(N/2)', 'O(log N)', 'O(1)', 'O(N)'],
        correctIndex: 1,
        explanation: 'Repeatedly dividing problem size by 2 yields a logarithmic number of steps: log2(N).',
      },
      {
        id: 'q3',
        question: 'What is the space complexity of a recursive function that makes N sequential recursive calls down to a base case?',
        options: ['O(1)', 'O(N) due to call stack frames stored in thread memory', 'O(N²)', 'Zero memory'],
        correctIndex: 1,
        explanation: 'Each active method call allocates a stack frame on the call stack; N recursive frames consume O(N) auxiliary space.',
      },
    ],
  },
  {
    id: 'dsa-two-pointers',
    subject: 'dsa',
    category: 'Two Pointers',
    title: 'Two Pointers Technique',
    subtitle: 'Converging and Fast-Slow Pointers on Sequences',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Two Pointers', 'Sorted Array', 'Convergence', 'Fast and Slow', 'Floyd'],
    quickRecall: {
      oneLiner:
        'Maintains two pointer indices iterating across a sequence in coordination, eliminating nested loops from O(N²) down to O(N).',
      simpleAnalogy:
        'Measuring calipers analogy: To find two points in a sorted row whose sum equals a target, you place one finger at the smallest value (left) and one at the largest value (right). If the sum is too small, nudge your left finger forward. If too large, nudge your right finger back. They converge inward in one clean linear scan.',
      whenToUse:
        'Sorted arrays (Two Sum II, 3Sum, Container With Most Water, Trapping Rain Water) or linked list cycle detection (Fast/Slow pointers).',
      whyItMatters:
        'Replaces brute-force O(N²) nested loops with an optimal O(N) time and O(1) auxiliary space scan.',
      keyPoints: [
        'Opposite Direction (Converging): `left = 0, right = n - 1`. If `arr[l] + arr[r] < target` -> `left++`; if `> target` -> `right--`.',
        'Same Direction (Fast & Slow): `slow` tracks filtered position; `fast` scans forward (e.g. Remove Duplicates in-place).',
        'Cycle Detection (Floyd\'s Tortoise and Hare): `slow` moves 1 step; `fast` moves 2 steps. If they meet, a cycle exists.',
        'Array MUST be sorted for converging pointers to work deterministically.',
      ],
      formulaOrSyntax: {
        label: 'Two Pointers Template',
        codeOrLatex: 'int left = 0, right = arr.length - 1;\nwhile (left < right) {\n    int sum = arr[left] + arr[right];\n    if (sum == target) return new int[]{left, right};\n    else if (sum < target) left++;\n    else right--;\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(N) [Each pointer moves at most N times total]',
        space: 'O(1) auxiliary memory (in-place index tracking)',
      },
      commonMistakeOrTrap: {
        mistake: 'Applying converging two-pointers to an unsorted array.',
        fix: 'If the array is not sorted, advancing left or right has no predictable relationship to the sum; sort the array first O(N log N) or use a HashMap O(N).',
        interviewTrap:
          'Question: "How do you avoid duplicate triplets in 3Sum?" Answer: After finding a valid triplet, advance `left` and decrement `right` while skipping elements identical to their predecessors: `while (left < right && arr[left] == arr[left-1]) left++;`.',
      },
      examCheatsheet: [
        'Array must be sorted for opposite-direction pointers',
        'Fast/Slow pointers: Cycle detection, finding middle of linked list in 1 pass',
        'Time: O(N), Space: O(1)',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Inward Pointer Convergence on Sorted Array',
      caption:
        'Left pointer starts at index 0, right pointer starts at N-1. They step inward until Target Sum = 26 is found.',
      visualKey: 'dsa-two-pointers-viz',
      details: {
        comparison: {
          headers: ['Variant', 'Pointer Motion', 'Classic Problems', 'Pre-condition'],
          rows: [
            ['Opposite Ends', 'Left moves right, Right moves left', 'Two Sum II, Container With Most Water, 3Sum', 'Sorted Array'],
            ['Fast & Slow', 'Both move right at different speeds', 'Remove Duplicates, Move Zeroes, Middle of List', 'Sequence'],
            ['Tortoise & Hare', 'Slow moves 1 step, Fast moves 2 steps', 'Linked List Cycle, Find Duplicate Number', 'Linked List / State Graph'],
          ],
        },
      },
    },
    animation: {
      type: 'two-pointers-converge-interactive',
      title: 'Target Sum Inward Convergence Animator',
      description:
        'Watch Left and Right pointer boxes close in over the sorted array to locate target sum 26.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Two Sum II (Sorted Array) in Python',
      language: 'python',
      code: `def two_sum_sorted(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left, right] # Found indices!
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1 # Need smaller sum

    return []

# Sorted array
arr = [2, 7, 11, 15, 19, 24]
print("Indices for target 26:", two_sum_sorted(arr, 26))`,
      input: 'numbers = [2, 7, 11, 15, 19, 24], target = 26',
      output: 'Indices for target 26: [0, 5] (since 2 + 24 = 26)',
      explanation:
        'The pointers converge in linear O(N) time with zero extra memory allocation.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the required pre-condition for the converging Two Pointers technique to solve Two Sum?',
        options: [
          'The array must be sorted in ascending order',
          'The array must contain only positive integers',
          'The array length must be even',
          'The array must not contain duplicates',
        ],
        correctIndex: 0,
        explanation: 'Sorting ensures that incrementing `left` strictly increases the sum, and decrementing `right` strictly decreases the sum.',
      },
      {
        id: 'q2',
        question: 'In Floyd\'s Cycle Detection algorithm, how fast do the two pointers move?',
        options: [
          'Slow moves 1 step, Fast moves 2 steps per iteration',
          'Slow moves 2 steps, Fast moves 4 steps',
          'Both move 1 step in opposite directions',
          'Fast moves backward',
        ],
        correctIndex: 0,
        explanation: 'Moving the fast pointer at 2x speed relative to the slow pointer guarantees they will meet within the cycle in O(N) time.',
      },
      {
        id: 'q3',
        question: 'What is the auxiliary space complexity of the Two Pointers approach?',
        options: ['O(N)', 'O(1) constant space', 'O(log N)', 'O(N²)'],
        correctIndex: 1,
        explanation: 'Only two integer index variables are maintained, consuming strictly O(1) auxiliary memory.',
      },
    ],
  },
  {
    id: 'dsa-sliding-window',
    subject: 'dsa',
    category: 'Sliding Window',
    title: 'Sliding Window Technique',
    subtitle: 'Contiguous Subarray and Substring Optimization',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Sliding Window', 'Subarray', 'Substring', 'Two Pointers', 'Optimization'],
    quickRecall: {
      oneLiner:
        'Maintains a moving window `[left, right]` over contiguous sub-segments, reusing overlapping calculations to avoid recomputing from scratch.',
      simpleAnalogy:
        'Camera viewfinder pan analogy: Instead of printing photos of every possible 3-person grouping in a line of 100 people from scratch, you frame people 1-3. Then you slide your camera one step right: person #1 leaves your viewfinder, person #4 enters, and you update your count in O(1) time.',
      whenToUse:
        'Problems asking for minimum, maximum, or target properties over contiguous subarrays or substrings (e.g. Max Sum Subarray of size K, Longest Substring Without Repeating Characters).',
      whyItMatters:
        'Converts brute-force O(N·K) or O(N²) nested loops into a smooth single-pass O(N) linear time scan.',
      keyPoints: [
        'Fixed Window: Size K is constant. Add `arr[r]`, subtract `arr[r - K]` as window slides.',
        'Variable Window (Dynamic): Expand `right` to satisfy condition; shrink `left` when condition is violated.',
        'State tracking: Use a running sum, hash map (frequency map), or integer frequency array to track window contents in O(1).',
        'Contiguous requirement: Elements in the window must be strictly adjacent in the original sequence.',
      ],
      formulaOrSyntax: {
        label: 'Dynamic Sliding Window Template',
        codeOrLatex: 'int left = 0;\nfor (int right = 0; right < n; right++) {\n    // 1. Add arr[right] to window state\n    while (windowConditionViolated) {\n        // 2. Shrink window: remove arr[left], left++\n    }\n    // 3. Update global answer with valid window: right - left + 1\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(N) [Both left and right pointers increment at most N times total]',
        space: 'O(K) or O(1) for frequency map of alphabet characters (e.g. 128 ASCII slots)',
      },
      commonMistakeOrTrap: {
        mistake: 'Recalculating the entire window sum from scratch on every step: `sum = 0; for (i = left; i <= right; i++) sum += arr[i]`.',
        fix: 'Maintain running state: when window slides right, update `windowSum += arr[r] - arr[l]` in O(1) constant time.',
        interviewTrap:
          'Question: "Can you use sliding window to find a subarray with negative numbers summing to target K?" Answer: No! Negative numbers break monotonicity (expanding window can decrease sum, shrinking can increase sum). Solution: Use Prefix Sum with a HashMap!',
      },
      examCheatsheet: [
        'Window length = `right - left + 1`',
        'Fixed window: slide by adding right, subtracting left',
        'Variable window: expand right, contract left while invalid',
        'Fails with negative numbers for sum targets (use Prefix Sum instead)',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Sliding Window Expansion and Contraction',
      caption:
        'The window [left, right] expands rightward. When duplicate character is detected, left pointer contracts to restore validity.',
      visualKey: 'dsa-sliding-window-viz',
      details: {
        comparison: {
          headers: ['Type', 'Window Size', 'Expansion / Contraction', 'Typical Problem'],
          rows: [
            ['Fixed Window', 'Constant K', 'Slide 1 step right: add r, remove r-K', 'Maximum Sum Subarray of size K'],
            ['Variable Window (Max)', 'Dynamic', 'Expand r always, shrink l when invalid', 'Longest Substring Without Repeating Characters'],
            ['Variable Window (Min)', 'Dynamic', 'Expand r until valid, shrink l to minimize', 'Minimum Size Subarray Sum'],
          ],
        },
      },
    },
    animation: {
      type: 'sliding-window-interactive',
      title: 'Sliding Window Substring Scanner',
      description:
        'Watch a highlighted window expand right and contract left over characters to maintain uniqueness.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Longest Substring Without Repeating Characters in Python',
      language: 'python',
      code: `def length_of_longest_substring(s):
    char_index = {}
    max_len = 0
    left = 0

    for right, char in enumerate(s):
        # If character is already in window, jump left pointer past it
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1

        char_index[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len

text = "abcabcbb"
print("Longest unique substring length:", length_of_longest_substring(text))`,
      input: 's = "abcabcbb"',
      output: 'Longest unique substring length: 3 (Substrings like "abc")',
      explanation:
        'The window expands and contracts in linear O(N) time using the character index dictionary.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does the dynamic sliding window approach have an overall time complexity of O(N)?',
        options: [
          'Because the left pointer never moves',
          'Because each index is visited at most twice (once by right pointer, once by left pointer)',
          'Because it uses parallel computing',
          'Because it requires binary search',
        ],
        correctIndex: 1,
        explanation: 'Even with nested while loops, `left` and `right` only advance forward, guaranteeing at most 2N total pointer steps.',
      },
      {
        id: 'q2',
        question: 'What is the formula for the number of elements inside a 0-indexed window `[left, right]`?',
        options: ['right - left', 'right - left + 1', 'right + left', 'left - right'],
        correctIndex: 1,
        explanation: 'Both `left` and `right` are inclusive boundaries, so the count is `right - left + 1`.',
      },
      {
        id: 'q3',
        question: 'When does the standard sliding window technique FAIL to find a target sum subarray?',
        options: [
          'When all numbers are positive',
          'When the array contains negative numbers (destroying monotonicity)',
          'When the array contains zeroes',
          'When array length is odd',
        ],
        correctIndex: 1,
        explanation: 'Negative numbers allow expanding a window to decrease sum or contracting to increase sum, violating monotonicity.',
      },
    ],
  },
  {
    id: 'dsa-binary-search',
    subject: 'dsa',
    category: 'Binary Search',
    title: 'Binary Search & Monotonic Predicates',
    subtitle: 'Divide-and-Conquer on Sorted Domains & Binary Search on Answer',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Binary Search', 'Logarithmic', 'Overflow', 'Lower Bound', 'Upper Bound'],
    quickRecall: {
      oneLiner:
        'Divides search space in half at each step by comparing target with middle element: `mid = low + (high - low) / 2`, achieving O(log N) time.',
      simpleAnalogy:
        'Dictionary lookup analogy: To find the word "Mango", you don\'t start at page 1. You open to the middle (page 500: letter "M"). You see "Music" > "Mango", so you tear the entire second half of the book away. In just 10 page flips, a 1,000-page book is reduced to 1 page.',
      whenToUse:
        'Searching in sorted arrays, rotated sorted arrays, finding square roots, or "Binary Search on Answer" problems (e.g. Koko Eating Bananas).',
      whyItMatters:
        'Searches 4 billion elements (2³²) in just 32 comparisons.',
      keyPoints: [
        'Boundary Rule: `while (low <= high)` -> `mid = low + (high - low) / 2`.',
        'Avoid Integer Overflow: Never write `(low + high) / 2`; if both are large integers, their sum exceeds `Integer.MAX_VALUE` and goes negative!',
        'Lower Bound: First index where `arr[i] >= target`; Upper Bound: First index where `arr[i] > target`.',
        'Monotonic Condition: Any domain where a boolean condition changes from `False, False...` to `True, True...` can be binary searched!',
      ],
      formulaOrSyntax: {
        label: 'Safe Midpoint Calculation',
        codeOrLatex: 'int mid = low + (high - low) / 2; // Prevents 32-bit signed integer overflow',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(log N) worst and average case | O(1) best case (found at root mid)',
        space: 'Iterative: O(1) auxiliary space | Recursive: O(log N) call stack',
      },
      commonMistakeOrTrap: {
        mistake: 'Writing `int mid = (low + high) / 2;`.',
        fix: 'If `low` and `high` are both 1.5 billion, their sum is 3.0 billion, which overflows signed 32-bit int to negative, crashing array access with `ArrayIndexOutOfBoundsException`.',
        interviewTrap:
          'Question: "When should the loop terminate with `while (low <= high)` vs `while (low < high)`?" Answer: Use `low <= high` when searching for exact element match and adjusting `low = mid + 1, high = mid - 1`. Use `low < high` for lower/upper bound and binary search on answer where the answer is shrunk into `low == high`.',
      },
      examCheatsheet: [
        'Halves search space each step: log2(1,000,000) ≈ 20 iterations',
        'Always write `low + (high - low) / 2` to prevent integer overflow',
        'Can be applied to any monotonic function, not just sorted arrays',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Search Interval Halving [low, mid, high]',
      caption:
        'Target 23 is compared with mid (18). Since 18 < 23, left half [3..18] is eliminated, narrowing interval from 9 to 4 elements.',
      visualKey: 'dsa-binary-search-viz',
      details: {
        comparison: {
          headers: ['Step', 'Search Window [low, high]', 'mid Index (Value)', 'Comparison vs Target (23)', 'Action'],
          rows: [
            ['Step 1', '[0, 8] (9 elements)', 'mid = 4 (Value: 18)', '18 < 23', 'Search Right: low = 5'],
            ['Step 2', '[5, 8] (4 elements)', 'mid = 6 (Value: 29)', '29 > 23', 'Search Left: high = 5'],
            ['Step 3', '[5, 5] (1 element)', 'mid = 5 (Value: 23)', '23 == 23', 'Match Found! Return index 5'],
          ],
        },
      },
    },
    animation: {
      type: 'binary-search-shrink-interactive',
      title: 'Active Search Window Shrinkage Animator',
      description:
        'Watch the active search window highlight while discarded half-intervals fade out.',
      stepsTotal: 3,
    },
    codeSnippet: {
      title: 'Binary Search Implementation in Python',
      language: 'python',
      code: `def binary_search(nums, target):
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid # Target found!
        elif nums[mid] < target:
            low = mid + 1  # Discard left half
        else:
            high = mid - 1 # Discard right half

    return -1 # Not found

sorted_arr = [3, 7, 11, 14, 18, 23, 29, 35, 42]
print("Index of 23:", binary_search(sorted_arr, 23)) # 5
print("Index of 99:", binary_search(sorted_arr, 99)) # -1`,
      input: 'sorted_arr = [3, 7, 11, 14, 18, 23, 29, 35, 42], target = 23',
      output: 'Index of 23: 5 | Index of 99: -1',
      explanation:
        'The search narrows down from 9 elements to the target index 5 in only 3 comparisons.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why should midpoint be calculated as `low + (high - low) / 2` instead of `(low + high) / 2`?',
        options: [
          'It is faster on the CPU',
          'It prevents integer overflow when low + high exceeds the maximum 32-bit signed integer value',
          'It rounds up instead of down',
          'It works on floating-point numbers',
        ],
        correctIndex: 1,
        explanation: 'In languages with fixed-width integers, `low + high` can overflow to a negative number, causing an index crash.',
      },
      {
        id: 'q2',
        question: 'How many maximum comparisons does Binary Search take on an array of 1,000,000 sorted elements?',
        options: ['1,000,000', '500,000', '~20 comparisons', '10,000'],
        correctIndex: 2,
        explanation: 'Because 2²⁰ = 1,048,576 > 1,000,000, halving the array takes at most 20 comparisons.',
      },
      {
        id: 'q3',
        question: 'Can Binary Search be applied to an unsorted array?',
        options: [
          'Yes, if using randomized binary search',
          'No, binary search strictly requires a sorted or monotonic domain to decide which half to eliminate',
          'Yes, if elements are distinct',
          'Only in Python',
        ],
        correctIndex: 1,
        explanation: 'Without monotonic order, comparing with `mid` gives no information about which half contains the target.',
      },
    ],
  },
  {
    id: 'dsa-sorting-quick-merge',
    subject: 'dsa',
    category: 'Sorting Algorithms',
    title: 'QuickSort vs. MergeSort',
    subtitle: 'Divide-and-Conquer: In-Place Partitioning vs. Stable Merging',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Sorting', 'QuickSort', 'MergeSort', 'Divide and Conquer', 'Stability'],
    quickRecall: {
      oneLiner:
        'MergeSort divides into halves and merges in stable O(N log N) time with O(N) space; QuickSort partitions around a pivot in-place with average O(N log N) and O(1) auxiliary space.',
      simpleAnalogy:
        'Classifying test papers analogy: MergeSort splits a stack of 100 tests into two stacks of 50, recursively splits down to individual papers, and neatly merges sorted pairs (guaranteed speed, but needs an extra table to merge). QuickSort picks a middle grade (pivot) and rapidly shuffles papers into "lower than pivot" and "higher than pivot" piles right on the same desk (in-place).',
      whenToUse:
        'Use MergeSort when stability is required or sorting linked lists/external files; use QuickSort (or Dual-Pivot QuickSort) for fast in-memory array sorting.',
      whyItMatters:
        'Standard library sorting algorithms (Java `Arrays.sort` uses Dual-Pivot QuickSort for primitives, Timsort/MergeSort for objects).',
      keyPoints: [
        'MergeSort: Divide (split at mid) -> Conquer (recursively sort) -> Combine (linear merge). Guaranteed O(N log N) worst-case.',
        'QuickSort: Partition array around pivot so elements < pivot are left, > pivot are right. Worst-case O(N²) if pivot is worst choice (sorted array with first/last pivot).',
        'Stability: MergeSort is Stable (preserves relative order of equal keys); standard QuickSort is Unstable.',
        'Pivot Selection: Randomized pivot or Median-of-Three prevents O(N²) worst-case degradation.',
      ],
      formulaOrSyntax: {
        label: 'Recurrence Relations',
        codeOrLatex: 'T_{\\text{Merge}}(N) = 2T(N/2) + O(N) \\implies O(N \\log N), \\quad T_{\\text{Quick}}(N) = T(k) + T(N - k - 1) + O(N)',
        isLatex: true,
      },
      complexity: {
        time: 'MergeSort: O(N log N) always | QuickSort: O(N log N) avg, O(N²) worst-case',
        space: 'MergeSort: O(N) auxiliary array space | QuickSort: O(log N) stack recursion space',
      },
      commonMistakeOrTrap: {
        mistake: 'Picking the first or last element as the pivot in QuickSort on already sorted data.',
        fix: 'Causes worst-case O(N²) recursion tree of depth N; always pick a random pivot or median-of-three.',
        interviewTrap:
          'Question: "Why does Java use Dual-Pivot QuickSort for primitives, but Timsort (MergeSort derivative) for Objects?" Answer: Object sorting requires STABILITY (e.g. sorting students by name, then by grade must keep name ordering intact). Primitives have no identity beyond their value, so stability is irrelevant and in-place QuickSort is faster.',
      },
      examCheatsheet: [
        'MergeSort is STABLE and guaranteed O(N log N), but needs O(N) extra space',
        'QuickSort is IN-PLACE and UNSTABLE with O(N log N) average time',
        'Java uses QuickSort for primitives and Timsort (MergeSort) for Objects',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'QuickSort vs MergeSort Architecture Comparison',
      caption:
        'Detailed comparison of time bounds, auxiliary space, stability, and typical library implementations.',
      visualKey: 'dsa-sorting-quick-merge-viz',
      details: {
        comparison: {
          headers: ['Metric', 'MergeSort', 'QuickSort'],
          rows: [
            ['Best Time', 'O(N log N)', 'O(N log N)'],
            ['Average Time', 'O(N log N)', 'O(N log N) (Faster constant factor)'],
            ['Worst Time', 'O(N log N) Guaranteed', 'O(N²) (When bad pivots are chosen)'],
            ['Auxiliary Space', 'O(N) (Requires merge buffer)', 'O(log N) (In-place partition + recursion stack)'],
            ['Stable Sorting?', 'Yes (Preserves equal keys)', 'No (Swaps cross over equal keys)'],
          ],
        },
      },
    },
    animation: {
      type: 'sorting-partition-interactive',
      title: 'Lomuto Partition & Pivot Swapping Simulator',
      description:
        'Watch elements partition around the pivot element into smaller and larger subarrays.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'In-Place QuickSort in Python',
      language: 'python',
      code: `def quicksort(arr, low, high):
    if low < high:
        # Partition array around pivot
        pivot_idx = partition(arr, low, high)
        quicksort(arr, low, pivot_idx - 1)
        quicksort(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high] # Lomuto partition scheme
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i] # Swap smaller to left
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

nums = [29, 10, 14, 37, 13]
quicksort(nums, 0, len(nums) - 1)
print("Sorted Array:", nums)`,
      input: 'nums = [29, 10, 14, 37, 13]',
      output: 'Sorted Array: [10, 13, 14, 29, 37]',
      explanation:
        'Lomuto partition places elements <= pivot to the left, sorting the array in-place without auxiliary arrays.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the primary advantage of MergeSort over QuickSort?',
        options: [
          'MergeSort uses O(1) space',
          'MergeSort guarantees O(N log N) time in all cases and is a stable sort',
          'MergeSort is faster on primitives',
          'MergeSort does not use recursion',
        ],
        correctIndex: 1,
        explanation: 'MergeSort is immune to O(N²) worst-case input degradation and guarantees stability.',
      },
      {
        id: 'q2',
        question: 'Why is QuickSort typically preferred over MergeSort for sorting in-memory primitive arrays?',
        options: [
          'It is stable',
          'It sorts in-place with O(1) extra array memory and exhibits superior cache locality',
          'It is guaranteed O(N)',
          'It does not compare elements',
        ],
        correctIndex: 1,
        explanation: 'QuickSort does not allocate extra O(N) buffers, reducing memory allocations and utilizing CPU cache lines efficiently.',
      },
      {
        id: 'q3',
        question: 'What causes standard QuickSort to hit its worst-case O(N²) time complexity?',
        options: [
          'When all elements are negative',
          'When the chosen pivot is consistently the smallest or largest element (e.g. sorted array with first element pivot)',
          'When array size is a power of 2',
          'When memory is exhausted',
        ],
        correctIndex: 1,
        explanation: 'Unbalanced partitions of sizes 0 and N-1 lead to recursion tree depth N, resulting in O(N²) total comparisons.',
      },
    ],
  },
  {
    id: 'dsa-linked-lists',
    subject: 'dsa',
    category: 'Linked Lists',
    title: 'Linked Lists & In-Place Reversal',
    subtitle: 'Node Pointers, Pointer Manipulation & Floyd\'s Cycle Detection',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Linked List', 'Pointers', 'Reversal', 'Cycle Detection', 'Sentinel Node'],
    quickRecall: {
      oneLiner:
        'A linear sequence of node objects where each node contains data and a pointer reference to the next node; reversal is achieved by flipping pointer arrows in-place.',
      simpleAnalogy:
        'Scavenger hunt clue cards analogy: Each player holds a clue card pointing to the location of the next clue card. Reversing the scavenger hunt in-place means having each card change its pointer to point back to where you just came from.',
      whenToUse:
        'Dynamic size collections requiring constant-time O(1) insertions/deletions at the head without memory reallocations.',
      whyItMatters:
        'Pointer manipulation is the quintessential coding interview topic; tests ability to handle memory references without null pointer crashes.',
      keyPoints: [
        'In-place Reversal: Maintain 3 pointers (`prev = null, curr = head, next = null`). At each step: `next = curr.next; curr.next = prev; prev = curr; curr = next;`.',
        'Sentinel / Dummy Node: `ListNode dummy = new ListNode(0); dummy.next = head;` eliminates edge cases for head deletions and insertions.',
        'Fast and Slow Pointers: Finding the middle of a linked list in 1 pass (fast moves 2 steps, slow moves 1 step).',
        'Cycle Detection (Floyd\'s Algorithm): If fast catches up to slow (`slow == fast`), a loop exists.',
      ],
      formulaOrSyntax: {
        label: 'Three-Pointer Reversal Loop',
        codeOrLatex: 'ListNode prev = null, curr = head;\nwhile (curr != null) {\n    ListNode nextNode = curr.next; // 1. Save next\n    curr.next = prev;              // 2. Reverse arrow\n    prev = curr;                   // 3. Step prev forward\n    curr = nextNode;               // 4. Step curr forward\n}\nreturn prev; // New head',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(N) single pass through all nodes',
        space: 'O(1) auxiliary memory (pointer variables only)',
      },
      commonMistakeOrTrap: {
        mistake: 'Reassigning `curr.next = prev` before saving `curr.next` to a temporary variable.',
        fix: 'Overwriting `curr.next` first orphans the rest of the linked list, causing permanent reference loss and null pointer exceptions.',
        interviewTrap:
          'Question: "How do you find the starting node of a cycle?" Answer: When slow and fast meet, reset `slow` to `head`. Move both `slow` and `fast` at 1 step per iteration. The node where they meet again is the exact entrance to the cycle!',
      },
      examCheatsheet: [
        'Reversal requires 3 pointers: `prev`, `curr`, `next`',
        'Always use a dummy head node to simplify boundary insertions/deletions',
        'Fast pointer moving 2 steps and slow pointer moving 1 step finds the middle node',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'In-Place Pointer Arrow Reversal Step Trace',
      caption:
        'Step-by-step trace showing Node(1).next pointing to null, Node(2).next pointing to Node(1), up to Node(4).',
      visualKey: 'dsa-linked-list-viz',
      details: {
        comparison: {
          headers: ['Step', 'prev', 'curr', 'curr.next Points To', 'Action'],
          rows: [
            ['Init', 'null', 'Node(1)', 'Node(2)', 'Save next=Node(2), flip Node(1).next to null'],
            ['Step 1', 'Node(1)', 'Node(2)', 'Node(3)', 'Save next=Node(3), flip Node(2).next to Node(1)'],
            ['Step 2', 'Node(2)', 'Node(3)', 'Node(4)', 'Save next=Node(4), flip Node(3).next to Node(2)'],
            ['Step 3', 'Node(3)', 'Node(4)', 'null', 'Flip Node(4).next to Node(3). Return Node(4) as new Head'],
          ],
        },
      },
    },
    animation: {
      type: 'linked-list-pointer-interactive',
      title: 'In-Place Pointer Reversal Animator',
      description:
        'Watch pointer arrows detach and flip backwards one node at a time.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'In-Place Linked List Reversal in Python',
      language: 'python',
      code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next  # 1. Save next
        curr.next = prev       # 2. Reverse pointer
        prev = curr            # 3. Advance prev
        curr = next_node       # 4. Advance curr
    return prev # New head

# Create: 1 -> 2 -> 3 -> None
head = ListNode(1, ListNode(2, ListNode(3)))
new_head = reverse_list(head)

# Print reversed: 3 -> 2 -> 1
res = []
while new_head:
    res.append(str(new_head.val))
    new_head = new_head.next
print("Reversed List:", " -> ".join(res))`,
      input: '1 -> 2 -> 3 -> None',
      output: 'Reversed List: 3 -> 2 -> 1',
      explanation:
        'Reverses pointers in-place in O(N) time and O(1) space without allocating new nodes.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why is a dummy (sentinel) node commonly used in linked list problems?',
        options: [
          'It speeds up pointer traversal',
          'It eliminates special-case logic for inserting or deleting the head node',
          'It prevents cycles',
          'It sorts the list',
        ],
        correctIndex: 1,
        explanation: 'A dummy node points to `head`, ensuring that operations on the first element follow the exact same code pattern as internal nodes.',
      },
      {
        id: 'q2',
        question: 'What is the auxiliary space complexity of reversing a linked list iteratively?',
        options: ['O(N)', 'O(1) constant auxiliary space', 'O(log N)', 'O(N²)'],
        correctIndex: 1,
        explanation: 'Iterative reversal only reassigns pointer links using three variable references, requiring zero extra heap memory.',
      },
      {
        id: 'q3',
        question: 'In Floyd\'s cycle detection, if `fast == null || fast.next == null`, what does it conclude?',
        options: ['The list has a cycle', 'The list is strictly acyclic (terminates at null)', 'The list is empty', 'The list is sorted'],
        correctIndex: 1,
        explanation: 'Reaching a null terminator proves the linked list is finite and contains no circular loops.',
      },
    ],
  },
  {
    id: 'dsa-stack-monotonic',
    subject: 'dsa',
    category: 'Stacks and Queues',
    title: 'Monotonic Stack & Valid Parentheses',
    subtitle: 'LIFO Execution, Next Greater Element & Histogram Areas',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Stack', 'Monotonic Stack', 'LIFO', 'Next Greater Element', 'Parentheses'],
    quickRecall: {
      oneLiner:
        'A Monotonic Stack maintains elements in strictly increasing or decreasing order, solving "Next Greater / Smaller Element" problems in linear O(N) time.',
      simpleAnalogy:
        'Line of sight / Shadow analogy: Imagine people standing in a row looking forward. A very tall person completely blocks the view of shorter people behind them. As the tall person enters, shorter people are "popped" off because the tall person is the "Next Greater Element" for all of them.',
      whenToUse:
        'Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram, Trapping Rain Water, Parentheses balancing.',
      whyItMatters:
        'Replaces O(N²) nested loops searching forward for boundaries with an optimal O(N) single-pass stack algorithm.',
      keyPoints: [
        'Monotonic Decreasing Stack: Stores elements in decreasing order. When a larger element arrives, pop smaller elements (found their next greater element!).',
        'Amortized O(N) Time: Every element is pushed onto the stack exactly once and popped at most once.',
        'Index vs Value: Push INDICES onto the stack rather than values so you can compute widths/distances (`right - left - 1`).',
        'Valid Parentheses: Push opening brackets `({[`; pop and verify match when encountering closing brackets `)}]`.',
      ],
      formulaOrSyntax: {
        label: 'Next Greater Element Monotonic Stack Template',
        codeOrLatex: 'Stack<Integer> stack = new Stack<>();\nfor (int i = 0; i < n; i++) {\n    while (!stack.isEmpty() && arr[i] > arr[stack.peek()]) {\n        int prevIdx = stack.pop();\n        nge[prevIdx] = arr[i]; // arr[i] is the next greater element!\n    }\n    stack.push(i);\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(N) amortized [Each element is pushed once and popped at most once]',
        space: 'O(N) auxiliary space for the stack',
      },
      commonMistakeOrTrap: {
        mistake: 'Pushing values instead of indices when solving distance-dependent problems.',
        fix: 'Pushing array index `i` allows both accessing `arr[i]` and calculating span width `currentIdx - prevIdx`.',
        interviewTrap:
          'Question: "Why is the time complexity O(N) even though there is a while loop inside a for loop?" Answer: Amortized analysis! The while loop can only pop elements that were previously pushed; across the entire algorithm, there can be at most N total pops and N total pushes.',
      },
      examCheatsheet: [
        'Monotonic stack runs in amortized O(N) time',
        'Store indices on stack to compute widths and distances',
        'Next Greater Element -> Monotonic Decreasing Stack',
        'Next Smaller Element -> Monotonic Increasing Stack',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Monotonic Decreasing Stack State Transitions',
      caption:
        'Incoming elements larger than stack top trigger pop operations, resolving Next Greater Element in O(N) time.',
      visualKey: 'dsa-stack-monotonic-viz',
      details: {
        comparison: {
          headers: ['Step', 'Incoming Element', 'Stack Before', 'Action', 'Stack After'],
          rows: [
            ['1', '73', '[]', 'Push 73', '[73]'],
            ['2', '74', '[73]', '74 > 73: Pop 73 (NGE of 73 is 74!), Push 74', '[74]'],
            ['3', '75', '[74]', '75 > 74: Pop 74 (NGE of 74 is 75!), Push 75', '[75]'],
            ['4', '71', '[75]', '71 < 75: Push 71', '[75, 71]'],
            ['5', '69', '[75, 71]', '69 < 71: Push 69', '[75, 71, 69]'],
            ['6', '72', '[75, 71, 69]', '72 > 69 & 71: Pop 69, Pop 71, Push 72', '[75, 72]'],
          ],
        },
      },
    },
    animation: {
      type: 'monotonic-stack-push-pop-interactive',
      title: 'Monotonic Stack Push / Pop Visualizer',
      description:
        'Watch elements push and pop to preserve monotonic order and resolve Next Greater Element.',
      stepsTotal: 6,
    },
    codeSnippet: {
      title: 'Next Greater Element in Python (Monotonic Stack)',
      language: 'python',
      code: `def next_greater_element(nums):
    n = len(nums)
    res = [-1] * n
    stack = [] # Stores indices

    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            prev_idx = stack.pop()
            res[prev_idx] = nums[i]
        stack.append(i)

    return res

temperatures = [73, 74, 75, 71, 69, 72]
print("Next Greater Elements:", next_greater_element(temperatures))`,
      input: 'temperatures = [73, 74, 75, 71, 69, 72]',
      output: 'Next Greater Elements: [74, 75, -1, 72, 72, -1]',
      explanation:
        'Each index is pushed and popped at most once, resolving next greater values in optimal O(N) time.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why is a Monotonic Stack algorithm overall O(N) time despite having a nested while loop inside a for loop?',
        options: [
          'Because the while loop only runs for odd numbers',
          'Because every element is pushed onto the stack once and popped at most once across the entire algorithm',
          'Because the stack uses binary search',
          'Because it uses O(1) memory',
        ],
        correctIndex: 1,
        explanation: 'Amortized analysis guarantees that the total number of stack pop operations across the entire run cannot exceed N.',
      },
      {
        id: 'q2',
        question: 'To find the "Next Greater Element", which type of monotonic stack should you maintain?',
        options: [
          'Monotonic Increasing Stack',
          'Monotonic Decreasing Stack (so a larger incoming element pops smaller ones)',
          'FIFO Queue',
          'Binary Heap',
        ],
        correctIndex: 1,
        explanation: 'A decreasing stack keeps smaller elements waiting until a strictly larger element arrives to pop them and claim the answer.',
      },
      {
        id: 'q3',
        question: 'What data should typically be stored inside a monotonic stack for histogram problems?',
        options: ['Only the values', 'Indices of elements (allowing both value access and distance calculation)', 'The sum of elements', 'Character strings'],
        correctIndex: 1,
        explanation: 'Storing indices allows calculating both element value `arr[idx]` and distance/width `currentIndex - poppedIndex`.',
      },
    ],
  },
  {
    id: 'dsa-trees-bst',
    subject: 'dsa',
    category: 'Trees and BST',
    title: 'Trees, BST & Traversals',
    subtitle: 'Binary Search Tree Invariants, DFS Traversals & Level-Order BFS',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Tree', 'BST', 'Inorder', 'Preorder', 'Postorder', 'BFS'],
    quickRecall: {
      oneLiner:
        'A Binary Search Tree (BST) maintains the invariant: `left.val < node.val < right.val` for every node; Inorder traversal visits nodes in strictly sorted ascending order.',
      simpleAnalogy:
        'Company org chart analogy: The CEO is the root node. Everyone in the left division handles lower-budget projects (`left < root`); everyone in the right division handles higher-budget projects (`right > root`). Searching for a specific budget cut eliminates an entire division at every step.',
      whenToUse:
        'Hierarchical data representation, fast dynamic search/insert/delete operations in sorted data, priority systems.',
      whyItMatters:
        'Balanced BSTs (AVL, Red-Black) guarantee O(log N) operations; Inorder traversal yields sorted output in linear O(N) time.',
      keyPoints: [
        'BST Invariant: For every node X, all values in X.left are < X.val, and all values in X.right are > X.val.',
        'DFS Traversals: Preorder (Root, Left, Right), Inorder (Left, Root, Right -> SORTED!), Postorder (Left, Right, Root).',
        'BFS (Level-Order): Uses a Queue to visit nodes level-by-level.',
        'Degeneration: Unbalanced BST on sorted input degenerates into a linked list with O(N) lookup; self-balancing trees (AVL/Red-Black) maintain O(log N).',
      ],
      formulaOrSyntax: {
        label: 'Inorder Traversal (Sorted Output)',
        codeOrLatex: 'void inorder(TreeNode root) {\n    if (root == null) return;\n    inorder(root.left);       // 1. Visit Left\n    System.out.print(root.val); // 2. Visit Node (Sorted!)\n    inorder(root.right);      // 3. Visit Right\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Search / Insert: Balanced BST O(log N) | Degenerate BST O(N) | Traversal: O(N)',
        space: 'O(H) recursion stack space, where H is tree height (H = log N balanced, H = N skewed)',
      },
      commonMistakeOrTrap: {
        mistake: 'Validating a BST by only checking if `node.val > node.left.val` and `node.val < node.right.val` locally.',
        fix: 'A node must be greater than ALL nodes in its left subtree, not just its immediate child! Pass valid ranges `[min, max]` down the recursion: `isValidBST(root, min, max)`.',
        interviewTrap:
          'Question: "Can you reconstruct a unique binary tree from Inorder and Preorder traversals?" Answer: Yes, provided values are unique! Preorder gives the root node; Inorder splits that root into left and right subtrees.',
      },
      examCheatsheet: [
        'Inorder traversal of a BST ALWAYS produces sorted ascending order',
        'Level-order traversal uses a Queue (BFS)',
        'Balanced BST operations take O(log N); skewed BST degrades to O(N)',
        'Validate BST using recursive bounds: `isValid(node, min, max)`',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'BST Invariant and Traversal Orders',
      caption:
        'Root 4 splits smaller keys [2, 3] left and larger keys [6, 7] right. Inorder traversal yields: 2, 3, 4, 6, 7.',
      visualKey: 'dsa-trees-bst-viz',
      details: {
        comparison: {
          headers: ['Traversal Order', 'Sequence Pattern', 'Primary Use Case'],
          rows: [
            ['Inorder (DFS)', 'Left -> Root -> Right', 'Retrieves BST elements in strictly sorted order'],
            ['Preorder (DFS)', 'Root -> Left -> Right', 'Serializing / cloning tree structures'],
            ['Postorder (DFS)', 'Left -> Right -> Root', 'Bottom-up deletion, calculating tree height/size'],
            ['Level-Order (BFS)', 'Top-to-bottom, Left-to-right (Queue)', 'Finding shortest path, level-by-level printing'],
          ],
        },
      },
    },
    animation: {
      type: 'tree-traversal-interactive',
      title: 'BST Traversal Node Lighting Simulator',
      description:
        'Watch nodes light up in sequence during Inorder vs Level-Order BFS traversal.',
      stepsTotal: 5,
    },
    codeSnippet: {
      title: 'Validate Binary Search Tree in Python',
      language: 'python',
      code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root:
        return True
    # Invariant violation check
    if not (min_val < root.val < max_val):
        return False
    # Left subtree must be < root.val; Right must be > root.val
    return (is_valid_bst(root.left, min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))

# Tree: 4 -> left: 2, right: 6
root = TreeNode(4, TreeNode(2), TreeNode(6))
print("Is Valid BST?", is_valid_bst(root)) # True`,
      input: 'BST with root=4, left=2, right=6',
      output: 'Is Valid BST? True',
      explanation:
        'Validates that all nodes adhere to the global range constraints [min_val, max_val] in O(N) time.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which tree traversal visits the nodes of a Binary Search Tree in strictly sorted ascending order?',
        options: ['Preorder', 'Inorder (Left -> Root -> Right)', 'Postorder', 'Level-order'],
        correctIndex: 1,
        explanation: 'Inorder traversal processes the smaller left subtree, then the root, then the larger right subtree, yielding sorted values.',
      },
      {
        id: 'q2',
        question: 'What is the worst-case search time complexity of an un-balanced BST?',
        options: ['O(log N)', 'O(N) when it degenerates into a skewed linked list', 'O(1)', 'O(N log N)'],
        correctIndex: 1,
        explanation: 'Inserting already-sorted keys into an un-balanced BST creates a single linear chain of height N, degrading lookup to O(N).',
      },
      {
        id: 'q3',
        question: 'What data structure is used to implement Level-Order (BFS) traversal of a tree?',
        options: ['LIFO Stack', 'FIFO Queue', 'Priority Queue', 'Disjoint Set'],
        correctIndex: 1,
        explanation: 'A Queue maintains first-in, first-out ordering, dequeuing parent nodes and enqueuing their left and right children level-by-level.',
      },
    ],
  },
  {
    id: 'dsa-binary-heap',
    subject: 'dsa',
    category: 'Heaps and Priority Queues',
    title: 'Binary Heap & Priority Queue',
    subtitle: 'Complete Binary Trees, Array Representation & Heapify',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Heap', 'PriorityQueue', 'MinHeap', 'MaxHeap', 'Heapify', 'Top-K'],
    quickRecall: {
      oneLiner:
        'A Binary Heap is a complete binary tree packed into a 0-indexed array where `parent <= children` (Min-Heap), offering O(1) peek and O(log N) insert/extract.',
      simpleAnalogy:
        'Hospital emergency room triage analogy: Patients don\'t get treated strictly by arrival order (regular queue); the patient with the highest medical priority jumps directly to the front (root of the heap). Extracting the top patient takes O(log N) to re-triage the next highest-priority patient.',
      whenToUse:
        'Top-K elements, finding median in a data stream, Dijkstra\'s shortest path, Prim\'s MST, Merge K Sorted Lists.',
      whyItMatters:
        'Enables O(1) constant-time access to the absolute minimum or maximum element in dynamic data collections.',
      keyPoints: [
        'Array Representation (0-indexed): For node at index `i`: `left = 2*i + 1`, `right = 2*i + 2`, `parent = (i - 1) / 2`. Zero pointer memory overhead!',
        'Min-Heap Invariant: Every parent node is smaller than or equal to its children (`heap[parent] <= heap[child]`).',
        'Insert (`offer`): Add to end of array, bubble up (sift-up) in O(log N).',
        'Extract (`poll`): Swap root with last element, delete last, sift-down from root in O(log N).',
        'Build Heap (Heapify): Bottom-up sift-down on unsorted array runs in O(N) linear time, NOT O(N log N)!',
      ],
      formulaOrSyntax: {
        label: 'Array Index Formulas (0-Indexed)',
        codeOrLatex: 'parent = (i - 1) / 2;\nleftChild  = 2 * i + 1;\nrightChild = 2 * i + 2;',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'Peek: O(1) | Insert: O(log N) | Extract-Min: O(log N) | Build-Heap: O(N)',
        space: 'O(N) stored compactly in a single contiguous array',
      },
      commonMistakeOrTrap: {
        mistake: 'Assuming `PriorityQueue` in Java is a Max-Heap by default.',
        fix: 'Java\'s `PriorityQueue` is a MIN-HEAP by default! For a Max-Heap, pass a reverse comparator: `new PriorityQueue<>(Collections.reverseOrder())`.',
        interviewTrap:
          'Question: "To find the K largest elements in a stream of 1 billion numbers, should you use a Min-Heap of size K or Max-Heap of size K?" Answer: A MIN-HEAP of size K! The top of the min-heap holds the smallest of the top-K elements; if incoming number > min-heap root, pop and push.',
      },
      examCheatsheet: [
        'Binary heap is represented as a compact array without node pointers',
        'Peek root is O(1); Insert and Extract are O(log N)',
        'Building a heap from raw array (heapify) is O(N) linear time',
        'Find K Largest -> maintain a Min-Heap of size K',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Complete Tree vs. Compact Array Representation',
      caption:
        'Binary heap tree mapped directly into array indices [0..5] using formula 2*i+1 and 2*i+2.',
      visualKey: 'dsa-binary-heap-viz',
      details: {
        comparison: {
          headers: ['Index i', 'Node Value', 'Left Child (2*i + 1)', 'Right Child (2*i + 2)', 'Parent ((i - 1) / 2)'],
          rows: [
            ['0 (Root)', '3', 'Index 1 (Value: 7)', 'Index 2 (Value: 9)', 'None'],
            ['1', '7', 'Index 3 (Value: 12)', 'Index 4 (Value: 15)', 'Index 0 (Value: 3)'],
            ['2', '9', 'Index 5 (Value: 20)', 'None', 'Index 0 (Value: 3)'],
          ],
        },
      },
    },
    animation: {
      type: 'binary-heap-interactive',
      title: 'Heapify Sift-Down & Extraction Animator',
      description:
        'Watch root element extracted, last element swapped to top, and sifted down to restore heap property.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Top-K Largest Elements using Min-Heap in Python',
      language: 'python',
      code: `import heapq

def find_k_largest(nums, k):
    # Maintain a min-heap of size K
    min_heap = []
    for x in nums:
        heapq.heappush(min_heap, x)
        if len(min_heap) > k:
            heapq.heappop(min_heap) # Evicts smallest element

    return sorted(min_heap, reverse=True)

data = [3, 2, 1, 5, 6, 4]
print("Top 2 Largest:", find_k_largest(data, 2)) # [6, 5]`,
      input: 'data = [3, 2, 1, 5, 6, 4], k = 2',
      output: 'Top 2 Largest: [6, 5]',
      explanation:
        'A Min-Heap of size K retains only the K largest elements in O(N log K) time and O(K) space.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the time complexity of building a Binary Heap from an unsorted array of N elements (heapify)?',
        options: ['O(N log N)', 'O(N) linear time', 'O(N²)', 'O(1)'],
        correctIndex: 1,
        explanation: 'Bottom-up heapification computes a convergent mathematical series that sums to strictly O(N) time.',
      },
      {
        id: 'q2',
        question: 'For a node at index `i` in a 0-indexed binary heap array, what is the formula for its left child?',
        options: ['2 * i', '2 * i + 1', '2 * i + 2', 'i / 2'],
        correctIndex: 1,
        explanation: 'In 0-indexed complete binary trees, `leftChild = 2*i + 1` and `rightChild = 2*i + 2`.',
      },
      {
        id: 'q3',
        question: 'To find the Kth largest element in a massive array, why is a Min-Heap of size K optimal?',
        options: [
          'Because the root of the Min-Heap stores the minimum of the K largest elements, allowing O(1) eviction of smaller numbers',
          'Because Min-Heaps are faster to sort than Max-Heaps',
          'Because Python does not support Max-Heaps',
          'Because it avoids recursion',
        ],
        correctIndex: 0,
        explanation: 'Holding K elements in a Min-Heap ensures the top element is always the threshold cutoff for the top K.',
      },
    ],
  },
  {
    id: 'dsa-graphs-bfs-dfs',
    subject: 'dsa',
    category: 'Graphs: BFS and DFS',
    title: 'Graph Traversals: BFS vs. DFS',
    subtitle: 'Queue Shortest Path vs. Recursive Call Stack Deep Dive',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Graph', 'BFS', 'DFS', 'Adjacency List', 'Queue', 'Connected Components'],
    quickRecall: {
      oneLiner:
        'BFS uses a Queue to explore graph nodes level-by-level (guaranteeing shortest path in unweighted graphs); DFS uses Recursion/Stack to explore deeply along branches until reaching dead ends.',
      simpleAnalogy:
        'Water ripple vs Maze runner analogy: BFS is like dropping a pebble in still water: ripples expand outward in concentric circles, touching every neighbor 1 step away, then 2 steps away. DFS is like a solitary explorer solving a maze: running down one single corridor as deep as possible until hitting a wall, then backtracking.',
      whenToUse:
        'BFS: Shortest path in unweighted graphs, word ladders, level-order reachability. DFS: Cycle detection, topological sorting, connected components, maze paths.',
      whyItMatters:
        'The foundational paradigm underlying social networks (friend recommendations), map route planning, and dependency resolution.',
      keyPoints: [
        'Adjacency List: `Map<Integer, List<Integer>>` representation uses O(V + E) space.',
        'Visited Set: Mandatory `visited` set to prevent infinite loops in cyclic graphs.',
        'BFS (Breadth-First Search): Queue (FIFO) based. First time a target node is visited, it is GUARANTEED to be the shortest path in unweighted graphs.',
        'DFS (Depth-First Search): Call Stack (LIFO) based. Deep exploration, natural fit for backtracking.',
      ],
      formulaOrSyntax: {
        label: 'BFS Queue Template',
        codeOrLatex: 'Queue<Integer> q = new LinkedList<>();\nSet<Integer> visited = new HashSet<>();\nq.offer(start);\nvisited.add(start);\nwhile (!q.isEmpty()) {\n    int curr = q.poll();\n    for (int neighbor : graph.get(curr)) {\n        if (!visited.contains(neighbor)) {\n            visited.add(neighbor);\n            q.offer(neighbor);\n        }\n    }\n}',
        isLatex: false,
        language: 'java',
      },
      complexity: {
        time: 'O(V + E) where V is vertices and E is edges (visits every vertex and edge once)',
        space: 'O(V) for visited set and queue/recursion stack',
      },
      commonMistakeOrTrap: {
        mistake: 'Marking a node as "visited" when it is DEQUEUED instead of when it is ENQUEUED in BFS.',
        fix: 'Mark visited IMMEDIATELY when pushing to the queue! Otherwise, the same node will be enqueued multiple times by different neighbors, causing memory explosion.',
        interviewTrap:
          'Question: "Can BFS find the shortest path in a graph with weighted edges?" Answer: No! BFS assumes all edges have uniform weight 1. For weighted graphs, use Dijkstra\'s Algorithm (Priority Queue) or Bellman-Ford (negative weights).',
      },
      examCheatsheet: [
        'BFS guarantees shortest path in unweighted graphs',
        'Always mark nodes visited upon ENQUEUE in BFS, not dequeue',
        'DFS is natural for cycle detection and topological sorting',
        'Time: O(V + E), Space: O(V)',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'BFS Concentric Ripples vs. DFS Deep Path',
      caption:
        'BFS explores level 1 neighbors first before proceeding to level 2. DFS dives to the leaf before backtracking.',
      visualKey: 'dsa-graphs-bfs-dfs-viz',
      details: {
        comparison: {
          headers: ['Property', 'BFS (Breadth-First)', 'DFS (Depth-First)'],
          rows: [
            ['Underlying Data Structure', 'Queue (FIFO)', 'Call Stack / Stack (LIFO)'],
            ['Exploration Strategy', 'Level-by-level concentric circles', 'Deep branch dive until dead-end'],
            ['Shortest Path (Unweighted)', 'Guaranteed optimal path length', 'Not guaranteed (finds any arbitrary path)'],
            ['Memory Footprint', 'Can be large O(V) for wide bushy graphs', 'O(maximum branch depth)'],
          ],
        },
      },
    },
    animation: {
      type: 'graph-traversal-interactive',
      title: 'Graph Traversal Node Wavefront Animator',
      description:
        'Watch BFS queue dequeue parent nodes and expand level-by-level wavefront ripples.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'BFS Shortest Path in Python',
      language: 'python',
      code: `from collections import deque

def bfs_shortest_path(graph, start, target):
    queue = deque([(start, 0)]) # (node, distance)
    visited = {start}

    while queue:
        node, dist = queue.popleft()
        if node == target:
            return dist # Shortest distance in unweighted graph!

        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))

    return -1 # Unreachable

# Graph adjacency list: A-B, A-C, B-D, C-D
adj = {'A': ['B', 'C'], 'B': ['A', 'D'], 'C': ['A', 'D'], 'D': ['B', 'C']}
print("Shortest distance A -> D:", bfs_shortest_path(adj, 'A', 'D')) # 2`,
      input: 'Graph with 4 nodes, start=A, target=D',
      output: 'Shortest distance A -> D: 2',
      explanation:
        'BFS explores all 1-step neighbors (B, C) before finding D at distance 2, guaranteeing shortest path.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does BFS guarantee the shortest path in an unweighted graph?',
        options: [
          'Because it uses a priority queue',
          'Because it explores nodes in strictly increasing order of their distance from the source (distance 1, then 2, then 3...)',
          'Because it sorts the graph edges',
          'Because it avoids cycles automatically',
        ],
        correctIndex: 1,
        explanation: 'Exploring level-by-level guarantees that the first time a target node is discovered, it was reached via the fewest edges.',
      },
      {
        id: 'q2',
        question: 'What is the time complexity of traversing a graph using BFS or DFS with an adjacency list?',
        options: ['O(V · E)', 'O(V + E)', 'O(V²)', 'O(E log V)'],
        correctIndex: 1,
        explanation: 'Every vertex is visited once O(V), and every edge is traversed once O(E), giving linear O(V + E) time.',
      },
      {
        id: 'q3',
        question: 'What bug happens in BFS if you mark a node as visited when polling it from the queue instead of when offering it?',
        options: [
          'The graph is corrupted',
          'The queue fills with duplicate entries of the same node from different neighbors, risking Memory Limit Exceeded',
          'The path becomes negative',
          'A NullPointerException is thrown',
        ],
        correctIndex: 1,
        explanation: 'Failing to mark visited immediately allows multiple neighbors to enqueue the same node before it is dequeued.',
      },
    ],
  },
  {
    id: 'dsa-dynamic-programming-knapsack',
    subject: 'dsa',
    category: 'Dynamic Programming',
    title: 'Dynamic Programming & 0/1 Knapsack',
    subtitle: 'Optimal Substructure, Overlapping Subproblems & Memoization',
    difficulty: 'Advanced',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['DP', 'Knapsack', 'Memoization', 'Tabulation', 'Subproblems'],
    quickRecall: {
      oneLiner:
        'Dynamic Programming solves complex problems by breaking them into overlapping subproblems, solving each subproblem once, and caching results (Memoization or Tabulation).',
      simpleAnalogy:
        'Math on paper analogy: If someone writes "1 + 1 + 1 + 1 + 1" on a board, you count and say "5". If they write "+ 1" at the end, you don\'t recalculate 1+1+1+1+1 from scratch; you remember the previous answer was 5 and immediately say "6". That is DP: remembering past answers to compute new ones in O(1).',
      whenToUse:
        'Problems with overlapping subproblems and optimal substructure (0/1 Knapsack, Coin Change, Longest Common Subsequence, Edit Distance).',
      whyItMatters:
        'Transforms exponential O(2^N) brute-force recursion trees into polynomial O(N · W) table lookups.',
      keyPoints: [
        'Two Pillars: 1) Overlapping Subproblems (same sub-states computed repeatedly), 2) Optimal Substructure (optimal global solution built from optimal subproblem solutions).',
        'Top-Down: Recursion + Memoization (cache dictionary/array).',
        'Bottom-Up: Iterative Tabulation (fill 2D or 1D array starting from base cases).',
        '0/1 Knapsack Decision: For item `i` with weight `wt` and value `val`: `dp[i][w] = max(dp[i-1][w], val + dp[i-1][w - wt])`.',
        'Space Optimization: 2D table can be compressed to a 1D array by iterating weights backwards (`W` down to `wt`).',
      ],
      formulaOrSyntax: {
        label: '0/1 Knapsack Recurrence Relation',
        codeOrLatex: 'dp[i][w] = \\max(dp[i-1][w], \\quad \\text{val}[i] + dp[i-1][w - \\text{wt}[i]])',
        isLatex: true,
      },
      complexity: {
        time: 'O(N · W) pseudo-polynomial time (N = items, W = knapsack capacity)',
        space: '2D Table: O(N · W) | Space Optimized: O(W) 1D array',
      },
      commonMistakeOrTrap: {
        mistake: 'Iterating weights forwards (0 to W) when using a 1D space-optimized array for 0/1 Knapsack.',
        fix: 'Iterating forwards reuses the same item multiple times (solving Unbounded Knapsack)! In 0/1 Knapsack, iterate backwards from W down to `wt` to ensure each item is used at most once.',
        interviewTrap:
          'Question: "Why is 0/1 Knapsack called pseudo-polynomial instead of strictly polynomial?" Answer: Because W is a numeric value, not an element count! The input size in bits is log2(W), so O(N · 2^bits) is actually exponential in the bit-length of the input!',
      },
      examCheatsheet: [
        'Top-down = Recursion + Memo; Bottom-up = Iterative Tabulation',
        '0/1 Knapsack choice: Include item (if fits) OR Exclude item',
        'Space can be reduced from O(N·W) to O(W) by iterating weights backwards',
        'Identify base cases (e.g. `dp[0][w] = 0`, `dp[i][0] = 0`)',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: '0/1 Knapsack 2D DP Table Grid Filling',
      caption:
        'Table entries compute max value for item subset i and capacity w. Arrows trace dependency on previous row.',
      visualKey: 'dsa-knapsack-grid-viz',
      details: {
        comparison: {
          headers: ['Item (wt, val)', 'Capacity w=0', 'Capacity w=1', 'Capacity w=2', 'Capacity w=3'],
          rows: [
            ['Base (None)', '$0', '$0', '$0', '$0'],
            ['Item 1 (wt=1, val=$6)', '$0', '$6', '$6', '$6'],
            ['Item 2 (wt=2, val=$10)', '$0', '$6', '$10', '$16 (Item 1 + Item 2!)'],
          ],
        },
      },
    },
    animation: {
      type: 'dp-table-interactive',
      title: '2D DP Grid Cell Calculation Animator',
      description:
        'Step through filling DP table cells computing max(exclude, include + dp[i-1][w-wt]).',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: '0/1 Knapsack in Python (1D Space Optimized)',
      language: 'python',
      code: `def knapsack_01(weights, values, capacity):
    # 1D array space optimization O(W)
    dp = [0] * (capacity + 1)

    for wt, val in zip(weights, values):
        # Iterate BACKWARDS so each item is used at most once
        for w in range(capacity, wt - 1, -1):
            dp[w] = max(dp[w], dp[w - wt] + val)

    return dp[capacity]

weights = [1, 2, 3]
values = [6, 10, 12]
max_weight = 5
print("Max Knapsack Value:", knapsack_01(weights, values, max_weight)) # 22`,
      input: 'weights=[1, 2, 3], values=[6, 10, 12], capacity=5',
      output: 'Max Knapsack Value: 22 (Picks Item 2 + Item 3: wt=5, val=22)',
      explanation:
        'Iterating backwards prevents item reuse, achieving optimal O(W) space complexity.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What two properties must a problem have to be solvable using Dynamic Programming?',
        options: [
          'Linear order and sorting',
          'Optimal Substructure and Overlapping Subproblems',
          'Binary search and heap invariant',
          'Graph connectivity',
        ],
        correctIndex: 1,
        explanation: 'Optimal substructure allows building solutions from subproblems; overlapping subproblems makes caching those solutions advantageous.',
      },
      {
        id: 'q2',
        question: 'Why must the 1D array in space-optimized 0/1 Knapsack be traversed backwards from capacity down to item weight?',
        options: [
          'To sort the items',
          'To prevent using the same item multiple times in the same step',
          'To avoid division by zero',
          'Because Python lists only iterate backwards',
        ],
        correctIndex: 1,
        explanation: 'Forward iteration references updated values from the current row, accidentally using the item multiple times (unbounded knapsack).',
      },
      {
        id: 'q3',
        question: 'What is the time complexity of the standard 0/1 Knapsack DP algorithm with N items and capacity W?',
        options: ['O(N + W)', 'O(N · W)', 'O(2^N)', 'O(N log W)'],
        correctIndex: 1,
        explanation: 'The algorithm fills a table of dimensions N × W, computing each cell in O(1) time.',
      },
    ],
  },

  {
    "id": "dsa-arrays-kadanes",
    "subject": "dsa",
    "category": "Arrays and Strings",
    "title": "Kadane's Algorithm for Maximum Subarray Sum",
    "subtitle": "Greedy/DP Optimization in Single Pass O(N) Time and O(1) Extra Space",
    "difficulty": "Beginner",
    "isInterviewFavorite": true,
    "readTimeSeconds": 45,
    "tags": [
      "Arrays",
      "Kadane",
      "Dynamic Programming",
      "Sliding Window",
      "Subarray"
    ],
    "quickRecall": {
      "oneLiner": "Kadane's Algorithm finds the contiguous subarray with the largest sum in O(N) time by deciding at each step whether to extend the current subarray or start fresh.",
      "simpleAnalogy": "Carrying a streak in a game: at every new level, if your accumulated score drops below zero, it is an active penalty (dead weight). You are better off resetting your streak to zero and starting fresh from the current level rather than carrying negative debt into the future!",
      "whenToUse": "Maximum subarray sum, maximum product subarray (with sign tracking), circular subarray sum, and stock buying single-transaction profit.",
      "whyItMatters": "Transforms a naive O(N³) triple-nested brute-force or O(N²) pair-sum algorithm into a blazing fast O(N) single-pass scan.",
      "keyPoints": [
        "Core Recurrence: current_sum = max(num, current_sum + num). At index i, either add num to existing streak or start a brand new subarray at num.",
        "Global Tracking: max_sum = max(max_sum, current_sum). Updated at every step.",
        "All-Negative Edge Case: If the array contains only negative numbers (e.g. [-5, -2, -8]), initialize max_sum = arr[0] (NOT 0!), yielding -2.",
        "Single Pass: Processes each element exactly once from left to right.",
        "Subarray vs Subsequence: Subarrays MUST be contiguous (touching elements without gaps); subsequences do not need to be contiguous."
      ],
      "formulaOrSyntax": {
        "label": "Kadane's Dynamic Programming Recurrence",
        "codeOrLatex": "\\text{curr}[i] = \\max(x_i, \\text{curr}[i-1] + x_i), \\quad \\text{max\\_so\\_far} = \\max(\\text{max\\_so\\_far}, \\text{curr}[i])",
        "isLatex": true
      },
      "complexity": {
        "time": "O(N) single pass through array of length N",
        "space": "O(1) auxiliary space (tracks only two scalar variables)"
      },
      "commonMistakeOrTrap": {
        "mistake": "Initializing max_sum = 0 instead of arr[0] or -Infinity.",
        "fix": "If all numbers are negative (e.g. [-3, -1, -4]), initializing with 0 erroneously outputs 0, when the true maximum subarray sum is -1!",
        "interviewTrap": "Question: 'How can you return the start and end indices of the maximum subarray?' Answer: Track a temp_start pointer that resets to i whenever current_sum resets to num[i]. Update best_start and best_end whenever max_sum is updated."
      },
      "examCheatsheet": [
        "curr = max(x, curr + x)",
        "max_so_far = max(max_so_far, curr)",
        "Time: O(N), Space: O(1)",
        "Always initialize with arr[0], never 0 (handles all-negative arrays)"
      ]
    },
    "visual": {
      "type": "diagram",
      "title": "Kadane's Subarray Streak Decision Tree",
      "caption": "At each element, evaluate: does adding x improve current_sum, or is starting fresh at x strictly better?",
      "visualKey": "dsa-arrays-kadanes",
      "details": {
        "comparison": {
          "headers": [
            "Index i",
            "Array Value",
            "curr_sum = max(x, curr + x)",
            "max_so_far",
            "Decision"
          ],
          "rows": [
            [
              "0",
              "-2",
              "-2",
              "-2",
              "Start at index 0"
            ],
            [
              "1",
              "1",
              "1",
              "1",
              "Discard -2 debt, start fresh at 1"
            ],
            [
              "2",
              "-3",
              "-2",
              "1",
              "Extend subarray (curr drops to -2)"
            ],
            [
              "3",
              "4",
              "4",
              "4",
              "Discard negative debt, start fresh at 4"
            ],
            [
              "4",
              "-1",
              "3",
              "4",
              "Extend subarray (sum = 3)"
            ],
            [
              "5",
              "2",
              "5",
              "5",
              "Extend subarray (sum = 5) -> New Best!"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Kadane's Running Sum Traversal Trace",
      "description": "Step through array [-2, 1, -3, 4, -1, 2, 1, -5, 4], watching curr_sum reset at negative drops and peak at 6.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Kadane's Algorithm in Python with Index Tracking",
      "language": "python",
      "code": "def max_subarray(nums):\n    if not nums:\n        return 0, []\n\n    max_sum = current_sum = nums[0]\n    start = end = temp_start = 0\n\n    for i in range(1, len(nums)):\n        num = nums[i]\n        if num > current_sum + num:\n            current_sum = num\n            temp_start = i\n        else:\n            current_sum += num\n\n        if current_sum > max_sum:\n            max_sum = current_sum\n            start = temp_start\n            end = i\n\n    return max_sum, nums[start:end + 1]\n\narr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nmax_val, subarray = max_subarray(arr)\nprint(f\"Maximum Subarray Sum: {max_val}\")\nprint(f\"Optimal Subarray Elements: {subarray}\")",
      "input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      "output": "Maximum Subarray Sum: 6 | Optimal Subarray Elements: [4, -1, 2, 1]",
      "explanation": "Contiguous subarray [4, -1, 2, 1] achieves the maximum sum of 6 in a single linear pass."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What is the optimal time and space complexity of Kadane's Algorithm?",
        "options": [
          "O(N log N) time, O(N) space",
          "O(N) time, O(1) space",
          "O(N²) time, O(1) space",
          "O(1) time, O(N) space"
        ],
        "correctIndex": 1,
        "explanation": "Kadane scans the array once from left to right using only two tracking scalar variables, achieving O(N) time and O(1) auxiliary space."
      },
      {
        "id": "q2",
        "question": "If the input array is [-8, -3, -6, -2, -5], what will Kadane's algorithm output when properly initialized?",
        "options": [
          "0",
          "-2",
          "-8",
          "-24"
        ],
        "correctIndex": 1,
        "explanation": "Initializing with arr[0] correctly finds -2 as the maximum single-element subarray."
      },
      {
        "id": "q3",
        "question": "When does Kadane's algorithm decide to start a new subarray rather than extending the existing one?",
        "options": [
          "When the current number is positive",
          "When the existing accumulated current_sum is negative (current_sum < 0)",
          "When reaching the midpoint of the array",
          "When an even number is encountered"
        ],
        "correctIndex": 1,
        "explanation": "Carrying a negative accumulated sum degrades any future number, so starting fresh at x is strictly superior."
      }
    ]
  },
  {
    "id": "dsa-prefix-sum",
    "subject": "dsa",
    "category": "Prefix Sum",
    "title": "Prefix Sum Array & Subarray Range Sums",
    "subtitle": "O(1) Range Queries [L..R], Running Accumulator & Subarray Sum Equals K Pattern",
    "difficulty": "Beginner",
    "isInterviewFavorite": true,
    "readTimeSeconds": 50,
    "tags": [
      "Prefix Sum",
      "Range Query",
      "Subarray Sum Equals K",
      "Hash Map",
      "Cumulative Sum"
    ],
    "quickRecall": {
      "oneLiner": "Prefix sum pre-computes cumulative running totals so that any subarray range sum between index L and R can be queried in O(1) time.",
      "simpleAnalogy": "A car odometer: if your odometer read 10,000 miles when you left Chicago (index L-1) and reads 10,450 miles when you arrive in Denver (index R), you don't need to add up every single mile driven—you simply compute 10,450 - 10,000 = 450 miles in one instant subtraction (O(1))!",
      "whenToUse": "Frequent range sum queries on static arrays, 2D matrix range sums, and the classic 'Subarray Sum Equals K' problem paired with a Hash Map.",
      "whyItMatters": "Reduces Q range queries from O(Q * N) brute force down to O(N) pre-processing + O(1) per query = O(N + Q) total time.",
      "keyPoints": [
        "1D Prefix Formula: prefix[i] = prefix[i-1] + arr[i]. With 1-based indexing: sum(L..R) = prefix[R] - prefix[L-1].",
        "Zero-Base Padding: Using prefix array of size N+1 with prefix[0] = 0 avoids ugly edge-case 'if (L == 0)' conditional checks.",
        "Subarray Sum Equals K: If (prefix_sum - K) exists in a Hash Map, a contiguous subarray summing to K ends at the current index!",
        "Limitation on Updates: If array elements change frequently, updating the prefix array takes O(N). Use a Fenwick Tree (Binary Indexed Tree) or Segment Tree for dynamic updates.",
        "2D Prefix Sum: Extends to rectangular submatrices in O(1) using inclusion-exclusion: Area = P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]."
      ],
      "formulaOrSyntax": {
        "label": "1D Range Sum & Subarray Equals K Formula",
        "codeOrLatex": "\\text{Sum}(L, R) = P[R + 1] - P[L], \\quad \\text{Check: } (\\text{curr\\_sum} - K) \\in \\text{HashMap}",
        "isLatex": true
      },
      "complexity": {
        "time": "Precomputation: O(N); Each query: O(1) constant time",
        "space": "O(N) to store cumulative prefix sum array"
      },
      "commonMistakeOrTrap": {
        "mistake": "Forgetting to initialize the Hash Map with {0: 1} in the 'Subarray Sum Equals K' problem.",
        "fix": "Without map[0] = 1, any subarray that sums to K starting from index 0 will be completely missed!",
        "interviewTrap": "Question: 'Can Prefix Sum be used with negative numbers?' Answer: YES! Unlike Two Pointers / Sliding Window (which requires strictly non-negative numbers for monotonic growth), Prefix Sum + Hash Map works seamlessly with negative numbers."
      },
      "examCheatsheet": [
        "prefix[i] = prefix[i-1] + arr[i]",
        "sum(L..R) = prefix[R+1] - prefix[L]",
        "Subarray Sum = K: Use Hash Map to store prefix_sum frequencies",
        "Always initialize hash map with {0: 1}"
      ]
    },
    "visual": {
      "type": "diagram",
      "title": "Prefix Sum Cumulative Subtraction Logic",
      "caption": "Range sum from index 2 to 4 is calculated instantly by subtracting Prefix[1] from Prefix[4].",
      "visualKey": "dsa-prefix-sum",
      "details": {
        "comparison": {
          "headers": [
            "Index",
            "Original Array",
            "Prefix Array P (1-based)",
            "Range Query Example"
          ],
          "rows": [
            [
              "0",
              "3",
              "3",
              "Sum(0..0) = P[0] = 3"
            ],
            [
              "1",
              "1",
              "4 (3 + 1)",
              "Sum(0..1) = P[1] = 4"
            ],
            [
              "2",
              "4",
              "8 (4 + 4)",
              "Sum(2..4) = P[4] - P[1] = 17 - 4 = 13"
            ],
            [
              "3",
              "2",
              "10 (8 + 2)",
              "Single subtraction: O(1) time"
            ],
            [
              "4",
              "7",
              "17 (10 + 7)",
              "Entire array sum = P[4] = 17"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Subarray Sum Equals K Hash Map Trace",
      "description": "Trace running sum accumulation, checking if (sum - K) exists in hash map, and incrementing match count.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Subarray Sum Equals K (LeetCode 560) in Python",
      "language": "python",
      "code": "def subarray_sum(nums, k):\n    # Hash map stores: prefix_sum -> frequency count\n    # Crucial base case: prefix sum of 0 has appeared 1 time\n    prefix_counts = {0: 1}\n    curr_sum = 0\n    total_subarrays = 0\n\n    for num in nums:\n        curr_sum += num\n        # If (curr_sum - k) was seen before, a subarray summing to k exists!\n        if (curr_sum - k) in prefix_counts:\n            total_subarrays += prefix_counts[curr_sum - k]\n\n        # Record current running prefix sum in map\n        prefix_counts[curr_sum] = prefix_counts.get(curr_sum, 0) + 1\n\n    return total_subarrays\n\narr = [3, 4, 7, 2, -3, 1, 4, 2]\nK = 7\nprint(f\"Number of subarrays summing to {K}: {subarray_sum(arr, K)}\")",
      "input": "nums = [3, 4, 7, 2, -3, 1, 4, 2], k = 7",
      "output": "Number of subarrays summing to 7: 4",
      "explanation": "Finds [3, 4], [7], [7, 2, -3, 1], and [1, 4, 2] in O(N) time and O(N) space using Hash Map lookups."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What is the query time complexity for finding the sum of elements from index L to R using a precomputed prefix sum array?",
        "options": [
          "O(R - L)",
          "O(log N)",
          "O(1)",
          "O(N)"
        ],
        "correctIndex": 2,
        "explanation": "Prefix sum enables range queries via a single subtraction: prefix[R] - prefix[L-1], executing in O(1) constant time."
      },
      {
        "id": "q2",
        "question": "Why must the hash map in 'Subarray Sum Equals K' be initialized with {0: 1}?",
        "options": [
          "To avoid division by zero",
          "To account for subarrays that sum to K starting directly from index 0",
          "Because 0 is a prime number",
          "To prevent KeyError on negative numbers"
        ],
        "correctIndex": 1,
        "explanation": "If a prefix sum equals K at index i, (curr_sum - k) = 0. Without {0: 1}, this valid subarray from the beginning would be missed."
      },
      {
        "id": "q3",
        "question": "Can the Sliding Window technique replace Prefix Sum if the array contains negative numbers?",
        "options": [
          "Yes, sliding window works on all arrays",
          "No, because negative numbers break the monotonicity requirement (expanding window can decrease sum)",
          "Yes, if the array is sorted first",
          "Only for arrays of even length"
        ],
        "correctIndex": 1,
        "explanation": "Sliding window relies on the property that expanding the window increases the sum. Negative numbers destroy this monotonic guarantee."
      }
    ]
  },
  {
    "id": "dsa-hashing-two-sum",
    "subject": "dsa",
    "category": "Hashing",
    "title": "Hash Map Lookup & The Classic Two Sum Pattern",
    "subtitle": "O(1) Average Lookup, Collision Resolution (Chaining vs Open Addressing) & Complement Map",
    "difficulty": "Beginner",
    "isInterviewFavorite": true,
    "readTimeSeconds": 45,
    "tags": [
      "Hashing",
      "HashMap",
      "Two Sum",
      "Collision Resolution",
      "O(1) Lookup"
    ],
    "quickRecall": {
      "oneLiner": "Hash Tables provide O(1) average-time key-value lookups by mapping keys through a hash function to array bucket indices, resolving collisions via chaining or open addressing.",
      "simpleAnalogy": "A coat check room with numbered pigeonholes: when you check in your coat, the attendant hashes your name to a bucket number (e.g. bucket 42) and hangs your coat there. When you return, they go directly to bucket 42 in O(1) time without searching every coat in the building!",
      "whenToUse": "Frequency counting, instant O(1) deduplication, pairing problems (Two Sum), and caching/memoization.",
      "whyItMatters": "Trading space for time: Hash tables turn slow O(N) searches into instant O(1) lookups, forming the backbone of modern software engineering.",
      "keyPoints": [
        "Hash Function: Converts an arbitrary key into an integer hash code, modulated to fit table capacity: index = hash(key) % capacity.",
        "Collision Resolution: Separate Chaining (linked lists or balanced trees at each bucket) vs Open Addressing (linear/quadratic probing).",
        "Two Sum Pattern: For each number x, calculate complement = target - x. Check if complement exists in Hash Map. If yes, match found in O(N) total time!",
        "Load Factor (α = N / Capacity): When load factor exceeds threshold (typically 0.75), the table doubles its capacity and rehashes all keys.",
        "Worst-Case Trap: If all keys hash to the same bucket (hash collision attack), lookup degrades to O(N) (or O(log N) in Java 8+ Red-Black trees)."
      ],
      "formulaOrSyntax": {
        "label": "Hash Bucket Indexing & Two Sum Relation",
        "codeOrLatex": "\\text{index} = \\text{hashCode}(\\text{key}) \\pmod{\\text{capacity}}, \\quad \\text{complement} = \\text{target} - \\text{nums}[i]",
        "isLatex": true
      },
      "complexity": {
        "time": "Average: O(1) for insert, delete, and lookup; Worst-case: O(N) under severe collisions",
        "space": "O(N) memory overhead for buckets and node pointers"
      },
      "commonMistakeOrTrap": {
        "mistake": "Adding the current number to the Hash Map BEFORE checking for the complement in Two Sum.",
        "fix": "Check for complement first! If you add first and target is 8 with number 4, it will pair 4 with itself (using the same element twice).",
        "interviewTrap": "Question: 'What requirements must a custom object meet to be used as a HashMap key in Java?' Answer: It MUST properly override both equals() and hashCode() consistently! If two objects are equal according to equals(), they MUST return identical hashCodes."
      },
      "examCheatsheet": [
        "Average lookup/insert: O(1) constant time",
        "Worst-case lookup: O(N) if all keys collide",
        "Two Sum: complement = target - num (O(N) time, O(N) space)",
        "Check complement in map BEFORE inserting current element"
      ]
    },
    "visual": {
      "type": "diagram",
      "title": "Hash Table Bucket Array with Separate Chaining",
      "caption": "Keys are hashed to bucket indices. Multiple keys landing in bucket 2 form a linked list chain.",
      "visualKey": "dsa-hashing-two-sum",
      "details": {
        "comparison": {
          "headers": [
            "Collision Strategy",
            "How It Resolves Collisions",
            "Pros",
            "Cons"
          ],
          "rows": [
            [
              "Separate Chaining",
              "Bucket holds linked list or tree of entries",
              "Simple, degrades gracefully under high load",
              "Memory overhead for node pointers"
            ],
            [
              "Linear Probing",
              "Searches next adjacent slot (i+1, i+2...)",
              "Excellent CPU cache locality, no pointers",
              "Suffers from primary clustering"
            ],
            [
              "Quadratic Probing",
              "Checks intervals i + 1², i + 2², i + 3²",
              "Reduces linear clustering",
              "Can fail to find open slot if table > 50% full"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Two Sum Hash Map Lookup Progression",
      "description": "Trace iterating through [2, 7, 11, 15] for target 9: check complement 9-2=7 (not found), insert 2; check 9-7=2 (found!).",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Classic Two Sum in Python with One-Pass Hash Map",
      "language": "python",
      "code": "def two_sum(nums, target):\n    # Map stores: number -> index\n    seen = {}\n\n    for i, num in enumerate(nums):\n        complement = target - num\n        # Step 1: Check if complement was already encountered\n        if complement in seen:\n            return [seen[complement], i]\n        # Step 2: Store current number and its index\n        seen[num] = i\n\n    return []\n\narr = [2, 11, 7, 15]\ntarget_val = 9\nindices = two_sum(arr, target_val)\nprint(f\"Indices that sum to {target_val}: {indices}\")\nprint(f\"Values: nums[{indices[0]}]={arr[indices[0]]} + nums[{indices[1]}]={arr[indices[1]]}\")",
      "input": "nums = [2, 11, 7, 15], target = 9",
      "output": "Indices that sum to 9: [0, 2] | Values: 2 + 7 = 9",
      "explanation": "Resolves Two Sum in O(N) single-pass time and O(N) space, avoiding the naive O(N²) nested loops."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What is the average time complexity of searching for a key in a well-balanced Hash Table?",
        "options": [
          "O(N)",
          "O(log N)",
          "O(1)",
          "O(N log N)"
        ],
        "correctIndex": 2,
        "explanation": "Hash tables compute the hash code and jump directly to the target bucket in O(1) average time."
      },
      {
        "id": "q2",
        "question": "Why should you check for the complement in Two Sum BEFORE inserting the current number into the hash map?",
        "options": [
          "It saves memory",
          "It prevents an element from pairing with itself when target = 2 * num (e.g. target 6 with single element 3)",
          "It keeps the hash map sorted",
          "It avoids hashing collisions"
        ],
        "correctIndex": 1,
        "explanation": "Inserting before checking would match 3 with itself if target is 6, incorrectly returning the same index twice."
      },
      {
        "id": "q3",
        "question": "What is 'Separate Chaining' in Hash Table implementations?",
        "options": [
          "Deleting keys when collisions occur",
          "Storing colliding keys in a linked list or tree attached to that bucket",
          "Probing the next sequential array slot",
          "Encrypting keys with SHA-256"
        ],
        "correctIndex": 1,
        "explanation": "In separate chaining, each bucket holds a linked data structure (list or balanced tree) containing all colliding entries."
      }
    ]
  },
  {
    "id": "dsa-backtracking",
    "subject": "dsa",
    "category": "Recursion and Backtracking",
    "title": "Backtracking: Choose, Explore, and Unchoose Pattern",
    "subtitle": "State Space Tree Search, Pruning Dead Branches, Subsets, Permutations & N-Queens",
    "difficulty": "Intermediate",
    "isInterviewFavorite": true,
    "readTimeSeconds": 55,
    "tags": [
      "Backtracking",
      "Recursion",
      "State Space Tree",
      "Pruning",
      "Subsets",
      "N-Queens"
    ],
    "quickRecall": {
      "oneLiner": "Backtracking is an algorithmic paradigm that incrementally builds candidates for solutions and abandons ('backtracks') a candidate as soon as it determines it cannot possibly lead to a valid solution.",
      "simpleAnalogy": "Solving a physical corn maze: at every fork in the path, you choose a turn (Choose). You walk down that corridor (Explore). If you hit a dead end, you physically walk backward to the fork (Unchoose / Backtrack) and try the next path. You never wander aimlessly down dead ends!",
      "whenToUse": "Finding all permutations, combinations, subsets, Sudoku solver, N-Queens, Word Search on a grid, and partition problems.",
      "whyItMatters": "Pruning dead branches prevents searching millions of invalid candidate paths, turning an intractable brute force search into a fast, manageable traversal.",
      "keyPoints": [
        "The 3-Step Template: 1. Choose candidate element. 2. Explore recursively. 3. Unchoose (pop element or restore state).",
        "Base Case: When current candidate path matches desired length or goal condition, record a deep copy of the path (path[:]).",
        "Pruning (Bounding Function): Evaluating validity before exploring subtrees saves exponential computation.",
        "Deep Copy Warning: When saving a solution path to the results list in Python/Java, always save a copy (list(path) or new ArrayList<>(path)), not the reference!",
        "Permutations vs Subsets: Permutations track used elements with a visited boolean array; Subsets/Combinations increment a start index to avoid duplicates."
      ],
      "formulaOrSyntax": {
        "label": "Universal Backtracking Template",
        "codeOrLatex": "def backtrack(start, path):\n    if is_solution(path):\n        results.append(path[:])  # DEEP COPY!\n        return\n    for i in range(start, len(nums)):\n        if not is_valid(nums[i]): continue  # Prune\n        path.append(nums[i])      # 1. CHOOSE\n        backtrack(i + 1, path)    # 2. EXPLORE\n        path.pop()                # 3. UNCHOOSE",
        "isLatex": false,
        "language": "python"
      },
      "complexity": {
        "time": "Subsets: O(2^N); Permutations: O(N!); N-Queens: O(N!)",
        "space": "O(N) call stack memory proportional to recursion depth"
      },
      "commonMistakeOrTrap": {
        "mistake": "Appending the path reference directly to the results list: results.append(path).",
        "fix": "Always append a deep copy: results.append(path[:])! Because path is mutated and popped back to empty [], results will end up containing all empty lists!",
        "interviewTrap": "Question: 'How do you handle duplicates in Subsets II ([1, 2, 2])?' Answer: Sort the array first! Then inside the loop, prune if (i > start and nums[i] == nums[i-1]): continue. This ensures identical numbers are only chosen once at the same recursion depth."
      },
      "examCheatsheet": [
        "Choose -> Explore -> Unchoose (Pop)",
        "Always append a copy: results.append(path[:])",
        "Pruning abandons dead paths early",
        "Subsets = 2^N; Permutations = N!"
      ]
    },
    "visual": {
      "type": "flowchart",
      "title": "Backtracking Decision Tree: Subsets of [1, 2]",
      "caption": "Tree branches represent decisions to include or exclude elements. When a branch terminates, state unchooses back up.",
      "visualKey": "dsa-backtracking",
      "details": {
        "comparison": {
          "headers": [
            "Problem Type",
            "Time Complexity",
            "Index Management",
            "Duplicate Prevention"
          ],
          "rows": [
            [
              "Subsets",
              "O(2^N)",
              "Pass i + 1 to next call",
              "Sort + skip if nums[i] == nums[i-1]"
            ],
            [
              "Combinations (k size)",
              "O(C(N, k))",
              "Pass i + 1, stop when len(path) == k",
              "Sort + skip consecutive duplicates"
            ],
            [
              "Permutations",
              "O(N!)",
              "Use visited[i] boolean array",
              "Sort + skip if duplicate visited[i-1] is false"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Subsets Generation Tree Progression",
      "description": "Watch path build from [] -> [1] -> [1, 2], append copy, backtrack pop 2, then explore [2].",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Generating All Unique Subsets (Power Set) in Python",
      "language": "python",
      "code": "def subsets(nums):\n    result = []\n    nums.sort()\n\n    def backtrack(start, current_path):\n        # Record current subset (DEEP COPY with [:])\n        result.append(current_path[:])\n\n        for i in range(start, len(nums)):\n            # 1. CHOOSE\n            current_path.append(nums[i])\n            # 2. EXPLORE (i + 1 ensures elements are used once)\n            backtrack(i + 1, current_path)\n            # 3. UNCHOOSE (backtrack state)\n            current_path.pop()\n\n    backtrack(0, [])\n    return result\n\nitems = [1, 2, 3]\nall_subsets = subsets(items)\nprint(f\"Total Subsets (2^3 = 8): {len(all_subsets)}\")\nprint(\"Generated Subsets:\", all_subsets)",
      "input": "nums = [1, 2, 3]",
      "output": "Total Subsets: 8 | [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]",
      "explanation": "Backtracking systematically generates all 2^N combinations using choose-explore-unchoose recursion."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "Why must you append 'path[:]' (a shallow/deep copy) instead of 'path' when storing a solution in backtracking?",
        "options": [
          "Because path is private",
          "Because path is mutated and popped back to empty by subsequent backtracking steps, leaving an empty list",
          "Because path cannot be converted to a string",
          "To speed up the garbage collector"
        ],
        "correctIndex": 1,
        "explanation": "In Python and Java, lists are passed by reference. Appending the reference would result in all stored solutions pointing to the same final empty list."
      },
      {
        "id": "q2",
        "question": "What is the time complexity of generating all subsets of a set with N distinct elements?",
        "options": [
          "O(N²)",
          "O(N log N)",
          "O(2^N)",
          "O(N!)"
        ],
        "correctIndex": 2,
        "explanation": "Every element has two choices (included or excluded), generating 2^N total subsets (the Power Set)."
      },
      {
        "id": "q3",
        "question": "What role does 'Pruning' play in backtracking algorithms?",
        "options": [
          "It removes dead code during compilation",
          "It checks constraints to abandon subtrees that cannot lead to a valid solution without exploring them",
          "It sorts the array in descending order",
          "It frees memory on the Heap"
        ],
        "correctIndex": 1,
        "explanation": "Pruning detects invalid partial candidates early, skipping thousands of futile recursive function calls."
      }
    ]
  },
  {
    "id": "dsa-greedy-intervals",
    "subject": "dsa",
    "category": "Greedy Algorithms",
    "title": "Greedy Strategy & Interval Activity Selection",
    "subtitle": "Locally Optimal Choices Lead to Global Optimum, Sorting by End Time & Coin Change Trap",
    "difficulty": "Intermediate",
    "isInterviewFavorite": true,
    "readTimeSeconds": 50,
    "tags": [
      "Greedy",
      "Intervals",
      "Activity Selection",
      "Sorting",
      "Optimization"
    ],
    "quickRecall": {
      "oneLiner": "A greedy algorithm builds up a solution piece-by-piece, always choosing the next piece that offers the most immediate, local benefit without reconsidering past decisions.",
      "simpleAnalogy": "A conference room scheduling manager: to fit the maximum number of meetings in one day, you always pick the meeting that finishes earliest! That leaves as much remaining time as possible for subsequent meetings. You sort all meetings by their end times and greedily pick the next non-overlapping meeting.",
      "whenToUse": "Interval scheduling / merging, Fractional Knapsack, Dijkstra's shortest path, Kruskal's / Prim's Minimum Spanning Tree, and Huffman Coding.",
      "whyItMatters": "Greedy algorithms are ultra-fast (typically O(N log N) from sorting), but they ONLY work when the problem possesses the 'Greedy Choice Property' and 'Optimal Substructure'.",
      "keyPoints": [
        "Greedy Choice Property: A globally optimal solution can be arrived at by making locally optimal (greedy) choices without backtracking.",
        "Optimal Substructure: An optimal solution to the problem contains optimal solutions to subproblems.",
        "Interval Activity Selection: Always sort intervals by END TIME (not start time!). Picking the earliest finish time maximizes remaining room availability.",
        "The Coin Change Trap: Greedy works for canonical currency (US coins: 25, 10, 5, 1), but FAILS for arbitrary denominations (e.g. coins [1, 3, 4] for amount 6: greedy gives 4+1+1 = 3 coins, while DP gives 3+3 = 2 coins!).",
        "Fractional vs 0/1 Knapsack: Greedy solves Fractional Knapsack (sort by value/weight ratio); 0/1 Knapsack REQUIRES Dynamic Programming."
      ],
      "formulaOrSyntax": {
        "label": "Interval Activity Selection Logic",
        "codeOrLatex": "\\text{Sort by: } \\text{interval.end}, \\quad \\text{Select if: } \\text{interval.start} \\ge \\text{last\\_selected.end}",
        "isLatex": true
      },
      "complexity": {
        "time": "O(N log N) dominated by initial sorting; O(N) linear scan to select",
        "space": "O(1) extra space or O(N) to store sorted intervals"
      },
      "commonMistakeOrTrap": {
        "mistake": "Sorting intervals by start time instead of end time for Activity Selection.",
        "fix": "Sorting by start time can select a meeting that starts early but lasts all day, blocking dozens of shorter meetings! Always sort by finish time.",
        "interviewTrap": "Question: 'Why does greedy fail for the 0/1 Knapsack problem?' Answer: Because you cannot take fractions of an item! An item with high value-per-weight might leave an empty gap in the knapsack that cannot be filled, causing DP to outperform greedy."
      },
      "examCheatsheet": [
        "Greedy makes local optimal choices without backtracking",
        "Activity Selection: Sort by END TIME (earliest finish)",
        "Fractional Knapsack = Greedy; 0/1 Knapsack = Dynamic Programming",
        "Canonical coins work with greedy; arbitrary coins require DP"
      ]
    },
    "visual": {
      "type": "diagram",
      "title": "Interval Activity Selection: Earliest Finish Time Strategy",
      "caption": "Sorting by end times ensures each selection leaves maximum available time for future meetings.",
      "visualKey": "dsa-greedy-intervals",
      "details": {
        "comparison": {
          "headers": [
            "Problem",
            "Can Use Greedy?",
            "Sorting Criterion",
            "Why Greedy Succeeds or Fails"
          ],
          "rows": [
            [
              "Activity Selection",
              "YES",
              "Sort by end time",
              "Earliest end leaves maximum time for remaining tasks"
            ],
            [
              "Fractional Knapsack",
              "YES",
              "Sort by value / weight ratio",
              "Items can be split into arbitrary fractional portions"
            ],
            [
              "0/1 Knapsack",
              "NO (Requires DP)",
              "N/A",
              "Cannot split items; greedy creates suboptimal leftover capacity"
            ],
            [
              "Non-overlapping Intervals",
              "YES",
              "Sort by end time",
              "Greedily removes minimum intervals to resolve conflicts"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Greedy Interval Selection Walkthrough",
      "description": "Watch intervals sorted by end time: Meeting [1, 2] selected -> [2, 4] selected -> [3, 5] rejected due to overlap -> [4, 6] selected.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Non-Overlapping Intervals (Erase Overlaps) in Python",
      "language": "python",
      "code": "def erase_overlap_intervals(intervals):\n    if not intervals:\n        return 0\n\n    # Step 1: Sort by END TIME (greedy choice)\n    intervals.sort(key=lambda x: x[1])\n\n    count_kept = 1\n    last_end = intervals[0][1]\n\n    # Step 2: Greedily pick non-overlapping meetings\n    for start, end in intervals[1:]:\n        if start >= last_end:\n            count_kept += 1\n            last_end = end\n\n    # Removed = total - kept\n    return len(intervals) - count_kept\n\nmeetings = [[1, 2], [2, 3], [3, 4], [1, 3]]\nremoved = erase_overlap_intervals(meetings)\nprint(f\"Minimum intervals to remove for zero overlap: {removed}\")",
      "input": "intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]",
      "output": "Minimum intervals to remove for zero overlap: 1 (remove [1, 3])",
      "explanation": "Sorting by end time selects [1, 2], [2, 3], and [3, 4], requiring removal of only [1, 3]."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What is the correct sorting criterion for maximizing the number of compatible activities in Interval Scheduling?",
        "options": [
          "Sort by start time ascending",
          "Sort by duration ascending",
          "Sort by end time ascending",
          "Sort by start time descending"
        ],
        "correctIndex": 2,
        "explanation": "Selecting the activity that finishes earliest leaves the maximum possible remaining time for subsequent activities."
      },
      {
        "id": "q2",
        "question": "Why does the Greedy approach fail for the 0/1 Knapsack problem?",
        "options": [
          "Because 0/1 knapsack has negative weights",
          "Because items cannot be divided, and choosing by highest density can leave unusable capacity that prevents an optimal combo",
          "Because sorting numbers takes exponential time",
          "Because greedy algorithms only work on graphs"
        ],
        "correctIndex": 1,
        "explanation": "Without fractional division, leaving empty slack capacity can prevent achieving the global maximum value, requiring Dynamic Programming."
      },
      {
        "id": "q3",
        "question": "What two properties must a problem have for a Greedy algorithm to guarantee a globally optimal solution?",
        "options": [
          "NP-Complete and Polymorphic",
          "Greedy Choice Property and Optimal Substructure",
          "Recursion and Memoization",
          "Convexity and Duality"
        ],
        "correctIndex": 1,
        "explanation": "Greedy algorithms guarantee correctness only if local optimal choices lead to global optimum (Greedy Choice) and subproblem solutions compose optimal solutions (Optimal Substructure)."
      }
    ]
  },
  {
    "id": "dsa-tries",
    "subject": "dsa",
    "category": "Tries",
    "title": "Trie (Prefix Tree) for Fast String Retrieval",
    "subtitle": "O(L) Word Insertion & Prefix Search, Autocomplete & Bitwise XOR Trie",
    "difficulty": "Intermediate",
    "isInterviewFavorite": true,
    "readTimeSeconds": 50,
    "tags": [
      "Trie",
      "Prefix Tree",
      "Strings",
      "Autocomplete",
      "Prefix Search"
    ],
    "quickRecall": {
      "oneLiner": "A Trie (Prefix Tree) is a tree-like data structure used to store a dynamic set of strings where characters share common prefixes, enabling O(L) searches independent of dictionary size.",
      "simpleAnalogy": "Phone contact autocomplete or a physical dictionary thumb-tab index: when you search for 'cat', 'car', and 'card', you don't store the letter 'c' three separate times. You store 'c', branching to 'a', branching to 't' (word end) and 'r' (which branches to 'd'). All three words share the common prefix 'ca'!",
      "whenToUse": "Search engine autocomplete, spell checkers, IP routing longest prefix match, and Maximum XOR pair queries.",
      "whyItMatters": "Searching a word of length L in a Hash Table of N words takes O(L) on average, but Hash Tables CANNOT search by prefix ('find all words starting with app'). A Trie answers prefix queries in O(L) time effortlessly.",
      "keyPoints": [
        "Node Structure: Each node contains an array of 26 child pointers (for lowercase a-z) or a map, plus a boolean is_end_of_word flag.",
        "Shared Prefixes: Words with identical starting characters share ancestor nodes, saving redundant prefix comparisons.",
        "Operations: insert(word), search(word), and startsWith(prefix) all execute in O(L) time where L is word length.",
        "Independence from N: Lookup speed depends strictly on word length L, completely independent of how many millions of words (N) exist in the Trie!",
        "Bitwise Trie: Stores 32-bit binary integers (0 and 1 branches) to solve Maximum XOR subarray problems in O(32 * N) time."
      ],
      "formulaOrSyntax": {
        "label": "Trie Node Structure",
        "codeOrLatex": "class TrieNode {\n    TrieNode[] children = new TrieNode[26];\n    boolean isEndOfWord = false;\n}",
        "isLatex": false,
        "language": "java"
      },
      "complexity": {
        "time": "Insert: O(L); Search: O(L); Prefix Check: O(L) where L is string length",
        "space": "O(Total Characters * Alphabet Size) memory for child pointer arrays"
      },
      "commonMistakeOrTrap": {
        "mistake": "Confusing search(word) with startsWith(prefix).",
        "fix": "search('app') returns true ONLY if is_end_of_word is true at 'p'. startsWith('app') returns true as long as the path exists, even if 'app' itself was never inserted as a standalone word (e.g. only 'apple' was inserted).",
        "interviewTrap": "Question: 'Why use a Trie over a HashMap for string storage?' Answer: A HashMap cannot efficiently search by prefix ('startsWith') without scanning all N keys. A Trie finds prefix matches in O(L) time and naturally provides lexicographical alphabetical ordering."
      },
      "examCheatsheet": [
        "Trie = Prefix Tree (O(L) insert & search)",
        "Lookup time is independent of dictionary size N",
        "startsWith(prefix) checks path existence",
        "search(word) checks path existence AND is_end_of_word == true"
      ]
    },
    "visual": {
      "type": "diagram",
      "title": "Trie Prefix Tree: 'cat', 'car', and 'card'",
      "caption": "Root branches to 'c' -> 'a'. The node 'a' branches to 't' (word end) and 'r' (word end), which further branches to 'd' (word end).",
      "visualKey": "dsa-tries",
      "details": {
        "comparison": {
          "headers": [
            "Operation",
            "Trie Complexity",
            "Hash Table Complexity",
            "Sorted Array Complexity"
          ],
          "rows": [
            [
              "Insert Word (len L)",
              "O(L)",
              "O(L) average",
              "O(N) array shifting"
            ],
            [
              "Exact Word Search",
              "O(L)",
              "O(L) average",
              "O(L log N) binary search"
            ],
            [
              "Prefix Search (startsWith)",
              "O(L)",
              "O(N * L) linear scan of all keys",
              "O(L log N) binary search bounds"
            ],
            [
              "Memory Footprint",
              "High (many pointer references)",
              "Medium (table + strings)",
              "Minimal (contiguous memory)"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Trie Character Insertion & Path Traversal",
      "description": "Step through inserting 'cat', following root -> 'c' -> 'a' -> 't', setting is_end = true.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Complete Trie Implementation in Python",
      "language": "python",
      "code": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word: str) -> None:\n        curr = self.root\n        for ch in word:\n            if ch not in curr.children:\n                curr.children[ch] = TrieNode()\n            curr = curr.children[ch]\n        curr.is_end = True\n\n    def search(self, word: str) -> bool:\n        curr = self.root\n        for ch in word:\n            if ch not in curr.children:\n                return False\n            curr = curr.children[ch]\n        return curr.is_end\n\n    def starts_with(self, prefix: str) -> bool:\n        curr = self.root\n        for ch in prefix:\n            if ch not in curr.children:\n                return False\n            curr = curr.children[ch]\n        return True\n\ntrie = Trie()\ntrie.insert(\"apple\")\nprint(\"Search 'apple':\", trie.search(\"apple\"))     # True\nprint(\"Search 'app':\", trie.search(\"app\"))         # False (prefix only)\nprint(\"Starts with 'app':\", trie.starts_with(\"app\")) # True",
      "input": "Insert 'apple'",
      "output": "Search 'apple': True | Search 'app': False | Starts with 'app': True",
      "explanation": "search('app') is False because is_end is False, but starts_with('app') is True because the prefix path exists."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What is the time complexity to search for a word of length L in a Trie containing 10,000,000 words?",
        "options": [
          "O(log 10,000,000)",
          "O(L)",
          "O(N * L)",
          "O(1)"
        ],
        "correctIndex": 1,
        "explanation": "Trie search time depends strictly on the number of characters in the query word (L), completely independent of total words N."
      },
      {
        "id": "q2",
        "question": "What distinguishes search(word) from startsWith(prefix) in a Trie?",
        "options": [
          "search uses recursion; startsWith uses loops",
          "search checks that is_end_of_word is true at the final node; startsWith only requires that the path exists",
          "search is case-insensitive",
          "startsWith returns integer indices"
        ],
        "correctIndex": 1,
        "explanation": "A prefix match simply verifies that child pointers exist for all characters, whereas an exact search requires is_end == true."
      },
      {
        "id": "q3",
        "question": "What is a major trade-off when using a Trie instead of a Hash Set?",
        "options": [
          "Tries are slower for prefixes",
          "Tries consume significantly more memory due to maintaining multiple child node pointers",
          "Tries cannot store lowercase letters",
          "Tries only work on sorted input"
        ],
        "correctIndex": 1,
        "explanation": "Each Trie node contains an array or dictionary of child pointers, which can consume substantial memory for sparse vocabularies."
      }
    ]
  },
  {
    "id": "dsa-disjoint-set-union",
    "subject": "dsa",
    "category": "Disjoint Set Union",
    "title": "Disjoint Set Union (Union-Find) with Rank & Path Compression",
    "subtitle": "Near O(1) Amortized Inverse Ackermann α(N) Time, Cycle Detection & Kruskal's MST",
    "difficulty": "Advanced",
    "isInterviewFavorite": true,
    "readTimeSeconds": 55,
    "tags": [
      "DSU",
      "Union-Find",
      "Path Compression",
      "Union by Rank",
      "Kruskal",
      "Graphs"
    ],
    "quickRecall": {
      "oneLiner": "Disjoint Set Union (DSU / Union-Find) maintains a partition of elements into non-overlapping subsets, supporting near O(1) find and union operations via path compression and rank optimization.",
      "simpleAnalogy": "Company mergers: each employee reports to a manager, who reports to a CEO (representative root). If Company A and Company B merge (union), the shorter CEO's tree reports to the taller CEO (union by rank). When an employee asks 'Who is my ultimate CEO?' (find), they re-route their direct phone line straight to the CEO (path compression), making future inquiries instant!",
      "whenToUse": "Dynamic graph connectivity, cycle detection in undirected graphs, Kruskal's Minimum Spanning Tree (MST), and connected component counts.",
      "whyItMatters": "With both optimizations, M operations on N elements run in O(M * α(N)) time, where α is the Inverse Ackermann function (effectively α(N) < 5 for all atoms in the universe!).",
      "keyPoints": [
        "parent[i] Array: Initially parent[i] = i (every element is its own root leader).",
        "Path Compression: During find(x), update parent[x] = find(parent[x]). Flattens the tree so all nodes point directly to the root.",
        "Union by Rank / Size: Attach the tree with smaller depth/size beneath the root of the larger tree, preventing deep linear chains.",
        "Cycle Detection: If find(u) == find(v) before adding edge (u, v), adding this edge creates a cycle!",
        "Connected Components: Each successful union of disjoint sets decreases the total number of connected components by 1."
      ],
      "formulaOrSyntax": {
        "label": "DSU Find with Path Compression & Union by Rank",
        "codeOrLatex": "int find(int i) {\n    if (parent[i] == i) return i;\n    return parent[i] = find(parent[i]); // Path compression\n}",
        "isLatex": false,
        "language": "java"
      },
      "complexity": {
        "time": "Amortized O(α(N)) ≈ O(1) per find/union operation",
        "space": "O(N) memory for parent and rank arrays"
      },
      "commonMistakeOrTrap": {
        "mistake": "Uniting the elements themselves directly instead of uniting their root leaders: parent[u] = v.",
        "fix": "Always find root leaders first! root_u = find(u), root_v = find(v). Only connect root_u to root_v if root_u != root_v.",
        "interviewTrap": "Question: 'What is the time complexity of DSU without path compression and without rank?' Answer: O(N) per operation! Without optimizations, trees degenerate into tall linear linked lists (e.g. 1 -> 2 -> 3 -> 4)."
      },
      "examCheatsheet": [
        "Path Compression: parent[x] = find(parent[x])",
        "Union by Rank: Attach shorter tree under taller tree",
        "Time: O(α(N)) amortized (Inverse Ackermann, practically O(1))",
        "Cycle detected if find(u) == find(v)"
      ]
    },
    "visual": {
      "type": "diagram",
      "title": "DSU Path Compression: Tree Flattening",
      "caption": "Before path compression, traversing 4 -> 3 -> 2 -> 1 takes 3 steps. Path compression re-links 4 directly to root 1.",
      "visualKey": "dsa-disjoint-set-union",
      "details": {
        "comparison": {
          "headers": [
            "Optimizations Applied",
            "Find Time Complexity",
            "Union Time Complexity",
            "Tree Shape"
          ],
          "rows": [
            [
              "None (Naive)",
              "O(N) worst case",
              "O(N) worst case",
              "Can degrade into skewed linked list"
            ],
            [
              "Path Compression Only",
              "O(log N) amortized",
              "O(log N) amortized",
              "Flat trees over repeated lookups"
            ],
            [
              "Union by Rank Only",
              "O(log N) guaranteed",
              "O(log N) guaranteed",
              "Balanced trees of depth ≤ log N"
            ],
            [
              "Both (Rank + Compression)",
              "O(α(N)) ≈ O(1)",
              "O(α(N)) ≈ O(1)",
              "Nearly flat trees (depth ≤ 4)"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Union-Find Path Compression & Merging",
      "description": "Trace union(1, 2), union(3, 4), and union(2, 4) with path compression directly flattening parent pointers to 1.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Full Disjoint Set Union (DSU) Class in Python",
      "language": "python",
      "code": "class DSU:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.rank = [0] * n\n        self.num_components = n\n\n    def find(self, x):\n        # Path compression: flattens tree on the way back up\n        if self.parent[x] != x:\n            self.parent[x] = self.find(self.parent[x])\n        return self.parent[x]\n\n    def union(self, x, y):\n        root_x, root_y = self.find(x), self.find(y)\n        if root_x == root_y:\n            return False  # Already connected -> Cycle detected!\n\n        # Union by rank: attach smaller tree under larger tree\n        if self.rank[root_x] < self.rank[root_y]:\n            self.parent[root_x] = root_y\n        elif self.rank[root_x] > self.rank[root_y]:\n            self.parent[root_y] = root_x\n        else:\n            self.parent[root_y] = root_x\n            self.rank[root_x] += 1\n\n        self.num_components -= 1\n        return True\n\ndsu = DSU(5)\ndsu.union(0, 1)\ndsu.union(1, 2)\nprint(\"Are 0 and 2 connected?\", dsu.find(0) == dsu.find(2)) # True\nprint(\"Are 0 and 4 connected?\", dsu.find(0) == dsu.find(4)) # False\nprint(\"Cycle on edge (0, 2)?\", not dsu.union(0, 2))          # True (Cycle detected!)",
      "input": "DSU with 5 elements, connect (0-1), (1-2)",
      "output": "0 and 2 connected: True | 0 and 4 connected: False | Cycle detected on (0, 2): True",
      "explanation": "DSU identifies that 0 and 2 share root leader 0, confirming connectivity and cycle detection in O(1) amortized time."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "What is the amortized time complexity of a DSU operation with both Path Compression and Union by Rank?",
        "options": [
          "O(N log N)",
          "O(log N)",
          "O(α(N)) ≈ O(1) (Inverse Ackermann)",
          "O(N)"
        ],
        "correctIndex": 2,
        "explanation": "Combining path compression with union by rank achieves O(α(N)) amortized time, where α(N) is less than 5 for all conceivable universe scales."
      },
      {
        "id": "q2",
        "question": "How does DSU detect if adding an undirected edge (u, v) creates a cycle in a graph?",
        "options": [
          "If degree(u) + degree(v) > 2",
          "If find(u) == find(v) before adding the edge (both already belong to the same connected component)",
          "If u == 0 and v == 0",
          "If the rank of u equals the rank of v"
        ],
        "correctIndex": 1,
        "explanation": "If u and v already share the same representative root, a path already exists between them; adding another edge creates a cycle."
      },
      {
        "id": "q3",
        "question": "What does Path Compression do during a find(x) operation?",
        "options": [
          "Deletes visited nodes",
          "Points every visited node along the path directly to the representative root",
          "Reverses the array",
          "Increments the rank by 1"
        ],
        "correctIndex": 1,
        "explanation": "Path compression flattens the tree structure so future find queries on those nodes execute in instant O(1) time."
      }
    ]
  },
  {
    "id": "dsa-interview-patterns",
    "subject": "dsa",
    "category": "Common Interview Patterns",
    "title": "Top 8 Coding Interview Patterns (The FAANG Blueprint)",
    "subtitle": "How to Identify the Right Pattern in 30 Seconds: Pointers, Windows, DFS/BFS, Heaps & Monotonic Stacks",
    "difficulty": "Intermediate",
    "isInterviewFavorite": true,
    "readTimeSeconds": 60,
    "tags": [
      "Patterns",
      "Two Pointers",
      "Sliding Window",
      "Monotonic Stack",
      "BFS",
      "DFS",
      "Heap",
      "Interview"
    ],
    "quickRecall": {
      "oneLiner": "Mastering 8 core patterns enables solving over 80% of LeetCode algorithmic interview questions by recognizing problem triggers.",
      "simpleAnalogy": "A master mechanic's toolbox: rather than memorizing how to fix 500 individual car models, you recognize symptom triggers: engine knocking? Check spark plug (pattern). Squeaking sound? Check brake pads (pattern). In coding: 'contiguous subarray'? Sliding window! 'Sorted array pair'? Two pointers! 'Next greater element'? Monotonic stack!",
      "whenToUse": "Every technical coding interview in the first 60 seconds when analyzing the problem statement.",
      "whyItMatters": "Never guess! High-performing engineers categorize the problem into its archetypal algorithmic pattern within 30 seconds of reading the prompt.",
      "keyPoints": [
        "1. Two Pointers: Sorted array/string, find pair, palindrome, in-place partition.",
        "2. Sliding Window: Contiguous subarray/substring with condition (max sum, longest substring without repeats).",
        "3. Fast & Slow Pointers (Floyd's): Cycle in linked list, middle of linked list, happy number.",
        "4. Monotonic Stack: Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram (O(N) vs O(N²)).",
        "5. Top-K Elements (Heap): 'Kth largest/smallest', 'Top K frequent'. Use Min-Heap of size K (O(N log K)).",
        "6. Overlapping Intervals: Merge intervals, meeting rooms. Trigger: sort by start or end time.",
        "7. BFS vs DFS: Shortest path in unweighted graph = BFS (Queue); Path existence, exhaustive tree explore = DFS (Recursion/Stack).",
        "8. Binary Search on Answer: 'Minimize the maximum' or 'Maximize the minimum' with monotonic boolean condition."
      ],
      "formulaOrSyntax": {
        "label": "Pattern Identification Trigger Guide",
        "codeOrLatex": "Problem Clue                 -> Recommended Pattern\nSorted array + find pair      -> Two Pointers\nContiguous subarray / window  -> Sliding Window\nNext Greater Element          -> Monotonic Stack\nKth largest / Top K           -> Min-Heap of size K\nShortest unweighted path      -> BFS (Queue)\nMinimize the maximum capacity -> Binary Search on Answer",
        "isLatex": false
      },
      "complexity": {
        "time": "Pointers/Windows/Stacks: O(N); Heaps: O(N log K); Binary Search: O(N log(Range))",
        "space": "O(1) to O(N) depending on auxiliary hash map or stack tracking"
      },
      "commonMistakeOrTrap": {
        "mistake": "Immediately coding a brute-force O(N²) solution without identifying the underlying pattern.",
        "fix": "Pause for 60 seconds! Identify inputs, constraints (N ≤ 10^5 means O(N) or O(N log N) is required), and match with the 8 patterns.",
        "interviewTrap": "Question: 'What pattern should you use if asked to find the minimum capacity of a boat to ship packages within D days?' Answer: Binary Search on Answer! The capacity is monotonic: if capacity C works, any capacity > C also works. Search space is [max(weights), sum(weights)]."
      },
      "examCheatsheet": [
        "Contiguous subarray = Sliding Window",
        "Sorted array pair = Two Pointers",
        "Next greater element = Monotonic Stack",
        "Kth largest / Top K = Min-Heap of size K",
        "Shortest path in unweighted graph = BFS",
        "Minimize the maximum = Binary Search on Answer"
      ]
    },
    "visual": {
      "type": "flowchart",
      "title": "Interview Pattern Decision Matrix",
      "caption": "Map problem cues to the optimal algorithmic pattern in 30 seconds.",
      "visualKey": "dsa-interview-patterns",
      "details": {
        "comparison": {
          "headers": [
            "Problem Trigger / Keywords",
            "Algorithm Pattern",
            "Data Structure",
            "Optimal Time Complexity"
          ],
          "rows": [
            [
              "'Contiguous subarray', 'Longest substring'",
              "Sliding Window",
              "Hash Map / Set",
              "O(N)"
            ],
            [
              "'Sorted array', 'Two elements sum to X'",
              "Two Pointers",
              "Two Index Variables",
              "O(N)"
            ],
            [
              "'Next greater', 'Histogram', 'Stock span'",
              "Monotonic Stack",
              "Stack",
              "O(N)"
            ],
            [
              "'Top K elements', 'Kth smallest'",
              "Top-K Heap",
              "Min/Max PriorityQueue",
              "O(N log K)"
            ],
            [
              "'Shortest path', 'Level order'",
              "Breadth-First Search",
              "Queue (FIFO)",
              "O(V + E)"
            ],
            [
              "'Connected components', 'Cycle in graph'",
              "Disjoint Set Union",
              "DSU Array",
              "O(α(N)) ≈ O(1)"
            ]
          ]
        }
      }
    },
    "animation": {
      "type": "interactive-step-progression",
      "title": "Pattern Classification & Problem Matching",
      "description": "Step through 4 sample interview prompts and see how keywords map to the exact winning pattern.",
      "stepsTotal": 4
    },
    "codeSnippet": {
      "title": "Pattern Application: Monotonic Stack for Next Greater Element",
      "language": "python",
      "code": "def next_greater_element(nums):\n    # Pattern: Monotonic Decreasing Stack (O(N) time)\n    n = len(nums)\n    result = [-1] * n\n    stack = []  # Stores indices\n\n    for i in range(n):\n        # While current element is greater than stack top, we found its next greater!\n        while stack and nums[i] > nums[stack[-1]]:\n            idx = stack.pop()\n            result[idx] = nums[i]\n        stack.append(i)\n\n    return result\n\nvalues = [4, 5, 2, 25, 7, 8]\nprint(\"Input:\", values)\nprint(\"Next Greater Elements:\", next_greater_element(values))",
      "input": "nums = [4, 5, 2, 25, 7, 8]",
      "output": "Next Greater Elements: [5, 25, 25, -1, 8, -1]",
      "explanation": "Monotonic stack resolves Next Greater Element in single pass O(N) time and O(N) space, avoiding O(N²) nested scans."
    },
    "quiz": [
      {
        "id": "q1",
        "question": "Which pattern should you immediately consider when asked to find the 'Next Greater Element' or 'Daily Temperatures'?",
        "options": [
          "Two Pointers",
          "Monotonic Stack",
          "Trie",
          "Breadth-First Search"
        ],
        "correctIndex": 1,
        "explanation": "Monotonic Stack maintains elements in monotonic order, finding the next greater or smaller element in O(N) time."
      },
      {
        "id": "q2",
        "question": "To find the 'Kth Largest Element' in an unsorted array of size N, what heap configuration gives the optimal O(N log K) time?",
        "options": [
          "Max-Heap of size N",
          "Min-Heap of size K (the root will hold the Kth largest element)",
          "Binary Search Tree",
          "Two Stacks"
        ],
        "correctIndex": 1,
        "explanation": "A Min-Heap of size K discards smaller elements, keeping the K largest elements so the root is the Kth largest."
      },
      {
        "id": "q3",
        "question": "If a problem asks to 'minimize the maximum shipping capacity to deliver packages within D days', what pattern is triggered?",
        "options": [
          "Dynamic Programming Knapsack",
          "Binary Search on Answer Range",
          "Breadth-First Search",
          "Prefix Sum"
        ],
        "correctIndex": 1,
        "explanation": "The capacity condition is monotonic: if capacity C is valid, any C' > C is also valid. Binary search over the answer range [max(w), sum(w)] solves it in O(N log(Range))."
      }
    ]
  }
];
