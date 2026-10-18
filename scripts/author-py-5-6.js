const path = require('path');
const { getExistingPyLessons } = require('./extract-landmarks');
const { writePythonModuleFile } = require('./writer');

// ==========================================
// Python Module 5: Comprehensions and Iteration
// ==========================================
const m5 = getExistingPyLessons(5);
const m5Lessons = { ...m5.lessons };

m5Lessons['py-comp-dict-set'] = {
  id: 'py-comp-dict-set',
  moduleId: 'python-module-5',
  title: 'Dictionary and Set Comprehensions',
  subtitle: '{k: v for ...} and {expr for ...} Patterns for Instant Collection Building',
  order: 2,
  readTimeMinutes: 18,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Construct dictionaries concisely using {key_expr: value_expr for item in iterable if condition}.',
    'Construct sets with unique elements using {expr for item in iterable if condition}.',
    'Invert dictionaries (swap keys and values) safely in a single line.',
    'Filter, transform, and aggregate structured key-value maps with comprehensions.'
  ],
  prerequisites: ['Python dictionaries, sets, and basic list comprehensions.'],
  analogy: {
    title: 'The Automated Sorting Carousel',
    text: 'A list comprehension is an assembly conveyor dropping boxes into a straight train car. A set comprehension is a magnetic sorter that drops items into a basket while vaporizing identical duplicates on contact. A dictionary comprehension is a label printer that prints a barcode ticket (key) and affixes it to the package (value) in a single swift motion.',
    metaphor: '{k: v for ...} builds hash tables; {x for ...} builds unique hash sets directly.'
  },
  problemSolved: {
    title: 'Declarative Collection Construction and Inversion',
    description: 'Populating dictionaries or sets iteratively with for loops requires manual instantiation, explicit insertions (.add or [k] = v), and verbose branching. Comprehensions make collection construction declarative, faster, and more readable.',
    keyPoints: [
      'Dict comprehensions require a colon separating key and value expressions: `{k: v for ...}`.',
      'Set comprehensions use curly braces without colons: `{x for ...}`.',
      'Inverting a dictionary `{v: k for k, v in d.items()}` requires unique values to avoid key collisions.'
    ]
  },
  intuition: {
    overview: 'Under the hood, CPython optimizes set and dict comprehensions using dedicated bytecode opcodes (MAP_ADD and SET_ADD), avoiding repeated Python method lookups.',
    steps: [
      { step: 1, title: 'Iterate', description: 'Evaluates the iterable expression sequentially.' },
      { step: 2, title: 'Filter', description: 'Checks optional `if` condition; skips item if condition evaluates falsy.' },
      { step: 3, title: 'Insert', description: 'Computes key/value or set element and executes low-level MAP_ADD or SET_ADD.' }
    ]
  },
  codeExample: {
    title: 'Dictionary Inversion and Filtered Set Creation',
    code: `# Dictionary comprehension: invert mapping
code_to_country = {"US": "United States", "FR": "France", "JP": "Japan"}
country_to_code = {country: code for code, country in code_to_country.items()}
print("Inverted dict:", country_to_code)

# Set comprehension: unique word lengths
words = ["python", "data", "science", "code", "ai", "machine"]
word_lengths = {len(w) for w in words if len(w) > 3}
print("Unique word lengths > 3:", word_lengths)`,
    explanation: 'Demonstrates inverting a dictionary by swapping key and value, and building a set of distinct lengths.'
  },
  runnableCode: {
    code: `prices_usd = {"laptop": 1200, "mouse": 25, "keyboard": 75, "monitor": 300}
EUR_RATE = 0.92

# Convert and filter items > 50 EUR
prices_eur = {
    item: round(usd * EUR_RATE, 2)
    for item, usd in prices_usd.items()
    if usd * EUR_RATE > 50
}
print("Premium EUR items:", prices_eur)`,
    expectedOutput: `Premium EUR items: {'laptop': 1104.0, 'keyboard': 69.0, 'monitor': 276.0}`
  },
  lineByLine: [
    { line: 1, code: 'prices_usd = {"laptop": 1200, "mouse": 25, "keyboard": 75, "monitor": 300}', explanation: 'Initializes source catalog dictionary.' },
    { line: 4, code: 'prices_eur = {', explanation: 'Starts dictionary comprehension.' },
    { line: 5, code: '    item: round(usd * EUR_RATE, 2)', explanation: 'Key expression is item name, value is converted and rounded EUR price.' },
    { line: 6, code: '    for item, usd in prices_usd.items()', explanation: 'Iterates key-value tuples from source dict.' },
    { line: 7, code: '    if usd * EUR_RATE > 50', explanation: 'Filters out items below 50 EUR threshold.' }
  ],
  commonMistakes: [
    {
      mistake: 'Inverting a dictionary where values are not unique: `{v: k for k, v in d.items()}`.',
      whyWrong: 'Duplicate values cause later keys to overwrite earlier keys silently, losing data.',
      howToFix: 'If values are duplicated, group them into a dict of lists: `defaultdict(list)`.'
    },
    {
      mistake: 'Using `()` expecting a set or dict comprehension.',
      whyWrong: '`()` creates a generator expression, not a set or tuple comprehension.',
      howToFix: 'Use `{}` for sets and dicts.'
    }
  ],
  realWorldApplications: [
    { title: 'Configuration Normalization', description: 'Converting environment variable strings into typed configurations.' },
    { title: 'Graph Inversion', description: 'Inverting adjacency lists to compute reverse edge graphs.' }
  ],
  practiceQuestions: [
    { question: 'What distinguishes the syntax of a set comprehension from a dict comprehension?', hint: 'Presence of a colon.', answer: 'Dict comprehensions have a colon separating key and value (`{k: v for ...}`), while set comprehensions do not (`{x for ...}`).' },
    { question: 'Can keys in a dict comprehension be mutable lists?', hint: 'Recall hashability.', answer: 'No, dictionary keys must be hashable. Attempting to use a list raises TypeError: unhashable type: \'list\'.' },
    { question: 'What happens if a set comprehension generates duplicate values?', hint: 'Set uniqueness.', answer: 'Duplicates are silently ignored; only unique values remain in the resulting set.' }
  ],
  quiz: [
    {
      question: 'What is the result of `{x % 3 for x in range(10)}`?',
      options: ['{0, 1, 2}', '[0, 1, 2]', '{0, 1, 2, 0, 1, 2, 0, 1, 2, 0}', '{1, 2, 3}'],
      correctAnswer: 0,
      explanation: 'Values of x % 3 are 0, 1, or 2. A set deduplicates them to `{0, 1, 2}`.'
    },
    {
      question: 'Which syntax properly creates a dictionary mapping numbers 1..4 to their squares?',
      options: ['{x: x**2 for x in range(1, 5)}', '[x: x**2 for x in range(1, 5)]', '{x**2 for x in range(1, 5)}', 'dict(x, x**2 for x in range(1, 5))'],
      correctAnswer: 0,
      explanation: '`{x: x**2 for x in range(1, 5)}` uses the `{k: v for ...}` dict comprehension syntax.'
    },
    {
      question: 'Why does CPython execute comprehensions faster than equivalent for-loops with .append() or .add()?',
      options: ['They run on multiple CPU cores', 'They use dedicated bytecode instructions (MAP_ADD, SET_ADD) that bypass Python method lookups', 'They are compiled to C DLLs', 'They disable garbage collection'],
      correctAnswer: 1,
      explanation: 'CPython uses specialized bytecode instructions that avoid the overhead of looking up the attribute/method on each iteration.'
    }
  ],
  codingChallenge: {
    title: 'Group Words by First Character',
    difficulty: 'Intermediate',
    description: 'Write a function `group_by_initial(words: list[str]) -> dict[str, set[str]]` that takes a list of words and returns a dictionary where each key is a lowercase initial letter, and each value is a set of lowercase words starting with that letter.',
    starterCode: `def group_by_initial(words: list[str]) -> dict[str, set[str]]:
    # Write your solution here
    pass`,
    hints: [
      'Get unique lowercase initial letters using a set comprehension: {w[0].lower() for w in words if w}.',
      'For each initial, collect matching words into a set comprehension.'
    ],
    solution: `def group_by_initial(words: list[str]) -> dict[str, set[str]]:
    clean = [w.lower() for w in words if w]
    initials = {w[0] for w in clean}
    return {
        init: {w for w in clean if w.startswith(init)}
        for init in sorted(initials)
    }`,
    testCases: [
      { input: '["Apple", "apricot", "Banana", "avocado", "Berry"]', expectedOutput: '{"a": {"apple", "apricot", "avocado"}, "b": {"banana", "berry"}}' }
    ]
  }
};

m5Lessons['py-comp-generators'] = {
  id: 'py-comp-generators',
  moduleId: 'python-module-5',
  title: 'Generator Expressions',
  subtitle: 'Lazy Evaluation, Memory Efficiency vs List Comprehensions, and Streaming',
  order: 3,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Define generator expressions with `(expr for item in iterable)`.',
    'Understand lazy evaluation: producing values one-at-a-time on demand.',
    'Compare memory consumption: O(1) generator expressions vs O(N) list comprehensions using sys.getsizeof().',
    'Pass generator expressions directly into aggregators like sum(), min(), max(), and any().'
  ],
  prerequisites: ['List comprehensions and basic memory intuition.'],
  analogy: {
    title: 'The Reservoir vs The Water Tap',
    text: 'A list comprehension is like filling an Olympic-sized swimming pool before drinking: you must wait for all 10 million gallons to arrive, and your backyard (RAM) must be large enough to hold it. A generator expression is turning on a kitchen tap: it produces a single fresh glass of water whenever you open the valve, consuming zero storage in your backyard.',
    metaphor: 'Generators compute values lazily on demand rather than buffering all results in RAM.'
  },
  problemSolved: {
    title: 'Processing Gigabyte and Terabyte Datasets in Constant Memory',
    description: 'When processing large files or million-row databases, loading everything into a list causes Out-Of-Memory (OOM) fatal crashes. Generator expressions allow streaming arbitrary amounts of data with fixed O(1) auxiliary memory.',
    keyPoints: [
      'Generator expressions use round parentheses: `(x * 2 for x in seq)`.',
      'When passed as the sole argument to a function, outer parentheses can be omitted: `sum(x for x in seq)`.',
      'Generators are single-use iterators: once consumed, they cannot be restarted.'
    ]
  },
  intuition: {
    overview: 'A generator expression compiles to an anonymous generator object with a suspended frame state. It yields control back to the caller after producing each item.',
    steps: [
      { step: 1, title: 'Instantiation', description: 'Creates generator iterator object without executing loop body.' },
      { step: 2, title: 'Evaluation on next()', description: 'Executes until next value is produced and pauses.' },
      { step: 3, title: 'Exhaustion', description: 'Raises StopIteration when underlying sequence is exhausted.' }
    ]
  },
  codeExample: {
    title: 'Memory Comparison: List vs Generator',
    code: `import sys

# List comprehension: builds 1 million ints in memory
squares_list = [x ** 2 for x in range(1_000_000)]
list_bytes = sys.getsizeof(squares_list)

# Generator expression: lazy stream
squares_gen = (x ** 2 for x in range(1_000_000))
gen_bytes = sys.getsizeof(squares_gen)

print(f"List size: {list_bytes:,} bytes (~8.4 MB)")
print(f"Generator size: {gen_bytes:,} bytes (~200 bytes)")
print("Sum via generator:", sum(squares_gen))`,
    explanation: 'Demonstrates how a generator expression takes ~200 bytes of memory regardless of whether it processes 10 items or 10 billion items.'
  },
  runnableCode: {
    code: `nums = range(1, 6)
gen = (x * 10 for x in nums)

print("First item:", next(gen))
print("Second item:", next(gen))
print("Remaining items consumed via list:", list(gen))
print("Attempting to read again:", list(gen)) # Empty!`,
    expectedOutput: `First item: 10
Second item: 20
Remaining items consumed via list: [30, 40, 50]
Attempting to read again: []`
  },
  lineByLine: [
    { line: 2, code: 'gen = (x * 10 for x in nums)', explanation: 'Creates generator expression producing multiples of 10.' },
    { line: 4, code: 'print("First item:", next(gen))', explanation: 'Advances generator by 1 step, evaluating 1 * 10 = 10.' },
    { line: 5, code: 'print("Second item:", next(gen))', explanation: 'Advances generator by 1 step, evaluating 2 * 10 = 20.' },
    { line: 6, code: 'print("Remaining items consumed via list:", list(gen))', explanation: 'Consumes the remaining values [30, 40, 50].' },
    { line: 7, code: 'print("Attempting to read again:", list(gen))', explanation: 'Generator is exhausted; returns empty list.' }
  ],
  commonMistakes: [
    {
      mistake: 'Trying to reuse or rewind a generator expression after consumption.',
      whyWrong: 'Generators are one-way streams. Once exhausted, they remain empty.',
      howToFix: 'Create a new generator or convert to a list if multiple passes are required.'
    },
    {
      mistake: 'Using a list comprehension inside `sum([x for x in seq])` instead of a generator.',
      whyWrong: 'Allocates an unnecessary temporary list in memory before summing.',
      howToFix: 'Omit brackets: `sum(x for x in seq)` uses an efficient generator directly.'
    }
  ],
  realWorldApplications: [
    { title: 'Log Streaming', description: 'Searching terabytes of web server logs without loading entire files into memory.' },
    { title: 'Database Result Streaming', description: 'Streaming millions of rows from PostgreSQL cursors without memory spikes.' }
  ],
  practiceQuestions: [
    { question: 'What is the syntax for creating a generator expression?', hint: 'Parentheses vs brackets.', answer: 'Parentheses: `(expr for item in iterable if condition)`.' },
    { question: 'Why does `sys.getsizeof(gen)` remain constant regardless of sequence length?', hint: 'Lazy evaluation.', answer: 'Because the generator only stores the current frame state and computation code, not the generated data elements.' },
    { question: 'What exception is raised when calling `next()` on an exhausted generator?', hint: 'Iteration stop signal.', answer: '`StopIteration`.' }
  ],
  quiz: [
    {
      question: 'What type is `x = (i for i in range(5))`?',
      options: ['tuple', 'generator', 'list', 'iterator class'],
      correctAnswer: 1,
      explanation: 'Parentheses around a comprehension create a generator object (not a tuple).'
    },
    {
      question: 'How do you create a tuple using comprehension-like syntax?',
      options: ['(x for x in range(5))', 'tuple(x for x in range(5))', 'tuple[x for x in range(5)]', '((x for x in range(5)))'],
      correctAnswer: 1,
      explanation: '`tuple()` constructor wrapping a generator expression: `tuple(x for x in range(5))`.'
    },
    {
      question: 'When should you prefer a list comprehension over a generator expression?',
      options: ['When working with infinite streams', 'When you need to index, slice, measure len(), or iterate multiple times', 'When memory is extremely constrained', 'Never'],
      correctAnswer: 1,
      explanation: 'Lists allow indexing, slicing, `len()`, and multiple iterations, which generators do not support.'
    }
  ],
  codingChallenge: {
    title: 'Streaming Sum of Large Squares',
    difficulty: 'Intermediate',
    description: 'Write a function `sum_even_squares(start: int, end: int) -> int` that computes the sum of squares of all even integers in the range `[start, end]` (inclusive) using a generator expression inside `sum()`, without creating any intermediate lists.',
    starterCode: `def sum_even_squares(start: int, end: int) -> int:
    # Write your solution here
    pass`,
    hints: [
      'Use range(start, end + 1).',
      'Pass generator (x**2 for x in ... if x % 2 == 0) directly into sum().'
    ],
    solution: `def sum_even_squares(start: int, end: int) -> int:
    return sum(x ** 2 for x in range(start, end + 1) if x % 2 == 0)`,
    testCases: [
      { input: '1, 10', expectedOutput: '220' },
      { input: '1, 4', expectedOutput: '20' }
    ]
  }
};

m5Lessons['py-comp-iterables'] = {
  id: 'py-comp-iterables',
  moduleId: 'python-module-5',
  title: 'Iterables and Iterators Protocol',
  subtitle: '__iter__ and __next__, iter() and next(), and Custom Iterator Classes',
  order: 4,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'execution-trace',
  objectives: [
    'Understand the Python Iterator Protocol: `__iter__()` and `__next__()`.',
    'Distinguish between an Iterable (can produce an iterator) and an Iterator (holds state and produces values).',
    'Use built-in iter() with sentinel values for streaming loops.',
    'Build robust custom iterator classes from scratch with graceful StopIteration termination.'
  ],
  prerequisites: ['Python classes basics and while/for loops.'],
  analogy: {
    title: 'The Book and the Bookmarker',
    text: 'An Iterable is a book on a shelf: it contains content and you can read it anytime, but the book itself doesn\'t know what page you are currently on. An Iterator is a reader with a physical bookmark: they place the bookmark on page 1, advance it one page at a time (next), remember exactly where they stopped, and announce "Finished!" (StopIteration) when they reach the back cover.',
    metaphor: 'Iterable implements __iter__; Iterator implements __iter__ AND __next__.'
  },
  problemSolved: {
    title: 'Demystifying How Python\'s `for` Loop Actually Works',
    description: 'Python doesn\'t use C-style index loops `for (int i=0; i<n; i++)`. Every `for` loop in Python uses the Iterator Protocol under the hood. Understanding this protocol unlocks custom data pipelines and streaming.',
    keyPoints: [
      '`for x in obj:` internally calls `it = iter(obj)` then calls `next(it)` repeatedly until `StopIteration`.',
      'An Iterable implements `__iter__()` returning an iterator.',
      'An Iterator implements both `__next__()` and `__iter__()` (returning `self`).'
    ]
  },
  intuition: {
    overview: 'The iterator protocol decouples data container storage from iteration traversal logic.',
    steps: [
      { step: 1, title: 'Obtain Iterator', description: 'iter(iterable) invokes iterable.__iter__() returning an iterator.' },
      { step: 2, title: 'Fetch Next Value', description: 'next(iterator) invokes iterator.__next__() returning the current item and advancing internal pointer.' },
      { step: 3, title: 'Handle Termination', description: 'When exhausted, __next__() raises StopIteration, which the for loop catches silently.' }
    ]
  },
  codeExample: {
    title: 'Building a Custom Range Iterator Class',
    code: `class Countdown:
    """Custom iterator counting down from start to 1."""
    def __init__(self, start: int):
        self.current = start
        
    def __iter__(self):
        return self  # Iterators return themselves
        
    def __next__(self) -> int:
        if self.current <= 0:
            raise StopIteration
        val = self.current
        self.current -= 1
        return val

# Works seamlessly with for loops
for num in Countdown(3):
    print(f"T-minus: {num}")`,
    explanation: 'Demonstrates implementing `__iter__` returning self and `__next__` raising StopIteration.'
  },
  runnableCode: {
    code: `# Deconstructing a for loop into raw iter() and next()
items = ["alpha", "beta", "gamma"]
iterator = iter(items)

while True:
    try:
        val = next(iterator)
        print("Iterated:", val)
    except StopIteration:
        print("Loop terminated cleanly!")
        break`,
    expectedOutput: `Iterated: alpha
Iterated: beta
Iterated: gamma
Loop terminated cleanly!`
  },
  lineByLine: [
    { line: 2, code: 'items = ["alpha", "beta", "gamma"]', explanation: 'Standard list (an Iterable).' },
    { line: 3, code: 'iterator = iter(items)', explanation: 'Calls items.__iter__() getting list_iterator object.' },
    { line: 7, code: 'val = next(iterator)', explanation: 'Fetches next item from iterator.' },
    { line: 9, code: 'except StopIteration:', explanation: 'Catches StopIteration when sequence ends.' }
  ],
  commonMistakes: [
    {
      mistake: 'Forgetting to implement `__iter__` on a custom iterator class.',
      whyWrong: 'Without `__iter__`, Python does not recognize the class as an Iterable, breaking `for x in my_iterator`.',
      howToFix: 'Always include `def __iter__(self): return self` on iterator classes.'
    },
    {
      mistake: 'Assuming an Iterator can be iterated multiple times in separate loops.',
      whyWrong: 'Once an iterator raises StopIteration, its internal pointer is at the end; subsequent calls immediately raise StopIteration.',
      howToFix: 'Separate the Iterable container from the Iterator, or reset state in `__iter__`.'
    }
  ],
  realWorldApplications: [
    { title: 'Custom Database Pagers', description: 'Paginating through database API records seamlessly in a single for loop.' },
    { title: 'Circular Buffers', description: 'Iterators cycling continuously through round-robin task workers.' }
  ],
  practiceQuestions: [
    { question: 'What two methods make up the Python Iterator Protocol?', hint: 'Dunder methods on iterables and iterators.', answer: '`__iter__()` and `__next__()`.' },
    { question: 'Is a Python list an Iterator?', hint: 'Does list have a __next__ method?', answer: 'No, a list is an Iterable, not an Iterator. It has `__iter__()` which creates an iterator, but does not have `__next__()`.' },
    { question: 'What built-in function takes a callable and a sentinel value to create an iterator?', hint: 'Two-argument form of...', answer: 'The two-argument form of `iter(callable, sentinel)`.' }
  ],
  quiz: [
    {
      question: 'What exception signals the completion of iteration in Python?',
      options: ['IndexError', 'StopIteration', 'EndLoopException', 'EOFError'],
      correctAnswer: 1,
      explanation: '`StopIteration` is the standard exception raised by `__next__()` to signal termination.'
    },
    {
      question: 'Which of the following implements the Iterator protocol?',
      options: ['An object with __iter__() returning an object with __next__()', 'An object with just __getitem__()', 'An object with a .loop() method', 'An object with __call__()'],
      correctAnswer: 0,
      explanation: 'The iterator protocol requires `__iter__()` and `__next__()`.'
    },
    {
      question: 'What does `iter(f.readline, "")` do when reading a file `f`?',
      options: ['Reads the whole file as a string', 'Returns an iterator that reads lines until an empty string "" (EOF) is encountered', 'Raises TypeError', 'Clears file content'],
      correctAnswer: 1,
      explanation: 'The 2-argument `iter(callable, sentinel)` repeatedly calls the callable until it returns the sentinel value.'
    }
  ],
  codingChallenge: {
    title: 'Build Cycle Iterator',
    difficulty: 'Intermediate',
    description: 'Write an iterator class `CycleList` that takes a non-empty list and a `max_cycles: int` count. It iterates through the list repeatedly until `max_cycles` complete passes have occurred, then raises `StopIteration`.',
    starterCode: `class CycleList:
    def __init__(self, items: list, max_cycles: int):
        # Write your solution here
        pass
        
    def __iter__(self):
        return self
        
    def __next__(self):
        pass`,
    hints: [
      'Track current_index and completed_cycles.',
      'When current_index reaches len(items), reset to 0 and increment completed_cycles.',
      'If completed_cycles >= max_cycles, raise StopIteration.'
    ],
    solution: `class CycleList:
    def __init__(self, items: list, max_cycles: int):
        self.items = items
        self.max_cycles = max_cycles
        self.index = 0
        self.cycles = 0
        
    def __iter__(self):
        return self
        
    def __next__(self):
        if self.cycles >= self.max_cycles or not self.items:
            raise StopIteration
        val = self.items[self.index]
        self.index += 1
        if self.index >= len(self.items):
            self.index = 0
            self.cycles += 1
        return val`,
    testCases: [
      { input: 'list(CycleList(["A", "B"], 2))', expectedOutput: '["A", "B", "A", "B"]' }
    ]
  }
};

m5Lessons['py-comp-yield'] = {
  id: 'py-comp-yield',
  moduleId: 'python-module-5',
  title: 'yield and Generator Functions',
  subtitle: 'Execution Suspension, Generator Lifecycles, Pipelines, and yield from',
  order: 5,
  readTimeMinutes: 28,
  difficulty: 'Advanced',
  visualizerType: 'execution-trace',
  objectives: [
    'Define generator functions using the yield keyword.',
    'Understand execution suspension: how yield freezes stack frames and variable states.',
    'Compose data processing pipelines by chaining generator functions.',
    'Delegate sub-generators cleanly using `yield from` syntax.'
  ],
  prerequisites: ['Python functions, iterators, and execution frames.'],
  analogy: {
    title: 'The Pausable Factory Machine',
    text: 'A normal `return` function is a machine that destroys itself every time it finishes making a widget: the blueprints are shredded, workers sent home, and if you want another widget you must build the factory from scratch. A `yield` generator function is a machine with a Pause button: it crafts a widget, slides it through the window, and stands perfectly frozen until you press Resume for the next widget.',
    metaphor: 'yield suspends execution and preserves local variable state between caller requests.'
  },
  problemSolved: {
    title: 'Infinite Streams and Composable Data Pipelines',
    description: 'Writing custom iterator classes requires tedious state tracking attributes (`self.index`, `self.state`). Generator functions allow writing standard sequential loops that turn into stateful iterators automatically.',
    keyPoints: [
      'Any function containing `yield` becomes a generator function returning a generator iterator.',
      'Calling the function does NOT execute its body; execution starts only on `next()`.',
      '`yield from iterable` delegates value production directly to a sub-iterable.'
    ]
  },
  intuition: {
    overview: 'CPython allocates a generator frame on the heap. When `yield` executes, the instruction pointer is stored and the frame state is preserved in memory.',
    steps: [
      { step: 1, title: 'Creation', description: 'Invoking the generator function instantiates a PyGenObject containing a code object and frame.' },
      { step: 2, title: 'Yielding', description: 'Execution runs until yield; the operand is delivered to the caller and the frame pauses.' },
      { step: 3, title: 'Resumption', description: 'The next next() call resumes execution at the exact instruction immediately following yield.' }
    ]
  },
  codeExample: {
    title: 'Streaming Data Pipeline with Generators and yield from',
    code: `def read_lines(raw_data: str):
    """Yield cleaned non-empty lines."""
    for line in raw_data.strip().splitlines():
        cleaned = line.strip()
        if cleaned:
            yield cleaned

def filter_errors(lines):
    """Filter lines containing ERROR."""
    for line in lines:
        if "ERROR" in line:
            yield line

def multi_source(*sources):
    """Delegating to sub-generators with yield from."""
    for src in sources:
        yield from src

# Pipeline chaining: O(1) memory streaming
log_data = "INFO: Boot\\nERROR: Disk full\\nDEBUG: Ping\\nERROR: Timeout"
pipeline = filter_errors(read_lines(log_data))
for err in pipeline:
    print("Detected:", err)`,
    explanation: 'Demonstrates composing a UNIX-style processing pipeline using generator stages and delegating with yield from.'
  },
  runnableCode: {
    code: `def fibonacci_stream():
    """Infinite generator of Fibonacci numbers."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Consume first 7 numbers
fib = fibonacci_stream()
first_seven = [next(fib) for _ in range(7)]
print("First 7 Fibonacci numbers:", first_seven)`,
    expectedOutput: `First 7 Fibonacci numbers: [0, 1, 1, 2, 3, 5, 8]`
  },
  lineByLine: [
    { line: 1, code: 'def fibonacci_stream():', explanation: 'Generator function definition.' },
    { line: 3, code: '    a, b = 0, 1', explanation: 'Local state preserved across yields.' },
    { line: 4, code: '    while True:', explanation: 'Infinite loop; safe because yield pauses execution each step.' },
    { line: 5, code: '        yield a', explanation: 'Yields current number and freezes frame.' },
    { line: 6, code: '        a, b = b, a + b', explanation: 'Updates state when resumed by caller.' }
  ],
  commonMistakes: [
    {
      mistake: 'Calling a generator function and expecting it to execute immediately without calling `next()`.',
      whyWrong: 'Calling a generator function only constructs the generator object; not a single line of the body executes.',
      howToFix: 'Iterate over it with a for loop, list(), or call `next()`.'
    },
    {
      mistake: 'Using `return val` inside a generator in Python 2 style.',
      whyWrong: 'In Python 3.3+, `return val` inside a generator raises `StopIteration(val)`, which is used to return a final value in coroutines, not to yield data.',
      howToFix: 'Use `yield val` to emit values from a generator.'
    }
  ],
  realWorldApplications: [
    { title: 'Machine Learning Data Loaders', description: 'Yielding minibatches of image tensors loaded from disk on the fly.' },
    { title: 'WebSocket Event Streams', description: 'Yielding incoming socket frames as they arrive from network buffers.' }
  ],
  practiceQuestions: [
    { question: 'What is the type returned when you call a function containing the `yield` keyword?', hint: 'Special iterator type.', answer: 'A `generator` object.' },
    { question: 'What does `yield from [1, 2, 3]` do inside a generator?', hint: 'Sub-generator delegation.', answer: 'It iterates through `[1, 2, 3]` and yields each element individually to the outer caller.' },
    { question: 'Can a generator function contain an infinite `while True:` loop?', hint: 'Is it safe?', answer: 'Yes, because `yield` suspends execution at each iteration, values are produced only when requested by the caller.' }
  ],
  quiz: [
    {
      question: 'When does the code inside a generator function actually begin executing?',
      options: ['When the function is defined', 'When the function is called', 'When next() is called for the first time on the generator', 'When the Python process exits'],
      correctAnswer: 2,
      explanation: 'Calling a generator function only instantiates the generator object; execution starts on the first `next()` call.'
    },
    {
      question: 'What is the primary advantage of `yield from subgen()` over `for item in subgen(): yield item`?',
      options: ['It runs on a C-level thread', 'It delegates bidirectional channels including send(), throw(), and return values', 'It makes the subgen immutable', 'It compiles to machine code'],
      correctAnswer: 1,
      explanation: '`yield from` transparently establishes a bidirectional communication channel passing `send()`, `throw()`, and return values between caller and subgenerator.'
    },
    {
      question: 'What happens to the local variables of a generator function when it yields?',
      options: ['They are destroyed and garbage collected', 'They are saved in the generator\'s frame state on the heap', 'They are converted to global variables', 'They are written to disk'],
      correctAnswer: 1,
      explanation: 'Local variables remain preserved in the suspended execution frame on the heap.'
    }
  ],
  codingChallenge: {
    title: 'Sliding Window Generator',
    difficulty: 'Advanced',
    description: 'Write a generator function `sliding_window(iterable, window_size: int)` that yields consecutive overlapping tuples of length `window_size` across the input iterable. If length < window_size, yield nothing.',
    starterCode: `def sliding_window(iterable, window_size: int):
    # Write your solution here
    pass`,
    hints: [
      'Use collections.deque with maxlen=window_size.',
      'Append items; when len(dq) == window_size, yield tuple(dq).'
    ],
    solution: `from collections import deque

def sliding_window(iterable, window_size: int):
    if window_size <= 0:
        return
    dq = deque(maxlen=window_size)
    for item in iterable:
        dq.append(item)
        if len(dq) == window_size:
            yield tuple(dq)`,
    testCases: [
      { input: 'list(sliding_window([1, 2, 3, 4, 5], 3))', expectedOutput: '[(1, 2, 3), (2, 3, 4), (3, 4, 5)]' }
    ]
  }
};

m5Lessons['py-comp-builtins'] = {
  id: 'py-comp-builtins',
  moduleId: 'python-module-5',
  title: 'enumerate, zip, sorted, and map',
  subtitle: 'Essential Built-in Iteration Tools, Strict Zipping, and Chaining Iterators',
  order: 6,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Use enumerate() with custom start offsets to replace manual index counter variables.',
    'Use zip() to iterate multiple sequences in parallel, and understand zip(strict=True) in Python 3.10+.',
    'Use sorted() with key and reverse parameters without mutating original sequences.',
    'Chain and combine iteration built-ins for expressive data transformations.'
  ],
  prerequisites: ['Python iteration and sequence basics.'],
  analogy: {
    title: 'The Multi-Track Audio Mixer',
    text: 'Imagine recording a musical band. `enumerate()` is the timecode display stamping exact second numbers onto the tape. `zip()` is the master soundboard locking the vocal track, drum track, and bass track into synchronized lock-step. `sorted()` is the remix playlist arranging songs by pitch without modifying the master analog tapes.',
    metaphor: 'Iteration built-ins synchronize, index, and transform multiple data streams simultaneously.'
  },
  problemSolved: {
    title: 'Eliminating Clunky Index Arithmetic and Out-of-Sync Loops',
    description: 'Manual index loops like `for i in range(len(items)):` are error-prone and un-Pythonic. Built-ins like enumerate and zip eliminate off-by-one errors and provide clean parallel sequence consumption.',
    keyPoints: [
      '`enumerate(iterable, start=0)` yields `(index, item)` pairs.',
      '`zip(*iterables)` pairs corresponding elements from multiple iterables until the shortest terminates.',
      '`zip(strict=True)` in Python 3.10+ raises `ValueError` if iterables have unequal lengths.',
      '`sorted(iterable)` returns a new sorted list, leaving the original sequence unchanged.'
    ]
  },
  intuition: {
    overview: 'These built-ins return lightweight iterator objects that process elements on the fly with minimal memory allocation.',
    steps: [
      { step: 1, title: 'Pairing', description: 'zip pulls 1 item from each iterator and packs into a tuple.' },
      { step: 2, title: 'Enumerating', description: 'enumerate increments an internal counter and pairs with next item.' },
      { step: 3, title: 'Sorting', description: 'sorted collects elements and applies Timsort in O(N log N) time.' }
    ]
  },
  codeExample: {
    title: 'Practical Application of enumerate, zip, and sorted',
    code: `students = ["Alice", "Bob", "Charlie"]
scores = [92, 85, 96]
grades = ["A", "B", "A+"]

# Parallel iteration with zip
roster = list(zip(students, scores, grades))

# Ranking with enumerate and sorted
ranked = sorted(roster, key=lambda x: x[1], reverse=True)
for rank, (name, score, grade) in enumerate(ranked, start=1):
    print(f"Rank #{rank}: {name} ({score} pts, Grade {grade})")`,
    explanation: 'Demonstrates zip pairing three lists, sorted ranking by score descending, and enumerate providing 1-based ranks.'
  },
  runnableCode: {
    code: `keys = ["id", "username", "status"]
vals = [101, "coder99", "active"]

# Building dict via zip
user_dict = dict(zip(keys, vals))
print("Constructed dict:", user_dict)

# enumerate with custom start
fruits = ["apple", "banana", "cherry"]
for idx, fruit in enumerate(fruits, start=100):
    print(f"SKU {idx}: {fruit}")`,
    expectedOutput: `Constructed dict: {'id': 101, 'username': 'coder99', 'status': 'active'}
SKU 100: apple
SKU 101: banana
SKU 102: cherry`
  },
  lineByLine: [
    { line: 5, code: 'user_dict = dict(zip(keys, vals))', explanation: 'Pairs key-value tuples and passes directly into dict constructor.' },
    { line: 10, code: 'for idx, fruit in enumerate(fruits, start=100):', explanation: 'Enumerates fruits beginning counter at 100.' },
    { line: 11, code: '    print(f"SKU {idx}: {fruit}")', explanation: 'Prints SKU and fruit name.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `for i in range(len(seq)): item = seq[i]`.',
      whyWrong: 'Un-Pythonic, slower, and prone to off-by-one errors.',
      howToFix: 'Use `for i, item in enumerate(seq):`.'
    },
    {
      mistake: 'Using `zip()` on sequences of different lengths without realizing shorter sequence truncates silently.',
      whyWrong: 'Data from longer sequences is silently discarded without warning.',
      howToFix: 'In Python 3.10+, use `zip(a, b, strict=True)` to raise ValueError on length mismatch, or `itertools.zip_longest`.'
    }
  ],
  realWorldApplications: [
    { title: 'CSV Column Mapping', description: 'Zipping header row with row cell values to construct record dictionaries.' },
    { title: 'Leaderboards & Rankings', description: 'Enumerate and sorted building competitive sports or test standings.' }
  ],
  practiceQuestions: [
    { question: 'What does `enumerate(items, start=1)` yield on its first iteration?', hint: 'Tuple of index and item.', answer: '`(1, items[0])`.' },
    { question: 'What happens in Python 3.10+ if you use `zip(a, b, strict=True)` and `len(a) != len(b)`?', hint: 'Safety exception.', answer: 'It raises a `ValueError`.' },
    { question: 'What is the difference between `list.sort()` and `sorted(list)`?', hint: 'In-place mutation vs new list.', answer: '`list.sort()` sorts in-place and returns `None`; `sorted(list)` leaves original unchanged and returns a new sorted list.' }
  ],
  quiz: [
    {
      question: 'What is the output of `list(zip([1, 2], ["a", "b", "c"]))`?',
      options: ['[(1, "a"), (2, "b")]', '[(1, "a"), (2, "b"), (None, "c")]', 'ValueError', '[(1, 2), ("a", "b", "c")]'],
      correctAnswer: 0,
      explanation: 'Standard `zip()` truncates to the length of the shortest input iterable.'
    },
    {
      question: 'How can you unzip a list of pairs `pairs = [(1, "a"), (2, "b")]` back into two lists?',
      options: ['unzip(pairs)', 'zip(*pairs)', 'pairs.unzip()', 'reversed(pairs)'],
      correctAnswer: 1,
      explanation: 'Starred unpacking `zip(*pairs)` transposes pairs back into two separate tuples.'
    },
    {
      question: 'Which built-in parameter sorts strings case-insensitively in `sorted(words, ...)`?',
      options: ['case=False', 'key=str.lower', 'ignore_case=True', 'reverse=True'],
      correctAnswer: 1,
      explanation: 'Passing `key=str.lower` transforms each word to lowercase during key comparisons.'
    }
  ],
  codingChallenge: {
    title: 'Calculate Weighted GPA',
    difficulty: 'Intermediate',
    description: 'Write a function `calculate_gpa(grades: list[float], credit_hours: list[int]) -> float` that uses `zip` to calculate the weighted Grade Point Average: `sum(grade * credit) / sum(credit_hours)`. If total credit hours is 0, return 0.0. Round to 2 decimal places.',
    starterCode: `def calculate_gpa(grades: list[float], credit_hours: list[int]) -> float:
    # Write your solution here
    pass`,
    hints: [
      'Use zip(grades, credit_hours) to iterate (g, c).',
      'Compute total_points = sum(g * c for g, c in zip(grades, credit_hours)).',
      'Divide by sum(credit_hours) and round to 2.'
    ],
    solution: `def calculate_gpa(grades: list[float], credit_hours: list[int]) -> float:
    total_credits = sum(credit_hours)
    if total_credits == 0:
        return 0.0
    weighted_sum = sum(g * c for g, c in zip(grades, credit_hours))
    return round(weighted_sum / total_credits, 2)`,
    testCases: [
      { input: '[4.0, 3.0, 3.5], [3, 4, 3]', expectedOutput: '3.45' }
    ]
  }
};

const py5Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-5.ts');
writePythonModuleFile(py5Path, m5.data, m5Lessons);
console.log('Python Module 5 completed! Authored:', Object.keys(m5Lessons).length);

// ==========================================
// Python Module 6: Object-Oriented Programming
// ==========================================
const m6 = getExistingPyLessons(6);
const m6Lessons = { ...m6.lessons };

m6Lessons['py-oop-constructor'] = {
  id: 'py-oop-constructor',
  moduleId: 'python-module-6',
  title: 'Constructors and self',
  subtitle: '__init__ Initializer, __new__ Allocator, and Demystifying the self Parameter',
  order: 2,
  readTimeMinutes: 18,
  difficulty: 'Intermediate',
  visualizerType: 'oop-diagram',
  objectives: [
    'Distinguish between `__new__` (object allocator) and `__init__` (instance initializer).',
    'Understand why self must be passed explicitly as the first parameter in instance methods.',
    'Initialize instance attributes safely without class-level variable leakage.',
    'Implement input validation inside `__init__` to enforce domain invariants.'
  ],
  prerequisites: ['Classes and objects fundamentals.'],
  analogy: {
    title: 'The Vehicle Factory and Customization Bay',
    text: 'When a new sports car is built, `__new__` is the chassis stamping press: it creates raw metal on four wheels out of nothing. `__init__` is the customization workshop: it takes that freshly stamped chassis (`self`), installs the requested leather seats, paints it red, and sets the VIN number before handing the keys to the customer.',
    metaphor: '__new__ allocates memory; __init__ configures the state of self.'
  },
  problemSolved: {
    title: 'Predictable and Validated Instance State Initialization',
    description: 'Without a constructor, objects start in an uninitialized state, requiring callers to manually set attributes. `__init__` guarantees every instance starts with required attributes and validated invariants.',
    keyPoints: [
      '`__init__` does NOT return a value (returning anything other than `None` raises TypeError).',
      '`self` is not a keyword; it is a convention representing the current instance.',
      'Calling `MyClass(arg)` is syntactic sugar for `obj = MyClass.__new__(MyClass); MyClass.__init__(obj, arg); return obj`.'
    ]
  },
  intuition: {
    overview: 'Python automatically binds the newly created instance to the first argument of `__init__`, allowing you to attach attributes to `self.__dict__`.',
    steps: [
      { step: 1, title: 'Allocation (__new__)', description: 'Python allocates a blank instance object in heap memory.' },
      { step: 2, title: 'Initialization (__init__)', description: 'Initializes instance attributes using caller arguments.' },
      { step: 3, title: 'Return Instance', description: 'Python delivers the configured instance back to the caller.' }
    ]
  },
  codeExample: {
    title: 'Robust BankAccount Initializer with Invariant Checks',
    code: `class BankAccount:
    """Represents a bank account with positive balance invariant."""
    def __init__(self, owner: str, initial_balance: float = 0.0):
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")
        self.owner = owner
        self.balance = float(initial_balance)
        self.transactions = []

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount
        self.transactions.append(f"+{amount}")

acc = BankAccount("Alice", 100.0)
acc.deposit(50.0)
print(f"Owner: {acc.owner}, Balance: \${acc.balance}")`,
    explanation: 'Demonstrates input validation in __init__, initializing instance attributes, and mutating state in methods.'
  },
  runnableCode: {
    code: `class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.is_active = True

u = User("coder42", "coder@example.com")
print("Attributes dict:", u.__dict__)
print("Is active?", u.is_active)`,
    expectedOutput: `Attributes dict: {'username': 'coder42', 'email': 'coder@example.com', 'is_active': True}
Is active? True`
  },
  lineByLine: [
    { line: 1, code: 'class User:', explanation: 'Defines User class.' },
    { line: 2, code: '    def __init__(self, username, email):', explanation: 'Constructor accepting self reference and two parameters.' },
    { line: 3, code: '        self.username = username', explanation: 'Attaches username attribute to this specific instance.' },
    { line: 7, code: 'u = User("coder42", "coder@example.com")', explanation: 'Instantiates User, invoking __init__ under the hood.' }
  ],
  commonMistakes: [
    {
      mistake: 'Trying to return a value from `__init__`: `return self` or `return True`.',
      whyWrong: 'Python raises `TypeError: __init__() should return None, not \'...\'`.',
      howToFix: 'Never use return in `__init__`, or use bare `return` only for early termination.'
    },
    {
      mistake: 'Omitting `self.` when assigning attributes in `__init__`: `username = username`.',
      whyWrong: 'Only creates a local variable inside `__init__` that is destroyed when the constructor exits.',
      howToFix: 'Always prefix instance attributes with `self.`: `self.username = username`.'
    }
  ],
  realWorldApplications: [
    { title: 'Database ORM Entities', description: 'SQLAlchemy model initialization mapping database columns to instance fields.' },
    { title: 'Network Client Connections', description: 'Configuring API client hosts, authentication tokens, and timeout values.' }
  ],
  practiceQuestions: [
    { question: 'What does `__new__` do versus `__init__`?', hint: 'Allocation vs initialization.', answer: '`__new__` is the static method that actually allocates and returns the raw object instance; `__init__` initializes that instance\'s attributes.' },
    { question: 'Why is `self` required as the first parameter of methods in Python unlike Java or C++ (`this`)?', hint: 'Explicit is better than implicit.', answer: 'Python follows "explicit is better than implicit": methods are regular functions, and `obj.method()` is desugared to `Class.method(obj)`.' },
    { question: 'What is `obj.__dict__`?', hint: 'Instance namespace mapping.', answer: 'The dictionary containing all the writable instance attributes belonging to that object.' }
  ],
  quiz: [
    {
      question: 'What is the return type of `__init__()`?',
      options: ['The newly created object', 'None', 'boolean', 'dict'],
      correctAnswer: 1,
      explanation: '`__init__()` must strictly return `None`. Python automatically delivers the instance created by `__new__()`.'
    },
    {
      question: 'What is `self` in Python class methods?',
      options: ['A reserved keyword enforced by the compiler', 'A conventional name for the first argument referring to the current instance', 'A pointer to the parent class', 'A global variable'],
      correctAnswer: 1,
      explanation: '`self` is a conventional identifier (not a keyword) referencing the instance upon which the method was invoked.'
    },
    {
      question: 'What happens if you define `def __init__(username):` without `self`?',
      options: ['It works fine', 'TypeError when instantiated because 2 arguments are passed internally', 'SyntaxError', 'username becomes self'],
      correctAnswer: 1,
      explanation: 'Python passes the instance as the first argument, so `User("alice")` attempts to pass 2 arguments into a 1-parameter function, raising TypeError.'
    }
  ],
  codingChallenge: {
    title: 'Build Product Inventory Record',
    difficulty: 'Intermediate',
    description: 'Write a class `Product` whose `__init__` accepts `name: str`, `price: float`, and optional `stock: int = 0`. Ensure `price` > 0 and `stock` >= 0, raising `ValueError` otherwise. Provide a method `total_value() -> float` returning `round(price * stock, 2)`.',
    starterCode: `class Product:
    # Write your solution here
    pass`,
    hints: [
      'Validate price > 0 and stock >= 0 in __init__.',
      'Assign self.name, self.price, self.stock.',
      'total_value returns round(self.price * self.stock, 2).'
    ],
    solution: `class Product:
    def __init__(self, name: str, price: float, stock: int = 0):
        if price <= 0:
            raise ValueError("Price must be positive")
        if stock < 0:
            raise ValueError("Stock cannot be negative")
        self.name = name
        self.price = float(price)
        self.stock = int(stock)
        
    def total_value(self) -> float:
        return round(self.price * self.stock, 2)`,
    testCases: [
      { input: 'p = Product("Gadget", 19.99, 10); p.total_value()', expectedOutput: '199.9' }
    ]
  }
};

m6Lessons['py-oop-attributes'] = {
  id: 'py-oop-attributes',
  moduleId: 'python-module-6',
  title: 'Instance vs Class Attributes',
  subtitle: 'Namespaces, Shared Class State, and the Classic Shared Mutation Bug',
  order: 3,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'oop-diagram',
  objectives: [
    'Distinguish between class attributes (stored on the class object) and instance attributes (stored on self).',
    'Trace attribute lookup resolution: Instance `__dict__` -> Class `__dict__` -> Parent Classes.',
    'Avoid the infamous shared mutable class attribute bug (e.g. shared lists/dicts).',
    'Use class attributes appropriately for constants, default configurations, and instance counting.'
  ],
  prerequisites: ['Constructors and basic OOP.'],
  analogy: {
    title: 'The Company Bulletin Board vs Personal Employee Desk',
    text: 'A class attribute is the cafeteria bulletin board: there is only one board for the entire company. If someone pins an announcement on the board, every employee sees it. An instance attribute is an employee\'s private desk drawer: each employee has their own desk, and what Alice places in her drawer has zero impact on Bob\'s drawer.',
    metaphor: 'Class attributes are shared across all instances; instance attributes belong to a single object.'
  },
  problemSolved: {
    title: 'Preventing Accidental Cross-Instance Data Leaks',
    description: 'Declaring a list or dictionary at the class level and mutating it from an instance causes silent data corruption across all instances of that class. Understanding attribute scoping prevents this critical pitfall.',
    keyPoints: [
      'Class attributes are defined directly inside the class body, outside any method.',
      'Instance attributes are defined on `self` inside methods (usually `__init__`).',
      'Assigning `obj.x = 10` creates an instance attribute on `obj`, shadowing any class attribute named `x`.'
    ]
  },
  intuition: {
    overview: 'When reading `obj.attr`, Python first checks `obj.__dict__`. If absent, it checks `type(obj).__dict__`, and finally base classes.',
    steps: [
      { step: 1, title: 'Check Instance Dict', description: 'Looks for key in `obj.__dict__`.' },
      { step: 2, title: 'Check Class Dict', description: 'If not found on instance, looks in `MyClass.__dict__`.' },
      { step: 3, title: 'Assignment Shadowing', description: 'Writing `obj.attr = val` ALWAYS writes to `obj.__dict__`, never to `MyClass.__dict__`.' }
    ]
  },
  codeExample: {
    title: 'Class vs Instance Attributes and Shadowing',
    code: `class Dog:
    species = "Canis familiaris"  # Class attribute (shared by all dogs)
    
    def __init__(self, name: str):
        self.name = name          # Instance attribute (unique to each dog)

d1 = Dog("Buddy")
d2 = Dog("Bella")

print(d1.species)  # "Canis familiaris"
print(d2.species)  # "Canis familiaris"

# Shadowing: assigning to d1 creates an instance attribute on d1 only
d1.species = "Wolf"
print("d1 species:", d1.species)  # "Wolf"
print("d2 species:", d2.species)  # Still "Canis familiaris"
print("Class species:", Dog.species) # Still "Canis familiaris"`,
    explanation: 'Demonstrates shared class attribute lookup followed by instance attribute shadowing.'
  },
  runnableCode: {
    code: `class BuggyTeam:
    members = [] # DANGEROUS: shared mutable class attribute!

class SafeTeam:
    def __init__(self):
        self.members = [] # SAFE: independent instance list

t1 = BuggyTeam()
t2 = BuggyTeam()
t1.members.append("Alice")
print("BuggyTeam t2 members:", t2.members) # ['Alice'] (Corrupted!)

s1 = SafeTeam()
s2 = SafeTeam()
s1.members.append("Alice")
print("SafeTeam s2 members:", s2.members)   # [] (Clean!)`,
    expectedOutput: `BuggyTeam t2 members: ['Alice']
SafeTeam s2 members: []`
  },
  lineByLine: [
    { line: 2, code: '    members = []', explanation: 'Class attribute created once at class definition time.' },
    { line: 6, code: '        self.members = []', explanation: 'Instance attribute initialized freshly for each SafeTeam object.' },
    { line: 10, code: 't1.members.append("Alice")', explanation: 'Mutates the shared list in place via pointer reference.' },
    { line: 11, code: 'print("BuggyTeam t2 members:", t2.members)', explanation: 't2 sees the mutation because both reference the exact same list.' }
  ],
  commonMistakes: [
    {
      mistake: 'Declaring mutable objects (lists, dicts, sets) as class attributes.',
      whyWrong: 'Every instance shares the exact same collection instance; mutating it affects all instances.',
      howToFix: 'Always initialize mutable collections inside `__init__` on `self`.'
    },
    {
      mistake: 'Trying to update a class attribute using `self.attr = new_val`.',
      whyWrong: 'Creates a new instance attribute on `self` shadowing the class attribute, leaving the class attribute unchanged.',
      howToFix: 'Update class attributes via the class name directly: `ClassName.attr = new_val`.'
    }
  ],
  realWorldApplications: [
    { title: 'Global Instance Counting', description: 'Tracking active database connection pool instances via a class attribute counter.' },
    { title: 'Default Configuration Constants', description: 'Defining default timeouts and schema versions shared across all model instances.' }
  ],
  practiceQuestions: [
    { question: 'Where is an instance attribute stored internally in Python?', hint: 'Dunder attribute.', answer: 'In the object\'s `__dict__` dictionary.' },
    { question: 'What happens when you execute `obj.x = 5` if `x` was defined as a class attribute?', hint: 'Shadowing.', answer: 'Python creates a new instance attribute `x` in `obj.__dict__` with value 5, shadowing the class attribute for `obj`.' },
    { question: 'How do you modify a class attribute so that the change reflects across all instances?', hint: 'Access via the class.', answer: 'Modify it through the class object itself: `ClassName.x = new_value`.' }
  ],
  quiz: [
    {
      question: 'Where should a mutable collection (like a list) belong if each instance needs its own data?',
      options: ['Directly inside the class body', 'Inside `__init__` bound to `self`', 'In a global variable', 'In a static method'],
      correctAnswer: 1,
      explanation: 'Collections initialized on `self` inside `__init__` are unique to each instance.'
    },
    {
      question: 'Given `class A: count = 0`; `a1 = A(); a2 = A(); a1.count += 1`. What is `a2.count`?',
      options: ['1', '0', '2', 'AttributeError'],
      correctAnswer: 1,
      explanation: '`a1.count += 1` is evaluated as `a1.count = a1.count + 1`, which assigns an instance attribute `count=1` to `a1`. `a2.count` still reads the class attribute 0.'
    },
    {
      question: 'What is the attribute lookup sequence when accessing `instance.attr`?',
      options: ['Class -> Instance -> Built-ins', 'Instance -> Class -> Base classes in MRO', 'Base classes -> Class -> Instance', 'Global -> Class -> Instance'],
      correctAnswer: 1,
      explanation: 'Python checks the instance dictionary first, then the class dictionary, then ancestor classes in MRO order.'
    }
  ],
  codingChallenge: {
    title: 'Track Active Session Count',
    difficulty: 'Intermediate',
    description: 'Write a class `UserSession` with a class attribute `active_sessions: int = 0`. Each time a new session is instantiated, increment `active_sessions`. Provide a method `close()` that decrements `active_sessions` (only if the session is currently active).',
    starterCode: `class UserSession:
    active_sessions: int = 0
    # Write your solution here
    pass`,
    hints: [
      'Increment UserSession.active_sessions in __init__.',
      'Track self.is_active = True.',
      'In close(): if self.is_active: self.is_active = False; UserSession.active_sessions -= 1.'
    ],
    solution: `class UserSession:
    active_sessions: int = 0
    
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.is_active = True
        UserSession.active_sessions += 1
        
    def close(self):
        if self.is_active:
            self.is_active = False
            UserSession.active_sessions -= 1`,
    testCases: [
      { input: 's1 = UserSession("u1"); s2 = UserSession("u2"); c1 = UserSession.active_sessions; s1.close(); c2 = UserSession.active_sessions; (c1, c2)', expectedOutput: '(2, 1)' }
    ]
  }
};

const py6Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-6.ts');
// We will author the rest of module 6 lessons below before writing py6Path!

m6Lessons['py-oop-methods'] = {
  id: 'py-oop-methods',
  moduleId: 'python-module-6',
  title: 'Instance, Class, and Static Methods',
  subtitle: '@classmethod with cls, @staticmethod Utilities, and Alternative Constructors',
  order: 4,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'oop-diagram',
  objectives: [
    'Distinguish between instance methods (receiving self), class methods (receiving cls), and static methods (receiving neither).',
    'Use @classmethod to implement alternative constructors (e.g. from_dict, from_json, from_timestamp).',
    'Use @staticmethod for self-contained utility functions that logically belong to the class namespace.',
    'Understand how descriptor protocol binds functions to methods at access time.'
  ],
  prerequisites: ['Classes, attributes, and decorators.'],
  analogy: {
    title: 'The Car, The Dealership, and The Tire Pressure Chart',
    text: 'An instance method is driving YOUR specific red sedan (requires the keys to `self`). A class method is the factory floor production manager: they take an order blueprint (`cls`) and stamp out a brand new car. A static method is the tire pressure calculation chart on the showroom wall: it doesn\'t touch any car or factory records, but it logically belongs in the automotive manual.',
    metaphor: 'instance method operates on self; classmethod operates on cls; staticmethod is an isolated utility.'
  },
  problemSolved: {
    title: 'Clean API Design and Polymorphic Object Construction',
    description: 'Python only supports a single `__init__` constructor per class. Class methods provide the canonical idiom for alternative constructors, while static methods group helper utilities cleanly.',
    keyPoints: [
      'Instance methods receive `self` as the first argument automatically.',
      '@classmethod methods receive `cls` as the first argument, supporting subclass inheritance.',
      '@staticmethod methods behave like regular functions placed inside the class namespace.'
    ]
  },
  intuition: {
    overview: 'Python uses descriptors (`classmethod` and `staticmethod`) to control how functions are bound to instances or classes when accessed via dot notation.',
    steps: [
      { step: 1, title: 'Instance Method Call', description: '`obj.method(x)` binds `self` to `obj`, invoking `Class.method(obj, x)`.' },
      { step: 2, title: 'Class Method Call', description: '`Class.method(x)` or `obj.method(x)` binds `cls` to `Class`, invoking `func(Class, x)`.' },
      { step: 3, title: 'Static Method Call', description: 'Invokes function directly without prepending any instance or class argument.' }
    ]
  },
  codeExample: {
    title: 'Alternative Constructors with @classmethod and @staticmethod',
    code: `import json
from datetime import date

class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    @classmethod
    def from_birth_year(cls, name: str, birth_year: int):
        """Alternative constructor calculating age from birth year."""
        current_year = date.today().year
        return cls(name, current_year - birth_year)

    @classmethod
    def from_json(cls, json_str: str):
        """Alternative constructor parsing JSON payload."""
        data = json.loads(json_str)
        return cls(data["name"], data["age"])

    @staticmethod
    def is_adult(age: int) -> bool:
        """Utility function with no dependency on self or cls."""
        return age >= 18

p = Person.from_birth_year("Bob", 1995)
print(f"Name: {p.name}, Age: {p.age}, Adult? {Person.is_adult(p.age)}")`,
    explanation: 'Demonstrates @classmethod for alternative constructors and @staticmethod for decoupled validation.'
  },
  runnableCode: {
    code: `class MathOps:
    @staticmethod
    def is_prime(n: int) -> bool:
        if n < 2:
            return False
        for i in range(2, int(n**0.5) + 1):
            if n % i == 0:
                return False
        return True

print("Is 17 prime?", MathOps.is_prime(17))
print("Is 21 prime?", MathOps.is_prime(21))`,
    expectedOutput: `Is 17 prime? True
Is 21 prime? False`
  },
  lineByLine: [
    { line: 2, code: '    @staticmethod', explanation: 'Decorator converting method to a plain function within class namespace.' },
    { line: 3, code: '    def is_prime(n: int) -> bool:', explanation: 'Notice no self or cls parameter.' },
    { line: 10, code: 'print("Is 17 prime?", MathOps.is_prime(17))', explanation: 'Called directly on class without instantiation.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `@staticmethod` instead of `@classmethod` for alternative constructors.',
      whyWrong: 'Hardcoding the class name breaks subclass inheritance (calling `SubClass.from_dict()` would construct the parent class instead of SubClass).',
      howToFix: 'Use `@classmethod` and instantiate using `cls(...)`.'
    },
    {
      mistake: 'Forgetting `self` or `cls` on standard methods.',
      whyWrong: 'Calling `obj.method()` passes `obj` as first argument, raising TypeError: method takes 0 positional arguments but 1 was given.',
      howToFix: 'Ensure instance methods have `self` and `@classmethod` methods have `cls`.'
    }
  ],
  realWorldApplications: [
    { title: 'ORM Serializers', description: 'Django and Pydantic models constructing instances from dictionaries via `from_orm()` or `model_validate()`.' },
    { title: 'Dataclass Converters', description: 'Parsing ISO 8601 timestamps and payloads into typed objects.' }
  ],
  practiceQuestions: [
    { question: 'What is the primary argument passed to a `@classmethod`?', hint: 'Class object convention.', answer: '`cls` (a reference to the class object itself).' },
    { question: 'When should a method be marked `@staticmethod` instead of a standalone function in a module?', hint: 'Logical grouping.', answer: 'When the utility logically belongs to the class\'s domain and namespace, but doesn\'t require access to instance or class state.' },
    { question: 'Can an instance invoke a `@classmethod` or `@staticmethod`?', hint: 'Lookup resolution.', answer: 'Yes, both can be invoked through an instance (`obj.my_classmethod()`) or through the class (`Class.my_classmethod()`).' }
  ],
  quiz: [
    {
      question: 'Which decorator is used to define an alternative constructor in Python?',
      options: ['@staticmethod', '@classmethod', '@constructor', '@property'],
      correctAnswer: 1,
      explanation: '`@classmethod` receives `cls` and allows constructing instances of the exact class or subclass.'
    },
    {
      question: 'What arguments does a `@staticmethod` receive by default?',
      options: ['self only', 'cls only', 'self and cls', 'Only the arguments explicitly passed to it'],
      correctAnswer: 3,
      explanation: 'Static methods receive only the arguments passed to them; neither `self` nor `cls` is passed.'
    },
    {
      question: 'If `Sub` inherits from `Base`, and `Base` defines `from_dict(cls, data): return cls(**data)`. Calling `Sub.from_dict(...)` returns an instance of which class?',
      options: ['Base', 'Sub', 'dict', 'TypeError'],
      correctAnswer: 1,
      explanation: 'Because `cls` is dynamically bound to `Sub` when called on `Sub`, it constructs a `Sub` instance.'
    }
  ],
  codingChallenge: {
    title: 'Date Parser with Class Method Factory',
    difficulty: 'Intermediate',
    description: 'Write a class `SimpleDate` with attributes `year: int`, `month: int`, `day: int`. Implement `__init__(year, month, day)` and a class method `from_iso(cls, iso_str: str)` that parses an ISO formatted string `"YYYY-MM-DD"` (e.g. "2026-10-18") and returns a new `SimpleDate` instance.',
    starterCode: `class SimpleDate:
    # Write your solution here
    pass`,
    hints: [
      'Split iso_str by "-".',
      'Convert tokens to integers: year, month, day = map(int, iso_str.split("-")).',
      'Return cls(year, month, day).'
    ],
    solution: `class SimpleDate:
    def __init__(self, year: int, month: int, day: int):
        self.year = int(year)
        self.month = int(month)
        self.day = int(day)
        
    @classmethod
    def from_iso(cls, iso_str: str):
        y, m, d = map(int, iso_str.split("-"))
        return cls(y, m, d)`,
    testCases: [
      { input: 'd = SimpleDate.from_iso("2026-10-18"); (d.year, d.month, d.day)', expectedOutput: '(2026, 10, 18)' }
    ]
  }
};

m6Lessons['py-oop-encapsulation'] = {
  id: 'py-oop-encapsulation',
  moduleId: 'python-module-6',
  title: 'Encapsulation and Access Control',
  subtitle: '_protected, __private Name Mangling, @property Getters/Setters, and __slots__',
  order: 5,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Understand Python\'s access conventions: `_single_leading_underscore` (protected convention).',
    'Demystify `__double_leading_underscore` name mangling (`_ClassName__var`).',
    'Use `@property`, `@<name>.setter`, and `@<name>.deleter` to control attribute access and validation.',
    'Optimize object memory and restrict attribute addition using `__slots__`.'
  ],
  prerequisites: ['Python OOP basics and constructors.'],
  analogy: {
    title: 'The Thermostat with Built-in Safeguards',
    text: 'A naive class lets anyone twist the copper coils directly (raw public attribute), risking setting the temperature to 500 degrees or negative 50. Encapsulation with `@property` places a clean digital thermostat panel over the wall. You still say `heater.temperature = 72`, but behind the panel, validation circuits verify the temperature is between 50 and 90 before adjusting the furnace.',
    metaphor: '@property turns method calls into natural attribute access with transparent validation.'
  },
  problemSolved: {
    title: 'Data Hiding and Safe Invariant Enforcement Without Breaking APIs',
    description: 'In Java or C++, developers write boilerplate `getTemperature()` and `setTemperature()` methods from day one. Python\'s `@property` allows starting with plain public attributes, and upgrading to getters/setters later without breaking existing caller code.',
    keyPoints: [
      '`_attr` is a gentlemen\'s agreement: "internal use only; do not touch outside the class".',
      '`__attr` triggers name mangling to prevent accidental name collisions in subclasses.',
      '`@property` defines a getter; `@attr.setter` defines a setter.',
      '`__slots__` replaces `__dict__` with a fixed tuple of pointers, reducing RAM by ~60%.'
    ]
  },
  intuition: {
    overview: 'The descriptor protocol powers `@property`. Reading `obj.x` executes the getter method; assigning `obj.x = val` executes the setter method.',
    steps: [
      { step: 1, title: 'Property Lookup', description: 'Python sees `x` is a property descriptor on the class.' },
      { step: 2, title: 'Getter Execution', description: 'Invokes getter function passing `self`.' },
      { step: 3, title: 'Setter Validation', description: 'When writing `obj.x = v`, calls setter method to validate and store into private `_x`.' }
    ]
  },
  codeExample: {
    title: 'Using @property and Name Mangling',
    code: `class Temperature:
    def __init__(self, celsius: float = 0.0):
        self._celsius = float(celsius) # Protected backing attribute

    @property
    def celsius(self) -> float:
        """Getter for celsius."""
        return self._celsius

    @celsius.setter
    def celsius(self, value: float):
        """Setter with validation."""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero is impossible!")
        self._celsius = float(value)

    @property
    def fahrenheit(self) -> float:
        """Computed property."""
        return (self._celsius * 9 / 5) + 32

t = Temperature(25.0)
print(f"Celsius: {t.celsius}°C, Fahrenheit: {t.fahrenheit}°F")
t.celsius = 30.0 # Invokes setter transparently
print("Updated fahrenheit:", t.fahrenheit)`,
    explanation: 'Demonstrates getter, setter with validation, and a read-only computed property.'
  },
  runnableCode: {
    code: `class SecretVault:
    def __init__(self, code):
        self.__code = code # Name mangled

v = SecretVault(1234)
# Direct access fails
try:
    print(v.__code)
except AttributeError as e:
    print("Direct access raised:", type(e).__name__)

# Mangled access works (proves Python has no true private)
print("Mangled access:", v._SecretVault__code)`,
    expectedOutput: `Direct access raised: AttributeError
Mangled access: 1234`
  },
  lineByLine: [
    { line: 3, code: '        self.__code = code', explanation: 'Double underscore triggers CPython compiler to mangle name to _SecretVault__code.' },
    { line: 7, code: '    print(v.__code)', explanation: 'Looking for __code on v raises AttributeError because attribute was renamed.' },
    { line: 12, code: 'print("Mangled access:", v._SecretVault__code)', explanation: 'Shows name mangling is for collision avoidance, not true security.' }
  ],
  commonMistakes: [
    {
      mistake: 'Naming the backing variable the same as the property: `self.celsius = celsius` inside `set celsius`.',
      whyWrong: 'Calls the setter recursively inside itself, resulting in `RecursionError: maximum recursion depth exceeded`.',
      howToFix: 'Name the private backing variable with a leading underscore: `self._celsius = value`.'
    },
    {
      mistake: 'Assuming `__private` attributes provide cryptographic security against inspection.',
      whyWrong: 'Anyone can still access `obj._ClassName__private_var`. Python relies on convention.',
      howToFix: 'Treat encapsulation as an architectural safety guardrail, not data encryption.'
    }
  ],
  realWorldApplications: [
    { title: 'Data Validation in Models', description: 'Validating email formats, zip codes, and positive balances upon assignment.' },
    { title: 'High-Performance Micro-Objects', description: 'Using `__slots__` for millions of vector point objects in game engines to eliminate `__dict__` overhead.' }
  ],
  practiceQuestions: [
    { question: 'How does CPython mangle double-underscore attributes like `__secret` on a class `Vault`?', hint: 'Leading underscore and class name prefix.', answer: 'It renames them to `_Vault__secret`.' },
    { question: 'What is the purpose of defining `__slots__` on a class?', hint: 'Memory and dict avoidance.', answer: 'It prevents the dynamic creation of `__dict__`, reducing memory usage and restricting allowed attributes to a predefined set.' },
    { question: 'Can you create a read-only attribute using `@property`?', hint: 'Omit setter.', answer: 'Yes, define a `@property` getter without defining a corresponding `@<name>.setter`.' }
  ],
  quiz: [
    {
      question: 'What happens when you try to assign to a property that has no setter method?',
      options: ['AttributeError: can\'t set attribute', 'It silently overwrites the property', 'ValueError is raised', 'A new instance attribute is created'],
      correctAnswer: 0,
      explanation: 'Attempting to assign to a read-only property raises `AttributeError: can\'t set attribute`.'
    },
    {
      question: 'Why does Python support name mangling for `__attributes`?',
      options: ['To implement cryptographically secure data privacy', 'To prevent accidental attribute overriding in subclasses', 'To compile the attribute to C memory', 'To speed up attribute lookups'],
      correctAnswer: 1,
      explanation: 'Name mangling was designed to prevent name clashes when subclasses override methods or attributes.'
    },
    {
      question: 'What is the convention for an attribute intended for internal use only?',
      options: ['A single leading underscore `_attr`', 'A single trailing underscore `attr_`', 'Capital letters `ATTR`', 'No underscore'],
      correctAnswer: 0,
      explanation: 'PEP 8 specifies a single leading underscore `_attr` as the convention for protected/internal members.'
    }
  ],
  codingChallenge: {
    title: 'Encapsulated Wallet Balance',
    difficulty: 'Intermediate',
    description: 'Write a class `Wallet` with a private backing attribute `_balance: float` initialized via `__init__(initial_balance: float = 0.0)`. Create a `@property` `balance` with a getter and setter. The setter must ensure the new balance is non-negative (raising `ValueError("Balance cannot be negative")` if < 0) and round the stored value to 2 decimal places.',
    starterCode: `class Wallet:
    # Write your solution here
    pass`,
    hints: [
      'Define __init__ setting self.balance = initial_balance (triggers setter).',
      'Define @property def balance(self): return self._balance.',
      'Define @balance.setter def balance(self, val): validate >= 0 and round(val, 2).'
    ],
    solution: `class Wallet:
    def __init__(self, initial_balance: float = 0.0):
        self.balance = initial_balance
        
    @property
    def balance(self) -> float:
        return self._balance
        
    @balance.setter
    def balance(self, value: float):
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = round(float(value), 2)`,
    testCases: [
      { input: 'w = Wallet(10.555); w.balance', expectedOutput: '10.56' }
    ]
  }
};

m6Lessons['py-oop-inheritance'] = {
  id: 'py-oop-inheritance',
  moduleId: 'python-module-6',
  title: 'Inheritance',
  subtitle: 'Single and Multilevel Inheritance, super(), Method Overriding, and isinstance()',
  order: 6,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'oop-diagram',
  objectives: [
    'Model "is-a" relationships by deriving subclasses from base classes: `class Sub(Base):`.',
    'Delegate initialization and method calls to parent classes using `super()`.',
    'Override parent methods to specialize behavior in subclasses.',
    'Inspect runtime types safely using `isinstance(obj, Class)` and `issubclass(Sub, Base)`.'
  ],
  prerequisites: ['Python classes, self, and constructors.'],
  analogy: {
    title: 'The Biological Taxonomy Tree',
    text: 'A Mammal has warm blood and feeds milk to its offspring (base class traits). A Whale is a Mammal (subclass): it inherits warm blood and milk production from Mammal, but overrides the standard walking limbs with flippers, and adds specialized echolocation systems.',
    metaphor: 'Inheritance allows specialized subclasses to inherit and extend base class capabilities.'
  },
  problemSolved: {
    title: 'Code Reuse and Polymorphic Hierarchies',
    description: 'Writing separate classes for Employee, Manager, and Contractor without inheritance results in massive duplication of common fields (name, id, salary). Base classes centralize shared logic.',
    keyPoints: [
      'Subclasses inherit all attributes and methods of their base class.',
      '`super().__init__(...)` delegates constructor initialization up to the parent.',
      'Always prefer `isinstance(x, Base)` over strict identity checks `type(x) == Base` to respect inheritance.'
    ]
  },
  intuition: {
    overview: 'When accessing an attribute on a subclass instance, Python checks the subclass dictionary first; if not found, it traverses upward through the inheritance tree.',
    steps: [
      { step: 1, title: 'Derivation', description: '`class Child(Parent):` establishes Child as a subtype of Parent.' },
      { step: 2, title: 'Delegation via super()', description: 'super() dynamically proxies calls to the next class in the MRO resolution chain.' },
      { step: 3, title: 'Specialization', description: 'Overriding methods replaces base implementations while preserving interfaces.' }
    ]
  },
  codeExample: {
    title: 'Employee and Manager Hierarchy with super()',
    code: `class Employee:
    def __init__(self, name: str, salary: float):
        self.name = name
        self.salary = salary

    def get_details(self) -> str:
        return f"{self.name} earns \${self.salary:,.2f}"

class Manager(Employee):
    def __init__(self, name: str, salary: float, department: str):
        super().__init__(name, salary)  # Delegates to Employee.__init__
        self.department = department

    def get_details(self) -> str:
        # Overrides parent method while extending it
        base_details = super().get_details()
        return f"{base_details} | Manages: {self.department}"

m = Manager("Sarah", 125000.0, "Engineering")
print(m.get_details())
print("Is Employee?", isinstance(m, Employee)) # True`,
    explanation: 'Demonstrates single inheritance, calling `super().__init__()`, method overriding with `super().get_details()`, and `isinstance()`.'
  },
  runnableCode: {
    code: `class Animal:
    def speak(self):
        return "Generic animal noise"

class Cat(Animal):
    def speak(self):
        return "Meow!"

a = Animal()
c = Cat()
print("Animal speaks:", a.speak())
print("Cat speaks:", c.speak())
print("issubclass(Cat, Animal):", issubclass(Cat, Animal))`,
    expectedOutput: `Animal speaks: Generic animal noise
Cat speaks: Meow!
issubclass(Cat, Animal): True`
  },
  lineByLine: [
    { line: 5, code: 'class Cat(Animal):', explanation: 'Declares Cat inheriting from Animal.' },
    { line: 6, code: '    def speak(self):', explanation: 'Overrides speak() method.' },
    { line: 12, code: 'print("issubclass(Cat, Animal):", issubclass(Cat, Animal))', explanation: 'Verifies inheritance relationship.' }
  ],
  commonMistakes: [
    {
      mistake: 'Forgetting to call `super().__init__()` in a subclass.',
      whyWrong: 'Parent attributes are never initialized, causing `AttributeError` when accessing base fields.',
      howToFix: 'Always invoke `super().__init__(...)` as the first statement in subclass `__init__`.'
    },
    {
      mistake: 'Checking types using `type(x) == Parent` instead of `isinstance(x, Parent)`.',
      whyWrong: '`type(x) == Parent` returns `False` for subclasses of Parent, breaking polymorphism.',
      howToFix: 'Always use `isinstance(x, Parent)`.'
    }
  ],
  realWorldApplications: [
    { title: 'Custom Exceptions', description: 'Subclassing `Exception` or `ValueError` to create domain-specific application errors.' },
    { title: 'GUI Components', description: 'Subclassing `Button` or `Widget` in Qt/Tkinter to create custom styled UI components.' }
  ],
  practiceQuestions: [
    { question: 'What does `super()` do in Python 3?', hint: 'Parent delegation.', answer: 'It returns a proxy object that delegates method calls to the next class in the Method Resolution Order (MRO).' },
    { question: 'What is the root ancestor of all classes in Python 3?', hint: 'Built-in base.', answer: 'The built-in `object` class.' },
    { question: 'What does `issubclass(bool, int)` return in Python?', hint: 'Boolean type history.', answer: '`True`, because `bool` is literally a subclass of `int` in Python.' }
  ],
  quiz: [
    {
      question: 'Which syntax correctly defines class `B` inheriting from class `A`?',
      options: ['class B extends A:', 'class B(A):', 'class B inherits A:', 'class B : public A'],
      correctAnswer: 1,
      explanation: 'In Python, base classes are placed inside parentheses following the class name: `class B(A):`.'
    },
    {
      question: 'What is the recommended way to check if an object `obj` is an instance of `Parent` or any of its subclasses?',
      options: ['type(obj) is Parent', 'isinstance(obj, Parent)', 'obj.__class__ == Parent', 'Parent in type(obj)'],
      correctAnswer: 1,
      explanation: '`isinstance(obj, Parent)` handles inheritance hierarchies correctly.'
    },
    {
      question: 'Why should you call `super().__init__()` in a subclass constructor?',
      options: ['To initialize base class attributes', 'To register the class in sys.modules', 'To free memory in the heap', 'It is optional and does nothing'],
      correctAnswer: 0,
      explanation: 'Without calling `super().__init__()`, the base class constructor is skipped and its attributes remain uninitialized.'
    }
  ],
  codingChallenge: {
    title: 'Custom Exception Hierarchy',
    difficulty: 'Intermediate',
    description: 'Create a custom exception hierarchy: A base exception `ApplicationError(Exception)` and a subclass `ValidationError(ApplicationError)` whose constructor accepts `field: str` and `message: str`, setting `self.field = field` and passing `f"Validation failed on {field}: {message}"` to `super().__init__()`.',
    starterCode: `class ApplicationError(Exception):
    pass

class ValidationError(ApplicationError):
    # Write your solution here
    pass`,
    hints: [
      'Accept field and message in __init__.',
      'Assign self.field = field.',
      'Call super().__init__(f"Validation failed on {field}: {message}").'
    ],
    solution: `class ApplicationError(Exception):
    pass

class ValidationError(ApplicationError):
    def __init__(self, field: str, message: str):
        self.field = field
        super().__init__(f"Validation failed on {field}: {message}")`,
    testCases: [
      { input: 'e = ValidationError("email", "missing @"); (str(e), isinstance(e, ApplicationError))', expectedOutput: '("Validation failed on email: missing @", True)' }
    ]
  }
};

m6Lessons['py-oop-polymorphism'] = {
  id: 'py-oop-polymorphism',
  moduleId: 'python-module-6',
  title: 'Polymorphism and Method Overriding',
  subtitle: 'Duck Typing, Runtime Polymorphism, and Protocols vs Concrete Interfaces',
  order: 7,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'oop-diagram',
  objectives: [
    'Understand runtime polymorphism: invoking the same method name across different types.',
    'Embrace Python\'s core philosophy: Duck Typing ("If it walks like a duck and quacks like a duck, it is a duck").',
    'Implement polymorphic dispatch without rigid inheritance trees.',
    'Compare duck typing with EAFP (Easier to Ask for Forgiveness than Permission).'
  ],
  prerequisites: ['Python inheritance and classes.'],
  analogy: {
    title: 'The Universal USB-C Port',
    text: 'A laptop doesn\'t care if the device plugged into its USB-C port is an external hard drive, a webcam, a keyboard, or a synthesizer. As long as the device speaks the USB protocol (implements read and write data), the laptop communicates with it seamlessly. The laptop doesn\'t demand that the device descend from an "OfficialLaptopPeripheral" inheritance class.',
    metaphor: 'Polymorphism allows functions to accept any object providing the expected interface.'
  },
  problemSolved: {
    title: 'Decoupled, Flexible Architectures Without Rigid Inheritance',
    description: 'In statically typed languages like Java, objects must explicitly implement a shared interface to be used polymorphically. Python\'s duck typing enables dynamic polymorphism: if an object has the required method, it works.',
    keyPoints: [
      'Polymorphism means "many forms": code works with objects of different classes through a shared interface.',
      'Duck typing focuses on what an object can DO (its methods and behaviors), not what it IS (its inheritance tree).',
      'Python uses dynamic dispatch: method lookups are resolved at runtime.'
    ]
  },
  intuition: {
    overview: 'Python function calls look up attributes dynamically on the target object. As long as `obj.render()` exists, the renderer function doesn\'t care what class `obj` belongs to.',
    steps: [
      { step: 1, title: 'Interface Agreement', description: 'Multiple distinct classes implement a method with identical signature (e.g. `draw()`).' },
      { step: 2, title: 'Collection', description: 'Heterogeneous objects are placed into a single list.' },
      { step: 3, title: 'Polymorphic Iteration', description: 'A single loop invokes `.draw()` on each object; each executes its own behavior.' }
    ]
  },
  codeExample: {
    title: 'Polymorphic Audio Exporter via Duck Typing',
    code: `class MP3Audio:
    def export(self, filename: str) -> str:
        return f"Exporting {filename}.mp3 (compressed 320kbps)"

class FLACAudio:
    def export(self, filename: str) -> str:
        return f"Exporting {filename}.flac (lossless 24-bit)"

class WIDGETMockAudio: # Completely unrelated class!
    def export(self, filename: str) -> str:
        return f"Mock export {filename} for testing"

def render_track(audio_track, track_name: str):
    """Polymorphic function: works on any object with an export() method!"""
    print(audio_track.export(track_name))

tracks = [MP3Audio(), FLACAudio(), WIDGETMockAudio()]
for t in tracks:
    render_track(t, "song_01")`,
    explanation: 'Demonstrates duck typing where three unrelated classes all provide `.export()`, enabling polymorphic execution.'
  },
  runnableCode: {
    code: `class Circle:
    def __init__(self, r): self.r = r
    def area(self): return 3.14159 * self.r ** 2

class Square:
    def __init__(self, s): self.s = s
    def area(self): return self.s ** 2

shapes = [Circle(2), Square(3)]
total_area = sum(s.area() for s in shapes)
print(f"Total combined area: {total_area:.2f}")`,
    expectedOutput: `Total combined area: 21.57`
  },
  lineByLine: [
    { line: 7, code: 'shapes = [Circle(2), Square(3)]', explanation: 'List of heterogeneous shape objects.' },
    { line: 8, code: 'total_area = sum(s.area() for s in shapes)', explanation: 'Polymorphic call: invokes Circle.area() then Square.area().' }
  ],
  commonMistakes: [
    {
      mistake: 'Forcing unrelated classes into an artificial base class solely to achieve polymorphism.',
      whyWrong: 'Over-engineering inheritance hierarchies creates brittle, tightly coupled code.',
      howToFix: 'Rely on duck typing or `typing.Protocol` instead of deep inheritance.'
    },
    {
      mistake: 'Using excessive `if isinstance(x, Circle): ... elif isinstance(x, Square): ...` checks.',
      whyWrong: 'Defeats the entire purpose of polymorphism and violates Open/Closed Principle.',
      howToFix: 'Put the polymorphic behavior inside each class and simply call `x.area()`.'
    }
  ],
  realWorldApplications: [
    { title: 'Payment Processing Gateways', description: 'Stripe, PayPal, and Crypto processors all implementing a polymorphic `charge(amount)` method.' },
    { title: 'Serialization Engines', description: 'Custom objects implementing `.to_dict()` or `.json()` for API response serializers.' }
  ],
  practiceQuestions: [
    { question: 'What does "duck typing" mean in Python?', hint: 'Quacking ducks metaphor.', answer: 'An object\'s suitability is determined by the presence of certain methods and properties, rather than by its inheritance from a specific class.' },
    { question: 'What principle is violated when code relies on chained `if isinstance(...)` checks to determine behavior?', hint: 'SOLID principles.', answer: 'The Open/Closed Principle and Polymorphism principles.' },
    { question: 'How can you formally specify duck-typed interfaces in modern Python 3.8+?', hint: 'Typing module feature.', answer: 'Using `typing.Protocol` (structural subtyping).' }
  ],
  quiz: [
    {
      question: 'In Python, must two classes share a common parent class to be used polymorphically?',
      options: ['Yes, always', 'No, duck typing allows any objects with matching method signatures to be used polymorphically', 'Only if they inherit from ABC', 'Only in Python 2'],
      correctAnswer: 1,
      explanation: 'Duck typing allows any objects with the expected methods to be used polymorphically without a shared parent.'
    },
    {
      question: 'What is the primary benefit of polymorphism?',
      options: ['Reduces memory footprint to O(1)', 'Allows writing code that operates on multiple types without modification when new types are added', 'Enables compiled C performance', 'Eliminates garbage collection'],
      correctAnswer: 1,
      explanation: 'Polymorphism allows calling code to remain decoupled and open to extension with new types.'
    },
    {
      question: 'What Python philosophy is closely aligned with duck typing?',
      options: ['LBYL (Look Before You Leap)', 'EAFP (Easier to Ask for Forgiveness than Permission)', 'Explicit is better than implicit', 'Flat is better than nested'],
      correctAnswer: 1,
      explanation: 'EAFP ("try calling the method, handle AttributeError if missing") is the behavioral twin of duck typing.'
    }
  ],
  codingChallenge: {
    title: 'Polymorphic Notification Service',
    difficulty: 'Intermediate',
    description: 'Create two classes `EmailNotifier` and `SMSNotifier`. Each must implement `send(recipient: str, message: str) -> str`. `EmailNotifier` returns `"Email to {recipient}: {message}"` and `SMSNotifier` returns `"SMS to {recipient}: {message}"`. Write a function `dispatch_alerts(notifiers: list, recipient: str, message: str) -> list[str]` that polymorphically calls `send` on all notifiers.',
    starterCode: `class EmailNotifier:
    pass

class SMSNotifier:
    pass

def dispatch_alerts(notifiers: list, recipient: str, message: str) -> list[str]:
    # Write your solution here
    pass`,
    hints: [
      'Implement send() on both classes.',
      'In dispatch_alerts, return [n.send(recipient, message) for n in notifiers].'
    ],
    solution: `class EmailNotifier:
    def send(self, recipient: str, message: str) -> str:
        return f"Email to {recipient}: {message}"

class SMSNotifier:
    def send(self, recipient: str, message: str) -> str:
        return f"SMS to {recipient}: {message}"

def dispatch_alerts(notifiers: list, recipient: str, message: str) -> list[str]:
    return [n.send(recipient, message) for n in notifiers]`,
    testCases: [
      { input: 'dispatch_alerts([EmailNotifier(), SMSNotifier()], "user@x.com", "Server down")', expectedOutput: '["Email to user@x.com: Server down", "SMS to user@x.com: Server down"]' }
    ]
  }
};

m6Lessons['py-oop-abstraction'] = {
  id: 'py-oop-abstraction',
  moduleId: 'python-module-6',
  title: 'Abstract Classes and Abstraction',
  subtitle: 'abc Module, ABC Base Class, @abstractmethod, and Interface Enforcement',
  order: 8,
  readTimeMinutes: 22,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Define formal abstract base classes using `from abc import ABC, abstractmethod`.',
    'Enforce interface contracts: understand why instantiating a subclass missing abstract methods raises TypeError.',
    'Define abstract properties with `@property` combined with `@abstractmethod`.',
    'Recognize when to enforce contracts with ABCs versus relying on duck typing.'
  ],
  prerequisites: ['Python OOP, inheritance, and decorators.'],
  analogy: {
    title: 'The Architectural Blueprints and Building Code',
    text: 'An Abstract Base Class is a municipal building code specification for a commercial skyscraper. It specifies that any building MUST have an emergency fire exit, an elevator shaft, and a sprinkler system (`@abstractmethod`). You cannot live inside a blueprint (you cannot instantiate an ABC). But when a developer builds an actual building (concrete subclass), the city inspector will not grant an occupancy permit until every required specification is physically constructed.',
    metaphor: 'ABCs define mandatory contracts that concrete subclasses must implement.'
  },
  problemSolved: {
    title: 'Guaranteed Interface Compliance Across Large Engineering Teams',
    description: 'Duck typing works well for small scripts, but in large codebases with dozens of developers, forgetting to implement a required method results in runtime crashes hours into production. ABCs catch missing methods immediately at instantiation time.',
    keyPoints: [
      'Classes inheriting from `ABC` that define `@abstractmethod` cannot be instantiated directly.',
      'Subclasses MUST override all abstract methods to become concrete instantiable classes.',
      '`TypeError: Can\'t instantiate abstract class ... with abstract method ...` is raised immediately on `SubClass()` if any method is missing.'
    ]
  },
  intuition: {
    overview: 'CPython\'s ABCMeta metaclass inspects the class during definition and maintains a `__abstractmethods__` frozenset. If this set is non-empty upon instantiation, `__new__` raises TypeError.',
    steps: [
      { step: 1, title: 'Contract Definition', description: 'Base class inherits from `ABC` and marks signatures with `@abstractmethod`.' },
      { step: 2, title: 'Subclass Declaration', description: 'Concrete class inherits from the ABC and implements required methods.' },
      { step: 3, title: 'Instantiation Verification', description: 'CPython checks if all abstract methods are implemented before allowing instance allocation.' }
    ]
  },
  codeExample: {
    title: 'Database Storage Interface using ABC',
    code: `from abc import ABC, abstractmethod

class BaseRepository(ABC):
    @abstractmethod
    def save(self, entity_id: str, data: dict) -> bool:
        """Persist data."""
        pass

    @abstractmethod
    def get_by_id(self, entity_id: str) -> dict | None:
        """Retrieve data by ID."""
        pass

class InMemoryRepository(BaseRepository):
    def __init__(self):
        self._store = {}

    def save(self, entity_id: str, data: dict) -> bool:
        self._store[entity_id] = data
        return True

    def get_by_id(self, entity_id: str) -> dict | None:
        return self._store.get(entity_id)

repo = InMemoryRepository()
repo.save("u1", {"name": "Alice"})
print("Fetched:", repo.get_by_id("u1"))`,
    explanation: 'Demonstrates defining an ABC contract with @abstractmethod and implementing a concrete subclass.'
  },
  runnableCode: {
    code: `from abc import ABC, abstractmethod

class Plugin(ABC):
    @abstractmethod
    def run(self):
        pass

class IncompletePlugin(Plugin):
    pass # Forgot to implement run()!

try:
    p = IncompletePlugin()
except TypeError as e:
    print("Caught instantiation error:")
    print(e)`,
    expectedOutput: `Caught instantiation error:
Can't instantiate abstract class IncompletePlugin without an implementation for abstract method 'run'`
  },
  lineByLine: [
    { line: 3, code: 'class Plugin(ABC):', explanation: 'Defines Abstract Base Class inheriting from ABC.' },
    { line: 4, code: '    @abstractmethod', explanation: 'Marks run() as mandatory abstract method.' },
    { line: 7, code: 'class IncompletePlugin(Plugin):', explanation: 'Subclass fails to implement run().' },
    { line: 11, code: '    p = IncompletePlugin()', explanation: 'CPython intercepts instantiation and raises TypeError.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `@abstractmethod` without inheriting from `ABC` (or setting `metaclass=ABCMeta`).',
      whyWrong: 'The `@abstractmethod` decorator is ignored; the class can still be instantiated freely without error.',
      howToFix: 'Ensure the base class inherits from `abc.ABC`.'
    },
    {
      mistake: 'Putting `@property` inside `@abstractmethod`: `@abstractmethod @property`.',
      whyWrong: 'Incorrect decorator ordering.',
      howToFix: 'Always place `@property` as the outer decorator: `@property @abstractmethod`.'
    }
  ],
  realWorldApplications: [
    { title: 'Plugin Architectures', description: 'Enforcing that third-party plugin extensions implement all lifecycle hooks (init, execute, teardown).' },
    { title: 'Machine Learning Estimators', description: 'Scikit-learn `BaseEstimator` requiring `fit(X, y)` and `predict(X)`.' }
  ],
  practiceQuestions: [
    { question: 'What error is raised when attempting to instantiate an ABC with unimplemented abstract methods?', hint: 'Type check exception.', answer: '`TypeError: Can\'t instantiate abstract class ... with abstract method ...`.' },
    { question: 'Can an abstract method contain an actual implementation body in the ABC?', hint: 'super() in abstract methods.', answer: 'Yes, an abstract method can provide a common default implementation that subclasses can invoke via `super().method()`.' },
    { question: 'What module in Python provides ABC functionality?', hint: 'Three-letter module name.', answer: 'The standard library `abc` module.' }
  ],
  quiz: [
    {
      question: 'Which class must a class inherit from to enforce abstract methods in Python?',
      options: ['object', 'abc.ABC', 'interface', 'Contract'],
      correctAnswer: 1,
      explanation: 'Inheriting from `abc.ABC` sets `ABCMeta` as the metaclass, which enforces abstract methods.'
    },
    {
      question: 'When is the check for implemented abstract methods performed?',
      options: ['At import time', 'At instantiation time (when `Class()` is called)', 'When the method is called', 'During compilation to bytecode'],
      correctAnswer: 1,
      explanation: 'The check happens dynamically when the class is instantiated (`__new__`).'
    },
    {
      question: 'What is the correct syntax for an abstract property?',
      options: ['@abstractproperty', '@property followed by @abstractmethod', '@abstractmethod followed by @property', '@abstract_prop'],
      correctAnswer: 1,
      explanation: 'The modern idiom in Python 3 is stacking `@property` above `@abstractmethod`.'
    }
  ],
  codingChallenge: {
    title: 'Define Cache Storage Contract',
    difficulty: 'Advanced',
    description: 'Using `abc.ABC` and `@abstractmethod`, write an abstract base class `BaseCache` with two abstract methods: `get(key: str) -> str | None` and `set(key: str, value: str) -> None`. Then create a concrete subclass `MemoryCache(BaseCache)` that implements both using an internal dictionary `self._cache`.',
    starterCode: `from abc import ABC, abstractmethod

# Write your solution here`,
    hints: [
      'Define BaseCache(ABC) with @abstractmethod get and set.',
      'Define MemoryCache(BaseCache) initializing self._cache = {}.',
      'Implement get(k) and set(k, v).'
    ],
    solution: `from abc import ABC, abstractmethod

class BaseCache(ABC):
    @abstractmethod
    def get(self, key: str) -> str | None:
        pass
        
    @abstractmethod
    def set(self, key: str, value: str) -> None:
        pass

class MemoryCache(BaseCache):
    def __init__(self):
        self._cache = {}
        
    def get(self, key: str) -> str | None:
        return self._cache.get(key)
        
    def set(self, key: str, value: str) -> None:
        self._cache[key] = value`,
    testCases: [
      { input: 'c = MemoryCache(); c.set("k1", "v1"); c.get("k1")', expectedOutput: '"v1"' }
    ]
  }
};

m6Lessons['py-oop-composition'] = {
  id: 'py-oop-composition',
  moduleId: 'python-module-6',
  title: 'Composition vs Inheritance',
  subtitle: 'Favoring Composition Over Inheritance, Has-A Relationships, and Delegation',
  order: 9,
  readTimeMinutes: 22,
  difficulty: 'Advanced',
  visualizerType: 'oop-diagram',
  objectives: [
    'Distinguish "is-a" relationships (inheritance) from "has-a" relationships (composition).',
    'Understand the classic Gang of Four principle: "Favor object composition over class inheritance".',
    'Avoid fragile base class problems and inheritance hierarchies that are too deep.',
    'Implement the delegation pattern where an outer class forwards calls to internal component instances.'
  ],
  prerequisites: ['Classes, objects, and inheritance basics.'],
  analogy: {
    title: 'The Smartphone vs The Genetic Hybrid',
    text: 'Inheritance is like trying to breed a creature that is half-bird, half-fish, and half-bat so it can swim, fly, and walk. If the bird gene mutates, the fish behavior breaks. Composition is like building a smartphone: the phone HAS-A camera, HAS-A GPS chip, and HAS-A battery. If Sony invents a better camera module, you swap the camera component without rewriting the phone\'s operating system.',
    metaphor: 'Inheritance binds classes at compile-time; composition connects objects dynamically at runtime.'
  },
  problemSolved: {
    title: 'Preventing Fragile Base Class and Gorilla-Banana Problems',
    description: 'Joe Armstrong famously said: "You wanted a banana, but what you got was a gorilla holding the banana and the entire jungle." Deep inheritance forces subclasses to inherit dozens of irrelevant methods. Composition lets you assemble exactly what you need.',
    keyPoints: [
      'Inheritance models "is-a" (A Dog IS-A Animal).',
      'Composition models "has-a" (A Car HAS-A Engine).',
      'Composition allows swapping behaviors dynamically at runtime.',
      'Delegation passes work to internal components: `self.engine.start()`.'
    ]
  },
  intuition: {
    overview: 'Instead of inheriting from 5 different parent classes, an object holds references to independent helper instances and delegates tasks to them.',
    steps: [
      { step: 1, title: 'Component Identification', description: 'Break distinct responsibilities (logging, storage, serialization) into small independent classes.' },
      { step: 2, title: 'Injection', description: 'Pass component instances into the container object\'s `__init__` constructor.' },
      { step: 3, title: 'Delegation', description: 'The container invokes component methods when needed.' }
    ]
  },
  codeExample: {
    title: 'Car Composed of Engine and Transmission Components',
    code: `class ElectricEngine:
    def start(self) -> str:
        return "Silent electric hum (250 kW ready)"

class V8Engine:
    def start(self) -> str:
        return "V8 Roar! (450 HP ignited)"

class Car:
    """Car HAS-AN Engine via composition."""
    def __init__(self, model: str, engine):
        self.model = model
        self.engine = engine  # Injected component

    def drive(self) -> str:
        # Delegation
        engine_status = self.engine.start()
        return f"{self.model}: {engine_status} -> Rolling out!"

tesla = Car("Model S", ElectricEngine())
mustang = Car("Mustang GT", V8Engine())

print(tesla.drive())
print(mustang.drive())`,
    explanation: 'Demonstrates composing a Car with interchangeable engine components without inheritance coupling.'
  },
  runnableCode: {
    code: `class ConsoleLogger:
    def log(self, msg): print(f"[LOG] {msg}")

class UserService:
    def __init__(self, logger=None):
        self.logger = logger or ConsoleLogger() # Composition

    def register_user(self, email):
        self.logger.log(f"Registering user: {email}")
        return True

service = UserService()
service.register_user("alex@example.com")`,
    expectedOutput: `[LOG] Registering user: alex@example.com`
  },
  lineByLine: [
    { line: 5, code: '        self.logger = logger or ConsoleLogger()', explanation: 'Stores logger component inside instance.' },
    { line: 8, code: '        self.logger.log(f"Registering user: {email}")', explanation: 'Delegates logging to component.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using inheritance simply to reuse 1 helper method: `class PaymentProcessor(EmailSender):`.',
      whyWrong: 'A PaymentProcessor is NOT an EmailSender; inheritance breaks domain modeling and leaks unwanted methods.',
      howToFix: 'Use composition: pass an `email_sender` instance to `PaymentProcessor`.'
    },
    {
      mistake: 'Deep inheritance hierarchies (> 3 levels: A -> B -> C -> D -> E).',
      whyWrong: 'Makes debugging MRO and tracing method definitions nearly impossible.',
      howToFix: 'Flatten hierarchies and compose components.'
    }
  ],
  realWorldApplications: [
    { title: 'Dependency Injection', description: 'Injecting database clients, cache layers, and notification services into FastAPI controllers.' },
    { title: 'Game Development (Entity Component Systems)', description: 'Entities composed of HealthComponent, RenderComponent, and PhysicsComponent.' }
  ],
  practiceQuestions: [
    { question: 'What is the relationship modeled by composition?', hint: 'Is-a or has-a?', answer: '"Has-a" relationship (e.g. Order HAS-A Customer).' },
    { question: 'What is the "Fragile Base Class" problem?', hint: 'Base class changes breaking subclasses.', answer: 'When modifying an internal detail in a base class inadvertently breaks subclasses that relied on that internal behavior.' },
    { question: 'What is delegation?', hint: 'Forwarding requests.', answer: 'A design pattern where an object handles a request by delegating it to an internal component object.' }
  ],
  quiz: [
    {
      question: 'Which design guideline summarizes the composition principle?',
      options: ['Always inherit from at least 3 classes', 'Favor object composition over class inheritance', 'Never use classes in Python', 'Inheritance is always faster than composition'],
      correctAnswer: 1,
      explanation: 'The Gang of Four design principle states: "Favor object composition over class inheritance".'
    },
    {
      question: 'If a `Computer` contains a `CPU`, `RAM`, and `HardDrive`, what design pattern is this?',
      options: ['Multilevel Inheritance', 'Composition', 'Abstract Metaclass', 'Singleton'],
      correctAnswer: 1,
      explanation: 'The Computer "has-a" CPU, RAM, and HardDrive, representing composition.'
    },
    {
      question: 'Why is composition more flexible than inheritance at runtime?',
      options: ['Components can be swapped dynamically on an instance without modifying classes', 'Composition avoids RAM allocation', 'It disables Python\'s GIL', 'It runs in parallel threads'],
      correctAnswer: 0,
      explanation: 'Composition allows swapping internal component objects at runtime (`obj.logger = CloudLogger()`).'
    }
  ],
  codingChallenge: {
    title: 'Build Secure Authorizer via Composition',
    difficulty: 'Advanced',
    description: 'Create a validator component `TokenValidator` with method `is_valid(token: str) -> bool` (returns True if token starts with "Bearer_"). Then build a class `APIClient` that takes a `validator: TokenValidator` in `__init__`. Provide a method `execute_query(token: str, query: str) -> str` that checks validation, returning `"Executed: {query}"` if valid, or raising `PermissionError("Invalid token")` if invalid.',
    starterCode: `class TokenValidator:
    # Write your solution here
    pass

class APIClient:
    # Write your solution here
    pass`,
    hints: [
      'In TokenValidator.is_valid: return token.startswith("Bearer_").',
      'In APIClient.__init__: store self.validator = validator.',
      'In execute_query: if not self.validator.is_valid(token): raise PermissionError.'
    ],
    solution: `class TokenValidator:
    def is_valid(self, token: str) -> bool:
        return token.startswith("Bearer_")

class APIClient:
    def __init__(self, validator: TokenValidator):
        self.validator = validator
        
    def execute_query(self, token: str, query: str) -> str:
        if not self.validator.is_valid(token):
            raise PermissionError("Invalid token")
        return f"Executed: {query}"`,
    testCases: [
      { input: 'client = APIClient(TokenValidator()); client.execute_query("Bearer_123", "SELECT *")', expectedOutput: '"Executed: SELECT *"' }
    ]
  }
};

m6Lessons['py-oop-mro'] = {
  id: 'py-oop-mro',
  moduleId: 'python-module-6',
  title: 'Method Resolution Order (MRO)',
  subtitle: 'C3 Linearization Algorithm, Multiple Inheritance, and the Diamond Problem',
  order: 10,
  readTimeMinutes: 25,
  difficulty: 'Advanced',
  visualizerType: 'oop-diagram',
  objectives: [
    'Understand Multiple Inheritance in Python and the classic Diamond Problem.',
    'Trace Method Resolution Order (MRO) using `Class.__mro__` and `Class.mro()`.',
    'Understand the C3 Linearization algorithm rules: local precedence order and monotonic inheritance.',
    'Use `super()` safely in cooperative multiple inheritance setups.'
  ],
  prerequisites: ['Python inheritance, super(), and classes.'],
  analogy: {
    title: 'The Ancestry Lineage Arbitration Court',
    text: 'Imagine you inherit family heirlooms from both your Mother and Father, who in turn both descend from Grandma Rose (a diamond family tree). If a question arises about which family rule book to follow, you cannot follow two conflicting orders at once. C3 Linearization is the supreme arbiter: it writes down a single, unbending linear sequence guaranteeing that children are consulted before parents, and birth order of parents is strictly respected.',
    metaphor: 'MRO linearizes a directed acyclic graph of multiple inheritance into a single deterministic order.'
  },
  problemSolved: {
    title: 'Deterministic Resolution in Complex Multiple Inheritance Graphs',
    description: 'In languages like C++, the diamond problem causes duplicate base class instances and ambiguous calls. Python solves this elegantly using the C3 Linearization algorithm, ensuring every class is visited exactly once in a strictly predictable order.',
    keyPoints: [
      'The Diamond Problem occurs when class `D` inherits from `B` and `C`, and both `B` and `C` inherit from `A`.',
      'Python guarantees subclasses appear before base classes in the MRO.',
      'If multiple parents are specified `class D(B, C):`, B\'s branch is searched before C\'s branch.',
      '`Class.__mro__` displays the exact resolution sequence.'
    ]
  },
  intuition: {
    overview: 'C3 Linearization computes the MRO of class C as: `L[C] = C + merge(L[B1], L[B2], ..., (B1, B2, ...))`, preserving local precedence and monotonicity.',
    steps: [
      { step: 1, title: 'Subclass Precedence', description: 'A class always appears before its parents.' },
      { step: 2, title: 'Parent Order', description: 'Parents listed in the class definition header maintain left-to-right priority.' },
      { step: 3, title: 'Consistency Check', description: 'If no linear ordering satisfies monotonicity, Python raises TypeError: Cannot create a consistent method resolution order.' }
    ]
  },
  codeExample: {
    title: 'The Diamond Problem and Inspecting __mro__',
    code: `class A:
    def ping(self):
        print("A ping")

class B(A):
    def ping(self):
        print("B ping")
        super().ping()

class C(A):
    def ping(self):
        print("C ping")
        super().ping()

class D(B, C):
    def ping(self):
        print("D ping")
        super().ping()

d = D()
d.ping()

print("\\nMRO Sequence:")
for idx, cls in enumerate(D.__mro__):
    print(f"{idx}: {cls.__name__}")`,
    explanation: 'Shows cooperative multiple inheritance in a diamond diagram. Notice that `super().ping()` in B calls C, not A!'
  },
  runnableCode: {
    code: `class Base: pass
class Left(Base): pass
class Right(Base): pass
class Child(Left, Right): pass

print("MRO tuple:", [c.__name__ for c in Child.__mro__])`,
    expectedOutput: `MRO tuple: ['Child', 'Left', 'Right', 'Base', 'object']`
  },
  lineByLine: [
    { line: 4, code: 'class Child(Left, Right): pass', explanation: 'Multiple inheritance inheriting from Left then Right.' },
    { line: 6, code: 'print("MRO tuple:", [c.__name__ for c in Child.__mro__])', explanation: 'Order is Child -> Left -> Right -> Base -> object.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assuming `super()` in a class always calls its immediate parent class.',
      whyWrong: 'In cooperative multiple inheritance, `super()` calls the NEXT class in the overall MRO sequence (which may be a sibling class, not the parent!).',
      howToFix: 'Always inspect `Class.__mro__` to understand the true execution path.'
    },
    {
      mistake: 'Creating impossible inheritance orders: `class X(A, B): pass; class Y(B, A): pass; class Z(X, Y): pass`.',
      whyWrong: 'Raises `TypeError: Cannot create a consistent method resolution order (MRO) for bases A, B`.',
      howToFix: 'Ensure consistent left-to-right inheritance ordering across all subclasses.'
    }
  ],
  realWorldApplications: [
    { title: 'Django Mixins', description: 'Combining `LoginRequiredMixin`, `PermissionRequiredMixin`, and `DetailView` in class-based views.' },
    { title: 'DRF Serializers', description: 'Combining validation mixins with base model serializers.' }
  ],
  practiceQuestions: [
    { question: 'What algorithm does Python use to calculate Method Resolution Order?', hint: 'Algorithm named after a letter and number.', answer: 'The C3 Linearization algorithm.' },
    { question: 'What attribute on a class object returns its MRO as a tuple?', hint: 'Dunder attribute.', answer: '`Class.__mro__` (or the `Class.mro()` method).' },
    { question: 'What is the very last class in every Python 3 class MRO?', hint: 'Root of all objects.', answer: 'The `object` class.' }
  ],
  quiz: [
    {
      question: 'In `class D(B, C): pass`, which class method is checked first if overridden in both B and C?',
      options: ['C', 'B', 'A (common parent)', 'object'],
      correctAnswer: 1,
      explanation: 'Python resolves parents from left to right as listed in the class header; B precedes C.'
    },
    {
      question: 'What exception is raised if an inheritance hierarchy has conflicting precedence that cannot be linearized?',
      options: ['RecursionError', 'TypeError', 'HierarchyError', 'AttributeError'],
      correctAnswer: 1,
      explanation: 'Python raises `TypeError: Cannot create a consistent method resolution order (MRO)`.'
    },
    {
      question: 'What does `super()` do in the context of C3 MRO?',
      options: ['Calls the root object class directly', 'Calls the next class in the MRO of the instance from which the call originated', 'Calls the leftmost parent only', 'Restarts the method lookup from scratch'],
      correctAnswer: 1,
      explanation: '`super()` delegates to the next class in the active MRO sequence of the calling instance.'
    }
  ],
  codingChallenge: {
    title: 'Inspect Call Order in Cooperative Mixins',
    difficulty: 'Advanced',
    description: 'Write three classes `LoggerMixin`, `AuthMixin`, and `ActionHandler`. `LoggerMixin.execute(self)` appends `"logged"` to `self.log` and calls `super().execute()`. `AuthMixin.execute(self)` appends `"authed"` to `self.log` and calls `super().execute()`. `ActionHandler.execute(self)` appends `"action"` to `self.log`. Create `SubClass(LoggerMixin, AuthMixin, ActionHandler)` and demonstrate that calling `.execute()` populates `self.log` with `["logged", "authed", "action"]`.',
    starterCode: `class ActionHandler:
    def __init__(self):
        self.log = []
    def execute(self):
        self.log.append("action")

# Complete LoggerMixin, AuthMixin, and SubClass`,
    hints: [
      'In LoggerMixin: self.log.append("logged"); super().execute().',
      'In AuthMixin: self.log.append("authed"); super().execute().',
      'class SubClass(LoggerMixin, AuthMixin, ActionHandler): pass.'
    ],
    solution: `class ActionHandler:
    def __init__(self):
        self.log = []
    def execute(self):
        self.log.append("action")

class LoggerMixin:
    def execute(self):
        self.log.append("logged")
        super().execute()

class AuthMixin:
    def execute(self):
        self.log.append("authed")
        super().execute()

class SubClass(LoggerMixin, AuthMixin, ActionHandler):
    pass`,
    testCases: [
      { input: 's = SubClass(); s.execute(); s.log', expectedOutput: '["logged", "authed", "action"]' }
    ]
  }
};

m6Lessons['py-oop-special-methods'] = {
  id: 'py-oop-special-methods',
  moduleId: 'python-module-6',
  title: 'Special Methods and Operator Overloading',
  subtitle: '__str__, __repr__, __len__, __eq__, __add__, and the Python Data Model',
  order: 11,
  readTimeMinutes: 28,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Implement the core Python Data Model methods to make custom classes first-class Python citizens.',
    'Distinguish `__str__` (readable representation for users) from `__repr__` (unambiguous code representation for developers).',
    'Implement sequence and container protocols: `__len__`, `__getitem__`, `__contains__`.',
    'Overload arithmetic and comparison operators: `__add__`, `__eq__`, `__lt__`, `__hash__`.'
  ],
  prerequisites: ['Python OOP, encapsulation, and hashing concepts.'],
  analogy: {
    title: 'The Universal Embassy Protocol Adapter',
    text: 'When foreign ambassadors arrive at an international summit, they don\'t invent custom greeting procedures. If the summit protocol calls for a handshake (`+`), the ambassador extends their hand (`__add__`). If the protocol calls for presenting credentials, the ambassador presents their passport (`__repr__`). Implementing dunder methods allows your custom class to integrate with all built-in Python syntax.',
    metaphor: 'Special methods ("dunder methods") bind your class into Python\'s operator syntax.'
  },
  problemSolved: {
    title: 'Making Custom Classes Idiomatic, Natural, and Pythonic',
    description: 'Without special methods, classes force developers to call verbose methods like `vec1.add_vector(vec2)` or `user.is_equal_to(other)`. Dunder methods allow natural expressions like `vec1 + vec2` and `user == other`.',
    keyPoints: [
      '`__repr__` should ideally produce a valid Python string that could recreate the object `eval(repr(obj)) == obj`.',
      'Implementing `__eq__` causes Python to automatically set `__hash__ = None` unless explicitly implemented.',
      'Container dunder methods: `__len__`, `__getitem__`, `__setitem__`, `__contains__` enable slicing, indexing, and `in` checks.'
    ]
  },
  intuition: {
    overview: 'When Python encounters an operator like `a + b`, it looks up the dunder method on the left operand\'s type: `type(a).__add__(a, b)`.',
    steps: [
      { step: 1, title: 'Operator Parsing', description: 'Syntax parser encounters `len(x)` or `a == b`.' },
      { step: 2, title: 'Dunder Lookup', description: 'Calls `x.__len__()` or `a.__eq__(b)`.' },
      { step: 3, title: 'Fallback / Reflection', description: 'If `__eq__` returns `NotImplemented`, Python tries reflected method `b.__eq__(a)`.' }
    ]
  },
  codeExample: {
    title: 'Complete 2D Vector with Operator Overloading',
    code: `class Vector2D:
    def __init__(self, x: float, y: float):
        self.x = float(x)
        self.y = float(y)

    def __repr__(self) -> str:
        return f"Vector2D({self.x}, {self.y})"

    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

    def __add__(self, other):
        if not isinstance(other, Vector2D):
            return NotImplemented
        return Vector2D(self.x + other.x, self.y + other.y)

    def __eq__(self, other) -> bool:
        if not isinstance(other, Vector2D):
            return False
        return self.x == other.x and self.y == other.y

    def __abs__(self) -> float:
        """Magnitude of vector: abs(v)."""
        return (self.x**2 + self.y**2) ** 0.5

v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)
v3 = v1 + v2
print("v3 repr:", repr(v3))
print("v3 str:", str(v3))
print("Magnitude of v1:", abs(v1))
print("v1 == Vector2D(3, 4):", v1 == Vector2D(3, 4))`,
    explanation: 'Demonstrates implementing __repr__, __str__, __add__, __eq__, and __abs__ on a mathematical Vector class.'
  },
  runnableCode: {
    code: `class Playlist:
    def __init__(self, songs):
        self.songs = list(songs)

    def __len__(self):
        return len(self.songs)

    def __getitem__(self, index):
        return self.songs[index]

    def __contains__(self, song):
        return song in self.songs

p = Playlist(["Song A", "Song B", "Song C"])
print("Playlist length:", len(p))
print("Second song:", p[1])
print("Has 'Song A'?", "Song A" in p)`,
    expectedOutput: `Playlist length: 3
Second song: Song B
Has 'Song A'? True`
  },
  lineByLine: [
    { line: 5, code: '    def __len__(self):', explanation: 'Allows calling len(p).' },
    { line: 8, code: '    def __getitem__(self, index):', explanation: 'Allows square-bracket indexing p[1] and slicing.' },
    { line: 11, code: '    def __contains__(self, song):', explanation: 'Allows "Song A" in p membership checks.' }
  ],
  commonMistakes: [
    {
      mistake: 'Implementing `__str__` without implementing `__repr__`.',
      whyWrong: 'If `__repr__` is missing, Python falls back to `<MyClass object at 0x...>` in debuggers, lists, and interactive shells.',
      howToFix: 'Always implement `__repr__` first. If `__str__` is omitted, Python falls back to `__repr__` automatically.'
    },
    {
      mistake: 'Raising TypeError inside `__add__` when operand type is unsupported.',
      whyWrong: 'Prevents Python from trying the reflected right-hand method `__radd__`.',
      howToFix: 'Return `NotImplemented` instead of raising an error.'
    }
  ],
  realWorldApplications: [
    { title: 'Custom Container Collections', description: 'Building matrix math libraries, graph nodes, and geometry engines.' },
    { title: 'SQL Query Builders', description: 'Overloading bitwise operators `&` and `|` for database filter combinations (like Django Q objects).' }
  ],
  practiceQuestions: [
    { question: 'What is the rule of thumb for `__repr__` versus `__str__`?', hint: 'Target audience.', answer: '`__repr__` is for developers (unambiguous, matches constructor code if possible); `__str__` is for end users (clean and readable).' },
    { question: 'What should an operator method return if it does not know how to handle the other operand?', hint: 'Special singleton return value.', answer: 'It should return the built-in singleton `NotImplemented`.' },
    { question: 'What dunder method is called when using the `in` keyword on an object?', hint: 'Membership check.', answer: 'The `__contains__(self, item)` method.' }
  ],
  quiz: [
    {
      question: 'If only `__repr__` is defined on a class, what does `str(obj)` output?',
      options: ['<Object at 0x...>', 'It falls back to the output of __repr__', 'TypeError', 'None'],
      correctAnswer: 1,
      explanation: 'If `__str__` is not defined, Python automatically falls back to `__repr__`.'
    },
    {
      question: 'Which method overloads the `+` operator?',
      options: ['__plus__', '__add__', '__concat__', '__sum__'],
      correctAnswer: 1,
      explanation: '`__add__` is the dunder method for the addition operator `+`.'
    },
    {
      question: 'What happens to `__hash__` when a class defines `__eq__` without explicitly defining `__hash__`?',
      options: ['It uses the default object id hash', 'Python sets __hash__ = None, making instances unhashable', 'It computes hash from all attributes', 'SyntaxError'],
      correctAnswer: 1,
      explanation: 'Python automatically sets `__hash__ = None` to uphold the contract that equal objects must have equal hash values.'
    }
  ],
  codingChallenge: {
    title: 'Custom Money Class with Operator Overloading',
    difficulty: 'Advanced',
    description: `Write a class Money with attributes amount: float and currency: str. Implement __repr__ returning "Money(amount, 'CUR')" (amount with 2 decimal places), __add__ allowing adding two Money instances of the same currency (raise ValueError("Currency mismatch") if different), and __eq__ comparing both amount and currency.`,
    starterCode: `class Money:
    # Write your solution here
    pass`,
    hints: [
      'In __init__: store round(float(amount), 2) and currency.upper().',
      'In __repr__: return f"Money({self.amount:.2f}, \'{self.currency}\')".',
      'In __add__: check currency match, return Money(self.amount + other.amount, self.currency).'
    ],
    solution: `class Money:
    def __init__(self, amount: float, currency: str):
        self.amount = round(float(amount), 2)
        self.currency = currency.upper()
        
    def __repr__(self) -> str:
        return f"Money({self.amount:.2f}, '{self.currency}')"
        
    def __add__(self, other):
        if not isinstance(other, Money) or self.currency != other.currency:
            raise ValueError("Currency mismatch")
        return Money(self.amount + other.amount, self.currency)
        
    def __eq__(self, other) -> bool:
        if not isinstance(other, Money):
            return False
        return self.amount == other.amount and self.currency == other.currency`,
    testCases: [
      { input: 'm1 = Money(10.50, "USD"); m2 = Money(5.25, "USD"); repr(m1 + m2)', expectedOutput: '"Money(15.75, \'USD\')"' }
    ]
  }
};

writePythonModuleFile(py6Path, m6.data, m6Lessons);
console.log('Python Module 6 completed! Authored:', Object.keys(m6Lessons).length);
