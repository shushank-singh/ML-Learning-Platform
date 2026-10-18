const path = require('path');
const { getExistingPyLessons } = require('./extract-landmarks');
const { writePythonModuleFile } = require('./writer');

// ==========================================
// Python Module 3: Built-in Data Structures
// ==========================================
const m3 = getExistingPyLessons(3);
const m3Lessons = { ...m3.lessons };

m3Lessons['py-ds-strings-methods'] = {
  id: 'py-ds-strings-methods',
  moduleId: 'python-module-3',
  title: 'Strings and String Methods',
  subtitle: 'Mastering split, join, strip, replace, format, and f-string Advanced Syntax',
  order: 1,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Understand string immutability in Python and why every method returns a new string.',
    'Master string manipulation methods: split(), join(), strip(), replace(), and find().',
    'Utilize string case and validation methods: upper(), lower(), startswith(), endswith(), isdigit().',
    'Leverage modern f-string interpolation including format specifiers and debugging syntax.'
  ],
  prerequisites: ['Python variable assignment and basic types.'],
  analogy: {
    title: 'The Inscribed Stone Tablet',
    text: 'A Python string is like a message carved into a stone tablet. You cannot erase or alter any single carved character in place. If you want to change an uppercase word or strip off trailing chips, a master stonemason carves a completely new tablet incorporating your revisions.',
    metaphor: 'Strings are immutable sequences: operations produce fresh objects, leaving originals untouched.'
  },
  problemSolved: {
    title: 'Robust Text Processing and Formatting',
    text: 'Raw textual data from logs, user inputs, and web requests is messy and unformatted. Python strings provide an extensive built-in standard library of methods for parsing, cleaning, transforming, and formatting text without external dependencies.',
    keyPoints: [
      'Strings are immutable unicode sequences indexed from 0 to N-1 (or -1 backwards).',
      'str.join() is significantly more memory-efficient (O(N)) than repeated string concatenation (O(N^2)).',
      'f-strings evaluate expressions at runtime with high performance.'
    ]
  },
  intuition: {
    overview: 'Python strings are sequences of unicode code points. String methods are pure functions that inspect the existing string and construct a new string based on the operation.',
    steps: [
      { step: 1, title: 'Inspect or Clean', description: 'strip() removes leading/trailing whitespace, and lower()/upper() standardizes casing.' },
      { step: 2, title: 'Tokenize or Substitute', description: 'split() segments text into a list of substrings, and replace() substitutes patterns.' },
      { step: 3, title: 'Reassemble or Format', description: 'join() concatenates elements with a delimiter, and f-strings interpolate variables.' }
    ]
  },
  codeExample: {
    title: 'Essential String Methods and f-string Formatting',
    code: `text = "  Data Science and Machine Learning  "
cleaned = text.strip().lower()
tokens = cleaned.split()
joined = "-".join(tokens)
pi = 3.14159265
formatted = f"Tags: {joined} | Precision: {pi:.2f}"
print(formatted)`,
    explanation: 'Demonstrates whitespace stripping, case normalization, splitting by whitespace, joining with hyphens, and float format specifiers.'
  },
  runnableCode: {
    code: `raw_log = "2026-10-18 | ERROR | Database connection timeout"
date, level, msg = [part.strip() for part in raw_log.split("|")]
print(f"Log Level: {level}")
print(f"Details: {msg.upper()}")
print(f"Date starts with 2026? {date.startswith('2026')}")`,
    expectedOutput: `Log Level: ERROR
Details: DATABASE CONNECTION TIMEOUT
Date starts with 2026? True`
  },
  lineByLine: [
    { line: 1, code: 'raw_log = "2026-10-18 | ERROR | Database connection timeout"', explanation: 'Initializes a pipe-delimited log entry string.' },
    { line: 2, code: 'date, level, msg = [part.strip() for part in raw_log.split("|")]', explanation: 'Splits on "|" and strips surrounding whitespace from each token via a comprehension.' },
    { line: 3, code: 'print(f"Log Level: {level}")', explanation: 'Formats string interpolating the extracted level variable.' },
    { line: 4, code: 'print(f"Details: {msg.upper()}")', explanation: 'Invokes upper() on msg to transform it to capital letters.' },
    { line: 5, code: 'print(f"Date starts with 2026? {date.startswith(\'2026\')}")', explanation: 'Checks prefix match returning a boolean.' }
  ],
  commonMistakes: [
    {
      mistake: 'Attempting to mutate string characters by index (s[0] = "X").',
      whyWrong: 'Python strings are immutable. Doing this raises TypeError: \'str\' object does not support item assignment.',
      howToFix: 'Create a new string using slicing or concatenation: s = "X" + s[1:].'
    },
    {
      mistake: 'Using repeated `+` concatenation inside loops to build large strings.',
      whyWrong: 'Creates an intermediate string at every step, resulting in O(N^2) memory copies.',
      howToFix: 'Collect substrings into a list and use `"".join(chunks)` for linear O(N) performance.'
    }
  ],
  realWorldApplications: [
    { title: 'Log File Ingestion', description: 'Parsing system logs into structured timestamps, levels, and payloads.' },
    { title: 'NLP Text Preprocessing', description: 'Tokenizing, lowercasing, and cleaning natural language corpora before vectorization.' }
  ],
  practiceQuestions: [
    { question: 'Why does "hello".upper() not change the original variable if we just call it?', hint: 'Consider string mutability.', answer: 'Strings are immutable. Calling .upper() returns a new string; you must reassign it (s = s.upper()) to update the variable.' },
    { question: 'What does ".".join(["a", "b", "c"]) output?', hint: 'The caller string is the delimiter placed between elements.', answer: 'It produces "a.b.c".' },
    { question: 'What is the syntax in an f-string to format a float with 4 decimal places?', hint: 'Colon followed by dot and precision.', answer: 'f"{value:.4f}"' }
  ],
  quiz: [
    {
      question: 'What is the result of "python".replace("p", "P")?',
      options: ['"Python"', 'None (in-place modification)', 'Raises TypeError', '"python"'],
      correctAnswer: 0,
      explanation: 'replace() returns a new string copy with the substitution made.'
    },
    {
      question: 'Which string method removes both leading and trailing whitespace?',
      options: ['trim()', 'strip()', 'clean()', 'rstrip()'],
      correctAnswer: 1,
      explanation: 'In Python, strip() removes leading and trailing whitespace (lstrip is leading only, rstrip trailing only).'
    },
    {
      question: 'What does the expression f"{10 * 5 = }" output in Python 3.8+?',
      options: ['"50"', '"10 * 5 = 50"', '"10 * 5"', 'SyntaxError'],
      correctAnswer: 1,
      explanation: 'The `=` specifier in f-strings outputs both the expression text and its evaluated result, making it great for debugging.'
    }
  ],
  codingChallenge: {
    title: 'Clean and Format CSV Header',
    difficulty: 'Beginner',
    description: 'Write a function `clean_header(raw_header: str) -> list[str]` that takes a comma-separated string of column names with inconsistent casing and extra spaces (e.g. " First Name , LAST_name , user-id "), strips extra spaces, replaces dashes with underscores, and converts all names to lowercase.',
    starterCode: `def clean_header(raw_header: str) -> list[str]:
    # Write your solution here
    pass`,
    hints: [
      'Split raw_header by "," to get individual column tokens.',
      'For each column token, use .strip(), .lower(), and .replace("-", "_").'
    ],
    solution: `def clean_header(raw_header: str) -> list[str]:
    return [col.strip().lower().replace("-", "_") for col in raw_header.split(",") if col.strip()]`,
    testCases: [
      { input: '" First Name , LAST_name , user-id "', expectedOutput: '["first name", "last_name", "user_id"]' }
    ]
  }
};

m3Lessons['py-ds-tuples'] = {
  id: 'py-ds-tuples',
  moduleId: 'python-module-3',
  title: 'Tuples and Immutability',
  subtitle: 'Tuple Creation, Packing, Unpacking, namedtuple, and Hashability',
  order: 3,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'data-structure-visual',
  objectives: [
    'Understand why tuples are immutable and memory-efficient compared to lists.',
    'Master tuple packing and multiple assignment unpacking.',
    'Understand why tuples can serve as dictionary keys while lists cannot.',
    'Use collections.namedtuple for lightweight readable data records.'
  ],
  prerequisites: ['Python variables and list basics.'],
  analogy: {
    title: 'The Permanent Passport Stamp',
    text: 'A list is a loose-leaf binder where you can add, remove, and shuffle pages anytime. A tuple is a stamped passport page: once inked and issued, its fields (entry date, location, stamp number) cannot be altered or reordered without voiding the document.',
    metaphor: 'Tuples represent fixed records: once created, the sequence and identities of their contents are locked.'
  },
  problemSolved: {
    title: 'Immutable Records and Safe Hash Keys',
    description: 'When functions need to return multiple values or map coordinates to values in a dictionary, mutable lists are unsafe because they cannot be hashed. Tuples provide a fast, memory-compact immutable collection.',
    keyPoints: [
      'Tuples use parentheses `()` or comma separation alone `a, b = 1, 2`.',
      'Single element tuples require a trailing comma: `(42,)`.',
      'Immutability allows tuples containing only immutable items to be hashed.'
    ]
  },
  intuition: {
    overview: 'Tuples have lower memory overhead than lists because Python allocates exact memory without over-allocation buffers. Immutability guarantees write-safety.',
    steps: [
      { step: 1, title: 'Packing', description: 'Multiple comma-separated values are packed into a single tuple object.' },
      { step: 2, title: 'Unpacking', description: 'Tuple elements are assigned to separate variables in a single expression.' },
      { step: 3, title: 'Hashing', description: 'Python computes an immutable hash code allowing tuples to index dictionaries and sets.' }
    ]
  },
  codeExample: {
    title: 'Tuple Unpacking and namedtuple Usage',
    code: `from collections import namedtuple

# Tuple packing & unpacking
point = (10, 20, 30)
x, y, z = point

# namedtuple for clean self-documenting data records
Point3D = namedtuple('Point3D', ['x', 'y', 'z'])
p = Point3D(x=10, y=20, z=30)
print(f"Point x={p.x}, y={p.y}, z={p.z}")`,
    explanation: 'Shows standard tuple unpacking followed by namedtuple creation and field access.'
  },
  runnableCode: {
    code: `coords = (37.7749, -122.4194)
lat, lon = coords
print(f"Latitude: {lat}, Longitude: {lon}")

# Using a tuple as a dict key
locations = {
    (37.7749, -122.4194): "San Francisco",
    (40.7128, -74.0060): "New York City"
}
print(f"Located: {locations[(37.7749, -122.4194)]}")`,
    expectedOutput: `Latitude: 37.7749, Longitude: -122.4194
Located: San Francisco`
  },
  lineByLine: [
    { line: 1, code: 'coords = (37.7749, -122.4194)', explanation: 'Creates a 2-tuple of floating point coordinates.' },
    { line: 2, code: 'lat, lon = coords', explanation: 'Unpacks the tuple into two separate identifiers.' },
    { line: 3, code: 'print(f"Latitude: {lat}, Longitude: {lon}")', explanation: 'Prints the unpacked coordinate components.' },
    { line: 6, code: 'locations = { (37.7749, -122.4194): "San Francisco" }', explanation: 'Uses tuple as dictionary key; valid because tuples are hashable.' }
  ],
  commonMistakes: [
    {
      mistake: 'Writing single-element tuple without a trailing comma: `x = (42)`.',
      whyWrong: 'Parentheses around an expression without a comma are treated as grouping; `(42)` is simply an `int`.',
      howToFix: 'Include a trailing comma: `x = (42,)`.'
    },
    {
      mistake: 'Believing a tuple is immutable when it contains mutable elements like a list.',
      whyWrong: 'The tuple holds references to objects. While the references cannot change, the mutable objects they point to can still be modified in place.',
      howToFix: 'Ensure all nested elements inside tuples are also immutable if hashability is needed.'
    }
  ],
  realWorldApplications: [
    { title: 'Multiple Return Values', description: 'Returning status codes, error messages, and payload tuples from API handlers.' },
    { title: 'Coordinate & Grid Keys', description: 'Using (row, col) tuples as keys for graphs, game boards, and sparse matrices.' }
  ],
  practiceQuestions: [
    { question: 'What type is `x = (1)` vs `y = (1,)`?', hint: 'Check the presence of comma.', answer: '`x` is an integer `int`, while `y` is a 1-element `tuple`.' },
    { question: 'Can a tuple containing a list `([1, 2], 3)` be used as a dictionary key?', hint: 'Check hashability of elements.', answer: 'No, TypeError: unhashable type: \'list\' will be raised because the tuple contains an unhashable mutable list.' },
    { question: 'How can you swap two variables `a` and `b` in Python using tuple packing?', hint: 'One line multiple assignment.', answer: '`a, b = b, a` packs `(b, a)` into a temporary tuple and unpacks into `a` and `b`.' }
  ],
  quiz: [
    {
      question: 'Which of the following is an immutable sequence in Python?',
      options: ['tuple', 'list', 'set', 'dict'],
      correctAnswer: 0,
      explanation: 'Tuples are immutable sequences; lists, sets, and dicts are all mutable.'
    },
    {
      question: 'What happens if you run: `t = (1, 2, 3); t[0] = 99`?',
      options: ['t becomes (99, 2, 3)', 'TypeError is raised', 'ValueError is raised', 't is unmodified silently'],
      correctAnswer: 1,
      explanation: 'Tuples do not support item assignment; Python raises TypeError.'
    },
    {
      question: 'Why do tuples take less memory than lists for the same elements?',
      options: ['Tuples compress their data', 'Lists allocate extra capacity buffer for dynamic appends', 'Tuples store 16-bit pointers', 'Python caches all tuples'],
      correctAnswer: 1,
      explanation: 'Lists are dynamic arrays and over-allocate memory to achieve amortized O(1) appends, whereas tuples allocate exact length.'
    }
  ],
  codingChallenge: {
    title: 'Format Named Coordinates',
    difficulty: 'Beginner',
    description: 'Write a function `format_cities(city_tuples: list[tuple[str, float, float]]) -> list[str]` where each tuple is `(city_name, lat, lon)`. Return a list of formatted strings: `"CityName: (Lat, Lon)"` rounded to 2 decimal places.',
    starterCode: `def format_cities(city_tuples: list[tuple[str, float, float]]) -> list[str]:
    # Write your solution here
    pass`,
    hints: [
      'Iterate through city_tuples unpacking (city, lat, lon).',
      'Use f-string f"{city}: ({lat:.2f}, {lon:.2f})".'
    ],
    solution: `def format_cities(city_tuples: list[tuple[str, float, float]]) -> list[str]:
    return [f"{city}: ({lat:.2f}, {lon:.2f})" for city, lat, lon in city_tuples]`,
    testCases: [
      { input: '[("Paris", 48.8566, 2.3522)]', expectedOutput: '["Paris: (48.86, 2.35)"]' }
    ]
  }
};

m3Lessons['py-ds-sets'] = {
  id: 'py-ds-sets',
  moduleId: 'python-module-3',
  title: 'Sets and Set Operations',
  subtitle: 'O(1) Membership Testing, Set Theory Operations, and frozenset',
  order: 4,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'data-structure-visual',
  objectives: [
    'Understand how sets use hash tables for O(1) average-time lookups and insertions.',
    'Master mathematical set operations: union (|), intersection (&), difference (-), and symmetric difference (^).',
    'Remove duplicates from sequences efficiently using set().',
    'Understand when and why to use immutable frozenset.'
  ],
  prerequisites: ['Python lists and hashing intuition.'],
  analogy: {
    title: 'The VIP Guest Registry',
    text: 'A list of party guests is like a paper clipboard where the bouncer must read every name from top to bottom (O(N)) to check if you are allowed in. A set is like a digital biometric scanner with a hash registry: the bouncer scans your fingerprint and in a millisecond know whether you are on the list (O(1)).',
    metaphor: 'Sets store unique hashable items with near-instant O(1) lookup.'
  },
  problemSolved: {
    title: 'Instant Deduplication and Fast Membership Checks',
    description: 'Checking `item in my_list` takes O(N) time, making it quadratic O(N^2) for batch checks. Sets provide average O(1) membership testing and concise mathematical operations for data comparison.',
    keyPoints: [
      'Sets contain only unique items; duplicates are automatically discarded.',
      'Set elements must be hashable (immutable types like int, str, tuple).',
      'frozenset is an immutable variant of set that can be hashed and nested.'
    ]
  },
  intuition: {
    overview: 'A set is essentially a hash map where keys are stored without associated values. Python computes hash(item) to place it into an internal hash table.',
    steps: [
      { step: 1, title: 'Hash Computation', description: 'item hash code is computed and mapped to an internal bucket index.' },
      { step: 2, title: 'Collision Handling', description: 'Open addressing with perturbation probing resolves any hash collisions.' },
      { step: 3, title: 'O(1) Set Math', description: 'Intersection and union perform fast bucket lookups across two sets.' }
    ]
  },
  codeExample: {
    title: 'Set Operations and Operators',
    code: `backend_devs = {"Alice", "Bob", "Charlie"}
frontend_devs = {"Bob", "Diana", "Eve"}

# Set Theory Operations
all_devs = backend_devs | frontend_devs           # Union
fullstack_devs = backend_devs & frontend_devs      # Intersection
pure_backend = backend_devs - frontend_devs        # Difference
single_specialty = backend_devs ^ frontend_devs    # Symmetric Difference

print(f"Fullstack: {fullstack_devs}")
print(f"Backend only: {pure_backend}")`,
    explanation: 'Demonstrates the standard mathematical operators for union, intersection, difference, and symmetric difference.'
  },
  runnableCode: {
    code: `nums = [1, 2, 2, 3, 4, 4, 4, 5]
unique_nums = set(nums)
print(f"Unique count: {len(unique_nums)}")
print(f"Is 3 present? {3 in unique_nums}")

s1 = {1, 2, 3}
s2 = {3, 4, 5}
print(f"Common elements: {s1.intersection(s2)}")`,
    expectedOutput: `Unique count: 5
Is 3 present? True
Common elements: {3}`
  },
  lineByLine: [
    { line: 1, code: 'nums = [1, 2, 2, 3, 4, 4, 4, 5]', explanation: 'A list containing multiple duplicate integers.' },
    { line: 2, code: 'unique_nums = set(nums)', explanation: 'Converts list to set, eliminating all duplicates in O(N) time.' },
    { line: 3, code: 'print(f"Unique count: {len(unique_nums)}")', explanation: 'Prints the number of distinct elements (5).' },
    { line: 4, code: 'print(f"Is 3 present? {3 in unique_nums}")', explanation: 'Checks membership in average O(1) time.' }
  ],
  commonMistakes: [
    {
      mistake: 'Creating an empty set using `{}`: `empty = {}`.',
      whyWrong: '`{}` creates an empty dictionary `dict`, not a set.',
      howToFix: 'Always use `empty = set()` to instantiate an empty set.'
    },
    {
      mistake: 'Attempting to store a list inside a set: `s = {[1, 2], [3, 4]}`.',
      whyWrong: 'Lists are mutable and unhashable, raising `TypeError: unhashable type: \'list\'`.',
      howToFix: 'Use tuples for nested sequence data: `s = {(1, 2), (3, 4)}`.'
    }
  ],
  realWorldApplications: [
    { title: 'Duplicate Filtering', description: 'Deduplicating millions of product IDs or user queries in data pipelines.' },
    { title: 'Permission Checking', description: 'Calculating role unions and intersection with required feature flags.' }
  ],
  practiceQuestions: [
    { question: 'What is the average time complexity of checking `item in my_set`?', hint: 'Hash table lookup time.', answer: 'O(1) average time.' },
    { question: 'How do you create an immutable set in Python?', hint: 'Special built-in type name.', answer: 'Use `frozenset([1, 2, 3])`.' },
    { question: 'What does `A ^ B` compute for two sets?', hint: 'Elements in A or B, but not both.', answer: 'Symmetric difference: elements that belong to either A or B, but not both.' }
  ],
  quiz: [
    {
      question: 'What is `type({})` in Python?',
      options: ['set', 'dict', 'frozenset', 'tuple'],
      correctAnswer: 1,
      explanation: '`{}` creates an empty dict; use `set()` to create an empty set.'
    },
    {
      question: 'What happens when you add a duplicate item to an existing set?',
      options: ['ValueError is raised', 'It silently does nothing', 'It overwrites the set', 'It raises KeyError'],
      correctAnswer: 1,
      explanation: 'Sets enforce uniqueness; adding an element that already exists is a silent no-op.'
    },
    {
      question: 'Which operation finds elements that exist in Set A but NOT in Set B?',
      options: ['A | B', 'A & B', 'A - B', 'A ^ B'],
      correctAnswer: 2,
      explanation: 'The difference operator `A - B` returns elements in A that are not in B.'
    }
  ],
  codingChallenge: {
    title: 'Find Common and Unique Words',
    difficulty: 'Beginner',
    description: 'Write a function `analyze_texts(text1: str, text2: str) -> dict[str, set[str]]` that parses two strings into sets of lowercase words, and returns a dictionary with keys: `"common"` (words in both), `"only_first"` (words only in text1), and `"total_unique"` (all distinct words across both).',
    starterCode: `def analyze_texts(text1: str, text2: str) -> dict[str, set[str]]:
    # Write your solution here
    pass`,
    hints: [
      'Split texts into sets using set(text.lower().split()).',
      'Use & for common, - for only_first, and | for total_unique.'
    ],
    solution: `def analyze_texts(text1: str, text2: str) -> dict[str, set[str]]:
    s1 = set(text1.lower().split())
    s2 = set(text2.lower().split())
    return {
        "common": s1 & s2,
        "only_first": s1 - s2,
        "total_unique": s1 | s2
    }`,
    testCases: [
      { input: '"apple banana orange", "banana grape apple"', expectedOutput: '{"common": {"apple", "banana"}, "only_first": {"orange"}, "total_unique": {"apple", "banana", "grape", "orange"}}' }
    ]
  }
};

m3Lessons['py-ds-dictionaries'] = {
  id: 'py-ds-dictionaries',
  moduleId: 'python-module-3',
  title: 'Dictionaries: Key-Value Storage',
  subtitle: 'Hash Tables, get(), update(), items(), defaultdict, and Counter',
  order: 5,
  readTimeMinutes: 25,
  difficulty: 'Beginner',
  visualizerType: 'data-structure-visual',
  objectives: [
    'Understand how Python dictionaries implement compact hash tables with insertion order preservation.',
    'Safely query keys with .get(key, default) avoiding KeyError exceptions.',
    'Iterate over dictionaries using .keys(), .values(), and .items().',
    'Leverage collections.defaultdict and collections.Counter for frequency counting and grouping.'
  ],
  prerequisites: ['Python basics and set hashability.'],
  analogy: {
    title: 'The Coat Check Counter',
    text: 'When you check your coat at a theater, the attendant hands you a brass ticket with number #142 (the key). When you return, they don\'t search every hanger in the closet; they walk directly to hanger #142 and retrieve your jacket (the value).',
    metaphor: 'Keys provide immediate O(1) retrieval of mapped values.'
  },
  problemSolved: {
    title: 'Instant Associative Lookup by Arbitrary Keys',
    description: 'Lists only allow integer index lookups. Dictionaries allow indexing by any immutable type (strings, numbers, tuples), providing the cornerstone associative data structure for Python applications.',
    keyPoints: [
      'Since Python 3.7+, standard dicts guarantee insertion order preservation.',
      'Keys must be hashable; values can be any Python object including nested dicts.',
      'Average time complexity for lookup, insertion, and deletion is O(1).'
    ]
  },
  intuition: {
    overview: 'CPython uses a compact hash table layout: an array of hash table indices mapping into a dense array of [hash, key, value] entries, minimizing memory waste.',
    steps: [
      { step: 1, title: 'Key Hashing', description: 'hash(key) computes a 64-bit integer index.' },
      { step: 2, title: 'Array Lookup', description: 'Direct lookup into sparse indices array identifies dense entry index.' },
      { step: 3, title: 'Value Retrieval', description: 'Value reference is returned in O(1) time.' }
    ]
  },
  codeExample: {
    title: 'Dictionary Manipulation and collections.defaultdict',
    code: `from collections import defaultdict, Counter

# Safe lookup and updates
user = {"name": "Alex", "role": "admin"}
age = user.get("age", 25) # Returns 25 instead of raising KeyError

# Frequency counting with Counter
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(words)
print(f"Most common: {counts.most_common(1)}")

# Grouping with defaultdict
grouped = defaultdict(list)
for word in words:
    grouped[len(word)].append(word)
print(f"Grouped by length: {dict(grouped)}")`,
    explanation: 'Demonstrates get() with defaults, Counter for frequency tallies, and defaultdict for grouping.'
  },
  runnableCode: {
    code: `inventory = {"apples": 10, "oranges": 5}
inventory["bananas"] = 12 # Insertion
inventory["apples"] += 3  # In-place update

for fruit, count in inventory.items():
    print(f"{fruit}: {count} in stock")

# Checking key existence
print(f"Has grapes? {'grapes' in inventory}")`,
    expectedOutput: `apples: 13 in stock
oranges: 5 in stock
bananas: 12 in stock
Has grapes? False`
  },
  lineByLine: [
    { line: 1, code: 'inventory = {"apples": 10, "oranges": 5}', explanation: 'Creates a dictionary mapping fruit names to quantity integers.' },
    { line: 2, code: 'inventory["bananas"] = 12', explanation: 'Inserts new key "bananas" in O(1) average time.' },
    { line: 3, code: 'inventory["apples"] += 3', explanation: 'Reads current count, increments by 3, and updates in-place.' },
    { line: 5, code: 'for fruit, count in inventory.items():', explanation: 'Iterates key-value tuples yielding each fruit and count.' },
    { line: 8, code: 'print(f"Has grapes? {\'grapes\' in inventory}")', explanation: 'Checks key presence in O(1) time without raising KeyError.' }
  ],
  commonMistakes: [
    {
      mistake: 'Accessing missing keys directly with square brackets: `d["missing"]`.',
      whyWrong: 'Raises KeyError crashing the program if key is absent.',
      howToFix: 'Use `d.get("missing", default_val)` or `if "missing" in d:`.'
    },
    {
      mistake: 'Modifying dictionary keys during direct iteration over the dictionary.',
      whyWrong: 'Raises `RuntimeError: dictionary changed size during iteration`.',
      howToFix: 'Iterate over a copy of keys: `for k in list(d.keys()):`.'
    }
  ],
  realWorldApplications: [
    { title: 'JSON / REST APIs', description: 'Encoding request payloads and serializing database records.' },
    { title: 'Caching & Memoization', description: 'Storing expensive function outputs keyed by function argument tuples.' }
  ],
  practiceQuestions: [
    { question: 'What does `d.setdefault(key, default)` do?', hint: 'Returns existing value or sets it if absent.', answer: 'If key is in dict, returns its value. If not, inserts key with default and returns default.' },
    { question: 'What is the difference between dict.keys() and list(dict.keys())?', hint: 'View object vs copy.', answer: 'dict.keys() returns a dynamic dictionary view reflecting changes; list(dict.keys()) creates an independent static snapshot list.' },
    { question: 'Can a list be used as a dictionary key?', hint: 'Recall hashability requirements.', answer: 'No, lists are mutable and unhashable; Python raises TypeError: unhashable type: \'list\'.' }
  ],
  quiz: [
    {
      question: 'What is the time complexity of looking up a key in a Python dict on average?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      correctAnswer: 0,
      explanation: 'Hash table lookups take O(1) average time.'
    },
    {
      question: 'What does `d.get("unknown", "default")` return if "unknown" is NOT present?',
      options: ['None', 'KeyError', '"default"', 'False'],
      correctAnswer: 2,
      explanation: 'dict.get(k, default) returns the fallback argument when k is missing.'
    },
    {
      question: 'How are keys ordered when iterating over a dictionary in Python 3.7+?',
      options: ['Alphabetical order', 'Hash code order', 'Insertion order', 'Arbitrary order'],
      correctAnswer: 2,
      explanation: 'Python 3.7+ language specification guarantees dictionary iteration order matches insertion order.'
    }
  ],
  codingChallenge: {
    title: 'Character Frequency Analyzer',
    difficulty: 'Beginner',
    description: 'Write a function `char_frequency(s: str) -> dict[str, int]` that takes a string, ignores spaces and punctuation, treats letters case-insensitively, and returns a dictionary of character frequencies sorted alphabetically by character.',
    starterCode: `def char_frequency(s: str) -> dict[str, int]:
    # Write your solution here
    pass`,
    hints: [
      'Filter characters using char.isalpha().',
      'Use collections.Counter or standard dict loop.',
      'Return dict(sorted(freq.items())).'
    ],
    solution: `def char_frequency(s: str) -> dict[str, int]:
    counts = {}
    for char in s.lower():
        if char.isalpha():
            counts[char] = counts.get(char, 0) + 1
    return dict(sorted(counts.items()))`,
    testCases: [
      { input: '"Hello, World!"', expectedOutput: '{"d": 1, "e": 1, "h": 1, "l": 3, "o": 2, "r": 1, "w": 1}' }
    ]
  }
};

m3Lessons['py-ds-slicing'] = {
  id: 'py-ds-slicing',
  moduleId: 'python-module-3',
  title: 'Slicing and Unpacking',
  subtitle: 'Extended Slice Notation [start:stop:step], Starred Unpacking, and Swaps',
  order: 6,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Master the slice syntax [start:stop:step] including negative step reversals.',
    'Understand slice semantics: half-open intervals [start, stop) and automatic clamping.',
    'Use starred unpacking (*rest) to capture variadic sequence elements.',
    'Perform in-place multi-variable assignments and swapping without temporary variables.'
  ],
  prerequisites: ['Python lists and indexing basics.'],
  analogy: {
    title: 'The Film Strip Cutter',
    text: 'A movie editor has a strip of 35mm film numbered frames 0 to 100. Slicing is like marking "start at frame 10, cut before frame 30, and take every 2nd frame". The original reel remains intact while a new highlight reel is created.',
    metaphor: '[start:stop:step] defines half-open intervals to extract new sub-sequences.'
  },
  problemSolved: {
    title: 'Concise Sequence Subsetting and Variable Binding',
    text: 'Subsetting arrays in traditional languages requires verbose for-loops with index counters. Python slicing and unpacking condense extraction, reversing, and multi-variable assignments into single readable expressions.',
    keyPoints: [
      'Slices never raise IndexError when indices exceed sequence boundaries; they clamp safely.',
      '`seq[::-1]` creates a reversed copy of the sequence.',
      'Starred unpacking `first, *middle, last = seq` extracts arbitrary partitions.'
    ]
  },
  intuition: {
    overview: 'A slice creates a slice object `slice(start, stop, step)` that instructs the sequence to extract references into a new collection of the same type.',
    steps: [
      { step: 1, title: 'Bound Resolution', description: 'Start defaults to 0 (or end for negative step), stop to len(seq), step to 1.' },
      { step: 2, title: 'Index Progression', description: 'Indices advance by step until reaching or exceeding stop.' },
      { step: 3, title: 'New Sequence Construction', description: 'Extracted items are collected into a fresh list, tuple, or string.' }
    ]
  },
  codeExample: {
    title: 'Advanced Slicing and Starred Expressions',
    code: `data = [10, 20, 30, 40, 50, 60, 70]

# Subsetting and reversing
first_three = data[:3]
every_other = data[::2]
reversed_data = data[::-1]

# Starred unpacking
head, *middle, tail = data
print(f"Head: {head}, Middle: {middle}, Tail: {tail}")`,
    explanation: 'Shows half-open slice intervals, step jumping, sequence reversal, and starred unpacking.'
  },
  runnableCode: {
    code: `msg = "PythonMastery"
print("Reversed:", msg[::-1])
print("Middle chars:", msg[6:13])

nums = list(range(1, 10))
first, *rest = nums
print(f"First: {first}")
print(f"Rest: {rest}")`,
    expectedOutput: `Reversed: yretsaMnohtyP
Middle chars: Mastery
First: 1
Rest: [2, 3, 4, 5, 6, 7, 8, 9]`
  },
  lineByLine: [
    { line: 1, code: 'msg = "PythonMastery"', explanation: 'Creates a 13-character string.' },
    { line: 2, code: 'print("Reversed:", msg[::-1])', explanation: 'Steps through string with step=-1, creating a reversed copy.' },
    { line: 3, code: 'print("Middle chars:", msg[6:13])', explanation: 'Extracts indices 6 up to (exclusive) 13, printing "Mastery".' },
    { line: 6, code: 'first, *rest = nums', explanation: 'Unpacks first element into first, collecting remaining elements into list rest.' }
  ],
  commonMistakes: [
    {
      mistake: 'Expecting `lst[start:stop]` to include the element at index `stop`.',
      whyWrong: 'Python slices are half-open intervals: index `stop` is strictly excluded.',
      howToFix: 'If you need element at index k included, use `lst[start:k+1]`.'
    },
    {
      mistake: 'Using multiple starred variables in a single assignment: `*a, *b = lst`.',
      whyWrong: 'Raises `SyntaxError: two starred expressions in assignment` because lengths would be ambiguous.',
      howToFix: 'Only one starred expression is allowed per assignment statement.'
    }
  ],
  realWorldApplications: [
    { title: 'Time Series Batching', description: 'Windowing rolling historical price samples for machine learning model training.' },
    { title: 'Header/Footer Record Splitting', description: 'Separating CSV headers, metadata trailers, and body records.' }
  ],
  practiceQuestions: [
    { question: 'What does `nums[:]` do when applied to a list?', hint: 'Think about copying.', answer: 'It creates a shallow copy of the entire list.' },
    { question: 'What is the result of `"hello"[100:200]`?', hint: 'Do slices raise IndexError?', answer: 'It returns an empty string `""` without raising an error because slices clamp indices.' },
    { question: 'How can you unpack the first two elements and discard the rest of a list?', hint: 'Underscore convention with starred unpacking.', answer: '`a, b, *_ = my_list`.' }
  ],
  quiz: [
    {
      question: 'What is the output of `[0, 1, 2, 3, 4, 5][1:5:2]`?',
      options: ['[1, 3]', '[1, 3, 5]', '[2, 4]', '[1, 2, 3, 4]'],
      correctAnswer: 0,
      explanation: 'Starts at index 1 (val 1), steps by 2 to index 3 (val 3). Next would be index 5, which is excluded by stop=5.'
    },
    {
      question: 'Which slice expression reverses a string `s`?',
      options: ['s[-1:0]', 's[::-1]', 's.reverse()', 's[-1::-1]'],
      correctAnswer: 1,
      explanation: '`s[::-1]` steps backwards through the entire sequence, returning a reversed copy.'
    },
    {
      question: 'Given `a, *b, c = [1, 2, 3, 4]`, what is `b`?',
      options: ['(2, 3)', '[2, 3]', '2', '[2, 3, 4]'],
      correctAnswer: 1,
      explanation: 'Starred unpacking always gathers the middle elements into a list: `[2, 3]`.'
    }
  ],
  codingChallenge: {
    title: 'Palindrome and Center Extractor',
    difficulty: 'Intermediate',
    description: 'Write a function `process_sequence(seq: list[int]) -> tuple[bool, list[int]]` that checks if the list is a palindrome (reads identically forwards and backwards), and returns a tuple `(is_palindrome, middle_elements)` where `middle_elements` excludes the first and last elements (or empty if length < 3).',
    starterCode: `def process_sequence(seq: list[int]) -> tuple[bool, list[int]]:
    # Write your solution here
    pass`,
    hints: [
      'Compare seq with seq[::-1] for palindrome check.',
      'Use seq[1:-1] to extract middle elements when len(seq) >= 3.'
    ],
    solution: `def process_sequence(seq: list[int]) -> tuple[bool, list[int]]:
    is_palindrome = seq == seq[::-1]
    middle = seq[1:-1] if len(seq) >= 3 else []
    return (is_palindrome, middle)`,
    testCases: [
      { input: '[1, 2, 3, 2, 1]', expectedOutput: '(True, [2, 3, 2])' },
      { input: '[1, 2, 3, 4]', expectedOutput: '(False, [2, 3])' }
    ]
  }
};

m3Lessons['py-ds-mutability'] = {
  id: 'py-ds-mutability',
  moduleId: 'python-module-3',
  title: 'Mutability and Immutability',
  subtitle: 'Mutable vs Immutable Types, Memory ID, and Unexpected Aliasing Bugs',
  order: 7,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'memory-model',
  objectives: [
    'Distinguish between mutable types (list, dict, set) and immutable types (int, float, str, tuple, frozenset).',
    'Understand object identity using id() and the `is` operator versus value equality (`==`).',
    'Diagnose unexpected aliasing bugs where modifying one variable changes another.',
    'Recognize mutable default argument bugs in function definitions.'
  ],
  prerequisites: ['Python variables and data structures.'],
  analogy: {
    title: 'The Shared Whiteboard vs The Printed Book',
    text: 'A mutable object (like a list) is a dry-erase whiteboard on an office wall. If three employees have sticky notes with the room number (pointers), any employee writing on the whiteboard immediately changes what the other two see. An immutable object (like an integer) is a printed book: you cannot alter page 4; you can only buy a different book.',
    metaphor: 'Variables are name tags bound to objects in heap memory, not storage boxes themselves.'
  },
  problemSolved: {
    title: 'Eliminating Silent State Corruption Bugs',
    description: 'The number one source of beginner-to-intermediate Python bugs is assuming assignment creates independent copies. Understanding Python\'s reference model is critical for writing bug-free systems.',
    keyPoints: [
      '`a = b` never copies an object; it binds the identifier `a` to the same object as `b`.',
      '`is` checks memory address identity `id(a) == id(b)`; `==` checks value equality.',
      'Immutable objects guarantee thread-safety and hash integrity.'
    ]
  },
  intuition: {
    overview: 'In Python, everything is an object. Variables are pointers in the local frame namespace that reference heap-allocated PyObject structs.',
    steps: [
      { step: 1, title: 'Binding', description: 'Variable assignment binds a name in the namespace to an object memory address.' },
      { step: 2, title: 'Mutation', description: 'Calling `.append()` mutates the underlying PyObject in place without changing its address.' },
      { step: 3, title: 'Re-binding', description: 'Reassigning `x = x + 1` creates a new PyObject and binds the identifier to the new address.' }
    ]
  },
  codeExample: {
    title: 'Demonstrating Aliasing and Object Identity',
    code: `a = [1, 2, 3]
b = a  # Aliasing: both names reference the SAME list

b.append(4)
print("a:", a) # a is modified! [1, 2, 3, 4]
print("a is b:", a is b) # True: same id()

# Immutable behavior
x = 1000
y = x
y += 1
print(f"x: {x}, y: {y}") # x remains 1000, y points to a new int object`,
    explanation: 'Demonstrates list aliasing where mutating b alters a, contrasted with immutable integer rebinding.'
  },
  runnableCode: {
    code: `def add_item(item, lst=[]): # DANGEROUS: mutable default
    lst.append(item)
    return lst

print(add_item("A"))
print(add_item("B")) # Returns ["A", "B"] because the default list is shared!`,
    expectedOutput: `['A']
['A', 'B']`
  },
  lineByLine: [
    { line: 1, code: 'def add_item(item, lst=[]):', explanation: 'Defines function with default parameter lst bound to a single list created at function definition time.' },
    { line: 2, code: '    lst.append(item)', explanation: 'Appends to the shared default list across repeated calls.' },
    { line: 5, code: 'print(add_item("A"))', explanation: 'First call mutates default list to ["A"].' },
    { line: 6, code: 'print(add_item("B"))', explanation: 'Second call appends to the same list instance, returning ["A", "B"].' }
  ],
  commonMistakes: [
    {
      mistake: 'Using a mutable object (list or dict) as a default parameter in a function definition.',
      whyWrong: 'Default arguments are evaluated once when the function is defined, not every time it is called. State persists across invocations.',
      howToFix: 'Use `None` as the default: `def add_item(item, lst=None): if lst is None: lst = []`.'
    },
    {
      mistake: 'Multiplying a list of lists to create a 2D matrix: `grid = [[0] * 3] * 3`.',
      whyWrong: 'Creates an outer list containing 3 references to the EXACT same inner list row. Modifying grid[0][0] alters all rows.',
      howToFix: 'Use a list comprehension: `grid = [[0] * 3 for _ in range(3)]`.'
    }
  ],
  realWorldApplications: [
    { title: 'Concurrent Programming', description: 'Preventing race conditions by passing immutable tuples and frozen dataclasses between threads.' },
    { title: 'Database ORM Models', description: 'Tracking dirty states and change detection in SQLAlchemy.' }
  ],
  practiceQuestions: [
    { question: 'What is the output of `a = [1]; b = [1]; print(a == b, a is b)`?', hint: 'Difference between value and identity.', answer: '`True False`. They have equal values (`==`), but reside at distinct memory locations (`is`).' },
    { question: 'Why does Python allow tuples to be dict keys, but not lists?', hint: 'Hash value consistency.', answer: 'Dict keys must be hashable. If a key could mutate, its hash would change, breaking lookup integrity in the hash table.' },
    { question: 'How can you inspect the unique memory address of a Python object?', hint: 'Standard built-in function.', answer: 'Using the `id(obj)` built-in function.' }
  ],
  quiz: [
    {
      question: 'Which of the following types is mutable in Python?',
      options: ['str', 'tuple', 'list', 'int'],
      correctAnswer: 2,
      explanation: 'Lists are mutable; str, tuple, and int are all immutable.'
    },
    {
      question: 'What happens when `x = (1, [2, 3])` executes `x[1].append(4)`?',
      options: ['TypeError is raised', 'x becomes (1, [2, 3, 4])', 'A new tuple is created', 'SyntaxError is raised'],
      correctAnswer: 1,
      explanation: 'The tuple holds a reference to the list. While the tuple reference cannot be changed, the list itself is mutable and appends 4.'
    },
    {
      question: 'What is the correct idiom for an optional list parameter in a function?',
      options: ['def f(lst=[]):', 'def f(lst=list()):', 'def f(lst=None):', 'def f(lst=copy([])):'],
      correctAnswer: 2,
      explanation: 'Using `lst=None` and initializing `if lst is None: lst = []` inside the function avoids shared state bugs.'
    }
  ],
  codingChallenge: {
    title: 'Create Safe 2D Matrix',
    difficulty: 'Intermediate',
    description: 'Write a function `create_matrix(rows: int, cols: int, initial_value: int) -> list[list[int]]` that creates an independent 2D grid such that modifying `grid[0][0] = 99` does NOT alter any other row.',
    starterCode: `def create_matrix(rows: int, cols: int, initial_value: int) -> list[list[int]]:
    # Write your solution here
    pass`,
    hints: [
      'Do not use multiplication of rows `[[val] * cols] * rows`.',
      'Use nested list comprehensions: [[initial_value for _ in range(cols)] for _ in range(rows)].'
    ],
    solution: `def create_matrix(rows: int, cols: int, initial_value: int) -> list[list[int]]:
    return [[initial_value for _ in range(cols)] for _ in range(rows)]`,
    testCases: [
      { input: '2, 3, 0', expectedOutput: '[[0, 0, 0], [0, 0, 0]]' }
    ]
  }
};

m3Lessons['py-ds-copying'] = {
  id: 'py-ds-copying',
  moduleId: 'python-module-3',
  title: 'Copying and References',
  subtitle: 'Assignment vs Shallow Copy vs Deep Copy (copy.copy vs copy.deepcopy)',
  order: 8,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'memory-model',
  objectives: [
    'Distinguish between variable assignment, shallow copying, and deep copying.',
    'Understand how shallow copies duplicate container structures but reuse references to nested objects.',
    'Use copy.copy() and list slicing (`lst[:]`) for shallow copies.',
    'Use copy.deepcopy() to recursively duplicate nested compound objects.'
  ],
  prerequisites: ['Python mutability and data structures.'],
  analogy: {
    title: 'The Address Book Photocopy',
    text: 'Imagine an address book where each entry has a person\'s name and a locker combination to a physical storage locker. A shallow copy is like photocopying the paper pages: you have your own notebook, but both notebooks still list the EXACT same physical locker combinations. If your friend empties locker #5, your locker #5 is also empty. A deep copy builds an entirely duplicate warehouse and copies the contents into new lockers.',
    metaphor: 'Shallow copy duplicates container pointers; deep copy recursively clones every nested object.'
  },
  problemSolved: {
    title: 'Preventing Unintended Side-Effects in Nested Data',
    description: 'When processing configuration trees, game states, or JSON documents, functions need to modify data structures without altering the original inputs. Choosing the correct copying strategy prevents hard-to-detect state mutations.',
    keyPoints: [
      'Simple assignment `b = a` creates no copy.',
      'Shallow copy (`a.copy()`, `copy.copy()`, `a[:]`) clones the outer container only.',
      'Deep copy (`copy.deepcopy()`) clones the container and all nested objects recursively.'
    ]
  },
  intuition: {
    overview: 'Python\'s standard `copy` module inspects objects and dynamically constructs copies depending on whether shallow or deep traversal is requested.',
    steps: [
      { step: 1, title: 'Assignment', description: 'Reuses existing pointer; both variables point to the same memory address.' },
      { step: 2, title: 'Shallow Copy', description: 'Allocates a new container object, copying pointer addresses of each member.' },
      { step: 3, title: 'Deep Copy', description: 'Maintains a memoization dict of copied objects to handle recursive references and clones all children.' }
    ]
  },
  codeExample: {
    title: 'Comparing Shallow and Deep Copies',
    code: `import copy

original = [[1, 2, 3], [4, 5, 6]]

shallow = copy.copy(original)
deep = copy.deepcopy(original)

# Modify nested element
original[0][0] = 999

print("Shallow copied nested:", shallow[0][0]) # 999 (affected!)
print("Deep copied nested:", deep[0][0])       # 1   (isolated!)`,
    explanation: 'Demonstrates that shallow copies share nested sub-lists while deepcopy recursively creates independent copies.'
  },
  runnableCode: {
    code: `import copy

user_config = {"theme": "dark", "plugins": ["git", "linter"]}
clone = copy.deepcopy(user_config)

clone["plugins"].append("docker")
print("Original plugins:", user_config["plugins"])
print("Clone plugins:", clone["plugins"])`,
    expectedOutput: `Original plugins: ['git', 'linter']
Clone plugins: ['git', 'linter', 'docker']`
  },
  lineByLine: [
    { line: 1, code: 'import copy', explanation: 'Imports the standard library copy module.' },
    { line: 3, code: 'user_config = {"theme": "dark", "plugins": ["git", "linter"]}', explanation: 'Creates a dictionary with a nested mutable list.' },
    { line: 4, code: 'clone = copy.deepcopy(user_config)', explanation: 'Creates an independent deep copy of both dictionary and the nested list.' },
    { line: 6, code: 'clone["plugins"].append("docker")', explanation: 'Mutates cloned nested list without touching user_config.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assuming `dict.copy()` or `lst[:]` produces a fully independent deep copy.',
      whyWrong: 'These methods only perform shallow copies. Any nested dictionaries or lists are still shared by reference.',
      howToFix: 'Use `copy.deepcopy()` whenever data structures contain nested mutable objects.'
    },
    {
      mistake: 'Using `copy.deepcopy()` on massive graph objects or network sockets unnecessarily.',
      whyWrong: 'Deepcopy traverses the entire object graph recursively, which can be slow and memory-intensive.',
      howToFix: 'Only use deepcopy when mutation of nested objects is strictly required.'
    }
  ],
  realWorldApplications: [
    { title: 'Undo / Redo Engines', description: 'Snapshotting application canvas or editor states before user modifications.' },
    { title: 'Simulation Rollbacks', description: 'Cloning simulation parameters and game worlds for speculative tree searches (Monte Carlo tree search).' }
  ],
  practiceQuestions: [
    { question: 'Does `lst.copy()` perform a shallow copy or a deep copy?', hint: 'Built-in container methods.', answer: 'It performs a shallow copy.' },
    { question: 'How does `copy.deepcopy()` prevent infinite loops on circular references?', hint: 'Memoization table.', answer: 'It maintains an internal `memo` dictionary mapping original object IDs to their newly cloned counterparts.' },
    { question: 'What is the fastest way to shallow-copy a 1D list in Python?', hint: 'Slice syntax.', answer: 'Using slice notation: `cloned = lst[:]` or `cloned = list(lst)`.' }
  ],
  quiz: [
    {
      question: 'Given `a = [[1, 2]]; b = a[:]`, which statement is TRUE after `b[0].append(3)`?',
      options: ['a remains [[1, 2]]', 'a is now [[1, 2, 3]]', 'TypeError is raised', 'b becomes [[1, 2], 3]'],
      correctAnswer: 1,
      explanation: 'Slicing `a[:]` creates a shallow copy. The outer lists are separate, but `a[0]` and `b[0]` refer to the exact same inner list.'
    },
    {
      question: 'Which module in the Python standard library provides deepcopy?',
      options: ['sys', 'clone', 'copy', 'memory'],
      correctAnswer: 2,
      explanation: 'The `copy` module provides `copy.copy()` and `copy.deepcopy()`.'
    },
    {
      question: 'When is a shallow copy completely sufficient for safe cloning?',
      options: ['When objects contain circular graphs', 'When the container only holds immutable objects (like integers or strings)', 'When the container has 5 levels of nesting', 'Never'],
      correctAnswer: 1,
      explanation: 'If all elements inside the container are immutable, shallow copy is completely safe and much faster than deepcopy.'
    }
  ],
  codingChallenge: {
    title: 'Safe Configuration Cloner',
    difficulty: 'Intermediate',
    description: 'Write a function `clone_and_override(config: dict, overrides: dict) -> dict` that takes a base configuration dictionary (which may contain nested dicts and lists), returns an independent deep copy with overrides applied, and verifies the original config is unaltered.',
    starterCode: `import copy

def clone_and_override(config: dict, overrides: dict) -> dict:
    # Write your solution here
    pass`,
    hints: [
      'Use copy.deepcopy(config) to create the base clone.',
      'Update the clone with the overrides dictionary.'
    ],
    solution: `import copy

def clone_and_override(config: dict, overrides: dict) -> dict:
    new_cfg = copy.deepcopy(config)
    new_cfg.update(overrides)
    return new_cfg`,
    testCases: [
      { input: '{"env": "dev", "services": ["db", "redis"]}, {"env": "prod"}', expectedOutput: '{"env": "prod", "services": ["db", "redis"]}' }
    ]
  }
};

m3Lessons['py-ds-nested'] = {
  id: 'py-ds-nested',
  moduleId: 'python-module-3',
  title: 'Nested Data Structures',
  subtitle: 'Lists of Dicts, Dicts of Lists, 2D Grids, and JSON Tree Traversals',
  order: 9,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'data-structure-visual',
  objectives: [
    'Model complex hierarchical domain data using combinations of dicts, lists, and tuples.',
    'Access, update, and traverse nested data structures cleanly using chained lookups.',
    'Flatten nested lists and transform nested dictionary records.',
    'Parse and navigate JSON-like payloads safely without KeyError or IndexError crashes.'
  ],
  prerequisites: ['Python lists, dictionaries, and slicing.'],
  analogy: {
    title: 'The Office Filing Cabinet with Folders within Folders',
    text: 'A flat list is like a single drawer of loose paper sheets. A nested data structure is a filing cabinet where drawer 1 contains green folders (categories), each folder contains plastic sleeves (records), and each sleeve holds index cards with key-value data fields.',
    metaphor: 'Nested structures compose simple primitives into rich multi-dimensional data models.'
  },
  problemSolved: {
    title: 'Representing Real-World Relational and Hierarchical Entities',
    description: 'Real-world data—such as REST API responses, database join results, and graph topologies—is inherently multi-layered. Combining lists and dictionaries provides native JSON modeling in pure Python.',
    keyPoints: [
      'Chained indexing `data["users"][0]["email"]` traverses down nested levels.',
      'Dict comprehensions and nested list comprehensions allow clean data flattening and reshaping.',
      'The `json` module translates directly between Python nested structures and JSON strings.'
    ]
  },
  intuition: {
    overview: 'Nested structures are composed of references: outer containers hold pointers to inner containers, creating tree or tabular topologies.',
    steps: [
      { step: 1, title: 'Navigation', description: 'Evaluate outer key or index first, obtaining reference to the inner structure.' },
      { step: 2, title: 'Transformation', description: 'Extract or map target sub-records into a normalized shape.' },
      { step: 3, title: 'Safeguarding', description: 'Use .get() chaining or defensive checks to prevent missing-key exceptions.' }
    ]
  },
  codeExample: {
    title: 'Navigating and Flattening Nested Data',
    code: `company = {
    "engineering": [
        {"name": "Alice", "skills": ["Python", "Docker"]},
        {"name": "Bob", "skills": ["React", "TypeScript"]}
    ],
    "marketing": [
        {"name": "Charlie", "skills": ["SEO", "Content"]}
    ]
}

# Collect all unique skills across all departments
all_skills = {
    skill
    for dept_members in company.values()
    for member in dept_members
    for skill in member["skills"]
}
print(f"All company skills: {sorted(all_skills)}")`,
    explanation: 'Demonstrates a nested set comprehension traversing three levels of hierarchy (dict -> list -> list).'
  },
  runnableCode: {
    code: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Transposing a 2D matrix
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
for row in transposed:
    print(row)`,
    expectedOutput: `[1, 4, 7]
[2, 5, 8]
[3, 6, 9]`
  },
  lineByLine: [
    { line: 1, code: 'matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]', explanation: 'Defines a 3x3 grid as a list of three integer sub-lists.' },
    { line: 7, code: 'transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]', explanation: 'Iterates column indices i, gathering row[i] across all rows to transpose rows into columns.' },
    { line: 8, code: 'for row in transposed:', explanation: 'Prints each transposed row.' }
  ],
  commonMistakes: [
    {
      mistake: 'Chaining direct lookups on uncertain APIs: `data["user"]["profile"]["address"]["zip"]`.',
      whyWrong: 'If any intermediate key is missing or None, raises KeyError or TypeError.',
      howToFix: 'Use dictionary `.get()` with empty dict fallbacks: `data.get("user", {}).get("profile", {}).get("address", {}).get("zip")`.'
    },
    {
      mistake: 'Flattening lists using slow `+` concatenation inside loops.',
      whyWrong: 'Repeatedly copying intermediate lists produces O(N^2) complexity.',
      howToFix: 'Use itertools.chain.from_iterable(nested_list) or a nested comprehension.'
    }
  ],
  realWorldApplications: [
    { title: 'REST API Payload Processing', description: 'Extracting user profiles, permissions, and metrics from nested JSON responses.' },
    { title: 'Game Development', description: 'Modeling 2D tilemaps, inventory bags, and skill trees.' }
  ],
  practiceQuestions: [
    { question: 'How can you flatten `[[1, 2], [3, 4]]` into `[1, 2, 3, 4]` using a comprehension?', hint: 'Nested for loops inside brackets.', answer: '`[item for sublist in lst for item in sublist]`.' },
    { question: 'What does `zip(*matrix)` do when given a list of lists?', hint: 'Unpacking rows into zip.', answer: 'It transposes rows into columns, returning an iterator of column tuples.' },
    { question: 'How can you pretty-print a complex nested dictionary in the terminal?', hint: 'Standard library module.', answer: 'Using `import json; print(json.dumps(data, indent=2))` or the `pprint` module.' }
  ],
  quiz: [
    {
      question: 'What is the output of `data = [{"a": 10}, {"a": 20}]; sum(d["a"] for d in data)`?',
      options: ['10', '20', '30', 'TypeError'],
      correctAnswer: 2,
      explanation: 'Generator expression extracts each d["a"] (10 and 20) and sum() adds them to produce 30.'
    },
    {
      question: 'How do you extract the element at row 1, column 2 of a 2D matrix?',
      options: ['matrix[1, 2]', 'matrix[1][2]', 'matrix(1)(2)', 'matrix{1}{2}'],
      correctAnswer: 1,
      explanation: 'In Python lists of lists, nested indexing is accessed via consecutive brackets `matrix[row][col]`.'
    },
    {
      question: 'Which built-in function pair allows transposing a matrix easily: `list(zip(*matrix))`?',
      options: ['map and filter', 'zip and starred unpacking', 'reversed and sorted', 'enumerate and slice'],
      correctAnswer: 1,
      explanation: 'Starred unpacking `*matrix` passes rows as positional arguments to `zip`, grouping corresponding column elements.'
    }
  ],
  codingChallenge: {
    title: 'Extract User Email List',
    difficulty: 'Intermediate',
    description: 'Write a function `get_verified_emails(departments: dict[str, list[dict]]) -> list[str]` that traverses a nested dictionary where keys are department names and values are lists of user records `{"email": str, "verified": bool}`. Return a sorted list of unique lowercase emails for verified users only.',
    starterCode: `def get_verified_emails(departments: dict[str, list[dict]]) -> list[str]:
    # Write your solution here
    pass`,
    hints: [
      'Iterate through departments.values() and each user list.',
      'Check user.get("verified") == True.',
      'Collect emails in a set, lowercase them, and return sorted(list(emails)).'
    ],
    solution: `def get_verified_emails(departments: dict[str, list[dict]]) -> list[str]:
    verified_emails = set()
    for users in departments.values():
        for user in users:
            if user.get("verified"):
                verified_emails.add(user["email"].lower())
    return sorted(list(verified_emails))`,
    testCases: [
      { input: '{"eng": [{"email": "A@x.com", "verified": True}, {"email": "B@x.com", "verified": False}], "hr": [{"email": "C@x.com", "verified": True}]}', expectedOutput: '["a@x.com", "c@x.com"]' }
    ]
  }
};

const py3Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-3.ts');
writePythonModuleFile(py3Path, m3.data, m3Lessons);
console.log('Python Module 3 completed! Authored:', Object.keys(m3Lessons).length);

// ==========================================
// Python Module 4: Functions
// ==========================================
const m4 = getExistingPyLessons(4);
const m4Lessons = { ...m4.lessons };

m4Lessons['py-func-defining'] = {
  id: 'py-func-defining',
  moduleId: 'python-module-4',
  title: 'Defining and Calling Functions',
  subtitle: 'def Statement, Function Signatures, Docstrings, and None Returns',
  order: 1,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'execution-trace',
  objectives: [
    'Define reusable functions using the def keyword with clear signatures.',
    'Write clean docstrings adhering to PEP 257 standards for documentation.',
    'Understand explicit return statements vs implicit return None.',
    'Understand how functions are first-class objects in Python.'
  ],
  prerequisites: ['Python basics and variable assignments.'],
  analogy: {
    title: 'The Bread Bakery Recipe Card',
    text: 'A function is a standardized recipe card. It specifies what ingredients are needed (parameters), the step-by-step baking procedure (function body), and what finished loaf is delivered back to the counter (return value). Anyone in the kitchen can follow the recipe anytime without reinventing bread.',
    metaphor: 'Functions encapsulate reusable logic with defined inputs and predictable outputs.'
  },
  problemSolved: {
    title: 'DRY Principle (Don\'t Repeat Yourself) and Code Modularity',
    description: 'Without functions, programs become massive monolithic scripts full of duplicated logic. Functions break complex systems down into isolated, testable, and reusable building blocks.',
    keyPoints: [
      'Functions are declared with `def name(parameters):`.',
      'If a function reaches the end of its body without an explicit `return`, it returns `None`.',
      'Docstrings `"""..."""` provide built-in documentation accessible via `help()`.'
    ]
  },
  intuition: {
    overview: 'Executing a `def` statement creates a function object and binds it to a name in the current namespace. Calling the function allocates a new execution frame.',
    steps: [
      { step: 1, title: 'Definition', description: 'def compiles function body into a code object and creates a PyFunctionObject.' },
      { step: 2, title: 'Call Invocation', description: 'The `()` operator evaluates arguments and pushes a new stack frame.' },
      { step: 3, title: 'Return', description: 'Execution completes, pops the frame, and delivers the return value to the caller.' }
    ]
  },
  codeExample: {
    title: 'Clean Function with Docstring and Type Annotations',
    code: `def calculate_tax(subtotal: float, tax_rate: float = 0.08) -> float:
    """Calculate total tax amount rounded to 2 decimal places.
    
    Args:
        subtotal: Pre-tax price.
        tax_rate: Tax percentage in decimal form (default 8%).
        
    Returns:
        Rounded tax amount.
    """
    if subtotal < 0:
        raise ValueError("Subtotal cannot be negative")
    return round(subtotal * tax_rate, 2)

tax = calculate_tax(100.0)
print(f"Tax due: \${tax}")`,
    explanation: 'Demonstrates type hints, PEP 257 docstring format, input validation, and return value computation.'
  },
  runnableCode: {
    code: `def greet(name: str) -> str:
    """Return a warm greeting."""
    return f"Hello, {name}!"

msg = greet("Learner")
print(msg)
print("Docstring:", greet.__doc__.strip())`,
    expectedOutput: `Hello, Learner!
Docstring: Return a warm greeting.`
  },
  lineByLine: [
    { line: 1, code: 'def greet(name: str) -> str:', explanation: 'Declares greet function expecting string name and returning str.' },
    { line: 2, code: '    """Return a warm greeting."""', explanation: 'PEP 257 one-line docstring describing function intent.' },
    { line: 3, code: '    return f"Hello, {name}!"', explanation: 'Constructs and returns greeting string.' },
    { line: 5, code: 'msg = greet("Learner")', explanation: 'Calls greet, passing "Learner" as positional argument.' }
  ],
  commonMistakes: [
    {
      mistake: 'Confusing `print()` with `return`.',
      whyWrong: '`print()` outputs text to the console but returns `None`. You cannot capture, chain, or test printed output programmatically.',
      howToFix: 'Always `return` computed values so callers can store or pass them along.'
    },
    {
      mistake: 'Calling a function without parentheses: `result = my_func`.',
      whyWrong: 'Binds `result` to the function object itself rather than calling it.',
      howToFix: 'Use parentheses to invoke the function: `result = my_func()`.'
    }
  ],
  realWorldApplications: [
    { title: 'API Route Handlers', description: 'Expressing controller logic for endpoints in Flask, FastAPI, and Django.' },
    { title: 'Unit Testing', description: 'Writing discrete testable units with deterministic inputs and outputs.' }
  ],
  practiceQuestions: [
    { question: 'What does a Python function return if it contains no `return` statement?', hint: 'Default Python return value.', answer: 'It implicitly returns `None`.' },
    { question: 'How can you view a function\'s docstring interactively in Python?', hint: 'Built-in function or attribute.', answer: 'Using `help(function_name)` or accessing `function_name.__doc__`.' },
    { question: 'Are functions first-class objects in Python?', hint: 'Can they be assigned to variables and passed to other functions?', answer: 'Yes, functions can be assigned to variables, stored in data structures, and passed as arguments.' }
  ],
  quiz: [
    {
      question: 'What keyword defines a function in Python?',
      options: ['function', 'fn', 'def', 'define'],
      correctAnswer: 2,
      explanation: 'Python uses the `def` keyword for function declarations.'
    },
    {
      question: 'What is the return value of: `def f(): x = 5` when called as `result = f()`?',
      options: ['5', '0', 'None', 'NameError'],
      correctAnswer: 2,
      explanation: 'Functions without an explicit return statement return `None`.'
    },
    {
      question: 'Where should a function docstring be placed?',
      options: ['Above the def line', 'As the first statement inside the function body', 'At the end of the module', 'Inside the return statement'],
      correctAnswer: 1,
      explanation: 'A docstring must be the very first statement inside the function body.'
    }
  ],
  codingChallenge: {
    title: 'Format Full Name and Title',
    difficulty: 'Beginner',
    description: 'Write a function `format_name(first: str, last: str, title: str = "") -> str` that takes first and last names, capitalizes each (e.g. "john" -> "John"), and prepends an optional title (e.g. "Dr. John Doe", or "John Doe" if title is empty).',
    starterCode: `def format_name(first: str, last: str, title: str = "") -> str:
    # Write your solution here
    pass`,
    hints: [
      'Use .capitalize() or .title() on first and last.',
      'Check if title is non-empty before prepending.'
    ],
    solution: `def format_name(first: str, last: str, title: str = "") -> str:
    full = f"{first.capitalize()} {last.capitalize()}"
    return f"{title} {full}".strip() if title else full`,
    testCases: [
      { input: '"ada", "lovelace", "Lady"', expectedOutput: '"Lady Ada Lovelace"' },
      { input: '"alan", "turing"', expectedOutput: '"Alan Turing"' }
    ]
  }
};

m4Lessons['py-func-parameters'] = {
  id: 'py-func-parameters',
  moduleId: 'python-module-4',
  title: 'Parameters and Return Values',
  subtitle: 'Positional Arguments, Multiple Tuple Returns, and Guard Clauses',
  order: 2,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'execution-trace',
  objectives: [
    'Distinguish between formal parameters (in function definitions) and actual arguments (in function calls).',
    'Return multiple values seamlessly using tuple packing and unpacking.',
    'Implement guard clauses with early returns for cleaner code architecture.',
    'Pass arguments positionally and by keyword name.'
  ],
  prerequisites: ['Defining basic functions and tuples.'],
  analogy: {
    title: 'The Parcel Delivery Dispatcher',
    text: 'When ordering packages, positional parameters are like standard delivery slots where slot 1 must be Street, slot 2 City, and slot 3 Zip. Keyword arguments are like labeled stickers: even if you hand the envelope upside-down, the clerk reads the "Zip" label and routes it correctly.',
    metaphor: 'Positional arguments bind by sequence index; keyword arguments bind by name.'
  },
  problemSolved: {
    title: 'Clean Input/Output Contracts for Functions',
    description: 'Writing functions that take varied inputs and deliver multiple outputs without cumbersome wrapper objects is a hallmark of Pythonic code.',
    keyPoints: [
      'Returning multiple comma-separated values automatically packs them into a single tuple.',
      'Guard clauses handle validation and edge cases early, eliminating deep indentation.',
      'Positional arguments must precede keyword arguments in function calls.'
    ]
  },
  intuition: {
    overview: 'Python maps caller arguments to function parameters during frame setup. Returning `return a, b` evaluates to the single tuple `(a, b)`.',
    steps: [
      { step: 1, title: 'Argument Binding', description: 'Python matches positional arguments first, then binds keyword arguments by parameter name.' },
      { step: 2, title: 'Guard Check', description: 'Early return statements exit immediately if conditions are not satisfied.' },
      { step: 3, title: 'Tuple Return', description: 'Multiple return values are packed into a tuple and unpacked directly by the caller.' }
    ]
  },
  codeExample: {
    title: 'Multiple Returns and Early Guard Clauses',
    code: `def get_min_max_mean(numbers: list[float]) -> tuple[float, float, float]:
    """Calculate min, max, and mean of a list using guard clause."""
    if not numbers:
        raise ValueError("Number list cannot be empty")
        
    minimum = min(numbers)
    maximum = max(numbers)
    mean = sum(numbers) / len(numbers)
    return minimum, maximum, mean  # Implicit tuple packing

# Unpacking caller side
low, high, avg = get_min_max_mean([10.0, 20.0, 30.0])
print(f"Low: {low}, High: {high}, Average: {avg}")`,
    explanation: 'Demonstrates an early guard clause for empty input, followed by returning three values packed into a tuple.'
  },
  runnableCode: {
    code: `def divide_with_remainder(dividend: int, divisor: int) -> tuple[int, int]:
    if divisor == 0:
        return 0, 0
    quotient = dividend // divisor
    remainder = dividend % divisor
    return quotient, remainder

q, r = divide_with_remainder(17, 5)
print(f"17 // 5 = {q} with remainder {r}")`,
    expectedOutput: `17 // 5 = 3 with remainder 2`
  },
  lineByLine: [
    { line: 1, code: 'def divide_with_remainder(dividend: int, divisor: int) -> tuple[int, int]:', explanation: 'Function signature accepting two integers and returning a 2-tuple.' },
    { line: 2, code: '    if divisor == 0:', explanation: 'Early guard clause checking for division by zero.' },
    { line: 5, code: '    return quotient, remainder', explanation: 'Returns two values separated by comma (packed as a tuple).' },
    { line: 7, code: 'q, r = divide_with_remainder(17, 5)', explanation: 'Unpacks the returned tuple directly into variables q and r.' }
  ],
  commonMistakes: [
    {
      mistake: 'Putting positional arguments AFTER keyword arguments: `func(a=1, 2)`.',
      whyWrong: 'Raises `SyntaxError: positional argument follows keyword argument`.',
      howToFix: 'All positional arguments must come before any keyword arguments: `func(2, a=1)`.'
    },
    {
      mistake: 'Deeply nesting if/else blocks instead of using early returns.',
      whyWrong: 'Creates "arrow anti-pattern" with excessive indentation levels.',
      howToFix: 'Invert conditions and return early: `if not valid: return None`.'
    }
  ],
  realWorldApplications: [
    { title: 'Mathematical Statistics', description: 'Returning coordinates, standard deviations, and regression coefficients simultaneously.' },
    { title: 'Authentication Verification', description: 'Returning (is_authenticated: bool, user_id: str, error_message: str).' }
  ],
  practiceQuestions: [
    { question: 'What actual Python type is returned when a function executes `return 1, 2, 3`?', hint: 'Comma separation creates...', answer: 'A `tuple`: `(1, 2, 3)`.' },
    { question: 'Can you call a function using keyword arguments in any order?', hint: 'Named parameter binding.', answer: 'Yes, keyword arguments match parameters by name regardless of order: `func(b=2, a=1)`.' },
    { question: 'What is a "guard clause"?', hint: 'Control flow pattern.', answer: 'A check at the beginning of a function that handles invalid inputs or edge cases and returns early.' }
  ],
  quiz: [
    {
      question: 'Which of the following function calls is INVALID syntax?',
      options: ['f(1, b=2)', 'f(a=1, 2)', 'f(a=1, b=2)', 'f(1, 2)'],
      correctAnswer: 1,
      explanation: 'Positional arguments cannot follow keyword arguments in Python syntax.'
    },
    {
      question: 'When unpacking `a, b = get_coords()`, what happens if `get_coords()` returns 3 items?',
      options: ['a and b take first two, third is dropped', 'ValueError: too many values to unpack', 'TypeError is raised', 'b becomes a tuple'],
      correctAnswer: 1,
      explanation: 'Unpacking expects an exact match of target variables to sequence elements; mismatched lengths raise ValueError.'
    },
    {
      question: 'What is the primary benefit of early returns / guard clauses?',
      options: ['Makes the code execute faster by skipping bytecode', 'Reduces nesting indentation and clarifies precondition requirements', 'Allocates less memory on the stack', 'Enables multi-threading'],
      correctAnswer: 1,
      explanation: 'Guard clauses clarify preconditions and prevent deeply nested "arrow" anti-patterns.'
    }
  ],
  codingChallenge: {
    title: 'Compute Bounding Box',
    difficulty: 'Beginner',
    description: 'Write a function `compute_bounding_box(points: list[tuple[float, float]]) -> tuple[float, float, float, float]` that accepts a list of `(x, y)` coordinate tuples and returns `(min_x, min_y, max_x, max_y)`. If the list is empty, raise `ValueError("No points provided")`.',
    starterCode: `def compute_bounding_box(points: list[tuple[float, float]]) -> tuple[float, float, float, float]:
    # Write your solution here
    pass`,
    hints: [
      'Check if not points: raise ValueError.',
      'Extract all x\'s with [p[0] for p in points] and y\'s with [p[1] for p in points].',
      'Compute min and max for both.'
    ],
    solution: `def compute_bounding_box(points: list[tuple[float, float]]) -> tuple[float, float, float, float]:
    if not points:
        raise ValueError("No points provided")
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    return min(xs), min(ys), max(xs), max(ys)`,
    testCases: [
      { input: '[(0.0, 5.0), (10.0, -2.0), (3.0, 8.0)]', expectedOutput: '(0.0, -2.0, 10.0, 8.0)' }
    ]
  }
};

m4Lessons['py-func-default-args'] = {
  id: 'py-func-default-args',
  moduleId: 'python-module-4',
  title: 'Default and Keyword Arguments',
  subtitle: 'Default Parameter Values, Keyword-Only Arguments (*), and the Mutable Default Trap',
  order: 3,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'execution-trace',
  objectives: [
    'Define functions with sensible default argument values.',
    'Enforce keyword-only arguments using bare asterisk syntax `def f(*, key=val):`.',
    'Understand the critical Python mutable default argument trap and its root cause.',
    'Use the canonical `param=None` idiom to safely handle default mutable containers.'
  ],
  prerequisites: ['Python function parameters and mutability.'],
  analogy: {
    title: 'The Restaurant Default Side Order',
    text: 'When ordering a burger combo, the menu says "comes with french fries" (default argument). You can accept the default or say "substitute onion rings" (keyword override). But imagine if the kitchen put all default fries into one shared communal bowl: every customer who ordered without specifying a side would eat out of the same bowl that prior customers touched! That is the mutable default argument trap.',
    metaphor: 'Default arguments are evaluated once at definition time, sharing state if mutable.'
  },
  problemSolved: {
    title: 'Flexible APIs Without Shared Mutable State Bugs',
    description: 'APIs need flexible options that don\'t force callers to specify every parameter on every invocation, while preventing insidious bugs caused by shared mutable defaults.',
    keyPoints: [
      'Default arguments are evaluated once when the `def` statement executes, not on each call.',
      'Using `*` in the parameter list forces all following parameters to be passed by keyword name.',
      'Always use immutable defaults like `None`, strings, or numbers.'
    ]
  },
  intuition: {
    overview: 'CPython stores default parameter values in the function object\'s `__defaults__` tuple at compile/definition time.',
    steps: [
      { step: 1, title: 'Evaluation at Def Time', description: 'Default expressions are evaluated when Python first reads the def line.' },
      { step: 2, title: 'Binding to __defaults__', description: 'The resulting values are stored on the function object.' },
      { step: 3, title: 'Call-Time Substitution', description: 'If caller omits the argument, Python copies the reference from `__defaults__`.' }
    ]
  },
  codeExample: {
    title: 'Keyword-Only Arguments and the None Default Pattern',
    code: `def connect_db(host: str, port: int = 5432, *, timeout: int = 30, retries: int = 3):
    """Host and port are positional/keyword; timeout and retries are strictly keyword-only."""
    print(f"Connecting to {host}:{port} with timeout={timeout}s, retries={retries}")

# Safe mutable default pattern
def append_log(entry: str, log_list: list[str] | None = None) -> list[str]:
    if log_list is None:
        log_list = []
    log_list.append(entry)
    return log_list

connect_db("localhost", timeout=15) # port defaults to 5432
print(append_log("Event 1"))
print(append_log("Event 2")) # Independent list!`,
    explanation: 'Shows `*` enforcing keyword-only arguments, and the standard `if param is None:` idiom preventing shared mutable state.'
  },
  runnableCode: {
    code: `def create_user(username, *, is_admin=False):
    return {"username": username, "admin": is_admin}

# Valid call
print(create_user("alice", is_admin=True))

# create_user("bob", True) would raise TypeError: takes 1 positional argument but 2 were given`,
    expectedOutput: `{'username': 'alice', 'admin': True}`
  },
  lineByLine: [
    { line: 1, code: 'def create_user(username, *, is_admin=False):', explanation: 'The bare `*` enforces that is_admin MUST be passed as a keyword argument.' },
    { line: 2, code: '    return {"username": username, "admin": is_admin}', explanation: 'Constructs and returns user dictionary.' },
    { line: 5, code: 'print(create_user("alice", is_admin=True))', explanation: 'Passes username positionally and is_admin by keyword.' }
  ],
  commonMistakes: [
    {
      mistake: 'Defining `def add_item(item, basket=[]):` with a mutable default.',
      whyWrong: 'The exact same list instance in `__defaults__` is modified on every call where `basket` is omitted.',
      howToFix: 'Use `basket=None` and initialize `if basket is None: basket = []` inside the function.'
    },
    {
      mistake: 'Putting non-default arguments after default arguments: `def f(a=1, b):`.',
      whyWrong: 'Raises `SyntaxError: non-default argument follows default argument`.',
      howToFix: 'All parameters with default values must appear after parameters without defaults.'
    }
  ],
  realWorldApplications: [
    { title: 'Configuration Clients', description: 'HTTP client libraries (requests, httpx) setting default timeouts and retry counts.' },
    { title: 'Defensive API Design', description: 'Keyword-only flags (`*, force=False`) preventing accidental boolean flips in production code.' }
  ],
  practiceQuestions: [
    { question: 'When are default parameter values evaluated in Python?', hint: 'Definition time vs call time.', answer: 'Once at function definition time (when the `def` statement executes).' },
    { question: 'What does a bare asterisk `*` in a parameter list signify?', hint: 'Positional vs keyword separator.', answer: 'It marks the boundary after which all subsequent parameters must be passed as keyword arguments.' },
    { question: 'Where does Python store a function\'s default values at runtime?', hint: 'Dunder attribute on the function object.', answer: 'In the `__defaults__` (positional defaults) and `__kwdefaults__` (keyword-only defaults) attributes.' }
  ],
  quiz: [
    {
      question: 'What happens when `def f(x=[]): x.append(1); return x` is called twice: `f(); print(f())`?',
      options: ['[1]', '[1, 1]', 'TypeError', 'None'],
      correctAnswer: 1,
      explanation: 'The default list `x` is created once and mutated on each call, producing `[1, 1]` on the second call.'
    },
    {
      question: 'Which syntax enforces that `retry` MUST be passed by keyword name?',
      options: ['def f(a, retry: keyword):', 'def f(a, *, retry=3):', 'def f(a, **retry):', 'def f(a, (retry=3)):'],
      correctAnswer: 1,
      explanation: 'A bare `*` forces all subsequent parameters to be keyword-only.'
    },
    {
      question: 'Why must non-default parameters precede default parameters?',
      options: ['To conserve stack memory', 'To avoid ambiguity when matching positional arguments', 'Python bytecode does not support it', 'For PEP 8 style only'],
      correctAnswer: 1,
      explanation: 'Otherwise Python cannot determine which arguments bind to which positional parameters unambiguously.'
    }
  ],
  codingChallenge: {
    title: 'Configure Retry Policy',
    difficulty: 'Beginner',
    description: 'Write a function `configure_request(url: str, *, method: str = "GET", headers: dict | None = None, max_retries: int = 3) -> dict` that returns a dictionary of request configuration. Ensure `headers` defaults to an empty dictionary without suffering from the mutable default trap, and enforce keyword-only arguments for method, headers, and max_retries.',
    starterCode: `def configure_request(url: str, *, method: str = "GET", headers: dict | None = None, max_retries: int = 3) -> dict:
    # Write your solution here
    pass`,
    hints: [
      'Check if headers is None, set to {}.',
      'Return a dict with keys "url", "method", "headers", "max_retries".'
    ],
    solution: `def configure_request(url: str, *, method: str = "GET", headers: dict | None = None, max_retries: int = 3) -> dict:
    if headers is None:
        headers = {}
    return {
        "url": url,
        "method": method,
        "headers": headers,
        "max_retries": max_retries
    }`,
    testCases: [
      { input: '"https://api.example.com"', expectedOutput: '{"url": "https://api.example.com", "method": "GET", "headers": {}, "max_retries": 3}' }
    ]
  }
};

m4Lessons['py-func-args-kwargs'] = {
  id: 'py-func-args-kwargs',
  moduleId: 'python-module-4',
  title: '*args and **kwargs',
  subtitle: 'Variadic Positional & Keyword Arguments, Unpacking Calls, and Forwarding',
  order: 4,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'execution-trace',
  objectives: [
    'Accept arbitrary positional arguments packed into a tuple via *args.',
    'Accept arbitrary keyword arguments packed into a dict via **kwargs.',
    'Unpack collections into function calls using `func(*my_list)` and `func(**my_dict)`.',
    'Forward arguments transparently in wrapper functions and decorators.'
  ],
  prerequisites: ['Function parameters and tuples/dictionaries.'],
  analogy: {
    title: 'The Universal Shipping Container',
    text: 'A standard function call is like shipping specific items in custom molded slots. Using `*args` is like tossing any number of loose items into a sturdy canvas sack (a tuple). Using `**kwargs` is like packing a box where every item has a color-coded sticky label attached (a dictionary).',
    metaphor: '*args packs positional parameters into a tuple; **kwargs packs keyword parameters into a dict.'
  },
  problemSolved: {
    title: 'Building Highly Dynamic and Forwarding Interfaces',
    description: 'When building decorator wrappers, subclass initializers, or mathematical aggregators (like sum or max), functions cannot know in advance how many arguments callers will supply. `*args` and `**kwargs` provide universal argument flexibility.',
    keyPoints: [
      '`*args` gathers uncaptured positional arguments into a `tuple`.',
      '`**kwargs` gathers uncaptured keyword arguments into a `dict`.',
      'The formal parameter ordering is: positional -> default -> *args -> keyword-only -> **kwargs.'
    ]
  },
  intuition: {
    overview: 'During argument binding, Python captures any surplus positional values into `args` and any surplus keyword arguments into `kwargs`.',
    steps: [
      { step: 1, title: 'Positional Matching', description: 'Explicit positional parameters are satisfied first.' },
      { step: 2, title: '*args Packing', description: 'All remaining positional values are packed into a tuple.' },
      { step: 3, title: '**kwargs Packing', description: 'All remaining keyword pairs are packed into a dictionary.' }
    ]
  },
  codeExample: {
    title: 'Universal Argument Wrapper / Forwarder',
    code: `def logger_wrapper(func):
    def inner(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs) # Forwarding unpacking
        print(f"{func.__name__} returned {result}")
        return result
    return inner

@logger_wrapper
def multiply(a, b, factor=1):
    return (a * b) * factor

multiply(3, 4, factor=2)`,
    explanation: 'Demonstrates *args and **kwargs in an inner wrapper capturing all inputs and forwarding them via call unpacking.'
  },
  runnableCode: {
    code: `def calculate_total(*prices, tax_rate=0.05, **discounts):
    subtotal = sum(prices)
    discount_total = sum(discounts.values())
    net = max(0, subtotal - discount_total)
    return round(net * (1 + tax_rate), 2)

total = calculate_total(10.0, 25.0, 15.0, coupon=5.0, promo=2.0)
print(f"Final Total: \${total}")`,
    expectedOutput: `Final Total: $50.4`
  },
  lineByLine: [
    { line: 1, code: 'def calculate_total(*prices, tax_rate=0.05, **discounts):', explanation: 'Gathers variable prices into tuple prices, and arbitrary discounts into dict discounts.' },
    { line: 2, code: '    subtotal = sum(prices)', explanation: 'Sums all values in the prices tuple.' },
    { line: 3, code: '    discount_total = sum(discounts.values())', explanation: 'Sums all numeric values provided via keyword discounts.' },
    { line: 6, code: 'total = calculate_total(10.0, 25.0, 15.0, coupon=5.0, promo=2.0)', explanation: 'Passes three positional numbers and two keyword discounts.' }
  ],
  commonMistakes: [
    {
      mistake: 'Putting `**kwargs` before `*args` in a function definition.',
      whyWrong: 'Raises `SyntaxError: invalid syntax`. `**kwargs` must always be the very last parameter.',
      howToFix: 'Follow strict ordering: `def f(pos, *args, kw_only, **kwargs):`.'
    },
    {
      mistake: 'Forgetting the asterisk when unpacking: `func(my_list)` instead of `func(*my_list)`.',
      whyWrong: 'Passes the entire list as a single argument instead of unpacking elements individually.',
      howToFix: 'Use `*` for sequences and `**` for dictionaries.'
    }
  ],
  realWorldApplications: [
    { title: 'Decorator Middleware', description: 'Writing decorators that can wrap any function signature without knowing its parameters in advance.' },
    { title: 'Inheritance `super().__init__()`', description: 'Passing leftover configuration keyword arguments up the class inheritance chain.' }
  ],
  practiceQuestions: [
    { question: 'What type is `args` inside a function defined with `def f(*args):`?', hint: 'Tuple or list?', answer: 'A `tuple`.' },
    { question: 'What type is `kwargs` inside a function defined with `def f(**kwargs):`?', hint: 'Key-value map type.', answer: 'A `dict`.' },
    { question: 'How can you unpack a dictionary `d = {"a": 1, "b": 2}` into a function call?', hint: 'Double asterisk.', answer: '`my_function(**d)`.' }
  ],
  quiz: [
    {
      question: 'Which parameter order is legal in Python?',
      options: ['def f(**kwargs, *args):', 'def f(*args, a):', 'def f(**kwargs, a=1):', 'def f(*args, **kwargs, a):'],
      correctAnswer: 1,
      explanation: '`*args` can be followed by keyword-only parameter `a`, which comes before `**kwargs`.'
    },
    {
      question: 'What does `*` do when used inside a function call like `func(*[1, 2, 3])`?',
      options: ['Multiplies the elements', 'Unpacks the list into positional arguments', 'Converts elements to strings', 'Creates a generator'],
      correctAnswer: 1,
      explanation: 'In a call, `*` unpacks an iterable into separate positional arguments.'
    },
    {
      question: 'If `def f(*args): return len(args)` is called with `f()`, what does it return?',
      options: ['0', 'None', 'TypeError', '1'],
      correctAnswer: 0,
      explanation: 'When no arguments are passed, `args` is an empty tuple `()`, so `len(args)` is 0.'
    }
  ],
  codingChallenge: {
    title: 'Flexible Query String Builder',
    difficulty: 'Intermediate',
    description: 'Write a function `build_query(base_url: str, *path_segments: str, **params: str | int) -> str` that concatenates `base_url` with any number of `path_segments` separated by "/", and appends URL query parameters sorted alphabetically by key: `"url/seg1/seg2?key1=val1&key2=val2"` (omit "?" if params is empty).',
    starterCode: `def build_query(base_url: str, *path_segments: str, **params: str | int) -> str:
    # Write your solution here
    pass`,
    hints: [
      'Strip trailing slashes and join path segments with "/".',
      'Format params sorted alphabetically: [f"{k}={v}" for k, v in sorted(params.items())].',
      'Join params with "&" and prepend "?".'
    ],
    solution: `def build_query(base_url: str, *path_segments: str, **params: str | int) -> str:
    url = base_url.rstrip("/")
    if path_segments:
        url += "/" + "/".join(s.strip("/") for s in path_segments)
    if params:
        query_str = "&".join(f"{k}={v}" for k, v in sorted(params.items()))
        url += "?" + query_str
    return url`,
    testCases: [
      { input: '"https://api.io", "v1", "users", limit=10, active=1', expectedOutput: '"https://api.io/v1/users?active=1&limit=10"' }
    ]
  }
};

m4Lessons['py-func-lambda'] = {
  id: 'py-func-lambda',
  moduleId: 'python-module-4',
  title: 'Lambda Functions',
  subtitle: 'Anonymous Single-Expression Functions, Key Functions, and Limitations',
  order: 6,
  readTimeMinutes: 18,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Define concise single-expression anonymous functions with the lambda keyword.',
    'Use lambdas as custom sort keys for sorted(), list.sort(), min(), and max().',
    'Understand lambda limitations: expressions only, no statements, no annotations.',
    'Follow PEP 8 guidelines on when to prefer a named def over a lambda.'
  ],
  prerequisites: ['Python functions and sorting basics.'],
  analogy: {
    title: 'The Sticky Note Formula',
    text: 'A `def` function is a permanent hardbound operations manual with an official title, table of contents, and index. A `lambda` is a quick calculation scrawled on a sticky note ("double this and add 1") used once to solve an immediate step and thrown away immediately.',
    metaphor: 'Lambdas are disposable inline functions for quick syntactic shortcuts.'
  },
  problemSolved: {
    title: 'Inline Functions for Higher-Order Operations',
    text: 'When sorting records or mapping values, defining a full 3-line `def` function for a single trivial operation clutters code. Lambdas allow defining small transformation functions directly at the call site.',
    keyPoints: [
      'Syntax: `lambda arguments: expression` (the expression is implicitly returned).',
      'Cannot contain statements like `if/else` statements (must use conditional expressions `x if c else y`), loops, or `return`.',
      'Most commonly used as the `key=` argument in `sorted()`, `min()`, and `max()`.'
    ]
  },
  intuition: {
    overview: 'A lambda creates a standard function object whose code body evaluates a single expression and returns its result.',
    steps: [
      { step: 1, title: 'Argument Evaluation', description: 'Arguments specified before the colon are bound in the lambda\'s local scope.' },
      { step: 2, title: 'Expression Evaluation', description: 'The single expression after the colon is computed.' },
      { step: 3, title: 'Return', description: 'The computed value is returned immediately.' }
    ]
  },
  codeExample: {
    title: 'Custom Sorting with Lambda Key Functions',
    code: `students = [
    {"name": "Alice", "grade": 88, "age": 20},
    {"name": "Bob", "grade": 95, "age": 22},
    {"name": "Charlie", "grade": 95, "age": 19}
]

# Sort by grade descending, then age ascending
sorted_students = sorted(
    students,
    key=lambda s: (-s["grade"], s["age"])
)

for s in sorted_students:
    print(f"{s['name']}: Grade {s['grade']}, Age {s['age']}")`,
    explanation: 'Uses a lambda returning a tuple key `(-grade, age)` to achieve multi-criteria sorting in a single pass.'
  },
  runnableCode: {
    code: `words = ["elephant", "cat", "hippopotamus", "dog"]
# Sort by word length
by_length = sorted(words, key=lambda w: len(w))
print("By length:", by_length)

# Quick mathematical transform
square = lambda x: x ** 2
print("5 squared:", square(5))`,
    expectedOutput: `By length: ['cat', 'dog', 'elephant', 'hippopotamus']
5 squared: 25`
  },
  lineByLine: [
    { line: 1, code: 'words = ["elephant", "cat", "hippopotamus", "dog"]', explanation: 'List of strings with varying lengths.' },
    { line: 3, code: 'by_length = sorted(words, key=lambda w: len(w))', explanation: 'Passes lambda extracting length of each word as the sort key.' },
    { line: 7, code: 'square = lambda x: x ** 2', explanation: 'Defines lambda taking x and returning x ** 2.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assigning a lambda to a variable: `f = lambda x: x + 1` (PEP 8 anti-pattern).',
      whyWrong: 'Loses function name in stack traces and tracebacks (`<lambda>` instead of function name).',
      howToFix: 'Use standard def: `def f(x): return x + 1`.'
    },
    {
      mistake: 'Trying to include statements inside a lambda: `lambda x: print(x); return x`.',
      whyWrong: 'Raises `SyntaxError`. Lambdas only permit a single expression.',
      howToFix: 'Use a regular `def` statement when multiple lines or statements are needed.'
    }
  ],
  realWorldApplications: [
    { title: 'Custom Dataframe Sorting', description: 'Sorting Pandas and SQL-like tables by calculated metrics.' },
    { title: 'Event Callbacks', description: 'Passing quick inline parameter bindings to GUI button click handlers.' }
  ],
  practiceQuestions: [
    { question: 'What is the syntax of a lambda expression in Python?', hint: 'Keyword, parameters, colon, expression.', answer: '`lambda param1, param2: expression`.' },
    { question: 'Why does PEP 8 discourage `my_func = lambda x: x * 2`?', hint: 'Debugging and stack traces.', answer: 'Because `def my_func(x): return x * 2` gives the function an explicit `__name__` for better stack traces and readability.' },
    { question: 'How can you write an if/else condition inside a lambda?', hint: 'Ternary conditional expression.', answer: 'Using ternary syntax: `lambda x: "even" if x % 2 == 0 else "odd"`.' }
  ],
  quiz: [
    {
      question: 'Which of the following can a Python lambda function contain?',
      options: ['A while loop', 'A single expression', 'An assert statement', 'A try/except block'],
      correctAnswer: 1,
      explanation: 'Python lambdas can only contain a single expression.'
    },
    {
      question: 'What is the output of `(lambda a, b: a * b + 1)(3, 4)`?',
      options: ['13', '12', '7', 'SyntaxError'],
      correctAnswer: 0,
      explanation: 'Evaluates `3 * 4 + 1 = 13`.'
    },
    {
      question: 'What does the `key` argument in `sorted(items, key=...)` expect?',
      options: ['A boolean flag', 'A function that takes an element and returns its comparison key', 'A dictionary of keys', 'An integer column index'],
      correctAnswer: 1,
      explanation: 'The `key` parameter takes a callable that extracts a comparison key from each element.'
    }
  ],
  codingChallenge: {
    title: 'Sort Coordinates by Distance',
    difficulty: 'Intermediate',
    description: 'Write a function `sort_by_distance(points: list[tuple[float, float]], origin: tuple[float, float] = (0.0, 0.0)) -> list[tuple[float, float]]` that returns points sorted in ascending order of Euclidean distance from the origin point using a lambda key.',
    starterCode: `def sort_by_distance(points: list[tuple[float, float]], origin: tuple[float, float] = (0.0, 0.0)) -> list[tuple[float, float]]:
    # Write your solution here
    pass`,
    hints: [
      'Euclidean distance squared is (x - ox)**2 + (y - oy)**2.',
      'Use sorted(points, key=lambda p: (p[0] - origin[0])**2 + (p[1] - origin[1])**2).'
    ],
    solution: `def sort_by_distance(points: list[tuple[float, float]], origin: tuple[float, float] = (0.0, 0.0)) -> list[tuple[float, float]]:
    ox, oy = origin
    return sorted(points, key=lambda p: (p[0] - ox)**2 + (p[1] - oy)**2)`,
    testCases: [
      { input: '[(3.0, 4.0), (1.0, 1.0), (0.0, 2.0)], (0.0, 0.0)', expectedOutput: '[(1.0, 1.0), (0.0, 2.0), (3.0, 4.0)]' }
    ]
  }
};

m4Lessons['py-func-recursion'] = {
  id: 'py-func-recursion',
  moduleId: 'python-module-4',
  title: 'Recursion in Python',
  subtitle: 'Base Cases, Stack Frames, sys.getrecursionlimit(), and Memoization',
  order: 7,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'execution-trace',
  objectives: [
    'Design recursive functions with verified base cases and self-reducing recursive steps.',
    'Trace call stack frames and understand how Python manages call memory.',
    'Understand Python\'s recursion limit (sys.getrecursionlimit()) and RecursionError.',
    'Apply functools.lru_cache for transparent memoization of recursive functions.'
  ],
  prerequisites: ['Python functions and stack intuition.'],
  analogy: {
    title: 'The Russian Matryoshka Doll',
    text: 'A recursive function is like opening a Russian nesting doll. You open a large doll to find an identical but smaller doll inside (recursive step). You repeat this until you reach the solid miniature doll that cannot be opened (the base case). Then you close each doll back up in reverse order to complete the assembly.',
    metaphor: 'Recursion solves problems by delegating to smaller instances of the same problem until reaching a base case.'
  },
  problemSolved: {
    title: 'Solving Naturally Hierarchical and Self-Similar Problems',
    description: 'Problems involving trees, graphs, nested directories, and divide-and-conquer algorithms (like Quicksort and Merge Sort) are vastly simpler and more elegant to express recursively than iteratively.',
    keyPoints: [
      'Every recursive function MUST have at least one base case that stops execution.',
      'Python does NOT perform tail-call optimization (TCO); each call consumes a stack frame.',
      'Standard recursion limit is 1000 frames to prevent C stack overflow.'
    ]
  },
  intuition: {
    overview: 'Each recursive call pushes a new execution frame with its own local variables onto the call stack. Upon reaching the base case, return values propagate back down the stack.',
    steps: [
      { step: 1, title: 'Base Case Check', description: 'If terminal condition is reached, return base value immediately without recursing.' },
      { step: 2, title: 'Recursive Call', description: 'Call the function with modified arguments moving closer to the base case.' },
      { step: 3, title: 'Unwinding', description: 'Combine results as stack frames pop and return.' }
    ]
  },
  codeExample: {
    title: 'Memoized Recursive Fibonacci with functools.lru_cache',
    code: `from functools import lru_cache

# Without cache: O(2^N) exponential time!
# With lru_cache: O(N) linear time!
@lru_cache(maxsize=None)
def fibonacci(n: int) -> int:
    """Calculate the nth Fibonacci number recursively with memoization."""
    if n < 0:
        raise ValueError("n must be non-negative")
    if n in (0, 1):
        return n  # Base cases
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Fibonacci(50):", fibonacci(50))`,
    explanation: 'Shows base cases for 0 and 1, followed by memoization turning exponential recursion into linear time.'
  },
  runnableCode: {
    code: `def sum_nested(data):
    """Recursively sum all numbers in deeply nested lists."""
    total = 0
    for item in data:
        if isinstance(item, list):
            total += sum_nested(item)  # Recurse into sublist
        else:
            total += item              # Base element
    return total

nested = [1, [2, [3, 4], 5], [6, 7]]
print("Total sum:", sum_nested(nested))`,
    expectedOutput: `Total sum: 28`
  },
  lineByLine: [
    { line: 1, code: 'def sum_nested(data):', explanation: 'Defines recursive function accepting a nested list structure.' },
    { line: 4, code: '    if isinstance(item, list):', explanation: 'Checks if current element is a nested container.' },
    { line: 5, code: '        total += sum_nested(item)', explanation: 'Recursive call to sum contents of the child list.' },
    { line: 7, code: '        total += item', explanation: 'Base case addition when element is a number.' }
  ],
  commonMistakes: [
    {
      mistake: 'Omitting or improperly checking the base case.',
      whyWrong: 'Leads to infinite recursion, raising `RecursionError: maximum recursion depth exceeded`.',
      howToFix: 'Always write and test base conditions first before writing recursive calls.'
    },
    {
      mistake: 'Assuming Python optimizes tail recursion like Scheme or Haskell.',
      whyWrong: 'Python purposefully does not support Tail Call Elimination (TCO) to maintain accurate stack traces.',
      howToFix: 'Convert deep recursive algorithms (>1000 depth) to iterative loops with explicit stacks.'
    }
  ],
  realWorldApplications: [
    { title: 'Filesystem Directory Walkers', description: 'Traversing arbitrary directory trees and nested folders recursively.' },
    { title: 'Abstract Syntax Tree (AST) Parsing', description: 'Compilers and linters walking syntax trees to analyze code structures.' }
  ],
  practiceQuestions: [
    { question: 'What error is raised when a recursive function in Python runs without hitting a base case?', hint: 'Depth exceeded error.', answer: '`RecursionError: maximum recursion depth exceeded`.' },
    { question: 'What is the default recursion depth limit in CPython?', hint: 'Roughly how many frames?', answer: 'Default is typically 1,000 frames (inspectable via `sys.getrecursionlimit()`).' },
    { question: 'Why does `@functools.lru_cache` drastically accelerate recursive Fibonacci?', hint: 'Eliminates redundant subproblems.', answer: 'It caches previously computed results in a hash map, reducing time complexity from O(2^N) to O(N).' }
  ],
  quiz: [
    {
      question: 'What essential component must every recursive function possess?',
      options: ['A global variable', 'At least one base case', 'A while loop', 'A decorator'],
      correctAnswer: 1,
      explanation: 'Without a base case, recursion continues indefinitely until exhausting the call stack.'
    },
    {
      question: 'Does Python automatically optimize tail-recursive functions?',
      options: ['Yes, always', 'Only when compiled with -O flag', 'No, Python never optimizes tail calls', 'Yes, for integers only'],
      correctAnswer: 2,
      explanation: 'Python intentionally does not perform Tail Call Optimization to preserve complete stack traces.'
    },
    {
      question: 'Which module allows you to check or increase the recursion limit in Python?',
      options: ['os', 'sys', 'math', 'functools'],
      correctAnswer: 1,
      explanation: '`sys.getrecursionlimit()` and `sys.setrecursionlimit()` reside in the `sys` module.'
    }
  ],
  codingChallenge: {
    title: 'Flatten Arbitrarily Nested Lists',
    difficulty: 'Intermediate',
    description: 'Write a recursive function `flatten(nested_list: list) -> list` that takes an arbitrarily deeply nested list of integers and returns a single flat list containing all elements in left-to-right order.',
    starterCode: `def flatten(nested_list: list) -> list:
    # Write your solution here
    pass`,
    hints: [
      'Iterate over items in nested_list.',
      'If item is list, recursively call flatten(item) and extend result.',
      'Else append item directly.'
    ],
    solution: `def flatten(nested_list: list) -> list:
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result`,
    testCases: [
      { input: '[1, [2, [3, 4], 5], [6]]', expectedOutput: '[1, 2, 3, 4, 5, 6]' }
    ]
  }
};

m4Lessons['py-func-higher-order'] = {
  id: 'py-func-higher-order',
  moduleId: 'python-module-4',
  title: 'Higher-Order Functions: map, filter, reduce',
  subtitle: 'Functions as First-Class Citizens, functools.reduce, and functools.partial',
  order: 8,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Understand higher-order functions: functions that take or return other functions.',
    'Use built-in map() and filter() generators for lazy data transformations.',
    'Use functools.reduce() for iterative accumulators and folding.',
    'Create specialized functions using functools.partial.'
  ],
  prerequisites: ['Python functions and lambda expressions.'],
  analogy: {
    title: 'The Manufacturing Assembly Line',
    text: 'A standard function is a machine that processes an apple into juice. A higher-order function is the factory manager: they take a whole conveyor belt of fruit and plug in whichever specific processing machine (slicer, peeler, juicer) you deliver into their hands.',
    metaphor: 'Higher-order functions accept behavior as data.'
  },
  problemSolved: {
    title: 'Expressive Functional Transformations Without Explicit Loops',
    description: 'Traditional imperative loops require manual accumulator variables and index tracking. Higher-order functions abstract iteration patterns into standard operations (transform, filter, accumulate).',
    keyPoints: [
      '`map(func, iterable)` applies func to every item lazily.',
      '`filter(predicate, iterable)` yields only items where predicate(item) is True.',
      '`functools.reduce(func, iterable, [initial])` folds an iterable down to a single value.',
      '`functools.partial(func, *args, **kwargs)` freezes certain arguments to create a simpler callable.'
    ]
  },
  intuition: {
    overview: 'Because Python functions are first-class objects (instances of `function`), they can be stored in variables, passed into arguments, and returned from other functions.',
    steps: [
      { step: 1, title: 'Passing Callables', description: 'Caller passes function reference without parentheses.' },
      { step: 2, title: 'Lazy Iteration', description: 'map and filter return iterators that process items on demand (O(1) memory).' },
      { step: 3, title: 'Partial Application', description: 'functools.partial binds fixed arguments, returning a new callable wrapper.' }
    ]
  },
  codeExample: {
    title: 'map, filter, reduce, and partial in Practice',
    code: `from functools import reduce, partial

nums = [1, 2, 3, 4, 5, 6]

# map & filter
evens = filter(lambda x: x % 2 == 0, nums)
squared_evens = list(map(lambda x: x ** 2, evens))
print("Squared evens:", squared_evens)

# reduce: compute product
product = reduce(lambda acc, val: acc * val, nums, 1)
print("Product:", product)

# partial application
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)
print("Square of 7:", square(7))
print("Cube of 3:", cube(3))`,
    explanation: 'Demonstrates map, filter, reduce for computation, and partial for freezing function parameters.'
  },
  runnableCode: {
    code: `from functools import reduce

words = ["Data", "Science", "Python", "Mastery"]
# Concatenate with hyphen using reduce
combined = reduce(lambda a, b: f"{a}-{b}", words)
print("Hyphenated:", combined)

# Filter words longer than 5 chars
long_words = list(filter(lambda w: len(w) > 5, words))
print("Long words:", long_words)`,
    expectedOutput: `Hyphenated: Data-Science-Python-Mastery
Long words: ['Science', 'Python', 'Mastery']`
  },
  lineByLine: [
    { line: 1, code: 'from functools import reduce', explanation: 'Imports reduce from standard library functools.' },
    { line: 5, code: 'combined = reduce(lambda a, b: f"{a}-{b}", words)', explanation: 'Folds words list from left to right joining elements with "-".' },
    { line: 9, code: 'long_words = list(filter(lambda w: len(w) > 5, words))', explanation: 'Filters words keeping only those with length > 5, cast to list.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `map` and `filter` when list comprehensions are cleaner in Python.',
      whyWrong: 'Python style guides generally prefer `[f(x) for x in seq if cond(x)]` over chained `map(..., filter(...))` for readability.',
      howToFix: 'Use list comprehensions unless working with pre-existing named functions or infinite iterators.'
    },
    {
      mistake: 'Forgetting that `map()` and `filter()` return lazy iterators in Python 3.',
      whyWrong: 'Printing them directly shows `<map object at 0x...>` instead of values, and they can only be consumed once.',
      howToFix: 'Wrap in `list(...)` if multiple passes or index access are required.'
    }
  ],
  realWorldApplications: [
    { title: 'Data Cleaning Pipelines', description: 'Applying sanitizers and validators across streaming data records.' },
    { title: 'Event Callbacks with Partial', description: 'Binding specific button IDs to a shared click handler in UI frameworks.' }
  ],
  practiceQuestions: [
    { question: 'What does `functools.partial` return?', hint: 'New callable wrapper.', answer: 'A `partial` object (a callable that invokes the original function with pre-filled arguments).' },
    { question: 'Why does `map(func, [1, 2, 3])` not immediately print `[f(1), f(2), f(3)]`?', hint: 'Lazy evaluation.', answer: 'Because `map` returns a lazy iterator in Python 3 that yields values only when iterated over.' },
    { question: 'What is the Pythonic alternative to `list(map(lambda x: x*2, nums))`?', hint: 'Comprehension syntax.', answer: 'A list comprehension: `[x * 2 for x in nums]`.' }
  ],
  quiz: [
    {
      question: 'Where does the `reduce` function live in modern Python 3?',
      options: ['Built-in namespace', 'functools module', 'itertools module', 'math module'],
      correctAnswer: 1,
      explanation: 'In Python 3, `reduce` was moved from built-ins to the `functools` module.'
    },
    {
      question: 'What does `filter(None, [0, 1, False, 2, "", 3])` return when cast to list?',
      options: ['[0, 1, 2, 3]', '[1, 2, 3]', '[False, ""]', '[]'],
      correctAnswer: 1,
      explanation: 'Passing `None` as the predicate to `filter()` filters out all falsy elements, keeping truthy ones (`[1, 2, 3]`).'
    },
    {
      question: 'What is the return type of `map(str, [1, 2, 3])` in Python 3?',
      options: ['list', 'tuple', 'map iterator', 'generator'],
      correctAnswer: 2,
      explanation: 'In Python 3, `map` returns a lazy `map` iterator object.'
    }
  ],
  codingChallenge: {
    title: 'Pipeline Composition Engine',
    difficulty: 'Intermediate',
    description: 'Write a function `compose_pipeline(*functions)` that takes any number of single-argument functions and returns a new function representing their composition from left to right: `pipeline(x) = fn_last(...(fn_1(x)))`. If no functions are given, return the identity function.',
    starterCode: `def compose_pipeline(*functions):
    # Write your solution here
    pass`,
    hints: [
      'Return an inner function that takes x.',
      'Iterate over functions, updating x = fn(x).',
      'Or use functools.reduce.'
    ],
    solution: `def compose_pipeline(*functions):
    def pipeline(x):
        result = x
        for fn in functions:
            result = fn(result)
        return result
    return pipeline`,
    testCases: [
      { input: 'add1 = lambda x: x + 1; double = lambda x: x * 2; pipeline = compose_pipeline(add1, double); pipeline(3)', expectedOutput: '8' }
    ]
  }
};

m4Lessons['py-func-closures'] = {
  id: 'py-func-closures',
  moduleId: 'python-module-4',
  title: 'Closures',
  subtitle: 'Enclosing Scope Binding, Factory Functions, and the __closure__ Cell Model',
  order: 9,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'memory-model',
  objectives: [
    'Understand what constitutes a closure: nested function retaining access to outer enclosing scope.',
    'Use the nonlocal keyword to rebind variables in enclosing scopes.',
    'Inspect cell objects and free variables via `__closure__` and `__code__.co_freevars`.',
    'Write factory functions that generate customized specialized functions.'
  ],
  prerequisites: ['Python scope (LEGB rule) and functions as first-class objects.'],
  analogy: {
    title: 'The Backpack of the Traveling Explorer',
    text: 'When a function finishes running, its local variables are usually packed away and destroyed. But when an inner function is created that references those variables and is returned outside, Python straps a durable backpack (`__closure__` cells) onto the inner function containing those specific variables so it can carry them wherever it travels.',
    metaphor: 'A closure is a function bundled together with references to its surrounding lexical environment.'
  },
  problemSolved: {
    title: 'Encapsulating State Without Full Object-Oriented Boilerplate',
    description: 'When you need a stateful function (like a counter or custom multiplier) without the verbosity of a full class with `__init__` and `self`, closures provide lightweight data hiding and state retention.',
    keyPoints: [
      'A closure requires: 1. A nested function; 2. Referencing a variable in enclosing scope; 3. The enclosing function returns the inner function.',
      '`nonlocal` allows modifying enclosing variables without creating new local variables.',
      'Python stores captured variables in `cell` objects referenced by `func.__closure__`.'
    ]
  },
  intuition: {
    overview: 'When Python compiles an inner function that accesses outer variables, it marks them as free variables. The outer function wraps them in heap-allocated cell objects.',
    steps: [
      { step: 1, title: 'Cell Allocation', description: 'Outer function creates a cell object on the heap holding the shared variable reference.' },
      { step: 2, title: 'Inner Binding', description: 'Inner function\'s `__closure__` tuple references this same cell object.' },
      { step: 3, title: 'State Persistence', description: 'Even after outer function returns, the cell remains in memory as long as inner function exists.' }
    ]
  },
  codeExample: {
    title: 'Stateful Counter Closure with nonlocal',
    code: `def make_counter(start: int = 0):
    """Factory function producing a stateful counter closure."""
    count = start  # Enclosing variable
    
    def counter(step: int = 1) -> int:
        nonlocal count  # Rebinds enclosing variable
        count += step
        return count
        
    return counter

c1 = make_counter(10)
print("c1 step 1:", c1())   # 11
print("c1 step 5:", c1(5))  # 16

# Inspecting closure cell
print("Free variables:", c1.__code__.co_freevars)
print("Cell content:", c1.__closure__[0].cell_contents)`,
    explanation: 'Demonstrates nonlocal rebinding and inspecting `__code__.co_freevars` and `__closure__[0].cell_contents`.'
  },
  runnableCode: {
    code: `def make_multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print("Double 5:", double(5))
print("Triple 5:", triple(5))`,
    expectedOutput: `Double 5: 10
Triple 5: 15`
  },
  lineByLine: [
    { line: 1, code: 'def make_multiplier(factor):', explanation: 'Outer factory function accepting factor.' },
    { line: 2, code: '    def multiply(x):', explanation: 'Inner function referencing factor from enclosing scope.' },
    { line: 3, code: '        return x * factor', explanation: 'Computes product using enclosing factor.' },
    { line: 4, code: '    return multiply', explanation: 'Returns inner function object preserving enclosing environment.' }
  ],
  commonMistakes: [
    {
      mistake: 'Trying to mutate an enclosing immutable variable without `nonlocal`: `count += 1`.',
      whyWrong: 'Python treats assignment as a declaration of a local variable, raising `UnboundLocalError: local variable referenced before assignment`.',
      howToFix: 'Declare `nonlocal count` inside the inner function before modifying it.'
    },
    {
      mistake: 'Creating closures inside a loop: `funcs = [lambda: i for i in range(3)]`.',
      whyWrong: 'Late binding: all lambdas bind to the SAME variable `i`, which has value 2 when the loop finishes.',
      howToFix: 'Bind at definition time using a default argument: `funcs = [lambda i=i: i for i in range(3)]`.'
    }
  ],
  realWorldApplications: [
    { title: 'Decorator Architecture', description: 'Decorators are built directly on closure mechanics to wrap functions.' },
    { title: 'Configurable Middleware', description: 'Generating request authenticators with pre-baked API secrets.' }
  ],
  practiceQuestions: [
    { question: 'What three criteria are required to form a closure in Python?', hint: 'Nested function, enclosing reference, return.', answer: '1. A nested function; 2. It references a variable in an outer enclosing function; 3. The outer function returns the nested function.' },
    { question: 'Why is the `nonlocal` keyword necessary when incrementing a counter in a closure?', hint: 'Assignment creates local variables.', answer: 'Because `count += 1` performs assignment, which Python interprets as creating a local variable unless declared `nonlocal`.' },
    { question: 'How can you inspect the value stored inside a closure cell programmatically?', hint: 'Dunder attribute.', answer: 'Via `func.__closure__[index].cell_contents`.' }
  ],
  quiz: [
    {
      question: 'What is the output of `def make(): x=5; return lambda: x; f=make(); f()`?',
      options: ['5', 'None', 'NameError: x is not defined', '0'],
      correctAnswer: 0,
      explanation: 'The lambda forms a closure capturing `x=5`, so calling `f()` returns 5.'
    },
    {
      question: 'Which keyword tells Python to rebind a variable in an outer enclosing function?',
      options: ['global', 'outer', 'nonlocal', 'closure'],
      correctAnswer: 2,
      explanation: 'The `nonlocal` keyword allows rebinding identifiers in nearest enclosing (non-global) scopes.'
    },
    {
      question: 'Given `funcs = [lambda: i for i in range(3)]`, what does `[f() for f in funcs]` return?',
      options: ['[0, 1, 2]', '[2, 2, 2]', '[3, 3, 3]', '[0, 0, 0]'],
      correctAnswer: 1,
      explanation: 'Due to late binding in Python closures, all lambdas look up the variable `i` at call time, when `i` is 2.'
    }
  ],
  codingChallenge: {
    title: 'Create Stateful Rate Limiter Closure',
    difficulty: 'Intermediate',
    description: 'Write a factory function `make_rate_limiter(max_calls: int)` that returns a closure `allow_call() -> bool`. Each time `allow_call()` is called, it increments an internal invocation count and returns `True` if total calls <= `max_calls`, or `False` if the limit has been exceeded.',
    starterCode: `def make_rate_limiter(max_calls: int):
    # Write your solution here
    pass`,
    hints: [
      'Initialize calls = 0 in enclosing scope.',
      'Use nonlocal calls inside allow_call().',
      'Increment calls and return calls <= max_calls.'
    ],
    solution: `def make_rate_limiter(max_calls: int):
    calls = 0
    def allow_call() -> bool:
        nonlocal calls
        calls += 1
        return calls <= max_calls
    return allow_call`,
    testCases: [
      { input: 'limiter = make_rate_limiter(2); [limiter(), limiter(), limiter()]', expectedOutput: '[True, True, False]' }
    ]
  }
};

m4Lessons['py-func-decorators'] = {
  id: 'py-func-decorators',
  moduleId: 'python-module-4',
  title: 'Decorators Introduction',
  subtitle: 'Function Wrapping with @syntax, functools.wraps, and Practical Decorators',
  order: 10,
  readTimeMinutes: 28,
  difficulty: 'Advanced',
  visualizerType: 'execution-trace',
  objectives: [
    'Understand how the `@decorator` syntax translates to syntactic sugar for `func = decorator(func)`.',
    'Write robust decorators supporting any argument signature using `*args` and `**kwargs`.',
    'Preserve function metadata (__name__, __doc__, annotations) using `@functools.wraps`.',
    'Implement practical decorators for timing, logging, validation, and memoization.'
  ],
  prerequisites: ['Python higher-order functions, *args/**kwargs, and closures.'],
  analogy: {
    title: 'The Gift Box and Ribbon',
    text: 'A function is a birthday gift. A decorator is the shiny wrapping paper, ribbon, and greeting tag you place around the box. When someone opens the gift, the ribbon and paper are handled first (pre-processing), the gift inside is revealed (function call), and a thank-you note is sent back (post-processing). The original gift was never physically altered.',
    metaphor: 'Decorators wrap existing functions to extend behavior without modifying original source code.'
  },
  problemSolved: {
    title: 'Cross-Cutting Concerns and Aspect-Oriented Programming',
    description: 'Concerns like execution timing, access control authentication, telemetry logging, and retry logic must often be applied across dozens of functions. Decorators eliminate repetitive boilerplate by encapsulating cross-cutting logic cleanly.',
    keyPoints: [
      '`@my_decorator` placed above `def f():` is syntactic sugar for `f = my_decorator(f)`.',
      'Always decorate inner wrappers with `@functools.wraps(func)` to preserve introspection.',
      'Decorators can take arguments by adding a third outer function layer.'
    ]
  },
  intuition: {
    overview: 'A decorator is a callable that accepts a function object as an argument and returns a new callable (usually a closure wrapping the original).',
    steps: [
      { step: 1, title: 'Wrapping', description: 'When Python encounters @dec, it passes the newly compiled function into dec.' },
      { step: 2, title: 'Wrapper Definition', description: 'The decorator returns an inner wrapper function that intercepts calls.' },
      { step: 3, title: 'Metadata Preservation', description: '@functools.wraps copies __name__, __doc__, and annotations from the target to the wrapper.' }
    ]
  },
  codeExample: {
    title: 'Production Timing and Logging Decorator',
    code: `import time
from functools import wraps

def time_it(func):
    """Decorator measuring and reporting execution duration."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start_time
        print(f"[{func.__name__}] finished in {elapsed:.6f}s")
        return result
    return wrapper

@time_it
def compute_sum(n: int) -> int:
    """Sum integers from 0 to n-1."""
    return sum(range(n))

val = compute_sum(100_000)
print(f"Result: {val}")
print(f"Preserved Name: {compute_sum.__name__}")
print(f"Preserved Doc: {compute_sum.__doc__}")`,
    explanation: 'Demonstrates a complete decorator using @wraps, timing measurement, and metadata verification.'
  },
  runnableCode: {
    code: `from functools import wraps

def repeat(num_times):
    """Decorator factory accepting parameters."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(num_times):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(num_times=3)
def roll_dice():
    return 6

print("Repeated calls:", roll_dice())`,
    expectedOutput: `Repeated calls: [6, 6, 6]`
  },
  lineByLine: [
    { line: 3, code: 'def repeat(num_times):', explanation: 'Outer decorator factory taking decorator arguments.' },
    { line: 5, code: '    def decorator(func):', explanation: 'Actual decorator taking the target function.' },
    { line: 6, code: '        @wraps(func)', explanation: 'Preserves function metadata on wrapper.' },
    { line: 7, code: '        def wrapper(*args, **kwargs):', explanation: 'Wrapper function intercepting calls.' },
    { line: 14, code: '@repeat(num_times=3)', explanation: 'Applies repeat decorator configured with num_times=3.' }
  ],
  commonMistakes: [
    {
      mistake: 'Forgetting `@functools.wraps(func)` on the inner wrapper.',
      whyWrong: 'Overwrites the decorated function\'s `__name__` with "wrapper" and wipes out its `__doc__`, breaking debugging and auto-generated API docs.',
      howToFix: 'Always decorate the inner wrapper with `@wraps(func)`.'
    },
    {
      mistake: 'Forgetting to return the result of `func(*args, **kwargs)` from the wrapper.',
      whyWrong: 'The decorated function will return `None` to the caller regardless of what it computes.',
      howToFix: 'Store `result = func(...)` and `return result` at the end of the wrapper.'
    }
  ],
  realWorldApplications: [
    { title: 'Authentication Middleware', description: 'Flask and Django `@login_required` decorators restricting endpoints to authenticated users.' },
    { title: 'API Route Registration', description: 'FastAPI `@app.get("/users")` registering handlers with the HTTP router.' }
  ],
  practiceQuestions: [
    { question: 'What does the `@` decorator syntax evaluate to behind the scenes?', hint: 'Assignment with function call.', answer: '`@dec` above `def f():` is equivalent to `f = dec(f)`.' },
    { question: 'Why is `@functools.wraps` essential when authoring decorators?', hint: 'Function introspection and metadata.', answer: 'It copies `__name__`, `__doc__`, `__annotations__`, and module attributes from the wrapped function to the wrapper.' },
    { question: 'How many nested function levels are required for a decorator that takes arguments (e.g. `@retry(attempts=3)`)?', hint: 'Decorator factory pattern.', answer: 'Three levels: 1. Factory taking decorator arguments; 2. Decorator taking the function; 3. Wrapper intercepting the call.' }
  ],
  quiz: [
    {
      question: 'What is `@my_dec` on top of `def my_func(): pass` equivalent to?',
      options: ['my_func = my_dec(my_func)', 'my_dec = my_func(my_dec)', 'my_func = my_dec', 'my_dec.register(my_func)'],
      correctAnswer: 0,
      explanation: 'The decorator syntax `f = dec(f)` passes the defined function into the decorator and rebinds the name.'
    },
    {
      question: 'If you omit `@wraps(func)`, what will `decorated_func.__name__` be?',
      options: ['decorated_func', 'None', 'wrapper (or inner function name)', 'TypeError'],
      correctAnswer: 2,
      explanation: 'Without `@wraps`, the function retains the name of the inner wrapper function defined inside the decorator.'
    },
    {
      question: 'Which tool in Python standard library provides caching/memoization as a decorator?',
      options: ['functools.lru_cache', 'itertools.cache', 'sys.memoize', 'collections.cache'],
      correctAnswer: 0,
      explanation: '`functools.lru_cache` provides LRU memoization out of the box.'
    }
  ],
  codingChallenge: {
    title: 'Build Retry Decorator with Fallback',
    difficulty: 'Advanced',
    description: 'Write a decorator factory `retry_with_fallback(max_retries: int, fallback_value)` that wraps a function. If the wrapped function raises any Exception, it retries up to `max_retries` times. If it still fails after `max_retries` attempts, it returns `fallback_value` instead of crashing. Use `@functools.wraps`.',
    starterCode: `from functools import wraps

def retry_with_fallback(max_retries: int, fallback_value):
    # Write your solution here
    pass`,
    hints: [
      'Define decorator(func), then wrapper(*args, **kwargs).',
      'Use a for loop range(max_retries): try func(...) except Exception: pass.',
      'Return fallback_value if loop exhausts.'
    ],
    solution: `from functools import wraps

def retry_with_fallback(max_retries: int, fallback_value):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception:
                    pass
            return fallback_value
        return wrapper
    return decorator`,
    testCases: [
      { input: 'fail_func = lambda: 1/0; dec = retry_with_fallback(3, -1); wrapped = dec(fail_func); wrapped()', expectedOutput: '-1' }
    ]
  }
};

const py4Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-4.ts');
writePythonModuleFile(py4Path, m4.data, m4Lessons);
console.log('Python Module 4 completed! Authored:', Object.keys(m4Lessons).length);
