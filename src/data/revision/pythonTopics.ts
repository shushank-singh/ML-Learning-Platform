import { RevisionTopic } from './types';

export const PYTHON_REVISION_TOPICS: RevisionTopic[] = [
  {
    id: 'py-mutability-references',
    subject: 'python',
    category: 'Variables and Data Types',
    title: 'Mutable vs. Immutable Objects & References',
    subtitle: 'Python Memory Model: Names Bound to Heap Objects',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 45,
    tags: ['Memory', 'Pointers', 'id()', 'is vs ==', 'Aliasing'],
    quickRecall: {
      oneLiner:
        'Variables in Python are not memory boxes; they are pointer name-bindings referencing heap-allocated objects with refcounts and type pointers.',
      whenToUse:
        'When passing arguments to functions or modifying collections to prevent unintentional side effects in calling code.',
      whyItMatters:
        'Modifying a mutable object in-place alters all variables that reference that object; immutable objects create a fresh copy upon reassignment.',
      keyPoints: [
        'Immutable: int, float, str, tuple, frozenset, bool, bytes (values cannot be modified after creation).',
        'Mutable: list, dict, set, bytearray, user-defined classes (can mutate in-place without changing object ID).',
        '`is` compares memory address identity (id(a) == id(b)); `==` compares value equality (a.__eq__(b)).',
        'Small integer caching: Python pre-allocates integers from -5 to 256 in memory for instant reuse.',
      ],
      formulaOrSyntax: {
        label: 'Reference Check Syntax',
        codeOrLatex: 'a = [1, 2]; b = a; b.append(3) # a is now [1, 2, 3]!\\na is b # True (same id(a) == id(b))',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'id() lookup: O(1) | Mutation in-place: O(1) amortized',
        space: 'References take 8 bytes on 64-bit CPython',
      },
      commonMistakeOrTrap: {
        mistake: 'Using `copy.copy()` (shallow copy) on nested lists and expecting sub-lists to be isolated.',
        fix: 'Use `copy.deepcopy()` to recursively clone inner mutable containers.',
        interviewTrap:
          'Question: "Can an immutable tuple contain a mutable list?" Answer: Yes! `t = (1, [2, 3])`. The tuple reference to the list is immutable, but the list itself can still be mutated (`t[1].append(4)` succeeds)!',
      },
      examCheatsheet: [
        '`is` tests pointer identity; `==` calls `__eq__` for value parity',
        'Tuples containing mutable elements can still change internal values',
        'Integers -5 to 256 share singleton memory addresses in CPython',
        'In-place operators (`+=`) mutate lists in-place but create new strings',
      ],
    },
    visual: {
      type: 'memory-layout',
      title: 'Namespace Variable Bindings → Heap Objects Diagram',
      caption:
        'Variable names "a" and "b" both hold pointer addresses leading to the exact same list object at memory address 0x7FFF.',
      visualKey: 'py-memory-references-viz',
      details: {
        comparison: {
          headers: ['Type', 'Category', 'In-Place Mutation Supported?', 'id() Changes on +=?'],
          rows: [
            ['int / float', 'Immutable', 'No (Creates new integer object)', 'Yes (Points to new address)'],
            ['str', 'Immutable', 'No (Creates new string)', 'Yes (Creates new buffer)'],
            ['tuple', 'Immutable', 'No (Fixed pointer slots)', 'Yes (Produces new tuple)'],
            ['list / dict / set', 'Mutable', 'Yes (.append(), [k]=v)', 'No (Same memory address id)'],
          ],
        },
      },
    },
    animation: {
      type: 'python-reference-mutation-interactive',
      title: 'Heap Reference & Aliasing Animator',
      description:
        'Step through: 1) a=[1, 2], 2) b=a, 3) b.append(99). Watch both pointers reflect the updated heap buffer.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Execution Step',
        min: 1,
        max: 4,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the result of running `a = [1]; b = a; b += [2]; print(a)` in Python?',
        options: ['[1]', '[1, 2]', 'AttributeError', '[2]'],
        correctIndex: 1,
        explanation:
          'Because lists are mutable, the `+=` operator executes `__iadd__`, mutating the underlying list in-place. Since `a` and `b` reference the same object, `a` reflects `[1, 2]`.',
      },
      {
        id: 'q2',
        question: 'What is the crucial difference between the `is` keyword and `==` operator?',
        options: [
          '`is` checks memory address identity; `==` checks value equality',
          '`is` is only for strings; `==` is for numbers',
          '`==` is faster than `is`',
          'There is no difference; they are aliases',
        ],
        correctIndex: 0,
        explanation: '`is` verifies whether both variables point to the identical memory address (id(x) == id(y)).',
      },
      {
        id: 'q3',
        question: 'Which of the following built-in types in Python is immutable?',
        options: ['list', 'dict', 'set', 'tuple'],
        correctIndex: 3,
        explanation: 'Tuples are immutable; once initialized, their element references cannot be added, deleted, or reassigned.',
      },
    ],
  },
  {
    id: 'py-string-slicing',
    subject: 'python',
    category: 'Strings and Slicing',
    title: 'String Slicing & Memory Views',
    subtitle: 'Zero-Based Indexing, Negative Steps, and O(k) Memory Slicing',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Strings', 'Slicing', 'Negative Step', 'Palindrome', 'MemoryView'],
    quickRecall: {
      oneLiner:
        'Sequence slicing uses the pattern `sequence[start:stop:step]` where stop is exclusive, creating a shallow copy in O(k) time.',
      whenToUse:
        'Extracting substrings, reversing sequences in one line (`s[::-1]`), sampling elements, or batching tokens.',
      whyItMatters:
        'Python string slicing handles out-of-bounds indices gracefully without throwing `IndexError`.',
      keyPoints: [
        '`start`: inclusive (default 0 for step > 0, -1 for step < 0).',
        '`stop`: exclusive (stops one index before reaching this boundary).',
        '`step`: stride distance (negative step iterates right-to-left).',
        'Reversal trick: `s[::-1]` reverses any sequence in optimized C speed.',
        'Slicing a string copies characters; `memoryview` on bytes avoids copying.',
      ],
      formulaOrSyntax: {
        label: 'Slice Syntax Pattern',
        codeOrLatex: 's = "PYTHON"\ns[1:4]   # "YTH" (indices 1, 2, 3)\ns[::-1]  # "NOHTYP" (reversal)\ns[::2]   # "PTO" (every 2nd char)',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(k) where k is the length of the slice (copies k chars)',
        space: 'O(k) for the newly allocated string object',
      },
      commonMistakeOrTrap: {
        mistake: 'Assuming `s[100]` and `s[100:105]` both throw `IndexError`.',
        fix: 'Direct indexing `s[100]` throws `IndexError`, but slice `s[100:105]` returns an empty string `""` safely without crashing.',
        interviewTrap:
          'Question: "What does s[-1:-4:-1] return for s = \'ABCDE\'?" Answer: \'EDC\'! Starts at index -1 (\'E\'), steps backwards until index -4 (\'A\', exclusive).',
      },
      examCheatsheet: [
        '`stop` index is always exclusive',
        'Negative indices count from the end: -1 is the last character',
        'Slicing never raises `IndexError` even if boundaries exceed string length',
      ],
    },
    visual: {
      type: 'step-trace',
      title: 'Index Track: Positive Forward Indices vs. Negative Reverse Indices',
      caption:
        'Characters indexed from 0 to N-1 from left to right, and -N to -1 from right to left.',
      visualKey: 'py-string-slicing-viz',
      details: {
        inputOutput: {
          input: 'String s = "DATA_SCIENCE", Slice: s[5:12]',
          output: 'Returns "SCIENCE" (indices 5, 6, 7, 8, 9, 10, 11)',
        },
      },
    },
    animation: {
      type: 'slicing-slider-interactive',
      title: 'Interactive String Window Slicer',
      description:
        'Drag the Start and Stop sliders to see the highlighted slice substring update in real time.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'slider',
        label: 'Slice Stop Index',
        min: 1,
        max: 10,
        step: 1,
        defaultVal: 6,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the output of `"MACHINE"[::-1]` in Python?',
        options: ['"MACHINE"', '"ENIHCAM"', 'SyntaxError', '""'],
        correctIndex: 1,
        explanation: 'A step of -1 reverses the sequence from the last character to the first.',
      },
      {
        id: 'q2',
        question: 'Given `s = "PY"`, what happens when you evaluate `s[10:20]`?',
        options: ['IndexError is raised', 'Returns "" (empty string)', 'Returns None', 'Throws ValueError'],
        correctIndex: 1,
        explanation: 'Python slices clamp gracefully to string boundaries and return an empty string rather than crashing.',
      },
      {
        id: 'q3',
        question: 'What is the time complexity of slicing a substring of length k from a string of length N?',
        options: ['O(1)', 'O(k)', 'O(N)', 'O(N²)'],
        correctIndex: 1,
        explanation: 'CPython allocates a new string and copies k characters into it, running in O(k) time.',
      },
    ],
  },
  {
    id: 'py-collections-internals',
    subject: 'python',
    category: 'Lists, Tuples, Sets and Dictionaries',
    title: 'List vs. Tuple vs. Set vs. Dict Internals',
    subtitle: 'Over-Allocation, Hash Tables, and Collision Resolution',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Hash Table', 'Over-allocation', 'O(1) Lookup', 'Open Addressing'],
    quickRecall: {
      oneLiner:
        'Lists are dynamic arrays with geometric over-allocation; Dicts and Sets are compact hash tables using open addressing with quadratic probing.',
      whenToUse:
        'Choose Dict/Set for O(1) membership checking and unique lookups; choose List for ordered sequences with indexed access.',
      whyItMatters:
        'Checking `x in my_list` is O(N); checking `x in my_set` is O(1). Switching to a set speeds up membership queries 10,000x.',
      keyPoints: [
        'List: Contiguous array of 8-byte pointer references. `append()` is amortized O(1) due to growth pattern: 0, 4, 8, 16, 25, 35...',
        'Dict: Compact hash table (since Python 3.6) preserves insertion order by splitting storage into `indices` array and `entries` table.',
        'Set: Uses the same hash table structure as dict, but stores only keys with dummy values.',
        'Hashability: An object can be a dict key or set item ONLY if it is immutable and implements `__hash__` and `__eq__`.',
      ],
      formulaOrSyntax: {
        label: 'Hash Lookup Equation',
        codeOrLatex: '\\text{bucket} = \\text{hash}(key) \\pmod{\\text{table\\_size}}',
        isLatex: true,
      },
      complexity: {
        time: 'Dict/Set lookup: O(1) avg, O(N) worst | List lookup: O(N) | List index: O(1)',
        space: 'Dict/Set uses ~3x more memory than List to maintain load factor < 0.66',
      },
      commonMistakeOrTrap: {
        mistake: 'Using a list as a dictionary key or set item: `d = {[1, 2]: "val"}`.',
        fix: 'Lists are mutable and unhashable (raises `TypeError: unhashable type: list`). Use a tuple `(1, 2)` instead.',
        interviewTrap:
          'Question: "Can two different keys have the same hash value in Python?" Answer: Yes, this is a hash collision. Python resolves collisions using open addressing perturbation: `j = (5*j + 1 + perturb) >> 5`.',
      },
      examCheatsheet: [
        'List append: Amortized O(1); List insert at 0: O(N) due to shifting all elements',
        'Dict preserves insertion order starting from Python 3.7+ specification',
        'Unhashable types: list, dict, set (cannot be used as dict keys)',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'CPython Internal Memory & Complexity Breakdown',
      caption:
        'Comparison of underlying C data structures, growth strategies, and operation runtimes.',
      visualKey: 'py-collections-matrix',
      details: {
        comparison: {
          headers: ['Data Structure', 'Underlying C Layout', 'Access', 'Search (`in`)', 'Memory Overhead'],
          rows: [
            ['List', 'Dynamic pointer array', 'O(1) by index', 'O(N) linear scan', 'Low (Over-allocation buffer)'],
            ['Tuple', 'Fixed-size pointer array', 'O(1) by index', 'O(N) linear scan', 'Lowest (Zero buffer overhead)'],
            ['Set', 'Open-addressed hash table', 'N/A (Unindexed)', 'O(1) average hash', 'High (~3x list footprint)'],
            ['Dict', 'Split indices + entries table', 'O(1) by key', 'O(1) average hash', 'Moderate-High (Order preserved)'],
          ],
        },
      },
    },
    animation: {
      type: 'hash-table-collision-interactive',
      title: 'Dict Hash Table Bucket Inserter',
      description:
        'Insert keys into the simulated hash table to visualize bucket mapping, load factor increase, and quadratic probe collision handling.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Insert Key Step',
        min: 1,
        max: 5,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does checking `val in my_set` run in O(1) time compared to O(N) in `my_list`?',
        options: [
          'Because sets are pre-sorted in ascending order',
          'Because sets compute the hash of `val` and jump directly to the target memory bucket',
          'Because sets use binary search',
          'Because sets run on GPU threads',
        ],
        correctIndex: 1,
        explanation: 'Sets evaluate `hash(val)` to calculate the exact bucket index instantly without scanning other elements.',
      },
      {
        id: 'q2',
        question: 'Which of the following objects can be used as a key in a Python dictionary?',
        options: ['[1, 2, 3]', '{"a": 1}', '(1, 2, 3)', '{1, 2}'],
        correctIndex: 2,
        explanation: 'Tuples are immutable and hashable, making them valid dictionary keys. Lists, sets, and dicts are mutable and unhashable.',
      },
      {
        id: 'q3',
        question: 'What is the time complexity of inserting an item at the beginning of a Python list (`list.insert(0, val)`)?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Inserting at index 0 requires shifting all existing N pointer references one position to the right in memory, taking O(N) time.',
      },
    ],
  },
  {
    id: 'py-list-comprehensions',
    subject: 'python',
    category: 'List Comprehensions',
    title: 'List Comprehensions & Scope Mechanics',
    subtitle: 'Syntactic Sugar with Optimized Bytecode Execution',
    difficulty: 'Beginner',
    isInterviewFavorite: false,
    readTimeSeconds: 40,
    tags: ['Comprehensions', 'Bytecode', 'Scope', 'Filtering'],
    quickRecall: {
      oneLiner:
        'Provides a concise syntax `[expr for item in iterable if cond]` that compiles into optimized `LIST_APPEND` C-level bytecode instructions.',
      whenToUse:
        'Transforming and filtering collections into new lists without writing verbose four-line `for` loops.',
      whyItMatters:
        'Runs 20-30% faster than standard Python `for` loops because the loop executes in C speed inside the interpreter without Python-level `.append()` method lookups.',
      keyPoints: [
        'Syntax pattern: `[expression for item in iterable if condition]`.',
        'Dict comprehension: `{k: v for k, v in pairs}`.',
        'Set comprehension: `{x for x in iterable}`.',
        'Generator expression: `(x for x in iterable)` produces a lazy iterator without allocating memory.',
        'In Python 3+, comprehension variables have their own local function scope and do not leak into the surrounding namespace.',
      ],
      formulaOrSyntax: {
        label: 'Comprehension Template',
        codeOrLatex: '# Flat mapping & filtering\nsquares = [x**2 for x in range(10) if x % 2 == 0]\n# Equivalent dict comp\nsquare_map = {x: x**2 for x in range(5)}',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(N) linear pass over iterable',
        space: 'O(N) for list comp; O(1) for generator expression `(...)`!',
      },
      commonMistakeOrTrap: {
        mistake: 'Using nested list comprehensions with 3+ levels.',
        fix: 'Deeply nested comprehensions ruin readability; break them into explicit functions or generators if they exceed 2 clauses.',
        interviewTrap:
          'Question: "Does `[x for x in range(5)]` leak `x` into outer scope?" Answer: In Python 2 it leaked, but in Python 3 each comprehension is compiled into an isolated implicit code block/frame, so `x` does not leak.',
      },
      examCheatsheet: [
        '`[x for x in ...]` builds entire list in memory immediately',
        '`(x for x in ...)` is a generator that computes values on demand (lazy)',
        'Significantly faster than `.append()` loop because it avoids Python attribute lookup',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Comprehension Transformation & Bytecode Pipeline',
      caption:
        'Input Stream → Predicate Filter (`if x % 2 == 0`) → Mapping Transform (`x**2`) → C-level `LIST_APPEND`.',
      visualKey: 'py-list-comp-flow',
      details: {
        inputOutput: {
          input: 'range(6) = [0, 1, 2, 3, 4, 5]',
          output: '[x * 10 for x in range(6) if x > 2] → [30, 40, 50]',
        },
      },
    },
    animation: {
      type: 'comprehension-filter-interactive',
      title: 'Stream Filter & Map Animator',
      description:
        'Watch elements from the input iterable get evaluated by the condition predicate and appended to the result buffer.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Filter Condition',
        options: ['Even Numbers Only (x % 2 == 0)', 'Greater Than 2 (x > 2)', 'Square All (x ** 2)'],
        defaultVal: 'Even Numbers Only (x % 2 == 0)',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why is a list comprehension faster than an equivalent `for` loop with `.append()` in Python?',
        options: [
          'Because it runs on multiple CPU threads',
          'Because it uses the specialized C-level `LIST_APPEND` bytecode opcode and avoids repeated `.append` method lookups',
          'Because it skips garbage collection',
          'Because it converts all numbers to floats',
        ],
        correctIndex: 1,
        explanation: 'List comprehensions compile down to a tight C loop in CPython, skipping Python-level attribute resolution on each step.',
      },
      {
        id: 'q2',
        question: 'What is the type of `g` in `g = (x * 2 for x in range(1000000))`?',
        options: ['tuple', 'list', 'generator object (lazy iterator)', 'int'],
        correctIndex: 2,
        explanation: 'Enclosing a comprehension in parentheses creates a lazy generator iterator that uses O(1) memory.',
      },
      {
        id: 'q3',
        question: 'What is the output of `{x: x % 2 == 0 for x in [1, 2, 3]}`?',
        options: [
          '{1: False, 2: True, 3: False}',
          '[False, True, False]',
          '{1, 2, 3}',
          'SyntaxError',
        ],
        correctIndex: 0,
        explanation: 'This is a dictionary comprehension mapping each integer key to its boolean even/odd condition value.',
      },
    ],
  },
  {
    id: 'py-generators-yield',
    subject: 'python',
    category: 'Iterators and Generators',
    title: 'Python Generators & `yield` Mechanics',
    subtitle: 'Lazy Evaluation, State Suspension, and Memory Efficiency',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Generators', 'Yield', 'Iteration Protocol', 'Lazy Evaluation', 'Memory'],
    quickRecall: {
      oneLiner:
        'A generator function uses `yield` to suspend execution and preserve local frame state, producing values on demand without allocating entire datasets in RAM.',
      whenToUse:
        'Streaming massive datasets (e.g. 50GB log files, database cursors, infinite sequences) with O(1) constant memory.',
      whyItMatters:
        'Reading a 10GB file into `list` causes out-of-memory crash; a generator yields line-by-line using only a few kilobytes.',
      keyPoints: [
        'Iterator protocol: Objects implementing `__iter__()` returning `self` and `__next__()` returning the next value.',
        'When `__next__()` has no more items, it raises the `StopIteration` exception to terminate the loop.',
        'When a function hits `yield`, its execution frame is frozen: local variables and instruction pointer remain suspended in memory.',
        '`yield from <iterable>` delegates iteration directly to a sub-generator, flattening pipelines cleanly.',
      ],
      formulaOrSyntax: {
        label: 'Generator Function Definition',
        codeOrLatex: 'def read_large_file(filepath):\n    with open(filepath) as f:\n        for line in f:\n            yield line.strip() # Suspends state here',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(1) per yield step | Total traversal: O(N)',
        space: 'O(1) constant memory regardless of stream size!',
      },
      commonMistakeOrTrap: {
        mistake: 'Trying to reuse an exhausted generator.',
        fix: 'Generators are single-pass iterators; once exhausted, subsequent `next(g)` calls raise `StopIteration`. You must instantiate a new generator.',
        interviewTrap:
          'Question: "Can you send data back into a suspended generator?" Answer: Yes! The generator method `g.send(value)` resumes the generator and yields a value while passing data into the `yield` expression.',
      },
      examCheatsheet: [
        '`yield` pauses execution; function state is preserved in heap frame',
        '`StopIteration` automatically caught by Python `for` loops',
        'Memory usage: Constant O(1) vs. List O(N)',
        '`sys.getsizeof(generator)` is typically around 120 bytes',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Generator State Machine: Execution Suspension & Resumption',
      caption:
        'Calling `next()` transitions state from SUSPENDED → RUNNING → `yield val` → SUSPENDED until exhaustion.',
      visualKey: 'py-generator-state-machine',
      details: {
        steps: [
          { label: '1. Call func()', desc: 'Returns generator object immediately without executing body' },
          { label: '2. next(gen)', desc: 'Executes statements until first `yield` statement is reached' },
          { label: '3. Yield & Suspend', desc: 'Returns current value to caller; freezes local variables and line pointer' },
          { label: '4. next(gen) again', desc: 'Wakes up right after the previous `yield` with local variables intact' },
        ],
      },
    },
    animation: {
      type: 'generator-yield-interactive',
      title: 'Generator Step-by-Step State Stepper',
      description:
        'Press Step to fire `next(gen)`. Watch the line pointer pause on `yield`, emit a value, and freeze local state.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Generator Step',
        min: 1,
        max: 5,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What happens immediately when a function containing a `yield` keyword is called?',
        options: [
          'It executes until the return statement',
          'It returns a generator object immediately without executing any code in the body',
          'It throws a SyntaxError',
          'It loads the entire sequence into RAM',
        ],
        correctIndex: 1,
        explanation: 'Calling a generator function returns a generator object; code execution only begins upon the first `next()` call.',
      },
      {
        id: 'q2',
        question: 'What exception is raised when a generator has no more items to yield?',
        options: ['IndexError', 'StopIteration', 'GeneratorExit', 'EOFError'],
        correctIndex: 1,
        explanation: 'CPython’s iteration protocol signals completion by raising `StopIteration`, which `for` loops intercept gracefully.',
      },
      {
        id: 'q3',
        question: 'What is the primary architectural advantage of a generator over a list when processing 100,000,000 log entries?',
        options: [
          'Generators run on all 16 CPU cores simultaneously',
          'Generators use O(1) constant memory because only 1 item resides in RAM at any given moment',
          'Generators compress data into zip files automatically',
          'Generators guarantee 0% disk error',
        ],
        correctIndex: 1,
        explanation: 'Generators compute values lazily, requiring constant memory overhead regardless of whether processing 10 items or 10 billion items.',
      },
    ],
  },
  {
    id: 'py-oop-dunder',
    subject: 'python',
    category: 'OOP',
    title: 'Python OOP: `__init__`, `self` & Dunder Methods',
    subtitle: 'Data Model Protocols and Operator Overloading',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['OOP', 'Dunder Methods', 'Operator Overloading', 'Class vs Instance'],
    quickRecall: {
      oneLiner:
        'Dunder (double underscore) methods implement Python\'s rich data model protocols, allowing custom objects to behave like native built-in types.',
      whenToUse:
        'Designing reusable classes, mathematical vectors, custom containers, or domain-driven models.',
      whyItMatters:
        'Allows clean Pythonic syntax like `len(obj)`, `obj1 + obj2`, and `print(obj)` by defining `__len__`, `__add__`, and `__repr__`.',
      keyPoints: [
        '`self`: Explicit reference to the current instance; passed as the first parameter to instance methods automatically.',
        '`__new__` vs `__init__`: `__new__` creates the object instance in memory; `__init__` initializes its attributes.',
        '`__str__` (user-friendly print) vs `__repr__` (unambiguous developer representation for debugging).',
        'Operator overloading: `+` calls `__add__`, `==` calls `__eq__`, `<` calls `__lt__`, `in` calls `__contains__`.',
      ],
      formulaOrSyntax: {
        label: 'Dunder Protocol Implementation',
        codeOrLatex: 'class Vector:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def __add__(self, o): return Vector(self.x + o.x, self.y + o.y)\n    def __repr__(self): return f"Vector({self.x}, {self.y})"',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'Method dispatch: O(1) dictionary attribute lookup `__dict__`',
        space: 'Each instance has its own `__dict__` unless `__slots__` is defined',
      },
      commonMistakeOrTrap: {
        mistake: 'Returning a value other than `None` from `__init__`.',
        fix: '`__init__` must always return `None` (raising a `TypeError` if a value is returned); initialization happens in-place.',
        interviewTrap:
          'Question: "How do you optimize memory consumption for millions of tiny class instances?" Answer: Define `__slots__ = ("x", "y")`. This replaces the dynamic instance `__dict__` with a fixed-size C array, saving ~60% RAM.',
      },
      examCheatsheet: [
        '`__repr__` goal is to be unambiguous: `eval(repr(obj)) == obj`',
        '`__str__` goal is to be readable to human end-users',
        '`__slots__` eliminates instance `__dict__` for memory optimization',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Class vs. Instance Namespace & Method Resolution Order (MRO)',
      caption:
        'Instance attributes reside in instance `__dict__`; methods reside in Class `__dict__` to share code across instances.',
      visualKey: 'py-oop-dunder-viz',
      details: {
        comparison: {
          headers: ['Dunder Method', 'Operator / Function Hook', 'Intended Purpose'],
          rows: [
            ['__init__(self, ...)', 'Instantiation: `MyClass()`', 'Initialize instance attribute state'],
            ['__repr__(self)', 'Debugging: `repr(obj)`', 'Unambiguous string to recreate object'],
            ['__str__(self)', 'Print: `print(obj)`', 'User-facing clean readable string'],
            ['__len__(self)', 'Length: `len(obj)`', 'Return non-negative integer container size'],
            ['__getitem__(self, k)', 'Subscript: `obj[k]`', 'Sequence indexing and dictionary lookups'],
          ],
        },
      },
    },
    animation: {
      type: 'dunder-dispatch-interactive',
      title: 'Operator Overload Dispatch Visualizer',
      description:
        'Click the operator buttons (+, ==, len, str) to watch how Python internally maps the operation to its corresponding dunder method.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Operator to Trigger',
        options: ['Addition (v1 + v2 → __add__)', 'Equality (v1 == v2 → __eq__)', 'Length (len(v) → __len__)'],
        defaultVal: 'Addition (v1 + v2 → __add__)',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which method is responsible for creating and allocating the instance in memory before `__init__` is called?',
        options: ['__allocate__', '__new__', '__create__', '__setup__'],
        correctIndex: 1,
        explanation: '`__new__` is the static creator method that allocates the instance and returns it to `__init__`.',
      },
      {
        id: 'q2',
        question: 'What is the primary benefit of defining `__slots__` in a class definition?',
        options: [
          'It encrypts sensitive fields',
          'It prevents creation of the instance `__dict__`, significantly reducing memory consumption for millions of objects',
          'It automatically writes unit tests',
          'It makes the class run in C language',
        ],
        correctIndex: 1,
        explanation: '`__slots__` reserves a fixed descriptor array for attributes, saving the memory overhead of a dynamic dictionary for each instance.',
      },
      {
        id: 'q3',
        question: 'If a class implements `__repr__` but omits `__str__`, what does `print(instance)` output?',
        options: [
          'It raises an AttributeError',
          'It falls back and uses the implementation in `__repr__`',
          'It prints an empty line',
          'It prints the class memory address only',
        ],
        correctIndex: 1,
        explanation: 'Python automatically falls back to `__repr__` if `__str__` is not defined.',
      },
    ],
  },
  {
    id: 'py-decorators-closures',
    subject: 'python',
    category: 'Functions and Scope',
    title: 'Decorators & Function Closures',
    subtitle: 'Higher-Order Functions and Lexical Scope Wrapping',
    difficulty: 'Advanced',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Decorators', 'Closures', 'First-Class Functions', 'functools.wraps'],
    quickRecall: {
      oneLiner:
        'A decorator is a higher-order function that takes another function as an argument, extends its behavior via a closure, and returns the modified function.',
      whenToUse:
        'Cross-cutting concerns like authentication, execution timing, rate limiting, logging, and caching (`@functools.lru_cache`).',
      whyItMatters:
        'Syntactic sugar `@my_decorator` cleanly separates core business logic from instrumentation boilerplate.',
      keyPoints: [
        'Closure: An inner function that retains access to variables from its enclosing lexical scope even after the outer function has returned.',
        '`@decorator` syntax is equivalent to `func = decorator(func)`.',
        'Always use `@functools.wraps(func)` on the wrapper: preserves the original function’s `__name__` and `__doc__`.',
        'Decorators with arguments require 3 levels of nested functions: `outer(args) -> decorator(func) -> wrapper(*args, **kwargs)`.',
      ],
      formulaOrSyntax: {
        label: 'Standard Decorator Pattern',
        codeOrLatex: 'import functools\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        # before logic\n        res = func(*args, **kwargs)\n        # after logic\n        return res\n    return wrapper',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(1) overhead per call (1 extra function stack frame)',
        space: 'O(1) for closure variable cell',
      },
      commonMistakeOrTrap: {
        mistake: 'Forgetting `@functools.wraps(func)` on the inner wrapper function.',
        fix: 'Without `wraps`, the decorated function\'s `__name__` becomes "wrapper", breaking debugging tools and documentation generators.',
        interviewTrap:
          'Question: "In what order are stacked decorators evaluated?" Answer: `@decA` on top of `@decB` compiles to `decA(decB(func))` — wrapping is bottom-up, but execution flows top-down through decA first!',
      },
      examCheatsheet: [
        '`@decorator` is exact equivalent to `func = decorator(func)`',
        'Stacked decorators: Nearest to function wraps first, outermost executes first',
        'Closure retains references via `__closure__` tuple containing `cell` objects',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Closure Wrapper Envelope & Execution Interception',
      caption:
        'Caller calls `wrapped_func()` → Wrapper intercepts → executes Pre-Hook → invokes original `func()` → executes Post-Hook → returns result.',
      visualKey: 'py-decorator-flow',
      details: {
        steps: [
          { label: 'Step 1: Wrapper Entry', desc: 'Timing starts, arguments validated, authorization checked' },
          { label: 'Step 2: Core Execution', desc: 'Original payload function invoked with (*args, **kwargs)' },
          { label: 'Step 3: Post-Execution', desc: 'Timing logged, telemetry recorded, result returned' },
        ],
      },
    },
    animation: {
      type: 'decorator-call-interactive',
      title: 'Execution Interception Trace',
      description:
        'Step through a call to an `@audit_log` decorated function to visualize the wrapper boundaries and call stack.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Trace Step',
        min: 1,
        max: 4,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the syntax `@my_dec` immediately above `def hello(): pass` equivalent to?',
        options: [
          'hello = my_dec(hello)',
          'my_dec = hello(my_dec)',
          'hello.my_dec()',
          'my_dec.register(hello)',
        ],
        correctIndex: 0,
        explanation: 'Decorators are pure syntactic sugar for passing the function to a callable and reassigning the name.',
      },
      {
        id: 'q2',
        question: 'Why should you almost always decorate the inner wrapper with `@functools.wraps(func)`?',
        options: [
          'To make the function execute 10x faster',
          'To preserve the original function name `__name__`, docstring `__doc__`, and signature metadata',
          'To convert it into a generator',
          'To allow recursive calls',
        ],
        correctIndex: 1,
        explanation: 'Without `wraps`, metadata reflection reports the wrapper function name and loses docstring introspection.',
      },
      {
        id: 'q3',
        question: 'If multiple decorators `@dec1` and `@dec2` are stacked above `func()`, which one executes its pre-hook first when `func()` is invoked?',
        options: [
          '@dec1 (the top-most decorator)',
          '@dec2 (the bottom-most decorator)',
          'They run concurrently on parallel threads',
          'It is random depending on hash order',
        ],
        correctIndex: 0,
        explanation: '`dec1(dec2(func))` means `dec1` wraps around `dec2`, so `dec1` is the outermost shell and executes its pre-hook first.',
      },
    ],
  },
  {
    id: 'py-exception-handling',
    subject: 'python',
    category: 'Exception Handling',
    title: 'Exception Hierarchy & `finally` Flow',
    subtitle: 'Robust Error Handling with `try-except-else-finally`',
    difficulty: 'Beginner',
    isInterviewFavorite: false,
    readTimeSeconds: 40,
    tags: ['Exceptions', 'Try Except', 'Finally', 'Else Block', 'Cleanup'],
    quickRecall: {
      oneLiner:
        'Python uses structured exception propagation where `try` executes risky code, `except` catches specific errors, `else` runs on success, and `finally` ALWAYS executes for cleanup.',
      whenToUse:
        'Handling runtime errors, releasing unmanaged file/socket handles, and validating external API inputs.',
      whyItMatters:
        'The `finally` block is guaranteed to execute even if an unexpected exception occurs or a `return` statement is hit inside `try`.',
      keyPoints: [
        'Inheritance hierarchy: `BaseException` → `Exception` → built-in exceptions (`ValueError`, `KeyError`, etc.).',
        'Never write bare `except:`; it catches `SystemExit`, `KeyboardInterrupt` (Ctrl+C), and `MemoryError`, preventing graceful exits.',
        'The `else` block runs only when NO exception was raised in the `try` block.',
        'Context managers (`with open(...) as f:`) leverage `__enter__` and `__exit__` to guarantee automated cleanup.',
      ],
      formulaOrSyntax: {
        label: 'Complete Exception Template',
        codeOrLatex: 'try:\n    risky_operation()\nexcept ValueError as e:\n    handle_error(e)\nelse:\n    run_on_success()\nfinally:\n    always_cleanup() # Guaranteed!',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'Zero cost in Python 3.11+ ("zero-cost exceptions" until an exception is actually thrown)',
        space: 'O(1)',
      },
      commonMistakeOrTrap: {
        mistake: 'Putting a `return` statement inside the `finally` block.',
        fix: 'A `return` inside `finally` swallows and suppresses any unhandled exception raised in `try`, silently masking critical bugs!',
        interviewTrap:
          'Question: "Does `finally` run if a `return` is reached inside `try`?" Answer: Yes, absolutely! CPython runs the code inside `finally` right before exiting the function.',
      },
      examCheatsheet: [
        'Catch specific exceptions: `except (ValueError, KeyError):`',
        '`else` runs ONLY when no exception occurred in `try`',
        '`finally` runs unconditionally (even after return / break)',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Complete `try-except-else-finally` Decision Tree',
      caption:
        'Trace the branched pathways of execution under normal vs. exceptional runtime conditions.',
      visualKey: 'py-exception-flow',
      details: {
        steps: [
          { label: 'Try Block', desc: 'Executes monitored code instructions' },
          { label: 'Exception Raised?', desc: 'YES → Match `except` handler; NO → Execute `else` block' },
          { label: 'Finally Block', desc: 'Always runs as the absolute terminal cleanup phase' },
        ],
      },
    },
    animation: {
      type: 'exception-dispatch-interactive',
      title: 'Exception Branch Simulator',
      description:
        'Toggle whether an error occurs in the Try block to watch the execution arrow redirect through Except vs Else before entering Finally.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'select',
        label: 'Execution Scenario',
        options: ['Clean Run (No Exception)', 'ValueError Raised', 'Unhandled RuntimeError'],
        defaultVal: 'Clean Run (No Exception)',
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'When does the `else` block execute in a `try-except-else-finally` statement?',
        options: [
          'Whenever an exception is caught',
          'Only when the `try` block completes successfully without raising any exceptions',
          'Only if the `finally` block fails',
          'It runs on every single iteration',
        ],
        correctIndex: 1,
        explanation: 'The `else` block executes only if code in the `try` block completed without raising any exceptions.',
      },
      {
        id: 'q2',
        question: 'Why should you avoid catching `BaseException` or writing a bare `except:`?',
        options: [
          'It slows down arithmetic operations',
          'It catches keyboard interrupts (Ctrl+C) and system exit signals, preventing the user from stopping the script',
          'It causes syntax errors in Python 3',
          'It disables the garbage collector',
        ],
        correctIndex: 1,
        explanation: 'A bare `except:` catches `KeyboardInterrupt` and `SystemExit`, making programs impossible to cancel from the terminal.',
      },
      {
        id: 'q3',
        question: 'If a function has `return 1` inside `try` and `return 2` inside `finally`, what value is returned to the caller?',
        options: ['1', '2', 'None', 'Raises SyntaxError'],
        correctIndex: 1,
        explanation: 'The `finally` block executes last before leaving the frame, and its `return` overrides and discards the previous return value.',
      },
    ],
  },
  {
    id: 'py-gil-concurrency',
    subject: 'python',
    category: 'Common Python Interview Traps',
    title: 'Global Interpreter Lock (GIL) & Multithreading',
    subtitle: 'CPython Thread Safety vs. Multiprocessing Core Scaling',
    difficulty: 'Advanced',
    isInterviewFavorite: true,
    readTimeSeconds: 55,
    tags: ['GIL', 'Threading', 'Multiprocessing', 'Asyncio', 'Concurrency'],
    quickRecall: {
      oneLiner:
        'The GIL is a mutex lock in CPython that prevents multiple native OS threads from executing Python bytecode simultaneously on separate CPU cores.',
      whenToUse:
        'Use `threading` or `asyncio` for I/O-bound tasks (network, disk); use `multiprocessing` or native C-extensions (NumPy) for CPU-bound tasks.',
      whyItMatters:
        'Running 4 CPU-heavy threads in Python will NOT speed up work across 4 cores; it actually runs slower due to thread lock contention overhead!',
      keyPoints: [
        'Why the GIL exists: CPython uses reference counting for garbage collection, which is not thread-safe without locks.',
        'I/O-Bound (Web scraping, DB queries): Threads release the GIL while waiting on sockets, enabling high concurrency.',
        'CPU-Bound (Matrix math, image rendering): Threads fight over the single GIL; use `multiprocessing.Pool` to spawn separate processes with separate memory spaces.',
        'NumPy and scientific libraries release the GIL during heavy vectorized matrix operations in underlying C/Fortran code.',
      ],
      formulaOrSyntax: {
        label: 'Concurrency Decision Rule',
        codeOrLatex: '# CPU Bound -> Multiprocessing\nfrom multiprocessing import Pool\nwith Pool(4) as p: p.map(heavy_calc, data)\n\n# I/O Bound -> Threading / Asyncio\nimport asyncio',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'Multiprocessing: True parallel O(T / cores) | Threading CPU: O(T) + lock contention',
        space: 'Multiprocessing copies memory space (IPC overhead)',
      },
      commonMistakeOrTrap: {
        mistake: 'Using `threading.Thread` to accelerate a heavy machine learning training loop or prime number search.',
        fix: 'Threads cannot execute Python bytecode in parallel. Use `multiprocessing.Process` or `concurrent.futures.ProcessPoolExecutor`.',
        interviewTrap:
          'Question: "Does Python have true OS threads?" Answer: Yes! CPython uses 1:1 native pthreads on Linux/Windows, but the GIL serializes their bytecode execution so only 1 thread holds the interpreter at any moment.',
      },
      examCheatsheet: [
        'I/O-Bound tasks = `threading` or `asyncio` (GIL released during I/O wait)',
        'CPU-Bound tasks = `multiprocessing` (Bypasses GIL with separate processes)',
        'NumPy releases GIL during C-level vectorized matrix operations',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'Concurrency Matrix: Threading vs. Multiprocessing vs. Asyncio',
      caption:
        'Comparison of execution mechanisms, memory models, and optimal workload domains.',
      visualKey: 'py-gil-matrix',
      details: {
        comparison: {
          headers: ['Model', 'Parallelism Type', 'Memory Model', 'Best For', 'GIL Impact'],
          rows: [
            ['Threading', 'Concurrent (1 core at a time)', 'Shared memory space', 'I/O-bound (web, files)', 'Serialized by GIL'],
            ['Multiprocessing', 'True Parallel (multi-core)', 'Isolated process memory', 'CPU-bound (math, crypto)', 'Bypasses GIL completely'],
            ['Asyncio', 'Single-threaded event loop', 'Single memory frame', 'High-concurrency I/O sockets', 'No thread locks needed'],
          ],
        },
      },
    },
    animation: {
      type: 'gil-lock-switch-interactive',
      title: 'GIL Mutex Passing Animator',
      description:
        'Watch Thread 1 and Thread 2 alternate ownership of the single golden GIL lock token to execute bytecode slices.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Bytecode Switch Tick',
        min: 1,
        max: 6,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does CPython use a Global Interpreter Lock (GIL)?',
        options: [
          'To speed up arithmetic calculations',
          'To ensure thread-safe memory management for reference-counted garbage collection',
          'Because the operating system does not support threads',
          'To prevent users from opening multiple windows',
        ],
        correctIndex: 1,
        explanation: 'The GIL protects CPython’s reference counting memory management from race conditions without having to lock every individual pointer.',
      },
      {
        id: 'q2',
        question: 'Which concurrency model is most appropriate for training a CPU-intensive data processing pipeline across 8 CPU cores?',
        options: ['threading.Thread', 'asyncio', 'multiprocessing.Pool', 'time.sleep()'],
        correctIndex: 2,
        explanation: '`multiprocessing` spawns distinct Python processes with individual interpreters and memory spaces, achieving true multi-core parallel computation.',
      },
      {
        id: 'q3',
        question: 'Why does multithreading work well for downloading 500 web pages simultaneously in Python?',
        options: [
          'Because network socket calls release the GIL while waiting for remote HTTP responses',
          'Because HTML files don’t have bytecode',
          'Because threads run in the cloud',
          'Because web pages bypass the operating system',
        ],
        correctIndex: 0,
        explanation: 'During I/O operations (like network wait), CPython releases the GIL, allowing other threads to execute concurrently.',
      },
    ],
  },
  {
    id: 'py-default-mutable-arguments',
    subject: 'python',
    category: 'Common Python Interview Traps',
    title: 'Default Mutable Arguments Trap',
    subtitle: 'Function Definition-Time Evaluation and Shared State Bugs',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Functions', 'Default Arguments', 'Bugs', 'Interview Classic'],
    quickRecall: {
      oneLiner:
        'Default argument expressions in Python are evaluated ONCE when the function definition is loaded, NOT each time the function is called.',
      whenToUse:
        'Writing function signatures with optional list, dict, or object parameters.',
      whyItMatters:
        'Using `def append_to(item, target=[])` causes all subsequent function invocations to mutate and share the exact same list across calls!',
      keyPoints: [
        'Python functions are first-class objects created when the `def` statement executes.',
        'Default arguments are stored as a tuple in the function\'s `__defaults__` attribute.',
        'If the default value is a mutable object (list/dict), mutations accumulate across distinct calls.',
        'The canonical Pythonic idiom: use `None` as the default sentinel value and initialize inside the body.',
      ],
      formulaOrSyntax: {
        label: 'The Canonical Sentinel Fix',
        codeOrLatex: '# BUGGY:\ndef bad(val, acc=[]): acc.append(val); return acc\n\n# PYTHONIC FIX:\ndef good(val, acc=None):\n    if acc is None:\n        acc = [] # Creates a fresh list every invocation!\n    acc.append(val)\n    return acc',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(1) creation time overhead',
        space: 'O(1)',
      },
      commonMistakeOrTrap: {
        mistake: 'Writing `def get_cache(cache={}):` expecting a fresh empty dictionary for each caller.',
        fix: 'Set `cache=None` and initialize `cache = {}` inside the function body.',
        interviewTrap:
          'Question: "Where are default argument objects stored in memory?" Answer: They are stored inside the function object itself in the attribute `func.__defaults__`!',
      },
      examCheatsheet: [
        'Default argument expressions evaluate only once at function definition time',
        'Always use `None` as the default value for mutable containers (lists, dicts, sets)',
        'Check `if arg is None:` using identity comparison',
      ],
    },
    visual: {
      type: 'memory-layout',
      title: 'Shared Function `__defaults__` Heap Slot Visualization',
      caption:
        'Repeated calls without arguments mutate the single persistent list instance stored in `append_to.__defaults__[0]`.',
      visualKey: 'py-default-arg-viz',
      details: {
        inputOutput: {
          input: 'Call 1: append_to(1) -> [1]\nCall 2: append_to(2) -> [1, 2] (NOT [2]!)',
          output: 'Unexpected cross-call accumulation bug',
        },
      },
    },
    animation: {
      type: 'default-arg-accumulator-interactive',
      title: 'Accumulator Bug Simulator',
      description:
        'Click the Call Function button multiple times to watch the shared default list in heap memory continuously grow.',
      hasInteractiveInputs: true,
      inputConfig: {
        type: 'stepper',
        label: 'Function Invocation #',
        min: 1,
        max: 4,
        step: 1,
        defaultVal: 1,
      },
    },
    quiz: [
      {
        id: 'q1',
        question: 'When is a default argument expression evaluated in Python?',
        options: [
          'Every time the function is called',
          'Only once, at the time the function definition is executed/compiled',
          'When the program exits',
          'Only when the argument is omitted',
        ],
        correctIndex: 1,
        explanation: 'Default arguments are evaluated once when Python encounters the `def` statement, binding the result to `__defaults__`.',
      },
      {
        id: 'q2',
        question: 'What is the standard Pythonic pattern to safely provide a default list to a function?',
        options: [
          'def fn(lst=[]):',
          'def fn(lst=list()):',
          'def fn(lst=None): if lst is None: lst = []',
          'def fn(lst=copy([])):',
        ],
        correctIndex: 2,
        explanation: 'Using `None` as a sentinel ensures that a fresh list is allocated in memory on each individual invocation where no argument was provided.',
      },
      {
        id: 'q3',
        question: 'What is the output of:\n```python\ndef f(x, l=[]):\n    l.append(x)\n    return l\nprint(f(1))\nprint(f(2))\n```?',
        options: [
          '[1] then [2]',
          '[1] then [1, 2]',
          '[[1], [2]]',
          'TypeError',
        ],
        correctIndex: 1,
        explanation: 'The mutable default list is retained across calls in `f.__defaults__`, appending 2 to the already populated list `[1]`.',
      },
    ],
  },
];
