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
        'Variables in Python are not boxes holding data; they are reference labels (pointers) bound to heap-allocated objects.',
      simpleAnalogy:
        'Luggage tag analogy: Variables in Python are not storage bins; they are sticky luggage tags attached to a suitcase on the heap. If you stick tag "a" and tag "b" on the exact same suitcase, putting a shirt inside through tag "b" means looking inside tag "a" reveals the shirt as well!',
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
        codeOrLatex: 'a = [1, 2]; b = a; b.append(3) # a is now [1, 2, 3]!\na is b # True (same id(a) == id(b))',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'id() lookup: O(1) | In-place append: O(1) amortized',
        space: 'References take 8 bytes on 64-bit CPython',
      },
      commonMistakeOrTrap: {
        mistake: 'Using shallow copy (`copy.copy()` or `lst[:]`) on nested lists and expecting inner sub-lists to be isolated.',
        fix: 'Shallow copies duplicate the outer container but share pointers to inner mutable lists; use `copy.deepcopy()` to recursively clone.',
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
      type: 'py-mutability-interactive',
      title: 'Heap Reference & Aliasing Animator',
      description:
        'Step through: 1) a=[1, 2], 2) b=a, 3) b.append(99). Watch both pointers reflect the updated heap buffer.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Python Memory Mutation & Identity in 5 Lines',
      language: 'python',
      code: `# Both variables bind to the exact same list in heap memory
a = [1, 2]
b = a
b.append(99) # In-place mutation!

print(f"a: {a}")               # [1, 2, 99]
print(f"Same address? {a is b}") # True (id(a) == id(b))`,
      input: 'b.append(99) called on alias',
      output: 'a: [1, 2, 99] | Same address? True',
      explanation:
        'Because lists are mutable, modifying `b` in-place alters the underlying heap object that `a` also points to.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the result of running `a = [1]; b = a; b += [2]; print(a)` in Python?',
        options: ['[1]', '[1, 2]', 'AttributeError', '[2]'],
        correctIndex: 1,
        explanation: 'Because lists are mutable, `+=` calls `__iadd__`, mutating the list in-place. Since `a` and `b` reference the same object, `a` reflects `[1, 2]`.',
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
    title: 'String Slicing & Indexing',
    subtitle: 'Zero-Based Indexing, Negative Steps, and O(k) Memory Slicing',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Strings', 'Slicing', 'Negative Step', 'Palindrome', 'MemoryView'],
    quickRecall: {
      oneLiner:
        'Sequence slicing uses the pattern `sequence[start:stop:step]` where stop is exclusive, creating a new copy in O(k) time.',
      simpleAnalogy:
        'Window blinds analogy: Imagine sliding an opaque window cover over a row of letters. You choose where the window starts, where it stops, and how many letter slats to skip. Looking through gives you the exact sub-phrase.',
      whenToUse:
        'Extracting substrings, reversing sequences in one line (`s[::-1]`), sampling elements, or batching tokens.',
      whyItMatters:
        'Python string slicing handles out-of-bounds indices gracefully without throwing `IndexError`.',
      keyPoints: [
        '`start`: inclusive (default 0 for step > 0, -1 for step < 0).',
        '`stop`: exclusive (stops one index before reaching this boundary).',
        '`step`: stride distance (negative step iterates right-to-left).',
        'Reversal trick: `s[::-1]` reverses any sequence in optimized C speed.',
        'Slicing never raises `IndexError` even if indices exceed sequence length.',
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
      type: 'py-slice-interactive',
      title: 'Interactive String Window Slicer',
      description:
        'Step through slicing a string with start, stop, and step indices.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'String Slicing & Reversal Examples in Python',
      language: 'python',
      code: `word = "DEVELOPER"

print("Slice [0:3]:  ", word[0:3])   # 'DEV'
print("Slice [3:]:   ", word[3:])    # 'ELOPER'
print("Step by 2:    ", word[::2])   # 'DVLP R' -> 'DVLPR'
print("Reverse [::-1]:", word[::-1])  # 'REPOLEVED'

# Out of bounds doesn't crash:
print("Safe slice:   ", repr(word[50:100])) # ''`,
      input: 'word = "DEVELOPER"',
      output: 'DEV | ELOPER | DVLPR | REPOLEVED | Safe slice: \'\'',
      explanation:
        'Slicing extracts contiguous or stepped sub-sequences cleanly while safely handling boundaries.',
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
        question: 'What does `"PYTHON"[1:5:2]` return?',
        options: ['"YTO"', '"YH"', '"YTN"', '"PTON"'],
        correctIndex: 1,
        explanation: 'Indices from 1 to 5 with step 2 takes index 1 (\'Y\') and index 3 (\'H\'), returning \'YH\'.',
      },
    ],
  },
  {
    id: 'py-collections-internals',
    subject: 'python',
    category: 'Lists, Tuples, Sets and Dictionaries',
    title: 'Lists, Tuples, Sets & Dicts Internals',
    subtitle: 'Dynamic Arrays, Hash Tables, and Big-O Complexity',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['List', 'Tuple', 'Set', 'Dict', 'Hash Table', 'Open Addressing'],
    quickRecall: {
      oneLiner:
        'Lists are dynamic resizing pointer arrays; Dicts and Sets are open-addressing hash tables providing average O(1) key lookups.',
      simpleAnalogy:
        'Post office boxes analogy: A List is like numbered street houses (fast to jump to house #5, but inserting a new house in the middle moves everyone down). A Dict is like post office lockboxes indexed by a unique key hash: you drop your mail directly into the exact slot in O(1) time.',
      whenToUse:
        'Choosing the right data structure for algorithmic efficiency (e.g., membership testing in sets O(1) vs lists O(N)).',
      whyItMatters:
        'Searching a 100,000-item list takes O(N) linear time; searching a set or dict takes O(1) constant time.',
      keyPoints: [
        'List: Contiguous array of pointers. Over-allocates memory (growth pattern 0, 4, 8, 16, 24, 32...). Append is amortized O(1); insert/pop(0) is O(N).',
        'Tuple: Fixed-size immutable pointer array. More memory-compact than list; struct caching avoids garbage collection churn.',
        'Dict: Compact hash table (since Python 3.6+ guarantees insertion order). Keys must be hashable (`__hash__` and `__eq__`).',
        'Set: Dict under the hood with keys only (dummy values). Unordered unique elements with O(1) membership test `x in s`.',
      ],
      formulaOrSyntax: {
        label: 'Lookup Big-O Comparison',
        codeOrLatex: 'x in my_set   # O(1) Average Time\nx in my_list  # O(N) Linear Time (Iterates whole list)',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'Dict/Set lookup: O(1) avg, O(N) worst-case collision | List index: O(1) | List search: O(N)',
        space: 'Dict/Set uses ~3x more memory than List due to hash table sparseness',
      },
      commonMistakeOrTrap: {
        mistake: 'Using a List for frequent `x in collection` membership checks inside a loop.',
        fix: 'Convert the list to a `set` once; membership check drops from O(N) to O(1), turning an O(N²) algorithm into O(N).',
        interviewTrap:
          'Question: "Can a list be a dictionary key?" Answer: No! Lists are unhashable (`TypeError: unhashable type: \'list\'`) because their contents can mutate, which would invalidate their hash bucket position in the hash table.',
      },
      examCheatsheet: [
        'Dict keys and Set elements MUST be immutable and hashable',
        '`pop()` from end of list is O(1); `pop(0)` from beginning is O(N) (shifts all elements)',
        '`collections.deque` provides O(1) appends and pops from both ends',
      ],
    },
    visual: {
      type: 'comparison-table',
      title: 'Python Built-in Collections Big-O & Architecture',
      caption:
        'Comparing internal data structures, mutability, ordering, and operations complexity.',
      visualKey: 'py-collections-internals-viz',
      details: {
        comparison: {
          headers: ['Collection', 'Underlying Structure', 'Mutable?', 'Average Lookup', 'Preserves Order?'],
          rows: [
            ['List', 'Dynamic Resizing Array', 'Yes', 'O(N) for `val in lst`, O(1) for `lst[i]`', 'Yes (Insertion order)'],
            ['Tuple', 'Fixed-size Array', 'No', 'O(N) for `val in tup`, O(1) for `tup[i]`', 'Yes (Insertion order)'],
            ['Set', 'Open-Addressing Hash Table', 'Yes', 'O(1) average', 'No (Arbitrary hash order)'],
            ['Dict', 'Combined Index Array + Hash Table', 'Yes', 'O(1) average by key', 'Yes (Python 3.6+ insertion order)'],
          ],
        },
      },
    },
    animation: {
      type: 'py-collections-interactive',
      title: 'Hash Table Bucket Lookup Simulator',
      description:
        'Step through hash(key) mod size calculating the exact array bucket index in O(1) time.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'List vs. Set Lookup Performance in Python',
      language: 'python',
      code: `# 10,000 item membership comparison
items_list = list(range(10000))
items_set = set(items_list)

# Checking if 9999 is present:
# List takes 10,000 comparisons (O(N))
# Set takes 1 hash lookup (O(1))
print("Found in list?", 9999 in items_list)
print("Found in set? ", 9999 in items_set)

# Dict preserves insertion order in Python 3.7+
d = {"apple": 1, "banana": 2, "cherry": 3}
print("Dict keys:     ", list(d.keys()))`,
      input: 'Lookup target = 9999',
      output: 'Found in list? True | Found in set? True | Dict keys: [\'apple\', \'banana\', \'cherry\']',
      explanation:
        'The set finds the element instantaneously in O(1) time by computing the hash of 9999 and jumping straight to the bucket.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why can a tuple be used as a dictionary key, but a list cannot?',
        options: [
          'Tuples are immutable and hashable; lists are mutable and therefore unhashable',
          'Tuples use less memory than lists',
          'Lists can only store numbers',
          'Python restricts keys to 3 elements max',
        ],
        correctIndex: 0,
        explanation: 'Dictionary keys must have a stable hash code throughout their lifetime; mutable objects like lists cannot be hashed.',
      },
      {
        id: 'q2',
        question: 'What is the time complexity of deleting the first element of a list using `del lst[0]`?',
        options: ['O(1)', 'O(log N)', 'O(N) because all remaining elements must shift left by one index', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Lists are contiguous arrays; removing index 0 forces memory to shift all N-1 subsequent elements one position left.',
      },
      {
        id: 'q3',
        question: 'What is the average time complexity of checking membership `x in my_set`?',
        options: ['O(N)', 'O(1)', 'O(log N)', 'O(N log N)'],
        correctIndex: 1,
        explanation: 'Sets use open-addressing hash tables, computing hash(x) to jump directly to the slot in O(1) average time.',
      },
    ],
  },
  {
    id: 'py-list-comprehensions',
    subject: 'python',
    category: 'List Comprehensions',
    title: 'List, Dict & Set Comprehensions',
    subtitle: 'Declarative Syntax, Bytecode Optimization & Memory Profiles',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Comprehensions', 'Syntax', 'Bytecode', 'LIST_APPEND', 'Generators'],
    quickRecall: {
      oneLiner:
        'Comprehensions provide concise, declarative syntax to construct collections: `[expr for item in iterable if condition]`.',
      simpleAnalogy:
        'Factory conveyor belt analogy: Raw items ride on a belt. The `if` condition is a filter arm knocking defective items off. The `expr` is a paint sprayer transforming what remains. The output box collects finished products in one clean, uninterrupted pass.',
      whenToUse:
        'Transforming and filtering collections cleanly without writing multi-line for loops with manual `.append()`.',
      whyItMatters:
        'Runs significantly faster than standard `for` loops because the loop is executed in optimized C-level bytecode (`LIST_APPEND`).',
      keyPoints: [
        'List Comprehension: `[x**2 for x in nums if x > 0]` -> constructs a full list in memory.',
        'Dict Comprehension: `{k: v for k, v in pairs}` -> constructs a dictionary.',
        'Set Comprehension: `{x % 5 for x in nums}` -> constructs a unique set.',
        'Generator Expression: `(x**2 for x in nums)` -> lazy evaluation (produces 1 item at a time, O(1) memory).',
        'Avoid deep nesting: More than 2 nested loops in a comprehension hurts readability.',
      ],
      formulaOrSyntax: {
        label: 'Comprehension Patterns',
        codeOrLatex: '# List: [output_expr for item in iter if condition]\nsquares = [x*x for x in range(10) if x % 2 == 0]\n# Dict: {k: v for item in iter}\nsquares_map = {x: x*x for x in range(5)}',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(N) single-pass iteration',
        space: 'List: O(N) full allocation | Generator `(...)`: O(1) lazy memory',
      },
      commonMistakeOrTrap: {
        mistake: 'Using a List Comprehension `[x for x in big_file]` when you only need to iterate over items once.',
        fix: 'Use a Generator Expression `(x for x in big_file)` to avoid loading millions of rows into RAM all at once.',
        interviewTrap:
          'Question: "In Python 3, do variables inside a comprehension leak into the outer scope?" Answer: No! Python 3 gives comprehensions their own isolated function-level scope; in Python 2, loop variables leaked.',
      },
      examCheatsheet: [
        'List comp uses brackets `[...]`; Generator expr uses parentheses `(...)`',
        'Faster than `.append()` loop because it bypasses Python-level method lookups',
        'Can use ternary operator: `[x if x > 0 else 0 for x in nums]`',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Comprehension Pipeline: Filter → Transform → Collect',
      caption:
        'Input sequence passes through predicate filter `if condition`, transforms via `expression`, and appends directly to target buffer.',
      visualKey: 'py-comprehensions-pipeline-viz',
      details: {
        comparison: {
          headers: ['Construct', 'Syntax', 'Memory', 'Evaluation Timing'],
          rows: [
            ['List Comprehension', '[x * 2 for x in seq]', 'O(N) (Allocates entire list in RAM)', 'Eager (Immediate)'],
            ['Generator Expression', '(x * 2 for x in seq)', 'O(1) (Produces 1 item on demand)', 'Lazy (Iterate via next())'],
            ['Set Comprehension', '{x * 2 for x in seq}', 'O(N) (Deduplicates elements)', 'Eager (Immediate)'],
            ['Dict Comprehension', '{k: v for k, v in seq}', 'O(N) (Key-value mapping)', 'Eager (Immediate)'],
          ],
        },
      },
    },
    animation: {
      type: 'py-comprehensions-interactive',
      title: 'Stream Filtering & Mapping Step Tracer',
      description:
        'Watch elements evaluate against the if-condition and map into the target list.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'List, Dict & Generator Comprehensions in Action',
      language: 'python',
      code: `nums = [1, 2, 3, 4, 5, 6]

# 1. List Comprehension: Filter even and square
evens_squared = [x**2 for x in nums if x % 2 == 0]
print("Evens Squared:   ", evens_squared) # [4, 16, 36]

# 2. Dict Comprehension: Number -> Cubed
cubes_dict = {x: x**3 for x in range(1, 4)}
print("Cubes Dictionary:", cubes_dict)     # {1: 1, 2: 8, 3: 27}

# 3. Generator Expression (O(1) memory)
gen = (x * 10 for x in nums)
print("First from gen:  ", next(gen))      # 10`,
      input: 'nums = [1, 2, 3, 4, 5, 6]',
      output: 'Evens Squared: [4, 16, 36] | Cubes: {1: 1, 2: 8, 3: 27} | First from gen: 10',
      explanation:
        'The list comprehension filters down to [2, 4, 6] and squares them in a single optimized C-level pass.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the key advantage of a generator expression `(x for x in range(10**8))` over `[x for x in range(10**8)]`?',
        options: [
          'It runs in O(1) time',
          'It generates values lazily on-demand, requiring O(1) memory instead of gigabytes of RAM',
          'It automatically sorts elements',
          'It works without Python installed',
        ],
        correctIndex: 1,
        explanation: 'Generators yield one element at a time as requested, avoiding allocating the entire array in memory.',
      },
      {
        id: 'q2',
        question: 'What is the output of `[x for x in [1, 2, 3, 4] if x % 2 == 0]`?',
        options: ['[1, 3]', '[2, 4]', '[0, 0]', '[False, True, False, True]'],
        correctIndex: 1,
        explanation: 'The if condition `x % 2 == 0` filters out odd numbers, retaining only even numbers 2 and 4.',
      },
      {
        id: 'q3',
        question: 'Why are list comprehensions faster than a traditional for loop with `result.append(x)`?',
        options: [
          'They use multi-threading',
          'They execute an optimized bytecode instruction (`LIST_APPEND`) in C without repeated attribute lookups',
          'They skip error checking',
          'They bypass memory allocation',
        ],
        correctIndex: 1,
        explanation: 'Bytecode executes the append operation directly inside the CPython evaluation loop without looking up the `.append` method on each iteration.',
      },
    ],
  },
  {
    id: 'py-generators-yield',
    subject: 'python',
    category: 'Iterators and Generators',
    title: 'Iterators, Generators & `yield`',
    subtitle: 'Lazy Evaluation, State Preservation, and Coroutine Execution',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Generators', 'Yield', 'Iterator Protocol', '__iter__', '__next__', 'Lazy'],
    quickRecall: {
      oneLiner:
        'Generators are functions that preserve state across invocations using `yield`, producing values on-demand with O(1) memory.',
      simpleAnalogy:
        'Deli ticket dispenser analogy: Instead of printing 100,000 paper tickets and stacking them on the counter all at once (huge waste of space), the machine holds its current counter position and dispenses exactly ONE ticket whenever a customer pulls it.',
      whenToUse:
        'Streaming large datasets (multi-gigabyte logs, CSVs, video frames) where holding everything in memory would crash the program with `MemoryError`.',
      whyItMatters:
        'Enables infinite streams and massive data pipelines in memory-constrained production environments.',
      keyPoints: [
        'Iterator Protocol: Object must implement `__iter__()` (returns self) and `__next__()` (returns next item or raises `StopIteration`).',
        '`yield` vs `return`: `return` terminates the function; `yield` freezes execution, saves local variables, and returns a value.',
        '`yield from subgen`: Delegates iteration cleanly to a sub-generator or nested collection.',
        'Generators can only be consumed ONCE; to re-iterate, you must instantiate a fresh generator object.',
      ],
      formulaOrSyntax: {
        label: 'Generator Function Pattern',
        codeOrLatex: 'def count_up(n):\n    i = 0\n    while i < n:\n        yield i\n        i += 1',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(1) latency per generated element',
        space: 'O(1) memory (only stores stack frame of current execution state)',
      },
      commonMistakeOrTrap: {
        mistake: 'Trying to index a generator directly like a list (`gen[0]`) or checking its length (`len(gen)`).',
        fix: 'Generators have no index or length because elements do not exist until evaluated; use `next(gen)` or iterate with a loop.',
        interviewTrap:
          'Question: "Can you send data back into a running generator?" Answer: Yes! Generators have a `.send(val)` method, turning them into coroutines that can receive data at the yield expression: `x = yield value`.',
      },
      examCheatsheet: [
        '`next(gen)` resumes execution until the next `yield` statement',
        'When a generator terminates, it automatically raises `StopIteration`',
        'Calling a generator function returns a generator object; code does NOT run until the first `next()`',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Execution Freeze & Resume Flow of `yield`',
      caption:
        'Calling `next()` resumes execution; reaching `yield` freezes local variables and yields control back to caller.',
      visualKey: 'py-generators-yield-viz',
      details: {
        comparison: {
          headers: ['Feature', 'Regular Function (`return`)', 'Generator Function (`yield`)'],
          rows: [
            ['State Persistence', 'Destroyed after execution', 'Frozen in memory frame between calls'],
            ['Memory Footprint', 'Allocates entire return list O(N)', 'Strictly O(1) constant memory'],
            ['Evaluation Mode', 'Eager (computes all results now)', 'Lazy (computes 1 item only when asked)'],
          ],
        },
      },
    },
    animation: {
      type: 'py-generators-interactive',
      title: 'Generator Execution Freeze & Resume Animator',
      description:
        'Step through yield statements pausing and resuming function stack execution.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Infinite Fibonacci Generator in Python',
      language: 'python',
      code: `def fibonacci_stream():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Consume first 5 numbers on demand
fib = fibonacci_stream()
first_5 = [next(fib) for _ in range(5)]
print("First 5 Fibonacci numbers:", first_5)
print("Next number on-demand:   ", next(fib))`,
      input: 'Request 5 numbers from infinite generator',
      output: 'First 5 Fibonacci numbers: [0, 1, 1, 2, 3] | Next number on-demand: 5',
      explanation:
        'The generator generates an infinite series without running out of memory because each number is produced only on-demand.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What exception is raised when a generator runs out of elements?',
        options: ['IndexError', 'StopIteration', 'GeneratorExit', 'ValueError'],
        correctIndex: 1,
        explanation: 'The iterator protocol signals completion by raising `StopIteration`, which `for` loops catch and handle cleanly.',
      },
      {
        id: 'q2',
        question: 'What happens when you call a generator function `def my_gen(): yield 1` without calling `next()`?',
        options: [
          'The function executes completely and prints 1',
          'It returns a generator object without executing any function body code yet',
          'It throws a SyntaxError',
          'It allocates a list of length 1',
        ],
        correctIndex: 1,
        explanation: 'Calling a generator function returns a suspended generator object; execution only starts upon calling `next()`.',
      },
      {
        id: 'q3',
        question: 'What is the memory complexity of streaming 10 million rows using a generator?',
        options: ['O(N) (10 million rows in RAM)', 'O(1) constant memory', 'O(log N)', 'O(N²)'],
        correctIndex: 1,
        explanation: 'Because rows are yielded one-at-a-time and discarded after processing, memory remains strictly O(1).',
      },
    ],
  },
  {
    id: 'py-oop-dunder',
    subject: 'python',
    category: 'OOP',
    title: 'OOP, Dunder Methods & Magic Functions',
    subtitle: 'Data Model Hooks: Operator Overloading and Object Emulation',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['OOP', 'Dunder', '__str__', '__repr__', '__len__', '__getitem__'],
    quickRecall: {
      oneLiner:
        'Dunder (Double Underscore) methods hook user-defined classes into Python syntax (e.g. `+` calls `__add__`, `len()` calls `__len__`).',
      simpleAnalogy:
        'Universal adapter analogy: Python\'s built-in operators (like `+`, `len()`, `[]`) are standardized wall sockets. Defining `__add__` or `__len__` on your custom class gives it the exact matching plug, allowing Python to treat your custom class like a native language type.',
      whenToUse:
        'Building expressive domain objects, custom data structures, ORMs, and mathematical vector classes.',
      whyItMatters:
        'Allows your custom classes to behave naturally like native Python types with idiomatic syntax.',
      keyPoints: [
        '`__init__`: Constructor initializer (runs after `__new__` allocates memory).',
        '`__str__` vs `__repr__`: `__str__` is for human-readable output (`print(obj)`); `__repr__` is unambiguous developer representation (`eval(repr(obj)) == obj`).',
        'Sequence emulation: `__len__` enables `len(obj)`; `__getitem__` enables indexing `obj[i]` and iteration `for x in obj`.',
        'Arithmetic overloading: `__add__` (`+`), `__sub__` (`-`), `__mul__` (`*`), `__eq__` (`==`).',
      ],
      formulaOrSyntax: {
        label: 'Core Dunder Methods Pattern',
        codeOrLatex: 'class Vector:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def __add__(self, other): return Vector(self.x + other.x, self.y + other.y)\n    def __repr__(self): return f"Vector({self.x}, {self.y})"',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(1) method dispatch via class dictionary lookup',
        space: 'O(1) per instance (or optimized with `__slots__`)',
      },
      commonMistakeOrTrap: {
        mistake: 'Implementing `__str__` without implementing `__repr__`.',
        fix: 'If you only implement `__str__`, inspecting the object in lists or the REPL displays generic `<__main__.Obj at 0x7f>`. If you implement `__repr__`, it serves as the fallback for `__str__` too!',
        interviewTrap:
          'Question: "What is the difference between `__new__` and `__init__`?" Answer: `__new__` is the actual creator that allocates memory and returns a new instance; `__init__` merely initializes that instance with attributes.',
      },
      examCheatsheet: [
        'If `__str__` is not defined, Python falls back to `__repr__`',
        '`__slots__ = (\'x\', \'y\')` eliminates `__dict__` per instance, slashing memory usage by 40-50%',
        'Implementing `__getitem__` automatically gives your class basic iteration support',
      ],
    },
    visual: {
      type: 'architecture',
      title: 'Python Operator to Dunder Method Dispatch Mapping',
      caption:
        'Every high-level Python operator maps directly to a specific dunder method on the object class.',
      visualKey: 'py-oop-dunder-viz',
      details: {
        comparison: {
          headers: ['Operator / Function', 'Dunder Hook', 'Purpose'],
          rows: [
            ['`print(obj)`, `str(obj)`', '`__str__(self)`', 'User-facing readable string representation'],
            ['`repr(obj)`, Interactive REPL', '`__repr__(self)`', 'Unambiguous developer debug string'],
            ['`len(obj)`', '`__len__(self)`', 'Returns positive integer length'],
            ['`obj[key]`', '`__getitem__(self, key)`', 'Dictionary or sequence bracket indexing'],
            ['`a + b`', '`__add__(self, other)`', 'Binary addition operator overloading'],
          ],
        },
      },
    },
    animation: {
      type: 'py-dunder-dispatch-interactive',
      title: 'Operator Overloading Dispatch Simulator',
      description:
        'Step through binary addition dispatching to the custom class __add__ method.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Custom 2D Vector with Operator Overloading',
      language: 'python',
      code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        # Overload the + operator
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(4, 5)
v3 = v1 + v2 # Calls v1.__add__(v2)
print("Result of v1 + v2:", v3)`,
      input: 'v1 = Vector(2, 3), v2 = Vector(4, 5)',
      output: 'Result of v1 + v2: Vector(6, 8)',
      explanation:
        'The + operator invokes `__add__`, creating a new Vector instance with summed components.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which method should you implement to make custom objects printable in interactive console inspections and lists?',
        options: ['__str__', '__repr__', '__show__', '__display__'],
        correctIndex: 1,
        explanation: '`__repr__` is used when objects appear inside containers (lists, dicts) or in interactive REPL outputs.',
      },
      {
        id: 'q2',
        question: 'What method is called when evaluating `len(my_object)`?',
        options: ['__size__', '__count__', '__len__', '__length__'],
        correctIndex: 2,
        explanation: 'The built-in function `len()` delegates directly to the object\'s `__len__()` method.',
      },
      {
        id: 'q3',
        question: 'What is the purpose of adding `__slots__` to a Python class?',
        options: [
          'It enables multi-inheritance',
          'It replaces the dynamic `__dict__` dictionary with a fixed array, significantly reducing memory per instance',
          'It encrypts private variables',
          'It makes the class abstract',
        ],
        correctIndex: 1,
        explanation: '`__slots__` prevents creating dynamic `__dict__` attribute tables, saving up to 50% memory on millions of instances.',
      },
    ],
  },
  {
    id: 'py-decorators-closures',
    subject: 'python',
    category: 'Functions and Scope',
    title: 'Decorators, Closures & `@wraps`',
    subtitle: 'Higher-Order Functions and Metaprogramming',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['Decorators', 'Closures', 'functools.wraps', 'First-Class Functions', 'LEGB'],
    quickRecall: {
      oneLiner:
        'A decorator is a higher-order function that takes a function as input, wraps extra functionality around it, and returns the modified function.',
      simpleAnalogy:
        'Gift wrap analogy: You have a book (the function). A decorator is festive wrapping paper with a ribbon placed around the book. The book inside remains unchanged, but anyone receiving it experiences the gift wrap first before opening the book.',
      whenToUse:
        'Cross-cutting concerns: logging, timing/profiling, authentication checks, caching (memoization with `@lru_cache`), rate limiting.',
      whyItMatters:
        'Eliminates duplicate boilerplate code by cleanly separating business logic from auxiliary infrastructure concerns.',
      keyPoints: [
        'First-Class Functions: Functions in Python can be passed as arguments, assigned to variables, and returned from other functions.',
        'Closure: An inner function that remembers and accesses variables from its enclosing lexical scope even after the outer function has returned.',
        'Syntactic Sugar: `@my_decorator` placed above `def foo()` is strictly identical to `foo = my_decorator(foo)`.',
        '`functools.wraps`: Mandatory inside decorators to preserve the original function\'s `__name__` and `__doc__` docstring.',
      ],
      formulaOrSyntax: {
        label: 'Standard Decorator Pattern',
        codeOrLatex: 'from functools import wraps\ndef my_decorator(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        # Pre-execution logic\n        res = func(*args, **kwargs)\n        # Post-execution logic\n        return res\n    return wrapper',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(1) wrapping overhead at module import time; wrapper latency at runtime',
        space: 'O(1) memory per closure frame',
      },
      commonMistakeOrTrap: {
        mistake: 'Writing a custom decorator without using `@functools.wraps(func)`.',
        fix: 'Without `@wraps`, the decorated function loses its identity: `func.__name__` becomes "wrapper" and docstrings are erased, breaking debuggers and auto-documentation tools.',
        interviewTrap:
          'Question: "How do you create a decorator that accepts arguments like `@repeat(num_times=3)`?" Answer: You need three nested functions! The outermost function accepts the decorator arguments and returns the actual decorator, which returns the wrapper.',
      },
      examCheatsheet: [
        '`@dec` is syntax sugar for `func = dec(func)`',
        'Always use `from functools import wraps` and `@wraps(func)` on the wrapper',
        'Decorators execute at function DEFINITION time (when module imports), not at call time',
      ],
    },
    visual: {
      type: 'diagram',
      title: 'Closure Scoping & Decorator Wrapper Architecture',
      caption:
        'The outer decorator returns a wrapper closure containing pre-hook, original function invocation, and post-hook.',
      visualKey: 'py-decorators-closure-viz',
      details: {
        comparison: {
          headers: ['Step', 'Action', 'Scope Access'],
          rows: [
            ['1. Definition', 'Decorator wraps function at import time', 'Outer decorator scope'],
            ['2. Pre-hook', 'Runs authentication, logging, or timing start', 'Wrapper closure scope'],
            ['3. Invocation', 'Calls original wrapped `func(*args, **kwargs)`', 'Inner function scope'],
            ['4. Post-hook', 'Logs elapsed time or caches return value', 'Wrapper closure scope'],
          ],
        },
      },
    },
    animation: {
      type: 'py-decorators-interactive',
      title: 'Decorator Wrapping & Execution Step Tracer',
      description:
        'Step through a timer decorator capturing start time, invoking the function, and logging elapsed duration.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Timing Decorator with @wraps in Python',
      language: 'python',
      code: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - t0
        print(f"[{func.__name__}] Finished in {elapsed*1000:.2f}ms")
        return result
    return wrapper

@timer
def compute_sum(n):
    """Sums numbers from 0 to n."""
    return sum(range(n))

print("Sum result:", compute_sum(100000))
print("Preserved name:", compute_sum.__name__)`,
      input: 'Call compute_sum(100000)',
      output: '[compute_sum] Finished in 1.84ms | Sum result: 4999950000 | Preserved name: compute_sum',
      explanation:
        'The decorator transparently measures execution time while preserving the original function name via `@wraps`.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What does the `@functools.wraps(func)` decorator do inside a custom decorator?',
        options: [
          'It compiles the code to C',
          'It preserves the original function metadata (such as `__name__` and `__doc__`)',
          'It makes the function multi-threaded',
          'It caches all function outputs',
        ],
        correctIndex: 1,
        explanation: '`@wraps` copies metadata attributes like docstrings and function names from the original function onto the wrapper.',
      },
      {
        id: 'q2',
        question: 'When is a decorator executed?',
        options: [
          'Every time the decorated function is called',
          'At function definition time when the module is imported or loaded',
          'Only when an exception occurs',
          'When the program exits',
        ],
        correctIndex: 1,
        explanation: 'Decorators wrap the function immediately when the function definition is executed at module load time.',
      },
      {
        id: 'q3',
        question: 'What is the syntax `@my_dec` on `def foo(): pass` equivalent to?',
        options: ['foo = my_dec(foo)', 'my_dec = foo()', 'foo = my_dec()', 'my_dec(foo())'],
        correctIndex: 0,
        explanation: '`@my_dec` is exact syntactic sugar for passing the function object into the decorator and reassigning the name.',
      },
    ],
  },
  {
    id: 'py-exception-handling',
    subject: 'python',
    category: 'Exception Handling',
    title: 'Exception Handling: `try-except-else-finally`',
    subtitle: 'Robust Error Propagation and Clean Resource Management',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Exceptions', 'Try-Except', 'Else', 'Finally', 'EAFP vs LBYL'],
    quickRecall: {
      oneLiner:
        'Python uses EAFP ("Easier to Ask for Forgiveness than Permission") via `try-except-else-finally` to handle runtime failures cleanly.',
      simpleAnalogy:
        'Emergency landing gear analogy: `try` is attempting to land the plane. `except` is the backup emergency system deployed if gears jam. `else` is celebrating a smooth landing (only runs if NO emergency occurred). `finally` is the flight crew cleaning the plane afterwards (runs no matter what, even if an emergency occurred).',
      whenToUse:
        'I/O operations, network requests, parsing user input, database transactions, resource cleanups.',
      whyItMatters:
        'Uncaught exceptions crash production applications; proper handling isolates failures gracefully.',
      keyPoints: [
        '`try`: Code block that may raise an exception.',
        '`except ExceptionType`: Catches and handles specific error types. Never catch bare `except:`.',
        '`else`: Runs ONLY if the `try` block completed without raising any exception.',
        '`finally`: GUARANTEED to run under all conditions (even if an exception was raised, caught, or re-raised, or if a `return` was hit).',
        'EAFP ("Easier to Ask Forgiveness") is standard Python style over LBYL ("Look Before You Leap").',
      ],
      formulaOrSyntax: {
        label: 'Complete Exception Block Pattern',
        codeOrLatex: 'try:\n    f = open("data.txt")\nexcept FileNotFoundError as e:\n    print("Missing file:", e)\nelse:\n    content = f.read()\nfinally:\n    f.close() # Always executes',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'Zero cost when no exception occurs in Python 3.11+ ("zero-cost exceptions")',
        space: 'O(traceback depth) when exception is active',
      },
      commonMistakeOrTrap: {
        mistake: 'Using a bare `except:` or catching `BaseException`.',
        fix: 'Catching `BaseException` intercepts `KeyboardInterrupt` (Ctrl+C) and `SystemExit`, making your script unkillable; always catch specific errors or `except Exception:`.',
        interviewTrap:
          'Question: "If a `try` block returns 1, but the `finally` block returns 2, what does the function return?" Answer: 2! A return statement in `finally` overrides any preceding return or exception in `try` or `except`!',
      },
      examCheatsheet: [
        '`else` block runs only when NO exception was raised in `try`',
        '`finally` block ALWAYS runs, even after a `return` statement',
        'Custom exceptions should always inherit from built-in `Exception`',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Control Flow Diagram: try → except vs. else → finally',
      caption:
        'If an exception occurs, flow branches to `except`. If clean, flow branches to `else`. Both paths converge into `finally`.',
      visualKey: 'py-exceptions-flow-viz',
      details: {
        comparison: {
          headers: ['Block', 'Executes When?', 'Common Usage'],
          rows: [
            ['`try`', 'Always starts here', 'Code that could potentially fail'],
            ['`except`', 'Only when matching error is raised', 'Logging, fallback recovery, alerts'],
            ['`else`', 'Only when `try` succeeds with zero errors', 'Logic that depends on `try` succeeding'],
            ['`finally`', 'ALWAYS executes (100% guarantee)', 'Closing file handles, db connections, sockets'],
          ],
        },
      },
    },
    animation: {
      type: 'py-exceptions-interactive',
      title: 'Exception Branching Simulator',
      description:
        'Step through clean execution vs error-triggered branching through try-except-finally.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Complete try-except-else-finally in Python',
      language: 'python',
      code: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    else:
        print(f"Success: {a} / {b} = {result}")
        return result
    finally:
        print("Cleanup: Operation finished.")

print("Test 1:")
safe_divide(10, 2)
print("\\nTest 2:")
safe_divide(10, 0)`,
      input: 'Test 1: 10 / 2 | Test 2: 10 / 0',
      output: 'Success: 10 / 2 = 5.0 -> Cleanup finished | Error: Cannot divide by zero -> Cleanup finished',
      explanation:
        'Notice how `finally` runs in both cases, while `else` runs only when no exception was raised.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'When does the `else` block execute in a `try-except-else-finally` statement?',
        options: [
          'Whenever an exception is caught',
          'Only when the `try` block completes successfully without raising any exception',
          'Only after the `finally` block',
          'It never executes',
        ],
        correctIndex: 1,
        explanation: 'The `else` clause runs exclusively when the `try` block executes cleanly with zero errors.',
      },
      {
        id: 'q2',
        question: 'Why should you avoid using a bare `except:` without specifying an exception type?',
        options: [
          'It slows down execution by 10x',
          'It intercepts `KeyboardInterrupt` and `SystemExit`, preventing users from terminating the program with Ctrl+C',
          'It causes a SyntaxError in modern Python',
          'It disables the garbage collector',
        ],
        correctIndex: 1,
        explanation: 'A bare `except:` catches `BaseException`, silencing crucial system signals like Ctrl+C.',
      },
      {
        id: 'q3',
        question: 'What happens if both `try` and `finally` contain a `return` statement?',
        options: [
          'The `try` return value is returned',
          'The `finally` return value overrides and is returned',
          'A RuntimeError is raised',
          'Both values are returned as a tuple',
        ],
        correctIndex: 1,
        explanation: '`finally` always executes last and overwrites any pending return value or active exception.',
      },
    ],
  },
  {
    id: 'py-gil-concurrency',
    subject: 'python',
    category: 'Time and Space Complexity',
    title: 'The GIL, Threading & Multiprocessing',
    subtitle: 'CPython Global Interpreter Lock: CPU-Bound vs. I/O-Bound',
    difficulty: 'Intermediate',
    isInterviewFavorite: true,
    readTimeSeconds: 50,
    tags: ['GIL', 'Threading', 'Multiprocessing', 'Concurrency', 'Asyncio'],
    quickRecall: {
      oneLiner:
        'The Global Interpreter Lock (GIL) is a mutex that prevents multiple native threads from executing Python bytecode simultaneously in CPython.',
      simpleAnalogy:
        'Single kitchen microphone analogy: A restaurant kitchen has 8 chefs (CPU cores), but only 1 microphone (the GIL). Even if all 8 chefs are ready to cook, only the chef currently holding the microphone is allowed to issue cooking commands. To truly cook in parallel, you must open separate independent restaurant kitchens (Multiprocessing).',
      whenToUse:
        'Use `threading` or `asyncio` for I/O-bound tasks (network, disk, web scraping); use `multiprocessing` for CPU-bound tasks (number crunching, image processing).',
      whyItMatters:
        'Running 4 Python threads on a 4-core machine for CPU-bound math will NOT run 4x faster; it may run slower due to GIL lock contention!',
      keyPoints: [
        'GIL Purpose: Protects CPython memory management and reference counts (`ob_refcnt`) from race conditions.',
        'I/O-Bound: Threads release the GIL during network/disk wait times, enabling effective concurrent I/O.',
        'CPU-Bound: Threads fight for the GIL; use `multiprocessing` to spawn separate OS processes with separate GILs.',
        '`asyncio`: Single-threaded cooperative multitasking using event loop and `async/await`.',
        'Python 3.13+ introduces experimental free-threaded builds (`--disable-gil`).',
      ],
      formulaOrSyntax: {
        label: 'Concurrency Selection Rule',
        codeOrLatex: '# I/O Bound (Web, Disk):\\nfrom concurrent.futures import ThreadPoolExecutor\\n# CPU Bound (Math, ML):\\nfrom concurrent.futures import ProcessPoolExecutor',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'Threading: O(1) GIL switch overhead | Multiprocessing: O(process creation + IPC serialization)',
        space: 'Processes do not share memory (unless using shared memory IPC)',
      },
      commonMistakeOrTrap: {
        mistake: 'Using Python `threading` to speed up CPU-heavy mathematical computations across multiple cores.',
        fix: 'Use `multiprocessing` or C-extensions like NumPy (which release the GIL during vector computations).',
        interviewTrap:
          'Question: "Does Python threading provide any benefit if the GIL exists?" Answer: Yes! For I/O-bound operations (downloading 50 URLs), threads spend 99% of their time waiting on sockets where the GIL is released, giving massive speedups.',
      },
      examCheatsheet: [
        'CPU-bound tasks -> use `multiprocessing`',
        'I/O-bound tasks -> use `threading` or `asyncio`',
        'NumPy operations release the GIL during heavy C-level array loops',
      ],
    },
    visual: {
      type: 'architecture',
      title: 'CPython GIL vs Multiprocessing Architecture',
      caption:
        'Threading shares 1 process and 1 GIL across cores. Multiprocessing spawns separate processes, each with its own GIL and memory space.',
      visualKey: 'py-gil-concurrency-viz',
      details: {
        comparison: {
          headers: ['Model', 'Best For', 'Memory Sharing', 'Bypasses GIL?'],
          rows: [
            ['`threading`', 'I/O-bound (HTTP requests, files)', 'Shared memory space', 'No (Limited by 1 core for bytecode)'],
            ['`multiprocessing`', 'CPU-bound (Matrix math, compression)', 'Isolated memory (IPC / pickling)', 'Yes (1 process per CPU core)'],
            ['`asyncio`', 'High-concurrency I/O (10,000 sockets)', 'Single thread event loop', 'No (Single thread cooperative)'],
          ],
        },
      },
    },
    animation: {
      type: 'py-gil-interactive',
      title: 'GIL Mutex Lock & Thread Contention Simulator',
      description:
        'Step through multiple threads competing for the single GIL execution lock.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'ThreadPool vs ProcessPool in Python',
      language: 'python',
      code: `from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import time

def io_task(url_id):
    time.sleep(0.1) # Simulate network wait (GIL is released!)
    return f"URL {url_id} fetched"

# Concurrently fetch 4 URLs in ~0.1s total (not 0.4s!)
with ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(io_task, range(4)))

print("Fetched:", results[0])
print(f"Total results: {len(results)}")`,
      input: 'Fetch 4 mock URLs concurrently with ThreadPool',
      output: 'Fetched: URL 0 fetched | Total results: 4 (Finished in 0.1s instead of 0.4s)',
      explanation:
        'During I/O sleep, the GIL is released, allowing all 4 threads to wait on the network simultaneously.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Why does Python have a Global Interpreter Lock (GIL) in CPython?',
        options: [
          'To prevent memory allocation',
          'To protect CPython internal memory and reference count tracking from thread race conditions',
          'To force developers to write clean code',
          'To make Python slower than C',
        ],
        correctIndex: 1,
        explanation: 'The GIL was introduced to simplify CPython thread-safety by preventing race conditions on object reference counters.',
      },
      {
        id: 'q2',
        question: 'Which concurrency model is optimal for calculating millions of prime numbers across an 8-core CPU in Python?',
        options: ['`threading`', '`asyncio`', '`multiprocessing`', 'Standard generator'],
        correctIndex: 2,
        explanation: 'CPU-bound workloads require `multiprocessing` to run true parallel computation on all 8 cores without GIL restrictions.',
      },
      {
        id: 'q3',
        question: 'Do external C libraries like NumPy obey the Python GIL during heavy calculations?',
        options: [
          'Yes, NumPy is locked to 1 core always',
          'No, NumPy releases the GIL during compiled C/Fortran array computations, enabling multi-core parallelism',
          'NumPy only runs on GPUs',
          'NumPy does not use C',
        ],
        correctIndex: 1,
        explanation: 'NumPy drops the GIL before entering C-level matrix operations, allowing multi-threaded BLAS libraries to run across all cores.',
      },
    ],
  },
  {
    id: 'py-default-mutable-arguments',
    subject: 'python',
    category: 'Common Python Interview Traps',
    title: 'Default Mutable Arguments Trap',
    subtitle: 'Function Definition Binding vs. Runtime Invocation',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Pitfall', 'Default Arguments', 'Mutability', 'Binding Time'],
    quickRecall: {
      oneLiner:
        'Default parameter values in Python are evaluated once at function definition time, NOT each time the function is called.',
      simpleAnalogy:
        'Shared shopping basket analogy: If a store clerk hands out a communal shopping basket when you enter without one, whatever you put in remains in that same basket for the next customer who enters without one. Solution: Hand out a brand new basket (`lst = None -> lst = []`) every single time!',
      whenToUse:
        'Every time you define a function taking an optional list, dict, set, or custom object parameter.',
      whyItMatters:
        'One of the top 3 most common Python bugs and interview questions in software engineering.',
      keyPoints: [
        'Bug trigger: `def append_to(val, lst=[])`. The list `[]` is created ONCE when the module loads.',
        'Repeated calls without providing `lst` reuse the exact same list instance in memory.',
        'Standard Idiomatic Fix: Use `None` as the default sentinel value: `def append_to(val, lst=None): if lst is None: lst = []`.',
        'Immutable defaults (integers, strings, None) are completely safe.',
      ],
      formulaOrSyntax: {
        label: 'The Sentinel None Idiom',
        codeOrLatex: '# WRONG (Shared State Bug):\ndef add_item(item, box=[]):\n    box.append(item)\n    return box\n\n# RIGHT (Safe Idiom):\ndef add_item(item, box=None):\n    if box is None:\n        box = []\n    box.append(item)\n    return box',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(1) initialization check',
        space: 'O(1) memory',
      },
      commonMistakeOrTrap: {
        mistake: 'Using `def collect(data, cache={})` to cache results.',
        fix: 'While sometimes exploited as a hacky memoization trick, it creates unexpected global mutable state; use `@functools.lru_cache` instead.',
        interviewTrap:
          'Question: "Where is the default argument object stored?" Answer: Inside the function object\'s `__defaults__` tuple: `append_to.__defaults__`! You can inspect it directly to see the accumulated mutations.',
      },
      examCheatsheet: [
        'Default arguments are evaluated once at DEF time, not at CALL time',
        'Always use `arg=None` for optional mutable arguments',
        'Inspect defaults with `func.__defaults__`',
      ],
    },
    visual: {
      type: 'memory-layout',
      title: 'Persistent Shared Memory Buffer Across Multiple Invocations',
      caption:
        'Repeated calls without passing an argument point to the exact same list buffer in heap memory.',
      visualKey: 'py-mutable-default-viz',
      details: {
        comparison: {
          headers: ['Call', 'Code', 'Buggy Behavior (`lst=[]`)', 'Correct Behavior (`lst=None`)'],
          rows: [
            ['Call 1', '`append_to("a")`', '`["a"]`', '`["a"]`'],
            ['Call 2', '`append_to("b")`', '`["a", "b"]` (Accidental accumulation!)', '`["b"]` (Clean isolated list)'],
            ['Call 3', '`append_to("c")`', '`["a", "b", "c"]` (Bug propagates)', '`["c"]` (Clean isolated list)'],
          ],
        },
      },
    },
    animation: {
      type: 'py-mutable-default-interactive',
      title: 'Accumulated State vs Isolated Buffer Animator',
      description:
        'Step through repeated function invocations to watch accidental accumulation in shared memory.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Default Mutable Argument Bug & Fix in Python',
      language: 'python',
      code: `# 1. THE BUG:
def buggy_add(x, items=[]):
    items.append(x)
    return items

print("Buggy Call 1:", buggy_add(1)) # [1]
print("Buggy Call 2:", buggy_add(2)) # [1, 2] -> UNEXPECTED!

# 2. THE FIX:
def safe_add(x, items=None):
    if items is None:
        items = [] # Fresh list every call
    items.append(x)
    return items

print("Safe Call 1: ", safe_add(1))  # [1]
print("Safe Call 2: ", safe_add(2))  # [2] -> CORRECT!`,
      input: 'Call buggy_add(1) then buggy_add(2)',
      output: 'Buggy: [1, 2] | Safe: [2]',
      explanation:
        'The fix initializes a fresh list inside the function body each time `items` is None, guaranteeing clean state isolation.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'When is a default parameter value in Python evaluated?',
        options: [
          'Every time the function is called',
          'Once when the function definition is executed (at module import time)',
          'Only when the argument is omitted',
          'At compilation to bytecode',
        ],
        correctIndex: 1,
        explanation: 'Default expressions evaluate once when Python reads the `def` statement, binding the resulting object to the function definition.',
      },
      {
        id: 'q2',
        question: 'What is the idiomatic Python solution for optional list arguments?',
        options: [
          '`def f(x, lst=[])`',
          '`def f(x, lst=None): if lst is None: lst = []`',
          '`def f(x, lst=list())`',
          '`def f(x, lst=copy([]))`',
        ],
        correctIndex: 1,
        explanation: 'Setting default to `None` and allocating `lst = []` inside the function ensures a fresh list is created per invocation.',
      },
      {
        id: 'q3',
        question: 'Where can you inspect the default argument values stored on a function?',
        options: ['`func.__defaults__`', '`func.__args__`', '`func.__params__`', '`func.__scope__`'],
        correctIndex: 0,
        explanation: 'The function object stores its default values as a tuple in the `__defaults__` attribute.',
      },
    ],
  },
  {
    id: 'py-lambda-map-filter',
    subject: 'python',
    category: 'Functions and Scope',
    title: 'Lambda Functions, Map, Filter & Zip',
    subtitle: 'Functional Programming Idioms and Lazy Iterators',
    difficulty: 'Beginner',
    isInterviewFavorite: true,
    readTimeSeconds: 40,
    tags: ['Lambda', 'Map', 'Filter', 'Zip', 'Functional'],
    quickRecall: {
      oneLiner:
        'Anonymous inline functions defined with `lambda` combined with lazy iterators `map()` and `filter()` enable functional transformations.',
      simpleAnalogy:
        'Zipper analogy: `zip([1, 2], ["a", "b"])` works like a mechanical zipper on a jacket: it locks the teeth on the left track to the teeth on the right track pair-by-pair: `(1, "a")`, `(2, "b")`.',
      whenToUse:
        'Short disposable key functions for `sorted()`, `min()`, `max()`, and pairing sequences with `zip()`.',
      whyItMatters:
        '`zip(*matrix)` transposes a 2D matrix in one readable line; `map` and `filter` yield lazy iterators.',
      keyPoints: [
        'Lambda syntax: `lambda arguments: single_expression` (implicit return, cannot contain multi-line statements).',
        '`map(fn, iter)`: Applies function to every element; returns lazy iterator.',
        '`filter(pred, iter)`: Yields elements where `pred(x)` evaluates to True.',
        '`zip(iter1, iter2)`: Aggregates elements from each iterable into tuples, stopping at shortest iterable length.',
        '`enumerate(iter, start=0)`: Pairs each item with its zero-based index `(index, item)`.',
      ],
      formulaOrSyntax: {
        label: 'Functional Idiom Patterns',
        codeOrLatex: '# Sort pairs by second element:\nsorted_pairs = sorted(pairs, key=lambda x: x[1])\n# Pair two lists together:\npaired = list(zip([1, 2], ["a", "b"])) # [(1, "a"), (2, "b")]',
        isLatex: false,
        language: 'python',
      },
      complexity: {
        time: 'O(N) single-pass iteration',
        space: '`map`, `filter`, `zip` produce O(1) lazy iterators until materialized',
      },
      commonMistakeOrTrap: {
        mistake: 'Using `map` and `lambda` where a list comprehension is cleaner and more idiomatic.',
        fix: 'Pythonic PEP 8 preference: `[x*2 for x in nums]` is preferred over `list(map(lambda x: x*2, nums))`.',
        interviewTrap:
          'Question: "How do you transpose a 2D matrix in Python?" Answer: `list(zip(*matrix))`! The `*` unpacks rows as separate positional arguments into `zip`, pairing matching column elements together.',
      },
      examCheatsheet: [
        'Lambda expressions can only contain a single expression, not statements',
        '`zip()` stops at the shortest input; use `itertools.zip_longest()` to pad with None',
        'Use `enumerate()` instead of `range(len(lst))` to track loop indices',
      ],
    },
    visual: {
      type: 'flowchart',
      title: 'Zip Interlocking & Map Transform Pipeline',
      caption:
        'Zip interlocks corresponding indices from parallel arrays into tuple pairs.',
      visualKey: 'py-lambda-map-viz',
      details: {
        inputOutput: {
          input: 'names = ["Alice", "Bob"], scores = [95, 88]',
          output: 'list(zip(names, scores)) -> [("Alice", 95), ("Bob", 88)]',
        },
      },
    },
    animation: {
      type: 'py-zip-map-interactive',
      title: 'Zip & Enumerate Pair Matching Simulator',
      description:
        'Step through parallel array items locking together into indexed tuples.',
      stepsTotal: 4,
    },
    codeSnippet: {
      title: 'Lambda Sorting, Zip & Enumerate in Python',
      language: 'python',
      code: `students = [("Alice", 88), ("Bob", 95), ("Charlie", 78)]

# 1. Sort by score using lambda key
by_score = sorted(students, key=lambda s: s[1], reverse=True)
print("Top Student:   ", by_score[0]) # ('Bob', 95)

# 2. Transpose a 2x3 matrix in 1 line
matrix = [[1, 2, 3], [4, 5, 6]]
transposed = [list(col) for col in zip(*matrix)]
print("Transposed 3x2:", transposed)

# 3. Enumerate loop
for idx, (name, _) in enumerate(by_score):
    print(f"Rank {idx+1}: {name}")`,
      input: 'students = [("Alice", 88), ("Bob", 95), ("Charlie", 78)]',
      output: 'Top Student: (\'Bob\', 95) | Transposed: [[1, 4], [2, 5], [3, 6]] | Rank 1: Bob',
      explanation:
        'The lambda function extracts the score component `s[1]` for sorting, while `zip(*matrix)` transposes the 2D grid.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the output of `list(zip([1, 2, 3], ["a", "b"]))`?',
        options: ['[(1, "a"), (2, "b"), (3, None)]', '[(1, "a"), (2, "b")]', 'IndexError', '[(1, 2, 3), ("a", "b")]'],
        correctIndex: 1,
        explanation: 'Standard `zip()` truncates to the length of the shortest iterable.',
      },
      {
        id: 'q2',
        question: 'How do you transpose a 2D matrix `m = [[1, 2], [3, 4]]` in one idiomatic line?',
        options: ['list(map(m))', 'list(zip(*m))', 'm.transpose()', 'zip(m, m)'],
        correctIndex: 1,
        explanation: 'The `*m` unpacks rows into `zip()`, which groups corresponding column elements into new tuples.',
      },
      {
        id: 'q3',
        question: 'What limitation does a Python `lambda` have compared to standard functions defined with `def`?',
        options: [
          'It cannot take parameters',
          'It is restricted to a single expression and cannot contain statements or assignments',
          'It cannot return values',
          'It cannot be passed to other functions',
        ],
        correctIndex: 1,
        explanation: 'Python lambdas can only contain a single expression whose evaluated value is implicitly returned.',
      },
    ],
  },
];
