const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m2 = getExistingDSALessons(2);
const m2Lessons = { ...m2.lessons };

// 7. Binary Search Variations
m2Lessons['dsa-arrays-binary-search-variations'] = {
  id: 'dsa-arrays-binary-search-variations',
  moduleId: 'dsa-module-2',
  title: 'Binary Search Variations',
  subtitle: 'Lower Bound, Upper Bound, First & Last Occurrences, and Range Boundaries',
  order: 7,
  readTimeMinutes: 28,
  difficulty: 'Intermediate',
  visualizerType: 'binary-search',
  objectives: [
    'Distinguish between exact match binary search and boundary-finding variations.',
    'Implement Lower Bound (bisect_left): first index where arr[i] >= target.',
    'Implement Upper Bound (bisect_right): first index where arr[i] > target.',
    'Find First and Last Occurrence of a target in sorted array with duplicates in O(log n).'
  ],
  prerequisites: [
    'Binary Search',
    'Understanding loop invariants and strict vs non-strict inequalities'
  ],
  analogy: {
    title: 'Finding the First and Last Edition in a Dated Archive',
    text: 'A library holds multiple copies of newspapers from the 1920s stacked in chronological order: [1920, 1922, 1925, 1925, 1925, 1925, 1928]. If a researcher asks for "The 1925 Edition", a basic binary search lands somewhere in the middle of the 1925 stack. But if you need to know where 1925 begins (first occurrence / lower bound) or where it ends (last occurrence), you cannot stop at the first match; you record the candidate index and deliberately keep searching to the left or right.',
    metaphor: 'Boundary search continues searching in the biased half even after finding a match.'
  },
  problemSolved: {
    title: 'Precision Range Queries on Arrays with Duplicates',
    description: 'Exact match binary search stops as soon as arr[mid] == target, which can return any arbitrary duplicate index. Boundary binary search guarantees finding the leftmost or rightmost index, enabling count of occurrences in O(log n) time via (upper_bound - lower_bound).',
    keyPoints: [
      'Finds first and last occurrences of duplicate elements',
      'Calculates frequency of an element in sorted array in O(log n)',
      'Finds floor, ceiling, and insertion points in sorted collections'
    ]
  },
  intuition: {
    overview: 'When arr[mid] == target, instead of returning mid immediately: for first occurrence, record ans = mid and push high = mid - 1. For last occurrence, record ans = mid and push low = mid + 1.',
    steps: [
      { step: 1, title: 'Left Boundary Search', description: 'If arr[mid] >= target, move left (high = mid - 1) to find earlier matches.' },
      { step: 2, title: 'Right Boundary Search', description: 'If arr[mid] <= target, move right (low = mid + 1) to find later matches.' },
      { step: 3, title: 'Range Derivation', description: 'Total duplicates = right_bound - left_bound + 1.' }
    ]
  },
  formalDefinition: {
    text: 'Lower bound: \\min \\{ i \\in [0, n] \\mid A[i] \\ge x \\}. Upper bound: \\min \\{ i \\in [0, n] \\mid A[i] > x \\}. Both operations partition the boolean predicate P(i) and locate the boundary in \\lceil \\log_2(n + 1) \\rceil steps.',
    latex: '\\text{LowerBound}(A, x) = \\arg\\min_{0 \\le i \\le n} (A[i] \\ge x)'
  },
  complexity: {
    overview: 'Time: O(log n) for both lower and upper bound searches. Space: O(1).',
    cases: [
      { case: 'Best', time: 'O(log n)', space: 'O(1)', explanation: 'Always performs full log2(n) boundary convergence.' },
      { case: 'Average', time: 'O(log n)', space: 'O(1)', explanation: 'Divides search space in half at each iteration.' },
      { case: 'Worst', time: 'O(log n)', space: 'O(1)', explanation: 'Logarithmic bound guaranteed even with all elements identical.' }
    ],
    spaceNote: 'Iterative implementation uses strictly O(1) auxiliary space.'
  },
  workedExample: {
    title: 'Finding First and Last Occurrence of 8 in [5, 7, 7, 8, 8, 8, 10]',
    input: 'arr = [5, 7, 7, 8, 8, 8, 10], target = 8',
    steps: [
      { step: 1, action: 'First Occurrence Search', state: 'mid=3 (arr[3]=8)', explanation: 'Match found at index 3. Save ans=3. Search left half: high = 2.' },
      { step: 2, action: 'Left Halving', state: 'mid=1 (arr[1]=7)', explanation: '7 < 8 -> low = 2. mid=2 (arr[2]=7) -> low = 3. Search terminates. First = 3.' },
      { step: 3, action: 'Last Occurrence Search', state: 'mid=3 (arr[3]=8)', explanation: 'Match found at index 3. Save ans=3. Search right half: low = 4.' },
      { step: 4, action: 'Right Halving', state: 'mid=5 (arr[5]=8)', explanation: 'Match found at index 5. Save ans=5. Search right: low = 6. mid=6 (arr[6]=10) -> high=5. Last = 5.' }
    ],
    finalOutput: 'Target 8 occupies index range [3, 5] (count = 3 elements).'
  },
  visualExplanation: {
    title: 'Boolean Predicate Transition Boundary',
    description: 'Transforming array into boolean evaluations [F, F, F, T, T, T]. Binary search finds the exact transition point where False switches to True in O(log n) steps.',
    features: ['Monotonic boolean predicate', 'Leftward bias for lower bound', 'Rightward bias for upper bound']
  },
  pseudocode: {
    title: 'Lower Bound (First Occurrence)',
    code: `def find_first(arr, target):
    low = 0
    high = len(arr) - 1
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            ans = mid
            high = mid - 1 # Keep looking left!
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return ans`
  },
  pythonCode: {
    title: 'Search Range (First and Last Position) in Python',
    code: `def search_range(nums, target):
    def find_bound(is_first):
        l, r = 0, len(nums) - 1
        ans = -1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                ans = mid
                if is_first:
                    r = mid - 1 # Look left
                else:
                    l = mid + 1 # Look right
            elif nums[mid] < target:
                l = mid + 1
            else:
                r = mid - 1
        return ans

    return [find_bound(True), find_bound(False)]

# Test
arr = [5, 7, 7, 8, 8, 8, 10]
print("Range for 8:", search_range(arr, 8)) # Output: [3, 5]
print("Range for 6:", search_range(arr, 6)) # Output: [-1, -1]`,
    explanation: 'Uses a parameterized helper function to find both boundaries in 2 * log2(n) = O(log n) time.'
  },
  runnableCode: {
    code: `def lower_bound(nums, target):
    # Returns first index where nums[i] >= target
    low, high = 0, len(nums)
    while low < high:
        mid = (low + high) // 2
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid
    return low

data = [10, 20, 30, 30, 30, 40, 50]
print("Lower bound of 30 (first >= 30):", lower_bound(data, 30))
print("Lower bound of 35 (insertion point):", lower_bound(data, 35))`,
    expectedOutput: 'Lower bound of 30 (first >= 30): 2\nLower bound of 35 (insertion point): 5'
  },
  lineByLineExplanation: [
    { lines: '3', codeSnippet: 'low, high = 0, len(nums)', explanation: 'Uses half-open interval [low, high) allowing insertion point at index n.' },
    { lines: '6-9', codeSnippet: 'if nums[mid] < target:\n    low = mid + 1\nelse:\n    high = mid', explanation: 'Maintains invariant that answer is always within [low, high).' },
    { lines: '10', codeSnippet: 'return low', explanation: 'When low == high, points exactly to the first element >= target.' }
  ],
  edgeCases: [
    { case: 'Target smaller than all elements', handling: 'Lower bound returns index 0.', example: 'arr = [10, 20], target = 5 -> 0' },
    { case: 'Target larger than all elements', handling: 'Lower bound returns index n (length of array).', example: 'arr = [10, 20], target = 50 -> 2' }
  ],
  commonMistakes: [
    { mistake: 'Using mid = (low + high) // 2 without considering integer overflow in other languages.', solution: 'In C/C++ or Java, use low + (high - low) // 2.' },
    { mistake: 'Stopping on first match in an array with duplicate elements.', solution: 'Must continue loop until bounds cross to locate the exact extremity.' }
  ],
  applications: [
    { industry: 'Database Query Engines', application: 'B+ Tree Range Scans', benefit: 'Locates start of range with lower bound and scans forward until upper bound.' },
    { industry: 'Financial Trading', application: 'Order Book Price Level Matching', benefit: 'Finds nearest bid/ask price bucket in sub-microsecond logarithmic time.' }
  ],
  practiceQuestions: [
    { id: 'dsa-2-7-q1', question: 'How can you calculate the count of occurrences of target in a sorted array in O(log n)?', hint: 'Combine upper bound and lower bound.', answer: 'Count = upper_bound(target) - lower_bound(target). If target does not exist, both bounds equal the same insertion index, yielding count = 0.' },
    { id: 'dsa-2-7-q2', question: 'What does bisect_left([1, 2, 4, 4, 5], 4) return in Python?', hint: 'First occurrence of 4.', answer: 'Index 2, which is the first position containing 4.' },
    { id: 'dsa-2-7-q3', question: 'What does bisect_right([1, 2, 4, 4, 5], 4) return in Python?', hint: 'Index after the last 4.', answer: 'Index 4 (the position of element 5), representing the insertion point after all existing 4s.' }
  ],
  quiz: [
    {
      id: 'dsa-2-7-quiz-1',
      question: 'What is the definition of the Lower Bound of a target value in a sorted array?',
      options: [
        'The first index i where arr[i] >= target',
        'The last index where arr[i] == target',
        'The smallest element in the entire array',
        'The index where target is strictly less than arr[i]'
      ],
      correctIndex: 0,
      explanation: 'Lower bound (bisect_left) returns the first position where an element is greater than or equal to the target.'
    },
    {
      id: 'dsa-2-7-quiz-2',
      question: 'When searching for the FIRST occurrence of a target and arr[mid] == target, what adjustment is made?',
      options: [
        'high = mid - 1 (continue searching left half)',
        'low = mid + 1 (continue searching right half)',
        'return mid immediately',
        'break the loop'
      ],
      correctIndex: 0,
      explanation: 'To find the first occurrence, record candidate mid and shift the upper bound high = mid - 1 to explore if earlier matches exist.'
    },
    {
      id: 'dsa-2-7-quiz-3',
      question: 'What is the runtime of finding the number of occurrences of an element in a sorted array of size 1,000,000 using boundary binary search?',
      options: ['~40 comparisons (2 * log2(10^6))', '1,000,000 comparisons', '500,000 comparisons', 'O(1)'],
      correctIndex: 0,
      explanation: 'Two binary searches (first and last occurrence) take 2 * 20 ≈ 40 comparisons total, operating in O(log n) time.'
    }
  ],
  codingChallenge: {
    title: 'Search Insert Position',
    problem: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. Solve in O(log n) time.',
    starterCode: `def search_insert(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return low

print(search_insert([1, 3, 5, 6], 5)) # Expected: 2
print(search_insert([1, 3, 5, 6], 2)) # Expected: 1
print(search_insert([1, 3, 5, 6], 7)) # Expected: 4`,
    solution: `def search_insert(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return low

print(search_insert([1, 3, 5, 6], 5))`,
    hints: [
      'Standard binary search: when target is found, return mid.',
      'If loop terminates without finding target, low points to the exact insertion index.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Binary search variations locate boundaries rather than stopping at arbitrary matches.',
      'Lower bound finds first index >= target; Upper bound finds first index > target.',
      'Occurrence count in sorted array is upper_bound - lower_bound in O(log n).',
      'The terminating index `low` in a standard failed search is the exact sorted insertion point.'
    ],
    nextLessonId: 'dsa-arrays-rotated',
    nextLessonTitle: 'Search in Rotated Sorted Arrays',
    nextLessonModuleId: 'dsa-module-2'
  }
};

// 8. Search in Rotated Sorted Array
m2Lessons['dsa-arrays-rotated'] = {
  id: 'dsa-arrays-rotated',
  moduleId: 'dsa-module-2',
  title: 'Search in Rotated Sorted Arrays',
  subtitle: 'Partition Invariants and Modified Binary Search in O(log n)',
  order: 8,
  readTimeMinutes: 25,
  difficulty: 'Advanced',
  visualizerType: 'binary-search',
  objectives: [
    'Analyze the geometric structure of a rotated sorted array.',
    'Prove that dividing a rotated sorted array in half always produces at least one normally sorted half.',
    'Determine target containment within the sorted half to prune half the search space.',
    'Handle duplicate elements where arr[low] == arr[mid] == arr[high] in O(n) degraded case.'
  ],
  prerequisites: [
    'Binary Search',
    'Binary Search Variations'
  ],
  analogy: {
    title: 'The Sliced Ring Binder',
    text: 'Imagine a dictionary sliced at the letter "M" and stacked back-to-back: [M through Z] followed by [A through L]. The book is no longer sorted globally, but if you crack it open at any page, at least one of the two halves in your hands is guaranteed to be in perfect alphabetical order. If your target word fits between the first and last word of the sorted half, you search there; otherwise, you discard it and search the other disordered half.',
    metaphor: 'At any midpoint, at least one half is strictly sorted. Check if target lies within that half.'
  },
  problemSolved: {
    title: 'Logarithmic Search Across Discontinuous Monotonic Segments',
    description: 'When a sorted array is rotated at an unknown pivot, a naive search takes O(n) linear scan. Modified binary search restores O(log n) efficiency by identifying the sorted half at every step.',
    keyPoints: [
      'Achieves O(log n) without finding the pivot index first',
      'Uses sorted boundary check: arr[low] <= arr[mid]',
      'Underpins circular buffers and distributed consistent hash ring lookups'
    ]
  },
  intuition: {
    overview: 'Divide at mid. Check whether left half [low..mid] is sorted (arr[low] <= arr[mid]). If it is sorted, check if target falls in [arr[low]..arr[mid]]. If yes, search left; if no, search right.',
    steps: [
      { step: 1, title: 'Find Midpoint', description: 'mid = (low + high) // 2.' },
      { step: 2, title: 'Identify Sorted Half', description: 'If arr[low] <= arr[mid], the left half is sorted. Otherwise, the right half is sorted.' },
      { step: 3, title: 'Containment Test', description: 'Check if target lies inside the boundaries of the sorted half.' },
      { step: 4, title: 'Prune Search Space', description: 'Discard the non-containing half and repeat.' }
    ]
  },
  formalDefinition: {
    text: 'A rotated sorted array is formed by shifting an initially sorted array A by k positions: A\'[i] = A[(i + k) mod n]. For any index mid, either A[low..mid] or A[mid..high] is monotonically non-decreasing.',
    latex: 'A[low] \\le A[mid] \\implies A[low..mid] \\text{ is sorted}'
  },
  complexity: {
    overview: 'Distinct elements: O(log n) time, O(1) space. With duplicates: worst-case O(n) when all elements match.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Target is located at initial midpoint.' },
      { case: 'Average', time: 'O(log n)', space: 'O(1)', explanation: 'Search space halved at each step.' },
      { case: 'Worst', time: 'O(log n) [distinct] / O(n) [duplicates]', space: 'O(1)', explanation: 'If arr[low] == arr[mid] == arr[high], can only shrink bounds by 1.' }
    ],
    spaceNote: 'Operates in-place with O(1) space.'
  },
  workedExample: {
    title: 'Searching for 0 in Rotated Array [4, 5, 6, 7, 0, 1, 2]',
    input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0',
    steps: [
      { step: 1, action: 'Step 1', state: 'low=0 (4), high=6 (2), mid=3 (7)', explanation: 'arr[low]=4 <= arr[mid]=7 -> Left half [4..7] is sorted. Is 0 in [4..7]? No! Search right: low = 4.' },
      { step: 2, action: 'Step 2', state: 'low=4 (0), high=6 (2), mid=5 (1)', explanation: 'arr[low]=0 <= arr[mid]=1 -> Left half [0..1] is sorted. Is 0 in [0..1]? Yes (0 <= 0 <= 1)! Search left: high = 5.' },
      { step: 3, action: 'Step 3', state: 'low=4 (0), high=5 (1), mid=4 (0)', explanation: 'arr[4] == 0 -> Match found! Return index 4.' }
    ],
    finalOutput: 'Target 0 found at index 4 in 3 iterations.'
  },
  visualExplanation: {
    title: 'Two Parallel Slanted Line Segments',
    description: 'A plot of indices vs values shows two parallel rising slopes separated by a cliff drop. Midpoint either lands on the high slope or low slope. The half that doesn’t contain the cliff is strictly sorted.',
    features: ['High slope segment', 'Discontinuity cliff drop', 'Low slope segment']
  },
  pseudocode: {
    title: 'Search Rotated Sorted Array',
    code: `def search_rotated(nums, target):
    low = 0, high = len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target: return mid
        # Left half sorted
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        # Right half sorted
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1`
  },
  pythonCode: {
    title: 'Search in Rotated Sorted Array in Python',
    code: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target:
            return mid

        # Check if left half is sorted
        if nums[l] <= nums[mid]:
            if nums[l] <= target < nums[mid]:
                r = mid - 1
            else:
                l = mid + 1
        # Right half must be sorted
        else:
            if nums[mid] < target <= nums[r]:
                l = mid + 1
            else:
                r = mid - 1
    return -1

# Test
arr = [4, 5, 6, 7, 0, 1, 2]
print("Index of 0:", search(arr, 0)) # Expected: 4
print("Index of 3:", search(arr, 3)) # Expected: -1`,
    explanation: 'Demonstrates partition checks without requiring a separate pass to locate the pivot.'
  },
  runnableCode: {
    code: `def find_pivot(nums):
    # Returns index of minimum element
    low, high = 0, len(nums) - 1
    while low < high:
        mid = (low + high) // 2
        if nums[mid] > nums[high]:
            low = mid + 1
        else:
            high = mid
    return low

arr = [4, 5, 6, 7, 0, 1, 2]
p_idx = find_pivot(arr)
print(f"Pivot (minimum element {arr[p_idx]}) is at index: {p_idx}")`,
    expectedOutput: 'Pivot (minimum element 0) is at index: 4'
  },
  lineByLineExplanation: [
    { lines: '5', codeSnippet: 'if nums[mid] > nums[high]: low = mid + 1', explanation: 'If mid element is greater than high element, the cliff (pivot) must be in right half.' },
    { lines: '7-8', codeSnippet: 'else: high = mid', explanation: 'Otherwise, minimum is at or to the left of mid.' }
  ],
  edgeCases: [
    { case: 'Array not rotated (k = 0)', handling: 'nums[l] <= nums[mid] holds globally; acts as standard binary search.', example: '[1, 2, 3, 4, 5]' },
    { case: 'Duplicates allowed (e.g. [1, 0, 1, 1, 1])', handling: 'When nums[l] == nums[mid] == nums[r], increment l and decrement r.', example: 'Degrades to O(n)' }
  ],
  commonMistakes: [
    { mistake: 'Using strict inequality nums[l] < nums[mid] for sorted check.', solution: 'Must use <= because when l == mid (2-element array), the single element is sorted.' },
    { mistake: 'Forgetting to check both boundaries in containment test.', solution: 'Must check nums[l] <= target and target < nums[mid].' }
  ],
  applications: [
    { industry: 'Distributed Systems', application: 'Consistent Hashing Ring (Chord DHT)', benefit: 'Searches node responsibilities across circular hash rings in O(log N) time.' },
    { industry: 'Operating Systems', application: 'Circular Log Buffers', benefit: 'Searches timestamped events in ring buffers without requiring array reorganization.' }
  ],
  practiceQuestions: [
    { id: 'dsa-2-8-q1', question: 'How can you find the minimum element in a rotated sorted array in O(log n)?', hint: 'Compare arr[mid] with arr[high].', answer: 'If arr[mid] > arr[high], the inflection point lies in the right half (low = mid + 1). Else, high = mid. Terminate when low == high.' },
    { id: 'dsa-2-8-q2', question: 'Why does allowing duplicates cause worst-case time to degrade to O(n)?', hint: 'Consider [1, 1, 1, 0, 1].', answer: 'When arr[low] == arr[mid] == arr[high], it is impossible to determine whether the pivot is in the left or right half without linearly pruning bounds (low++, high--).' },
    { id: 'dsa-2-8-q3', question: 'How many rotations k occurred if the minimum element is at index 4 in an array of size 7?', hint: 'Where was the minimum originally?', answer: 'Originally the minimum was at index 0. Moving to index 4 means the array was rotated right by 4 positions.' }
  ],
  quiz: [
    {
      id: 'dsa-2-8-quiz-1',
      question: 'What mathematical property ensures that modified binary search works on a rotated sorted array?',
      options: [
        'At least one half [low..mid] or [mid..high] is always strictly sorted',
        'The array is always symmetric',
        'The median is always at index n // 2',
        'All elements sum to zero'
      ],
      correctIndex: 0,
      explanation: 'Because the original array had only a single ascending slope, cutting it in half leaves at most one discontinuity; the other half is guaranteed to be sorted.'
    },
    {
      id: 'dsa-2-8-quiz-2',
      question: 'In a rotated sorted array with distinct elements, how do you verify if the left half [low..mid] is sorted?',
      options: [
        'nums[low] <= nums[mid]',
        'nums[mid] <= nums[high]',
        'nums[low] == nums[high]',
        'nums[mid] == target'
      ],
      correctIndex: 0,
      explanation: 'If the value at low is less than or equal to the value at mid, no cliff drop occurred in that range, proving the left half is sorted.'
    },
    {
      id: 'dsa-2-8-quiz-3',
      question: 'What is the worst-case time complexity of searching a rotated sorted array containing duplicate values?',
      options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
      correctIndex: 0,
      explanation: 'When nums[low] == nums[mid] == nums[high], we cannot eliminate half the array and can only advance pointers by 1, degrading to O(n) worst case.'
    }
  ],
  codingChallenge: {
    title: 'Find Minimum in Rotated Sorted Array',
    problem: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the array nums of unique elements, return the minimum element of this array in O(log n) time.',
    starterCode: `def find_min(nums):
    low = 0
    high = len(nums) - 1
    while low < high:
        mid = (low + high) // 2
        # If mid > high, inflection point is on the right
        if nums[mid] > nums[high]:
            low = mid + 1
        else:
            high = mid
    return nums[low]

print(find_min([3, 4, 5, 1, 2]))       # Expected: 1
print(find_min([4, 5, 6, 7, 0, 1, 2])) # Expected: 0
print(find_min([11, 13, 15, 17]))       # Expected: 11`,
    solution: `def find_min(nums):
    low = 0
    high = len(nums) - 1
    while low < high:
        mid = (low + high) // 2
        if nums[mid] > nums[high]:
            low = mid + 1
        else:
            high = mid
    return nums[low]

print(find_min([3, 4, 5, 1, 2]))`,
    hints: [
      'Compare nums[mid] against nums[high].',
      'If nums[mid] > nums[high], the minimum must be strictly to the right of mid: low = mid + 1.',
      'Otherwise, nums[mid] <= nums[high], meaning mid could be the minimum or minimum is left: high = mid.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Dividing a rotated sorted array always yields at least one cleanly sorted half.',
      'Check if target falls within the bounds of the sorted half to eliminate half the array.',
      'Runs in O(log n) time and O(1) space on distinct inputs.',
      'Duplicate elements degrade performance to O(n) in the worst case.'
    ],
    nextLessonId: 'dsa-arrays-matrix',
    nextLessonTitle: 'Matrix Traversal and Algorithms',
    nextLessonModuleId: 'dsa-module-2'
  }
};

// 9. Matrix Traversal and Algorithms
m2Lessons['dsa-arrays-matrix'] = {
  id: 'dsa-arrays-matrix',
  moduleId: 'dsa-module-2',
  title: 'Matrix Traversal and Algorithms',
  subtitle: '2D Arrays, Row/Column-Major Order, Spiral Traversal & In-Place Rotation',
  order: 9,
  readTimeMinutes: 28,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Understand Row-Major vs Column-Major 2D memory layouts in hardware RAM.',
    'Implement Spiral Matrix traversal using 4 bounding pointer limits.',
    'Rotate an N x N matrix 90 degrees clockwise in-place with O(1) extra space.',
    'Search a row-wise and column-wise sorted 2D matrix in O(m + n) time.'
  ],
  prerequisites: [
    'Array Operations and Memory Layout',
    'Nested loop traversals'
  ],
  analogy: {
    title: 'The Peeling Onion / Spiraling Labyrinth',
    text: 'Navigating a walled palace maze from the outer perimeter to the center throne room requires walking the outer boundary wall clockwise: top wall left-to-right, right wall top-to-bottom, bottom wall right-to-left, and left wall bottom-to-top. Once that outer circuit is completed, you step inward by 1 meter on all 4 sides, effectively shrinking the boundary box, and repeat the clockwise circuit until the entire interior is visited.',
    metaphor: 'Spiral matrix traversal maintains 4 boundary walls (top, bottom, left, right) that shrink inwards after each edge is traversed.'
  },
  problemSolved: {
    title: '2D Spatial Manipulation with Cache Efficiency',
    description: 'Hardware memory is strictly linear (1D). Understanding how 2D matrices map into 1D addresses prevents cache-thrashing disasters (row-major vs column-major iteration speed differences of over 10x) and enables in-place image rotations.',
    keyPoints: [
      'Row-major address formula: Loc(A[i][j]) = Base + (i * cols + j) * size',
      'In-place 90-degree matrix rotation: Transpose + Reverse Rows',
      'Staircase search across sorted matrices in O(m + n) time'
    ]
  },
  intuition: {
    overview: 'To rotate a matrix 90 degrees clockwise in-place: first transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row horizontally.',
    steps: [
      { step: 1, title: 'Transpose Matrix', description: 'Reflect elements across the main diagonal (swap (i, j) with (j, i) for j > i).' },
      { step: 2, title: 'Horizontal Reflection', description: 'Reverse each row in-place using two pointers.' },
      { step: 3, title: 'Result Verification', description: 'Matrix is rotated 90 degrees clockwise in strictly O(1) auxiliary space.' }
    ]
  },
  formalDefinition: {
    text: 'A 2D matrix M of dimensions m x n in row-major order maps element M[i][j] to 1D index i * n + j. A 90-degree clockwise rotation R transforms coordinates according to: R(i, j) = (j, n - 1 - i). This transformation decomposes into Transpose followed by horizontal Row Reversal: (i, j) -> (j, i) -> (j, n - 1 - i).',
    latex: '\\text{Loc}(M[i][j]) = \\text{Base} + (i \\cdot n + j) \\cdot w, \\quad R_{90}(M) = \\text{ReverseRows}(\\text{Transpose}(M))'
  },
  complexity: {
    overview: 'Traversal: O(m * n) time. Search in sorted matrix: O(m + n) time. Rotate in-place: O(n^2) time, O(1) space.',
    cases: [
      { case: 'Best', time: 'O(1) [Search] / O(m*n) [Traversal]', space: 'O(1)', explanation: 'Target found at top-right corner immediately.' },
      { case: 'Average', time: 'O(m + n) [Search]', space: 'O(1)', explanation: 'Steps left or down from top-right corner.' },
      { case: 'Worst', time: 'O(m + n) [Search]', space: 'O(1)', explanation: 'Traverses maximum perimeter path m + n.' }
    ],
    spaceNote: 'In-place matrix rotations use strictly O(1) auxiliary space.'
  },
  workedExample: {
    title: 'Rotating 3x3 Matrix 90 Degrees Clockwise In-Place',
    input: 'Matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]',
    steps: [
      { step: 1, action: 'Transpose across diagonal', state: '[[1, 4, 7], [2, 5, 8], [3, 6, 9]]', explanation: 'Swap (0,1) with (1,0), (0,2) with (2,0), and (1,2) with (2,1).' },
      { step: 2, action: 'Reverse each row', state: '[[7, 4, 1], [8, 5, 2], [9, 6, 3]]', explanation: 'Reverse row 0: [1,4,7] -> [7,4,1]. Reverse row 1: [2,5,8] -> [8,5,2]. Reverse row 2: [3,6,9] -> [9,6,3].' }
    ],
    finalOutput: 'Final rotated matrix: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]'
  },
  visualExplanation: {
    title: 'The Staircase Search in a 2D Sorted Matrix',
    description: 'Starting at the top-right corner (row 0, col n-1): if current element > target, move LEFT (column is eliminated). If current element < target, move DOWN (row is eliminated). Each step prunes a full row or column.',
    features: ['Top-right starting vantage', 'Pruning full columns leftward', 'Pruning full rows downward']
  },
  pseudocode: {
    title: 'Spiral Order Traversal',
    code: `def spiral_order(matrix):
    top = 0, bottom = len(matrix) - 1
    left = 0, right = len(matrix[0]) - 1
    result = []
    while top <= bottom and left <= right:
        for c in range(left, right + 1): result.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1): result.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1): result.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1): result.append(matrix[r][left])
            left += 1
    return result`
  },
  pythonCode: {
    title: 'Rotate Image 90 Degrees Clockwise In-Place in Python',
    code: `def rotate_matrix(matrix):
    n = len(matrix)
    # Step 1: Transpose in-place
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Step 2: Reverse each row in-place
    for i in range(n):
        matrix[i].reverse()
    return matrix

mat = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
rotate_matrix(mat)
print("Rotated 90 degrees:")
for row in mat:
    print(row)`,
    explanation: 'Combines diagonal transposition with row reversal to rotate in-place with O(1) extra space.'
  },
  runnableCode: {
    code: `def search_matrix(matrix, target):
    # Staircase search: start top-right
    r, c = 0, len(matrix[0]) - 1
    while r < len(matrix) and c >= 0:
        val = matrix[r][c]
        if val == target:
            return True, (r, c)
        elif val > target:
            c -= 1 # Move left
        else:
            r += 1 # Move down
    return False, (-1, -1)

grid = [
    [1,  4,  7, 11],
    [2,  5,  8, 12],
    [3,  6,  9, 16],
    [10, 13, 14, 17]
]
found, pos = search_matrix(grid, 9)
print(f"Found 9: {found} at coordinates {pos}")`,
    expectedOutput: 'Found 9: True at coordinates (2, 2)'
  },
  lineByLineExplanation: [
    { lines: '3', codeSnippet: 'r, c = 0, len(matrix[0]) - 1', explanation: 'Starts at top-right corner to maintain dual pruning directions.' },
    { lines: '7-10', codeSnippet: 'elif val > target: c -= 1\nelse: r += 1', explanation: 'Eliminates entire column if too large, eliminates entire row if too small in O(1).' }
  ],
  edgeCases: [
    { case: '1x1 Matrix', handling: 'Single element returned without boundary issues.', example: '[[5]]' },
    { case: 'Rectangular matrix (m != n)', handling: 'Spiral traversal correctly terminates; 90-degree in-place rotation is only possible on square N x N matrices.', example: '3 x 5 matrix' }
  ],
  commonMistakes: [
    { mistake: 'Iterating column-first in row-major memory languages (C/C++/Python).', solution: 'Always iterate rows outer and columns inner to maintain CPU cache line spatial locality.' },
    { mistake: 'In spiral matrix, missing the if top <= bottom boundary check before bottom row scan.', solution: 'Prevents double-printing the same row on odd-height rectangular matrices.' }
  ],
  applications: [
    { industry: 'Image Processing & Computer Vision', application: 'Image Rotation & Convolution Filtering', benefit: 'Applies 90/180/270 degree rotations and 2D spatial Sobel/Gaussian convolution kernels.' },
    { industry: 'Geospatial Mapping (GIS)', application: 'Digital Elevation Models (DEM)', benefit: 'Queries terrain slope elevation grids and contour paths in memory.' }
  ],
  practiceQuestions: [
    { id: 'dsa-2-9-q1', question: 'Why does iterating matrix[col][row] run up to 10x slower than matrix[row][col] in C or Python?', hint: 'Think about CPU cache lines and row-major layout.', answer: 'In row-major order, consecutive row elements are adjacent in RAM. Accessing column-wise jumps across entire rows in memory (strided access), causing a cache miss on almost every read.' },
    { id: 'dsa-2-9-q2', question: 'How can you rotate a matrix 90 degrees counter-clockwise in-place?', hint: 'Transpose plus vertical flip or row reverse.', answer: 'Either Transpose then reverse columns vertically, or reverse rows horizontally then Transpose.' },
    { id: 'dsa-2-9-q3', question: 'What is the time complexity of searching an m x n row-and-column sorted matrix using the top-right staircase search?', hint: 'How many steps can you take down and left?', answer: 'O(m + n). At each step we either increment row (at most m times) or decrement col (at most n times).' }
  ],
  quiz: [
    {
      id: 'dsa-2-9-quiz-1',
      question: 'Which two geometric operations combined achieve a 90-degree clockwise in-place matrix rotation?',
      options: [
        'Transpose the matrix across the diagonal, then reverse each row horizontally',
        'Invert all values, then swap row 0 with row n-1',
        'Shift elements cyclically by 1 position',
        'Sort every row, then sort every column'
      ],
      correctIndex: 0,
      explanation: 'Transposing swaps (i, j) with (j, i); reversing each row maps (j, i) to (j, n - 1 - i), which exactly equals a 90-degree clockwise rotation.'
    },
    {
      id: 'dsa-2-9-quiz-2',
      question: 'What is the time complexity of the staircase search in an m x n matrix where rows and columns are sorted in ascending order?',
      options: ['O(m + n)', 'O(m * n)', 'O(log(m * n))', 'O(1)'],
      correctIndex: 0,
      explanation: 'Starting at the top-right corner, each comparison moves either one step left or one step down, traversing at most m + n elements.'
    },
    {
      id: 'dsa-2-9-quiz-3',
      question: 'In a row-major 2D array with 10 columns, what is the 1D index offset of element matrix[3][4]?',
      options: ['34 (3 * 10 + 4)', '7 (3 + 4)', '43 (4 * 10 + 3)', '12 (3 * 4)'],
      correctIndex: 0,
      explanation: 'Under row-major order, offset = row * total_columns + col = 3 * 10 + 4 = 34.'
    }
  ],
  codingChallenge: {
    title: 'Spiral Matrix Generation',
    problem: 'Given a positive integer n, generate an n x n matrix filled with elements from 1 to n^2 in spiral order.',
    starterCode: `def generate_matrix(n):
    matrix = [[0] * n for _ in range(n)]
    top, bottom = 0, n - 1
    left, right = 0, n - 1
    num = 1

    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            matrix[top][c] = num
            num += 1
        top += 1
        for r in range(top, bottom + 1):
            matrix[r][right] = num
            num += 1
        right -= 1
        for c in range(right, left - 1, -1):
            matrix[bottom][c] = num
            num += 1
        bottom -= 1
        for r in range(bottom, top - 1, -1):
            matrix[r][left] = num
            num += 1
        left += 1

    return matrix

res = generate_matrix(3)
for row in res:
    print(row)
# Expected:
# [1, 2, 3]
# [8, 9, 4]
# [7, 6, 5]`,
    solution: `def generate_matrix(n):
    matrix = [[0] * n for _ in range(n)]
    top, bottom = 0, n - 1
    left, right = 0, n - 1
    num = 1

    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            matrix[top][c] = num
            num += 1
        top += 1
        for r in range(top, bottom + 1):
            matrix[r][right] = num
            num += 1
        right -= 1
        for c in range(right, left - 1, -1):
            matrix[bottom][c] = num
            num += 1
        bottom -= 1
        for r in range(bottom, top - 1, -1):
            matrix[r][left] = num
            num += 1
        left += 1

    return matrix

res = generate_matrix(3)`,
    hints: [
      'Initialize boundary walls top=0, bottom=n-1, left=0, right=n-1.',
      'Fill top row left-to-right, then right column top-to-bottom, then bottom row right-to-left, then left column bottom-to-top.',
      'Increment num from 1 to n^2.'
    ]
  },
  summary: {
    keyTakeaways: [
      '2D matrices are flattened into 1D memory; row-major iteration maximizes cache hits.',
      '90-degree clockwise rotation = Transpose + Reverse Rows in-place.',
      'Sorted 2D matrix search executes in O(m + n) from top-right corner.',
      'Spiral traversal maintains 4 contracting boundary limits.'
    ],
    nextLessonId: 'dsa-strings-operations',
    nextLessonTitle: 'String Representation and Operations',
    nextLessonModuleId: 'dsa-module-3'
  }
};

// Write out Module 2 fully complete
writeModuleFile(path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-2.ts'), m2.data, m2Lessons);
console.log('Successfully completed DSA Module 2! Total authored:', Object.keys(m2Lessons).length);
