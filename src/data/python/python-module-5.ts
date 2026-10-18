import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule5Data: PythonModuleData = {
  "id": "python-module-5",
  "number": 5,
  "title": "Comprehensions and Iteration",
  "subtitle": "List/Dict/Set Comprehensions, Generators & Lazy Evaluation",
  "description": "Write expressive, Pythonic one-liners with comprehensions and understand the iterator protocol that powers all Python loops. Build memory-efficient generators with yield, and master essential iteration tools: enumerate, zip, sorted, and map.",
  "icon": "Zap",
  "badge": "Comprehensions",
  "estimatedHours": 5,
  "topicsCount": 6,
  "lessons": [
    {
      "id": "py-comp-list",
      "moduleId": "python-module-5",
      "title": "List Comprehensions",
      "description": "[expr for item in iterable if condition] syntax, nested comprehensions, and readability trade-offs.",
      "order": 1,
      "readTimeMinutes": 20,
      "visualizerType": "execution-trace",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-comp-dict-set",
      "moduleId": "python-module-5",
      "title": "Dictionary and Set Comprehensions",
      "description": "{k: v for ...} and {expr for ...} patterns for building collections from existing data.",
      "order": 2,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-comp-generators",
      "moduleId": "python-module-5",
      "title": "Generator Expressions",
      "description": "(expr for item in iterable) lazy evaluation, memory efficiency vs list comprehensions.",
      "order": 3,
      "readTimeMinutes": 20,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-comp-iterables",
      "moduleId": "python-module-5",
      "title": "Iterables and Iterators Protocol",
      "description": "__iter__ and __next__, iter() and next(), and building custom iterator classes.",
      "order": 4,
      "readTimeMinutes": 25,
      "visualizerType": "execution-trace",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-comp-yield",
      "moduleId": "python-module-5",
      "title": "yield and Generator Functions",
      "description": "Pausing and resuming execution with yield, send(), throw(), and generator pipelines.",
      "order": 5,
      "readTimeMinutes": 28,
      "visualizerType": "execution-trace",
      "difficulty": "Advanced"
    },
    {
      "id": "py-comp-builtins",
      "moduleId": "python-module-5",
      "title": "enumerate, zip, sorted, and map",
      "description": "Essential built-in iteration tools, lazy vs eager evaluation, and chaining iterators.",
      "order": 6,
      "readTimeMinutes": 20,
      "visualizerType": "none",
      "difficulty": "Intermediate"
    }
  ]
};

export const pythonModule5Lessons: Record<string, PythonLessonContent> = {
  "py-comp-list": {
    "id": "py-comp-list",
    "moduleId": "python-module-5",
    "title": "List Comprehensions & Pythonic Iteration",
    "subtitle": "Transformation, Filtering, Nested Comprehensions & Performance Optimization",
    "order": 1,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "execution-trace",
    "objectives": [
      "Master the syntax of list comprehensions: [output_expr for item in iterable if condition]",
      "Distinguish filtering (if at the end) from conditional output (if-else before for)",
      "Construct multi-loop and nested list comprehensions (matrix flattening, cartesian products)",
      "Understand the CPython bytecode optimization: LIST_APPEND vs repeated method lookup",
      "Recognize anti-patterns: side-effecting comprehensions and readability thresholds"
    ],
    "prerequisites": [
      "for loops and sequence iteration in Python",
      "List basics (append, indexing) and boolean conditions"
    ],
    "analogy": {
      "title": "The Automated Assembly Conveyor",
      "text": "Creating a list with a manual for loop is like taking an empty box, picking parts one-by-one from a bin, inspecting each by hand, modifying it on your workbench, and putting it into the box with an explicit motion. A list comprehension is a high-speed conveyor belt with automated laser filters: raw materials enter on one side, qualifying items are instantly transformed, and a pristine collection emerges on the other side in a single unified operation.",
      "metaphor": "A list comprehension is an expressive mathematical set-builder notation {f(x) | x in S, P(x)} translated directly into optimized CPython bytecode."
    },
    "problemSolved": {
      "title": "Why Use List Comprehensions?",
      "description": "Before list comprehensions, creating derived lists required 3-5 lines of boilerplate: initializing an empty accumulator list, writing a for-loop, writing an if-check, and calling .append(). List comprehensions make the intent declarative, concise, and significantly faster.",
      "keyPoints": [
        "Declarative code: focuses on WHAT the resulting list contains rather than HOW to build it step-by-step",
        "C-level loop speed: executes at C-speed in CPython using the specialized LIST_APPEND instruction without Python-level method lookup overhead",
        "Encapsulated loop variable: in Python 3, loop variables in comprehensions do not leak into the enclosing scope",
        "Idiomatic Python: standard across all modern data science, web development, and algorithmic codebases"
      ]
    },
    "intuition": {
      "overview": "A list comprehension combines mapping (transforming items) and filtering (selecting items) into a single concise expression.",
      "steps": [
        {
          "step": 1,
          "title": "Basic Transformation (Map)",
          "description": "[x**2 for x in numbers] evaluates x**2 for every element in numbers, returning a brand new list."
        },
        {
          "step": 2,
          "title": "Filtering (Filter)",
          "description": "[x for x in numbers if x % 2 == 0] evaluates the condition after the for clause, including only items where the condition is True."
        },
        {
          "step": 3,
          "title": "Ternary Output (Map with Condition)",
          "description": "[\"even\" if x % 2 == 0 else \"odd\" for x in numbers] applies conditional logic inside the output expression."
        },
        {
          "step": 4,
          "title": "Nested Loops (Flattening)",
          "description": "[val for row in matrix for val in row] mirrors the order of nested for-loops from outer to inner."
        }
      ]
    },
    "codeExample": {
      "title": "List Comprehension Patterns and Matrix Flattening",
      "code": "# 1. Transform and Filter\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\neven_squares = [x**2 for x in numbers if x % 2 == 0]\nprint(\"Even squares:\", even_squares)\n\n# 2. Conditional Output Expression\nparity = [\"EVEN\" if x % 2 == 0 else \"ODD\" for x in numbers[:5]]\nprint(\"Parity labels:\", parity)\n\n# 3. 2D Matrix Generation\nmatrix = [[r * 3 + c + 1 for c in range(3)] for r in range(3)]\nprint(\"3x3 Matrix:\", matrix)\n\n# 4. Matrix Flattening\nflat = [num for row in matrix for num in row]\nprint(\"Flattened:\", flat)",
      "explanation": "Illustrates the four core patterns: map-filter, conditional ternary output expression, multi-dimensional grid generation via nested comprehensions, and 2D-to-1D flattening."
    },
    "runnableCode": {
      "code": "matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n# Flatten matrix: outer loop first, inner loop second\nflat = [x for row in matrix for x in row]\nprint(\"Flattened matrix:\", flat)\n\n# Filter words by length and convert to uppercase\nwords = [\"python\", \"is\", \"awesome\", \"and\", \"clean\"]\nlong_upper = [w.upper() for w in words if len(w) > 3]\nprint(\"Filtered & transformed words:\", long_upper)\n\n# Generate a multiplication table row\ntwos = [2 * i for i in range(1, 6)]\nprint(\"Multiples of 2:\", twos)",
      "expectedOutput": "Flattened matrix: [1, 2, 3, 4, 5, 6, 7, 8, 9]\nFiltered & transformed words: ['PYTHON', 'AWESOME', 'CLEAN']\nMultiples of 2: [2, 4, 6, 8, 10]"
    },
    "lineByLineExplanation": [
      {
        "line": "7",
        "lines": "7",
        "code": "[x for row in matrix for x in row]",
        "codeSnippet": "[x for row in matrix for x in row]",
        "explanation": "The order matches nested loops: 'for row in matrix' is the outer loop, 'for x in row' is the inner loop."
      },
      {
        "line": "12",
        "lines": "12",
        "code": "[w.upper() for w in words if len(w) > 3]",
        "codeSnippet": "[w.upper() for w in words if len(w) > 3]",
        "explanation": "Evaluates len(w) > 3. If True, computes w.upper() and appends to the resulting list."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Putting if-else at the end of the comprehension",
        "solution": "If you want if-else (conditional value), it goes BEFORE the 'for'. If you want to filter out items, single 'if' goes AFTER the 'for'.",
        "codeExample": "# WRONG: [x for x in nums if x > 0 else 0]  # SyntaxError\n# CORRECT: [x if x > 0 else 0 for x in nums]"
      },
      {
        "mistake": "Using list comprehensions solely for side effects (e.g. printing)",
        "solution": "List comprehensions build lists in memory. If you only want side effects without retaining the list, use a standard for-loop.",
        "codeExample": "# BAD: [print(x) for x in items]  # Creates and discards [None, None, ...]\n# GOOD: for x in items: print(x)"
      }
    ],
    "bestPractices": [
      "Keep comprehensions readable: if a comprehension spans more than 2 lines, refactor to a normal for-loop or helper function",
      "Remember nested loop ordering: the leftmost 'for' is the outermost loop",
      "Use generator expressions (expr for x in iterable) instead if you only iterate once to save memory",
      "Avoid deeply nested comprehensions (> 2 levels)"
    ],
    "applications": [
      {
        "industry": "Data Science & Feature Engineering",
        "application": "Data preprocessing and column normalization",
        "benefit": "Cleans, strips, and formats text columns in dataframes with minimal latency."
      },
      {
        "industry": "Web Backend & APIs",
        "application": "Serializing database records to JSON payloads",
        "benefit": "Extracts primary IDs and field mappings in concise, high-throughput transformations."
      },
      {
        "industry": "Computer Vision",
        "application": "Bounding box scaling and pixel coordinate transformation",
        "benefit": "Vectorizes coordinate remapping across thousands of detected objects per frame."
      }
    ],
    "practiceQuestions": [
      {
        "id": "q1",
        "question": "What is the syntactic difference between [x for x in items if x > 0] and [x if x > 0 else 0 for x in items]?",
        "hint": "Look at the length of the resulting lists.",
        "answer": "The first is a filter: items with x <= 0 are omitted entirely, so the resulting list may be shorter. The second is a map with ternary expression: every item produces an output (either x or 0), so the list length is unchanged."
      },
      {
        "id": "q2",
        "question": "Why does Python 3 list comprehension not leak its iteration variable into the outer scope?",
        "hint": "Think about function scopes in Python 3.",
        "answer": "In Python 3, list comprehensions are compiled as their own dedicated local scope (similar to an implicit inner function), preventing loop variables from overwriting outer variables."
      },
      {
        "id": "q3",
        "question": "Why is [x**2 for x in nums] typically faster than an equivalent for loop with list.append()?",
        "hint": "Consider bytecode execution and attribute lookups.",
        "answer": "The comprehension uses the specialized LIST_APPEND opcode at C level, avoiding repeated lookups of the .append method and Python stack frame overhead."
      }
    ],
    "quiz": [
      {
        "id": "quiz-1",
        "question": "What is the output of [i * 2 for i in range(4) if i % 2 != 0]?",
        "options": [
          "[0, 2, 4, 6]",
          "[2, 6]",
          "[1, 3]",
          "[0, 4]"
        ],
        "correctIndex": 1,
        "explanation": "Odd numbers in range(4) are 1 and 3. Multiplying each by 2 yields [2, 6]."
      },
      {
        "id": "quiz-2",
        "question": "In the expression [x for row in grid for x in row], which loop is executed first?",
        "options": [
          "for x in row",
          "for row in grid",
          "Both simultaneously",
          "Neither; it is evaluated in reverse"
        ],
        "correctIndex": 1,
        "explanation": "The clauses read from left to right: 'for row in grid' is outer, and 'for x in row' is inner."
      },
      {
        "id": "quiz-3",
        "question": "What happens if you replace square brackets with parentheses: (x**2 for x in range(10))?",
        "options": [
          "Creates a tuple",
          "Creates a list",
          "Creates a generator expression",
          "SyntaxError"
        ],
        "correctIndex": 2,
        "explanation": "Parentheses with comprehension syntax create a memory-efficient, lazy generator object."
      }
    ],
    "codingChallenge": {
      "title": "Matrix Transposition via Comprehension",
      "problem": "Given an m x n matrix (a list of lists), return its transpose (an n x m matrix) using a single nested list comprehension.",
      "hints": [
        "In a transpose, the element at row c and column r becomes row r and column c.",
        "Iterate over column indices c first (outer comprehension), then over row elements (inner comprehension).",
        "Use len(matrix[0]) to determine the number of columns."
      ],
      "starterCode": "def transpose(matrix: list[list[int]]) -> list[list[int]]:\n    # Return transposed matrix using nested list comprehension\n    pass",
      "solution": "def transpose(matrix: list[list[int]]) -> list[list[int]]:\n    if not matrix or not matrix[0]:\n        return []\n    cols = len(matrix[0])\n    return [[row[c] for row in matrix] for c in range(cols)]"
    },
    "summary": {
      "keyTakeaways": [
        "[expr for x in iterable if condition] is Python's declarative list builder",
        "Filtering condition goes at the end; conditional value (if-else) goes in the expression before 'for'",
        "Nested comprehensions execute left-to-right from outermost loop to innermost loop",
        "List comprehensions are compiled with optimized LIST_APPEND bytecode, outperforming manual append loops",
        "Avoid side effects in comprehensions; prefer generator expressions when intermediate lists are not needed"
      ],
      "nextLessonId": "py-comp-dict-set",
      "nextLessonTitle": "Dictionary and Set Comprehensions",
      "nextLessonModuleId": "python-module-5"
    },
    "lineByLine": [
      {
        "line": "7",
        "lines": "7",
        "code": "[x for row in matrix for x in row]",
        "codeSnippet": "[x for row in matrix for x in row]",
        "explanation": "The order matches nested loops: 'for row in matrix' is the outer loop, 'for x in row' is the inner loop."
      },
      {
        "line": "12",
        "lines": "12",
        "code": "[w.upper() for w in words if len(w) > 3]",
        "codeSnippet": "[w.upper() for w in words if len(w) > 3]",
        "explanation": "Evaluates len(w) > 3. If True, computes w.upper() and appends to the resulting list."
      }
    ]
  },
  "py-comp-dict-set": {
    "id": "py-comp-dict-set",
    "moduleId": "python-module-5",
    "title": "Dictionary and Set Comprehensions",
    "subtitle": "{k: v for ...} and {expr for ...} Patterns for Instant Collection Building",
    "order": 2,
    "readTimeMinutes": 18,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Construct dictionaries concisely using {key_expr: value_expr for item in iterable if condition}.",
      "Construct sets with unique elements using {expr for item in iterable if condition}.",
      "Invert dictionaries (swap keys and values) safely in a single line.",
      "Filter, transform, and aggregate structured key-value maps with comprehensions."
    ],
    "prerequisites": [
      "Python dictionaries, sets, and basic list comprehensions."
    ],
    "analogy": {
      "title": "The Automated Sorting Carousel",
      "text": "A list comprehension is an assembly conveyor dropping boxes into a straight train car. A set comprehension is a magnetic sorter that drops items into a basket while vaporizing identical duplicates on contact. A dictionary comprehension is a label printer that prints a barcode ticket (key) and affixes it to the package (value) in a single swift motion.",
      "metaphor": "{k: v for ...} builds hash tables; {x for ...} builds unique hash sets directly."
    },
    "problemSolved": {
      "title": "Declarative Collection Construction and Inversion",
      "description": "Populating dictionaries or sets iteratively with for loops requires manual instantiation, explicit insertions (.add or [k] = v), and verbose branching. Comprehensions make collection construction declarative, faster, and more readable.",
      "keyPoints": [
        "Dict comprehensions require a colon separating key and value expressions: `{k: v for ...}`.",
        "Set comprehensions use curly braces without colons: `{x for ...}`.",
        "Inverting a dictionary `{v: k for k, v in d.items()}` requires unique values to avoid key collisions."
      ]
    },
    "intuition": {
      "overview": "Under the hood, CPython optimizes set and dict comprehensions using dedicated bytecode opcodes (MAP_ADD and SET_ADD), avoiding repeated Python method lookups.",
      "steps": [
        {
          "step": 1,
          "title": "Iterate",
          "description": "Evaluates the iterable expression sequentially."
        },
        {
          "step": 2,
          "title": "Filter",
          "description": "Checks optional `if` condition; skips item if condition evaluates falsy."
        },
        {
          "step": 3,
          "title": "Insert",
          "description": "Computes key/value or set element and executes low-level MAP_ADD or SET_ADD."
        }
      ]
    },
    "codeExample": {
      "title": "Dictionary Inversion and Filtered Set Creation",
      "code": "# Dictionary comprehension: invert mapping\ncode_to_country = {\"US\": \"United States\", \"FR\": \"France\", \"JP\": \"Japan\"}\ncountry_to_code = {country: code for code, country in code_to_country.items()}\nprint(\"Inverted dict:\", country_to_code)\n\n# Set comprehension: unique word lengths\nwords = [\"python\", \"data\", \"science\", \"code\", \"ai\", \"machine\"]\nword_lengths = {len(w) for w in words if len(w) > 3}\nprint(\"Unique word lengths > 3:\", word_lengths)",
      "explanation": "Demonstrates inverting a dictionary by swapping key and value, and building a set of distinct lengths."
    },
    "runnableCode": {
      "code": "prices_usd = {\"laptop\": 1200, \"mouse\": 25, \"keyboard\": 75, \"monitor\": 300}\nEUR_RATE = 0.92\n\n# Convert and filter items > 50 EUR\nprices_eur = {\n    item: round(usd * EUR_RATE, 2)\n    for item, usd in prices_usd.items()\n    if usd * EUR_RATE > 50\n}\nprint(\"Premium EUR items:\", prices_eur)",
      "expectedOutput": "Premium EUR items: {'laptop': 1104.0, 'keyboard': 69.0, 'monitor': 276.0}"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "prices_usd = {\"laptop\": 1200, \"mouse\": 25, \"keyboard\": 75, \"monitor\": 300}",
        "codeSnippet": "prices_usd = {\"laptop\": 1200, \"mouse\": 25, \"keyboard\": 75, \"monitor\": 300}",
        "explanation": "Initializes source catalog dictionary."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "prices_eur = {",
        "codeSnippet": "prices_eur = {",
        "explanation": "Starts dictionary comprehension."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "    item: round(usd * EUR_RATE, 2)",
        "codeSnippet": "    item: round(usd * EUR_RATE, 2)",
        "explanation": "Key expression is item name, value is converted and rounded EUR price."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "    for item, usd in prices_usd.items()",
        "codeSnippet": "    for item, usd in prices_usd.items()",
        "explanation": "Iterates key-value tuples from source dict."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "    if usd * EUR_RATE > 50",
        "codeSnippet": "    if usd * EUR_RATE > 50",
        "explanation": "Filters out items below 50 EUR threshold."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Inverting a dictionary where values are not unique: `{v: k for k, v in d.items()}`.",
        "solution": "If values are duplicated, group them into a dict of lists: `defaultdict(list)`.",
        "whyWrong": "Duplicate values cause later keys to overwrite earlier keys silently, losing data.",
        "howToFix": "If values are duplicated, group them into a dict of lists: `defaultdict(list)`."
      },
      {
        "mistake": "Using `()` expecting a set or dict comprehension.",
        "solution": "Use `{}` for sets and dicts.",
        "whyWrong": "`()` creates a generator expression, not a set or tuple comprehension.",
        "howToFix": "Use `{}` for sets and dicts."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Configuration Normalization",
        "description": "Converting environment variable strings into typed configurations."
      },
      {
        "title": "Graph Inversion",
        "description": "Inverting adjacency lists to compute reverse edge graphs."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-comp-dict-set-pq1",
        "question": "What distinguishes the syntax of a set comprehension from a dict comprehension?",
        "hint": "Presence of a colon.",
        "answer": "Dict comprehensions have a colon separating key and value (`{k: v for ...}`), while set comprehensions do not (`{x for ...}`)."
      },
      {
        "id": "py-comp-dict-set-pq2",
        "question": "Can keys in a dict comprehension be mutable lists?",
        "hint": "Recall hashability.",
        "answer": "No, dictionary keys must be hashable. Attempting to use a list raises TypeError: unhashable type: 'list'."
      },
      {
        "id": "py-comp-dict-set-pq3",
        "question": "What happens if a set comprehension generates duplicate values?",
        "hint": "Set uniqueness.",
        "answer": "Duplicates are silently ignored; only unique values remain in the resulting set."
      }
    ],
    "quiz": [
      {
        "id": "py-comp-dict-set-q1",
        "question": "What is the result of `{x % 3 for x in range(10)}`?",
        "options": [
          "{0, 1, 2}",
          "[0, 1, 2]",
          "{0, 1, 2, 0, 1, 2, 0, 1, 2, 0}",
          "{1, 2, 3}"
        ],
        "correctIndex": 0,
        "explanation": "Values of x % 3 are 0, 1, or 2. A set deduplicates them to `{0, 1, 2}`."
      },
      {
        "id": "py-comp-dict-set-q2",
        "question": "Which syntax properly creates a dictionary mapping numbers 1..4 to their squares?",
        "options": [
          "{x: x**2 for x in range(1, 5)}",
          "[x: x**2 for x in range(1, 5)]",
          "{x**2 for x in range(1, 5)}",
          "dict(x, x**2 for x in range(1, 5))"
        ],
        "correctIndex": 0,
        "explanation": "`{x: x**2 for x in range(1, 5)}` uses the `{k: v for ...}` dict comprehension syntax."
      },
      {
        "id": "py-comp-dict-set-q3",
        "question": "Why does CPython execute comprehensions faster than equivalent for-loops with .append() or .add()?",
        "options": [
          "They run on multiple CPU cores",
          "They use dedicated bytecode instructions (MAP_ADD, SET_ADD) that bypass Python method lookups",
          "They are compiled to C DLLs",
          "They disable garbage collection"
        ],
        "correctIndex": 1,
        "explanation": "CPython uses specialized bytecode instructions that avoid the overhead of looking up the attribute/method on each iteration."
      }
    ],
    "codingChallenge": {
      "title": "Group Words by First Character",
      "problem": "Write a function `group_by_initial(words: list[str]) -> dict[str, set[str]]` that takes a list of words and returns a dictionary where each key is a lowercase initial letter, and each value is a set of lowercase words starting with that letter.",
      "hints": [
        "Get unique lowercase initial letters using a set comprehension: {w[0].lower() for w in words if w}.",
        "For each initial, collect matching words into a set comprehension."
      ],
      "starterCode": "def group_by_initial(words: list[str]) -> dict[str, set[str]]:\n    # Write your solution here\n    pass",
      "solution": "def group_by_initial(words: list[str]) -> dict[str, set[str]]:\n    clean = [w.lower() for w in words if w]\n    initials = {w[0] for w in clean}\n    return {\n        init: {w for w in clean if w.startswith(init)}\n        for init in sorted(initials)\n    }",
      "testCases": [
        {
          "input": "[\"Apple\", \"apricot\", \"Banana\", \"avocado\", \"Berry\"]",
          "expectedOutput": "{\"a\": {\"apple\", \"apricot\", \"avocado\"}, \"b\": {\"banana\", \"berry\"}}"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "prices_usd = {\"laptop\": 1200, \"mouse\": 25, \"keyboard\": 75, \"monitor\": 300}",
        "codeSnippet": "prices_usd = {\"laptop\": 1200, \"mouse\": 25, \"keyboard\": 75, \"monitor\": 300}",
        "explanation": "Initializes source catalog dictionary."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "prices_eur = {",
        "codeSnippet": "prices_eur = {",
        "explanation": "Starts dictionary comprehension."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "    item: round(usd * EUR_RATE, 2)",
        "codeSnippet": "    item: round(usd * EUR_RATE, 2)",
        "explanation": "Key expression is item name, value is converted and rounded EUR price."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "    for item, usd in prices_usd.items()",
        "codeSnippet": "    for item, usd in prices_usd.items()",
        "explanation": "Iterates key-value tuples from source dict."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "    if usd * EUR_RATE > 50",
        "codeSnippet": "    if usd * EUR_RATE > 50",
        "explanation": "Filters out items below 50 EUR threshold."
      }
    ],
    "applications": [
      {
        "industry": "Configuration Normalization",
        "application": "Converting environment variable strings into typed configurations.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Configuration Normalization",
        "description": "Converting environment variable strings into typed configurations."
      },
      {
        "industry": "Graph Inversion",
        "application": "Inverting adjacency lists to compute reverse edge graphs.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Graph Inversion",
        "description": "Inverting adjacency lists to compute reverse edge graphs."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Construct dictionaries concisely using {key_expr: value_expr for item in iterable if condition}.",
        "Construct sets with unique elements using {expr for item in iterable if condition}.",
        "Invert dictionaries (swap keys and values) safely in a single line."
      ]
    }
  },
  "py-comp-generators": {
    "id": "py-comp-generators",
    "moduleId": "python-module-5",
    "title": "Generator Expressions",
    "subtitle": "Lazy Evaluation, Memory Efficiency vs List Comprehensions, and Streaming",
    "order": 3,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Define generator expressions with `(expr for item in iterable)`.",
      "Understand lazy evaluation: producing values one-at-a-time on demand.",
      "Compare memory consumption: O(1) generator expressions vs O(N) list comprehensions using sys.getsizeof().",
      "Pass generator expressions directly into aggregators like sum(), min(), max(), and any()."
    ],
    "prerequisites": [
      "List comprehensions and basic memory intuition."
    ],
    "analogy": {
      "title": "The Reservoir vs The Water Tap",
      "text": "A list comprehension is like filling an Olympic-sized swimming pool before drinking: you must wait for all 10 million gallons to arrive, and your backyard (RAM) must be large enough to hold it. A generator expression is turning on a kitchen tap: it produces a single fresh glass of water whenever you open the valve, consuming zero storage in your backyard.",
      "metaphor": "Generators compute values lazily on demand rather than buffering all results in RAM."
    },
    "problemSolved": {
      "title": "Processing Gigabyte and Terabyte Datasets in Constant Memory",
      "description": "When processing large files or million-row databases, loading everything into a list causes Out-Of-Memory (OOM) fatal crashes. Generator expressions allow streaming arbitrary amounts of data with fixed O(1) auxiliary memory.",
      "keyPoints": [
        "Generator expressions use round parentheses: `(x * 2 for x in seq)`.",
        "When passed as the sole argument to a function, outer parentheses can be omitted: `sum(x for x in seq)`.",
        "Generators are single-use iterators: once consumed, they cannot be restarted."
      ]
    },
    "intuition": {
      "overview": "A generator expression compiles to an anonymous generator object with a suspended frame state. It yields control back to the caller after producing each item.",
      "steps": [
        {
          "step": 1,
          "title": "Instantiation",
          "description": "Creates generator iterator object without executing loop body."
        },
        {
          "step": 2,
          "title": "Evaluation on next()",
          "description": "Executes until next value is produced and pauses."
        },
        {
          "step": 3,
          "title": "Exhaustion",
          "description": "Raises StopIteration when underlying sequence is exhausted."
        }
      ]
    },
    "codeExample": {
      "title": "Memory Comparison: List vs Generator",
      "code": "import sys\n\n# List comprehension: builds 1 million ints in memory\nsquares_list = [x ** 2 for x in range(1_000_000)]\nlist_bytes = sys.getsizeof(squares_list)\n\n# Generator expression: lazy stream\nsquares_gen = (x ** 2 for x in range(1_000_000))\ngen_bytes = sys.getsizeof(squares_gen)\n\nprint(f\"List size: {list_bytes:,} bytes (~8.4 MB)\")\nprint(f\"Generator size: {gen_bytes:,} bytes (~200 bytes)\")\nprint(\"Sum via generator:\", sum(squares_gen))",
      "explanation": "Demonstrates how a generator expression takes ~200 bytes of memory regardless of whether it processes 10 items or 10 billion items."
    },
    "runnableCode": {
      "code": "nums = range(1, 6)\ngen = (x * 10 for x in nums)\n\nprint(\"First item:\", next(gen))\nprint(\"Second item:\", next(gen))\nprint(\"Remaining items consumed via list:\", list(gen))\nprint(\"Attempting to read again:\", list(gen)) # Empty!",
      "expectedOutput": "First item: 10\nSecond item: 20\nRemaining items consumed via list: [30, 40, 50]\nAttempting to read again: []"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "gen = (x * 10 for x in nums)",
        "codeSnippet": "gen = (x * 10 for x in nums)",
        "explanation": "Creates generator expression producing multiples of 10."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "print(\"First item:\", next(gen))",
        "codeSnippet": "print(\"First item:\", next(gen))",
        "explanation": "Advances generator by 1 step, evaluating 1 * 10 = 10."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(\"Second item:\", next(gen))",
        "codeSnippet": "print(\"Second item:\", next(gen))",
        "explanation": "Advances generator by 1 step, evaluating 2 * 10 = 20."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "print(\"Remaining items consumed via list:\", list(gen))",
        "codeSnippet": "print(\"Remaining items consumed via list:\", list(gen))",
        "explanation": "Consumes the remaining values [30, 40, 50]."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "print(\"Attempting to read again:\", list(gen))",
        "codeSnippet": "print(\"Attempting to read again:\", list(gen))",
        "explanation": "Generator is exhausted; returns empty list."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Trying to reuse or rewind a generator expression after consumption.",
        "solution": "Create a new generator or convert to a list if multiple passes are required.",
        "whyWrong": "Generators are one-way streams. Once exhausted, they remain empty.",
        "howToFix": "Create a new generator or convert to a list if multiple passes are required."
      },
      {
        "mistake": "Using a list comprehension inside `sum([x for x in seq])` instead of a generator.",
        "solution": "Omit brackets: `sum(x for x in seq)` uses an efficient generator directly.",
        "whyWrong": "Allocates an unnecessary temporary list in memory before summing.",
        "howToFix": "Omit brackets: `sum(x for x in seq)` uses an efficient generator directly."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Log Streaming",
        "description": "Searching terabytes of web server logs without loading entire files into memory."
      },
      {
        "title": "Database Result Streaming",
        "description": "Streaming millions of rows from PostgreSQL cursors without memory spikes."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-comp-generators-pq1",
        "question": "What is the syntax for creating a generator expression?",
        "hint": "Parentheses vs brackets.",
        "answer": "Parentheses: `(expr for item in iterable if condition)`."
      },
      {
        "id": "py-comp-generators-pq2",
        "question": "Why does `sys.getsizeof(gen)` remain constant regardless of sequence length?",
        "hint": "Lazy evaluation.",
        "answer": "Because the generator only stores the current frame state and computation code, not the generated data elements."
      },
      {
        "id": "py-comp-generators-pq3",
        "question": "What exception is raised when calling `next()` on an exhausted generator?",
        "hint": "Iteration stop signal.",
        "answer": "`StopIteration`."
      }
    ],
    "quiz": [
      {
        "id": "py-comp-generators-q1",
        "question": "What type is `x = (i for i in range(5))`?",
        "options": [
          "tuple",
          "generator",
          "list",
          "iterator class"
        ],
        "correctIndex": 1,
        "explanation": "Parentheses around a comprehension create a generator object (not a tuple)."
      },
      {
        "id": "py-comp-generators-q2",
        "question": "How do you create a tuple using comprehension-like syntax?",
        "options": [
          "(x for x in range(5))",
          "tuple(x for x in range(5))",
          "tuple[x for x in range(5)]",
          "((x for x in range(5)))"
        ],
        "correctIndex": 1,
        "explanation": "`tuple()` constructor wrapping a generator expression: `tuple(x for x in range(5))`."
      },
      {
        "id": "py-comp-generators-q3",
        "question": "When should you prefer a list comprehension over a generator expression?",
        "options": [
          "When working with infinite streams",
          "When you need to index, slice, measure len(), or iterate multiple times",
          "When memory is extremely constrained",
          "Never"
        ],
        "correctIndex": 1,
        "explanation": "Lists allow indexing, slicing, `len()`, and multiple iterations, which generators do not support."
      }
    ],
    "codingChallenge": {
      "title": "Streaming Sum of Large Squares",
      "problem": "Write a function `sum_even_squares(start: int, end: int) -> int` that computes the sum of squares of all even integers in the range `[start, end]` (inclusive) using a generator expression inside `sum()`, without creating any intermediate lists.",
      "hints": [
        "Use range(start, end + 1).",
        "Pass generator (x**2 for x in ... if x % 2 == 0) directly into sum()."
      ],
      "starterCode": "def sum_even_squares(start: int, end: int) -> int:\n    # Write your solution here\n    pass",
      "solution": "def sum_even_squares(start: int, end: int) -> int:\n    return sum(x ** 2 for x in range(start, end + 1) if x % 2 == 0)",
      "testCases": [
        {
          "input": "1, 10",
          "expectedOutput": "220"
        },
        {
          "input": "1, 4",
          "expectedOutput": "20"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "gen = (x * 10 for x in nums)",
        "codeSnippet": "gen = (x * 10 for x in nums)",
        "explanation": "Creates generator expression producing multiples of 10."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "print(\"First item:\", next(gen))",
        "codeSnippet": "print(\"First item:\", next(gen))",
        "explanation": "Advances generator by 1 step, evaluating 1 * 10 = 10."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(\"Second item:\", next(gen))",
        "codeSnippet": "print(\"Second item:\", next(gen))",
        "explanation": "Advances generator by 1 step, evaluating 2 * 10 = 20."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "print(\"Remaining items consumed via list:\", list(gen))",
        "codeSnippet": "print(\"Remaining items consumed via list:\", list(gen))",
        "explanation": "Consumes the remaining values [30, 40, 50]."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "print(\"Attempting to read again:\", list(gen))",
        "codeSnippet": "print(\"Attempting to read again:\", list(gen))",
        "explanation": "Generator is exhausted; returns empty list."
      }
    ],
    "applications": [
      {
        "industry": "Log Streaming",
        "application": "Searching terabytes of web server logs without loading entire files into memory.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Log Streaming",
        "description": "Searching terabytes of web server logs without loading entire files into memory."
      },
      {
        "industry": "Database Result Streaming",
        "application": "Streaming millions of rows from PostgreSQL cursors without memory spikes.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Database Result Streaming",
        "description": "Streaming millions of rows from PostgreSQL cursors without memory spikes."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Define generator expressions with `(expr for item in iterable)`.",
        "Understand lazy evaluation: producing values one-at-a-time on demand.",
        "Compare memory consumption: O(1) generator expressions vs O(N) list comprehensions using sys.getsizeof()."
      ]
    }
  },
  "py-comp-iterables": {
    "id": "py-comp-iterables",
    "moduleId": "python-module-5",
    "title": "Iterables and Iterators Protocol",
    "subtitle": "__iter__ and __next__, iter() and next(), and Custom Iterator Classes",
    "order": 4,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "execution-trace",
    "objectives": [
      "Understand the Python Iterator Protocol: `__iter__()` and `__next__()`.",
      "Distinguish between an Iterable (can produce an iterator) and an Iterator (holds state and produces values).",
      "Use built-in iter() with sentinel values for streaming loops.",
      "Build robust custom iterator classes from scratch with graceful StopIteration termination."
    ],
    "prerequisites": [
      "Python classes basics and while/for loops."
    ],
    "analogy": {
      "title": "The Book and the Bookmarker",
      "text": "An Iterable is a book on a shelf: it contains content and you can read it anytime, but the book itself doesn't know what page you are currently on. An Iterator is a reader with a physical bookmark: they place the bookmark on page 1, advance it one page at a time (next), remember exactly where they stopped, and announce \"Finished!\" (StopIteration) when they reach the back cover.",
      "metaphor": "Iterable implements __iter__; Iterator implements __iter__ AND __next__."
    },
    "problemSolved": {
      "title": "Demystifying How Python's `for` Loop Actually Works",
      "description": "Python doesn't use C-style index loops `for (int i=0; i<n; i++)`. Every `for` loop in Python uses the Iterator Protocol under the hood. Understanding this protocol unlocks custom data pipelines and streaming.",
      "keyPoints": [
        "`for x in obj:` internally calls `it = iter(obj)` then calls `next(it)` repeatedly until `StopIteration`.",
        "An Iterable implements `__iter__()` returning an iterator.",
        "An Iterator implements both `__next__()` and `__iter__()` (returning `self`)."
      ]
    },
    "intuition": {
      "overview": "The iterator protocol decouples data container storage from iteration traversal logic.",
      "steps": [
        {
          "step": 1,
          "title": "Obtain Iterator",
          "description": "iter(iterable) invokes iterable.__iter__() returning an iterator."
        },
        {
          "step": 2,
          "title": "Fetch Next Value",
          "description": "next(iterator) invokes iterator.__next__() returning the current item and advancing internal pointer."
        },
        {
          "step": 3,
          "title": "Handle Termination",
          "description": "When exhausted, __next__() raises StopIteration, which the for loop catches silently."
        }
      ]
    },
    "codeExample": {
      "title": "Building a Custom Range Iterator Class",
      "code": "class Countdown:\n    \"\"\"Custom iterator counting down from start to 1.\"\"\"\n    def __init__(self, start: int):\n        self.current = start\n        \n    def __iter__(self):\n        return self  # Iterators return themselves\n        \n    def __next__(self) -> int:\n        if self.current <= 0:\n            raise StopIteration\n        val = self.current\n        self.current -= 1\n        return val\n\n# Works seamlessly with for loops\nfor num in Countdown(3):\n    print(f\"T-minus: {num}\")",
      "explanation": "Demonstrates implementing `__iter__` returning self and `__next__` raising StopIteration."
    },
    "runnableCode": {
      "code": "# Deconstructing a for loop into raw iter() and next()\nitems = [\"alpha\", \"beta\", \"gamma\"]\niterator = iter(items)\n\nwhile True:\n    try:\n        val = next(iterator)\n        print(\"Iterated:\", val)\n    except StopIteration:\n        print(\"Loop terminated cleanly!\")\n        break",
      "expectedOutput": "Iterated: alpha\nIterated: beta\nIterated: gamma\nLoop terminated cleanly!"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "items = [\"alpha\", \"beta\", \"gamma\"]",
        "codeSnippet": "items = [\"alpha\", \"beta\", \"gamma\"]",
        "explanation": "Standard list (an Iterable)."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "iterator = iter(items)",
        "codeSnippet": "iterator = iter(items)",
        "explanation": "Calls items.__iter__() getting list_iterator object."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "val = next(iterator)",
        "codeSnippet": "val = next(iterator)",
        "explanation": "Fetches next item from iterator."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "except StopIteration:",
        "codeSnippet": "except StopIteration:",
        "explanation": "Catches StopIteration when sequence ends."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting to implement `__iter__` on a custom iterator class.",
        "solution": "Always include `def __iter__(self): return self` on iterator classes.",
        "whyWrong": "Without `__iter__`, Python does not recognize the class as an Iterable, breaking `for x in my_iterator`.",
        "howToFix": "Always include `def __iter__(self): return self` on iterator classes."
      },
      {
        "mistake": "Assuming an Iterator can be iterated multiple times in separate loops.",
        "solution": "Separate the Iterable container from the Iterator, or reset state in `__iter__`.",
        "whyWrong": "Once an iterator raises StopIteration, its internal pointer is at the end; subsequent calls immediately raise StopIteration.",
        "howToFix": "Separate the Iterable container from the Iterator, or reset state in `__iter__`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Custom Database Pagers",
        "description": "Paginating through database API records seamlessly in a single for loop."
      },
      {
        "title": "Circular Buffers",
        "description": "Iterators cycling continuously through round-robin task workers."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-comp-iterables-pq1",
        "question": "What two methods make up the Python Iterator Protocol?",
        "hint": "Dunder methods on iterables and iterators.",
        "answer": "`__iter__()` and `__next__()`."
      },
      {
        "id": "py-comp-iterables-pq2",
        "question": "Is a Python list an Iterator?",
        "hint": "Does list have a __next__ method?",
        "answer": "No, a list is an Iterable, not an Iterator. It has `__iter__()` which creates an iterator, but does not have `__next__()`."
      },
      {
        "id": "py-comp-iterables-pq3",
        "question": "What built-in function takes a callable and a sentinel value to create an iterator?",
        "hint": "Two-argument form of...",
        "answer": "The two-argument form of `iter(callable, sentinel)`."
      }
    ],
    "quiz": [
      {
        "id": "py-comp-iterables-q1",
        "question": "What exception signals the completion of iteration in Python?",
        "options": [
          "IndexError",
          "StopIteration",
          "EndLoopException",
          "EOFError"
        ],
        "correctIndex": 1,
        "explanation": "`StopIteration` is the standard exception raised by `__next__()` to signal termination."
      },
      {
        "id": "py-comp-iterables-q2",
        "question": "Which of the following implements the Iterator protocol?",
        "options": [
          "An object with __iter__() returning an object with __next__()",
          "An object with just __getitem__()",
          "An object with a .loop() method",
          "An object with __call__()"
        ],
        "correctIndex": 0,
        "explanation": "The iterator protocol requires `__iter__()` and `__next__()`."
      },
      {
        "id": "py-comp-iterables-q3",
        "question": "What does `iter(f.readline, \"\")` do when reading a file `f`?",
        "options": [
          "Reads the whole file as a string",
          "Returns an iterator that reads lines until an empty string \"\" (EOF) is encountered",
          "Raises TypeError",
          "Clears file content"
        ],
        "correctIndex": 1,
        "explanation": "The 2-argument `iter(callable, sentinel)` repeatedly calls the callable until it returns the sentinel value."
      }
    ],
    "codingChallenge": {
      "title": "Build Cycle Iterator",
      "problem": "Write an iterator class `CycleList` that takes a non-empty list and a `max_cycles: int` count. It iterates through the list repeatedly until `max_cycles` complete passes have occurred, then raises `StopIteration`.",
      "hints": [
        "Track current_index and completed_cycles.",
        "When current_index reaches len(items), reset to 0 and increment completed_cycles.",
        "If completed_cycles >= max_cycles, raise StopIteration."
      ],
      "starterCode": "class CycleList:\n    def __init__(self, items: list, max_cycles: int):\n        # Write your solution here\n        pass\n        \n    def __iter__(self):\n        return self\n        \n    def __next__(self):\n        pass",
      "solution": "class CycleList:\n    def __init__(self, items: list, max_cycles: int):\n        self.items = items\n        self.max_cycles = max_cycles\n        self.index = 0\n        self.cycles = 0\n        \n    def __iter__(self):\n        return self\n        \n    def __next__(self):\n        if self.cycles >= self.max_cycles or not self.items:\n            raise StopIteration\n        val = self.items[self.index]\n        self.index += 1\n        if self.index >= len(self.items):\n            self.index = 0\n            self.cycles += 1\n        return val",
      "testCases": [
        {
          "input": "list(CycleList([\"A\", \"B\"], 2))",
          "expectedOutput": "[\"A\", \"B\", \"A\", \"B\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "items = [\"alpha\", \"beta\", \"gamma\"]",
        "codeSnippet": "items = [\"alpha\", \"beta\", \"gamma\"]",
        "explanation": "Standard list (an Iterable)."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "iterator = iter(items)",
        "codeSnippet": "iterator = iter(items)",
        "explanation": "Calls items.__iter__() getting list_iterator object."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "val = next(iterator)",
        "codeSnippet": "val = next(iterator)",
        "explanation": "Fetches next item from iterator."
      },
      {
        "line": 9,
        "lines": "9",
        "code": "except StopIteration:",
        "codeSnippet": "except StopIteration:",
        "explanation": "Catches StopIteration when sequence ends."
      }
    ],
    "applications": [
      {
        "industry": "Custom Database Pagers",
        "application": "Paginating through database API records seamlessly in a single for loop.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Custom Database Pagers",
        "description": "Paginating through database API records seamlessly in a single for loop."
      },
      {
        "industry": "Circular Buffers",
        "application": "Iterators cycling continuously through round-robin task workers.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Circular Buffers",
        "description": "Iterators cycling continuously through round-robin task workers."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand the Python Iterator Protocol: `__iter__()` and `__next__()`.",
        "Distinguish between an Iterable (can produce an iterator) and an Iterator (holds state and produces values).",
        "Use built-in iter() with sentinel values for streaming loops."
      ]
    }
  },
  "py-comp-yield": {
    "id": "py-comp-yield",
    "moduleId": "python-module-5",
    "title": "yield and Generator Functions",
    "subtitle": "Execution Suspension, Generator Lifecycles, Pipelines, and yield from",
    "order": 5,
    "readTimeMinutes": 28,
    "difficulty": "Advanced",
    "visualizerType": "execution-trace",
    "objectives": [
      "Define generator functions using the yield keyword.",
      "Understand execution suspension: how yield freezes stack frames and variable states.",
      "Compose data processing pipelines by chaining generator functions.",
      "Delegate sub-generators cleanly using `yield from` syntax."
    ],
    "prerequisites": [
      "Python functions, iterators, and execution frames."
    ],
    "analogy": {
      "title": "The Pausable Factory Machine",
      "text": "A normal `return` function is a machine that destroys itself every time it finishes making a widget: the blueprints are shredded, workers sent home, and if you want another widget you must build the factory from scratch. A `yield` generator function is a machine with a Pause button: it crafts a widget, slides it through the window, and stands perfectly frozen until you press Resume for the next widget.",
      "metaphor": "yield suspends execution and preserves local variable state between caller requests."
    },
    "problemSolved": {
      "title": "Infinite Streams and Composable Data Pipelines",
      "description": "Writing custom iterator classes requires tedious state tracking attributes (`self.index`, `self.state`). Generator functions allow writing standard sequential loops that turn into stateful iterators automatically.",
      "keyPoints": [
        "Any function containing `yield` becomes a generator function returning a generator iterator.",
        "Calling the function does NOT execute its body; execution starts only on `next()`.",
        "`yield from iterable` delegates value production directly to a sub-iterable."
      ]
    },
    "intuition": {
      "overview": "CPython allocates a generator frame on the heap. When `yield` executes, the instruction pointer is stored and the frame state is preserved in memory.",
      "steps": [
        {
          "step": 1,
          "title": "Creation",
          "description": "Invoking the generator function instantiates a PyGenObject containing a code object and frame."
        },
        {
          "step": 2,
          "title": "Yielding",
          "description": "Execution runs until yield; the operand is delivered to the caller and the frame pauses."
        },
        {
          "step": 3,
          "title": "Resumption",
          "description": "The next next() call resumes execution at the exact instruction immediately following yield."
        }
      ]
    },
    "codeExample": {
      "title": "Streaming Data Pipeline with Generators and yield from",
      "code": "def read_lines(raw_data: str):\n    \"\"\"Yield cleaned non-empty lines.\"\"\"\n    for line in raw_data.strip().splitlines():\n        cleaned = line.strip()\n        if cleaned:\n            yield cleaned\n\ndef filter_errors(lines):\n    \"\"\"Filter lines containing ERROR.\"\"\"\n    for line in lines:\n        if \"ERROR\" in line:\n            yield line\n\ndef multi_source(*sources):\n    \"\"\"Delegating to sub-generators with yield from.\"\"\"\n    for src in sources:\n        yield from src\n\n# Pipeline chaining: O(1) memory streaming\nlog_data = \"INFO: Boot\\nERROR: Disk full\\nDEBUG: Ping\\nERROR: Timeout\"\npipeline = filter_errors(read_lines(log_data))\nfor err in pipeline:\n    print(\"Detected:\", err)",
      "explanation": "Demonstrates composing a UNIX-style processing pipeline using generator stages and delegating with yield from."
    },
    "runnableCode": {
      "code": "def fibonacci_stream():\n    \"\"\"Infinite generator of Fibonacci numbers.\"\"\"\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\n# Consume first 7 numbers\nfib = fibonacci_stream()\nfirst_seven = [next(fib) for _ in range(7)]\nprint(\"First 7 Fibonacci numbers:\", first_seven)",
      "expectedOutput": "First 7 Fibonacci numbers: [0, 1, 1, 2, 3, 5, 8]"
    },
    "lineByLine": [
      {
        "line": 1,
        "lines": "1",
        "code": "def fibonacci_stream():",
        "codeSnippet": "def fibonacci_stream():",
        "explanation": "Generator function definition."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    a, b = 0, 1",
        "codeSnippet": "    a, b = 0, 1",
        "explanation": "Local state preserved across yields."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "    while True:",
        "codeSnippet": "    while True:",
        "explanation": "Infinite loop; safe because yield pauses execution each step."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "        yield a",
        "codeSnippet": "        yield a",
        "explanation": "Yields current number and freezes frame."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "        a, b = b, a + b",
        "codeSnippet": "        a, b = b, a + b",
        "explanation": "Updates state when resumed by caller."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Calling a generator function and expecting it to execute immediately without calling `next()`.",
        "solution": "Iterate over it with a for loop, list(), or call `next()`.",
        "whyWrong": "Calling a generator function only constructs the generator object; not a single line of the body executes.",
        "howToFix": "Iterate over it with a for loop, list(), or call `next()`."
      },
      {
        "mistake": "Using `return val` inside a generator in Python 2 style.",
        "solution": "Use `yield val` to emit values from a generator.",
        "whyWrong": "In Python 3.3+, `return val` inside a generator raises `StopIteration(val)`, which is used to return a final value in coroutines, not to yield data.",
        "howToFix": "Use `yield val` to emit values from a generator."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Machine Learning Data Loaders",
        "description": "Yielding minibatches of image tensors loaded from disk on the fly."
      },
      {
        "title": "WebSocket Event Streams",
        "description": "Yielding incoming socket frames as they arrive from network buffers."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-comp-yield-pq1",
        "question": "What is the type returned when you call a function containing the `yield` keyword?",
        "hint": "Special iterator type.",
        "answer": "A `generator` object."
      },
      {
        "id": "py-comp-yield-pq2",
        "question": "What does `yield from [1, 2, 3]` do inside a generator?",
        "hint": "Sub-generator delegation.",
        "answer": "It iterates through `[1, 2, 3]` and yields each element individually to the outer caller."
      },
      {
        "id": "py-comp-yield-pq3",
        "question": "Can a generator function contain an infinite `while True:` loop?",
        "hint": "Is it safe?",
        "answer": "Yes, because `yield` suspends execution at each iteration, values are produced only when requested by the caller."
      }
    ],
    "quiz": [
      {
        "id": "py-comp-yield-q1",
        "question": "When does the code inside a generator function actually begin executing?",
        "options": [
          "When the function is defined",
          "When the function is called",
          "When next() is called for the first time on the generator",
          "When the Python process exits"
        ],
        "correctIndex": 2,
        "explanation": "Calling a generator function only instantiates the generator object; execution starts on the first `next()` call."
      },
      {
        "id": "py-comp-yield-q2",
        "question": "What is the primary advantage of `yield from subgen()` over `for item in subgen(): yield item`?",
        "options": [
          "It runs on a C-level thread",
          "It delegates bidirectional channels including send(), throw(), and return values",
          "It makes the subgen immutable",
          "It compiles to machine code"
        ],
        "correctIndex": 1,
        "explanation": "`yield from` transparently establishes a bidirectional communication channel passing `send()`, `throw()`, and return values between caller and subgenerator."
      },
      {
        "id": "py-comp-yield-q3",
        "question": "What happens to the local variables of a generator function when it yields?",
        "options": [
          "They are destroyed and garbage collected",
          "They are saved in the generator's frame state on the heap",
          "They are converted to global variables",
          "They are written to disk"
        ],
        "correctIndex": 1,
        "explanation": "Local variables remain preserved in the suspended execution frame on the heap."
      }
    ],
    "codingChallenge": {
      "title": "Sliding Window Generator",
      "problem": "Write a generator function `sliding_window(iterable, window_size: int)` that yields consecutive overlapping tuples of length `window_size` across the input iterable. If length < window_size, yield nothing.",
      "hints": [
        "Use collections.deque with maxlen=window_size.",
        "Append items; when len(dq) == window_size, yield tuple(dq)."
      ],
      "starterCode": "def sliding_window(iterable, window_size: int):\n    # Write your solution here\n    pass",
      "solution": "from collections import deque\n\ndef sliding_window(iterable, window_size: int):\n    if window_size <= 0:\n        return\n    dq = deque(maxlen=window_size)\n    for item in iterable:\n        dq.append(item)\n        if len(dq) == window_size:\n            yield tuple(dq)",
      "testCases": [
        {
          "input": "list(sliding_window([1, 2, 3, 4, 5], 3))",
          "expectedOutput": "[(1, 2, 3), (2, 3, 4), (3, 4, 5)]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 1,
        "lines": "1",
        "code": "def fibonacci_stream():",
        "codeSnippet": "def fibonacci_stream():",
        "explanation": "Generator function definition."
      },
      {
        "line": 3,
        "lines": "3",
        "code": "    a, b = 0, 1",
        "codeSnippet": "    a, b = 0, 1",
        "explanation": "Local state preserved across yields."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "    while True:",
        "codeSnippet": "    while True:",
        "explanation": "Infinite loop; safe because yield pauses execution each step."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "        yield a",
        "codeSnippet": "        yield a",
        "explanation": "Yields current number and freezes frame."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "        a, b = b, a + b",
        "codeSnippet": "        a, b = b, a + b",
        "explanation": "Updates state when resumed by caller."
      }
    ],
    "applications": [
      {
        "industry": "Machine Learning Data Loaders",
        "application": "Yielding minibatches of image tensors loaded from disk on the fly.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Machine Learning Data Loaders",
        "description": "Yielding minibatches of image tensors loaded from disk on the fly."
      },
      {
        "industry": "WebSocket Event Streams",
        "application": "Yielding incoming socket frames as they arrive from network buffers.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "WebSocket Event Streams",
        "description": "Yielding incoming socket frames as they arrive from network buffers."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Define generator functions using the yield keyword.",
        "Understand execution suspension: how yield freezes stack frames and variable states.",
        "Compose data processing pipelines by chaining generator functions."
      ]
    }
  },
  "py-comp-builtins": {
    "id": "py-comp-builtins",
    "moduleId": "python-module-5",
    "title": "enumerate, zip, sorted, and map",
    "subtitle": "Essential Built-in Iteration Tools, Strict Zipping, and Chaining Iterators",
    "order": 6,
    "readTimeMinutes": 20,
    "difficulty": "Intermediate",
    "visualizerType": "none",
    "objectives": [
      "Use enumerate() with custom start offsets to replace manual index counter variables.",
      "Use zip() to iterate multiple sequences in parallel, and understand zip(strict=True) in Python 3.10+.",
      "Use sorted() with key and reverse parameters without mutating original sequences.",
      "Chain and combine iteration built-ins for expressive data transformations."
    ],
    "prerequisites": [
      "Python iteration and sequence basics."
    ],
    "analogy": {
      "title": "The Multi-Track Audio Mixer",
      "text": "Imagine recording a musical band. `enumerate()` is the timecode display stamping exact second numbers onto the tape. `zip()` is the master soundboard locking the vocal track, drum track, and bass track into synchronized lock-step. `sorted()` is the remix playlist arranging songs by pitch without modifying the master analog tapes.",
      "metaphor": "Iteration built-ins synchronize, index, and transform multiple data streams simultaneously."
    },
    "problemSolved": {
      "title": "Eliminating Clunky Index Arithmetic and Out-of-Sync Loops",
      "description": "Manual index loops like `for i in range(len(items)):` are error-prone and un-Pythonic. Built-ins like enumerate and zip eliminate off-by-one errors and provide clean parallel sequence consumption.",
      "keyPoints": [
        "`enumerate(iterable, start=0)` yields `(index, item)` pairs.",
        "`zip(*iterables)` pairs corresponding elements from multiple iterables until the shortest terminates.",
        "`zip(strict=True)` in Python 3.10+ raises `ValueError` if iterables have unequal lengths.",
        "`sorted(iterable)` returns a new sorted list, leaving the original sequence unchanged."
      ]
    },
    "intuition": {
      "overview": "These built-ins return lightweight iterator objects that process elements on the fly with minimal memory allocation.",
      "steps": [
        {
          "step": 1,
          "title": "Pairing",
          "description": "zip pulls 1 item from each iterator and packs into a tuple."
        },
        {
          "step": 2,
          "title": "Enumerating",
          "description": "enumerate increments an internal counter and pairs with next item."
        },
        {
          "step": 3,
          "title": "Sorting",
          "description": "sorted collects elements and applies Timsort in O(N log N) time."
        }
      ]
    },
    "codeExample": {
      "title": "Practical Application of enumerate, zip, and sorted",
      "code": "students = [\"Alice\", \"Bob\", \"Charlie\"]\nscores = [92, 85, 96]\ngrades = [\"A\", \"B\", \"A+\"]\n\n# Parallel iteration with zip\nroster = list(zip(students, scores, grades))\n\n# Ranking with enumerate and sorted\nranked = sorted(roster, key=lambda x: x[1], reverse=True)\nfor rank, (name, score, grade) in enumerate(ranked, start=1):\n    print(f\"Rank #{rank}: {name} ({score} pts, Grade {grade})\")",
      "explanation": "Demonstrates zip pairing three lists, sorted ranking by score descending, and enumerate providing 1-based ranks."
    },
    "runnableCode": {
      "code": "keys = [\"id\", \"username\", \"status\"]\nvals = [101, \"coder99\", \"active\"]\n\n# Building dict via zip\nuser_dict = dict(zip(keys, vals))\nprint(\"Constructed dict:\", user_dict)\n\n# enumerate with custom start\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor idx, fruit in enumerate(fruits, start=100):\n    print(f\"SKU {idx}: {fruit}\")",
      "expectedOutput": "Constructed dict: {'id': 101, 'username': 'coder99', 'status': 'active'}\nSKU 100: apple\nSKU 101: banana\nSKU 102: cherry"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "user_dict = dict(zip(keys, vals))",
        "codeSnippet": "user_dict = dict(zip(keys, vals))",
        "explanation": "Pairs key-value tuples and passes directly into dict constructor."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "for idx, fruit in enumerate(fruits, start=100):",
        "codeSnippet": "for idx, fruit in enumerate(fruits, start=100):",
        "explanation": "Enumerates fruits beginning counter at 100."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "    print(f\"SKU {idx}: {fruit}\")",
        "codeSnippet": "    print(f\"SKU {idx}: {fruit}\")",
        "explanation": "Prints SKU and fruit name."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `for i in range(len(seq)): item = seq[i]`.",
        "solution": "Use `for i, item in enumerate(seq):`.",
        "whyWrong": "Un-Pythonic, slower, and prone to off-by-one errors.",
        "howToFix": "Use `for i, item in enumerate(seq):`."
      },
      {
        "mistake": "Using `zip()` on sequences of different lengths without realizing shorter sequence truncates silently.",
        "solution": "In Python 3.10+, use `zip(a, b, strict=True)` to raise ValueError on length mismatch, or `itertools.zip_longest`.",
        "whyWrong": "Data from longer sequences is silently discarded without warning.",
        "howToFix": "In Python 3.10+, use `zip(a, b, strict=True)` to raise ValueError on length mismatch, or `itertools.zip_longest`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "CSV Column Mapping",
        "description": "Zipping header row with row cell values to construct record dictionaries."
      },
      {
        "title": "Leaderboards & Rankings",
        "description": "Enumerate and sorted building competitive sports or test standings."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-comp-builtins-pq1",
        "question": "What does `enumerate(items, start=1)` yield on its first iteration?",
        "hint": "Tuple of index and item.",
        "answer": "`(1, items[0])`."
      },
      {
        "id": "py-comp-builtins-pq2",
        "question": "What happens in Python 3.10+ if you use `zip(a, b, strict=True)` and `len(a) != len(b)`?",
        "hint": "Safety exception.",
        "answer": "It raises a `ValueError`."
      },
      {
        "id": "py-comp-builtins-pq3",
        "question": "What is the difference between `list.sort()` and `sorted(list)`?",
        "hint": "In-place mutation vs new list.",
        "answer": "`list.sort()` sorts in-place and returns `None`; `sorted(list)` leaves original unchanged and returns a new sorted list."
      }
    ],
    "quiz": [
      {
        "id": "py-comp-builtins-q1",
        "question": "What is the output of `list(zip([1, 2], [\"a\", \"b\", \"c\"]))`?",
        "options": [
          "[(1, \"a\"), (2, \"b\")]",
          "[(1, \"a\"), (2, \"b\"), (None, \"c\")]",
          "ValueError",
          "[(1, 2), (\"a\", \"b\", \"c\")]"
        ],
        "correctIndex": 0,
        "explanation": "Standard `zip()` truncates to the length of the shortest input iterable."
      },
      {
        "id": "py-comp-builtins-q2",
        "question": "How can you unzip a list of pairs `pairs = [(1, \"a\"), (2, \"b\")]` back into two lists?",
        "options": [
          "unzip(pairs)",
          "zip(*pairs)",
          "pairs.unzip()",
          "reversed(pairs)"
        ],
        "correctIndex": 1,
        "explanation": "Starred unpacking `zip(*pairs)` transposes pairs back into two separate tuples."
      },
      {
        "id": "py-comp-builtins-q3",
        "question": "Which built-in parameter sorts strings case-insensitively in `sorted(words, ...)`?",
        "options": [
          "case=False",
          "key=str.lower",
          "ignore_case=True",
          "reverse=True"
        ],
        "correctIndex": 1,
        "explanation": "Passing `key=str.lower` transforms each word to lowercase during key comparisons."
      }
    ],
    "codingChallenge": {
      "title": "Calculate Weighted GPA",
      "problem": "Write a function `calculate_gpa(grades: list[float], credit_hours: list[int]) -> float` that uses `zip` to calculate the weighted Grade Point Average: `sum(grade * credit) / sum(credit_hours)`. If total credit hours is 0, return 0.0. Round to 2 decimal places.",
      "hints": [
        "Use zip(grades, credit_hours) to iterate (g, c).",
        "Compute total_points = sum(g * c for g, c in zip(grades, credit_hours)).",
        "Divide by sum(credit_hours) and round to 2."
      ],
      "starterCode": "def calculate_gpa(grades: list[float], credit_hours: list[int]) -> float:\n    # Write your solution here\n    pass",
      "solution": "def calculate_gpa(grades: list[float], credit_hours: list[int]) -> float:\n    total_credits = sum(credit_hours)\n    if total_credits == 0:\n        return 0.0\n    weighted_sum = sum(g * c for g, c in zip(grades, credit_hours))\n    return round(weighted_sum / total_credits, 2)",
      "testCases": [
        {
          "input": "[4.0, 3.0, 3.5], [3, 4, 3]",
          "expectedOutput": "3.45"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "user_dict = dict(zip(keys, vals))",
        "codeSnippet": "user_dict = dict(zip(keys, vals))",
        "explanation": "Pairs key-value tuples and passes directly into dict constructor."
      },
      {
        "line": 10,
        "lines": "10",
        "code": "for idx, fruit in enumerate(fruits, start=100):",
        "codeSnippet": "for idx, fruit in enumerate(fruits, start=100):",
        "explanation": "Enumerates fruits beginning counter at 100."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "    print(f\"SKU {idx}: {fruit}\")",
        "codeSnippet": "    print(f\"SKU {idx}: {fruit}\")",
        "explanation": "Prints SKU and fruit name."
      }
    ],
    "applications": [
      {
        "industry": "CSV Column Mapping",
        "application": "Zipping header row with row cell values to construct record dictionaries.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "CSV Column Mapping",
        "description": "Zipping header row with row cell values to construct record dictionaries."
      },
      {
        "industry": "Leaderboards & Rankings",
        "application": "Enumerate and sorted building competitive sports or test standings.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Leaderboards & Rankings",
        "description": "Enumerate and sorted building competitive sports or test standings."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Use enumerate() with custom start offsets to replace manual index counter variables.",
        "Use zip() to iterate multiple sequences in parallel, and understand zip(strict=True) in Python 3.10+.",
        "Use sorted() with key and reverse parameters without mutating original sequences."
      ]
    }
  }
};
