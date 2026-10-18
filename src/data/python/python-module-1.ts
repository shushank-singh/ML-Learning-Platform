import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const pythonModule1Data: PythonModuleData = {
  "id": "python-module-1",
  "number": 1,
  "title": "Python Fundamentals",
  "subtitle": "Execution Model, Types, Operators & I/O",
  "description": "Start from absolute zero. Understand how Python executes code, declare variables, work with all primitive types, perform type conversions, use every class of operator, read user input, write formatted output, and use the debugger to trace your first programs.",
  "icon": "Terminal",
  "badge": "Fundamentals",
  "estimatedHours": 6,
  "topicsCount": 8,
  "lessons": [
    {
      "id": "py-fundamentals-execution-model",
      "moduleId": "python-module-1",
      "title": "Python Execution Model",
      "description": "From source code to bytecode to CPython interpreter: how Python actually runs your programs.",
      "order": 1,
      "readTimeMinutes": 15,
      "visualizerType": "execution-trace",
      "difficulty": "Beginner"
    },
    {
      "id": "py-fundamentals-variables",
      "moduleId": "python-module-1",
      "title": "Variables, Naming, and Primitive Types",
      "description": "Dynamic typing, naming conventions, int, float, bool, NoneType, and type() inspection.",
      "order": 2,
      "readTimeMinutes": 18,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    },
    {
      "id": "py-fundamentals-type-conversion",
      "moduleId": "python-module-1",
      "title": "Type Conversion and Casting",
      "description": "Implicit coercion, explicit int()/float()/str() conversion, and common pitfalls.",
      "order": 3,
      "readTimeMinutes": 15,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "py-fundamentals-operators",
      "moduleId": "python-module-1",
      "title": "Operators: Arithmetic, Comparison, and Logical",
      "description": "All operator categories, operator precedence, floor division //, modulo %, and walrus :=",
      "order": 4,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "py-fundamentals-input-output",
      "moduleId": "python-module-1",
      "title": "Input and Output",
      "description": "input() function, print() with sep/end/file, f-strings, format(), and format specifiers.",
      "order": 5,
      "readTimeMinutes": 18,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "py-fundamentals-comments",
      "moduleId": "python-module-1",
      "title": "Comments and Documentation",
      "description": "Inline comments, block comments, docstrings, and why good documentation matters.",
      "order": 6,
      "readTimeMinutes": 12,
      "visualizerType": "none",
      "difficulty": "Beginner"
    },
    {
      "id": "py-fundamentals-debugging",
      "moduleId": "python-module-1",
      "title": "Basic Debugging Techniques",
      "description": "Print-based debugging, reading tracebacks, using pdb breakpoints, and common error types.",
      "order": 7,
      "readTimeMinutes": 20,
      "visualizerType": "execution-trace",
      "difficulty": "Beginner"
    },
    {
      "id": "py-fundamentals-numbers-strings",
      "moduleId": "python-module-1",
      "title": "Numbers and Strings in Depth",
      "description": "Integer arithmetic precision, float IEEE-754 gotchas, string immutability, and escape sequences.",
      "order": 8,
      "readTimeMinutes": 22,
      "visualizerType": "memory-model",
      "difficulty": "Beginner"
    }
  ]
};

export const pythonModule1Lessons: Record<string, PythonLessonContent> = {
  "py-fundamentals-variables": {
    "id": "py-fundamentals-variables",
    "moduleId": "python-module-1",
    "title": "Variables, Naming Conventions, and Primitive Data Types",
    "subtitle": "Dynamic Typing, Object References, and Fundamental Types in Python",
    "order": 2,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "memory-model",
    "objectives": [
      "Understand Python's name-binding model: variables are references (sticky luggage tags), not memory buckets.",
      "Distinguish the 4 core primitive types: int, float, bool, and NoneType.",
      "Apply PEP 8 naming conventions (snake_case, UPPER_CASE constants).",
      "Use type() and id() to inspect runtime identity and data types.",
      "Understand dynamic typing and what happens during variable re-binding."
    ],
    "prerequisites": [
      "Basic understanding of running Python scripts or shell."
    ],
    "previousLesson": {
      "id": "py-fundamentals-execution-model",
      "title": "Python Execution Model",
      "moduleId": "python-module-1"
    },
    "analogy": {
      "title": "Variables as Luggage Tags (Not Storage Boxes)",
      "text": "In languages like C or Java, a variable is like a carved wooden box of fixed size: if you declare \"int x\", x is a 4-byte box that only ever holds integers. In Python, variables are not boxes at all — they are sticky luggage tags. The object itself (the integer 42, or the string \"Python\") lives independently on the heap. Assigning \"x = 42\" simply attaches the label \"x\" to the object 42. If you later write \"x = 'hello'\", you peel the tag off 42 and stick it onto the string \"hello\".",
      "metaphor": "variable = sticky label tag; object = physical item on the warehouse floor; assignment (=) = peeling and pasting the label."
    },
    "problemSolved": {
      "title": "Eliminating Rigid Type Declarations and Memory Allocation Overhead",
      "description": "Statically typed languages force engineers to declare variable types and reserve memory up-front. Python's reference-based dynamic model eliminates boilerplate, enabling rapid prototyping while maintaining rich runtime introspection.",
      "keyPoints": [
        "Dynamic typing: A variable can reference any type of object at any point in time without compilation errors.",
        "Automatic memory management: When all tags are removed from an object, Python's garbage collector frees it.",
        "High expressiveness: Functions and algorithms can operate polymorphically across numeric and text types."
      ]
    },
    "intuition": {
      "overview": "Every value in Python is a full-fledged heap object containing metadata: its type, its value, and a reference counter.",
      "steps": [
        {
          "step": 1,
          "title": "Right-hand side evaluation first",
          "description": "In \"x = 10 + 5\", Python first computes the expression on the right (15) and creates an integer object 15 in memory."
        },
        {
          "step": 2,
          "title": "Tag attachment (Binding)",
          "description": "Python enters the identifier \"x\" into the current namespace dictionary and points it to the memory address of 15."
        },
        {
          "step": 3,
          "title": "Aliasing with multiple tags",
          "description": "When you execute \"y = x\", Python does NOT copy 15. It simply attaches tag \"y\" to the exact same object 15."
        },
        {
          "step": 4,
          "title": "Re-binding vs In-place mutation",
          "description": "Integers are immutable. Writing \"x = x + 1\" creates a new object 16 and moves tag \"x\" to it. Tag \"y\" continues pointing to 15."
        }
      ]
    },
    "codeExample": {
      "title": "Declaring Variables and Inspecting Types in Python",
      "code": "# 1. Primitive data types in Python\nuser_age = 25                  # int (arbitrary precision)\naccount_balance = 1429.50      # float (IEEE 754 double)\nis_authenticated = True        # bool (subclass of int: True == 1)\nsession_token = None           # NoneType (singleton representing absence)\n\n# 2. Inspecting runtime type and memory identity\nprint(f\"user_age: value={user_age}, type={type(user_age).__name__}, id={id(user_age)}\")\nprint(f\"is_authenticated: value={is_authenticated}, type={type(is_authenticated).__name__}\")\nprint(f\"session_token: value={session_token}, type={type(session_token).__name__}\")\n\n# 3. Dynamic rebinding (type changes seamlessly)\ndata_payload = 100\nprint(\"Initial:\", type(data_payload))\ndata_payload = \"Encrypted string payload\"\nprint(\"After rebinding:\", type(data_payload))",
      "explanation": "Notice how data_payload seamlessly changed from an int to a str without requiring any casting syntax. Both type() and id() allow us to verify the type and memory address of each object."
    },
    "runnableCode": {
      "code": "# Experiment with variable binding and identity\na = 256\nb = 256\nprint(\"a is b (small int caching):\", a is b)\n\n# Rebinding\nx = 10\ny = x\nprint(f\"Before: x={x}, y={y}, id(x)==id(y): {id(x) == id(y)}\")\n\nx += 5\nprint(f\"After x += 5: x={x}, y={y}, id(x)==id(y): {id(x) == id(y)}\")\n\n# Checking None identity\nres = None\nprint(\"res is None:\", res is None)",
      "expectedOutput": "a is b (small int caching): True\nBefore: x=10, y=10, id(x)==id(y): True\nAfter x += 5: x=15, y=10, id(x)==id(y): False\nres is None: True"
    },
    "lineByLineExplanation": [
      {
        "line": "1-2",
        "lines": "1-2",
        "code": "user_age = 25",
        "codeSnippet": "user_age = 25",
        "explanation": "Evaluates the integer literal 25, allocates a PyLongObject on the heap, and inserts (\"user_age\", ptr) into the local namespace dictionary."
      },
      {
        "line": "3-4",
        "lines": "3-4",
        "code": "account_balance = 1429.50",
        "codeSnippet": "account_balance = 1429.50",
        "explanation": "Creates a 64-bit IEEE-754 double precision floating point object and binds the name \"account_balance\" to it."
      },
      {
        "line": "5-6",
        "lines": "5-6",
        "code": "is_authenticated = True",
        "codeSnippet": "is_authenticated = True",
        "explanation": "Binds to the boolean singleton object True. In Python, bool is actually an explicit subclass of int, where True == 1 and False == 0."
      },
      {
        "line": "7-8",
        "lines": "7-8",
        "code": "session_token = None",
        "codeSnippet": "session_token = None",
        "explanation": "Binds to the singleton object None (the only instance of NoneType), used conventionally to denote missing or uninitialized values."
      },
      {
        "line": "10-12",
        "lines": "10-12",
        "code": "type(user_age).__name__",
        "codeSnippet": "type(user_age).__name__",
        "explanation": "Accesses the __class__ pointer of the object to retrieve its type name (\"int\") dynamically at runtime."
      },
      {
        "line": "14-17",
        "lines": "14-17",
        "code": "id(user_age)",
        "codeSnippet": "id(user_age)",
        "explanation": "Returns the unique memory address integer of the object in CPython. Used to check if two variables point to the identical object via \"is\"."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using \"==\" instead of \"is\" to compare with None",
        "solution": "Always use \"if x is None:\" or \"if x is not None:\", never \"if x == None:\". Custom classes can override __eq__ to return unexpected results."
      },
      {
        "mistake": "Assuming variables hold copies of primitives",
        "solution": "Remember that assignment never copies. For immutable types rebinding creates a new object, but for lists or dicts you must use copy.copy()."
      },
      {
        "mistake": "Using Python keywords or built-ins as variable names",
        "solution": "Never name variables list, dict, str, int, set, id, or type. Use descriptive plural names like user_list or item_types."
      },
      {
        "mistake": "Violating PEP 8 naming conventions",
        "solution": "Use snake_case for variables and functions (user_age), and UPPER_SNAKE_CASE for constants (MAX_RETRIES = 3)."
      }
    ],
    "bestPractices": [
      "Follow PEP 8: use snake_case for variables (e.g., total_revenue, user_email).",
      "Use UPPER_CASE for constants that should not be reassigned (e.g., TIMEOUT_SECONDS = 30).",
      "Always test for None using identity: \"if response is None:\" rather than equality \"if response == None:\".",
      "Use type hints (PEP 484) in modern Python: \"def process(age: int, name: str) -> bool:\".",
      "Keep variable names descriptive; avoid single-letter names except for index loops (i, j, k) or coordinates (x, y)."
    ],
    "applications": [
      {
        "industry": "Data Pipelines",
        "application": "Schema Normalization",
        "benefit": "Tracking schema types, handling nullable fields with NoneType, and normalizing numeric columns."
      },
      {
        "industry": "Web Backend (FastAPI / Django)",
        "application": "Request Validation",
        "benefit": "Type annotations on request models ensure automatic validation and serialization."
      },
      {
        "industry": "Financial Computing",
        "application": "Monetary Representation",
        "benefit": "Distinguishing float approximations from Decimal precision for high-integrity monetary transactions."
      },
      {
        "industry": "Machine Learning",
        "application": "Tensor Data Types",
        "benefit": "Differentiating Python native types from NumPy ndarray dtypes (float32 vs float64)."
      }
    ],
    "practiceQuestions": [
      {
        "id": "py-vars-q1",
        "question": "What is the output of: a = [1, 2]; b = a; b.append(3); print(len(a))? Why?",
        "hint": "Consider whether assignment creates a new list or copies a pointer reference.",
        "answer": "Output is 3. In Python, \"b = a\" does not copy the list; both \"a\" and \"b\" point to the exact same list object in heap memory. Calling b.append(3) modifies that shared object, so len(a) is now 3."
      },
      {
        "id": "py-vars-q2",
        "question": "What does \"a is b\" test in Python compared to \"a == b\"?",
        "hint": "Think about memory identity versus value equality.",
        "answer": "\"a == b\" tests equality of values (invoking __eq__), while \"a is b\" tests identity — whether both variables point to the exact same object at the same memory address (id(a) == id(b))."
      },
      {
        "id": "py-vars-q3",
        "question": "Why does Python evaluate True + True to 2?",
        "hint": "Look at the class hierarchy of bool in Python.",
        "answer": "In Python, \"bool\" is an explicit subclass of \"int\". The singleton True has integer value 1, and False has integer value 0. Therefore, 1 + 1 evaluates to 2."
      }
    ],
    "quiz": [
      {
        "id": "py-vars-quiz-1",
        "question": "Which of the following is the Pythonic way to check if a variable \"result\" is None?",
        "options": [
          "if result == None:",
          "if result is None:",
          "if result.is_none():",
          "if isNull(result):"
        ],
        "correctIndex": 1,
        "explanation": "PEP 8 recommends always using \"is None\" or \"is not None\" because \"is\" tests identity against the singleton object None and cannot be overridden by __eq__ methods."
      },
      {
        "id": "py-vars-quiz-2",
        "question": "What happens in memory when you execute: x = 10; x = \"hello\"?",
        "options": [
          "The integer memory block at x is overwritten with ASCII characters",
          "A compilation error is thrown because Python is statically typed",
          "A new string object \"hello\" is created and label \"x\" is bound to it; the int 10 is dereferenced",
          "Python creates a union type container storing both 10 and \"hello\""
        ],
        "correctIndex": 2,
        "explanation": "Variables in Python are names bound to objects. Reassigning x simply points the name to the new string object. The old int 10 has its reference count decremented."
      },
      {
        "id": "py-vars-quiz-3",
        "question": "According to PEP 8, what naming convention should be used for constants that should not change?",
        "options": [
          "camelCase (maxConnections)",
          "snake_case (max_connections)",
          "UPPER_SNAKE_CASE (MAX_CONNECTIONS)",
          "kebab-case (max-connections)"
        ],
        "correctIndex": 2,
        "explanation": "PEP 8 dictates UPPER_SNAKE_CASE for constants (e.g. DATABASE_TIMEOUT = 30) to signal to developers that the value should not be modified."
      },
      {
        "id": "py-vars-quiz-4",
        "question": "What will \"type(10 / 2)\" return in Python 3?",
        "options": [
          "<class \"int\">",
          "<class \"float\">",
          "<class \"number\">",
          "<class \"double\">"
        ],
        "correctIndex": 1,
        "explanation": "In Python 3, standard division (/) always returns a float (5.0), even if the numbers divide evenly. To perform integer floor division, use the // operator."
      }
    ],
    "codingChallenge": {
      "title": "Type Inspector and Value Sanitizer",
      "problem": "Write a function \"sanitize_and_inspect(data)\" that takes a list of mixed-type items and returns a dictionary with counts of each primitive type (\"int\", \"float\", \"str\", \"bool\", \"NoneType\"). Important gotcha: in Python, isinstance(True, int) is True, so you must identify booleans before integers!",
      "hints": [
        "Notice that isinstance(True, int) is True because bool inherits from int. Check isinstance(item, bool) BEFORE isinstance(item, int)!",
        "Check for None using \"item is None\".",
        "You can check types with isinstance() or type(item).__name__."
      ],
      "starterCode": "def sanitize_and_inspect(data):\n    # Count occurrences of primitive types: int, float, str, bool, NoneType\n    counts = {\"int\": 0, \"float\": 0, \"str\": 0, \"bool\": 0, \"NoneType\": 0}\n    \n    # Your code here\n    \n    return counts\n\n# Test case:\nsample = [1, 2.5, \"hi\", True, None, False, 42, \"python\"]\nprint(sanitize_and_inspect(sample))",
      "solution": "def sanitize_and_inspect(data):\n    counts = {\"int\": 0, \"float\": 0, \"str\": 0, \"bool\": 0, \"NoneType\": 0}\n    for item in data:\n        if item is None:\n            counts[\"NoneType\"] += 1\n        elif isinstance(item, bool):\n            counts[\"bool\"] += 1\n        elif isinstance(item, int):\n            counts[\"int\"] += 1\n        elif isinstance(item, float):\n            counts[\"float\"] += 1\n        elif isinstance(item, str):\n            counts[\"str\"] += 1\n    return counts\n\n# Test case:\nsample = [1, 2.5, \"hi\", True, None, False, 42, \"python\"]\n# Expected: {'int': 2, 'float': 1, 'str': 2, 'bool': 2, 'NoneType': 1}\nprint(sanitize_and_inspect(sample))"
    },
    "summary": {
      "keyTakeaways": [
        "Variables in Python are object references (labels), not memory boxes.",
        "Core primitives are int (arbitrary precision), float (IEEE 754), bool (subclass of int), and NoneType.",
        "Assignment \"y = x\" binds a new label to the existing object without copying.",
        "Use \"is None\" instead of \"== None\" for reliable singleton identity comparison.",
        "Follow PEP 8: snake_case for variables, UPPER_CASE for constants."
      ],
      "nextLessonId": "py-fundamentals-type-conversion",
      "nextLessonTitle": "Type Conversion and Casting",
      "nextLessonModuleId": "python-module-1"
    },
    "lineByLine": [
      {
        "line": "1-2",
        "lines": "1-2",
        "code": "user_age = 25",
        "codeSnippet": "user_age = 25",
        "explanation": "Evaluates the integer literal 25, allocates a PyLongObject on the heap, and inserts (\"user_age\", ptr) into the local namespace dictionary."
      },
      {
        "line": "3-4",
        "lines": "3-4",
        "code": "account_balance = 1429.50",
        "codeSnippet": "account_balance = 1429.50",
        "explanation": "Creates a 64-bit IEEE-754 double precision floating point object and binds the name \"account_balance\" to it."
      },
      {
        "line": "5-6",
        "lines": "5-6",
        "code": "is_authenticated = True",
        "codeSnippet": "is_authenticated = True",
        "explanation": "Binds to the boolean singleton object True. In Python, bool is actually an explicit subclass of int, where True == 1 and False == 0."
      },
      {
        "line": "7-8",
        "lines": "7-8",
        "code": "session_token = None",
        "codeSnippet": "session_token = None",
        "explanation": "Binds to the singleton object None (the only instance of NoneType), used conventionally to denote missing or uninitialized values."
      },
      {
        "line": "10-12",
        "lines": "10-12",
        "code": "type(user_age).__name__",
        "codeSnippet": "type(user_age).__name__",
        "explanation": "Accesses the __class__ pointer of the object to retrieve its type name (\"int\") dynamically at runtime."
      },
      {
        "line": "14-17",
        "lines": "14-17",
        "code": "id(user_age)",
        "codeSnippet": "id(user_age)",
        "explanation": "Returns the unique memory address integer of the object in CPython. Used to check if two variables point to the identical object via \"is\"."
      }
    ]
  },
  "py-fundamentals-execution-model": {
    "id": "py-fundamentals-execution-model",
    "moduleId": "python-module-1",
    "title": "Python Execution Model",
    "subtitle": "From Source Code to Bytecode to CPython Virtual Machine Evaluation",
    "order": 1,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Trace how CPython compiles human-readable source (.py) into bytecode (.pyc).",
      "Understand the CPython Virtual Machine (PVM) stack-based evaluation loop.",
      "Inspect real bytecode instructions using the standard `dis` module.",
      "Differentiate between compiled, interpreted, and JIT-compiled languages."
    ],
    "prerequisites": [
      "Basic command line familiarity"
    ],
    "analogy": {
      "title": "The Sheet Music and the Player Piano",
      "text": "A composer writes sheet music in Italian notations (source code). A mechanical transcriber punches holes onto a paper roll (bytecode compilation). Finally, the player piano reads the punched roll step-by-step and presses the keys to produce music (the Python Virtual Machine executing bytecode).",
      "metaphor": "Python is both compiled (to bytecode) and interpreted (by the virtual machine)."
    },
    "problemSolved": {
      "title": "Demystifying How Python Actually Executes Your Programs",
      "description": "Beginners often think Python executes text lines directly like a shell script. In reality, Python compiles source code to an optimized intermediate bytecode representation (.pyc) that executes on a stack-based virtual machine.",
      "keyPoints": [
        "Source is parsed into an Abstract Syntax Tree (AST) then compiled to bytecode.",
        "Bytecode is cached in __pycache__ directory for rapid subsequent startups.",
        "CPython is written in C and evaluates opcodes in a giant evaluation loop (ceval.c)."
      ]
    },
    "intuition": {
      "overview": "When you run `python app.py`: 1. Parser reads source and generates AST; 2. Compiler generates bytecode (.pyc); 3. CPython PVM executes bytecode instructions one by one using an evaluation stack.",
      "steps": [
        {
          "step": 1,
          "title": "Lexing & Parsing",
          "description": "Source code text is tokenized into grammar tokens and built into an AST."
        },
        {
          "step": 2,
          "title": "Bytecode Compilation",
          "description": "AST is compiled into a sequence of bytecode opcodes stored in a code object."
        },
        {
          "step": 3,
          "title": "Virtual Machine Execution",
          "description": "The PVM maintains a value stack and frame stack, executing each opcode sequentially."
        }
      ]
    },
    "codeExample": {
      "title": "Disassembling Python Bytecode with `dis`",
      "code": "import dis\n\ndef calculate(a, b):\n    return a + b * 2\n\ndis.dis(calculate)",
      "explanation": "The `dis` module disassembles a Python function into human-readable bytecode instructions."
    },
    "runnableCode": {
      "code": "import dis\n\ndef add(x, y):\n    return x + y\n\ndis.dis(add)",
      "expectedOutput": "  4           0 RESUME                   0\n\n  5           2 LOAD_FAST                0 (x)\n              4 LOAD_FAST                1 (y)\n              6 BINARY_OP                0 (+)\n             10 RETURN_VALUE"
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "LOAD_FAST 0 (x)",
        "codeSnippet": "LOAD_FAST 0 (x)",
        "explanation": "Pushes local variable x onto the virtual machine evaluation stack."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "LOAD_FAST 1 (y)",
        "codeSnippet": "LOAD_FAST 1 (y)",
        "explanation": "Pushes local variable y onto the virtual machine evaluation stack."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "BINARY_OP 0 (+)",
        "codeSnippet": "BINARY_OP 0 (+)",
        "explanation": "Pops top two stack values, adds them, and pushes result."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "RETURN_VALUE",
        "codeSnippet": "RETURN_VALUE",
        "explanation": "Pops result from stack and returns to caller."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Thinking Python is purely interpreted without a compilation step",
        "solution": "Python always compiles to bytecode first; it just happens automatically in memory without manual javac/gcc steps.",
        "codeExample": "# Python creates __pycache__/*.pyc bytecode caches"
      }
    ],
    "bestPractices": [
      "Do not commit __pycache__/ folders to Git (add to .gitignore).",
      "Use python -m py_compile to check syntax of large codebases without running code."
    ],
    "applications": [
      {
        "industry": "Software Engineering",
        "application": "Performance profiling and bytecode optimization",
        "benefit": "Allows identifying instruction bottlenecks in Python."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-em-1",
        "question": "What is stored inside the `__pycache__` directory?",
        "hint": ".pyc files.",
        "answer": "Compiled bytecode files (.pyc) that allow Python to load imported modules faster without re-parsing source text."
      }
    ],
    "quiz": [
      {
        "id": "q-em-1",
        "question": "What is the default and official implementation of Python?",
        "options": [
          "CPython",
          "PyPy",
          "Jython",
          "IronPython"
        ],
        "correctIndex": 0,
        "explanation": "CPython, written in C, is the reference implementation developed by Guido van Rossum and the Python core team."
      }
    ],
    "codingChallenge": {
      "title": "Bytecode Inspection Utility",
      "problem": "Write a function that accepts any callable function and returns a list of its bytecode opcode names.",
      "hints": [
        "Use dis.get_instructions(func)."
      ],
      "starterCode": "import dis\n\ndef get_opcodes(func) -> list[str]:\n    # TODO: Return list of opcode names\n    pass",
      "solution": "import dis\n\ndef get_opcodes(func) -> list[str]:\n    return [instr.opname for instr in dis.get_instructions(func)]"
    },
    "summary": {
      "keyTakeaways": [
        "CPython compiles source to bytecode before evaluating it on the PVM stack.",
        "The dis module reveals underlying bytecode opcodes."
      ],
      "nextLessonId": "py-fundamentals-variables",
      "nextLessonTitle": "Variables, Naming, and Primitive Types",
      "nextLessonModuleId": "python-module-1"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "LOAD_FAST 0 (x)",
        "codeSnippet": "LOAD_FAST 0 (x)",
        "explanation": "Pushes local variable x onto the virtual machine evaluation stack."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "LOAD_FAST 1 (y)",
        "codeSnippet": "LOAD_FAST 1 (y)",
        "explanation": "Pushes local variable y onto the virtual machine evaluation stack."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "BINARY_OP 0 (+)",
        "codeSnippet": "BINARY_OP 0 (+)",
        "explanation": "Pops top two stack values, adds them, and pushes result."
      },
      {
        "line": 7,
        "lines": "7",
        "code": "RETURN_VALUE",
        "codeSnippet": "RETURN_VALUE",
        "explanation": "Pops result from stack and returns to caller."
      }
    ]
  },
  "py-fundamentals-type-conversion": {
    "id": "py-fundamentals-type-conversion",
    "moduleId": "python-module-1",
    "title": "Type Conversion and Casting",
    "subtitle": "Implicit Coercion vs Explicit Casting with int(), float(), str(), and bool()",
    "order": 3,
    "readTimeMinutes": 16,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Distinguish between implicit type coercion (e.g. int + float -> float) and explicit casting.",
      "Master conversion functions: int(), float(), str(), bool(), and chr()/ord().",
      "Handle ValueError exceptions when converting invalid string numerals.",
      "Understand base conversions (e.g. int(\"1010\", 2) for binary)."
    ],
    "prerequisites": [
      "Variables, Naming, and Primitive Types"
    ],
    "analogy": {
      "title": "The Currency Exchange Counter",
      "text": "If you have a 10-dollar bill and a 50-cent coin, your wallet total automatically becomes $10.50 (implicit coercion: integer promotes to float). But if you have a piece of paper that says \"500\" written in ink, you must take it to the bank teller and explicitly convert the written words into real cash (explicit casting: int(\"500\")).",
      "metaphor": "Implicit conversion happens automatically without data loss; explicit casting requires deliberate functions."
    },
    "problemSolved": {
      "title": "Safe Data Transformation Across Heterogeneous Sources",
      "description": "User inputs, CSV files, and API endpoints always arrive as raw text strings. Type conversion transforms text into mathematical numbers or booleans safely.",
      "keyPoints": [
        "input() always returns str; must explicitly cast to int() or float().",
        "int() truncates floats towards zero; round() rounds to nearest even.",
        "int(s, base) parses binary, hex, and octal strings."
      ]
    },
    "intuition": {
      "overview": "Use constructor functions as converters: int(\"42\") -> 42; float(\"3.14\") -> 3.14; str(100) -> \"100\"; bool(\"\") -> False.",
      "steps": [
        {
          "step": 1,
          "title": "String to Number",
          "description": "Wrap string in int() or float()."
        },
        {
          "step": 2,
          "title": "Number to String",
          "description": "Wrap in str() or use f-strings."
        },
        {
          "step": 3,
          "title": "Truthiness",
          "description": "bool(x) evaluates whether x is truthy or falsy."
        }
      ]
    },
    "codeExample": {
      "title": "Type Conversions in Practice",
      "code": "num_str = \"100\"\nnum_int = int(num_str)        # 100\nnum_float = float(num_int)    # 100.0\nbin_val = int(\"1101\", 2)      # 13 (binary to decimal)\nhex_val = hex(255)            # '0xff'\nback_to_str = str(num_float)  # \"100.0\"",
      "explanation": "Demonstrates common explicit conversions and base parsing in Python."
    },
    "runnableCode": {
      "code": "print(int(\"42\"))\nprint(float(\"3.1415\"))\nprint(int(\"1010\", 2))\nprint(bool(\"\"))\nprint(bool(\"non-empty\"))",
      "expectedOutput": "42\n3.1415\n10\nFalse\nTrue"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "int(\"1010\", 2)",
        "codeSnippet": "int(\"1010\", 2)",
        "explanation": "Parses string as base-2 binary, yielding integer 10."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "bool(\"\")",
        "codeSnippet": "bool(\"\")",
        "explanation": "Empty string is falsy, evaluates to False."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Trying to cast float strings directly with int(\"3.14\")",
        "solution": "int(\"3.14\") raises ValueError; cast to float first then int: int(float(\"3.14\")).",
        "codeExample": "val = int(float(\"3.14\")) # correct"
      }
    ],
    "bestPractices": [
      "Always wrap user-input casting in try/except ValueError blocks.",
      "Use math.floor or math.ceil rather than int() if specific rounding direction is needed."
    ],
    "applications": [
      {
        "industry": "Data Engineering",
        "application": "ETL pipelines parsing CSV text records into database numerical columns",
        "benefit": "Ensures schema type integrity."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-tc-1",
        "question": "What does int(-3.7) evaluate to in Python?",
        "hint": "Truncates toward zero.",
        "answer": "-3 (int() strips decimal fraction toward zero)."
      }
    ],
    "quiz": [
      {
        "id": "q-tc-1",
        "question": "What happens when you run `int(\"hello\")`?",
        "options": [
          "Raises ValueError",
          "Returns 0",
          "Returns None",
          "Returns NaN"
        ],
        "correctIndex": 0,
        "explanation": "Python raises ValueError: invalid literal for int() with base 10: 'hello'."
      }
    ],
    "codingChallenge": {
      "title": "Safe String to Integer Converter",
      "problem": "Write a function safe_int(s, default_val=0) that converts string s to an integer. If s cannot be parsed, return default_val without crashing.",
      "hints": [
        "Use try/except ValueError."
      ],
      "starterCode": "def safe_int(s: str, default_val: int = 0) -> int:\n    # TODO: Safely convert string to int\n    pass",
      "solution": "def safe_int(s: str, default_val: int = 0) -> int:\n    try:\n        return int(s)\n    except (ValueError, TypeError):\n        return default_val"
    },
    "summary": {
      "keyTakeaways": [
        "int(), float(), str(), bool() perform explicit type casting.",
        "Always handle ValueError when parsing untrusted string inputs."
      ],
      "nextLessonId": "py-fundamentals-operators",
      "nextLessonTitle": "Operators: Arithmetic, Comparison, and Logical",
      "nextLessonModuleId": "python-module-1"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "int(\"1010\", 2)",
        "codeSnippet": "int(\"1010\", 2)",
        "explanation": "Parses string as base-2 binary, yielding integer 10."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "bool(\"\")",
        "codeSnippet": "bool(\"\")",
        "explanation": "Empty string is falsy, evaluates to False."
      }
    ]
  },
  "py-fundamentals-operators": {
    "id": "py-fundamentals-operators",
    "moduleId": "python-module-1",
    "title": "Operators: Arithmetic, Comparison, and Logical",
    "subtitle": "Precedence, Floor Division, Short-Circuit Evaluation, and the Walrus Operator",
    "order": 4,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Master all arithmetic operators: +, -, *, /, // (floor div), % (modulo), and ** (power).",
      "Understand true division / (always returns float) vs floor division //.",
      "Apply short-circuit evaluation in logical `and` and `or`.",
      "Utilize the Walrus operator := (assignment expressions) introduced in Python 3.8."
    ],
    "prerequisites": [
      "Variables, Naming, and Primitive Types"
    ],
    "analogy": {
      "title": "Electrical Switches in Series and Parallel",
      "text": "In electrical engineering, two switches in series require BOTH to be on for electricity to flow (logical AND). If switch A is open (off), electricity stops immediately without checking switch B (short-circuit). Two switches in parallel only need ONE to be on (logical OR). If switch A is on, current flows without checking switch B.",
      "metaphor": "Short-circuit evaluation stops evaluating logical chains as soon as the outcome is guaranteed."
    },
    "problemSolved": {
      "title": "Writing Expressive, Efficient Computational Expressions",
      "description": "Operators perform calculations and conditional evaluation. Understanding operator precedence prevents subtle calculation bugs, while short-circuiting prevents NullPointer / ZeroDivision crashes.",
      "keyPoints": [
        "// truncates towards negative infinity (floor division).",
        "Short-circuiting: `if obj and obj.is_valid():` safely avoids AttributeError on None.",
        "Walrus operator `:=` assigns and evaluates an expression in a single line."
      ]
    },
    "intuition": {
      "overview": "Arithmetic follows PEMDAS precedence. Logical AND stops on first False; logical OR stops on first True.",
      "steps": [
        {
          "step": 1,
          "title": "Arithmetic",
          "description": "7 // 2 = 3; 7 / 2 = 3.5; 7 % 2 = 1."
        },
        {
          "step": 2,
          "title": "Chained Comparisons",
          "description": "Python supports natural mathematical chains: 1 < x < 10."
        },
        {
          "step": 3,
          "title": "Assignment Expressions",
          "description": "if (n := len(data)) > 0: uses n immediately."
        }
      ]
    },
    "codeExample": {
      "title": "Operator Mechanics and Walrus Operator",
      "code": "# Floor division with negatives\nprint(7 // 2)   # 3\nprint(-7 // 2)  # -4 (floors toward -inf, unlike C/Java!)\n\n# Short circuit evaluation\ndef risky():\n    print(\"Called!\")\n    return True\n\nprint(False and risky()) # risky() is NEVER called!\n\n# Walrus operator :=\nif (n := len([1, 2, 3])) > 2:\n    print(f\"List has {n} items\")",
      "explanation": "Demonstrates Python floor division behavior, short-circuit skipping, and the walrus operator."
    },
    "runnableCode": {
      "code": "print(7 // 2)\nprint(-7 // 2)\nprint(2 ** 8)\nprint(1 < 5 < 10)\nx = (val := 42) + 8\nprint(val, x)",
      "expectedOutput": "3\n-4\n256\nTrue\n42 50"
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "-7 // 2",
        "codeSnippet": "-7 // 2",
        "explanation": "Floors down toward negative infinity: -3.5 floors to -4."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "1 < 5 < 10",
        "codeSnippet": "1 < 5 < 10",
        "explanation": "Chained comparison: automatically expands to 1 < 5 and 5 < 10."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "x = (val := 42) + 8",
        "codeSnippet": "x = (val := 42) + 8",
        "explanation": "Assigns 42 to val and uses 42 in the addition expression."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Expecting -7 // 2 to equal -3 like in C or Java",
        "solution": "Python floor division always rounds towards negative infinity (-inf); -3.5 rounds to -4.",
        "codeExample": "import math\ntrunc = int(-7 / 2) # gives -3"
      }
    ],
    "bestPractices": [
      "Use parentheses to clarify complex operator precedence.",
      "Use the walrus operator := in while loops reading streams to avoid duplicate input calls."
    ],
    "applications": [
      {
        "industry": "Data Processing",
        "application": "Streaming data chunk processing with walrus operator",
        "benefit": "Reads chunks until empty in clean while loops."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-op-1",
        "question": "What does the expression `[] or \"default\"` evaluate to?",
        "hint": "Logical OR returns the first truthy operand.",
        "answer": "\"default\" (empty list is falsy, so OR evaluates and returns the second operand)."
      }
    ],
    "quiz": [
      {
        "id": "q-op-1",
        "question": "What does `10 / 2` evaluate to in Python 3?",
        "options": [
          "5.0 (float)",
          "5 (int)",
          "10",
          "TypeError"
        ],
        "correctIndex": 0,
        "explanation": "The true division operator / always returns a float in Python 3, even if the division is exact."
      }
    ],
    "codingChallenge": {
      "title": "Even or Odd Bitwise Check",
      "problem": "Write a function is_even(n) that checks if an integer is even using the bitwise AND operator & instead of modulo %.",
      "hints": [
        "Even numbers have their lowest bit set to 0: (n & 1) == 0."
      ],
      "starterCode": "def is_even(n: int) -> bool:\n    # TODO: Check if even using bitwise &\n    pass",
      "solution": "def is_even(n: int) -> bool:\n    return (n & 1) == 0"
    },
    "summary": {
      "keyTakeaways": [
        "// floors toward -infinity.",
        "Short-circuit evaluation protects against errors.",
        ":= assigns and returns values simultaneously."
      ],
      "nextLessonId": "py-fundamentals-input-output",
      "nextLessonTitle": "Input and Output",
      "nextLessonModuleId": "python-module-1"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "-7 // 2",
        "codeSnippet": "-7 // 2",
        "explanation": "Floors down toward negative infinity: -3.5 floors to -4."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "1 < 5 < 10",
        "codeSnippet": "1 < 5 < 10",
        "explanation": "Chained comparison: automatically expands to 1 < 5 and 5 < 10."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "x = (val := 42) + 8",
        "codeSnippet": "x = (val := 42) + 8",
        "explanation": "Assigns 42 to val and uses 42 in the addition expression."
      }
    ]
  },
  "py-fundamentals-input-output": {
    "id": "py-fundamentals-input-output",
    "moduleId": "python-module-1",
    "title": "Input and Output",
    "subtitle": "Formatted String Literals (f-strings), print() Parameters, and stdin Processing",
    "order": 5,
    "readTimeMinutes": 18,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Format strings with modern Python f-strings, format specifiers (.2f, :05d, :>10), and alignment.",
      "Control print() using `sep`, `end`, and `flush` arguments.",
      "Read user input via `input()` and strip whitespace.",
      "Process multiple space-separated inputs via `sys.stdin.read()` for competitive programming."
    ],
    "prerequisites": [
      "Variables, Naming, and Primitive Types"
    ],
    "analogy": {
      "title": "The Post Office Label Printer",
      "text": "When printing a shipping label, the computer doesn't just smash text together; it pads the customer ID to 8 digits with leading zeros (00048291), formats currency with two decimals ($14.99), and right-aligns addresses. Modern f-strings act as an intelligent template printer.",
      "metaphor": "f-strings embed expressions and format specifiers directly inside string quotes."
    },
    "problemSolved": {
      "title": "Clean, Expressive String Formatting and Stream I/O",
      "description": "Old % formatting and str.format() were verbose and error-prone. Python 3.6+ f-strings allow embedding arbitrary Python expressions, math, and alignment specs directly into string literals.",
      "keyPoints": [
        "f-strings evaluate expressions at runtime.",
        "Format specifiers format floats `:.2f` and pad numbers `:04d`.",
        "`print(..., sep=\", \", end=\"\")` controls terminal separators."
      ]
    },
    "intuition": {
      "overview": "Prefix string with `f\"...\"` and put variables or expressions inside curly braces `{}`. Add formatting after colon: `{pi:.2f}` rounds to 2 decimal places.",
      "steps": [
        {
          "step": 1,
          "title": "Variable Interpolation",
          "description": "f\"Hello, {name}!\""
        },
        {
          "step": 2,
          "title": "Format Specifiers",
          "description": "f\"{price:.2f}\" formats 19.5 to \"19.50\"."
        },
        {
          "step": 3,
          "title": "Print Control",
          "description": "print(a, b, sep=\" | \", end=\"\\n\")"
        }
      ]
    },
    "codeExample": {
      "title": "Advanced F-String Formatting",
      "code": "name = \"Alice\"\nscore = 95.6789\nid_num = 42\n\n# Format specifiers\nprint(f\"Name: {name:>10}\")      # Right-aligned in 10 characters\nprint(f\"Score: {score:.2f}\")     # 2 decimal places: 95.68\nprint(f\"ID: {id_num:05d}\")       # Zero-padded: 00042\nprint(f\"Hex: {id_num:#04x}\")     # 0x2a\n\n# Self-documenting expressions (Python 3.8+)\nx = 10\nprint(f\"{x * 2 = }\")             # Prints \"x * 2 = 20\"",
      "explanation": "Demonstrates padding, floating precision, alignment, and debug f-strings."
    },
    "runnableCode": {
      "code": "pi = 3.14159265\ncount = 7\nprint(f\"{pi:.2f}\")\nprint(f\"{count:04d}\")\nprint(\"A\", \"B\", \"C\", sep=\"-\", end=\"!\")",
      "expectedOutput": "3.14\n0007\nA-B-C!"
    },
    "lineByLineExplanation": [
      {
        "line": 3,
        "lines": "3",
        "code": "print(f\"{pi:.2f}\")",
        "codeSnippet": "print(f\"{pi:.2f}\")",
        "explanation": "Formats float pi rounded to 2 decimal places."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "print(f\"{count:04d}\")",
        "codeSnippet": "print(f\"{count:04d}\")",
        "explanation": "Pads integer count with leading zeros to width 4."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(\"A\", \"B\", \"C\", sep=\"-\", end=\"!\")",
        "codeSnippet": "print(\"A\", \"B\", \"C\", sep=\"-\", end=\"!\")",
        "explanation": "Joins items with \"-\" instead of space, and ends with \"!\" instead of newline."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Forgetting the \"f\" prefix in f\"...\"",
        "solution": "Writing \"{name}\" without the \"f\" outputs literal text \"{name}\"; always ensure the f prefix is present.",
        "codeExample": "f\"Hello {name}\" # with f"
      }
    ],
    "bestPractices": [
      "Prefer f-strings over %-formatting or .format().",
      "Use f\"{var=}\" for quick, readable debugging output."
    ],
    "applications": [
      {
        "industry": "CLI Tools",
        "application": "Command line progress bars and formatted data tables",
        "benefit": "Pads and aligns columns into tidy ASCII terminal tables."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-io-1",
        "question": "How can you format a number as a percentage with 1 decimal place using f-strings?",
        "hint": "Use :.1%",
        "answer": "f\"{0.856:.1%}\" formats to \"85.6%\"."
      }
    ],
    "quiz": [
      {
        "id": "q-io-1",
        "question": "What does the parameter `sep` do in the print() function?",
        "options": [
          "Specifies the string inserted between multiple printed arguments",
          "Separates print lines",
          "Splits strings",
          "Sets file encoding"
        ],
        "correctIndex": 0,
        "explanation": "sep defines the string delimiter placed between arguments (defaults to a single space \" \")."
      }
    ],
    "codingChallenge": {
      "title": "Format Receipt Row",
      "problem": "Write a function format_receipt_row(item, price, qty) that returns a string with item left-aligned (20 chars), qty right-aligned (5 chars), and total formatted as currency $XX.XX right-aligned (10 chars).",
      "hints": [
        "Use f\"{item:<20}{qty:>5}{total:>10.2f}\"."
      ],
      "starterCode": "def format_receipt_row(item: str, price: float, qty: int) -> str:\n    # TODO: Return formatted receipt line\n    pass",
      "solution": "def format_receipt_row(item: str, price: float, qty: int) -> str:\n    total = price * qty\n    return f\"{item:<20}{qty:>5} ${total:>9.2f}\""
    },
    "summary": {
      "keyTakeaways": [
        "F-strings embed expressions and format specifiers seamlessly.",
        "print(sep=..., end=...) controls console output layout."
      ],
      "nextLessonId": "py-fundamentals-comments",
      "nextLessonTitle": "Comments and Documentation",
      "nextLessonModuleId": "python-module-1"
    },
    "lineByLine": [
      {
        "line": 3,
        "lines": "3",
        "code": "print(f\"{pi:.2f}\")",
        "codeSnippet": "print(f\"{pi:.2f}\")",
        "explanation": "Formats float pi rounded to 2 decimal places."
      },
      {
        "line": 4,
        "lines": "4",
        "code": "print(f\"{count:04d}\")",
        "codeSnippet": "print(f\"{count:04d}\")",
        "explanation": "Pads integer count with leading zeros to width 4."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(\"A\", \"B\", \"C\", sep=\"-\", end=\"!\")",
        "codeSnippet": "print(\"A\", \"B\", \"C\", sep=\"-\", end=\"!\")",
        "explanation": "Joins items with \"-\" instead of space, and ends with \"!\" instead of newline."
      }
    ]
  },
  "py-fundamentals-comments": {
    "id": "py-fundamentals-comments",
    "moduleId": "python-module-1",
    "title": "Comments and Documentation",
    "subtitle": "PEP 257 Docstrings, Type Annotations, and Clean Code Readability",
    "order": 6,
    "readTimeMinutes": 14,
    "difficulty": "Beginner",
    "visualizerType": "none",
    "objectives": [
      "Differentiate between inline comments (#) and docstrings (\"\"\").",
      "Follow PEP 257 docstring conventions for modules, classes, and functions.",
      "Understand how Python attaches docstrings to the runtime `__doc__` attribute.",
      "Use Sphinx / Google style docstrings for automated documentation generation."
    ],
    "prerequisites": [
      "Python Fundamentals"
    ],
    "analogy": {
      "title": "Code is Written Once but Read Hundreds of Times",
      "text": "A chef in a restaurant kitchen labels spice jars not for themselves while cooking today, but for the sous chef working the breakfast shift tomorrow. Comments explain WHY an unusual ingredient was added; docstrings describe what the recipe makes.",
      "metaphor": "Comments explain the intent/why behind code; docstrings document the public API contract."
    },
    "problemSolved": {
      "title": "Maintainability and Team Collaboration in Large Codebases",
      "description": "Code that works today becomes unmaintainable in 6 months if the rationale is forgotten. Docstrings enable automated documentation tools (Sphinx, MkDocs) and IDE autocomplete tooltips.",
      "keyPoints": [
        "Docstrings are stored in object.__doc__ and inspected via help().",
        "Comments explain \"WHY\", not \"WHAT\" (the code already shows what).",
        "Supports Google, NumPy, and Sphinx docstring standards."
      ]
    },
    "intuition": {
      "overview": "Place triple quotes \"\"\" directly under a def or class declaration. Write a one-line summary, followed by Args, Returns, and Raises sections.",
      "steps": [
        {
          "step": 1,
          "title": "One-Line Summary",
          "description": "Imperative sentence: \"Calculate standard deviation of dataset.\""
        },
        {
          "step": 2,
          "title": "Args & Returns",
          "description": "Document parameters, expected types, and returned values."
        },
        {
          "step": 3,
          "title": "Runtime Access",
          "description": "Inspect using print(func.__doc__) or help(func)."
        }
      ]
    },
    "codeExample": {
      "title": "Google-Style Docstring Example",
      "code": "def calculate_bmi(weight_kg: float, height_m: float) -> float:\n    \"\"\"Calculates the Body Mass Index (BMI).\n\n    Args:\n        weight_kg: Weight in kilograms (must be positive).\n        height_m: Height in meters (must be positive).\n\n    Returns:\n        The calculated BMI as a float rounded to 2 decimal places.\n\n    Raises:\n        ValueError: If weight_kg or height_m is non-positive.\n    \"\"\"\n    if weight_kg <= 0 or height_m <= 0:\n        raise ValueError(\"Weight and height must be positive numbers.\")\n    return round(weight_kg / (height_m ** 2), 2)",
      "explanation": "Demonstrates a production-grade Google-style docstring with typed signatures."
    },
    "runnableCode": {
      "code": "def greet(name: str) -> str:\n    \"\"\"Returns a personalized greeting message.\"\"\"\n    return f\"Hello, {name}!\"\n\nprint(greet.__doc__)\nprint(greet(\"World\"))",
      "expectedOutput": "Returns a personalized greeting message.\nHello, World!"
    },
    "lineByLineExplanation": [
      {
        "line": 2,
        "lines": "2",
        "code": "\"\"\"Returns a personalized greeting message.\"\"\"",
        "codeSnippet": "\"\"\"Returns a personalized greeting message.\"\"\"",
        "explanation": "Docstring placed as the first statement of the function body."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(greet.__doc__)",
        "codeSnippet": "print(greet.__doc__)",
        "explanation": "Python automatically stores the docstring on the function object's __doc__ attribute."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Writing comments that restate the code: x = x + 1 # add 1 to x",
        "solution": "Comments should explain non-obvious business logic or algorithmic rationale, not narrate syntax.",
        "codeExample": "# Correct: Adjust for 1-based indexing required by API"
      }
    ],
    "bestPractices": [
      "Always use triple double quotes \"\"\" for docstrings.",
      "Keep inline comments fresh; out-of-date comments are worse than no comments."
    ],
    "applications": [
      {
        "industry": "Open Source",
        "application": "Public library API documentation (e.g. Requests, FastAPI, Scikit-learn)",
        "benefit": "Automatically generates searchable online HTML documentation."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-cdoc-1",
        "question": "How can you view the documentation of any built-in Python module or function in the interactive shell?",
        "hint": "help() function.",
        "answer": "Use help(object), e.g. help(str.split)."
      }
    ],
    "quiz": [
      {
        "id": "q-cdoc-1",
        "question": "Where is a Python docstring stored at runtime?",
        "options": [
          "In the object's `__doc__` attribute",
          "In a temporary file on disk",
          "Docstrings are deleted by the compiler",
          "In sys.modules"
        ],
        "correctIndex": 0,
        "explanation": "Python retains docstrings at runtime and attaches them to the `__doc__` attribute of functions, classes, and modules."
      }
    ],
    "codingChallenge": {
      "title": "Extract Docstring Summary",
      "problem": "Write a function get_summary(obj) that returns the first non-empty line of any object's docstring stripped of whitespace, or \"No documentation\" if None.",
      "hints": [
        "Check obj.__doc__."
      ],
      "starterCode": "def get_summary(obj) -> str:\n    # TODO: Extract first line of docstring\n    pass",
      "solution": "def get_summary(obj) -> str:\n    doc = getattr(obj, '__doc__', None)\n    if not doc:\n        return \"No documentation\"\n    lines = [line.strip() for line in doc.strip().splitlines() if line.strip()]\n    return lines[0] if lines else \"No documentation\""
    },
    "summary": {
      "keyTakeaways": [
        "Comments explain WHY; docstrings describe WHAT and HOW to use.",
        "Docstrings are preserved at runtime on the `__doc__` attribute."
      ],
      "nextLessonId": "py-fundamentals-debugging",
      "nextLessonTitle": "Basic Debugging Techniques",
      "nextLessonModuleId": "python-module-1"
    },
    "lineByLine": [
      {
        "line": 2,
        "lines": "2",
        "code": "\"\"\"Returns a personalized greeting message.\"\"\"",
        "codeSnippet": "\"\"\"Returns a personalized greeting message.\"\"\"",
        "explanation": "Docstring placed as the first statement of the function body."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "print(greet.__doc__)",
        "codeSnippet": "print(greet.__doc__)",
        "explanation": "Python automatically stores the docstring on the function object's __doc__ attribute."
      }
    ]
  },
  "py-fundamentals-debugging": {
    "id": "py-fundamentals-debugging",
    "moduleId": "python-module-1",
    "title": "Basic Debugging Techniques",
    "subtitle": "Tracebacks, Error Hierarchy, breakpoint(), and the pdb Debugger",
    "order": 7,
    "readTimeMinutes": 20,
    "difficulty": "Beginner",
    "visualizerType": "execution-trace",
    "objectives": [
      "Read and interpret Python tracebacks from bottom to top.",
      "Classify common runtime exceptions: IndexError, KeyError, TypeError, ValueError, and AttributeError.",
      "Use Python 3.7+ built-in `breakpoint()` to trigger the interactive pdb debugger.",
      "Master essential pdb navigation commands: n (next), s (step in), c (continue), p (print), and q (quit)."
    ],
    "prerequisites": [
      "Python Fundamentals"
    ],
    "analogy": {
      "title": "The Aircraft Flight Data Black Box",
      "text": "When an airplane experiences an issue, investigators recover the black box recorder. They don't just look at the final crash site; they read the altitude, engine speed, and cockpit recordings leading up to the incident second-by-second. A Python traceback is your code's black box recording.",
      "metaphor": "Tracebacks show the exact sequence of nested function calls leading to an error."
    },
    "problemSolved": {
      "title": "Systematic Bug Isolation vs Aimless Print Guessing",
      "description": "Scattering print() statements throughout code is slow and clutters production files. Using tracebacks and interactive breakpoints allows inspecting live variables and stepping through execution in seconds.",
      "keyPoints": [
        "Read tracebacks bottom-up: the last line states the exact error type and message.",
        "breakpoint() pauses execution and opens an interactive terminal in Python 3.7+.",
        "Essential pdb commands: n (step over), s (step into), p (inspect value)."
      ]
    },
    "intuition": {
      "overview": "When Python crashes, look at the very last line: it tells you WHAT failed (e.g. KeyError: \"user_id\"). Look at the lines above it: they tell you WHERE it failed (file and line number).",
      "steps": [
        {
          "step": 1,
          "title": "Read Error Type",
          "description": "Look at the last line: Exception class and description."
        },
        {
          "step": 2,
          "title": "Trace Origin",
          "description": "Look at the bottom file link: the exact line where execution halted."
        },
        {
          "step": 3,
          "title": "Drop a Breakpoint",
          "description": "Insert breakpoint() above the failure line to inspect variable values."
        }
      ]
    },
    "codeExample": {
      "title": "Reading Tracebacks and Using breakpoint()",
      "code": "def calculate_average(grades):\n    # If grades is empty, grades[0] raises IndexError\n    # Drop breakpoint to inspect grades before crash\n    # breakpoint() \n    return sum(grades) / len(grades)\n\n# Traceback example:\n# calculate_average([])\n# ZeroDivisionError: division by zero",
      "explanation": "Illustrates how empty inputs cause zero division and how breakpoints intercept runtime state."
    },
    "runnableCode": {
      "code": "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError as e:\n        return f\"Caught error: {type(e).__name__} - {e}\"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))",
      "expectedOutput": "5.0\nCaught error: ZeroDivisionError - division by zero"
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "except ZeroDivisionError as e:",
        "codeSnippet": "except ZeroDivisionError as e:",
        "explanation": "Intercepts the specific exception, preventing catastrophic program crash."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "type(e).__name__",
        "codeSnippet": "type(e).__name__",
        "explanation": "Extracts the exact name of the exception class."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Leaving breakpoint() calls in code committed to production",
        "solution": "Production environments without an interactive TTY will hang on breakpoint(); remove them or set PYTHONBREAKPOINT=0.",
        "codeExample": "# Remove breakpoint() before committing"
      }
    ],
    "bestPractices": [
      "Always read tracebacks starting from the BOTTOM line.",
      "Use logging instead of print() for production debugging."
    ],
    "applications": [
      {
        "industry": "Production Engineering",
        "application": "Sentry / Datadog automated error reporting",
        "benefit": "Captures and groups stack traces across millions of production requests."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-dbg-1",
        "question": "What does the pdb command `s` (step) do compared to `n` (next)?",
        "hint": "Step into functions.",
        "answer": "`s` steps INTO the function called on the current line, while `n` executes the line as a single step without diving inside."
      }
    ],
    "quiz": [
      {
        "id": "q-dbg-1",
        "question": "What built-in function was introduced in Python 3.7 to trigger the debugger without importing pdb?",
        "options": [
          "breakpoint()",
          "debug()",
          "pause()",
          "inspect()"
        ],
        "correctIndex": 0,
        "explanation": "Python 3.7 introduced the built-in `breakpoint()` function, which invokes `sys.breakpointhook()`."
      }
    ],
    "codingChallenge": {
      "title": "Safe Dictionary Key Access",
      "problem": "Write a function safe_get_nested(data, keys, default=None) that safely navigates through nested dictionaries given a list of keys without raising KeyError or TypeError.",
      "hints": [
        "Loop through keys and check if current is dict."
      ],
      "starterCode": "def safe_get_nested(data: dict, keys: list, default=None):\n    # TODO: Safely retrieve nested key\n    pass",
      "solution": "def safe_get_nested(data: dict, keys: list, default=None):\n    curr = data\n    for k in keys:\n        if isinstance(curr, dict) and k in curr:\n            curr = curr[k]\n        else:\n            return default\n    return curr"
    },
    "summary": {
      "keyTakeaways": [
        "Tracebacks read bottom-up to identify error cause and origin line.",
        "breakpoint() drops into the interactive pdb debugger."
      ],
      "nextLessonId": "py-fundamentals-numbers-strings",
      "nextLessonTitle": "Numbers and Strings in Depth",
      "nextLessonModuleId": "python-module-1"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "except ZeroDivisionError as e:",
        "codeSnippet": "except ZeroDivisionError as e:",
        "explanation": "Intercepts the specific exception, preventing catastrophic program crash."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "type(e).__name__",
        "codeSnippet": "type(e).__name__",
        "explanation": "Extracts the exact name of the exception class."
      }
    ]
  },
  "py-fundamentals-numbers-strings": {
    "id": "py-fundamentals-numbers-strings",
    "moduleId": "python-module-1",
    "title": "Numbers and Strings in Depth",
    "subtitle": "Arbitrary-Precision Integers, IEEE-754 Floats, and String Immutability",
    "order": 8,
    "readTimeMinutes": 22,
    "difficulty": "Beginner",
    "visualizerType": "memory-model",
    "objectives": [
      "Understand arbitrary-precision integers in Python (no 32-bit/64-bit integer overflow).",
      "Explain IEEE-754 floating-point inaccuracies (why 0.1 + 0.2 != 0.3) and use `decimal.Decimal`.",
      "Master string immutability and memory string interning.",
      "Utilize raw strings (r\"...\") and escape sequences (\\n, \\t, \\\\)."
    ],
    "prerequisites": [
      "Variables, Naming, and Primitive Types"
    ],
    "analogy": {
      "title": "The Measuring Tape vs The Scientific Vernier Caliper",
      "text": "A standard tape measure with millimeter ticks cannot represent 1/3 of a millimeter exactly (floating-point IEEE-754 rounding). If you need exact financial pennies without fraction loss, you don't use an approximate tape measure; you use accounting ledger math (Python's Decimal module).",
      "metaphor": "Standard floats are binary approximations; Decimal provides exact fixed-point arithmetic."
    },
    "problemSolved": {
      "title": "Avoiding Financial Rounding Disasters and Overflow Crashes",
      "description": "In C or Java, computing 2^100 crashes with integer overflow. Python handles giant integers automatically. However, float arithmetic (0.1 + 0.2 = 0.30000000000000004) can cause financial calculation errors without the Decimal module.",
      "keyPoints": [
        "Python ints have arbitrary precision; bounded only by available RAM.",
        "Floats use 64-bit IEEE-754 representation: 0.1 + 0.2 == 0.3 is False!",
        "Strings are strictly immutable; modifying a string creates a new object."
      ]
    },
    "intuition": {
      "overview": "Python automatically expands integer memory dynamically. For floats, use `math.isclose(a, b)` for equality checks, or `decimal.Decimal` for financial calculations.",
      "steps": [
        {
          "step": 1,
          "title": "Arbitrary Precision",
          "description": "2 ** 100 calculates accurately without overflow."
        },
        {
          "step": 2,
          "title": "Float Precision",
          "description": "math.isclose(0.1 + 0.2, 0.3) returns True."
        },
        {
          "step": 3,
          "title": "String Immutability",
          "description": "s[0] = \"x\" raises TypeError; use concatenation or slices."
        }
      ]
    },
    "codeExample": {
      "title": "Numbers and String Gotchas in Python",
      "code": "import math\nfrom decimal import Decimal\n\n# 1. Arbitrary precision integer\nhuge = 2 ** 100\nprint(f\"2^100 digits: {len(str(huge))}\")\n\n# 2. Float rounding gotcha\nprint(0.1 + 0.2 == 0.3)                    # False! (0.30000000000000004)\nprint(math.isclose(0.1 + 0.2, 0.3))       # True!\nprint(Decimal(\"0.1\") + Decimal(\"0.2\") == Decimal(\"0.3\")) # True!\n\n# 3. String immutability\ns = \"python\"\n# s[0] = \"P\" # Raises TypeError!\ns = \"P\" + s[1:] # Creates new string",
      "explanation": "Demonstrates Python integer scaling, float imprecision workarounds, and string modification."
    },
    "runnableCode": {
      "code": "import math\nfrom decimal import Decimal\n\nprint(2 ** 64)\nprint(0.1 + 0.2 == 0.3)\nprint(math.isclose(0.1 + 0.2, 0.3))\nprint(Decimal('0.1') + Decimal('0.2') == Decimal('0.3'))",
      "expectedOutput": "18446744073709551616\nFalse\nTrue\nTrue"
    },
    "lineByLineExplanation": [
      {
        "line": 4,
        "lines": "4",
        "code": "2 ** 64",
        "codeSnippet": "2 ** 64",
        "explanation": "Computes number exceeding standard 64-bit unsigned integer without overflow."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "0.1 + 0.2 == 0.3",
        "codeSnippet": "0.1 + 0.2 == 0.3",
        "explanation": "False because 0.1 and 0.2 cannot be represented as finite binary fractions in IEEE-754."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "math.isclose(0.1 + 0.2, 0.3)",
        "codeSnippet": "math.isclose(0.1 + 0.2, 0.3)",
        "explanation": "Tests float equality within a standard relative tolerance (1e-09)."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Using == to compare two floating point numbers after arithmetic",
        "solution": "Always use math.isclose(a, b) for floating-point comparisons.",
        "codeExample": "if math.isclose(a, b): # safe float equality"
      }
    ],
    "bestPractices": [
      "Use the decimal module for monetary and banking applications.",
      "Use raw strings r\"\\d+\" for regular expressions to prevent escape sequence conflicts."
    ],
    "applications": [
      {
        "industry": "FinTech",
        "application": "Currency exchange and transaction ledger processing",
        "benefit": "Decimal eliminates cent fractional losses across millions of transactions."
      }
    ],
    "practiceQuestions": [
      {
        "id": "pq-ns-1",
        "question": "What does a raw string `r\"C:\\new\\folder\"` do?",
        "hint": "Disables escape characters.",
        "answer": "It treats backslashes as literal characters, preventing \"\\n\" from being interpreted as a newline."
      }
    ],
    "quiz": [
      {
        "id": "q-ns-1",
        "question": "Why does `0.1 + 0.2 == 0.3` evaluate to False in Python?",
        "options": [
          "0.1 and 0.2 cannot be represented exactly in binary floating-point representation",
          "Python integers are broken",
          "Python round() was not called",
          "0.3 is too large"
        ],
        "correctIndex": 0,
        "explanation": "In binary (base 2), 0.1 and 0.2 are repeating infinite fractions, causing slight rounding discrepancies when summed."
      }
    ],
    "codingChallenge": {
      "title": "Financial Compound Interest Calculator",
      "problem": "Calculate compound interest using `decimal.Decimal` to avoid float rounding errors. Formula: A = P * (1 + r/n)**(n*t). Return result rounded to 2 decimal places as string.",
      "hints": [
        "Convert all inputs to Decimal string representations."
      ],
      "starterCode": "from decimal import Decimal, ROUND_HALF_UP\n\ndef calculate_exact_interest(principal: str, rate: str, periods: int, years: int) -> str:\n    # TODO: Calculate compound interest with Decimal\n    pass",
      "solution": "from decimal import Decimal, ROUND_HALF_UP\n\ndef calculate_exact_interest(principal: str, rate: str, periods: int, years: int) -> str:\n    p = Decimal(principal)\n    r = Decimal(rate)\n    n = Decimal(periods)\n    t = Decimal(years)\n    amount = p * ((Decimal(1) + (r / n)) ** (n * t))\n    return str(amount.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))"
    },
    "summary": {
      "keyTakeaways": [
        "Python integers have arbitrary precision.",
        "Use math.isclose() or Decimal for floats.",
        "Strings are immutable."
      ],
      "nextLessonId": "py-control-boolean-logic",
      "nextLessonTitle": "Boolean Logic and Truthiness",
      "nextLessonModuleId": "python-module-2"
    },
    "lineByLine": [
      {
        "line": 4,
        "lines": "4",
        "code": "2 ** 64",
        "codeSnippet": "2 ** 64",
        "explanation": "Computes number exceeding standard 64-bit unsigned integer without overflow."
      },
      {
        "line": 5,
        "lines": "5",
        "code": "0.1 + 0.2 == 0.3",
        "codeSnippet": "0.1 + 0.2 == 0.3",
        "explanation": "False because 0.1 and 0.2 cannot be represented as finite binary fractions in IEEE-754."
      },
      {
        "line": 6,
        "lines": "6",
        "code": "math.isclose(0.1 + 0.2, 0.3)",
        "codeSnippet": "math.isclose(0.1 + 0.2, 0.3)",
        "explanation": "Tests float equality within a standard relative tolerance (1e-09)."
      }
    ]
  }
};
