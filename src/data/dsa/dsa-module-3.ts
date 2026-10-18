import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const dsaModule3Data: DSAModuleData = {
  "id": "dsa-module-3",
  "number": 3,
  "title": "Strings and Hashing",
  "subtitle": "String Algorithms, Hash Tables & Pattern Matching",
  "description": "Dive into string manipulation and the power of hash-based data structures. Learn frequency counting, implement hash tables from scratch, master anagram and palindrome detection, and study advanced string matching algorithms including KMP and Rabin-Karp.",
  "icon": "Hash",
  "badge": "Strings & Hashing",
  "estimatedHours": 7,
  "topicsCount": 8,
  "lessons": [
    {
      "id": "dsa-strings-operations",
      "moduleId": "dsa-module-3",
      "title": "String Representation and Operations",
      "description": "How strings are stored, common operations, immutability, and ASCII/Unicode considerations.",
      "order": 1,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-strings-frequency",
      "moduleId": "dsa-module-3",
      "title": "Frequency Counting Techniques",
      "description": "Using arrays and hash maps to count character frequencies for pattern detection.",
      "order": 2,
      "readTimeMinutes": 18,
      "visualizerType": "hash-table",
      "difficulty": "Beginner"
    },
    {
      "id": "dsa-strings-hash-tables",
      "moduleId": "dsa-module-3",
      "title": "Hash Tables and Collision Resolution",
      "description": "Building a hash table from scratch: hash functions, separate chaining, and open addressing.",
      "order": 3,
      "readTimeMinutes": 28,
      "visualizerType": "hash-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-strings-hash-maps-sets",
      "moduleId": "dsa-module-3",
      "title": "Hash Maps and Hash Sets",
      "description": "Python's dict and set internals: O(1) average operations, load factor, and practical use patterns.",
      "order": 4,
      "readTimeMinutes": 22,
      "visualizerType": "hash-table",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-strings-anagram-palindrome",
      "moduleId": "dsa-module-3",
      "title": "Anagram and Palindrome Algorithms",
      "description": "Detecting anagrams with frequency maps, palindrome validation, and longest palindromic substring.",
      "order": 5,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-strings-matching",
      "moduleId": "dsa-module-3",
      "title": "String Matching — Naive and Boyer-Moore",
      "description": "The naive O(nm) approach and the Boyer-Moore heuristic for fast pattern searching.",
      "order": 6,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "dsa-strings-kmp",
      "moduleId": "dsa-module-3",
      "title": "KMP and Rabin-Karp Algorithms",
      "description": "Knuth-Morris-Pratt failure function for O(n+m) matching and Rabin-Karp rolling hash approach.",
      "order": 7,
      "readTimeMinutes": 32,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "dsa-strings-trie",
      "moduleId": "dsa-module-3",
      "title": "Trie Data Structure",
      "description": "Prefix tree for O(L) string insertion and search, autocomplete, and word dictionary problems.",
      "order": 8,
      "readTimeMinutes": 30,
      "visualizerType": "trie",
      "difficulty": "Advanced"
    }
  ]
};

export const dsaModule3Lessons: Record<string, DSALessonContent> = {
  "dsa-strings-hash-tables": {
    "id": "dsa-strings-hash-tables",
    "moduleId": "dsa-module-3",
    "title": "Hash Tables and Collision Resolution",
    "subtitle": "Hash Functions, Load Factors, Separate Chaining, and Open Addressing",
    "order": 3,
    "readTimeMinutes": 28,
    "difficulty": "Intermediate",
    "visualizerType": "hash-table",
    "objectives": [
      "Understand how hash functions map arbitrary keys into bounded array bucket indices.",
      "Analyze the properties of a good hash function: uniform distribution and deterministic output.",
      "Compare Separate Chaining (linked buckets) with Open Addressing (Linear and Quadratic Probing).",
      "Explain the significance of Load Factor α = n / m and dynamic table resizing.",
      "Implement an in-memory hash table from scratch with get, put, and remove operations."
    ],
    "prerequisites": [
      "Array indexing and modulo arithmetic",
      "Linked lists and pointer traversal",
      "Amortized time complexity analysis"
    ],
    "analogy": {
      "title": "The Hotel Mailbox Pigeonholes",
      "text": "Picture a vintage grand hotel with 100 labeled mail slots behind the reception desk. When mail arrives for a guest, the concierge runs their last name through a consistent calculation (e.g. sum of letter numbers mod 100) and places the letter into slot #42. When the guest asks for their mail, the concierge performs the exact same calculation, walks straight to slot #42, and retrieves it in O(1) time. But what happens if two guests both hash to slot #42? In Separate Chaining, slot #42 contains a binder clip with a chain of letters. In Open Addressing, the concierge slips the second letter into the very next empty slot #43.",
      "metaphor": "A hash table maps infinite key possibilities into finite index buckets via a deterministic hash function, using collision protocols when two keys map to the same bucket."
    },
    "problemSolved": {
      "title": "Achieving O(1) Key-Value Search Across Massive Datasets",
      "description": "Searching an unsorted array takes O(n) linear scan; searching a sorted array or BST takes O(log n) comparisons. Hash tables achieve O(1) average-case time for insertion, deletion, and lookup by calculating direct memory addresses mathematically from keys.",
      "keyPoints": [
        "Instant O(1) average lookup regardless of whether storing 10 or 10,000,000 items",
        "Powers dictionary and set primitives across modern programming languages",
        "Underpins database indexing, caching layers (Redis, Memcached), and cryptography"
      ]
    },
    "intuition": {
      "overview": "A hash table is an underlying array of capacity m coupled with a hash function h(k) that maps key k to an integer in range [0, m-1].",
      "steps": [
        {
          "step": 1,
          "title": "Hash Computation",
          "description": "Pass the key through a hash function: raw_hash = hash(key)."
        },
        {
          "step": 2,
          "title": "Index Compression",
          "description": "Compress hash into table bounds using modulo arithmetic: index = raw_hash % capacity."
        },
        {
          "step": 3,
          "title": "Collision Resolution",
          "description": "If bucket is already occupied by a different key, resolve using Separate Chaining (append to bucket linked list) or Open Addressing (probe next slot)."
        },
        {
          "step": 4,
          "title": "Dynamic Resizing",
          "description": "When load factor n / m exceeds threshold (typically 0.7), double capacity and rehash all keys to maintain O(1) performance."
        }
      ]
    },
    "formalDefinition": {
      "text": "A hash table implements an associative array abstract data type that maps keys to values using a hash function h: K -> {0, 1, ..., m - 1} such that expected lookup, insertion, and deletion times are O(1 + α) where α = n / m.",
      "latex": "h(k) = \\big(\\sum_{i=0}^{L-1} k[i] \\cdot p^i\\big) \\pmod{m}, \\quad \\alpha = \\frac{n}{m}"
    },
    "complexity": {
      "overview": "With a uniform hash function and load factor α <= 0.7, operations take O(1) average time.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(n)",
          "explanation": "Target key found in the first bucket inspected without collisions."
        },
        {
          "case": "Average",
          "time": "O(1)",
          "space": "O(n)",
          "explanation": "Uniform distribution keeps average bucket chain length under 2."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Adversarial collisions mapping all n keys into a single bucket, degenerating into linear linked list scan."
        }
      ],
      "spaceNote": "Over-allocating capacity maintains low load factor; resizing reallocates a 2x array and rehashes in O(n) amortized time."
    },
    "workedExample": {
      "title": "Inserting (\"apple\", 5), (\"banana\", 8), (\"cherry\", 12) with Capacity m = 5",
      "input": "Keys: \"apple\", \"banana\", \"cherry\", capacity = 5",
      "steps": [
        {
          "step": 1,
          "action": "Put (\"apple\", 5)",
          "state": "hash(\"apple\") % 5 = 2 -> Bucket 2: [(\"apple\", 5)]",
          "explanation": "Bucket 2 is empty; insert as first node."
        },
        {
          "step": 2,
          "action": "Put (\"banana\", 8)",
          "state": "hash(\"banana\") % 5 = 4 -> Bucket 4: [(\"banana\", 8)]",
          "explanation": "Bucket 4 is empty; insert node."
        },
        {
          "step": 3,
          "action": "Put (\"cherry\", 12) [Collision!]",
          "state": "hash(\"cherry\") % 5 = 2 -> Collision at Bucket 2!",
          "explanation": "Bucket 2 already holds (\"apple\", 5). In Separate Chaining, append (\"cherry\", 12) to Bucket 2 chain."
        },
        {
          "step": 4,
          "action": "Get (\"cherry\")",
          "state": "Hash to Bucket 2 -> traverse chain -> match \"cherry\" -> return 12",
          "explanation": "Linear scan of small bucket chain locates key in O(1) expected time."
        }
      ],
      "finalOutput": "Bucket 2: [(\"apple\", 5) -> (\"cherry\", 12)], Bucket 4: [(\"banana\", 8)]"
    },
    "visualExplanation": {
      "title": "Interactive Bucket Array & Chain Visualizer",
      "description": "The visualizer illustrates an array of buckets, showing how key hashes map to slots and linked list chains grow on collisions.",
      "features": [
        "Bucket indices [0..m-1] with real-time hash arithmetic.",
        "Collision visual highlighting linked list node chaining.",
        "Load factor meter indicating when dynamic resizing triggers."
      ]
    },
    "pseudocode": {
      "title": "Separate Chaining Hash Table",
      "code": "class HashTable:\n    constructor(capacity):\n        this.capacity = capacity\n        this.buckets = array of size capacity, each containing empty list\n        \n    function put(key, value):\n        idx = hash(key) % capacity\n        for each (k, v) in buckets[idx]:\n            if k == key:\n                update v = value\n                return\n        buckets[idx].append((key, value))\n        \n    function get(key):\n        idx = hash(key) % capacity\n        for each (k, v) in buckets[idx]:\n            if k == key:\n                return v\n        raise KeyError"
    },
    "pythonCode": {
      "title": "Hash Table with Separate Chaining in Python",
      "code": "class HashTable:\n    def __init__(self, capacity: int = 16):\n        self.capacity = capacity\n        self.size = 0\n        self.buckets = [[] for _ in range(capacity)]\n\n    def _hash(self, key) -> int:\n        return hash(key) % self.capacity\n\n    def put(self, key, value) -> None:\n        idx = self._hash(key)\n        for i, (k, v) in enumerate(self.buckets[idx]):\n            if k == key:\n                self.buckets[idx][i] = (key, value)\n                return\n        self.buckets[idx].append((key, value))\n        self.size += 1\n\n    def get(self, key):\n        idx = self._hash(key)\n        for k, v in self.buckets[idx]:\n            if k == key:\n                return v\n        raise KeyError(f\"Key {key} not found\")\n\n    def remove(self, key) -> None:\n        idx = self._hash(key)\n        for i, (k, v) in enumerate(self.buckets[idx]):\n            if k == key:\n                del self.buckets[idx][i]\n                self.size -= 1\n                return\n        raise KeyError(f\"Key {key} not found\")",
      "explanation": "Each bucket is a Python list storing (key, value) tuples. If a key already exists, its value is overwritten; otherwise, a new tuple is appended."
    },
    "runnableCode": {
      "code": "class SimpleHashTable:\n    def __init__(self, size=5):\n        self.size = size\n        self.table = [[] for _ in range(size)]\n    \n    def put(self, key, val):\n        slot = hash(key) % self.size\n        for i, (k, v) in enumerate(self.table[slot]):\n            if k == key:\n                self.table[slot][i] = (key, val)\n                return\n        self.table[slot].append((key, val))\n        \n    def get(self, key):\n        slot = hash(key) % self.size\n        for k, v in self.table[slot]:\n            if k == key:\n                return v\n        return None\n\nht = SimpleHashTable()\nht.put(\"Alice\", \"95%\")\nht.put(\"Bob\", \"88%\")\nht.put(\"Charlie\", \"92%\")\n\nprint(\"Alice grade:\", ht.get(\"Alice\"))\nprint(\"Bob grade:  \", ht.get(\"Bob\"))\nprint(\"Table state:\", ht.table)",
      "expectedOutput": "Alice grade: 95%\nBob grade:   88%\nTable state: [[], [('Alice', '95%')], [], [('Bob', '88%')], [('Charlie', '92%')]]"
    },
    "lineByLineExplanation": [
      {
        "line": "1-4",
        "lines": "1-4",
        "code": "self.buckets = [[] for _ in range(capacity)]",
        "codeSnippet": "self.buckets = [[] for _ in range(capacity)]",
        "explanation": "Allocates capacity empty bucket lists. Must use a comprehension so each bucket is an independent list object."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "hash(key) % self.capacity",
        "codeSnippet": "hash(key) % self.capacity",
        "explanation": "Computes Python's internal hash value and reduces it to a valid bucket index via modulo."
      },
      {
        "line": "9-15",
        "lines": "9-15",
        "code": "self.buckets[idx].append((key, value))",
        "codeSnippet": "self.buckets[idx].append((key, value))",
        "explanation": "Iterates through the bucket chain to update existing keys or appends a new key-value pair."
      }
    ],
    "edgeCases": [
      {
        "case": "Unhashable key types (e.g. lists)",
        "handling": "Python lists are mutable and do not implement __hash__; attempting to hash them raises TypeError.",
        "example": "ht.put([1, 2], \"val\") raises TypeError: unhashable type: \"list\"."
      },
      {
        "case": "High load factor without resizing",
        "handling": "If capacity remains fixed while n grows to 10,000, average bucket length becomes 10,000/16 ~ 625, degrading to O(n) linear search.",
        "example": "Always implement dynamic resizing when load factor exceeds 0.75."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using mutable objects as hash keys",
        "solution": "If a key is mutated after insertion, its hash value changes, making it permanently unfindable at its original bucket slot."
      },
      {
        "mistake": "Failing to rehash when resizing",
        "solution": "When doubling capacity, index = hash % new_capacity changes for almost all keys. You must re-insert every item into the new table."
      }
    ],
    "applications": [
      {
        "industry": "Web Caching",
        "application": "Redis / Memcached Key-Value Stores",
        "benefit": "In-memory hash tables provide sub-millisecond retrieval of cached web sessions and API responses."
      },
      {
        "industry": "Data Engineering",
        "application": "Hash Joins in SQL Databases",
        "benefit": "Building a hash table on the smaller table allows joining two million-row tables in O(n + m) time."
      },
      {
        "industry": "Compilers",
        "application": "Symbol Tables",
        "benefit": "Compilers track identifier names, variable scopes, and types in nested hash tables."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-hash-q1",
        "question": "What is the Load Factor (α) of a hash table, and what is its ideal threshold?",
        "hint": "Ratio of stored items to available buckets.",
        "answer": "Load factor is α = n / m, where n is the number of stored elements and m is the number of bucket slots. In separate chaining, keeping α <= 0.7 to 0.75 guarantees average bucket length remains small (~1), preserving O(1) lookup."
      },
      {
        "id": "dsa-hash-q2",
        "question": "What is the difference between Separate Chaining and Open Addressing for collision resolution?",
        "hint": "Where do collided items get stored?",
        "answer": "In Separate Chaining, each bucket slot holds a linked list (or dynamic array) of collided entries. In Open Addressing, all entries are stored directly in the primary array; on collision, the algorithm probes alternative slots (linear probing, quadratic probing, or double hashing) until finding an empty slot."
      },
      {
        "id": "dsa-hash-q3",
        "question": "Why must hash table keys be immutable in Python?",
        "hint": "What happens to hash(key) if the object changes?",
        "answer": "If a key were mutable and its contents changed, its hash value would change. The hash table would look for the key in a different bucket and fail to find it, causing data corruption and phantom entries."
      }
    ],
    "quiz": [
      {
        "id": "dsa-hash-quiz-1",
        "question": "What is the average time complexity of searching for a key in a well-distributed hash table?",
        "options": [
          "O(n)",
          "O(log n)",
          "O(1)",
          "O(n log n)"
        ],
        "correctIndex": 2,
        "explanation": "A well-designed hash table with low load factor locates the target bucket in O(1) time and inspects an average of 1-2 elements."
      },
      {
        "id": "dsa-hash-quiz-2",
        "question": "What happens when the load factor of a hash table exceeds its designated threshold?",
        "options": [
          "The table throws an OutOfMemoryError and crashes",
          "The table allocates a larger array (usually 2x) and rehashes all elements",
          "The table deletes the oldest entries automatically",
          "The table converts itself into a binary search tree"
        ],
        "correctIndex": 1,
        "explanation": "When the load factor exceeds the threshold (e.g. 0.7), the table doubles its capacity and re-inserts every existing element to restore low load factor."
      },
      {
        "id": "dsa-hash-quiz-3",
        "question": "Which of the following data types CANNOT be used as a dictionary key in Python?",
        "options": [
          "tuple",
          "int",
          "list",
          "str"
        ],
        "correctIndex": 2,
        "explanation": "Python lists are mutable and do not implement __hash__; passing a list as a dictionary key raises TypeError: unhashable type: \"list\"."
      }
    ],
    "codingChallenge": {
      "title": "Design a Simplified HashMap (LeetCode 706)",
      "problem": "Design a HashMap without using built-in hash map libraries. Implement MyHashMap with put(key, value), get(key) (returns value or -1 if not found), and remove(key). Keys and values are non-negative integers.",
      "hints": [
        "Use an array of buckets, where each bucket is a list of (key, value) pairs.",
        "Use key % capacity as your hashing function.",
        "In get(), loop through the bucket: return the matching value if found, or -1 if the loop completes without match."
      ],
      "starterCode": "class MyHashMap:\n    def __init__(self):\n        # Your code here\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass\n\n    def get(self, key: int) -> int:\n        return -1\n\n    def remove(self, key: int) -> None:\n        pass\n\n# Test cases:\nh = MyHashMap()\nh.put(1, 100)\nh.put(2, 200)\nprint(h.get(1))  # Expected: 100\nprint(h.get(3))  # Expected: -1\nh.remove(1)\nprint(h.get(1))  # Expected: -1",
      "solution": "class MyHashMap:\n    def __init__(self):\n        self.capacity = 1000\n        self.buckets = [[] for _ in range(self.capacity)]\n\n    def _hash(self, key: int) -> int:\n        return key % self.capacity\n\n    def put(self, key: int, value: int) -> None:\n        idx = self._hash(key)\n        for i, (k, v) in enumerate(self.buckets[idx]):\n            if k == key:\n                self.buckets[idx][i] = (key, value)\n                return\n        self.buckets[idx].append((key, value))\n\n    def get(self, key: int) -> int:\n        idx = self._hash(key)\n        for k, v in self.buckets[idx]:\n            if k == key:\n                return v\n        return -1\n\n    def remove(self, key: int) -> None:\n        idx = self._hash(key)\n        for i, (k, v) in enumerate(self.buckets[idx]):\n            if k == key:\n                del self.buckets[idx][i]\n                return\n\n# Test cases:\nh = MyHashMap()\nh.put(1, 100)\nh.put(2, 200)\nprint(h.get(1))  # 100\nprint(h.get(3))  # -1\nh.remove(1)\nprint(h.get(1))  # -1"
    },
    "summary": {
      "keyTakeaways": [
        "Hash tables map keys to bucket indices using a hash function and modulo compression.",
        "Average-case time complexity is O(1) for insert, search, and delete.",
        "Separate Chaining chains collided items in linked lists per bucket.",
        "Keys must be immutable to guarantee consistent hash values over time."
      ],
      "nextLessonId": "dsa-strings-hash-maps-sets",
      "nextLessonTitle": "Hash Maps and Hash Sets",
      "nextLessonModuleId": "dsa-module-3"
    },
    "lineByLine": [
      {
        "line": "1-4",
        "lines": "1-4",
        "code": "self.buckets = [[] for _ in range(capacity)]",
        "codeSnippet": "self.buckets = [[] for _ in range(capacity)]",
        "explanation": "Allocates capacity empty bucket lists. Must use a comprehension so each bucket is an independent list object."
      },
      {
        "line": "6-7",
        "lines": "6-7",
        "code": "hash(key) % self.capacity",
        "codeSnippet": "hash(key) % self.capacity",
        "explanation": "Computes Python's internal hash value and reduces it to a valid bucket index via modulo."
      },
      {
        "line": "9-15",
        "lines": "9-15",
        "code": "self.buckets[idx].append((key, value))",
        "codeSnippet": "self.buckets[idx].append((key, value))",
        "explanation": "Iterates through the bucket chain to update existing keys or appends a new key-value pair."
      }
    ]
  },
  "dsa-strings-operations": {
    "id": "dsa-strings-operations",
    "moduleId": "dsa-module-3",
    "title": "String Representation and Operations",
    "subtitle": "ASCII, Unicode, UTF-8 Encoding, Immutability & Memory Internals",
    "order": 1,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Understand character encodings: ASCII, Unicode code points, and variable-width UTF-8.",
      "Explain string immutability in Python and Java and its architectural benefits.",
      "Analyze the O(n^2) cost of naive string concatenation in loops.",
      "Use join() and bytearrays for linear O(n) string construction."
    ],
    "prerequisites": [
      "Array Operations and Memory Layout",
      "Binary numbers and byte representation"
    ],
    "analogy": {
      "title": "The Carved Stone Tablet",
      "text": "In Python, strings are like carved stone tablets: once etched, you cannot erase or modify a single glyph in-place. If you want to change one letter of a 1,000-word essay on a tablet, the stonemason cannot simply chisel over letter #400; they must quarry a brand-new slab of stone and re-carve all 1,000 words from start to finish. Repeatedly adding one character in a loop is repeatedly carving new slabs of size 1, 2, 3... n, causing an O(n^2) explosion of wasted stone.",
      "metaphor": "String immutability forces full reallocation on modification; use list buffers to batch changes."
    },
    "problemSolved": {
      "title": "Preventing Accidental O(n^2) String Copying",
      "description": "Because strings are immutable, naive patterns like `s += char` inside a loop copy the entire existing string at every iteration, turning a simple linear operation into quadratic O(n^2) runtime. Understanding string representation enables linear-time string processing.",
      "keyPoints": [
        "Explains UTF-8 variable length (1 to 4 bytes per character)",
        "Reveals why strings are immutable (thread safety, hash caching, interned literals)",
        "Demonstrates O(n) construction using `\"\".join(buffer)`"
      ]
    },
    "intuition": {
      "overview": "Strings are sequential arrays of bytes or code points. Immutability guarantees that their hash value never changes, allowing strings to serve as secure dictionary keys.",
      "steps": [
        {
          "step": 1,
          "title": "Code Point Mapping",
          "description": "Each character maps to an integer code point (e.g. ord(\"A\") == 65)."
        },
        {
          "step": 2,
          "title": "Byte Serialization",
          "description": "UTF-8 encodes ASCII in 1 byte, European letters in 2 bytes, Asian scripts in 3 bytes, emojis in 4 bytes."
        },
        {
          "step": 3,
          "title": "Buffer Construction",
          "description": "Accumulate characters into a mutable list, then convert to string once with `\"\".join()`."
        }
      ]
    },
    "formalDefinition": {
      "text": "A string S of length n over alphabet Σ is an immutable sequence of characters S[0..n-1]. In Python, CPython implements strings as compact ASCII/Latin1/UCS-2/UCS-4 arrays depending on the maximum character code point present (PEP 393).",
      "latex": "S = \\langle c_0, c_1, \\dots, c_{n-1} \\rangle, \\quad c_i \\in \\Sigma"
    },
    "complexity": {
      "overview": "Indexing/Length: O(1). Concatenation: O(n + m). Slicing: O(k). Search: O(n).",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Direct indexing by character position."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "Linear scan for substring or formatting."
        },
        {
          "case": "Worst",
          "time": "O(n^2)",
          "space": "O(n^2)",
          "explanation": "Repeated += concatenation in a loop of size n."
        }
      ],
      "spaceNote": "String interning caches small string literals in a global table to save memory."
    },
    "workedExample": {
      "title": "Benchmarking String Concatenation vs. List Join",
      "input": "Construct a string of 10,000 numbers.",
      "steps": [
        {
          "step": 1,
          "action": "Naive `+=`",
          "state": "10,000 allocations",
          "explanation": "Creates 10,000 intermediate string objects, copying 1 + 2 + ... + 10000 = ~50 million bytes."
        },
        {
          "step": 2,
          "action": "List Append + Join",
          "state": "1 list + 1 string allocation",
          "explanation": "List append is O(1) amortized. Final join measures total length and allocates exact buffer once."
        }
      ],
      "finalOutput": "Join completes in 0.002s vs. Naive += taking 0.15s (75x speedup)."
    },
    "visualExplanation": {
      "title": "UTF-8 Byte Encodings in Memory",
      "description": "ASCII characters occupy 1 byte starting with bit 0. Multibyte characters use leading byte prefixes 110x, 1110x, 11110x followed by continuation bytes 10xx to encode all human languages and emoji symbols.",
      "features": [
        "1-byte ASCII compatibility",
        "Multi-byte Unicode expansion",
        "Immutable contiguous byte buffer"
      ]
    },
    "pseudocode": {
      "title": "Efficient String Builder",
      "code": "def build_string(tokens):\n    buffer = []\n    for token in tokens:\n        buffer.append(token) # O(1) amortized\n    return \"\".join(buffer)   # O(total_length) single pass"
    },
    "pythonCode": {
      "title": "String Code Points and Memory Size in Python",
      "code": "import sys\n\ns_ascii = \"hello\"\ns_emoji = \"hello😊\"\n\nprint(f\"ASCII '{s_ascii}': length={len(s_ascii)}, bytes={sys.getsizeof(s_ascii)}\")\nprint(f\"Emoji '{s_emoji}': length={len(s_emoji)}, bytes={sys.getsizeof(s_emoji)}\")\nprint(f\"Code point of 'A': {ord('A')}, Character of 65: {chr(65)}\")",
      "explanation": "Demonstrates Python PEP 393 flexible string representation where string memory widens to 4 bytes per char when an emoji is present."
    },
    "runnableCode": {
      "code": "words = [\"Data\", \"Structures\", \"and\", \"Algorithms\"]\n# Idiomatic fast string construction\nsentence = \" \".join(words)\nprint(\"Joined sentence:\", sentence)\n# String reversal in Python (O(n) slicing)\nprint(\"Reversed:\", sentence[::-1])",
      "expectedOutput": "Joined sentence: Data Structures and Algorithms\nReversed: smhtiroglA dna serutcurtS ataD"
    },
    "lineByLineExplanation": [
      {
        "line": "3",
        "lines": "3",
        "code": "sentence = \" \".join(words)",
        "codeSnippet": "sentence = \" \".join(words)",
        "explanation": "Measures total required length, allocates contiguous memory once, and copies all words in O(n)."
      },
      {
        "line": "6",
        "lines": "6",
        "code": "sentence[::-1]",
        "codeSnippet": "sentence[::-1]",
        "explanation": "Creates a reversed copy using slice notation in O(n) time."
      }
    ],
    "edgeCases": [
      {
        "case": "Empty String",
        "handling": "len(\"\") == 0, boolean truthiness is False.",
        "example": "bool(\"\") -> False"
      },
      {
        "case": "Combining Unicode Characters (Accents)",
        "handling": "Len count may count accent as separate character unless normalized with unicodedata.normalize.",
        "example": "e + combining acute"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `str += char` in loops.",
        "solution": "Accumulate in a list and call `\"\".join(list)`."
      },
      {
        "mistake": "Assuming len(s) is always equal to the number of bytes.",
        "solution": "In UTF-8, non-ASCII characters take 2-4 bytes, so byte length >= character length."
      }
    ],
    "applications": [
      {
        "industry": "Web Security",
        "application": "Constant-Time String Comparison",
        "benefit": "Prevents timing attacks when comparing cryptographic authentication tokens and HMACs."
      },
      {
        "industry": "Data Engineering",
        "application": "Text Tokenization & Parsing",
        "benefit": "Processes gigabytes of JSON/CSV strings by slicing views without duplicating heap buffers."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-3-1-q1",
        "question": "Why are strings immutable in Python, Java, and C#?",
        "hint": "Consider dictionary keys, hashing, and thread safety.",
        "answer": "Immutability guarantees that the hash code never changes once computed (safe for dict keys), enables memory sharing (interning), and ensures thread safety without locks."
      },
      {
        "id": "dsa-3-1-q2",
        "question": "What is the time complexity of s[i:j] slicing a string of length n?",
        "hint": "Does it create a copy?",
        "answer": "O(j - i) = O(k). In Python, string slicing creates a new independent string containing a copy of the k characters."
      },
      {
        "id": "dsa-3-1-q3",
        "question": "How many bytes does the emoji \"🔥\" take in UTF-8 encoding?",
        "hint": "Code point is U+1F525 (> U+FFFF).",
        "answer": "4 bytes. Code points between U+10000 and U+10FFFF require 4 bytes in UTF-8."
      }
    ],
    "quiz": [
      {
        "id": "dsa-3-1-quiz-1",
        "question": "What is the time complexity of repeatedly doing `s += char` inside a loop of n iterations?",
        "options": [
          "O(n^2)",
          "O(n)",
          "O(n log n)",
          "O(1)"
        ],
        "correctIndex": 0,
        "explanation": "Because strings are immutable, each concatenation allocates a new string and copies all previous characters, yielding 1 + 2 + ... + n = O(n^2) operations."
      },
      {
        "id": "dsa-3-1-quiz-2",
        "question": "What is the most efficient way to build a string from 100,000 fragments in Python?",
        "options": [
          "Collect fragments in a list and use \"\".join(list)",
          "Use s = s + fragment in a loop",
          "Use recursion",
          "Write to a file and read it back"
        ],
        "correctIndex": 0,
        "explanation": "Appending to a list is O(1) amortized, and \"\".join() allocates memory for the final string exactly once, executing in linear O(n) total time."
      },
      {
        "id": "dsa-3-1-quiz-3",
        "question": "What Python built-in function returns the Unicode code point integer of a character?",
        "options": [
          "ord()",
          "chr()",
          "bin()",
          "hex()"
        ],
        "correctIndex": 0,
        "explanation": "ord(\"A\") returns 65. The inverse function chr(65) returns \"A\"."
      }
    ],
    "codingChallenge": {
      "title": "Defanging an IP Address Efficiently",
      "problem": "Given a valid (IPv4) IP address, return a defanged version of that IP address. A defanged IP address replaces every period \".\" with \"[.]\". Construct your solution in linear O(n) time.",
      "hints": [
        "Iterate through the string or use str.replace().",
        "If building manually, append \"[.]\" whenever char is \".\" otherwise append char."
      ],
      "starterCode": "def defang_i_paddr(address):\n    # Construct in O(n) using list comprehension or join\n    return address.replace(\".\", \"[.]\")\n\nprint(defang_i_paddr(\"1.1.1.1\")) # Expected: \"1[.]1[.]1[.]1\"\nprint(defang_i_paddr(\"255.100.50.0\")) # Expected: \"255[.]100[.]50[.]0\"",
      "solution": "def defang_i_paddr(address):\n    return address.replace(\".\", \"[.]\")\n\nprint(defang_i_paddr(\"1.1.1.1\"))"
    },
    "summary": {
      "keyTakeaways": [
        "Strings are immutable sequences of Unicode code points.",
        "Naive concatenation in loops causes severe O(n^2) performance degradation.",
        "Always use `\"\".join()` to construct strings from collections in O(n) time.",
        "UTF-8 uses 1 to 4 variable bytes per character."
      ],
      "nextLessonId": "dsa-strings-frequency",
      "nextLessonTitle": "Frequency Counting Techniques",
      "nextLessonModuleId": "dsa-module-3"
    },
    "lineByLine": [
      {
        "line": "3",
        "lines": "3",
        "code": "sentence = \" \".join(words)",
        "codeSnippet": "sentence = \" \".join(words)",
        "explanation": "Measures total required length, allocates contiguous memory once, and copies all words in O(n)."
      },
      {
        "line": "6",
        "lines": "6",
        "code": "sentence[::-1]",
        "codeSnippet": "sentence[::-1]",
        "explanation": "Creates a reversed copy using slice notation in O(n) time."
      }
    ]
  },
  "dsa-strings-frequency": {
    "id": "dsa-strings-frequency",
    "moduleId": "dsa-module-3",
    "title": "Frequency Counting Techniques",
    "subtitle": "Direct Array Bins, Hash Maps & Character Histograms",
    "order": 2,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "hash-table",
    "objectives": [
      "Use fixed-size array histograms (26 bins for lowercase English) for zero-allocation counting.",
      "Implement frequency counting with hash tables and collections.Counter.",
      "Solve First Unique Character in a String and Valid Anagram in O(n) time.",
      "Compare array direct indexing against hash map hashing overhead."
    ],
    "prerequisites": [
      "String Representation and Operations",
      "Array Operations and Memory Layout"
    ],
    "analogy": {
      "title": "The Voting Ballot Sorting Trays",
      "text": "During an election with 26 candidates, tallying votes by writing each candidate name on a single whiteboard over and over is chaotic. Instead, election officials set up 26 wooden trays labeled A through Z. As each ballot is read, the official drops a marble into that candidate’s tray in 1 second. At the end, inspecting the height of the marbles gives the exact vote counts without searching.",
      "metaphor": "A direct array frequency table uses character codes as tray indices for instant O(1) tallying."
    },
    "problemSolved": {
      "title": "Summarizing String Composition in O(n) Time",
      "description": "Answering questions like \"do two strings share the same characters?\" or \"what is the first non-repeating character?\" naively takes O(n^2) using nested counts. Frequency counting reduces this to a single O(n) scan by decoupling counting from inspection.",
      "keyPoints": [
        "Converts quadratic character searches into linear passes",
        "Fixed array of size 26 or 256 uses strictly O(1) space",
        "Underpins anagrams, palindromes, and Huffman frequency tables"
      ]
    },
    "intuition": {
      "overview": "Map each character c to an index: index = ord(c) - ord(\"a\"). Increment freq[index]++. A single pass tallies all frequencies.",
      "steps": [
        {
          "step": 1,
          "title": "Allocate Table",
          "description": "Create array of size 26 initialized to 0."
        },
        {
          "step": 2,
          "title": "Tally Pass",
          "description": "For each character c in string, freq[ord(c) - ord(\"a\")] += 1."
        },
        {
          "step": 3,
          "title": "Query Pass",
          "description": "Inspect frequencies to answer queries in O(1) per character."
        }
      ]
    },
    "formalDefinition": {
      "text": "A frequency table H for string S over alphabet Σ is a mapping H: Σ -> N where H(c) = |{ i \\in [0, |S|-1] \\mid S[i] = c }|. For bounded alphabets (|Σ| = O(1)), H is stored in a direct-address array of size |Σ|.",
      "latex": "H[c] = \\sum_{i=0}^{n-1} \\mathbb{I}(S[i] == c), \\quad \\text{Space} = \\mathcal{O}(|\\Sigma|) = \\mathcal{O}(1)"
    },
    "complexity": {
      "overview": "Time: O(n) to populate table of length n. Space: O(|Σ|) = O(1) for fixed alphabet like ASCII/English.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Single pass across all characters."
        },
        {
          "case": "Average",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Linear scan with direct array writes."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "Fixed alphabet bounded by 26 or 256 elements."
        }
      ],
      "spaceNote": "For general Unicode, a hash map requires O(k) space where k is the number of distinct characters."
    },
    "workedExample": {
      "title": "Finding First Unique Character in \"leetcode\"",
      "input": "s = \"leetcode\"",
      "steps": [
        {
          "step": 1,
          "action": "Populate Frequency Map",
          "state": "l:1, e:3, t:1, c:1, o:1, d:1",
          "explanation": "Count all occurrences in a first pass of O(n)."
        },
        {
          "step": 2,
          "action": "Inspect in Original Order",
          "state": "Check s[0] = \"l\" -> count is 1!",
          "explanation": "Character \"l\" has frequency 1 and is at index 0. Return index 0 immediately."
        }
      ],
      "finalOutput": "First unique character is \"l\" at index 0."
    },
    "visualExplanation": {
      "title": "The 26-Bin Frequency Histogram",
      "description": "An array of 26 slots labeled a through z. As the string \"banana\" is read: b gets 1, a gets 3, n gets 2. Comparing with \"nabana\" yields identical bar heights, proving they are anagrams.",
      "features": [
        "ord(c) - ord(\"a\") indexing",
        "Direct integer increments",
        "Constant memory footprint"
      ]
    },
    "pseudocode": {
      "title": "Direct Frequency Counter",
      "code": "freq = [0] * 26\nfor char in s:\n    freq[ord(char) - ord('a')] += 1\n\n# Check anagrams\nfor char in t:\n    freq[ord(char) - ord('a')] -= 1\nreturn all(count == 0 for count in freq)"
    },
    "pythonCode": {
      "title": "First Unique Character in Python",
      "code": "from collections import Counter\n\ndef first_uniq_char(s):\n    # Method 1: Using collections.Counter\n    counts = Counter(s)\n    for i, ch in enumerate(s):\n        if counts[ch] == 1:\n            return i\n    return -1\n\n# Method 2: Using fixed-size 26 array\ndef first_uniq_char_array(s):\n    freq = [0] * 26\n    for ch in s:\n        freq[ord(ch) - ord('a')] += 1\n    for i, ch in enumerate(s):\n        if freq[ord(ch) - ord('a')] == 1:\n            return i\n    return -1\n\nprint(\"First unique in 'loveleetcode':\", first_uniq_char(\"loveleetcode\")) # Expected: 2 ('v')",
      "explanation": "Demonstrates both Pythonic Counter and low-level array-bin counting."
    },
    "runnableCode": {
      "code": "def is_anagram(s, t):\n    if len(s) != len(t):\n        return False\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for ch in t:\n        if ch not in counts or counts[ch] == 0:\n            return False\n        counts[ch] -= 1\n    return True\n\nprint(\"anagram vs nagaram:\", is_anagram(\"anagram\", \"nagaram\"))\nprint(\"rat vs car:\", is_anagram(\"rat\", \"car\"))",
      "expectedOutput": "anagram vs nagaram: True\nrat vs car: False"
    },
    "lineByLineExplanation": [
      {
        "line": "4-6",
        "lines": "4-6",
        "code": "for ch in s: counts[ch] = counts.get(ch, 0) + 1",
        "codeSnippet": "for ch in s: counts[ch] = counts.get(ch, 0) + 1",
        "explanation": "Increments character tally in O(1) average time."
      },
      {
        "line": "7-10",
        "lines": "7-10",
        "code": "for ch in t:\n    if ch not in counts or counts[ch] == 0: return False\n    counts[ch] -= 1",
        "codeSnippet": "for ch in t:\n    if ch not in counts or counts[ch] == 0: return False\n    counts[ch] -= 1",
        "explanation": "Decrements character tally and verifies matching frequency balance."
      }
    ],
    "edgeCases": [
      {
        "case": "Single character string",
        "handling": "Frequency is 1; returned immediately as unique.",
        "example": "\"z\""
      },
      {
        "case": "All characters identical",
        "handling": "No unique character; returns -1.",
        "example": "\"eeeeee\""
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `s.count(ch)` inside a loop over s.",
        "solution": "`s.count()` scans the entire string in O(n). Calling it inside a loop results in disastrous O(n^2) runtime."
      },
      {
        "mistake": "Negative indexing in array bins when input has uppercase characters.",
        "solution": "Normalize input with `.lower()` or size array to 128/256 for full ASCII."
      }
    ],
    "applications": [
      {
        "industry": "Natural Language Processing",
        "application": "Bag-of-Words & TF-IDF",
        "benefit": "Builds document frequency vectors used in search ranking and text classification."
      },
      {
        "industry": "Data Compression",
        "application": "Huffman Coding Tree Construction",
        "benefit": "Generates optimal prefix codes by assigning shortest bit sequences to highest-frequency characters."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-3-2-q1",
        "question": "When is a fixed array of size 26 preferred over a Python dict for frequency counting?",
        "hint": "Consider hashing overhead and memory allocation.",
        "answer": "When the alphabet is strictly lowercase English. An array avoids hash function computation, dynamic table resizing, and pointer overhead, providing faster raw CPU performance and O(1) space."
      },
      {
        "id": "dsa-3-2-q2",
        "question": "How can you check if any permutation of a string can form a palindrome using frequency counting?",
        "hint": "How many characters can have an odd count in a palindrome?",
        "answer": "A palindrome can have at most ONE character with an odd frequency (which sits in the exact center). If count of odd-frequency characters <= 1, a palindrome permutation exists."
      },
      {
        "id": "dsa-3-2-q3",
        "question": "What is the time complexity of comparing two collections.Counter objects for equality?",
        "hint": "Depends on the number of unique keys.",
        "answer": "O(|Σ|) where |Σ| is the number of distinct keys in the alphabet."
      }
    ],
    "quiz": [
      {
        "id": "dsa-3-2-quiz-1",
        "question": "What is the runtime of checking if two strings of length n are anagrams using frequency counting?",
        "options": [
          "O(n)",
          "O(n^2)",
          "O(n log n)",
          "O(1)"
        ],
        "correctIndex": 0,
        "explanation": "Populating the frequency table takes O(n), and decrementing with the second string takes O(n), totaling O(n) linear time."
      },
      {
        "id": "dsa-3-2-quiz-2",
        "question": "Why is `s.count(ch)` inside `for ch in s:` considered an anti-pattern in algorithm design?",
        "options": [
          "It causes O(n^2) quadratic running time because count() scans the string on every iteration",
          "It modifies the string in-place",
          "It only works on numbers",
          "It crashes on vowels"
        ],
        "correctIndex": 0,
        "explanation": "`s.count()` executes an O(n) linear search every time it is called. Executing it n times produces O(n * n) = O(n^2) complexity."
      },
      {
        "id": "dsa-3-2-quiz-3",
        "question": "For an alphabet of 26 lowercase English letters, what is the space complexity of an array frequency table?",
        "options": [
          "O(1) constant space",
          "O(n) linear space",
          "O(n^2) space",
          "O(log n) space"
        ],
        "correctIndex": 0,
        "explanation": "The array always holds exactly 26 integer slots regardless of how long the input string n is, which is strictly O(1) auxiliary space."
      }
    ],
    "codingChallenge": {
      "title": "Valid Anagram",
      "problem": "Given two strings s and t, return True if t is an anagram of s, and False otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
      "hints": [
        "If string lengths differ, they cannot be anagrams: return False immediately.",
        "Use a single array of size 26. Increment for s, decrement for t.",
        "All 26 slots must equal 0 at the end."
      ],
      "starterCode": "def is_anagram(s, t):\n    if len(s) != len(t):\n        return False\n    freq = [0] * 26\n    for i in range(len(s)):\n        freq[ord(s[i]) - ord('a')] += 1\n        freq[ord(t[i]) - ord('a')] -= 1\n    return all(x == 0 for x in freq)\n\nprint(is_anagram(\"anagram\", \"nagaram\")) # Expected: True\nprint(is_anagram(\"rat\", \"car\"))         # Expected: False",
      "solution": "def is_anagram(s, t):\n    if len(s) != len(t):\n        return False\n    freq = [0] * 26\n    for i in range(len(s)):\n        freq[ord(s[i]) - ord('a')] += 1\n        freq[ord(t[i]) - ord('a')] -= 1\n    return all(x == 0 for x in freq)\n\nprint(is_anagram(\"anagram\", \"nagaram\"))"
    },
    "summary": {
      "keyTakeaways": [
        "Frequency counting replaces O(n^2) nested loops with a linear O(n) pass.",
        "Direct array bins (size 26 or 256) provide faster execution than hash tables.",
        "A valid palindrome permutation has at most one character with an odd frequency.",
        "Never call `str.count()` inside an outer loop over the same string."
      ],
      "nextLessonId": "dsa-strings-hash-tables",
      "nextLessonTitle": "Hash Tables and Collision Resolution",
      "nextLessonModuleId": "dsa-module-3"
    },
    "lineByLine": [
      {
        "line": "4-6",
        "lines": "4-6",
        "code": "for ch in s: counts[ch] = counts.get(ch, 0) + 1",
        "codeSnippet": "for ch in s: counts[ch] = counts.get(ch, 0) + 1",
        "explanation": "Increments character tally in O(1) average time."
      },
      {
        "line": "7-10",
        "lines": "7-10",
        "code": "for ch in t:\n    if ch not in counts or counts[ch] == 0: return False\n    counts[ch] -= 1",
        "codeSnippet": "for ch in t:\n    if ch not in counts or counts[ch] == 0: return False\n    counts[ch] -= 1",
        "explanation": "Decrements character tally and verifies matching frequency balance."
      }
    ]
  },
  "dsa-strings-hash-maps-sets": {
    "id": "dsa-strings-hash-maps-sets",
    "moduleId": "dsa-module-3",
    "title": "Hash Maps and Hash Sets",
    "subtitle": "CPython Compact Dict Architecture, Open Addressing & Practical Patterns",
    "order": 4,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "hash-table",
    "objectives": [
      "Explain the internals of CPython compact dicts (split indices and entries arrays).",
      "Understand pseudo-random probing perturbation: j = ((5*j) + 1 + perturb) mod size.",
      "Differentiate between set theory operations (union, intersection, difference) and complexities.",
      "Identify requirements for key hashability (__hash__ and __eq__ invariants)."
    ],
    "prerequisites": [
      "Hash Tables and Collision Resolution",
      "Frequency Counting Techniques"
    ],
    "analogy": {
      "title": "The Compact Coat Check System",
      "text": "A traditional coat check room has 1,000 giant coat racks, leaving 700 empty slots that waste huge floor space. Modern automated venues use a two-tier system: a small dense table of ticket numbers (the indices table) pointing into a tightly packed conveyor belt where jackets sit side-by-side without any empty gaps (the entries table). Python 3.6 adopted this compact dictionary layout, slashing memory usage by 25% while preserving insertion order.",
      "metaphor": "Modern hash maps split sparse hash buckets from dense insertion-ordered data arrays."
    },
    "problemSolved": {
      "title": "High-Performance Key-Value Associative Storage",
      "description": "Without hash maps, associating metadata with dynamic keys requires searching associative lists in O(n) time. Python dicts and sets provide average O(1) insertion, deletion, and lookup with minimal memory overhead.",
      "keyPoints": [
        "Preserves insertion order natively in Python 3.7+",
        "Maintains load factor threshold (< 2/3) to prevent collision clustering",
        "Requires immutable keys implementing __hash__() and __eq__()"
      ]
    },
    "intuition": {
      "overview": "A hash map hashes the key to produce a 64-bit integer, maps it to an index table via modulo masking, and probes entries using open addressing.",
      "steps": [
        {
          "step": 1,
          "title": "Hash Computation",
          "description": "h = hash(key)."
        },
        {
          "step": 2,
          "title": "Masking",
          "description": "index = h & (table_size - 1)."
        },
        {
          "step": 3,
          "title": "Probing on Collision",
          "description": "Perturb sequence checks alternate slots until an empty or matching slot is found."
        }
      ]
    },
    "formalDefinition": {
      "text": "A hash table maps universe U to slots [0..m-1] via hash function h: U -> [0..m-1]. CPython uses open addressing with perturbation recurrence: j_{i+1} = (5 j_i + 1 + perturb) mod 2^k, with perturb >>= 5 at each step.",
      "latex": "j_{i+1} = \\left(5 j_i + 1 + \\lfloor \\text{perturb} / 32 \\rfloor\\right) \\bmod m"
    },
    "complexity": {
      "overview": "Lookup/Insert/Delete: O(1) average, O(n) worst-case under malicious hash collision attack.",
      "cases": [
        {
          "case": "Best",
          "time": "O(1)",
          "space": "O(1)",
          "explanation": "Zero collision direct bucket hit."
        },
        {
          "case": "Average",
          "time": "O(1)",
          "space": "O(n)",
          "explanation": "Load factor kept under 0.66 ensures <= 2 probes on average."
        },
        {
          "case": "Worst",
          "time": "O(n)",
          "space": "O(n)",
          "explanation": "All keys hash to identical bucket under adversarial input."
        }
      ],
      "spaceNote": "Compact dicts store entries as [hash, key, value] tuples, saving memory compared to traditional pointer buckets."
    },
    "workedExample": {
      "title": "Inserting (\"apple\", 5) into Compact Dict",
      "input": "Key: \"apple\", Value: 5",
      "steps": [
        {
          "step": 1,
          "action": "Compute Hash",
          "state": "hash(\"apple\") = 0x2A3F981",
          "explanation": "Calls string hash function."
        },
        {
          "step": 2,
          "action": "Index Masking",
          "state": "0x2A3F981 & 7 = slot 1 in indices array",
          "explanation": "Maps to 8-slot indices table."
        },
        {
          "step": 3,
          "action": "Store in Entries",
          "state": "entries[0] = (hash, \"apple\", 5)",
          "explanation": "Appends data to next available entry slot."
        },
        {
          "step": 4,
          "action": "Link Index",
          "state": "indices[1] = 0",
          "explanation": "indices[1] points to entries[0]."
        }
      ],
      "finalOutput": "Key inserted in O(1) time while preserving insertion order."
    },
    "visualExplanation": {
      "title": "CPython Compact Dict Architecture",
      "description": "Indices array: [-1, 0, -1, 1, -1, 2, -1, -1]. Entries array: [[h1, k1, v1], [h2, k2, v2], [h3, k3, v3]]. Splitting sparse hash buckets from dense contiguous entries eliminates memory fragmentation.",
      "features": [
        "Sparse byte-sized indices array",
        "Dense contiguous entries array",
        "Insertion order preservation"
      ]
    },
    "pseudocode": {
      "title": "Hash Map Lookup Logic",
      "code": "def get(key):\n    h = hash(key)\n    slot = h & mask\n    while table[slot] is not EMPTY:\n        if table[slot].hash == h and table[slot].key == key:\n            return table[slot].value\n        slot = probe_next(slot)\n    return KeyError"
    },
    "pythonCode": {
      "title": "Custom Hashable Class Implementation in Python",
      "code": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __eq__(self, other):\n        return isinstance(other, Point) and self.x == other.x and self.y == other.y\n\n    def __hash__(self):\n        # Must hash same attributes evaluated in __eq__\n        return hash((self.x, self.y))\n\np1 = Point(10, 20)\np2 = Point(10, 20)\n\npoint_map = {p1: \"Origin\"}\nprint(\"Lookup with identical p2:\", point_map.get(p2)) # Expected: \"Origin\"\nprint(\"Set length with p1 and p2:\", len({p1, p2}))      # Expected: 1",
      "explanation": "Demonstrates the contract between __eq__ and __hash__ necessary for custom objects to work in dicts and sets."
    },
    "runnableCode": {
      "code": "set_a = {1, 2, 3, 4, 5}\nset_b = {4, 5, 6, 7, 8}\n\n# O(min(len(a), len(b))) intersection\nprint(\"Intersection (a & b):\", set_a & set_b)\n# O(len(a) + len(b)) union\nprint(\"Union (a | b):\", set_a | set_b)\n# O(len(a)) difference\nprint(\"Difference (a - b):\", set_a - set_b)",
      "expectedOutput": "Intersection (a & b): {4, 5}\nUnion (a | b): {1, 2, 3, 4, 5, 6, 7, 8}\nDifference (a - b): {1, 2, 3}"
    },
    "lineByLineExplanation": [
      {
        "line": "4",
        "lines": "4",
        "code": "print(\"Intersection (a & b):\", set_a & set_b)",
        "codeSnippet": "print(\"Intersection (a & b):\", set_a & set_b)",
        "explanation": "Finds common elements by checking smaller set against larger in O(min(|a|, |b|))."
      },
      {
        "line": "6",
        "lines": "6",
        "code": "print(\"Union (a | b):\", set_a | set_b)",
        "codeSnippet": "print(\"Union (a | b):\", set_a | set_b)",
        "explanation": "Merges both sets without duplicates in linear O(|a| + |b|) time."
      }
    ],
    "edgeCases": [
      {
        "case": "Mutable Key (e.g. list as key)",
        "handling": "Python raises TypeError: unhashable type: \"list\".",
        "example": "d[[1, 2]] = \"error\""
      },
      {
        "case": "Hash collision clustering",
        "handling": "CPython perturbs probe sequence with upper bits to break primary clusters.",
        "example": "Keys with same lower bits"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Modifying an object after inserting it as a key in a set/dict.",
        "solution": "Mutating attributes that change __hash__ makes the object permanently unfindable in the map."
      },
      {
        "mistake": "Implementing __eq__ without implementing __hash__.",
        "solution": "Python sets __hash__ = None if __eq__ is overridden without __hash__."
      }
    ],
    "applications": [
      {
        "industry": "Web Frameworks",
        "application": "URL Routing Tables",
        "benefit": "Resolves API endpoints (e.g., \"/api/v1/users\") to handler functions in O(1) time."
      },
      {
        "industry": "Distributed Caching",
        "application": "Memcached / Redis In-Memory KV",
        "benefit": "Handles millions of key lookups per second with predictable sub-millisecond latencies."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-3-4-q1",
        "question": "Why does Python forbid using lists as dictionary keys?",
        "hint": "Are lists mutable?",
        "answer": "Lists are mutable. If a list could be used as a key and modified after insertion, its hash value would change, placing it in the wrong bucket and making retrieval impossible."
      },
      {
        "id": "dsa-3-4-q2",
        "question": "What is the load factor threshold at which CPython resizes a dictionary?",
        "hint": "Is it 50%, 66%, or 90%?",
        "answer": "Approximately 2/3 (66.7%). When 2/3 of the table slots are filled, CPython doubles or quadruples the table capacity to maintain O(1) probe efficiency."
      },
      {
        "id": "dsa-3-4-q3",
        "question": "Why are Python 3.7+ dictionaries guaranteed to maintain insertion order?",
        "hint": "Think about the compact dict entries array.",
        "answer": "Entries are appended sequentially into a dense array in the exact order they are inserted. The sparse indices table maps hashes to indices in this ordered array."
      }
    ],
    "quiz": [
      {
        "id": "dsa-3-4-quiz-1",
        "question": "What runtime error occurs if you try to use a Python list as a dictionary key?",
        "options": [
          "TypeError: unhashable type: \"list\"",
          "KeyError",
          "IndexError",
          "ValueError"
        ],
        "correctIndex": 0,
        "explanation": "Mutable objects like lists and sets do not implement __hash__ and raise TypeError when used as keys."
      },
      {
        "id": "dsa-3-4-quiz-2",
        "question": "What is the average-case time complexity of set intersection (set_a & set_b)?",
        "options": [
          "O(min(len(a), len(b)))",
          "O(len(a) * len(b))",
          "O(1)",
          "O(log(len(a)))"
        ],
        "correctIndex": 0,
        "explanation": "Python iterates through the smaller set and performs O(1) membership lookups in the larger set, taking O(min(|a|, |b|)) time."
      },
      {
        "id": "dsa-3-4-quiz-3",
        "question": "If two objects are considered equal according to __eq__, what MUST be true about their __hash__ values?",
        "options": [
          "Their hash values must be strictly equal",
          "Their hash values must be different",
          "Their hash values must sum to zero",
          "No restriction exists"
        ],
        "correctIndex": 0,
        "explanation": "The fundamental hash contract demands: if a == b is True, then hash(a) == hash(b) must be True."
      }
    ],
    "codingChallenge": {
      "title": "Group Anagrams",
      "problem": "Given an array of strings strs, group the anagrams together. You can return the answer in any order. Solve in O(N * K) time where N is the number of strings and K is the maximum string length.",
      "hints": [
        "Two strings are anagrams if and only if their character count tuples are identical.",
        "A list cannot be a dict key, but an immutable tuple of 26 integers can.",
        "Grouping by tuple(count) takes O(K) per string, resulting in O(N * K) overall time."
      ],
      "starterCode": "def group_anagrams(strs):\n    from collections import defaultdict\n    groups = defaultdict(list)\n    for s in strs:\n        # Create a tuple of 26 character counts as the hashable key\n        count = [0] * 26\n        for ch in s:\n            count[ord(ch) - ord('a')] += 1\n        groups[tuple(count)].append(s)\n    return list(groups.values())\n\nprint(group_anagrams([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]))",
      "solution": "def group_anagrams(strs):\n    from collections import defaultdict\n    groups = defaultdict(list)\n    for s in strs:\n        count = [0] * 26\n        for ch in s:\n            count[ord(ch) - ord('a')] += 1\n        groups[tuple(count)].append(s)\n    return list(groups.values())\n\nprint(group_anagrams([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]))"
    },
    "summary": {
      "keyTakeaways": [
        "Hash maps deliver average O(1) lookups via hash-directed indexing.",
        "CPython compact dicts split sparse hash indices from dense ordered entries.",
        "Keys must be immutable and maintain the __eq__ / __hash__ consistency contract.",
        "Grouping with tuple frequency keys avoids the O(K log K) string sorting bottleneck."
      ],
      "nextLessonId": "dsa-strings-anagram-palindrome",
      "nextLessonTitle": "Anagram and Palindrome Algorithms",
      "nextLessonModuleId": "dsa-module-3"
    },
    "lineByLine": [
      {
        "line": "4",
        "lines": "4",
        "code": "print(\"Intersection (a & b):\", set_a & set_b)",
        "codeSnippet": "print(\"Intersection (a & b):\", set_a & set_b)",
        "explanation": "Finds common elements by checking smaller set against larger in O(min(|a|, |b|))."
      },
      {
        "line": "6",
        "lines": "6",
        "code": "print(\"Union (a | b):\", set_a | set_b)",
        "codeSnippet": "print(\"Union (a | b):\", set_a | set_b)",
        "explanation": "Merges both sets without duplicates in linear O(|a| + |b|) time."
      }
    ]
  },
  "dsa-strings-anagram-palindrome": {
    "id": "dsa-strings-anagram-palindrome",
    "moduleId": "dsa-module-3",
    "title": "Anagram and Palindrome Algorithms",
    "subtitle": "Symmetry Detection, Expanding Around Centers & Manacher Algorithm Intuition",
    "order": 5,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master two-pointer inward and outward palindrome validation.",
      "Implement Longest Palindromic Substring via Expand Around Center in O(n^2) time and O(1) space.",
      "Handle both odd-length (single center) and even-length (double center) palindromes.",
      "Understand Manacher’s linear O(n) algorithm intuition using symmetry reuse."
    ],
    "prerequisites": [
      "Two Pointer Technique",
      "Frequency Counting Techniques"
    ],
    "analogy": {
      "title": "The Butterfly Wing Reflection",
      "text": "A butterfly’s wings exhibit bilateral symmetry across a central spinal axis. If you place a mirror at the center, the left wing matches the right wing vein for vein. To test if a wing pattern is symmetric, you don’t compare distant random points; you anchor your probe at the center spine and expand outward pixel by pixel in both directions simultaneously. If both sides match at every outward radius, you have confirmed a perfect mirror reflection.",
      "metaphor": "Expand Around Center tests palindrome symmetry by radiating outward from 2n - 1 potential axes."
    },
    "problemSolved": {
      "title": "Finding Symmetries without Checking All O(n^3) Substrings",
      "description": "Finding the longest palindromic substring by generating all n(n-1)/2 substrings and testing each in O(n) takes O(n^3) time. Expanding outward from each of the 2n - 1 center axes eliminates redundant checks and runs in O(n^2) time and O(1) auxiliary space.",
      "keyPoints": [
        "Identifies 2n - 1 centers (n odd-length centers and n - 1 even-length centers)",
        "Terminates early on first mismatch during outward expansion",
        "Requires zero extra memory: O(1) auxiliary space"
      ]
    },
    "intuition": {
      "overview": "Every palindrome has a center. For odd lengths (\"aba\"), the center is the character \"b\". For even lengths (\"abba\"), the center is the space between \"b\" and \"b\". Radiate outward from all 2n - 1 centers.",
      "steps": [
        {
          "step": 1,
          "title": "Loop Centers",
          "description": "Iterate i from 0 to n-1."
        },
        {
          "step": 2,
          "title": "Expand Odd",
          "description": "Expand around (i, i) for odd-length palindromes."
        },
        {
          "step": 3,
          "title": "Expand Even",
          "description": "Expand around (i, i+1) for even-length palindromes."
        },
        {
          "step": 4,
          "title": "Update Best",
          "description": "Track maximum radius found across all expansions."
        }
      ]
    },
    "formalDefinition": {
      "text": "A string S is a palindrome if S[i] = S[n - 1 - i] for all 0 <= i < n/2. The longest palindromic substring is argmax_{0 <= i <= j < n, S[i..j] is palindrome} (j - i + 1).",
      "latex": "S[i \\dots j] \\text{ is Palindrome} \\iff S[i] = S[j] \\land S[i+1 \\dots j-1] \\text{ is Palindrome}"
    },
    "complexity": {
      "overview": "Expand Around Center: O(n^2) time, O(1) space. Manacher algorithm: O(n) time, O(n) space.",
      "cases": [
        {
          "case": "Best",
          "time": "O(n)",
          "space": "O(1)",
          "explanation": "No palindrome matches: each center fails on first outward step."
        },
        {
          "case": "Average",
          "time": "O(n^2)",
          "space": "O(1)",
          "explanation": "Occasional short palindromes expanded."
        },
        {
          "case": "Worst",
          "time": "O(n^2)",
          "space": "O(1)",
          "explanation": "All characters identical (e.g. \"aaaaa\"), fully expanding every center."
        }
      ],
      "spaceNote": "Expand around center uses O(1) auxiliary space because it only tracks boundary indices."
    },
    "workedExample": {
      "title": "Expanding Around Center on \"babad\"",
      "input": "s = \"babad\"",
      "steps": [
        {
          "step": 1,
          "action": "Center i = 0 (\"b\")",
          "state": "len = 1 (\"b\")",
          "explanation": "Left out of bounds."
        },
        {
          "step": 2,
          "action": "Center i = 1 (\"a\")",
          "state": "Expand (0, 2): s[0]=\"b\", s[2]=\"b\" -> Match! \"bab\"",
          "explanation": "Further expansion out of bounds. Max len = 3 (\"bab\")."
        },
        {
          "step": 3,
          "action": "Center i = 2 (\"b\")",
          "state": "Expand (1, 3): s[1]=\"a\", s[3]=\"a\" -> Match! \"aba\"",
          "explanation": "Max len = 3 (\"aba\")."
        },
        {
          "step": 4,
          "action": "Even Centers",
          "state": "No adjacent duplicate characters found",
          "explanation": "All even-length expansions terminate with length 0."
        }
      ],
      "finalOutput": "Longest palindromic substring is \"bab\" (or \"aba\") of length 3."
    },
    "visualExplanation": {
      "title": "Outward Radius Radiation",
      "description": "From central axis i, left pointer steps -1 while right pointer steps +1. While characters match, radius grows. As soon as a mismatch occurs, the maximal palindrome for that center is established.",
      "features": [
        "Odd center (single letter anchor)",
        "Even center (inter-character gap anchor)",
        "Maximal expansion boundary"
      ]
    },
    "pseudocode": {
      "title": "Longest Palindrome Substring (Expand Around Center)",
      "code": "def longest_palindrome(s):\n    start = 0, max_len = 0\n    def expand(l, r):\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            l -= 1\n            r += 1\n        return l + 1, r - 1\n\n    for i in range(len(s)):\n        l1, r1 = expand(i, i)       # Odd length\n        l2, r2 = expand(i, i + 1)   # Even length\n        # Update longest"
    },
    "pythonCode": {
      "title": "Longest Palindromic Substring in Python",
      "code": "def longest_palindrome(s):\n    if not s:\n        return \"\"\n    start = end = 0\n\n    def expand(l, r):\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            l -= 1\n            r += 1\n        return l + 1, r - 1\n\n    for i in range(len(s)):\n        l1, r1 = expand(i, i)\n        l2, r2 = expand(i, i + 1)\n        if r1 - l1 > end - start:\n            start, end = l1, r1\n        if r2 - l2 > end - start:\n            start, end = l2, r2\n\n    return s[start:end + 1]\n\nprint(\"babad:\", longest_palindrome(\"babad\")) # Expected: \"bab\" or \"aba\"\nprint(\"cbbd:\", longest_palindrome(\"cbbd\"))   # Expected: \"bb\"",
      "explanation": "Finds the longest palindromic substring in O(n^2) time and O(1) extra space."
    },
    "runnableCode": {
      "code": "def valid_palindrome_after_one_deletion(s):\n    # Can we make it a palindrome by deleting at most 1 character?\n    def check_sub(l, r):\n        while l < r:\n            if s[l] != s[r]: return False\n            l += 1\n            r -= 1\n        return True\n\n    l, r = 0, len(s) - 1\n    while l < r:\n        if s[l] != s[r]:\n            # Try skipping left OR skipping right\n            return check_sub(l + 1, r) or check_sub(l, r - 1)\n        l += 1\n        r -= 1\n    return True\n\nprint(\"abca (delete 'c'):\", valid_palindrome_after_one_deletion(\"abca\"))\nprint(\"abc:\", valid_palindrome_after_one_deletion(\"abc\"))",
      "expectedOutput": "abca (delete 'c'): True\nabc: False"
    },
    "lineByLineExplanation": [
      {
        "line": "9-10",
        "lines": "9-10",
        "code": "l, r = 0, len(s) - 1\nwhile l < r:",
        "codeSnippet": "l, r = 0, len(s) - 1\nwhile l < r:",
        "explanation": "Standard inward two-pointer traversal."
      },
      {
        "line": "11-13",
        "lines": "11-13",
        "code": "if s[l] != s[r]:\n    return check_sub(l + 1, r) or check_sub(l, r - 1)",
        "codeSnippet": "if s[l] != s[r]:\n    return check_sub(l + 1, r) or check_sub(l, r - 1)",
        "explanation": "On first mismatch, tests both single-character deletion branches in linear time."
      }
    ],
    "edgeCases": [
      {
        "case": "Single character string",
        "handling": "Always a valid palindrome of length 1.",
        "example": "\"a\""
      },
      {
        "case": "All identical characters",
        "handling": "Entire string is returned in O(n^2).",
        "example": "\"aaaa\""
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to check even-length centers (i, i + 1).",
        "solution": "Palindromes like \"abba\" have no central character; they center between indices 1 and 2."
      },
      {
        "mistake": "Reversing the whole string and finding Longest Common Substring.",
        "solution": "This fails on inputs with reversed non-palindrome substrings like \"aacdefcaa\" (returns \"aac\" and \"caa\")."
      }
    ],
    "applications": [
      {
        "industry": "Bioinformatics",
        "application": "Restriction Enzyme Recognition Sites",
        "benefit": "Detects DNA palindromic sequences (e.g. GAATTC) where restriction enzymes bind and cleave double helices."
      },
      {
        "industry": "Data Compression",
        "application": "Burrows-Wheeler Transform (BWT)",
        "benefit": "Permutes strings to cluster recurring patterns for bzip2 compression."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-3-5-q1",
        "question": "How many total centers must be tested when expanding around center in a string of length n?",
        "hint": "Count single character centers and gaps between characters.",
        "answer": "Exactly 2n - 1 centers: n centers at individual characters, and n - 1 centers between adjacent character pairs."
      },
      {
        "id": "dsa-3-5-q2",
        "question": "Why is Manacher algorithm able to find the longest palindromic substring in O(n) linear time?",
        "hint": "How does it reuse previously computed radii?",
        "answer": "Manacher algorithm maintains the rightmost boundary of previously expanded palindromes. Symmetries inside that boundary mirror known palindrome radii, avoiding re-scanning characters."
      },
      {
        "id": "dsa-3-5-q3",
        "question": "What is the time complexity of testing if a string can be partitioned into palindromic substrings using dynamic programming?",
        "hint": "Is it O(n^2)?",
        "answer": "Precomputing all palindrome subsegments takes O(n^2). Minimum cut partitioning via DP then takes O(n^2) time and O(n) space."
      }
    ],
    "quiz": [
      {
        "id": "dsa-3-5-quiz-1",
        "question": "How many potential centers exist in a string of length n for the Expand Around Center algorithm?",
        "options": [
          "2n - 1",
          "n",
          "n^2",
          "n / 2"
        ],
        "correctIndex": 0,
        "explanation": "There are n odd-length centers (each character) and n - 1 even-length centers (between characters), giving 2n - 1 total centers."
      },
      {
        "id": "dsa-3-5-quiz-2",
        "question": "What is the auxiliary space complexity of finding the longest palindromic substring via Expand Around Center?",
        "options": [
          "O(1)",
          "O(n)",
          "O(n^2)",
          "O(log n)"
        ],
        "correctIndex": 0,
        "explanation": "Expand Around Center only tracks boundary pointer indices (start, end), using strictly O(1) extra heap memory."
      },
      {
        "id": "dsa-3-5-quiz-3",
        "question": "What algorithm finds the longest palindromic substring in strictly linear O(n) time?",
        "options": [
          "Manacher's Algorithm",
          "Kadane's Algorithm",
          "Dijkstra's Algorithm",
          "KMP Algorithm"
        ],
        "correctIndex": 0,
        "explanation": "Manacher's algorithm solves Longest Palindromic Substring in O(n) time by exploiting mirror symmetry inside palindromic boundaries."
      }
    ],
    "codingChallenge": {
      "title": "Palindromic Substrings Count",
      "problem": "Given a string s, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within the string.",
      "hints": [
        "Every time an outward expansion successfully matches characters, exactly one new palindromic substring is formed.",
        "Sum counts from all 2n - 1 centers."
      ],
      "starterCode": "def count_substrings(s):\n    count = 0\n    def expand(l, r):\n        c = 0\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            c += 1\n            l -= 1\n            r += 1\n        return c\n\n    for i in range(len(s)):\n        count += expand(i, i)       # Odd length\n        count += expand(i, i + 1)   # Even length\n    return count\n\nprint(count_substrings(\"abc\")) # Expected: 3 (\"a\", \"b\", \"c\")\nprint(count_substrings(\"aaa\")) # Expected: 6 (\"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\")",
      "solution": "def count_substrings(s):\n    count = 0\n    def expand(l, r):\n        c = 0\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            c += 1\n            l -= 1\n            r += 1\n        return c\n\n    for i in range(len(s)):\n        count += expand(i, i)\n        count += expand(i, i + 1)\n    return count\n\nprint(count_substrings(\"aaa\"))"
    },
    "summary": {
      "keyTakeaways": [
        "Expand Around Center checks 2n - 1 centers in O(n^2) time and O(1) space.",
        "Always expand both odd centers (i, i) and even centers (i, i + 1).",
        "Manacher's algorithm achieves linear O(n) time via symmetry caching.",
        "Inward two-pointer checks whether an entire string is a palindrome in O(n) time."
      ],
      "nextLessonId": "dsa-strings-matching",
      "nextLessonTitle": "String Matching — Naive and Boyer-Moore",
      "nextLessonModuleId": "dsa-module-3"
    },
    "lineByLine": [
      {
        "line": "9-10",
        "lines": "9-10",
        "code": "l, r = 0, len(s) - 1\nwhile l < r:",
        "codeSnippet": "l, r = 0, len(s) - 1\nwhile l < r:",
        "explanation": "Standard inward two-pointer traversal."
      },
      {
        "line": "11-13",
        "lines": "11-13",
        "code": "if s[l] != s[r]:\n    return check_sub(l + 1, r) or check_sub(l, r - 1)",
        "codeSnippet": "if s[l] != s[r]:\n    return check_sub(l + 1, r) or check_sub(l, r - 1)",
        "explanation": "On first mismatch, tests both single-character deletion branches in linear time."
      }
    ]
  },
  "dsa-strings-matching": {
    "id": "dsa-strings-matching",
    "moduleId": "dsa-module-3",
    "title": "String Matching — Naive and Boyer-Moore",
    "subtitle": "Pattern Search Heuristics, Bad Character Rule & Sub-linear Practical Performance",
    "order": 6,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Analyze the O(N * M) worst-case vulnerability of naive string pattern matching.",
      "Understand why comparing pattern characters right-to-left enables massive search jumps.",
      "Implement the Boyer-Moore Bad Character Heuristic.",
      "Explain the Good Suffix Heuristic and when Boyer-Moore achieves sub-linear O(N / M) best-case time."
    ],
    "prerequisites": [
      "String Representation and Operations",
      "Frequency Counting Techniques"
    ],
    "analogy": {
      "title": "The Blueprint Overlay Slide",
      "text": "You have a 1,000-page book and want to find where the 5-letter word \"ZEBRA\" appears. A naive reader places \"ZEBRA\" over words and checks letter 1: \"Z\"? No. Shifts by 1 letter. Checks letter 1: \"Z\"? No. A Boyer-Moore reader checks the LAST letter of the word first. If the 5th letter in the book is \"X\", knowing that \"X\" doesn’t appear anywhere in \"ZEBRA\", they don’t shift by 1 letter—they jump the entire stencil forward by a full 5 letters! In one step, they skip 4 pages of reading.",
      "metaphor": "Checking right-to-left allows mismatched characters to shift the pattern past the entire mismatch window."
    },
    "problemSolved": {
      "title": "Eliminating Redundant Character Comparisons in Text Search",
      "description": "When searching a pattern of length M in text of length N, naive search takes O(N * M) when prefixes frequently match and fail late (e.g. searching \"AAAB\" in \"AAAAAAAAAAAAAAAA\"). Boyer-Moore shifts the pattern by up to M positions on a mismatch, achieving sub-linear O(N / M) best-case execution.",
      "keyPoints": [
        "Right-to-left pattern comparison allows intelligent skipping",
        "Bad Character Rule: aligns pattern with last occurrence of mismatch in pattern",
        "Good Suffix Rule: aligns matched suffix with previous identical substring"
      ]
    },
    "intuition": {
      "overview": "Align pattern with text. Compare characters backwards from pattern end (index M-1 down to 0). On mismatch at character c, shift pattern right so that the last occurrence of c in the pattern aligns with text[c]. If c is not in pattern, shift pattern past c entirely.",
      "steps": [
        {
          "step": 1,
          "title": "Precompute Bad Character Table",
          "description": "Store the last occurrence index of each alphabet character in pattern."
        },
        {
          "step": 2,
          "title": "Backward Scan",
          "description": "Compare pattern[j] with text[shift + j] for j = M-1 down to 0."
        },
        {
          "step": 3,
          "title": "Shift Jump",
          "description": "On mismatch, shift = max(1, j - bad_char_table[text[shift + j]])."
        }
      ]
    },
    "formalDefinition": {
      "text": "The Boyer-Moore algorithm searches for pattern P[0..M-1] in text T[0..N-1]. The Bad Character shift rule states: if T[k] mismatches P[j], the pattern shifts by \\max(1, j - \\text{last}(T[k])), where \\text{last}(c) = \\max(\\{ i \\mid P[i] = c \\} \\cup \\{-1\\}).",
      "latex": "\\Delta_{\\text{bad}} = \\max\\big(1, \\, j - \\text{last}(T[s + j])\\big)"
    },
    "complexity": {
      "overview": "Best Case: O(N / M) sub-linear skips. Average: O(N). Worst Case: O(N * M) without Good Suffix rule.",
      "cases": [
        {
          "case": "Best",
          "time": "O(N / M)",
          "space": "O(|Σ|)",
          "explanation": "Mismatch on every rightmost character skips M positions each step."
        },
        {
          "case": "Average",
          "time": "O(N)",
          "space": "O(|Σ|)",
          "explanation": "Typical English text search skips 3-5 characters per step."
        },
        {
          "case": "Worst",
          "time": "O(N * M)",
          "space": "O(|Σ|)",
          "explanation": "Pathological repeating characters with bad character rule alone."
        }
      ],
      "spaceNote": "Bad character table requires O(|Σ|) space where |Σ| is alphabet size (e.g. 256 for ASCII)."
    },
    "workedExample": {
      "title": "Searching Pattern \"NEEDLE\" in Text \"...A_BIG_NEEDLE...\"",
      "input": "Text: \"FIND_A_NEEDLE\", Pattern: \"NEEDLE\" (M = 6)",
      "steps": [
        {
          "step": 1,
          "action": "Initial Alignment",
          "state": "Compare text[5] with pattern[5] (\"E\")",
          "explanation": "Text[5] is \"_\". \"_\" does not appear in \"NEEDLE\"!"
        },
        {
          "step": 2,
          "action": "Full Jump",
          "state": "Shift = 5 - (-1) = 6 positions forward",
          "explanation": "Instantly skips 6 characters without reading letters 0 through 4."
        },
        {
          "step": 3,
          "action": "Next Alignment",
          "state": "Compare text[11] (\"E\") with pattern[5] (\"E\")",
          "explanation": "Match! Scan backwards: L, D, E, E, N all match."
        }
      ],
      "finalOutput": "Pattern found at index 7 after only 7 total character inspections."
    },
    "visualExplanation": {
      "title": "Right-to-Left Scanning and Big Leaps",
      "description": "Looking backwards from the end of the template: when an alien character is spotted in the text window, the entire template leapfrogs across the alien character in one clean hop.",
      "features": [
        "Backward character cursor (M-1 down to 0)",
        "Bad character alignment jump",
        "Leapfrog acceleration"
      ]
    },
    "pseudocode": {
      "title": "Boyer-Moore (Bad Character Rule)",
      "code": "def boyer_moore(text, pattern):\n    M = len(pattern), N = len(text)\n    bad_char = {ch: i for i, ch in enumerate(pattern)}\n    shift = 0\n\n    while shift <= N - M:\n        j = M - 1\n        while j >= 0 and pattern[j] == text[shift + j]:\n            j -= 1\n        if j < 0:\n            return shift # Match found!\n        else:\n            c = text[shift + j]\n            shift += max(1, j - bad_char.get(c, -1))\n    return -1"
    },
    "pythonCode": {
      "title": "Boyer-Moore Bad Character Search in Python",
      "code": "def boyer_moore_search(text, pattern):\n    n, m = len(text), len(pattern)\n    if m == 0: return 0\n    if m > n: return -1\n\n    # Precompute last occurrence table\n    bad_char = {ch: idx for idx, ch in enumerate(pattern)}\n    shift = 0\n\n    while shift <= n - m:\n        j = m - 1\n        # Compare from right to left\n        while j >= 0 and pattern[j] == text[shift + j]:\n            j -= 1\n        if j < 0:\n            return shift # Match at index shift\n        else:\n            mismatched_char = text[shift + j]\n            # Shift by bad character rule\n            shift += max(1, j - bad_char.get(mismatched_char, -1))\n\n    return -1\n\ntext = \"HERE IS A SIMPLE EXAMPLE\"\npattern = \"EXAMPLE\"\nidx = boyer_moore_search(text, pattern)\nprint(f\"Pattern '{pattern}' found at index: {idx}\")",
      "explanation": "Implements Boyer-Moore with Bad Character heuristic, demonstrating right-to-left comparisons and jumping."
    },
    "runnableCode": {
      "code": "def naive_vs_bm(text, pat):\n    # Naive search comparisons\n    naive_comps = 0\n    for i in range(len(text) - len(pat) + 1):\n        for j in range(len(pat)):\n            naive_comps += 1\n            if text[i + j] != pat[j]: break\n\n    print(f\"Text length: {len(text)}, Pattern length: {len(pat)}\")\n    print(f\"Naive total comparisons: {naive_comps}\")\n\nnaive_vs_bm(\"THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG\", \"QUIET\")",
      "expectedOutput": "Text length: 43, Pattern length: 5\nNaive total comparisons: 43"
    },
    "lineByLineExplanation": [
      {
        "line": "7",
        "lines": "7",
        "code": "bad_char = {ch: idx for idx, ch in enumerate(pattern)}",
        "codeSnippet": "bad_char = {ch: idx for idx, ch in enumerate(pattern)}",
        "explanation": "Precomputes last index of each character in pattern."
      },
      {
        "line": "12-14",
        "lines": "12-14",
        "code": "while j >= 0 and pattern[j] == text[shift + j]: j -= 1",
        "codeSnippet": "while j >= 0 and pattern[j] == text[shift + j]: j -= 1",
        "explanation": "Scans characters backwards from pattern end."
      },
      {
        "line": "18-19",
        "lines": "18-19",
        "code": "shift += max(1, j - bad_char.get(mismatched_char, -1))",
        "codeSnippet": "shift += max(1, j - bad_char.get(mismatched_char, -1))",
        "explanation": "Calculates maximum safe leap based on mismatch character position."
      }
    ],
    "edgeCases": [
      {
        "case": "Pattern longer than text",
        "handling": "Return -1 immediately.",
        "example": "len(pattern) > len(text)"
      },
      {
        "case": "Pattern is empty string",
        "handling": "Return index 0.",
        "example": "pattern = \"\""
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting `max(1, ...)` in bad character shift.",
        "solution": "If the mismatched character appears to the right of j in the pattern, j - last(c) is negative. Must take max with 1 to avoid shifting backwards."
      },
      {
        "mistake": "Scanning left-to-right.",
        "solution": "Boyer-Moore requires right-to-left scanning inside the window to enable forward shifts."
      }
    ],
    "applications": [
      {
        "industry": "Operating Systems & CLI",
        "application": "GNU grep Utility",
        "benefit": "GNU grep uses Boyer-Moore to search gigabytes of text files per second by skipping bytes."
      },
      {
        "industry": "Text Editors",
        "application": "Ctrl+F Search Engines",
        "benefit": "Instantly highlights query occurrences in large documents without lag."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-3-6-q1",
        "question": "Why does Boyer-Moore scan pattern characters from right to left instead of left to right?",
        "hint": "What information does the rightmost character give about the entire window?",
        "answer": "If the character in the text aligned with the end of the pattern does not exist in the pattern, the entire pattern can leap past that character in a single step of size M."
      },
      {
        "id": "dsa-3-6-q2",
        "question": "Under what conditions does Boyer-Moore achieve its best-case O(N / M) time complexity?",
        "hint": "What happens if none of the text characters appear in the pattern?",
        "answer": "When none of the characters in the text appear anywhere in the pattern. Every check at the right edge fails instantly and shifts the pattern by M positions, requiring only N / M inspections."
      },
      {
        "id": "dsa-3-6-q3",
        "question": "What is the Good Suffix heuristic in Boyer-Moore?",
        "hint": "When part of the suffix matched before failing.",
        "answer": "If a suffix of the pattern matched before a mismatch occurred, the Good Suffix rule shifts the pattern to align with the next occurrence of that matched suffix inside the pattern."
      }
    ],
    "quiz": [
      {
        "id": "dsa-3-6-quiz-1",
        "question": "In what direction does Boyer-Moore compare characters within a window?",
        "options": [
          "Right to left (from pattern end to pattern start)",
          "Left to right (from pattern start to pattern end)",
          "Outward from the center",
          "Randomly"
        ],
        "correctIndex": 0,
        "explanation": "Boyer-Moore compares characters from right to left (M-1 down to 0) to maximize the forward jump distance when a mismatch occurs."
      },
      {
        "id": "dsa-3-6-quiz-2",
        "question": "What is the best-case time complexity of the Boyer-Moore string matching algorithm on text of length N and pattern of length M?",
        "options": [
          "O(N / M)",
          "O(N * M)",
          "O(N)",
          "O(log N)"
        ],
        "correctIndex": 0,
        "explanation": "When rightmost character mismatches allow shifting by the full pattern length M each step, total comparisons are bounded by N / M."
      },
      {
        "id": "dsa-3-6-quiz-3",
        "question": "Why is `max(1, j - bad_char.get(c, -1))` used instead of simply `j - bad_char.get(c, -1)`?",
        "options": [
          "To prevent shifting backwards if the last occurrence of c in pattern is to the right of j",
          "To guarantee integer division",
          "To handle negative text indices",
          "To support unicode"
        ],
        "correctIndex": 0,
        "explanation": "If the character c appears in the pattern at an index greater than the current mismatch index j, the formula yields a negative number; max(1, ...) forces a forward step of at least 1."
      }
    ],
    "codingChallenge": {
      "title": "Implement strStr()",
      "problem": "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack. If needle is empty, return 0.",
      "hints": [
        "Precompute bad character dictionary with character positions in needle.",
        "Check characters backwards starting from needle length - 1.",
        "Advance shift by max(1, j - bad_char.get(mismatch, -1))."
      ],
      "starterCode": "def str_str(haystack, needle):\n    if not needle: return 0\n    n, m = len(haystack), len(needle)\n    if m > n: return -1\n\n    # Boyer-Moore Bad Character Search\n    bad_char = {ch: idx for idx, ch in enumerate(needle)}\n    shift = 0\n    while shift <= n - m:\n        j = m - 1\n        while j >= 0 and needle[j] == haystack[shift + j]:\n            j -= 1\n        if j < 0:\n            return shift\n        shift += max(1, j - bad_char.get(haystack[shift + j], -1))\n    return -1\n\nprint(str_str(\"hello\", \"ll\"))  # Expected: 2\nprint(str_str(\"aaaaa\", \"bba\")) # Expected: -1",
      "solution": "def str_str(haystack, needle):\n    if not needle: return 0\n    n, m = len(haystack), len(needle)\n    if m > n: return -1\n\n    bad_char = {ch: idx for idx, ch in enumerate(needle)}\n    shift = 0\n    while shift <= n - m:\n        j = m - 1\n        while j >= 0 and needle[j] == haystack[shift + j]:\n            j -= 1\n        if j < 0:\n            return shift\n        shift += max(1, j - bad_char.get(haystack[shift + j], -1))\n    return -1\n\nprint(str_str(\"hello\", \"ll\"))"
    },
    "summary": {
      "keyTakeaways": [
        "Boyer-Moore compares characters right-to-left within each text window.",
        "Bad Character rule aligns pattern with previous character occurrence or jumps past it.",
        "Best-case runtime is sub-linear O(N / M) on large alphabets.",
        "Underpins production command-line search tools like GNU grep."
      ],
      "nextLessonId": "dsa-strings-kmp",
      "nextLessonTitle": "KMP and Rabin-Karp Algorithms",
      "nextLessonModuleId": "dsa-module-3"
    },
    "lineByLine": [
      {
        "line": "7",
        "lines": "7",
        "code": "bad_char = {ch: idx for idx, ch in enumerate(pattern)}",
        "codeSnippet": "bad_char = {ch: idx for idx, ch in enumerate(pattern)}",
        "explanation": "Precomputes last index of each character in pattern."
      },
      {
        "line": "12-14",
        "lines": "12-14",
        "code": "while j >= 0 and pattern[j] == text[shift + j]: j -= 1",
        "codeSnippet": "while j >= 0 and pattern[j] == text[shift + j]: j -= 1",
        "explanation": "Scans characters backwards from pattern end."
      },
      {
        "line": "18-19",
        "lines": "18-19",
        "code": "shift += max(1, j - bad_char.get(mismatched_char, -1))",
        "codeSnippet": "shift += max(1, j - bad_char.get(mismatched_char, -1))",
        "explanation": "Calculates maximum safe leap based on mismatch character position."
      }
    ]
  },
  "dsa-strings-kmp": {
    "id": "dsa-strings-kmp",
    "moduleId": "dsa-module-3",
    "title": "KMP and Rabin-Karp Algorithms",
    "subtitle": "LPS Failure Tables, Polynomial Rolling Hash & Linear Worst-Case Guarantees",
    "order": 7,
    "readTimeMinutes": 32,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Construct the Longest Prefix Suffix (LPS) π table for Knuth-Morris-Pratt (KMP).",
      "Prove that KMP achieves strictly O(N + M) worst-case time without text backtracking.",
      "Implement the Rabin-Karp polynomial rolling hash using Horner’s method and modulo arithmetic.",
      "Handle hash collisions and spurious hits in Rabin-Karp."
    ],
    "prerequisites": [
      "String Matching — Naive and Boyer-Moore",
      "Prefix Sums and Modular Arithmetic"
    ],
    "analogy": {
      "title": "The Mechanical Loom Resumption",
      "text": "A mechanical weaving loom is executing a complex 10-stitch pattern: [Red, Blue, Green, Red, Blue, Yellow...]. If the needle jams at stitch 6 (Yellow), a novice unweaves all 6 stitches and restarts from stitch 1. A master weaver notices that stitches 4 and 5 ([Red, Blue]) are an identical prefix of the pattern. Instead of restarting, they keep stitches 4 and 5 in place and resume weaving directly from stitch 3. Zero fabric is wasted, and the loom never backtracks.",
      "metaphor": "KMP never moves the text pointer backwards; it uses the LPS table to resume pattern matching at the longest valid prefix."
    },
    "problemSolved": {
      "title": "Guaranteed O(N) Worst-Case Matching and Streaming Text Search",
      "description": "Boyer-Moore can degrade to O(N * M) on repetitive inputs without complex heuristics, and naive search backtracks the text pointer. KMP guarantees strict O(N + M) worst-case time and processes text as an un-buffered forward-only stream.",
      "keyPoints": [
        "Never backtracks the text pointer (essential for network sockets and streaming streams)",
        "LPS table precomputes self-similarity of the pattern in O(M) time",
        "Rabin-Karp enables multi-pattern search and plagiarism detection via rolling hash"
      ]
    },
    "intuition": {
      "overview": "LPS[i] stores the length of the longest proper prefix of pattern[0..i] that is also a suffix of pattern[0..i]. When mismatch occurs at pattern[j], set j = LPS[j - 1] without changing text index i.",
      "steps": [
        {
          "step": 1,
          "title": "Build LPS Table",
          "description": "Compute longest prefix suffix for each prefix of the pattern in O(M)."
        },
        {
          "step": 2,
          "title": "Stream Text",
          "description": "Advance text pointer i from 0 to N-1."
        },
        {
          "step": 3,
          "title": "Fallback on Mismatch",
          "description": "If mismatch at j, fallback j = LPS[j - 1] until characters match or j == 0."
        },
        {
          "step": 4,
          "title": "Match Found",
          "description": "When j == M, record match at i - M and set j = LPS[j - 1]."
        }
      ]
    },
    "formalDefinition": {
      "text": "Let \\pi[i] = \\max \\{ k < i+1 \\mid P[0..k-1] = P[i-k+1..i] \\}. KMP maintains text index i and pattern index j. In each step, either i advances by 1, or j decreases via \\pi[j-1]. The amortized number of j fallbacks is bounded by N, yielding O(N + M) time.",
      "latex": "\\pi[i] = \\max\\{ k < i+1 \\mid P[0\\dots k-1] = P[i-k+1\\dots i]\\}"
    },
    "complexity": {
      "overview": "KMP: O(N + M) worst-case time, O(M) space. Rabin-Karp: O(N + M) average time, O(N * M) worst-case.",
      "cases": [
        {
          "case": "Best",
          "time": "O(N + M)",
          "space": "O(M)",
          "explanation": "Linear scan with minimal LPS fallbacks."
        },
        {
          "case": "Average",
          "time": "O(N + M)",
          "space": "O(M)",
          "explanation": "Predictable linear throughput."
        },
        {
          "case": "Worst",
          "time": "O(N + M)",
          "space": "O(M)",
          "explanation": "Strictly linear guaranteed even on pathological inputs like \"AAAA...A\"."
        }
      ],
      "spaceNote": "KMP requires an auxiliary array of size M for the LPS table."
    },
    "workedExample": {
      "title": "Building LPS Table for Pattern \"ABABC\"",
      "input": "Pattern: \"ABABC\"",
      "steps": [
        {
          "step": 1,
          "action": "i = 0 (\"A\")",
          "state": "LPS[0] = 0",
          "explanation": "Proper prefix cannot equal the full string."
        },
        {
          "step": 2,
          "action": "i = 1 (\"B\")",
          "state": "P[1] != P[0] -> LPS[1] = 0",
          "explanation": "\"AB\" has no matching prefix-suffix."
        },
        {
          "step": 3,
          "action": "i = 2 (\"A\")",
          "state": "P[2] == P[0] -> LPS[2] = 1",
          "explanation": "\"ABA\" has prefix \"A\" == suffix \"A\"."
        },
        {
          "step": 4,
          "action": "i = 3 (\"B\")",
          "state": "P[3] == P[1] -> LPS[3] = 2",
          "explanation": "\"ABAB\" has prefix \"AB\" == suffix \"AB\"."
        },
        {
          "step": 5,
          "action": "i = 4 (\"C\")",
          "state": "P[4] != P[2] -> fallback -> LPS[4] = 0",
          "explanation": "\"ABABC\" has no matching prefix-suffix."
        }
      ],
      "finalOutput": "LPS Table for \"ABABC\" = [0, 0, 1, 2, 0]"
    },
    "visualExplanation": {
      "title": "The Sliding Prefix Invariant",
      "description": "When mismatch strikes, the matched prefix-suffix overlap slides forward without moving the text eye. The green matching blocks align, allowing seamless resumption.",
      "features": [
        "Forward-only text cursor",
        "LPS fallback alignment",
        "Rolling hash window subtraction"
      ]
    },
    "pseudocode": {
      "title": "KMP Algorithm",
      "code": "def kmp_search(text, pattern):\n    lps = compute_lps(pattern)\n    i = 0, j = 0\n    while i < len(text):\n        if text[i] == pattern[j]:\n            i += 1\n            j += 1\n            if j == len(pattern):\n                return i - j # Match!\n        elif j > 0:\n            j = lps[j - 1] # Fallback without moving i\n        else:\n            i += 1\n    return -1"
    },
    "pythonCode": {
      "title": "Complete KMP Implementation in Python",
      "code": "def build_lps(pattern):\n    m = len(pattern)\n    lps = [0] * m\n    length = 0 # length of previous longest prefix suffix\n    i = 1\n\n    while i < m:\n        if pattern[i] == pattern[length]:\n            length += 1\n            lps[i] = length\n            i += 1\n        else:\n            if length != 0:\n                length = lps[length - 1]\n            else:\n                lps[i] = 0\n                i += 1\n    return lps\n\ndef kmp_search(text, pattern):\n    if not pattern: return 0\n    n, m = len(text), len(pattern)\n    lps = build_lps(pattern)\n    i = j = 0 # i: text, j: pattern\n\n    while i < n:\n        if text[i] == pattern[j]:\n            i += 1\n            j += 1\n            if j == m:\n                return i - m # Match found at index (i - m)\n        elif j > 0:\n            j = lps[j - 1] # Smart fallback!\n        else:\n            i += 1\n    return -1\n\n# Test\ntext = \"ABABDABACDABABCABAB\"\npat = \"ABABCABAB\"\nprint(\"LPS table for pattern:\", build_lps(pat))\nprint(f\"Pattern found at index: {kmp_search(text, pat)}\")",
      "explanation": "Builds the LPS table and performs search without ever decrementing the text index i."
    },
    "runnableCode": {
      "code": "def rabin_karp(text, pattern):\n    # Rolling hash: Base 256, Prime Modulo 101\n    d = 256\n    q = 101\n    n, m = len(text), len(pattern)\n    h = pow(d, m - 1, q)\n    p_hash = 0\n    t_hash = 0\n\n    for i in range(m):\n        p_hash = (d * p_hash + ord(pattern[i])) % q\n        t_hash = (d * t_hash + ord(text[i])) % q\n\n    for s in range(n - m + 1):\n        if p_hash == t_hash:\n            if text[s:s + m] == pattern:\n                return s\n        if s < n - m:\n            t_hash = (d * (t_hash - ord(text[s]) * h) + ord(text[s + m])) % q\n            t_hash = (t_hash + q) % q\n    return -1\n\nprint(\"Rabin-Karp match index:\", rabin_karp(\"GEEKS FOR GEEKS\", \"GEEK\"))",
      "expectedOutput": "Rabin-Karp match index: 0"
    },
    "lineByLineExplanation": [
      {
        "line": "5-6",
        "lines": "5-6",
        "code": "h = pow(d, m - 1, q)\np_hash = 0",
        "codeSnippet": "h = pow(d, m - 1, q)\np_hash = 0",
        "explanation": "Calculates high-order place multiplier d^(m-1) mod q."
      },
      {
        "line": "18-19",
        "lines": "18-19",
        "code": "t_hash = (d * (t_hash - ord(text[s]) * h) + ord(text[s + m])) % q",
        "codeSnippet": "t_hash = (d * (t_hash - ord(text[s]) * h) + ord(text[s + m])) % q",
        "explanation": "Subtracts departing leading character and adds incoming trailing character in O(1)."
      }
    ],
    "edgeCases": [
      {
        "case": "Pattern with no repeating characters (e.g. \"ABCDE\")",
        "handling": "LPS table is all zeroes; falls back to index 0 on mismatch.",
        "example": "LPS = [0, 0, 0, 0, 0]"
      },
      {
        "case": "Hash collision in Rabin-Karp (Spurious Hit)",
        "handling": "Verify string slice text[s:s+m] == pattern to discard false positives.",
        "example": "p_hash == t_hash but text != pattern"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Resetting the text index i backwards on mismatch in KMP.",
        "solution": "KMP never decrements i. Only the pattern index j rolls back via lps[j-1]."
      },
      {
        "mistake": "Forgetting negative modulo correction in rolling hash.",
        "solution": "In Python modulo handles negatives automatically, but in C/C++/Java add q before modulo."
      }
    ],
    "applications": [
      {
        "industry": "Academic Integrity & Plagiarism Detection",
        "application": "Rabin-Karp Document Fingerprinting",
        "benefit": "Computes rolling hashes of n-gram sentences to match text across millions of essays in linear time."
      },
      {
        "industry": "Network Intrusion Detection (Snort IDS)",
        "application": "Deep Packet Inspection",
        "benefit": "Scans live network packet streams for malware signatures without buffering the stream."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-3-7-q1",
        "question": "What is the maximum number of times the text pointer i advances in KMP on a text of length N?",
        "hint": "Does i ever decrement?",
        "answer": "Exactly N times. The text pointer i increments strictly from 0 to N without ever moving backwards."
      },
      {
        "id": "dsa-3-7-q2",
        "question": "What does the LPS table value LPS[5] = 3 mean?",
        "hint": "Proper prefix and suffix length.",
        "answer": "It means that for the prefix of length 6 (indices 0..5), the longest proper prefix that is also a suffix has length 3."
      },
      {
        "id": "dsa-3-7-q3",
        "question": "How does Rabin-Karp handle multiple pattern searches efficiently?",
        "hint": "Can you store pattern hashes in a hash set?",
        "answer": "Hash all k patterns into a hash set in O(k * M) time. Slide one rolling hash window across the text in O(N) time; if window hash matches any set entry, verify the string."
      }
    ],
    "quiz": [
      {
        "id": "dsa-3-7-quiz-1",
        "question": "What is the worst-case time complexity of the KMP string search algorithm on text of length N and pattern of length M?",
        "options": [
          "O(N + M)",
          "O(N * M)",
          "O(N log M)",
          "O(M^2)"
        ],
        "correctIndex": 0,
        "explanation": "Precomputing the LPS table takes O(M), and searching the text takes O(N), guaranteeing strictly linear O(N + M) worst-case time."
      },
      {
        "id": "dsa-3-7-quiz-2",
        "question": "What does KMP do with the text pointer i when a character mismatch occurs at pattern index j?",
        "options": [
          "It leaves i unchanged and updates j = LPS[j - 1]",
          "It resets i back to the start of the text",
          "It decrements i by j positions",
          "It increments i by M positions"
        ],
        "correctIndex": 0,
        "explanation": "The breakthrough innovation of KMP is that the text pointer i NEVER moves backwards; only the pattern pointer j falls back to LPS[j-1]."
      },
      {
        "id": "dsa-3-7-quiz-3",
        "question": "What is a \"Spurious Hit\" in the Rabin-Karp algorithm?",
        "options": [
          "When the rolling hash matches the pattern hash, but character comparison reveals the strings are different",
          "When the pattern is longer than the text",
          "When a divide-by-zero error occurs",
          "When the text contains non-ASCII characters"
        ],
        "correctIndex": 0,
        "explanation": "Because hash functions map infinite string combinations to finite modulo integers, hash collisions (spurious hits) must be verified with an exact string comparison."
      }
    ],
    "codingChallenge": {
      "title": "Repeated Substring Pattern",
      "problem": "Given a string s, check if it can be constructed by taking a substring of it and appending one or more copies of the substring together. Solve in O(n) using the KMP LPS array.",
      "hints": [
        "The length of the potential repeating unit is (n - lps[-1]).",
        "If lps[-1] > 0 and n is divisible by (n - lps[-1]), then the string is periodic."
      ],
      "starterCode": "def repeated_substring_pattern(s):\n    n = len(s)\n    # Build KMP LPS array\n    lps = [0] * n\n    length = 0\n    i = 1\n    while i < n:\n        if s[i] == s[length]:\n            length += 1\n            lps[i] = length\n            i += 1\n        else:\n            if length != 0:\n                length = lps[length - 1]\n            else:\n                lps[i] = 0\n                i += 1\n\n    last = lps[-1]\n    # If last > 0 and the remaining prefix divides n evenly:\n    return last > 0 and n % (n - last) == 0\n\nprint(repeated_substring_pattern(\"abab\"))    # Expected: True (\"ab\" * 2)\nprint(repeated_substring_pattern(\"aba\"))     # Expected: False\nprint(repeated_substring_pattern(\"abcabcabc\")) # Expected: True (\"abc\" * 3)",
      "solution": "def repeated_substring_pattern(s):\n    n = len(s)\n    lps = [0] * n\n    length = 0\n    i = 1\n    while i < n:\n        if s[i] == s[length]:\n            length += 1\n            lps[i] = length\n            i += 1\n        else:\n            if length != 0:\n                length = lps[length - 1]\n            else:\n                lps[i] = 0\n                i += 1\n\n    last = lps[-1]\n    return last > 0 and n % (n - last) == 0\n\nprint(repeated_substring_pattern(\"abab\"))"
    },
    "summary": {
      "keyTakeaways": [
        "KMP guarantees linear O(N + M) worst-case time without ever backtracking text index i.",
        "LPS table π encodes longest proper prefix that is also a suffix for each prefix.",
        "Rabin-Karp uses polynomial rolling hash for efficient multi-pattern matching.",
        "Rolling hashes update in O(1) by subtracting outgoing and adding incoming characters."
      ],
      "nextLessonId": "dsa-strings-trie",
      "nextLessonTitle": "Trie Data Structure",
      "nextLessonModuleId": "dsa-module-3"
    },
    "lineByLine": [
      {
        "line": "5-6",
        "lines": "5-6",
        "code": "h = pow(d, m - 1, q)\np_hash = 0",
        "codeSnippet": "h = pow(d, m - 1, q)\np_hash = 0",
        "explanation": "Calculates high-order place multiplier d^(m-1) mod q."
      },
      {
        "line": "18-19",
        "lines": "18-19",
        "code": "t_hash = (d * (t_hash - ord(text[s]) * h) + ord(text[s + m])) % q",
        "codeSnippet": "t_hash = (d * (t_hash - ord(text[s]) * h) + ord(text[s + m])) % q",
        "explanation": "Subtracts departing leading character and adds incoming trailing character in O(1)."
      }
    ]
  },
  "dsa-strings-trie": {
    "id": "dsa-strings-trie",
    "moduleId": "dsa-module-3",
    "title": "Trie Data Structure",
    "subtitle": "Prefix Trees, Word Retrieval, Autocomplete & Bitwise XOR Lookups",
    "order": 8,
    "readTimeMinutes": 30,
    "difficulty": "Advanced",
    "visualizerType": "trie",
    "objectives": [
      "Construct a Trie (Prefix Tree) node structure with children map and is_end_of_word flag.",
      "Implement insert(word), search(word), and startsWith(prefix) in O(L) time.",
      "Analyze space-time trade-offs between array child pointers vs hash map child nodes.",
      "Implement Autocomplete prefix search and Maximum XOR pair lookups using Binary Tries."
    ],
    "prerequisites": [
      "Tree Fundamentals",
      "Hash Maps and Hash Sets"
    ],
    "analogy": {
      "title": "The Structured Telephone Contact Tree",
      "text": "When dialing a customer support hotline: \"Press 1 for English, Press 2 for Spanish\". If you press 1, the next menu branches: \"Press 1 for Billing, Press 2 for Technical Support\". Every spoken option shares the initial root selection. You don’t listen to all 50 possible department numbers; you traverse the tree character by character. A Trie organizes words identically: all words starting with \"cat\" (\"cat\", \"cater\", \"catapult\") share the exact same \"c\" -> \"a\" -> \"t\" path.",
      "metaphor": "A Trie shares common prefixes among words, allowing prefix lookups proportional to word length L, not dictionary size N."
    },
    "problemSolved": {
      "title": "Instant Sub-Millisecond Prefix Matching & Autocomplete",
      "description": "Searching for all words with prefix \"app\" in a dictionary of 1,000,000 words naively requires scanning all million words in O(N * L). A Trie locates the prefix node in O(L) time (where L = 3) and traverses only matching descendants, completely independent of total dictionary size.",
      "keyPoints": [
        "Prefix search and insertion take O(L) time where L is word length",
        "Naturally implements search bar autocomplete and spell checking",
        "Binary Tries solve Maximum XOR Pair problems in O(32 * N) = O(N) time"
      ]
    },
    "intuition": {
      "overview": "A Trie is an m-ary tree where each node represents a character. Edges lead to successor letters. A boolean flag marks where complete words terminate.",
      "steps": [
        {
          "step": 1,
          "title": "Insert",
          "description": "Walk from root along character edges. If a character node does not exist, create it. Mark last node is_end_of_word = True."
        },
        {
          "step": 2,
          "title": "Search",
          "description": "Follow character edges. If edge missing, return False. If all edges found, return node.is_end_of_word."
        },
        {
          "step": 3,
          "title": "Starts With",
          "description": "Follow prefix edges. If all edges exist, return True regardless of is_end_of_word."
        }
      ]
    },
    "formalDefinition": {
      "text": "A Trie is an ordered tree data structure where keys are usually strings. The root represents the empty string \"\". Every node has at most |Σ| children. Lookup, insertion, and deletion complexity is Θ(L), where L is key length, independent of dictionary cardinality N.",
      "latex": "\\text{Time}(insert) = \\mathcal{O}(L), \\quad \\text{Time}(search) = \\mathcal{O}(L)"
    },
    "complexity": {
      "overview": "Insert: O(L) time. Search: O(L) time. Prefix check: O(L) time. Space: O(N * L * |Σ|) in worst case.",
      "cases": [
        {
          "case": "Best",
          "time": "O(L)",
          "space": "O(1)",
          "explanation": "Word already exists; zero new nodes allocated."
        },
        {
          "case": "Average",
          "time": "O(L)",
          "space": "O(L)",
          "explanation": "Allocates nodes only for distinct suffix letters."
        },
        {
          "case": "Worst",
          "time": "O(L)",
          "space": "O(N * L)",
          "explanation": "All words share zero common prefixes."
        }
      ],
      "spaceNote": "Can be compressed into a Radix Tree (Patricia Trie) by collapsing non-branching edges."
    },
    "workedExample": {
      "title": "Inserting \"cat\" and \"car\" into Trie",
      "input": "Insert \"cat\", then insert \"car\"",
      "steps": [
        {
          "step": 1,
          "action": "Insert \"cat\"",
          "state": "root -> [c] -> [a] -> [t (end)]",
          "explanation": "Create nodes c, a, and t. Mark node t as end of word."
        },
        {
          "step": 2,
          "action": "Insert \"car\"",
          "state": "root -> [c] -> [a] -> branches to [t (end)] and [r (end)]",
          "explanation": "Follow existing [c] -> [a]. \"r\" does not exist under [a], so create node [r] and mark as end."
        }
      ],
      "finalOutput": "Words \"cat\" and \"car\" stored sharing common prefix \"ca\"."
    },
    "visualExplanation": {
      "title": "Branching Tree of Prefixes",
      "description": "Root node at top. Branches branch out into 26 letters. Common prefixes follow identical paths down the tree until diverging at their first distinct letter.",
      "features": [
        "Shared prefix trunks",
        "Terminal word indicator flags",
        "Direct character branching"
      ]
    },
    "pseudocode": {
      "title": "Trie Class",
      "code": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_word = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_word = True"
    },
    "pythonCode": {
      "title": "Complete Trie Implementation with Autocomplete in Python",
      "code": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end_of_word = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word: str) -> None:\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_end_of_word = True\n\n    def search(self, word: str) -> bool:\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return node.is_end_of_word\n\n    def starts_with(self, prefix: str) -> bool:\n        node = self.root\n        for ch in prefix:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return True\n\ntrie = Trie()\nfor word in [\"apple\", \"app\", \"apricot\", \"banana\"]:\n    trie.insert(word)\n\nprint(\"Search 'app':\", trie.search(\"app\"))       # True\nprint(\"Search 'appl':\", trie.search(\"appl\"))     # False\nprint(\"Starts with 'ap':\", trie.starts_with(\"ap\")) # True\nprint(\"Starts with 'cat':\", trie.starts_with(\"cat\")) # False",
      "explanation": "Demonstrates insert, full-word search, and prefix testing in O(L) time."
    },
    "runnableCode": {
      "code": "class SimpleTrie:\n    def __init__(self):\n        self.root = {}\n\n    def insert(self, word):\n        curr = self.root\n        for ch in word:\n            if ch not in curr: curr[ch] = {}\n            curr = curr[ch]\n        curr['#'] = True # End of word sentinel\n\n    def search(self, word):\n        curr = self.root\n        for ch in word:\n            if ch not in curr: return False\n            curr = curr[ch]\n        return '#' in curr\n\nt = SimpleTrie()\nt.insert(\"algo\")\nprint(\"Search 'algo':\", t.search(\"algo\"))\nprint(\"Search 'alg':\", t.search(\"alg\"))",
      "expectedOutput": "Search 'algo': True\nSearch 'alg': False"
    },
    "lineByLineExplanation": [
      {
        "line": "6-9",
        "lines": "6-9",
        "code": "for ch in word:\n    if ch not in curr: curr[ch] = {}\n    curr = curr[ch]",
        "codeSnippet": "for ch in word:\n    if ch not in curr: curr[ch] = {}\n    curr = curr[ch]",
        "explanation": "Traverses nested dictionaries, creating nodes as needed."
      },
      {
        "line": "10",
        "lines": "10",
        "code": "curr['#'] = True",
        "codeSnippet": "curr['#'] = True",
        "explanation": "Uses sentinel key \"#\" to mark word termination."
      }
    ],
    "edgeCases": [
      {
        "case": "Searching prefix that is not a full word",
        "handling": "search(\"app\") returns False if is_end_of_word is False, but starts_with(\"app\") returns True.",
        "example": "Dictionary contains only \"apple\""
      },
      {
        "case": "Empty String",
        "handling": "Root node marked is_end_of_word = True.",
        "example": "insert(\"\")"
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Returning True in search() just because the prefix path exists.",
        "solution": "Must check `node.is_end_of_word` for search(), but not for startsWith()."
      },
      {
        "mistake": "Using an array of size 26 when input contains uppercase or Unicode characters.",
        "solution": "Use a Python dictionary `node.children = {}` for dynamic Unicode character handling."
      }
    ],
    "applications": [
      {
        "industry": "Search Engines & Mobile Keyboards",
        "application": "T9 and Predictive Autocomplete",
        "benefit": "Suggests next word completions in under 1 millisecond as the user types each keystroke."
      },
      {
        "industry": "IP Networking",
        "application": "Longest Prefix Match Routing",
        "benefit": "Routers match incoming packet IP addresses against subnet routing tables using binary tries."
      }
    ],
    "practiceQuestions": [
      {
        "id": "dsa-3-8-q1",
        "question": "What is the advantage of a Trie over a Hash Table for string storage?",
        "hint": "Can a hash table answer \"find all words starting with X\" in O(L)?",
        "answer": "A hash table cannot perform prefix searches without scanning all keys in O(N). A Trie answers prefix queries in O(L) time and naturally outputs words in sorted alphabetical order."
      },
      {
        "id": "dsa-3-8-q2",
        "question": "How can a Binary Trie be used to find the maximum XOR pair in an array?",
        "hint": "Each number is a 32-bit binary string.",
        "answer": "Insert each number as a 32-bit binary string. For query number X, greedily traverse the opposite bit (1 - bit) at each level to maximize XOR bit output."
      },
      {
        "id": "dsa-3-8-q3",
        "question": "What is a Radix Tree (Compact Trie) and how does it save space?",
        "hint": "Consider single child chains like [c] -> [a] -> [t].",
        "answer": "A Radix Tree compresses every path of non-branching nodes into a single edge containing a multi-character string (e.g. edge labeled \"cat\"), reducing total node count."
      }
    ],
    "quiz": [
      {
        "id": "dsa-3-8-quiz-1",
        "question": "What is the time complexity of searching for a word of length L in a Trie containing N words?",
        "options": [
          "O(L)",
          "O(N)",
          "O(N * L)",
          "O(log N)"
        ],
        "correctIndex": 0,
        "explanation": "Trie search follows L edges corresponding to the characters of the word, taking O(L) time completely independent of dictionary size N."
      },
      {
        "id": "dsa-3-8-quiz-2",
        "question": "What distinguishes `search(word)` from `startsWith(prefix)` in a Trie implementation?",
        "options": [
          "search() verifies that `is_end_of_word` is True at the final node; startsWith() only verifies that the path exists",
          "startsWith() is slower than search()",
          "search() only works on numbers",
          "startsWith() starts from the leaves"
        ],
        "correctIndex": 0,
        "explanation": "`startsWith` succeeds as long as all prefix edges exist, while `search` requires the final node to have its `is_end_of_word` flag set."
      },
      {
        "id": "dsa-3-8-quiz-3",
        "question": "In what order does a preorder DFS traversal of a Trie visit stored words?",
        "options": [
          "Alphabetical (Lexicographical) order",
          "Reverse order",
          "Random order",
          "Length order"
        ],
        "correctIndex": 0,
        "explanation": "Traversing child nodes in alphabetical order visits words in strict lexicographical order, acting as an implicit Radix Sort."
      }
    ],
    "codingChallenge": {
      "title": "Design Add and Search Words Data Structure",
      "problem": "Design a data structure that supports adding new words and finding if a string matches any previously added string. Word search can contain the dot character \".\" where dots can match any letter.",
      "hints": [
        "Use a standard Trie node structure.",
        "When character is a dot \".\", recursively branch on all child nodes at that level.",
        "When character is a letter, proceed down the specific child edge."
      ],
      "starterCode": "class WordDictionary:\n    def __init__(self):\n        self.root = {}\n\n    def add_word(self, word: str) -> None:\n        node = self.root\n        for ch in word:\n            if ch not in node: node[ch] = {}\n            node = node[ch]\n        node['#'] = True\n\n    def search(self, word: str) -> bool:\n        def dfs(idx, node):\n            if idx == len(word):\n                return '#' in node\n            ch = word[idx]\n            if ch == '.':\n                for child_key, child_node in node.items():\n                    if child_key != '#' and dfs(idx + 1, child_node):\n                        return True\n                return False\n            else:\n                if ch not in node: return False\n                return dfs(idx + 1, node[ch])\n        return dfs(0, self.root)\n\nwd = WordDictionary()\nwd.add_word(\"bad\")\nwd.add_word(\"dad\")\nwd.add_word(\"mad\")\nprint(\"Search 'pad':\", wd.search(\"pad\")) # Expected: False\nprint(\"Search 'bad':\", wd.search(\"bad\")) # Expected: True\nprint(\"Search '.ad':\", wd.search(\".ad\")) # Expected: True\nprint(\"Search 'b..':\", wd.search(\"b..\")) # Expected: True",
      "solution": "class WordDictionary:\n    def __init__(self):\n        self.root = {}\n\n    def add_word(self, word: str) -> None:\n        node = self.root\n        for ch in word:\n            if ch not in node: node[ch] = {}\n            node = node[ch]\n        node['#'] = True\n\n    def search(self, word: str) -> bool:\n        def dfs(idx, node):\n            if idx == len(word):\n                return '#' in node\n            ch = word[idx]\n            if ch == '.':\n                for child_key, child_node in node.items():\n                    if child_key != '#' and dfs(idx + 1, child_node):\n                        return True\n                return False\n            else:\n                if ch not in node: return False\n                return dfs(idx + 1, node[ch])\n        return dfs(0, self.root)\n\nwd = WordDictionary()\nwd.add_word(\"bad\")\nprint(wd.search(\".ad\"))"
    },
    "summary": {
      "keyTakeaways": [
        "Tries provide O(L) prefix search, insertion, and deletion.",
        "Common prefixes share memory along single root-to-leaf paths.",
        "Autocomplete is implemented by walking to prefix node and running DFS.",
        "Wildcard searches with \".\" branch across all children via backtracking."
      ],
      "nextLessonId": "dsa-ll-singly",
      "nextLessonTitle": "Singly Linked Lists",
      "nextLessonModuleId": "dsa-module-4"
    },
    "lineByLine": [
      {
        "line": "6-9",
        "lines": "6-9",
        "code": "for ch in word:\n    if ch not in curr: curr[ch] = {}\n    curr = curr[ch]",
        "codeSnippet": "for ch in word:\n    if ch not in curr: curr[ch] = {}\n    curr = curr[ch]",
        "explanation": "Traverses nested dictionaries, creating nodes as needed."
      },
      {
        "line": "10",
        "lines": "10",
        "code": "curr['#'] = True",
        "codeSnippet": "curr['#'] = True",
        "explanation": "Uses sentinel key \"#\" to mark word termination."
      }
    ]
  }
};
