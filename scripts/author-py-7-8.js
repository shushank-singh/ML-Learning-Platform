const path = require('path');
const { getExistingPyLessons } = require('./extract-landmarks');
const { writePythonModuleFile } = require('./writer');

// ==========================================
// Python Module 7: Exceptions, Files, and Modules
// ==========================================
const m7 = getExistingPyLessons(7);
const m7Lessons = { ...m7.lessons };

m7Lessons['py-exceptions-custom'] = {
  id: 'py-exceptions-custom',
  moduleId: 'python-module-7',
  title: 'Creating Custom Exceptions',
  subtitle: 'Subclassing Exception, Context Attributes, and Exception Chaining with raise ... from',
  order: 2,
  readTimeMinutes: 18,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Define domain-specific custom exception classes by subclassing Exception.',
    'Attach contextual error metadata (error codes, user IDs, invalid values) to exception instances.',
    'Use explicit exception chaining with `raise NewError from original_error` to preserve root causes.',
    'Design hierarchical exception trees for cohesive library error handling.'
  ],
  prerequisites: ['Basic try/except handling and class inheritance.'],
  analogy: {
    title: 'The Specialized Hospital Diagnostic Triage',
    text: 'A generic `Exception` is a patient shouting "I am sick!" (too vague to treat specifically). A custom exception is a medical diagnosis like `CardiacArrhythmiaError` or `FracturedFemurError`. It carries exact patient vitals, timestamps, and doctor notes so specialists in the ER can apply targeted treatments immediately.',
    metaphor: 'Custom exceptions provide precise error taxonomy with structured debugging context.'
  },
  problemSolved: {
    title: 'Differentiating Application Errors from System Failures',
    description: 'Catching generic ValueError or KeyError often masks underlying bugs. Custom exceptions allow client code to catch only the specific business-logic failures they know how to handle.',
    keyPoints: [
      'Always inherit custom exceptions from `Exception`, never from `BaseException`.',
      'End custom exception class names with `Error` (e.g. `UserNotFoundError`).',
      '`raise ... from err` sets `__cause__`, preserving the original traceback.'
    ]
  },
  intuition: {
    overview: 'Exceptions are standard Python objects. When raised, CPython unwinds execution frames until an except block matches `isinstance(raised_exception, ExceptType)`.',
    steps: [
      { step: 1, title: 'Definition', description: 'Create class inheriting from Exception with custom __init__ for attributes.' },
      { step: 2, title: 'Raising with Cause', description: 'Use raise MyError("msg") from original_exc to link root causes.' },
      { step: 3, title: 'Granular Catching', description: 'Callers catch MyError without accidentally catching unrelated ValueErrors.' }
    ]
  },
  codeExample: {
    title: 'Hierarchical Custom Exceptions with Chaining',
    code: `class AppError(Exception):
    """Base exception for all application errors."""
    pass

class DatabaseConnectionError(AppError):
    def __init__(self, host: str, port: int, original_error: Exception | None = None):
        self.host = host
        self.port = port
        message = f"Failed to connect to database at {host}:{port}"
        super().__init__(message)

def connect_to_db(host, port):
    try:
        # Simulate lower-level socket error
        raise TimeoutError("Connection timed out after 3000ms")
    except TimeoutError as err:
        raise DatabaseConnectionError(host, port) from err

try:
    connect_to_db("db.prod.internal", 5432)
except DatabaseConnectionError as e:
    print(f"Caught: {e}")
    print(f"Host: {e.host}, Root cause: {e.__cause__}")`,
    explanation: 'Demonstrates custom exception inheritance, custom attribute storage, and exception chaining via `from err`.'
  },
  runnableCode: {
    code: `class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        super().__init__(f"Attempted to withdraw \${amount}, but balance is only \${balance}")
        self.balance = balance
        self.amount = amount

try:
    raise InsufficientFundsError(25.0, 100.0)
except InsufficientFundsError as e:
    print("Error:", e)
    print("Deficit:", e.amount - e.balance)`,
    expectedOutput: `Error: Attempted to withdraw $100.0, but balance is only $25.0
Deficit: 75.0`
  },
  lineByLine: [
    { line: 1, code: 'class InsufficientFundsError(Exception):', explanation: 'Subclasses built-in Exception.' },
    { line: 2, code: '    def __init__(self, balance, amount):', explanation: 'Accepts domain-specific parameters.' },
    { line: 3, code: '        super().__init__(f"...")', explanation: 'Passes formatted message string to parent Exception for str(e).' },
    { line: 4, code: '        self.balance = balance', explanation: 'Stores balance on exception object for programmatic recovery.' }
  ],
  commonMistakes: [
    {
      mistake: 'Inheriting custom exceptions directly from `BaseException`.',
      whyWrong: 'Bypasses standard `except Exception:` blocks and interferes with system signals like KeyboardInterrupt.',
      howToFix: 'Always inherit from `Exception`.'
    },
    {
      mistake: 'Raising strings: `raise "Error occurred"`.',
      whyWrong: 'Forbidden in modern Python; raises `TypeError: exceptions must derive from BaseException`.',
      howToFix: 'Always instantiate an Exception class: `raise ValueError("Error occurred")`.'
    }
  ],
  realWorldApplications: [
    { title: 'Payment Gateways', description: 'Raising `CardDeclinedError`, `ExpiredTokenError`, or `FraudDetectionError`.' },
    { title: 'REST API Frameworks', description: 'FastAPI and Flask catching domain exceptions and converting them to JSON HTTP status codes.' }
  ],
  practiceQuestions: [
    { question: 'Why should custom exceptions inherit from `Exception` rather than `BaseException`?', hint: 'Signal handling and generic catch blocks.', answer: '`BaseException` is reserved for system-exiting exceptions like `KeyboardInterrupt` and `SystemExit`. Catching `Exception` should catch all normal program errors without swallowing system interrupts.' },
    { question: 'How do you access the original exception when chained with `raise CustomError from original_err`?', hint: 'Dunder attribute on exception object.', answer: 'Via the `__cause__` attribute on the caught exception.' },
    { question: 'What is the naming convention for custom exception classes in PEP 8?', hint: 'Suffix convention.', answer: 'They should end with the suffix `Error` (e.g. `PaymentError`).' }
  ],
  quiz: [
    {
      question: 'Which statement correctly preserves the original traceback when re-raising a custom exception?',
      options: ['raise MyError() with original', 'raise MyError() from original', 'raise MyError(original)', 'raise original -> MyError'],
      correctAnswer: 1,
      explanation: 'The `raise ... from ...` syntax explicitly chains the new exception to the underlying cause.'
    },
    {
      question: 'What is `e.__cause__` if an exception was raised with `raise MyError() from root_exc`?',
      options: ['None', 'A reference to root_exc', 'The string name of root_exc', 'A tuple of stack frames'],
      correctAnswer: 1,
      explanation: '`__cause__` stores a direct reference to the original chained exception object.'
    },
    {
      question: 'What base class should all custom domain errors inherit from?',
      options: ['BaseException', 'Exception', 'RuntimeError', 'StandardError'],
      correctAnswer: 1,
      explanation: 'All non-system-exiting exceptions must inherit from `Exception`.'
    }
  ],
  codingChallenge: {
    title: 'Implement Validated Age Field Exception',
    difficulty: 'Intermediate',
    description: 'Create a custom exception `InvalidAgeError(ValueError)` whose `__init__` takes `age: int` and sets `self.age = age` with message `f"Invalid age: {age}. Age must be between 0 and 120."`. Write a function `validate_age(age: int) -> int` that raises this exception if `age < 0` or `age > 120`, otherwise returns `age`.',
    starterCode: `class InvalidAgeError(ValueError):
    # Write your solution here
    pass

def validate_age(age: int) -> int:
    # Write your solution here
    pass`,
    hints: [
      'In InvalidAgeError.__init__: super().__init__(f"Invalid age: {age}. Age must be between 0 and 120."); self.age = age.',
      'In validate_age: if age < 0 or age > 120: raise InvalidAgeError(age); return age.'
    ],
    solution: `class InvalidAgeError(ValueError):
    def __init__(self, age: int):
        super().__init__(f"Invalid age: {age}. Age must be between 0 and 120.")
        self.age = age

def validate_age(age: int) -> int:
    if age < 0 or age > 120:
        raise InvalidAgeError(age)
    return age`,
    testCases: [
      { input: 'validate_age(25)', expectedOutput: '25' }
    ]
  }
};

m7Lessons['py-files-reading-writing'] = {
  id: 'py-files-reading-writing',
  moduleId: 'python-module-7',
  title: 'File Reading and Writing',
  subtitle: 'open() Modes, Encoding, read/readline/readlines, and Modern pathlib.Path',
  order: 3,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Master standard file access modes: `"r"`, `"w"`, `"a"`, `"x"`, and binary modes (`"rb"`, `"wb"`).',
    'Always specify explicit character encodings (`encoding="utf-8"`) to prevent cross-platform file corruption.',
    'Compare file reading strategies: read(), readline(), readlines(), and chunked streaming.',
    'Use modern object-oriented filesystem paths with standard library `pathlib.Path`.'
  ],
  prerequisites: ['Python basics and string manipulation.'],
  analogy: {
    title: 'The Scribe and the Parchment Scroll',
    text: 'Opening a file is unrolling a parchment scroll on a desk. Mode `"r"` lets you read the text without ink on your fingers. Mode `"w"` scrapes the parchment completely blank (truncates) before inking new lines. Mode `"a"` moves your quill directly to the bottom of the scroll to write new paragraphs without touching previous lines.',
    metaphor: 'File handles are operating system streams controlled by mode flags and buffer pointers.'
  },
  problemSolved: {
    title: 'Reliable, Platform-Independent File Input/Output',
    description: 'Relying on platform-default encodings (e.g. Windows cp1252 vs Linux UTF-8) leads to corrupted files and UnicodeDecodeError crashes. Standardized file operations guarantee cross-platform persistence.',
    keyPoints: [
      'Always specify `encoding="utf-8"` when reading or writing text files.',
      '`"w"` truncates (erases) existing files immediately upon opening.',
      '`pathlib.Path` provides object-oriented paths with cross-platform slash handling (`/` operator).',
      'Iterating over a file object directly `for line in f:` streams lines in O(1) memory.'
    ]
  },
  intuition: {
    overview: 'The OS kernel manages file descriptors. Python wraps OS file handles in buffered stream objects that handle decoding between raw bytes and Unicode strings.',
    steps: [
      { step: 1, title: 'Open', description: 'OS grants file descriptor with specified access permissions and buffer.' },
      { step: 2, title: 'Stream/Seek', description: 'Pointer advances as bytes are read or flushed from write buffers.' },
      { step: 3, title: 'Close', description: 'Flushes remaining buffers and releases OS file descriptor.' }
    ]
  },
  codeExample: {
    title: 'Modern File I/O with pathlib.Path and Explicit UTF-8',
    code: `from pathlib import Path

# Modern pathlib usage
data_dir = Path("sample_data")
data_dir.mkdir(exist_ok=True)
file_path = data_dir / "records.txt"

# Writing lines
with open(file_path, "w", encoding="utf-8") as f:
    f.write("id,event\\n")
    f.write("101,login\\n")
    f.write("102,logout\\n")

# Memory-efficient line streaming
with open(file_path, "r", encoding="utf-8") as f:
    for line_num, line in enumerate(f, start=1):
        print(f"Line {line_num}: {line.strip()}")

# pathlib one-liner convenience
content = file_path.read_text(encoding="utf-8")
print(f"Total characters: {len(content)}")`,
    explanation: 'Demonstrates creating paths with Path, writing text, streaming lines, and using Path.read_text().'
  },
  runnableCode: {
    code: `import io

# Demonstrating file stream mechanics using in-memory StringIO
stream = io.StringIO()
stream.write("First line\\nSecond line\\nThird line")

# Seek back to beginning to read
stream.seek(0)
for line in stream:
    print("Streamed:", line.strip())`,
    expectedOutput: `Streamed: First line
Streamed: Second line
Streamed: Third line`
  },
  lineByLine: [
    { line: 4, code: 'stream = io.StringIO()', explanation: 'Creates an in-memory text stream behaving identically to a file.' },
    { line: 5, code: 'stream.write("First line\\n...")', explanation: 'Writes text into stream buffer.' },
    { line: 8, code: 'stream.seek(0)', explanation: 'Rewinds the file pointer back to the 0th byte offset.' },
    { line: 9, code: 'for line in stream:', explanation: 'Streams lines one by one in O(1) auxiliary memory.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `open(file, "r")` without `encoding="utf-8"`.',
      whyWrong: 'CPython falls back to locale-dependent encodings (like CP-1252 on Windows), causing crashes on accented or emoji characters.',
      howToFix: 'Always pass `encoding="utf-8"` explicitly for text files.'
    },
    {
      mistake: 'Reading massive files using `f.read()` or `f.readlines()`.',
      whyWrong: 'Loads the entire file into RAM at once, causing Out-Of-Memory crashes on multi-gigabyte files.',
      howToFix: 'Stream lines one by one: `for line in f:`.'
    }
  ],
  realWorldApplications: [
    { title: 'Configuration Ingestion', description: 'Reading `.env`, `.ini`, or YAML files to bootstrap microservices.' },
    { title: 'Log Rotation & Auditing', description: 'Appending transaction receipts to append-only audit files.' }
  ],
  practiceQuestions: [
    { question: 'What is the difference between open mode `"w"` and `"a"`?', hint: 'Truncation vs appending.', answer: '`"w"` truncates (wipes) the file before writing, whereas `"a"` preserves existing contents and appends to the end.' },
    { question: 'Why is `for line in f:` preferable to `for line in f.readlines():`?', hint: 'Memory streaming.', answer: '`for line in f:` reads lines lazily on demand (O(1) memory), while `f.readlines()` reads all lines into a memory list at once.' },
    { question: 'How can you check if a file exists using `pathlib`?', hint: 'Method on Path object.', answer: 'Using `Path("my_file.txt").exists()`.' }
  ],
  quiz: [
    {
      question: 'Which open mode creates a file for writing, but FAILS with FileExistsError if the file already exists?',
      options: ['"w"', '"a"', '"x"', '"r+"'],
      correctAnswer: 2,
      explanation: 'Exclusive creation mode `"x"` opens for writing only if the target file does not already exist.'
    },
    {
      question: 'What does `Path("dir") / "sub" / "file.txt"` do in Python?',
      options: ['Divides directory numbers', 'Constructs a cross-platform Path object using overloaded / operator', 'Raises TypeError', 'Splits text file'],
      correctAnswer: 1,
      explanation: '`pathlib.Path` overloads the `/` operator to cleanly join path segments across operating systems.'
    },
    {
      question: 'Which file mode is required for reading binary files like images or compiled binaries?',
      options: ['"r"', '"rb"', '"binary"', '"raw"'],
      correctAnswer: 1,
      explanation: 'Binary read mode is `"rb"`, returning `bytes` objects rather than `str`.'
    }
  ],
  codingChallenge: {
    title: 'Count Words in File Stream',
    difficulty: 'Intermediate',
    description: 'Write a function `count_file_metrics(stream: io.StringIO) -> tuple[int, int, int]` that takes an open text stream (already sought to start) and returns `(line_count, word_count, char_count)` without reading the entire content into memory at once.',
    starterCode: `import io

def count_file_metrics(stream: io.StringIO) -> tuple[int, int, int]:
    # Write your solution here
    pass`,
    hints: [
      'Initialize lines = 0, words = 0, chars = 0.',
      'Iterate for line in stream.',
      'lines += 1; chars += len(line); words += len(line.split()).'
    ],
    solution: `import io

def count_file_metrics(stream: io.StringIO) -> tuple[int, int, int]:
    lines = 0
    words = 0
    chars = 0
    for line in stream:
        lines += 1
        chars += len(line)
        words += len(line.split())
    return lines, words, chars`,
    testCases: [
      { input: 's = io.StringIO("hello world\\npython code"); count_file_metrics(s)', expectedOutput: '(2, 4, 23)' }
    ]
  }
};

m7Lessons['py-files-context-managers'] = {
  id: 'py-files-context-managers',
  moduleId: 'python-module-7',
  title: 'Context Managers (with statement)',
  subtitle: '__enter__ and __exit__, Exception Suppression, and @contextmanager',
  order: 4,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'execution-trace',
  objectives: [
    'Understand why context managers (`with`) guarantee resource cleanup and prevent descriptor leaks.',
    'Implement class-based context managers with `__enter__()` and `__exit__()`.',
    'Handle and optionally suppress exceptions inside `__exit__()` by returning True.',
    'Build lightweight generator-based context managers using `@contextlib.contextmanager`.'
  ],
  prerequisites: ['Python classes, exception handling, and generator yield.'],
  analogy: {
    title: 'The Cleanroom Airlock and Hazmat Suit',
    text: 'Entering a sterile cleanroom requires suiting up in an airlock (`__enter__`). Inside, you conduct your experiment. Regardless of whether your experiment succeeds, crashes, or catches fire, the airlock system forces you to decontaminate, strip the suit, and seal the chamber on your way out (`__exit__`). No researcher can ever walk away leaving the airlock open.',
    metaphor: 'Context managers guarantee setup and teardown actions around arbitrary execution blocks.'
  },
  problemSolved: {
    title: 'Guaranteed Resource Cleanup Without Verbose try/finally Boilerplate',
    description: 'Manually calling `file.close()`, `db.disconnect()`, or `lock.release()` in `try/finally` blocks is verbose and prone to omission. Context managers encapsulate RAII (Resource Acquisition Is Initialization) cleanly.',
    keyPoints: [
      '`with obj as target:` calls `target = obj.__enter__()` and guarantees `obj.__exit__()` executes upon block exit.',
      '`__exit__(exc_type, exc_val, exc_tb)` receives exception details if an error occurred.',
      'Returning `True` from `__exit__` suppresses the active exception; returning anything else propagates it.'
    ]
  },
  intuition: {
    overview: 'The `with` statement guarantees that cleanup executes even on exceptions, breaks, or returns.',
    steps: [
      { step: 1, title: 'Enter', description: '__enter__() acquires the resource and returns the bound target.' },
      { step: 2, title: 'Execute', description: 'The inner block statements execute.' },
      { step: 3, title: 'Exit', description: '__exit__() releases resources, passing (None, None, None) on success or exception info on failure.' }
    ]
  },
  codeExample: {
    title: 'Timer and Execution Block Context Managers',
    code: `import time
from contextlib import contextmanager

# Class-based context manager
class ExecutionTimer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"Elapsed: {self.elapsed:.6f}s")
        return False  # Do not suppress exceptions

# Generator-based context manager
@contextmanager
def temporary_flag(settings_dict, key, temp_val):
    old_val = settings_dict.get(key)
    settings_dict[key] = temp_val
    try:
        yield temp_val
    finally:
        if old_val is None:
            settings_dict.pop(key, None)
        else:
            settings_dict[key] = old_val

config = {"debug": False}
with temporary_flag(config, "debug", True):
    print("Inside with block:", config["debug"])
print("Outside with block:", config["debug"])`,
    explanation: 'Demonstrates both a class-based timer context manager and a generator-based temporary setting manager.'
  },
  runnableCode: {
    code: `class SuppressErrors:
    """Context manager that suppresses specific exceptions."""
    def __init__(self, *exc_types):
        self.exc_types = exc_types

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        # Return True if exc_type matches any suppressed exception
        return exc_type is not None and issubclass(exc_type, self.exc_types)

print("Starting safe block...")
with SuppressErrors(ZeroDivisionError):
    x = 1 / 0
    print("Not reached")
print("Survived ZeroDivisionError cleanly!")`,
    expectedOutput: `Starting safe block...
Survived ZeroDivisionError cleanly!`
  },
  lineByLine: [
    { line: 8, code: '    def __exit__(self, exc_type, exc_val, exc_tb):', explanation: 'Receives the exception type, instance, and traceback if an error occurs.' },
    { line: 10, code: '        return exc_type is not None and issubclass(...)', explanation: 'Returning True suppresses the exception from propagating to caller.' },
    { line: 13, code: 'with SuppressErrors(ZeroDivisionError):', explanation: 'Wraps block suppressing division by zero.' },
    { line: 16, code: 'print("Survived ZeroDivisionError cleanly!")', explanation: 'Execution continues smoothly after the with block.' }
  ],
  commonMistakes: [
    {
      mistake: 'Returning `None` or `False` from `__exit__` and expecting the exception to be suppressed.',
      whyWrong: 'Only an explicit truthy return value (like `return True`) tells Python to swallow the exception.',
      howToFix: 'Return `True` explicitly if and only if you intend to suppress the exception.'
    },
    {
      mistake: 'Forgetting `finally:` in `@contextmanager` generator functions.',
      whyWrong: 'If an exception occurs inside the `with` block, teardown logic after `yield` will never execute.',
      howToFix: 'Always wrap the `yield` statement in `try ... finally`.'
    }
  ],
  realWorldApplications: [
    { title: 'Database Transactions', description: 'Committing transactions on success and executing `rollback()` on exceptions.' },
    { title: 'Thread Synchronization', description: 'Acquiring and releasing thread locks (`threading.Lock`).' }
  ],
  practiceQuestions: [
    { question: 'What arguments does `__exit__()` take in a class-based context manager?', hint: 'Three exception parameters.', answer: '`self, exc_type, exc_val, exc_tb` (exception class, instance, and traceback).' },
    { question: 'What does returning `True` from `__exit__()` signify?', hint: 'Exception handling.', answer: 'It tells Python to suppress the active exception so it does not propagate.' },
    { question: 'What decorator in `contextlib` converts a generator function into a context manager?', hint: 'Decorator name.', answer: '`@contextlib.contextmanager`.' }
  ],
  quiz: [
    {
      question: 'Which method is executed when entering a `with` block?',
      options: ['__init__', '__start__', '__enter__', '__open__'],
      correctAnswer: 2,
      explanation: 'The `__enter__()` method is invoked upon entering a `with` statement.'
    },
    {
      question: 'In a generator decorated with `@contextmanager`, what statement separates setup from cleanup?',
      options: ['return', 'yield', 'pass', 'break'],
      correctAnswer: 1,
      explanation: 'Code before `yield` runs during `__enter__`; code after `yield` runs during `__exit__`.'
    },
    {
      question: 'Does `__exit__()` run if an unhandled exception occurs inside the `with` block?',
      options: ['No, the program crashes immediately', 'Yes, __exit__ is guaranteed to run like a finally block', 'Only if sys.settrace is enabled', 'Only on Linux'],
      correctAnswer: 1,
      explanation: '`__exit__()` is guaranteed to execute even if an exception occurs inside the block.'
    }
  ],
  codingChallenge: {
    title: 'Custom File Buffer Context Manager',
    difficulty: 'Intermediate',
    description: 'Write a class `StringCapture` that acts as a context manager. In `__enter__`, it creates a list `self.records = []` and returns `self`. Provide a method `record(text: str)` that appends text to `self.records`. In `__exit__`, it sets a property `self.final_text = " | ".join(self.records)`.',
    starterCode: `class StringCapture:
    # Write your solution here
    pass`,
    hints: [
      'In __enter__: self.records = []; return self.',
      'In record(t): self.records.append(t).',
      'In __exit__(*args): self.final_text = " | ".join(self.records).'
    ],
    solution: `class StringCapture:
    def __enter__(self):
        self.records = []
        return self
        
    def record(self, text: str):
        self.records.append(text)
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.final_text = " | ".join(self.records)
        return False`,
    testCases: [
      { input: 'with StringCapture() as sc: sc.record("A"); sc.record("B"); sc.final_text', expectedOutput: '"A | B"' }
    ]
  }
};

m7Lessons['py-modules-imports'] = {
  id: 'py-modules-imports',
  moduleId: 'python-module-7',
  title: 'Imports and Packages',
  subtitle: 'sys.path Search Order, __init__.py, Relative Imports, and sys.modules Cache',
  order: 5,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Understand how Python searches for modules using `sys.path`.',
    'Structure multi-file codebases into packages using directories and `__init__.py`.',
    'Distinguish absolute imports (`from mypkg.utils import helper`) from relative imports (`from .utils import helper`).',
    'Understand how `sys.modules` caches imported modules as singletons.'
  ],
  prerequisites: ['Python functions and basic files.'],
  analogy: {
    title: 'The Central Library Book Registry',
    text: 'When you import a module, Python is like a librarian looking up a book call number. It searches shelves in a strict order (`sys.path`): first your current desk, then the local branch, and finally the regional depository. Once found, the librarian places the book in a quick-access cart (`sys.modules`): if five other patrons request that same book later, the librarian hands them the cart copy instantly without searching the shelves again.',
    metaphor: 'Modules are loaded once and cached in sys.modules; sys.path defines resolution order.'
  },
  problemSolved: {
    title: 'Eliminating ModuleNotFoundError and Circular Import Deadlocks',
    description: 'As Python projects grow beyond a single script, organizing code into clean, importable packages with predictable dependencies is crucial to prevent import errors and circular dependency deadlocks.',
    keyPoints: [
      '`sys.path[0]` is always the directory containing the script used to invoke Python.',
      'A directory containing `__init__.py` is treated as a regular package.',
      'Module code executes ONCE upon first import; subsequent imports return the cached module from `sys.modules`.',
      'Circular imports occur when module A imports B while module B imports A during top-level evaluation.'
    ]
  },
  intuition: {
    overview: 'CPython uses `importlib` to locate module files, load their bytecode or source, execute the module in a fresh namespace dictionary, and store the result in `sys.modules`.',
    steps: [
      { step: 1, title: 'Check Cache', description: 'If module name exists in `sys.modules`, return cached module object immediately.' },
      { step: 2, title: 'Path Resolution', description: 'Iterate through `sys.path` searching for matching .py, .pyc, or package directory.' },
      { step: 3, title: 'Execution', description: 'Execute top-level module statements in a new module namespace and cache in `sys.modules`.' }
    ]
  },
  codeExample: {
    title: 'Inspecting sys.path and sys.modules',
    code: `import sys
import math

# math is now cached in sys.modules
print("Math module cached?", "math" in sys.modules)
print("Math module path:", math.__file__ if hasattr(math, '__file__') else "C-builtin")

# Inspecting search path
print("\\nTop 3 sys.path search roots:")
for idx, p in enumerate(sys.path[:3]):
    print(f"{idx}: {p}")

# Package __all__ controls 'from pkg import *'
__all__ = ["useful_function"]
def useful_function(): return "Exported!"`,
    explanation: 'Demonstrates inspecting module caching in `sys.modules`, `sys.path` search order, and `__all__` export lists.'
  },
  runnableCode: {
    code: `import sys

# Demonstrating that imports are singletons
import json
import json as json_alias

print("Is same object?", json is json_alias)
print("Cached in sys.modules?", sys.modules["json"] is json)`,
    expectedOutput: `Is same object? True
Cached in sys.modules? True`
  },
  lineByLine: [
    { line: 4, code: 'import json', explanation: 'Loads json into sys.modules.' },
    { line: 5, code: 'import json as json_alias', explanation: 'Creates alias pointing to the exact same cached module.' },
    { line: 7, code: 'print("Is same object?", json is json_alias)', explanation: 'Verifies modules are singletons in memory.' }
  ],
  commonMistakes: [
    {
      mistake: 'Naming your own file after a standard library module (e.g. naming your test script `math.py` or `random.py`).',
      whyWrong: 'Because current directory is first in `sys.path`, your file shadows the standard library, breaking standard imports with bizarre errors.',
      howToFix: 'Never name project files with standard library module names.'
    },
    {
      mistake: 'Using wildcard imports: `from module import *`.',
      whyWrong: 'Pollutes current namespace, masks variable origins, and breaks static analysis tools and linters.',
      howToFix: 'Import explicit names: `from module import item1, item2`.'
    }
  ],
  realWorldApplications: [
    { title: 'Open-Source Library Distribution', description: 'Designing clean `__all__` public APIs in packages like requests or numpy.' },
    { title: 'Plugin Architectures', description: 'Dynamic runtime module loading using `importlib.import_module(plugin_name)`.' }
  ],
  practiceQuestions: [
    { question: 'What dictionary in the `sys` module caches all previously loaded modules?', hint: 'Dunder or module dictionary.', answer: '`sys.modules`.' },
    { question: 'What list in the `sys` module determines the order of directories searched during an import?', hint: 'Path list.', answer: '`sys.path`.' },
    { question: 'What does a leading dot signify in a relative import: `from .helpers import util`?', hint: 'Current package directory.', answer: 'It specifies importing from the current package directory.' }
  ],
  quiz: [
    {
      question: 'What happens when a Python module is imported a second time in the same process?',
      options: ['Its code executes again from top to bottom', 'Python loads the cached module object from sys.modules without re-executing it', 'Raises ImportError', 'A new thread is spawned'],
      correctAnswer: 1,
      explanation: 'Modules are loaded and executed once; subsequent imports retrieve the cached instance from `sys.modules`.'
    },
    {
      question: 'What special variable in a module restricts what is imported when using `from mymodule import *`?',
      options: ['__public__', '__all__', '__exports__', '__visible__'],
      correctAnswer: 1,
      explanation: 'The `__all__` list specifies the explicit sequence of string names exported on wildcard imports.'
    },
    {
      question: 'Why does naming a script `test_email.py` work fine, but naming it `email.py` causes crashes?',
      options: ['email is a reserved keyword', 'It shadows the standard library email package in sys.path[0]', 'Python filenames cannot be 5 characters', 'It triggers email spam filters'],
      correctAnswer: 1,
      explanation: '`sys.path[0]` is the current directory, so local `email.py` shadows the standard library `email` module.'
    }
  ],
  codingChallenge: {
    title: 'Simulate Module Registry Cache',
    difficulty: 'Intermediate',
    description: 'Write a class `ModuleRegistry` that simulates a module cache. It has an internal dict `self._cache`. Implement `load(name: str, loader_fn: callable) -> dict`: if `name` is already in `self._cache`, return it directly without calling `loader_fn`. If not, call `loader_fn()`, store the result in `self._cache[name]`, and return it.',
    starterCode: `class ModuleRegistry:
    # Write your solution here
    pass`,
    hints: [
      'Initialize self._cache = {} in __init__.',
      'In load: check if name in self._cache: return self._cache[name].',
      'Otherwise: self._cache[name] = loader_fn(); return self._cache[name].'
    ],
    solution: `class ModuleRegistry:
    def __init__(self):
        self._cache = {}
        
    def load(self, name: str, loader_fn):
        if name not in self._cache:
            self._cache[name] = loader_fn()
        return self._cache[name]`,
    testCases: [
      { input: 'calls = 0; fn = lambda: {"val": 42}; r = ModuleRegistry(); r.load("m", fn); r.load("m", fn)', expectedOutput: '{"val": 42}' }
    ]
  }
};

m7Lessons['py-modules-venv'] = {
  id: 'py-modules-venv',
  moduleId: 'python-module-7',
  title: 'Virtual Environments and pip',
  subtitle: 'venv Creation, pip Dependency Management, and requirements.txt Workflows',
  order: 6,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Understand why isolated virtual environments prevent dependency conflicts ("dependency hell").',
    'Create and activate environments using `python -m venv .venv`.',
    'Install, upgrade, and remove packages using `pip install` and `pip freeze`.',
    'Lock reproducible environments using `requirements.txt`.'
  ],
  prerequisites: ['Basic command line familiarity and Python modules.'],
  analogy: {
    title: 'The Isolated Kitchenettes for Competing Chefs',
    text: 'Installing packages globally is like two chefs sharing one spice rack: Chef Italian demands spicy chili powder in the red jar, but Chef Pastry overwrites it with powdered sugar. Chaos ensues. A virtual environment gives each chef their own private kitchenette (`.venv`) with their own private spice jars, completely isolated from each other and the master pantry.',
    metaphor: 'Virtual environments isolate site-packages and Python binaries per project.'
  },
  problemSolved: {
    title: 'Eliminating System-Wide Version Collisions',
    description: 'Project A might require Django 3.2 (LTS) while Project B requires Django 5.0. Installing globally breaks one project when upgrading the other. Virtual environments create self-contained directory trees for each project.',
    keyPoints: [
      '`python -m venv <dir>` creates an isolated environment folder containing python and pip binaries.',
      'Activation scripts adjust the shell\'s `PATH` variable so `python` points to `.venv/bin/python`.',
      '`pip freeze > requirements.txt` exports exact installed package versions for deterministic deployment.'
    ]
  },
  intuition: {
    overview: 'A virtual environment works by setting `sys.prefix` and modifying `PATH` so Python resolves packages from the local `lib/site-packages` directory.',
    steps: [
      { step: 1, title: 'Create', description: 'python -m venv .venv copies Python symlink and initializes isolated site-packages.' },
      { step: 2, title: 'Activate', description: 'Prepends .venv/bin (or .venv/Scripts on Windows) to PATH environment variable.' },
      { step: 3, title: 'Install', description: 'pip install writes wheels directly into .venv/lib/site-packages.' }
    ]
  },
  codeExample: {
    title: 'Standard Virtual Environment CLI Workflow',
    code: `# 1. Create a new virtual environment
# python -m venv .venv

# 2. Activate environment
# On macOS/Linux: source .venv/bin/activate
# On Windows: .venv\\Scripts\\activate

# 3. Install packages
# pip install requests==2.31.0 pandas

# 4. Freeze dependencies to file
# pip freeze > requirements.txt

# 5. Install from requirements file in CI/CD
# pip install -r requirements.txt`,
    explanation: 'Demonstrates the standard production lifecycle for Python virtual environments and pip.'
  },
  runnableCode: {
    code: `import sys

# Checking if current Python session is running inside a virtual environment
in_venv = sys.prefix != sys.base_prefix
print(f"Is running in virtual environment? {in_venv}")
print(f"Active Python Prefix: {sys.prefix}")
print(f"Base System Prefix: {sys.base_prefix}")`,
    expectedOutput: `Is running in virtual environment? True`
  },
  lineByLine: [
    { line: 4, code: 'in_venv = sys.prefix != sys.base_prefix', explanation: 'Compares active prefix against base system prefix.' },
    { line: 5, code: 'print(...)', explanation: 'If prefixes differ, Python is running inside an active virtual environment.' }
  ],
  commonMistakes: [
    {
      mistake: 'Committing the `.venv` directory to git source control repositories.',
      whyWrong: 'Virtual environments are platform-specific binaries and several hundred megabytes in size; committing them clutters git.',
      howToFix: 'Add `.venv/` and `venv/` to `.gitignore`, and commit `requirements.txt` instead.'
    },
    {
      mistake: 'Running `pip install` without activating the virtual environment.',
      whyWrong: 'Installs packages globally into user system Python, risking permissions errors or version pollution.',
      howToFix: 'Verify shell prompt shows `(.venv)` or check `which python` / `where python` before installing.'
    }
  ],
  realWorldApplications: [
    { title: 'Docker Containers', description: 'Setting up clean isolated environments inside lightweight Alpine or Debian images.' },
    { title: 'CI/CD Pipelines', description: 'GitHub Actions runners creating fresh venvs to test code against multiple Python versions.' }
  ],
  practiceQuestions: [
    { question: 'What command creates a virtual environment named `.venv` in modern Python?', hint: 'Standard venv module.', answer: '`python -m venv .venv`.' },
    { question: 'How can you detect programmatically whether Python is running inside a virtual environment?', hint: 'Compare sys attributes.', answer: '`sys.prefix != sys.base_prefix`.' },
    { question: 'What command generates a frozen list of all installed packages with exact versions?', hint: 'Pip freeze command.', answer: '`pip freeze > requirements.txt`.' }
  ],
  quiz: [
    {
      question: 'Which file should you commit to version control to share dependencies with teammates?',
      options: ['.venv directory', 'requirements.txt', 'pip.exe', 'site-packages'],
      correctAnswer: 1,
      explanation: '`requirements.txt` is lightweight text tracking dependencies; `.venv` should always be git-ignored.'
    },
    {
      question: 'What does activating a virtual environment primarily do to your shell?',
      options: ['Recompiles the Python kernel', 'Prepends the virtual environment\'s bin or Scripts folder to your PATH environment variable', 'Encrypts user files', 'Disables network access'],
      correctAnswer: 1,
      explanation: 'Activation scripts prepend the environment\'s executable directory to `PATH`.'
    },
    {
      question: 'How do you install all packages listed in a requirements.txt file?',
      options: ['pip install requirements.txt', 'pip install -r requirements.txt', 'pip load requirements.txt', 'python -m pip sync'],
      correctAnswer: 1,
      explanation: 'The `-r` flag instructs pip to read package requirements from a file.'
    }
  ],
  codingChallenge: {
    title: 'Parse requirements.txt Specifier',
    difficulty: 'Beginner',
    description: 'Write a function `parse_requirements(req_text: str) -> dict[str, str]` that takes the text of a `requirements.txt` file (where each line is `package==version`, e.g. "requests==2.31.0") and returns a dictionary mapping package names to version strings. Ignore empty lines and lines starting with "#".',
    starterCode: `def parse_requirements(req_text: str) -> dict[str, str]:
    # Write your solution here
    pass`,
    hints: [
      'Iterate through req_text.splitlines().',
      'Strip lines, ignore empty or lines starting with "#".',
      'Split by "==" and store in dict.'
    ],
    solution: `def parse_requirements(req_text: str) -> dict[str, str]:
    packages = {}
    for line in req_text.splitlines():
        cleaned = line.strip()
        if not cleaned or cleaned.startswith("#"):
            continue
        if "==" in cleaned:
            name, version = cleaned.split("==", 1)
            packages[name.strip()] = version.strip()
    return packages`,
    testCases: [
      { input: '"# Dependencies\\nrequests==2.31.0\\nnumpy==1.26.0"', expectedOutput: '{"requests": "2.31.0", "numpy": "1.26.0"}' }
    ]
  }
};

m7Lessons['py-modules-env-vars'] = {
  id: 'py-modules-env-vars',
  moduleId: 'python-module-7',
  title: 'Environment Variables and Configuration',
  subtitle: 'os.environ, python-dotenv, Secret Hygiene, and Twelve-Factor App Principles',
  order: 7,
  readTimeMinutes: 18,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Read and write environment variables using standard library `os.environ`.',
    'Safely provide fallback defaults with `os.getenv(key, default)`.',
    'Follow Twelve-Factor App principles: separate sensitive configuration credentials from source code.',
    'Understand `.env` files and `python-dotenv` for local developer configuration.'
  ],
  prerequisites: ['Python dictionaries and file basics.'],
  analogy: {
    title: 'The Safe Deposit Combination on a Post-It Note',
    text: 'Hardcoding database passwords or API keys directly inside your Python source code is like writing your bank vault combination directly onto the glass front window of your house: anyone who looks at the git repository can rob you. Environment variables are keeping the combination strictly in your head: the program asks the host environment for the key when it wakes up.',
    metaphor: 'Environment variables inject configuration into the process without baking secrets into code.'
  },
  problemSolved: {
    title: 'Preventing Leaked Credentials and Differentiating Environments',
    description: 'Code moves between development, staging, and production environments. Hardcoding URLs or credentials forces manual edits and risks leaking production secrets to GitHub. Environment variables make apps configurable from the outside.',
    keyPoints: [
      '`os.environ` is a mapping reflecting the process\'s environment variables.',
      '`os.getenv("KEY", "fallback")` returns fallback if KEY is not defined.',
      'Always add `.env` to `.gitignore` to prevent secret commits.'
    ]
  },
  intuition: {
    overview: 'When an operating system spawns a process, it passes an array of key-value string pairs. Python parses these into `os.environ`.',
    steps: [
      { step: 1, title: 'OS Injection', description: 'Host shell passes environment variables to child Python process.' },
      { step: 2, title: 'Lookup', description: 'Application reads variables at startup via os.environ or os.getenv().' },
      { step: 3, title: 'Validation', description: 'Validates presence of critical secrets before launching server.' }
    ]
  },
  codeExample: {
    title: 'Reading Configuration with Validation and Defaults',
    code: `import os

class AppConfig:
    def __init__(self):
        # Mandatory secret: must exist
        self.api_key = os.getenv("API_KEY")
        if not self.api_key:
            # In production, raise error; here we provide a demo fallback
            self.api_key = "demo-key-123"

        # Optional setting with default
        self.port = int(os.getenv("PORT", "8000"))
        self.debug = os.getenv("DEBUG", "False").lower() in ("true", "1")

config = AppConfig()
print(f"Loaded config: Port={config.port}, Debug={config.debug}, KeyLength={len(config.api_key)}")`,
    explanation: 'Demonstrates reading environment variables with os.getenv, type casting to int and bool, and validating mandatory keys.'
  },
  runnableCode: {
    code: `import os

# Setting a temporary variable in current process
os.environ["APP_STAGE"] = "production"

stage = os.getenv("APP_STAGE", "development")
timeout = int(os.getenv("TIMEOUT_SECONDS", "30"))

print(f"Stage: {stage}")
print(f"Timeout: {timeout} seconds")`,
    expectedOutput: `Stage: production
Timeout: 30 seconds`
  },
  lineByLine: [
    { line: 4, code: 'os.environ["APP_STAGE"] = "production"', explanation: 'Sets environment variable within the active process environment.' },
    { line: 6, code: 'stage = os.getenv("APP_STAGE", "development")', explanation: 'Fetches APP_STAGE, returning fallback if missing.' },
    { line: 7, code: 'timeout = int(os.getenv("TIMEOUT_SECONDS", "30"))', explanation: 'Converts environment string to integer.' }
  ],
  commonMistakes: [
    {
      mistake: 'Forgetting that all environment variables are strings: `if os.getenv("DEBUG"):`.',
      whyWrong: 'If `DEBUG="False"`, `"False"` is a non-empty string which evaluates to truthy `True` in Python!',
      howToFix: 'Explicitly check boolean values: `os.getenv("DEBUG", "0").lower() in ("true", "1", "yes")`.'
    },
    {
      mistake: 'Hardcoding production API keys or tokens into source files.',
      whyWrong: 'Git history is permanent; credentials pushed to public or private repos are immediately harvested by bots.',
      howToFix: 'Store secrets in `.env` (git-ignored) and load them via environment variables.'
    }
  ],
  realWorldApplications: [
    { title: 'Cloud Deployments (AWS/Heroku/K8s)', description: 'Injecting database connection strings and S3 bucket secrets into container pods.' },
    { title: 'Feature Flagging', description: 'Enabling experimental beta features via `FEATURE_V2_ENABLED=1`.' }
  ],
  practiceQuestions: [
    { question: 'What is the return type of `os.getenv("PORT")`?', hint: 'Strings vs numbers.', answer: 'A `str` (or `None` if absent, unless a default is specified).' },
    { question: 'Why does `bool(os.getenv("FEATURE_FLAG", "False"))` evaluate to `True`?', hint: 'Non-empty string truthiness.', answer: 'Because the string `"False"` is non-empty, and all non-empty strings are truthy in Python.' },
    { question: 'What file holds local development secrets and should always be in `.gitignore`?', hint: 'Hidden dot file name.', answer: 'The `.env` file.' }
  ],
  quiz: [
    {
      question: 'What happens if you access `os.environ["MISSING_KEY"]` directly with square brackets?',
      options: ['Returns None', 'Raises KeyError', 'Returns empty string ""', 'Raises EnvironmentError'],
      correctAnswer: 1,
      explanation: 'Like a dictionary, direct key access `os.environ[key]` raises `KeyError` if missing. Use `os.getenv()` for defaults.'
    },
    {
      question: 'Which Twelve-Factor App methodology principle covers environment variables?',
      options: ['III. Config: Store config in the environment', 'I. Codebase', 'VI. Processes', 'XI. Logs'],
      correctAnswer: 0,
      explanation: 'Factor III dictates storing configuration that varies across deploys in the environment.'
    },
    {
      question: 'What popular library automatically loads key-value pairs from a local `.env` file into `os.environ`?',
      options: ['python-dotenv', 'env-loader', 'secrets-py', 'config-manager'],
      correctAnswer: 0,
      explanation: 'The `python-dotenv` package loads `.env` variables via `load_dotenv()`.'
    }
  ],
  codingChallenge: {
    title: 'Parse Typed Environment Configuration',
    difficulty: 'Intermediate',
    description: 'Write a function `parse_env_bool(val: str | None, default: bool = False) -> bool` that safely parses a string into a boolean: returns `True` for `"true"`, `"1"`, `"yes"` (case-insensitive), returns `False` for `"false"`, `"0"`, `"no"`, and returns `default` if `val` is `None` or empty.',
    starterCode: `def parse_env_bool(val: str | None, default: bool = False) -> bool:
    # Write your solution here
    pass`,
    hints: [
      'Check if val is None or empty: return default.',
      'Check cleaned in ("true", "1", "yes"): return True.',
      'Check cleaned in ("false", "0", "no"): return False.'
    ],
    solution: `def parse_env_bool(val: str | None, default: bool = False) -> bool:
    if not val:
        return default
    cleaned = val.strip().lower()
    if cleaned in ("true", "1", "yes"):
        return True
    if cleaned in ("false", "0", "no"):
        return False
    return default`,
    testCases: [
      { input: '"True"', expectedOutput: 'True' },
      { input: '"0"', expectedOutput: 'False' },
      { input: 'None, True', expectedOutput: 'True' }
    ]
  }
};

m7Lessons['py-modules-logging'] = {
  id: 'py-modules-logging',
  moduleId: 'python-module-7',
  title: 'Logging and Debugging',
  subtitle: 'logging Module, Log Levels, Handlers, Formatters, and Structured Output',
  order: 8,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Use Python\'s standard `logging` module instead of ad-hoc `print()` statements.',
    'Understand the 5 standard log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL.',
    'Configure loggers with custom Formatters (timestamps, levels, module names) and Handlers (StreamHandler, FileHandler).',
    'Capture exception tracebacks automatically using `logger.exception()` or `exc_info=True`.'
  ],
  prerequisites: ['Python functions, exceptions, and files.'],
  analogy: {
    title: 'The Airplane Flight Data Recorder (Black Box)',
    text: 'Scattering `print()` statements across code is like shouting out the cockpit window: once spoken, the words evaporate into the wind. The `logging` module is the aircraft black box: it continuously records airspeed, altitude, warning lights, and timestamps to non-volatile memory with prioritized severity levels. If a crisis occurs, engineers can reconstruct the exact second-by-second timeline.',
    metaphor: 'Logging provides persistent, structured, level-filtered diagnostic records.'
  },
  problemSolved: {
    title: 'Production Telemetry and Post-Mortem Debugging',
    description: 'In headless server environments, container clusters, or background jobs, there is no terminal to view `print()` statements. Logging routes messages to centralized log aggregators (Datadog, CloudWatch, Splunk) with severity levels.',
    keyPoints: [
      'Standard levels in ascending priority: DEBUG (10), INFO (20), WARNING (30), ERROR (40), CRITICAL (50).',
      'The default root logger threshold is `WARNING`; DEBUG and INFO messages are ignored until threshold is lowered.',
      '`logger.exception("message")` logs at ERROR level and automatically appends the active exception traceback.'
    ]
  },
  intuition: {
    overview: 'A Logger emits LogRecord objects. Handlers dispatch records to destinations (console, files, sockets). Formatters convert records to strings.',
    steps: [
      { step: 1, title: 'Emit', description: 'Calling logger.info() creates a LogRecord with metadata (filename, line, time).' },
      { step: 2, title: 'Filter', description: 'Logger compares record level against its threshold; drops if lower.' },
      { step: 3, title: 'Format & Dispatch', description: 'Handlers format record according to format string and write to destinations.' }
    ]
  },
  codeExample: {
    title: 'Configuring a Structured Production Logger',
    code: `import logging
import sys

# Configure a named logger
logger = logging.getLogger("payment_service")
logger.setLevel(logging.DEBUG)

# Create handler and formatter
handler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter(
    fmt="%(asctime)s | %(levelname)-8s | %(name)s:%(lineno)d | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
handler.setFormatter(formatter)
logger.addHandler(handler)

# Logging at various levels
logger.debug("Parsing card expiration date")
logger.info("Transaction #9842 initiated for \$99.00")
logger.warning("Payment gateway latency high (850ms)")

try:
    1 / 0
except ZeroDivisionError:
    logger.exception("Failed to calculate discount percentage")`,
    explanation: 'Demonstrates configuring a named logger with StreamHandler, timestamped formatter, and logger.exception().'
  },
  runnableCode: {
    code: `import logging

# Basic configuration
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger("demo")

logger.info("Application started successfully")
logger.warning("Low disk space on volume /var")`,
    expectedOutput: `INFO: Application started successfully
WARNING: Low disk space on volume /var`
  },
  lineByLine: [
    { line: 3, code: 'logging.basicConfig(level=logging.INFO, ...)', explanation: 'Configures root logger with INFO threshold and format.' },
    { line: 4, code: 'logger = logging.getLogger("demo")', explanation: 'Obtains named logger instance.' },
    { line: 6, code: 'logger.info(...)', explanation: 'Emits informational record.' },
    { line: 7, code: 'logger.warning(...)', explanation: 'Emits warning record.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `print()` for debugging in production code.',
      whyWrong: 'Cannot be disabled dynamically, lacks timestamps/line numbers, and cannot route to files or monitoring tools.',
      howToFix: 'Use `logging.getLogger(__name__)`.'
    },
    {
      mistake: 'Calling `logging.basicConfig()` multiple times.',
      whyWrong: '`basicConfig()` does nothing if root logger already has handlers configured (subsequent calls are ignored).',
      howToFix: 'Configure logging once at application entry point or use custom handlers.'
    }
  ],
  realWorldApplications: [
    { title: 'Auditing Security Events', description: 'Recording user logins, failed password attempts, and permission escalations.' },
    { title: 'Distributed Tracing', description: 'Injecting request IDs into log formatters to trace requests across microservices.' }
  ],
  practiceQuestions: [
    { question: 'What is the default threshold log level in Python\'s root logger?', hint: 'Debug, Info, or Warning?', answer: '`WARNING`.' },
    { question: 'How do you automatically include the active exception traceback in a log message?', hint: 'Method on logger.', answer: 'Using `logger.exception("message")` or passing `exc_info=True` to `logger.error()`.' },
    { question: 'What is the standard convention for naming loggers inside a module?', hint: 'Dunder variable.', answer: '`logger = logging.getLogger(__name__)`.' }
  ],
  quiz: [
    {
      question: 'Which log level has the highest numeric severity in Python?',
      options: ['DEBUG', 'INFO', 'ERROR', 'CRITICAL'],
      correctAnswer: 3,
      explanation: 'CRITICAL (level 50) represents the highest standard severity level.'
    },
    {
      question: 'What is the purpose of a `Handler` in Python logging?',
      options: ['To filter out profanity', 'To direct log records to appropriate destinations (console, files, sockets)', 'To compile Python code', 'To encrypt strings'],
      correctAnswer: 1,
      explanation: 'Handlers are responsible for sending log records to specific output endpoints.'
    },
    {
      question: 'Why is `logger = logging.getLogger(__name__)` the standard pattern?',
      options: ['It creates a hierarchical logger reflecting the module\'s position in the package tree', 'It encrypts the logger', 'It runs in parallel threads', 'It avoids importing logging'],
      correctAnswer: 0,
      explanation: '`__name__` maps to module dotted path (e.g. `mypackage.services.auth`), creating a clean hierarchical logger tree.'
    }
  ],
  codingChallenge: {
    title: 'Format Structured Log Message',
    difficulty: 'Intermediate',
    description: 'Write a function `build_log_entry(level: str, event: str, **context) -> str` that constructs a structured pipe-delimited log entry: `"{LEVEL} | {EVENT} | key1=val1, key2=val2"` with context keys sorted alphabetically (omit context section if context is empty). LEVEL must be uppercase.',
    starterCode: `def build_log_entry(level: str, event: str, **context) -> str:
    # Write your solution here
    pass`,
    hints: [
      'Uppercase level: level.upper().',
      'Format context if present: ", ".join(f"{k}={v}" for k, v in sorted(context.items())).',
      'Combine: f"{lvl} | {event} | {ctx}" or f"{lvl} | {event}".'
    ],
    solution: `def build_log_entry(level: str, event: str, **context) -> str:
    lvl = level.upper()
    if not context:
        return f"{lvl} | {event}"
    ctx_str = ", ".join(f"{k}={v}" for k, v in sorted(context.items()))
    return f"{lvl} | {event} | {ctx_str}"`,
    testCases: [
      { input: '"info", "user_login", ip="127.0.0.1", user_id=42', expectedOutput: '"INFO | user_login | ip=127.0.0.1, user_id=42"' }
    ]
  }
};

const py7Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-7.ts');
writePythonModuleFile(py7Path, m7.data, m7Lessons);
console.log('Python Module 7 completed! Authored:', Object.keys(m7Lessons).length);

// ==========================================
// Python Module 8: Advanced Python
// ==========================================
const m8 = getExistingPyLessons(8);
const m8Lessons = { ...m8.lessons };

m8Lessons['py-advanced-copying'] = {
  id: 'py-advanced-copying',
  moduleId: 'python-module-8',
  title: 'Shallow and Deep Copying',
  subtitle: 'The Copy Protocol: __copy__, __deepcopy__, Memoization, and Cyclic Graphs',
  order: 1,
  readTimeMinutes: 20,
  difficulty: 'Intermediate',
  visualizerType: 'memory-model',
  objectives: [
    'Master the copy protocol: implement custom `__copy__()` and `__deepcopy__(memo)` methods.',
    'Understand how `copy.deepcopy` uses the `memo` dictionary to handle cyclic object references.',
    'Differentiate between container duplication and leaf object reference preservation.',
    'Prevent memory explosion and recursion limit crashes when copying complex object graphs.'
  ],
  prerequisites: ['Python OOP, references, and mutability.'],
  analogy: {
    title: 'The Blueprint and The Recursive Clone Machine',
    text: 'A shallow copy is taking a blueprint of a house and printing a duplicate sheet of paper: you have two blueprints, but both point to the exact same physical water main on Elm Street. A deep copy builds an entire duplicate house on a new lot, including digging duplicate pipes and plumbing. The copy protocol (`__deepcopy__`) is the master contractor specifying which custom fixtures must be cloned and which public utilities can remain shared.',
    metaphor: '__copy__ duplicates the shell; __deepcopy__ recursively clones the object graph using memoization.'
  },
  problemSolved: {
    title: 'Customizing Clone Semantics and Handling Self-Referential Graphs',
    description: 'Standard deepcopy can be slow or fail on objects with unpicklable resources (sockets, file descriptors, database connections). Implementing custom copy protocol methods allows fine-grained control over cloning.',
    keyPoints: [
      '`copy.copy(obj)` invokes `obj.__copy__()` if defined.',
      '`copy.deepcopy(obj, memo)` invokes `obj.__deepcopy__(memo)` if defined.',
      'The `memo` dictionary maps `id(original)` to cloned instances to prevent infinite recursion on cycles.'
    ]
  },
  intuition: {
    overview: 'The `copy` module inspects object types, handles atomic immutable types (returning themselves), and recursively copies compound types using memoization.',
    steps: [
      { step: 1, title: 'Memo Check', description: 'Deepcopy checks if `id(obj)` is in `memo`; if found, returns already cloned instance.' },
      { step: 2, title: 'Protocol Dispatch', description: 'Calls `__deepcopy__(memo)` if defined, otherwise decomposes `__dict__`.' },
      { step: 3, title: 'Memo Recording', description: 'Stores newly cloned object in memo before recursing into children.' }
    ]
  },
  codeExample: {
    title: 'Implementing the Custom Copy Protocol with Cycles',
    code: `import copy

class Node:
    def __init__(self, val):
        self.val = val
        self.neighbors = []

    def __repr__(self):
        return f"Node({self.val}, neighbor_count={len(self.neighbors)})"

    def __deepcopy__(self, memo):
        # Prevent infinite loop on cyclic graph!
        if id(self) in memo:
            return memo[id(self)]

        # Allocate new instance without calling __init__
        cloned = self.__class__(self.val)
        memo[id(self)] = cloned  # Record before recursing!

        # Recursively clone neighbors
        cloned.neighbors = [copy.deepcopy(n, memo) for n in self.neighbors]
        return cloned

# Create cyclic graph: A -> B -> A
n1 = Node(1)
n2 = Node(2)
n1.neighbors.append(n2)
n2.neighbors.append(n1)

cloned_n1 = copy.deepcopy(n1)
print("Original n1:", n1)
print("Cloned n1:", cloned_n1)
print("Is cloned neighbor independent?", cloned_n1.neighbors[0] is not n2)`,
    explanation: 'Demonstrates implementing __deepcopy__ with memo dictionary handling cyclic graphs.'
  },
  runnableCode: {
    code: `import copy

class Session:
    def __init__(self, user, token):
        self.user = user
        self.token = token
        
    def __copy__(self):
        # Shallow copy preserves user reference, regenerates token
        return Session(self.user, f"{self.token}_copy")

s1 = Session("alice", "tok_123")
s2 = copy.copy(s1)
print("s1 token:", s1.token)
print("s2 token:", s2.token)`,
    expectedOutput: `s1 token: tok_123
s2 token: tok_123_copy`
  },
  lineByLine: [
    { line: 7, code: '    def __copy__(self):', explanation: 'Defines custom shallow copy protocol.' },
    { line: 9, code: '        return Session(self.user, f"{self.token}_copy")', explanation: 'Reuses user reference while mutating token.' },
    { line: 12, code: 's2 = copy.copy(s1)', explanation: 'Invokes __copy__ protocol.' }
  ],
  commonMistakes: [
    {
      mistake: 'Forgetting to pass `memo` to nested `copy.deepcopy(child, memo)` calls inside `__deepcopy__`.',
      whyWrong: 'Losing the memo dict causes infinite recursion and `RecursionError` on cyclic graphs.',
      howToFix: 'Always pass the `memo` dictionary forward into all recursive deepcopy calls.'
    },
    {
      mistake: 'Deepcopying open file objects, network sockets, or database connections.',
      whyWrong: 'Operating system handles cannot be duplicated via memory cloning; raises TypeError.',
      howToFix: 'Exclude OS handles in `__deepcopy__` or re-establish them in the clone.'
    }
  ],
  realWorldApplications: [
    { title: 'Abstract Syntax Tree (AST) Transforms', description: 'Cloning and modifying code syntax nodes during code generation.' },
    { title: 'Game State Snapshots', description: 'Cloning deep game state representations for minimax search in chess engines.' }
  ],
  practiceQuestions: [
    { question: 'What two methods define Python\'s copy protocol?', hint: 'Dunder methods.', answer: '`__copy__(self)` and `__deepcopy__(self, memo)`.' },
    { question: 'Why does `copy.deepcopy` take a `memo` argument?', hint: 'Cycle detection.', answer: 'To keep track of already-copied objects and prevent infinite recursion on circular references.' },
    { question: 'What happens when you pass an immutable integer or string to `copy.deepcopy`?', hint: 'Atomic types.', answer: 'It returns the exact same object immediately, because immutable atomic types cannot mutate.' }
  ],
  quiz: [
    {
      question: 'What is stored in the `memo` dictionary during `copy.deepcopy`?',
      options: ['Object names and docstrings', 'Mapping from id(original_object) to cloned_object', 'The program\'s bytecode', 'File descriptors'],
      correctAnswer: 1,
      explanation: 'The `memo` dict maps `id(original)` to the cloned instance to prevent duplicate clones and infinite cycles.'
    },
    {
      question: 'Which method is called when `copy.copy(obj)` is executed on an instance?',
      options: ['__clone__', '__copy__', '__shallow__', '__duplicate__'],
      correctAnswer: 1,
      explanation: '`copy.copy()` invokes the instance\'s `__copy__()` special method if present.'
    },
    {
      question: 'Why does `copy.deepcopy` of `(1, 2, "hello")` return the original tuple instead of a copy?',
      options: ['Tuples are bugged in copy module', 'Immutable tuples containing only immutable objects are immutable; copying is unnecessary', 'It creates a shallow copy instead', 'Tuples do not support deepcopy'],
      correctAnswer: 1,
      explanation: 'Since the tuple and all its contents are immutable, Python returns the original reference safely.'
    }
  ],
  codingChallenge: {
    title: 'Custom Deepcopy for State Container',
    difficulty: 'Intermediate',
    description: 'Write a class `StateContainer` with attributes `name: str` and `tags: list[str]`. Implement `__deepcopy__(self, memo)` so that cloning creates an independent copy of `tags`, prepends `"clone_"` to `name`, and correctly registers `self` in `memo`.',
    starterCode: `import copy

class StateContainer:
    # Write your solution here
    pass`,
    hints: [
      'In __deepcopy__: check if id(self) in memo: return memo[id(self)].',
      'Create cloned instance with f"clone_{self.name}" and copy.deepcopy(self.tags, memo).',
      'Record memo[id(self)] = cloned; return cloned.'
    ],
    solution: `import copy

class StateContainer:
    def __init__(self, name: str, tags: list[str]):
        self.name = name
        self.tags = list(tags)
        
    def __deepcopy__(self, memo):
        if id(self) in memo:
            return memo[id(self)]
        cloned = StateContainer(f"clone_{self.name}", copy.deepcopy(self.tags, memo))
        memo[id(self)] = cloned
        return cloned`,
    testCases: [
      { input: 's = StateContainer("root", ["prod"]); c = copy.deepcopy(s); (c.name, c.tags)', expectedOutput: '("clone_root", ["prod"])' }
    ]
  }
};

m8Lessons['py-advanced-iterators-depth'] = {
  id: 'py-advanced-iterators-depth',
  moduleId: 'python-module-8',
  title: 'Iterators and Generators in Depth',
  subtitle: 'Generator send(), throw(), close(), and Advanced itertools Combinatorics',
  order: 3,
  readTimeMinutes: 30,
  difficulty: 'Advanced',
  visualizerType: 'execution-trace',
  objectives: [
    'Use generator coroutine methods: `send(value)`, `throw(exc)`, and `close()`.',
    'Understand two-way communication through `received = yield output`.',
    'Use `itertools.groupby` (with sorting requirement) for data clustering.',
    'Use `itertools.islice`, `itertools.chain`, and `itertools.product` for streaming pipelines.'
  ],
  prerequisites: ['Generators, yield, and comprehensions.'],
  analogy: {
    title: 'The Two-Way Pneumatic Communication Tube',
    text: 'A standard generator is a one-way conveyor belt: you press a button, and it sends you a package. A generator using `send()` is a two-way pneumatic tube: you send a canister with instructions down the tube (`gen.send("expedite")`), the worker inside reads it, adjusts the machinery, and sends a modified package back up to you.',
    metaphor: 'yield is both an output producer and an input receiver in coroutine generators.'
  },
  problemSolved: {
    title: 'Bidirectional Data Streams and Combinatorial Iteration',
    description: 'Simple generators only push data to consumers. Coroutine generators can receive dynamic configuration at runtime via `.send()`. Advanced itertools combinatorics eliminate nested loop boilerplates.',
    keyPoints: [
      '`received = yield value` pauses and yields value, and returns what the caller passes into `gen.send(item)`.',
      'A freshly created generator must be primed with `next(gen)` or `gen.send(None)` before sending data.',
      '`itertools.groupby` requires input data to be pre-sorted by the grouping key.',
      '`itertools.islice(iterable, start, stop, step)` slices generators without converting to lists.'
    ]
  },
  intuition: {
    overview: 'In Python, `yield` is an expression, not just a statement. Its evaluated value inside the generator frame is whatever was passed into `send()`.',
    steps: [
      { step: 1, title: 'Priming', description: 'First next(gen) runs until the first yield expression.' },
      { step: 2, title: 'Bidirectional Exchange', description: 'gen.send(val) resumes execution, evaluates (yield x) to val, and runs to next yield.' },
      { step: 3, title: 'Termination', description: 'gen.close() raises GeneratorExit inside generator frame.' }
    ]
  },
  codeExample: {
    title: 'Running Average Coroutine with send() and itertools.groupby',
    code: `import itertools

# Coroutine generator computing cumulative running average
def running_average():
    total = 0.0
    count = 0
    avg = None
    while True:
        # yield current avg, receive next number
        val = yield avg
        if val is None:
            break
        total += val
        count += 1
        avg = total / count

avg_gen = running_average()
next(avg_gen) # Priming generator

print("Add 10:", avg_gen.send(10)) # 10.0
print("Add 20:", avg_gen.send(20)) # 15.0
print("Add 30:", avg_gen.send(30)) # 20.0

# itertools.groupby example
data = [("fruit", "apple"), ("fruit", "banana"), ("veg", "carrot")]
for category, items in itertools.groupby(data, key=lambda x: x[0]):
    names = [item[1] for item in items]
    print(f"{category}: {names}")`,
    explanation: 'Demonstrates coroutine two-way communication using send(), and grouping pre-sorted data using itertools.groupby.'
  },
  runnableCode: {
    code: `import itertools

# Cartesian product of suits and ranks
suits = ["♠", "♥"]
ranks = ["A", "K"]
deck = list(itertools.product(suits, ranks))
print("Cartesian Product Deck:", deck)

# islice on infinite generator
def evens():
    n = 0
    while True:
        yield n
        n += 2

first_five = list(itertools.islice(evens(), 5))
print("First five evens via islice:", first_five)`,
    expectedOutput: `Cartesian Product Deck: [('♠', 'A'), ('♠', 'K'), ('♥', 'A'), ('♥', 'K')]
First five evens via islice: [0, 2, 4, 6, 8]`
  },
  lineByLine: [
    { line: 5, code: 'deck = list(itertools.product(suits, ranks))', explanation: 'Computes Cartesian product equivalent to nested for loops.' },
    { line: 15, code: 'first_five = list(itertools.islice(evens(), 5))', explanation: 'Lazily slices first 5 items from infinite stream in O(1) memory.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `itertools.groupby` on unsorted data.',
      whyWrong: '`groupby` groups CONSECUTIVE items only; if identical keys are separated, multiple separate groups are created.',
      howToFix: 'Always sort data by the grouping key first: `sorted(data, key=...)` before `groupby`.'
    },
    {
      mistake: 'Sending a non-None value into an unprimed generator: `gen.send(10)`.',
      whyWrong: 'Raises `TypeError: can\'t send non-None value to a just-started generator`.',
      howToFix: 'Prime the generator first using `next(gen)` or `gen.send(None)`.'
    }
  ],
  realWorldApplications: [
    { title: 'State Machines & Event Parsers', description: 'Receiving network packets via `send()` and transitioning internal protocol states.' },
    { title: 'ETL Batch Partitioning', description: 'Using `itertools.chain.from_iterable` and `groupby` to batch stream records.' }
  ],
  practiceQuestions: [
    { question: 'What value must be passed to `gen.send()` when starting a brand new generator?', hint: 'Priming value.', answer: '`None` (or simply call `next(gen)`).' },
    { question: 'What prerequisite must input data satisfy before calling `itertools.groupby`?', hint: 'Ordering requirement.', answer: 'The input sequence must be pre-sorted by the grouping key.' },
    { question: 'What does `itertools.chain(["a", "b"], [1, 2])` do?', hint: 'Concatenating iterables.', answer: 'It lazily chains the iterables end-to-end, yielding "a", "b", 1, 2.' }
  ],
  quiz: [
    {
      question: 'What exception is raised inside a generator when the caller calls `gen.close()`?',
      options: ['StopIteration', 'GeneratorExit', 'SystemExit', 'KeyboardInterrupt'],
      correctAnswer: 1,
      explanation: '`gen.close()` raises `GeneratorExit` inside the generator to trigger cleanup.'
    },
    {
      question: 'Which itertools function computes all combinations of length r from an iterable without replacement?',
      options: ['itertools.permutations', 'itertools.combinations', 'itertools.product', 'itertools.cycle'],
      correctAnswer: 1,
      explanation: '`itertools.combinations(iterable, r)` generates unique combinations of length r without replacement.'
    },
    {
      question: 'Why does `val = yield x` allow two-way communication?',
      options: ['It shares a global variable', 'yield produces x for the caller, and evaluates to the argument passed into send()', 'It compiles to a socket', 'It uses multi-threading'],
      correctAnswer: 1,
      explanation: 'The yield expression produces `x` to the caller and evaluates to the value passed in by `.send()`.'
    }
  ],
  codingChallenge: {
    title: 'Group Consecutive Runs with itertools.groupby',
    difficulty: 'Advanced',
    description: 'Write a function `compress_runs(data: list) -> list[tuple[any, int]]` that takes a list and returns a run-length encoded list of `(value, count)` tuples representing consecutive identical runs using `itertools.groupby`.',
    starterCode: `import itertools

def compress_runs(data: list) -> list[tuple[any, int]]:
    # Write your solution here
    pass`,
    hints: [
      'Iterate through itertools.groupby(data).',
      'For each key, group: count elements using len(list(group)).',
      'Append (key, count) to results.'
    ],
    solution: `import itertools

def compress_runs(data: list) -> list[tuple[any, int]]:
    return [(key, len(list(group))) for key, group in itertools.groupby(data)]`,
    testCases: [
      { input: '["A", "A", "A", "B", "B", "C", "A"]', expectedOutput: '[("A", 3), ("B", 2), ("C", 1), ("A", 1)]' }
    ]
  }
};

m8Lessons['py-advanced-type-hints'] = {
  id: 'py-advanced-type-hints',
  moduleId: 'python-module-8',
  title: 'Type Hints and Annotations',
  subtitle: 'PEP 484, Union, Optional, Callable, TypeVar, Generic Types, and mypy',
  order: 4,
  readTimeMinutes: 25,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Apply type annotations to function parameters, return values, and variables.',
    'Use modern Python 3.10+ union syntax (`int | str`) and Optional types.',
    'Annotate complex structures: Callable[[ArgTypes], ReturnType], TypeVar, and Generic classes.',
    'Understand that type annotations have zero runtime overhead and run static analysis with mypy.'
  ],
  prerequisites: ['Python functions, classes, and decorators.'],
  analogy: {
    title: 'The Architectural Specifications Blueprint',
    text: 'Python source code without type hints is like assembling IKEA furniture with only black-and-white pictures: you might mistake a 30mm bolt for a 35mm bolt, and only discover the error when the shelf collapses hours later. Type hints are crisp, color-coded dimension stamps on every single part: the assembler (developer) and structural inspector (`mypy`) verify exact matches before anything is screwed together.',
    metaphor: 'Type hints provide machine-verifiable documentation and IDE autocompletion.'
  },
  problemSolved: {
    title: 'Catching Type Incompatibility Bugs Before Code Reaches Production',
    description: 'Dynamic typing allows rapid prototyping, but in large systems, passing `None` or a string where an integer is expected causes production crashes. Static type checking with `mypy` catches type errors before deployment.',
    keyPoints: [
      'Type hints do NOT enforce types at runtime; Python executes annotated code dynamically.',
      'In Python 3.10+, use `X | None` instead of `Optional[X]`, and `list[int]` instead of `typing.List[int]`.',
      '`TypeVar` enables generic functions and classes where types are determined by arguments.',
      'Static type checkers like `mypy` and `pyright` analyze annotations without running the code.'
    ]
  },
  intuition: {
    overview: 'CPython stores annotations in the `__annotations__` dictionary of functions, classes, and modules, leaving runtime evaluation unaffected.',
    steps: [
      { step: 1, title: 'Annotation', description: 'Developer annotates `def f(x: int) -> str:`.' },
      { step: 2, title: 'Static Inspection', description: 'Mypy validates call sites across the codebase against signatures.' },
      { step: 3, title: 'Runtime Ignored', description: 'CPython executes bytecode normally with zero performance degradation.' }
    ]
  },
  codeExample: {
    title: 'Generic Stack and TypeVar Implementation',
    code: `from typing import TypeVar, Generic, Callable

T = TypeVar('T')

class Stack(Generic[T]):
    """Generic LIFO stack retaining type information."""
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if not self._items:
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def map_elements(self, func: Callable[[T], T]) -> None:
        self._items = [func(item) for item in self._items]

# Strongly-typed string stack
str_stack = Stack[str]()
str_stack.push("hello")
str_stack.push("world")
str_stack.map_elements(str.upper)
print("Popped item:", str_stack.pop())`,
    explanation: 'Demonstrates TypeVar and Generic for reusable typed data structures, and typing Callable.'
  },
  runnableCode: {
    code: `def calculate_discount(price: float, discount: float | None = None) -> float:
    rate = discount if discount is not None else 0.10
    return round(price * (1 - rate), 2)

print("Default discount:", calculate_discount(100.0))
print("Custom discount:", calculate_discount(100.0, 0.25))`,
    expectedOutput: `Default discount: 90.0
Custom discount: 75.0`
  },
  lineByLine: [
    { line: 1, code: 'def calculate_discount(price: float, discount: float | None = None) -> float:', explanation: 'Uses Python 3.10+ union pipe syntax for optional float parameter.' },
    { line: 3, code: '    return round(price * (1 - rate), 2)', explanation: 'Returns annotated float value.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assuming type hints enforce types at runtime: `x: int = "string"` raising an error.',
      whyWrong: 'Python is still dynamically typed; assigning a string to an annotated int variable executes without runtime error.',
      howToFix: 'Run static type checkers like `mypy` in CI/CD pipelines to catch mismatches.'
    },
    {
      mistake: 'Importing `List`, `Dict`, `Tuple` from `typing` in modern Python 3.9+.',
      whyWrong: 'Deprecated by PEP 585; standard built-in types `list[int]`, `dict[str, int]` should be used directly.',
      howToFix: 'Use built-in generic collections: `list[T]`, `dict[K, V]`.'
    }
  ],
  realWorldApplications: [
    { title: 'FastAPI and Pydantic', description: 'Using type hints to automatically validate JSON request schemas and generate OpenAPI/Swagger docs.' },
    { title: 'Enterprise Refactoring', description: 'Enabling confident codebase-wide refactoring across millions of lines of Python at Instagram and Dropbox.' }
  ],
  practiceQuestions: [
    { question: 'Does CPython raise an error at runtime if you pass a string to a function expecting `int`?', hint: 'Static vs runtime checking.', answer: 'No, Python ignores type hints at runtime; only static analyzers (like mypy) flag errors.' },
    { question: 'What is the syntax for a union of `int` and `str` in Python 3.10+?', hint: 'Pipe operator.', answer: '`int | str`.' },
    { question: 'Where are function type annotations stored at runtime in Python?', hint: 'Dunder attribute.', answer: 'In the function\'s `__annotations__` dictionary.' }
  ],
  quiz: [
    {
      question: 'What is the purpose of `typing.TypeVar`?',
      options: ['To convert types at runtime', 'To define generic type parameters that preserve relationships across inputs and outputs', 'To declare environment variables', 'To disable dynamic typing'],
      correctAnswer: 1,
      explanation: '`TypeVar` allows writing generic functions/classes where type relationships are preserved.'
    },
    {
      question: 'Which tool is the industry-standard static type checker for Python?',
      options: ['pip', 'mypy', 'pytest', 'gunicorn'],
      correctAnswer: 1,
      explanation: '`mypy` is the canonical static type checker developed under Python steering council leadership.'
    },
    {
      question: 'What does `Callable[[int, int], bool]` annotate?',
      options: ['A tuple of two ints and a bool', 'A function that accepts two integers and returns a boolean', 'A boolean array', 'A class with three methods'],
      correctAnswer: 1,
      explanation: '`Callable[[ArgTypes...], ReturnType]` specifies the argument types and return type of a function.'
    }
  ],
  codingChallenge: {
    title: 'Generic Identity and Pair Swapper',
    difficulty: 'Intermediate',
    description: 'Using `typing.TypeVar`, write a generic function `swap_pair(pair: tuple[T, U]) -> tuple[U, T]` that takes a 2-tuple of arbitrary types `(first, second)` and returns `(second, first)`.',
    starterCode: `from typing import TypeVar

T = TypeVar('T')
U = TypeVar('U')

def swap_pair(pair: tuple[T, U]) -> tuple[U, T]:
    # Write your solution here
    pass`,
    hints: [
      'Unpack first, second = pair.',
      'Return (second, first).'
    ],
    solution: `from typing import TypeVar

T = TypeVar('T')
U = TypeVar('U')

def swap_pair(pair: tuple[T, U]) -> tuple[U, T]:
    return pair[1], pair[0]`,
    testCases: [
      { input: '(1, "apple")', expectedOutput: '("apple", 1)' }
    ]
  }
};

m8Lessons['py-advanced-dataclasses'] = {
  id: 'py-advanced-dataclasses',
  moduleId: 'python-module-8',
  title: 'Dataclasses',
  subtitle: '@dataclass, field(), Frozen Immutability, __post_init__, and asdict()',
  order: 5,
  readTimeMinutes: 22,
  difficulty: 'Intermediate',
  visualizerType: 'oop-diagram',
  objectives: [
    'Generate boilerplate methods automatically (`__init__`, `__repr__`, `__eq__`) using `@dataclass`.',
    'Configure attributes using `field(default_factory=...)` to avoid shared mutable defaults.',
    'Create immutable, hashable records using `@dataclass(frozen=True)`.',
    'Perform post-initialization validation and attribute derivation with `__post_init__()`.'
  ],
  prerequisites: ['Python OOP, constructors, and type hints.'],
  analogy: {
    title: 'The Prefabricated Luxury Apartment',
    text: 'Writing a traditional Python class for data storage is like hand-pouring the concrete, tiling the bathroom, and wiring the fuse box yourself (`__init__`, `__repr__`, `__eq__`, `__hash__`). A `@dataclass` is a prefabricated modular home: you specify the room names and dimensions (annotated fields), and the factory cranes install plumbing, electrical, and doors automatically.',
    metaphor: '@dataclass generates standard object-oriented boilerplate code automatically.'
  },
  problemSolved: {
    title: 'Eliminating Repetitive Class Boilerplate for Data-Holding Objects',
    description: 'Writing 20 lines of repetitive `self.x = x`, `def __repr__`, and `def __eq__` for every domain entity causes fatigue and typos. Dataclasses generate clean, efficient implementations at class creation time.',
    keyPoints: [
      'Dataclasses use type annotations to identify fields.',
      'Never use mutable objects as defaults: use `field(default_factory=list)`.',
      '`frozen=True` makes instances immutable and hashable.',
      '`dataclasses.asdict(obj)` converts instances to nested dictionaries.'
    ]
  },
  intuition: {
    overview: 'The `@dataclass` decorator inspects the class\'s `__annotations__`, dynamically writes code strings for `__init__`, `__repr__`, and `__eq__`, and compiles them onto the class.',
    steps: [
      { step: 1, title: 'Field Discovery', description: 'Reads class attributes that have type annotations.' },
      { step: 2, title: 'Method Generation', description: 'Generates Python code for __init__, __repr__, and __eq__ matching fields.' },
      { step: 3, title: 'Compilation', description: 'Attaches compiled functions to the class namespace.' }
    ]
  },
  codeExample: {
    title: 'Production Dataclass with Validation and default_factory',
    code: `from dataclasses import dataclass, field, asdict

@dataclass(frozen=True)
class Customer:
    id: int
    name: str
    email: str
    roles: tuple[str, ...] = ("user",)  # Immutable tuple default

@dataclass
class Order:
    order_id: str
    customer: Customer
    items: list[str] = field(default_factory=list)  # Safe mutable default
    discount: float = 0.0
    total: float = field(init=False)  # Computed in __post_init__

    def __post_init__(self):
        # Validate and derive attributes
        if self.discount < 0:
            raise ValueError("Discount cannot be negative")
        self.total = len(self.items) * 20.0 * (1 - self.discount)

c = Customer(1, "Alex", "alex@example.com")
order = Order("ORD-001", c, items=["Widget", "Gadget"])
print("Order Repr:", order)
print("Order as dict:", asdict(order))`,
    explanation: 'Demonstrates frozen dataclass, default_factory, init=False, __post_init__, and asdict().'
  },
  runnableCode: {
    code: `from dataclasses import dataclass

@dataclass
class Point3D:
    x: float
    y: float
    z: float = 0.0

p1 = Point3D(1.0, 2.0)
p2 = Point3D(1.0, 2.0, 0.0)
print("Are points equal?", p1 == p2)
print("Generated repr:", p1)`,
    expectedOutput: `Are points equal? True
Generated repr: Point3D(x=1.0, y=2.0, z=0.0)`
  },
  lineByLine: [
    { line: 3, code: '@dataclass', explanation: 'Applies dataclass decorator to synthesize dunder methods.' },
    { line: 5, code: '    x: float', explanation: 'Declares field x with type float.' },
    { line: 7, code: '    z: float = 0.0', explanation: 'Declares field z with default value 0.0.' },
    { line: 11, code: 'print("Are points equal?", p1 == p2)', explanation: 'Demonstrates synthesized __eq__ comparing all fields.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using a mutable default directly: `items: list = []` inside a dataclass.',
      whyWrong: 'Raises `ValueError: mutable default <class \'list\'> for field items is not allowed: use default_factory`.',
      howToFix: 'Use `field(default_factory=list)`.'
    },
    {
      mistake: 'Declaring a field without a type annotation: `name = "Alice"`.',
      whyWrong: 'Dataclasses ignore unannotated attributes, treating them as regular class attributes rather than instance fields.',
      howToFix: 'Always include a type annotation: `name: str = "Alice"`.'
    }
  ],
  realWorldApplications: [
    { title: 'Configuration Management', description: 'Holding typed, validated application configs parsed from YAML or environment.' },
    { title: 'API Data Transfer Objects (DTOs)', description: 'Passing structured records between service layers without dictionary key typos.' }
  ],
  practiceQuestions: [
    { question: 'How do you create an immutable dataclass in Python?', hint: 'Decorator argument.', answer: 'Using `@dataclass(frozen=True)`.' },
    { question: 'What special method is called immediately after `__init__` in a dataclass?', hint: 'Post initialization hook.', answer: 'The `__post_init__(self)` method.' },
    { question: 'How do you convert a dataclass instance into a standard Python dictionary?', hint: 'Dataclasses module helper.', answer: 'Using `dataclasses.asdict(instance)`.' }
  ],
  quiz: [
    {
      question: 'What happens if you try to modify an attribute on a `@dataclass(frozen=True)` instance?',
      options: ['It silently ignores the change', 'Raises FrozenInstanceError (subclass of AttributeError)', 'The object is re-cloned', 'ValueError is raised'],
      correctAnswer: 1,
      explanation: 'Frozen dataclasses prevent attribute reassignment, raising `dataclasses.FrozenInstanceError`.'
    },
    {
      question: 'Which parameter in `field()` specifies a callable to generate new instances of a mutable default?',
      options: ['factory', 'default_factory', 'generator', 'init_func'],
      correctAnswer: 1,
      explanation: '`default_factory` accepts a callable (like `list`, `dict`, `set`) that is invoked for each new instance.'
    },
    {
      question: 'Do dataclasses require type annotations on fields?',
      options: ['No, type annotations are optional', 'Yes, dataclasses only detect fields that have type annotations', 'Only on numbers', 'Only on strings'],
      correctAnswer: 1,
      explanation: 'The dataclass decorator inspects `__annotations__` exclusively to determine which attributes are fields.'
    }
  ],
  codingChallenge: {
    title: 'Inventory Item Dataclass',
    difficulty: 'Intermediate',
    description: 'Create a `@dataclass` `InventoryItem` with fields `sku: str`, `price: float`, `quantity: int = 0`, and `tags: list[str] = field(default_factory=list)`. Add a method `total_value() -> float` that returns `round(self.price * self.quantity, 2)`.',
    starterCode: `from dataclasses import dataclass, field

# Write your solution here`,
    hints: [
      'Use @dataclass decorator.',
      'tags: list[str] = field(default_factory=list).',
      'Provide total_value method returning round(price * quantity, 2).'
    ],
    solution: `from dataclasses import dataclass, field

@dataclass
class InventoryItem:
    sku: str
    price: float
    quantity: int = 0
    tags: list[str] = field(default_factory=list)
    
    def total_value(self) -> float:
        return round(self.price * self.quantity, 2)`,
    testCases: [
      { input: 'item = InventoryItem("SKU123", 14.50, 4); item.total_value()', expectedOutput: '58.0' }
    ]
  }
};

m8Lessons['py-advanced-abc'] = {
  id: 'py-advanced-abc',
  moduleId: 'python-module-8',
  title: 'Abstract Base Classes',
  subtitle: 'collections.abc Interfaces, Virtual Subclasses via register(), and Structural Protocols',
  order: 6,
  readTimeMinutes: 22,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Use built-in abstract interfaces from `collections.abc` (Iterable, Sequence, Mapping).',
    'Register virtual subclasses without inheritance using `ABCMeta.register()`.',
    'Understand `__subclasshook__` for customized `issubclass()` checks.',
    'Compare nominal subtyping (ABCs) with structural subtyping (`typing.Protocol`).'
  ],
  prerequisites: ['Python OOP, inheritance, and abstract classes basics.'],
  analogy: {
    title: 'The International Diplomatic Passport vs DNA Test',
    text: 'Inheriting from a class is a biological DNA test: you are a child because of genetic lineage. A virtual subclass registered via `ABC.register()` is an honorary diplomatic passport granted by the embassy: you don\'t share the genetic bloodline, but all border agents (`isinstance`, `issubclass`) treat you with full diplomatic status.',
    metaphor: 'Virtual subclasses satisfy type checks without inheriting implementation code.'
  },
  problemSolved: {
    title: 'Unifying Custom Classes with Built-In Container Protocols',
    description: 'When third-party libraries create custom dictionaries or streams, they might not inherit from `collections.abc.Mapping`. Virtual subclasses allow registering them so standard functions recognize them as mappings.',
    keyPoints: [
      '`collections.abc` provides standard interfaces: `Iterable`, `Iterator`, `Sequence`, `Mapping`, `MutableMapping`.',
      '`BaseABC.register(MyClass)` makes `isinstance(MyClass(), BaseABC)` return `True` without inheritance.',
      '`__subclasshook__` allows classes to dynamically claim subclasses based on method presence.'
    ]
  },
  intuition: {
    overview: 'Python\'s `ABCMeta` metaclass maintains a registry of virtual subclasses and executes `__subclasshook__` during `isinstance` and `issubclass` checks.',
    steps: [
      { step: 1, title: 'Interface Design', description: 'Define ABC with __subclasshook__ or register method.' },
      { step: 2, title: 'Registration', description: 'Call ABC.register(TargetClass) or implement required methods.' },
      { step: 3, title: 'Dispatch', description: 'isinstance(target, ABC) checks registry and subclass hook dynamically.' }
    ]
  },
  codeExample: {
    title: 'Using collections.abc and Custom __subclasshook__',
    code: `from collections.abc import Mapping
from abc import ABC, abstractmethod

# Checking built-in interfaces
print("Is dict a Mapping?", issubclass(dict, Mapping)) # True

# Dynamic structural interface using __subclasshook__
class Sized(ABC):
    @classmethod
    def __subclasshook__(cls, subclass):
        # Any class with __len__ is automatically considered a Sized subclass!
        if any("__len__" in B.__dict__ for B in subclass.__mro__):
            return True
        return NotImplemented

class CustomContainer:
    def __len__(self):
        return 42

c = CustomContainer()
print("Is CustomContainer an instance of Sized?", isinstance(c, Sized)) # True!`,
    explanation: 'Demonstrates collections.abc inspection and implementing a custom __subclasshook__ for duck-typed ABC matching.'
  },
  runnableCode: {
    code: `from abc import ABC

class Greeter(ABC):
    pass

class ForeignGreeter:
    def greet(self): return "Bonjour"

# Register virtual subclass without inheritance!
Greeter.register(ForeignGreeter)

f = ForeignGreeter()
print("Is instance of Greeter?", isinstance(f, Greeter))
print("Is subclass of Greeter?", issubclass(ForeignGreeter, Greeter))`,
    expectedOutput: `Is instance of Greeter? True
Is subclass of Greeter? True`
  },
  lineByLine: [
    { line: 9, code: 'Greeter.register(ForeignGreeter)', explanation: 'Registers ForeignGreeter as a virtual subclass of Greeter.' },
    { line: 12, code: 'print("Is instance of Greeter?", isinstance(f, Greeter))', explanation: 'Returns True without any actual code inheritance.' }
  ],
  commonMistakes: [
    {
      mistake: 'Assuming virtual subclasses inherit methods from the ABC.',
      whyWrong: 'Virtual subclasses registered via `.register()` inherit ZERO code or attributes; only `isinstance` and `issubclass` are affected.',
      howToFix: 'If you need implementation code reuse, use standard inheritance.'
    },
    {
      mistake: 'Returning `False` from `__subclasshook__` instead of `NotImplemented`.',
      whyWrong: 'Returning `False` explicitly forbids subclasses; returning `NotImplemented` allows fallback checks in MRO.',
      howToFix: 'Return `NotImplemented` if condition is not met.'
    }
  ],
  realWorldApplications: [
    { title: 'Data Science Vector Checking', description: 'Checking `isinstance(data, collections.abc.Sequence)` to support both lists and NumPy arrays.' },
    { title: 'Mocking in Test Suites', description: 'Registering lightweight test double mocks as virtual subclasses of heavy services.' }
  ],
  practiceQuestions: [
    { question: 'Where are standard container abstract base classes located in the Python standard library?', hint: 'Module in collections.', answer: '`collections.abc`.' },
    { question: 'What does `ABC.register(Class)` do?', hint: 'Virtual subclass registration.', answer: 'It registers `Class` as a virtual subclass of the ABC so `issubclass(Class, ABC)` returns `True` without actual inheritance.' },
    { question: 'What method allows an ABC to customize `issubclass` checks based on method presence?', hint: 'Special classmethod hook.', answer: 'The `__subclasshook__(cls, subclass)` classmethod.' }
  ],
  quiz: [
    {
      question: 'Do virtual subclasses registered with `MyABC.register(Target)` inherit methods from `MyABC`?',
      options: ['Yes, all methods', 'Only abstract methods', 'No, registration does not provide implementation inheritance', 'Only __init__'],
      correctAnswer: 2,
      explanation: 'Registration only affects `isinstance` and `issubclass` type checks; no implementation code is shared.'
    },
    {
      question: 'Which class in `collections.abc` requires both `__len__` and `__getitem__`?',
      options: ['Iterable', 'Sequence', 'Callable', 'Iterator'],
      correctAnswer: 1,
      explanation: 'A `Sequence` requires `__len__` and `__getitem__`.'
    },
    {
      question: 'What should `__subclasshook__` return if it cannot decide whether a class is a subclass?',
      options: ['False', 'None', 'NotImplemented', 'TypeError'],
      correctAnswer: 2,
      explanation: 'Returning `NotImplemented` allows Python to continue standard mechanism checks.'
    }
  ],
  codingChallenge: {
    title: 'Custom Iterable Subclasshook',
    difficulty: 'Advanced',
    description: 'Create an abstract class `HasYield` with a `__subclasshook__(cls, subclass)` that returns `True` if `"produce"` exists anywhere in `subclass.__mro__`, and `NotImplemented` otherwise. Verify that an unrelated class implementing `def produce(self): pass` returns `True` for `issubclass(Target, HasYield)`.',
    starterCode: `from abc import ABC

class HasYield(ABC):
    # Write your solution here
    pass`,
    hints: [
      'In __subclasshook__(cls, subclass): check any("produce" in B.__dict__ for B in subclass.__mro__).',
      'Return True if found, else NotImplemented.'
    ],
    solution: `from abc import ABC

class HasYield(ABC):
    @classmethod
    def __subclasshook__(cls, subclass):
        if any("produce" in B.__dict__ for B in subclass.__mro__):
            return True
        return NotImplemented`,
    testCases: [
      { input: 'class Worker: def produce(self): pass; issubclass(Worker, HasYield)', expectedOutput: 'True' }
    ]
  }
};

m8Lessons['py-advanced-functional'] = {
  id: 'py-advanced-functional',
  moduleId: 'python-module-8',
  title: 'Functional Programming Concepts',
  subtitle: 'Pure Functions, Immutability, Currying, Function Composition, and Monadic Flow',
  order: 7,
  readTimeMinutes: 25,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Write pure functions without side effects and understand referential transparency.',
    'Implement function composition: chaining mathematical transformations cleanly.',
    'Understand Currying: converting multi-argument functions into sequences of single-argument functions.',
    'Implement the Maybe / Result pattern for elegant, exception-free error handling.'
  ],
  prerequisites: ['Higher-order functions, lambdas, and closures.'],
  analogy: {
    title: 'The Mathematical Calculator vs The Shared Chalkboard',
    text: 'Imperative programming is like people scribbling on a shared chalkboard: one person writes `x = 5`, another erases it, and a third draws an arrow. In functional programming, every operation is a pure pocket calculator: `sqrt(16)` always outputs `4`. It doesn\'t alter the battery level, doesn\'t change your coffee cup, and produces identical output every single time.',
    metaphor: 'Pure functions produce outputs solely from inputs without mutating external state.'
  },
  problemSolved: {
    title: 'Eliminating Race Conditions, Side Effects, and Mutable State Bugs',
    description: 'Mutable shared state is the leading cause of concurrent race conditions and difficult-to-reproduce bugs. Functional programming patterns make code deterministic, easily parallelizable, and trivial to unit test.',
    keyPoints: [
      'A pure function has two properties: 1. Same input ALWAYS produces same output; 2. No side effects (no I/O, no mutation).',
      'Function composition creates pipelines: `f(g(x))`.',
      'Currying transforms `f(a, b)` into `f(a)(b)`.'
    ]
  },
  intuition: {
    overview: 'Functional programming treats computation as the evaluation of mathematical functions, avoiding state changes and mutable data.',
    steps: [
      { step: 1, title: 'Immutability', description: 'Data structures are treated as read-only snapshots.' },
      { step: 2, title: 'Purity', description: 'Functions compute new values rather than mutating incoming arguments.' },
      { step: 3, title: 'Composition', description: 'Simple functions compose into high-level pipelines.' }
    ]
  },
  codeExample: {
    title: 'Currying, Function Composition, and Pure Transforms',
    code: `from functools import reduce

# Pure functions
def sanitize(s: str) -> str:
    return s.strip().lower()

def remove_punctuation(s: str) -> str:
    return "".join(c for c in s if c.isalnum() or c.isspace())

# Compose multiple functions: compose(f, g)(x) = f(g(x))
def compose(*functions):
    return reduce(lambda f, g: lambda x: f(g(x)), functions)

clean_pipeline = compose(remove_punctuation, sanitize)
print("Cleaned:", clean_pipeline("  Hello, World! 2026...  "))

# Currying implementation
def curry2(fn):
    """Curries a 2-argument function."""
    return lambda a: lambda b: fn(a, b)

add = lambda a, b: a + b
curried_add = curry2(add)
add_five = curried_add(5)
print("Curried 5 + 10:", add_five(10))`,
    explanation: 'Demonstrates pure functions, composable functional pipelines using reduce, and currying.'
  },
  runnableCode: {
    code: `# Maybe monad pattern for safe chaining without None checks
class Maybe:
    def __init__(self, value):
        self.value = value

    def bind(self, func):
        if self.value is None:
            return Maybe(None)
        return Maybe(func(self.value))

    def get_or_else(self, default):
        return self.value if self.value is not None else default

# Safe pipeline handling missing data
res1 = Maybe("42").bind(int).bind(lambda x: x * 2).get_or_else(0)
res2 = Maybe(None).bind(int).bind(lambda x: x * 2).get_or_else(0)
print("Valid pipeline result:", res1)
print("None pipeline fallback:", res2)`,
    expectedOutput: `Valid pipeline result: 84
None pipeline fallback: 0`
  },
  lineByLine: [
    { line: 6, code: '    def bind(self, func):', explanation: 'If value is None, short-circuits; otherwise applies function.' },
    { line: 14, code: 'res1 = Maybe("42").bind(int)...', explanation: 'Chains operations without nested if-else statements.' }
  ],
  commonMistakes: [
    {
      mistake: 'Mutating an input list inside a supposedly pure function: `def add_elem(lst, x): lst.append(x); return lst`.',
      whyWrong: 'Mutates caller\'s list in-place, introducing unpredictable side effects.',
      howToFix: 'Return a new list: `return lst + [x]` or `[*lst, x]`.'
    },
    {
      mistake: 'Writing overly complex nested lambda compositions in Python.',
      whyWrong: 'Hurts readability and produces unhelpful tracebacks.',
      howToFix: 'Balance functional idioms with Pythonic readability.'
    }
  ],
  realWorldApplications: [
    { title: 'Concurrent Data Pipelines', description: 'Spark and PySpark map-reduce transformations executed across distributed worker nodes.' },
    { title: 'Redux-Style State Reducers', description: 'Predictable state management in UI applications using pure reducer functions.' }
  ],
  practiceQuestions: [
    { question: 'What defines a "pure function"?', hint: 'Two key properties.', answer: '1. It always produces the same output for the same input; 2. It causes zero observable side effects.' },
    { question: 'What is "currying" in functional programming?', hint: 'Transforming argument structures.', answer: 'Translating a function that takes multiple arguments into a chain of functions that each take a single argument.' },
    { question: 'What is referential transparency?', hint: 'Replacing expressions with values.', answer: 'An expression is referentially transparent if it can be replaced with its corresponding value without changing the program\'s behavior.' }
  ],
  quiz: [
    {
      question: 'Which of the following functions is PURE?',
      options: ['def f(): return random.random()', 'def f(x): print(x); return x', 'def f(x, y): return x + y', 'def f(x): global_total += x; return global_total'],
      correctAnswer: 2,
      explanation: '`f(x, y): return x + y` depends only on its inputs and causes zero side effects.'
    },
    {
      question: 'What is the mathematical definition of function composition `(f ∘ g)(x)`?',
      options: ['f(x) * g(x)', 'f(g(x))', 'g(f(x))', 'f(x) + g(x)'],
      correctAnswer: 1,
      explanation: 'Function composition `f ∘ g` evaluates to `f(g(x))`.'
    },
    {
      question: 'Why are pure functions naturally thread-safe?',
      options: ['They acquire the Python GIL', 'They do not read or write shared mutable memory, eliminating race conditions', 'They compile to C threads', 'They run on separate CPU cores'],
      correctAnswer: 1,
      explanation: 'Without shared mutable state, threads cannot interfere with each other\'s calculations.'
    }
  ],
  codingChallenge: {
    title: 'Build Pure Pipe Function',
    difficulty: 'Advanced',
    description: 'Write a function `pipe(initial_value, *functions)` that passes `initial_value` through a sequence of functions from left to right: `pipe(val, f, g, h) = h(g(f(val)))`. If no functions are provided, return `initial_value`.',
    starterCode: `def pipe(initial_value, *functions):
    # Write your solution here
    pass`,
    hints: [
      'Initialize result = initial_value.',
      'Iterate for fn in functions: result = fn(result).',
      'Return result.'
    ],
    solution: `def pipe(initial_value, *functions):
    result = initial_value
    for fn in functions:
        result = fn(result)
    return result`,
    testCases: [
      { input: 'pipe(5, lambda x: x * 2, lambda x: x + 1, str)', expectedOutput: '"11"' }
    ]
  }
};

m8Lessons['py-advanced-regex'] = {
  id: 'py-advanced-regex',
  moduleId: 'python-module-8',
  title: 'Regular Expressions',
  subtitle: 're Module, Precompiled Patterns, Named Capture Groups, and Lookarounds',
  order: 8,
  readTimeMinutes: 28,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Master pattern matching using Python\'s built-in `re` module.',
    'Distinguish between `re.match()`, `re.search()`, `re.findall()`, and `re.finditer()`.',
    'Extract structured substrings using named capture groups `(?P<name>pattern)`.',
    'Precompile expensive regular expressions with `re.compile()` for high-throughput loops.'
  ],
  prerequisites: ['Python strings and slicing.'],
  analogy: {
    title: 'The Metal Detector with Custom Frequency Tuning',
    text: 'A simple string method like `.find("word")` is a metal detector that only rings for copper pennies. Regular expressions are a military-grade ground-penetrating radar: you can program it to ring only for "three capital letters followed by a hyphen and four numbers" or "an email containing an @ symbol with a valid domain".',
    metaphor: 'Regular expressions define formal grammar patterns for text search and extraction.'
  },
  problemSolved: {
    title: 'Complex Text Extraction and Validation',
    description: 'Validating emails, phone numbers, log formats, and parsing HTML/markdown using basic string methods requires hundreds of lines of fragile loops. Regular expressions condense pattern matching into declarative rules.',
    keyPoints: [
      '`re.match()` checks only at the START of the string; `re.search()` searches anywhere.',
      'Always use raw strings `r"\\d+"` to prevent Python from escaping backslashes.',
      '`(?P<name>pattern)` creates named capture groups accessible via `match.group("name")`.',
      '`re.compile()` precompiles regular expression ASTs for repeated matching.'
    ]
  },
  intuition: {
    overview: 'The `re` engine parses the pattern string into an internal byte-code machine that walks the input text character by character with backtracking.',
    steps: [
      { step: 1, title: 'Compile', description: 're.compile parses pattern string into an internal RegexObject.' },
      { step: 2, title: 'Match / Search', description: 'Executes regex automaton against input text, producing a Match object.' },
      { step: 3, title: 'Extraction', description: 'Extracts captured substring groups or replaces matches via re.sub.' }
    ]
  },
  codeExample: {
    title: 'Named Capture Groups and re.compile',
    code: `import re

# Raw string r"..." prevents Python backslash escape issues
LOG_PATTERN = re.compile(
    r"\\[(?P<timestamp>[^\\]]+)\\] (?P<level>INFO|WARN|ERROR): (?P<message>.*)"
)

log_line = "[2026-10-18 10:00:00] ERROR: Database connection lost on port 5432"

match = LOG_PATTERN.match(log_line)
if match:
    data = match.groupdict()
    print("Parsed log dict:", data)
    print("Extracted level:", match.group("level"))`,
    explanation: 'Demonstrates compiling a regex pattern, named capture groups (?P<name>), and match.groupdict().'
  },
  runnableCode: {
    code: `import re

text = "Contact us at support@example.com or sales@shop.org for help."
email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"

# findall extracts all matching substrings
emails = re.findall(email_pattern, text)
print("Extracted emails:", emails)

# re.sub replaces matches
censored = re.sub(email_pattern, "[REDACTED]", text)
print("Censored text:", censored)`,
    expectedOutput: `Extracted emails: ['support@example.com', 'sales@shop.org']
Censored text: Contact us at [REDACTED] or [REDACTED] for help.`
  },
  lineByLine: [
    { line: 7, code: 'emails = re.findall(email_pattern, text)', explanation: 'Finds all non-overlapping matches returning list of string matches.' },
    { line: 11, code: 'censored = re.sub(email_pattern, "[REDACTED]", text)', explanation: 'Substitutes all pattern occurrences with replacement string.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `re.match()` when you intended `re.search()`.',
      whyWrong: '`re.match()` only checks if the pattern matches at the VERY BEGINNING (index 0) of the string.',
      howToFix: 'Use `re.search()` if the pattern can appear anywhere within the string.'
    },
    {
      mistake: 'Omitting the `r` prefix on regex strings: `"\\d+"` instead of `r"\\d+"`.',
      whyWrong: 'Python standard string escape sequences can mangle regex escape tokens (e.g. `\\b` word boundary becomes ASCII backspace 0x08).',
      howToFix: 'Always declare regex patterns using raw strings: `r"pattern"`.'
    }
  ],
  realWorldApplications: [
    { title: 'Form Validation', description: 'Validating international phone numbers, passwords, and postal codes.' },
    { title: 'Log Ingestion Parsers', description: 'Parsing unstructured syslog, Apache, and Nginx logs into structured database records.' }
  ],
  practiceQuestions: [
    { question: 'Why should regex patterns always use raw string literals `r"..."` in Python?', hint: 'Backslash escaping.', answer: 'To prevent Python\'s string parser from interpreting backslashes as string escape sequences before the regex engine receives them.' },
    { question: 'What is the difference between `re.match()` and `re.search()`?', hint: 'Starting position.', answer: '`re.match()` matches only at the beginning of the string; `re.search()` searches for a match anywhere in the string.' },
    { question: 'How do you access named capture groups from a `Match` object as a dictionary?', hint: 'Method name.', answer: 'Using `match.groupdict()`.' }
  ],
  quiz: [
    {
      question: 'What does `re.findall(r"\\d+", "abc123xyz456")` return?',
      options: ['["123", "456"]', '["123456"]', 'MatchObject', '123'],
      correctAnswer: 0,
      explanation: '`re.findall` returns a list of all matching string occurrences.'
    },
    {
      question: 'What is the syntax for defining a named capture group in Python regex?',
      options: ['(?<name>pattern)', '(?P<name>pattern)', '(:name:pattern)', '(?#name:pattern)'],
      correctAnswer: 1,
      explanation: 'Python uses the `(?P<name>pattern)` syntax for named capture groups.'
    },
    {
      question: 'When should `re.compile()` be preferred over calling `re.search()` directly?',
      options: ['Always, it is mandatory', 'When the same regular expression pattern is executed repeatedly in a loop or high-frequency function', 'Only for unicode strings', 'Never'],
      correctAnswer: 1,
      explanation: 'Precompiling patterns avoids reparsing and recompiling the regex AST on every iteration.'
    }
  ],
  codingChallenge: {
    title: 'Extract Hashtags from Tweet',
    difficulty: 'Intermediate',
    description: 'Write a function `extract_hashtags(tweet: str) -> list[str]` that extracts all valid hashtags (words starting with `#` followed by one or more alphanumeric characters or underscores, e.g. `#Python_3`). Return them as a lowercase list without the `#` symbol.',
    starterCode: `import re

def extract_hashtags(tweet: str) -> list[str]:
    # Write your solution here
    pass`,
    hints: [
      'Use regex pattern r"#([\\w]+)".',
      're.findall with capturing group returns the group contents.',
      'Lowercase extracted tokens: [h.lower() for h in matches].'
    ],
    solution: `import re

def extract_hashtags(tweet: str) -> list[str]:
    matches = re.findall(r"#(\\w+)", tweet)
    return [m.lower() for m in matches]`,
    testCases: [
      { input: '"Learning #Python and #Machine_Learning with #AI!"', expectedOutput: '["python", "machine_learning", "ai"]' }
    ]
  }
};

m8Lessons['py-advanced-collections'] = {
  id: 'py-advanced-collections',
  moduleId: 'python-module-8',
  title: 'collections and itertools',
  subtitle: 'deque, Counter, defaultdict, ChainMap, and itertools Pipelines',
  order: 9,
  readTimeMinutes: 28,
  difficulty: 'Intermediate',
  visualizerType: 'none',
  objectives: [
    'Use collections.deque for high-performance O(1) double-ended queue operations.',
    'Use collections.Counter for mathematical multi-set arithmetic and tallying.',
    'Use collections.ChainMap for layered configuration scopes (defaults -> env -> cli).',
    'Combine collections with itertools for clean algorithmic data processing.'
  ],
  prerequisites: ['Python collections basics and loops.'],
  analogy: {
    title: 'The Industrial Specialized Tool Chest',
    text: 'A standard list and dict are a basic hammer and screwdriver: they get simple jobs done. `collections` and `itertools` are the master mechanic\'s rollaway chest: double-headed hydraulic wrenches (`deque`), automatic hardware sorting bins (`Counter`), and conveyor belt couplers (`itertools.chain`).',
    metaphor: 'collections and itertools provide high-performance specialized container algorithms.'
  },
  problemSolved: {
    title: 'Eliminating O(N) List Inefficiencies and Complex Combinatorics',
    description: 'Using `list.insert(0, x)` or `list.pop(0)` takes O(N) time, dragging down queue algorithms. `collections.deque` provides O(1) appends and pops at both ends. `Counter` provides multi-set math.',
    keyPoints: [
      '`collections.deque` implements a doubly-linked list of blocks for O(1) appends and pops on both sides.',
      '`Counter` supports arithmetic operators: `c1 + c2`, `c1 - c2`, `c1 & c2`.',
      '`collections.ChainMap` searches through multiple dictionaries in sequence without merging them into a new copy.'
    ]
  },
  intuition: {
    overview: 'These specialized standard library modules are implemented in C for memory efficiency and optimal asymptotic time complexity.',
    steps: [
      { step: 1, title: 'Selection', description: 'Choose deque for FIFO/LIFO queues, Counter for multiset tallies, ChainMap for hierarchical configs.' },
      { step: 2, title: 'Execution', description: 'Perform operations with guaranteed asymptotic speed.' },
      { step: 3, title: 'Chaining', description: 'Pipe into itertools for lazy consumption.' }
    ]
  },
  codeExample: {
    title: 'deque Sliding Window and ChainMap Scopes',
    code: `from collections import deque, ChainMap, Counter

# O(1) Bounded buffer with deque
recent_events = deque(maxlen=3)
for i in range(5):
    recent_events.append(f"event_{i}")
print("Bounded buffer (last 3 items):", list(recent_events))

# ChainMap for configuration overrides
defaults = {"theme": "light", "port": 8080}
env_vars = {"theme": "dark"}
cli_args = {"port": 9000}

# Scoped lookup: CLI overrides Env, which overrides Defaults
config = ChainMap(cli_args, env_vars, defaults)
print("Effective theme:", config["theme"]) # "dark" from env_vars
print("Effective port:", config["port"])   # 9000 from cli_args

# Counter multiset arithmetic
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)
print("Counter addition:", c1 + c2) # Counter({'a': 4, 'b': 3})`,
    explanation: 'Demonstrates bounded deque buffers, multi-layered config resolution with ChainMap, and Counter math.'
  },
  runnableCode: {
    code: `from collections import deque

dq = deque([1, 2, 3])
dq.appendleft(0)  # O(1) left append!
dq.append(4)      # O(1) right append!
print("Deque after appends:", list(dq))

left_val = dq.popleft() # O(1) left pop!
print(f"Popped left: {left_val}, remaining: {list(dq)}")`,
    expectedOutput: `Deque after appends: [0, 1, 2, 3, 4]
Popped left: 0, remaining: [1, 2, 3, 4]`
  },
  lineByLine: [
    { line: 4, code: 'dq.appendleft(0)', explanation: 'Pushes 0 to the front in O(1) time.' },
    { line: 5, code: 'dq.append(4)', explanation: 'Pushes 4 to the back in O(1) time.' },
    { line: 8, code: 'left_val = dq.popleft()', explanation: 'Pops 0 from the front in O(1) time without shifting elements.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using a standard list as a queue: `q.pop(0)`.',
      whyWrong: 'Every `pop(0)` on a standard list forces all N remaining elements to shift left in memory (O(N) time).',
      howToFix: 'Use `collections.deque` and `dq.popleft()` for O(1) performance.'
    },
    {
      mistake: 'Merging dictionaries with `.update()` when layered dynamic scoping is needed.',
      whyWrong: 'Overwrites values and creates a detached third dictionary copy.',
      howToFix: 'Use `collections.ChainMap` to dynamically chain views without copying.'
    }
  ],
  realWorldApplications: [
    { title: 'Breadth-First Search (BFS)', description: 'Using `deque` for the BFS node discovery queue.' },
    { title: 'Configuration Hierarchies', description: 'CLI tools resolving options across system config, user config, and command line flags.' }
  ],
  practiceQuestions: [
    { question: 'What is the time complexity of `deque.popleft()` vs `list.pop(0)`?', hint: 'Asymptotic complexity.', answer: '`deque.popleft()` is O(1); `list.pop(0)` is O(N).' },
    { question: 'What does `ChainMap(a, b)["key"]` return if `"key"` exists in both `a` and `b`?', hint: 'Search order.', answer: 'It returns the value from `a` (the first mapping in the chain).' },
    { question: 'What happens when you append to a `deque(maxlen=3)` that already contains 3 items?', hint: 'Bounded behavior.', answer: 'It automatically discards the opposite end element to maintain maximum length 3.' }
  ],
  quiz: [
    {
      question: 'Which collection should you use for an efficient double-ended queue?',
      options: ['list', 'collections.deque', 'queue.LifoQueue', 'collections.OrderedDict'],
      correctAnswer: 1,
      explanation: '`collections.deque` provides O(1) pushes and pops from both ends.'
    },
    {
      question: 'What does `collections.Counter("banana")["a"]` evaluate to?',
      options: ['1', '2', '3', 'KeyError'],
      correctAnswer: 2,
      explanation: 'The letter "a" appears 3 times in "banana".'
    },
    {
      question: 'What happens when accessing a missing key in a `collections.Counter`?',
      options: ['Raises KeyError', 'Returns 0', 'Returns None', 'Inserts key with 0'],
      correctAnswer: 1,
      explanation: '`Counter` returns 0 for missing keys instead of raising `KeyError`.'
    }
  ],
  codingChallenge: {
    title: 'Top K Frequent Elements',
    difficulty: 'Intermediate',
    description: 'Write a function `top_k_frequent(nums: list[int], k: int) -> list[int]` that uses `collections.Counter` to find the `k` most frequent numbers in `nums`, returning them sorted by frequency descending.',
    starterCode: `from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    # Write your solution here
    pass`,
    hints: [
      'Use counts = Counter(nums).',
      'Use counts.most_common(k).',
      'Extract number from (num, count) tuples: [item[0] for item in counts.most_common(k)].'
    ],
    solution: `from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    counts = Counter(nums)
    return [val for val, _ in counts.most_common(k)]`,
    testCases: [
      { input: '[1, 1, 1, 2, 2, 3], 2', expectedOutput: '[1, 2]' }
    ]
  }
};

m8Lessons['py-advanced-profiling'] = {
  id: 'py-advanced-profiling',
  moduleId: 'python-module-8',
  title: 'Time and Memory Profiling',
  subtitle: 'timeit, cProfile, pstats, and Eliminating Python Bottlenecks',
  order: 10,
  readTimeMinutes: 25,
  difficulty: 'Advanced',
  visualizerType: 'none',
  objectives: [
    'Measure micro-benchmarks accurately using standard library `timeit`.',
    'Profile full applications and identify CPU bottlenecks using `cProfile` and `pstats`.',
    'Understand cumulative time (cumtime) vs internal time (tottime) in profile reports.',
    'Follow Donald Knuth\'s golden rule: "Premature optimization is the root of all evil" — measure before optimizing.'
  ],
  prerequisites: ['Python functions, classes, and algorithmic complexity.'],
  analogy: {
    title: 'The Highway Traffic Helicopter and Stopwatch',
    text: 'Guessing where code is slow is like a driver assuming the highway delay is at the toll booth. Profiling with `cProfile` is the traffic helicopter hovering above the entire metropolitan area: it points its camera at every single interchange, measuring exact cars-per-second, and reveals that 92% of the delay is actually at a single bottleneck bridge on ramp 4.',
    metaphor: 'Profilers replace guesswork with deterministic runtime telemetry.'
  },
  problemSolved: {
    title: 'Identifying Real Performance Bottlenecks with Scientific Accuracy',
    description: 'Developers frequently spend hours optimizing functions that only account for 1% of runtime while ignoring the single function consuming 90% of execution time. Profilers direct optimization efforts where they have maximum impact.',
    keyPoints: [
      '`timeit` disables garbage collection during runs to measure raw algorithmic execution time.',
      '`cProfile` has negligible overhead and records call counts, total time, and cumulative time.',
      '`tottime` is time spent inside the function excluding sub-calls; `cumtime` includes all sub-calls.'
    ]
  },
  intuition: {
    overview: 'CPython provides low-level profiling hooks (`sys.setprofile`) that `cProfile` hooks into to timestamp call and return events.',
    steps: [
      { step: 1, title: 'Instrument', description: 'cProfile wraps execution block with event hooks.' },
      { step: 2, title: 'Measure', description: 'Records per-function invocations, CPU ticks, and hierarchy.' },
      { step: 3, title: 'Analyze', description: 'pstats sorts and displays hottest functions by tottime or cumtime.' }
    ]
  },
  codeExample: {
    title: 'Profiling Code with cProfile and pstats',
    code: `import cProfile
import pstats
import io
import time

def slow_step():
    time.sleep(0.05)

def fast_step():
    return sum(x ** 2 for x in range(10_000))

def main_workflow():
    fast_step()
    slow_step()
    fast_step()

# Run profiling
pr = cProfile.Profile()
pr.enable()
main_workflow()
pr.disable()

# Format and sort stats
stream = io.StringIO()
ps = pstats.Stats(pr, stream=stream).sort_stats("cumtime")
ps.print_stats(5)
print("Profile report (top 5 by cumulative time):\\n", stream.getvalue()[:400])`,
    explanation: 'Demonstrates programmatic profiling using cProfile.Profile() and sorting results by cumulative time with pstats.'
  },
  runnableCode: {
    code: `import timeit

# Compare list comprehension vs list(map())
comp_time = timeit.timeit("[x * 2 for x in range(1000)]", number=1000)
map_time = timeit.timeit("list(map(lambda x: x * 2, range(1000)))", number=1000)

print(f"Comprehension time (1000 runs): {comp_time:.4f}s")
print(f"Map time (1000 runs): {map_time:.4f}s")
print("Comprehension faster?", comp_time < map_time)`,
    expectedOutput: `Comprehension faster? True`
  },
  lineByLine: [
    { line: 4, code: 'comp_time = timeit.timeit(...)', explanation: 'Executes expression 1000 times, measuring total wall-clock duration.' },
    { line: 9, code: 'print("Comprehension faster?", comp_time < map_time)', explanation: 'Demonstrates list comprehensions generally outperform lambda maps.' }
  ],
  commonMistakes: [
    {
      mistake: 'Using `time.time()` for micro-benchmarking tiny functions.',
      whyWrong: 'Subject to system clock resolution limits, background OS interruptions, and garbage collection interference.',
      howToFix: 'Use the `timeit` module, which runs many iterations and controls for clock noise.'
    },
    {
      mistake: 'Optimizing based on `tottime` instead of checking call frequency.',
      whyWrong: 'A fast 1-microsecond function called 10 million times might show high total time simply because of call count.',
      howToFix: 'Check both `ncalls` and `percall` stats to understand the root cause.'
    }
  ],
  realWorldApplications: [
    { title: 'API Response Optimization', description: 'Profiling slow web requests to identify whether DB queries or JSON serialization is the bottleneck.' },
    { title: 'Data Science Training Loops', description: 'Identifying data loader bottlenecks that starve GPUs during deep learning training.' }
  ],
  practiceQuestions: [
    { question: 'What is the difference between `tottime` and `cumtime` in a cProfile report?', hint: 'Sub-function inclusion.', answer: '`tottime` is time spent strictly inside the function excluding sub-calls; `cumtime` includes time spent inside the function PLUS all sub-calls it initiated.' },
    { question: 'What standard library module is designed for accurate micro-benchmarking of small code snippets?', hint: 'Module name.', answer: 'The `timeit` module.' },
    { question: 'How can you run cProfile from the command line without modifying script code?', hint: 'Python -m flag.', answer: '`python -m cProfile -s cumtime my_script.py`.' }
  ],
  quiz: [
    {
      question: 'Which built-in C-extension profiler is recommended for general production profiling in Python?',
      options: ['profile', 'cProfile', 'hotshot', 'sys.timer'],
      correctAnswer: 1,
      explanation: '`cProfile` is a C extension with low overhead suitable for profiling long-running programs.'
    },
    {
      question: 'What does `ncalls` mean in a pstats report?',
      options: ['Number of CPU cores utilized', 'Total number of times the function was called', 'Network calls made', 'Name of callers'],
      correctAnswer: 1,
      explanation: '`ncalls` indicates the total number of invocations for that function.'
    },
    {
      question: 'Why does `timeit` run test code thousands of times by default?',
      options: ['To stress test RAM', 'To average out operating system thread scheduling and CPU frequency scaling noise', 'Because Python bytecode is slow', 'To prevent memory leaks'],
      correctAnswer: 1,
      explanation: 'Repeating runs smooths out OS scheduling noise and clock jitter for reliable microsecond benchmarks.'
    }
  ],
  codingChallenge: {
    title: 'Benchmark and Pick Faster Function',
    difficulty: 'Advanced',
    description: 'Write a function `pick_faster(fn1: callable, fn2: callable, runs: int = 500) -> str` that runs both functions `runs` times using `time.perf_counter()`, returning `"fn1"` if fn1 took less total time, or `"fn2"` if fn2 was faster (or equal).',
    starterCode: `import time

def pick_faster(fn1, fn2, runs: int = 500) -> str:
    # Write your solution here
    pass`,
    hints: [
      'Record start = time.perf_counter(); loop runs times; t1 = time.perf_counter() - start.',
      'Repeat for fn2.',
      'Return "fn1" if t1 < t2 else "fn2".'
    ],
    solution: `import time

def pick_faster(fn1, fn2, runs: int = 500) -> str:
    s1 = time.perf_counter()
    for _ in range(runs):
        fn1()
    t1 = time.perf_counter() - s1
    
    s2 = time.perf_counter()
    for _ in range(runs):
        fn2()
    t2 = time.perf_counter() - s2
    
    return "fn1" if t1 < t2 else "fn2"`,
    testCases: [
      { input: 'f_fast = lambda: 1 + 1; f_slow = lambda: sum(range(100)); pick_faster(f_fast, f_slow)', expectedOutput: '"fn1"' }
    ]
  }
};

const py8Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-8.ts');
writePythonModuleFile(py8Path, m8.data, m8Lessons);
console.log('Python Module 8 completed! Authored:', Object.keys(m8Lessons).length);
