const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m2 = getExistingDSALessons(2);
const m2Lessons = { ...m2.lessons };

// Keep existing dsa-arrays-operations and dsa-arrays-prefix-sums from author-dsa-2
require('./author-dsa-2');
const updatedM2 = getExistingDSALessons(2);
Object.assign(m2Lessons, updatedM2.lessons);

// 3. Two Pointers
m2Lessons['dsa-arrays-two-pointers'] = {
  id: 'dsa-arrays-two-pointers',
  moduleId: 'dsa-module-2',
  title: 'Two Pointer Technique',
  subtitle: 'Converging and Parallel Pointers for O(n) Search and Optimization',
  order: 3,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'binary-search',
  objectives: [
    'Master converging two-pointer patterns from opposite ends of a sorted array.',
    'Implement parallel (fast/slow) runner pointers for in-place deduplication.',
    'Solve Container With Most Water and Two Sum II in O(n) time and O(1) space.',
    'Prove correctness using monotonic invariant arguments.'
  ],
  prerequisites: [
    'Array Operations and Memory Layout',
    'Understanding sorted array monotonicity'
  ],
  analogy: {
    title: 'Two Measuring Tapes Converging on a Field',
    text: 'Imagine two surveyors walking toward each other from opposite borders of a farm to find the center line. Instead of one person measuring every plot from left to right (an exhaustive scan), both walk inwards simultaneously. At each step, if the left measurement is too short, the left surveyor steps forward; if too long, the right surveyor steps back. They meet in the middle in linear time without taking a single redundant step.',
    metaphor: 'Two pointers prune an entire row or column of pairwise comparisons at each step using sorted monotonicity.'
  },
  problemSolved: {
    title: 'Reducing O(n^2) Pair Exhaustion to O(n) Single-Pass',
    description: 'Finding pairs that satisfy a condition (like summing to a target) naively requires testing all n(n-1)/2 pairs in O(n^2). When an array is sorted, the sum changes monotonically when moving left or right pointers, enabling an optimal O(n) single pass.',
    keyPoints: [
      'Eliminates nested loops by utilizing order invariants',
      'Requires zero extra memory: strictly O(1) auxiliary space',
      'Underpins 3Sum, 4Sum, Trapping Rain Water, and partitioning'
    ]
  },
  intuition: {
    overview: 'Start left pointer at 0 and right pointer at n - 1. Sum = arr[left] + arr[right]. If sum < target, left++ to increase sum. If sum > target, right-- to decrease sum.',
    steps: [
      { step: 1, title: 'Initialize Boundaries', description: 'left = 0, right = len(arr) - 1.' },
      { step: 2, title: 'Evaluate Invariant', description: 'Compare current pair evaluation against target threshold.' },
      { step: 3, title: 'Monotonic Adjustment', description: 'Increment left to strictly increase, decrement right to strictly decrease.' },
      { step: 4, title: 'Convergence Termination', description: 'Stop when left >= right.' }
    ]
  },
  formalDefinition: {
    text: 'Let A be a monotonically non-decreasing array. The two-pointer search invariant ensures that at state (left, right), all pairs (i, j) with i < left or j > right cannot contain the optimal target solution, eliminating the search space in at most n steps.',
    latex: '\\text{If } A[l] + A[r] < K \\implies \\forall j \\le r, A[l] + A[j] < K \\implies l \\leftarrow l + 1'
  },
  complexity: {
    overview: 'Time: O(n) because each iteration increments left or decrements right. Space: O(1).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Boundary elements at 0 and n-1 immediately satisfy condition.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Pointers meet near middle after examining n/2 elements.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Pointers traverse entire array before meeting or exhausting search.' }
    ],
    spaceNote: 'Does not allocate any auxiliary heap memory.'
  },
  workedExample: {
    title: 'Finding Target 9 in Sorted Array [2, 3, 5, 7, 11, 15]',
    input: 'arr = [2, 3, 5, 7, 11, 15], target = 9',
    steps: [
      { step: 1, action: 'Check Bounds', state: 'left=0 (2), right=5 (15) -> Sum = 17', explanation: '17 > 9 -> Sum too large, decrement right.' },
      { step: 2, action: 'Step Leftward', state: 'left=0 (2), right=4 (11) -> Sum = 13', explanation: '13 > 9 -> Sum too large, decrement right.' },
      { step: 3, action: 'Step Leftward', state: 'left=0 (2), right=3 (7) -> Sum = 9', explanation: '9 == 9 -> Match! Return indices (0, 3) corresponding to elements 2 and 7.' }
    ],
    finalOutput: 'Pair (2, 7) found in 3 iterations.'
  },
  visualExplanation: {
    title: 'Pointer Inward Motion',
    description: 'Visualizing pointer pins at the left and right extremities. Green arrow pushes left pointer rightward; red arrow pushes right pointer leftward. When they cross, all possible valid pairs have been evaluated.',
    features: ['Opposite-end convergence', 'Monotonic sum bounding', 'In-place element swapping']
  },
  pseudocode: {
    title: 'Two Sum II (Sorted)',
    code: `def two_sum_sorted(arr, target):
    left = 0
    right = len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []`
  },
  pythonCode: {
    title: 'Two Pointer Implementation for Two Sum II in Python',
    code: `def two_sum_sorted(numbers, target):
    l, r = 0, len(numbers) - 1
    while l < r:
        curr = numbers[l] + numbers[r]
        if curr == target:
            return [l + 1, r + 1] # 1-based index
        elif curr < target:
            l += 1
        else:
            r -= 1
    return []

# Test
nums = [2, 7, 11, 15]
print("Indices for target 9:", two_sum_sorted(nums, 9)) # Output: [1, 2]`,
    explanation: 'Solves sorted Two Sum in O(n) time and O(1) space.'
  },
  runnableCode: {
    code: `def is_palindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while l < r and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True

print("Race a car:", is_palindrome("Race a car"))
print("A man, a plan, a canal: Panama:", is_palindrome("A man, a plan, a canal: Panama"))`,
    expectedOutput: 'Race a car: False\nA man, a plan, a canal: Panama: True'
  },
  lineByLineExplanation: [
    { lines: '2', codeSnippet: 'l, r = 0, len(s) - 1', explanation: 'Initialize two pointers at opposite ends of string.' },
    { lines: '4-5', codeSnippet: 'while l < r and not s[l].isalnum(): l += 1', explanation: 'Skip non-alphanumeric punctuation on both ends.' },
    { lines: '6-7', codeSnippet: 'if s[l].lower() != s[r].lower(): return False', explanation: 'If characters mismatch, string cannot be a palindrome.' }
  ],
  edgeCases: [
    { case: 'Array with duplicate values', handling: 'Pointers handle duplicates naturally or can skip them to avoid duplicate triplets (3Sum).', example: '[2, 2, 3, 4, 4]' },
    { case: 'No solution exists', handling: 'Loop terminates when left == right, returning empty list.', example: 'target = 100 on [1, 2, 3]' }
  ],
  commonMistakes: [
    { mistake: 'Applying two-pointer sum technique on unsorted array.', solution: 'The technique relies on monotonicity. If unsorted, sort first O(n log n) or use a hash map O(n).' },
    { mistake: 'Using <= instead of < in while loop when distinct indices are required.', solution: 'left < right ensures the same element is not summed with itself.' }
  ],
  applications: [
    { industry: 'Data Processing', application: 'Deduplication in Log Streams', benefit: 'Fast and slow pointer deduplicates sorted data in-place without memory allocation.' },
    { industry: 'Media & Streaming', application: 'Container With Most Water', benefit: 'Optimizes dynamic bitrate buffering by maximizing bandwidth windows.' }
  ],
  practiceQuestions: [
    { id: 'dsa-2-3-q1', question: 'Why does Two Sum on an unsorted array favor Hash Map, while on a sorted array it favors Two Pointers?', hint: 'Consider sorting cost vs extra space.', answer: 'On unsorted data, a Hash Map achieves O(n) time and O(n) space. Sorting first takes O(n log n). If already sorted, Two Pointers achieves O(n) time with O(1) space, saving memory.' },
    { id: 'dsa-2-3-q2', question: 'How does Container With Most Water decide which pointer to move?', hint: 'Area = (right - left) * min(height[left], height[right]).', answer: 'Always move the pointer with the smaller height. Moving the taller pointer cannot increase the area because width decreases and height is capped by the smaller wall.' },
    { id: 'dsa-2-3-q3', question: 'What is the time complexity of 3Sum using the Two Pointer approach?', hint: 'Outer loop plus two-pointer inner scan.', answer: 'Sorting takes O(n log n). Outer loop runs n times; inner two-pointer scan takes O(n). Overall complexity is O(n^2).' }
  ],
  quiz: [
    {
      id: 'dsa-2-3-quiz-1',
      question: 'What prerequisite MUST be satisfied to use converging two pointers for target sum search?',
      options: [
        'The array must be sorted monotonically',
        'The array must have an even number of elements',
        'All elements must be positive',
        'The array must be stored in a linked list'
      ],
      correctIndex: 0,
      explanation: 'The invariant relies on sorted order: incrementing left strictly increases the sum, and decrementing right strictly decreases the sum.'
    },
    {
      id: 'dsa-2-3-quiz-2',
      question: 'In the Container With Most Water problem, which pointer should be moved at each step?',
      options: [
        'The pointer pointing to the shorter vertical line',
        'The pointer pointing to the taller vertical line',
        'Both pointers simultaneously',
        'Always the left pointer'
      ],
      correctIndex: 0,
      explanation: 'Moving the taller line guarantees an equal or smaller area because the width shrinks and the bottleneck remains the shorter line. Only moving the shorter line has a chance to increase area.'
    },
    {
      id: 'dsa-2-3-quiz-3',
      question: 'What is the auxiliary space complexity of the Two Pointer approach for in-place array partitioning?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
      correctIndex: 0,
      explanation: 'Two pointers operate solely by swapping elements in-place with integer index registers, using strictly O(1) auxiliary memory.'
    }
  ],
  codingChallenge: {
    title: 'Container With Most Water',
    problem: 'Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container containing the most water. Return the maximum area.',
    starterCode: `def max_area(height):
    l, r = 0, len(height) - 1
    max_w = 0
    while l < r:
        h = min(height[l], height[r])
        area = h * (r - l)
        max_w = max(max_w, area)
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return max_w

print(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])) # Expected: 49`,
    solution: `def max_area(height):
    l, r = 0, len(height) - 1
    max_w = 0
    while l < r:
        h = min(height[l], height[r])
        area = h * (r - l)
        max_w = max(max_w, area)
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return max_w

print(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))`,
    hints: [
      'Initialize pointers at extreme ends: l = 0, r = len(height) - 1.',
      'Area is width (r - l) multiplied by min(height[l], height[r]).',
      'Advance the pointer that points to the shorter vertical bar.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Two pointers convert O(n^2) pair searches into linear O(n) scans.',
      'Converging pointers require monotonic sorted structure.',
      'Fast and slow runners perform in-place array compaction in O(1) space.',
      'Container With Most Water advances the bottleneck (shorter) side.'
    ],
    nextLessonId: 'dsa-arrays-sliding-window',
    nextLessonTitle: 'Sliding Window',
    nextLessonModuleId: 'dsa-module-2'
  }
};

// 4. Sliding Window
m2Lessons['dsa-arrays-sliding-window'] = {
  id: 'dsa-arrays-sliding-window',
  moduleId: 'dsa-module-2',
  title: 'Sliding Window Technique',
  subtitle: 'Dynamic and Fixed-Size Subarray Optimization in O(n) Time',
  order: 4,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Distinguish between fixed-size and dynamic (variable-size) sliding windows.',
    'Maintain running window state (sum, character frequencies) in O(1) per step.',
    'Implement the expansion and contraction loop structure cleanly.',
    'Solve Longest Substring Without Repeating Characters and Minimum Window Substring.'
  ],
  prerequisites: [
    'Two Pointer Technique',
    'Hash Tables and Frequency Counting'
  ],
  analogy: {
    title: 'The Magnifying Glass over a Newspaper',
    text: 'Imagine reading an article looking through a rectangular magnifying glass that shows 5 words at a time. To read the next sentence, you don’t pick up the glass, walk back to the start, and scan 6 words; you simply slide the glass one word to the right. You drop the word that rolled off the left edge, and add the new word that entered the right edge. All internal words remain in view without re-reading.',
    metaphor: 'Sliding window updates state incrementally at the boundaries rather than recomputing the whole window.'
  },
  problemSolved: {
    title: 'Avoiding Re-computation of Overlapping Subarrays',
    description: 'Examining all subarrays of size k naively takes O(k) per subarray, totaling O(n * k) or O(n^2). By reusing the intermediate sum and adjusting only the elements entering and exiting the window, sliding window solves problems in strict O(n) linear time.',
    keyPoints: [
      'Drops redundant inner loops over overlapping elements',
      'Supports fixed-size windows (e.g. maximum sum of k elements)',
      'Supports variable-size windows (e.g. shortest subarray with sum >= S)'
    ]
  },
  intuition: {
    overview: 'Expand window by moving right pointer and adding arr[right] to state. If state violates constraint, shrink window by incrementing left and removing arr[left] until valid.',
    steps: [
      { step: 1, title: 'Expand', description: 'Increment right pointer, incorporate element into state.' },
      { step: 2, title: 'Contract Condition', description: 'Check while condition is violated (or condition is satisfied for minimization).' },
      { step: 3, title: 'Shrink', description: 'Remove arr[left] from state, increment left pointer.' },
      { step: 4, title: 'Record Metric', description: 'Update best window length or extremum value.' }
    ]
  },
  formalDefinition: {
    text: 'A sliding window defines a contiguous subsegment [L, R] of an array. At each step, either R increments (expanding the window) or L increments (contracting it). Because L and R both traverse from 0 to n monotonically, the total number of pointer movements is at most 2n, guaranteeing O(n) amortized running time.',
    latex: '\\text{Cost} = \\sum_{R=0}^{n-1} \\mathcal{O}(1) + \\sum_{L=0}^{n-1} \\mathcal{O}(1) = \\mathcal{O}(n)'
  },
  complexity: {
    overview: 'Time: O(n) amortized since each pointer moves at most n times. Space: O(k) where k is alphabet size or window hash map.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(1)', explanation: 'Single pass across array with fixed window.' },
      { case: 'Average', time: 'O(n)', space: 'O(k)', explanation: 'Variable window expanding and contracting smoothly.' },
      { case: 'Worst', time: 'O(n)', space: 'O(min(n, m))', explanation: 'Window contracts at every step while updating frequency map.' }
    ],
    spaceNote: 'Auxiliary memory depends on whether a frequency hash map is maintained.'
  },
  workedExample: {
    title: 'Finding Maximum Sum Subarray of Fixed Size K = 3 in [2, 1, 5, 1, 3, 2]',
    input: 'arr = [2, 1, 5, 1, 3, 2], k = 3',
    steps: [
      { step: 1, action: 'Initial Window', state: 'Sum of [2, 1, 5] = 8', explanation: 'Max sum = 8.' },
      { step: 2, action: 'Slide to [1, 5, 1]', state: 'Subtract 2, Add 1 -> 8 - 2 + 1 = 7', explanation: 'Max sum remains 8.' },
      { step: 3, action: 'Slide to [5, 1, 3]', state: 'Subtract 1, Add 3 -> 7 - 1 + 3 = 9', explanation: 'Max sum updated to 9.' },
      { step: 4, action: 'Slide to [1, 3, 2]', state: 'Subtract 5, Add 2 -> 9 - 5 + 2 = 6', explanation: 'Max sum remains 9.' }
    ],
    finalOutput: 'Maximum sum of length 3 subarray is 9.'
  },
  visualExplanation: {
    title: 'The Sliding Caterpillar Mechanism',
    description: 'The right pointer inches forward like a caterpillar head, consuming elements. The left pointer contracts like the caterpillar tail, releasing elements. The window glides smoothly across the array in O(n) total operations.',
    features: ['Fixed-width translation', 'Dynamic expansion/shrinkage', 'Incremental state deltas']
  },
  pseudocode: {
    title: 'Dynamic Sliding Window Template',
    code: `left = 0
window_state = {}
best_result = 0

for right from 0 to len(arr) - 1:
    add arr[right] to window_state
    while window_is_invalid():
        remove arr[left] from window_state
        left += 1
    best_result = update(best_result, right - left + 1)
return best_result`
  },
  pythonCode: {
    title: 'Longest Substring Without Repeating Characters in Python',
    code: `def length_of_longest_substring(s):
    char_index_map = {}
    left = 0
    max_len = 0

    for right, ch in enumerate(s):
        if ch in char_index_map and char_index_map[ch] >= left:
            left = char_index_map[ch] + 1
        char_index_map[ch] = right
        max_len = max(max_len, right - left + 1)

    return max_len

# Test
print("pwwkew:", length_of_longest_substring("pwwkew")) # Expected: 3 ("wke")`,
    explanation: 'Uses sliding window with a character position map to jump the left pointer forward in O(1).'
  },
  runnableCode: {
    code: `def min_subarray_len(target, nums):
    left = 0
    curr_sum = 0
    min_len = float('inf')

    for right in range(len(nums)):
        curr_sum += nums[right]
        while curr_sum >= target:
            min_len = min(min_len, right - left + 1)
            curr_sum -= nums[left]
            left += 1

    return min_len if min_len != float('inf') else 0

print("Min len for sum >= 7 in [2,3,1,2,4,3]:", min_subarray_len(7, [2,3,1,2,4,3]))`,
    expectedOutput: 'Min len for sum >= 7 in [2,3,1,2,4,3]: 2'
  },
  lineByLineExplanation: [
    { lines: '6-7', codeSnippet: 'for right in range(len(nums)):\n    curr_sum += nums[right]', explanation: 'Expands window rightward by adding incoming element.' },
    { lines: '8-11', codeSnippet: 'while curr_sum >= target:\n    min_len = min(min_len, right - left + 1)\n    curr_sum -= nums[left]\n    left += 1', explanation: 'Shrinks window from left as long as target sum condition is met, minimizing length.' }
  ],
  edgeCases: [
    { case: 'Array length smaller than window size k', handling: 'Return 0 or None immediately.', example: 'len(nums) < k' },
    { case: 'All elements identical', handling: 'Window expands and contracts correctly without crashing.', example: '"aaaaa"' }
  ],
  commonMistakes: [
    { mistake: 'Recomputing window sum from scratch inside loop: sum(arr[i:i+k]).', solution: 'This causes O(n * k) performance. Always add incoming and subtract outgoing element in O(1).' },
    { mistake: 'Forgetting to update left pointer index check in hash map jump.', solution: 'Ensure char_index_map[ch] >= left so old occurrences outside window are ignored.' }
  ],
  applications: [
    { industry: 'Networking', application: 'TCP Sliding Window Protocol', benefit: 'Controls packet flow and congestion by sliding sequence windows across network sockets.' },
    { industry: 'Audio Processing', application: 'Fast Fourier Transform (STFT)', benefit: 'Slides overlapping Hamming windows over audio frames to analyze frequency spectrums over time.' }
  ],
  practiceQuestions: [
    { id: 'dsa-2-4-q1', question: 'Why is a while loop inside the for loop of a dynamic sliding window still O(n) overall?', hint: 'How many times can the left pointer increment?', answer: 'Even though there is a nested while loop, the left pointer only increments forward and never resets. It can increment at most n times across the entire execution, guaranteeing O(2n) = O(n) total steps.' },
    { id: 'dsa-2-4-q2', question: 'How do you choose between Two Pointers and Sliding Window?', hint: 'Are we evaluating pairs or contiguous subarrays?', answer: 'Two Pointers typically evaluates pairs of elements (often from opposite ends of a sorted array). Sliding Window specifically maintains and tracks a contiguous subsegment or window of elements.' },
    { id: 'dsa-2-4-q3', question: 'What is the auxiliary space complexity for "Longest Substring with At Most K Distinct Characters"?', hint: 'What does the hash map hold?', answer: 'O(k) where k is the maximum number of distinct characters allowed in the map.' }
  ],
  quiz: [
    {
      id: 'dsa-2-4-quiz-1',
      question: 'What is the overall time complexity of a dynamic sliding window where both left and right pointers traverse an array of length n?',
      options: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(2^n)'],
      correctIndex: 0,
      explanation: 'Since both left and right pointers advance monotonically from 0 to n without backtracking, total operations cannot exceed 2n = O(n).'
    },
    {
      id: 'dsa-2-4-quiz-2',
      question: 'How is a fixed-size sliding window of size k updated when moving to the next index?',
      options: [
        'Add the new element at right, subtract the old element at left',
        'Sum all k elements from scratch using a loop',
        'Sort the window',
        'Reallocate the array'
      ],
      correctIndex: 0,
      explanation: 'Updating the window state by adding the incoming element and subtracting the departing element executes in constant O(1) time.'
    },
    {
      id: 'dsa-2-4-quiz-3',
      question: 'Which of the following problems is best solved using a variable-size sliding window?',
      options: [
        'Shortest Subarray with Sum at least K',
        'Binary Search in a sorted array',
        'Matrix multiplication',
        'Inverting a binary tree'
      ],
      correctIndex: 0,
      explanation: 'Finding the shortest contiguous subarray meeting a condition is the classic use case for a variable-size contracting sliding window.'
    }
  ],
  codingChallenge: {
    title: 'Maximum Sum of Distinct Subarrays With Length K',
    problem: 'Given an integer array nums and an integer k, find the maximum subarray sum of all subarrays of nums that meet the following conditions: the length of the subarray is k, and all elements of the subarray are distinct. Return 0 if no such subarray exists.',
    starterCode: `def maximum_subarray_sum(nums, k):
    left = 0
    curr_sum = 0
    max_sum = 0
    seen = set()

    for right in range(len(nums)):
        # While duplicate exists, shrink window from left
        while nums[right] in seen:
            seen.remove(nums[left])
            curr_sum -= nums[left]
            left += 1

        seen.add(nums[right])
        curr_sum += nums[right]

        if right - left + 1 == k:
            max_sum = max(max_sum, curr_sum)
            # Slide left forward for next step
            seen.remove(nums[left])
            curr_sum -= nums[left]
            left += 1

    return max_sum

print(maximum_subarray_sum([1, 5, 4, 2, 9, 9, 9], 3)) # Expected: 15 ([5, 4, 2] -> 11, [4, 2, 9] -> 15)`,
    solution: `def maximum_subarray_sum(nums, k):
    left = 0
    curr_sum = 0
    max_sum = 0
    seen = set()

    for right in range(len(nums)):
        while nums[right] in seen:
            seen.remove(nums[left])
            curr_sum -= nums[left]
            left += 1

        seen.add(nums[right])
        curr_sum += nums[right]

        if right - left + 1 == k:
            max_sum = max(max_sum, curr_sum)
            seen.remove(nums[left])
            curr_sum -= nums[left]
            left += 1

    return max_sum

print(maximum_subarray_sum([1, 5, 4, 2, 9, 9, 9], 3))`,
    hints: [
      'Maintain both a running sum and a hash set of elements currently inside the window.',
      'If nums[right] is already in the set, contract from the left until the duplicate is evicted.',
      'When the window length reaches exactly k, record max_sum and advance left by one.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Sliding window achieves O(n) time by maintaining delta state across contiguous windows.',
      'Fixed windows update in O(1) via +new -old arithmetic.',
      'Dynamic windows expand with right pointer and contract with left pointer.',
      'Always verify that both pointers move forward monotonically.'
    ],
    nextLessonId: 'dsa-arrays-kadane',
    nextLessonTitle: "Kadane's Algorithm — Maximum Subarray",
    nextLessonModuleId: 'dsa-module-2'
  }
};

// 5. Kadane's Algorithm
m2Lessons['dsa-arrays-kadane'] = {
  id: 'dsa-arrays-kadane',
  moduleId: 'dsa-module-2',
  title: "Kadane's Algorithm — Maximum Subarray",
  subtitle: 'Greedy Dynamic Programming for Maximum Contiguous Sum in O(n) Time',
  order: 5,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'dp-table',
  objectives: [
    'Formulate the maximum subarray problem using dynamic programming recurrence.',
    'Understand the local decision: extend previous subarray or start fresh at current element.',
    'Implement Kadane’s algorithm in O(n) time and O(1) auxiliary space.',
    'Correctly handle arrays containing only negative numbers.'
  ],
  prerequisites: [
    'Array Operations and Memory Layout',
    'Basic Dynamic Programming intuition'
  ],
  analogy: {
    title: 'The Casino Winning Streak Reset',
    text: 'A gambler records net profit or loss per round: [+5, -8, +10, +2, -1, +6]. If you start a streak and your net accumulated money falls below zero, carrying that negative debt into the next game will only drag down future profits. You are strictly better off cutting your losses, declaring bankruptcy on the past streak, and starting a fresh streak from the next positive win.',
    metaphor: 'If current cumulative sum becomes negative, it cannot help any future subarray; reset and start anew.'
  },
  problemSolved: {
    title: 'Optimal Subarray Selection in Linear Time',
    description: 'Finding the maximum contiguous subarray sum naively takes O(n^3) by testing all (i, j) pairs and summing them, or O(n^2) with prefix sums. Kadane’s algorithm solves this fundamental problem in a single pass of O(n) time and O(1) space.',
    keyPoints: [
      'Reduces complexity from quadratic O(n^2) to linear O(n)',
      'Uses dynamic programming state compression to achieve O(1) space',
      'Provides foundation for Maximum Product Subarray and 2D Maximum Submatrix sum'
    ]
  },
  intuition: {
    overview: 'At each index i, max_ending_here is either the current element alone, or the current element added to the previous max_ending_here.',
    steps: [
      { step: 1, title: 'Local Decision', description: 'current_sum = max(nums[i], current_sum + nums[i]).' },
      { step: 2, title: 'Global Maximum Tracking', description: 'max_so_far = max(max_so_far, current_sum).' },
      { step: 3, title: 'Continuation', description: 'Repeat for all elements in array from left to right.' }
    ]
  },
  formalDefinition: {
    text: 'Let dp[i] be the maximum subarray sum ending at index i. The Bellman optimality equation states: dp[i] = max(A[i], dp[i-1] + A[i]). The global maximum is max_{0 <= i < n} dp[i].',
    latex: 'dp[i] = \\max\\big(A[i], \\, dp[i - 1] + A[i]\\big), \\quad \\text{Result} = \\max_{0 \\le i < n} dp[i]'
  },
  complexity: {
    overview: 'Time: strictly O(n) single scan. Space: O(1) using two scalar variables.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(1)', explanation: 'Single pass across all elements.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Single pass regardless of distribution.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Single pass even with all negative numbers.' }
    ],
    spaceNote: 'Does not allocate any arrays or tables.'
  },
  workedExample: {
    title: 'Running Kadane on [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    steps: [
      { step: 1, action: 'Index 0 (-2)', state: 'curr = -2, max = -2', explanation: 'Initialize with first element.' },
      { step: 2, action: 'Index 1 (1)', state: 'curr = max(1, -2+1) = 1, max = 1', explanation: 'Starting fresh with 1 is better than -1.' },
      { step: 3, action: 'Index 2 (-3)', state: 'curr = max(-3, 1-3) = -2, max = 1', explanation: 'Extend streak.' },
      { step: 4, action: 'Index 3 (4)', state: 'curr = max(4, -2+4) = 4, max = 4', explanation: 'Start fresh with 4.' },
      { step: 5, action: 'Index 4 to 6 (-1, 2, 1)', state: 'curr = 3 -> 5 -> 6, max = 6', explanation: 'Subarray [4, -1, 2, 1] accumulates to 6.' },
      { step: 6, action: 'Index 7 & 8 (-5, 4)', state: 'curr = 1 -> 5, max = 6', explanation: 'Max sum remains 6.' }
    ],
    finalOutput: 'Maximum contiguous subarray sum is 6 (subarray [4, -1, 2, 1]).'
  },
  visualExplanation: {
    title: 'The Running Sum Trajectory',
    description: 'Graphing the running sum: when the line dips below the zero baseline, Kadane’s algorithm clips it back up to start afresh from the next positive element.',
    features: ['Zero baseline reset', 'Peak tracking indicator', 'Subarray boundary tracking']
  },
  pseudocode: {
    title: "Kadane's Algorithm",
    code: `def kadane(nums):
    current_sum = nums[0]
    max_sum = nums[0]
    for i from 1 to len(nums) - 1:
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    return max_sum`
  },
  pythonCode: {
    title: "Kadane's Algorithm with Subarray Reconstruction in Python",
    code: `def max_sub_array_with_indices(nums):
    max_sum = nums[0]
    curr_sum = nums[0]
    start = end = 0
    temp_start = 0

    for i in range(1, len(nums)):
        if nums[i] > curr_sum + nums[i]:
            curr_sum = nums[i]
            temp_start = i
        else:
            curr_sum += nums[i]

        if curr_sum > max_sum:
            max_sum = curr_sum
            start = temp_start
            end = i

    return max_sum, nums[start:end + 1]

arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
val, subarray = max_sub_array_with_indices(arr)
print(f"Max Sum: {val}, Subarray: {subarray}")`,
    explanation: 'Returns both the maximum sum and the actual slice of elements that produced it.'
  },
  runnableCode: {
    code: `def max_subarray(nums):
    max_so_far = nums[0]
    curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    return max_so_far

print("Max subarray [-2, 1, -3, 4, -1, 2, 1, -5, 4]:", max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
print("All negative [-5, -2, -8, -1, -4]:", max_subarray([-5, -2, -8, -1, -4]))`,
    expectedOutput: 'Max subarray [-2, 1, -3, 4, -1, 2, 1, -5, 4]: 6\nAll negative [-5, -2, -8, -1, -4]: -1'
  },
  lineByLineExplanation: [
    { lines: '2-3', codeSnippet: 'max_so_far = nums[0]\ncurr_max = nums[0]', explanation: 'Initializes tracking variables with first element to handle all-negative arrays.' },
    { lines: '4-6', codeSnippet: 'for x in nums[1:]:\n    curr_max = max(x, curr_max + x)\n    max_so_far = max(max_so_far, curr_max)', explanation: 'Decides whether to extend streak or restart at x, updating the global record.' }
  ],
  edgeCases: [
    { case: 'All Negative Numbers', handling: 'Initializing with nums[0] rather than 0 correctly returns the least negative number.', example: '[-5, -1, -3] -> returns -1' },
    { case: 'Single Element Array', handling: 'Loop does not run, returns nums[0] directly in O(1).', example: '[42] -> returns 42' }
  ],
  commonMistakes: [
    { mistake: 'Initializing max_so_far = 0.', solution: 'If all numbers in the array are negative, returning 0 is incorrect. Initialize max_so_far = nums[0] or -inf.' },
    { mistake: 'Confusing maximum subarray with longest common subsequence.', solution: 'Subarray requires strict contiguous elements; subsequence allows skipping.' }
  ],
  applications: [
    { industry: 'Genomic Sequence Analysis', application: 'Identifying CpG Islands', benefit: 'Locates contiguous DNA regions with elevated GC-content scores in linear time.' },
    { industry: 'Finance', application: 'Best Single-Stock Buy/Sell Window', benefit: 'Computes maximum profit by converting prices to daily return differentials and running Kadane.' }
  ],
  practiceQuestions: [
    { id: 'dsa-2-5-q1', question: 'Why does Kadane algorithm fail if max_so_far is initialized to 0 on an array of all negative numbers?', hint: 'What is the sum of any non-empty subarray in [-3, -5, -2]?', answer: 'The maximum subarray of [-3, -5, -2] is [-2] with sum -2. If initialized to 0, it would return 0, which corresponds to an empty array.' },
    { id: 'dsa-2-5-q2', question: 'How can Kadane algorithm be adapted to solve Maximum Product Subarray?', hint: 'Multiplying by a negative number flips signs.', answer: 'Maintain two dynamic states: current_max and current_min. When multiplying by a negative number, min becomes max and max becomes min.' },
    { id: 'dsa-2-5-q3', question: 'How can Kadane algorithm solve the Maximum Circular Subarray problem?', hint: 'Consider total_sum - min_subarray.', answer: 'The maximum circular subarray is either the standard maximum subarray (Kadane) or total_sum - min_subarray (wrapping around borders).' }
  ],
  quiz: [
    {
      id: 'dsa-2-5-quiz-1',
      question: "What is the key recurrence relation in Kadane's algorithm at element A[i]?",
      options: [
        'curr_sum = max(A[i], curr_sum + A[i])',
        'curr_sum = curr_sum + A[i]',
        'curr_sum = min(A[i], curr_sum)',
        'curr_sum = A[i] * A[i - 1]'
      ],
      correctIndex: 0,
      explanation: 'At each position, the algorithm greedily decides whether to start a new subarray at A[i] or add A[i] to the accumulated streak.'
    },
    {
      id: 'dsa-2-5-quiz-2',
      question: "What is the time and auxiliary space complexity of Kadane's algorithm?",
      options: ['O(n) time and O(1) space', 'O(n^2) time and O(1) space', 'O(n log n) time and O(n) space', 'O(n) time and O(n) space'],
      correctIndex: 0,
      explanation: 'Kadane scans the array in a single pass of n steps while maintaining only two scalar variables, requiring O(n) time and O(1) space.'
    },
    {
      id: 'dsa-2-5-quiz-3',
      question: 'What is the output of max_subarray on input [-8, -3, -6, -2, -5]?',
      options: ['-2', '0', '-8', '-24'],
      correctIndex: 0,
      explanation: 'In an all-negative array, the maximum contiguous sum is simply the largest single negative element, which is -2.'
    }
  ],
  codingChallenge: {
    title: 'Maximum Sum Circular Subarray',
    problem: 'Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums. A circular array allows the subarray to wrap around from the end back to the start.',
    starterCode: `def max_subarray_sum_circular(nums):
    total = sum(nums)
    # Standard Kadane for max subarray
    curr_max = max_so_far = nums[0]
    # Standard Kadane for min subarray
    curr_min = min_so_far = nums[0]

    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
        curr_min = min(x, curr_min + x)
        min_so_far = min(min_so_far, curr_min)

    # If all numbers are negative, total == min_so_far, return max_so_far
    if max_so_far < 0:
        return max_so_far
    return max(max_so_far, total - min_so_far)

print(max_subarray_sum_circular([1, -2, 3, -2])) # Expected: 3
print(max_subarray_sum_circular([5, -3, 5]))      # Expected: 10 (wraps: 5 + 5)`,
    solution: `def max_subarray_sum_circular(nums):
    total = sum(nums)
    curr_max = max_so_far = nums[0]
    curr_min = min_so_far = nums[0]

    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
        curr_min = min(x, curr_min + x)
        min_so_far = min(min_so_far, curr_min)

    if max_so_far < 0:
        return max_so_far
    return max(max_so_far, total - min_so_far)

print(max_subarray_sum_circular([5, -3, 5]))`,
    hints: [
      'Case 1: The maximum subarray does not wrap around (standard Kadane).',
      'Case 2: The maximum subarray wraps around -> total_sum - minimum_subarray.',
      'Special case: if all elements are negative, total - min_so_far = 0 (empty array), so return max_so_far.'
    ]
  },
  summary: {
    keyTakeaways: [
      "Kadane's algorithm finds maximum contiguous subarray sum in O(n) time and O(1) space.",
      'State transition: curr = max(x, curr + x).',
      'Always initialize with nums[0] to handle negative arrays correctly.',
      'Circular arrays are solved by combining max Kadane with min Kadane.'
    ],
    nextLessonId: 'dsa-arrays-binary-search',
    nextLessonTitle: 'Binary Search',
    nextLessonModuleId: 'dsa-module-2'
  }
};

// Write out Module 2 partially updated
writeModuleFile(path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-2.ts'), m2.data, m2Lessons);
console.log('Updated Module 2 through Lesson 5. Current count:', Object.keys(m2Lessons).length);
