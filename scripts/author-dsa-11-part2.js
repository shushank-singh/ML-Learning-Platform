const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m11 = getExistingDSALessons(11);
const m11Lessons = { ...m11.lessons };

m11Lessons['dsa-dp-lcs'] = {
  id: 'dsa-dp-lcs',
  moduleId: 'dsa-module-11',
  title: 'Longest Common Subsequence',
  subtitle: '2D Matrix Grid Alignment, String Matching, and Sequence Reconstruction',
  order: 9,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'dp-table',
  objectives: [
    'Define Longest Common Subsequence (LCS) for two strings of lengths m and n.',
    'Formulate the 2D DP recurrence: match adds 1, mismatch takes max(left, up).',
    'Reconstruct the actual LCS string by backtracking through the DP table.',
    'Optimize auxiliary space from O(m * n) to O(min(m, n)) using two rolling rows.'
  ],
  prerequisites: ['Dynamic Programming Fundamentals', 'Strings and Hashing: String Operations'],
  analogy: {
    title: 'Comparing DNA Sequences for Genetic Homology',
    text: 'Geneticists compare two DNA strands: "AGGTAB" and "GXTXAYB". Mutations, insertions, and deletions have occurred over millions of years. To find their closest common evolutionary ancestor, scientists identify the longest sequence of nucleotides that appears in both strands in identical left-to-right order without changing their relative sequence.',
    metaphor: 'LCS matches common characters without requiring contiguity.'
  },
  problemSolved: {
    title: 'Measuring Structural Similarity Between Sequences',
    description: 'Direct string matching only finds exact contiguous matches. LCS finds shared ordering across noisy data, driving `git diff`, file comparison tools, and bioinformatic sequence homology.',
    keyPoints: [
      'Characters need not be contiguous.',
      'Table size (m+1) x (n+1) filled in O(m * n) time.',
      'Powers the Myers diff algorithm behind Git.'
    ]
  },
  intuition: {
    overview: 'If s1[i-1] == s2[j-1], characters match: dp[i][j] = 1 + dp[i-1][j-1] (diagonal step). If they differ: dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (skip one char from either string).',
    steps: [
      { step: 1, title: 'Match Case', description: 's1[i-1] == s2[j-1] -> dp[i][j] = 1 + dp[i-1][j-1].' },
      { step: 2, title: 'Mismatch Case', description: 's1[i-1] != s2[j-1] -> dp[i][j] = max(dp[i-1][j], dp[i][j-1]).' },
      { step: 3, title: 'Backtrack Path', description: 'Walk backwards from dp[m][n] along matching diagonal steps to extract string.' }
    ]
  },
  formalDefinition: {
    text: 'For sequences X = \\langle x_1..x_m \\rangle and Y = \\langle y_1..y_n \\rangle, the LCS length c[i, j] satisfies: c[i, j] = c[i-1, j-1] + 1 if x_i = y_j, else \\max(c[i-1, j], c[i, j-1]).',
    latex: 'dp[i][j] = \\begin{cases} 0 & \\text{if } i=0 \\lor j=0 \\\\ dp[i-1][j-1] + 1 & \\text{if } s_1[i-1] = s_2[j-1] \\\\ \\max(dp[i-1][j], dp[i][j-1]) & \\text{if } s_1[i-1] \\neq s_2[j-1] \\end{cases}'
  },
  complexity: {
    overview: 'Time: O(m * n). Space: O(m * n) full table, O(min(m, n)) space-optimized.',
    cases: [
      { case: 'Best', time: 'O(m * n)', space: 'O(min(m, n))', explanation: 'Complete matrix filled.' },
      { case: 'Average', time: 'O(m * n)', space: 'O(min(m, n))', explanation: 'Standard grid traversal.' },
      { case: 'Worst', time: 'O(m * n)', space: 'O(m * n)', explanation: 'Full table needed for string reconstruction.' }
    ],
    spaceNote: 'O(min(m, n)) space when only length is needed.'
  },
  workedExample: {
    title: 'LCS of "abcde" and "ace"',
    input: 's1 = "abcde", s2 = "ace"',
    steps: [
      { step: 1, action: 'Match "a"', state: 'dp[1][1] = 1 + dp[0][0] = 1', explanation: 'First match.' },
      { step: 2, action: 'Mismatch "b"', state: 'dp[2][1] = max(dp[1][1], dp[2][0]) = 1', explanation: 'Carries forward 1.' },
      { step: 3, action: 'Match "c"', state: 'dp[3][2] = 1 + dp[2][1] = 2', explanation: 'Second match.' },
      { step: 4, action: 'Match "e"', state: 'dp[5][3] = 1 + dp[4][2] = 3', explanation: 'Third match.' }
    ],
    finalOutput: 'Length = 3 (Subsequence: "ace")'
  },
  visualExplanation: {
    title: '2D Alignment Matrix',
    description: 'Visualizing cells: diagonal green arrows on match, horizontal/vertical grey arrows on max inheritance.',
    features: ['Highlighted path shows backtrack route', 'Diagonal steps indicate matched letters']
  },
  pseudocode: {
    title: 'LCS Algorithm',
    code: `function longestCommonSubsequence(s1, s2):
    m = len(s1), n = len(s2)
    dp = 2D array of (m + 1) x (n + 1) filled with 0
    for i from 1 to m:
        for j from 1 to n:
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`
  },
  pythonCode: {
    title: 'Python LCS Length & Reconstruction',
    code: `def longest_common_subsequence(s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]

def reconstruct_lcs(s1: str, s2: str) -> str:
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Backtrack to reconstruct string
    i, j = m, n
    chars = []
    while i > 0 and j > 0:
        if s1[i - 1] == s2[j - 1]:
            chars.append(s1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] >= dp[i][j - 1]:
            i -= 1
        else:
            j -= 1
    return "".join(reversed(chars))`,
    explanation: 'Fills 2D table to calculate length, then walks diagonal matches backwards to reconstruct string.'
  },
  runnableCode: {
    code: `print(longest_common_subsequence("abcde", "ace"))
print(reconstruct_lcs("abcde", "ace"))`,
    expectedOutput: `3\nace`
  },
  lineByLineExplanation: [
    { line: 8, code: 'if s1[i - 1] == s2[j - 1]: dp[i][j] = 1 + dp[i - 1][j - 1]', explanation: 'Matching character: increases LCS length by 1 from the subproblem excluding both characters.' },
    { line: 10, code: 'else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])', explanation: 'Mismatch: inherits best answer from skipping a character from s1 or s2.' }
  ],
  edgeCases: [
    { case: 'Completely disjoint strings (no common letters)', handling: 'Returns 0.', example: '"abc", "xyz" -> 0' },
    { case: 'Identical strings', handling: 'Returns length of string.', example: '"hello", "hello" -> 5' }
  ],
  commonMistakes: [
    { mistake: 'Adding 1 on mismatch: dp[i][j] = 1 + max(...)', solution: 'Only matching characters increment the count; mismatches simply inherit the maximum without adding 1.', codeExample: 'dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])' }
  ],
  applications: [
    { industry: 'Software Tools', application: 'Git diff and Unix diff utilities', benefit: 'Highlights added and removed lines between code revisions.' }
  ],
  practiceQuestions: [
    { id: 'pq-lcs-1', question: 'How can you find the Shortest Common Supersequence (SCS) of two strings using LCS?', hint: 'Length formula.', answer: 'Length of SCS = len(s1) + len(s2) - LCS(s1, s2). The shortest supersequence contains all characters of both strings, sharing their common subsequence.' }
  ],
  quiz: [
    { id: 'q-lcs-1', question: 'In the LCS DP recurrence, what transition occurs when s1[i-1] == s2[j-1]?', options: ['dp[i][j] = 1 + dp[i-1][j-1]', 'dp[i][j] = max(dp[i-1][j], dp[i][j-1])', 'dp[i][j] = dp[i-1][j-1]', 'dp[i][j] = 1 + dp[i][j-1]'], correctIndex: 0, explanation: 'A character match extends the LCS of the prefixes by 1, moving diagonally from (i-1, j-1).' }
  ],
  codingChallenge: {
    title: 'Delete Operation for Two Strings',
    problem: 'Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same, where in each step you can delete one character in either string.',
    hints: ['The characters remaining must form their LCS! Result = len(w1) + len(w2) - 2 * LCS(w1, w2).'],
    starterCode: `def min_distance(word1: str, word2: str) -> int:
    # TODO: Calculate minimum deletions
    pass`,
    solution: `def min_distance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    lcs_len = dp[m][n]
    return (m - lcs_len) + (n - lcs_len)`
  },
  summary: {
    keyTakeaways: ['LCS aligns sequences in O(m * n) time.', 'Matches transition diagonally (+1); mismatches take max of adjacent cells.'],
    nextLessonId: 'dsa-dp-lis',
    nextLessonTitle: 'Longest Increasing Subsequence',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-dp-lis'] = {
  id: 'dsa-dp-lis',
  moduleId: 'dsa-module-11',
  title: 'Longest Increasing Subsequence',
  subtitle: 'Patience Sorting, Binary Search Tails Array, and O(n log n) Optimization',
  order: 10,
  readTimeMinutes: 24,
  difficulty: 'Intermediate',
  visualizerType: 'dp-table',
  objectives: [
    'Define the Longest Increasing Subsequence (LIS) problem.',
    'Implement the standard quadratic O(n²) dynamic programming solution.',
    'Optimize LIS to O(n log n) using Patience Sorting and binary search (tails array).',
    'Reconstruct the actual subsequence elements in O(n log n) time.'
  ],
  prerequisites: ['Dynamic Programming Fundamentals', 'Arrays and Matrices: Binary Search'],
  analogy: {
    title: 'Playing the Solitaire Game "Patience"',
    text: 'A deck of cards is dealt one by one. You place each card onto the leftmost pile whose top card is >= current card (or start a new pile if it exceeds all top cards). The total number of piles created at the end is mathematically equal to the length of the Longest Increasing Subsequence.',
    metaphor: 'The tails array maintains the smallest tail of all increasing subsequences of length i.'
  },
  problemSolved: {
    title: 'Accelerating Quadratic DP to O(n log n) via Monotonic Tails',
    description: 'The standard DP approach checks all j < i, taking O(n²). The Patience Sorting algorithm maintains an array `tails` where `tails[len]` is the smallest ending value of an increasing subsequence of that length, enabling O(log n) binary search insertion.',
    keyPoints: [
      'Standard DP: O(n²) time, O(n) space.',
      'Patience Sort + Binary Search: O(n log n) time, O(n) space.',
      'Tails array is strictly increasing, guaranteeing binary search validity.'
    ]
  },
  intuition: {
    overview: 'Iterate through array. For element x: binary search in `tails` to find the first element >= x. If found, replace it with x (greedy: smaller tail makes it easier to extend later). If not found, append x to tails.',
    steps: [
      { step: 1, title: 'Binary Search', description: 'idx = bisect_left(tails, num).' },
      { step: 2, title: 'Greedy Replace', description: 'If idx < len(tails): tails[idx] = num (lower tail threshold).' },
      { step: 3, title: 'Extend Length', description: 'If idx == len(tails): tails.append(num) (LIS length grows by 1).' }
    ]
  },
  formalDefinition: {
    text: 'Given sequence A = (a_1, ..., a_n), find max k such that i_1 < i_2 < ... < i_k and a_{i_1} < a_{i_2} < ... < a_{i_k}. Tails invariant: tails[k] = \\min \\{a_j : \\exists \\text{ LIS of length } k+1 \\text{ ending at } a_j\\}.',
    latex: '\\text{tails}[0] < \\text{tails}[1] < \\dots < \\text{tails}[L-1] \\implies \\text{bisect\\_left in } \\mathcal{O}(\\log n)'
  },
  complexity: {
    overview: 'Quadratic DP: O(n²) time. Patience Sorting: O(n log n) time, O(n) space.',
    cases: [
      { case: 'Best', time: 'O(n log n)', space: 'O(n)', explanation: 'Optimal binary search insertion for every element.' },
      { case: 'Average', time: 'O(n log n)', space: 'O(n)', explanation: 'Patience sorting.' },
      { case: 'Worst', time: 'O(n log n)', space: 'O(n)', explanation: 'Reverse sorted array still executes binary search per step.' }
    ],
    spaceNote: 'O(n) auxiliary memory for tails array.'
  },
  workedExample: {
    title: 'Patience Sorting on [10, 9, 2, 5, 3, 7, 101, 18]',
    input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]',
    steps: [
      { step: 1, action: 'Process 10, 9, 2', state: 'tails=[2]', explanation: '9 replaces 10; 2 replaces 9.' },
      { step: 2, action: 'Process 5', state: 'tails=[2, 5]', explanation: '5 > 2 -> appends.' },
      { step: 3, action: 'Process 3', state: 'tails=[2, 3]', explanation: '3 replaces 5 (better tail).' },
      { step: 4, action: 'Process 7', state: 'tails=[2, 3, 7]', explanation: '7 > 3 -> appends.' },
      { step: 5, action: 'Process 101', state: 'tails=[2, 3, 7, 101]', explanation: '101 > 7 -> appends.' },
      { step: 6, action: 'Process 18', state: 'tails=[2, 3, 7, 18]', explanation: '18 replaces 101.' }
    ],
    finalOutput: 'LIS Length = len(tails) = 4 (e.g. [2, 3, 7, 18])'
  },
  visualExplanation: {
    title: 'Patience Card Piles',
    description: 'Visualizing cards stacking onto piles; number of piles equals LIS length.',
    features: ['Cards replace tops of existing piles', 'New pile started only when card exceeds all pile tops']
  },
  pseudocode: {
    title: 'LIS O(n log n) Algorithm',
    code: `function lengthOfLIS(nums):
    tails = []
    for x in nums:
        idx = binarySearchFirstGreaterEqual(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)`
  },
  pythonCode: {
    title: 'Python LIS (O(n²) and O(n log n))',
    code: `import bisect

def length_of_lis_dp(nums: list[int]) -> int:
    # O(n^2) DP approach
    if not nums: return 0
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], 1 + dp[j])
    return max(dp)

def length_of_lis(nums: list[int]) -> int:
    # O(n log n) Patience sorting
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)`,
    explanation: 'Demonstrates both traditional O(n²) quadratic DP and optimal O(n log n) binary search.'
  },
  runnableCode: {
    code: `nums = [10, 9, 2, 5, 3, 7, 101, 18]
print(length_of_lis_dp(nums))
print(length_of_lis(nums))`,
    expectedOutput: `4\n4`
  },
  lineByLineExplanation: [
    { line: 17, code: 'idx = bisect.bisect_left(tails, x)', explanation: 'Finds first element >= x in O(log n) time using binary search on the sorted tails array.' },
    { line: 21, code: 'tails[idx] = x', explanation: 'Greedily replaces tail with smaller value x, increasing chances of extending sequence in future.' }
  ],
  edgeCases: [
    { case: 'Strictly decreasing array', handling: 'tails replaces index 0 repeatedly; returns length 1.', example: '[5, 4, 3, 2, 1] -> 1' }
  ],
  commonMistakes: [
    { mistake: 'Assuming `tails` array contains the actual LIS subsequence', solution: 'tails only tracks smallest endpoints of each length; it does not represent a valid sequential subsequence. To reconstruct the sequence, store parent predecessor pointers.', codeExample: '# tails length is correct, but tails elements are not the subsequence!' }
  ],
  applications: [
    { industry: 'Data Compression', application: 'Text and image sequence diffing', benefit: 'Finds maximum undisturbed subsequence.' }
  ],
  practiceQuestions: [
    { id: 'pq-lis-1', question: 'How do you modify LIS to find the Longest NON-DECREASING Subsequence (allowing duplicates)?', hint: 'Change bisect_left to bisect_right.', answer: 'Use bisect_right instead of bisect_left. This replaces elements only when strictly greater, allowing equal elements to extend the array.' }
  ],
  quiz: [
    { id: 'q-lis-1', question: 'What is the time complexity of the optimal binary search algorithm for LIS of size n?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], correctIndex: 0, explanation: 'Processing n elements where each triggers an O(log n) binary search in the tails array takes O(n log n) total time.' }
  ],
  codingChallenge: {
    title: 'Russian Doll Envelopes',
    problem: 'You have a 2D array of envelopes where envelopes[i] = [wi, hi]. An envelope can fit into another if both width and height are strictly greater. Return the maximum number of envelopes you can Russian doll (nest).',
    hints: ['Sort width ascending; for identical widths, sort height DESCENDING. Then run LIS on heights in O(n log n).'],
    starterCode: `def max_envelopes(envelopes: list[list[int]]) -> int:
    # TODO: Find max nested envelopes
    pass`,
    solution: `import bisect

def max_envelopes(envelopes: list[list[int]]) -> int:
    # Sort width ascending; height descending for ties to avoid same-width nesting
    envelopes.sort(key=lambda x: (x[0], -x[1]))
    tails = []
    for _, h in envelopes:
        idx = bisect.bisect_left(tails, h)
        if idx == len(tails):
            tails.append(h)
        else:
            tails[idx] = h
    return len(tails)`
  },
  summary: {
    keyTakeaways: ['LIS is solved in O(n²) using DP, and optimized to O(n log n) using Patience Sorting + Binary Search.', 'The tails array maintains minimum endpoints for each length.'],
    nextLessonId: 'dsa-dp-edit-distance',
    nextLessonTitle: 'Edit Distance (Levenshtein Distance)',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-dp-edit-distance'] = {
  id: 'dsa-dp-edit-distance',
  moduleId: 'dsa-module-11',
  title: 'Edit Distance (Levenshtein Distance)',
  subtitle: 'Insert, Delete, and Replace Operations in 2D String Alignment',
  order: 11,
  readTimeMinutes: 24,
  difficulty: 'Advanced',
  visualizerType: 'dp-table',
  objectives: [
    'Define Levenshtein Edit Distance: minimum operations (insert, delete, replace) to transform word1 into word2.',
    'Formulate the 3-choice DP recurrence in an (m + 1) x (n + 1) matrix.',
    'Identify base cases: transforming from/to empty string requires i or j insertions/deletions.',
    'Trace edit scripts (sequence of mutations) by backtracking through the matrix.'
  ],
  prerequisites: ['Longest Common Subsequence'],
  analogy: {
    title: 'Spell-Check Auto-Correction',
    text: 'You type "hourse" into a search bar. The search engine thinks: you can change it to "horse" by deleting \'u\' (1 edit), or change it to "house" by replacing \'r\' with \'u\' and deleting \'r\' (2 edits). Because 1 edit is closer than 2 edits, it suggests "Did you mean: horse?".',
    metaphor: 'Edit distance quantifies how many atomic edits separate two words.'
  },
  problemSolved: {
    title: 'Fuzzy String Matching and Spell Correction',
    description: 'Exact string equality is binary (matches or fails). Edit distance provides a continuous metric of similarity, powering autocorrect, speech-to-text fuzzy matching, and plagiarism detection.',
    keyPoints: [
      '3 operations: Insert, Delete, Replace.',
      'Computes distance matrix in O(m * n) time and O(m * n) space.',
      'Can be space-optimized to O(min(m, n)) using rolling arrays.'
    ]
  },
  intuition: {
    overview: 'If word1[i-1] == word2[j-1], characters match: cost is 0 -> dp[i][j] = dp[i-1][j-1]. Otherwise, choose min of: 1 + dp[i][j-1] (Insert), 1 + dp[i-1][j] (Delete), 1 + dp[i-1][j-1] (Replace).',
    steps: [
      { step: 1, title: 'Base Cases', description: 'dp[i][0] = i (i deletes), dp[0][j] = j (j inserts).' },
      { step: 2, title: 'Evaluate 3 Choices', description: 'If mismatch: dp[i][j] = 1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1]).' },
      { step: 3, title: 'Result', description: 'dp[m][n] holds minimal edit operations.' }
    ]
  },
  formalDefinition: {
    text: 'The Levenshtein distance \\text{lev}(a, b) between strings a and b of lengths |a| and |b| satisfies: \\text{lev}(i, j) = \\min\\big(\\text{lev}(i-1, j) + 1, \\, \\text{lev}(i, j-1) + 1, \\, \\text{lev}(i-1, j-1) + 1_{a_i \\neq b_j}\\big).',
    latex: 'dp[i][j] = \\begin{cases} \\max(i, j) & \\text{if } \\min(i, j) = 0 \\\\ dp[i-1][j-1] & \\text{if } w_1[i-1] = w_2[j-1] \\\\ 1 + \\min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) & \\text{otherwise} \\end{cases}'
  },
  complexity: {
    overview: 'Time: O(m * n). Space: O(m * n) full table, O(n) space-optimized.',
    cases: [
      { case: 'Best', time: 'O(m * n)', space: 'O(n)', explanation: 'Complete matrix evaluated.' },
      { case: 'Average', time: 'O(m * n)', space: 'O(n)', explanation: 'Standard grid filling.' },
      { case: 'Worst', time: 'O(m * n)', space: 'O(m * n)', explanation: 'When full edit script reconstruction is required.' }
    ],
    spaceNote: 'Can be computed in 2 rows O(n) memory.'
  },
  workedExample: {
    title: 'Transform "horse" into "ros"',
    input: 'word1 = "horse", word2 = "ros"',
    steps: [
      { step: 1, action: 'Replace "h" with "r"', state: '"horse" -> "rorse"', explanation: '1 edit.' },
      { step: 2, action: 'Remove "r"', state: '"rorse" -> "rose"', explanation: '2 edits.' },
      { step: 3, action: 'Remove "e"', state: '"rose" -> "ros"', explanation: '3 edits.' }
    ],
    finalOutput: 'Minimum Edit Distance = 3'
  },
  visualExplanation: {
    title: '3-Directional Cell Transition',
    description: 'Visualizing cell (i, j) pulling values from Top (Delete), Left (Insert), and Diagonal (Replace).',
    features: ['Top arrow represents Deletion', 'Left arrow represents Insertion', 'Diagonal arrow represents Match or Substitution']
  },
  pseudocode: {
    title: 'Edit Distance Algorithm',
    code: `function minDistance(word1, word2):
    m = len(word1), n = len(word2)
    dp = matrix of (m + 1) x (n + 1)
    for i in 0..m: dp[i][0] = i
    for j in 0..n: dp[0][j] = j
    for i from 1 to m:
        for j from 1 to n:
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[m][n]`
  },
  pythonCode: {
    title: 'Python Edit Distance Implementation',
    code: `def min_edit_distance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases: converting to/from empty string
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] # Free match
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],    # Deletion
                    dp[i][j - 1],    # Insertion
                    dp[i - 1][j - 1] # Replacement
                )

    return dp[m][n]`,
    explanation: 'Fills (m+1) x (n+1) table checking Insert, Delete, and Replace choices.'
  },
  runnableCode: {
    code: `print(min_edit_distance("horse", "ros"))      # 3
print(min_edit_distance("intention", "execution")) # 5`,
    expectedOutput: `3\n5`
  },
  lineByLineExplanation: [
    { line: 6, code: 'dp[i][0] = i', explanation: 'Deleting i characters from word1 to reach empty string word2.' },
    { line: 13, code: 'if word1[i - 1] == word2[j - 1]: dp[i][j] = dp[i - 1][j - 1]', explanation: 'Matching character requires 0 edits, inheriting exact diagonal value.' },
    { line: 15, code: 'dp[i][j] = 1 + min(...)', explanation: 'Takes 1 edit plus optimal choice among Delete (top), Insert (left), and Replace (diagonal).' }
  ],
  edgeCases: [
    { case: 'One string is empty', handling: 'Base case returns length of non-empty string.', example: '"" and "hello" -> 5' }
  ],
  commonMistakes: [
    { mistake: 'Adding 1 even when characters match', solution: 'When word1[i-1] == word2[j-1], the edit cost is ZERO: dp[i][j] = dp[i-1][j-1].', codeExample: 'if match: dp[i][j] = dp[i-1][j-1] # NOT + 1' }
  ],
  applications: [
    { industry: 'Natural Language Processing', application: 'Autocorrect suggestion and fuzzy entity matching', benefit: 'Ranks candidate dictionary corrections by minimal edit distance.' }
  ],
  practiceQuestions: [
    { id: 'pq-ed-1', question: 'How can Edit Distance be optimized to O(n) memory?', hint: 'Look at previous row dependencies.', answer: 'Row i only depends on row i-1; we can maintain two rows `prev` and `curr`, swapping them after each row iteration to achieve O(min(m, n)) space.' }
  ],
  quiz: [
    { id: 'q-ed-1', question: 'Which operation in the Edit Distance recurrence corresponds to moving from cell (i-1, j)?', options: ['Delete character from word1', 'Insert character into word1', 'Replace character', 'No-op'], correctIndex: 0, explanation: 'Cell (i-1, j) represents having already matched all of word2[0..j-1] using one fewer character from word1, which corresponds to deleting word1[i-1].' }
  ],
  codingChallenge: {
    title: 'One Edit Distance',
    problem: 'Given two strings s and t, return True if they are both one edit distance apart, False otherwise.',
    hints: ['Compare lengths; if abs(len(s) - len(t)) > 1, return False immediately.'],
    starterCode: `def is_one_edit_distance(s: str, t: str) -> bool:
    # TODO: Check if exactly one edit apart
    pass`,
    solution: `def is_one_edit_distance(s: str, t: str) -> bool:
    m, n = len(s), len(t)
    if abs(m - n) > 1: return False
    if m > n: return is_one_edit_distance(t, s) # Ensure s is shorter
    for i in range(m):
        if s[i] != t[i]:
            if m == n:
                return s[i+1:] == t[i+1:] # Replace
            else:
                return s[i:] == t[i+1:]   # Insert
    return m + 1 == n`
  },
  summary: {
    keyTakeaways: ['Edit Distance models Insert, Delete, and Replace in O(m * n) time.', 'Matches cost 0 (diagonal); mismatches cost 1 + min(three neighbors).'],
    nextLessonId: 'dsa-dp-grid',
    nextLessonTitle: 'Grid DP Problems',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-dp-grid'] = {
  id: 'dsa-dp-grid',
  moduleId: 'dsa-module-11',
  title: 'Grid DP Problems',
  subtitle: 'Unique Paths, Minimum Path Sum, and Directional Invariants in 2D Lattices',
  order: 12,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'dp-table',
  objectives: [
    'Model directional movement in 2D grids (moving only right and down).',
    'Solve Unique Paths (combinatorial counting) and Minimum Path Sum (cost minimization).',
    'Incorporate obstacles into grid states (grid[r][c] == 1 blocks path).',
    'Compress 2D grid DP tables from O(m * n) to 1D vector O(n) space.'
  ],
  prerequisites: ['Dynamic Programming Fundamentals'],
  analogy: {
    title: 'The Downtown Manhattan Taxi Routing',
    text: 'A taxi starts at the corner of 1st Street and 1st Avenue and must drive to 10th Street and 10th Avenue. Because all streets are one-way heading East or South, the taxi can only drive Right or Down. To find the easiest route, the driver tallies traffic delays at each intersection from the previous North and West intersections.',
    metaphor: 'Any cell (r, c) can only be entered from cell (r-1, c) above or cell (r, c-1) to the left.'
  },
  problemSolved: {
    title: 'Optimal Routing and Path Counting on 2D Grids',
    description: 'Pathfinding on unrestricted grids requires BFS/Dijkstra. On directional DAG grids (e.g. only Right and Down), DP solves counting and cost minimization in simple O(m * n) time with zero priority queue overhead.',
    keyPoints: [
      'Movement strictly bounded: only Right and Down.',
      'Counting: dp[r][c] = dp[r-1][c] + dp[r][c-1].',
      'Min cost: dp[r][c] = cost[r][c] + min(dp[r-1][c], dp[r][c-1]).'
    ]
  },
  intuition: {
    overview: 'Because movement is restricted to down and right, cell (r, c) depends strictly on its top neighbor (r-1, c) and left neighbor (r, c-1). Base cases fill the first row and first column with 1s.',
    steps: [
      { step: 1, title: 'First Row & Column', description: 'dp[0][c] = 1, dp[r][0] = 1 (only 1 straight path).' },
      { step: 2, title: 'Fill Grid', description: 'For r in 1..m-1: for c in 1..n-1: dp[r][c] = dp[r-1][c] + dp[r][c-1].' },
      { step: 3, title: 'Target Cell', description: 'dp[m-1][n-1] contains total unique paths.' }
    ]
  },
  formalDefinition: {
    text: 'On an m x n grid with allowed moves \\{(1, 0), (0, 1)\\}, total paths from (0, 0) to (m-1, n-1) equals the binomial coefficient \\binom{(m-1) + (n-1)}{m-1}. In DP: dp[r][c] = dp[r-1][c] + dp[r][c-1].',
    latex: '\\text{Paths}(m, n) = \\binom{m + n - 2}{m - 1} = \\frac{(m + n - 2)!}{(m - 1)! (n - 1)!}'
  },
  complexity: {
    overview: 'Time: O(m * n). Space: O(n) rolling 1D array.',
    cases: [
      { case: 'Best', time: 'O(m * n)', space: 'O(n)', explanation: 'Optimal 1D space rolling.' },
      { case: 'Average', time: 'O(m * n)', space: 'O(n)', explanation: 'Single pass over grid.' },
      { case: 'Worst', time: 'O(m * n)', space: 'O(m * n)', explanation: 'Uncompressed full 2D table.' }
    ],
    spaceNote: 'O(n) space using a single rolling row.'
  },
  workedExample: {
    title: 'Unique Paths on 3 x 3 Grid',
    input: 'm = 3, n = 3',
    steps: [
      { step: 1, action: 'Row 0', state: '[1, 1, 1]', explanation: 'Only 1 way to travel straight East.' },
      { step: 2, action: 'Row 1', state: '[1, 2, 3]', explanation: 'dp[1][1] = 1+1 = 2; dp[1][2] = 2+1 = 3.' },
      { step: 3, action: 'Row 2', state: '[1, 3, 6]', explanation: 'dp[2][1] = 1+2 = 3; dp[2][2] = 3+3 = 6.' }
    ],
    finalOutput: 'Total Unique Paths = 6'
  },
  visualExplanation: {
    title: 'Pascal\'s Triangle in a Grid',
    description: 'Visualizing numbers accumulating rightward and downward identically to Pascal\'s triangle.',
    features: ['Cell (r, c) equals sum of top and left neighbors', 'Obstacle cells set value to 0']
  },
  pseudocode: {
    title: 'Unique Paths Algorithm',
    code: `function uniquePaths(m, n):
    dp = array of size n with 1
    for r from 1 to m - 1:
        for c from 1 to n - 1:
            dp[c] = dp[c] + dp[c - 1]
    return dp[n - 1]`
  },
  pythonCode: {
    title: 'Python Unique Paths and Min Path Sum',
    code: `def unique_paths(m: int, n: int) -> int:
    # Space-optimized O(n) tabulation
    row = [1] * n
    for _ in range(1, m):
        for c in range(1, n):
            row[c] += row[c - 1]
    return row[-1]

def min_path_sum(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    dp = [float('inf')] * (n + 1)
    dp[1] = 0 # Base seed
    
    for r in range(m):
        for c in range(n):
            dp[c + 1] = grid[r][c] + min(dp[c + 1], dp[c])
            
    return dp[n]`,
    explanation: 'Space-optimized 1D row rolling for path counting and minimum cost path.'
  },
  runnableCode: {
    code: `print(unique_paths(3, 7)) # 28
grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]
print(min_path_sum(grid)) # 1 -> 3 -> 1 -> 1 -> 1 = 7`,
    expectedOutput: `28\n7`
  },
  lineByLineExplanation: [
    { line: 6, code: 'row[c] += row[c - 1]', explanation: 'row[c] holds the top neighbor value from the previous row; row[c-1] holds the left neighbor value from current row. Summing updates cell in O(1) space.' }
  ],
  edgeCases: [
    { case: '1 x n or m x 1 grid', handling: 'Returns 1 (only 1 direct straight path exists).', example: 'm=1, n=5 -> 1' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting to set obstacle cell DP value to 0 in Unique Paths II', solution: 'If grid[r][c] == 1 (obstacle), dp[r][c] must be set strictly to 0 because no path can traverse through an obstacle.', codeExample: 'if grid[r][c] == 1: dp[r][c] = 0' }
  ],
  applications: [
    { industry: 'Semiconductor Design', application: 'VLSI chip wire routing on silicon grids', benefit: 'Computes optimal signal trace layouts minimizing wire length.' }
  ],
  practiceQuestions: [
    { id: 'pq-gp-1', question: 'How can Unique Paths on an m x n grid with NO obstacles be solved in O(m) time and O(1) space?', hint: 'Combinatorics.', answer: 'Using the combination formula C((m-1) + (n-1), m-1) = (m+n-2)! / ((m-1)! * (n-1)!) computed via simple multiplicative loop.' }
  ],
  quiz: [
    { id: 'q-gp-1', question: 'In a grid where you can only move Right and Down, what earlier states does cell (r, c) depend on?', options: ['(r-1, c) and (r, c-1)', '(r+1, c) and (r, c+1)', '(r-1, c-1)', '(r-1, c+1)'], correctIndex: 0, explanation: 'Entering (r, c) by moving down comes from (r-1, c); entering by moving right comes from (r, c-1).' }
  ],
  codingChallenge: {
    title: 'Unique Paths II (With Obstacles)',
    problem: 'You are given an m x n integer array obstacleGrid. Return the number of possible unique paths from top-left to bottom-right, where 1 marks an obstacle and 0 marks an empty space.',
    hints: ['If obstacleGrid[r][c] == 1, dp[c] = 0. Else dp[c] += dp[c-1].'],
    starterCode: `def unique_paths_with_obstacles(obstacleGrid: list[list[int]]) -> int:
    # TODO: Calculate paths with obstacles
    pass`,
    solution: `def unique_paths_with_obstacles(obstacleGrid: list[list[int]]) -> int:
    m, n = len(obstacleGrid), len(obstacleGrid[0])
    dp = [0] * n
    dp[0] = 1 if obstacleGrid[0][0] == 0 else 0
    for r in range(m):
        for c in range(n):
            if obstacleGrid[r][c] == 1:
                dp[c] = 0
            elif c > 0:
                dp[c] += dp[c - 1]
    return dp[-1]`
  },
  summary: {
    keyTakeaways: ['Grid DP aggregates from top and left neighbors.', 'Can be space-optimized to a single 1D vector of length n.'],
    nextLessonId: 'dsa-dp-partition',
    nextLessonTitle: 'Partition and Subset Sum Problems',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-dp-partition'] = {
  id: 'dsa-dp-partition',
  moduleId: 'dsa-module-11',
  title: 'Partition and Subset Sum Problems',
  subtitle: 'Equi-Partition, 0/1 Knapsack Boolean Reductions, and Bitset Acceleration',
  order: 13,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'dp-table',
  objectives: [
    'Model Partition Equal Subset Sum as a 0/1 Knapsack boolean subset sum problem.',
    'Formulate target sum = total_sum / 2 invariant.',
    'Implement space-optimized 1D boolean array iterating backwards from target down to num.',
    'Explore bitset manipulation (bit shift `dp |= dp << num`) for 64x hardware speedup.'
  ],
  prerequisites: ['0/1 Knapsack Problem', 'Dynamic Programming Fundamentals'],
  analogy: {
    title: 'Balancing a Cargo Plane Left and Right Cargo Holds',
    text: 'A cargo plane has two side compartments. A team of movers has boxes weighing various amounts totaling 100 kg. Can they divide the boxes so exactly 50 kg is loaded on the left side and 50 kg on the right side? If so, the flight is balanced; if no combination sums to 50 kg, the plane cannot fly.',
    metaphor: 'Partitioning into two equal halves is equivalent to finding a subset that sums to total / 2.'
  },
  problemSolved: {
    title: 'Exact Subsum Partitioning in Pseudopolynomial Time',
    description: 'The Subset Sum problem is NP-complete. Using dynamic programming, we solve it in pseudopolynomial O(n * target) time, enabling practical exact partition validation.',
    keyPoints: [
      'If total_sum is odd, equal partition is mathematically impossible (return False).',
      'Target = total_sum // 2.',
      'Reverse 1D loop prevents reusing the same element multiple times.'
    ]
  },
  intuition: {
    overview: 'Check if total sum is even. Target is total // 2. Maintain boolean array `dp` of size target + 1 with dp[0] = True. For each num in nums, loop j from target DOWN to num: dp[j] = dp[j] or dp[j - num].',
    steps: [
      { step: 1, title: 'Parity Check', description: 'If sum(nums) % 2 != 0: return False.' },
      { step: 2, title: 'Backward Loop', description: 'For num in nums: for j in target..num: dp[j] = dp[j] or dp[j - num].' },
      { step: 3, title: 'Extract Answer', description: 'Return dp[target].' }
    ]
  },
  formalDefinition: {
    text: 'Partition Equal Subset Sum asks if \\exists S\' \\subseteq S such that \\sum_{x \\in S\'} x = \\frac{1}{2} \\sum_{x \\in S} x. Recurrence: dp[i, j] = dp[i-1, j] \\lor dp[i-1, j - a_i].',
    latex: 'dp[j] \\leftarrow dp[j] \\lor dp[j - a_i] \\quad \\text{for } j = \\text{target} \\dots a_i'
  },
  complexity: {
    overview: 'Time: O(n * target). Space: O(target) 1D boolean array.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Total sum is odd (returns False instantly).' },
      { case: 'Average', time: 'O(n * target)', space: 'O(target)', explanation: 'Standard pseudopolynomial fill.' },
      { case: 'Worst', time: 'O(n * target)', space: 'O(target)', explanation: 'All elements evaluated.' }
    ],
    spaceNote: 'O(target) memory.'
  },
  workedExample: {
    title: 'Partition [1, 5, 11, 5]',
    input: 'nums = [1, 5, 11, 5], total = 22 -> target = 11',
    steps: [
      { step: 1, action: 'Initial', state: 'dp = {0: True}', explanation: 'Sum 0 is always achievable.' },
      { step: 2, action: 'Process 1', state: 'dp achieves {0, 1}', explanation: 'Sum 1 achievable.' },
      { step: 3, action: 'Process 5', state: 'dp achieves {0, 1, 5, 6}', explanation: 'Sums 5, 6 achievable.' },
      { step: 4, action: 'Process 11', state: 'dp achieves {0, 1, 5, 6, 11, 12, ...}', explanation: 'Target 11 achieved! Return True.' }
    ],
    finalOutput: 'True ([11] and [1, 5, 5])'
  },
  visualExplanation: {
    title: '1D Boolean Sieve Propagation',
    description: 'Visualizing boolean True flags propagating rightward along array slots like dominoes.',
    features: ['Backward loop prevents duplicate usage', 'Flag hitting target triggers True']
  },
  pseudocode: {
    title: 'Partition Equal Subset Sum',
    code: `function canPartition(nums):
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    dp = boolean array of size target + 1 with False
    dp[0] = True
    for num in nums:
        for j from target down to num:
            dp[j] = dp[j] or dp[j - num]
    return dp[target]`
  },
  pythonCode: {
    title: 'Python Partition Equal Subset Sum (1D DP and Bitset)',
    code: `def can_partition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2

    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        # Loop backwards to prevent using same number twice
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

    return dp[target]

def can_partition_bitset(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    # Bitset optimization: bit i is 1 if sum i is achievable
    bits = 1 # 2^0 = 1 (sum 0 achievable)
    for num in nums:
        bits |= bits << num
    return bool((bits >> target) & 1)`,
    explanation: 'Demonstrates 1D backward loop DP and ultra-fast bitwise integer shifting.'
  },
  runnableCode: {
    code: `print(can_partition([1, 5, 11, 5]))        # True (1+5+5 = 11)
print(can_partition([1, 2, 3, 5]))           # False (sum 11 is odd)
print(can_partition_bitset([1, 5, 11, 5]))   # True`,
    expectedOutput: `True\nFalse\nTrue`
  },
  lineByLineExplanation: [
    { line: 12, code: 'for j in range(target, num - 1, -1):', explanation: 'Crucial: looping BACKWARDS ensures dp[j - num] represents state from previous items, preventing reuse of current num.' },
    { line: 24, code: 'bits |= bits << num', explanation: 'Bitset trick: bitwise left-shift shifts all achievable sums by num in a single hardware CPU instruction.' }
  ],
  edgeCases: [
    { case: 'Single element array', handling: 'sum is odd or target > 0, returns False.', example: '[42] -> False' }
  ],
  commonMistakes: [
    { mistake: 'Iterating forward: for j in range(num, target + 1)', solution: 'Forward iteration solves Unbounded Knapsack (reusing same element infinite times); 0/1 Knapsack requires backward iteration.', codeExample: 'for j in range(target, num - 1, -1): # BACKWARDS' }
  ],
  applications: [
    { industry: 'Cryptography', application: 'Merkle-Hellman knapsack cryptosystems', benefit: 'Relies on the computational hardness of the subset sum problem.' }
  ],
  practiceQuestions: [
    { id: 'pq-pss-1', question: 'How can you find the minimum difference between two partitioned subsets (Partition Array into Two Arrays to Minimize Sum Difference)?', hint: 'Find the largest sum <= total // 2.', answer: 'Find largest j <= total // 2 where dp[j] is True. The minimum difference is total - 2 * j.' }
  ],
  quiz: [
    { id: 'q-pss-1', question: 'Why must the inner target loop iterate BACKWARDS in 0/1 Subset Sum DP?', options: ['To prevent using the same array element multiple times in the same sum', 'Because Python reversed() runs faster', 'To avoid index out of bounds', 'To sort the array descending'], correctIndex: 0, explanation: 'Iterating backwards ensures that when computing dp[j] = dp[j - num], dp[j - num] has not yet been updated with the current element.' }
  ],
  codingChallenge: {
    title: 'Target Sum (+ and - assignments)',
    problem: 'You are given an integer array nums and an integer target. Build an expression by adding "+" or "-" before each integer and evaluate. Return the number of different expressions that evaluate to target.',
    hints: ['P - N = target and P + N = sum => 2P = target + sum => Subset Sum for P = (target + sum) / 2.'],
    starterCode: `def find_target_sum_ways(nums: list[int], target: int) -> int:
    # TODO: Count expressions matching target
    pass`,
    solution: `def find_target_sum_ways(nums: list[int], target: int) -> int:
    total = sum(nums)
    if (total + target) % 2 != 0 or abs(target) > total:
        return 0
    s1 = (total + target) // 2
    dp = [0] * (s1 + 1)
    dp[0] = 1
    for num in nums:
        for j in range(s1, num - 1, -1):
            dp[j] += dp[j - num]
    return dp[s1]`
  },
  summary: {
    keyTakeaways: ['Partitioning reduces to 0/1 subset sum with target = total // 2.', 'Looping backwards maintains 0/1 single-use invariant in 1D array.'],
    nextLessonId: 'dsa-dp-bitmask',
    nextLessonTitle: 'Bitmask DP Introduction',
    nextLessonModuleId: 'dsa-module-11'
  }
};

m11Lessons['dsa-dp-bitmask'] = {
  id: 'dsa-dp-bitmask',
  moduleId: 'dsa-module-11',
  title: 'Bitmask DP Introduction',
  subtitle: 'Subset State Compression, Traveling Salesperson (TSP), and Hamiltonian Paths in O(2ⁿ n²)',
  order: 14,
  readTimeMinutes: 24,
  difficulty: 'Advanced',
  visualizerType: 'dp-table',
  objectives: [
    'Represent subsets of up to 20-30 items as integer bitmasks.',
    'Execute bitwise operations: test bit (mask & (1 << i)), set bit (mask | (1 << i)).',
    'Solve the Traveling Salesperson Problem (TSP) in O(2ⁿ n²) time instead of naive O(n!).',
    'Understand when bitmask DP is applicable (typically n <= 20).'
  ],
  prerequisites: ['Permutations and Combinations', 'Dynamic Programming Fundamentals'],
  analogy: {
    title: 'The Salesperson Checklist as Light Switches',
    text: 'A salesperson traveling across 10 cities carries a panel with 10 toggle light switches. When City 3 is visited, switch 3 is flipped ON (1). The exact collection of visited cities is represented by a single compact binary integer: 0000001000.',
    metaphor: 'An n-bit integer compactly represents which subset of n items has been processed.'
  },
  problemSolved: {
    title: 'Beating Factorial Complexity in Permutation Search Spaces',
    description: 'Permutation problems like Traveling Salesperson take O(n!) brute-force time (16! \\approx 2 \\times 10^{13} operations). Bitmask DP stores states as (visited_mask, last_node), solving it in O(2^n n²) time (for n=16, 2^{16} \\times 256 \\approx 1.6 \\times 10^7, solvable in 0.1s).',
    keyPoints: [
      'Compresses subset of visited elements into an integer mask.',
      'Reduces O(n!) to O(2^n n²).',
      'Signaled by problem constraints where n <= 20.'
    ]
  },
  intuition: {
    overview: 'Let dp[mask][u] be the minimum cost to visit the subset of vertices indicated by bitmask `mask`, ending at vertex u. To transition to an unvisited vertex v: dp[mask | (1 << v)][v] = min(dp[mask | (1 << v)][v], dp[mask][u] + dist[u][v]).',
    steps: [
      { step: 1, title: 'Mask Interpretation', description: 'If (mask >> i) & 1 == 1, vertex i is visited.' },
      { step: 2, title: 'Base State', description: 'dp[1 << start][start] = 0 (only start visited).' },
      { step: 3, title: 'Bit Transition', description: 'For unvisited v (mask & (1 << v) == 0): relax new_mask = mask | (1 << v).' }
    ]
  },
  formalDefinition: {
    text: 'In the Held-Karp algorithm for TSP, C(S, u) is the minimum cost path visiting each vertex in S \\subseteq V exactly once, ending at u. Recurrence: C(S, u) = \\min_{v \\in S \\setminus \\{u\\}} \\big(C(S \\setminus \\{u\\}, v) + \\text{dist}(v, u)\\big).',
    latex: 'dp[\\text{mask}][u] = \\min_{v \\in \\text{mask} \\setminus \\{u\\}} \\big( dp[\\text{mask} \\setminus \\{u\\}][v] + d(v, u) \\big)'
  },
  complexity: {
    overview: 'Time: O(2ⁿ n²). Space: O(2ⁿ n).',
    cases: [
      { case: 'Best', time: 'O(2ⁿ n²)', space: 'O(2ⁿ n)', explanation: 'Visits all 2^n subset masks.' },
      { case: 'Average', time: 'O(2ⁿ n²)', space: 'O(2ⁿ n)', explanation: 'Exponential in n, polynomial in transition.' },
      { case: 'Worst', time: 'O(2ⁿ n²)', space: 'O(2ⁿ n)', explanation: 'Practical limit is n <= 20.' }
    ],
    spaceNote: 'O(2^n * n) 2D table.'
  },
  workedExample: {
    title: 'Bitmask Encoding for 4 Cities {0, 1, 2, 3}',
    input: 'n = 4',
    steps: [
      { step: 1, action: 'Only City 0 visited', state: 'Binary 0001 = 1', explanation: '1 << 0 = 1.' },
      { step: 2, action: 'Cities 0 and 2 visited', state: 'Binary 0101 = 5', explanation: '(1 << 0) | (1 << 2) = 1 | 4 = 5.' },
      { step: 3, action: 'Check if City 2 visited in mask 5', state: '(5 >> 2) & 1 == 1 -> True', explanation: 'Bit test.' },
      { step: 4, action: 'All 4 cities visited', state: 'Binary 1111 = 15 = (1 << 4) - 1', explanation: 'Full mask.' }
    ],
    finalOutput: 'All subsets mapped to integers 0..15.'
  },
  visualExplanation: {
    title: 'Hypercube State Lattice',
    description: 'Visualizing bitmask states as vertices of an n-dimensional hypercube moving from 0000 to 1111.',
    features: ['Level k contains masks with k set bits', 'Edges represent adding one new visited city']
  },
  pseudocode: {
    title: 'Traveling Salesperson (Held-Karp)',
    code: `function tsp(dist, n):
    dp = 2D array of size (1 << n) x n filled with infinity
    dp[1][0] = 0 # start at 0
    for mask from 1 to (1 << n) - 1:
        for u in 0..n-1:
            if dp[mask][u] == infinity: continue
            for v in 0..n-1:
                if (mask & (1 << v)) == 0: # v not visited
                    new_mask = mask | (1 << v)
                    dp[new_mask][v] = min(dp[new_mask][v], dp[mask][u] + dist[u][v])
    # Return min cycle back to 0
    full_mask = (1 << n) - 1
    return min(dp[full_mask][i] + dist[i][0] for i in 1..n-1)`
  },
  pythonCode: {
    title: 'Python Traveling Salesperson Bitmask DP',
    code: `def tsp(dist: list[list[int]]) -> int:
    n = len(dist)
    # dp[mask][u]: min cost visiting cities in mask ending at u
    dp = [[float('inf')] * n for _ in range(1 << n)]
    dp[1][0] = 0 # Start at city 0

    for mask in range(1, 1 << n):
        for u in range(n):
            if dp[mask][u] == float('inf'):
                continue
            for v in range(n):
                if not (mask & (1 << v)): # If v is not yet visited
                    new_mask = mask | (1 << v)
                    cost = dp[mask][u] + dist[u][v]
                    if cost < dp[new_mask][v]:
                        dp[new_mask][v] = cost

    full_mask = (1 << n) - 1
    return min(dp[full_mask][i] + dist[i][0] for i in range(1, n))`,
    explanation: 'Held-Karp algorithm solving TSP in O(2^n * n^2) using bitmask states.'
  },
  runnableCode: {
    code: `dist = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
]
print(tsp(dist))`,
    expectedOutput: `80`
  },
  lineByLineExplanation: [
    { line: 4, code: 'dp = [[float("inf")] * n for _ in range(1 << n)]', explanation: 'Allocates table of size 2^n rows where each row represents a unique subset combination of visited nodes.' },
    { line: 12, code: 'if not (mask & (1 << v)):', explanation: 'Bitwise test: checks if the v-th bit is 0, confirming city v has not been visited yet.' },
    { line: 13, code: 'new_mask = mask | (1 << v)', explanation: 'Bitwise OR: sets the v-th bit to 1, marking city v as visited.' }
  ],
  edgeCases: [
    { case: 'n = 1', handling: 'Single city tour has cost 0.', example: 'n = 1' }
  ],
  commonMistakes: [
    { mistake: 'Applying Bitmask DP when n > 25', solution: '2^30 integers exceed memory limits; Bitmask DP is strictly intended for small n (n <= 20).', codeExample: '# Only use when n <= 20' }
  ],
  applications: [
    { industry: 'Supply Chain Logistics', application: 'Last-mile delivery route optimization (routing delivery vans)', benefit: 'Solves exact optimal route for small daily clusters.' }
  ],
  practiceQuestions: [
    { id: 'pq-bd-1', question: 'How can you count the number of set bits (visited cities) in a bitmask in Python?', hint: 'bin(mask).count("1") or bit_count().', answer: 'Use mask.bit_count() in Python 3.10+, or bin(mask).count("1").' }
  ],
  quiz: [
    { id: 'q-bd-1', question: 'What is the time complexity of the Held-Karp Bitmask DP algorithm for TSP with n cities?', options: ['O(2ⁿ n²)', 'O(n!)', 'O(n³)', 'O(2ⁿ)'], correctIndex: 0, explanation: 'There are 2^n masks, n endpoints per mask, and n transitions to unvisited cities, yielding O(2ⁿ n²).' }
  ],
  codingChallenge: {
    title: 'Smallest Sufficient Team',
    problem: 'In a project with req_skills, find the smallest team of people that possesses all required skills.',
    hints: ['Represent skills as bitmasks; dp[mask] = smallest team list achieving mask.'],
    starterCode: `def smallest_sufficient_team(req_skills: list[str], people: list[list[str]]) -> list[int]:
    # TODO: Find smallest team
    pass`,
    solution: `def smallest_sufficient_team(req_skills: list[str], people: list[list[str]]) -> list[int]:
    skill_map = {s: i for i, s in enumerate(req_skills)}
    n = len(req_skills)
    dp = {0: []}
    for person_idx, p_skills in enumerate(people):
        p_mask = 0
        for s in p_skills:
            if s in skill_map:
                p_mask |= (1 << skill_map[s])
        for mask, team in list(dp.items()):
            new_mask = mask | p_mask
            if new_mask not in dp or len(team) + 1 < len(dp[new_mask]):
                dp[new_mask] = team + [person_idx]
    return dp[(1 << n) - 1]`
  },
  summary: {
    keyTakeaways: ['Bitmask DP encodes subsets as integers, reducing factorial O(n!) to O(2ⁿ n²).', 'Best suited for problems where n <= 20.'],
    nextLessonId: 'dsa-advanced-bit-manipulation',
    nextLessonTitle: 'Bit Manipulation',
    nextLessonModuleId: 'dsa-module-12'
  }
};

const dsa11Part2Path = path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-11.ts');
writeModuleFile(dsa11Part2Path, m11.data, m11Lessons);
console.log('Module 11 complete! Authored: ' + Object.keys(m11Lessons).length);
