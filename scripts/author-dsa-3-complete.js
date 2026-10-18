const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m3 = getExistingDSALessons(3);
const m3Lessons = { ...m3.lessons };

// 4. Hash Maps and Hash Sets
m3Lessons['dsa-strings-hash-maps-sets'] = {
  id: 'dsa-strings-hash-maps-sets',
  moduleId: 'dsa-module-3',
  title: 'Hash Maps and Hash Sets',
  subtitle: 'CPython Compact Dict Architecture, Open Addressing & Practical Patterns',
  order: 4,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'hash-table',
  objectives: [
    'Explain the internals of CPython compact dicts (split indices and entries arrays).',
    'Understand pseudo-random probing perturbation: j = ((5*j) + 1 + perturb) mod size.',
    'Differentiate between set theory operations (union, intersection, difference) and complexities.',
    'Identify requirements for key hashability (__hash__ and __eq__ invariants).'
  ],
  prerequisites: [
    'Hash Tables and Collision Resolution',
    'Frequency Counting Techniques'
  ],
  analogy: {
    title: 'The Compact Coat Check System',
    text: 'A traditional coat check room has 1,000 giant coat racks, leaving 700 empty slots that waste huge floor space. Modern automated venues use a two-tier system: a small dense table of ticket numbers (the indices table) pointing into a tightly packed conveyor belt where jackets sit side-by-side without any empty gaps (the entries table). Python 3.6 adopted this compact dictionary layout, slashing memory usage by 25% while preserving insertion order.',
    metaphor: 'Modern hash maps split sparse hash buckets from dense insertion-ordered data arrays.'
  },
  problemSolved: {
    title: 'High-Performance Key-Value Associative Storage',
    description: 'Without hash maps, associating metadata with dynamic keys requires searching associative lists in O(n) time. Python dicts and sets provide average O(1) insertion, deletion, and lookup with minimal memory overhead.',
    keyPoints: [
      'Preserves insertion order natively in Python 3.7+',
      'Maintains load factor threshold (< 2/3) to prevent collision clustering',
      'Requires immutable keys implementing __hash__() and __eq__()'
    ]
  },
  intuition: {
    overview: 'A hash map hashes the key to produce a 64-bit integer, maps it to an index table via modulo masking, and probes entries using open addressing.',
    steps: [
      { step: 1, title: 'Hash Computation', description: 'h = hash(key).' },
      { step: 2, title: 'Masking', description: 'index = h & (table_size - 1).' },
      { step: 3, title: 'Probing on Collision', description: 'Perturb sequence checks alternate slots until an empty or matching slot is found.' }
    ]
  },
  formalDefinition: {
    text: 'A hash table maps universe U to slots [0..m-1] via hash function h: U -> [0..m-1]. CPython uses open addressing with perturbation recurrence: j_{i+1} = (5 j_i + 1 + perturb) mod 2^k, with perturb >>= 5 at each step.',
    latex: 'j_{i+1} = \\left(5 j_i + 1 + \\lfloor \\text{perturb} / 32 \\rfloor\\right) \\bmod m'
  },
  complexity: {
    overview: 'Lookup/Insert/Delete: O(1) average, O(n) worst-case under malicious hash collision attack.',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Zero collision direct bucket hit.' },
      { case: 'Average', time: 'O(1)', space: 'O(n)', explanation: 'Load factor kept under 0.66 ensures <= 2 probes on average.' },
      { case: 'Worst', time: 'O(n)', space: 'O(n)', explanation: 'All keys hash to identical bucket under adversarial input.' }
    ],
    spaceNote: 'Compact dicts store entries as [hash, key, value] tuples, saving memory compared to traditional pointer buckets.'
  },
  workedExample: {
    title: 'Inserting ("apple", 5) into Compact Dict',
    input: 'Key: "apple", Value: 5',
    steps: [
      { step: 1, action: 'Compute Hash', state: 'hash("apple") = 0x2A3F981', explanation: 'Calls string hash function.' },
      { step: 2, action: 'Index Masking', state: '0x2A3F981 & 7 = slot 1 in indices array', explanation: 'Maps to 8-slot indices table.' },
      { step: 3, action: 'Store in Entries', state: 'entries[0] = (hash, "apple", 5)', explanation: 'Appends data to next available entry slot.' },
      { step: 4, action: 'Link Index', state: 'indices[1] = 0', explanation: 'indices[1] points to entries[0].' }
    ],
    finalOutput: 'Key inserted in O(1) time while preserving insertion order.'
  },
  visualExplanation: {
    title: 'CPython Compact Dict Architecture',
    description: 'Indices array: [-1, 0, -1, 1, -1, 2, -1, -1]. Entries array: [[h1, k1, v1], [h2, k2, v2], [h3, k3, v3]]. Splitting sparse hash buckets from dense contiguous entries eliminates memory fragmentation.',
    features: ['Sparse byte-sized indices array', 'Dense contiguous entries array', 'Insertion order preservation']
  },
  pseudocode: {
    title: 'Hash Map Lookup Logic',
    code: `def get(key):
    h = hash(key)
    slot = h & mask
    while table[slot] is not EMPTY:
        if table[slot].hash == h and table[slot].key == key:
            return table[slot].value
        slot = probe_next(slot)
    return KeyError`
  },
  pythonCode: {
    title: 'Custom Hashable Class Implementation in Python',
    code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return isinstance(other, Point) and self.x == other.x and self.y == other.y

    def __hash__(self):
        # Must hash same attributes evaluated in __eq__
        return hash((self.x, self.y))

p1 = Point(10, 20)
p2 = Point(10, 20)

point_map = {p1: "Origin"}
print("Lookup with identical p2:", point_map.get(p2)) # Expected: "Origin"
print("Set length with p1 and p2:", len({p1, p2}))      # Expected: 1`,
    explanation: 'Demonstrates the contract between __eq__ and __hash__ necessary for custom objects to work in dicts and sets.'
  },
  runnableCode: {
    code: `set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# O(min(len(a), len(b))) intersection
print("Intersection (a & b):", set_a & set_b)
# O(len(a) + len(b)) union
print("Union (a | b):", set_a | set_b)
# O(len(a)) difference
print("Difference (a - b):", set_a - set_b)`,
    expectedOutput: 'Intersection (a & b): {4, 5}\nUnion (a | b): {1, 2, 3, 4, 5, 6, 7, 8}\nDifference (a - b): {1, 2, 3}'
  },
  lineByLineExplanation: [
    { lines: '4', codeSnippet: 'print("Intersection (a & b):", set_a & set_b)', explanation: 'Finds common elements by checking smaller set against larger in O(min(|a|, |b|)).' },
    { lines: '6', codeSnippet: 'print("Union (a | b):", set_a | set_b)', explanation: 'Merges both sets without duplicates in linear O(|a| + |b|) time.' }
  ],
  edgeCases: [
    { case: 'Mutable Key (e.g. list as key)', handling: 'Python raises TypeError: unhashable type: "list".', example: 'd[[1, 2]] = "error"' },
    { case: 'Hash collision clustering', handling: 'CPython perturbs probe sequence with upper bits to break primary clusters.', example: 'Keys with same lower bits' }
  ],
  commonMistakes: [
    { mistake: 'Modifying an object after inserting it as a key in a set/dict.', solution: 'Mutating attributes that change __hash__ makes the object permanently unfindable in the map.' },
    { mistake: 'Implementing __eq__ without implementing __hash__.', solution: 'Python sets __hash__ = None if __eq__ is overridden without __hash__.' }
  ],
  applications: [
    { industry: 'Web Frameworks', application: 'URL Routing Tables', benefit: 'Resolves API endpoints (e.g., "/api/v1/users") to handler functions in O(1) time.' },
    { industry: 'Distributed Caching', application: 'Memcached / Redis In-Memory KV', benefit: 'Handles millions of key lookups per second with predictable sub-millisecond latencies.' }
  ],
  practiceQuestions: [
    { id: 'dsa-3-4-q1', question: 'Why does Python forbid using lists as dictionary keys?', hint: 'Are lists mutable?', answer: 'Lists are mutable. If a list could be used as a key and modified after insertion, its hash value would change, placing it in the wrong bucket and making retrieval impossible.' },
    { id: 'dsa-3-4-q2', question: 'What is the load factor threshold at which CPython resizes a dictionary?', hint: 'Is it 50%, 66%, or 90%?', answer: 'Approximately 2/3 (66.7%). When 2/3 of the table slots are filled, CPython doubles or quadruples the table capacity to maintain O(1) probe efficiency.' },
    { id: 'dsa-3-4-q3', question: 'Why are Python 3.7+ dictionaries guaranteed to maintain insertion order?', hint: 'Think about the compact dict entries array.', answer: 'Entries are appended sequentially into a dense array in the exact order they are inserted. The sparse indices table maps hashes to indices in this ordered array.' }
  ],
  quiz: [
    {
      id: 'dsa-3-4-quiz-1',
      question: 'What runtime error occurs if you try to use a Python list as a dictionary key?',
      options: ['TypeError: unhashable type: "list"', 'KeyError', 'IndexError', 'ValueError'],
      correctIndex: 0,
      explanation: 'Mutable objects like lists and sets do not implement __hash__ and raise TypeError when used as keys.'
    },
    {
      id: 'dsa-3-4-quiz-2',
      question: 'What is the average-case time complexity of set intersection (set_a & set_b)?',
      options: ['O(min(len(a), len(b)))', 'O(len(a) * len(b))', 'O(1)', 'O(log(len(a)))'],
      correctIndex: 0,
      explanation: 'Python iterates through the smaller set and performs O(1) membership lookups in the larger set, taking O(min(|a|, |b|)) time.'
    },
    {
      id: 'dsa-3-4-quiz-3',
      question: 'If two objects are considered equal according to __eq__, what MUST be true about their __hash__ values?',
      options: [
        'Their hash values must be strictly equal',
        'Their hash values must be different',
        'Their hash values must sum to zero',
        'No restriction exists'
      ],
      correctIndex: 0,
      explanation: 'The fundamental hash contract demands: if a == b is True, then hash(a) == hash(b) must be True.'
    }
  ],
  codingChallenge: {
    title: 'Group Anagrams',
    problem: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order. Solve in O(N * K) time where N is the number of strings and K is the maximum string length.',
    starterCode: `def group_anagrams(strs):
    from collections import defaultdict
    groups = defaultdict(list)
    for s in strs:
        # Create a tuple of 26 character counts as the hashable key
        count = [0] * 26
        for ch in s:
            count[ord(ch) - ord('a')] += 1
        groups[tuple(count)].append(s)
    return list(groups.values())

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))`,
    solution: `def group_anagrams(strs):
    from collections import defaultdict
    groups = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for ch in s:
            count[ord(ch) - ord('a')] += 1
        groups[tuple(count)].append(s)
    return list(groups.values())

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))`,
    hints: [
      'Two strings are anagrams if and only if their character count tuples are identical.',
      'A list cannot be a dict key, but an immutable tuple of 26 integers can.',
      'Grouping by tuple(count) takes O(K) per string, resulting in O(N * K) overall time.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Hash maps deliver average O(1) lookups via hash-directed indexing.',
      'CPython compact dicts split sparse hash indices from dense ordered entries.',
      'Keys must be immutable and maintain the __eq__ / __hash__ consistency contract.',
      'Grouping with tuple frequency keys avoids the O(K log K) string sorting bottleneck.'
    ],
    nextLessonId: 'dsa-strings-anagram-palindrome',
    nextLessonTitle: 'Anagram and Palindrome Algorithms',
    nextLessonModuleId: 'dsa-module-3'
  }
};

// 5. Anagram and Palindrome Algorithms
m3Lessons['dsa-strings-anagram-palindrome'] = {
  id: 'dsa-strings-anagram-palindrome',
  moduleId: 'dsa-module-3',
  title: 'Anagram and Palindrome Algorithms',
  subtitle: 'Symmetry Detection, Expanding Around Centers & Manacher Algorithm Intuition',
  order: 5,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Master two-pointer inward and outward palindrome validation.',
    'Implement Longest Palindromic Substring via Expand Around Center in O(n^2) time and O(1) space.',
    'Handle both odd-length (single center) and even-length (double center) palindromes.',
    'Understand Manacher’s linear O(n) algorithm intuition using symmetry reuse.'
  ],
  prerequisites: [
    'Two Pointer Technique',
    'Frequency Counting Techniques'
  ],
  analogy: {
    title: 'The Butterfly Wing Reflection',
    text: 'A butterfly’s wings exhibit bilateral symmetry across a central spinal axis. If you place a mirror at the center, the left wing matches the right wing vein for vein. To test if a wing pattern is symmetric, you don’t compare distant random points; you anchor your probe at the center spine and expand outward pixel by pixel in both directions simultaneously. If both sides match at every outward radius, you have confirmed a perfect mirror reflection.',
    metaphor: 'Expand Around Center tests palindrome symmetry by radiating outward from 2n - 1 potential axes.'
  },
  problemSolved: {
    title: 'Finding Symmetries without Checking All O(n^3) Substrings',
    description: 'Finding the longest palindromic substring by generating all n(n-1)/2 substrings and testing each in O(n) takes O(n^3) time. Expanding outward from each of the 2n - 1 center axes eliminates redundant checks and runs in O(n^2) time and O(1) auxiliary space.',
    keyPoints: [
      'Identifies 2n - 1 centers (n odd-length centers and n - 1 even-length centers)',
      'Terminates early on first mismatch during outward expansion',
      'Requires zero extra memory: O(1) auxiliary space'
    ]
  },
  intuition: {
    overview: 'Every palindrome has a center. For odd lengths ("aba"), the center is the character "b". For even lengths ("abba"), the center is the space between "b" and "b". Radiate outward from all 2n - 1 centers.',
    steps: [
      { step: 1, title: 'Loop Centers', description: 'Iterate i from 0 to n-1.' },
      { step: 2, title: 'Expand Odd', description: 'Expand around (i, i) for odd-length palindromes.' },
      { step: 3, title: 'Expand Even', description: 'Expand around (i, i+1) for even-length palindromes.' },
      { step: 4, title: 'Update Best', description: 'Track maximum radius found across all expansions.' }
    ]
  },
  formalDefinition: {
    text: 'A string S is a palindrome if S[i] = S[n - 1 - i] for all 0 <= i < n/2. The longest palindromic substring is argmax_{0 <= i <= j < n, S[i..j] is palindrome} (j - i + 1).',
    latex: 'S[i \\dots j] \\text{ is Palindrome} \\iff S[i] = S[j] \\land S[i+1 \\dots j-1] \\text{ is Palindrome}'
  },
  complexity: {
    overview: 'Expand Around Center: O(n^2) time, O(1) space. Manacher algorithm: O(n) time, O(n) space.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(1)', explanation: 'No palindrome matches: each center fails on first outward step.' },
      { case: 'Average', time: 'O(n^2)', space: 'O(1)', explanation: 'Occasional short palindromes expanded.' },
      { case: 'Worst', time: 'O(n^2)', space: 'O(1)', explanation: 'All characters identical (e.g. "aaaaa"), fully expanding every center.' }
    ],
    spaceNote: 'Expand around center uses O(1) auxiliary space because it only tracks boundary indices.'
  },
  workedExample: {
    title: 'Expanding Around Center on "babad"',
    input: 's = "babad"',
    steps: [
      { step: 1, action: 'Center i = 0 ("b")', state: 'len = 1 ("b")', explanation: 'Left out of bounds.' },
      { step: 2, action: 'Center i = 1 ("a")', state: 'Expand (0, 2): s[0]="b", s[2]="b" -> Match! "bab"', explanation: 'Further expansion out of bounds. Max len = 3 ("bab").' },
      { step: 3, action: 'Center i = 2 ("b")', state: 'Expand (1, 3): s[1]="a", s[3]="a" -> Match! "aba"', explanation: 'Max len = 3 ("aba").' },
      { step: 4, action: 'Even Centers', state: 'No adjacent duplicate characters found', explanation: 'All even-length expansions terminate with length 0.' }
    ],
    finalOutput: 'Longest palindromic substring is "bab" (or "aba") of length 3.'
  },
  visualExplanation: {
    title: 'Outward Radius Radiation',
    description: 'From central axis i, left pointer steps -1 while right pointer steps +1. While characters match, radius grows. As soon as a mismatch occurs, the maximal palindrome for that center is established.',
    features: ['Odd center (single letter anchor)', 'Even center (inter-character gap anchor)', 'Maximal expansion boundary']
  },
  pseudocode: {
    title: 'Longest Palindrome Substring (Expand Around Center)',
    code: `def longest_palindrome(s):
    start = 0, max_len = 0
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return l + 1, r - 1

    for i in range(len(s)):
        l1, r1 = expand(i, i)       # Odd length
        l2, r2 = expand(i, i + 1)   # Even length
        # Update longest`
  },
  pythonCode: {
    title: 'Longest Palindromic Substring in Python',
    code: `def longest_palindrome(s):
    if not s:
        return ""
    start = end = 0

    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return l + 1, r - 1

    for i in range(len(s)):
        l1, r1 = expand(i, i)
        l2, r2 = expand(i, i + 1)
        if r1 - l1 > end - start:
            start, end = l1, r1
        if r2 - l2 > end - start:
            start, end = l2, r2

    return s[start:end + 1]

print("babad:", longest_palindrome("babad")) # Expected: "bab" or "aba"
print("cbbd:", longest_palindrome("cbbd"))   # Expected: "bb"`,
    explanation: 'Finds the longest palindromic substring in O(n^2) time and O(1) extra space.'
  },
  runnableCode: {
    code: `def valid_palindrome_after_one_deletion(s):
    # Can we make it a palindrome by deleting at most 1 character?
    def check_sub(l, r):
        while l < r:
            if s[l] != s[r]: return False
            l += 1
            r -= 1
        return True

    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]:
            # Try skipping left OR skipping right
            return check_sub(l + 1, r) or check_sub(l, r - 1)
        l += 1
        r -= 1
    return True

print("abca (delete 'c'):", valid_palindrome_after_one_deletion("abca"))
print("abc:", valid_palindrome_after_one_deletion("abc"))`,
    expectedOutput: "abca (delete 'c'): True\nabc: False"
  },
  lineByLineExplanation: [
    { lines: '9-10', codeSnippet: 'l, r = 0, len(s) - 1\nwhile l < r:', explanation: 'Standard inward two-pointer traversal.' },
    { lines: '11-13', codeSnippet: 'if s[l] != s[r]:\n    return check_sub(l + 1, r) or check_sub(l, r - 1)', explanation: 'On first mismatch, tests both single-character deletion branches in linear time.' }
  ],
  edgeCases: [
    { case: 'Single character string', handling: 'Always a valid palindrome of length 1.', example: '"a"' },
    { case: 'All identical characters', handling: 'Entire string is returned in O(n^2).', example: '"aaaa"' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting to check even-length centers (i, i + 1).', solution: 'Palindromes like "abba" have no central character; they center between indices 1 and 2.' },
    { mistake: 'Reversing the whole string and finding Longest Common Substring.', solution: 'This fails on inputs with reversed non-palindrome substrings like "aacdefcaa" (returns "aac" and "caa").' }
  ],
  applications: [
    { industry: 'Bioinformatics', application: 'Restriction Enzyme Recognition Sites', benefit: 'Detects DNA palindromic sequences (e.g. GAATTC) where restriction enzymes bind and cleave double helices.' },
    { industry: 'Data Compression', application: 'Burrows-Wheeler Transform (BWT)', benefit: 'Permutes strings to cluster recurring patterns for bzip2 compression.' }
  ],
  practiceQuestions: [
    { id: 'dsa-3-5-q1', question: 'How many total centers must be tested when expanding around center in a string of length n?', hint: 'Count single character centers and gaps between characters.', answer: 'Exactly 2n - 1 centers: n centers at individual characters, and n - 1 centers between adjacent character pairs.' },
    { id: 'dsa-3-5-q2', question: 'Why is Manacher algorithm able to find the longest palindromic substring in O(n) linear time?', hint: 'How does it reuse previously computed radii?', answer: 'Manacher algorithm maintains the rightmost boundary of previously expanded palindromes. Symmetries inside that boundary mirror known palindrome radii, avoiding re-scanning characters.' },
    { id: 'dsa-3-5-q3', question: 'What is the time complexity of testing if a string can be partitioned into palindromic substrings using dynamic programming?', hint: 'Is it O(n^2)?', answer: 'Precomputing all palindrome subsegments takes O(n^2). Minimum cut partitioning via DP then takes O(n^2) time and O(n) space.' }
  ],
  quiz: [
    {
      id: 'dsa-3-5-quiz-1',
      question: 'How many potential centers exist in a string of length n for the Expand Around Center algorithm?',
      options: ['2n - 1', 'n', 'n^2', 'n / 2'],
      correctIndex: 0,
      explanation: 'There are n odd-length centers (each character) and n - 1 even-length centers (between characters), giving 2n - 1 total centers.'
    },
    {
      id: 'dsa-3-5-quiz-2',
      question: 'What is the auxiliary space complexity of finding the longest palindromic substring via Expand Around Center?',
      options: ['O(1)', 'O(n)', 'O(n^2)', 'O(log n)'],
      correctIndex: 0,
      explanation: 'Expand Around Center only tracks boundary pointer indices (start, end), using strictly O(1) extra heap memory.'
    },
    {
      id: 'dsa-3-5-quiz-3',
      question: 'What algorithm finds the longest palindromic substring in strictly linear O(n) time?',
      options: ["Manacher's Algorithm", "Kadane's Algorithm", "Dijkstra's Algorithm", "KMP Algorithm"],
      correctIndex: 0,
      explanation: "Manacher's algorithm solves Longest Palindromic Substring in O(n) time by exploiting mirror symmetry inside palindromic boundaries."
    }
  ],
  codingChallenge: {
    title: 'Palindromic Substrings Count',
    problem: 'Given a string s, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within the string.',
    starterCode: `def count_substrings(s):
    count = 0
    def expand(l, r):
        c = 0
        while l >= 0 and r < len(s) and s[l] == s[r]:
            c += 1
            l -= 1
            r += 1
        return c

    for i in range(len(s)):
        count += expand(i, i)       # Odd length
        count += expand(i, i + 1)   # Even length
    return count

print(count_substrings("abc")) # Expected: 3 ("a", "b", "c")
print(count_substrings("aaa")) # Expected: 6 ("a", "a", "a", "aa", "aa", "aaa")`,
    solution: `def count_substrings(s):
    count = 0
    def expand(l, r):
        c = 0
        while l >= 0 and r < len(s) and s[l] == s[r]:
            c += 1
            l -= 1
            r += 1
        return c

    for i in range(len(s)):
        count += expand(i, i)
        count += expand(i, i + 1)
    return count

print(count_substrings("aaa"))`,
    hints: [
      'Every time an outward expansion successfully matches characters, exactly one new palindromic substring is formed.',
      'Sum counts from all 2n - 1 centers.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Expand Around Center checks 2n - 1 centers in O(n^2) time and O(1) space.',
      'Always expand both odd centers (i, i) and even centers (i, i + 1).',
      "Manacher's algorithm achieves linear O(n) time via symmetry caching.",
      'Inward two-pointer checks whether an entire string is a palindrome in O(n) time.'
    ],
    nextLessonId: 'dsa-strings-matching',
    nextLessonTitle: 'String Matching — Naive and Boyer-Moore',
    nextLessonModuleId: 'dsa-module-3'
  }
};

// 6. String Matching — Naive and Boyer-Moore
m3Lessons['dsa-strings-matching'] = {
  id: 'dsa-strings-matching',
  moduleId: 'dsa-module-3',
  title: 'String Matching — Naive and Boyer-Moore',
  subtitle: 'Pattern Search Heuristics, Bad Character Rule & Sub-linear Practical Performance',
  order: 6,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Analyze the O(N * M) worst-case vulnerability of naive string pattern matching.',
    'Understand why comparing pattern characters right-to-left enables massive search jumps.',
    'Implement the Boyer-Moore Bad Character Heuristic.',
    'Explain the Good Suffix Heuristic and when Boyer-Moore achieves sub-linear O(N / M) best-case time.'
  ],
  prerequisites: [
    'String Representation and Operations',
    'Frequency Counting Techniques'
  ],
  analogy: {
    title: 'The Blueprint Overlay Slide',
    text: 'You have a 1,000-page book and want to find where the 5-letter word "ZEBRA" appears. A naive reader places "ZEBRA" over words and checks letter 1: "Z"? No. Shifts by 1 letter. Checks letter 1: "Z"? No. A Boyer-Moore reader checks the LAST letter of the word first. If the 5th letter in the book is "X", knowing that "X" doesn’t appear anywhere in "ZEBRA", they don’t shift by 1 letter—they jump the entire stencil forward by a full 5 letters! In one step, they skip 4 pages of reading.',
    metaphor: 'Checking right-to-left allows mismatched characters to shift the pattern past the entire mismatch window.'
  },
  problemSolved: {
    title: 'Eliminating Redundant Character Comparisons in Text Search',
    description: 'When searching a pattern of length M in text of length N, naive search takes O(N * M) when prefixes frequently match and fail late (e.g. searching "AAAB" in "AAAAAAAAAAAAAAAA"). Boyer-Moore shifts the pattern by up to M positions on a mismatch, achieving sub-linear O(N / M) best-case execution.',
    keyPoints: [
      'Right-to-left pattern comparison allows intelligent skipping',
      'Bad Character Rule: aligns pattern with last occurrence of mismatch in pattern',
      'Good Suffix Rule: aligns matched suffix with previous identical substring'
    ]
  },
  intuition: {
    overview: 'Align pattern with text. Compare characters backwards from pattern end (index M-1 down to 0). On mismatch at character c, shift pattern right so that the last occurrence of c in the pattern aligns with text[c]. If c is not in pattern, shift pattern past c entirely.',
    steps: [
      { step: 1, title: 'Precompute Bad Character Table', description: 'Store the last occurrence index of each alphabet character in pattern.' },
      { step: 2, title: 'Backward Scan', description: 'Compare pattern[j] with text[shift + j] for j = M-1 down to 0.' },
      { step: 3, title: 'Shift Jump', description: 'On mismatch, shift = max(1, j - bad_char_table[text[shift + j]]).' }
    ]
  },
  formalDefinition: {
    text: 'The Boyer-Moore algorithm searches for pattern P[0..M-1] in text T[0..N-1]. The Bad Character shift rule states: if T[k] mismatches P[j], the pattern shifts by \\max(1, j - \\text{last}(T[k])), where \\text{last}(c) = \\max(\\{ i \\mid P[i] = c \\} \\cup \\{-1\\}).',
    latex: '\\Delta_{\\text{bad}} = \\max\\big(1, \\, j - \\text{last}(T[s + j])\\big)'
  },
  complexity: {
    overview: 'Best Case: O(N / M) sub-linear skips. Average: O(N). Worst Case: O(N * M) without Good Suffix rule.',
    cases: [
      { case: 'Best', time: 'O(N / M)', space: 'O(|Σ|)', explanation: 'Mismatch on every rightmost character skips M positions each step.' },
      { case: 'Average', time: 'O(N)', space: 'O(|Σ|)', explanation: 'Typical English text search skips 3-5 characters per step.' },
      { case: 'Worst', time: 'O(N * M)', space: 'O(|Σ|)', explanation: 'Pathological repeating characters with bad character rule alone.' }
    ],
    spaceNote: 'Bad character table requires O(|Σ|) space where |Σ| is alphabet size (e.g. 256 for ASCII).'
  },
  workedExample: {
    title: 'Searching Pattern "NEEDLE" in Text "...A_BIG_NEEDLE..."',
    input: 'Text: "FIND_A_NEEDLE", Pattern: "NEEDLE" (M = 6)',
    steps: [
      { step: 1, action: 'Initial Alignment', state: 'Compare text[5] with pattern[5] ("E")', explanation: 'Text[5] is "_". "_" does not appear in "NEEDLE"!' },
      { step: 2, action: 'Full Jump', state: 'Shift = 5 - (-1) = 6 positions forward', explanation: 'Instantly skips 6 characters without reading letters 0 through 4.' },
      { step: 3, action: 'Next Alignment', state: 'Compare text[11] ("E") with pattern[5] ("E")', explanation: 'Match! Scan backwards: L, D, E, E, N all match.' }
    ],
    finalOutput: 'Pattern found at index 7 after only 7 total character inspections.'
  },
  visualExplanation: {
    title: 'Right-to-Left Scanning and Big Leaps',
    description: 'Looking backwards from the end of the template: when an alien character is spotted in the text window, the entire template leapfrogs across the alien character in one clean hop.',
    features: ['Backward character cursor (M-1 down to 0)', 'Bad character alignment jump', 'Leapfrog acceleration']
  },
  pseudocode: {
    title: 'Boyer-Moore (Bad Character Rule)',
    code: `def boyer_moore(text, pattern):
    M = len(pattern), N = len(text)
    bad_char = {ch: i for i, ch in enumerate(pattern)}
    shift = 0

    while shift <= N - M:
        j = M - 1
        while j >= 0 and pattern[j] == text[shift + j]:
            j -= 1
        if j < 0:
            return shift # Match found!
        else:
            c = text[shift + j]
            shift += max(1, j - bad_char.get(c, -1))
    return -1`
  },
  pythonCode: {
    title: 'Boyer-Moore Bad Character Search in Python',
    code: `def boyer_moore_search(text, pattern):
    n, m = len(text), len(pattern)
    if m == 0: return 0
    if m > n: return -1

    # Precompute last occurrence table
    bad_char = {ch: idx for idx, ch in enumerate(pattern)}
    shift = 0

    while shift <= n - m:
        j = m - 1
        # Compare from right to left
        while j >= 0 and pattern[j] == text[shift + j]:
            j -= 1
        if j < 0:
            return shift # Match at index shift
        else:
            mismatched_char = text[shift + j]
            # Shift by bad character rule
            shift += max(1, j - bad_char.get(mismatched_char, -1))

    return -1

text = "HERE IS A SIMPLE EXAMPLE"
pattern = "EXAMPLE"
idx = boyer_moore_search(text, pattern)
print(f"Pattern '{pattern}' found at index: {idx}")`,
    explanation: 'Implements Boyer-Moore with Bad Character heuristic, demonstrating right-to-left comparisons and jumping.'
  },
  runnableCode: {
    code: `def naive_vs_bm(text, pat):
    # Naive search comparisons
    naive_comps = 0
    for i in range(len(text) - len(pat) + 1):
        for j in range(len(pat)):
            naive_comps += 1
            if text[i + j] != pat[j]: break

    print(f"Text length: {len(text)}, Pattern length: {len(pat)}")
    print(f"Naive total comparisons: {naive_comps}")

naive_vs_bm("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", "QUIET")`,
    expectedOutput: 'Text length: 43, Pattern length: 5\nNaive total comparisons: 43'
  },
  lineByLineExplanation: [
    { lines: '7', codeSnippet: 'bad_char = {ch: idx for idx, ch in enumerate(pattern)}', explanation: 'Precomputes last index of each character in pattern.' },
    { lines: '12-14', codeSnippet: 'while j >= 0 and pattern[j] == text[shift + j]: j -= 1', explanation: 'Scans characters backwards from pattern end.' },
    { lines: '18-19', codeSnippet: 'shift += max(1, j - bad_char.get(mismatched_char, -1))', explanation: 'Calculates maximum safe leap based on mismatch character position.' }
  ],
  edgeCases: [
    { case: 'Pattern longer than text', handling: 'Return -1 immediately.', example: 'len(pattern) > len(text)' },
    { case: 'Pattern is empty string', handling: 'Return index 0.', example: 'pattern = ""' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting `max(1, ...)` in bad character shift.', solution: 'If the mismatched character appears to the right of j in the pattern, j - last(c) is negative. Must take max with 1 to avoid shifting backwards.' },
    { mistake: 'Scanning left-to-right.', solution: 'Boyer-Moore requires right-to-left scanning inside the window to enable forward shifts.' }
  ],
  applications: [
    { industry: 'Operating Systems & CLI', application: 'GNU grep Utility', benefit: 'GNU grep uses Boyer-Moore to search gigabytes of text files per second by skipping bytes.' },
    { industry: 'Text Editors', application: 'Ctrl+F Search Engines', benefit: 'Instantly highlights query occurrences in large documents without lag.' }
  ],
  practiceQuestions: [
    { id: 'dsa-3-6-q1', question: 'Why does Boyer-Moore scan pattern characters from right to left instead of left to right?', hint: 'What information does the rightmost character give about the entire window?', answer: 'If the character in the text aligned with the end of the pattern does not exist in the pattern, the entire pattern can leap past that character in a single step of size M.' },
    { id: 'dsa-3-6-q2', question: 'Under what conditions does Boyer-Moore achieve its best-case O(N / M) time complexity?', hint: 'What happens if none of the text characters appear in the pattern?', answer: 'When none of the characters in the text appear anywhere in the pattern. Every check at the right edge fails instantly and shifts the pattern by M positions, requiring only N / M inspections.' },
    { id: 'dsa-3-6-q3', question: 'What is the Good Suffix heuristic in Boyer-Moore?', hint: 'When part of the suffix matched before failing.', answer: 'If a suffix of the pattern matched before a mismatch occurred, the Good Suffix rule shifts the pattern to align with the next occurrence of that matched suffix inside the pattern.' }
  ],
  quiz: [
    {
      id: 'dsa-3-6-quiz-1',
      question: 'In what direction does Boyer-Moore compare characters within a window?',
      options: [
        'Right to left (from pattern end to pattern start)',
        'Left to right (from pattern start to pattern end)',
        'Outward from the center',
        'Randomly'
      ],
      correctIndex: 0,
      explanation: 'Boyer-Moore compares characters from right to left (M-1 down to 0) to maximize the forward jump distance when a mismatch occurs.'
    },
    {
      id: 'dsa-3-6-quiz-2',
      question: 'What is the best-case time complexity of the Boyer-Moore string matching algorithm on text of length N and pattern of length M?',
      options: ['O(N / M)', 'O(N * M)', 'O(N)', 'O(log N)'],
      correctIndex: 0,
      explanation: 'When rightmost character mismatches allow shifting by the full pattern length M each step, total comparisons are bounded by N / M.'
    },
    {
      id: 'dsa-3-6-quiz-3',
      question: 'Why is `max(1, j - bad_char.get(c, -1))` used instead of simply `j - bad_char.get(c, -1)`?',
      options: [
        'To prevent shifting backwards if the last occurrence of c in pattern is to the right of j',
        'To guarantee integer division',
        'To handle negative text indices',
        'To support unicode'
      ],
      correctIndex: 0,
      explanation: 'If the character c appears in the pattern at an index greater than the current mismatch index j, the formula yields a negative number; max(1, ...) forces a forward step of at least 1.'
    }
  ],
  codingChallenge: {
    title: 'Implement strStr()',
    problem: 'Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack. If needle is empty, return 0.',
    starterCode: `def str_str(haystack, needle):
    if not needle: return 0
    n, m = len(haystack), len(needle)
    if m > n: return -1

    # Boyer-Moore Bad Character Search
    bad_char = {ch: idx for idx, ch in enumerate(needle)}
    shift = 0
    while shift <= n - m:
        j = m - 1
        while j >= 0 and needle[j] == haystack[shift + j]:
            j -= 1
        if j < 0:
            return shift
        shift += max(1, j - bad_char.get(haystack[shift + j], -1))
    return -1

print(str_str("hello", "ll"))  # Expected: 2
print(str_str("aaaaa", "bba")) # Expected: -1`,
    solution: `def str_str(haystack, needle):
    if not needle: return 0
    n, m = len(haystack), len(needle)
    if m > n: return -1

    bad_char = {ch: idx for idx, ch in enumerate(needle)}
    shift = 0
    while shift <= n - m:
        j = m - 1
        while j >= 0 and needle[j] == haystack[shift + j]:
            j -= 1
        if j < 0:
            return shift
        shift += max(1, j - bad_char.get(haystack[shift + j], -1))
    return -1

print(str_str("hello", "ll"))`,
    hints: [
      'Precompute bad character dictionary with character positions in needle.',
      'Check characters backwards starting from needle length - 1.',
      'Advance shift by max(1, j - bad_char.get(mismatch, -1)).'
    ]
  },
  summary: {
    keyTakeaways: [
      'Boyer-Moore compares characters right-to-left within each text window.',
      'Bad Character rule aligns pattern with previous character occurrence or jumps past it.',
      'Best-case runtime is sub-linear O(N / M) on large alphabets.',
      'Underpins production command-line search tools like GNU grep.'
    ],
    nextLessonId: 'dsa-strings-kmp',
    nextLessonTitle: 'KMP and Rabin-Karp Algorithms',
    nextLessonModuleId: 'dsa-module-3'
  }
};

// 7. KMP and Rabin-Karp Algorithms
m3Lessons['dsa-strings-kmp'] = {
  id: 'dsa-strings-kmp',
  moduleId: 'dsa-module-3',
  title: 'KMP and Rabin-Karp Algorithms',
  subtitle: 'LPS Failure Tables, Polynomial Rolling Hash & Linear Worst-Case Guarantees',
  order: 7,
  readTimeMinutes: 32,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Construct the Longest Prefix Suffix (LPS) π table for Knuth-Morris-Pratt (KMP).',
    'Prove that KMP achieves strictly O(N + M) worst-case time without text backtracking.',
    'Implement the Rabin-Karp polynomial rolling hash using Horner’s method and modulo arithmetic.',
    'Handle hash collisions and spurious hits in Rabin-Karp.'
  ],
  prerequisites: [
    'String Matching — Naive and Boyer-Moore',
    'Prefix Sums and Modular Arithmetic'
  ],
  analogy: {
    title: 'The Mechanical Loom Resumption',
    text: 'A mechanical weaving loom is executing a complex 10-stitch pattern: [Red, Blue, Green, Red, Blue, Yellow...]. If the needle jams at stitch 6 (Yellow), a novice unweaves all 6 stitches and restarts from stitch 1. A master weaver notices that stitches 4 and 5 ([Red, Blue]) are an identical prefix of the pattern. Instead of restarting, they keep stitches 4 and 5 in place and resume weaving directly from stitch 3. Zero fabric is wasted, and the loom never backtracks.',
    metaphor: 'KMP never moves the text pointer backwards; it uses the LPS table to resume pattern matching at the longest valid prefix.'
  },
  problemSolved: {
    title: 'Guaranteed O(N) Worst-Case Matching and Streaming Text Search',
    description: 'Boyer-Moore can degrade to O(N * M) on repetitive inputs without complex heuristics, and naive search backtracks the text pointer. KMP guarantees strict O(N + M) worst-case time and processes text as an un-buffered forward-only stream.',
    keyPoints: [
      'Never backtracks the text pointer (essential for network sockets and streaming streams)',
      'LPS table precomputes self-similarity of the pattern in O(M) time',
      'Rabin-Karp enables multi-pattern search and plagiarism detection via rolling hash'
    ]
  },
  intuition: {
    overview: 'LPS[i] stores the length of the longest proper prefix of pattern[0..i] that is also a suffix of pattern[0..i]. When mismatch occurs at pattern[j], set j = LPS[j - 1] without changing text index i.',
    steps: [
      { step: 1, title: 'Build LPS Table', description: 'Compute longest prefix suffix for each prefix of the pattern in O(M).' },
      { step: 2, title: 'Stream Text', description: 'Advance text pointer i from 0 to N-1.' },
      { step: 3, title: 'Fallback on Mismatch', description: 'If mismatch at j, fallback j = LPS[j - 1] until characters match or j == 0.' },
      { step: 4, title: 'Match Found', description: 'When j == M, record match at i - M and set j = LPS[j - 1].' }
    ]
  },
  formalDefinition: {
    text: 'Let \\pi[i] = \\max \\{ k < i+1 \\mid P[0..k-1] = P[i-k+1..i] \\}. KMP maintains text index i and pattern index j. In each step, either i advances by 1, or j decreases via \\pi[j-1]. The amortized number of j fallbacks is bounded by N, yielding O(N + M) time.',
    latex: '\\pi[i] = \\max\\{ k < i+1 \\mid P[0\\dots k-1] = P[i-k+1\\dots i]\\}'
  },
  complexity: {
    overview: 'KMP: O(N + M) worst-case time, O(M) space. Rabin-Karp: O(N + M) average time, O(N * M) worst-case.',
    cases: [
      { case: 'Best', time: 'O(N + M)', space: 'O(M)', explanation: 'Linear scan with minimal LPS fallbacks.' },
      { case: 'Average', time: 'O(N + M)', space: 'O(M)', explanation: 'Predictable linear throughput.' },
      { case: 'Worst', time: 'O(N + M)', space: 'O(M)', explanation: 'Strictly linear guaranteed even on pathological inputs like "AAAA...A".' }
    ],
    spaceNote: 'KMP requires an auxiliary array of size M for the LPS table.'
  },
  workedExample: {
    title: 'Building LPS Table for Pattern "ABABC"',
    input: 'Pattern: "ABABC"',
    steps: [
      { step: 1, action: 'i = 0 ("A")', state: 'LPS[0] = 0', explanation: 'Proper prefix cannot equal the full string.' },
      { step: 2, action: 'i = 1 ("B")', state: 'P[1] != P[0] -> LPS[1] = 0', explanation: '"AB" has no matching prefix-suffix.' },
      { step: 3, action: 'i = 2 ("A")', state: 'P[2] == P[0] -> LPS[2] = 1', explanation: '"ABA" has prefix "A" == suffix "A".' },
      { step: 4, action: 'i = 3 ("B")', state: 'P[3] == P[1] -> LPS[3] = 2', explanation: '"ABAB" has prefix "AB" == suffix "AB".' },
      { step: 5, action: 'i = 4 ("C")', state: 'P[4] != P[2] -> fallback -> LPS[4] = 0', explanation: '"ABABC" has no matching prefix-suffix.' }
    ],
    finalOutput: 'LPS Table for "ABABC" = [0, 0, 1, 2, 0]'
  },
  visualExplanation: {
    title: 'The Sliding Prefix Invariant',
    description: 'When mismatch strikes, the matched prefix-suffix overlap slides forward without moving the text eye. The green matching blocks align, allowing seamless resumption.',
    features: ['Forward-only text cursor', 'LPS fallback alignment', 'Rolling hash window subtraction']
  },
  pseudocode: {
    title: 'KMP Algorithm',
    code: `def kmp_search(text, pattern):
    lps = compute_lps(pattern)
    i = 0, j = 0
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j # Match!
        elif j > 0:
            j = lps[j - 1] # Fallback without moving i
        else:
            i += 1
    return -1`
  },
  pythonCode: {
    title: 'Complete KMP Implementation in Python',
    code: `def build_lps(pattern):
    m = len(pattern)
    lps = [0] * m
    length = 0 # length of previous longest prefix suffix
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp_search(text, pattern):
    if not pattern: return 0
    n, m = len(text), len(pattern)
    lps = build_lps(pattern)
    i = j = 0 # i: text, j: pattern

    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == m:
                return i - m # Match found at index (i - m)
        elif j > 0:
            j = lps[j - 1] # Smart fallback!
        else:
            i += 1
    return -1

# Test
text = "ABABDABACDABABCABAB"
pat = "ABABCABAB"
print("LPS table for pattern:", build_lps(pat))
print(f"Pattern found at index: {kmp_search(text, pat)}")`,
    explanation: 'Builds the LPS table and performs search without ever decrementing the text index i.'
  },
  runnableCode: {
    code: `def rabin_karp(text, pattern):
    # Rolling hash: Base 256, Prime Modulo 101
    d = 256
    q = 101
    n, m = len(text), len(pattern)
    h = pow(d, m - 1, q)
    p_hash = 0
    t_hash = 0

    for i in range(m):
        p_hash = (d * p_hash + ord(pattern[i])) % q
        t_hash = (d * t_hash + ord(text[i])) % q

    for s in range(n - m + 1):
        if p_hash == t_hash:
            if text[s:s + m] == pattern:
                return s
        if s < n - m:
            t_hash = (d * (t_hash - ord(text[s]) * h) + ord(text[s + m])) % q
            t_hash = (t_hash + q) % q
    return -1

print("Rabin-Karp match index:", rabin_karp("GEEKS FOR GEEKS", "GEEK"))`,
    expectedOutput: 'Rabin-Karp match index: 0'
  },
  lineByLineExplanation: [
    { lines: '5-6', codeSnippet: 'h = pow(d, m - 1, q)\np_hash = 0', explanation: 'Calculates high-order place multiplier d^(m-1) mod q.' },
    { lines: '18-19', codeSnippet: 't_hash = (d * (t_hash - ord(text[s]) * h) + ord(text[s + m])) % q', explanation: 'Subtracts departing leading character and adds incoming trailing character in O(1).' }
  ],
  edgeCases: [
    { case: 'Pattern with no repeating characters (e.g. "ABCDE")', handling: 'LPS table is all zeroes; falls back to index 0 on mismatch.', example: 'LPS = [0, 0, 0, 0, 0]' },
    { case: 'Hash collision in Rabin-Karp (Spurious Hit)', handling: 'Verify string slice text[s:s+m] == pattern to discard false positives.', example: 'p_hash == t_hash but text != pattern' }
  ],
  commonMistakes: [
    { mistake: 'Resetting the text index i backwards on mismatch in KMP.', solution: 'KMP never decrements i. Only the pattern index j rolls back via lps[j-1].' },
    { mistake: 'Forgetting negative modulo correction in rolling hash.', solution: 'In Python modulo handles negatives automatically, but in C/C++/Java add q before modulo.' }
  ],
  applications: [
    { industry: 'Academic Integrity & Plagiarism Detection', application: 'Rabin-Karp Document Fingerprinting', benefit: 'Computes rolling hashes of n-gram sentences to match text across millions of essays in linear time.' },
    { industry: 'Network Intrusion Detection (Snort IDS)', application: 'Deep Packet Inspection', benefit: 'Scans live network packet streams for malware signatures without buffering the stream.' }
  ],
  practiceQuestions: [
    { id: 'dsa-3-7-q1', question: 'What is the maximum number of times the text pointer i advances in KMP on a text of length N?', hint: 'Does i ever decrement?', answer: 'Exactly N times. The text pointer i increments strictly from 0 to N without ever moving backwards.' },
    { id: 'dsa-3-7-q2', question: 'What does the LPS table value LPS[5] = 3 mean?', hint: 'Proper prefix and suffix length.', answer: 'It means that for the prefix of length 6 (indices 0..5), the longest proper prefix that is also a suffix has length 3.' },
    { id: 'dsa-3-7-q3', question: 'How does Rabin-Karp handle multiple pattern searches efficiently?', hint: 'Can you store pattern hashes in a hash set?', answer: 'Hash all k patterns into a hash set in O(k * M) time. Slide one rolling hash window across the text in O(N) time; if window hash matches any set entry, verify the string.' }
  ],
  quiz: [
    {
      id: 'dsa-3-7-quiz-1',
      question: 'What is the worst-case time complexity of the KMP string search algorithm on text of length N and pattern of length M?',
      options: ['O(N + M)', 'O(N * M)', 'O(N log M)', 'O(M^2)'],
      correctIndex: 0,
      explanation: 'Precomputing the LPS table takes O(M), and searching the text takes O(N), guaranteeing strictly linear O(N + M) worst-case time.'
    },
    {
      id: 'dsa-3-7-quiz-2',
      question: 'What does KMP do with the text pointer i when a character mismatch occurs at pattern index j?',
      options: [
        'It leaves i unchanged and updates j = LPS[j - 1]',
        'It resets i back to the start of the text',
        'It decrements i by j positions',
        'It increments i by M positions'
      ],
      correctIndex: 0,
      explanation: 'The breakthrough innovation of KMP is that the text pointer i NEVER moves backwards; only the pattern pointer j falls back to LPS[j-1].'
    },
    {
      id: 'dsa-3-7-quiz-3',
      question: 'What is a "Spurious Hit" in the Rabin-Karp algorithm?',
      options: [
        'When the rolling hash matches the pattern hash, but character comparison reveals the strings are different',
        'When the pattern is longer than the text',
        'When a divide-by-zero error occurs',
        'When the text contains non-ASCII characters'
      ],
      correctIndex: 0,
      explanation: 'Because hash functions map infinite string combinations to finite modulo integers, hash collisions (spurious hits) must be verified with an exact string comparison.'
    }
  ],
  codingChallenge: {
    title: 'Repeated Substring Pattern',
    problem: 'Given a string s, check if it can be constructed by taking a substring of it and appending one or more copies of the substring together. Solve in O(n) using the KMP LPS array.',
    starterCode: `def repeated_substring_pattern(s):
    n = len(s)
    # Build KMP LPS array
    lps = [0] * n
    length = 0
    i = 1
    while i < n:
        if s[i] == s[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

    last = lps[-1]
    # If last > 0 and the remaining prefix divides n evenly:
    return last > 0 and n % (n - last) == 0

print(repeated_substring_pattern("abab"))    # Expected: True ("ab" * 2)
print(repeated_substring_pattern("aba"))     # Expected: False
print(repeated_substring_pattern("abcabcabc")) # Expected: True ("abc" * 3)`,
    solution: `def repeated_substring_pattern(s):
    n = len(s)
    lps = [0] * n
    length = 0
    i = 1
    while i < n:
        if s[i] == s[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

    last = lps[-1]
    return last > 0 and n % (n - last) == 0

print(repeated_substring_pattern("abab"))`,
    hints: [
      'The length of the potential repeating unit is (n - lps[-1]).',
      'If lps[-1] > 0 and n is divisible by (n - lps[-1]), then the string is periodic.'
    ]
  },
  summary: {
    keyTakeaways: [
      'KMP guarantees linear O(N + M) worst-case time without ever backtracking text index i.',
      'LPS table π encodes longest proper prefix that is also a suffix for each prefix.',
      'Rabin-Karp uses polynomial rolling hash for efficient multi-pattern matching.',
      'Rolling hashes update in O(1) by subtracting outgoing and adding incoming characters.'
    ],
    nextLessonId: 'dsa-strings-trie',
    nextLessonTitle: 'Trie Data Structure',
    nextLessonModuleId: 'dsa-module-3'
  }
};

// 8. Trie Data Structure
m3Lessons['dsa-strings-trie'] = {
  id: 'dsa-strings-trie',
  moduleId: 'dsa-module-3',
  title: 'Trie Data Structure',
  subtitle: 'Prefix Trees, Word Retrieval, Autocomplete & Bitwise XOR Lookups',
  order: 8,
  readTimeMinutes: 30,
  difficulty: 'Advanced',
  visualizerType: 'trie',
  objectives: [
    'Construct a Trie (Prefix Tree) node structure with children map and is_end_of_word flag.',
    'Implement insert(word), search(word), and startsWith(prefix) in O(L) time.',
    'Analyze space-time trade-offs between array child pointers vs hash map child nodes.',
    'Implement Autocomplete prefix search and Maximum XOR pair lookups using Binary Tries.'
  ],
  prerequisites: [
    'Tree Fundamentals',
    'Hash Maps and Hash Sets'
  ],
  analogy: {
    title: 'The Structured Telephone Contact Tree',
    text: 'When dialing a customer support hotline: "Press 1 for English, Press 2 for Spanish". If you press 1, the next menu branches: "Press 1 for Billing, Press 2 for Technical Support". Every spoken option shares the initial root selection. You don’t listen to all 50 possible department numbers; you traverse the tree character by character. A Trie organizes words identically: all words starting with "cat" ("cat", "cater", "catapult") share the exact same "c" -> "a" -> "t" path.',
    metaphor: 'A Trie shares common prefixes among words, allowing prefix lookups proportional to word length L, not dictionary size N.'
  },
  problemSolved: {
    title: 'Instant Sub-Millisecond Prefix Matching & Autocomplete',
    description: 'Searching for all words with prefix "app" in a dictionary of 1,000,000 words naively requires scanning all million words in O(N * L). A Trie locates the prefix node in O(L) time (where L = 3) and traverses only matching descendants, completely independent of total dictionary size.',
    keyPoints: [
      'Prefix search and insertion take O(L) time where L is word length',
      'Naturally implements search bar autocomplete and spell checking',
      'Binary Tries solve Maximum XOR Pair problems in O(32 * N) = O(N) time'
    ]
  },
  intuition: {
    overview: 'A Trie is an m-ary tree where each node represents a character. Edges lead to successor letters. A boolean flag marks where complete words terminate.',
    steps: [
      { step: 1, title: 'Insert', description: 'Walk from root along character edges. If a character node does not exist, create it. Mark last node is_end_of_word = True.' },
      { step: 2, title: 'Search', description: 'Follow character edges. If edge missing, return False. If all edges found, return node.is_end_of_word.' },
      { step: 3, title: 'Starts With', description: 'Follow prefix edges. If all edges exist, return True regardless of is_end_of_word.' }
    ]
  },
  formalDefinition: {
    text: 'A Trie is an ordered tree data structure where keys are usually strings. The root represents the empty string "". Every node has at most |Σ| children. Lookup, insertion, and deletion complexity is Θ(L), where L is key length, independent of dictionary cardinality N.',
    latex: '\\text{Time}(insert) = \\mathcal{O}(L), \\quad \\text{Time}(search) = \\mathcal{O}(L)'
  },
  complexity: {
    overview: 'Insert: O(L) time. Search: O(L) time. Prefix check: O(L) time. Space: O(N * L * |Σ|) in worst case.',
    cases: [
      { case: 'Best', time: 'O(L)', space: 'O(1)', explanation: 'Word already exists; zero new nodes allocated.' },
      { case: 'Average', time: 'O(L)', space: 'O(L)', explanation: 'Allocates nodes only for distinct suffix letters.' },
      { case: 'Worst', time: 'O(L)', space: 'O(N * L)', explanation: 'All words share zero common prefixes.' }
    ],
    spaceNote: 'Can be compressed into a Radix Tree (Patricia Trie) by collapsing non-branching edges.'
  },
  workedExample: {
    title: 'Inserting "cat" and "car" into Trie',
    input: 'Insert "cat", then insert "car"',
    steps: [
      { step: 1, action: 'Insert "cat"', state: 'root -> [c] -> [a] -> [t (end)]', explanation: 'Create nodes c, a, and t. Mark node t as end of word.' },
      { step: 2, action: 'Insert "car"', state: 'root -> [c] -> [a] -> branches to [t (end)] and [r (end)]', explanation: 'Follow existing [c] -> [a]. "r" does not exist under [a], so create node [r] and mark as end.' }
    ],
    finalOutput: 'Words "cat" and "car" stored sharing common prefix "ca".'
  },
  visualExplanation: {
    title: 'Branching Tree of Prefixes',
    description: 'Root node at top. Branches branch out into 26 letters. Common prefixes follow identical paths down the tree until diverging at their first distinct letter.',
    features: ['Shared prefix trunks', 'Terminal word indicator flags', 'Direct character branching']
  },
  pseudocode: {
    title: 'Trie Class',
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_word = True`
  },
  pythonCode: {
    title: 'Complete Trie Implementation with Autocomplete in Python',
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True

trie = Trie()
for word in ["apple", "app", "apricot", "banana"]:
    trie.insert(word)

print("Search 'app':", trie.search("app"))       # True
print("Search 'appl':", trie.search("appl"))     # False
print("Starts with 'ap':", trie.starts_with("ap")) # True
print("Starts with 'cat':", trie.starts_with("cat")) # False`,
    explanation: 'Demonstrates insert, full-word search, and prefix testing in O(L) time.'
  },
  runnableCode: {
    code: `class SimpleTrie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        curr = self.root
        for ch in word:
            if ch not in curr: curr[ch] = {}
            curr = curr[ch]
        curr['#'] = True # End of word sentinel

    def search(self, word):
        curr = self.root
        for ch in word:
            if ch not in curr: return False
            curr = curr[ch]
        return '#' in curr

t = SimpleTrie()
t.insert("algo")
print("Search 'algo':", t.search("algo"))
print("Search 'alg':", t.search("alg"))`,
    expectedOutput: "Search 'algo': True\nSearch 'alg': False"
  },
  lineByLineExplanation: [
    { lines: '6-9', codeSnippet: 'for ch in word:\n    if ch not in curr: curr[ch] = {}\n    curr = curr[ch]', explanation: 'Traverses nested dictionaries, creating nodes as needed.' },
    { lines: '10', codeSnippet: "curr['#'] = True", explanation: 'Uses sentinel key "#" to mark word termination.' }
  ],
  edgeCases: [
    { case: 'Searching prefix that is not a full word', handling: 'search("app") returns False if is_end_of_word is False, but starts_with("app") returns True.', example: 'Dictionary contains only "apple"' },
    { case: 'Empty String', handling: 'Root node marked is_end_of_word = True.', example: 'insert("")' }
  ],
  commonMistakes: [
    { mistake: 'Returning True in search() just because the prefix path exists.', solution: 'Must check `node.is_end_of_word` for search(), but not for startsWith().' },
    { mistake: 'Using an array of size 26 when input contains uppercase or Unicode characters.', solution: 'Use a Python dictionary `node.children = {}` for dynamic Unicode character handling.' }
  ],
  applications: [
    { industry: 'Search Engines & Mobile Keyboards', application: 'T9 and Predictive Autocomplete', benefit: 'Suggests next word completions in under 1 millisecond as the user types each keystroke.' },
    { industry: 'IP Networking', application: 'Longest Prefix Match Routing', benefit: 'Routers match incoming packet IP addresses against subnet routing tables using binary tries.' }
  ],
  practiceQuestions: [
    { id: 'dsa-3-8-q1', question: 'What is the advantage of a Trie over a Hash Table for string storage?', hint: 'Can a hash table answer "find all words starting with X" in O(L)?', answer: 'A hash table cannot perform prefix searches without scanning all keys in O(N). A Trie answers prefix queries in O(L) time and naturally outputs words in sorted alphabetical order.' },
    { id: 'dsa-3-8-q2', question: 'How can a Binary Trie be used to find the maximum XOR pair in an array?', hint: 'Each number is a 32-bit binary string.', answer: 'Insert each number as a 32-bit binary string. For query number X, greedily traverse the opposite bit (1 - bit) at each level to maximize XOR bit output.' },
    { id: 'dsa-3-8-q3', question: 'What is a Radix Tree (Compact Trie) and how does it save space?', hint: 'Consider single child chains like [c] -> [a] -> [t].', answer: 'A Radix Tree compresses every path of non-branching nodes into a single edge containing a multi-character string (e.g. edge labeled "cat"), reducing total node count.' }
  ],
  quiz: [
    {
      id: 'dsa-3-8-quiz-1',
      question: 'What is the time complexity of searching for a word of length L in a Trie containing N words?',
      options: ['O(L)', 'O(N)', 'O(N * L)', 'O(log N)'],
      correctIndex: 0,
      explanation: 'Trie search follows L edges corresponding to the characters of the word, taking O(L) time completely independent of dictionary size N.'
    },
    {
      id: 'dsa-3-8-quiz-2',
      question: 'What distinguishes `search(word)` from `startsWith(prefix)` in a Trie implementation?',
      options: [
        'search() verifies that `is_end_of_word` is True at the final node; startsWith() only verifies that the path exists',
        'startsWith() is slower than search()',
        'search() only works on numbers',
        'startsWith() starts from the leaves'
      ],
      correctIndex: 0,
      explanation: '`startsWith` succeeds as long as all prefix edges exist, while `search` requires the final node to have its `is_end_of_word` flag set.'
    },
    {
      id: 'dsa-3-8-quiz-3',
      question: 'In what order does a preorder DFS traversal of a Trie visit stored words?',
      options: ['Alphabetical (Lexicographical) order', 'Reverse order', 'Random order', 'Length order'],
      correctIndex: 0,
      explanation: 'Traversing child nodes in alphabetical order visits words in strict lexicographical order, acting as an implicit Radix Sort.'
    }
  ],
  codingChallenge: {
    title: 'Design Add and Search Words Data Structure',
    problem: 'Design a data structure that supports adding new words and finding if a string matches any previously added string. Word search can contain the dot character "." where dots can match any letter.',
    starterCode: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def add_word(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node: node[ch] = {}
            node = node[ch]
        node['#'] = True

    def search(self, word: str) -> bool:
        def dfs(idx, node):
            if idx == len(word):
                return '#' in node
            ch = word[idx]
            if ch == '.':
                for child_key, child_node in node.items():
                    if child_key != '#' and dfs(idx + 1, child_node):
                        return True
                return False
            else:
                if ch not in node: return False
                return dfs(idx + 1, node[ch])
        return dfs(0, self.root)

wd = WordDictionary()
wd.add_word("bad")
wd.add_word("dad")
wd.add_word("mad")
print("Search 'pad':", wd.search("pad")) # Expected: False
print("Search 'bad':", wd.search("bad")) # Expected: True
print("Search '.ad':", wd.search(".ad")) # Expected: True
print("Search 'b..':", wd.search("b..")) # Expected: True`,
    solution: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def add_word(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node: node[ch] = {}
            node = node[ch]
        node['#'] = True

    def search(self, word: str) -> bool:
        def dfs(idx, node):
            if idx == len(word):
                return '#' in node
            ch = word[idx]
            if ch == '.':
                for child_key, child_node in node.items():
                    if child_key != '#' and dfs(idx + 1, child_node):
                        return True
                return False
            else:
                if ch not in node: return False
                return dfs(idx + 1, node[ch])
        return dfs(0, self.root)

wd = WordDictionary()
wd.add_word("bad")
print(wd.search(".ad"))`,
    hints: [
      'Use a standard Trie node structure.',
      'When character is a dot ".", recursively branch on all child nodes at that level.',
      'When character is a letter, proceed down the specific child edge.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Tries provide O(L) prefix search, insertion, and deletion.',
      'Common prefixes share memory along single root-to-leaf paths.',
      'Autocomplete is implemented by walking to prefix node and running DFS.',
      'Wildcard searches with "." branch across all children via backtracking.'
    ],
    nextLessonId: 'dsa-ll-singly',
    nextLessonTitle: 'Singly Linked Lists',
    nextLessonModuleId: 'dsa-module-4'
  }
};

// Write out Module 3 fully complete
writeModuleFile(path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-3.ts'), m3.data, m3Lessons);
console.log('Successfully completed DSA Module 3! Total authored:', Object.keys(m3Lessons).length);
