const path = require('path');
const { getExistingPyLessons } = require('./extract-landmarks');
const { writePythonModuleFile } = require('./writer');

// --- Python Module 1 ---
const m1 = getExistingPyLessons(1);
const m1Lessons = { ...m1.lessons };

m1Lessons['py-fundamentals-execution-model'] = {
  id: 'py-fundamentals-execution-model',
  moduleId: 'python-module-1',
  title: 'Python Execution Model',
  subtitle: 'From Source Code to Bytecode to CPython Virtual Machine Evaluation',
  order: 1,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'execution-trace',
  objectives: [
    'Trace how CPython compiles human-readable source (.py) into bytecode (.pyc).',
    'Understand the CPython Virtual Machine (PVM) stack-based evaluation loop.',
    'Inspect real bytecode instructions using the standard `dis` module.',
    'Differentiate between compiled, interpreted, and JIT-compiled languages.'
  ],
  prerequisites: ['Basic command line familiarity'],
  analogy: {
    title: 'The Sheet Music and the Player Piano',
    text: 'A composer writes sheet music in Italian notations (source code). A mechanical transcriber punches holes onto a paper roll (bytecode compilation). Finally, the player piano reads the punched roll step-by-step and presses the keys to produce music (the Python Virtual Machine executing bytecode).',
    metaphor: 'Python is both compiled (to bytecode) and interpreted (by the virtual machine).'
  },
  problemSolved: {
    title: 'Demystifying How Python Actually Executes Your Programs',
    description: 'Beginners often think Python executes text lines directly like a shell script. In reality, Python compiles source code to an optimized intermediate bytecode representation (.pyc) that executes on a stack-based virtual machine.',
    keyPoints: [
      'Source is parsed into an Abstract Syntax Tree (AST) then compiled to bytecode.',
      'Bytecode is cached in __pycache__ directory for rapid subsequent startups.',
      'CPython is written in C and evaluates opcodes in a giant evaluation loop (ceval.c).'
    ]
  },
  intuition: {
    overview: 'When you run `python app.py`: 1. Parser reads source and generates AST; 2. Compiler generates bytecode (.pyc); 3. CPython PVM executes bytecode instructions one by one using an evaluation stack.',
    steps: [
      { step: 1, title: 'Lexing & Parsing', description: 'Source code text is tokenized into grammar tokens and built into an AST.' },
      { step: 2, title: 'Bytecode Compilation', description: 'AST is compiled into a sequence of bytecode opcodes stored in a code object.' },
      { step: 3, title: 'Virtual Machine Execution', description: 'The PVM maintains a value stack and frame stack, executing each opcode sequentially.' }
    ]
  },
  codeExample: {
    title: 'Disassembling Python Bytecode with `dis`',
    code: `import dis

def calculate(a, b):
    return a + b * 2

dis.dis(calculate)`,
    explanation: 'The `dis` module disassembles a Python function into human-readable bytecode instructions.'
  },
  runnableCode: {
    code: `import dis

def add(x, y):
    return x + y

dis.dis(add)`,
    expectedOutput: `  4           0 RESUME                   0

  5           2 LOAD_FAST                0 (x)
              4 LOAD_FAST                1 (y)
              6 BINARY_OP                0 (+)
             10 RETURN_VALUE`
  },
  lineByLineExplanation: [
    { line: 4, code: 'LOAD_FAST 0 (x)', explanation: 'Pushes local variable x onto the virtual machine evaluation stack.' },
    { line: 5, code: 'LOAD_FAST 1 (y)', explanation: 'Pushes local variable y onto the virtual machine evaluation stack.' },
    { line: 6, code: 'BINARY_OP 0 (+)', explanation: 'Pops top two stack values, adds them, and pushes result.' },
    { line: 7, code: 'RETURN_VALUE', explanation: 'Pops result from stack and returns to caller.' }
  ],
  commonMistakes: [
    { mistake: 'Thinking Python is purely interpreted without a compilation step', solution: 'Python always compiles to bytecode first; it just happens automatically in memory without manual javac/gcc steps.', codeExample: '# Python creates __pycache__/*.pyc bytecode caches' }
  ],
  bestPractices: [
    'Do not commit __pycache__/ folders to Git (add to .gitignore).',
    'Use python -m py_compile to check syntax of large codebases without running code.'
  ],
  applications: [
    { industry: 'Software Engineering', application: 'Performance profiling and bytecode optimization', benefit: 'Allows identifying instruction bottlenecks in Python.' }
  ],
  practiceQuestions: [
    { id: 'pq-em-1', question: 'What is stored inside the `__pycache__` directory?', hint: '.pyc files.', answer: 'Compiled bytecode files (.pyc) that allow Python to load imported modules faster without re-parsing source text.' }
  ],
  quiz: [
    { id: 'q-em-1', question: 'What is the default and official implementation of Python?', options: ['CPython', 'PyPy', 'Jython', 'IronPython'], correctIndex: 0, explanation: 'CPython, written in C, is the reference implementation developed by Guido van Rossum and the Python core team.' }
  ],
  codingChallenge: {
    title: 'Bytecode Inspection Utility',
    problem: 'Write a function that accepts any callable function and returns a list of its bytecode opcode names.',
    hints: ['Use dis.get_instructions(func).'],
    starterCode: `import dis

def get_opcodes(func) -> list[str]:
    # TODO: Return list of opcode names
    pass`,
    solution: `import dis

def get_opcodes(func) -> list[str]:
    return [instr.opname for instr in dis.get_instructions(func)]`
  },
  summary: {
    keyTakeaways: ['CPython compiles source to bytecode before evaluating it on the PVM stack.', 'The dis module reveals underlying bytecode opcodes.'],
    nextLessonId: 'py-fundamentals-variables',
    nextLessonTitle: 'Variables, Naming, and Primitive Types',
    nextLessonModuleId: 'python-module-1'
  }
};

m1Lessons['py-fundamentals-type-conversion'] = {
  id: 'py-fundamentals-type-conversion',
  moduleId: 'python-module-1',
  title: 'Type Conversion and Casting',
  subtitle: 'Implicit Coercion vs Explicit Casting with int(), float(), str(), and bool()',
  order: 3,
  readTimeMinutes: 16,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Distinguish between implicit type coercion (e.g. int + float -> float) and explicit casting.',
    'Master conversion functions: int(), float(), str(), bool(), and chr()/ord().',
    'Handle ValueError exceptions when converting invalid string numerals.',
    'Understand base conversions (e.g. int("1010", 2) for binary).'
  ],
  prerequisites: ['Variables, Naming, and Primitive Types'],
  analogy: {
    title: 'The Currency Exchange Counter',
    text: 'If you have a 10-dollar bill and a 50-cent coin, your wallet total automatically becomes $10.50 (implicit coercion: integer promotes to float). But if you have a piece of paper that says "500" written in ink, you must take it to the bank teller and explicitly convert the written words into real cash (explicit casting: int("500")).',
    metaphor: 'Implicit conversion happens automatically without data loss; explicit casting requires deliberate functions.'
  },
  problemSolved: {
    title: 'Safe Data Transformation Across Heterogeneous Sources',
    description: 'User inputs, CSV files, and API endpoints always arrive as raw text strings. Type conversion transforms text into mathematical numbers or booleans safely.',
    keyPoints: [
      'input() always returns str; must explicitly cast to int() or float().',
      'int() truncates floats towards zero; round() rounds to nearest even.',
      'int(s, base) parses binary, hex, and octal strings.'
    ]
  },
  intuition: {
    overview: 'Use constructor functions as converters: int("42") -> 42; float("3.14") -> 3.14; str(100) -> "100"; bool("") -> False.',
    steps: [
      { step: 1, title: 'String to Number', description: 'Wrap string in int() or float().' },
      { step: 2, title: 'Number to String', description: 'Wrap in str() or use f-strings.' },
      { step: 3, title: 'Truthiness', description: 'bool(x) evaluates whether x is truthy or falsy.' }
    ]
  },
  codeExample: {
    title: 'Type Conversions in Practice',
    code: `num_str = "100"
num_int = int(num_str)        # 100
num_float = float(num_int)    # 100.0
bin_val = int("1101", 2)      # 13 (binary to decimal)
hex_val = hex(255)            # '0xff'
back_to_str = str(num_float)  # "100.0"`,
    explanation: 'Demonstrates common explicit conversions and base parsing in Python.'
  },
  runnableCode: {
    code: `print(int("42"))
print(float("3.1415"))
print(int("1010", 2))
print(bool(""))
print(bool("non-empty"))`,
    expectedOutput: `42\n3.1415\n10\nFalse\nTrue`
  },
  lineByLineExplanation: [
    { line: 3, code: 'int("1010", 2)', explanation: 'Parses string as base-2 binary, yielding integer 10.' },
    { line: 4, code: 'bool("")', explanation: 'Empty string is falsy, evaluates to False.' }
  ],
  commonMistakes: [
    { mistake: 'Trying to cast float strings directly with int("3.14")', solution: 'int("3.14") raises ValueError; cast to float first then int: int(float("3.14")).', codeExample: 'val = int(float("3.14")) # correct' }
  ],
  bestPractices: [
    'Always wrap user-input casting in try/except ValueError blocks.',
    'Use math.floor or math.ceil rather than int() if specific rounding direction is needed.'
  ],
  applications: [
    { industry: 'Data Engineering', application: 'ETL pipelines parsing CSV text records into database numerical columns', benefit: 'Ensures schema type integrity.' }
  ],
  practiceQuestions: [
    { id: 'pq-tc-1', question: 'What does int(-3.7) evaluate to in Python?', hint: 'Truncates toward zero.', answer: '-3 (int() strips decimal fraction toward zero).' }
  ],
  quiz: [
    { id: 'q-tc-1', question: 'What happens when you run `int("hello")`?', options: ['Raises ValueError', 'Returns 0', 'Returns None', 'Returns NaN'], correctIndex: 0, explanation: 'Python raises ValueError: invalid literal for int() with base 10: \'hello\'.' }
  ],
  codingChallenge: {
    title: 'Safe String to Integer Converter',
    problem: 'Write a function safe_int(s, default_val=0) that converts string s to an integer. If s cannot be parsed, return default_val without crashing.',
    hints: ['Use try/except ValueError.'],
    starterCode: `def safe_int(s: str, default_val: int = 0) -> int:
    # TODO: Safely convert string to int
    pass`,
    solution: `def safe_int(s: str, default_val: int = 0) -> int:
    try:
        return int(s)
    except (ValueError, TypeError):
        return default_val`
  },
  summary: {
    keyTakeaways: ['int(), float(), str(), bool() perform explicit type casting.', 'Always handle ValueError when parsing untrusted string inputs.'],
    nextLessonId: 'py-fundamentals-operators',
    nextLessonTitle: 'Operators: Arithmetic, Comparison, and Logical',
    nextLessonModuleId: 'python-module-1'
  }
};

m1Lessons['py-fundamentals-operators'] = {
  id: 'py-fundamentals-operators',
  moduleId: 'python-module-1',
  title: 'Operators: Arithmetic, Comparison, and Logical',
  subtitle: 'Precedence, Floor Division, Short-Circuit Evaluation, and the Walrus Operator',
  order: 4,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Master all arithmetic operators: +, -, *, /, // (floor div), % (modulo), and ** (power).',
    'Understand true division / (always returns float) vs floor division //.',
    'Apply short-circuit evaluation in logical `and` and `or`.',
    'Utilize the Walrus operator := (assignment expressions) introduced in Python 3.8.'
  ],
  prerequisites: ['Variables, Naming, and Primitive Types'],
  analogy: {
    title: 'Electrical Switches in Series and Parallel',
    text: 'In electrical engineering, two switches in series require BOTH to be on for electricity to flow (logical AND). If switch A is open (off), electricity stops immediately without checking switch B (short-circuit). Two switches in parallel only need ONE to be on (logical OR). If switch A is on, current flows without checking switch B.',
    metaphor: 'Short-circuit evaluation stops evaluating logical chains as soon as the outcome is guaranteed.'
  },
  problemSolved: {
    title: 'Writing Expressive, Efficient Computational Expressions',
    description: 'Operators perform calculations and conditional evaluation. Understanding operator precedence prevents subtle calculation bugs, while short-circuiting prevents NullPointer / ZeroDivision crashes.',
    keyPoints: [
      '// truncates towards negative infinity (floor division).',
      'Short-circuiting: `if obj and obj.is_valid():` safely avoids AttributeError on None.',
      'Walrus operator `:=` assigns and evaluates an expression in a single line.'
    ]
  },
  intuition: {
    overview: 'Arithmetic follows PEMDAS precedence. Logical AND stops on first False; logical OR stops on first True.',
    steps: [
      { step: 1, title: 'Arithmetic', description: '7 // 2 = 3; 7 / 2 = 3.5; 7 % 2 = 1.' },
      { step: 2, title: 'Chained Comparisons', description: 'Python supports natural mathematical chains: 1 < x < 10.' },
      { step: 3, title: 'Assignment Expressions', description: 'if (n := len(data)) > 0: uses n immediately.' }
    ]
  },
  codeExample: {
    title: 'Operator Mechanics and Walrus Operator',
    code: `# Floor division with negatives
print(7 // 2)   # 3
print(-7 // 2)  # -4 (floors toward -inf, unlike C/Java!)

# Short circuit evaluation
def risky():
    print("Called!")
    return True

print(False and risky()) # risky() is NEVER called!

# Walrus operator :=
if (n := len([1, 2, 3])) > 2:
    print(f"List has {n} items")`,
    explanation: 'Demonstrates Python floor division behavior, short-circuit skipping, and the walrus operator.'
  },
  runnableCode: {
    code: `print(7 // 2)
print(-7 // 2)
print(2 ** 8)
print(1 < 5 < 10)
x = (val := 42) + 8
print(val, x)`,
    expectedOutput: `3\n-4\n256\nTrue\n42 50`
  },
  lineByLineExplanation: [
    { line: 2, code: '-7 // 2', explanation: 'Floors down toward negative infinity: -3.5 floors to -4.' },
    { line: 4, code: '1 < 5 < 10', explanation: 'Chained comparison: automatically expands to 1 < 5 and 5 < 10.' },
    { line: 5, code: 'x = (val := 42) + 8', explanation: 'Assigns 42 to val and uses 42 in the addition expression.' }
  ],
  commonMistakes: [
    { mistake: 'Expecting -7 // 2 to equal -3 like in C or Java', solution: 'Python floor division always rounds towards negative infinity (-inf); -3.5 rounds to -4.', codeExample: 'import math\ntrunc = int(-7 / 2) # gives -3' }
  ],
  bestPractices: [
    'Use parentheses to clarify complex operator precedence.',
    'Use the walrus operator := in while loops reading streams to avoid duplicate input calls.'
  ],
  applications: [
    { industry: 'Data Processing', application: 'Streaming data chunk processing with walrus operator', benefit: 'Reads chunks until empty in clean while loops.' }
  ],
  practiceQuestions: [
    { id: 'pq-op-1', question: 'What does the expression `[] or "default"` evaluate to?', hint: 'Logical OR returns the first truthy operand.', answer: '"default" (empty list is falsy, so OR evaluates and returns the second operand).' }
  ],
  quiz: [
    { id: 'q-op-1', question: 'What does `10 / 2` evaluate to in Python 3?', options: ['5.0 (float)', '5 (int)', '10', 'TypeError'], correctIndex: 0, explanation: 'The true division operator / always returns a float in Python 3, even if the division is exact.' }
  ],
  codingChallenge: {
    title: 'Even or Odd Bitwise Check',
    problem: 'Write a function is_even(n) that checks if an integer is even using the bitwise AND operator & instead of modulo %.',
    hints: ['Even numbers have their lowest bit set to 0: (n & 1) == 0.'],
    starterCode: `def is_even(n: int) -> bool:
    # TODO: Check if even using bitwise &
    pass`,
    solution: `def is_even(n: int) -> bool:
    return (n & 1) == 0`
  },
  summary: {
    keyTakeaways: ['// floors toward -infinity.', 'Short-circuit evaluation protects against errors.', ':= assigns and returns values simultaneously.'],
    nextLessonId: 'py-fundamentals-input-output',
    nextLessonTitle: 'Input and Output',
    nextLessonModuleId: 'python-module-1'
  }
};

m1Lessons['py-fundamentals-input-output'] = {
  id: 'py-fundamentals-input-output',
  moduleId: 'python-module-1',
  title: 'Input and Output',
  subtitle: 'Formatted String Literals (f-strings), print() Parameters, and stdin Processing',
  order: 5,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Format strings with modern Python f-strings, format specifiers (.2f, :05d, :>10), and alignment.',
    'Control print() using `sep`, `end`, and `flush` arguments.',
    'Read user input via `input()` and strip whitespace.',
    'Process multiple space-separated inputs via `sys.stdin.read()` for competitive programming.'
  ],
  prerequisites: ['Variables, Naming, and Primitive Types'],
  analogy: {
    title: 'The Post Office Label Printer',
    text: 'When printing a shipping label, the computer doesn\'t just smash text together; it pads the customer ID to 8 digits with leading zeros (00048291), formats currency with two decimals ($14.99), and right-aligns addresses. Modern f-strings act as an intelligent template printer.',
    metaphor: 'f-strings embed expressions and format specifiers directly inside string quotes.'
  },
  problemSolved: {
    title: 'Clean, Expressive String Formatting and Stream I/O',
    description: 'Old % formatting and str.format() were verbose and error-prone. Python 3.6+ f-strings allow embedding arbitrary Python expressions, math, and alignment specs directly into string literals.',
    keyPoints: [
      'f-strings evaluate expressions at runtime.',
      'Format specifiers format floats `:.2f` and pad numbers `:04d`.',
      '`print(..., sep=", ", end="")` controls terminal separators.'
    ]
  },
  intuition: {
    overview: 'Prefix string with `f"..."` and put variables or expressions inside curly braces `{}`. Add formatting after colon: `{pi:.2f}` rounds to 2 decimal places.',
    steps: [
      { step: 1, title: 'Variable Interpolation', description: 'f"Hello, {name}!"' },
      { step: 2, title: 'Format Specifiers', description: 'f"{price:.2f}" formats 19.5 to "19.50".' },
      { step: 3, title: 'Print Control', description: 'print(a, b, sep=" | ", end="\\n")' }
    ]
  },
  codeExample: {
    title: 'Advanced F-String Formatting',
    code: `name = "Alice"
score = 95.6789
id_num = 42

# Format specifiers
print(f"Name: {name:>10}")      # Right-aligned in 10 characters
print(f"Score: {score:.2f}")     # 2 decimal places: 95.68
print(f"ID: {id_num:05d}")       # Zero-padded: 00042
print(f"Hex: {id_num:#04x}")     # 0x2a

# Self-documenting expressions (Python 3.8+)
x = 10
print(f"{x * 2 = }")             # Prints "x * 2 = 20"`,
    explanation: 'Demonstrates padding, floating precision, alignment, and debug f-strings.'
  },
  runnableCode: {
    code: `pi = 3.14159265
count = 7
print(f"{pi:.2f}")
print(f"{count:04d}")
print("A", "B", "C", sep="-", end="!")`,
    expectedOutput: `3.14\n0007\nA-B-C!`
  },
  lineByLineExplanation: [
    { line: 3, code: 'print(f"{pi:.2f}")', explanation: 'Formats float pi rounded to 2 decimal places.' },
    { line: 4, code: 'print(f"{count:04d}")', explanation: 'Pads integer count with leading zeros to width 4.' },
    { line: 5, code: 'print("A", "B", "C", sep="-", end="!")', explanation: 'Joins items with "-" instead of space, and ends with "!" instead of newline.' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting the "f" prefix in f"..."', solution: 'Writing "{name}" without the "f" outputs literal text "{name}"; always ensure the f prefix is present.', codeExample: 'f"Hello {name}" # with f' }
  ],
  bestPractices: [
    'Prefer f-strings over %-formatting or .format().',
    'Use f"{var=}" for quick, readable debugging output.'
  ],
  applications: [
    { industry: 'CLI Tools', application: 'Command line progress bars and formatted data tables', benefit: 'Pads and aligns columns into tidy ASCII terminal tables.' }
  ],
  practiceQuestions: [
    { id: 'pq-io-1', question: 'How can you format a number as a percentage with 1 decimal place using f-strings?', hint: 'Use :.1%', answer: 'f"{0.856:.1%}" formats to "85.6%".' }
  ],
  quiz: [
    { id: 'q-io-1', question: 'What does the parameter `sep` do in the print() function?', options: ['Specifies the string inserted between multiple printed arguments', 'Separates print lines', 'Splits strings', 'Sets file encoding'], correctIndex: 0, explanation: 'sep defines the string delimiter placed between arguments (defaults to a single space " ").' }
  ],
  codingChallenge: {
    title: 'Format Receipt Row',
    problem: 'Write a function format_receipt_row(item, price, qty) that returns a string with item left-aligned (20 chars), qty right-aligned (5 chars), and total formatted as currency $XX.XX right-aligned (10 chars).',
    hints: ['Use f"{item:<20}{qty:>5}{total:>10.2f}".'],
    starterCode: `def format_receipt_row(item: str, price: float, qty: int) -> str:
    # TODO: Return formatted receipt line
    pass`,
    solution: `def format_receipt_row(item: str, price: float, qty: int) -> str:
    total = price * qty
    return f"{item:<20}{qty:>5} \${total:>9.2f}"`
  },
  summary: {
    keyTakeaways: ['F-strings embed expressions and format specifiers seamlessly.', 'print(sep=..., end=...) controls console output layout.'],
    nextLessonId: 'py-fundamentals-comments',
    nextLessonTitle: 'Comments and Documentation',
    nextLessonModuleId: 'python-module-1'
  }
};

m1Lessons['py-fundamentals-comments'] = {
  id: 'py-fundamentals-comments',
  moduleId: 'python-module-1',
  title: 'Comments and Documentation',
  subtitle: 'PEP 257 Docstrings, Type Annotations, and Clean Code Readability',
  order: 6,
  readTimeMinutes: 14,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Differentiate between inline comments (#) and docstrings (""").',
    'Follow PEP 257 docstring conventions for modules, classes, and functions.',
    'Understand how Python attaches docstrings to the runtime `__doc__` attribute.',
    'Use Sphinx / Google style docstrings for automated documentation generation.'
  ],
  prerequisites: ['Python Fundamentals'],
  analogy: {
    title: 'Code is Written Once but Read Hundreds of Times',
    text: 'A chef in a restaurant kitchen labels spice jars not for themselves while cooking today, but for the sous chef working the breakfast shift tomorrow. Comments explain WHY an unusual ingredient was added; docstrings describe what the recipe makes.',
    metaphor: 'Comments explain the intent/why behind code; docstrings document the public API contract.'
  },
  problemSolved: {
    title: 'Maintainability and Team Collaboration in Large Codebases',
    description: 'Code that works today becomes unmaintainable in 6 months if the rationale is forgotten. Docstrings enable automated documentation tools (Sphinx, MkDocs) and IDE autocomplete tooltips.',
    keyPoints: [
      'Docstrings are stored in object.__doc__ and inspected via help().',
      'Comments explain "WHY", not "WHAT" (the code already shows what).',
      'Supports Google, NumPy, and Sphinx docstring standards.'
    ]
  },
  intuition: {
    overview: 'Place triple quotes """ directly under a def or class declaration. Write a one-line summary, followed by Args, Returns, and Raises sections.',
    steps: [
      { step: 1, title: 'One-Line Summary', description: 'Imperative sentence: "Calculate standard deviation of dataset."' },
      { step: 2, title: 'Args & Returns', description: 'Document parameters, expected types, and returned values.' },
      { step: 3, title: 'Runtime Access', description: 'Inspect using print(func.__doc__) or help(func).' }
    ]
  },
  codeExample: {
    title: 'Google-Style Docstring Example',
    code: `def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """Calculates the Body Mass Index (BMI).

    Args:
        weight_kg: Weight in kilograms (must be positive).
        height_m: Height in meters (must be positive).

    Returns:
        The calculated BMI as a float rounded to 2 decimal places.

    Raises:
        ValueError: If weight_kg or height_m is non-positive.
    """
    if weight_kg <= 0 or height_m <= 0:
        raise ValueError("Weight and height must be positive numbers.")
    return round(weight_kg / (height_m ** 2), 2)`,
    explanation: 'Demonstrates a production-grade Google-style docstring with typed signatures.'
  },
  runnableCode: {
    code: `def greet(name: str) -> str:
    """Returns a personalized greeting message."""
    return f"Hello, {name}!"

print(greet.__doc__)
print(greet("World"))`,
    expectedOutput: `Returns a personalized greeting message.\nHello, World!`
  },
  lineByLineExplanation: [
    { line: 2, code: '"""Returns a personalized greeting message."""', explanation: 'Docstring placed as the first statement of the function body.' },
    { line: 5, code: 'print(greet.__doc__)', explanation: 'Python automatically stores the docstring on the function object\'s __doc__ attribute.' }
  ],
  commonMistakes: [
    { mistake: 'Writing comments that restate the code: x = x + 1 # add 1 to x', solution: 'Comments should explain non-obvious business logic or algorithmic rationale, not narrate syntax.', codeExample: '# Correct: Adjust for 1-based indexing required by API' }
  ],
  bestPractices: [
    'Always use triple double quotes """ for docstrings.',
    'Keep inline comments fresh; out-of-date comments are worse than no comments.'
  ],
  applications: [
    { industry: 'Open Source', application: 'Public library API documentation (e.g. Requests, FastAPI, Scikit-learn)', benefit: 'Automatically generates searchable online HTML documentation.' }
  ],
  practiceQuestions: [
    { id: 'pq-cdoc-1', question: 'How can you view the documentation of any built-in Python module or function in the interactive shell?', hint: 'help() function.', answer: 'Use help(object), e.g. help(str.split).' }
  ],
  quiz: [
    { id: 'q-cdoc-1', question: 'Where is a Python docstring stored at runtime?', options: ['In the object\'s `__doc__` attribute', 'In a temporary file on disk', 'Docstrings are deleted by the compiler', 'In sys.modules'], correctIndex: 0, explanation: 'Python retains docstrings at runtime and attaches them to the `__doc__` attribute of functions, classes, and modules.' }
  ],
  codingChallenge: {
    title: 'Extract Docstring Summary',
    problem: 'Write a function get_summary(obj) that returns the first non-empty line of any object\'s docstring stripped of whitespace, or "No documentation" if None.',
    hints: ['Check obj.__doc__.'],
    starterCode: `def get_summary(obj) -> str:
    # TODO: Extract first line of docstring
    pass`,
    solution: `def get_summary(obj) -> str:
    doc = getattr(obj, '__doc__', None)
    if not doc:
        return "No documentation"
    lines = [line.strip() for line in doc.strip().splitlines() if line.strip()]
    return lines[0] if lines else "No documentation"`
  },
  summary: {
    keyTakeaways: ['Comments explain WHY; docstrings describe WHAT and HOW to use.', 'Docstrings are preserved at runtime on the `__doc__` attribute.'],
    nextLessonId: 'py-fundamentals-debugging',
    nextLessonTitle: 'Basic Debugging Techniques',
    nextLessonModuleId: 'python-module-1'
  }
};

m1Lessons['py-fundamentals-debugging'] = {
  id: 'py-fundamentals-debugging',
  moduleId: 'python-module-1',
  title: 'Basic Debugging Techniques',
  subtitle: 'Tracebacks, Error Hierarchy, breakpoint(), and the pdb Debugger',
  order: 7,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'execution-trace',
  objectives: [
    'Read and interpret Python tracebacks from bottom to top.',
    'Classify common runtime exceptions: IndexError, KeyError, TypeError, ValueError, and AttributeError.',
    'Use Python 3.7+ built-in `breakpoint()` to trigger the interactive pdb debugger.',
    'Master essential pdb navigation commands: n (next), s (step in), c (continue), p (print), and q (quit).'
  ],
  prerequisites: ['Python Fundamentals'],
  analogy: {
    title: 'The Aircraft Flight Data Black Box',
    text: 'When an airplane experiences an issue, investigators recover the black box recorder. They don\'t just look at the final crash site; they read the altitude, engine speed, and cockpit recordings leading up to the incident second-by-second. A Python traceback is your code\'s black box recording.',
    metaphor: 'Tracebacks show the exact sequence of nested function calls leading to an error.'
  },
  problemSolved: {
    title: 'Systematic Bug Isolation vs Aimless Print Guessing',
    description: 'Scattering print() statements throughout code is slow and clutters production files. Using tracebacks and interactive breakpoints allows inspecting live variables and stepping through execution in seconds.',
    keyPoints: [
      'Read tracebacks bottom-up: the last line states the exact error type and message.',
      'breakpoint() pauses execution and opens an interactive terminal in Python 3.7+.',
      'Essential pdb commands: n (step over), s (step into), p (inspect value).'
    ]
  },
  intuition: {
    overview: 'When Python crashes, look at the very last line: it tells you WHAT failed (e.g. KeyError: "user_id"). Look at the lines above it: they tell you WHERE it failed (file and line number).',
    steps: [
      { step: 1, title: 'Read Error Type', description: 'Look at the last line: Exception class and description.' },
      { step: 2, title: 'Trace Origin', description: 'Look at the bottom file link: the exact line where execution halted.' },
      { step: 3, title: 'Drop a Breakpoint', description: 'Insert breakpoint() above the failure line to inspect variable values.' }
    ]
  },
  codeExample: {
    title: 'Reading Tracebacks and Using breakpoint()',
    code: `def calculate_average(grades):
    # If grades is empty, grades[0] raises IndexError
    # Drop breakpoint to inspect grades before crash
    # breakpoint() 
    return sum(grades) / len(grades)

# Traceback example:
# calculate_average([])
# ZeroDivisionError: division by zero`,
    explanation: 'Illustrates how empty inputs cause zero division and how breakpoints intercept runtime state.'
  },
  runnableCode: {
    code: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError as e:
        return f"Caught error: {type(e).__name__} - {e}"

print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
    expectedOutput: `5.0\nCaught error: ZeroDivisionError - division by zero`
  },
  lineByLineExplanation: [
    { line: 4, code: 'except ZeroDivisionError as e:', explanation: 'Intercepts the specific exception, preventing catastrophic program crash.' },
    { line: 5, code: 'type(e).__name__', explanation: 'Extracts the exact name of the exception class.' }
  ],
  commonMistakes: [
    { mistake: 'Leaving breakpoint() calls in code committed to production', solution: 'Production environments without an interactive TTY will hang on breakpoint(); remove them or set PYTHONBREAKPOINT=0.', codeExample: '# Remove breakpoint() before committing' }
  ],
  bestPractices: [
    'Always read tracebacks starting from the BOTTOM line.',
    'Use logging instead of print() for production debugging.'
  ],
  applications: [
    { industry: 'Production Engineering', application: 'Sentry / Datadog automated error reporting', benefit: 'Captures and groups stack traces across millions of production requests.' }
  ],
  practiceQuestions: [
    { id: 'pq-dbg-1', question: 'What does the pdb command `s` (step) do compared to `n` (next)?', hint: 'Step into functions.', answer: '`s` steps INTO the function called on the current line, while `n` executes the line as a single step without diving inside.' }
  ],
  quiz: [
    { id: 'q-dbg-1', question: 'What built-in function was introduced in Python 3.7 to trigger the debugger without importing pdb?', options: ['breakpoint()', 'debug()', 'pause()', 'inspect()'], correctIndex: 0, explanation: 'Python 3.7 introduced the built-in `breakpoint()` function, which invokes `sys.breakpointhook()`.' }
  ],
  codingChallenge: {
    title: 'Safe Dictionary Key Access',
    problem: 'Write a function safe_get_nested(data, keys, default=None) that safely navigates through nested dictionaries given a list of keys without raising KeyError or TypeError.',
    hints: ['Loop through keys and check if current is dict.'],
    starterCode: `def safe_get_nested(data: dict, keys: list, default=None):
    # TODO: Safely retrieve nested key
    pass`,
    solution: `def safe_get_nested(data: dict, keys: list, default=None):
    curr = data
    for k in keys:
        if isinstance(curr, dict) and k in curr:
            curr = curr[k]
        else:
            return default
    return curr`
  },
  summary: {
    keyTakeaways: ['Tracebacks read bottom-up to identify error cause and origin line.', 'breakpoint() drops into the interactive pdb debugger.'],
    nextLessonId: 'py-fundamentals-numbers-strings',
    nextLessonTitle: 'Numbers and Strings in Depth',
    nextLessonModuleId: 'python-module-1'
  }
};

m1Lessons['py-fundamentals-numbers-strings'] = {
  id: 'py-fundamentals-numbers-strings',
  moduleId: 'python-module-1',
  title: 'Numbers and Strings in Depth',
  subtitle: 'Arbitrary-Precision Integers, IEEE-754 Floats, and String Immutability',
  order: 8,
  readTimeMinutes: 22,
  difficulty: 'Beginner',
  visualizerType: 'memory-model',
  objectives: [
    'Understand arbitrary-precision integers in Python (no 32-bit/64-bit integer overflow).',
    'Explain IEEE-754 floating-point inaccuracies (why 0.1 + 0.2 != 0.3) and use `decimal.Decimal`.',
    'Master string immutability and memory string interning.',
    'Utilize raw strings (r"...") and escape sequences (\\n, \\t, \\\\).'
  ],
  prerequisites: ['Variables, Naming, and Primitive Types'],
  analogy: {
    title: 'The Measuring Tape vs The Scientific Vernier Caliper',
    text: 'A standard tape measure with millimeter ticks cannot represent 1/3 of a millimeter exactly (floating-point IEEE-754 rounding). If you need exact financial pennies without fraction loss, you don\'t use an approximate tape measure; you use accounting ledger math (Python\'s Decimal module).',
    metaphor: 'Standard floats are binary approximations; Decimal provides exact fixed-point arithmetic.'
  },
  problemSolved: {
    title: 'Avoiding Financial Rounding Disasters and Overflow Crashes',
    description: 'In C or Java, computing 2^100 crashes with integer overflow. Python handles giant integers automatically. However, float arithmetic (0.1 + 0.2 = 0.30000000000000004) can cause financial calculation errors without the Decimal module.',
    keyPoints: [
      'Python ints have arbitrary precision; bounded only by available RAM.',
      'Floats use 64-bit IEEE-754 representation: 0.1 + 0.2 == 0.3 is False!',
      'Strings are strictly immutable; modifying a string creates a new object.'
    ]
  },
  intuition: {
    overview: 'Python automatically expands integer memory dynamically. For floats, use `math.isclose(a, b)` for equality checks, or `decimal.Decimal` for financial calculations.',
    steps: [
      { step: 1, title: 'Arbitrary Precision', description: '2 ** 100 calculates accurately without overflow.' },
      { step: 2, title: 'Float Precision', description: 'math.isclose(0.1 + 0.2, 0.3) returns True.' },
      { step: 3, title: 'String Immutability', description: 's[0] = "x" raises TypeError; use concatenation or slices.' }
    ]
  },
  codeExample: {
    title: 'Numbers and String Gotchas in Python',
    code: `import math
from decimal import Decimal

# 1. Arbitrary precision integer
huge = 2 ** 100
print(f"2^100 digits: {len(str(huge))}")

# 2. Float rounding gotcha
print(0.1 + 0.2 == 0.3)                    # False! (0.30000000000000004)
print(math.isclose(0.1 + 0.2, 0.3))       # True!
print(Decimal("0.1") + Decimal("0.2") == Decimal("0.3")) # True!

# 3. String immutability
s = "python"
# s[0] = "P" # Raises TypeError!
s = "P" + s[1:] # Creates new string`,
    explanation: 'Demonstrates Python integer scaling, float imprecision workarounds, and string modification.'
  },
  runnableCode: {
    code: `import math
from decimal import Decimal

print(2 ** 64)
print(0.1 + 0.2 == 0.3)
print(math.isclose(0.1 + 0.2, 0.3))
print(Decimal('0.1') + Decimal('0.2') == Decimal('0.3'))`,
    expectedOutput: `18446744073709551616\nFalse\nTrue\nTrue`
  },
  lineByLineExplanation: [
    { line: 4, code: '2 ** 64', explanation: 'Computes number exceeding standard 64-bit unsigned integer without overflow.' },
    { line: 5, code: '0.1 + 0.2 == 0.3', explanation: 'False because 0.1 and 0.2 cannot be represented as finite binary fractions in IEEE-754.' },
    { line: 6, code: 'math.isclose(0.1 + 0.2, 0.3)', explanation: 'Tests float equality within a standard relative tolerance (1e-09).' }
  ],
  commonMistakes: [
    { mistake: 'Using == to compare two floating point numbers after arithmetic', solution: 'Always use math.isclose(a, b) for floating-point comparisons.', codeExample: 'if math.isclose(a, b): # safe float equality' }
  ],
  bestPractices: [
    'Use the decimal module for monetary and banking applications.',
    'Use raw strings r"\\d+" for regular expressions to prevent escape sequence conflicts.'
  ],
  applications: [
    { industry: 'FinTech', application: 'Currency exchange and transaction ledger processing', benefit: 'Decimal eliminates cent fractional losses across millions of transactions.' }
  ],
  practiceQuestions: [
    { id: 'pq-ns-1', question: 'What does a raw string `r"C:\\new\\folder"` do?', hint: 'Disables escape characters.', answer: 'It treats backslashes as literal characters, preventing "\\n" from being interpreted as a newline.' }
  ],
  quiz: [
    { id: 'q-ns-1', question: 'Why does `0.1 + 0.2 == 0.3` evaluate to False in Python?', options: ['0.1 and 0.2 cannot be represented exactly in binary floating-point representation', 'Python integers are broken', 'Python round() was not called', '0.3 is too large'], correctIndex: 0, explanation: 'In binary (base 2), 0.1 and 0.2 are repeating infinite fractions, causing slight rounding discrepancies when summed.' }
  ],
  codingChallenge: {
    title: 'Financial Compound Interest Calculator',
    problem: 'Calculate compound interest using `decimal.Decimal` to avoid float rounding errors. Formula: A = P * (1 + r/n)**(n*t). Return result rounded to 2 decimal places as string.',
    hints: ['Convert all inputs to Decimal string representations.'],
    starterCode: `from decimal import Decimal, ROUND_HALF_UP

def calculate_exact_interest(principal: str, rate: str, periods: int, years: int) -> str:
    # TODO: Calculate compound interest with Decimal
    pass`,
    solution: `from decimal import Decimal, ROUND_HALF_UP

def calculate_exact_interest(principal: str, rate: str, periods: int, years: int) -> str:
    p = Decimal(principal)
    r = Decimal(rate)
    n = Decimal(periods)
    t = Decimal(years)
    amount = p * ((Decimal(1) + (r / n)) ** (n * t))
    return str(amount.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))`
  },
  summary: {
    keyTakeaways: ['Python integers have arbitrary precision.', 'Use math.isclose() or Decimal for floats.', 'Strings are immutable.'],
    nextLessonId: 'py-control-boolean-logic',
    nextLessonTitle: 'Boolean Logic and Truthiness',
    nextLessonModuleId: 'python-module-2'
  }
};

const py1Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-1.ts');
writePythonModuleFile(py1Path, m1.data, m1Lessons);
console.log('Python Module 1 completed! Authored: ' + Object.keys(m1Lessons).length);

// --- Python Module 2 ---
const m2 = getExistingPyLessons(2);
const m2Lessons = { ...m2.lessons };

m2Lessons['py-control-boolean-logic'] = {
  id: 'py-control-boolean-logic',
  moduleId: 'python-module-2',
  title: 'Boolean Logic and Truthiness',
  subtitle: 'Truthy vs Falsy Invariants, De Morgan\'s Laws, and Short-Circuit Chaining',
  order: 1,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Define Truthiness: which objects evaluate to True and which evaluate to False.',
    'List all built-in Falsy values: None, False, 0, 0.0, "", [], (), {}, set(), range(0).',
    'Apply De Morgan\'s Laws to simplify complex conditional expressions.',
    'Understand why `x and y` returns the operand itself, not necessarily True or False.'
  ],
  prerequisites: ['Python Fundamentals'],
  analogy: {
    title: 'The VIP Bouncer Checking IDs',
    text: 'A club bouncer lets people in if they have a non-empty ticket in their hand. If a guest shows an empty envelope (an empty list `[]`), a blank badge (an empty string `""`), or empty pockets (`0`), the bouncer treats it as invalid (Falsy). Any envelope with something inside is valid (Truthy).',
    metaphor: 'In Python, empty containers and numeric zeros are falsy; populated objects are truthy.'
  },
  problemSolved: {
    title: 'Writing Idiomatic Python Conditions Without Redundant Length Checks',
    description: 'In other languages, checking an array requires `if (arr.length > 0)`. In Python, you write clean, idiomatic code: `if arr:` takes advantage of container truthiness.',
    keyPoints: [
      'All empty collections and zero numerals are falsy.',
      'All non-empty collections and non-zero numerals are truthy.',
      '`and` / `or` return the actual value that determined the outcome, not a boolean literal.'
    ]
  },
  intuition: {
    overview: 'bool(x) calls x.__bool__() or x.__len__(). If __len__() returns 0, the object is Falsy.',
    steps: [
      { step: 1, title: 'Falsy Set', description: 'None, 0, 0.0, "", [], {}, (), set(), False.' },
      { step: 2, title: 'Truthy Set', description: 'Everything else!' },
      { step: 3, title: 'Idiomatic Guard', description: '`if users:` instead of `if len(users) > 0:`.' }
    ]
  },
  codeExample: {
    title: 'Truthy vs Falsy and Operand Returns',
    code: `# Falsy evaluations
print(bool([]))      # False
print(bool({}))      # False
print(bool(0))       # False

# Truthy evaluations
print(bool([0]))     # True! (list is non-empty, contains 0)
print(bool(" "))     # True! (string contains space)

# Logical returns
print([] or "default")      # 'default'
print("hello" and "world")  # 'world'`,
    explanation: 'Demonstrates truthiness and the fact that `and`/`or` return the resolving operand.'
  },
  runnableCode: {
    code: `print(bool([]))
print(bool([0]))
print([] or 'fallback')
print('apple' and 'banana')`,
    expectedOutput: `False\nTrue\nfallback\nbanana`
  },
  lineByLineExplanation: [
    { line: 2, code: 'bool([0])', explanation: 'Returns True because the list is non-empty, even though its item is 0.' },
    { line: 3, code: '[] or "fallback"', explanation: '[] is falsy, so `or` continues and returns the right operand "fallback".' }
  ],
  commonMistakes: [
    { mistake: 'Checking `if x == True:` instead of `if x:`', solution: 'Writing `if x == True:` fails for truthy values like `x = [1, 2]` because [1, 2] does not equal the boolean literal True; use `if x:`.', codeExample: 'if x: # idiomatic truthiness' }
  ],
  bestPractices: [
    'Use `if items:` instead of `if len(items) > 0:`.',
    'Use `if obj is None:` instead of `if not obj:` when you want to distinguish None from empty containers.'
  ],
  applications: [
    { industry: 'Web Development', application: 'Default configuration fallbacks in web frameworks', benefit: 'Enables clean one-line default assignments: `port = env_port or 8000`.' }
  ],
  practiceQuestions: [
    { id: 'pq-bl-1', question: 'Simplify the expression `not (a and b)` using De Morgan\'s Law.', hint: 'Distribute the NOT.', answer: '`not a or not b`.' }
  ],
  quiz: [
    { id: 'q-bl-1', question: 'Which of the following evaluates to True in Python?', options: ['bool([0])', 'bool("")', 'bool(0.0)', 'bool(None)'], correctIndex: 0, explanation: '`[0]` is a non-empty list containing one element, making it truthy.' }
  ],
  codingChallenge: {
    title: 'Clean Dictionary Defaults with Truthiness',
    problem: 'Write a function get_setting(config, key, default) that returns config[key] if the value is truthy, otherwise returns default.',
    hints: ['Use config.get(key) or default.'],
    starterCode: `def get_setting(config: dict, key: str, default):
    # TODO: Return truthy setting or default
    pass`,
    solution: `def get_setting(config: dict, key: str, default):
    return config.get(key) or default`
  },
  summary: {
    keyTakeaways: ['Empty collections and zeros are falsy; populated objects are truthy.', 'Use idiomatic `if items:` for non-empty checks.'],
    nextLessonId: 'py-control-conditionals',
    nextLessonTitle: 'if, elif, and else',
    nextLessonModuleId: 'python-module-2'
  }
};

m2Lessons['py-control-for-loops'] = {
  id: 'py-control-for-loops',
  moduleId: 'python-module-2',
  title: 'for Loops and range()',
  subtitle: 'Iterator Consumption, Range Invariants, and the Optional else Clause',
  order: 3,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'execution-trace',
  objectives: [
    'Iterate over sequences using Python\'s collection-based for loop.',
    'Master range(start, stop, step) indexing and half-open intervals [start, stop).',
    'Understand why range() is an O(1) memory lazy sequence.',
    'Master the `for...else` construct: code in `else` runs only if loop finishes WITHOUT break.'
  ],
  prerequisites: ['Python Fundamentals'],
  analogy: {
    title: 'The Factory Conveyor Belt',
    text: 'A worker stands beside a conveyor belt. A mechanical arm advances the belt one box at a time. The worker takes each box, inspects it, and sets it aside. When the belt runs out of boxes, an alarm rings (the `else` clause) indicating the entire batch was inspected without interruption.',
    metaphor: 'A Python for loop consumes an iterator until StopIteration is raised.'
  },
  problemSolved: {
    title: 'Safe, Index-Free Collection Traversal',
    description: 'Traditional C-style loops require manual index counting `for (i=0; i<len; i++)`, which causes Off-By-One errors. Python\'s for loop iterates over actual items directly without index arithmetic.',
    keyPoints: [
      'Iterates directly over elements in collections.',
      'range() produces lazy values on demand in O(1) memory.',
      '`for...else` executes when loop completes naturally without `break`.'
    ]
  },
  intuition: {
    overview: '`for x in iterable:` requests next(iterator) repeatedly until StopIteration. `range(start, stop, step)` generates integers starting at `start` up to but not including `stop`.',
    steps: [
      { step: 1, title: 'Direct Iteration', description: 'for item in items:' },
      { step: 2, title: 'Numbered Iteration', description: 'for i, item in enumerate(items):' },
      { step: 3, title: 'Loop Else', description: 'for x in items: ... else: (runs if no break occurred).' }
    ]
  },
  codeExample: {
    title: 'For Loops and the Else Clause',
    code: `# Range with step
for i in range(10, 0, -2):
    print(i, end=" ") # 10 8 6 4 2
print()

# For...else search pattern
def find_prime(nums):
    for n in nums:
        if n > 1 and all(n % d != 0 for d in range(2, int(n**0.5) + 1)):
            print(f"Found prime: {n}")
            break
    else:
        print("No prime found in list!")`,
    explanation: 'Demonstrates reverse step range and the for...else search pattern.'
  },
  runnableCode: {
    code: `for i in range(1, 6, 2):
    print(i)
for n in [4, 6, 8]:
    if n % 2 != 0: break
else:
    print("All numbers were even!")`,
    expectedOutput: `1\n3\n5\nAll numbers were even!`
  },
  lineByLineExplanation: [
    { line: 1, code: 'for i in range(1, 6, 2):', explanation: 'Generates numbers 1, 3, 5 (stops before 6, incrementing by 2).' },
    { line: 5, code: 'else: print("All numbers were even!")', explanation: 'Runs because the loop finished without hitting a `break` statement.' }
  ],
  commonMistakes: [
    { mistake: 'Modifying a list while iterating over it (e.g. for x in lst: lst.remove(x))', solution: 'Modifying a list during iteration shifts elements and skips items; iterate over a copy `for x in list(lst):` or use list comprehension.', codeExample: 'for x in list(lst): # iterate over copy' }
  ],
  bestPractices: [
    'Use `enumerate(items)` when you need both index and element.',
    'Use `zip(list1, list2)` to iterate through two parallel lists simultaneously.'
  ],
  applications: [
    { industry: 'Data Science', application: 'Epoch training loops in machine learning model training', benefit: 'Iterates cleanly over data batches.' }
  ],
  practiceQuestions: [
    { id: 'pq-fl-1', question: 'How much memory does `range(1000000000)` consume in Python 3?', hint: 'range is a lazy sequence.', answer: 'Around 48 bytes! In Python 3, range() is a generator-like lazy object that computes values on demand, taking O(1) space regardless of size.' }
  ],
  quiz: [
    { id: 'q-fl-1', question: 'When does the `else` block of a Python `for` loop execute?', options: ['When the loop completes all iterations without encountering a `break` statement', 'Whenever an error occurs', 'When the loop is empty', 'Every time the loop finishes an iteration'], correctIndex: 0, explanation: 'The `else` clause attached to a for loop runs if and only if the loop terminates naturally (did not hit `break`).' }
  ],
  codingChallenge: {
    title: 'Find First Duplicate',
    problem: 'Given a list of integers, find and return the first duplicate element. If no duplicates exist, return -1 using a for...else loop.',
    hints: ['Track seen elements in a set.'],
    starterCode: `def find_first_duplicate(nums: list[int]) -> int:
    # TODO: Find first duplicate
    pass`,
    solution: `def find_first_duplicate(nums: list[int]) -> int:
    seen = set()
    for x in nums:
        if x in seen:
            return x
        seen.add(x)
    return -1`
  },
  summary: {
    keyTakeaways: ['for loops iterate over iterables directly.', 'range() takes O(1) memory.', 'for...else executes if loop finishes without break.'],
    nextLessonId: 'py-control-while-loops',
    nextLessonTitle: 'while Loops',
    nextLessonModuleId: 'python-module-2'
  }
};

m2Lessons['py-control-while-loops'] = {
  id: 'py-control-while-loops',
  moduleId: 'python-module-2',
  title: 'while Loops',
  subtitle: 'Condition-Driven Iteration, Infinite Loops, and Convergence Guarantees',
  order: 4,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'execution-trace',
  objectives: [
    'Execute condition-driven iteration where step count is unknown in advance.',
    'Guarantee loop termination and prevent infinite loops via progress invariant.',
    'Implement event-listening sentinel loops with `while True:`.',
    'Apply `while...else` construct.'
  ],
  prerequisites: ['Boolean Logic and Truthiness'],
  analogy: {
    title: 'Filling a Bathtub to the Water Line',
    text: 'You turn on the water tap and watch the water rise. You don\'t know beforehand exactly how many seconds it will take. You simply keep the water running WHILE the water level has not reached the overflow drain, and turn off the tap the instant it reaches the mark.',
    metaphor: 'A while loop repeats as long as its condition remains True.'
  },
  problemSolved: {
    title: 'Indefinite Iteration When Step Count is Unknown',
    description: 'When the number of iterations cannot be determined in advance (e.g. reading network packets until socket closes, binary search convergence, user input validation), while loops drive execution dynamically.',
    keyPoints: [
      'Iterates as long as condition evaluates to True.',
      'Must ensure progress toward condition termination.',
      'Core driver of game loops, server daemon listeners, and mathematical algorithms.'
    ]
  },
  intuition: {
    overview: 'Check condition. If True, execute block and repeat. If False, terminate. Always ensure at least one variable in the condition is modified inside the loop.',
    steps: [
      { step: 1, title: 'Condition Evaluation', description: 'while condition:' },
      { step: 2, title: 'Loop Body', description: 'Execute instructions.' },
      { step: 3, title: 'Progress Step', description: 'Modify variables to guarantee convergence.' }
    ]
  },
  codeExample: {
    title: 'Euclid\'s Greatest Common Divisor (GCD) using While Loop',
    code: `def gcd(a: int, b: int) -> int:
    # While b != 0, replace (a, b) with (b, a % b)
    while b:
        a, b = b, a % b
    return a

print(gcd(48, 18)) # 6`,
    explanation: 'Uses a while loop to perform Euclidean division until remainder b reaches 0.'
  },
  runnableCode: {
    code: `num = 16
steps = 0
while num > 1:
    num //= 2
    steps += 1
print(f"Halved to 1 in {steps} steps")`,
    expectedOutput: `Halved to 1 in 4 steps`
  },
  lineByLineExplanation: [
    { line: 3, code: 'while num > 1:', explanation: 'Loop continues as long as num is strictly greater than 1.' },
    { line: 4, code: 'num //= 2', explanation: 'Progress step: shrinks num, guaranteeing eventual loop termination.' }
  ],
  commonMistakes: [
    { mistake: 'Forgetting the loop update step, creating an infinite loop: while i < 10: print(i)', solution: 'Always ensure variables in the condition are mutated inside the loop body.', codeExample: 'i += 1 # progress' }
  ],
  bestPractices: [
    'Add an explicit iteration timeout counter if looping over external network calls.'
  ],
  applications: [
    { industry: 'Game Development', application: 'Main game loop rendering frames', benefit: 'Runs while game_running is True.' }
  ],
  practiceQuestions: [
    { id: 'pq-wl-1', question: 'How can you safely exit an intentional `while True:` loop?', hint: 'break or return.', answer: 'Use an explicit `break` or `return` statement when an exit condition is met.' }
  ],
  quiz: [
    { id: 'q-wl-1', question: 'What causes an infinite loop in a while construct?', options: ['The loop condition never evaluates to False', 'The loop runs out of memory', 'Python limits while loops', 'Using integers in conditions'], correctIndex: 0, explanation: 'If the loop condition is never modified to evaluate to False, the loop executes endlessly.' }
  ],
  codingChallenge: {
    title: 'Collatz Conjecture Steps',
    problem: 'Given a positive integer n, if n is even, divide by 2; if n is odd, multiply by 3 and add 1. Return the number of steps required to reach 1.',
    hints: ['Use while n != 1.'],
    starterCode: `def collatz_steps(n: int) -> int:
    # TODO: Count Collatz steps to 1
    pass`,
    solution: `def collatz_steps(n: int) -> int:
    steps = 0
    while n != 1:
        if n % 2 == 0:
            n //= 2
        else:
            n = 3 * n + 1
        steps += 1
    return steps`
  },
  summary: {
    keyTakeaways: ['while loops execute condition-driven iteration.', 'Always ensure a progress step to guarantee termination.'],
    nextLessonId: 'py-control-break-continue',
    nextLessonTitle: 'break, continue, and pass',
    nextLessonModuleId: 'python-module-2'
  }
};

m2Lessons['py-control-break-continue'] = {
  id: 'py-control-break-continue',
  moduleId: 'python-module-2',
  title: 'break, continue, and pass',
  subtitle: 'Loop Control Jump Statements, Early Exits, and Syntactic Placeholders',
  order: 5,
  readTimeMinutes: 16,
  difficulty: 'Beginner',
  visualizerType: 'execution-trace',
  objectives: [
    'Terminate loops immediately using `break`.',
    'Skip remainder of current iteration and jump to next using `continue`.',
    'Use `pass` as an explicit no-op syntactic placeholder.',
    'Trace execution flow jumps using debugger breakpoints.'
  ],
  prerequisites: ['for Loops and range()', 'while Loops'],
  analogy: {
    title: 'Factory Assembly Line Quality Control',
    text: 'Imagine inspecting bottles on an assembly line. If a bottle is slightly scratched, you mark it and skip packaging it, moving to the next bottle (`continue`). If a bottle is shattered and glass is everywhere, you hit the emergency red stop button to shut down the entire line (`break`).',
    metaphor: 'break terminates the whole loop; continue skips only the current iteration.'
  },
  problemSolved: {
    title: 'Fine-Grained Loop Control Without Deep Nesting',
    description: 'Without break and continue, code requires deeply nested `if/else` ladders. Using `continue` to skip invalid data early flattens code into clean, readable guard clauses.',
    keyPoints: [
      '`break` exits innermost enclosing loop immediately.',
      '`continue` skips to next loop iteration.',
      '`pass` does nothing; satisfies Python\'s indentation syntax requirement.'
    ]
  },
  intuition: {
    overview: '`break` breaks out of the loop. `continue` skips the rest of the current loop body and proceeds to the next iteration. `pass` is an empty placeholder.',
    steps: [
      { step: 1, title: 'Break', description: 'if target_found: break' },
      { step: 2, title: 'Continue', description: 'if item is invalid: continue' },
      { step: 3, title: 'Pass', description: 'def stub(): pass' }
    ]
  },
  codeExample: {
    title: 'break vs continue vs pass in Action',
    code: `# continue: skip odd numbers
evens = []
for x in range(10):
    if x % 2 != 0:
        continue # Skip odd numbers
    evens.append(x)
print(evens) # [0, 2, 4, 6, 8]

# break: stop search
for x in range(100):
    if x == 5:
        break # Exit loop
print(x) # 5

# pass: placeholder for future implementation
def future_feature():
    pass # No-op`,
    explanation: 'Demonstrates skipping iterations with continue, exiting with break, and stubbing with pass.'
  },
  runnableCode: {
    code: `res = []
for i in range(10):
    if i == 3: continue
    if i == 6: break
    res.append(i)
print(res)`,
    expectedOutput: `[0, 1, 2, 4, 5]`
  },
  lineByLineExplanation: [
    { line: 3, code: 'if i == 3: continue', explanation: 'Skips appending 3, jumping directly to i = 4.' },
    { line: 4, code: 'if i == 6: break', explanation: 'Terminates loop permanently when i reaches 6.' }
  ],
  commonMistakes: [
    { mistake: 'Expecting `break` to exit all nested loops', solution: '`break` only exits the single innermost loop; to exit outer loops, use boolean flags or return from a function.', codeExample: '# break only exits inner loop' }
  ],
  bestPractices: [
    'Use `continue` as an early-return guard clause to reduce nested indentation.',
    'Use `pass` or `...` (Ellipsis) when designing abstract stub interfaces.'
  ],
  applications: [
    { industry: 'Data Science', application: 'Data cleaning and NaN value skipping', benefit: 'Skips corrupted rows instantly using `continue`.' }
  ],
  practiceQuestions: [
    { id: 'pq-bcp-1', question: 'Does `pass` do anything at runtime?', hint: 'Syntactic placeholder.', answer: 'No. `pass` is completely ignored at runtime by the Python interpreter; it exists solely because Python requires at least one indented statement in empty blocks.' }
  ],
  quiz: [
    { id: 'q-bcp-1', question: 'What is the difference between `break` and `continue`?', options: ['`break` terminates the loop entirely, while `continue` only skips the rest of the current iteration', '`continue` exits the loop', 'They are synonyms in Python', '`break` only works in while loops'], correctIndex: 0, explanation: 'break halts the loop completely; continue immediately jumps to the next iteration of the loop.' }
  ],
  codingChallenge: {
    title: 'Skip Multiples of 3 and Stop at Negative',
    problem: 'Process a list of integers: append positive numbers to a result list, skip multiples of 3, and terminate immediately if a negative number is encountered.',
    hints: ['Use continue for x % 3 == 0 and break for x < 0.'],
    starterCode: `def filter_stream(nums: list[int]) -> list[int]:
    # TODO: Filter stream using break and continue
    pass`,
    solution: `def filter_stream(nums: list[int]) -> list[int]:
    res = []
    for x in nums:
        if x < 0:
            break
        if x % 3 == 0:
            continue
        res.append(x)
    return res`
  },
  summary: {
    keyTakeaways: ['break halts the innermost loop.', 'continue skips to the next iteration.', 'pass serves as a syntactic no-op placeholder.'],
    nextLessonId: 'py-control-nested-loops',
    nextLessonTitle: 'Nested Loops',
    nextLessonModuleId: 'python-module-2'
  }
};

m2Lessons['py-control-nested-loops'] = {
  id: 'py-control-nested-loops',
  moduleId: 'python-module-2',
  title: 'Nested Loops',
  subtitle: '2D Grid Navigation, Cartesian Products, and Breaking Outer Loops',
  order: 6,
  readTimeMinutes: 20,
  difficulty: 'Beginner',
  visualizerType: 'execution-trace',
  objectives: [
    'Traverse 2D matrices and grids using row and column nested loops.',
    'Calculate quadratic O(n²) time complexity from nested loops.',
    'Generate Cartesian products cleanly using `itertools.product`.',
    'Break out of multiple nested loops using helper functions or boolean flags.'
  ],
  prerequisites: ['for Loops and range()'],
  analogy: {
    title: 'The Odometer in a Car',
    text: 'A mechanical odometer displays miles. The tenths-of-a-mile digit (inner loop) must spin through all 10 digits (0 through 9) before the whole-miles digit (outer loop) ticks up by 1. The inner wheel spins 10 times faster than the outer wheel.',
    metaphor: 'The inner loop completes all its iterations for every single step of the outer loop.'
  },
  problemSolved: {
    title: 'Multi-Dimensional Data Processing and Pairwise Comparisons',
    description: 'Images, chessboards, spreadsheets, and distance tables are 2D grids. Nested loops process every cell (row, col) systematically.',
    keyPoints: [
      'Outer loop runs R times, inner loop runs C times -> total R * C iterations.',
      'To break out of nested loops: wrap in a function and use `return`.',
      '`itertools.product` flattens nested loops into clean 1D loops.'
    ]
  },
  intuition: {
    overview: 'For each row r from 0 to rows - 1: for each col c from 0 to cols - 1: access matrix[r][c].',
    steps: [
      { step: 1, title: 'Row Selection', description: 'Outer loop picks current row.' },
      { step: 2, title: 'Column Sweep', description: 'Inner loop visits every cell in that row.' },
      { step: 3, title: 'Next Row', description: 'Advance to next row.' }
    ]
  },
  codeExample: {
    title: 'Matrix Traversal & Breaking Out of Nested Loops',
    code: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Cleanest way to break out of nested loops: wrap in a function!
def find_cell(matrix, target):
    for r in range(len(matrix)):
        for c in range(len(matrix[0])):
            if matrix[r][c] == target:
                return (r, c) # Returns immediately from both loops!
    return (-1, -1)

print(find_cell(matrix, 5)) # (1, 1)`,
    explanation: 'Using a return statement cleanly terminates both outer and inner loops simultaneously.'
  },
  runnableCode: {
    code: `coords = []
for i in range(2):
    for j in range(3):
        coords.append((i, j))
print(coords)`,
    expectedOutput: `[(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]`
  },
  lineByLineExplanation: [
    { line: 2, code: 'for i in range(2):', explanation: 'Outer loop runs 2 times (i = 0, 1).' },
    { line: 3, code: 'for j in range(3):', explanation: 'Inner loop runs 3 times for each i, resulting in 2 * 3 = 6 total iterations.' }
  ],
  commonMistakes: [
    { mistake: 'Using break to exit nested loops and expecting both loops to terminate', solution: 'break only exits the innermost loop; use a return statement or a boolean flag.', codeExample: 'return (r, c) # exits both loops' }
  ],
  bestPractices: [
    'Use `itertools.product(range(R), range(C))` to write flat, clean 2D grid loops.'
  ],
  applications: [
    { industry: 'Computer Vision', application: 'Image convolution filter kernel passes', benefit: 'Applies 3x3 filter kernels across every pixel coordinate in an image.' }
  ],
  practiceQuestions: [
    { id: 'pq-nl-1', question: 'How can you replace a nested loop over rows and columns with a single loop?', hint: 'itertools.product.', answer: '`from itertools import product; for r, c in product(range(R), range(C)):`' }
  ],
  quiz: [
    { id: 'q-nl-1', question: 'If outer loop runs n times and inner loop runs m times, how many total iterations occur?', options: ['n * m', 'n + m', 'n^m', '2^(n*m)'], correctIndex: 0, explanation: 'The inner loop runs m times for each of the n outer iterations, totaling n * m iterations.' }
  ],
  codingChallenge: {
    title: 'Transpose Matrix',
    problem: 'Given a 2D integer array matrix, return the transpose of matrix (flipping matrix over its main diagonal).',
    hints: ['Construct new matrix of size cols x rows where result[c][r] = matrix[r][c].'],
    starterCode: `def transpose(matrix: list[list[int]]) -> list[list[int]]:
    # TODO: Transpose matrix
    pass`,
    solution: `def transpose(matrix: list[list[int]]) -> list[list[int]]:
    rows, cols = len(matrix), len(matrix[0])
    transposed = [[0] * rows for _ in range(cols)]
    for r in range(rows):
        for c in range(cols):
            transposed[c][r] = matrix[r][c]
    return transposed`
  },
  summary: {
    keyTakeaways: ['Nested loops traverse 2D grids in O(rows * cols) time.', 'Wrap in functions and use `return` to break out of multiple loops cleanly.'],
    nextLessonId: 'py-control-pattern-printing',
    nextLessonTitle: 'Pattern Printing Problems',
    nextLessonModuleId: 'python-module-2'
  }
};

m2Lessons['py-control-pattern-printing'] = {
  id: 'py-control-pattern-printing',
  moduleId: 'python-module-2',
  title: 'Pattern Printing Problems',
  subtitle: 'Geometric Loop Coordination, String Multiplication, and Pyramid Symmetry',
  order: 7,
  readTimeMinutes: 18,
  difficulty: 'Beginner',
  visualizerType: 'none',
  objectives: [
    'Translate geometric patterns (pyramids, diamonds, butterflies) into mathematical row/column invariants.',
    'Leverage Python string multiplication `char * count` for clean row generation.',
    'Master symmetric spacing and inverted loops.',
    'Build problem-solving confidence in coordinate geometry mapping.'
  ],
  prerequisites: ['Nested Loops'],
  analogy: {
    title: 'The Dot-Matrix Printer Needle',
    text: 'A dot-matrix receipt printer prints line by line. To print a triangular company logo, the print head calculates how many spaces to advance before firing its ink needles, and how many asterisks to strike, before advancing the roller to the next line.',
    metaphor: 'Each row is defined by a mathematical relationship between row index, spaces, and stars.'
  },
  problemSolved: {
    title: 'Mastering Loop Index Coordination and Spatial Logic',
    description: 'Pattern printing problems are classic computer science drills that build strong mental models of loop index relationships, boundary conditions, and spatial symmetry.',
    keyPoints: [
      'Row index i determines number of leading spaces and characters.',
      'Pyramid formula: (n - i) spaces followed by (2*i - 1) stars.',
      'Python string multiplication `"*" * k` eliminates manual inner character loops.'
    ]
  },
  intuition: {
    overview: 'For a pyramid of height n: for row i from 1 to n: spaces = n - i, stars = 2*i - 1. Print " " * spaces + "*" * stars.',
    steps: [
      { step: 1, title: 'Identify Invariant', description: 'Find formula for spaces and stars as a function of row i.' },
      { step: 2, title: 'Generate Rows', description: 'Use string multiplication to create each line.' },
      { step: 3, title: 'Symmetry', description: 'For diamonds, generate upper half (1..n) and invert lower half (n-1 down to 1).' }
    ]
  },
  codeExample: {
    title: 'Printing Pyramids and Diamonds',
    code: `def print_pyramid(n):
    for i in range(1, n + 1):
        spaces = " " * (n - i)
        stars = "*" * (2 * i - 1)
        print(spaces + stars)

def print_diamond(n):
    # Upper pyramid
    for i in range(1, n + 1):
        print(" " * (n - i) + "*" * (2 * i - 1))
    # Lower inverted pyramid
    for i in range(n - 1, 0, -1):
        print(" " * (n - i) + "*" * (2 * i - 1))`,
    explanation: 'Uses Python string multiplication for clean geometric pattern generation.'
  },
  runnableCode: {
    code: `n = 3
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))`,
    expectedOutput: `  *\n ***\n*****`
  },
  lineByLineExplanation: [
    { line: 2, code: 'for i in range(1, n + 1):', explanation: 'Iterates row by row from top (i=1) to base (i=n).' },
    { line: 3, code: 'print(" " * (n - i) + "*" * (2 * i - 1))', explanation: 'Calculates leading whitespace and prints odd number of stars centered symmetrically.' }
  ],
  commonMistakes: [
    { mistake: 'Writing manual nested loops for characters when string multiplication is available', solution: 'In Python, `"*" * count` is faster, cleaner, and less bug-prone than manual inner loops.', codeExample: 'line = " " * spaces + "*" * stars' }
  ],
  bestPractices: [
    'Always formulate formulas for spaces and characters on paper before typing code.'
  ],
  applications: [
    { industry: 'Education', application: 'Computer science introductory pedagogy', benefit: 'Instills deep understanding of iteration boundaries and nested indices.' }
  ],
  practiceQuestions: [
    { id: 'pq-pp-1', question: 'How many asterisks are in the base of a pyramid of height n?', hint: 'Odd numbers formula.', answer: '2 * n - 1 asterisks.' }
  ],
  quiz: [
    { id: 'q-pp-1', question: 'What is the formula for the number of stars on row i (1-indexed) in a centered pyramid?', options: ['2 * i - 1', 'i * 2', 'i', '2 * i + 1'], correctIndex: 0, explanation: 'The rows progress through odd numbers: row 1 has 1 star, row 2 has 3 stars, row 3 has 5 stars, etc.' }
  ],
  codingChallenge: {
    title: 'Generate Pascal\'s Triangle Rows as Lists',
    problem: 'Given an integer numRows, return the first numRows of Pascal\'s triangle as a list of lists.',
    hints: ['row[j] = prev_row[j-1] + prev_row[j].'],
    starterCode: `def generate_pascals_triangle(numRows: int) -> list[list[int]]:
    # TODO: Generate Pascal's Triangle
    pass`,
    solution: `def generate_pascals_triangle(numRows: int) -> list[list[int]]:
    triangle = []
    for i in range(numRows):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
        triangle.append(row)
    return triangle`
  },
  summary: {
    keyTakeaways: ['Coordinate patterns map row index i to spaces and stars.', 'String multiplication `"*" * k` streamlines line generation.'],
    nextLessonId: 'py-ds-strings-methods',
    nextLessonTitle: 'Strings and String Methods',
    nextLessonModuleId: 'python-module-3'
  }
};

const py2Path = path.join(__dirname, '..', 'src', 'data', 'python', 'python-module-2.ts');
writePythonModuleFile(py2Path, m2.data, m2Lessons);
console.log('Python Module 2 completed! Authored: ' + Object.keys(m2Lessons).length);
