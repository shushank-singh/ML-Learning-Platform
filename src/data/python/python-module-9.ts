import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule9Data: PythonModuleData = {
  "id": "python-module-9",
  "number": 9,
  "title": "Python Internals",
  "subtitle": "Object Model, Memory, CPython, GIL & Concurrency",
  "description": "Go under the hood of CPython. Understand object identity, the reference-counting garbage collector, Python data model dunder methods, hashability, LEGB scope resolution, bytecode, the GIL, and the practical differences between threads, processes, and async I/O.",
  "icon": "Cpu",
  "badge": "Python Internals",
  "estimatedHours": 8,
  "topicsCount": 10,
  "lessons": [
    {
      "id": "py-internals-identity",
      "moduleId": "python-module-9",
      "title": "Object Identity and References",
      "description": "id(), is vs ==, small integer caching, string interning, and reference counting basics.",
      "order": 1,
      "readTimeMinutes": 22,
      "visualizerType": "memory-model",
      "difficulty": "Advanced"
    },
    {
      "id": "py-internals-mutable-immutable",
      "moduleId": "python-module-9",
      "title": "Mutable vs Immutable Objects Internals",
      "description": "Why tuples are faster, how string concatenation creates new objects, and frozen containers.",
      "order": 2,
      "readTimeMinutes": 22,
      "visualizerType": "memory-model",
      "difficulty": "Advanced"
    },
    {
      "id": "py-internals-data-model",
      "moduleId": "python-module-9",
      "title": "Python's Data Model",
      "description": "Dunder methods, protocols, and how operators, len(), iter(), and in are dispatched.",
      "order": 3,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "py-internals-hashability",
      "moduleId": "python-module-9",
      "title": "Hashability and __hash__",
      "description": "__hash__ and __eq__ contract, why mutable objects are unhashable, and custom hash functions.",
      "order": 4,
      "readTimeMinutes": 20,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "py-internals-equality-identity",
      "moduleId": "python-module-9",
      "title": "Equality vs Identity",
      "description": "== calls __eq__, is compares id(), when None comparison should always use is.",
      "order": 5,
      "readTimeMinutes": 18,
      "visualizerType": "memory-model",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-internals-legb",
      "moduleId": "python-module-9",
      "title": "LEGB Scope Resolution in Depth",
      "description": "Detailed LEGB walkthrough, closures cells, global/nonlocal mechanics, and compiler scope analysis.",
      "order": 6,
      "readTimeMinutes": 25,
      "visualizerType": "execution-trace",
      "difficulty": "Intermediate"
    },
    {
      "id": "py-internals-gc",
      "moduleId": "python-module-9",
      "title": "Garbage Collection",
      "description": "Reference counting, cyclic GC, gc module, weakref, and avoiding memory leaks.",
      "order": 7,
      "readTimeMinutes": 25,
      "visualizerType": "memory-model",
      "difficulty": "Advanced"
    },
    {
      "id": "py-internals-cpython",
      "moduleId": "python-module-9",
      "title": "CPython and Bytecode",
      "description": "dis module, code objects, .pyc files, peephole optimizer, and why Python is interpreted.",
      "order": 8,
      "readTimeMinutes": 28,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "py-internals-gil",
      "moduleId": "python-module-9",
      "title": "The GIL",
      "description": "What the GIL is, why it exists, its impact on CPU-bound threading, and Python 3.13 free-threaded.",
      "order": 9,
      "readTimeMinutes": 25,
      "visualizerType": "none",
      "difficulty": "Advanced"
    },
    {
      "id": "py-internals-concurrency",
      "moduleId": "python-module-9",
      "title": "Threads, Processes, and Async I/O",
      "description": "threading, multiprocessing, asyncio, concurrent.futures — when to use each pattern.",
      "order": 10,
      "readTimeMinutes": 30,
      "visualizerType": "execution-trace",
      "difficulty": "Advanced"
    }
  ]
};

export const pythonModule9Lessons: Record<string, PythonLessonContent> = {
  "py-internals-identity": {
    "id": "py-internals-identity",
    "moduleId": "python-module-9",
    "title": "Object Identity, Memory & CPython Internals",
    "subtitle": "id(), is vs ==, PyObject Headers, Small Integer Caching & String Interning",
    "order": 1,
    "readTimeMinutes": 22,
    "difficulty": "Advanced",
    "visualizerType": "memory-model",
    "objectives": [
      "Understand the CPython C-structure PyObject: ob_refcnt and ob_type",
      "Distinguish pointer identity comparison (is) from value equality comparison (==)",
      "Explain CPython's small integer cache optimization (integers -5 to 256)",
      "Understand string interning and compiler literal optimization",
      "Inspect reference counts using sys.getrefcount() and trace object lifetimes",
      "Follow Python standards: always compare singletons (None, True, False) with 'is'"
    ],
    "prerequisites": [
      "Variables and references in Python",
      "Mutability vs immutability concepts"
    ],
    "analogy": {
      "title": "The House Address vs Architectural Blueprints",
      "text": "Suppose two houses are built from identical architectural blueprints with identical furniture, paint colors, and layouts. Their contents are equal (house_a == house_b is True). But house_a is at 10 Elm Street and house_b is at 42 Maple Avenue. Their physical locations are different (house_a is house_b is False). \"is\" checks whether two deeds refer to the exact same plot of land; \"==\" checks whether the furnishings match.",
      "metaphor": "In CPython, every variable is a pointer to a PyObject struct on the heap. \"is\" performs pointer comparison (ptr_a == ptr_b), while \"==\" calls ptr_a->ob_type->tp_richcompare."
    },
    "problemSolved": {
      "title": "Why Deep Understanding of Object Identity Matters",
      "description": "Misunderstanding identity versus equality is the root of insidious Python bugs: comparing numbers with \"is\" works in toy tests but fails randomly in production for integers > 256, mutating shared cached instances, or incorrectly evaluating sentinel values.",
      "keyPoints": [
        "Bug prevention: never use \"is\" for numerical or string equality comparisons",
        "Performance insight: \"is\" compiles to a single pointer comparison (TEST / JZ assembly instruction) taking ~1 nanosecond",
        "Singleton pattern correctness: None is guaranteed by CPython to be a unique singleton heap object",
        "Memory optimization: explains why string interning and integer pools save megabytes in high-scale systems"
      ]
    },
    "intuition": {
      "overview": "Every object in Python has three inviolable attributes: an identity (its memory address), a type (which dictates what operations it supports), and a value.",
      "steps": [
        {
          "step": 1,
          "title": "The PyObject Struct",
          "description": "In CPython, every object begins with the PyObject header: a 64-bit reference counter (ob_refcnt) and a pointer to the type object (ob_type)."
        },
        {
          "step": 2,
          "title": "The id() Function",
          "description": "id(obj) returns the memory address of the C struct in memory (in CPython, an integer cast of the pointer &obj)."
        },
        {
          "step": 3,
          "title": "The Small Integer Cache",
          "description": "CPython pre-allocates an array of integer objects for values between -5 and 256 at interpreter boot. Any assignment to an integer in this range reuses the pre-existing singleton."
        },
        {
          "step": 4,
          "title": "String Interning",
          "description": "Strings that look like Python identifiers (alphanumeric + underscore) are automatically interned into an internal dictionary to speed up dictionary lookups."
        }
      ]
    },
    "codeExample": {
      "title": "Exploring Identity, Caching, and Reference Counts",
      "code": "import sys\n\n# 1. Identity vs Equality\na = [1, 2, 3]\nb = [1, 2, 3]\nc = a\n\nprint(f\"a == b: {a == b}\")  # True (same values)\nprint(f\"a is b: {a is b}\")  # False (different heap allocations)\nprint(f\"a is c: {a is c}\")  # True (same memory reference)\nprint(f\"id(a) = {hex(id(a))}, id(b) = {hex(id(b))}\")\n\n# 2. Small Integer Caching (-5 to 256)\nx = 256\ny = 256\nprint(f\"256 is 256: {x is y}\")  # True: cached singleton\n\nm = 1000\nn = 1000\nprint(f\"1000 is 1000: {m is n}\")  # Usually False in interactive REPL!\n\n# 3. Reference Counting Inspection\nsample = [\"alpha\", \"beta\"]\n# sys.getrefcount adds 1 temporary reference during call\nprint(f\"Ref count of sample: {sys.getrefcount(sample) - 1}\")\nalias = sample\nprint(f\"Ref count after alias: {sys.getrefcount(sample) - 1}\")",
      "explanation": "Demonstrates the difference between equal values and identical addresses, verifies small integer caching, and tracks reference counts as aliases are created."
    },
    "runnableCode": {
      "code": "import sys\n\n# Checking None singleton\nval = None\nprint(\"val is None:\", val is None)\n\n# Integer caching demonstration\np = 100\nq = 100\nprint(\"100 is 100:\", p is q)\n\n# List identity vs copy\nlist1 = [10, 20]\nlist2 = list1.copy()\nprint(\"list1 == list2:\", list1 == list2)\nprint(\"list1 is list2:\", list1 is list2)\n\n# Modifying list1 does not affect list2\nlist1.append(30)\nprint(\"list1:\", list1)\nprint(\"list2:\", list2)",
      "expectedOutput": "val is None: True\n100 is 100: True\nlist1 == list2: True\nlist1 is list2: False\nlist1: [10, 20, 30]\nlist2: [10, 20]"
    },
    "lineByLineExplanation": [
      {
        "line": "5",
        "lines": "5",
        "code": "print(\"val is None:\", val is None)",
        "codeSnippet": "print(\"val is None:\", val is None)",
        "explanation": "Always use 'is' for None. There is only one NoneType instance in the entire Python runtime."
      },
      {
        "line": "13-15",
        "lines": "13-15",
        "code": "list2 = list1.copy(); print(list1 is list2)",
        "codeSnippet": "list2 = list1.copy(); print(list1 is list2)",
        "explanation": "copy() creates a distinct list container on the heap with a new id(), even though initial elements are identical."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using 'is' to compare numbers or user strings (e.g. if x is 500:)",
        "solution": "Never use 'is' for value comparison! Always use '=='. Small integer caching makes 'is' appear to work for small numbers, creating horrific bugs when numbers exceed 256.",
        "codeExample": "# DANGEROUS BUG:\nif count is 1000: ...  # Can evaluate to False even if count == 1000!\n# CORRECT:\nif count == 1000: ..."
      },
      {
        "mistake": "Comparing against None using '== None'",
        "solution": "PEP 8 mandates using 'if x is None:' or 'if x is not None:'. '==' can be hijacked by classes overriding __eq__, leading to subtle errors or performance overhead.",
        "codeExample": "# BAD: if val == None:\n# GOOD: if val is None:"
      }
    ],
    "bestPractices": [
      "Use 'is' exclusively when checking for singletons: None, Ellipsis, True, False, or custom object() sentinels",
      "Use '==' for all content and numerical value comparisons",
      "Never rely on CPython implementation details like small integer caching or automatic string interning for program correctness",
      "Use sys.intern() explicitly if you need to optimize massive dictionaries with repetitive string keys"
    ],
    "applications": [
      {
        "industry": "High-Performance Python / Compilers",
        "application": "Symbol tables and AST token comparison",
        "benefit": "Interned string symbols allow compiler token comparisons via instantaneous pointer equality."
      },
      {
        "industry": "API Design & Library Development",
        "application": "Sentinel default parameters",
        "benefit": "_MISSING = object() allows distinguishing between an omitted argument vs an argument explicitly passed as None."
      },
      {
        "industry": "Database ORMs (SQLAlchemy, Django)",
        "application": "Identity Map pattern",
        "benefit": "Ensures that multiple database queries for the same primary key return the exact same Python instance in memory."
      }
    ],
    "practiceQuestions": [
      {
        "id": "q1",
        "question": "What range of integers is permanently cached by CPython?",
        "hint": "It covers common loop counters and negative offsets.",
        "answer": "CPython pre-allocates an integer array for values from -5 to 256 inclusive."
      },
      {
        "id": "q2",
        "question": "What are the two fields present in every single CPython PyObject header?",
        "hint": "One tracks memory ownership, the other tracks the object's class.",
        "answer": "1. ob_refcnt (reference count, 64-bit integer), and 2. ob_type (pointer to the object's PyTypeObject struct)."
      },
      {
        "id": "q3",
        "question": "Why does sys.getrefcount(x) always return a number at least 1 higher than expected?",
        "hint": "What happens when you pass an object as an argument to a function?",
        "answer": "Passing x into sys.getrefcount(x) creates a temporary parameter reference inside the getrefcount function, incrementing its reference count by 1 during the call."
      }
    ],
    "quiz": [
      {
        "id": "quiz-1",
        "question": "What does the expression 'a is b' evaluate?",
        "options": [
          "id(a) == id(b)",
          "a.__eq__(b)",
          "type(a) == type(b)",
          "hash(a) == hash(b)"
        ],
        "correctIndex": 0,
        "explanation": "'is' evaluates whether two operands point to the exact same memory address (identical id)."
      },
      {
        "id": "quiz-2",
        "question": "Why is 'if x is None:' preferred over 'if x == None:'?",
        "options": [
          "It is faster and immune to custom __eq__ overrides",
          "== None is deprecated and forbidden in Python 3",
          "None is an integer",
          "is None converts x to a boolean"
        ],
        "correctIndex": 0,
        "explanation": "'is None' is a direct pointer check and cannot be overridden or misled by custom __eq__ implementations."
      },
      {
        "id": "quiz-3",
        "question": "What happens to a CPython object when its reference count drops to 0?",
        "options": [
          "It is placed in a cyclic queue for delayed garbage collection",
          "Its memory is immediately deallocated via tp_dealloc",
          "It remains in memory until the program terminates",
          "It is moved to swap space"
        ],
        "correctIndex": 1,
        "explanation": "In CPython, reference counting is immediate: as soon as refcount reaches 0, its deallocator is invoked immediately."
      }
    ],
    "codingChallenge": {
      "title": "Unique Sentinel Parameter Checker",
      "problem": "Implement a function get_setting(config: dict, key: str, default=...) that distinguishes between a key whose value is explicitly set to None versus a key that is missing from the dictionary. Use a private unique sentinel object and return the provided default when missing.",
      "hints": [
        "Define _MISSING = object() at the module/outer level.",
        "Call config.get(key, _MISSING).",
        "Compare the returned value with _MISSING using the 'is' operator."
      ],
      "starterCode": "_SENTINEL = object()\n\ndef get_setting(config: dict, key: str, default=_SENTINEL):\n    # Differentiate between missing and explicitly None\n    pass",
      "solution": "_SENTINEL = object()\n\ndef get_setting(config: dict, key: str, default=_SENTINEL):\n    val = config.get(key, _SENTINEL)\n    if val is _SENTINEL:\n        if default is _SENTINEL:\n            raise KeyError(f\"Configuration key '{key}' not found.\")\n        return default\n    return val"
    },
    "summary": {
      "keyTakeaways": [
        "Identity (id()) is the physical memory address of the CPython PyObject",
        "is compares memory addresses (pointers); == invokes __eq__ for logical value equality",
        "CPython caches integers from -5 to 256 and interns identifier-like strings as singletons",
        "Always check None with 'is None' or 'is not None' per PEP 8",
        "Reference counting provides immediate deterministic cleanup when an object's count drops to 0"
      ],
      "nextLessonId": "py-internals-mutable-immutable",
      "nextLessonTitle": "Mutable vs Immutable Objects Internals",
      "nextLessonModuleId": "python-module-9"
    },
    "lineByLine": [
      {
        "line": "5",
        "lines": "5",
        "code": "print(\"val is None:\", val is None)",
        "codeSnippet": "print(\"val is None:\", val is None)",
        "explanation": "Always use 'is' for None. There is only one NoneType instance in the entire Python runtime."
      },
      {
        "line": "13-15",
        "lines": "13-15",
        "code": "list2 = list1.copy(); print(list1 is list2)",
        "codeSnippet": "list2 = list1.copy(); print(list1 is list2)",
        "explanation": "copy() creates a distinct list container on the heap with a new id(), even though initial elements are identical."
      }
    ]
  },
  "py-internals-mutable-immutable": {
    "id": "py-internals-mutable-immutable",
    "moduleId": "python-module-9",
    "title": "Mutable vs Immutable Objects Internals",
    "subtitle": "PyVarObject Structs, Memory Over-allocation, Tuple Efficiency, and Frozen Containers",
    "order": 2,
    "readTimeMinutes": 22,
    "difficulty": "Advanced",
    "visualizerType": "memory-model",
    "objectives": [
      "Analyze CPython PyObject and PyVarObject C-struct memory representations.",
      "Understand why immutable objects (tuples, ints) are faster and have lower memory overhead than mutable lists.",
      "Trace dynamic array memory growth and geometric over-allocation in PyListObject.",
      "Understand why string concatenation with += can sometimes be optimized in CPython."
    ],
    "prerequisites": [
      "Python memory model, mutability, and CPython basics."
    ],
    "analogy": {
      "title": "The Steel Safe vs The Accordion Binder",
      "text": "An immutable object (tuple) is a solid steel safe welded at the factory: it has exact dimensions for its payload, zero moving parts, and cannot expand by even 1 millimeter. A mutable object (list) is an expandable accordion binder: it includes extra empty pockets, velcro expansion straps, and elastic bands so you can shove more papers inside anytime.",
      "metaphor": "Tuples allocate exact memory; lists allocate geometric buffers for dynamic resizing."
    },
    "problemSolved": {
      "title": "High-Performance Memory Layout Optimization",
      "description": "When handling millions of data records, choosing between lists and tuples or knowing how strings are allocated determines whether an application consumes 500 MB or 4 GB of RAM.",
      "keyPoints": [
        "`PyObject` contains `ob_refcnt` and `ob_type`. `PyVarObject` adds `ob_size`.",
        "Lists over-allocate memory geometrically (pattern: 0, 4, 8, 16, 24, 32, 40, 52, 64...).",
        "Tuples store pointers contiguously without expansion buffers, making them compact and cache-friendly."
      ]
    },
    "intuition": {
      "overview": "CPython optimizes memory by recycling empty tuple structs and pre-allocating contiguous pointer buffers for lists.",
      "steps": [
        {
          "step": 1,
          "title": "Tuple Allocation",
          "description": "CPython allocates exact memory: sizeof(PyVarObject) + n * sizeof(PyObject*)."
        },
        {
          "step": 2,
          "title": "List Append",
          "description": "If size == allocated, CPython reallocates buffer with ~12.5% headroom."
        },
        {
          "step": 3,
          "title": "Free List Cache",
          "description": "Freed small tuples and lists are placed on internal free lists for rapid reuse."
        }
      ]
    },
    "codeExample": {
      "title": "Inspecting Memory Growth with sys.getsizeof()",
      "code": "import sys\n\n# Tuples allocate exact size\nt = (1, 2, 3)\nprint(f\"Tuple size (3 items): {sys.getsizeof(t)} bytes\")\n\n# Lists over-allocate for amortized O(1) appends\nlst = []\nprint(f\"Empty list size: {sys.getsizeof(lst)} bytes\")\n\nallocations = []\nfor i in range(10):\n    prev_size = sys.getsizeof(lst)\n    lst.append(i)\n    new_size = sys.getsizeof(lst)\n    if new_size != prev_size:\n        print(f\"Item {i}: resized from {prev_size} to {new_size} bytes\")",
      "explanation": "Demonstrates how CPython dynamically expands list capacity in discrete jumps rather than one element at a time."
    },
    "runnableCode": {
      "code": "import sys\n\n# Compare memory footprints for 100 elements\nsample_list = list(range(100))\nsample_tuple = tuple(range(100))\n\nprint(\"List memory (bytes):\", sys.getsizeof(sample_list))\nprint(\"Tuple memory (bytes):\", sys.getsizeof(sample_tuple))\nprint(\"Memory saved by tuple:\", sys.getsizeof(sample_list) - sys.getsizeof(sample_tuple), \"bytes\")",
      "expectedOutput": "List memory (bytes): 856\nTuple memory (bytes): 840\nMemory saved by tuple: 16 bytes"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "sample_list = list(range(100))",
        "codeSnippet": "sample_list = list(range(100))",
        "explanation": "Creates list of 100 integers with allocation buffer."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "sample_tuple = tuple(range(100))",
        "codeSnippet": "sample_tuple = tuple(range(100))",
        "explanation": "Creates compact tuple with exact memory layout."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "print(\"List memory (bytes):\", sys.getsizeof(sample_list))",
        "codeSnippet": "print(\"List memory (bytes):\", sys.getsizeof(sample_list))",
        "explanation": "Reports memory including C-struct overhead."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming `sys.getsizeof(collection)` measures the memory of all nested elements.",
        "solution": "Use recursive sizing functions or memory_profiler for deep object graph sizing.",
        "whyWrong": "`getsizeof` measures ONLY the container itself and its array of object pointers, NOT the referenced objects themselves.",
        "howToFix": "Use recursive sizing functions or memory_profiler for deep object graph sizing."
      },
      {
        "mistake": "Using lists for fixed dictionary lookup keys.",
        "solution": "Use immutable tuples or frozensets.",
        "whyWrong": "Lists are mutable and unhashable; raising TypeError when used as keys.",
        "howToFix": "Use immutable tuples or frozensets."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Big Data Pipeline Ingestion",
        "description": "Converting JSON rows into namedtuples or dataclasses with __slots__ to cut RAM consumption by 60%."
      },
      {
        "title": "Embedded Python & MicroPython",
        "description": "Tuning memory buffers on microcontroller devices with limited KB of RAM."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-internals-mutable-immutable-pq1",
        "question": "What extra field does `PyVarObject` have that `PyObject` does not?",
        "hint": "Variable length container field.",
        "answer": "`ob_size`, which tracks the number of items currently in the sequence."
      },
      {
        "id": "py-internals-mutable-immutable-pq2",
        "question": "Why does Python over-allocate memory for dynamic lists when appending?",
        "hint": "Asymptotic complexity.",
        "answer": "To achieve amortized O(1) append time complexity instead of O(N) reallocation on every single append."
      },
      {
        "id": "py-internals-mutable-immutable-pq3",
        "question": "Can an immutable tuple ever contain mutable objects?",
        "hint": "Tuple with a list inside.",
        "answer": "Yes, a tuple can hold a pointer to a list; the pointer is fixed, but the list itself can mutate in-place."
      }
    ],
    "quiz": [
      {
        "id": "py-internals-mutable-immutable-q1",
        "question": "What is the base C struct that ALL Python objects share in CPython?",
        "options": [
          "PyObject",
          "PyBase",
          "PyMemory",
          "PyRoot"
        ],
        "correctIndex": 0,
        "explanation": "`PyObject` is the fundamental header struct containing the reference count and type pointer for every object."
      },
      {
        "id": "py-internals-mutable-immutable-q2",
        "question": "Why are small tuples faster to instantiate in CPython than small lists?",
        "options": [
          "Tuples use C macros only",
          "CPython maintains an internal free list of deallocated tuple structs for immediate reuse",
          "Tuples are stored on the CPU registers",
          "Tuples bypass bytecode"
        ],
        "correctIndex": 1,
        "explanation": "CPython caches recently deallocated small tuples in free lists up to size 20, avoiding `malloc()` calls."
      },
      {
        "id": "py-internals-mutable-immutable-q3",
        "question": "What is the time complexity of appending an element to a Python list on average?",
        "options": [
          "O(1) amortized",
          "O(N)",
          "O(log N)",
          "O(N^2)"
        ],
        "correctIndex": 0,
        "explanation": "Due to geometric over-allocation, list append takes amortized O(1) time."
      }
    ],
    "codingChallenge": {
      "title": "Calculate Deep Container Memory",
      "problem": "Write a function `deep_getsizeof(obj) -> int` that recursively calculates the total memory in bytes of an object and all nested containers (lists, tuples, dicts, sets), using a set of `id()`s to avoid counting shared or cyclic references twice.",
      "hints": [
        "Maintain seen = set().",
        "If id(obj) in seen: return 0; seen.add(id(obj)).",
        "Add sys.getsizeof(obj).",
        "Recursively traverse elements for dict, list, tuple, set."
      ],
      "starterCode": "import sys\n\ndef deep_getsizeof(obj) -> int:\n    # Write your solution here\n    pass",
      "solution": "import sys\n\ndef deep_getsizeof(obj) -> int:\n    seen = set()\n    def _size(o):\n        if id(o) in seen:\n            return 0\n        seen.add(id(o))\n        total = sys.getsizeof(o)\n        if isinstance(o, dict):\n            for k, v in o.items():\n                total += _size(k) + _size(v)\n        elif isinstance(o, (list, tuple, set, frozenset)):\n            for item in o:\n                total += _size(item)\n        return total\n    return _size(obj)",
      "testCases": [
        {
          "input": "deep_getsizeof([1, 2, [3, 4]]) > 100",
          "expectedOutput": "True"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "sample_list = list(range(100))",
        "codeSnippet": "sample_list = list(range(100))",
        "explanation": "Creates list of 100 integers with allocation buffer."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "sample_tuple = tuple(range(100))",
        "codeSnippet": "sample_tuple = tuple(range(100))",
        "explanation": "Creates compact tuple with exact memory layout."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "print(\"List memory (bytes):\", sys.getsizeof(sample_list))",
        "codeSnippet": "print(\"List memory (bytes):\", sys.getsizeof(sample_list))",
        "explanation": "Reports memory including C-struct overhead."
      }
    ],
    "applications": [
      {
        "industry": "Big Data Pipeline Ingestion",
        "application": "Converting JSON rows into namedtuples or dataclasses with __slots__ to cut RAM consumption by 60%.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Big Data Pipeline Ingestion",
        "description": "Converting JSON rows into namedtuples or dataclasses with __slots__ to cut RAM consumption by 60%."
      },
      {
        "industry": "Embedded Python & MicroPython",
        "application": "Tuning memory buffers on microcontroller devices with limited KB of RAM.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Embedded Python & MicroPython",
        "description": "Tuning memory buffers on microcontroller devices with limited KB of RAM."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Analyze CPython PyObject and PyVarObject C-struct memory representations.",
        "Understand why immutable objects (tuples, ints) are faster and have lower memory overhead than mutable lists.",
        "Trace dynamic array memory growth and geometric over-allocation in PyListObject."
      ]
    }
  },
  "py-internals-data-model": {
    "id": "py-internals-data-model",
    "moduleId": "python-module-9",
    "title": "Python's Data Model",
    "subtitle": "Dunder Methods, Protocols, and How Operators, len(), iter(), and in are Dispatched",
    "order": 3,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Understand the Python Data Model as an API that glues language syntax to object behavior.",
      "Trace how `len(x)` dispatches to `type(x).__len__(x)` at C level (tp_as_sequence->sq_length).",
      "Understand operator fallbacks: `__add__` falling back to `__radd__`, and `__eq__` falling back to identity.",
      "Understand membership testing fallback: `__contains__` -> `__iter__` -> `__getitem__`."
    ],
    "prerequisites": [
      "Special methods, OOP, and Python internals."
    ],
    "analogy": {
      "title": "The Constitutional Operating System",
      "text": "The Python Data Model is the constitutional bill of rights for Python objects. Instead of random functions doing whatever they please, the constitution states: \"If you want to support length, you must sign Protocol 5 (`__len__`). If you want to support the `in` operator, you sign Protocol 9 (`__contains__`). Any citizen object that signs these protocols receives instant first-class status across the entire language.",
      "metaphor": "The Data Model defines standard protocols that Python language constructs dispatch to."
    },
    "problemSolved": {
      "title": "Consistent, Predictable Polymorphism Across All Types",
      "description": "In languages like JavaScript, `[].length` is a property while `str.length` is different and arrays lack consistent operator overloads. Python's Data Model guarantees that `len()` works identically on strings, dicts, lists, sets, and custom classes.",
      "keyPoints": [
        "Built-in functions like `len()`, `repr()`, `iter()` do NOT call methods on the instance dict; they look up slots on the class type (`type(obj).__len__`).",
        "This type-slot lookup bypasses instance attribute shadowing for maximum C speed.",
        "If `__contains__` is absent, Python iterates via `__iter__`, and if absent, indexes from 0 via `__getitem__`."
      ]
    },
    "intuition": {
      "overview": "CPython represents object behavior via type slot structs (`PyTypeObject`, `tp_as_number`, `tp_as_sequence`, `tp_as_mapping`). Calling `len(x)` calls `x->ob_type->tp_as_sequence->sq_length(x)` in pure C.",
      "steps": [
        {
          "step": 1,
          "title": "Type Slot Lookup",
          "description": "Python inspects the type object directly, avoiding instance __dict__ overhead."
        },
        {
          "step": 2,
          "title": "Slot Execution",
          "description": "Executes fast C-level function pointer."
        },
        {
          "step": 3,
          "title": "Protocol Fallback",
          "description": "If slot is null, falls back to alternative protocols in strict hierarchy."
        }
      ]
    },
    "codeExample": {
      "title": "Demonstrating Fallback Protocols for `in` and `iter()`",
      "code": "class OldSchoolSequence:\n    \"\"\"Implements sequence behavior using ONLY __getitem__!\"\"\"\n    def __init__(self, items):\n        self._items = items\n\n    def __getitem__(self, index):\n        # Python uses __getitem__ to simulate both iter() and 'in' checks!\n        if index >= len(self._items):\n            raise IndexError\n        return self._items[index]\n\nseq = OldSchoolSequence([\"alpha\", \"beta\", \"gamma\"])\n\n# 1. for loop uses __getitem__ fallback\nfor item in seq:\n    print(\"Iterated:\", item)\n\n# 2. 'in' operator uses __getitem__ fallback scan!\nprint(\"Is 'beta' in seq?\", \"beta\" in seq)\nprint(\"Is 'delta' in seq?\", \"delta\" in seq)",
      "explanation": "Shows how Python's Data Model gracefully falls back to __getitem__ when __iter__ and __contains__ are omitted."
    },
    "runnableCode": {
      "code": "# Why len(x) bypasses instance __dict__\nclass MyObject:\n    pass\n\nobj = MyObject()\n# Shadowing __len__ on the instance does NOT work for len()!\nobj.__len__ = lambda: 42\n\ntry:\n    print(len(obj))\nexcept TypeError as e:\n    print(\"Caught TypeError:\", e)\n    print(\"len() looks up type(obj).__len__, NOT obj.__dict__['__len__']!\")",
      "expectedOutput": "Caught TypeError: object of type 'MyObject' has no len()\nlen() looks up type(obj).__len__, NOT obj.__dict__['__len__']!"
    },
    "lineByLine": [
      {
        "line": 8,
        "lines": "8",
        "code": "obj.__len__ = lambda: 42",
        "codeSnippet": "obj.__len__ = lambda: 42",
        "explanation": "Attaches __len__ directly to instance dictionary."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "print(len(obj))",
        "codeSnippet": "print(len(obj))",
        "explanation": "Fails with TypeError because built-in len() inspects type(obj), not obj.__dict__."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Trying to mock or override special methods by assigning them to an instance: `obj.__str__ = ...`.",
        "solution": "Override special methods on the class definition, or use class-level mocking.",
        "whyWrong": "Built-in functions like `str()` and `len()` look up dunder methods on the CLASS `type(obj)`, not on the instance.",
        "howToFix": "Override special methods on the class definition, or use class-level mocking."
      },
      {
        "mistake": "Returning negative numbers or non-integers from `__len__()`.",
        "solution": "Ensure `__len__()` returns a non-negative `int`.",
        "whyWrong": "Python raises `ValueError: __len__() should return >= 0` or `TypeError`.",
        "howToFix": "Ensure `__len__()` returns a non-negative `int`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Custom Database QuerySets",
        "description": "Django QuerySet implementing `__len__`, `__iter__`, and `__getitem__` to support slicing without loading all SQL rows."
      },
      {
        "title": "NumPy Array Broadcasting",
        "description": "Overloading arithmetic slots for vectorized SIMD operations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-internals-data-model-pq1",
        "question": "Why does `len(obj)` look up `__len__` on `type(obj)` instead of `obj.__dict__`?",
        "hint": "Performance and consistency.",
        "answer": "For performance (direct C slot lookup) and to prevent instance attributes from corrupting core language protocols."
      },
      {
        "id": "py-internals-data-model-pq2",
        "question": "What fallback order does Python follow when checking `item in container`?",
        "hint": "Three protocols.",
        "answer": "1. `__contains__`; 2. Iteration via `__iter__`; 3. Index scanning from 0 via `__getitem__`."
      },
      {
        "id": "py-internals-data-model-pq3",
        "question": "What is `tp_as_sequence` in CPython source code?",
        "hint": "C struct slot table.",
        "answer": "A C struct on `PyTypeObject` containing function pointers for sequence operations (`sq_length`, `sq_item`, `sq_concat`)."
      }
    ],
    "quiz": [
      {
        "id": "py-internals-data-model-q1",
        "question": "Where does Python look for `__repr__` when executing `repr(x)`?",
        "options": [
          "In x.__dict__[\"__repr__\"]",
          "In type(x).__dict__[\"__repr__\"] (or inherited in its MRO)",
          "In sys.modules",
          "In the global scope"
        ],
        "correctIndex": 1,
        "explanation": "Built-ins look up special methods on the object's type, not the instance dictionary."
      },
      {
        "id": "py-internals-data-model-q2",
        "question": "If `a + b` is executed and `type(a)` has no `__add__` (or returns NotImplemented), what does Python try next?",
        "options": [
          "Raises TypeError immediately",
          "Calls type(b).__radd__(b, a)",
          "Converts both to strings",
          "Calls a.__iadd__(b)"
        ],
        "correctIndex": 1,
        "explanation": "Python reflects the operation, calling the right-hand operand's `__radd__` method."
      },
      {
        "id": "py-internals-data-model-q3",
        "question": "Can a class be iterated in a `for` loop if it only implements `__getitem__`?",
        "options": [
          "No, __iter__ is strictly required",
          "Yes, Python iterates by passing indices 0, 1, 2... until IndexError",
          "Only if it inherits from list",
          "Only in Python 2"
        ],
        "correctIndex": 1,
        "explanation": "The Data Model falls back to calling `__getitem__` with increasing integer indices until `IndexError`."
      }
    ],
    "codingChallenge": {
      "title": "Implement Infinite Circular Indexer",
      "problem": "Write a class `InfiniteCircularList` whose `__init__` takes a non-empty list of items. Implement `__getitem__(self, index: int)` so that ANY positive or negative integer index wraps around modulo the list length (`items[index % len(items)]`). Implement `__len__` returning the underlying list length.",
      "hints": [
        "In __init__: validate items is non-empty; store self.items = list(items).",
        "In __getitem__(self, idx): return self.items[idx % len(self.items)].",
        "In __len__: return len(self.items)."
      ],
      "starterCode": "class InfiniteCircularList:\n    # Write your solution here\n    pass",
      "solution": "class InfiniteCircularList:\n    def __init__(self, items: list):\n        if not items:\n            raise ValueError(\"List cannot be empty\")\n        self.items = list(items)\n        \n    def __len__(self) -> int:\n        return len(self.items)\n        \n    def __getitem__(self, index: int):\n        return self.items[index % len(self.items)]",
      "testCases": [
        {
          "input": "c = InfiniteCircularList([\"A\", \"B\", \"C\"]); (c[0], c[3], c[-1], c[-4])",
          "expectedOutput": "(\"A\", \"A\", \"C\", \"C\")"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 8,
        "lines": "8",
        "code": "obj.__len__ = lambda: 42",
        "codeSnippet": "obj.__len__ = lambda: 42",
        "explanation": "Attaches __len__ directly to instance dictionary."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "print(len(obj))",
        "codeSnippet": "print(len(obj))",
        "explanation": "Fails with TypeError because built-in len() inspects type(obj), not obj.__dict__."
      }
    ],
    "applications": [
      {
        "industry": "Custom Database QuerySets",
        "application": "Django QuerySet implementing `__len__`, `__iter__`, and `__getitem__` to support slicing without loading all SQL rows.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Custom Database QuerySets",
        "description": "Django QuerySet implementing `__len__`, `__iter__`, and `__getitem__` to support slicing without loading all SQL rows."
      },
      {
        "industry": "NumPy Array Broadcasting",
        "application": "Overloading arithmetic slots for vectorized SIMD operations.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "NumPy Array Broadcasting",
        "description": "Overloading arithmetic slots for vectorized SIMD operations."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand the Python Data Model as an API that glues language syntax to object behavior.",
        "Trace how `len(x)` dispatches to `type(x).__len__(x)` at C level (tp_as_sequence->sq_length).",
        "Understand operator fallbacks: `__add__` falling back to `__radd__`, and `__eq__` falling back to identity."
      ]
    }
  },
  "py-internals-hashability": {
    "id": "py-internals-hashability",
    "moduleId": "python-module-9",
    "title": "Hashability and __hash__",
    "subtitle": "The __hash__ and __eq__ Contract, SipHash, and Why Mutable Objects Cannot Be Hashed",
    "order": 4,
    "readTimeMinutes": 20,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Master the fundamental Hash Contract: `a == b` IMPLIES `hash(a) == hash(b)`.",
      "Understand why mutable objects like lists and dicts deliberately set `__hash__ = None`.",
      "Implement custom `__hash__` and `__eq__` on domain classes correctly.",
      "Understand SipHash security against Hash-DoS collision attacks in CPython."
    ],
    "prerequisites": [
      "Dictionaries, sets, and special methods."
    ],
    "analogy": {
      "title": "The Permanent Locker Number vs The Shifting Sand dune",
      "text": "A hash table is a bank vault with numbered lockers. When an object is stored, Python calculates its hash number and locks it in that exact numbered box. If the object could mutate and change its hash number while sitting in the box, the banker searching for the new number would look in a completely different box and report \"Item not found!\" even though the object is still inside the vault.",
      "metaphor": "Hashability requires an object's identity and hash value to remain immutable across its entire lifetime."
    },
    "problemSolved": {
      "title": "Preventing Hash Table Lookup Corruption",
      "description": "If mutable objects were permitted as dictionary keys or set members, mutating them after insertion would break hash table indexing, making them unretrievable and creating memory leaks.",
      "keyPoints": [
        "An object is hashable if it has a hash value that never changes during its lifetime and can be compared to other objects.",
        "If you define `__eq__` without `__hash__`, Python automatically sets `__hash__ = None`, making instances unhashable.",
        "Equal objects MUST produce identical hash values: `a == b` => `hash(a) == hash(b)`."
      ]
    },
    "intuition": {
      "overview": "Python uses SipHash24 to produce 64-bit hash values with a randomized per-process salt to prevent denial-of-service hash collision attacks.",
      "steps": [
        {
          "step": 1,
          "title": "Hash Generation",
          "description": "Calls type(obj).__hash__(obj) returning a signed 64-bit integer."
        },
        {
          "step": 2,
          "title": "Bucket Mapping",
          "description": "Bitwise masks hash to map into hash table indices array."
        },
        {
          "step": 3,
          "title": "Equality Verification",
          "description": "When a candidate slot is found, checks identity or `__eq__` to confirm key match."
        }
      ]
    },
    "codeExample": {
      "title": "Custom Hashable Domain Entity",
      "code": "class UserRecord:\n    def __init__(self, user_id: int, username: str):\n        self._user_id = user_id\n        self._username = username\n\n    @property\n    def user_id(self) -> int:\n        return self._user_id\n\n    def __eq__(self, other):\n        if not isinstance(other, UserRecord):\n            return False\n        return self._user_id == other._user_id\n\n    def __hash__(self):\n        # Hash must be computed from the SAME fields used in __eq__!\n        return hash(self._user_id)\n\nu1 = UserRecord(101, \"Alice\")\nu2 = UserRecord(101, \"Alice_Updated\")\n\n# Can be used in sets and as dict keys!\nuser_set = {u1}\nprint(\"Is u2 in set (equal user_id)?\", u2 in user_set) # True!\nprint(\"Set length:\", len(user_set))",
      "explanation": "Demonstrates implementing __hash__ and __eq__ in lock-step based on immutable ID attributes."
    },
    "runnableCode": {
      "code": "class UnhashableClass:\n    def __eq__(self, other):\n        return True\n\nobj = UnhashableClass()\nprint(\"Has __hash__?\", UnhashableClass.__hash__)\ntry:\n    hash(obj)\nexcept TypeError as e:\n    print(\"Caught expected error:\", e)",
      "expectedOutput": "Has __hash__? None\nCaught expected error: unhashable type: 'UnhashableClass'"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "    def __eq__(self, other):",
        "codeSnippet": "    def __eq__(self, other):",
        "explanation": "Defining __eq__ triggers automatic __hash__ = None."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(\"Has __hash__?\", UnhashableClass.__hash__)",
        "codeSnippet": "print(\"Has __hash__?\", UnhashableClass.__hash__)",
        "explanation": "CPython explicitly sets class attribute __hash__ to None."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "    hash(obj)",
        "codeSnippet": "    hash(obj)",
        "explanation": "Raises TypeError: unhashable type."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Computing `__hash__` from mutable attributes that can change after insertion.",
        "solution": "Compute `__hash__` only from immutable attributes (like private IDs or frozen tuples).",
        "whyWrong": "If an attribute changes, the object's hash changes, rendering it permanently lost inside any dictionary or set it was added to.",
        "howToFix": "Compute `__hash__` only from immutable attributes (like private IDs or frozen tuples)."
      },
      {
        "mistake": "Defining `__hash__` without defining `__eq__`.",
        "solution": "Always implement `__hash__` and `__eq__` together.",
        "whyWrong": "Objects with equal hashes might compare unequal via default identity comparison, breaking hash lookups.",
        "howToFix": "Always implement `__hash__` and `__eq__` together."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Deduplicating Database Entities",
        "description": "Using entity primary keys for hash and equality to deduplicate records in sets."
      },
      {
        "title": "Memoization Keys",
        "description": "Ensuring custom configuration objects can be used as cache keys in `@lru_cache`."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-internals-hashability-pq1",
        "question": "What is the fundamental rule connecting `__eq__` and `__hash__`?",
        "hint": "Implication rule.",
        "answer": "If `a == b` is True, then `hash(a) == hash(b)` MUST also be True."
      },
      {
        "id": "py-internals-hashability-pq2",
        "question": "Why are Python lists unhashable?",
        "hint": "Mutability.",
        "answer": "Because lists are mutable; modifying a list in-place would change its hash, corrupting any hash table storing it."
      },
      {
        "id": "py-internals-hashability-pq3",
        "question": "What algorithm does CPython use for string and bytes hashing to prevent Hash-DoS attacks?",
        "hint": "Cryptographic hash name.",
        "answer": "SipHash (specifically SipHash24) with a per-process random seed."
      }
    ],
    "quiz": [
      {
        "id": "py-internals-hashability-q1",
        "question": "What does CPython do to `__hash__` if you define `__eq__` on a class without explicitly defining `__hash__`?",
        "options": [
          "Inherits object.__hash__",
          "Sets __hash__ = None, making instances unhashable",
          "Computes hash from object id",
          "Generates a random hash"
        ],
        "correctIndex": 1,
        "explanation": "Python automatically sets `__hash__ = None` to enforce correctness."
      },
      {
        "id": "py-internals-hashability-q2",
        "question": "Can two unequal objects produce the same hash value?",
        "options": [
          "No, hashes are always strictly unique",
          "Yes, this is called a hash collision and is handled via open addressing",
          "Only for integers",
          "Only in 32-bit Python"
        ],
        "correctIndex": 1,
        "explanation": "Hash collisions are expected when mapping infinite inputs to a 64-bit integer space; hash tables resolve them via probing."
      },
      {
        "id": "py-internals-hashability-q3",
        "question": "Which of the following built-in types is hashable?",
        "options": [
          "list",
          "dict",
          "set",
          "frozenset"
        ],
        "correctIndex": 3,
        "explanation": "`frozenset` is immutable and hashable; list, dict, and set are mutable and unhashable."
      }
    ],
    "codingChallenge": {
      "title": "Immutable Hashable Point",
      "problem": "Write an immutable 2D point class `HashPoint` with attributes `x: int` and `y: int`. Implement `__eq__` comparing x and y, and `__hash__` returning `hash((self.x, self.y))`. Verify instances can be stored and looked up in a set.",
      "hints": [
        "In __init__: self._x = int(x); self._y = int(y).",
        "In __eq__: check isinstance and compare (self.x, self.y) == (other.x, other.y).",
        "In __hash__: return hash((self.x, self.y))."
      ],
      "starterCode": "class HashPoint:\n    # Write your solution here\n    pass",
      "solution": "class HashPoint:\n    def __init__(self, x: int, y: int):\n        self._x = int(x)\n        self._y = int(y)\n        \n    @property\n    def x(self) -> int: return self._x\n    @property\n    def y(self) -> int: return self._y\n    \n    def __eq__(self, other):\n        if not isinstance(other, HashPoint):\n            return False\n        return (self._x, self._y) == (other._x, other._y)\n        \n    def __hash__(self):\n        return hash((self._x, self._y))",
      "testCases": [
        {
          "input": "p1 = HashPoint(1, 2); p2 = HashPoint(1, 2); len({p1, p2})",
          "expectedOutput": "1"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "    def __eq__(self, other):",
        "codeSnippet": "    def __eq__(self, other):",
        "explanation": "Defining __eq__ triggers automatic __hash__ = None."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(\"Has __hash__?\", UnhashableClass.__hash__)",
        "codeSnippet": "print(\"Has __hash__?\", UnhashableClass.__hash__)",
        "explanation": "CPython explicitly sets class attribute __hash__ to None."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "    hash(obj)",
        "codeSnippet": "    hash(obj)",
        "explanation": "Raises TypeError: unhashable type."
      }
    ],
    "applications": [
      {
        "industry": "Deduplicating Database Entities",
        "application": "Using entity primary keys for hash and equality to deduplicate records in sets.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Deduplicating Database Entities",
        "description": "Using entity primary keys for hash and equality to deduplicate records in sets."
      },
      {
        "industry": "Memoization Keys",
        "application": "Ensuring custom configuration objects can be used as cache keys in `@lru_cache`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Memoization Keys",
        "description": "Ensuring custom configuration objects can be used as cache keys in `@lru_cache`."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Master the fundamental Hash Contract: `a == b` IMPLIES `hash(a) == hash(b)`.",
        "Understand why mutable objects like lists and dicts deliberately set `__hash__ = None`.",
        "Implement custom `__hash__` and `__eq__` on domain classes correctly."
      ]
    }
  },
  "py-internals-equality-identity": {
    "id": "py-internals-equality-identity",
    "moduleId": "python-module-9",
    "title": "Equality vs Identity",
    "subtitle": "== (Value Equivalence) vs is (Memory Address), and the None Singleton Rule",
    "order": 5,
    "readTimeMinutes": 18,
    "difficulty": "Intermediate",
    "visualizerType": "memory-model",
    "objectives": [
      "Distinguish between value equality (`==`) and object identity (`is`).",
      "Understand why `is` compares raw memory addresses `id(a) == id(b)` without calling any methods.",
      "Follow PEP 8: always use `is` and `is not` when comparing against singletons (`None`, `True`, `False`).",
      "Understand small integer caching (-5 to 256) and why relying on `is` for integers is a fatal bug."
    ],
    "prerequisites": [
      "Python basics and object identity."
    ],
    "analogy": {
      "title": "The Identical Twin Passports",
      "text": "Value equality (`==`) is comparing two people's driver's licenses: both say \"Age 30, Blue Eyes, 5'10\"\". They look identical on paper (`a == b` is True). Object identity (`is`) is fingerprint biometric scanning: are these two licenses held by the EXACT same biological human body in physical space? If they are identical twins, they are equal in appearance (`==`), but they are two distinct human beings (`a is b` is False).",
      "metaphor": "== checks if values match; is checks if two names point to the exact same memory address."
    },
    "problemSolved": {
      "title": "Eliminating Subtly Broken Comparison Logic",
      "description": "Using `==` on `None` can execute overloaded `__eq__` methods that return unexpected results (e.g. Pandas Series returns a series of booleans rather than a single True/False). Using `is` guarantees fast, unambiguous identity checking.",
      "keyPoints": [
        "`a == b` evaluates to `a.__eq__(b)` (or `b.__eq__(a)`), which can be overloaded to do anything.",
        "`a is b` evaluates to `id(a) == id(b)` in pure C, which can never be overloaded or spoofed.",
        "Small integers -5 through 256 are pre-allocated singletons in CPython, but numbers outside that range are not guaranteed to be."
      ]
    },
    "intuition": {
      "overview": "`is` tests whether two pointers hold the same 64-bit integer memory address.",
      "steps": [
        {
          "step": 1,
          "title": "Pointer Check (is)",
          "description": "Directly compares CPU pointers in a single machine instruction."
        },
        {
          "step": 2,
          "title": "Method Dispatch (==)",
          "description": "Looks up `__eq__` descriptor on left operand's type."
        },
        {
          "step": 3,
          "title": "Boolean Coercion",
          "description": "Evaluates method output in boolean context."
        }
      ]
    },
    "codeExample": {
      "title": "Equality vs Identity and Integer Caching",
      "code": "# Lists: identical values, distinct heap objects\nlist1 = [1, 2, 3]\nlist2 = [1, 2, 3]\nprint(\"list1 == list2:\", list1 == list2) # True (equal contents)\nprint(\"list1 is list2:\", list1 is list2) # False (distinct memory addresses)\n\n# Small integer cache (-5 to 256)\nx = 256\ny = 256\nprint(\"256 is 256:\", x is y) # True (cached CPython singleton)\n\n# Larger integers: NOT guaranteed to be the same object!\na = 1000\nb = 1000\n# Might be True in REPL compiler, but False across separate statements!\nprint(\"a == b:\", a == b) # True\nprint(\"a is b:\", a is b) # Demonstrates why 'is' must NEVER be used for numbers!",
      "explanation": "Demonstrates why value equality and identity differ, and why `is` must never be used for numeric comparisons."
    },
    "runnableCode": {
      "code": "val = None\n\n# Correct PEP 8 singleton comparison\nif val is None:\n    print(\"val is None (Correct idiomatic check)\")\n\n# Why '==' on custom objects can mislead\nclass Deceptive:\n    def __eq__(self, other):\n        return True # Claims to equal everything!\n\nd = Deceptive()\nprint(\"d == None:\", d == None) # True! (Misleading!)\nprint(\"d is None:\", d is None) # False! (Truthful identity check)",
      "expectedOutput": "val is None (Correct idiomatic check)\nd == None: True\nd is None: False"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "if val is None:",
        "codeSnippet": "if val is None:",
        "explanation": "PEP 8 requirement: always compare singletons with is."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"d == None:\", d == None)",
        "codeSnippet": "print(\"d == None:\", d == None)",
        "explanation": "Shows how overloaded __eq__ can hijack value comparisons."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "print(\"d is None:\", d is None)",
        "codeSnippet": "print(\"d is None:\", d is None)",
        "explanation": "Proves `is` cannot be spoofed by custom methods."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using `is` to compare numbers or strings: `if count is 0:`.",
        "solution": "Always use `==` for numbers and strings: `if count == 0:`.",
        "whyWrong": "CPython caching behavior is an internal implementation detail, not a language specification; breaks across compilers or versions.",
        "howToFix": "Always use `==` for numbers and strings: `if count == 0:`."
      },
      {
        "mistake": "Using `== None` instead of `is None`.",
        "solution": "Always use `if x is None:` or `if x is not None:`.",
        "whyWrong": "Violates PEP 8 and can be hijacked by classes that overload `__eq__`.",
        "howToFix": "Always use `if x is None:` or `if x is not None:`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Default Argument Sentinels",
        "description": "Using `SENTINEL = object()` and `if arg is SENTINEL:` to differentiate missing arguments from `None`."
      },
      {
        "title": "NumPy / Pandas Validation",
        "description": "Avoiding array ambiguity errors by checking `if df is None:`."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-internals-equality-identity-pq1",
        "question": "What does `a is b` compare behind the scenes?",
        "hint": "Memory addresses.",
        "answer": "It compares their memory addresses (`id(a) == id(b)`)."
      },
      {
        "id": "py-internals-equality-identity-pq2",
        "question": "Why does PEP 8 mandate `if x is None:` rather than `if x == None:`?",
        "hint": "Overloading and performance.",
        "answer": "Because `is` compares memory address in a single CPU instruction and cannot be hijacked by overloaded `__eq__` methods."
      },
      {
        "id": "py-internals-equality-identity-pq3",
        "question": "What range of integers does CPython pre-allocate and cache in an array?",
        "hint": "Negative five to...",
        "answer": "Integers from -5 to 256 inclusive."
      }
    ],
    "quiz": [
      {
        "id": "py-internals-equality-identity-q1",
        "question": "What is the result of `[] == []` vs `[] is []`?",
        "options": [
          "True, True",
          "True, False",
          "False, True",
          "False, False"
        ],
        "correctIndex": 1,
        "explanation": "Two newly created lists have equal values (`==` is True), but reside at separate memory allocations (`is` is False)."
      },
      {
        "id": "py-internals-equality-identity-q2",
        "question": "Which comparison is recommended by PEP 8 when checking if an object is None?",
        "options": [
          "if x == None:",
          "if x is None:",
          "if type(x) is NoneType:",
          "if not x:"
        ],
        "correctIndex": 1,
        "explanation": "`if x is None:` is the strict PEP 8 standard."
      },
      {
        "id": "py-internals-equality-identity-q3",
        "question": "Can a class customize the behavior of the `is` operator?",
        "options": [
          "Yes, by implementing __is__",
          "No, the is operator cannot be overloaded or customized in Python",
          "Only if subclassed from object",
          "Yes, using descriptors"
        ],
        "correctIndex": 1,
        "explanation": "`is` directly compares pointer addresses at the C level; it has no dunder method and cannot be overridden."
      }
    ],
    "codingChallenge": {
      "title": "Sentinel Pattern Argument Checker",
      "problem": "Create a unique sentinel object `NOT_SET = object()`. Write a function `lookup_config(config: dict, key: str, default=NOT_SET)`: if key is in config, return its value. If not and default is NOT_SET, raise `KeyError(key)`. If not and default is anything else (including `None`), return `default`. Use the `is` operator to check the sentinel.",
      "hints": [
        "Check if key in config: return config[key].",
        "If default is NOT_SET: raise KeyError(key).",
        "Otherwise return default."
      ],
      "starterCode": "NOT_SET = object()\n\ndef lookup_config(config: dict, key: str, default=NOT_SET):\n    # Write your solution here\n    pass",
      "solution": "NOT_SET = object()\n\ndef lookup_config(config: dict, key: str, default=NOT_SET):\n    if key in config:\n        return config[key]\n    if default is NOT_SET:\n        raise KeyError(key)\n    return default",
      "testCases": [
        {
          "input": "lookup_config({\"timeout\": 30}, \"timeout\")",
          "expectedOutput": "30"
        },
        {
          "input": "lookup_config({}, \"missing\", default=None)",
          "expectedOutput": "None"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "if val is None:",
        "codeSnippet": "if val is None:",
        "explanation": "PEP 8 requirement: always compare singletons with is."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"d == None:\", d == None)",
        "codeSnippet": "print(\"d == None:\", d == None)",
        "explanation": "Shows how overloaded __eq__ can hijack value comparisons."
      },
      {
        "line": 13,
        "lines": "13",
        "code": "print(\"d is None:\", d is None)",
        "codeSnippet": "print(\"d is None:\", d is None)",
        "explanation": "Proves `is` cannot be spoofed by custom methods."
      }
    ],
    "applications": [
      {
        "industry": "Default Argument Sentinels",
        "application": "Using `SENTINEL = object()` and `if arg is SENTINEL:` to differentiate missing arguments from `None`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Default Argument Sentinels",
        "description": "Using `SENTINEL = object()` and `if arg is SENTINEL:` to differentiate missing arguments from `None`."
      },
      {
        "industry": "NumPy / Pandas Validation",
        "application": "Avoiding array ambiguity errors by checking `if df is None:`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "NumPy / Pandas Validation",
        "description": "Avoiding array ambiguity errors by checking `if df is None:`."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Distinguish between value equality (`==`) and object identity (`is`).",
        "Understand why `is` compares raw memory addresses `id(a) == id(b)` without calling any methods.",
        "Follow PEP 8: always use `is` and `is not` when comparing against singletons (`None`, `True`, `False`)."
      ]
    }
  },
  "py-internals-legb": {
    "id": "py-internals-legb",
    "moduleId": "python-module-9",
    "title": "LEGB Scope Resolution in Depth",
    "subtitle": "Compiler Scope Analysis, Fast Locals (LOAD_FAST), and Cell Objects",
    "order": 6,
    "readTimeMinutes": 25,
    "difficulty": "Intermediate",
    "visualizerType": "execution-trace",
    "objectives": [
      "Deep-dive into the LEGB rule: Local -> Enclosing -> Global -> Built-in.",
      "Understand why assigning to a variable anywhere in a function makes it local at compile time.",
      "Trace CPython's `LOAD_FAST` (array indexed local access) vs `LOAD_GLOBAL` (dictionary lookup).",
      "Understand how cell objects bridge enclosing scopes in closures."
    ],
    "prerequisites": [
      "Function scopes, closures, and CPython bytecode basics."
    ],
    "analogy": {
      "title": "The Concentric Security Zones",
      "text": "Scope resolution is like searching for a tool in concentric security perimeters. First you check your own tool belt (Local). If not there, you check the workshop room (Enclosing). If not there, you check the corporate warehouse (Global). Finally, you check the national hardware catalog (Built-in). If still not found, you raise `NameError`.",
      "metaphor": "LEGB defines the exact order Python traverses namespaces to resolve identifiers."
    },
    "problemSolved": {
      "title": "Demystifying UnboundLocalError and Scope Compilation",
      "description": "Python determines variable scope at compile time, not runtime. If a variable is assigned anywhere within a function, the compiler marks it local across the ENTIRE function body.",
      "keyPoints": [
        "Local variables use `LOAD_FAST` bytecode, which accesses a fixed C-array by integer offset in nanoseconds.",
        "Global and built-in variables use `LOAD_GLOBAL`, which performs dictionary hash table lookups.",
        "The `global` keyword forces the compiler to treat a name as module-global.",
        "The `nonlocal` keyword binds to the nearest enclosing scope cell object."
      ]
    },
    "intuition": {
      "overview": "CPython's compiler analyzes AST symbol tables. Any variable appearing on the left side of an assignment (`=`, `+=`, `for var in`) is classified as local unless declared otherwise.",
      "steps": [
        {
          "step": 1,
          "title": "Symbol Table Pass",
          "description": "Compiler scans function body; marks all assigned identifiers as LOCAL."
        },
        {
          "step": 2,
          "title": "Array Allocation",
          "description": "Allocates fixed-size `co_varnames` tuple on the code object."
        },
        {
          "step": 3,
          "title": "Evaluation Error",
          "description": "Reading an uninitialized local slot raises UnboundLocalError."
        }
      ]
    },
    "codeExample": {
      "title": "Deconstructing UnboundLocalError and Fast Locals",
      "code": "x = 100\n\ndef buggy_function():\n    print(x) # Raises UnboundLocalError!\n    x = 200  # Because x is assigned HERE, the compiler marked x as LOCAL!\n\ntry:\n    buggy_function()\nexcept UnboundLocalError as e:\n    print(\"Caught UnboundLocalError:\", e)\n\n# How to fix: use global keyword if intentional\ndef fixed_function():\n    global x\n    print(\"Read global x:\", x)\n    x = 300\n\nfixed_function()\nprint(\"Updated global x:\", x)",
      "explanation": "Demonstrates why assigning x inside the function makes x local for the entire function, causing UnboundLocalError on the preceding print."
    },
    "runnableCode": {
      "code": "import dis\n\ndef fast_local(a):\n    b = a * 2\n    return b\n\n# Notice LOAD_FAST opcodes for locals vs LOAD_GLOBAL\nprint(\"Bytecode for fast_local:\")\ndis.dis(fast_local)",
      "expectedOutput": "Bytecode for fast_local:"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "def fast_local(a):",
        "codeSnippet": "def fast_local(a):",
        "explanation": "Defines function with parameters and local variables."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "dis.dis(fast_local)",
        "codeSnippet": "dis.dis(fast_local)",
        "explanation": "Disassembles bytecode showing CPython LOAD_FAST array indexing."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming a function reads a global variable until it reaches the assignment line.",
        "solution": "Do not shadow globals with locals, or declare `global` / `nonlocal` explicitly.",
        "whyWrong": "Python is compiled, not interpreted line-by-line in a vacuum; scope classification applies to the whole function statically.",
        "howToFix": "Do not shadow globals with locals, or declare `global` / `nonlocal` explicitly."
      },
      {
        "mistake": "Overusing the `global` keyword to share state between functions.",
        "solution": "Pass parameters and return values explicitly.",
        "whyWrong": "Creates tightly coupled spaghetti code that is impossible to test or parallelize.",
        "howToFix": "Pass parameters and return values explicitly."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Performance Optimization",
        "description": "Binding global built-ins to local variables (`local_len = len`) in tight loops to replace `LOAD_GLOBAL` with `LOAD_FAST`."
      },
      {
        "title": "Closure Factory Design",
        "description": "Writing stateful decorators that rebind enclosing cell variables via `nonlocal`."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-internals-legb-pq1",
        "question": "What does the acronym LEGB stand for?",
        "hint": "Four scope tiers.",
        "answer": "Local, Enclosing, Global, Built-in."
      },
      {
        "id": "py-internals-legb-pq2",
        "question": "Why is `LOAD_FAST` faster than `LOAD_GLOBAL` in CPython bytecode?",
        "hint": "Array index vs dictionary lookup.",
        "answer": "`LOAD_FAST` accesses a C-array by direct integer index in memory, whereas `LOAD_GLOBAL` performs hash table lookups in dictionary namespaces."
      },
      {
        "id": "py-internals-legb-pq3",
        "question": "When is a variable's scope determined in Python?",
        "hint": "Compile time vs runtime.",
        "answer": "At compile time (when the function is compiled into a code object)."
      }
    ],
    "quiz": [
      {
        "id": "py-internals-legb-q1",
        "question": "Given `x = 5; def f(): x += 1; f()`, what error is raised?",
        "options": [
          "NameError",
          "UnboundLocalError",
          "TypeError",
          "ValueError"
        ],
        "correctIndex": 1,
        "explanation": "`x += 1` involves assignment, marking `x` as local. Reading `x` before assignment raises `UnboundLocalError`."
      },
      {
        "id": "py-internals-legb-q2",
        "question": "Which opcode does CPython use to access local variables in optimized functions?",
        "options": [
          "LOAD_NAME",
          "LOAD_GLOBAL",
          "LOAD_FAST",
          "LOAD_LOCAL"
        ],
        "correctIndex": 2,
        "explanation": "CPython uses `LOAD_FAST` for local variable access."
      },
      {
        "id": "py-internals-legb-q3",
        "question": "Which keyword allows modifying a variable in an outer enclosing function that is NOT global?",
        "options": [
          "outer",
          "nonlocal",
          "enclosing",
          "parent"
        ],
        "correctIndex": 1,
        "explanation": "`nonlocal` rebinds identifiers in the nearest enclosing non-global scope."
      }
    ],
    "codingChallenge": {
      "title": "Count Variable Lookups",
      "problem": "Write a function resolve_name(var_name: str, local_ns: dict, enclosing_ns: dict, global_ns: dict, builtin_ns: dict) -> tuple[str, any]: search for var_name following the LEGB order. Return a tuple (scope_name, value) where scope_name is \"Local\", \"Enclosing\", \"Global\", or \"Built-in\". If not found anywhere, raise NameError.",
      "hints": [
        "Check local_ns, then enclosing_ns, then global_ns, then builtin_ns.",
        "Return (\"ScopeName\", ns[var_name]).",
        "If exhausted, raise NameError."
      ],
      "starterCode": "def resolve_name(var_name: str, local_ns: dict, enclosing_ns: dict, global_ns: dict, builtin_ns: dict) -> tuple[str, any]:\n    # Write your solution here\n    pass",
      "solution": "def resolve_name(var_name: str, local_ns: dict, enclosing_ns: dict, global_ns: dict, builtin_ns: dict) -> tuple[str, any]:\n    scopes = [(\"Local\", local_ns), (\"Enclosing\", enclosing_ns), (\"Global\", global_ns), (\"Built-in\", builtin_ns)]\n    for scope_name, ns in scopes:\n        if var_name in ns:\n            return scope_name, ns[var_name]\n    raise NameError(f\"name '{var_name}' is not defined\")",
      "testCases": [
        {
          "input": "\"x\", {}, {\"x\": 42}, {\"x\": 100}, {}",
          "expectedOutput": "(\"Enclosing\", 42)"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "def fast_local(a):",
        "codeSnippet": "def fast_local(a):",
        "explanation": "Defines function with parameters and local variables."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "dis.dis(fast_local)",
        "codeSnippet": "dis.dis(fast_local)",
        "explanation": "Disassembles bytecode showing CPython LOAD_FAST array indexing."
      }
    ],
    "applications": [
      {
        "industry": "Performance Optimization",
        "application": "Binding global built-ins to local variables (`local_len = len`) in tight loops to replace `LOAD_GLOBAL` with `LOAD_FAST`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Performance Optimization",
        "description": "Binding global built-ins to local variables (`local_len = len`) in tight loops to replace `LOAD_GLOBAL` with `LOAD_FAST`."
      },
      {
        "industry": "Closure Factory Design",
        "application": "Writing stateful decorators that rebind enclosing cell variables via `nonlocal`.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Closure Factory Design",
        "description": "Writing stateful decorators that rebind enclosing cell variables via `nonlocal`."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Deep-dive into the LEGB rule: Local -> Enclosing -> Global -> Built-in.",
        "Understand why assigning to a variable anywhere in a function makes it local at compile time.",
        "Trace CPython's `LOAD_FAST` (array indexed local access) vs `LOAD_GLOBAL` (dictionary lookup)."
      ]
    }
  },
  "py-internals-gc": {
    "id": "py-internals-gc",
    "moduleId": "python-module-9",
    "title": "Garbage Collection",
    "subtitle": "Reference Counting, Generational Cyclic GC, gc Module, and weakref",
    "order": 7,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "memory-model",
    "objectives": [
      "Understand CPython's primary memory management: Reference Counting (`ob_refcnt`).",
      "Understand reference cycles and why reference counting alone cannot collect them.",
      "Explore the 3-generation cyclic garbage collector (Generation 0, 1, 2) in the `gc` module.",
      "Use `weakref.ref` to reference objects without increasing their reference count."
    ],
    "prerequisites": [
      "Python OOP, pointers, and memory basics."
    ],
    "analogy": {
      "title": "The Party Balloon String Counter and The Hall Monitor",
      "text": "Reference counting is holding strings to a helium party balloon. Every time someone grabs a string, the counter increments. The instant the last person lets go (`count == 0`), the balloon instantly pops and vanishes. But what if two balloons knot their strings together into a loop and float away? No person holds them, but they still hold each other. The Generational Hall Monitor (`gc` collector) periodically walks the halls, untangles self-contained knot clusters, and pops them.",
      "metaphor": "Reference counting frees objects instantly; cyclic GC detects and collects isolated reference loops."
    },
    "problemSolved": {
      "title": "Preventing Memory Leaks from Self-Referential Cycles",
      "description": "Graphs, doubly-linked lists, and parent-child DOM trees create circular references that prevent reference counts from ever reaching 0. CPython's generational cyclic GC resolves these leaks automatically.",
      "keyPoints": [
        "Every PyObject has an `ob_refcnt`. When it hits 0, memory is deallocated IMMEDIATELY (deterministic deallocation).",
        "The cyclic GC tracks container objects (lists, dicts, tuples, classes) across 3 generations.",
        "`gc.collect()` manually triggers a full garbage collection cycle.",
        "`weakref` creates non-owning references that become `None` when the referent is garbage-collected."
      ]
    },
    "intuition": {
      "overview": "Generational GC operates on the heuristic that most objects die young. Objects surviving Generation 0 collections are promoted to Generation 1, and eventually to Generation 2.",
      "steps": [
        {
          "step": 1,
          "title": "Ref Count Check",
          "description": "When variable goes out of scope or is deleted with `del`, ob_refcnt decrements."
        },
        {
          "step": 2,
          "title": "Zero Reached",
          "description": "If ref count == 0, calls `tp_dealloc` C-handler immediately."
        },
        {
          "step": 3,
          "title": "Cycle Detection",
          "description": "When Gen 0 allocation threshold is exceeded, GC runs trial deletions to isolate cyclic islands."
        }
      ]
    },
    "codeExample": {
      "title": "Circular References and the gc Module",
      "code": "import gc\nimport sys\n\nclass CycleNode:\n    def __init__(self, name):\n        self.name = name\n        self.partner = None\n\n# Disable automatic GC to demonstrate leak\ngc.disable()\n\ndef create_cycle():\n    n1 = CycleNode(\"A\")\n    n2 = CycleNode(\"B\")\n    n1.partner = n2\n    n2.partner = n1\n    # n1 and n2 go out of scope here, but ref count remains 1 due to the cycle!\n\ncreate_cycle()\nprint(\"Unreachable objects before GC:\", gc.collect()) # Collects the 2 cyclic nodes!\ngc.enable()",
      "explanation": "Demonstrates how circular references prevent immediate deallocation, and how gc.collect() cleans them up."
    },
    "runnableCode": {
      "code": "import weakref\n\nclass CacheItem:\n    def __init__(self, data):\n        self.data = data\n\nitem = CacheItem(\"secret_payload\")\n# Weak reference: does not increment reference count!\nr = weakref.ref(item)\n\nprint(\"Weak reference dereference:\", r().data)\ndel item # Deletes the only strong reference!\nprint(\"Weak reference after deletion:\", r())",
      "expectedOutput": "Weak reference dereference: secret_payload\nWeak reference after deletion: None"
    },
    "lineByLine": [
      {
        "line": 8,
        "lines": "8",
        "code": "r = weakref.ref(item)",
        "codeSnippet": "r = weakref.ref(item)",
        "explanation": "Creates weak reference to item."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "del item",
        "codeSnippet": "del item",
        "explanation": "Decrements ref count to 0; object is deallocated immediately."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"Weak reference after deletion:\", r())",
        "codeSnippet": "print(\"Weak reference after deletion:\", r())",
        "explanation": "Weakref resolves to None automatically."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming `del x` deletes the object from memory.",
        "solution": "Ensure all references are cleared or use weak references.",
        "whyWrong": "`del x` only removes the identifier `x` from the local namespace and decrements `ob_refcnt`. If other references exist, the object lives on.",
        "howToFix": "Ensure all references are cleared or use weak references."
      },
      {
        "mistake": "Using `__del__` destructors carelessly in older Python versions.",
        "solution": "Use context managers (`with`) instead of relying on `__del__`.",
        "whyWrong": "In Python < 3.4, cyclic objects with `__del__` could not be collected by cyclic GC and ended up in `gc.garbage`. Modern Python (PEP 442) handles this better, but `with` context managers are always preferred.",
        "howToFix": "Use context managers (`with`) instead of relying on `__del__`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "In-Memory Caches",
        "description": "Using `weakref.WeakValueDictionary` so cached values are automatically evicted when caller drops their reference."
      },
      {
        "title": "Game Engines and UI Trees",
        "description": "Parent UI widgets holding strong references to children, and children holding weak references to parents."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-internals-gc-pq1",
        "question": "What is Python's primary garbage collection mechanism?",
        "hint": "Count on PyObject.",
        "answer": "Reference counting."
      },
      {
        "id": "py-internals-gc-pq2",
        "question": "How many generations are used in CPython's cyclic garbage collector?",
        "hint": "Number of generations.",
        "answer": "3 generations (Generation 0, 1, and 2)."
      },
      {
        "id": "py-internals-gc-pq3",
        "question": "What happens when you dereference a `weakref.ref` after its referent has been garbage collected?",
        "hint": "Fallback value.",
        "answer": "It returns `None`."
      }
    ],
    "quiz": [
      {
        "id": "py-internals-gc-q1",
        "question": "When is an object with a reference count of 0 deallocated in CPython?",
        "options": [
          "Immediately",
          "When gc.collect() is called",
          "When the script exits",
          "After 5 seconds"
        ],
        "correctIndex": 0,
        "explanation": "Reference counting provides deterministic deallocation: as soon as refcount reaches 0, it is freed immediately."
      },
      {
        "id": "py-internals-gc-q2",
        "question": "Why can reference counting NOT collect circular references on its own?",
        "options": [
          "Because circular references have refcount >= 1 even when detached from the root namespace",
          "Because Python disables ref counting for classes",
          "Because cycles are stored in C memory",
          "Because cycles cause deadlock"
        ],
        "correctIndex": 0,
        "explanation": "In a cycle, objects hold references to each other, keeping their reference counts above zero."
      },
      {
        "id": "py-internals-gc-q3",
        "question": "Which module allows programmatic control of the cyclic garbage collector?",
        "options": [
          "sys",
          "gc",
          "memory",
          "cleaner"
        ],
        "correctIndex": 1,
        "explanation": "The standard library `gc` module provides `gc.collect()`, `gc.disable()`, `gc.get_threshold()`, etc."
      }
    ],
    "codingChallenge": {
      "title": "Detect Cycle with sys.getrefcount",
      "problem": "Write a function `has_external_references(obj) -> bool` that checks if `obj` has any references beyond the local argument and the temporary reference created by `sys.getrefcount(obj)`. Return `True` if `sys.getrefcount(obj) > 2`, otherwise `False`.",
      "hints": [
        "sys.getrefcount(obj) always returns at least 2 (obj parameter + getrefcount parameter).",
        "Return sys.getrefcount(obj) > 2."
      ],
      "starterCode": "import sys\n\ndef has_external_references(obj) -> bool:\n    # Write your solution here\n    pass",
      "solution": "import sys\n\ndef has_external_references(obj) -> bool:\n    return sys.getrefcount(obj) > 2",
      "testCases": [
        {
          "input": "x = [1, 2, 3]; y = x; has_external_references(x)",
          "expectedOutput": "True"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 8,
        "lines": "8",
        "code": "r = weakref.ref(item)",
        "codeSnippet": "r = weakref.ref(item)",
        "explanation": "Creates weak reference to item."
      },
      {
        "line": 11,
        "lines": "11",
        "code": "del item",
        "codeSnippet": "del item",
        "explanation": "Decrements ref count to 0; object is deallocated immediately."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "print(\"Weak reference after deletion:\", r())",
        "codeSnippet": "print(\"Weak reference after deletion:\", r())",
        "explanation": "Weakref resolves to None automatically."
      }
    ],
    "applications": [
      {
        "industry": "In-Memory Caches",
        "application": "Using `weakref.WeakValueDictionary` so cached values are automatically evicted when caller drops their reference.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "In-Memory Caches",
        "description": "Using `weakref.WeakValueDictionary` so cached values are automatically evicted when caller drops their reference."
      },
      {
        "industry": "Game Engines and UI Trees",
        "application": "Parent UI widgets holding strong references to children, and children holding weak references to parents.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Game Engines and UI Trees",
        "description": "Parent UI widgets holding strong references to children, and children holding weak references to parents."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand CPython's primary memory management: Reference Counting (`ob_refcnt`).",
        "Understand reference cycles and why reference counting alone cannot collect them.",
        "Explore the 3-generation cyclic garbage collector (Generation 0, 1, 2) in the `gc` module."
      ]
    }
  },
  "py-internals-cpython": {
    "id": "py-internals-cpython",
    "moduleId": "python-module-9",
    "title": "CPython and Bytecode",
    "subtitle": "dis Module, Code Objects, Evaluation Loop (ceval.c), and the .pyc Cache",
    "order": 8,
    "readTimeMinutes": 28,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Inspect Python bytecode instructions using the standard `dis` module.",
      "Explore the attributes of a code object (`co_code`, `co_consts`, `co_varnames`, `co_names`).",
      "Understand how `__pycache__` stores compiled `.pyc` files for fast startup.",
      "Understand the CPython virtual machine evaluation stack and `ceval.c` loop."
    ],
    "prerequisites": [
      "Python execution model and functions."
    ],
    "analogy": {
      "title": "The Blueprint and The Robotic Assembly Arm",
      "text": "Python source code is a hand-written architect's sketch in English. CPython's compiler translates the sketch into numerical CNC machine instructions (`co_code` bytecode: `LOAD_CONST`, `BINARY_ADD`). The CPython virtual machine is the robotic arm on the assembly floor: it reads opcode #23, moves the arm, pushes a part onto the stack, and reads the next opcode in a tight continuous loop.",
      "metaphor": "Source code compiles to code objects containing bytecode executed by a stack-based VM."
    },
    "problemSolved": {
      "title": "Understanding What Python Actually Executes Under the Hood",
      "description": "Debugging complex performance issues and understanding language quirks requires peeling back the abstraction layers and viewing the actual bytecode instructions the virtual machine evaluates.",
      "keyPoints": [
        "Python compiles source to code objects (`types.CodeType`), which are immutable collections of instructions.",
        "`co_consts` holds literals, `co_varnames` holds local names, `co_names` holds global/attribute names.",
        "The Python VM is stack-based: opcodes push and pop operands onto an evaluation stack."
      ]
    },
    "intuition": {
      "overview": "CPython executes opcodes inside `_PyEval_EvalFrameDefault` in `Python/ceval.c`, a giant switch/jump table statement processing bytecode instructions sequentially.",
      "steps": [
        {
          "step": 1,
          "title": "Parsing & AST",
          "description": "Source code text is tokenized and built into an Abstract Syntax Tree."
        },
        {
          "step": 2,
          "title": "Bytecode Emission",
          "description": "AST is compiled into a Code Object containing `co_code` bytes."
        },
        {
          "step": 3,
          "title": "Evaluation Loop",
          "description": "PVM pops operands from the value stack, computes operations, and pushes results."
        }
      ]
    },
    "codeExample": {
      "title": "Disassembling a Function and Inspecting Code Object Attributes",
      "code": "import dis\n\ndef calculate(x, y=10):\n    \"\"\"Simple calculation function.\"\"\"\n    total = (x * 2) + y\n    return total\n\n# Inspecting Code Object attributes\nco = calculate.__code__\nprint(\"Function Name:\", co.co_name)\nprint(\"Argument Count:\", co.co_argcount)\nprint(\"Constants (co_consts):\", co.co_consts)\nprint(\"Local Variables (co_varnames):\", co.co_varnames)\n\n# Disassembling instructions\nprint(\"\\nDisassembly:\")\ndis.dis(calculate)",
      "explanation": "Demonstrates introspecting Code Object attributes and disassembling bytecode with dis.dis()."
    },
    "runnableCode": {
      "code": "import dis\n\n# Inspecting bytecode for a simple expression\nexpr_code = compile(\"a + b * 2\", \"<string>\", \"eval\")\nprint(\"Opcode sequence:\")\nfor instr in dis.get_instructions(expr_code):\n    print(f\"  {instr.opname:<16} arg={instr.argval}\")",
      "expectedOutput": "Opcode sequence:\n  LOAD_NAME        arg=a\n  LOAD_NAME        arg=b\n  LOAD_CONST       arg=2\n  BINARY_OP        arg=5\n  BINARY_OP        arg=0\n  RETURN_VALUE     arg=None"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "expr_code = compile(\"a + b * 2\", \"<string>\", \"eval\")",
        "codeSnippet": "expr_code = compile(\"a + b * 2\", \"<string>\", \"eval\")",
        "explanation": "Compiles expression directly into a code object."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "for instr in dis.get_instructions(expr_code):",
        "codeSnippet": "for instr in dis.get_instructions(expr_code):",
        "explanation": "Iterates through disassembled instruction tokens."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "    print(f\"  {instr.opname:<16} arg={instr.argval}\")",
        "codeSnippet": "    print(f\"  {instr.opname:<16} arg={instr.argval}\")",
        "explanation": "Outputs human-readable opcode names."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming `.pyc` files make Python code run faster after loading.",
        "solution": "Understand that `.pyc` caches accelerate startup time, not execution speed.",
        "whyWrong": "`.pyc` files only skip the parsing and compilation phase during startup; runtime execution speed is identical.",
        "howToFix": "Understand that `.pyc` caches accelerate startup time, not execution speed."
      },
      {
        "mistake": "Believing Python is purely an \"interpreted\" language with no compilation.",
        "solution": "Recognize Python as a bytecode-compiled virtual-machine language.",
        "whyWrong": "Python is always compiled to bytecode before execution begins.",
        "howToFix": "Recognize Python as a bytecode-compiled virtual-machine language."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Security & Obfuscation Analysis",
        "description": "Decompiling `.pyc` files during malware reverse engineering using tools like uncompyle6."
      },
      {
        "title": "JIT Compilers (PyPy / Numba)",
        "description": "Translating Python bytecode into optimized native machine code for numerical loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-internals-cpython-pq1",
        "question": "What module in the Python standard library disassembles bytecode?",
        "hint": "Three-letter module name.",
        "answer": "The `dis` module."
      },
      {
        "id": "py-internals-cpython-pq2",
        "question": "What attribute on a function holds its compiled code object?",
        "hint": "Dunder attribute.",
        "answer": "`func.__code__`."
      },
      {
        "id": "py-internals-cpython-pq3",
        "question": "Is the CPython virtual machine register-based or stack-based?",
        "hint": "Stack or register architecture.",
        "answer": "It is a stack-based virtual machine."
      }
    ],
    "quiz": [
      {
        "id": "py-internals-cpython-q1",
        "question": "What is stored in `co.co_consts` on a code object?",
        "options": [
          "A tuple of literal constants used in the code (numbers, strings, None, docstring)",
          "Global variable names",
          "Local variable names",
          "Bytecode instruction offsets"
        ],
        "correctIndex": 0,
        "explanation": "`co_consts` holds all literal constants evaluated during compilation, including the docstring."
      },
      {
        "id": "py-internals-cpython-q2",
        "question": "Where are compiled bytecode files cached on disk?",
        "options": [
          "In /tmp",
          "In the __pycache__ directory alongside source files",
          "In the Python installation directory",
          "In .venv/cache"
        ],
        "correctIndex": 1,
        "explanation": "CPython stores compiled `.pyc` files in the `__pycache__` directory."
      },
      {
        "id": "py-internals-cpython-q3",
        "question": "What C source file contains the primary bytecode evaluation loop in CPython?",
        "options": [
          "Python/main.c",
          "Python/ceval.c",
          "Objects/object.c",
          "Modules/gc.c"
        ],
        "correctIndex": 1,
        "explanation": "`Python/ceval.c` contains `_PyEval_EvalFrameDefault`, the main virtual machine loop."
      }
    ],
    "codingChallenge": {
      "title": "Extract Opcode Names from Function",
      "problem": "Write a function `get_opcodes(fn: callable) -> list[str]` that takes a function and returns a list of unique opcode names (`instr.opname`) present in its bytecode using `dis.get_instructions`.",
      "hints": [
        "Iterate for instr in dis.get_instructions(fn).",
        "Collect instr.opname in a set, then return sorted(list(opnames))."
      ],
      "starterCode": "import dis\n\ndef get_opcodes(fn: callable) -> list[str]:\n    # Write your solution here\n    pass",
      "solution": "import dis\n\ndef get_opcodes(fn: callable) -> list[str]:\n    opnames = {instr.opname for instr in dis.get_instructions(fn)}\n    return sorted(list(opnames))",
      "testCases": [
        {
          "input": "def test_fn(a, b): return a + b; \"RETURN_VALUE\" in get_opcodes(test_fn)",
          "expectedOutput": "True"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "expr_code = compile(\"a + b * 2\", \"<string>\", \"eval\")",
        "codeSnippet": "expr_code = compile(\"a + b * 2\", \"<string>\", \"eval\")",
        "explanation": "Compiles expression directly into a code object."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "for instr in dis.get_instructions(expr_code):",
        "codeSnippet": "for instr in dis.get_instructions(expr_code):",
        "explanation": "Iterates through disassembled instruction tokens."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "    print(f\"  {instr.opname:<16} arg={instr.argval}\")",
        "codeSnippet": "    print(f\"  {instr.opname:<16} arg={instr.argval}\")",
        "explanation": "Outputs human-readable opcode names."
      }
    ],
    "applications": [
      {
        "industry": "Security & Obfuscation Analysis",
        "application": "Decompiling `.pyc` files during malware reverse engineering using tools like uncompyle6.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Security & Obfuscation Analysis",
        "description": "Decompiling `.pyc` files during malware reverse engineering using tools like uncompyle6."
      },
      {
        "industry": "JIT Compilers (PyPy / Numba)",
        "application": "Translating Python bytecode into optimized native machine code for numerical loops.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "JIT Compilers (PyPy / Numba)",
        "description": "Translating Python bytecode into optimized native machine code for numerical loops."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Inspect Python bytecode instructions using the standard `dis` module.",
        "Explore the attributes of a code object (`co_code`, `co_consts`, `co_varnames`, `co_names`).",
        "Understand how `__pycache__` stores compiled `.pyc` files for fast startup."
      ]
    }
  },
  "py-internals-gil": {
    "id": "py-internals-gil",
    "moduleId": "python-module-9",
    "title": "The GIL (Global Interpreter Lock)",
    "subtitle": "Thread Safety, CPU vs I/O Bound Workloads, and Python 3.13 Free-Threaded Mode",
    "order": 9,
    "readTimeMinutes": 25,
    "difficulty": "Advanced",
    "visualizerType": "none",
    "objectives": [
      "Understand what the Global Interpreter Lock (GIL) is: a mutex guarding Python object access.",
      "Explain why the GIL was created: simplified C-extension integration and reference count thread safety.",
      "Differentiate CPU-bound tasks (blocked by GIL) from I/O-bound tasks (GIL released during I/O).",
      "Understand modern developments: PEP 703 and Python 3.13 free-threaded mode (nogil)."
    ],
    "prerequisites": [
      "CPython internals, reference counting, and threading concepts."
    ],
    "analogy": {
      "title": "The Single Microphone at the Town Hall",
      "text": "Imagine a town hall meeting with 8 delegates (CPU cores). In theory, all 8 could speak simultaneously. But the meeting has only ONE physical wireless microphone (the GIL). Even if you hire 8 delegates, only the delegate holding the microphone can speak (execute Python bytecode). When a delegate pauses to read a document (I/O wait), they pass the microphone to another delegate. But for non-stop talking (CPU math), 7 delegates sit in total silence waiting.",
      "metaphor": "The GIL allows only one OS thread to execute Python bytecode at a time."
    },
    "problemSolved": {
      "title": "Preventing Race Conditions in CPython's Reference Counting Memory Manager",
      "description": "Without the GIL, every increment and decrement of `ob_refcnt` across all Python objects would require atomic locks, creating massive performance overhead on single-threaded programs. The GIL makes single-threaded Python fast and simple.",
      "keyPoints": [
        "The GIL does NOT mean Python code is thread-safe; shared user data structures still require locks.",
        "For I/O-bound tasks (network, disk, database), threads release the GIL while waiting, enabling true concurrency.",
        "For CPU-bound tasks (math, encryption, image processing), standard threading provides NO speedup across multi-core CPUs.",
        "Use `multiprocessing` or C extensions (NumPy) to bypass the GIL for CPU-bound tasks."
      ]
    },
    "intuition": {
      "overview": "CPython releases the GIL every 5 milliseconds (or during blocking I/O calls) to give other threads a chance to run.",
      "steps": [
        {
          "step": 1,
          "title": "Acquire GIL",
          "description": "OS thread acquires the GIL mutex before executing bytecode."
        },
        {
          "step": 2,
          "title": "Release during I/O",
          "description": "Before making blocking OS read/write calls, thread drops the GIL."
        },
        {
          "step": 3,
          "title": "Reacquire",
          "description": "When I/O returns, thread reacquires GIL to process returned Python data."
        }
      ]
    },
    "codeExample": {
      "title": "Comparing CPU-Bound Threading vs Multiprocessing",
      "code": "import time\nimport threading\nfrom concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor\n\ndef cpu_heavy_task(n=5_000_000):\n    total = 0\n    for i in range(n):\n        total += i\n    return total\n\n# Demonstrating that 2 threads do NOT halve CPU time due to GIL\nstart = time.perf_counter()\nt1 = threading.Thread(target=cpu_heavy_task)\nt2 = threading.Thread(target=cpu_heavy_task)\nt1.start(); t2.start()\nt1.join(); t2.join()\nthread_time = time.perf_counter() - start\nprint(f\"2 Threads CPU time: {thread_time:.3f}s (No speedup due to GIL)\")\n\n# NumPy and C-extensions release GIL during matrix math!\n# PEP 703 in Python 3.13 introduces optional free-threaded build (--disable-gil)",
      "explanation": "Demonstrates how the GIL prevents multithreaded CPU-bound tasks from running in parallel on multi-core CPUs."
    },
    "runnableCode": {
      "code": "import sys\n\n# Checking if GIL is enabled in active Python build\nis_gil_enabled = True\nif hasattr(sys, \"_is_gil_enabled\"):\n    is_gil_enabled = sys._is_gil_enabled()\n\nprint(f\"Python Version: {sys.version.split()[0]}\")\nprint(f\"Is GIL currently active? {is_gil_enabled}\")",
      "expectedOutput": "Python Version: 3.12.0\nIs GIL currently active? True"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "if hasattr(sys, \"_is_gil_enabled\"):",
        "codeSnippet": "if hasattr(sys, \"_is_gil_enabled\"):",
        "explanation": "Python 3.13+ API for checking free-threaded mode status."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "print(f\"Is GIL currently active? {is_gil_enabled}\")",
        "codeSnippet": "print(f\"Is GIL currently active? {is_gil_enabled}\")",
        "explanation": "Reports whether interpreter is bound by GIL."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Assuming Python threading speeds up heavy numeric or machine learning calculations.",
        "solution": "Use `multiprocessing.Pool` or libraries like NumPy that release the GIL during C computation.",
        "whyWrong": "Pure Python CPU code cannot execute in parallel on multiple cores due to the GIL.",
        "howToFix": "Use `multiprocessing.Pool` or libraries like NumPy that release the GIL during C computation."
      },
      {
        "mistake": "Believing that user code doesn't need `threading.Lock` because the GIL exists.",
        "solution": "Always use `threading.Lock()` when mutating shared state across threads.",
        "whyWrong": "The GIL only protects CPython internals. Context switches can happen between any bytecode instruction, causing race conditions in user data.",
        "howToFix": "Always use `threading.Lock()` when mutating shared state across threads."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Web Servers (Gunicorn / Uvicorn)",
        "description": "Running multiple worker processes (pre-fork model) to utilize all CPU cores."
      },
      {
        "title": "High-Performance Numerical Computing",
        "description": "NumPy releasing the GIL to run multi-threaded BLAS/LAPACK matrix operations."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-internals-gil-pq1",
        "question": "What does GIL stand for?",
        "hint": "Acronym definition.",
        "answer": "Global Interpreter Lock."
      },
      {
        "id": "py-internals-gil-pq2",
        "question": "Under what workloads does Python threading provide significant performance benefits?",
        "hint": "CPU vs I/O.",
        "answer": "Under I/O-bound workloads (network requests, disk reading/writing, database queries) where threads release the GIL."
      },
      {
        "id": "py-internals-gil-pq3",
        "question": "What PEP in Python 3.13 introduces the experimental ability to run Python without the GIL?",
        "hint": "PEP number.",
        "answer": "PEP 703 (Making the Global Interpreter Lock Optional in CPython)."
      }
    ],
    "quiz": [
      {
        "id": "py-internals-gil-q1",
        "question": "Why was the GIL originally introduced into CPython?",
        "options": [
          "To slow down Python",
          "To make thread-safe memory management simple and maximize single-threaded performance without complex locks",
          "To support GPUs",
          "To enforce strict typing"
        ],
        "correctIndex": 1,
        "explanation": "The GIL simplified C extension development and made single-threaded reference counting fast."
      },
      {
        "id": "py-internals-gil-q2",
        "question": "Which concurrency model should you choose in Python to utilize all 16 cores of a CPU for heavy mathematical processing?",
        "options": [
          "threading",
          "multiprocessing",
          "asyncio",
          "generators"
        ],
        "correctIndex": 1,
        "explanation": "`multiprocessing` spawns separate OS processes, each with its own Python interpreter and GIL, utilizing all CPU cores."
      },
      {
        "id": "py-internals-gil-q3",
        "question": "Does the GIL protect user variables from race conditions in multithreaded programs?",
        "options": [
          "Yes, Python variables are always thread-safe",
          "No, the GIL only protects CPython interpreter internals; user code still requires locks",
          "Only for integers",
          "Only in Python 3"
        ],
        "correctIndex": 1,
        "explanation": "Threads can switch between bytecode operations, creating race conditions in user code without explicit locks."
      }
    ],
    "codingChallenge": {
      "title": "Select Concurrency Strategy",
      "problem": "Write a function `recommend_concurrency(task_type: str, io_bound: bool) -> str` that returns `\"multiprocessing\"` for CPU-bound tasks, `\"asyncio\"` for high-concurrency I/O-bound tasks (`task_type == \"network\"`), and `\"threading\"` for general I/O tasks.",
      "hints": [
        "If not io_bound: return \"multiprocessing\".",
        "If io_bound and task_type == \"network\": return \"asyncio\".",
        "Else return \"threading\"."
      ],
      "starterCode": "def recommend_concurrency(task_type: str, io_bound: bool) -> str:\n    # Write your solution here\n    pass",
      "solution": "def recommend_concurrency(task_type: str, io_bound: bool) -> str:\n    if not io_bound:\n        return \"multiprocessing\"\n    if task_type == \"network\":\n        return \"asyncio\"\n    return \"threading\"",
      "testCases": [
        {
          "input": "\"image_processing\", False",
          "expectedOutput": "\"multiprocessing\""
        },
        {
          "input": "\"network\", True",
          "expectedOutput": "\"asyncio\""
        },
        {
          "input": "\"disk_read\", True",
          "expectedOutput": "\"threading\""
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "if hasattr(sys, \"_is_gil_enabled\"):",
        "codeSnippet": "if hasattr(sys, \"_is_gil_enabled\"):",
        "explanation": "Python 3.13+ API for checking free-threaded mode status."
      },
      {
        "line": 8,
        "lines": "8",
        "code": "print(f\"Is GIL currently active? {is_gil_enabled}\")",
        "codeSnippet": "print(f\"Is GIL currently active? {is_gil_enabled}\")",
        "explanation": "Reports whether interpreter is bound by GIL."
      }
    ],
    "applications": [
      {
        "industry": "Web Servers (Gunicorn / Uvicorn)",
        "application": "Running multiple worker processes (pre-fork model) to utilize all CPU cores.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Web Servers (Gunicorn / Uvicorn)",
        "description": "Running multiple worker processes (pre-fork model) to utilize all CPU cores."
      },
      {
        "industry": "High-Performance Numerical Computing",
        "application": "NumPy releasing the GIL to run multi-threaded BLAS/LAPACK matrix operations.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "High-Performance Numerical Computing",
        "description": "NumPy releasing the GIL to run multi-threaded BLAS/LAPACK matrix operations."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Understand what the Global Interpreter Lock (GIL) is: a mutex guarding Python object access.",
        "Explain why the GIL was created: simplified C-extension integration and reference count thread safety.",
        "Differentiate CPU-bound tasks (blocked by GIL) from I/O-bound tasks (GIL released during I/O)."
      ]
    }
  },
  "py-internals-concurrency": {
    "id": "py-internals-concurrency",
    "moduleId": "python-module-9",
    "title": "Threads, Processes, and Async I/O",
    "subtitle": "threading, multiprocessing, asyncio, concurrent.futures, and Selecting the Right Model",
    "order": 10,
    "readTimeMinutes": 30,
    "difficulty": "Advanced",
    "visualizerType": "execution-trace",
    "objectives": [
      "Compare the three concurrency paradigms: OS Threads, OS Processes, and Async Event Loops.",
      "Use `concurrent.futures.ThreadPoolExecutor` and `ProcessPoolExecutor` for clean task dispatch.",
      "Understand cooperative multitasking with `asyncio`, `async def`, `await`, and event loops.",
      "Select the optimal concurrency architecture based on workload characteristics."
    ],
    "prerequisites": [
      "Python functions, GIL concepts, and generators."
    ],
    "analogy": {
      "title": "The Restaurant Kitchen Concurrency Models",
      "text": "Threading is hiring 4 cooks who share a single stove (one pan at a time due to GIL, but good if waiting for orders). Multiprocessing is opening 4 separate restaurants in different buildings, each with their own stove and kitchen (true parallel cooking, but high rent/memory cost to communicate). Async I/O is a single master chef with a stopwatch who puts 10 pizzas in the oven, steps away while they bake, chops onions, checks the dough, and never sits idle waiting.",
      "metaphor": "Threads share memory; processes have isolated memory; asyncio runs single-threaded cooperative multitasking."
    },
    "problemSolved": {
      "title": "Scaling Concurrent Workloads Without Crashing Resources",
      "description": "Spawning 10,000 OS threads will crash an operating system due to stack memory exhaustion. Async I/O handles 100,000 concurrent network sockets in a single thread with minimal RAM.",
      "keyPoints": [
        "`threading`: Best for I/O-bound tasks with shared memory.",
        "`multiprocessing`: Best for CPU-bound tasks utilizing multiple CPU cores.",
        "`asyncio`: Best for high-concurrency network services (web servers, websockets) without thread overhead.",
        "`concurrent.futures`: High-level unified API for managing thread and process pools."
      ]
    },
    "intuition": {
      "overview": "Concurrency means dealing with lots of things at once; parallelism means doing lots of things at once. Asyncio provides concurrency on 1 core; multiprocessing provides true parallelism.",
      "steps": [
        {
          "step": 1,
          "title": "Analyze Bottleneck",
          "description": "Determine if bottleneck is CPU (computation) or I/O (network/disk)."
        },
        {
          "step": 2,
          "title": "Select Architecture",
          "description": "Choose multiprocessing for CPU, asyncio/threading for I/O."
        },
        {
          "step": 3,
          "title": "Execute & Gather",
          "description": "Dispatch tasks to executors or gather async coroutines."
        }
      ]
    },
    "codeExample": {
      "title": "Unified Task Dispatch with concurrent.futures",
      "code": "from concurrent.futures import ThreadPoolExecutor, as_completed\nimport time\n\ndef fetch_data(source_id: int) -> dict:\n    \"\"\"Simulate fetching remote data.\"\"\"\n    time.sleep(0.05)\n    return {\"id\": source_id, \"data\": f\"payload_{source_id}\"}\n\n# Thread pool managing worker threads\nsources = [101, 102, 103, 104]\nresults = []\n\nwith ThreadPoolExecutor(max_workers=4) as executor:\n    # Submit tasks returning future objects\n    future_to_id = {executor.submit(fetch_data, sid): sid for sid in sources}\n    for future in as_completed(future_to_id):\n        sid = future_to_id[future]\n        try:\n            data = future.result()\n            results.append(data)\n        except Exception as exc:\n            print(f\"Source {sid} generated an exception: {exc}\")\n\nprint(f\"Gathered {len(results)} results in parallel!\")",
      "explanation": "Demonstrates ThreadPoolExecutor for parallel network fetching and handling results via as_completed()."
    },
    "runnableCode": {
      "code": "import asyncio\n\nasync def fetch_api(endpoint: str, delay: float):\n    print(f\"Starting {endpoint}...\")\n    await asyncio.sleep(delay)  # Non-blocking pause!\n    print(f\"Finished {endpoint}!\")\n    return f\"{endpoint}_data\"\n\nasync def main():\n    # Run two coroutines concurrently on a single thread!\n    results = await asyncio.gather(\n        fetch_api(\"users\", 0.05),\n        fetch_api(\"orders\", 0.02)\n    )\n    print(\"Gathered results:\", results)\n\nasyncio.run(main())",
      "expectedOutput": "Starting users...\nStarting orders...\nFinished orders...\nFinished users!\nGathered results: ['users_data', 'orders_data']"
    },
    "lineByLine": [
      {
        "line": 5,
        "lines": "5",
        "code": "    await asyncio.sleep(delay)",
        "codeSnippet": "    await asyncio.sleep(delay)",
        "explanation": "Yields control back to the event loop while waiting."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "    results = await asyncio.gather(...)",
        "codeSnippet": "    results = await asyncio.gather(...)",
        "explanation": "Schedules coroutines concurrently on the event loop."
      },
      {
        "line": 17,
        "lines": "17",
        "code": "asyncio.run(main())",
        "codeSnippet": "asyncio.run(main())",
        "explanation": "Initializes event loop, executes main(), and cleans up resources."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Calling blocking functions (like `time.sleep()` or `requests.get()`) inside `async def` functions.",
        "solution": "Use async non-blocking alternatives (`asyncio.sleep`, `httpx`, `aiohttp`) or run blocking code in `asyncio.to_thread()`.",
        "whyWrong": "Freezes the entire single-threaded event loop, blocking ALL other concurrent async tasks from executing.",
        "howToFix": "Use async non-blocking alternatives (`asyncio.sleep`, `httpx`, `aiohttp`) or run blocking code in `asyncio.to_thread()`."
      },
      {
        "mistake": "Using multiprocessing without wrapping main entry code in `if __name__ == \"__main__\":`.",
        "solution": "Always guard multiprocessing starts with `if __name__ == \"__main__\":`.",
        "whyWrong": "On Windows and macOS (spawn method), child processes re-import the main script, creating an infinite recursive process fork bomb.",
        "howToFix": "Always guard multiprocessing starts with `if __name__ == \"__main__\":`."
      }
    ],
    "realWorldApplications": [
      {
        "title": "Web Frameworks (FastAPI / Starlette)",
        "description": "Handling tens of thousands of concurrent client connections with asyncio."
      },
      {
        "title": "Data Processing Pipelines",
        "description": "Using `ProcessPoolExecutor` to parallelize image resizing or video encoding across all CPU cores."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-internals-concurrency-pq1",
        "question": "What is the primary difference between `threading` and `multiprocessing` in Python?",
        "hint": "Memory isolation.",
        "answer": "Threads share the same memory space and are constrained by a single GIL; processes have separate memory spaces and separate GILs, achieving true CPU parallelism."
      },
      {
        "id": "py-internals-concurrency-pq2",
        "question": "What happens if you run a blocking call like `time.sleep(5)` inside an `asyncio` coroutine?",
        "hint": "Event loop impact.",
        "answer": "It blocks the single thread running the event loop, freezing all other concurrent coroutines for 5 seconds."
      },
      {
        "id": "py-internals-concurrency-pq3",
        "question": "What is the unified standard library module that provides `ThreadPoolExecutor` and `ProcessPoolExecutor`?",
        "hint": "Module name.",
        "answer": "`concurrent.futures`."
      }
    ],
    "quiz": [
      {
        "id": "py-internals-concurrency-q1",
        "question": "Which concurrency model can handle 50,000 concurrent open socket connections on modest hardware with minimal RAM?",
        "options": [
          "multiprocessing",
          "threading",
          "asyncio",
          "subprocesses"
        ],
        "correctIndex": 2,
        "explanation": "`asyncio` uses lightweight coroutines rather than OS thread stacks, scaling to tens of thousands of connections easily."
      },
      {
        "id": "py-internals-concurrency-q2",
        "question": "Why must code starting multiprocessing on Windows be inside `if __name__ == \"__main__\":`?",
        "options": [
          "To compile the script",
          "Because Windows uses the spawn method, which re-imports the script in child processes",
          "Windows security restriction",
          "To enable CPython optimizations"
        ],
        "correctIndex": 1,
        "explanation": "The spawn start method re-imports the main module; without the guard, it enters an infinite process-creation loop."
      },
      {
        "id": "py-internals-concurrency-q3",
        "question": "How do you run a blocking synchronous function in a background thread from within asyncio?",
        "options": [
          "await asyncio.to_thread(func, *args)",
          "async func()",
          "run_sync(func)",
          "thread(func)"
        ],
        "correctIndex": 0,
        "explanation": "`asyncio.to_thread(func, *args)` offloads the blocking callable to a separate worker thread."
      }
    ],
    "codingChallenge": {
      "title": "Asynchronous Batch Fetcher",
      "problem": "Write an async function `batch_fetch(items: list[str]) -> list[str]` that processes all items concurrently using `asyncio.gather`. For each item, simulate a network fetch with `await asyncio.sleep(0.01)` and return `f\"fetched_{item}\"`.",
      "hints": [
        "Define helper async def fetch_item(item): await asyncio.sleep(0.01); return f\"fetched_{item}\".",
        "Use await asyncio.gather(*(fetch_item(i) for i in items)).",
        "Return list of results."
      ],
      "starterCode": "import asyncio\n\nasync def batch_fetch(items: list[str]) -> list[str]:\n    # Write your solution here\n    pass",
      "solution": "import asyncio\n\nasync def batch_fetch(items: list[str]) -> list[str]:\n    async def fetch_one(item: str) -> str:\n        await asyncio.sleep(0.01)\n        return f\"fetched_{item}\"\n    return list(await asyncio.gather(*(fetch_one(item) for item in items)))",
      "testCases": [
        {
          "input": "asyncio.run(batch_fetch([\"A\", \"B\"]))",
          "expectedOutput": "[\"fetched_A\", \"fetched_B\"]"
        }
      ]
    },
    "lineByLineExplanation": [
      {
        "line": 5,
        "lines": "5",
        "code": "    await asyncio.sleep(delay)",
        "codeSnippet": "    await asyncio.sleep(delay)",
        "explanation": "Yields control back to the event loop while waiting."
      },
      {
        "line": 12,
        "lines": "12",
        "code": "    results = await asyncio.gather(...)",
        "codeSnippet": "    results = await asyncio.gather(...)",
        "explanation": "Schedules coroutines concurrently on the event loop."
      },
      {
        "line": 17,
        "lines": "17",
        "code": "asyncio.run(main())",
        "codeSnippet": "asyncio.run(main())",
        "explanation": "Initializes event loop, executes main(), and cleans up resources."
      }
    ],
    "applications": [
      {
        "industry": "Web Frameworks (FastAPI / Starlette)",
        "application": "Handling tens of thousands of concurrent client connections with asyncio.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Web Frameworks (FastAPI / Starlette)",
        "description": "Handling tens of thousands of concurrent client connections with asyncio."
      },
      {
        "industry": "Data Processing Pipelines",
        "application": "Using `ProcessPoolExecutor` to parallelize image resizing or video encoding across all CPU cores.",
        "benefit": "Optimized throughput, maintainability, and reliability",
        "title": "Data Processing Pipelines",
        "description": "Using `ProcessPoolExecutor` to parallelize image resizing or video encoding across all CPU cores."
      }
    ],
    "bestPractices": [
      "Adhere to PEP 8 naming and formatting conventions for clarity.",
      "Profile before optimizing and keep data structures as localized as possible.",
      "Write descriptive docstrings and unit tests covering edge cases."
    ],
    "summary": {
      "keyTakeaways": [
        "Compare the three concurrency paradigms: OS Threads, OS Processes, and Async Event Loops.",
        "Use `concurrent.futures.ThreadPoolExecutor` and `ProcessPoolExecutor` for clean task dispatch.",
        "Understand cooperative multitasking with `asyncio`, `async def`, `await`, and event loops."
      ]
    }
  }
};
