const path = require('path');
const { getExistingPyLessons } = require('./extract-landmarks');
const { writePythonModuleFile } = require('./writer');

// ==========================================
// Python Module 9: Python Internals
// ==========================================
const m9 = getExistingPyLessons(9);
const m9Lessons = { ...m9.lessons };

m9Lessons['py-internals-mutable-immutable'] = {
  id: 'py-internals-mutable-immutable',
  moduleId: 'python-module-9',
  title: 'Mutable vs Immutable Objects Internals',
  subtitle: 'PyVarObject Structs, Memory Over-allocation, Tuple Efficiency, and Frozen Containers',
  order: 2,
  readTimeMinutes: 22,
  difficulty: 'Advanced',
  visualizerType: 'memory-model',
  objectives: [
    'Analyze CPython PyObject and PyVarObject C-struct memory representations.',
    'Understand why immutable objects (tuples, ints) are faster and have lower memory overhead than mutable lists.',
    'Trace dynamic array memory growth and geometric over-allocation in PyListObject.',
    'Understand why string concatenation with += can sometimes be optimized in CPython.'
  ],
  prerequisites: ['Python memory model, mutability, and CPython basics.'],
  analogy: {
    title: 'The Steel Safe vs The Accordion Binder',
    text: 'An immutable object (tuple) is a solid steel safe welded at the factory: it has exact dimensions for its payload, zero moving parts, and cannot expand by even 1 millimeter. A mutable object (list) is an expandable accordion binder: it includes extra empty pockets, velcro expansion straps, and elastic bands so you can shove more papers inside anytime.',
    metaphor: 'Tuples allocate exact memory; lists allocate geometric buffers for dynamic resizing.'
  },
  problemSolved: {
    title: 'High-Performance Memory Layout Optimization',
    description: 'When handling millions of data records, choosing between lists and tuples or knowing how strings are allocated determines whether an application consumes 500 MB or 4 GB of RAM.',
    keyPoints: [
      '`PyObject` contains `ob_refcnt` and `ob_type`. `PyVarObject` adds `ob_size`.',
      'Lists over-allocate memory geometrically (pattern: 0, 4, 8, 16, 24, 32, 40, 52, 64...).',
      'Tuples store pointers contiguously without expansion buffers, making them compact and cache-friendly.'
    ]
  },
  intuition: {
    overview: 'CPython optimizes memory by recycling empty tuple structs and pre-allocating contiguous pointer buffers for lists.',
    steps: [
      { step: 1, title: 'Tuple Allocation', description: 'CPython allocates exact memory: sizeof(PyVarObject) + n * sizeof(PyObject*).' },
      { step: 2, title: 'List Append', description: 'If size == allocated, CPython reallocates buffer with ~12.5% headroom.' },
      { step: 3, title: 'Free List Cache', description: 'Freed small tuples and lists are placed on internal free lists for rapid reuse.' }
    ]
  },
  codeExample: {
    title: 'Inspecting Memory Growth with sys.getsizeof()',
    code: `import sys

# Tuples allocate exact size
t = (1, 2, 3)
print(f"Tuple size (3 items): {sys.getsizeof(t)} bytes")

# Lists over-allocate for amortized O(1) appends
lst = []
print(f"Empty list size: {sys.getsizeof(lst)} bytes")

allocations = []
for i in range(10):
    prev_size = sys.getsizeof(lst)
    lst.append(i)
    new_size = sys.getsizeof(lst)
    if new_size != prev_size:
        print(f"Item {i}: resized from {prev_size} to {new_size} bytes")`,
    explanation: 'Demonstrates how CPython dynamically expands list capacity in discrete jumps rather than one element at a time.'
  },
  runnableCode: {
    code: `import sys

# Compare memory footprints for 100 elements
sample_list = list(range(100))
sample_tuple = tuple(range(100))

print("List memory (bytes):", sys.getsizeof(sample_list))
print("Tuple memory (bytes):", sys.getsizeof(sample_tuple))
print("Memory saved by tuple:", sys.getsizeof(sample_list) - sys.getsizeof(sample_tuple), "bytes")`,
    expectedOutput: `List memory (bytes): 856
Tuple memory (bytes): 840
Memory saved by tuple: 16 bytes`
  },
  lineByLine: [
    { line: 4, code: 'sample_list = list(range(100))', explanation: 'Creates list of 100 integers with allocation buffer.' },
    { line: 5, code: 'sample_tuple = tuple(range(100))', explanation: 'Creates compact tuple with exact memory layout.' },
    { line: 7, code: 'print("List memory (bytes):", sys.getsizeof(sample_list))', explanation: 'Reports memory including C-struct overhead.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assuming `sys.getsizeof(collection)` measures the memory of all nested elements.',
      whyWrong: '`getsizeof` measures ONLY the container itself and its array of object pointers, NOT the referenced objects themselves.',
      howToFix: 'Use recursive sizing functions or memory_profiler for deep object graph sizing.'
    },
    {
      mistake: 'Using lists for fixed dictionary lookup keys.',
      whyWrong: 'Lists are mutable and unhashable; raising TypeError when used as keys.',
      howToFix: 'Use immutable tuples or frozensets.'
    }
  ],
  realWorldApplications: [
    { title: 'Big Data Pipeline Ingestion', description: 'Converting JSON rows into namedtuples or dataclasses with __slots__ to cut RAM consumption by 60%.' },
    { title: 'Embedded Python & MicroPython', description: 'Tuning memory buffers on microcontroller devices with limited KB of RAM.' }
  ],
  practiceQuestions: [
    { question: 'What extra field does `PyVarObject` have that `PyObject` does not?', hint: 'Variable length container field.', answer: '`ob_size`, which tracks the number of items currently in the sequence.' },
    { question: 'Why does Python over-allocate memory for dynamic lists when appending?', hint: 'Asymptotic complexity.', answer: 'To achieve amortized O(1) append time complexity instead of O(N) reallocation on every single append.' },
    { question: 'Can an immutable tuple ever contain mutable objects?', hint: 'Tuple with a list inside.', answer: 'Yes, a tuple can hold a pointer to a list; the pointer is fixed, but the list itself can mutate in-place.' }
  ],
  quiz: [
    {
      question: 'What is the base C struct that ALL Python objects share in CPython?',
      options: ['PyObject', 'PyBase', 'PyMemory', 'PyRoot'],
      correctAnswer: 0,
      explanation: '`PyObject` is the fundamental header struct containing the reference count and type pointer for every object.'
    },
    {
      question: 'Why are small tuples faster to instantiate in CPython than small lists?',
      options: ['Tuples use C macros only', 'CPython maintains an internal free list of deallocated tuple structs for immediate reuse', 'Tuples are stored on the CPU registers', 'Tuples bypass bytecode'],
      correctAnswer: 1,
      explanation: 'CPython caches recently deallocated small tuples in free lists up to size 20, avoiding `malloc()` calls.'
    },
    {
      question: 'What is the time complexity of appending an element to a Python list on average?',
      options: ['O(1) amortized', 'O(N)', 'O(log N)', 'O(N^2)'],
      correctAnswer: 0,
      explanation: 'Due to geometric over-allocation, list append takes amortized O(1) time.'
    }
  ],
  codingChallenge: {
    title: 'Calculate Deep Container Memory',
    difficulty: 'Advanced',
    description: 'Write a function `deep_getsizeof(obj) -> int` that recursively calculates the total memory in bytes of an object and all nested containers (lists, tuples, dicts, sets), using a set of `id()`s to avoid counting shared or cyclic references twice.',
    starterCode: `import sys

def deep_getsizeof(obj) -> int:
    # Write your solution here
    pass`,
    hints: [
      'Maintain seen = set().',
      'If id(obj) in seen: return 0; seen.add(id(obj)).',
      'Add sys.getsizeof(obj).',
      'Recursively traverse elements for dict, list, tuple, set.'
    ],
    solution: `import sys

def deep_getsizeof(obj) -> int:
    seen = set()
    def _size(o):
        if id(o) in seen:
            return 0
        seen.add(id(o))
        total = sys.getsizeof(o)
        if isinstance(o, dict):
            for k, v in o.items():
                total += _size(k) + _size(v)
        elif isinstance(o, (list, tuple, set, frozenset)):
            for item in o:
                total += _size(item)
        return total
    return _size(obj)`,
    testCases: [
      { input: 'deep_getsizeof([1, 2, [3, 4]]) > 100', expectedOutput: 'True' }
    ]
  }
};

m9Lessons['py-internals-data-model'] = {
  id: 'py-internals-data-model',
  moduleId: 'python-module-9',
  title: "Python's Data Model",
  subtitle: 'Dunder Methods, Protocols, and How Operators, len(), iter(), and in are Dispatched',
  order: 3,
  readTimeMinutes: 25,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Understand the Python Data Model as an API that glues language syntax to object behavior.',
    'Trace how `len(x)` dispatches to `type(x).__len__(x)` at C level (tp_as_sequence->sq_length).',
    'Understand operator fallbacks: `__add__` falling back to `__radd__`, and `__eq__` falling back to identity.',
    'Understand membership testing fallback: `__contains__` -> `__iter__` -> `__getitem__`.'
  ],
  prerequisites: ['Special methods, OOP, and Python internals.'],
  analogy: {
    title: 'The Constitutional Operating System',
    text: 'The Python Data Model is the constitutional bill of rights for Python objects. Instead of random functions doing whatever they please, the constitution states: "If you want to support length, you must sign Protocol 5 (`__len__`). If you want to support the `in` operator, you sign Protocol 9 (`__contains__`). Any citizen object that signs these protocols receives instant first-class status across the entire language.',
    metaphor: 'The Data Model defines standard protocols that Python language constructs dispatch to.'
  },
  problemSolved: {
    title: 'Consistent, Predictable Polymorphism Across All Types',
    description: 'In languages like JavaScript, `[].length` is a property while `str.length` is different and arrays lack consistent operator overloads. Python\'s Data Model guarantees that `len()` works identically on strings, dicts, lists, sets, and custom classes.',
    keyPoints: [
      'Built-in functions like `len()`, `repr()`, `iter()` do NOT call methods on the instance dict; they look up slots on the class type (`type(obj).__len__`).',
      'This type-slot lookup bypasses instance attribute shadowing for maximum C speed.',
      'If `__contains__` is absent, Python iterates via `__iter__`, and if absent, indexes from 0 via `__getitem__`.'
    ]
  },
  intuition: {
    overview: 'CPython represents object behavior via type slot structs (`PyTypeObject`, `tp_as_number`, `tp_as_sequence`, `tp_as_mapping`). Calling `len(x)` calls `x->ob_type->tp_as_sequence->sq_length(x)` in pure C.',
    steps: [
      { step: 1, title: 'Type Slot Lookup', description: 'Python inspects the type object directly, avoiding instance __dict__ overhead.' },
      { step: 2, title: 'Slot Execution', description: 'Executes fast C-level function pointer.' },
      { step: 3, title: 'Protocol Fallback', description: 'If slot is null, falls back to alternative protocols in strict hierarchy.' }
    ]
  },
  codeExample: {
    title: 'Demonstrating Fallback Protocols for `in` and `iter()`',
    code: `class OldSchoolSequence:
    """Implements sequence behavior using ONLY __getitem__!"""
    def __init__(self, items):
        self._items = items

    def __getitem__(self, index):
        # Python uses __getitem__ to simulate both iter() and 'in' checks!
        if index >= len(self._items):
            raise IndexError
        return self._items[index]

seq = OldSchoolSequence(["alpha", "beta", "gamma"])

# 1. for loop uses __getitem__ fallback
for item in seq:
    print("Iterated:", item)

# 2. 'in' operator uses __getitem__ fallback scan!
print("Is 'beta' in seq?", "beta" in seq)
print("Is 'delta' in seq?", "delta" in seq)`,
    explanation: 'Shows how Python\'s Data Model gracefully falls back to __getitem__ when __iter__ and __contains__ are omitted.'
  },
  runnableCode: {
    code: `# Why len(x) bypasses instance __dict__
class MyObject:
    pass

obj = MyObject()
# Shadowing __len__ on the instance does NOT work for len()!
obj.__len__ = lambda: 42

try:
    print(len(obj))
except TypeError as e:
    print("Caught TypeError:", e)
    print("len() looks up type(obj).__len__, NOT obj.__dict__['__len__']!")`,
    expectedOutput: `Caught TypeError: object of type 'MyObject' has no len()
len() looks up type(obj).__len__, NOT obj.__dict__['__len__']!`
  },
  lineByLine: [
    { line: 8, code: 'obj.__len__ = lambda: 42', explanation: 'Attaches __len__ directly to instance dictionary.' },
    { line: 11, code: 'print(len(obj))', explanation: 'Fails with TypeError because built-in len() inspects type(obj), not obj.__dict__.' }
  ],
  commonMistakes: [
    {
      mistake: 'Trying to mock or override special methods by assigning them to an instance: `obj.__str__ = ...`.',
      whyWrong: 'Built-in functions like `str()` and `len()` look up dunder methods on the CLASS `type(obj)`, not on the instance.',
      howToFix: 'Override special methods on the class definition, or use class-level mocking.'
    },
    {
      mistake: 'Returning negative numbers or non-integers from `__len__()`.',
      whyWrong: 'Python raises `ValueError: __len__() should return >= 0` or `TypeError`.',
      howToFix: 'Ensure `__len__()` returns a non-negative `int`.'
    }
  ],
  realWorldApplications: [
    { title: 'Custom Database QuerySets', description: 'Django QuerySet implementing `__len__`, `__iter__`, and `__getitem__` to support slicing without loading all SQL rows.' },
    { title: 'NumPy Array Broadcasting', description: 'Overloading arithmetic slots for vectorized SIMD operations.' }
  ],
  practiceQuestions: [
    { question: 'Why does `len(obj)` look up `__len__` on `type(obj)` instead of `obj.__dict__`?', hint: 'Performance and consistency.', answer: 'For performance (direct C slot lookup) and to prevent instance attributes from corrupting core language protocols.' },
    { question: 'What fallback order does Python follow when checking `item in container`?', hint: 'Three protocols.', answer: '1. `__contains__`; 2. Iteration via `__iter__`; 3. Index scanning from 0 via `__getitem__`.' },
    { question: 'What is `tp_as_sequence` in CPython source code?', hint: 'C struct slot table.', answer: 'A C struct on `PyTypeObject` containing function pointers for sequence operations (`sq_length`, `sq_item`, `sq_concat`).' }
  ],
  quiz: [
    {
      question: 'Where does Python look for `__repr__` when executing `repr(x)`?',
      options: ['In x.__dict__["__repr__"]', 'In type(x).__dict__["__repr__"] (or inherited in its MRO)', 'In sys.modules', 'In the global scope'],
      correctAnswer: 1,
      explanation: 'Built-ins look up special methods on the object\'s type, not the instance dictionary.'
    },
    {
      question: 'If `a + b` is executed and `type(a)` has no `__add__` (or returns NotImplemented), what does Python try next?',
      options: ['Raises TypeError immediately', 'Calls type(b).__radd__(b, a)', 'Converts both to strings', 'Calls a.__iadd__(b)'],
      correctAnswer: 1,
      explanation: 'Python reflects the operation, calling the right-hand operand\'s `__radd__` method.'
    },
    {
      question: 'Can a class be iterated in a `for` loop if it only implements `__getitem__`?',
      options: ['No, __iter__ is strictly required', 'Yes, Python iterates by passing indices 0, 1, 2... until IndexError', 'Only if it inherits from list', 'Only in Python 2'],
      correctAnswer: 1,
      explanation: 'The Data Model falls back to calling `__getitem__` with increasing integer indices until `IndexError`.'
    }
  ],
  codingChallenge: {
    title: 'Implement Infinite Circular Indexer',
    difficulty: 'Advanced',
    description: 'Write a class `InfiniteCircularList` whose `__init__` takes a non-empty list of items. Implement `__getitem__(self, index: int)` so that ANY positive or negative integer index wraps around modulo the list length (`items[index % len(items)]`). Implement `__len__` returning the underlying list length.',
    starterCode: `class InfiniteCircularList:
    # Write your solution here
    pass`,
    hints: [
      'In __init__: validate items is non-empty; store self.items = list(items).',
      'In __getitem__(self, idx): return self.items[idx % len(self.items)].',
      'In __len__: return len(self.items).'
    ],
    solution: `class InfiniteCircularList:
    def __init__(self, items: list):
        if not items:
            raise ValueError("List cannot be empty")
        self.items = list(items)
        
    def __len__(self) -> int:
        return len(self.items)
        
    def __getitem__(self, index: int):
        return self.items[index % len(self.items)]`,
    testCases: [
      { input: 'c = InfiniteCircularList(["A", "B", "C"]); (c[0], c[3], c[-1], c[-4])', expectedOutput: '("A", "A", "C", "C")' }
    ]
  }
};

const py9Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-9.ts');
// Append remaining module 9 lessons below before writing py9Path!

m9Lessons['py-internals-hashability'] = {
  id: 'py-internals-hashability',
  moduleId: 'python-module-9',
  title: 'Hashability and __hash__',
  subtitle: 'The __hash__ and __eq__ Contract, SipHash, and Why Mutable Objects Cannot Be Hashed',
  order: 4,
  readTimeMinutes: 20,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Master the fundamental Hash Contract: `a == b` IMPLIES `hash(a) == hash(b)`.',
    'Understand why mutable objects like lists and dicts deliberately set `__hash__ = None`.',
    'Implement custom `__hash__` and `__eq__` on domain classes correctly.',
    'Understand SipHash security against Hash-DoS collision attacks in CPython.'
  ],
  prerequisites: ['Dictionaries, sets, and special methods.'],
  analogy: {
    title: 'The Permanent Locker Number vs The Shifting Sand dune',
    text: 'A hash table is a bank vault with numbered lockers. When an object is stored, Python calculates its hash number and locks it in that exact numbered box. If the object could mutate and change its hash number while sitting in the box, the banker searching for the new number would look in a completely different box and report "Item not found!" even though the object is still inside the vault.',
    metaphor: 'Hashability requires an object\'s identity and hash value to remain immutable across its entire lifetime.'
  },
  problemSolved: {
    title: 'Preventing Hash Table Lookup Corruption',
    description: 'If mutable objects were permitted as dictionary keys or set members, mutating them after insertion would break hash table indexing, making them unretrievable and creating memory leaks.',
    keyPoints: [
      'An object is hashable if it has a hash value that never changes during its lifetime and can be compared to other objects.',
      'If you define `__eq__` without `__hash__`, Python automatically sets `__hash__ = None`, making instances unhashable.',
      'Equal objects MUST produce identical hash values: `a == b` => `hash(a) == hash(b)`.'
    ]
  },
  intuition: {
    overview: 'Python uses SipHash24 to produce 64-bit hash values with a randomized per-process salt to prevent denial-of-service hash collision attacks.',
    steps: [
      { step: 1, title: 'Hash Generation', description: 'Calls type(obj).__hash__(obj) returning a signed 64-bit integer.' },
      { step: 2, title: 'Bucket Mapping', description: 'Bitwise masks hash to map into hash table indices array.' },
      { step: 3, title: 'Equality Verification', description: 'When a candidate slot is found, checks identity or `__eq__` to confirm key match.' }
    ]
  },
  codeExample: {
    title: 'Custom Hashable Domain Entity',
    code: `class UserRecord:
    def __init__(self, user_id: int, username: str):
        self._user_id = user_id
        self._username = username

    @property
    def user_id(self) -> int:
        return self._user_id

    def __eq__(self, other):
        if not isinstance(other, UserRecord):
            return False
        return self._user_id == other._user_id

    def __hash__(self):
        # Hash must be computed from the SAME fields used in __eq__!
        return hash(self._user_id)

u1 = UserRecord(101, "Alice")
u2 = UserRecord(101, "Alice_Updated")

# Can be used in sets and as dict keys!
user_set = {u1}
print("Is u2 in set (equal user_id)?", u2 in user_set) # True!
print("Set length:", len(user_set))`,
    explanation: 'Demonstrates implementing __hash__ and __eq__ in lock-step based on immutable ID attributes.'
  },
  runnableCode: {
    code: `class UnhashableClass:
    def __eq__(self, other):
        return True

obj = UnhashableClass()
print("Has __hash__?", UnhashableClass.__hash__)
try:
    hash(obj)
except TypeError as e:
    print("Caught expected error:", e)`,
    expectedOutput: `Has __hash__? None
Caught expected error: unhashable type: 'UnhashableClass'`
  },
  lineByLine: [
    { line: 2, code: '    def __eq__(self, other):', explanation: 'Defining __eq__ triggers automatic __hash__ = None.' },
    { line: 5, code: 'print("Has __hash__?", UnhashableClass.__hash__)', explanation: 'CPython explicitly sets class attribute __hash__ to None.' },
    { line: 8, code: '    hash(obj)', explanation: 'Raises TypeError: unhashable type.' }
  ],
  commonMistakes: [
    {
      mistake: 'Computing `__hash__` from mutable attributes that can change after insertion.',
      whyWrong: 'If an attribute changes, the object\'s hash changes, rendering it permanently lost inside any dictionary or set it was added to.',
      howToFix: 'Compute `__hash__` only from immutable attributes (like private IDs or frozen tuples).'
    },
    {
      mistake: 'Defining `__hash__` without defining `__eq__`.',
      whyWrong: 'Objects with equal hashes might compare unequal via default identity comparison, breaking hash lookups.',
      howToFix: 'Always implement `__hash__` and `__eq__` together.'
    }
  ],
  realWorldApplications: [
    { title: 'Deduplicating Database Entities', description: 'Using entity primary keys for hash and equality to deduplicate records in sets.' },
    { title: 'Memoization Keys', description: 'Ensuring custom configuration objects can be used as cache keys in `@lru_cache`.' }
  ],
  practiceQuestions: [
    { question: 'What is the fundamental rule connecting `__eq__` and `__hash__`?', hint: 'Implication rule.', answer: 'If `a == b` is True, then `hash(a) == hash(b)` MUST also be True.' },
    { question: 'Why are Python lists unhashable?', hint: 'Mutability.', answer: 'Because lists are mutable; modifying a list in-place would change its hash, corrupting any hash table storing it.' },
    { question: 'What algorithm does CPython use for string and bytes hashing to prevent Hash-DoS attacks?', hint: 'Cryptographic hash name.', answer: 'SipHash (specifically SipHash24) with a per-process random seed.' }
  ],
  quiz: [
    {
      question: 'What does CPython do to `__hash__` if you define `__eq__` on a class without explicitly defining `__hash__`?',
      options: ['Inherits object.__hash__', 'Sets __hash__ = None, making instances unhashable', 'Computes hash from object id', 'Generates a random hash'],
      correctAnswer: 1,
      explanation: 'Python automatically sets `__hash__ = None` to enforce correctness.'
    },
    {
      question: 'Can two unequal objects produce the same hash value?',
      options: ['No, hashes are always strictly unique', 'Yes, this is called a hash collision and is handled via open addressing', 'Only for integers', 'Only in 32-bit Python'],
      correctAnswer: 1,
      explanation: 'Hash collisions are expected when mapping infinite inputs to a 64-bit integer space; hash tables resolve them via probing.'
    },
    {
      question: 'Which of the following built-in types is hashable?',
      options: ['list', 'dict', 'set', 'frozenset'],
      correctAnswer: 3,
      explanation: '`frozenset` is immutable and hashable; list, dict, and set are mutable and unhashable.'
    }
  ],
  codingChallenge: {
    title: 'Immutable Hashable Point',
    difficulty: 'Intermediate',
    description: 'Write an immutable 2D point class `HashPoint` with attributes `x: int` and `y: int`. Implement `__eq__` comparing x and y, and `__hash__` returning `hash((self.x, self.y))`. Verify instances can be stored and looked up in a set.',
    starterCode: `class HashPoint:
    # Write your solution here
    pass`,
    hints: [
      'In __init__: self._x = int(x); self._y = int(y).',
      'In __eq__: check isinstance and compare (self.x, self.y) == (other.x, other.y).',
      'In __hash__: return hash((self.x, self.y)).'
    ],
    solution: `class HashPoint:
    def __init__(self, x: int, y: int):
        self._x = int(x)
        self._y = int(y)
        
    @property
    def x(self) -> int: return self._x
    @property
    def y(self) -> int: return self._y
    
    def __eq__(self, other):
        if not isinstance(other, HashPoint):
            return False
        return (self._x, self._y) == (other._x, other._y)
        
    def __hash__(self):
        return hash((self._x, self._y))`,
    testCases: [
      { input: 'p1 = HashPoint(1, 2); p2 = HashPoint(1, 2); len({p1, p2})', expectedOutput: '1' }
    ]
  }
};

m9Lessons['py-internals-equality-identity'] = {
  id: 'py-internals-equality-identity',
  moduleId: 'python-module-9',
  title: 'Equality vs Identity',
  subtitle: '== (Value Equivalence) vs is (Memory Address), and the None Singleton Rule',
  order: 5,
  readTimeMinutes: 18,
  difficulty: 'Intermediate',
  visualizerType: 'memory-model',
  objectives: [
    'Distinguish between value equality (`==`) and object identity (`is`).',
    'Understand why `is` compares raw memory addresses `id(a) == id(b)` without calling any methods.',
    'Follow PEP 8: always use `is` and `is not` when comparing against singletons (`None`, `True`, `False`).',
    'Understand small integer caching (-5 to 256) and why relying on `is` for integers is a fatal bug.'
  ],
  prerequisites: ['Python basics and object identity.'],
  analogy: {
    title: 'The Identical Twin Passports',
    text: 'Value equality (`==`) is comparing two people\'s driver\'s licenses: both say "Age 30, Blue Eyes, 5\'10"". They look identical on paper (`a == b` is True). Object identity (`is`) is fingerprint biometric scanning: are these two licenses held by the EXACT same biological human body in physical space? If they are identical twins, they are equal in appearance (`==`), but they are two distinct human beings (`a is b` is False).',
    metaphor: '== checks if values match; is checks if two names point to the exact same memory address.'
  },
  problemSolved: {
    title: 'Eliminating Subtly Broken Comparison Logic',
    description: 'Using `==` on `None` can execute overloaded `__eq__` methods that return unexpected results (e.g. Pandas Series returns a series of booleans rather than a single True/False). Using `is` guarantees fast, unambiguous identity checking.',
    keyPoints: [
      '`a == b` evaluates to `a.__eq__(b)` (or `b.__eq__(a)`), which can be overloaded to do anything.',
      '`a is b` evaluates to `id(a) == id(b)` in pure C, which can never be overloaded or spoofed.',
      'Small integers -5 through 256 are pre-allocated singletons in CPython, but numbers outside that range are not guaranteed to be.'
    ]
  },
  intuition: {
    overview: '`is` tests whether two pointers hold the same 64-bit integer memory address.',
    steps: [
      { step: 1, title: 'Pointer Check (is)', description: 'Directly compares CPU pointers in a single machine instruction.' },
      { step: 2, title: 'Method Dispatch (==)', description: 'Looks up `__eq__` descriptor on left operand\'s type.' },
      { step: 3, title: 'Boolean Coercion', description: 'Evaluates method output in boolean context.' }
    ]
  },
  codeExample: {
    title: 'Equality vs Identity and Integer Caching',
    code: `# Lists: identical values, distinct heap objects
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print("list1 == list2:", list1 == list2) # True (equal contents)
print("list1 is list2:", list1 is list2) # False (distinct memory addresses)

# Small integer cache (-5 to 256)
x = 256
y = 256
print("256 is 256:", x is y) # True (cached CPython singleton)

# Larger integers: NOT guaranteed to be the same object!
a = 1000
b = 1000
# Might be True in REPL compiler, but False across separate statements!
print("a == b:", a == b) # True
print("a is b:", a is b) # Demonstrates why 'is' must NEVER be used for numbers!`,
    explanation: 'Demonstrates why value equality and identity differ, and why `is` must never be used for numeric comparisons.'
  },
  runnableCode: {
    code: `val = None

# Correct PEP 8 singleton comparison
if val is None:
    print("val is None (Correct idiomatic check)")

# Why '==' on custom objects can mislead
class Deceptive:
    def __eq__(self, other):
        return True # Claims to equal everything!

d = Deceptive()
print("d == None:", d == None) # True! (Misleading!)
print("d is None:", d is None) # False! (Truthful identity check)`
  },
  lineByLine: [
    { line: 4, code: 'if val is None:', explanation: 'PEP 8 requirement: always compare singletons with is.' },
    { line: 12, code: 'print("d == None:", d == None)', explanation: 'Shows how overloaded __eq__ can hijack value comparisons.' },
    { line: 13, code: 'print("d is None:", d is None)', explanation: 'Proves `is` cannot be spoofed by custom methods.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `is` to compare numbers or strings: `if count is 0:`.',
      whyWrong: 'CPython caching behavior is an internal implementation detail, not a language specification; breaks across compilers or versions.',
      howToFix: 'Always use `==` for numbers and strings: `if count == 0:`.'
    },
    {
      mistake: 'Using `== None` instead of `is None`.',
      whyWrong: 'Violates PEP 8 and can be hijacked by classes that overload `__eq__`.',
      howToFix: 'Always use `if x is None:` or `if x is not None:`.'
    }
  ],
  realWorldApplications: [
    { title: 'Default Argument Sentinels', description: 'Using `SENTINEL = object()` and `if arg is SENTINEL:` to differentiate missing arguments from `None`.' },
    { title: 'NumPy / Pandas Validation', description: 'Avoiding array ambiguity errors by checking `if df is None:`.' }
  ],
  practiceQuestions: [
    { question: 'What does `a is b` compare behind the scenes?', hint: 'Memory addresses.', answer: 'It compares their memory addresses (`id(a) == id(b)`).' },
    { question: 'Why does PEP 8 mandate `if x is None:` rather than `if x == None:`?', hint: 'Overloading and performance.', answer: 'Because `is` compares memory address in a single CPU instruction and cannot be hijacked by overloaded `__eq__` methods.' },
    { question: 'What range of integers does CPython pre-allocate and cache in an array?', hint: 'Negative five to...', answer: 'Integers from -5 to 256 inclusive.' }
  ],
  quiz: [
    {
      question: 'What is the result of `[] == []` vs `[] is []`?',
      options: ['True, True', 'True, False', 'False, True', 'False, False'],
      correctAnswer: 1,
      explanation: 'Two newly created lists have equal values (`==` is True), but reside at separate memory allocations (`is` is False).'
    },
    {
      question: 'Which comparison is recommended by PEP 8 when checking if an object is None?',
      options: ['if x == None:', 'if x is None:', 'if type(x) is NoneType:', 'if not x:'],
      correctAnswer: 1,
      explanation: '`if x is None:` is the strict PEP 8 standard.'
    },
    {
      question: 'Can a class customize the behavior of the `is` operator?',
      options: ['Yes, by implementing __is__', 'No, the is operator cannot be overloaded or customized in Python', 'Only if subclassed from object', 'Yes, using descriptors'],
      correctAnswer: 1,
      explanation: '`is` directly compares pointer addresses at the C level; it has no dunder method and cannot be overridden.'
    }
  ],
  codingChallenge: {
    title: 'Sentinel Pattern Argument Checker',
    difficulty: 'Intermediate',
    description: 'Create a unique sentinel object `NOT_SET = object()`. Write a function `lookup_config(config: dict, key: str, default=NOT_SET)`: if key is in config, return its value. If not and default is NOT_SET, raise `KeyError(key)`. If not and default is anything else (including `None`), return `default`. Use the `is` operator to check the sentinel.',
    starterCode: `NOT_SET = object()

def lookup_config(config: dict, key: str, default=NOT_SET):
    # Write your solution here
    pass`,
    hints: [
      'Check if key in config: return config[key].',
      'If default is NOT_SET: raise KeyError(key).',
      'Otherwise return default.'
    ],
    solution: `NOT_SET = object()

def lookup_config(config: dict, key: str, default=NOT_SET):
    if key in config:
        return config[key]
    if default is NOT_SET:
        raise KeyError(key)
    return default`,
    testCases: [
      { input: 'lookup_config({"timeout": 30}, "timeout")', expectedOutput: '30' },
      { input: 'lookup_config({}, "missing", default=None)', expectedOutput: 'None' }
    ]
  }
};

m9Lessons['py-internals-legb'] = {
  id: 'py-internals-legb',
  moduleId: 'python-module-9',
  title: 'LEGB Scope Resolution in Depth',
  subtitle: 'Compiler Scope Analysis, Fast Locals (LOAD_FAST), and Cell Objects',
  order: 6,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'execution-trace',
  objectives: [
    'Deep-dive into the LEGB rule: Local -> Enclosing -> Global -> Built-in.',
    'Understand why assigning to a variable anywhere in a function makes it local at compile time.',
    'Trace CPython\'s `LOAD_FAST` (array indexed local access) vs `LOAD_GLOBAL` (dictionary lookup).',
    'Understand how cell objects bridge enclosing scopes in closures.'
  ],
  prerequisites: ['Function scopes, closures, and CPython bytecode basics.'],
  analogy: {
    title: 'The Concentric Security Zones',
    text: 'Scope resolution is like searching for a tool in concentric security perimeters. First you check your own tool belt (Local). If not there, you check the workshop room (Enclosing). If not there, you check the corporate warehouse (Global). Finally, you check the national hardware catalog (Built-in). If still not found, you raise `NameError`.',
    metaphor: 'LEGB defines the exact order Python traverses namespaces to resolve identifiers.'
  },
  problemSolved: {
    title: 'Demystifying UnboundLocalError and Scope Compilation',
    description: 'Python determines variable scope at compile time, not runtime. If a variable is assigned anywhere within a function, the compiler marks it local across the ENTIRE function body.',
    keyPoints: [
      'Local variables use `LOAD_FAST` bytecode, which accesses a fixed C-array by integer offset in nanoseconds.',
      'Global and built-in variables use `LOAD_GLOBAL`, which performs dictionary hash table lookups.',
      'The `global` keyword forces the compiler to treat a name as module-global.',
      'The `nonlocal` keyword binds to the nearest enclosing scope cell object.'
    ]
  },
  intuition: {
    overview: 'CPython\'s compiler analyzes AST symbol tables. Any variable appearing on the left side of an assignment (`=`, `+=`, `for var in`) is classified as local unless declared otherwise.',
    steps: [
      { step: 1, title: 'Symbol Table Pass', description: 'Compiler scans function body; marks all assigned identifiers as LOCAL.' },
      { step: 2, title: 'Array Allocation', description: 'Allocates fixed-size `co_varnames` tuple on the code object.' },
      { step: 3, title: 'Evaluation Error', description: 'Reading an uninitialized local slot raises UnboundLocalError.' }
    ]
  },
  codeExample: {
    title: 'Deconstructing UnboundLocalError and Fast Locals',
    code: `x = 100

def buggy_function():
    print(x) # Raises UnboundLocalError!
    x = 200  # Because x is assigned HERE, the compiler marked x as LOCAL!

try:
    buggy_function()
except UnboundLocalError as e:
    print("Caught UnboundLocalError:", e)

# How to fix: use global keyword if intentional
def fixed_function():
    global x
    print("Read global x:", x)
    x = 300

fixed_function()
print("Updated global x:", x)`,
    explanation: 'Demonstrates why assigning x inside the function makes x local for the entire function, causing UnboundLocalError on the preceding print.'
  },
  runnableCode: {
    code: `import dis

def fast_local(a):
    b = a * 2
    return b

# Notice LOAD_FAST opcodes for locals vs LOAD_GLOBAL
print("Bytecode for fast_local:")
dis.dis(fast_local)`,
    expectedOutput: `Bytecode for fast_local:`
  },
  lineByLine: [
    { line: 3, code: 'def fast_local(a):', explanation: 'Defines function with parameters and local variables.' },
    { line: 8, code: 'dis.dis(fast_local)', explanation: 'Disassembles bytecode showing CPython LOAD_FAST array indexing.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assuming a function reads a global variable until it reaches the assignment line.',
      whyWrong: 'Python is compiled, not interpreted line-by-line in a vacuum; scope classification applies to the whole function statically.',
      howToFix: 'Do not shadow globals with locals, or declare `global` / `nonlocal` explicitly.'
    },
    {
      mistake: 'Overusing the `global` keyword to share state between functions.',
      whyWrong: 'Creates tightly coupled spaghetti code that is impossible to test or parallelize.',
      howToFix: 'Pass parameters and return values explicitly.'
    }
  ],
  realWorldApplications: [
    { title: 'Performance Optimization', description: 'Binding global built-ins to local variables (`local_len = len`) in tight loops to replace `LOAD_GLOBAL` with `LOAD_FAST`.' },
    { title: 'Closure Factory Design', description: 'Writing stateful decorators that rebind enclosing cell variables via `nonlocal`.' }
  ],
  practiceQuestions: [
    { question: 'What does the acronym LEGB stand for?', hint: 'Four scope tiers.', answer: 'Local, Enclosing, Global, Built-in.' },
    { question: 'Why is `LOAD_FAST` faster than `LOAD_GLOBAL` in CPython bytecode?', hint: 'Array index vs dictionary lookup.', answer: '`LOAD_FAST` accesses a C-array by direct integer index in memory, whereas `LOAD_GLOBAL` performs hash table lookups in dictionary namespaces.' },
    { question: 'When is a variable\'s scope determined in Python?', hint: 'Compile time vs runtime.', answer: 'At compile time (when the function is compiled into a code object).' }
  ],
  quiz: [
    {
      question: 'Given `x = 5; def f(): x += 1; f()`, what error is raised?',
      options: ['NameError', 'UnboundLocalError', 'TypeError', 'ValueError'],
      correctAnswer: 1,
      explanation: '`x += 1` involves assignment, marking `x` as local. Reading `x` before assignment raises `UnboundLocalError`.'
    },
    {
      question: 'Which opcode does CPython use to access local variables in optimized functions?',
      options: ['LOAD_NAME', 'LOAD_GLOBAL', 'LOAD_FAST', 'LOAD_LOCAL'],
      correctAnswer: 2,
      explanation: 'CPython uses `LOAD_FAST` for local variable access.'
    },
    {
      question: 'Which keyword allows modifying a variable in an outer enclosing function that is NOT global?',
      options: ['outer', 'nonlocal', 'enclosing', 'parent'],
      correctAnswer: 1,
      explanation: '`nonlocal` rebinds identifiers in the nearest enclosing non-global scope.'
    }
  ],
  codingChallenge: {
    title: 'Count Variable Lookups',
    difficulty: 'Intermediate',
    description: `Write a function resolve_name(var_name: str, local_ns: dict, enclosing_ns: dict, global_ns: dict, builtin_ns: dict) -> tuple[str, any]: search for var_name following the LEGB order. Return a tuple (scope_name, value) where scope_name is "Local", "Enclosing", "Global", or "Built-in". If not found anywhere, raise NameError.`,
    starterCode: `def resolve_name(var_name: str, local_ns: dict, enclosing_ns: dict, global_ns: dict, builtin_ns: dict) -> tuple[str, any]:
    # Write your solution here
    pass`,
    hints: [
      'Check local_ns, then enclosing_ns, then global_ns, then builtin_ns.',
      'Return ("ScopeName", ns[var_name]).',
      'If exhausted, raise NameError.'
    ],
    solution: `def resolve_name(var_name: str, local_ns: dict, enclosing_ns: dict, global_ns: dict, builtin_ns: dict) -> tuple[str, any]:
    scopes = [("Local", local_ns), ("Enclosing", enclosing_ns), ("Global", global_ns), ("Built-in", builtin_ns)]
    for scope_name, ns in scopes:
        if var_name in ns:
            return scope_name, ns[var_name]
    raise NameError(f"name '{var_name}' is not defined")`,
    testCases: [
      { input: '"x", {}, {"x": 42}, {"x": 100}, {}', expectedOutput: '("Enclosing", 42)' }
    ]
  }
};

m9Lessons['py-internals-gc'] = {
  id: 'py-internals-gc',
  moduleId: 'python-module-9',
  title: 'Garbage Collection',
  subtitle: 'Reference Counting, Generational Cyclic GC, gc Module, and weakref',
  order: 7,
  readTimeMinutes: 25,
  difficulty: 'Advanced',
  visualizerType: 'memory-model',
  objectives: [
    'Understand CPython\'s primary memory management: Reference Counting (`ob_refcnt`).',
    'Understand reference cycles and why reference counting alone cannot collect them.',
    'Explore the 3-generation cyclic garbage collector (Generation 0, 1, 2) in the `gc` module.',
    'Use `weakref.ref` to reference objects without increasing their reference count.'
  ],
  prerequisites: ['Python OOP, pointers, and memory basics.'],
  analogy: {
    title: 'The Party Balloon String Counter and The Hall Monitor',
    text: 'Reference counting is holding strings to a helium party balloon. Every time someone grabs a string, the counter increments. The instant the last person lets go (`count == 0`), the balloon instantly pops and vanishes. But what if two balloons knot their strings together into a loop and float away? No person holds them, but they still hold each other. The Generational Hall Monitor (`gc` collector) periodically walks the halls, untangles self-contained knot clusters, and pops them.',
    metaphor: 'Reference counting frees objects instantly; cyclic GC detects and collects isolated reference loops.'
  },
  problemSolved: {
    title: 'Preventing Memory Leaks from Self-Referential Cycles',
    description: 'Graphs, doubly-linked lists, and parent-child DOM trees create circular references that prevent reference counts from ever reaching 0. CPython\'s generational cyclic GC resolves these leaks automatically.',
    keyPoints: [
      'Every PyObject has an `ob_refcnt`. When it hits 0, memory is deallocated IMMEDIATELY (deterministic deallocation).',
      'The cyclic GC tracks container objects (lists, dicts, tuples, classes) across 3 generations.',
      '`gc.collect()` manually triggers a full garbage collection cycle.',
      '`weakref` creates non-owning references that become `None` when the referent is garbage-collected.'
    ]
  },
  intuition: {
    overview: 'Generational GC operates on the heuristic that most objects die young. Objects surviving Generation 0 collections are promoted to Generation 1, and eventually to Generation 2.',
    steps: [
      { step: 1, title: 'Ref Count Check', description: 'When variable goes out of scope or is deleted with `del`, ob_refcnt decrements.' },
      { step: 2, title: 'Zero Reached', description: 'If ref count == 0, calls `tp_dealloc` C-handler immediately.' },
      { step: 3, title: 'Cycle Detection', description: 'When Gen 0 allocation threshold is exceeded, GC runs trial deletions to isolate cyclic islands.' }
    ]
  },
  codeExample: {
    title: 'Circular References and the gc Module',
    code: `import gc
import sys

class CycleNode:
    def __init__(self, name):
        self.name = name
        self.partner = None

# Disable automatic GC to demonstrate leak
gc.disable()

def create_cycle():
    n1 = CycleNode("A")
    n2 = CycleNode("B")
    n1.partner = n2
    n2.partner = n1
    # n1 and n2 go out of scope here, but ref count remains 1 due to the cycle!

create_cycle()
print("Unreachable objects before GC:", gc.collect()) # Collects the 2 cyclic nodes!
gc.enable()`,
    explanation: 'Demonstrates how circular references prevent immediate deallocation, and how gc.collect() cleans them up.'
  },
  runnableCode: {
    code: `import weakref

class CacheItem:
    def __init__(self, data):
        self.data = data

item = CacheItem("secret_payload")
# Weak reference: does not increment reference count!
r = weakref.ref(item)

print("Weak reference dereference:", r().data)
del item # Deletes the only strong reference!
print("Weak reference after deletion:", r())`,
    expectedOutput: `Weak reference dereference: secret_payload
Weak reference after deletion: None`
  },
  lineByLine: [
    { line: 8, code: 'r = weakref.ref(item)', explanation: 'Creates weak reference to item.' },
    { line: 11, code: 'del item', explanation: 'Decrements ref count to 0; object is deallocated immediately.' },
    { line: 12, code: 'print("Weak reference after deletion:", r())', explanation: 'Weakref resolves to None automatically.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assuming `del x` deletes the object from memory.',
      whyWrong: '`del x` only removes the identifier `x` from the local namespace and decrements `ob_refcnt`. If other references exist, the object lives on.',
      howToFix: 'Ensure all references are cleared or use weak references.'
    },
    {
      mistake: 'Using `__del__` destructors carelessly in older Python versions.',
      whyWrong: 'In Python < 3.4, cyclic objects with `__del__` could not be collected by cyclic GC and ended up in `gc.garbage`. Modern Python (PEP 442) handles this better, but `with` context managers are always preferred.',
      howToFix: 'Use context managers (`with`) instead of relying on `__del__`.'
    }
  ],
  realWorldApplications: [
    { title: 'In-Memory Caches', description: 'Using `weakref.WeakValueDictionary` so cached values are automatically evicted when caller drops their reference.' },
    { title: 'Game Engines and UI Trees', description: 'Parent UI widgets holding strong references to children, and children holding weak references to parents.' }
  ],
  practiceQuestions: [
    { question: 'What is Python\'s primary garbage collection mechanism?', hint: 'Count on PyObject.', answer: 'Reference counting.' },
    { question: 'How many generations are used in CPython\'s cyclic garbage collector?', hint: 'Number of generations.', answer: '3 generations (Generation 0, 1, and 2).' },
    { question: 'What happens when you dereference a `weakref.ref` after its referent has been garbage collected?', hint: 'Fallback value.', answer: 'It returns `None`.' }
  ],
  quiz: [
    {
      question: 'When is an object with a reference count of 0 deallocated in CPython?',
      options: ['Immediately', 'When gc.collect() is called', 'When the script exits', 'After 5 seconds'],
      correctAnswer: 0,
      explanation: 'Reference counting provides deterministic deallocation: as soon as refcount reaches 0, it is freed immediately.'
    },
    {
      question: 'Why can reference counting NOT collect circular references on its own?',
      options: ['Because circular references have refcount >= 1 even when detached from the root namespace', 'Because Python disables ref counting for classes', 'Because cycles are stored in C memory', 'Because cycles cause deadlock'],
      correctAnswer: 0,
      explanation: 'In a cycle, objects hold references to each other, keeping their reference counts above zero.'
    },
    {
      question: 'Which module allows programmatic control of the cyclic garbage collector?',
      options: ['sys', 'gc', 'memory', 'cleaner'],
      correctAnswer: 1,
      explanation: 'The standard library `gc` module provides `gc.collect()`, `gc.disable()`, `gc.get_threshold()`, etc.'
    }
  ],
  codingChallenge: {
    title: 'Detect Cycle with sys.getrefcount',
    difficulty: 'Advanced',
    description: 'Write a function `has_external_references(obj) -> bool` that checks if `obj` has any references beyond the local argument and the temporary reference created by `sys.getrefcount(obj)`. Return `True` if `sys.getrefcount(obj) > 2`, otherwise `False`.',
    starterCode: `import sys

def has_external_references(obj) -> bool:
    # Write your solution here
    pass`,
    hints: [
      'sys.getrefcount(obj) always returns at least 2 (obj parameter + getrefcount parameter).',
      'Return sys.getrefcount(obj) > 2.'
    ],
    solution: `import sys

def has_external_references(obj) -> bool:
    return sys.getrefcount(obj) > 2`,
    testCases: [
      { input: 'x = [1, 2, 3]; y = x; has_external_references(x)', expectedOutput: 'True' }
    ]
  }
};

m9Lessons['py-internals-cpython'] = {
  id: 'py-internals-cpython',
  moduleId: 'python-module-9',
  title: 'CPython and Bytecode',
  subtitle: 'dis Module, Code Objects, Evaluation Loop (ceval.c), and the .pyc Cache',
  order: 8,
  readTimeMinutes: 28,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Inspect Python bytecode instructions using the standard `dis` module.',
    'Explore the attributes of a code object (`co_code`, `co_consts`, `co_varnames`, `co_names`).',
    'Understand how `__pycache__` stores compiled `.pyc` files for fast startup.',
    'Understand the CPython virtual machine evaluation stack and `ceval.c` loop.'
  ],
  prerequisites: ['Python execution model and functions.'],
  analogy: {
    title: 'The Blueprint and The Robotic Assembly Arm',
    text: 'Python source code is a hand-written architect\'s sketch in English. CPython\'s compiler translates the sketch into numerical CNC machine instructions (`co_code` bytecode: `LOAD_CONST`, `BINARY_ADD`). The CPython virtual machine is the robotic arm on the assembly floor: it reads opcode #23, moves the arm, pushes a part onto the stack, and reads the next opcode in a tight continuous loop.',
    metaphor: 'Source code compiles to code objects containing bytecode executed by a stack-based VM.'
  },
  problemSolved: {
    title: 'Understanding What Python Actually Executes Under the Hood',
    description: 'Debugging complex performance issues and understanding language quirks requires peeling back the abstraction layers and viewing the actual bytecode instructions the virtual machine evaluates.',
    keyPoints: [
      'Python compiles source to code objects (`types.CodeType`), which are immutable collections of instructions.',
      '`co_consts` holds literals, `co_varnames` holds local names, `co_names` holds global/attribute names.',
      'The Python VM is stack-based: opcodes push and pop operands onto an evaluation stack.'
    ]
  },
  intuition: {
    overview: 'CPython executes opcodes inside `_PyEval_EvalFrameDefault` in `Python/ceval.c`, a giant switch/jump table statement processing bytecode instructions sequentially.',
    steps: [
      { step: 1, title: 'Parsing & AST', description: 'Source code text is tokenized and built into an Abstract Syntax Tree.' },
      { step: 2, title: 'Bytecode Emission', description: 'AST is compiled into a Code Object containing `co_code` bytes.' },
      { step: 3, title: 'Evaluation Loop', description: 'PVM pops operands from the value stack, computes operations, and pushes results.' }
    ]
  },
  codeExample: {
    title: 'Disassembling a Function and Inspecting Code Object Attributes',
    code: `import dis

def calculate(x, y=10):
    """Simple calculation function."""
    total = (x * 2) + y
    return total

# Inspecting Code Object attributes
co = calculate.__code__
print("Function Name:", co.co_name)
print("Argument Count:", co.co_argcount)
print("Constants (co_consts):", co.co_consts)
print("Local Variables (co_varnames):", co.co_varnames)

# Disassembling instructions
print("\\nDisassembly:")
dis.dis(calculate)`,
    explanation: 'Demonstrates introspecting Code Object attributes and disassembling bytecode with dis.dis().'
  },
  runnableCode: {
    code: `import dis

# Inspecting bytecode for a simple expression
expr_code = compile("a + b * 2", "<string>", "eval")
print("Opcode sequence:")
for instr in dis.get_instructions(expr_code):
    print(f"  {instr.opname:<16} arg={instr.argval}")`,
    expectedOutput: `Opcode sequence:
  LOAD_NAME        arg=a
  LOAD_NAME        arg=b
  LOAD_CONST       arg=2
  BINARY_OP        arg=5
  BINARY_OP        arg=0
  RETURN_VALUE     arg=None`
  },
  lineByLine: [
    { line: 4, code: 'expr_code = compile("a + b * 2", "<string>", "eval")', explanation: 'Compiles expression directly into a code object.' },
    { line: 6, code: 'for instr in dis.get_instructions(expr_code):', explanation: 'Iterates through disassembled instruction tokens.' },
    { line: 7, code: '    print(f"  {instr.opname:<16} arg={instr.argval}")', explanation: 'Outputs human-readable opcode names.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assuming `.pyc` files make Python code run faster after loading.',
      whyWrong: '`.pyc` files only skip the parsing and compilation phase during startup; runtime execution speed is identical.',
      howToFix: 'Understand that `.pyc` caches accelerate startup time, not execution speed.'
    },
    {
      mistake: 'Believing Python is purely an "interpreted" language with no compilation.',
      whyWrong: 'Python is always compiled to bytecode before execution begins.',
      howToFix: 'Recognize Python as a bytecode-compiled virtual-machine language.'
    }
  ],
  realWorldApplications: [
    { title: 'Security & Obfuscation Analysis', description: 'Decompiling `.pyc` files during malware reverse engineering using tools like uncompyle6.' },
    { title: 'JIT Compilers (PyPy / Numba)', description: 'Translating Python bytecode into optimized native machine code for numerical loops.' }
  ],
  practiceQuestions: [
    { question: 'What module in the Python standard library disassembles bytecode?', hint: 'Three-letter module name.', answer: 'The `dis` module.' },
    { question: 'What attribute on a function holds its compiled code object?', hint: 'Dunder attribute.', answer: '`func.__code__`.' },
    { question: 'Is the CPython virtual machine register-based or stack-based?', hint: 'Stack or register architecture.', answer: 'It is a stack-based virtual machine.' }
  ],
  quiz: [
    {
      question: 'What is stored in `co.co_consts` on a code object?',
      options: ['A tuple of literal constants used in the code (numbers, strings, None, docstring)', 'Global variable names', 'Local variable names', 'Bytecode instruction offsets'],
      correctAnswer: 0,
      explanation: '`co_consts` holds all literal constants evaluated during compilation, including the docstring.'
    },
    {
      question: 'Where are compiled bytecode files cached on disk?',
      options: ['In /tmp', 'In the __pycache__ directory alongside source files', 'In the Python installation directory', 'In .venv/cache'],
      correctAnswer: 1,
      explanation: 'CPython stores compiled `.pyc` files in the `__pycache__` directory.'
    },
    {
      question: 'What C source file contains the primary bytecode evaluation loop in CPython?',
      options: ['Python/main.c', 'Python/ceval.c', 'Objects/object.c', 'Modules/gc.c'],
      correctAnswer: 1,
      explanation: '`Python/ceval.c` contains `_PyEval_EvalFrameDefault`, the main virtual machine loop.'
    }
  ],
  codingChallenge: {
    title: 'Extract Opcode Names from Function',
    difficulty: 'Advanced',
    description: 'Write a function `get_opcodes(fn: callable) -> list[str]` that takes a function and returns a list of unique opcode names (`instr.opname`) present in its bytecode using `dis.get_instructions`.',
    starterCode: `import dis

def get_opcodes(fn: callable) -> list[str]:
    # Write your solution here
    pass`,
    hints: [
      'Iterate for instr in dis.get_instructions(fn).',
      'Collect instr.opname in a set, then return sorted(list(opnames)).'
    ],
    solution: `import dis

def get_opcodes(fn: callable) -> list[str]:
    opnames = {instr.opname for instr in dis.get_instructions(fn)}
    return sorted(list(opnames))`,
    testCases: [
      { input: 'def test_fn(a, b): return a + b; "RETURN_VALUE" in get_opcodes(test_fn)', expectedOutput: 'True' }
    ]
  }
};

m9Lessons['py-internals-gil'] = {
  id: 'py-internals-gil',
  moduleId: 'python-module-9',
  title: 'The GIL (Global Interpreter Lock)',
  subtitle: 'Thread Safety, CPU vs I/O Bound Workloads, and Python 3.13 Free-Threaded Mode',
  order: 9,
  readTimeMinutes: 25,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Understand what the Global Interpreter Lock (GIL) is: a mutex guarding Python object access.',
    'Explain why the GIL was created: simplified C-extension integration and reference count thread safety.',
    'Differentiate CPU-bound tasks (blocked by GIL) from I/O-bound tasks (GIL released during I/O).',
    'Understand modern developments: PEP 703 and Python 3.13 free-threaded mode (nogil).'
  ],
  prerequisites: ['CPython internals, reference counting, and threading concepts.'],
  analogy: {
    title: 'The Single Microphone at the Town Hall',
    text: 'Imagine a town hall meeting with 8 delegates (CPU cores). In theory, all 8 could speak simultaneously. But the meeting has only ONE physical wireless microphone (the GIL). Even if you hire 8 delegates, only the delegate holding the microphone can speak (execute Python bytecode). When a delegate pauses to read a document (I/O wait), they pass the microphone to another delegate. But for non-stop talking (CPU math), 7 delegates sit in total silence waiting.',
    metaphor: 'The GIL allows only one OS thread to execute Python bytecode at a time.'
  },
  problemSolved: {
    title: 'Preventing Race Conditions in CPython\'s Reference Counting Memory Manager',
    description: 'Without the GIL, every increment and decrement of `ob_refcnt` across all Python objects would require atomic locks, creating massive performance overhead on single-threaded programs. The GIL makes single-threaded Python fast and simple.',
    keyPoints: [
      'The GIL does NOT mean Python code is thread-safe; shared user data structures still require locks.',
      'For I/O-bound tasks (network, disk, database), threads release the GIL while waiting, enabling true concurrency.',
      'For CPU-bound tasks (math, encryption, image processing), standard threading provides NO speedup across multi-core CPUs.',
      'Use `multiprocessing` or C extensions (NumPy) to bypass the GIL for CPU-bound tasks.'
    ]
  },
  intuition: {
    overview: 'CPython releases the GIL every 5 milliseconds (or during blocking I/O calls) to give other threads a chance to run.',
    steps: [
      { step: 1, title: 'Acquire GIL', description: 'OS thread acquires the GIL mutex before executing bytecode.' },
      { step: 2, title: 'Release during I/O', description: 'Before making blocking OS read/write calls, thread drops the GIL.' },
      { step: 3, title: 'Reacquire', description: 'When I/O returns, thread reacquires GIL to process returned Python data.' }
    ]
  },
  codeExample: {
    title: 'Comparing CPU-Bound Threading vs Multiprocessing',
    code: `import time
import threading
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def cpu_heavy_task(n=5_000_000):
    total = 0
    for i in range(n):
        total += i
    return total

# Demonstrating that 2 threads do NOT halve CPU time due to GIL
start = time.perf_counter()
t1 = threading.Thread(target=cpu_heavy_task)
t2 = threading.Thread(target=cpu_heavy_task)
t1.start(); t2.start()
t1.join(); t2.join()
thread_time = time.perf_counter() - start
print(f"2 Threads CPU time: {thread_time:.3f}s (No speedup due to GIL)")

# NumPy and C-extensions release GIL during matrix math!
# PEP 703 in Python 3.13 introduces optional free-threaded build (--disable-gil)`,
    explanation: 'Demonstrates how the GIL prevents multithreaded CPU-bound tasks from running in parallel on multi-core CPUs.'
  },
  runnableCode: {
    code: `import sys

# Checking if GIL is enabled in active Python build
is_gil_enabled = True
if hasattr(sys, "_is_gil_enabled"):
    is_gil_enabled = sys._is_gil_enabled()

print(f"Python Version: {sys.version.split()[0]}")
print(f"Is GIL currently active? {is_gil_enabled}")`,
    expectedOutput: `Python Version: 3.12.0
Is GIL currently active? True`
  },
  lineByLine: [
    { line: 5, code: 'if hasattr(sys, "_is_gil_enabled"):', explanation: 'Python 3.13+ API for checking free-threaded mode status.' },
    { line: 8, code: 'print(f"Is GIL currently active? {is_gil_enabled}")', explanation: 'Reports whether interpreter is bound by GIL.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assuming Python threading speeds up heavy numeric or machine learning calculations.',
      whyWrong: 'Pure Python CPU code cannot execute in parallel on multiple cores due to the GIL.',
      howToFix: 'Use `multiprocessing.Pool` or libraries like NumPy that release the GIL during C computation.'
    },
    {
      mistake: 'Believing that user code doesn\'t need `threading.Lock` because the GIL exists.',
      whyWrong: 'The GIL only protects CPython internals. Context switches can happen between any bytecode instruction, causing race conditions in user data.',
      howToFix: 'Always use `threading.Lock()` when mutating shared state across threads.'
    }
  ],
  realWorldApplications: [
    { title: 'Web Servers (Gunicorn / Uvicorn)', description: 'Running multiple worker processes (pre-fork model) to utilize all CPU cores.' },
    { title: 'High-Performance Numerical Computing', description: 'NumPy releasing the GIL to run multi-threaded BLAS/LAPACK matrix operations.' }
  ],
  practiceQuestions: [
    { question: 'What does GIL stand for?', hint: 'Acronym definition.', answer: 'Global Interpreter Lock.' },
    { question: 'Under what workloads does Python threading provide significant performance benefits?', hint: 'CPU vs I/O.', answer: 'Under I/O-bound workloads (network requests, disk reading/writing, database queries) where threads release the GIL.' },
    { question: 'What PEP in Python 3.13 introduces the experimental ability to run Python without the GIL?', hint: 'PEP number.', answer: 'PEP 703 (Making the Global Interpreter Lock Optional in CPython).' }
  ],
  quiz: [
    {
      question: 'Why was the GIL originally introduced into CPython?',
      options: ['To slow down Python', 'To make thread-safe memory management simple and maximize single-threaded performance without complex locks', 'To support GPUs', 'To enforce strict typing'],
      correctAnswer: 1,
      explanation: 'The GIL simplified C extension development and made single-threaded reference counting fast.'
    },
    {
      question: 'Which concurrency model should you choose in Python to utilize all 16 cores of a CPU for heavy mathematical processing?',
      options: ['threading', 'multiprocessing', 'asyncio', 'generators'],
      correctAnswer: 1,
      explanation: '`multiprocessing` spawns separate OS processes, each with its own Python interpreter and GIL, utilizing all CPU cores.'
    },
    {
      question: 'Does the GIL protect user variables from race conditions in multithreaded programs?',
      options: ['Yes, Python variables are always thread-safe', 'No, the GIL only protects CPython interpreter internals; user code still requires locks', 'Only for integers', 'Only in Python 3'],
      correctAnswer: 1,
      explanation: 'Threads can switch between bytecode operations, creating race conditions in user code without explicit locks.'
    }
  ],
  codingChallenge: {
    title: 'Select Concurrency Strategy',
    difficulty: 'Intermediate',
    description: 'Write a function `recommend_concurrency(task_type: str, io_bound: bool) -> str` that returns `"multiprocessing"` for CPU-bound tasks, `"asyncio"` for high-concurrency I/O-bound tasks (`task_type == "network"`), and `"threading"` for general I/O tasks.',
    starterCode: `def recommend_concurrency(task_type: str, io_bound: bool) -> str:
    # Write your solution here
    pass`,
    hints: [
      'If not io_bound: return "multiprocessing".',
      'If io_bound and task_type == "network": return "asyncio".',
      'Else return "threading".'
    ],
    solution: `def recommend_concurrency(task_type: str, io_bound: bool) -> str:
    if not io_bound:
        return "multiprocessing"
    if task_type == "network":
        return "asyncio"
    return "threading"`,
    testCases: [
      { input: '"image_processing", False', expectedOutput: '"multiprocessing"' },
      { input: '"network", True', expectedOutput: '"asyncio"' },
      { input: '"disk_read", True', expectedOutput: '"threading"' }
    ]
  }
};

m9Lessons['py-internals-concurrency'] = {
  id: 'py-internals-concurrency',
  moduleId: 'python-module-9',
  title: 'Threads, Processes, and Async I/O',
  subtitle: 'threading, multiprocessing, asyncio, concurrent.futures, and Selecting the Right Model',
  order: 10,
  readTimeMinutes: 30,
  difficulty: 'Advanced',
  visualizerType: 'execution-trace',
  objectives: [
    'Compare the three concurrency paradigms: OS Threads, OS Processes, and Async Event Loops.',
    'Use `concurrent.futures.ThreadPoolExecutor` and `ProcessPoolExecutor` for clean task dispatch.',
    'Understand cooperative multitasking with `asyncio`, `async def`, `await`, and event loops.',
    'Select the optimal concurrency architecture based on workload characteristics.'
  ],
  prerequisites: ['Python functions, GIL concepts, and generators.'],
  analogy: {
    title: 'The Restaurant Kitchen Concurrency Models',
    text: 'Threading is hiring 4 cooks who share a single stove (one pan at a time due to GIL, but good if waiting for orders). Multiprocessing is opening 4 separate restaurants in different buildings, each with their own stove and kitchen (true parallel cooking, but high rent/memory cost to communicate). Async I/O is a single master chef with a stopwatch who puts 10 pizzas in the oven, steps away while they bake, chops onions, checks the dough, and never sits idle waiting.',
    metaphor: 'Threads share memory; processes have isolated memory; asyncio runs single-threaded cooperative multitasking.'
  },
  problemSolved: {
    title: 'Scaling Concurrent Workloads Without Crashing Resources',
    description: 'Spawning 10,000 OS threads will crash an operating system due to stack memory exhaustion. Async I/O handles 100,000 concurrent network sockets in a single thread with minimal RAM.',
    keyPoints: [
      '`threading`: Best for I/O-bound tasks with shared memory.',
      '`multiprocessing`: Best for CPU-bound tasks utilizing multiple CPU cores.',
      '`asyncio`: Best for high-concurrency network services (web servers, websockets) without thread overhead.',
      '`concurrent.futures`: High-level unified API for managing thread and process pools.'
    ]
  },
  intuition: {
    overview: 'Concurrency means dealing with lots of things at once; parallelism means doing lots of things at once. Asyncio provides concurrency on 1 core; multiprocessing provides true parallelism.',
    steps: [
      { step: 1, title: 'Analyze Bottleneck', description: 'Determine if bottleneck is CPU (computation) or I/O (network/disk).' },
      { step: 2, title: 'Select Architecture', description: 'Choose multiprocessing for CPU, asyncio/threading for I/O.' },
      { step: 3, title: 'Execute & Gather', description: 'Dispatch tasks to executors or gather async coroutines.' }
    ]
  },
  codeExample: {
    title: 'Unified Task Dispatch with concurrent.futures',
    code: `from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def fetch_data(source_id: int) -> dict:
    """Simulate fetching remote data."""
    time.sleep(0.05)
    return {"id": source_id, "data": f"payload_{source_id}"}

# Thread pool managing worker threads
sources = [101, 102, 103, 104]
results = []

with ThreadPoolExecutor(max_workers=4) as executor:
    # Submit tasks returning future objects
    future_to_id = {executor.submit(fetch_data, sid): sid for sid in sources}
    for future in as_completed(future_to_id):
        sid = future_to_id[future]
        try:
            data = future.result()
            results.append(data)
        except Exception as exc:
            print(f"Source {sid} generated an exception: {exc}")

print(f"Gathered {len(results)} results in parallel!")`,
    explanation: 'Demonstrates ThreadPoolExecutor for parallel network fetching and handling results via as_completed().'
  },
  runnableCode: {
    code: `import asyncio

async def fetch_api(endpoint: str, delay: float):
    print(f"Starting {endpoint}...")
    await asyncio.sleep(delay)  # Non-blocking pause!
    print(f"Finished {endpoint}!")
    return f"{endpoint}_data"

async def main():
    # Run two coroutines concurrently on a single thread!
    results = await asyncio.gather(
        fetch_api("users", 0.05),
        fetch_api("orders", 0.02)
    )
    print("Gathered results:", results)

asyncio.run(main())`,
    expectedOutput: `Starting users...
Starting orders...
Finished orders...
Finished users!
Gathered results: ['users_data', 'orders_data']`
  },
  lineByLine: [
    { line: 5, code: '    await asyncio.sleep(delay)', explanation: 'Yields control back to the event loop while waiting.' },
    { line: 12, code: '    results = await asyncio.gather(...)', explanation: 'Schedules coroutines concurrently on the event loop.' },
    { line: 17, code: 'asyncio.run(main())', explanation: 'Initializes event loop, executes main(), and cleans up resources.' }
  ],
  commonMistakes: [
    {
      mistake: 'Calling blocking functions (like `time.sleep()` or `requests.get()`) inside `async def` functions.',
      whyWrong: 'Freezes the entire single-threaded event loop, blocking ALL other concurrent async tasks from executing.',
      howToFix: 'Use async non-blocking alternatives (`asyncio.sleep`, `httpx`, `aiohttp`) or run blocking code in `asyncio.to_thread()`.'
    },
    {
      mistake: 'Using multiprocessing without wrapping main entry code in `if __name__ == "__main__":`.',
      whyWrong: 'On Windows and macOS (spawn method), child processes re-import the main script, creating an infinite recursive process fork bomb.',
      howToFix: 'Always guard multiprocessing starts with `if __name__ == "__main__":`.'
    }
  ],
  realWorldApplications: [
    { title: 'Web Frameworks (FastAPI / Starlette)', description: 'Handling tens of thousands of concurrent client connections with asyncio.' },
    { title: 'Data Processing Pipelines', description: 'Using `ProcessPoolExecutor` to parallelize image resizing or video encoding across all CPU cores.' }
  ],
  practiceQuestions: [
    { question: 'What is the primary difference between `threading` and `multiprocessing` in Python?', hint: 'Memory isolation.', answer: 'Threads share the same memory space and are constrained by a single GIL; processes have separate memory spaces and separate GILs, achieving true CPU parallelism.' },
    { question: 'What happens if you run a blocking call like `time.sleep(5)` inside an `asyncio` coroutine?', hint: 'Event loop impact.', answer: 'It blocks the single thread running the event loop, freezing all other concurrent coroutines for 5 seconds.' },
    { question: 'What is the unified standard library module that provides `ThreadPoolExecutor` and `ProcessPoolExecutor`?', hint: 'Module name.', answer: '`concurrent.futures`.' }
  ],
  quiz: [
    {
      question: 'Which concurrency model can handle 50,000 concurrent open socket connections on modest hardware with minimal RAM?',
      options: ['multiprocessing', 'threading', 'asyncio', 'subprocesses'],
      correctAnswer: 2,
      explanation: '`asyncio` uses lightweight coroutines rather than OS thread stacks, scaling to tens of thousands of connections easily.'
    },
    {
      question: 'Why must code starting multiprocessing on Windows be inside `if __name__ == "__main__":`?',
      options: ['To compile the script', 'Because Windows uses the spawn method, which re-imports the script in child processes', 'Windows security restriction', 'To enable CPython optimizations'],
      correctAnswer: 1,
      explanation: 'The spawn start method re-imports the main module; without the guard, it enters an infinite process-creation loop.'
    },
    {
      question: 'How do you run a blocking synchronous function in a background thread from within asyncio?',
      options: ['await asyncio.to_thread(func, *args)', 'async func()', 'run_sync(func)', 'thread(func)'],
      correctAnswer: 0,
      explanation: '`asyncio.to_thread(func, *args)` offloads the blocking callable to a separate worker thread.'
    }
  ],
  codingChallenge: {
    title: 'Asynchronous Batch Fetcher',
    difficulty: 'Advanced',
    description: 'Write an async function `batch_fetch(items: list[str]) -> list[str]` that processes all items concurrently using `asyncio.gather`. For each item, simulate a network fetch with `await asyncio.sleep(0.01)` and return `f"fetched_{item}"`.',
    starterCode: `import asyncio

async def batch_fetch(items: list[str]) -> list[str]:
    # Write your solution here
    pass`,
    hints: [
      'Define helper async def fetch_item(item): await asyncio.sleep(0.01); return f"fetched_{item}".',
      'Use await asyncio.gather(*(fetch_item(i) for i in items)).',
      'Return list of results.'
    ],
    solution: `import asyncio

async def batch_fetch(items: list[str]) -> list[str]:
    async def fetch_one(item: str) -> str:
        await asyncio.sleep(0.01)
        return f"fetched_{item}"
    return list(await asyncio.gather(*(fetch_one(item) for item in items)))`,
    testCases: [
      { input: 'asyncio.run(batch_fetch(["A", "B"]))', expectedOutput: '["fetched_A", "fetched_B"]' }
    ]
  }
};

writePythonModuleFile(py9Path, m9.data, m9Lessons);
console.log('Python Module 9 completed! Authored:', Object.keys(m9Lessons).length);

// ==========================================
// Python Module 10: Practical Python
// ==========================================
const m10 = getExistingPyLessons(10);
const m10Lessons = { ...m10.lessons };

m10Lessons['py-practical-json-csv'] = {
  id: 'py-practical-json-csv',
  moduleId: 'python-module-10',
  title: 'JSON and CSV Processing',
  subtitle: 'json.loads/dumps, csv.DictReader/DictWriter, and Custom JSON Encoders',
  order: 1,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Serialize and deserialize JSON payloads using `json.dumps()`, `json.loads()`, `json.dump()`, and `json.load()`.',
    'Handle non-serializable objects (datetime, Decimal, UUID) using custom `json.JSONEncoder` classes or default handlers.',
    'Parse and generate CSV files cleanly using `csv.reader`, `csv.writer`, `csv.DictReader`, and `csv.DictWriter`.',
    'Prevent dialect and newline errors when processing CSVs across platforms.'
  ],
  prerequisites: ['Python dictionaries, lists, and file I/O basics.'],
  analogy: {
    title: 'The Universal Cargo Manifest and Shipping Crates',
    text: 'In global shipping, you cannot just throw loose items into a freighter. JSON is a standardized barcode-stamped shipping crate (hierarchical, typed strings, arrays, booleans) recognized by every port in the world. CSV is a flat tabular manifest grid: rows of items separated by commas. Python provides automated translators (`json` and `csv` modules) to pack Python objects into these international formats and unpack them upon delivery.',
    metaphor: 'JSON and CSV are the universal data interchange formats of web services and data science.'
  },
  problemSolved: {
    title: 'Interoperable Data Interchange with External Systems',
    description: 'Databases, web APIs, frontend apps, and spreadsheet software do not understand Python-specific binary memory formats. JSON and CSV provide universally portable text formats.',
    keyPoints: [
      '`json.loads(s)` parses a JSON string; `json.dumps(obj)` serializes a Python object to string.',
      '`json.load(f)` and `json.dump(obj, f)` operate directly on open file handles.',
      '`csv.DictReader` maps rows directly to dictionaries keyed by header column names.',
      'Always pass `newline=""` when opening files for writing with the `csv` module.'
    ]
  },
  intuition: {
    overview: 'The `json` module maps Python dicts to JSON objects, lists to arrays, str to string, numbers to numbers, True/False to true/false, and None to null.',
    steps: [
      { step: 1, title: 'Parse / Load', description: 'Parses raw string or file stream into Python native types.' },
      { step: 2, title: 'Manipulate', description: 'Transform structured dictionaries and lists using standard Python logic.' },
      { step: 3, title: 'Serialize / Dump', description: 'Converts modified Python objects back into compliant JSON or CSV text.' }
    ]
  },
  codeExample: {
    title: 'Custom JSON Serialization and CSV DictWriter',
    code: `import json
import csv
import io
from datetime import datetime

# Handling non-serializable types with custom default
def custom_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

payload = {
    "report_id": 9942,
    "timestamp": datetime(2026, 10, 18, 12, 0, 0),
    "active": True
}
json_text = json.dumps(payload, default=custom_serializer, indent=2)
print("Serialized JSON:\\n", json_text)

# Writing and reading tabular CSV
csv_buffer = io.StringIO()
fieldnames = ["id", "name", "role"]
writer = csv.DictWriter(csv_buffer, fieldnames=fieldnames)
writer.writeheader()
writer.writerow({"id": 1, "name": "Alice", "role": "Engineer"})
writer.writerow({"id": 2, "name": "Bob", "role": "Designer"})

csv_buffer.seek(0)
reader = csv.DictReader(csv_buffer)
for row in reader:
    print(f"User #{row['id']}: {row['name']} ({row['role']})")`,
    explanation: 'Demonstrates custom JSON datetime serialization and reading/writing CSV with DictWriter/DictReader.'
  },
  runnableCode: {
    code: `import json

raw_json = '{"project": "ML Mastery", "tags": ["AI", "Python"], "version": 2.0}'
data = json.loads(raw_json)

print("Project Name:", data["project"])
print("First Tag:", data["tags"][0])

# Compact dump without spaces
compact = json.dumps(data, separators=(",", ":"))
print("Compact JSON:", compact)`,
    expectedOutput: `Project Name: ML Mastery
First Tag: AI
Compact JSON: {"project":"ML Mastery","tags":["AI","Python"],"version":2.0}`
  },
  lineByLine: [
    { line: 4, code: 'data = json.loads(raw_json)', explanation: 'Deserializes JSON string into a Python dictionary.' },
    { line: 10, code: 'compact = json.dumps(data, separators=(",", ":"))', explanation: 'Serializes to compact payload by removing whitespace separators.' }
  ],
  commonMistakes: [
    {
      mistake: 'Passing a datetime, UUID, or set directly to `json.dumps()` without a custom serializer.',
      whyWrong: 'Raises `TypeError: Object of type ... is not JSON serializable`.',
      howToFix: 'Pass `default=str` or a custom serializer function to `json.dumps()`.'
    },
    {
      mistake: 'Opening CSV files for writing without `newline=""` on Windows: `open("data.csv", "w")`.',
      whyWrong: 'Causes extra blank rows between lines on Windows due to carriage return translation.',
      howToFix: 'Always open with `newline=""`: `open("data.csv", "w", newline="", encoding="utf-8")`.'
    }
  ],
  realWorldApplications: [
    { title: 'REST API Payloads', description: 'Encoding JSON request and response bodies in web endpoints.' },
    { title: 'Data Export / Reporting', description: 'Exporting user analytics tables into downloadable CSV spreadsheets for business intelligence.' }
  ],
  practiceQuestions: [
    { question: 'What is the difference between `json.loads` and `json.load`?', hint: 'String vs stream.', answer: '`json.loads` parses a JSON string; `json.load` parses a JSON stream directly from an open file-like object.' },
    { question: 'Why should you specify `newline=""` when opening a file for writing with `csv.writer`?', hint: 'Cross-platform newline handling.', answer: 'To prevent Windows from translating newlines into `\\r\\r\\n`, which creates blank lines between records.' },
    { question: 'What Python type does JSON `null` deserialize into?', hint: 'Python singleton.', answer: '`None`.' }
  ],
  quiz: [
    {
      question: 'Which of the following types is NOT natively serializable by Python\'s standard `json` module?',
      options: ['dict', 'set', 'list', 'bool'],
      correctAnswer: 1,
      explanation: 'Sets are not part of the JSON specification and raise `TypeError` unless handled with a custom serializer.'
    },
    {
      question: 'What does `csv.DictReader` use for the dictionary keys of each row?',
      options: ['Integer column indices (0, 1, 2)', 'The column header names found in the first row of the CSV', 'A random hash', 'The filename'],
      correctAnswer: 1,
      explanation: '`csv.DictReader` automatically reads the first row as headers and maps subsequent cell values to those keys.'
    },
    {
      question: 'How can you pretty-print JSON with 4-space indentation?',
      options: ['json.dumps(data, spaces=4)', 'json.dumps(data, indent=4)', 'json.dumps(data, format=True)', 'json.pretty(data)'],
      correctAnswer: 1,
      explanation: 'Passing `indent=4` formats JSON with 4-space indentation and newlines.'
    }
  ],
  codingChallenge: {
    title: 'Transform CSV Text to JSON Payload',
    difficulty: 'Intermediate',
    description: 'Write a function `csv_to_json(csv_text: str) -> str` that takes a comma-separated CSV string with a header row, parses the records using `csv.DictReader`, and returns a JSON array string representing the records formatted with `indent=2`.',
    starterCode: `import csv
import json
import io

def csv_to_json(csv_text: str) -> str:
    # Write your solution here
    pass`,
    hints: [
      'Wrap csv_text in io.StringIO.',
      'Pass stream to csv.DictReader.',
      'Convert rows to list of dicts: records = list(reader).',
      'Return json.dumps(records, indent=2).'
    ],
    solution: `import csv
import json
import io

def csv_to_json(csv_text: str) -> str:
    stream = io.StringIO(csv_text.strip())
    reader = csv.DictReader(stream)
    return json.dumps(list(reader), indent=2)`,
    testCases: [
      { input: '"id,name\\n1,Alice\\n2,Bob"', expectedOutput: '[\n  {\n    "id": "1",\n    "name": "Alice"\n  },\n  {\n    "id": "2",\n    "name": "Bob"\n  }\n]' }
    ]
  }
};

m10Lessons['py-practical-http'] = {
  id: 'py-practical-http',
  moduleId: 'python-module-10',
  title: 'HTTP and REST APIs with requests',
  subtitle: 'GET/POST/PUT/DELETE, Headers, Auth, Response Parsing, and Timeout Safeguards',
  order: 2,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Execute HTTP requests (GET, POST, PUT, DELETE) using the Python `requests` library.',
    'Inspect response status codes, headers, text, and parse JSON with `response.json()`.',
    'Pass query parameters (`params={}`), JSON payloads (`json={}`), and custom headers (`headers={}`).',
    'Always configure explicit timeouts (`timeout=5.0`) and call `response.raise_for_status()` to handle errors.'
  ],
  prerequisites: ['Python dictionaries, functions, and JSON basics.'],
  analogy: {
    title: 'The International Diplomatic Courier and Embassy Reception',
    text: 'A REST API request is a diplomatic courier delivering a diplomatic pouch to a foreign embassy. The HTTP method is the instruction envelope: "GET" means inspect the archive, "POST" means submit a new treaty draft, "DELETE" means shred a file. The headers are the courier\'s security badge and passport (Authorization tokens). The status code is the embassy clerk\'s stamped reply: "200 OK (Accepted)", "401 Unauthorized (Invalid Badge)", or "404 Not Found (Document does not exist)".',
    metaphor: 'HTTP requests communicate across web networks using standardized verbs, headers, and status codes.'
  },
  problemSolved: {
    title: 'Consuming Remote Web Services and Microservices Reliably',
    description: 'Modern applications rely on external APIs (payment processors, cloud databases, weather feeds, OAuth). The `requests` library provides an elegant, human-readable interface to communicate over HTTP.',
    keyPoints: [
      'Never send requests without a timeout: requests without timeouts can hang indefinitely, exhausting server worker threads.',
      '`response.raise_for_status()` raises `HTTPError` automatically for 4xx and 5xx failure codes.',
      '`requests.Session()` reuses underlying TCP connections (HTTP Keep-Alive), speeding up repeated requests.',
      'Passing `json={"key": "val"}` automatically serializes the dictionary and sets `Content-Type: application/json`.'
    ]
  },
  intuition: {
    overview: 'The requests library establishes a TCP handshake, encrypts TLS packets, transmits HTTP protocol text, and parses incoming byte streams into a Response object.',
    steps: [
      { step: 1, title: 'Assemble Request', description: 'Sets HTTP verb, URL, URL query params, body payload, and authentication headers.' },
      { step: 2, title: 'Network Round-Trip', description: 'Transmits over socket with configured timeout deadline.' },
      { step: 3, title: 'Parse Response', description: 'Inspects status_code, raises on error, or deserializes payload via .json().' }
    ]
  },
  codeExample: {
    title: 'Production HTTP Client with Session, Timeouts, and Error Handling',
    code: `import requests

class APIClient:
    def __init__(self, base_url: str, auth_token: str):
        self.base_url = base_url.rstrip("/")
        # Session reuses TCP connections across calls
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {auth_token}",
            "User-Agent": "MasteryLabClient/1.0",
            "Accept": "application/json"
        })

    def get_user(self, user_id: int, timeout: float = 5.0) -> dict:
        url = f"{self.base_url}/users/{user_id}"
        try:
            # Always pass explicit timeout!
            response = self.session.get(url, timeout=timeout)
            response.raise_for_status()  # Raises HTTPError on 4xx/5xx
            return response.json()
        except requests.exceptions.Timeout:
            print("Request timed out")
            return {}
        except requests.exceptions.HTTPError as err:
            print(f"HTTP error occurred: {err}")
            return {}

# Client instance ready for production calls
client = APIClient("https://api.example.com/v1", "secret_token_abc")`,
    explanation: 'Demonstrates configuring a reusable requests.Session(), setting default headers, enforcing timeouts, and catching specific HTTP exceptions.'
  },
  runnableCode: {
    code: `# Mocking requests.Response mechanics locally
class MockResponse:
    def __init__(self, status_code, json_data):
        self.status_code = status_code
        self._data = json_data
        
    def raise_for_status(self):
        if self.status_code >= 400:
            raise Exception(f"HTTP Error {self.status_code}")
            
    def json(self):
        return self._data

# Simulated API response handling
resp = MockResponse(200, {"status": "success", "user_count": 1420})
resp.raise_for_status()
print("Parsed API response:", resp.json())`,
    expectedOutput: `Parsed API response: {'status': 'success', 'user_count': 1420}`
  },
  lineByLine: [
    { line: 9, code: '        if self.status_code >= 400:', explanation: 'Checks for client (4xx) or server (5xx) failure codes.' },
    { line: 15, code: 'resp = MockResponse(200, ...)', explanation: 'Simulates successful 200 OK HTTP response.' },
    { line: 16, code: 'resp.raise_for_status()', explanation: 'Validates response is successful before proceeding.' }
  ],
  commonMistakes: [
    {
      mistake: 'Omitting the `timeout` argument in `requests.get()` or `requests.post()`.',
      whyWrong: 'If the remote server hangs or drops packets, Python will wait indefinitely, hanging the entire thread and causing thread exhaustion in production.',
      howToFix: 'Always specify a timeout: `requests.get(url, timeout=10.0)`.'
    },
    {
      mistake: 'Using `data=json.dumps(d)` and forgetting to set `Content-Type: application/json`.',
      whyWrong: 'The remote server may misinterpret the body as raw form-encoded text.',
      howToFix: 'Use the `json=d` parameter: requests sets the correct header and serializes automatically.'
    }
  ],
  realWorldApplications: [
    { title: 'Third-Party Webhook Consumers', description: 'Calling Stripe, Twilio, or GitHub webhooks upon transaction events.' },
    { title: 'Microservice RPC Communication', description: 'Internal HTTP communication between backend services in Kubernetes clusters.' }
  ],
  practiceQuestions: [
    { question: 'What method on a `requests.Response` object automatically parses a JSON body into a Python dict/list?', hint: 'Method name.', answer: '`response.json()`.' },
    { question: 'What does `response.raise_for_status()` do if the server returns a 404 or 500 status code?', hint: 'Error handling method.', answer: 'It raises a `requests.exceptions.HTTPError`.' },
    { question: 'Why should you use a `requests.Session()` object when making multiple requests to the same host?', hint: 'Connection reuse.', answer: 'It reuses underlying TCP connections (HTTP Keep-Alive), dramatically reducing connection handshake latency.' }
  ],
  quiz: [
    {
      question: 'Which parameter in `requests.post()` automatically serializes a dict to JSON and sets the Content-Type header?',
      options: ['data', 'json', 'body', 'payload'],
      correctAnswer: 1,
      explanation: 'Passing `json=my_dict` serializes the dictionary and automatically sets `Content-Type: application/json`.'
    },
    {
      question: 'What happens if a network request hangs and no `timeout` parameter was specified?',
      options: ['Python times out after 30 seconds by default', 'The request can hang indefinitely, blocking the thread forever', 'Raises ValueError', 'Retries 3 times'],
      correctAnswer: 1,
      explanation: '`requests` has NO default timeout; omitting it can cause processes to freeze indefinitely.'
    },
    {
      question: 'What HTTP status code range represents client errors (e.g. Unauthorized or Not Found)?',
      options: ['200-299', '300-399', '400-499', '500-599'],
      correctAnswer: 2,
      explanation: '4xx status codes indicate client-side errors (400 Bad Request, 401 Unauthorized, 404 Not Found).'
    }
  ],
  codingChallenge: {
    title: 'Format Authorization Header',
    difficulty: 'Intermediate',
    description: 'Write a function `build_auth_headers(token: str, custom_headers: dict | None = None) -> dict[str, str]` that returns a dictionary containing `"Authorization": f"Bearer {token}"` and merges any optional `custom_headers`. If custom_headers is None, return just the authorization header.',
    starterCode: `def build_auth_headers(token: str, custom_headers: dict | None = None) -> dict[str, str]:
    # Write your solution here
    pass`,
    hints: [
      'Initialize headers = {"Authorization": f"Bearer {token}"}.',
      'If custom_headers: headers.update(custom_headers).',
      'Return headers.'
    ],
    solution: `def build_auth_headers(token: str, custom_headers: dict | None = None) -> dict[str, str]:
    headers = {"Authorization": f"Bearer {token}"}
    if custom_headers:
        headers.update(custom_headers)
    return headers`,
    testCases: [
      { input: '"xyz123", {"X-Client": "App"}', expectedOutput: '{"Authorization": "Bearer xyz123", "X-Client": "App"}' }
    ]
  }
};

m10Lessons['py-practical-sqlite'] = {
  id: 'py-practical-sqlite',
  moduleId: 'python-module-10',
  title: 'SQLite and Database Connectivity',
  subtitle: 'sqlite3 Module, Parameterized Queries, Preventing SQL Injection, and Transactions',
  order: 3,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Connect to SQLite databases and execute CRUD operations using standard library `sqlite3`.',
    'Prevent SQL Injection vulnerabilities by strictly using parameterized queries (`?` placeholders).',
    'Manage database transactions with automatic commit and rollback using connection context managers.',
    'Use `cursor.fetchone()`, `cursor.fetchall()`, and configure `row_factory = sqlite3.Row` for dict-like column access.'
  ],
  prerequisites: ['Python basics, context managers, and relational DB intuition.'],
  analogy: {
    title: 'The Legal Contract and The Fill-in-the-Blank Form',
    text: 'Concatenating strings to build a SQL query is like signing a blank check and letting a stranger write whatever numbers and clauses they want in the middle of the contract (SQL Injection: `Robert\'); DROP TABLE Students;--`). A parameterized query is a legal fill-in-the-blank form: the contract structure is locked in advance, and whatever text the user writes in the blank box is treated strictly as plain text data, never as executable contract code.',
    metaphor: 'Parameterized queries separate SQL command structure from user data values.'
  },
  problemSolved: {
    title: 'Local Embedded Relational Storage Without Server Infrastructure',
    description: 'Storing structured, searchable, indexed records on disk without the overhead of running a heavy PostgreSQL or MySQL server. SQLite provides an embedded zero-configuration ACID database engine in a single file.',
    keyPoints: [
      'Always use parameter substitution `cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))`.',
      'NEVER use f-strings or string formatting (`%` or `.format()`) to insert user input into SQL strings.',
      'Connecting to `sqlite3.connect(":memory:")` creates a lightning-fast in-memory database ideal for unit tests.',
      '`conn.commit()` persists changes; `conn.rollback()` aborts uncommitted transactions.'
    ]
  },
  intuition: {
    overview: 'The sqlite3 module communicates with the embedded C-level SQLite engine, compiling SQL statements and stepping through B-Tree rows.',
    steps: [
      { step: 1, title: 'Connect', description: 'sqlite3.connect() opens file and initializes transaction state.' },
      { step: 2, title: 'Prepare & Bind', description: 'Engine prepares bytecode; binds parameter values safely.' },
      { step: 3, title: 'Fetch / Commit', description: 'Cursor steps through results; connection commits transaction to disk.' }
    ]
  },
  codeExample: {
    title: 'Safe Database CRUD and sqlite3.Row Configuration',
    code: `import sqlite3

# Using in-memory database for demonstration
conn = sqlite3.connect(":memory:")
# Enable dictionary-like column access
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# Create table
cursor.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    credits REAL DEFAULT 0.0
);
""")

# Safe parameterized insertion
users_data = [
    ("alice", "alice@example.com", 50.0),
    ("bob", "bob@example.com", 25.0)
]
cursor.executemany("INSERT INTO users (username, email, credits) VALUES (?, ?, ?);", users_data)
conn.commit()

# Safe parameterized query
cursor.execute("SELECT * FROM users WHERE credits >= ? ORDER BY credits DESC;", (30.0,))
rows = cursor.fetchall()

for row in rows:
    # sqlite3.Row allows column name access
    print(f"User: {row['username']}, Credits: \${row['credits']}")

conn.close()`,
    explanation: 'Demonstrates creating tables, executemany insertion, safe parameterized queries with ?, and row_factory = sqlite3.Row.'
  },
  runnableCode: {
    code: `import sqlite3

conn = sqlite3.connect(":memory:")
c = conn.cursor()
c.execute("CREATE TABLE items (name TEXT, qty INT);")
c.execute("INSERT INTO items VALUES (?, ?);", ("Widget", 10))
conn.commit()

c.execute("SELECT qty FROM items WHERE name = ?;", ("Widget",))
result = c.fetchone()
print("Retrieved Quantity:", result[0])
conn.close()`,
    expectedOutput: `Retrieved Quantity: 10`
  },
  lineByLine: [
    { line: 3, code: 'conn = sqlite3.connect(":memory:")', explanation: 'Creates temporary in-memory database.' },
    { line: 6, code: 'c.execute("INSERT INTO items VALUES (?, ?);", ("Widget", 10))', explanation: 'Safely binds values via ? placeholder tuple.' },
    { line: 9, code: 'c.execute("SELECT qty FROM items WHERE name = ?;", ("Widget",))', explanation: 'Parameterized query preventing injection.' },
    { line: 10, code: 'result = c.fetchone()', explanation: 'Fetches single row tuple from cursor.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using f-strings to inject variables into SQL: `f"SELECT * FROM users WHERE name = \'{user_input}\'"`.',
      whyWrong: `Enables SQL Injection attacks (e.g. user_input = "' OR '1'='1"), allowing attackers to dump or erase the entire database.`,
      howToFix: 'Always use parameterized placeholders: `execute("SELECT * FROM users WHERE name = ?", (user_input,))`.'
    },
    {
      mistake: 'Passing a single item to a parameterized query without making it a tuple: `cursor.execute(sql, user_id)`.',
      whyWrong: 'The second argument must be a sequence; if user_id is a string, it iterates every character as a separate parameter.',
      howToFix: 'Wrap in a single-element tuple with a comma: `(user_id,)`.'
    }
  ],
  realWorldApplications: [
    { title: 'Mobile / Desktop Applications', description: 'SQLite powers local data persistence in iOS/Android apps, browsers, and desktop tools.' },
    { title: 'Automated Test Suites', description: 'Running unit tests against `:memory:` SQLite databases for millisecond execution.' }
  ],
  practiceQuestions: [
    { question: 'What placeholder symbol is used for parameterized queries in Python\'s `sqlite3` module?', hint: 'Punctuation mark.', answer: 'The question mark `?`.' },
    { question: 'How can you access columns by name instead of integer indices in `sqlite3` results?', hint: 'Row factory configuration.', answer: 'By setting `conn.row_factory = sqlite3.Row`.' },
    { question: 'What special database name creates an in-memory SQLite database?', hint: 'Colon string.', answer: '`":memory:"`.' }
  ],
  quiz: [
    {
      question: 'Which method should you use to insert multiple rows efficiently in sqlite3?',
      options: ['cursor.execute_all()', 'cursor.executemany()', 'cursor.insert_batch()', 'cursor.batch()'],
      correctAnswer: 1,
      explanation: '`cursor.executemany(sql, seq_of_params)` prepares the statement once and executes it across all parameter rows.'
    },
    {
      question: 'Why is `execute(f"SELECT * FROM items WHERE id = {item_id}")` dangerous?',
      options: ['It causes memory fragmentation', 'It introduces severe SQL Injection security vulnerabilities', 'SQLite does not support f-strings', 'It is slower to compile'],
      correctAnswer: 1,
      explanation: 'String formatting user input into SQL allows attackers to execute arbitrary SQL commands.'
    },
    {
      question: 'What happens to uncommitted database changes if a transaction encounters an exception inside `with conn:`?',
      options: ['Changes are automatically committed', 'The connection rolls back the transaction automatically', 'The database file is deleted', 'It raises SyntaxError'],
      correctAnswer: 1,
      explanation: 'Using `with conn:` as a context manager automatically executes `rollback()` on exceptions and `commit()` on success.'
    }
  ],
  codingChallenge: {
    title: 'Initialize and Query SQLite Memory DB',
    difficulty: 'Intermediate',
    description: 'Write a function `init_and_query(records: list[tuple[str, int]]) -> list[str]` that creates an in-memory SQLite database with table `inventory (name TEXT, count INT)`, inserts all `records` via `executemany`, queries for items where `count > 5` ordered alphabetically by name, and returns a list of matching names.',
    starterCode: `import sqlite3

def init_and_query(records: list[tuple[str, int]]) -> list[str]:
    # Write your solution here
    pass`,
    hints: [
      'connect to ":memory:".',
      'execute CREATE TABLE inventory (name TEXT, count INT).',
      'executemany INSERT INTO inventory VALUES (?, ?).',
      'execute SELECT name FROM inventory WHERE count > 5 ORDER BY name ASC.',
      'return [row[0] for row in cursor.fetchall()].'
    ],
    solution: `import sqlite3

def init_and_query(records: list[tuple[str, int]]) -> list[str]:
    conn = sqlite3.connect(":memory:")
    c = conn.cursor()
    c.execute("CREATE TABLE inventory (name TEXT, count INT);")
    c.executemany("INSERT INTO inventory VALUES (?, ?);", records)
    conn.commit()
    c.execute("SELECT name FROM inventory WHERE count > 5 ORDER BY name ASC;")
    results = [row[0] for row in c.fetchall()]
    conn.close()
    return results`,
    testCases: [
      { input: '[("apple", 10), ("banana", 2), ("cherry", 8)]', expectedOutput: '["apple", "cherry"]' }
    ]
  }
};

m10Lessons['py-practical-debugging'] = {
  id: 'py-practical-debugging',
  moduleId: 'python-module-10',
  title: 'Advanced Debugging Techniques',
  subtitle: 'breakpoint(), pdb Interactive Shell, Post-Mortem Analysis, and Trace Inspection',
  order: 5,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Use Python 3.7+ built-in `breakpoint()` to drop into interactive debugging sessions.',
    'Master core `pdb` commands: `n` (next), `s` (step), `c` (continue), `p` (print), `w` (where/stack trace), `q` (quit).',
    'Perform post-mortem debugging on crashed processes using `pdb.pm()` or `python -m pdb -c continue script.py`.',
    'Inspect live stack frames and execution namespaces dynamically.'
  ],
  prerequisites: ['Python functions, exceptions, and execution frames.'],
  analogy: {
    title: 'The Time-Freezing Holodeck Debugger',
    text: 'Debugging with `print()` statements is like trying to investigate a bank robbery by looking at scattered Polaroid photos taken after the robbers fled. Using `breakpoint()` is walking into the bank and freezing physical time mid-robbery: you can walk around the frozen robbers, measure the height of the vault door, inspect what is in their pockets (variables), step time forward by one single millisecond (`n`), and watch how the gears turn.',
    metaphor: 'pdb freezes runtime execution to allow live inspection and stepping.'
  },
  problemSolved: {
    title: 'Resolving Elusive Bugs Without Guesswork Print Statements',
    description: 'When bugs only manifest inside complex nested loops or edge cases, adding dozens of `print()` statements clutters source code and requires restarting the program. Interactive debuggers let you step through live code directly.',
    keyPoints: [
      'In Python 3.7+, `breakpoint()` is built-in; it defaults to calling `import pdb; pdb.set_trace()`.',
      'The environment variable `PYTHONBREAKPOINT=0` disables all breakpoints globally without code edits.',
      'Post-mortem debugging inspects the exact state of variables at the moment of an unhandled crash.'
    ]
  },
  intuition: {
    overview: 'The debugger registers a trace callback function (`sys.settrace`) that the CPython interpreter invokes before evaluating each line of bytecode.',
    steps: [
      { step: 1, title: 'Breakpoint Encounter', description: 'When execution hits breakpoint(), sys.settrace triggers interactive shell.' },
      { step: 2, title: 'Step / Inspect', description: 'Developer queries locals() and navigates call stack frames.' },
      { step: 3, title: 'Resume', description: 'Commands like continue (c) release stepping until the next breakpoint.' }
    ]
  },
  codeExample: {
    title: 'Core pdb Command Reference and breakpoint() Usage',
    code: `def calculate_average(grades: list[float]) -> float:
    total = sum(grades)
    # breakpoint()  # Drops into interactive PDB prompt when uncommented
    count = len(grades)
    return total / count

# Essential PDB Commands:
# n (next)     : Execute current line, stay in current function
# s (step)     : Step INTO called function
# c (continue) : Resume execution until next breakpoint
# p <expr>     : Evaluate and print expression
# pp <expr>    : Pretty-print expression
# w (where)    : Print current stack trace showing call hierarchy
# u (up)       : Move up one frame in call stack (to caller)
# d (down)     : Move down one frame in call stack
# q (quit)     : Abort execution immediately`,
    explanation: 'Reviews essential pdb navigation commands and the built-in breakpoint() hook.'
  },
  runnableCode: {
    code: `import traceback

def inner_failing_function():
    raise ValueError("Something went terribly wrong inside worker!")

def outer_wrapper():
    inner_failing_function()

try:
    outer_wrapper()
except ValueError:
    # Programmatic stack trace inspection
    print("Formatted Stack Trace:")
    traceback.print_exc(limit=2)`,
    expectedOutput: `Formatted Stack Trace:`
  },
  lineByLine: [
    { line: 4, code: '    raise ValueError(...)', explanation: 'Raises exception deep in call stack.' },
    { line: 12, code: '    traceback.print_exc(limit=2)', explanation: 'Formats and prints call stack frames programmatically.' }
  ],
  commonMistakes: [
    {
      mistake: 'Leaving `breakpoint()` or `pdb.set_trace()` calls in production code deployed to live servers.',
      whyWrong: 'The server hangs indefinitely waiting for keyboard input on standard input that will never arrive.',
      howToFix: 'Ensure CI/CD linter checks block `breakpoint()` or set `PYTHONBREAKPOINT=0` in production environments.'
    },
    {
      mistake: 'Confusing `n` (next) with `s` (step into).',
      whyWrong: 'Pressing `s` steps into standard library functions (like `json.loads` or `sum`), cluttering inspection.',
      howToFix: 'Use `n` to step over standard library calls, and `s` only when you want to step into your own functions.'
    }
  ],
  realWorldApplications: [
    { title: 'Post-Mortem Crash Analysis', description: 'Dropping into `pdb.pm()` after an automated test suite crash to inspect the exact failing state.' },
    { title: 'Complex Recursive Debugging', description: 'Stepping through recursive tree traversals to spot infinite loops.' }
  ],
  practiceQuestions: [
    { question: 'What built-in function was introduced in Python 3.7 to trigger the interactive debugger?', hint: 'Built-in name.', answer: '`breakpoint()`.' },
    { question: 'How can you disable all `breakpoint()` calls across an entire application without editing code?', hint: 'Environment variable.', answer: 'Set the environment variable `PYTHONBREAKPOINT=0`.' },
    { question: 'What pdb command displays the full call stack trace?', hint: 'Single letter command.', answer: '`w` (for "where").' }
  ],
  quiz: [
    {
      question: 'Which pdb command steps INTO a function call on the current line?',
      options: ['n (next)', 's (step)', 'c (continue)', 'r (return)'],
      correctAnswer: 1,
      explanation: '`s` (step) steps into the called function, while `n` (next) steps over it.'
    },
    {
      question: 'What does the pdb command `c` do?',
      options: ['Clears all variables', 'Continues program execution until the next breakpoint or termination', 'Compiles the file', 'Copies the frame'],
      correctAnswer: 1,
      explanation: '`c` (continue) resumes normal execution until another breakpoint is hit.'
    },
    {
      question: 'What is "post-mortem" debugging in Python?',
      options: ['Debugging a program after it has crashed with an unhandled exception using its traceback state', 'Debugging dead code', 'Running unit tests after deployment', 'Profiling CPU usage'],
      correctAnswer: 0,
      explanation: 'Post-mortem debugging inspects the call stack and local variables at the exact moment of an unhandled exception.'
    }
  ],
  codingChallenge: {
    title: 'Simulate Debug Command Parser',
    difficulty: 'Intermediate',
    description: 'Write a function `parse_debug_command(cmd: str) -> str` that maps single-letter pdb commands to descriptive strings: `"n"` -> `"next"`, `"s"` -> `"step"`, `"c"` -> `"continue"`, `"w"` -> `"where"`, `"q"` -> `"quit"`. Return `"unknown"` for any other input (strip whitespace, case-insensitive).',
    starterCode: `def parse_debug_command(cmd: str) -> str:
    # Write your solution here
    pass`,
    hints: [
      'Clean cmd: cleaned = cmd.strip().lower().',
      'Use a dictionary mapping: {"n": "next", "s": "step", "c": "continue", "w": "where", "q": "quit"}.',
      'Return mapping.get(cleaned, "unknown").'
    ],
    solution: `def parse_debug_command(cmd: str) -> str:
    mapping = {"n": "next", "s": "step", "c": "continue", "w": "where", "q": "quit"}
    return mapping.get(cmd.strip().lower(), "unknown")`,
    testCases: [
      { input: '"n"', expectedOutput: '"next"' },
      { input: '"  S  "', expectedOutput: '"step"' },
      { input: '"x"', expectedOutput: '"unknown"' }
    ]
  }
};

m10Lessons['py-practical-clean-code'] = {
  id: 'py-practical-clean-code',
  moduleId: 'python-module-10',
  title: 'Clean Code and Project Structure',
  subtitle: 'PEP 8 Style, Black Formatter, SOLID Principles, and Standard Project Layouts',
  order: 6,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Adhere to PEP 8 style guide conventions: naming rules, line lengths, and import orders.',
    'Automate formatting and linting using `black`, `ruff`, and `flake8`.',
    'Structure professional Python codebases using the `src/` layout pattern.',
    'Apply SOLID design principles (Single Responsibility, Open/Closed, Dependency Inversion) to Pythonic code.'
  ],
  prerequisites: ['Python functions, classes, and packages.'],
  analogy: {
    title: 'The Modern Architecture Building Code and Construction Standard',
    text: 'A shantytown shack has wires taped to pipes, doors that open inward into sinks, and no labeling on electrical panels (messy code). It might stand for a week, but no plumber can service it without risking electrocution. Professional building standards (Clean Code / PEP 8) mandate standardized conduit runs, color-coded wires, clear room blueprints, and fire exits. Anyone on the construction crew can walk in and immediately understand where everything belongs.',
    metaphor: 'Clean code and standard project layouts ensure codebases are maintainable and readable.'
  },
  problemSolved: {
    title: 'Maintainability and Readability at Scale',
    description: 'Guido van Rossum famously stated: "Code is read much more often than it is written." Clean code conventions eliminate cognitive friction during code reviews and onboarding.',
    keyPoints: [
      'PEP 8 naming: `snake_case` for functions/variables, `PascalCase` for classes, `UPPER_SNAKE` for constants.',
      'Import grouping: 1. Standard library; 2. Third-party packages; 3. Local application imports (separated by blank lines).',
      'The `src/` layout prevents accidental import of uninstalled development code over installed wheels.',
      '`ruff` and `black` automate code formatting and linting instantly.'
    ]
  },
  intuition: {
    overview: 'Clean architecture organizes code by separation of concerns: domain logic is decoupled from transport layers (HTTP/CLI) and storage layers (DB).',
    steps: [
      { step: 1, title: 'Single Responsibility', description: 'Each function or class does exactly ONE thing well.' },
      { step: 2, title: 'Standard Structure', description: 'src/<package>/ layout with clear subpackages (models, services, api).' },
      { step: 3, title: 'Automated Enforcement', description: 'Pre-commit hooks run ruff and black before code can be committed.' }
    ]
  },
  codeExample: {
    title: 'Standard Python Project Layout and PEP 8 Formatting',
    code: `# Standard Recommended Project Layout:
# my_project/
# ├── pyproject.toml
# ├── README.md
# ├── .gitignore
# ├── src/
# │   └── my_package/
# │       ├── __init__.py
# │       ├── models.py
# │       ├── services.py
# │       └── utils.py
# └── tests/
#     ├── conftest.py
#     └── test_services.py

# PEP 8 Compliant Python Code:
import os
import sys
from typing import Final

import requests  # Third-party

from my_package.models import User  # Local

MAX_RETRIES: Final[int] = 3

class UserService:
    """Manages user domain operations."""
    def __init__(self, base_url: str):
        self.base_url = base_url

    def find_user_by_id(self, user_id: int) -> User | None:
        """Fetch user by primary key."""
        return None`,
    explanation: 'Demonstrates standard src/ project structure, PEP 8 import grouping, and naming conventions.'
  },
  runnableCode: {
    code: `# Demonstrating Single Responsibility Principle
class UserValidator:
    @staticmethod
    def is_valid_email(email: str) -> bool:
        return "@" in email and "." in email

class UserNotifier:
    @staticmethod
    def send_welcome(email: str):
        print(f"Dispatched welcome email to: {email}")

# Composed cleanly
email = "learner@example.com"
if UserValidator.is_valid_email(email):
    UserNotifier.send_welcome(email)`,
    expectedOutput: `Dispatched welcome email to: learner@example.com`
  },
  lineByLine: [
    { line: 2, code: 'class UserValidator:', explanation: 'Single responsibility: validation only.' },
    { line: 7, code: 'class UserNotifier:', explanation: 'Single responsibility: notification dispatch only.' },
    { line: 13, code: 'if UserValidator.is_valid_email(email):', explanation: 'Components are decoupled, highly testable, and reusable.' }
  ],
  commonMistakes: [
    {
      mistake: 'Putting all code in the project root directory alongside configuration files.',
      whyWrong: 'Root imports can mask missing package installations and cause test runner confusion.',
      howToFix: 'Use the standard `src/` layout: `src/my_package/`.'
    },
    {
      mistake: 'Writing massive 300-line "god functions" that parse JSON, validate data, insert into SQL, and send emails.',
      whyWrong: 'Violates Single Responsibility Principle; impossible to test individual steps.',
      howToFix: 'Decompose into small, focused, pure helper functions.'
    }
  ],
  realWorldApplications: [
    { title: 'Open-Source Projects', description: 'Standardized formatting allowing hundreds of contributors to collaborate without style flame wars.' },
    { title: 'CI/CD Automated Gateways', description: 'Blocking git pull requests if formatting or lint checks fail.' }
  ],
  practiceQuestions: [
    { question: 'What is the official Python style guide document called?', hint: 'PEP number.', answer: 'PEP 8.' },
    { question: 'What is the PEP 8 naming convention for class names versus function names?', hint: 'Casing styles.', answer: 'Classes use `PascalCase` (CapWords); functions use `snake_case`.' },
    { question: 'What is the advantage of using a `src/` layout for Python projects?', hint: 'Import isolation.', answer: 'It prevents tests and scripts from accidentally importing the raw development directory instead of the properly installed package.' }
  ],
  quiz: [
    {
      question: 'In PEP 8, how should imports be grouped and ordered?',
      options: ['Alphabetical only', '1. Standard library, 2. Third-party, 3. Local imports (separated by blank lines)', 'Random order', 'Local imports first'],
      correctAnswer: 1,
      explanation: 'PEP 8 specifies grouping imports into standard library, third-party, and local, separated by a blank line.'
    },
    {
      question: 'Which tool is known as "the uncompromising Python code formatter"?',
      options: ['black', 'pylint', 'pytest', 'pipenv'],
      correctAnswer: 0,
      explanation: '`black` is the widely used deterministic code formatter.'
    },
    {
      question: 'What does the Single Responsibility Principle (SRP) dictate?',
      options: ['A function should only have one parameter', 'A class or function should have one, and only one, reason to change', 'A project can only have one file', 'All methods must return single values'],
      correctAnswer: 1,
      explanation: 'SRP states that a software component should have one focused responsibility and one reason to change.'
    }
  ],
  codingChallenge: {
    title: 'Validate PEP 8 Identifier Casing',
    difficulty: 'Intermediate',
    description: 'Write a function `is_snake_case(identifier: str) -> bool` that returns `True` if `identifier` is valid lowercase `snake_case` (consists only of lowercase letters, digits, and underscores, does NOT start or end with an underscore, and has no consecutive underscores), otherwise `False`.',
    starterCode: `def is_snake_case(identifier: str) -> bool:
    # Write your solution here
    pass`,
    hints: [
      'Check if not identifier or identifier.startswith("_") or identifier.endswith("_"): return False.',
      'Check if "__" in identifier: return False.',
      'Check all chars are lowercase alphanumeric or "_".'
    ],
    solution: `def is_snake_case(identifier: str) -> bool:
    if not identifier or identifier.startswith("_") or identifier.endswith("_"):
        return False
    if "__" in identifier:
        return False
    return all(c.islower() or c.isdigit() or c == "_" for c in identifier)`,
    testCases: [
      { input: '"calculate_total_price"', expectedOutput: 'True' },
      { input: '"CalculateTotal"', expectedOutput: 'False' },
      { input: '"_private_var"', expectedOutput: 'False' }
    ]
  }
};

m10Lessons['py-practical-git'] = {
  id: 'py-practical-git',
  moduleId: 'python-module-10',
  title: 'Git Fundamentals for Python Projects',
  subtitle: 'init, branch, commit, merge, Essential Python .gitignore, and Clean Version Control',
  order: 7,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Initialize, stage, commit, branch, and merge Git repositories for Python projects.',
    'Configure comprehensive `.gitignore` files for Python (excluding `__pycache__`, `.venv`, `.pytest_cache`, `.env`).',
    'Write clean, standardized conventional commit messages (`feat:`, `fix:`, `refactor:`, `docs:`).',
    'Manage feature branch workflows and resolve basic merge conflicts.'
  ],
  prerequisites: ['Basic command line usage.'],
  analogy: {
    title: 'The Video Game Checkpoint System and Multiverse Timelines',
    text: 'Working without Git is playing a brutal 100-hour video game with zero save slots: one mistake, and your save file is corrupted forever. Git commits are permanent checkpoints: you can experiment, fail, and instantly reload any checkpoint from yesterday. Git branches are alternate multiverse timelines: you create a portal (`feature-branch`), defeat a boss, and merge that timeline back into the main universe (`main`) once it is verified safe.',
    metaphor: 'Git tracks history as a directed acyclic graph of immutable content snapshots.'
  },
  problemSolved: {
    title: 'Collaborative Version Control and Reversible Experimentation',
    description: 'Without version control, developers resort to terrible naming conventions like `script_v2_final_FINAL_edit.py`. Git provides distributed, atomic, cryptographic tracking of all code revisions.',
    keyPoints: [
      '`git init` initializes a new repository in `.git/`.',
      'The staging area (`git add`) allows composing atomic, intentional commits.',
      'A `.gitignore` file stops compiled bytecode, temporary caches, and local secrets from polluting git history.'
    ]
  },
  intuition: {
    overview: 'Git models projects as a tree of cryptographic SHA-1/SHA-256 commit snapshots pointing to parent commits.',
    steps: [
      { step: 1, title: 'Modify', description: 'Edit code in the working directory.' },
      { step: 2, title: 'Stage', description: 'git add stages specific diffs into the index.' },
      { step: 3, title: 'Commit', description: 'git commit creates an immutable snapshot with author, timestamp, and message.' }
    ]
  },
  codeExample: {
    title: 'Essential Python .gitignore Template and CLI Workflow',
    code: `# Standard Python .gitignore rules:
# __pycache__/
# *.py[cod]
# *$py.class
# .venv/
# venv/
# .env
# .pytest_cache/
# .mypy_cache/
# dist/
# build/
# *.egg-info/

# Standard Git Branching Commands:
# git checkout -b feature/user-auth    # Create and switch to new branch
# git add src/ tests/                  # Stage specific directories
# git commit -m "feat: add JWT auth"   # Conventional commit
# git checkout main                    # Switch back to main
# git merge feature/user-auth          # Merge feature branch`,
    explanation: 'Reviews essential Python .gitignore rules and basic git branch-commit-merge commands.'
  },
  runnableCode: {
    code: `# Simulating a git commit message validator
def validate_commit_msg(msg: str) -> bool:
    valid_prefixes = ("feat:", "fix:", "docs:", "style:", "refactor:", "test:", "chore:")
    return any(msg.strip().startswith(p) for p in valid_prefixes)

print("feat: add login endpoint ->", validate_commit_msg("feat: add login endpoint"))
print("updated stuff ->", validate_commit_msg("updated stuff"))`,
    expectedOutput: `feat: add login endpoint -> True
updated stuff -> False`
  },
  lineByLine: [
    { line: 3, code: 'valid_prefixes = ("feat:", "fix:", ...)', explanation: 'Conventional Commits specification prefixes.' },
    { line: 4, code: 'return any(...)', explanation: 'Validates that commit messages follow structured taxonomy.' }
  ],
  commonMistakes: [
    {
      mistake: 'Committing `__pycache__` or `.venv/` to git.',
      whyWrong: 'Bloats repository size, creates massive diff noise, and can cause cross-platform execution issues.',
      howToFix: 'Create a `.gitignore` file before running your very first `git add`.'
    },
    {
      mistake: 'Writing vague commit messages like "fixes" or "updates".',
      whyWrong: 'Makes `git log` and `git bisect` useless for debugging regressions months later.',
      howToFix: 'Use Conventional Commits: `fix: handle ZeroDivisionError in average calculation`.'
    }
  ],
  realWorldApplications: [
    { title: 'Pull Request Code Reviews', description: 'Reviewing isolated feature branch diffs on GitHub/GitLab before merging to main.' },
    { title: 'git bisect Regression Pinpointing', description: 'Binary-searching git commit history to find the exact commit that introduced a bug.' }
  ],
  practiceQuestions: [
    { question: 'What file instructs Git to ignore temporary files, virtual environments, and secrets?', hint: 'Dot filename.', answer: '`.gitignore`.' },
    { question: 'What command creates and switches to a new branch in Git?', hint: 'Checkout or switch.', answer: '`git checkout -b <branch_name>` or `git switch -c <branch_name>`.' },
    { question: 'What command shows the working tree status and staged changes?', hint: 'Status command.', answer: '`git status`.' }
  ],
  quiz: [
    {
      question: 'Which of the following directories should ALMOST ALWAYS be in a Python `.gitignore`?',
      options: ['src/', 'tests/', '__pycache__/', 'docs/'],
      correctAnswer: 2,
      explanation: '`__pycache__/` contains compiled bytecode files and should never be tracked in version control.'
    },
    {
      question: 'What is the purpose of the Git staging area (the index)?',
      options: ['To compile Python code', 'To craft and review atomic commits before saving them to history', 'To push code to GitHub automatically', 'To delete untracked files'],
      correctAnswer: 1,
      explanation: 'The staging area allows selectively grouping related changes into atomic commits.'
    },
    {
      question: 'In the Conventional Commits specification, what prefix indicates a bug fix?',
      options: ['bug:', 'fix:', 'patch:', 'hotfix:'],
      correctAnswer: 1,
      explanation: 'The `fix:` prefix indicates a bug fix in Conventional Commits.'
    }
  ],
  codingChallenge: {
    title: 'Filter Git Ignored Files',
    difficulty: 'Beginner',
    description: 'Write a function `filter_ignored_files(filenames: list[str], ignore_extensions: list[str]) -> list[str]` that returns only filenames that do NOT end with any of the extensions listed in `ignore_extensions` (case-insensitive).',
    starterCode: `def filter_ignored_files(filenames: list[str], ignore_extensions: list[str]) -> list[str]:
    # Write your solution here
    pass`,
    hints: [
      'Normalize ignore_extensions to lowercase: tuple(ext.lower() for ext in ignore_extensions).',
      'Filter f for f in filenames if not f.lower().endswith(tuple_of_exts).'
    ],
    solution: `def filter_ignored_files(filenames: list[str], ignore_extensions: list[str]) -> list[str]:
    exts = tuple(ext.lower() for ext in ignore_extensions)
    return [f for f in filenames if not f.lower().endswith(exts)]`,
    testCases: [
      { input: '["app.py", "app.pyc", "notes.txt", "data.pyo"], [".pyc", ".pyo"]', expectedOutput: '["app.py", "notes.txt"]' }
    ]
  }
};

m10Lessons['py-practical-packaging'] = {
  id: 'py-practical-packaging',
  moduleId: 'python-module-10',
  title: 'Packaging and Distribution',
  subtitle: 'pyproject.toml, Modern Build Backends (Hatch/Flit/Setuptools), Wheels, and PyPI',
  order: 8,
  readTimeMinutes: 25,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Configure modern Python packaging using PEP 518/621 `pyproject.toml` standards.',
    'Understand build backends (setuptools, flit, hatchling, poetry).',
    'Build distribution packages: Source Distributions (`sdist`, `.tar.gz`) and Built Distributions (Wheels, `.whl`).',
    'Follow Semantic Versioning (MAJOR.MINOR.PATCH) and understand publishing workflows with twine.'
  ],
  prerequisites: ['Python modules, packages, and virtual environments.'],
  analogy: {
    title: 'The Manufacturing Shipping Carton and Commercial Pallet',
    text: 'Developing a module in your local folder is like hand-crafting a wooden chair in your home garage. Packaging is taking that chair, disassembling it into flat-pack IKEA boxes with standardized assembly instructions, barcodes, and CE certification stamps (`pyproject.toml` and `.whl`). Now, any department store (PyPI) or customer anywhere on earth (`pip install your-package`) can receive the box and assemble it flawlessly in seconds.',
    metaphor: 'pyproject.toml defines standardized metadata; wheels deliver pre-built distributable packages.'
  },
  problemSolved: {
    title: 'Universal, Reproducible Library Distribution Across the Python Ecosystem',
    description: 'Historically, Python packaging relied on fragile, executable `setup.py` scripts that created security risks and dependency cycles. Modern `pyproject.toml` provides declarative, reproducible package definitions.',
    keyPoints: [
      '`pyproject.toml` replaces legacy `setup.py`, `setup.cfg`, and `requirements.txt` for library authors.',
      'Wheels (`.whl`) are ZIP archives containing ready-to-install code that bypass build steps during installation.',
      '`build` (`python -m build`) produces standard `dist/*.tar.gz` and `dist/*.whl` artifacts.',
      'Semantic Versioning: `MAJOR` (breaking changes), `MINOR` (new features, backward-compatible), `PATCH` (bug fixes).'
    ]
  },
  intuition: {
    overview: 'The modern Python packaging standard separates build frontends (`pip`, `build`) from build backends (`setuptools`, `hatchling`) via standard hooks.',
    steps: [
      { step: 1, title: 'Declare Metadata', description: 'Write name, version, dependencies, and entry-points in pyproject.toml.' },
      { step: 2, title: 'Build Artifacts', description: 'Run python -m build to create source tarball and binary wheel.' },
      { step: 3, title: 'Publish', description: 'Upload artifacts to PyPI using twine.' }
    ]
  },
  codeExample: {
    title: 'Modern Declarative pyproject.toml Specification',
    code: `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "my-awesome-package"
version = "1.0.0"
description = "A production-grade Python utility library"
readme = "README.md"
requires-python = ">=3.10"
license = { text = "MIT" }
authors = [
    { name = "Developer", email = "dev@example.com" }
]
dependencies = [
    "requests>=2.31.0",
    "pydantic>=2.0.0"
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "mypy>=1.8.0",
    "ruff>=0.2.0"
]

[project.scripts]
my-cli = "my_package.cli:main"`,
    explanation: 'Demonstrates a complete PEP 621 compliant pyproject.toml including dependencies, optional dev dependencies, and CLI entry points.'
  },
  runnableCode: {
    code: `# Parsing Semantic Version strings programmatically
def parse_semver(version: str) -> tuple[int, int, int]:
    parts = version.strip().lstrip("v").split(".")
    if len(parts) != 3:
        raise ValueError("Invalid SemVer string")
    return int(parts[0]), int(parts[1]), int(parts[2])

v1 = parse_semver("1.2.3")
v2 = parse_semver("2.0.0")
print("Parsed 1.2.3:", v1)
print("Is v2 greater than v1?", v2 > v1)`,
    expectedOutput: `Parsed 1.2.3: (1, 2, 3)
Is v2 greater than v1? True`
  },
  lineByLine: [
    { line: 2, code: 'def parse_semver(version: str) -> tuple[int, int, int]:', explanation: 'Parses semantic version string into integer components.' },
    { line: 9, code: 'print("Is v2 greater than v1?", v2 > v1)', explanation: 'Tuple comparison naturally handles semantic version comparison.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using legacy `setup.py` with executable code for new projects.',
      whyWrong: '`setup.py` executes arbitrary code at build time and is deprecated in favor of declarative `pyproject.toml`.',
      howToFix: 'Adopt PEP 518/621 `pyproject.toml` standards.'
    },
    {
      mistake: 'Distributing only source distributions (`.tar.gz`) without wheels (`.whl`).',
      whyWrong: 'Forces end-users to build from source on every `pip install`, increasing install times and requiring compilers for C-extensions.',
      howToFix: 'Always build and publish wheels: `python -m build`.'
    }
  ],
  realWorldApplications: [
    { title: 'Publishing to PyPI', description: 'Distributing open-source Python packages to millions of developers worldwide.' },
    { title: 'Internal Enterprise Package Registries', description: 'Publishing shared proprietary business logic to private JFrog Artifactory or AWS CodeArtifact feeds.' }
  ],
  practiceQuestions: [
    { question: 'What modern configuration file replaces `setup.py` and `setup.cfg` in Python packaging?', hint: 'TOML file.', answer: '`pyproject.toml`.' },
    { question: 'What is a Python Wheel (`.whl`) file?', hint: 'Packaging archive format.', answer: 'A ZIP archive with a specially crafted filename and metadata that can be installed without running build code.' },
    { question: 'What tool is the standard command-line utility used to upload packages securely to PyPI?', hint: 'Tool name.', answer: '`twine` (e.g. `twine upload dist/*`).' }
  ],
  quiz: [
    {
      question: 'Which PEP introduced `pyproject.toml` as the standard configuration file for Python builds?',
      options: ['PEP 8', 'PEP 518', 'PEP 484', 'PEP 257'],
      correctAnswer: 1,
      explanation: 'PEP 518 (with PEP 621) established `pyproject.toml` as the declarative packaging standard.'
    },
    {
      question: 'In Semantic Versioning (MAJOR.MINOR.PATCH), when should you increment the MAJOR version?',
      options: ['When you fix a small bug', 'When you introduce breaking, backward-incompatible API changes', 'Every calendar month', 'When adding new optional features'],
      correctAnswer: 1,
      explanation: 'MAJOR version is incremented when incompatible API changes are made.'
    },
    {
      question: 'What command builds both an sdist (.tar.gz) and a wheel (.whl) for a modern project?',
      options: ['python setup.py install', 'python -m build', 'pip package', 'twine build'],
      correctAnswer: 1,
      explanation: '`python -m build` (using the PyPA `build` tool) produces both sdist and wheel artifacts in `dist/`.'
    }
  ],
  codingChallenge: {
    title: 'Compare Semantic Version Numbers',
    difficulty: 'Advanced',
    description: 'Write a function `compare_semver(v1: str, v2: str) -> int` that compares two semantic version strings ("X.Y.Z"). Return `1` if `v1 > v2`, `-1` if `v1 < v2`, and `0` if `v1 == v2`.',
    starterCode: `def compare_semver(v1: str, v2: str) -> int:
    # Write your solution here
    pass`,
    hints: [
      'Parse each version into a tuple of 3 integers: tuple(map(int, v.split("."))).',
      'Compare t1 > t2: return 1; t1 < t2: return -1; else return 0.'
    ],
    solution: `def compare_semver(v1: str, v2: str) -> int:
    t1 = tuple(map(int, v1.split(".")))
    t2 = tuple(map(int, v2.split(".")))
    if t1 > t2:
        return 1
    elif t1 < t2:
        return -1
    return 0`,
    testCases: [
      { input: '"1.2.0", "1.1.9"', expectedOutput: '1' },
      { input: '"2.0.1", "2.0.1"', expectedOutput: '0' },
      { input: '"0.9.5", "1.0.0"', expectedOutput: '-1' }
    ]
  }
};

const py10Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-10.ts');
writePythonModuleFile(py10Path, m10.data, m10Lessons);
console.log('Python Module 10 completed! Authored:', Object.keys(m10Lessons).length);
