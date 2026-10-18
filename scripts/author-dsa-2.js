const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m2 = getExistingDSALessons(2);
const m2Lessons = { ...m2.lessons };

m2Lessons['dsa-arrays-operations'] = {
  id: 'dsa-arrays-operations',
  moduleId: 'dsa-module-2',
  title: 'Array Operations and Memory Layout',
  subtitle: 'Contiguous Memory, Indexing Mathematics, Dynamic Resizing & Complexity',
  order: 1,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Explain how arrays are physically laid out in contiguous memory addresses.',
    'Derive the O(1) random access formula: Address(arr[i]) = Base + i * Size.',
    'Analyze time complexity for insertion, deletion, and append in static vs dynamic arrays.',
    'Understand geometric doubling (growth factor 1.5x - 2x) and amortized O(1) insertion.'
  ],
  prerequisites: [
    'DSA Foundations',
    'Understanding computer memory bytes and pointers'
  ],
  analogy: {
    title: 'Numbered Train Passenger Cabins',
    text: 'A bullet train has passenger cabins numbered consecutively 0 through 99 attached back-to-back. To reach cabin 42, the conductor doesn’t have to enter cabins 0 through 41 first; knowing that every cabin is exactly 10 meters long, they walk directly to 42 * 10 = 420 meters down the platform. However, squeezing a new cabin in between 20 and 21 requires uncoupling and physically rolling every subsequent cabin back by 10 meters.',
    metaphor: 'Direct indexing is walking straight to a cabin; insertion in the middle forces shifting every subsequent element.'
  },
  problemSolved: {
    title: 'Predictable and Ultrafast Constant-Time Access',
    description: 'Without arrays, accessing the N-th element of a collection would require following pointers sequentially (like in linked lists), taking O(n) time. Arrays leverage direct memory address calculation to retrieve or update any element in exactly O(1) time.',
    keyPoints: [
      'Constant-time O(1) random read and write access',
      'Optimal hardware cache spatial locality due to contiguous memory storage',
      'Serves as the underlying physical memory buffer for Strings, Hash Tables, Heaps, and Dynamic Arrays'
    ]
  },
  intuition: {
    overview: 'Because every element in a primitive array has identical byte size and sits sequentially in RAM, finding an element is purely arithmetic.',
    steps: [
      { step: 1, title: 'Base Address Allocation', description: 'OS reserves a contiguous chunk of memory starting at base pointer B.' },
      { step: 2, title: 'Offset Multiplication', description: 'To access index i, calculate offset = i * sizeof(datatype).' },
      { step: 3, title: 'Direct Bus Dereference', description: 'CPU memory controller fetches the byte at address B + offset in a single bus cycle.' }
    ]
  },
  formalDefinition: {
    text: 'A one-dimensional array A is a contiguous collection of homogeneous data elements where the memory address of element A[i] is computed directly from base address B, element byte width w, and lower bound index c (typically 0).',
    latex: '\\text{Loc}(A[i]) = B + (i - c) \\cdot w'
  },
  complexity: {
    overview: 'Access/Update: O(1). Append (amortized): O(1). Insert/Delete at arbitrary index: O(n).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Random access by index or append when capacity remains.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Insertion or deletion at an arbitrary middle index requires shifting n/2 elements.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'Inserting at index 0 shifts all n elements; resizing copies entire array to new memory block.' }
    ],
    spaceNote: 'Dynamic arrays allocate extra capacity (typically 2x) resulting in O(n) space with overhead.'
  },
  workedExample: {
    title: 'Inserting an Element at Index 2 in an Array of Size 5',
    input: 'Array: [10, 20, 30, 40, 50], Insert 99 at index 2.',
    steps: [
      { step: 1, action: 'Shift from End', state: '[10, 20, 30, 40, 50, _]', explanation: 'Move arr[4] (50) to index 5.' },
      { step: 2, action: 'Shift Downward', state: '[10, 20, 30, 40, 40, 50]', explanation: 'Move arr[3] (40) to index 4.' },
      { step: 3, action: 'Shift Target Slot', state: '[10, 20, 30, 30, 40, 50]', explanation: 'Move arr[2] (30) to index 3. Slot 2 is now vacant.' },
      { step: 4, action: 'Write New Element', state: '[10, 20, 99, 30, 40, 50]', explanation: 'Insert 99 into index 2.' }
    ],
    finalOutput: 'Array transformed to [10, 20, 99, 30, 40, 50] after 3 shifts.'
  },
  visualExplanation: {
    title: 'Contiguous RAM Block vs Element Shifting',
    description: 'Visualizing cells 0x1000, 0x1004, 0x1008... Insertion requires a cascading rightward copy before the new value can be deposited into the vacated cell.',
    features: ['Contiguous memory addresses', 'Vacating a slot via backward shifting', 'Array reallocation on capacity limit']
  },
  pseudocode: {
    title: 'Array Insert at Position',
    code: `def insert_at(arr, size, capacity, index, value):
    if size >= capacity:
        resize_array(arr)
    for i from size down to index + 1:
        arr[i] = arr[i - 1] # Shift right
    arr[index] = value
    return size + 1`
  },
  pythonCode: {
    title: 'Simulating Array Insertion and Shifting Manually in Python',
    code: `def manual_insert(arr, index, value):
    arr.append(None) # Expand container
    for i in range(len(arr) - 1, index, -1):
        arr[i] = arr[i - 1] # Shift right
    arr[index] = value
    return arr

sample = [10, 20, 30, 40, 50]
print("Before:", sample)
manual_insert(sample, 2, 99)
print("After inserting 99 at index 2:", sample)`,
    explanation: 'Explicitly illustrates the O(n - index) shift operations that happen under the hood in CPython list.insert().'
  },
  runnableCode: {
    code: `arr = [1, 2, 3, 4, 5]
# Direct O(1) access
print("Access index 3:", arr[3])
# Update O(1)
arr[3] = 99
print("Updated array:", arr)
# Deletion requires shifting remaining elements left
arr.pop(1)
print("After removing index 1:", arr)`,
    expectedOutput: 'Access index 3: 4\nUpdated array: [1, 2, 3, 99, 5]\nAfter removing index 1: [1, 3, 99, 5]'
  },
  lineByLineExplanation: [
    { lines: '3', codeSnippet: 'print("Access index 3:", arr[3])', explanation: 'Direct pointer calculation retrieves item in O(1).' },
    { lines: '5', codeSnippet: 'arr[3] = 99', explanation: 'Overwrites 4-byte slot directly in O(1).' },
    { lines: '8', codeSnippet: 'arr.pop(1)', explanation: 'Removes index 1 and shifts elements 2, 3, 4 left by one position.' }
  ],
  edgeCases: [
    { case: 'Index Out of Range', handling: 'Raise IndexError when index >= size or index < -size.', example: 'arr[10] on array of size 5' },
    { case: 'Inserting at End (Append)', handling: 'No shifting needed; O(1) amortized.', example: 'insert at index == size' }
  ],
  commonMistakes: [
    { mistake: 'Assuming list.insert(0, val) is as fast as list.append(val).', solution: 'insert(0) is O(n) because it shifts all elements. Use collections.deque for O(1) prepends.' },
    { mistake: 'Modifying an array while iterating over it.', solution: 'Iterate over a copy or iterate backwards to avoid skipped indices.' }
  ],
  applications: [
    { industry: 'Graphics & Gaming', application: 'Frame Buffers & Vertex Arrays', benefit: 'Direct pixel arrays rendered directly by GPU shaders via high-bandwidth memory access.' },
    { industry: 'Machine Learning', application: 'Tensor Tensors & Matrices', benefit: 'NumPy arrays store raw C-contiguous memory blocks enabling SIMD vectorized instructions.' }
  ],
  practiceQuestions: [
    { id: 'dsa-2-1-q1', question: 'If an integer array starts at memory address 1000 and each integer occupies 4 bytes, what is the address of arr[7]?', hint: 'Use Loc(A[i]) = Base + i * width.', answer: 'Address = 1000 + (7 * 4) = 1000 + 28 = 1028.' },
    { id: 'dsa-2-1-q2', question: 'Why is dynamic array append considered amortized O(1) even though resizing takes O(n)?', hint: 'How often does resizing happen with geometric doubling?', answer: 'With 2x geometric growth, resizing to size N requires N copies, but happens only after N/2 cheap O(1) appends. The N copy cost spread over N/2 operations adds a constant 2 steps per append.' },
    { id: 'dsa-2-1-q3', question: 'What is the time complexity to delete an element at index 0 from a Python list of length n?', hint: 'What happens to the remaining elements?', answer: 'O(n), because all n - 1 remaining elements must be shifted one position to the left in memory.' }
  ],
  quiz: [
    {
      id: 'dsa-2-1-quiz-1',
      question: 'What allows arrays to achieve O(1) random element access?',
      options: [
        'Contiguous memory allocation and direct arithmetic address computation',
        'Hashing the index key with SHA-256',
        'Binary search trees connecting every element',
        'Asynchronous CPU threading'
      ],
      correctIndex: 0,
      explanation: 'Because memory is contiguous and elements have identical byte widths, the CPU computes the target address in a single multiplication and addition.'
    },
    {
      id: 'dsa-2-1-quiz-2',
      question: 'What is the time complexity of inserting an item at the beginning (index 0) of an array of length n?',
      options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
      correctIndex: 0,
      explanation: 'Inserting at the beginning requires moving all n existing elements one position to the right, which takes O(n) operations.'
    },
    {
      id: 'dsa-2-1-quiz-3',
      question: 'When a dynamic array runs out of capacity, by what factor does it typically expand?',
      options: ['A multiplicative factor (e.g. 1.5x or 2x)', 'It adds a fixed constant 10 slots each time', 'It grows by 1000x', 'It never expands and raises an error'],
      correctIndex: 0,
      explanation: 'Geometric growth (e.g., 2x or 1.5x in CPython) ensures that resizing costs amortize to O(1) per append across sequence operations.'
    }
  ],
  codingChallenge: {
    title: 'Rotate Array in Place',
    problem: 'Given an array nums and an integer k, rotate the array to the right by k steps in-place with O(1) auxiliary space. For example, [1, 2, 3, 4, 5, 6, 7] with k=3 becomes [5, 6, 7, 1, 2, 3, 4].',
    starterCode: `def rotate_array(nums, k):
    n = len(nums)
    k = k % n
    # Helper to reverse a subrange [start, end]
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1

    # Three-step reversal algorithm
    reverse(0, n - 1)
    reverse(0, k - 1)
    reverse(k, n - 1)
    return nums

print(rotate_array([1, 2, 3, 4, 5, 6, 7], 3))`,
    solution: `def rotate_array(nums, k):
    n = len(nums)
    k = k % n
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1

    reverse(0, n - 1)
    reverse(0, k - 1)
    reverse(k, n - 1)
    return nums

print(rotate_array([1, 2, 3, 4, 5, 6, 7], 3))`,
    hints: [
      'Normalizing k = k % len(nums) avoids redundant full cycles.',
      'Reverse the entire array first.',
      'Reverse the first k elements, then reverse the remaining n - k elements.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Arrays allocate contiguous memory blocks in RAM.',
      'Access by index is strictly O(1) via arithmetic calculation.',
      'Insertion and deletion in the middle require O(n) element shifts.',
      'Dynamic arrays achieve amortized O(1) appends through geometric capacity expansion.'
    ],
    nextLessonId: 'dsa-arrays-prefix-sums',
    nextLessonTitle: 'Prefix Sums and Difference Arrays',
    nextLessonModuleId: 'dsa-module-2'
  }
};

m2Lessons['dsa-arrays-prefix-sums'] = {
  id: 'dsa-arrays-prefix-sums',
  moduleId: 'dsa-module-2',
  title: 'Prefix Sums and Difference Arrays',
  subtitle: 'Preprocessing Arrays for O(1) Range Queries and O(1) Range Updates',
  order: 2,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Construct 1D prefix sum arrays in O(n) preprocessing time.',
    'Execute range sum queries sum(L, R) in strictly O(1) time.',
    'Extend prefix sums to 2D matrices for submatrix area sum queries.',
    'Master difference arrays to perform multiple range update increments in O(1) time.'
  ],
  prerequisites: [
    'Array Operations and Memory Layout',
    'Basic cumulative summations'
  ],
  analogy: {
    title: 'The Highway Mile Marker Mileage Log',
    text: 'A driver wants to know the distance between Mile Marker 45 and Mile Marker 120. Instead of measuring every mile one by one between the two exits, they subtract: 120 - 45 = 75 miles. The odometer maintains a continuous prefix sum of total miles traveled from the origin. Any trip segment between exit A and exit B is simply Odometer(B) - Odometer(A).',
    metaphor: 'Prefix sums turn cumulative queries into instant single subtraction operations.'
  },
  problemSolved: {
    title: 'Eliminating Redundant Range Sum Scans',
    description: 'If a database receives Q range sum queries on an array of size n, answering each query naively takes O(n) time, resulting in O(Q * n) total time. With prefix sums, we preprocess the array once in O(n) time, and then answer every subsequent query in O(1) time, bringing total complexity down to O(n + Q).',
    keyPoints: [
      'Transforms O(n) query time into O(1) subtraction',
      'Extends naturally to 2D submatrix queries via Inclusion-Exclusion Principle',
      'Difference arrays enable bulk range increments in O(1) without looping'
    ]
  },
  intuition: {
    overview: 'Prefix array P[i] stores the sum of all elements from index 0 to i-1. The sum from L to R is P[R+1] - P[L].',
    steps: [
      { step: 1, title: 'Build Prefix Array', description: 'P[0] = 0; P[i] = P[i-1] + arr[i-1] for i in 1..n.' },
      { step: 2, title: 'Query Execution', description: 'Range sum from L to R is computed as P[R+1] - P[L].' },
      { step: 3, title: 'Difference Array Inversion', description: 'To increment [L, R] by V: diff[L] += V, diff[R+1] -= V, then prefix-sum diff.' }
    ]
  },
  formalDefinition: {
    text: 'Given an array A = [a0, a1, ..., an-1], its prefix sum array P of size n+1 is defined such that P[0] = 0 and P[i] = \\sum_{j=0}^{i-1} a_j. Any range sum \\sum_{k=L}^{R} a_k = P[R+1] - P[L].',
    latex: '\\sum_{k=L}^{R} A[k] = P[R + 1] - P[L]'
  },
  complexity: {
    overview: 'Preprocessing: O(n) time, O(n) auxiliary space. Query: O(1) time.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(n)', explanation: 'Range sum query answered via single subtraction.' },
      { case: 'Average', time: 'O(1)', space: 'O(n)', explanation: 'Instant lookup regardless of range breadth.' },
      { case: 'Worst', time: 'O(1)', space: 'O(n)', explanation: 'Boundary queries [0, n-1] complete in O(1).' }
    ],
    spaceNote: 'Can be done in-place inside the input array if modifying the original elements is allowed.'
  },
  workedExample: {
    title: 'Querying Range Sum on Array [3, 1, 4, 1, 5, 9, 2]',
    input: 'arr = [3, 1, 4, 1, 5, 9, 2], Query: sum of indices [2..5] (elements 4, 1, 5, 9)',
    steps: [
      { step: 1, action: 'Construct P', state: 'P = [0, 3, 4, 8, 9, 14, 23, 25]', explanation: 'P[i] = P[i-1] + arr[i-1].' },
      { step: 2, action: 'Apply Formula', state: 'L = 2, R = 5 -> P[5 + 1] - P[2] = P[6] - P[2]', explanation: 'P[6] = 23 (sum of first 6 elements), P[2] = 4 (sum of first 2 elements).' },
      { step: 3, action: 'Subtract', state: '23 - 4 = 19', explanation: 'Direct verification: 4 + 1 + 5 + 9 = 19.' }
    ],
    finalOutput: 'Sum of range [2..5] = 19 in O(1) time.'
  },
  visualExplanation: {
    title: 'Inclusion-Exclusion in 1D and 2D Prefix Sums',
    description: 'In 1D, subtracting the green prefix from the blue prefix leaves exactly the red target window. In 2D, Submatrix(r1, c1, r2, c2) = P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1].',
    features: ['1D segment subtraction', '2D Inclusion-Exclusion area formula', 'Difference array boundary impulse pairs']
  },
  pseudocode: {
    title: 'Prefix Sum Class',
    code: `class NumArray:
    def __init__(self, nums):
        self.P = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.P[i + 1] = self.P[i] + nums[i]

    def sumRange(self, L, R):
        return self.P[R + 1] - self.P[L]`
  },
  pythonCode: {
    title: 'Implementing Prefix Sum and Difference Array in Python',
    code: `class RangeManager:
    def __init__(self, nums):
        self.n = len(nums)
        self.P = [0] * (self.n + 1)
        for i in range(self.n):
            self.P[i + 1] = self.P[i] + nums[i]

    def range_sum(self, L, R):
        return self.P[R + 1] - self.P[L]

# Demonstrate Difference Array
def apply_range_updates(n, updates):
    # updates format: (L, R, val)
    diff = [0] * (n + 1)
    for L, R, val in updates:
        diff[L] += val
        if R + 1 < n:
            diff[R + 1] -= val
    # Reconstruct via prefix sum
    res = [0] * n
    res[0] = diff[0]
    for i in range(1, n):
        res[i] = res[i - 1] + diff[i]
    return res

rm = RangeManager([2, 4, 6, 8, 10])
print("Range sum [1..3] (4+6+8):", rm.range_sum(1, 3))
print("Bulk updates on 5 zeroes:", apply_range_updates(5, [(1, 3, 10), (2, 4, 5)]))`,
    explanation: 'Demonstrates both O(1) prefix sum queries and O(1) difference array batch increments.'
  },
  runnableCode: {
    code: `nums = [3, 1, 4, 1, 5, 9, 2]
prefix = [0] * (len(nums) + 1)
for i, x in enumerate(nums):
    prefix[i + 1] = prefix[i] + x

def query(L, R):
    return prefix[R + 1] - prefix[L]

print("Sum [0..2]:", query(0, 2))  # 3+1+4 = 8
print("Sum [2..5]:", query(2, 5))  # 4+1+5+9 = 19`,
    expectedOutput: 'Sum [0..2]: 8\nSum [2..5]: 19'
  },
  lineByLineExplanation: [
    { lines: '2-4', codeSnippet: 'prefix = [0] * (len(nums) + 1)\nfor i, x in enumerate(nums):\n    prefix[i + 1] = prefix[i] + x', explanation: 'Builds 1-indexed cumulative prefix sum array with base 0.' },
    { lines: '6-7', codeSnippet: 'def query(L, R):\n    return prefix[R + 1] - prefix[L]', explanation: 'Subtracts prefix before L from prefix including R in O(1).' }
  ],
  edgeCases: [
    { case: 'Single Element Range (L == R)', handling: 'P[L+1] - P[L] correctly returns nums[L].', example: 'L=2, R=2 -> P[3] - P[2]' },
    { case: 'Full Array Range (L == 0, R == n-1)', handling: 'P[n] - P[0] = Total sum.', example: 'L=0, R=n-1' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting the 1-based indexing offset and hitting off-by-one errors.', solution: 'Always size prefix array n+1 and set P[0] = 0.' },
    { mistake: 'Using prefix sums when array elements undergo frequent live mutations.', solution: 'If elements are updated frequently, prefix sums require O(n) rebuilds. Use a Segment Tree or Fenwick Tree (Binary Indexed Tree) for O(log n) update and query.' }
  ],
  applications: [
    { industry: 'Computer Vision', application: 'Integral Images (Viola-Jones Face Detection)', benefit: 'Computes Haar-like rectangular feature sums in constant time O(1) regardless of box size.' },
    { industry: 'Analytics Platforms', application: 'Financial Rolling Cumulative Revenue', benefit: 'Allows dashboards to calculate any custom date range revenue instantly.' }
  ],
  practiceQuestions: [
    { id: 'dsa-2-2-q1', question: 'Why does the prefix sum array use size n + 1 with index 0 initialized to 0?', hint: 'What happens when L = 0?', answer: 'It eliminates special-case branching when querying from index L = 0: P[R + 1] - P[0] cleanly evaluates to P[R + 1] - 0.' },
    { id: 'dsa-2-2-q2', question: 'How many additions and subtractions are required to compute a 2D submatrix sum?', hint: 'Inclusion-Exclusion Principle.', answer: 'Exactly 4 operations: P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1].' },
    { id: 'dsa-2-2-q3', question: 'When should a Difference Array be preferred over repeated element increments?', hint: 'Consider many updates followed by a single read at the end.', answer: 'When there are many range update operations (e.g. add 5 to range [L, R]) before the final array is queried. Each update takes O(1) in a difference array versus O(n) per update in a standard array.' }
  ],
  quiz: [
    {
      id: 'dsa-2-2-quiz-1',
      question: 'What is the time complexity of answering a range sum query on a precomputed prefix sum array?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(R - L)'],
      correctIndex: 0,
      explanation: 'A range sum query requires exactly one array subtraction P[R + 1] - P[L], executing in strict O(1) time.'
    },
    {
      id: 'dsa-2-2-quiz-2',
      question: 'In a difference array `diff`, what operations are performed to add value V to range [L, R]?',
      options: [
        'diff[L] += V and diff[R + 1] -= V',
        'diff[L] += V for all elements from L to R',
        'diff[L] -= V and diff[R] += V',
        'diff[0] += V'
      ],
      correctIndex: 0,
      explanation: 'Incrementing diff[L] increases all elements from L onward in the prefix reconstruction, while decrementing diff[R + 1] stops the increment from leaking past R.'
    },
    {
      id: 'dsa-2-2-quiz-3',
      question: 'If array elements are continuously modified between queries, which data structure is preferred over static prefix sums?',
      options: ['Fenwick Tree (Binary Indexed Tree)', 'Linked List', 'Hash Table', 'Stack'],
      correctIndex: 0,
      explanation: 'A Fenwick Tree or Segment Tree supports both point updates and prefix sum queries in O(log n) time, resolving the O(n) update bottleneck of static prefix sums.'
    }
  ],
  codingChallenge: {
    title: 'Subarray Sum Equals K',
    problem: 'Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals k. Solve in O(n) time using prefix sums and a hash map.',
    starterCode: `def subarray_sum(nums, k):
    count = 0
    current_sum = 0
    # Map prefix_sum -> frequency
    prefix_counts = {0: 1}

    for x in nums:
        current_sum += x
        # If (current_sum - k) was seen before, those prefix points form valid subarrays
        if current_sum - k in prefix_counts:
            count += prefix_counts[current_sum - k]
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1

    return count

print(subarray_sum([1, 1, 1], 2)) # Expected: 2 ([1,1] at index 0-1 and 1-2)`,
    solution: `def subarray_sum(nums, k):
    count = 0
    current_sum = 0
    prefix_counts = {0: 1}

    for x in nums:
        current_sum += x
        if current_sum - k in prefix_counts:
            count += prefix_counts[current_sum - k]
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1

    return count

print(subarray_sum([1, 1, 1], 2))`,
    hints: [
      'The sum of a subarray nums[i..j] is prefix[j] - prefix[i-1].',
      'We want prefix[j] - prefix[i-1] == k, which rearranges to prefix[i-1] == prefix[j] - k.',
      'Store frequency of prefix sums encountered in a hash map as you iterate in O(n) time.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Prefix sums turn O(n) range queries into O(1) single-step subtractions.',
      'Always use an n + 1 size buffer with P[0] = 0 to avoid index boundary checks.',
      'Difference arrays allow bulk range increments in O(1) time.',
      'Combining prefix sums with hash maps solves subarray sum problems in linear time.'
    ],
    nextLessonId: 'dsa-arrays-two-pointers',
    nextLessonTitle: 'Two Pointer Technique',
    nextLessonModuleId: 'dsa-module-2'
  }
};

// Write out Module 2
writeModuleFile(path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-2.ts'), m2.data, m2Lessons);
console.log('Successfully updated DSA Module 2! Authored count:', Object.keys(m2Lessons).length);
