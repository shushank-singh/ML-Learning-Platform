const path = require('path');
const { getExistingDSALessons } = require('./extract-landmarks');
const { writeModuleFile } = require('./writer');

const m3 = getExistingDSALessons(3);
const m3Lessons = { ...m3.lessons };

// 1. String Representation and Operations
m3Lessons['dsa-strings-operations'] = {
  id: 'dsa-strings-operations',
  moduleId: 'dsa-module-3',
  title: 'String Representation and Operations',
  subtitle: 'ASCII, Unicode, UTF-8 Encoding, Immutability & Memory Internals',
  order: 1,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Understand character encodings: ASCII, Unicode code points, and variable-width UTF-8.',
    'Explain string immutability in Python and Java and its architectural benefits.',
    'Analyze the O(n^2) cost of naive string concatenation in loops.',
    'Use join() and bytearrays for linear O(n) string construction.'
  ],
  prerequisites: [
    'Array Operations and Memory Layout',
    'Binary numbers and byte representation'
  ],
  analogy: {
    title: 'The Carved Stone Tablet',
    text: 'In Python, strings are like carved stone tablets: once etched, you cannot erase or modify a single glyph in-place. If you want to change one letter of a 1,000-word essay on a tablet, the stonemason cannot simply chisel over letter #400; they must quarry a brand-new slab of stone and re-carve all 1,000 words from start to finish. Repeatedly adding one character in a loop is repeatedly carving new slabs of size 1, 2, 3... n, causing an O(n^2) explosion of wasted stone.',
    metaphor: 'String immutability forces full reallocation on modification; use list buffers to batch changes.'
  },
  problemSolved: {
    title: 'Preventing Accidental O(n^2) String Copying',
    description: 'Because strings are immutable, naive patterns like `s += char` inside a loop copy the entire existing string at every iteration, turning a simple linear operation into quadratic O(n^2) runtime. Understanding string representation enables linear-time string processing.',
    keyPoints: [
      'Explains UTF-8 variable length (1 to 4 bytes per character)',
      'Reveals why strings are immutable (thread safety, hash caching, interned literals)',
      'Demonstrates O(n) construction using `"".join(buffer)`'
    ]
  },
  intuition: {
    overview: 'Strings are sequential arrays of bytes or code points. Immutability guarantees that their hash value never changes, allowing strings to serve as secure dictionary keys.',
    steps: [
      { step: 1, title: 'Code Point Mapping', description: 'Each character maps to an integer code point (e.g. ord("A") == 65).' },
      { step: 2, title: 'Byte Serialization', description: 'UTF-8 encodes ASCII in 1 byte, European letters in 2 bytes, Asian scripts in 3 bytes, emojis in 4 bytes.' },
      { step: 3, title: 'Buffer Construction', description: 'Accumulate characters into a mutable list, then convert to string once with `"".join()`.' }
    ]
  },
  formalDefinition: {
    text: 'A string S of length n over alphabet Σ is an immutable sequence of characters S[0..n-1]. In Python, CPython implements strings as compact ASCII/Latin1/UCS-2/UCS-4 arrays depending on the maximum character code point present (PEP 393).',
    latex: 'S = \\langle c_0, c_1, \\dots, c_{n-1} \\rangle, \\quad c_i \\in \\Sigma'
  },
  complexity: {
    overview: 'Indexing/Length: O(1). Concatenation: O(n + m). Slicing: O(k). Search: O(n).',
    cases: [
      { case: 'Best', time: 'O(1)', space: 'O(1)', explanation: 'Direct indexing by character position.' },
      { case: 'Average', time: 'O(n)', space: 'O(n)', explanation: 'Linear scan for substring or formatting.' },
      { case: 'Worst', time: 'O(n^2)', space: 'O(n^2)', explanation: 'Repeated += concatenation in a loop of size n.' }
    ],
    spaceNote: 'String interning caches small string literals in a global table to save memory.'
  },
  workedExample: {
    title: 'Benchmarking String Concatenation vs. List Join',
    input: 'Construct a string of 10,000 numbers.',
    steps: [
      { step: 1, action: 'Naive `+=`', state: '10,000 allocations', explanation: 'Creates 10,000 intermediate string objects, copying 1 + 2 + ... + 10000 = ~50 million bytes.' },
      { step: 2, action: 'List Append + Join', state: '1 list + 1 string allocation', explanation: 'List append is O(1) amortized. Final join measures total length and allocates exact buffer once.' }
    ],
    finalOutput: 'Join completes in 0.002s vs. Naive += taking 0.15s (75x speedup).'
  },
  visualExplanation: {
    title: 'UTF-8 Byte Encodings in Memory',
    description: 'ASCII characters occupy 1 byte starting with bit 0. Multibyte characters use leading byte prefixes 110x, 1110x, 11110x followed by continuation bytes 10xx to encode all human languages and emoji symbols.',
    features: ['1-byte ASCII compatibility', 'Multi-byte Unicode expansion', 'Immutable contiguous byte buffer']
  },
  pseudocode: {
    title: 'Efficient String Builder',
    code: `def build_string(tokens):
    buffer = []
    for token in tokens:
        buffer.append(token) # O(1) amortized
    return "".join(buffer)   # O(total_length) single pass`
  },
  pythonCode: {
    title: 'String Code Points and Memory Size in Python',
    code: `import sys

s_ascii = "hello"
s_emoji = "hello😊"

print(f"ASCII '{s_ascii}': length={len(s_ascii)}, bytes={sys.getsizeof(s_ascii)}")
print(f"Emoji '{s_emoji}': length={len(s_emoji)}, bytes={sys.getsizeof(s_emoji)}")
print(f"Code point of 'A': {ord('A')}, Character of 65: {chr(65)}")`,
    explanation: 'Demonstrates Python PEP 393 flexible string representation where string memory widens to 4 bytes per char when an emoji is present.'
  },
  runnableCode: {
    code: `words = ["Data", "Structures", "and", "Algorithms"]
# Idiomatic fast string construction
sentence = " ".join(words)
print("Joined sentence:", sentence)
# String reversal in Python (O(n) slicing)
print("Reversed:", sentence[::-1])`,
    expectedOutput: 'Joined sentence: Data Structures and Algorithms\nReversed: smhtiroglA dna serutcurtS ataD'
  },
  lineByLineExplanation: [
    { lines: '3', codeSnippet: 'sentence = " ".join(words)', explanation: 'Measures total required length, allocates contiguous memory once, and copies all words in O(n).' },
    { lines: '6', codeSnippet: 'sentence[::-1]', explanation: 'Creates a reversed copy using slice notation in O(n) time.' }
  ],
  edgeCases: [
    { case: 'Empty String', handling: 'len("") == 0, boolean truthiness is False.', example: 'bool("") -> False' },
    { case: 'Combining Unicode Characters (Accents)', handling: 'Len count may count accent as separate character unless normalized with unicodedata.normalize.', example: 'e + combining acute' }
  ],
  commonMistakes: [
    { mistake: 'Using `str += char` in loops.', solution: 'Accumulate in a list and call `"".join(list)`.' },
    { mistake: 'Assuming len(s) is always equal to the number of bytes.', solution: 'In UTF-8, non-ASCII characters take 2-4 bytes, so byte length >= character length.' }
  ],
  applications: [
    { industry: 'Web Security', application: 'Constant-Time String Comparison', benefit: 'Prevents timing attacks when comparing cryptographic authentication tokens and HMACs.' },
    { industry: 'Data Engineering', application: 'Text Tokenization & Parsing', benefit: 'Processes gigabytes of JSON/CSV strings by slicing views without duplicating heap buffers.' }
  ],
  practiceQuestions: [
    { id: 'dsa-3-1-q1', question: 'Why are strings immutable in Python, Java, and C#?', hint: 'Consider dictionary keys, hashing, and thread safety.', answer: 'Immutability guarantees that the hash code never changes once computed (safe for dict keys), enables memory sharing (interning), and ensures thread safety without locks.' },
    { id: 'dsa-3-1-q2', question: 'What is the time complexity of s[i:j] slicing a string of length n?', hint: 'Does it create a copy?', answer: 'O(j - i) = O(k). In Python, string slicing creates a new independent string containing a copy of the k characters.' },
    { id: 'dsa-3-1-q3', question: 'How many bytes does the emoji "🔥" take in UTF-8 encoding?', hint: 'Code point is U+1F525 (> U+FFFF).', answer: '4 bytes. Code points between U+10000 and U+10FFFF require 4 bytes in UTF-8.' }
  ],
  quiz: [
    {
      id: 'dsa-3-1-quiz-1',
      question: 'What is the time complexity of repeatedly doing `s += char` inside a loop of n iterations?',
      options: ['O(n^2)', 'O(n)', 'O(n log n)', 'O(1)'],
      correctIndex: 0,
      explanation: 'Because strings are immutable, each concatenation allocates a new string and copies all previous characters, yielding 1 + 2 + ... + n = O(n^2) operations.'
    },
    {
      id: 'dsa-3-1-quiz-2',
      question: 'What is the most efficient way to build a string from 100,000 fragments in Python?',
      options: [
        'Collect fragments in a list and use "".join(list)',
        'Use s = s + fragment in a loop',
        'Use recursion',
        'Write to a file and read it back'
      ],
      correctIndex: 0,
      explanation: 'Appending to a list is O(1) amortized, and "".join() allocates memory for the final string exactly once, executing in linear O(n) total time.'
    },
    {
      id: 'dsa-3-1-quiz-3',
      question: 'What Python built-in function returns the Unicode code point integer of a character?',
      options: ['ord()', 'chr()', 'bin()', 'hex()'],
      correctIndex: 0,
      explanation: 'ord("A") returns 65. The inverse function chr(65) returns "A".'
    }
  ],
  codingChallenge: {
    title: 'Defanging an IP Address Efficiently',
    problem: 'Given a valid (IPv4) IP address, return a defanged version of that IP address. A defanged IP address replaces every period "." with "[.]". Construct your solution in linear O(n) time.',
    starterCode: `def defang_i_paddr(address):
    # Construct in O(n) using list comprehension or join
    return address.replace(".", "[.]")

print(defang_i_paddr("1.1.1.1")) # Expected: "1[.]1[.]1[.]1"
print(defang_i_paddr("255.100.50.0")) # Expected: "255[.]100[.]50[.]0"`,
    solution: `def defang_i_paddr(address):
    return address.replace(".", "[.]")

print(defang_i_paddr("1.1.1.1"))`,
    hints: [
      'Iterate through the string or use str.replace().',
      'If building manually, append "[.]" whenever char is "." otherwise append char.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Strings are immutable sequences of Unicode code points.',
      'Naive concatenation in loops causes severe O(n^2) performance degradation.',
      'Always use `"".join()` to construct strings from collections in O(n) time.',
      'UTF-8 uses 1 to 4 variable bytes per character.'
    ],
    nextLessonId: 'dsa-strings-frequency',
    nextLessonTitle: 'Frequency Counting Techniques',
    nextLessonModuleId: 'dsa-module-3'
  }
};

// 2. Frequency Counting Techniques
m3Lessons['dsa-strings-frequency'] = {
  id: 'dsa-strings-frequency',
  moduleId: 'dsa-module-3',
  title: 'Frequency Counting Techniques',
  subtitle: 'Direct Array Bins, Hash Maps & Character Histograms',
  order: 2,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'hash-table',
  objectives: [
    'Use fixed-size array histograms (26 bins for lowercase English) for zero-allocation counting.',
    'Implement frequency counting with hash tables and collections.Counter.',
    'Solve First Unique Character in a String and Valid Anagram in O(n) time.',
    'Compare array direct indexing against hash map hashing overhead.'
  ],
  prerequisites: [
    'String Representation and Operations',
    'Array Operations and Memory Layout'
  ],
  analogy: {
    title: 'The Voting Ballot Sorting Trays',
    text: 'During an election with 26 candidates, tallying votes by writing each candidate name on a single whiteboard over and over is chaotic. Instead, election officials set up 26 wooden trays labeled A through Z. As each ballot is read, the official drops a marble into that candidate’s tray in 1 second. At the end, inspecting the height of the marbles gives the exact vote counts without searching.',
    metaphor: 'A direct array frequency table uses character codes as tray indices for instant O(1) tallying.'
  },
  problemSolved: {
    title: 'Summarizing String Composition in O(n) Time',
    description: 'Answering questions like "do two strings share the same characters?" or "what is the first non-repeating character?" naively takes O(n^2) using nested counts. Frequency counting reduces this to a single O(n) scan by decoupling counting from inspection.',
    keyPoints: [
      'Converts quadratic character searches into linear passes',
      'Fixed array of size 26 or 256 uses strictly O(1) space',
      'Underpins anagrams, palindromes, and Huffman frequency tables'
    ]
  },
  intuition: {
    overview: 'Map each character c to an index: index = ord(c) - ord("a"). Increment freq[index]++. A single pass tallies all frequencies.',
    steps: [
      { step: 1, title: 'Allocate Table', description: 'Create array of size 26 initialized to 0.' },
      { step: 2, title: 'Tally Pass', description: 'For each character c in string, freq[ord(c) - ord("a")] += 1.' },
      { step: 3, title: 'Query Pass', description: 'Inspect frequencies to answer queries in O(1) per character.' }
    ]
  },
  formalDefinition: {
    text: 'A frequency table H for string S over alphabet Σ is a mapping H: Σ -> N where H(c) = |{ i \\in [0, |S|-1] \\mid S[i] = c }|. For bounded alphabets (|Σ| = O(1)), H is stored in a direct-address array of size |Σ|.',
    latex: 'H[c] = \\sum_{i=0}^{n-1} \\mathbb{I}(S[i] == c), \\quad \\text{Space} = \\mathcal{O}(|\\Sigma|) = \\mathcal{O}(1)'
  },
  complexity: {
    overview: 'Time: O(n) to populate table of length n. Space: O(|Σ|) = O(1) for fixed alphabet like ASCII/English.',
    cases: [
      { case: 'Best', time: 'O(n)', space: 'O(1)', explanation: 'Single pass across all characters.' },
      { case: 'Average', time: 'O(n)', space: 'O(1)', explanation: 'Linear scan with direct array writes.' },
      { case: 'Worst', time: 'O(n)', space: 'O(1)', explanation: 'Fixed alphabet bounded by 26 or 256 elements.' }
    ],
    spaceNote: 'For general Unicode, a hash map requires O(k) space where k is the number of distinct characters.'
  },
  workedExample: {
    title: 'Finding First Unique Character in "leetcode"',
    input: 's = "leetcode"',
    steps: [
      { step: 1, action: 'Populate Frequency Map', state: "l:1, e:3, t:1, c:1, o:1, d:1", explanation: 'Count all occurrences in a first pass of O(n).' },
      { step: 2, action: 'Inspect in Original Order', state: 'Check s[0] = "l" -> count is 1!', explanation: 'Character "l" has frequency 1 and is at index 0. Return index 0 immediately.' }
    ],
    finalOutput: 'First unique character is "l" at index 0.'
  },
  visualExplanation: {
    title: 'The 26-Bin Frequency Histogram',
    description: 'An array of 26 slots labeled a through z. As the string "banana" is read: b gets 1, a gets 3, n gets 2. Comparing with "nabana" yields identical bar heights, proving they are anagrams.',
    features: ['ord(c) - ord("a") indexing', 'Direct integer increments', 'Constant memory footprint']
  },
  pseudocode: {
    title: 'Direct Frequency Counter',
    code: `freq = [0] * 26
for char in s:
    freq[ord(char) - ord('a')] += 1

# Check anagrams
for char in t:
    freq[ord(char) - ord('a')] -= 1
return all(count == 0 for count in freq)`
  },
  pythonCode: {
    title: 'First Unique Character in Python',
    code: `from collections import Counter

def first_uniq_char(s):
    # Method 1: Using collections.Counter
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1

# Method 2: Using fixed-size 26 array
def first_uniq_char_array(s):
    freq = [0] * 26
    for ch in s:
        freq[ord(ch) - ord('a')] += 1
    for i, ch in enumerate(s):
        if freq[ord(ch) - ord('a')] == 1:
            return i
    return -1

print("First unique in 'loveleetcode':", first_uniq_char("loveleetcode")) # Expected: 2 ('v')`,
    explanation: 'Demonstrates both Pythonic Counter and low-level array-bin counting.'
  },
  runnableCode: {
    code: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    for ch in t:
        if ch not in counts or counts[ch] == 0:
            return False
        counts[ch] -= 1
    return True

print("anagram vs nagaram:", is_anagram("anagram", "nagaram"))
print("rat vs car:", is_anagram("rat", "car"))`,
    expectedOutput: 'anagram vs nagaram: True\nrat vs car: False'
  },
  lineByLineExplanation: [
    { lines: '4-6', codeSnippet: 'for ch in s: counts[ch] = counts.get(ch, 0) + 1', explanation: 'Increments character tally in O(1) average time.' },
    { lines: '7-10', codeSnippet: 'for ch in t:\n    if ch not in counts or counts[ch] == 0: return False\n    counts[ch] -= 1', explanation: 'Decrements character tally and verifies matching frequency balance.' }
  ],
  edgeCases: [
    { case: 'Single character string', handling: 'Frequency is 1; returned immediately as unique.', example: '"z"' },
    { case: 'All characters identical', handling: 'No unique character; returns -1.', example: '"eeeeee"' }
  ],
  commonMistakes: [
    { mistake: 'Using `s.count(ch)` inside a loop over s.', solution: '`s.count()` scans the entire string in O(n). Calling it inside a loop results in disastrous O(n^2) runtime.' },
    { mistake: 'Negative indexing in array bins when input has uppercase characters.', solution: 'Normalize input with `.lower()` or size array to 128/256 for full ASCII.' }
  ],
  applications: [
    { industry: 'Natural Language Processing', application: 'Bag-of-Words & TF-IDF', benefit: 'Builds document frequency vectors used in search ranking and text classification.' },
    { industry: 'Data Compression', application: 'Huffman Coding Tree Construction', benefit: 'Generates optimal prefix codes by assigning shortest bit sequences to highest-frequency characters.' }
  ],
  practiceQuestions: [
    { id: 'dsa-3-2-q1', question: 'When is a fixed array of size 26 preferred over a Python dict for frequency counting?', hint: 'Consider hashing overhead and memory allocation.', answer: 'When the alphabet is strictly lowercase English. An array avoids hash function computation, dynamic table resizing, and pointer overhead, providing faster raw CPU performance and O(1) space.' },
    { id: 'dsa-3-2-q2', question: 'How can you check if any permutation of a string can form a palindrome using frequency counting?', hint: 'How many characters can have an odd count in a palindrome?', answer: 'A palindrome can have at most ONE character with an odd frequency (which sits in the exact center). If count of odd-frequency characters <= 1, a palindrome permutation exists.' },
    { id: 'dsa-3-2-q3', question: 'What is the time complexity of comparing two collections.Counter objects for equality?', hint: 'Depends on the number of unique keys.', answer: 'O(|Σ|) where |Σ| is the number of distinct keys in the alphabet.' }
  ],
  quiz: [
    {
      id: 'dsa-3-2-quiz-1',
      question: 'What is the runtime of checking if two strings of length n are anagrams using frequency counting?',
      options: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(1)'],
      correctIndex: 0,
      explanation: 'Populating the frequency table takes O(n), and decrementing with the second string takes O(n), totaling O(n) linear time.'
    },
    {
      id: 'dsa-3-2-quiz-2',
      question: 'Why is `s.count(ch)` inside `for ch in s:` considered an anti-pattern in algorithm design?',
      options: [
        'It causes O(n^2) quadratic running time because count() scans the string on every iteration',
        'It modifies the string in-place',
        'It only works on numbers',
        'It crashes on vowels'
      ],
      correctIndex: 0,
      explanation: '`s.count()` executes an O(n) linear search every time it is called. Executing it n times produces O(n * n) = O(n^2) complexity.'
    },
    {
      id: 'dsa-3-2-quiz-3',
      question: 'For an alphabet of 26 lowercase English letters, what is the space complexity of an array frequency table?',
      options: ['O(1) constant space', 'O(n) linear space', 'O(n^2) space', 'O(log n) space'],
      correctIndex: 0,
      explanation: 'The array always holds exactly 26 integer slots regardless of how long the input string n is, which is strictly O(1) auxiliary space.'
    }
  ],
  codingChallenge: {
    title: 'Valid Anagram',
    problem: 'Given two strings s and t, return True if t is an anagram of s, and False otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    starterCode: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    freq = [0] * 26
    for i in range(len(s)):
        freq[ord(s[i]) - ord('a')] += 1
        freq[ord(t[i]) - ord('a')] -= 1
    return all(x == 0 for x in freq)

print(is_anagram("anagram", "nagaram")) # Expected: True
print(is_anagram("rat", "car"))         # Expected: False`,
    solution: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    freq = [0] * 26
    for i in range(len(s)):
        freq[ord(s[i]) - ord('a')] += 1
        freq[ord(t[i]) - ord('a')] -= 1
    return all(x == 0 for x in freq)

print(is_anagram("anagram", "nagaram"))`,
    hints: [
      'If string lengths differ, they cannot be anagrams: return False immediately.',
      'Use a single array of size 26. Increment for s, decrement for t.',
      'All 26 slots must equal 0 at the end.'
    ]
  },
  summary: {
    keyTakeaways: [
      'Frequency counting replaces O(n^2) nested loops with a linear O(n) pass.',
      'Direct array bins (size 26 or 256) provide faster execution than hash tables.',
      'A valid palindrome permutation has at most one character with an odd frequency.',
      'Never call `str.count()` inside an outer loop over the same string.'
    ],
    nextLessonId: 'dsa-strings-hash-tables',
    nextLessonTitle: 'Hash Tables and Collision Resolution',
    nextLessonModuleId: 'dsa-module-3'
  }
};

// Write out Module 3 partially updated
writeModuleFile(path.join(__dirname, '..', 'src', 'data', 'dsa', 'dsa-module-3.ts'), m3.data, m3Lessons);
console.log('Updated Module 3 through Lesson 3. Current count:', Object.keys(m3Lessons).length);
