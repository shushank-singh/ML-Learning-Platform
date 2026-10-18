import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule3Data: PythonModuleData = {
  "id": "python-module-3",
  "number": 3,
  "title": "Built-in Data Structures",
  "subtitle": "Strings, Lists, Tuples, Sets, Dicts & Memory Semantics",
  "description": "Python ships with powerful built-in collections. Master all string methods and formatting, list operations and algorithms, tuple immutability, set theory operations, and the dict as a hash map. Understand slicing, unpacking, mutability, copying, and reference semantics.",
  "icon": "Database",
  "badge": "Data Structures",
  "estimatedHours": 8,
  "topicsCount": 9,
  "lessons": [
    {
      "id": "py-ds-strings-methods",
      "moduleId": "python-module-3",
      "title": "Strings and String Methods",
      "description": "split, join, strip, replace, find, upper/lower, startswith, format, and f-string advanced usage.",
      "order": 1,
      "readTimeMinutes": 22,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "py-ds-lists",
      "moduleId": "python-module-3",
      "title": "Lists: Creation, Indexing, and Operations",
      "description": "append, insert, remove, pop, sort, reverse, index, count, extend — complexity of each.",
      "order": 2,
      "readTimeMinutes": 25,
      "visualizerType": "data-structure-visual",
      "difficulty": "Beginner"
    },
    {
      "id": "py-ds-tuples",
      "moduleId": "python-module-3",
      "title": "Tuples and Immutability",
      "description": "Tuple creation, packing/unpacking, namedtuple, and why immutability enables hashing.",
      "order": 3,
      "readTimeMinutes": 18,
      "visualizerType": "data-structure-visual",
      "difficulty": "Beginner"
    },
    {
      "id": "py-ds-sets",
      "moduleId": "python-module-3",
      "title": "Sets and Set Operations",
      "description": "union, intersection, difference, symmetric_difference, frozenset, and set comprehensions.",
      "order": 4,
      "readTimeMinutes": 20,
      "visualizerType": "data-structure-visual",
      "difficulty": "Beginner"
    },
    {
      "id": "py-ds-dictionaries",
      "moduleId": "python-module-3",
      "title": "Dictionaries: Key-Value Storage",
      "description": "get, update, items, keys, values, defaultdict, Counter, and OrderedDict.",
      "order": 5,
      "readTimeMinutes": 25,
      "visualizerType": "data-structure-visual",
      "difficulty": "Beginner"
    },
    {
      "id": "py-ds-slicing",
      "moduleId": "python-module-3",
      "title": "Slicing and Unpacking",
      "description": "Extended slice notation [start:stop:step], starred unpacking, and swap without temp variable.",
      "order": 6,
      "readTimeMinutes": 20,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-ds-mutability",
      "moduleId": "python-module-3",
      "title": "Mutability and Immutability",
      "description": "Mutable vs immutable types, unexpected aliasing bugs, and how Python stores objects in memory.",
      "order": 7,
      "readTimeMinutes": 22,
      "visualizerType": "memory-model",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-ds-copying",
      "moduleId": "python-module-3",
      "title": "Copying and References",
      "description": "Assignment creates references, copy.copy() vs copy.deepcopy(), and list slicing as shallow copy.",
      "order": 8,
      "readTimeMinutes": 22,
      "visualizerType": "memory-model",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-ds-nested",
      "moduleId": "python-module-3",
      "title": "Nested Data Structures",
      "description": "Lists of dicts, dicts of lists, 2D matrices, and JSON-like structures in Python.",
      "order": 9,
      "readTimeMinutes": 22,
      "visualizerType": "data-structure-visual",
      "difficulty": "Intermediate"
    }
  ]
};

export const pythonModule3Lessons: Record<string, PythonLessonContent> = {
  "py-ds-lists": {
    "id": "py-ds-lists",
    "moduleId": "python-module-3",
    "title": "Python Lists: Dynamic Arrays, Indexing, and Core Operations",
    "subtitle": "Internal Memory Structure, Amortized O(1) Growth, Slicing, and Built-in Methods",
    "order": 2,
    "readTimeMinutes": 25,
    "difficulty": "Beginner",
    "visualizerType": "data-structure-visual",
    "objectives": [
      "Understand how Python lists are implemented under the hood as dynamic arrays of object pointers.",
      "Master positive indexing (0 to n-1) and negative indexing (-n to -1).",
      "Understand the time complexity of append (amortized O(1)) vs insert/pop at index 0 (O(n)).",
      "Master the full list API: append, extend, insert, pop, remove, index, count, sort, reverse.",
      "Avoid classic list pitfalls like modifying a list while iterating over it."
    ],
    "prerequisites": [
      "Python primitive types and variables."
    ],
    "previousLesson": {
      "id": "py-ds-strings-methods",
      "title": "Strings and String Methods",
      "moduleId": "python-module-3"
    },
    "analogy": {
      "title": "The Expandable Train of Flatcars",
      "text": "Imagine a freight train where each flatcar holds a slip of paper with a GPS coordinate to an item somewhere in the country. The train cars themselves are coupled contiguously on tracks (memory). When you look up car #3, the engineer can walk straight to it in O(1) time. When the train runs out of flatcars, the railway company doesn't just add 1 car; they double the length of the train track (over-allocation) so future additions are instantaneous.",
      "metaphor": "list = contiguous array of pointer references; over-allocation = pre-laying track for future growth; O(1) append = putting cargo on an empty pre-allocated car."
    },
    "problemSolved": {
      "title": "Dynamic Sequential Data with Random Access",
      "description": "Fixed arrays require declaring size at compile time and cannot hold heterogeneous types. Python lists provide an ordered, mutable sequence that grows and shrinks dynamically, stores arbitrary object references, and offers instant O(1) random indexing.",
      "keyPoints": [
        "Dynamic capacity resizing: Over-allocates slots so appending elements costs amortized O(1) time.",
        "Heterogeneous storage: Because it stores pointers, a single list can contain ints, strings, functions, and other lists.",
        "Negative indexing: Immediate, convenient access from the tail without needing len(seq) - 1 syntax."
      ]
    },
    "intuition": {
      "overview": "In CPython, a list is represented by PyListObject, which contains an array of pointers (ob_item) and an allocated capacity counter (allocated).",
      "steps": [
        {
          "step": 1,
          "title": "Memory Contiguity of Pointers",
          "description": "The pointer array is contiguous in memory. Getting list[i] is a direct pointer calculation: base_address + i * 8 bytes."
        },
        {
          "step": 2,
          "title": "Amortized O(1) Appends via Geometric Growth",
          "description": "When allocated capacity is exceeded, CPython reallocates with an expansion formula (~1.125x + 3 to 6). Reallocations are rare, yielding amortized O(1) append."
        },
        {
          "step": 3,
          "title": "Cost of Shifting Elements",
          "description": "Inserting or popping at index 0 requires shifting every existing pointer down by 1 position — an O(n) operation. For frequent left-end operations, collections.deque should be used."
        }
      ]
    },
    "codeExample": {
      "title": "Core List Operations and Performance Invariants",
      "code": "# 1. Creating and indexing\nfruits = [\"apple\", \"banana\", \"cherry\"]\nprint(\"First:\", fruits[0])     # O(1) positive indexing\nprint(\"Last:\", fruits[-1])     # O(1) negative indexing\n\n# 2. Dynamic growth\nfruits.append(\"date\")          # O(1) amortized\nfruits.extend([\"elderberry\", \"fig\"])  # Appends multiple items\n\n# 3. Inserting and removing\nfruits.insert(1, \"blueberry\")  # O(n) shifts elements right\npopped_item = fruits.pop()     # O(1) removes and returns last item\nfruits.remove(\"banana\")        # O(n) finds and deletes first match\n\n# 4. In-place sorting and reversal\nfruits.sort(reverse=True)      # Timsort: O(n log n)\nprint(\"Sorted descending:\", fruits)",
      "explanation": "Notice the difference between append() and extend(): append adds its argument as a single element, while extend iterates over its argument and adds each element individually."
    },
    "runnableCode": {
      "code": "# Interactive list exploration\nnums = [10, 20, 30, 40, 50]\n\nprint(\"Slice [1:4]:\", nums[1:4])\nprint(\"Step slice [::2]:\", nums[::2])\nprint(\"Reversed slice [::-1]:\", nums[::-1])\n\n# In-place sort vs sorted()\nunsorted = [4, 1, 9, 3]\nsorted_copy = sorted(unsorted)\nprint(f\"Original: {unsorted}, New: {sorted_copy}\")\n\nunsorted.sort()\nprint(f\"Mutated original: {unsorted}\")",
      "expectedOutput": "Slice [1:4]: [20, 30, 40]\nStep slice [::2]: [10, 30, 50]\nReversed slice [::-1]: [50, 40, 30, 20, 10]\nOriginal: [4, 1, 9, 3], New: [1, 3, 4, 9]\nMutated original: [1, 3, 4, 9]"
    },
    "lineByLineExplanation": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "fruits = [\"apple\", \"banana\", \"cherry\"]",
        "codeSnippet": "fruits = [\"apple\", \"banana\", \"cherry\"]",
        "explanation": "Creates a list with 3 string pointers. In CPython, initial allocation sets capacity to 3."
      },
      {
        "line": "4-5",
        "lines": "4-5",
        "code": "fruits[0] / fruits[-1]",
        "codeSnippet": "fruits[0] / fruits[-1]",
        "explanation": "Zero-based indexing reads directly from slot 0. Negative indexing resolves fruits[len + index], so fruits[-1] reads fruits[3 + (-1)] = fruits[2]."
      },
      {
        "line": "7-8",
        "lines": "7-8",
        "code": "fruits.append(\"date\")",
        "codeSnippet": "fruits.append(\"date\")",
        "explanation": "Appends to the end in amortized O(1). If capacity is full, triggers over-allocation before writing."
      },
      {
        "line": "10-11",
        "lines": "10-11",
        "code": "fruits.insert(1, \"blueberry\")",
        "codeSnippet": "fruits.insert(1, \"blueberry\")",
        "explanation": "Memmoves elements from index 1 onward one slot to the right, taking O(n) time, then writes pointer at index 1."
      },
      {
        "line": "13-15",
        "lines": "13-15",
        "code": "fruits.sort(reverse=True)",
        "codeSnippet": "fruits.sort(reverse=True)",
        "explanation": "Executes Timsort directly on the underlying pointer array in-place with O(n log n) worst-case time and O(n) space."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Modifying a list while iterating over it",
        "solution": "Iterate over a shallow copy \"for item in my_list[:]:\" or use a list comprehension \"[x for x in my_list if condition]\"."
      },
      {
        "mistake": "Using list multiplication with nested lists: [[0] * 3] * 3",
        "solution": "Use a list comprehension: [[0 for _ in range(3)] for _ in range(3)] to create independent inner lists instead of duplicating references."
      },
      {
        "mistake": "Confusing .sort() and sorted()",
        "solution": "Use my_list.sort() when mutating in place. Use res = sorted(my_list) when you need a new sorted copy because .sort() returns None."
      },
      {
        "mistake": "Using list as a FIFO queue with pop(0)",
        "solution": "Use collections.deque for O(1) appendleft() and popleft() instead of list.pop(0) which is O(n)."
      }
    ],
    "bestPractices": [
      "Use list comprehensions \"[x for x in items if cond]\" instead of map/filter or manual append loops.",
      "Use collections.deque when implementing queues or BFS algorithm (O(1) popleft vs O(n) pop(0)).",
      "Use enumerate(items) when you need both the index and the value in a for loop.",
      "Use \"item in my_set\" instead of \"item in my_list\" for membership checks when querying large datasets (O(1) vs O(n)).",
      "Avoid mutable default arguments like \"def fn(items=[])\". Default arguments are evaluated once at definition time."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "application": "Batch Processing",
        "benefit": "Filtering, transforming, and batching tabular records prior to loading into databases or DataFrames."
      },
      {
        "industry": "Algorithm Implementation",
        "application": "Stack and Matrix Operations",
        "benefit": "Implementing stacks (append/pop), backtracking candidate lists, and matrix grids."
      },
      {
        "industry": "Web Scraping",
        "application": "DOM Element Extraction",
        "benefit": "Collecting extracted URLs or text nodes from DOM trees before batch processing."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-list-q1",
        "question": "Why does \"a = [[0] * 3] * 3; a[0][0] = 1\" change the first element of all three sublists?",
        "hint": "Think about whether outer multiplication duplicates inner list objects or their references.",
        "answer": "The list multiplication operator \"*\" creates shallow copies of references. \"[0] * 3\" creates one list [0, 0, 0]. The outer \"* 3\" copies the pointer to that exact same inner list three times. Modifying a[0][0] mutates the single shared inner list."
      },
      {
        "id": "py-list-q2",
        "question": "What is the time complexity of \"my_list.insert(0, val)\" versus \"my_list.append(val)\"?",
        "hint": "Consider what memory operations must occur when an element is inserted at the front versus the back.",
        "answer": "\"my_list.append(val)\" is amortized O(1) because elements are placed at the end into pre-allocated memory. \"my_list.insert(0, val)\" is O(n) because all existing n elements must be shifted right by one position in memory."
      },
      {
        "id": "py-list-q3",
        "question": "How does Python slice notation a[::-1] reverse a list?",
        "hint": "Review slice parameters: [start:stop:step] when step is negative.",
        "answer": "The slice syntax is [start:stop:step]. When step is negative (-1) and start/stop are omitted, Python traverses the array backwards from index n-1 down to index 0, producing a new reversed copy in O(n) time."
      }
    ],
    "quiz": [
      {
        "id": "py-list-quiz-1",
        "question": "What does \"nums = [1, 2, 3]; result = nums.sort()\" store in \"result\"?",
        "options": [
          "[1, 2, 3]",
          "[3, 2, 1]",
          "None",
          "A copy of the sorted list"
        ],
        "correctIndex": 2,
        "explanation": "In Python, methods that mutate a collection in-place (like .sort(), .reverse(), .append()) return None by design to prevent confusing in-place mutation with new object creation."
      },
      {
        "id": "py-list-quiz-2",
        "question": "Which of the following creates a truly independent 3x3 2D list of zeros without shared references?",
        "options": [
          "[[0] * 3] * 3",
          "[[0 for _ in range(3)] for _ in range(3)]",
          "[[0] * 3 for _ in range(3)] (creates shared integers)",
          "[0] * 9"
        ],
        "correctIndex": 1,
        "explanation": "Using nested comprehensions evaluates the inner list creation 3 separate times, guaranteeing three distinct list objects in memory."
      },
      {
        "id": "py-list-quiz-3",
        "question": "What is the worst-case time complexity of finding an element using \"x in my_list\"?",
        "options": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n log n)"
        ],
        "correctIndex": 2,
        "explanation": "A Python list is an unsorted dynamic array. Membership checking requires linear scan from index 0 to n-1, taking O(n) worst-case time."
      },
      {
        "id": "py-list-quiz-4",
        "question": "What does \"list[-2]\" return for a list of 5 elements [10, 20, 30, 40, 50]?",
        "options": [
          "10",
          "20",
          "40",
          "50"
        ],
        "correctIndex": 2,
        "explanation": "Negative indexing counts backwards from the end: -1 is the last element (50), -2 is the second-to-last element (40)."
      }
    ],
    "codingChallenge": {
      "title": "Rotate List Right by K Positions",
      "problem": "Given a list of integers \"nums\" and an integer \"k\", rotate the list to the right by k steps in O(n) time. For example, nums = [1, 2, 3, 4, 5], k = 2 -> output: [4, 5, 1, 2, 3]. Use slicing to return the rotated list.",
      "hints": [
        "Normalize k using modulo: k = k % len(nums). If k is a multiple of len(nums), no rotation is needed.",
        "The last k elements will become the new head: nums[-k:].",
        "The first (n - k) elements will become the new tail: nums[:-k]."
      ],
      "starterCode": "def rotate_right(nums, k):\n    # Handle empty list or k == 0\n    if not nums:\n        return nums\n    \n    # Your code here using slicing\n    return nums\n\n# Test case:\nprint(rotate_right([1, 2, 3, 4, 5], 2))  # Expected: [4, 5, 1, 2, 3]\nprint(rotate_right([10, 20, 30], 4))     # Expected: [30, 10, 20]",
      "solution": "def rotate_right(nums, k):\n    if not nums:\n        return nums\n    n = len(nums)\n    k = k % n  # Normalize k if k > n\n    if k == 0:\n        return nums[:]\n    return nums[-k:] + nums[:-k]\n\n# Test cases:\nprint(rotate_right([1, 2, 3, 4, 5], 2))  # [4, 5, 1, 2, 3]\nprint(rotate_right([10, 20, 30], 4))     # [30, 10, 20]"
    },
    "summary": {
      "keyTakeaways": [
        "Python lists are dynamic arrays of object pointers in contiguous memory.",
        "Indexing list[i] is O(1); appending to the end is amortized O(1).",
        "insert(0) and pop(0) are O(n); use collections.deque for queue workloads.",
        "Slicing [start:stop:step] returns a new shallow copy of the sublist.",
        "Never modify a list while iterating over it; iterate over a copy or use a comprehension."
      ],
      "nextLessonId": "py-ds-tuples",
      "nextLessonTitle": "Tuples and Immutability",
      "nextLessonModuleId": "python-module-3"
    },
    "lineByLine": [
      {
        "line": "1-3",
        "lines": "1-3",
        "code": "fruits = [\"apple\", \"banana\", \"cherry\"]",
        "codeSnippet": "fruits = [\"apple\", \"banana\", \"cherry\"]",
        "explanation": "Creates a list with 3 string pointers. In CPython, initial allocation sets capacity to 3."
      },
      {
        "line": "4-5",
        "lines": "4-5",
        "code": "fruits[0] / fruits[-1]",
        "codeSnippet": "fruits[0] / fruits[-1]",
        "explanation": "Zero-based indexing reads directly from slot 0. Negative indexing resolves fruits[len + index], so fruits[-1] reads fruits[3 + (-1)] = fruits[2]."
      },
      {
        "line": "7-8",
        "lines": "7-8",
        "code": "fruits.append(\"date\")",
        "codeSnippet": "fruits.append(\"date\")",
        "explanation": "Appends to the end in amortized O(1). If capacity is full, triggers over-allocation before writing."
      },
      {
        "line": "10-11",
        "lines": "10-11",
        "code": "fruits.insert(1, \"blueberry\")",
        "codeSnippet": "fruits.insert(1, \"blueberry\")",
        "explanation": "Memmoves elements from index 1 onward one slot to the right, taking O(n) time, then writes pointer at index 1."
      },
      {
        "line": "13-15",
        "lines": "13-15",
        "code": "fruits.sort(reverse=True)",
        "codeSnippet": "fruits.sort(reverse=True)",
        "explanation": "Executes Timsort directly on the underlying pointer array in-place with O(n log n) worst-case time and O(n) space."
      }
    ]
  },
  "py-ds-strings-methods": {
    "id": "py-ds-strings-methods",
    "moduleId": "python-module-3",
    "title": "Strings and String Methods",
    "subtitle": "Mastering split, join, strip, replace, format, and f-string Advanced Syntax",
    "order": 1,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Understand string immutability in Python and why every method returns a new string.",
      "Master string manipulation methods: split(), join(), strip(), replace(), and find().",
      "Utilize string case and validation methods: upper(), lower(), startswith(), endswith(), isdigit().",
      "Leverage modern f-string interpolation including format specifiers and debugging syntax."
    ],
    "prerequisites": [
      "Python variable assignment and basic types."
    ],
    "analogy": {
      "title": "The Inscribed Stone Tablet",
      "text": "A Python string is like a message carved into a stone tablet. You cannot erase or alter any single carved character in place. If you want to change an uppercase word or strip off trailing chips, a master stonemason carves a completely new tablet incorporating your revisions.",
      "metaphor": "Strings are immutable sequences: operations produce fresh objects, leaving originals untouched."
    },
    "problemSolved": {
      "title": "Robust Text Processing and Formatting",
      "text": "Raw textual data from logs, user inputs, and web requests is messy and unformatted. Python strings provide an extensive built-in standard library of methods for parsing, cleaning, transforming, and formatting text without external dependencies.",
      "keyPoints": [
        "Strings are immutable unicode sequences indexed from 0 to N-1 (or -1 backwards).",
        "str.join() is significantly more memory-efficient (O(N)) than repeated string concatenation (O(N^2)).",
        "f-strings evaluate expressions at runtime with high performance."
      ]
    },
    "intuition": {
      "overview": "Python strings are sequences of unicode code points. String methods are pure functions that inspect the existing string and construct a new string based on the operation.",
      "steps": [
        {
          "step": 1,
          "title": "Inspect or Clean",
          "description": "strip() removes leading/trailing whitespace, and lower()/upper() standardizes casing."
        },
        {
          "step": 2,
          "title": "Tokenize or Substitute",
          "description": "split() segments text into a list of substrings, and replace() substitutes patterns."
        },
        {
          "step": 3,
          "title": "Reassemble or Format",
          "description": "join() concatenates elements with a delimiter, and f-strings interpolate variables."
        }
      ]
    },
    "codeExample": {
      "title": "Essential String Methods and f-string Formatting",
      "code": "text = \"  Data Science and Machine Learning  \"\ncleaned = text.strip().lower()\ntokens = cleaned.split()\njoined = \"-\".join(tokens)\npi = 3.14159265\nformatted = f\"Tags: {joined} | Precision: {pi:.2f}\"\nprint(formatted)",
      "explanation": "Demonstrates whitespace stripping, case normalization, splitting by whitespace, joining with hyphens, and float format specifiers."
    },
    "runnableCode": {
      "code": "raw_log = \"2026-10-18 | ERROR | Database connection timeout\"\ndate, level, msg = [part.strip() for part in raw_log.split(\"|\")]\nprint(f\"Log Level: {level}\")\nprint(f\"Details: {msg.upper()}\")\nprint(f\"Date starts with 2026? {date.startswith('2026')}\")",
      "expectedOutput": "Log Level: ERROR\nDetails: DATABASE CONNECTION TIMEOUT\nDate starts with 2026? True"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "raw_log = \"2026-10-18 | ERROR | Database connection timeout\"",
        "codeSnippet": "raw_log = \"2026-10-18 | ERROR | Database connection timeout\"",
        "explanation": "Initializes a pipe-delimited log entry string."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "date, level, msg = [part.strip() for part in raw_log.split(\"|\")]",
        "codeSnippet": "date, level, msg = [part.strip() for part in raw_log.split(\"|\")]",
        "explanation": "Splits on \"|\" and strips surrounding whitespace from each token via a comprehension."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(f\"Log Level: {level}\")",
        "codeSnippet": "print(f\"Log Level: {level}\")",
        "explanation": "Formats string interpolating the extracted level variable."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "print(f\"Details: {msg.upper()}\")",
        "codeSnippet": "print(f\"Details: {msg.upper()}\")",
        "explanation": "Invokes upper() on msg to transform it to capital letters."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(f\"Date starts with 2026? {date.startswith('2026')}\")",
        "codeSnippet": "print(f\"Date starts with 2026? {date.startswith('2026')}\")",
        "explanation": "Checks prefix match returning a boolean."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Attempting to mutate string characters by index (s[0] = \"X\").",
        "solution": "Create a new string using slicing or concatenation: s = \"X\" + s[1:].",
        "whyWrong": "Python strings are immutable. Doing this raises TypeError: 'str' object does not support item assignment.",
        "howToFix": "Create a new string using slicing or concatenation: s = \"X\" + s[1:]."
      },
      {
        "mistake": "Using repeated `+` concatenation inside loops to build large strings.",
        "solution": "Collect substrings into a list and use `\"\".join(chunks)` for linear O(N) performance.",
        "whyWrong": "Creates an intermediate string at every step, resulting in O(N^2) memory copies.",
        "howToFix": "Collect substrings into a list and use `\"\".join(chunks)` for linear O(N) performance."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Log File Ingestion",
        "description": "Parsing system logs into structured timestamps, levels, and payloads."
      },
      {
        "title": "NLP Text Preprocessing",
        "description": "Tokenizing, lowercasing, and cleaning natural language corpora before vectorization."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-strings-methods-pq1",
        "question": "Why does \"hello\".upper() not change the original variable if we just call it?",
        "hint": "Consider string mutability.",
        "answer": "Strings are immutable. Calling .upper() returns a new string; you must reassign it (s = s.upper()) to update the variable."
      },
      {
        "id": "py-ds-strings-methods-pq2",
        "question": "What does \".\".join([\"a\", \"b\", \"c\"]) output?",
        "hint": "The caller string is the delimiter placed between elements.",
        "answer": "It produces \"a.b.c\"."
      },
      {
        "id": "py-ds-strings-methods-pq3",
        "question": "What is the syntax in an f-string to format a float with 4 decimal places?",
        "hint": "Colon followed by dot and precision.",
        "answer": "f\"{value:.4f}\""
      }
    ],
    "quiz": [
      {
        "id": "py-ds-strings-methods-q1",
        "question": "What is the result of \"python\".replace(\"p\", \"P\")?",
        "options": [
          "\"Python\"",
          "None (in-place modification)",
          "Raises TypeError",
          "\"python\""
        ],
        "correctIndex": 0,
        "explanation": "replace() returns a new string copy with the substitution made."
      },
      {
        "id": "py-ds-strings-methods-q2",
        "question": "Which string method removes both leading and trailing whitespace?",
        "options": [
          "trim()",
          "strip()",
          "clean()",
          "rstrip()"
        ],
        "correctIndex": 1,
        "explanation": "In Python, strip() removes leading and trailing whitespace (lstrip is leading only, rstrip trailing only)."
      },
      {
        "id": "py-ds-strings-methods-q3",
        "question": "What does the expression f\"{10 * 5 = }\" output in Python 3.8+?",
        "options": [
          "\"50\"",
          "\"10 * 5 = 50\"",
          "\"10 * 5\"",
          "SyntaxError"
        ],
        "correctIndex": 1,
        "explanation": "The `=` specifier in f-strings outputs both the expression text and its evaluated result, making it great for debugging."
      }
    ],
    "codingChallenge": {
      "title": "Clean and Format CSV Header",
      "problem": "Write a function `clean_header(raw_header: str) -> list[str]` that takes a comma-separated string of column names with inconsistent casing and extra spaces (e.g. \" First Name , LAST_name , user-id \"), strips extra spaces, replaces dashes with underscores, and converts all names to lowercase.",
      "hints": [
        "Split raw_header by \",\" to get individual column tokens.",
        "For each column token, use .strip(), .lower(), and .replace(\"-\", \"_\")."
      ],
      "starterCode": "def clean_header(raw_header: str) -> list[str]:\n    # Write your solution here\n    pass",
      "solution": "def clean_header(raw_header: str) -> list[str]:\n    return [col.strip().lower().replace(\"-\", \"_\") for col in raw_header.split(\",\") if col.strip()]",
      "testCases": [
        {
          "input": "\" First Name , LAST_name , user-id \"",
          "expectedOutput": "[\"first name\", \"last_name\", \"user_id\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "raw_log = \"2026-10-18 | ERROR | Database connection timeout\"",
        "codeSnippet": "raw_log = \"2026-10-18 | ERROR | Database connection timeout\"",
        "explanation": "Initializes a pipe-delimited log entry string."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "date, level, msg = [part.strip() for part in raw_log.split(\"|\")]",
        "codeSnippet": "date, level, msg = [part.strip() for part in raw_log.split(\"|\")]",
        "explanation": "Splits on \"|\" and strips surrounding whitespace from each token via a comprehension."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(f\"Log Level: {level}\")",
        "codeSnippet": "print(f\"Log Level: {level}\")",
        "explanation": "Formats string interpolating the extracted level variable."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "print(f\"Details: {msg.upper()}\")",
        "codeSnippet": "print(f\"Details: {msg.upper()}\")",
        "explanation": "Invokes upper() on msg to transform it to capital letters."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(f\"Date starts with 2026? {date.startswith('2026')}\")",
        "codeSnippet": "print(f\"Date starts with 2026? {date.startswith('2026')}\")",
        "explanation": "Checks prefix match returning a boolean."
      }
    ],
    "applications": [
      {
        "industry": "Log File Ingestion",
        "application": "Parsing system logs into structured timestamps, levels, and payloads.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Log File Ingestion",
        "description": "Parsing system logs into structured timestamps, levels, and payloads."
      },
      {
        "industry": "NLP Text Preprocessing",
        "application": "Tokenizing, lowercasing, and cleaning natural language corpora before vectorization.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "NLP Text Preprocessing",
        "description": "Tokenizing, lowercasing, and cleaning natural language corpora before vectorization."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand string immutability in Python and why every method returns a new string.",
        "Master string manipulation methods: split(), join(), strip(), replace(), and find().",
        "Utilize string case and validation methods: upper(), lower(), startswith(), endswith(), isdigit()."
      ]
    }
  },
  "py-ds-tuples": {
    "id": "py-ds-tuples",
    "moduleId": "python-module-3",
    "title": "Tuples and Immutability",
    "subtitle": "Tuple Creation, Packing, Unpacking, namedtuple, and Hashability",
    "order": 3,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "data-structure-visual",
    "objectives": [
      "Understand why tuples are immutable and memory-efficient compared to lists.",
      "Master tuple packing and multiple assignment unpacking.",
      "Understand why tuples can serve as dictionary keys while lists cannot.",
      "Use collections.namedtuple for lightweight readable data records."
    ],
    "prerequisites": [
      "Python variables and list basics."
    ],
    "analogy": {
      "title": "The Permanent Passport Stamp",
      "text": "A list is a loose-leaf binder where you can add, remove, and shuffle pages anytime. A tuple is a stamped passport page: once inked and issued, its fields (entry date, location, stamp number) cannot be altered or reordered without voiding the document.",
      "metaphor": "Tuples represent fixed records: once created, the sequence and identities of their contents are locked."
    },
    "problemSolved": {
      "title": "Immutable Records and Safe Hash Keys",
      "description": "When functions need to return multiple values or map coordinates to values in a dictionary, mutable lists are unsafe because they cannot be hashed. Tuples provide a fast, memory-compact immutable collection.",
      "keyPoints": [
        "Tuples use parentheses `()` or comma separation alone `a, b = 1, 2`.",
        "Single element tuples require a trailing comma: `(42,)`.",
        "Immutability allows tuples containing only immutable items to be hashed."
      ]
    },
    "intuition": {
      "overview": "Tuples have lower memory overhead than lists because Python allocates exact memory without over-allocation buffers. Immutability guarantees write-safety.",
      "steps": [
        {
          "step": 1,
          "title": "Packing",
          "description": "Multiple comma-separated values are packed into a single tuple object."
        },
        {
          "step": 2,
          "title": "Unpacking",
          "description": "Tuple elements are assigned to separate variables in a single expression."
        },
        {
          "step": 3,
          "title": "Hashing",
          "description": "Python computes an immutable hash code allowing tuples to index dictionaries and sets."
        }
      ]
    },
    "codeExample": {
      "title": "Tuple Unpacking and namedtuple Usage",
      "code": "from collections import namedtuple\n\n# Tuple packing & unpacking\npoint = (10, 20, 30)\nx, y, z = point\n\n# namedtuple for clean self-documenting data records\nPoint3D = namedtuple('Point3D', ['x', 'y', 'z'])\np = Point3D(x=10, y=20, z=30)\nprint(f\"Point x={p.x}, y={p.y}, z={p.z}\")",
      "explanation": "Shows standard tuple unpacking followed by namedtuple creation and field access."
    },
    "runnableCode": {
      "code": "coords = (37.7749, -122.4194)\nlat, lon = coords\nprint(f\"Latitude: {lat}, Longitude: {lon}\")\n\n# Using a tuple as a dict key\nlocations = {\n    (37.7749, -122.4194): \"San Francisco\",\n    (40.7128, -74.0060): \"New York City\"\n}\nprint(f\"Located: {locations[(37.7749, -122.4194)]}\")",
      "expectedOutput": "Latitude: 37.7749, Longitude: -122.4194\nLocated: San Francisco"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "coords = (37.7749, -122.4194)",
        "codeSnippet": "coords = (37.7749, -122.4194)",
        "explanation": "Creates a 2-tuple of floating point coordinates."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "lat, lon = coords",
        "codeSnippet": "lat, lon = coords",
        "explanation": "Unpacks the tuple into two separate identifiers."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(f\"Latitude: {lat}, Longitude: {lon}\")",
        "codeSnippet": "print(f\"Latitude: {lat}, Longitude: {lon}\")",
        "explanation": "Prints the unpacked coordinate components."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "locations = { (37.7749, -122.4194): \"San Francisco\" }",
        "codeSnippet": "locations = { (37.7749, -122.4194): \"San Francisco\" }",
        "explanation": "Uses tuple as dictionary key; valid because tuples are hashable."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Writing single-element tuple without a trailing comma: `x = (42)`.",
        "solution": "Include a trailing comma: `x = (42,)`.",
        "whyWrong": "Parentheses around an expression without a comma are treated as grouping; `(42)` is simply an `int`.",
        "howToFix": "Include a trailing comma: `x = (42,)`."
      },
      {
        "mistake": "Believing a tuple is immutable when it contains mutable elements like a list.",
        "solution": "Ensure all nested elements inside tuples are also immutable if hashability is needed.",
        "whyWrong": "The tuple holds references to objects. While the references cannot change, the mutable objects they point to can still be modified in place.",
        "howToFix": "Ensure all nested elements inside tuples are also immutable if hashability is needed."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Multiple Return Values",
        "description": "Returning status codes, error messages, and payload tuples from API handlers."
      },
      {
        "title": "Coordinate & Grid Keys",
        "description": "Using (row, col) tuples as keys for graphs, game boards, and sparse matrices."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-tuples-pq1",
        "question": "What type is `x = (1)` vs `y = (1,)`?",
        "hint": "Check the presence of comma.",
        "answer": "`x` is an integer `int`, while `y` is a 1-element `tuple`."
      },
      {
        "id": "py-ds-tuples-pq2",
        "question": "Can a tuple containing a list `([1, 2], 3)` be used as a dictionary key?",
        "hint": "Check hashability of elements.",
        "answer": "No, TypeError: unhashable type: 'list' will be raised because the tuple contains an unhashable mutable list."
      },
      {
        "id": "py-ds-tuples-pq3",
        "question": "How can you swap two variables `a` and `b` in Python using tuple packing?",
        "hint": "One line multiple assignment.",
        "answer": "`a, b = b, a` packs `(b, a)` into a temporary tuple and unpacks into `a` and `b`."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-tuples-q1",
        "question": "Which of the following is an immutable sequence in Python?",
        "options": [
          "tuple",
          "list",
          "set",
          "dict"
        ],
        "correctIndex": 0,
        "explanation": "Tuples are immutable sequences; lists, sets, and dicts are all mutable."
      },
      {
        "id": "py-ds-tuples-q2",
        "question": "What happens if you run: `t = (1, 2, 3); t[0] = 99`?",
        "options": [
          "t becomes (99, 2, 3)",
          "TypeError is raised",
          "ValueError is raised",
          "t is unmodified silently"
        ],
        "correctIndex": 1,
        "explanation": "Tuples do not support item assignment; Python raises TypeError."
      },
      {
        "id": "py-ds-tuples-q3",
        "question": "Why do tuples take less memory than lists for the same elements?",
        "options": [
          "Tuples compress their data",
          "Lists allocate extra capacity buffer for dynamic appends",
          "Tuples store 16-bit pointers",
          "Python caches all tuples"
        ],
        "correctIndex": 1,
        "explanation": "Lists are dynamic arrays and over-allocate memory to achieve amortized O(1) appends, whereas tuples allocate exact length."
      }
    ],
    "codingChallenge": {
      "title": "Format Named Coordinates",
      "problem": "Write a function `format_cities(city_tuples: list[tuple[str, float, float]]) -> list[str]` where each tuple is `(city_name, lat, lon)`. Return a list of formatted strings: `\"CityName: (Lat, Lon)\"` rounded to 2 decimal places.",
      "hints": [
        "Iterate through city_tuples unpacking (city, lat, lon).",
        "Use f-string f\"{city}: ({lat:.2f}, {lon:.2f})\"."
      ],
      "starterCode": "def format_cities(city_tuples: list[tuple[str, float, float]]) -> list[str]:\n    # Write your solution here\n    pass",
      "solution": "def format_cities(city_tuples: list[tuple[str, float, float]]) -> list[str]:\n    return [f\"{city}: ({lat:.2f}, {lon:.2f})\" for city, lat, lon in city_tuples]",
      "testCases": [
        {
          "input": "[(\"Paris\", 48.8566, 2.3522)]",
          "expectedOutput": "[\"Paris: (48.86, 2.35)\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "coords = (37.7749, -122.4194)",
        "codeSnippet": "coords = (37.7749, -122.4194)",
        "explanation": "Creates a 2-tuple of floating point coordinates."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "lat, lon = coords",
        "codeSnippet": "lat, lon = coords",
        "explanation": "Unpacks the tuple into two separate identifiers."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(f\"Latitude: {lat}, Longitude: {lon}\")",
        "codeSnippet": "print(f\"Latitude: {lat}, Longitude: {lon}\")",
        "explanation": "Prints the unpacked coordinate components."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "locations = { (37.7749, -122.4194): \"San Francisco\" }",
        "codeSnippet": "locations = { (37.7749, -122.4194): \"San Francisco\" }",
        "explanation": "Uses tuple as dictionary key; valid because tuples are hashable."
      }
    ],
    "applications": [
      {
        "industry": "Multiple Return Values",
        "application": "Returning status codes, error messages, and payload tuples from API handlers.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Multiple Return Values",
        "description": "Returning status codes, error messages, and payload tuples from API handlers."
      },
      {
        "industry": "Coordinate & Grid Keys",
        "application": "Using (row, col) tuples as keys for graphs, game boards, and sparse matrices.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Coordinate & Grid Keys",
        "description": "Using (row, col) tuples as keys for graphs, game boards, and sparse matrices."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand why tuples are immutable and memory-efficient compared to lists.",
        "Master tuple packing and multiple assignment unpacking.",
        "Understand why tuples can serve as dictionary keys while lists cannot."
      ]
    }
  },
  "py-ds-sets": {
    "id": "py-ds-sets",
    "moduleId": "python-module-3",
    "title": "Sets and Set Operations",
    "subtitle": "O(1) Membership Testing, Set Theory Operations, and frozenset",
    "order": 4,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "data-structure-visual",
    "objectives": [
      "Understand how sets use hash tables for O(1) average-time lookups and insertions.",
      "Master mathematical set operations: union (|), intersection (&), difference (-), and symmetric difference (^).",
      "Remove duplicates from sequences efficiently using set().",
      "Understand when and why to use immutable frozenset."
    ],
    "prerequisites": [
      "Python lists and hashing intuition."
    ],
    "analogy": {
      "title": "The VIP Guest Registry",
      "text": "A list of party guests is like a paper clipboard where the bouncer must read every name from top to bottom (O(N)) to check if you are allowed in. A set is like a digital biometric scanner with a hash registry: the bouncer scans your fingerprint and in a millisecond know whether you are on the list (O(1)).",
      "metaphor": "Sets store unique hashable items with near-instant O(1) lookup."
    },
    "problemSolved": {
      "title": "Instant Deduplication and Fast Membership Checks",
      "description": "Checking `item in my_list` takes O(N) time, making it quadratic O(N^2) for batch checks. Sets provide average O(1) membership testing and concise mathematical operations for data comparison.",
      "keyPoints": [
        "Sets contain only unique items; duplicates are automatically discarded.",
        "Set elements must be hashable (immutable types like int, str, tuple).",
        "frozenset is an immutable variant of set that can be hashed and nested."
      ]
    },
    "intuition": {
      "overview": "A set is essentially a hash map where keys are stored without associated values. Python computes hash(item) to place it into an internal hash table.",
      "steps": [
        {
          "step": 1,
          "title": "Hash Computation",
          "description": "item hash code is computed and mapped to an internal bucket index."
        },
        {
          "step": 2,
          "title": "Collision Handling",
          "description": "Open addressing with perturbation probing resolves any hash collisions."
        },
        {
          "step": 3,
          "title": "O(1) Set Math",
          "description": "Intersection and union perform fast bucket lookups across two sets."
        }
      ]
    },
    "codeExample": {
      "title": "Set Operations and Operators",
      "code": "backend_devs = {\"Alice\", \"Bob\", \"Charlie\"}\nfrontend_devs = {\"Bob\", \"Diana\", \"Eve\"}\n\n# Set Theory Operations\nall_devs = backend_devs | frontend_devs           # Union\nfullstack_devs = backend_devs & frontend_devs      # Intersection\npure_backend = backend_devs - frontend_devs        # Difference\nsingle_specialty = backend_devs ^ frontend_devs    # Symmetric Difference\n\nprint(f\"Fullstack: {fullstack_devs}\")\nprint(f\"Backend only: {pure_backend}\")",
      "explanation": "Demonstrates the standard mathematical operators for union, intersection, difference, and symmetric difference."
    },
    "runnableCode": {
      "code": "nums = [1, 2, 2, 3, 4, 4, 4, 5]\nunique_nums = set(nums)\nprint(f\"Unique count: {len(unique_nums)}\")\nprint(f\"Is 3 present? {3 in unique_nums}\")\n\ns1 = {1, 2, 3}\ns2 = {3, 4, 5}\nprint(f\"Common elements: {s1.intersection(s2)}\")",
      "expectedOutput": "Unique count: 5\nIs 3 present? True\nCommon elements: {3}"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "nums = [1, 2, 2, 3, 4, 4, 4, 5]",
        "codeSnippet": "nums = [1, 2, 2, 3, 4, 4, 4, 5]",
        "explanation": "A list containing multiple duplicate integers."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "unique_nums = set(nums)",
        "codeSnippet": "unique_nums = set(nums)",
        "explanation": "Converts list to set, eliminating all duplicates in O(N) time."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(f\"Unique count: {len(unique_nums)}\")",
        "codeSnippet": "print(f\"Unique count: {len(unique_nums)}\")",
        "explanation": "Prints the number of distinct elements (5)."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "print(f\"Is 3 present? {3 in unique_nums}\")",
        "codeSnippet": "print(f\"Is 3 present? {3 in unique_nums}\")",
        "explanation": "Checks membership in average O(1) time."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Creating an empty set using `{}`: `empty = {}`.",
        "solution": "Always use `empty = set()` to instantiate an empty set.",
        "whyWrong": "`{}` creates an empty dictionary `dict`, not a set.",
        "howToFix": "Always use `empty = set()` to instantiate an empty set."
      },
      {
        "mistake": "Attempting to store a list inside a set: `s = {[1, 2], [3, 4]}`.",
        "solution": "Use tuples for nested sequence data: `s = {(1, 2), (3, 4)}`.",
        "whyWrong": "Lists are mutable and unhashable, raising `TypeError: unhashable type: 'list'`.",
        "howToFix": "Use tuples for nested sequence data: `s = {(1, 2), (3, 4)}`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Duplicate Filtering",
        "description": "Deduplicating millions of product IDs or user queries in data pipelines."
      },
      {
        "title": "Permission Checking",
        "description": "Calculating role unions and intersection with required feature flags."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-sets-pq1",
        "question": "What is the average time complexity of checking `item in my_set`?",
        "hint": "Hash table lookup time.",
        "answer": "O(1) average time."
      },
      {
        "id": "py-ds-sets-pq2",
        "question": "How do you create an immutable set in Python?",
        "hint": "Special built-in type name.",
        "answer": "Use `frozenset([1, 2, 3])`."
      },
      {
        "id": "py-ds-sets-pq3",
        "question": "What does `A ^ B` compute for two sets?",
        "hint": "Elements in A or B, but not both.",
        "answer": "Symmetric difference: elements that belong to either A or B, but not both."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-sets-q1",
        "question": "What is `type({})` in Python?",
        "options": [
          "set",
          "dict",
          "frozenset",
          "tuple"
        ],
        "correctIndex": 1,
        "explanation": "`{}` creates an empty dict; use `set()` to create an empty set."
      },
      {
        "id": "py-ds-sets-q2",
        "question": "What happens when you add a duplicate item to an existing set?",
        "options": [
          "ValueError is raised",
          "It silently does nothing",
          "It overwrites the set",
          "It raises KeyError"
        ],
        "correctIndex": 1,
        "explanation": "Sets enforce uniqueness; adding an element that already exists is a silent no-op."
      },
      {
        "id": "py-ds-sets-q3",
        "question": "Which operation finds elements that exist in Set A but NOT in Set B?",
        "options": [
          "A | B",
          "A & B",
          "A - B",
          "A ^ B"
        ],
        "correctIndex": 2,
        "explanation": "The difference operator `A - B` returns elements in A that are not in B."
      }
    ],
    "codingChallenge": {
      "title": "Find Common and Unique Words",
      "problem": "Write a function `analyze_texts(text1: str, text2: str) -> dict[str, set[str]]` that parses two strings into sets of lowercase words, and returns a dictionary with keys: `\"common\"` (words in both), `\"only_first\"` (words only in text1), and `\"total_unique\"` (all distinct words across both).",
      "hints": [
        "Split texts into sets using set(text.lower().split()).",
        "Use & for common, - for only_first, and | for total_unique."
      ],
      "starterCode": "def analyze_texts(text1: str, text2: str) -> dict[str, set[str]]:\n    # Write your solution here\n    pass",
      "solution": "def analyze_texts(text1: str, text2: str) -> dict[str, set[str]]:\n    s1 = set(text1.lower().split())\n    s2 = set(text2.lower().split())\n    return {\n        \"common\": s1 & s2,\n        \"only_first\": s1 - s2,\n        \"total_unique\": s1 | s2\n    }",
      "testCases": [
        {
          "input": "\"apple banana orange\", \"banana grape apple\"",
          "expectedOutput": "{\"common\": {\"apple\", \"banana\"}, \"only_first\": {\"orange\"}, \"total_unique\": {\"apple\", \"banana\", \"grape\", \"orange\"}}"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "nums = [1, 2, 2, 3, 4, 4, 4, 5]",
        "codeSnippet": "nums = [1, 2, 2, 3, 4, 4, 4, 5]",
        "explanation": "A list containing multiple duplicate integers."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "unique_nums = set(nums)",
        "codeSnippet": "unique_nums = set(nums)",
        "explanation": "Converts list to set, eliminating all duplicates in O(N) time."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(f\"Unique count: {len(unique_nums)}\")",
        "codeSnippet": "print(f\"Unique count: {len(unique_nums)}\")",
        "explanation": "Prints the number of distinct elements (5)."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "print(f\"Is 3 present? {3 in unique_nums}\")",
        "codeSnippet": "print(f\"Is 3 present? {3 in unique_nums}\")",
        "explanation": "Checks membership in average O(1) time."
      }
    ],
    "applications": [
      {
        "industry": "Duplicate Filtering",
        "application": "Deduplicating millions of product IDs or user queries in data pipelines.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Duplicate Filtering",
        "description": "Deduplicating millions of product IDs or user queries in data pipelines."
      },
      {
        "industry": "Permission Checking",
        "application": "Calculating role unions and intersection with required feature flags.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Permission Checking",
        "description": "Calculating role unions and intersection with required feature flags."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand how sets use hash tables for O(1) average-time lookups and insertions.",
        "Master mathematical set operations: union (|), intersection (&), difference (-), and symmetric difference (^).",
        "Remove duplicates from sequences efficiently using set()."
      ]
    }
  },
  "py-ds-dictionaries": {
    "id": "py-ds-dictionaries",
    "moduleId": "python-module-3",
    "title": "Dictionaries: Key-Value Storage",
    "subtitle": "Hash Tables, get(), update(), items(), defaultdict, and Counter",
    "order": 5,
    "readTimeMinutes": 25,
    "difficulty": "Beginner",
    "visualizerType": "data-structure-visual",
    "objectives": [
      "Understand how Python dictionaries implement compact hash tables with insertion order preservation.",
      "Safely query keys with .get(key, default) avoiding KeyError exceptions.",
      "Iterate over dictionaries using .keys(), .values(), and .items().",
      "Leverage collections.defaultdict and collections.Counter for frequency counting and grouping."
    ],
    "prerequisites": [
      "Python basics and set hashability."
    ],
    "analogy": {
      "title": "The Coat Check Counter",
      "text": "When you check your coat at a theater, the attendant hands you a brass ticket with number #142 (the key). When you return, they don't search every hanger in the closet; they walk directly to hanger #142 and retrieve your jacket (the value).",
      "metaphor": "Keys provide immediate O(1) retrieval of mapped values."
    },
    "problemSolved": {
      "title": "Instant Associative Lookup by Arbitrary Keys",
      "description": "Lists only allow integer index lookups. Dictionaries allow indexing by any immutable type (strings, numbers, tuples), providing the cornerstone associative data structure for Python applications.",
      "keyPoints": [
        "Since Python 3.7+, standard dicts guarantee insertion order preservation.",
        "Keys must be hashable; values can be any Python object including nested dicts.",
        "Average time complexity for lookup, insertion, and deletion is O(1)."
      ]
    },
    "intuition": {
      "overview": "CPython uses a compact hash table layout: an array of hash table indices mapping into a dense array of [hash, key, value] entries, minimizing memory waste.",
      "steps": [
        {
          "step": 1,
          "title": "Key Hashing",
          "description": "hash(key) computes a 64-bit integer index."
        },
        {
          "step": 2,
          "title": "Array Lookup",
          "description": "Direct lookup into sparse indices array identifies dense entry index."
        },
        {
          "step": 3,
          "title": "Value Retrieval",
          "description": "Value reference is returned in O(1) time."
        }
      ]
    },
    "codeExample": {
      "title": "Dictionary Manipulation and collections.defaultdict",
      "code": "from collections import defaultdict, Counter\n\n# Safe lookup and updates\nuser = {\"name\": \"Alex\", \"role\": \"admin\"}\nage = user.get(\"age\", 25) # Returns 25 instead of raising KeyError\n\n# Frequency counting with Counter\nwords = [\"apple\", \"banana\", \"apple\", \"cherry\", \"banana\", \"apple\"]\ncounts = Counter(words)\nprint(f\"Most common: {counts.most_common(1)}\")\n\n# Grouping with defaultdict\ngrouped = defaultdict(list)\nfor word in words:\n    grouped[len(word)].append(word)\nprint(f\"Grouped by length: {dict(grouped)}\")",
      "explanation": "Demonstrates get() with defaults, Counter for frequency tallies, and defaultdict for grouping."
    },
    "runnableCode": {
      "code": "inventory = {\"apples\": 10, \"oranges\": 5}\ninventory[\"bananas\"] = 12 # Insertion\ninventory[\"apples\"] += 3  # In-place update\n\nfor fruit, count in inventory.items():\n    print(f\"{fruit}: {count} in stock\")\n\n# Checking key existence\nprint(f\"Has grapes? {'grapes' in inventory}\")",
      "expectedOutput": "apples: 13 in stock\noranges: 5 in stock\nbananas: 12 in stock\nHas grapes? False"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "inventory = {\"apples\": 10, \"oranges\": 5}",
        "codeSnippet": "inventory = {\"apples\": 10, \"oranges\": 5}",
        "explanation": "Creates a dictionary mapping fruit names to quantity integers."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "inventory[\"bananas\"] = 12",
        "codeSnippet": "inventory[\"bananas\"] = 12",
        "explanation": "Inserts new key \"bananas\" in O(1) average time."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "inventory[\"apples\"] += 3",
        "codeSnippet": "inventory[\"apples\"] += 3",
        "explanation": "Reads current count, increments by 3, and updates in-place."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "for fruit, count in inventory.items():",
        "codeSnippet": "for fruit, count in inventory.items():",
        "explanation": "Iterates key-value tuples yielding each fruit and count."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "print(f\"Has grapes? {'grapes' in inventory}\")",
        "codeSnippet": "print(f\"Has grapes? {'grapes' in inventory}\")",
        "explanation": "Checks key presence in O(1) time without raising KeyError."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Accessing missing keys directly with square brackets: `d[\"missing\"]`.",
        "solution": "Use `d.get(\"missing\", default_val)` or `if \"missing\" in d:`.",
        "whyWrong": "Raises KeyError crashing the program if key is absent.",
        "howToFix": "Use `d.get(\"missing\", default_val)` or `if \"missing\" in d:`."
      },
      {
        "mistake": "Modifying dictionary keys during direct iteration over the dictionary.",
        "solution": "Iterate over a copy of keys: `for k in list(d.keys()):`.",
        "whyWrong": "Raises `RuntimeError: dictionary changed size during iteration`.",
        "howToFix": "Iterate over a copy of keys: `for k in list(d.keys()):`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "JSON / REST APIs",
        "description": "Encoding request payloads and serializing database records."
      },
      {
        "title": "Caching & Memoization",
        "description": "Storing expensive function outputs keyed by function argument tuples."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-dictionaries-pq1",
        "question": "What does `d.setdefault(key, default)` do?",
        "hint": "Returns existing value or sets it if absent.",
        "answer": "If key is in dict, returns its value. If not, inserts key with default and returns default."
      },
      {
        "id": "py-ds-dictionaries-pq2",
        "question": "What is the difference between dict.keys() and list(dict.keys())?",
        "hint": "View object vs copy.",
        "answer": "dict.keys() returns a dynamic dictionary view reflecting changes; list(dict.keys()) creates an independent static snapshot list."
      },
      {
        "id": "py-ds-dictionaries-pq3",
        "question": "Can a list be used as a dictionary key?",
        "hint": "Recall hashability requirements.",
        "answer": "No, lists are mutable and unhashable; Python raises TypeError: unhashable type: 'list'."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-dictionaries-q1",
        "question": "What is the time complexity of looking up a key in a Python dict on average?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        "correctIndex": 0,
        "explanation": "Hash table lookups take O(1) average time."
      },
      {
        "id": "py-ds-dictionaries-q2",
        "question": "What does `d.get(\"unknown\", \"default\")` return if \"unknown\" is NOT present?",
        "options": [
          "None",
          "KeyError",
          "\"default\"",
          "False"
        ],
        "correctIndex": 2,
        "explanation": "dict.get(k, default) returns the fallback argument when k is missing."
      },
      {
        "id": "py-ds-dictionaries-q3",
        "question": "How are keys ordered when iterating over a dictionary in Python 3.7+?",
        "options": [
          "Alphabetical order",
          "Hash code order",
          "Insertion order",
          "Arbitrary order"
        ],
        "correctIndex": 2,
        "explanation": "Python 3.7+ language specification guarantees dictionary iteration order matches insertion order."
      }
    ],
    "codingChallenge": {
      "title": "Character Frequency Analyzer",
      "problem": "Write a function `char_frequency(s: str) -> dict[str, int]` that takes a string, ignores spaces and punctuation, treats letters case-insensitively, and returns a dictionary of character frequencies sorted alphabetically by character.",
      "hints": [
        "Filter characters using char.isalpha().",
        "Use collections.Counter or standard dict loop.",
        "Return dict(sorted(freq.items()))."
      ],
      "starterCode": "def char_frequency(s: str) -> dict[str, int]:\n    # Write your solution here\n    pass",
      "solution": "def char_frequency(s: str) -> dict[str, int]:\n    counts = {}\n    for char in s.lower():\n        if char.isalpha():\n            counts[char] = counts.get(char, 0) + 1\n    return dict(sorted(counts.items()))",
      "testCases": [
        {
          "input": "\"Hello, World!\"",
          "expectedOutput": "{\"d\": 1, \"e\": 1, \"h\": 1, \"l\": 3, \"o\": 2, \"r\": 1, \"w\": 1}"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "inventory = {\"apples\": 10, \"oranges\": 5}",
        "codeSnippet": "inventory = {\"apples\": 10, \"oranges\": 5}",
        "explanation": "Creates a dictionary mapping fruit names to quantity integers."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "inventory[\"bananas\"] = 12",
        "codeSnippet": "inventory[\"bananas\"] = 12",
        "explanation": "Inserts new key \"bananas\" in O(1) average time."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "inventory[\"apples\"] += 3",
        "codeSnippet": "inventory[\"apples\"] += 3",
        "explanation": "Reads current count, increments by 3, and updates in-place."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "for fruit, count in inventory.items():",
        "codeSnippet": "for fruit, count in inventory.items():",
        "explanation": "Iterates key-value tuples yielding each fruit and count."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "print(f\"Has grapes? {'grapes' in inventory}\")",
        "codeSnippet": "print(f\"Has grapes? {'grapes' in inventory}\")",
        "explanation": "Checks key presence in O(1) time without raising KeyError."
      }
    ],
    "applications": [
      {
        "industry": "JSON / REST APIs",
        "application": "Encoding request payloads and serializing database records.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "JSON / REST APIs",
        "description": "Encoding request payloads and serializing database records."
      },
      {
        "industry": "Caching & Memoization",
        "application": "Storing expensive function outputs keyed by function argument tuples.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Caching & Memoization",
        "description": "Storing expensive function outputs keyed by function argument tuples."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand how Python dictionaries implement compact hash tables with insertion order preservation.",
        "Safely query keys with .get(key, default) avoiding KeyError exceptions.",
        "Iterate over dictionaries using .keys(), .values(), and .items()."
      ]
    }
  },
  "py-ds-slicing": {
    "id": "py-ds-slicing",
    "moduleId": "python-module-3",
    "title": "Slicing and Unpacking",
    "subtitle": "Extended Slice Notation [start:stop:step], Starred Unpacking, and Swaps",
    "order": 6,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Master the slice syntax [start:stop:step] including negative step reversals.",
      "Understand slice semantics: half-open intervals [start, stop) and automatic clamping.",
      "Use starred unpacking (*rest) to capture variadic sequence elements.",
      "Perform in-place multi-variable assignments and swapping without temporary variables."
    ],
    "prerequisites": [
      "Python lists and indexing basics."
    ],
    "analogy": {
      "title": "The Film Strip Cutter",
      "text": "A movie editor has a strip of 35mm film numbered frames 0 to 100. Slicing is like marking \"start at frame 10, cut before frame 30, and take every 2nd frame\". The original reel remains intact while a new highlight reel is created.",
      "metaphor": "[start:stop:step] defines half-open intervals to extract new sub-sequences."
    },
    "problemSolved": {
      "title": "Concise Sequence Subsetting and Variable Binding",
      "text": "Subsetting arrays in traditional languages requires verbose for-loops with index counters. Python slicing and unpacking condense extraction, reversing, and multi-variable assignments into single readable expressions.",
      "keyPoints": [
        "Slices never raise IndexError when indices exceed sequence boundaries; they clamp safely.",
        "`seq[::-1]` creates a reversed copy of the sequence.",
        "Starred unpacking `first, *middle, last = seq` extracts arbitrary partitions."
      ]
    },
    "intuition": {
      "overview": "A slice creates a slice object `slice(start, stop, step)` that instructs the sequence to extract references into a new collection of the same type.",
      "steps": [
        {
          "step": 1,
          "title": "Bound Resolution",
          "description": "Start defaults to 0 (or end for negative step), stop to len(seq), step to 1."
        },
        {
          "step": 2,
          "title": "Index Progression",
          "description": "Indices advance by step until reaching or exceeding stop."
        },
        {
          "step": 3,
          "title": "New Sequence Construction",
          "description": "Extracted items are collected into a fresh list, tuple, or string."
        }
      ]
    },
    "codeExample": {
      "title": "Advanced Slicing and Starred Expressions",
      "code": "data = [10, 20, 30, 40, 50, 60, 70]\n\n# Subsetting and reversing\nfirst_three = data[:3]\nevery_other = data[::2]\nreversed_data = data[::-1]\n\n# Starred unpacking\nhead, *middle, tail = data\nprint(f\"Head: {head}, Middle: {middle}, Tail: {tail}\")",
      "explanation": "Shows half-open slice intervals, step jumping, sequence reversal, and starred unpacking."
    },
    "runnableCode": {
      "code": "msg = \"PythonMastery\"\nprint(\"Reversed:\", msg[::-1])\nprint(\"Middle chars:\", msg[6:13])\n\nnums = list(range(1, 10))\nfirst, *rest = nums\nprint(f\"First: {first}\")\nprint(f\"Rest: {rest}\")",
      "expectedOutput": "Reversed: yretsaMnohtyP\nMiddle chars: Mastery\nFirst: 1\nRest: [2, 3, 4, 5, 6, 7, 8, 9]"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "msg = \"PythonMastery\"",
        "codeSnippet": "msg = \"PythonMastery\"",
        "explanation": "Creates a 13-character string."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "print(\"Reversed:\", msg[::-1])",
        "codeSnippet": "print(\"Reversed:\", msg[::-1])",
        "explanation": "Steps through string with step=-1, creating a reversed copy."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(\"Middle chars:\", msg[6:13])",
        "codeSnippet": "print(\"Middle chars:\", msg[6:13])",
        "explanation": "Extracts indices 6 up to (exclusive) 13, printing \"Mastery\"."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "first, *rest = nums",
        "codeSnippet": "first, *rest = nums",
        "explanation": "Unpacks first element into first, collecting remaining elements into list rest."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Expecting `lst[start:stop]` to include the element at index `stop`.",
        "solution": "If you need element at index k included, use `lst[start:k+1]`.",
        "whyWrong": "Python slices are half-open intervals: index `stop` is strictly excluded.",
        "howToFix": "If you need element at index k included, use `lst[start:k+1]`."
      },
      {
        "mistake": "Using multiple starred variables in a single assignment: `*a, *b = lst`.",
        "solution": "Only one starred expression is allowed per assignment statement.",
        "whyWrong": "Raises `SyntaxError: two starred expressions in assignment` because lengths would be ambiguous.",
        "howToFix": "Only one starred expression is allowed per assignment statement."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Time Series Batching",
        "description": "Windowing rolling historical price samples for machine learning model training."
      },
      {
        "title": "Header/Footer Record Splitting",
        "description": "Separating CSV headers, metadata trailers, and body records."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-slicing-pq1",
        "question": "What does `nums[:]` do when applied to a list?",
        "hint": "Think about copying.",
        "answer": "It creates a shallow copy of the entire list."
      },
      {
        "id": "py-ds-slicing-pq2",
        "question": "What is the result of `\"hello\"[100:200]`?",
        "hint": "Do slices raise IndexError?",
        "answer": "It returns an empty string `\"\"` without raising an error because slices clamp indices."
      },
      {
        "id": "py-ds-slicing-pq3",
        "question": "How can you unpack the first two elements and discard the rest of a list?",
        "hint": "Underscore convention with starred unpacking.",
        "answer": "`a, b, *_ = my_list`."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-slicing-q1",
        "question": "What is the output of `[0, 1, 2, 3, 4, 5][1:5:2]`?",
        "options": [
          "[1, 3]",
          "[1, 3, 5]",
          "[2, 4]",
          "[1, 2, 3, 4]"
        ],
        "correctIndex": 0,
        "explanation": "Starts at index 1 (val 1), steps by 2 to index 3 (val 3). Next would be index 5, which is excluded by stop=5."
      },
      {
        "id": "py-ds-slicing-q2",
        "question": "Which slice expression reverses a string `s`?",
        "options": [
          "s[-1:0]",
          "s[::-1]",
          "s.reverse()",
          "s[-1::-1]"
        ],
        "correctIndex": 1,
        "explanation": "`s[::-1]` steps backwards through the entire sequence, returning a reversed copy."
      },
      {
        "id": "py-ds-slicing-q3",
        "question": "Given `a, *b, c = [1, 2, 3, 4]`, what is `b`?",
        "options": [
          "(2, 3)",
          "[2, 3]",
          "2",
          "[2, 3, 4]"
        ],
        "correctIndex": 1,
        "explanation": "Starred unpacking always gathers the middle elements into a list: `[2, 3]`."
      }
    ],
    "codingChallenge": {
      "title": "Palindrome and Center Extractor",
      "problem": "Write a function `process_sequence(seq: list[int]) -> tuple[bool, list[int]]` that checks if the list is a palindrome (reads identically forwards and backwards), and returns a tuple `(is_palindrome, middle_elements)` where `middle_elements` excludes the first and last elements (or empty if length < 3).",
      "hints": [
        "Compare seq with seq[::-1] for palindrome check.",
        "Use seq[1:-1] to extract middle elements when len(seq) >= 3."
      ],
      "starterCode": "def process_sequence(seq: list[int]) -> tuple[bool, list[int]]:\n    # Write your solution here\n    pass",
      "solution": "def process_sequence(seq: list[int]) -> tuple[bool, list[int]]:\n    is_palindrome = seq == seq[::-1]\n    middle = seq[1:-1] if len(seq) >= 3 else []\n    return (is_palindrome, middle)",
      "testCases": [
        {
          "input": "[1, 2, 3, 2, 1]",
          "expectedOutput": "(True, [2, 3, 2])"
        },
        {
          "input": "[1, 2, 3, 4]",
          "expectedOutput": "(False, [2, 3])"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "msg = \"PythonMastery\"",
        "codeSnippet": "msg = \"PythonMastery\"",
        "explanation": "Creates a 13-character string."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "print(\"Reversed:\", msg[::-1])",
        "codeSnippet": "print(\"Reversed:\", msg[::-1])",
        "explanation": "Steps through string with step=-1, creating a reversed copy."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "print(\"Middle chars:\", msg[6:13])",
        "codeSnippet": "print(\"Middle chars:\", msg[6:13])",
        "explanation": "Extracts indices 6 up to (exclusive) 13, printing \"Mastery\"."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "first, *rest = nums",
        "codeSnippet": "first, *rest = nums",
        "explanation": "Unpacks first element into first, collecting remaining elements into list rest."
      }
    ],
    "applications": [
      {
        "industry": "Time Series Batching",
        "application": "Windowing rolling historical price samples for machine learning model training.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Time Series Batching",
        "description": "Windowing rolling historical price samples for machine learning model training."
      },
      {
        "industry": "Header/Footer Record Splitting",
        "application": "Separating CSV headers, metadata trailers, and body records.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Header/Footer Record Splitting",
        "description": "Separating CSV headers, metadata trailers, and body records."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Master the slice syntax [start:stop:step] including negative step reversals.",
        "Understand slice semantics: half-open intervals [start, stop) and automatic clamping.",
        "Use starred unpacking (*rest) to capture variadic sequence elements."
      ]
    }
  },
  "py-ds-mutability": {
    "id": "py-ds-mutability",
    "moduleId": "python-module-3",
    "title": "Mutability and Immutability",
    "subtitle": "Mutable vs Immutable Types, Memory ID, and Unexpected Aliasing Bugs",
    "order": 7,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "memory-model",
    "objectives": [
      "Distinguish between mutable types (list, dict, set) and immutable types (int, float, str, tuple, frozenset).",
      "Understand object identity using id() and the `is` operator versus value equality (`==`).",
      "Diagnose unexpected aliasing bugs where modifying one variable changes another.",
      "Recognize mutable default argument bugs in function definitions."
    ],
    "prerequisites": [
      "Python variables and data structures."
    ],
    "analogy": {
      "title": "The Shared Whiteboard vs The Printed Book",
      "text": "A mutable object (like a list) is a dry-erase whiteboard on an office wall. If three employees have sticky notes with the room number (pointers), any employee writing on the whiteboard immediately changes what the other two see. An immutable object (like an integer) is a printed book: you cannot alter page 4; you can only buy a different book.",
      "metaphor": "Variables are name tags bound to objects in heap memory, not storage boxes themselves."
    },
    "problemSolved": {
      "title": "Eliminating Silent State Corruption Bugs",
      "description": "The number one source of beginner-to-intermediate Python bugs is assuming assignment creates independent copies. Understanding Python's reference model is critical for writing bug-free systems.",
      "keyPoints": [
        "`a = b` never copies an object; it binds the identifier `a` to the same object as `b`.",
        "`is` checks memory address identity `id(a) == id(b)`; `==` checks value equality.",
        "Immutable objects guarantee thread-safety and hash integrity."
      ]
    },
    "intuition": {
      "overview": "In Python, everything is an object. Variables are pointers in the local frame namespace that reference heap-allocated PyObject structs.",
      "steps": [
        {
          "step": 1,
          "title": "Binding",
          "description": "Variable assignment binds a name in the namespace to an object memory address."
        },
        {
          "step": 2,
          "title": "Mutation",
          "description": "Calling `.append()` mutates the underlying PyObject in place without changing its address."
        },
        {
          "step": 3,
          "title": "Re-binding",
          "description": "Reassigning `x = x + 1` creates a new PyObject and binds the identifier to the new address."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Aliasing and Object Identity",
      "code": "a = [1, 2, 3]\nb = a  # Aliasing: both names reference the SAME list\n\nb.append(4)\nprint(\"a:\", a) # a is modified! [1, 2, 3, 4]\nprint(\"a is b:\", a is b) # True: same id()\n\n# Immutable behavior\nx = 1000\ny = x\ny += 1\nprint(f\"x: {x}, y: {y}\") # x remains 1000, y points to a new int object",
      "explanation": "Demonstrates list aliasing where mutating b alters a, contrasted with immutable integer rebinding."
    },
    "runnableCode": {
      "code": "def add_item(item, lst=[]): # DANGEROUS: mutable default\n    lst.append(item)\n    return lst\n\nprint(add_item(\"A\"))\nprint(add_item(\"B\")) # Returns [\"A\", \"B\"] because the default list is shared!",
      "expectedOutput": "['A']\n['A', 'B']"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "def add_item(item, lst=[]):",
        "codeSnippet": "def add_item(item, lst=[]):",
        "explanation": "Defines function with default parameter lst bound to a single list created at function definition time."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    lst.append(item)",
        "codeSnippet": "    lst.append(item)",
        "explanation": "Appends to the shared default list across repeated calls."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(add_item(\"A\"))",
        "codeSnippet": "print(add_item(\"A\"))",
        "explanation": "First call mutates default list to [\"A\"]."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "print(add_item(\"B\"))",
        "codeSnippet": "print(add_item(\"B\"))",
        "explanation": "Second call appends to the same list instance, returning [\"A\", \"B\"]."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using a mutable object (list or dict) as a default parameter in a function definition.",
        "solution": "Use `None` as the default: `def add_item(item, lst=None): if lst is None: lst = []`.",
        "whyWrong": "Default arguments are evaluated once when the function is defined, not every time it is called. State persists across invocations.",
        "howToFix": "Use `None` as the default: `def add_item(item, lst=None): if lst is None: lst = []`."
      },
      {
        "mistake": "Multiplying a list of lists to create a 2D matrix: `grid = [[0] * 3] * 3`.",
        "solution": "Use a list comprehension: `grid = [[0] * 3 for _ in range(3)]`.",
        "whyWrong": "Creates an outer list containing 3 references to the EXACT same inner list row. Modifying grid[0][0] alters all rows.",
        "howToFix": "Use a list comprehension: `grid = [[0] * 3 for _ in range(3)]`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Concurrent Programming",
        "description": "Preventing race conditions by passing immutable tuples and frozen dataclasses between threads."
      },
      {
        "title": "Database ORM Models",
        "description": "Tracking dirty states and change detection in SQLAlchemy."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-mutability-pq1",
        "question": "What is the output of `a = [1]; b = [1]; print(a == b, a is b)`?",
        "hint": "Difference between value and identity.",
        "answer": "`True False`. They have equal values (`==`), but reside at distinct memory locations (`is`)."
      },
      {
        "id": "py-ds-mutability-pq2",
        "question": "Why does Python allow tuples to be dict keys, but not lists?",
        "hint": "Hash value consistency.",
        "answer": "Dict keys must be hashable. If a key could mutate, its hash would change, breaking lookup integrity in the hash table."
      },
      {
        "id": "py-ds-mutability-pq3",
        "question": "How can you inspect the unique memory address of a Python object?",
        "hint": "Standard built-in function.",
        "answer": "Using the `id(obj)` built-in function."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-mutability-q1",
        "question": "Which of the following types is mutable in Python?",
        "options": [
          "str",
          "tuple",
          "list",
          "int"
        ],
        "correctIndex": 2,
        "explanation": "Lists are mutable; str, tuple, and int are all immutable."
      },
      {
        "id": "py-ds-mutability-q2",
        "question": "What happens when `x = (1, [2, 3])` executes `x[1].append(4)`?",
        "options": [
          "TypeError is raised",
          "x becomes (1, [2, 3, 4])",
          "A new tuple is created",
          "SyntaxError is raised"
        ],
        "correctIndex": 1,
        "explanation": "The tuple holds a reference to the list. While the tuple reference cannot be changed, the list itself is mutable and appends 4."
      },
      {
        "id": "py-ds-mutability-q3",
        "question": "What is the correct idiom for an optional list parameter in a function?",
        "options": [
          "def f(lst=[]):",
          "def f(lst=list()):",
          "def f(lst=None):",
          "def f(lst=copy([])):"
        ],
        "correctIndex": 2,
        "explanation": "Using `lst=None` and initializing `if lst is None: lst = []` inside the function avoids shared state bugs."
      }
    ],
    "codingChallenge": {
      "title": "Create Safe 2D Matrix",
      "problem": "Write a function `create_matrix(rows: int, cols: int, initial_value: int) -> list[list[int]]` that creates an independent 2D grid such that modifying `grid[0][0] = 99` does NOT alter any other row.",
      "hints": [
        "Do not use multiplication of rows `[[val] * cols] * rows`.",
        "Use nested list comprehensions: [[initial_value for _ in range(cols)] for _ in range(rows)]."
      ],
      "starterCode": "def create_matrix(rows: int, cols: int, initial_value: int) -> list[list[int]]:\n    # Write your solution here\n    pass",
      "solution": "def create_matrix(rows: int, cols: int, initial_value: int) -> list[list[int]]:\n    return [[initial_value for _ in range(cols)] for _ in range(rows)]",
      "testCases": [
        {
          "input": "2, 3, 0",
          "expectedOutput": "[[0, 0, 0], [0, 0, 0]]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "def add_item(item, lst=[]):",
        "codeSnippet": "def add_item(item, lst=[]):",
        "explanation": "Defines function with default parameter lst bound to a single list created at function definition time."
      },
      {
        "line": 2,
        "lines": "2",
        "code": "    lst.append(item)",
        "codeSnippet": "    lst.append(item)",
        "explanation": "Appends to the shared default list across repeated calls."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(add_item(\"A\"))",
        "codeSnippet": "print(add_item(\"A\"))",
        "explanation": "First call mutates default list to [\"A\"]."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "print(add_item(\"B\"))",
        "codeSnippet": "print(add_item(\"B\"))",
        "explanation": "Second call appends to the same list instance, returning [\"A\", \"B\"]."
      }
    ],
    "applications": [
      {
        "industry": "Concurrent Programming",
        "application": "Preventing race conditions by passing immutable tuples and frozen dataclasses between threads.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Concurrent Programming",
        "description": "Preventing race conditions by passing immutable tuples and frozen dataclasses between threads."
      },
      {
        "industry": "Database ORM Models",
        "application": "Tracking dirty states and change detection in SQLAlchemy.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Database ORM Models",
        "description": "Tracking dirty states and change detection in SQLAlchemy."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Distinguish between mutable types (list, dict, set) and immutable types (int, float, str, tuple, frozenset).",
        "Understand object identity using id() and the `is` operator versus value equality (`==`).",
        "Diagnose unexpected aliasing bugs where modifying one variable changes another."
      ]
    }
  },
  "py-ds-copying": {
    "id": "py-ds-copying",
    "moduleId": "python-module-3",
    "title": "Copying and References",
    "subtitle": "Assignment vs Shallow Copy vs Deep Copy (copy.copy vs copy.deepcopy)",
    "order": 8,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "memory-model",
    "objectives": [
      "Distinguish between variable assignment, shallow copying, and deep copying.",
      "Understand how shallow copies duplicate container structures but reuse references to nested objects.",
      "Use copy.copy() and list slicing (`lst[:]`) for shallow copies.",
      "Use copy.deepcopy() to recursively duplicate nested compound objects."
    ],
    "prerequisites": [
      "Python mutability and data structures."
    ],
    "analogy": {
      "title": "The Address Book Photocopy",
      "text": "Imagine an address book where each entry has a person's name and a locker combination to a physical storage locker. A shallow copy is like photocopying the paper pages: you have your own notebook, but both notebooks still list the EXACT same physical locker combinations. If your friend empties locker #5, your locker #5 is also empty. A deep copy builds an entirely duplicate warehouse and copies the contents into new lockers.",
      "metaphor": "Shallow copy duplicates container pointers; deep copy recursively clones every nested object."
    },
    "problemSolved": {
      "title": "Preventing Unintended Side-Effects in Nested Data",
      "description": "When processing configuration trees, game states, or JSON documents, functions need to modify data structures without altering the original inputs. Choosing the correct copying strategy prevents hard-to-detect state mutations.",
      "keyPoints": [
        "Simple assignment `b = a` creates no copy.",
        "Shallow copy (`a.copy()`, `copy.copy()`, `a[:]`) clones the outer container only.",
        "Deep copy (`copy.deepcopy()`) clones the container and all nested objects recursively."
      ]
    },
    "intuition": {
      "overview": "Python's standard `copy` module inspects objects and dynamically constructs copies depending on whether shallow or deep traversal is requested.",
      "steps": [
        {
          "step": 1,
          "title": "Assignment",
          "description": "Reuses existing pointer; both variables point to the same memory address."
        },
        {
          "step": 2,
          "title": "Shallow Copy",
          "description": "Allocates a new container object, copying pointer addresses of each member."
        },
        {
          "step": 3,
          "title": "Deep Copy",
          "description": "Maintains a memoization dict of copied objects to handle recursive references and clones all children."
        }
      ]
    },
    "codeExample": {
      "title": "Comparing Shallow and Deep Copies",
      "code": "import copy\n\noriginal = [[1, 2, 3], [4, 5, 6]]\n\nshallow = copy.copy(original)\ndeep = copy.deepcopy(original)\n\n# Modify nested element\noriginal[0][0] = 999\n\nprint(\"Shallow copied nested:\", shallow[0][0]) # 999 (affected!)\nprint(\"Deep copied nested:\", deep[0][0])       # 1   (isolated!)",
      "explanation": "Demonstrates that shallow copies share nested sub-lists while deepcopy recursively creates independent copies."
    },
    "runnableCode": {
      "code": "import copy\n\nuser_config = {\"theme\": \"dark\", \"plugins\": [\"git\", \"linter\"]}\nclone = copy.deepcopy(user_config)\n\nclone[\"plugins\"].append(\"docker\")\nprint(\"Original plugins:\", user_config[\"plugins\"])\nprint(\"Clone plugins:\", clone[\"plugins\"])",
      "expectedOutput": "Original plugins: ['git', 'linter']\nClone plugins: ['git', 'linter', 'docker']"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "import copy",
        "codeSnippet": "import copy",
        "explanation": "Imports the standard library copy module."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "user_config = {\"theme\": \"dark\", \"plugins\": [\"git\", \"linter\"]}",
        "codeSnippet": "user_config = {\"theme\": \"dark\", \"plugins\": [\"git\", \"linter\"]}",
        "explanation": "Creates a dictionary with a nested mutable list."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "clone = copy.deepcopy(user_config)",
        "codeSnippet": "clone = copy.deepcopy(user_config)",
        "explanation": "Creates an independent deep copy of both dictionary and the nested list."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "clone[\"plugins\"].append(\"docker\")",
        "codeSnippet": "clone[\"plugins\"].append(\"docker\")",
        "explanation": "Mutates cloned nested list without touching user_config."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming `dict.copy()` or `lst[:]` produces a fully independent deep copy.",
        "solution": "Use `copy.deepcopy()` whenever data structures contain nested mutable objects.",
        "whyWrong": "These methods only perform shallow copies. Any nested dictionaries or lists are still shared by reference.",
        "howToFix": "Use `copy.deepcopy()` whenever data structures contain nested mutable objects."
      },
      {
        "mistake": "Using `copy.deepcopy()` on massive graph objects or network sockets unnecessarily.",
        "solution": "Only use deepcopy when mutation of nested objects is strictly required.",
        "whyWrong": "Deepcopy traverses the entire object graph recursively, which can be slow and memory-intensive.",
        "howToFix": "Only use deepcopy when mutation of nested objects is strictly required."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Undo / Redo Engines",
        "description": "Snapshotting application canvas or editor states before user modifications."
      },
      {
        "title": "Simulation Rollbacks",
        "description": "Cloning simulation parameters and game worlds for speculative tree searches (Monte Carlo tree search)."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-copying-pq1",
        "question": "Does `lst.copy()` perform a shallow copy or a deep copy?",
        "hint": "Built-in container methods.",
        "answer": "It performs a shallow copy."
      },
      {
        "id": "py-ds-copying-pq2",
        "question": "How does `copy.deepcopy()` prevent infinite loops on circular references?",
        "hint": "Memoization table.",
        "answer": "It maintains an internal `memo` dictionary mapping original object IDs to their newly cloned counterparts."
      },
      {
        "id": "py-ds-copying-pq3",
        "question": "What is the fastest way to shallow-copy a 1D list in Python?",
        "hint": "Slice syntax.",
        "answer": "Using slice notation: `cloned = lst[:]` or `cloned = list(lst)`."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-copying-q1",
        "question": "Given `a = [[1, 2]]; b = a[:]`, which statement is TRUE after `b[0].append(3)`?",
        "options": [
          "a remains [[1, 2]]",
          "a is now [[1, 2, 3]]",
          "TypeError is raised",
          "b becomes [[1, 2], 3]"
        ],
        "correctIndex": 1,
        "explanation": "Slicing `a[:]` creates a shallow copy. The outer lists are separate, but `a[0]` and `b[0]` refer to the exact same inner list."
      },
      {
        "id": "py-ds-copying-q2",
        "question": "Which module in the Python standard library provides deepcopy?",
        "options": [
          "sys",
          "clone",
          "copy",
          "memory"
        ],
        "correctIndex": 2,
        "explanation": "The `copy` module provides `copy.copy()` and `copy.deepcopy()`."
      },
      {
        "id": "py-ds-copying-q3",
        "question": "When is a shallow copy completely sufficient for safe cloning?",
        "options": [
          "When objects contain circular graphs",
          "When the container only holds immutable objects (like integers or strings)",
          "When the container has 5 levels of nesting",
          "Never"
        ],
        "correctIndex": 1,
        "explanation": "If all elements inside the container are immutable, shallow copy is completely safe and much faster than deepcopy."
      }
    ],
    "codingChallenge": {
      "title": "Safe Configuration Cloner",
      "problem": "Write a function `clone_and_override(config: dict, overrides: dict) -> dict` that takes a base configuration dictionary (which may contain nested dicts and lists), returns an independent deep copy with overrides applied, and verifies the original config is unaltered.",
      "hints": [
        "Use copy.deepcopy(config) to create the base clone.",
        "Update the clone with the overrides dictionary."
      ],
      "starterCode": "import copy\n\ndef clone_and_override(config: dict, overrides: dict) -> dict:\n    # Write your solution here\n    pass",
      "solution": "import copy\n\ndef clone_and_override(config: dict, overrides: dict) -> dict:\n    new_cfg = copy.deepcopy(config)\n    new_cfg.update(overrides)\n    return new_cfg",
      "testCases": [
        {
          "input": "{\"env\": \"dev\", \"services\": [\"db\", \"redis\"]}, {\"env\": \"prod\"}",
          "expectedOutput": "{\"env\": \"prod\", \"services\": [\"db\", \"redis\"]}"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "import copy",
        "codeSnippet": "import copy",
        "explanation": "Imports the standard library copy module."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "user_config = {\"theme\": \"dark\", \"plugins\": [\"git\", \"linter\"]}",
        "codeSnippet": "user_config = {\"theme\": \"dark\", \"plugins\": [\"git\", \"linter\"]}",
        "explanation": "Creates a dictionary with a nested mutable list."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "clone = copy.deepcopy(user_config)",
        "codeSnippet": "clone = copy.deepcopy(user_config)",
        "explanation": "Creates an independent deep copy of both dictionary and the nested list."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "clone[\"plugins\"].append(\"docker\")",
        "codeSnippet": "clone[\"plugins\"].append(\"docker\")",
        "explanation": "Mutates cloned nested list without touching user_config."
      }
    ],
    "applications": [
      {
        "industry": "Undo / Redo Engines",
        "application": "Snapshotting application canvas or editor states before user modifications.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Undo / Redo Engines",
        "description": "Snapshotting application canvas or editor states before user modifications."
      },
      {
        "industry": "Simulation Rollbacks",
        "application": "Cloning simulation parameters and game worlds for speculative tree searches (Monte Carlo tree search).",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Simulation Rollbacks",
        "description": "Cloning simulation parameters and game worlds for speculative tree searches (Monte Carlo tree search)."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Distinguish between variable assignment, shallow copying, and deep copying.",
        "Understand how shallow copies duplicate container structures but reuse references to nested objects.",
        "Use copy.copy() and list slicing (`lst[:]`) for shallow copies."
      ]
    }
  },
  "py-ds-nested": {
    "id": "py-ds-nested",
    "moduleId": "python-module-3",
    "title": "Nested Data Structures",
    "subtitle": "Lists of Dicts, Dicts of Lists, 2D Grids, and JSON Tree Traversals",
    "order": 9,
    "readTimeMinutes": 22,
    "difficulty": "Intermediate",
    "visualizerType": "data-structure-visual",
    "objectives": [
      "Model complex hierarchical domain data using combinations of dicts, lists, and tuples.",
      "Access, update, and traverse nested data structures cleanly using chained lookups.",
      "Flatten nested lists and transform nested dictionary records.",
      "Parse and navigate JSON-like payloads safely without KeyError or IndexError crashes."
    ],
    "prerequisites": [
      "Python lists, dictionaries, and slicing."
    ],
    "analogy": {
      "title": "The Office Filing Cabinet with Folders within Folders",
      "text": "A flat list is like a single drawer of loose paper sheets. A nested data structure is a filing cabinet where drawer 1 contains green folders (categories), each folder contains plastic sleeves (records), and each sleeve holds index cards with key-value data fields.",
      "metaphor": "Nested structures compose simple primitives into rich multi-dimensional data models."
    },
    "problemSolved": {
      "title": "Representing Real-World Relational and Hierarchical Entities",
      "description": "Real-world data—such as REST API responses, database join results, and graph topologies—is inherently multi-layered. Combining lists and dictionaries provides native JSON modeling in pure Python.",
      "keyPoints": [
        "Chained indexing `data[\"users\"][0][\"email\"]` traverses down nested levels.",
        "Dict comprehensions and nested list comprehensions allow clean data flattening and reshaping.",
        "The `json` module translates directly between Python nested structures and JSON strings."
      ]
    },
    "intuition": {
      "overview": "Nested structures are composed of references: outer containers hold pointers to inner containers, creating tree or tabular topologies.",
      "steps": [
        {
          "step": 1,
          "title": "Navigation",
          "description": "Evaluate outer key or index first, obtaining reference to the inner structure."
        },
        {
          "step": 2,
          "title": "Transformation",
          "description": "Extract or map target sub-records into a normalized shape."
        },
        {
          "step": 3,
          "title": "Safeguarding",
          "description": "Use .get() chaining or defensive checks to prevent missing-key exceptions."
        }
      ]
    },
    "codeExample": {
      "title": "Navigating and Flattening Nested Data",
      "code": "company = {\n    \"engineering\": [\n        {\"name\": \"Alice\", \"skills\": [\"Python\", \"Docker\"]},\n        {\"name\": \"Bob\", \"skills\": [\"React\", \"TypeScript\"]}\n    ],\n    \"marketing\": [\n        {\"name\": \"Charlie\", \"skills\": [\"SEO\", \"Content\"]}\n    ]\n}\n\n# Collect all unique skills across all departments\nall_skills = {\n    skill\n    for dept_members in company.values()\n    for member in dept_members\n    for skill in member[\"skills\"]\n}\nprint(f\"All company skills: {sorted(all_skills)}\")",
      "explanation": "Demonstrates a nested set comprehension traversing three levels of hierarchy (dict -> list -> list)."
    },
    "runnableCode": {
      "code": "matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n# Transposing a 2D matrix\ntransposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]\nfor row in transposed:\n    print(row)",
      "expectedOutput": "[1, 4, 7]\n[2, 5, 8]\n[3, 6, 9]"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "codeSnippet": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "explanation": "Defines a 3x3 grid as a list of three integer sub-lists."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]",
        "codeSnippet": "transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]",
        "explanation": "Iterates column indices i, gathering row[i] across all rows to transpose rows into columns."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "for row in transposed:",
        "codeSnippet": "for row in transposed:",
        "explanation": "Prints each transposed row."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Chaining direct lookups on uncertain APIs: `data[\"user\"][\"profile\"][\"address\"][\"zip\"]`.",
        "solution": "Use dictionary `.get()` with empty dict fallbacks: `data.get(\"user\", {}).get(\"profile\", {}).get(\"address\", {}).get(\"zip\")`.",
        "whyWrong": "If any intermediate key is missing or None, raises KeyError or TypeError.",
        "howToFix": "Use dictionary `.get()` with empty dict fallbacks: `data.get(\"user\", {}).get(\"profile\", {}).get(\"address\", {}).get(\"zip\")`."
      },
      {
        "mistake": "Flattening lists using slow `+` concatenation inside loops.",
        "solution": "Use itertools.chain.from_iterable(nested_list) or a nested comprehension.",
        "whyWrong": "Repeatedly copying intermediate lists produces O(N^2) complexity.",
        "howToFix": "Use itertools.chain.from_iterable(nested_list) or a nested comprehension."
      }
    ],
    "realWorldApplications": [
      {
        "title": "REST API Payload Processing",
        "description": "Extracting user profiles, permissions, and metrics from nested JSON responses."
      },
      {
        "title": "Game Development",
        "description": "Modeling 2D tilemaps, inventory bags, and skill trees."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-ds-nested-pq1",
        "question": "How can you flatten `[[1, 2], [3, 4]]` into `[1, 2, 3, 4]` using a comprehension?",
        "hint": "Nested for loops inside brackets.",
        "answer": "`[item for sublist in lst for item in sublist]`."
      },
      {
        "id": "py-ds-nested-pq2",
        "question": "What does `zip(*matrix)` do when given a list of lists?",
        "hint": "Unpacking rows into zip.",
        "answer": "It transposes rows into columns, returning an iterator of column tuples."
      },
      {
        "id": "py-ds-nested-pq3",
        "question": "How can you pretty-print a complex nested dictionary in the terminal?",
        "hint": "Standard library module.",
        "answer": "Using `import json; print(json.dumps(data, indent=2))` or the `pprint` module."
      }
    ],
    "quiz": [
      {
        "id": "py-ds-nested-q1",
        "question": "What is the output of `data = [{\"a\": 10}, {\"a\": 20}]; sum(d[\"a\"] for d in data)`?",
        "options": [
          "10",
          "20",
          "30",
          "TypeError"
        ],
        "correctIndex": 2,
        "explanation": "Generator expression extracts each d[\"a\"] (10 and 20) and sum() adds them to produce 30."
      },
      {
        "id": "py-ds-nested-q2",
        "question": "How do you extract the element at row 1, column 2 of a 2D matrix?",
        "options": [
          "matrix[1, 2]",
          "matrix[1][2]",
          "matrix(1)(2)",
          "matrix{1}{2}"
        ],
        "correctIndex": 1,
        "explanation": "In Python lists of lists, nested indexing is accessed via consecutive brackets `matrix[row][col]`."
      },
      {
        "id": "py-ds-nested-q3",
        "question": "Which built-in function pair allows transposing a matrix easily: `list(zip(*matrix))`?",
        "options": [
          "map and filter",
          "zip and starred unpacking",
          "reversed and sorted",
          "enumerate and slice"
        ],
        "correctIndex": 1,
        "explanation": "Starred unpacking `*matrix` passes rows as positional arguments to `zip`, grouping corresponding column elements."
      }
    ],
    "codingChallenge": {
      "title": "Extract User Email List",
      "problem": "Write a function `get_verified_emails(departments: dict[str, list[dict]]) -> list[str]` that traverses a nested dictionary where keys are department names and values are lists of user records `{\"email\": str, \"verified\": bool}`. Return a sorted list of unique lowercase emails for verified users only.",
      "hints": [
        "Iterate through departments.values() and each user list.",
        "Check user.get(\"verified\") == True.",
        "Collect emails in a set, lowercase them, and return sorted(list(emails))."
      ],
      "starterCode": "def get_verified_emails(departments: dict[str, list[dict]]) -> list[str]:\n    # Write your solution here\n    pass",
      "solution": "def get_verified_emails(departments: dict[str, list[dict]]) -> list[str]:\n    verified_emails = set()\n    for users in departments.values():\n        for user in users:\n            if user.get(\"verified\"):\n                verified_emails.add(user[\"email\"].lower())\n    return sorted(list(verified_emails))",
      "testCases": [
        {
          "input": "{\"eng\": [{\"email\": \"A@x.com\", \"verified\": True}, {\"email\": \"B@x.com\", \"verified\": False}], \"hr\": [{\"email\": \"C@x.com\", \"verified\": True}]}",
          "expectedOutput": "[\"a@x.com\", \"c@x.com\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "codeSnippet": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "explanation": "Defines a 3x3 grid as a list of three integer sub-lists."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]",
        "codeSnippet": "transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]",
        "explanation": "Iterates column indices i, gathering row[i] across all rows to transpose rows into columns."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "for row in transposed:",
        "codeSnippet": "for row in transposed:",
        "explanation": "Prints each transposed row."
      }
    ],
    "applications": [
      {
        "industry": "REST API Payload Processing",
        "application": "Extracting user profiles, permissions, and metrics from nested JSON responses.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "REST API Payload Processing",
        "description": "Extracting user profiles, permissions, and metrics from nested JSON responses."
      },
      {
        "industry": "Game Development",
        "application": "Modeling 2D tilemaps, inventory bags, and skill trees.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Game Development",
        "description": "Modeling 2D tilemaps, inventory bags, and skill trees."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Model complex hierarchical domain data using combinations of dicts, lists, and tuples.",
        "Access, update, and traverse nested data structures cleanly using chained lookups.",
        "Flatten nested lists and transform nested dictionary records."
      ]
    }
  }
};
